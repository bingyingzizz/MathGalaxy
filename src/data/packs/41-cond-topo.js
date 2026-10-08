/* ==========================================================================
   内容包 · 拓扑阿贝尔群（7 条）
   --------------------------------------------------------------------------
   原书 §6.2。这一团造出的东西是**「拓扑阿贝尔群 → 凝聚态阿贝尔群」这条通道**：
   把「带拓扑的阿贝尔群」忠实、保极限地搬进 $\mathrm{CondAb}$ 里，
   于是可以在凝聚态这一侧做同调代数，再把结果搬回去。

   终点是 **Pontryagin–van Kampen 对偶**：局部紧 Hausdorff 阿贝尔群
   在对偶下自成一个世界，$M \mapsto \widehat{M}$ 是可逆的。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑阿贝尔群',
  nodes: [

    /* ------------------------------------------------ 拓扑阿贝尔群 */
    {
      id: 'def.topo-ab-group',
      cluster: 'cond.topo',
      type: 'definition',
      label: '拓扑阿贝尔群',
      title: '拓扑阿贝尔群与连续同态（Topological Abelian Group）',
      regions: ['condensed', 'topology'],
      tags: ['凝聚态', '拓扑阿贝尔群', '连续同态', '紧开拓扑'],
      statement: [
        '**拓扑阿贝尔群** $(M, +, \\tau)$ 是一个**阿贝尔群** $M$ 连带一个拓扑 $\\tau$，使运算连续：',
        '',
        '$$+ : M \\times M \\longrightarrow M, \\qquad - : M \\longrightarrow M.$$',
        '',
        '两个拓扑阿贝尔群之间的**连续同态**记作',
        '',
        '$$C_{\\mathbb{Z}}(M, N) \\;\\subseteq\\; C(M, N),$$',
        '',
        '右边带**紧开拓扑**，左边取**子空间拓扑**。'
      ].join('\n'),
      notes: [
        '⭐ **为什么用 $C_{\\mathbb{Z}}$ 这个记号**：$\\mathbb{Z}$ 提醒你这些是 $\\mathbb{Z}$-模（也就是阿贝尔群）的同态，不是随便的连续映射。',
        '**与内部 Hom 的关系**：$M$ **紧生成**时 $C_{\\mathbb{Z}}(M, N) = \\operatorname{Hom}_{\\mathbb{Z}}(M, N)$ —— 见下一条命题。（这是「测试够了」的又一个红利。）',
        '⚠️ **两个容易掉进去的坑**（原书专门点出来）：',
        '',
        [
          '- $\\underline{M} \\mapsto M$ 那条通道**没有明显的伴随**，因为函子 $X \\mapsto X(\\bullet)$（取底拓扑空间）**不保积**；',
          '- 就算 $M$ 是拓扑阿贝尔群，$kM$ **一般也不是**拓扑阿贝尔群 —— 因为紧生成空间对（拓扑空间的）积不封闭。',
        ].join('\n'),
      ].join('\n\n')
    },

    /* ------------------------------------------------ 关联凝聚态群 */
    {
      id: 'prop.abtop-to-abcond',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '拓扑阿贝尔群嵌入凝聚态',
      title: '$\\mathbf{AbTop} \\to \\mathrm{AbCond}$ 保所有极限',
      regions: ['condensed'],
      tags: ['凝聚态', '拓扑阿贝尔群', '忠实函子', '保极限'],
      statement: [
        '存在**保所有极限**的**忠实**函子',
        '',
        '$$\\mathbf{AbTop} \\longrightarrow \\mathrm{AbCond}, \\qquad M \\longmapsto \\underline{M}.$$',
        '',
        '它在**紧生成**阿贝尔群这一部分上是**全忠实**的。'
      ].join('\n'),
      notes: [
        '**构造**：一个拓扑阿贝尔群 $M$ 给出凝聚态阿贝尔群',
        '',
        '$$\\underline{M} : S \\longmapsto C(S, M),$$',
        '',
        '即「从紧 Hausdorff 空间 $S$ 到 $M$ 的连续映射集」（逐点加法）。因为 $M$ 是拓扑阿贝尔群、$C(S, M)$ 按逐点加法是阿贝尔群，这是阿贝尔群值预层；层条件是「粘合连续映射」，成立。',
        '**保所有极限**来自定理「$\\mathbf{Top} \\to \\mathrm{Cond}$ 保有限积」：凝聚态里的极限逐点算，而连续映射的极限在 $\\mathbf{Top}$ 里算和逐点算一致。',
        '⭐ **这一条的实际用途**：把拓扑问题搬进凝聚态这一侧，用那里的同调代数（长正合列、求导函子）去算，再搬回来。**代价是丢失信息** —— 忠实但不一定满，所以「凝聚态地相等」比「拓扑地相等」更弱。'
      ].join('\n\n')
    },

    {
      id: 'prop.continuous-hom-condensed',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '连续同态与内部 Hom',
      title: '$C_{\\mathbb{Z}}(M,N) \\cong \\operatorname{Hom}_{\\mathbb{Z}}(M,N)$（$M$ 紧生成）',
      regions: ['condensed'],
      tags: ['凝聚态', '连续同态', '内 Hom', '紧生成'],
      statement: '若 $M, N$ 是两个拓扑阿贝尔群、且 $M$ **紧生成**，则存在凝聚态阿贝尔群的自然同构 $C_{\\mathbb{Z}}(M, N) \\cong \\operatorname{Hom}_{\\mathbb{Z}}(M, N)$。'
    },

    {
      id: 'prop.exact-sequence-topo-ab',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '拓扑阿贝尔群正合列的搬运',
      title: '拓扑正合列 $\\implies$ 凝聚态正合列',
      regions: ['condensed'],
      tags: ['凝聚态', '正合列', '弱 Hausdorff', '紧子集'],
      statement: [
        '设',
        '',
        '$$0 \\longrightarrow M\' \\xrightarrow{\\;u\\;} M \\xrightarrow{\\;v\\;} M\'\' \\longrightarrow 0$$',
        '',
        '是拓扑阿贝尔群的**正合列**，$M\'\'$ **弱 Hausdorff**，并且满足：',
        '',
        '**（紧提升条件）** 对每个紧 Hausdorff $K\'\' \\subseteq M\'\'$，存在紧 Hausdorff $K \\subseteq M$ 使 $K\'\' \\subseteq v(K)$。',
        '',
        '则凝聚态阿贝尔群的正合列',
        '',
        '$$0 \\longrightarrow \\underline{M\'} \\xrightarrow{\\;\\underline{u}\\;} \\underline{M} \\xrightarrow{\\;\\underline{v}\\;} \\underline{M\'\'} \\longrightarrow 0$$',
        '',
        '也正合。'
      ].join('\n'),
      notes: '左正合是自动的（上一条函子保所有极限）；右端要的是「$\\underline{v}$ 是满态射」，而凝聚态里满态射的判据就是「对自由紧 Hausdorff 空间逐点满」，于是归结为紧提升条件。\n\n📌 **局部紧时紧提升条件自动满足** —— 所以对局部紧阿贝尔群，正合列可以整条搬过去。'
    },

    /* ------------------------------------------ 局部紧阿贝尔群 */
    {
      id: 'prop.lc-ab-preabelian',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '局部紧阿贝尔群不是阿贝尔范畴',
      title: '局部紧 Hausdorff 阿贝尔群：预阿贝尔但非阿贝尔',
      regions: ['condensed', 'topology'],
      tags: ['凝聚态', '局部紧', '预阿贝尔', '严格态射'],
      statement: [
        '局部紧 Hausdorff 阿贝尔群构成的范畴是**预阿贝尔**的，但**不是阿贝尔**范畴。',
        '',
        '具体地：核 = 通常的核带子空间拓扑；余核 = 商群 $N/f(M)$ 带商拓扑；但态射**不必是严格的** ——',
        '',
        '$$\\mathrm{id} : \\mathbb{R}^{\\mathrm{disc}} \\longrightarrow \\mathbb{R}$$',
        '',
        '（同一个群，一个取离散拓扑、一个取通常拓扑）就不是严格的。'
      ].join('\n'),
      notes: '⭐ 这条说明「拓扑阿贝尔群」这个范畴**不够好**：没法在里面做同调代数。这正是要把它搬进凝聚态那侧的理由 —— 那边是 Grothendieck 范畴，要什么有什么。\n\n**为什么核余核都造得出还是不行。** 阿贝尔范畴要求「每个单态射都是某个态射的核」（等价地：单态射与其余核的核同构，即**严格**）。$\\mathbb{R}^{\\mathrm{disc}} \\to \\mathbb{R}$ 是单态射（它同构于自己的像），但它的余核是 $0$ —— 像在余核里被整个商掉了。于是「余核的核」不是原来的对象，严格性破掉。'
    },

    /* ---------------------------------------------- Pontryagin 对偶 */
    {
      id: 'def.pontryagin-dual',
      cluster: 'cond.topo',
      type: 'definition',
      label: 'Pontryagin 对偶',
      title: 'Pontryagin 对偶（Pontryagin Dual）',
      regions: ['condensed'],
      tags: ['凝聚态', 'Pontryagin', '对偶', '圆群'],
      statement: [
        '记**圆群**',
        '',
        '$$\\mathbb{T} := \\{\\, z \\in \\mathbb{C} : |z| = 1 \\,\\}.$$',
        '',
        '拓扑阿贝尔群 $M$ 的 **Pontryagin 对偶**是',
        '',
        '$$\\widehat{M} := C_{\\mathbb{Z}}(M, \\mathbb{T}),$$',
        '',
        '即从 $M$ 到 $\\mathbb{T}$ 的连续群同态全体，带紧开拓扑。'
      ].join('\n'),
      notes: [
        '**为什么是 $\\mathbb{T}$**：它是**紧**的 $T_{1}$ 群，也是最简单的「能承载全部特征标」的群。对偶群因此自动是紧的（当 $M$ 离散时）—— 这就是「对偶把大小反过来」的机制。',
        '**两个基本例子**（都可以直接算）：$\\widehat{\\mathbb{Z}} \\cong \\mathbb{T}$，$\\widehat{\\mathbb{T}} \\cong \\mathbb{Z}$ —— 对偶把离散的整数群换成紧的圆群，反过来也一样。第三个例子 $\\widehat{\\mathbb{R}} \\cong \\mathbb{R}$ 由 Fourier 变换给出：$y \\mapsto e^{2\\pi i xy}$ 的每个连续特征标都长这样。',
        '⭐ **对偶把结构翻过来**（Pontryagin 那一对字典）：',
        '',
        [
          '- 离散 $\\leftrightarrow$ 紧 Hausdorff；',
          '- 挠（torsion）$\\leftrightarrow$ **Stonean**；',
          '- 无挠 $\\leftrightarrow$ **连通**。',
        ].join('\n'),
        '',
        '这张字典是「用拓扑来读代数」的最初范本，也是凝聚态数学「用紧 Hausdorff 空间测一切」这一思路的来源。'
      ].join('\n\n')
    },

    {
      id: 'thm.pontryagin-van-kampen',
      cluster: 'cond.topo',
      type: 'theorem',
      label: 'Pontryagin–van Kampen 对偶',
      title: 'Pontryagin–van Kampen 对偶定理',
      regions: ['condensed', 'topology'],
      tags: ['凝聚态', 'Pontryagin', '自等价', '局部紧'],
      statement: [
        '函子',
        '',
        '$$M \\longmapsto \\widehat{M} := C_{\\mathbb{Z}}(M, \\mathbb{T}),$$',
        '',
        '是**局部紧 Hausdorff 阿贝尔群**范畴上的**自等价**（而且是自伴随的等价）。',
        '',
        '特别地，$\\widehat{M}$ 仍局部紧 Hausdorff，并且**双重对偶回到自己**：$\\widehat{\\widehat{M}} = M$。'
      ].join('\n'),
      notes: [
        '**「自伴随的等价」是什么意思**：$M \\mapsto \\widehat{M}$ 既是 $M \\mapsto \\widehat{M}$ 的左伴随又是它的右伴随（对偶函子与自己的伴随关系，配对由取值映射 $M \\times \\widehat{M} \\to \\mathbb{T}$ 给出）。',
        '**整条正合列都对偶过去**：如果 $0 \\to M\' \\to M \\to M\'\' \\to 0$ 是局部紧阿贝尔群的（严格）正合列，那么对偶之后 $0 \\to \\widehat{M\'\'} \\to \\widehat{M} \\to \\widehat{M\'} \\to 0$ 仍正合 —— **箭头全部转向**。这是「自等价保结构」的直接好处：群论问题可以在对偶那边做，再翻回来。',
        '**几个必记的对应**：$\\widehat{\\mathbb{R}} \\cong \\mathbb{R}$（Fourier 变换）；$\\widehat{\\mathbb{Z}} \\cong \\mathbb{T}$ 与 $\\widehat{\\mathbb{T}} \\cong \\mathbb{Z}$（互相换）；有限维实 Banach 空间上的对偶退化成通常的线性对偶（实 Banach 空间局部紧 $\\iff$ 有限维）。',
        '⭐ **这一条是凝聚态阿贝尔群那套理论的原型**：把 $\\mathbb{T}$ 换成别的测试对象、把「局部紧」换成别的条件，就得到各种对偶（Tannaka、Gelfand……）。凝聚态数学把「$\\mathbb{T}$ 换成 CHaus 上的层」升了一次维。'
      ].join('\n\n')
    }
  ],

  edges: []
});
