/* 适配器共用件：严格 schema、请求构造、身份与键。
   键 = hash({identity, 完整请求体}) —— 术语子集、标题、提示/schema 版本、模型与参数都在请求体里，所以都进缓存身份；
   源文本另存 srcHash（回写时校验「中文没变」）。身份串前缀（node:/edge:）保证节点 id 与边 id 永不相撞。 */
import { buildBody } from '../deepseek.mjs';
import { hashOf, sha256 } from '../lib/util.mjs';
import { estimateUsd } from '../cost.mjs';
import { GLOSSARY_HASH } from '../lib/glossary.mjs';

export const RULES = `Rules:
- Preserve meaning EXACTLY: every assumption, conclusion, quantifier and its scope, order of quantifiers, negation, logical condition and implication direction.
- Do NOT add assumptions, steps or commentary. Do NOT silently correct, complete, simplify, strengthen or weaken the source. If something looks wrong or ambiguous, translate it literally and report it in the separate arrays.
- If a source phrase looks garbled, truncated, ungrammatical, self-contradictory or mathematically doubtful, do NOT guess what was meant and do NOT replace it with a more plausible phrase: translate it as literally as possible (even if the result reads oddly) and report it in "ambiguities" with the quoted Chinese phrase and the reason. A smooth translation of a corrupted source is a failure.
- If the user JSON contains "reviewer_findings", an independent reviewer found problems in an earlier draft of this translation. Fix ONLY those problems, still translating the source literally; never use the findings to repair, complete or reinterpret the Chinese source, and if you disagree with a finding keep your rendering and say why in "ambiguities".
- Copy every LaTeX formula ($...$ and $$...$$) VERBATIM, character for character, in the same order. Never translate or edit anything inside a formula.
- Copy tokens of the form @@some.id@@ verbatim. Copy every backtick exactly as it appears, together with any backslash written immediately before it (the Chinese source often writes node ids between backticks that are each preceded by a backslash; never drop, add or move those characters).
- Use standard English mathematical terminology and the glossary given; American spelling. Do not invent romanizations of Chinese names.
- The user message is JSON. Its "source_text_zh" is the ONLY text to translate; every other field is read-only context.
- Reply with ONLY a json object matching the schema below. Translation is not verification: "equivalence_confidence" is your own estimate, never a guarantee.`;

/* —— 缓存友好的请求结构（DeepSeek 上下文缓存只认「逐 token 相同的前缀」）——
   system = 全局稳定部分（HEAD + RULES，所有适配器逐字相同）→ 内容类型专属规则与 schema（含版本号，放在公共部分之后）。
   user  = JSON，键序固定：kind → glossary（键排序）→ 条目元数据 → source_text_zh（永远最后）。
   前缀里不放时间戳、请求 id、条目 id 等会变的东西；条目 id 在 kind/glossary 之后才出现。 */
export const HEAD = `You translate university-level mathematics from Chinese to English for a public knowledge graph. Everything you write is a draft that a mathematician will review.`;
export const systemOf = (version, typeRules, schema) => `${HEAD}
${RULES}

Content type [${version}]
${typeRules}
Schema: ${schema}`;

/** 严格解析：必须是对象，键集合恰好等于 required ∪ optional，类型合法。 */
export function parseStrict(raw, { required, optional = [], strings = [], arrays = [] }) {
  let j; try { j = JSON.parse(raw); } catch { return { err: '返回不是合法 JSON' }; }
  if (!j || typeof j !== 'object' || Array.isArray(j)) return { err: '返回不是对象' };
  const allowed = new Set([...required, ...optional]);
  for (const k of Object.keys(j)) if (!allowed.has(k)) return { err: `多余字段 ${k}` };
  for (const k of required) if (!(k in j)) return { err: `缺少字段 ${k}` };
  for (const k of strings) if (k in j && typeof j[k] !== 'string') return { err: `${k} 必须是字符串` };
  for (const k of arrays) if (k in j && !(Array.isArray(j[k]) && j[k].every(x => typeof x === 'string'))) return { err: `${k} 必须是字符串数组` };
  if ('equivalence_confidence' in j && !['high', 'medium', 'low'].includes(j.equivalence_confidence)) return { err: 'equivalence_confidence 取值非法' };
  return { ok: j };
}

/** 固定键序：kind → glossary（按键排序）→ 其余元数据（代码里的书写顺序，确定）→ source_text_zh。 */
export function orderUser(user) {
  const { kind, glossary = {}, glossary_extra, source_text_zh, ...meta } = user;
  const sorted = o => { const g = {}; for (const k of Object.keys(o).sort()) g[k] = o[k]; return g; };
  return { kind, glossary: sorted(glossary), ...(glossary_extra && Object.keys(glossary_extra).length ? { glossary_extra: sorted(glossary_extra) } : {}), ...meta, source_text_zh };
}
/** 可缓存前缀的身份 = hash(system + kind + glossary)：同一前缀组的请求逐 token 共享开头。与条目 id、源文无关。 */
export const prefixGroupOf = (system, ordered) => sha256(JSON.stringify([system, ordered.kind, ordered.glossary])).slice(0, 12);

/** 一个请求（part）：构造唯一请求体，并在此处算出缓存键与成本估计。 */
export function makeRequest({ model, system, user, maxTokens, seg = 0, params = {}, thinking = false }) {
  const ordered = orderUser(user);
  const body = buildBody({ model, messages: [{ role: 'system', content: system }, { role: 'user', content: JSON.stringify(ordered) }], maxTokens, params, thinking });
  return { seg, body, key: hashOf(body), est: estimateUsd(body), prefixGroup: prefixGroupOf(system, ordered), kind: ordered.kind };
}
export const itemKey = ({ identity, srcHash, cfgHash, partKeys }) => hashOf({ identity, srcHash, cfgHash, partKeys });
/** 处理配置哈希：含词表配置（glossary.json 的 terms/ambiguous/rules）——词表一改，旧批准与缓存条目都按「配置变了」失效。 */
export const cfgHashOf = (adapterId, promptVersion, schemaVersion, system, model, params = {}) => hashOf({ adapterId, promptVersion, schemaVersion, system, model, params, glossary: GLOSSARY_HASH });
export { sha256 };

/** 链接节点的英文名（只取已有的 title_en/label_en，公开术语） */
export function linkedTitles(zh, graph) {
  const ids = [...new Set((String(zh).match(/@@([^@\s]+)@@/g) || []).map(s => s.slice(2, -2)))].sort(); const out = {};
  for (const id of ids) { const m = graph.byId[id]; if (m && (m.title_en || m.label_en)) out[id] = m.title_en || m.label_en; }
  return out;
}
export const maxTokensFor = zh => Math.min(8192, 500 + Math.ceil(String(zh).length * 2.2));
