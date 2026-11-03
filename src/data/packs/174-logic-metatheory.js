/* ============================================================================
   内容包 · 逻辑的另一半：句法侧与两条元定理（2026-11-03，T8 / 审计 E3）
   ----------------------------------------------------------------------------
   病灶：满足关系 ⊨（满足关系 ⊨）的**出边是 0** —— 语义是终点站；
   而「⊢（可证明性）**全库没有节点**」，尽管 满足关系 ⊨ 的注把 ⊨ vs ⊢
   当成核心对照物。紧致性定理 / 完备性定理只活在注里。
   ⇒ 逻辑区只有「语法 + 语义」，没有「证明论」，也没有把两者连起来的定理。

   补三个节点 + 接线。⛔ 逻辑侧**接拓扑只能走类比边**（审计已验证：已有的
   `def.compact → … → def.formula` 路径意味着任何「逻辑节点 definition 依赖拓扑节点」
   都会造环），所以与拓扑/代数那边一律 `analogy`。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '逻辑：可证明性、完备性、紧致性',

  nodes: [
    {
      id: 'def.provability',
      cluster: 'logic.fol',
      type: 'definition',
      label: '可证明性',
      title: '可证明性 $\\Gamma \\vdash \\varphi$（句法侧）',
      regions: ['logic'],
      tags: ['定义', '数理逻辑', '证明论'],
      statement: [
        '设 $\\Gamma$ 是一组公式（一个**理论**），$\\varphi$ 是公式。称 $\\varphi$ **可由 $\\Gamma$ 证明**，记作',
        '',
        '$$\\Gamma \\vdash \\varphi,$$',
        '',
        '如果存在一个**有限**的公式序列 $\\varphi_{1}, \\ldots, \\varphi_{n} = \\varphi$，其中每一步 $\\varphi_{k}$ 满足下列之一：',
        '',
        '- $\\varphi_{k}$ 是一条**逻辑公理**；',
        '- $\\varphi_{k} \\in \\Gamma$；',
        '- $\\varphi_{k}$ 由它前面的两条 $\\varphi_{i}$、$\\varphi_{j}$（其中 $\\varphi_{j} = \\varphi_{i} \\to \\varphi_{k}$）经**分离规则**（modus ponens）得到；',
        '- $\\varphi_{k} = \\forall x\\,\\psi$，且 $\\psi$ 出现在前面（**推广规则**）。',
        '',
        '这样的序列叫 $\\varphi$ 的一个**证明**。$\\Gamma$ **不一致**指存在 $\\varphi$ 使 $\\Gamma \\vdash \\varphi$ 且 $\\Gamma \\vdash \\neg\\varphi$。',
      ].join('\n'),
      notes: [
        '⭐ **这是纯句法**：定义里没有「真」「模型」「满足」—— 只要求一张公式表、几条公理、两条推理规则，' +
          '每一步都能机器核对。这也是「形式证明」能被计算机验证的全部理由。',
        '⭐ **⊢ 与 ⊨ 的分工**（本图的对照轴）：⊨（满足关系 ⊨）说「在所有模型里都真」，' +
          '⊢ 说「有一步接一步的证明」。两者**恒等**就是完备性定理（`thm.completeness-first-order`）—— ' +
          '那是这两个概念之间唯一的一条桥，也是数理逻辑最基本的一条定理。',
        '⚠ **逻辑公理的取法不唯一**：Hilbert 型（上面这套）、自然演绎、相继式演算给出的**可证明关系**是同一个' +
          '（在同一条完备性定理之下）。所以「$\\vdash$ 的定义依赖某套公理」不是问题：外延不变。',
        '⚠ 「有限」这个词是本质的：证明是一个**有限**序列。紧致性定理（紧致性定理）正是把' +
          '「每个有限子集都有模型」升级成「整个理论有模型」，靠的就是这一点。',
      ].join('\n\n'),
      refs: ['Enderton, A Mathematical Introduction to Logic, Ch. 2', 'Kunen, Set Theory, Ch. I'],
    },

    {
      id: 'thm.completeness-first-order',
      cluster: 'logic.fol',
      type: 'theorem',
      status: 'skeleton',
      label: '完备性定理',
      title: '一阶逻辑完备性定理（Gödel）：$\\Gamma \\vdash \\varphi \\iff \\Gamma \\vDash \\varphi$',
      regions: ['logic'],
      tags: ['定理', '数理逻辑', '元定理'],
      statement: [
        '设 $\\Gamma$ 是一组公式，$\\varphi$ 是公式。则',
        '',
        '$$\\Gamma \\vdash \\varphi \\iff \\Gamma \\vDash \\varphi,$$',
        '',
        '即：**可证明**与**在所有模型中都真**是同一件事。等价的形式：$\\Gamma$ 有模型 $\\iff$ $\\Gamma$ 一致。',
      ].join('\n'),
      notes: [
        '⭐ **两个方向的分量完全不同**：',
        '- $\\vdash \\implies \\vDash$（**可靠性** / soundness）：公理都是永真的、推理规则保持真值，' +
          '所以逐条归纳即可 —— 这一段是**免费的**，也是「证明能保证正确」的全部依据。',
        '- $\\vDash \\implies \\vdash$（**完备性**，Gödel 1930）：**这才是内容**。经典证明是 Henkin 构造：' +
          '把一致的理论扩充成**极大一致**理论、对每个存在式加一个见证常元、再用项本身当元素造出项模型。',
        '⚠ **这里的「完备性」与「完备空间 / 完备测度」毫无关系**（那三个是 完备空间 / 完备测度 那一族）—— ' +
          '同一个中文词的第五个意思，读的时候要认清。',
        '⚠ 一阶逻辑的完备性**不**违背 Gödel 不完备性定理：后者说的是「足够强的理论（如 PA/ZFC）里存在' +
          '既不能证也不能证伪的**句子**」，那是关于**理论**的，不是关于逻辑的。',
        '📌 本图只给陈述与证明骨架（Henkin 构造的三个动作），没有把项模型展开成节点。',
      ].join('\n\n'),
      refs: ['Enderton, A Mathematical Introduction to Logic, Ch. 2.5', 'Kunen, Set Theory, Ch. I'],
    },

    {
      id: 'thm.compactness',
      cluster: 'logic.fol',
      type: 'theorem',
      label: '紧致性定理',
      title: '紧致性定理：每个有限子集可满足 $\\implies$ 整个理论可满足',
      regions: ['logic'],
      tags: ['定理', '数理逻辑', '元定理'],
      statement: [
        '设 $\\Gamma$ 是一组一阶公式。若 $\\Gamma$ 的**每个有限子集**都有模型，则 $\\Gamma$ 本身有模型。',
        '',
        '等价说法：若 $\\Gamma \\vDash \\varphi$，则存在**有限**的 $\\Gamma_{0} \\subseteq \\Gamma$ 使 $\\Gamma_{0} \\vDash \\varphi$。',
      ].join('\n'),
      notes: [
        '⭐ **它是一句话的推论**：由完备性定理，有模型 $\\iff$ 一致；而不一致要由一个**有限的**证明见证，' +
          '那个证明只用到 $\\Gamma$ 的有限多条 —— 于是「不一致」总是有限可见的，取逆否即得紧致性。',
        '⭐ **第二个证法**（不走完备性）：用超积 / Łoś 定理 —— 取指标集为有限子集的定向族，' +
          '每个有限子集挑一个模型，超积就是整个理论的模型。本图没有超积这个节点，故只记一句。',
        '⭐ **它是「一阶逻辑不能表达有限性」的根据**：让 $\\Gamma$ 是「域 + 特征 0 + 有限」的无穷多条，' +
          '每个有限子集都能在某个有限域里满足，于是整体有模型 —— 一个**无限**的「有限域」。' +
          '同样地，「自然数标准模型」不能被一阶公理刻画：非标准分析就是这条定理的直接产物。',
        '⚠ **与拓扑的紧致（`def.compact`）只是名字像**：那条说的是「每个开覆盖有有限子覆盖」，' +
          '这条说的是「有限可满足 $\\implies$ 整体可满足」。两者**没有任何边**（要连也只能是类比）。',
      ].join('\n\n'),
      refs: ['Enderton, A Mathematical Introduction to Logic, Ch. 2.5', 'Chang–Keisler, Model Theory'],
    },
  ],

  edges: [
    /* -------- 句法侧的地基 -------- */
    {
      id: 'dep.formula-provability',
      kind: 'definition',
      definition: 'def.formula',
      usedBy: 'def.provability',
      note: '证明是**公式**的有限序列：没有「公式」这个概念，$\\vdash$ 无从谈起。',
    },
    /* -------- 完备性定理：把 ⊢ 与 ⊨ 接起来的两条前提 -------- */
    {
      id: 'dep.provability-completeness',
      kind: 'definition',
      definition: 'def.provability',
      usedBy: 'thm.completeness-first-order',
      note: '定理的一边就是句法的可证明性 $\\vdash$。',
    },
    {
      id: 'dep.satisfaction-completeness',
      kind: 'definition',
      definition: 'def.satisfaction',
      usedBy: 'thm.completeness-first-order',
      note: '另一边是语义的满足 $\\vDash$。⚠ 这条边顺带把 满足关系 ⊨ 从「终点站」' +
        '变成有出边的节点 —— 此前它的出边是 0（审计 E3）。',
    },
    /* -------- 紧致性由完备性推出 -------- */
    {
      id: 'imp.completeness-compactness',
      kind: 'implication',
      sources: ['thm.completeness-first-order'],
      target: 'thm.compactness',
      title: '完备性 $\\implies$ 紧致性',
      proof: [
        '设 $\\Gamma$ 的每个有限子集都有模型。反设 $\\Gamma$ 没有模型，即 $\\Gamma \\vDash \\bot$。',
        '',
        '由完备性定理（$\\vDash \\implies \\vdash$），$\\Gamma \\vdash \\bot$；而一个证明是**有限**序列，' +
          '只用到 $\\Gamma$ 的有限多个成员，于是存在有限 $\\Gamma_{0} \\subseteq \\Gamma$ 使 $\\Gamma_{0} \\vdash \\bot$。',
        '',
        '再由可靠性（$\\vdash \\implies \\vDash$），$\\Gamma_{0} \\vDash \\bot$ —— 即 $\\Gamma_{0}$ 没有模型，' +
          '与「每个有限子集都有模型」矛盾。∎',
        '',
        '⚠ 用到了「证明有限」这一条（`def.provability` 的定义里就写着）—— 这是整个论证的关键。',
      ].join('\n'),
    },
    /* -------- 跨区：只能类比（逻辑↔拓扑/代数的 definition 边会造环） -------- */
    {
      kind: 'analogy',
      a: 'thm.compactness',
      b: 'def.compact',
      title: '两种「紧」：有限可满足 vs 有限子覆盖',
      note: [
        '名字撞车，机制不同：拓扑的紧是**开覆盖**的有限性，逻辑的紧是**有限可满足**推出整体可满足。',
        '⚠ 但两者不是毫无关系：用 Stone 空间（`def.stone-space`），命题逻辑的紧致性可以从' +
          '「$\\{0,1\\}^{\\text{公式集}}$ 紧」推出来 —— 本图没有把这条路径做成节点，所以这里只记类比。',
        '⛔ 不能做成 definition：已有的 `def.compact → … → def.formula` 路径意味着反向接线会成环。',
      ].join('\n\n'),
    },
    {
      kind: 'analogy',
      a: 'thm.compactness',
      b: 'thm.tykhonov',
      title: '有限性原理的两个化身：紧致性定理与 Tychonoff',
      note: [
        '两条都在说「**局部/有限**的都行 $\\implies$ 整体也行」：',
        'Tychonoff 是每个坐标空间的紧性拼出乘积空间的紧性；紧致性定理是每个有限子集有模型拼出整体有模型。',
        '在 Boolean 代数 / Stone 对偶下它们确实相通（命题逻辑的紧致性可由 Cantor 空间紧得出），' +
          '但那需要把 Stone 表示对偶做到逻辑层 —— 本图还没做，所以只记类比。',
      ].join('\n\n'),
    },
    {
      kind: 'analogy',
      a: 'def.provability',
      b: 'thm.boolean-stone',
      title: '证明论 $\\leftrightarrow$ Boolean 代数：命题逻辑的 Stone 表示',
      note: [
        '命题逻辑的**代数化**就是布尔代数：公式模「可证等价」得到布尔代数，' +
          '而 `thm.boolean-stone`（$\\mathbf{BoolRing}^{\\mathrm{op}} \\simeq \\mathbf{Stone}$）说明这个代数' +
          '完全由它的 Stone 空间（超滤子空间）决定 —— 命题逻辑的完备性在那边就是「$\\operatorname{Spec}$ 非空」。',
        '⚠ 本图没有「命题逻辑」这个节点（一阶逻辑才是主角），所以这条只作**联想线索**：' +
          '从「可证明性」跳到「Boolean 环 / Stone 空间」那条线的入口。',
      ].join('\n\n'),
    },
  ],
});
