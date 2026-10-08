/* ==========================================================================
   内容包 · 凝聚态集（18 条）
   --------------------------------------------------------------------------
   第九团（终点站）：CHaus 是预拓扑斯 → 凝聚态集 → Cond 是拓扑斯
   → 自由紧 Haus 空间作探针 → 底拓扑空间 → 凝聚态阿贝尔群。

   依赖顺序：凝聚态集就是 CHaus 上的层；CHaus 是预拓扑斯，所以「层」可以
   用有限积与商来验；换到自由紧 Hausforff 空间上验更省事；再加上阿贝尔群值。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态集',
  nodes: [

    /* ------------------------------------------------ CHaus 是预拓扑斯 */
    {
      id: 'def.chaus-pretopos',
      cluster: 'cond',
      type: 'theorem',
      label: 'CHaus 是预拓扑斯',
      title: '$\\mathbf{CHaus}$ 是预拓扑斯',
      regions: ['category', 'topology'],
      tags: ['凝聚态', 'CHaus', '预拓扑斯'],
      statement: [
        '在 $\\mathbf{CHaus}$ 中：',
        '',
        '1. 所有极限与余极限存在；',
        '2. 有限余积**不交**且**万有**；',
        '3. 等价关系**有效**且**万有**；',
        '4. 满态射**正则**且**万有**。',
        '',
        '因此 $\\mathbf{CHaus}$ 是**预拓扑斯**。'
      ].join('\n'),
      notes: [
        '第 1 条由「$\\mathbf{CHaus}$ 是 $\\mathbf{Top}$ 的反射子范畴」直接读出：',
        '',
        '$$\\varprojlim{}^{\\mathbf{CHaus}} D \\;\\cong\\; \\varprojlim{}^{\\mathbf{Top}} D, \\qquad \\varinjlim{}^{\\mathbf{CHaus}} D \\;\\cong\\; \\beta\\Bigl(\\varinjlim{}^{\\mathbf{Top}} D\\Bigr)$$',
        '',
        '**极限在 $\\mathbf{Top}$ 里怎么算就怎么算**（反射子范畴对极限封闭），**余极限要先在 $\\mathbf{Top}$ 里算、再用 $\\beta$ 紧化回去**（左伴随保余极限）。',
        '第 2、3 条从 $\\mathbf{Set}$ 继承：不交性、万有性、有效性都是「逐点」的性质，而 $\\mathbf{CHaus}$ 里的构造逐点继承集合。',
        '第 4 条是紧 Hausdorff 的特色：那里的满射都正则。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------- 凝聚态集 */
    {
      id: 'def.condensed-set',
      cluster: 'cond',
      type: 'definition',
      label: '凝聚态集',
      title: '凝聚态集（Condensed Set）',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '层', '定义'],
      statement: [
        '**凝聚态集**是 $\\mathbf{CHaus}$ 上的（集合值）**层**。其范畴记',
        '',
        '$$\\mathrm{Cond} \\;:=\\; \\widehat{\\mathbf{CHaus}}$$',
        '',
        '这里 $\\mathbf{CHaus}$ 配的是它的**预标准拓扑**。'
      ].join('\n'),
      notes: [
        '**例 1. 拓扑空间给凝聚态集。** 任一拓扑空间 $X$ 给出凝聚态集 $\\underline{X}(S) := C(S, X) = \\operatorname{Hom}_{\\mathbf{Top}}(S, X)$ —— 从 $S$ 到 $X$ 的连续映射全体。',
        '**例 2. 收敛序列。** 取 $X$ 是拓扑空间，则 $\\underline{X}(\\bar{\\mathbb{N}})$ 恰好是「**收敛序列 $(x_{n})_{n \\ge 1}$ 连同指定的极限 $x_{\\infty}$**」的集合 —— 这里 $\\bar{\\mathbb{N}}$ 是 $\\mathbb{N}$ 的**一点紧化**，而「收敛序列连同极限」正好就是从 $\\bar{\\mathbb{N}}$ 到 $X$ 的连续映射：$\\mathbb{N}$ 上的像给出序列，新添那个点上的像给出极限。',
        '**例 3. 连续函数模掉局部常值函数。** 存在唯一的凝聚态集 $Q$ 使 $Q(S) = C(S, \\mathbb{R}) / C(S, \\mathbb{R}^{\\mathrm{disc}})$。',
        '这三个例子的共同点：**取值都是「从紧 Hausdorff 空间出发的连续映射的某种商或子集」**。凝聚态集之所以能记住拓扑信息，靠的就是把这些映射全留下来。'
      ].join('\n\n')
    },

    /* ------------------------------------------------ 凝聚态集的刻画 */
    {
      id: 'prop.condensed-criterion',
      cluster: 'cond',
      type: 'proposition',
      label: '凝聚态集的刻画',
      title: '预层是凝聚态集的两条判据',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '层', '判据'],
      statement: [
        '$\\mathbf{CHaus}$ 上的集合预层 $X$ 是凝聚态集 $\\iff$',
        '',
        '1. 对有限族 $(S_{i})_{i \\in I}$：',
        '',
        '$$X\\Bigl(\\coprod_{i \\in I} S_{i}\\Bigr) \\;\\cong\\; \\prod_{i \\in I} X(S_{i})$$',
        '',
        '2. 对任何**闭等价关系** $R \\rightrightarrows S$：',
        '',
        '$$X\\bigl(\\operatorname{coker}(R \\rightrightarrows S)\\bigr) \\;\\cong\\; \\ker\\bigl(X(S) \\rightrightarrows X(R)\\bigr)$$',
        '',
        '特别地 $X(\\emptyset) \\cong \\{\\ast\\}$；等价地，若 $S\' \\to S$ 是满射，则',
        '',
        '$$X(S) \\longrightarrow X(S\') \\rightrightarrows X(S\' \\times_{S} S\')$$',
        '',
        '左正合。'
      ].join('\n'),
      notes: '$\\mathbf{CHaus}$ 是预拓扑斯，所以它上面的预标准拓扑恰好由两类覆盖生成：**有限不交并**与**满射**。上面第 1、2 条就是这两类覆盖下的层条件 —— 「有限余积变有限积」与「商变核」。\n\n换一种写法：$X$ 是凝聚态集 $\\iff$ 它把有限余积变成有限积、把余等化子变成等化子。这句话后面的所有构造都在用。'
    },

    /* ------------------------------------------------ Cond 是拓扑斯 */
    {
      id: 'thm.cond-topos',
      cluster: 'cond',
      type: 'theorem',
      label: 'Cond 是拓扑斯',
      title: '凝聚态集的范畴是拓扑斯',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '拓扑斯'],
      statement: '**凝聚态集的范畴 $\\mathrm{Cond}$ 是拓扑斯。**'
    },

    /* ---------------------------------------------- FCHaus 上的预拓扑 */
    {
      id: 'prop.fchaus-pretopology',
      cluster: 'cond',
      type: 'definition',
      label: 'FCHaus 上的预拓扑',
      title: '有限不交并给出自由紧 Hausforff 空间上的预拓扑',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '自由', '预拓扑'],
      statement: [
        '记 $\\mathbf{FCHaus}$ 为**自由紧 Hausdorff 空间**（即 $\\beta I$）构成的满子范畴。$\\mathbf{FCHaus}$ 中的对象都是 $\\mathrm{Cond}$ 的**投射对象**，满射 $S \\to S\'$ 总有截面 —— 于是**有限不交并给出 $\\mathbf{FCHaus}$ 上的一个预拓扑**。'
      ].join('\n'),
      notes: '为什么层条件「自动成立」：在自由紧 Hausdorff 空间上，满射有截面，所以「局部有原像」总能在整体上补出来（分离性由截面的存在直接给出）。**能取截面**是这里最省事的一点。'
    },

    /* ------------------------------------------- FCHaus 上层的判据 */
    {
      id: 'prop.fchaus-sheaf',
      cluster: 'cond',
      type: 'proposition',
      label: 'FCHaus 上层的判据',
      title: '自由紧 Hausforff 空间上的层 $\\iff$ 保有限积',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '自由', '层'],
      statement: '设 $X$ 是 $\\mathbf{FCHaus}$ 上的集合预层。则 $X$ 是层 $\\iff$ $X$ **保有限积**。'
    },

    /* ------------------------------------------------ Cond ≅ FCHaus */
    {
      id: 'thm.cond-equiv-fchaus',
      cluster: 'cond',
      type: 'theorem',
      label: 'Cond 即 FCHaus 上的层',
      title: '$\\mathrm{Cond} \\simeq \\widehat{\\mathbf{FCHaus}}$',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '等价', '自由'],
      statement: [
        '$\\mathbf{CHaus}$ 上的层与 $\\mathbf{FCHaus}$ 上的层是**同一个范畴**：',
        '',
        '$$\\mathrm{Cond} \\;\\simeq\\; \\widehat{\\mathbf{FCHaus}}$$'
      ].join('\n'),
      notes: '两个方向：$\\mathbf{CHaus}$ 上的层限制到 $\\mathbf{FCHaus}$ 上仍是层（覆盖变少了，层的条件只会更容易满足）；反过来，$\\mathbf{FCHaus}$ 上的层 $X$ 沿「自由对象到 $S$ 的映射」取滤过余极限延拓回 $\\mathbf{CHaus}$，得到的就是粘合出来的那个值。证明见边上那条推导。'
    },

    /* ------------------------------------------------ 满态射的判据 */
    {
      id: 'prop.cond-epi',
      cluster: 'cond',
      type: 'proposition',
      label: '凝聚态集满态射的判据',
      title: '凝聚态集的满态射',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '满态射'],
      statement: '凝聚态集的态射 $X \\to Y$ 是满态射 $\\iff$ 对每个**自由**紧 Hausdorff 空间 $F$，$X(F) \\to Y(F)$ 是满射。'
    },

    /* ------------------------------------------------ 足够多投射对象 */
    {
      id: 'prop.cond-projectives',
      cluster: 'cond',
      type: 'proposition',
      label: 'Cond 有足够多投射对象',
      title: '$\\mathrm{Cond}$ 的投射对象',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '投射对象'],
      statement: [
        '自由紧 Hausdorff 空间（看作凝聚态集）都是**投射对象**；并且 $\\mathrm{Cond}$ 有**足够多的投射对象**。'
      ].join('\n')
    },

    /* ------------------------------------------------ 底拓扑空间 */
    {
      id: 'def.underlying-topological-space',
      cluster: 'cond',
      type: 'definition',
      label: '底拓扑空间',
      title: '凝聚态集的底拓扑空间',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '拓扑空间'],
      statement: [
        '凝聚态集 $X$ 的**底拓扑空间** $X(\\cdot)$ 取集合 $X(\\ast)$（在单点空间处的截面），并赋予使所有映射',
        '',
        '$$f : S \\longrightarrow X(\\cdot), \\qquad f \\in X(S),\\ S \\in \\mathbf{CHaus}$$',
        '',
        '都连续的**最细**拓扑。'
      ].join('\n'),
      notes: '等价刻画：$Y \\subseteq X(\\cdot)$ 是开集 $\\iff$ 对每个 $S \\in \\mathbf{CHaus}$ 与每个 $f \\in X(S)$，$f^{-1}(Y)$ 在 $S$ 中开。\n\n所以「$X$ 的底空间」记下了 $X$ 能看见的全部拓扑信息，但**一般会丢掉 $X$ 自己的精细结构** —— 除非 $X$ 来自一个紧生成空间。'
    },

    /* ------------------------------------------------ Top ↔ Cond */
    {
      id: 'thm.top-cond-adjoint',
      cluster: 'cond',
      type: 'theorem',
      label: 'Top 与 Cond 的伴随',
      title: '$\\mathbf{Top} \\to \\mathrm{Cond}$ 与它的伴随',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '伴随', '紧生成'],
      statement: [
        '函子',
        '',
        '$$\\mathbf{Top} \\longrightarrow \\mathrm{Cond}, \\qquad X \\mapsto \\underline{X},\\quad \\underline{X}(S) := C(S, X)$$',
        '',
        '是**忠实**的，并且有右伴随 $X \\mapsto X(\\cdot)$。限制到**紧生成空间**的满子范畴上时，它变成**全忠实**的。'
      ].join('\n'),
      notes: '关键一句：**若 $X$ 是拓扑空间，则它的底空间 $X(\\cdot) \\cong kX$**。\n\n所以「拓扑空间 $\\to$ 凝聚态集 $\\to$ 底拓扑空间」这个来回，做的正是**$k$-化**：它把一般拓扑空间换成紧生成的那一个，之后就不再变化。于是 $k\\mathbf{Top}$ 恰好是 $\\mathrm{Cond}$ 里「完整地记得自己」的那部分，而一般的 $\\mathbf{Top}$ 多出来的那些空间在 $\\mathrm{Cond}$ 里被合并掉了。'
    },

    /* ---------------------------------------------- 凝聚态阿贝尔群 */
    {
      id: 'def.condensed-abelian-group',
      cluster: 'cond',
      type: 'definition',
      label: '凝聚态阿贝尔群',
      title: '凝聚态阿贝尔群（Condensed Abelian Group）',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '阿贝尔群', '层'],
      statement: [
        '**凝聚态阿贝尔群**是 $\\mathbf{CHaus}$ 上的阿贝尔群值层。四种说法给出同一个范畴：',
        '',
        '$$\\mathrm{Ab}(\\mathrm{Cond}) \\;\\simeq\\; \\mathrm{Cond}(\\mathrm{Ab}) \\;\\simeq\\; \\widehat{\\mathbf{CHaus}}(\\mathrm{Ab}) \\;\\simeq\\; \\widehat{\\mathbf{FCHaus}}(\\mathrm{Ab})$$',
        '',
        '记作 $\\mathrm{CondAb}$。'
      ].join('\n'),
      notes: [
        '阿贝尔群值层的定义是逐点检验的：预层 $M : \\mathbf{CHaus}^{\\mathrm{op}} \\to \\mathbf{Ab}$ 是层 $\\iff$ 对每个 $A \\in \\mathbf{Ab}$，集合值预层',
        '',
        '$$X \\mapsto \\operatorname{Hom}_{\\mathbf{Ab}}\\bigl(A, M(X)\\bigr)$$',
        '',
        '是层。**等价地（更好用）**：$M$ 是凝聚态阿贝尔群 $\\iff$ 它**保有限积**；再等价地：把 $M$ 忘成集合值预层之后是层 —— 因为遗忘函子 $\\mathbf{Ab} \\to \\mathbf{Set}$ 保极限。',
        '记号：$\\operatorname{Hom}_{\\mathbb{Z}}(M, N) := \\operatorname{Hom}_{\\mathrm{CondAb}}(M, N)$。'
      ].join('\n\n')
    },

    /* ------------------------------------------------ 截面函子 */
    {
      id: 'prop.condab-section',
      cluster: 'cond',
      type: 'proposition',
      label: '截面函子保极限余极限',
      title: '截面函子 $\\Gamma(F, -)$',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '截面', '正合'],
      statement: [
        '设 $F \\in \\mathbf{FCHaus}$。则**截面函子**',
        '',
        '$$\\Gamma(F, -) : \\mathrm{CondAb} \\longrightarrow \\mathbf{Ab}, \\qquad M \\mapsto \\Gamma(F, M) := M(F)$$',
        '',
        '保**所有极限与所有余极限**。'
      ].join('\n'),
      notes: '理由：层在 $F$ 处的截面是「逐点」算出来的，而 $\\mathbf{Ab}$ 里有限积与有限余积一致、滤过余极限正合。\n\n这条是**把 $\\mathrm{CondAb}$ 的性质逐点归到 $\\mathbf{Ab}$** 的通道 —— 下面的 AB 公理那一条就是靠它推出来的。'
    },

    /* ------------------------------------------------ Grothendieck 范畴 */
    {
      id: 'def.ab-axioms',
      cluster: 'cond',
      type: 'definition',
      label: 'Grothendieck 的 AB 公理',
      title: 'Grothendieck 的 AB 公理（AB1–AB6）',
      regions: ['category'],
      tags: ['同调代数', 'AB 公理', '正合'],
      statement: [
        '范畴 $\\mathcal{C}$ 的**正合性等级**（Grothendieck 的 AB 公理）逐条加强如下：',
        '',
        '1. **AB1**：预阿贝尔范畴；',
        '2. **AB2**：阿贝尔范畴；',
        '3. **AB3**：AB2 且有所有余极限（**AB3\\*** 是对偶）；',
        '4. **AB4**：AB3 且**余积正合**（**AB4\\*** 是对偶）；',
        '5. **AB5**：AB4 且**滤过余极限正合**（**AB5\\*** 是对偶）；',
        '6. **AB6**：AB5 且**滤过余极限与积交换**（**AB5\\*** 是对偶）。'
      ].join('\n'),
      notes: [
        '一个字读法：**头两条补的是「态射有没有核与余核、单满正不正则」；后面几条一路在补「越来越多的余极限操作是正合的、并且和别的操作交换」。**',
        '例：$\\mathbf{Ab}$ 满足 AB6 与 AB4*；$\\mathbf{AbTop}$ 只满足 AB1；$\\mathbf{AbCHaus} \\simeq \\mathbf{Ab}^{\\mathrm{op}}$ 满足 AB4 与 AB6*（Pontryagin 对偶）；对任意范畴 $\\mathcal{C}$，$\\mathbf{Ab}^{\\mathcal{C}}$ 满足 AB6 与 AB4*；拓扑斯上的 $\\mathbf{Ab}(\\mathcal{T})$ 满足 AB5 与 AB3*。',
        '⚠️ 拓扑斯上的 $\\mathbf{Ab}(\\mathcal{T})$ **一般并不满足 AB6 或 AB4\\***；另外，除 $\\{0\\}$ 之外没有范畴能同时满足 AB5 与 AB5\\*。'
      ].join('\n\n')
    },
    {
      id: 'def.grothendieck-category',
      cluster: 'cond',
      type: 'definition',
      label: 'Grothendieck 范畴',
      title: 'Grothendieck 范畴（Grothendieck Category）',
      regions: ['category'],
      tags: ['范畴论', '同调代数', '生成元'],
      statement: [
        '**Grothendieck 范畴**是带**生成元**的 **AB5** 范畴（AB5 即：有所有余极限，且滤过余极限正合）。'
      ].join('\n'),
      notes: [
        '例：$A\\text{-}\\mathbf{Mod}$ 是 Grothendieck 范畴；阿贝尔范畴 $\\mathcal{C}$ 的 $\\operatorname{Ind}(\\mathcal{C})$（按滤过余极限补全）也是；拓扑斯 $\\mathcal{T}$ 上的 $\\mathbf{Ab}(\\mathcal{T})$ 也是。',
        '两条随定义而来的事实：Grothendieck 范畴**自动满足 AB3\\***（有所有极限）；而且它**有足够多的内射对象**。',
        '「滤过余极限正合 + 有生成元」这两条合起来，就足以让一套同调代数跑起来 —— 这是 Grothendieck 那一代人为「在抽象范畴上做同调代数」挑出来的最低要求。'
      ].join('\n\n')
    },

    /* ------------------------------------------------ CondAb 的 AB 公理 */
    {
      id: 'thm.condab-ab',
      cluster: 'cond',
      type: 'theorem',
      label: 'CondAb 满足 AB6 与 AB4*',
      title: '$\\mathrm{CondAb}$ 的 AB 公理',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '同调代数', '正合'],
      statement: '$\\mathrm{CondAb}$ 是**Grothendieck 范畴**，并且满足 **AB6** 与 **AB4\\***。',
      notes: '推论：$\\mathrm{CondAb}$ 是**阿贝尔范畴**，并且（1）有生成元；（2）所有极限与余极限存在；（3）所有积与余积都**正合**；（4）**滤过余极限正合，且与积交换**。\n\n这一整段的好处是：$\\mathrm{CondAb}$ 上能照搬 $\\mathbf{Ab}$ 上那一套同调代数 —— 求导函子、长正合列、导出范畴，一样都不缺。'
    },

    /* ------------------------------------------------ Stonean 给投射对象 */
    {
      id: 'lem.stonean-projective',
      cluster: 'cond',
      type: 'lemma',
      label: 'Stonean 给出有限表现投射对象',
      title: 'Stonean 空间给出有限表现的投射对象',
      regions: ['category', 'topology'],
      tags: ['凝聚态', 'Stonean', '投射'],
      statement: [
        '设 $F$ 是**自由紧 Hausdorff 空间**（更一般地，**Stonean 空间**）。则自由凝聚态阿贝尔群 $\\mathbb{Z}\\cdot F$ 是**有限表现**的**投射**凝聚态阿贝尔群。'
      ].join('\n'),
      notes: '要证的等价形式是：函子 $M \\mapsto \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot F, M) \\cong \\Gamma(F, M)$ 保满态射与滤过余极限。前半由「自由紧 Hausdorff 空间在 $\\mathrm{Cond}$ 里投射」给出，后半由截面函子的构造给出 —— 而截面函子实际上**保所有余极限**。'
    },

    /* ------------------------------------------------ CondAb 的生成元 */
    {
      id: 'prop.condab-generated',
      cluster: 'cond',
      type: 'proposition',
      label: 'CondAb 由有限表现投射对象生成',
      title: '$\\mathrm{CondAb}$ 的生成元',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '生成元', '投射'],
      statement: '$\\mathrm{CondAb}$ 由**有限表现的投射**凝聚态阿贝尔群生成。特别地，它有足够多的投射对象。'
    },

    /* ------------------------------------------------ 张量与内 Hom */
    {
      id: 'prop.condab-tensor',
      cluster: 'cond',
      type: 'proposition',
      label: 'CondAb 上的张量与内 Hom',
      title: '$\\mathrm{CondAb}$ 上的 $\\otimes_{\\mathbb{Z}}$ 与 $\\operatorname{Hom}_{\\mathbb{Z}}$',
      regions: ['category', 'topology'],
      tags: ['凝聚态', '张量积', '伴随'],
      statement: [
        '$\\mathrm{CondAb}$ 上存在两个双函子 $\\operatorname{Hom}_{\\mathbb{Z}}$ 与 $\\otimes_{\\mathbb{Z}}$，使',
        '',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}(M, N)(\\cdot) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}(M, N)$$',
        '',
        '并且',
        '',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M \\otimes_{\\mathbb{Z}} N,\\ P\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M,\\ \\operatorname{Hom}_{\\mathbb{Z}}(N, P)\\bigr)$$'
      ].join('\n'),
      notes: '即 $\\otimes_{\\mathbb{Z}}$ 与内部的 $\\operatorname{Hom}_{\\mathbb{Z}}$ **互为伴随** —— 所以 $\\mathrm{CondAb}$ 是一个**封闭对称幺半**范畴（特别地，它富集在自己上面）。\n\n所以它不只是一个阿贝尔范畴，还带着一套封闭的张量结构 —— 这才是「在凝聚态阿贝尔群上做代数」的前提：可以谈张量积、可以对偶、可以谈交换代数。\n\n⚠️ 注意 $\\operatorname{Hom}_{\\mathbb{Z}}(M, N) = \\operatorname{Hom}_{\\mathbb{Z}}(M, N)(\\cdot)$ 自然是一个**紧生成拓扑空间**，但它**不是拓扑阿贝尔群** —— 因为紧生成空间对（拓扑空间的）积不封闭。'
    }
  ],

  edges: [

    /* ---------------------------------------------- Cond 是拓扑斯 */
    {
      id: 'imp.cond-topos',
      kind: 'implication',
      sources: ['def.chaus-pretopos', 'def.free-presentation', 'thm.giraud'],
      target: 'thm.cond-topos',
      title: '$\\mathbf{CHaus}$ 是预拓扑斯 $\\implies$ $\\mathrm{Cond}$ 是拓扑斯',
      proof: [
        '用 Giraud 定理的第四条：**造出「预层范畴 + 正合反射」就够了**。',
        '',
        '取预层范畴 $\\widehat{\\mathbf{CHaus}}$，则 $\\mathrm{Cond} = \\widehat{\\mathbf{CHaus}}$ 是它的反射子范畴（反射是层化），并且层化**正合**（保有限极限，前面的层与拓扑那一段已经证过）。所以 $\\mathrm{Cond}$ 是拓扑斯。∎',
        '',
        '也可以直接验拓扑斯的四条公理，用的都是 $\\mathbf{CHaus}$ 是预拓扑斯这一条：',
        '',
        '**小生成元集。** 层范畴由可表示预层生成，所以取全体**自由**紧 Hausdorff 空间 $\\beta I$（在 $\\mathrm{Cond}$ 里）作生成元集即可 —— 每个紧 Hausdorff 空间都有自由表示 $\\beta S^{\\mathrm{disc}} \\twoheadrightarrow S$，于是每个可表示预层都被这些自由对象盖住。',
        '',
        '**有限极限、余积、等价关系。** 层范畴里的这些构造都是**逐点**算的（在 $\\mathbf{CHaus}$ 上取极限/余积/商），所以它们的不交性、万有性、有效性都由 $\\mathbf{CHaus}$ 的对应性质继承过来 —— 层化保有限极限与余极限，正好把结论从预层范畴运到层范畴。∎'
      ].join('\n'),
      note: '这就是整段路的终点：**从「紧 Hausdorff 空间」这一件拓扑材料出发，造出了一个拓扑斯。**'
    },

    /* ----------------------------------------- Cond ≅ FCHaus 上的层 */
    {
      id: 'imp.cond-fchaus',
      kind: 'implication',
      sources: ['prop.fchaus-sheaf', 'prop.fchaus-pretopology', 'def.free-presentation'],
      target: 'thm.cond-equiv-fchaus',
      title: '$\\mathrm{Cond} \\simeq \\widehat{\\mathbf{FCHaus}}$',
      proof: [
        '**（限制）** 设 $X$ 是 $\\mathbf{CHaus}$ 上的层，把它限制到 $\\mathbf{FCHaus}$ 上。$\\mathbf{FCHaus}$ 上的覆盖更少（只有有限不交并），层的条件只会更容易满足，所以限制仍是层。∎',
        '',
        '**（延拓）** 设 $X$ 是 $\\mathbf{FCHaus}$ 上的层。对 $S \\in \\mathbf{CHaus}$ 定义',
        '',
        '$$X(S) := \\varinjlim_{F \\to S} X(F)$$',
        '',
        '指标跑在「自由紧 Hausdorff 空间到 $S$ 的映射」上（按加细取滤过余极限）。',
        '',
        '**这就是层的粘合。** 由 $\\mathbf{CHaus}$ 里每个对象都有自由表示 $\\beta S^{\\mathrm{disc}} \\twoheadrightarrow S$，取 $R := \\beta S^{\\mathrm{disc}} \\times_{S} \\beta S^{\\mathrm{disc}}$ 与满射 $\\beta R \\to R$，则',
        '',
        '$$X(S) \\;=\\; \\varprojlim_{F \\to S} X(F) \\;\\cong\\; \\ker\\bigl(X(\\beta S^{\\mathrm{disc}}) \\rightrightarrows X(\\beta R)\\bigr) \\;=\\; \\{\\, x : X(p_{1})(x) = X(p_{2})(x) \\,\\}$$',
        '',
        '正是「相容的一族截面」。',
        '',
        '**反过来赋值。** 给定右边的一个 $x$ 与一个映射 $f : F\'\' \\to S$（$F\'\'$ 自由），由自由性 $f$ 可以提升为 $\\widetilde{f} : F\'\' \\to F$（$F \\twoheadrightarrow S$ 是那个自由表示），定义',
        '',
        '$$x_{f} := X(\\widetilde{f})(x) \\in X(F\'\')$$',
        '',
        '**提升的选取无关紧要。** 若 $\\widetilde{f}_{1}, \\widetilde{f}_{2}$ 是两个提升，则 $(\\widetilde{f}_{1}, \\widetilde{f}_{2}) : F\'\' \\to F \\times_{S} F$ 分解为 $p \\circ f\'$（因为 $F\' \\twoheadrightarrow F \\times_{S} F$ 满而 $F\'\'$ 自由），于是',
        '',
        '$$X(\\widetilde{f}_{1})(x) = X(f\')\\bigl(X(p_{1})(x)\\bigr) = X(f\')\\bigl(X(p_{2})(x)\\bigr) = X(\\widetilde{f}_{2})(x)$$',
        '',
        '所以 $(x_{f})_{f}$ 良定义，即有一族相容截面，$\\varphi(x) \\in X(S)$。两个方向互逆，于是 $\\mathbf{FCHaus}$ 上的层与 $\\mathbf{CHaus}$ 上的层是同一个范畴。∎',
        '',
        '又由「$\\mathbf{FCHaus}$ 上的层 $\\iff$ 保有限积」，$\\mathrm{Cond}$ 也可以等价地定义为「$\\mathbf{FCHaus}$ 上保有限积的预层」。∎'
      ].join('\n'),
      note: '换到 $\\mathbf{FCHaus}$ 上的好处是：那里的满射**都有截面**，于是「层」退化成最朴素的一条 —— **保有限积**。这是凝聚态数学里最常用的工作定义。'
    },

    /* -------------------------------------------------- 满态射的判据 */
    {
      id: 'imp.cond-epi',
      kind: 'implication',
      sources: ['def.sheaf', 'prop.cond-projectives', 'def.free-presentation'],
      target: 'prop.cond-epi',
      title: '满态射在自由空间上逐点检验',
      proof: [
        '**（$\\Longleftarrow$）** 显然：若每个 $X(F) \\to Y(F)$ 都满，则层之间的这个态射在每个自由对象上满，由「生成元集判定满态射」的一般道理即得它在 $\\mathrm{Cond}$ 里是满态射。∎',
        '',
        '**（$\\Longrightarrow$）** 设 $p : X \\to Y$ 是满态射，先证它「局部满」。取**像**',
        '',
        '$$\\operatorname{Im}(p)(S) := \\{\\, y \\in Y(S) \\ :\\ \\exists \\text{ 覆盖 } (S_{i} \\to S),\\ \\exists x \\in X(S_{i}),\\ p(x) = y|_{S_{i}} \\,\\}$$',
        '',
        '它是 $Y$ 的一个子层。由定义，$p$ 的每个值都落在 $\\operatorname{Im}(p)$ 里，即 $\\operatorname{Im}(p) \\hookrightarrow Y$ 是满态射；而它同时是单态射，故（层里单满即同构）$\\operatorname{Im}(p) = Y$。也就是说：**$p$ 局部满**。',
        '',
        '现在取 $F \\in \\mathbf{FCHaus}$ 与 $y \\in Y(F)$。由局部满，存在 $F$ 的覆盖，在其每一块 $F_{i}$ 上有 $x_{i} \\in X(F_{i})$ 使 $p(x_{i}) = y|_{F_{i}}$。$\\mathbf{FCHaus}$ 上的覆盖由**有限不交并**给出，而 $F$ 是自由的、余积在它上面就是无交并，所以可以直接把有限块上的 $x_{i}$ 拼起来（这正是「保有限积」那一条）：',
        '',
        '$$x := (x_{i})_{i} \\in \\prod_{i} X(F_{i}) \\;\\cong\\; X\\Bigl(\\coprod_{i} F_{i}\\Bigr) \\;=\\; X(F)$$',
        '',
        '并且 $p(x) = y$。所以 $X(F) \\to Y(F)$ 是满射。∎'
      ].join('\n'),
      note: '「满 = 局部满 = 局部可提升」是层论里的通用逻辑；而 $\\mathbf{FCHaus}$ 上的覆盖是**有限不交并**，所以局部终于能拼成整体 —— 这就是为什么探针只需要自由对象。'
    },

    /* -------------------------------------------- Top → Cond 的伴随 */
    {
      id: 'imp.top-cond-adjoint',
      kind: 'implication',
      sources: ['def.compactly-generated', 'def.condensed-set', 'prop.cg-coreflective'],
      target: 'thm.top-cond-adjoint',
      title: '$\\mathbf{Top} \\to \\mathrm{Cond}$ 忠实、限制到 $k\\mathbf{Top}$ 全忠实',
      proof: [
        '**$\\underline{X}$ 是凝聚态集。** 对任一点集 $S$，$\\underline{X}(S) = C(S, X)$；$C(-, X)$ 把 $\\mathbf{CHaus}$ 里的**有限不交并**变成有限积、把**商**变成核（连续映射在无交并上与商上都是逐块决定的）。由凝聚态集的两条判据，$\\underline{X}$ 是凝聚态集。∎',
        '',
        '**伴随。** 函子 $X \\mapsto \\underline{X}$ 与 $Z \\mapsto Z(\\cdot)$ 之间要给出',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, Z) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}\\bigl(X, Z(\\cdot)\\bigr)$$',
        '',
        '而 $\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, Z) = \\operatorname{Nat}(C(-,X), Z)$，按米田式的计算，它正是「在 $S = \\ast$ 处的取值」加上自然性 —— 也就是 $Z(\\cdot) = Z(\\ast)$ 上的一个元素，并且与所有 $\\underline{X}(S) = C(S,X)$ 相容。这恰恰是「从 $X$ 出发的连续映射」，两边一一对应。∎',
        '',
        '**忠实。** 由上面的伴随式取 $Z = \\underline{Y}$：',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, \\underline{Y}) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}\\bigl(X, \\underline{Y}(\\cdot)\\bigr)$$',
        '',
        '而关键的一步是：**$\\underline{Y}(\\cdot) \\cong kY$**（把 $Y$ 换成它的 $k$-化，拓扑可能变细）。于是',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, \\underline{Y}) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}(X, kY) \\;\\cong\\; \\operatorname{Hom}_{k\\mathbf{Top}}(kX, kY)$$',
        '',
        '（最后一个同构因为 $k\\mathbf{Top}$ 是余反射子范畴，$k$ 是含入的右伴随：$kX$ 处的映射等同于一切从 $X$ 出发射入紧生成空间的映射。）',
        '',
        '当 $X$ 本身紧生成时 $kX = X$，上式就是 $\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, \\underline{Y}) \\cong \\operatorname{Hom}_{k\\mathbf{Top}}(X, kY)$，逐对 $X, Y$ 都是双射 —— **限制到 $k\\mathbf{Top}$ 上全忠实**。对一般 $X$，$X \\to kX$ 是同一集合上的恒等映射，所以函子在态射层仍是单射 —— **在 $\\mathbf{Top}$ 上忠实**。∎'
      ].join('\n'),
      note: '一句话记住：**「拓扑空间 $\\to$ 凝聚态集」这件事丢掉的东西，正好就是 $k$-化丢掉的东西。** 所以在 $k\\mathbf{Top}$ 上它不丢信息。'
    }
  ]
});
