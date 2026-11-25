#!/usr/bin/env bun
/* 全站成本模型（只读、离线，零请求）。把试点的实测 token 用量对源文长度做线性拟合，外推到当前待译积压。
   区分：翻译-only API 成本 vs 含第二遍初筛、重译、以及人工/Claude 审阅工作量的总工作流。
   ⚠ 拟合只有 10 个点，外推有 ±50% 的不确定；缓存命中率与错误率是情景假设，**不是**测量值。
   用法：bun tools/llm/costmodel.mjs [--json]            */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/mgload.mjs';
import { world } from './lib/source.mjs';
import { buildVocab } from './lib/glossary.mjs';
import { ADAPTERS } from './jobs/index.mjs';
import { PRICING } from './cost.mjs';
import * as SR from './jobs/semreview.mjs';

const P = PRICING.models['deepseek-flash'], PRO = PRICING.models['deepseek-v4-pro'];
const D = process.env.MG_LLM_STORE || path.join(ROOT, '_audit', 'llm-store');
// ---- 1. 试点拟合：prompt/out tokens = a + b × 中文字符数 -------------------------------------------------
const snap = path.join(D, 'pilot1-snapshot'); const w = world(), V = buildVocab(w.graph); const zhBy = {};
for (const ad of Object.values(ADAPTERS)) for (const it of ad.collect({ world: w, vocab: V, model: 'deepseek-flash', includeExisting: true })) zhBy[it.identity] = it.zh.length;
const pts = [];
for (const op of ['node-text', 'edge-text', 'proof']) for (const l of fs.readFileSync(path.join(snap, op + '.jsonl'), 'utf8').split('\n')) { if (!l.trim()) continue; const r = JSON.parse(l); if (r.kind === 'part' && zhBy[r.identity]) pts.push({ zh: zhBy[r.identity], p: r.promptTokens, o: r.tok.out }); }
const fit = (xs, ys) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; const b = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0); return { a: my - b * mx, b }; };
const fp = fit(pts.map(x => x.zh), pts.map(x => x.p)), fo = fit(pts.map(x => x.zh), pts.map(x => x.o));
// ---- 2. 假设（显式，可改）---------------------------------------------------------------------------------
const A = { newPromptExtraInTok: 160, reviewSystemTok: 700, reviewOutTok: 150, hitScenarios: [0.27, 0.5, 0.7], retransScenarios: [0.05, 0.10, 0.20], claudeReadsExceptionsFrac: [0.3, 0.6, 1.0] };
// ---- 3. 积压 ---------------------------------------------------------------------------------------------
const rows = {};
for (const [a, ad] of Object.entries(ADAPTERS)) { if (a === 'abstract') continue;
  for (const it of ad.collect({ world: w, vocab: V, model: 'deepseek-flash' })) { const k = a === 'proof' ? 'proof' : a + '/' + it.field; const r = (rows[k] ||= { reqs: 0, items: 0, zh: 0 }); r.items++; r.reqs += it.requests.length; r.zh += it.zh.length; } }
const T = { reqs: 0, zh: 0, inTok: 0, outTok: 0, items: 0 }; const byType = {};
for (const [k, r] of Object.entries(rows)) { const inTok = r.reqs * (fp.a + A.newPromptExtraInTok) + fp.b * r.zh, outTok = r.reqs * Math.max(fo.a, 0) + fo.b * r.zh; byType[k] = { items: r.items, reqs: r.reqs, zhChars: r.zh, inMTok: +(inTok / 1e6).toFixed(2), outMTok: +(outTok / 1e6).toFixed(2), usdPeakNoCache: +((inTok * P.miss + outTok * P.out) / 1e6).toFixed(2) };
  T.reqs += r.reqs; T.zh += r.zh; T.inTok += inTok; T.outTok += outTok; T.items += r.items; }
const cost = (inTok, outTok, hit, m = P, off = false) => ((inTok * (hit * m.hit + (1 - hit) * m.miss) + outTok * m.out) / 1e6) * (off ? 0.5 : 1);
const trans = A.hitScenarios.map(h => ({ hitRate: h, peakUsd: +cost(T.inTok, T.outTok, h).toFixed(2), offPeakUsd: +cost(T.inTok, T.outTok, h, P, true).toFixed(2) }));
// 第二遍初筛：输入 = 评审提示 + 中文 + 英文译文；输出固定小
const revIn = T.reqs * A.reviewSystemTok + fp.b * T.zh + (fo.b * T.zh + T.reqs * Math.max(fo.a, 0)), revOut = T.reqs * A.reviewOutTok;
const review = { flash: A.hitScenarios.map(h => ({ hitRate: h, peakUsd: +cost(revIn, revOut, h).toFixed(2), offPeakUsd: +cost(revIn, revOut, h, P, true).toFixed(2) })), v4pro: A.hitScenarios.map(h => ({ hitRate: h, peakUsd: +cost(revIn, revOut, h, PRO).toFixed(2) })) };
const retrans = A.retransScenarios.map(r => ({ retranslatedFraction: r, extraPeakUsd_at50pctHit: +(cost(T.inTok, T.outTok, 0.5) * r).toFixed(2) }));
// Claude/人工阅读量（token）：中文 + 英文并排；证明一律读；其它按「被送审比例」
const pairTok = (zh, reqs) => fp.b * zh + fo.b * zh + reqs * Math.max(fo.a, 0);
const proofRead = pairTok(rows.proof.zh, rows.proof.reqs), otherZh = T.zh - rows.proof.zh, otherReqs = T.reqs - rows.proof.reqs;
const readers = A.claudeReadsExceptionsFrac.map(f => ({ fractionOfNonProofItemsSentToClaude: f, claudeReadMTok: +((proofRead + f * pairTok(otherZh, otherReqs)) / 1e6).toFixed(2) }));
const out = { fit: { prompt: `${fp.a.toFixed(0)} + ${fp.b.toFixed(2)}×zhChars`, completion: `${fo.a.toFixed(0)} + ${fo.b.toFixed(2)}×zhChars`, points: pts.length }, assumptions: A, backlog: { items: T.items, requests: T.reqs, zhChars: T.zh }, byType,
  translationOnly: { inMTok: +(T.inTok / 1e6).toFixed(2), outMTok: +(T.outTok / 1e6).toFixed(2), noCachePeakUsd: +cost(T.inTok, T.outTok, 0).toFixed(2), scenarios: trans },
  secondPassReviewIfAllItemsReviewed: { inMTok: +(revIn / 1e6).toFixed(2), outMTok: +(revOut / 1e6).toFixed(2), ...review }, retranslationExtra: retrans,
  humanOrClaudeReadingLoad: { allProofsMTok: +(proofRead / 1e6).toFixed(2), scenarios: readers, note: 'DeepSeek 账单 ≈ 美元量级；Claude/人工审阅的 token 与时间才是主要成本。第二遍初筛的价值 = 减少 Claude 需要读的条目比例，需用基准测准召回率后才能下结论。' },
  caveats: ['拟合 10 点；外推 ±50%', '命中率/重译率/送审比例是情景假设，不是测量', '缓存 64 token 对齐、尽力而为；基准前不应把 50–70% 当作承诺', '第二遍初筛的召回率未知（样本仅 10 条标注）'] };
if (process.argv.includes('--json')) console.log(JSON.stringify(out, null, 1));
else { console.log(JSON.stringify({ fit: out.fit, backlog: out.backlog }, null, 0)); console.table(Object.entries(byType).map(([k, v]) => ({ type: k, ...v })));
  console.log('translation-only', JSON.stringify(out.translationOnly)); console.log('second-pass (all items)', JSON.stringify({ in: out.secondPassReviewIfAllItemsReviewed.inMTok, out: out.secondPassReviewIfAllItemsReviewed.outMTok, flash: review.flash, v4pro: review.v4pro }));
  console.log('retranslation', JSON.stringify(retrans)); console.log('reading load', JSON.stringify(out.humanOrClaudeReadingLoad.scenarios), 'allProofs MTok', out.humanOrClaudeReadingLoad.allProofsMTok); }
