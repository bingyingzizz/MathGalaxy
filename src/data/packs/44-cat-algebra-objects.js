/* ==========================================================================
   内容包 · 范畴里的代数结构（3 条）
   --------------------------------------------------------------------------
   把「群」从集合上搬到**任意有有限积的范畴**里 —— 只需把
   「元素之间的等式」换成「态射之间的交换图」。

   于是得到 $\mathrm{Mon}(\mathcal{C})$、$\mathrm{Gr}(\mathcal{C})$、$\mathrm{Ab}(\mathcal{C})$。
   ⭐ 这是整个星图的枢纽之一：
   $\mathrm{Ab}(\mathbf{Set}) = \mathbf{Ab}$、$\mathrm{Ab}(\mathbf{Top})$ = 拓扑阿贝尔群、
   $\mathrm{Ab}(\mathrm{Cond}) = \mathrm{CondAb}$ ——
   「集合 + 运算 + 公理」那条线，和「$\mathrm{Cond}$ 上的阿贝尔群」那条线，在这里合成一条。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '范畴里的代数结构',
  nodes: [

    /* ------------------------------------------------------ 幺半群对象 */
    {
      id: 'def.monoid-object',
      cluster: 'cat.algebra',
      type: 'definition',
      label: '幺半群对象',
      title: '幺半群对象（Monoid Object）',
      regions: ['category', 'algebra'],
      tags: ['范畴论', '代数结构', '幺半群对象', '笛卡尔范畴'],
      statement: [
        '设 $\\mathcal{C}$ 是有**有限积**的范畴（也叫**笛卡尔范畴**），$1$ 是它的终对象。$\\mathcal{C}$ 中的**幺半群对象**是一个对象 $G$ 连同一个**乘法**',
        '',
        '$$\\mu : G \\times G \\longrightarrow G$$',
        '',
        '与一个**单位** $\\varepsilon : 1 \\to G$，使下面两个方块交换：',
        '',
        '$$\\begin{array}{ccc} G\\times G\\times G & \\xrightarrow{\\;\\mu \\times \\mathrm{id}\\;} & G \\times G \\\\[2pt] {\\scriptstyle \\mathrm{id}\\times \\mu}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle \\mu} \\\\[2pt] G \\times G & \\xrightarrow[\\;\\mu\\;]{} & G \\end{array} \\qquad \\begin{array}{ccc} G & \\xrightarrow{\\;\\varepsilon \\times \\mathrm{id}\\;} & G \\times G \\\\[2pt] {\\scriptstyle \\mathrm{id}\\times \\varepsilon}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle \\mu} \\\\[2pt] G \\times G & \\xrightarrow[\\;\\mu\\;]{} & G \\end{array}$$'
      ].join('\n'),
      notes: [
        '⭐ **格式一模一样**：还是「对象 + 态射 + 公理」，只是**公理从等式换成了交换图** —— 「$a(bc) = (ab)c$」变成了「两个复合态射相等」。集合上的幺半群就是这个定义在 $\\mathcal{C} = \\mathbf{Set}$ 时的样子。',
        '**为什么要求有限积**：乘法要拿「两个自变量」说话，而范畴里「两个」就是积 $G \\times G$；单位要拿「没有自变量」说话，那就是终对象 $1 \\to G$。',
        '**态射**：两个幺半群对象之间的态射 $f : G \\to G\'$ 是使 $f \\circ \\mu = \\mu\' \\circ (f\\times f)$ 且 $f \\circ \\varepsilon = \\varepsilon\'$ 的态射。全体构成范畴 $\\mathrm{Mon}(\\mathcal{C})$。',
        '⚠️ 名字上容易和「$\\mathcal{C}$ 上的预层 / 群层」混：这里说的是**范畴内部**的一个对象带结构（「内部」的意思），不是值在群里的函子。'
      ].join('\n\n')
    },

    /* -------------------------------------------------------- 群对象 */
    {
      id: 'def.group-object',
      cluster: 'cat.algebra',
      type: 'definition',
      label: '群对象与阿贝尔群对象',
      title: '群对象与阿贝尔群对象（Group Object）',
      regions: ['category', 'algebra'],
      tags: ['范畴论', '代数结构', '群对象', '阿贝尔群对象', 'CondAb'],
      statement: [
        '设 $G$ 是笛卡尔范畴 $\\mathcal{C}$ 里的一个**幺半群对象**。若存在态射',
        '',
        '$$\\iota : G \\longrightarrow G$$',
        '',
        '使下方方块交换（$\\iota$ 就是「取逆」），则称 $G$ 是 $\\mathcal{C}$ 里的**群对象**：',
        '',
        '$$\\begin{array}{ccc} G & \\xrightarrow{\\;(\\iota,\\ \\mathrm{id})\\;} & G \\times G \\\\[2pt] {\\scriptstyle (\\mathrm{id},\\ \\iota)}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle \\mu} \\\\[2pt] G \\times G & \\xrightarrow[\\;\\mu\\;]{} & G \\end{array}$$',
        '',
        '再若 $\\mu \\circ \\tau = \\mu$（$\\tau : G \\times G \\to G \\times G$ 是**交换因子**，交换两个分量），则称 $G$ 是**阿贝尔群对象**。'
      ].join('\n'),
      notes: [
        '记 $\\mathrm{Gr}(\\mathcal{C})$、$\\mathrm{Ab}(\\mathcal{C})$ 为 $\\mathcal{C}$ 中群对象、阿贝尔群对象连同保结构态射构成的范畴。',
        '⭐ **同一套定义，换范畴就换出一整个世界**：',
        '',
        [
          '- $\\mathrm{Ab}(\\mathbf{Set}) = \\mathbf{Ab}$ —— 就是通常的阿贝尔群；',
          '- $\\mathrm{Ab}(\\mathbf{Top})$ = **拓扑阿贝尔群**（群运算连续）；',
          '- $\\mathrm{Ab}(\\mathbf{Manifold})$ = 阿贝尔 Lie 群；',
          '- **$\\mathrm{Ab}(\\mathrm{Cond}) = \\mathrm{CondAb}$** —— 凝聚态阿贝尔群；',
          '- $\\mathrm{Ab}(\\widehat{\\mathcal{C}})$ = 预层范畴里的阿贝尔群对象。',
        ].join('\n'),
        '',
        '⭐⭐ **所以「凝聚态阿贝尔群 = 凝聚态集范畴里的阿贝尔群对象」这句话不是新定义，只是这条定义代进 $\\mathcal{C} = \\mathrm{Cond}$。** 整个星图里「集合 + 运算 + 公理 $\to$ 群 $\to$ 阿贝尔群」那条线，到这一层就和凝聚态那条线接上了。',
        '⚠️ 群对象**不要求**范畴有极限（只用有限积），所以它比「在拓扑斯里做代数」适用范围更广。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------------ 例 */
    {
      id: 'ex.ab-of-categories',
      cluster: 'cat.algebra',
      type: 'example',
      label: 'Ab(C) 的例子',
      title: '$\\mathrm{Ab}(-)$ 在几个范畴上的样子',
      regions: ['category', 'algebra'],
      tags: ['范畴论', '代数结构', '例子', '阿贝尔群对象'],
      statement: [
        '- $\\mathrm{Ab}(\\mathbf{Set}) = \\mathbf{Ab}$；',
        '- $\\mathrm{Ab}(\\mathbf{Top})$ = **拓扑阿贝尔群**；',
        '- $\\mathrm{Ab}(\\mathbf{Manifold})$ = 阿贝尔 Lie 群；',
        '- $\\mathrm{Ab}(\\mathbf{Grp}) = \\mathbf{Ab}$（群对象之间的运算是逐点的）；',
        '- $\\mathrm{Ab}(\\mathrm{Cond}) = \\mathrm{CondAb}$；',
        '- $\\mathrm{Ab}(\\widehat{\\mathcal{C}})$ = 预层范畴里的阿贝尔群对象 $\\simeq$ 值在 $\\mathbf{Ab}$ 的预层。'
      ].join('\n'),
      notes: '⭐ 这张表最有用的一点是**反着读**：想研究拓扑阿贝尔群，就把 $\\mathcal{C}$ 取成 $\\mathbf{Top}$；想研究凝聚态阿贝尔群，就把 $\\mathcal{C}$ 取成 $\\mathrm{Cond}$。**同一个定义、同一套定理（核、余核、正合列……）直接搬**。\n\n⚠️ $\\mathrm{Ab}(\\mathbf{Grp}) = \\mathbf{Ab}$ 这条最容易让人愣一下：群范畴里的群对象**恰好是**阿贝尔群（Eckmann–Hilton 论证）—— 「群」这个结构加在「群」这个范畴上时，会强制交换性。'
    }
  ],

  edges: []
});
