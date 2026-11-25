#!/usr/bin/env bun
/* DeepSeek 批处理流水线 CLI。规程：docs/llm-pipeline.md
   阶段（互不自动串联）：inventory → pilot-select → plan(干跑，零请求) → run → validate → report/show → approve → diff → apply | export
   ⛔ run 必须同时给 --limit 与 --max-usd（并在 DEEPSEEK_API_KEY 已设置时才会发请求）；默认永远是干跑。
   凭据：只读环境变量 DEEPSEEK_API_KEY，不接受文件/参数。 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/mgload.mjs';
import { world } from './lib/source.mjs';
import { buildVocab } from './lib/glossary.mjs';
import { Store } from './store.mjs';
import { Billing } from './billing.mjs';
import { Lock } from './lib/lock.mjs';
import { plan, run, validateStage, approve } from './batch.mjs';
import { apply, exportCandidates } from './apply.mjs';
import { httpTransport } from './deepseek.mjs';
import { ADAPTERS, ADAPTER_IDS } from './jobs/index.mjs';
import { selectPilot } from './pilot.mjs';
import { loadBench, benchItems } from './bench.mjs';
import { sha256 } from './lib/util.mjs';
import { POLICY, checkTaskCap } from './lib/policy.mjs';
import { locate } from './lib/schedule.mjs';
import { aggregateUsage } from './usagereport.mjs';
import { windows, isPeak } from './lib/offpeak.mjs';

const argv = process.argv.slice(2); const cmd = argv[0];
const opt = (n, d = null) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const flag = n => argv.includes('--' + n);
const STORE_DIR = process.env.MG_LLM_STORE || path.join(ROOT, '_audit', 'llm-store');
const MODEL = opt('model', 'deepseek-flash');
const csv = n => (opt(n) ? opt(n).split(',').map(s => s.trim()).filter(Boolean) : null);
const storeOf = a => new Store(STORE_DIR, ADAPTERS[a].OP);
const pilotFile = path.join(STORE_DIR, 'pilot-items.json');

function adapterList() { const a = opt('adapter'); if (a) { if (!ADAPTERS[a]) throw new Error('未知适配器 ' + a); return [a]; } return ADAPTER_IDS; }
/** 取某适配器的待办项；--pilot 时只取试点清单里的身份。 */
function itemsFor(a, extra = {}) {
  const w = world(); const vocab = buildVocab(w.graph);
  if (flag('feedback')) { const f = path.join(STORE_DIR, 'feedback.json'); if (fs.existsSync(f)) vocab.feedback = new Map(Object.entries(JSON.parse(fs.readFileSync(f, 'utf8')))); }   // 至多一轮返工：reviewer_findings 进请求体（因此进缓存键） let only = csv('ids'); let idents = csv('identities');
  if (flag('pilot')) { const p = JSON.parse(fs.readFileSync(pilotFile, 'utf8')).filter(x => x.adapter === a); only = p.flatMap(x => x.ids); idents = p.map(x => x.identity); if (!p.length) return []; }
  if (opt('bench')) return benchItems(a, loadBench(opt('bench')), { world: w, vocab, model: MODEL, extra });   // 基准：按臂选词，源文哈希须与清单一致
  let items = ADAPTERS[a].collect({ world: w, vocab, model: MODEL, only, ...extra });
  if (idents) items = items.filter(i => idents.includes(i.identity));
  for (const it of items) it.loc = locate(w, it);          // 数学位置（sector/cluster），只用于调度与报表，不进请求体
  return items;
}
/** 快照里的条目键（复用旧配置下生成的译文）。先逐文件核对 MANIFEST.md 的 sha256，任何不符 → 拒绝。 */
function legacyKeysFrom(dirName) {
  const d = path.isAbsolute(dirName) ? dirName : path.join(STORE_DIR, dirName); const man = fs.readFileSync(path.join(d, 'MANIFEST.md'), 'utf8'); const keys = new Set();
  for (const m of man.matchAll(/^- (\S+\.jsonl?)\s+\d+ B\s+sha256=([0-9a-f]{64})/gm)) { const f = path.join(d, m[1]); if (!fs.existsSync(f) || sha256(fs.readFileSync(f)) !== m[2]) throw new Error('快照与清单哈希不符：' + m[1]); }
  for (const op of ['node-text', 'edge-text', 'proof', 'abstract']) { const f = path.join(d, op + '.jsonl'); if (!fs.existsSync(f)) continue;
    for (const l of fs.readFileSync(f, 'utf8').split('\n')) { if (!l.trim()) continue; const r = JSON.parse(l); if (r.kind === 'item') keys.add(r.key); } }
  return keys;
}
const sumPlans = ps => ps.reduce((t, p) => ({ items: t.items + p.items, requests: t.requests + p.requests, cached: t.cached + p.cachedRequests, toRun: t.toRun + p.toRun,
  prefixGroups: t.prefixGroups + p.prefixGroups, estInputTokens: t.estInputTokens + p.estInputTokens, maxOutputTokens: t.maxOutputTokens + p.maxOutputTokens, estUsdUpperBoundPeak: +(t.estUsdUpperBoundPeak + p.estUsdUpperBoundPeak).toFixed(6) }),
{ items: 0, requests: 0, cached: 0, toRun: 0, prefixGroups: 0, estInputTokens: 0, maxOutputTokens: 0, estUsdUpperBoundPeak: 0 });

try {
  if (cmd === 'inventory') { process.argv.splice(2, 1); await import('./inventory.mjs'); }
  else if (cmd === 'pilot-select') {
    const pick = selectPilot(world()); fs.mkdirSync(STORE_DIR, { recursive: true }); fs.writeFileSync(pilotFile, JSON.stringify(pick, null, 1));
    for (const p of pick) console.log(`${p.adapter.padEnd(10)} ${p.identity}   ${p.what}`); console.error(`已选 ${pick.length} 项 → ${pilotFile}`);
  }
  else if (cmd === 'plan') {
    const rows = []; for (const a of adapterList()) { const items = itemsFor(a); const p = plan({ items, store: storeOf(a), limit: +opt('limit', 0) || null }); delete p._picked; rows.push({ adapter: a, ...p }); }
    console.log(JSON.stringify({ model: MODEL, dryRun: true, requestsSent: 0, byAdapter: rows, total: sumPlans(rows),
      note: '估算：整请求 JSON 的 UTF-8 字节数当输入 token（启发式，非保证上界）+ max_tokens 满额输出，峰值价。不是实际用量，更不是供应商账单。' }, null, 1));
  }
  else if (cmd === 'run') {
    if (!process.env.DEEPSEEK_API_KEY) { console.error('DEEPSEEK_API_KEY 未设置：run 不会发出任何请求。'); process.exit(2); }
    const campaign = opt('campaign'), cap = +opt('max-usd'), limit = +opt('limit');
    if (!campaign || !(cap > 0) || !(limit > 0)) throw new Error('run 必须同时给 --campaign、--max-usd、--limit');
    checkTaskCap(cap, flag('above-policy')); const billing = new Billing(STORE_DIR, { dailyCapUsd: flag('above-policy') ? null : POLICY.dailyCapUsd }); const c = billing.openCampaign(campaign, cap, { model: MODEL });
    const transport = httpTransport({ timeoutMs: +opt('timeout-ms', 120000) }); const out = [];
    let left = limit;
    for (const a of adapterList()) { if (left <= 0) break; const items = itemsFor(a); if (!items.length) continue;
      const r = await run({ items, store: storeOf(a), billing, campaign, model: MODEL, limit: left, concurrency: +opt('concurrency', 4), warmup: +opt('warmup', 1), retryInvalid: flag('retry-failed'), transport });
      left -= r.stats.sent; out.push({ adapter: a, ...r.stats });
      fs.appendFileSync(path.join(STORE_DIR, 'runs.jsonl'), JSON.stringify({ t: new Date().toISOString(), campaign, adapter: a, model: MODEL, stats: r.stats, plan: r.plan }) + '\n'); }
    console.log(JSON.stringify({ campaign: c, runs: out, budget: billing.report(campaign) }, null, 1));
  }
  else if (cmd === 'usage') {   // 离线：从账本/运行记录聚合 usage、成本、缓存节省、重试与未知用量
    const campaign = opt('campaign'); if (!campaign) throw new Error('usage 需要 --campaign');
    const by = (opt('by', 'campaign')).split(',').filter(Boolean);
    console.log(JSON.stringify(aggregateUsage({ billingFile: path.join(STORE_DIR, 'billing.jsonl'), runsFile: path.join(STORE_DIR, 'runs.jsonl'), campaign, by }), null, 1));
  }
  else if (cmd === 'offpeak') {   // 只读建议：本地时区的峰/谷窗口。不创建任何定时任务。
    const w = windows({ tz: opt('tz') || undefined }); console.log(JSON.stringify({ nowIsPeak: isPeak(new Date()), ...w, note: '官方峰值：UTC 周一至周五 01–04、06–10（中国法定假日除外，本工具不含假日表）。预算预留永远按峰值价，与此无关。' }, null, 1));
  }
  else if (cmd === 'validate') { const o = {}; for (const a of adapterList()) o[a] = validateStage({ adapter: ADAPTERS[a], items: itemsFor(a, { includeExisting: false }), store: storeOf(a) }); console.log(JSON.stringify(o)); console.log('注意：通过的只是形式校验，不是数学等价的证明；模型自评从不构成批准。'); }
  else if (cmd === 'report') {
    const by = {}, exc = []; let usd = 0;
    for (const a of adapterList()) for (const r of storeOf(a).load().values()) { const k = `${a}.${r.kind || 'item'}.${r.state}`; by[k] = (by[k] || 0) + 1; usd += r.usd || 0;
      if (r.kind === 'item' && ['invalid', 'review'].includes(r.state)) exc.push(`${r.state} ${r.identity} ${[...(r.errors || []), ...(r.flags || [])].join('; ').slice(0, 200)}`);
      else if (r.kind === 'part' && ['invalid', 'failed', 'retryable'].includes(r.state)) exc.push(`part-${r.state} ${r.identity} ${r.error || ''}`); }
    console.log(JSON.stringify({ states: by, recordedPartUsdPeakRate: +usd.toFixed(6) }, null, 1)); console.log(exc.slice(0, 80).join('\n'));
  }
  else if (cmd === 'show') {   // 人工审阅用：并排显示中文与译文
    for (const a of adapterList()) for (const r of storeOf(a).load().values()) {
      if (r.kind !== 'item' || !r.result || (csv('identities') && !csv('identities').includes(r.identity))) continue;
      const it = itemsFor(a, { includeExisting: true }).find(x => x.identity === r.identity);
      console.log(`\n=== ${r.identity} [${r.state}]  flags: ${(r.flags || []).join(' | ') || '-'}\n--- 中文\n${it ? it.zh : '(源文已不存在)'}\n--- English${r.result.label_en ? ' · ' + r.result.label_en : ''}\n${r.result.en}\n--- ambiguities: ${JSON.stringify(r.result.ambiguities)}  suspected: ${JSON.stringify(r.result.suspected)}`);
    }
  }
  else if (cmd === 'approve') { let n = 0; for (const a of adapterList()) n += approve({ store: storeOf(a), identities: csv('identities'), includeOkAll: flag('all-ok') }); console.log('approved', n); }
  else if (cmd === 'diff' || cmd === 'apply') {
    const stores = ADAPTER_IDS.map(storeOf); const current = new Map(); const w = world();
    for (const a of ADAPTER_IDS) { const ids = new Set(); for (const r of storeOf(a).load().values()) if (r.kind === 'item' && r.id) ids.add(r.id);
      if (!ids.size) continue; const vocab = buildVocab(w.graph);
      for (const it of ADAPTERS[a].collect({ world: w, vocab, model: MODEL, only: [...ids], includeExisting: true })) current.set(it.identity, it); }
    const ctx = { storeDir: STORE_DIR, version: w.version, zhHash: w.MG.zhHash, current, cfgHashOf: a => ADAPTERS[a].cfgHash(MODEL), legacyKeys: opt('legacy-from') ? legacyKeysFrom(opt('legacy-from')) : null };
    const rep = apply({ stores, ctx, dryRun: cmd === 'diff' || !flag('yes') });
    for (const [k, v] of Object.entries(rep.diff)) if (v) console.log(`--- ${k}\n${v}`); delete rep.diff; console.log(JSON.stringify(rep, null, 1));
    if (cmd === 'apply' && !flag('yes')) console.log('未加 --yes：这只是预演，未写入。');
  }
  else if (cmd === 'export') {
    const stores = ADAPTER_IDS.map(storeOf); const current = new Map(); const w = world(); const vocab = buildVocab(w.graph);
    for (const a of ['proof', 'edge-text']) { const ids = new Set(); for (const r of storeOf(a).load().values()) if (r.kind === 'item' && r.id) ids.add(r.id);
      if (ids.size) for (const it of ADAPTERS[a].collect({ world: w, vocab, model: MODEL, only: [...ids], includeExisting: true })) current.set(it.identity, it); }
    console.log(JSON.stringify(exportCandidates({ stores, outFile: path.join(STORE_DIR, 'export', 'candidates.json'), ctx: { current } })));
  }
  else if (cmd === 'store') {
    const sub = argv[1];
    if (sub === 'unlock') {   // 人工解锁：先看属主；--force --token <t> 才删
      const f = path.join(STORE_DIR, opt('lock', 'billing') + '.lock'); const r = Lock.inspect(f); console.log(JSON.stringify(r));
      if (flag('force')) console.log(Lock.forceRemove(f, opt('token')) ? '已删除' : '锁已不存在');
    } else for (const a of adapterList()) { const s = storeOf(a); console.log(a, JSON.stringify(sub === 'compact' ? { kept: s.compact() } : s.verify())); }
  }
  else console.log('用法：runner.mjs inventory [--json --cross] | pilot-select | plan [--adapter A] [--pilot] [--ids a,b] [--limit N] | run --pilot --campaign C --max-usd X --limit N | validate | report | show --identities … | approve --identities …|--all-ok | diff | apply --yes | export | store verify|compact|unlock');
} catch (e) { console.error('✗', String(e.message || e).slice(0, 500)); process.exit(1); }
