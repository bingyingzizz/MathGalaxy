/* ============================================================================
   内容包 · 薄接线补洞（2026-11-04，`clustercheck --thin` 第一次扫出来的）
   ----------------------------------------------------------------------------
   `ex.cg-examples`（紧生成空间的例子）此前只挂了一条 `def.compactly-generated → 它`。
   例子应该至少两条：一条指向它印证的概念，再有一条横向的（它用到的别的概念）。
   这里补三条，都在它的正文里真的有内容支撑：

     `def.locally-compact-space`   例 1 的假设是「局部紧 Hausdorff」（局部紧与 Hausdorff 各一条边）
     `def.k-topology`        例 3 的补救：$k$-化把 $\mathbb{R}^{I}$ 换成 $k(\mathbb{R}^{I})$
     `def.weak-hausdorff`    这一团（紧生成 + 弱 Hausdorff）的成对定义

   ⚠ 为什么不把判据放宽、而是补边：一条边的例子在图上像「悬着的注记」，
   顺着它既上不去也下不来；而例子的价值恰恰在「把定义与别的东西勾在一起」。
   ========================================================================== */
(window.MG = window.MG || {}).packs = window.MG.packs || [];
window.MG.packs.push({
  name: '薄接线补洞：紧生成空间的例子',

  nodes: [],

  edges: [
    { id: 'dep.cgex-lc', kind: 'definition', definition: 'def.locally-compact-space', usedBy: 'ex.cg-examples',
      note: '例 1 的假设是「**局部紧 Hausdorff** 空间是紧生成的」—— 用到局部紧的定义（每点有紧邻域）。' },
    { id: 'dep.cgex-hausdorff', kind: 'definition', definition: 'def.hausdorff', usedBy: 'ex.cg-examples',
      note: '例 1 同时要求 **Hausdorff**：局部紧本身不足以让一点紧化 Hausdorff。' },
    { id: 'dep.cgex-ktx', kind: 'definition', definition: 'def.k-topology', usedBy: 'ex.cg-examples',
      note: '例 3 的补救办法是 $k$-化：$\\mathbb{R}^{I}$ 不紧生成，但 $k(\\mathbb{R}^{I})$ 是 —— 用到 $k$-拓扑的定义。' },
    { id: 'dep.cgex-wh', kind: 'definition', definition: 'def.weak-hausdorff', usedBy: 'ex.cg-examples',
      note: '这一团讲的是「紧生成 + 弱 Hausdorff」，例 1–3 正是在这两条条件下讨论谁留在这个范畴里。' },
  ],
});
