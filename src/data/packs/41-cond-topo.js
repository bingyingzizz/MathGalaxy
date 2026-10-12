/* ==========================================================================
   内容包 · 拓扑阿贝尔群（7 条）
   --------------------------------------------------------------------------
    §6.2。这一团造出的东西是**「拓扑阿贝尔群 → 凝聚态阿贝尔群」这条通道**：
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
        '⚠️ **两个容易掉进去的坑**（专门点出来）：',
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
        '⭐ **这一条的实际用途**：把拓扑问题搬进凝聚态这一侧，用那里的同调代数（长正合列、求导函子）去算，再搬回来。**代价是丢失信息** —— 忠实但不一定满，所以「凝聚态地相等」比「拓扑地相等」更弱。',
        ['**证明（照书：形式上来自「拓扑空间到凝聚态集」那条定理）。** 对拓扑阿贝尔群 $M$，记 $\\underline{M}(S) := C(S, M)$，逐点取加法，得到 $\\mathrm{CondAb}$ 的对象 ✓（层条件是「连续映射的粘合」，逐点成立）。',
          '- **忠实**：$f \\ne g : M \\to N$ 时取一点 $m$ 使 $f(m)\\ne g(m)$，则在 $\\underline{M}(\\bullet)$ 上 $f,g$ 已经不同 ✓（用测试对象 $\\bullet$ 这一个点就够）。',
          '- **保所有极限**：凝聚态侧的极限逐项计算，而 $C\\bigl(S, \\varprojlim_{i} M_{i}\\bigr) = \\varprojlim_{i} C(S, M_{i})$ —— 拓扑阿贝尔群的极限（积 / 核 / 等化子）里「连续映射由各分量连续决定」✓。逐项取极限得到的仍是层，故它就是 $\\mathrm{CondAb}$ 里的极限 ✓。',
          '- **紧生成那一部分全忠实**：由 $\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, \\underline{Y}) = C(X, Y)$（紧生成情形，见「内部 Hom 的函数空间刻画」），把 $X, Y$ 取成紧生成的拓扑阿贝尔群、并把同态条件一并带上即得。∎',
          '⚠️ **反向没有伴随**：函子 $X \\mapsto X(\\bullet)$ 不保积（$\\mathrm{CGWH}$ 不是对任意积封闭），所以这个嵌入没有现成的伴随 —— 这也是「凝聚态地相等更弱」的技术原因。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 6.2.1']
    },

    {
      id: 'prop.continuous-hom-condensed',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '连续同态与内部 Hom',
      title: '$C_{\\mathbb{Z}}(M,N) \\cong \\operatorname{Hom}_{\\mathbb{Z}}(M,N)$（$M$ 紧生成）',
      regions: ['condensed'],
      tags: ['凝聚态', '连续同态', '内 Hom', '紧生成'],
      statement: '若 $M, N$ 是两个拓扑阿贝尔群、且 $M$ **紧生成**，则存在凝聚态阿贝尔群的自然同构 $C_{\\mathbb{Z}}(M, N) \\cong \\operatorname{Hom}_{\\mathbb{Z}}(M, N)$。',
      notes: [
        ['**证明。** 记左边的凝聚态阿贝尔群为 $S \\mapsto C(S, C_{\\mathbb{Z}}(M,N))$。对紧 Hausdorff 的 $S$，两边逐项算：',
          '- 右边：',
          '$$\\operatorname{Hom}_{\\mathbb{Z}}(\\underline{M},\\underline{N})(S) = \\operatorname{Hom}\\bigl(S, \\operatorname{Hom}_{\\mathbb{Z}}(\\underline{M},\\underline{N})\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\underline{M},\\ \\operatorname{Hom}(S, \\underline{N})\\bigr) = \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\underline{M},\\ C(S, N)\\bigr) = C_{\\mathbb{Z}}\\bigl(M,\\ C(S,N)\\bigr),$$',
          '第二步是 $(S, -)$ 与内部 Hom 的伴随，最后一步用「$M$ 紧生成时 $\\underline{M}$ 是全忠实嵌入」（上一条）；',
          '- 左边：$C_{\\mathbb{Z}}(M,N)(S) = \\operatorname{Hom}\\bigl(S, C_{\\mathbb{Z}}(M,N)\\bigr) = C\\bigl(S,\\ C_{\\mathbb{Z}}(M,N)\\bigr)$；',
          '- 两端之间由**指数律**（紧生成 / 局部紧下成立）搭桥：',
          '$$C\\bigl(M,\\ C(S,N)\\bigr) \\cong C(M\\times S,\\ N) \\cong C\\bigl(S,\\ C(M,N)\\bigr).$$',
          '三条串起来就是所要的自然同构（同态条件在指数律下逐点对应）。∎',
          '⭐ **前提「$M$ 紧生成」的作用**：只有这时 $\\operatorname{Hom}_{\\mathbb{Z}}(\\underline{M}, -)$ 才真的量的是「连续同态」；一般拓扑阿贝尔群上，凝聚态 Hom 比连续同态**多**（可以「逐块拼」出连续而整体不连续的东西）。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 6.2.2']
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
      notes: [
        '左正合是自动的（上一条函子保所有极限）；右端要的是「$\\underline{v}$ 是满态射」，而凝聚态里满态射的判据就是「对自由紧 Hausdorff 空间逐点满」，于是归结为紧提升条件。',
        '📌 **局部紧时紧提升条件自动满足** —— 所以对局部紧阿贝尔群，正合列可以整条搬过去。',
        ['**证明。**',
          '- **左正合**：函子 $M\\mapsto\\underline{M}$ 保所有极限（上一条），于是 $0\\to\\underline{M\'}\\to\\underline{M}$ 正合、且 $\\underline u$ 是单射 ✓。',
          '- **中段的像 = 核**：$v\\circ u = 0$ 逐点成立；反向「$v(m) = 0 \\implies m\\in u(M\')$」逐点由拓扑正合列给出 ✓。',
          '- **右端满**：由满态射判据（在自由紧 Hausdorff 对象上逐点满），取自由 $F$ 与 $y : F \\to M\'\'$。$y(F)$ 是 $M\'\'$ 里的**紧 Hausdorff** 子集（$F$ 紧、$M\'\'$ 弱 Hausdorff 故 $y(F)$ 闭且 Hausdorff）；由**紧提升条件**取紧 Hausdorff $K\\subseteq M$ 使 $y(F)\\subseteq v(K)$。对每点挑一个原像，得到映射 $F\\to K\\to M$；连续性由「$v$ 在紧块上是商映射」（拓扑正合列里 $v$ 是商映射，限制到$K$、$y(F)$ 上仍是商映射）给出。于是 $y$ 在图下提升，$\\underline v(F)$ 满 ✓。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 6.2.3']
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
      notes: [
        '⭐ 这条说明「拓扑阿贝尔群」这个范畴**不够好**：没法在里面做同调代数。这正是要把它搬进凝聚态那侧的理由 —— 那边是 Grothendieck 范畴，要什么有什么。',
        '**为什么核余核都造得出还是不行。** 阿贝尔范畴要求「每个单态射都是某个态射的核」（等价地：单态射与其余核的核同构，即**严格**）。$\\mathbb{R}^{\\mathrm{disc}} \\to \\mathbb{R}$ 是单态射（它同构于自己的像），但它的余核是 $0$ —— 像在余核里被整个商掉了。于是「余核的核」不是原来的对象，严格性破掉。',
        ['**证明。**',
          '- **预阿贝尔**：有有限积与有限余积（积 = 积群配积拓扑；余积 = 直和配「余积拓扑」）、核与余核都存在 —— 核是通常的核配**子空间拓扑**；余核是 $N/f(M)$ 配**商拓扑**（商群配商拓扑仍是局部紧 Hausdorff，因为 $f(M)$ 未必闭、商掉的是它的闭包……取 $N/\\overline{f(M)}$ 的那一套标准处理）✓。',
          '- **不是阿贝尔**：取 $\\mathrm{id} : \\mathbb{R}^{\\mathrm{disc}} \\to \\mathbb{R}$。它连续（离散拓扑比欧氏拓扑细）且是单射，故是单态射；它的**余核** $\\mathbb{R}/\\mathbb{R} = 0$。而阿贝尔范畴要求单态射是**严格的**，即 $f = \\ker(\\operatorname{coker} f)$ —— 这里 $\\ker(0) = \\mathbb{R}$，但 $\\ker(0)$ 要带的拓扑是欧氏拓扑，而 $\\mathbb{R}^{\\mathrm{disc}}$ 不是它，二者**同构但不相等**（作为拓扑群的态射不同构）✗。∎',
          '（等价的说法：$\\mathrm{id}$ 同构于它的像，但不是「余核的核」，于是单满分解不是严格的。）'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 6.4']
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
        '⭐ **对偶到底把什么换成了什么，有两条独立的命题**：',
        '',
        [
          '- 「离散与紧 Hausdorff 互换」—— 讲的是**拓扑性质**怎么翻；',
          '- 「挠与 Stonean、无挠与连通」—— 讲的是**代数性质**怎么翻。'
        ].join('\n'),
        '',
        '两张字典合起来才是完整的「用拓扑来读代数」，也是凝聚态数学「用紧 Hausdorff 空间测一切」这一思路的来源。'
      ].join('\n\n'),
      refs: ['Le Stum, §6.2']
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
        '⭐ **这一条是凝聚态阿贝尔群那套理论的原型**：把 $\\mathbb{T}$ 换成别的测试对象、把「局部紧」换成别的条件，就得到各种对偶（Tannaka、Gelfand……）。凝聚态数学把「$\\mathbb{T}$ 换成 CHaus 上的层」升了一次维。',
        ['**证明（按三类情形拼起来）。**',
          '- **$M$ 离散**：经典 Pontryagin 对偶。先取满射 $\\mathbb{Z}^{(I)} \\twoheadrightarrow M$，对偶后得闭嵌入 $\\widehat M \\hookrightarrow \\mathbb{T}^{I}$，故 $\\widehat M$ 紧；求值 $M \\to \\widehat{\\widehat M}$ 在有限群与有限生成群上用初等计算验证，再用「$M$ 是有限生成子群的滤过余极限 + 对偶把余极限变成逆极限 + 两边都正合」取极限即得同构 ✓。',
          '- **$M$ 紧**：$\\widehat M$ 离散（见「离散与紧 Hausdorff 互换」）；对紧群用**特征标分离点**（Pontryagin 的经典论证：紧阿贝尔群的特征标构成足够的分离族，用 Peter–Weyl / 有限维表示论给出），得求值 $M \\to \\widehat{\\widehat M}$ 单；再用前一情形与紧的 $M$ 的对偶离散，把单射性与满性补全 ✓。',
          '- **$M$ 一般局部紧**：用结构定理——$M$ 含开子群 $V\\oplus K$（$V$ 有限维实向量空间、$K$ 紧）、其余商 $D$ 离散。对群 $V$、$K$、$D$ 分别已知对偶自等价，而三者通过正合列拼起来、对偶把正合列翻成正合列（箭向反转），五引理把中间的求值映射夹成同构 ✓。',
          '- **自伴随**：配对 $M\\times\\widehat M \\to \\mathbb{T}$（取值）给出伴随 $\\operatorname{Hom}(\\widehat M, N) \\cong \\operatorname{Hom}(M, \\widehat N)$，把 $M$ 换成 $\\widehat M$ 再用两次自等价即得 ✓。∎',
          '**标准出处**：Morris, *Pontryagin Duality and the Structure of Locally Compact Abelian Groups*。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 6.2.4', 'Morris, Pontryagin Duality and the Structure of Locally Compact Abelian Groups']
    }
  ],

  edges: []
});
