/* ==========================================================================
   内容包 · 阿贝尔层（6 条）
   --------------------------------------------------------------------------
    §5.3。这一团是「拓扑斯」与「凝聚态阿贝尔群」之间的桥：
   把层从集合值推广到一般范畴值，就到了阿贝尔层；
   在拓扑斯上它就是 Grothendieck 范畴，并且自带封闭的幺半结构。

   依赖顺序：取值一般的层 → 阿贝尔层 → 拓扑斯上的阿贝尔群是 Grothendieck 范畴
   → 内 Hom → 张量积 → 平坦性。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '阿贝尔层',
  nodes: [

    /* ------------------------------------------ 取值一般的预层与层 */
    {
      id: 'def.presheaf-valued',
      cluster: 'hom.sheaf',
      type: 'definition',
      label: '取值一般的预层与层',
      title: '取值在一般范畴里的层（Sheaf with Values in a Category）',
      regions: ['homology'],
      tags: ['同调代数', '层', '阿贝尔层'],
      statement: [
        '设 $\\mathcal{C}$、$\\mathcal{D}$ 是范畴。',
        '',
        '1. 取值在 $\\mathcal{D}$ 的**预层**是反变函子 $T : \\mathcal{C}^{\\mathrm{op}} \\to \\mathcal{D}$；预层之间的**态射**是自然变换。',
        '2. $\\mathcal{C}$ 是 site 时，**层** $F : \\mathcal{C}^{\\mathrm{op}} \\to \\mathcal{D}$ 是这样的预层：对每个 $Y \\in \\mathcal{D}$，集合值预层',
        '',
        '$$X \\longmapsto \\operatorname{Hom}_{\\mathcal{D}}\\bigl(Y,\\ F(X)\\bigr)$$',
        '',
        '都是层。'
      ].join('\n'),
      notes: [
        '把 $\\mathcal{D}$ 取成 $\\mathbf{Set}$ 就回到原来的层；取成 $\\mathbf{Ab}$ 就得到**阿贝尔层**。',
        '定义里的技巧是：**用「射入 $Y$ 的映射」把 $\\mathcal{D}$ 里的层条件降回集合层**。于是集合层的每一条结论，只要它的表述里那些构造在 $\\mathcal{D}$ 里也有（极限、积……），就能逐条搬过来 —— 这是「层可以取一般值」的全部秘密。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 阿贝尔层 */
    {
      id: 'def.abelian-sheaf',
      cluster: 'hom.sheaf',
      type: 'definition',
      label: '阿贝尔层',
      title: '阿贝尔层（Abelian Sheaf）',
      regions: ['homology'],
      tags: ['同调代数', '层', '阿贝尔群'],
      statement: [
        '固定 site $\\mathcal{C}$。记',
        '',
        '$$\\widehat{\\mathcal{C}}(\\mathbf{Ab}) := \\operatorname{Hom}(\\mathcal{C}^{\\mathrm{op}}, \\mathbf{Ab})$$',
        '',
        '为**阿贝尔群预层**的范畴，$\\widetilde{\\mathcal{C}}(\\mathbf{Ab})$ 为它里面**层**的满子范畴。后者叫 $\\mathcal{C}$ 上的**阿贝尔层**，也叫 $\\mathcal{C}$ 上的**阿贝尔群**。',
        '',
        '记号：$\\operatorname{Hom}_{\\mathbb{Z}}(M, N) := \\operatorname{Hom}_{\\widehat{\\mathcal{C}}(\\mathbf{Ab})}(M, N) = \\operatorname{Hom}_{\\widetilde{\\mathcal{C}}(\\mathbf{Ab})}(M, N)$。'
      ].join('\n'),
      notes: [
        '⭐ **阿贝尔群预层就是「最粗拓扑下的层」** —— 两种说法是一套东西。',
        '遗忘函子 $\\mathbf{Ab} \\to \\mathbf{Set}$ 沿复合给出遗忘函子 $\\widehat{\\mathcal{C}}(\\mathbf{Ab}) \\to \\widehat{\\mathcal{C}}$。',
        '两条基本事实：\n\n- **阿贝尔层按底集合层来判**：$M$ 是阿贝尔层 $\\iff$ 它的底集合预层是层。因为遗忘函子保所有极限，而层条件是一个极限图 —— 用米田引理把 $\\operatorname{Hom}_{\\mathbb{Z}}(N, M(-))$ 换回 $M(-)$，条件就同一条。\n- **阿贝尔层 = 层范畴里的阿贝尔群对象**：$\\widetilde{\\mathcal{C}}(\\mathbf{Ab}) \\simeq \\mathbf{Ab}\\bigl(\\widetilde{\\mathcal{C}}\\bigr)$。这正是「凝聚态阿贝尔群 = 凝聚态集范畴里的阿贝尔群」那条定义的一般版本。'
      ].join('\n\n')
    },

    /* --------------------------------- 拓扑斯上的阿贝尔群是 Grothendieck 范畴 */
    {
      id: 'thm.topos-abelian-grothendieck',
      cluster: 'hom.sheaf',
      type: 'theorem',
      label: '拓扑斯上的阿贝尔群是 Grothendieck 范畴',
      title: '$\\mathcal{T}(\\mathbf{Ab})$ 是 Grothendieck 范畴',
      regions: ['homology'],
      tags: ['同调代数', '拓扑斯', 'Grothendieck 范畴'],
      statement: [
        '若 $\\mathcal{T}$ 是拓扑斯，则 $\\mathcal{T}$ 上的阿贝尔层所成范畴 $\\mathcal{T}(\\mathbf{Ab})$ 是 **Grothendieck 范畴**：它有小的生成元集、有所有余极限、且滤过余极限正合。'
      ].join('\n'),
      notes: [
        '证明分三段：',
        '',
        [
          '- **阿贝尔**：先在预层范畴 $\\widehat{\\mathcal{C}}(\\mathbf{Ab})$ 里逐分量验证（那里就是逐点的阿贝尔群）—— 具体的，对任意态射 $u$ 验证 $\\operatorname{coker}(\\ker u) \\cong \\ker(\\operatorname{coker} u)$；再沿**正合反射**（层化）把这些等式运回层范畴。滤过余极限正合同理。',
          '- **所有极限与余极限存在**：因为层范畴是预层范畴的反射子范畴。',
          '- **小生成元集**：若 $S$ 是 $\\mathcal{T}$ 的小生成元集，则 $\\{\\mathbb{Z}\\cdot X : X \\in S\\}$ 生成 $\\mathcal{T}(\\mathbf{Ab})$ —— 它们的余积就是生成元。',
        ].join('\n'),
        '',
        '顺带一条：$\\mathbb{Z}\\cdot X$ 在 $\\mathcal{T}(\\mathbf{Ab})$ 里**投射**（先看预层：$M \\mapsto \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot h_{X}, M) \\cong M(X)$ 在预层上是正合的）。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------- 内 Hom */
    {
      id: 'def.internal-hom',
      cluster: 'hom.sheaf',
      type: 'definition',
      label: '内 Hom',
      title: '内 Hom（Internal Hom）',
      regions: ['homology'],
      tags: ['同调代数', '拓扑斯', '内 Hom'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯，$X \\in \\mathcal{T}$、$M \\in \\mathcal{T}(\\mathbf{Ab})$。则',
        '',
        '$$\\operatorname{Hom}(X, M) : Y \\longmapsto \\operatorname{Hom}(X \\times Y,\\ M) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\mathbb{Z}\\cdot(X \\times Y),\\ M\\bigr)$$',
        '',
        '是 $\\mathcal{T}$ 上的一个阿贝尔层，叫 $M$ 在 $X$ 处的**内 Hom**。',
        '',
        '又对 $M, N \\in \\mathcal{T}(\\mathbf{Ab})$，预层 $X \\mapsto \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M,\\ \\operatorname{Hom}(X, N)\\bigr)$ 是**可表示的**；表示对象记 $\\operatorname{Hom}_{\\mathbb{Z}}(M, N) \\in \\mathcal{T}(\\mathbf{Ab})$。'
      ].join('\n'),
      notes: [
        '于是有自然同构',
        '',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M,\\ \\operatorname{Hom}(X, N)\\bigr) \\;\\cong\\; \\operatorname{Hom}\\bigl(X,\\ \\operatorname{Hom}_{\\mathbb{Z}}(M, N)\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}(M, N)(X)$$',
        '',
        '「可表示」这一步只用到一个事实：那个预层**保所有极限**（于是由表示函子的判据，它有表示对象）。',
        '两条推论：$\\operatorname{Hom}_{\\mathbb{Z}}(M, N) = \\operatorname{Hom}_{\\mathbb{Z}}(M, N)(\\mathbf{1})$ —— 也就是说 **$\\mathcal{T}(\\mathbf{Ab})$ 富集在自己上面**；以及 $\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot X, M) \\cong \\operatorname{Hom}(X, M)$。',
        '内 Hom 在预层范畴里算与在层范畴里算结果一样：$\\operatorname{Hom}_{\\widehat{\\mathcal{C}}(\\mathbf{Ab})}(M,N) = \\operatorname{Hom}_{\\widetilde{\\mathcal{C}}(\\mathbf{Ab})}(M,N)$。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 张量积 */
    {
      id: 'def.tensor-abelian-sheaf',
      cluster: 'hom.sheaf',
      type: 'definition',
      label: '阿贝尔层的张量积',
      title: '张量积与封闭幺半结构',
      regions: ['homology'],
      tags: ['同调代数', '张量积', '封闭幺半'],
      statement: [
        '设 $\\mathcal{T}$ 是拓扑斯、$M, N \\in \\mathcal{T}(\\mathbf{Ab})$。函子',
        '',
        '$$P \\longmapsto \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M,\\ \\operatorname{Hom}_{\\mathbb{Z}}(N, P)\\bigr)$$',
        '',
        '可表示；表示对象记 $M \\otimes_{\\mathbb{Z}} N$。于是',
        '',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M \\otimes_{\\mathbb{Z}} N,\\ P\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(M,\\ \\operatorname{Hom}_{\\mathbb{Z}}(N, P)\\bigr)$$',
        '',
        '也就是说 $\\mathcal{T}(\\mathbf{Ab})$ 是**封闭对称幺半**范畴：对固定的 $N$，$M \\mapsto M \\otimes_{\\mathbb{Z}} N$ 是 $P \\mapsto \\operatorname{Hom}_{\\mathbb{Z}}(N, P)$ 的左伴随。'
      ].join('\n'),
      notes: [
        '**怎么算。** $M \\otimes_{\\mathbb{Z}} N$ 是预层 $X \\mapsto M(X) \\otimes_{\\mathbb{Z}} N(X)$ 的**层化**：先逐点张量，再层化。（证明只要考虑 $\\mathcal{T} = \\widehat{\\mathcal{C}}$ 的情形，再用层化；最后归结到通常阿贝尔群的同名结论。）',
        '**基本性质。** 交换（$M \\otimes_{\\mathbb{Z}} N \\cong N \\otimes_{\\mathbb{Z}} M$）、结合、单位 $M \\otimes_{\\mathbb{Z}} \\mathbb{Z}\\cdot\\mathbf{1} \\cong M$；以及',
        '',
        '$$\\mathbb{Z}\\cdot X \\;\\otimes_{\\mathbb{Z}}\\; \\mathbb{Z}\\cdot Y \\;\\cong\\; \\mathbb{Z}\\cdot (X \\times Y)$$',
        '',
        '记 $M \\cdot X := M \\otimes_{\\mathbb{Z}} \\mathbb{Z}\\cdot X$，则 $\\operatorname{Hom}_{\\mathbb{Z}}(M, N)(X) \\cong \\operatorname{Hom}_{\\mathbb{Z}}(M \\cdot X,\\ N)$ —— **「在某点处取值」= 「先在点处张量、再取 Hom」**。',
        '⭐ **凝聚态阿贝尔群 $\\mathrm{CondAb}$ 就是这里的特例**（$\\mathcal{T} = \\mathrm{Cond}$）：上面每一条原样照搬，不必单独写一遍。特别地 $\\mathrm{CondAb}$ 是封闭对称幺半范畴，因而富集在自己上面，可以谈张量积、对偶与交换代数。',
        '⚠️ 但要注意 $\\operatorname{Hom}_{\\mathbb{Z}}(M, N)$ 自然是一个**紧生成拓扑空间**，却**不是拓扑阿贝尔群** —— 因为紧生成空间对（拓扑空间的）积不封闭。把 $\\mathrm{CondAb}$ 当成「拓扑阿贝尔群」来用会在这一步出问题。'
      ].join('\n\n')
    },

    /* -------------------------------------------------------- 平坦 */
    {
      id: 'def.flat-abelian-sheaf',
      cluster: 'hom.sheaf',
      type: 'definition',
      label: '平坦阿贝尔层',
      title: '平坦性（Flatness）',
      regions: ['homology'],
      tags: ['同调代数', '平坦', '张量积'],
      statement: [
        '拓扑斯 $\\mathcal{T}$ 中的阿贝尔群 $P$ 叫**平坦的**，如果函子',
        '',
        '$$M \\longmapsto P \\otimes_{\\mathbb{Z}} M$$',
        '',
        '是**正合**的。'
      ].join('\n'),
      notes: '例：**通常的阿贝尔群平坦 $\\iff$ 无挠**。由此立刻得到：$\\mathbb{Z}\\cdot X$ **总是平坦的** —— 先归结到预层、再归结到通常的阿贝尔群，而自由阿贝尔群无挠。'
    }
  ],

  edges: []
});
