/* 源数据访问与稳定身份（所有适配器与盘点共用）。只读。
   身份串格式：<scope>:<id>:<field>[:<sub>]  —— 前缀不同则节点 id 与边 id 永不可能相撞。 */
import { loadMG } from './mgload.mjs';
import { sha256 } from './util.mjs';

let _cache = null;
export function world() { return (_cache ||= loadMG()); }

export const idNode = (id, field) => `node:${id}:${field}`;
export const idEdge = (id, field) => `edge:${id}:${field}`;

const PID_LEN = 20;   // 20 个十六进制字符 = 80 位

/** 一条边上所有「证明」的稳定身份。
    · 单证明：`edge:<id>:proof`
    · proofs[]：`edge:<id>:proofs:<pid>`，pid = sha256(label) 前 20 位；顺序只记作元数据，不进身份。
    · 同边内标签重复 / 为空：pid 改用 sha256(label + 文本哈希)，并打 flags（标签改了就是「新」证明，不会静默沿用旧译文）。
    · 同边内 pid 仍相撞（极不可能）：标记 collision，适配器必须拒绝该边。 */
export function proofsOf(edge) {
  const out = [];
  if (typeof edge.proof === 'string' && edge.proof.trim()) {
    out.push({ identity: idEdge(edge.id, 'proof'), edgeId: edge.id, structure: 'single', ordinal: 0, label: '', text: edge.proof, flags: [] });
  }
  if (Array.isArray(edge.proofs)) {
    const labelCount = {};
    for (const p of edge.proofs) labelCount[String(p.label || '')] = (labelCount[String(p.label || '')] || 0) + 1;
    const seen = new Map();
    edge.proofs.forEach((p, i) => {
      const label = String(p.label || ''), text = String(p.text || '');
      if (!text.trim()) return;                      // 没有源文本：缺的是数学内容，不是翻译
      const flags = [];
      let basis = label;
      if (!label.trim()) { flags.push('no-label'); basis = '\u0000' + sha256(text); }
      else if (labelCount[label] > 1) { flags.push('duplicate-label'); basis = label + '\u0000' + sha256(text); }
      const pid = sha256(basis).slice(0, PID_LEN);
      const identity = idEdge(edge.id, `proofs:${pid}`);
      if (seen.has(identity)) flags.push('collision');
      seen.set(identity, true);
      out.push({ identity, edgeId: edge.id, structure: edge.kind === 'equivalence' ? 'equivalence-direction' : 'alternative', ordinal: i, label, text, pid, flags });
    });
  }
  return out;
}

/** 等价边的「被遮住的平行蕴含」：显示路径，**不是**独立翻译源（证明的权威源在那条蕴含边上）。 */
export function parallelImplications(graph) {
  const out = [];
  for (const e of graph.edges) {
    if (e.kind !== 'equivalence') continue;
    for (const o of graph.edges) {
      if (o.kind !== 'implication' || !o.sources || o.sources.length !== 1) continue;
      const s = o.sources[0];
      if ((s === e.a && o.target === e.b) || (s === e.b && o.target === e.a)) out.push({ equivalence: e.id, implication: o.id, hasProof: !!(o.proof || o.proofs) });
    }
  }
  return out;
}

/** 一条边涉及的节点 id（上下文与位置查找共用）。 */
export function endpoints(e) {
  return [...(e.sources || []), e.target, e.a, e.b, e.definition, e.usedBy].filter(Boolean);
}
