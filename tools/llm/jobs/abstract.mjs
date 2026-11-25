/* 适配器：枢纽节点的英文摘要 → abstracts.en.js。
   摘要不是逐句翻译，而是对「陈述 + 说明」的忠实简述（现有 39 条 59–127 词）。
   所以：每条一律送审；公式只能取自源文（多重集子集）；不得出现源文没有的断言——模型无法保证，只能人审。
   身份 node:<id>:abstract；底稿 = statement + "\n" + notes（与 MG.enFieldStatus 口径一致）。 */
import { idNode } from '../lib/source.mjs';
import { formulasOf, HAN } from '../lib/mgload.mjs';
import { glossFields } from '../lib/gloss.mjs';
import { systemOf, parseStrict, makeRequest, cfgHashOf, itemKey, linkedTitles, sha256 } from './common.mjs';

export const id = 'abstract';
export const OP = 'abstract';
export const PROMPT_VERSION = 'abstract-v3';
export const SCHEMA_VERSION = 1;
export const SYSTEM = systemOf(PROMPT_VERSION, `Task: write the English abstract of one concept, from its Chinese statement and remarks.
An abstract is a faithful summary of 60-130 words, in plain mathematical English: what the concept is, what it says, why it matters, in the same logical order as the source.
Additional rules for abstracts: use ONLY formulas that already occur in the source (verbatim); do not introduce any claim, example, history or hypothesis that the source does not contain; do not weaken or strengthen the statement.`, '{"id": <id as given>, "en": <translation>, "ambiguities": [<short strings>], "equivalence_confidence": "high"|"medium"|"low"}');
export const params = {};
export const review = { always: true };
export const target = { kind: 'abstracts' };
export const cfgHash = model => cfgHashOf(id, PROMPT_VERSION, SCHEMA_VERSION, SYSTEM, model, params);
export const modeOf = () => 'abstract';

export function collect({ world, vocab, model, only = null, includeExisting = false }) {
  const { MG, graph } = world; const have = (MG.i18nAbstracts && MG.i18nAbstracts.items) || {}; const out = [];
  for (const n of graph.nodes) {
    if ((!n.isHub && !(includeExisting && have[n.id])) || (!includeExisting && have[n.id]) || (only && !only.includes(n.id))) continue;
    const src = (n.statement || '') + '\n' + (n.notes || '');
    if (!String(n.statement || '').trim() || formulasOf(src).some(x => HAN.test(x.tex))) continue;
    const user = { kind: 'node-abstract', id: n.id, node_type: n.type, node_title_zh: n.title || n.label || '', node_title_en: n.title_en || '',
      linked_node_titles_en: linkedTitles(src, graph), ...glossFields(src, vocab, world, 'node', n.id), source_text_zh: src };
    const req = makeRequest({ model, system: SYSTEM, user, maxTokens: 700 });
    const identity = idNode(n.id, 'abstract'), srcHash = sha256(src), cfg = cfgHash(model);
    out.push({ adapter: id, identity, expectId: n.id, scope: 'node', id: n.id, field: 'abstract', zh: src, srcHash, cfgHash: cfg, requests: [req],
      key: itemKey({ identity, srcHash, cfgHash: cfg, partKeys: [req.key] }), basedOnSource: src, writeTarget: { kind: 'abstracts', id: n.id } });
  }
  return out;
}
export function parse(raw) { return parseStrict(raw, { required: ['id', 'en'], optional: ['ambiguities', 'equivalence_confidence'], strings: ['id', 'en'], arrays: ['ambiguities'] }); }
export function assemble(item, parts) { const j = parts[0]; return { id: j.id, en: j.en, ambiguities: j.ambiguities || [], suspected: [], confidence: j.equivalence_confidence || null }; }
export const writeValue = (item, result) => ({ en: result.en });
