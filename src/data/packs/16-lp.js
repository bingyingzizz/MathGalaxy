/* ==========================================================================
   内容包 · L^p 空间（范数、完备性、包含关系、对偶）
   --------------------------------------------------------------------------
   来自手写笔记「总结：Lp空间」第 1 ~ 6 页。

   主线：
     Hölder / Minkowski ──▶ L^p 是 Banach 空间（Riesz–Fischer）
              │
              ├─▶ L^∞ 与本性上界
              ├─▶ 空间之间的包含关系（三种情形差别很大）
              └─▶ 对偶：(L^p)* ≅ L^q（1 < p < ∞）──▶ L^p 自反

   ⚠ 记号：这个包起改用 LaTeX 写公式（KaTeX 已经接进星图）。
      求和/积分上下限、分式、范数这类**结构**必须让渲染器来排，
      Unicode 只能凑合零散符号。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'L^p 空间',
  nodes: [

    {
      id: 'def.lp-norm',
      cluster: 'analysis.lp',
      type: 'definition',
      label: 'L^p 范数',
      title: 'L^p 范数与 L^p 空间',
      regions: ['analysis'],
      tags: ['定义', 'Lp', '范数'],
      statement: [
        '固定测度空间 $(X, \\mathcal{M}, \\mu)$。对可测 $f$ 与 $0 < p < \\infty$ 定义',
        '',
        '$$\\|f\\|_p := \\left[ \\int |f|^p \\, d\\mu \\right]^{1/p}$$',
        '',
        '以及',
        '',
        '$$L^p(X, \\mathcal{M}, \\mu) := \\{\\, f : X \\to \\mathbb{C} : f \\text{ 可测},\\ \\|f\\|_p < \\infty \\,\\}$$'
      ].join('\n'),
      notes: [
        '基本事实（都可直接验证）：',
        '',
        '- $\\|f\\|_p = 0 \\iff f = 0$ a.e.；',
        '- $\\|cf\\|_p = |c| \\, \\|f\\|_p$；',
        '- $f, g \\in L^p \\Rightarrow f + g \\in L^p$（这一步用 $|f+g|^p \\le 2^p(|f|^p + |g|^p)$）。',
        '',
        '⚠ **$p < 1$ 时三角不等式失效**，所以那时 $L^p$ 只是拟范数空间（虽然它仍然是完备的）。',
        '和 $L^1$ 一样，$L^p$ 的元素其实是**函数的等价类**（a.e. 相等视为同一个），这正是 $\\|f\\|_p = 0 \\Rightarrow f = 0$ 得以成立的前提。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.1']
    },

    {
      id: 'lem.young-inequality',
      cluster: 'analysis.lp',
      type: 'lemma',
      label: 'Young 不等式',
      title: 'Young 不等式（a^λ · b^(1−λ) ≤ λa + (1−λ)b）',
      regions: ['analysis'],
      tags: ['引理', 'Young', '凸性'],
      statement: [
        '设 $a \\ge 0$，$b \\ge 0$，$0 < \\lambda < 1$。则',
        '',
        '$$a^{\\lambda} b^{1-\\lambda} \\le \\lambda a + (1-\\lambda) b$$'
      ].join('\n'),
      notes: [
        '这就是 $\\log$ 的凹性（等价于指数函数的凸性）：',
        '',
        '$$\\log\\!\\left( \\lambda a + (1-\\lambda) b \\right) \\ge \\lambda \\log a + (1-\\lambda) \\log b$$',
        '',
        '两边取指数即得。',
        '引出标准特例：取 $\\lambda = 1/p$、$a = |f|^p / \\|f\\|_p^p$、$b = |g|^q / \\|g\\|_q^q$，就是 **Hölder 不等式** 的证明里那一步。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.1']
    },

    {
      id: 'thm.holder',
      cluster: 'analysis.lp',
      type: 'theorem',
      label: 'Hölder 不等式',
      title: 'Hölder 不等式',
      regions: ['analysis'],
      tags: ['定理', 'Hölder', '共轭指数'],
      statement: [
        '设 $1 < p < \\infty$，$q$ 是 $p$ 的**共轭指数**：$\\dfrac{1}\\{p\\} + \\dfrac{1}\\{q\\} = 1$。则对可测 $f, g$：',
        '',
        '$$\\|fg\\|_1 \\le \\|f\\|_p \\, \\|g\\|_q$$'
      ].join('\n'),
      notes: [
        '**取等条件**：等号成立 $\\iff$ $|f|^p$ 与 $|g|^q$ 成比例 a.e.（即 $\\alpha |f|^p = \\beta |g|^q$ a.e.）。',
        '证明：先设 $\\|f\\|_p = \\|g\\|_q = 1$。由 Young 不等式，把 $\\lambda = 1/p$、$a = |f|^p$、$b = |g|^q$ 代进去得',
        '',
        '$$|fg| \\le \\frac{|f|^p}\\{p\\} + \\frac{|g|^q}\\{q\\}$$',
        '',
        '两边积分即得 $\\|fg\\|_1 \\le \\frac{1}\\{p\\} + \\frac{1}\\{q\\} = 1$。一般情形把 $f, g$ 各自归一化。',
        '⚠ $p = q = 2$ 时就是 **Cauchy–Schwarz 不等式**。',
        '$p = 1$ 时共轭指数是 $q = \\infty$，此时 $\\|fg\\|_1 \\le \\|f\\|_1 \\|g\\|_\\infty$（见 $L^\\infty$ 那一节）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 6.2']
    },

    {
      id: 'thm.minkowski',
      cluster: 'analysis.lp',
      type: 'theorem',
      label: 'Minkowski 不等式',
      title: 'Minkowski 不等式（$L^p$ 的三角不等式）',
      regions: ['analysis'],
      tags: ['定理', 'Minkowski', '三角不等式'],
      statement: [
        '设 $1 \\le p < \\infty$。则对 $f, g \\in L^p$：',
        '',
        '$$\\|f + g\\|_p \\le \\|f\\|_p + \\|g\\|_p$$'
      ].join('\n'),
      notes: [
        '$p = 1$ 就是积分的三角不等式，显然。',
        '一般 $p$ 的证明：',
        '',
        '$$\\int |f+g|^p = \\int |f+g| \\cdot |f+g|^{p-1} \\le \\int (|f| + |g|) |f+g|^{p-1} \\le \\left( \\|f\\|_p + \\|g\\|_p \\right) \\left\\| |f+g|^{p-1} \\right\\|_q$$',
        '',
        '其中最后一步是对 $|f| \\cdot |f+g|^{p-1}$ 与 $|g| \\cdot |f+g|^{p-1}$ 各用一次 Hölder。再注意',
        '',
        '$$\\left\\| |f+g|^{p-1} \\right\\|_q^{\\,q} = \\int |f+g|^{(p-1)q} = \\int |f+g|^p$$',
        '',
        '两边约掉一个 $\\|f+g\\|_p^{p/q}$ 即得。∎',
        '⭐ 有了它，$\\|\\cdot\\|_p$ 才真的成为**范数** —— 这是下面「$L^p$ 是 Banach 空间」的前提。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 6.2']
    },

    {
      id: 'thm.lp-banach',
      cluster: 'analysis.lp',
      type: 'theorem',
      label: 'L^p 是 Banach 空间',
      title: '定理（Riesz–Fischer）：$1 \\le p < \\infty$ 时 $L^p$ 完备',
      regions: ['analysis'],
      tags: ['定理', 'Banach', 'Riesz–Fischer', '完备'],
      statement: [
        '设 $1 \\le p < \\infty$。则 $L^p(X, \\mathcal{M}, \\mu)$ 关于范数 $\\|\\cdot\\|_p$ 是**完备**的，即它是一个 **Banach 空间**。'
      ].join('\n'),
      notes: [
        '证明用的判据是：**赋范线性空间完备 $\\iff$ 绝对收敛的无穷级数收敛**。',
        '设 $\\{f_k\\} \\subseteq L^p$ 且 $\\sum_{k} \\|f_k\\|_p = B < \\infty$。只要证明 $\\sum_k f_k$ 在 $L^p$ 范数下收敛即可。',
        '技巧在于把「逐点收敛」与「范数收敛」分开处理：令 $G_n = \\sum_{k \\le n} |f_k|$、$G = \\sum_k |f_k|$，则由 MCT',
        '',
        '$$\\|G_n\\|_p \\le \\sum_{k \\le n} \\|f_k\\|_p \\le B \\quad \\Rightarrow \\quad \\int G^p = \\lim_n \\int G_n^p \\le B^p$$',
        '',
        '故 $G \\in L^p$、特别地 $G < \\infty$ a.e.，于是 $\\sum_k f_k$ **a.e. 绝对收敛**。记极限为 $F$。',
        '再用一次 DCT 拿下范数收敛：$\\left| F - \\sum_{k \\le n} f_k \\right|^p \\le (2G)^p \\in L^1$，故',
        '',
        '$$\\left\\| F - \\sum_{k \\le n} f_k \\right\\|_p^p = \\int \\left| F - \\sum_{k \\le n} f_k \\right|^p \\to 0$$',
        '',
        '∎'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 6.6']
    },

    {
      id: 'prop.dense-simple-compact-support',
      cluster: 'analysis.lp',
      type: 'proposition',
      label: '紧支简单函数稠密',
      title: '命题：紧支集简单函数在 $L^p$ 中稠密',
      regions: ['analysis'],
      tags: ['命题', '稠密', '简单函数'],
      statement: [
        '设 $1 \\le p < \\infty$。**紧支集的简单函数**在 $L^p$ 中稠密（$p = \\infty$ 时不成立）。'
      ].join('\n'),
      notes: [
        '证明：对 $f \\in L^p$，取简单函数列 $\\{f_n\\}$ 使 $f_n \\to f$ a.e. 且 $|f_n| \\le |f|$（简单函数逼近定理给的就是这个形状）。于是 $f_n \\in L^p$，且',
        '',
        '$$|f_n - f|^p \\le 2^p |f|^p \\in L^1$$',
        '',
        '由 DCT 得 $\\|f_n - f\\|_p \\to 0$。$f_n$ 是简单函数、支撑集有限 —— 这就是要的稠密性。∎',
        '⚠ **$p = \\infty$ 时这条失效**：$L^\\infty$ 里的简单函数是「有限个值」，均匀逼近一个连续函数办不到（例如 $\\sin$ 型或一般的连续函数）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.1']
    },

    {
      id: 'def.essential-sup',
      cluster: 'analysis.lp',
      type: 'definition',
      label: '本性上界与 L^∞',
      title: '本性上界 $\\|f\\|_\\infty$ 与空间 $L^\\infty$',
      regions: ['analysis'],
      tags: ['定义', 'L∞', '本性上界'],
      statement: [
        '定义',
        '',
        '$$\\|f\\|_\\infty := \\inf \\{\\, a \\ge 0 : \\mu(\\{\\, |f| > a \\,\\}) = 0 \\,\\}$$',
        '',
        '（把 $f$ 在零集上的取值完全忽略之后，它的「真正」上界。）这个下确界**是可以取到的**：对 $a = \\|f\\|_\\infty$ 本身就有 $\\mu(\\{|f| > a\\}) = 0$。',
        '',
        '$$\nL^\\infty(X, \\mathcal{M}, \\mu) := \\{\\, f : X \\to \\mathbb{C} : f \\text{ 可测},\\ \\|f\\|_\\infty < \\infty \\,\\}\n$$'
      ].join('\n'),
      notes: [
        '等价说法：$\\|f\\|_\\infty \\le M \\iff |f(x)| \\le M$ 对 a.e. $x$ 成立。',
        '「本性」两个字的意思是：**把零集上的糟糕取值统统不算**。比如 $f = 0$ a.e. 但 $f$ 在某个零集上取 $+\\infty$，仍然有 $\\|f\\|_\\infty = 0$。',
        '⚠ $\\|f\\|_\\infty$ 与「$\\sup |f|$」不同：后者可能因为零集上的一点而变得很大。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.1']
    },

    {
      id: 'thm.linf-properties',
      cluster: 'analysis.lp',
      type: 'theorem',
      label: 'L^∞ 的性质',
      title: '定理：$L^\\infty$ 的五条基本性质',
      regions: ['analysis'],
      tags: ['定理', 'L∞', 'Banach', '一致收敛'],
      statement: [
        '**(a)** $\\|fg\\|_\\infty \\le \\|f\\|_\\infty \\|g\\|_\\infty$。若 $f \\in L^1$、$g \\in L^\\infty$，则',
        '',
        '$$\\|fg\\|_1 = \\|f\\|_1 \\|g\\|_\\infty \\iff |g(x)| = \\|g\\|_\\infty \\text{ a.e. on } \\{f \\ne 0\\}$$',
        '',
        '**(b)** $\\|\\cdot\\|_\\infty$ 是 $L^\\infty$ 上的**范数**。',
        '',
        '**(c)** $\\|f_n - f\\|_\\infty \\to 0 \\iff$ 存在 $E \\in \\mathcal{M}$、$\\mu(E^c) = 0$，使 $f_n \\to f$ **在 $E$ 上一致收敛**。',
        '',
        '**(d)** $L^\\infty$ 是 **Banach 空间**。',
        '',
        '**(e)** 简单函数在 $L^\\infty$ 中**稠密**。'
      ].join('\n'),
      notes: [
        '⚠ (c) 值得注意：$L^\\infty$ 范数收敛 $=$ **「丢掉一个零集之后一致收敛」** —— 这是 $L^\\infty$ 独有的、比其他 $L^p$ 强得多的性质。',
        '⚠ (e) 与「紧支简单函数在 $L^p$ 稠密」形成对照：$L^\\infty$ 里简单函数够稠密，但**紧支**的就不够（因为 $L^\\infty$ 不看测度大小，只看逐点大小）。',
        '一个很有用的直觉 ——「**$L^p$ 怎么样失败？**」：',
        '',
        '1. 在某点**增长太快**（局部爆破）；',
        '2. 在无穷远**衰减太慢**。',
        '',
        '记住这两条，下面三个包含关系命题的取向就都能自己想出来。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.1']
    },

    {
      id: 'prop.lq-in-lp-plus-lr',
      cluster: 'analysis.lp',
      type: 'proposition',
      label: 'L^q 落在 L^p + L^r 里',
      title: '命题：L^q ⊆ L^p + L^r（0 < p < q < r ≤ ∞）',
      regions: ['analysis'],
      tags: ['命题', '插值', '分解'],
      statement: [
        '设 $0 < p < q < r \\le \\infty$。则',
        '',
        '$$L^q \\subseteq L^p + L^r$$',
        '',
        '（右边理解为 $\\{ g + h : g \\in L^p,\\ h \\in L^r \\}$。）'
      ].join('\n'),
      notes: [
        '证明：取 $f \\in L^q$，按「大」与「小」把它切开 ——',
        '',
        '$$E := \\{\\, x : |f(x)| > 1 \\,\\}, \\qquad g := f \\chi_E, \\qquad h := f \\chi_{E^c}$$',
        '',
        '则',
        '',
        '$$|g|^p = |f|^p \\chi_E \\le |f|^q \\chi_E, \\qquad |h|^r = |f|^r \\chi_{E^c} \\le |f|^q \\chi_{E^c}$$',
        '',
        '（第二式用到 $|f| \\le 1$ 在 $E^c$ 上成立。）于是 $g \\in L^p$、$h \\in L^r$。$r = \\infty$ 时 $\\|h\\|_\\infty \\le 1$，显然。∎',
        '⭐ 这条说的是：**中间的 $L^q$ 可以被两端的 $L^p$ 与 $L^r$ 分担** —— 「大的部分」交给小的指数管，「小的部分」交给大的指数管。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 6.4']
    },

    {
      id: 'prop.lp-inter-lr-in-lq',
      cluster: 'analysis.lp',
      type: 'proposition',
      label: 'L^p ∩ L^r ⊆ L^q',
      title: '命题（插值）：L^p ∩ L^r ⊆ L^q',
      regions: ['analysis'],
      tags: ['命题', '插值', 'Riesz–Thorin 初等版'],
      statement: [
        '设 $0 < p < q < r \\le \\infty$。若 $f \\in L^p \\cap L^r$，则 $f \\in L^q$，且',
        '',
        '$$\\|f\\|_q \\le \\|f\\|_p^{\\lambda} \\, \\|f\\|_r^{1-\\lambda}$$',
        '',
        '其中 $\\lambda \\in (0,1)$ 由下式确定：',
        '',
        '$$\\frac{1}\\{q\\} = \\frac{\\lambda}\\{p\\} + \\frac{1-\\lambda}\\{r\\} \\qquad \\Longleftrightarrow \\qquad \\lambda = \\frac{\\,q^{-1} - r^{-1}\\,}\\{p^{-1} - r^{-1}\\}$$'
      ].join('\n'),
      notes: [
        '这是 **Riesz–Thorin 插值定理**的初等特例：$L^q$ 范数被两端的 $L^p$、$L^r$ 范数「对数凸」地控制住。',
        '证明：$r = \\infty$ 的情形最干净 —— 此时 $\\lambda = p/q$，从 $|f|^q \\le \\|f\\|_\\infty^{\\,q-p} |f|^p$ 出发，',
        '',
        '$$\\|f\\|_q \\le \\|f\\|_p^{p/q} \\|f\\|_\\infty^{1-p/q} = \\|f\\|_p^{\\lambda} \\|f\\|_\\infty^{1-\\lambda}$$',
        '一般 $r < \\infty$ 时对',
        '',
        '$$|f|^q = |f|^{\\lambda q} \\cdot |f|^{(1-\\lambda)q}$$',
        '用 Hölder，指数取 $p/(\\lambda q)$ 与 $r/((1-\\lambda)q)$（它们的倒数和恰好是 $1$，这正是 $\\lambda$ 的定义），得到',
        '',
        '$$\\|f\\|_q^q \\le \\left[ \\int |f|^p \\right]^{\\lambda q/p} \\left[ \\int |f|^r \\right]^{(1-\\lambda)q/r} = \\|f\\|_p^{\\lambda q} \\|f\\|_r^{(1-\\lambda)q}$$',
        '两边开 $q$ 次方即可。∎'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 6.4']
    },

    {
      id: 'prop.ell-p-inclusion',
      cluster: 'analysis.lp',
      type: 'proposition',
      label: 'ℓ^p ⊆ ℓ^q',
      title: '命题（只有衰减的场合）：ℓ^p ⊆ ℓ^q（0 < p < q ≤ ∞）',
      regions: ['analysis'],
      tags: ['命题', '序列空间', '包含'],
      statement: [
        '设 $0 < p < q \\le \\infty$，$A$ 是任意指标集。则',
        '',
        '$$\\ell^p(A) \\subseteq \\ell^q(A), \\qquad \\|f\\|_q \\le \\|f\\|_p$$'
      ].join('\n'),
      notes: [
        '这里 $\\ell^p$ 是**计数测度**下的 $L^p$ —— 没有「局部爆破」可言，只剩「衰减」。',
        '证明：先看 $q = \\infty$。由 $|f|^p$ 的每一项都不超过总和，',
        '',
        '$$\\|f\\|_\\infty^p = \\sup_{\\alpha} |f(\\alpha)|^p \\le \\sum_{\\alpha} |f(\\alpha)|^p = \\|f\\|_p^p$$',
        '故 $\\|f\\|_\\infty \\le \\|f\\|_p$。一般 $q < \\infty$ 用插值：',
        '',
        '$$\\|f\\|_q \\le \\|f\\|_p^{p/q} \\|f\\|_\\infty^{1-p/q} \\le \\|f\\|_p$$',
        '（第二个不等号把 $\\|f\\|_\\infty \\le \\|f\\|_p$ 代进去。）∎',
        '⭐ 方向记法：**指数越大，空间越小**（在 $\\ell^p$ 里）—— 因为要求「衰减更快」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.1']
    },

    {
      id: 'prop.lp-inclusion-finite',
      cluster: 'analysis.lp',
      type: 'proposition',
      label: '有限测度时方向反过来',
      title: '命题（只有爆破的场合）：μ(X) < ∞ 时 L^p(μ) ⊇ L^q(μ)',
      regions: ['analysis'],
      tags: ['命题', '有限测度', '包含'],
      statement: [
        '设 $\\mu(X) < \\infty$，$0 < p < q \\le \\infty$。则',
        '',
        '$$L^q(\\mu) \\subseteq L^p(\\mu), \\qquad \\|f\\|_p \\le \\|f\\|_q \\, \\mu(X)^{\\,(1/p) - (1/q)}$$'
      ].join('\n'),
      notes: [
        '证明：$q = \\infty$ 时，',
        '',
        '$$\\|f\\|_p^p = \\int |f|^p \\le \\|f\\|_\\infty^p \\int 1 = \\|f\\|_\\infty^p \\, \\mu(X)$$',
        '一般 $q < \\infty$ 时，把 $|f|^p$ 看作 $|f|^p \\cdot 1$，对它用 Hölder，指数取 $q/p$ 与 $q/(q-p)$：',
        '',
        '$$\\|f\\|_p^p = \\int |f|^p \\cdot 1 \\le \\big\\| |f|^p \\big\\|_{q/p} \\, \\|1\\|_{q/(q-p)} = \\|f\\|_q^p \\, \\mu(X)^{(q-p)/q}$$',
        '两边开 $p$ 次方即得。∎',
        '⭐ **与 $\\ell^p$ 的方向正好相反**（那里是 $p$ 越大空间越小，这里是越小越大）。',
        '记忆口诀：',
        '',
        '- **测度有限** $\\to$ 只有「爆破」要防 $\\to$ 指数**越小**空间**越大**：$L^1 \\supseteq L^2 \\supseteq \\cdots \\supseteq L^\\infty$；',
        '- **计数测度** $\\to$ 只有「衰减」要防 $\\to$ 指数**越大**空间**越小**：$\\ell^1 \\subseteq \\ell^2 \\subseteq \\cdots \\subseteq \\ell^\\infty$。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.1']
    },

    {
      id: 'def.conjugate-exponents',
      cluster: 'analysis.lp',
      type: 'definition',
      label: '共轭指数',
      title: '共轭指数（Conjugate Exponents）',
      regions: ['analysis'],
      tags: ['定义', '共轭', '对偶'],
      statement: [
        '设 $1 \\le p \\le \\infty$。称 $q$ 是 $p$ 的**共轭指数**，当且仅当',
        '',
        '$$\\frac{1}\\{p\\} + \\frac{1}\\{q\\} = 1$$',
        '',
        '（约定 $1/\\infty = 0$，于是 $p = 1$ 对应 $q = \\infty$，$p = \\infty$ 对应 $q = 1$。）'
      ].join('\n'),
      notes: [
        '由对称性 $\\dfrac{1}\\{q\\} + \\dfrac{1}\\{p\\} = 1$，所以「共轭」是相互的：$p$ 与 $q$ 互为共轭。',
        '$p = 2$ 时 $q = 2$：**$L^2$ 是自共轭的** —— 这是 Hilbert 空间理论的起点。',
        '⭐ 共轭指数的意义：Hölder 不等式说 $L^p$ 与 $L^q$ 之间有一对「配对」$\\int fg$；而下面的对偶定理说这个配对**恰好就是 $L^p$ 的整个对偶空间**。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.2']
    },

    {
      id: 'def.duality-map',
      cluster: 'analysis.lp',
      type: 'definition',
      label: '对偶配对 φ_g',
      title: '由 g 给出的线性泛函 φ_g(f) = ∫ f·g',
      regions: ['analysis'],
      tags: ['定义', '对偶', '线性泛函'],
      statement: [
        '设 $p, q$ 共轭，$g \\in L^q$。定义 $L^p$ 上的线性泛函',
        '',
        '$$\\varphi_g(f) := \\int f g \\, d\\mu$$'
      ].join('\n'),
      notes: [
        '由 **Hölder 不等式**，这个泛函是有界的，而且',
        '',
        '$$\\|\\varphi_g\\| \\le \\|g\\|_q$$',
        '（这里 $\\|\\varphi_g\\|$ 是 $(L^p)^*$ 里的算子范数，即 $\\sup\\{|\\varphi_g(f)| : \\|f\\|_p = 1\\}$。）',
        '⭐ 于是得到一个映射',
        '',
        '$$L^q \\longrightarrow (L^p)^*, \\qquad g \\mapsto \\varphi_g$$',
        '下面两条命题要证明它是一个**等距同构**（在 $1 < p < \\infty$ 时）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.2']
    },

    {
      id: 'prop.duality-isometry',
      cluster: 'analysis.lp',
      type: 'proposition',
      label: '‖g‖_q = ‖φ_g‖',
      title: '命题：‖φ_g‖ = ‖g‖_q（μ 半有限时也含 q = ∞）',
      regions: ['analysis'],
      tags: ['命题', '等距', '对偶'],
      statement: [
        '设 $p, q$ 共轭。则',
        '',
        '- 若 $1 \\le q < \\infty$，$g \\in L^q$，就有 $\\|\\varphi_g\\| = \\|g\\|_q$；',
        '- 若 $\\mu$ 是**半有限**的，$q = \\infty$ 时同样成立。'
      ].join('\n'),
      notes: [
        '证明的要点是**构造一个把 $\\varphi_g$ 的范数顶满的 $f$**。',
        '',
        '**$q < \\infty$ 时**：由 Hölder 已有 $\\|\\varphi_g\\| \\le \\|g\\|_q$；反向取',
        '',
        '$$f := \\frac{|g|^{q-1} \\operatorname{sgn} g}\\{\\|g\\|_q^{\\,q-1}\\}$$',
        '',
        '直接算得 $\\|f\\|_p^p = \\dfrac{\\int |g|^q}\\{\\int |g|^q\\} = 1$，于是',
        '',
        '$$\\|\\varphi_g\\| \\ge \\int fg = \\|g\\|_q$$',
        '**$q = 1$ 时**取 $f = \\operatorname{sgn} g$（范数 1），得 $\\int fg = \\|g\\|_1$。',
        '**$q = \\infty$ 时**要用到半有限性：对任意 $\\varepsilon > 0$，集合 $A = \\{|g(x)| > \\|g\\|_\\infty - \\varepsilon\\}$ 有正测度；由半有限性取 $B \\subseteq A$ 使 $0 < \\mu(B) < \\infty$，令',
        '',
        '$$f := \\mu(B)^{-1} \\chi_B \\operatorname{sgn} g$$',
        '',
        '则 $\\|f\\|_1 = 1$ 而 $\\|\\varphi_g\\| \\ge \\int fg = \\dfrac{1}\\{\\mu(B)\\} \\int_B |g| \\ge \\|g\\|_\\infty - \\varepsilon$。由 $\\varepsilon$ 任意即得。∎'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 6.8']
    },

    {
      id: 'prop.bounded-functional-gives-lq',
      cluster: 'analysis.lp',
      type: 'proposition',
      label: '有界 ⟹ g ∈ L^q',
      title: '命题：若 f ↦ ∫fg 在简单函数上有界，则 g ∈ L^q',
      regions: ['analysis'],
      tags: ['命题', '有界泛函', 'L^q'],
      statement: [
        '设 $g$ 在 $(X, \\mathcal{M})$ 上可测，且对**每个有限支集的简单函数** $f$ 都有 $fg \\in L^1$。记',
        '',
        '$$M_g(g) := \\sup \\left\\{ \\, \\left| \\int fg \\right| : f \\in \\Sigma,\\ \\|f\\|_p = 1 \\,\\right\\}$$',
        '',
        '（$\\Sigma$ $=$ 有限支集简单函数全体。）若 $M_g(g) < \\infty$，且',
        '',
        '- $\\{x : g(x) \\ne 0\\}$ 是 **$\\sigma$有限** 的，**或**',
        '- $\\mu$ 是**半有限**的，',
        '',
        '则 $g \\in L^q$，且 $M_g(g) = \\|g\\|_q$。'
      ].join('\n'),
      notes: [
        '这条是下一个大定理（$(L^p)^* \\cong L^q$）的技术准备：它说「泛函有界」这件事本身就已经把 $g$ 逼进了 $L^q$。',
        '证明分三步（见右侧箭头）：Step 1 先证「$f$ 有限支可测」时也有 $|\\int fg| \\le M_g(g)$；Step 2 处理 $q < \\infty$；Step 3 处理 $q = \\infty$。',
        '⚠ 两个前提条件（$\\sigma$有限 / 半有限）在 Step 2、Step 3 里各用一次，**不能省**。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 6.14']
    },

    {
      id: 'thm.riesz-representation-lp',
      cluster: 'analysis.lp',
      type: 'theorem',
      label: '(L^p)* ≅ L^q',
      title: '定理（Riesz 表示）：1 < p < ∞ 时 (L^p)* ≅ L^q',
      regions: ['analysis'],
      tags: ['定理', 'Riesz 表示', '对偶', '等距同构'],
      statement: [
        '设 $1 < p < \\infty$，$q$ 是共轭指数。则对每个 $\\Phi \\in (L^p)^*$，存在**唯一**（a.e.）的 $g \\in L^q$ 使',
        '',
        '$$\n\\Phi(f) = \\int f g \\, d\\mu \\qquad \\forall f \\in L^p\n$$',
        '',
        '于是映射 $g \\mapsto \\varphi_g$ 是 $L^q$ 到 $(L^p)^*$ 的**等距同构**：',
        '',
        '$$(L^p)^* \\cong L^q$$',
        '',
        '特别地，$p = 2$ 时 $L^2$ 自对偶。'
      ].join('\n'),
      notes: [
        '⭐ 这是 $L^p$ 理论的高潮：**$L^p$ 上的每一个连续线性泛函，都只是「乘一个 $L^q$ 函数再积分」**。',
        '$p = 1$、$\\mu$ $\\sigma$有限时结论同样成立（$(L^1)^* \\cong L^\\infty$）；',
        '⚠ 但 $p = \\infty$ 时**不成立**：$(L^\\infty)^*$ 严格大于 $L^1$（存在不是由 $L^1$ 函数给出的有界线性泛函，比如在 $C[0,1]$ 上调 Hahn–Banach 得到的那些）。',
        '证明思路（见右侧箭头）：先把 $\\Phi$ 变成一个复测度（$\\nu(E) := \\Phi(\\chi_E)$），再用 Radon–Nikodym 把它写成 $\\int \\cdot \\, g \\, d\\mu$，最后验证 $g \\in L^q$。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 6.15']
    },

    {
      id: 'cor.lp-reflexive',
      cluster: 'analysis.lp',
      type: 'corollary',
      label: 'L^p 自反',
      title: '推论：1 < p < ∞ 时 L^p ≅ (L^p)**',
      regions: ['analysis'],
      tags: ['推论', '自反', '对偶'],
      statement: [
        '设 $1 < p < \\infty$。则',
        '',
        '$$L^p \\cong (L^p)^{**}$$',
        '',
        '即 $L^p$ 是**自反**的 Banach 空间。'
      ].join('\n'),
      notes: [
        '把对偶定理用两次即可：$(L^p)^* \\cong L^q$，而 $q$ 的共轭又回到 $p$，故 $(L^p)^{**} \\cong (L^q)^* \\cong L^p$。',
        '⚠ $p = 1$ 与 $p = \\infty$ 时**不**自反。',
        '⭐ 自反性的价值：自反 Banach 空间里**有界序列必有弱收敛子列**（Banach–Alaoglu / Eberlein–Šmulian），这是变分法与 PDE 里取极限的基本工具。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §6.2']
    }
  ],

  edges: [

    {
      id: 'imp.holder',
      kind: 'implication',
      sources: ['lem.young-inequality'],
      target: 'thm.holder',
      title: 'Young 不等式 ⟹ Hölder 不等式',
      proof: [
        '**① 先设 $\\|f\\|_p = \\|g\\|_q = 1$。** 在 Young 不等式里取',
        '',
        '$$a = |f(x)|^p, \\qquad b = |g(x)|^q, \\qquad \\lambda = \\frac{1}\\{p\\}, \\qquad 1 - \\lambda = \\frac{1}\\{q\\}$$',
        '',
        '得逐点不等式',
        '',
        '$$|f(x)g(x)| \\le \\frac{|f(x)|^p}\\{p\\} + \\frac{|g(x)|^q}\\{q\\}$$',
        '',
        '**② 积分。**',
        '',
        '$$\\int |fg| \\le \\frac{1}\\{p\\} \\int |f|^p + \\frac{1}\\{q\\} \\int |g|^q = \\frac{1}\\{p\\} + \\frac{1}\\{q\\} = 1$$',
        '',
        '**③ 一般情形。** 若 $\\|f\\|_p$、$\\|g\\|_q$ 都非零，把 $f / \\|f\\|_p$ 与 $g / \\|g\\|_q$ 代进去再用齐次性。若有一个为零，则 $fg = 0$ a.e.，两边都是 0。∎',
        '',
        '**④ 取等条件。** 回看 ②：等号成立要求 ① 里每一步都取等，即 $a = b$ a.e.（Young 不等式的取等条件），也就是',
        '',
        '$$|f|^p = |g|^q \\quad \\text{a.e.}$$',
        '在归一化之后；还原到一般情形就是「$|f|^p$ 与 $|g|^q$ 成比例 a.e.」。'
      ].join('\n')
    },

    {
      id: 'imp.minkowski',
      kind: 'implication',
      sources: ['thm.holder'],
      target: 'thm.minkowski',
      title: 'Hölder 不等式 ⟹ Minkowski 不等式',
      proof: [
        '**① 拆开。** 对 $p > 1$，',
        '',
        '$$|f+g|^p = |f+g| \\cdot |f+g|^{p-1} \\le \\left( |f| + |g| \\right) |f+g|^{p-1}$$',
        '',
        '**② 两次 Hölder。** 对 $|f| \\cdot |f+g|^{p-1}$ 与 $|g| \\cdot |f+g|^{p-1}$ 分别用 Hölder（指数 $p$ 与 $q$，其中 $1/p + 1/q = 1$）：',
        '',
        '$$\\int |f+g|^p \\le \\left( \\|f\\|_p + \\|g\\|_p \\right) \\left( \\int |f+g|^{(p-1)q} \\right)^{1/q}$$',
        '',
        '**③ 认出右边的积分。** 因为 $(p-1)q = p$，右边那个因子就是 $\\|f+g\\|_p^{\\,p/q}$。于是',
        '',
        '$$\\|f+g\\|_p^p \\le \\left( \\|f\\|_p + \\|g\\|_p \\right) \\|f+g\\|_p^{\\,p/q}$$',
        '',
        '**④ 约掉。** 若 $\\|f+g\\|_p = 0$ 结论平凡；否则两边除以 $\\|f+g\\|_p^{p/q}$，注意 $p - p/q = 1$，即得',
        '',
        '$$\\|f+g\\|_p \\le \\|f\\|_p + \\|g\\|_p$$',
        '',
        '$p = 1$ 时直接由逐点不等式 $|f+g| \\le |f| + |g|$ 积分得到。∎'
      ].join('\n'),
      note: '⭐ 注意「约掉」那一步：正是 $1/p + 1/q = 1$ 保证 $p - p/q = 1$，否则会留下一个顽固的指数。'
    },

    {
      id: 'imp.lp-banach',
      kind: 'implication',
      sources: ['thm.minkowski', 'thm.mct', 'thm.dct'],
      target: 'thm.lp-banach',
      title: '三角不等式 + MCT + DCT ⟹ $L^p$ 完备',
      proof: [
        '**① 换成级数。** 赋范线性空间完备 $\\iff$ 每个**绝对收敛**的级数都收敛（标准判据）。所以设 $\\{f_k\\} \\subseteq L^p$ 且',
        '',
        '$$B := \\sum_{k=1}^{\\infty} \\|f_k\\|_p < \\infty$$',
        '',
        '目标：证明 $\\sum_k f_k$ 在 $L^p$ 范数下收敛。',
        '',
        '**② 先做逐点收敛。** 令',
        '',
        '$$G_n := \\sum_{k \\le n} |f_k|, \\qquad G := \\sum_{k=1}^{\\infty} |f_k|$$',
        '',
        '由 **Minkowski**（三角不等式），$\\|G_n\\|_p \\le \\sum_{k \\le n} \\|f_k\\|_p \\le B$，即 $\\int G_n^p \\le B^p$。$G_n \\uparrow G$，由 **MCT**，',
        '',
        '$$\\int G^p = \\lim_n \\int G_n^p \\le B^p$$',
        '于是 $G \\in L^p$，特别地 $G < \\infty$ a.e.。这就说明 $\\sum_k f_k(x)$ 对 a.e. $x$ **绝对收敛**，记其和为 $F$。',
        '',
        '**③ 再做范数收敛。** 部分和 $s_n := \\sum_{k \\le n} f_k$ 满足 $s_n \\to F$ a.e.，且',
        '',
        '$$|F - s_n|^p \\le \\left( |F| + |s_n| \\right)^p \\le (2G)^p \\in L^1$$',
        '',
        '（因为 $|F| \\le G$、$|s_n| \\le G$。）由 **DCT**，',
        '',
        '$$\\left\\| F - s_n \\right\\|_p^p = \\int |F - s_n|^p \\to 0$$',
        '',
        '即 $s_n \\to F$ 于 $L^p$。故绝对收敛级数都收敛，$L^p$ 完备。∎',
        '',
        '$>$ ⭐ 这一段是「用逐点收敛的定理（MCT / DCT）去证范数收敛」的范例：控制函数 $G$ 就是关键桥梁。'
      ].join('\n')
    },

    {
      id: 'imp.bounded-gives-lq',
      kind: 'implication',
      sources: ['thm.holder', 'def.duality-map'],
      target: 'prop.bounded-functional-gives-lq',
      title: 'Hölder + 有界性 ⟹ $g \\in L^q$',
      proof: [
        '**Step 1：有限支可测的 $f$ 也满足 $|\\int fg| \\le M_g(g)$。**',
        '',
        '设 $f$ 有限支可测、$\\|f\\|_p = 1$。取**有限支简单函数列** $\\{f_n\\} \\to f$ a.e.，且 $|f_n| \\le |f|$、$|f_n| \\le \\|f\\|_\\infty \\chi_E$（$E$ 是 $f$ 的支集，有限测度）。由 **DCT**，',
        '',
        '$$\\left| \\int fg \\right| = \\lim_n \\left| \\int f_n g \\right| \\le M_g(g)$$',
        '',
        '**Step 2：$q < \\infty$。** 不妨设 $g \\ne 0$，且设 $\\{g \\ne 0\\}$ $\\sigma$有限（$\\mu$ 半有限时这一点自动成立）。',
        '',
        '先说明**必须**有 $\\mu(\\{|g| > \\varepsilon\\}) < \\infty$（对一切 $\\varepsilon > 0$）：否则设 $E_\\varepsilon = \\{|g| > \\varepsilon\\}$ 测度无穷，对任意 $C$ 取 $B \\subseteq E_\\varepsilon$ 使 $C < \\mu(B) < \\infty$，令',
        '',
        '$$f = \\mu(B)^{-1/q} \\chi_B \\operatorname{sgn} g, \\qquad \\|f\\|_p = 1$$',
        '',
        '则 $\\left| \\int fg \\right| = \\mu(B)^{-1/q} \\int_B |g| > \\varepsilon \\, \\mu(B)^{1/p} > \\varepsilon C^{1/p}$，令 $C \\to \\infty$ 就与 $M_g(g) < \\infty$ 矛盾。',
        '',
        '于是可取 $\\{E_n\\} \\uparrow \\{g \\ne 0\\}$，$\\mu(E_n) < \\infty$；再取简单 $\\varphi_n \\to g$、$|\\varphi_n| \\le |g|$，令 $g_n := \\varphi_n \\chi_{E_n}$，则 $g_n \\to g$、$|g_n| \\le |g|$、且 $g_n$ 在 $E_n^c$ 外为零。令',
        '',
        '$$f_n := \\frac{|g_n|^{q-1} \\operatorname{sgn} g_n}\\{\\|g_n\\|_q^{\\,q-1}\\}, \\qquad \\|f_n\\|_p = 1$$',
        '',
        '则 $f_n$ 有限支，由 Step 1 可用。于是',
        '',
        '$$\\|g\\|_q \\le \\lim_n \\|g_n\\|_q = \\lim_n \\int f_n g_n \\le \\lim_n \\int |f_n g| = \\lim_n \\int f_n g \\le M_g(g)$$',
        '',
        '（第一个不等号由 Fatou，第二个是 $f_n g_n = |g_n|^q$，中间那个等号用的仍是符号 $\\operatorname{sgn}$ 的消失。）故 $\\|g\\|_q \\le M_g(g) < \\infty$，$g \\in L^q$；反向不等式 $M_g(g) \\le \\|g\\|_q$ 由 Hölder。',
        '',
        '**Step 3：$q = \\infty$。** 对 $\\varepsilon > 0$ 令 $A = \\{|g(x)| \\ge M_\\infty(g) + \\varepsilon\\}$。若 $\\mu(A) > 0$，由半有限性或 $A \\subseteq \\{g \\ne 0\\}$ 的 $\\sigma$有限性取 $B \\subseteq A$、$0 < \\mu(B) < \\infty$，令 $f = \\mu(B)^{-1} \\chi_B \\operatorname{sgn} g$，则 $\\|f\\|_1 = 1$ 而 $\\int fg \\ge M_\\infty(g) + \\varepsilon$ —— 矛盾。故 $\\mu(A) = 0$，即 $\\|g\\|_\\infty \\le M_\\infty(g)$；反方向由 Hölder。∎'
      ].join('\n')
    },

    {
      id: 'imp.riesz-lp',
      kind: 'implication',
      sources: ['prop.bounded-functional-gives-lq', 'thm.lebesgue-radon-nikodym', 'prop.duality-isometry'],
      target: 'thm.riesz-representation-lp',
      title: '把泛函变成测度 ⟹ $(L^p)^* \\cong L^q$',
      proof: [
        '设 $1 < p < \\infty$、$\\Phi \\in (L^p)^*$。',
        '',
        '**Step 1：先设 $\\mu$ 有限。** 此时所有简单函数都在 $L^p$ 里。定义',
        '',
        '$$\\nu(E) := \\Phi(\\chi_E) \\qquad (E \\in \\mathcal{M})$$',
        '',
        '**① $\\nu$ 是复测度。** 设 $E = \\bigsqcup_j E_j$，则 $\\chi_E = \\sum_{j} \\chi_{E_j}$。而',
        '',
        '$$\\left\\| \\chi_E - \\sum_{j \\le n} \\chi_{E_j} \\right\\|_p = \\left\\| \\sum_{j > n} \\chi_{E_j} \\right\\|_p = \\mu\\left( \\bigsqcup_{j>n} E_j \\right)^{1/p} \\to 0$$',
        '',
        '由 $\\Phi$ 的连续性，$\\nu(E) = \\sum_j \\nu(E_j)$ —— 正是复测度的定义。',
        '',
        '**② $\\nu \\ll \\mu$。** 若 $\\mu(E) = 0$，则 $\\chi_E = 0$ 于 $L^p$，故 $\\nu(E) = 0$。',
        '',
        '**③ 用 Radon–Nikodym。** 存在 $g \\in L^1(\\mu)$ 使 $\\nu(E) = \\int_E g \\, d\\mu$，即',
        '',
        '$$\\Phi(\\chi_E) = \\int \\chi_E g \\, d\\mu$$',
        '对一切简单函数 $f$ 就有 $\\Phi(f) = \\int fg \\, d\\mu$（线性）。',
        '',
        '**④ 把 $g$ 提升到 $L^q$。** 由 $\\left| \\int fg \\right| = |\\Phi(f)| \\le \\|\\Phi\\| \\, \\|f\\|_p$，有界泛函那条命题给出 $g \\in L^q$ 且 $\\|g\\|_q \\le \\|\\Phi\\|$。再由稠密性（简单函数在 $L^p$ 稠密、$\\Phi$ 连续）得 $\\Phi(f) = \\int fg$ 对**一切** $f \\in L^p$ 成立。',
        '',
        '**Step 2：$\\mu$ $\\sigma$有限。** 取 $\\{E_n\\} \\uparrow$、$0 < \\mu(E_n) < \\infty$、$X = \\bigcup_n E_n$，并把 $L^p(E_n)$ 等同于「在 $E_n$ 外为零的 $L^p(X)$ 函数」。对每个 $n$ 用 Step 1 得 $g_n \\in L^q(E_n)$，且',
        '',
        '$$\\|g_n\\|_q \\le \\left\\| \\Phi|_{L^p(E_n)} \\right\\| \\le \\|\\Phi\\|$$',
        '唯一性（a.e.）给出 $g_n = g_m$ a.e. 于 $E_n$（$n < m$），所以它们拼成一个 a.e. 良定义的 $g$。由 **MCT**，$\\|g\\|_q = \\lim_n \\|g_n\\|_q \\le \\|\\Phi\\|$，故 $g \\in L^q$；而对 $f \\in L^p$，由 **DCT** $f\\chi_{E_n} \\to f$ 于 $L^p$，于是 $\\Phi(f) = \\lim_n \\Phi(f\\chi_{E_n}) = \\lim_n \\int_{E_n} fg = \\int fg$。',
        '',
        '**Step 3：$\\mu$ 任意（此时 $p > 1$，故 $q < \\infty$）。** 对每个 $\\sigma$有限集 $E \\subseteq X$，Step 2 给出 a.e. 唯一的 $g_E \\in L^q(E)$ 使 $\\Phi(f) = \\int f g_E$ 对一切 $f \\in L^p(E)$ 成立，且 $\\|g_E\\|_q \\le \\|\\Phi\\|$。若 $F \\supseteq E$ 也 $\\sigma$有限，则 $g_F = g_E$ a.e. 于 $E$，因而 $\\|g_F\\|_q \\ge \\|g_E\\|_q$。令',
        '',
        '$$M := \\sup \\{\\, \\|g_E\\|_q : E \\text{ 是 }\\sigma\\text{-有限集} \\,\\} \\le \\|\\Phi\\|$$',
        '',
        '取 $\\{E_n\\}$ 使 $\\|g_{E_n}\\|_q \\to M$，令 $F = \\bigcup_n E_n$（仍 $\\sigma$有限）。则 $\\|g_F\\|_q \\ge \\|g_{E_n}\\|_q$ 对一切 $n$ 成立，故 $\\|g_F\\|_q = M$。',
        '',
        '**$g_F$ 已经是我们要的那个 $g$**：设 $A \\supseteq F$ $\\sigma$有限，则',
        '',
        '$$\\int |g_F|^q + \\int |g_{A \\setminus F}|^q = \\int |g_A|^q \\le M^q = \\int |g_F|^q$$',
        '',
        '故 $g_{A \\setminus F} = 0$，即 $g_A = g_F$ a.e.。而对 $f \\in L^p$，集合 $A := F \\cup \\{f \\ne 0\\}$ 是 $\\sigma$有限的，于是 $\\Phi(f) = \\int f g_A = \\int f g_F$。取 $g = g_F$ 即可。∎'
      ].join('\n'),
      note: '⭐ Step 1 的核心思想：**把 $L^p$ 上的泛函限制在「特征函数」上，就得到一个测度**，再用 Radon–Nikodym 把测度变成函数。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.lp-holder',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'thm.holder',
      note: 'Hölder 不等式两边都是 L^p 范数。'
    },
    {
      id: 'def-link.conjugate-holder',
      kind: 'definition',
      definition: 'def.conjugate-exponents',
      usedBy: 'thm.holder',
      note: '陈述里那个 $1/p + 1/q = 1$ 就是共轭指数的定义。'
    },
    {
      id: 'def-link.lp-minkowski',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'thm.minkowski',
      note: 'Minkowski 就是 L^p 范数的三角不等式。'
    },
    {
      id: 'def-link.lp-banach',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'thm.lp-banach',
      note: '完备性是相对这个范数说的。'
    },
    {
      id: 'def-link.esssup-linf',
      kind: 'definition',
      definition: 'def.essential-sup',
      usedBy: 'thm.linf-properties',
      note: '整条定理都是在处理 $\\|\\cdot \\|_\\infty$。'
    },
    {
      id: 'def-link.duality-holder',
      kind: 'definition',
      definition: 'def.duality-map',
      usedBy: 'prop.duality-isometry',
      note: '命题算的就是 $\\varphi _g$ 的算子范数。'
    },
    {
      id: 'def-link.conjugate-duality',
      kind: 'definition',
      definition: 'def.conjugate-exponents',
      usedBy: 'prop.duality-isometry',
      note: '前提是 $p$、$q$ 共轭。'
    },
    {
      id: 'def-link.duality-bounded',
      kind: 'definition',
      definition: 'def.duality-map',
      usedBy: 'prop.bounded-functional-gives-lq',
      note: '这条命题说的正是「配对 $\\int fg$ 有界」把 $g$ 逼进 L^q。'
    },
    {
      id: 'def-link.conjugate-riesz',
      kind: 'definition',
      definition: 'def.conjugate-exponents',
      usedBy: 'thm.riesz-representation-lp',
      note: '结论那句话里「$q$ 是共轭指数」。'
    },
    {
      id: 'def-link.duality-riesz',
      kind: 'definition',
      definition: 'def.duality-map',
      usedBy: 'thm.riesz-representation-lp',
      note: '定理说 $g \\mapsto \\varphi _g$ 是等距同构。'
    },
    {
      id: 'def-link.lp-reflexive',
      kind: 'definition',
      definition: 'def.lp-norm',
      usedBy: 'cor.lp-reflexive',
      note: '自反性谈的是 L^p 与它的二次对偶。'
    }
  ]
});
