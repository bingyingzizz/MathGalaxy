/* ============================================================================
   内容包 · 曲面地形 第二刀（2026-11-03，T18 / 审计 B2）
   ----------------------------------------------------------------------------
   第一刀补了连通和与亏格。这一刀补**分类定理要说的那个对象**：
     · `def.topological-manifold` —— 拓扑流形（没有光滑结构的流形）
     · `def.closed-surface`      —— 闭曲面（紧、连通、无边界、2 维拓扑流形）
     · `thm.classification-surfaces` —— 闭曲面分类定理（陈述 + 骨架；组合归类部分单列为 `lem.combinatorial-classification-surfaces`）
   之前这三种「曲面」在图里互不相等，而分类定理的主角**根本不存在**：
     `def.regular-surface` / `def.orientable-surface` 是 $\mathbb{R}^{3}$ 里的参数化曲面（外在）；
     `def.riemann-surface` 是一维复流形；`def.smooth-manifold` 带图册与光滑转移 —— 都不是它。

   ⚠️ **通名归位**（审计 §10 第②刀）：`def.orientable-surface` 是「$\mathbb{R}^{3}$ 里被参数化覆盖的
      可定向曲面」，通名「可定向曲面」应当让给拓扑侧。这里把它改名成
      「$\mathbb{R}^{3}$ 中的可定向曲面」，两者之间**只连类比边**（外在 vs 内蕴，不是同一件事）。
   ⚠️ 分类定理**只给骨架**：Radó 的「曲面可三角剖分」是**外部输入**（现在自成一个骨架节点 `thm.rado`，但本图不证它），
      所以 `status: 'skeleton'`，并在注里明说哪一步是本图没证的。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '曲面地形（二）：拓扑流形、闭曲面与分类定理',

  nodes: [
    {
      id: 'def.topological-manifold',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '拓扑流形',
      title: '拓扑流形（$n$ 维，不假设光滑结构）',
      regions: ['topology', 'diffgeom'],
      tags: ['定义', '拓扑', '流形'],
      statement: [
        '设 $n \\ge 0$。一个**拓扑空间** $M$ 叫 **$n$ 维拓扑流形**，如果',
        '',
        '- $M$ 是 **Hausdorff** 的；',
        '- $M$ 是**第二可数**的；',
        '- 每一点 $p \\in M$ 都有开邻域 $U$ 与一个**同胚** $\\varphi : U \\to V$，其中 $V \\subseteq \\mathbb{R}^{n}$ 是开集。',
        '',
        '这样的 $(U, \\varphi)$ 叫 $M$ 的一张**图卡**，$n$ 叫**维数**。',
      ].join('\n'),
      notes: [
        '⭐ **它比光滑流形弱**：只说「局部像 $\\mathbb{R}^{n}$」，**不要求**两张图卡之间的转移映射光滑。' +
          '所以「光滑流形」（`def.smooth-manifold`）是拓扑流形**加上**一个光滑图册 —— 两者是同一批点集上的不同结构。',
        '⭐ **Hausdorff 与第二可数是分开要的**：局部欧氏只约束「局部」，像「带两个原点的直线」' +
          '这种空间处处局部欧氏却不 Hausdorff；第二可数则排除「不可数多条实直线粘在一起」这种太肥的流形。' +
          '少了它们，许多定理（单位分解、可度量化）会失效。',
        '⚠ **维数良定义**要一条定理（区域不变性 / Brouwer）：同一个连通流形不能既 $n$ 维又 $m$ 维。' +
          '本图没有这条定理的节点，所以这里只记一句。',
        '📌 本图另一条线（`def.smooth-manifold`）是从**图册**出发造流形；这里是从**拓扑空间**出发加条件。' +
          '两条路给出同一批对象（在加上光滑结构之后），但**拓扑流形可以不光滑** —— 4 维以上确实存在' +
          '不可光滑化的拓扑流形（本图不展开）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Lee, Introduction to Topological Manifolds, Ch. 1'],
    },

    {
      id: 'def.closed-surface',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '闭曲面',
      title: '闭曲面（紧、连通、无边界的 2 维拓扑流形）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面'],
      statement: [
        '一个 **2 维拓扑流形** $S$（见 `def.topological-manifold`）叫**闭曲面**，如果',
        '',
        '- $S$ 是**紧**的；',
        '- $S$ 是**连通**的；',
        '- $S$ **没有边界**（每一点都有 $\\mathbb{R}^{2}$ 的开邻域，没有「半平面」型的点）。',
        '',
        '等价地：$S$ 是紧连通、无边界、局部同胚于 $\\mathbb{R}^{2}$ 的 Hausdorff 第二可数空间。',
      ].join('\n'),
      notes: [
        '⭐ **三个条件各有各的作用，缺一条分类定理就得改写**：',
        '- 去掉「连通」$\\implies$ 变成有限多个闭曲面的**不交并**（分类定理逐块用）；',
        '- 去掉「紧」$\\implies$ 出现无穷亏格、有无限多个洞的曲面（分类变得极复杂，本图不涉及）；',
        '- 去掉「无边界」$\\implies$ 得到带边闭曲面，靠「把边界粘上圆盘」回到闭的情形。',
        '⭐ **与另外三种「曲面」的区别**（这是本节点存在的理由）：',
        '`def.regular-surface` / `def.orientable-surface` 是 $\\mathbb{R}^{3}$ 里被参数化覆盖的点集（**外在**，' +
          '还带着度量与曲率）；`def.riemann-surface` 是一维**复**流形；本节点**只有拓扑**，' +
          '没有度量、没有复结构、也不预设嵌在某个欧氏空间里。',
        '⭐ 基本例子：球面 $S^{2}$、环面 $T^{2}$（亏格 1）、射影平面 $\\mathbb{RP}^{2}$（不可定向）、' +
          '克莱因瓶（不可定向）。⚠ 这四个都**已有节点**：`ex.sphere`、`ex.torus`、`ex.projective-plane`、`ex.klein-bottle`。' +
          '',
        '📌 亏格（`def.genus`）目前只对**可定向**闭曲面定义；不可定向那一侧要用另一套（$\\chi = 2 - k$）。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12（Classification of Surfaces）', 'Massey, A Basic Course in Algebraic Topology'],
    },

    {
      id: 'thm.classification-surfaces',
      cluster: 'topology.surfaces',
      type: 'theorem',
      label: '闭曲面分类定理',
      title: '闭曲面分类：每个闭曲面是球面、或若干环面 / 射影平面的连通和',
      regions: ['topology'],
      tags: ['定理', '拓扑', '曲面'],
      status: 'skeleton',
      statement: [
        '设 $S$ 是**闭曲面**（`def.closed-surface`）。则 $S$ 同胚于下列之一，且这些互不同胚：',
        '',
        '- **球面** $S^{2}$；',
        '- $g$ 个**环面**的连通和 $T^{2}\\#\\cdots\\# T^{2}$（$g \\ge 1$），这叫**可定向**闭曲面，亏格 $g$；',
        '- $k$ 个**射影平面**的连通和 $\\mathbb{RP}^{2}\\#\\cdots\\# \\mathbb{RP}^{2}$（$k \\ge 1$），这叫**不可定向**闭曲面，不可定向亏格 $k$。',
        '',
        '并且两族互不重合：可定向与不可定向的闭曲面（除球面外）永不**同胚**。',
      ].join('\n'),
      notes: '⚠ 本节点保持 status: skeleton。三步里第 (1) 步 Radó 与第 (2) 步组合归类都未证，第 (3) 步完整。**注意**：`prop.eulerchar-genus` 已不再依赖本条（它的注改走 Radó + 引理 D 的初等路线），所以本条不阻塞那条命题；反过来，本条也不把 `prop.eulerchar-genus` 当输入。\n\n**三步的结构。** (1) Radó：闭曲面可三角剖分（`thm.rado`，skeleton）。(2) 组合归类：任意三角剖分经有限步操作化成标准形。(3) 标准形上读不变量：可定向性与 $\\chi$ 给出 $(g)$ 或 $(k)$，且互不同胚。\n\n**第 (1) 步（引用，未证）。** Radó 定理：紧曲面存在有限三角剖分。`thm.rado` 仍是 skeleton，本图没有它的证明；这里只把它当输入，并明确它没有把「任意两个剖分组合等价」一起给出——后者正是第 (2) 步要做的事。\n\n**第 (2) 步：陈述与未完成核查（引理 K，本图空白）。** 设 $K$ 是有限单纯复形、$|K|$ 是闭连通曲面。则存在有限序列的操作把 $K$ 化成：单个多边形，其边两两配对，配对词为 $a_{1}b_{1}a_{1}^{-1}b_{1}^{-1}\\cdots a_{g}b_{g}a_{g}^{-1}b_{g}^{-1}$（可定向，$g\\ge 0$）或 $c_{1}c_{1}\\cdots c_{k}c_{k}$（不可定向，$k\\ge 1$）。操作清单是：(i) 沿边剪开再粘（cut-and-paste）；(ii) $2$–$2$ 翻边；(iii) 删除只贴一条边的 $2$-单形；(iv) 顶点归约（把多个顶点并成一个）。**这条引理就是「分类」的核心；本批把它单列为 `lem.combinatorial-classification-surfaces`（仍 skeleton，缺口=顶点归约、2–2 翻边的退化情形、终止性测度）。**\n\n**对第 (2) 步的三项核查（都不完整，这正是缺口）。** - **$2$–$2$ 翻边**：本图只写「一条边两侧的两个三角形换成另两个三角形，顶点集不变」。这只在两张三角形沿一条边粘成一个四边形、且四个顶点互不相同时成立；若两张三角形还共用另一个顶点（四边形退化）、或第四顶点与第一顶点重合（结果是两个三角形而非四边形），必须先单独讨论。本图没有这些前提与退化情形。 - **切-粘**：本图只说「沿闭曲线剪开再粘回」。要在三角剖分内部做，闭曲线须先变成单纯闭曲线（加细 $+$ 一般位置，正规同位），剪开后要说明得到的是新的三角剖分、粘回保持同胚型；这两步本图都没写。 - **终止性**：本图原句「配对边数严格下降」**不成立**：$2$–$2$ 翻边不改边数，切-粘可能增加边数。真正需要的是一个良序测度（例如按多边形边数归纳，Munkres 的证明分有限种情形；或用「边数 $+$ 顶点数」的字典序），并逐操作验证它下降。本图没给测度，也没验证。 - **顶点归约没写构造**：把剖分化成「一个多边形」之前要先把所有顶点并成一个（操作清单里的 (iv)）；这一步本图只列了名字、没写构造，而它正是退化情形最多的一步。\n\n**第 (3) 步（完整）。** 标准形 $4g$ 边形的中心扇形剖分：$V=2$（中心与一个边界顶点类）、$E=6g$、$F=4g$，故 $\\chi=2-2g$；$2k$ 边形：$V=2$、$E=3k$、$F=2k$，故 $\\chi=2-k$。两族互不同胚：可定向性不同（一侧可定向、一侧不可定向）；同族内 $\\chi$ 不同，由 $\\chi$ 的拓扑不变性（`thm.euler-characteristic`）不同胚。注意这里的「标准形」是引理 K 的**结论**，不是定义；不要用「闭曲面按定义就是标准形」循环。\n\n**为什么本条不能像 `prop.eulerchar-genus` 那样绕开。** 那条命题只要 $\\chi=2-2g$，可以用引理 D 直接算 $H_{2}$，不需要分类；本条要的是「任意剖分都能化成标准形」这一**结构定理**，它是分类本身，不能由同调的数值不变量推出。绕过它的代价正是把分类定理当假设。\n\n⭐ 判据（在引理 K 成立的前提下）：两个闭曲面同胚 $\\iff$ 可定向性相同且 $\\chi$ 相同（等价地：同为 $S^{2}$，或同为 $g$ 个环面的连通和且 $g$ 相同，或同为 $k$ 个 $\\mathbb{RP}^{2}$ 的连通和且 $k$ 相同）。$S^{2}$ 与 $\\mathbb{RP}^{2}$ 的 $\\chi$ 都是 $2$ 与 $1$，所以单看 $\\chi$ 不够，必须配可定向性。\n\n**缺口与建议。** 缺口 $=$ Radó（`thm.rado`）$+$ 引理 K（组合归类）。若下一轮要补，建议单独立节点：组合归类引理（含顶点归约与终止性测度）、$2$–$2$ 翻边的退化情形、单纯闭曲线的正规同位。本图现有的 `thm.rado`、`def.triangulation`、`def.simplicial-complex`、`thm.euler-characteristic` 可直接用。',
      refs: [
        'Munkres, Topology, Ch. 12（Classification of Surfaces）',
        'Massey, A Basic Course in Algebraic Topology, Ch. 1',
        'Radó, Über den Begriff der Riemannschen Fläche (1925)——三角剖分存在性',
      ],
    },

    /* ---------------------------------------------------------- 三角剖分 */
    {
      id: 'def.triangulation',
      cluster: 'topology.surfaces',
      type: 'definition',
      label: '三角剖分',
      title: '三角剖分（可剖分空间）',
      regions: ['topology'],
      tags: ['定义', '拓扑', '曲面', '单纯复形'],
      statement: [
        '设 $X$ 是拓扑空间。$X$ 的一个**三角剖分**是一对 $(K, h)$：',
        '',
        '- $K$ 是**单纯复形**（`def.simplicial-complex`），$|K|$ 是它的几何实现；',
        '- $h : |K| \\to X$ 是一个**同胚**。',
        '',
        '若这样的 $(K, h)$ 存在，称 $X$ **可三角剖分**。把每个单形在 $h$ 下的像叫 $X$ 的一个**面**',
        '（顶点 / 边 / 三角形），于是 $X$ 被写成一堆三角形的并，任意两个三角形只沿**整条边**或一个顶点相交。',
      ].join('\n'),
      notes: [
        '⚠️ 三角剖分是「**组合骨架 + 把它放进空间的那个同胚**」两件东西，不是单纯复形本身。',
        '所以「$X$ 可剖分」是拓扑性质，而「$K$ 长什么样」是组合数据 —— 两者必须分开看。',
        '⚠️ 剖分极不唯一：同一个 $S^{2}$ 有无穷多个本质不同的剖分（四面体、八面体、任意细分…）。',
        '所以任何「用剖分定义」的量，都必须先证**与剖分无关** —— $\\chi$ 那条（`thm.euler-characteristic` 加 `thm.simplicial-approximation`）做的就是这件事。',
        '⭐ 单向蕴含：单纯复形自己总是可剖分的（取恒等），但**拓扑空间未必能** —— 这正是下一节要说的。',
        '📌 定义里没要求 $K$ 有限。紧空间上的剖分自动有限；非紧的（比如开曲面）只能用**局部有限**剖分。',
      ].join('\n\n'),
      refs: ['Munkres, Topology, Ch. 12', 'Hatcher, Algebraic Topology, §2.1'],
    },

    /* ---------------------------------------------------------- Radó */
    {
      id: 'thm.rado',
      cluster: 'topology.surfaces',
      type: 'theorem',
      label: 'Radó 定理',
      title: 'Radó 定理：三角剖分存在性（紧曲面可三角剖分）',
      regions: ['topology'],
      tags: ['定理', '拓扑', '曲面', '三角剖分'],
      status: 'skeleton',
      statement: [
        '每个**紧曲面**（紧、连通、$2$ 维拓扑流形，可带边界）都可三角剖分（`def.triangulation`）。',
        '',
        '等价的常用写法：每个紧连通曲面都同胚于某个**有限**单纯复形的几何实现。',
      ].join('\n'),
      notes: '⚠ 本节点保持 status: skeleton。Radó 定理有两条常用路线，本图都没走完；下面把两条路线写到「只差哪些具体引理」的程度，并纠正旧注里两处不准确的表述。\n\n**定理。** 紧曲面可三角剖分（等价地：紧拓扑 $2$-流形有有限单纯剖分）；可定向时还有相容的复结构。等价形式的准确范围见下面的维数对照。\n\n**带边界情形。** 陈述写「可带边界」，但下面两条路线都只处理**闭**曲面 —— 这不是自动的。标准办法是**沿边界加倍**：取两份 $S$，沿 $\\partial S$ 用恒等映射粘起来，得闭曲面 $D(S)$；对 $D(S)$ 用下述任一路线得剖分，再限制回 $S$（前提是剖分取得使 $\\partial S$ 落在 $1$-骨架里，见缺口 (vi)）。也可把每个边界圆盘粘成一点得闭曲面。\n\n**路线 A（复分析）。** 可定向紧曲面 $\\rightarrow$ 复结构（Riemann 面）$\\rightarrow$ 非常数亚纯函数存在 $\\rightarrow$ 亚纯函数是到 $\\mathbb{CP}^{1}$ 的分支覆盖 $\\rightarrow$ 把 $\\mathbb{CP}^{1}$ 上一张剖分拉回并加细（分支值取作顶点；分支点附近局部模型 $z\\mapsto z^{m}$，按扇形细分）$\\rightarrow$ 得有限剖分。缺口：(i) 复结构存在性（单值化定理 / Riemann–Roch 的曲面情形）；(ii) 亚纯函数存在性（Riemann–Roch，或 Runge 逼近 $+$ Mittag-Leffler）；(iii) 分支覆盖拉回的加细与一致性。**注意**：这里的分支覆盖 $z\\mapsto z^{m}$ 与下面不可定向情形用的定向双覆盖是两回事。\n\n**路线 B（微分拓扑）。** 光滑结构存在（Whitehead：$C^{1}$ 结构即够，或直接做 $C^{\\infty}$）$\\rightarrow$ Morse 函数 $\\rightarrow$ 柄分解 $\\rightarrow$ 每个柄是 $0/1/2$-柄，按粘贴顺序给 CW 剖分 $\\rightarrow$ 三角化每个柄并细分到相容 $\\rightarrow$ 得剖分。缺口：(iv) 光滑结构存在性；(v) Morse 函数存在性（需要 $C^{2}$ 逼近）；(vi) 柄分解与三角剖分的相容（$1$-柄的处理、柄与柄之间的粘合）。\n\n**不可定向情形是否走可定向双覆盖？** 方向对，但**不是自动的**。设 $p:\\widetilde{S}\\to S$ 是可定向双覆盖，则 $S$ 上对应一个自由 $\\mathbb{Z}/2$-作用（无不动点，纤维两点）。即使 $\\widetilde{S}$ 已有三角剖分，要把剖分搬到 $S$，需要这个作用**等变地**作用在剖分上：即存在 $\\widetilde{S}$ 的三角剖分使对合是单纯自同构。这由等变三角剖分引理给出——重心重分两次即可：第一次让对合把单形映到单形，第二次让重心落在单形内部而成为顶点，此时对合在重心重分上是单纯的（更一般的定理见 Illman）。商复形 $\\widetilde{S}/(\\mathbb{Z}/2)$ 才是 $S$ 的三角剖分：商映射在每个开单形上是双射，粘合由单纯自同构给出。旧注写「分支点处用局部模型 $z\\mapsto z^{2}$」——**这是错的**：定向双覆盖无分支点（作用自由），$z\\mapsto z^{2}$ 是路线 A 里亚纯函数分支覆盖的局部模型，两者不能混用；混用会让人误以为取商是显然的。\n\n**为什么只到维数 2。** $\\dim\\le 2$：Radó（1925）。$\\dim=3$：Moise（1952）。$\\dim=4$：Freedman（1982，拓扑流形可三角剖分；同一维数的光滑/PL 情形有 $E_{8}$ 反例）。$\\dim\\ge 5$：Kirby–Siebenmann（1969）——存在不可三角化的紧拓扑流形。所以「紧流形都可三角剖分」只在小维数成立，本条不是一般定理的推论。\n\n**两个易混。** (a) Radó 的「三角剖分存在」不等于「任意两个剖分都组合等价」——后者是 Hauptvermutung（$\\dim\\ge 4$ 假，$\\dim=2$ 真），正是 `thm.classification-surfaces` 第 (2) 步要做的事。(b) 复结构与光滑结构的存在性在 $\\dim=2$ 等价（单值化），在 $\\dim\\ge 4$ 不等价。\n\n**缺口清单。** (i) 复结构存在性（单值化定理 / Riemann–Roch）；(ii) 亚纯函数存在性；(iii) 分支覆盖拉回的加细；(iv) 自由对合的等变三角剖分引理；(v) 光滑结构存在性 $+$ Morse $+$ 柄分解（路线 B）；(vi) 带边界情形：沿边界加倍得闭曲面，且剖分可取得让边界落在 $1$-骨架里（加倍对合的等变性）。本图没有这些节点；本条因此保持 skeleton。若下一轮补，建议先立两个节点：「等变三角剖分（重心重分两次）」——它可顺带救活不可定向情形；「单值化定理」——它是路线 A 的总闸。',
      refs: [
        'Radó, Über den Begriff der Riemannschen Fläche (1925)',
        'Moise, Affine structures in 3-manifolds (1952)',
        'Freedman, The topology of four-dimensional manifolds (1982)',
        'Munkres, Topology, Ch. 12',
      ],
    },
    {
      id: 'lem.combinatorial-classification-surfaces',
      cluster: 'topology.surfaces',
      type: 'lemma',
      label: '曲面的组合分类引理',
      title: '组合分类引理：三角剖分闭曲面可化为标准多边形',
      regions: ['topology'],
      tags: ['拓扑', '曲面', '三角剖分', '组合拓扑'],
      status: 'skeleton',
      statement: [
        '设 $K$ 是有限的连通三角剖分闭曲面。则存在有限步「组合操作」，把 $K$ 化成下列标准形之一：',
        '',
        '• 可定向：$4g$ 边形，边界词 $a_{1}b_{1}a_{1}^{-1}b_{1}^{-1}\\cdots a_{g}b_{g}a_{g}^{-1}b_{g}^{-1}$（$g\\ge0$）；',
        '',
        '• 不可定向：$2k$ 边形，边界词 $c_{1}c_{1}\\cdots c_{k}c_{k}$（$k\\ge1$）。',
        '',
        '操作包括：沿一条边剪开再粘（切-粘）、$2$–$2$ 翻边、删除单边三角形、顶点归约。标准形由（可定向性，$\\chi$）唯一确定。',
      ].join('\n\n'),
      notes: [
        '⚠️ **本节点仍标 skeleton**：第 1、5 步在本注中写全；第 2–4 步（顶点归约、$2$–$2$ 翻边的退化情形、终止性测度）只给出可核的路线与反例，尚未逐字证明。它是 `thm.classification-surfaces` 第二步的精确缺口。',
        '',
        '**第 1 步（完整：剪成单个多边形）**：取 $K$ 的对偶图 $K^{*}$（顶点=面，边=共边）。取 $K^{*}$ 的一棵生成树 $T$；对每条不在 $T$ 中的对偶边，把对应的棱剪开。结果是单个多边形：$T$ 的边不被剪，剩下 $E-V+1$ 条棱被剪成两两配对的 $2\\times(E-V+1)$ 条边界边。多边形边界词记录这些配对。',
        '',
        '**第 2 步（顶点归约，缺口）**：若边界词中有 $\\ge2$ 个顶点类，要找一条连接两个不同顶点类的边 $e$，沿 $e$ 剪开并把两侧端点交错粘合，使顶点数减少 $1$。需要先证这样的边存在（Munkres 的引理：若每条边两端都在同一顶点类，则……），再验证粘后仍是三角剖分、亏格/可定向性不变。本图未写。',
        '',
        '**第 3 步（$2$–$2$ 翻边与切-粘，缺口）**：把配对逐个化成标准形式。$2$–$2$ 翻边：两个三角形沿一条边粘成四边形 $abcd$ 时，沿对角线 $ac$ 重新粘成 $abdc$；它能把「分离的配对」$(a\\cdots a)(b\\cdots b)$ 变成相邻的 $(a\\cdots b\\cdots a\\cdots b)$。成立前提是四个顶点互异；若第四顶点与第一顶点重合（退化情形），需单独处理或改用切-粘。切-粘要求先把闭曲线变成单纯闭曲线（加细 + 一般位置），并验证剪/粘后仍同胚。本图都未写。',
        '',
        '**第 4 步（终止性，缺口）**：不能以「配对边数」为测度：$2$–$2$ 翻边不改边数，切-粘还可能增加边数。需要一个在操作下严格下降的良序测度（例如 (顶点数, 某类坏配对数, 总边数) 的字典序），并逐操作验证；本图未给出。',
        '',
        '**第 5 步（完整：唯一性）**：可定向性与 $\\chi$ 都是同胚不变量。标准形的 $\\chi$ 为 $2-2g$（可定向）或 $2-k$（不可定向）；因此 $(\\text{可定向性},\\chi)$ 决定 $g$ 或 $k$。两个不同 $g$（或不同 $k$）的标准形 $\\chi$ 不同，故不同胚；同一 $(\\text{可定向性},\\chi)$ 的标准形当然同胚。这一步与 `thm.classification-surfaces` 第 (3) 步一致。',
        '',
        '**缺口汇总**：第 2 步（顶点归约的存在性与效果）、第 3 步（$2$–$2$ 翻边的退化情形、切-粘的单纯化前提）、第 4 步（终止性测度）。这三块合起来正是 Munkres《Topology》第 12 章的组合证明主体；本图把它单列成一个节点，供 `thm.classification-surfaces` 引用。',
        '',
        '📌 **与 `thm.rado` 的分工**：Radó 负责「任意紧曲面可三角剖分」，本引理负责「已有三角剖分可化为标准形」；两者合起来才是「每个闭曲面同胚于标准形」。',
      ].join('\n\n'),
      refs: [
        'Munkres, Topology (2nd ed.), Prentice Hall 2000, Ch. 12',
        'Massey, A Basic Course in Algebraic Topology, Springer 1991, Ch. 1',
        'Stillwell, Classical Topology and Combinatorial Group Theory, Springer 1993, Ch. 6',
      ],
    },
  ],

  edges: [
    /* -------- 三角剖分：它的两块原料 -------- */
    /* -------- 2026-11-04 clustercheck 抓出来的漏接（三角刨分 / Radó） -------- */
    {
      id: 'dep.topology-triangulation',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.triangulation',
      note: '三角刨分的定义域是**拓扑空间**（同胚是有拓扑才能谈的）。' +
        '之前这条没接，所以「拓扑空间」在三角刨分那里只是个词。',
    },
    {
      id: 'dep.triangulation-eulerchar',
      kind: 'definition',
      definition: 'def.triangulation',
      usedBy: 'prop.eulerchar-genus',
      note: '“chi 与刨分无关”这条命题本身就**得先有刨分**（chi 是用刨分算出来的），' +
        '而且它做的正是三角刨分那条注里说的「用刨分定义的量先证与刨分无关」。',
    },
    {
      id: 'dep.topmanifold-rado',
      kind: 'definition',
      definition: 'def.topological-manifold',
      usedBy: 'thm.rado',
      note: 'Radó 的主角是「紧曲面」= 2 维拓扑流形 + 紧（可带边界），所以它直接用拓扑流形这条定义。',
    },
    {
      id: 'dep.simpcomp-triangulation',
      kind: 'definition',
      definition: 'def.simplicial-complex',
      usedBy: 'def.triangulation',
      note: '三角剖分的骨架就是单纯复形；$|K|$ 是它的几何实现。',
    },
    {
      id: 'dep.topmanifold-triangulation',
      kind: 'definition',
      definition: 'def.topological-manifold',
      usedBy: 'def.triangulation',
      note: '被剖分的对象是拓扑空间（实际上就是曲面）：剖分只用到拓扑，不用光滑结构。',
    },
    {
      id: 'dep.triangulation-rado',
      kind: 'definition',
      definition: 'def.triangulation',
      usedBy: 'thm.rado',
      note: 'Radó 定理的结论就是「这种 $(K,h)$ 存在」。',
    },
    {
      id: 'dep.compact-rado',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'thm.rado',
      note: '「紧」是 Radó 的必要假设（开曲面也能剖分，但要局部有限的 $K$，证明也不同）。',
    },
    {
      id: 'dep.rado-classification',
      kind: 'implication',
      sources: ['thm.rado'],
      target: 'thm.classification-surfaces',
      proof: 'Radó 定理给出曲面 $S$ 的三角剖分 $K$；分类定理的证明正是在 $K$ 的有限多边形的组合层面做「删三角形、翻边、收拢」三步化简，故以 Radó 为第一步前提。∎',
      note: '分类定理的**第一步**就是它：先有剖分，才能在组合层面做「删三角形 / 翻边」的化简。',
    },
    {
      id: 'dep.triangulation-simphomology',
      kind: 'definition',
      definition: 'def.triangulation',
      usedBy: 'thm.simplicial-approximation',
      note: '「奇异同调 $=$ 单纯同调」这条**默默假设了**曲面可剖分（要拿剖分算单纯同调）。以前这个假设在图上是隐形的。',
    },
    /* -------- 拓扑流形的原料 -------- */
    {
      id: 'dep.topology-topmanifold',
      kind: 'definition',
      definition: 'def.topology',
      usedBy: 'def.topological-manifold',
      note: '拓扑流形是**拓扑空间**加条件（Hausdorff / 第二可数 / 局部欧氏），先要有拓扑空间。',
    },
    {
      id: 'dep.homeomorphism-topmanifold',
      kind: 'definition',
      definition: 'def.homeomorphism',
      usedBy: 'def.topological-manifold',
      note: '「局部像 $\\mathbb{R}^{n}$」里的「像」是**同胚** —— 这一步只有拓扑，没有微分。',
    },
    {
      id: 'dep.hausdorff-topmanifold',
      kind: 'definition',
      definition: 'def.hausdorff',
      usedBy: 'def.topological-manifold',
      note: 'Hausdorff 是定义的一部分（排除「带两个原点的直线」那类局部欧氏但不 Hausdorff 的空间）。',
    },
    {
      id: 'dep.secondcountable-topmanifold',
      kind: 'definition',
      definition: 'def.second-countable',
      usedBy: 'def.topological-manifold',
      note: '第二可数同样是定义的一部分（排除「不可数多条实直线」这种太肥的流形）。',
    },
    /* -------- 闭曲面 = 2 维 + 紧 + 连通 + 无边界 -------- */
    {
      id: 'dep.topmanifold-closedsurface',
      kind: 'definition',
      definition: 'def.topological-manifold',
      usedBy: 'def.closed-surface',
      note: '闭曲面是**2 维**拓扑流形再加三个条件。',
    },
    {
      id: 'dep.compact-closedsurface',
      kind: 'definition',
      definition: 'def.compact',
      usedBy: 'def.closed-surface',
      note: '「闭」的第一个意思是**紧**（另一个是「无边界」）。',
    },
    /* -------- 分类定理用到的东西 -------- */
    {
      id: 'dep.closedsurface-classification',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'thm.classification-surfaces',
      note: '定理的主语就是闭曲面。',
    },
    {
      id: 'dep.connectedsum-classification',
      kind: 'definition',
      definition: 'def.connected-sum',
      usedBy: 'thm.classification-surfaces',
      note: '结论的两种标准形都是**连通和**（环面的、射影平面的）。',
    },
    {
      id: 'dep.genus-classification',
      kind: 'definition',
      definition: 'def.genus',
      usedBy: 'thm.classification-surfaces',
      note: '可定向侧的分类量就是亏格 $g$；「不同胚」靠 $g$（等价地 $\\chi$）分辨。',
    },
    {
      id: 'dep.eulerchar-classification',
      kind: 'implication',
      sources: ['thm.euler-characteristic'],
      target: 'thm.classification-surfaces',
      title: '标准形上用 $\\chi$ 区分曲面',
      proof: '分类定理第三步在标准形上读不变量：可定向性与 $\\chi$。要断言「$\\chi$ 不同则不同胚」，必须先知道 $\\chi$ 是同胚不变量 —— `thm.euler-characteristic` 给出 $\\chi(K)=\\sum_{p}(-1)^{p}\\alpha_{p}=\\sum_{p}(-1)^{p}\\beta_{p}$，右端只依赖同调型，于是同伦等价（从而同胚）保持 $\\chi$。同一等式还让「由三角剖分数出的 $\\chi$」与「由 Betti 数算出的 $\\chi$」对接，标准形与任意剖分才可比较。∎',
      note: '不同胚性用 $\\chi$ 作不变量（$\\chi$ 在同胚下不变）。这条用**定理**当原理：`thm.euler-characteristic` 说「数单纯形 = 数 Betti 数」，正好给出 $\\chi$ 的组合与同调两种算法。',
    },
    /* -------- 通名归位后的那条类比：外在 vs 内蕴 -------- */
    {
      kind: 'analogy',
      a: 'def.closed-surface',
      b: 'def.orientable-surface',
      title: '两种「可定向曲面」：内在的拓扑 vs 嵌在 $\\mathbb{R}^{3}$ 里的',
      note: [
        '`def.orientable-surface` 说的是：$\\mathbb{R}^{3}$ 里被参数化覆盖的点集，能不能**连续地选一侧法向**' +
          '（外加一个外法向，才有了面积元与 Gauss 映射）。那是**外在**的说法，用到了嵌入与度量。',
        '本节点说的是**内在**拓扑条件：紧、连通、无边界、局部欧氏 —— 完全没有「嵌在哪里」。',
        '⚠ 两者**不是同一件事**：一个闭曲面可以嵌进 $\\mathbb{R}^{3}$，也可以不嵌（抽象地存在）；' +
          '而「外在可定向」在嵌入下才谈得上。所以这里只连类比，⛔ 不连 implication/definition。',
        '📌 桥梁是嵌入定理（每个闭可定向曲面都能嵌入 $\\mathbb{R}^{3}$）与 Gauss–Bonnet（$\\int K = 2\\pi\\chi$），' +
          '本图都没有写成节点。',
      ].join('\n\n'),
    },
    {
      id: 'dep.comb-triangulation',
      kind: 'definition',
      definition: 'def.triangulation',
      usedBy: 'lem.combinatorial-classification-surfaces',
      note: '组合分类的操作对象是有限的连通三角剖分闭曲面，直接用三角剖分的定义。',
    },

    {
      id: 'dep.comb-closed',
      kind: 'definition',
      definition: 'def.closed-surface',
      usedBy: 'lem.combinatorial-classification-surfaces',
      note: '「闭曲面」给紧、连通、无边界；本引理只处理这类曲面。',
    },

    {
      id: 'dep.comb-classification',
      kind: 'implication',
      sources: ['lem.combinatorial-classification-surfaces'],
      target: 'thm.classification-surfaces',
      title: '分类定理第二步由组合归类引理承载',
      proof: '分类定理分三步：(1) Radó 三角剖分；(2) 任意三角剖分经有限步操作化成标准形；(3) 标准形上读不变量。第二步的精确陈述、允许的操作清单与不变量保持性都放在 `lem.combinatorial-classification-surfaces` 里，定理的证明在此直接引用，不重复组合论证。该引理本身仍标 skeleton（缺口是归约操作的有限性与不变量保持），所以这条边记录的是「定理依赖引理」，不是「引理已证完」。∎',
      note: '分类定理第二步（组合归类）的精确陈述与证明缺口现在由本节点承载；分类定理的证明引用它，而不是把整段组合论证塞进注里。',
    },
  ],
});
