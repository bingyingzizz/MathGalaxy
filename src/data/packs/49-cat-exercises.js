/* ==========================================================================
   内容包 · 第 1 章的习题结论（14 条）
   --------------------------------------------------------------------------
   ⚠️ 把一大堆**必要的结论**放在 Exercise 里（「Define …」「Show that …」），
   它们和 Proposition 一样是内容，不该漏。这一包收第 1 章里最有用的那些。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '第 1 章的习题结论',
  nodes: [

    {
      id: 'ex.algebra-categories',
      cluster: 'algebra.structures',
      type: 'example',
      label: '代数的几个范畴',
      title: '$\\mathrm{Mon}$、$\\mathrm{Gr}$、$\\mathrm{Rng}$、$G\\text{-}\\mathbf{Set}$、$A\\text{-}\\mathbf{Mod}$、$k\\text{-}\\mathbf{Alg}$',
      regions: ['algebra', 'category'],
      tags: ['代数', '范畴', '幺半群', '环', '模', '代数'],
      statement: [
        '常用的代数范畴（对象 + 保结构映射）：',
        '',
        [
          '- $\\mathrm{Mon}$：幺半群；',
          '- $\\mathrm{Gr}$（也写 $\\mathbf{Grp}$）：群；',
          '- $\\mathrm{Rng}$：环；',
          '- $G\\text{-}\\mathbf{Set}$：$G$-集（带 $G$ 作用的集合）；',
          '- $A\\text{-}\\mathbf{Mod}$：$A$-模；',
          '- $k\\text{-}\\mathbf{Alg}$：$k$-代数（$k$ 交换环）。'
        ].join('\n')
      ].join('\n'),
      notes: '⭐ **它们的共同点**：全都是「集合 + 运算 + 公理」，只是运算的元数与公理的条数不同。所以**关于它们的定理几乎逐字通用**（极限逐点算、遗忘函子保所有极限、自由对象是左伴随……）。\n\n**两个特殊的**：$G\\text{-}\\mathbf{Set}$ 是**函子范畴**（$G$ 看成单对象范畴，$G$-集就是 $G \\to \\mathbf{Set}$ 的函子，$G$-映射就是自然变换）；$A\\text{-}\\mathbf{Mod}$ 是同调代数的样板间。',
      refs: ['Lang, Algebra']
    },

    {
      id: 'prop.abelianization',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '交换化',
      title: '交换化 $G \\mapsto G^{\\mathrm{ab}}$ 是左伴随',
      regions: ['algebra'],
      tags: ['代数', '群', '交换化', '伴随'],
      statement: [
        '**交换化**函子',
        '',
        '$$(-)^{\\mathrm{ab}} : \\mathbf{Grp} \\longrightarrow \\mathbf{Ab}, \\qquad G \\longmapsto G^{\\mathrm{ab}} := G / [G, G]$$',
        '',
        '是含入函子 $\\mathbf{Ab} \\hookrightarrow \\mathbf{Grp}$ 的**左伴随**。'
      ].join('\n'),
      notes: [
        '记号 $[G, G]$ 是**换位子子群**（由所有 $g h g^{-1} h^{-1}$ 生成）—— 它是正规子群，商掉它正好把「非交换性」清零。',
        '⭐ **伴随的读法**：任何群同态 $G \\to A$（$A$ 阿贝尔）都唯一地穿过 $G \\to G^{\\mathrm{ab}}$。也就是说**「从 $G$ 到阿贝尔群」的映射全都只看 $G^{\\mathrm{ab}}$** —— 这就是「交换化是最经济的把群变阿贝尔的办法」。',
        '**例子**：自由群 $F(S)^{\\mathrm{ab}} \\cong \\mathbb{Z}^{\\oplus S}$（自由阿贝尔群）。所以「自由阿贝尔群函子」= 「自由群函子」再交换化。',
        ['**证明。** 要造自然双射',
          '$$\\operatorname{Hom}_{\\mathbf{Grp}}(G,\\ A) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Ab}}\\bigl(G^{\\mathrm{ab}},\\ A\\bigr),\\qquad A\\ \\text{阿贝尔}.$$',
          '- **良定义**：任给群同态 $\\varphi : G\\to A$（$A$ 阿贝尔）。换位子 $ghg^{-1}h^{-1}$ 被送到 $\\varphi(g)\\varphi(h)\\varphi(g)^{-1}\\varphi(h)^{-1} = e$（交换性！），故 $[G,G] \\subseteq \\ker\\varphi$，于是 $\\varphi$ 唯一地穿过商 $G\\twoheadrightarrow G^{\\mathrm{ab}}$ ✓。',
          '- **反向**是 $G\\to G^{\\mathrm{ab}}$ 与函数的复合 ✓，且两个方向互逆（在 $G^{\\mathrm{ab}}$ 上验一次、在 $\\operatorname{Hom}(G,A)$ 上验一次）✓。',
          '- **自然性**对 $G$ 与 $A$ 都逐项验证（$G\\to G\'$ 的像把 $[G,G]$ 送进 $[G\',G\']$，故诱导 $G^{\\mathrm{ab}}\\to G\'^{\\mathrm{ab}}$）✓。∎',
          '⭐ 这正是「交换化是左伴随」的含义：它是「把非交换性清零」的**最经济**的函子 —— 任何到阿贝尔群的映射都只能看到 $G^{\\mathrm{ab}}$。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 1.9'],
    },

    {
      id: 'prop.poset-limit-join',
      cluster: 'cat.limit',
      type: 'proposition',
      label: '偏序集里的极限是交',
      title: '偏序集里：极限 = 下确界，余极限 = 上确界',
      regions: ['category', 'order-theory'],
      tags: ['范畴论', '极限', '偏序集', '上确界', '下确界'],
      statement: [
        '把偏序集 $(P, \\preceq)$ 看作范畴（对象是元素，$x \\to y \\iff x \\preceq y$）。则对任何图 $D : I \\to P$：',
        '',
        '$$\\lim D = \\inf D \\;(\\text{下确界}), \\qquad \\varinjlim D = \\sup D \\;(\\text{上确界}),$$',
        '',
        '只要它们存在。'
      ].join('\n'),
      notes: [
        ['**证明。** 把偏序集看成范畴时，$\\operatorname{Hom}(x,y)$ 至多一个元素，「锥」$c \\to D$ 就退化成「$c \\preceq D(i)$ 对一切 $i$」，即 $c$ 是 $D$ 的一个**下界** ✓。','- 泛锥 = 下界中**最大**的那一个 = $\\inf D$；「$\\lim D$ 存在」正好就是「$\\inf D$ 存在」✓。','- 对偶地（把 $\\preceq$ 反向），余锥 = 上界，泛余锥 = 最小上界 = $\\sup D$ ✓。','- 特例：单点图 $\\inf = \\sup = $ 该元素；空图给出终对象（最大元）与始对象（最小元）；两元素图给出积 $\\inf\\{x,y\\}$ 与余积 $\\sup\\{x,y\\}$；拉回、推出分别是下确界、上确界（因为相容条件自动满足）；而等化子：$f, g$ 若平行则 $f = g$（Hom 至多一个元素），此时等化子就是恒等 ✓。','因此完备格 $=$ 有所有小极限的偏序集；有界格 $\\leftrightarrow$ 有有限极限与有限余极限 ✓。∎'].join('\n'),
        '⭐ **这条把整套范畴语言翻译成序语言**，也是最好的入门例子：',
        '',
        [
          '- **积** = 下确界 $\\inf\\{x, y\\}$；**余积** = 上确界 $\\sup\\{x, y\\}$；',
          '- **终对象** = 最大元；**始对象** = 最小元；',
          '- **拉回**（纤维积）= 两个元素的下确界；**推出** = 上确界；',
          '- **等化子**：因为 Hom 至多一个元素，平行的 $f, g$ 只有「相等」或「不平行」两种，所以等化子平凡。'
        ].join('\n'),
        '**由此立刻得到**：完备格 = 有所有小极限与小余极限的偏序集；$\\mathbb{Q}$ 作为偏序集**不**完备（$\\{q : q^{2} < 2\\}$ 没有上确界）—— 这与实数完备性那条是同一件事的两种说法。',
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 1.30'],
    },

    {
      id: 'def.strict-morphism',
      cluster: 'cat.structure',
      type: 'definition',
      label: '严格态射',
      title: '严格态射（Strict Morphism）',
      regions: ['category'],
      tags: ['范畴论', '严格', '余像', '像'],
      statement: [
        '态射 $f : X \\to Y$ 叫**严格的**（strict），如果它在**余像**上的分解 $X \\twoheadrightarrow \\operatorname{coim} f \\to \\operatorname{im} f \\hookrightarrow Y$ 中间那一步是**同构** —— 即「余像与像之间的自然映射」可逆。'
      ].join('\n'),
      notes: [
        '⭐ **「严格」是阿贝尔范畴与一般范畴的分水岭**：阿贝尔范畴的**每条态射都严格**；而 $\\mathbf{Top}$ 里不严格。',
        '**反例为什么在拓扑里出现**：$\\mathbb{R}^{\\mathrm{disc}} \\to \\mathbb{R}$ 是单态射（同构于自己的像），但它的**余像**平凡（因为像在余核里被商掉了），于是余像 $\\to$ 像那一步不是同构。**这正是一条 $\\mathbf{Top}$ 上「拓扑阿贝尔群不是阿贝尔范畴」的原因。**',
        '**在 $\\mathbf{Set}$ 与 $\\mathbf{Ab}$ 里每条态射都严格**：那边余像与像都能具体算成分解，中间那个映射就是恒等。',
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 1.33'],
    },

    {
      id: 'prop.preserves-products-kernels',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '保积与核 ⟹ 保所有有限极限',
      title: '保积 + 保核 $\\implies$ 保所有有限极限',
      regions: ['category'],
      tags: ['范畴论', '保极限', '积', '核', '左正合'],
      statement: '函子 $F$ 若保**所有有限积**与**所有核**（等化子），则 $F$ 保**所有有限极限**（即 $F$ 左正合）。',
    notes:         ['**证明。** 记 $F : \\mathcal{C}\\to\\mathcal{D}$ 保有限积与核（等化子）。','- **有限极限的标准构造**：对有限图 $D : I\\to\\mathcal{C}$，令 $P := \\prod_{i\\in I}D(i)$，并考虑两条态射','$$P \\;\\underset{\\;q\\;}{\\overset{\\;p\\;}{\\rightrightarrows}}\\; \\prod_{u : i\\to j}D(j), \\qquad p := \\bigl(\\pi_{j}\\bigr)_{u},\\quad q := \\bigl(D(u)\\circ\\pi_{i}\\bigr)_{u},$$','即「第 $u$ 个坐标分别取 $D(u)$ 之后的投影与直接投影」。则','$$\\lim D \\;\\cong\\; \\operatorname{eq}(p, q),$$','（元素层面：$\\operatorname{eq}(p,q)$ 恰是一族相容的 $D(i)$ 元素，即 $D$ 的锥；泛性由积的泛性给出）✓。','- **$F$ 保两步**：$F(P) \\cong \\prod_{i}FD(i)$（保有限积）✓；$F(\\operatorname{eq}(p,q)) \\cong \\operatorname{eq}(Fp, Fq)$（保核）✓。','- **合起来**：把上面的构造用于 $FD$ 得到的等化子正是 $\\operatorname{eq}(Fp,Fq) \\cong F(\\operatorname{eq}(p,q))$，而它又是 $\\lim FD$ ✓。故 $F$ 保一切有限极限，即**左正合** ✓。∎','⚠️ 只保「积」不够：还要保核（等化子），否则上面第二条会断。'].join('\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.2']
    },

    {
      id: 'prop.preserves-fibered-products-mono',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '保纤维积 ⟹ 保单态射',
      title: '保拉回 $\\implies$ 保单态射',
      regions: ['category'],
      tags: ['范畴论', '纤维积', '拉回', '单态射', '保'],
      statement: '函子 $F$ 若保**纤维积**（拉回），则 $F$ 保**单态射**；对偶地，若保**纤维余积**（推出），则保**满态射**。',
      notes: [
        '**为什么**：$f : Y \\to X$ 是单态射，等价于说「$Y \\to X$ 上 $\\mathrm{id}$ 与 $\\mathrm{id}$ 的两个拉回重合」，即方块',
        '',
        '$$\\begin{array}{ccc} Y & \\xrightarrow{\\;\\mathrm{id}\\;} & Y \\\\[2pt] {\\scriptstyle \\mathrm{id}}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle f} \\\\[2pt] Y & \\xrightarrow[\\;f\\;]{} & X \\end{array}$$',
        '',
        '是拉回方块。保拉回就把这个重合保下来了，于是 $F(f)$ 仍是单态射。∎',
      ].join('\n'),
      refs: ['Le Stum, Exercise 1.46'],
    },

    {
      id: 'prop.projective-coproduct',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '投射对象的余积投射',
      title: '投射对象的余积还是投射的',
      regions: ['homology'],
      tags: ['同调代数', '投射对象', '余积', '对偶'],
      statement: '投射对象的**余积**还是投射的；对偶地，内射对象的**积**还是内射的。',
      notes: [
        ['**证明。** 设 $P_{i}$（$i \\in I$）都投射，$Q := \\coprod_{i} P_{i}$，带余射 $\\iota_{i} : P_{i} \\to Q$。任给满态射 $e : X \\twoheadrightarrow Y$ 与 $f : Q \\to Y$，要造 $g$ 使 $e g = f$：',
          '- 限制到每个分量，$f \\iota_{i} : P_{i} \\to Y$。因为 $P_{i}$ 投射，存在 $g_{i} : P_{i} \\to X$ 使 $e g_{i} = f \\iota_{i}$；',
          '- 余积的**泛性质**给出唯一的 $g : Q \\to X$ 使 $g \\iota_{i} = g_{i}$（对所有 $i$）；',
          '- 于是 $e g \\iota_{i} = e g_{i} = f \\iota_{i}$ 对所有 $i$ 成立，再由余积泛性质的**唯一性**得 $e g = f$。∎'
        ].join('\n'),
        '对偶地（把上面每个箭头反向、余积换积、满态射换单态射）：内射对象的积仍内射。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1–5.2']
    },

    {
      id: 'prop.ab-limits-forgetful',
      cluster: 'hom.ab',
      type: 'proposition',
      label: 'Ab(C) 的极限',
      title: '$\\mathrm{Ab}(\\mathcal{C})$ 有所有极限',
      regions: ['homology', 'category'],
      tags: ['同调代数', '阿贝尔群对象', '极限', '遗忘函子'],
      statement: '若 $\\mathcal{C}$ 有所有极限，则 $\\mathrm{Ab}(\\mathcal{C})$ 也有所有极限，并且**遗忘函子** $\\mathrm{Ab}(\\mathcal{C}) \\to \\mathcal{C}$ 保它们。',
      notes: [
        '⭐ **实用价值**：这条让「在 $\\mathcal{C}$ 里算极限」与「在 $\\mathrm{Ab}(\\mathcal{C})$ 里算极限」完全一致 —— 凝聚态那一侧 $\\mathrm{Ab}(\\mathrm{Cond}) = \\mathrm{CondAb}$ 有所有极限，就是这条在 $\\mathcal{C} = \\mathrm{Cond}$ 上的一次应用。',
        ['**证明（极限在遗忘函子下逐项算）。** 阿贝尔群对象的定义是一组态射与**交换图**：',
          '$$m : X \\times X \\to X, \\qquad e : 1 \\to X, \\qquad i : X \\to X$$',
          '配上一串等式（结合、单位、逆、交换性）—— 全是「两个复合相等」形式的图。',
          '- 设 $D : I \\to \\mathrm{Ab}(\\mathcal{C})$ 是可图表，记 $UX$ 为 $X$ 的底对象。因为极限保持极限（特别地保持有限积与终对象），把上述各图和等式逐项送进 $\\mathcal{C}$ 后仍然成立；于是底对象上的 $\\lim UD$ **自动**带上阿贝尔群对象的结构，$m$ 取 $\\lim (Um \\circ \\text{交换}) $、$e$ 取 $\\lim Ue$。',
          '- 于是 $\\mathrm{Ab}(\\mathcal{C})$ 有 $I$-极限，而遗忘函子把它送到 $\\mathcal{C}$ 里的 $\\lim UD$ —— 即**保极限**。',
          '- 细节只在一处：$\\lim$ 与有限积的交换（$U \\lim = \\lim U$ 与 $\\lim(X_{i}\\times Y_{i}) = \\lim X_{i}\\times \\lim Y_{i}$），那是极限的一般性质。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 1.52']
    },

    {
      id: 'prop.left-adjoint-unique',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '左伴随唯一',
      title: '同一个右伴随的左伴随在同构意义下唯一',
      regions: ['category'],
      tags: ['范畴论', '伴随', '唯一性'],
      statement: '若 $F_{1} \\dashv G$ 且 $F_{2} \\dashv G$，则 $F_{1} \\cong F_{2}$（对偶地：同一个左伴随的右伴随在同构意义下唯一）。',
    notes:         ['**证明。** 设 $F_{1}\\dashv G$、$F_{2}\\dashv G$，伴随同构记为 $\\varphi_{1}, \\varphi_{2}$。','- 对任意 $X \\in \\mathcal{C}$ 与 $Y \\in \\mathcal{D}$，','$$\\operatorname{Hom}_{\\mathcal{D}}\\bigl(F_{1}X, Y\\bigr) \\xrightarrow{\\;\\varphi_{1}\\;} \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X, GY\\bigr) \\xrightarrow{\\;\\varphi_{2}^{-1}\\;} \\operatorname{Hom}_{\\mathcal{D}}\\bigl(F_{2}X, Y\\bigr)$$','是一个与 $Y$ 自然同构 ✓。','- 由 **Yoneda 引理**，自然同构 $\\operatorname{Hom}(F_{1}X, -) \\cong \\operatorname{Hom}(F_{2}X, -)$ 唯一地来自一个同构 $\\theta_{X} : F_{1}X \\to F_{2}X$ ✓。','- $\\theta$ 对 $X$ 自然：$\\theta$ 是「用同两个伴随同构拼出来的」，而伴随同构对两个变量都自然，故 $\\theta : F_{1} \\to F_{2}$ 是自然同构 ✓。','- 同一条论证交换 $\\mathcal{C}$ 与 $\\mathcal{D}^{\\mathrm{op}}$ 就得到右伴随的唯一性 ✓。∎'].join('\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    {
      id: 'prop.counit-epi-iff-faithful',
      cluster: 'cat.adjoint',
      type: 'proposition',
      label: '余单位与忠实性',
      title: '$G$ 忠实 $\\iff$ 余单位是满',
      regions: ['category'],
      tags: ['范畴论', '伴随', '余单位', '忠实'],
      statement: '设 $F \\dashv G$，单位 $\\eta$、余单位 $\\varepsilon$。则 $G$ **忠实** $\\iff$ 余单位 $\\varepsilon$ 是**满态射**（对偶地：$F$ 忠实 $\\iff$ 单位是单态射）。',
    notes:         ['**证明。** 设 $F \\dashv G$，伴随同构 $\\varphi_{Y,Z} : \\operatorname{Hom}_{\\mathcal{D}}(FY, Z) \\xrightarrow{\\ \\cong\\ } \\operatorname{Hom}_{\\mathcal{C}}(Y, GZ)$，余单位 $\\varepsilon_{Y} = \\varphi^{-1}(1_{GY})$。','- **关键同构**：由三角恒等式，下面的方块交换（对一切 $Z$）：','$$\\begin{array}{ccc} \\operatorname{Hom}_{\\mathcal{D}}(Y, Z) & \\xrightarrow{\\ G_{Y,Z}\\ } & \\operatorname{Hom}_{\\mathcal{C}}(GY, GZ)\\\\ {\\scriptstyle \\operatorname{Hom}(\\varepsilon_{Y}, Z)}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle \\cong\\ \\varphi_{GY,Z}} \\\\ \\operatorname{Hom}_{\\mathcal{D}}(FGY, Z) & \\xrightarrow[\\ \\cong\\ ]{} & \\operatorname{Hom}_{\\mathcal{C}}(GY, GZ)\\end{array}$$','即 $\\varphi_{GY,Z}\\circ\\operatorname{Hom}(\\varepsilon_{Y}, Z) = G_{Y,Z}$ ✓。','- 于是（用「$e$ 是满态射 $\\iff$ $\\operatorname{Hom}(e, Z)$ 对一切 $Z$ 是单射」这条刻画）','$$\\varepsilon_{Y}\\text{ 满} \\iff \\forall Z:\\ \\operatorname{Hom}(\\varepsilon_{Y},Z)\\text{ 单} \\iff \\forall Z:\\ G_{Y,Z}\\text{ 单} \\iff G\\text{ 忠实} ✓$$','- 对偶地（把整个论证搬到 $\\mathcal{C}^{\\mathrm{op}}, \\mathcal{D}^{\\mathrm{op}}$）得 $F$ 忠实 $\\iff$ 单位 $\\eta$ 是单态射 ✓。∎'].join('\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.5']
    },

    {
      id: 'prop.ab6',
      cluster: 'hom.ab',
      type: 'proposition',
      label: 'AB6：滤过余极限与积交换',
      title: '$\\mathbf{Ab}$ 满足 AB6',
      regions: ['homology'],
      tags: ['同调代数', 'AB6', '滤过余极限', '积'],
      statement: [
        '在 $\\mathbf{Ab}$（以及 $A\\text{-}\\mathbf{Mod}$）里**一族滤过余极限与积交换**，这就是 Grothendieck 的 **AB6** 公理：对任意指标族 $J$、**各自**的滤过范畴 $I_{j}$（$j \\in J$）与函子 $M_{j} : I_{j} \\to \\mathbf{Ab}$，自然映射',
        '',
        '$$\\varinjlim_{(i_{j})_{j} \\in \\prod_{j} I_{j}} \\ \\prod_{j \\in J} M_{j}(i_{j}) \\longrightarrow \\prod_{j \\in J} \\varinjlim_{i_{j} \\in I_{j}} M_{j}(i_{j})$$',
        '',
        '是同构。'
      ].join('\n'),
      notes: [
        ['**证明（两边各算一次）。** 余极限取在 $\\prod_{j} I_{j}$ 上，而滤过范畴的**积**仍是滤过的（任意两个对象 $(i_{j})$、$(i\'_{j})$ 在每个分量上各取上界，再逐坐标拼起来）。',
          '- **单**：左边一个元素是某一点 $(i_{j})_{j}$ 上的族 $(x_{j})_{j}$。若它在右边为 $0$，则对每个 $j$ 存在 $i_{j} \\to i\'_{j}$ 把 $x_{j}$ 杀掉；$(i\'_{j})_{j}$ 就是 $\\prod_{j} I_{j}$ 里接受它的那个对象，于是这个类本身就是 $0$。',
          '- **满**：右边任给 $(t_{j})_{j}$，每个 $t_{j}$ 由某个 $x_{j} \\in M_{j}(i_{j})$ 表示；把 $(i_{j})_{j}$ 与 $(x_{j})_{j}$ 拼起来就是左边的一个元素，它映到 $(t_{j})_{j}$。∎'
        ].join('\n'),
        ['⚠️ **关键是「每个 $j$ 各有自己的滤过范畴」。** 若所有 $j$ 共用同一个 $I$（取对角），断言**是错的** —— 那时只有 $J$ **有限**才对（那就是「滤过余极限与有限积交换」，来自滤过余极限是 sifted 余极限）。',
          '反例：$I = (\\mathbb{N}, \\le)$、$M_{i,j} = \\mathbb{Z}/p^{i}$，转移映射取「乘以 $p$」，于是 $\\varinjlim_{i} \\mathbb{Z}/p^{i} = \\mathbb{Z}[1/p]/\\mathbb{Z}$。取 $t = (t_{j})_{j}$，其中 $t_{j}$ 是阶为 $p^{j}$ 的那个元素：任何单个 $i$ 上，元素只能有阶 $\\le p^{i}$，所以 $j > i$ 的分量根本提不出来 —— 而 $\\prod_{j} I_{j}$ 上就没这个问题，每个 $j$ 可以各自跑到够高的层级。'
        ].join('\n'),
        '与 AB5 的关系：AB6 = AB5 + 上面这条（AB5 管「滤过余极限正合」，AB6 再管「它与积交换」）。'
      ].join('\n\n'),
      refs: ['Le Stum, Definition 5.2.5']
    },

    {
      id: 'prop.ind-reflective',
      cluster: 'cat.limit',
      type: 'proposition',
      label: 'C 是 Ind(C) 的反射子范畴',
      title: '$\\mathcal{C} \\hookrightarrow \\operatorname{Ind}(\\mathcal{C})$ 是反射',
      regions: ['category'],
      tags: ['范畴论', 'Ind-对象', '反射子范畴', '滤过余极限'],
      statement: '若 $\\mathcal{C}$ 有滤过余极限，则 $\\mathcal{C}$ 是 $\\operatorname{Ind}(\\mathcal{C})$ 的**反射子范畴**。',
      notes: [
        ['**证明。** 记嵌入为 $i : \\mathcal{C} \\hookrightarrow \\operatorname{Ind}(\\mathcal{C})$，它把 $X$ 看成常图的形式余极限。','- **反射函子**取 $F\\bigl(\\varinjlim_{i}X_{i}\\bigr) := \\varinjlim_{i}X_{i}$（在 $\\mathcal{C}$ 里真实存在的那个，由假设存在；$\\operatorname{Ind}$ 里形式余极限的表示在同构意义下唯一，故良定义）✓。','- **伴随**：对 $X \\in \\mathcal{C}$ 与形式余极限 $\\varinjlim_{j}Y_{j}$，$\\operatorname{Ind}$ 里的 Hom 由余极限定义，而 $X$ 是**紧**的（在 $\\mathcal{C}$ 里可表示），故','$$\\operatorname{Hom}_{\\operatorname{Ind}}\\bigl(X, \\varinjlim_{j}Y_{j}\\bigr) \\;=\\; \\varinjlim_{j}\\operatorname{Hom}_{\\mathcal{C}}(X, Y_{j}) \\;=\\; \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X, \\varinjlim_{j}Y_{j}\\bigr) \\;=\\; \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X, F(\\varinjlim_{j}Y_{j})\\bigr),$$','对 $X$ 自然 —— 即 $i \\dashv F$（等价地 $F$ 是反射）✓。','- **余单位是同构**：$\\varepsilon : F\\,i(X) = X \\to X$ 就是恒等 ✓；对一般的 $\\varinjlim Y_{j}$，$\\varepsilon: F(\\varinjlim Y_{j}) \\to \\varinjlim Y_{j}$ 也是同构（把表示换到 $\\mathcal{C}$ 里）✓。∎'].join('\n'),
'**反射函子**就是「取形式余极限的真正余极限」：把 Ind-对象「$\\varinjlim X_{i}$」送到 $\\mathcal{C}$ 里真实存在的那个 $\\varinjlim X_{i}$。\n\n⭐ 于是 $\\operatorname{Ind}(\\mathcal{C})$ 是「把 $\\mathcal{C}$ 补齐到对滤过余极限封闭」的最小范畴 —— 反射性说的正是「补完之后原来的东西没被改坏」。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.3']
    },

    {
      id: 'prop.filtered-finite-colimits',
      cluster: 'cat.limit',
      type: 'proposition',
      label: '滤过 + 有限余极限 ⟹ 所有余极限',
      title: '有余滤过余极限与有限余极限 $\\implies$ 有所有余极限',
      regions: ['category'],
      tags: ['范畴论', '滤过余极限', '余极限', '完备性'],
      statement: '有**滤过余极限**与**有限余极限**的范畴有**所有余极限**。',
    notes:         ['**证明。** 记 $\\mathcal{C}$ 有有限余极限与滤过余极限。','- **先看小指标**：设 $I$ 是任一小范畴，$D : I \\to \\mathcal{C}$。令 $\\operatorname{Fin}(I)$ 是 $I$ 的**有限子范畴**（对象集有限、且对其中每对对象只取有限多个态射）的全体，按包含构成偏序 —— 它是**滤过**的（两个有限子范畴的并仍有限）✓。','- **两步走**：$\\varinjlim_{I} D$ 可以这样算：先在每个有限子范畴 $J$（沿含入 $J \\hookrightarrow I$）上取余极限 $\\varinjlim_{J}D|_{J}$ —— 这是**有限**余极限（有限图）✓；再沿 $J$ 的滤过序取余极限，得到 $\\varinjlim_{J \\in \\operatorname{Fin}(I)}\\bigl(\\varinjlim_{J} D\\bigr)$，它与 $\\varinjlim_{I}D$ 满足同一个泛性质（两条余锥的相容性互相翻译）故同构 ✓。','- 于是任何余极限都是「有限余极限的滤过余极限」，两者都在 $\\mathcal{C}$ 里，故 $\\mathcal{C}$ 有所有余极限 ✓。∎','⚠️ 前提「有限余极限」不能只留「余积」：还要有推出 / 余等化子，上面的两步走才封得住。'].join('\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.3']
    },

    {
      id: 'prop.ring-tensor-coproduct',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '交换环的纤维余积是张量积',
      title: '交换环的推出 = 张量积',
      regions: ['algebra', 'category'],
      tags: ['代数', '环', '张量积', '推出'],
      statement: '在**交换环**范畴里，沿 $A \\to B$、$A \\to C$ 的**纤维余积**（推出）是 $B \\otimes_{A} C$。',
      notes: [
        ['**证明（验证推出的泛性质）。** 记 $D := B\\otimes_{A} C$，$\\beta : B\\to D$、$\\gamma : C\\to D$ 为 $b\\mapsto b\\otimes 1$、$c\\mapsto 1\\otimes c$。',
          '- **方块交换**：$\\beta(a\\cdot 1_{B}) = a\\otimes 1 = 1\\otimes a\\cdot 1 = \\gamma(a\\cdot 1_{C})$，即 $\\beta\\circ(A\\to B) = \\gamma\\circ(A\\to C)$ ✓；',
          '- **泛性质**：任给交换环 $E$ 与同态 $f : B\\to E$、$g : C\\to E$ 使 $f|_{A} = g|_{A}$，定义',
          '$$\\varphi\\Bigl(\\sum_{k} b_{k}\\otimes c_{k}\\Bigr) := \\sum_{k} f(b_{k})\\,g(c_{k}) \\in E .$$',
          '它是**良定义**的：$\\otimes$ 的双线性关系逐条被 $f,g$ 的乘法性与 $f|_{A}=g|_{A}$ 满足（例如 $ab\\otimes c - b\\otimes ac \\mapsto f(ab)g(c)-f(b)g(ac) = f(a)f(b)g(c) - f(b)g(a)g(c) = 0$）✓；由交换性 $\\varphi$ 是环同态 ✓；且 $\\varphi\\beta = f$、$\\varphi\\gamma = g$ ✓。',
          '- **唯一性**：$D$ 由 $\\beta(B)\\cup\\gamma(C)$ 生成（$b\\otimes c = \\beta(b)\\gamma(c)$），故在两个生成块上定死就唯一 ✓。',
          '于是 $D$ 满足推出的泛性质，即 $B\\otimes_{A}C = B\\coprod_{A} C$。∎',
          '⚠️ **交换性是必需的**：非交换环上，$B\\otimes_{A}C$ 一般不是环（乘法在张量积上不下降）—— 那时纤维余积要用自由积 / 余等化子另造。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 1.36']
    }
  ],

  edges: []
});
