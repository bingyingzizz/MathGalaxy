/* ==========================================================================
   内容包 · 层上同调与拓扑斯的态射（11 条）
   --------------------------------------------------------------------------
    §7.3 + §7.4。这一团造出的东西是：**把 §7.2 那台机器开到层上**。

   $H^{n}(X, M) := R^{n}\Gamma(X, M)$ —— 层上同调就是截面函子的右导出函子。
   另一条算法是 **Čech 上同调**（用覆盖直接算）；两条在紧 Hausdorff 上一致。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '层上同调与拓扑斯的态射',
  nodes: [

    {
      id: 'def.sheaf-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: '层上同调',
      title: '层上同调 $H^{n}(X, M^{\\bullet})$',
      regions: ['homology', 'category'],
      tags: ['同调代数', '层上同调', '导出函子', '截面函子'],
      statement: [
        '设 $M^{\\bullet}$ 是 site $\\mathcal{C}$ 上的**阿贝尔层复形**，$X \\in \\mathcal{C}$。它在 $X$ 上的**第 $n$ 个上同调群**是',
        '',
        '$$H^{n}(X, M^{\\bullet}) := R^{n}\\Gamma(X, M^{\\bullet}),$$',
        '',
        '其中 $\\Gamma(X, -)$ 是 $X$ 处的**截面函子**。'
      ].join('\n'),
      notes: [
        '⭐ **一句话**：层上同调就是**截面函子的右导出函子**。$\\Gamma(X,-)$ 左正合但不右正合（层化会捣乱），$R^{n}\\Gamma$ 正是补上断口的那半个。',
        '**为什么需要它**：单看 $H^{0}(X, M) = \\Gamma(X, M) = M(X)$ 只有整体截面；$H^{1}$ 起才开始记录「层粘不上去」的信息（$H^{1}$ 分类层的主丛 / torsor）。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.3.1'],
    },

    {
      id: 'def.cech-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: 'Čech 上同调',
      title: 'Čech 上同调 $\\check{H}^{n}(X, M^{\\bullet})$',
      regions: ['homology', 'category'],
      tags: ['同调代数', 'Čech 上同调', '预层', '覆盖'],
      statement: [
        '设 $M^{\\bullet}$ 是 site $\\mathcal{C}$ 上的**阿贝尔预层复形**，$X \\in \\mathcal{C}$。它的第 $n$ 个 **Čech 上同调群**是',
        '',
        '$$\\check{H}^{n}(X, M^{\\bullet}) := \\Gamma\\bigl(X,\\ \\check{H}^{n}(M^{\\bullet})\\bigr).$$'
      ].join('\n'),
      notes: [
        '**与层上同调的区别**：层上同调要**先取内射消解**（贵）；Čech 上同调**直接用覆盖算**（便宜），代价是它一般只是「逼近」。',
        '**为什么叫 Čech**：它照着 Čech 那套「用开覆盖的交叠来算整体信息」的直觉造出来的 —— 覆盖的每一层交叠给一个群，交叠的包含关系给微分，取同调就是 Čech 上同调。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 7.3.5'],
    },

    {
      id: 'prop.cech-as-colim',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: 'Čech 上同调是沿覆盖筛的余极限',
      title: '$\\check{H}^{n}(X, M) = \\varinjlim_{R \\in J(X)} H^{n}(R, M)$',
      regions: ['homology'],
      tags: ['同调代数', 'Čech 上同调', '覆盖筛', '余极限'],
      statement: '若 $X \\in \\mathcal{C}$、$M$ 是阿贝尔预层，则 $\\check{H}^{n}(X, M) = \\varinjlim_{R \\in J(X)} H^{n}(R, M)$（沿 $X$ 上所有覆盖筛 $R$ 取滤过余极限）。',
      notes: [
        ['**证明。** 两层意思：**(a) 换覆盖不改变 Čech 复形（在筛的意义下）。** 每个覆盖族 $\\mathfrak{X}$ 生成一个筛 $R_{\\mathfrak{X}}$，而 $\\check{C}^{\\bullet}(\\mathfrak{X}, M) \\to \\check{C}^{\\bullet}(R_{\\mathfrak{X}}, M)$ 是同构 —— 筛版的 Čech 复形本来就是「把 $\\mathfrak{X}$ 的交叠一字排开」，细化只是把重复的项并掉。于是「沿覆盖取余极限」与「沿筛取余极限」是同一个余极限（覆盖在筛里是共尾的）。',
          '**(b) 余极限与取同调交换。** $J(X)$ 这个偏序集是**滤过**的：任意两个筛 $R, R\'$ 都有上界（取它们生成的筛，或直接取交），任意两个 $R \\subseteq R\'\\subseteq R$ 之间的态射被夹成同一个。而 $\\varinjlim$ 在 $\\mathrm{Ab}$ 里**正合**（AB5），所以',
          '$$\\varinjlim_{R \\in J(X)} H^{n}(R, M) = H^{n}\\Bigl(\\varinjlim_{R \\in J(X)} \\check{C}^{\\bullet}(R, M)\\Bigr),$$',
          '而右边括号里那个余极限复形与按覆盖定义的 $\\check{C}^{\\bullet}(X, M)$ 逐项一致（(a) 说的就是「每个覆盖都已经被某个筛表示」）。两边一比即得。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 7.46']
    },

    {
      id: 'thm.cartan-leray',
      cluster: 'hom.sheafcoh',
      type: 'theorem',
      label: 'Cartan–Leray 谱序列',
      title: 'Cartan–Leray：Čech 到层上同调的谱序列',
      regions: ['homology'],
      tags: ['同调代数', 'Cartan', 'Leray', '谱序列', 'Čech'],
      statement: [
        '若 $\\mathfrak{X}$ 是 $X$ 的一个**覆盖**、$M$ 是阿贝尔层，则存在谱序列',
        '',
        '$$E^{p,q}_{2} := \\check{H}^{p}\\bigl(\\mathfrak{X},\\ H^{q}(M)\\bigr) \\;\\Longrightarrow\\; H^{p+q}(X, M).$$'
      ].join('\n'),
      notes: [
        '⭐ **它说的是**：Čech 上同调（右边那个 $\\check{H}^{p}$）用 $H^{q}(M)$ 当系数，收敛到**真正的**层上同调。于是「便宜的算法」怎么逼近「贵的算法」这件事被讲清楚了。',
        '**推论**（Cor 7.3.7）：若覆盖的每一层上 $H^{q} = 0$（$q \\ne 0$），则 $\\check{H}^{n} \\cong H^{n}$ —— 此时 Čech 直接给出层上同调。',
        '**证明走法**：取 $\\mathfrak{X}$ 生成的筛 $R$，则 $\\Gamma(\\mathfrak{X}, M) = \\Gamma(R, \\mathcal{H}(M))$；$\\mathcal{H}$ 保内射，于是由 Grothendieck 谱序列 + 上一条得到。',
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 7.3.6'],
    },

    {
      id: 'def.acyclic-sheaf',
      cluster: 'hom.sheafcoh',
      type: 'definition',
      label: '无环层',
      title: '无环层（Acyclic Sheaf）',
      regions: ['homology'],
      tags: ['同调代数', '无环层', '层上同调'],
      statement: 'site $\\mathcal{C}$ 上的阿贝尔层 $M$ 叫**无环的**，如果 $H^{n}(M) = 0$ 对一切 $n \\ne 0$。',
      notes: '⚠️ 专门提醒：**这个定义依赖 site $\\mathcal{C}$，不只是依赖拓扑斯 $\\widetilde{\\mathcal{C}}$** —— 换个 site（同一拓扑斯）无环性可能变。这一点和「层的概念只依赖拓扑斯」形成对比。\n\n📌  **Definition 7.3.9**。'
    },

    {
      id: 'prop.acyclic-iff-cech',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '无环 ⟺ Čech 上同调为零',
      title: '$M$ 无环 $\\iff \\check{H}^{n}(M) = 0$（$n \\ne 0$）',
      regions: ['homology'],
      tags: ['同调代数', '无环层', 'Čech 上同调'],
      statement: '$\\mathcal{C}$ 上的阿贝尔层 $M$ **无环** $\\iff \\check{H}^{n}(M) = 0$ 对一切 $n \\ne 0$。',
      notes: [
        ['**证明。** 关键的中间物是**预层的谱序列**（由「Čech 到上同调」那条沿覆盖取余极限、再用滤过余极限正合得到）',
          '$$E^{p,q}_{2} := \\check{H}^{p}\\bigl(H^{q}(M)\\bigr) \\;\\Longrightarrow\\; H^{p+q}(M).$$',
          '- **$\\implies$ 方向**：若 $M$ 无环，则 $H^{q}(M) = 0$（$q \\ne 0$），第一页只剩 $q = 0$ 那一行，谱序列立刻退化，给出 $\\check{H}^{n}(M) = 0$（$n \\ne 0$）。',
          '- **$\\Longleftarrow$ 方向**：对 $n$ 归纳，证「$0 < p + q \\le n$ 时 $E^{p,q}_{2} = 0$」。设 $0 < q \\le n$：由归纳假设（$H^{q}(M)$ 在更低的总次数上）得 $H^{q}(M) = 0$，于是这一整个 $q$ 行是 $0$；又 $q \\ne 0$ 时 $E^{0,q}_{2} = 0$（$\\check{H}^{0}$ 只看到整体截面），而 $p \\ne 0$ 时 $E^{p,0}_{2} = \\check{H}^{p}(H^{0}(M)) = \\check{H}^{p}(M) = 0$（假设）。所以总次数 $= n$ 的格子全灭，归纳走通。∎'
        ].join('\n'),
        '⭐ **读法**：Čech 上同调**完全**检测无环性 —— 它虽然一般只是「逼近」真上同调，但「逼不逼得零」这件事与真上同调完全一致。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.3.10', 'Le Stum, Corollary 7.3.8']
    },

    {
      id: 'prop.chaus-cech-eq-h',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '紧 Hausdorff 上 Čech 就是上同调',
      title: '紧 Hausdorff：$\\check{H}^{n}(X, M) = H^{n}(X, M)$',
      regions: ['homology', 'topology'],
      tags: ['同调代数', 'Čech 上同调', '紧 Hausdorff', '层上同调'],
      statement: '若 $X$ 是**紧 Hausdorff** 空间，则 $\\check{H}^{n}(X, M) = H^{n}(X, M)$（对一切阿贝尔层 $M$）。',
      notes: [
        ['**证明思路（经典的比较论证）。** 两边都是 $\\Gamma(X, -)$ 的导出函子，差别只在「用哪种消解去算」。要证的其实是一件事：',
          '**紧 Hausdorff 空间的开覆盖的 Čech 项是 $\\Gamma(X, -)$-零调的。** 具体地，覆盖 $\\mathfrak{X} = (X_{i})_{i}$ 的 Čech 复形每一项是 $\\prod_{i} M(X_{i})$ 型的「有限多个可表对象上的取值」（紧性保证可以只取**有限**覆盖 —— 有限细化在覆盖的滤过系统里是共尾的），而这类对象正是「有截面 $\\implies$ 零调」那一套（$\\mathbb{Z}\\cdot h_{X}$ 投射，见「有截面的态射给出零调」）适用的形状。',
          '于是 Cartan–Leray 谱序列 $E^{p,q}_{2} = \\check{H}^{p}(\\mathfrak{X}, H^{q}(M)) \\implies H^{p+q}(X, M)$ 里 $q > 0$ 的整行消失，退化给出 $\\check{H}^{n}(X, M) \\cong H^{n}(X, M)$；再沿覆盖取余极限（上一条）即得对所有覆盖成立的结论。∎'
        ].join('\n'),
        '⚠️ 「紧」在这里的用处有两处：让**有限**覆盖在滤过系统里共尾，以及让每个有限覆盖的高阶 Čech 项被零调性吃掉。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.3.11（原书标为 classic）', 'Godement, Topologie algébrique et théorie des faisceaux, II.5']
    },

    {
      id: 'prop.filtered-limit-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '滤过极限的上同调',
      title: '紧 Hausdorff 的滤过极限上，常值系数的上同调是余极限',
      regions: ['homology', 'topology'],
      tags: ['同调代数', '滤过极限', '常值系数', '上同调'],
      statement: '若 $X = \\varprojlim_{i \\in I} X_{i}$ 是紧 Hausdorff 空间的**滤过极限**（过渡映射满）、$M$ 是**常值**阿贝尔群，则',
      notes: [
        '$$H^{n}(X, M) = \\varinjlim_{i \\in I} H^{n}(X_{i}, M).$$',
        '⚠️ 注意方向：**极限** $X = \\varprojlim X_{i}$ 在拓扑这一侧，而它上面的**上同调**却成了**余极限** —— 上同调把方向翻过来。这条是「用越来越精细的有限块逼近整体，再取上同调」的合法性来源。',
        ['**证明（走 Čech）。** 设 $\\pi_{i} : X \\to X_{i}$ 是投影。两件事：',
          '1. **$X$ 的覆盖有「从某个 $X_{i}$ 拉回来」的细化。** $X$ 落在乘积 $\\prod_{i} X_{i}$ 里，而一个开覆盖的每个成员只约束**有限多个**坐标（乘积拓扑的定义），紧性再把「有限多个」压成「有限个覆盖成员」；于是这个覆盖被某个 $\\pi_{i}^{-1}(\\mathfrak{X})$ 细化，$\\mathfrak{X}$ 是某个 $X_{i}$ 的覆盖。',
          '2. **$M$ 常值 $\\implies$ Čech 复形沿 $\\pi_{i}$ 拉回不变。** 常值系数的交叠项只依赖「有几块、怎么叠」，与具体开集无关，所以 $\\check{C}^{\\bullet}(\\pi_{i}^{-1}(\\mathfrak{X}), M) = \\check{C}^{\\bullet}(\\mathfrak{X}, M)$，取同调得 $\\check{H}^{n}(\\pi_{i}^{-1}(\\mathfrak{X}), M) = \\check{H}^{n}(\\mathfrak{X}, M)$。',
          '把 1、2 合起来：$\\{\\check{H}^{n}(\\pi_{i}^{-1}(\\mathfrak{X}), M)\\}$ 这个沿 $i$ 的系统与 $\\{\\check{H}^{n}(\\mathfrak{X}, M)\\}_{\\mathfrak{X} \\in \\mathrm{Cov}(X_{i})}$ 共尾，而 Čech 上同调是沿覆盖的滤过余极限，于是 $\\check{H}^{n}(X, M) = \\varinjlim_{i} \\check{H}^{n}(X_{i}, M)$。',
          '最后两端各用一次「紧 Hausdorff 上 Čech = 层上同调」，得到要证的等式。∎'
        ].join('\n'),
        '⭐ **用途**：把一个大（可能是无穷维、非紧）对象的上同调，降维成一族紧 Hausdorff 块上同调的滤过余极限。这类「先逐块算、再取余极限」的手法在 §8.3 的 Breen–Deligne 谱序列里反复出现。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.3.12']
    },

    {
      id: 'prop.stone-acyclic',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: 'Stone 空间上的上同调为零',
      title: 'Stone 空间：$H^{n}(S, M) = 0$（$n \\ne 0$）',
      regions: ['homology', 'topology'],
      tags: ['同调代数', 'Stone 空间', '无环', 'Čech'],
      statement: '若 $S$ 是 **Stone** 空间（= 紧 Hausdorff 完全不连通空间），则对任何阿贝尔层 $M$，$H^{n}(S, M) = 0$ 对一切 $n \\ne 0$。',
      notes: [
        ['**证明。** $S$ 紧 Hausdorff，所以可以用 **Čech 上同调**算（上一条）。而完全不连通 + 紧 Hausdorff 给出一条极强的细化性质：',
          '- **任何覆盖都有有限的、两两不交的闭开（clopen）细化。** 取任一覆盖，用紧性抽出有限子覆盖；再由完全不连通，每个点有包含在某个覆盖成员里的闭开邻域；有限多个这样的闭开集两两求差，就得到一族**两两不交**的闭开集盖住 $S$（这是「零维 + 紧」的标准操作）。',
          '- 于是只需算**两两不交**的覆盖 $\\mathfrak{X} = (S_{k})_{k=0}^{r}$ 的 Čech 复形：$S_{k} \\cap S_{l} = \\emptyset$（$k \\ne l$），所以所有高阶交叠都是空集，Čech 复形只在 $0$ 次有非零项，**集中在 $0$ 次**。',
          '- 把覆盖换成细化不改变 Čech 上同调（上一条已证沿覆盖取余极限），而每个覆盖都细化到一个「集中在 $0$ 次」的复形，故 $\\check{H}^{n}(S, M) = 0$（$n \\ne 0$）。再用紧 Hausdorff 上 Čech = 层上同调即得。∎'
        ].join('\n'),
        '⭐ **这就是凝聚态数学里 Stonean 空间好用的根源**：层上同调在它们上面**自动退化**，$\\Gamma(S, -)$ 直接就是正合函子，于是「取截面」不用付出任何导出代价。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 7.50']
    },

    {
      id: 'prop.topos-morphism-derived',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '拓扑斯态射的导出函子',
      title: '$R^{n}f_{*}M$ 是 $X\' \\mapsto H^{n}(f^{-1}(X\'), M)$ 的层化',
      regions: ['homology', 'category'],
      tags: ['同调代数', '拓扑斯', '态射', '导出函子'],
      statement: '若 $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是**拓扑斯的态射**，则 $R^{n}f_{*}M$ 是预层 $X\' \\mapsto H^{n}\\bigl(f^{-1}(X\'),\\ M\\bigr)$ 所**层化**得到的层。',
      notes: [
        '⭐ **读法**：想算拓扑斯态射的导出函子，先逐点算「另一边像处的上同调」，再把结果层化回去。这与层上同调的定义（截面函子的右导出函子）是同一回事，只是把「一个点的截面」换成了「拓扑斯态射的拉回」。',
        ['**证明。** 记 $f = (f^{-1} \\dashv f_{*})$，并把 $f^{-1}$、$f_{*}$ 在**预层**上的版本记作 $\\hat{f}^{-1}$、$\\hat{f}_{*}$。两个关键事实：',
          '- $f^{-1}$ 与**层化**都是正合的（拓扑斯态射的定义要求 $f^{-1}$ 正合；层化左正合且右正合，因为它是伴随）。',
          '- $f_{*} = \\sharp \\circ \\hat{f}_{*}$（先按预层推，再层化）。',
          '于是 $R f_{*} = \\sharp \\circ \\hat{f}_{*} \\circ R H$（记 $H$ 为「把层看成预层」，它是左正合且正合的嵌入）。取第 $n$ 阶：**$R^{n}f_{*}M$ 就是预层 $\\hat{f}_{*}H^{n}(M)$ 的层化**。',
          '最后认这个预层：由伴随 $f^{-1} \\dashv \\hat{f}_{*}$，对每个 $X\' \\in \\mathcal{T}\'$',
          '$$\\bigl(\\hat{f}_{*}H^{n}(M)\\bigr)(X\') = H^{n}(M)\\bigl(f^{-1}(X\')\\bigr) = H^{n}\\bigl(f^{-1}(X\'),\\ M\\bigr).$$',
          '两边一合就是要证的。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.4.1']
    },

    {
      id: 'cor.homotopy-invariant-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'corollary',
      label: '层上同调是同伦不变量',
      title: '同伦等价的映射给同构的上同调',
      regions: ['homology', 'topology'],
      tags: ['同调代数', '同伦', '上同调', '常值系数'],
      statement: [
        '设 $M$ 是**常值**阿贝尔群。',
        '',
        '1. 若 $f \\simeq g : X \\to Y$ 是**同伦**的连续映射，则 $f$ 与 $g$ 诱导的上同调映射相同；',
        '2. 若 $f : X \\to Y$ 是**同伦等价**，则 $H^{n}(Y, M) \\cong H^{n}(X, M)$。'
      ].join('\n'),
      notes: [
        ['**证明第 1 条。** 常值系数下可以用 **Čech 模型**（在紧 Hausdorff 上它就算出真上同调，在一般情形也足够比较）。',
          '- 同伦 $H : X \\times [0,1] \\to Y$ 把 $Y$ 的覆盖拉到 $X \\times [0,1]$ 上。用 $[0,1]$ 的**有限区间分解** $[0,1] = \\bigcup_{k} I_{k}$（相邻交叠也是区间）把它拆成有限段，于是对每个覆盖都能在 Čech 复形之间造出一个**链同伦** $f^{*} \\simeq g^{*}$ —— 这一步的核心是「$[0,1]$ 的常值系数 Čech 上同调在正次数为零」（区间分解给出的增广 Čech 复形是可缩的）。',
          '- 链同伦在同调上诱导**同一个**映射，故 $H^{n}(f) = H^{n}(g)$。',
          '**第 2 条。** 设 $g$ 是 $f$ 的同伦逆，即 $f g \\simeq \\mathrm{id}_{Y}$、$g f \\simeq \\mathrm{id}_{X}$。由第 1 条，$H^{n}(fg) = H^{n}(\\mathrm{id}_{Y}) = \\mathrm{id}$，而 $H^{n}(fg) = H^{n}(f) \\circ H^{n}(g)$（上同调是函子），同理另一边。于是 $H^{n}(f)$ 与 $H^{n}(g)$ 互逆，$H^{n}(Y, M) \\cong H^{n}(X, M)$。∎'
        ].join('\n'),
        '⭐ **这就是「层上同调是拓扑不变量」那句话的出处** —— 常值系数下，$H^{n}(-, M)$ 是同伦不变的，所以它可以拿来算空间的同伦类不变量（奇异上同调、de Rham 上同调都落在这一条上）。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 7.4.2', 'Le Stum, Corollary 7.4.3']
    }
  ],

  edges: []
});
