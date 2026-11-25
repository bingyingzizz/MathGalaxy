/* 适配器：边上的证明（单证明 / 等价两向 / 多种证法）→ **仅候选导出**（生产界面还不能显示英文证明）。
   身份：edge:<id>:proof ｜ edge:<id>:proofs:<pid>（pid = 标签哈希前 20 位，顺序不进身份；见 lib/source.mjs）。
   忠实翻译：不修复、不补全、不简化、不加强/削弱；疑似数学错误只放进独立的 suspected_errors。翻译 ≠ 验证。
   长证明：结构感知切分（只在空行段落边界、不切 $...$/$$...$$、不切单个段落）；每段都带上**中文原文**的前后文与符号表，
   保证记号一致；各段互相独立，整段重组后**对整条证明重新校验**，并且一律需要人工语义审查。 */
import { idEdge, proofsOf } from '../lib/source.mjs';
import { formulasOf, HAN } from '../lib/mgload.mjs';
import { glossFields } from '../lib/gloss.mjs';
import { endpoints } from './edge-text.mjs';
import { systemOf, parseStrict, makeRequest, cfgHashOf, itemKey, linkedTitles, sha256 } from './common.mjs';

export const id = 'proof';
export const OP = 'proof';
export const PROMPT_VERSION = 'proof-v3';
export const SCHEMA_VERSION = 1;
export const SEG_MAX = 2400;
export const SYSTEM = systemOf(PROMPT_VERSION, `Task: translate one mathematical proof (or one contiguous part of it) faithfully.
Proof-specific rules:
- Keep the order of reasoning, every hypothesis, every variable declaration, every intermediate conclusion and the final conclusion, and the direction of every implication ("A implies B" must not become "B implies A").
- Do not repair, complete, shorten, simplify, strengthen or weaken the argument, even if you believe a step is wrong or missing. Put any suspected mathematical error or gap, quoted briefly, ONLY in "suspected_errors"; the translation itself must stay faithful.
- The JSON has "segment": {"index", "total"}. When total > 1, translate ONLY source_text_zh; "preceding_source_tail", "following_source_head" and "symbols" are read-only context for keeping notation consistent. "label_zh" is the title of this proof (it is non-empty only in segment 0): translate it into "label_en", otherwise return "".`, '{"id": <id as given>, "label_en": <string>, "en": <translation>, "ambiguities": [..], "suspected_errors": [..], "equivalence_confidence": "high"|"medium"|"low"}');
export const params = {};
export const review = { always: true };
export const target = { kind: 'export' };
export const cfgHash = model => cfgHashOf(id, PROMPT_VERSION, SCHEMA_VERSION, SYSTEM + '|' + SEG_MAX, model, params);
export const modeOf = () => 'proof';

/** 结构感知切分。返回 {segments:[{index,text,sep}]} 或 {unsegmentable:reason}。sep = 本段之后的原始分隔（重组用）。 */
export function segmentProof(text, max = SEG_MAX) {
  if (text.length <= max) return { segments: [{ index: 0, text, sep: '' }] };
  const toks = text.split(/(\n[ \t]*\n)/);               // 偶数下标 = 内容，奇数下标 = 分隔（原样保留）
  const blocks = []; let cur = null;
  for (let i = 0; i < toks.length; i += 2) {
    const piece = toks[i], sep = toks[i + 1] || '';
    if (cur) { cur.text += cur.sep + piece; cur.sep = sep; } else cur = { text: piece, sep };
    const t = cur.text, dd = (t.match(/\$\$/g) || []).length, inl = (t.replace(/\$\$/g, '').match(/(?<!\\)\$/g) || []).length;
    if (dd % 2 === 0 && inl % 2 === 0) { blocks.push(cur); cur = null; }     // 公式未闭合就继续并入，绝不在公式里切
  }
  if (cur) return { unsegmentable: '公式/美元符号不配对，无法安全切分' };
  const segs = []; let acc = null;
  for (const b of blocks) {
    if (b.text.length > max) return { unsegmentable: `单个段落 ${b.text.length} 字符超过 ${max}，不能任意切开` };
    if (acc && acc.text.length + acc.sep.length + b.text.length <= max) { acc.text += acc.sep + b.text; acc.sep = b.sep; }
    else { if (acc) segs.push(acc); acc = { text: b.text, sep: b.sep }; }
  }
  if (acc) segs.push(acc);
  segs.forEach((s, i) => { s.index = i; });
  segs[segs.length - 1].sep = '';
  return { segments: segs };
}

const symbolsOf = text => [...new Set(formulasOf(text).filter(f => !f.block && f.tex.length <= 12).map(f => f.tex))].slice(0, 40);

export function collect({ world, vocab, model, only = null }) {
  const { graph } = world; const out = []; out.blocked = [];
  for (const e of graph.edges) {
    if (only && !only.includes(e.id)) continue;
    const ps = proofsOf(e); if (!ps.length) continue;
    if (ps.some(p => p.flags.includes('collision'))) { out.blocked.push({ edge: e.id, reason: '同边证明身份相撞（collision）' }); continue; }
    const ends = {}; for (const nid of endpoints(e)) { const n = graph.byId[nid]; if (n) ends[nid] = n.title_en || n.label_en || ''; }
    for (const p of ps) {
      if (formulasOf(p.text).some(x => HAN.test(x.tex))) { out.blocked.push({ identity: p.identity, reason: '公式含汉字' }); continue; }
      const seg = segmentProof(p.text); if (seg.unsegmentable) { out.blocked.push({ identity: p.identity, reason: seg.unsegmentable }); continue; }
      const total = seg.segments.length; const symbols = symbolsOf(p.text); const requests = [];
      let offset = 0;
      for (const s of seg.segments) {
        const start = p.text.indexOf(s.text, offset); offset = start + s.text.length;
        const user = { kind: 'edge-proof', id: p.identity, edge_kind: e.kind, proof_structure: p.structure, edge_title_zh: e.title || '',
          endpoint_titles_en: ends, label_zh: s.index === 0 ? p.label : '', segment: { index: s.index, total },
          preceding_source_tail: p.text.slice(Math.max(0, start - 500), start), following_source_head: p.text.slice(offset, offset + 200),
          symbols, linked_node_titles_en: linkedTitles(s.text, graph), ...glossFields(s.text, vocab, world, 'edge', e.id), source_text_zh: s.text };
        requests.push(makeRequest({ model, system: SYSTEM, user, maxTokens: Math.min(8192, 700 + Math.ceil(s.text.length * 2.4)), seg: s.index }));
      }
      const srcHash = sha256(p.text + '\u0000' + p.label), cfg = cfgHash(model);
      out.push({ adapter: id, identity: p.identity, expectId: p.identity, scope: 'edge', id: e.id, field: 'proof', zh: p.text, labelZh: p.label, srcHash, cfgHash: cfg, requests,
        segments: seg.segments, proof: { structure: p.structure, ordinal: p.ordinal, pid: p.pid || null, flags: p.flags },
        key: itemKey({ identity: p.identity, srcHash, cfgHash: cfg, partKeys: requests.map(r => r.key) }), basedOnSource: p.text, writeTarget: { kind: 'export' } });
    }
  }
  return out;
}

export function parse(raw) {
  return parseStrict(raw, { required: ['id', 'label_en', 'en'], optional: ['ambiguities', 'suspected_errors', 'equivalence_confidence'], strings: ['id', 'label_en', 'en'], arrays: ['ambiguities', 'suspected_errors'] });
}
/** 重组：按原始分隔拼回；标签取第 0 段；歧义/疑似错误取并集；自评取最低。 */
export function assemble(item, parts) {
  const rank = { high: 3, medium: 2, low: 1 }; let conf = 'high';
  parts.forEach(p => { const c = p.equivalence_confidence || 'medium'; if (rank[c] < rank[conf]) conf = c; });
  return { id: item.identity, label_en: parts[0].label_en, en: parts.map((p, i) => p.en + item.segments[i].sep).join(''),
    ambiguities: parts.flatMap(p => p.ambiguities || []), suspected: parts.flatMap(p => p.suspected_errors || []), confidence: conf };
}
/** 整条证明的额外校验：标签；各段 id 必须回显同一身份。 */
export function validateExtra(item, result, parts) {
  const errors = [], flags = [];
  if (parts.some(p => p.id !== item.identity)) errors.push('某段返回的 id 与证明身份不符');
  if (HAN.test(result.label_en)) errors.push('label_en 含汉字');
  if (item.labelZh.trim() && !result.label_en.trim()) errors.push('源文有标签而译文标签为空');
  if (!item.labelZh.trim() && result.label_en.trim()) flags.push('源文无标签而译文给了标签');
  const a = formulasOf(item.labelZh).map(f => f.tex).sort().join('\n'), b = formulasOf(result.label_en).map(f => f.tex).sort().join('\n');
  if (a !== b) errors.push('标签里的公式与源文不一致');
  if (parts.length > 1) flags.push(`证明被切成 ${parts.length} 段翻译（整条已重新校验，仍须通读）`);
  return { errors, flags };
}
export const writeValue = (item, result) => ({ label_en: result.label_en, text_en: result.en });
