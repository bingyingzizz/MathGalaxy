/* ============================================================================
   内容包 · 同调群（拓扑学 · 代数拓扑第二团）

   这一团要造出的「能用的东西」是 H_p 这台机器，链条是：

     标准单纯形 → 单纯复形 → 单纯映射 / 链群 → 边缘算子（∂² = 0）
     → 单纯同调群 → 奇异同调群 → 约化同调 → H₀ 与分支
     → 对的长正合列 → Mayer–Vietoris → 球面的同调
     → Euler 示性数 → 单纯逼近（奇异同调 = 单纯同调）

   ⚠️ 与已有内容的边界：
     · `def.homotopy` / `def.homotopy-category` / `def.cochain-complex` 等在 region `homology`，
       那是**同调代数**（一般加法范畴里的复形）。本团是**代数拓扑**：具体的单纯形、具体的 ℤ。
     · `def.singular-cube` / `def.singular-chain` / `def.boundary-operator` /
       `prop.boundary-squared-zero` 在 region `diffgeom`，那是**方块**模型（用于流形上的积分）。
       本团用**单纯形**模型，边界公式不同，不能混用。
     · `thm.mayer-vietoris` 是 de Rham（实系数、形式）版；本团的 `thm.mv-homology` 是奇异链（ℤ 系数）版。

   引用口径：Munkres, Elements of Algebraic Topology 只给章名，**不给定理编号**（见存疑清单）。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '同调群',

  nodes: [
    {
      id: 'def.standard-simplex',
      type: 'definition',
      label: '标准单纯形',
      title: '标准单纯形 $\\Delta^{p}$ 与面映射 $d_{i}$',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '单纯形', '面映射'],
      statement: [
        '**标准 $p$-单纯形**是',
        '',
        '$$\\Delta^{p} := \\left\\{ (t_{0}, \\ldots, t_{p}) \\in \\mathbb{R}^{p+1} : \\sum_{i} t_{i} = 1,\\ t_{i} \\ge 0 \\right\\}.$$',
        '',
        '它的 $p + 1$ 个**顶点**是 $v_{i} := (0, \\ldots, 1, \\ldots, 0)$（第 $i$ 位为 $1$）。' +
          '$\\Delta^{p}$ 是这些顶点的凸包，是 $\\mathbb{R}^{p+1}$ 里的紧凸集。',
        '',
        '对 $i = 0, 1, \\ldots, p$，**面映射** $d_{i} : \\Delta^{p-1} \\to \\Delta^{p}$ 在第 $i$ 位插一个 $0$：',
        '',
        '$$d_{i}(t_{0}, \\ldots, t_{p-1}) := (t_{0}, \\ldots, t_{i-1}, 0, t_{i}, \\ldots, t_{p-1}).$$',
        '',
        '它的像是「跳过第 $i$ 个顶点」的那个 $(p-1)$-面；这些像的并就是**边界** $\\partial\\Delta^{p}$。',
        '（$p = 0$ 时 $\\Delta^{0}$ 是单点，$d_{0}$ 把它放进 $\\Delta^{1}$ 的一个端点。）',
      ].join('\n'),
      notes: [
        '**面映射的恒等式**（后面 $\\partial^{2} = 0$ 全靠它）：对 $i < j$ 有',
        '',
        '$$d_{j} \\circ d_{i} = d_{i} \\circ d_{j-1} : \\Delta^{p-2} \\to \\Delta^{p}.$$',
        '',
        '两边都是「在 $p-2$ 个分量里把 $0$ 插进第 $i$、第 $j$ 位」，只是先后顺序不同。',
        '',
        '**为什么用 $\\Delta^{p}$ 而不是 $[0, 1]^{p}$**：单纯形的每个面只需一个下标（「跳过第 $i$ 个顶点」），' +
          '所以边界的符号是整齐的 $(-1)^{i}$；而方块的边界要区分「$x_{i} = 0$」与「$x_{i} = 1$」两类面，' +
          '符号公式更长。⚠️ 两种模型给出的同调群同构，但**边界公式不同，不能混写**' +
          '（本图 `def.singular-cube` 用的是方块模型）。',
        '',
        '**凸性是要用到的**：$\\Delta^{p}$ 凸，所以任意两点之间的线段都在里面，' +
          '于是「$\\Delta^{p}$ 里任何闭链都能缩成一点」；这是单纯逼近与「奇异单纯形内部无洞」的几何基础。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1 · Simplicial Complexes',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · Delta-complexes and simplicial homology',
      ],
    },
    {
      id: 'def.simplicial-complex',
      type: 'definition',
      label: '单纯复形',
      title: '抽象单纯复形与它的几何实现',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '单纯复形', '三角剖分'],
      statement: [
        '设 $V$ 是集合（**顶点集**）。$V$ 上的一个**抽象单纯复形**是一个非空有限子集构成的族 $K$，满足：',
        '',
        '$$\\sigma \\in K,\\ \\ \\emptyset \\ne \\tau \\subseteq \\sigma \\ \\implies \\ \\tau \\in K.$$',
        '',
        '即：属于 $K$ 的成员叫**单纯形**，它的非空子集也必须在 $K$ 里（**闭包性质**）。',
        '$\\sigma$ 的**维数**定义成 $\\dim\\sigma := \\#\\sigma - 1$；$K$ 的维数是 $\\max_{\\sigma \\in K}\\dim\\sigma$。' +
          '维数为 $0, 1, 2$ 的单纯形分别叫**顶点、棱、三角形**。',
        '',
        '**几何实现**：把顶点集嵌进 $\\mathbb{R}^{V}$，令',
        '',
        '$$|K| := \\bigcup_{\\sigma \\in K} \\operatorname{conv}\\{\\, v : v \\in \\sigma \\,\\} \\subseteq \\mathbb{R}^{V},$$',
        '',
        '配以子空间拓扑。有限复形时这就是一个紧的度量空间；$|K|$ 叫 $K$ 的**多面体**。',
      ].join('\n'),
      notes: [
        '**例子**：$V = \\{v_{0}, v_{1}, v_{2}\\}$，$K$ 取全部非空子集 —— 这是三角形（二维圆盘）。' +
          '只取 $\\{v_{i}\\}$ 与 $\\{v_{i}, v_{j}\\}$ 两两成对 —— 这是 $S^{1}$（一个三边形）。' +
          '这就是「三角剖分」：把空间切成单纯形。',
        '',
        '**为什么用抽象定义**：几何实现要先选一个嵌入，选法有无穷多；' +
          '但同调群只依赖 $K$ 的**组合结构**（哪几个顶点构成一个单纯形），与嵌入无关。' +
          '所以定义只写组合数据，几何实现放到需要的时候再取。',
        '',
        '⚠️ **单纯复形比「$\\Delta$-复形」窄**：$\\Delta$-复形允许同一个单纯形自己跟自己粘（例如用两个 $n$-单纯形' +
          '贴上边界得到 $S^{n}$），那**不是**单纯复形（不是任何顶点集的子集族）。' +
          '本团的定理都是对单纯复形说的，但奇异同调对一切空间都有定义，所以 $S^{n}$ 照样能算（`thm.sphere-homology`）。',
        '',
        '**顶点要取全序**：本团约定给 $V$ 一个全序，于是每个 $p$-单纯形都有唯一的**有序写法** $[v_{0}, \\ldots, v_{p}]$' +
          '（$v_{0} < \\cdots < v_{p}$）。这样「定向」不必另外选，而且边缘算子的符号有确定含义。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1 · Simplicial Complexes',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · simplicial complexes',
      ],
    },
    {
      id: 'def.simplicial-map',
      type: 'definition',
      label: '单纯映射',
      title: '单纯映射：顶点层面的映射，以及它诱导的链映射',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '单纯映射', '链映射'],
      statement: [
        '设 $K, L$ 是单纯复形。映射 $f : V(K) \\to V(L)$ 叫**单纯映射**（simplicial map），如果',
        '',
        '$$\\sigma \\in K \\ \\implies \\ f(\\sigma) \\in L.$$',
        '',
        '（$f$ 不要求在每条单纯形上单射；$f(\\sigma)$ 可以比 $\\sigma$ 低维。）' +
          '单纯映射在几何实现上由「线性延拓」唯一确定：',
        '',
        '$$|f|\\left(\\sum_{v} t_{v} v\\right) := \\sum_{v} t_{v} f(v),$$',
        '',
        '这是一个连续映射 $|K| \\to |L|$。',
        '',
        '**诱导链映射**：在链群上定义 $\\varphi_{\\#} : C_{p}(K) \\to C_{p}(L)$，对 $p$-单纯形 $\\sigma = [v_{0}, \\ldots, v_{p}]$：',
        '若 $f(\\sigma)$ 是 $p$ 维，则 $\\varphi_{\\#}(\\sigma) := [f(v_{0}), \\ldots, f(v_{p})]$（去掉重复顶点、重排成全序）；' +
          '若 $\\dim f(\\sigma) < p$，则 $\\varphi_{\\#}(\\sigma) := 0$。再线性延拓。' +
          '它满足 $\\varphi_{\\#} \\circ \\partial = \\partial \\circ \\varphi_{\\#}$，因此过商给出',
        '',
        '$$\\varphi_{*} : H_{p}(K) \\longrightarrow H_{p}(L),\\qquad [z] \\longmapsto [\\varphi_{\\#} z].$$',
      ].join('\n'),
      notes: [
        '**$\\varphi_{*}$ 良定义的理由**：$\\varphi_{\\#}$ 与 $\\partial$ 交换 $\\implies$ 闭链送闭链、边缘送边缘，' +
          '故「模掉边缘」这一步不被破坏。函子性（$1_{*} = \\operatorname{id}$、$(\\psi \\circ \\varphi)_{*} = \\psi_{*} \\circ \\varphi_{*}$）逐点验证。',
        '',
        '⚠️ **单纯映射实在太少**：两个复形之间随便取一个连续映射，一般**不会**把单纯形送到单纯形。' +
          '最简单的反例：把 $[0, 1]$ 折成自身的「$\\vee$ 形」映射 $t \\mapsto 2t$（$t \\le 1/2$）、$t \\mapsto 2 - 2t$（$t \\ge 1/2$），' +
          '它是连续的但不是单纯映射（$[v_{0}, v_{1}]$ 的像不是一个单纯形）。',
        '',
        '**补救办法**：允许先把定义域**重分**（重心重分）再取单纯映射 —— 这就是**单纯逼近定理**' +
          '（`thm.simplicial-approximation`）。它也是「奇异同调 $=$ 单纯同调」的技术核心。',
        '',
        '💡 记住这个分工：**连续映射**是拓扑世界里的态射，**单纯映射**是组合世界里的态射，' +
          '两者差一个「重分」的代价。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1 · Simplicial maps',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · simplicial maps and induced homomorphisms',
      ],
    },
    {
      id: 'def.chain-group',
      type: 'definition',
      label: '链群',
      title: '链群 $C_{p}(K)$：以 $p$-单纯形为基的自由阿贝尔群',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '链群', '自由阿贝尔群'],
      statement: [
        '设 $K$ 是单纯复形，记 $K_{p}$ 为它全体 $p$-单纯形之集（有限集）。**$p$-链群** $C_{p}(K)$ 是**以 $K_{p}$ 为基的自由阿贝尔群**，' +
          '它的具体构造是',
        '',
        '$$C_{p}(K) := \\{\\, n : K_{p} \\to \\mathbb{Z} \\,\\},$$',
        '',
        '其中 $n(\\sigma) = 0$ 除有限多个 $\\sigma$ 之外（这就是「有限形式和」的意思）。',
        '',
        '加法逐点（$n + m$ 表示 $(n + m)(\\sigma) = n(\\sigma) + m(\\sigma)$）。元素写成有限形式和',
        '',
        '$$c = \\sum_{\\sigma \\in K_{p}} n_{\\sigma}\\,\\sigma,\\qquad n_{\\sigma} \\in \\mathbb{Z},$$',
        '',
        '$n_{\\sigma}$ 叫 $\\sigma$ 在 $c$ 里的**重数**。约定 $p < 0$ 或 $p > \\dim K$ 时 $C_{p}(K) := 0$。',
        '$C_{p}(K)$ 是自由阿贝尔群，秩等于 $K$ 的 $p$-单纯形个数 $\\alpha_{p}$。',
      ].join('\n'),
      notes: [
        '**为什么是自由阿贝尔群**：我们要「带符号地相加」一条链里的单纯形——' +
          '把 $\\sigma$ 加三次就是 $3\\sigma$，把它和它的反向抵消就是 $0$，而且**不允许**任何别的等式成立。' +
          '自由阿贝尔群正是「基上随心所欲相加、不加额外关系」的最小结构。',
        '',
        '⚠️ **自由度恰好够用**：因为群同态只要在**基**上规定就唯一确定了，' +
          '所以之后定义边缘算子时只需对单个单纯形写出公式、再线性延拓，不必验证任何相容性。' +
          '这是「自由」这个词的全部用处。',
        '',
        '**系数换了也要一套理论**：系数取 $\\mathbb{Q}$ 或 $\\mathbb{R}$ 时得到 Betti 数（看不见挠部），' +
          '取 $\\mathbb{Z}/2$ 时符号 $(-1)^{i}$ 全部消失（不必担心定向）。本团固定系数 $\\mathbb{Z}$。',
        '',
        '💡 直观：$C_{p}(K)$ 就是「$p$ 维碎片的整系数账本」。同调要做的事是问：**这些账目里，哪些是真正的「洞」，' +
          '哪些只是某个更高维东西的影子**（见 `def.simplicial-homology`）。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1 · Chains and the chain groups',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · chain groups',
      ],
    },
    {
      id: 'def.simplicial-boundary',
      type: 'definition',
      label: '边缘算子',
      title: '边缘算子 $\\partial_{p}$ 与 $\\partial^{2} = 0$',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '边缘算子', '边界', '链复形'],
      statement: [
        '设 $\\sigma = [v_{0}, \\ldots, v_{p}]$ 是有序 $p$-单纯形（$v_{0} < \\cdots < v_{p}$）。' +
          '它的**边缘**定义为',
        '',
        '$$\\partial_{p}\\sigma := \\sum_{i=0}^{p} (-1)^{i}\\,[v_{0}, \\ldots, \\widehat{v_{i}}, \\ldots, v_{p}],$$',
        '',
        '其中帽子 $\\widehat{v_{i}}$ 表示「删掉这个顶点」。因为 $C_{p}(K)$ 自由，这条公式线性延拓成唯一的群同态',
        '',
        '$$\\partial_{p} : C_{p}(K) \\longrightarrow C_{p-1}(K).$$',
        '',
        '**基本性质**：对每个 $p$，',
        '',
        '$$\\partial_{p-1} \\circ \\partial_{p} = 0.$$',
        '',
        '于是约定 $Z_{p} := \\ker\\partial_{p}$（**闭链**）、$B_{p} := \\operatorname{im}\\partial_{p+1}$（**边缘**），' +
          '并且 $B_{p} \\subseteq Z_{p}$，即 $(C_{*}, \\partial)$ 是一个**链复形**。',
      ].join('\n'),
      notes: [
        '**$\\partial^{2} = 0$ 的证明骨架**：把 $\\partial\\partial\\sigma$ 写成双重求和，' +
          '每项对应「删两个顶点 $i < j$」。这一项在两次展开里出现**两次**：' +
          '一次系数是 $(-1)^{i}(-1)^{j-1}$（先删 $j$ 再删 $i$），另一次是 $(-1)^{j}(-1)^{i}$（先删 $i$ 再删 $j$）——' +
          '两者相差一个符号，恰好相消。用的是面映射恒等式 $d_{j}d_{i} = d_{i}d_{j-1}$（$i < j$）。',
        '',
        '⭐ **符号 $(-1)^{i}$ 就是为这件事选的**。换别的符号约定也行，只要全篇一致；' +
          '不一致的后果是 $\\partial^{2} \\ne 0$，整台机器立刻失效。',
        '',
        '**几个小情形**：$\\partial_{0} = 0$（顶点没有更低维的面）；' +
          '$\\partial_{1}[v_{0}, v_{1}] = [v_{1}] - [v_{0}]$；' +
          '$\\partial_{2}[v_{0}, v_{1}, v_{2}] = [v_{1}, v_{2}] - [v_{0}, v_{2}] + [v_{0}, v_{1}]$（三角形三条边，中间那条带负号 —— 定向）。',
        '',
        '💡 一句话：$\\partial$ 与 $\\partial^{2} = 0$ 这一对，就是整个同调论的**全部代数输入**；' +
          '剩下的一切（商群、长正合列、Mayer–Vietoris）都是这两条的推论。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 1 · The boundary operator',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · the boundary map and d^2 = 0',
      ],
    },
    {
      id: 'def.simplicial-homology',
      type: 'definition',
      label: '单纯同调群',
      title: '单纯同调群 $H_{p}(K) = Z_{p} / B_{p}$',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '同调群', '闭链', '边缘'],
      statement: [
        '设 $K$ 是单纯复形，$(C_{*}(K), \\partial)$ 是它的链复形。由 $\\partial^{2} = 0$ 得 $B_{p} \\subseteq Z_{p}$，' +
          '而 $C_{p}(K)$ 是阿贝尔群，所以子群都是正规的，可以取商。**$p$ 维单纯同调群**定义为商群',
        '',
        '$$H_{p}(K) := Z_{p}(K)\\, \\big/\\, B_{p}(K) \\;=\\; \\ker\\partial_{p}\\, \\big/\\, \\operatorname{im}\\partial_{p+1}.$$',
        '',
        '它的元素叫**同调类**，记 $[z]$（$z \\in Z_{p}$ 是代表闭链）。',
        '',
        '$$[z] = 0 \\iff z \\in B_{p},$$',
        '',
        '',
        '即：**一个闭链在同调里是零，当且仅当它是某个 $(p+1)$-链的边界**。',
      ].join('\n'),
      notes: [
        '**它在量什么**：$H_{p}$ 量的是「$p$ 维的闭链里，有多少**不是**边缘」。' +
          '$H_{1}$ 数一维的洞（$S^{1}$：$H_{1} = \\mathbb{Z}$），$H_{2}$ 数空腔（$S^{2}$：$H_{2} = \\mathbb{Z}$），' +
          '$H_{0}$ 数连通分支（`prop.h0-components`）。',
        '',
        '⚠️ **$H_{p}$ 是商群，不是子群**。单看「闭链」什么也看不出——任何空间都有大量闭链；' +
          '信息全在「哪些闭链是别人影子」这一步。把 $B_{p}$ 除掉，剩下的才是「真的堵住了」。',
        '',
        '**为什么必须除掉 $B_{p}$ 而不是别的**：如果只除掉 $0$，那 $Z_{p}$ 里会塞满「薄薄一层壳」' +
          '（例如球面上任何小圆都是闭链），洞与洞之间的差别被无穷多无用信息淹没。除到 $B_{p}$ 恰好留下「拓扑」信息。',
        '',
        '**有限复形时 $H_{p}$ 是有限生成的**：$\\mathbb{Z}$ 是主理想整环，自由模的子模仍自由，' +
          '所以 $H_{p} \\cong \\mathbb{Z}^{\\beta_{p}} \\oplus (\\text{挠部})$，$\\beta_{p}$ 叫 **Betti 数**。' +
          '挠部（如 $\\mathbb{Z}/2$）是「扭了一下」的洞，$\\mathbb{R}$ 系数的同调看不见它。',
        '',
        '💡 与 $\\pi_{1}$ 的分工：$\\pi_{1}$ 非阿贝尔、难算、只管一维；$H_{p}$ 是阿贝尔群、对每个维数都有、' +
          '而且有长正合列这类强工具。两者通过 Hurewicz 同态联系（$H_{1}$ 是 $\\pi_{1}$ 的阿贝尔化，见 `def.singular-homology` 的弱边）。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 2 · Simplicial Homology',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · simplicial homology groups',
      ],
    },
    {
      id: 'def.singular-homology',
      type: 'definition',
      label: '奇异同调群',
      title: '奇异单纯形、奇异链复形与奇异同调群 $H_{p}(X)$',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '奇异同调', '奇异单纯形', '函子性'],
      statement: [
        '设 $X$ 是任意拓扑空间。一个**奇异 $p$-单纯形**是任意连续映射',
        '',
        '$$\\sigma : \\Delta^{p} \\longrightarrow X,$$',
        '',
        '**不要求**单射、不要求是嵌入、可以自交、可以把整个 $\\Delta^{p}$ 压成一点。' +
          '全体奇异 $p$-单纯形为基的自由阿贝尔群记 $S_{p}(X)$（**奇异链群**）。' +
          '边缘算子由面映射给出：',
        '',
        '$$\\partial_{p}\\sigma := \\sum_{i=0}^{p} (-1)^{i}\\,\\sigma \\circ d_{i},$$',
        '',
        '同样满足 $\\partial^{2} = 0$（因为 $d_{j}d_{i} = d_{i}d_{j-1}$ 与单纯情形逐字相同）。于是',
        '',
        '$$H_{p}(X) := \\ker\\partial_{p}\\, \\big/\\, \\operatorname{im}\\partial_{p+1}$$',
        '',
        '叫 $X$ 的**$p$ 维奇异同调群**。',
        '',
        '**函子性**：连续映射 $f : X \\to Y$ 给出链映射 $f_{\\#}(\\sigma) := f \\circ \\sigma$，' +
          '它满足 $f_{\\#}\\partial = \\partial f_{\\#}$，故诱导 $f_{*} : H_{p}(X) \\to H_{p}(Y)$；' +
          '并且 $(1_{X})_{*} = \\operatorname{id}$、$(g \\circ f)_{*} = g_{*} \\circ f_{*}$。' +
          '同伦的映射诱导相同的映射：$f \\simeq g \\implies f_{*} = g_{*}$。',
      ].join('\n'),
      notes: [
        '**和单纯同调的关系**：$K$ 的每个 $p$-单纯形 $[v_{0}, \\ldots, v_{p}]$ 都能看成一个奇异 $p$-单纯形' +
          '（把 $\\Delta^{p}$ 的顶点 $v_{i}$ 线性送到 $K$ 的 $v_{i}$），这给出子复形 $C_{*}(K) \\subseteq S_{*}(|K|)$。' +
          '`thm.simplicial-approximation` 说这个包含诱导**同构** $H_{p}(K) \\cong H_{p}(|K|)$。' +
          '换句话说：奇异同调是「不选三角剖分的同调」，两者在可三角剖分的空间上完全一致。',
        '',
        '⭐ **为什么允许铺天盖地的奇异单纯形**：这样**每个连续映射**都能作用，于是不需要任何三角剖分、' +
          '不需要任何好条件，理论对**一切**拓扑空间（甚至一切拓扑对）都有定义。' +
          '代价是 $S_{p}(X)$ 一般巨大（为了可数性还得附加条件），几乎不可能直接算——' +
          '所以实际计算全靠长正合列（`thm.long-exact-pair`）、Mayer–Vietoris（`thm.mv-homology`）' +
          '和「奇异 $=$ 单纯」（`thm.simplicial-approximation`）。',
        '',
        '⚠️ **与 `def.singular-chain`（流形上的方块链）不是一回事**：那里的基是 $c : [0, 1]^{k} \\to M$（方块），' +
          '这里基是 $\\sigma : \\Delta^{p} \\to X$（单纯形）。两个模型给出的同调群同构，但**边界公式不同**，' +
          '不能把两者的 $\\partial$ 混用。',
        '',
        '💡 直观：一个奇异 $p$-单纯形就是「在 $X$ 上画一个（允许塌缩的）$p$ 维三角形」；' +
          '一条奇异链就是「把一堆这样的三角形带符号地叠起来」。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 4 · Singular Homology',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · singular homology',
      ],
    },
    {
      id: 'def.reduced-homology',
      type: 'definition',
      label: '约化同调',
      title: '约化同调 $\\tilde{H}_{p}$：把「单点也有一个洞」修掉',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '约化同调', '增广'],
      statement: [
        '设 $X \\ne \\emptyset$。定义**增广映射**（即「把每个点都算作 $1$」）',
        '',
        '$$\\varepsilon : S_{0}(X) \\longrightarrow \\mathbb{Z},\\qquad \\varepsilon\\left(\\sum_{x} n_{x}\\, x\\right) := \\sum_{x} n_{x}.$$',
        '',
        '由于 $\\partial_{1}\\sigma = \\sigma \\circ d_{1} - \\sigma \\circ d_{0}$ 的两个系数一正一负，' +
          '有 $\\varepsilon \\circ \\partial_{1} = 0$，于是可以把它接在 $0$-链后面，得到**增广链复形**',
        '',
        '$$S_{1}(X) \\xrightarrow{\\ \\partial\\ } S_{0}(X) \\xrightarrow{\\ \\varepsilon\\ } \\mathbb{Z} \\to 0$$',
        '',
        '（左边继续接 $S_{2}, S_{3}, \\ldots$）。**约化同调**定义为这个延长后复形的同调：',
        '',
        '$$\\tilde{H}_{p}(X) := H_{p}(X) \\quad (p \\ge 1),$$',
        '$$\\tilde{H}_{0}(X) := \\ker\\varepsilon \\big/ \\operatorname{im}\\partial_{1}.$$',
      ].join('\n'),
      notes: [
        '**为什么要有它**：单点 $\\{p\\}$ 的 $H_{0} = \\mathbb{Z}$ —— 一个点看起来「有一个洞」。' +
          '用约化同调，单点的**全部**约化同调都是 $0$，于是「$S^{n}$ 只有一个非平凡同调」这类陈述才干净' +
          '（`thm.sphere-homology`）。',
        '',
        '**与普通同调的关系**：$X \\ne \\emptyset$ 时，$\\varepsilon$ 是满射（任取一点 $x$，$\\varepsilon(x) = 1$），' +
          '由商群的短正合列 $0 \\to \\ker\\varepsilon \\to S_{0} \\to \\mathbb{Z} \\to 0$ 与同调的长正合列，得',
        '',
        '$$H_{0}(X) \\cong \\tilde{H}_{0}(X) \\oplus \\mathbb{Z}.$$',
        '',
        '高维没有这个差别：$\\tilde{H}_{p} = H_{p}$ 对 $p \\ge 1$。',
        '',
        '**「增广」的几何意义**：$\\varepsilon$ 取出的是一条 $0$-链的总系数（「净点数」）。' +
          '商掉它相当于**把整个空间压成一个点**再取同调 —— 这也解释了为什么单点的约化同调全为零。',
        '',
        '⚠️ 空空间的约定各家不同（有的让 $\\tilde{H}_{-1}(\\emptyset) = \\mathbb{Z}$）。本团一律设 $X \\ne \\emptyset$，' +
          '避开这个技术细节。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 4 · reduced homology',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · reduced homology groups',
      ],
    },
    {
      id: 'prop.h0-components',
      type: 'proposition',
      label: 'H₀ 与分支',
      title: '$H_{0}(X)$ 是道路连通分支上的自由阿贝尔群',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '同调群', '道路连通分支', '约化同调'],
      statement: [
        '设 $X \\ne \\emptyset$，$\\pi_{0}(X)$ 是它的**道路连通分支**之集。则',
        '',
        '$$H_{0}(X) \\;\\cong\\; \\bigoplus_{C \\in \\pi_{0}(X)} \\mathbb{Z}.$$',
        '',
        '更精确：从每个分支 $C$ 中取一点 $x_{C}$，则类 $[x_{C}]$ 构成 $H_{0}(X)$ 的一组基。' +
          '特别地',
        '',
        '$$\\tilde{H}_{0}(X) = 0 \\iff X \\text{ 道路连通}.$$',
      ].join('\n'),
      notes: [
        '**所以 $H_{0}$ 就是「$X$ 有几块」**。这也解释了为什么 $\\tilde{H}_{0}(S^{0}) = \\mathbb{Z}$' +
          '（两点，秩 $2$ 商掉对角那条 $\\mathbb{Z}$ 剩秩 $1$），从而球面同调的公式在 $p = 0$ 处也统一。',
        '',
        '⚠️ **道路连通 vs 连通**：$H_{0}$ 只看见**道路**连通分支，不是连通分支。' +
          '在通常的空间（局部道路连通）上两者一致，但一般情况不同——例如拓扑学家的正弦曲线是连通而不道路连通的，' +
          '它的 $H_{0}$ 反映的是道路分支。',
        '',
        '**为什么边缘落在「同分支点之差」上**：$\\partial$ 只作用在一条奇异 $1$-单纯形（一条道路）上，' +
          '它的像是两个端点之差；而整条道路都在同一个道路连通分支里。所以 $\\partial$ 无法跨越分支 $\\implies$ ' +
          '不同分支的点在 $H_{0}$ 里线性无关。',
        '',
        '💡 这是本团第一条**算得出具体数**的结论：$H_{0}$ 是唯一一个「看空间就写答案」的同调群。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 4 · H_0 and components',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · H_0 and path components',
      ],
    },
    {
      id: 'thm.sphere-homology',
      type: 'theorem',
      label: '球面的同调',
      title: '$H_{p}(S^{n})$：只有在 $p = 0$ 与 $p = n$ 处非平凡',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '同调群', '球面', 'Betti 数'],
      statement: [
        '对 $n \\ge 1$：',
        '',
        '$$H_{0}(S^{n}) = \\mathbb{Z},\\qquad H_{n}(S^{n}) = \\mathbb{Z},$$',
        '$$H_{p}(S^{n}) = 0 \\quad (p \\ne 0, n).$$',
        '',
        '用**约化**同调可以对着所有 $p$（含 $n = 0$）统一写成',
        '',
        '$$\\tilde{H}_{p}(S^{n}) = \\mathbb{Z} \\ (p = n),\\qquad \\tilde{H}_{p}(S^{n}) = 0 \\ (p \\ne n).$$',
      ].join('\n'),
      notes: [
        '**$n = 0$ 要单独看清**：$S^{0}$ 是两点，由 `prop.h0-components`，$H_{0}(S^{0}) = \\mathbb{Z}^{2}$，' +
          '约化后 $\\tilde{H}_{0}(S^{0}) = \\mathbb{Z}$ —— 与 $p = n$ 的约定吻合，所以它是归纳法的**基础情形**。',
        '',
        '⚠️ **证明是骨架**，正式证明请查 `refs`。结构与关键步骤：',
        '① 取两个**开**集 $U := S^{n} \\setminus \\{\\text{南极}\\}$、$V := S^{n} \\setminus \\{\\text{北极}\\}$，' +
          '它们都同胚于 $\\mathbb{R}^{n}$，可缩，故所有约化同调为零（同伦不变性：恒等 $\\simeq$ 常值，' +
          '而常值映射在约化同调上是零）；',
        '② $U \\cap V = S^{n} \\setminus \\{\\text{两极}\\}$ 沿经线**形变收缩**到赤道 $S^{n-1}$，' +
          '故 $\\tilde{H}_{p}(U \\cap V) \\cong \\tilde{H}_{p}(S^{n-1})$；',
        '③ 代入 Mayer–Vietoris（`thm.mv-homology`）的约化版，两个可缩块的项为零，得对每个 $p$',
        '$$\\tilde{H}_{p}(S^{n}) \\cong \\tilde{H}_{p}(S^{n-1}),$$',
        '④ 从 $S^{0}$ 出发归纳即得结论。',
        '',
        '⚠️ 第 ② 步用到了**同调的同伦不变性**，而第 ③ 步用到 MV —— 本图里 MV 那条边的证明本身也只是骨架。' +
          '所以这条定理在图上离「可逐行复现」还有一段距离，如实标注。',
        '',
        '⭐ **意义**：这是「同调看得见 $n$ 维的洞」的精确表述。对比 `cor.pi1-sphere`（$\\pi_{1}(S^{n}) = 1$ 对 $n \\ge 2$）——' +
          '$\\pi_{1}$ 只看见 $n = 1$ 那一层，$H_{n}$ 看见每一层。当然 $\\pi_{n}$ 也看得见（那是另一套理论）。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology · 球面的同调（用 Mayer–Vietoris 归纳）',
        'Hatcher, Algebraic Topology, Ch. 2 §2.2 · homology of spheres',
      ],
    },
    {
      id: 'thm.euler-characteristic',
      type: 'theorem',
      label: 'Euler 示性数',
      title: 'Euler 示性数：数单纯形与数 Betti 数给出同一个数',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', 'Euler 示性数', 'Betti 数', '同调群'],
      statement: [
        '设 $K$ 是**有限**单纯复形，$\\alpha_{p}$ 是它的 $p$-单纯形个数，$\\beta_{p} := \\operatorname{rank} H_{p}(K)$ 是第 $p$ 个 **Betti 数**（自由部分的秩）。则',
        '',
        '$$\\chi(K) = \\sum_{p} (-1)^{p} \\alpha_{p} = \\sum_{p} (-1)^{p} \\beta_{p}.$$',
        '',
        '也就是说：**左边只是数单纯形的个数，右边只依赖同调群**。',
      ].join('\n'),
      notes: [
        '**两个例子**：',
        '- $S^{2}$ 的四面体剖分：$\\alpha = (4, 6, 4, 0)$，$\\chi = 4 - 6 + 4 - 0 = 2$；' +
          '$\\beta = (1, 0, 1)$，$\\sum = 1 - 0 + 1 = 2$ ✓',
        '- 实射影平面 $\\mathbb{RP}^{2}$ 的最小剖分（6 顶点 / 15 棱 / 10 面）：$\\chi = 6 - 15 + 10 = 1$；' +
          '而 $H_{1}(\\mathbb{RP}^{2}) = \\mathbb{Z}/2$ **秩为零**，所以 $\\sum(-1)^{p}\\beta_{p} = 1 - 0 + 0 = 1$ ✓',
        '',
        '⚠️ **注意右端用的是秩（Betti 数），不是 $\\#H_{p}$**。挠部（如 $\\mathbb{Z}/2$）**不进**交错和；' +
          '上面 $\\mathbb{RP}^{2}$ 那个例子正是靠这一点才对得上。',
        '',
        '⭐ **这条定理真正的价值**不在等式本身，而在于右端**只依赖同调**——' +
          '所以 $\\chi$ 与三角剖分的选法无关（配合 `thm.simplicial-approximation`），是拓扑不变量。' +
          '反过来，计算 $\\chi$ 时只需数单纯形，根本不用算同调。',
        '',
        '**证明的思路**（见边上的完整算式）：两次秩-零化度，一次作用在 $\\partial_{p}$ 上，一次作用在 $Z_{p}/B_{p} \\cong H_{p}$ 上；' +
          '边缘群的维数在交错和里成对相消（望远镜式）。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology, Ch. 2 · the Euler characteristic',
        'Hatcher, Algebraic Topology, Ch. 2 §2.2 · the Euler characteristic',
      ],
    },
    {
      id: 'thm.long-exact-pair',
      type: 'theorem',
      label: '对的长正合列',
      title: '拓扑对 (X, A) 的长正合列',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '长正合列', '相对同调', '连接同态'],
      statement: [
        '一个**拓扑对**就是一个子空间对 $A \\subseteq X$。由于 $A$ 里的奇异单纯形自动也是 $X$ 里的，' +
          '$S_{*}(A) \\subseteq S_{*}(X)$ 是**子复形**；定义**相对链群**与**相对同调群**',
        '',
        '$$S_{p}(X, A) := S_{p}(X) \\big/ S_{p}(A),$$',
        '$$H_{p}(X, A) := \\ker\\bar\\partial \\big/ \\operatorname{im}\\bar\\partial.$$',
        '',
        '则存在**长正合列**（每个 $\\cdot$ 处都是 $\\operatorname{im} = \\ker$）',
        '',
        '$$\\cdots \\to H_{p}(A) \\to H_{p}(X) \\to H_{p}(X, A)$$',
        '$$\\xrightarrow{\\ \\partial_{*}\\ } H_{p-1}(A) \\to \\cdots$$',
        '',
        '其中 $\\partial_{*}$ 叫**连接同态**。序列对一切子空间对成立，**不需要** $A$ 是闭的、开的好子空间，' +
          '也不需要任何「余纤维化」条件。',
      ].join('\n'),
      notes: [
        '**连接同态怎么定义**：取 $[c] \\in H_{p}(X, A)$，代表元 $c \\in S_{p}(X)$ 满足「相对闭」的条件 ' +
          '$\\bar\\partial[c] = 0$，即 $\\partial c \\in S_{p-1}(A)$。令',
        '',
        '$$\\partial_{*}[c] := [\\partial c] \\in H_{p-1}(A).$$',
        '',
        '要验证三件事：$\\partial c$ 确实是闭链（$\\partial\\partial c = 0$）；换代表元不改变类；' +
          '在三个位置 $H_{p}(X), H_{p}(X,A), H_{p-1}(A)$ 上分别验证正合性。',
        '',
        '⚠️ **本图的证明是骨架**：上面只写「短正合列 $+$ 追图」的构造，不逐行写三轮正合性验证——' +
          '那是标准的图追踪，写全要一整页。结构是完整的，细节请查 `refs`。',
        '',
        '**为什么同调有这条而同伦没有这么方便**：$\\pi_{n}$ 的长正合列需要纤维化条件' +
          '（空间得好）；同调的这条只要 $A \\subseteq X$ 是任意子空间。' +
          '这是「链的复形」比「同伦群」好用的核心区别之一。',
        '',
        '💡 用法：把大空间的同调拆成「小空间 $+$ 相对部分」，用已知的算未知的（`thm.mv-homology` 就是这么来的）。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology · 对 (X, A) 的长正合列（本图不给章号 / 定理号）',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · the long exact sequence of a pair',
      ],
    },
    {
      id: 'thm.mv-homology',
      type: 'theorem',
      label: 'Mayer–Vietoris（同调）',
      title: 'Mayer–Vietoris 序列（同调版，$\\mathbb{Z}$ 系数）',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', 'Mayer–Vietoris', '长正合列', '同调群'],
      statement: [
        '设 $X = U \\cup V$，$U, V \\subseteq X$ 是**开集**（更一般：$U, V$ 的内部覆盖 $X$）。' +
          '记 $i_{*}, j_{*}$ 为 $U \\cap V \\hookrightarrow U, V$ 的包含映射诱导的映射。则存在长正合列',
        '',
        '$$H_{p}(U \\cap V) \\to H_{p}(U) \\oplus H_{p}(V) \\to H_{p}(X)$$',
        '$$\\xrightarrow{\\ \\partial_{*}\\ } H_{p-1}(U \\cap V)$$',
        '',
        '（两端各再向左右无限延伸成 $\\cdots$）。其中两个不明显的映射是',
        '',
        '$$\\Phi[z] := (i_{*}[z],\\ -j_{*}[z]),\\qquad \\Psi[a, b] := [a + b].$$',
        '',
        '把 $H$ 换成约化同调 $\\tilde{H}$，同样的序列照样成立。',
      ].join('\n'),
      notes: [
        '⚠️ **本图的证明是骨架**。结构与关键的一步：',
        '① 记 $S_{*}(U) + S_{*}(V) \\subseteq S_{*}(X)$ 为「落在 $U$ 里的」与「落在 $V$ 里的」奇异单纯形共同生成的子复形；' +
          '有短正合列 $0 \\to S_{*}(U \\cap V) \\to S_{*}(U) \\oplus S_{*}(V) \\to S_{*}(U) + S_{*}(V) \\to 0$；',
        '② 由 `thm.long-exact-pair` 的追图得一条长正合列；',
        '③ **关键一步（本图不展开）**：包含 $S_{*}(U) + S_{*}(V) \\hookrightarrow S_{*}(X)$ 诱导**同调同构**。' +
          '理由是**小单纯形引理 / 重心重分**：给定奇异 $p$-单纯形 $\\sigma : \\Delta^{p} \\to X$，' +
          '$\\{\\sigma^{-1}(U), \\sigma^{-1}(V)\\}$ 是 $\\Delta^{p}$ 的开覆盖；取 Lebesgue 数 $\\delta$，' +
          '反复重心重分直到每个小单纯形的直径 $< \\delta$，则每个小单纯形整体落在 $U$ 或 $V$ 里——' +
          '于是「重分后的链」落在 $S_{*}(U) + S_{*}(V)$ 里。重分链映射与包含互为链同伦逆；',
        '④ 把 ②③ 接起来即得 MV。',
        '',
        '⭐ **全部的力气都在第 ③ 步的重细分上**：它把「局部落在 $U$ 或 $V$」升级成「整体等价」。' +
          '这条也是最容易被略过、却最容易出错的地方（符号与链同伦的显式构造）。',
        '',
        '⚠️ **与 `thm.mayer-vietoris` 的区别**：那个节点是 **de Rham 版**（光滑流形、实系数、微分形式复形，' +
          '`def.de-rham-complex`）。这里是**奇异链版**（任意空间、$\\mathbb{Z}$ 系数）。' +
          '两个序列形状一样，但一个有挠部信息、一个没有 —— 名字相似不等于同一个结论，不要互相引用当证明。',
        '',
        '💡 常用法：算 $\\tilde{H}_{*}(S^{n})$（`thm.sphere-homology`）、把环面拆成两张柱面、' +
          '把连通和拆成两块挖掉小球的空间。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology · Mayer–Vietoris 序列（本图不给章号 / 定理号）',
        'Hatcher, Algebraic Topology, Ch. 2 §2.2 · Mayer–Vietoris sequences',
      ],
    },
    {
      id: 'thm.simplicial-approximation',
      type: 'theorem',
      label: '单纯逼近',
      title: '单纯逼近定理：奇异同调 $=$ 单纯同调',
      cluster: 'topology.homology',
      regions: ['topology'],
      tags: ['代数拓扑', '单纯逼近', '重心重分', '同调群'],
      statement: [
        '设 $K, L$ 是单纯复形，$K$ **有限**，$f : |K| \\to |L|$ 连续。记 $K^{(m)}$ 为 $K$ 的 $m$ 次**重心重分**' +
          '（$|K^{(m)}| = |K|$，单纯形直径按固定比例缩小）。则存在 $m \\ge 1$ 与**单纯映射**',
        '',
        '$$g : K^{(m)} \\longrightarrow L$$',
        '',
        '使 $|g| \\simeq f$（$|g|$ 与 $f$ 同伦）。这样的 $g$ 叫 $f$ 的一个**单纯逼近**。',
        '',
        '**推论**：设 $K$ 是有限单纯复形。则包含映射 $C_{*}(K) \\hookrightarrow S_{*}(|K|)$ 诱导同构',
        '',
        '$$H_{p}(K) \\;\\cong\\; H_{p}(|K|) \\qquad (\\text{对一切 } p).$$',
        '',
        '于是「多面体的奇异同调可以只按某个三角剖分算成单纯同调」，而后者是**有限矩阵**问题。',
      ].join('\n'),
      notes: [
        '⚠️ **本图的证明是骨架**，四条支柱：',
        '① **重分不改变同调**：重心重分给出链映射 $\\operatorname{sd} : C_{*}(K) \\to C_{*}(K\')$（把每个单纯形映成' +
          '「以它的重心为锥顶、锥在它的一个面上」的链，符号由顶点全序决定），它诱导同调同构——' +
          '构造一条反向链同伦即可（关键事实：重分后每个小单纯形的顶点集都落在原来某个单纯形里）；',
        '② **切细到落进星里**：取 $L$ 的**星形**开覆盖 $\\{\\operatorname{st}(w)\\}_{w \\in V(L)}$。' +
          '$f$ 连续、$|K|$ 紧，故由 Lebesgue 数可取 $m$ 使 $K^{(m)}$ 的每个单纯形的像都落在**同一个** $\\operatorname{st}(w)$ 里；',
        '③ **选顶点得单纯映射**：可以把 $K^{(m)}$ 的每个顶点 $v$ 送到某个使 $|f|(v) \\in \\operatorname{st}(w)$ 的 $w$，' +
          '并且选得使每条单纯形的顶点像构成 $L$ 的一个单纯形（星形覆盖保证这一点能做）；',
        '④ **同伦**：$\\operatorname{st}(w)$ 是凸的，所以 $|g|(x)$ 与 $f(x)$ 之间的线段整个留在里面，' +
          '$H(x, t) := (1 - t)|g|(x) + t f(x)$ 是有定义的连续同伦。',
        '',
        '⚠️ ① 与 ④ 的技术细节（符号追踪、链同伦的显式公式）本图**没有**写出来，' +
          '这是本节最容易被低估的地方。',
        '',
        '⭐ **推论为什么值钱**：它一次性给出三件事——' +
          '（i）单纯同调是拓扑不变量（不依赖三角剖分）；（ii）可以用有限矩阵的秩计算奇异同调；' +
          '（iii）Euler 示性数的公式可以搬到奇异同调上（见 `thm.euler-characteristic` 的边）。',
        '',
        '💡 一句话：**连续映射 $\\approx$ 重分之后的单纯映射**。拓扑在这里被「组合化」了一次。',
      ].join('\n'),
      refs: [
        'Munkres, Elements of Algebraic Topology · 单纯逼近定理（本图不给章号 / 定理号）',
        'Hatcher, Algebraic Topology, Ch. 2 §2.1 · simplicial approximation',
      ],
    },
  ],

  edges: [
    /* ------------------------------------------------ §A 单纯复形与链复形 */
    { kind: 'definition', definition: 'def.standard-simplex', usedBy: 'def.simplicial-complex',
      note: '复形里的一个 $p$-单纯形就是「$\\Delta^{p}$ 在仿射无关点集上的线性像」的顶点集；' +
        '闭包性质 $\\emptyset \\ne \\tau \\subseteq \\sigma$ 对应「取某个面 $d_{i}$」。' },

    { kind: 'definition', definition: 'def.standard-simplex', usedBy: 'def.simplicial-boundary',
      note: '边缘算子里的 $[v_{0}, \\ldots, \\widehat{v_{i}}, \\ldots, v_{p}]$ 就是「跳过第 $i$ 个顶点」，' +
        '即把面映射 $d_{i}$ 用在有序顶点上。' },

    { kind: 'definition', definition: 'def.simplicial-complex', usedBy: 'def.simplicial-map',
      note: '单纯映射是**顶点层面**的映射；只要它把每个单纯形送进某个单纯形，$|f|$ 就由线性延拓唯一确定。' },

    { kind: 'definition', definition: 'def.simplicial-complex', usedBy: 'def.chain-group',
      note: '链群的基就是 $K$ 的全体 $p$-单纯形——所以「复形是什么」决定了「链群是什么」。' },

    { kind: 'definition', definition: 'def.chain-group', usedBy: 'def.simplicial-boundary',
      note: '$\\partial_{p} : C_{p}(K) \\to C_{p-1}(K)$ 只在**基**上规定，再线性延拓。' +
        '这正是自由阿贝尔群的用处：基上的规定自动给出唯一的群同态，不需要任何相容性验证。' },

    { kind: 'definition', definition: 'def.simplicial-boundary', usedBy: 'def.simplicial-homology',
      note: '$Z_{p} := \\ker\\partial_{p}$、$B_{p} := \\operatorname{im}\\partial_{p+1}$；' +
        '$\\partial^{2} = 0$ 保证 $B_{p} \\subseteq Z_{p}$，商群才做得出来。没有 $\\partial^{2} = 0$，同调无定义。' },

    { kind: 'definition', definition: 'def.simplicial-homology', usedBy: 'def.simplicial-map',
      note: '$\\varphi_{*}$ 的定义要用同调群；而它良定义靠 $\\varphi_{\\#}\\partial = \\partial\\varphi_{\\#}$：' +
        '闭链送闭链、边缘送边缘，故过商这一步不被破坏。' },

    /* ---------------------------------------------- §B 奇异同调与约化同调 */
    { kind: 'definition', definition: 'def.simplicial-homology', usedBy: 'def.singular-homology',
      note: '整套定义逐字照搬，只换两处：基从「$p$-单纯形」换成「连续映射 $\\Delta^{p} \\to X$」，' +
        '边缘从「删顶点」换成「复合 $d_{i}$」。' },

    { kind: 'definition', definition: 'def.singular-homology', usedBy: 'def.reduced-homology',
      note: '约化同调只是在 $S_{0}$ 后面多接一个增广 $\\varepsilon : S_{0} \\to \\mathbb{Z}$；' +
        '$p \\ge 1$ 的部分与奇异同调完全一致。' },

    { kind: 'implication', sources: ['def.singular-homology'], target: 'prop.h0-components',
      title: '$0$-链的边界恰好是「同一分支里两点之差」',
      proof: [
        '**$S_{0}(X)$ 长什么样**：$\\Delta^{0}$ 是单点，所以奇异 $0$-单纯形就是「在 $X$ 里挑一个点」。' +
          '故 $S_{0}(X)$ 是以 $X$ 的点为基的自由阿贝尔群（只允许有限和），' +
          '与 $\\bigoplus_{x \\in X} \\mathbb{Z}$ 同构。',
        '',
        '**$\\partial_{1}$ 是什么**：设 $\\sigma : \\Delta^{1} \\to X$ 是奇异 $1$-单纯形（就是一条道路），' +
          '$\\partial\\sigma = \\sigma \\circ d_{1} - \\sigma \\circ d_{0}$。' +
          '而 $d_{0}, d_{1}$ 把 $\\Delta^{0}$ 放进 $\\Delta^{1}$ 的两个端点，' +
          '于是 $\\partial\\sigma = \\sigma(1) - \\sigma(0)$：**终点减起点**。',
        '',
        '**$B_{0}$ 由谁生成**：$\\operatorname{im}\\partial_{1}$ 由所有 $\\{\\sigma(1) - \\sigma(0)\\}$ 生成。' +
          '而 $\\sigma(\\Delta^{1})$ 整条落在同一个道路连通分支里，所以每个生成元都是「同分支两点之差」。' +
          '反过来，同分支的任意两点 $x, y$ 之间有一条道路 $\\sigma$，给 $y - x$，故' +
          '$B_{0} = \\left\\langle y - x : x, y \\text{ 在同一分支}\\right\\rangle$。',
        '',
        '**商出 $H_{0}$**：在 $S_{0}/B_{0}$ 里，同分支的点类相同；不同分支之间没有关系' +
          '（因为 $\\partial_{1}$ 不跨分支）。取每个分支 $C$ 一点 $x_{C}$，则 $\\{[x_{C}]\\}$ 是一组 $\\mathbb{Z}$-基：' +
          '任意 $0$-链 $\\sum n_{x} x$ 先按分支归并成 $\\sum_{C} m_{C}\\, x_{C}$（$m_{C} = \\sum_{x \\in C} n_{x}$），' +
          '这正好是它在 $H_{0}$ 里的类。故 $H_{0}(X) \\cong \\bigoplus_{\\pi_{0}(X)} \\mathbb{Z}$。',
        '',
        '**约化版**：$\\varepsilon(\\sum n_{x} x) = \\sum n_{x}$，且 $\\varepsilon\\partial_{1} = 0$ 说明 $B_{0} \\subseteq \\ker\\varepsilon$。' +
          '于是 $\\tilde{H}_{0} = \\ker\\varepsilon / B_{0} \\cong \\bigoplus_{\\pi_{0}(X)} \\mathbb{Z} \\big/ \\mathbb{Z}\\cdot(\\text{对角})$，' +
          '秩为 $\\#\\pi_{0}(X) - 1$。特别地 $\\tilde{H}_{0} = 0 \\iff \\#\\pi_{0} = 1 \\iff X$ 道路连通。∎',
      ].join('\n'),
      note: '整条论证只用到「$\\partial$ 作用在一条道路上给出两端之差」这一个事实。' },

    /* -------------------------------------------------- §C 长正合列与 MV */
    { kind: 'implication', sources: ['def.singular-homology'], target: 'thm.long-exact-pair',
      title: '短正合列 $0 \\to S_{*}(A) \\to S_{*}(X) \\to S_{*}(X,A) \\to 0$ 加追图给出连接同态',
      proof: [
        '**子复形**：对 $A \\subseteq X$，包含 $i : A \\hookrightarrow X$ 给出 $S_{p}(A) \\to S_{p}(X)$，$\\sigma \\mapsto i \\circ \\sigma$。' +
          '它是单射（作为自由群上的映射，基映射是单射），像是「完全落在 $A$ 里的奇异单纯形」生成的子群，' +
          '而 $\\partial(i \\circ \\sigma) = i \\circ (\\partial\\sigma)$ 仍落在 $A$ 里 —— 所以 $S_{*}(A)$ 是**子复形**。',
        '',
        '**过商**：$S_{p}(X, A) := S_{p}(X)/S_{p}(A)$。因为 $\\partial$ 保持 $S_{p}(A)$，它过商给出 $\\bar\\partial$，' +
          '并且 $\\bar\\partial^{2} = 0$ 由 $\\partial^{2} = 0$ 直接继承。于是 $H_{p}(X,A) := \\ker\\bar\\partial/\\operatorname{im}\\bar\\partial$ 有意义。',
        '',
        '**逐项短正合**：对每个固定的 $p$ 有',
        '',
        '$$0 \\to S_{p}(A) \\to S_{p}(X) \\to S_{p}(X, A) \\to 0,$$',
        '',
        '而且三个系统之间由 $\\partial, \\bar\\partial$ 连接（$A$ 里的链参与的是同一个 $\\partial$，所以图交换）。',
        '',
        '**追图给 $\\partial_{*}$**：对 $[c] \\in H_{p}(X, A)$，取代表 $c \\in S_{p}(X)$。' +
          '「$c$ 是相对闭链」的意思是 $\\bar\\partial[c] = 0$，即 $\\partial c \\in S_{p-1}(A)$ —— ' +
          '**这正好让 $\\partial c$ 可以被看成 $H_{p-1}(A)$ 的元素**。令',
        '',
        '$$\\partial_{*}[c] := [\\partial c] \\in H_{p-1}(A).$$',
        '',
        '三件要验的事：① $\\partial c \\in Z_{p-1}(A)$（因为 $\\partial\\partial = 0$）；' +
          '② 换代表元 $c \\mapsto c + \\partial b + a$（$a \\in S_{p}(A)$）时，$\\partial c$ 只变一个 $A$ 里的边缘，类不变；' +
          '③ 三段正合性 $\\operatorname{im} = \\ker$ 各追一次图。',
        '',
        '⚠️ 第 ③ 步本图**不展开**：它是标准的图追踪，写全要一整页纸。上面给的是完整结构。∎',
      ].join('\n'),
      note: '关键在于「相对闭链」的定义恰好保证 $\\partial c$ 掉进 $S_{p-1}(A)$ —— 连接同态就是这样被逼出来的。' },

    { kind: 'definition', definition: 'def.exact-sequence', usedBy: 'thm.long-exact-pair',
      note: '「长正合列」就是 `def.exact-sequence` 意义上的正合：每处 $\\operatorname{im} = \\ker$。' +
        '⚠️ 这里的链由**同调群**连成，不是链复形本身——正合性说的是这三个映射的像与核相等。' },

    { kind: 'implication', sources: ['thm.long-exact-pair'], target: 'thm.mv-homology',
      title: '对 $(X, U)$ 的长正合列 $+$ 重心重分 $\\implies$ Mayer–Vietoris',
      proof: [
        '**第一步（代数）**：设 $X = U \\cup V$。记 $S_{*}(U) + S_{*}(V) \\subseteq S_{*}(X)$ 为「落在 $U$ 里的」与' +
          '「落在 $V$ 里的」奇异单纯形共同生成的子复形。有',
        '',
        '$$0 \\to S_{*}(U \\cap V) \\to S_{*}(U) \\oplus S_{*}(V)$$',
        '$$\\to S_{*}(U) + S_{*}(V) \\to 0,$$',
        '',
        '其中第一个映射是 $a \\mapsto (a, -a)$，第二个是 $(a, b) \\mapsto a + b$。' +
          '单射性：$a$ 在 $U$ 与 $V$ 里同时为零说明 $a = 0$；正合性：$a + b = 0$ 时 $a = -b$ 落在两边，故来自 $U \\cap V$。' +
          '再由 `thm.long-exact-pair` 的追图，得一条三项一片的长正合列：' +
          '$H_{p}(U \\cap V) \\to H_{p}(U) \\oplus H_{p}(V) \\to H_{p}(S_{*}(U) + S_{*}(V)) \\xrightarrow{\\partial_{*}} H_{p-1}(U \\cap V)$。',
        '',
        '**第二步（几何，本图的骨架所在）**：包含 $S_{*}(U) + S_{*}(V) \\hookrightarrow S_{*}(X)$ 诱导**同调同构**。' +
          '证明靠**小单纯形引理 / 重心重分**：给定奇异 $p$-单纯形 $\\sigma : \\Delta^{p} \\to X$，' +
          '$\\{\\sigma^{-1}(U),\\ \\sigma^{-1}(V)\\}$ 是紧空间 $\\Delta^{p}$ 的开覆盖；' +
          '取它的 Lebesgue 数 $\\delta > 0$，反复重心重分直到每个小单纯形的直径 $< \\delta$。' +
          '这时每个小单纯形的像整体落在 $U$ 或 $V$ 里，于是 $\\sigma$ 与 $S_{*}(U)+S_{*}(V)$ 里的某个链**同调**。' +
          '重分链映射 $\\operatorname{sd} : S_{*}(X) \\to S_{*}(U) + S_{*}(V)$ 与包含互为链同伦逆，' +
          '故诱导的映射是双射。',
        '',
        '**合起来**：把第一步的序列里 $H_{p}(S_{*}(U)+S_{*}(V))$ 换成 $H_{p}(X)$，就是 Mayer–Vietoris。∎',
      ].join('\n'),
      note: '⭐ 第二步是全部难点：没有重细分，「局部在 $U$ 或 $V$」与「整体同调等价」之间没有桥。' },

    /* ------------------------------------------------ §D 球面与 Euler 示性数 */
    { kind: 'implication', sources: ['thm.mv-homology', 'prop.h0-components'], target: 'thm.sphere-homology',
      title: '两个可缩开半球 + 交叠形变收缩到赤道 $\\implies$ 只剩两个非零',
      proof: [
        '**开覆盖**：令 $U := S^{n} \\setminus \\{\\text{南极 } N\\}$、$V := S^{n} \\setminus \\{\\text{北极 } S\\}$。两者都是开集且覆盖 $S^{n}$，' +
          '各自经球极投影同胚于 $\\mathbb{R}^{n}$，因而可缩。',
        '',
        '**可缩 $\\implies$ 约化同调为零**：恒等映射 $\\simeq$ 常值映射，同调不变性给出两者诱导相同的映射；' +
          '而常值映射在约化同调上是零（$\\tilde{H}_{0}$ 上：$\\varepsilon(1 \\cdot x) = 1$ 但约化同调里点类为零；' +
          '$p \\ge 1$ 上：链映射经过 $S_{*}(\\mathrm{pt})$，那里没有正维数的链）。' +
          '故 $\\tilde{H}_{p}(U) = \\tilde{H}_{p}(V) = 0$ 对一切 $p$。',
        '',
        '**交叠**：$U \\cap V = S^{n} \\setminus \\{N, S\\}$ 沿经线把每点推到赤道，给出到 $S^{n-1}$ 的**形变收缩**，' +
          '故 $\\tilde{H}_{p}(U \\cap V) \\cong \\tilde{H}_{p}(S^{n-1})$。',
        '',
        '**代入 MV（约化版）**：序列在每处 $p$ 上是',
        '',
        '$$\\tilde{H}_{p}(U \\cap V) \\to 0 \\to \\tilde{H}_{p}(S^{n})$$',
        '$$\\to \\tilde{H}_{p-1}(U \\cap V) \\to 0,$$',
        '',
        '（这两处 $0$ 是 $\\tilde{H}_{p}(U) \\oplus \\tilde{H}_{p}(V)$，两块都为零。）',
        '',
        '两端为零 $\\implies$ 中间的映射被夹成同构：$\\tilde{H}_{p}(S^{n}) \\cong \\tilde{H}_{p-1}(U \\cap V) \\cong \\tilde{H}_{p-1}(S^{n-1})$。',
        '',
        '**基础情形** $n = 0$：$S^{0}$ 是两点，由 `prop.h0-components`，$H_{0}(S^{0}) = \\mathbb{Z}^{2}$，' +
          '取约化得 $\\tilde{H}_{0}(S^{0}) = \\mathbb{Z}$。',
        '',
        '**归纳**：反复用上式把维数降下来，得 $\\tilde{H}_{p}(S^{n}) = \\tilde{H}_{p-(n)}(S^{0})$ 型的平移，' +
          '故只有 $p = n$ 处为 $\\mathbb{Z}$、其余为零。非约化版 $H_{0} = \\mathbb{Z}$（$n \\ge 1$ 连通）与之相容。∎',
      ].join('\n'),
      note: '这条链子用到了「同伦不变性」（写在 `def.singular-homology` 的陈述里）与 MV 的骨架证明，如实标注。' },

    { kind: 'implication', sources: ['def.chain-group', 'def.simplicial-homology'], target: 'thm.euler-characteristic',
      title: '两次秩-零化度，边缘群的维数在交错和里相消',
      proof: [
        '设 $K$ 有限，$\\alpha_{p} = \\dim_{\\mathbb{Q}} C_{p}$（即 $p$-单纯形个数），' +
          '$z_{p} = \\operatorname{rank} Z_{p}$、$b_{p} = \\operatorname{rank} B_{p} = \\operatorname{rank}\\partial_{p+1}$、' +
          '$h_{p} = \\operatorname{rank} H_{p}$。这些数都有限（$\\mathbb{Z}$ 是主理想整环，子模自由）。',
        '',
        '**第一次秩-零化度**（对 $\\partial_{p} : C_{p} \\to C_{p-1}$）：',
        '',
        '$$\\alpha_{p} = \\dim\\ker\\partial_{p} + \\operatorname{rank}\\partial_{p} = z_{p} + b_{p-1}.$$',
        '',
        '**第二次**（用在 $0 \\to Z_{p} \\to C_{p} \\to B_{p-1} \\to 0$ 之后，或直接看商）：因为 $H_{p} = Z_{p}/B_{p}$，',
        '',
        '$$z_{p} = b_{p} + h_{p}.$$',
        '',
        '**代入**，得 $\\alpha_{p} = b_{p} + h_{p} + b_{p-1}$。交错求和：',
        '',
        '$$\\sum_{p} (-1)^{p}\\alpha_{p} = \\sum_{p} (-1)^{p} h_{p} + S_{1} - S_{2},$$',
        '',
        '其中 $S_{1} := \\sum_{p} (-1)^{p} b_{p}$、$S_{2} := \\sum_{p} (-1)^{p-1} b_{p-1}$。这两个是**同一个和**' +
        '（只是把下标 $p - 1$ 换成 $p$），故 $S_{1} = S_{2}$、恰好相消，剩下 $\\sum_{p}(-1)^{p} h_{p}$。' +
          '而 $h_{p} = \\beta_{p}$ 就是 Betti 数。∎',
      ].join('\n'),
      note: '「相消」是这条定理的全部内容：边缘群 $b_{p}$ 在相邻两项里符号相反，数得再多也看不见。' },

    { kind: 'implication', sources: ['def.simplicial-homology', 'def.singular-homology'], target: 'thm.simplicial-approximation',
      title: '重分 + Lebesgue 数 + 星形凸性 $\\implies$ 连续映射可组合化',
      proof: [
        '目标是证明 $H_{p}(K) \\to H_{p}(|K|)$（把 $p$-单纯形看成奇异 $p$-单纯形）是同构。四步：',
        '',
        '**① 重分不改变同调**。重心重分 $K\'$ 的顶点是 $K$ 的单纯形的重心。' +
          '定义 $\\operatorname{sd} : C_{*}(K) \\to C_{*}(K\')$：对 $\\sigma = [v_{0}, \\ldots, v_{p}]$ 令' +
          '$\\operatorname{sd}(\\sigma)$ 为「以 $\\hat\\sigma$ 为锥顶、锥在 $\\operatorname{sd}(\\partial\\sigma)$ 上」的链' +
          '（符号由「$\\hat\\sigma$ 放在全序的最前面」决定）。关键组合事实是：重分后每个小单纯形的顶点集都落在原来**某个**单纯形里。' +
          '由此可以造出链映射 $C_{*}(K\') \\to C_{*}(K)$（把每个小单纯形的顶点映到包含它的那个老单纯形的一个顶点，需要一点选择与一致性论证），' +
          '二者互为链同伦逆，故诱导同调同构。',
        '',
        '**② 切细到落进星里**。取 $L$ 的星形开覆盖 $\\{\\operatorname{st}(w) : w \\in V(L)\\}$（$\\operatorname{st}(w)$ = 含 $w$ 的单纯形的内部之并）。' +
          '它是 $|L|$ 的开覆盖，$|f|^{-1}$ 把它拉回 $|K|$ 的开覆盖；$|K|$ 紧且 $K^{(m)}$ 的单纯形直径随 $m$ 单调趋零，' +
          '故存在 $m$ 使 $K^{(m)}$ 的每个单纯形 $\\tau$ 的像 $f(\\tau)$ 整体落在**同一个** $\\operatorname{st}(w)$ 里（Lebesgue 数）。',
        '',
        '**③ 选顶点**。给 $K^{(m)}$ 的每个顶点 $v$ 取一个 $g(v) := w$ 使 $f(v) \\in \\operatorname{st}(w)$，' +
          '并且选得使「同一条单纯形的顶点像」在 $L$ 里两两相邻（即构成 $L$ 的一个单纯形）。' +
          '这一步能做，正是因为 $\\tau$ 的像落在单个星里：星是「含某个顶点的所有单纯形之并」，' +
          '所以任取 $w$ 使 $f(\\tau) \\subseteq \\operatorname{st}(w)$，把 $\\tau$ 的全部顶点都送到 $w$ 也合法（退化情形），' +
          '再逐顶点修正即成。于是得到单纯映射 $g : K^{(m)} \\to L$。',
        '',
        '**④ 同伦**。$\\operatorname{st}(w)$ 是**凸**的（它是若干含 $w$ 的单纯形的并，而每个都含 $w$，故并也凸）。' +
          '对 $x$ 所在的小单纯形 $\\tau$，$|g|(x)$ 与 $f(x)$ 都在同一个 $\\operatorname{st}(w)$ 里，' +
          '所以 $H(x, t) := (1 - t)|g|(x) + t\\,f(x)$ 有定义、连续，且 $H(\\cdot, 0) = |g|$、$H(\\cdot, 1) = f$。',
        '',
        '**收尾**：由 ④，$|g| \\simeq f$，故两者在奇异同调上诱导同一映射；' +
          '而 $|g|$ 是有限复形之间的单纯映射，它的效果在 ① 的意义下与 $g$ 的链映射一致。' +
          '把 $m$ 次重分都按 ① 抵消掉，即得 $H_{p}(K) \\cong H_{p}(|K|)$。∎',
      ].join('\n'),
      note: '⚠️ 骨架：① 的一致性论证与 ③ 的顶点选择细节没有逐条写；这两处是本节最容易出错的地方。' },

    { kind: 'implication', sources: ['thm.simplicial-approximation'], target: 'thm.euler-characteristic',
      title: '奇异同调 $=$ 单纯同调 $\\implies$ $\\chi$ 与三角剖分无关',
      proof: [
        '设 $X = |K| = |K\'|$ 是同一个空间的两个**有限**三角剖分。' +
          '由 `thm.simplicial-approximation`，',
        '',
        '$$H_{p}(K) \\cong H_{p}(X) \\cong H_{p}(K\'),$$',
        '',
        '故两个剖分的 Betti 数 $\\beta_{p}$ 完全相同。再由 `thm.euler-characteristic` 的等式，',
        '',
        '$$\\sum_{p} (-1)^{p}\\alpha_{p}(K) = \\sum_{p} (-1)^{p}\\beta_{p},$$',
        '$$\\sum_{p} (-1)^{p}\\alpha_{p}(K\') = \\sum_{p} (-1)^{p}\\beta_{p}.$$',
        '',
        '所以 $\\chi$ 只依赖 $X$ 本身，可以记作 $\\chi(X)$。∎',
      ].join('\n'),
      note: '没有这一条，$\\chi$ 只是「某个三角剖分上数单纯形」的结果，换个剖分就可能有别的值。' },

    /* ------------------------------------------------------------ 弱边 */
    { kind: 'analogy', a: 'def.fundamental-group', b: 'def.singular-homology',
      title: '$\\pi_{1}$ 与 $H_{1}$：一维的两种探针，一个记得非交换，一个不记得',
      note: [
        '本图**没有** Hurewicz 定理这个节点，所以这条只能作为**联想线索**记在这里，不当依赖边用。' +
          '（硬事实：$X$ 道路连通时 $H_{1}(X) \\cong \\pi_{1}(X)^{\\mathrm{ab}}$，' +
          '即「忘掉非交换性之后两者一致」。）',
        '',
        '**相通之处（一句话）**：两者都在数「一维的洞」——一条闭道路若不能缩，它就代表一个非平凡元素；' +
          '把它当成一条闭 $1$-链看，它非零当且仅当它不是某块 $2$ 链的边界。**同一个圈，两种读法。**',
        '',
        '**差别（这才是关键）**：',
        '- $\\pi_{1}$ 非阿贝尔，记得「先绕 A 再绕 B」与「先绕 B 再绕 A」的区别；$H_{1}$ 是阿贝尔群，一律抹平。' +
          '所以 $H_{1}$ 便宜得多（有长正合列、有 MV、能用矩阵算），$\\pi_{1}$ 强得多。',
        '- $H_{1}$ 看得见挠部：$\\mathbb{RP}^{2}$ 的 $\\pi_{1} = \\mathbb{Z}/2$ 而 $H_{1} = \\mathbb{Z}/2$；' +
          '但环面 $T^{2}$ 的 $\\pi_{1} = \\mathbb{Z}^{2} = H_{1}$，两者在这里完全一样。',
        '',
        '**招数上的相通**：两边证「不是零」的手法一模一样 —— 造一个**同态**（$\\pi_{1} \\to \\mathbb{Z}$ 的度数、' +
          '$H_{1} \\to \\mathbb{Z}$ 的取系数），让候选对象在它下面不为零。' +
          '`thm.pi1-circle` 用度数，`thm.sphere-homology` 用 MV 把一个类逼出来，本质是同一件事。',
        '',
        '💡 卡在「这个圈到底能不能缩」时：先算便宜的 $H_{1}$（能算）；若 $H_{1} = 0$ 而你想推翻，' +
          '就得回到 $\\pi_{1}$（可能是完美群，$H_{1}$ 看不见）。反过来若 $H_{1} \\ne 0$，$\\pi_{1}$ 必定非平凡，' +
          '这条捷径几乎每次都值得先试。',
      ].join('\n') },
  ],
});
