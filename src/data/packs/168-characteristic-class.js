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
      一般的示性类理论（陈–Weil、分裂原理、示性类的公理刻画）本图未收录，
      正文里明说了这一点 —— 不装作覆盖了。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '示性类',

  nodes: [
    {
      id: 'def.characteristic-class',
      cluster: 'diffgeom.characteristic',
      type: 'definition',
      label: '示性类',
      title: '示性类：向量丛到上同调的自然变换',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '示性类', '特征类', '向量丛', '上同调'],
      statement: [
        '**要解决什么问题**：丛的同构类由 $\\check{H}^{1}(B; \\mathrm{GL}(k))$ 分类（`thm.bundle-classification`），但那个集合非阿贝尔、没法直接算。示性类把「丛」翻译成「上同调类」—— 上同调是群，能算，于是「两个丛不同构」有了可验证的判据。',
        '',
        '设 $E \\to B$ 是光滑流形上的秩 $k$ 实向量丛。$E$ 的**示性类**（characteristic class）是一族对应',
        '',
        '$$c_{i}(E) \\in H^{i}(B; \\Lambda),$$',
        '',
        '（$\\Lambda$ 取 $\\mathbb{Z}$、$\\mathbb{Z}/2$ 或 $\\mathbb{R}$，看具体类）满足两条公理：',
        '',
        '1. **自然性**：对任意光滑映射 $f : B_{1} \\to B_{2}$ 有 $c_{i}(f^{*}E) = f^{*}c_{i}(E)$；',
        '2. **同构不变**：$E \\cong E_{1}$ $\\implies$ $c_{i}(E) = c_{i}(E_{1})$。',
        '',
        '因此示性类是**从「$B$ 上的向量丛」到「$B$ 的上同调」的自然变换**。',
        '',
        '**两条最基本的示性类**（都要再加规范化才唯一）：',
        '',
        '- 秩 $k$ 实丛的 **Stiefel–Whitney 类** $w_{i}(E) \\in H^{i}(B; \\mathbb{Z}/2)$（$0 \\le i \\le k$），规范化为 $w_{0}(E) = 1$、$i > k$ 时 $w_{i}(E) = 0$，并要求 Whitney 和公式 $w(E \\oplus F) = w(E) \\smile w(F)$（其中 $w = \\sum_{i} w_{i}$）；',
        '- 秩 $k$ 复丛的 **陈类** $c_{i}(E) \\in H^{2i}(B; \\mathbb{Z})$（$0 \\le i \\le k$），同样 $c_{0}(E) = 1$、$i > k$ 时 $c_{i}(E) = 0$，并要求 $c(E \\oplus F) = c(E) \\smile c(F)$。',
        '',
        '自然性、同构不变、$w_{0} = c_{0} = 1$ 与 Whitney 公式，再加上一条定标条件（例如「Möbius 线丛的 $w_{1}$ 非零」与「复射影空间上 tautological 线丛 $\\mathcal{O}(-1)$ 的 $c_{1}=-1$（等价地 $\\mathcal{O}(1)$ 的 $c_{1}=+1$）」），**唯一确定** SW 类与陈类。存在性与唯一性属于示性类的公理刻画定理（分类空间上计算 $H^{\\bullet}(\\mathrm{BO}(k))$ 与 $H^{\\bullet}(\\mathrm{BU}(k))$），本节点只给定义与用法，不证这条定理。'
      ].join('\n'),
      notes: [
        '**定义的展开**：把每个空间 $B$ 上的向量丛看成一个范畴（态射是拉回），示性类就是这个范畴到分次环 $H^{\\bullet}(B;\\Lambda)$ 的自然变换。两条公理合起来只说「拉回与上同调拉回相容」，并**不**指定任何具体数值：零变换也满足它们。所以「示性类」是一族满足公理的对应，具体到 SW 类或陈类，必须再补规范化与 Whitney 公式（上面陈述里已写）。',
        '',
        '**为什么需要 Whitney 公式**：它把丛的直和分解变成类的乘法，从而「线丛的类」决定一切（分裂原理）。例如复线丛 $L$ 有 $c(L) = 1 + c_{1}(L)$，一般复丛用形式分裂 $E \\cong \\bigoplus L_{i}$ 定义 $c(E) = \\prod (1 + c_{1}(L_{i}))$，再证明与分裂无关。实丛用同样的办法，只是系数换成 $\\mathbb{Z}/2$。',
        '',
        '**和结构群约化的关系（障碍，不是判据）**：对实丛，$w_{1}(E) = 0$ 当且仅当 $E$ 可定向，即结构群可从 $\\mathrm{GL}(k)$ 约化到 $\\mathrm{SO}(k)$（`prop.orientable-iff-w1`）；这是等价，不是单向障碍。若 $E$ 已定向，则它带有 $\\mathrm{Spin}(k)$ 结构当且仅当 $w_{2}(E) = 0$（双覆盖的提升障碍）。对光滑流形 $M$，旋结构存在当且仅当 $w_{1}(TM) = 0$ 且 $w_{2}(TM) = 0$。⚠ 不要把「某个类消失」一般地当成结构群可约化的充要条件：$w_{2} = 0$ 对**未定向**丛不够，必须先有 $w_{1} = 0$。',
        '',
        '**至少一个例子**：Möbius 带 $M$ 的切丛（或它的 tautological 线丛）不可定向（`def.mobius-band`），故 $w_{1}(TM) \\ne 0$；这给出「$w_{1}$ 非零所以不能定向」的具体读数。复线丛方面，$\\mathbb{CP}^{1}$ 上的 tautological 线丛 $\\mathcal{O}(-1)$ 满足 $\\int_{\\mathbb{CP}^{1}} c_{1}(\\mathcal{O}(-1)) = -1$（`prop.chern-class-line-bundle`），于是它的任何正整数次幂都给出不同的陈类 —— 这就是「用示性类区分丛」的样板。',
        '',
        '**怎么算**：实用算法是 **陈–Weil 理论** —— 在丛上取一个联络（`def.connection-form`），算曲率形式，示性类就是曲率形式的多项式（不变量），并且与联络的选取无关（差一个恰当形式）。本图的 `def.chern-class` 就是陈–Weil 版定义。分裂原理、公理刻画、$K$ 理论细化都没有展开。',
        '',
        '⚠ **示性类不是完全不变量**：不同的丛可以有相同的示性类（所有平凡丛的示性类都平凡；更微妙的例子需要 $K$ 理论才能分开）。所以它只能**证不同构**：$c_{i}(E) \\ne c_{i}(E_{1})$ 推出 $E \\not\\cong E_{1}$；反过来不成立。',
        '',
        '⚠ **名称**：示性类、特征类、characteristic class 是同一个东西；别与「域的特征」$\\mathrm{char}\\,K$（`def.characteristic`）混淆。',
        '',
        '⚠ **Euler 类不是 SW 类**：Euler 类 $e(E) \\in H^{k}(B;\\mathbb{Z})$ 取整数值，$w_{k}(E)$ 是 $e(E)$ 模 $2$ 的约化；$TS^{2}$ 的 $w_{1} = w_{2} = 0$ 但 $e(TS^{2}) = \\chi(S^{2}) = 2 \\ne 0$，这正是「整系数类能看见、$\\mathbb{Z}/2$ 类看不见」的例子。'
      ].join('\n'),
      refs: ['Milnor–Stasheff, Characteristic Classes · 示性类', 'Bott–Tu, Differential Forms in Algebraic Topology · 陈–Weil 理论']
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
