/* 补一条证明边：Goursat 三角形引理在 130 号包里只有定义边入，
   `_proofaudit` 因而把它算成「陈述了但没有证明」。这里把证明写成边。 */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({
  name: '证明：Goursat 三角形引理',
  nodes: [],
  edges: [
    {
      id: 'imp.goursat-triangle-proof',
      kind: 'implication',
      sources: ['def.holomorphic', 'def.contour-integral'],
      target: 'lem.goursat-triangle',
      title: '全纯 + 围道积分 $\\implies$ 三角形上的积分为零',
      proof: [
        '设 $T$ 是 $\\Omega$ 内的闭三角形，$\\eta=\\oint_{\\partial T} f\\,\\mathrm{d}z$。把 $T$ 的四条边中点连起来，分成四个全等的小三角形 $T_1,\\ldots,T_4$；沿内部边界的积分两两抵消，故',
        '',
        '$$\\eta=\\sum_{j=1}^{4}\\eta_j,\\qquad \\eta_j=\\oint_{\\partial T_j}f\\,\\mathrm{d}z.$$',
        '',
        '于是有某个 $j$ 使 $|\\eta_j|\\ge|\\eta|/4$。取 $T^{(1)}=T_j$，重复这一分法，得到嵌套的闭三角形 $T\\supset T^{(1)}\\supset T^{(2)}\\supset\\cdots$，满足',
        '',
        '$$|\\eta|\\le 4^{n}\\,|\\eta_n|,\\qquad \\eta_n=\\oint_{\\partial T^{(n)}}f\\,\\mathrm{d}z.$$',
        '',
        '它们的直径按 $2^{-n}$ 收缩，故交集是唯一一点 $z_0\\in T$。$f$ 在 $z_0$ 复可微：对任意 $\\varepsilon>0$，当 $|z-z_0|$ 足够小时',
        '',
        '$$f(z)=f(z_0)+f\'(z_0)(z-z_0)+\\rho(z),\\qquad |\\rho(z)|\\le\\varepsilon\\,|z-z_0|.$$',
        '',
        '线性函数 $f(z_0)+f\'(z_0)(z-z_0)$ 有原函数，沿闭曲线积分为零，因此',
        '',
        '$$\\eta_n=\\oint_{\\partial T^{(n)}}\\rho(z)\\,\\mathrm{d}z.$$',
        '',
        '在 $\\partial T^{(n)}$ 上 $|z-z_0|\\le \\operatorname{diam}T^{(n)}=2^{-n}\\operatorname{diam}T$，且周长 $\\le 2^{-n}\\operatorname{perim}T$，由 ML 估计',
        '',
        '$$|\\eta_n|\\le \\varepsilon\\cdot 2^{-n}\\operatorname{diam}T\\cdot 2^{-n}\\operatorname{perim}T.$$',
        '',
        '代回得 $|\\eta|\\le 4^{n}\\cdot\\varepsilon\\,4^{-n}\\operatorname{diam}T\\operatorname{perim}T=\\varepsilon\\operatorname{diam}T\\operatorname{perim}T$。$\\varepsilon$ 任意，故 $\\eta=0$。$\\blacksquare$'
      ].join('\n'),
      note: '二分法只用「$f$ 复可微」，不需要 $f\'$ 连续 —— 这正是 Goursat 对 Cauchy 的改进。'
    }
  ]
});
