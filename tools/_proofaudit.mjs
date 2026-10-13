/* ==========================================================================
   tools/_proofaudit.mjs
   查「陈述了却没有证明」的节点。
   --------------------------------------------------------------------------
   判据（星图的规矩是「证明写在边上」，所以证明可以有三处）：
     a) 节点 notes 里自己带证明       —— 出现 ∎ 或「证明」
     b) 有入边 kind='implication' 且该边的 proof 非空 —— 推导拆在边上
     c) 有 equivalence 边（a/b 含该节点）且 proofs 非空
   只查该有证明的类型：theorem / lemma / proposition / corollary。
   用法：bun tools/_proofaudit.mjs [--json]
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const g = JSON.parse(fs.readFileSync(path.join(ROOT, 'dist/graph.json'), 'utf8'));

const TYPES = ['theorem', 'lemma', 'proposition', 'corollary'];
const hasInlineProof = (n) => /∎|证明/.test(n.notes || '');

const inImplProof = Object.create(null);
const eqProof = Object.create(null);
for (const e of g.edges) {
  if (e.kind === 'implication' && e.proof && e.proof.trim()) {
    (inImplProof[e.target] = inImplProof[e.target] || []).push(e.id);
  }
  if (e.kind === 'equivalence' && e.proofs && e.proofs.length) {
    for (const x of [e.a, e.b]) if (x) (eqProof[x] = eqProof[x] || []).push(e.id);
  }
}

const rows = [];
for (const n of g.nodes) {
  if (!TYPES.includes(n.type)) continue;
  const inline = hasInlineProof(n);
  const edge = (inImplProof[n.id] || []).length > 0;
  const eq = (eqProof[n.id] || []).length > 0;
  rows.push({
    id: n.id, type: n.type, cluster: n.cluster, layer: n.layer,
    label: n.label, refs: (n.refs || []).length,
    inline, edge, eq, ok: inline || edge || eq,
    notesLen: (n.notes || '').length, stmtLen: (n.statement || '').length,
  });
}

const bad = rows.filter((r) => !r.ok);
const byCluster = {};
for (const r of bad) (byCluster[r.cluster] = byCluster[r.cluster] || []).push(r);

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ total: rows.length, bad: bad.length, byCluster }, null, 1));
} else {
  console.log('该有证明的节点（定理/引理/命题/推论）：' + rows.length);
  console.log('  有内嵌证明(notes 里 ∎/证明)：' + rows.filter((r) => r.inline).length);
  console.log('  证明拆在 implication 边上   ：' + rows.filter((r) => r.edge).length);
  console.log('  靠 equivalence 的 proofs     ：' + rows.filter((r) => r.eq).length);
  console.log('  ⛔ 一处都没有               ：' + bad.length);
  console.log('    其中带 refs（有出处可查） ：' + bad.filter((r) => r.refs > 0).length);
  console.log('');
  const clusters = Object.keys(byCluster).sort((a, b) =>
    byCluster[b].length - byCluster[a].length);
  for (const c of clusters) {
    console.log('── ' + c + '（' + byCluster[c].length + '）');
    for (const r of byCluster[c]) {
      console.log('   ' + r.type.padEnd(11) + r.id.padEnd(40) +
        'L' + String(r.layer).padStart(2) + '  refs:' + r.refs +
        '  notes:' + String(r.notesLen).padStart(4) + '  ' + r.label);
    }
  }
}
