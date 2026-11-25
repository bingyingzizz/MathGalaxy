/* 第二遍语义初筛（与翻译**逻辑分离**；不在 ADAPTERS 里，不经过 apply/approve，不能批准、不能改写译文）。
   输入：中文原文 + 已生成的英文译文（+ 术语表）。**不传**翻译方的自评/歧义说明，避免锚定。
   输出：只报告实质性语义偏差 / 源文疑点，每条必须逐字引用中文与英文片段——确定性地核对引文是否真在原文/译文里，
   对不上的发现标 unverifiable（多半是模型臆造），不算有效发现。
   它是「省 Claude 读全文」的分诊工具：把例外送给 Claude；完整证明仍须语义审阅后才能最终接受。 */
import { makeRequest, cfgHashOf, itemKey, sha256 } from './common.mjs';
import { selectTerms } from '../lib/glossary.mjs';

export const id = 'semreview';
export const OP = 'semreview';
export const PROMPT_VERSION = 'semreview-v1';
export const SCHEMA_VERSION = 1;
export const TYPES = ['missing_assumption', 'changed_quantifier', 'reversed_implication', 'reversed_equivalence', 'wrong_terminology', 'missing_step', 'silent_source_repair', 'added_content', 'changed_variable_or_scope', 'formula_misplaced', 'other_semantic'];
export const SYSTEM = `You are an independent reviewer of a DRAFT English translation of Chinese university-level mathematics. [${PROMPT_VERSION}]
You receive the Chinese source ("source_text_zh") and the draft translation ("translation_en"). Your only job is to find SUBSTANTIVE semantic discrepancies. You must NOT rewrite, improve or re-translate the text, and you must NOT approve it.

Report a finding only if the meaning of the translation differs from the source in one of these ways:
${TYPES.map(t => '- ' + t).join('\n')}
Typical cases: a hypothesis dropped or added; a quantifier or its scope or order changed; "A implies B" turned into "B implies A" or into an equivalence; a standard term mistranslated or inconsistent with the glossary; a reasoning step or intermediate conclusion omitted or invented; a garbled/doubtful source phrase silently "fixed" into something plausible (silent_source_repair).
Do NOT report: style, word choice, harmless reordering forced by English syntax, or formulas copied verbatim.
Separately list "source_concerns": passages in the CHINESE source that look garbled, ambiguous, mathematically inaccurate or incomplete (this is about the source, not the translation).

Every finding and every source concern MUST quote the exact Chinese fragment ("zh_quote", copied character for character) and, for findings, the exact English fragment ("en_quote", or "" if the content is missing from the translation). If you cannot quote it exactly, do not report it.
If you find nothing substantive, return an empty "findings" array. Reply with ONLY a json object:
{"id": <id as given>, "findings": [{"type": <one of the types above>, "severity": "high"|"medium"|"low", "zh_quote": <string>, "en_quote": <string>, "explanation": <one or two sentences>}], "source_concerns": [{"zh_quote": <string>, "explanation": <string>}], "overall": "no_substantive_issue_found"|"issues_found"}`;
export const params = {};
export const cfgHash = (model, thinking = true) => cfgHashOf(id, PROMPT_VERSION, SCHEMA_VERSION, SYSTEM, model, { ...params, thinking });

/** translations: [{identity, id, kind, zh, en, loc?, arm?}] → 条目（每条一个请求，与翻译同样独立可续跑）。 */
export function collect({ translations, vocab, model, thinking = true }) {
  return translations.map(t => {
    const user = { kind: 'review-' + t.kind, glossary: selectTerms(t.zh, vocab), id: t.id, translation_en: t.en, source_text_zh: t.zh };
    const req = makeRequest({ model, system: SYSTEM, user, maxTokens: thinking ? Math.min(12000, 3500 + Math.ceil(t.zh.length * 2)) : Math.min(3000, 600 + Math.ceil(t.zh.length * 1.2)), thinking });
    const identity = 'review:' + t.identity, srcHash = sha256(t.zh + '\u0000' + t.en), cfg = cfgHash(model, thinking);
    return { adapter: id, identity, of: t.identity, trAdapter: t.adapter, trKey: t.key, expectId: t.id, scope: 'review', id: t.id, field: 'review', zh: t.zh, en: t.en, srcHash, cfgHash: cfg, requests: [req], loc: t.loc, arm: t.arm,
      key: itemKey({ identity, srcHash, cfgHash: cfg, partKeys: [req.key] }) };
  });
}

/** 严格解析 + 引文核对。返回 {ok:{...,findings(带 verified)}} 或 {err}。 */
export function parseAndVerify(raw, it) {
  let j; try { j = JSON.parse(raw); } catch { return { err: '返回不是合法 JSON' }; }
  if (!j || typeof j !== 'object' || Array.isArray(j)) return { err: '返回不是对象' };
  const allowed = new Set(['id', 'findings', 'source_concerns', 'overall']); for (const k of Object.keys(j)) if (!allowed.has(k)) return { err: '多余字段 ' + k };
  if (!Array.isArray(j.findings)) return { err: 'findings 必须是数组' };
  if (!['no_substantive_issue_found', 'issues_found'].includes(j.overall)) return { err: 'overall 取值非法（评审不能给出「通过/批准」）' };
  const norm = s => String(s).replace(/\s+/g, ' ').trim();
  const zn = norm(it.zh), en = norm(it.en); const findings = [];
  for (const f of j.findings) {
    if (!f || typeof f !== 'object' || !TYPES.includes(f.type) || !['high', 'medium', 'low'].includes(f.severity) || typeof f.zh_quote !== 'string' || typeof f.en_quote !== 'string' || typeof f.explanation !== 'string') return { err: 'finding 结构非法' };
    findings.push({ ...f, verified: !!f.zh_quote.trim() && zn.includes(norm(f.zh_quote)) && (!f.en_quote.trim() || en.includes(norm(f.en_quote))) });
  }
  const concerns = (Array.isArray(j.source_concerns) ? j.source_concerns : []).filter(c => c && typeof c.zh_quote === 'string').map(c => ({ ...c, verified: zn.includes(norm(c.zh_quote)) }));
  return { ok: { id: j.id, findings, source_concerns: concerns, overall: j.overall } };
}

/** 把评审结果对照人工标注打分（确定性）。rows: [{of, status:'ok', findings, source_concerns}]；truth: {identity:{issues:[{zh_contains,type?,source_side?}], clean?}}。
    有效发现 = 引文核对通过且 severity ≠ low。标注来自 Claude 的人工审阅，样本小，只作相对参照。 */
export function scoreAgainstTruth(rows, truth) {
  let seeded = 0, caught = 0, clean = 0, falsePos = 0, unverif = 0, total = 0; const detail = [];
  for (const r of rows) {
    const t = truth[r.of]; if (!t || r.status !== 'ok') continue;
    const vf = r.findings.filter(f => f.verified && f.severity !== 'low'); unverif += r.findings.filter(f => !f.verified).length; total += r.findings.length;
    for (const iss of t.issues || []) { seeded++;
      const hit = iss.source_side ? r.source_concerns.some(c => c.verified && (c.zh_quote.includes(iss.zh_contains) || iss.zh_contains.includes(c.zh_quote)))
        : vf.some(f => f.zh_quote.includes(iss.zh_contains) || iss.zh_contains.includes(f.zh_quote) || (iss.type && f.type === iss.type));
      if (hit) caught++; detail.push(`${hit ? 'CAUGHT ' : 'MISSED '} ${iss.source_side ? '[source]' : '[translation]'} ${r.of} :: ${iss.zh_contains}`); }
    if (t.clean) { clean++; if (vf.length) { falsePos++; detail.push(`FALSEPOS ${r.of} :: ${vf.map(f => f.type).join(',')}`); } }
  }
  return { summary: { truthSource: 'Claude 人工审阅（样本小，仅作相对参照）', seededIssues: seeded, caught, recall: seeded ? +(caught / seeded).toFixed(2) : null, cleanItems: clean, cleanItemsWithSubstantiveFinding: falsePos,
    falsePositiveRate: clean ? +(falsePos / clean).toFixed(2) : null, findingsTotal: total, unverifiableQuotes: unverif }, detail };
}

/** 门（gate）：把一条评审结果变成确定性的处置。只有「引文核对通过」的发现才算数。
    pass     无有效的中/高发现、无有效源文疑点 → 可批准（仍是 draft；证明/边标题只导出候选）
    correct  有有效的中/高发现、尚未返工过 → 带着发现返工一次（reviewer_findings），再评审
    escalate 返工后仍有有效发现，或属 silent_source_repair（译文无法修复源文问题）→ 交给 Claude
    hold     译文无异议但有有效源文疑点 → 不回写，列给作者（登记簿）
    retry    评审本身失败/无结果 */
export function gateDecision(row, { alreadyCorrected = false } = {}) {
  if (!row || row.status !== 'ok') return { decision: 'retry', why: [row ? row.status : 'no-row'] };
  const vf = row.findings.filter(f => f.verified && f.severity !== 'low'); const sc = row.source_concerns.filter(c => c.verified);
  if (vf.some(f => f.type === 'silent_source_repair')) return { decision: 'escalate', why: ['silent_source_repair'], findings: vf };
  if (vf.length) return alreadyCorrected ? { decision: 'escalate', why: ['返工后仍有有效发现'], findings: vf } : { decision: 'correct', why: vf.map(f => f.type), findings: vf };
  if (sc.length) return { decision: 'hold', why: ['源文疑点'], concerns: sc };
  return { decision: 'pass', why: [], unverifiableFindings: row.findings.filter(f => !f.verified).length };
}
