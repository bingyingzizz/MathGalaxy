/* ==========================================================================
   内容包 · 常层与常预层（原书 §3.2 的练习 3.49）
   --------------------------------------------------------------------------
   只有一条，但它是后面「离散空间上零调」那一步的前提：
   常（预）层函子保**极限**，于是「在集合层面取极限」与「在层层面取极限」
   是同一件事 —— 这就允许把 $E = \\varinjlim E_i$ 这类构造直接搬到层里。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '常层函子的正合性',
  nodes: [

    {
      id: 'prop.constant-sheaf-preserves-limits',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '常层函子保极限',
      title: '命题：常（预）层函子 $\\Delta$ 保所有极限',
      regions: ['category'],
      tags: ['命题', '常层', '极限', '拓扑斯'],
      statement: [
        '设 $\\mathcal{C}$ 是 site，$\\Delta : \\mathbf{Set} \\to \\widehat{\\mathcal{C}}$ 把集合 $E$ 送到**常预层**，$\\underline{(-)}$ 表示对应的**常层**。则：',
        '',
        '1. 若 $E = \\varprojlim_{i} E_{i}$ 是集合里的极限，则 $\\Delta E = \\varprojlim_{i}\\Delta E_{i}$；',
        '2. 同样地 $\\underline{E} = \\varprojlim_{i}\\underline{E_{i}}$ —— 常层函子也保极限。'
      ].join('\n'),
      notes: [
        ['**证明。**','**1.** 预层范畴里的极限与余极限是**逐点计算**的：$(\\varprojlim \\Delta E_{i})(X) = \\varprojlim (\\Delta E_{i})(X) = \\varprojlim E_{i} = E = (\\Delta E)(X)$，且这在 $X$ 上自然（转移映射都是恒等）✓。于是 $\\Delta E = \\varprojlim \\Delta E_{i}$ ✓。','**2.** 常层函子可以写成 $\\underline{E} = a(\\Delta E)$（$a$ 是层化）。而 $\\Delta$ 还有一条更本质的刻画：**它有一个左伴随**，就是整体截面函子',
        '$$\\Gamma : \\mathcal{T} \\longrightarrow \\mathbf{Set}, \\qquad \\Gamma(F) = \\operatorname{Hom}(1, F) = F(*)$$',
        '（$1$ 是终对象）✓ —— 因为 $\\operatorname{Hom}_{\\mathcal{T}}(1, \\Delta E) = E$ 给出自然双射 $\\Gamma \\dashv \\Delta$ ✓。**右伴随保极限**，所以 $\\Delta$ 保一切极限；再由「层范畴中的极限与预层范畴中的极限一致」（层范畴中的极限逐点算，层化在极限上是恒等）得 $\\underline{E} = \\varprojlim\\underline{E_{i}}$ ✓。∎'].join('\n'),
        '⭐ 一句话：**「常」这个操作是右伴随，所以它把集合里的极限原样搬到层里。** 后面把 $E = \\varinjlim E_{i}$、$E \\times S$ 这类构造搬进凝聚态世界时，用的就是这条。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.2']
    }

  ],

  edges: [
    {
      id: 'def-link.constsheaf-presheaf',
      kind: 'definition',
      definition: 'def.presheaf',
      usedBy: 'prop.constant-sheaf-preserves-limits',
      note: '常预层是「取值恒为 $E$」的那个预层。'
    },
    {
      id: 'def-link.constsheaf-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.constant-sheaf-preserves-limits',
      note: '常层是常预层的层化。'
    }
  ]
});
