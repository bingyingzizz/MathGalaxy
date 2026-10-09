/* ==========================================================================
   内容包 · 补漏四则（4 条）
   --------------------------------------------------------------------------
   这一包收的都是「排查时抓出来的、确实该有却没有」的东西：

   · 极限的构造 —— 极限 = 无限积 + 等化子（笔记里就有，一直没进图）
   · 截面函子（一般版）—— 层在对象处取值；之前只有凝聚态的特例
   · 蛇引理 / 五引理 —— 正文里反复提到，却没有自己的节点
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '极限的构造与补漏引理',
  nodes: [

    /* --------------------------------------------------- 极限的构造 */
    {
      id: 'prop.limit-construction',
      cluster: 'cat.limit',
      type: 'proposition',
      label: '极限的构造',
      title: '极限 = 无限积 + 等化子',
      regions: ['category'],
      tags: ['范畴论', '极限', '构造', '积', '等化子'],
      statement: [
        '设 $D : I \\to \\mathcal{C}$ 是**小**图。若 $\\mathcal{C}$ 有 $I$ 中对象为指标的所有**积**、以及一对平行映射的**等化子**，则 $\\lim D$ 存在，并且可以具体地造出来：',
        '',
        '$$X\' := \\prod_{i \\in I} D(i), \\qquad X\'\' := \\prod_{\\alpha : i \\to j} D(j),$$',
        '',
        '$$X = \\lim D \\;\\cong\\; \\operatorname{eq}\\Bigl(\\; X\' \\xrightarrow[\\;p\\;]{\\;q\\;} X\'\' \\;\\Bigr),$$',
        '',
        '其中两条映射 $p, q : X\' \\to X\'\'$ 按分量定义为：$p$ 在 $\\alpha$-分量上取**投影** $X\' \\to D(j)$，$q$ 在 $\\alpha$-分量上取**投影再复合 $D(\\alpha)$**：',
        '',
        '$$p_{\\alpha} := \\mathrm{pr}_{j}, \\qquad q_{\\alpha} := D(\\alpha) \\circ \\mathrm{pr}_{i}.$$'
      ].join('\n'),
      notes: [
        '⭐ **这条把「极限存在」变成了一句具体的话**：只要 $\\mathcal{C}$ 有足够多的积与等化子，所有极限就都有了。教科书说「完备范畴 = 有小积且有小等化子的范畴」，依据就是它。',
        '**为什么是这样。** 一个锥 $\\{\\, g_{i} : Y \\to D(i) \\,\\}$ 等价于一条映射 $g : Y \\to X\'$（积的泛性质）；而「$g$ 是锥」这个条件（对每条 $\\alpha : i \\to j$ 有 $D(\\alpha) \\circ g_{i} = g_{j}$）恰好就是「$p \\circ g = q \\circ g$」。所以**锥 = 使 $p,q$ 相等的那族映射**，而「最一般的这种映射」正是等化子的定义。',
        '**对偶地**：余极限 = 无限余积 + 余等化子。',
        '⭐ **实用价值**：证明「某个范畴完备」时不用逐条图去造极限 —— 只要造出（小）积与等化子就够了（譬如 $\\mathbf{Set}$、$A\\text{-}\\mathbf{Mod}$、$\\mathrm{Cond}$ 都是这么验的）。'
      ].join('\n\n')
    },

    /* ------------------------------------------------ 截面函子（一般版） */
    {
      id: 'def.section-functor',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '截面函子',
      title: '截面函子与全局截面（Sections Functor）',
      regions: ['category'],
      tags: ['范畴论', '层', '截面', '全局截面', '函数空间'],
      statement: [
        '设 $\\mathcal{C}$ 是 site，$X \\in \\mathcal{C}$，$\\widetilde{\\mathcal{C}}$ 是层范畴。**在 $X$ 处的截面函子**是',
        '',
        '$$\\Gamma(X, -) : \\widetilde{\\mathcal{C}} \\longrightarrow \\mathbf{Set}, \\qquad F \\longmapsto \\Gamma(X, F) := F(X).$$',
        '',
        '取 $X = \\mathbf{1}$（终对象）时叫**全局截面函子**，记 $\\Gamma(F) := F(\\mathbf{1})$。'
      ].join('\n'),
      notes: [
        '**它就是 $h_{X}$ 的 Hom 函子**：$\\Gamma(X, F) = \\operatorname{Hom}_{\\widetilde{\\mathcal{C}}}(h_{X}, F) = F(X)$（米田引理）—— 所以截面函子不是新东西，它就是「用可表示预层去测 $F$」。',
        '⭐ **保什么、不保什么**：',
        '',
        [
          '- **保所有极限**：层范畴里的极限是在预层范畴里逐点算的，而逐点算的极限在 $X$ 处当然还是那个极限。',
          '- **一般不保余极限**：余极限要先在预层里算、再**层化**，而层化之后在 $X$ 处取的值可能严格大于余极限。**这就是「截面函子不正合」的全部内容。**',
        ].join('\n'),
        '',
        '**什么时候保余极限**：当 $X$ 在层范畴里**投射**时（$\\operatorname{Hom}(h_{X}, -) = \\Gamma(X,-)$ 保满态射），它保余极限。',
        '⭐ **凝聚态那一侧的例子**：$F \\in \\mathbf{FCHaus}$ 时 $\\mathbb{Z}\\cdot F$ 是投射的，于是 $\\Gamma(F, -)$ 保所有极限**与**所有余极限 —— 那条命题是这里的一个特例。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------------ 蛇引理 */
    {
      id: 'thm.snake-lemma',
      cluster: 'hom.ab',
      type: 'lemma',
      label: '蛇引理',
      title: '蛇引理（Snake Lemma）',
      regions: ['homology'],
      tags: ['同调代数', '蛇引理', '追图', '正合列', '连接同态'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，下面这张交换图的两行都正合：',
        '',
        '$$\\begin{array}{ccccccc} A & \\xrightarrow{\\;f\\;} & B & \\xrightarrow{\\;g\\;} & C & \\longrightarrow & 0 \\\\[2pt] {\\scriptstyle a}\\big\\downarrow & & {\\scriptstyle b}\\big\\downarrow & & {\\scriptstyle c}\\big\\downarrow & & \\\\[2pt] 0 & \\longrightarrow & A\' & \\xrightarrow[\\;f\'\\;]{} & B\' & \\xrightarrow[\\;g\'\\;]{} & C\' \\end{array}$$',
        '',
        '则存在**连接同态** $\\delta : \\ker c \\to \\operatorname{coker} a$，使序列',
        '',
        '$$\\ker a \\to \\ker b \\to \\ker c \\xrightarrow{\\;\\delta\\;} \\operatorname{coker} a \\to \\operatorname{coker} b \\to \\operatorname{coker} c$$',
        '',
        '正合。'
      ].join('\n'),
      notes: [
        '**为什么叫「蛇」**：把这条长正合列画成一圈，六个群/模串起来正好是一条蛇的形状 —— $\\delta$ 是蛇头那一拐。',
        '**$\\delta$ 怎么造**（追图）：取 $x \\in \\ker c \\subseteq C$。由 $g$ 满，取 $y \\in B$ 使 $g(y) = x$；由交换性 $g\'(b(y)) = c(g(y)) = c(x) = 0$，所以 $b(y) \\in \\ker g\' = \\operatorname{im} f\'$，取 $z \\in A\'$ 使 $f\'(z) = b(y)$；令',
        '',
        '$$\\delta(x) := z \\pmod{\\operatorname{im} a}.$$',
        '',
        '要验证的只有一件事：**换了 $y$ 的选择，$z$ 只差一个 $a$ 的像** —— 而那正好由第一行的正合性与图的交换性给出。所以 $\\delta$ 良定义，且 $\\delta$ 的像落在 $\\operatorname{coker} a$ 里。∎',
        '⭐ **用处**：它是**长正合列**的引擎 —— 把短正合列 $0 \\to K \\to L \\to M \\to 0$ 的每一层（核、余核）串起来，靠的就是每层的 $\\delta$。凡是「有了短正合列想推长正合列」的地方，底下都在跑蛇引理。',
        '⚠️ 在**一般**阿贝尔范畴里追元素：可以先用 Freyd–Mitchell 把 $\\mathcal{A}$ 全忠实地嵌进模范畴，在那边追完再把结论搬回来。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------------ 五引理 */
    {
      id: 'thm.five-lemma',
      cluster: 'hom.ab',
      type: 'lemma',
      label: '五引理',
      title: '五引理（Five Lemma）',
      regions: ['homology'],
      tags: ['同调代数', '五引理', '追图', '正合列', '同构'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，下面这张交换图的两行都正合：',
        '',
        '$$\\begin{array}{ccccccccc} A_{1} & \\to & A_{2} & \\to & A_{3} & \\to & A_{4} & \\to & A_{5} \\\\[2pt] {\\scriptstyle \\alpha_{1}}\\big\\downarrow & & {\\scriptstyle \\alpha_{2}}\\big\\downarrow & & {\\scriptstyle \\alpha_{3}}\\big\\downarrow & & {\\scriptstyle \\alpha_{4}}\\big\\downarrow & & {\\scriptstyle \\alpha_{5}}\\big\\downarrow \\\\[2pt] B_{1} & \\to & B_{2} & \\to & B_{3} & \\to & B_{4} & \\to & B_{5} \\end{array}$$',
        '',
        '若 $\\alpha_{1}$ 是**满**态射、$\\alpha_{2}, \\alpha_{4}$ 是**同构**、$\\alpha_{5}$ 是**单**态射，则中间的 $\\alpha_{3}$ 也是**同构**。'
      ].join('\n'),
      notes: [
        '**证明就是追图**（「五引理追图」是这句成语的出处）。分两半：',
        '',
        [
          '- **$\\alpha_{3}$ 单**：设 $x \\in A_{3}$ 被 $\\alpha_{3}$ 送到 $0$。往右上走一步（用第二行的正合性）可把 $\\alpha_{3}(x)$ 拉回成 $\\alpha_{4}$ 某个元素的原像，用 $\\alpha_{4}$ 是单射把 $x$ 拉回 $A_{2}$，再用第一行的正合性与 $\\alpha_{2}$ 的单射把 $x$ 挤成 $0$。',
          '- **$\\alpha_{3}$ 满**：给定 $y \\in B_{3}$，用 $\\alpha_{4}$ 是满射往右下走一步，再用第一行第二行的正合性与交换性把 $y$ 拉回成某个 $A_{3}$ 元素的像 —— 这一步用到 $\\alpha_{1}$ 满。',
        ].join('\n'),
        '',
        '两个方向都只用「正合 = 核 = 像」这一条。∎',
        '⭐ **推论（常用形式）**：若图中的 $A_{1} = B_{1} = 0$、$A_{5} = B_{5} = 0$，则 $\\alpha_{3}$ 是单（满 / 同构）由 $\\alpha_{2}, \\alpha_{4}$ 单（满 / 同构）决定 —— **这就是「比较长正合列」时最常引的那句：两头一样，中间就一样。**',
        '⚠️ 与蛇引理的关系：两者都是追图，但**五引理只讲同构传递**（不需要造连接同态），蛇引理**造**出 $\\delta$。凡是「想比较两个谱序列/两条长正合列」的地方，用五引理。'
      ].join('\n\n')
    }
  ],

  edges: []
});
