/* ==========================================================================
   内容包 · 紧生成空间（2 条，后补）
   --------------------------------------------------------------------------
   紧生成空间是 Top 的**余反射**子范畴（与紧 Hausdorff 的反射方向正好相反）。
   它是凝聚态集那段里「底拓扑空间」那一条的必要配角。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '紧生成空间',
  nodes: [

    {
      id: 'def.compactly-generated',
      cluster: 'cat.cg',
      type: 'definition',
      label: '紧生成空间',
      title: '紧生成空间 / $k$-空间（Compactly Generated Space）',
      regions: ['topology', 'category'],
      tags: ['拓扑', '紧生成', 'k-空间'],
      statement: [
        '拓扑空间 $X$ 叫**紧生成的**（也叫 **$k$-空间**），如果它是紧 Hausdorff 空间的余极限。等价地：$X$ 的拓扑由「从紧 Hausdorff 空间进来的连续映射」完全决定 —— 子集 $Y \\subseteq X$ 闭 $\\iff$ 对每个紧 Hausdorff 空间 $S$ 与每个连续映射 $f : S \\to X$，$f^{-1}(Y)$ 在 $S$ 中闭。'
      ].join('\n'),
      notes: '例：局部紧 Hausdorff 空间都是紧生成的。\n\n「由紧 Hausdorff 空间的映射决定拓扑」这句话的意思是：**只要一个子集在所有这类映射下的原像都闭，它就是闭的**。一般拓扑空间不满足这一条 —— 于是紧生成性把那些「测试不够」的空间排除在外，留下的那批在做乘积、函数空间时行为良好。'
    },

    {
      id: 'prop.cg-coreflective',
      cluster: 'cat.cg',
      type: 'proposition',
      label: '紧生成空间是余反射子范畴',
      title: '紧生成空间是 $\\mathbf{Top}$ 的余反射子范畴',
      regions: ['topology', 'category'],
      tags: ['拓扑', '紧生成', '余反射'],
      statement: [
        '紧生成空间构成的范畴 $k\\mathbf{Top}$ 是 $\\mathbf{Top}$ 的**余反射子范畴**：含入函子 $i : k\\mathbf{Top} \\hookrightarrow \\mathbf{Top}$ 有**右**伴随',
        '',
        '$$k : \\mathbf{Top} \\longrightarrow k\\mathbf{Top}, \\qquad X \\mapsto kX$$',
        '',
        '即 $i \\dashv k$。$kX$ 与 $X$ 有同一个集合，拓扑换成紧生成的那一个。'
      ].join('\n'),
      notes: '⭐ 与紧 Hausdorff 对照着记：$\\mathbf{CHaus}$ 是 $\\mathbf{Top}$ 的**反射**子范畴（含入函子有**左**伴随 $\\beta$），而 $k\\mathbf{Top}$ 是**余反射**的（含入函子有**右**伴随 $k$）。一个把空间「收紧」，一个把空间「松开」—— 所以前者对极限封闭，后者对余极限封闭。'
    }
  ],

  edges: []
});
