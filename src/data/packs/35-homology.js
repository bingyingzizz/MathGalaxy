/* ==========================================================================
   内容包 · 同调代数（16 条）
   --------------------------------------------------------------------------
   第十团：复形 → 同伦 → 同伦范畴 → 映射锥与导出三角 → 同调 → 长正合列
   → 拟同构 → 内射对象 → 过滤与谱序列。

   依赖顺序：复形是「一串首尾相接的态射，两两复合为零」；同伦把复形之间的
   态射再商一次，得到同伦范畴；映射锥在里面造出导出三角；取同调就得到长正合列。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '同调代数',
  nodes: [

    /* ------------------------------------ 加法 / 阿贝尔范畴（地基） */
    {
      id: 'def.abelian-category',
      cluster: 'cat.homology',
      type: 'definition',
      label: '加法 / 阿贝尔范畴',
      title: '加法范畴与阿贝尔范畴（Additive / Abelian Category）',
      regions: ['category'],
      tags: ['同调代数', '阿贝尔范畴', '加法范畴'],
      statement: [
        '- **预加法范畴**（$\\mathbf{Ab}$-范畴）是每个 $\\operatorname{Hom}$ 集都带有阿贝尔群结构、且复合双线性的范畴；',
        '- **零对象**是 $\\operatorname{End}(M) = 1$（即 $1_{M} = 0_{M}$）的对象；对象 $M$ 是 $M_{1}, M_{2}$ 的**直和** $M = M_{1} \\oplus M_{2}$，如果存在 $p_{k} : M \\to M_{k}$、$i_{k} : M_{k} \\to M$ 使 $p_{1} i_{1} = 1$、$p_{2} i_{2} = 1$、$i_{1} p_{1} + i_{2} p_{2} = 1_{M}$；',
        '- **加法范畴**是有零对象与所有直和的预加法范畴（等价地：所有有限积、或所有有限余积存在，此时二者存在且相等）；',
        '- **预阿贝尔范畴**是每个态射都有核与余核的加法范畴（等价地：所有有限极限与有限余极限存在）；',
        '- **阿贝尔范畴**是满足下列**等价**条件之一的预阿贝尔范畴：',
        '',
        '1. 每个单态射都是正则的（对偶地每个满态射都是正则的）；',
        '2. 若 $i : N \\rightarrowtail M$ 是单态射，则 $N \\cong \\ker\\bigl(M \\twoheadrightarrow \\operatorname{coker}(i)\\bigr)$（对偶同理）；',
        '3. 每个态射都能（在相差一个同构的意义下**唯一**地）分解成满态射接单态射；',
        '4. 对每个 $f : M \\to N$ 有 $\\ker\\bigl(N \\to \\operatorname{coker} f\\bigr) \\cong \\operatorname{coker}\\bigl(\\ker f \\to M\\bigr)$。'
      ].join('\n'),
      notes: [
        '在阿贝尔范畴里，人们习惯说**单射 / 满射**而不说单态射 / 满态射 —— 因为第 1 条保证了「正则的」与「可消的」是一回事。',
        '例：$A\\text{-}\\mathbf{Mod}$ 是阿贝尔范畴；拓扑斯上的 $\\mathbf{Ab}(\\mathcal{T})$ 也是；$\\mathbf{AbCHaus}$ 也是。而 $\\mathbf{AbTop}$ **不是**（$\\mathbb{Z}^{\\mathrm{disc}} \\to \\mathbb{Z}^{\\mathrm{coarse}}$ 这个恒等映射不严格），$\\mathbf{AbHaus}$ 也不是。',
        '阿贝尔范畴是整套同调代数的**工作环境**：有核有余核，「正合列」才说得出口；而加法范畴只提供加法的骨架（零对象与直和）。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 复形 */
    {
      id: 'def.cochain-complex',
      cluster: 'cat.homology',
      type: 'definition',
      label: '上链复形',
      title: '复形（Complex）',
      regions: ['category'],
      tags: ['同调代数', '复形', '微分'],
      statement: [
        '设 $\\mathcal{C}$ 是加法范畴。$\\mathcal{C}$ 中的**（长）序列**是有序集 $(\\mathbb{Z}, \\le)$ 上的图',
        '',
        '$$\\cdots \\longrightarrow K^{n-1} \\xrightarrow{\\ d^{n-1}\\ } K^{n} \\xrightarrow{\\ d^{n}\\ } K^{n+1} \\longrightarrow \\cdots$$',
        '',
        '若对每个 $n$ 都有 $d^{n} \\circ d^{n-1} = 0$，则称 $K$ 是一个**（上）链复形**，$d$ 叫**微分**。把箭头反向（或等价地在 $\\mathcal{C}^{\\mathrm{op}}$ 里取）得**链复形**，记 $K_{n} := K^{-n}$、$d_{n} := d^{-n}$。'
      ].join('\n'),
      notes: [
        '$K$ 叫**下有界**（$n \\ll 0$ 时 $K^{n} = 0$）、**上有界**、**有界**（两者兼备）。相应地记复形范畴为 $\\mathcal{C}(\\mathcal{C})$，其下有界、上有界、有界的满子范畴分别记 $\\mathcal{C}^{+}(\\mathcal{C})$、$\\mathcal{C}^{-}(\\mathcal{C})$、$\\mathcal{C}^{b}(\\mathcal{C})$；同伦范畴那边同样加 $+$ $-$ $b$。',
        '例：$K$ 是（半）单纯对象时，令 $d^{n} := \\sum_{i} (-1)^{i} d_{i}^{n}$，则 $K$ 成为一个链复形 —— 系数 $(-1)^{i}$ 就是让相邻两项的复合正负相消的那个符号，和经典的单纯边界算子完全一致。'
      ].join('\n\n')
    },

    /* -------------------------------------------------- 复形是加法的 */
    {
      id: 'prop.complex-additive',
      cluster: 'cat.homology',
      type: 'proposition',
      label: '复形范畴是加法范畴',
      title: '复形范畴的性质',
      regions: ['category'],
      tags: ['同调代数', '加法范畴', '逐项计算'],
      statement: [
        '复形构成 $\\mathcal{C}$ 的**加法满子范畴** $\\mathcal{C}(\\mathcal{C})$：',
        '',
        '- 双积**逐项**取：$(K \\oplus L)^{n} := K^{n} \\oplus L^{n}$，$d_{K \\oplus L} := d_{K} \\oplus d_{L}$；',
        '- 核与余核也**逐项**取：$(\\ker f)^{n} = \\ker f^{n}$，$d_{\\ker f} := d_{K}|_{\\ker f^{n}}$；',
        '- $\\mathcal{C}(\\mathcal{C})$ 中的**极限与余极限逐项计算**。'
      ].join('\n'),
      notes: '「逐项计算」是函子范畴的通用事实：$\\mathcal{C}(\\mathcal{C})$ 是 $\\operatorname{Hom}((\\mathbb{Z},\\le), \\mathcal{C})$ 的满子范畴，一切构造都在每个 $n$ 上分别做，然后再验证微分与它们相容。这条让后面所有关于复形的极限/余极限都不必单独证明。'
    },

    /* ---------------------------------------------------------- 同伦 */
    {
      id: 'def.homotopy',
      cluster: 'cat.homology',
      type: 'definition',
      label: '同伦',
      title: '同伦（Homotopy）',
      regions: ['category'],
      tags: ['同调代数', '同伦', '零伦'],
      statement: [
        '复形态射 $f, g : K \\to L$ 叫**同伦的**，如果存在一族态射',
        '',
        '$$s^{n} : K^{n} \\longrightarrow L^{n-1}$$',
        '',
        '使得对每个 $n$，',
        '',
        '$$f^{n} - g^{n} \\;=\\; s^{n+1} \\circ d_{K}^{n} + d_{L}^{n-1} \\circ s^{n}$$',
        '',
        '记 $f \\sim g$，$s$ 叫一个**同伦**。与 $0$ 同伦的态射叫**零伦的**。'
      ].join('\n'),
      notes: '零伦态射构成 $\\operatorname{Hom}_{\\mathcal{C}(\\mathcal{C})}(K, L)$ 的一个**子群**；而且同伦是**两边都相容于复合**的等价关系（$f \\sim g$ 时 $h \\circ f \\circ k \\sim h \\circ g \\circ k$）。两条合起来，才允许把「同伦」当成要商掉的东西。'
    },

    /* ---------------------------------------------------- 同伦范畴 */
    {
      id: 'def.homotopy-category',
      cluster: 'cat.homology',
      type: 'definition',
      label: '同伦范畴',
      title: '同伦范畴（Homotopy Category）',
      regions: ['category'],
      tags: ['同调代数', '同伦范畴'],
      statement: [
        '**同伦范畴** $\\mathbf{K}(\\mathcal{C})$ 的对象与 $\\mathcal{C}(\\mathcal{C})$ 相同，态射取',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{K}(\\mathcal{C})}(K, L) \\;:=\\; \\operatorname{Hom}_{\\mathcal{C}(\\mathcal{C})}(K, L) \\big/ \\{\\text{零伦态射}\\}$$',
        '',
        '其中的同构叫**同伦等价**；在 $\\mathbf{K}(\\mathcal{C})$ 中变成 $0$ 的复形叫**同伦平凡的**。'
      ].join('\n'),
      notes: [
        '等价的说法：$f : K \\to L$ 是同伦等价 $\\iff$ 存在 $g : L \\to K$ 使 $g \\circ f \\sim 1_{K}$、$f \\circ g \\sim 1_{L}$；$K$ 同伦平凡 $\\iff$ $1_{K} \\sim 0_{K}$。',
        '$\\mathbf{K}(\\mathcal{C})$ 是**加法范畴**，且 $\\mathcal{C}(\\mathcal{C}) \\to \\mathbf{K}(\\mathcal{C})$ 加法；任何加法函子 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 诱导 $\\mathbf{K}(\\mathcal{C}) \\to \\mathbf{K}(\\mathcal{C}\')$。',
        '为什么要在同伦范畴里干活：同调函子在同伦下不变，所以**先商掉同伦，剩下的信息才是同调真正看得见的**。'
      ].join('\n\n')
    },

    /* ------------------------------------------------------ 映射锥 */
    {
      id: 'def.mapping-cone',
      cluster: 'cat.homology',
      type: 'definition',
      label: '映射锥',
      title: '映射锥与位移（Mapping Cone）',
      regions: ['category'],
      tags: ['同调代数', '映射锥', '位移'],
      statement: [
        '态射 $f : K \\to L$ 的**映射锥**是复形',
        '',
        '$$M(f)^{n} := K^{n+1} \\oplus L^{n}, \\qquad d^{n} := \\begin{pmatrix} -d^{n+1} & 0 \\\\ f^{n} & d^{n} \\end{pmatrix}$$',
        '',
        '（矩阵按 $K^{n+1} \\oplus L^{n}$ 分块：左上取自 $K$ 的微分，右下取自 $L$ 的微分，左下是 $f$ 的分量；$d^{2} = 0$ 只要 $f$ 与微分交换。）$k$-**位移** $K[k]$ 取 $K[k]^{n} := K^{n+k}$，微分带符号 $(-1)^{k} d^{n+k}$。'
      ].join('\n'),
      notes: '用处：给出短正合列 $0 \\to L \\to M(f) \\to K[1] \\to 0$（一般不分裂）。于是**每个态射都能嵌进一条「几乎正合」的序列**，这是三角范畴的出发点 —— 后面所有导出三角的定义都靠它。'
    },

    /* ---------------------------------------------------- 导出三角 */
    {
      id: 'def.distinguished-triangle',
      cluster: 'cat.homology',
      type: 'definition',
      label: '导出三角',
      title: '导出三角（Distinguished Triangle）',
      regions: ['category'],
      tags: ['同调代数', '三角', '映射锥'],
      statement: [
        '$\\mathbf{K}(\\mathcal{C})$ 中的**导出三角**是形状为',
        '',
        '$$K \\longrightarrow L \\longrightarrow M \\longrightarrow K[1]$$',
        '',
        '的图。它叫**导出的**，如果它在 $\\mathbf{K}(\\mathcal{C})$ 中同构于某个映射锥三角',
        '',
        '$$K \\xrightarrow{\\ f\\ } L \\longrightarrow M(f) \\longrightarrow K[1]$$',
        '',
        '三角之间的**态射**是一族映射 $(u, v, w, u[1])$，使所有方块交换。'
      ].join('\n'),
      notes: '导出三角是「短正合列」的**同伦版**：它不要求 $M$ 是商，只要求 $K \\to L \\to M \\to K[1]$ 在形状上接得上。加上位移这一步之后，一个态射就能嵌进一条任意长度的序列里 —— 这正是三角范畴要的形式。'
    },

    /* ------------------------------------------ 三角的旋转与延拓 */
    {
      id: 'prop.triangle-rotation',
      cluster: 'cat.homology',
      type: 'proposition',
      label: '三角的旋转与延拓',
      title: '导出三角的基本性质',
      regions: ['category'],
      tags: ['同调代数', '三角', '旋转'],
      statement: [
        '在 $\\mathbf{K}(\\mathcal{C})$ 中：',
        '',
        '1. $K \\xrightarrow{\\ 1\\ } K \\to 0 \\to K[1]$ 是导出三角；',
        '2. **旋转**：$K \\xrightarrow{\\ f\\ } L \\xrightarrow{\\ g\\ } M \\xrightarrow{\\ h\\ } K[1]$ 导出 $\\iff$ 旋转后的 $L \\xrightarrow{\\ g\\ } M \\xrightarrow{\\ h\\ } K[1] \\xrightarrow{\\ -f[1]\\ } L[1]$ 导出；',
        '3. 任意 $f : K \\to L$ 都能（**不唯一**地）嵌入一个导出三角；',
        '4. 导出三角之间的态射可以（**不唯一**地）延拓。'
      ].join('\n'),
      notes: '推论：**映射锥在 $\\mathbf{K}(\\mathcal{C})$ 中唯一**（同伦意义下唯一）。所以「$f$ 的锥」在 $\\mathbf{K}(\\mathcal{C})$ 里是一个定义良好的对象 —— 尽管 $M(f)$ 的显式写法依赖于 $f$ 的表示。'
    },

    /* -------------------------------------------- 三角态射的性质 */
    {
      id: 'lem.triangle-morphism',
      cluster: 'cat.homology',
      type: 'lemma',
      label: '三角态射的性质',
      title: '导出三角之间态射的性质',
      regions: ['category'],
      tags: ['同调代数', '三角', '同伦'],
      statement: [
        '设 $(u, v, w)$ 是 $\\mathbf{K}(\\mathcal{C})$ 中导出三角之间的态射。则',
        '',
        '1. $w^{2} = 0$（把 $w$ 沿三角的旋转接起来复合两次）；',
        '2. 若 $u, v$ 都是**同伦等价**，则 $w$ 也是。'
      ].join('\n'),
      notes: '第 2 条是「五引理」在同伦范畴里的样子：**前两步定住了，第三步就跟着定住**。第 1 条说明三角之间的态射被前两步控制得很紧 —— 这正是三角范畴公理里那条最不明显的要求的来源。'
    },

    /* -------------------------------------------------------- 同调 */
    {
      id: 'def.cohomology',
      cluster: 'cat.homology',
      type: 'definition',
      label: '同调',
      title: '同调（Cohomology）',
      regions: ['category'],
      tags: ['同调代数', '同调', '复形'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$K$ 是 $\\mathcal{A}$ 中的上链复形。$K$ 的**第 $n$ 阶同调**是',
        '',
        '$$H^{n}(K) \\;:=\\; Z^{n}(K) \\big/ B^{n}(K) \\;=\\; \\ker d^{n} \\big/ \\operatorname{im} d^{n-1}$$',
        '',
        '链复形 $K_{n}$ 的第 $n$ 阶同调取它在 $\\mathcal{A}^{\\mathrm{op}}$ 中的 $(1-n)$ 阶上同调。'
      ].join('\n'),
      notes: [
        '例：$H^{n}(K[k]) = H^{n+k}(K)$；$M \\in \\mathcal{A}$ 时 $H^{0}([M]) = M$、其余为 $0$；$H^{0}([M \\to N]) = \\ker f$、$H^{1}([M \\to N]) = \\operatorname{coker} f$。',
        '$H^{n}$ 是**函子**，但它是**加法而不正合**的 —— 同调不可交换性是整个同调代数的起点。'
      ].join('\n\n')
    },

    /* -------------------------------------------- 同调的短正合列 */
    {
      id: 'prop.cohomology-exact-sequence',
      cluster: 'cat.homology',
      type: 'proposition',
      label: '同调的短正合列',
      title: '把同调夹在两个余核 / 核之间',
      regions: ['category'],
      tags: ['同调代数', '同调', '正合列'],
      statement: [
        '设 $K$ 是复形。则对每个 $k$ 有正合列',
        '',
        '$$0 \\longrightarrow H^{k}(K) \\longrightarrow \\operatorname{coker} d^{k-1} \\longrightarrow \\ker d^{k+1} \\longrightarrow H^{k+1}(K) \\longrightarrow 0$$'
      ].join('\n'),
      notes: '也就是 $0 \\to Z^{k}/B^{k} \\to K^{k}/B^{k} \\to Z^{k+1} \\to Z^{k+1}/B^{k+1} \\to 0$。这条把「同调」拆成两段：**先取余核去掉上一步的像，再取核挑出闭链，最后取商** —— 于是复形里的信息被一层层剥出来。'
    },

    /* -------------------------------------------------- 上同调函子 */
    {
      id: 'def.cohomological-functor',
      cluster: 'cat.homology',
      type: 'definition',
      label: '上同调函子',
      title: '上同调函子（Cohomological Functor）',
      regions: ['category'],
      tags: ['同调代数', '上同调函子', '正合'],
      statement: [
        '设 $\\mathcal{C}$ 是加法范畴、$\\mathcal{A}$ 是阿贝尔范畴。函子 $F : \\mathbf{K}(\\mathcal{C}) \\to \\mathcal{A}$ 叫**上同调函子**，如果对每个导出三角 $K \\to L \\to M \\to K[1]$，序列',
        '',
        '$$FK \\longrightarrow FL \\longrightarrow FM$$',
        '',
        '正合。'
      ].join('\n'),
      notes: '上同调函子把导出三角变成一条**长正合列**：反复旋转三角、每次用一次正合性、再拼接，就得到 $\\cdots \\to F(K[n]) \\to F(L[n]) \\to F(M[n]) \\to F(K[n+1]) \\to \\cdots$。\n\n例：固定 $K$ 之后，$\\operatorname{Hom}_{\\mathbf{K}(\\mathcal{C})}(K, -)$ 是上同调函子 —— 这就是同调代数里那些「长正合列」的总来源。'
    },

    /* -------------------------------------------------- 长正合列 */
    {
      id: 'thm.long-exact',
      cluster: 'cat.homology',
      type: 'theorem',
      label: '长正合列',
      title: '短正合列给出长正合列（蛇引理）',
      regions: ['category'],
      tags: ['同调代数', '长正合列', '蛇引理'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$0 \\to K \\to L \\to M \\to 0$ 是复形的短正合列。则存在**长正合列**',
        '',
        '$$\\cdots \\to H^{n}(K) \\to H^{n}(L) \\to H^{n}(M) \\xrightarrow{\\ \\delta\\ } H^{n+1}(K) \\to \\cdots$$',
        '',
        '其中 $\\delta$ 叫**连接同态**。',
        '',
        '推论：$H^{n} : \\mathbf{K}(\\mathcal{A}) \\to \\mathcal{A}$ 是**上同调函子**。'
      ].join('\n')
    },

    /* ---------------------------------------------------- 拟同构 */
    {
      id: 'def.quasi-iso',
      cluster: 'cat.homology',
      type: 'definition',
      label: '拟同构',
      title: '拟同构与零调复形（Quasi-Isomorphism）',
      regions: ['category'],
      tags: ['同调代数', '拟同构', '零调'],
      statement: [
        '复形态射 $f : K \\to L$ 叫**拟同构**，如果对每个 $n$，$H^{n}(f)$ 都是同构。复形 $K$ 叫**零调的**，如果 $H^{n}(K) = 0$ 对所有 $n$。'
      ].join('\n'),
      notes: [
        '注意：$K \\to L$ 拟同构 $\\iff$ $L \\to K$ 拟同构（「拟同构」是双向的说法，虽然映射只有一个方向）；$K$ 零调 $\\iff$ $[0] \\to K$ 拟同构 $\\iff$ $K \\to [0]$ 拟同构。',
        '两条命题：（1）若 $K \\to L \\to M \\to$ 是导出三角，则 $f$ 是拟同构 $\\iff$ $M$ 零调；（2）对三角态射 $(u, v, w)$，$u, v$ 是拟同构 $\\iff$ $w$ 是拟同构。',
        '拟同构是「在 $\\mathbf{K}(\\mathcal{C})$ 里不是同构，但同调上看不出差别」的映射 —— 把拟同构反过来形式地变成同构，就得到**导出范畴**。'
      ].join('\n\n')
    },

    /* -------------------------------------------------- 内射对象 */
    {
      id: 'prop.injective-criterion',
      cluster: 'cat.homology',
      type: 'proposition',
      label: '内射对象的判据',
      title: '内射对象的四条等价说法',
      regions: ['category'],
      tags: ['同调代数', '内射对象', '正合'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$I \\in \\mathcal{A}$。下列等价：',
        '',
        '1. $I$ 是**内射对象**；',
        '2. 每个单态射 $I \\rightarrowtail M$ 都有**收缩** $M \\to I$；',
        '3. 函子 $\\operatorname{Hom}_{\\mathcal{A}}(-, I)$ **正合**；',
        '4. 每个短正合列 $0 \\to I \\to M \\to M\'\' \\to 0$ 都**分裂**。',
        '',
        '进一步：若 $0 \\to M\' \\to M \\to M\'\' \\to 0$ 正合且 $M\'$ 内射，则',
        '',
        '$$M \\text{ 内射} \\iff M\'\' \\text{ 内射}$$'
      ].join('\n'),
      notes: '证明用一张 $3 \\times 3$ 的 $\\operatorname{Hom}$ 图表：把短正合列 $0 \\to A \\to B \\to C \\to 0$ 用 $\\operatorname{Hom}(-, M)$ 家族拉成三行，用两次蛇引理读出中间一行 $0 \\to \\ker f \\to \\ker g \\to \\ker h \\to \\operatorname{coker} f \\to \\operatorname{coker} g \\to 0$，再看出第一行与第三行都是正合的，于是 $\\ker g = \\operatorname{coker} g = 0$。'
    },

    /* ------------------------------------------------------ 过滤 */
    {
      id: 'def.filtration',
      cluster: 'cat.homology',
      type: 'definition',
      label: '过滤',
      title: '过滤（Filtration）',
      regions: ['category'],
      tags: ['同调代数', '过滤', '关联分次'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴。$M \\in \\mathcal{A}$ 上的（**递降**）**过滤**是 $M$ 的子对象沿 $(\\mathbb{Z}, \\ge)$ 的图：',
        '',
        '$$\\cdots \\subseteq F^{n}M \\subseteq F^{n+1}M \\subseteq \\cdots \\subseteq M$$',
        '',
        '总假定过滤是**穷尽的**（$\\bigcup_{n} F^{n}M = M$）与**分离的**（$\\bigcap_{n} F^{n}M = 0$）；若 $n \\ll 0$ 时 $F^{n}M = M$ 且 $n \\gg 0$ 时 $F^{n}M = 0$，叫**有限的**。带过滤的对象构成范畴 $\\mathbf{F}(\\mathcal{A})$，**关联分次**记 $\\operatorname{Gr}^{n}M := F^{n}M / F^{n+1}M$。'
      ].join('\n'),
      notes: '命题：$\\mathbf{F}(\\mathcal{C}(\\mathcal{A})) \\cong \\mathcal{C}(\\mathbf{F}(\\mathcal{A}))$ —— **「带过滤」与「取复形」可以交换**。所以可以先把复形过滤好，再逐层算同调。'
    },

    /* ---------------------------------------------------- 谱序列 */
    {
      id: 'def.spectral-sequence',
      cluster: 'cat.homology',
      type: 'definition',
      label: '谱序列',
      title: '谱序列（Spectral Sequence）',
      regions: ['category'],
      tags: ['同调代数', '谱序列', '过滤'],
      statement: [
        '**谱序列**由两部分组成：',
        '',
        '1. 一族复形 $E^{p,q}_{r}$（$p, q, r \\in \\mathbb{Z}$，$r \\ge r_{0}$），微分',
        '',
        '$$d^{p,q}_{r} : E^{p,q}_{r} \\longrightarrow E^{p+r,\\, q-r+1}_{r}$$',
        '',
        '使得 $E^{p,q}_{r+1} \\cong H^{p,q}(E_{r}) = \\ker d^{p,q}_{r} / \\operatorname{im} d^{p-r,\\, q+r-1}_{r}$；',
        '2. 一族**带过滤**的对象 $H^{n}$（$n \\in \\mathbb{Z}$），使得对每个 $p, q$ 与所有充分大的 $r$，',
        '',
        '$$\\operatorname{Gr}^{p} H^{p+q} \\;\\cong\\; E^{p,q}_{r}$$',
        '',
        '仅当 $p, q \\ge 0$ 时 $E^{p,q}_{r}$ 才可能非零的，叫**第一象限**谱序列。'
      ].join('\n'),
      notes: [
        '从哪来：给复形 $K$ 一个过滤 $F^{p}K$，同调上的过滤由',
        '',
        '$$F^{p}H^{n} := \\operatorname{im}\\bigl(H^{n}(F^{p}K) \\to H^{n}(K)\\bigr)$$',
        '',
        '继承。于是每根 $H^{n}$ 上都有一串 $H^{n} \\supseteq \\cdots \\supseteq F^{p}H^{n} \\supseteq F^{p+1}H^{n} \\supseteq \\cdots \\supseteq 0$。',
        '谱序列说的就是：**对充分大的 $r$，$E_{r}$ 页稳定下来，恰好等于这个过滤的关联分次**。所以它是「从过滤的复形一层层逼近同调」的工具 —— 直接算 $H^{n}$ 太难时，就把 $H^{n}$ 拆成容易算的那些碎片。'
      ].join('\n\n')
    }
  ],

  edges: [

    /* ------------------------------------------- 三角的旋转与延拓 */
    {
      id: 'imp.triangle-rotation',
      kind: 'implication',
      sources: ['def.mapping-cone', 'def.distinguished-triangle'],
      target: 'prop.triangle-rotation',
      title: '映射锥 $\\implies$ 三角可旋转、可延拓',
      proof: [
        '**旋转。** 不妨设 $M = M(f)$，即三角是 $K \\xrightarrow{\\ f\\ } L \\to M(f) \\to K[1]$。要证 $L \\to M(f) \\to K[1] \\to L[1]$ 导出。把 $g : L \\to M(f)$ 取成含入 $(0, 1)^{\\mathrm{T}}$，则它的映射锥是',
        '',
        '$$M(g)^{n} = L^{n+1} \\oplus M(f)^{n} = L^{n+1} \\oplus K^{n+1} \\oplus L^{n}$$',
        '',
        '再给出 $K[1]$ 与 $M(g)$ 之间的两个互逆（同伦意义下）映射 $\\varphi, \\psi$，以及同伦 $s$ 使 $s \\circ \\varphi \\sim 1$。逐项算完即得两个三角在同伦范畴里同构，于是旋转后的三角也是导出的。∎',
        '',
        '**反复旋转**就得到整条长序列 $\\cdots \\to K \\to L \\to M \\to K[1] \\to L[1] \\to \\cdots$。∎',
        '',
        '**延拓。** 给定 $f : K \\to L$，直接取三角 $K \\to L \\to M(f) \\to K[1]$ 即得第 3 条。',
        '',
        '给定三角态射的左边两步 $u : K\' \\to K\'\'$、$v : L\' \\to L\'\'$，先把 $f\'$ 与 $f\'\'$ 都取成映射锥的形式。要造 $w$，令其矩阵形式为',
        '',
        '$$w := \\begin{pmatrix} s^{n+1} & v^{n} \\end{pmatrix} : K\'^{n+1} \\oplus L\'^{n} \\longrightarrow K\'\'^{n+1} \\oplus L\'\'^{n}$$',
        '',
        '其中 $s$ 是 $v \\circ f\' - f\'\' \\circ u$ 的一个同伦（它零伦来自三角的交换性）。逐项验证 $w \\circ d = d \\circ w$ 即可，这一步用到同伦方程本身。∎',
        '',
        '**推论（映射锥唯一）。** 两个都是 $f$ 的锥的三角都是导出的，于是它们之间有一个「前两步都是恒等」的三角态射；由「前两步同伦等价则第三步也同伦等价」（下一条引理），这两个锥同伦等价。∎'
      ].join('\n'),
      note: '证明的模式很固定：**先把三角摆成映射锥的样子，然后矩阵硬算**。同伦范畴里所有三角的定理都是这么来的。'
    },

    /* ------------------------------------------------ 长正合列 */
    {
      id: 'imp.long-exact',
      kind: 'implication',
      sources: ['def.distinguished-triangle', 'def.cohomology', 'prop.triangle-rotation'],
      target: 'thm.long-exact',
      title: '短正合列 $\\implies$ 长正合列',
      proof: [
        '设 $0 \\to K \\xrightarrow{\\ f\\ } L \\xrightarrow{\\ g\\ } M \\to 0$ 是复形的短正合列。',
        '',
        '**第一步：短正合列给出导出三角。** 考虑 $f$ 的映射锥的含入 $L \\to M(f)$。由 $g \\circ f = 0$ 与短正合列的泛性质，有一条自然映射',
        '',
        '$$M(f) \\longrightarrow M, \\qquad (k^{n+1}, l^{n}) \\mapsto g^{n}(l^{n})$$',
        '',
        '它是复形态射（与微分交换，因为 $g \\circ d_{L} = d_{M} \\circ g$ 且 $g \\circ f = 0$）。由短正合列上逐项的正合性（五引理），这条映射是**拟同构**，于是三角',
        '',
        '$$K \\xrightarrow{\\ f\\ } L \\xrightarrow{\\ g\\ } M \\xrightarrow{\\ \\delta\\ } K[1]$$',
        '',
        '在 $\\mathbf{K}(\\mathcal{A})$ 中是**导出的**。∎',
        '',
        '**第二步：旋转并取同调。** 把上一步的三角反复旋转，得到一族导出三角',
        '',
        '$$K[n] \\to L[n] \\to M[n] \\to K[n+1], \\qquad (n \\in \\mathbb{Z})$$',
        '',
        '对每个这样的三角作用同调函子 $H^{0}$：因为 $H^{0}$ 是上同调函子，序列',
        '',
        '$$H^{0}(K[n]) \\to H^{0}(L[n]) \\to H^{0}(M[n])$$',
        '',
        '正合，而 $H^{0}(K[n]) = H^{n}(K)$（位移的性质）。把这些正合的三项片段在连接同态 $\\delta$ 处首尾相接，就得到长正合列',
        '',
        '$$\\cdots \\to H^{n}(K) \\to H^{n}(L) \\to H^{n}(M) \\xrightarrow{\\ \\delta\\ } H^{n+1}(K) \\to \\cdots$$',
        '',
        '∎',
        '',
        '**连接同态 $\\delta$ 是从哪来的。** 它就是三角里的第三条腿 $M \\to K[1]$ 取同调之后的样子：一个 $H^{n}(M) \\to H^{n+1}(K)$ 的映射，把「$M$ 里的元素」送上「$K$ 的下一个同调」。它之所以存在，唯一的原因就是**映射锥给了第三条腿** —— 短正合列本身只给出前两条腿。∎'
      ].join('\n'),
      note: '经典证明用蛇引理，这里用映射锥 + 旋转。两条路都通，但后者的好处是：**连接同态是什么**这件事，一眼就能看出来。'
    }
  ]
});
