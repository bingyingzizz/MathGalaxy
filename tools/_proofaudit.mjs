/* ==========================================================================
   tools/_proofaudit.mjs
   证明位置的**诊断**工具（不是门、不是数学审计；永远 exit 0）。
   --------------------------------------------------------------------------
   星图的规矩（docs/workflows/content-quality.md §6）：蕴含的完整证明属于**边**；节点 Notes 放解释、
   出处、限定、例子与数学语境，不是完整证明的存放处。所以这里把「有边上的证明」与「证明只在 Notes 里」
   **分开计**，二者不是互相替代的合规方式（旧版 a/b/c 三选一把 Notes 证明当作合规，已更正；见
   docs/audit-investigation-task2.5.md §2.4、§5）。

   对 theorem / lemma / proposition / corollary 逐个节点分四类：
     edge-proof        有入边 implication 带 proof/proofs，或有 equivalence 边（a/b 含该节点）带 proofs
     notes-only        只有 Notes 里的证明标记、没有边上的证明   → 迁移候选（需语义判断，不得批量搬）
     none              两处都没有                               → 缺证明候选（也可能是公理/外部输入）
   叠加诊断（不是互斥类）：
     dup-candidate     边上有证明，且 Notes 里**也**有证明标记   → 残留/重复证明候选（需读全文判断）

   ⚠ Notes 里的「证明标记」只是正则（出现 ∎ / \blacksquare / QED / 「证明」）。它**只能产生候选**：
     · 命中不等于 Notes 里真有完整证明（可能只是「证明见边」的指针）；
     · 不命中不等于没有：隐藏证明可以没有任何标记（历史上正是因为只认「∎ 在 Notes 最后 80 字符」而漏掉
       Goldstine 等）。所以本工具**不报「Notes 里没有证明」**，只报「命中标记」。
     · 语义判断（是不是完整论证、与边是否重复/不一致、是否正确）属于 docs/workflows/audit.md 的审计，
       不能由本工具的数字代替。
   「有证明」也不等于「证明正确」。骨架（status:'skeleton'）单独报出，不得为了统计删除这个标记。

   用法：bun tools/_proofaudit.mjs [--json] [--list dup|notes-only|none]
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
const g = JSON.parse(fs.readFileSync(path.join(ROOT, 'dist/graph.json'), 'utf8'));

const TYPES = ['theorem', 'lemma', 'proposition', 'corollary'];
const NOTES_MARK = /∎|\\blacksquare|□|QED|证明/;
const hasNotesMark = (n) => NOTES_MARK.test(n.notes || '');
const hasText = (x) => typeof x === 'string' && x.trim().length > 0;
const edgeHasProof = (e) => hasText(e.proof) || (Array.isArray(e.proofs) && e.proofs.some((p) => hasText(p && p.text)));

const edgeProofOf = Object.create(null);   // 节点 id → 带证明的边 id[]
const skeletonOf = Object.create(null);
for (const e of g.edges) {
  const owners = e.kind === 'implication' ? [e.target] : e.kind === 'equivalence' ? [e.a, e.b] : [];
  for (const x of owners) {
    if (!x) continue;
    if (edgeHasProof(e)) (edgeProofOf[x] = edgeProofOf[x] || []).push(e.id);
    if (e.status === 'skeleton') (skeletonOf[x] = skeletonOf[x] || []).push(e.id);
  }
}

const rows = [];
for (const n of g.nodes) {
  if (!TYPES.includes(n.type)) continue;
  const edgeIds = edgeProofOf[n.id] || [];
  const notesMark = hasNotesMark(n);
  const cls = edgeIds.length ? 'edge-proof' : notesMark ? 'notes-only' : 'none';
  rows.push({
    id: n.id, type: n.type, cluster: n.cluster, layer: n.layer, label: n.label, refs: (n.refs || []).length,
    cls, dupCandidate: edgeIds.length > 0 && notesMark, edgeProofs: edgeIds.length,
    skeleton: n.status === 'skeleton' || (skeletonOf[n.id] || []).length > 0,
    notesLen: (n.notes || '').length,
  });
}

const by = (c) => rows.filter((r) => r.cls === c);
const summary = {
  total: rows.length,
  'edge-proof': by('edge-proof').length,
  'notes-only': by('notes-only').length,
  none: by('none').length,
  'dup-candidate': rows.filter((r) => r.dupCandidate).length,
  skeleton: rows.filter((r) => r.skeleton).length,
};

const listIdx = process.argv.indexOf('--list');
const list = listIdx >= 0 ? process.argv[listIdx + 1] : null;
const pick = list === 'dup' ? rows.filter((r) => r.dupCandidate) : list ? by(list) : [];

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ summary, note: 'Notes 标记是正则候选，不是语义结论', rows: list ? pick : undefined }, null, 1));
} else {
  console.log('证明位置诊断（定理/引理/命题/推论；正则候选，非语义结论）');
  console.log('  节点总数                                  ：' + summary.total);
  console.log('  edge-proof  证明在边上                    ：' + summary['edge-proof']);
  console.log('  notes-only  只有 Notes 证明标记（迁移候选）：' + summary['notes-only']);
  console.log('  none        两处都没有（缺证明候选）      ：' + summary.none);
  console.log('  dup-candidate 边上有证明且 Notes 也命中标记 ：' + summary['dup-candidate'] + '  （残留/重复候选，需读全文）');
  console.log('  skeleton    含骨架标记的节点/边           ：' + summary.skeleton + '  （真实缺口，不得为统计去掉标记）');
  console.log('  ⚠ 「Notes 命中」可能只是「证明见边」的指针；「未命中」也不代表 Notes 里没有隐藏证明。语义判断见 docs/workflows/audit.md。');
  if (list) {
    console.log('\n── --list ' + list + '（' + pick.length + '）');
    for (const r of pick) {
      console.log('   ' + r.type.padEnd(11) + r.id.padEnd(40) + 'L' + String(r.layer).padStart(2) + '  edges:' + r.edgeProofs +
        '  notes:' + String(r.notesLen).padStart(4) + '  ' + r.label);
    }
  } else {
    console.log('\n（加 --list dup|notes-only|none 列出明细）');
  }
}
