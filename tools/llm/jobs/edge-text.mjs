/* 适配器：边的 note → edge-notes.en.js；边的 title → 仅候选导出（title_en 没有数据层通路）。
   身份 edge:<id>:note / edge:<id>:title。上下文 = 边种类 + 端点节点的英文名（公开术语），不带整张图。 */
import { idEdge, endpoints } from '../lib/source.mjs';
import { formulasOf, HAN } from '../lib/mgload.mjs';
import { glossFields } from '../lib/gloss.mjs';
import { systemOf, parseStrict, makeRequest, cfgHashOf, itemKey, linkedTitles, sha256 } from './common.mjs';

export const id = 'edge-text';
export const OP = 'edge-text';
export const PROMPT_VERSION = 'edge-text-v3';
export const SCHEMA_VERSION = 1;
export const SYSTEM = systemOf(PROMPT_VERSION, 'Task: translate the note or the title of one relation (edge) between two concepts.', '{"id": <id as given>, "en": <translation>, "ambiguities": [<short strings>], "equivalence_confidence": "high"|"medium"|"low"}');
export const params = {};
export const review = { always: false };
export const target = { kind: 'edge-notes' };       // title → export
export const cfgHash = model => cfgHashOf(id, PROMPT_VERSION, SCHEMA_VERSION, SYSTEM, model, params);
export const modeOf = item => (item.field === 'note' ? 'edge-note' : 'edge-title');

export { endpoints };
export function collect({ world, vocab, model, only = null, fields = ['note', 'title'], includeExisting = false }) {
  const { MG, graph } = world; const have = MG.i18nEdgeNotes || {}; const out = [];
  for (const e of graph.edges) {
    if (!e.id || (only && !only.includes(e.id))) continue;
    for (const f of fields) {
      const zh = String(e[f] || ''); if (!zh.trim()) continue;
      if (!includeExisting && f === 'note' && have[e.id] && have[e.id].note && have[e.id].note.en) continue;
      if (formulasOf(zh).some(x => HAN.test(x.tex))) continue;
      const ends = {}; for (const nid of endpoints(e)) { const n = graph.byId[nid]; if (n) ends[nid] = n.title_en || n.label_en || ''; }
      const user = { kind: 'edge-' + f, id: e.id, edge_kind: e.kind, endpoint_titles_en: ends, linked_node_titles_en: linkedTitles(zh, graph),
        ...glossFields(zh, vocab, world, 'edge', e.id), source_text_zh: zh };
      const req = makeRequest({ model, system: SYSTEM, user, maxTokens: Math.min(4096, 400 + Math.ceil(zh.length * 2.2)) });
      const identity = idEdge(e.id, f), srcHash = sha256(zh), cfg = cfgHash(model);
      out.push({ adapter: id, identity, expectId: e.id, scope: 'edge', id: e.id, field: f, zh, srcHash, cfgHash: cfg, requests: [req],
        key: itemKey({ identity, srcHash, cfgHash: cfg, partKeys: [req.key] }), basedOnSource: zh,
        writeTarget: f === 'note' ? { kind: 'edge-notes', id: e.id } : { kind: 'export' } });
    }
  }
  return out;
}
export function parse(raw) { return parseStrict(raw, { required: ['id', 'en'], optional: ['ambiguities', 'equivalence_confidence'], strings: ['id', 'en'], arrays: ['ambiguities'] }); }
export function assemble(item, parts) { const j = parts[0]; return { id: j.id, en: j.en, ambiguities: j.ambiguities || [], suspected: [], confidence: j.equivalence_confidence || null }; }
export const writeValue = (item, result) => ({ en: result.en });
