/* ==========================================================================
   内容包 · 函子与自然变换（6 条）
   --------------------------------------------------------------------------
   第二团：范畴 → 函子 → 自然变换 → 范畴等价。

   依赖顺序：函子要靠范畴（对象映到对象、态射映到态射）；自然变换要靠函子
   （它是两个函子之间的东西）；全忠实、本质满、等价都是函子的性质。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '函子与自然变换',
  nodes: [

    /* ------------------------------------------------------------ 函子 */
    {
      id: 'def.functor',
      cluster: 'cat.functor',
      type: 'definition',
      label: '函子',
      title: '函子（Functor）',
      regions: ['category'],
      tags: ['范畴论', '函子', '保持复合'],
      statement: [
        '从范畴 $\\mathcal{C}$ 到范畴 $\\mathcal{D}$ 的**函子** $F : \\mathcal{C} \\to \\mathcal{D}$ 由两部分组成：',
        '',
        '- 对象上的映射 $X \\mapsto F(X)$；',
        '- 态射上的映射 $f \\mapsto F(f)$，把 $f : X \\to Y$ 送到 $F(f) : F(X) \\to F(Y)$。',
        '',
        '要求它**保持单位**与**保持复合**：',
        '',
        '$$F(1_X) = 1_{F(X)}, \\qquad F(g \\circ f) = F(g) \\circ F(f)$$',
        '',
        '（只要 $g \\circ f$ 有定义）。反方向的函子 $F : \\mathcal{C}^{\\mathrm{op}} \\to \\mathcal{D}$ 叫**反变函子**。'
      ].join('\n'),
      notes: [
        '两条要求合起来就是一句话：**函子把整个范畴的结构原样搬过去** —— 单位还是单位，复合还是复合，连结合律都不用再验（它自动跟着走）。',
        '例：',
        '',
        [
          '- **遗忘函子** $\\mathbf{Top} \\to \\mathbf{Set}$：$(X, \\tau) \\mapsto X$，连续映射当作普通映射。拓扑被丢掉，所以叫「遗忘」。同理 $\\mathbf{Ab} \\to \\mathbf{Set}$、$\\mathbf{Grp} \\to \\mathbf{Mon}$（含入）。',
          '- $\\mathbf{Set} \\to \\mathbf{Top}$ 有两种：$X \\mapsto (X, \\mathcal{P}(X))$（离散拓扑）与 $X \\mapsto (X, \\{ \\emptyset, X \\})$（平凡拓扑）。两者都对，因为从离散空间射出、射入平凡空间的映射总是连续的。',
          '- **自由构造** $\\mathbf{Set} \\to \\mathbf{Ab}$：$X \\mapsto \\bigoplus_X \\mathbb{Z}$；$\\mathbf{Set} \\to \\mathbf{Grp}$：$X \\mapsto \\langle x, x^{-1} \\mid x \\in X \\rangle$。',
          '- **交换化** $\\mathbf{Grp} \\to \\mathbf{Ab}$：$G \\mapsto G / [G, G]$。',
          '- **群化** $\\mathbf{Mon} \\to \\mathbf{Grp}$：$M \\mapsto M^{gr} = \\langle x_g \\ (g \\in M) \\mid x_g x_h = x_{gh} \\rangle$。',
          '- $\\mathbf{Top}^{\\mathrm{op}} \\to \\mathbf{Cat}$：$(X, \\tau) \\mapsto \\operatorname{Open}(X)$。反变，因为开集越少映射越多。',
        ].join('\n'),
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.2']
    },

    /* -------------------------------------------------------- 自然变换 */
    {
      id: 'def.natural-transformation',
      cluster: 'cat.functor',
      type: 'definition',
      label: '自然变换',
      title: '自然变换（Natural Transformation）',
      regions: ['category'],
      tags: ['范畴论', '自然变换', '自然性'],
      statement: [
        '设 $F, G : \\mathcal{C} \\to \\mathcal{D}$ 是两个函子。从 $F$ 到 $G$ 的**自然变换** $\\alpha : F \\implies G$ 是一族态射',
        '',
        '$$\\alpha_X : F(X) \\to G(X) \\qquad (X \\in \\mathcal{C})$$',
        '',
        '使得对每条 $f : X \\to Y$，方块交换：',
        '',
        '$$G(f) \\circ \\alpha_X = \\alpha_Y \\circ F(f)$$',
        '',
        '每个 $\\alpha_X$ 都是同构时，$\\alpha$ 叫**自然同构**，记 $F \\cong G$。'
      ].join('\n'),
      notes: [
        '一句话：$\\alpha$ 的两个分量各管一头，交换性说的就是「先换函子再走 $f$」与「先走 $f$ 再换函子」结果一样。',
        '有了自然变换，**函子本身也成了对象**：以 $\\mathcal{C} \\to \\mathcal{C}\'$ 的函子为对象、以自然变换为态射，得到一个范畴，记 $\\operatorname{Hom}(\\mathcal{C}, \\mathcal{C}\')$；所有 $F \\implies G$ 的自然变换组成的集合记 $\\operatorname{Nat}(F, G)$。',
        '例：$\\mathbf{CRng} \\to \\mathbf{Grp}$ 上有两个函子 —— $A \\mapsto GL_n(A)$ 与 $A \\mapsto A^{*}$。行列式',
        '',
        '$$\\det_A : GL_n(A) \\to A^{*}$$',
        '',
        '拼起来正是一个**自然变换**：$\\det$ 与环同态「交换次序」。这正是「自然」二字的意思 —— 不是逐例验证出来的巧合，而是结构使然。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.2']
    },

    /* ------------------------------------------------ 忠实 / 满 / 全忠实 */
    {
      id: 'def.ff-faithful',
      cluster: 'cat.functor',
      type: 'definition',
      label: '忠实 / 满 / 全忠实',
      title: '忠实、满、全忠实函子（Faithful / Full / Fully Faithful）',
      regions: ['category'],
      tags: ['范畴论', '函子', 'Hom 集'],
      statement: [
        '函子 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 对每一对对象 $X, Y$ 给出一个映射',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}(X, Y) \\longrightarrow \\operatorname{Hom}_{\\mathcal{C}\'}(F(X), F(Y)), \\qquad f \\mapsto F(f)$$',
        '',
        '按这个映射的性质来命名：',
        '',
        '- **忠实**（faithful）：每个这样的映射都是单射；',
        '- **满**（full）：每个这样的映射都是满射；',
        '- **全忠实**（fully faithful）：每个这样的映射都是双射。'
      ].join('\n'),
      notes: [
        '三个名字说的都是 $F$ 在**态射层**上的表现，与对象层无关 —— 全忠实的函子可以把两个不同对象映到同一个对象上（这在等价里正是允许的）。',
        '忠实保证「态射不被合并」，满保证「目标里的态射都来自源」，两者互不蕴含。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.2']
    },

    /* -------------------------------------------------------- 本质满 */
    {
      id: 'def.essentially-surjective',
      cluster: 'cat.functor',
      type: 'definition',
      label: '本质满',
      title: '本质满函子（Essentially Surjective）',
      regions: ['category'],
      tags: ['范畴论', '函子', '同构'],
      statement: [
        '函子 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 叫**本质满**，如果对 $\\mathcal{C}\'$ 的每个对象 $X\'$，都存在 $\\mathcal{C}$ 中的对象 $X$ 使',
        '',
        '$$F(X) \\cong X\'$$'
      ].join('\n'),
      notes: '注意是 $\\cong$ 而不是 $=$：要求「$F$ 的像**同构于**每个对象」，而不是「$F$ 的像**就是**全体对象」。差这一个同构，正是范畴等价比范畴同构宽松的地方 —— 而恰恰是这一点让它有用，因为绝大多数有趣的等价都不是同构。',
      refs: ['Le Stum, An introduction to condensed mathematics, §1.2']
    },

    /* -------------------------------------------------------- 范畴等价 */
    {
      id: 'def.cat-equivalence',
      cluster: 'cat.functor',
      type: 'definition',
      label: '范畴等价',
      title: '范畴等价（Equivalence of Categories）',
      regions: ['category'],
      tags: ['范畴论', '等价', '同构'],
      statement: [
        '函子 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 叫**范畴等价**，如果存在函子 $G : \\mathcal{C}\' \\to \\mathcal{C}$ 与自然同构',
        '',
        '$$F \\circ G \\cong 1_{\\mathcal{C}\'}, \\qquad G \\circ F \\cong 1_{\\mathcal{C}}$$',
        '',
        '这时记 $\\mathcal{C} \\simeq \\mathcal{C}\'$。若把两个 $\\cong$ 加强成等号 $F \\circ G = 1_{\\mathcal{C}\'}$、$G \\circ F = 1_{\\mathcal{C}}$，则叫**范畴同构**，记 $\\mathcal{C} \\cong \\mathcal{C}\'$。'
      ].join('\n'),
      notes: [
        '同构要求两个复合**等于**恒等函子，等价只要求它们**自然同构于**恒等函子。后者弱得多，也实用得多：例如「有限维向量空间」与「$\\mathbb{F}$ 上的矩阵」等价，但绝不可能是同构（对象层的基数就不对）。',
        '在等价之下，「两个范畴是不是同一个」这个问题被替换成「能不能互相翻译而不丢结构」—— 范畴论后面所有「$\\mathcal{C}$ 与 $\\mathcal{C}\'$ 一样」的说法，用的都是这个意思。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.2']
    }
  ],

  edges: [
    /* ------------------------------------------ 等价 ⟺ 全忠实 + 本质满 */
    {
      id: 'imp.equiv-criterion',
      kind: 'implication',
      sources: ['def.ff-faithful', 'def.essentially-surjective'],
      target: 'def.cat-equivalence',
      title: '全忠实 $+$ 本质满 $\\implies$ 范畴等价',
      proof: [
        '**（$\\Longleftarrow$）** 设 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 全忠实且本质满，要造出 $G$ 与自然同构。',
        '',
        '本质满给出：对每个 $X\' \\in \\mathcal{C}\'$ 都能挑一个 $A \\in \\mathcal{C}$ 与同构 $\\eta_{X\'} : F(A) \\to X\'$。用选择公理把这些选择一次做完，定义 $G(X\') = A$。',
        '',
        '再定义 $G$ 在态射上的作用。给定 $f\' : X\' \\to Y\'$，先把它拉回到 $G(X\')$ 与 $G(Y\')$ 之间：',
        '',
        '$$g = \\eta_{Y\'}^{-1} \\circ f\' \\circ \\eta_{X\'} : F(G(X\')) \\to F(G(Y\'))$$',
        '',
        '由 $F$ 全忠实，$\\operatorname{Hom}(G(X\'), G(Y\')) \\to \\operatorname{Hom}(F G(X\'), F G(Y\'))$ 是双射，所以存在**唯一**的 $G(f\')$ 使 $F(G(f\')) = g$。这个唯一性是关键：它让 $G$ 自动保持复合与单位（两边都取 $F$ 之后相等，再用忠实性拉回来）。于是 $G$ 是函子，且 $\\eta : F \\circ G \\implies 1_{\\mathcal{C}\'}$ 是自然同构。',
        '',
        '另一半 $G \\circ F \\cong 1_{\\mathcal{C}}$ 同法：令 $\\theta = F^{-1}(\\eta_{F(\\cdot)})$，交换性由 $F$ 保持复合、而 $F^{-1}$ 也跟着保持交换图逐块验证。∎',
        '',
        '**（$\\Longrightarrow$）** 设 $F$ 是等价，取 $G$ 与自然同构 $\\beta : G \\circ F \\implies 1_{\\mathcal{C}}$。',
        '',
        '**忠实**：设 $f, g : A \\to B$ 且 $F(f) = F(g)$。$\\beta$ 的自然是说下面两个方块交换：',
        '',
        '$$\\beta_B \\circ G F(f) = f \\circ \\beta_A, \\qquad \\beta_B \\circ G F(g) = g \\circ \\beta_A$$',
        '',
        '左边两式相等（因为 $F(f) = F(g)$），于是 $f \\circ \\beta_A = g \\circ \\beta_A$；$\\beta_A$ 可逆，两边右乘 $\\beta_A^{-1}$ 得 $f = g$。',
        '',
        '**满**：设 $h : F(A) \\to F(B)$。先把 $h$ 沿 $G$ 送过去，再用 $\\beta$ 接回来，得到 $\\mathcal{C}$ 中的态射',
        '',
        '$$f = \\beta_B \\circ G(h) \\circ \\beta_A^{-1} : A \\to B$$',
        '',
        '由 $\\beta$ 的交换性，$G F(f) = G(h)$；再用 $F$ 保持复合，把两边送回 $F(A) \\to F(B)$：$F(f) = h$。',
        '',
        '**本质满**见「定义」处的注解：等价的两个范畴之间对象差一个同构，这正是 $F$ 本质满。∎'
      ].join('\n'),
      note: '这条把「范畴等价」这件看起来要靠造函子的事，换成了两个**可以逐点检查**的条件：Hom 集上双射 + 对象层差一个同构。实际用的时候几乎都走这一条。'
    }
  ]
});
