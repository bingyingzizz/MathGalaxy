/* ==========================================================================
   内容包 · 伴随与反射（14 条）
   --------------------------------------------------------------------------
   第五团：伴随 → 单位余单位 → 保极限 → 伴随函子定理 → 反射子范畴 → Kan 延拓。

   依赖顺序：伴随是两个方向之间的最佳翻译；单位余单位把它拆成两个自然变换；
   保极限是与极限的连接；反射子范畴是「含入函子有左伴随」的特例；
   Kan 延拓是这一切的统一出口。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '伴随与反射',
  nodes: [

    /* ---------------------------------------------------------- 伴随 */
    {
      id: 'def.adjoint',
      cluster: 'cat.adjoint',
      type: 'definition',
      label: '伴随函子',
      title: '伴随函子（Adjoint Functors）',
      regions: ['category'],
      tags: ['范畴论', '伴随', 'Hom 集'],
      statement: [
        '设 $F : \\mathcal{C} \\to \\mathcal{D}$、$G : \\mathcal{D} \\to \\mathcal{C}$ 是一对函子。$(F, G)$ 叫一对**伴随函子**，如果存在自然同构',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X),\\ Y\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ G(Y)\\bigr) \\qquad (X \\in \\mathcal{C},\\ Y \\in \\mathcal{D})$$',
        '',
        '这时记 $F \\dashv G$：$F$ 叫 $G$ 的**左伴随**，$G$ 叫 $F$ 的**右伴随**。'
      ].join('\n'),
      notes: [
        '一句话：**两个方向之间的翻译互为最佳**。从左边绕（先 $F$ 再射出去）与从右边绕（先射出去再 $G$）得到的东西一样多 —— 而且是**自然**一样多。',
        '例：',
        '',
        [
          '- 遗忘函子 $\\mathbf{Top} \\to \\mathbf{Set}$ 有左右**两个**伴随：左伴随是**离散拓扑**（$\\operatorname{Hom}_{\\mathbf{Top}}(S_{d}, X) \\cong \\operatorname{Hom}_{\\mathbf{Set}}(S, F(X))$），右伴随是**平凡拓扑**（$\\operatorname{Hom}_{\\mathbf{Top}}(X, S_{t}) \\cong \\operatorname{Hom}_{\\mathbf{Set}}(F(X), S)$）。',
          '- 遗忘函子 $\\mathbf{Ab} \\to \\mathbf{Set}$ 的左伴随是**自由阿贝尔群**：$\\operatorname{Hom}_{\\mathbf{Ab}}(\\mathbb{Z}^{(X)}, M) \\cong \\operatorname{Hom}_{\\mathbf{Set}}(X, \\operatorname{forget} M)$。**自由是遗忘的左伴随**。',
        ].join('\n'),
        '',
        '两条运算规则：',
        '',
        [
          '- **对偶**：$F \\dashv G$ $\\iff$ $G^{\\mathrm{op}} \\dashv F^{\\mathrm{op}}$（在 $\\mathcal{C}^{\\mathrm{op}} \\to \\mathcal{D}^{\\mathrm{op}}$ 上）。',
          '- **复合**：$F \\dashv G$ 且 $F\' \\dashv G\'$ $\\implies$ $F\' \\circ F \\dashv G \\circ G\'$，因为',
        ].join('\n'),
        '',
        '  $$\\operatorname{Hom}(F\'F(X), Y) \\cong \\operatorname{Hom}(F(X), G\'(Y)) \\cong \\operatorname{Hom}(X, GG\'(Y))$$'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    /* ------------------------------------------------------ 单位余单位 */
    {
      id: 'def.adjunction-unit',
      cluster: 'cat.adjoint',
      type: 'definition',
      label: '单位与余单位',
      title: '单位与余单位（Unit and Counit）',
      regions: ['category'],
      tags: ['范畴论', '伴随', '三角等式'],
      statement: [
        '设 $F \\dashv G$，记那个自然同构为',
        '',
        '$$\\Phi_{X, Y} : \\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X), Y\\bigr) \\longrightarrow \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X, G(Y)\\bigr)$$',
        '',
        '把它在两个「恒等态射」上取值，得到两个自然变换：',
        '',
        '$$\\eta_{X} := \\Phi_{X, F(X)}(1_{F(X)}) : X \\to G F(X) \\qquad (\\textbf{单位})$$',
        '',
        '$$\\varepsilon_{Y} := \\Phi_{G(Y), Y}^{-1}(1_{G(Y)}) : F G(Y) \\to Y \\qquad (\\textbf{余单位})$$',
        '',
        '它们满足**三角等式**',
        '',
        '$$\\varepsilon_{F(X)} \\circ F(\\eta_{X}) = 1_{F(X)}, \\qquad G(\\varepsilon_{Y}) \\circ \\eta_{G(Y)} = 1_{G(Y)}$$',
        '',
        '反过来，给定 $\\eta : 1_{\\mathcal{C}} \\implies G \\circ F$ 与 $\\varepsilon : F \\circ G \\implies 1_{\\mathcal{D}}$ 满足这两条，就唯一决定了一对伴随。'
      ].join('\n'),
      notes: [
        '一句话：**单位是「把自己送进去」，余单位是「把别人接回来」**，三角等式保证两个方向互不打架。',
        '⚠️ **单位与余单位一般不一定是同构**，这是伴随与「范畴等价」最大的差别。它们同时同构时，才是等价。',
        '由 $\\Phi$ 反解两边的公式：$\\Phi_{X,Y}(f) = G(f) \\circ \\eta_{X}$，$\\Phi^{-1}_{X,Y}(g) = \\varepsilon_{Y} \\circ F(g)$。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    /* -------------------------------------------- 右伴随存在的判据 */
    {
      id: 'thm.right-adjoint-criterion',
      cluster: 'cat.adjoint',
      type: 'theorem',
      label: '右伴随存在的判据',
      title: '右伴随存在 $\\iff$ 可表示',
      regions: ['category'],
      tags: ['范畴论', '伴随', '可表示'],
      statement: [
        '函子 $F : \\mathcal{C} \\to \\mathcal{D}$ 有右伴随 $\\iff$ 对每个 $Y \\in \\mathcal{D}$，函子',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(-),\\ Y\\bigr) : \\mathcal{C}^{\\mathrm{op}} \\to \\mathbf{Set}$$',
        '',
        '都可表示。'
      ].join('\n'),
      notes: '这是「造右伴随」的通用机器：先对每个 $Y$ 求出表示对象 $G(Y)$，再验证这样拼出来的 $G$ 是函子。证明见边上的推导。',
      refs: ['Mac Lane, Categories for the Working Mathematician, V.6']
    },

    /* ------------------------------------------ 全忠实 ⟺ 单位同构 */
    {
      id: 'prop.adjoint-full-faithful',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '全忠实与单位',
      title: '全忠实 $\\iff$ 单位（余单位）是同构',
      regions: ['category'],
      tags: ['范畴论', '伴随', '全忠实'],
      statement: [
        '设 $F \\dashv G$，单位 $\\eta$、余单位 $\\varepsilon$。则 $F$ **全忠实** $\\iff$ $\\eta$ 是同构；$G$ **全忠实** $\\iff$ $\\varepsilon$ 是同构。'
      ].join('\n'),
      notes: [
        '所以「左伴随全忠实」这件事，只需要检查一个自然变换的每个分量可逆 —— 比逐对检查 Hom 集容易得多。',
        '这也是**反射**与**余反射**的分界线：反射说的是「含入函子有左伴随」，而含入函子总是全忠实的（满子范畴），所以反射的余单位一定是同构。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    /* ------------------------------------------------ 极限 ⟺ 有伴随 */
    {
      id: 'prop.limit-adjoint',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '极限即伴随',
      title: '极限 $\\iff$ 常图函子有伴随',
      regions: ['category'],
      tags: ['范畴论', '极限', '伴随'],
      statement: [
        '$\\mathcal{C}$ 中所有以 $I$ 为索引的极限存在 $\\iff$ 常图函子 $\\Delta : \\mathcal{C} \\to \\mathcal{C}^{I}$ 有**右伴随**，且该右伴随由',
        '',
        '$$D \\mapsto \\lim D$$',
        '',
        '给出。对偶地，所有以 $I$ 为索引的余极限存在 $\\iff$ $\\Delta$ 有左伴随，由 $D \\mapsto \\operatorname{colim} D$ 给出。'
      ].join('\n'),
      notes: [
        '证明就是极限的定义本身：',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}^{I}}(\\Delta X, D) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}(X, \\lim D)$$',
        '',
        '左边正是「锥」的集合，右边是「射入极限的态射」的集合。逐字对照伴随的定义，两边是同一句话。',
        '所以「这个范畴有没有极限」问的就是「$\\Delta$ 有没有伴」—— 后面凡是要造伴随，几乎都能化归成造某种极限。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, V.5']
    },

    /* ------------------------------------------------------ 保极限 */
    {
      id: 'thm.right-adjoint-preserves-limits',
      cluster: 'cat.adjoint',
      type: 'theorem',
      label: '右伴随保极限',
      title: '右伴随保持所有极限',
      regions: ['category'],
      tags: ['范畴论', '伴随', '极限'],
      statement: [
        '设 $F \\dashv G$。则 $G$ **保持所有（在 $\\mathcal{D}$ 中存在的）极限**：对每个图 $D : I \\to \\mathcal{D}$，',
        '',
        '$$G\\bigl(\\lim D\\bigr) \\;\\cong\\; \\lim\\, (G \\circ D)$$'
      ].join('\n'),
      notes: [
        '对偶地：**左伴随保持所有余极限**。',
        '这条是判断「某函子不可能是右伴随」最快的办法 —— 只要它不保某个极限（比如不保积），就直接出局。反过来，它也解释了为什么遗忘函子总能当右伴随：遗忘函子通常保极限（结构是逐点定义的）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    /* -------------------------------------------------------- SAFT */
    {
      id: 'thm.saft',
      cluster: 'cat.adjoint',
      type: 'theorem',
      label: '伴随函子定理',
      title: '伴随函子定理（SAFT）',
      regions: ['category'],
      tags: ['范畴论', '伴随', '完备'],
      statement: [
        '设 $\\mathcal{D}$ 是**小**且**完备**的范畴。则函子 $G : \\mathcal{D} \\to \\mathcal{C}$ 有左伴随 $\\iff$ $G$ 保持所有极限。',
        '',
        '左伴随由一个极限的构造给出：',
        '',
        '$$F(X) \\;=\\; \\varprojlim_{(Y,\\, f) \\in (X \\downarrow G)} Y$$'
      ].join('\n'),
      notes: [
        '**保极限是唯一的障碍**。这与「右伴随保极限」合起来就是一条完整的判据：保极限既是必要条件，在完备的小范畴上也是充分条件。',
        '构造的含义：把 $X$ 映射进 $G$ 的像的所有方式组成一个范畴 $X \\downarrow G$，在其中取极限 —— $F(X)$ 是 $\\mathcal{D}$ 中「最接近」$X$ 的对象。所有 $X \\to G(Y)$ 都能被整理成 $X \\to G(F(X)) \\to G(Y)$。',
        '证明见边上的推导。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, V.8']
    },

    /* ---------------------------------------------------- 逗号范畴 */
    {
      id: 'def.comma-category',
      cluster: 'cat.adjoint',
      type: 'definition',
      label: '逗号范畴',
      title: '逗号范畴（Comma Category）',
      regions: ['category'],
      tags: ['范畴论', '逗号范畴', '辅助范畴'],
      statement: [
        '设 $F : \\mathcal{A} \\to \\mathcal{C}$、$G : \\mathcal{B} \\to \\mathcal{C}$ 是两个**靶相同**的函子。**逗号范畴** $F \\downarrow G$ 以',
        '',
        '$$\\bigl\\{(A, B, f) : A \\in \\mathcal{A},\\ B \\in \\mathcal{B},\\ f : F(A) \\to G(B)\\bigr\\}$$',
        '',
        '为对象，从 $(A, B, f)$ 到 $(A\', B\', f\')$ 的态射是一对 $(a : A \\to A\',\\ b : B \\to B\')$，使方块交换：',
        '',
        '$$\\begin{array}{ccc} F(A) & \\xrightarrow{\\;f\\;} & G(B) \\\\[2pt] {\\scriptstyle F(a)}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle G(b)} \\\\[2pt] F(A\') & \\xrightarrow[\\;f\'\\;]{} & G(B\') \\end{array}$$',
        '',
        '**两个特例**：取 $\\mathcal{A} = \\mathbf{1}$（单对象范畴）时 $F$ 就是「选出 $\\mathcal{C}$ 的一个对象 $X$」，此时 $F \\downarrow G$ 记作 $X \\downarrow G$；取 $\\mathcal{B} = \\mathbf{1}$ 得 $F \\downarrow Y$。'
      ].join('\n'),
      notes: [
        '**读法**：$F \\downarrow G$ 把所有「从 $F$ 的世界伸一条箭头到 $G$ 的世界」的方式组织成一个范畴。**对象是箭头本身**（连同它们两端的来源），态射是让箭头之间能互相比较的那一对态射。',
        '**记号**：$F \\downarrow G$ 里的符号就是「逗号」，所以叫逗号范畴；有的书写 $(F \\downarrow G)$ 或 $(F/G)$。',
        '⭐ **为什么它到处出现**：泛性质常常是「某个逗号范畴里的**终/始对象**」。',
        '',
        [
          '- $X \\downarrow \\mathrm{id}_{\\mathcal{C}}$ 是**切片** $\\mathcal{C}/X$；',
          '- 预层的**元素范畴** $\\int F$ 就是 $\\mathbf{1} \\downarrow F$（把预层看成函子 $\\mathcal{C}^{\\mathrm{op}} \\to \\mathbf{Set}$）；',
          '- 伴随的**单位**定义成 $\\mathrm{id} \\downarrow G$（或 $F \\downarrow \\mathrm{id}$）里的始对象。'
        ].join('\n'),
        '判别一个东西是不是逗号范畴，就看它「对象是不是箭头、态射是不是交换方块」。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, II.6']
    },

    /* -------------------------------------------------- 反射子范畴 */
    {
      id: 'def.reflective-subcategory',
      cluster: 'cat.adjoint',
      type: 'definition',
      label: '反射子范畴',
      title: '反射子范畴（Reflective Subcategory）',
      regions: ['category'],
      tags: ['范畴论', '反射', '满子范畴'],
      statement: [
        '满子范畴 $\\mathcal{C}\' \\subseteq \\mathcal{C}$ 叫**反射的**，如果含入函子 $\\mathcal{C}\' \\hookrightarrow \\mathcal{C}$ 有左伴随；这个左伴随叫**反射**。对偶的说法是**余反射的**。',
        '',
        '函子 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 是反射 $\\iff$',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}\\bigl(F(X),\\ X\'\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ X\'\\bigr) \\qquad (X\' \\in \\mathcal{C}\')$$'
      ].join('\n'),
      notes: [
        '一句话：**反射子范畴是「所有对象都能最佳逼近到它里面」的满子范畴**。$F$ 把 $X$ 送去它里面最接近 $X$ 的那个对象。',
        '例：',
        '',
        [
          '- $\\mathbf{Ab}$ 是 $\\mathbf{Grp}$ 的反射子范畴：$F : \\mathbf{Grp} \\to \\mathbf{Ab}$，$G \\mapsto G/[G,G]$，且 $\\operatorname{Hom}_{\\mathbf{Ab}}(G/[G,G], G\') \\cong \\operatorname{Hom}_{\\mathbf{Grp}}(G, G\')$。',
          '- $\\mathbf{Grp}$ 同时是 $\\mathbf{Mon}$ 的反射子范畴与余反射子范畴：右伴随把幺半群送到它的**可逆元群** $M^{\\times}$。',
          '- $\\mathbf{CHaus}$ 是 $\\mathbf{Top}$ 的反射子范畴。',
          '- 离散空间范畴在 $\\mathbf{Top}$ 中是反射的，平凡拓扑空间范畴在 $\\mathbf{Top}$ 中是余反射的。',
        ].join('\n'),
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    /* ------------------------------------------- 反射子范畴里的极限 */
    {
      id: 'prop.reflective-limits',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '反射子范畴里的极限',
      title: '反射子范畴中的极限与余极限',
      regions: ['category'],
      tags: ['范畴论', '反射', '极限'],
      statement: [
        '设 $\\mathcal{C}\'$ 是 $\\mathcal{C}$ 的反射子范畴，反射记为 $F : \\mathcal{C} \\to \\mathcal{C}\'$。若 $\\mathcal{C}\'$ 中的图 $D\'$ 在 $\\mathcal{C}$ 中有极限（余极限），则它在 $\\mathcal{C}\'$ 中也有：',
        '',
        '- 余极限等于 $F\\bigl(\\operatorname{colim}_{\\mathcal{C}} D\'\\bigr)$；',
        '- 极限就等于 $\\operatorname{lim}_{\\mathcal{C}} D\'$ 本身（它自动落在 $\\mathcal{C}\'$ 里）。'
      ].join('\n'),
      notes: [
        ['**证明。** 设嵌入 $i : \\mathcal{C}\' \\hookrightarrow \\mathcal{C}$，反射 $F : \\mathcal{C}\\to\\mathcal{C}\'$，$F \\dashv i$（即 $i$ 是右伴随）。','- **余极限**：对任意 $C\' \\in \\mathcal{C}\'$，用伴随同构与 $\\mathcal{C}$ 中余极限的泛性','$$\\operatorname{Hom}_{\\mathcal{C}\'}\\bigl(F(\\operatorname{colim}_{\\mathcal{C}}D\'), C\'\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}\\bigl(\\operatorname{colim}_{\\mathcal{C}}D\', iC\'\\bigr) \\;\\cong\\; \\lim_{j}\\operatorname{Hom}_{\\mathcal{C}}\\bigl(D\'_{j}, iC\'\\bigr) \\;\\cong\\; \\lim_{j}\\operatorname{Hom}_{\\mathcal{C}\'}\\bigl(D\'_{j}, C\'\\bigr),$$','对 $C\'$ 自然 —— 这正是「$F(\\operatorname{colim}_{\\mathcal{C}}D\')$ 是 $D\'$ 在 $\\mathcal{C}\'$ 里的余极限」的泛性质 ✓。','- **极限**：同法','$$\\operatorname{Hom}_{\\mathcal{C}\'}\\bigl(C\', \\operatorname{lim}_{\\mathcal{C}}D\'\\bigr) \\;\\cong\\; \\operatorname{lim}_{j}\\operatorname{Hom}_{\\mathcal{C}}\\bigl(iC\', D\'_{j}\\bigr) \\;\\cong\\; \\operatorname{lim}_{j}\\operatorname{Hom}_{\\mathcal{C}\'}\\bigl(C\', D\'_{j}\\bigr)$$','（第二个同构用了 $i$ 全忠实），故 $\\lim_{\\mathcal{C}}D\'$ 已经落在 $\\mathcal{C}\'$ 里、且就是 $\\mathcal{C}\'$ 中的极限 ✓。','**结论：反射子范畴对极限封闭，余极限要过一遍反射。**∎'].join('\n'),
'也就是说，**反射子范畴对极限封闭**。这条让「先在大的范畴里算，再看能不能落回去」成为标准操作：余极限要回炉过一次反射，极限则不用。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    /* ---------------------------------------------------- Kan 延拓 */
    {
      id: 'def.kan-extension',
      cluster: 'cat.adjoint',
      type: 'definition',
      label: 'Kan 延拓',
      title: 'Kan 延拓（Kan Extension）',
      regions: ['category'],
      tags: ['范畴论', 'Kan 延拓', '伴随'],
      statement: [
        '设 $p : \\mathcal{C} \\to \\mathcal{C}\'$ 是小范畴之间的函子，$F : \\mathcal{C} \\to \\mathcal{D}$。$F$ 沿 $p$ 的**左 Kan 延拓**是一个函子 $p_{!}F : \\mathcal{C}\' \\to \\mathcal{D}$ 连同一个自然变换',
        '',
        '$$\\alpha : F \\implies p_{!}F \\circ p$$',
        '',
        '使得对任意 $G : \\mathcal{C}\' \\to \\mathcal{D}$ 与任意 $\\gamma : F \\implies G \\circ p$，存在**唯一**的 $\\widetilde{\\gamma} : p_{!}F \\implies G$ 使',
        '',
        '$$\\gamma = (\\widetilde{\\gamma} \\circ p) \\circ \\alpha$$',
        '',
        '等价地说：',
        '',
        '$$\\operatorname{Hom}(p_{!}F,\\ G) \\;\\cong\\; \\operatorname{Hom}(F,\\ G \\circ p)$$',
        '',
        '即 $p_{!}$ 是预复合函子 $p^{*} = (-) \\circ p$ 的**左伴随**。箭头反向得**右 Kan 延拓** $p_{*} \\dashv p^{*}$。'
      ].join('\n'),
      notes: [
        '回答的问题是：**能不能把 $F$ 延拓到 $\\mathcal{C}\'$ 上？** 左 Kan 延拓是 $F$ 的**最优左近似扩张** —— 它不要求 $F$ 真能延拓，只要求「在 $\\mathcal{C}$ 上与 $F$ 一致」的函子里，它最贴合。',
        '与伴随逐条对照：',
        '',
        '| 伴随 $L \\dashv R$ | $p_{!} \\dashv p^{*}$ |',
        '| --- | --- |',
        '| 单位 $\\eta_{A} : A \\to R L A$ | $\\alpha : F \\implies p^{*}(p_{!}F)$ |',
        '| $f : A \\to R B$ | $\\gamma : F \\implies p^{*}(G)$ |',
        '| $g : L A \\to B$ | $\\widetilde{\\gamma} : p_{!}F \\implies G$ |',
        '| $f = R(g) \\circ \\eta_{A}$ | $\\gamma = p^{*}(\\widetilde{\\gamma}) \\circ \\alpha$ |',
        '',
        '所以 Kan 延拓不是新东西，它只是把伴随的公式换了个方向用。'
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, X.3']
    },

    /* ------------------------------------------------ Kan 延拓的例子 */
    {
      id: 'ex.kan-extension',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: 'Kan 延拓的两个例子',
      title: '余极限与右伴随都是 Kan 延拓',
      regions: ['category'],
      tags: ['范畴论', 'Kan 延拓', '余极限'],
      statement: [
        '**(1)** 图 $D : I \\to \\mathcal{C}$ 有余极限 $X$ $\\iff$ 沿投影 $p : I \\to \\mathbf{1}$ 的左 Kan 延拓 $p_{!}D : \\mathbf{1} \\to \\mathcal{C}$ 存在，且取值为',
        '',
        '$$(p_{!}D)(\\ast) = \\varinjlim_{i \\in I} D(i) = X$$',
        '',
        '**(2)** 函子 $F : \\mathcal{C} \\to \\mathcal{D}$ 有右伴随 $G$ $\\iff$ 恒等函子 $1_{\\mathcal{C}}$ 沿 $F$ 的左 Kan 延拓存在，且此时',
        '',
        '$$G = F_{!}1_{\\mathcal{C}}, \\qquad \\operatorname{Hom}(F_{!}1_{\\mathcal{C}},\\ G) \\cong \\operatorname{Hom}(1_{\\mathcal{C}},\\ G \\circ F)$$',
        '',
        '右边那个对应的 $1_{\\mathcal{C}} \\implies G \\circ F$ 正是**单位** $\\eta$。'
      ].join('\n'),
      notes: '两条合起来看：**余极限和右伴随都是 Kan 延拓的特例**。Kan 延拓是这一整团的统一出口 —— 前面分散的定义（极限、伴随、反射）在其中都能各就各位。',
      refs: ['Mac Lane, Categories for the Working Mathematician, X.3']
    },

    /* ------------------------------------------------ 滤过余极限正合 */
    {
      id: 'prop.filtered-exact',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '滤过余极限正合',
      title: '滤过余极限正合（$\\mathbf{Set}$ 中）',
      regions: ['category'],
      tags: ['范畴论', '滤过余极限', '正合'],
      statement: [
        '在 $\\mathbf{Set}$ 中，**滤过余极限正合**：$I$ 是滤过范畴时，余极限函子',
        '',
        '$$\\varinjlim : \\mathbf{Set}^{I} \\longrightarrow \\mathbf{Set}$$',
        '',
        '保持所有有限极限。'
      ].join('\n'),
      notes: [
        ['**证明。** 滤过范畴就是「任意有限图都有余锥」的小范畴。','- **先看有限积**：给滤过图 $X_{i}, Y_{i}$，比较映射','$$\\varinjlim_{i}(X_{i}\\times Y_{i}) \\longrightarrow \\bigl(\\varinjlim_{i}X_{i}\\bigr)\\times\\bigl(\\varinjlim_{i}Y_{i}\\bigr)$$','**满**：取右边一对 $([x],[y])$，$x \\in X_{i}$、$y \\in Y_{j}$；由滤过性存在 $k$ 与 $i\\to k$、$j\\to k$，于是 $(x_{k}, y_{k})$ 的代表落到 $X_{k}\\times Y_{k}$ ✓。','**单**：若 $(x_{i},y_{i})$ 与 $(x\'_{i\'},y\'_{i\'})$ 在右边相等，则各坐标在某个更后的指标处相等；由滤过性取公共的 $k$，在 $X_{k}\\times Y_{k}$ 里它们已经相等 ✓。','- **一般有限极限**由有限积与等化子生成：等化子 $\\{(x,y) : f(x) = g(y)\\}$ 的两边取代表元后，滤过性同样给出公共指标使等式在那个指标处成立（$\\mathbf{Set}$ 里元素都是「某个指标处的元素」）✓。','- 于是 $\\varinjlim$ 与一切有限极限交换，即**正合** ✓。','⚠️ 这里的「正合」是集合层面的断言；一般范畴里「滤过余极限正合」需要更强的假设（AB5 型），不能照搬。∎'].join('\n'),
        '「正合」在这里就一句话：滤过余极限与有限极限**可以交换**。最基本的例子是它保持有限积：',
        '',
        '$$\\varinjlim_{i} (X_{i} \\times Y_{i}) \\;\\cong\\; \\bigl(\\varinjlim_{i} X_{i}\\bigr) \\times \\bigl(\\varinjlim_{i} Y_{i}\\bigr)$$',
        '',
        '做法是两边都取代表元再比对：$\\mathbf{Set}$ 里滤过余极限的元素恰好是某个指标处的元素，所以「一边一个代表元」可以上升到「同一个指标处的一对」。',
        '这条为什么重要：后面谈层的时候，层化是拿滤过余极限配出来的，而**只有滤过余极限不破坏有限极限**，这套构造才能与有限极限（也就是把拓扑信息编码进去的那个部分）相安无事。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    }
  ],

  edges: [
    /* ------------------------------------ 可表示 ⟹ 右伴随存在的判据 */
    {
      id: 'imp.adjoint-criterion',
      kind: 'implication',
      sources: ['def.adjoint', 'def.representable'],
      target: 'thm.right-adjoint-criterion',
      title: '伴随 $\\implies$ 右伴随存在的判据',
      proof: [
        '**（$\\Longrightarrow$）** 设 $F \\dashv G$。则对每个 $Y \\in \\mathcal{D}$，',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{D}}(F(-), Y) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}(-, G(Y))$$',
        '',
        '右边是可表示函子，所以左边可表示。∎',
        '',
        '**（$\\Longleftarrow$）** 设对每个 $Y$ 都能挑到一个 $G(Y) \\in \\mathcal{C}$ 与自然同构',
        '',
        '$$\\alpha_{Y} : \\operatorname{Hom}_{\\mathcal{D}}(F(-), Y) \\longrightarrow \\operatorname{Hom}_{\\mathcal{C}}(-, G(Y))$$',
        '',
        '只在对象层拼出 $G$ 还不够，还要在态射层给出 $G(g)$。给定 $g : Y \\to Z$，考虑复合',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}(-, G(Y)) \\xrightarrow{\\ \\alpha_{Y}^{-1}\\ } \\operatorname{Hom}_{\\mathcal{D}}(F(-), Y) \\xrightarrow{\\ g \\circ -\\ } \\operatorname{Hom}_{\\mathcal{D}}(F(-), Z) \\xrightarrow{\\ \\alpha_{Z}\\ } \\operatorname{Hom}_{\\mathcal{C}}(-, G(Z))$$',
        '',
        '这是一条从可表示函子 $\\operatorname{Hom}_{\\mathcal{C}}(-, G(Y))$ 到 $\\operatorname{Hom}_{\\mathcal{C}}(-, G(Z))$ 的自然变换。由米田引理，它由唯一的态射',
        '',
        '$$G(g) : G(Y) \\to G(Z)$$',
        '',
        '给出。于是 $G$ 在态射层也定义好了。',
        '',
        '**$G$ 是函子。** 把 $G$ 的定义在 $g = 1_{Y}$ 处取出来：由于 $\\alpha_{Y}^{-1}(1_{Y})$ 就是恒等截面，对应的态射是 $G(1_{Y}) = 1_{G(Y)}$。再取 $g \\circ h$，三段拼接与先拼后作用给出同一个自然变换，用米田引理的双射唯一性得 $G(g \\circ h) = G(g) \\circ G(h)$。',
        '',
        '**$\\alpha$ 是自然的。** $G$ 的定义本身就让下面的方块交换（左边取 $g \\circ -$，右边取 $- \\circ G(g)$）：',
        '',
        '$$\\begin{array}{ccc} \\operatorname{Hom}(F(-), Y) & \\xrightarrow{\\ \\alpha_{Y}\\ } & \\operatorname{Hom}(-, G(Y)) \\\\ \\downarrow\\scriptstyle{g \\circ -} & & \\downarrow\\scriptstyle{- \\circ G(g)} \\\\ \\operatorname{Hom}(F(-), Z) & \\xrightarrow{\\ \\alpha_{Z}\\ } & \\operatorname{Hom}(-, G(Z)) \\end{array}$$',
        '',
        '于是每个 $\\alpha_{Y}$ 都是自然同构，$F \\dashv G$。∎'
      ].join('\n'),
      note: '这条把「造右伴随」化归成「对每个 $Y$ 找一个表示对象」。米田引理在这里做了关键一步：**态射层的 $G(g)$ 是从自然变换里读出来的**，不用自己拼。'
    },

    /* --------------------------------------- 伴随 ⟹ 右伴随保极限 */
    {
      id: 'imp.right-adjoint-limits',
      kind: 'implication',
      sources: ['def.adjoint', 'def.limit'],
      target: 'thm.right-adjoint-preserves-limits',
      title: '伴随 $\\implies$ 右伴随保极限',
      proof: [
        '设 $F \\dashv G$，$D : I \\to \\mathcal{D}$ 有极限。对任意 $X \\in \\mathcal{C}$，把伴随的同构一路用下去：',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ G(\\lim D)\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X),\\ \\lim D\\bigr)$$',
        '',
        '再用 $\\lim D$ 的泛性质（锥与射入极限的态射一一对应）：',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X),\\ \\lim D\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{D}^{I}}\\bigl(\\Delta F(X),\\ D\\bigr) \\;\\cong\\; \\varprojlim_{i} \\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X),\\ D(i)\\bigr)$$',
        '',
        '把最后一个同构的每一项再用一次伴随：',
        '',
        '$$\\varprojlim_{i} \\operatorname{Hom}_{\\mathcal{D}}(F(X), D(i)) \\;\\cong\\; \\varprojlim_{i} \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ G D(i)\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ \\lim (G \\circ D)\\bigr)$$',
        '',
        '于是 $\\operatorname{Hom}_{\\mathcal{C}}(-, G(\\lim D))$ 与 $\\operatorname{Hom}_{\\mathcal{C}}(-, \\lim (G \\circ D))$ 是同一个函子的两个表示；由米田引理（表示对象在同构意义下唯一），',
        '',
        '$$G(\\lim D) \\;\\cong\\; \\lim (G \\circ D)$$',
        '',
        '∎。对偶地左伴随保余极限。'
      ].join('\n'),
      note: '整个证明只用了两样东西：**伴随的同构**与**极限的泛性质**。这就是为什么这条定理几乎不需要任何额外假设。'
    },

    /* ------------------------------------------------- 伴随函子定理 */
    {
      id: 'imp.saft',
      kind: 'implication',
      sources: ['def.limit', 'def.comma-category'],
      target: 'thm.saft',
      title: '保极限 $\\implies$ 有左伴随',
      proof: [
        '设 $\\mathcal{D}$ 小且完备，$G : \\mathcal{D} \\to \\mathcal{C}$ 保极限。要造 $F \\dashv G$。',
        '',
        '**构造。** 固定 $X \\in \\mathcal{C}$，考虑逗号范畴 $X \\downarrow G$（对象是 $f : X \\to G(Y)$）。它由 $\\mathcal{D}$ 的一个小图指标化，而 $\\mathcal{D}$ 完备，所以下面这个极限存在：',
        '',
        '$$F(X) := \\varprojlim_{(Y, f) \\in (X \\downarrow G)} Y$$',
        '',
        '**单位。** 投影给出 $\\pi_{(Y,f)} : F(X) \\to Y$。特别地取 $(Y,f) = (G(Y), \\cdot)$ 这一类里的项 —— 更直接地，把 $G$ 作用上去并用 $G$ 保极限：',
        '',
        '$$G(F(X)) = G\\Bigl(\\varprojlim_{(Y,f)} Y\\Bigr) \\cong \\varprojlim_{(Y,f)} G(Y)$$',
        '',
        '而 $X \\to G(Y)$ 这一族随 $(Y,f)$ 变动是相容的（这正是逗号范畴态射的定义），于是它们拼成一个锥，泛性给出',
        '',
        '$$\\eta_{X} : X \\longrightarrow G(F(X))$$',
        '',
        '**伴随同构。** 对任意 $Y_{0} \\in \\mathcal{D}$，定义',
        '',
        '$$\\varphi : \\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X), Y_{0}\\bigr) \\longrightarrow \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ G(Y_{0})\\bigr), \\qquad \\varphi \\mapsto G(\\varphi) \\circ \\eta_{X}$$',
        '',
        '**满（造逆）。** 给定 $f : X \\to G(Y_{0})$，则 $(Y_{0}, f)$ 是 $X \\downarrow G$ 的一个对象，于是有投影 $\\pi_{(Y_{0}, f)} : F(X) \\to Y_{0}$。由 $\\eta_{X}$ 的构造，$G(\\pi_{(Y_{0},f)}) \\circ \\eta_{X} = f$，所以 $\\varphi(\\pi_{(Y_{0},f)}) = f$。',
        '',
        '**单。** 设 $\\varphi(u) = \\varphi(v)$，其中 $u, v : F(X) \\to Y_{0}$。要证 $u = v$。',
        '',
        '由 $\\mathcal{D}$ 有小极限，取 $(Y_{0}, f)$ 处的投影 $\\pi = \\pi_{(Y_{0}, f)}$。由于 $F(X)$ 是那个极限，$u = v$ 当且仅当 $u \\circ \\pi = v \\circ \\pi$。而 $\\pi$ 是 $f$ 处的那一项，$u \\circ \\pi$ 与 $v \\circ \\pi$ 都是 $F(X) \\to Y_{0}$，且',
        '',
        '$$G(u \\circ \\pi) \\circ \\eta_{X} = G(u) \\circ G(\\pi) \\circ \\eta_{X} = G(u) \\circ f = G(u) \\circ \\varphi(v) \\circ \\eta_{X}$$',
        '',
        '用 $\\varphi$ 沿 $\\eta$ 的互逆性（并用 $G$ 保极限把极限拉回去）得到 $u \\circ \\pi = v \\circ \\pi$，于是 $u = v$。',
        '',
        '**自然性**由两边各自对 $Y_{0}$ 的自然性逐项核对，略。这样 $\\varphi$ 是自然同构，$F \\dashv G$。∎',
        '',
        '**（$\\Longrightarrow$）** 反方向就是「右伴随保极限」那条定理。∎'
      ].join('\n'),
      note: '这条定理是前半张图的分水岭：**从「保极限」这个可检验的条件，直接造出一个左伴随**。代价是要求 $\\mathcal{D}$ 小且完备（否则那个极限不一定存在）。'
    },

    /* ---------------------------------------- 单位余单位 ⟹ 全忠实 */
    {
      id: 'imp.adjoint-ff',
      kind: 'implication',
      sources: ['def.adjunction-unit', 'def.ff-faithful'],
      target: 'prop.adjoint-full-faithful',
      title: '单位同构 $\\implies$ 左伴随全忠实',
      proof: [
        '设 $F \\dashv G$。对 $X, Y \\in \\mathcal{C}$，串起伴随的同构：',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}(X, Y) \\xrightarrow{\\ F\\ } \\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X), F(Y)\\bigr) \\xrightarrow{\\ \\Phi_{X, F(Y)}\\ } \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X, G F(Y)\\bigr)$$',
        '',
        '第二个箭头是双射，且复合把 $f$ 送到 $G F(f) \\circ \\eta_{X}$（这是 $\\Phi$ 的显式公式）。所以第一个箭头（即 $F$ 在 Hom 集上的作用）是双射当且仅当',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}(X, Y) \\xrightarrow{\\ \\eta_{X} \\ \\circ\\, -\\ } \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X, G F(Y)\\bigr)$$',
        '',
        '是双射，当且仅当 $\\eta_{X}$ 是同构（取 $Y$ 使 $GF(Y)$ 覆盖所需的目标即可）。',
        '',
        '$X$ 任意，所以 $F$ 全忠实 $\\iff$ 每个 $\\eta_{X}$ 是同构，即 $\\eta$ 是自然同构。∎',
        '',
        '对偶地（把整个论证在 $\\mathcal{C}^{\\mathrm{op}} \\to \\mathcal{D}^{\\mathrm{op}}$ 上重做，或直接交换 $F, G$ 与 $\\eta, \\varepsilon$ 的角色）得到 $G$ 全忠实 $\\iff \\varepsilon$ 是同构。∎'
      ].join('\n'),
      note: '把「函子在 Hom 集上双双是双射」这件事，换成了「一个自然变换处处可逆」—— 后者的检查量小得多。'
    },

    /* ---------------------------------------- Kan 延拓统一余极限与伴随 */
    {
      id: 'imp.kan-unifies',
      kind: 'implication',
      sources: ['def.kan-extension', 'def.limit', 'def.adjoint'],
      target: 'ex.kan-extension',
      title: 'Kan 延拓 $\\implies$ 余极限与右伴随都是它的特例',
      proof: [
        '**(1)** 取 $p : I \\to \\mathbf{1}$ 为到终范畴的唯一函子。则预复合 $p^{*} : \\mathcal{C}^{\\mathbf{1}} \\to \\mathcal{C}^{I}$ 就是常图函子 $\\Delta$。于是',
        '',
        '$$\\operatorname{Hom}(p_{!}D,\\ G) \\;\\cong\\; \\operatorname{Hom}(D,\\ G \\circ p) \\;=\\; \\operatorname{Hom}_{\\mathcal{C}^{I}}\\bigl(D,\\ \\Delta G(\\ast)\\bigr)$$',
        '',
        '右边正是「$D$ 到常图 $G(\\ast)$ 的余锥」的集合。由余极限的泛性质（锥函子被 $\\operatorname{colim} D$ 表示），能表示这个函子的只有一个对象：',
        '',
        '$$(p_{!}D)(\\ast) \\;=\\; \\varinjlim_{i \\in I} D(i)$$',
        '',
        '所以 $p_{!}D$ 存在 $\\iff D$ 有余极限。∎',
        '',
        '**(2)** 取 $p = F : \\mathcal{C} \\to \\mathcal{D}$、$F$ 位置的函子取恒等函子 $1_{\\mathcal{C}}$。左 Kan 延拓的泛性质给出',
        '',
        '$$\\operatorname{Hom}(F_{!}1_{\\mathcal{C}},\\ G) \\;\\cong\\; \\operatorname{Hom}(1_{\\mathcal{C}},\\ G \\circ F)$$',
        '',
        '右边只有「$1_{\\mathcal{C}}$ 到 $G \\circ F$ 的全部自然变换」一个元素（取 $1_{\\mathcal{C}}$ 的像即得），所以左侧 $F_{!}1_{\\mathcal{C}}$ 到每个 $G$ 的态射也恰好只有一个 —— 这正是「$F_{!}1_{\\mathcal{C}}$ 是 $\\operatorname{Hom}(1_{\\mathcal{C}}, - \\circ F)$ 的表示对象」的说法，而那个表示对象就是左伴随。记 $G = F_{!}1_{\\mathcal{C}}$，同构两侧的形状恰好就是伴随的定义，对应的自然变换 $1_{\\mathcal{C}} \\implies G \\circ F$ 就是单位 $\\eta$。∎'
      ].join('\n'),
      note: '看完这两条，前面那些定义就串成一条线了：**极限与余极限是「沿到终范畴的函子」延拓，伴随是「沿函数子本身」延拓**。'
    }
  ]
});
