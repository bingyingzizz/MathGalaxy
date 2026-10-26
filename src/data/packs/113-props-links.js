/* ==========================================================================
   内容包 · 接线：把「绝对值 / 幂 / 实数指数」接到真正用它们的结论上
   --------------------------------------------------------------------------
   背景：上一版全库 251 条推导边里，只有 1 条挂 `def.abs`、1 条挂 `thm.triangle`、
   1 条挂 `lem.archimedean`；初等微积分 73 条推导边中有 41 条证明里出现 |·|，
   却一条都没挂绝对值。这一包把「谁在用」补上（全部是 definition 型蓝线，
   面板里显示在「引用的定义」一栏）。

   ⛔ 只连**直接**用到的那一步，不连远房祖先。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '性质接线：绝对值与幂',
  nodes: [],

  edges: [

    /* ------------------------------------------------ 绝对值 → 极限语言 */
    {
      id: 'def-link.abs-seq-limit',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.sequence-limit',
      note: '收敛的定义就是 $|x_n - x| < \\varepsilon$ —— 没有绝对值，这句话写不出来。'
    },
    {
      id: 'def-link.abs-fn-limit',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.function-limit',
      note: '函数极限的 $\\varepsilon$-$\\delta$ 定义里，两个不等式都是绝对值的。'
    },
    {
      id: 'def-link.abs-continuous',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.continuous',
      note: '连续的定义把「接近」写成 $|x - x_0| < \\delta$ 与 $|f(x) - f(x_0)| < \\varepsilon$。'
    },
    {
      id: 'def-link.abs-cauchy-seq',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.cauchy-sequence',
      note: 'Cauchy 列要求任意两项的距离 $|x_m - x_n|$ 可控。'
    },
    {
      id: 'def-link.abs-uniform-conv',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.uniform-convergence',
      note: '一致收敛把 $\\sup_x |f_n(x) - f(x)| \\to 0$ 作为判据，绝对值是它的内核。'
    },
    {
      id: 'def-link.abs-uniform-cauchy',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.uniform-cauchy',
      note: '一致 Cauchy 列的条件 $|f_m(x) - f_n(x)| < \\varepsilon$ 对所有 $x$ 同时成立。'
    },
    {
      id: 'def-link.abs-squeeze',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'thm.squeeze',
      note: '夹逼定理的结论要写成 $|x_n - L| < \\varepsilon$，靠绝对值与序的转换。'
    },
    {
      id: 'def-link.abs-cauchy-criterion',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'thm.cauchy-criterion',
      note: 'Cauchy 准则两边都是 $\\varepsilon$-$N$ 语句，即绝对的差。'
    },
    {
      id: 'def-link.abs-bw',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'thm.bolzano-weierstrass',
      note: '子列收敛仍然是 $|x_{n_k} - x| < \\varepsilon$。'
    },
    {
      id: 'def-link.abs-limit-arithmetic',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'prop.limit-arithmetic',
      note: '四则运算的证明通篇在估计 $|f(x) - A|$、$|g(x) - B|$，还要用 $|xy| = |x||y|$（`prop.abs-properties`）。'
    },
    {
      id: 'def-link.abs-metric',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.metric-space',
      note: '距离空间的公理就是从 $d(x, y) = |x - y|$ 抽出来的：正定、对称、三角不等式逐条对应。'
    },

    /* ---------------------------------------------- 绝对值 → 积分与级数 */
    {
      id: 'def-link.abs-riemann',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.riemann-integrable',
      note: 'Riemann 可积的定义要求 $|S(f, P, \\xi) - I| < \\varepsilon$ 对一切分割与标记成立。'
    },
    {
      id: 'def-link.abs-integral-order',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'prop.integral-order',
      note: '积分估计的核心是 $\\left|\\int_a^b f\\right| \\le \\int_a^b |f|$，两边都是绝对值。'
    },
    {
      id: 'def-link.abs-absolute-conv',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'thm.absolute-implies-convergent',
      note: '绝对收敛就是 $\\sum |a_n| < \\infty$；证明用三角不等式把部分和夹住。'
    },
    {
      id: 'def-link.abs-lp-norm',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.lp-norm',
      note: '$\\|f\\|_p = \\left(\\int |f|^{p}\\right)^{1/p}$：绝对值取模，$p$ 次幂再开方。'
    },
    {
      id: 'def-link.abs-essential-sup',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.essential-sup',
      note: '本性上界是 $|f|$ 的本质上确界 —— 没有绝对值就没有「大小」。'
    },
    {
      id: 'def-link.abs-variation',
      kind: 'definition',
      definition: 'def.abs',
      usedBy: 'def.bounded-variation',
      note: '全变差是 $\\sup \\sum |F(x_{i+1}) - F(x_i)|$，逐段取绝对值。'
    },

    /* ------------------------------------------------------ 幂与实数指数 */
    {
      id: 'def-link.power-nat',
      kind: 'definition',
      definition: 'def.nat-arith',
      usedBy: 'def.power',
      note: '整数幂是对自然数的乘法做递推：$a^{n+1} = a^{n} \\cdot a$，那个 $\\cdot$ 就是 `def.nat-arith` 的乘法。'
    },
    {
      id: 'def-link.power-series-power',
      kind: 'definition',
      definition: 'def.power',
      usedBy: 'def.power-series',
      note: '幂级数 $\\sum a_n (x - x_0)^{n}$ 里的 $n$ 次幂就是 `def.power` 的整数幂。'
    },
    {
      id: 'def-link.power-root-test',
      kind: 'definition',
      definition: 'def.power',
      usedBy: 'thm.root-test',
      note: '根值判别法要比较 $a_n$ 与 $q^{n}$，用的是整数幂（$q$ 固定，$n$ 变）。'
    },
    {
      id: 'def-link.power-geometric',
      kind: 'definition',
      definition: 'def.power',
      usedBy: 'thm.geometric-series',
      note: '几何级数的通项 $q^{n}$ 就是整数幂；部分和公式也只用指数律。'
    },
    {
      id: 'def-link.realpower-young',
      kind: 'definition',
      definition: 'def.real-power',
      usedBy: 'lem.young-inequality',
      note: 'Young 不等式里的 $a^{\\lambda} b^{1-\\lambda}$ 中 $\\lambda \\in (0,1)$ 是**实数**指数 —— 没有 `def.real-power`，这个式子在图上就没有定义。'
    },
    {
      id: 'def-link.nthroot-complex',
      kind: 'definition',
      definition: 'thm.nth-root',
      usedBy: 'def.complex',
      note: '复数模 $|z| = \\sqrt{a^{2} + b^{2}}$ 用的是实数平方根；没有 n 次方根的存在性，这个定义是空的。'
    },
    {
      id: 'def-link.nthroot-induced-norm',
      kind: 'definition',
      definition: 'thm.nth-root',
      usedBy: 'def.induced-norm',
      note: '内积诱导的范数 $\\|v\\| = \\sqrt{\\langle v, v\\rangle}$ 同样要实数平方根。'
    },
    {
      id: 'def-link.nthroot-root-test',
      kind: 'definition',
      definition: 'thm.nth-root',
      usedBy: 'thm.root-test',
      note: '根值判别法里的 $\\sqrt[n]{a_n}$ 是 n 次方根；$n$ 逐项变化，所以需要一般 $n$ 的存在性。'
    },
    {
      id: 'def-link.nthroot-convergence-radius',
      kind: 'definition',
      definition: 'thm.nth-root',
      usedBy: 'thm.convergence-radius',
      note: '收敛半径的证明要把 $\\sqrt[n]{|a_n (x - x_0)^{n}|}$ 拆成 $|x - x_0| \\cdot \\sqrt[n]{|a_n|}$，靠 $\\sqrt[n]{uv} = \\sqrt[n]{u}\\sqrt[n]{v}$。'
    },
    {
      id: 'def-link.nthroot-p-series',
      kind: 'definition',
      definition: 'thm.nth-root',
      usedBy: 'thm.p-series',
      note: '凝聚判别法把 $1/n^{p}$ 换成 $2^{k(1-p)}$ 时，写的是 $2^{k} \\cdot 2^{-kp}$；指数与根号在这里是同一套约定。'
    }
  ]
});
