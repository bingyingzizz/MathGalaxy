/* ============================================================================
   内容包 · v1 收尾（2026-11-04 第二批）
   ----------------------------------------------------------------------------
   补两类还没修完的 v1 项：

   **E4 例子层**（L≥18 的定义只有 19% 带例子 —— 审计原话「越抽象越没例子」）
     这次挑的都是**能当场算出来**的：极坐标的 Christoffel 符号 · $\mathfrak{sl}_2$ 的交换子 ·
     $\oint \mathrm{d}z/z$ · 到坐标平面的正交投影 · 圆柱的第一基本形式 · 密度型的绝对连续。
     ⛔ 不写「例如球面」这种没内容的。

   **D1 区域矩阵**（49 对星系之间一条边都没有）
     只补**真存在**的桥，一条一条说明为什么：
       `def.measure` → `def.volume-density`      密度是「对 Lebesgue 测度积分」的对象（analysis-measure—diffgeom）
       `def.wellorder` → `thm.int-division`      带余除法的存在性用 $\mathbb{N}$ 的良序（order-theory—number）
       `def.profinite-integers`（新节点）        $\hat{\mathbb{Z}} = \varprojlim \mathbb{Z}/n$，
                                                  CRT 把它拆成 $\prod_p \mathbb{Z}_p$（number—topology）
     ⚠ 其余零边对**故意不连**：逻辑—微分几何、数论—微分几何这种，硬连只会造出假边。
       这一条按项目口径办：宁可少连，不连假的。
   ========================================================================== */
(window.MG = window.MG || {}).packs = window.MG.packs || [];
window.MG.packs.push({
  name: 'v1 收尾：6 个能算的例子 + 3 条区域桥（含 ℤ̂）',

  nodes: [
    {
      id: 'ex.polar-christoffel',
      cluster: 'diffgeom.intrinsic',
      type: 'example',
      label: '极坐标的 Christoffel 符号',
      title: '极坐标：$\\Gamma^{r}_{\\varphi\\varphi} = -r$、$\\Gamma^{\\varphi}_{r\\varphi} = 1/r$，其余为零',
      regions: ['geometry'],
      tags: ['例', '微分几何', '联络', '极坐标'],
      statement: [
        '在 $\\mathbb{R}^{2}\\setminus\\{0\\}$ 上取极坐标 $(r, \\varphi)$，度量为 $g = \\mathrm{d}r^{2} + r^{2}\\,\\mathrm{d}\\varphi^{2}$。则 Christoffel 符号只有三个非零：',
        '',
        '$$\\Gamma^{r}_{\\varphi\\varphi} = -r, \\qquad \\Gamma^{\\varphi}_{r\\varphi} = \\Gamma^{\\varphi}_{\\varphi r} = \\frac{1}{r}.$$',
      ].join('\n'),
      notes: [
        '**怎么算**：$g_{rr} = 1$、$g_{\\varphi\\varphi} = r^{2}$、$g_{r\\varphi} = 0$，逆矩阵是 $g^{rr} = 1$、$g^{\\varphi\\varphi} = r^{-2}$。' +
          '代入 $\\Gamma^{k}_{ij} = \\tfrac{1}{2}g^{kl}(\\partial_{i}g_{jl} + \\partial_{j}g_{il} - \\partial_{l}g_{ij})$：' +
          '唯一非平凡的导数是 $\\partial_{r}g_{\\varphi\\varphi} = 2r$，于是 $\\Gamma^{r}_{\\varphi\\varphi} = -\\tfrac12\\cdot 1\\cdot 2r$、' +
          '$\\Gamma^{\\varphi}_{r\\varphi} = \\tfrac12 \\cdot r^{-2}\\cdot 2r$，其余项因为 $g$ 与 $\\varphi$ 无关而消失。',
        '⭐ **它为什么值得算**：这些符号是「坐标网格本身在弯」的账，不是空间在弯。' +
          '所以极坐标下测地线方程 $\\ddot r - r\\dot\\varphi^{2} = 0$、$\\ddot\\varphi + \\tfrac{2}{r}\\dot r\\dot\\varphi = 0$ ' +
          '给出的仍是**直线**（例如 $r\\cos\\varphi = $ 常数）—— 平坦空间在坏坐标下的曲率必须算成 $0$，这是检验计算的硬检查。',
        '📌 **一致性的证据**：把上面两组符号代进 $R^{r}{}_{\\varphi r\\varphi} = \\partial_{r}\\Gamma^{r}_{\\varphi\\varphi} - \\cdots$ 会得到 $0$，' +
          '与「$\\mathbb{R}^{2}$ 平坦」相符。算错一个因子，$R$ 就不为零 —— 这条常用来抓 $1/r$ 与 $-r$ 搞混的错。',
        '⚠ **$r = 0$ 处不能用**：极坐标在原点退化（$\\varphi$ 无定义），所以这是**局部**例子；' +
          '要在全平面谈必须换图卡 —— 这正是「流形的联络由局部数据拼出来」的意思。',
      ].join('\n\n'),
      refs: ['do Carmo, Riemannian Geometry, Ch. 2（极坐标的例子）'],
    },

    {
      id: 'ex-sl2-commutator',
      cluster: 'diffgeom.vector',
      type: 'example',
      label: 'sl₂ 的交换子',
      title: '矩阵交换子：$[E, F] = H$、$[H, E] = 2E$、$[H, F] = -2F$',
      regions: ['geometry', 'algebra'],
      tags: ['例', 'Lie 代数', '矩阵'],
      statement: [
        '取',
        '',
        '$$E = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix},\\quad F = \\begin{pmatrix} 0 & 0 \\\\ 1 & 0 \\end{pmatrix},\\quad H = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix},$$',
        '',
        '在 $[A, B] := AB - BA$ 下，这三个矩阵张成的三维空间对括号封闭，且',
        '',
        '$$[E, F] = H, \\qquad [H, E] = 2E, \\qquad [H, F] = -2F.$$',
      ].join('\n'),
      notes: [
        '**逐条验**：$EF = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$、$FE = \\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}$，相减正是 $H$；' +
          '$HE = E$、$EH = -E$ $\\implies$ $[H,E] = 2E$；同理 $[H,F] = -2F$。',
        '⭐ **为什么这三个是标准例子**：它们就是 $\\mathfrak{sl}_{2}$ 的**标准基** —— 「特征值 $2, 0, -2$」的伴随作用让整个表示论可以画在一张图上。' +
          '本图的 `def.lie-bracket` 说「反称 + Jacobi」，这里能直接看到反称（$[E,E] = 0$）与 Jacobi 恒等式在三元组上成立。',
        '📌 **括号是「换位子的无穷小版」**：对矩阵群，$\\exp(tA)\\exp(tB)\\exp(-tA)\\exp(-tB) = I + t^{2}[A,B] + O(t^{3})$ —— ' +
          '所以交换子测的正是「两个流在多大程度上不交换」。这条式子本图没有节点（`def.lie-group` 的注里提了线性化，没给这条路），这里只作为读法。',
        '⚠ **别把 $[A,B]$ 当成矩阵乘法的「另一种写法」**：$[A,B]$ 与 $AB$ 是完全不同的对象（前者在 $A = B$ 时为零）。' +
          'Lie 括号也不是结合运算：$[A,[B,C]] \\ne [[A,B],C]$ 一般而言 —— 代替结合律的是 Jacobi。',
      ].join('\n\n'),
      refs: ['Hall, Lie Groups, Lie Algebras, and Representations, §2.1'],
    },

    {
      id: 'ex.contour-1-over-z',
      cluster: 'analysis.complex',
      type: 'example',
      label: '∮dz/z',
      title: '$\\oint_{|z| = 1} \\dfrac{\\mathrm{d}z}{z} = 2\\pi i$：最简单的「闭而不恰当」',
      regions: ['complex'],
      tags: ['例', '复分析', '围道积分', '留数'],
      statement: [
        '取单位圆 $\\gamma(\\theta) = e^{i\\theta}$（$0 \\le \\theta \\le 2\\pi$，逆时针）。则',
        '',
        '$$\\oint_{\\gamma} \\frac{\\mathrm{d}z}{z} = \\int_{0}^{2\\pi} \\frac{ie^{i\\theta}\\,\\mathrm{d}\\theta}{e^{i\\theta}} = i\\int_{0}^{2\\pi}\\mathrm{d}\\theta = 2\\pi i.$$',
      ].join('\n'),
      notes: [
        '**它为什么是「基准值」**：任何围道积分的第一步都是把被积函数写成 $\\sum a_{k}(z - z_{0})^{k}$，' +
          '而 $\\oint (z - z_{0})^{k}\\mathrm{d}z$ 只在 $k = -1$ 时非零（等于 $2\\pi i$）。所以这个数就是留数的「单位」。',
        '⭐ **它同时是 $H^{1}(S^{1}) \\ne 0$ 的证据**：$\\mathrm{d}z/z$ 是闭的（1 维形式，$\\mathrm{d}^{2} = 0$ 平凡）但不恰当 —— ' +
          '恰当的话围道积分必须是 $0$。同调那一侧的说法见 `ex.h1-circle`。',
        '📌 **把它当成绕数**：对任意闭曲线 $\\gamma$（不经过 $0$），$\\frac{1}{2\\pi i}\\oint_{\\gamma}\\mathrm{d}z/z$ 是一个**整数**，' +
          '就是 $\\gamma$ 绕 $0$ 的圈数（`def.winding-number`）。这一条把「积分 = 整数」这个反直觉事实说清楚了。',
        '⚠ **$1/z$ 在 $0$ 处的奇点不能「修掉」**：它是单极点（Laurent 展开有 $z^{-1}$ 项），不是可去奇点 —— ' +
          '对比 $\\sin z/z$（可去，`thm.riemann-removable`）。两条围道积分一个给 $2\\pi i$、一个给 $0$，区别全在这一项。',
      ].join('\n\n'),
      refs: ['Ahlfors, Complex Analysis, Ch. 4'],
    },

    {
      id: 'ex.plane-projection',
      cluster: 'algebra.inner',
      type: 'example',
      label: '到坐标平面的投影',
      title: '正交投影：$P = \\operatorname{diag}(1, 1, 0)$，$P^{2} = P = P^{\\ast}$',
      regions: ['algebra'],
      tags: ['例', '线性代数', '投影', '正交'],
      statement: [
        '在 $\\mathbb{R}^{3}$（标准内积）里取子空间 $W = \\{\\, (x, y, 0) \\,\\}$。到 $W$ 的正交投影是',
        '',
        '$$P = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}.$$',
      ].join('\n'),
      notes: [
        '**三条性质逐条验**：$P^{2} = P$（幂等）；$P^{\\ast} = P$（对称）；$\\ker P = \\operatorname{span}(e_{3})$、' +
          '$\\operatorname{im} P = W$，且 $\\mathbb{R}^{3} = \\ker P \\oplus \\operatorname{im} P$ **正交**直和。' +
          '反过来：幂等 + 对称 $\\implies$ 正交投射（只幂等的话是斜投射，像与核不垂直）。',
        '⭐ **它是最小二乘的几何内核**：$P b = (b_{1}, b_{2}, 0)$ 就是「离 $b$ 最近的 $W$ 中的点」，' +
          '残差 $b - Pb = (0, 0, b_{3})$ 与 $W$ 正交 —— 这正是 `thm.least-squares` 的法方程的几何内容。' +
          '一般情形 $W = \\operatorname{col}(A)$ 时投影矩阵就是 $A(A^{T}A)^{-1}A^{T}$。',
        '📌 **与伪逆的关系**：$A = P$ 本身是幂等且对称的，所以 $A^{+} = A$（Penrose 四条直接成立）。' +
          '这说明「投影」在伪逆的语言里是**自伴幂等**那一类。',
        '⚠ **别把投影矩阵当成「去掉一个坐标」**：换一组非标准正交基，矩阵就不再是对角形 —— ' +
          '「投影」是几何概念，$\\operatorname{diag}(1,1,0)$ 只是它在标准基下的样子。',
      ].join('\n\n'),
      refs: ['Strang, Linear Algebra and Its Applications, §4.2'],
    },

    {
      id: 'ex.cylinder-first-form',
      cluster: 'diffgeom.surface',
      type: 'example',
      label: '圆柱的第一基本形式',
      title: '圆柱面：$\\mathrm{I} = R^{2}\\,\\mathrm{d}u^{2} + \\mathrm{d}v^{2}$，$-\\!-$ 平坦但不与平面等距',
      regions: ['geometry'],
      tags: ['例', '微分几何', '曲面', '第一基本形式'],
      statement: [
        '半径 $R$ 的圆柱面用 $r(u, v) = (R\\cos u,\\ R\\sin u,\\ v)$ 参数化（$0 \\le u < 2\\pi$、$v \\in \\mathbb{R}$）。则',
        '',
        '$$E = \\langle r_{u}, r_{u}\\rangle = R^{2},\\quad F = \\langle r_{u}, r_{v}\\rangle = 0,\\quad G = \\langle r_{v}, r_{v}\\rangle = 1,$$',
        '',
        '即第一基本形式 $\\mathrm{I} = R^{2}\\,\\mathrm{d}u^{2} + \\mathrm{d}v^{2}$，Gauss 曲率 $K = 0$。',
      ].join('\n'),
      notes: [
        '**为什么 $K = 0$**：$E, F, G$ 全是常数 $\\implies$ 所有 Christoffel 符号为零 $\\implies$ 曲率张量为零。' +
          '直观上圆柱可以「摊平」成矩形而不改变长度与角度 —— 这就是 $K = 0$ 的意思。',
        '⭐ **它是「内蕴 = 外在」的最干净反例素材**：圆柱的 $K = 0$（内蕴平坦），但**它不是平面** ——' +
          '整块摊平会让 $u$ 方向的边粘起来，所以圆柱与平面只**局部**等距 —— 绕圆柱一圈的**闭曲线**（固定 $v$ 时 $r(0,v) = r(2\\pi,v)$，确实回到原点）在**展开平面里的提升**不闭合（$u$ 从 $0$ 走到 $2\\pi$，平面坐标平移了 $2\\pi$）。' +
          '「局部等距」与「整体等距」的区别，在这一个例子里就能看清。',
        '📌 **第二基本形式不为零**：$k_{1} = 1/R$、$k_{2} = 0$ —— 圆柱在 $\\mathbb{R}^{3}$ 里是弯的，' +
          '但两个主曲率一正一「零」使 $K = k_{1}k_{2} = 0$。这直接说明「外在地弯」与「内在地弯」是两件事。',
        '⚠ **参数化的退化**：$u = 0$ 与 $u = 2\\pi$ 是同一条母线，所以 $r$ 只是**局部**参数化（整个圆柱要两张图卡或允许周期性）。' +
          '⚠️ 但要分清：接缝处 $r_{u} \\times r_{v} = (R\\cos u, R\\sin u, 0) \\ne 0$（秩 $2$），**没有**微分退化；极坐标在 $r = 0$ 处是 $r_{u} \\times r_{v} = 0$ 的真退化（见 `ex.polar-christoffel`）—— 两者不是同一类问题。',
      ].join('\n\n'),
      refs: ['do Carmo, Differential Geometry of Curves and Surfaces, §2-5（圆柱的例子）'],
    },

    {
      id: 'ex.density-abs-continuous',
      cluster: 'analysis.signed',
      type: 'example',
      label: '密度型测度绝对连续',
      title: '绝对连续：$\\nu = f\\,\\mathrm{d}\\mu$ 则 $\\nu \\ll \\mu$，$\\mathrm{d}\\nu/\\mathrm{d}\\mu = f$；而 $\\delta_{0} \\perp \\mu$',
      regions: ['analysis-measure'],
      tags: ['例', '测度', '绝对连续', 'Radon–Nikodym'],
      statement: [
        '取 $\\mu$ = $[0,1]$ 上的 Lebesgue 测度。',
        '',
        '1. 设 $f \\in L^{1}(\\mu)$、$f \\ge 0$，令 $\\nu(E) := \\int_{E} f\\,\\mathrm{d}\\mu$。则 $\\nu \\ll \\mu$（$\\mu(E) = 0 \\implies \\nu(E) = 0$），且 $\\dfrac{\\mathrm{d}\\nu}{\\mathrm{d}\\mu} = f$。',
        '2. 反过来，$\\delta_{0}$（$\\delta_{0}(E) := 1$ 当 $0 \\in E$，否则 $0$）满足 $\\delta_{0} \\perp \\mu$ —— 它把全部质量放在一个 $\\mu$-零集上。',
      ].join('\n'),
      notes: [
        '**第 1 条为什么显然**：$\\mu(E) = 0$ 时积分域是零测集，$\\int_{E}f\\,\\mathrm{d}\\mu = 0$。' +
          '真正的内容是**反方向**：Radon–Nikodym 定理说 $\\nu \\ll \\mu$ 时**一定有**这样的密度（`thm.lebesgue-radon-nikodym`）。',
        '⭐ **第 2 条是「奇异」的样板**：$\\delta_{0}$ 与 $\\mu$ 互相奇异 —— 取 $A = \\{0\\}$，则 $\\mu(A) = 0$ 而 $\\delta_{0}(A) = 1$。' +
          'Lebesgue 分解 $\\nu = \\rho + \\lambda$（$\\rho \\ll \\mu$、$\\lambda \\perp \\mu$）就是把这一个例子的现象对一般 $\\nu$ 说出来。',
        '📌 **同一个测度可以有多种密度表示**：$f$ 改成几乎处处相等的 $g$，$\\nu$ 不变。所以 $\\mathrm{d}\\nu/\\mathrm{d}\\mu$ 是 $L^{1}$ 里的**类**，不是函数 —— ' +
          '这一点在链式法则 $\\dfrac{\\mathrm{d}\\nu_{2}}{\\mathrm{d}\\mu} = \\dfrac{\\mathrm{d}\\nu_{2}}{\\mathrm{d}\\nu_{1}}\\cdot\\dfrac{\\mathrm{d}\\nu_{1}}{\\mathrm{d}\\mu}$ 里最容易出错（要求 $\\nu_{1}$-a.e. 成立）。',
        '⚠ **「绝对连续测度」与「绝对连续函数」是两个概念**：前者是 $\\nu \\ll \\mu$，后者是 $F(x) = \\int_{a}^{x} f$（`def.ac-function`）。' +
          '两者的桥是「$F$\u00a0绝对连续 $\\iff$ $\\mathrm{d}F = f\\,\\mathrm{d}x$」（`thm.ftc-lebesgue`），但**名字相同、对象不同**。',
      ].join('\n\n'),
      refs: ['Rudin, Real and Complex Analysis, Ch. 6（Lebesgue 分解）'],
    },

    {
      id: 'def.profinite-integers',
      cluster: 'topo.stone',
      type: 'definition',
      label: 'profinite 整数 ℤ̂',
      title: 'profinite 整数 $\\hat{\\mathbb{Z}} = \\varprojlim_{n} \\mathbb{Z}/n$：数论与拓扑的交界',
      regions: ['topology', 'number'],
      tags: ['定义', '拓扑', '数论', 'profinite'],
      statement: [
        '把 $\\mathbb{Z}/n\\mathbb{Z}$ 都看成离散紧空间，按 $n \\mid m$ 时的商映射 $\\mathbb{Z}/m \\to \\mathbb{Z}/n$ 取**逆极限**：',
        '',
        '$$\\hat{\\mathbb{Z}} := \\varprojlim_{n \\ge 1} \\mathbb{Z}/n\\mathbb{Z} \\;\\subseteq\\; \\prod_{n \\ge 1} \\mathbb{Z}/n\\mathbb{Z}.$$',
        '',
        '右边是紧空间之积（Tychonoff），$\\hat{\\mathbb{Z}}$ 是闭子集（「相容」条件），所以它带**紧 Hausdorff 全不连通**的拓扑 —— 一个 profinite 空间。',
      ].join('\n'),
      notes: [
        '**它装的是什么**：$\\hat{\\mathbb{Z}}$ 的元素是相容序列 $(a_{n})_{n \\ge 1}$（$a_{n} \\in \\mathbb{Z}/n$、$a_{m} \\equiv a_{n} \\pmod n$）。' +
          '把整数 $k$ 送成常数序列 $(k \\bmod n)_{n}$ 是一个紧嵌入 $\\mathbb{Z} \\hookrightarrow \\hat{\\mathbb{Z}}$，像稠密但**不**是全体（`def.profinite` 里「稠密但不满」的标准例子）。',
        '⭐ **CRT 把它拆成素数方向**：$\\hat{\\mathbb{Z}} \\cong \\prod_{p} \\mathbb{Z}_{p}$（$\\mathbb{Z}_{p}$ 是 $p$-进整数）。' +
          '所以「数论的素数分解」在拓扑侧变成了「紧全不连通空间拆成不可再分的因子」—— 这是数论与拓扑之间**真存在**的那道桥。',
        '📌 **为什么它在凝聚态里重要**：$\\hat{\\mathbb{Z}}$ 是所有 profinite 空间的「原型」，' +
          '$\\mathbb{Z}[\\hat{\\mathbb{Z}}]$ 的投射性（`thm.gleason` / `lem.stonean-projective` 那一支）就是从这里看出来的。',
        '⚠ **$\\hat{\\mathbb{Z}} \\ne \\mathbb{Z}$**：$\\hat{\\mathbb{Z}}$ 是不可数紧空间，$\\mathbb{Z}$ 是可数离散群。' +
          '⛔ 不要写成「完备化后相同」—— 它是**新的**对象，含「无限大」方向的相容信息（例如 $\\prod_{p}(1 - 1/p)$ 这类）。',
      ].join('\n\n'),
      refs: ['Ribes–Zalesskii, Profinite Groups, Ch. 2'],
    },
  ],

  edges: [
    /* ---- E4：例子接线 ---- */
    { id: 'dep.polar-christoffel', kind: 'definition', definition: 'def.christoffel-symbol', usedBy: 'ex.polar-christoffel',
      note: '例子的全部内容就是把 $\\Gamma^{k}_{ij}$ 的公式代进极坐标度量里算一遍。' },
    { id: 'dep.polar-geodesic', kind: 'definition', definition: 'def.geodesic', usedBy: 'ex.polar-christoffel',
      note: '注里用测地线方程检验「直线仍是直线」，用到测地线的定义（$\\ddot\\gamma + \\Gamma(\\dot\\gamma,\\dot\\gamma) = 0$）。' },
    { id: 'dep.sl2-bracket', kind: 'definition', definition: 'def.lie-bracket', usedBy: 'ex-sl2-commutator',
      note: '例子算的就是 Lie 括号 $[A,B] = AB - BA$。' },
    { id: 'dep.sl2-liealg', kind: 'definition', definition: 'def.lie-algebra', usedBy: 'ex-sl2-commutator',
      note: '「对括号封闭」= 构成 Lie 代数；$\\mathfrak{sl}_{2}$ 是标准例子。' },
    { id: 'dep.contour-z', kind: 'definition', definition: 'def.contour-integral', usedBy: 'ex.contour-1-over-z',
      note: '例子就是一条围道积分的直接计算。' },
    { id: 'dep.contour-winding', kind: 'definition', definition: 'def.winding-number', usedBy: 'ex.contour-1-over-z',
      note: '注里把 $\\frac{1}{2\\pi i}\\oint \\mathrm{d}z/z$ 认作绕数 —— 用到绕数的定义。' },
    { id: 'dep.plane-proj', kind: 'definition', definition: 'def.orthogonal-projection', usedBy: 'ex.plane-projection',
      note: '例子给的是正交投影的矩阵，用定义（幂等 + 自伴）逐条验。' },
    { id: 'dep.plane-ls', kind: 'definition', definition: 'thm.least-squares', usedBy: 'ex.plane-projection',
      note: '注里把它当最小二乘的几何内核（残差与子空间正交）。' },
    { id: 'dep.cyl-first', kind: 'definition', definition: 'def.first-fundamental-form', usedBy: 'ex.cylinder-first-form',
      note: '例子的结果 $E, F, G$ 就是第一基本形式的系数。' },
    { id: 'dep.cyl-gauss', kind: 'definition', definition: 'def.gauss-curvature', usedBy: 'ex.cylinder-first-form',
      note: '例子的结论含 `K = 0`，并用 `k1 = 1/R`、`k2 = 0` 解释 —— 用到 Gauss 曲率的定义（两主曲率之积）。' },
    { id: 'dep.cyl-regsurf', kind: 'definition', definition: 'def.regular-surface', usedBy: 'ex.cylinder-first-form',
      note: '圆柱是正则曲面的标准例子（参数化 $r(u,v)$ 的 $r_{u} \\times r_{v} \\ne 0$）。' },
    { id: 'dep.dens-ac', kind: 'definition', definition: 'def.absolute-continuity', usedBy: 'ex.density-abs-continuous',
      note: '例子的第一条就是「$\\nu = f\\,\\mathrm{d}\\mu \\implies \\nu \\ll \\mu$」。' },
    { id: 'dep.dens-rn', kind: 'definition', definition: 'def.rn-derivative', usedBy: 'ex.density-abs-continuous',
      note: '「$\\mathrm{d}\\nu/\\mathrm{d}\\mu = f$」用的正是 Radon–Nikodym 导数。' },

    /* ---- D1：三条区域桥 ---- */
    { id: 'dep.density-measure', kind: 'definition', definition: 'def.measure', usedBy: 'def.volume-density',
      note: '**跨区域桥（analysis-measure $\\leftrightarrow$ diffgeom）**：密度是「能对 Lebesgue 测度积分的量」，' +
        '它的良定性证明（`prop.volume-density-well-defined`）就是换元公式 + 测度。' },
    { id: 'dep.intdiv-wellorder', kind: 'definition', definition: 'def.wellorder', usedBy: 'thm.int-division',
      note: '**跨区域桥（order-theory $\\leftrightarrow$ number）**：带余除法的存在性标准证法取 $\\{\\, a - qb \\ge 0 \\,\\}$ 的最小元，' +
        '用的正是 $\\mathbb{N}$ 的**良序**性。' },
    { id: 'dep.zhat-profinite', kind: 'definition', definition: 'def.profinite', usedBy: 'def.profinite-integers',
      note: '**跨区域桥（topology $\\leftrightarrow$ number）**：$\\hat{\\mathbb{Z}}$ 是逆极限经 Tychonoff 得到的紧全不连通空间，' +
        '即 profinite 空间的一个实例 —— 用到 profinite（Stone）空间的定义。' },
    { id: 'dep.zhat-crt', kind: 'definition', definition: 'thm.crt', usedBy: 'def.profinite-integers',
      note: '注里的 $\\hat{\\mathbb{Z}} \\cong \\prod_{p}\\mathbb{Z}_{p}$ 就是中国剩余定理沿所有 $n$ 取极限。' },
  ],
});
