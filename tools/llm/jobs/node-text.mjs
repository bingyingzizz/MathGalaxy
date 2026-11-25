/* 适配器：节点 statement / notes → statements.en.js（旁挂）。
   身份 node:<id>:<statement|notes>；回写目标 statements.en.js（只追加；已有条目不覆盖）。 */
import { idNode } from '../lib/source.mjs';
import { formulasOf, HAN } from '../lib/mgload.mjs';
import { glossFields } from '../lib/gloss.mjs';
import { systemOf, parseStrict, makeRequest, cfgHashOf, itemKey, linkedTitles, maxTokensFor, sha256 } from './common.mjs';

export const id = 'node-text';
export const OP = 'node-text';
export const PROMPT_VERSION = 'node-text-v5';
export const SCHEMA_VERSION = 2;
export const SYSTEM = systemOf(PROMPT_VERSION, 'Task: translate the statement or a remark of one concept (a definition, theorem, etc.).', '{"id": <id as given>, "en": <translation>, "ambiguities": [<short strings>], "equivalence_confidence": "high"|"medium"|"low"}');
export const params = {};
export const review = { always: false };
export const target = { kind: 'statements' };
export const cfgHash = model => cfgHashOf(id, PROMPT_VERSION, SCHEMA_VERSION, SYSTEM, model, params);
export const modeOf = item => item.field;     // validate.mjs 的 mode：statement | notes

export function collect({ world, vocab, model, only = null, fields = ['statement', 'notes'], includeExisting = false }) {
  const { MG, graph } = world; const have = (MG.i18nStatements && MG.i18nStatements.items) || {}; const out = [];
  for (const n of graph.nodes) {
    if (only && !only.includes(n.id)) continue;
    for (const f of fields) {
      const zh = String(n[f] || '');
      if (!zh.trim() || (!includeExisting && have[n.id] && have[n.id][f] && have[n.id][f].en)) continue;     // 无源文 / 已有译文：不是待译项
      if (formulasOf(zh).some(x => HAN.test(x.tex))) continue;                            // 公式含汉字：阻塞，不发送
      out.push(build({ n, f, zh, graph, vocab, model, world }));
    }
  }
  return out;
}

export function build({ n, f, zh, graph, vocab, model, world }) {
  const user = { kind: 'node-' + f, id: n.id, node_type: n.type, node_title_zh: n.title || n.label || '', node_title_en: n.title_en || '',
    linked_node_titles_en: linkedTitles(zh, graph), ...glossFields(zh, vocab, world, 'node', n.id), source_text_zh: zh };
  const req = makeRequest({ model, system: SYSTEM, user, maxTokens: maxTokensFor(zh) });
  const srcHash = sha256(zh), cfg = cfgHash(model); const identity = idNode(n.id, f);
  return { adapter: id, identity, expectId: n.id, scope: 'node', id: n.id, field: f, zh, srcHash, cfgHash: cfg, requests: [req],
    key: itemKey({ identity, srcHash, cfgHash: cfg, partKeys: [req.key] }), basedOnSource: zh,
    writeTarget: { kind: 'statements', id: n.id, field: f } };
}

export function parse(raw) { return parseStrict(raw, { required: ['id', 'en'], optional: ['ambiguities', 'equivalence_confidence'], strings: ['id', 'en'], arrays: ['ambiguities'] }); }
/** parts：已 fetched 的各请求原始内容（本适配器恒为 1 个） */
export function assemble(item, partResults) {
  const j = partResults[0]; return { id: j.id, en: j.en, ambiguities: j.ambiguities || [], suspected: [], confidence: j.equivalence_confidence || null };
}
export const writeValue = (item, result) => ({ en: result.en });
