/* ==========================================================================
   内容包 · 推论边（`layer:false` 的 implication）
   --------------------------------------------------------------------------
   这些边是**推出**，但**不是前提**：源常常比目标「高」得多（层号更靠后），
   是用高级工具回头证一个低级结论。所以它们带 `layer: false` ——
   `core/layers.js` 整条跳过，目标的层号不因它抬高；画出来是粉红实线。
   判据只有一条：sources 在数学上确实能推出 target。与已有的反向黑边并存
   是允许的（黑边管骨架无环，红边只记录「这条推出成立」）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '推论：高级工具回头证低级结论',

  nodes: [],

  edges: [
    /* ------------------------------------------------------- Taylor → MVT */
    {
      id: 'imp.derived-mvt-from-taylor',
      kind: 'implication',
      layer: false,
      sources: ['thm.taylor'],
      target: 'thm.mvt',
      title: 'Taylor 公式取 $n=0$ 就是 Lagrange 中值定理',
      proof: [
        '**Taylor 公式的高阶情形。** 若 $f$ 在 $[a,b]$ 上有 $n$ 阶连续导数、在 $(a,b)$ 内 $n+1$ 阶可导，则对 $x_0, x \\in [a,b]$（$x \\ne x_0$）存在介于 $x_0$ 与 $x$ 之间的 $\\xi$，使',
        '',
        '$$f(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}\\,(x-x_0)^{k} + \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\,(x-x_0)^{n+1}.$$',
        '',
        '**取 $n = 0$、$x_0 = a$、$x = b$。** 求和只剩 $k = 0$ 那一项 $f(a)$，余项分母是 $(0+1)! = 1$，于是',
        '',
        '$$f(b) = f(a) + f^{\\prime}(\\xi)\\,(b-a), \\qquad \\xi \\in (a,b),$$',
        '',
        '即 $f(b)-f(a) = f^{\\prime}(\\xi)\\,(b-a)$。前提也对得上：$n = 0$ 时「$0$ 阶连续导数」就是 $f$ 在 $[a,b]$ 上连续，「在 $(a,b)$ 内 $1$ 阶可导」就是在 $(a,b)$ 内可导 —— 正是中值定理的假设。$\\blacksquare$'
      ].join('\n'),
      note: '$n = 0$ 是 Taylor 公式里最低的一档，所以中值定理不必另立门户：它是同一族定理的退化情形。'
    },

    /* --------------------------------------------- FTA → 特征多项式分裂 */
    {
      id: 'imp.derived-charpoly-splits',
      kind: 'implication',
      layer: false,
      sources: ['thm.fundamental-algebra'],
      target: 'def.char-poly',
      title: '代数基本定理给出 $\\mathbb{C}$ 上特征多项式的 $n$ 个根',
      proof: [
        '设 $\\dim V = n$，$\\chi_T(x) = \\det(xI_n - A) = x^{n} + a_{n-1}x^{n-1} + \\cdots + a_0$ 是 $n$ 次首一多项式，系数在 $K$ 里；本图取 $K = \\mathbb{C}$。',
        '',
        '**由代数基本定理。** $\\mathbb{C}$ 是代数闭域，$\\mathbb{C}[x]$ 中不可约多项式恰好是一次多项式，所以 $\\chi_T$ 在 $\\mathbb{C}[x]$ 里分解成 $n$ 个一次因子：',
        '',
        '$$\\chi_T(x) = (x-\\lambda_1)(x-\\lambda_2)\\cdots(x-\\lambda_n), \\qquad \\lambda_j \\in \\mathbb{C},$$',
        '',
        '重根按重数计。特征多项式的根恰好是 $T$ 的特征值、重数就是**代数重数**，于是「$T$ 在 $\\mathbb{C}$ 上恰有 $n$ 个特征值（计重数）」。',
        '',
        '**顺带**：把两边的系数对比（Vieta），得 $\\sum_j \\lambda_j = \\operatorname{tr}T$、$\\prod_j \\lambda_j = \\det T$ —— 即「迹 = 特征值之和、行列式 = 特征值之积」，不必真的解出特征值。$\\blacksquare$'
      ].join('\n'),
      note: '只在 $K = \\mathbb{C}$ 上成立：$\\mathbb{R}$ 上特征多项式未必分裂（平面旋转没有实特征值），那里的 $n$ 个根只能在扩域里凑齐。'
    },

    /* ------------------------------------------ 换元公式 → 行列式是体积比 */
    {
      id: 'imp.derived-det-volume',
      kind: 'implication',
      layer: false,
      sources: ['thm.change-of-variables-manifold'],
      target: 'def.determinant',
      title: '流形上的换元公式给出 $|\\det A|$ 的体积含义',
      proof: [
        '取 $M = U \\subseteq \\mathbb{R}^{n}$ 有界、$N = A(U)$，其中 $A$ 是可逆线性映射（把它看成 $\\mathbb{R}^{n}$ 到自身的微分同胚），$\\omega = \\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$。',
        '',
        '**第一步：$A^{\\ast}\\omega = \\det(A)\\,\\omega$。** 左边按定义是 $\\omega(Au_1,\\ldots,Au_n)$ 给出的 $n$ 重交错 $n$ 线性型；$n$ 维空间上这样的型全体是一维的，而 $\\omega(e_1,\\ldots,e_n) = 1$，于是由行列式的「交错、多重线性、取单位阵为 $1$」这三条刻画，',
        '',
        '$$\\omega(Au_1,\\ldots,Au_n) = \\det(A)\\,\\omega(u_1,\\ldots,u_n).$$',
        '',
        '**第二步：套换元公式。** $A$ 保向时 $\\int_{A(U)}\\omega = \\int_{U} A^{\\ast}\\omega = \\det(A)\\int_{U}\\omega$；反向时按公式多一个负号。两种情形合起来是 $\\int_{A(U)}\\omega = |\\det A|\\int_{U}\\omega$，而左边就是 $A(U)$ 的体积：',
        '',
        '$$\\operatorname{vol}\\bigl(A(U)\\bigr) = |\\det A| \\cdot \\operatorname{vol}(U).$$',
        '',
        '取 $U$ 是单位立方体，即得「$\\det$ 的绝对值是把单位立方体拉成的平行体的体积」，符号则记录 $A$ 是否保向。$\\blacksquare$'
      ].join('\n'),
      note: '这条把「行列式的几何读法」从直接的体积公理换成了积分：$|\\det|$ 之所以是体积缩放因子，是因为 $n$-形式是唯一能自然积分的东西。'
    },

    /* ------------------------------------------- 同伦唯一性 → Tor 良定义 */
    {
      id: 'imp.derived-tor-welldefined',
      kind: 'implication',
      layer: false,
      sources: ['prop.resolution-homotopy'],
      target: 'def.tor',
      title: '消解的同伦唯一性保证挠积与消解的选取无关',
      proof: [
        '设 $P_{\\bullet} \\twoheadrightarrow M$ 与 $Q_{\\bullet} \\twoheadrightarrow M$ 是同一个模的两条投射消解。由「消解的同伦唯一性」存在链映射 $\\varphi : P_{\\bullet} \\to Q_{\\bullet}$、$\\psi : Q_{\\bullet} \\to P_{\\bullet}$，使',
        '',
        '$$\\psi\\varphi \\sim 1_{P_{\\bullet}}, \\qquad \\varphi\\psi \\sim 1_{Q_{\\bullet}}.$$',
        '',
        '张量函数 $-\\otimes_{R} N$ 是加法函子：它把 $h : P_{n} \\to P_{n-1}$ 送到 $h\\otimes 1_{N}$，而链同伦的等式 $\\psi\\varphi - 1 = \\partial h + h\\partial$ 张量之后仍然成立（$\\partial$ 也是逐项张量得到的）。于是',
        '',
        '$$(\\psi\\otimes 1)(\\varphi\\otimes 1) \\sim 1_{P_{\\bullet}\\otimes N}, \\qquad (\\varphi\\otimes 1)(\\psi\\otimes 1) \\sim 1_{Q_{\\bullet}\\otimes N},$$',
        '',
        '即 $P_{\\bullet}\\otimes N$ 与 $Q_{\\bullet}\\otimes N$ 在同伦范畴里同构。同伦等价诱导同调的同构，故对每个 $n$',
        '',
        '$$H_{n}\\bigl(P_{\\bullet}\\otimes_{R}N\\bigr) \\cong H_{n}\\bigl(Q_{\\bullet}\\otimes_{R}N\\bigr).$$',
        '',
        '这正是说 $\\operatorname{Tor}^{R}_{n}(M,N) := H_{n}(P_{\\bullet}\\otimes_{R}N)$ 与投射消解的选取无关（同一论断对 $N$ 一侧由内射消解的对称版本给出）。$\\blacksquare$'
      ].join('\n'),
      note: '所以定义里那句「取**一条**投射消解」是合法的 —— 良定义性不是细节，而是「消解可以随便挑」的全部依据。'
    },

    /* -------------------------------------- 长正合列 → 低次正合列 */
    {
      id: 'imp.derived-low-degree-exact',
      kind: 'implication',
      layer: false,
      sources: ['thm.long-exact'],
      target: 'prop.low-degree-exact',
      title: '长正合列的头几项就是低次正合列',
      proof: [
        '**先认出两端。** 对 $G$-模 $M$，标准上链复形的低次项给出 $H^{0}(G,M) = M^{G}$、$H^{1}(G,M) = Z^{1}(G,M)/B^{1}(G,M)$，其中 $B^{1} = \\operatorname{im}\\delta^{0}$、$Z^{1} = \\ker\\delta^{1}$。把',
        '',
        '$$0 \\to \\ker\\delta^{0} \\to C^{0}(G,M) \\xrightarrow{\\ \\delta^{0}\\ } \\ker\\delta^{1} \\to \\ker\\delta^{1}/\\operatorname{im}\\delta^{0} \\to 0$$',
        '',
        '写出来，就得到第一条正合列 $0 \\to M^{G} \\to M \\to Z^{1}(G,M) \\to H^{1}(G,M) \\to 0$。这一段只用到定义。',
        '',
        '**再用长正合列。** 设 $0 \\to A \\to B \\to C \\to 0$ 是 $G$-模的短正合列。$C^{n}(G,-) = \\operatorname{Map}(G^{n},-)$ 逐项正合，所以',
        '',
        '$$0 \\to C^{\\bullet}(G,A) \\to C^{\\bullet}(G,B) \\to C^{\\bullet}(G,C) \\to 0$$',
        '',
        '是**复形**的短正合列。把长正合列定理用在它上面，注意 $R^{0}(-) = (-)^{G}$、$R^{1} = H^{1}$，并取第 $0$、$1$ 项，得',
        '',
        '$$0 \\to A^{G} \\to B^{G} \\to C^{G} \\xrightarrow{\\ \\partial\\ } H^{1}(G,A) \\to H^{1}(G,B) \\to H^{1}(G,C),$$',
        '',
        '其中连接同态 $\\partial$ 就是长正合列里那个 $\\delta$ 在 $(0,1)$ 处的样子：它把「$C$ 的不动点」送到「$A$ 的一维上同调」。两段合起来正是低次正合列。$\\blacksquare$'
      ].join('\n'),
      note: '所以「低次正合列」不必单独证：第二行是长正合列的头几项，第一行是 $H^{0}$、$H^{1}$ 定义的直接读法。'
    },

    /* ------------------------------------------------ Sylow → Lagrange */
    {
      id: 'imp.derived-lagrange-from-sylow',
      kind: 'implication',
      layer: false,
      sources: ['thm.sylow'],
      target: 'thm.lagrange',
      title: 'Sylow 定理推出 Lagrange 定理',
      proof: [
        '设 $G$ 有限、$H \\le G$，记 $v_{p}$ 为素数 $p$ 在该整数里的指数。只要证',
        '',
        '$$v_{p}(|H|) \\le v_{p}(|G|) \\qquad \\text{对每个素数 } p,$$',
        '',
        '因为 $\\mathbb{Z}$ 里逐素数的指数比较就是整除。',
        '',
        '**固定 $p$，令 $b := v_{p}(|H|)$。** 把 Sylow 定理 (1)（存在性）用在有限群 $H$ 上：$H$ 有 $p^{b}$ 阶子群 $Q$。$Q$ 同时也是 $G$ 的 $p$-子群。',
        '',
        '**再用 (2)。** Sylow (2) 说任何 $p$-子群都含在某个 Sylow $p$-子群之中，所以 $Q \\subseteq P$，其中 $P$ 是 $G$ 的一个 Sylow $p$-子群。由 (1) 与 (2) 的共轭性，$G$ 的所有 Sylow $p$-子群同阶，且阶为 $p^{v_{p}(|G|)}$。于是',
        '',
        '$$p^{b} = |Q| \\le |P| = p^{v_{p}(|G|)},$$',
        '',
        '故 $b \\le v_{p}(|G|)$。对一切 $p$ 成立即 $|H|$ 整除 $|G|$，于是 $|G| = |H|\\cdot[G:H]$。$\\blacksquare$'
      ].join('\n'),
      note: '这条只用到 Sylow 的 (1)(2)，不用 (3) 的计数。它同时也解释了为什么「Lagrange 的逆命题」不能这样反过来用 —— 整除只给必要条件，$p$-部分才由 Sylow 补齐。'
    },

    /* ------------------------------- 张量积万有性质 → 多重线性型是泛函 */
    {
      id: 'imp.derived-multilinear-tensor-dual',
      kind: 'implication',
      layer: false,
      sources: ['thm.tensor-universal-property'],
      target: 'def.multilinear-form',
      title: '万有性质给出 $n$ 重线性型与 $V^{\\otimes n}$ 上线性泛函的同构',
      proof: [
        '**二元情形。** 万有性质是 $\\operatorname{Hom}_{K}(V\\otimes W, U) \\cong \\operatorname{Bil}(V,W;U)$。取 $U = K$ 得',
        '',
        '$$\\operatorname{Hom}_{K}(V\\otimes W, K) \\cong \\operatorname{Bil}(V,W;K), \\qquad \\widetilde{B} \\mapsto \\widetilde{B}\\circ\\otimes .$$',
        '',
        '**归纳到 $n$ 元。** 设 $\\operatorname{Mult}_{n-1}(V;K) \\cong \\operatorname{Hom}_{K}(V^{\\otimes n-1}, K)$。给 $f \\in \\operatorname{Mult}_{n}(V;K)$，固定第一个变元得 $f_{v} \\in \\operatorname{Mult}_{n-1}(V;K)$，且 $v \\mapsto f_{v}$ 是线性的；按归纳假设它是线性映射 $V \\to \\operatorname{Hom}_{K}(V^{\\otimes n-1},K)$，而「线性映射进 Hom」等价于双线性映射（currying）',
        '',
        '$$V \\times V^{\\otimes n-1} \\to K, \\qquad (v, w) \\mapsto f_{v}(w).$$',
        '',
        '对这个双线性映射用二元万有性质，得到唯一的线性 $\\widetilde{f} : V\\otimes V^{\\otimes n-1} \\to K$，即 $\\widetilde{f}\\in\\operatorname{Hom}_{K}(V^{\\otimes n},K)$；反向把 $\\widetilde{f}$ 沿 $\\otimes$ 拉回就得到 $f$。两条互逆，故',
        '',
        '$$\\operatorname{Mult}_{n}(V;K) \\cong \\operatorname{Hom}_{K}(V^{\\otimes n}, K).$$',
        '',
        '取定基之后，后者就是「$n$ 维数组 $(f(e_{i_1},\\ldots,e_{i_n}))$」。$\\blacksquare$'
      ].join('\n'),
      note: '这条说明「多重线性型」不是独立的物种：它就是张量幂的对偶空间里的元素，所以多重线性问题可以整块搬进线性代数。'
    },

    /* --------------------------------- 直和就是积 → 分裂短正合列判据 */
    {
      id: 'imp.derived-split-exact-biproduct',
      kind: 'implication',
      layer: false,
      sources: ['prop.biproduct-is-product'],
      target: 'def.split-exact',
      title: '「直和就是积」给出分裂短正合列的等价判据',
      proof: [
        '设 $0 \\to M_{1} \\xrightarrow{\\ i\\ } M \\xrightarrow{\\ p\\ } M_{2} \\to 0$ 正合（于是 $i$ 单、$p$ 满、$\\operatorname{im}i = \\ker p$）。',
        '',
        '**有截面就分裂。** 设 $p s = 1_{M_{2}}$。则 $p(1_{M}-sp) = p - psp = 0$，故 $1_{M}-sp$ 落在 $\\ker p = \\operatorname{im}i$ 里，取 $r$ 使 $i r = 1_{M}-sp$。由 $i$ 单：',
        '',
        '$$i(ri) = (1_{M}-sp)\\,i = i - s(pi) = i \\quad\\text{（用到 } pi = 0\\text{）}\\Longrightarrow ri = 1_{M_{1}}.$$',
        '',
        '于是 $\\{i, p, r, s\\}$ 满足双积的三条等式 $ri = 1_{M_{1}}$、$ps = 1_{M_{2}}$、$ir+sp = 1_{M}$。由「直和就是积」，这三条等式连同 $pi = 0$ 使 $M$ 成为 $M_{1}$ 与 $M_{2}$ 的**双积**：$(M,p)$ 是积、$(M,i)$ 是余积，特别地 $M \\cong M_{1}\\oplus M_{2}$ 且该列同构于标准列，即分裂。',
        '',
        '**分裂就有截面。** 分裂时该列同构于 $0 \\to M_{1} \\xrightarrow{\\operatorname{pr}_{1}} M_{1}\\oplus M_{2} \\xrightarrow{\\operatorname{pr}_{2}} M_{2} \\to 0$，而 $\\operatorname{pr}_{2}$ 有显然的截面 $m_{2}\\mapsto (0,m_{2})$。',
        '',
        '两条合起来给出分裂短正合列的三条等价判据。$\\blacksquare$'
      ].join('\n'),
      note: '关键的一步是「双积的三条等式」，而那正是「直和就是积」的内容 —— 没有它就只能说「该列分裂」，说不出 $M$ 是直和。'
    },

    /* --------------------------------------- 归纳原理 → 公式的归纳定义 */
    {
      id: 'imp.derived-formula-induction',
      kind: 'implication',
      layer: false,
      sources: ['thm.induction'],
      target: 'def.formula',
      title: '归纳原理保证可以对公式作归纳',
      proof: [
        '公式全体是「含全部原子公式、并对连接词与量词封闭」的**最小**集合。给公式 $\\varphi$ 定义**复杂度** $c(\\varphi)$：原子公式的复杂度为 $0$，每次套一个连接词或一个量词就加 $1$；它是 $\\mathbb{N}$ 的元素。',
        '',
        '设性质 $P$ 满足：原子公式有 $P$；且 $\\varphi$ 有 $P$ 时 $\\neg\\varphi$ 有 $P$，$\\varphi,\\psi$ 都有 $P$ 时 $(\\varphi\\wedge\\psi)$ 等有 $P$，$\\varphi$ 有 $P$ 时 $\\forall v_{i}\\varphi$、$\\exists v_{i}\\varphi$ 有 $P$。',
        '',
        '**令 $S$ 是那些 $n \\in \\mathbb{N}$ 的集合，要求「所有复杂度不超过 $n$ 的公式都有 $P$」。** 则 $0 \\in S$（原子公式只有这一档）；而若 $n \\in S$，任取复杂度为 $n+1$ 的公式，它是某个（或某两个）复杂度不超过 $n$ 的公式套一次运算得到的，由归纳假设与上面的封闭性它有 $P$，故 $n+1 \\in S$。',
        '',
        '由归纳原理 $S = \\mathbb{N}$，即每个公式都有 $P$。这就是「对公式的复杂度作归纳」的合法性 —— 也是「公式是元数学对象」这一说的技术内容。$\\blacksquare$'
      ].join('\n'),
      note: '所以「归纳定义 = 最小集合」与「复杂度归纳」是同一件事的两面：最小性给证明模板，$\\mathbb{N}$ 上的归纳原理给它的合法性。'
    },

    /* --------------------------------- 微分定理 → 平均算子的极限行为 */
    {
      id: 'imp.derived-average-limit',
      kind: 'implication',
      layer: false,
      sources: ['thm.lebesgue-differentiation'],
      target: 'def.average-operator',
      title: 'Lebesgue 微分定理给出平均算子 $A_{r}$ 的极限',
      proof: [
        '平均算子定义为',
        '',
        '$$A_{r}f(x) := \\frac{1}{m\\bigl(B(r,x)\\bigr)}\\int_{B(r,x)} f\\,\\mathrm{d}m,$$',
        '',
        '即 $f$ 在球上的平均值。Lebesgue 微分定理说：对 $f \\in L^{1}_{\\mathrm{loc}}$，',
        '',
        '$$\\lim_{r\\to 0} A_{r}f(x) = f(x) \\qquad \\text{a.e.}$$',
        '',
        '把定义代进去，这正是「$r \\to 0$ 时 $A_{r}f$ 回到 $f$」—— 于是 $\\{A_{r}\\}_{r>0}$ 是一族在 $r\\to 0$ 时收敛到恒等算子的平均算子。',
        '',
        '**极限只能是 a.e. 的。** 取 $f = \\chi_{\\mathbb{Q}}$：$f = 0$ a.e.，故 $A_{r}f(x) \\to 0$ a.e.；但 $f(0) = 1$，而 $A_{r}f(0) = 0$ 对每个 $r$ 成立，逐点收敛在 $0$ 处就失败了。所以「$A_{r}f \\to f$ 处处」是错的，「a.e.」不能换成「处处」。$\\blacksquare$'
      ].join('\n'),
      note: '定义本身只写了「怎么平均」，没有写「平均收敛到谁」；后一半是定理的内容，而它恰好就是 Lebesgue 微分定理。'
    },

    /* ---------------------------------- 绝妙定理 → 曲率是等距不变量 */
    {
      id: 'imp.derived-isometry-curvature',
      kind: 'implication',
      layer: false,
      sources: ['thm.theorema-egregium'],
      target: 'def.isometry-surface',
      title: '绝妙定理说高斯曲率是局部等距的不变量',
      proof: [
        '绝妙定理：若 $\\varphi : S_{1}\\to S_{2}$ 是局部等距，则',
        '',
        '$$K_{1}(p) = K_{2}\\bigl(\\varphi(p)\\bigr) \\qquad (p \\in S_{1}).$$',
        '',
        '**取逆否。** 若存在 $p$ 使 $K_{1}(p) \\ne K_{2}(\\varphi(p))$，则 $\\varphi$ 不是局部等距 —— 于是「$K$ 取值不同」直接否掉局部等距，不必逐点比较第一基本形式。',
        '',
        '**例子。** 柱面 $K = 0$、半径 $R$ 的球面 $K = 1/R^{2}$，两者不局部等距（虽然都摆在 $\\mathbb{R}^{3}$ 里、看上去都「弯」）；反过来 $K$ 相同也不够（等距的真正判据是「存在参数化使 $E,F,G$ 逐个相等」）。',
        '',
        '所以 $K$ 是定义 $\\varphi$ 时**唯一**能只看一个数就否掉局部等距的量：它是局部等距的不变量，而主曲率 $k_{1},k_{2}$ 与平均曲率 $H$ 都不是。$\\blacksquare$'
      ].join('\n'),
      note: '这条把「等距」这个定义与「曲率」这个度量量接上：等距保持 $I$（定义如此），绝妙定理再把 $K$ 说成 $I$ 的函数，两步合起来才是「$K$ 是等距不变量」。'
    },

    /* ------------------------------------ de Rham 定理 → 零次上同调 */
    {
      id: 'imp.derived-h0-from-de-rham',
      kind: 'implication',
      layer: false,
      sources: ['thm.de-rham'],
      target: 'thm.de-rham-h0',
      title: 'de Rham 定理的 $k=0$ 情形：上同调数连通分支',
      proof: [
        'de Rham 定理给 $k = 0$ 的自然同构',
        '',
        '$$\\Phi^{0} : H^{0}_{\\mathrm{dR}}(M) \\longrightarrow H^{0}_{\\mathrm{sing}}(M;\\mathbb{R}), \\qquad [\\omega] \\longmapsto \\Bigl([c]\\mapsto \\int_{c}\\omega\\Bigr).$$',
        '',
        '**右边直接算。** 奇异 $0$-链是点的形式和，所以 $0$-上链就是「给每个点一个实数」的函数；对一条道路 $\\sigma$，',
        '',
        '$$\\delta^{0}f(\\sigma) = f\\bigl(\\sigma(1)\\bigr) - f\\bigl(\\sigma(0)\\bigr).$$',
        '',
        '于是 $f$ 是上循环当且仅当它在每条道路两端取值相同，即 $f$ 在**道路连通分支**上常值；又因为没有 $-1$-单形，上边缘群为零。流形局部道路连通，连通与道路连通一致，设连通分支有 $c$ 个，则',
        '',
        '$$H^{0}_{\\mathrm{sing}}(M;\\mathbb{R}) \\cong \\mathbb{R}^{c},$$',
        '',
        '再由 $\\Phi^{0}$ 得 $H^{0}_{\\mathrm{dR}}(M) \\cong \\mathbb{R}^{c}$；特别地 $M \\ne \\emptyset$ 时 $M$ 连通当且仅当 $\\dim H^{0}_{\\mathrm{dR}}(M) = 1$。$\\blacksquare$'
      ].join('\n'),
      note: '这里没有任何「形式」的计算：$H^{0}$ 的整条结论都是从 de Rham 定理借来的，$k \\ge 1$ 才需要 Poincaré 引理那一套。'
    },

    /* ------------------------------------- 留数定理 → Cauchy 积分公式 */
    {
      id: 'imp.derived-cif-from-residue',
      kind: 'implication',
      layer: false,
      sources: ['thm.residue'],
      target: 'thm.cauchy-integral-formula',
      title: '留数定理在 $f(\\zeta)/(\\zeta-z)$ 上就是 Cauchy 积分公式',
      proof: [
        '设 $\\Omega$ 有界、$\\partial\\Omega$ 是分段光滑简单闭曲线、取正向，$f$ 在包含 $\\overline{\\Omega}$ 的开集上全纯。对 $z \\in \\Omega$ 令',
        '',
        '$$g(\\zeta) := \\frac{f(\\zeta)}{\\zeta - z}.$$',
        '',
        '则 $g$ 在 $\\Omega$ 上除 $z$ 外全纯，$z$ 是它唯一的奇点（一阶极点）。把 $g$ 拆成',
        '',
        '$$g(\\zeta) = \\frac{f(z)}{\\zeta - z} + \\frac{f(\\zeta)-f(z)}{\\zeta - z},$$',
        '',
        '第二项在 $z$ 处有有限极限 $f^{\\prime}(z)$，因而在 $\\Omega$ 上全纯；第一项的 Laurent 系数 $c_{-1}$ 是 $f(z)$。所以 $\\operatorname{Res}(g,z) = f(z)$。',
        '',
        '**用留数定理**（只有一个奇点）：',
        '',
        '$$\\oint_{\\partial\\Omega} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta = 2\\pi i\\,\\operatorname{Res}(g,z) = 2\\pi i\\, f(z),$$',
        '',
        '即 $f(z) = \\dfrac{1}{2\\pi i}\\oint_{\\partial\\Omega}\\dfrac{f(\\zeta)}{\\zeta-z}\\,\\mathrm{d}\\zeta$。留数定理的证明只用多连通 Cauchy–Goursat（挖洞）与留数的定义，不经过 Cauchy 积分公式，所以这是一条独立路线。$\\blacksquare$'
      ].join('\n'),
      note: '换句话说：Cauchy 积分公式是留数定理「只有一个一阶极点」的特例。两条路都合法，只是留数那条要多走一步 Laurent 系数。'
    },

    /* --------------------------------- Poisson 公式 → 调和均值性质 */
    {
      id: 'imp.derived-mean-value-poisson',
      kind: 'implication',
      layer: false,
      sources: ['thm.poisson-formula', 'thm.harmonic-conjugate'],
      target: 'thm.harmonic-mean-value',
      title: 'Poisson 积分公式在圆心处退化成均值性质',
      proof: [
        '**先取得全纯函数。** 圆盘 $D(a,r)$ 单连通，由调和函数的共轭，$D(a,r)$ 上的调和 $u$ 是某个全纯函数 $f$ 的实部。',
        '',
        '**把原点搬到 $a$。** 令 $v(h) := u(a+h)$，则 $v$ 在 $D(0,r)$ 上调和，且仍是全纯函数的实部（取 $f(a+h)$）。',
        '',
        '**Poisson 公式**（对 $v$，$0 < \\rho < r$、$|z| < \\rho$）：',
        '',
        '$$v(z) = \\frac{1}{2\\pi}\\int_{0}^{2\\pi} \\frac{\\rho^{2}-|z|^{2}}{|\\rho e^{i\\theta}-z|^{2}}\\, v(\\rho e^{i\\theta})\\,\\mathrm{d}\\theta .$$',
        '',
        '**取 $z = 0$：** 核变成 $\\dfrac{\\rho^{2}-0}{\\rho^{2}} = 1$，于是',
        '',
        '$$u(a) = v(0) = \\frac{1}{2\\pi}\\int_{0}^{2\\pi} u\\bigl(a + \\rho e^{i\\theta}\\bigr)\\,\\mathrm{d}\\theta ,$$',
        '',
        '对每个 $0 < \\rho < r$ 成立 —— 这就是圆周均值性质（把 $\\rho$ 改回 $r$ 只是换字母）。',
        '',
        '**面积平均。** 对 $s \\in (0,r)$ 用一圈的均值 $u(a) = \\frac{1}{2\\pi}\\int_{0}^{2\\pi}u(a+se^{i\\theta})\\,\\mathrm{d}\\theta$，再乘 $2\\pi s$ 对 $s$ 积分并用极坐标：',
        '',
        '$$\\iint_{D(a,r)} u\\,\\mathrm{d}x\\,\\mathrm{d}y = \\int_{0}^{r} 2\\pi s\\, u(a)\\,\\mathrm{d}s = \\pi r^{2} u(a).$$',
        '',
        '两条合起来就是均值性质。$\\blacksquare$'
      ].join('\n'),
      note: 'Poisson 公式在 $z = 0$ 处权函数恒为 $1$，所以「核是一个单位分解」这件事在圆心退化成一句最朴素的平均。'
    },

    /* ------------------------------- Cauchy 中值定理 → Lagrange 中值定理 */
    {
      id: 'imp.derived-lagrange-mvt-from-cauchy',
      kind: 'implication',
      layer: false,
      sources: ['thm.cauchy-mvt'],
      target: 'thm.mvt',
      title: 'Cauchy 中值定理取 $g(x)=x$ 就是 Lagrange 中值定理',
      proof: [
        'Cauchy 中值定理：$f,g$ 在 $[a,b]$ 上连续、在 $(a,b)$ 内可导、$g^{\\prime} \\ne 0$，则存在 $\\xi \\in (a,b)$ 使',
        '',
        '$$\\frac{f(b)-f(a)}{g(b)-g(a)} = \\frac{f^{\\prime}(\\xi)}{g^{\\prime}(\\xi)} .$$',
        '',
        '**取 $g(x) = x$。** 则 $g^{\\prime}(x) = 1 \\ne 0$ 处处成立（$g^{\\prime} \\ne 0$ 的前提满足），$g(b)-g(a) = b-a \\ne 0$（分母有意义），代入得',
        '',
        '$$\\frac{f(b)-f(a)}{b-a} = f^{\\prime}(\\xi),$$',
        '',
        '即 $f(b)-f(a) = f^{\\prime}(\\xi)\\,(b-a)$。$g$ 的两个前提（连续、可导、导数非零）对 $g(x)=x$ 自动成立，所以 Cauchy 版本的条件不比 Lagrange 版本更强，特化是合法的。$\\blacksquare$'
      ].join('\n'),
      note: 'Cauchy 版本真正的增量在「两个增量用同一个 $\\xi$」—— 那才是 L\'Hôpital 法则的入口；取 $g = x$ 时这份增量消失，退回 Lagrange。'
    },

    /* ---------------------------- 常秩定理 → 逆映射定理（用户点的：一般 → 特例） */
    {
      id: 'imp.derived-inverse-from-rank',
      kind: 'implication',
      layer: false,
      sources: ['cor.rank-theorem'],
      target: 'thm.inverse-function',
      title: '秩定理取 $r = n = m$ 就是逆映射定理',
      proof: [
        '常秩定理：若 $f : U \\to \\mathbb{R}^{m}$ 的 Jacobi 矩阵秩在 $U$ 上恒为 $r$，则局部存在光滑坐标变换 $\\varphi, \\psi$ 使',
        '',
        '$$\\psi \\circ f \\circ \\varphi^{-1}(x_{1}, \\ldots, x_{n}) = (x_{1}, \\ldots, x_{r}, 0, \\ldots, 0).$$',
        '',
        '**① 把「一点满秩」变成「邻域恒满秩」。** 逆映射定理只知道 $Df(a)$ 可逆。但 $x \\mapsto \\det Df(x)$ 连续且 $\\det Df(a) \\ne 0$，所以存在 $a$ 的邻域 $U\' \\subseteq U$ 使 $\\det Df(x) \\ne 0$ 对一切 $x \\in U\'$ 成立 —— 即 $\\operatorname{rank} Df \\equiv n$ 在 $U\'$ 上。这里 $n = m$，故 $r = n = m$，常秩定理的前提成立。',
        '',
        '**② 代入 $r = n = m$。** 标准形里没有零尾巴，于是',
        '',
        '$$\\psi \\circ f \\circ \\varphi^{-1} = \\mathrm{id} \\qquad \\Longrightarrow \\qquad f = \\psi^{-1} \\circ \\varphi \\quad (\\text{在 } a \\text{ 的邻域上}) .$$',
        '',
        '两个坐标变换都是微分同胚，所以 $f$ 局部是微分同胚：存在开邻域 $V \\ni a$ 与 $W \\ni f(a)$ 使 $f|_{V} : V \\to W$ 是双射，且 $g := (f|_{V})^{-1} = \\varphi^{-1} \\circ \\psi$ 也光滑。',
        '',
        '**③ 导数。** 由 $g \\circ f = \\mathrm{id}$ 与链式法则，$Dg(f(x)) \\circ Df(x) = I$，取 $x = g(y)$ 即',
        '',
        '$$Dg(y) = \\bigl( Df(g(y)) \\bigr)^{-1}. \\qquad \\blacksquare$$'
      ].join('\n'),
      note: '黑边 `imp.rank-theorem` 走的是反方向（逆映射定理 $+$ 隐函数定理 $\\implies$ 秩定理）—— 两条都在，正好把「秩定理是全家桶、逆映射定理是 $r=n=m$ 那一格」这件事画出来。粉边不进分层，不构成环。'
    },

    /* --------------------------------- 常秩定理 → 隐函数定理 */
    {
      id: 'imp.derived-implicit-from-rank',
      kind: 'implication',
      layer: false,
      sources: ['cor.rank-theorem'],
      target: 'thm.implicit-function',
      title: '秩定理的淹没情形 $r = m$ 就是隐函数定理',
      proof: [
        '沿用隐函数定理的记号：$F : U \\subseteq \\mathbb{R}^{n} \\times \\mathbb{R}^{m} \\to \\mathbb{R}^{m}$，$F(a,b) = 0$，$D_{y}F(a,b)$ 可逆。',
        '',
        '**① 秩恒为 $m$。** $D_{y}F$ 是 $DF$ 里的一整块 $m \\times m$ 子矩阵，它可逆 $\\implies \\operatorname{rank} DF(a,b) \\ge m$；而值域是 $\\mathbb{R}^{m}$，故秩恰为 $m$。由 $\\det D_{y}F \\ne 0$ 在 $(a,b)$ 附近持续成立，秩在邻域上恒为 $r = m$。',
        '',
        '**② 秩定理的坐标片。** 存在光滑坐标 $\\varphi$（在 $(a,b)$ 附近）、$\\psi$（在 $0$ 附近）使',
        '',
        '$$\\psi \\circ F \\circ \\varphi^{-1}(x_{1}, \\ldots, x_{n+m}) = (x_{1}, \\ldots, x_{m}) .$$',
        '',
        '于是水平集 $S := \\{ F = 0 \\}$ 在 $(a,b)$ 附近正好是 $\\varphi^{-1}$ 下的坐标片 $\\{ x_{1} = \\cdots = x_{m} = c \\}$（$c = \\psi(0)$）—— 一张 $n$ 维的 $C^{1}$ 子流形。',
        '',
        '**③ 切空间横截。** $T_{(a,b)}S = \\ker DF(a,b)$：一边是「$F$ 在 $S$ 上恒 $0$」，另一边维数对得上（$n = (n+m) - m$）。而 $\\ker DF \\cap (\\{0\\} \\times \\mathbb{R}^{m}) = \\{0\\}$ —— 落在后一块里的向量满足 $D_{y}F \\cdot v = 0$，$D_{y}F$ 可逆；$\\ker DF$ 里后一半坐标为零的向量也满足 $D_{y}F \\cdot v = 0$。',
        '',
        '**④ 换成「$y = g(x)$」。** 记 $\\pi_{x}$ 为投影到前 $n$ 个原坐标。由 ③，$\\pi_{x}|_{S}$ 的微分在每点单射，而两侧维数都是 $n$，故是同构。再对 $\\pi_{x} : S \\to \\mathbb{R}^{n}$ 用一次逆映射定理：它在 $(a,b)$ 附近是 $C^{1}$ 微分同胚，故 $S$ 是一张图像 $y = g(x)$，$g(a) = b$，$g$ 为 $C^{1}$。',
        '',
        '**⑤ 导数。** 把 $F(x, g(x)) \\equiv 0$ 对 $x$ 求导：$D_{x}F + D_{y}F \\cdot Dg = 0$，即 $Dg = -(D_{y}F)^{-1}D_{x}F$。$\\blacksquare$'
      ].join('\n'),
      note: '课本里那条短路线是「对 $\\Phi(x,y) = (x, F(x,y))$ 用逆映射定理」（黑边 `imp.implicit-function`）；这里走的是秩定理的**淹没情形**，路长一点，但把「隐函数定理也是秩定理的一格」说清楚了。⚠ ④ 用了一次逆映射定理 —— 与黑边那条构成环，粉边的规矩允许（黑边已保证骨架无环）。'
    },

    /* ---------------------------- Schwarz–Pick → Schwarz 引理 */
    {
      id: 'imp.derived-schwarz-from-pick',
      kind: 'implication',
      layer: false,
      sources: ['thm.schwarz-pick'],
      target: 'lem.schwarz',
      title: 'Schwarz–Pick 取 $z_{0} = 0$、$f(0) = 0$ 就是 Schwarz 引理',
      proof: [
        'Schwarz–Pick：对全纯 $f : \\mathbb{D} \\to \\mathbb{D}$ 与任意 $z_{0} \\in \\mathbb{D}$，',
        '',
        '$$\\left| \\frac{f(z) - f(z_{0})}{1 - \\overline{f(z_{0})}\\, f(z)} \\right| \\le \\left| \\frac{z - z_{0}}{1 - \\overline{z_{0}}\\, z} \\right|, \\qquad \\frac{|f^{\\prime}(z_{0})|}{1 - |f(z_{0})|^{2}} \\le \\frac{1}{1 - |z_{0}|^{2}} .$$',
        '',
        '**取 $z_{0} = 0$ 并假设 $f(0) = 0$。** 两处分母都变成 $1$，左边分子变成 $|f(z) - 0|$，右边分子变成 $|z - 0|$，于是',
        '',
        '$$|f(z)| \\le |z|, \\qquad |f^{\\prime}(0)| \\le 1 ,$$',
        '',
        '正是 Schwarz 引理的 (1)(2)。',
        '',
        '**等号情形。** Pick 说「某个 $z \\ne z_{0}$ 或导数处取等号 $\\iff$ $f$ 是 $\\mathbb{D}$ 的分式线性自同构」。而固定原点的分式线性自同构只有 $\\varphi_{0} \\equiv 0$ 这一族退化情形可用，即 $z \\mapsto e^{i\\theta} z$：代入 $\\varphi_{a}(z) = (z-a)/(1-\\bar a z)$ 取 $a = 0$ 得 $\\varphi_{0}(z) = z$，再乘上单位模常数。故等号成立 $\\iff$ $f$ 是旋转 —— 正是引理的 (3)。$\\blacksquare$'
      ].join('\n'),
      note: '黑边 `imp.schwarz-pick` 走反方向（Schwarz 引理 $+$ 圆盘自同构 $\\implies$ Pick）。两条并存：一条是证明路线，一条记录「引理只是 Pick 在原点处的那一格」。'
    },

    /* ------------------------------ 缩并 → 取迹 */
    {
      id: 'imp.derived-trace-from-contraction',
      kind: 'implication',
      layer: false,
      sources: ['def.tensor-contraction'],
      target: 'def.trace',
      title: '$(1,1)$ 型缩并就是取迹',
      proof: [
        '取 $(1,1)$ 型张量场 $T$（$r = s = 1$），缩并 $\\mathrm{C}^{1}_{\\,1}T$ 是 $(0,0)$ 型 —— 一个函数。在卡里它是',
        '',
        '$$\\bigl(\\mathrm{C}^{1}_{\\,1}T\\bigr)_{p} = \\sum_{a=1}^{n} T^{a}_{\\ a}.$$',
        '',
        '**它就是迹。** 把 $T$ 在某点的分量写成矩阵 $A = (T^{i}_{\\ j})$（第 $i$ 行是上标、第 $j$ 列是下标），则上式正是 $\\sum_{a} A_{aa} = \\operatorname{tr} A$。所以「缩并」在 $r = s = 1$ 这一格上退化成取迹。',
        '',
        '**顺带得到 $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$。** 缩并按哪一个上标与哪一个下标配对来定义；而求和号 $\\sum_{a} T^{\\ldots a \\ldots}_{\\ldots a \\ldots}$ 里的哑标可以任意换名 —— 换成另一对上下标就是另一种缩并，在 $A B$ 上分别算得 $\\operatorname{tr}(AB)$ 与 $\\operatorname{tr}(BA)$。两者是同一个张量的同一组求和指标的重排，故相等。$\\blacksquare$'
      ].join('\n'),
      note: '蓝色定义线 `dep.mf2-trace-contraction` 说的是「取迹要用缩并这个定义」；这条粉边说的是反向的识别：取迹就是缩并的最简单一格。'
    },

    /* ------------------------- Arzelà–Ascoli → Montel */
    {
      id: 'imp.derived-montel-from-ascoli',
      kind: 'implication',
      layer: false,
      sources: ['thm.arzela-ascoli', 'thm.cauchy-inequality'],
      target: 'thm.montel',
      title: 'Arzelà–Ascoli 在全纯函数族上就是 Montel 定理',
      proof: [
        '设 $\\mathcal{F}$ 在区域 $\\Omega$ 上局部一致有界，$f_{n}$ 是其中一列。',
        '',
        '**① 一个紧集上的两条前提。** 取紧的 $K \\subset \\Omega$，令 $\\rho = \\operatorname{dist}(K, \\partial \\Omega) > 0$，取 $K \\subseteq \\Omega$ 的内点集 $K_{\\rho/2} = \\{ z : \\operatorname{dist}(z, K) \\le \\rho/2 \\}$。局部一致有界 $\\implies$ 存在 $M$ 使 $|f| \\le M$ 在 $K_{\\rho/2}$ 上一族一致地成立。于是',
        '',
        '- **一致有界**：$|f| \\le M$ 在 $K$ 上；',
        '- **等度连续**：将 Cauchy 不等式（$n = 1$、半径 $\\rho/2$）作用在 $K$ 的各点的小圆盘上，得 $|f^{\\prime}| \\le 2M/\\rho$ 在 $K$ 上对**一切** $f \\in \\mathcal{F}$ 同时成立；中值不等式遂给 $|f(x) - f(y)| \\le (2M/\\rho)\\,|x - y|$，$\\delta = \\varepsilon \\rho/(2M)$ 与 $f$ 无关。',
        '',
        '**② 用 Arzelà–Ascoli。** $K$ 是紧距离空间，对上式那族 $\\{ f_{n}|_{K} \\}$ 用 Arzelà–Ascoli：存在子列在 $K$ 上一致收敛。',
        '',
        '**③ 对角化到内闭一致收敛。** 取穷尽 $\\Omega$ 的紧集列 $K_{1} \\subset \\subset K_{2} \\subset \\subset \\cdots$（$\\bigcup K_{j} = \\Omega$，每个 $K_{j}$ 含于下一个的内部）。第 ② 步在 $K_{1}$ 上抽出子列，在该子列里对 $K_{2}$ 再抽，依此类推；取「第 $j$ 个子列的第 $j$ 项」这个对角子列，它在每个 $K_{j}$ 上从某一项起都属于第 $j$ 个子列，故在 $K_{j}$ 上一致收敛。',
        '',
        '**④ 极限全纯。** 内闭一致收敛的全纯函数列的极限全纯（Weierstrass 定理），故 $\\mathcal{F}$ 是正规族。$\\blacksquare$'
      ].join('\n'),
      note: '两个源缺一不可：Arzelà–Ascoli 给紧性，Cauchy 不等式把「全纯」换成「等度连续」—— 一般连续函数族没有这一条。'
    }
  ]
});
