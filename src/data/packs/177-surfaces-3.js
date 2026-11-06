/* ============================================================================
   内容包 · 曲面地形 第三刀（2026-11-03）：把分类线补齐
   ----------------------------------------------------------------------------
   第二刀立了闭曲面与分类定理，但那条线还缺两样东西（当时在注里就写明「不是节点」）：
     ① 两条判据式：$\\chi = 2 - 2g$（可定向）与 $\\chi = 2 - k$（不可定向）——
        分类定理的「不变量」那一步靠它们，缺了就成了「结论有了、算法没有」；
     ② 例子层：球面 / 环面 / 射影平面 / 克莱因瓶 —— E4 点名缺的四个，
        分类定理的三种标准形在图上连个指得着的对象都没有。

   ⚠️ 两条命题仍标 status: skeleton，但缺口已换口径（2026-11-06）：标准形的剖分与计数、连通和公式都已在注里写完整；缺的是「任意曲面化到标准形」这一桥 —— 即分类定理的组合归类（thm.classification-surfaces）与 Radó 三角剖分存在性（thm.rado），两条都仍是 skeleton。另外 H1 结构 / H2=0 的同调事实也只有标准形上的推导。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '曲面地形（三）：Euler 示性数与四个标准例子',

  nodes: [
    {
      id: 'prop.eulerchar-genus',
      cluster: 'topology.surfaces',
      type: 'proposition',
      label: 'Euler 示性数与亏格',
      title: '闭可定向曲面：$\\chi = 2 - 2g$',
      regions: ['topology'],
      tags: ['命题', '拓扑', '曲面', '同调'],
      status: 'skeleton',
      statement: [
        '设 $S$ 是**闭可定向曲面**，亏格 $g = \\tfrac{1}{2}\\operatorname{rank} H_{1}(S;\\mathbb{Z})$（`def.genus`）。则',
        '',
        '$$\\chi(S) = 2 - 2g .$$',
        '',
        '于是 $\\chi$ 与 $g$ 互相决定：$g = (2 - \\chi)/2$。',
      ].join('\n'),
      notes: [
        '⚠ **本节点保持 status: skeleton。** 缺口不在计算，而在「任意闭可定向曲面化到标准形」这一步：它要 `thm.classification-surfaces`（骨架），或等价地要 $\\beta_{2}(S)=1$（闭可定向曲面的基本类），后者本图没有节点。下面把能完整写出的部分写满，并标清缺口。',
        '**一、标准形上的计数（完整）**：把 $g$ 个环面的连通和画成 $4g$ 边形，边按 $a_{1}b_{1}a_{1}^{-1}b_{1}^{-1}\\cdots$ 配对；取中心扇形三角剖分：顶点 $2$（中心 + 一个边界顶点类）、边 $2g$（配对边界边）$+4g$（辐条）$=6g$、面 $4g$。故 $\\chi=2-6g+4g=2-2g$。$g=1$ 即 $\\chi(T^{2})=0$；与具体剖分无关（`thm.euler-characteristic` 配合 `thm.simplicial-approximation`）。',
        '**二、连通和公式（完整）**：$\\chi(M\\#N)=\\chi(M)+\\chi(N)-2$。证：取 $M$、$N$ 的有限剖分使挖去的开球各是一个 $2$-单形的内部；删去一个开 $2$-单形后 $V$、$E$ 不变、$F$ 减一，故 $\\chi(M\\setminus D^{2})=\\chi(M)-1$，$N$ 同理；沿边界圆 $S^{1}$ 粘回时用 $\\chi(A\\cup B)=\\chi(A)+\\chi(B)-\\chi(A\\cap B)$（对有限复形数胞腔，或由 `thm.mv-homology` 的长正合列取秩），而 $\\chi(S^{1})=0$，故 $\\chi(M\\#N)=(\\chi(M)-1)+(\\chi(N)-1)-0=\\chi(M)+\\chi(N)-2$。归纳：$S^{2}$ 的 $\\chi=2$，$T^{2}$ 的 $\\chi=0$，$g$ 个环面的连通和 $\\chi=2-2g$。',
        '**三、$H_{1}$ 的秩（标准形上完整）**：闭可定向曲面的连通和满足 $H_{1}(M\\#N)\\cong H_{1}(M)\\oplus H_{1}(N)$。取 $M=T^{2}\\setminus D^{2}$、$N$ 为 $g-1$ 个环面的连通和再挖去一个开球，用 `thm.mv-homology`：$H_{1}(\\partial)=H_{1}(S^{1})=\\mathbb{Z}$ 到 $H_{1}(M)\\oplus H_{1}(N)$ 的映射为零（边界圆在 $M$ 内是换位子的乘积，同调为零），故 $H_{1}$ 直和；归纳得 $\\operatorname{rank}H_{1}=2g$，与 `def.genus` 的定义一致。所以标准形上「$\\chi=2-2g$」与「$g=\\tfrac12\\operatorname{rank}H_{1}$」完全吻合。',
        '**四、缺口（为什么仍 skeleton）**：上式只对标准形成立。要得到任意闭可定向曲面 $S$，需要 (a) $S$ 同胚于某标准形 —— 即 `thm.classification-surfaces`（它本身依赖 Radó 与组合引理）；或 (b) 绕过分类，直接证 $\\beta_{2}(S)=1$（基本类存在），再由 $\\chi=\\sum_{i}(-1)^{i}\\beta_{i}$（`thm.euler-characteristic`）得 $\\chi=1-2g+1$。两条路本图都没有闭合，故不删 status、不勾 ∎。',
        '⭐ 三个读数：$S^{2}$ 的 $g=0$、$\\chi=2$；$T^{2}$ 的 $g=1$、$\\chi=0$；双环面 $g=2$、$\\chi=-2$。',
        '📌 与几何的接口：Gauss–Bonnet 说 $\\int_{M}K\\,\\mathrm{d}A=2\\pi\\chi(M)$；与本条合起来是 $\\int K=4\\pi(1-g)$ —— 曲率总量只由亏格决定。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, Ch. 2.2'],
    },

    {
      id: 'prop.eulerchar-nonorientable',
      cluster: 'topology.surfaces',
      type: 'proposition',
      label: 'Euler 示性数与不可定向亏格',
      title: '闭不可定向曲面：$\\chi = 2 - k$',
      regions: ['topology'],
      tags: ['命题', '拓扑', '曲面', '同调'],
      status: 'skeleton',
      statement: [
        '设 $S$ 是**闭不可定向曲面**，且 $S \\cong \\mathbb{RP}^{2}\\#\\cdots\\#\\mathbb{RP}^{2}$（$k$ 个，' +
          '见 `thm.classification-surfaces`；$k$ 叫**不可定向亏格**）。则',
        '',
        '$$\\chi(S) = 2 - k .$$',
      ].join('\n'),
      notes: [
        '⚠ **本节点保持 status: skeleton。** 与可定向侧同因：缺口是「任意闭不可定向曲面化到标准形」这一步（`thm.classification-surfaces` 仍 skeleton），以及 $H_{1}$、$H_{2}$ 的结构定理。下面写满能写的部分。',
        '**一、标准形计数（完整）**：$k$ 个射影平面的连通和画成 $2k$ 边形，边按 $c_{1}c_{1}c_{2}c_{2}\\cdots c_{k}c_{k}$ 配对（$k\\ge1$）；中心扇形三角剖分：顶点 $2$、边 $k$（配对边界边）$+2k$（辐条）$=3k$、面 $2k$，故 $\\chi=2-3k+2k=2-k$。$k=1$ 给 $\\chi(\\mathbb{RP}^{2})=1$；$k=2$ 给 $\\chi(\\text{克莱因瓶})=0$。',
        '**二、同调为什么是 $k$ 而不是 $2k$**：不可定向闭曲面的 $H_{1}$ 有挠部，$H_{1}(S;\\mathbb{Z})\\cong\\mathbb{Z}^{k-1}\\oplus\\mathbb{Z}/2$，故 $\\operatorname{rank}H_{1}=k-1$；又 $H_{2}(S;\\mathbb{Z})=0$（不可定向紧曲面没有整体基本类）。代入 $\\chi=\\sum_{i}(-1)^{i}\\beta_{i}$ 得 $1-(k-1)+0=2-k$，与组合计数一致。⚠ 这两条同调事实（$H_{1}$ 结构、$H_{2}=0$）本图没有节点，只在此以定理形式引用。',
        '**标准形上的 $H_{1}$ 推导（完整）**：用 van Kampen（`thm.van-kampen`）对 $2k$ 边形的一个顶点取开覆盖，得 $\\pi_{1}=\\langle c_{1},\\ldots,c_{k}\\mid c_{1}^{2}\\cdots c_{k}^{2}=1\\rangle$；交换化后 $H_{1}\\cong\\mathbb{Z}^{k}/(2(c_{1}+\\cdots+c_{k}))\\cong\\mathbb{Z}^{k-1}\\oplus\\mathbb{Z}/2$。这一步只处理标准形，桥到一般曲面仍靠分类定理。',
        '**三、连通和公式**：$\\chi(M\\#N)=\\chi(M)+\\chi(N)-2$（证明见 `prop.eulerchar-genus` 的注）。由 $\\chi(\\mathbb{RP}^{2})=1$ 归纳得 $k$ 个射影平面的连通和 $\\chi=2-k$。',
        '**四、缺口**：上述只对标准形成立。任意闭不可定向曲面要先用分类定理归到标准形，$H_{1}$ 结构与 $H_{2}=0$ 也要在一般曲面上证；本图这两块都空缺，故不删 status、不勾 ∎。',
        '⚠ **「亏格」这个词在不可定向侧不能照搬**：`def.genus` 只对可定向定义（除以 $2$ 依赖 $H_{1}$ 自由秩为偶数）。不可定向侧的标准量是 $k$，关系是 $\\chi=2-k$。',
        '⭐ 读数：$\\mathbb{RP}^{2}$ 的 $k=1$、$\\chi=1$；克莱因瓶的 $k=2$、$\\chi=0$；三个射影平面的连通和 $k=3$、$\\chi=-1$。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Massey, A Basic Course in Algebraic Topology, Ch. 1'],
    },

    /* ---------------------------------------------------------- 四个标准例子 */
    {
      id: 'ex.sphere',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '球面 S²',
      title: '球面 $S^{2}$：闭曲面，亏格 0，$\\chi = 2$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '$$S^{2} := \\{\\, x \\in \\mathbb{R}^{3} : \\lVert x \\rVert = 1 \\,\\}$$',
        '',
        '配子空间拓扑，是一个**闭曲面**（`def.closed-surface`）。它的亏格 $g = 0$，' +
          'Euler 示性数 $\\chi(S^{2}) = 2$。',
      ].join('\n'),
      notes: [
        '⭐ **它是分类定理里的第一个标准形**，也是连通和的单位元：$S^{2} \\# M \\cong M$（`def.connected-sum` 的注）。',
        '⭐ **两种图卡覆盖**：球极投影给出两张图卡（去掉北极 / 去掉南极），转移映射是 $x \\mapsto x/\\lVert x\\rVert^{2}$ 那一类 ——' +
          '这直接说明 $S^{2}$ 是 2 维拓扑流形，而且光滑。',
        '⚠ **$S^{2}$ 与 $\\mathbb{R}^{2}$ 不同胚**（一个是紧的、一个不是），尽管去掉一点之后同胚。' +
          '这也是「紧」这个条件在闭曲面定义里非有不可的原因之一。',
        '📌 $H_{0} = \\mathbb{Z}$、$H_{1} = 0$、$H_{2} = \\mathbb{Z}$，所以 $\\chi = 1 - 0 + 1 = 2$ —— 与 $2 - 2g$ 一致。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12'],
    },

    {
      id: 'ex.torus',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '环面 T²',
      title: '环面 $T^{2} = S^{1} \\times S^{1}$：亏格 1，$\\chi = 0$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '$$T^{2} := S^{1} \\times S^{1} ,$$',
        '',
        '（乘积拓扑）是一个**闭可定向曲面**，亏格 $g = 1$，Euler 示性数 $\\chi(T^{2}) = 0$。',
      ].join('\n'),
      notes: [
        '⭐ **三种等价的描述**：① $S^{1} \\times S^{1}$；② 正方形对边粘合（$[0,1]^{2}$ 按 $(0,t)\\sim(1,t)$、' +
          '$(s,0)\\sim(s,1)$ 取商）；③ $\\mathbb{R}^{2}/\\mathbb{Z}^{2}$。第三种最方便算：' +
          '它就是「平面模整数平移」，基本群是 $\\mathbb{Z}^{2}$。',
        '⭐ **$\\chi = 0$ 的算法**：正方形粘合成的复形有 $V = 1$、$E = 2$、$F = 1$，' +
          '故 $\\chi = 1 - 2 + 1 = 0$，与 $2 - 2g = 0$ 一致。',
        '⭐ **它是「咖啡杯 = 甜甜圈」那句话的主角**：两者都同胚于 $T^{2}$（杯子有一个洞、' +
          '甜甜圈有一个洞），所以拓扑上不可区分 —— 与它们嵌在 $\\mathbb{R}^{3}$ 里的**几何形状**无关' +
          '（那是 $\\mathbb{R}^{3}$ 里参数化曲面那一侧 那一侧的事）。',
        '⚠ **$T^{2}$ 不能嵌入 $\\mathbb{R}^{2}$**：它是紧的、无边界、2 维，' +
          '若嵌进平面就得是平面里的紧开集 —— 只有空集。所以「画在纸上」的环面只是它的**投影**。',
        '📌 $H_{0} = \\mathbb{Z}$、$H_{1} = \\mathbb{Z}^{2}$、$H_{2} = \\mathbb{Z}$，' +
          '$\\chi = 1 - 2 + 1 = 0$；注意 $H_{1}$ 的秩是 **2**，而亏格是 **1**（`def.genus` 里那个「除以 2」的来处）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, Ch. 1'],
    },

    {
      id: 'ex.projective-plane',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '射影平面 RP²',
      title: '射影平面 $\\mathbb{RP}^{2}$：闭不可定向曲面，$k = 1$，$\\chi = 1$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '$$\\mathbb{RP}^{2} := S^{2} \\big/ (x \\sim -x) ,$$',
        '',
        '（对径粘合的商拓扑）是一个**闭不可定向曲面**，不可定向亏格 $k = 1$，' +
          'Euler 示性数 $\\chi(\\mathbb{RP}^{2}) = 1$。',
      ].join('\n'),
      notes: [
        '⭐ **三个等价描述**：① 球面按对径点粘合；② 圆盘把边界上的对径点粘合；' +
          '③ 正方形对边**反向**粘合（$T^{2}$ 是「同向」粘合，差别就在这个反向上）。',
        '⭐ **$\\chi = 1$ 的算法**：从圆盘出发（$\\chi = 1$），把边界对径粘起来相当于粘一条「半扭转的带子」，' +
          '它把边界吃掉了，$V$ 从一整圈变成 1 个点、$E$ 变成 1 条闭曲线，于是 $\\chi = 1 - 1 + 1 = 1$，' +
          '与 $2 - k = 1$ 一致。',
        '⭐ **不可定向的直观理由**：在 $\\mathbb{RP}^{2}$ 上沿一条直线走一圈回来，' +
          '「正面」会变成「反面」—— 它就是**莫比乌斯带的「盖子」**：' +
          '把莫比乌斯带的边界（一条圆）粘上一个圆盘，得到 $\\mathbb{RP}^{2}$。',
        '⚠ **$\\mathbb{RP}^{2}$ 不能嵌入 $\\mathbb{R}^{3}$**（紧无边的不可定向闭曲面都嵌不进 $\\mathbb{R}^{3}$；' +
          '要嵌得跳到 $\\mathbb{R}^{4}$）。所以「画不出来」不是画技问题，是拓扑事实 —— ' +
          '常见的「交叉帽」图是它的**浸入**，不是嵌入。',
        '📌 $H_{1}(\\mathbb{RP}^{2};\\mathbb{Z}) \\cong \\mathbb{Z}/2$（纯挠，自由秩 0），' +
          '$H_{2} = 0$，故 $\\chi = 1 - 0 + 0 = 1$。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, Ch. 2.2'],
    },

    {
      id: 'ex.klein-bottle',
      cluster: 'topology.surfaces',
      type: 'example',
      label: '克莱因瓶',
      title: '克莱因瓶：闭不可定向曲面，$k = 2$，$\\chi = 0$',
      regions: ['topology'],
      tags: ['例', '拓扑', '曲面'],
      statement: [
        '克莱因瓶 $K$ 是 $\\mathbb{RP}^{2} \\# \\mathbb{RP}^{2}$（两个射影平面的连通和），' +
          '也是「正方形对边按一同一反粘合」得到的商空间。它是一个**闭不可定向曲面**，' +
          '不可定向亏格 $k = 2$，$\\chi(K) = 0$。',
      ].join('\n'),
      notes: [
        '⭐ **两种等价描述**：① 正方形：一对对边**同向**粘（像 $T^{2}$）、另一对**反向**粘；' +
          '② 两个莫比乌斯带沿边界粘起来。两种说法给出同一个曲面（本图只记结论，不证）。',
        '⭐ **$\\chi = 0$**：$2 - k = 2 - 2 = 0$。注意这与**环面**相同 ——' +
          '所以「$\\chi = 0$」这条信息本身不足以认出克莱因瓶，还得看可定向性。' +
          '这两个曲面是「同一张 $\\chi$、两种拓扑型」的典型例子。',
        '⚠ **仍然嵌不进 $\\mathbb{R}^{3}$**：任何紧无边的不可定向闭曲面都嵌不进 $\\mathbb{R}^{3}$。' +
          '那个著名的「瓶脖子穿过瓶身」的玻璃模型是一个**浸入**（自交的像），不是嵌入。',
        '📌 $H_{1}(K;\\mathbb{Z}) \\cong \\mathbb{Z} \\oplus \\mathbb{Z}/2$，$H_{2} = 0$，' +
          '故 $\\chi = 1 - 1 + 0 = 0$。',
        '⚠ 克莱因瓶 = 两个**莫比乌斯带**沿边界粘起来（`def.mobius-band`）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12'],
    },
  ],

  edges: [
    /* -------- 两条判据式的前提 -------- */
    {
      id: 'dep.classification-eulerchargenus',
      kind: 'definition',
      definition: 'thm.classification-surfaces',
      usedBy: 'prop.eulerchar-genus',
      note: '「闭可定向曲面就是 $g$ 个环面的连通和」是分类定理给的标准形 —— 命题的**证明**用它，' +
        '虽然结论 $\\chi = 2 - 2g$ 也能纯同调算出来（见注）。',
    },
    {
      id: 'dep.eulerchar-eulerchargenus',
      kind: 'definition',
      definition: 'thm.euler-characteristic',
      usedBy: 'prop.eulerchar-genus',
      note: '$\\chi$ 的两种算法（数单纯形 / 数 Betti 数）相等，正是这条定理的内容。',
    },
    {
      id: 'dep.genus-eulerchargenus',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'prop.eulerchar-genus',
      note: '命题说的就是「$\\chi$ 与 $g$ 互相决定」，$g$ 的定义必须在这里。',
    },
    {
      id: 'dep.classification-eulercharnonor',
      kind: 'definition',
      definition: 'thm.classification-surfaces',
      usedBy: 'prop.eulerchar-nonorientable',
      note: '不可定向标准形（$k$ 个射影平面的连通和）同样来自分类定理。',
    },
    {
      id: 'dep.eulerchar-eulercharnonor',
      kind: 'definition',
      definition: 'thm.euler-characteristic',
      usedBy: 'prop.eulerchar-nonorientable',
      note: '$\\chi$ 的组合算法（$V - E + F$）是这一条的另一半。',
    },
    /* -------- 四个例子都是闭曲面 -------- */
    {
      id: 'dep.closedsurface-sphere',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.sphere',
      note: '球面满足闭曲面的三个条件：紧（$\\mathbb{R}^{3}$ 里的有界闭集）、连通、无边界。',
    },
    {
      id: 'dep.closedsurface-torus',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.torus',
      note: '$S^{1} \\times S^{1}$ 是紧空间的乘积，故紧；连通、无边界同理。',
    },
    {
      id: 'dep.closedsurface-rp2',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.projective-plane',
      note: '紧空间的对径商仍紧（连续像），连通性与无边界继承下来。',
    },
    {
      id: 'dep.connectedsum-klein',
      kind: 'definition',
      definition: 'def.connected-sum',
      usedBy: 'ex.klein-bottle',
      note: '克莱因瓶的定义（$\\mathbb{RP}^{2} \\# \\mathbb{RP}^{2}$）里直接用到连通和。',
    },
    {
      id: 'dep.closedsurface-klein',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'ex.klein-bottle',
      note: '两个闭曲面的连通和仍是闭曲面（紧、连通、无边界都保持）。',
    },
    /* -------- 例子与分类定理：例子里报的就是定理里的标准形 -------- */
    {
      id: 'dep.genus-sphere',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'ex.sphere',
      note: '球面的 $g = 0$ 不是「约定」：$H_{1}(S^{2}) = 0$，所以 $\\tfrac{1}{2}\\operatorname{rank} = 0$。',
    },
    {
      id: 'dep.genus-torus',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'ex.torus',
      note: '环面的 $g = 1$：$H_{1} \\cong \\mathbb{Z}^{2}$，秩 2，除以 2 得 1。',
    },
    {
      id: 'dep.eulerchargenus-torus',
      kind: 'definition',
      definition: 'prop.eulerchar-genus',
      usedBy: 'ex.torus',
      note: '例子里「$\\chi = 0$」这个值由这条命题（$2 - 2g$）算出，不是另算的。',
    },
    {
      id: 'dep.eulercharnonor-rp2',
      kind: 'definition',
      definition: 'prop.eulerchar-nonorientable',
      usedBy: 'ex.projective-plane',
      note: '「$k = 1$、$\\chi = 1$」由不可定向那条判据（$2 - k$）读出。',
    },
    {
      id: 'dep.eulercharnonor-klein',
      kind: 'definition',
      definition: 'prop.eulerchar-nonorientable',
      usedBy: 'ex.klein-bottle',
      note: '「$k = 2$、$\\chi = 0$」同上。',
    },
  ],
});
