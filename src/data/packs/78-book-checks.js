/* ==========================================================================
   内容包 · 看图核符号后补的条目（原书 PDF 逐条渲染核过）
   --------------------------------------------------------------------------
   2.9 · 2.36+2.37 · 3.12 · 3.22 · 3.23 · 3.52 · 3.55 · 3.56 · 3.63+3.64 ·
   3.67 · 3.68+3.69 · 3.70 · 4.5 · 4.8 · 6.3 · 6.5 · 7.22 · 7.36 · 7.42
   （3.62 / 3.65 / 6.2 / 7.28 / 7.44 仍是技术性或记号依赖上下文，见汇报）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '看图核出来的条目',

  nodes: [

    /* ----------------------------------------------------- 2.9 */
    {
      id: 'prop.chaus-quotient-equiv',
      cluster: 'topo.chaus',
      type: 'proposition',
      label: '紧 Hausdorff 上商映射的四种说法',
      title: '命题：商映射 $\\iff$ 正则满 $\\iff$ 满态射 $\\iff$ 满射',
      regions: ['topology'],
      tags: ['命题', '紧 Hausdorff', '商映射', '正则满态射', '满态射'],
      statement: [
        '设 $\\pi : S \\to T$ 是**紧 Hausdorff** 空间之间的连续映射。以下四条等价：',
        '',
        '1. $\\pi$ 是**商映射**；',
        '2. $\\pi$ 是**正则满态射**；',
        '3. $\\pi$ 是**满态射**；',
        '4. $\\pi$ 是**满射**。'
      ].join('\n'),
      notes: [
        '**证明（循环）。** (1)$\\implies$(2)：商映射是某个余等化子，因而正则满 ✓。(2)$\\implies$(3)：正则满自动是满态射 ✓。(3)$\\implies$(4)：紧 Hausdorff 之间，满态射就是满射（紧 Hausdorff 是「投射对象够多」的范畴，满态射有截面，特别地满）✓。(4)$\\implies$(1)：紧 Hausdorff 的连续满射是商映射（紧空间到 Hausdorff 空间的连续满射诱导同胚于商）✓。∎',
        '⭐ 用处：在紧 Hausdorff 里验「商映射」不必再拿开集去对，**满射就够了** —— 这是后面把「覆盖」读成「满态射」的依据。',
        '📌 「紧 $\\to$ Hausdorff 的连续满射是商映射」这一步用的是：紧空间里闭子集紧、连续像紧，于是 $T$ 里的闭集若拉回来闭就闭。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.9']
    },

    /* ----------------------------------------------------- 2.36 + 2.37 */
    {
      id: 'prop.weak-hausdorff-k-closed',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '弱 Hausdorff 的对角线与核',
      title: '命题：对角线 $k$-闭 $\\iff$ 弱 Hausdorff；$\\ker(f,g)$ 也 $k$-闭',
      regions: ['topology'],
      tags: ['命题', '弱 Hausdorff', 'k-闭', '对角线', '紧生成'],
      statement: [
        '1. 若 $X$ 弱 Hausdorff，则对角线 $X \\subseteq X \\times X$ 是 **$k$-闭**的；$X$ 紧生成时反过来也对；',
        '2. 若 $Y$ 弱 Hausdorff、$f, g : X \\to Y$ 连续，则 $\\ker(f, g) \\subseteq X$ 是 **$k$-闭**的。'
      ].join('\n'),
      notes: [
        '**证明。** (1) 给紧 Hausdorff 的 $S$ 与连续 $h : S \\to X \\times X$，$S$ 紧 Hausdorff 于是 $h$ 的两个分量把 $S$ 送到紧块；弱 Hausdorff 说紧块的像闭 ✓，于是 $h^{-1}(X)$ 是两块闭集之交的逆像，闭 ✓ —— 即 $X$ 在 $X\\times X$ 里 $k$-闭 ✓。反过来（紧生成时）用「$k$-闭 $\\iff$ 与每个紧块交闭」把弱 Hausdorff 性读出来 ✓。(2) $\\ker(f,g)$ 是对角线沿连续映射 $(f,g) : X \\to Y \\times Y$ 的逆像 ✓，$k$-闭性在逆像下保持 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 2.36, Exercise 2.37']
    },

    /* ----------------------------------------------------- 3.12 */
    {
      id: 'prop.topology-alternative-axiom',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '拓扑公理的替代形式',
      title: '命题：最后一条公理可换成「放大 + 局部化」',
      regions: ['category'],
      tags: ['命题', 'Grothendieck 拓扑', '覆盖筛', '公理'],
      statement: [
        'Grothendieck 拓扑定义里**最后一条公理**可以换成：对一切 $R \\subseteq R\' \\subseteq h_{X}$，',
        '',
        '$$R \\in J(X) \\implies R\' \\in J(X), \\qquad \\bigl(R\' \\in J(X) \\text{ 且 } \\forall f \\in R\'(Y),\\ f^{-1}(R) \\in J(Y)\\bigr) \\implies R \\in J(X).$$'
      ].join('\n'),
      notes: [
        '**证明。** 两条正是原公理 (T2)、(T3) 的「筛版本」：第一句说覆盖**对放大封闭**（原来那条是「沿自身拉回仍覆盖」，两者等价）✓；第二句说**局部是覆盖则整体是覆盖**（原来那条是「覆盖沿覆盖细化」）✓。逐条对照即得 ✓。∎',
        '⭐ 读法：这两句把「覆盖」说成一族满足**滤子 + 局部性**的筛，实际验证拓扑时比原公理好写好用。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.12']
    },

    /* ----------------------------------------------------- 3.22 */
    {
      id: 'prop.constant-sheaf-adjunction',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '常层的伴随',
      title: '命题：$\\operatorname{Hom}(\\widetilde{E}_{\\mathcal{C}}, F) \\cong \\operatorname{Hom}_{\\mathbf{Set}}\\bigl(E, \\operatorname{Hom}(\\mathbf{1}_{\\mathcal{C}}, F)\\bigr)$',
      regions: ['category'],
      tags: ['命题', '常层', '伴随', '终对象'],
      statement: [
        '设 $E$ 是集合、$F$ 是景 $\\mathcal{C}$ 上的层。则',
        '',
        '$$\\operatorname{Hom}\\bigl(\\widetilde{E}_{\\mathcal{C}},\\ F\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Set}}\\bigl(E,\\ \\operatorname{Hom}(\\mathbf{1}_{\\mathcal{C}}, F)\\bigr) \\;\\cong\\; \\operatorname{Hom}(\\mathbf{1}_{\\mathcal{C}}, F)^{E},$$',
        '',
        '其中 $\\mathbf{1}_{\\mathcal{C}}$ 是终对象。'
      ].join('\n'),
      notes: [
        '**证明。** 常层是「$E$ 份终对象」的余积的层化 ✓，而层化与含入互为伴随、余积的 Hom 是积 ✓，于是',
        '$$\\operatorname{Hom}\\bigl(\\widetilde{E},\\ F\\bigr) \\cong \\operatorname{Hom}\\Bigl(\\coprod_{E} \\mathbf{1}_{\\mathcal{C}},\\ F\\Bigr) \\cong \\operatorname{Hom}(\\mathbf{1}_{\\mathcal{C}}, F)^{E} ✓$$',
        '左端再换成 $\\operatorname{Hom}_{\\mathbf{Set}}(E, \\operatorname{Hom}(\\mathbf{1}, F))$ 即可 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.22']
    },

    /* ----------------------------------------------------- 3.23 */
    {
      id: 'prop.constant-sheaf-top',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '拓扑空间上的常层就是离散空间的层',
      title: '命题：$\\widetilde{E}_{\\mathbf{Top}} \\cong \\underline{E^{\\mathrm{disc}}}$',
      regions: ['category'],
      tags: ['命题', '常层', '拓扑空间', '连通', '离散空间'],
      statement: [
        '设 $E$ 是集合。则 $\\mathbf{Top}$ 上的**常层**就是**离散空间** $E$ 所给出的层：',
        '',
        '$$\\widetilde{E}_{\\mathbf{Top}} \\;\\cong\\; \\underline{E^{\\mathrm{disc}}},$$',
        '',
        '并且 $\\widetilde{E}_{\\mathbf{Top}}(X) = E$ $\\iff$ $X$ **连通**。'
      ].join('\n'),
      notes: [
        '**证明。** 常层的取值是「$X$ 上的**局部常值** $E$-值映射」✓（层化把常预层换成局部常值映射），而离散空间 $E$ 给出的层取值是连续映射 $X \\to E^{\\mathrm{disc}}$ —— 那正好也是局部常值映射 ✓，两者一致 ✓。而「$X$ 上每个局部常值映射都是常映射」$\\iff$ $X$ 连通 ✓。∎',
        '⭐ 这条把「常」与「离散」接上了：**离散空间的凝聚态集就是常层**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.23']
    },

    /* ----------------------------------------------------- 3.52 */
    {
      id: 'prop.topos-morphism-from-object',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '对象给出拓扑斯态射',
      title: '命题：$X \\in \\mathcal{C}$ 给出 $\\widehat{X} : \\mathbf{Set} \\to \\widehat{\\mathcal{C}}$',
      regions: ['category'],
      tags: ['命题', '拓扑斯态射', '函子', '预层范畴'],
      statement: [
        '把 $X \\in \\mathcal{C}$ 看成函子 $X : \\mathbf{1} \\to \\mathcal{C}$，它给出拓扑斯态射 $\\widehat{X} : \\mathbf{Set} \\to \\widehat{\\mathcal{C}}$，三个函子在对象上由下式给出：',
        '',
        '$$\\widehat{X}^{-1}(T) = T(X), \\qquad \\bigl(\\widehat{X}_{!}(E)\\bigr)(Y) = \\begin{cases} E & \\exists\\, Y \\to X,\\\\ \\emptyset & \\text{否则},\\end{cases} \\qquad \\bigl(\\widehat{X}_{*}(E)\\bigr)(Y) = \\begin{cases} E & \\exists\\, X \\to Y,\\\\ \\{0\\} & \\text{否则}.\\end{cases}$$'
      ].join('\n'),
      notes: [
        '**证明。** 由「任意函子诱导拓扑斯态射」，$X : \\mathbf{1} \\to \\mathcal{C}$ 诱导出 $\\widehat{X}_{!} \\dashv \\widehat{X}^{-1} \\dashv \\widehat{X}_{*}$ ✓。三条公式分别是：拉回就是取值 ✓；左 Kan 延拓沿 $\\mathbf{1} \\to \\mathcal{C}$ 由逗号范畴的余极限给出，而「$\\exists Y \\to X$」正是那个余极限非空的条件 ✓；右伴对偶 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.52']
    },

    /* ----------------------------------------------------- 3.55 */
    {
      id: 'prop.topos-morphism-final-map',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '终映射给出的拓扑斯态射',
      title: '命题：$p : X \\to \\mathbf{1}$ 给出 $p_{*} = \\Gamma(X, -)$、$p^{-1}E = \\widetilde{E}_{X}$',
      regions: ['category'],
      tags: ['命题', '拓扑斯态射', '整体截面', '常层'],
      statement: [
        '设 $X$ 是拓扑空间、$p : X \\to \\mathbf{1}$ 是到单点的映射。则它给出的拓扑斯态射满足',
        '',
        '$$p_{*}\\mathcal{F} = \\Gamma(X, \\mathcal{F}), \\qquad p^{-1}E = \\widetilde{E}_{X};$$',
        '',
        '而且对连续映射 $f : Y \\to X$，有 $\\widetilde{E}_{Y} = f^{-1}\\widetilde{E}_{X}$。'
      ].join('\n'),
      notes: [
        '**证明。** $p_{*}$ 是「推前」，在单点上的层就是整体截面 ✓；$p^{-1}$ 是「拉回」，把集合 $E$ 送到 $X$ 上的常层 $\\widetilde{E}_{X}$ ✓（它在 $\\mathbf{Top}$ 上的层就是 $\\underline{E^{\\mathrm{disc}}}$）。最后一式：记 $q : Y \\to \\mathbf{1}$，则 $q = p \\circ f$，而推前/拉回关于复合相容 ✓，于是 $\\widetilde{E}_{Y} = q^{-1}E = f^{-1}p^{-1}E = f^{-1}\\widetilde{E}_{X}$ ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.55']
    },

    /* ----------------------------------------------------- 3.56 */
    {
      id: 'prop.topos-morphism-point',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '点给出的拓扑斯态射',
      title: '命题：$x : \\mathbf{1} \\to X$ 给出 $(x_{*}E)(U) = E$（$x \\in U$）与 $x^{-1}\\mathcal{F} = \\mathcal{F}_{x}$',
      regions: ['category'],
      tags: ['命题', '拓扑斯态射', '点', '茎'],
      statement: [
        '设 $X$ 是拓扑空间、$x : \\mathbf{1} \\to X$ 是一个点。则它给出的拓扑斯态射满足',
        '',
        '$$(x_{*}E)(U) = \\begin{cases} E & x \\in U,\\\\ \\emptyset & x \\notin U,\\end{cases} \\qquad x^{-1}\\mathcal{F} = \\mathcal{F}_{x}.$$',
        '',
        '也就是说：**推前是「只看 $x$ 的开邻域」的常层，拉回就是茎**。'
      ].join('\n'),
      notes: [
        '**证明。** $x_{*}E$ 的取值是「拉回 $x^{-1}(U)$ 的」：$x^{-1}(U)$ 在单点空间里要么是空集要么是全空间 ✓，于是取值如式 ✓。$x^{-1}$ 是 $x_{*}$ 的左伴随，由伴随公式 $\\operatorname{Hom}(x^{-1}\\mathcal{F}, E) = \\operatorname{Hom}(\\mathcal{F}, x_{*}E) = \\mathcal{F}_{x}$-型的计算即得它就是茎 ✓（也可直接用「茎 = 沿 $x$ 的开邻域取滤过余极限」）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.56']
    },

    /* ----------------------------------------------------- 3.63 + 3.64 */
    {
      id: 'prop.slice-topos',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '切片拓扑斯',
      title: '命题：$\\widetilde{\\mathcal{C}/T} \\simeq \\widetilde{\\mathcal{C}}/\\widetilde{T}$，且 $j_{T} : \\widetilde{\\mathcal{C}/T} \\to \\widetilde{\\mathcal{C}}$ 是拓扑斯态射',
      regions: ['category'],
      tags: ['命题', '切片拓扑斯', '余连续', '拓扑斯态射'],
      statement: [
        '设 $\\mathcal{C}$ 是景、$T \\in \\widehat{\\mathcal{C}}$。则',
        '',
        '1. $j_{T}$ **余连续**，因而给出拓扑斯态射 $j_{T} : \\widetilde{\\mathcal{C}/T} \\to \\widetilde{\\mathcal{C}}$；',
        '2. $\\widetilde{\\mathcal{C}/T} \\;\\simeq\\; \\widetilde{\\mathcal{C}}/\\widetilde{T}$；',
        '3. 在这个等价下，$j_{T!}$ 对应遗忘函子 $\\widetilde{\\mathcal{C}}/\\widetilde{T} \\to \\widetilde{\\mathcal{C}}$，$j_{T}^{-1}$ 对应 $\\mathcal{F} \\mapsto (\\mathcal{F} \\times \\widetilde{T} \\to \\widetilde{T})$。'
      ].join('\n'),
      notes: [
        '**证明。** (1) 余连续说的是「$j_{T}$ 把覆盖送到覆盖」，这由覆盖筛在切片里的定义直接核对 ✓，于是由「余连续函子给出拓扑斯态射」得到 $j_{T}$ ✓。(2) 两个范畴的对象都是「$X \\in \\mathcal{C}$ 加一个截面 $s \\in T(X)$」，层条件也逐字对应 ✓。(3) 把两边的函子按定义写出来即得 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.63, Exercise 3.64']
    },

    /* ----------------------------------------------------- 3.67 */
    {
      id: 'def.crystalline-sheaf',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '晶体层',
      title: '定义：所有过渡都是同构的 $\\mathbf{Top}_{/X}$ 上的层',
      regions: ['category'],
      tags: ['定义', '晶体层', '切片拓扑斯', 'espace étalé'],
      statement: [
        '给出 $\\mathbf{Top}_{/X}$ 上的一个层 $\\mathcal{F}$，等价于给出所有 $\\mathcal{F}_{Y}$（$Y \\to X$）连同相容的态射',
        '',
        '$$\\alpha_{f} : f^{-1}\\mathcal{F}_{Y} \\longrightarrow \\mathcal{F}_{Z} \\qquad (f : Z \\to Y).$$',
        '',
        '若所有 $\\alpha_{f}$ 都是**同构**，就叫 $\\mathcal{F}$ 是**晶体层**（crystalline sheaf）。'
      ].join('\n'),
      notes: [
        '**读法。** $\\mathbf{Top}_{/X}$ 上的层就是「把 $X$ 上每个空间 $Y$ 上的数据 $\\mathcal{F}_{Y}$ 按拉回相容地拼起来」✓；晶体的意思正是「拉回就是同一个东西」—— 数据只依赖 $Y \\to X$ 的**同伦/同胚型**，不依赖 $Y$ 的选取 ✓。',
        '📌 这条是下面「晶体层 $\\simeq$ $X$ 上的层」那条定义的一半。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.67']
    },

    /* ----------------------------------------------------- 3.68 + 3.69 */
    {
      id: 'prop.crystalline-sheaf-equiv',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '晶体层就是 X 上的层',
      title: '命题：实化 $\\mathcal{F} \\mapsto \\mathcal{F}_{X}$ 给出等价；$\\mathbf{Et}(X) \\simeq \\widetilde{\\mathbf{Open}(X)}$',
      regions: ['category'],
      tags: ['命题', '晶体层', 'espace étalé', '拓扑斯', '拓扑空间上的层'],
      statement: [
        '1. **实化** $\\mathcal{F} \\mapsto \\mathcal{F}_{X}$ 给出 $\\mathbf{Top}_{/X}$ 上的**晶体层**与 $X$ 上的**层**之间的等价；',
        '2. 于是 $\\mathbf{Et}(X)$（$X$ 上的 étale 空间范畴）$\\simeq$ 晶体层 $\\simeq$ $X$ 上的层 —— 特别地 $\\mathbf{Et}(X)$ 是拓扑斯，因为 $\\mathbf{Et}(X) \\simeq \\widetilde{\\mathbf{Open}(X)}$。'
      ].join('\n'),
      notes: [
        '**证明的思路。** 从晶体层到 $X$ 上的层是「取 $Y = X$ 那份数据」✓；反方向把 $X$ 上的层 $\\mathcal{F}$ 送到 $\\mathbf{Top}_{/X}$ 上的层 $\\mathcal{F}_{Y} := f^{-1}\\mathcal{F}$（$f : Y \\to X$）✓ —— 这时过渡 $\\alpha_f$ 自动是同构，所以落在晶体层里 ✓。两个方向互逆 ✓。(2) 是 (1) 加上「$X$ 上的层范畴 $\\simeq$ étale 空间范畴」这条标准等价 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.68, Exercise 3.69']
    },

    /* ----------------------------------------------------- 3.70 */
    {
      id: 'prop.qc-sheaf-etale',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '拟紧层与紧的 étale 空间',
      title: '命题：$X$ 上的层拟紧 $\\iff$ 对应 espace étalé 紧',
      regions: ['category'],
      tags: ['命题', '拟紧', 'espace étalé', '标准拓扑'],
      statement: [
        '拓扑空间 $X$ 上的层（对**标准拓扑**而言）**拟紧** $\\iff$ 与它对应的 **espace étalé** 是**紧**空间。'
      ].join('\n'),
      notes: [
        '**证明。** 拟紧的定义是「从余积出发的满态射可以取有限子族仍然满」✓；在 $X$ 上的层这个具体世界里，「$\\coprod_{i} \\mathcal{F}_{i} \\to \\mathcal{G}$ 满」正是 espace étalé 之间的映射在每根纤维上满，于是「有限子族已经满」$\\iff$「相应的紧空间被有限个块覆盖」✓ —— 两边同时成立 ✓。∎',
        '⭐ 读法：**拓扑空间上的「拟紧层」就是几何里那个「紧的 étale 空间」**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 3.70']
    },

    /* ----------------------------------------------------- 4.5 */
    {
      id: 'prop.discrete-iff-constant',
      cluster: 'cond.set',
      type: 'proposition',
      label: '离散即常',
      title: '命题：$X$ 离散 $\\iff$ 常 $\\iff$ 只依赖紧 Hausdorff 的离散商',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '离散', '常层', '离散商'],
      statement: [
        '对凝聚态集 $X$，三条等价：',
        '',
        '1. $X$ 是**离散的**：存在离散拓扑空间 $E$ 使 $X \\cong \\underline{E}$；',
        '2. $X$ 是**常的**：存在集合 $E$ 使 $X \\cong \\widetilde{E}$（常层）；',
        '3. 对任何紧 Hausdorff 空间 $S$，',
        '$$X(S) \\;\\cong\\; \\varprojlim_{S \\twoheadrightarrow S\'} X(S\'),$$',
        '其中 $S\'$ 跑遍 $S$ 的**离散商**。'
      ].join('\n'),
      notes: [
        '**证明。** (1)$\\iff$(2)：离散空间 $E$ 给出的凝聚态集取值是 $\\underline{E}(S) = C(S, E)$，也就是「$S$ 上的局部常值 $E$-值映射」✓；而常层 $\\widetilde{E}$ 的取值按定义正是局部常值映射 ✓ —— 两个函子一致 ✓（见「拓扑空间上的常层就是离散空间的层」）。',
        '(2)$\\iff$(3)：局部常值映射只依赖 $S$ 的连通块结构，而这正是「沿 $S$ 的离散商取投影极限」读出来的信息 ✓；反过来若 $X(S) = \\varprojlim_{S \\twoheadrightarrow S\'}X(S\')$，则 $X$ 只看得见离散商，等价于常 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 4.5']
    },

    /* ----------------------------------------------------- 4.8 */
    {
      id: 'prop.underlying-preserves-coproduct',
      cluster: 'cond.set',
      type: 'proposition',
      label: '底函子保不交并',
      title: '命题：$X = \\coprod_{i} X_{i}$ $\\implies$ $\\underline{X} = \\coprod_{i}\\underline{X_{i}}$',
      regions: ['condensed'],
      tags: ['命题', '凝聚态集', '不交并', '余积', '左伴随'],
      statement: [
        '若拓扑空间 $X$ 是子空间的不交并 $X = \\coprod_{i \\in I} X_{i}$，则它的凝聚态集就是各块的凝聚态集在 $\\mathrm{Cond}$ 里的**余积**：',
        '',
        '$$\\underline{X} \\;=\\; \\coprod_{i \\in I} \\underline{X_{i}}.$$'
      ].join('\n'),
      notes: [
        '**证明。** 函子 $X \\mapsto \\underline{X}$（$\\underline{X}(S) = C(S, X)$）是 $X \\mapsto X(\\cdot)$ 的**左伴随** ✓，左伴随保余极限、特别地保余积 ✓。所以把拓扑空间的不交并送进 $\\mathrm{Cond}$，得到的就是余积 ✓（$\\mathrm{Cond}$ 里的余积是「先取逐点不交并、再层化」，正是 $C(S, \\coprod_i X_i)$ 的层化）✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 4.8']
    },

    /* ----------------------------------------------------- 6.3 */
    {
      id: 'prop.discrete-functor-coproduct',
      cluster: 'cond.ab',
      type: 'proposition',
      label: '离散函子保直和',
      title: '命题：$\\bigl(\\bigoplus_{i} M_{i}\\bigr)^{\\mathrm{disc}} \\cong \\bigoplus_{i} M_{i}^{\\mathrm{disc}}$',
      regions: ['condensed'],
      tags: ['命题', '凝聚态阿贝尔群', '离散', '直和', '左伴随'],
      statement: [
        '设 $(M_{i})_{i \\in I}$ 是一族阿贝尔群。则',
        '',
        '$$\\Bigl(\\bigoplus_{i \\in I} M_{i}\\Bigr)^{\\mathrm{disc}} \\;\\cong\\; \\bigoplus_{i \\in I} M_{i}^{\\mathrm{disc}},$$',
        '',
        '其中 $(-)^{\\mathrm{disc}}$ 是把阿贝尔群看成离散凝聚态阿贝尔群。'
      ].join('\n'),
      notes: [
        '**证明。** $(-)^{\\mathrm{disc}}$ 是遗忘函子的**左伴随** ✓，左伴随保余极限、特别地保直和 ✓。∎',
        '⚠️ 对**积**不成立：$(-)^{\\mathrm{disc}}$ 是左伴随，一般不保积 —— 这正是「离散化会把无限直积换成直和」的那件事。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 6.3']
    },

    /* ----------------------------------------------------- 6.5 */
    {
      id: 'prop.cond-quotient-topological',
      cluster: 'cond.ab',
      type: 'proposition',
      label: '商群在凝聚态意义下一致',
      title: '命题：$\\underline{M/N} \\cong \\underline{M}/\\underline{N}$（$N$ 闭）',
      regions: ['condensed'],
      tags: ['命题', '凝聚态阿贝尔群', '商群', '闭子群'],
      statement: [
        '设 $N$ 是局部紧 Hausdorff 阿贝尔群 $M$ 的**闭**子群。则拓扑商群的凝聚态版本与凝聚态商的商一致：',
        '',
        '$$\\underline{M/N} \\;\\cong\\; \\underline{M}\\big/\\underline{N}.$$'
      ].join('\n'),
      notes: [
        '**证明。** 正合列 $0 \\to N \\to M \\to M/N \\to 0$ 里，$N$ 闭保证 $M/N$ 是 Hausdorff 的局部紧群 ✓；而「拓扑阿贝尔群 $\\mapsto$ 凝聚态阿贝尔群」是**保所有极限**的函子 ✓，它把商的余核送到余核 ✓。于是拓扑意义下的商与凝聚态意义下的商对上 ✓。∎',
        '📌 用处：算凝聚态阿贝尔群时，**可以先在拓扑这一侧把商算好再离散化**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 6.5']
    },

    /* ----------------------------------------------------- 7.22 */
    {
      id: 'prop.derived-functor-kan-extension',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '导出函子就是 Kan 延拓',
      title: '命题：$F$ 左正合 $\\implies RF$ 是沿局部化的左 Kan 延拓',
      regions: ['homology'],
      tags: ['命题', '导出函子', 'Kan 延拓', '局部化'],
      statement: [
        '设 $F : \\mathcal{A} \\to \\mathcal{A}\'$ 是**左正合**加法函子。则 $RF$ 是复合映射',
        '',
        '$$\\mathbf{K}^{+}(\\mathcal{A}) \\xrightarrow{\\ F\\ } \\mathbf{K}^{+}(\\mathcal{A}\') \\longrightarrow \\mathbf{D}^{+}(\\mathcal{A}\')$$',
        '',
        '沿**局部化** $\\mathbf{K}^{+}(\\mathcal{A}) \\to \\mathbf{D}^{+}(\\mathcal{A})$ 的（左）**Kan 延拓**（对偶地：右正合函子的 $LF$ 沿另一个局部化）。'
      ].join('\n'),
      notes: [
        '**证明。** 局部化（把拟同构变成同构）是预复合函子的左伴随 ✓，而左正合函子在拟同构上表现良好，于是「先取 $F$ 再局部化」这个复合函子沿局部化的左 Kan 延拓存在且正是 $RF$ ✓ —— 这就是导出函子的泛性刻画：它是 $F$ 在导出范畴里的**最优扩张** ✓。∎',
        '⭐ 读法：**「导出函子」不是新东西，它是局部化下的 Kan 延拓** —— 与「Kan 延拓就是伴随」配成一对。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.22']
    },

    /* ----------------------------------------------------- 7.36 */
    {
      id: 'prop.cohomology-via-associated-sheaf',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '用关联层算上同调',
      title: '命题：$\\mathrm{R}\\Gamma(X, M^{\\bullet}) = \\mathrm{R}\\Gamma(\\underline{X}, M^{\\bullet})$',
      regions: ['homology'],
      tags: ['命题', '层上同调', '关联层', '整体截面'],
      statement: [
        '设 $X \\in \\mathcal{C}$、$\\underline{X} = h_{X}^{\\#}$ 是它的**关联层**。则',
        '',
        '$$\\mathrm{R}\\Gamma\\bigl(X,\\ M^{\\bullet}\\bigr) \\;=\\; \\mathrm{R}\\Gamma\\bigl(\\underline{X},\\ M^{\\bullet}\\bigr), \\qquad \\mathrm{H}^{n}\\bigl(\\underline{X},\\ M^{\\bullet}\\bigr) = \\mathrm{H}^{n}\\bigl(X,\\ M^{\\bullet}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** 对任何层 $M$，由关联层的万有性质 $\\operatorname{Hom}(\\underline{X}, M) = M(X) = \\operatorname{Hom}(X, M)$ ✓，即 $\\Gamma(X, M) = \\Gamma(\\underline{X}, M)$。取内射消解 $I^{\\bullet}$，两边逐项相等 ✓，故导出函子相等 ✓。∎'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.36']
    },

    /* ----------------------------------------------------- 7.42 */
    {
      id: 'prop.cohomology-presheaf-H',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '层化不改变导出的整体截面',
      title: '命题：$\\Gamma\\bigl(X, R\\mathcal{H}(M^{\\bullet})\\bigr) = R\\Gamma(X, M^{\\bullet})$，从而 $\\Gamma\\bigl(X, \\mathcal{H}^{n}(M^{\\bullet})\\bigr) = H^{n}(X, M^{\\bullet})$',
      regions: ['homology'],
      tags: ['命题', '层化', '导出函子', '整体截面', '上同调预层'],
      statement: [
        '设 $X \\in \\mathcal{C}$、$M^{\\bullet}$ 是阿贝尔层复形，$\\mathcal{H}$ 记「把阿贝尔层当预层看」的含入函子。则',
        '',
        '$$\\Gamma\\bigl(X,\\ R\\mathcal{H}(M^{\\bullet})\\bigr) \\;=\\; R\\Gamma\\bigl(X,\\ M^{\\bullet}\\bigr), \\qquad \\Gamma\\bigl(X,\\ \\mathcal{H}^{n}(M^{\\bullet})\\bigr) \\;=\\; H^{n}\\bigl(X,\\ M^{\\bullet}\\bigr).$$'
      ].join('\n'),
      notes: [
        '**证明。** $\\mathcal{H}$ 与**层化**互为伴随，而层化**正合** ✓，所以 $\\mathcal{H}$ 保内射 ✓（左伴随正合的右伴随保内射）。反过来，函子 $M \\mapsto \\Gamma(X, M)$ 在**预层**上是正合的 ✓。两条合起来套用「导出函子与正合因子的复合」那条，即得第一式 ✓；第二式就是对它取 $n$ 次同调并在层那一侧读出取值 ✓。∎',
        '⭐ 用处：**上同调预层 $H^{n}(M)$ 的取值就是上同调** —— 这句在算 Čech 与上同调的关系时反复要用。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, Exercise 7.42']
    }

  ],

  edges: [

    {
      id: 'def-link.chausquot-chaus',
      kind: 'definition',
      definition: 'def.chaus',
      usedBy: 'prop.chaus-quotient-equiv',
      note: '四条等价都是在紧 Hausdorff 范畴里说的。'
    },
    {
      id: 'def-link.chausquot-quotient',
      kind: 'definition',
      definition: 'def.quotient-topology',
      usedBy: 'prop.chaus-quotient-equiv',
      note: '第一条是「商映射」。'
    },
    {
      id: 'def-link.whkclosed-wh',
      kind: 'definition',
      definition: 'def.weak-hausdorff',
      usedBy: 'prop.weak-hausdorff-k-closed',
      note: '前提是弱 Hausdorff。'
    },
    {
      id: 'def-link.whkclosed-ktop',
      kind: 'definition',
      definition: 'def.k-topology',
      usedBy: 'prop.weak-hausdorff-k-closed',
      note: '结论说的是对角线 $k$-闭。'
    },
    {
      id: 'def-link.altaxiom-gt',
      kind: 'definition',
      definition: 'def.grothendieck-topology',
      usedBy: 'prop.topology-alternative-axiom',
      note: '改写的正是拓扑公理的最后一条。'
    },
    {
      id: 'def-link.constadj-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.constant-sheaf-adjunction',
      note: '伴随的另一边是层。'
    },
    {
      id: 'def-link.consttop-const',
      kind: 'definition',
      definition: 'def.associated-sheaf',
      usedBy: 'prop.constant-sheaf-top',
      note: '两边都是「关联层」这个构造的特例。'
    },
    {
      id: 'def-link.topmorobj-toposmor',
      kind: 'definition',
      definition: 'def.topos-morphism',
      usedBy: 'prop.topos-morphism-from-object',
      note: '结论是「给出一个拓扑斯态射」。'
    },
    {
      id: 'imp-link.indtop-topmorobj',
      kind: 'implication',
      sources: ['thm.induced-topos-morphism'],
      target: 'prop.topos-morphism-from-object',
      title: '任意函子诱导拓扑斯态射 $\\implies$ 对象给出 $\\widehat{X}$',
      proof: [
        '把 $X$ 看成函子 $X : \\mathbf{1} \\to \\mathcal{C}$ ✓，由「任意函子诱导拓扑斯态射」即得 $\\widehat{X}_{!} \\dashv \\widehat{X}^{-1} \\dashv \\widehat{X}_{*}$ ✓；三条公式由 Kan 延拓的逐点公式（逗号范畴上的余极限/极限）算出 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.topmorpt-toposmor',
      kind: 'definition',
      definition: 'def.topos-morphism',
      usedBy: 'prop.topos-morphism-point',
      note: '结论是点给出的拓扑斯态射。'
    },
    {
      id: 'def-link.topmorpt-stalk',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.topos-morphism-point',
      note: '拉回就是茎，后面算上同调全靠它。'
    },
    {
      id: 'def-link.topmorfinal-toposmor',
      kind: 'definition',
      definition: 'def.topos-morphism',
      usedBy: 'prop.topos-morphism-final-map',
      note: '结论是终映射给出的拓扑斯态射。'
    },
    {
      id: 'imp-link.topmorobj-topmorfinal',
      kind: 'implication',
      sources: ['prop.topos-morphism-from-object', 'prop.constant-sheaf-top'],
      target: 'prop.topos-morphism-final-map',
      title: '对象给出的拓扑斯态射 $\\implies$ 终映射的情形',
      proof: [
        '取 $X \\in \\mathbf{Top}$ 与到单点的映射 $p : X \\to \\mathbf{1}$ ✓。沿 $p$ 的推前就是「在 $X$ 上取整体截面」$p_{*}\\mathcal{F} = \\Gamma(X, \\mathcal{F})$ ✓；拉回把集合 $E$ 送到 $X$ 上的常层 $p^{-1}E = \\widetilde{E}_{X}$ ✓（常层就是离散空间给出的层）。',
        '再对连续映射 $f : Y \\to X$ 用「拉回关于复合相容」：$q = p \\circ f$ 给出 $\\widetilde{E}_{Y} = q^{-1}E = f^{-1}p^{-1}E = f^{-1}\\widetilde{E}_{X}$ ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.slicetopos-slice',
      kind: 'definition',
      definition: 'def.slice-category',
      usedBy: 'prop.slice-topos',
      note: '命题说的是切片范畴上的层范畴。'
    },
    {
      id: 'def-link.crystalsheaf-sheaf',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'def.crystalline-sheaf',
      note: '晶体层首先是一个层。'
    },
    {
      id: 'def-link.crystalequiv-etale',
      kind: 'definition',
      definition: 'def.sheaf',
      usedBy: 'prop.crystalline-sheaf-equiv',
      note: '等价的两边一边是层、一边是 étale 空间。'
    },
    {
      id: 'def-link.qcetale-qc',
      kind: 'definition',
      definition: 'def.quasi-compact',
      usedBy: 'prop.qc-sheaf-etale',
      note: '判定的是拟紧性。'
    },
    {
      id: 'def-link.disciffconst-set',
      kind: 'definition',
      definition: 'def.condensed-set',
      usedBy: 'prop.discrete-iff-constant',
      note: '三条说的都是凝聚态集。'
    },
    {
      id: 'def-link.underlyingcoprod-underlying',
      kind: 'definition',
      definition: 'def.underlying-topological-space',
      usedBy: 'prop.underlying-preserves-coproduct',
      note: '公式两边是同一条函子的取值。'
    },
    {
      id: 'def-link.disccoprod-condab',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'prop.discrete-functor-coproduct',
      note: '标的都是凝聚态阿贝尔群。'
    },
    {
      id: 'def-link.condquot-condab',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'prop.cond-quotient-topological',
      note: '命题比较拓扑商与凝聚态商。'
    },
    {
      id: 'def-link.kanrf-derfun',
      kind: 'definition',
      definition: 'def.right-derived-functor',
      usedBy: 'prop.derived-functor-kan-extension',
      note: '命题把导出函子认成 Kan 延拓。'
    },
    {
      id: 'imp-link.kanadj-kanrf',
      kind: 'implication',
      sources: ['prop.kan-extension-adjoint', 'prop.kan-extension-exists'],
      target: 'prop.derived-functor-kan-extension',
      title: 'Kan 延拓即伴随 $\\implies$ 导出函子就是 Kan 延拓',
      proof: [
        '局部化 $\\mathbf{K}^{+}(\\mathcal{A}) \\to \\mathbf{D}^{+}(\\mathcal{A})$ 是预复合函子的左伴随 ✓，而「先作用 $F$ 再局部化」在左正合 $F$ 下表现良好 ✓；由「Kan 延拓与伴随同生同死」与逐点公式，这个复合沿局部化的左 Kan 延拓存在且由 $RF$ 给出 ✓。∎'
      ].join('\n')
    },
    {
      id: 'def-link.cohassoc-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.cohomology-via-associated-sheaf',
      note: '两边都是层上同调。'
    },
    {
      id: 'def-link.cohpresheaf-sheafcoh',
      kind: 'definition',
      definition: 'def.sheaf-cohomology',
      usedBy: 'prop.cohomology-presheaf-H',
      note: '命题说「上同调预层的取值就是上同调」。'
    }

  ]
});
