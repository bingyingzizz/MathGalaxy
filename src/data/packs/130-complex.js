/* ==========================================================================
   内容包 · 复变函数（一）
   --------------------------------------------------------------------------
   星团 `analysis.complex`（hub = def.holomorphic）。这一批造的是
   **「全纯 => 能积分 => 能展开 => 能算留数」这条主干**：

     复数与三角不等式
       -> 全纯（复可微）-> 复偏导数 -> Cauchy–Riemann -> 保角性
       -> 复围道积分 -> Cauchy–Green -> Goursat 三角形 -> Cauchy–Goursat
       -> Cauchy 积分公式 -> 高阶导数 -> Cauchy 不等式
            ├-> Liouville -> 代数基本定理（接到已有的 thm.fundamental-algebra）
            ├-> 最大模原理
            ├-> Taylor 展开 -> Laurent 展开 -> 孤立奇点分类 -> 留数定理
            └-> Riemann 可去奇点
     分式线性变换（共形映射那一侧的口子）

   ⭐ 来源：王晓光《复变函数》（科学出版社「101 计划」核心教材）扫描件。
      章号按原书的章号写（第 1、4、5、6、7、8、9、11、13、21、23 章）。
   ⚠ 图上本来就有 `thm.fundamental-algebra`（走最值定理 + 因式定理那条证明），
      这里**不重复造节点**，只补一条 Liouville 路线的推导边。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '复变函数（一）：全纯与 Cauchy 理论',

  nodes: [

    /* ------------------------------------------------------------ 起步 */
    {
      id: 'prop.complex-triangle',
      cluster: 'analysis.complex',
      type: 'proposition',
      label: '模长的三角不等式',
      title: '命题：模长的三角不等式（含等号条件）',
      regions: ['complex'],
      tags: ['命题', '复数', '不等式'],
      refs: ['王晓光《复变函数》笔记，第 1 章 · 两个不等式', 'Ahlfors, Complex Analysis, Ch. 1 · Complex Numbers'],
      statement: [
        '**白话**：和的模不超过模的和；取等号的唯一情形是这些复数「方向一致」。',
        '',
        '对任意 $z_1, \\cdots, z_n \\in \\mathbb{C}$，',
        '',
        '$$\\left| \\sum_{k=1}^{n} z_k \\right| \\le \\sum_{k=1}^{n} |z_k|.$$',
        '',
        '等号成立当且仅当：非零的那些 $z_k$ 有**相同的辐角**。'
      ].join('\n'),
      notes: '⭐ 证明的妙处在于**不去估和，而是先把和转到实轴上**：令 $\\theta$ 是 $\\sum_k z_k$ 的一个辐角（和为零时结论显然），则\n\n$$\\left| \\sum_k z_k \\right| = e^{-i\\theta}\\sum_k z_k = \\operatorname{Re}\\left( e^{-i\\theta}\\sum_k z_k \\right) = \\sum_k \\operatorname{Re}\\left( e^{-i\\theta} z_k \\right) \\le \\sum_k \\left| e^{-i\\theta} z_k \\right| = \\sum_k |z_k|.$$\n\n第 2 个等号是「非负实数等于自己的实部」，最后一步是 $\\operatorname{Re} w \\le |w|$。\n\n⭐ 等号条件从中直接读出：每一步都要取等，即每个 $e^{-i\\theta} z_k$ 都是非负实数。\n\n⭐ 两条常用推论：反三角不等式 $\\big| |z| - |w| \\big| \\le |z - w|$；以及积分基本不等式 $\\left| \\int_\\gamma f\\,\\mathrm{d}z \\right| \\le \\int_\\gamma |f|\\,|\\mathrm{d}z| \\le \\max_\\gamma |f| \\cdot L(\\gamma)$ —— 后面的 Cauchy 不等式与 Liouville 定理全靠它。\n\n📌 书里同节的另一条是复的 Cauchy–Schwarz 不等式：$\\left| \\sum_j z_j \\overline{w_j} \\right|^2 \\le \\left( \\sum_j |z_j|^2 \\right)\\left( \\sum_j |w_j|^2 \\right)$，等号当且仅当两组数相差一个复常数倍。'
    },

    /* ---------------------------------------------------------- 全纯 */
    {
      id: 'def.holomorphic',
      cluster: 'analysis.complex',
      type: 'definition',
      label: '全纯函数',
      title: '定义：全纯函数与复导数',
      regions: ['complex'],
      tags: ['定义', '全纯', '复可微', '复变函数'],
      refs: ['王晓光《复变函数》笔记，第 4 章 · 全纯函数', 'Ahlfors, Complex Analysis, Ch. 2 · Complex Functions'],
      statement: [
        '**白话**：复可微就是「差商在复意义下收敛」—— $h$ 可以从**任何方向、任何方式**趋于 $0$，但差商必须落到同一个复数。',
        '',
        '设 $\\Omega$ 是平面区域（连通开集），$f: \\Omega \\to \\mathbb{C}$，$z_0 \\in \\Omega$。若极限',
        '',
        '$$f\'(z_0) := \\lim_{h \\to 0} \\frac{f(z_0 + h) - f(z_0)}{h} \\qquad (h \\in \\mathbb{C},\\ h \\ne 0,\\ z_0 + h \\in \\Omega)$$',
        '',
        '存在，称 $f$ 在 $z_0$ **复可微**，$f\'(z_0)$ 称为 $f$ 在 $z_0$ 处的**导数**。若 $f$ 在 $\\Omega$ 的每一点都复可微，称 $f$ 在 $\\Omega$ 上**全纯**（holomorphic）。',
        '',
        '复可微蕴含连续：把定义改写成',
        '',
        '$$f(z_0 + h) - f(z_0) = f\'(z_0)\\,h + o(h),$$',
        '',
        '令 $h \\to 0$ 即得 $f(z_0 + h) \\to f(z_0)$。'
      ].join('\n'),
      notes: '⭐ 与实可微的**唯一**区别：$h$ 是复数。实情形只要左右两个方向一致，复情形要求**无穷多个方向**（$h = t e^{i\\theta}$，$\\theta$ 任意）全部一致 —— 要求极强，收益也极大：一次可微就无穷次可微。\n\n⚠ 这个要求**不是自动的**。$f(z) = \\bar z$ 处处不复可微：沿实轴取 $h = t$ 得差商 $1$，沿虚轴取 $h = it$ 得差商 $-1$。两个方向的极限不同。所以「实可微」远不足以推出「复可微」。\n\n⭐ 复可微的等价写法是 $\\Delta f = A\\,\\Delta z + o(\\Delta z)$ —— 增量**只**是 $\\Delta z$ 的线性函数，不许出现 $\\overline{\\Delta z}$。写成偏导的语言就是 $\\partial f/\\partial \\bar z = 0$（见 Cauchy–Riemann 方程那条）。\n\n📌 全纯函数的和、积、商（分母不为零）、复合仍全纯，且求导公式与实情形形式相同 —— 因为这些只是「极限的四则运算」，没有用到 $h$ 的实性。'
    },
    {
      id: 'def.complex-partial',
      cluster: 'analysis.complex',
      type: 'definition',
      label: '复偏导数',
      title: '定义：复偏导数（Wirtinger 算子）',
      regions: ['complex'],
      tags: ['定义', '复偏导数', 'Wirtinger'],
      refs: ['王晓光《复变函数》笔记，第 4 章 · 复偏导数', 'Ahlfors, Complex Analysis, Ch. 2 · Complex Functions'],
      statement: [
        '**白话**：把实意义下的两个偏导数 $\\partial f/\\partial x$、$\\partial f/\\partial y$ 重新线性组合，得到「沿 $z$ 方向」和「沿 $\\bar z$ 方向」的两个复数方向导数。',
        '',
        '设 $f = u + iv$ 在 $z_0$ 的邻域内实可微（即 $u, v$ 都实可微）。定义',
        '',
        '$$\\frac{\\partial f}{\\partial z} := \\frac{1}{2}\\left( \\frac{\\partial f}{\\partial x} - i\\,\\frac{\\partial f}{\\partial y} \\right), \\qquad \\frac{\\partial f}{\\partial \\bar z} := \\frac{1}{2}\\left( \\frac{\\partial f}{\\partial x} + i\\,\\frac{\\partial f}{\\partial y} \\right).$$',
        '',
        '在这两个记号下，$f$ 的增量写成',
        '',
        '$$f(z_0 + \\Delta z) - f(z_0) = \\frac{\\partial f}{\\partial z}(z_0)\\,\\Delta z + \\frac{\\partial f}{\\partial \\bar z}(z_0)\\,\\overline{\\Delta z} + o(\\Delta z).$$',
        '',
        '两个系数由增量**唯一**决定：若 $A\\Delta z + B\\overline{\\Delta z} = a\\Delta z + b\\overline{\\Delta z} + o(\\Delta z)$，分别取 $\\Delta z = t$（$t$ 为实数）与 $\\Delta z = it$，令 $t \\to 0$ 即得 $A = a$、$B = b$。'
      ].join('\n'),
      notes: '⭐ $\\partial/\\partial z$、$\\partial/\\partial \\bar z$ 叫 **Wirtinger 导数**。它们**不是**差商极限：$\\bar z$ 沿不同方向的行为不一样，差商没有极限。它们只是实偏导的一对线性组合，是记账工具。\n\n⭐ 记忆法（书里脚注）：把 $x = (z + \\bar z)/2$、$y = -i(z - \\bar z)/2$ 代进 $f(x, y)$，**形式上**把 $z$、$\\bar z$ 当成独立变量用链式法则求偏导，就得到上面两式。⚠ 这只帮助记忆 —— 严格定义是右边的组合，因为 $z$ 与 $\\bar z$ 作为 $\\mathbb{R}^2$ 上的两个坐标并不独立。\n\n⭐ 真正好用的是它的**判据**性质：$f$ 复可微 $\\iff$ $\\partial f/\\partial \\bar z(z_0) = 0$。也就是「$f$ 能否只含 $z$ 不含 $\\bar z$」，变成可以逐项验算的事情。\n\n📌 形式上有 $\\partial z/\\partial z = \\partial \\bar z/\\partial \\bar z = 1$，$\\partial z/\\partial \\bar z = \\partial \\bar z/\\partial z = 0$ —— 就像两组独立的坐标。'
    },
    {
      id: 'prop.complex-partial-rules',
      cluster: 'analysis.complex',
      type: 'proposition',
      label: '复偏导数的运算法则',
      title: '命题：复偏导数的运算法则',
      regions: ['complex'],
      tags: ['命题', '复偏导数', '链式法则'],
      refs: ['王晓光《复变函数》笔记，第 4 章 · 复偏导数', 'Ahlfors, Complex Analysis, Ch. 2 · Complex Functions'],
      statement: [
        '**白话**：$\\partial/\\partial z$ 与 $\\partial/\\partial \\bar z$ 和普通偏导数一样服从线性法则、乘积法则、链式法则，而且两者互为共轭。',
        '',
        '设 $f, g: \\Omega \\to \\mathbb{C}$ 实可微。则',
        '',
        '**(1) 坐标**：$\\dfrac{\\partial z}{\\partial z} = \\dfrac{\\partial \\bar z}{\\partial \\bar z} = 1$，$\\dfrac{\\partial z}{\\partial \\bar z} = \\dfrac{\\partial \\bar z}{\\partial z} = 0$；',
        '',
        '**(2) 复线性**：$\\alpha, \\beta \\in \\mathbb{C}$ 时 $\\dfrac{\\partial (\\alpha f + \\beta g)}{\\partial z} = \\alpha\\dfrac{\\partial f}{\\partial z} + \\beta\\dfrac{\\partial g}{\\partial z}$，$\\partial/\\partial \\bar z$ 同理；',
        '',
        '**(3) 共轭**：$\\overline{\\left( \\dfrac{\\partial f}{\\partial z} \\right)} = \\dfrac{\\partial \\bar f}{\\partial \\bar z}$，$\\overline{\\left( \\dfrac{\\partial f}{\\partial \\bar z} \\right)} = \\dfrac{\\partial \\bar f}{\\partial z}$；',
        '',
        '**(4) 乘积**：$\\dfrac{\\partial (fg)}{\\partial z} = \\dfrac{\\partial f}{\\partial z}\\,g + f\\,\\dfrac{\\partial g}{\\partial z}$，$\\partial/\\partial \\bar z$ 同理；',
        '',
        '**(5) 复合**：若 $f: \\Omega \\to D$、$g: D \\to \\mathbb{C}$ 都实可微，则',
        '',
        '$$\\frac{\\partial (g \\circ f)}{\\partial z} = \\left( \\frac{\\partial g}{\\partial w} \\circ f \\right)\\frac{\\partial f}{\\partial z} + \\left( \\frac{\\partial g}{\\partial \\bar w} \\circ f \\right)\\overline{\\left( \\frac{\\partial f}{\\partial \\bar z} \\right)}.$$'
      ].join('\n'),
      notes: '⭐ (5) 的第二项不是笔误：$g$ 的增量里有 $\\Delta w$ 与 $\\overline{\\Delta w}$ 两块，而 $\\overline{\\Delta w} = \\overline{f_z}\\,\\overline{\\Delta z} + \\overline{f_{\\bar z}}\\,\\Delta z$ —— 共轭把两类项**互换**了，所以 $g_{\\bar w}$ 那一块乘的是 $\\overline{f_{\\bar z}}$。\n\n⭐ 全纯时 $f_{\\bar z} = 0$、$g_{\\bar w} = 0$，(5) 就退化成熟悉的 $(g \\circ f)\' = (g\' \\circ f)\\,f\'$ —— 只剩第一项。\n\n⭐ 反过来这也解释了为什么「全纯 $\\circ$ 实可微」一般不全纯：此时 $g_{\\bar w} \\ne 0$，第二项活着，而它偏偏带着 $\\overline{f_{\\bar z}}$ 这个 $\\overline{\\Delta z}$ 的系数。\n\n📌 这五条都是把实偏导的对应法则照抄过来再重新组合，没有新的分析内容 —— 但它们让「验算一个表达式全不全纯」变成纯代数操作。'
    },
    {
      id: 'thm.cauchy-riemann',
      cluster: 'analysis.complex',
      type: 'theorem',
      label: 'Cauchy–Riemann 方程',
      title: '定理：全纯性与 Cauchy–Riemann 方程等价',
      regions: ['complex'],
      tags: ['定理', '全纯', 'Cauchy–Riemann', '偏微分方程'],
      refs: ['王晓光《复变函数》笔记，第 4 章 · 复偏导数与复可微', 'Ahlfors, Complex Analysis, Ch. 2 · Complex Functions'],
      statement: [
        '**白话**：$f = u + iv$ 复可微，当且仅当它实可微、且两个偏导满足一对很具体的方程 —— 「二维的极限条件」被两个一维方程完全替代。',
        '',
        '设 $\\Omega$ 是平面区域，$f = u + iv: \\Omega \\to \\mathbb{C}$，$z_0 \\in \\Omega$。以下三条等价：',
        '',
        '**(i)** $f$ 在 $z_0$ 复可微；',
        '',
        '**(ii)** $f$ 在 $z_0$ 实可微，且',
        '',
        '$$\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x};$$',
        '',
        '**(iii)** $f$ 在 $z_0$ 实可微，且 $\\dfrac{\\partial f}{\\partial \\bar z}(z_0) = 0$。',
        '',
        '三者成立时 $f\'(z_0) = \\dfrac{\\partial f}{\\partial z}(z_0) = \\dfrac{\\partial u}{\\partial x}(z_0) + i\\,\\dfrac{\\partial v}{\\partial x}(z_0)$。'
      ].join('\n'),
      notes: '⭐ 三条其实是一条。$\\Delta z$ 与 $\\overline{\\Delta z}$ 是 $\\mathbb{C}$ 作为实向量空间的一组基，增量中**只许**出现 $\\Delta z$ 才可能是「乘一个复数」；而 $\\Delta z$ 的系数正是 $u_x + i v_x$。CR 方程就是把「$\\overline{\\Delta z}$ 的系数为 $0$」写成分量形式。\n\n⭐ 一个有用的副产品：$f$ 在 $z_0$ 的 Jacobi 行列式 $= u_x v_y - u_y v_x = u_x^2 + v_x^2 = |f\'(z_0)|^2 \\ge 0$。所以全纯映射在导数不为零处**保向**，这也是它「保角」的来源。\n\n⚠ **单独验 CR 方程不够**，还要 $f$ 实可微。反例：$f(x + iy) = \\sqrt{|xy|}$，在原点四个偏导全为 $0$（CR 成立），但差商沿 $h = t(1+i)$ 趋于 $1/(1+i) \\ne 0$，故不复可微。这同时说明「偏导存在」远弱于「实可微」。\n\n📌 于是全纯性有两条可操作的路：抽象地用差商（几何直觉好），或具体地验 CR（计算方便）。'
    },
    {
      id: 'prop.conformal-iff',
      cluster: 'analysis.complex',
      type: 'proposition',
      label: '保角性',
      title: '命题：导数非零与保角性等价',
      regions: ['complex'],
      tags: ['命题', '保角', '共形映射'],
      refs: ['王晓光《复变函数》笔记，第 5 章 · 共形性质', 'Ahlfors, Complex Analysis, Ch. 3 · Conformal Mapping'],
      statement: [
        '**白话**：全纯函数在导数不为零的地方「保角」—— 两条曲线在那里相交的角度，像里还是同样的角度；反过来，实可微又保角的映射一定是全纯的。',
        '',
        '**(i)** 设 $f$ 在 $z_0$ 的邻域内全纯且 $f\'(z_0) \\ne 0$。则 $f$ 在 $z_0$ 处**保角**：任意两条过 $z_0$ 的光滑曲线，其像曲线在 $f(z_0)$ 处的夹角与原来**大小相同、方向相同**。',
        '',
        '**(ii)** 反之，若 $f$ 在 $z_0$ 实可微、在 $z_0$ 处保角（保向），则 $f$ 在 $z_0$ 满足 Cauchy–Riemann 方程，从而复可微。',
        '',
        '因此**共形映射 = 全纯且导数处处非零**。'
      ].join('\n'),
      notes: '⭐ (i) 一行就够：$f(z_0 + h) - f(z_0) \\approx f\'(z_0)\\,h$。乘以非零复数 $f\'(z_0) = |f\'|e^{i\\theta}$ 就是「旋转 $\\theta$ + 伸缩 $|f\'|$」—— 相似变换，夹角与长度比自然不变。\n\n⭐ (ii) 的要点：保角等价于「增量映射 $\\Delta z \\mapsto \\Delta f$ 是相似变换」，即它只含 $\\Delta z$ 不含 $\\overline{\\Delta z}$。而这正是 $\\partial f/\\partial \\bar z(z_0) = 0$ —— 与 CR 方程是同一句话。\n\n⚠ 「导数非零」不能丢：$f(z) = z^2$ 在 $0$ 处把夹角**加倍**（$0$ 是临界点）；$f(z) = \\bar z$ 虽然保角但是**反向**的（它把定向翻过来），所以不在 (ii) 的「保向」范围内，也不全纯。\n\n📌 分式线性变换 $f(z) = (az+b)/(cz+d)$ 的导数是 $(ad-bc)/(cz+d)^2$，$ad - bc \\ne 0$ 保证它处处不为零 —— 这就是 Möbius 变换处处共形的原因。'
    },

    /* ---------------------------------------------------------- 积分 */
    {
      id: 'def.contour-integral',
      cluster: 'analysis.complex',
      type: 'definition',
      label: '复围道积分',
      title: '定义：复围道积分',
      regions: ['complex'],
      tags: ['定义', '复积分', '围道'],
      refs: ['王晓光《复变函数》笔记，第 6 章 · 复积分', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：把路径切成很多小段，每段用 $f$ 在该点的值乘上这一小段对应的**复位移**，加起来取极限 —— 就是沿这条路径的积分。',
        '',
        '设 $\\gamma: [a, b] \\to \\mathbb{C}$ 分段光滑（参数曲线），$f$ 在 $\\gamma$ 上连续。定义',
        '',
        '$$\\int_\\gamma f(z)\\,\\mathrm{d}z := \\lim_{\\text{分割}} \\sum_{k=1}^{n} f(\\gamma(\\tau_k))\\,(\\gamma(t_k) - \\gamma(t_{k-1})),$$',
        '',
        '分割取 $[a, b]$ 的任意加细分割、$\\tau_k \\in [t_{k-1}, t_k]$ 任意，极限存在且与取法无关；它等于',
        '',
        '$$\\int_\\gamma f(z)\\,\\mathrm{d}z = \\int_a^b f(\\gamma(t))\\,\\gamma\'(t)\\,\\mathrm{d}t,$$',
        '',
        '右端是实参数 $t$ 上的复值 Riemann 积分。拆成实部虚部（$f = u + iv$，$z = x + iy$）就是两条实线积分：',
        '',
        '$$\\int_\\gamma f\\,\\mathrm{d}z = \\int_\\gamma (u\\,\\mathrm{d}x - v\\,\\mathrm{d}y) + i\\int_\\gamma (v\\,\\mathrm{d}x + u\\,\\mathrm{d}y).$$',
        '',
        '$\\gamma$ 为闭曲线时记 $\\oint_\\gamma$；反向曲线 $\\gamma^{-1}$ 上积分变号：$\\int_{\\gamma^{-1}} f\\,\\mathrm{d}z = -\\int_\\gamma f\\,\\mathrm{d}z$。'
      ].join('\n'),
      notes: '⭐ 右端那个实积分就是定义的全部内容：**复围道积分 = 对实参数 $t$ 的复值 Riemann 积分**。于是实积分的一切性质（线性、区间可加、绝对值不等式、换元）自动搬过来。\n\n⭐ 与实积分真正的区别在**路径依赖**：$\\int_\\gamma f\\,\\mathrm{d}z$ 一般不只是端点的函数。Cauchy 定理说的正是「全纯时它忽然只依赖端点，闭路上为 $0$」。\n\n⭐ 上面那个实部虚部的拆法是后面接 Green 公式的接口：$P = u$、$Q = -v$ 与 $P = v$、$Q = u$ 各套一次 Green，就得到 Cauchy–Green 恒等式。'
    },

    /* -------------------------------------------------- Cauchy 定理 */
    {
      id: 'lem.cauchy-green',
      cluster: 'analysis.complex',
      type: 'lemma',
      label: 'Cauchy–Green 恒等式',
      title: '引理：Cauchy–Green 恒等式',
      regions: ['complex'],
      tags: ['引理', 'Green 公式', 'Cauchy 定理'],
      refs: ['王晓光《复变函数》笔记，第 7 章 · Cauchy 定理', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：沿闭曲线的复积分，可以换算成曲线内部面积上的一个二重积分，被积的正是 $\\partial f/\\partial \\bar z$ —— 于是「全纯 $\\implies$ 积分为零」变成了「被积函数是 $0$」。',
        '',
        '设 $\\Omega$ 是有界区域，边界 $\\partial\\Omega$ 是一条分段光滑的简单闭曲线、取正向（逆时针）。若 $f \\in C^1(\\overline{\\Omega})$，则',
        '',
        '$$\\int_{\\partial\\Omega} f(z)\\,\\mathrm{d}z = 2i \\iint_{\\Omega} \\frac{\\partial f}{\\partial \\bar z}(z)\\,\\mathrm{d}x\\,\\mathrm{d}y.$$',
        '',
        '特别地，若 $f$ 全纯**且 $f\'$ 连续**，则右端为零，即 $\\displaystyle\\oint_{\\partial\\Omega} f\\,\\mathrm{d}z = 0$。'
      ].join('\n'),
      notes: '⭐ 这就是 Green 公式的直接翻译。Green 公式：$\\oint_{\\partial\\Omega}(P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y) = \\iint_\\Omega (Q_x - P_y)\\,\\mathrm{d}x\\mathrm{d}y$。把积分拆成 $\\oint (u\\,\\mathrm{d}x - v\\,\\mathrm{d}y) + i\\oint (v\\,\\mathrm{d}x + u\\,\\mathrm{d}y)$，两次对上号得 $\\iint [-(u_y + v_x)] + i\\iint(u_x - v_y)$ —— 而 $2i f_{\\bar z}$ 逐项算出来正是 $-(u_y + v_x) + i(u_x - v_y)$。\n\n⭐ 它在分量上就是 CR 方程的**积分版**：全纯 $\\iff f_{\\bar z} = 0 \\implies$ 右端为零。\n\n⚠ 这条引理**不是免费的**：Green 公式要求 $P, Q$（从而 $f$）在闭包 $\\overline{\\Omega}$ 上 $C^1$。全纯只保证 $f$ 可微，**不保证 $f\'$ 连续** —— 这个缺口由 Goursat 的三角形分割补上。'
    },
    {
      id: 'lem.goursat-triangle',
      cluster: 'analysis.cauchy',
      type: 'lemma',
      label: 'Goursat 三角形引理',
      title: '引理：三角形上的积分为零（Goursat）',
      regions: ['complex'],
      tags: ['引理', 'Goursat', 'Cauchy 定理'],
      refs: ['王晓光《复变函数》笔记，第 7 章 · Goursat 定理：严格性的典范', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：只要 $f$ 在三角形内部和边界上全纯（别的一概不要求，连 $f\'$ 连续都不要），沿三角形边界的积分就是 $0$。这是 Cauchy 定理的「最小内核」。',
        '',
        '设 $T$ 是闭三角形，$f$ 在包含 $T$ 的某个开集上全纯。则',
        '',
        '$$\\int_{\\partial T} f(z)\\,\\mathrm{d}z = 0.$$'
      ].join('\n'),
      notes: '⭐ 手法是**二分 + 让三角形缩到一点**，不用 Green、不用 $f\'$ 连续。\n\n**第一步（四分）**：取三边中点把 $T$ 分成四个小三角形。整条边界的积分等于四条小边界之和（内部那三条边各被走两次、方向相反，抵消），于是至少有一个满足 $|I| \\le 4\\,|I(T_1)|$。迭代得 $T \\supset T^{(1)} \\supset T^{(2)} \\supset \\cdots$，第 $n$ 个的周长是 $L/2^n$，闭集套定理给出公共点 $z^*$，且 $|I| \\le 4^n |I(T^{(n)})|$。\n\n**第二步（把 $f$ 换成线性项）**：在 $z^*$ 附近用复可微的定义：$f(z) = f(z^*) + f\'(z^*)(z - z^*) + \\eta(z)\\,(z - z^*)$，其中 $\\eta(z) \\to 0$（$z \\to z^*$）。前两项是多项式，沿任何闭三角形的积分都是 $0$（可直接算）。\n\n**第三步（估计）**：设 $\\varepsilon_n = \\sup_{z \\in T^{(n)}} |\\eta(z)| \\to 0$，则 $|I(T^{(n)})| \\le \\varepsilon_n \\cdot (L/2^n) \\cdot (L/2^n)$，于是 $|I| \\le 4^n \\cdot \\varepsilon_n \\cdot L^2/4^n = \\varepsilon_n L^2 \\to 0$。\n\n⚠ 全纯在这里只被用了两次：$f$ 连续（用来取 $z^*$），以及差商在 $z \\to z^*$ 时有极限（即 $\\eta \\to 0$）。正因如此，结论比 Green 路线强得多。'
    },
    {
      id: 'thm.cauchy-goursat',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: 'Cauchy–Goursat 积分定理',
      title: '定理：Cauchy–Goursat 积分定理',
      regions: ['complex'],
      tags: ['定理', 'Cauchy 定理', '单连通'],
      refs: ['王晓光《复变函数》笔记，第 7 章 · Cauchy–Goursat 积分定理', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：单连通区域上全纯的函数，沿任何闭曲线的积分都是 $0$ —— 这是整个复分析的引擎。',
        '',
        '设 $\\Omega$ 是**单连通**的平面区域，$f$ 在 $\\Omega$ 上全纯，$\\gamma$ 是 $\\Omega$ 内分段光滑的闭曲线。则',
        '',
        '$$\\oint_\\gamma f(z)\\,\\mathrm{d}z = 0.$$',
        '',
        '多连通的情形：设 $\\gamma_0, \\gamma_1, \\cdots, \\gamma_n$ 是 $\\Omega$ 内分段光滑的简单闭曲线，$\\gamma_1, \\cdots, \\gamma_n$ 各自在 $\\gamma_0$ 的内部且互不相交，$f$ 在它们围成的（多连通）区域上全纯。则',
        '',
        '$$\\oint_{\\gamma_0} f\\,\\mathrm{d}z = \\sum_{k=1}^{n} \\oint_{\\gamma_k} f\\,\\mathrm{d}z.$$'
      ].join('\n'),
      notes: '⚠ 「单连通」不能丢。$f(z) = 1/z$ 在 $\\mathbb{C} \\setminus \\{0\\}$ 上全纯，可是 $\\oint_{|z| = 1} \\mathrm{d}z/z = 2\\pi i \\ne 0$。那个洞就是障碍 —— 它的存在让绕数能被感知到。\n\n⭐ 等价说法：全纯函数的围道积分**同伦不变**（路径在区域里连续形变，积分不变）；单连通 = 区域内所有闭曲线都同伦于一点。\n\n⭐ 立刻的推论：单连通区域上的全纯函数**有原函数**（取 $F(z) = \\int_{z_0}^{z} f\\,\\mathrm{d}z$，由 Cauchy 定理知与路径无关，再由 $F\' = f$）。这在实分析里没有对应物 —— $1/x$ 在 $\\mathbb{R} \\setminus \\{0\\}$ 上就没有原函数。\n\n⚠ 名字里的 Goursat：Cauchy 1825 年的原始证明要求 $f\'$ 连续（走 Green 公式）；Goursat 后来用三角形分割去掉了这个假设。现代教材因此把它当成**全纯的基本定理**：结论不是从更强的假设换来的。'
    },

    /* ------------------------------------------------ Cauchy 公式 */
    {
      id: 'thm.cauchy-integral-formula',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: 'Cauchy 积分公式',
      title: '定理：Cauchy 积分公式',
      regions: ['complex'],
      tags: ['定理', 'Cauchy 积分公式'],
      refs: ['王晓光《复变函数》笔记，第 8 章 · Cauchy 积分公式', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：全纯函数在内部一点的值，由它在边界上的值**完全决定** —— 内部的每一点都在「听」边界的话。',
        '',
        '设 $\\Omega$ 是有界区域，边界 $\\partial\\Omega$ 是分段光滑的简单闭曲线、取正向，$f$ 在包含 $\\overline{\\Omega}$ 的开集上全纯。则对任意 $z \\in \\Omega$，',
        '',
        '$$f(z) = \\frac{1}{2\\pi i}\\oint_{\\partial\\Omega} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta.$$',
        '',
        '更一般地，若 $\\gamma$ 是区域内的闭曲线、$f$ 在 $\\gamma$ 内部及 $\\gamma$ 上全纯，则上式对 $\\gamma$ 内部任一点 $z$ 成立。'
      ].join('\n'),
      notes: '⭐ 证明的骨架就是**挖洞**：以 $z$ 为心挖掉一个闭小圆盘 $\\overline{D(z, r)}$，在剩下的二连通区域 $\\Omega_r$ 上对 $g(\\zeta) = f(\\zeta)/(\\zeta - z)$ 用多连通 Cauchy–Goursat，得 $\\oint_{\\partial\\Omega} g = \\oint_{|\\zeta - z| = r} g$。\n\n再把 $g$ 拆成两块：$\\dfrac{f(z)}{\\zeta - z} + \\dfrac{f(\\zeta) - f(z)}{\\zeta - z}$。第一块的积分算出 $2\\pi i f(z)$；第二块的被积函数在 $\\zeta = z$ 处有极限 $f\'(z)$（因而有界），由 ML 不等式其积分不超过 $(\\text{常数}) \\cdot 2\\pi r \\to 0$。\n\n⭐ 这条公式是复分析的**枢纽**：由它推出无穷次可微、Cauchy 不等式、Liouville、最大模原理、Taylor 展开、Laurent 展开、留数定理 —— 本批几乎所有结论。\n\n⚠ 被积函数 $f(\\zeta)/(\\zeta - z)$ 在 $\\zeta = z$ 处**不**全纯，所以不能把 Cauchy 定理直接用在整块 $\\Omega$ 上。挖洞不是技巧，是必须的。'
    },
    {
      id: 'thm.cauchy-higher-derivative',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: '高阶导数公式',
      title: '定理：高阶导数公式与无穷次可微',
      regions: ['complex'],
      tags: ['定理', '高阶导数', 'Cauchy 积分公式'],
      refs: ['王晓光《复变函数》笔记，第 8 章 · 全纯函数的无穷次可微性', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：全纯函数不但无穷次可微，而且每一阶导数都能用**同一个**边界积分写出来 —— 只把分母的幂次加一。',
        '',
        '设定与 Cauchy 积分公式相同（$f$ 在包含 $\\overline{\\Omega}$ 的开集上全纯，$\\partial\\Omega$ 分段光滑简单闭曲线正向）。则对 $n = 0, 1, 2, \\cdots$ 与 $z \\in \\Omega$，',
        '',
        '$$f^{(n)}(z) = \\frac{n!}{2\\pi i}\\oint_{\\partial\\Omega} \\frac{f(\\zeta)}{(\\zeta - z)^{n+1}}\\,\\mathrm{d}\\zeta.$$',
        '',
        '特别地，$f$ 在 $\\Omega$ 上**无穷次可微**，且每一阶导数都全纯。'
      ].join('\n'),
      notes: '⭐ 证明就是**在积分号下求导**。$n = 1$ 时，差商与「形式导数」之差是\n\n$$\\frac{1}{2\\pi i}\\oint f(\\zeta)\\left[ \\frac{1}{(\\zeta - z - h)(\\zeta - z)} - \\frac{1}{(\\zeta - z)^2} \\right]\\mathrm{d}\\zeta = \\frac{h}{2\\pi i}\\oint \\frac{f(\\zeta)\\,\\mathrm{d}\\zeta}{(\\zeta - z - h)(\\zeta - z)^2}.$$\n\n取 $|h| \\le \\delta/2$，其中 $\\delta = \\operatorname{dist}(z, \\partial\\Omega) > 0$，则分母有与 $\\zeta$、$h$ 无关的正下界，整个积分的模 $\\le C|h| \\to 0$ —— 极限存在且正是形式导数。这个表达式对 $z$ 连续，所以 $f\'$ 连续、可以再做一次；$n \\ge 2$ 归纳。\n\n⭐ 这是复分析与实分析**最大的分水岭**：实函数可以一次可微而不二次（如 $x|x|$），复函数一次可微就无穷次可微。\n\n⚠ 「全纯」本身**没有**假设 $f\'$ 连续 —— 连续性是从这条公式**推**出来的，不是前提。这正是 Goursat 那条边的价值：先去掉多余的假设，再把它当结论赚回来。'
    },

    /* --------------------------------------- Cauchy 公式的几个推论 */
    {
      id: 'thm.cauchy-inequality',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: 'Cauchy 不等式',
      title: '定理：Cauchy 不等式',
      regions: ['complex'],
      tags: ['定理', 'Cauchy 不等式', '导数估计'],
      refs: ['王晓光《复变函数》笔记，第 9 章 · Cauchy 不等式', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：$n$ 阶导数是一个半径 $R$ 的圆周上的积分，所以它的模被「圆上 $|f|$ 的最大值除以 $R^n$」卡住 —— 半径越大，导数估计越好。',
        '',
        '设 $f$ 在圆盘 $D = D(z_0, R)$ 上全纯，记',
        '',
        '$$M(R) := \\sup_{z \\in D(z_0, R)} |f(z)|.$$',
        '',
        '则对每个 $n = 0, 1, 2, \\cdots$，',
        '',
        '$$\\left| f^{(n)}(z_0) \\right| \\le \\frac{n!}{R^n}\\,M(R).$$'
      ].join('\n'),
      notes: '⭐ 证明只有一步估计：取 $0 < r < R$，把高阶导数公式写在圆周 $|\\zeta - z_0| = r$ 上，取模、用 ML 不等式（$|\\mathrm{d}\\zeta|$ 的总长是 $2\\pi r$，分母是 $r^{n+1}$）：\n\n$$\\left| f^{(n)}(z_0) \\right| \\le \\frac{n!}{2\\pi} \\cdot M(r) \\cdot \\frac{2\\pi r}{r^{n+1}} = \\frac{n!\\,M(r)}{r^n},$$\n\n再令 $r \\to R$ 即得。\n\n⭐ 它把「导数的增长」和「函数值的增长」绑在一起 —— 这是 Liouville 定理**唯一**的输入。\n\n⚠ 上界里的 $R$ 是「能写多大就写多大」：$f$ 在 $D(z_0, R)$ 上全纯的 $R$ 有上限（到最近奇点的距离），不能随意放大。\n\n⭐ 反向也有内容：若 $|f| \\le M$ 在全平面成立，则 $|f^{(n)}(0)| \\le n! M/R^n$ 对**一切** $R$ 成立，令 $R \\to \\infty$ 得 $f^{(n)}(0) = 0$ —— 这正是 Liouville。'
    },
    {
      id: 'thm.liouville',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: 'Liouville 定理',
      title: '定理：Liouville 定理',
      regions: ['complex'],
      tags: ['定理', 'Liouville', '整函数'],
      refs: ['王晓光《复变函数》笔记，第 9 章 · Liouville 定理', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：在整个复平面上全纯、又有界的函数只能是常数 —— 复平面「太挤」了，容不下一个非常数的有界全纯函数。',
        '',
        '若 $f$ 在 $\\mathbb{C}$ 上全纯（这样的函数叫**整函数**），且存在常数 $M$ 使',
        '',
        '$$|f(z)| \\le M, \\qquad \\forall z \\in \\mathbb{C},$$',
        '',
        '则 $f$ 是常数。'
      ].join('\n'),
      notes: '⭐ 证明（用 Cauchy 不等式）：对任意 $z$ 与任意 $R > 0$，$f$ 在 $D(z, R)$ 上全纯，故 $|f\'(z)| \\le M/R$。令 $R \\to \\infty$ 得 $f\'(z) = 0$；由 $z$ 任意，$f\' \\equiv 0$；区域连通，故 $f$ 是常数。\n\n⭐ 书里还给了**只用 Cauchy 积分公式**的第二证明：取 $R > |z|$，\n\n$$f(z) - f(0) = \\frac{1}{2\\pi i}\\oint_{|\\zeta| = R}\\left( \\frac{1}{\\zeta - z} - \\frac{1}{\\zeta} \\right) f(\\zeta)\\,\\mathrm{d}\\zeta,$$\n\n估计得 $|f(z) - f(0)| \\le \\dfrac{M|z|}{R - |z|} \\to 0$（$R \\to \\infty$），故 $f(z) = f(0)$。\n\n⚠ 有界性不能随便放松：$e^z$ 在右半平面有界，但在全平面无界。反过来，若只知 $|f(z)| \\le C(1 + |z|)^k$，同样的论证只给出「$f$ 是次数不超过 $k$ 的多项式」。\n\n⭐ 与实分析对照：$\\sin x$ 在 $\\mathbb{R}$ 上有界且无穷次可微，却不是常数 —— 因为「整函数」比「$C^\\infty$ 函数」强得多。'
    },
    {
      id: 'thm.max-modulus',
      cluster: 'analysis.mapping',
      type: 'theorem',
      label: '最大模原理',
      title: '定理：最大模原理',
      regions: ['complex'],
      tags: ['定理', '最大模', '平均值公式'],
      refs: ['王晓光《复变函数》笔记，第 9 章 · 最大模原理', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：全纯函数的模，不可能在区域内部取到最大值 —— 除非它是常数。最大值只可能出现在边界上。',
        '',
        '设 $\\Omega$ 是平面区域（连通开集），$f$ 在 $\\Omega$ 上全纯。则或者 $f$ 是常数，或者',
        '',
        '$$|f(z)| < \\|f\\|_{\\Omega} := \\sup_{\\zeta \\in \\Omega} |f(\\zeta)|, \\qquad \\forall z \\in \\Omega.$$'
      ].join('\n'),
      notes: '⭐ 证明走**平均值公式**：Cauchy 积分公式在圆心取 $\\zeta = z + re^{i\\theta}$，得\n\n$$f(z) = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(z + re^{i\\theta})\\,\\mathrm{d}\\theta$$\n\n（只要 $\\overline{D(z, r)} \\subset \\Omega$）。若 $|f|$ 在**内部**某点 $z_0$ 取到最大值 $M$，则 $M = |f(z_0)| \\le \\frac{1}{2\\pi}\\int_0^{2\\pi} |f(z_0 + re^{i\\theta})|\\,\\mathrm{d}\\theta \\le M$，两端相等迫使圆上 $|f| \\equiv M$。\n\n⭐ 再由连通性：集合 $\\{ z : |f(z)| = M \\}$ 既开（每个点周围都有整圆）又闭（$|f|$ 连续），故是全体 $\\Omega$；$|f|$ 为常数加上 $f$ 全纯，得 $f$ 为常数。\n\n⭐ 有界区域的推论：若 $\\Omega$ 有界、$f$ 在 $\\overline{\\Omega}$ 上连续、在 $\\Omega$ 内全纯，则 $\\|f\\|_{\\overline{\\Omega}} = \\|f\\|_{\\partial\\Omega}$ —— 最大值在边界取到。这是「用边界值控制内部」的最强形式。\n\n⚠ 对 $|f|$ 的**最小值**没有对应结论：$f(z) = z$ 在单位圆盘上最小值在 $0$（内部）。正确的最小模原理是：$f$ 全纯且**无零点**时，对 $1/f$ 用最大模原理。'
    },

    /* ------------------------------------------------------ 级数 */
    {
      id: 'thm.taylor-complex',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: '全纯函数的 Taylor 展开',
      title: '定理：全纯函数可展成 Taylor 级数',
      regions: ['complex'],
      tags: ['定理', 'Taylor 级数', '幂级数', '解析'],
      refs: ['王晓光《复变函数》笔记，第 11 章 · 全纯函数的幂级数', 'Ahlfors, Complex Analysis, Ch. 5 · Series and Product Developments'],
      statement: [
        '**白话**：全纯函数在任意一点的附近都是一个幂级数 —— 也就是说，对复函数而言「可微」与「能写成幂级数」是同一件事。',
        '',
        '设 $f$ 在圆盘 $D(a, R)$ 上全纯。则对 $z \\in D(a, R)$，',
        '',
        '$$f(z) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}\\,(z - a)^n,$$',
        '',
        '且右端在 $D(a, R)$ 的任意紧子集上**一致收敛**。于是 $f$ 在 $D(a, R)$ 内**解析**（等于某个幂级数之和）。'
      ].join('\n'),
      notes: '⭐ 证明只有两步：Cauchy 积分公式 + 几何级数。取 $\\rho \\in (|z - a|, R)$，写\n\n$$\\frac{1}{\\zeta - z} = \\frac{1}{(\\zeta - a) - (z - a)} = \\sum_{n=0}^{\\infty} \\frac{(z - a)^n}{(\\zeta - a)^{n+1}},$$\n\n比值 $|z - a|/\\rho < 1$，级数关于 $\\zeta \\in \\partial D(a, \\rho)$ 一致收敛，故可逐项积分；逐项积分的系数正是 $f^{(n)}(a)/n!$（高阶导数公式）。\n\n⭐ 这条把「微分」与「级数」接上了：**全纯 $\\iff$ 局部是幂级数 $\\iff$ 解析**。实分析里这两件事**不等价** —— $e^{-1/x^2}$ 在 $0$ 处无穷次可微，但 Taylor 级数恒为 $0$，在 $0$ 的任何邻域内都不等于原函数。\n\n⚠ 收敛半径至少是 $a$ 到最近奇点的距离 —— 这正是「奇点在哪」那一讲的主题（书第 12 章）。\n\n📌 同节还有「级数形式的 Cauchy 不等式」：若 $f = \\sum a_n (z - a)^n$ 在 $D(a, R)$ 内成立，则 $|a_n| \\le M(r)/r^n$（$0 < r < R$）。'
    },
    {
      id: 'def.laurent-series',
      cluster: 'analysis.cauchy',
      type: 'definition',
      label: 'Laurent 级数',
      title: '定义：Laurent 级数与主部',
      regions: ['complex'],
      tags: ['定义', 'Laurent 级数', '主部'],
      refs: ['王晓光《复变函数》笔记，第 21 章 · Laurent 分解', 'Ahlfors, Complex Analysis, Ch. 5 · Series and Product Developments'],
      statement: [
        '**白话**：把幂级数放宽成「两边都有」的级数 —— 负幂次项负责描述函数在中心附近的爆炸，正幂次项负责描述它远处的行为。',
        '',
        '设 $0 \\le r < R \\le +\\infty$，环域 $A_{r,R}(a) := \\{ z : r < |z - a| < R \\}$。形如',
        '',
        '$$\\sum_{n=-\\infty}^{\\infty} c_n (z - a)^n = \\sum_{n=0}^{\\infty} c_n (z - a)^n + \\sum_{n=1}^{\\infty} c_{-n}\\,(z - a)^{-n}$$',
        '',
        '且在 $A_{r,R}(a)$ 内（在每个紧子集上）收敛的级数，称为**以 $a$ 为中心的 Laurent 级数**。右端第一块叫**正则部分**，第二块（负幂次之和）叫**主部**（principal part）。'
      ].join('\n'),
      notes: '⭐ 两块各有各的收敛范围：正则部分在 $|z - a| < R$ 内收敛，主部在 $|z - a| > r$ 内收敛，交起来正好是**环域** —— 这就是为什么 Laurent 级数的自然舞台是环而不是圆盘。\n\n⚠ 主部才是「奇点信息」的载体：主部为零对应可去奇点；主部只有有限项对应极点（项数为 $m$ 时叫 $m$ 阶）；主部有无穷多项对应本性奇点。所以孤立奇点的三分法，本质上是按主部的形状分的。\n\n📌 书里先做「Laurent 分解」：环域上的全纯函数可以拆成「内圆盘上全纯的一项」加「外域（含无穷远）上全纯的一项」，再由这两项各自的展开合成 Laurent 级数。'
    },
    {
      id: 'thm.laurent',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: 'Laurent 展开定理',
      title: '定理：Laurent 展开定理',
      regions: ['complex'],
      tags: ['定理', 'Laurent 级数', '环域'],
      refs: ['王晓光《复变函数》笔记，第 21 章 · Laurent 级数', 'Ahlfors, Complex Analysis, Ch. 5 · Series and Product Developments'],
      statement: [
        '**白话**：环域上的全纯函数一定能展成 Laurent 级数，而且系数由积分**唯一**确定。',
        '',
        '设 $f$ 在环域 $A_{r,R}(a)$ 上全纯（$0 \\le r < R \\le +\\infty$）。则对每个 $n \\in \\mathbb{Z}$，取任意 $\\rho \\in (r, R)$ 定义',
        '',
        '$$c_n := \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho} \\frac{f(\\zeta)}{(\\zeta - a)^{n+1}}\\,\\mathrm{d}\\zeta,$$',
        '',
        '这个值与 $\\rho$ 的选取无关，且 $f(z) = \\displaystyle\\sum_{n=-\\infty}^{\\infty} c_n (z - a)^n$ 在 $A_{r,R}(a)$ 内成立（在每个紧子集上一致收敛）。'
      ].join('\n'),
      notes: '⭐ 证明：取 $r < \\rho_1 < |z - a| < \\rho_2 < R$，在环域 $A_{\\rho_1,\\rho_2}(a)$ 上用 Cauchy 积分公式（环域版，边界是外圆减内圆）：\n\n$$f(z) = \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho_2} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta - \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho_1} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta.$$\n\n第一项按 $\\dfrac{1}{\\zeta - z} = \\sum_n \\dfrac{(z - a)^n}{(\\zeta - a)^{n+1}}$ 展开（因 $|z - a| < \\rho_2$）；第二项按 $\\dfrac{1}{z - \\zeta} = \\sum_n \\dfrac{(\\zeta - a)^n}{(z - a)^{n+1}}$ 展开（因 $|z - a| > \\rho_1$），得到负幂次。\n\n⭐ 唯一性：系数由积分公式给出，所以不依赖展开方式 —— 实际计算时可以用任何代数变形（几何级数、待定系数），结果一定一样。\n\n⚠ 环域不能退化成圆盘或外部：$r = 0$ 时主部可能发散，$R = +\\infty$ 时正则部分可能发散。**退化情形正是奇点分类的入口**：$r = 0$ 时主部的三种形态对应三类孤立奇点。'
    },

    /* -------------------------------------------------- 孤立奇点 */
    {
      id: 'def.isolated-singularity',
      cluster: 'analysis.complex',
      type: 'definition',
      label: '孤立奇点及其分类',
      title: '定义：孤立奇点及其三类',
      regions: ['complex'],
      tags: ['定义', '孤立奇点', '极点', '本性奇点'],
      refs: ['王晓光《复变函数》笔记，第 21 章 · 孤立奇点的分类', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：函数在某一点「出问题」，但附近别的地方都好 —— 这时按它靠近该点时的三种走法分类：趋近一个有限值、爆掉、或者乱跳。',
        '',
        '设 $f$ 在去心邻域 $D(a, \\varepsilon) \\setminus \\{a\\}$ 上全纯，称 $a$ 是 $f$ 的**孤立奇点**。按 $z \\to a$ 时的行为分三类：',
        '',
        '**(1) 可去奇点**：$\\lim_{z \\to a} f(z) = w_0 \\in \\mathbb{C}$ 存在；',
        '',
        '**(2) 极点**：$\\lim_{z \\to a} f(z) = \\infty$；',
        '',
        '**(3) 本性奇点**：$\\lim_{z \\to a} f(z)$ 不存在，也不为 $\\infty$。',
        '',
        '用 Laurent 展开的**主部**刻画：可去对应主部全为 $0$；极点对应主部只有有限项，若从 $(z - a)^{-m}$ 起步则称 **$m$ 阶极点**；本性对应主部有无穷多项。'
      ].join('\n'),
      notes: '⭐ 三类**互斥且穷尽**：极限在 $\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}$ 里只有这三种可能 —— 用 Riemann 球面看，这就是「极限在不在、有限不有限」的平凡三分。\n\n⭐ 极点的代数刻画最实用：$a$ 是 $m$ 阶极点，当且仅当在 $a$ 附近可以写成\n\n$$f(z) = \\frac{\\psi(z)}{(z - a)^m}, \\qquad \\psi \\text{ 在 } a \\text{ 的邻域全纯},\\ \\psi(a) \\ne 0.$$\n\n于是 $f$ 的 Laurent 展开正好从 $(z - a)^{-m}$ 开始 —— 这就是「主部有限项」的具体形状。\n\n⚠ 本性奇点附近的行为极不规则：$e^{1/z}$ 在 $0$ 的任何去心邻域内取遍 $\\mathbb{C} \\setminus \\{0\\}$。所以「极限不存在」不是「温和地振荡」。（Casorati–Weierstrass 定理的弱形式：本性奇点附近的值域在 $\\mathbb{C}$ 中稠密。）\n\n📌 **非孤立**奇点也会出现：$1/\\sin(1/z)$ 在 $0$ 附近有一列极点聚到 $0$，$0$ 就不是孤立奇点 —— 三类分法对它不适用。'
    },
    {
      id: 'thm.riemann-removable',
      cluster: 'analysis.cauchy',
      type: 'theorem',
      label: 'Riemann 可去奇点定理',
      title: '定理：Riemann 可去奇点定理',
      regions: ['complex'],
      tags: ['定理', '可去奇点', '延拓'],
      refs: ['王晓光《复变函数》笔记，第 9 章 · Riemann 可去奇点定理', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：如果 $f$ 在 $a$ 附近全纯，而且靠近 $a$ 时「爆得比 $1/|z - a|$ 慢」，那 $a$ 这个洞可以补上，补完还是全纯。',
        '',
        '设 $f$ 在 $D(a, r) \\setminus \\{a\\}$ 上全纯，且',
        '',
        '$$\\lim_{z \\to a} (z - a) f(z) = 0 \\qquad (\\text{等价地，} f(z) = o(|z - a|^{-1})).$$',
        '',
        '则 $a$ 是 $f$ 的**可去奇点**：存在 $f$ 在 $D(a, r)$ 上的全纯延拓。'
      ].join('\n'),
      notes: '⭐ 证明：对 $z \\in D(a, r) \\setminus \\{a\\}$ 与充分小的 $\\varepsilon < |z - a|$，把 $f$ 写成两个 Cauchy 型积分之差 $f(z) = I_r(z) - I_\\varepsilon(z)$，其中 $I_r$ 是沿 $|\\zeta - a| = r$ 的积分（在 $D(a, r)$ 上全纯），$I_\\varepsilon$ 是沿 $|\\zeta - a| = \\varepsilon$ 的积分。估计\n\n$$|I_\\varepsilon(z)| \\le \\frac{\\varepsilon \\, \\|f\\|_{\\partial D(a, \\varepsilon)}}{|z - a| - \\varepsilon} \\longrightarrow 0 \\qquad (\\varepsilon \\to 0),$$\n\n最后一步用的正是条件 $(z - a) f(z) \\to 0$。但 $I_\\varepsilon(z)$ 与 $\\varepsilon \\in (0, |z - a|)$ 的选取**无关**，所以只能恒为 $0$。于是 $f = I_r$ 在 $D(a, r)$ 上全纯，补上 $f(a) := I_r(a)$ 即可。\n\n⭐ 用途：它让「可去奇点」真的可以当没有。例如 $\\sin z / z$ 在 $0$ 处补成 $1$，于是 $\\sin z / z$ 就是整函数；$z^k f(z)$ 的零点阶、以及「全纯函数在零点附近可写成 $(z - a)^k \\psi(z)$」都要靠它。\n\n⚠ 条件比「有界」更宽（有界就够了）：它允许 $f$ 以 $o(1/|z - a|)$ 的速度增长，仍然可去。真正不可去的是 $1/(z - a)$ 这样的速度 —— 那是极点。'
    },

    /* ------------------------------------------------------ 留数 */
    {
      id: 'def.residue',
      cluster: 'analysis.residue',
      type: 'definition',
      label: '留数',
      title: '定义：留数',
      regions: ['complex'],
      tags: ['定义', '留数', 'Laurent 系数'],
      refs: ['王晓光《复变函数》笔记，第 23 章 · 留数定理', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：留数是 $f$ 在孤立奇点附近 Laurent 展开里 $(z - a)^{-1}$ 那一项的系数 —— 也是沿小圆周积分再除以 $2\\pi i$ 得到的那个数。',
        '',
        '设 $a$ 是 $f$ 的孤立奇点，$f$ 在 $D(a, \\varepsilon) \\setminus \\{a\\}$ 上全纯。定义',
        '',
        '$$\\operatorname{Res}(f, a) := \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = r} f(\\zeta)\\,\\mathrm{d}\\zeta, \\qquad 0 < r < \\varepsilon,$$',
        '',
        '这个值与 $r$ 无关，且等于 $f$ 在 $a$ 处 Laurent 展开的系数 $c_{-1}$。',
        '',
        '对**无穷远点**（$f$ 在 $|z| > R$ 上全纯）：$\\operatorname{Res}(f, \\infty) := -\\dfrac{1}{2\\pi i}\\oint_{|\\zeta| = \\rho} f(\\zeta)\\,\\mathrm{d}\\zeta = -c_{-1}$。'
      ].join('\n'),
      notes: '⭐ 为什么叫「留数」：$f$ 在去心邻域上有原函数的充要条件是 $c_{-1} = 0$（因为 $\\int \\mathrm{d}z/(z - a) = \\log(z - a)$ 是多值的）。所以 $c_{-1}$ 正是「挡住原函数存在的那个数」—— 它**留**了下来。\n\n⭐ 与 $r$ 无关：两个同心圆周之间的环域上 $f$ 全纯，由环域版 Cauchy–Goursat，两个积分相等。\n\n⚠ 无穷远点的定义**带负号**，这是坐标变换 $\\zeta = 1/w$ 带来的 Jacobi 因子 $1/w^2$。它让「全平面上的留数之和为零」成立：有限个奇点的留数之和加上 $\\operatorname{Res}(f, \\infty)$ 等于 $0$。\n\n📌 本节所有沿圆周的积分一律取**逆时针**方向；换成顺时针要整体变号。'
    },
    {
      id: 'prop.residue-at-pole',
      cluster: 'analysis.residue',
      type: 'proposition',
      label: '极点处的留数公式',
      title: '命题：极点处的留数公式',
      regions: ['complex'],
      tags: ['命题', '留数', '极点'],
      refs: ['王晓光《复变函数》笔记，第 23 章 · 留数定理（极点的留数）', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：如果奇点是 $m$ 阶极点，留数不必真去积分 —— 用 $(z - a)^m f(z)$ 在 $a$ 处的第 $m - 1$ 阶导数就能算出来。',
        '',
        '设 $a$ 是 $f$ 的 $m$ 阶极点，$f(z) = \\psi(z)/(z - a)^m$，$\\psi$ 在 $a$ 的邻域全纯且 $\\psi(a) \\ne 0$。则',
        '',
        '$$\\operatorname{Res}(f, a) = \\frac{\\psi^{(m-1)}(a)}{(m-1)!}.$$',
        '',
        '特别地：一阶极点时 $\\operatorname{Res}(f, a) = \\lim_{z \\to a} (z - a) f(z) = \\psi(a)$；二阶时 $\\operatorname{Res}(f, a) = \\psi\'(a)$。'
      ].join('\n'),
      notes: '⭐ 证明：把 $\\psi$ 在 $a$ 处 Taylor 展开 $\\psi(z) = \\sum_k \\dfrac{\\psi^{(k)}(a)}{k!}(z - a)^k$，再除以 $(z - a)^m$ 得 $f$ 的 Laurent 展开\n\n$$f(z) = \\sum_{k=0}^{\\infty} \\frac{\\psi^{(k)}(a)}{k!}\\,(z - a)^{k - m},$$\n\n取 $k - m = -1$ 即 $k = m - 1$，系数正是 $\\psi^{(m-1)}(a)/(m-1)!$。\n\n⭐ 一阶极点的情形最常用。若 $f = p/q$、$p(a) \\ne 0$ 且 $q$ 在 $a$ 有一阶零点，则 $\\operatorname{Res}(f, a) = p(a)/q\'(a)$ —— 这是实际计算里出现频率最高的那一行。\n\n⚠ $m \\ge 2$ 时**不能**只取极限：$f(z) = 1/z^2$ 的留数是 $0$，而 $\\lim_{z \\to 0} z f(z) = \\infty$。拿错公式是留数计算里最常见的错。'
    },
    {
      id: 'thm.residue',
      cluster: 'analysis.residue',
      type: 'theorem',
      label: '留数定理',
      title: '定理：留数定理',
      regions: ['complex'],
      tags: ['定理', '留数', '围道积分'],
      refs: ['王晓光《复变函数》笔记，第 23 章 · 留数定理', 'Ahlfors, Complex Analysis, Ch. 4 · Complex Integration'],
      statement: [
        '**白话**：沿闭曲线的积分等于 $2\\pi i$ 乘上曲线内部所有奇点的留数之和 —— 一个二维的积分问题被压缩成有限个代数计算。',
        '',
        '设 $\\Omega$ 是有界区域，边界 $\\partial\\Omega$ 由有限条分段光滑的简单闭曲线组成、取正向。$f$ 在 $\\Omega$ 上除有限个点 $z_1, \\cdots, z_n$ 外全纯，这些点都是**孤立**奇点且不在 $\\partial\\Omega$ 上。则',
        '',
        '$$\\oint_{\\partial\\Omega} f(z)\\,\\mathrm{d}z = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}(f, z_k).$$'
      ].join('\n'),
      notes: '⭐ 证明：以每个 $z_k$ 为心挖去半径 $\\varepsilon$ 的闭圆盘（互不相交、都含在 $\\Omega$ 内），得 $\\Omega_\\varepsilon = \\Omega \\setminus \\bigcup_k \\overline{D(z_k, \\varepsilon)}$。$f$ 在 $\\Omega_\\varepsilon$ 上全纯，由**多连通** Cauchy–Goursat，$\\oint_{\\partial\\Omega_\\varepsilon} f = 0$，也就是\n\n$$\\oint_{\\partial\\Omega} f\\,\\mathrm{d}z = \\sum_{k=1}^{n} \\oint_{|\\zeta - z_k| = \\varepsilon} f\\,\\mathrm{d}\\zeta = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}(f, z_k),$$\n\n最后一步就是留数的定义。\n\n⭐ 这是复分析里最能打的一条：书第 23、24 章那一整批实积分（$\\int_0^{2\\pi} Q(\\sin\\theta, \\cos\\theta)\\,\\mathrm{d}\\theta$、$\\int_{-\\infty}^{\\infty} f(x)\\,\\mathrm{d}x$、$\\int_{-\\infty}^{\\infty} e^{iax}f(x)\\,\\mathrm{d}x$、$\\int_0^{\\infty} x^{a-1}f(x)\\,\\mathrm{d}x$、级数求和）全靠它，都变成留数计算。\n\n⚠ 闭曲线必须**正向**（逆时针）；反向要整体变号。曲线**外**的奇点对积分没有贡献 —— 也可以改用无穷远点的留数来算。'
    },

    /* ------------------------------------------------------ 共形 */
    {
      id: 'def.mobius',
      cluster: 'analysis.complex',
      type: 'definition',
      label: '分式线性变换',
      title: '定义：分式线性变换（Möbius 变换）',
      regions: ['complex'],
      tags: ['定义', 'Möbius', '共形映射', '复球面'],
      refs: ['王晓光《复变函数》笔记，第 13 章 · 分式线性变换', 'Ahlfors, Complex Analysis, Ch. 3 · Conformal Mapping'],
      statement: [
        '**白话**：分式线性变换是复球面上最「刚性」的一类全纯双射 —— 它把圆（含直线）送到圆，并且保持交比不变。',
        '',
        '形如',
        '',
        '$$f(z) = \\frac{az + b}{cz + d}, \\qquad a, b, c, d \\in \\mathbb{C},\\ ad - bc \\ne 0$$',
        '',
        '的映射称为**分式线性变换**（Möbius 变换）。它延拓成 Riemann 球面 $\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}$ 到自身的双射：$c \\ne 0$ 时 $f(-d/c) = \\infty$、$f(\\infty) = a/c$；$c = 0$ 时 $f(\\infty) = \\infty$。逆映射仍是分式线性变换：',
        '',
        '$$f^{-1}(w) = \\frac{dw - b}{-cw + a}.$$'
      ].join('\n'),
      notes: '⭐ $ad - bc \\ne 0$ 是「非退化」条件：等于 $0$ 时 $f$ 退化为常数。它同时保证 $f\'(z) = (ad - bc)/(cz + d)^2 \\ne 0$，所以 $f$ **处处共形**（保角，见「保角性」那条）。\n\n⭐ 三个基本构件：平移 $z \\mapsto z + b$、伸缩旋转 $z \\mapsto az$（$a \\ne 0$）、反演 $z \\mapsto 1/z$。任何 Möbius 变换都是它们的复合，而 $ad - bc \\ne 0$ 保证复合之后不塌成常数。\n\n⭐ 几何性质（书第 13 章）：把**圆或直线**送到圆或直线（统称「广义圆」，在球面上其实就是「圆」）；并且保持**交比**不变：\n\n$$(z_1, z_2; z_3, z_4) = \\frac{(z_1 - z_3)(z_2 - z_4)}{(z_1 - z_4)(z_2 - z_3)}.$$\n\n于是 $f$ 由三个点的像**唯一**确定 —— 交比是 Möbius 变换的全不变量。\n\n⚠ 球面上的 $\\infty$ 不是「很大的数」：它是用球极投影添进来的一个点。只有在球面上，「$f$ 是双射」这句话才干净 —— 在 $\\mathbb{C}$ 上它总漏掉一两个点。'
    }

  ],

  edges: [

    /* ------------------------------------------------------ 推导边 */
    {
      id: 'imp.complex-triangle',
      kind: 'implication',
      sources: ['def.complex'],
      target: 'prop.complex-triangle',
      title: '复数的模与辐角 $\\implies$ 模长三角不等式',
      proof: [
        '设 $S = \\sum_{k=1}^{n} z_k$。$S = 0$ 时结论即 $0 \\le \\sum |z_k|$，显然。',
        '',
        '**关键一步：把和转到实轴上。** 取 $\\theta$ 为 $S$ 的一个辐角（即 $S = |S| e^{i\\theta}$），两边乘 $e^{-i\\theta}$：$e^{-i\\theta} S = |S|$ 是**非负实数**，于是',
        '',
        '$$|S| = e^{-i\\theta} S = \\operatorname{Re}\\left( e^{-i\\theta} S \\right) = \\sum_{k=1}^{n} \\operatorname{Re}\\left( e^{-i\\theta} z_k \\right).$$',
        '',
        '**逐项放缩。** 对每个 $k$ 有 $\\operatorname{Re} w \\le |w|$，故',
        '',
        '$$|S| \\le \\sum_{k=1}^{n} \\left| e^{-i\\theta} z_k \\right| = \\sum_{k=1}^{n} |z_k|,$$',
        '',
        '最后一步用到 $|e^{-i\\theta}| = 1$ 与模的乘法性 $|zw| = |z||w|$（这是 $\\mathbb{C}$ 的乘法定义直接给出的）。',
        '',
        '**等号条件。** 上面只用了两处不等号：$\\operatorname{Re} w \\le |w|$，以及逐项求和。两处同时取等，当且仅当每个 $e^{-i\\theta} z_k$ 都是**非负实数**，即全体非零 $z_k$ 的辐角都等于 $\\theta$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.complex-partial-rules',
      kind: 'implication',
      sources: ['def.complex-partial'],
      target: 'prop.complex-partial-rules',
      title: '复偏导数的定义 $\\implies$ 运算法则',
      proof: [
        '五条全部由「实偏导的对应法则 + 线性组合」直接得到，没有新的分析内容。举两条容易看错的。',
        '',
        '**(1) 坐标。** $z = x + iy$ 给出 $z_x = 1$、$z_y = i$，故 $\\partial z/\\partial z = \\frac{1}{2}(1 - i \\cdot i) = \\frac{1}{2}(1 + 1) = 1$，$\\partial z/\\partial \\bar z = \\frac{1}{2}(1 + i \\cdot i) = 0$；$\\bar z = x - iy$ 给出 $\\bar z_x = 1$、$\\bar z_y = -i$，同样算得 $\\partial \\bar z/\\partial \\bar z = 1$、$\\partial \\bar z/\\partial z = 0$。',
        '',
        '**(5) 复合。** 这一步真要算。设 $w = f(z)$，由 $g$ 的实可微性',
        '',
        '$$g(w_0 + \\Delta w) - g(w_0) = \\frac{\\partial g}{\\partial w}\\,\\Delta w + \\frac{\\partial g}{\\partial \\bar w}\\,\\overline{\\Delta w} + o(\\Delta w).$$',
        '',
        '又 $\\Delta w = f_z \\Delta z + f_{\\bar z}\\overline{\\Delta z} + o(\\Delta z)$，取共轭得 $\\overline{\\Delta w} = \\overline{f_z}\\,\\overline{\\Delta z} + \\overline{f_{\\bar z}}\\,\\Delta z + o(\\Delta z)$。代回去，按 $\\Delta z$ 与 $\\overline{\\Delta z}$ 归并：',
        '',
        '$$\\Delta (g \\circ f) = \\left( g_w f_z + g_{\\bar w}\\overline{f_{\\bar z}} \\right)\\Delta z + \\left( g_w f_{\\bar z} + g_{\\bar w}\\overline{f_z} \\right)\\overline{\\Delta z} + o(\\Delta z).$$',
        '',
        '按「系数唯一」（取 $\\Delta z = t$ 与 $\\Delta z = it$ 两次）读出 $\\Delta z$ 的系数，即得 (5)。注意共轭把 $f_z$ 与 $f_{\\bar z}$ **互换**了位置 —— 这就是第二项长得「别扭」的原因。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.cauchy-riemann',
      kind: 'implication',
      sources: ['def.holomorphic', 'def.complex-partial'],
      target: 'thm.cauchy-riemann',
      title: '全纯的定义 + 复偏导数 $\\implies$ Cauchy–Riemann 方程',
      proof: [
        '**(i) 推出 (iii)。** 设 $f$ 在 $z_0$ 复可微，$A = f\'(z_0)$。复可微的定义就是',
        '',
        '$$f(z_0 + \\Delta z) - f(z_0) = A\\,\\Delta z + o(\\Delta z).$$',
        '',
        '这已经是一个形如 $A\\Delta z + B\\overline{\\Delta z} + o(\\Delta z)$ 的展开，其中 $B = 0$。比较两个表示的系数（分别取 $\\Delta z = t$ 与 $\\Delta z = it$，令实数 $t \\to 0$）得 $\\partial f/\\partial z(z_0) = A$、$\\partial f/\\partial \\bar z(z_0) = 0$。同时这也说明 $f$ 实可微（因为 $A\\Delta z$ 是 $\\Delta z$ 的实线性函数）。',
        '',
        '**(iii) 与 (ii) 等价。** 把定义逐项算出来：',
        '',
        '$$\\frac{\\partial f}{\\partial \\bar z} = \\frac{1}{2}\\left[ (u_x + i v_x) + i(u_y + i v_y) \\right] = \\frac{1}{2}\\left[ (u_x - v_y) + i(v_x + u_y) \\right].$$',
        '',
        '故 $\\partial f/\\partial \\bar z = 0$ 等价于 $u_x = v_y$ 且 $v_x = -u_y$ —— 正是 Cauchy–Riemann 方程。',
        '',
        '**(iii) 推出 (i)。** 若 $\\partial f/\\partial \\bar z(z_0) = 0$，则增量展开退化为 $\\Delta f = f_z(z_0)\\,\\Delta z + o(\\Delta z)$，两边除以 $\\Delta z$ 并令 $\\Delta z \\to 0$，得差商极限存在，即 $f\'(z_0) = f_z(z_0)$。',
        '',
        '**导数的分量形式。** 同一次计算给出',
        '',
        '$$\\frac{\\partial f}{\\partial z} = \\frac{1}{2}\\left[ (u_x + i v_x) - i(u_y + i v_y) \\right] = \\frac{1}{2}\\left[ (u_x + v_y) + i(v_x - u_y) \\right] = u_x + i v_x,$$',
        '',
        '最后一步用了 CR 方程。',
        '',
        '**一个副产品。** $f$ 在 $z_0$ 的 Jacobi 行列式是 $u_x v_y - u_y v_x$，代入 CR 得 $u_x^2 + v_x^2 = |f\'(z_0)|^2 \\ge 0$：全纯映射（在导数非零处）保向。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.conformal',
      kind: 'implication',
      sources: ['thm.cauchy-riemann', 'def.holomorphic'],
      target: 'prop.conformal-iff',
      title: 'Cauchy–Riemann 方程 $\\implies$ 保角性即全纯且导数非零',
      proof: [
        '**(i) 全纯 + 导数非零推出保角。** 设 $\\gamma_1, \\gamma_2$ 是过 $z_0$ 的两条光滑曲线，切向量 $\\gamma_1\'(0), \\gamma_2\'(0)$ 都非零。由复可微，',
        '',
        '$$(f \\circ \\gamma_j)\'(0) = f\'(z_0)\\,\\gamma_j\'(0).$$',
        '',
        '两式相除（$f\'(z_0) \\ne 0$）：',
        '',
        '$$\\frac{(f \\circ \\gamma_1)\'(0)}{(f \\circ \\gamma_2)\'(0)} = \\frac{\\gamma_1\'(0)}{\\gamma_2\'(0)}.$$',
        '',
        '两个复数的商相等，当且仅当它们相差一个正实数倍；而商的辐角就是两切向量的夹角。所以像曲线的夹角与原来**大小和方向都相同** —— 保角。',
        '',
        '**(ii) 保角推出 CR。** 设 $f$ 在 $z_0$ 实可微，增量映射是实线性的 $T(\\Delta z) = A\\Delta z + B\\overline{\\Delta z}$。$T$ 保持（有向）夹角，等价于 $T$ 是「乘一个非零复数」，即 $B = 0$。若 $B \\ne 0$，$T$ 会把圆映成椭圆，两条互相垂直的直径像的长度比不再是 $1$，夹角也会变。而 $B = \\partial f/\\partial \\bar z(z_0) = 0$ 正是 CR 方程。',
        '',
        '**(iii) 反例。** $f(z) = z^2$ 在 $0$ 处：$f\'(0) = 0$，取过 $0$ 的两条射线 $\\arg z = 0$ 与 $\\arg z = \\pi/4$，像的辐角变成 $0$ 与 $\\pi/2$ —— 夹角从 $\\pi/4$ 变成 $\\pi/2$，**加倍**。$f(z) = \\bar z$ 保角但把定向翻过来（$\\partial f/\\partial \\bar z = 1 \\ne 0$），所以不在「保向」含义的保角范围内。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.complex-cauchy-green',
      kind: 'implication',
      sources: ['def.contour-integral', 'thm.cauchy-riemann'],
      target: 'lem.cauchy-green',
      title: '拆实部虚部 + Green 公式 $\\implies$ Cauchy–Green 恒等式',
      proof: [
        '**第一步：拆成两条实线积分。** $f = u + iv$，$\\mathrm{d}z = \\mathrm{d}x + i\\,\\mathrm{d}y$，于是',
        '',
        '$$\\int_{\\partial\\Omega} f\\,\\mathrm{d}z = \\int_{\\partial\\Omega}(u\\,\\mathrm{d}x - v\\,\\mathrm{d}y) + i\\int_{\\partial\\Omega}(v\\,\\mathrm{d}x + u\\,\\mathrm{d}y).$$',
        '',
        '**第二步：两条都套 Green 公式** $\\oint_{\\partial\\Omega}(P\\,\\mathrm{d}x + Q\\,\\mathrm{d}y) = \\iint_\\Omega (Q_x - P_y)\\,\\mathrm{d}x\\mathrm{d}y$（$\\partial\\Omega$ 取正向）。',
        '',
        '第一条：$P = u$、$Q = -v$，得 $\\iint(-v_x - u_y)$。第二条：$P = v$、$Q = u$，得 $\\iint(u_x - v_y)$。合起来',
        '',
        '$$\\int_{\\partial\\Omega} f\\,\\mathrm{d}z = \\iint_{\\Omega}\\left[ -(u_y + v_x) \\right]\\mathrm{d}x\\mathrm{d}y + i\\iint_{\\Omega}(u_x - v_y)\\,\\mathrm{d}x\\mathrm{d}y.$$',
        '',
        '**第三步：认出右边就是 $2i f_{\\bar z}$。** 由复偏导数的公式',
        '',
        '$$2i\\,\\frac{\\partial f}{\\partial \\bar z} = 2i \\cdot \\frac{1}{2}\\left[ (u_x - v_y) + i(v_x + u_y) \\right] = -(v_x + u_y) + i(u_x - v_y),$$',
        '',
        '与上式的实部、虚部逐项相同。',
        '',
        '**第四步：用 CR 得为零。** 全纯时 $u_x = v_y$、$u_y = -v_x$，两对被积函数都恒等于 $0$，故 $\\oint_{\\partial\\Omega} f\\,\\mathrm{d}z = 0$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.green-cauchy-thm',
      kind: 'implication',
      sources: ['lem.cauchy-green', 'thm.cauchy-riemann'],
      target: 'thm.cauchy-goursat',
      title: 'Cauchy–Green 恒等式 $\\implies$ Cauchy 定理（导数连续的情形）',
      proof: [
        '**已得的部分。** 由 Cauchy–Green 恒等式，只要 $f$ 在 $\\overline{\\Omega}$ 上 $C^1$ 且全纯，就有 $\\oint_{\\partial\\Omega} f = 2i\\iint f_{\\bar z} = 0$。对简单闭曲线围成的区域，这就是 Cauchy 定理。',
        '',
        '**推广到一般闭曲线。** 若 $\\gamma$ 是分段光滑闭曲线、$f$ 在 $\\gamma$ 内部及 $\\gamma$ 上 $C^1$ 且全纯，则 $\\gamma$ 围成的区域可以剖分成有限个简单闭曲线围成的区域（加辅助割线），逐个用上面的结论，割线上的积分两两抵消，仍得 $\\oint_\\gamma f = 0$。',
        '',
        '**推广到多连通。** 把 $\\gamma_0$ 与内圈 $\\gamma_1, \\cdots, \\gamma_n$ 用 $n$ 条割线连起来，得到一条闭曲线的边界；在它上面积分为 $0$。每条割线被走两次、方向相反，抵消后正是 $\\oint_{\\gamma_0} f - \\sum_k \\oint_{\\gamma_k} f = 0$。',
        '',
        '**这一步到此为止的地方。** 上面每一句都用了「$f \\in C^1$」，因为 Green 公式要求 $P, Q$ 在闭包上连续可微。全纯**不**蕴含 $f\'$ 连续（此刻还不知道），所以这条路线只证出了「额外假设 $f\'$ 连续」的版本。去掉这个假设要另起一条路 —— 见 Goursat 三角形引理那条边。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.goursat',
      kind: 'implication',
      sources: ['lem.goursat-triangle'],
      target: 'thm.cauchy-goursat',
      title: '三角形上的积分为零 $\\implies$ 任意闭曲线上的积分为零',
      proof: [
        '**三角形推出多边形。** 设 $P$ 是由折线围成的简单多边形，内部含于 $\\Omega$。把 $P$ 三角剖分，每条对角线被两个三角形共用、方向相反，于是 $\\oint_{\\partial P} f = \\sum_j \\oint_{\\partial T_j} f = 0$（每个三角形由引理为零）。',
        '',
        '**多边形推出一股闭曲线。** 设 $\\gamma$ 分段光滑闭曲线。任给 $\\varepsilon > 0$：$\\gamma$ 的像 $K$ 是紧集，$f$ 在 $K$ 的某个邻域上一致连续。取足够细的内接多边形 $P$ 逼近 $\\gamma$，使折线上的积分与 $\\gamma$ 上的积分之差小于 $\\varepsilon$（按参数分割，每小段用 $f$ 的近似常值代替，误差由一致连续性控制）。故 $|\\oint_\\gamma f| \\le \\varepsilon$ 对一切 $\\varepsilon$ 成立，得 $\\oint_\\gamma f = 0$。',
        '',
        '**单连通用在哪里。** 上面每一步都要求「$\\gamma$ 围成的内部在 $\\Omega$ 内」—— 这正是「$\\Omega$ 内每条闭曲线都同伦于一点」的等价表述。否则某个三角形可能跨出 $\\Omega$，引理用不上（$1/z$ 在 $\\mathbb{C} \\setminus \\{0\\}$ 上就是这种情况）。',
        '',
        '**多连通版。** 把外边界与各内圈用割线连成一条闭曲线（见上一条边），在它上面用刚证的单连通结论。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.cauchy-integral-formula',
      kind: 'implication',
      sources: ['thm.cauchy-goursat'],
      target: 'thm.cauchy-integral-formula',
      title: 'Cauchy–Goursat（多连通版）$\\implies$ Cauchy 积分公式',
      proof: [
        '**挖洞。** 固定 $z \\in \\Omega$，令 $d = \\operatorname{dist}(z, \\partial\\Omega) > 0$，取 $0 < r < d$，令 $\\Omega_r = \\Omega \\setminus \\overline{D(z, r)}$。$\\Omega_r$ 是二连通区域，而 $g(\\zeta) := f(\\zeta)/(\\zeta - z)$ 在 $\\Omega_r$ 上全纯（分母在 $\\Omega_r$ 上不为零）。由多连通 Cauchy–Goursat，$\\oint_{\\partial\\Omega_r} g = 0$，即',
        '',
        '$$\\oint_{\\partial\\Omega} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta = \\oint_{|\\zeta - z| = r} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta.$$',
        '',
        '**拆出所求的那一项。** 在内圆上把被积函数拆成',
        '',
        '$$\\frac{f(\\zeta)}{\\zeta - z} = \\frac{f(z)}{\\zeta - z} + \\frac{f(\\zeta) - f(z)}{\\zeta - z}.$$',
        '',
        '第一项贡献 $f(z) \\cdot 2\\pi i$，因为 $\\oint_{|\\zeta - z| = r} \\dfrac{\\mathrm{d}\\zeta}{\\zeta - z} = 2\\pi i$（代 $\\zeta - z = re^{i\\theta}$ 直接算）。',
        '',
        '**第二项趋于零。** 由 $f$ 在 $z$ 处可微，$\\dfrac{f(\\zeta) - f(z)}{\\zeta - z} \\to f\'(z)$（$\\zeta \\to z$），故在 $|\\zeta - z| = r$ 上有界；圆周总长 $2\\pi r$，于是由 ML 不等式',
        '',
        '$$\\left| \\oint_{|\\zeta - z| = r} \\frac{f(\\zeta) - f(z)}{\\zeta - z}\\,\\mathrm{d}\\zeta \\right| \\le (\\text{有界量}) \\cdot 2\\pi r \\longrightarrow 0 \\qquad (r \\to 0).$$',
        '',
        '**收尾。** 左端与 $r$ 无关（上面的等式对一切 $r \\in (0, d)$ 成立），故',
        '',
        '$$\\oint_{\\partial\\Omega} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta = 2\\pi i f(z) + 0.$$',
        '',
        '除以 $2\\pi i$ 即得公式。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.higher-derivative',
      kind: 'implication',
      sources: ['thm.cauchy-integral-formula'],
      target: 'thm.cauchy-higher-derivative',
      title: 'Cauchy 积分公式 $\\implies$ 高阶导数公式（在积分号下求导）',
      proof: [
        '**$n = 1$：算出差商与形式导数之差。** 记 $F(z) = \\dfrac{1}{2\\pi i}\\oint_{\\partial\\Omega}\\dfrac{f(\\zeta)}{\\zeta - z}\\mathrm{d}\\zeta$，则 $F = f$。对 $h \\ne 0$ 且 $|h| < \\delta/2$（$\\delta = \\operatorname{dist}(z, \\partial\\Omega)$），有',
        '',
        '$$\\frac{1}{\\zeta - z - h} - \\frac{1}{\\zeta - z} = \\frac{h}{(\\zeta - z - h)(\\zeta - z)},$$',
        '',
        '所以差商与「形式导数」$\\dfrac{1}{2\\pi i}\\oint \\dfrac{f(\\zeta)}{(\\zeta - z)^2}\\mathrm{d}\\zeta$ 之差是',
        '',
        '$$\\frac{1}{2\\pi i}\\oint f(\\zeta)\\left[ \\frac{1}{(\\zeta - z - h)(\\zeta - z)} - \\frac{1}{(\\zeta - z)^2} \\right]\\mathrm{d}\\zeta = \\frac{h}{2\\pi i}\\oint \\frac{f(\\zeta)\\,\\mathrm{d}\\zeta}{(\\zeta - z - h)(\\zeta - z)^2}.$$',
        '',
        '**统一下界。** $\\zeta \\in \\partial\\Omega$ 时 $|\\zeta - z| \\ge \\delta$ 且 $|\\zeta - z - h| \\ge \\delta - |h| \\ge \\delta/2$。故被积函数的模不超过 $\\dfrac{\\|f\\|_{\\partial\\Omega}}{(\\delta/2)\\delta^2}$，与 $\\zeta$、$h$ 无关。由 ML 不等式，整个积分的模不超过 $|h| \\cdot \\dfrac{\\|f\\|_{\\partial\\Omega}\\, L(\\partial\\Omega)}{\\delta^3/2} \\to 0$。',
        '',
        '于是 $f\'(z)$ 存在且等于那个形式导数 —— 一个**对 $z$ 连续**的表达式。所以 $f\'$ 连续，可以对它重做一遍同样的论证得到 $f\'\'$，归纳得',
        '',
        '$$f^{(n)}(z) = \\frac{n!}{2\\pi i}\\oint_{\\partial\\Omega}\\frac{f(\\zeta)}{(\\zeta - z)^{n+1}}\\,\\mathrm{d}\\zeta.$$',
        '',
        '**注意循环论证的风险。** 上面只用到了 $f$ 在 $\\partial\\Omega$ 上连续（来自 Cauchy 积分公式的成立），**没有**预设 $f\'$ 连续 —— 连续性是从结论里赚回来的。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.cauchy-inequality',
      kind: 'implication',
      sources: ['thm.cauchy-higher-derivative'],
      target: 'thm.cauchy-inequality',
      title: '高阶导数公式 + ML 不等式 $\\implies$ Cauchy 不等式',
      proof: [
        '取 $0 < r < R$。由高阶导数公式，在圆周 $|\\zeta - z_0| = r$ 上',
        '',
        '$$f^{(n)}(z_0) = \\frac{n!}{2\\pi i}\\oint_{|\\zeta - z_0| = r}\\frac{f(\\zeta)}{(\\zeta - z_0)^{n+1}}\\,\\mathrm{d}\\zeta.$$',
        '',
        '取模，把 $|\\mathrm{d}\\zeta|$ 的总长 $2\\pi r$ 与分母的 $r^{n+1}$ 提出来：',
        '',
        '$$\\left| f^{(n)}(z_0) \\right| \\le \\frac{n!}{2\\pi} \\cdot \\frac{\\max_{|\\zeta - z_0| = r}|f(\\zeta)|}{r^{n+1}} \\cdot 2\\pi r = \\frac{n!\\,M(r)}{r^n},$$',
        '',
        '其中 $M(r) = \\sup_{D(z_0, r)}|f|$（圆周上的上确界不超过圆盘上的）。$M(r)$ 关于 $r$ 单调不减，故 $M(r) \\le M(R)$，得 $|f^{(n)}(z_0)| \\le n! M(R)/r^n$。',
        '',
        '左端与 $r$ 无关，令 $r \\to R^-$ 即得 $|f^{(n)}(z_0)| \\le n! M(R)/R^n$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.complex-liouville',
      kind: 'implication',
      sources: ['thm.cauchy-inequality'],
      target: 'thm.liouville',
      title: 'Cauchy 不等式（$n = 1$）$\\implies$ Liouville 定理',
      proof: [
        '设 $f$ 在 $\\mathbb{C}$ 上全纯且 $|f| \\le M$。',
        '',
        '**逐点估计。** 固定任意 $z \\in \\mathbb{C}$ 与任意 $R > 0$。$f$ 在 $D(z, R)$ 上全纯，由 $n = 1$ 的 Cauchy 不等式',
        '',
        '$$|f\'(z)| \\le \\frac{1!}{R^{1}}\\,M(R) \\le \\frac{M}{R}.$$',
        '',
        '**让 $R \\to \\infty$。** 右端与 $z$ 无关，左端与 $R$ 无关，故 $f\'(z) = 0$ 对每个 $z$ 成立。',
        '',
        '**从导数到函数。** $f\' \\equiv 0$ 且 $\\mathbb{C}$ 连通：沿连接任意两点的折线，$\\frac{\\mathrm{d}}{\\mathrm{d}t} f(z_0 + tv) = f\' \\cdot v = 0$，故 $f$ 在这条路上为常数。所以 $f$ 是常数。',
        '',
        '**为什么必须是「全平面」。** 同一论证在 $D(0, R_0)$ 上只给出 $|f\'(z)| \\le M/(R_0 - |z|)$，右端随 $R_0$ 固定而不趋零 —— 所以有界全纯函数在**有界**区域上可以非常数（恒等映射在单位圆盘上就是）。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.liouville-fa',
      kind: 'implication',
      sources: ['thm.liouville'],
      target: 'thm.fundamental-algebra',
      title: 'Liouville 定理 $\\implies$ 代数基本定理（复分析路线）',
      proof: [
        '设 $p(z) = a_n z^n + \\cdots + a_1 z + a_0$，$n \\ge 1$，$a_n \\ne 0$。反设 $p$ 在 $\\mathbb{C}$ 上没有零点。',
        '',
        '**$1/p$ 是整函数。** $p$ 处处不为零，故 $g := 1/p$ 在 $\\mathbb{C}$ 上全纯（商的求导法则逐点可用）。',
        '',
        '**$1/p$ 有界。** 先估 $|p|$ 的下界（不妨设 $|z| \\ge 1$）：',
        '',
        '$$|p(z)| \\ge |a_n||z|^n - \\sum_{k=0}^{n-1}|a_k||z|^k \\ge |a_n||z|^n - n\\,C\\,|z|^{n-1},$$',
        '',
        '其中 $C = \\max_{k < n}|a_k|$。右端当 $|z|$ 足够大时 $\\ge \\frac{|a_n|}{2}|z|^n \\to +\\infty$。故存在 $R_0$ 使 $|z| > R_0$ 时 $|p(z)| \\ge 1$，从而 $|g(z)| \\le 1$。在紧集 $\\overline{D(0, R_0)}$ 上 $g$ 连续、因而有界，设为 $M_0$。于是 $|g| \\le \\max\\{1, M_0\\}$ 在全平面成立。',
        '',
        '**用 Liouville。** $g$ 是有界整函数，故 $g$ 是常数，从而 $p = 1/g$ 也是常数 —— 与 $n \\ge 1$（$a_n \\ne 0$）矛盾。',
        '',
        '**补一句。** 图上这条路与「最值定理 + 因式定理」那条是同一个定理的两个证明：那条用 $\\mathbb{R}$ 上的紧性，这条用复积分。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.max-modulus',
      kind: 'implication',
      sources: ['thm.cauchy-integral-formula'],
      target: 'thm.max-modulus',
      title: 'Cauchy 积分公式 $\\implies$ 平均值公式 $\\implies$ 最大模原理',
      proof: [
        '**平均值公式。** 设 $\\overline{D(z, r)} \\subset \\Omega$。在 Cauchy 积分公式里取 $\\partial\\Omega = \\partial D(z, r)$，参数化 $\\zeta = z + re^{i\\theta}$（$\\mathrm{d}\\zeta = ire^{i\\theta}\\mathrm{d}\\theta$）：',
        '',
        '$$f(z) = \\frac{1}{2\\pi i}\\int_0^{2\\pi} \\frac{f(z + re^{i\\theta})}{re^{i\\theta}}\\, i r e^{i\\theta}\\,\\mathrm{d}\\theta = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(z + re^{i\\theta})\\,\\mathrm{d}\\theta.$$',
        '',
        '即：**函数在中心的值 = 它在圆周上的平均值**。',
        '',
        '**取最大值的点附近。** 设 $M = \\sup_\\Omega |f|$ 在**内点** $z_0$ 被取到（即 $|f(z_0)| = M$，且 $M < \\infty$）。对任意 $r$ 使 $\\overline{D(z_0, r)} \\subset \\Omega$：',
        '',
        '$$M = |f(z_0)| = \\left| \\frac{1}{2\\pi}\\int_0^{2\\pi} f(z_0 + re^{i\\theta})\\mathrm{d}\\theta \\right| \\le \\frac{1}{2\\pi}\\int_0^{2\\pi} |f(z_0 + re^{i\\theta})|\\,\\mathrm{d}\\theta \\le M.$$',
        '',
        '两端都是 $M$，中间被夹住；而 $M - |f| \\ge 0$ 连续且积分为零，故 $|f| \\equiv M$ 在整个圆周上。',
        '',
        '**传播到全区域。** 令 $E = \\{ z \\in \\Omega : |f(z)| = M \\}$。$E$ 非空（含 $z_0$）；$E$ 在 $\\Omega$ 中**开**（上面刚证：$z \\in E$ 时整个小圆周都在 $E$ 里）；$E$ 在 $\\Omega$ 中**闭**（$|f|$ 连续）。$\\Omega$ 连通，故 $E = \\Omega$。',
        '',
        '**常数。** $|f| \\equiv M$ 且 $f$ 全纯：由 CR 方程与 $|f|^2 = u^2 + v^2$ 为常数，得 $u u_x + v v_x = 0$、$u u_y + v v_y = 0$，与 $u_x = v_y$、$u_y = -v_x$ 联立解得 $u_x = u_y = v_x = v_y = 0$，故 $f$ 局部为常数、再由连通性为常数。',
        '',
        '所以非常数全纯函数的模在内部取不到上确界 —— 这正是要证的。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.complex-taylor',
      kind: 'implication',
      sources: ['thm.cauchy-integral-formula'],
      target: 'thm.taylor-complex',
      title: 'Cauchy 积分公式 + 几何级数 $\\implies$ Taylor 展开',
      proof: [
        '**取一个稍小的圆。** 固定 $z \\in D(a, R)$，取 $\\rho$ 使 $|z - a| < \\rho < R$。由 Cauchy 积分公式（在 $D(a, \\rho)$ 上）',
        '',
        '$$f(z) = \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho}\\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta.$$',
        '',
        '**几何级数。** $\\zeta$ 在圆周上、$z$ 在圆内，故 $\\left| \\dfrac{z - a}{\\zeta - a} \\right| = \\dfrac{|z - a|}{\\rho} =: q < 1$，且这个界与 $\\zeta$ 无关。于是',
        '',
        '$$\\frac{1}{\\zeta - z} = \\frac{1}{(\\zeta - a) - (z - a)} = \\frac{1}{\\zeta - a}\\cdot\\frac{1}{1 - \\frac{z - a}{\\zeta - a}} = \\sum_{n=0}^{\\infty} \\frac{(z - a)^n}{(\\zeta - a)^{n+1}},$$',
        '',
        '右端关于 $\\zeta \\in \\partial D(a, \\rho)$ **一致收敛**（优级数 $\\sum q^n/\\rho$）。',
        '',
        '**逐项积分。** $f$ 在紧集 $\\partial D(a, \\rho)$ 上有界，一致收敛允许交换求和与积分：',
        '',
        '$$f(z) = \\sum_{n=0}^{\\infty}\\left( \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho}\\frac{f(\\zeta)}{(\\zeta - a)^{n+1}}\\,\\mathrm{d}\\zeta \\right)(z - a)^n = \\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(z - a)^n,$$',
        '',
        '最后一步是高阶导数公式（把 $z$ 换成 $a$）。',
        '',
        '**一致收敛。** 对任意紧集 $K \\subset D(a, R)$，取 $\\rho$ 使 $K \\subset D(a, \\rho) \\subset D(a, R)$，则 $|c_n| \\le \\|f\\|_{\\partial D(a,\\rho)}/\\rho^n$，优级数在 $K$ 上收敛。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.laurent',
      kind: 'implication',
      sources: ['thm.cauchy-integral-formula', 'thm.cauchy-goursat'],
      target: 'thm.laurent',
      title: '环域上的 Cauchy 积分公式 + 两个几何级数 $\\implies$ Laurent 展开',
      proof: [
        '**环域上的积分公式。** 取 $r < \\rho_1 < |z - a| < \\rho_2 < R$。在环域 $A_{\\rho_1, \\rho_2}(a)$ 上用 Cauchy 积分公式（边界是外圆减内圆，方向由多连通 Cauchy–Goursat 定）：',
        '',
        '$$f(z) = \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho_2}\\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta - \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho_1}\\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta.$$',
        '',
        '**外圆那一项：正幂次。** 在 $|\\zeta - a| = \\rho_2$ 上 $|z - a| < \\rho_2$，照 Taylor 那条边展开',
        '',
        '$$\\frac{1}{\\zeta - z} = \\sum_{n=0}^{\\infty}\\frac{(z - a)^n}{(\\zeta - a)^{n+1}} \\quad (\\text{一致收敛}),$$',
        '',
        '得 $\\sum_{n \\ge 0} c_n (z - a)^n$，其中 $c_n = \\dfrac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\rho_2}\\dfrac{f(\\zeta)}{(\\zeta - a)^{n+1}}\\mathrm{d}\\zeta$。',
        '',
        '**内圆那一项：负幂次。** 在 $|\\zeta - a| = \\rho_1$ 上 $|\\zeta - a| < |z - a|$，这次要按 $\\zeta - a$ 展开：',
        '',
        '$$-\\frac{1}{\\zeta - z} = \\frac{1}{z - \\zeta} = \\frac{1}{z - a}\\cdot\\frac{1}{1 - \\frac{\\zeta - a}{z - a}} = \\sum_{n=0}^{\\infty}\\frac{(\\zeta - a)^n}{(z - a)^{n+1}},$$',
        '',
        '代入后把 $\\dfrac{1}{(z - a)^{n+1}}$ 提到积分外面、把 $n + 1$ 改写成 $-m$（$m \\le -1$），就得到负幂次项，其系数同样是一个沿内圆的积分。',
        '',
        '**系数与 $\\rho$ 无关。** 环域 $\\{\\rho_1 < |\\zeta - a| < \\rho_2\\}$ 上被积函数 $\\dfrac{f(\\zeta)}{(\\zeta - a)^{n+1}}$ 全纯，两个同心圆周上的积分相等（Cauchy–Goursat 的环域版）。所以 $c_n$ 只依赖 $n$，可以任取 $\\rho \\in (r, R)$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.removable',
      kind: 'implication',
      sources: ['thm.cauchy-integral-formula'],
      target: 'thm.riemann-removable',
      title: 'Cauchy 积分公式 $\\implies$ Riemann 可去奇点定理',
      proof: [
        '**把 $f$ 写成两个 Cauchy 型积分之差。** 取 $0 < \\varepsilon < |z - a| < r$。在环域 $\\{\\varepsilon < |\\zeta - a| < r\\}$ 上用 Cauchy 积分公式：',
        '',
        '$$f(z) = \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = r}\\frac{f(\\zeta)}{\\zeta - z}\\mathrm{d}\\zeta - \\frac{1}{2\\pi i}\\oint_{|\\zeta - a| = \\varepsilon}\\frac{f(\\zeta)}{\\zeta - z}\\mathrm{d}\\zeta =: I_r(z) - I_\\varepsilon(z).$$',
        '',
        '**$I_r$ 是好的。** 分母 $\\zeta - z$ 在 $|\\zeta - a| = r$ 上不为零（因为 $|z - a| < r$），故 $I_r$ 在 $D(a, r)$ 上定义且全纯（在积分号下求导，做法与高阶导数那条边相同）。',
        '',
        '**$I_\\varepsilon$ 趋零。** 在 $|\\zeta - a| = \\varepsilon$ 上 $|\\zeta - z| \\ge |z - a| - \\varepsilon > 0$，于是',
        '',
        '$$|I_\\varepsilon(z)| \\le \\frac{1}{2\\pi}\\cdot\\frac{\\max_{|\\zeta - a| = \\varepsilon}|f(\\zeta)|}{|z - a| - \\varepsilon}\\cdot 2\\pi\\varepsilon = \\frac{\\varepsilon\\,\\|f\\|_{\\partial D(a, \\varepsilon)}}{|z - a| - \\varepsilon}.$$',
        '',
        '条件 $\\lim_{z \\to a}(z - a)f(z) = 0$ 说的正是 $\\varepsilon \\|f\\|_{\\partial D(a, \\varepsilon)} \\to 0$（把 $z$ 取成圆上使 $|f|$ 最大的点）。故 $I_\\varepsilon(z) \\to 0$。',
        '',
        '**$\\varepsilon$ 不能被「取极限」牵动。** $I_\\varepsilon(z)$ 由 $f$ 在圆周 $|\\zeta - a| = \\varepsilon$ 上的值决定；而对每个固定的 $\\varepsilon \\in (0, |z - a|)$，它是 $f(z) - I_r(z)$ 的一部分，是个**定值**。既然它被任意小的常数压住，只能是 $0$。',
        '',
        '**收尾。** $f(z) = I_r(z)$ 对 $z \\in D(a, r) \\setminus \\{a\\}$ 成立，令 $f(a) := I_r(a)$ 就把 $f$ 延拓成 $D(a, r)$ 上的全纯函数。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.residue-theorem',
      kind: 'implication',
      sources: ['thm.cauchy-goursat', 'def.residue'],
      target: 'thm.residue',
      title: '挖洞 + 多连通 Cauchy–Goursat $\\implies$ 留数定理',
      proof: [
        '**挖洞。** 取 $\\varepsilon > 0$ 足够小，使闭圆盘 $\\overline{D(z_k, \\varepsilon)}$（$k = 1, \\cdots, n$）两两不交、且都含在 $\\Omega$ 内。令',
        '',
        '$$\\Omega_\\varepsilon := \\Omega \\setminus \\bigcup_{k=1}^{n}\\overline{D(z_k, \\varepsilon)}.$$',
        '',
        '$\\Omega_\\varepsilon$ 是 $n$ 连通的，而 $f$ 在它上面全纯（挖掉的正是全部奇点）。',
        '',
        '**用多连通 Cauchy–Goursat。** 把 $\\Omega_\\varepsilon$ 的外边界与 $n$ 个内圈用 $n$ 条割线连成一条闭曲线，在它上面积分为 $0$；割线各被走两次、方向相反互相抵消，于是',
        '',
        '$$0 = \\oint_{\\partial\\Omega_\\varepsilon} f\\,\\mathrm{d}z = \\oint_{\\partial\\Omega} f\\,\\mathrm{d}z - \\sum_{k=1}^{n}\\oint_{|\\zeta - z_k| = \\varepsilon} f\\,\\mathrm{d}\\zeta,$$',
        '',
        '即 $\\displaystyle\\oint_{\\partial\\Omega} f\\,\\mathrm{d}z = \\sum_{k=1}^{n}\\oint_{|\\zeta - z_k| = \\varepsilon} f\\,\\mathrm{d}\\zeta$。',
        '',
        '**认出留数。** 由留数的定义，右端每一项等于 $2\\pi i\\operatorname{Res}(f, z_k)$，且与 $\\varepsilon$ 无关。故',
        '',
        '$$\\oint_{\\partial\\Omega} f\\,\\mathrm{d}z = 2\\pi i\\sum_{k=1}^{n}\\operatorname{Res}(f, z_k).$$',
        '',
        '**多连通区域的情形同理**：只是外边界换成若干条外圈之和，逐条用上面的论证。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.residue-pole',
      kind: 'implication',
      sources: ['def.residue', 'def.laurent-series'],
      target: 'prop.residue-at-pole',
      title: '留数等于 Laurent 系数 $c_{-1}$ + $\\psi$ 的 Taylor 展开 $\\implies$ 极点留数公式',
      proof: [
        '**把 $\\psi$ 展开。** $\\psi$ 在 $a$ 的邻域全纯，故（Taylor 展开那条边）',
        '',
        '$$\\psi(z) = \\sum_{k=0}^{\\infty}\\frac{\\psi^{(k)}(a)}{k!}(z - a)^k.$$',
        '',
        '**除以 $(z - a)^m$。**',
        '',
        '$$f(z) = \\frac{\\psi(z)}{(z - a)^m} = \\sum_{k=0}^{\\infty}\\frac{\\psi^{(k)}(a)}{k!}(z - a)^{k - m}.$$',
        '',
        '这是一个以 $a$ 为中心的 Laurent 级数（在 $0 < |z - a| < \\varepsilon$ 内成立），而且它就是 $f$ 的 Laurent 级数 —— 因为 Laurent 系数由积分公式唯一确定，写成什么样都一样。',
        '',
        '**读 $c_{-1}$。** 幂次 $k - m = -1$ 当且仅当 $k = m - 1$，对应的系数是',
        '',
        '$$c_{-1} = \\frac{\\psi^{(m-1)}(a)}{(m-1)!}.$$',
        '',
        '由留数的定义 $\\operatorname{Res}(f, a) = c_{-1}$，即得所求。',
        '',
        '**$m = 1$ 的化简。** $\\operatorname{Res}(f, a) = \\psi(a) = \\lim_{z \\to a}(z - a)f(z)$（$\\psi$ 连续）。若写成 $f = p/q$、$p(a) \\ne 0$、$q$ 在 $a$ 有一阶零点，则 $\\psi = p/(q/(z - a)) \\to p(a)/q\'(a)$。$\\blacksquare$'
      ].join('\n')
    },

    /* ------------------------------------------------------ 定义边 */
    {
      id: 'def-link.holomorphic-complex',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.holomorphic',
      note: '复可微的差商取值在 $\\mathbb{C}$ 里，$|h| \\to 0$ 是**二维**的趋近 —— 这正是它与实可微的分水岭。'
    },
    {
      id: 'def-link.holomorphic-derivative',
      kind: 'definition',
      definition: 'def.derivative',
      usedBy: 'def.holomorphic',
      note: '式子与实导数的差商一模一样，区别只在 $h$ 取复数值：实情形 $h \\to 0$ 只有两个方向，复情形有无穷多个。'
    },
    {
      id: 'def-link.cr-holomorphic',
      kind: 'definition',
      definition: 'def.holomorphic',
      usedBy: 'thm.cauchy-riemann',
      note: '定理的 (i) 就是「复可微」的定义；整条定理是把这条定义**翻译**成分量方程。'
    },
    {
      id: 'def-link.complex-partial-complex',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.complex-partial',
      note: '两个算子的定义式里都出现虚单位 $i$ —— 它们把 $\\mathbb{R}^2$ 上的两个实偏导重组成 $\\mathbb{C}$ 里的「两个方向」。'
    },
    {
      id: 'def-link.contour-integral-riemann',
      kind: 'definition',
      definition: 'def.riemann-sum',
      usedBy: 'def.contour-integral',
      note: '围道积分就是沿参数区间取分割、作 Riemann 和取极限；只是每段乘的是**复位移** $\\gamma(t_k) - \\gamma(t_{k-1})$ 而不是长度。'
    },
    {
      id: 'def-link.contour-integral-integrable',
      kind: 'definition',
      definition: 'def.riemann-integrable',
      usedBy: 'def.contour-integral',
      note: '定义右端的 $\\int_a^b f(\\gamma(t))\\gamma\'(t)\\,\\mathrm{d}t$ 是实区间上的复值 Riemann 积分，可积性按实部、虚部分别判定。'
    },
    {
      id: 'def-link.laurent-power-series',
      kind: 'definition',
      definition: 'def.power-series',
      usedBy: 'def.laurent-series',
      note: '正则部分就是普通的幂级数；主部是把 $(z - a)$ 换成 $(z - a)^{-1}$ 的同一种级数。两者的收敛域一内一外，交成环域。'
    },
    {
      id: 'def-link.taylor-power-series',
      kind: 'definition',
      definition: 'def.power-series',
      usedBy: 'thm.taylor-complex',
      note: '「$f$ 在 $D(a, R)$ 内解析」的定义就是：存在幂级数在 $D(a, R)$ 内收敛到 $f$。定理说的正是全纯蕴含这件事。'
    },
    {
      id: 'def-link.residue-contour',
      kind: 'definition',
      definition: 'def.contour-integral',
      usedBy: 'def.residue',
      note: '留数本身就是用**沿小圆周的围道积分**定义的，与 $r$ 的无关性由 Cauchy–Goursat 保证。'
    },
    {
      id: 'def-link.isolated-laurent',
      kind: 'definition',
      definition: 'def.laurent-series',
      usedBy: 'def.isolated-singularity',
      note: '三类奇点的判别完全靠 Laurent 展开**主部**的形状：空、有限项、无穷多项。'
    },
    {
      id: 'def-link.residue-theorem',
      kind: 'definition',
      definition: 'def.residue',
      usedBy: 'thm.residue',
      note: '定理的右端就是各奇点留数之和乘 $2\\pi i$ —— 留数的定义在这儿被一次性用掉。'
    },
    {
      id: 'def-link.residue-pole-isolated',
      kind: 'definition',
      definition: 'def.isolated-singularity',
      usedBy: 'prop.residue-at-pole',
      note: '公式的前提是「$a$ 是 $m$ 阶极点」，而「$m$ 阶极点」是按孤立奇点的分类定义的。'
    },
    {
      id: 'def-link.goursat-contour',
      kind: 'definition',
      definition: 'def.contour-integral',
      usedBy: 'thm.cauchy-goursat',
      note: '定理的全部内容是「某个围道积分等于零」，所以先得把围道积分本身定义清楚。'
    },
    {
      id: 'def-link.mobius-complex',
      kind: 'definition',
      definition: 'def.complex',
      usedBy: 'def.mobius',
      note: '系数 $a, b, c, d$ 都在 $\\mathbb{C}$ 里取；映射要延拓到 $\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}$ 上才是双射。'
    },
    {
      id: 'def-link.goursat-holomorphic',
      kind: 'definition',
      definition: 'def.holomorphic',
      usedBy: 'lem.goursat-triangle',
      note: '引理的前提就是「$f$ 在包含 $T$ 的开集上全纯」—— 证明里用到它的地方只有一处：差商 $\\dfrac{f(z) - f(z^*)}{z - z^*}$ 在 $z \\to z^*$ 时有极限（这正是复可微的定义）。'
    }

  ]
});
