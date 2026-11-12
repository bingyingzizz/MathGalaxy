/* ============================================================================
   内容包 · 接线：Zorn 引理 / 选择公理真正的下游

   为什么要有这一包：`lem.zorn` 在图里只有三条边（hartogs→zorn、zorn→choice、
   zorn→基的存在），可是全库有二十多个节点的正文/证明**写了**「用 Zorn 引理」，
   其中 `prop.prime-ideal` 甚至明说「存在性要用佐恩引理，不在本条里」—— 线就这么
   断了。这一包只加边，不改任何节点正文。

   判据：该节点的正文/证明**真的**用 Zorn（或选择公理）做了一步，才连。
   ⛔ 只是「提到选择公理」的（例如 Schröder–Bernstein「不需要 AC」、
      `thm.ordinal-trichotomy`「不需要选择公理」）一律**不连** —— 连了就是假依赖。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '接线：Zorn 引理与选择公理的下游',

  nodes: [
    {
      id: 'thm.foliation-existence',
      cluster: 'diffgeom.vector',
      type: 'theorem',
      label: '叶状结构存在定理',
      title: '对合分布的整体叶存在：Zorn 引理',
      regions: ['diffgeom'],
      tags: ['定理', '微分流形', '叶状结构', 'Zorn 引理', 'Frobenius'],
      refs: ['Tu, An Introduction to Manifolds (2nd ed., GTM 334), 「Frobenius Theorem」'],
      statement: '设 $\\mathcal{D}$ 是光滑流形 $M$ 上的**对合**光滑 $k$ 阶切分布（`def.involutive-distribution`）。则 $M$ 上存在**叶状结构**：\n\n- 过每点恰有一片**极大连通积分流形**（叶）$L$ 经过，$T L = \\mathcal{D}|_{L}$（`def.integral-manifold`）；\n- 两片叶或相等或不相交；全体叶覆盖 $M$，每片是浸入子流形。\n\n本条只负责**整体**这一步：局部叶片的存在性是 Frobenius 定理的内容（本图见 Frobenius 节点），把局部叶片粘成极大叶、并证明叶与叶互不相交，用的是 Zorn 引理。',
      notes: '⭐ 与 Frobenius 定理的分工：Frobenius 给的是**局部**可积（每点附近有积分流形），本条把局部叶片粘成**整体**的极大叶 —— 差别只在「整体」，所以剩下的工作是一次 Zorn 加一次局部唯一性。\n\n⚠ 本条不把 Frobenius 列为 source：局部可积性在这里当**已知输入**用（图上已由 Frobenius 节点陈述），本条要证的是它推不出的那一步。要写成显式依赖，得先确认不与 Frobenius 的分层成环。',
    },
  ],

  edges: [
    /* ---------------------------------------------- 一、Zorn 引理的前提概念 */
    /* 这些是 `lem.zorn` 的**陈述里用到**的概念：没有它们，Zorn 引理写不出来。
       以前一条都没有，所以从 Zorn 往外看不到「它站在什么上面」。 */
    {id: "e162.definition", kind: 'definition', definition: 'def.choicefn', usedBy: 'lem.zorn',
      note: 'Zorn 引理与选择公理等价（`imp.zorn-choice`）：证明里要从族里挑元素，用的就是选择函数。' },

    /* ------------------------------------------ 二、真正靠 Zorn 的定理 */
    {
      id: 'imp.zorn-maximal-ideal',
      kind: 'implication',
      sources: ['lem.zorn'],
      target: 'prop.prime-ideal',
      title: 'Zorn 引理：每个真理想都含在极大理想里',
      proof: [
        '设 $A \\ne 0$ 是环，$I \\subset A$ 是真理想。考虑',
        '$$\\mathcal{S} := \\{\\, J \\trianglelefteq A : I \\subseteq J,\\ J \\ne A \\,\\},$$',
        '按**包含**排序。$\\mathcal{S}$ 非空（$I \\in \\mathcal{S}$）。',
        '**链有上界**：取链 $\\{J_{\\alpha}\\}$，令 $J := \\bigcup_{\\alpha} J_{\\alpha}$。\n\n' +
        '这是理想（两个元素必落在同一个 $J_{\\alpha}$ 里，因为链是全序）；\n\n' +
        '且 $J \\ne A$ —— 因为 $1 \\notin J_{\\alpha}$ 对每个 $\\alpha$ 成立，故 $1 \\notin J$。\n\n' +
        '所以 $J \\in \\mathcal{S}$。',
        '由 Zorn 引理，$\\mathcal{S}$ 有极大元 $M$。$M$ 就是含 $I$ 的极大理想：若 $M \\subset J\' \\ne A$ 也是理想，则 $J\' \\in \\mathcal{S}$ 且严格大于 $M$，矛盾。',
        '**推论**：$A \\ne 0$ 时取 $I = 0$，得极大理想存在；再由「$M$ 极大 $\\iff$ $A/M$ 是域」（`prop.prime-ideal` 的等价刻画），得「每个非零环都有域作为商」。\n\n' +
        '\n\n' +
        '⚠ 这一步**只**用了 Zorn；\n\n' +
        '\u0060prop.prime-ideal` 正文此前写明「存在性不在本条里」，本边把它补上。',
      ].join('\n\n'),
    },
    {
      id: 'imp.zorn-minimal-closed',
      kind: 'implication',
      sources: ['lem.zorn'],
      target: 'lem.minimal-closed-surjection',
      title: 'Zorn 引理：紧 Hausdorff 满射有极小的闭定义域',
      proof: [
        '设 $f : S \\to T$ 是紧 Hausdorff 空间之间的连续满射。令',
        '$$\\mathcal{S} := \\{\\, S\' \\subseteq S : S\'\\ \\text{闭},\\ f|_{S\'}\\ \\text{仍满} \\,\\},$$',
        '按**反包含**排序（即 $S\' \\preceq S\'\' \\iff S\' \\supseteq S\'\'$）：这样「极大元」就是「极小的闭子集」。',
        '**链有上界**：取链 $\\{S_{\\alpha}\\}$，令 $S\'\' := \\bigcap_{\\alpha} S_{\\alpha}$（闭集之交仍闭）。\n\n' +
        '它仍满：若 $f(S\'\') \\ne T$，取 $t \\notin f(S\'\')$；\n\n' +
        '每个 $f(S_{\\alpha})$ 都是含 $t$ 的紧集，故 $\\{f(S_{\\alpha}) \\setminus \\{t\\}\\}$ 是一族「有限交非空、整体交为空」的闭集族 —— 与 $T$ 的紧性矛盾（有限交性质）。',
        '由 Zorn 引理得极大元 $S_{0}$，它在原包含序下极小。',
      ].join('\n\n'),
    },
    {
      id: 'imp.zorn-baer',
      kind: 'implication',
      sources: ['lem.zorn'],
      target: 'thm.baer-criterion',
      title: 'Zorn 引理：Baer 判据的极大延拓',
      proof: [
        '设 $R$ 是含幺环、$I$ 是左 $R$-模，且满足 **Baer 条件**：对每个左理想 $J \\subseteq R$ 与每个 $R$-线性映射 $h : J \\to I$，存在 $x \\in I$ 使 $h(r) = rx$ 对一切 $r \\in J$ 成立。要证 $I$ 内射。',
        '',
        '**第一步：化归。** 按定义，$I$ 内射 $\\iff$ 对每个单射 $A \\hookrightarrow B$ 与每个 $R$-线性 $f : A \\to I$，存在 $R$-线性 $f_{1} : B \\to I$ 使 $f_{1}|_{A} = f$。所以只需对任意包含 $A \\subseteq B$ 与任意 $f : A \\to I$ 造出到 $B$ 的延拓。',
        '',
        '**第二步：Zorn 取极大延拓。** 令',
        '$$\\mathcal{S} := \\{\\, (C, g) : A \\subseteq C \\subseteq B,\\ g : C \\to I\\ \\text{是 } R\\text{-线性映射且 } g|_{A} = f \\,\\},$$',
        '按 $(C, g) \\le (C\', g\') \\iff C \\subseteq C\'$ 且 $g\'|_{C} = g$ 排序。$\\mathcal{S} \\ne \\emptyset$（含 $(A, f)$）。任一链 $\\{(C_{\\alpha}, g_{\\alpha})\\}$ 有上界：令 $C^{*} := \\bigcup_{\\alpha} C_{\\alpha}$、$g^{*}(c) := g_{\\alpha}(c)$（$c \\in C_{\\alpha}$）。良定义：若 $c \\in C_{\\alpha} \\cap C_{\\beta}$，链中必有 $C_{\\alpha} \\subseteq C_{\\beta}$ 或反之，而两个延拓在交集上一致。$g^{*}$ 是 $R$-线性的（运算落在链中某个成员上验证），且 $g^{*}|_{A} = f$，故 $(C^{*}, g^{*})$ 是上界。由 **Zorn 引理** 取极大元 $(A_{0}, f_{0})$。',
        '',
        '**第三步：极大元定义在整个 $B$ 上。** 反设 $A_{0} \\ne B$，取 $b \\in B \\setminus A_{0}$，令',
        '$$J := \\{\\, r \\in R : rb \\in A_{0} \\,\\}, \\qquad h : J \\to I,\\quad h(r) := f_{0}(rb).$$',
        '$J$ 是左理想：$0 \\in J$；$r, r\' \\in J$ 时 $(r - r\')b = rb - r\'b \\in A_{0}$；$s \\in R$ 时 $(sr)b = s(rb) \\in A_{0}$。$h$ 良定义（$rb \\in A_{0}$）且 $R$-线性：$h(r + r\') = h(r) + h(r\')$、$h(sr) = f_{0}(srb) = s f_{0}(rb) = s h(r)$。',
        '',
        '**第四步：用 Baer 条件跳一步。** 由假设，存在 $x \\in I$ 使 $h(r) = rx$（$\\forall r \\in J$）。令 $A_{1} := A_{0} + Rb = \\{\\, a + rb : a \\in A_{0},\\ r \\in R \\,\\}$（$B$ 的 $R$-子模），定义',
        '$$f_{1} : A_{1} \\to I,\\qquad f_{1}(a + rb) := f_{0}(a) + rx.$$',
        '**良定义**：若 $a + rb = a\' + r\'b$，则 $(r - r\')b = a\' - a \\in A_{0}$，故 $r - r\' \\in J$，于是',
        '$$rx - r\'x = (r - r\')x = h(r - r\') = f_{0}((r - r\')b) = f_{0}(a\' - a) = f_{0}(a\') - f_{0}(a),$$',
        '即 $f_{0}(a) + rx = f_{0}(a\') + r\'x$ ✓。**$R$-线性**：$f_{1}(s(a + rb)) = f_{0}(sa) + (sr)x = s f_{0}(a) + s(rx) = s f_{1}(a + rb)$，加法同理 ✓。又 $f_{1}|_{A_{0}} = f_{0}$（取 $r = 0$），故 $(A_{1}, f_{1}) \\in \\mathcal{S}$ 严格大于 $(A_{0}, f_{0})$ —— 与极大性矛盾。',
        '',
        '所以 $A_{0} = B$，$f_{0}$ 就是 $f$ 到 $B$ 的延拓。由于 $A \\hookrightarrow B$ 与 $f$ 任意，$I$ 内射 ✓。∎',
      ].join('\n\n'),
    },
    {
      id: 'imp.zorn-foliation',
      kind: 'implication',
      sources: ['lem.zorn', 'def.involutive-distribution', 'def.integral-manifold'],
      target: 'thm.foliation-existence',
      title: 'Zorn 引理：把局部叶片粘成极大叶',
      proof: '设 $\\mathcal{D}$ 是 $M$ 上的对合 $k$ 阶光滑分布。**局部输入**：对合分布在每点附近有积分流形（Frobenius 定理的 (1)$\\iff$(3)）；本条的职责是把它整体化，这一步当已知。\n\n**第一步：取候选族。** 令\n\n$$\\mathcal{S} := \\{\\, L \\subseteq M : L \\text{ 是连通积分流形，且 } T L = \\mathcal{D}|_{L} \\,\\},$$\n\n按包含排序；$\\mathcal{S} \\ne \\emptyset$（每点附近的局部积分流形都在里面）。\n\n**第二步：链有上界。** 设 $\\{L_{\\alpha}\\}$ 是全序链，$L^{*} := \\bigcup_{\\alpha} L_{\\alpha}$。连通性：递增并仍连通（任两点落在同一成员里）。切空间：$T L^{*} = \\bigcup T L_{\\alpha} = \\mathcal{D}|_{L^{*}}$。光滑性：$L^{*}$ 是浸入子流形的递增并，且链中每个成员都是开浸入子流形，故 $L^{*}$ 仍是浸入子流形。于是 $L^{*} \\in \\mathcal{S}$，是链的上界。\n\n**第三步：Zorn 取极大元。** 由 Zorn 引理得极大元 $L$，即过给定点的极大连通积分流形。\n\n**第四步：叶与叶互不相交。** 设 $L_{1}, L_{2}$ 是两片极大叶且有公共点 $p$。由局部唯一性（同一分布过同一点的两块积分流形在公共点附近重合，这是 Frobenius 平坦坐标的推论），$L_{1} \\cup L_{2}$ 在 $p$ 附近仍是积分流形；两者都连通且交于 $p$，故并连通且是积分流形 —— 与极大性矛盾。所以或 $L_{1} = L_{2}$，或 $L_{1} \\cap L_{2} = \\emptyset$。\n\n**收尾。** 每点属于某片极大叶（第三步），叶两两不交或相等（第四步），故全体叶覆盖 $M$ 并构成叶状结构。∎',
    },
    {
      id: 'imp.ac-tykhonov',
      kind: 'implication',
      sources: ['ax.choice'],
      target: 'thm.tykhonov',
      title: '选择公理：Tychonoff 定理（Alexander 子基引理）',
      proof: [
        '设 $X = \\prod_{i \\in I} X_{i}$，$X_{i}$ 紧。由 Alexander 子基引理，只需验证：每个由**子基**元素（即 $p_{i}^{-1}(U_{i})$，$U_{i} \\subseteq X_{i}$ 开）组成的覆盖都有有限子覆盖。',
        '反设某个子基覆盖 $\\{p_{i}^{-1}(U_{i})\\}$ 没有有限子覆盖。\n\n对每个 $i$，考虑 $X_{i}$ 里的开集族 $\\mathcal{U}_{i} := \\{U_{i} : p_{i}^{-1}(U_{i})\\ \\text{在覆盖里}\\}$。\n\n若某个 $\\mathcal{U}_{i}$ 覆盖 $X_{i}$，则由 $X_{i}$ 紧取出有限子覆盖，对应回 $X$ 就是有限子覆盖 —— 矛盾。\n\n故每个 $\\mathcal{U}_{i}$ 都不覆盖 $X_{i}$，即每层都存在一个「逃出去」的点。',
        '**这一步要用选择公理**：对每个 $i$ 同时挑出一个 $x_{i} \\in X_{i} \\setminus \\bigcup \\mathcal{U}_{i}$（各族非空，但没有统一的规则）。令 $x := (x_{i})_{i \\in I}$。',
        '则 $x$ 不被覆盖里的任何 $p_{i}^{-1}(U_{i})$ 包含（因为 $x_{i} \\notin U_{i}$）—— 与「这是覆盖」矛盾。故 $X$ 紧。',
      ].join('\n\n'),
    },
    {
      id: 'imp.ac-set-projective',
      kind: 'implication',
      sources: ['ax.choice'],
      target: 'def.projective-object',
      title: '选择公理：Set 里每个对象都投射',
      proof: [
        '在 $\\mathbf{Set}$ 里，$X$ 投射 $\\iff$ 每个满射 $f : A \\twoheadrightarrow X$ 都有截面 $s : X \\to A$（$f \\circ s = \\mathrm{id}_{X}$）。',
        '「每个满射都有截面」正是**选择公理**：满射 $f$ 的纤维 $f^{-1}(x)$ 都非空，截面就是在每个纤维里挑一个元素 —— 而这一族挑选没有统一规则。',
        '反过来，给定一族非空集 $\\{A_{i}\\}_{i \\in I}$，把它们拼成满射 $\\bigsqcup_{i} A_{i} \\twoheadrightarrow I$，截面就是一个选择函数。',
        '所以「$\\mathbf{Set}$ 中每个对象投射」与 AC 等价 —— 这条边说的是 AC $\\implies$ 前者，反向也成立（同一次论证）。',
      ].join('\n\n'),
    },
    {
      id: 'imp.ac-presheaf-limits',
      kind: 'implication',
      sources: ['ax.choice'],
      target: 'thm.presheaf-limits-colimits',
      title: '选择公理：Set 的小积存在',
      proof: [
        '要证 $\\mathbf{Set}$ 有所有小极限，只需：有小积 + 有等化子（极限由两者造）。',
        '等化子显然是子集 $\\{a : f(a) = g(a)\\}$。',
        '**小积**：给定一族集合 $\\{A_{i}\\}_{i \\in I}$，乘积 $\\prod_{i} A_{i}$ 是「每个 $i$ 挑一个元素的族」的全体 —— 它**非空**当且仅当每个 $A_{i}$ 非空，而「每层非空 $\\implies$ 元组存在」正是选择公理。',
        '（没有 AC 时，$\\prod_{i} A_{i}$ 仍然**作为集合存在**（它是 $\\mathcal{P}(I \\times \\bigcup A_{i})$ 的子集），但可能是空集 —— 而范畴论的极限要求「顶点集合非空且满足泛性质」，需要元组存在。）',
        '所以「$\\mathbf{Set}$ 完备」这一步用掉 AC；预层范畴的极限逐点构造，故同一 AC 也支撑了 `thm.presheaf-limits-colimits` 的第一句话。',
      ].join('\n\n'),
    },
    {
      id: 'imp.ac-equiv-criterion',
      kind: 'implication',
      sources: ['ax.choice'],
      target: 'thm.equivalence-criterion',
      title: '选择公理：本质满给出的一族同构要一次挑出来',
      proof: [
        '等价判据的证明里，由 $F$ 本质满，对每个 $X\' \\in \\mathcal{D}$ 都存在 $G(X\') \\in \\mathcal{C}$ 与同构 $F(G(X\')) \\cong X\'$。',
        '**要构造函子 $G$**，必须对每个 $X\'$ **同时**挑定一个 $(G(X\'), \\varphi_{X\'})$ —— 而「存在」只逐点给出，没有统一规则。这一步是 AC。',
        '挑定之后，对态射 $f\' : X\' \\to Y\'$，$G(f\')$ 由「$F(G(f\')) = \\varphi_{Y\'}^{-1} \\circ f\' \\circ \\varphi_{X\'}$」唯一确定（$F$ 全忠实）；泛函性随之成立。',
        '所以这条判据的「充分性」方向用到 AC，这也是「范畴等价」在无选择公理的环境里会变形的经典位置。',
      ].join('\n\n'),
    },
    {
      id: 'imp.ac-shrink',
      kind: 'implication',
      sources: ['ax.choice'],
      target: 'lem.shrink',
      title: '选择公理：把指标集良序化后再逐个收缩',
      proof: [
        '收缩引理要对每个 $i \\in I$ 造开集 $V_{i}$ 且维护「去掉 $U_{i}$ 后仍覆盖」这一不变量；逐个处理时，必须能按顺序遍历 $I$。',
        '把 $I$ **良序化**（$\\iff$ AC，见良序定理与选择公理的等价链）后：对 $i$ 逐个处理，用正规性（或仿紧性的局部有限加细）在剩余覆盖里为这点挑一个更小的闭包 $\\mathrm{cl} V_{i} \\subseteq U_{i}$，并保持覆盖 —— 超限归纳可行，是因为每个 $i$ 只有前驱已定。',
        '没有良序（或没有某种选择），「逐个」这一步没有意义：$I$ 可能是不可良序化的（在 ZF 里无法保证）。',
      ].join('\n\n'),
    },
  ],
});
