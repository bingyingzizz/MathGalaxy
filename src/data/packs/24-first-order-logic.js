/* ==========================================================================
   内容包 · 一阶语言与公式
   --------------------------------------------------------------------------
   逻辑星系一直是空的，而它在图上并不是「还没写到的位置」—— 它是**被用到却没节点**
   的位置：分离公理模式与替换公理模式都是**公理模式**，写的是

       对每个公式 $\varphi (x, p)$（其中 $B$ 不出现），下面是一条公理

   可是「公式」和「一阶语言」在图里从来没有节点。也就是说，星图上最底层的两条
   公理依赖着一个不存在的概念。这一包补上它。

   ⭐ 这一包是内容准则第 ① 条的**唯一一处豁免**，而且必须豁免：
      一阶语言是**元层**的 —— 它是写公理用的那门语言，比 ZFC 本身更原始。
      若要「由更下面的东西造出来」，就必须先在 ZFC 内部把符号和公式编码成集合，
      那需要先有 ZFC 的公理，而公理模式又需要公式 —— 直接成环。
      所以它跟 ZF 公理同在最底层，不往上连依赖边（见各节点的 notes）。

   构造路线：

       符号表 ──→ 一阶语言 ──→ 项与公式 ──→ 代入
                                    └────→ 满足关系 $\models$
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '一阶语言与公式',

  nodes: [

    /* ------------------------------------------------------ 一阶语言 */
    {
      id: 'def.first-order-language',
      cluster: 'logic.fol',
      type: 'definition',
      label: '一阶语言',
      title: '一阶语言 $\\mathcal{L}$（First-Order Language）',
      regions: ['logic'],
      tags: ['定义', '逻辑', '一阶语言', '语法'],
      statement: [
        '**一阶语言** $\\mathcal{L}$ 由一张**符号表**给定，符号分两类：',
        '',
        '- **逻辑符号**（所有一阶语言共用）：可数多个**变元** $v_{0}, v_{1}, v_{2}, \\dots$；连接词 $\\neg$；量词 $\\forall$；等号 $=$；括号。',
        '- **非逻辑符号**（每个语言自己的）：**常元符号**、**$n$ 元函数符号**、**$n$ 元关系符号**，每一种都带一个确定的元数 $n$。',
        '',
        '由符号表，用三条**语法规则**生成全部的**项**与**公式**：',
        '',
        '1. 变元、常元符号是**项**；若 $f$ 是 $n$ 元函数符号而 $t_{1}, \\dots, t_{n}$ 是项，则 $f(t_{1}, \\dots, t_{n})$ 是项；',
        '2. 若 $R$ 是 $n$ 元关系符号而 $t_{1}, \\dots, t_{n}$ 是项，则 $R(t_{1}, \\dots, t_{n})$ 是**原子公式**；',
        '3. **公式**由原子公式出发，经 $\\neg$、$\\wedge$、$\\vee$、$\\to$、$\\forall v_{i}$、$\\exists v_{i}$ 反复组合而成。',
        '',
        '例：$\\mathcal{L} = \\{ \\in \\}$（$\\in$ 是一个二元关系符号）就是**集合论的语言** —— ZFC 的全部公理都写在这门语言里。'
      ].join('\n'),
      notes: [
        '⭐⭐ **这是星图里唯一的「原始层」对象。** 别的东西都是「由更下面的东西造出来」的，一阶语言不是 —— 它是**写公理用的那门语言**，比 ZFC 本身更原始。所以它跟 ZF 公理同在最底下的几层，**不往上连依赖边**：真要连，「公式」就得先在 ZFC 内部由集合造出来，而那要用 ZFC 的公理，可公理模式本身又需要公式 —— 直接成环。',
        '⭐ **在 ZFC 内部也能把它形式化**：把符号编码成集合、把公式编码成有限序列，「$\\varphi$ 是公式」于是成为 ZFC 里的一条性质。那是元数学的进一步工作，本图不展开。（这个方向正是 Gödel 不完备定理的入口。）',
        '⚠ **语言与结构要分开**：$\\mathcal{L} = \\{ \\in \\}$ 只规定了有哪些符号，还没说变元往哪里跑 —— 那是**满足关系**要说的事。'
      ].join('\n\n'),
      refs: ['Kunen, Set Theory, I.2', 'Enderton, A Mathematical Introduction to Logic, Ch. 1']
    },

    /* -------------------------------------------------------- 公式 */
    {
      id: 'def.formula',
      cluster: 'logic.fol',
      type: 'definition',
      label: '公式',
      title: '项与公式 / 语句（Formula, Sentence）',
      regions: ['logic'],
      tags: ['定义', '逻辑', '公式', '自由变元', '语句'],
      statement: [
        '（在给定的**一阶语言** $\\mathcal{L}$ 里）**公式**就是按语法规则 3 生成的表达式，即',
        '',
        '$$\\varphi ::= R(t_{1}, \\dots, t_{n}) \\;\\mid\\; \\neg \\varphi \\;\\mid\\; (\\varphi \\wedge \\psi) \\;\\mid\\; (\\varphi \\vee \\psi) \\;\\mid\\; (\\varphi \\to \\psi) \\;\\mid\\; \\forall v_{i} \\varphi \\;\\mid\\; \\exists v_{i} \\varphi$$',
        '',
        '其中 $R$ 遍历 $\\mathcal{L}$ 的关系符号，$t_{j}$ 遍历项（严格说这是一条**归纳定义**：公式全体是「含全部原子公式、并对上述运算封闭」的**最小**集合）。',
        '',
        '变元在 $\\forall v_{i}$、$\\exists v_{i}$ 的辖域内出现叫**约束出现**，否则叫**自由出现**；没有自由变元的公式叫**语句**（闭公式）。',
        '',
        '公式的**复杂度**（连接词与量词的个数）可以做归纳 —— 这是「对公式作归纳」的依据。'
      ].join('\n'),
      notes: [
        '⭐ **「$\\varphi (x, p)$」这种写法在说什么**：它表示 $\\varphi$ 是一个公式，且其中的自由变元都在 $\\{ x, p \\}$ 里（未必都用上）。分离公理模式里写的「对每个公式 $\\varphi$（$B$ 不出现）」说的就是这种约定 —— **公式是元数学概念，不是 ZFC 的对象**，所以「不出现」才是一句关于符号串的话。',
        '⭐ **归纳定义 = 最小集合**：这句话背后用的是 $\\mathbb{N}$ 上的归纳（见「归纳原理与递推定义」）。同时它也是「公式的复杂度可以做归纳」的原因 —— 两者是同一件事的两面。',
        '⚠ **只留一部分原始符号**：$\\exists$ 是 $\\neg \\forall \\neg$ 的缩写，$\\vee$、$\\to$ 也可由 $\\neg, \\wedge$ 定义。原始符号越少，语法规则和后续的证明就越短，代价是写公式时多几层括号。',
        '⚠ 「变元换成项」的操作是**代入**，它有个必须小心的坑（变元捕获），单独一个节点。'
      ].join('\n\n'),
      refs: ['Enderton, A Mathematical Introduction to Logic, Ch. 1', 'Kunen, Set Theory, I.2']
    },

    /* -------------------------------------------------------- 代入 */
    {
      id: 'def.substitution',
      cluster: 'logic.fol',
      type: 'definition',
      label: '代入',
      title: '代入 $\\varphi (x/t)$（Substitution）',
      regions: ['logic'],
      tags: ['定义', '逻辑', '代入', '变元捕获'],
      statement: [
        '设 $x$ 是变元，$t$ 是项，$\\varphi$ 是公式。把 $\\varphi$ 中 $x$ 的**自由出现**全部换成 $t$，得到的公式记作',
        '',
        '$$\\varphi (x/t)$$',
        '',
        '称为 $t$ 对 $x$ 的**代入**（约束出现不动 —— 它们被量词管着）。',
        '',
        '⚠ 代入要求 $t$ 对 $\\varphi$ 中的 $x$ 是**可代入的**：$t$ 里出现的变元不会在代入后被 $\\varphi$ 里的量词「抓走」。这叫**变元捕获**。'
      ].join('\n'),
      notes: [
        '⚠ **捕获是什么样**：取 $\\varphi = \\exists y\\, (y > x)$、$t = y$。直接代入得 $\\exists y\\, (y > y)$ —— 语义完全变了（原来「存在比 $x$ 大的数」，现在成了假命题）。这时要说「$t$ 对 $\\varphi$ 中的 $x$ 不可代入」。',
        '⭐ **代入在图上不是花边**：**替换公理模式**的整个内容就是「用一个公式 $\\varphi (x, y, p)$ 把 $A$ 中每个 $x$ 的像收集起来」，那里做的正是代入。',
        '⚠ 避免捕获的标准做法是先把冲突的约束变元**改名**（$\\alpha$-换名），再代入。这是逻辑教科书写起来最啰嗦、却绕不过去的一步。'
      ].join('\n\n'),
      refs: ['Enderton, A Mathematical Introduction to Logic, §2.4']
    },

    /* ------------------------------------------------------ 满足关系 */
    {
      id: 'def.satisfaction',
      cluster: 'logic.fol',
      type: 'definition',
      label: '满足关系',
      title: '结构与满足关系 $\\models$（Tarski）',
      regions: ['logic'],
      tags: ['定义', '逻辑', '模型论', 'Tarski', '语义'],
      statement: [
        '设 $\\mathcal{L}$ 是**一阶语言**。$\\mathcal{L}$ 的一个**结构** $\\mathfrak{A}$ 指：一个非空集合 $A$（**论域**），连同每个常元符号、$n$ 元函数符号、$n$ 元关系符号在 $A$ 上的**解释**。再给定一个**赋值** $s$（给每个变元指定 $A$ 中一个元素）。',
        '',
        '**满足关系** $\\mathfrak{A} \\models \\varphi [s]$（「$\\varphi$ 在 $\\mathfrak{A}$ 中关于赋值 $s$ 成立」）按公式的复杂度**递归定义**：',
        '',
        '- **原子公式**：按符号的解释直接算，例如 $\\mathfrak{A} \\models R(t_{1}, \\dots, t_{n})[s]$ 当且仅当 $(t_{1}^{\\mathfrak{A}}[s], \\dots, t_{n}^{\\mathfrak{A}}[s]) \\in R^{\\mathfrak{A}}$；',
        '- $\\mathfrak{A} \\models \\neg \\varphi [s]$，当且仅当 $\\mathfrak{A} \\models \\varphi [s]$ **不**成立；',
        '- $\\mathfrak{A} \\models (\\varphi \\wedge \\psi)[s]$，当且仅当两者都成立；',
        '- $\\mathfrak{A} \\models \\forall v_{i} \\varphi [s]$，当且仅当对**每个** $a \\in A$ 都有 $\\mathfrak{A} \\models \\varphi [s(v_{i} \\mapsto a)]$。',
        '',
        '当 $\\varphi$ 是**语句**（无自由变元）时，$\\mathfrak{A} \\models \\varphi$ 与赋值 $s$ 无关，直接说 $\\varphi$ 在 $\\mathfrak{A}$ 中**成立**，记 $\\mathfrak{A} \\models \\varphi$。'
      ].join('\n'),
      notes: [
        '⭐ **这个递归定义有根据**：它是按公式的**复杂度**递归的，而复杂度能递归的依据是公式由语法规则**归纳生成**（见「公式」）。语义建立在语法之上 —— 这是这门课的第一条纪律。',
        '⭐ $\\models$ 是「$\\varphi$ 在 $\\mathfrak{A}$ 里为真」的严格含义。整个模型论从这里开始：紧性、完备性、Löwenheim–Skolem 说的都是 $\\models$ 与**可证明性** $\\vdash$ 的关系。',
        '⚠ **$\\models$ 与 $\\vdash$ 是两回事**：前者是**语义**（在结构里为真），后者是**语法**（由公理按规则形式推出）。一阶逻辑的完备性定理说的正是两者在一阶情形下重合 —— 那也是「$\\mathrm{ZFC} \\vdash \\varphi$ 与 $\\mathrm{ZFC} \\models \\varphi$ 可以混着用」的依据。'
      ].join('\n\n'),
      refs: ['Enderton, A Mathematical Introduction to Logic, §2.2', 'Marker, Model Theory: An Introduction, §1.1']
    }
  ],

  edges: [

    /* ------------------------------------------------ 定义依赖骨架 */
    {
      id: 'dep.lang-formula',
      kind: 'definition',
      definition: 'def.first-order-language',
      usedBy: 'def.formula',
      note: '公式是**某个语言**的公式：先有符号表，才有那三条语法规则。'
    },
    {
      id: 'dep.formula-substitution',
      kind: 'definition',
      definition: 'def.formula',
      usedBy: 'def.substitution',
      note: '代入是作用在**公式**上的操作（只换自由出现）。'
    },
    {
      id: 'dep.lang-satisfaction',
      kind: 'definition',
      definition: 'def.first-order-language',
      usedBy: 'def.satisfaction',
      note: '满足关系必须相对**一门语言**（决定有哪些符号）和一个结构来说。'
    },
    {
      id: 'dep.formula-satisfaction',
      kind: 'definition',
      definition: 'def.formula',
      usedBy: 'def.satisfaction',
      note: '$\\models$ 按**公式的复杂度**递归定义 —— 没有「公式由语法规则生成」这件事，这个递归就没有落脚点。'
    },

    /* ------------------------------------ 公理模式用到的逻辑概念 */
    {
      id: 'def-link.formula-sep',
      kind: 'definition',
      definition: 'def.formula',
      usedBy: 'ax.sep',
      note: '分离公理模式写的是「对**每个公式** $\\varphi (x, p)$（其中 $B$ 不出现），下面是一条公理」—— 它是公理**模式**而不是单条公理，正在于它要对每个公式都发一条。'
    },
    {
      id: 'def-link.formula-repl',
      kind: 'definition',
      definition: 'def.formula',
      usedBy: 'ax.repl',
      note: '替换公理模式同样是「对每个公式一条公理」。'
    },
    {
      id: 'def-link.substitution-repl',
      kind: 'definition',
      definition: 'def.substitution',
      usedBy: 'ax.repl',
      note: '替换公理模式把 $A$ 中每个 $x$ 在公式 $\\varphi (x, y, p)$ 下的像收集起来 —— 这一步做的就是**代入**。'
    }
  ]
});
