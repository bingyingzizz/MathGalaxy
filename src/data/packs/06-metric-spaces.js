/* ==========================================================================
   内容包 · 度量空间（星系：拓扑学）
   --------------------------------------------------------------------------
   从「距离」出发的紧性理论。核心是那条链：

        紧  ⟺  列紧  ⟺  完备 + 全有界

   注意「紧」是拓扑概念，「完备 / 全有界」是度量概念 —— 度量空间好用的地方
   就在于这两类性质在这里能互相翻译。五条箭头把这条链的逻辑骨架搭起来，
   每个方向的证明都写在箭头里。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '度量空间',
  nodes: [

    {
      id: 'def.metric-space',
      cluster: 'topology.metric',
      type: 'definition',
      label: '距离空间',
      title: '距离空间 / 度量空间（Metric Space）',
      regions: ['topology'],
      tags: ['定义', '度量', '开球'],
      statement: [
        '**距离空间**是一对 (X, d)：X 是集合，d : X × X → [0, +∞) 是 X 上的**距离**，满足',
        '',
        '- **非退化**：$$d(x, y) = 0 \\iff x = y$$',
        '- **对称**：$$d(x, y) = d(y, x)$$',
        '- **三角不等式**：$$d(x, z) \\le d(x, y) + d(y, z)$$',
        '',
        '由 d 定义**开球** $$B(x, r) = \\{ y \\in X : d(x, y) < r \\}$$，并规定 U ⊆ X 是开集 ⟺ U 是若干开球之并。这样 X 上就有了一个拓扑。',
        '',
        '给定 ε > 0，称 D ⊆ X 是一个 **ε-网**，若 $$\\forall x \\in X, \\exists y \\in D : d(x, y) < \\varepsilon$$'
      ].join('\n'),
      notes: [
        '开球全体构成这个拓扑的一组**基**。度量空间自动是第一可数、正规（因而 Hausdorff）的。',
        '下面几条性质分两类：**紧性 / 闭**只依赖开集，是**拓扑**性质；**完备 / 全有界**要用到 d，是**度量**性质。这条分界线是整段的重点。',
        '⚠ 完备性**不是**拓扑性质：ℝ 与开区间 (0, 1) 同胚，前者完备、后者不完备。'
      ].join('\n\n'),
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 2', 'Munkres, Topology, §20']
    },

    {
      id: 'def.complete',
      cluster: 'topology.metric',
      type: 'definition',
      label: '完备',
      title: '完备距离空间（Complete Metric Space）',
      regions: ['topology'],
      tags: ['定义', '完备', 'Cauchy 列'],
      statement: [
        '序列 {xₙ} 是 **Cauchy 列**，当且仅当',
        '',
        '$$\\forall\\varepsilon > 0, \\exists N : m, n \\ge N \\implies d(x_m, x_n) < \\varepsilon$$',
        '',
        '距离空间 (X, d) **完备**，当且仅当 X 中每个 Cauchy 列都在 X 中收敛：',
        '',
        '$$\\{x_n\\} 是 Cauchy 列 \\implies \\exists x \\in X : x_n \\to x$$'
      ].join('\n'),
      notes: [
        '「收敛 ⟹ Cauchy」永远成立；**「Cauchy ⟹ 收敛」才是完备性的内容**。',
        '例子：ℝⁿ、ℂⁿ、任何 Banach 空间都完备；ℚ 不完备（3, 3.1, 3.14, …, 一个收敛到 √2 的 Cauchy 列在 ℚ 中不收敛）。',
        '**闭子集继承完备**：X 完备时，A ⊆ X 作为子空间完备 ⟺ A 在 X 中闭。这条在下面「子集的紧性刻画」里要用。'
      ].join('\n\n'),
      refs: ['Rudin, Principles of Mathematical Analysis, Ch. 3']
    },

    {
      id: 'def.totally-bounded',
      cluster: 'topology.metric',
      type: 'definition',
      label: '全有界',
      title: '全有界 / 预紧（Totally Bounded）',
      regions: ['topology'],
      tags: ['定义', '全有界', 'ε-网'],
      statement: [
        '距离空间 (X, d) **全有界**（也叫**预紧**），当且仅当对每个 ε > 0 都存在**有限的 ε-网**：',
        '',
        '$$\\forall\\varepsilon > 0, \\exists n 与 x_1, …, x_n \\in X : X = \\bigcup_{i=1}^{n} B(x_i, \\varepsilon)$$',
        '',
        '等价说法：对每个 ε > 0，X 都能被**有限个**半径 ε 的开球盖住。'
      ].join('\n'),
      notes: [
        '关键词是**有限**。它只要求「存在」一组有限的球，不要求你写得出来。',
        '**全有界 ⟹ 有界**（取 ε = 1，X 就被有限个单位球盖住），但反之不然：无限维 Banach 空间的单位球有界而不全有界。',
        '全有界被**一致连续**映射保持，但不被连续映射保持 —— 又一次说明它是度量性质而非拓扑性质。'
      ].join('\n\n'),
      refs: ['Munkres, Topology, §43']
    },

    {
      id: 'def.sequentially-compact',
      cluster: 'topology.metric',
      type: 'definition',
      label: '列紧',
      title: '列紧 / 序列紧（Sequentially Compact）',
      regions: ['topology'],
      tags: ['定义', '列紧', '子列'],
      statement: [
        '距离空间 (X, d) **列紧**（序列紧），当且仅当 X 中每个序列都有收敛到 X 中的子列：',
        '',
        '$$\\forall\\{x_n\\} \\subseteq X, \\exists\\{x_{n_k}\\} 与 \\exists x \\in X : x_{n_k} \\to x$$'
      ].join('\n'),
      notes: '在度量空间里「列紧 ⟺ 紧」（见下面的箭头），但在一般拓扑空间里**不等价** —— 列紧严格更强。度量空间好用的地方正是这里。\n\n注意子列收敛到的是 X 中的点：列紧是内蕴性质，不看外面那个空间。',
      refs: ['Munkres, Topology, §28']
    },

    {
      id: 'def.compact',
      cluster: 'topology.metric',
      type: 'definition',
      label: '紧',
      title: '紧空间（Compact Space）',
      regions: ['topology'],
      tags: ['定义', '紧', '开覆盖'],
      statement: [
        '距离空间 (X, d) **紧**，当且仅当 X 的每个**开覆盖**都有有限子覆盖：',
        '',
        '$$\\forall\\{U_i\\}_{i \\in I} ( 每个 U_i 开且 X = \\bigcup_{i \\in I} U_i ) \\implies \\exists i_1, …, i_n : X = \\bigcup_{k=1}^{n} U_{i_k}$$'
      ].join('\n'),
      notes: [
        '紧性是**拓扑**性质，只依赖开集，跟 d 的具体取值无关。',
        '例子：ℝ 中的闭区间 [a, b] 紧（Heine–Borel）；ℝ 本身不紧（{(-n, n)} 没有有限子覆盖）；(0, 1] 不紧。',
        '紧性的一个常用等价形式：**有限交性质** —— 若一族闭集的任意有限子族都有交，则整族的交非空。'
      ].join('\n\n'),
      refs: ['Munkres, Topology, §26']
    },

    {
      id: 'thm.metric-compact-equiv',
      cluster: 'topology.metric',
      type: 'theorem',
      label: '紧的三个等价刻画',
      title: '度量空间中：紧 ⟺ 列紧 ⟺ 完备 + 全有界',
      regions: ['topology'],
      tags: ['定理', '紧', '列紧', '完备', '全有界'],
      statement: [
        '设 (X, d) 是距离空间。则下列三条**彼此等价**：',
        '',
        '$$X 紧 \\iff X 列紧 \\iff X 完备且全有界$$'
      ].join('\n'),
      notes: [
        '逻辑骨架全在箭头里（点箭头看证明）：',
        '',
        '- 紧 ⟹ 列紧',
        '- 列紧 ⟹ 全有界　（整段里**唯一**实质用到选择原理的一步，用的是 DC）',
        '- 列紧 ⟹ 完备',
        '- 列紧 ⟹ 紧　（「坏球」法，只用到全有界，不动选择公理）',
        '- 紧 ⟹ 完备、紧 ⟹ 全有界',
        '- 完备 + 全有界 ⟹ 列紧　（对角线法，也不动选择公理）',
        '',
        '于是「列紧 ⟹ 全有界 ⟹ 紧」与「紧 ⟹ 列紧」闭合，三个概念打通。',
        '⚠ 在一般拓扑空间里只有「紧 ⟹ 列紧」成立、**反向不成立** —— 列紧是度量空间特有的好运气。'
      ].join('\n\n'),
      refs: ['Munkres, Topology, §28 与 §43']
    },

    {
      id: 'prop.compact-subset-closed',
      cluster: 'topology.metric',
      type: 'proposition',
      label: '紧子集是闭的',
      title: '命题：紧子集在 X 中是闭集',
      regions: ['topology'],
      tags: ['命题', '紧', '闭集'],
      statement: [
        '设 A 是距离空间 X 的子集（按子空间度量）。则',
        '',
        '$$A 紧 \\implies A 是 X 中的闭集$$'
      ].join('\n'),
      notes: [
        '其实只要 X 是 Hausdorff 空间，紧子集就是闭的；距离空间自然 Hausdorff。',
        '第 1 页笔记里把它和「X 完备」并列写在一起，正是为了下面那条**子集**的紧性刻画做准备：那条要用「A 紧 ⟹ A 闭」和「A 闭 + X 完备 ⟹ A 完备」。'
      ].join('\n\n'),
      refs: ['Munkres, Topology, §26']
    },

    {
      id: 'prop.subset-compact-equiv',
      cluster: 'topology.metric',
      type: 'proposition',
      label: '子集的紧性刻画',
      title: '命题：X 完备时，A 紧 ⟺ A 闭且全有界',
      regions: ['topology'],
      tags: ['命题', '紧', '闭', '全有界'],
      statement: [
        '设 (X, d) 是**完备**的距离空间，A ⊆ X。则',
        '',
        '$$A 紧 \\iff A 闭 且 A 全有界$$',
        '',
        '（「A 全有界」按子空间度量 d|A 理解。）'
      ].join('\n'),
      notes: [
        '⚠ **「X 完备」这个前提不能省。** 理由是中间那一步：A 作为子空间完备 ⟺ A 在 X 中闭 —— 这一步要用 X 完备。少了它，A 闭 + A 全有界推不出 A 紧。',
        '这也是 **Heine–Borel** 的推广：ℝⁿ 完备，而在 ℝⁿ 中 A 有界 ⟺ A 全有界，于是「有界闭集紧」正是它的特例。',
        '⚠ 笔记里这一行写的是「A 紧 ⟺ A 闭 + 全有界」，字面没写前提；上面单独一行的「X 完备」应该就是这条的前提。（已请本人核对。）'
      ].join('\n\n'),
      refs: ['Munkres, Topology, §28', 'Rudin, Principles of Mathematical Analysis, Ch. 2']
    }
  ],

  edges: [

    /* ---------------------------------------- 紧 ⟹ 列紧 */
    {
      id: 'imp.compact-seqcompact',
      kind: 'implication',
      sources: ['def.compact'],
      target: 'def.sequentially-compact',
      title: '紧 ⟹ 列紧',
      proof: [
        '设 {xₙ} 是 X 中的序列。反证：假设它没有收敛的子列。',
        '',
        '**① 点集 {xₙ : n ∈ ℕ} 是闭的。** 任取 y 不在这个点集中。若 y 是某个 xₙ，那 y 显然不在余集里；以下设 y ∉ {xₙ}。由于 {xₙ} 没有收敛子列，{xₙ} 中任何子列都不趋于 y，于是存在 ε > 0 使 B(y, ε) 中只含**有限个** xₙ（否则可以挑出趋于 y 的子列）。删掉这有限多个点，就得到一个含 y 的开球不碰 {xₙ}。故余集开，{xₙ} 闭。',
        '',
        '**② 每个 xₙ 有一个只含有限多个 xₘ 的开邻域。** xₙ 自己也被排除在子列之外，同上可得。',
        '',
        '**③ 造一个开覆盖。** 取',
        '',
        '$$𝒰 = \\{ U_n : n \\in \\mathbb\\{N\\} \\} \\cup \\{ X \\setminus \\{x_n : n \\in \\mathbb\\{N\\}\\} \\}$$',
        '',
        '其中 Uₙ 是 ② 中给 xₙ 的那个邻域（只含有限个 xₘ）。再补上闭集的余集，𝒰 就是 X 的开覆盖。',
        '',
        '**④ 由紧性取有限子覆盖** 𝒱 ⊆ 𝒰。若 𝒱 包含那个余集，则没盖住任何 xₙ；若只含有限个 Uₙ，而每个 Uₙ 只含有限个 xₘ，则 𝒱 总共只盖住**有限多个** xₘ —— 与 {xₙ} 是无限集矛盾（没有收敛子列迫使它无限）。',
        '',
        '故 {xₙ} 必有收敛子列，X 列紧。∎'
      ].join('\n'),
      note: '只有这一步不需要选择公理。'
    },

    /* ---------------------------------------- 列紧 ⟹ 全有界 */
    {
      id: 'imp.seqcompact-totbdd',
      kind: 'implication',
      sources: ['def.sequentially-compact'],
      target: 'def.totally-bounded',
      title: '列紧 ⟹ 全有界',
      proof: [
        '证明逆否：若 X 不全有界，则存在一个没有收敛子列的序列。',
        '',
        '**① 不全有界给了我们一个「一致」的正数。** X 不全有界，意思是存在某个 ε₀ > 0，使 X **不能**被有限个半径 ε₀ 的球盖住。',
        '',
        '**② 递归地挑点。** 取 x₁ ∈ X 任意。已取好 x₁, …, xₙ 后，有限个球 B(x₁, ε₀), …, B(xₙ, ε₀) 盖不住 X，所以可再取',
        '',
        '$$x_{n+1} \\in X \\setminus \\bigcup_{i=1}^{n} B(x_i, \\varepsilon_0)$$',
        '',
        '于是任何两个不同的项都满足 $$m \\ne n \\implies d(x_m, x_n) \\ge \\varepsilon_0$$',
        '',
        '**③ 它没有收敛子列。** 任何子列中任意两项距离都 ≥ ε₀，所以它不是 Cauchy 列；而度量空间里收敛必 Cauchy，故它不收敛。',
        '',
        '**④** 于是 X 不列紧。取逆否，得列紧 ⟹ 全有界。∎',
        '',
        '> ⚠ ② 是「取了一个点才能决定下一个点在哪」的递归选取，用的是**相依选择公理 DC**（比 AC 弱，但仍是选择原理）。这是整段里唯一实质用到选择的地方。'
      ].join('\n'),
      note: '顺带得到一个常用的推论：**列紧 ⟹ 有界**（因为全有界 ⟹ 有界）。'
    },

    /* ---------------------------------------- 列紧 ⟹ 完备 */
    {
      id: 'imp.seqcompact-complete',
      kind: 'implication',
      sources: ['def.sequentially-compact'],
      target: 'def.complete',
      title: '列紧 ⟹ 完备',
      proof: [
        '设 X 列紧，{xₙ} 是 X 中的 Cauchy 列。',
        '',
        '**①** 由列紧，{xₙ} 有收敛子列 x_{nₖ} → x ∈ X。',
        '',
        '**② Cauchy 列只要有收敛子列，就整体收敛到同一个极限**：给定 ε > 0，取 N 使 m, n ≥ N 时 d(xₘ, xₙ) < ε/2；再取 K 使 k ≥ K 时 nₖ ≥ N 且 d(x_{nₖ}, x) < ε/2。于是对 n ≥ N，取 k ≥ K 使 nₖ ≥ N，得',
        '',
        '$$d(x_n, x) \\le d(x_n, x_{n_k}) + d(x_{n_k}, x) < \\varepsilon/2 + \\varepsilon/2 = \\varepsilon$$',
        '',
        '故 xₙ → x。所以 X 完备。∎'
      ].join('\n'),
      note: '和「紧 ⟹ 完备」是同一个套路，只是把「紧」换成它的直接推论「列紧」。'
    },

    /* ---------------------------------------- 列紧 ⟹ 紧 */
    {
      id: 'imp.seqcompact-compact',
      kind: 'implication',
      sources: ['def.sequentially-compact'],
      target: 'def.compact',
      title: '列紧 ⟹ 紧',
      proof: [
        '用**反证 + 一串不断缩小的「坏球」**。设 X 列紧。',
        '',
        '**① X 全有界** —— 用上面那条箭头「列紧 ⟹ 全有界」。',
        '',
        '**② 造嵌套的坏球。** 设 𝒰 是 X 的开覆盖，且它**没有**有限子覆盖。由全有界，X 能被有限个半径 1 的开球盖住；其中必有一个球不能被 𝒰 的有限多个成员盖住 —— 否则把每个球各自的有限覆盖并起来，就得到 𝒰 的一个有限子覆盖。称这样的球为**坏球**，取一个记作 B₁。',
        '',
        '再把 B₁ 用有限个半径 1/2 的球盖住（B₁ ⊆ X，全有界性对它同样管用），其中必有一个坏球 B₂ ⊆ B₁。如此继续，得到',
        '',
        '$$B_1 \\supseteq B_2 \\supseteq B_3 \\supseteq \\cdots，　B_k 的半径 \\le 1/k，　每个 B_k 都是坏的$$',
        '',
        '（每一步都只是在**有限**多个球里挑一个，可以规定「取编号最小的那个」，所以这里不动用选择公理。）',
        '',
        '**③ 取点，得到 Cauchy 列。** 取 xₖ ∈ Bₖ。由嵌套与半径趋于 0，对 m ≤ n 有 xₘ, xₙ ∈ Bₘ 而 Bₘ 的半径 ≤ 1/m，于是',
        '',
        '$$d(x_m, x_n) \\le 2/m　\\implies　\\{x_k\\} 是 Cauchy 列$$',
        '',
        '**④** 由列紧它有子列收敛到某点 x ∈ X；Cauchy 列一旦有收敛子列就整体收敛，故 xₖ → x。',
        '',
        '**⑤ 收尾。** x 落在某个 U ∈ 𝒰 中。U 开，故存在 r > 0 使 B(x, r) ⊆ U。取 k 充分大，使 1/k < r/2 且 d(xₖ, x) < r/2；则对任意 y ∈ Bₖ，',
        '',
        '$$d(y, x) \\le d(y, x_k) + d(x_k, x) < 1/k + r/2 < r$$',
        '',
        '即 Bₖ ⊆ B(x, r) ⊆ U。于是 Bₖ 被 𝒰 的**一个**成员盖住了，与「Bₖ 是坏球」矛盾。',
        '',
        '故 𝒰 必有有限子覆盖，X 紧。∎'
      ].join('\n'),
      note: '「坏球」这一招的直觉是：让一串被架空的小球缩到一个极限点，再用极限点的开邻域一口吞掉它。整段只用全有界，没用选择公理。'
    },

    /* ---------------------------------------- 紧 ⟹ 完备 */
    {
      id: 'imp.compact-complete',
      kind: 'implication',
      sources: ['def.compact'],
      target: 'def.complete',
      title: '紧 ⟹ 完备',
      proof: [
        '设 X 紧，{xₙ} 是 X 中的 Cauchy 列。要证它收敛。',
        '',
        '**①** 由「紧 ⟹ 列紧」（见那条箭头），{xₙ} 有收敛子列 x_{nₖ} → x ∈ X。',
        '',
        '**② Cauchy 列只要有收敛子列就整体收敛到同一个极限**：给定 ε > 0，取 N₁ 使 m, n ≥ N₁ 时 d(xₘ, xₙ) < ε/2；取 K 使 nₖ ≥ N₁ 且 d(x_{nₖ}, x) < ε/2 对 k ≥ K 成立。则对 n ≥ N₁，取一个 k ≥ K 使 nₖ ≥ N₁，得',
        '',
        '$$d(x_n, x) \\le d(x_n, x_{n_k}) + d(x_{n_k}, x) < \\varepsilon/2 + \\varepsilon/2 = \\varepsilon$$',
        '',
        '故 xₙ → x ∈ X。所以 X 完备。∎'
      ].join('\n'),
      note: '关键引理：「Cauchy 列 + 有一个收敛子列 ⟹ 收敛」，这在任何度量空间里都对。'
    },

    /* ---------------------------------------- 紧 ⟹ 全有界 */
    {
      id: 'imp.compact-totbdd',
      kind: 'implication',
      sources: ['def.compact'],
      target: 'def.totally-bounded',
      title: '紧 ⟹ 全有界',
      proof: [
        '给定 ε > 0。考虑开球族',
        '',
        '$$𝒰 = \\{ B(x, \\varepsilon) : x \\in X \\}$$',
        '',
        '它显然是 X 的开覆盖（每个 x 都被 B(x, ε) 含住）。由 X 紧，存在有限子覆盖：',
        '',
        '$$X = B(x_1, \\varepsilon) \\cup \\cdots \\cup B(x_n, \\varepsilon)$$',
        '',
        '即 {x₁, …, xₙ} 是一个有限的 ε-网。由 ε > 0 任意，X 全有界。∎',
        '',
        '> 注意这条证明只用了「开球盖住自己」这一点 —— 它说明紧 ⟹ 全有界几乎不需要任何技术。真正难的方向是下一条。'
      ].join('\n')
    },

    /* ---------------------------------------- 完备 + 全有界 ⟹ 列紧 */
    {
      id: 'imp.complete-totbdd-seqcompact',
      kind: 'implication',
      sources: ['def.complete', 'def.totally-bounded'],
      target: 'def.sequentially-compact',
      title: '完备 + 全有界 ⟹ 列紧（对角线法）',
      proof: [
        '设 X 完备且全有界，{xₙ} 是 X 中任一序列。要抽出一个收敛子列。',
        '',
        '**① 抽一个「直径越来越小」的子列。** 对 k = 1, 2, 3, … 依次操作：由全有界，X 能被有限个半径 1/k 的球盖住，于是**其中一个球含有当前子列中的无穷多项**（抽屉原理：有限个球盖住无穷多项，必有一个球含无穷多项）。把子列限制到这个球里。',
        '',
        '这样得到一串子列',
        '',
        '$$\\{x_n\\} \\supseteq \\{x^{(1)}_n\\} \\supseteq \\{x^{(2)}_n\\} \\supseteq \\cdots$$',
        '',
        '其中第 k 个子列的项全部落在某个半径 1/k 的球内，因此它任意两项的距离 < 2/k。',
        '',
        '**② 对角线。** 取 yₖ = x^{(k)}ₖ（第 k 个子列的第 k 项）。则 {yₖ} 是 {xₙ} 的子列；且对 k, l ≥ K，yₖ 与 yₗ 都是第 K 个子列的项（下标 ≥ K 的项都在里面），故',
        '',
        '$$d(y_k, y_l) < 2/K$$',
        '',
        '于是 {yₖ} 是 Cauchy 列。',
        '',
        '**③** 由 X 完备，{yₖ} 收敛。于是 {xₙ} 有收敛子列，X 列紧。∎'
      ].join('\n'),
      note: '① 里「无穷多项落进某一个球」用到抽屉原理（有限情形，不需要选择）。② 的对角线抽取也不需要选择 —— 所有选取都由「取第 k 个子列的第 k 项」唯一确定。'
    },

    /* --------------------------- 定义引用（蓝线） --------------------------- */
    {
      id: 'def-link.compact-theorem',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'thm.metric-compact-equiv',
      note: '「紧的三个等价刻画」的陈述里用到了「紧」的定义。'
    },
    {
      id: 'def-link.seqcompact-theorem',
      kind: 'definition',
      definition: 'def.sequentially-compact',
      usedBy: 'thm.metric-compact-equiv',
      note: '同上，用到了「列紧」。'
    },
    {
      id: 'def-link.complete-theorem',
      kind: 'definition',
      definition: 'def.complete',
      usedBy: 'thm.metric-compact-equiv',
      note: '同上，用到了「完备」。'
    },
    {
      id: 'def-link.totbdd-theorem',
      kind: 'definition',
      definition: 'def.totally-bounded',
      usedBy: 'thm.metric-compact-equiv',
      note: '同上，用到了「全有界」。'
    },
    {
      id: 'def-link.compact-closed',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'prop.compact-subset-closed',
      note: '命题「紧子集是闭的」用到了紧的定义。'
    },
    {
      id: 'def-link.compact-subset-equiv',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'prop.subset-compact-equiv',
      note: '子集的紧性刻画用到了紧的定义。'
    },
    {
      id: 'def-link.totbdd-subset-equiv',
      kind: 'definition',
      definition: 'def.totally-bounded',
      usedBy: 'prop.subset-compact-equiv',
      note: '同上，用到了全有界。'
    },
    {
      id: 'def-link.complete-subset-equiv',
      kind: 'definition',
      definition: 'def.complete',
      usedBy: 'prop.subset-compact-equiv',
      note: '⚠ 这条命题的**前提**就是「X 完备」，所以它引用完备的定义。'
    }
  ]
});
