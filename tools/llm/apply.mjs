/* 受控回写 + 候选导出。
   · 目标：statements.en.js（陈述/说明）、abstracts.en.js、edge-notes.en.js —— 各有自己的「追加渲染器」；证明与边标题只导出候选。
   · 原则：只追加；既有译文与审校记录永不改写、不覆盖；一律 status:'draft'，永不 'reviewed'；不刷新 basedOn 去掩盖 stale。
   · statements 允许「字段级追加」：节点已有部分条目时，只把缺失字段块插到该条目的收尾行之前，
     并用 vm 重新解析，要求所有既有字段与原来逐字相同；否则中止。
   · 完整性：持锁 → 重算有效性 → 写日志 → 备份并校验哈希 → 同目录临时文件+fsync → **紧邻替换前重算目标哈希**（变了就中止）
     → 原子 rename → 记 applied。幂等：同 id 同文只记账；同 id 异文拒绝。中断后下次先按日志恢复。
   · 批准失效：结果哈希、源哈希、处理配置哈希、请求载荷键中任意一个变了都不再有效。 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { hashOf, sha256 } from './lib/util.mjs';
import { Lock } from './lib/lock.mjs';
import { SRC } from './lib/mgload.mjs';

const T = {
  statements: { file: path.join(SRC, 'data/i18n/statements.en.js'), tail: '\n  },\n};', items: MG => MG.i18nStatements.items },
  abstracts: { file: path.join(SRC, 'data/i18n/abstracts.en.js'), tail: '\n  },\n};', items: MG => MG.i18nAbstracts.items },
  'edge-notes': { file: path.join(SRC, 'data/i18n/edge-notes.en.js'), tail: '\n};', items: MG => MG.i18nEdgeNotes },
};
export const targetFile = kind => T[kind].file;

export function loadItems(text, kind) {
  const win = { MG: {} }; win.window = win; vm.runInNewContext(text, win);
  return T[kind].items(win.MG);
}
const q = s => JSON.stringify(s);
const fieldBlock = (f, v, ind) => `${ind}${f}: {\n${ind}  en: ${q(v.en)},\n${ind}  status: 'draft', basedOn: '${v.basedOn}',\n${ind}},\n`;
export function renderEntry(kind, id, fields) {
  if (kind === 'statements') return `    ${q(id)}: {\n${Object.entries(fields).map(([f, v]) => fieldBlock(f, v, '      ')).join('')}    },\n`;
  if (kind === 'abstracts') return `    ${q(id)}: {\n      en: ${q(fields.en.en)},\n      status: 'draft', basedOn: '${fields.en.basedOn}',\n    },\n`;
  return `  ${q(id)}: { note: { en: ${q(fields.note.en)}, status: 'draft', basedOn: '${fields.note.basedOn}' } },\n`;
}
/** statements 的字段级追加：在已有条目的收尾行前插入缺失字段块。找不到唯一的条目 → 抛错。 */
export function insertFields(text, id, fields) {
  const lines = text.split('\n'); const head = `    ${q(id)}: {`; const alt = `    '${id}': {`;
  const starts = lines.map((l, i) => (l === head || l === alt ? i : -1)).filter(i => i >= 0);
  if (starts.length !== 1) throw new Error(`字段级追加：条目 ${id} 起始行不唯一/不存在（${starts.length}）`);
  let end = -1; for (let i = starts[0] + 1; i < lines.length; i++) if (lines[i] === '    },') { end = i; break; }
  if (end < 0) throw new Error(`字段级追加：找不到条目 ${id} 的收尾行`);
  const block = Object.entries(fields).map(([f, v]) => fieldBlock(f, v, '      ')).join('').replace(/\n$/, '').split('\n');
  lines.splice(end, 0, ...block); return lines.join('\n');
}

/** ctx: { storeDir, version, zhHash, cfgHashOf(adapterId)→string, current: Map(identity→item) , sourceOf(rec)→string|null, targets? } */
export function apply({ stores, ctx, dryRun = true, now = () => Date.now(), hooks = {} }) {
  const report = { applied: [], alreadyApplied: [], refused: [], stale: [], dryRun, diff: {} };
  const lock = new Lock(path.join(ctx.storeDir, 'apply.lock'));
  return lock.withLock(() => {
    recover(ctx, stores, report);
    const approved = []; for (const st of stores) for (const r of st.load().values()) if (r.kind === 'item' && r.state === 'approved' && T[r.target && r.target.kind]) approved.push({ r, st });
    for (const kind of Object.keys(T)) {
      const mine = approved.filter(x => x.r.target.kind === kind); if (!mine.length) continue;
      const target = (ctx.targetFiles || {})[kind] || T[kind].file; const text0 = fs.readFileSync(target, 'utf8'); const h0 = sha256(text0); const have = loadItems(text0, kind);
      const entries = new Map(); const accepted = []; const already = [];
      for (const { r, st } of mine) {
        const a = r.approval || {}, why = []; const cur = ctx.current.get(r.identity); const legacy = !!(ctx.legacyKeys && ctx.legacyKeys.has(r.key)); const src = cur ? cur.basedOnSource : null;
        if (!r.result || hashOf(r.result) !== a.resultHash) why.push('结果与批准时不一致');
        if (!cur) why.push('节点/字段已不存在');
        else {
          if (cur.srcHash !== a.srcHash) why.push('中文底稿已改（stale）');
          if (cur.key !== r.key && !legacy) why.push('请求载荷已改（术语/标题/提示/模型）');
        }
        if (a.cfgHash !== ctx.cfgHashOf(r.adapter) && !legacy) why.push('处理配置已改');
        if (why.length) { report.stale.push({ identity: r.identity, why }); continue; }
        const id = r.target.id; const field = r.target.field || (kind === 'abstracts' ? 'en' : 'note'); const slot = kind === 'abstracts' ? have[id] : kind === 'edge-notes' ? (have[id] || {}).note : (have[id] || {})[field];
        if (slot && (kind === 'abstracts' ? slot.en : slot.en)) {
          if (slot.en === r.result.en) already.push({ r, st }); else report.refused.push({ identity: r.identity, why: '已有不同译文，未授权不覆盖' });
          continue;
        }
        if (kind === 'abstracts' ? have[id] : kind === 'edge-notes' ? have[id] : false) { report.refused.push({ identity: r.identity, why: '该 id 已有条目，不改写' }); continue; }
        const f = kind === 'abstracts' ? 'en' : kind === 'edge-notes' ? 'note' : field;
        if (!entries.has(id)) entries.set(id, {}); entries.get(id)[f] = { en: r.result.en, basedOn: `${ctx.version}#${ctx.zhHash(src)}` };
        accepted.push({ r, st });
      }
      report.alreadyApplied.push(...already.map(x => x.r.identity));
      let ids = [...entries.keys()].sort(); let text1 = text0;
      if (ids.length) {
        const fresh = ids.filter(id => !have[id]), partial = ids.filter(id => have[id]);
        const at = text1.lastIndexOf(T[kind].tail);
        if (fresh.length) {
          if (at < 0 || text1.slice(at).trim() !== T[kind].tail.trim()) throw new Error(`${kind}：目标文件末尾结构不符，拒绝回写`);
          text1 = text1.slice(0, at + 1) + fresh.map(id => renderEntry(kind, id, entries.get(id))).join('') + text1.slice(at + 1);
        }
        for (const id of partial) {
          try { if (kind !== 'statements') throw new Error('仅 statements 支持字段级追加'); text1 = insertFields(text1, id, entries.get(id)); }
          catch (e) { report.refused.push({ identity: id, why: '字段级追加失败，需人工：' + e.message }); entries.delete(id); for (let i = accepted.length - 1; i >= 0; i--) if (accepted[i].r.target.id === id) accepted.splice(i, 1); }
        }
        ids = ids.filter(id => entries.has(id));
        const have1 = loadItems(text1, kind);
        for (const k of Object.keys(have)) if (JSON.stringify(have1[k] && Object.keys(have[k]).reduce((o, f) => (o[f] = have1[k][f], o), {})) !== JSON.stringify(have[k])) throw new Error(`${kind}：回写改动了既有条目 ${k}`);
        if (Object.keys(have1).length !== Object.keys(have).length + fresh.length) throw new Error(`${kind}：回写后条目数不符`);
      }
      report.diff[kind] = ids.map(id => renderEntry(kind, id, entries.get(id))).join('');
      if (dryRun) continue;
      if (!ids.length) { markApplied(already, sha256(text0)); continue; }
      const h1 = sha256(text1); const bdir = path.join(ctx.storeDir, 'backups'); fs.mkdirSync(bdir, { recursive: true });
      const backup = path.join(bdir, `${path.basename(target)}.${now()}`); fs.copyFileSync(target, backup);
      if (sha256(fs.readFileSync(backup, 'utf8')) !== h0) throw new Error('备份校验失败');
      const journal = path.join(ctx.storeDir, 'apply.journal.json'); const tmp = target + '.mgtmp';
      fs.writeFileSync(journal, JSON.stringify({ kind, target, h0, h1, backup, ids, tmp, identities: accepted.map(x => x.r.identity) }));
      const fd = fs.openSync(tmp, 'w'); try { fs.writeSync(fd, text1); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
      if (hooks.beforeSwap) hooks.beforeSwap();                                 // 测试钩子：模拟并发修改 / 崩溃
      if (sha256(fs.readFileSync(target, 'utf8')) !== h0) { fs.unlinkSync(tmp); fs.unlinkSync(journal); throw new Error('目标文件在回写期间被修改，已中止（未覆盖）'); }
      fs.renameSync(tmp, target);
      markApplied(accepted.concat(already), h1); fs.unlinkSync(journal);
      report.applied.push(...ids.map(id => `${kind}:${id}`)); report.backup = backup;
    }
    return report;
  });
}
function markApplied(list, hash) {
  const by = new Map(); for (const { r, st } of list) { if (!by.has(st)) by.set(st, []); by.get(st).push({ ...r, t: undefined, state: 'applied', appliedHash: hash }); }
  for (const [st, recs] of by) st.append(recs);
}

/** 中断恢复：看日志里目标当前哈希。 */
export function recover(ctx, stores, report = {}) {
  const journal = path.join(ctx.storeDir, 'apply.journal.json'); if (!fs.existsSync(journal)) return null;
  const j = JSON.parse(fs.readFileSync(journal, 'utf8')); const cur = sha256(fs.readFileSync(j.target, 'utf8')); let outcome;
  if (cur === j.h1) {                                            // rename 已完成，只差记账
    for (const st of stores) { const recs = [...st.load().values()].filter(r => r.kind === 'item' && r.state === 'approved' && j.identities.includes(r.identity)); if (recs.length) markApplied(recs.map(r => ({ r, st })), j.h1); }
    outcome = 'completed';
  } else if (cur === j.h0) { try { fs.unlinkSync(j.tmp); } catch { /* 无 */ } outcome = 'rolled-back'; }
  else throw new Error('回写日志与目标文件都对不上（目标被第三方改过）；保留日志与备份，需人工处理：' + j.backup);
  fs.unlinkSync(journal); report.recovered = outcome; return outcome;
}

/** 候选导出（证明、边标题）：确定性、原子、幂等；不含时间戳。stale = 源文已变。 */
export function exportCandidates({ stores, outFile, ctx }) {
  const rows = [];
  for (const st of stores) for (const r of st.load().values()) {
    if (r.kind !== 'item' || !['ok', 'review', 'approved', 'applied'].includes(r.state) || !r.target || r.target.kind !== 'export' || !r.result) continue;
    const cur = ctx.current.get(r.identity);
    rows.push({ identity: r.identity, adapter: r.adapter, state: r.state, stale: !cur || cur.key !== r.key || cur.srcHash !== r.srcHash,
      proof: r.proof, srcHash: r.srcHash, cfgHash: r.cfgHash, resultHash: r.resultHash, flags: r.flags, result: r.result, status: 'candidate-draft' });
  }
  rows.sort((a, b) => a.identity.localeCompare(b.identity));
  const text = JSON.stringify({ note: '候选译文：未经人工审校，不得直接并入生产；证明的英文显示路径尚未接入。', count: rows.length, items: rows }, null, 1) + '\n';
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  if (fs.existsSync(outFile) && fs.readFileSync(outFile, 'utf8') === text) return { rows: rows.length, written: false };
  const tmp = outFile + '.tmp'; const fd = fs.openSync(tmp, 'w'); try { fs.writeSync(fd, text); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  fs.renameSync(tmp, outFile); return { rows: rows.length, written: true };
}
