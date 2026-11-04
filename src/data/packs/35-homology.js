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
      cluster: 'hom.ab',
      type: 'definition',
      status: 'skeleton',
      label: '加法 / 阿贝尔范畴',
      title: '加法范畴与阿贝尔范畴',
      regions: ['homology'],
      tags: ['同调代数', '阿贝尔范畴', '加法范畴'],
      statement: [
        '- **预加法范畴**（$\\mathbf{Ab}$-范畴）是每个 $\\operatorname{Hom}$ 集都带有阿贝尔群结构、且复合双线性的范畴；',
        '- **零对象**是 $\\operatorname{End}(M) = 1$（即 $1_{M} = 0_{M}$）的对象；对象 $M$ 是 $M_{1}, M_{2}$ 的**直和** $M = M_{1} \\oplus M_{2}$，如果存在 $p_{k} : M \\to M_{k}$、$i_{k} : M_{k} \\to M$ 使 $p_{1} i_{1} = 1$、$p_{2} i_{2} = 1$、$i_{1} p_{1} + i_{2} p_{2} = 1_{M}$；\n\n',
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
        '例：$A\\text{-}\\mathbf{Mod}$ 是阿贝尔范畴；拓扑斯上的 $\\mathbf{Ab}(\\mathcal{T})$ 也是；$\\mathbf{AbCHaus}$ 也是。\n\n而 $\\mathbf{AbTop}$ **不是**（$\\mathbb{Z}^{\\mathrm{disc}} \\to \\mathbb{Z}^{\\mathrm{coarse}}$ 这个恒等映射不严格），$\\mathbf{AbHaus}$ 也不是。',
        '阿贝尔范畴是整套同调代数的**工作环境**：有核有余核，「正合列」才说得出口；而加法范畴只提供加法的骨架（零对象与直和）。',
        ,
        '**四条里哪条是“真公理”、哪条是它的推论**（阿贝尔范畴的这组等价常被并列，其实第 4 条最弱也最像“公理”，前三条各有代价）：\n' +
        '\n' +
        '- (1) $\\implies$ (2)：**一次取核 + 余核的图追踪**。$i : N \\rightarrowtail M$ 把 $N$ 等同到 $\\ker(M \\to \\operatorname{coker} i)$；这一步用「单态射 = 自身的核」这一条预阿贝尔性质，**不用加法结构之外的额外假设**。\n' +
        '- (2) $\\implies$ (1)：**反向几乎免费**（$N$ 同构于余核的核 就是说 $i$ 是某个态的核，即正则）。\n' +
        '- (1) $\\iff$ (3)：**这一步要「有核有余核」**（即预阿贝尔）。$f = M \\to N$ 分解成 $M \\twoheadrightarrow \\operatorname{im} f \\rightarrowtail N$；「满射段正则」正是 (1)。⚠️ 唯一性在**只差一个同构**的意义下成立 —— 「唯一」这个词在这里是本质的：分解不是严格的，因为同一个像可以有不同的代表。\n' +
        '- (1) $\\iff$ (4)：**这是最“代数”的一条**（Abel 的原始形式）：$\\ker(N \\to \\operatorname{coker} f) \\cong \\operatorname{coker}(\\ker f \\to M)$。它等价于「第一同构定理在范畴里成立」，需要**核与余核都存在**且**单/满态射的正则性**。\n' +
        '\n' +
        '⚠️ **预阿贝尔 $\\ne$ 阿贝尔的关键**：预阿贝尔只要求核与余核存在；(1)–(4) 里任何一条都可以**失败**。最标准的反例是 $\\mathbf{PreAb}$（预阿贝尔群范畴）或「带滤过的向量空间」范畴 —— 里面有满态射不是余核、单态射不是核的情形。所以**阿贝尔 = 预阿贝尔 + （任一上述等价条件）**，这个“加一条”不能省。\n' +
        '\n' +
        '⚠️ **另两处易错**：\n' +
        '- 「加法范畴」的定义里「所有直和」与「所有有限积」等价，但**要预加法**为前提（一般范畴里有限积与有限余积不必重合）。\n' +
        '- 「有所有有限极限与余极限」是 (2) 那一行的说法，它**不**蕴含阿贝尔性（例如 $\\mathbf{Set}$ 有有限极限与余积，却远非阿贝尔）—— 差别正在「不交、万有、有效」这些附加条件。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1–5.2']
    },

    /* ------------------------------------------------------ 复形 */
    {
      id: 'def.cochain-complex',
      cluster: 'hom.complex',
      type: 'definition',
      label: '上链复形',
      title: '复形',
      regions: ['homology'],
      tags: ['同调代数', '复形', '微分'],
      statement: [
        '设 $\\mathcal{C}$ 是加法范畴。$\\mathcal{C}$ 中的**（长）序列**是有序集 $(\\mathbb{Z}, \\le)$ 上的图',
        '',
        '$$\\cdots \\longrightarrow K^{n-1} \\xrightarrow{\\ d^{n-1}\\ } K^{n} \\xrightarrow{\\ d^{n}\\ } K^{n+1} \\longrightarrow \\cdots$$',
        '',
        '若对每个 $n$ 都有 $d^{n} \\circ d^{n-1} = 0$，则称 $K$ 是一个**（上）链复形**，$d$ 叫**微分**。把箭头反向（或等价地在 $\\mathcal{C}^{\\mathrm{op}}$ 里取）得**链复形**，记 $K_{n} := K^{-n}$、$d_{n} := d^{-n}$。'
      ].join('\n'),
      notes: [
        '$K$ 叫**下有界**（$n \\ll 0$ 时 $K^{n} = 0$）、**上有界**、**有界**（两者兼备）。\n\n相应地记复形范畴为 $\\mathcal{C}(\\mathcal{C})$，其下有界、上有界、有界的满子范畴分别记 $\\mathcal{C}^{+}(\\mathcal{C})$、$\\mathcal{C}^{-}(\\mathcal{C})$、$\\mathcal{C}^{b}(\\mathcal{C})$；\n\n同伦范畴那边同样加 $+$ $-$ $b$。',
        '例：$K$ 是（半）单纯对象时，令 $d^{n} := \\sum_{i} (-1)^{i} d_{i}^{n}$，则 $K$ 成为一个链复形 —— 系数 $(-1)^{i}$ 就是让相邻两项的复合正负相消的那个符号，和经典的单纯边界算子完全一致。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* -------------------------------------------------- 复形是加法的 */
    {
      id: 'prop.complex-additive',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '复形范畴是加法范畴',
      title: '复形范畴的性质',
      regions: ['homology'],
      tags: ['同调代数', '加法范畴', '逐项计算'],
      statement: [
        '复形构成 $\\mathcal{C}$ 的**加法满子范畴** $\\mathcal{C}(\\mathcal{C})$：',
        '',
        '- 双积**逐项**取：$(K \\oplus L)^{n} := K^{n} \\oplus L^{n}$，$d_{K \\oplus L} := d_{K} \\oplus d_{L}$；',
        '- 核与余核也**逐项**取：$(\\ker f)^{n} = \\ker f^{n}$，$d_{\\ker f} := d_{K}|_{\\ker f^{n}}$；',
        '- $\\mathcal{C}(\\mathcal{C})$ 中的**极限与余极限逐项计算**。'
      ].join('\n'),
      notes: '「逐项计算」是函子范畴的通用事实：$\\mathcal{C}(\\mathcal{C})$ 是 $\\operatorname{Hom}((\\mathbb{Z},\\le), \\mathcal{C})$ 的满子范畴，一切构造都在每个 $n$ 上分别做，然后再验证微分与它们相容。这条让后面所有关于复形的极限/余极限都不必单独证明。',
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ---------------------------------------------------------- 同伦 */
    {
      id: 'def.homotopy',
      cluster: 'hom.complex',
      type: 'definition',
      label: '同伦',
      title: '同伦',
      regions: ['homology'],
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
      notes: '零伦态射构成 $\\operatorname{Hom}_{\\mathcal{C}(\\mathcal{C})}(K, L)$ 的一个**子群**；而且同伦是**两边都相容于复合**的等价关系（$f \\sim g$ 时 $h \\circ f \\circ k \\sim h \\circ g \\circ k$）。\n\n两条合起来，才允许把「同伦」当成要商掉的东西。',
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ---------------------------------------------------- 同伦范畴 */
    {
      id: 'def.homotopy-category',
      cluster: 'hom.complex',
      type: 'definition',
      label: '同伦范畴',
      title: '同伦范畴',
      regions: ['homology'],
      tags: ['同调代数', '同伦范畴'],
      statement: [
        '**同伦范畴** $\\mathbf{K}(\\mathcal{C})$ 的对象与 $\\mathcal{C}(\\mathcal{C})$ 相同，态射取',
        '',
        '$$\\operatorname{Hom}_{\\mathbf{K}(\\mathcal{C})}(K, L) \\;:=\\; \\operatorname{Hom}_{\\mathcal{C}(\\mathcal{C})}(K, L) \\big/\\ \\sim,$$',
        '其中 $\\sim$ 由**零同伦**的映射生成。',
        '',
        '其中的同构叫**同伦等价**；在 $\\mathbf{K}(\\mathcal{C})$ 中变成 $0$ 的复形叫**同伦平凡的**。'
      ].join('\n'),
      notes: [
        '- (a) 等价的说法：$f : K \\to L$ 是同伦等价' +
        '- (b) 存在 $g : L \\to K$ 使 $g \\circ f \\sim 1_{K}$、$f \\circ g \\sim 1_{L}$；$K$ 同伦平凡' +
        '- (c) $1_{K} \\sim 0_{K}$。',
        '$\\mathbf{K}(\\mathcal{C})$ 是**加法范畴**，且 $\\mathcal{C}(\\mathcal{C}) \\to \\mathbf{K}(\\mathcal{C})$ 加法；\n\n任何加法函子 $F : \\mathcal{C} \\to \\mathcal{C}\'$ 诱导 $\\mathbf{K}(\\mathcal{C}) \\to \\mathbf{K}(\\mathcal{C}\')$。',
        '为什么要在同伦范畴里干活：同调函子在同伦下不变，所以**先商掉同伦，剩下的信息才是同调真正看得见的**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ------------------------------------------------------ 映射锥 */
    {
      id: 'def.mapping-cone',
      cluster: 'hom.complex',
      type: 'definition',
      label: '映射锥',
      title: '映射锥与位移',
      regions: ['homology'],
      tags: ['同调代数', '映射锥', '位移'],
      statement: [
        '态射 $f : K \\to L$ 的**映射锥**是复形',
        '',
        '$$M(f)^{n} := K^{n+1} \\oplus L^{n}, \\qquad d^{n} := \\begin{pmatrix} -d^{n+1} & 0 \\\\ f^{n} & d^{n} \\end{pmatrix}$$',
        '',
        '（矩阵按 $K^{n+1} \\oplus L^{n}$ 分块：左上取自 $K$ 的微分，右下取自 $L$ 的微分，左下是 $f$ 的分量；$d^{2} = 0$ 只要 $f$ 与微分交换。）$k$-**位移** $K[k]$ 取 $K[k]^{n} := K^{n+k}$，微分带符号 $(-1)^{k} d^{n+k}$。'
      ].join('\n'),
      notes: '用处：给出短正合列 $0 \\to L \\to M(f) \\to K[1] \\to 0$（一般不分裂）。于是**每个态射都能嵌进一条「几乎正合」的序列**，这是三角范畴的出发点 —— 后面所有导出三角的定义都靠它。',
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ---------------------------------------------------- 导出三角 */
    {
      id: 'def.distinguished-triangle',
      cluster: 'hom.complex',
      type: 'definition',
      label: '导出三角',
      title: '导出三角',
      regions: ['homology'],
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
      notes: '导出三角是「短正合列」的**同伦版**：它不要求 $M$ 是商，只要求 $K \\to L \\to M \\to K[1]$ 在形状上接得上。加上位移这一步之后，一个态射就能嵌进一条任意长度的序列里 —— 这正是三角范畴要的形式。',
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* ------------------------------------------ 三角的旋转与延拓 */
    {
      id: 'prop.triangle-rotation',
      cluster: 'hom.complex',
      type: 'proposition',
      label: '三角的旋转与延拓',
      title: '导出三角的基本性质',
      regions: ['homology'],
      tags: ['同调代数', '三角', '旋转'],
      statement: [
        '在 $\\mathbf{K}(\\mathcal{C})$ 中：',
        '',
        '1. $K \\xrightarrow{\\ 1\\ } K \\to 0 \\to K[1]$ 是导出三角；',
        '2. **旋转**：$K \\xrightarrow{\\ f\\ } L \\xrightarrow{\\ g\\ } M \\xrightarrow{\\ h\\ } K[1]$ 导出 $\\iff$ 旋转后的 $L \\xrightarrow{\\ g\\ } M \\xrightarrow{\\ h\\ } K[1] \\xrightarrow{\\ -f[1]\\ } L[1]$ 导出；\n\n',
        '3. 任意 $f : K \\to L$ 都能（**不唯一**地）嵌入一个导出三角；',
        '4. 导出三角之间的态射可以（**不唯一**地）延拓。'
      ].join('\n'),
      notes: '推论：**映射锥在 $\\mathbf{K}(\\mathcal{C})$ 中唯一**（同伦意义下唯一）。所以「$f$ 的锥」在 $\\mathbf{K}(\\mathcal{C})$ 里是一个定义良好的对象 —— 尽管 $M(f)$ 的显式写法依赖于 $f$ 的表示。',
      notes: [
        '**四条里“不唯一”出现了两次 —— 那正是导岀范畴与三角范畴的差别所在**：\n' +
        '\n' +
        '- **① 与 ②（旋转）**：**这一条是三角公理的核心**。给定 $K \\to L \\to M \\to K[1]$ 导出，可以旋转得到 $L \\to M \\to K[1] \\to L[1]$（第三个箭头带 $-f[1]$ 的符号）。⚠️ **符号不能省**：写成 $f[1]$ 会与 ② 重复旋转得到矛盾（旋转四次回到自身，符号必须乘积为 $+1$）。\n' +
        '- **③ 任意 $f$ 可嵌入导出三角**：**这一步要“映射锥”**（`def.mapping-cone`），且**不唯一** —— 但不同的选择只差**非唯一的同构**（不是唯一同构）。这是三角范畴与导出范畴的关键差别：$\\mathbf{K}(\\mathcal{C})$ 里锥是具体的，所以唯一；在一般三角范畴里只到“存在”。\n' +
        '- **④ 态射可延拓**：**同样不唯一**，且**不能用“取锥”来证明**（一般三角范畴没有锥的构造），要靠 TR3 公理。\n' +
        '\n' +
        '⚠️ **「不唯一」不是“可以随便选”**：延拓之间的差异是可控的（差一个同伦/相差某种自由度），但**没有** canonical choice。这就是为什么三角范畴里不能像导出范畴那样“构造性地”做事 —— 需要额外的 enhanced 结构（dg 范畴、稳定 $\\infty$-范畴）才能把“选择”变成“性质”。\n'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* -------------------------------------------- 三角态射的性质 */
    {
      id: 'lem.triangle-morphism',
      cluster: 'hom.complex',
      type: 'lemma',
      label: '三角态射的性质',
      title: '导出三角之间态射的性质',
      regions: ['homology'],
      tags: ['同调代数', '三角', '同伦'],
      statement: [
        '设 $(u, v, w)$ 是 $\\mathbf{K}(\\mathcal{C})$ 中导出三角之间的态射。则',
        '',
        '1. 若这是三角**到自身**的态射、而**前两步为零**（$u = v = 0$），则第三步的 $w$ 满足 $w^{2} = 0$；',
        '2. 若 $u, v$ 都是**同伦等价**，则 $w$ 也是。'
      ].join('\n'),
      notes: [
        '**证明第 2 条（三角的五引理）。** 取任意 $T \\in \\mathbf{K}(\\mathcal{C})$，对共调函子 $\\operatorname{Hom}_{\\mathbf{K}}(T, -)$ 作用在两个三角上，得两条长正合列，并由 $(u, v, w, u[1], v[1], w[1])$ 连起来：',
        '',
        '$$\\begin{array}{ccccccccc} \\operatorname{Hom}(T, K) & \\to & \\operatorname{Hom}(T, L) & \\to & \\operatorname{Hom}(T, M) & \\to & \\operatorname{Hom}(T, K[1]) & \\to & \\operatorname{Hom}(T, L[1]) \\\\ {\\scriptstyle u_{*}}\\big\\downarrow & & {\\scriptstyle v_{*}}\\big\\downarrow & & {\\scriptstyle w_{*}}\\big\\downarrow & & {\\scriptstyle u[1]_{*}}\\big\\downarrow & & {\\scriptstyle v[1]_{*}}\\big\\downarrow \\\\ \\operatorname{Hom}(T, K\') & \\to & \\operatorname{Hom}(T, L\') & \\to & \\operatorname{Hom}(T, M\') & \\to & \\operatorname{Hom}(T, K\'[1]) & \\to & \\operatorname{Hom}(T, L\'[1]) \\end{array}$$',
        '',
        '若 $u, v$ 是同伦等价，则 $u_{*}, v_{*}$ 以及它们的平移 $u[1]_{*}, v[1]_{*}$ 都是双射 —— 五引理把中间的 $w_{*}$ 夹成双射。这对**每个** $T$ 都成立，于是由 Yoneda 引理，$w$ 本身就是同伦等价。∎',
        ['**证明第 1 条。** 设三角 $K \\xrightarrow{f} L \\xrightarrow{g} M \\xrightarrow{h} K[1]$ 到自身有态射 $(0, 0, w)$，于是 $g v = w g$、$h w = u[1] h$，即',
          '$$w g = 0, \\qquad h w = 0 .$$',
          '- 由 $w g = 0$：把共调函子 $\\operatorname{Hom}(-, M)$ 作用在三角上得长正合列 $\\operatorname{Hom}(K[1], M) \\xrightarrow{\\;h^{*}\\;} \\operatorname{Hom}(M, M) \\xrightarrow{\\;g^{*}\\;} \\operatorname{Hom}(L, M)$，而 $g^{*}(w) = w g = 0$，所以 $w$ 落在 $\\operatorname{im} h^{*}$ 里：存在 $w_{1} : K[1] \\to M$ 使 **$w = w_{1} \\circ h$**；\n\n',
          '- 由 $h w = 0$ 得 $(h w_{1}) \\circ h = 0$。\n\n把同一套正合列用在**旋转后**的三角 $L \\xrightarrow{g} M \\xrightarrow{h} K[1] \\xrightarrow{-f[1]} L[1]$ 上（对着靶 $K[1]$），$(h w_{1}) \\circ h = 0$ 给出 $h w_{1}$ 落在 $\\operatorname{im}(-f[1])^{*}$ 里：存在 $\\beta : L[1] \\to K[1]$ 使 **$h w_{1} = -\\beta \\circ f[1]$**；\n\n',
          '- 于是 $w^{2} = w_{1} h w_{1} h = w_{1}(h w_{1}) h = -w_{1} \\beta f[1] h$。而 $f[1] \\circ h = 0$ —— 那正是旋转公理说的「三角里相邻两步复合为零」。故 $w^{2} = 0$。∎',
          '**第 1 条在说什么**：三角之间的态射被前两步控制得很紧 —— 前两步一旦归零，第三步不但被逼成零平方，还被夹在两条正合列之间。这正是三角范畴公理里那条最不显然的要求的来源。',
        ,
        '**各方向用到的假设**（这两条是三角态射的推论，并非互为逆命题）：\n' +
        '- 在 $\\mathbf{K}(\\mathcal{C})$ 中同伦等价 $\\iff$ 同构：由同伦范畴态射的定义展开；后续必须在此范畴讨论。\n' +
        '- 自态射且 $u=v=0$ $\\implies$ $w^2=0$：需导出三角的 Hom 长正合列，把 $w$ 经连接态射分解，再用相邻箭头复合为零；不是零态射的定义展开。\n' +
        '- $u,v$ 为同伦等价 $\\implies$ $w$ 为同伦等价：对每个对象应用 Hom 长正合列、五引理及 Yoneda 判据；不需复形逐项有限或有界。\n' +
        '- 第三分量同构不推出前两分量都同构：两个恒等三角 $K\\xrightarrow{1}K\\to0\\to K[1]$ 之间取 $(0,0,1_0)$，非零 $K$ 时前两项不是同构；“到自身”也是写 $w^2$ 的必要类型条件。\n'
        ].join('\n'),
        '第 2 条是「五引理」在同伦范畴里的样子：**前两步定住了，第三步就跟着定住**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1']
    },

    /* -------------------------------------------------------- 同调 */
    {
      id: 'def.cohomology',
      cluster: 'hom.cohomology',
      type: 'definition',
      label: '同调',
      title: '同调',
      regions: ['homology'],
      tags: ['同调代数', '同调', '复形'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$K$ 是 $\\mathcal{A}$ 中的上链复形。$K$ 的**第 $n$ 阶同调**是',
        '',
        '$$H^{n}(K) \\;:=\\; Z^{n}(K) \\big/ B^{n}(K) \\;=\\; \\ker d^{n} \\big/ \\operatorname{im} d^{n-1}$$',
        '',
        '其中 $Z^{n}(K) := \\ker d^{n}$ 是**上闭链**群、$B^{n}(K) := \\operatorname{im} d^{n-1}$ 是**上边缘**群（见 `def.cycle`、`def.boundary`）；由 $d^{2} = 0$ 得 $B^{n} \\subseteq Z^{n}$，商才有意义。',
        '',
        '链复形 $K_{n}$ 的第 $n$ 阶同调取它在 $\\mathcal{A}^{\\mathrm{op}}$ 中的 $(1-n)$ 阶上同调。'
      ].join('\n'),
      notes: [
        '例：$H^{n}(K[k]) = H^{n+k}(K)$；$M \\in \\mathcal{A}$ 时 $H^{0}([M]) = M$、其余为 $0$；$H^{0}([M \\to N]) = \\ker f$、$H^{1}([M \\to N]) = \\operatorname{coker} f$。',
        '$H^{n}$ 是**函子**，但它是**加法而不正合**的 —— 同调不可交换性是整个同调代数的起点。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1–7.3']
    },

    /* -------------------------------------------- 同调的短正合列 */
    {
      id: 'prop.cohomology-exact-sequence',
      cluster: 'hom.cohomology',
      type: 'proposition',
      label: '同调的短正合列',
      title: '把同调夹在两个余核 / 核之间',
      regions: ['homology'],
      tags: ['同调代数', '同调', '正合列'],
      statement: [
        '设 $K$ 是复形。则对每个 $k$ 有正合列',
        '',
        '$$0 \\longrightarrow H^{k}(K) \\longrightarrow \\operatorname{coker} d^{k-1} \\longrightarrow \\ker d^{k+1} \\longrightarrow H^{k+1}(K) \\longrightarrow 0$$'
      ].join('\n'),
      notes: [
        '也就是 $0 \\to Z^{k}/B^{k} \\to K^{k}/B^{k} \\to Z^{k+1} \\to Z^{k+1}/B^{k+1} \\to 0$。这条把「同调」拆成两段：**先取余核去掉上一步的像，再取核挑出闭链，最后取商** —— 于是复形里的信息被一层层剥出来。',
        ['**证明。** 记 $Z^{k} := \\ker d^{k}$、$B^{k} := \\operatorname{im} d^{k-1}$，于是 $H^{k} = Z^{k}/B^{k}$、$\\operatorname{coker} d^{k-1} = K^{k}/B^{k}$。要证的四个箭头依次是：',
          '- $Z^{k}/B^{k} \\to K^{k}/B^{k}$：由含入 $Z^{k} \\hookrightarrow K^{k}$ 诱导，单射（$Z^{k}$ 在 $K^{k}$ 里，商掉同一个 $B^{k}$）；',
          '- $K^{k}/B^{k} \\to Z^{k+1}$：由 $d^{k}$ 诱导（它把 $B^{k} = \\operatorname{im} d^{k-1}$ 送到 $d^{k}d^{k-1} = 0$，故下降得良定义）。核正是「$d^{k}x = 0$ 的那些 $x + B^{k}$」＝ $Z^{k}/B^{k}$；',
          '- $Z^{k+1} \\to Z^{k+1}/B^{k+1} = H^{k+1}$：取商映射，满，核是 $B^{k+1} = \\operatorname{im} d^{k}$ —— 正好是上一个箭头的像。∎',
          '三段正合各只用到「$d^{2} = 0$」和核/余核的泛性质。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1–7.3']
    },

    /* -------------------------------------------------- 上同调函子 */
    {
      id: 'def.cohomological-functor',
      cluster: 'hom.cohomology',
      type: 'definition',
      /* 同词不同物（已核对）—— 与 def.cohomology-class 不是同一个概念，别合并。 */
      distinctFrom: ['def.cohomology-class'],
      label: '上同调函子',
      title: '上同调函子',
      regions: ['homology'],
      tags: ['同调代数', '上同调函子', '正合'],
      statement: [
        '设 $\\mathcal{C}$ 是加法范畴、$\\mathcal{A}$ 是阿贝尔范畴。函子 $F : \\mathbf{K}(\\mathcal{C}) \\to \\mathcal{A}$ 叫**上同调函子**，如果对每个导出三角 $K \\to L \\to M \\to K[1]$，序列',
        '',
        '$$FK \\longrightarrow FL \\longrightarrow FM$$',
        '',
        '正合。'
      ].join('\n'),
      notes: '上同调函子把导出三角变成一条**长正合列**：反复旋转三角、每次用一次正合性、再拼接，就得到 $\\cdots \\to F(K[n]) \\to F(L[n]) \\to F(M[n]) \\to F(K[n+1]) \\to \\cdots$。\n\n例：固定 $K$ 之后，$\\operatorname{Hom}_{\\mathbf{K}(\\mathcal{C})}(K, -)$ 是上同调函子 —— 这就是同调代数里那些「长正合列」的总来源。',
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1–7.3']
    },

    /* -------------------------------------------------- 长正合列 */
    {
      id: 'thm.long-exact',
      cluster: 'hom.cohomology',
      type: 'theorem',
      label: '长正合列',
      title: '短正合列给出长正合列（蛇引理）',
      regions: ['homology'],
      tags: ['同调代数', '长正合列', '蛇引理'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴，$0 \\to K \\to L \\to M \\to 0$ 是复形的短正合列。则存在**长正合列**',
        '',
        '$$\\cdots \\to H^{n}(K) \\to H^{n}(L) \\to H^{n}(M) \\xrightarrow{\\ \\delta\\ } H^{n+1}(K) \\to \\cdots$$',
        '',
        '其中 $\\delta$ 叫**连接同态**。',
        '',
        '推论：$H^{n} : \\mathbf{K}(\\mathcal{A}) \\to \\mathcal{A}$ 是**上同调函子**。'
      ].join('\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1–7.3']
    },

    /* ---------------------------------------------------- 拟同构 */
    {
      id: 'def.quasi-iso',
      cluster: 'hom.cohomology',
      type: 'definition',
      label: '拟同构',
      title: '拟同构与零调复形',
      regions: ['homology'],
      tags: ['同调代数', '拟同构', '零调'],
      statement: [
        '复形态射 $f : K \\to L$ 叫**拟同构**，如果对每个 $n$，$H^{n}(f)$ 都是同构。复形 $K$ 叫**零调的**，如果 $H^{n}(K) = 0$ 对所有 $n$。'
      ].join('\n'),
      notes: [
        '注意：$K \\to L$ 拟同构 $\\iff$ $L \\to K$ 拟同构（「拟同构」是双向的说法，虽然映射只有一个方向）；$K$ 零调 $\\iff$ $[0] \\to K$ 拟同构 $\\iff$ $K \\to [0]$ 拟同构。',
        '两条命题：（1）若 $K \\to L \\to M \\to$ 是导出三角，则 $f$ 是拟同构 $\\iff$ $M$ 零调；（2）对三角态射 $(u, v, w)$，$u, v$ 是拟同构 $\\iff$ $w$ 是拟同构。',
        '拟同构是「在 $\\mathbf{K}(\\mathcal{C})$ 里不是同构，但同调上看不出差别」的映射 —— 把拟同构反过来形式地变成同构，就得到**导出范畴**。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1–7.3']
    },

    /* -------------------------------------------------- 内射对象 */
    {
      id: 'prop.injective-criterion',
      cluster: 'hom.cohomology',
      type: 'proposition',
      label: '内射对象的判据',
      title: '内射对象的四条等价说法',
      regions: ['homology'],
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
        '$M$ **内射** $\\iff M\\prime\\prime$ **内射**'
      ].join('\n'),
      notes: '证明用一张 $3 \\times 3$ 的 $\\operatorname{Hom}$ 图表：把短正合列 $0 \\to A \\to B \\to C \\to 0$ 用 $\\operatorname{Hom}(-, M)$ 家族拉成三行，用两次蛇引理读出中间一行 $0 \\to \\ker f \\to \\ker g \\to \\ker h \\to \\operatorname{coker} f \\to \\operatorname{coker} g \\to 0$，再看出第一行与第三行都是正合的，于是 $\\ker g = \\operatorname{coker} g = 0$。',
      notes: [
  '**四条是一个循环，但每一跳的代价不同**（这也是为什么内射性有这么多“等价说法”，却总是用同一条来验证）：\n' +
  '\n' +
  '- (1) $\\iff$ (3)：**几乎只是定义改写**。$\\operatorname{Hom}(-,I)$ 正合 $\\iff$ 它把单态射送到满射（其余两个正合性对 $\\operatorname{Hom}$ 是自动的，因为它是左正合的）。这一跳**不需要范畴有足够多内射**。\n' +
  '- (1) $\\implies$ (2)：**一行**：给单态射 $\\iota : I \\rightarrowtail M$，由内射性存在 $r : M \\to I$ 使 $r\\iota = \\mathrm{id}_{I}$ —— 这就是收缩。\n' +
  '- (2) $\\implies$ (1)：**这一步要用 Baer 判别法的“提升”论证**：给单态射 $M\' \\rightarrowtail M$ 与 $f : M\' \\to I$，考虑推出图，把 $f$ 拉成 $I \\rightarrowtail P$ 再取收缩，得到 $M \\to I$ 使图交换。**这是四条里唯一有实质劳动的一跳**。\n' +
  '- (1) $\\iff$ (4)：**只对“以 $I$ 为左端的短正合列”说**。一般短正合列分裂 $\\iff$ 左端内射（或右端投射）；所以 (4) 的准确读法是「每个**形如** $0 \\to I \\to M \\to M\'\' \\to 0$ 的列分裂」。\n' +
  '\n' +
  '**一条要用 Zorn 的补充（很关键）**：在 $R$-模范畴里，Bolzano–Weierstrass 式的论证 ——「$I$ 内射 $\\iff$ 对每个**理想** $J \\subseteq R$，每个 $J \\to I$ 都能延拓到 $R \\to I$」（Baer 判别法）—— 用的是 **Zorn 引理**（把“可延拓的子模”取极大）。所以「内射性可用理想检验」这条便利是**有选择公理代价**的；在一般的 Grothendieck 范畴里对应的是「用次对象检验」，不需要 AC。\n' +
  '\n' +
  '⚠️ **第二个断言的假设**：$M\'$ 内射时 $M$ 内射 $\\iff M\'\'$ 内射 —— 这是「内射对象的扩张封闭性」，只用短正合列与 (4)，**不需要 $\\mathcal{A}$ 有足够多内射**。别把它与「$\\mathcal{A}$ 有足够多内射」这个范畴级假设混起来。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.1–7.3']
    },

    /* ------------------------------------------------------ 过滤 */
    {
      id: 'def.filtration',
      cluster: 'hom.spectral',
      type: 'definition',
      label: '过滤',
      title: '过滤',
      regions: ['homology'],
      tags: ['同调代数', '过滤', '关联分次'],
      statement: [
        '设 $\\mathcal{A}$ 是阿贝尔范畴。$M \\in \\mathcal{A}$ 上的（**递降**）**过滤**是 $M$ 的子对象沿 $(\\mathbb{Z}, \\ge)$ 的图：',
        '',
        '$$\\cdots \\subseteq F^{n}M \\subseteq F^{n+1}M \\subseteq \\cdots \\subseteq M$$',
        '',
        '总假定过滤是**穷尽的**（$\\bigcup_{n} F^{n}M = M$）与**分离的**（$\\bigcap_{n} F^{n}M = 0$）；若 $n \\ll 0$ 时 $F^{n}M = M$ 且 $n \\gg 0$ 时 $F^{n}M = 0$，叫**有限的**。\n\n带过滤的对象构成范畴 $\\mathbf{F}(\\mathcal{A})$，**关联分次**记 $\\operatorname{Gr}^{n}M := F^{n}M / F^{n+1}M$。'
      ].join('\n'),
      notes: '命题：$\\mathbf{F}(\\mathcal{C}(\\mathcal{A})) \\cong \\mathcal{C}(\\mathbf{F}(\\mathcal{A}))$ —— **「带过滤」与「取复形」可以交换**。所以可以先把复形过滤好，再逐层算同调。',
      refs: ['Le Stum, An introduction to condensed mathematics, §7.2']
    },

    /* ---------------------------------------------------- 谱序列 */
    {
      id: 'def.spectral-sequence',
      cluster: 'hom.spectral',
      type: 'definition',
      label: '谱序列',
      title: '谱序列',
      regions: ['homology'],
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
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §7.2']
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
        '**旋转。** 不妨设 $M = M(f)$，即三角是 $K \\xrightarrow{\\ f\\ } L \\to M(f) \\to K[1]$。\n\n要证 $L \\to M(f) \\to K[1] \\to L[1]$ 导出。\n\n把 $g : L \\to M(f)$ 取成含入 $(0, 1)^{\\mathrm{T}}$，则它的映射锥是',
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
