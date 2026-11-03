/* ==========================================================================
   内容包 · 补「示性类」（FACT 待办里挂了两轮的那个）
   --------------------------------------------------------------------------
   用户：「wait，再查查别的啊」

   扫描（`_tools/_termbatch2.mjs`）：**示性类 / 特征类** 在 4 个节点的正文里被提到
   （`def.local-trivialization`、`def.principal-bundle`、`def.frame-bundle`、
   `def.transition-function`、`def.vector-field`、`def.smooth-map`），
   而**没有任何节点以它命名**。FACT 的待办里也一直挂着「还缺：示性类」。

   为什么它重要：丛的分类（`thm.bundle-classification`）说同构类 = Čech $H^{1}$，
   而那个集合**算不出来**；示性类是「从 $H^{1}$ 到可计算的 $H^{*}(B)$ 的函子」，
   于是「两个丛是否同构」有了可判定的必要条件。没有这一环，分类定理是悬空的。

   ⚠️ 本节点只写**定义 + 两条最基本的例子（$w_{1}$、$c_{1}$）**，
      一般的示性类理论（Chern–Weil、分裂原理、示性类的公理刻画）本图未收录，
      正文里明说了这一点 —— 不装作覆盖了。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '示性类',

  nodes: [
    {
      id: 'def.characteristic-class',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '示性类',
      title: '示性类：向量丛到上同调的函子',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '示性类', '特征类', '向量丛', '上同调'],
      statement: [
        '**要解决什么问题**：丛的同构类由 $\\check{H}^{1}(B; \\mathrm{GL}(k))$ 分类（`thm.bundle-classification`），但那个集合是非阿贝尔的、没法直接算。示性类把「丛」翻译成「上同调类」—— 上同调是群，能算，于是「两个丛不同构」有了可验证的判据。',
        '',
        '设 $E \\to B$ 是光滑流形上的秩 $k$ 实向量丛。$E$ 的**示性类**（characteristic class）是一族对应',
        '',
        '$$c_{i}(E) \\in H^{i}(B; \\Lambda),$$',
        '',
        '（$\\Lambda$ 取 $\\mathbb{Z}$、$\\mathbb{Z}/2$ 或 $\\mathbb{R}$，看具体类）满足两条公理：',
        '',
        '1. **自然性**：对任意光滑映射 $f : B\' \\to B$ 有 $c_{i}(f^{*}E) = f^{*}c_{i}(E)$；',
        '2. **同构不变**：$E \\cong E\'$ $\\implies$ $c_{i}(E) = c_{i}(E\')$。',
        '',
        '因此示性类是**从「$B$ 上的向量丛」到「$B$ 的上同调」的自然变换**。',
        '',
        '**两条最基本的**：',
        '',
        '- 秩 $k$ 实丛的 **Stiefel–Whitney 类** $w_{i}(E) \\in H^{i}(B; \\mathbb{Z}/2)$（$i = 0, \\ldots, k$），$w_{1}(E) \\ne 0$ 当且仅当 $E$ 不可定向；',
        '- 秩 $k$ 复丛的 **Chern 类** $c_{i}(E) \\in H^{2i}(B; \\mathbb{Z})$（$i = 0, \\ldots, k$），$c_{1}$ 是那个「第一障碍」。'
      ].join('\n'),
      notes: [
        '**为什么它接在分类定理后面**：分类定理把丛变成 $\\check{H}^{1}(B; G)$（一个只带基点、没有群结构的集合），示性类把它接到 $H^{\\bullet}(B)$（真正的环）。这样做的代价是**丢失信息**：不同的丛可以有相同的示性类（例如所有平凡丛的示性类都平凡）。所以示性类是**必要条件、不是充分条件** —— 它的用处是「证明两个丛不同构」，不是「证明同构」。',
        '**和「换结构群」的关系**：示性类正是结构群约化的**障碍**。最典型的一条：$w_{1}(E) = 0$ 等价于 $E$ 的结构群可从 $\\mathrm{GL}(k)$ 约化到 $\\mathrm{SO}(k)$（即可定向，见 `def.orientable-manifold`）；同理 $w_{2} = 0$ 是 $\\mathrm{Spin}$ 结构存在的先决条件（还有一条额外的整系数条件）。这与 `def.structure-group` 的注里说的「能不能约化是障碍理论问题」是同一件事的两面。',
        '**怎么算出来**：实用算法是 **Chern–Weil 理论** —— 在丛上取一个联络（`def.connection-form`），算它的曲率形式，示性类就是曲率形式的多项式（不变量），并且**与联络的选取无关**（差一个恰当形式）。本图只到「联络 / 曲率形式」为止，Chern–Weil 同态、分裂原理、示性类的公理刻画都**未收录**。',
        '⚠️ **示性类不是丛的不变量，是「丛的同构类」的不变量**：同一个类可以由不同丛给出，所以它给的是 $\\check{H}^{1} \\to H^{\\bullet}$ 的**映射**，不是同构。若想要「完全」不变量，需要用 $K$ 理论或更细的工具。',
        '⚠️ **特征类 / 示性类 / characteristic class 是同一个东西**的中英几种叫法；注意别与「域的特征」（`def.characteristic`）混淆 —— 那个是 $\\mathrm{char}\\,K$。'
      ].join('\n\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 示性类', 'Bott–Tu, Differential Forms in Algebraic Topology']
    }
  ],

  edges: [
    { id: 'dep-cc-vector', kind: 'definition',
      definition: 'def.vector-bundle', usedBy: 'def.characteristic-class',
      note: '示性类是**向量丛**的不变量。' },
    { id: 'dep-cc-class', kind: 'definition',
      definition: 'thm.bundle-classification', usedBy: 'def.characteristic-class',
      note: '它的存在理由就是「分类定理给出一个算不出的集合」—— 示性类把它接到可算的上同调。' },
    { id: 'dep-cc-sg', kind: 'definition',
      definition: 'def.structure-group', usedBy: 'def.characteristic-class',
      note: '示性类正是「结构群能不能约化」的障碍（$w_1$ 对应可定向）。' },
    { id: 'dep-cc-tf', kind: 'definition',
      definition: 'def.transition-function', usedBy: 'def.characteristic-class',
      note: '从转移函数看，示性类是「上闭链的上同调不变量」—— 换基不变，正是上闭链模换基的自然产物。' }
  ]
});
