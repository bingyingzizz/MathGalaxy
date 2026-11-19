/* ==========================================================================
   内容包 · 加法范畴的收尾（定义 5.1.5 + 练习 5.1~5.1.7）
   --------------------------------------------------------------------------
   第 5 章开头的「加法 / 阿贝尔范畴」那一节还差两件事：
     ① 核与余核在**对象层面**的定义（核 = 与零态射的等化子）——
        图上到处在用「核」，却没有一条节点把它定义下来；
     ② 那一节的练习题：零对象与终对象、双积与积、加性结构的唯一性、
        加法函子的刻画、伴随函子的加性、正合列构成的子范畴。

   两条主线：
     零对象 / 双积 ──▶ 加法函子的刻画 ──▶ 伴随自动加法
     核 / 余核     ──▶ 左正合 / 右正合 ──▶ 正合列构成的子范畴
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '加法范畴的基本性质',
  nodes: [

    /* ------------------------------------------------- 核与余核 */
    {
      id: 'def.kernel-cokernel',
      cluster: 'hom.ab',
      type: 'definition',
      label: '核与余核',
      title: '核 / 余核与左正合、右正合列',
      regions: ['category'],
      tags: ['定义', '范畴论', '核', '余核', '正合列'],
      statement: [
        '设 $\\mathcal{C}$ 是（预）加法范畴，$f : M \\to N$。',
        '',
        '- $f$ 的**核** $\\ker f := \\ker(f, 0)$ 是 $f$ 与**零态射** $0_{M,N}$ 的**等化子**（若存在）；',
        '- $f$ 的**余核** $\\operatorname{coker} f$ 是 $f$ 在 $\\mathcal{C}^{\\mathrm{op}}$ 中的核（若存在），也就是 $f$ 与零态射的**余等化子**；',
        '- 列 $0 \\to M\' \\xrightarrow{f} M \\xrightarrow{g} M\'\'$ 叫**左正合的**，如果 $f$ 实现 $\\ker g$（即 $M\' \\cong \\ker g$）；\n\n' +
        '对偶地 $M \\xrightarrow{g} M\'\' \\to 0$ 叫**右正合的**，如果 $g$ 实现 $\\operatorname{coker} g$；\n\n' +
        '',
        '- 既左正合又右正合的列 $0 \\to M\' \\xrightarrow{\\varphi} M \\xrightarrow{\\psi} M\'\' \\to 0$ 叫**短正合列**，此时称 $M$ 是 $M\'$ 被 $M\'\'$ 的**扩张**。'
      ].join('\n'),
      notes: [
        '**为什么核取「等化子」而不是「原像」**：$f$ 与 $0_{M,N}$ 的等化子是「一切被 $f$ 杀掉的态射」的**泛对象** —— 它比「$f^{-1}(0)$」基本得多，因为一般范畴里根本没有元素可取原像。（在 $\\mathbf{Ab}$ 里两者一致：$\\ker f = f^{-1}(0)$。）',
        '**加法范畴里核与余核的行为是规则的**：$\\ker f \\to M$ 一定是**单态射**、$M \\to \\operatorname{coker} f$ 一定是**满态射**（等化子必单、余等化子必满，这不需要阿贝尔范畴的假设）。',
        '⚠️ 「每个态射都有核与余核」还**不够**：预阿贝尔范畴里 $\\operatorname{coim} f \\to \\operatorname{im} f$ 一般不是同构，阿贝尔范畴正是把这个缺口补上的那一条条件。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ------------------------------------------- 零对象 ⟺ 终对象 */
    {
      id: 'prop.zero-object-final-criterion',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '零对象与终对象',
      title: '命题：预加性范畴里零对象 $\\iff$ 终对象 $\\iff$ 始对象',
      regions: ['category'],
      tags: ['命题', '范畴论', '零对象', '预加性'],
      statement: [
        '设 $\\mathcal{C}$ 是**预加性范畴**，$M \\in \\mathcal{C}$。则',
        '',
        '$M$ **是零对象** $\\iff$ $M$ **是终对象** $\\iff$ $M$ **是始对象**'
      ].join('\n'),
      notes: "⭐ 于是「零对象」有两条等价说法：$\\operatorname{End}(M) = 1$（$1_{M} = 0_{M}$），以及「既是终对象又是始对象」—— 在预加性范畴里它们完全等价，可以随意挑方便的那条用。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* --------------------------------------------- 双积 = 积 = 余积 */
    {
      id: 'prop.biproduct-is-product',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '直和就是积',
      title: '命题：预加性范畴里直和 $\\iff$ 积 $\\iff$ 余积',
      regions: ['category'],
      tags: ['命题', '范畴论', '双积', '直和', '积'],
      statement: [
        '设 $\\mathcal{C}$ 是预加性范畴，$M, M_{1}, M_{2} \\in \\mathcal{C}$。',
        '',
        '$M$ **是 $M_{1}, M_{2}$ 的直和** $\\iff$ $(M, p_{1}, p_{2})$ **是 $M_{1}, M_{2}$ 的积**',
        '',
        '其中「直和」指存在 $p_{k} : M \\to M_{k}$、$i_{k} : M_{k} \\to M$ 使',
        '',
        '$$p_{1}i_{1} = 1_{M_{1}}, \\qquad p_{2}i_{2} = 1_{M_{2}}, \\qquad i_{1}p_{1} + i_{2}p_{2} = 1_{M}.$$'
      ].join('\n'),
      notes: "⭐ 这就是**双积**（biproduct）这个名字的来历：积与余积在预加性范畴里重合，所以直和只需要谈一个对象。\n\n**为什么加法范畴一定要有双积**：正因为两者重合，才可以把「加」（$f + g$）与「余积的含入」写在同一套符号里 —— 这是整个同调代数记号的地基。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ------------------------------------- 预加性结构唯一 */
    {
      id: 'prop.hom-enrichment-unique',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '预加性结构唯一',
      title: '命题：加法范畴里 $\\operatorname{Hom}$ 的阿贝尔群结构唯一',
      regions: ['category'],
      tags: ['命题', '范畴论', '加法范畴', '双积'],
      statement: [
        '设 $\\mathcal{C}$ 是**加法范畴**。则使复合双线性、并与直和结构相容的 $\\operatorname{Hom}_{\\mathcal{C}}(M,N)$ 的阿贝尔群结构是**唯一**的。'
      ].join('\n'),
      notes: "⭐ 一句话：**加法范畴里的「加」不是额外数据，而是双积结构逼出来的。** 这也是为什么「加法函子」可以只要求「保双积」——见「加法函子的刻画」。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ----------------------------------- 加法函子的刻画 */
    {
      id: 'prop.additive-iff-preserves-biproduct',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '加法函子的刻画',
      title: '命题：$F$ 加法 $\\iff$ 保零对象与直和 $\\iff$ 保有限积',
      regions: ['category'],
      tags: ['命题', '范畴论', '加法函子', '双积'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{D}$ 是加法范畴，$F : \\mathcal{C} \\to \\mathcal{D}$ 是函子。则三者等价：',
        '',
        '$F$ **加法** $\\iff$ $F$ **保零对象与所有直和** $\\iff$ $F$ **保所有有限积** $\\iff$ $F$ **保所有有限余积**'
      ].join('\n'),
      notes: "⭐ 实用价值：验一个函子加法，只需验它**保双积**，不必去碰 $\\operatorname{Hom}$ 上的群结构。\n\n\n\n**四条的等价全靠「加法范畴里有限积 = 有限余积 = 双积」这一条**：\n\n- **加法** $\\iff$ **保零对象与所有直和**：$(\\implies)$ 加法函子保双积结构（核-余核对偶给出）；$(\\Leftarrow)$ 要**用直和的投影/包含态射**把 $F(f+g) = F(f)+F(g)$ 拼出来 —— 这是四条里唯一需要动手的一步。\n- **保所有直和** $\\iff$ **保所有有限积**：**这一步完全依赖加法范畴的公理**（有限积自动是双积，于是\"保积 = 保余积\"）。⚠️ 在一般范畴里这一步是**假的**。\n- **保双积**：与上一条同义（双积 = 既是积又是余积）。\n\n⚠️ **「加法范畴」这个假设不能去掉**：$\\mathbf{Set}$ 里「保有限积」的函子（如 $X \\mapsto X \\times X$）并不保余积，更谈不上加法。\n⚠️ **「保直和」与「保余积」在加法范畴里才一致**：所以这条命题的准确读法是「在加法范畴之间，保积 = 保余积 = 加法」。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ------------------------------------ 伴随函子自动加法 */
    {
      id: 'prop.adjoint-additive',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '伴随函子都加法',
      title: '命题：加法范畴之间的伴随函子都是加法函子',
      regions: ['category'],
      tags: ['命题', '范畴论', '伴随', '加法函子'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{D}$ 是加法范畴，$F : \\mathcal{C} \\to \\mathcal{D}$ 左伴随 $G : \\mathcal{D} \\to \\mathcal{C}$（记 $F \\dashv G$）。则 $F$ 与 $G$ **都加法**，并且伴随的双射',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{D}}(FM, N) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}(M, GN)$$',
        '',
        '是**阿贝尔群**的同构（对 $M$、$N$ 都自然）。'
      ].join('\n'),
      notes: "⭐ 一句话：**一旦有伴随，加法是白送的。** 所以「加法范畴之间的伴随」永远可以当作加性伴随来用，$\\operatorname{Hom}(FM,N) \\cong \\operatorname{Hom}(M,GN)$ 也就自动升级成群同构。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ---------------------------------- 正合列构成的子范畴 */
    {
      id: 'prop.exact-sequence-subcategory',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '正合列构成子范畴',
      title: '命题：左 / 右 / 短正合列构成加法子范畴',
      regions: ['category'],
      tags: ['命题', '范畴论', '正合列', '加法子范畴'],
      statement: [
        '设 $\\mathcal{C}$ 是阿贝尔范畴，$\\mathcal{C}^{3}$ 是**可复合的态射对**构成的范畴（对象是 $M\' \\to M \\to M\'\'$，态射是三个分量相容的比较映射）。则左正合列、右正合列、短正合列各自构成 $\\mathcal{C}^{3}$ 的一个**加法子范畴**。'
      ].join('\n'),
      notes: "⭐ 这条的意义是把「取正合列」当成一个**可以运算的对象**：两个正合列能直和、能取核余核，得到的还在里面 —— 谱序列那一套（过滤复形、双复形）正是靠这种封闭性才写得出来。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* --------------------------------- AbHaus 的严格正合 */
    {
      id: 'prop.abhaus-strict-exact',
      cluster: 'cond.topo',
      type: 'proposition',
      label: 'Hausdorff 拓扑阿贝尔群的核与余核',
      title: '命题：$\\mathbf{AbHaus}$ 中的核、余核与严格正合列',
      regions: ['condensed'],
      tags: ['命题', '拓扑阿贝尔群', '核', '余核', '严格正合'],
      statement: [
        '设 $\\mathbf{AbHaus}$ 是 **Hausdorff 拓扑阿贝尔群**（态射取连续同态）的范畴。则',
        '',
        '1. 对连续同态 $f : M \\to N$：$\\ker f = f^{-1}(0)$（带子空间拓扑），$\\operatorname{coker} f = N/\\overline{f(M)}$（带商拓扑）；',
        '2. 连续同态是核 $\\iff$ 它是**到闭子群上的同胚嵌入**；是余核 $\\iff$ 它是**开满射**；',
        '3. 列 $0 \\to M\' \\xrightarrow{\\varphi} M \\xrightarrow{\\psi} M\'\' \\to 0$ **严格正合** $\\iff$ 它作为抽象阿贝尔群正合、且 $\\varphi$ 是闭嵌入、$\\psi$ 是开满射。'
      ].join('\n'),
      notes: "⭐ **「严格」不是装饰**：在拓扑阿贝尔群里，「正合」与「严格正合」是实打实的差别 —— 拓扑阿贝尔群**不是**阿贝尔范畴，缺的正是「每个态射都由它的核与余核刻画」这一条。凝聚态数学把这一层补回来的方式，是把拓扑群嵌进 $\\mathrm{CondAb}$。\n\n\n\n**各方向用到的假设**（核余核的泛性质还决定拓扑）：\n- 核 $\\implies$ 闭嵌入：核带子空间拓扑，目标 Hausdorff 保证零点闭；反向闭嵌入是商映射 $M\\to M/H$ 的核，不能误说它是自身与零的等化子。\n- 余核 $\\implies$ 开满射：商去像的闭包，群的商映射为开映射；反向开满射给出到核商的同胚，故为其核的余核，均需商拓扑的泛性质。\n- 严格正合 $\\iff$ 抽象群正合加闭嵌入、开满射：前向展开核余核列并用上述刻画，反向借两种拓扑识别恢复泛性质，无需开映射定理。\n- 闭包不能省：$\\mathbb Q\\hookrightarrow\\mathbb R$ 在 Hausdorff 群中像稠密而不闭。开也不能省：$\\mathbb R$ 的离散拓扑到通常拓扑的恒等映射是连续满射而不开；原注的粗拓扑整数群不属于本范畴。",
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    }

  ],

  edges: [

    /* ------------------------------- 定义引用（蓝线） ------------------------------- */
    {
      id: 'def-link.kernel-eq',
      kind: 'definition',
      definition: 'def.equalizer',
      usedBy: 'def.kernel-cokernel',
      note: '$\\ker f$ 就是 $f$ 与零态射的等化子，用的是「等化子」这个概念。'
    },
    {
      id: 'def-link.kernel-zero',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'def.kernel-cokernel',
      note: '核与余核的定义里出现**零态射**，它来自零对象。'
    },
    {
      id: 'def-link.zeroobj-additive',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.zero-object-final-criterion',
      note: '命题的前提「预加性范畴」是这条定义里的第一条。'
    },
    {
      id: 'def-link.zeroobj-zero',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'prop.zero-object-final-criterion',
      note: '要比较的两条定义都来自「零对象」。'
    },
    {
      id: 'def-link.biprod-additive',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.biproduct-is-product',
      note: '直和的定义（$p_{k}i_{k} = 1$、$i_{1}p_{1}+i_{2}p_{2} = 1$）与预加性都在这条定义里。'
    },
    {
      id: 'def-link.biprod-product',
      kind: 'definition',
      definition: 'def.product',
      usedBy: 'prop.biproduct-is-product',
      note: '命题的另一半说的是「积」，用的是积的泛性。'
    },
    {
      id: 'def-link.enrich-additive',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.hom-enrichment-unique',
      note: '唯一性说的就是这条定义里「每个 $\\operatorname{Hom}$ 带阿贝尔群结构且复合双线性」那部分。'
    },
    {
      id: 'def-link.enrich-biprod',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'prop.hom-enrichment-unique',
      note: '证明用的对角线、余对角线与 $f \\oplus g$ 全由双积刻画。'
    },
    {
      id: 'def-link.addfun-criterion',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'prop.additive-iff-preserves-biproduct',
      note: '命题要刻画的就是「加法函子」这条定义。'
    },
    {
      id: 'def-link.addfun-zeroobj',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'prop.additive-iff-preserves-biproduct',
      note: '「保零对象」这一半用的是零对象与双积的关系。'
    },
    {
      id: 'def-link.adjadd-adjoint',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.adjoint-additive',
      note: '命题的前提就是一对伴随函子 $F \\dashv G$。'
    },
    {
      id: 'def-link.adjadd-addfun',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'prop.adjoint-additive',
      note: '结论是「两个函子都加法」。'
    },
    {
      id: 'def-link.exsub-exact',
      kind: 'definition',
      definition: 'def.exact-sequence',
      usedBy: 'prop.exact-sequence-subcategory',
      note: '命题里的对象就是正合列与短正合列。'
    },
    {
      id: 'def-link.exsub-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.exact-sequence-subcategory',
      note: '核与像的良好行为、以及与有限双积交换都来自阿贝尔范畴。'
    },
    {
      id: 'def-link.abhaus-topab',
      kind: 'definition',
      definition: 'def.topo-ab-group',
      usedBy: 'prop.abhaus-strict-exact',
      note: '命题讨论的范畴就是拓扑阿贝尔群。'
    },
    {
      id: 'def-link.abhaus-kernel',
      kind: 'definition',
      definition: 'def.kernel-cokernel',
      usedBy: 'prop.abhaus-strict-exact',
      note: '核与余核在这里被具体算成 $f^{-1}(0)$ 与 $N/\\overline{f}(M)$。'
    },
    {
      id: 'def-link.abhaus-exact',
      kind: 'definition',
      definition: 'def.exact-sequence',
      usedBy: 'prop.abhaus-strict-exact',
      note: '「严格正合」是在正合列之上再加「嵌入闭、满射开」两条。'
    }
,
    {
      id: "dep.adjoint-additive",
      kind: 'definition',
      definition: "def.additive-category",
      usedBy: "prop.adjoint-additive",
      note: "加性伴随命题以加法范畴为背景。"
    },
    {
      id: "dep.kernelcokernel-additive",
      kind: 'definition',
      definition: "def.additive-category",
      usedBy: "def.kernel-cokernel",
      note: "核与余核在加法范畴中。"
    },
    {
      id: "dep.additive-biproduct",
      kind: 'definition',
      definition: "def.additive-category",
      usedBy: "prop.additive-iff-preserves-biproduct",
      note: "加性等价于保持双积，在加法范畴中。"
    }
  ]
});
