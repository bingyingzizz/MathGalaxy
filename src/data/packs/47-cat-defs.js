/* ==========================================================================
   内容包 · 第 1 章的定义骨架（11 条）
   --------------------------------------------------------------------------
   ⚠️ 这一批是「一直没进图」的编号定义：子范畴（1.1.5）、单纯形范畴（1.1.2）、
   Ind-对象（1.4.3）、保极限（1.4.4）、正合函子（1.4.6）、零对象与直和（5.1.3/5.1.4）、
   加法函子（5.1.2）、分裂短正合列（5.1.6）、足够多投射/内射（1.4.8 / 5.2.8）、
   有限表现对象（1.4.9）、以及命题「同构的截面与收缩唯一」（1.1.4）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '范畴与同调的定义骨架',
  nodes: [

    /* ----------------------------------------------------- 子范畴 */
    {
      id: 'def.subcategory',
      cluster: 'cat.basic',
      type: 'definition',
      label: '子范畴',
      title: '子范畴与满子范畴（Subcategory）',
      regions: ['category'],
      tags: ['范畴论', '子范畴', '满子范畴'],
      statement: [
        '范畴 $\\mathcal{C}$ 的**子范畴** $\\mathcal{C}\'$ 由以下数据组成：',
        '',
        [
          '1. 对象的一个子类 $\\operatorname{Ob}(\\mathcal{C}\') \\subseteq \\operatorname{Ob}(\\mathcal{C})$；',
          '2. 对每对 $X, Y \\in \\mathcal{C}\'$，一个子集 $\\operatorname{Hom}_{\\mathcal{C}\'}(X, Y) \\subseteq \\operatorname{Hom}_{\\mathcal{C}}(X, Y)$；'
        ].join('\n'),
        '',
        '要求这些态射对复合封闭、且包含每个对象的恒等态射。（$X, Y$ 之间的全部态射都取上时叫**满子范畴**。）'
      ].join('\n'),
      notes: [
        '⚠️ **子范畴不等于满子范畴**：满子范畴是「对象取一部分，但态射一个不丢」；一般子范畴允许同时丢掉态射。',
        '**严格（strict）子范畴**：恒等态射在子范畴里也必须是恒等态射。绝大多数场合默认如此。',
        '**例子**：$\\mathbf{Ab} \\hookrightarrow \\mathbf{Grp}$ 是满子范畴（阿贝尔群之间的同态恰好就是它们作为群的同态）；$\\mathbf{CHaus} \\hookrightarrow \\mathbf{Top}$ 是满子范畴；$\\mathbf{Grp} \\to \\mathbf{Set}$ 不是子范畴（连对象都不是同一批集合）。',
        '⭐ 「反射子范畴」「余反射子范畴」都是在满子范畴上再加一条：含入函子有伴随。'
      ].join('\n\n')
    },

    /* ------------------------------------------------- 单纯形范畴 */
    {
      id: 'def.simplex-category',
      cluster: 'cat.limit',
      type: 'definition',
      label: '单纯形范畴',
      title: '单纯形范畴 $\\Delta$',
      regions: ['category'],
      tags: ['范畴论', '单纯形', '单纯对象', '面映射', '退化映射'],
      statement: [
        '**单纯形范畴** $\\Delta$ 的对象是正整数',
        '',
        '$$[n] := n + 1 := \\{\\, 0, 1, \\ldots, n \\,\\} \\qquad (n \\in \\mathbb{N}),$$',
        '',
        '态射是**保序映射** $[m] \\to [n]$。它由两类基本的态射生成：',
        '',
        '- **面映射** $\\delta^{i} : [n-1] \\to [n]$：跳过 $i$（$i = 0, \\ldots, n$），不取 $i$ 的保序单射；',
        '- **退化映射** $\\sigma^{i} : [n+1] \\to [n]$：把 $i$ 与 $i+1$ 撞在一起（$i = 0, \\ldots, n$），保序满射。'
      ].join('\n'),
      notes: [
        '**为什么要它**：单纯对象就是 $\\Delta^{\\mathrm{op}}$ 上的图（见「单纯对象」）。这一条把「一个空间在 $n$ 维的骨架」组织成范畴语言 —— $[n]$ 是 $n$-单形，面映射是「取第 $i$ 个面」，退化映射是「把单形压扁」。',
        '**$\\Delta$ 的态射全都能写成面映射与退化映射的复合**，而且它们满足**单纯恒等式**（$\\delta^{j}\\delta^{i} = \\delta^{i}\\delta^{j-1}$ 等）。所以定义单纯对象时只要给出这两族映射就够 —— 这正是「单纯集 = 一族集合 + 面 + 退化」那种写法的来源。',
        '⚠️ 记号在各书里不统一：有的用 $[n] = \\{0, \\ldots, n\\}$（本图取这个），有的用 $\\Delta^{n}$ 指标准的几何 $n$-单形（那是**几何实现**那边的对象，不是这里的指标）。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------- Ind-对象 */
    {
      id: 'def.ind-object',
      cluster: 'cat.limit',
      type: 'definition',
      label: 'Ind-对象',
      title: 'Ind-对象与 $\\operatorname{Ind}(\\mathcal{C})$',
      regions: ['category'],
      tags: ['范畴论', 'Ind-对象', '滤过余极限', '形式余极限'],
      statement: [
        '范畴 $\\mathcal{C}$ 的一个 **Ind-对象**「$\\varinjlim_{i \\in I} X_{i}$」是一个**滤过图** $(X_{i})_{i \\in I}$。它们组成范畴 $\\operatorname{Ind}(\\mathcal{C})$，其 Hom 为',
        '',
        '$$\\operatorname{Hom}_{\\operatorname{Ind}(\\mathcal{C})}\\Bigl(\\text{“}\\varinjlim_{i \\in I} X_{i}\\text{”},\\ \\text{“}\\varinjlim_{j \\in J} Y_{j}\\text{”}\\Bigr) \\;=\\; \\varinjlim_{j \\in J}\\ \\varprojlim_{i \\in I}\\ \\operatorname{Hom}_{\\mathcal{C}}(X_{i}, Y_{j}).$$'
      ].join('\n'),
      notes: [
        '**读法**：引号里的 $\\varinjlim X_{i}$ 是**形式记法** —— 对象是「滤过图」本身，不是它的余极限（余极限可能压根不存在）。',
        '**公式为什么长这样**：要给两个形式余极限之间的映射，先固定 $j$，对每个 $i$ 给一条 $X_{i} \\to Y_{j}$ 且与 $i$ 的变动相容（这就是 $\\varprojlim_{i}$），再对 $j$ 取滤过余极限（$Y_{j}$ 越往后越大，晚给的映射可以「补」上早先的）。',
        '**例子**：$\\operatorname{Ind}(\\mathbf{FinSet})$ 是「所有集合」（每个集合都是它有限子集的滤过余极限）；$K$-理论的「向量丛按直和/余极限补全」用的也是它。',
        '📌 对偶地有 **Pro-对象**：把滤过图换成**余滤过**图，得到 $\\operatorname{Pro}(\\mathcal{C})$（profinite 空间就是 $\\operatorname{Pro}(\\mathbf{FinSet})$）。'
      ].join('\n\n')
    },

    /* ---------------------------------------------- 保极限（定义） */
    {
      id: 'def.preserves-limit',
      cluster: 'cat.functor',
      type: 'definition',
      label: '保极限的函子',
      title: '函子保极限（Preservation of Limits）',
      regions: ['category'],
      tags: ['范畴论', '保极限', '保余极限', '函子'],
      statement: [
        '设 $D : I \\to \\mathcal{C}$ 是图、$F : \\mathcal{C} \\to \\mathcal{D}$ 是函子。$F$ 诱导出锥之间的比较映射',
        '',
        '$$F(\\lim D) \\longrightarrow \\lim (F \\circ D).$$',
        '',
        '若这个比较映射对**每个**（相应型别的）图 $D$ 都是同构，就说 $F$ **保极限**（记 $\\lim D \\cong \\lim F \\circ D$）。对偶地：**保余极限**。'
      ].join('\n'),
      notes: [
        '**比较映射是怎么来的**：$\\lim D$ 是 $D$ 的泛锥，$F$ 作用之后给出 $F \\circ D$ 的一个锥，于是由 $\\lim(F\\circ D)$ 的泛性质唯一地得到 $F(\\lim D) \\to \\lim(F\\circ D)$。所以「保极限」永远是这个**由泛性质自动存在的**映射恰好可逆。',
        '⭐ **最常用的一条**：**右伴随保所有极限**（对偶地左伴随保所有余极限）。证明只用伴随同构与极限的泛性质，不需要任何具体构造。',
        '**弱一点的说法**：$F$ 保**有限**极限（= **left exact**）、保**滤过**余极限（AB5 那一条）、保**积**、保**等化子**……都是把上面的「每个图」限制到某一类图。',
        '⚠️ 与「$F$ 连续」区分：这里说的连续函子（continuous functor）是**保极限**，与拓扑里的连续无关。'
      ].join('\n\n')
    },

    /* ------------------------------------------------ 正合函子 */
    {
      id: 'def.exact-functor',
      cluster: 'cat.functor',
      type: 'definition',
      label: '正合函子',
      title: '左正合 / 右正合 / 正合函子（Exact Functor）',
      regions: ['category'],
      tags: ['范畴论', '正合函子', '左正合', '右正合'],
      statement: [
        '函子 $F$ 叫**左正合的**（left exact），如果它保所有**有限极限**；叫**右正合的**（right exact），如果它保所有**有限余极限**；两者都对时叫**正合的**（exact）。'
      ].join('\n'),
      notes: [
        '**为什么「有限」**：一般范畴里「左正合」的用法来自阿贝尔范畴 —— 那里只要保 $0$、有限积、核，就等价于「把短正合列 $0 \\to M\' \\to M \\to M\'\' \\to 0$ 送成 $0 \\to FM\' \\to FM \\to FM\'\'$（正的、左边正合）」。所以名字里的「正合」指的就是正合列。',
        '⭐ **右伴随是左正合的，左伴随是右正合的** —— 这是「伴随 $\\implies$ 保极限 / 保余极限」的直接后果，也是最常用的判据。',
        '**在阿贝尔范畴里更好用**：$F$ 左正合 $\\iff$ 它保核（$F(\\ker) = \\ker$）；$F$ 正合 $\\iff$ 它把短正合列送成短正合列。',
        '⚠️ 名字有歧义：有的书把「正合」只指保**有限**极限，有的指保**所有**极限。本图统一按上面这条（保有限极限/余极限）。'
      ].join('\n\n')
    },

    /* ---------------------------------------------------- 零对象 */
    {
      id: 'def.zero-object',
      cluster: 'cat.limit',
      type: 'definition',
      label: '零对象与直和',
      title: '零对象、双积与直和',
      regions: ['category'],
      tags: ['范畴论', '零对象', '双积', '直和', '加法范畴'],
      statement: [
        '范畴 $\\mathcal{C}$ 里的对象 $0$ 叫**零对象**，如果它**既是终对象又是始对象**（等价地 $\\operatorname{End}(0) = \\{ \\mathrm{id} \\}$，唯一的自同态是零）。',
        '',
        '一族对象 $(M_{i})_{i \\in I}$ 的**双积**（biproduct）是「积与余积恰好重合」的对象，记 $\\bigoplus_{i \\in I} M_{i}$；代数里就叫**直和**。'
      ].join('\n'),
      notes: [
        '**零对象给出零态射**：任意 $X \\to Y$ 都可以经 $X \\to 0 \\to Y$ 分解，得到的态射记 $0_{X,Y}$。所有「$f = 0$」「$f \\ne 0$」的说法都靠它。',
        '**双积为什么会重合**：在**预加性**范畴里，积与余积只要存在就自动一致（两个泛性质能互相满足），所以可以只谈一个。$M \\oplus N$ 的元素形式上写成 $f + g$（从 $M$ 与 $N$ 各来一条）。',
        '⚠️ 零对象在**不一定有**的范畴里可能不存在（如 $\\mathbf{Set}$：空集是始对象，但终对象是单点集，两者不同）。$\\mathbf{Ab}$、$A\\text{-}\\mathbf{Mod}$ 里当然是同一个 $\\{0\\}$。'
      ].join('\n\n'),
      refs: ['Le Stum, Definition 5.1.4'],
    },

    /* -------------------------------------------------- 加法函子 */
    {
      id: 'def.additive-functor',
      cluster: 'hom.ab',
      type: 'definition',
      label: '加法函子',
      title: '加法函子（Additive Functor）',
      regions: ['homology'],
      tags: ['同调代数', '加法函子', '预加性', '直和'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{D}$ 是两个**预加性范畴**。函子 $F : \\mathcal{C} \\to \\mathcal{D}$ 叫**加法函子**，如果对每对 $M, N \\in \\mathcal{C}$，映射',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{C}}(M, N) \\longrightarrow \\operatorname{Hom}_{\\mathcal{D}}(F(M), F(N)), \\qquad f \\longmapsto F(f)$$',
        '',
        '是**阿贝尔群同态**（即保加法、保 $0$）。'
      ].join('\n'),
      notes: [
        '**等价说法**：加法函子自动保**有限直和**（$F(M \\oplus N) \\cong F(M) \\oplus F(N)$），而且 $F(0) = 0$。反过来，一个保有限直和的函子（在预加性范畴之间）也是加法的。',
        '⭐ **为什么同调代数只谈加法函子**：求导函子、$\\operatorname{Ext}$、$H^{n}$ 都是加法的。复形上的运算（$d^{2}=0$、取同调、映射锥）每一步都是**加减法**，非加法函子连复形都送不成复形。',
        '**例子**：$\\operatorname{Hom}(X, -)$ 是加法的（$\\operatorname{Hom}$ 本身是阿贝尔群）；$M \\otimes_{A} -$ 是加法的；遗忘函子 $A\\text{-}\\mathbf{Mod} \\to \\mathbf{Ab}$ 是加法的。',
        '⚠️ 「加法」与「左正合/右正合」是两件事：加法只是保群结构，正合才是保核与余核。加法是前提，正合是进一步的条件。'
      ].join('\n\n')
    },

    /* ------------------------------------------------ 分裂正合列 */
    {
      id: 'def.split-exact',
      cluster: 'hom.ab',
      type: 'definition',
      label: '分裂短正合列',
      title: '分裂的短正合列（Split Exact Sequence）',
      regions: ['homology'],
      tags: ['同调代数', '短正合列', '分裂', '直和'],
      statement: [
        '短正合列',
        '',
        '$$0 \\longrightarrow M_{1} \\xrightarrow{\\;i_{1}\\;} M \\xrightarrow{\\;i_{2}\\;} M_{2} \\longrightarrow 0$$',
        '叫**分裂的**，如果它同构于',
        '',
        '$$0 \\longrightarrow M_{1} \\xrightarrow{\\;\\mathrm{pr}_{1}\\;} M_{1} \\oplus M_{2} \\xrightarrow{\\;\\mathrm{pr}_{2}\\;} M_{2} \\longrightarrow 0$$',
        '',
        '（即 $i_{1}$ 是到直和第一个分量的含入、$i_{2}$ 是到第二个分量的投影）。'
      ].join('\n'),
      notes: [
        '**等价判据**（在阿贝尔范畴里，三条等价）：',
        '',
        [
          '- $i_{2}$ 有**截面** $s : M_{2} \\to M$（$i_{2} \\circ s = \\mathrm{id}$）；',
          '- $i_{1}$ 有**收缩** $r : M \\to M_{1}$（$r \\circ i_{1} = \\mathrm{id}$）；',
          '- $M \\cong M_{1} \\oplus M_{2}$ 与这个列相容。'
        ].join('\n'),
        '⭐ **这就是「分裂引理」**（split lemma）：在加法范畴里，「短正合列分裂」与「有截面」与「是直和」是同一件事。它把**列论的问题化成直和的问题** —— 这是同调代数里最常用的一步化简。',
        '⚠️ 短正合列一般**不**分裂（$0 \\to \\mathbb{Z} \\xrightarrow{2} \\mathbb{Z} \\to \\mathbb{Z}/2 \\to 0$ 就不分裂）—— 分裂是特殊情形，判断它分不分裂正是 $\\operatorname{Ext}^{1}$ 要回答的问题。'
      ].join('\n\n')
    },

    /* ------------------------------------------------ 足够多投射 */
    {
      id: 'def.enough-projectives',
      cluster: 'hom.ab',
      type: 'definition',
      label: '足够多投射对象',
      title: '足够多投射对象（Enough Projectives）',
      regions: ['homology'],
      tags: ['同调代数', '投射对象', '足够多', '消解'],
      statement: [
        '范畴 $\\mathcal{C}$ **有足够多的投射对象**，如果对每个 $X \\in \\mathcal{C}$，都存在投射对象 $P$ 与**满态射**',
        '',
        '$$P \\twoheadrightarrow X.$$',
        '',
        '对偶地：**有足够多的内射对象**，如果每个 $X$ 都能**单射**进某个内射对象 $X \\hookrightarrow I$。'
      ].join('\n'),
      notes: [
        '⭐ **它保证投射消解存在**：由 $P_{0} \\twoheadrightarrow X$ 起，把核 $\\ker(P_{0} \\to X)$ 再用一个投射对象盖住，如此递归得到**投射消解**',
        '',
        '$$\\cdots \\to P_{2} \\to P_{1} \\to P_{0} \\to X \\to 0,$$',
        '',
        '于是可以取左导出函子（$\\operatorname{Tor}$、$L^{n}F$）。对偶地足够多内射给出**内射消解**与右导出函子（$\\operatorname{Ext}^{n}$、$R^{n}F$）。',
        '**为什么需要「足够多」这个条件**：导出函子是把对象换成消解再取同调，若某个对象压根没有消解，定义就卡住。所以同调代数挑范畴时会点名「有足够多投射 / 内射」。',
        '**例子**：$A\\text{-}\\mathbf{Mod}$ 两个都有（自由模投射、每个模可嵌入内射模）；$\\mathrm{CondAb}$ 有足够多投射（有限表现的投射凝聚态阿贝尔群生成它）；**Grothendieck 范畴自动有足够多内射**。',
      ].join('\n\n'),
      refs: ['Le Stum, Definition 1.4.8'],
    },

    /* ------------------------------------------------ 有限表现 */
    {
      id: 'def.finitely-presented',
      cluster: 'cat.yoneda',
      type: 'definition',
      label: '有限表现对象',
      title: '有限表现（紧）对象（Finitely Presented Object）',
      regions: ['category'],
      tags: ['范畴论', '有限表现', '紧对象', '可表函子'],
      statement: [
        '对象 $X \\in \\mathcal{C}$ 叫**有限表现的**（也叫**紧的**，compact），如果可表函子',
        '',
        '$$h^{X} = \\operatorname{Hom}_{\\mathcal{C}}(X, -)$$',
        '',
        '**保滤过余极限**：对每个滤过图 $D$，$\\operatorname{Hom}(X, \\varinjlim D) \\cong \\varinjlim \\operatorname{Hom}(X, D(-))$。'
      ].join('\n'),
      notes: [
        '**直观**：「测 $X$」不需要等到极限做完 —— 从 $X$ 出发的映射**在有限阶段就已经确定**，后面的滤过余极限只是把它们拼起来。所以「紧」=「不往无穷处伸手」。',
        '**例子**：有限集（$\\mathbf{Set}$ 里）、有限生成模（$A\\text{-}\\mathbf{Mod}$ 里）、有限 CW 复形（拓扑里）。$\\mathbb{R}$ 在 $\\mathbf{Top}$ 里**不是**紧的（$\\mathbb{R}$ 是有限区间的滤过余极限，但 $\\operatorname{Hom}(\\mathbb{R},-)$ 不保那个余极限）。',
        '⭐ **在同调代数里的用处**：$X$ 有限表现 $\\iff$ $h^{X}$ 保滤过余极限 $\\iff$ $X$ 是「小」的测试对象。凝聚态那一侧「CondAb 由有限表现的投射对象生成」正是靠它 —— 有限表现的投射对象是 $\\mathrm{CondAb}$ 的生成元。',
        '⚠️ 「有限表现」与「有限生成」不同：有限生成只要求有一个满射 $A^{n} \\twoheadrightarrow M$；有限表现还要求核也是有限生成的（即 $A^{m} \\to A^{n} \\to M \\to 0$ 正合）。'
      ].join('\n\n')
    },

    /* ---------------------------------------------- 同构的截面唯一 */
    {
      id: 'prop.iso-unique-section',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '同构的截面与收缩唯一',
      title: '同构的截面与收缩',
      regions: ['category'],
      tags: ['范畴论', '同构', '截面', '收缩'],
      statement: '若 $f : X \\to Y$ 是**同构**，则它的**截面**与**收缩**都存在且**唯一**，而且两者相等，都等于 $f^{-1}$。',
    notes:         ['**证明。** 设 $f : X \\to Y$ 是同构，记 $g := f^{-1}$。','- **存在**：$g f = 1_{X}$ 且 $f g = 1_{Y}$，故 $g$ 既是 $f$ 的截面（$f g = 1_{Y}$）又是收缩（$g f = 1_{X}$）✓。','- **截面唯一**：设 $s : Y\\to X$ 满足 $f s = 1_{Y}$，则 $s = 1_{X}\\,s = (g f)\\,s = g\\,(f s) = g\\,1_{Y} = g$ ✓。','- **收缩唯一**：设 $r : X \\to Y$ 满足 $r f = 1_{X}$，则 $r = r\\,1_{X} = r\\,(f g) = (r f)\\,g = 1_{X}\\,g = g$ ✓。','两件事并起来：截面与收缩都存在、都唯一，且都等于 $f^{-1}$ ✓。∎'].join('\n'),
    }
  ],

  edges: []
});
