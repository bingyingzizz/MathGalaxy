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
      title: '命题：常层函子保有限极限；常预层函子保所有极限',
      regions: ['category'],
      tags: ['命题', '常层', '极限', '拓扑斯'],
      statement: [
        '设 $\\mathcal{C}$ 是景，$\\Delta : \\mathbf{Set} \\to \\widehat{\\mathcal{C}}$ 把集合 $E$ 送到**常预层**，$\\underline{(-)}$ 表示对应的**常层**。则：',
        '',
        '1. 若 $E = \\varprojlim_{i} E_{i}$ 是集合里的极限，则 $\\Delta E = \\varprojlim_{i}\\Delta E_{i}$；',
        '2. 常层函子 $\\underline{(-)}$ 保**有限**极限：若 $E = \\varprojlim_{i} E_{i}$ 是有限极限，则 $\\underline{E} = \\varprojlim_{i}\\underline{E_{i}}$。'
      ].join('\n'),
      notes: "⭐ 一句话：**常预层 $\\Delta$ 是右伴随，保一切极限；常层 $\\underline{(-)}=a\\circ\\Delta$ 的左伴随 $a$ 只保有限极限**——这正是「有限极限可以逐点算、余极限要先层化」的来源。",
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
    },
    { id: 'dep.cat-sets-prop-constant-sheaf-preserves-limits', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'prop.constant-sheaf-preserves-limits', note: '陈述以集合范畴 $\\mathbf{Set}$ 为环境范畴' }
  ]
});
