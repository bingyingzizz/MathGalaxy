#!/usr/bin/env bun
/* 全站英文覆盖盘点（确定性，不调用任何模型，只读）。
   每类内容分两条独立的轴：
     · 译文可得性（translation）：eligible / existing / missing / draft / reviewed / stale / blocked / noSource
     · 显示支持（display）：英文界面里有没有消费这层译文的路径
   「缺译文」≠「缺数学源文」：没有中文源文的字段记 noSource，不记 missing。
   只统计权威源一次；生成的 HTML/MD/JSON 与重复显示路径（如等价面板里的平行蕴含）不是独立源。
   用法： bun tools/llm/inventory.mjs [--json] [--cross]   （--cross 与 i18n-status.mjs 对账） */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { world, proofsOf, parallelImplications } from './lib/source.mjs';
import { formulasOf, HAN, ROOT } from './lib/mgload.mjs';

const hasHanFormula = s => formulasOf(s).some(x => HAN.test(x.tex));
const blank = () => ({ eligible: 0, existing: 0, missing: 0, draft: 0, reviewed: 0, stale: 0, blocked: 0, noSource: 0 });

/** 一个字段的译文状态：返回 'noSource'|'blocked'|'missing'|'draft'|'reviewed'|'stale' */
function fieldState(MG, zh, rec) {
  if (!String(zh || '').trim()) return 'noSource';
  if (rec && rec.en) return MG.enFieldStatus(rec, zh);   // draft|reviewed|stale
  return hasHanFormula(zh) ? 'blocked' : 'missing';
}
function tally(t, st) {
  if (st === 'noSource') { t.noSource++; return; }
  t.eligible++;
  if (st === 'missing') t.missing++;
  else if (st === 'blocked') { t.blocked++; t.missing++; }
  else { t.existing++; t[st]++; }
}
/** 译文还在、但中文源文已被清空：孤儿译文（不计入可译，单独报告；i18n-status 仍会数它） */
function orphans(items, graph, f) { return Object.entries(items).filter(([id, r]) => r[f] && graph.byId[id] && !String(graph.byId[id][f] || '').trim()).map(([id]) => id); }

export function inventory() {
  const { MG, graph, version } = world();
  const T = [];
  const add = (type, unit, display, note, t, extra = {}) => T.push({ type, unit, display, note, ...t, ...extra });

  /* ---- 节点：名字（title / label）——派生自 aka，不走 LLM；无逐条状态 */
  { const t = blank(); const t2 = blank();
    for (const n of graph.nodes) {
      if (String(n.title || '').trim()) { t.eligible++; if (n.title_en) t.existing++; else t.missing++; } else t.noSource++;
      if (String(n.label || '').trim()) { t2.eligible++; if (n.label_en) t2.existing++; else t2.missing++; } else t2.noSource++;
    }
    add('node.title', 'field', 'supported', 'i18n.js 派生（aka/title）；无 basedOn，状态不可追踪', t);
    add('node.label', 'field', 'supported', 'i18n.js 派生；缺则回落 title_en', t2); }

  /* ---- 节点：陈述 / 说明 */
  const items = (MG.i18nStatements && MG.i18nStatements.items) || {};
  for (const f of ['statement', 'notes']) {
    const t = blank(); const nodes = new Set();
    for (const n of graph.nodes) { const st = fieldState(MG, n[f], (items[n.id] || {})[f]); tally(t, st); if (st !== 'noSource') nodes.add(n.id); }
    add('node.' + f, 'field', 'supported', 'statements.en.js；missing 含 blocked（公式里含汉字，须先改中文公式）', t, { nodes: nodes.size, orphanTranslations: orphans(items, graph, f) });
  }

  /* ---- 节点：枢纽摘要（摘要的底稿 = statement + notes） */
  { const t = blank(); const abs = (MG.i18nAbstracts && MG.i18nAbstracts.items) || {};
    for (const n of graph.nodes) {
      if (!n.isHub && !abs[n.id]) continue;
      tally(t, fieldState(MG, (n.statement || '') + '\n' + (n.notes || ''), abs[n.id]));
    }
    add('node.abstract', 'hub node', 'supported', 'abstracts.en.js；仅枢纽节点', t); }

  /* ---- 节点：假设标签（受控词表 hypotheses.js，已带 en） */
  { const t = blank(); const vocab = new Map(); const hv = (MG.hypotheses && MG.hypotheses.list) || [];
    for (const h of hv) vocab.set(h.zh, h.en);
    const used = new Set(); let refs = 0;
    for (const n of graph.nodes) for (const h of n.hypotheses || []) { used.add(h); refs++; }
    for (const h of used) { t.eligible++; if (vocab.get(h)) t.existing++; else t.missing++; }
    add('node.hypotheses', 'distinct label', 'unsupported', `词表已带 en；面板 hypothesisChips 直接显示中文（panel.js:71）。引用 ${refs} 次`, t); }

  /* ---- 边 */
  const E = graph.edges; const notes = MG.i18nEdgeNotes || {};
  { const t = blank(); for (const e of E) tally(t, fieldState(MG, e.note, (notes[e.id] || {}).note));
    add('edge.note', 'field', 'supported', 'edge-notes.en.js（panel.js:200）', t, { edges: E.filter(e => String(e.note || '').trim()).length }); }
  for (const f of ['title', 'label']) {
    const t = blank(); for (const e of E) { const z = String(e[f] || '').trim(); if (!z) { t.noSource++; continue; } t.eligible++; if (e[f + '_en']) t.existing++; else t.missing++; }
    add('edge.' + f, 'field', f === 'title' ? 'partial' : 'unsupported',
      f === 'title' ? '面板在英文模式用 title_en，缺了用端点英文名拼接（panel.js:138）；数据层没有 title_en 旁挂文件' : '没有英文消费路径', t);
  }

  /* ---- 证明：单证明 / 等价两向 / 多种证法（按单条证明计） */
  { const single = blank(), eq = blank(), alt = blank(); const edgesWith = new Set(); const flagsC = {}; let collisions = 0;
    for (const e of E) {
      const ps = proofsOf(e);
      if (e.kind === 'equivalence' && ps.length === 0 && e.proofs) { /* 有 proofs 字段但全空 */ }
      for (const p of ps) {
        edgesWith.add(e.id); for (const fl of p.flags) { flagsC[fl] = (flagsC[fl] || 0) + 1; if (fl === 'collision') collisions++; }
        const st = hasHanFormula(p.text) ? 'blocked' : 'missing';
        tally(p.structure === 'single' ? single : p.structure === 'equivalence-direction' ? eq : alt, st);
        // 标签也是用户可见文字（步骤标题）
      }
    }
    const lab = blank(); for (const e of E) for (const p of proofsOf(e)) if (p.structure !== 'single') { if (p.label.trim()) { lab.eligible++; lab.missing++; } else lab.noSource++; }
    const par = parallelImplications(graph);
    const noProofEdges = E.filter(e => proofsOf(e).length === 0).length;
    const dis = '面板直接显示中文并带「证明仍以中文为准」提示（panel.js:448–510）；无英文旁挂';
    add('edge.proof', 'proof', 'unsupported', dis + '。单字符串证明', single, { edges: single.eligible });
    add('edge.proofs.equivalence', 'proof', 'unsupported', dis + '。等价边的两个方向', eq, { edges: E.filter(e => e.kind === 'equivalence' && proofsOf(e).length).length });
    add('edge.proofs.alternative', 'proof', 'unsupported', dis + '。蕴含边的多种证法', alt, { edges: E.filter(e => e.kind === 'implication' && Array.isArray(e.proofs) && proofsOf(e).length).length });
    add('edge.proofs.label', 'proof label', 'unsupported', '步骤标题（方向/证法名）', lab);
    T.proofMeta = { edgesWithProof: edgesWith.size, edgesWithoutProofSource: noProofEdges, identityFlags: flagsC, collisions,
      parallelImplicationDisplays: par.length, parallelWithProof: par.filter(x => x.hasProof).length };
  }

  /* ---- 板块 / 星团 / 大板块：名字有 en；desc 只有中文，仅出现在生成的目录页 */
  { const t = blank(); for (const c of [...MG.regions, ...MG.clusters, ...MG.sectors]) { if (String(c.name || '').trim()) { t.eligible++; if (c.en) t.existing++; else t.missing++; } else t.noSource++; }
    add('region/cluster/sector.name', 'field', 'supported', 'data/*.js 的 en 字段（MG.regionName/clusterName）', t); }
  { const t = blank(); for (const c of [...MG.regions, ...MG.clusters, ...MG.sectors]) { if (String(c.desc || '').trim()) { t.eligible++; t.missing++; } else t.noSource++; }
    add('region/cluster/sector.desc', 'field', 'unsupported', '只被 build 的目录页（中文）使用，应用里不显示；无 en 字段', t); }

  /* ---- 界面文案与文档：已有机制，不走 LLM，仅报告 */
  const ui = (MG.uiEn && MG.uiEn.strings) || {};
  add('ui.strings', 'string', 'supported', 'ui.en.js（MG.t，缺键回落中文）；不进 LLM 流水线', Object.assign(blank(), { eligible: Object.keys(ui).length, existing: Object.keys(ui).length }));
  const meta = {
    version, nodes: graph.nodes.length, edges: E.length,
    edgeKinds: E.reduce((a, e) => (a[e.kind] = (a[e.kind] || 0) + 1, a), {}),
    titleEnNodes: graph.nodes.filter(n => n.title_en).length,
    note: 'docs.en.js（阅读/政策/记号等）由作者维护，不进流水线，逐份状态见 i18n-status.mjs。生成的页面不是独立源。',
  };
  return { meta, types: T, proofMeta: T.proofMeta };
}

/** 与 tools/i18n-status.mjs 对账（同一口径应当一致；不一致要解释） */
export function crossCheck(inv) {
  const r = spawnSync(process.execPath, [path.join(ROOT, 'tools/i18n-status.mjs'), '--json'], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const rows = JSON.parse(r.stdout).rows; const by = {};
  for (const x of rows) { const k = x.file + (x.field ? '.' + x.field : ''); (by[k] ||= { draft: 0, reviewed: 0, stale: 0 })[x.state]++; }
  const mine = n => inv.types.find(t => t.type === n);
  const out = [];
  for (const [k, ty] of [['statements.statement', 'node.statement'], ['statements.notes', 'node.notes'], ['abstracts.en', 'node.abstract']]) {
    const a = by[k] || {}, b = mine(ty);
    for (const s of ['draft', 'reviewed', 'stale']) out.push({ item: `${ty}.${s}`, i18nStatus: a[s] || 0, inventory: b[s], same: (a[s] || 0) === b[s] });
  }
  return out;
}

if (import.meta.main) {
  const inv = inventory(); const argv = process.argv.slice(2);
  if (argv.includes('--json')) { console.log(JSON.stringify(inv, null, 1)); }
  else {
    const m = inv.meta;
    console.log(`内容版本 ${m.version} · 节点 ${m.nodes} · 边 ${m.edges} ${JSON.stringify(m.edgeKinds)} · title_en 节点 ${m.titleEnNodes}（名字，≠译文覆盖）`);
    const pad = (s, n) => String(s).padEnd(n);
    console.log(pad('类型', 30) + pad('显示', 12) + '可译  已有  缺失  草稿  已审  过期  阻塞  无源');
    for (const t of inv.types) console.log(pad(t.type, 30) + pad(t.display, 12) + [t.eligible, t.existing, t.missing, t.draft, t.reviewed, t.stale, t.blocked, t.noSource].map(x => String(x).padStart(5)).join(' ') + (t.nodes != null ? `  节点${t.nodes}` : '') + (t.edges != null ? `  边${t.edges}` : ''));
    console.log('证明/显示路径：', JSON.stringify(inv.proofMeta)); console.log(m.note);
  }
  if (argv.includes('--cross')) for (const c of crossCheck(inv)) console.log((c.same ? '✓' : '✗'), JSON.stringify(c));
}
