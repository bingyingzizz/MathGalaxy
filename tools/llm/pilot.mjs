/* 异质试点的确定性选样（无随机；按 sha256(id) 排序取首个满足条件者）。
   覆盖：节点陈述 ×2、节点说明 ×1、枢纽摘要 ×1、边 note ×1、边 title ×1、
         单证明（蕴含）×1、等价边两个方向 ×2、多种证法（蕴含边 proofs[]）×2。 */
import { sha256 } from './lib/util.mjs';
import { formulasOf, HAN } from './lib/mgload.mjs';
import { proofsOf } from './lib/source.mjs';

const byHash = (a, b) => sha256(a).localeCompare(sha256(b));
const clean = s => !formulasOf(s).some(x => HAN.test(x.tex));

export function selectPilot(world) {
  const { MG, graph } = world; const st = (MG.i18nStatements && MG.i18nStatements.items) || {}; const ab = (MG.i18nAbstracts && MG.i18nAbstracts.items) || {};
  const en = MG.i18nEdgeNotes || {}; const pick = [];
  const first = (arr, why) => { const x = arr.sort((a, b) => byHash(a.id || a, b.id || b))[0]; if (!x) throw new Error('试点选样失败：' + why); return x; };
  const nodes = graph.nodes;
  const stmtOk = (n, type) => n.type === type && String(n.statement || '').length >= 120 && String(n.statement).length <= 500 && clean(n.statement) && !(st[n.id] && st[n.id].statement);
  for (const t of ['definition', 'theorem']) { const n = first(nodes.filter(x => stmtOk(x, t)), 'statement ' + t); pick.push({ adapter: 'node-text', identity: `node:${n.id}:statement`, ids: [n.id], what: `陈述（${t}）` }); }
  { const n = first(nodes.filter(x => String(x.notes || '').length >= 150 && String(x.notes).length <= 600 && clean(x.notes) && !(st[x.id] && st[x.id].notes)), 'notes');
    pick.push({ adapter: 'node-text', identity: `node:${n.id}:notes`, ids: [n.id], what: '说明' }); }
  { const n = first(nodes.filter(x => x.isHub && !ab[x.id] && String(x.statement || '').trim() && (String(x.statement) + String(x.notes || '')).length <= 1100 && clean(x.statement + (x.notes || ''))), 'abstract');
    pick.push({ adapter: 'abstract', identity: `node:${n.id}:abstract`, ids: [n.id], what: '枢纽摘要' }); }
  { const e = first(graph.edges.filter(x => x.id && x.kind === 'implication' && String(x.note || '').length >= 60 && String(x.note).length <= 360 && clean(x.note) && !(en[x.id] && en[x.id].note)), 'edge note');
    pick.push({ adapter: 'edge-text', identity: `edge:${e.id}:note`, ids: [e.id], what: '边说明' }); }
  { const e = first(graph.edges.filter(x => x.id && String(x.title || '').length >= 8 && String(x.title).length <= 80 && clean(x.title) && x.kind === 'implication'), 'edge title');
    pick.push({ adapter: 'edge-text', identity: `edge:${e.id}:title`, ids: [e.id], what: '边标题（仅候选导出）' }); }
  { const e = first(graph.edges.filter(x => x.kind === 'implication' && typeof x.proof === 'string' && x.proof.length >= 150 && x.proof.length <= 700 && clean(x.proof) && formulasOf(x.proof).length >= 2), 'single proof');
    pick.push({ adapter: 'proof', identity: `edge:${e.id}:proof`, ids: [e.id], what: '单证明（蕴含）' }); }
  { const eqs = graph.edges.filter(x => x.kind === 'equivalence' && proofsOf(x).length === 2 && proofsOf(x).every(p => clean(p.text)));
    const e = eqs.sort((a, b) => proofsOf(a).reduce((s, p) => s + p.text.length, 0) - proofsOf(b).reduce((s, p) => s + p.text.length, 0))[0];
    if (!e) throw new Error('试点选样失败：等价边');
    for (const p of proofsOf(e)) pick.push({ adapter: 'proof', identity: p.identity, ids: [e.id], what: `等价证明 · ${p.label || '方向'}` }); }
  { const alt = graph.edges.find(x => x.kind === 'implication' && Array.isArray(x.proofs) && proofsOf(x).length >= 2 && proofsOf(x).every(p => clean(p.text)));
    if (!alt) throw new Error('试点选样失败：多种证法');
    for (const p of proofsOf(alt)) pick.push({ adapter: 'proof', identity: p.identity, ids: [alt.id], what: `多种证法 · ${p.label || p.ordinal}` }); }
  return pick;
}
