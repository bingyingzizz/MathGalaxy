/* ============================================================================
   内容包 · 曲面地形 第三刀（2026-11-03）：把分类线补齐
   ----------------------------------------------------------------------------
   第二刀立了闭曲面与分类定理，但那条线还缺两样东西（当时在注里就写明「不是节点」）：
     ① 两条判据式：$\\chi = 2 - 2g$（可定向）与 $\\chi = 2 - k$（不可定向）——
        分类定理的「不变量」那一步靠它们，缺了就成了「结论有了、算法没有」；
     ② 例子层：球面 / 环面 / 射影平面 / 克莱因瓶 —— E4 点名缺的四个，
        分类定理的三种标准形在图上连个指得着的对象都没有。

   ⚠️ 两条命题的证明都标 `status: 'skeleton'`：走的是「给标准形一个具体的剖分，
      数 $V - E + F$」，其中「g 个环面的连通和的剖分」在 $g$ 大时要写清粘接簿记 ——
      本图只给到方案，没有逐格列出。
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
        '⭐ **两种算法给出同一个数**（这正是 `thm.euler-characteristic` 的内容：' +
          '「数单纯形」与「数 Betti 数」一致）：',
        '- **组合侧**：$\\chi = V - E + F$，给 $S$ 一个三角剖分去数；',
        '- **同调侧**：$\\chi = \\sum_{i}(-1)^{i}\\operatorname{rank} H_{i} = 1 - 2g + 1 = 2 - 2g$' +
          '（$H_{0} \\cong \\mathbb{Z}$、$H_{1} \\cong \\mathbb{Z}^{2g}$、$H_{2} \\cong \\mathbb{Z}$）。',
        '同调那一行是**一行算完**的 —— 这也是为什么亏格要用同调定义（`def.genus` 的注里写了原因：避开分类定理）。',
        '⚠ **组合侧的骨架**：从「一个环面的剖分」（$V = 9$、$E = 27$、$F = 18$，故 $\\chi = 0$）出发，' +
          '每做一次连通和挖一个球、沿边界粘一个洞，$\\chi$ 就减 2（球面 $\\chi = 2$ $\\to$ 环面 $0$ $\\to$ 双环面 $-2$）。' +
          '**为什么不逐格写 $g$ 个环面的剖分**：粘接处的顶点/边/面簿记在 $g$ 大时很啰嗦，本图没有展开。',
        '⭐ 三个直接读数：球面 $g = 0$、$\\chi = 2$；环面 $g = 1$、$\\chi = 0$；' +
          '双环面 $g = 2$、$\\chi = -2$。',
        '📌 与几何的接口：Gauss–Bonnet 定理 说 $\\int_{M} K\\,\\mathrm{d}A = 2\\pi\\chi(M)$。' +
          '把它和本条合起来就是「$\\int K = 4\\pi(1 - g)$」——**曲率的总量只由亏格决定**，' +
          '这是「拓扑控制几何」最干净的一个例子。',
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
        '⭐ **和可定向侧对照着记**：可定向是 $\\chi = 2 - 2g$（斜率 $-2$），不可定向是 $\\chi = 2 - k$（斜率 $-1$）。' +
          '所以「同一个 $\\chi$ 值」在两族里对应不同的曲面 —— 比如 $\\chi = 0$ 既是环面（$g=1$）' +
          '也是克莱因瓶（$k=2$）；**光看 $\\chi$ 分不出它们**，还要加可定向性。',
        '⭐ **同调侧为什么是 $k$ 而不是 $2k$**：不可定向曲面的 $H_{1}$ 有挠部，',
        '',
        '$$H_{1}(S;\\mathbb{Z}) \\cong \\mathbb{Z}^{k-1} \\oplus \\mathbb{Z}/2 ,$$',
        '',
        '自由秩是 $k - 1$（不是 $2g$ 那种「两个一组」），而 $\\chi = 1 - (k-1) + 1 - 1 = 2 - k$' +
          '（末项 $-1$ 来自 $H_{2} = 0$：不可定向紧曲面不能像可定向那样有一个「整体基本类」）。',
        '⚠ **所以「亏格」这个词在不可定向侧不能照搬**：`def.genus` 只对可定向定义（除以 2 那个说法' +
          '依赖 $H_{1}$ 自由秩为偶数）。不可定向侧的标准量是 $k$，关系是 $\\chi = 2 - k$。',
        '⭐ 读数：$\\mathbb{RP}^{2}$：$k = 1$、$\\chi = 1$；克莱因瓶：$k = 2$、$\\chi = 0$；' +
          '三个射影平面的连通和：$k = 3$、$\\chi = -1$。',
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
        '⚠ 本图没有「莫比乌斯带」节点（E4 缺口），所以上面「两个莫比乌斯带粘起来」只作说明，没有连线。',
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
