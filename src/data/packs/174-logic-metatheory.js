/* ============================================================================
   内容包 · 逻辑的另一半：句法侧与两条元定理（2026-11-03，T8 / 审计 E3）
   ----------------------------------------------------------------------------
   病灶：满足关系 ⊨（满足关系 ⊨）的**出边是 0** —— 语义是终点站；
   而「⊢（可证明性）**全库没有节点**」，尽管 满足关系 ⊨ 的注把 ⊨ vs ⊢
   当成核心对照物。紧致性定理 / 完备性定理只活在注里。
   $\\implies$ 逻辑区只有「语法 + 语义」，没有「证明论」，也没有把两者连起来的定理。

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
        '**约定**：$\\vdash$ 取 `def.provability` 的 Hilbert 型系统（分离规则 + 推广），逻辑公理取标准模式：命题公理 (A1) $\\psi\\to(\\chi\\to\\psi)$、(A2) $(\\psi\\to(\\chi\\to\\theta))\\to((\\psi\\to\\chi)\\to(\\psi\\to\\theta))$、(A3) $(\\neg\\chi\\to\\neg\\psi)\\to(\\psi\\to\\chi)$；量词公理 (Q1) $\\forall x\\,\\psi\\to\\psi[t/x]$（$t$ 对 $x$ 可代入）、(Q2) $\\forall x(\\psi\\to\\chi)\\to(\\psi\\to\\forall x\\,\\chi)$（$x\\notin\\operatorname{FV}(\\psi)$）；等词公理 (E1) $x=x$、(E2) $x=y\\to(\\psi\\to\\psi[y/x])$。`def.provability` 没有逐条列出公理表，这里按标准取法固定一套；换等价系统不改变 $\\vdash$。$\\Gamma$ **不一致**指存在 $\\psi$ 使 $\\Gamma\\vdash\\psi$ 且 $\\Gamma\\vdash\\neg\\psi$，它等价于 $\\Gamma\\vdash\\neg(\\theta\\to\\theta)$。',
        '**第一步：化到语句。** 对 $\\Gamma\\cup\\{\\varphi\\}$ 中出现的每个自由变元 $x$ 添一个新常元 $c_x$，把公式里的 $x$ 全换成 $c_x$，得 $\\Gamma_c,\\varphi_c$。则 (i) $\\Gamma\\vdash\\varphi\\iff\\Gamma_c\\vdash\\varphi_c$：把证明里的 $c_x$ 换回自由变元 $x$（公理模式对代入封闭，分离与推广保持形状），反向把 $x$ 换成 $c_x$；(ii) $\\Gamma\\vDash\\varphi\\iff\\Gamma_c\\vDash\\varphi_c$：$\\mathcal{L}_c$ 的结构就是「$\\mathcal{L}$ 的结构 + 一个赋值」，反之每个赋值唯一延拓。所以只需对**语句**证明。',
        '**第二步：可靠性（$\\vdash\\implies\\vDash$）。** 逐条验证：命题公理是重言式；(Q1) 若 $\\forall x\\,\\psi$ 在 $\\mathfrak{A}$ 中真，则 $\\psi[t/x]$ 对每个 $t$ 的解释真；(Q2) 在 $x\\notin\\operatorname{FV}(\\psi)$ 时，若 $\\forall x(\\psi\\to\\chi)$ 与 $\\psi$ 真，则对每个 $a$ 有 $\\chi$ 真；(E1)(E2) 是等词的标准语义。分离规则保持「真」，推广保持「对所有赋值真」。对证明长度归纳得 $\\Gamma\\vdash\\varphi\\implies\\Gamma\\vDash\\varphi$。',
        '**第三步：演绎定理（语句版）。** 若 $\\sigma$ 是语句且 $\\Gamma\\cup\\{\\sigma\\}\\vdash\\psi$，则 $\\Gamma\\vdash\\sigma\\to\\psi$。对推导长度归纳：若该步是公理或 $\\Gamma$ 中公式 $\\theta$，用 (A1) $\\theta\\to(\\sigma\\to\\theta)$ 与分离规则；若是分离规则，用 (A2)；若是推广 $\\theta\\mapsto\\forall x\\,\\theta$，归纳假设给 $\\Gamma\\vdash\\sigma\\to\\theta$，推广得 $\\Gamma\\vdash\\forall x(\\sigma\\to\\theta)$，再由 (Q2)（$\\sigma$ 无自由 $x$）与分离规则得 $\\Gamma\\vdash\\sigma\\to\\forall x\\,\\theta$。∎',
        '**推论**：若 $\\Gamma\\cup\\{\\sigma\\}$ 不一致，则 $\\Gamma\\vdash\\neg\\sigma$；特别地，若 $\\Gamma\\cup\\{\\neg\\varphi\\}$ 不一致，则 $\\Gamma\\vdash\\varphi$。证明：演绎定理给 $\\Gamma\\vdash\\sigma\\to\\psi$ 与 $\\Gamma\\vdash\\sigma\\to\\neg\\psi$，而 $(\\sigma\\to\\psi)\\to((\\sigma\\to\\neg\\psi)\\to\\neg\\sigma)$ 是重言式，分离两次即得 $\\Gamma\\vdash\\neg\\sigma$。',
        '**第四步：极大一致扩张。** 引理：每个一致语句集 $\\Gamma$ 可扩张为极大一致语句集 $\\Gamma^{*}$。证明：取 $\\kappa=\\max(|\\mathcal{L}|,\\aleph_0)$（语言 $\\mathcal{L}$ 先良序 —— 这一步用选择公理），按序数枚举所有语句 $\\{\\psi_\\alpha:\\alpha<\\kappa\\}$；令 $\\Gamma_0=\\Gamma$，若 $\\Gamma_\\alpha\\cup\\{\\psi_\\alpha\\}$ 一致则 $\\Gamma_{\\alpha+1}=\\Gamma_\\alpha\\cup\\{\\psi_\\alpha\\}$，否则 $\\Gamma_{\\alpha+1}=\\Gamma_\\alpha$，极限序数取并；令 $\\Gamma^{*}=\\bigcup_{\\alpha<\\kappa}\\Gamma_\\alpha$。一致性：若 $\\Gamma^{*}$ 不一致，则某个证明只用到有限多条假设，它们全在某个 $\\Gamma_\\alpha$ 中，与 $\\Gamma_\\alpha$ 一致矛盾。极大性：若 $\\psi_\\alpha\\notin\\Gamma^{*}$，则 $\\Gamma_\\alpha\\cup\\{\\psi_\\alpha\\}$ 不一致，由推论得 $\\Gamma_\\alpha\\vdash\\neg\\psi_\\alpha$，故 $\\Gamma^{*}\\vdash\\neg\\psi_\\alpha$。由此：对每个语句恰有 $\\psi\\in\\Gamma^{*}$ 或 $\\neg\\psi\\in\\Gamma^{*}$；$\\Gamma^{*}$ 对 $\\vdash$ 封闭（若 $\\Gamma^{*}\\vdash\\psi$ 而 $\\psi\\notin\\Gamma^{*}$，则 $\\neg\\psi\\in\\Gamma^{*}$，与一致性矛盾）；$\\Gamma^{*}$ 含全部逻辑公理。',
        '**第五步：Henkin 见证。** 设 $\\kappa=\\max(\\#(\\mathcal{L}),\\aleph_0)$（即便语言有限，语句也有可数多个）。添 $\\kappa$ 个新常元 $\\{c_\\beta:\\beta<\\kappa\\}$ 得 $\\mathcal{L}^{+}$，把 $\\mathcal{L}^{+}$ 中所有形如 $\\exists x\\,\\theta(x)$ 的语句按序数枚举为 $\\{\\xi_\\alpha:\\alpha<\\kappa\\}$。**按序数超限递归**造 $\\Gamma_\\alpha$：若 $\\Gamma_\\alpha\\cup\\{\\xi_\\alpha\\}$ 一致且 $\\xi_\\alpha=\\exists x\\,\\theta(x)$，取一个未用过的 $c_\\beta$，令 $\\Gamma_{\\alpha+1}=\\Gamma_\\alpha\\cup\\{\\theta(c_\\beta)\\}$；否则 $\\Gamma_{\\alpha+1}=\\Gamma_\\alpha$，极限序数取并。',
        '各 $\\Gamma_\\alpha$ 一致（对 $\\alpha$ 归纳，极限步用有限特征）：若 $\\Gamma_\\alpha\\cup\\{\\theta(c_\\beta)\\}$ 不一致，推论给 $\\Gamma_\\alpha\\vdash\\neg\\theta(c_\\beta)$；$c_\\beta$ 不出现在 $\\Gamma_\\alpha$ 中，把 $c_\\beta$ 换成证明中未出现的变元 $y$ 并推广，得 $\\Gamma_\\alpha\\vdash\\forall y\\,\\neg\\theta(y)$，再由 (Q1) 与命题逻辑得 $\\Gamma_\\alpha\\vdash\\neg\\exists x\\,\\theta(x)$，与「$\\Gamma_\\alpha\\cup\\{\\xi_\\alpha\\}$ 一致」矛盾。于是 $\\Gamma_\\kappa=\\bigcup_{\\alpha<\\kappa}\\Gamma_\\alpha$ 一致（有限特征），再由第四步扩为极大一致 $\\Gamma^{*}$。见证性质：若 $\\exists x\\,\\theta\\in\\Gamma^{*}$ 且编号为 $\\alpha$，则 $\\Gamma_\\alpha\\cup\\{\\exists x\\,\\theta\\}\\subseteq\\Gamma^{*}$ 一致，故第 $\\alpha$ 步添了 $\\theta(c_\\beta)$，即 $\\theta(c_\\beta)\\in\\Gamma^{*}$。',
        '**第六步：项模型。** 在 $\\mathcal{L}^{+}$ 上，对闭项 $t,s$ 定义 $t\\sim s\\iff\\Gamma^{*}\\vdash t=s$；由 (E1)(E2) 这是等价关系。令 $A$ 为闭项的 $\\sim$-类全体。常元 $c^{\\mathfrak{A}}:=[c]$；函数符号 $f^{\\mathfrak{A}}([t_1],\\ldots,[t_n]):=[f(t_1,\\ldots,t_n)]$；关系符号 $R^{\\mathfrak{A}}([t_1],\\ldots,[t_n])$ 为真 $\\iff\\Gamma^{*}\\vdash R(t_1,\\ldots,t_n)$。良定义用 (E2)：若 $t_i\\sim s_i$，逐步代入得 $\\Gamma^{*}\\vdash f(t)=f(s)$ 与 $\\Gamma^{*}\\vdash R(t)\\leftrightarrow R(s)$。等词解释成相等：$[t]=[s]\\iff t\\sim s$。',
        '**第七步：真值引理。** 对每个公式 $\\psi(x_1,\\ldots,x_m)$ 与任意闭项 $t_1,\\ldots,t_m$：$\\mathfrak{A}\\vDash\\psi[\\bar t]$（赋值 $x_i\\mapsto[t_i]$）$\\iff$ $\\Gamma^{*}\\vdash\\psi(t_1,\\ldots,t_m)$。对 $\\psi$ 的结构归纳：原子公式按第六步；$\\neg$ 用极大性（对每个语句恰有它或它的否定在 $\\Gamma^{*}$）；$\\wedge$ 用 $\\Gamma^{*}$ 对 $\\vdash$ 封闭与重言式 $\\psi\\to(\\chi\\to\\psi\\wedge\\chi)$、$\\psi\\wedge\\chi\\to\\psi$、$\\psi\\wedge\\chi\\to\\chi$。',
        '量词情形：先注意对任意闭项 $t$，$\\Gamma^{*}\\vdash\\forall x\\,\\psi\\to\\psi(t)$（(Q1) 加分离规则）。($\\Leftarrow$) 若 $\\forall x\\,\\psi\\in\\Gamma^{*}$，则每个实例 $\\psi(t)\\in\\Gamma^{*}$，归纳假设给 $\\mathfrak{A}\\vDash\\psi[\\bar t]$ 对所有 $[t]$，故 $\\mathfrak{A}\\vDash\\forall x\\,\\psi$。($\\implies$) 若 $\\forall x\\,\\psi\\notin\\Gamma^{*}$，则 $\\neg\\forall x\\,\\psi\\in\\Gamma^{*}$；命题逻辑（用 (Q1)）给 $\\Gamma^{*}\\vdash\\exists x\\,\\neg\\psi$，见证性质给 $c$ 使 $\\neg\\psi(c)\\in\\Gamma^{*}$，归纳假设给 $\\mathfrak{A}\\vDash\\neg\\psi[\\bar c]$，故 $\\mathfrak{A}\\not\\vDash\\forall x\\,\\psi$。',
        '**第八步：收尾。** 第七步给出 $\\mathfrak{A}\\vDash\\Gamma^{*}$，故 $\\Gamma$ 有模型。于是对语句：若 $\\Gamma\\not\\vdash\\varphi$，则 $\\Gamma\\cup\\{\\neg\\varphi\\}$ 一致（否则推论给 $\\Gamma\\vdash\\varphi$），由第五至七步有模型 $\\mathfrak{A}\\vDash\\Gamma\\cup\\{\\neg\\varphi\\}$，即 $\\Gamma\\not\\vDash\\varphi$。逆否即 $\\Gamma\\vDash\\varphi\\implies\\Gamma\\vdash\\varphi$；与第二步合起来即 $\\Gamma\\vdash\\varphi\\iff\\Gamma\\vDash\\varphi$。一般公式由第一步化到语句。∎',
        '**备注**：证明只额外用了标准 Hilbert 公理模式（它们不是本图的节点，但每条都能逐字核验）。上面全程对**任意语言**成立（有限语言取 $\\kappa=\\aleph_0$）：取 $\\kappa=\\max(\\#(\\mathcal{L}),\\aleph_0)$，添 $\\kappa$ 个新常元、按序数超限递归造极大一致集，所以陈述不受基数的可数性限制。选择公理在这里只用在一处：把 $\\mathcal{L}$ 良序、按序数枚举语句；新常元取显式索引 $\\{c_\\beta:\\beta<\\kappa\\}$，每步取最小未用 $\\beta$，不需要 AC。推论：紧致性定理（每个有限子集有模型 $\\implies$ 整个理论有模型）由 $\\Gamma\\vDash\\varphi\\implies\\Gamma\\vdash\\varphi$ 的有限性立刻得到。⚠ 完备性**不**与 Gödel 不完备性定理矛盾：后者谈的是像 PA/ZFC 这样足够强的**理论**里存在不可判定的句子，不是逻辑本身的完备性。',
      ].join('\n\n'),
      refs: ['Enderton, A Mathematical Introduction to Logic, Ch. 2.5', 'Kunen, Set Theory, Ch. I']
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
          '这条说的是「有限可满足 $\\implies$ 整体可满足」。两者只连**类比边**，不当作定理依赖。',
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
