#!/usr/bin/env bun
/* 第二遍语义初筛 CLI（可选实验；与翻译分离；不批准、不回写）。规程见 docs/llm-pipeline.md「第二遍语义初筛」。
     bun tools/llm/review2.mjs plan   --from pilot|<bench名> [--model deepseek-flash]        干跑：零请求，列条目与估价
     bun tools/llm/review2.mjs run    --from … --campaign C --max-usd X --limit N [--model M]  唯一计费的一步（需 DEEPSEEK_API_KEY）
     bun tools/llm/review2.mjs report --from …                                              各条的有效/无法核对的发现
     bun tools/llm/review2.mjs eval   --from … --truth <json>                               对照 Claude 人工审阅的标注打分
   译文来源：各翻译结果库里 state ∈ {ok, review, approved} 的条目（pilot：pilot-items.json 的 10 条）。 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/mgload.mjs';
import { world } from './lib/source.mjs';
import { buildVocab } from './lib/glossary.mjs';
import { Store } from './store.mjs';
import { Billing } from './billing.mjs';
import { plan, run, approve } from './batch.mjs';
import { sha256 } from './lib/util.mjs';
import { POLICY, checkTaskCap } from './lib/policy.mjs';
import { httpTransport } from './deepseek.mjs';
import { ADAPTERS } from './jobs/index.mjs';
import * as SR from './jobs/semreview.mjs';
import { locate } from './lib/schedule.mjs';
import { loadBench } from './bench.mjs';

const argv = process.argv.slice(2); const cmd = argv[0]; const flag = n => argv.includes('--' + n); const opt = (n, d = null) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const THINK = opt('thinking', 'on') !== 'off';
const STORE_DIR = process.env.MG_LLM_STORE || path.join(ROOT, '_audit', 'llm-store'); const MODEL = opt('model', 'deepseek-flash'); const FROM = opt('from');

/** 取待评审的译文：{identity,id,kind,zh,en,loc,arm}（zh 取当前源文，与译文记录里的 srcHash 不符的跳过并报告）。 */
export function translationsFrom(from, { dir = STORE_DIR, w = world() } = {}) {
  const vocab = buildVocab(w.graph); const idents = from === 'pilot' ? JSON.parse(fs.readFileSync(path.join(dir, 'pilot-items.json'), 'utf8')).map(x => x.identity) : null;
  const bench = from !== 'pilot' ? loadBench(from) : null; const armOf = bench ? Object.fromEntries(bench.items.map(x => [x.identity, x.arm])) : {};
  const want = idents || bench.items.map(x => x.identity); const out = [], skipped = [];
  for (const [a, ad] of Object.entries(ADAPTERS)) { if (a === 'abstract') continue;
    const st = new Store(dir, ad.OP); const recs = [...st.load().values()].filter(r => r.kind === 'item' && r.result && ['ok', 'review', 'approved'].includes(r.state) && want.includes(r.identity));
    const byIdent = new Map(); for (const r of recs) byIdent.set(r.identity, r);                       // 同身份取最后一条
    if (!byIdent.size) continue;
    for (const it of ad.collect({ world: w, vocab, model: MODEL, includeExisting: true, only: [...new Set([...byIdent.values()].map(r => r.id))] })) {
      const r = byIdent.get(it.identity); if (!r) continue;
      if (r.srcHash !== it.srcHash) { skipped.push({ identity: it.identity, why: '中文源文已变' }); continue; }
      out.push({ adapter: a, key: r.key, identity: it.identity, id: it.id, kind: it.requests[0].kind, zh: it.zh, en: r.result.en, loc: locate(w, it), arm: armOf[it.identity] || null }); } }
  return { translations: out.sort((x, y) => (x.identity < y.identity ? -1 : 1)), skipped, vocab };
}

if (import.meta.main) try {
  if (!FROM) throw new Error('需要 --from pilot|<bench名>');
  const { translations, skipped, vocab } = translationsFrom(FROM); const items = SR.collect({ translations, vocab, model: MODEL, thinking: THINK }); const store = new Store(STORE_DIR, SR.OP);
  if (cmd === 'plan') { const p = plan({ items, store }); delete p._picked; console.log(JSON.stringify({ model: MODEL, dryRun: true, requestsSent: 0, skipped, ...p, note: '估算偏保守：字节当 token + 满额 max_tokens，峰值价。' }, null, 1)); }
  else if (cmd === 'run') {
    if (!process.env.DEEPSEEK_API_KEY) { console.error('DEEPSEEK_API_KEY 未设置：run 不会发出任何请求。'); process.exit(2); }
    const campaign = opt('campaign'), cap = +opt('max-usd'), limit = +opt('limit'); if (!campaign || !(cap > 0) || !(limit > 0)) throw new Error('run 必须同时给 --campaign、--max-usd、--limit');
    checkTaskCap(cap, flag('above-policy')); const billing = new Billing(STORE_DIR, { dailyCapUsd: flag('above-policy') ? null : POLICY.dailyCapUsd }); billing.openCampaign(campaign, cap, { model: MODEL });
    const r = await run({ items, store, billing, campaign, model: MODEL, limit, concurrency: +opt('concurrency', 4), warmup: 1, retryInvalid: flag('retry-failed'), transport: httpTransport({ timeoutMs: 120000 }) });
    fs.appendFileSync(path.join(STORE_DIR, 'runs.jsonl'), JSON.stringify({ t: new Date().toISOString(), campaign, adapter: 'semreview', model: MODEL, stats: r.stats, plan: r.plan }) + '\n');
    console.log(JSON.stringify({ stats: r.stats, budget: r.budget }, null, 1));
  } else if (cmd === 'report' || cmd === 'eval') {
    const have = store.load(); const rows = [];
    for (const it of items) { const rec = have.get(it.requests[0].key); if (!rec || rec.state !== 'fetched') { rows.push({ of: it.of, status: 'no-result' }); continue; }
      const p = SR.parseAndVerify(rec.raw, it); rows.push(p.err ? { of: it.of, status: 'invalid', err: p.err } : { of: it.of, status: 'ok', ...p.ok, usd: rec.usd }); }
    if (cmd === 'report') { for (const r of rows) console.log(r.status !== 'ok' ? `${r.of}  [${r.status}] ${r.err || ''}` : `${r.of}  ${r.overall}  findings=${r.findings.length} (verified ${r.findings.filter(f => f.verified).length})  source_concerns=${r.source_concerns.length}\n` + r.findings.map(f => `    - ${f.type}/${f.severity}${f.verified ? '' : ' [UNVERIFIABLE QUOTE]'}: ${f.zh_quote.slice(0, 40)} ⇢ ${f.en_quote.slice(0, 40)} :: ${f.explanation.slice(0, 120)}`).join('\n')); }
    else {   // eval：truth = { identity: { issues: [{type?, zh_contains, source_side?}], clean: bool } }
      const sc = SR.scoreAgainstTruth(rows, JSON.parse(fs.readFileSync(opt("truth"), "utf8"))); console.log(JSON.stringify(sc.summary, null, 1)); console.log(sc.detail.join('\n'));
    }
  } else if (cmd === 'gate') {   // 确定性处置：pass → (可选)批准；correct → (可选)写返工意见（至多一轮）；escalate/hold → 例外清单给 Claude/作者
    const have = store.load(); const fbFile = path.join(STORE_DIR, 'feedback.json'); const fb = fs.existsSync(fbFile) ? JSON.parse(fs.readFileSync(fbFile, 'utf8')) : {};
    const out = { pass: [], correct: [], escalate: [], hold: [], retry: [] }; const exceptions = [];
    for (const it of items) { const rec = have.get(it.requests[0].key); let row = { of: it.of, status: 'no-result' };
      if (rec && rec.state === 'fetched') { const p = SR.parseAndVerify(rec.raw, it); row = p.err ? { of: it.of, status: 'invalid', err: p.err } : { of: it.of, status: 'ok', ...p.ok }; }
      const corrected = !!fb[sha256(it.zh)]; const g = SR.gateDecision(row, { alreadyCorrected: corrected }); out[g.decision].push(it.of);
      if (['escalate', 'hold', 'retry'].includes(g.decision)) exceptions.push({ identity: it.of, decision: g.decision, why: g.why, findings: (g.findings || []).map(f => ({ type: f.type, severity: f.severity, zh: f.zh_quote.slice(0, 80), en: f.en_quote.slice(0, 80), note: f.explanation.slice(0, 160) })), concerns: (g.concerns || []).map(c => ({ zh: c.zh_quote.slice(0, 80), note: c.explanation.slice(0, 160) })) });
      if (g.decision === 'correct' && flag('write-feedback')) { if (it.requests.length !== 1) throw new Error('多段证明不做自动返工：' + it.of); fb[sha256(it.zh)] = g.findings.map(f => ({ type: f.type, zh_quote: f.zh_quote, en_quote: f.en_quote, explanation: f.explanation })); } }
    if (flag('write-feedback')) fs.writeFileSync(fbFile, JSON.stringify(fb, null, 1));
    let approved = 0; if (flag('approve')) for (const [a, ad] of Object.entries(ADAPTERS)) { const ids = out.pass.filter(i => translations.find(t => t.identity === i && t.adapter === a)); if (ids.length) approved += approve({ store: new Store(STORE_DIR, ad.OP), identities: ids }); }
    fs.writeFileSync(path.join(STORE_DIR, 'exceptions.json'), JSON.stringify(exceptions, null, 1));
    console.log(JSON.stringify({ counts: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])), approved, exceptionsFile: 'exceptions.json（给 Claude/作者的紧凑例外清单）' }, null, 1)); console.log(Object.entries(out).map(([k, v]) => v.map(i => k.padEnd(9) + i).join('\n')).filter(Boolean).join('\n'));
  } else console.log('用法：review2.mjs plan|run|report|gate|eval --from pilot|<bench名> …');
} catch (e) { console.error('✗', String(e.message || e).slice(0, 400)); process.exit(1); }
