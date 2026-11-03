/* ==========================================================================
   内容包 · 拓扑斯（17 条）
   --------------------------------------------------------------------------
   第八团：预拓扑斯 → 预标准拓扑 → 生成元 → 拓扑斯 → Giraud 定理
   → 拟紧 / 拟分离 → 预拓扑斯由拓扑斯唯一确定 → 拓扑斯的态射。

   依赖顺序：预拓扑斯是「商与余积都规规矩矩」的范畴；配上预标准拓扑变成景；
   再加一个小生成元集就是拓扑斯；Giraud 定理给出四个等价说法。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑斯',
  nodes: [

    /* ------------------------------------------------------ 预拓扑斯 */
    {
      id: 'def.pretopos',
      cluster: 'cat.topos',
      type: 'definition',
      label: '预拓扑斯',
      title: '预拓扑斯',
      regions: ['category'],
      tags: ['范畴论', '预拓扑斯', '正合'],
      statement: [
        '范畴 $\\mathcal{C}$ 叫**预拓扑斯**，如果',
        '',
        '1. **有限极限存在**；',
        '2. **有限余积存在**，并且是**不交的**与**万有的**；',
        '3. **等价关系是有效的且万有的**；',
        '4. **满态射是正则的且万有的**。'
        ,
        '**四条公理的“权重”不一样**（预拓扑斯与拓扑斯的差别就藏在这里）：\n' +
        '\n' +
        '- **① 有限极限存在**：**纯结构要求**，只保证能谈纤维积、等化子（于是能谈“关系”）。它不涉及余极限，也不涉及满/单。\n' +
        '- **② 有限余积不交且万有**：**这是真的条件，且不能省**。「不交」= 拉回 $A \\times_{A\\sqcup B} B \\simeq \\emptyset$ 的空白（要求有初始对象且它“真的空”）；「万有」= 余积在拉回下稳定。**只要求“有限余积存在”远不够** —— $\\mathbf{Set}$ 的余积不交且万有，但 $\\mathbf{Grp}$ 的余积（自由积）并不万有，于是 $\\mathbf{Grp}$ 不是预拓扑斯。\n' +
        '- **③ 等价关系有效且万有**：**这一条保证“商”与“关系”对应**（有效 = 每个等价关系都是某个满态射的核对；万有 = 在拉回下保持）。⚠️ 缺了它，「商对象」与「等价关系」就对不上，第一同构定理无从谈起。\n' +
        '- **④ 满态射正则且万有**：**这一条最技术**（正则 = 是某个核对的第一分量）。⚠️ 它与 ③ 有重叠但**不互相蕴含**：③ 说的是等价关系$\\to$满态射，④ 说的是满态射$\\to$等价关系。\n' +
        '\n' +
        '**预拓扑斯 vs 拓扑斯：差的那一条**。拓扑斯 = 预拓扑斯 **+**（有效满射 + 局部可表性，或等价的 Giraud 公理组）。所以「预拓扑斯」这四个字母的全部意义是：**它已经具备做“商、纤维积、等价关系”的全部装置，还没具备做“层”的那一层**。这也是为什么很多构造（如内部等价关系、有效满射的稳定性）在预拓扑斯上就能做。\n' +
        '\n' +
        '⚠️ **最常用的对照**：$\\mathbf{Set}$ 是拓扑斯；$\\mathbf{Grp}$、$\\mathbf{Ring}$、$\\mathbf{Cat}$ 都**不是**预拓扑斯（余积不万有）。判断一个具体范畴是不是预拓扑斯，**先查 ②** —— 它是最容易失败的一条。'
      ].join('\n'),
      notes: [
        '第 4 条**不是独立的** —— 它可以由前三条推出，所以有些课本只写三条。写下来的好处是提醒一件事：**在这里满态射自动是正则的**，于是「满」与「商映射」是同一件事。',
        '标准事实：**单态射可以通过极限来定义**（$i$ 是单态射 $\\iff$ 那个方形是笛卡尔的），而拉回与极限都保持单态射；这保证了推出也保单态射 —— 第 2、3 条里那些「不交」「有效」才有意义。',
        '例：$\\mathbf{Set}$、$\\mathbf{FinSet}$ 是预拓扑斯；$\\mathbf{CHaus}$ 是拓扑斯；**$\\mathbf{Top}$ 不是预拓扑斯**（满态射不一定是商映射）。任何景的层范畴都是预拓扑斯。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ------------------------------------------------ 满-单分解 */
    {
      id: 'prop.pretopos-factorization',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '满-单分解',
      title: '预拓扑斯中的满-单分解',
      regions: ['category'],
      tags: ['范畴论', '预拓扑斯', '分解'],
      statement: [
        '设 $\\mathcal{C}$ 是预拓扑斯。则',
        '',
        '1. $\\mathcal{C}$ 是**平衡的**：既单又满的态射一定是同构；',
        '2. 每个态射都是**严格的**：$\\operatorname{im} f \\cong \\operatorname{coim} f$；',
        '3. 每个态射都有**唯一**的满-单分解',
        '',
        '$$f : X \\twoheadrightarrow \\overline{X} \\rightarrowtail Y, \\qquad \\overline{X} := X / R,\\quad R := X \\times_{Y} X$$'
      ].join('\n'),
      notes: '这三条在 $\\mathbf{Set}$ 里都理所当然，但在一般范畴里都要证。它们合起来说：「**预拓扑斯里的像 = 商**」，与集合里「像就是按核对取商」完全一致。证明见边上那条推导。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- 子对象格 */
    {
      id: 'prop.subobject-lattice',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '子对象构成有界格',
      title: '预拓扑斯中子对象构成有界格',
      regions: ['category'],
      tags: ['范畴论', '子对象', '格'],
      statement: [
        '设 $\\mathcal{C}$ 是预拓扑斯，$X \\in \\mathcal{C}$。则子对象全体 $\\{X\' : X\' \\rightarrowtail X\\}$ 构成一个**有界格**：',
        '',
        '$$X_{1} \\cup X_{2} := \\operatorname{im}\\bigl(X_{1} \\coprod X_{2} \\to X\\bigr)$$',
        '',
        '而且**拉回是格之间的同态**（保交、保并、保上界）。'
      ].join('\n'),
      notes: [
        ['**证明。** 「子对象」是单态射 $X\' \\rightarrowtail X$ 的同构类。','- **交**取**拉回**：$X_{1} \\cap X_{2} := X_{1} \\times_{X} X_{2}$。单态射的拉回仍是单态射 ✓；泛性给出「同时分解过 $X_{1}$ 与 $X_{2}$」$\\iff$「分解过拉回」，即它恰是两个子对象的**最大下界** ✓。','- **并**取**像**：$X_{1} \\cup X_{2} := \\operatorname{im}(X_{1} \\coprod X_{2} \\to X)$。\n\n余积的泛性给出「同时被 $X_{1}, X_{2}$ 包含的态射 $\\iff$ 从余积出发的态射」，而取像正是把它变成单态射：$X_{1} \\to X$ 与 $X_{2} \\to X$ 都分解过它，且任何同时包含两者的子对象都被它分解过（像的泛性）—— 恰是**最小上界** ✓。\n\n（像的存在来自预拓扑斯里余等化子 / 商的存在。）','- **有界**：最小元是始对象到 $X$ 的唯一态射（预拓扑斯里始对象到任何对象都是单态射），最大元是 $1_{X}$ ✓。','- **分配律**：$X_{1} \\cap (X_{2}\\cup X_{3}) = (X_{1}\\cap X_{2}) \\cup (X_{1}\\cap X_{3})$ —— 沿单态射的拉回保余积（预拓扑斯里余积不交且万有），把两边都算成同一个拉回 ✓。','- **拉回是格同态**：$f^{*}(-) := -\\times_{Y} X$ 保拉回（是极限），故保交、保上下界；而它保余积（万有性）与像（像的计算可以搬到拉回里做），故保并 ✓。∎'].join('\n'),
'「有界」指的是这个格有最小元（始对象出发的那个子对象）与最大元（$X$ 自己）。把「子对象」当成一个格来看，后面讲拓扑斯内部逻辑时用的就是它 —— 这里的交、并分别是逻辑的「且」与「或」。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- 预标准拓扑 */
    {
      id: 'def.precanonical-topology',
      cluster: 'cat.topos',
      type: 'definition',
      label: '预标准拓扑',
      title: '预标准拓扑',
      regions: ['category'],
      tags: ['范畴论', '预拓扑斯', '预标准'],
      statement: [
        '预拓扑斯 $\\mathcal{C}$ 上的**预标准预拓扑**由所有**有限**族 $(X_{i} \\to X)_{i \\in I}$ 组成，使得',
        '',
        '$$\\coprod_{i \\in I} X_{i} \\longrightarrow X$$',
        '',
        '是满态射。它生成的 Grothendieck 拓扑叫**预标准拓扑**，配它的 $\\mathcal{C}$ 是一个景。'
      ].join('\n'),
      notes: '生成它的其实是两类覆盖：**有限不交并**（$\\coprod_{i \\in I} X_{i} \\cong X$）与**满射** $(X_{i} \\to X)$。名字里的「预」是因为它比标准拓扑**粗** —— 但仍然是次标准的。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ------------------------------------------ 预标准拓扑下的层 */
    {
      id: 'prop.precanonical-sheaf',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '预标准拓扑下的层',
      title: '预标准拓扑下「层」的两条等式',
      regions: ['category'],
      tags: ['范畴论', '层', '预标准'],
      statement: [
        '设 $\\mathcal{C}$ 是预拓扑斯、配预标准拓扑。预层 $F$ 是层 $\\iff$ 对每个有限族 $(X_{i} \\to X)$ 且 $\\coprod_{i} X_{i} \\to X$ 满，',
        '',
        '$$F(X) \\;\\cong\\; \\ker\\Bigl(\\prod_{i} F(X_{i}) \\rightrightarrows \\prod_{i,j} F(X_{i} \\times_{X} X_{j})\\Bigr)$$',
        '',
        '等价地，下面两条同时成立：',
        '',
        '$$F\\Bigl(\\coprod_{i \\in I} X_{i}\\Bigr) \\;\\cong\\; \\prod_{i \\in I} F(X_{i}),$$',
        '其中 $R$ 是 $X$ 上的**等价关系**（拓扑斯的覆盖所对应的那个）。'
      ].join('\n'),
      notes: [
        ['**证明。** 设覆盖族 $(X_{i} \\to X)_{i \\in I}$（有限、$\\coprod_{i}X_{i} \\to X$ 满）。层条件是对每个这样的族','$$F(X) \\to \\prod_{i}F(X_{i}) \\rightrightarrows \\prod_{i,j}F(X_{i}\\times_{X}X_{j})$$','为等化子。','- **「余积变积」**：取单支覆盖 $X \\to X$（它当然满），则层条件退化成 $F(X) \\cong F(X)$ 的平凡等式 —— 有限余积的层条件要把 $I$ 取成各支自身：对有限族 $(X_{i})$，$\\coprod_{i}X_{i} \\to \\coprod_{i}X_{i}$ 满，层条件给出 $F(\\coprod_{i}X_{i}) \\cong \\prod_{i}F(X_{i})$ ✓（与余积交换 == 与有限积交换，因为 $F$ 是 $\\mathbf{Set}$ 值）。','- **「商变核」**：一般族的覆盖条件里，$\\coprod_{i}X_{i} \\to X$ 是满态射，于是它在预拓扑斯里是**有效满**的：$R := \\coprod_{i,j}X_{i}\\times_{X}X_{j}$ 是 $\\coprod_{i}X_{i}$ 上的等价关系，而 $X$ 是这个关系的商（余等化子）。\n\n于是层条件读作 $F(X) \\cong \\ker\\bigl(F(\\coprod X_{i}) \\rightrightarrows F(R)\\bigr)$；\n\n再接上「余积变积」就得到陈述里的第一条等式 ✓。\n\n反过来取 $X = X/R$ 的商映射作覆盖，得 $F(X/R) \\cong \\ker(F(X)\\rightrightarrows F(R))$ ✓。','- **合起来**：两条所说正是所有覆盖（都是有限族、余积满）的层条件 ✓。','- **推论**：$h_{X} = \\operatorname{Hom}(X,-)$ 满足两条（Hom 把余积送成积、把商送成核），故每个可表示预层都是层 —— 即预标准拓扑是次标准的 ✓。∎'].join('\n'),
        '这两条把「层」写成了两条在 $\\mathbf{Set}$ 里显然、在这里需要验的等式：**有限余积变有限积**、**商变核**。它们正是「预拓扑斯里的余积与商和集合里长得一样」的精确说法。',
        '推论：**预标准拓扑是次标准的** —— 可表示预层 $h_{X}$ 满足上面两条（$\\operatorname{Hom}(X, -)$ 保积，$\\operatorname{Hom}(X/R, -)$ 由余等化子给出核），所以它们都是层。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ---------------------------------- 预标准拓扑保持余积与商 */
    {
      id: 'prop.precanonical-preserves',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '余积与商在层范畴中不变',
      title: '预标准拓扑下余积与商不变',
      regions: ['category'],
      tags: ['范畴论', '层', '余积'],
      statement: [
        '设 $\\mathcal{C}$ 是预拓扑斯、配预标准拓扑。则',
        '',
        '1. $I$ **有限**时，$\\coprod_{i \\in I} X_{i}$ 在层范畴中仍然是那个余积；',
        '2. 若 $R$ 是 $X$ 上的等价关系，则商 $X/R$ 在层范畴中仍然是那个商。',
        '',
        '也就是说：$\\mathcal{C}$ 与 $\\mathcal{C}$ 中的 $X \\mapsto h_{X}$ 之间，余积与商**两边算出来一样**。'
      ].join('\n'),
      notes: [
        '证明一句话：对任意层 $F$，由 $F$ 是层（上一条的乘积等式）得 $\\operatorname{Hom}(X \\coprod Y, F) = F(X \\coprod Y) \\cong F(X) \\times F(Y) = \\operatorname{Hom}(X, F) \\times \\operatorname{Hom}(Y, F) = \\operatorname{Hom}(X \\coprod Y, F)$，所以层范畴里这个余积的泛性质原样成立。\n\n商的情形是把正合列 $F(X/R) \\to F(X) \\rightrightarrows F(R)$ 读成 $\\operatorname{Hom}(X/R, F) \\cong \\ker\\bigl(\\operatorname{Hom}(X, F) \\rightrightarrows \\operatorname{Hom}(R, F)\\bigr)$。\n\n∎',
        ,
        '**各方向用到的假设**（保余积与保商来自层条件的泛性质）：\n' +
        '- 有限余积的层条件 $F(\\coprod_iX_i)\\cong\\prod_iF(X_i)$ $\\implies$ Yoneda 嵌入保该余积：对任意层应用 Yoneda 引理，就是余积泛性质。\n' +
        '- 反向若可表示层的余积确为 $h_{\\coprod_iX_i}$，对任意层取 Hom 即恢复乘积公式；这一步是免费的范畴论形式转换。\n' +
        '- 商的层条件 $F(X/R)\\cong\\operatorname{Eq}(F(X)\\rightrightarrows F(R))$ $\\iff$ $h_{X/R}$ 是相应余等化子，同样由 Yoneda 与泛性质转换；有效下降来自预拓扑斯和预标准拓扑。\n' +
        '- 拓扑假设不可省：有限集合范畴配平凡拓扑时所有预层都是层，而常值两元素预层满足 $F(\\{1,2\\})$ 只有两元素，不能等于 $F(\\{1\\})\\times F(\\{2\\})$ 的四元素。有限余积的结论也不自动涵盖无限余积。\n'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------- 单满在层范畴里不变 */
    {
      id: 'prop.precanonical-mono-epi',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '单满在层化后不变',
      title: '预标准拓扑下单态射与满态射不变',
      regions: ['category'],
      tags: ['范畴论', '层', '单态射'],
      statement: [
        '设 $\\mathcal{C}$ 是预拓扑斯、配预标准拓扑。对 $\\mathcal{C}$ 中的态射 $f : X \\to Y$，',
        '',
        '$f$ **是单态射（满态射）** $\\iff X^{\\sharp} \\to Y^{\\sharp}$ **是单态射（满态射）**'
      ].join('\n'),
      notes: [
        ['**证明。** 记层化为 $(-)^{\\sharp}$。','- **$(\\implies)$**：层化是到层范畴的**左伴随**，故保余极限，特别保满态射；又是**左正合**的（保有限极限），故保单态射 ✓。','- **$(\\Longleftarrow)$**：预标准拓扑是次标准的，所以 $h_{X}^{\\sharp} \\cong h_{X}$、$h_{Y}^{\\sharp} \\cong h_{Y}$，且 $f^{\\sharp}$ 在 Yoneda 嵌入下的像就是 $h_{f}$。','- 对可表示预层：$h_{f}$ 单 $\\iff$ $f$ 单（Yoneda 双射把 $h_{f}(Z)$ 的诱导映射写成「与 $f$ 复合」，单射性逐点验出）；$h_{f}$ 满 $\\iff$ $f$ 满（$\\mathbf{Set}$ 值预层范畴中的满态射逐点判定；\n\n一边取 $Z = Y$ 与 $1_{Y}$，另一边用 $\\operatorname{Hom}(Z,-)$ 保满态射）✓。','- 于是 $h_{f}$ 单（满）$\\iff$ $h_{f}^{\\sharp}$ 单（满），两头接起来即得 ✓。∎'].join('\n'),
'所以「谁是单的、谁是满的」在 $\\mathcal{C}$ 里和它在层范畴里问出来是同一个答案。这在后面起作用：Giraud 定理里把 $\\mathcal{C}$ 换成 $\\mathcal{T}$ 再配标准拓扑时，单满关系不会走样。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ---------------------------------------------------- 生成元 */
    {
      id: 'def.generator',
      cluster: 'cat.topos',
      type: 'definition',
      label: '生成元集',
      title: '生成元集与生成元',
      regions: ['category'],
      tags: ['范畴论', '生成元', '忠实'],
      statement: [
        '范畴 $\\mathcal{C}$ 的一个集合 $S \\subseteq \\mathcal{C}$ 叫**生成元集**，如果函子',
        '',
        '$$\\prod_{a \\in S} h_{a} : \\mathcal{C} \\longrightarrow \\mathbf{Set}^{S}, \\qquad X \\mapsto \\bigl(\\operatorname{Hom}_{\\mathcal{C}}(a, X)\\bigr)_{a \\in S}$$',
        '',
        '是**忠实**的。等价地：只要 $f \\ne g : X \\to Y$，就存在 $a \\in S$ 与 $g_{0} : a \\to X$ 使 $f \\circ g_{0} \\ne g \\circ g_{0}$。$S = \\{G\\}$ 时，$G$ 叫**生成元**。'
      ].join('\n'),
      notes: '直观：**$S$ 里的对象「看得见」所有态射之间的差别** —— 随便两个不同的态射，总有一个来自 $S$ 的箭头能把它们分开。\n\n例：$\\mathbf{1}$ 是 $\\mathbf{Set}$ 的生成元；\n\n$A$ 是 $A\\text{-}\\mathbf{Mod}$ 的生成元；\n\n$\\mathcal{C}$ 本身是预层范畴 $\\widehat{\\mathcal{C}}$ 的生成元集。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ------------------------------------------------------ 拓扑斯 */
    {
      id: 'def.topos',
      cluster: 'cat.topos',
      type: 'definition',
      label: '拓扑斯',
      title: '拓扑斯',
      regions: ['category'],
      tags: ['范畴论', '拓扑斯'],
      statement: [
        '范畴 $\\mathcal{T}$ 叫**拓扑斯**，如果',
        '',
        '1. 存在一个**小**的生成元集；',
        '2. 有限极限存在；',
        '3. 余积存在，并且是不交的、万有的（等价地说：所有余极限存在）；',
        '4. 等价关系是有效的且万有的。'
        ,
        '**四条里“哪条是拓扑斯独有的”**（这一组与预拓扑斯的差别全在第 1 条与第 3 条的加强上）：\n' +
        '\n' +
        '- **① 小生成元集**：**这是“小性”条件，预拓扑斯没有它**。它保证拓扑斯有足够好的表现（能做内语言、能取层化），也是「\\(\\mathcal{T} \\simeq \\operatorname{Sh}(\\mathcal{C}, J)\\) 且 \\(\\mathcal{C}\\) 小」的前提。⚠️ 少了它，范畴可能“太大”而无法化为层范畴。\n' +
        '- **② 有限极限**：与预拓扑斯相同，纯结构要求。\n' +
        '- **③ 余积存在且不交万有**（等价：**所有**余极限存在）：**比预拓扑斯强了一档** —— 预拓扑斯只要求**有限**余积。这一条加上 ② 得到「余极限都能算」，才使「层化」可行（层化是沿筛取余极限）。\n' +
        '- **④ 等价关系有效且万有**：与预拓扑斯相同。\n' +
        '\n' +
        '**与预拓扑斯合起来看**：拓扑斯 \\(=\\) 预拓扑斯 \\(+\\)「小生成元 \\(+\\) 任意余极限」。所以「预拓扑斯」是“缺小性与大余极限的拓扑斯”，很多构造（内部等价关系、有效满射、核对）在那一层就能做。\n' +
        '\n' +
        '⚠️ **四条不能随便删**：删 ①，\\(\\operatorname{Sh}(\\mathcal{C})\\)（\\(\\mathcal{C}\\) 大）仍满足 ②③④ 但不是拓扑斯（无小生成元）；删 ③ 的“不交万有”只剩“余积存在”，\\(\\mathbf{Grp}^{\\mathrm{op}}\\) 之类会混进来；删 ④，「商 = 等价关系」失效，内语言里的“集合”语义就崩了。\n' +
        '\n' +
        '⚠️ **② 里的“不交且万有”是最常被忽略的**：只说「余积存在」不算拓扑斯 —— 拓扑斯里的余积必须在拉回下**稳定**（万有），这是内部语言中「不交并」的行为来源。'
      ].join('\n'),
      notes: [
        '与预拓扑斯的差别只有第 1 条：**拓扑斯 = 带小生成元集的预拓扑斯**。所以「拓扑斯就是把预拓扑斯缩小到一个集合能管住」。',
        '例：$\\mathbf{Set}$、$G\\text{-}\\mathbf{Set}$ 是拓扑斯；预层范畴 $\\widehat{\\mathcal{C}}$ 是拓扑斯；景的层范畴是拓扑斯；拓扑空间上的层、它的 étalé 空间也是拓扑斯。**$\\mathbf{Top}$ 不是拓扑斯。**',
        '⭐ **凝聚态集的范畴是拓扑斯** —— 这是后面 Cond 那一段的地基。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- Giraud 定理 */
    {
      id: 'thm.giraud',
      cluster: 'cat.topos',
      type: 'theorem',
      label: 'Giraud 定理',
      title: 'Giraud 定理',
      regions: ['category'],
      tags: ['范畴论', 'Giraud', '拓扑斯'],
      statement: [
        '对范畴 $\\mathcal{T}$，下列四条等价：',
        '',
        '1. $\\mathcal{T}$ 是拓扑斯；',
        '2. $\\mathcal{T}$ 上对**标准拓扑**而言的层都是**可表示的**，且存在小生成元集；',
        '3. 存在景 $\\mathcal{C}$ 使 $\\mathcal{T} \\simeq \\widehat{\\mathcal{C}}$；',
        '4. 存在范畴使 $\\mathcal{T}$ 是它的**反射子范畴**，且反射**正合**（保有限极限）。'
        ,
        '**四条是四个不同层次的说法**（这条定理的价值就在于把「公理式」「层论式」「反射式」三种刻画焊在一起）：\n' +
        '\n' +
        '- (1) $\\implies$ (2)：**从公理推层论**。用拓扑斯内部的正合性与小生成元，验证「标准拓扑下的层都可表」—— 这一步要用 **①（小生成元）与 ③（任意余极限）**，也是四条里最技术的一环。\n' +
        '- (2) $\\implies$ (3)：**从层论推表示**。取 \\(\\mathcal{C}\\) 为小生成元全体、\\(J\\) 为标准拓扑（"\\(R\\) 覆盖 \\(\\iff\\) \\(\\coprod_{Y\\in\\mathcal{C}/R}\\underline Y \\to \\underline X\\) 满"），则 \\(\\mathcal{T} \\simeq \\widehat{\\mathcal{C}}\\)。**这一步就是「拓扑斯 = 层范畴」的定义展开**，需要小生成元来保证 \\(\\mathcal{C}\\) 是小范畴。\n' +
        '- (3) $\\implies$ (4)：**从层范畴推反射**。\\(\\widehat{\\mathcal{C}}\\) 是 \\(\\mathbf{Set}^{\\mathcal{C}^{\\mathrm{op}}}\\) 的反射子范畴（层化 \\(\\mathbf{a} \\dashv \\iota\\)），而层化**保有限极限**（这是 Grothendieck 拓扑的核⼼性质）。**注意“反射正合”不能弱成“有反射”** —— 任意反射子范畴都不正合，正合性正是“层”的特征。\n' +
        '- (4) $\\implies$ (1)：**从反射推公理**。反射正合给出有限极限（反射保），\\(\\mathbf{Set}^{\\mathcal{C}^{\\mathrm{op}}}\\) 的余极限与有效等价关系沿反射下去，即得 ②③④。\n' +
        '\n' +
        '⚠️ **四个字「反射正合」是全部内容**：只有反射（左伴随）而无正合性，得到的是**预拓扑斯**（有些书正好这么定义预拓扑斯：预拓扑斯 \\(=\\) 正合反射的反射子范畴，但**不要求**有小生成元）；加上小性与余极限，才升格为拓扑斯。\n' +
        '\n' +
        '⚠️ **比较用的对照**：(1)$\\iff$(3) 是 **Giraud 定理的主干**（拓扑斯 \\(=\\) 层范畴），也是实践中最常用的判据：**要证某个范畴是拓扑斯，通常直接把它实现成层范畴**，而不是逐条验证四条公理。'
      ].join('\n'),
      notes: [
        '四条的对译：(2)$\\iff$(3) 取 $\\mathcal{C} = \\mathcal{T}$ 配上标准拓扑；(3)$\\iff$(4) 平凡（预层范畴对层范畴的层化是正合反射）；(4)$\\implies$(1) 用「预层范畴是拓扑斯」配合反射把结构运下来；\n\n(1)$\\implies$(2) 也给 $\\mathcal{T}$ 配标准拓扑。',
        '第 4 条是最好用的一条：**要造一个拓扑斯，只要造一个预层范畴加一个正合反射**。凝聚态集正是这么来的 —— 取紧 Hausdorff 空间上的层。'
      ].join('\n\n'),
      refs: ['Mac Lane–Moerdijk, Sheaves in Geometry and Logic, Appendix']
    },

    /* ------------------------------------------ 可表示性的下降引理 */
    {
      id: 'lem.representable-quotient',
      cluster: 'cat.topos',
      type: 'lemma',
      label: '可表示性的下降',
      title: '可表示性的下降引理',
      regions: ['category'],
      tags: ['范畴论', '拓扑斯', '可表示'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯（配标准拓扑）。若层之间的满态射',
        '',
        '$$\\coprod_{i \\in I} F_{i} \\longrightarrow F$$',
        '',
        '中每个 $F_{i}$ 以及每个 $F_{i} \\times_{F} F_{j}$ 都**可表示**，则 $F$ 也可表示。'
      ].join('\n'),
      notes: [
        ['**证明。** 记 $F_{i} \\cong h_{X_{i}}$、$F_{i}\\times_{F}F_{j} \\cong h_{X_{i,j}}$，并记 $X := \\coprod_{i}X_{i}$、$R := \\coprod_{i,j}X_{i,j}$。','- **$R$ 是 $X$ 上的等价关系**：满态射 $\\coprod_{i}F_{i} \\to F$ 给出平行对 $R \\rightrightarrows X$ 的两条结构映射（由 $F_{i}\\times_{F}F_{j} \\rightrightarrows F_{i}$ 与 Yoneda 得到）；\n\n自反来自对角 $F_{i} \\to F_{i}\\times_{F}F_{i}$，对称来自 $X_{i,j} \\cong X_{j,i}$，传递来自 $F_{i}\\times_{F}F_{j}\\times_{F}F_{k}$ 的三重拉回（这些都在层范畴里是极限，逐层算）✓。','- **等价关系有效**：拓扑斯里等价关系都有效，故商 $X/R$ 存在，且 $h_{X/R}$ 是这个关系在层范畴里的余等化子 ✓。','- **$F \\cong X/R$**：层范畴中的余等化子列','$$\\coprod_{i,j}F_{i}\\times_{F}F_{j} \\rightrightarrows \\coprod_{i}F_{i} \\longrightarrow F$$','说明 $F$ 是这两个对象的余等化子（满态射是有效满的），而同一列换成可表示层就是 $R \\rightrightarrows X \\to X/R$，故 $F \\cong X/R = h_{X/R}$，即 $F$ 可表示 ✓。∎'].join('\n'),
'把 $F_{i} \\cong X_{i}$、$F_{i} \\times_{F} F_{j} \\cong X_{i,j}$ 记下来，则 $R := \\coprod_{i,j} X_{i,j}$ 定义 $X := \\coprod_{i} X_{i}$ 上的一个等价关系，于是 $F \\cong X/R$ —— 商在拓扑斯里是存在的（等价关系有效），所以 $F$ 是同构于一个可表示层。\n\n这条是 Giraud 定理 $(1) \\implies (2)$ 里最吃力的那一步。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ------------------------------------------ 覆盖 = 余积满射 */
    {
      id: 'prop.topos-covering-epi',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '拓扑斯中覆盖即余积满射',
      title: '拓扑斯中的覆盖',
      regions: ['category'],
      tags: ['范畴论', '拓扑斯', '覆盖'],
      statement: '拓扑斯 $\\mathcal{T}$（配标准拓扑）中，族 $(X_{i} \\to X)_{i \\in I}$ 是覆盖 $\\iff \\coprod_{i \\in I} X_{i} \\to X$ 是满态射。',
      notes: [
        ['**证明。**','- **$(\\Longleftarrow)$**：标准拓扑里，族 $(X_{i}\\to X)$ 是覆盖当且仅当 $\\coprod_{i}X_{i} \\to X$ 是满态射，这正是定义 ✓。','- **$(\\implies)$**：设 $(X_{i}\\to X)$ 覆盖。\n\n在层范畴里取 $s := 1_{X} \\in h_{X}(X)$。\n\n由「层中满态射的局部判据」，只要在每支上找到 $s|_{X_{i}}$ 的原像：取 $t_{i} := 1_{X_{i}} \\in h_{X_{i}}(X_{i})$，它在 $h_{X}(X_{i})$ 里的像就是 $X_{i} \\to X$ 这个态射，正是 $s|_{X_{i}}$ ✓。\n\n故 $\\coprod_{i}h_{X_{i}} \\to h_{X}$ 是满态射 ✓。','- 两个方向合起来：在拓扑斯里，「覆盖」可以完全用**余积 + 满态射**这两个纯范畴概念表达，不需要几何残余 ✓。∎'].join('\n'),
'这条在一般景里也对，但在拓扑斯里更顺手：拓扑斯的余积是「好」的（不交、万有），所以「覆盖」这个词在这里完全可以用余积与满射这两个纯范畴概念替换掉，一点几何残余都不剩。'].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* --------------------------------- 拓扑斯上的层 = 保极限的预层 */
    {
      id: 'prop.topos-sheaf-limits',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '拓扑斯上的层即保极限的预层',
      title: '拓扑斯上的层 $\\iff$ 保持所有极限',
      regions: ['category'],
      tags: ['范畴论', '拓扑斯', '层'],
      statement: '拓扑斯 $\\mathcal{T}$（配标准拓扑）上的预层 $F : \\mathcal{T}^{\\mathrm{op}} \\to \\mathbf{Set}$ 是层 $\\iff$ $F$ 保持所有极限。',
      notes: '证明就一行：若 $R$ 是 $X$ 的覆盖筛，则 $X \\cong \\varinjlim_{X\' \\to X \\in R} X\'$ —— 这句话正是覆盖的定义；把它送回 $F$ 就得到 $F(X) \\cong \\varprojlim_{X\' \\in \\mathcal{T}/R} F(X\')$，即层条件。\n\n所以在拓扑斯上，「**层**」与「**把余极限送回极限的预层**」是同一件事。\n\n层论里那两条（分离 + 粘合）在这里合成了「连续」这一个词。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- 拟紧对象 */
    {
      id: 'def.quasi-compact',
      cluster: 'cat.topos',
      type: 'definition',
      label: '拟紧对象',
      title: '拟紧对象',
      regions: ['category'],
      tags: ['范畴论', '拟紧', '紧性'],
      statement: [
        '景 $\\mathcal{C}$ 的对象 $X$ 叫**拟紧的**，如果任给生成覆盖筛的族 $(X_{i} \\to X)_{i \\in I}$，都存在**有限**的 $J \\subseteq I$，使 $(X_{i} \\to X)_{i \\in J}$ 生成的筛**也是**覆盖筛。',
        '',
        '在拓扑斯中，等价的说法是：任给满射 $\\coprod_{i \\in I} X_{i} \\to X$，都存在有限 $J \\subseteq I$ 使 $\\coprod_{i \\in J} X_{i} \\to X$ 仍是满射。'
      ].join('\n'),
      notes: '这就是**紧性**在剥掉拓扑之后剩下的形状：**任何覆盖都有有限子覆盖**。紧 Hausdorff 空间在 $\\mathrm{Cond}$ 里正是「拟紧」的那批对象 —— 后面凝聚态集的定义就是靠它写下来的，所以这个名字值得记牢。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ------------------------------------------------ 拟紧的性质 */
    {
      id: 'prop.quasi-compact-properties',
      cluster: 'cat.topos',
      type: 'proposition',
      label: '拟紧的性质',
      title: '拟紧对象的性质',
      regions: ['category'],
      tags: ['范畴论', '拟紧', '覆盖'],
      statement: [
        '1. 景 $\\mathcal{C}$ 中 $X$ 拟紧 $\\iff$ $X$ 在标准拓扑下拟紧；',
        '2. 若 $X$ 有一个由**拟紧**对象组成的**有限**覆盖，则 $X$ 拟紧；',
        '3. 预拓扑斯 $\\mathcal{C}$（配预标准拓扑）上的层 $F$ 拟紧 $\\iff$ 存在满射 $X \\to F$ 且 $X \\in \\mathcal{C}$。'
      ].join('\n'),
      notes: [
        ['**逐条证明。**','**1.** 景里的覆盖族与它在标准拓扑下生成的层范畴里的覆盖族一一对应（次标准性保证可表示层原样保留），而「拟紧」只用到覆盖族这件事，故两种说法一致 ✓。','**2.** 设 $X$ 被拟紧对象 $X_{1}, \\ldots, X_{n}$ 的有限族覆盖，给 $X$ 的任一覆盖 $(Y_{j}\\to X)$。\n\n对每个 $k$ 沿 $X_{k}\\to X$ 拉回得到 $X_{k}$ 的覆盖 $(Y_{j}\\times_{X}X_{k} \\to X_{k})$；\n\n由 $X_{k}$ 拟紧抽出有限子族 $(j \\in J_{k})$。\n\n则 $J := \\bigcup_{k}J_{k}$ 有限，且 $(Y_{j}\\to X)_{j\\in J}$ 已是覆盖（每支 $X_{k}$ 都被覆盖，而 $\\{X_{k}\\}$ 覆盖 $X$）✓。','**3.** $(\\Longleftarrow)$ 若 $X \\to F$ 满且 $X \\in \\mathcal{C}$，则任何由可表示层给出的覆盖 $(h_{X_{i}} \\to F)$ 沿 $X \\to F$ 拉回得到 $X$ 的覆盖，由「$h_{X}$ 拟紧」（$X \\in \\mathcal{C}$）抽出有限子族，复合 $h_{X_{i}} \\to h_{X} \\to F$ 给出 $F$ 的有限子覆盖 ✓。','$(\\implies)$ 反之，$\\mathcal{C}$ 的对象构成层范畴的生成元族，故有满态射 $\\coprod_{i}h_{X_{i}} \\to F$；由 $F$ 拟紧抽出有限子族 $(i \\in I,\\ |I| < \\infty)$，令 $X := \\coprod_{i\\in I}X_{i} \\in \\mathcal{C}$，则 $h_{X} = \\coprod_{i\\in I}h_{X_{i}} \\to F$ 仍满 ✓。\n\n—— 在凝聚态集里这条读作「凝聚态集拟紧 $\\iff$ 有紧 Hausdorff 空间到它的满射」✓。\n\n∎'].join('\n'),
'第 3 条最有用：它把「层 $F$ 拟紧」换成了「$F$ 能被一个小对象盖住」—— 在凝聚态集里，这就是「凝聚态集 $X$ 拟紧 $\\iff$ 存在紧 Hausdorff 空间到它的满射」。',
        ,
        '**各方向用到的假设**（有限覆盖判据依赖站点覆盖与层覆盖的对应）：\n' +
        '- 第 1 条两个方向均需站点与其层范畴的覆盖比较，把可表示对象理解为层化后的表示预层；在次标准情形才可不写层化。这是覆盖比较，不能单靠改名证明。\n' +
        '- 第 2 条从有限拟紧覆盖推出拟紧：将任意覆盖拉回各块、分别取有限子族，再用覆盖的传递性；无限离散空间的单点覆盖说明“有限”不能删。\n' +
        '- 第 3 条正向：可表示层生成层范畴给出满覆盖，拟紧性抽有限支，有限余积把它们合成一个 $X$；最后一步用预标准拓扑下保有限余积。\n' +
        '- 第 3 条反向：$h_X\\to F$ 满且 $h_X$ 拟紧时，拉回覆盖并取有限子族，再由满性下降覆盖。关键是该拓扑下可表示层拟紧；任意站点不能免费假定这一点，例如非拟紧拓扑空间的终层。\n'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* -------------------------------------------------- 拟分离对象 */
    {
      id: 'def.quasi-separated',
      cluster: 'cat.topos',
      type: 'definition',
      label: '拟分离对象',
      title: '拟分离对象',
      regions: ['category'],
      tags: ['范畴论', '拟分离', '纤维积'],
      statement: [
        '拓扑斯 $\\mathcal{T}$ 的对象 $X$ 叫**拟分离的**，如果任给 $Y \\to X$、$Z \\to X$（其中 $Y, Z$ 都拟紧），纤维积',
        '',
        '$$Y \\times_{X} Z$$',
        '',
        '仍然拟紧。'
      ].join('\n'),
      notes: '性质：**子对象封闭**（拟分离对象的子对象拟分离）；**余积封闭**；**沿单射的滤过余极限封闭**。\n\n「拟分离」在两个拟紧对象之间多加了一道要求：**交叠处也要小**。这和拓扑里「紧 + 交叠紧」的想法完全平行 —— 有了拟紧与拟分离，「小而好」的对象就被挑出来了。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ---------------------------------------- 预拓扑斯由拓扑斯确定 */
    {
      id: 'thm.pretopos-qcqs',
      cluster: 'cat.topos',
      type: 'theorem',
      label: '预拓扑斯由拓扑斯唯一确定',
      title: '预拓扑斯 $\\simeq$ 拟紧拟分离层',
      regions: ['category'],
      tags: ['范畴论', '预拓扑斯', '等价'],
      statement: [
        '若 $\\mathcal{C}$ 是预拓扑斯（配预标准拓扑），则函子',
        '',
        '$$X \\mapsto h_{X}$$',
        '',
        '给出 $\\mathcal{C}$ 与「$\\mathcal{C}$ 上**拟紧且拟分离**的层」所成范畴之间的**等价**。'
      ].join('\n'),
      notes: '也就是说：**预拓扑斯由它的拓扑斯唯一确定**。一边是「小的对象」，一边是「拓扑斯里那种小而好的层」，两者是同一批东西的两个名字。\n\n这条把这一段的结构说圆了：预拓扑斯 $\\to$ 配上预标准拓扑 $\\to$ 景 $\\to$ 层范畴（拓扑斯）$\\to$ 从拓扑斯里捞回「小而好的层」，回到预拓扑斯。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    },

    /* ------------------------------------------------ 拓扑斯的态射 */
    {
      id: 'def.topos-morphism',
      cluster: 'cat.topos',
      type: 'definition',
      label: '拓扑斯的态射',
      title: '拓扑斯的态射',
      regions: ['category'],
      tags: ['范畴论', '拓扑斯', '几何态射'],
      statement: [
        '拓扑斯的**态射** $f : \\mathcal{T} \\to \\mathcal{T}\'$ 是一对函子',
        '',
        '$$f^{*} : \\mathcal{T}\' \\longrightarrow \\mathcal{T}, \\qquad f_{*} : \\mathcal{T} \\longrightarrow \\mathcal{T}\'$$',
        '',
        '满足 $f^{*} \\dashv f_{*}$，并且 $f^{*}$ **正合**（保有限极限）。$f^{*}$ 叫**拉回函子**，$f_{*}$ 叫**推前函子**。'
      ].join('\n'),
      notes: '动机来自拓扑空间：连续映射 $\\varphi : X \\to Y$ 给出层范畴之间的一对函子 —— 沿 $\\varphi$ 把层拉回来（$f^{*}$）、再把层推出去（$f_{*}$）。\n\n这一对满足 $f^{*} \\dashv f_{*}$，并且 $f^{*}$ 正合。\n\n于是**拓扑斯之间的「映射」就照这个样子定义**：不是函子，而是一对互为伴随的函子，而且方向与几何直觉相反（左边那个是拉回）。',
      refs: ['Le Stum, An introduction to condensed mathematics, §3.3']
    }
  ],

  edges: [

    /* ------------------------------------------------ 满-单分解 */
    {
      id: 'imp.pretopos-factorization',
      kind: 'implication',
      sources: ['def.pretopos', 'def.effective-equivalence', 'def.regular-epi'],
      target: 'prop.pretopos-factorization',
      title: '预拓扑斯 $\\implies$ 满-单分解',
      proof: [
        '设 $f : X \\to Y$。取核对 $R := X \\times_{Y} X$，它是 $X$ 上的等价关系。由预拓扑斯第 3 条，等价关系**有效**，所以可以取商',
        '',
        '$$\\overline{X} := X/R = \\operatorname{coker}(R \\rightrightarrows X)$$',
        '',
        '两条投影在 $f$ 下相等，故 $f$ 穿过商，得到分解',
        '',
        '$$f : X \\twoheadrightarrow \\overline{X} \\xrightarrow{\\ l\\ } Y$$',
        '',
        '**$l$ 是单态射。** 设 $g, h : Z \\to \\overline{X}$ 且 $l \\circ g = l \\circ h$。因为 $\\overline{X} = X/R$，把 $g, h$ 与商映射 $\\pi$ 一起拉回：考虑 $V$ 使方块',
        '',
        '$$\\begin{array}{ccc} V & \\longrightarrow & Z \\\\ \\downarrow\\scriptstyle{(g_0,h_0)} & & \\downarrow\\scriptstyle{(g,h)} \\\\ X \\times_{X} X & \\xrightarrow{\\ \\pi \\times \\pi\\ } & \\overline{X} \\times \\overline{X} \\end{array}$$',
        '',
        '笛卡尔。\n\n由 $l \\circ g = l \\circ h$ 得 $l \\circ \\pi \\circ g_{0} = l \\circ \\pi \\circ h_{0}$，即 $f \\circ g_{0} = f \\circ h_{0}$。\n\n于是 $(g_{0}, h_{0})$ 的像整个落在 $R = X \\times_{Y} X$ 里 —— 换句话说 $(g_{0}, h_{0})$ 穿过 $R$。',
        '',
        '再由 $\\overline{X} = \\operatorname{coker}(R \\rightrightarrows X)$ 的泛性质（两条投影的余等化子），$\\pi \\circ g_{0} = \\pi \\circ h_{0}$，于是 $g = h$。所以 $l$ 是单态射。',
        '',
        '**唯一性。** 若 $f = X \\xrightarrow{\\ \\pi\'\\ } X\' \\xrightarrow{\\ l\'\\ } Y$ 是另一个满-单分解，则由 $l\'$ 是单态射得 $R = X \\times_{X\'} X$。\n\n记 $\\pi\'$ 为满态射，由第 4 条它是**正则**的，即 $\\pi\' = \\operatorname{coker}(X \\times_{X\'} X \\rightrightarrows X)$；\n\n把 $X \\times_{X\'} X = R$ 代进去得 $\\pi\'$ 与 $\\pi$ 是同一个余等化子。\n\n于是存在互逆的 $\\overline{X} \\rightleftarrows X\'$，$X\' \\cong \\overline{X}$。\n\n∎',
        '',
        '**平衡性。** 若 $f$ 既满又单，则 $R = X \\times_{Y} X \\cong X$（单态射的等价刻画），故 $\\overline{X} \\cong X$，$f \\cong l$ 是单态射；又 $f$ 已是单态射，故 $f$ 是同构。∎',
        '',
        '**严格性。** 上面的分解把 $\\operatorname{im} f$ 与 $\\operatorname{coim} f$ 都算成了 $\\overline{X}$，所以它们同构。∎'
      ].join('\n'),
      note: '整条证明只用了一个构造「取核对再取商」和一组事实「等价关系有效 + 满态射正则」。这正是预拓扑斯那四条公理想换来的东西。'
    },

    /* -------------------------------------------------- Giraud */
    {
      id: 'imp.giraud',
      kind: 'implication',
      sources: ['def.topos', 'def.canonical-topology', 'def.generator', 'lem.representable-quotient'],
      target: 'thm.giraud',
      title: 'Giraud 定理的证明',
      proof: [
        '**(2) $\\implies$ (3)。** 取 $\\mathcal{C} = \\mathcal{T}$，配上 $\\mathcal{T}$ 上的**标准拓扑**。\n\n此时层范畴就是 $\\mathcal{T}$ 自己（因为标准拓扑下的层恰好是可表示的那些），于是 $\\mathcal{T} \\simeq \\widehat{\\mathcal{C}}$。\n\n∎',
        '',
        '**(3) $\\implies$ (4)。** 预层范畴 $\\widehat{\\mathcal{C}}$ 是拓扑斯，而层范畴是它的**反射子范畴**，反射（层化）保有限极限 —— 这正是 (4) 的形式。∎',
        '',
        '**(4) $\\implies$ (1)。** 设 $\\mathcal{T}$ 是 $\\widehat{\\mathcal{C}}$ 的反射子范畴，反射 $\\sharp$ 正合。\n\n$\\widehat{\\mathcal{C}}$ 是拓扑斯，其中「有限极限 / 余积 / 等价关系」都是逐点算的、性质都好。\n\n反射子范畴对**极限**封闭（含入函子是右伴随），反射保有限极限与余极限，两份合起来把拓扑斯的四条公理逐一运到 $\\mathcal{T}$ 上：有限极限来自含入函子，余积与商来自「先在大范畴里算、再反射回去」，小生成元集取那些可表示预层的层化。\n\n∎',
        '',
        '**(1) $\\implies$ (2)。** 给 $\\mathcal{T}$ 配标准拓扑。要证每个层都可表示。任取层 $F$。',
        '',
        '设 $S$ 是 $\\mathcal{T}$ 的小生成元集。由 $S$ 生成，可以造出满态射',
        '',
        '$$\\coprod_{i \\in I} X_{i} \\longrightarrow F, \\qquad X_{i} \\in \\mathcal{T}$$',
        '',
        '（把每个 $X \\in S$ 到 $F$ 的态射全体拼起来，生成性保证这族箭头合起来是满的。）每个 $X_{i}$ 作为可表示层是可表示的；再由 $F$ 是层，$X_{i} \\times_{F} X_{j}$ 也在 $\\mathcal{T}$ 里因而是可表示的。',
        '',
        '于是前提全部满足，**下降引理**给出 $F$ 可表示 —— 具体地 $F \\cong X/R$，其中 $X = \\coprod_{i} X_{i}$、$R = \\coprod_{i,j} X_{i} \\times_{F} X_{j}$。∎'
      ].join('\n'),
      note: '四条里最不平凡的一步是 $(1) \\implies (2)$：把一个抽象拓扑斯里的任意层，用小生成元集造一个覆盖，再用下降引理把「可表示」从覆盖的每一块传回整体。'
    },

    /* ------------------------------------------- 预拓扑斯由拓扑斯定 */
    {
      id: 'imp.qcqs',
      kind: 'implication',
      sources: ['def.quasi-compact', 'def.quasi-separated', 'def.precanonical-topology'],
      target: 'thm.pretopos-qcqs',
      title: '拟紧拟分离层 $\\iff$ 小对象',
      proof: [
        '**函子性**：$X \\mapsto h_{X}$ 是米田嵌入，全忠实。要证的是它的本质满性。',
        '',
        '**（小对象 $\\implies$ 拟紧且拟分离）** 设 $X \\in \\mathcal{C}$。任给覆盖 $(X_{i} \\to X)_{i \\in I}$，即 $\\coprod_{i} X_{i} \\to X$ 是满态射。由预标准拓扑的定义，覆盖只由**有限**族给出，所以 $X$ 拟紧（有限子覆盖就是自己）。',
        '',
        '拟分离：设 $Y \\to X$、$Z \\to X$ 且 $Y, Z$ 拟紧。要证 $Y \\times_{X} Z$ 拟紧。由第 3 条性质（拟紧 $\\iff$ 存在小对象到它的满射），取满射 $Y\' \\to Y$、$Z\' \\to Z$（$Y\', Z\' \\in \\mathcal{C}$），则',
        '',
        '$$Y\' \\times_{X} Z\' \\longrightarrow Y \\times_{X} Z$$',
        '',
        '是满射，而左边的纤维积在 $\\mathcal{C}$ 里（$\\mathcal{C}$ 有有限极限），所以 $Y \\times_{X} Z$ 有小对象满射覆盖，因而拟紧。∎',
        '',
        '**（拟紧且拟分离 $\\implies$ 小对象）** 设 $F$ 拟紧，则由性质 3 存在满射 $X \\to F$（$X \\in \\mathcal{C}$）。要把它压成一个同构。',
        '',
        '取核对 $R := X \\times_{F} X$。因为 $F$ 拟分离、而 $X$ 拟紧，两个投影 $X \\to F$ 使 $R$ 是「两个拟紧对象沿拟分离对象的纤维积」，所以 $R$ 也拟紧；再由性质 3 得到 $R$ 被某个 $R_{0} \\in \\mathcal{C}$ 满射覆盖。',
        '',
        '于是 $X \\to F$ 是 $\\mathcal{C}$ 中一个「核在小对象里」的满射，由等价关系的有效性，$F \\cong X/R$ 落在 $X \\mapsto h_{X}$ 的像里。∎'
      ].join('\n'),
      note: '**拟紧**给出「能被小对象盖住」，**拟分离**给出「连交叠处也能被小对象盖住」；两个合起来才够把任意拟紧拟分离层拉回成一个小对象。这就是为什么定义里要两条而不是一条。'
    },

    /* -------------------------------------------- 拓扑斯上的层与极限 */
    {
      id: 'imp.topos-sheaf-limits',
      kind: 'implication',
      sources: ['def.sheaf', 'def.canonical-topology'],
      target: 'prop.topos-sheaf-limits',
      title: '拓扑斯上的层 $\\iff$ 保极限',
      proof: [
        '**(层 $\\implies$ 保极限)** 设 $F$ 是层，$R$ 是 $X$ 的覆盖筛。按标准拓扑的定义，$R \\in J(X)$ 恰好意味着',
        '',
        '$$X \\;\\cong\\; \\varinjlim_{X\' \\to X \\in R} X\'$$',
        '',
        '（每个从 $X$ 出发的箭头都能被 $R$ 里的箭头穿过。）把 $F$ 作用上去：',
        '',
        '$$F(X) \\;\\cong\\; \\varprojlim_{X\' \\to X \\in R} F(X\')$$',
        '',
        '左边是 $\\operatorname{Hom}(h_{X}, F)$、右边是 $\\operatorname{Hom}(R, F)$，这正是层的双射条件。∎',
        '',
        '**(保极限 $\\implies$ 层)** 反过来，若 $F$ 保所有极限，把上式倒过来读：对每个 $R \\in J(X)$，$F(X) \\cong \\varprojlim_{X\' \\in \\mathcal{C}/R} F(X\')$，而右边与 $\\operatorname{Hom}(R, F)$ 同构（前面的计算），所以 $F$ 是层。\n\n∎'
      ].join('\n'),
      note: '证明短得出奇 —— 因为**标准拓扑对覆盖筛的规定，本来就是「$X$ 是这些 $X\'$ 的余极限」**。所以「层」在拓扑斯上等于「把余极限送回极限」，几何与范畴在这里合成一句话。'
    }
  ]
});
