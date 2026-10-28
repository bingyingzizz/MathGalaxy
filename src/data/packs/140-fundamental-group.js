/* ============================================================================
   内容包 · 基本群（拓扑学 · 代数拓扑第一团）
   这一团要造出的「能用的东西」是 pi_1 这台机器，链条是：
     映射同伦 → 道路同伦 → 同伦类上的拼接 → 基本群 π₁ → 诱导同态
     → 基点变换 → 单连通 → 覆叠与提升 → 覆叠的指数
     → π₁(S¹) = ℤ → 圆盘不能收缩 → Brouwer 不动点 → van Kampen → π₁(Sⁿ) = 1
   结构约定：
     · 黑边（implication / definition / equivalence）= 依赖骨架，必须无环
     · 紫虚线（analogy）= 弱边，只做「换个地方想想」的跳跃
   引用口径：Munkres, Topology (2nd ed.) 只给章名 / 节名，**不给节号与定理号**
   （哪些节号我没把握，见包的提交说明里的存疑清单）。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '基本群',
  nodes: [
    {
      id: 'def.homotopy-maps',
      type: 'definition',
      label: '映射同伦',
      title: '同伦：映射之间的一整段连续形变',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '同伦', '同伦型'],
      statement: [
        '设 $X, Y$ 是拓扑空间，$f, g : X \\to Y$ 连续。称 $f$ **同伦于** $g$，如果存在连续映射',
        '',
        '$$F : X \\times [0, 1] \\longrightarrow Y$$',
        '',
        '使 $F(x, 0) = f(x)$ 且 $F(x, 1) = g(x)$ 对一切 $x \\in X$ 成立。记 $f \\simeq g$，',
        '把 $F$ 叫一个**同伦**（也叫同伦映射）。',
        '',
        '设 $A \\subseteq X$。若还有 $F(a, t) = f(a) = g(a)$ 对一切 $a \\in A$、$t \\in [0, 1]$ 成立，',
        '则称 $f$ 与 $g$ **相对于 $A$ 同伦**，记 $f \\simeq g \\; (\\operatorname{rel} A)$。',
        '',
        '两个空间**同伦等价**，如果存在连续 $f : X \\to Y$、$h : Y \\to X$ 使 ',
        '$h \\circ f \\simeq 1_{X}$ 且 $f \\circ h \\simeq 1_{Y}$；这时说 $X, Y$ 有相同的**同伦型**。',
        '与某个单点同伦等价的空间叫**可缩的**。',
      ].join('\n'),
      notes: [
        '**为什么是 $X \\times [0, 1]$ 而不是「每个 $t$ 一个映射」**：$F$ 要求**联合连续**。' +
          '「对每个 $t$，$F(\\cdot, t)$ 连续」弱得多，那样任何两个映射都同伦（取 $F(x, t) := f(x)$ 之类拼一拼），' +
          '整套理论就垮了。',
        '',
        '**同伦是等价关系**：$f \\simeq f$（取 $F(x, t) = f(x)$）；对称（$F(x, 1 - t)$）；' +
          '传递（把两个同伦按 $[0, 1/2]$、$[1/2, 1]$ 拼接，用粘贴引理保证连续）。',
        '',
        '⭐ **同伦等价是比同胚粗得多的关系**，这正是它的用处：$\\mathbb{R}^n$ 与单点同伦等价（凸集可缩），' +
          '但不同胚。凡是同伦不变的量（基本群、同调群）都能直接拿来分辨「不同伦型」。',
        '',
        '⚠️ 可缩**不**等于「可以连续收缩到一点且每步都是同胚」——后者太强（只有单点有）。' +
          '可缩只要求形变过程里映射一直连续，允许它一路把维数压掉。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · Homotopy of Paths',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · Homotopy and homotopy type',
      ],
    },
    {
      id: 'def.path-homotopy',
      type: 'definition',
      label: '道路同伦',
      title: '道路与固定端点的同伦：同伦类 $[\\alpha]$',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '道路', '同伦类'],
      statement: [
        '$X$ 中的一条**道路**是连续映射 $\\alpha : [0, 1] \\to X$；$\\alpha(0)$ 是**起点**，$\\alpha(1)$ 是**终点**。',
        '起点与终点都是 $x_{0}$ 的道路叫**闭道路**（也叫以 $x_{0}$ 为基点的环路）。',
        '',
        '设 $\\alpha, \\beta$ 是有相同起点 $x_{0}$、相同终点 $x_{1}$ 的两条道路。称它们**道路同伦**，',
        '如果存在连续 $F : [0, 1] \\times [0, 1] \\to X$ 使',
        '',
        '$$F(t, 0) = \\alpha(t),\\qquad F(t, 1) = \\beta(t),$$',
        '$$F(0, s) = x_{0},\\qquad F(1, s) = x_{1},$$',
        '',
        '记 $\\alpha \\simeq_{p} \\beta$。也就是 $\\alpha \\simeq \\beta \\; (\\operatorname{rel} \\{0, 1\\})$。',
        '',
        '$\\alpha$ 的**道路同伦类**记作 $[\\alpha]$，即 $\\{\\, \\beta : \\beta \\simeq_{p} \\alpha \\,\\}$。',
        '闭道路的道路同伦类也叫**同伦类**（基于 $x_{0}$）。',
      ].join('\n'),
      notes: [
        '**为什么必须钉死端点**：$[0, 1]$ 是凸的、可缩的，所以**任何**两条道路都同伦（把 $\\alpha$ 沿直线缩到点再拉成 $\\beta$）。' +
          '不钉端点的同伦把所有道路糊成一类，什么也分辨不出来；钉死端点之后才剩下「绕法」这个信息。',
        '',
        '⚠️ 道路同伦**只对有共同端点的道路有意义**——否则 $F(0, s)$ 与 $F(1, s)$ 的条件本身写不出来。',
        '',
        '**同伦类是等价类**：由 `def.homotopy-maps` 里说的三条性质，限制到「端点不动」的同伦上也照样成立。' +
          '所以固定 $x_{0}, x_{1}$ 后，从 $x_{0}$ 到 $x_{1}$ 的道路被切成若干同伦类。',
        '',
        '💡 直观：同伦类 = 「从 $x_{0}$ 走到 $x_{1}$ 的不同走法」，两走过去可以互相连续变形则算同一种。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · Homotopy of Paths',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · Paths and homotopy',
      ],
    },
    {
      id: 'lem.path-product',
      type: 'lemma',
      label: '道路拼接',
      title: '道路的拼接与同伦类上的群算律',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '道路拼接', '基本群', '重参数化'],
      statement: [
        '设 $\\alpha$ 是从 $x_{0}$ 到 $x_{1}$ 的道路、$\\beta$ 是从 $x_{1}$ 到 $x_{2}$ 的道路。它们的**拼接**是「先走 $\\alpha$，再走 $\\beta$，各用一半时间」：',
        '',
        '$$(\\alpha * \\beta)(t) = \\alpha(2t) \\quad (0 \\le t \\le \\tfrac{1}{2}),$$',
        '$$(\\alpha * \\beta)(t) = \\beta(2t - 1) \\quad (\\tfrac{1}{2} \\le t \\le 1).$$',
        '',
        '由粘贴引理，$\\alpha * \\beta$ 连续，是从 $x_{0}$ 到 $x_{2}$ 的道路。此外记 $\\bar{\\alpha}(t) := \\alpha(1 - t)$（**反向道路**），' +
          '$e_{x}$ 表示常值道路 $t \\mapsto x$。则有：',
        '',
        '1. **良定义**：$\\alpha \\simeq_{p} \\alpha\'$ 且 $\\beta \\simeq_{p} \\beta\'$ $\\implies$ $\\alpha * \\beta \\simeq_{p} \\alpha\' * \\beta\'$；',
        '2. **结合律**：$(\\alpha * \\beta) * \\gamma \\simeq_{p} \\alpha * (\\beta * \\gamma)$；',
        '3. **单位**：$e_{x_{0}} * \\alpha \\simeq_{p} \\alpha \\simeq_{p} \\alpha * e_{x_{1}}$；',
        '4. **逆**：$\\alpha * \\bar{\\alpha} \\simeq_{p} e_{x_{0}}$ 且 $\\bar{\\alpha} * \\alpha \\simeq_{p} e_{x_{1}}$。',
        '',
        '于是「以 $x_{0}$ 为基点的闭道路同伦类」带上乘法 $[\\alpha][\\beta] := [\\alpha * \\beta]$ 构成一个群。',
      ].join('\n'),
      notes: [
        '⚠️ **这四条都不是道路层面的等式**。$(\\alpha * \\beta) * \\gamma$ 与 $\\alpha * (\\beta * \\gamma)$ 在 $t = 1/4, 1/2$ 处的值根本不同；' +
          '它们只是**同伦**。所以乘法必须定义在**同伦类**上。',
        '',
        '**重参数化是全部技巧**：若 $\\varphi : [0, 1] \\to [0, 1]$ 连续、$\\varphi(0) = 0$、$\\varphi(1) = 1$，' +
          '则 $\\alpha \\circ \\varphi \\simeq_{p} \\alpha$，同伦取 $F(t, s) := \\alpha((1 - s)\\,\\varphi(t) + s\\,t)$。' +
          '结合律就是把 $\\varphi$ 取成「按 $1/4, 1/2, 1/4$ 分段」的那个重参数化。',
        '',
        '⭐ 单位律里那个同伦**不能**取 $F(t, s) = e_{x_{0}} * \\alpha$ 之类「不动」的东西：' +
          '单位律是真的要形变，不是等式。',
        '',
        '💡 一句话：**道路层面的乘法不好（不结合、没单位），同伦类层面的乘法很好（是群）**——' +
          '这就是为什么基本群要收「类」而不是「道路」。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · Homotopy of Paths（道路的乘积与四条算律）',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · the group structure on homotopy classes',
      ],
    },
    {
      id: 'def.fundamental-group',
      type: 'definition',
      label: '基本群',
      title: '基本群 $\\pi_{1}(X, x_{0})$：闭道路同伦类构成的群',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '基本群', '同伦不变量'],
      statement: [
        '固定基点 $x_{0} \\in X$。令',
        '',
        '$$\\Omega(X, x_{0}) := \\{\\, \\alpha : \\alpha(0) = \\alpha(1) = x_{0} \\,\\},$$',
        '',
        '其中 $\\alpha$ 取遍 $[0, 1] \\to X$ 的连续映射 —— 这是全部的闭道路。**基本群**定义为它的道路同伦类之集',
        '',
        '$$\\pi_{1}(X, x_{0}) := \\Omega(X, x_{0}) \\big/ \\simeq_{p},$$',
        '',
        '乘法取 $[\\alpha][\\beta] := [\\alpha * \\beta]$，单位元 $e = [e_{x_{0}}]$，逆元 $[\\alpha]^{-1} = [\\bar{\\alpha}]$。',
        '`lem.path-product` 保证这三样东西良定义且满足群公理，所以 $\\pi_{1}(X, x_{0})$ 确实是一个群。',
        '这里的构造只是「取商集 $+$ 拼接」，**没有**引用任何「满足某组性质的群」式的公理刻画。',
      ].join('\n'),
      notes: [
        '**元素是什么**：一个元素是一整类闭道路，不是一个闭道路。写 $[\\alpha] = [\\beta]$ 的意思就是 $\\alpha \\simeq_{p} \\beta$。' +
          '所以「$\\pi_{1}(X, x_{0}) = 1$」是说**每条闭道路都能在端点不动的前提下缩成一点**。',
        '',
        '**它与基点有关**：$\\pi_{1}(X, x_{0})$ 与 $\\pi_{1}(X, x_{1})$ 一般不同构为**典范**地同构；' +
          '只有当 $X$ 道路连通时才有（非典范的）同构，见 `prop.pi1-basepoint`。' +
          '所以严格说 $\\pi_{1}$ 是「带基点空间」的不变量。',
        '',
        '**不道路连通时** $\\pi_{1}$ 只看见基点所在的那个道路连通分支，其余分支的信息完全丢掉' +
          '（对比：$H_{0}$ 看得见所有分支，见 `prop.h0-components`）。',
        '',
        '⚠️ 记号：道路连通时人们常写 $\\pi_{1}(X)$（省掉基点）。这是**允许的偷懒**，' +
          '因为换基点只差一个内自同构；但如果 $\\pi_{1}$ 非阿贝尔，「差一个共轭」不是「相等」，涉及**具体元素**时要回到带基点的写法。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · The Fundamental Group',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · The fundamental group',
      ],
    },
    {
      id: 'prop.induced-homomorphism',
      type: 'proposition',
      label: '诱导同态',
      title: '连续映射诱导 $\\pi_{1}$ 的同态；$\\pi_{1}$ 是同伦不变函子',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '基本群', '函子性', '同伦不变'],
      statement: [
        '设 $f : X \\to Y$ 连续，$f(x_{0}) = y_{0}$。定义',
        '',
        '$$f_{*} : \\pi_{1}(X, x_{0}) \\longrightarrow \\pi_{1}(Y, y_{0}),$$',
        '$$f_{*}([\\alpha]) := [f \\circ \\alpha].$$',
        '',
        '则：',
        '',
        '1. **良定义**：$\\alpha \\simeq_{p} \\beta \\implies f \\circ \\alpha \\simeq_{p} f \\circ \\beta$；',
        '2. **同态**：$f_{*}([\\alpha][\\beta]) = f_{*}([\\alpha])\\,f_{*}([\\beta])$；',
        '3. **函子性**：$(1_{X})_{*} = \\operatorname{id}$，且 $(g \\circ f)_{*} = g_{*} \\circ f_{*}$；',
        '4. **同伦不变**：若 $f \\simeq g \\; (\\operatorname{rel} \\{x_{0}\\})$，则 $f_{*} = g_{*}$。',
        '',
        '因此 $\\pi_{1}$ 是从「带基点拓扑空间」到「群」的**函子**。',
      ].join('\n'),
      notes: [
        '**四条的直接后果**：',
        '- 同胚 $f$ 给出同构 $f_{*}$（逆是同胚的逆），所以 $\\pi_{1}$ 是**拓扑不变量**；',
        '- 更强的，同伦等价给出同构——所以 $\\pi_{1}$ 也是**同伦不变量**，可缩空间的基本群必为 $1$；',
        '- 由 (3)，$\\pi_{1}$ 把「空间的复合」变成「群的复合」，**顺序不反**（与上同调的 $f^{*}$ 不同）。',
        '',
        '⚠️ 第 (4) 条要求**相对基点**：一般的同伦 $f \\simeq g$ 只保证 $g_{*}$ 与 $f_{*}$「差一个共轭」，' +
          '不是相等。这正是 `prop.pi1-basepoint` 要处理的事。',
        '',
        '💡 用法：要证「$\\pi_{1}$ 不同则空间不同胚」，只需找一个连续映射做不到的事（比如没有同构）。' +
          '要证「不能」的命题，函子性是最省力的工具——本团的 `thm.no-retraction-disk` 就是这么打的。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · The Fundamental Group（induced homomorphism）',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · induced homomorphisms',
      ],
    },
    {
      id: 'prop.pi1-basepoint',
      type: 'proposition',
      label: '基点变换',
      title: '沿道路换基点：同构，但彼此只差一个共轭',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '基本群', '基点', '共轭'],
      statement: [
        '设 $\\gamma : [0, 1] \\to X$ 是从 $x_{0}$ 到 $x_{1}$ 的道路，$\\bar{\\gamma}$ 是它的反向道路。定义',
        '',
        '$$\\Pi_{\\gamma} : \\pi_{1}(X, x_{0}) \\longrightarrow \\pi_{1}(X, x_{1}),$$',
        '$$\\Pi_{\\gamma}([\\alpha]) := [\\bar{\\gamma} * \\alpha * \\gamma].$$',
        '',
        '则 $\\Pi_{\\gamma}$ 是**群同构**，且 $\\Pi_{\\bar{\\gamma}} = \\Pi_{\\gamma}^{-1}$。',
        '',
        '若 $\\gamma\'$ 是另一条从 $x_{0}$ 到 $x_{1}$ 的道路，令 $g := [\\bar{\\gamma}\' * \\gamma] \\in \\pi_{1}(X, x_{1})$，则',
        '',
        '$$\\Pi_{\\gamma\'} = \\operatorname{ad}_{g} \\circ \\Pi_{\\gamma},\\qquad \\operatorname{ad}_{g}(u) := g\\,u\\,g^{-1}.$$',
        '',
        '即：不同的道路给出的同构**只差一个内自同构**。',
      ].join('\n'),
      notes: [
        '⭐ **结论**：$X$ 道路连通时，$\\pi_{1}(X, x_{0}) \\cong \\pi_{1}(X, x_{1})$，但这个同构不典范。' +
          '于是「$\\pi_{1}(X) = 1$」（单连通）是**良定义**的陈述，而「$\\pi_{1}(X) \\cong \\mathbb{Z}$ 且生成元是哪一个」不是。',
        '',
        '⚠️ 若 $\\pi_{1}$ 非阿贝尔，内自同构不一定是恒等，所以「共轭类」才是与基点无关的数据。' +
          '共轭类空间的另一种读法：$\\pi_{1}(X)$ 上的共轭作用 $\\leftrightarrow$ 空间里以 $x_{0}$ 为基点的闭道路的同伦类在「自由同伦」下的分类。',
        '',
        '**与 $\\pi_{0}$ 的对照**：$\\pi_{1}$ 靠「路径」连接不同基点；重排一下基点看，' +
          '这正是为什么道路连通性在这里是必要的（否则 $\\Pi_{\\gamma}$ 连定义都写不出）。',
        '',
        '💡 实践上：算 $\\pi_{1}$ 时先随便挑一个好算的基点，算完再用这条命题说「换基点不变」。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · The Fundamental Group（change of base point）',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · basepoint issues',
      ],
    },
    {
      id: 'def.simply-connected',
      type: 'definition',
      label: '单连通',
      title: '单连通：道路连通且基本群平凡',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '单连通', '基本群'],
      statement: [
        '拓扑空间 $X$ 叫**单连通的**，如果',
        '',
        '1. $X$ 道路连通，且',
        '2. $\\pi_{1}(X, x_{0}) = 1$ 对某个（等价地：对每个）$x_{0} \\in X$ 成立。',
        '',
        '由 `prop.pi1-basepoint`，条件 2 挑哪个基点都一样（道路连通保证换基点给出同构，而「平凡」是同构不变的）。',
        '',
        '等价的说法：$X$ 道路连通，且任意两条有共同端点的道路都道路同伦；' +
          '等价地，每条闭道路都能在固定端点的前提下连续缩成常值道路。',
      ].join('\n'),
      notes: [
        '**例子**：$\\mathbb{R}^{n}$ 单连通（凸 $\\implies$ 任意两条道路可用直线段同伦）；$S^{n}$ 对 $n \\ge 2$ 单连通' +
          '（`cor.pi1-sphere`）；圆盘、开球、单连通区域都单连通。',
        '',
        '**反例**：$S^{1}$ 不单连通（绕数为 $1$ 的闭道路缩不成点，`thm.pi1-circle`）；' +
          '环面 $T^{2}$ 不单连通，$\\pi_{1} \\cong \\mathbb{Z}^{2}$；' +
          '挖掉一点的平面 $\\mathbb{R}^{2} \\setminus \\{0\\}$ 不单连通（同伦等价于 $S^{1}$）。',
        '',
        '⚠️ **单连通 $\\ne$ 可缩**。$S^{2}$ 单连通但不可缩，理由是它有一个二维的洞：' +
          '$H_{2}(S^{2}) = \\mathbb{Z} \\ne 0$（`thm.sphere-homology`），而同伦等价保持同调群。' +
          '$\\pi_{1}$ 只看得见**一维**的洞，这是它的固有局限，也正是要造同调群的原因。',
        '',
        '⚠️ 「道路连通」不能省：两个不相交的点各自单连通，并起来的基本群仍是平凡群，但整体不道路连通。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · The Fundamental Group（simply connected）',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · simply-connected spaces',
      ],
    },
    {
      id: 'def.covering-space',
      type: 'definition',
      label: '覆叠空间',
      title: '覆叠空间：局部看是「叠起来的若干份」',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '覆叠空间', '提升'],
      statement: [
        '设 $p : E \\to B$ 连续且满。开集 $U \\subseteq B$ 叫**均匀覆叠的**（evenly covered），' +
          '如果 $p^{-1}(U)$ 是 $E$ 中一族两两不交开集 $\\{V_{j}\\}_{j \\in J}$ 的并，且对每个 $j$ 都有',
        '',
        '$$p\\big|_{V_{j}} : V_{j} \\longrightarrow U$$',
        '',
        '是同胚。若 $B$ 的每个点都有一个均匀覆叠的邻域，则称 $p$ 是**覆叠映射**，$E$ 是 $B$ 的**覆叠空间**，' +
          '$B$ 叫**底空间**。',
        '',
        '**构造性例子**：',
        '- $p(t) = e^{2\\pi i t}$，$p : \\mathbb{R} \\to S^{1}$：每个 $t$ 的像附近，$p^{-1}(U)$ 是 $\\mathbb{Z}$ 份同样的弧；',
        '- $p(z) = z^{n}$，$p : S^{1} \\to S^{1}$：$n$ 层覆叠；',
        '- 若 $B$ 道路连通且局部道路连通，则 $p^{-1}(b)$ 的基数与 $b$ 无关，这个基数叫**层数**。',
      ].join('\n'),
      notes: [
        '**为什么要「局部同胚 + 纤维离散」而不是「局部平凡纤维丛」**：覆叠比纤维丛更**硬**——' +
          '要求片 $V_{j}$ 与 $U$ 同胚，而不只是纤维同伦等价。所以覆叠的纤维必然是离散空间。' +
          '这条硬度正是提升定理能成立的原因。',
        '',
        '**层数 = 指数**：$B$ 道路连通、局部道路连通时层数有限，则 $\\pi_{1}(E)$ 在 $\\pi_{1}(B)$ 里的指数恰是层数' +
          '（`prop.covering-index`）。这是「数层数就能算基本群」的来源。',
        '',
        '⚠️ 常见反例：$p : (0, 2) \\to S^{1}$，$p(t) = e^{2\\pi i t}$ —— 它**不是**覆叠，' +
          '因为 $1 \\in S^{1}$ 的任何邻域都只被盖住一半（$(0,2)$ 在端点处没「续上」）。' +
          '覆叠要求**每一点**都均匀，包括极限点。',
        '',
        '💡 覆叠的图景：把底空间想成「投影下来的影子」，覆叠空间是「举起来的那张纸」。' +
          '同一个影子可以由好几层纸投下来，层与层之间靠「绕一圈换一层」联系——那个换层规则就是 $\\pi_{1}$。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · Covering Spaces',
        'Hatcher, Algebraic Topology, Ch. 1 §1.3 · Covering Spaces',
      ],
    },
    {
      id: 'thm.lifting',
      type: 'theorem',
      label: '提升定理',
      title: '道路与同伦在覆叠里的唯一提升',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '覆叠空间', '提升', '唯一性'],
      statement: [
        '设 $p : E \\to B$ 是覆叠映射，$p(e_{0}) = b_{0}$。',
        '',
        '**(1) 道路提升**：对任意道路 $\\alpha : [0, 1] \\to B$ 且 $\\alpha(0) = b_{0}$，存在**唯一**的道路',
        '',
        '$$\\tilde{\\alpha} : [0, 1] \\longrightarrow E,\\qquad \\tilde{\\alpha}(0) = e_{0},\\quad p \\circ \\tilde{\\alpha} = \\alpha.$$',
        '',
        '**(2) 同伦提升**：对任意同伦 $F : [0, 1] \\times [0, 1] \\to B$ 且 $F(0, 0) = b_{0}$，存在**唯一**的',
        '提升 $\\tilde{F} : [0, 1] \\times [0, 1] \\to E$ 使 $\\tilde{F}(0, 0) = e_{0}$、$p \\circ \\tilde{F} = F$。',
        '若 $F$ 是道路同伦（两端固定），则 $\\tilde{F}$ 对每个 $s$ 的两个端点也都固定。',
      ].join('\n'),
      notes: [
        '**唯一性才是关键**：$p$ 在每片 $V_{j}$ 上是同胚，所以「提升在哪一片上」一旦定下，整段提升就完全被钉死。' +
          '存在性就是把 $[0, 1]$ 切成有限多小段，每段落在一个均匀覆叠的邻域里，逐段接上去。',
        '',
        '**为什么切片是有限的**：$[0, 1]$ 紧，$\\{\\alpha^{-1}(U)\\}$ 是它的开覆盖，' +
          '由 Lebesgue 数引理存在 $\\delta > 0$ 使每个长度 $\\le \\delta$ 的区间都落进某个 $U$ 里。' +
          '（二维情形用 $[0, 1]^{2}$ 的紧性与同样的分割 + 逐格构造。）',
        '',
        '⭐ **推论（这一步最有用）**：把 (2) 用到「$\\alpha$ 与常值道路之间的同伦」上，得到' +
          '「$\\alpha$ 道路同伦于常值 $\\implies$ 提升 $\\tilde{\\alpha}$ 也道路同伦于常值（都从 $e_{0}$ 出发）」。' +
          '这就是把 $B$ 里「缩成一点」翻译成 $E$ 里「缩成一点」的机器。',
        '',
        '⚠️ 提升**不总存在**：不是每个映射 $X \\to B$ 都能提升。$\\pi_{1}$ 正是障碍所在（`prop.covering-index`）。' +
          '例如 $1_{S^{1}} : S^{1} \\to S^{1}$ 不能提升成 $S^{1} \\to \\mathbb{R}$，因为那将给出绕数 $0$。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · Covering Spaces（lifting theorem）',
        'Hatcher, Algebraic Topology, Ch. 1 §1.3 · lifting properties',
      ],
    },
    {
      id: 'prop.covering-index',
      type: 'proposition',
      label: '覆叠的指数',
      title: '纤维与 $\\pi_{1}$ 的陪集一一对应（层数 = 指数）',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '覆叠空间', '指数', '陪集'],
      statement: [
        '设 $p : (E, e_{0}) \\to (B, b_{0})$ 是覆叠映射，$E, B$ 道路连通且局部道路连通。则',
        '',
        '1. **单射**：$p_{*} : \\pi_{1}(E, e_{0}) \\to \\pi_{1}(B, b_{0})$ 是单射；',
        '2. **纤维 = 陪集**：存在双射',
        '',
        '$$p^{-1}(b_{0}) \\;\\longleftrightarrow\\; \\pi_{1}(B, b_{0}) \\big/ p_{*}\\pi_{1}(E, e_{0}),$$',
        '',
        '把 $e \\in p^{-1}(b_{0})$ 送到「从 $e_{0}$ 走到 $e$ 的那条道路的投影」所在的右陪集。',
        '',
        '因此层数 $\\#p^{-1}(b_{0})$ 等于指数 $[\\pi_{1}(B) : p_{*}\\pi_{1}(E)]$（两者都有限时）。',
      ].join('\n'),
      notes: [
        '⚠️⚠️ **这是集合的双射，不是群同构**。陪集集 $\\pi_{1}(B)/p_{*}\\pi_{1}(E)$ 一般没有群结构，' +
          '仅凭这条拿不到 $\\pi_{1}(S^{1}) \\cong \\mathbb{Z}$ 的**群**信息——只能拿到「$\\pi_{1}(S^{1})$ 与 $\\mathbb{Z}$ 等势」。' +
          '要得到同构必须另外定义**度数**并证明它是同态，见 `thm.pi1-circle`。',
        '',
        '⭐ **当覆叠是万有覆叠**（$E$ 单连通，于是 $p_{*}\\pi_{1}(E) = 1$）时，' +
          '结论化简成「纤维 $\\leftrightarrow \\pi_{1}(B)$ 集合同构」。$p : \\mathbb{R} \\to S^{1}$ 正是这种情形。',
        '',
        '**单射的几何意思**：$\\pi_{1}(E)$ 里非零的东西在 $B$ 里也非零——覆叠不会假装「解开」已经很平凡的圈，' +
          '它只会让一个圈变成更「紧」的圈。',
        '',
        '💡 这条命题是「覆叠分类」的入口：$B$ 的连通覆叠（差同胚）与 $\\pi_{1}(B)$ 的共轭类子群一一对应。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · Covering Spaces（lifts 与 indices）',
        'Hatcher, Algebraic Topology, Ch. 1 §1.3 · the correspondence between coverings and subgroups',
      ],
    },
    {
      id: 'thm.pi1-circle',
      type: 'theorem',
      label: '圆周的基本群',
      title: '$\\pi_{1}(S^{1}, 1) \\cong \\mathbb{Z}$：绕数是一个完全的不变量',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '基本群', '圆周', '绕数', '度数'],
      statement: [
        '令 $p : \\mathbb{R} \\to S^{1}$，$p(t) = e^{2\\pi i t}$（这是覆叠映射）。' +
          '对以 $1 \\in S^{1}$ 为基点的闭道路 $\\alpha$，取唯一提升 $\\tilde{\\alpha}$ 且 $\\tilde{\\alpha}(0) = 0$，定义',
        '',
        '$$\\deg[\\alpha] := \\tilde{\\alpha}(1) \\in \\mathbb{Z}$$',
        '',
        '（**绕数**，也叫**度数**）。则 $\\deg$ 是良定义的群同构',
        '',
        '$$\\deg : \\pi_{1}(S^{1}, 1) \\xrightarrow{\\ \\cong\\ } \\mathbb{Z}.$$',
        '',
        '具体地，$\\deg[\\alpha] = n$ 的生成元类是 $\\alpha_{n}(t) = e^{2\\pi i n t}$，' +
          '$n > 0$ 表示「逆时针绕了 $n$ 圈」，$n < 0$ 表示「顺时针绕了 $|n|$ 圈」。',
      ].join('\n'),
      notes: [
        '**几何翻译**：$S^{1}$ 的基本群只有「绕了几圈」这一个信息，而它是**完全不变量**——' +
          '两条闭道路同伦当且仅当绕数相同。没有别的东西可以藏在 $S^{1}$ 里。',
        '',
        '⭐ **与复分析的接口**：绕数在复分析里写成 $n(\\gamma, 0) = \\frac{1}{2\\pi i}\\oint_{\\gamma}\\frac{\\mathrm{d}z}{z}$' +
          '（`prop.winding-integral`）。两者是同一个整数：一条闭曲线升到极坐标就得到提升。' +
          '这也解释了复分析里「绕数在曲线同伦下不变」那条定理的拓扑来源（`thm.winding-homotopy`）。',
        '',
        '⚠️ **证明结构（重要）**：`prop.covering-index` 只给出「$\\pi_{1}(S^{1})$ 与 $\\mathbb{Z}$ 等势」，' +
          '因为 $\\pi_{1}(\\mathbb{R}) = 1$ 而纤维是 $\\mathbb{Z}$。要得到**同构**，必须额外证明 $\\deg$ 是同态——' +
          '这一步用的是「拼接的提升 = 提升的平移拼接」（提升唯一性）。两段都用到了，见边上的证明。',
        '',
        '💡 这是整个代数拓扑第一个**非平凡**的计算。它值钱在于：$\\pi_{1}(S^{1}) \\ne 1$ 立刻给出' +
          '「$S^{1}$ 不是可缩的」「圆盘不能收缩到边界」「Brouwer 不动点」——一个计算，一串几何定理。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · The Fundamental Group of the Circle',
        'Hatcher, Algebraic Topology, Ch. 1 §1.1 · the fundamental group of the circle',
      ],
    },
    {
      id: 'thm.no-retraction-disk',
      type: 'theorem',
      label: '圆盘不收缩',
      title: '不存在从圆盘到其边界的收缩：$S^{1}$ 不是 $D^{2}$ 的收缩核',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '收缩核', '圆盘', '不动点'],
      statement: [
        '令 $D^{2} := \\{\\, z \\in \\mathbb{C} : |z| \\le 1 \\,\\}$，$S^{1} = \\partial D^{2}$。则**不存在**连续映射',
        '',
        '$$r : D^{2} \\longrightarrow S^{1}$$',
        '',
        '满足 $r(z) = z$ 对一切 $z \\in S^{1}$ 成立。',
        '',
        '这样的 $r$ 若存在就叫 $S^{1}$ 在 $D^{2}$ 中的**收缩**，$S^{1}$ 就叫 $D^{2}$ 的**收缩核**。',
        '等价地：包含映射 $i : S^{1} \\hookrightarrow D^{2}$ 没有左逆。',
      ].join('\n'),
      notes: [
        '**证明的实际内容**：把 $\\pi_{1}$ 作用到 $r \\circ i = \\operatorname{id}_{S^{1}}$ 上，得' +
          '$r_{*} \\circ i_{*} = \\operatorname{id}_{\\mathbb{Z}}$。但 $\\pi_{1}(D^{2}) = 1$（圆盘凸 $\\implies$ 可缩），' +
          '所以 $i_{*}$ 只能是零映射，复合必然是零——矛盾。**整个论证只用了一行群论**，' +
          '前提是 $\\pi_{1}(S^{1})$ 已知。',
        '',
        '**推广**：同样的论证对任意 $n \\ge 1$ 成立（换成同调群 $H_{n-1}$）：' +
          '$S^{n-1}$ 不是 $D^{n}$ 的收缩核。',
        '',
        '⚠️ 「凸 $\\implies$ 可缩」在证明里是文字级别的：$D^{2}$ 中任意 $\\sigma$ 可取' +
          '$F(t, s) := (1 - s)\\,\\sigma(t)$，让整条道路沿直线缩到 $0$。这一步不需要任何机器。',
        '',
        '💡 这个结论本身看起来只是「不行」，但它是 Brouwer 不动点、Poincaré–Miranda、' +
          '乃至「球面不能连续形变到点」这一类定理的源头（见 `thm.brouwer-fixed-point` 那条边）。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · Retractions and Fixed Points',
        'Hatcher, Algebraic Topology, Ch. 1 · retractions（S^1 不是 D^2 的 retract）',
      ],
    },
    {
      id: 'thm.van-kampen',
      type: 'theorem',
      label: 'van Kampen 定理',
      title: 'Seifert–van Kampen：把 $\\pi_{1}$ 从两块拼起来',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', 'van Kampen', '自由积', '余极限'],
      statement: [
        '设 $X = U \\cup V$，$U, V \\subseteq X$ 是**开集**，$U, V, U \\cap V$ 都**道路连通**，' +
          '取基点 $x_{0} \\in U \\cap V$。记 $i : U \\cap V \\hookrightarrow U$、$j : U \\cap V \\hookrightarrow V$ 为包含映射。则',
        '',
        '$$\\pi_{1}(X, x_{0}) \\;\\cong\\; \\pi_{1}(U, x_{0}) *_{G} \\pi_{1}(V, x_{0}),$$',
        '$$G \\;:=\\; \\pi_{1}(U \\cap V,\\ x_{0}).$$',
        '',
        '右端**具体构造**如下（不是「满足某性质的对象」）：',
        '',
        '1. 取**自由积** $\\pi_{1}(U) * \\pi_{1}(V)$：元素是有限字 $(u_{1}, v_{1}, u_{2}, v_{2}, \\ldots)$，' +
          '字母来自 $\\pi_{1}(U) \\sqcup \\pi_{1}(V)$，相邻两个同属一个群的字母按该群乘法合并，长度为 $0$ 的字是单位；',
        '2. 取由子集 $\\{\\, i_{*}(\\gamma)\\, j_{*}(\\gamma)^{-1} : \\gamma \\in G \\,\\}$ 生成的**正规子群** $N$；',
        '3. 商群 $\\big(\\pi_{1}(U) * \\pi_{1}(V)\\big) / N$ 就是 $\\pi_{1}(X, x_{0})$。',
        '',
        '等价陈述：$\\pi_{1}(X, x_{0})$ 由像 $i_{*}\\pi_{1}(U)$ 与 $j_{*}\\pi_{1}(V)$ **生成**，' +
          '而两组像之间**只有**来自 $G$ 的关系。',
      ].join('\n'),
      notes: [
        '**两个常用特例**：',
        '- $G = 1$（交叠单连通）$\\implies$ $\\pi_{1}(X) \\cong \\pi_{1}(U) * \\pi_{1}(V)$（自由积，一般非阿贝尔、无限）；',
        '- $\\pi_{1}(U) = \\pi_{1}(V) = 1$ $\\implies$ $\\pi_{1}(X) = 1$（**与 $G$ 无关**，见 `cor.pi1-sphere`）。',
        '',
        '⚠️ **假设不能省**：$U, V$ 要求**开**（更一般：内部覆盖 $X$）是为了能用 Lebesgue 数把闭道路切细；' +
          '$U \\cap V$ 道路连通是为了「换基点」不带来额外信息。反例：把 $S^{1}$ 拆成两段开弧，' +
          '交叠是两个不连通的开弧，公式就失效。',
        '',
        '⚠️ **本证明是骨架，不是逐行证明**（如实标注）。结构是：',
        '① 用 Lebesgue 数把任意闭道路 $\\alpha$ 切成小段，每段落在 $U$ 或 $V$ 里；',
        '② 由「小段所在的开片里没有洞」，把每段替换成落在 $U$ 或 $V$ 中的道路，得 $\\alpha \\simeq_{p}$ 一串交替的 $U$-段与 $V$-段；',
        '③ 这个分解定义出满同态 $\\Phi : \\pi_{1}(U) * \\pi_{1}(V) \\twoheadrightarrow \\pi_{1}(X)$，' +
          '且 $N \\subseteq \\ker\\Phi$；',
        '④ 反向：给一个 $\\Phi(\\text{字}) = 1$ 的同伦，再用同样的切细手法把同伦也切成小块，' +
          '证明该字在 $N$ 里。这一步是**最长的**，本图没有逐条写。',
        '',
        '💡 一句记法：**交叠是「胶水」，$\\pi_{1}$ 沿着胶水做余极限**。所谓 amalgamated product 就是群范畴里的推出（pushout）。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), 论 Seifert–van Kampen 定理的那一章（本图不给章号 / 节号，见存疑清单）',
        'Hatcher, Algebraic Topology, Ch. 1 §1.2 · Van Kampen Theorem',
      ],
    },
    {
      id: 'cor.pi1-sphere',
      type: 'corollary',
      label: '高维球面的基本群',
      title: '$\\pi_{1}(S^{n}) = 1$ 对 $n \\ge 2$',
      cluster: 'topology.fg',
      regions: ['topology'],
      tags: ['代数拓扑', '基本群', '球面', '单连通'],
      statement: [
        '对每个 $n \\ge 2$，$S^{n}$ 单连通，即',
        '',
        '$$\\pi_{1}(S^{n}, x_{0}) = 1 \\qquad (n \\ge 2).$$',
        '',
        '对 $n = 1$ 结论不成立：$\\pi_{1}(S^{1}) \\cong \\mathbb{Z}$（`thm.pi1-circle`）。',
      ].join('\n'),
      notes: [
        '**差别在哪**：把 $S^{n}$ 拆成两个开半球 $U, V$，各同胚于 $\\mathbb{R}^{n}$，可缩，故 $\\pi_{1}(U) = \\pi_{1}(V) = 1$；' +
          '而 $U \\cap V \\cong S^{n-1} \\times (-\\varepsilon, \\varepsilon)$ 在 $n \\ge 2$ 时**道路连通**、$n = 1$ 时**不连通**（两段弧）。' +
          'van Kampen 要求交叠道路连通，所以只有 $n \\ge 2$ 能用，且一旦能用，自由积是平凡群，交叠长什么样都不影响。',
        '',
        '⚠️ 常见误读：「$S^{n}$ 没有洞所以基本群平凡」—— $n \\ge 2$ 的 $S^{n}$ **有**一个 $n$ 维的洞，' +
          '只是 $\\pi_{1}$ 看不见它（$\\pi_{1}$ 只看一维）。要看见二维的洞得用 $H_{2}$，见 `thm.sphere-homology`。',
        '',
        '💡 对比：$\\pi_{1}(S^{1}) = \\mathbb{Z}$ 说明按闭道路分类时 $S^{1}$ 有无穷多类；' +
          '$\\pi_{1}(S^{2}) = 1$ 说明 $S^{2}$ 上任何闭曲线都能缩成点（这是「没有一维把手」的精确含义）。',
      ].join('\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Ch. 9 · The Fundamental Group of S^n',
        'Hatcher, Algebraic Topology, Ch. 1 §1.2 · fundamental groups of spheres（推论）',
      ],
    },
  ],
  edges: [
    /* ---------------------------------------------------- §A 同伦 → 基本群 */
    { kind: 'definition', definition: 'def.continuous-map', usedBy: 'def.homotopy-maps',
      note: '同伦 $F : X \\times [0, 1] \\to Y$ 本身要求**联合连续**（在乘积拓扑下），' +
        '不是「对每个 $t$ 各自连续」。' },
    { kind: 'definition', definition: 'def.homotopy-maps', usedBy: 'def.path-homotopy',
      note: '道路同伦就是取 $A = \\{0, 1\\}$ 的**相对同伦**：$F(0, s)$ 与 $F(1, s)$ 都被钉死。' },
    { kind: 'implication', sources: ['def.path-homotopy'], target: 'lem.path-product',
      title: '重参数化给出良定义、结合律、单位元与逆元',
      proof: [
        '**良定义**：设 $F : \\alpha \\simeq_{p} \\alpha\'$、$G : \\beta \\simeq_{p} \\beta\'$，且 $\\alpha(1) = \\beta(0)$。' +
          '令 $H(t, s) := F(2t, s)$ 当 $t \\le 1/2$、$H(t, s) := G(2t - 1, s)$ 当 $t \\ge 1/2$。',
        '',
        '在两个半区上 $H(1/2, s) = F(1, s) = G(0, s)$（因为 $\\alpha(1) = \\beta(0)$ 且两条同伦都固定端点），' +
          '故由粘贴引理 $H$ 连续；$H(\\cdot, 0) = \\alpha * \\beta$、$H(\\cdot, 1) = \\alpha\' * \\beta\'$，' +
          '且 $H(0, s)$、$H(1, s)$ 都不动。',
        '',
        '**结合律**：取重参数化 $\\varphi$：在 $[0, 1/4]$ 上 $\\varphi(t) = 2t$，在 $[1/4, 3/4]$ 上 $\\varphi(t) = t + 1/4$，' +
          '在 $[3/4, 1]$ 上 $\\varphi(t) = (t + 1)/2$。',
        '',
        '它连续、单调、$\\varphi(0) = 0$、$\\varphi(1) = 1$，且直接算得' +
          '$\\big((\\alpha * \\beta) * \\gamma\\big) \\circ \\varphi = \\alpha * (\\beta * \\gamma)$（逐段核对分段点即可）。' +
          '而 $\\delta \\circ \\varphi \\simeq_{p} \\delta$，同伦取 $F(t, s) = \\delta((1 - s)\\,\\varphi(t) + s\\,t)$：' +
          '它连续、$F(\\cdot, 0) = \\delta \\circ \\varphi$、$F(\\cdot, 1) = \\delta$，' +
          '且 $F(0, s) = \\delta(0)$、$F(1, s) = \\delta(1)$ 不动。',
        '',
        '**单位**：$(e_{x_{0}} * \\alpha)(t) = \\alpha(\\max(0, 2t - 1))$，与 $\\alpha$ 只差单调重参数化 $t \\mapsto \\max(0, 2t - 1)$，' +
          '故 $e_{x_{0}} * \\alpha \\simeq_{p} \\alpha$（同一个重参数化论证）。另一侧同理。',
        '',
        '**逆**：设 $\\alpha$ 从 $x_{0}$ 到 $x_{1}$。令 $\\tau(t)$ 为 $(\\alpha * \\bar{\\alpha})$ 的**进度函数**：' +
          '$t \\le 1/2$ 时 $\\tau(t) = 2t$，$t \\ge 1/2$ 时 $\\tau(t) = 2 - 2t$（即 $\\alpha * \\bar{\\alpha} = \\alpha \\circ \\tau$）。' +
          '再令',
        '',
        '$$F(t, s) := \\alpha\\big((1 - s)\\,\\tau(t)\\big).$$',
        '',
        '则 $F(\\cdot, 0) = \\alpha * \\bar{\\alpha}$、$F(\\cdot, 1) = \\alpha(0) = e_{x_{0}}$，' +
          '且 $F(0, s) = \\alpha(0)$、$F(1, s) = \\alpha(\\tau(1)) = \\alpha(0)$ 都不动，故是道路同伦。∎',
      ].join('\n'),
      note: '全部四条都靠「重参数化 $+$ 粘贴引理」；道路层面没有一条是等式。' },
    { kind: 'definition', definition: 'def.path-homotopy', usedBy: 'def.fundamental-group',
      note: '$\\pi_{1}$ 的元素是**道路同伦类** $[\\alpha]$ 而不是道路；商集这一步就是在这里做的。' },
    { kind: 'implication', sources: ['lem.path-product'], target: 'prop.induced-homomorphism',
      title: '复合保持拼接，于是 $f_{*}$ 是同态',
      proof: [
        '**良定义**：若 $F : \\alpha \\simeq_{p} \\beta$，则 $f \\circ F$ 连续、' +
          '$f \\circ F(\\cdot, 0) = f \\circ \\alpha$、$f \\circ F(\\cdot, 1) = f \\circ \\beta$，' +
          '端点 $f \\circ F(0, s) = f(x_{0}) = y_{0}$ 不动。',
        '',
        '**同态**：两条道路复合是逐点定义的，所以',
        '',
        '$$f \\circ (\\alpha * \\beta) = (f \\circ \\alpha) * (f \\circ \\beta)$$',
        '',
        '**在每个 $t$ 上都成立**（两边都是「按 $[0, 1/2]$、$[1/2, 1]$ 分段、前段吃 $2t$、后段吃 $2t - 1$」的同一个公式）。' +
          '既然作为道路相等，同伦类当然相等。',
        '',
        '**函子性**：$1_{X} \\circ \\alpha = \\alpha$，$(g \\circ f) \\circ \\alpha = g \\circ (f \\circ \\alpha)$——' +
          '都是映射复合的结合律，逐点成立。',
        '',
        '**同伦不变**：设 $H : f \\simeq g \\; (\\operatorname{rel} \\{x_{0}\\})$。' +
          '对任意 $[\\alpha]$，令 $\\Phi(t, s) := H(\\alpha(t), s)$。则 $\\Phi$ 连续，' +
          '$\\Phi(\\cdot, 0) = f \\circ \\alpha$、$\\Phi(\\cdot, 1) = g \\circ \\alpha$，' +
          '且 $\\Phi(0, s) = H(x_{0}, s) = f(x_{0}) = g(x_{0})$、$\\Phi(1, s) = H(x_{0}, s)$ 同样不动。∎',
      ].join('\n'),
      note: '关键只有一句：$f$ 与「拼接」交换。这也说明为什么 $f_{*}$ 是**同态**而不是随便一个映射。' },
    { kind: 'implication', sources: ['prop.induced-homomorphism'], target: 'prop.pi1-basepoint',
      title: '把「换基点」看成沿道路的共轭，再用函子性核对',
      proof: [
        '**先验证 $\\Pi_{\\gamma}$ 是同态**（这是唯一需要动手的地方）。设 $\\alpha, \\alpha\'$ 是以 $x_{0}$ 为基点的闭道路。' +
          '由 `lem.path-product` 的结合律、单位律，以及 $\\gamma * \\bar{\\gamma} \\simeq_{p} e_{x_{1}}$：',
        '',
        '$$\\Pi_{\\gamma}([\\alpha][\\alpha\']) = [\\bar{\\gamma} * \\alpha * \\alpha\' * \\gamma]$$',
        '$$= [\\bar{\\gamma} * \\alpha * \\gamma]\\,[\\bar{\\gamma} * \\alpha\' * \\gamma].$$',
        '',
        '中间插入的 $\\gamma * \\bar{\\gamma}$（或 $\\bar{\\gamma} * \\gamma$）由单位律消掉，这正是需要结合律的地方。',
        '',
        '**互逆**：$\\Pi_{\\bar{\\gamma}} \\circ \\Pi_{\\gamma}([\\alpha]) = [\\gamma * \\bar{\\gamma} * \\alpha * \\gamma * \\bar{\\gamma}]' +
          ' = [\\alpha]$；另一个方向同理。故 $\\Pi_{\\gamma}$ 是双射，从而是同构。',
        '',
        '**共轭公式**：设 $\\gamma\'$ 是另一条从 $x_{0}$ 到 $x_{1}$ 的道路，令 $g := [\\bar{\\gamma}\' * \\gamma] \\in \\pi_{1}(X, x_{1})$（它是 $x_{1}$ 处的闭道路）。则',
        '',
        '$$\\Pi_{\\gamma\'}([\\alpha]) = [\\bar{\\gamma}\' * \\alpha * \\gamma\'] = g\\,[\\bar{\\gamma} * \\alpha * \\gamma]\\,g^{-1},$$',
        '',
        '因为 $[\\bar{\\gamma}\' * \\alpha * \\gamma\'] = [\\bar{\\gamma}\' * \\gamma] * [\\bar{\\gamma} * \\alpha * \\gamma] * [\\bar{\\gamma} * \\gamma\']$，' +
          '而 $[\\bar{\\gamma} * \\gamma\'] = g^{-1}$。∎',
      ].join('\n'),
      note: '「只差一个内自同构」就是**不典范**的精确含义；只有当 $\\pi_{1}$ 阿贝尔时它才真的与道路无关。' },
    { kind: 'definition', definition: 'def.fundamental-group', usedBy: 'def.simply-connected',
      note: '单连通 $=$ 道路连通 $+$ $\\pi_{1}$ 平凡；「平凡」由 `prop.pi1-basepoint` 与道路连通性变成与基点无关的陈述。' },
    /* ------------------------------------------------ §B 覆叠空间与提升 */
    { kind: 'definition', definition: 'def.covering-space', usedBy: 'thm.lifting',
      note: '提升的唯一性直接来自「每片 $V_{j}$ 上 $p$ 是同胚」：知道了落在哪一片，整段提升就被钉死。' },
    { kind: 'definition', definition: 'def.covering-space', usedBy: 'prop.covering-index',
      note: '双射 $p^{-1}(b_{0}) \\leftrightarrow \\pi_{1}(B)/p_{*}\\pi_{1}(E)$ 用的正是均匀覆叠的片：' +
        '$\\tilde{\\alpha}(1)$ 落在哪个 $V_{j}$ 里，就决定 $[\\alpha]$ 落在哪个陪集。' },
    { kind: 'implication', sources: ['thm.lifting'], target: 'prop.covering-index',
      title: '提升给出单射 $\\pi_{1}(E) \\hookrightarrow \\pi_{1}(B)$，纤维就是陪集',
      proof: [
        '**单射**：设 $[\\tilde{\\alpha}] \\in \\pi_{1}(E, e_{0})$ 且 $p_{*}[\\tilde{\\alpha}] = 1$。' +
          '即存在道路同伦 $F : p \\circ \\tilde{\\alpha} \\simeq_{p} e_{b_{0}}$。由**同伦提升**（`thm.lifting` (2)）' +
          '得唯一提升 $\\tilde{F}$，它以 $\\tilde{\\alpha}$ 为一端、以 $e_{0}$ 处常值道路为另一端，' +
          '故 $[\\tilde{\\alpha}] = 1$。',
        '',
        '**映射 $\\Psi$**：对 $e \\in p^{-1}(b_{0})$，取 $E$ 中从 $e_{0}$ 到 $e$ 的道路 $\\tilde{\\sigma}$（$E$ 道路连通），' +
          '记 $\\sigma := p \\circ \\tilde{\\sigma}$，它是 $b_{0}$ 处的闭道路。令 $\\Psi(e) := [\\sigma] \\cdot p_{*}\\pi_{1}(E, e_{0})$（右陪集）。',
        '',
        '**良定义**：换一条 $\\tilde{\\sigma}\'$，则 $\\tilde{\\sigma}\' * \\bar{\\tilde{\\sigma}}$ 是 $e_{0}$ 处的闭道路，' +
          '其类属于 $\\pi_{1}(E, e_{0})$，投影后正好给出两个陪集相同。',
        '',
        '**双射**：满射——任给陪集 $[\\alpha]\\,p_{*}\\pi_{1}(E)$，把 $\\alpha$ 从 $e_{0}$ 提升得 $\\tilde{\\alpha}$，' +
          '$\\Psi(\\tilde{\\alpha}(1)) = $ 该陪集。单射——若 $\\Psi(e) = \\Psi(e\')$，取相应的 $\\tilde{\\sigma}, \\tilde{\\sigma}\'$，' +
          '则 $[\\sigma\' * \\bar{\\sigma}] \\in p_{*}\\pi_{1}(E)$，即存在 $E$ 中的闭道路 $\\tilde{\\tau}$ 同伦于 $\\sigma\' * \\bar{\\sigma}$ 的提升；' +
          '由**提升的唯一性**，该提升的终点必同时是 $e\'$ 与 $e$，故 $e = e\'$。∎',
      ].join('\n'),
      note: '⚠️ 得到的只是**集合**双射。想吃掉「同构」两个字必须另外证明度数同态。' },
    { kind: 'implication', sources: ['prop.covering-index'], target: 'thm.pi1-circle',
      title: '层数给等势，提升数（度数）给同态',
      proof: [
        '**覆叠**：$p(t) = e^{2\\pi i t}$，$p : \\mathbb{R} \\to S^{1}$。每个 $s \\in S^{1}$ 的开半圆邻域被 $\\mathbb{R}$ 上间隔为 $1$ 的' +
          '开区间们同胚地盖住，故 $p$ 是覆叠。',
        '',
        '**$\\pi_{1}(\\mathbb{R}) = 1$**：$\\mathbb{R}$ 凸，任意闭道路 $\\sigma$ 取 $F(t, s) := (1 - s)\\,\\sigma(t)$ 就缩成 $0$。',
        '',
        '**（集合层面）** 由 `prop.covering-index`，$p^{-1}(1) = \\mathbb{Z}$ 与 $\\pi_{1}(S^{1}, 1)/1 = \\pi_{1}(S^{1}, 1)$ 等势。' +
          '显式的双射是 $n \\mapsto$ 类 $[t \\mapsto e^{2\\pi i n t}]$（它从 $0$ 起的提升是 $t \\mapsto nt$）。' +
          '**到此只拿到等势，没拿到同构。**',
        '',
        '**度数**：令 $\\deg[\\alpha] := \\tilde{\\alpha}(1)$，其中 $\\tilde{\\alpha}$ 是 $\\alpha$ 从 $0$ 出发的唯一提升。' +
          '良定义由同伦提升：若 $F : \\alpha \\simeq_{p} \\beta$，则 $\\tilde{F}$ 是 $\\tilde{\\alpha}$ 与 $\\tilde{\\beta}$ 之间的道路同伦，' +
          '它对 $s$ 的每个值都是同一条道路的端点，故 $\\tilde{\\alpha}(1) = \\tilde{\\beta}(1)$。',
        '',
        '**$\\deg$ 是同态**：考虑 $\\alpha * \\beta$ 的提升。令 $\\tilde{h}(t) := \\tilde{\\alpha}(2t)$ 当 $t \\le 1/2$，' +
          '$\\tilde{h}(t) := \\tilde{\\beta}(2t - 1) + \\deg\\alpha$ 当 $t \\ge 1/2$。',
        '',
        '它在 $t = 1/2$ 处衔接（$\\tilde{\\alpha}(1) = \\deg\\alpha$ 而 $\\tilde{\\beta}(0) + \\deg\\alpha = \\deg\\alpha$），' +
          '连续（粘贴引理），且 $p \\circ \\tilde{h} = \\alpha * \\beta$、$\\tilde{h}(0) = 0$。' +
          '由**提升唯一性**，$\\tilde{h} = \\widetilde{\\alpha * \\beta}$，于是',
        '',
        '$$\\deg([\\alpha][\\beta]) = \\tilde{h}(1) = \\deg\\beta + \\deg\\alpha.$$',
        '',
        '**单射**：$\\deg[\\alpha] = 0$ 时 $\\tilde{\\alpha}$ 是 $\\mathbb{R}$ 中以 $0$ 为基点的闭道路，' +
          '$\\mathbb{R}$ 可缩故 $\\tilde{\\alpha} \\simeq_{p} e_{0}$；取 $p \\circ$ 得 $\\alpha \\simeq_{p} e_{1}$，即 $[\\alpha] = 1$。',
        '',
        '**满射**：对 $n \\in \\mathbb{Z}$，$\\alpha_{n}(t) = e^{2\\pi i n t}$ 的提升是 $t \\mapsto nt$，故 $\\deg[\\alpha_{n}] = n$。∎',
      ].join('\n'),
      note: '注意这条边的作用：`prop.covering-index` 只够等势，同态性必须靠**提升的唯一性**重新算一遍。' },
    /* ---------------------------------------------- §C 收缩核与不动点 */
    { kind: 'implication', sources: ['thm.pi1-circle'], target: 'thm.no-retraction-disk',
      title: '若有收缩，$\\operatorname{id}_{\\mathbb{Z}}$ 会穿过平凡群',
      proof: [
        '设存在连续 $r : D^{2} \\to S^{1}$ 且 $r|_{S^{1}} = \\operatorname{id}$，记 $i : S^{1} \\hookrightarrow D^{2}$ 为包含映射。' +
          '则由 $r \\circ i = \\operatorname{id}_{S^{1}}$ 与**函子性**（`prop.induced-homomorphism` (3)）：',
        '',
        '$$r_{*} \\circ i_{*} = (r \\circ i)_{*} = (\\operatorname{id}_{S^{1}})_{*} = \\operatorname{id}_{\\mathbb{Z}}.$$',
        '',
        '另一方面 $D^{2}$ 凸，故可缩：任意闭道路 $\\sigma$ 由 $F(t, s) := (1 - s)\\,\\sigma(t)$ 缩成 $0$，' +
          '所以 $\\pi_{1}(D^{2}, 1) = 1$。于是 $i_{*} : \\mathbb{Z} \\to 1$ 只能是零同态，' +
          '$r_{*} \\circ i_{*} = 0$，与 $\\operatorname{id}_{\\mathbb{Z}} \\ne 0$ 矛盾。∎',
      ].join('\n'),
      note: '一行群论的「不能」，背后是 $\\pi_{1}(S^{1}) \\ne 1$ 这个唯一的输入。' },
    { kind: 'definition', definition: 'def.section-retraction', usedBy: 'thm.no-retraction-disk',
      note: '收缩 $r : D^{2} \\to S^{1}$ 满足 $r \\circ i = \\operatorname{id}_{S^{1}}$，正是范畴意义下 $i$ 的**收缩**' +
        '（$i$ 是 $S^{1} \\hookrightarrow D^{2}$）。所以「$S^{1}$ 不是收缩核」$=$「$i$ 没有左逆」。' },
    { kind: 'implication', sources: ['thm.no-retraction-disk'], target: 'thm.brouwer-fixed-point',
      title: '没有收缩 $\\implies$ 每个连续 $f : D^{2} \\to D^{2}$ 都有不动点（二维连续版）',
      proof: [
        '设连续 $f : D^{2} \\to D^{2}$ 处处 $f(z) \\ne z$。对每个 $z \\in D^{2}$，从 $f(z)$ 出发、**穿过** $z$ 的射线' +
          '与 $S^{1}$ 有唯一交点，记为 $r(z)$。显式地',
        '',
        '$$r(z) = z + t(z)\\,(z - f(z)),$$',
        '',
        '其中 $a := \\langle z,\\, z - f(z)\\rangle$、$b := |z - f(z)|^{2} > 0$，而',
        '',
        '$$t(z) = \\frac{-a + \\sqrt{a^{2} + b\\,(1 - |z|^{2})}}{b} \\ge 0.$$',
        '',
        '（取正根：$1 - |z|^{2} \\ge 0$ 保证根号里 $\\ge a^{2}$，故 $-a + \\sqrt{\\ } \\ge 0$。' +
          '$|z| < 1$ 时它严格大于 $0$；$|z| = 1$ 时恰为 $0$，于是 $r(z) = z$ —— 边界被固定）。' +
          '右端只用到 $z \\mapsto f(z)$、内积、模、开方，' +
          '都是连续运算，且分母 $b$ 处处不为零，故 $r$ 连续。',
        '',
        '**$r$ 在 $S^{1}$ 上是恒等**：若 $|z| = 1$，从 $f(z) \\in D^{2}$ 穿过 $z$ 的射线离开圆盘的第一点就是 $z$ 本身' +
          '（因为 $z$ 已在边界上，且射线方向由 $z$ 指向外侧），故 $r(z) = z$。',
        '',
        '于是 $r : D^{2} \\to S^{1}$ 是一个收缩，与 `thm.no-retraction-disk` 矛盾。∎',
      ].join('\n'),
      note: '这条边补上了本图原先的缺口：`thm.brouwer-fixed-point` 的既有证明只用 Rouché 给出**全纯**情形，' +
        '连续情形在那里被标成「外部输入」。现在连续情形（二维）在图上有了自己的证明。' },
    /* ------------------------------------------------- §D van Kampen */
    { kind: 'definition', definition: 'def.fundamental-group', usedBy: 'thm.van-kampen',
      note: 'van Kampen 算的就是 $\\pi_{1}$：两边是诱导映射 $i_{*}, j_{*}$，右端是 $\\pi_{1}$ 的自由积取商。' },
    { kind: 'implication', sources: ['thm.van-kampen'], target: 'cor.pi1-sphere',
      title: '两块可缩 $+$ 交叠道路连通 $\\implies$ 基本群平凡',
      proof: [
        '设 $n \\ge 2$。取 $S^{n} = U \\cup V$，其中 $U$ 是去掉南极点的开半球、$V$ 是去掉北极点的开半球：' +
          '两者都同胚于 $\\mathbb{R}^{n}$（球极投影），故可缩，$\\pi_{1}(U) = \\pi_{1}(V) = 1$。',
        '',
        '**交叠**：$U \\cap V \\cong S^{n-1} \\times (-\\varepsilon, \\varepsilon)$。$n \\ge 2$ 时 $S^{n-1}$ 连通、区间连通，' +
          '故交叠道路连通，且可取基点 $x_{0}$ 在其中。',
        '',
        '**用定理**：由 `thm.van-kampen`，$\\pi_{1}(S^{n}, x_{0}) \\cong \\pi_{1}(U) *_{G} \\pi_{1}(V)$，其中 $G = \\pi_{1}(U \\cap V)$。' +
          '但 $\\pi_{1}(U) = \\pi_{1}(V) = 1$，自由积 $1 * 1 = 1$，再商掉正规子群仍是 $1$。故 $\\pi_{1}(S^{n}) = 1$。',
        '',
        '**为什么 $n = 1$ 不行**：此时 $U \\cap V$ 是两段开弧，不连通，van Kampen 的假设失效——而事实上 $\\pi_{1}(S^{1}) = \\mathbb{Z}$。' +
          '这不是证明的技巧问题：交叠不连通时，「换基点」会带来额外信息，公式本身不同。∎',
      ].join('\n'),
      note: '⭐ 注意：结论与 $G = \\pi_{1}(S^{n-1})$ **无关**。两块都是平凡群时，胶水怎么粘都是平凡群。' },
    { kind: 'definition', definition: 'def.simply-connected', usedBy: 'cor.pi1-sphere',
      note: '结论的措辞正是「$S^{n}$ 单连通」（$n \\ge 2$）。' },
    /* ------------------------------------------------------ 弱边 */
    { kind: 'analogy', a: 'def.homotopy-maps', b: 'def.homotopy',
      title: '映射同伦与链同伦：同一句话的两个化身',
      note: [
        '两件事没有谁推出谁（一个是空间之间的形变，一个是链复形之间的同调代数关系），但**招数是同一个**：',
        '**「差一点相等」要写成一个具体的「形变算子」，而不是写成一个抽象的关系。**',
        '',
        '**映射同伦**：$F : X \\times [0, 1] \\to Y$，$F(\\cdot, 0) = f$、$F(\\cdot, 1) = g$。' +
        '把 $[0, 1]$ 当成参数方向，$F$ 就是「一片连续的膜」。',
        '',
        '**链同伦**：$s^{n} : K^{n} \\to L^{n-1}$，满足 $f - g = s\\,d + d\\,s$。' +
        '这就是上面那片膜在链层面的**迹**：把 $K \\times [0, 1]$ 三角剖分，' +
        '那片膜推过去的链与两个底面的差，正好是一个「棱柱」的边界，而棱柱算子就是 $s$。',
        '',
        '**共同的招**：想证明「两个东西在某个不变量下相同」，不要直接比，' +
        '去找一个**降一次的算子 $s$**，把差写成 $\\partial s + s \\partial$ —— 于是任何「吃掉边界」的函子都自动看不见这个差。' +
        '（同伦不变性在两边都是这么证的。）',
        '',
        '💡 卡在「怎么说明这两个对象在这个不变量眼里一样」时，回来想想：**有没有一个 $s$ 可用？**',
      ].join('\n') },
  ],
});