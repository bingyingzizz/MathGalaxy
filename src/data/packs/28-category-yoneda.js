/* ==========================================================================
   内容包 · 预层与米田（9 条）
   --------------------------------------------------------------------------
   第四团：预层 → 预层范畴 → 表示 → 米田引理 → 稠密性定理。

   依赖顺序：预层是反变函子；表示说的是函子与 Hom 函子同构；
   米田引理把「自然变换」压成「一个元素」；稠密性定理再用米田把预层拆开。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '预层与米田',
  nodes: [

    /* ---------------------------------------------------------- 预层 */
    {
      id: 'def.presheaf',
      cluster: 'cat.yoneda',
      type: 'definition',
      label: '预层',
      title: '预层',
      regions: ['category'],
      tags: ['范畴论', '预层', '反变函子'],
      statement: [
        '范畴 $\\mathcal{C}$ 上的**（集合值）预层**是函子',
        '',
        '$$T : \\mathcal{C}^{\\mathrm{op}} \\longrightarrow \\mathbf{Set}$$',
        '',
        '预层之间的**态射**就是它们之间的自然变换。记法：对态射 $f : Y \\to X$ 记 $f^{-1} = T(f) : T(X) \\to T(Y)$；对 $s \\in T(X)$ 记 $s|_Y = f^{-1}(s)$。'
      ].join('\n'),
      notes: [
        '直白的说法：**每个对象指定一个数据，每条态射指定一个「限制」**。反变是为了让「更小的对象拿到更多的数据」—— 越往子结构走，限制越多。',
        '例：',
        '',
        [
          '- 偏序集上：对每个 $i$ 给一个 $T_i$，对 $i \\le j$ 给「限制」$T_j \\to T_i$（把反对称性去掉，预序集上同样成立）。',
          '- 拓扑空间上：$\\operatorname{Open}(X)$ 是开集范畴（态射是含入），预层给每个开集 $u$ 一个 $T(u)$，给 $u\' \\subseteq u$ 一个「限制」$T(u) \\to T(u\')$，$s \\mapsto s|_{u\'}$。连续函数预层 $C^{0}$、光滑函数预层 $C^{\\infty}$、常预层 $\\underline{E}$（$\\underline{E}(u) = E$，限制取恒等）、常函数预层都是。',
          '- 固定 $X \\in \\mathcal{C}$：$h_{X} : Y \\mapsto \\operatorname{Hom}_{\\mathcal{C}}(Y, X)$ 是预层，叫**可表示预层**。',
        ].join('\n'),
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* ------------------------------------------------------ 预层范畴 */
    {
      id: 'def.presheaf-cat',
      cluster: 'cat.yoneda',
      type: 'definition',
      label: '预层范畴',
      title: '预层范畴',
      regions: ['category'],
      tags: ['范畴论', '预层', '函子范畴'],
      statement: [
        '$\\mathcal{C}$ 上全体预层以自然变换为态射，组成范畴',
        '',
        '$$\\widehat{\\mathcal{C}} := \\operatorname{Hom}(\\mathcal{C}^{\\mathrm{op}}, \\mathbf{Set})$$'
      ].join('\n'),
      notes: [
        '它是函子范畴，所以极限与余极限**逐点**算 —— 后面所有关于 $\\widehat{\\mathcal{C}}$ 的构造都从这里出发。',
        '几个小例子：$\\widehat{\\emptyset} = \\mathbf{1}$（空范畴到 $\\mathbf{Set}$ 的唯一函子）；$\\widehat{\\mathbf{1}} \\simeq \\mathbf{Set}$（选一个对象、一个集合）；$G$ 是幺半群时 $\\widehat{G} \\simeq G\\text{-}\\mathbf{Set}$（带 $G$ 作用的集合，且映射与 $G$ 中每个元素的平移相容）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* ---------------------------------------------------------- 表示 */
    {
      id: 'def.representable',
      cluster: 'cat.yoneda',
      type: 'definition',
      label: '表示函子',
      title: '表示函子与万有元素',
      regions: ['category'],
      tags: ['范畴论', '表示', '万有元素'],
      statement: [
        '设 $F : \\mathcal{C} \\to \\mathbf{Set}$ 是函子。',
        '',
        '**（一）万有元素。** 对象 $X \\in \\mathcal{C}$ 连同一个元素 $s \\in F(X)$ 叫对 $F$ **万有**，如果',
        '',
        '$$\\forall Y \\in \\mathcal{C},\\ \\forall t \\in F(Y),\\ \\exists! \\, f : X \\to Y,\\qquad F(f)(s) = t$$',
        '',
        '这时也说 $F$ 被 $(X, s)$ **表示**。',
        '',
        '**（二）可表示。** 若 $F \\cong \\operatorname{Hom}_{\\mathcal{C}}(X, -)$，就说 $F$ 被 $X$ **表示**，$X$ 叫 $F$ 的**表示对象**。'
      ].join('\n'),
      notes: [
        '一句话：**$F$ 的全部数据都由 $X$ 上的一个元素 $s$ 生成**。给定任何别的 $t$，都有唯一的 $f$ 把 $s$ 推过去变成它 —— 所以别处的元素不是随便来的，是被 $s$ 推出来的。',
        '等价的说法：$(X, s)$ 万有 $\\iff$ $(X, s)$ 是元素范畴 $\\operatorname{el}(F)$ 的始对象 —— 「泛」这个字在这一层和上一层的用法是同一个。',
        '例：',
        '',
        [
          '- $k \\in \\operatorname{Ob}(\\mathbf{CRng})$，$F : k\\text{-}\\mathbf{Alg} \\to \\mathbf{Set}$ 是遗忘函子。$(k[t],\\ t)$ 表示 $F$：对 $A \\in k\\text{-}\\mathbf{Alg}$ 与 $a \\in F(A)$，令 $t \\mapsto a$ 诱导出唯一的 $k$-代数同态 $k[t] \\to A$。',
          '- $F : \\mathbf{Ring} \\to \\mathbf{Set}$ 取常值单点集。$\\mathbb{Z}$ 表示 $F$：每个环都有唯一的 $\\mathbb{Z} \\to R$。',
          '- 固定拓扑空间 $X$ 与子空间 $Y \\subseteq X$，反变函子',
        ].join('\n'),
        '',
        '  $$F : \\mathbf{Top}^{\\mathrm{op}} \\to \\mathbf{Set}, \\qquad Z \\mapsto \\{\\, f \\in \\mathcal{C}(Z, X) \\ \\mid\\ f(Z) \\subseteq Y \\,\\}$$',
        '',
        '  （$\\mathcal{C}(Z, X)$ 记 $Z \\to X$ 的连续映射全体）被 $F(Y)$ 里那个自然元素 $i : Y \\rightarrowtail X$ 表示。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* ------------------------------------------------------ 米田引理 */
    {
      id: 'lem.yoneda',
      cluster: 'cat.yoneda',
      type: 'lemma',
      label: '米田引理',
      title: '米田引理',
      regions: ['category'],
      tags: ['范畴论', '米田', '自然变换'],
      statement: [
        '设 $F : \\mathcal{C} \\to \\mathbf{Set}$ 是函子，$X \\in \\mathcal{C}$，并记',
        '',
        '$$h^{X} = \\operatorname{Hom}_{\\mathcal{C}}(X, -) : \\mathcal{C} \\to \\mathbf{Set}$$',
        '',
        '则存在自然双射',
        '',
        '$$\\operatorname{Hom}(h^{X}, F) \\;\\cong\\; F(X), \\qquad \\alpha \\mapsto \\alpha_{X}(1_{X})$$',
        '',
        '即「全体自然变换」与「$F(X)$ 的元素」一一对应。'
      ].join('\n'),
      notes: [
        ['**证明。** 定义映射','$$\\Phi : \\operatorname{Nat}(h^{X}, F) \\longrightarrow F(X), \\qquad \\Phi(\\alpha) := \\alpha_{X}(1_{X}).$$','- **逆映射**：给 $u \\in F(X)$，对每个 $Y$ 定义','$$\\Psi(u)_{Y} : \\operatorname{Hom}_{\\mathcal{C}}(X, Y) \\to F(Y), \\qquad \\Psi(u)_{Y}(f) := F(f)(u).$$','它是自然的：对 $g : Y \\to Z$，由 $F$ 的函子性 $F(g)\\circ F(f) = F(g\\circ f)$，两边正是 $F(g)\\bigl(\\Psi(u)_{Y}(f)\\bigr)$ 与 $\\Psi(u)_{Z}(g\\circ f)$ ✓。','- **$\\Phi\\Psi = \\mathrm{id}$**：$\\Psi(u)_{X}(1_{X}) = F(1_{X})(u) = u$ ✓。','- **$\\Psi\\Phi = \\mathrm{id}$**：给 $\\alpha$ 与 $f : X\\to Y$，用 $\\alpha$ 的自然性（作用在 $f$ 上）','$$\\alpha_{Y}\\circ h^{X}(f) = F(f)\\circ \\alpha_{X} \\;\\implies\\; \\alpha_{Y}(f) = F(f)\\bigl(\\alpha_{X}(1_{X})\\bigr) = \\Psi\\bigl(\\Phi(\\alpha)\\bigr)_{Y}(f) ✓$$','- **自然性**：$\\Phi$ 对 $F$ 自然（沿 $\\beta : F\\to G$ 两边都变成 $\\beta_{X}\\circ(-)$）✓；对 $X$ 也自然（沿 $k : X\'\\to X$，$h^{k}$ 的前复合与 $F(k)$ 对应）✓。','于是 $\\operatorname{Hom}(h^{X}, F) \\cong F(X)$，双射就是 $\\alpha\\mapsto\\alpha_{X}(1_{X})$ ✓；对偶地（取 $\\mathcal{C}^{\\mathrm{op}}$）得预层版本 $\\operatorname{Hom}(h_{X}, T) \\cong T(X)$ ✓。∎'].join('\n'),
        '这个双射在两**边**都自然：对 $F$（自然变换）自然，对 $X$（态射）也自然。两头都自然，才是这条引理真正有分量的地方。',
        '它把「$h^{X}$ 到 $F$ 的所有自然变换」这个原则上无从下手的集合，压成了 $F(X)$ 里的**一个元素**。后面凡是遇到「自然变换不好数」的地方，基本都是靠这一步救场。',
        '对偶形式：$T$ 是预层（$T : \\mathcal{C}^{\\mathrm{op}} \\to \\mathbf{Set}$）、$h_{X} = \\operatorname{Hom}(-, X)$ 时可表示预层时，同样有 $\\operatorname{Hom}(h_{X}, T) \\cong T(X)$。两式只是把 $\\mathcal{C}$ 换成 $\\mathcal{C}^{\\mathrm{op}}$，所以后面的推导两套都用。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* -------------------------------------------------- 表示 ⟺ 同构 */
    {
      id: 'thm.represented-criterion',
      cluster: 'cat.yoneda',
      type: 'theorem',
      label: '表示的两个定义等价',
      title: '表示 $\\iff$ 与 $h^{X}$ 同构',
      regions: ['category'],
      tags: ['范畴论', '表示', '米田'],
      statement: [
        '函子 $F : \\mathcal{C} \\to \\mathbf{Set}$ 被 $X \\in \\mathcal{C}$ 表示 $\\iff$ $h^{X} \\cong F$。',
        '',
        '也就是说，「存在万有元素 $(X, s)$」与「$F$ 同构于 $\\operatorname{Hom}_{\\mathcal{C}}(X, -)$」是同一件事。'
      ].join('\n'),
      notes: '这条把「表示」的两种说法接上了：万有元素是**元素层**的说法，$h^{X} \\cong F$ 是**函子层**的说法。实际验证时常走前者（挑出那个 $s$ 就完事），实际使用时常走后者（同构可以直接搬运算）。',
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* ------------------------------------------------------ 米田嵌入 */
    {
      id: 'prop.yoneda-embedding',
      cluster: 'cat.yoneda',
      type: 'proposition',
      label: '米田嵌入',
      title: '米田嵌入',
      regions: ['category'],
      tags: ['范畴论', '米田', '全忠实'],
      statement: [
        '对应',
        '',
        '$$\\delta : \\mathcal{C} \\longrightarrow \\widehat{\\mathcal{C}}, \\qquad X \\mapsto h_{X} = \\operatorname{Hom}_{\\mathcal{C}}(-, X)$$',
        '',
        '是一个**全忠实**函子，并且**保持所有极限**。'
      ].join('\n'),
      notes: [
        '全忠实说的是 $\\operatorname{Hom}_{\\widehat{\\mathcal{C}}}(h_{X}, h_{Y}) \\cong \\operatorname{Hom}_{\\mathcal{C}}(X, Y)$ —— 用 $h_{X}$ 互相之间的箭头完全复刻了 $X$ 之间的箭头，一点不多一点不少。',
        '把 $\\mathcal{C}$ 嵌进 $\\widehat{\\mathcal{C}}$ 之后，$\\mathcal{C}$ 里的问题就搬到了一个**有所有极限与余极限**的范畴里去解 —— 这是「补全一个范畴」的标准做法。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* ------------------------------------------------------ 切片范畴 */
    {
      id: 'def.slice-category',
      cluster: 'cat.yoneda',
      type: 'definition',
      label: '切片范畴',
      title: '预层的切片范畴',
      regions: ['category'],
      tags: ['范畴论', '切片', '元素范畴'],
      statement: [
        '设 $\\mathcal{C}$ 是范畴，$T$ 是 $\\mathcal{C}$ 上的预层。**切片范畴** $\\mathcal{C}/T$（也记 $\\mathcal{C}_{T}$）定义如下：',
        '',
        '1. 对象是「$\\mathcal{C}$ 的对象 $X$ 加上一个截面 $s \\in T(X)$」组成的对 $(X, s)$；',
        '2. 从 $(X, s)$ 到 $(X\', s\')$ 的态射是使 $T(f)(s\') = s$ 的 $f : X \\to X\'$。',
        '',
        '它带一个明显的**遗忘函子** $j_{T} : \\mathcal{C}/T \\to \\mathcal{C}$。用逗号范畴的说法：',
        '',
        '$$\\mathcal{C}/T \\;\\cong\\; \\bigl(\\mathcal{C} \\hookrightarrow \\widehat{\\mathcal{C}}\\bigr) \\Big\\downarrow \\bigl(\\mathbf{1} \\xrightarrow{\\ T\\ } \\widehat{\\mathcal{C}}\\bigr)$$'
      ].join('\n'),
      notes: [
        '这正是把「元素范畴」搬到预层上：$T(X)$ 的元素当元素看，遗忘函子 $j_{T}$ 把 $(X, s)$ 送回 $X$。',
        '⭐ 逗号范畴的写法把它的身份说清了：它是**预层 $T$ 沿着 Yoneda 嵌入往回拉**得到的那个范畴 —— 一边是 $\\mathcal{C} \\hookrightarrow \\widehat{\\mathcal{C}}$，一边是 $\\mathbf{1} \\xrightarrow{T} \\widehat{\\mathcal{C}}$。它也解释了为什么 $X \\in \\mathcal{C}$ 时 $\\mathcal{C}/X \\simeq \\widehat{\\mathcal{C}}/h_{X}$。',
        '它的用处是给预层配一个**指标范畴**：谈「这个预层由哪些点拼起来」时，指标就跑在 $\\mathcal{C}/T$ 上（稠密性定理就是这么用的）。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* ------------------------------------------------ 切片方块是笛卡尔的 */
    {
      id: 'prop.slice-cartesian',
      cluster: 'cat.yoneda',
      type: 'proposition',
      label: '切片范畴是拉回',
      title: '切片范畴的方块是笛卡尔的',
      regions: ['category'],
      tags: ['范畴论', '切片', '拉回', '米田嵌入'],
      statement: [
        '对任取的一个预层，下面这个方块',
        '',
        '$$\\begin{array}{ccc} \\mathcal{C}/T & \\hookrightarrow & \\widehat{\\mathcal{C}}/T \\\\ \\big\\downarrow{\\scriptstyle{j_{T}}} & & \\big\\downarrow \\\\ \\mathcal{C} & \\xrightarrow{\\ h\\ } & \\widehat{\\mathcal{C}} \\end{array}$$',
        '',
        '是**笛卡尔的**。上面是**切片范畴到预层范畴的嵌入**，下面是**范畴 $\\mathcal{C}$ 到预层范畴的 Yoneda 嵌入** $h$（$h(X) = h_{X} = \\operatorname{Hom}(-, X)$），两条竖边是两个遗忘函子。'
      ].join('\n'),
      notes: [
        ['**证明。** 需要证 $\\mathcal{C}/T \\to \\mathcal{C}\\times_{\\widehat{\\mathcal{C}}}\\widehat{\\mathcal{C}}/T$ 是等价。','- **对象**：$\\mathcal{C}/T$ 的对象是 $p : X \\to T$（$X\\in\\mathcal{C}$）；由 **Yoneda**，$\\operatorname{Hom}(h_{X}, T) \\cong T(X)$，所以 $p$ 与一个态射 $h_{X}\\to T$ 一一对应 —— 而右边拉回的对象的正是「$X \\in \\mathcal{C}$ 连同 $h_{X}\\to T$」✓。','- **态射**：$\\mathcal{C}/T$ 中 $p \\to p\'$ 是交换三角（$X\\to X\'$ 与 $T$ 上的相容性）；把 Yoneda 嵌入作用上去得到 $h_{X}\\to h_{X\'}$ 与 $h_{X}\\to T$ 的相容对，右边正是一对这样的数据。由 Yoneda 嵌入**全忠实**（$\\operatorname{Hom}(h_{X},h_{X\'}) \\cong \\operatorname{Hom}(X,X\')$），这个对应在 Hom 上是双射 ✓。','- **函子性 / 等价**：对应在复合下保持（Yoneda 是函子）✓ 于是得到一个范畴等价，即原方块**笛卡尔** ✓。','- **特例**：取 $T = h_{X}$，得 $\\mathcal{C}/X \\simeq \\widehat{\\mathcal{C}}/h_{X}$ —— 在 $\\mathcal{C}$ 里沿 $X$ 切片与在预层范畴里沿 $h_{X}$ 切片是同一件事 ✓。∎'].join('\n'),
'也就是说：**切片范畴 $\\mathcal{C}/T$ 就是遗忘函子 $\\widehat{\\mathcal{C}}/T \\to \\widehat{\\mathcal{C}}$ 沿 Yoneda 嵌入拉回来的东西**。\n\n特例最能说明问题：$T = h_{X}$（可表示）时，方块给出 $\\mathcal{C}/X \\simeq \\widehat{\\mathcal{C}}/h_{X}$ —— 在 $\\mathcal{C}$ 里沿 $X$ 切片，与在预层范畴里沿 $h_{X}$ 切片，是同一件事。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* ------------------------------------------------------ 稠密性定理 */
    {
      id: 'thm.density',
      cluster: 'cat.yoneda',
      type: 'theorem',
      label: '稠密性定理',
      title: '稠密性定理',
      regions: ['category'],
      tags: ['范畴论', '米田', '余极限'],
      statement: [
        '$\\widehat{\\mathcal{C}}$ 中的每个预层 $T$ 都是**可表示预层的余极限**：',
        '',
        '$$T \\;\\cong\\; \\varinjlim_{(X, s) \\in \\mathcal{C}_{T}} h_{X}$$'
      ].join('\n'),
      notes: [
        '指标跑在切片范畴 $\\mathcal{C}_{T}$ 上：$T$ 的每个元素 $(X, s)$ 贡献一个 $h_{X}$，$T$ 就是它们的余极限。',
        '所以 $\\widehat{\\mathcal{C}}$ 是「由可表示预层自由生成的」—— 可表示预层是它的一块块砖。后面说到「预层范畴是所有可表示预层的余极限闭包」时，说的就是这一条。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    },

    /* -------------------------------------------- 预层的单 / 满按点检验 */
    {
      id: 'lem.presheaf-mono-pointwise',
      cluster: 'cat.yoneda',
      type: 'lemma',
      label: '预层态射的单满按点检验',
      title: '预层是逐点算的',
      regions: ['category'],
      tags: ['范畴论', '预层', '单态射'],
      statement: [
        '预层态射 $\\varphi : T \\implies T\'$ 在 $\\widehat{\\mathcal{C}}$ 中是单态射（满态射）$\\iff$ 对每个 $X \\in \\mathcal{C}$，$\\varphi_{X} : T(X) \\to T\'(X)$ 是单射（满射）。'
      ].join('\n'),
      notes: [
        '一句话：**预层的性质按点检验**。$\\widehat{\\mathcal{C}}$ 里的一切都是逐点定义的，单满不例外。',
        '（$\\Longleftarrow$）方向是显然的：逐点单射的族当然左可消。（$\\Longrightarrow$）方向要用米田引理，见边上那条推导。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1–1.5']
    }
  ],

  edges: [
    /* -------------------------------------- 米田 ⟹ 表示的两定义等价 */
    {
      id: 'imp.yoneda-criterion',
      kind: 'implication',
      sources: ['lem.yoneda'],
      target: 'thm.represented-criterion',
      title: '米田引理 $\\implies$ 表示的两个定义等价',
      proof: [
        '**（$\\Longleftarrow$）** 设 $h^{X} \\cong F$，取一个自然同构 $\\alpha : h^{X} \\implies F$。由米田引理，$\\alpha$ 由元素 $s = \\alpha_{X}(1_{X}) \\in F(X)$ 决定；反过来，给定 $s$ 也能定义出 $\\alpha$。',
        '',
        '要证 $(X, s)$ 万有。固定 $Y$，则由 $\\alpha$ 是自然同构，$\\alpha_{Y} : \\operatorname{Hom}_{\\mathcal{C}}(X, Y) \\to F(Y)$ 是双射。对任意 $t \\in F(Y)$，记 $f = \\alpha_{Y}^{-1}(t)$，即 $\\alpha_{Y}(f) = t$。',
        '',
        '再用 $\\alpha$ 的自然性（取 $f : X \\to Y$）：',
        '',
        '$$\\alpha_{Y}(f) = F(f)\\bigl(\\alpha_{X}(1_{X})\\bigr) = F(f)(s)$$',
        '',
        '于是 $F(f)(s) = t$，且 $f$ 由 $\\alpha_{Y}^{-1}$ 唯一确定。这就是万有元素的条件。∎',
        '',
        '**（$\\Longrightarrow$）** 反过来设 $(X, s)$ 万有。对每个 $Y$ 定义',
        '',
        '$$\\alpha_{Y} : \\operatorname{Hom}_{\\mathcal{C}}(X, Y) \\to F(Y), \\qquad f \\mapsto F(f)(s)$$',
        '',
        '万有性说的正是「对每个 $t \\in F(Y)$ 存在唯一 $f$ 使 $F(f)(s) = t$」，所以每个 $\\alpha_{Y}$ 都是双射。剩下要检查的只有自然性：对 $g : Y \\to Z$，两个复合 $\\alpha_{Z} \\circ \\operatorname{Hom}(X, g)$ 与 $F(g) \\circ \\alpha_{Y}$ 都把那片 $f : X \\to Y$ 送到 $F(g \\circ f)(s)$，所以相等。于是 $\\alpha : h^{X} \\implies F$ 是自然同构，$h^{X} \\cong F$。∎'
      ].join('\n'),
      note: '这条的意义在于：**要证明一个函子可表示，只要找到那个万有元素**，同构自动就有了。'
    },

    /* ---------------------------------------- 米田 ⟹ 米田嵌入全忠实 */
    {
      id: 'imp.yoneda-embedding',
      kind: 'implication',
      sources: ['lem.yoneda'],
      target: 'prop.yoneda-embedding',
      title: '米田引理 $\\implies$ 米田嵌入全忠实、保极限',
      proof: [
        '**全忠实。** 取预层的对偶形式（把 $\\mathcal{C}$ 换成 $\\mathcal{C}^{\\mathrm{op}}$）：对 $T = h_{Y}$ 与 $X \\in \\mathcal{C}$ 有',
        '',
        '$$\\operatorname{Hom}_{\\widehat{\\mathcal{C}}}(h_{X}, h_{Y}) \\cong h_{Y}(X) = \\operatorname{Hom}_{\\mathcal{C}}(X, Y)$$',
        '',
        '这恰是 $\\delta$ 在 Hom 集上诱导的映射，所以它逐对是双射，$\\delta$ 全忠实。∎',
        '',
        '**保持所有极限。** 设 $D : I \\to \\mathcal{C}$ 有极限。$\\widehat{\\mathcal{C}}$ 是函子范畴，其中的极限**逐点**计算，于是对每个 $Z \\in \\mathcal{C}$，',
        '',
        '$$\\Bigl(\\varprojlim_{i} h_{D(i)}\\Bigr)(Z) = \\varprojlim_{i} \\operatorname{Hom}_{\\mathcal{C}}(Z, D(i)) \\cong \\operatorname{Hom}_{\\mathcal{C}}\\Bigl(Z, \\varprojlim_{i} D(i)\\Bigr) = h_{\\lim D}(Z)$$',
        '',
        '中间那一步是「协变 $\\operatorname{Hom}(Z, -)$ 保持极限」。逐点同构即同构，所以 $\\delta(\\lim D) \\cong \\lim \\delta \\circ D$。∎'
      ].join('\n'),
      note: '两个结论同出一源：**$h_{X}$ 到别处的箭头，就是 $X$ 处的元素**。'
    },

    /* ---------------------------------------- 米田 + 切片 ⟹ 稠密性定理 */
    {
      id: 'imp.density',
      kind: 'implication',
      sources: ['lem.yoneda', 'def.slice-category'],
      target: 'thm.density',
      title: '米田引理 $\\implies$ 稠密性定理',
      proof: [
        '对每个 $(X, s) \\in \\mathcal{C}_{T}$，由 $s \\in T(X)$ 与米田引理的对偶形式，有唯一对应的自然变换',
        '',
        '$$\\alpha^{s} : h_{X} \\implies T, \\qquad \\alpha^{s}_{Y} : \\operatorname{Hom}_{\\mathcal{C}}(Y, X) \\to T(Y),\\quad \\psi \\mapsto T(\\psi)(s)$$',
        '',
        '切片范畴里的态射恰好是让这些 $\\alpha^{s}$ 彼此相容的那些 $f$，所以 $\\{\\alpha^{s}\\}_{(X,s)}$ 构成一个余锥，诱导出',
        '',
        '$$\\Theta : \\varinjlim_{(X, s) \\in \\mathcal{C}_{T}} h_{X} \\longrightarrow T$$',
        '',
        '要证 $\\Theta$ 是同构。逐点检验：对 $Y \\in \\mathcal{C}$，',
        '',
        '$$\\Bigl(\\varinjlim_{(X,s)} h_{X}\\Bigr)(Y) = \\varinjlim_{(X,s)} \\operatorname{Hom}_{\\mathcal{C}}(Y, X) \\longrightarrow T(Y)$$',
        '',
        '而右边这个集合正是「以 $(X, s)$ 为指标、把每个 $\\psi : Y \\to X$ 送到 $T(\\psi)(s) \\in T(Y)$」的余极限。取 $(X, s) = (Y, t)$ 与 $\\psi = 1_{Y}$，这一项的像就是 $t$ 本身；反过来，自然性 $T(\\psi)(s) \\in T(Y)$ 说明每一项都已经落在 $T(Y)$ 里。于是对每个 $t \\in T(Y)$ 都有来源，且不同的 $t$ 给出不同的项 —— 逐点双射。∎'
      ].join('\n'),
      note: '把这条和米田引理并排看：米田说「$h_{X}$ 到 $T$ 的箭头 = $T$ 在 $X$ 处的元素」，稠密性把它反过来用 —— 既然元素就是箭头，那么全部元素（即 $\\mathcal{C}_{T}$）就决定了 $T$ 自己。'
    },

    /* ---------------------------------------- 米田 ⟹ 单满逐点检验（正向） */
    {
      id: 'imp.presheaf-mono',
      kind: 'implication',
      sources: ['lem.yoneda'],
      target: 'lem.presheaf-mono-pointwise',
      title: '米田引理 $\\implies$ 单态射逐点检验',
      proof: [
        '只需做（$\\Longrightarrow$）方向。设 $\\varphi : T \\implies T\'$ 是单态射，固定 $X$，设 $a, b \\in T(X)$ 且 $\\varphi_{X}(a) = \\varphi_{X}(b)$。',
        '',
        '由米田引理的对偶形式，$a, b$ 各自对应一个自然变换 $f, g : h_{X} \\implies T$，即在每个 $Y$ 处',
        '',
        '$$f_{Y}, g_{Y} : \\operatorname{Hom}_{\\mathcal{C}}(Y, X) \\to T(Y), \\qquad \\psi \\mapsto T(\\psi)(a) \\ \\text{或}\\ T(\\psi)(b)$$',
        '',
        '对任意 $\\psi : Y \\to X$，用 $\\varphi$ 的自然性：',
        '',
        '$$(\\varphi \\circ f)_{Y}(\\psi) = \\varphi_{Y}\\bigl(T(\\psi)(a)\\bigr) = T\'(\\psi)\\bigl(\\varphi_{X}(a)\\bigr) = T\'(\\psi)\\bigl(\\varphi_{X}(b)\\bigr) = (\\varphi \\circ g)_{Y}(\\psi)$$',
        '',
        '所以 $\\varphi \\circ f = \\varphi \\circ g$。又 $\\varphi$ 是单态射，左可消，得 $f = g$。最后取 $Y = X$ 与 $\\psi = 1_{X}$，就是 $a = b$。∎',
        '',
        '满态射的情形对偶（把范畴换成 $\\mathcal{C}^{\\mathrm{op}}$）。∎'
      ].join('\n'),
      note: '这里能看到米田引理的典型用法：**要把「元素层」的问题搬到「箭头层」，就先让元素变成 $h_{X}$ 到 $T$ 的箭头**。'
    }
  ]
});
