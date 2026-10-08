/* ==========================================================================
   内容包 · 紧生成空间与弱 Hausdorff 空间（18 条）
   --------------------------------------------------------------------------
   这一团要造出的东西是：**一个「乘积好用」的拓扑空间范畴**。

   场地是紧 Hausdorff 空间 —— 它们是「足够小、足够正常」的测试空间。
   一个空间若被从它们进来的连续映射完全决定，就叫紧生成（$k$-空间）。
   这一步（$k$-化）是**余反射**：把所有「测试不够」的坏空间照原样换掉，
   于是乘积不再出问题。再加一条弱 Hausdorff 条件，就得到
   $\mathrm{CGWH}$ —— 现代代数拓扑默认待的那间屋子。

   对照着记：$\mathbf{CHaus}$ 是 $\mathbf{Top}$ 的**反射**子范畴（往紧里收），
   $k\mathbf{Top}$ 是**余反射**的（往外放）。方向正好相反。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '紧生成空间与弱 Hausdorff 空间',
  nodes: [

    /* ------------------------------------------------------ 定义与例子 */
    {
      id: 'def.compactly-generated',
      cluster: 'topo.cg',
      type: 'definition',
      label: '紧生成空间',
      title: '紧生成空间 / $k$-空间（Compactly Generated Space）',
      regions: ['topology'],
      tags: ['拓扑', '紧生成', 'k-空间', 'k-拓扑'],
      statement: [
        '拓扑空间 $X$ 叫**紧生成的**（也叫 **$k$-空间**），如果它是紧 Hausdorff 空间的余极限。',
        '',
        '等价地：$X$ 的拓扑由「从紧 Hausdorff 空间进来的连续映射」完全决定 —— $Y \\subseteq X$ 是开（闭）集 $\\iff$ 对每个紧 Hausdorff 空间 $S$ 与每个连续映射 $f : S \\to X$，$f^{-1}(Y)$ 在 $S$ 中开（闭）。'
      ].join('\n'),
      notes: [
        '「由从紧 Hausdorff 空间进来的映射决定拓扑」的意思是：**只要一个子集在所有这类映射下的原像都开，它就是开的**。',
        '一般拓扑空间不满足这一条 —— 于是紧生成性把那些「测试不够」的空间排除在外，留下的那批在做乘积、函数空间时行为良好。',
        '这是**余反射**的入口：$k$-化（见「$k$-开、$k$-闭与 $k$-拓扑」）把任何空间改造成紧生成的，而且改造前后到别的紧生成空间之间的映射一一对应。'
      ].join('\n\n')
    },

    {
      id: 'ex.cg-examples',
      cluster: 'topo.cg',
      type: 'example',
      label: '紧生成空间的例子',
      title: '哪些空间是紧生成的',
      regions: ['topology'],
      tags: ['拓扑', '紧生成', '例子', '局部紧'],
      statement: [
        '**例 1**　局部紧 Hausdorff 空间是紧生成的。',
        '**例 2**　序列空间是紧生成的：$A \\subseteq X$ 闭 $\\iff$ 只要 $x_{n} \\to x$ 且 $x_{n} \\in A$，就有 $x \\in A$。',
        '**例 3**　若 $I$ **不可数**，则 $\\mathbb{R}^{I}$ 与 $\\mathbb{Z}^{I}$（积拓扑）都**不是**紧生成的。'
      ].join('\n'),
      notes: [
        '**例 1** 是最常用的一条：紧 Hausdorff 空间自己当然紧生成（它本身就是自己的那条余极限）；一般局部紧 Hausdorff 空间由「取紧邻域」这一类映射决定拓扑。',
        '**例 3** 是反面教材 —— 它正是「乘积不好用」的根源：$\\mathbb{R}^{I}$ 太细，细到没有足够的紧 Hausdorff 空间能测出它的拓扑。$k$-化会把它换成拓扑更粗的 $k(\\mathbb{R}^{I})$，那个才好用。'
      ].join('\n\n')
    },

    /* -------------------------------------------------- 等价刻画 */
    {
      id: 'prop.cg-equivalent-conditions',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '紧生成空间的等价刻画',
      title: '紧生成性的六条等价说法',
      regions: ['topology'],
      tags: ['拓扑', '紧生成', '等价刻画'],
      statement: [
        '下面六条等价：',
        '',
        [
          '1. $X$ 是紧生成的；',
          '2. $X$ 是「紧 $T_{1}$ 空间的不交并」的商空间；',
          '3. $X$ 是「局部紧 $T_{1}$ 空间」的商空间；',
          '4. $Y \\subseteq X$ 开 $\\iff$ 对每个从紧 $T_{1}$ 空间出发的连续 $f : S \\to X$，$f^{-1}(Y)$ 开；',
          '5. $X \\to Y$ 连续 $\\iff$ 对每个连续 $f : S \\to X$，复合 $S \\to X \\to Y$ 连续；',
          '6. $X$ 是所有连续映射 $S \\to X$（$S$ 紧 $T_{1}$）的余极限。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '**证明的走法。** (1) $\\iff$ (6) 是定义换一种说法：余极限就是「由全体映射决定」。',
        '',
        [
          '- (6) $\\implies$ (2)：取 $Y = \\coprod_{S \\to X} S$（沿所有连续映射 $S \\to X$，$S$ 紧 $T_{1}$）。全体映射拼出 $Y \\to X$，它显然满 —— **满的连续映射就是商映射**。',
          '- (2) $\\implies$ (3)：紧 $T_{1}$ 空间本身局部紧。',
          '- (3) $\\implies$ (1)：商映射 $Z \\twoheadrightarrow X$（$Z$ 局部紧 $T_{1}$）把 $Z$ 的紧生成性传下去 —— 商是余极限，而余极限的余极限还是余极限。',
          '- (4) $\\iff$ (1)：这是「由映射决定拓扑」的逐字翻译：用 $S$ 是紧空间这一条，把 $f^{-1}(Y)$ 的开性从 $f(S)$ 拉回到 $S$ 上。',
          '- (5) $\\iff$ (4)：把「$X \\to Y$ 连续」按定义展开成「开集的原像开」，再用 (4) 换成紧 $T_{1}$ 空间上的检验。'
        ].join('\n'),
        '⚠️ **测试空间的取法要留意。** 定义那一条用的是**紧 Hausdorff**空间，而这里 (2)(3)(4)(6) 用的是**紧 $T_{1}$**空间。两个测试族是否给出同一个 $k$-化，取决于「从紧 $T_{1}$ 空间出发的连续映射能否换成从紧 Hausdorff 空间出发的」—— **这一点待核对**；用的时候务必先把手头的测试族固定下来。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ k-拓扑 */
    {
      id: 'def.k-topology',
      cluster: 'topo.cg',
      type: 'definition',
      label: 'k-开、k-闭与 k-拓扑',
      title: '$k$-开集与 $k$-化（$k$-Topology）',
      regions: ['topology'],
      tags: ['拓扑', 'k-拓扑', 'k-开', 'k-化'],
      statement: [
        '子集 $Y \\subseteq X$ 叫 **$k$-开**（**$k$-闭**）的，如果对每个连续映射 $f : S \\to X$（$S$ 紧 Hausdorff），$f^{-1}(Y)$ 在 $S$ 中开（闭）。',
        '',
        '全体 $k$-开集构成的拓扑叫 $X$ 上的 **$k$-拓扑**；记 $kX$ 为「同一个集合、拓扑换成 $k$-拓扑」的那个空间。'
      ].join('\n'),
      notes: [
        '$k$-拓扑就是**使所有连续映射 $S \\to X$（$S$ 紧 Hausdorff）都连续的最终（最细）拓扑**。它比原来的拓扑**细** —— 开集变多了（原本开的当然还是 $k$-开的）。',
        '⭐ **紧生成 = 自己就是 $k$-化**：$X$ 紧生成 $\\iff$ $kX = X$（同一个拓扑空间）。所以 $k$ 是一个**幂等**的改造：$k(kX) = kX$。',
        '一般情形下 $kX$ 与 $X$ 之间的恒等映射 $kX \\to X$ 连续（拓扑变细了），但反方向不连续 —— 这个「往下走」的映射正是余反射的余单位 $\\varepsilon_{X}$。'
      ].join('\n\n')
    },

    {
      id: 'prop.ktx-colimit',
      cluster: 'topo.cg',
      type: 'proposition',
      label: 'kX 是紧空间的余极限',
      title: '$kX = \\varinjlim S$',
      regions: ['topology'],
      tags: ['拓扑', 'k-拓扑', '余极限'],
      statement: '对任何拓扑空间 $X$，$kX$ 是全体连续映射 $S \\to X$（$S$ 取遍紧 $T_{1}$ 空间）在 $\\mathbf{Top}$ 中的余极限。'
    },

    /* -------------------------------------------------- 余反射 */
    {
      id: 'prop.cg-coreflective',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '紧生成空间是余反射子范畴',
      title: '紧生成空间是 $\\mathbf{Top}$ 的余反射子范畴',
      regions: ['topology'],
      tags: ['拓扑', '紧生成', '余反射', '伴随'],
      statement: [
        '紧生成空间构成的范畴 $k\\mathbf{Top}$ 是 $\\mathbf{Top}$ 的**余反射子范畴**：含入函子 $i : k\\mathbf{Top} \\hookrightarrow \\mathbf{Top}$ 有**右**伴随',
        '',
        '$$k : \\mathbf{Top} \\longrightarrow k\\mathbf{Top}, \\qquad X \\mapsto kX$$',
        '',
        '即 $i \\dashv k$。$kX$ 与 $X$ 有同一个集合，拓扑换成 $k$-拓扑。'
      ].join('\n'),
      notes: [
        '**要证的是**：对每个紧生成空间 $X$ 与每个拓扑空间 $Y$，',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{Top}}(X,\\ Y) \\;\\cong\\; \\operatorname{Hom}_{k\\mathbf{Top}}\\bigl(X,\\ kY\\bigr).$$',
        '',
        '**证明。** 余单位是 $\\varepsilon_{Y} : kY \\to Y$（恒等映射，拓扑从细到粗，连续）。',
        '',
        [
          '- 先证 $kY$ 确实紧生成：把每个连续映射 $S \\to Y$（$S$ 紧 $T_{1}$）复合 $\\varepsilon_{Y}$ 抬成 $S \\to kY$，再用 $kY$ 的定义（$k$-开集的取法）验证「由这些映射决定拓扑」。',
          '- 于是任意 $f : X \\to Y$ 连续（$X$ 紧生成）时，$f = \\varepsilon_{Y} \\circ f\': X \\to kY$ 给出一个到 $kY$ 的连续映射 $f\'$：设 $U \\subseteq kY$ 开，要证 $f\'^{-1}(U)$ 在 $X$ 中开。由 $X$ 紧生成，只需对每个紧 $L \\subseteq X$ 验证 $f\'^{-1}(U) \\cap L$ 在 $L$ 中开。而 $f|_{L} : L \\to Y$ 连续、$L$ 紧，故 $f(L)$ 紧；$U \\cap f(L)$ 在 $f(L)$ 中开，于是 $(f|_{L})^{-1}\\bigl(U \\cap f(L)\\bigr) = f\'^{-1}(U) \\cap L$ 在 $L$ 中开。∎',
          '- 反向由 $\\varepsilon_{Y}$ 连续直接得到。这样两个方向互逆，就是那个同构。'
        ].join('\n'),
        '⭐ 与紧 Hausdorff 对照着记：$\\mathbf{CHaus}$ 是 $\\mathbf{Top}$ 的**反射**子范畴（含入函子有**左**伴随 $\\beta$），而 $k\\mathbf{Top}$ 是**余反射**的（含入函子有**右**伴随 $k$）。一个把空间「收紧」，一个把空间「松开」—— 所以前者对极限封闭，后者对**余极限**封闭。'
      ].join('\n\n')
    },

    /* -------------------------------------------------- 商映射与积 */
    {
      id: 'thm.quotient-product',
      cluster: 'topo.cg',
      type: 'theorem',
      label: '商映射与局部紧空间作积',
      title: '商映射与局部紧因子作积仍是商映射',
      regions: ['topology'],
      tags: ['拓扑', '商映射', '局部紧', '乘积'],
      statement: [
        '设 $q : X \\to Y$ 是**商映射**，$Z$ 是**局部紧 Hausdorff** 空间。则',
        '',
        '$$q \\times \\mathrm{id}_{Z} : X \\times Z \\longrightarrow Y \\times Z$$',
        '',
        '也是商映射。'
      ].join('\n'),
      notes: [
        '⭐ **这是「紧生成空间对积封闭」那条的引擎**，也是搜「商映射」「局部紧」时该落到的地方。',
        '**证明的走法（逆映射连续法）。** 记 $W := (q \\times \\mathrm{id}_{Z})^{-1}(U)$，要证 $W$ 开。取一点 $(x, z) \\in W$，记 $y = q(x)$。因为 $U$ 在 $Y \\times Z$ 中开，可以挑出基本开集',
        '',
        '$$V \\times K \\;\\subseteq\\; U, \\qquad y \\in V,\\;\\; z \\in K,$$',
        '',
        '其中 $V$ 开、$K$ 是 $z$ 的**紧邻域**（局部紧 Hausdorff $\\implies$ 每点有紧邻域基，可以要求 $K$ 落在任意给定的邻域里）。由 $q$ 是商映射，$q^{-1}(V)$ 是 $X$ 中的开集，于是',
        '',
        '$$q^{-1}(V) \\times K \\;\\subseteq\\; W$$',
        '',
        '是 $(x, z)$ 的一个开邻域 —— 所以 $(x, z)$ 是 $W$ 的内点，$W$ 开。∎',
        '⚠️ **局部紧这个条件不能省。** 一般情形下「商映射乘 id」不是商映射：取 $q$ 是某条坏商、$Z$ 是一个既不局部紧又不紧生成的空间，乘积的商拓扑会严格细于商空间应有的拓扑。',
        '记法：有的书上把这条写成「$Z$ 局部紧 Hausdorff $\\implies$ 函子 $- \\times Z$ 保商映射」。'
      ].join('\n\n')
    },

    {
      id: 'cor.cg-product',
      cluster: 'topo.cg',
      type: 'corollary',
      label: '紧生成空间对积封闭',
      title: '紧生成空间作积仍紧生成',
      regions: ['topology'],
      tags: ['拓扑', '紧生成', '乘积'],
      statement: '若 $X$ 紧生成、$Y$ 局部紧 Hausdorff，则 $X \\times Y$ 紧生成。'
    },

    {
      id: 'prop.k-product',
      cluster: 'topo.cg',
      type: 'proposition',
      label: 'k-化与积',
      title: '$k(kX \\times Y) = k(X \\times Y)$',
      regions: ['topology'],
      tags: ['拓扑', 'k-拓扑', '乘积', 'k-化'],
      statement: [
        '对任何 $X, Y \\in \\mathbf{Top}$，',
        '',
        '$$k(kX \\times Y) \\;=\\; k(X \\times Y).$$',
        '',
        '若 $Y$ 还**局部紧 Hausdorff**，则更强：',
        '',
        '$$kX \\times Y \\;=\\; k(X \\times Y).$$'
      ].join('\n'),
      notes: '两式的差别正好是余反射子范畴的两个层次：一般情形下 $k$ 不是「积封闭」的，得对积再取一次 $k$；$Y$ 局部紧 Hausdorff 时（由商映射与积那条定理）$k$ 与「乘 $Y$」可交换。**这就是为什么 $k\\mathbf{Top}$ 里的乘积得取 $k(X \\times Y)$ 而不是 $X \\times Y$。**'
    },

    /* -------------------------------------------------- 紧开拓扑 */
    {
      id: 'def.compact-open-topology',
      cluster: 'topo.cg',
      type: 'definition',
      label: '紧开拓扑',
      title: '紧开拓扑（Compact-Open Topology）',
      regions: ['topology'],
      tags: ['拓扑', '紧开拓扑', '函数空间'],
      statement: [
        '设 $X, Y \\in \\mathbf{Top}$。对每个连续映射 $g : S \\to X$（$S$ 紧 Hausdorff）与每个开集 $V \\subseteq Y$，令',
        '',
        '$$W_{S,V} := \\{\\, f : X \\to Y \\;\\mid\\; \\operatorname{Im}(f \\circ g) \\subseteq V \\,\\}.$$',
        '',
        '$C(X, Y)$（也就是 $\\operatorname{Hom}_{\\mathbf{Top}}(X, Y)$）上的**紧开拓扑**是由全体 $W_{S,V}$ 生成的拓扑。'
      ].join('\n'),
      notes: [
        '读法：$W_{S,V}$ 是「在所有从头进来的紧块上都落在 $V$ 里」的那些映射。$g$ 通过 $S$ 这个「测试块」把 $X$ 的局部控制住。',
        '⭐ 这一条让 $\\operatorname{Hom}(X,Y)$ 本身成为一个拓扑空间 —— 于是可以谈「映射空间」，才可以谈同伦、道路空间、环路空间。在 $\\mathrm{CGWH}$ 里它才真正好用（见「函数空间弱 Hausdorff」那条）。'
      ].join('\n\n')
    },

    {
      id: 'prop.compact-open-discrete',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '离散时函数空间是积',
      title: '离散 $X$ 时 $C(X,Y) \\cong Y^{X}$',
      regions: ['topology'],
      tags: ['拓扑', '紧开拓扑', '积拓扑'],
      statement: '若 $X$ 是**离散**空间，则 $C(X, Y) \\cong Y^{X}$（右边取**积拓扑**）。'
    },

    /* -------------------------------------------------- 弱 Hausdorff */
    {
      id: 'def.weak-hausdorff',
      cluster: 'topo.cg',
      type: 'definition',
      label: '弱 Hausdorff 空间',
      title: '弱 Hausdorff 空间（Weak Hausdorff Space）',
      regions: ['topology'],
      tags: ['拓扑', '弱 Hausdorff', 'CGWH'],
      statement: '拓扑空间 $X$ 叫**弱 Hausdorff** 的，如果对每个连续映射 $f : S \\to X$（$S$ 紧 Hausdorff），像 $f(S)$ 都在 $X$ 中**闭**。'
    },

    {
      id: 'prop.weak-hausdorff-basic',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '弱 Hausdorff 的基本性质',
      title: '弱 Hausdorff 的几条基本性质',
      regions: ['topology'],
      tags: ['拓扑', '弱 Hausdorff', '对角'],
      statement: [
        '设 $X$ 弱 Hausdorff。则',
        '',
        [
          '- $X$ 的每个紧 Hausdorff 子空间都闭；',
          '- $X$ 是 $T_{1}$ 的（单点是紧 Hausdorff 子空间）；',
          '- 对每个连续 $f : S \\to X$（$S$ 紧 Hausdorff），$f(S)$ 是**紧 Hausdorff** 的；',
          '- **对角** $\\Delta_{X} \\subseteq X \\times X$ 是 $k$-闭的；反过来，若 $X$ 紧生成，则对角 $k$-闭 $\\implies$ $X$ 弱 Hausdorff；',
          '- 若还有 $Y$ 弱 Hausdorff、$f, g : X \\rightrightarrows Y$ 连续，则 $\\ker(f, g) = \\{\\, x : f(x) = g(x) \\,\\} \\subseteq X$ 是 $k$-闭的。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '**为什么叫「弱」Hausdorff。** Hausdorff 要求任意两点的开邻域能分开；弱 Hausdorff 只要求「紧块的像是闭的」—— 条件弱得多，却正好够用：出现在 $\\mathrm{CGWH}$ 里的那些构造（商、函数空间、纤维积）都不需要全 Hausdorff。',
        '⚠️ 弱 Hausdorff **不蕴含** Hausdorff（存在紧生成的弱 Hausdorff 而非 Hausdorff 的空间）；但它蕴含 $T_{1}$，上面第二条就是。',
        '**对角那条的作用**：$\\Delta_{X}$ $k$-闭 $\\iff$ 「两个映射相等的点集」是 $k$-闭的 —— 这与 $T_{1}$、$T_{2}$ 在一般拓扑里的刻画（对角闭）平行，只是这里闭的判据换成了 $k$-闭。紧生成是让这个等价反过来的补充条件。'
      ].join('\n\n')
    },

    {
      id: 'prop.cgwh-fiber-product',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '紧块的纤维积还是紧的',
      title: '紧 Hausdorff 沿弱 Hausdorff 的纤维积',
      regions: ['topology'],
      tags: ['拓扑', '弱 Hausdorff', '纤维积', '紧'],
      statement: '若 $S, S\'$ 是紧 Hausdorff 空间、$X$ 弱 Hausdorff，且给定了连续映射 $S \\to X$、$S\' \\to X$，则纤维积 $S \\times_{X} S\'$ 紧 Hausdorff。'
    },

    {
      id: 'prop.cg-kclosed-quotient',
      cluster: 'topo.cg',
      type: 'proposition',
      label: 'k-闭等价关系与弱 Hausdorff 商',
      title: '$R$ 是 $k$-闭 $\\iff$ $X/R$ 弱 Hausdorff',
      regions: ['topology'],
      tags: ['拓扑', '弱 Hausdorff', '商空间', '等价关系'],
      statement: '设 $X$ 紧生成，$R$ 是 $X$ 上的等价关系（看作 $R \\subseteq X \\times X$）。则 $R$ 是 $k$-闭的 $\\iff$ 商空间 $X/R$ 弱 Hausdorff。'
    },

    {
      id: 'thm.cgwh-reflective',
      cluster: 'topo.cg',
      type: 'theorem',
      label: 'CGWH 是 CG 的反射子范畴',
      title: '紧生成的弱 Hausdorff 空间是反射子范畴',
      regions: ['topology'],
      tags: ['拓扑', 'CGWH', '反射', '商'],
      statement: [
        '紧生成的**弱 Hausdorff** 空间构成的范畴 $\\mathrm{CGWH}$ 是 $\\mathrm{CG}$（紧生成空间）的**反射**子范畴。',
        '',
        '反射是',
        '',
        '$$h : X \\longmapsto X/R,$$',
        '',
        '其中 $R$ 是 $X$ 上**最小的闭等价关系**。'
      ].join('\n'),
      notes: [
        '**为什么取「最小的闭等价关系」。** 要让商 $X/R$ 弱 Hausdorff，$R$ 得是 $k$-闭的（上一条）；而要商掉得尽量少、好让反射是「最经济」的改造，就取最小的那个闭等价关系。（$R \\mapsto X/R$ 把关系越大商越小，方向别弄反。）',
        '⭐ 这一条给出「怎么把一个空间修好」的完整链条：$X \\rightsquigarrow kX$（先 $k$-化，变成 $\\mathrm{CG}$）$\\rightsquigarrow kX/R$（再商掉最小闭等价关系，变成 $\\mathrm{CGWH}$）。两步都是**函子性**的，所以 $\\mathrm{CGWH}$ 里的同构、极限、余极限都能从 $\\mathbf{Top}$ 里搬过来。',
        '⭐ 这就是为什么现代代数拓扑默认在 $\\mathrm{CGWH}$ 里做事：$\\mathrm{CGWH}$ 对**有限积**封闭、函数空间 $kC(X,Y)$ 还在里面、且是笛卡尔闭的 —— 而 $\\mathbf{Top}$ 一个都不满足。'
      ].join('\n\n')
    },

    {
      id: 'prop.cgwh-closed',
      cluster: 'topo.cg',
      type: 'proposition',
      label: 'CGWH 的开闭子空间与滤过余极限',
      title: '$\\mathrm{CGWH}$ 的封闭性',
      regions: ['topology'],
      tags: ['拓扑', 'CGWH', '子空间', '余极限'],
      statement: [
        '1. 紧生成的弱 Hausdorff 空间的**开子空间**与**闭子空间**仍紧生成且弱 Hausdorff。',
        '2. 若 $X = \\varinjlim X_{i}$ 是紧生成的弱 Hausdorff 空间沿**闭含入**的**滤过**余极限，则 $X$ 也紧生成的弱 Hausdorff，并且每个 $X_{i}$ 都在 $X$ 中闭。'
      ].join('\n'),
      notes: '第 2 条正是凝聚态数学里反复要用的那一条：把「由有限块拼起来的对象」按滤过余极限拼大，$\\mathrm{CGWH}$ 的性质不会掉。'
    },

    {
      id: 'prop.cg-function-space',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '函数空间弱 Hausdorff',
      title: '$Y$ 弱 Hausdorff $\\implies$ $kC(X,Y)$ 弱 Hausdorff',
      regions: ['topology'],
      tags: ['拓扑', '弱 Hausdorff', '紧开拓扑', '函数空间'],
      statement: '若 $Y$ 弱 Hausdorff，则 $kC(X, Y)$（紧开拓扑再取 $k$-化）也弱 Hausdorff。'
    },

    {
      id: 'prop.cg-cartesian-closed',
      cluster: 'topo.cg',
      type: 'theorem',
      label: '紧生成空间是笛卡尔闭的',
      title: '紧生成空间是笛卡尔闭范畴',
      regions: ['topology'],
      tags: ['拓扑', '紧生成', '笛卡尔闭', '指数对象', 'currying'],
      statement: [
        '设 $X, Y, Z$ 是紧生成空间。则存在同胚',
        '',
        '$$kC\\bigl(k(X \\times Y),\\ kZ\\bigr) \\;\\cong\\; kC\\bigl(kX,\\ kC(kY, kZ)\\bigr).$$',
        '',
        '等价的说法是 $k\\mathbf{Top}$ 里成立 **currying**：',
        '',
        '$$C\\bigl(k(X \\times Y),\\ Z\\bigr) \\;\\cong\\; C\\bigl(X,\\ C(Y, Z)\\bigr).$$'
      ].join('\n'),
      notes: [
        '⭐ **这就是这一团要造的那个「能用的东西」**：$k\\mathbf{Top}$ 里**有函数空间、而且函数空间还在范畴里**，于是「映射空间」「同伦」这些构造可以完全在 $k\\mathbf{Top}$ 内部做完。$\\mathbf{Top}$ 本身做不到这件事。',
        '**证明的走法。** 先对紧生成空间手工验证集合层面的双射',
        '',
        '$$C\\bigl(k(X \\times Y),\\ Z\\bigr) \\;\\cong\\; C\\bigl(X,\\ C(Y, Z)\\bigr),$$',
        '',
        '再用米田引理把「$kC$ 上的同胚」化归成「对每个紧生成测试空间 $T$ 的映射集相等」：',
        '',
        '$$C\\bigl(T,\\ kC(k(X\\times Y), kZ)\\bigr) \\cong C\\bigl(k(T\\times X\\times Y),\\ Z\\bigr) \\cong C\\bigl(T,\\ kC(kX, kC(kY,kZ))\\bigr).$$',
        '',
        '两次都只用到积的结合性与 $k$-化的函子性 —— 这也是为什么必须**先取 $k$-化**：不取的话右边那个 $C(Y,Z)$ 未必紧生成。',
        '⚠️ 一个容易踩的点：$C(kX, kY) = C(kX, Y)$ 作为**集合**相等，但一般**不是同胚**，哪怕换成 $k$-拓扑也一样。'
      ].join('\n\n')
    },

    {
      id: 'cor.cg-exponential-adjoint',
      cluster: 'topo.cg',
      type: 'corollary',
      label: 'CG 的指数伴随',
      title: '$X \\mapsto k(X \\times Y) \\;\\dashv\\; Z \\mapsto kC(kY, Z)$',
      regions: ['topology'],
      tags: ['拓扑', '紧生成', '伴随', '指数对象', '余极限万有'],
      statement: [
        '在紧生成空间范畴上，函子',
        '',
        '$$X \\longmapsto k(X \\times Y) \\qquad \\text{左伴随于} \\qquad Z \\longmapsto kC(kY, Z).$$',
        '',
        '也就是说 $kC(kY, -)$ 是「乘 $Y$」的**右伴随**（$k(Y \\times -)$ 叫**指数对象** $Z^{Y}$）。'
      ].join('\n'),
      notes: [
        '**两个立刻的推论**：左伴随**保余极限**，所以 $X \\mapsto k(X \\times Y)$ 保紧生成空间的余极限；右伴随**保极限**，所以 $Z \\mapsto kC(kY,Z)$ 保极限。',
        '⭐ **余极限在 $k\\mathbf{Top}$ 里是万有的。** 因为「乘 $Y$」有右伴随，它与余极限交换，这正是余极限万有（把余极限沿任意态射拉回还是余极限）的条件。**这一点在 $\\mathbf{Top}$ 里不成立** —— 也是「非要在 $k\\mathbf{Top}$ 里做事」的又一条理由。'
      ].join('\n\n')
    }
  ],

  edges: []
});
