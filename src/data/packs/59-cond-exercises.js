/* ==========================================================================
   内容包 · 凝聚态上同调的练习与零调性（7.3.3 / 7.38 / 8.1 ~ 8.11 / 8.16）
   --------------------------------------------------------------------------
   §8.1–8.3 正文里的命题都进图了，但**支撑它们的那些练习还缺**：它们不是零碎
   的习题，而是后面每一步都在用的工具。两条线：

     覆盖有截面 ──▶ 有限不交覆盖零调 ──▶ 离散空间（及 离散 × Stonean）零调
     不交并 ──▶ 上同调是积（7.38）

     Z[S] 投射（Stonean）──▶ RHom(Z[S], N) = N(S)
     Z[E] 自由（离散）  ──▶ RHom(Z[E], N) = N^E ──▶ 离散群上凝聚态 = 抽象
     Ext 的截面公式     ──▶ Ext^n(Z·X, N)(S) = H^n(X × S, N)
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态上同调的零调性与计算',
  nodes: [

    /* ---------------------------------------------------- 7.3.3 */
    {
      id: 'prop.cech-section-vanishing',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '带截面的覆盖上 Čech 零调',
      title: '命题：满射有截面时增广 Čech 复形同伦平凡',
      regions: ['homology'],
      tags: ['命题', 'Čech 上同调', '截面', '同伦'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯，$X_{0} \\xrightarrow{\\ p\\ } X$ 是态射且**有截面** $s$（$p s = 1_{X}$）。记',
        '',
        '$$X_{n} := X_{0} \\times_{X} \\cdots \\times_{X} X_{0} \\quad (n+1 \\text{ 个因子}),$$',
        '',
        '则对 $\\mathcal{T}$ 中任何阿贝尔群 $M$，增广 Čech 复形 $\\check{C}^{\\bullet}\\bigl((X_{0} \\to X)^{+}, M\\bigr)$ 是**同伦平凡**的；特别地',
        '',
        '$$\\check{H}^{n}\\bigl((X_{0} \\to X),\\ M\\bigr) = 0 \\qquad (n > 0).$$',
        '',
        '同伦的形状是 $f \\mapsto f \\circ s^{n}$，其中 $s^{n} : X_{n} \\to X_{n+1}$。'
      ].join('\n'),
      notes: [
        ['**证明。** 对每个 $n \\ge -1$ 取','$$s^{n} := s \\times_{X} 1_{X_{n}} : X_{n} \\longrightarrow X_{n+1}$$','（$n = -1$ 时它就是 $s$ 本身）。这是「沿截面把次数提高一格」的那一族映射，满足收缩同伦的恒等式','$$1_{X_{n}} = s^{n+1} d_{n} + d_{n+1} s^{n}, \\qquad d_{n} := \\sum_{i=0}^{n}(-1)^{i} d^{n}_{i}$$','（把两边逐项展开成各面映射 $d^{n}_{i}$ 的复合即可验证）✓。把 $s^{n}$ 线性延拓到自由对象上，同一恒等式说明 $\\mathbb{Z}\\cdot X^{+}_{\\bullet}$ 上的恒等映射**同伦于 0** —— 即这个复形同伦平凡 ✓。','而 $\\check{C}^{\\bullet} = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X^{+}_{\\bullet},\\ M\\bigr)$，Hom 函子把同伦 $(s^{n})$ 送到同伦 $(\\operatorname{Hom}(s^{n}, M))$，故 Čech 复形也同伦平凡，正次数上同调为零 ✓。∎'].join('\n'),
        '⭐ **有截面 $\\implies$ 没有高次 Čech 上同调**。于是覆盖族里只要有一支映射带截面，整族的 Čech 复形就收缩掉 —— 「同构映射」「有限不交覆盖」这些情形全部自动零调。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.3']
    },

    /* ----------------------------------------------------- 7.38 */
    {
      id: 'prop.cohomology-of-coproduct',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '上同调与不交并',
      title: '命题：$H^{n}(\\coprod_{i} X_{i}, M) \\cong \\prod_{i} H^{n}(X_{i}, M)$',
      regions: ['homology'],
      tags: ['命题', '层上同调', '不交并'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯，$(X_{i})_{i \\in I}$ 是一族对象，$M$ 是 $\\mathcal{T}$ 中的阿贝尔群。则对一切 $n \\ge 0$',
        '',
        '$$H^{n}\\Bigl(\\coprod_{i \\in I} X_{i},\\ M\\Bigr) \\;\\cong\\; \\prod_{i \\in I} H^{n}(X_{i},\\ M).$$'
      ].join('\n'),
      notes: [
        ['**证明。** 取 $M$ 的**内射消解** $I^{\\bullet}$ ✓。截面函子把不交并送成**积**：','$$\\Gamma\\Bigl(\\coprod_{i} X_{i},\\ -\\Bigr) \\;=\\; \\prod_{i} \\Gamma(X_{i},\\ -) ✓$$','（从余积出发的映射恰是一族相容的映射；等价地，$\\Gamma(X, -) = \\operatorname{Hom}(h_{X}, -)$ 而 $h$ 保余积。）于是','$$\\Gamma\\Bigl(\\coprod_{i} X_{i},\\ I^{\\bullet}\\Bigr) = \\prod_{i} \\Gamma(X_{i},\\ I^{\\bullet}) ✓$$','在 $\\mathbf{Ab}$ 里**积是正合的**，所以逐项取积不影响上同调的计算：','$$H^{n}\\Bigl(\\Gamma\\bigl(\\coprod_{i} X_{i},\\ I^{\\bullet}\\bigr)\\Bigr) \\cong \\prod_{i} H^{n}\\bigl(\\Gamma(X_{i},\\ I^{\\bullet})\\bigr) = \\prod_{i} H^{n}(X_{i},\\ M) ✓$$','（每个 $\\Gamma(X_{i}, I^{\\bullet})$ 都算 $H^{n}(X_{i}, M)$：$I^{\\bullet}$ 逐项内射，对**每个**测试对象 $X_{i}$ 仍然给出消解。）∎'].join('\n'),
        '⭐ 一句话：**不交并这一侧是积**。离散空间上的零调（$H^{n}(\\coprod_{e} *, M) = \\prod_{e} H^{n}(*, M) = 0$）就是它的直接推论。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.3']
    },

    /* ----------------------------------------------------- 8.1 */
    {
      id: 'lem.cech-finite-disjoint-acyclic',
      cluster: 'cond.cohomology',
      type: 'lemma',
      label: '有限不交覆盖的 Čech 零调',
      title: '引理：紧 Hausdorff 空间上有限不交覆盖的 Čech 高次为零',
      regions: ['condensed'],
      tags: ['引理', 'Čech 上同调', '零调', '凝聚态'],
      statement: [
        '设 $M$ 是凝聚态阿贝尔群，$S$ 是紧 Hausdorff 空间，且',
        '',
        '$$S = \\bigsqcup_{i=1}^{r} S_{i}$$',
        '',
        '是一个**有限不交覆盖**（$S_{i}$ 两两不交、并为 $S$）。则',
        '',
        '$$\\check{H}^{n}(S, M) = 0 \\qquad (n > 0).$$'
      ].join('\n'),
      notes: [
        ['**证明。** 把覆盖看成族 $(S_{i} \\hookrightarrow S)_{i=1}^{r}$。由两两不交且并为 $S$，规范映射','$$\\coprod_{i=1}^{r} S_{i} \\xrightarrow{\\ \\cong\\ } S$$','是**同构**，于是它有截面（取它的逆）✓。由「带截面的覆盖上 Čech 复形同伦平凡」，这个族的增广 Čech 复形同伦平凡，从而正次数上同调为零 ✓。∎'].join('\n'),
        '⭐ 它把**有限不交覆盖**这一类从 Čech 零调的检验里划掉 —— 于是只剩「单支满射」要处理，这正是「Stone 空间上常系数零调」的证明要分两步走的原因。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.1']
    },

    /* ----------------------------------------------------- 8.2 */
    {
      id: 'prop.condab-discrete-acyclic',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '离散空间上零调',
      title: '命题：凝聚态阿贝尔群在离散空间与「离散 $\\times$ Stonean」上零调',
      regions: ['condensed'],
      tags: ['命题', '凝聚态', '零调', '离散空间'],
      statement: [
        '设 $M$ 是凝聚态阿贝尔群。则',
        '',
        '1. $E$ 是**离散**拓扑空间时 $H^{n}_{\\mathrm{cond}}(E, M) = 0$（$n > 0$）；',
        '2. 更一般地，$E$ 离散、$S$ **Stonean** 时 $H^{n}_{\\mathrm{cond}}(E \\times S,\\ M) = 0$（$n > 0$）。'
      ].join('\n'),
      notes: [
        ['**证明。**','**1.** 离散空间是点的不交并：$E = \\coprod_{e \\in E}\\{e\\}$。而上同调把不交并换成**积**：','$$H^{n}\\Bigl(\\coprod_{i} X_{i},\\ M\\Bigr) \\cong \\prod_{i} H^{n}(X_{i},\\ M) ✓$$','单点的情形是零：$\\{e\\} = *$，它的自由对象是 $\\mathbb{Z}[*] = \\mathbb{Z}$（投射），故 $H^{n}(*, M) = \\operatorname{Ext}^{n}_{\\mathbb{Z}}(\\mathbb{Z}, M) = 0$（$n > 0$）✓。于是离散空间上高次全为零 ✓。','**2.** $E$ 离散时 $E \\times S = \\coprod_{e \\in E} S$ 是 $S$ 的**不交并**，再一次用「不交并 $\\implies$ 积」：','$$H^{n}(E \\times S,\\ M) \\cong \\prod_{e \\in E} H^{n}(S,\\ M) = 0 \\qquad (n > 0),$$','末一步用的是「Stonean 空间上凝聚态阿贝尔群零调」✓。∎'].join('\n'),
        '⭐ 一句话：**零调性从 Stonean 传给「离散 $\\times$ Stonean」**。这就是 $\\mathbb{N} \\times S$、$\\mathbb{Z} \\times S$ 这类混合空间上没有高次上同调的原因。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.1']
    },

    /* ----------------------------------------------------- 8.3 */
    {
      id: 'prop.condab-quotient-r-disc',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'R/R_disc 在 Stone 上的截面',
      title: '命题：$Q = \\mathbb{R}/\\mathbb{R}^{\\mathrm{disc}}$ 的截面是连续函数模局部常值函数',
      regions: ['condensed'],
      tags: ['命题', '凝聚态', '商', '连续函数'],
      statement: [
        '记 $Q := \\mathbb{R}/\\mathbb{R}^{\\mathrm{disc}}$（把 $\\mathbb{R}^{\\mathrm{disc}}$ 看成离散拓扑的加法群，$\\mathbb{R}$ 取通常拓扑，商在凝聚态阿贝尔群里取）。设 $S$ 是 **Stone** 空间。则',
        '',
        '$$Q(S) \\;=\\; C(S, \\mathbb{R})\\,\\big/\\,C(S, \\mathbb{R}^{\\mathrm{disc}}),$$',
        '',
        '即：到 $\\mathbb{R}$ 的连续函数，模去**局部常值**函数。'
      ].join('\n'),
      notes: [
        ['**证明。** 凝聚态阿贝尔群里的短正合列','$$0 \\longrightarrow \\mathbb{R}^{\\mathrm{disc}} \\longrightarrow \\mathbb{R} \\longrightarrow Q \\longrightarrow 0$$','给出长正合列','$$0 \\to \\Gamma(S, \\mathbb{R}^{\\mathrm{disc}}) \\to \\Gamma(S, \\mathbb{R}) \\to \\Gamma(S, Q) \\to H^{1}_{\\mathrm{cond}}(S, \\mathbb{R}^{\\mathrm{disc}}).$$','末项为零：$S$ 是 Stone 空间，而 $\\mathbb{R}^{\\mathrm{disc}}$ 对应的凝聚态阿贝尔群就是**常**凝聚态群 $\\underline{\\mathbb{R}}$，由「Stone 空间上常系数零调」得 $H^{1} = 0$ ✓。再看前两项：$\\Gamma(S, \\mathbb{R}) = \\operatorname{Hom}_{\\mathrm{Cond}}(S, \\mathbb{R}) = C(S, \\mathbb{R})$ ✓；$\\Gamma(S, \\mathbb{R}^{\\mathrm{disc}}) = C(S, \\mathbb{R}^{\\mathrm{disc}})$ —— 映入**离散**空间 $\\mathbb{R}^{\\mathrm{disc}}$ 的连续映射正是**局部常值**映射 ✓（$\\mathbb{R}^{\\mathrm{disc}}$ 的每个单点集都是开的，所以连续函数在每个点上局部常值）。于是 $\\Gamma(S, Q) = C(S,\\mathbb{R})/C(S,\\mathbb{R}^{\\mathrm{disc}})$ ✓。∎'].join('\n'),
        '⚠️ **这个商不是零**：只要 $S$ 上有非常值的连续实值函数（例如 $S = \\beta I$ 时取一个非局部常值的有界函数），$Q(S) \\ne 0$。这与「拓扑阿贝尔群**不是**阿贝尔范畴」是同一件事的两面：在拓扑群层面商不好使，在凝聚态层面才有上面这条正确的截面公式。',
        '⭐ 它也是「$\\mathbb{Z}^{\\mathrm{disc}} \\to \\mathbb{Z}^{\\mathrm{coarse}}$ 型现象」的一般样子：**改拓扑不改底集，却真的改变了层的截面**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.1']
    },

    /* ----------------------------------------------------- 8.8 */
    {
      id: 'cor.ext-cond-set-section',
      cluster: 'cond.cohomology',
      type: 'corollary',
      label: 'Ext 的截面公式',
      title: '推论：$\\operatorname{Ext}^{n}(\\mathbb{Z}\\cdot X, N)(S) \\cong H^{n}(X \\times S, N)$',
      regions: ['condensed'],
      tags: ['推论', 'Ext', '截面', 'Stonean'],
      statement: [
        '设 $X$ 是凝聚态集、$N$ 是凝聚态阿贝尔群、$S$ 是 **Stonean** 空间。则对一切 $n \\ge 0$',
        '',
        '$$\\operatorname{Ext}^{n}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot X,\\ N\\bigr)(S) \\;\\cong\\; H^{n}\\bigl(X \\times S,\\ N\\bigr).$$'
      ].join('\n'),
      notes: [
        ['**证明。** 把 Stonean 上的截面公式 $\\operatorname{Ext}^{n}(M, N)(S) \\cong \\operatorname{Ext}^{n}(M \\cdot S,\\ N)$ 用在 $M = \\mathbb{Z}\\cdot X$ 上：','$$\\operatorname{Ext}^{n}\\bigl(\\mathbb{Z}\\cdot X,\\ N\\bigr)(S) \\cong \\operatorname{Ext}^{n}\\bigl(\\mathbb{Z}\\cdot X \\otimes_{\\mathbb{Z}} \\mathbb{Z}[S],\\ N\\bigr) \\cong \\operatorname{Ext}^{n}\\bigl(\\mathbb{Z}\\cdot (X \\times S),\\ N\\bigr) ✓$$','第二式的依据是自由对象的两条泛性质拼起来：$\\mathbb{Z}\\cdot X \\otimes_{\\mathbb{Z}} \\mathbb{Z}\\cdot Y \\cong \\mathbb{Z}\\cdot (X \\times Y)$ ✓。','又 $\\mathbb{Z}\\cdot Y$ 是**自由**的：$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot Y, -) = \\Gamma(Y, -)$，于是','$$\\operatorname{Ext}^{n}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot Y,\\ N\\bigr) = R^{n}\\Gamma(Y, -)(N) = H^{n}(Y, N) ✓$$','取 $Y = X \\times S$ 即得结论 ✓。∎'].join('\n'),
        '⭐ 这一条把「**层的** Ext 在一个截面上的值」彻底翻译成「一个**具体空间**的上同调」：要算 $\\operatorname{Ext}^{n}(\\mathbb{Z}\\cdot X, N)(S)$，就去算 $X \\times S$ 的上同调。后面两条（离散空间、Banach 系数）都是它的特例。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.3']
    },

    /* ----------------------------------------------------- 8.9 */
    {
      id: 'prop.rhom-zs-sections',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'Stonean 上 Z[S] 的 RHom',
      title: '命题：$\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}[S], N) \\cong N(S)$（$S$ Stonean）',
      regions: ['condensed'],
      tags: ['命题', 'Ext', 'Stonean', '截面'],
      statement: [
        '设 $S$ 是 **Stonean** 空间，$N$ 是凝聚态阿贝尔群。则',
        '',
        '$$\\operatorname{RHom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}[S],\\ N\\bigr) \\;\\cong\\; N(S)$$',
        '',
        '（右边理解为集中在 $0$ 次的复形，即高次 Ext 全为零）。'
      ].join('\n'),
      notes: [
        ['**证明。** $S$ Stonean 时 $\\mathbb{Z}[S]$ 是**投射**对象：极不连通性给出闭开集上的「截面型」投影性，$\\mathbb{Z}[S]$ 是那些 $\\mathbb{Z}[C]$（$C$ 闭开）的余极限，投影性沿余极限保持 ✓。于是','$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}[S],\\ -\\bigr) = \\Gamma(S, -) = \\bigl(N \\mapsto N(S)\\bigr)$$','是**正合**函子，它的右导出函子集中在 $0$ 次、且 $R^{0} = \\Gamma(S,-)$ ✓。因此 $\\operatorname{RHom}(\\mathbb{Z}[S], N)$ 就等于 $\\operatorname{Hom}(\\mathbb{Z}[S], N) = N(S)$（集中在 $0$ 次的复形）✓。∎'].join('\n'),
        '⭐ 与「Stonean 上凝聚态阿贝尔群零调」是同一件事的两种说法：**系数零调 $\\iff$ 测试对象 $\\mathbb{Z}[S]$ 投射**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.3']
    },

    /* ---------------------------------------------------- 8.10 */
    {
      id: 'prop.rhom-ze-powers',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '离散空间上 Z[E] 的 RHom',
      title: '命题：$\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}[E], N) \\cong N^{E}$（$E$ 离散）',
      regions: ['condensed'],
      tags: ['命题', 'Ext', '离散空间', '自由对象'],
      statement: [
        '设 $E$ 是**离散**拓扑空间，$N$ 是凝聚态阿贝尔群。则',
        '',
        '$$\\operatorname{RHom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}[E],\\ N\\bigr) \\;\\cong\\; N^{E} \\;=\\; \\prod_{e \\in E} N$$',
        '',
        '（同样理解为集中在 $0$ 次的复形）。'
      ].join('\n'),
      notes: [
        ['**证明。** 离散空间是不交并 $E = \\coprod_{e \\in E}\\{e\\}$，自由对象随之分裂成**直和**','$$\\mathbb{Z}[E] = \\bigoplus_{e \\in E} \\mathbb{Z}[*] = \\bigoplus_{e \\in E} \\mathbb{Z} ✓$$','投射对象的任意直和仍投射，故 $\\mathbb{Z}[E]$ 投射 ✓，于是 $\\operatorname{RHom}(\\mathbb{Z}[E], -)$ 集中在 $0$ 次、等于 $\\operatorname{Hom}(\\mathbb{Z}[E], -)$。而','$$\\operatorname{Hom}_{\\mathbb{Z}}\\Bigl(\\bigoplus_{e \\in E} \\mathbb{Z},\\ N\\Bigr) \\cong \\prod_{e \\in E} \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z},\\ N) \\cong \\prod_{e \\in E} N = N^{E} ✓$$','（Hom 把直和送成积。）∎'].join('\n'),
        '**另一条路**：由「离散空间上零调」与截面公式，$\\operatorname{Ext}^{n}(\\mathbb{Z}\\cdot E, N)(S) \\cong H^{n}(E \\times S, N) = 0$（$n>0$、$S$ Stonean），说明 $N^{E}$ 这个层没有高次，再逐点比较 $0$ 次即得 —— 两条路说的是同一件事。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.3']
    },

    /* ---------------------------------------------------- 8.11 */
    {
      id: 'prop.discrete-cond-rhom-constant',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '离散群的 RHom 是常层',
      title: '命题：离散阿贝尔群的 RHom 与导出张量积都落在常层里',
      regions: ['condensed'],
      tags: ['命题', '凝聚态', '离散群', 'RHom', '导出张量'],
      statement: [
        '设 $M, N$ 是**离散**阿贝尔群，也把它们看成对应的常凝聚态阿贝尔群。则',
        '',
        '$$\\operatorname{RHom}^{\\mathrm{cond}}_{\\mathbb{Z}}(M,\\ N) \\;\\cong\\; \\mathrm{c}\\bigl(\\operatorname{RHom}^{\\mathrm{abs}}_{\\mathbb{Z}}(M,\\ N)\\bigr), \\qquad M \\otimes^{\\mathbf{L},\\mathrm{cond}}_{\\mathbb{Z}} N \\;\\cong\\; \\mathrm{c}\\bigl(M \\otimes^{\\mathbf{L},\\mathrm{abs}}_{\\mathbb{Z}} N\\bigr),$$',
        '',
        '其中上标 $\\mathrm{cond}$ 表示「在凝聚态阿贝尔群里算」、$\\mathrm{abs}$ 表示「在抽象阿贝尔群里算」，而 $\\mathrm{c}(A)$ 表示**常凝聚态群**。'
      ].join('\n'),
      notes: [
        ['**证明。** 取 $M$ 作为**抽象**阿贝尔群的一个自由消解 $P_{\\bullet} \\to M$ ✓。','- **常层函子在这条消解上保持正合**：$\\mathrm{c}(-)$ 把自由阿贝尔群送到自由凝聚态阿贝尔群 $\\mathbb{Z}[E]$，而且它在离散群上正合，于是 $\\mathrm{c}(P_{\\bullet}) \\to \\mathrm{c}(M)$ 仍是一个消解 ✓。','- **每一项都零调**：$P_{i} = \\mathbb{Z}^{(E)}$ 给出 $\\mathrm{c}(P_{i}) = \\mathbb{Z}[E]$，而 $\\operatorname{RHom}(\\mathbb{Z}[E], N) \\cong N^{E}$ 集中在 $0$ 次（上一条），故这些项对 $\\operatorname{RHom}(-, N)$ 零调 ✓。','- **算出来**：可以用 $\\mathrm{c}(P_{\\bullet})$ 计算内部的 $\\operatorname{RHom}$：','$$\\operatorname{RHom}^{\\mathrm{cond}}\\bigl(\\mathrm{c}(M),\\ N\\bigr) \\cong \\operatorname{Hom}\\bigl(\\mathrm{c}(P_{\\bullet}),\\ N\\bigr) = \\mathrm{c}\\bigl(\\operatorname{Hom}(P_{\\bullet},\\ N)\\bigr),$$','取上同调即得 $\\mathrm{c}\\bigl(\\operatorname{Ext}^{\\bullet}(M,N)\\bigr) = \\mathrm{c}\\bigl(\\operatorname{RHom}^{\\mathrm{abs}}(M,N)\\bigr)$ ✓。','张量侧同理：自由阿贝尔群**平坦**，常层函子正合，于是 $\\mathrm{c}(P_{\\bullet})\\otimes^{\\mathbf{L}} N \\cong \\mathrm{c}(P_{\\bullet}\\otimes^{\\mathbf{L}} N)$，两边取同调得第二个同构 ✓。∎'].join('\n'),
        '⭐ 一句话：**离散群「感觉不到」凝聚态那一层结构** —— 在它们身上，凝聚态同调代数与抽象同调代数给出同一个答案（只差一个常层）。所以要真正用到凝聚态结构，就必须拿 $\\mathbb{R}$、$\\mathbb{Z}[S]$ 这类非离散对象来测。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.3']
    },

    /* ---------------------------------------------------- 8.16 */
    {
      id: 'prop.tensor-rhom-natural-map',
      cluster: 'hom.sheaf',
      type: 'proposition',
      label: '张量与 RHom 的配对',
      title: '命题：$M \\otimes^{\\mathbf{L}} \\operatorname{RHom}(P, N) \\to \\operatorname{RHom}(\\operatorname{RHom}(M, P), N)$',
      regions: ['homology'],
      tags: ['命题', '导出范畴', '内部 Hom', '张量'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯，$M, N, P$ 是 $\\mathcal{T}$ 中的阿贝尔群。则存在自然映射',
        '',
        '$$M \\otimes^{\\mathbf{L}}_{\\mathbb{Z}} \\operatorname{RHom}_{\\mathbb{Z}}(P,\\ N) \\longrightarrow \\operatorname{RHom}_{\\mathbb{Z}}\\bigl(\\operatorname{RHom}_{\\mathbb{Z}}(M,\\ P),\\ N\\bigr).$$'
      ].join('\n'),
      notes: [
        ['**证明（由两条配对拼出来）。**','- **求值配对**：$\\operatorname{RHom}(M, P) \\otimes^{\\mathbf{L}} M \\to P$（把映射作用在元素上，由内部 Hom 与导出张量的伴随给出）✓；','- **复合配对**：$P \\otimes^{\\mathbf{L}} \\operatorname{RHom}(P, N) \\to N$，同理 ✓。','把两者张量起来：','$$M \\otimes^{\\mathbf{L}} \\operatorname{RHom}(M, P) \\otimes^{\\mathbf{L}} \\operatorname{RHom}(P, N) \\longrightarrow P \\otimes^{\\mathbf{L}} \\operatorname{RHom}(P, N) \\longrightarrow N.$$','再用**内部 Hom 与导出张量的伴随**（$A \\otimes^{\\mathbf{L}} X \\to N$ 等价于 $X \\to \\operatorname{RHom}(A, N)$），取 $A = \\operatorname{RHom}(M, P)$、$X = M \\otimes^{\\mathbf{L}} \\operatorname{RHom}(P, N)$，上面这个映射一一对应于','$$M \\otimes^{\\mathbf{L}} \\operatorname{RHom}(P, N) \\longrightarrow \\operatorname{RHom}\\bigl(\\operatorname{RHom}(M, P),\\ N\\bigr) ✓$$','自然性来自两层配对都自然（伴随同构对三个变量都自然）✓。∎'].join('\n'),
        '⚠️ **一般不是同构** —— 要它成为同构需要额外的有限性 / 对偶条件。这条给的是**自然映射**，用处在于把「对偶的 RHom」换成「张量积的 RHom」，从而可以用自由消解去算。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §8.3']
    }

  ],

  edges: [

    /* ------------------------------- 定义引用（蓝线） ------------------------------- */
    {
      id: 'def-link.cechsec-cech',
      kind: 'definition',
      definition: 'def.cech-functor',
      usedBy: 'prop.cech-section-vanishing',
      note: '命题说的就是 Čech 复形，用的是 Čech 函子那套记号。'
    },
    {
      id: 'def-link.cechsec-sheaf',
      kind: 'definition',
      definition: 'def.abelian-sheaf',
      usedBy: 'prop.cech-section-vanishing',
      note: '系数 $M$ 是拓扑斯里的阿贝尔群（阿贝尔层）。'
    },
    {
      id: 'def-link.coprod-cohomology',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.cohomology-of-coproduct',
      note: '命题比较的就是层上同调 $H^{n}(X, M)$。'
    },
    {
      id: 'def-link.coprod-sheaf',
      kind: 'definition',
      definition: 'def.abelian-sheaf',
      usedBy: 'prop.cohomology-of-coproduct',
      note: '系数取拓扑斯里的阿贝尔群。'
    },
    {
      id: 'def-link.fda-cech',
      kind: 'definition',
      definition: 'def.cech-cohomology',
      usedBy: 'lem.cech-finite-disjoint-acyclic',
      note: '结论是关于 Čech 上同调 $\\check{H}^{n}$ 的。'
    },
    {
      id: 'def-link.fda-cond',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'lem.cech-finite-disjoint-acyclic',
      note: '系数是凝聚态阿贝尔群。'
    },
    {
      id: 'def-link.disc-cond',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'prop.condab-discrete-acyclic',
      note: '命题讨论的是凝聚态阿贝尔群的上同调。'
    },
    {
      id: 'def-link.disc-condset',
      kind: 'definition',
      definition: 'def.condensed-set',
      usedBy: 'prop.condab-discrete-acyclic',
      note: '「离散空间 $E$」是通过把拓扑空间看作凝聚态集进来的。'
    },
    {
      id: 'def-link.qdisc-cond',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'prop.condab-quotient-r-disc',
      note: '商 $Q = \\mathbb{R}/\\mathbb{R}^{\\mathrm{disc}}$ 在凝聚态阿贝尔群里取。'
    },
    {
      id: 'def-link.qdisc-topab',
      kind: 'definition',
      definition: 'def.topo-ab-group',
      usedBy: 'prop.condab-quotient-r-disc',
      note: '$\\mathbb{R}$ 与 $\\mathbb{R}^{\\mathrm{disc}}$ 都是拓扑阿贝尔群，$Q$ 是它们的商。'
    },
    {
      id: 'def-link.exsx-condset',
      kind: 'definition',
      definition: 'def.condensed-set',
      usedBy: 'cor.ext-cond-set-section',
      note: '公式左边 $\\mathbb{Z}\\cdot X$ 里的 $X$ 是凝聚态集。'
    },
    {
      id: 'def-link.exsx-cond',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'cor.ext-cond-set-section',
      note: '系数 $N$ 与 Ext 都在凝聚态阿贝尔群里。'
    },
    {
      id: 'def-link.zs-proj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.rhom-zs-sections',
      note: '证明的关键是 $\\mathbb{Z}[S]$ 在 Stonean 上投射。'
    },
    {
      id: 'def-link.zs-cond',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'prop.rhom-zs-sections',
      note: '$N$ 与 $\\operatorname{RHom}$ 都在凝聚态阿贝尔群里。'
    },
    {
      id: 'def-link.ze-proj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'prop.rhom-ze-powers',
      note: '自由对象 $\\mathbb{Z}[E]$ 是投射的（投射对象的直和仍投射）。'
    },
    {
      id: 'def-link.ze-cond',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'prop.rhom-ze-powers',
      note: '同上，$N$ 是凝聚态阿贝尔群。'
    },
    {
      id: 'def-link.drhom-internal',
      kind: 'definition',
      definition: 'def.internal-hom',
      usedBy: 'prop.discrete-cond-rhom-constant',
      note: '内部的 $\\operatorname{RHom}$ 就是内部 Hom 的导出版本。'
    },
    {
      id: 'def-link.drhom-cond',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'prop.discrete-cond-rhom-constant',
      note: '两个 RHom 分别算在凝聚态阿贝尔群与抽象阿贝尔群里。'
    },
    {
      id: 'def-link.trnm-internal',
      kind: 'definition',
      definition: 'def.internal-hom',
      usedBy: 'prop.tensor-rhom-natural-map',
      note: '映射的两端都由内部 Hom（的导出版本）写成。'
    },
    {
      id: 'def-link.trnm-tensor',
      kind: 'definition',
      definition: 'def.tensor-abelian-sheaf',
      usedBy: 'prop.tensor-rhom-natural-map',
      note: '映射左边用到拓扑斯上阿贝尔层的张量积（导出版本）。'
    }

  ]
});
