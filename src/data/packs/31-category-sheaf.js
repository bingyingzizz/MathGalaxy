/* ==========================================================================
   内容包 · 层与拓扑（19 条）
   --------------------------------------------------------------------------
   第七团：筛 → 预拓扑 → Grothendieck 拓扑 → 层 → Čech 函子 → 层化
   → 景的层范畴的好性质 → 标准拓扑。

   依赖顺序：拓扑（＝一族覆盖筛）说「什么算覆盖」，层说「在覆盖上能不能粘」，
   Čech 函子与层化把预层改造成层，最后一批性质为拓扑斯铺路。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '层与拓扑',
  nodes: [

    /* ---------------------------------------------------------- 筛 */
    {
      id: 'def.sieve',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '筛',
      title: '筛',
      regions: ['category'],
      tags: ['范畴论', '筛', '覆盖'],
      statement: [
        '设 $X \\in \\mathcal{C}$。$X$ 上的**筛**是预层 $h_{X} = \\operatorname{Hom}_{\\mathcal{C}}(-, X)$ 的一个子函子 $R \\subseteq h_{X}$：对每个 $X\'$ 给一个子集 $R(X\') \\subseteq \\operatorname{Hom}_{\\mathcal{C}}(X\', X)$，使得只要 $f \\in R(X\')$，任何 $g : X\'\' \\to X\'$ 都满足 $f \\circ g \\in R(X\'\')$。',
        '',
        '一族态射 $(f_{i} : X_{i} \\to X)_{i \\in I}$ **生成的筛**是',
        '',
        '$$S = \\{\\, g : Y \\to X \\ \\mid\\ \\exists i,\\ \\exists h : Y \\to X_{i},\\ g = f_{i} \\circ h \\,\\}$$'
      ].join('\n'),
      notes: '直觉：**$X$ 上一族「允许的映射」，而且凡是能再往下接的都算进来**。所以筛不是随便一族箭头，它「对预复合封闭」—— 这正是一个子函子该有的样子。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ------------------------------------------------------ 预拓扑 */
    {
      id: 'def.pretopology',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '预拓扑',
      title: '预拓扑',
      regions: ['category'],
      tags: ['范畴论', '预拓扑', '覆盖'],
      statement: [
        '范畴 $\\mathcal{C}$ 上的**预拓扑**是对每个 $X$ 指定一族**覆盖族** $\\operatorname{Cov}(X)$（每个元素是一族态射 $(X_{i} \\to X)_{i \\in I}$），满足：',
        '',
        '1. **同构是覆盖**：任何同构 $X\' \\to X$ 都在 $\\operatorname{Cov}(X)$ 中；',
        '2. **拉回稳定**：若 $(X_{i} \\to X)_{i \\in I} \\in \\operatorname{Cov}(X)$，则对任意 $f : Y \\to X$，',
        '',
        '$$\\bigl(\\, X_{i} \\times_{X} Y \\to Y \\,\\bigr)_{i \\in I} \\in \\operatorname{Cov}(Y)$$',
        '',
        '3. **传递**：若 $(X_{i} \\to X)_{i \\in I} \\in \\operatorname{Cov}(X)$ 且对每个 $i$ 有 $(X_{ij} \\to X_{i})_{j \\in J_{i}} \\in \\operatorname{Cov}(X_{i})$，则 $(X_{ij} \\to X)_{i \\in I, j \\in J_{i}} \\in \\operatorname{Cov}(X)$。'
      ].join('\n'),
      notes: '三条读成一句话：**同构是覆盖、覆盖能拉回、覆盖的覆盖还是覆盖**。\n\n例：在 $\\mathbf{Set}$ 上取 $\\operatorname{Cov}(X) = \\{(X_{i} \\to X) : X = \\bigcup_{i} X_{i}\\}$，三条都成立 —— 这就是「覆盖」两个字的原型。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* --------------------------------------- Grothendieck 拓扑 / 景 */
    {
      id: 'def.grothendieck-topology',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: 'Grothendieck 拓扑',
      title: 'Grothendieck 拓扑与景',
      regions: ['category'],
      tags: ['范畴论', '拓扑', '景'],
      statement: [
        '范畴 $\\mathcal{C}$ 上的 **Grothendieck 拓扑**是对每个 $X$ 指定一族**覆盖筛** $J(X)$，满足：',
        '',
        '1. $h_{X} \\in J(X)$；',
        '2. **拉回稳定**：$R \\in J(X)$、$f : Y \\to X$ $\\implies$ $f^{*}(R) := R \\times_{h_{X}} h_{Y} \\in J(Y)$；',
        '3. **传递**：$R, R\' \\subseteq h_{X}$，若 $R\' \\in J(X)$ 且对每个 $f \\in R\'(Y)$ 有 $f^{*}(R) \\in J(Y)$，则 $R \\in J(X)$。',
        '',
        '带 Grothendieck 拓扑的范畴叫 **景**。'
      ].join('\n'),
      notes: [
        '$J(X)$ 在所有筛的偏序集上构成一个**滤子**：非空；对交封闭（$R, R\' \\in J(X) \\implies R \\cap R\' \\in J(X)$）；对更大的筛封闭（$R \\subseteq R\'$、$R \\in J(X) \\implies R\' \\in J(X)$）。合起来就是「$J(X)$ 里有一堆「够大」的筛」。',
        '由预拓扑可以生成拓扑：把每个覆盖族换成它生成的筛，再取全部这样的筛。**拓扑比预拓扑更一般** —— 预拓扑要求那些纤维积存在，而在预层范畴里筛的拉回总是存在的。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ---------------------------------------------------------- 层 */
    {
      id: 'def.sheaf',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '层',
      title: '层与分离预层',
      regions: ['category'],
      tags: ['范畴论', '层', '粘合'],
      statement: [
        '设 $\\mathcal{C}$ 是景，$F : \\mathcal{C}^{\\mathrm{op}} \\to \\mathbf{Set}$ 是预层。',
        '',
        '- $F$ 叫**分离的**，如果对每个 $X$ 与每个 $R \\in J(X)$，限制映射',
        '',
        '$$\\operatorname{Hom}(h_{X}, F) \\longrightarrow \\operatorname{Hom}(R, F)$$',
        '',
        '是**单射**；',
        '- $F$ 叫**层**，如果这个映射是**双射**。'
      ].join('\n'),
      notes: [
        '用米田引理 $\\operatorname{Hom}(h_{X}, F) \\cong F(X)$，可以把这个定义读成两句话：左边是 $F(X)$（整体截面），右边是「沿 $R$ 的一族相容截面」：',
        '',
        [
          '- **单射 = 分离公理**：两个整体截面若在 $R$ 上一致，就必定相等；',
          '- **双射 = 粘合公理**：任何一族相容截面都能**唯一**地拼成整体截面。',
        ].join('\n'),
        '',
        '在拓扑空间的老写法里（$\\mathcal{C} = \\operatorname{Open}(X)^{\\mathrm{op}}$），这两条就是：$s|_{U_{i}} = t|_{U_{i}}$ 处处成立则 $s = t$；以及局部截面 $s_{i}$ 在交叠处一致时能拼出整体截面。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* -------------------------------------------------- 层的下降条件 */
    {
      id: 'thm.sheaf-descent',
      cluster: 'cat.sheaf',
      type: 'theorem',
      label: '层的下降条件',
      title: '用覆盖族检验层',
      regions: ['category'],
      tags: ['范畴论', '层', '正合列'],
      statement: [
        '设 $\\mathcal{C}$ 带预拓扑。预层 $F$ 是层 $\\iff$ 对每个 $X$ 与每个覆盖族 $(X_{i} \\to X)_{i \\in I}$，序列',
        '',
        '$$F(X) \\longrightarrow \\prod_{i \\in I} F(X_{i}) \\overset{\\alpha}{\\underset{\\beta}{\\rightrightarrows}} \\prod_{i, j \\in I} F(X_{i} \\times_{X} X_{j})$$',
        '',
        '正合，即 $F(X) \\cong \\ker(\\alpha - \\beta)$，其中',
        '',
        '$$\\alpha\\bigl((s_{i})_{i}\\bigr) = \\bigl(s_{i}|_{X_{i} \\times_{X} X_{j}}\\bigr)_{i,j}, \\qquad \\beta\\bigl((s_{i})_{i}\\bigr) = \\bigl(s_{j}|_{X_{i} \\times_{X} X_{j}}\\bigr)_{i,j}$$'
      ].join('\n'),
      notes: [
        '这就是教科书里那两条：**单态** $F(X) \\hookrightarrow \\prod_{i} F(X_{i})$ 是**分离公理**，**等于核**是**粘合公理**（相容族恰好是整体截面的像）。',
        '把交叠条件写成 $X_{i} \\times_{X} X_{j}$ 上的一致性是关键 —— 「两块覆盖在重叠部分的限制相同」这句话，在一般范畴里没有交叠可用，只有纤维积。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* -------------------------------------------------- Čech 函子 */
    {
      id: 'def.cech-functor',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: 'Čech 函子',
      title: 'Čech 函子（Čech Functor）',
      regions: ['category'],
      tags: ['范畴论', '层化', '滤过余极限'],
      statement: [
        '景 $\\mathcal{C}$ 上的 **Čech 函子** $\\widehat{H}$ 定义在预层上：',
        '',
        '$$\\widehat{H}(T)(X) \\;:=\\; \\varinjlim_{R \\in J(X)} \\operatorname{Hom}(R, T)$$',
        '',
        '（因为 $J(X)$ 是滤子，这是一个**滤过余极限**。）由 $h_{X} \\in J(X)$ 与 $\\operatorname{Hom}(h_{X}, T) \\cong T(X)$，得到自然映射 $T \\to \\widehat{H}(T)$。'
      ].join('\n'),
      notes: '「沿越来越大的覆盖筛取极限」在 $T$ 这一侧翻成了余极限 —— 因为 $\\operatorname{Hom}(-, T)$ 是**反变**的，反变函子沿滤子取极限等于共变函子的滤过余极限。$\\widehat{H}$ 是把预层朝层的方向推一把的第一步。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ------------------------------------------------ Čech 函子的性质 */
    {
      id: 'prop.cech-properties',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: 'Čech 函子的性质',
      title: 'Čech 函子的三条性质',
      regions: ['category'],
      tags: ['范畴论', '层化', '左正合'],
      statement: [
        '1. $\\widehat{H}$ **左正合**（保有限极限）；',
        '2. $T$ 是预层 $\\implies$ $\\widehat{H}(T)$ **分离**；$T$ 分离 $\\implies$ $\\widehat{H}(T)$ 是**层**；',
        '3. $T$ 是分离的（层）$\\iff$ $T \\to \\widehat{H}(T)$ 是单态射（同构）。'
      ].join('\n'),
      notes: [
        ['**证明。** 记 $\\widehat{H}(T) := \\varinjlim_{(X_{i}\\to X)}\\check{H}^{0}\\bigl((X_{i}),T\\bigr)$，其中 $\\check{H}^{0}$ 是 $\\prod_{i}T(X_{i}) \\rightrightarrows \\prod_{i,j}T(X_{i}\\times_{X}X_{j})$ 的等化子。','**1.（左正合）** $T \\mapsto \\check{H}^{0}((X_{i}),T)$ 只用到 $T$ 的取值与拉回，是有限极限（积 + 等化子）的复合，故保有限极限；而 $\\mathbf{Set}$ 里的**滤过余极限正合**（与有限极限交换）✓。两者合起来给出 $\\widehat{H}$ 左正合 ✓。','**2.（分离 / 层）** $\\widehat{H}(T)(X)$ 的元素是「某个覆盖上的相容族」，两个元素相等 $\\iff$ 存在公共细化使它们在那上面一致（滤过性）。于是：若它们在某个覆盖的每支上相等，则在该覆盖上就已经相等，故 $\\widehat{H}(T) \\to \\prod_{i}\\widehat{H}(T)(X_{i})$ 单 —— 即 $\\widehat{H}(T)$ **分离** ✓。进一步，若 $T$ 分离，任何 $\\widehat{H}(T)$ 上的相容族可以逐层提升到 $T$（分离性保证提升唯一），从而粘成 $\\widehat{H}(T)$ 的一个元素，故 $\\widehat{H}(T)$ 是**层** ✓。','**3.（与嵌入的关系）** 由 $\\check{H}^{0}$ 是等化子，$T(X) \\to \\widehat{H}(T)(X)$ 总是单 $\\iff$ 「$T$ 上两个元素若在某个覆盖上一致则相等」，即 $T$ 分离 ✓；这个映射还是满的 $\\iff$ 每个相容族都能粘合，即 $T$ 是层 ✓。于是 $T$ 分离 $\\iff T \\to \\widehat{H}(T)$ 单、$T$ 是层 $\\iff$ 它是同构 ✓。∎'].join('\n'),
'1 的理由很短：$\\operatorname{Hom}(-, T)$ 保极限，而**滤过余极限左正合**。3 说明「分离」与「层」的差别就是「$T$ 在 $\\widehat{H}$ 里是不是已经到顶了」—— 于是「做两次 $\\widehat{H}$」这件事有了明确的意义。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* -------------------------------------------------------- 层化 */
    {
      id: 'thm.sheafification',
      cluster: 'cat.sheaf',
      type: 'theorem',
      label: '层化',
      title: '层化：层范畴是预层范畴的反射子范畴',
      regions: ['category'],
      tags: ['范畴论', '层化', '反射'],
      statement: [
        '层范畴是预层范畴的**反射子范畴**，反射',
        '',
        '$$\\sharp : \\widehat{\\mathcal{C}} \\longrightarrow \\widehat{\\mathcal{C}}, \\qquad T \\mapsto T^{\\sharp}$$',
        '',
        '叫 **sheafification**（层化）：对每个层 $F$，',
        '',
        '$$\\operatorname{Hom}_{\\widehat{\\mathcal{C}}}\\bigl(T^{\\sharp},\\ F\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\widehat{\\mathcal{C}}}\\bigl(T,\\ F\\bigr)$$',
        '',
        '并且它是**幂等**的：$(T^{\\sharp})^{\\sharp} \\cong T^{\\sharp}$。具体地，$T^{\\sharp}$ 取「对预层做两次 Čech 构造」。'
      ].join('\n'),
      notes: [
        '推论：',
        '',
        [
          '1. **层范畴里的极限就是在预层范畴里算的**（反射子范畴对极限封闭）；',
          '2. $T \\mapsto T^{\\sharp}$ **保所有余极限与有限极限**。',
        ].join('\n'),
        '',
        '例：',
        '',
        [
          '- 取**最粗**拓扑（$J(X) = \\{h_{X}\\}$）时每个预层都是层，$\\sharp$ 是恒等；取**最细**拓扑（$J(X) = $ 一切筛）时层范畴只剩一个对象，即常数预层 $\\mathbf{1}$。',
          '- 常数预层（每个开集上取同一个集合 $E$）的层化叫**常数层**。',
          '- 拓扑空间 $X$ 上取 $\\mathcal{C} = \\operatorname{Open}(X)$，得到的就是通常的层范畴，$\\sharp$ 就是通常的层化函子。',
        ].join('\n'),
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* -------------------------------------------------- 正则满态射 */
    {
      id: 'def.regular-epi',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '正则满态射',
      title: '正则满态射',
      regions: ['category'],
      tags: ['范畴论', '满态射', '余等化子'],
      statement: [
        '态射 $f : X \\to Y$ 叫**正则满态射**，如果它是某个平行对的**余等化子**：存在 $u, v : W \\rightrightarrows X$ 使 $f = \\operatorname{coker}(u, v)$。'
      ].join('\n'),
      notes: '在 $\\mathbf{Set}$ 里**每个满射都是正则的**：取 $W = X \\times_{Y} X$ 与两个投影，它们的余等化子正是 $f$。在一般范畴里不然 —— 「满」（右可消）比「正则满」弱得多，差的那部分正是「$Y$ 是不是真的由 $X$ 商出来的」。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ---------------------------------------------------- 万有性 */
    {
      id: 'def.universal-colimit',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '万有关系',
      title: '万有余极限、万有满态射、不交余积',
      regions: ['category'],
      tags: ['范畴论', '万有', '余积'],
      statement: [
        '1. 余极限 $X = \\varinjlim_{i} X_{i}$ 叫**万有的**，如果对任意 $X \\to Y$ 与 $Y\' \\to Y$，',
        '',
        '$$X \\times_{Y} Y\' \\;\\cong\\; \\varinjlim_{i} \\bigl(X_{i} \\times_{Y} Y\'\\bigr)$$',
        '',
        [
          '2. 正则满态射 $f : X \\to Y$ 叫**万有的**，如果对任意 $Y\' \\to Y$，拉回 $f \\times_{Y} Y\'$ 仍是正则满态射；',
          '3. 余积 $X = \\coprod_{i \\in I} X_{i}$ 叫**不交的**，如果 (a) 每个 $X_{i} \\to X$ 是单态射，(b) $i \\ne j$ 时 $X_{i} \\times_{X} X_{j}$ 是始对象。',
        ].join('\n'),
        '',
        '有效等价关系叫**万有的**，如果它的商映射是万有正则满态射。'
      ].join('\n'),
      notes: '「万有」= **拉回之后还在**：不管把整个图沿什么映射拉回去，性质都保持。这三条是把「集合里那些显然的好性质」翻译成范畴语言的样板 —— 它们在 $\\mathbf{Set}$ 里不出问题，但换一个范畴就未必，所以必须写下来。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* -------------------------------------------- 景的层范畴的好性质 */
    {
      id: 'prop.site-properties',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '景的层范畴的好性质',
      title: 'Grothendieck 拓扑下的层范畴',
      regions: ['category'],
      tags: ['范畴论', '层', '预拓扑斯'],
      statement: [
        '若 $\\mathcal{C}$ 是景，则层范畴 $\\widehat{\\mathcal{C}}$ 中所有极限与余极限存在，并且：',
        '',
        '1. 余极限是**万有**的；',
        '2. **滤过余极限正合**；',
        '3. 满态射都是**正则的**且**万有**的；',
        '4. 余积是**不交**的；',
        '5. 等价关系是**有效的**且**万有**的。'
      ].join('\n'),
      notes: '理由一句话：**这些性质在 $\\mathbf{Set}$ 里成立，而层范畴里的构造逐点继承 $\\mathbf{Set}$ 的性质**，再配合层化保有限极限与余极限。第 3 条尤其值得记：在这里「满 = 正则满」是自动的，不必额外假设 —— 这正是后面预拓扑斯公理里那一条的来源。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ------------------------------------------------ 层中单满即同构 */
    {
      id: 'prop.sheaf-mono-epi-iso',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '层中单满即同构',
      title: '层里的单满分解',
      regions: ['category'],
      tags: ['范畴论', '层', '分解'],
      statement: [
        '设 $u : F \\to G$ 是层之间的态射。则：',
        '',
        '1. 若 $u$ 既是单态射又是满态射，则 $u$ 是同构；',
        '2. $u$ 有**唯一的**满-单分解：存在唯一的 $I$ 使 $u = F \\twoheadrightarrow I \\rightarrowtail G$。'
      ].join('\n'),
      notes: [
        ['**证明。** 设 $u : F \\to G$ 是层之间的态射。','**1.** 设 $u$ 既单又满。由满性（层中满态射的**局部**判据），对 $1_{G} \\in G(G)$ 存在覆盖 $(G_{i}\\to G)$ 与 $t_{i}\\in F(G_{i})$ 使 $u(t_{i}) = 1_{G}|_{G_{i}}$。在双重拉回 $G_{i}\\times_{G}G_{j}$ 上，$t_{i}$ 与 $t_{j}$ 的像都等于 $1_{G}$ 的限制，由 $u$ 单得 $t_{i}|= t_{j}|$ —— 相容 ✓。层条件给唯一的 $v \\in F(G)$ 与 $v|_{G_{i}} = t_{i}$，于是 $u(v) = 1_{G}$（两边在覆盖上一致，层分离）。又 $u(v u) = u$，而 $u$ 单 $\\implies v u = 1_{F}$。故 $u$ 同构 ✓。','**2.** 像分解：拓扑斯里每个态射都有 (满, 单) 分解（像 $= $ 层化后的余等化子）。设 $u = m e$ 与 $u = m\' e\'$ 是两个这样的分解。由 $m e = m\' e\'$ 与满-单的泛性，$e\'$ 通过 $e$ 分解（$e$ 满、$m\'$ 单，用「满 $\\implies$ 左消去」得唯一分解），对称地 $e$ 通过 $e\'$ 分解，两个分解互相比较得 $I \\cong I\'$ ✓。∎'].join('\n'),
'这两条在 $\\mathbf{Set}$ 里也对，但在层范畴里**不是自动的**，要证。它们恰好就是**预拓扑斯（pretopos）**公理的内容 —— 所以这个位置正是从「层」走向「拓扑斯」的接口。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ------------------------------------------ 层的满态射的局部判据 */
    {
      id: 'prop.sheaf-epi-criterion',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '满态射的局部判据',
      title: '层中满态射的局部刻画',
      regions: ['category'],
      tags: ['范畴论', '层', '满态射'],
      statement: [
        '设 $\\mathcal{C}$ 带预拓扑。层的态射 $u : F \\to G$ 是满态射 $\\iff$ 对每个 $X \\in \\mathcal{C}$ 与每个 $s \\in G(X)$，存在覆盖 $(X_{i} \\to X)_{i \\in I}$ 使',
        '',
        '$$s|_{X_{i}} \\in \\operatorname{im}\\bigl(F(X_{i}) \\to G(X_{i})\\bigr) \\qquad (\\forall i \\in I)$$'
      ].join('\n'),
      notes: [
        ['**证明。**','- **$(\\implies)$** 设 $u : F \\to G$ 是满态射。任取 $X$ 与 $s \\in G(X)$，即 $s : h_{X} \\to G$。取拉回','$$\\begin{array}{ccc} h_{X}\\times_{G}F & \\xrightarrow{\\ \\ } & F\\\\ \\big\\downarrow & & \\big\\downarrow{\\scriptstyle u}\\\\ h_{X} & \\xrightarrow{\\ s\\ } & G\\end{array}$$','底边 $u$ 满 $\\implies$ 左边那条也是满态射（拓扑斯里满态射沿任意态射拉回仍满），即 $h_{X}\\times_{G}F \\to h_{X}$ 是**覆盖**；取它的一族可表示层覆盖 $(X_{i}\\to X)$，则每支给出 $s|_{X_{i}}$ 在 $F(X_{i})$ 里的一个原像 ✓。','- **$(\\Longleftarrow)$** 设条件成立，取像分解 $u = m\\,e$（$e$ 满、$m : I \\rightarrowtail G$ 单）。条件说：对每个 $X$、每个 $s \\in G(X)$，存在覆盖使 $s|_{X_{i}}$ 落在 $\\operatorname{im}u \\subseteq \\operatorname{im}m = I$ 里。而单态射是同构 $\\iff$ 它的像在每个 $X$ 上被覆盖局部地盖住（子对象相等的局部判据）。故 $m$ 是同构，$u = m e$ 满 ✓。∎','一句话：**层的满态射就是「局部满」。**'].join('\n'),
'一句话：**层的满态射是「局部满」**。整体上 $s$ 可能没有原像，但总能把 $X$ 切成一层覆盖，每块上都有原像 —— 这是「层上只有局部信息」最典型的体现。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ---------------------------------------------------- 有效等价关系 */
    {
      id: 'def.effective-equivalence',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '有效等价关系',
      title: '有效等价关系',
      regions: ['category'],
      tags: ['范畴论', '等价关系', '商'],
      statement: [
        '对象 $X$ 上的**等价关系**是一个图 $R \\rightrightarrows X$，使得对每个 $Y$，$\\operatorname{Hom}(Y, R) \\to \\operatorname{Hom}(Y, X) \\times \\operatorname{Hom}(Y, X)$ 是等价关系（在 $\\mathbf{Set}$ 里取）。',
        '',
        '它叫**有效的**，如果',
        '',
        '$$R \\;\\cong\\; X \\times_{\\overline{X}} X, \\qquad \\overline{X} := \\operatorname{coker}(R \\rightrightarrows X)$$',
        '',
        '即 $R$ 恰好就是商映射的核对。'
      ].join('\n'),
      notes: '「有效」说的是**商没有多粘**：先取等价关系再取商、然后再看商映射的核对，回到原来的等价关系。\n\n对照集合：任意 $f : X \\to Y$ 给出的核对 $X \\times_{Y} X$ 一定是有效的（$\\overline{X} \\cong \\operatorname{im} f$）；反过来任意等价关系 $R \\subseteq X \\times X$ 取 $\\overline{X} = X/R$ 也总是回到 $R$。**在 $\\mathbf{Set}$ 里人人都有效**，但在一般范畴里这是要额外要求的一条。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ---------------------------------------------- 层化与等价关系 */
    {
      id: 'prop.sheafify-equivalence',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '层化与等价关系交换',
      title: '层化保持等价关系与商',
      regions: ['category'],
      tags: ['范畴论', '层化', '等价关系'],
      statement: [
        '若 $R$ 是预层 $T$ 上的等价关系，则层化之后 $R^{\\sharp}$ 是 $T^{\\sharp}$ 上的等价关系，并且',
        '',
        '$$\\bigl(T/R\\bigr)^{\\sharp} \\;\\cong\\; T^{\\sharp} / R^{\\sharp}$$'
      ].join('\n'),
      notes: [
        ['**证明。** 记层化为 $(-)^{\\sharp}$：它是到层范畴的反射，故左伴随。','- 左伴随保**余极限** ✓；它同时又**左正合**（保有限极限，因为拓扑斯都是左正合的）✓。','- **等价关系的条件都是有限极限条件**：$R \\rightrightarrows T$ 是等价关系 $\\iff$ 存在 $R \\to T\\times T$ 使其为单态射（自反、对称、传递三条用对角、交换与拉回表达）。层化保这些有限极限，故 $R^{\\sharp} \\rightrightarrows T^{\\sharp}$ 仍是等价关系 ✓。','- **商是余等化子**：$T/R := \\operatorname{coeq}(R \\rightrightarrows T)$，是余极限，故 $(T/R)^{\\sharp} \\cong \\operatorname{coeq}(R^{\\sharp}\\rightrightarrows T^{\\sharp}) = T^{\\sharp}/R^{\\sharp}$ ✓。','两件事合起来就是「先商再层化 $=$ 先层化再商」✓。∎'].join('\n'),
'「先取商再层化」与「先层化再取商」结果一样 —— 这类交换性是层化「保余极限」的具体面貌（商是余等化子，是余极限）。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ---------------------------------------------------- 标准拓扑 */
    {
      id: 'def.canonical-topology',
      cluster: 'cat.sheaf',
      type: 'definition',
      label: '标准拓扑',
      title: '标准拓扑与次标准拓扑',
      regions: ['category'],
      tags: ['范畴论', '标准拓扑', '次标准'],
      statement: [
        '在任何范畴 $\\mathcal{C}$ 上，存在**最细**的拓扑使得所有可表示预层都是层：规定 $X$ 上的筛 $R$ 是覆盖筛，当且仅当',
        '',
        '$$\\forall f : Y \\to X,\\ \\forall Z \\in \\mathcal{C}, \\qquad \\operatorname{Hom}_{\\mathcal{C}}(Y, Z) \\;\\cong\\; \\operatorname{Hom}\\bigl(f^{-1}(R),\\ h_{Z}\\bigr)$$',
        '',
        '这个拓扑叫 $\\mathcal{C}$ 上的**标准拓扑**。比标准拓扑**粗**的拓扑叫**次标准的**（subcanonical）。'
      ].join('\n'),
      notes: [
        '等价刻画（把「次标准」一次说清）：',
        '',
        '$$\\text{次标准} \\iff \\text{可表示预层都是层} \\iff X^{\\sharp} = h_{X}\\ (\\forall X) \\iff \\text{米田嵌入经过层范畴仍然全忠实}$$',
        '',
        '所以「次标准」= **层范畴仍然看得见原来的范畴**。反过来，标准拓扑就是「能看见 $\\mathcal{C}$ 的前提下的最细拓扑」。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* --------------------------------------------- 覆盖筛与余积满射 */
    {
      id: 'prop.covering-sieve-epi',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '覆盖筛即余积满射',
      title: '覆盖族生成覆盖筛 $\\iff$ 余积满射',
      regions: ['category'],
      tags: ['范畴论', '覆盖', '余积'],
      statement: [
        '族 $(X_{i} \\to X)_{i \\in I}$ 生成一个**覆盖筛** $\\iff$ 余积 $\\coprod_{i \\in I} X_{i} \\to X$ 是**满态射**（在 $\\mathcal{C}$ 中）。'
      ].join('\n'),
      notes: '这把一件看起来属于「拓扑」的事（什么算覆盖）翻译成一句纯范畴的话（余积是不是满射）。从此「$\\{X_{i} \\to X\\}$ 覆盖 $X$」与「$\\coprod_{i} X_{i} \\to X$ 满」可以随意换着用。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    },

    /* ------------------------------------------ 不交万有余积与次标准 */
    {
      id: 'prop.disjoint-universal',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '不交万有余积与次标准拓扑',
      title: '不交万有余积在次标准拓扑下不变',
      regions: ['category'],
      tags: ['范畴论', '余积', '次标准'],
      statement: [
        '设 $\\mathcal{C}$ 有有限极限。则 $X = \\coprod_{i \\in I} X_{i}$ 在 $\\mathcal{C}$ 中是**不交的万有余积** $\\iff$ 对任何（等价地：某一个）**次标准拓扑**，它作为层范畴中的余积仍然不交、万有。'
      ].join('\n'),
      notes: [
        ['**证明。** 记次标准拓扑下的层化为 $(-)^{\\sharp}$，此时可表示预层都是层：$h_{X}^{\\sharp} = h_{X}$。','**$(\\implies)$** 设 $X = \\coprod_{i}X_{i}$ 在 $\\mathcal{C}$ 里不交、万有。Yoneda 嵌入保余积，故 $h_{X} \\cong \\coprod_{i}h_{X_{i}}$，两边都是层，即这个余积在层范畴里就被算出来了 ✓。不交：层范畴的余积逐点算，$\\coprod_{i}h_{X_{i}}$ 的注入都来自 $\\mathcal{C}$ 里的注入，两两拉回是 $h_{0}$（始对象）✓。万有：沿任意 $Z \\to h_{X}$ 的拉回逐点验，落在 $\\mathcal{C}$ 里就是原来的万有性 ✓。','**$(\\Longleftarrow)$** 设某个次标准拓扑下 $h_{X} = \\coprod_{i}h_{X_{i}}$ 不交、万有。逐点（对每个 $Z \\in \\mathcal{C}$）展开：不交给 $\\operatorname{Hom}(Z,X) = \\coprod_{i}\\operatorname{Hom}(Z,X_{i})$ 的不交并；万有给「沿 $Z\' \\to Z$ 拉回保持它」。取 $Z = X$ 与 $1_{X}$ 读出 $X_{i}\\to X$ 的注入性，取 $Z = X_{i}\\times_{X}X_{j}$ 读出两两拉回是始对象，再取任意 $Z$ 得万有性，逐条搬回 $\\mathcal{C}$ ✓。','**结论：标准拓扑恰好把 $\\mathcal{C}$ 里成立的余积性质原样保留，不多也不少。**∎'].join('\n'),
'一个方向：次标准保证 $X = h_{X}$、$X_{i} = h_{X_{i}}$ 都在层范畴里，而 $\\coprod_{i} h_{X_{i}}$ 本来就不交，所以自动是层。另一个方向：拿 $h_{X} = \\coprod_{i} h_{X_{i}}$ 去逐条验注入性与「拉回是始对象」。\n\n含义：**标准拓扑恰好把 $\\mathcal{C}$ 里成立的那部分余积性质原样保留下来**，不多也不少 —— 这就是「次标准」这个名字该有的分量。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.1–3.2']
    }
  ],

  edges: [

    /* ------------------------------------------- 层 = 下降条件正合 */
    {
      id: 'imp.sheaf-descent',
      kind: 'implication',
      sources: ['def.sheaf', 'def.pretopology', 'def.sieve'],
      target: 'thm.sheaf-descent',
      title: '预拓扑下的层 $\\iff$ 正合列',
      proof: [
        '设覆盖族 $(X_{i} \\to X)_{i \\in I}$ 生成的筛是 $R$。按定义，$R$ 的截面是那些能「穿过某个 $X_{i}$」的映射：',
        '',
        '$$R(Y) = \\{\\, f : Y \\to X \\ \\mid\\ \\exists i,\\ \\exists h : Y \\to X_{i},\\ f = f_{i} \\circ h \\,\\}$$',
        '',
        '而 $R$ 作为预层，是那些 $h_{Y}$ 沿 $(Y \\to X_{i})_{i}$ 的余极限 —— 换句话说',
        '',
        '$$R \\;\\cong\\; \\varinjlim_{i} h_{X_{i}}$$',
        '',
        '（指标是这个覆盖族，余极限在预层范畴里取。）于是：',
        '',
        '$$\\operatorname{Hom}(R, F) \\;\\cong\\; \\operatorname{Hom}\\Bigl(\\varinjlim_{i} h_{X_{i}},\\ F\\Bigr) \\;\\cong\\; \\varprojlim_{i} \\operatorname{Hom}(h_{X_{i}}, F) \\;\\cong\\; \\varprojlim_{i} F(X_{i})$$',
        '',
        '最后一步是米田引理。**在 $\\mathbf{Set}$ 里，这个极限就是「每个 $F(X_{i})$ 里取一个元素」**，即 $\\operatorname{Hom}(R, F) = \\prod_{i} F(X_{i})$。',
        '',
        '但这样只用到「$F$ 限制到每一块上」的信息，还没有把「两块在交叠处一致」写进来。要做这件事，就看 $R$ 的两条「投影」：把每个 $f_{i}$ 沿两条腿拉到 $X_{i} \\times_{X} X_{j}$ 上，得到两个映射',
        '',
        '$$\\prod_{i} F(X_{i}) \\overset{\\alpha}{\\underset{\\beta}{\\rightrightarrows}} \\prod_{i,j} F(X_{i} \\times_{X} X_{j}), \\qquad \\alpha((s_{i})_{i}) = (s_{i}|_{X_{i}\\times_{X}X_{j}}),\\quad \\beta((s_{i})_{i}) = (s_{j}|_{X_{i}\\times_{X}X_{j}})$$',
        '',
        '相容族恰好是 $\\ker(\\alpha - \\beta)$ —— 即「$i$ 限制到交叠」与「$j$ 限制到交叠」结果一样。于是「层的双射条件」变成',
        '',
        '$$F(X) \\;\\cong\\; \\ker(\\alpha - \\beta)$$',
        '',
        '**（$\\implies$）** 层给出 $\\operatorname{Hom}(h_{X}, F) \\cong \\operatorname{Hom}(R, F)$，两边用米田与上面的计算展开就是所要的正合。**（$\\Longleftarrow$）** 反过来，正合序列给出的那个 $\\ker$ 与 $F(X)$ 的同构，对所有由覆盖族生成的筛 $R$ 成立；而每个 $R \\in J(X)$ 都由某个覆盖族生成，所以对一切 $R \\in J(X)$ 都有 $F(X) \\cong \\operatorname{Hom}(R, F)$，即 $F$ 是层。∎',
        '',
        '⚠️ 细看上面 $\\alpha, \\beta$ 的定义：$\\operatorname{Hom}(R, F)$ 里的相容性条件要通过 $R$ 的**态射结构**（两个投影 $X_{i} \\times_{X} X_{j} \\rightrightarrows X_{i}$）才能写下来，这正是为什么必须用**纤维积**而不是「交」。'
      ].join('\n'),
      note: '这条把「层」这个抽象定义落到可以逐项验证的形状：**一串截面、两个限制映射、取核**。实际验层时走的都是这一条。'
    },

    /* -------------------------------------------------- 层化那条 */
    {
      id: 'imp.sheafification',
      kind: 'implication',
      sources: ['def.cech-functor', 'prop.cech-properties'],
      target: 'thm.sheafification',
      title: 'Čech 函子做两次 $\\implies$ 层化',
      proof: [
        '记 $\\sharp := \\widehat{H} \\circ \\widehat{H}$。',
        '',
        '**落到层上。** 对任意预层 $T$，$\\widehat{H}(T)$ 是**分离**的；再对分离的 $\\widehat{H}(T)$ 用一次，得到的 $\\widehat{H}(\\widehat{H}(T))$ 是**层**（Čech 函子的性质 2）。所以 $T^{\\sharp}$ 总是层。∎',
        '',
        '**从层出发不动。** 设 $F$ 是层。由性质 3（$F$ 是层 $\\iff F \\to \\widehat{H}(F)$ 是同构）得 $\\widehat{H}(F) \\cong F$，再做一次仍得到 $F$。所以 $\\sharp$ 在层上是恒等 —— 这就是**幂等性** $(T^{\\sharp})^{\\sharp} \\cong T^{\\sharp}$。∎',
        '',
        '**伴随性。** 要证 $\\operatorname{Hom}(T^{\\sharp}, F) \\cong \\operatorname{Hom}(T, F)$（$F$ 是层）。先证 $\\operatorname{Hom}(\\widehat{H}(T), F) \\cong \\operatorname{Hom}(T, F)$：由 $\\widehat{H}$ 的定义逐点展开，',
        '',
        '$$\\operatorname{Hom}\\bigl(\\widehat{H}(T), F\\bigr)(X) \\cong \\operatorname{Hom}\\bigl(\\widehat{H}(T)(X), F(X)\\bigr)$$',
        '',
        '而 $\\widehat{H}(T)(X) = \\varinjlim_{R} \\operatorname{Hom}(R, T)$ 是滤过余极限，故',
        '',
        '$$\\operatorname{Hom}\\bigl(\\varinjlim_{R} \\operatorname{Hom}(R, T),\\ F(X)\\bigr) \\;\\cong\\; \\varprojlim_{R} \\operatorname{Hom}\\bigl(\\operatorname{Hom}(R, T),\\ F(X)\\bigr)$$',
        '',
        '这里只差最后一步：要用「$F$ 是层」把 $\\operatorname{Hom}(\\operatorname{Hom}(R, T), F(X))$ 换回 $T(X)$ 那一侧 —— 这一步是米田引理与层条件的联手（$\\operatorname{Hom}(h_{X}, F) \\cong \\operatorname{Hom}(R, F)$ 对 $R \\in J(X)$ 成立）。逐项套回去即可。于是 $\\operatorname{Hom}(\\widehat{H}(T), F) \\cong \\operatorname{Hom}(T, F)$，再对 $\\widehat{H}(T)$ 用一次（此时它是分离的、用到性质 3）就得到 $\\operatorname{Hom}(T^{\\sharp}, F) \\cong \\operatorname{Hom}(T, F)$。∎',
        '',
        '**反射子范畴。** 以上合起来：$\\sharp$ 是左伴随、在层上取恒等、且每个对象都映到层里。按反射子范畴的判据，这就是「层范畴是预层范畴的反射子范畴，反射是 $\\sharp$」。∎'
      ].join('\n'),
      note: '注意「做两次」不是凑出来的：**第一次把预算层变成分离的，第二次才把分离的变成层** —— 差的正是「分离」与「层」之间的那一步（性质 3）。'
    },

    /* ------------------------------------------- 景层范畴的性质 */
    {
      id: 'imp.site-properties',
      kind: 'implication',
      sources: ['prop.filtered-exact', 'def.universal-colimit', 'thm.sheafification'],
      target: 'prop.site-properties',
      title: '逐点继承 $\\mathbf{Set}$ 的性质',
      proof: [
        '几条性质在 $\\mathbf{Set}$ 里都是熟知的：余积就是不交并（万有）、满射就是像的商（正则）、滤过余极限与有限极限交换。',
        '',
        '关键是**把 $\\mathbf{Set}$ 的性质搬到层范畴**。做法分两步：先在**预层范畴** $\\widehat{\\mathcal{C}}$ 里验证（预层范畴是函子范畴，一切逐点定义，因而逐点继承 $\\mathbf{Set}$ 的性质），再用**层化**把结论送回层范畴。',
        '',
        '而层化保有限极限与余极限（上一条定理的推论 2），所以「先算再层化」与「层化后再算」一致，性质就跟着过来了。',
        '',
        '第 3 条具体证一下（其余同法）。设 $F \\to G$ 是层范畴里的满态射。取它在层范畴中的满-单分解 $F \\to I \\rightarrowtail G$。对该分解层化（层上的层化是恒等），并用满态射的右可消性得 $I \\to G$ 既满又单，于是是同构（前一条命题），所以 $I \\cong G$ 落在 $F$ 的像里。',
        '',
        '再由「满态射的局部判据」，$F \\to G$ 是满的当且仅当局部有原像；把这个局部条件写成 $F \\to G$ 的核对 $F \\times_{G} F \\rightrightarrows F$，就得到 $F \\to G$ 是这对投影的余等化子 —— 即**正则满**。∎'
      ].join('\n'),
      note: '整条证明的模子是：**先在函子范畴里逐点做，再用层化运回来**。这就是为什么前面要花力气把「滤过余极限正合」「层化保有限极限」立起来。'
    },

    /* -------------------------------------------- 覆盖筛 = 余积满射 */
    {
      id: 'imp.covering-sieve-epi',
      kind: 'implication',
      sources: ['def.sieve', 'def.grothendieck-topology', 'def.mono'],
      target: 'prop.covering-sieve-epi',
      title: '覆盖族生成覆盖筛 $\\iff$ 余积满',
      proof: [
        '记覆盖族为 $(f_{i} : X_{i} \\to X)_{i \\in I}$，它生成的筛为 $R \\subseteq h_{X}$，并记 $q : \\coprod_{i} X_{i} \\to X$ 为余积给出的那个态射。',
        '',
        '**$R = h_{X}$ 这件事的意义。** $R(Y) \\subseteq \\operatorname{Hom}(Y, X)$ 是「能穿过某个 $X_{i}$」的那些映射。$R = h_{X}$ 就是说**每个** $Y \\to X$ 都能穿过某个 $X_{i}$。',
        '',
        '**（$\\Longleftarrow$）** 设 $q$ 是满态射，即对任意 $T$ 与任意 $u, v : X \\to T$，$u \\circ q = v \\circ q \\implies u = v$。设 $g : Y \\to X$。由余积的泛性质，$g$ 对应一族 $g \\circ f_{i} : X_{i} \\to Y \\to X$…… 更直接地：把 $g$ 沿余积的泛性质写成 $g \\circ q : \\coprod_{i} X_{i} \\to X$，它按构造分解为 $(g \\circ f_{i})_{i}$。由 $q$ 满（右可消）得 $g$ 必须已经是 $q$ 的「商」—— 即存在某个 $i$ 与 $h : Y \\to X_{i}$ 使 $g = f_{i} \\circ h$。所以 $R(Y) = \\operatorname{Hom}(Y, X)$ 对所有 $Y$ 成立，$R = h_{X}$。',
        '',
        '**（$\\Longrightarrow$）** 设 $R = h_{X}$。要证 $q$ 右可消。设 $u, v : X \\to T$ 且 $u \\circ q = v \\circ q$。对每个 $i$ 有 $u \\circ f_{i} = v \\circ f_{i}$。对任意 $Y$ 与任意 $g : Y \\to X$，由 $R = h_{X}$ 存在 $i$ 与 $h : Y \\to X_{i}$ 使 $g = f_{i} \\circ h$，于是',
        '',
        '$$u \\circ g = u \\circ f_{i} \\circ h = v \\circ f_{i} \\circ h = v \\circ g$$',
        '',
        '取 $Y = X$、$g = 1_{X}$ 即得 $u = v$。所以 $q$ 是满态射。∎'
      ].join('\n'),
      note: '这条把「覆盖」这件听起来很几何的事，变成了一句纯箭头的话。以后凡是要在景上验覆盖，都可以改写成一个余积是否满射的问题。'
    }
  ]
});
