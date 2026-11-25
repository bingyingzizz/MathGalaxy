/* 同质基准：从**真实待译积压**里确定性地选一个星团，按内容类型分层，把条目平分到两个互不重叠的「臂」：
     item    = 逐条选词（试点用的方式）
     cluster = 星团紧凑词表（稳定前缀）+ 条目专属补充（glossary_extra，不丢术语）
   没有重复翻译：每个条目只翻一次，所以每条成功译文都能直接用于正式战役；两臂对比靠分层平衡（同类型、同星团、按身份哈希交替）。
   用法：
     bun tools/llm/bench.mjs select --name bench1 --cluster cat.basic --take edge-note=60,node-statement=9,node-notes=7,edge-proof=6 [--max-proof-chars 900]
     bun tools/llm/bench.mjs show --name bench1
   清单写入 <store>/<name>/manifest.json（含星团词表原文与哈希：运行时直接用清单里的词表，积压变化也不会让身份漂移）。 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/mgload.mjs';
import { world } from './lib/source.mjs';
import { buildVocab } from './lib/glossary.mjs';
import { sha256, hashOf } from './lib/util.mjs';
import { ADAPTERS } from './jobs/index.mjs';
import { locate } from './lib/schedule.mjs';
import { buildClusterGlossaries } from './lib/gloss.mjs';

const STORE_DIR = process.env.MG_LLM_STORE || path.join(ROOT, '_audit', 'llm-store');
export const benchPath = name => path.join(STORE_DIR, name, 'manifest.json');
export const loadBench = name => JSON.parse(fs.readFileSync(benchPath(name), 'utf8'));
const kindOf = it => (it.adapter === 'node-text' ? 'node-' + it.field : it.adapter === 'edge-text' ? 'edge-' + it.field : 'edge-' + it.adapter);

/** 纯函数：给定世界/词表/参数 → 清单（不写盘）。 */
export function selectBench({ world: w, vocab, model = 'deepseek-flash', cluster, take, maxProofChars = 900 }) {
  const all = [];
  for (const [a, ad] of Object.entries(ADAPTERS)) { if (a === 'abstract') continue; for (const it of ad.collect({ world: w, vocab, model })) { it.loc = locate(w, it); all.push(it); } }
  const inCluster = all.filter(it => it.loc.cluster === cluster);
  if (!inCluster.length) throw new Error('该星团没有待译条目：' + cluster);
  const glossaries = buildClusterGlossaries(inCluster, vocab);        // 用整个星团的积压（不只入选者）→ 可复用于正式战役
  const items = [];
  for (const [kind, n] of Object.entries(take)) {
    const pool = inCluster.filter(it => kindOf(it) === kind && it.requests.length === 1 && (kind !== 'edge-proof' || it.zh.length <= maxProofChars))
      .sort((a, b) => sha256(a.identity).localeCompare(sha256(b.identity)));
    if (pool.length < n) throw new Error(`${cluster} 的 ${kind} 只有 ${pool.length} 条，要 ${n} 条`);
    pool.slice(0, n).forEach((it, i) => items.push({ identity: it.identity, adapter: it.adapter, id: it.id, field: it.field, kind, cluster, sector: it.loc.sector, arm: i % 2 ? 'cluster' : 'item', zhChars: it.zh.length, srcHash: it.srcHash }));
  }
  const g = glossaries.get(cluster) || {};
  return { name: null, createdFor: 'cache/quality benchmark', model, cluster, sector: items[0].sector, take, items, clusterGlossary: g, clusterGlossaryHash: hashOf(g).slice(0, 12), backlogInCluster: inCluster.length };
}
/** 清单里属于适配器 a 的条目（按臂选词；item = 逐条选词，cluster = 清单里冻结的星团词表 + 条目补充）。源文哈希不符/不再可译 → 抛错。 */
export function benchItems(a, m, { world: w, vocab, model, extra = {} }) {
  const mine = m.items.filter(x => x.adapter === a); if (!mine.length) return [];
  const Vc = { ...vocab, clusterGlossary: new Map([[m.cluster, m.clusterGlossary]]) }; const out = [];
  for (const arm of ['item', 'cluster']) { const sel = mine.filter(x => x.arm === arm); if (!sel.length) continue;
    const got = ADAPTERS[a].collect({ world: w, vocab: arm === 'cluster' ? Vc : vocab, model, only: sel.map(x => x.id), ...extra });
    for (const x of sel) { const it = got.find(i => i.identity === x.identity); if (!it) throw new Error('清单条目不再可译（已译/被阻塞/源文变了）：' + x.identity); if (it.srcHash !== x.srcHash) throw new Error('清单与当前源文不符：' + x.identity); it.arm = arm; it.loc = locate(w, it); out.push(it); } }
  return out;
}
/** 术语遵从率（确定性）：请求里给出的每个术语（glossary ∪ glossary_extra），其中文出现在源文时，英文译文是否含该术语的英文（忽略大小写/连字符/复数 s）。
    rows: [{arm, terms:{zh:en}, zh, en}]。这是「模型有没有照词表翻」的代理指标，不衡量词表本身对不对。 */
export function termCompliance(rows) {
  const norm = s => String(s).toLowerCase().replace(/[-–]/g, ' ').replace(/s+/g, ' ');
  const out = {};
  for (const r of rows) { const o = out[r.arm] ||= { items: 0, termOccurrences: 0, followed: 0 }; o.items++; const en = norm(r.en);
    for (const [zh, e] of Object.entries(r.terms)) { if (!r.zh.includes(zh)) continue; o.termOccurrences++; const t = norm(e); if (en.includes(t) || en.includes(t.replace(/s$/, ''))) o.followed++; } }
  for (const o of Object.values(out)) o.rate = o.termOccurrences ? +(o.followed / o.termOccurrences).toFixed(3) : null;
  return out;
}
const dist = m => { const d = {}; for (const x of m.items) { const k = `${x.kind}/${x.arm}`; d[k] = (d[k] || 0) + 1; } return d; };

if (import.meta.main) {
  const argv = process.argv.slice(2); const cmd = argv[0]; const opt = (n, d = null) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  const name = opt('name', 'bench1');
  try {
    if (cmd === 'select') {
      const take = Object.fromEntries(String(opt('take')).split(',').map(x => x.split('=')).map(([k, v]) => [k, +v]));
      const w = world(); const m = selectBench({ world: w, vocab: buildVocab(w.graph), cluster: opt('cluster'), take, maxProofChars: +opt('max-proof-chars', 900) }); m.name = name;
      fs.mkdirSync(path.dirname(benchPath(name)), { recursive: true });
      if (fs.existsSync(benchPath(name))) throw new Error('清单已存在，不覆盖：' + benchPath(name));
      fs.writeFileSync(benchPath(name), JSON.stringify(m, null, 1)); console.log(JSON.stringify({ name, cluster: m.cluster, items: m.items.length, distribution: dist(m), clusterGlossaryTerms: Object.keys(m.clusterGlossary).length, clusterGlossaryHash: m.clusterGlossaryHash, backlogInCluster: m.backlogInCluster }, null, 1));
    } else if (cmd === 'show') {
      const m = loadBench(name); console.log(JSON.stringify({ name, cluster: m.cluster, items: m.items.length, distribution: dist(m), zhCharsTotal: m.items.reduce((a, x) => a + x.zhChars, 0), clusterGlossary: m.clusterGlossary }, null, 1));
    } else if (cmd === 'compliance') {   // 需要已跑完的译文（读各翻译结果库；不发请求）
      const { Store } = await import('./store.mjs'); const m = loadBench(name); const w = world(); const vocab = buildVocab(w.graph); const rows = [];
      for (const [a, ad] of Object.entries(ADAPTERS)) { const its = benchItems(a, m, { world: w, vocab, model: m.model }); if (!its.length) continue;
        const recs = new Map([...new Store(STORE_DIR, ad.OP).load().values()].filter(r => r.kind === 'item' && r.result).map(r => [r.identity, r]));
        for (const it of its) { const rec = recs.get(it.identity); if (!rec) continue; const u = JSON.parse(it.requests[0].body.messages[1].content); rows.push({ arm: it.arm, terms: { ...u.glossary, ...(u.glossary_extra || {}) }, zh: it.zh, en: rec.result.en }); } }
      console.log(JSON.stringify({ name, translated: rows.length, of: m.items.length, byArm: termCompliance(rows) }, null, 1));
    } else console.log('用法：bench.mjs select --name N --cluster C --take kind=n,... | show --name N | compliance --name N');
  } catch (e) { console.error('✗', String(e.message || e).slice(0, 400)); process.exit(1); }
}
