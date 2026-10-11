/* ==========================================================================
   内容包 · 凝聚态上同调 II：Breen–Deligne 分解与 RHom 计算（15 条）
   --------------------------------------------------------------------------
   §8.3。这一批要造出的东西是：**一台把 Ext 算到底的机器**。

   链条：Stonean 上 Ext 的截面公式 $\to$ Breen–Deligne 分解（引擎）$\to$ 谱序列 $\to$
   三类对象（离散 / Banach / 紧）的 RHom 逐类归零 $\to$ Z、R、T 的计算表 $\to$
   局部紧阿贝尔群的高次 Ext 消失（本章终点）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态上同调 · Breen–Deligne 与 RHom',
  nodes: [

    /* ------------------------------------------------- 8.3.1 截面公式 */

    {
      id: 'lem.ext-stonean-section',
      cluster: 'cond.cohomology',
      type: 'lemma',
      label: 'Stonean 上 Ext 的截面公式',
      title: '$\\operatorname{Ext}^{n}(M, N)(S) \\cong \\operatorname{Ext}^{n}(M \\cdot S,\\ N)$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Ext', 'Stonean', '投射对象'],
      statement: [
        '设 $M, N$ 是凝聚态阿贝尔群，$S$ 是 **Stonean 空间**。记 $M \\cdot S := M \\otimes_{\\mathbb{Z}} \\mathbb{Z}[S]$。则对一切 $n \\ge 0$',
        '',
        '$$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M, N)(S) \\cong \\operatorname{Ext}^{n}_{\\mathbb{Z}}(M \\cdot S,\\ N).$$'
      ].join('\n'),
      notes: [
        '**在做什么。** 左边是「Ext 层在 $S$ 上的截面」，右边是「把一个普通 Ext 算出来」。这条把**层的** Ext 换成了**单次**的 Ext —— 于是「算 Ext 层」这件事变成「算一个具体的导出 Hom」。',
        '**为什么 Stonean 可以。** Stonean 空间 $S$ 上，$\\mathbb{Z}[S]$ 是**投射**的，于是 $\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}[S], -)$ 正合。把这个正合函子搬到自然同构',
        '',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}(M \\cdot S,\\ N) \\cong \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}[S],\\ \\operatorname{Hom}_{\\mathbb{Z}}(M, N)\\bigr)$$',
        '',
        '两边，就得到了结论：右边是「内 Hom 的截面」，左边是「先张量再 Hom」。',
        '⚠️ 关键前提是 **Stonean**（极不连通），不是一般的紧 Hausdorff —— 极不连通性正是 $\\mathbb{Z}[S]$ 投射的来源。',
        '⭐ 这条是下面谱序列的**接线口**：Breen–Deligne 分解把 Ext 展开成若干「自由对象」，而每一项的 Ext 恰好可以用这条把层的计算搬回普通计算。'
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 8.3.1']
    },

    /* --------------------------------------------- 8.3.2 Breen–Deligne */

    {
      id: 'thm.breen-deligne',
      cluster: 'cond.cohomology',
      type: 'theorem',
      label: 'Breen–Deligne 分解',
      title: 'Breen–Deligne 分解：自由阿贝尔群的有限直和消解',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Breen-Deligne', '分解', '自由阿贝尔群'],
      statement: [
        '设 $M$ 是拓扑斯中的阿贝尔群（例如 $M \\in \\mathrm{CondAb}$）。则存在**自然的左消解**',
        '',
        '$$F(M)^{\\bullet} \\twoheadrightarrow M,$$',
        '',
        '其中每一项是「自由阿贝尔群 $\\mathbb{Z} \\cdot M^{s}$」的有限直和：',
        '',
        '$$F(M)_{n} = \\bigoplus_{i=1}^{r_{n}} \\mathbb{Z} \\cdot M^{s_{n,i}}.$$'
      ].join('\n'),
      notes: [
        '**在说什么。** 在一般的拓扑斯里，「自由对象」不是有限的（$M^{s}$ 里的 $s$ 是**集合**，可以是任意大的基数）。这条定理说：不管怎样，总能把任意阿贝尔群 $M$ 用一个**逐项自由**的复形消解掉，而且这个消解是**自然的**（不依赖选择、对 $M$ 的映射函子性）。',
        '**$\\mathbb{Z} \\cdot X$ 是什么**：集合 $X$ 生成的**自由阿贝尔群**（在拓扑斯里就是 $\\mathbb{Z}[X]$）。$M^{s}$ 是「$s$ 个 $M$ 的积」—— 之所以要取幂集，是为了让「$M$ 的元」能作为一个可数的组合被写出来。',
        '**为什么叫 Breen–Deligne 分解**：这个构造由 Deligne 提出，但长期没有完整证明；Scholze 在它的凝聚态数学第四讲附录里补全了证明。所以它是一条**现代**定理。',
        '⭐ **它是 $\\mathrm{CondAb}$ 里一切 Ext 计算的引擎**：有了这个逐项自由的消解，任意 $\\operatorname{Ext}^{n}(M, N)$ 都能展开成自由项上的 Ext，而那些是能算的（见下面的谱序列）。',
        '⚠️ 证明很重，且构造的显式公式（$d_{0}, d_{1}, d_{2}$ 的组合公式）相当技术性 —— 使用时通常只需要知道它**存在且自然**。'
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 8.3.2']
    },

    {
      id: 'lem.breen-deligne-scalar-homotopy',
      cluster: 'cond.cohomology',
      type: 'lemma',
      label: '分解上乘 p 与 M 上乘 p 同伦',
      title: '标量乘法的同伦提升',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Breen-Deligne', '同伦', '标量乘法'],
      statement: [
        '设 $F(M)^{\\bullet} \\twoheadrightarrow M$ 是 Breen–Deligne 分解，$p$ 是整数。则「在 $F(M)^{\\bullet}$ 上逐项乘 $p$」与「在 $M$ 上乘 $p$ 再沿分解提升」所诱导的映射 $[p]$ 是**自然同伦**的。'
      ].join('\n'),
      notes: [
        '**为什么需要这条。** 分解 $F(M)^{\\bullet} \\twoheadrightarrow M$ 是**拟同构**、不是同构 —— 所以「$M$ 上的运算」搬到分解上会有歧义。这条给出**消解歧义**的机制：不管你怎么把乘 $p$ 抬上去，抬出来的结果都同伦，于是「乘 $p$」在导出层面是**良定义**的。',
        '**用在哪**：$\\operatorname{RHom}(M, N)$ 的计算里要处理「除以 $2$」这类操作（把闭链写成收敛的级数），而收敛用的是 $2 - [2]$ 这个操作的**可逆性**。同伦的良定义正是这一步合法的前提。'
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 8.3.3']
    },

    {
      id: 'prop.breen-deligne-ss-stonean',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'Stonean 上 Breen–Deligne 的谱序列',
      title: '$E^{p,q}_{1} = \\bigoplus_{i} H^{q}(M^{s_{p,i}} \\times S,\\ N)$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Breen-Deligne', '谱序列', 'Ext'],
      statement: [
        '设 $M, N$ 是凝聚态阿贝尔群，$S$ 是 **Stonean 空间**。则有自然谱序列',
        '',
        '$$E^{p,q}_{1} = \\bigoplus_{i=1}^{r_{p}} H^{q}\\bigl(M^{s_{p,i}} \\times S,\\ N\\bigr) \\implies \\operatorname{Ext}^{p+q}_{\\mathbb{Z}}(M, N)(S).$$'
      ].join('\n'),
      notes: [
        '**构造**。把 Breen–Deligne 分解 $F(M)^{\\bullet}$ 沿 $S$ **基变换**（张量 $\\mathbb{Z}[S]$）。因为 $\\mathbb{Z}[S]$ 平坦，$F(M)^{\\bullet} \\cdot S \\to M \\cdot S$ 仍是拟同构；再套 Stonean 上的截面公式，把 $\\operatorname{Ext}(M \\cdot S, N)$ 换成 $\\operatorname{Ext}(M, N)(S)$。取「对分解的次数过滤」的标准谱序列，$E_{1}$ 项就是逐项自由对象的 Ext。',
        '**$E_{1}$ 项的形状怎么读**：$M^{s_{p,i}}$ 是「$s_{p,i}$ 个 $M$ 的积」，$M^{s_{p,i}} \\times S$ 是它配上测试空间 $S$；$H^{q}(-, N)$ 是那个空间上的凝聚态上同调。也就是：**把 Ext 换算成一批空间的上同调**，而空间的上同调是能靠 §8.1–8.2 的零调性定理打掉的。',
        '⭐ **这就是计算路径**：「要算 Ext，先展成谱序列，再把每一格的上同调按空间的类型（Stone / 紧 Hausdorff / 局部紧）用零调性定理归零」。§8.3 后面的每条计算定理都是这条谱序列的特例。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.3.4']
    },

    /* ---------------------------------------------- 8.3.3 Ext 的逐类计算 */

    {
      id: 'prop.rhom-banach-discrete-zero',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '有限维 Banach 到离散群全零',
      title: '$\\operatorname{RHom}_{\\mathbb{Z}}(M, N) = 0$（Banach 到 离散）',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'RHom', 'Banach 空间', '离散群'],
      statement: [
        '设 $M$ 是**有限维实 Banach 空间**、$N$ 是**离散**阿贝尔群。则',
        '',
        '$$\\operatorname{RHom}_{\\mathbb{Z}}(M,\\ N) = 0.$$',
        '',
        '更一般地：若 $V$ 是任意 $\\mathbb{R}$-模、$N$ 离散，则 $\\operatorname{RHom}_{\\mathbb{Z}}(V, N) = 0$。'
      ].join('\n'),
      notes: [
        '**直觉**：$\\mathbb{R}$ 是**可除**的（$\\mathbb{R}$ 中任何元素都能任意次地开方、任何 $n$ 都除得尽），而离散群里没有这种可除性。**可除性对进离散群的方向会整个塌掉** —— 于是从实向量空间出发的所有高阶（连同 0 阶）Hom 都不剩。',
        '**证法**。用上一条谱序列：$M^{s}$（有限维 $M$ 的幂）是**可缩**的（向量空间都是可缩的），而 $H^{q}(M^{s} \\times S, N) \\cong H^{q}(S, N)$，于是 $E^{p,q}_{1}$ 只与 $S$ 有关，谱序列的极限项与「常数分解」的情形对得上，计算下来一律归零。',
        '⭐ **用法**：任何以实向量空间为源、离散群为靶的 Ext 问题，直接判零 —— 这是后面「局部紧阿贝尔群只剩 $\\operatorname{Ext}^{0}, \\operatorname{Ext}^{1}$」那一步的关键零件之一。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.3.5']
    },

    {
      id: 'prop.rhom-chaus-banach-zero',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '紧 Haus 到实 Banach 全零',
      title: '$\\operatorname{RHom}_{\\mathbb{Z}}(M, N) = 0$（紧 Haus 到 Banach）',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'RHom', '紧 Hausdorff', 'Banach 空间'],
      statement: [
        '设 $M$ 是**紧 Hausdorff 阿贝尔群**、$N$ 是**实 Banach 空间**。则',
        '',
        '$$\\operatorname{RHom}_{\\mathbb{Z}}(M,\\ N) = 0.$$'
      ].join('\n'),
      notes: [
        '**与上一条对偶**：上一条说「实向量空间 $\to$ 离散」全零；这条说「紧 Hausdorff 群 $\to$ 实 Banach」全零。两条合起来正好是后面「分三类归约」时用来掐掉两端的两把剪刀。',
        '**证法里的关键工具**是分解上乘 $p$ 的同伦：紧 Hausdorff 群上有「乘 $2$」这个映射，它在 Banach 空间里**可逆**（除以 $2$）；利用 $2 - [2]$ 的同伦，可以把一个闭链写成 $d$(一个收敛级数)，即每个闭链都是边界。收敛用 Banach 的完备性。',
        '⚠️ 要求 $N$ 是**实** Banach 空间（带 $\\mathbb{R}$-模结构），不是任意 Banach 阿贝尔群 —— 除以 $2$ 那一步要用到标量结构。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.3.6']
    },

    {
      id: 'prop.rhom-dual-tensor',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: '离散对偶的 RHom 与导出张量',
      title: '$\\operatorname{RHom}(\\operatorname{RHom}(M, T), N) \\cong M \\otimes^{\\mathbf{L}}_{\\mathbb{Z}} N[-1]$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'RHom', '导出张量', '对偶'],
      statement: [
        '设 $M, N$ 是**离散**阿贝尔群，$T = \\mathbb{R}/\\mathbb{Z}$。则',
        '',
        '$$\\operatorname{RHom}_{\\mathbb{Z}}\\bigl(\\operatorname{RHom}_{\\mathbb{Z}}(M, T),\\ N\\bigr) \\cong M \\otimes^{\\mathbf{L}}_{\\mathbb{Z}} N[-1].$$'
      ].join('\n'),
      notes: [
        '**在说什么。** 把「先取对偶、再对靶算 RHom」这个往返回溯成一个**导出张量积**，并且**降了一次数**（$[-1]$）。于是「算对偶的 Ext」被换成了「算张量积」—— 后者在离散群上可以用自由消解直接做。',
        '**证法**。用短正合列 $0 \\to \\mathbb{Z} \\to \\mathbb{R} \\to T \\to 0$。由前面两条归零定理得 $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{R}, N) = 0$，于是 $\\operatorname{RHom}_{\\mathbb{Z}}(T, N) \\cong N[-1]$。代入 $\\operatorname{RHom}(M, T)$ 并逐层展开，再用自由情形的导出张量计算，就得到结论。',
        '⭐ 这条把 $T$ 这个「圆」的角色讲清楚了：$T$ 在导出层面**等价于降一次数**（$\\operatorname{RHom}(-, T)$ 把离散群送到它自己的 $[-1]$）。这正是下一节 Pontryagin 对偶能用 RHom 写出来的原因。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.3.7']
    },

    {
      id: 'prop.dual-rhom-characterization',
      cluster: 'cond.cohomology',
      type: 'proposition',
      label: 'Pontryagin 对偶的 RHom 刻画',
      title: '$M^{\\vee} \\cong \\operatorname{RHom}_{\\mathbb{Z}}(M, T)$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Pontryagin 对偶', 'RHom', '局部紧'],
      statement: [
        '设 $M$ 是**局部紧 Hausdorff 阿贝尔群**，$M^{\\vee}$ 是它的 Pontryagin 对偶。则',
        '',
        [
          '- 一般地 $M^{\\vee} \\cong \\operatorname{RHom}_{\\mathbb{Z}}(M, T)$；',
          '- 若 $M$ **紧**，则 $M^{\\vee} \\cong \\operatorname{RHom}_{\\mathbb{Z}}(M, \\mathbb{Z})[1]$；',
          '- 若 $M$ 是（有限维实）**Banach 空间**，则 $M^{\\vee} \\cong \\operatorname{RHom}_{\\mathbb{Z}}(M, \\mathbb{R})$。'
        ].join('\n'),
        '',
        '其中 $T = \\mathbb{R}/\\mathbb{Z}$。'
      ].join('\n'),
      notes: [
        '**在说什么。** 经典的 Pontryagin 对偶 $M^{\\vee} = \\operatorname{Hom}_{\\mathrm{cts}}(M, T)$ 说的是「取到圆里的连续同态」。这条给出它在**导出层面**的三种等价写法 —— 于是「取对偶」这个操作可以在导出的世界里做，进而参与 RHom / 张量的计算。',
        '**三条为什么互相相容**。用 $0 \\to \\mathbb{Z} \\to \\mathbb{R} \\to T \\to 0$：对**紧**的 $M$，$\\operatorname{RHom}(M, \\mathbb{R}) = 0$（紧 $\to$ Banach 全零），于是 $\\operatorname{RHom}(M, T) \\cong \\operatorname{RHom}(M, \\mathbb{Z})[1]$，第二条就是这么来的。',
        '**注意三种情形的「位移」不同**：紧的情形多一个 $[1]$、Banach 的情形换成靶 $\\mathbb{R}$。这说明「对偶」在导出层面不是一个统一的操作 —— 具体走哪条，取决于 $M$ 属于哪一类。',
        '📌 **用法**：把「算 Pontryagin 对偶」归约成「算 RHom」，而 RHom 有 Breen–Deligne 谱序列与逐类归零定理可用。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 8.3.8']
    },

    {
      id: 'thm.lc-ext-vanishing',
      cluster: 'cond.cohomology',
      type: 'theorem',
      label: '局部紧阿贝尔群高次 Ext 消失',
      title: '$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M, N) = 0$（$n \\ne 0, 1$）',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Ext', '局部紧阿贝尔群', '结构定理'],
      statement: [
        '设 $M, N$ 是**局部紧 Hausdorff 阿贝尔群**。则对一切 $n \\ne 0, 1$',
        '',
        '$$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M, N) = 0.$$'
      ].join('\n'),
      notes: [
        '⭐ **这是 §8.3 的终点**：局部紧 Hausdorff 阿贝尔群之间的 Ext 只在 $0$ 次和 $1$ 次上可能非零，再高一律消失。凝聚态数学对局部紧阿贝尔群给出的最终结论就是这个。',
        '**证法：先归约、再逐类掐掉**。由局部紧阿贝尔群的**结构定理**（每个这样的群都是「离散群」被「有限维实 Banach 空间 $\\oplus$ 连通紧 Hausdorff 群」扩张出来的），只要对三类源与三类靶交叉验证即可。$M$ 离散时用两段自由消解，$N$ 离散时用那条练习（连通局部紧群对离散群）；$N$ 是 Banach 时用「紧 $\to$ Banach 全零」与「有限维 Banach 之间的 RHom 只有 0 次」。',
        '**为什么是「只剩 $\\operatorname{Ext}^{0}, \\operatorname{Ext}^{1}$」**：$\\operatorname{Ext}^{0}$ 就是 $\\operatorname{Hom}$，$\\operatorname{Ext}^{1}$ 分类扩张 —— 这两项是**代数**上本来就该有的；这条定理说的是**没有更多**，即凝聚态阿贝尔群的范畴在局部紧对象上「同调维数 $\\le 1$」。',
        '⚠️ 结论**不适用于非局部紧**的对象：像 $\\mathbb{R}^{I}$（任意大的积）这类东西，$\\operatorname{RHom}$ 的行为完全是另一回事。'
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 8.3.9']
    },

    /* ------------------------------------------------------ 计算表与练习 */

    {
      id: 'table.rhom-zrt',
      cluster: 'cond.cohomology',
      type: 'example',
      label: 'Z/R/T 的 RHom 计算表',
      title: '$\\operatorname{RHom}_{\\mathbb{Z}}(M, N)$ 在 $\\mathbb{Z}, \\mathbb{R}, T$ 上的取值',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'RHom', '计算表', 'Ex 8.17'],
      statement: [
        '下表列出 $\\operatorname{RHom}_{\\mathbb{Z}}(M, N)$（行是 $M$、列是 $N$）：',
        '',
        '$$\\begin{array}{c|ccc} & \\mathbb{Z} & \\mathbb{R} & T \\\\ \\hline \\mathbb{Z} & \\mathbb{Z} & \\mathbb{R} & T \\\\ \\mathbb{R} & 0 & \\mathbb{R} & \\mathbb{R} \\\\ T & \\mathbb{Z}[-1] & 0 & \\mathbb{Z} \\end{array}$$'
      ].join('\n'),
      notes: [
        '**怎么读这张表**（$T = \\mathbb{R}/\\mathbb{Z}$）：',
        '',
        [
          '- 第一行（源是 $\\mathbb{Z}$）：$\\operatorname{RHom}(\\mathbb{Z}, N) = N$ —— 自由对象上没有高阶，只剩 0 次；',
          '- 第二行第一列 $0$：**实向量空间 $\to$ 离散**全零（可除性塌掉）；',
          '- 第二行其余：有限维实 Banach 之间的 RHom 只有 0 次，值为 $\\operatorname{Hom}_{\\mathbb{R}}(M, N)$ —— 这里是 $\\operatorname{Hom}_{\\mathbb{R}}(\\mathbb{R}, \\mathbb{R}) = \\mathbb{R}$ 与 $\\operatorname{Hom}_{\\mathbb{R}}(\\mathbb{R}, T)$；',
          '- 第三行第二列 $0$：**紧 Hausdorff $\to$ 实 Banach** 全零；',
          '- 第三行第一列 $\\mathbb{Z}[-1]$：由 $0 \\to \\mathbb{Z} \\to \\mathbb{R} \\to T \\to 0$，中间项是 $0$，只剩下一步降一次的 $\\mathbb{Z}$；',
          '- 右下角 $\\mathbb{Z}$：同样由 $0 \\to \\mathbb{Z} \\to \\mathbb{R} \\to T \\to 0$ 与 $\\operatorname{RHom}(T, \\mathbb{R}) = 0$ 得到。'
        ].join('\n'),
        '',
        '这张表是全章计算的**浓缩总结**：三条归零定理（$\\mathbb{R} \\to$ 离散、紧 $\\to \\mathbb{R}$、以及自由源）加上 $0 \\to \\mathbb{Z} \\to \\mathbb{R} \\to T \\to 0$ 这一条正合列，就能把三类基本对象之间的所有 RHom 全部算出来。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 8.17']
    },

    {
      id: 'ex.finite-banach-rhom',
      cluster: 'cond.cohomology',
      type: 'example',
      label: '有限维 Banach 之间的 RHom',
      title: '$\\operatorname{RHom}_{\\mathbb{Z}}(M, N) = \\operatorname{Hom}_{\\mathbb{R}}(M, N)$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'RHom', 'Banach 空间', 'Ex 8.15'],
      statement: '设 $M, N$ 是有限维实 Banach 空间。则 $\\operatorname{RHom}_{\\mathbb{Z}}(M, N) = \\operatorname{Hom}_{\\mathbb{R}}(M, N)$，其中右边集中在 **0 次**。',
      notes: [
        '**和「实 Banach 在紧 Haus 上零调」是一条链上的**：$\\mathbb{Z}$-线性映射 $M \\to N$ 已经是 $\\mathbb{R}$-线性的（因为 $M$ 是实向量空间，$\\mathbb{Z}$-线性 + 连续 $\\implies$ $\\mathbb{R}$-线性），于是没有高阶修正项。',
        '⚠️ 只在**有限维**时这么干净。无限维的实 Banach 空间之间一般会有高阶项 —— 那正是「实 Banach 在紧 Haus 上零调」那条定理要用到的技术难度所在。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 8.15']
    },

    {
      id: 'ex.chaus-banach-rhom',
      cluster: 'cond.cohomology',
      type: 'example',
      label: '紧 S 对实 Banach 的 RHom',
      title: '$\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z} \\cdot S,\\ N) \\cong C(S, N)$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'RHom', '紧 Hausdorff', '函数空间', 'Ex 8.12'],
      statement: '设 $S$ 是紧 Hausdorff 空间、$N$ 是实 Banach 空间。则 $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z} \\cdot S,\\ N) \\cong C(S, N)$，集中在 **0 次**。',
      notes: [
        '**直觉**：$\\mathbb{Z} \\cdot S$ 是 $S$ 生成的自由阿贝尔群；从它到 $N$ 的群同态就是「给 $S$ 的每个点指定一个 $N$ 的元素」。要做成**连续**的话，正好得到连续函数空间 $C(S, N)$。',
        '**为什么只有 0 次**：$\\mathbb{Z} \\cdot S$ 在 $S$ 紧 Hausdorff 时是投射的，投射对象上没有高阶 Ext。',
        '⭐ 这条是「实 Banach 在紧 Hausdorff 上零调」那一步的**局部计算**：谱序列的每一格都是这种形状。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 8.12']
    },

    {
      id: 'ex.bd-ss',
      cluster: 'cond.cohomology',
      type: 'example',
      label: 'Breen–Deligne 的一般谱序列',
      title: '$E^{p,q}_{1} = \\bigoplus_{i} H^{q}(M^{s_{p,i}},\\ N) \\implies \\operatorname{Ext}^{p+q}_{\\mathbb{Z}}(M, N)$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Breen-Deligne', '谱序列', '拓扑斯', 'Ex 8.14'],
      statement: [
        '设 $M, N$ 是拓扑斯中的阿贝尔群。由 Breen–Deligne 分解得到自然谱序列',
        '',
        '$$E^{p,q}_{1} = \\bigoplus_{i=1}^{r_{p}} H^{q}\\bigl(M^{s_{p,i}},\\ N\\bigr) \\implies \\operatorname{Ext}^{p+q}_{\\mathbb{Z}}(M, N).$$'
      ].join('\n'),
      notes: [
        '**与 Stonean 那条的关系**：这条是**一般拓扑斯**里的版本（不带测试空间 $S$）；Stonean 那条是把两边都沿 $S$ 基变换（乘上 $\\mathbb{Z}[S]$）之后的结果。两者是同一条谱序列的「无参数」与「有参数」两种形状。',
        '**用途**：在没有 Stonean 可用的一般拓扑斯上，仍然能用这条谱序列把 Ext 展成一批 $M^{s_{p,i}}$ 上的上同调 —— 这是「Breen–Deligne 分解是 CondAb 里一切 Ext 计算的引擎」这句话在一般拓扑斯上的版本。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 8.14']
    },

    {
      id: 'ex.connected-lc-ext',
      cluster: 'cond.cohomology',
      type: 'example',
      label: '连通局部紧到离散只剩 Ext一次',
      title: '$\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M, N) = 0$（$n \\ne 1$，$M$ 连通、$N$ 离散）',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'Ext', '连通群', '离散群', 'Ex 8.18'],
      statement: '设 $M$ 是**连通**局部紧 Hausdorff 阿贝尔群、$N$ 是**离散**阿贝尔群。则 $\\operatorname{Ext}^{n}_{\\mathbb{Z}}(M, N) = 0$，对一切 $n \\ne 1$。',
      notes: [
        '**和主定理的差别**：主定理（局部紧之间只剩 $\\operatorname{Ext}^{0}, \\operatorname{Ext}^{1}$）对源与靶都要求局部紧；这条把条件收窄到「源连通 + 靶离散」，结论里连 $\\operatorname{Ext}^{0}$ 也没了 —— 因为连通群到离散群的连续同态只能是平凡的（连通像落在离散拓扑里必为单点）。',
        '**证法思路**：连通局部紧阿贝尔群可写成「紧连通部分 $\\oplus$ 实向量空间」；实向量空间那一块用「实向量空间 $\to$ 离散全零」，紧连通那一块用紧群的技术。',
        '⭐ 这条是主定理里「$N$ 离散」那一支的关键零件。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 8.18']
    },

    {
      id: 'ex.nonlc-rhom',
      cluster: 'cond.cohomology',
      type: 'example',
      label: '非局部紧情形的 RHom',
      title: '$\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{R}^{I}, \\mathbb{Z}) = 0$，$\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}^{I}, \\mathbb{Z}) = \\mathbb{Z} \\cdot I$',
      regions: ['condensed', 'homology'],
      tags: ['凝聚态数学', 'RHom', '非局部紧', '乘积', 'Ex 8.19'],
      statement: [
        '记 $I$ 为任意指标集。则',
        '',
        [
          '- $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{R}^{I}, \\mathbb{Z}) = 0$；',
          '- $\\operatorname{RHom}_{\\mathbb{Z}}(\\mathbb{Z}^{I}, \\mathbb{Z}) = \\mathbb{Z} \\cdot I$，集中在 0 次。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '**为什么要单列这条**：$\\mathbb{R}^{I}$ 与 $\\mathbb{Z}^{I}$（任意大的积）一般**不是**局部紧的，所以主定理管不着它们。这条给出它们的具体答案，说明**结构定理之外也能处理**。',
        '**第一条**：$\\mathbb{R}^{I}$ 仍是可除的（可除性的积还是可除），于是「可除 $\to$ 离散全零」那一套照样管用，$\\operatorname{RHom}$ 整个归零。',
        '**第二条**：$\\mathbb{Z}^{I}$ 上的同态由 $I$ 上取值决定的那些（有限支撑的）—— 得到自由阿贝尔群 $\\mathbb{Z} \\cdot I$，且没有高阶项。',
        '⚠️ 关键在于这些对象**不是局部紧**的，所以不能靠「局部紧阿贝尔群结构定理」把它们拆成三类；但结论照样干净。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 8.19']
    }

  ]
});
