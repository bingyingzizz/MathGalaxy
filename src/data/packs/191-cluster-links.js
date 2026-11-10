/* ==========================================================================
   内容包 · 接线：clustercheck 报出来的「真依赖缺边」
   --------------------------------------------------------------------------
   用户要求补完后跑 `clustercheck`。跑完发现两类要处理：

   (a) 「提示（有链接但图上无边）」—— 正文里有反引号承诺（读者会点），但图里没边。
       这一类**必须**要么补边、要么把反引号降成中文词。
   (b) 「提到名字但无边」—— 名字出现过。手册说分三种：真依赖补边 / 同名不同物消歧 /
       顺带一提不管。本包只处理**真依赖**那部分；`det` `map` `sec` `flat` `tan`
       `group` `function` `subset` 这类是 aka 撞词的**误报**，不动。

   ⚠️ 层号不是约束：`layer` 由 longest path 算出来，加边后自动重算；
      只有**成环**才是真问题（构建的 Tarjan 缩点会把环压平而不报错，
      所以这里刻意只加「概念引用」方向明确、不可能成环的边）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '接线：曲面论与实示性类的缺边',

  nodes: [],

  edges: [
    /* ---------------- 曲面论（diffgeom.surface / intrinsic） ---------------- */
    { id: 'def-link.ds-egregium', kind: 'definition',
      definition: 'thm.theorema-egregium', usedBy: 'def.developable-surface',
      note: '「纸不能拉 $\\implies$ K 不变」这一步用绝妙定理（$K$ 是等距不变量）。' },
    { id: 'def-link.dif-cgc', kind: 'definition',
      definition: 'thm.constant-gauss-curvature', usedBy: 'thm.developable-iff-flat',
      note: '$K \\equiv 0 \\implies$ 局部等距于平面，这一步就是常曲率分类的 $K = 0$ 情形。' },
    { id: 'def-link.mc-ds', kind: 'definition',
      definition: 'def.developable-surface', usedBy: 'def.mean-curvature',
      note: '平均曲率那条注里比较「极小曲面（$H = 0$）」与「可展曲面（$K = 0$）」，平面是唯一交点。' },
    { id: 'def-link.cod-gauss', kind: 'definition',
      definition: 'thm.gauss-equation', usedBy: 'thm.codazzi-mainardi',
      note: 'Gauss 方程与 Codazzi–Mainardi 方程是曲面论基本方程的两半，必须并列引用。' },

    /* ---------------- 实示性类（diffgeom.manifold） ---------------- */
    { id: 'def-link.ec-k', kind: 'definition',
      definition: 'def.gauss-curvature', usedBy: 'def.euler-class',
      note: '曲面情形 $e(T\\Sigma)$ 就是 $K\\,\\mathrm{d}A$ 的上同调类（Gauss–Bonnet 的被积式）。' },
    { id: 'def-link.sw-cohclass', kind: 'definition',
      definition: 'def.cohomology-class', usedBy: 'def.stiefel-whitney-class',
      note: '$w_{i}$ 的取值就是上同调类，不是数。' },
    { id: 'def-link.sw-sg', kind: 'definition',
      definition: 'def.structure-group', usedBy: 'def.stiefel-whitney-class',
      note: '$w_{1} = 0$ 等价于结构群可约化到 $\\mathrm{SO}(k)$ —— 这是示性类作为约化障碍的入口。' },
    { id: 'def-link.w1-volume', kind: 'definition',
      definition: 'def.volume-form', usedBy: 'prop.orientable-iff-w1',
      note: '「可定向」的等价说法之一就是「存在处处非零的体积形式」。' },
    { id: 'def-link.pc-char', kind: 'definition',
      definition: 'def.characteristic-class', usedBy: 'def.pontryagin-class',
      note: 'Pontryagin 类是实丛的示性类，继承自然性与同构不变。' },
    { id: 'def-link.pc-orient', kind: 'definition',
      definition: 'def.orientable-manifold', usedBy: 'def.pontryagin-class',
      note: '注里用它举例（$\\mathbb{CP}^{2}$ 的符号差、可定向流形上的 $\\int p_{1}$）。' }
  ]
});
