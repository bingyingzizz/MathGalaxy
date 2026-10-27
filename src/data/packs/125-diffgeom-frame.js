/* ==========================================================================
   内容包 · 活动标架与曲面论（20 个节点 / 38 条边）
   --------------------------------------------------------------------------
   ⭐ 本包的**顺序是刻意的**（用户拍板）：

       活动标架 → 联络形式 → 结构方程 → 适配标架 → 第一 / 第二基本形式
       → Weingarten 变换 → Gauss 方程 → Codazzi–Mainardi → 曲率 → 曲面论基本定理

   理由：曲面论里那些「算一大堆偏导」的中段可以整段被活动标架法吃掉。
   走标架路线，第一、第二基本形式、形状算子的自伴性、Gauss 方程、
   Codazzi 方程全部是「把 d e_i 按 e_j 展开、比较 1-形式的系数」的直接读数，
   Christoffel 符号一个都不必算。所以先造标架与结构方程，再从中**推出**它们；
   ⛔ 反过来（先坐标展开再硬算）是老路线，本包不重复。

   星团：
     diffgeom.frame   6 点（活动标架 / 联络形式 / 反称性 / 结构方程 /
                            适配标架 / 第二基本形式的对称性）
     diffgeom.surface 14 点（曲面与参数化 / 第一、第二基本形式 / Weingarten /
                            Gauss 方程 / Codazzi / 法曲率 / Meusnier /
                            主曲率 / 平均曲率 / Euler / Rodrigues / 曲率线网 /
                            曲面论基本定理）

   ⚠️ 登记状态（按文件系统实测）：
        · src/data/clusters.js 的 diffgeom.frame（hub = def.moving-frame）与
          diffgeom.surface（hub = def.first-fundamental-form）**已在册**；
        · src/data/regions.js 的 diffgeom、src/data/sectors.js 的 'diffgeom' **已在册**；
        · ⛔ 只差 index.html 里的
          <script src="src/data/packs/125-diffgeom-frame.js">（本文件不改 index.html）。
        · 姊妹包 126-diffgeom-intrinsic.js（内蕴几何）的 definition 边引用了本包的
          def.moving-frame / def.connection-form / def.first-fundamental-form /
          def.second-fundamental-form / def.weingarten-map / def.normal-curvature /
          def.principal-curvature —— 这些 id 不要再改名。
        · 「绝妙定理」归 126 的 thm.theorema-egregium（它已有标架 + 极坐标两条证明），
          本包不重复建点，只在 thm.gauss-equation 的 notes 里记下那一行推论。

   ⚠️ 符号约定（全包统一，写死在文本里）：
        d e_i = Σ_j ω^j_i e_j，ω^j_i = <d e_i, e_j>，故 ω^i_j = -ω^j_i；
        W := -d n（形状算子，与 do Carmo 一致）；II := <d r, -d n>；
        于是 II = -Σ_i ω^i ω^i_3 = Σ_{i,j} h_{ij} ω^i ω^j，h_{ij} := -c_{ij}
        （ω^i_3 = Σ_j c_{ij} ω^j）。这样 h 恰好是 W 的矩阵，
        「主曲率 = h 的特征值」与「II 的系数」用的是同一支，不需要再配符号。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '活动标架与曲面论',
  nodes: [

    /* ======================================================================
       §A 活动标架（diffgeom.frame）
       ====================================================================== */

    {
      id: 'def.moving-frame',
      cluster: 'diffgeom.frame',
      type: 'definition',
      label: '活动标架',
      title: '活动标架与对偶余标架',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '活动标架', '余标架', '曲面论'],
      statement: [
        '设 $U_{0} \\subseteq S$ 是曲面上的开集。**活动标架**是三个 $C^{1}$ 向量场 $e_{1}, e_{2}, e_{3}$，使每点的 $(e_{1}, e_{2}, e_{3})$ 都是 $\\mathbb{R}^{3}$ 的标准正交基（随点移动而变，故名「活动」）。**对偶余标架**是',
        '',
        '$$\\omega^{i}(v) := \\langle v, e_{i}\\rangle ,\\qquad i = 1,2,3,$$',
        '',
        '它们是 $1$-形式，满足 $\\omega^{i}(e_{j}) = \\delta^{i}_{\\ j}$。位置向量的微分按标架展开：',
        '',
        '$$\\mathrm{d}r = \\omega^{1}e_{1}+\\omega^{2}e_{2}+\\omega^{3}e_{3}.$$',
        '',
        '这叫**焊接方程**（soldering）：它把「$r$ 怎么动」翻译成「沿标架的各分量动多少」。'
      ].join('\n'),
      notes: [
        '**为什么值得换一套说法**：坐标路线要算 $r_{uu}, r_{uv}, r_{vv}$ 以及 $n$ 的偏导；标架路线只把 $\\mathrm{d}r$、$\\mathrm{d}e_{i}$ **展开一次**，此后全是 $1$-形式之间的代数（外积、比较系数）。这正是用户要的「用活动标架代替复杂计算」。',
        '**曲面上的标准取法**：$e_{3} = n$（法向），$e_{1}, e_{2}$ 是与 $n$ 正交的单位切向量场。这时 $\\omega^{3} = \\langle \\mathrm{d}r, n\\rangle = 0$：曲面上没有法向增量。',
        '⚠️ $(e_{1}, e_{2})$ 只在局部存在，且不唯一（可差一次转动）。凡要写出来的量都要写成与转动无关的形式（如 $I = (\\omega^{1})^{2}+(\\omega^{2})^{2}$），否则一换标架就变形。',
        '**记号**：$\\omega^{i}$ 的上标是编号、不是幂；$(e_{1}, e_{2}, e_{3})$ 与 $(\\omega^{1}, \\omega^{2}, \\omega^{3})$ 互为对偶对，这是活动标架法的全部记账规则。'
      ].join('\n\n'),
      refs: [
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· 活动标架与余标架',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 活动标架法'
      ]
    },

    {
      id: 'def.connection-form',
      cluster: 'diffgeom.frame',
      type: 'definition',
      label: '联络形式',
      title: '联络形式',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '联络形式', '活动标架'],
      statement: [
        '白话：标架**自己也会转** —— 沿某个方向走一小步，$(e_{1},e_{2},e_{3})$ 就微微转动一点。**联络形式**就是把这件「转动」记下来的九个 $1$-形式：喂给它一个方向，它告诉你标架绕哪个轴、转多快。和 Christoffel 符号是一回事，只是换了正交标架来记。',
        '',
        '把 $\\mathrm{d}e_{i}$ 按标架展开，系数记作 $\\omega^{j}_{\\ i}$：',
        '',
        '$$\\mathrm{d}e_{i} = \\sum_{j=1}^{3}\\omega^{j}_{\\ i}\\,e_{j},\\qquad \\omega^{j}_{\\ i} = \\langle \\mathrm{d}e_{i}, e_{j}\\rangle .$$',
        '',
        '这九个 $1$-形式叫**联络形式**（$\\Gamma$-形式）。矩阵 $(\\omega^{i}_{\\ j})$ 反称（见 `prop.connection-antisymmetric`），故只有三个独立：$\\omega^{1}_{\\ 2}, \\omega^{1}_{\\ 3}, \\omega^{2}_{\\ 3}$。',
        '',
        '取 $e_{3} = n$（法向）后它们分成两类：',
        '',
        ['- $\\omega^{1}_{\\ 2}$：**内蕴**部分 —— 曲面的 Levi-Civita 联络，Gauss 曲率由它算出；',
         '- $\\omega^{1}_{\\ 3}, \\omega^{2}_{\\ 3}$：**外蕴**部分 —— 第二基本形式由它们算出。'].join('\n')
      ].join('\n'),
      notes: [
        '**名字的来历**：$\\omega^{j}_{\\ i}$ 描述「沿某个方向走时，标架怎么转」。它不是无端造出来的外形式：每一点上是 $\\mathbb{R}^{3}$ 的一个 $3\\times3$ 反称矩阵（$3$ 个自由度），沿方向取值就成了 $1$-形式。',
        '⭐ **这一拆分就是曲面论**：$\\mathbb{R}^{3}$ 里曲率形式恒为零；限制到曲面上，$\\omega^{1}_{\\ 2}$ 那部分由内蕴度量决定（Gauss 方程），剩下的外蕴部分给出 $II$ 与 Codazzi 方程。整本曲面论都在读这两类形式的系数。',
        '⚠️ $\\omega^{i}_{\\ j}$ 与 $\\omega^{j}_{\\ i}$ 差一个负号，是全图最容易抄错的地方。判据只有一条：对 $\\langle e_{i}, e_{j}\\rangle = \\delta_{ij}$ 取外微分，不要凭记忆。',
        '**与 Christoffel 符号的关系**：在**不正交**的标架 $\\{r_{u}, r_{v}, n\\}$ 上把它写开，系数就是 $\\Gamma^{k}_{\\ ij}$ 与 $h_{ij}$ 的混合体（对照 `def.second-fundamental-form` 与 `def.christoffel-symbol`）；只有在正交标架下它才变成干净的反对称矩阵。'
      ].join('\n\n'),
      refs: [
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· 联络形式',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 联络形式'
      ]
    },

    {
      id: 'prop.connection-antisymmetric',
      cluster: 'diffgeom.frame',
      type: 'proposition',
      label: '联络形式反对称',
      title: '正交标架给出反对称的联络形式',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '联络形式', '反对称'],
      statement: [
        '设 $(e_{1}, e_{2}, e_{3})$ 是活动标架（正交标架），$\\omega^{i}_{\\ j}$ 是联络形式。则对一切 $i,j$：',
        '',
        '$$\\omega^{i}_{\\ j}+\\omega^{j}_{\\ i} = 0 ;$$',
        '',
        '特别地 $\\omega^{i}_{\\ i} = 0$。于是九个联络形式只剩三个独立分量 $\\omega^{1}_{\\ 2}, \\omega^{1}_{\\ 3}, \\omega^{2}_{\\ 3}$。'
      ].join('\n'),
      notes: [
        '证明走的是「内积是常数」这一条，不需要任何坐标：对 $\\langle e_{i}, e_{j}\\rangle = \\delta_{ij}$ 取外微分即得（见入边）。',
        '⭐ **这条是正交标架法的地基**：它把 $\\mathrm{O}(3)$ 的转动自由度（$3$ 个参数）写成 $3$ 个 $1$-形式，后面结构方程里的两两外积才有意义。',
        '⚠️ 若改用**不正交**的标架（如 $\\{r_{u}, r_{v}, n\\}$），$g_{ij}$ 不是 $\\delta_{ij}$，反对称性不成立，$\\omega$ 就退化成 $\\Gamma$ 与 $h$ 的混合体 —— 那正是里那套公式的样子。'
      ].join('\n\n'),
      refs: [
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· 联络形式的反称性',
        'Kühnel, Differential Geometry: Curves - Surfaces - Manifolds, 「Surfaces in three-space」· 结构方程'
      ]
    },

    {
      id: 'thm.structure-equations',
      cluster: 'diffgeom.frame',
      type: 'theorem',
      label: '结构方程',
      title: '第一与第二结构方程',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '结构方程', '活动标架', '可积性'],
      statement: [
        '白话：**这两条方程管着「标架怎么动」**。第一式（挠率为零）说「余标架的变化完全由联络形式决定，没有额外的拧劲」；第二式（$\\mathbb{R}^{3}$ 是平的）说「沿两个方向各转一次，结果与先后顺序无关」。合起来就是 $\\mathrm{d}^{2} = 0$ 在标架下的样子。',
        '',
        '设 $\\omega^{i}$ 是对偶余标架（$\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$）、$\\omega^{i}_{\\ j}$ 是联络形式。则',
        '',
        '**第一结构方程**（挠率为零）',
        '',
        '$$\\mathrm{d}\\omega^{i} = \\sum_{j}\\omega^{j}\\wedge\\omega^{i}_{\\ j} ;$$',
        '',
        '**第二结构方程**（$\\mathbb{R}^{3}$ 平坦）',
        '',
        '$$\\mathrm{d}\\omega^{i}_{\\ j}+\\sum_{k}\\omega^{i}_{\\ k}\\wedge\\omega^{k}_{\\ j} = 0 ,\\qquad \\mathrm{d}\\omega^{i}_{\\ j} = \\sum_{k}\\omega^{k}_{\\ j}\\wedge\\omega^{i}_{\\ k}.$$',
        '',
        '两条合起来就是 $\\mathrm{d}^{2}=0$ 在标架上的样子：对 $\\mathrm{d}r$ 取外微分得第一式，对 $\\mathrm{d}e_{i}$ 取外微分得第二式。'
      ].join('\n'),
      notes: [
        '**为什么叫「结构」**：这两条方程决定「标架怎么动」的全部约束。给定余标架与联络，曲面的形状连同它在 $\\mathbb{R}^{3}$ 里的位置就定了；反过来要检查的相容性只有 $\\mathrm{d}^{2}=0$。曲面论基本定理就是把这句话做成定理。',
        '**曲率形式**：一般流形上第二式的右端不为零，那一项叫曲率形式 $\\Omega^{i}_{\\ j} := \\mathrm{d}\\omega^{i}_{\\ j}+\\sum_{k}\\omega^{i}_{\\ k}\\wedge\\omega^{k}_{\\ j}$；$\\mathbb{R}^{3}$ 上 $\\Omega \\equiv 0$。限制到曲面上时它变成 $\\Omega^{i}_{\\ j} = \\omega^{i}_{\\ 3}\\wedge\\omega^{j}_{\\ 3}$ —— 这就是 Gauss 方程。',
        '把同一件事写成「$r_{ij} = \\Gamma^{k}_{\\ ij}r_{k}+h_{ij}n$、$n_{i} = -h^{j}_{\\ i}r_{j}$ 的混合偏导可交换（可积性条件）」。这里只是把「混合偏导」换成 $\\mathrm{d}^{2}=0$、把 $\\Gamma$ 换成 $\\omega$：同一个相容性，写法更短。',
        '⚠️ **符号约定**：本包取 $\\omega^{j}_{\\ i} = \\langle \\mathrm{d}e_{i}, e_{j}\\rangle$，即 $\\mathrm{d}e_{i} = \\sum_{j}\\omega^{j}_{\\ i}e_{j}$。上下指标换一种位置，第二式整体变号；引用前先对齐这一条。'
      ].join('\n\n'),
      refs: [
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· 结构方程',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 结构方程'
      ]
    },

    {
      id: 'lem.adapted-frame',
      cluster: 'diffgeom.frame',
      type: 'lemma',
      label: '适配标架',
      title: '沿曲面取法向标架',
      regions: ['diffgeom'],
      tags: ['引理', '微分几何', '活动标架', '法向标架'],
      statement: [
        '设标架取成适配于曲面的：$e_{3} = n$（法向）。则沿曲面',
        '',
        '$$\\omega^{3} = 0,\\qquad \\omega^{i}_{\\ 3} = \\sum_{j=1}^{2}c_{ij}\\,\\omega^{j}\\quad (i = 1,2),$$',
        '',
        '即外蕴联络形式全部落在 $\\{\\omega^{1}, \\omega^{2}\\}$ 张成的空间里，由三个函数 $c_{11}, c_{12}, c_{22}$ 决定（$c_{12} = c_{21}$ 见 `lem.second-form-symmetric`）。'
      ].join('\n'),
      notes: [
        '**为什么 $\\omega^{3} = 0$**：$\\omega^{3}(v) = \\langle \\mathrm{d}r(v), e_{3}\\rangle$，而 $\\mathrm{d}r(v)$ 是曲面的切向量、$e_{3}$ 是法向。等价说法：$r$ 沿曲面移动时没有法向分量。',
        '⭐ **方程组因此变短**：第一结构方程取 $i=3$ 变成恒等式 $0 = \\omega^{1}\\wedge\\omega^{3}_{\\ 1}+\\omega^{2}\\wedge\\omega^{3}_{\\ 2}$；第二结构方程取 $i,j \\in \\{1,2\\}$ 时只剩 $k=3$ 那一项「多出来」—— 那一项就是 Gauss 曲率。',
        '⭐ 这一步正是「省掉复杂计算」的入口：用坐标求偏导 $r_{uu}, r_{uv}$ 才拿得到的 $h_{ij}$，在这里只是 $\\omega^{i}_{\\ 3}$ 的系数。',
        '⚠️ $\\omega^{3} = 0$ 是**沿曲面**成立，不是标架本身的性质：在 $\\mathbb{R}^{3}$ 的开集上 $\\omega^{3}$ 一般不为零，那正对应「曲面朝法向弯出去」。'
      ].join('\n\n'),
      refs: [
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· 曲面上的标准标架',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 2 章「正则曲面」· Gauss 映射'
      ]
    },

    {
      id: 'lem.second-form-symmetric',
      cluster: 'diffgeom.frame',
      type: 'lemma',
      label: '第二基本形式对称',
      title: '第二基本形式的系数矩阵对称',
      regions: ['diffgeom'],
      tags: ['引理', '微分几何', '第二基本形式', '对称性'],
      statement: [
        '在 $e_{3} = n$ 的标架下记 $\\omega^{i}_{\\ 3} = \\sum_{j}c_{ij}\\omega^{j}$（$i, j = 1,2$）。则',
        '',
        '$$c_{12} = c_{21}.$$',
        '',
        '令 $h_{ij} := -c_{ij}$，则 $(h_{ij})$ 也对称，于是',
        '',
        '$$II = \\sum_{i,j=1}^{2}h_{ij}\\,\\omega^{i}\\omega^{j} = h_{11}(\\omega^{1})^{2}+2h_{12}\\omega^{1}\\omega^{2}+h_{22}(\\omega^{2})^{2}$$',
        '',
        '是对称双线性形式（$\\omega^{i}\\omega^{j}$ 指对称积）。'
      ].join('\n'),
      notes: [
        '**证明只有一行**：把 $\\mathrm{d}\\omega^{3} = 0$ 代进第一结构方程，得 $(c_{12}-c_{21})\\,\\omega^{1}\\wedge\\omega^{2} = 0$。见入边。',
        '**坐标版对照**：是在 $\\{r_{u}, r_{v}\\}$ 下用「$W$ 的矩阵 $h^{j}_{\\ i}$ 由混合偏导相等而自伴」得到对称性的。$\\mathrm{d}^{2}=0$ 是同一件事的坐标无关版本，且不必假设参数网特殊。',
        '⭐ **对称性的回报**：实对称矩阵有正交的实特征方向（谱定理）—— 这正是主方向、Euler 公式、Rodrigues 定理的来源。',
        '⚠️ 对称的是**相对正交标架**的矩阵 $(c_{ij})$ 与 $(h_{ij})$；若改用不正交的 $\\{r_{u}, r_{v}\\}$，对称的是 $h_{ij}$，而 $(h^{j}_{\\ i}) = g^{jk}h_{ki}$ 一般不对称。 $\\det(h-kg)=0$ 用的正是 $h_{ij}$ 这一支。'
      ].join('\n\n'),
      refs: [
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· 第二基本形式的对称性',
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 第二基本形式的对称性'
      ]
    },

    /* ======================================================================
       §B 曲面论（diffgeom.surface）
       ====================================================================== */

    {
      id: 'def.regular-surface',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '曲面与参数化',
      title: '正则曲面、切平面与 Gauss 映射',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '曲面', '参数化', 'Gauss 映射'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{2}$ 是开集，$r\\colon U \\to \\mathbb{R}^{3}$ 是 $C^{2}$ 映射，记 $r_{u} := \\partial r/\\partial u$、$r_{v} := \\partial r/\\partial v$。若处处有',
        '',
        '$$r_{u}\\times r_{v} \\ne 0 ,$$',
        '',
        '则称 $r$ 是 $U$ 上的**正则参数曲面**，像集 $S = r(U)$ 叫曲面。此时 $\\{r_{u}, r_{v}\\}$ 张成切平面 $T_{p}S$，而',
        '',
        '$$n := \\frac{r_{u}\\times r_{v}}{\\lVert r_{u}\\times r_{v}\\rVert}$$',
        '',
        '是单位法向量，$n\\colon U \\to S^{2}$ 叫 **Gauss 映射**。切映射 $\\mathrm{d}r\\colon T_{p}U \\to T_{r(p)}S$ 由 $\\mathrm{d}r(\\partial_{u}) = r_{u}$、$\\mathrm{d}r(\\partial_{v}) = r_{v}$ 确定。'
      ].join('\n'),
      notes: [
        '**一句话**：曲面论的全部内容都是「通过参数空间 $U$ 上的对象，读出曲面上发生了什么」—— 这也是整章的出发点。这里的路线把它做成 $1$-形式的等式（$\\mathrm{d}r$、$\\mathrm{d}e_{i}$ 按标架展开），而不是对 $r$ 求偏导。',
        '**切映射不是切平面上的恒等**：它是从参数域切空间到 $\\mathbb{R}^{3}$ 的线性单射，像恰是切平面。写 $I$ 与 $II$ 时两个自变量都先经 $\\mathrm{d}r$ 送到切平面，再做内积。',
        '⚠️ 参数化不是曲面本身：换一组 $(u,v)$ 会改 $E,F,G$ 的表达式，但不改第一基本形式这个张量。所以本包结论一律写成「相对标架」的形式，与参数化无关。',
        '**法向的两种选择**：$n$ 与 $-n$ 都是单位法向。$II$ 与 $H$ 随这个选择变号，$K$ 与 $|H|$ 不变 —— 凡要定符号的地方，本包一律按 $e_{3} = n$（即 $r_{u}\\times r_{v}$ 的方向）固定。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 2 章「正则曲面」· 正则曲面与 Gauss 映射',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 参数曲面与切平面'
      ]
    },

    {
      id: 'def.first-fundamental-form',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '第一基本形式',
      title: '第一基本形式',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '第一基本形式', '度量'],
      statement: [
        '曲面的**第一基本形式**是 $T_{p}U$ 上的对称双线性形式',
        '',
        '$$I(v,w) := \\langle \\mathrm{d}r(v), \\mathrm{d}r(w)\\rangle .$$',
        '',
        '相对参数 $(u,v)$ 它写成 $I = E\\,\\mathrm{d}u^{2}+2F\\,\\mathrm{d}u\\,\\mathrm{d}v+G\\,\\mathrm{d}v^{2}$，其中 $E = \\langle r_{u}, r_{u}\\rangle$、$F = \\langle r_{u}, r_{v}\\rangle$、$G = \\langle r_{v}, r_{v}\\rangle$；相对正交余标架它写成',
        '',
        '$$I = (\\omega^{1})^{2}+(\\omega^{2})^{2}.$$',
        '',
        '它给出切向量的长度与夹角、曲线的弧长，以及面积元 $\\mathrm{d}A = \\omega^{1}\\wedge\\omega^{2} = \\sqrt{EG-F^{2}}\\,\\mathrm{d}u\\,\\mathrm{d}v$。'
      ].join('\n'),
      notes: [
        '$I$ 是 $\\mathbb{R}^{3}$ 的内积沿 $r$ 的**拉回**：$\\mathrm{d}r$ 把参数域的切向量送进切平面，再用 $\\mathbb{R}^{3}$ 的内积量。所以 $I$ 只看见「曲面上的长度」，看不见「曲面怎么弯」—— 弯曲在 $II$ 里。',
        '**为什么正交标架下是两平方和**：$\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$ 且 $e_{i}$ 标准正交，故 $\\langle \\mathrm{d}r, \\mathrm{d}r\\rangle = \\sum_{i}(\\omega^{i})^{2}$；沿曲面 $\\omega^{3} = 0$，只剩两项。',
        '**矩阵**：$(g_{ij}) = \\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}$，$\\det g = EG-F^{2} > 0$。后面所有「$h$ 相对 $g$ 的特征值」都在用这个矩阵。',
        '⚠️ 换参数化会改 $E,F,G$ 的表达式，$I$ 作为张量不变。正交参数化（$F = 0$）能让公式短一半 —— 那串 $\\Gamma$ 就只在那种情形写出来。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 2 章「正则曲面」· 第一基本形式',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 第一基本形式'
      ]
    },

    {
      id: 'def.weingarten-map',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: 'Weingarten 变换',
      title: 'Weingarten 变换（形状算子）',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '形状算子', 'Weingarten 变换'],
      statement: [
        '设 $e_{3} = n$。**Weingarten 变换**定义为 Gauss 映射微分的相反数：',
        '',
        '$$W(v) := -\\mathrm{d}n(v) = -\\mathrm{d}e_{3}(v),\\qquad W\\colon T_{p}S \\to T_{p}S .$$',
        '',
        '它确实落在切平面里（因为 $\\langle \\mathrm{d}n(v), n\\rangle = 0$）。相对标架 $e_{1}, e_{2}$：',
        '',
        '$$W(e_{j}) = \\sum_{i=1}^{2}h_{ij}\\,e_{i},\\qquad h_{ij} := -c_{ij} = -\\omega^{i}_{\\ 3}(e_{j}),$$',
        '',
        '并且 $W$ 自伴：$\\langle W(v), w\\rangle = \\langle v, W(w)\\rangle$，即 $(h_{ij})$ 对称。'
      ].join('\n'),
      notes: [
        '**直观**：$W$ 度量「法向转得多快」，也就是曲面弯得多厉害。单位方向 $V$ 上的弯曲量是 $\\langle W(V), V\\rangle$，见 `def.normal-curvature`。',
        '**自伴从哪来**：坐标路线用 $r_{uv} = r_{vu}$（混合偏导相等）；标架路线用 $\\mathrm{d}\\omega^{3} = 0$（`lem.second-form-symmetric` 与入边）。后者更省，也不依赖参数网的特殊选取。',
        '⚠️ **符号**：取 $W := -\\mathrm{d}n$ 是为了让「球面 $+$ 外法向」的主曲率为负（与 do Carmo 一致）。若取 $W := \\mathrm{d}n$，$II$ 也得跟着变号，否则「主曲率 $=$ $W$ 的特征值」不成立。写的 $W\\colon r_{i} \\mapsto -n_{i}$ 就是这个约定。',
        '**第三基本形式**：$III(v,w) := \\langle \\mathrm{d}n(v), \\mathrm{d}n(w)\\rangle = \\langle W(v), W(w)\\rangle$。$W$ 的特征方程 $W^{2}-2HW+K\\,\\mathrm{id} = 0$ 翻成二次形式就是 $III-2H\\,II+K\\,I = 0$（Cayley–Hamilton）。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 形状算子与自伴性',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· Weingarten 变换'
      ]
    },

    {
      id: 'def.second-fundamental-form',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '第二基本形式',
      title: '第二基本形式',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '第二基本形式', '弯曲'],
      statement: [
        '曲面的**第二基本形式**是',
        '',
        '$$II(v,w) := \\langle \\mathrm{d}r(v), -\\mathrm{d}n(w)\\rangle = \\langle W(\\mathrm{d}r(v)), \\mathrm{d}r(w)\\rangle .$$',
        '',
        '在 $e_{3} = n$ 的正交标架下',
        '',
        '$$II = -\\sum_{i=1}^{2}\\omega^{i}\\,\\omega^{i}_{\\ 3} = \\sum_{i,j=1}^{2}h_{ij}\\,\\omega^{i}\\omega^{j},$$',
        '',
        '相对参数 $(u,v)$ 写成 $II = L\\,\\mathrm{d}u^{2}+2M\\,\\mathrm{d}u\\,\\mathrm{d}v+N\\,\\mathrm{d}v^{2}$。$II$ 对称，$II(v,v)$ 是 $\\mathrm{d}r(v)$ 方向的法向弯曲量。',
        '',
        '经 $\\mathrm{d}r$ 把 $T_{p}U$ 与切平面 $T_{p}S$ 等同之后，$II$ 也可以直接写在切向量上：$II(V,W) = \\langle W(V), W\\rangle$。本包下面写 $k_{n}(V)$、Rodrigues 定理、Euler 公式时用的就是这个形式。'
      ].join('\n'),
      notes: [
        '**一个负号，三种写法**：$\\langle \\mathrm{d}r, -\\mathrm{d}n\\rangle = -\\sum_{i}\\omega^{i}\\omega^{i}_{\\ 3} = \\sum_{i,j}h_{ij}\\omega^{i}\\omega^{j}$。这里把负号放进系数（$h_{ij} = -c_{ij}$），好处是 $h$ 恰好就是 $W$ 的矩阵，「主曲率 $=$ $h$ 的特征值」不用再配符号。',
        '⭐ **对称性不用算**：由 $\\mathrm{d}\\omega^{3} = 0$ 得到（`lem.second-form-symmetric`），不需要「$r_{uu}$、$r_{uv}$ 的混合偏导相等」。',
        '**与参数无关**：$II$ 是张量，$L, M, N$ 只是它在 $(u,v)$ 下的分量。$n \\mapsto -n$ 时 $II \\mapsto -II$，而 $W$ 的定义里已带负号、随之一并变号，所以 $K$ 与 $|H|$ 不变。',
        '**几何意义**：$II(v,v)$ 是「沿 $v$ 走、在法向上弯多少」；$L, M, N$ 与 $E, F, G$ 一起给出两个主曲率（解 $\\det(h-kg) = 0$）。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 第二基本形式',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 第二基本形式'
      ]
    },

    {
      id: 'thm.gauss-equation',
      cluster: 'diffgeom.surface',
      type: 'theorem',
      label: 'Gauss 方程',
      title: 'Gauss 方程',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Gauss 方程', 'Gauss 曲率', '结构方程'],
      statement: [
        '在适配标架 $e_{3} = n$ 下，把第二结构方程按 $k = 1,2,3$ 拆开，$k = 3$ 那一项留下来就是曲面的曲率：',
        '',
        '$$\\mathrm{d}\\omega^{1}_{\\ 2} = \\omega^{1}_{\\ 3}\\wedge\\omega^{2}_{\\ 3}.$$',
        '',
        '定义 **Gauss 曲率** $K$ 为 $\\mathrm{d}\\omega^{1}_{\\ 2} = K\\,\\omega^{1}\\wedge\\omega^{2}$，则',
        '',
        '$$K = \\det(c_{ij}) = \\det(h_{ij}) = \\frac{LN-M^{2}}{EG-F^{2}} .$$',
        '',
        '等价的无指标形式（$\\mathbb{R}^{3}$ 是平的、曲率为零这件事在曲面上的分量）：',
        '',
        '$$\\langle R(X,Y)Z, W\\rangle = II(Y,Z)II(X,W)-II(X,Z)II(Y,W).$$'
      ].join('\n'),
      notes: [
        '⭐ **本包的枢纽**：一个偏导数都不用展开。$\\mathbb{R}^{3}$ 上曲率形式恒为零，拆项后残留的 $\\omega^{1}_{\\ 3}\\wedge\\omega^{2}_{\\ 3}$ 就是曲率 —— 曲率等于两个外蕴形式的外积。',
        '**坐标版对照**：用 $r_{ij} = \\Gamma^{k}_{\\ ij}r_{k}+h_{ij}n$ 的混合偏导可交换推出 Gauss 方程，并写成 $R_{ijkl} = h_{ik}h_{jl}-h_{il}h_{jk}$、$R_{1212} = LN-M^{2} = K(EG-F^{2})$。这里改用 $\\mathrm{d}\\omega^{i}_{\\ j}$ 读系数，是同一组方程的更短写法。',
        '⚠️ **指标次序是约定**：若记 $R_{ijkl} = \\langle R(e_{i}, e_{j})e_{k}, e_{l}\\rangle$，上面的向量形式写成 $R_{ijkl} = h_{jk}h_{il}-h_{ik}h_{jl}$，符号与另一种指标次序相反；若取 $R_{ijkl} = h_{ik}h_{jl}-h_{il}h_{jk}$ 对应把 $W$ 放在后一对位置的约定，那时 $R_{1212} = LN-M^{2} = K(EG-F^{2})$ 成立。用指标式之前先对齐 $R$ 的约定，符号才有意义。',
        '**二维只剩一个独立分量**：$R_{ijkl}$ 的分量被对称性锁死，二维时只有一个（$R_{1212}$），所以二维的 Gauss 方程是**一个**方程 —— 这也是二维曲面论能算得动的原因。',
        '**点的分类**：$K > 0$ 椭圆点、$K = 0$ 且主曲率不全为零是抛物点、$K < 0$ 双曲点；$k_{1} = k_{2}$ 为脐点。',
        '⭐ **读出来的推论（绝妙定理）**：$K = \\mathrm{d}\\omega^{1}_{\\ 2}/(\\omega^{1}\\wedge\\omega^{2})$ 里只出现 $\\omega^{1},\\omega^{2}$；而 $\\omega^{1}_{\\ 2}$ 由 $\\mathrm{d}\\omega^{1},\\mathrm{d}\\omega^{2}$ 加挠率为零的条件唯一解出（写 $\\omega^{1}_{\\ 2} = a_{1}\\omega^{1}+a_{2}\\omega^{2}$，两个方程给两个系数），所以 $K$ 只依赖 $I$ —— 即 Gauss 曲率是**内蕴**量。这条结果在 `diffgeom.intrinsic` 里有独立节点 `thm.theorema-egregium`（证明走标架与测地极坐标两条路），本包按「一个概念一个节点」不再重复建点，只把这一步记在这里。',
        '**面积读法**：Gauss 映射把面积元放大 $\\det(\\mathrm{d}n) = \\det W = K$ 倍（带符号），所以 $K = \\pm|n_{u}\\times n_{v}|/|r_{u}\\times r_{v}|$。这与 $\\det h$ 是同一个量。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· Gauss 方程',
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· Gauss 方程与结构方程'
      ]
    },

    {
      id: 'thm.codazzi-mainardi',
      cluster: 'diffgeom.surface',
      type: 'theorem',
      label: 'Codazzi–Mainardi 方程',
      title: 'Codazzi–Mainardi 方程',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Codazzi 方程', '结构方程', '相容性'],
      statement: [
        '在适配标架下取第二结构方程的 $j = 3$ 分量（即 $\\mathbb{R}^{3}$ 曲率的法向分量为零）：',
        '',
        '$$\\mathrm{d}\\omega^{i}_{\\ 3} = \\sum_{j=1}^{2}\\omega^{j}_{\\ 3}\\wedge\\omega^{i}_{\\ j},\\qquad i = 1,2 .$$',
        '',
        '等价形式：$(\\nabla_{X}II)(Y,Z) = (\\nabla_{Y}II)(X,Z)$，即 $\\nabla II$ 关于前两个变量对称。用系数写就是',
        '',
        '$$\\nabla_{i}h_{jk} = \\nabla_{j}h_{ik},\\qquad \\nabla_{i}h_{jk} = \\partial_{i}h_{jk}-\\Gamma^{l}_{\\ ij}h_{lk}-\\Gamma^{l}_{\\ ik}h_{jl}.$$',
        '',
        '二维时只有两条独立方程（$i = 1$ 与 $i = 2$，另一个指标由对称性决定）。'
      ].join('\n'),
      notes: [
        '**它在说什么**：弯曲变化率在切方向上对称 —— 沿 $X$ 走时 $II$ 的改变量沿 $Y$ 的分量，等于沿 $Y$ 走时沿 $X$ 的分量。等价说法：$\\mathbb{R}^{3}$ 曲率的混合分量 $R^{i}_{\\ 3jk}$ 必须为零。',
        '⭐ **不是假设，是必要条件**：$\\mathbb{R}^{3}$ 平坦，所以任何能嵌入的曲面自动满足 Codazzi。它和 Gauss 方程一起构成「能否实现为 $\\mathbb{R}^{3}$ 中的曲面」的完整相容性条件（`thm.fundamental-theorem-surfaces`）。',
        '**坐标版对照**：写成 $n_{ij} = n_{ji}$ 的等价形式，p005 写成 $\\nabla_{i}h_{kj} = \\nabla_{j}h_{ki}$（$h$ 对称，两种写法一致）。标架版只要看 $\\mathrm{d}\\omega^{i}_{\\ 3}$ 的 $\\omega^{1}\\wedge\\omega^{2}$ 系数，不必碰 Christoffel 符号。',
        '⚠️ 这条只在余维 $1$（曲面在 $\\mathbb{R}^{3}$ 里）时取这个简单形状；高余维时右端还要多一项法丛曲率。本包只在 $\\mathbb{R}^{3}$ 里用它。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· Mainardi–Codazzi 方程',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· Codazzi 方程'
      ]
    },

    {
      id: 'def.normal-curvature',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '法曲率',
      title: '法曲率',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '法曲率', '渐近方向'],
      statement: [
        '设 $v \\in T_{p}U$，$v \\ne 0$。$v$ 方向的**法曲率**是',
        '',
        '$$k_{n}(v) := \\frac{II(v,v)}{I(v,v)} .$$',
        '',
        '若改用切平面上的向量 $V = \\mathrm{d}r(v)$ 写（$V \\ne 0$），就是 $W$ 的 Rayleigh 商：',
        '',
        '$$k_{n}(V) = \\frac{\\langle W(V), V\\rangle}{\\langle V, V\\rangle}.$$',
        '',
        '两种写法由 $\\mathrm{d}r$ 的线性同构等同，$k_{n}$ 只依赖方向（零次齐次）。$k_{n} = 0$ 的方向叫**渐近方向**。'
      ].join('\n'),
      notes: [
        '⭐ **这就是 Rayleigh 商**：$k_{n}$ 是自伴算子 $W$ 关于内积 $\\langle \\cdot, \\cdot\\rangle$ 的 Rayleigh 商。于是它在单位圆上的极值就是 $W$ 的特征值（主曲率），极值方向就是特征方向（主方向）且互相正交 —— 一条结论同时给出 Euler 公式与主方向的正交性。',
        '**几何意义**：$k_{n}(v)$ 是「沿 $v$ 方向、单位速的曲线在法向上的弯曲」，也就是法截线的曲率；由 Meusnier 定理（`thm.meusnier`），它是**所有**过该切方向的曲线曲率在法向上的共同投影。',
        '**渐近方向**：椭圆点没有渐近方向、抛物点 $1$ 条、双曲点 $2$ 条 —— 因为 $k_{n}$ 作为方向的二次型，其零集就是 $II$ 的零点集，形状由 $K$ 的符号决定。',
        '⚠️ $k_{n}$ 的正负随法向变：$n \\mapsto -n$ 时 $II \\mapsto -II$，$k_{n} \\mapsto -k_{n}$，但 $K = k_{1}k_{2}$ 不变。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 法曲率',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 法曲率与 Meusnier 定理'
      ]
    },

    {
      id: 'thm.meusnier',
      cluster: 'diffgeom.surface',
      type: 'theorem',
      label: 'Meusnier 定理',
      title: 'Meusnier 定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Meusnier 定理', '法曲率'],
      statement: [
        '设曲线 $\\gamma$ 落在曲面 $S$ 上，$\\gamma(0) = p$，$\\lVert \\gamma\'(0)\\rVert = 1$，曲率 $k_{\\gamma}(0) = k > 0$，主法向为 $N_{\\gamma}$。则',
        '',
        '$$k_{n}(\\gamma\'(0)) = k\\cos\\theta ,$$',
        '',
        '其中 $\\theta$ 是 $N_{\\gamma}$ 与曲面法向 $n$ 的夹角。'
      ].join('\n'),
      notes: [
        '**含义**：过同一点、同一切方向有无穷多条曲线，它们的曲率各不相同，但 $k\\cos\\theta$ 恒定 —— 于是「法曲率」是**切方向**的性质，而不是某条曲线的性质。',
        '**法截线**：$\\theta = 0$（曲线落在法平面里）时 $k_{\\gamma} = k_{n}$，取到该方向的最大曲率。这是「拿一个平面去切曲面、量截线弯曲」这套做法的合法性来源。',
        '⚠️ 需要 $k > 0$：直线段没有主法向，$\\theta$ 也就不定义。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· Meusnier 定理',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· Meusnier 定理'
      ]
    },

    {
      id: 'def.principal-curvature',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '主曲率',
      title: '主曲率与主方向',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '主曲率', '主方向', '特征值'],
      statement: [
        '$W$（等价地对称矩阵 $(h_{ij})$）的特征值叫**主曲率**，记 $k_{1} \\ge k_{2}$；对应的单位特征方向叫**主方向**。它们由特征方程给出：',
        '',
        '$$\\det(h_{ij}-k\\,g_{ij}) = 0,\\qquad \\det(W-k\\,\\mathrm{id}) = 0 .$$',
        '',
        '正交标架下 $g_{ij} = \\delta_{ij}$，特征多项式是 $k^{2}-2Hk+K$，其中 $H = \\tfrac{1}{2}\\operatorname{tr}W$、$K = \\det W$。'
      ].join('\n'),
      notes: [
        '**为什么是特征值**：$k_{n}$ 是 $W$ 的 Rayleigh 商，单位圆上的极值点满足 $II(v,\\cdot) = k\\,I(v,\\cdot)$，即 $W(\\mathrm{d}r(v)) = k\\,\\mathrm{d}r(v)$（Lagrange 乘子），极值就是特征值 —— 这正是写的「取极值的方向是 $W$ 的特征方向」。',
        '**主方向正交**：实对称矩阵属于不同特征值的特征向量正交（谱定理）。用 Rayleigh 商加变分得到同一个结论，本包直接用谱定理。',
        '**两个特征方程**：$\\det(W-kI) = 0$ 与 $\\det(h-kg) = 0$ 在正交标架下相同；在参数网 $\\{r_{u}, r_{v}\\}$ 下必须带上 $g = \\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}$，所以那个 $g$ 不能省。',
        '⚠️ $k_{1}, k_{2}$ 依赖 $n$ 的选择（$n \\mapsto -n$ 时全体变号），但「$k_{1} = k_{2}$」（脐点）与 $K = k_{1}k_{2}$ 与选择无关。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 主曲率与主方向',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 主方向与主曲率'
      ]
    },

    {
      id: 'def.mean-curvature',
      cluster: 'diffgeom.surface',
      type: 'definition',
      label: '平均曲率',
      title: '平均曲率',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '平均曲率', 'Gauss 曲率'],
      statement: [
        '白话：一个点上有两个主曲率 $k_{1}, k_{2}$（沿两个主方向的弯曲程度），它们的**平均**叫平均曲率 $H$、**乘积**叫 Gauss 曲率 $K$。$H$ 与「极小曲面」（肥皂膜）有关，$K$ 与「曲面弯不弯得平」有关。这两个数就是形状算子 $W$ 的全部不变量（一个 $2\\times2$ 对称矩阵只有迹与行列式两个）。',
        '',
        '$$H := \\frac{1}{2}\\operatorname{tr}W = \\frac{1}{2}(k_{1}+k_{2}),\\qquad K := \\det W = k_{1}k_{2}.$$',
        '',
        '$H$ 叫**平均曲率**，$K$ 叫 **Gauss 曲率**（与 `thm.gauss-equation` 的定义一致）。用 $I, II$ 的分量写：',
        '',
        '$$H = \\frac{EN-2FM+GL}{2(EG-F^{2})},\\qquad K = \\frac{LN-M^{2}}{EG-F^{2}} .$$'
      ].join('\n'),
      notes: [
        '**为什么是这两个**：$W$ 是 $2\\times2$ 对称矩阵，它的两个不变量就是迹与行列式 —— 也就是特征多项式的两个系数。所以 $H, K$ 不是随便挑的组合，它们是 $II$ 相对 $I$ 的**全部**不变量。',
        '**特征方程**：$W^{2}-2HW+K\\,\\mathrm{id} = 0$（Cayley–Hamilton），翻成二次形式是 $III-2H\\,II+K\\,I = 0$。写的就是这条恒等式（原文中间项看起来像 $2H\\,I$，按推导应是 $2H\\,II$ —— 我按正确形式记在这里）。',
        '**两个极端**：极小曲面 $H \\equiv 0$（「定边界曲面中面积取极值」）；可展曲面 $K \\equiv 0$（等价于「直纹且 $\\langle a^{\\prime}, b^{\\prime}, b\\rangle = 0$」，即「整片能摊平在平面上」）。',
        '⚠️ $H$ 的符号随 $n$ 变，$K$ 不变。所以「$H = 0$」「$K = 0$」是与法向无关的陈述，而「$H > 0$」不是。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 平均曲率与 Gauss 曲率',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 平均曲率'
      ]
    },

    {
      id: 'thm.euler-formula-surface',
      cluster: 'diffgeom.surface',
      type: 'theorem',
      label: 'Euler 公式',
      title: 'Euler 公式',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Euler 公式', '主曲率', '法曲率'],
      statement: [
        '取主方向标架：$e_{1}, e_{2}$ 是单位正交主方向，$W(e_{i}) = k_{i}e_{i}$。设单位向量 $V = \\cos\\theta\\,e_{1}+\\sin\\theta\\,e_{2}$，则',
        '',
        '$$k_{n}(V) = k_{1}\\cos^{2}\\theta+k_{2}\\sin^{2}\\theta .$$'
      ].join('\n'),
      notes: [
        '**含义**：两个数 $k_{1}, k_{2}$ 决定所有方向的法曲率 —— 法曲率作为方向的函数只是 $\\cos^{2}$ 的插值。',
        '**极值**：$\\theta = 0$ 与 $\\theta = \\pi/2$ 分别给出 $k_{1}, k_{2}$，其余方向夹在两者之间。这解释了「主方向 $=$ 法曲率取极值的方向」，也是$k_{n}(v) = k_{1}\\cos^{2}\\theta+k_{2}\\sin^{2}\\theta$。',
        '**矩阵说法**：主方向标架下 $h = \\operatorname{diag}(k_{1}, k_{2})$，$V = (\\cos\\theta, \\sin\\theta)$，于是 $k_{n} = V^{T}hV$。',
        '**平均曲率的名字**：$H = \\frac{1}{2\\pi}\\int_{0}^{2\\pi}k_{n}(\\theta)\\,\\mathrm{d}\\theta$ —— 法曲率在整圈上的平均，这正是「平均」二字的来处。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· Euler 公式',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· Euler 公式'
      ]
    },

    {
      id: 'thm.rodrigues',
      cluster: 'diffgeom.surface',
      type: 'theorem',
      label: 'Rodrigues 定理',
      title: 'Rodrigues 定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Rodrigues 定理', '主方向'],
      statement: [
        '设 $v \\in T_{p}U$，$v \\ne 0$，$k := k_{n}(v)$。则下列三条等价：',
        '',
        ['1. $\\mathrm{d}r(v)$ 是**主方向**，对应的主曲率就是 $k$；',
         '2. $\\mathrm{d}n(v) = -k\\,\\mathrm{d}r(v)$，即 $W(\\mathrm{d}r(v)) = k\\,\\mathrm{d}r(v)$；',
         '3. $k_{n}$ 在 $v$ 方向取驻值。'].join('\n')
      ].join('\n'),
      notes: [
        '**为什么好看**：$W(u) = ku$ 是线性代数，$\\mathrm{d}n(v) = -k\\,\\mathrm{d}r(v)$ 是几何 —— 它说「沿主方向走时，法向的转动与切向的移动反平行、比例就是主曲率」。',
        '**坐标形式**：曲率线参数网下 $n_{u} = -k_{1}r_{u}$、$n_{v} = -k_{2}r_{v}$。这里用 $\\mathrm{d}r, \\mathrm{d}n$ 写，不再要求参数网是曲率线网。',
        '⚠️ 负号来自 $W = -\\mathrm{d}n$。若某本书取 $W = \\mathrm{d}n$，那里的 Rodrigues 公式就没有负号 —— 抄公式前先看它把负号放在 $W$ 还是放在 $II$。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· Rodrigues 定理',
        'Kühnel, Differential Geometry: Curves - Surfaces - Manifolds, 「Surfaces in three-space」· 主方向'
      ]
    },

    {
      id: 'prop.curvature-lines',
      cluster: 'diffgeom.surface',
      type: 'proposition',
      label: '曲率线网',
      title: '曲率线网的判别法',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '曲率线', '参数网', '正交网'],
      statement: [
        '参数网 $\\{r_{u}, r_{v}\\}$ 叫**曲率线网**，如果两条坐标曲线都是曲率线（即 $r_{u}, r_{v}$ 都是主方向）。设 $p$ **不是脐点**（$k_{1} \\ne k_{2}$），则「参数网是曲率线网」等价于下面两条同时成立：',
        '',
        '$$F = 0,\\qquad M = 0 .$$',
        '',
        '在曲率线网下主曲率就是 $k_{1} = L/E$、$k_{2} = N/G$，且 $II$ 与 $I$ 在该参数网下同时对角化。'
      ].join('\n'),
      notes: [
        '**两行证明**：若 $F = M = 0$，则 $\\{r_{u}, r_{v}\\}$ 正交且 $II$ 无交叉项，两个方向都满足 $W(r_{u}) \\parallel r_{u}$，故都是主方向；反之两个**不同**的主方向必正交（谱定理，`def.principal-curvature`），故 $F = 0$，又 $M = II(r_{u}, r_{v}) = \\langle W(r_{u}), r_{v}\\rangle = k\\langle r_{u}, r_{v}\\rangle = 0$。见入边。',
        '⚠️ **为什么要排除脐点**：$k_{1} = k_{2}$ 时每个切方向都是主方向，「曲率线」不再有区分度，此时 $F$ 与 $M$ 只满足 $M = kF$，可以同时不为零。所以判别法只在非脐点区域使用。',
        '**曲率线的微分方程**：曲线 $(u(t), v(t))$ 的切方向是主方向，当且仅当',
        '$$\\begin{vmatrix} (\\mathrm{d}u^{1})^{2} & -\\mathrm{d}u^{1}\\mathrm{d}u^{2} & (\\mathrm{d}u^{2})^{2} \\\\ E & F & G \\\\ L & M & N \\end{vmatrix} = 0 .$$',
        '⭐ **它的用处**：只要 $F = M = 0$，所有公式都塌成对角形（$k_{1} = L/E$、$k_{2} = N/G$，Euler 公式里的 $\\theta$ 就是坐标方向的夹角）—— 所以传统路线先找曲率线网再算。本包不需要：标架一取就是正交的。',
        '📌 **注意**：在「曲率线网下」写了两个形如 $L = HE$、$N = HG$ 的等式。按本包的符号核对，那一对只在 $k_{1} = k_{2}$（脐点）时成立；一般情形应是 $k_{1} = L/E$、$k_{2} = N/G$、$H = (k_{1}+k_{2})/2$。按标准记号写在这里。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 3 章「Gauss 映射的几何」· 曲率线与渐近线',
        '陈维桓《微分几何讲义》, 「曲面的局部理论」· 曲率线网'
      ]
    },

    {
      id: 'thm.fundamental-theorem-surfaces',
      cluster: 'diffgeom.surface',
      type: 'theorem',
      label: '曲面论基本定理',
      title: '曲面论基本定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '曲面论基本定理', 'Gauss 方程', 'Codazzi 方程', 'Frobenius'],
      statement: [
        '设 $U \\subseteq \\mathbb{R}^{2}$ 单连通，$(g_{ij})$ 是 $U$ 上对称正定的 $C^{2}$ 矩阵值函数，$(h_{ij})$ 对称且 $C^{2}$，$K_{g}$ 是由 $g$ 算出的 Gauss 曲率。若',
        '',
        ['- **Gauss 方程**：$K_{g} = \\dfrac{\\det(h_{ij})}{\\det(g_{ij})}$；',
         '- **Codazzi 方程**：$\\nabla h$ 关于前两个指标对称'].join('\n'),
        '',
        '同时成立，则存在 $C^{2}$ 浸入 $r\\colon U \\to \\mathbb{R}^{3}$ 与单位法向 $n$，使',
        '',
        '$$I = \\sum_{i,j}g_{ij}\\,\\mathrm{d}u^{i}\\mathrm{d}u^{j},\\qquad II = \\sum_{i,j}h_{ij}\\,\\mathrm{d}u^{i}\\mathrm{d}u^{j},$$',
        '',
        '且在相差一个刚体运动的意义下唯一。反过来，任何曲面给出的 $(I, II)$ 必满足这两条方程。'
      ].join('\n'),
      notes: [
        '⭐ **为什么 Gauss–Codazzi 恰好是充要条件**：结构方程 $\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$、$\\mathrm{d}e_{i} = \\sum_{j}\\omega^{j}_{\\ i}e_{j}$ 是关于 $(r, e_{1}, e_{2}, e_{3})$ 的一阶线性偏微分方程组，系数 $\\omega^{i}, \\omega^{i}_{\\ j}$ 由 $g, h$ 代数地给出。相容性条件只有 $\\mathrm{d}^{2} = 0$，它拆成两块：$\\Omega^{1}_{\\ 2} = 0$（Gauss）与 $\\Omega^{i}_{\\ 3} = 0$（Codazzi）。这就是「Gauss–Codazzi 是唯一障碍」的全部内容。',
        '**三步构造**：(i) 由 $g$ 取正交余标架 $\\omega^{1}, \\omega^{2}$，用挠率为零的条件解出 $\\omega^{1}_{\\ 2}$；(ii) 由 $h$ 定 $\\omega^{i}_{\\ 3}$，Gauss–Codazzi 保证 $\\mathrm{d}^{2} = 0$，于是（Frobenius 定理）局部解出正交标架 $(e_{1}, e_{2}, e_{3})$；(iii) 再解 $\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$ —— 这一支只需 $\\mathrm{d}^{2}r = 0$，而它正是第一结构方程。',
        '**唯一性**：两组解之差是一个平行的（常）正交变换加平移；把初始标架对齐就重合。',
        '⚠️ **单连通去不掉**：否则整体平行移动会出现和乐（holonomy），局部解拼不成整体曲面。',
        '📌 结论是「既给 C–C 方程是结构方程可积性条件；满足 C–C 方程的曲面局部存在解」，正是本定理的两半。这里把「可积性条件」明确成 $\\Omega = 0$ 的两组分量。'
      ].join('\n\n'),
      refs: [
        'do Carmo, Differential Geometry of Curves and Surfaces, 第 4 章「曲面的内蕴几何」· 曲面论基本定理',
        'S. S. Chern, Curves and Surfaces in Euclidean Space, 「Surfaces」· 曲面论基本定理（Bonnet）'
      ]
    }

  ],

  edges: [

    /* ------------------------------------------------ 定义引用（蓝线） */
    /* 跨包：接到图上已有的基础节点。新星系如果一条外连都没有，就会成一座孤岛，
       布局里也聚不出跨星团的粗线 —— 而这里列的确实是真的依赖。 */
    {
      id: 'dep.dg-ext-inner',
      kind: 'definition',
      definition: 'def.inner-product',
      usedBy: 'def.regular-surface',
      note: '$\\langle r_{u}, r_{u}\\rangle$、$\\lVert r_{u}\\times r_{v}\\rVert$、$n$ 的单位化全靠 $\\mathbb{R}^{3}$ 的内积；整条标架路线的每一步都在用它。'
    },
    {
      id: 'dep.dg-ext-differential',
      kind: 'definition',
      definition: 'def.total-differential',
      usedBy: 'def.regular-surface',
      note: '切映射 $\\mathrm{d}r$ 就是 $r$ 的全微分；后面 $\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$ 里的 $\\mathrm{d}$ 是同一个算子。'
    },
    {
      id: 'dep.dg-ext-eigen',
      kind: 'definition',
      definition: 'def.eigenvalue',
      usedBy: 'def.principal-curvature',
      note: '主曲率就是 $W$（等价地 $h$ 相对 $g$）的特征值；主方向是特征向量。谱定理把「极值方向」与「特征方向」等同起来。'
    },
    {
      id: 'dep.dg-ext-trace',
      kind: 'definition',
      definition: 'def.trace',
      usedBy: 'def.mean-curvature',
      note: '$H = \\tfrac{1}{2}\\operatorname{tr}W$：平均曲率是形状算子的迹的一半。'
    },
    {
      id: 'dep.dg-ext-det',
      kind: 'definition',
      definition: 'def.determinant',
      usedBy: 'def.mean-curvature',
      note: '$K = \\det W$：Gauss 曲率是形状算子的行列式（二维时恰是两个主曲率之积）。'
    },
    {
      id: 'dep.dg-surface-frame',
      kind: 'definition',
      definition: 'def.regular-surface',
      usedBy: 'def.moving-frame',
      note: '标架沿曲面移动：$e_{3}$ 取 Gauss 映射的法向、$e_{1}, e_{2}$ 张成切平面 —— 这三样都是正则参数化给的。'
    },
    {
      id: 'dep.dg-frame-conn',
      kind: 'definition',
      definition: 'def.moving-frame',
      usedBy: 'def.connection-form',
      note: '联络形式是把 $\\mathrm{d}e_{i}$ **按标架展开**得到的系数；没有标架就没有它。'
    },
    {
      id: 'dep.dg-frame-adapt',
      kind: 'definition',
      definition: 'def.moving-frame',
      usedBy: 'lem.adapted-frame',
      note: '适配标架是活动标架在曲面上的特殊取法（$e_{3} = n$）；引理的结论都是关于这个取法的。'
    },
    {
      id: 'dep.dg-conn-struct',
      kind: 'definition',
      definition: 'def.connection-form',
      usedBy: 'thm.structure-equations',
      note: '结构方程的两组对象就是 $\\omega^{i}$ 与 $\\omega^{i}_{\\ j}$；定理本身不含别的量。'
    },
    {
      id: 'dep.dg-frame-I',
      kind: 'definition',
      definition: 'def.moving-frame',
      usedBy: 'def.first-fundamental-form',
      note: '$I = (\\omega^{1})^{2}+(\\omega^{2})^{2}$ 里的 $\\omega^{i}$ 是对偶余标架。用参数 $u, v$ 写还要另配 $\\mathrm{d}r$，用余标架写不需要。'
    },
    {
      id: 'dep.dg-frame-W',
      kind: 'definition',
      definition: 'def.moving-frame',
      usedBy: 'def.weingarten-map',
      note: '$W$ 的矩阵 $(h_{ij})$ 是相对标架 $e_{1}, e_{2}$ 写的；换标架只是相似/合同变换，特征值不变。'
    },
    {
      id: 'dep.dg-W-II',
      kind: 'definition',
      definition: 'def.weingarten-map',
      usedBy: 'def.second-fundamental-form',
      note: '$II(v,w) = \\langle W(\\mathrm{d}r(v)), \\mathrm{d}r(w)\\rangle$：第二基本形式是形状算子相对 $I$ 的二次形式。'
    },
    {
      id: 'dep.dg-I-normal',
      kind: 'definition',
      definition: 'def.first-fundamental-form',
      usedBy: 'def.normal-curvature',
      note: '法曲率是 $II$ 与 $I$ 的商，分母就是第一基本形式（单位化之后归一为 $1$）。'
    },
    {
      id: 'dep.dg-II-gauss',
      kind: 'definition',
      definition: 'def.second-fundamental-form',
      usedBy: 'thm.gauss-equation',
      note: 'Gauss 方程右端的 $c_{ij}$、$h_{ij}$ 就是第二基本形式的系数（$II = \\sum h_{ij}\\omega^{i}\\omega^{j}$）。'
    },
    {
      id: 'dep.dg-II-codazzi',
      kind: 'definition',
      definition: 'def.second-fundamental-form',
      usedBy: 'thm.codazzi-mainardi',
      note: 'Codazzi 讲的是 $II$ 的协变导数对称，主语就是第二基本形式。'
    },
    {
      id: 'dep.dg-W-principal',
      kind: 'definition',
      definition: 'def.weingarten-map',
      usedBy: 'def.principal-curvature',
      note: '主曲率定义为 $W$ 的特征值；只有 $W$ 自伴，才有正交的主方向可言。'
    },
    {
      id: 'dep.dg-normal-meusnier',
      kind: 'definition',
      definition: 'def.normal-curvature',
      usedBy: 'thm.meusnier',
      note: '定理的左端就是法曲率，右端是曲线曲率与夹角余弦的乘积。'
    },
    {
      id: 'dep.dg-principal-H',
      kind: 'definition',
      definition: 'def.principal-curvature',
      usedBy: 'def.mean-curvature',
      note: '$H$ 与 $K$ 是 $k_{1}, k_{2}$ 的对称函数，而 $k_{i}$ 正是主曲率。'
    },
    {
      id: 'dep.dg-principal-euler',
      kind: 'definition',
      definition: 'def.principal-curvature',
      usedBy: 'thm.euler-formula-surface',
      note: 'Euler 公式里的 $k_{1}, k_{2}$ 与 $\\theta$ 分别是主曲率与相对主方向的夹角。'
    },
    {
      id: 'dep.dg-principal-rodrigues',
      kind: 'definition',
      definition: 'def.principal-curvature',
      usedBy: 'thm.rodrigues',
      note: 'Rodrigues 定理把「主方向」翻译成 $W$ 的特征向量，两个说法是同一个定义的两面。'
    },
    {
      id: 'dep.dg-I-curvlines',
      kind: 'definition',
      definition: 'def.first-fundamental-form',
      usedBy: 'prop.curvature-lines',
      note: '$F = 0$ 就是「参数网正交」，它是第一基本形式的交叉项。'
    },
    {
      id: 'dep.dg-II-fundamental',
      kind: 'definition',
      definition: 'def.second-fundamental-form',
      usedBy: 'thm.fundamental-theorem-surfaces',
      note: '定理的输入是 $I$ 与 $II$ 的系数矩阵 $g, h$ —— 这对基本形式就是曲面的全部局部数据。'
    },
    {
      id: 'dep.dg-principal-mean',
      kind: 'definition',
      definition: 'def.principal-curvature',
      usedBy: 'thm.fundamental-theorem-surfaces',
      note: '存在性只用到 $g, h$（即 $I, II$）；$k_{i}$ 与 $H, K$ 是它们的派生量，不进入相容性条件。'
    },

    /* ------------------------------------------------ 推导（黑线，证明在边上） */
    {
      id: 'imp.dg-frame-exists',
      kind: 'implication',
      sources: ['def.regular-surface'],
      target: 'def.moving-frame',
      title: '正则曲面 $\\implies$ 存在光滑的活动标架',
      proof: [
        '取 $r_{u}, r_{v}, n$。正则性 $r_{u}\\times r_{v} \\ne 0$ 保证三者在每点线性无关；Gram–Schmidt 给出正交基：',
        '',
        '$$e_{1} := \\frac{r_{u}}{\\lVert r_{u}\\rVert},\\qquad e_{2} := \\frac{r_{v}-\\langle r_{v}, e_{1}\\rangle e_{1}}{\\lVert r_{v}-\\langle r_{v}, e_{1}\\rangle e_{1}\\rVert},\\qquad e_{3} := e_{1}\\times e_{2},$$',
        '',
        '再取符号使之等于 $n$（若 $e_{1}\\times e_{2} = -n$，把 $e_{2}$ 换成 $-e_{2}$）。$r$ 是 $C^{2}$，故 $n$ 是 $C^{1}$，右端全是 $C^{1}$ 表达式，于是 $(e_{1}, e_{2}, e_{3})$ 是 $C^{1}$ 标架场；对偶余标架 $\\omega^{i} = \\langle \\cdot, e_{i}\\rangle$ 也随之 $C^{1}$。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-antisym',
      kind: 'implication',
      sources: ['def.connection-form'],
      target: 'prop.connection-antisymmetric',
      title: '正交性 $\\implies$ $\\omega^{i}_{\\ j}+\\omega^{j}_{\\ i} = 0$',
      proof: [
        '由 $\\langle e_{i}, e_{j}\\rangle = \\delta_{ij}$ 是常数，取外微分：',
        '',
        '$$0 = \\mathrm{d}\\langle e_{i}, e_{j}\\rangle = \\langle \\mathrm{d}e_{i}, e_{j}\\rangle+\\langle e_{i}, \\mathrm{d}e_{j}\\rangle = \\omega^{j}_{\\ i}+\\omega^{i}_{\\ j}.$$',
        '',
        '中间一步用的是 $\\omega^{j}_{\\ i} = \\langle \\mathrm{d}e_{i}, e_{j}\\rangle$ 与 $\\omega^{i}_{\\ j} = \\langle \\mathrm{d}e_{j}, e_{i}\\rangle$，以及内积的对称性。取 $i = j$ 得 $2\\omega^{i}_{\\ i} = 0$。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-struct',
      kind: 'implication',
      sources: ['def.moving-frame', 'def.connection-form'],
      target: 'thm.structure-equations',
      title: '$\\mathrm{d}^{2}=0$ 给出两条结构方程',
      proof: [
        '**第一式。** 对 $\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$ 取外微分（$\\omega^{i}$ 是 $1$-形式，$e_{i}$ 是向量值 $0$-形式，故第二项带负号）：',
        '',
        '$$0 = \\mathrm{d}^{2}r = \\sum_{i}\\mathrm{d}\\omega^{i}\\wedge e_{i}-\\sum_{i}\\omega^{i}\\wedge \\mathrm{d}e_{i} = \\sum_{j}\\Bigl(\\mathrm{d}\\omega^{j}-\\sum_{i}\\omega^{i}\\wedge\\omega^{j}_{\\ i}\\Bigr)e_{j}.$$',
        '',
        '最后的等号是把 $-\\sum_{i}\\omega^{i}\\wedge \\mathrm{d}e_{i} = -\\sum_{i,j}\\omega^{i}\\wedge\\omega^{j}_{\\ i}e_{j}$ 按 $e_{j}$ 归并。$e_{j}$ 处处线性无关，故系数为零：$\\mathrm{d}\\omega^{j} = \\sum_{i}\\omega^{i}\\wedge\\omega^{j}_{\\ i}$，改换指标即第一结构方程。',
        '',
        '**第二式。** 对 $\\mathrm{d}e_{i} = \\sum_{j}\\omega^{j}_{\\ i}e_{j}$ 取外微分：',
        '',
        '$$0 = \\mathrm{d}^{2}e_{i} = \\sum_{j}\\mathrm{d}\\omega^{j}_{\\ i}\\wedge e_{j}-\\sum_{j,k}\\omega^{j}_{\\ i}\\wedge\\omega^{k}_{\\ j}e_{k} = \\sum_{j}\\Bigl(\\mathrm{d}\\omega^{j}_{\\ i}-\\sum_{k}\\omega^{k}_{\\ i}\\wedge\\omega^{j}_{\\ k}\\Bigr)e_{j},$$',
        '',
        '故 $\\mathrm{d}\\omega^{j}_{\\ i} = \\sum_{k}\\omega^{k}_{\\ i}\\wedge\\omega^{j}_{\\ k}$；改换指标得 $\\mathrm{d}\\omega^{i}_{\\ j} = \\sum_{k}\\omega^{k}_{\\ j}\\wedge\\omega^{i}_{\\ k}$。由 $1$-形式反交换，这等于 $\\mathrm{d}\\omega^{i}_{\\ j} = -\\sum_{k}\\omega^{i}_{\\ k}\\wedge\\omega^{k}_{\\ j}$，即曲率形式 $\\Omega^{i}_{\\ j} := \\mathrm{d}\\omega^{i}_{\\ j}+\\sum_{k}\\omega^{i}_{\\ k}\\wedge\\omega^{k}_{\\ j}$ 恒为零。∎',
        '',
        '⭐ 反过来也是同一件事：能构造出标架的**唯一**障碍就是这个 $\\mathrm{d}^{2}=0$（曲面论基本定理用的就是这一点）。'
      ].join('\n')
    },

    {
      id: 'imp.dg-adapt',
      kind: 'implication',
      sources: ['thm.structure-equations', 'def.regular-surface'],
      target: 'lem.adapted-frame',
      title: '沿曲面取 $e_{3} = n$ $\\implies$ $\\omega^{3} = 0$',
      proof: [
        '对任意切向量 $v$：$\\omega^{3}(v) = \\langle \\mathrm{d}r(v), e_{3}\\rangle = \\langle \\mathrm{d}r(v), n\\rangle = 0$ —— $\\mathrm{d}r(v)$ 是曲面的切向量（$r$ 的像落在 $S$ 里），与法向正交。故 $\\omega^{3}$ 沿曲面为零，于是 $\\mathrm{d}\\omega^{3} = 0$。',
        '',
        '把 $i = 3$ 代入第一结构方程（含 $\\omega^{3}$ 的项全部消失）：',
        '',
        '$$0 = \\mathrm{d}\\omega^{3} = \\omega^{1}\\wedge\\omega^{3}_{\\ 1}+\\omega^{2}\\wedge\\omega^{3}_{\\ 2}.$$',
        '',
        '这条恒等式把 $\\omega^{1}_{\\ 3}, \\omega^{2}_{\\ 3}$ 锁在 $\\{\\omega^{1}, \\omega^{2}\\}$ 张成的二维空间里：写出 $\\omega^{3}_{\\ i} = a_{i}\\omega^{1}+b_{i}\\omega^{2}+c_{i}\\omega^{3}$ 代进去，比较 $\\omega^{1}\\wedge\\omega^{3}$ 与 $\\omega^{2}\\wedge\\omega^{3}$ 的系数即得 $c_{1} = c_{2} = 0$，于是 $\\omega^{i}_{\\ 3} = \\sum_{j}c_{ij}\\omega^{j}$。剩下的 $\\omega^{1}\\wedge\\omega^{2}$ 系数给出 $b_{1} = a_{2}$，即系数的对称性（见 `lem.second-form-symmetric`）。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-hsym',
      kind: 'implication',
      sources: ['lem.adapted-frame', 'thm.structure-equations'],
      target: 'lem.second-form-symmetric',
      title: '$\\mathrm{d}\\omega^{3} = 0$ $\\implies$ 第二基本形式的系数对称',
      proof: [
        '记 $\\omega^{i}_{\\ 3} = \\sum_{j}c_{ij}\\omega^{j}$（$i, j = 1,2$；因为 $\\omega^{3} = 0$，这两个形式只能落在 $\\omega^{1}, \\omega^{2}$ 张成的空间里）。代入 $\\mathrm{d}\\omega^{3} = \\omega^{1}\\wedge\\omega^{3}_{\\ 1}+\\omega^{2}\\wedge\\omega^{3}_{\\ 2} = 0$：',
        '',
        '$$0 = \\omega^{1}\\wedge(c_{11}\\omega^{1}+c_{12}\\omega^{2})+\\omega^{2}\\wedge(c_{21}\\omega^{1}+c_{22}\\omega^{2}) = (c_{12}-c_{21})\\,\\omega^{1}\\wedge\\omega^{2}.$$',
        '',
        '$\\omega^{1}\\wedge\\omega^{2} \\ne 0$（两个独立的 $1$-形式之外积非零），故 $c_{12} = c_{21}$。取 $h_{ij} := -c_{ij}$，则 $(h_{ij})$ 对称，$II = \\sum_{i,j}h_{ij}\\omega^{i}\\omega^{j}$ 也就成了对称双线性形式。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-I',
      kind: 'implication',
      sources: ['def.moving-frame', 'lem.adapted-frame'],
      target: 'def.first-fundamental-form',
      title: '正交余标架 $+$ $\\omega^{3}=0$ $\\implies$ $I = (\\omega^{1})^{2}+(\\omega^{2})^{2}$',
      proof: [
        '直接把 $\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$ 代进定义，用 $\\langle e_{i}, e_{j}\\rangle = \\delta_{ij}$：',
        '',
        '$$I(v,w) = \\Bigl\\langle \\sum_{i}\\omega^{i}(v)e_{i},\\ \\sum_{j}\\omega^{j}(w)e_{j}\\Bigr\\rangle = \\sum_{i,j}\\omega^{i}(v)\\omega^{j}(w)\\delta_{ij} = \\sum_{i}\\omega^{i}(v)\\omega^{i}(w),$$',
        '',
        '即 $I = \\sum_{i}(\\omega^{i})^{2}$；沿曲面 $\\omega^{3} = 0$，只剩两项。再把 $e_{1}, e_{2}$ 用 $r_{u}, r_{v}$ 展开，就得到 $I = E\\,\\mathrm{d}u^{2}+2F\\,\\mathrm{d}u\\,\\mathrm{d}v+G\\,\\mathrm{d}v^{2}$ —— 两组分量是同一个张量在不同基下的矩阵。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-Wselfadj',
      kind: 'implication',
      sources: ['lem.second-form-symmetric'],
      target: 'def.weingarten-map',
      title: '系数对称 $\\implies$ Weingarten 变换自伴',
      proof: [
        '$W(e_{j}) = -\\mathrm{d}n(e_{j}) = -\\sum_{i}c_{ij}e_{i} = \\sum_{i}h_{ij}e_{i}$，故 $W$ 相对正交基 $(e_{1}, e_{2})$ 的矩阵就是 $(h_{ij})$。于是',
        '',
        '$$\\langle W(e_{i}), e_{j}\\rangle = h_{ij} = h_{ji} = \\langle e_{i}, W(e_{j})\\rangle ,$$',
        '',
        '即 $W$ 自伴。又 $\\langle \\mathrm{d}n(v), n\\rangle = \\tfrac{1}{2}\\,\\mathrm{d}\\langle n, n\\rangle(v) = 0$，所以 $W$ 确实把切平面映进切平面（而不是映到法向上）。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-II',
      kind: 'implication',
      sources: ['def.weingarten-map', 'lem.adapted-frame'],
      target: 'def.second-fundamental-form',
      title: 'Weingarten 变换 $+$ $\\omega^{3}=0$ $\\implies$ $II = -\\sum_{i}\\omega^{i}\\omega^{i}_{\\ 3}$',
      proof: [
        '用 $\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$、$e_{3} = n$、$\\mathrm{d}n = \\mathrm{d}e_{3} = \\sum_{i}\\omega^{i}_{\\ 3}e_{i}$：',
        '',
        '$$II(v,w) = \\langle \\mathrm{d}r(v), -\\mathrm{d}n(w)\\rangle = -\\sum_{i}\\omega^{i}(v)\\,\\langle e_{i}, \\mathrm{d}e_{3}(w)\\rangle = -\\sum_{i}\\omega^{i}(v)\\,\\omega^{i}_{\\ 3}(w).$$',
        '',
        '再代入 $\\omega^{i}_{\\ 3} = \\sum_{j}c_{ij}\\omega^{j}$ 与 $h_{ij} = -c_{ij}$，并用 $c_{12} = c_{21}$：',
        '',
        '$$II = -\\sum_{i,j}c_{ij}\\,\\omega^{i}\\omega^{j} = \\sum_{i,j}h_{ij}\\,\\omega^{i}\\omega^{j} = h_{11}(\\omega^{1})^{2}+2h_{12}\\omega^{1}\\omega^{2}+h_{22}(\\omega^{2})^{2}.$$',
        '',
        '换成参数 $(u,v)$ 就是 $L\\,\\mathrm{d}u^{2}+2M\\,\\mathrm{d}u\\,\\mathrm{d}v+N\\,\\mathrm{d}v^{2}$：$h_{ij}$ 与 $L, M, N$ 指的是同一组系数在不同基下的矩阵元。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-gauss',
      kind: 'implication',
      sources: ['thm.structure-equations', 'lem.adapted-frame', 'lem.second-form-symmetric'],
      target: 'thm.gauss-equation',
      title: '结构方程拆出 $k=3$ 项 $\\implies$ Gauss 方程',
      proof: [
        '第二结构方程 $\\mathrm{d}\\omega^{i}_{\\ j} = \\sum_{k=1}^{3}\\omega^{k}_{\\ j}\\wedge\\omega^{i}_{\\ k}$ 取 $i, j \\in \\{1,2\\}$，把 $k$ 拆成 $1,2,3$：',
        '',
        '$$\\mathrm{d}\\omega^{1}_{\\ 2} = \\omega^{1}_{\\ 2}\\wedge\\omega^{1}_{\\ 1}+\\omega^{2}_{\\ 2}\\wedge\\omega^{1}_{\\ 2}+\\omega^{3}_{\\ 2}\\wedge\\omega^{1}_{\\ 3}.$$',
        '',
        '前两项因 $\\omega^{1}_{\\ 1} = \\omega^{2}_{\\ 2} = 0$ 消失（`prop.connection-antisymmetric`）；最后一项用 $\\omega^{3}_{\\ 2} = -\\omega^{2}_{\\ 3}$：',
        '',
        '$$\\mathrm{d}\\omega^{1}_{\\ 2} = \\omega^{1}_{\\ 3}\\wedge\\omega^{2}_{\\ 3}.$$',
        '',
        '代入 $\\omega^{i}_{\\ 3} = \\sum_{j}c_{ij}\\omega^{j}$ 并用 $c_{12} = c_{21}$：',
        '',
        '$$\\omega^{1}_{\\ 3}\\wedge\\omega^{2}_{\\ 3} = (c_{11}c_{22}-c_{12}^{2})\\,\\omega^{1}\\wedge\\omega^{2}.$$',
        '',
        '按定义 $\\mathrm{d}\\omega^{1}_{\\ 2} = K\\omega^{1}\\wedge\\omega^{2}$，故 $K = \\det(c_{ij})$。又 $h = -c$，而 $\\det(-c) = \\det c$（$2\\times2$），故 $K = \\det(h_{ij})$。在参数网 $\\{r_{u}, r_{v}\\}$ 下 $h$ 与 $g$ 是同一对基下的两个矩阵，于是 $K = \\det h/\\det g = (LN-M^{2})/(EG-F^{2})$。',
        '',
        '**无指标形式**：同一段 $R^{\\mathbb{R}^{3}} = 0$ 的展开，这一次取**切向**分量（而不是法向分量），就得到 $\\langle R(X,Y)Z, W\\rangle = II(Y,Z)II(X,W)-II(X,Z)II(Y,W)$ —— 法向分量那一半正是 `thm.codazzi-mainardi` 的入边里算的东西。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-codazzi',
      kind: 'implication',
      sources: ['thm.structure-equations', 'lem.adapted-frame'],
      target: 'thm.codazzi-mainardi',
      title: '结构方程拆出混合分量 $\\implies$ Codazzi–Mainardi 方程',
      proof: [
        '**结构形式。** 第二结构方程取 $j = 3$：',
        '',
        '$$\\mathrm{d}\\omega^{i}_{\\ 3} = \\sum_{k=1}^{3}\\omega^{k}_{\\ 3}\\wedge\\omega^{i}_{\\ k} = \\omega^{1}_{\\ 3}\\wedge\\omega^{i}_{\\ 1}+\\omega^{2}_{\\ 3}\\wedge\\omega^{i}_{\\ 2},$$',
        '',
        '最后一步丢掉 $k = 3$（$\\omega^{3}_{\\ 3} = 0$）。',
        '',
        '**为什么等价于 $\\nabla II$ 对称。** 设 $\\bar\\nabla$ 是 $\\mathbb{R}^{3}$ 的平坦联络、$\\nabla$ 是曲面的 Levi-Civita 联络。Gauss 公式与 Weingarten 公式为',
        '',
        '$$\\bar\\nabla_{X}Y = \\nabla_{X}Y+II(X,Y)n,\\qquad \\bar\\nabla_{X}n = \\mathrm{d}n(X) = -W(X).$$',
        '',
        '把 $R^{\\mathbb{R}^{3}}(X,Y)Z = \\bar\\nabla_{X}\\bar\\nabla_{Y}Z-\\bar\\nabla_{Y}\\bar\\nabla_{X}Z-\\bar\\nabla_{[X,Y]}Z = 0$ 展开，两边取**法向分量**（切向分量给出 Gauss 方程）：',
        '',
        '$$X\\bigl(II(Y,Z)\\bigr)-Y\\bigl(II(X,Z)\\bigr)+II(X,\\nabla_{Y}Z)-II(Y,\\nabla_{X}Z)-II([X,Y],Z) = 0 .$$',
        '',
        '而 $(\\nabla_{X}II)(Y,Z) = X(II(Y,Z))-II(\\nabla_{X}Y,Z)-II(Y,\\nabla_{X}Z)$。代入上式，并用无挠 $\\nabla_{X}Y-\\nabla_{Y}X = [X,Y]$：',
        '',
        '$$(\\nabla_{X}II)(Y,Z)-(\\nabla_{Y}II)(X,Z) = 0 .$$',
        '',
        '这就是 $\\nabla II$ 关于前两个变量对称，也就是 $\\mathbb{R}^{3}$ 曲率的混合分量 $R^{i}_{\\ 3jk}$ 为零。写成系数即 $\\nabla_{i}h_{jk} = \\nabla_{j}h_{ik}$（$h$ 对称时与$\\nabla_{i}h_{kj} = \\nabla_{j}h_{ki}$ 是同一组方程）。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-meusnier',
      kind: 'implication',
      sources: ['def.normal-curvature', 'def.second-fundamental-form'],
      target: 'thm.meusnier',
      title: '法曲率的定义 $\\implies$ Meusnier 定理',
      proof: [
        '设 $\\gamma$ 单位速、$\\gamma(0) = p$，记 $V := \\gamma\'(0) \\in T_{p}S$。由 $\\langle \\gamma\', n\\rangle = 0$ 求导：',
        '',
        '$$0 = \\langle \\gamma\'\', n\\rangle+\\langle \\gamma\', \\mathrm{d}n(\\gamma\')\\rangle \\implies \\langle \\gamma\'\', n\\rangle = -\\langle V, \\mathrm{d}n(V)\\rangle = II(V,V).$$',
        '',
        '又 $k = \\lVert \\gamma\'\'\\rVert$、$N_{\\gamma} = \\gamma\'\'/k$，故 $\\langle \\gamma\'\', n\\rangle = k\\langle N_{\\gamma}, n\\rangle = k\\cos\\theta$。与 $II(V,V) = k_{n}(V)$（单位速，故 $I$ 的归一化因子为 $1$）比较，得 $k_{n}(V) = k\\cos\\theta$。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-rodrigues',
      kind: 'implication',
      sources: ['def.weingarten-map', 'def.principal-curvature'],
      target: 'thm.rodrigues',
      title: '形状算子 $\\implies$ Rodrigues 定理',
      proof: [
        '记 $u := \\mathrm{d}r(v) \\ne 0$。$v$ 是主方向，按定义就是 $u$ 是 $W$ 的特征向量：$W(u) = k\\,u$，其中 $k$ 是对应的主曲率。由 $W = -\\mathrm{d}n$，$W(u) = -\\mathrm{d}n(v)$，于是 $W(u) = k\\,u \\iff \\mathrm{d}n(v) = -k\\,\\mathrm{d}r(v)$，即 (1)$\\iff$(2)。',
        '',
        '(2)$\\iff$(3)：$k_{n}$ 在单位向量上取驻值 $\\iff$ 存在 $k$ 使 $II(v,\\cdot) = k\\,I(v,\\cdot)$（Lagrange 乘子）$\\iff$ $\\langle W(\\mathrm{d}r(v)), \\mathrm{d}r(\\cdot)\\rangle = k\\langle \\mathrm{d}r(v), \\mathrm{d}r(\\cdot)\\rangle$ $\\iff$ $W(u) = k\\,u$。而这时 $k_{n}(v) = II(v,v)/I(v,v) = k$，故驻值恰是对应主曲率。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-euler',
      kind: 'implication',
      sources: ['def.principal-curvature', 'def.weingarten-map'],
      target: 'thm.euler-formula-surface',
      title: '谱定理 $\\implies$ Euler 公式',
      proof: [
        '主方向标架下 $W(e_{1}) = k_{1}e_{1}$、$W(e_{2}) = k_{2}e_{2}$，且 $e_{1}\\perp e_{2}$、$\\lVert e_{1}\\rVert = \\lVert e_{2}\\rVert = 1$（`thm.rodrigues` 给出特征向量的几何意义）。设单位向量 $V = \\cos\\theta\\,e_{1}+\\sin\\theta\\,e_{2}$，则',
        '',
        '$$k_{n}(V) = \\langle W(V), V\\rangle = \\Bigl\\langle k_{1}\\cos\\theta\\,e_{1}+k_{2}\\sin\\theta\\,e_{2},\\ \\cos\\theta\\,e_{1}+\\sin\\theta\\,e_{2}\\Bigr\\rangle = k_{1}\\cos^{2}\\theta+k_{2}\\sin^{2}\\theta .$$',
        '',
        '最后一步只用 $e_{1}, e_{2}$ 的单位正交性：$\\langle e_{1}, e_{2}\\rangle = 0$ 把交叉项消掉。∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-curvlines',
      kind: 'implication',
      sources: ['thm.rodrigues', 'def.principal-curvature'],
      target: 'prop.curvature-lines',
      title: 'Rodrigues 定理 $\\implies$ 曲率线网的判别法',
      proof: [
        '以下都在非脐点处（$k_{1} \\ne k_{2}$）。',
        '',
        '**($\\Longleftarrow$)** 设 $F = M = 0$。$F = 0$ 给出 $r_{u}\\perp r_{v}$；$M = II(r_{u}, r_{v}) = 0$ 说明交叉项为零。记 $\\varepsilon_{1}, \\varepsilon_{2}$ 为 $r_{u}, r_{v}$ 单位化后的向量，则 $\\{\\varepsilon_{1}, \\varepsilon_{2}\\}$ 是正交基且 $II(\\varepsilon_{1}, \\varepsilon_{2}) = 0$，即 $\\langle W(\\varepsilon_{1}), \\varepsilon_{2}\\rangle = 0$，故 $W(\\varepsilon_{1})\\parallel\\varepsilon_{1}$；同理 $W(\\varepsilon_{2})\\parallel\\varepsilon_{2}$。两条坐标曲线都是曲率线（`thm.rodrigues` 的 (1)$\\iff$(2)）。',
        '',
        '**($\\implies$)** 设 $r_{u}, r_{v}$ 都是主方向。非脐点处两个主方向对应不同特征值，谱定理给出正交性，故 $F = \\langle r_{u}, r_{v}\\rangle = 0$；又',
        '',
        '$$M = II(r_{u}, r_{v}) = \\langle W(r_{u}), r_{v}\\rangle = k_{1}\\langle r_{u}, r_{v}\\rangle = 0 .$$',
        '',
        '（脐点处上面第二种推法失效，这也正是判别法要排除 $k_{1} = k_{2}$ 的原因。）∎'
      ].join('\n')
    },

    {
      id: 'imp.dg-fundamental',
      kind: 'implication',
      sources: ['thm.structure-equations', 'thm.gauss-equation', 'thm.codazzi-mainardi'],
      target: 'thm.fundamental-theorem-surfaces',
      title: '结构方程 $+$ Gauss–Codazzi $\\implies$ 曲面论基本定理',
      proof: [
        '**必要性**：任何曲面都满足 Gauss 与 Codazzi（前面两条定理），因为 $\\mathbb{R}^{3}$ 的曲率形式恒为零。',
        '',
        '**充分性（构造）**：给定 $g, h$。',
        '',
        ['1. 由 $g$ 取正交余标架 $\\omega^{1}, \\omega^{2}$（使 $g = (\\omega^{1})^{2}+(\\omega^{2})^{2}$，代数地可取），第一结构方程 $\\mathrm{d}\\omega^{1} = \\omega^{2}\\wedge\\omega^{1}_{\\ 2}$、$\\mathrm{d}\\omega^{2} = -\\omega^{1}\\wedge\\omega^{1}_{\\ 2}$ 唯一确定 $\\omega^{1}_{\\ 2}$。',
         '2. 令 $c := -h$、$\\omega^{i}_{\\ 3} := \\sum_{j}c_{ij}\\omega^{j}$。Gauss 方程保证 $\\Omega^{1}_{\\ 2} = \\omega^{1}_{\\ 3}\\wedge\\omega^{2}_{\\ 3}$（即 $\\Omega^{1}_{\\ 2}$ 与曲率一致），Codazzi 保证 $\\Omega^{i}_{\\ 3} = 0$；连同第 1 步已经满足的 $\\Omega^{i}_{\\ j} = 0$，得到**全部**分量 $\\Omega^{i}_{\\ j} = 0$，也就是整套结构方程的 $\\mathrm{d}^{2} = 0$ 都成立。',
         '3. 于是线性方程组 $\\mathrm{d}e_{i} = \\sum_{j}\\omega^{j}_{\\ i}e_{j}$ 满足 Frobenius 可积性条件，在单连通 $U$ 上局部有解；因 $\\omega^{i}_{\\ j}$ 反称，$\\langle e_{i}, e_{j}\\rangle$ 的导数全为零，初值取标准正交即保证解处处正交。',
         '4. 再解 $\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$：相容性 $\\mathrm{d}(\\omega^{i}e_{i}) = 0$ 正是第一结构方程，已成立；单连通给出 $r$。',
         '5. 验证：$I = \\sum_{i}(\\omega^{i})^{2} = g$（第 1 步的取法），$II = -\\sum_{i}\\omega^{i}\\omega^{i}_{\\ 3} = \\sum_{i,j}h_{ij}\\omega^{i}\\omega^{j} = h$（第 2 步的取法 $c = -h$）。'].join('\n'),
        '',
        '**唯一性**：两解 $(r, e_{i})$ 与 $(\\tilde r, \\tilde e_{i})$ 的 $\\omega$ 相同，故它们的相对变换是常数（平行的正交变换），再配一次平移即重合。∎'
      ].join('\n')
    }

  ]
});

