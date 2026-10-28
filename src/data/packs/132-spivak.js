/* ==========================================================================
   内容包 · Spivak《Calculus on Manifolds》：链上的积分 → 流形上的积分 → 体积形式
   --------------------------------------------------------------------------
   16 个节点 / 28 条边（19 条定义引用 + 9 条推导）。星团全部落在 diffgeom.manifold：

     §A 方块、链与边界（5 点）
        带边流形 → 奇异方块 → 奇异链 → 边界算子 → 边界的符号约定
        + 边界算子平方为零
     §B 链上的积分（2 点）
        链上的积分（拉回到方块上积）/ 积分对形式与链的双线性
     §C 链版 Stokes（2 点）
        单个方块上的 Stokes（归纳引擎）/ 链上的 Stokes 定理
     §D 体积形式（3 点）
        体积形式 / 可定向等价于存在处处非零的顶次形式 / 黎曼体积测度
     §E 散度与换元（3 点）
        散度 / 散度定理 / 流形上的换元公式

   ⚠️ 与 129-diffgeom-tu.js 的分工：那边有微分形式、外微分、拉回、形式的积分
      （`def.integral-form`）与流形版 Stokes（`thm.stokes`）。本包**不重建**任何一个，
      只补三处空白：① 方块与链这套记账（Spivak 的独门工具）；② 体积形式与体积测度；
      ③ 散度与换元公式。所有新节点都只用**已有的** id 当上游，悬空边为零。

   ⚠️ 符号约定（与 `def.boundary-manifold`、`prop.boundary-sign-convention`、
      `thm.stokes` 三处必须一致，改一处就要三处一起改）：
      · 半空间：$\mathbb{H}^{n} = \{x^{n}\le 0\}$，外法向在 $\partial\mathbb{H}^{n}$ 上是 $+e_{n}$；
      · 标准方块：$I^{k} = [0,1]^{k}$；插入映射 $I^{k}_{(i,\alpha)}$ 把 $\alpha$ 插在第 $i$ 处；
      · 边界：$\partial c = \sum_{i,\alpha}(-1)^{i+\alpha}c_{(i,\alpha)}$ —— 这套符号
        **等价于**「外法向在前」的诱导定向（`prop.boundary-sign-convention` 给的正是这条）；
      · 定向：$\partial M$ 取诱导定向；$\mathrm{d}V$ 在正向标准正交基上取 $1$。

   ⚠️ refs 只写「章名 + 结果名」，不写编号（对 Spivak 的分章有把握，对编号没有）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'Spivak：链上的积分、体积形式与散度定理',

  nodes: [

    /* ======================================================================
       §A 方块、链与边界（diffgeom.manifold）
       ====================================================================== */

    {
      id: 'def.boundary-manifold',
      cluster: 'diffgeom.manifold',
      type: 'definition',
      label: '带边流形',
      title: '带边流形与边界',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '流形', '带边流形', '边界'],
      statement: [
        '**在做什么**：把一个方向上砍掉一边，让「闭区间」「闭圆盘」这类带边的对象也成了流形 —— 有了它，「边界」才能有自己的维度、自己的积分、自己的 $(n-1)$ 维几何。',
        '',
        '记**半空间**',
        '',
        '$$\\mathbb{H}^{n} := \\{x\\in\\mathbb{R}^{n} : x^{n}\\le 0\\},\\qquad \\partial\\mathbb{H}^{n} = \\{x\\in\\mathbb{R}^{n} : x^{n} = 0\\}.$$',
        '',
        '**$n$ 维带边流形**是一个 Hausdorff、第二可数拓扑空间 $M$，带一族卡 $(U,\\varphi)$：每个 $U\\subseteq M$ 开，$\\varphi : U\\to\\varphi(U)$ 是同胚，$\\varphi(U)$ 是 $\\mathbb{H}^{n}$ 的**开**子集，且任意两张卡的转移映射 $\\psi\\circ\\varphi^{-1}$ 光滑。',
        '',
        '$p\\in M$ 叫**内点**，如果存在一张卡使 $\\varphi(p)^{n}<0$；否则叫**边界点**。这两类与卡的选取无关。全部边界点记 $\\partial M$，全部内点记 $\\operatorname{Int}M$。',
        '',
        '$\\partial M$ 自带一个 $(n-1)$ 维**无边**光滑流形结构：把每张卡与 $\\partial\\mathbb{H}^{n}$ 求交，$\\varphi$ 限制成 $U\\cap\\partial M\\to\\{x^{n} = 0\\}\\cong\\mathbb{R}^{n-1}$，重叠处的转移映射仍是光滑映射的限制。若 $M$ 本身是无边流形，则 $\\partial M = \\emptyset$。'
      ].join('\n'),
      notes: [
        '**「内点 / 边界点」为什么与卡无关**：设某张卡给 $\\varphi(p)^{n}<0$、另一张给 $\\psi(p)^{n} = 0$。则 $h := \\psi\\circ\\varphi^{-1}$ 是开集之间的微分同胚，把点 $\\varphi(p)\\in\\{x^{n}<0\\}$ 送到 $\\{x^{n} = 0\\}$ 上。但 $\\varphi(p)$ 有一个整个含在 $\\{x^{n}<0\\}$ 里的开球邻域，其像必含在 $\\{x^{n} = 0\\}$ 里 —— 而后者没有内点，矛盾。所以「是不是边界点」属于 $M$，不属于坐标。',
        '',
        '**为什么用半空间而不是球**：半空间白送一张坐标（$x^{1},\\ldots,x^{n-1}$ 沿边、$x^{n}$ 指向内部），「边界」在坐标里就是一条方程 $x^{n} = 0$，要证的东西一步到位。球模型还得额外证明球面那块是流形，白干一遍。',
        '',
        '**边界不是「拓扑边界」**：$\\partial M$ 是内蕴的一层 $(n-1)$ 维皮，与有没有谁来包着 $M$ 无关；拓扑意义上的边界要靠 $M$ 先嵌在某个空间里才谈得上。两者只在嵌入的情形下碰头。',
        '',
        '**⚠️ 定向的约定（只在用到时交代）**：$\\partial M$ 的**诱导定向**取「外法向在前」—— 若 $(v_{1},\\ldots,v_{n-1})$ 是 $T_{p}\\partial M$ 的基，它为正，当且仅当 $(N,v_{1},\\ldots,v_{n-1})$ 是 $T_{p}M$ 的正向基，$N$ 是外单位法向。取 $\\mathbb{H}^{n}$ 的标准坐标时，这条等价于「用 $x^{1},\\ldots,x^{n-1}$ 的次序当定向，但与诱导定向差 $(-1)^{n-1}$」。这个符号在 `prop.boundary-sign-convention` 里会再出现一次，两处必须一致。',
        '',
        '**⚠️ 边界的边界是空的**：$\\partial(\\partial M) = \\emptyset$，因为 $\\partial M$ 是无边流形（它的卡值域落在 $\\mathbb{R}^{n-1}$ 的开集里）。这一条让 Stokes 型公式能反复用而不会冒出「边界的边界」那一项。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 带边流形与边界',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 几何预备：奇异方块与半空间'
      ]
    },

    {
      id: 'def.singular-cube',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '奇异方块',
      regions: ['diffgeom'],
      title: '奇异方块',
      tags: ['定义', '微分几何', '链', '奇异方块', '参数化'],
      statement: [
        '**在做什么**：把一个标准方块光滑地放进流形，得到一张允许退化的参数片 —— 积分就挂在这样的参数片上，而它的「面」有整齐的编号。',
        '',
        '设 $M$ 是 $n$ 维光滑流形。$M$ 里的一个 **$k$ 维奇异方块**是一个映射',
        '',
        '$$c : [0,1]^{k}\\longrightarrow M ,$$',
        '',
        '它在一个含 $[0,1]^{k}$ 的开集上光滑（等价地：在某张卡里每个分量光滑）。$k = 0$ 时 $[0,1]^{0}$ 是一个点，$0$-方块就是 $M$ 里的一个点。',
        '',
        '「**奇异**」说的是 $\\mathrm{d}c_{p}$ 不必满秩：$c$ 可以自交、可以把某个方向压成零；它不必是单射，也不必是浸入。压扁了照样是合法的方块，只是像集不再是子流形。',
        '',
        '记 $Q_{k}(M)$ 为 $M$ 里全体 $k$-方块。$M$ 上的 $k$-形式 $\\omega$ 沿 $c$ 拉回到 $[0,1]^{k}$，这就是「形式在方块上积分」的入口。'
      ].join('\n'),
      notes: [
        '**为什么是方块不是单纯形**：单纯形有 $k+1$ 个面（丢一个顶点得到一个），方块有 $2k$ 个面（把某一个坐标钉在两端之一得到一个）。方块赢在两处：面与坐标轴一一对应，于是符号 $(-1)^{i+\\alpha}$ 里的 $i$ 就是轴号；而且方块本身自带 Lebesgue 测度与标准定向，在它上面积分不必另行选取定向。',
        '',
        '**光滑到边界**：$c$ 只在闭方块上有定义，所以「光滑」必须解释成「能延拓到某个开邻域上光滑」。这个延拓不必唯一，但任何与积分有关的量都只看 $[0,1]^{k}$ 上的值，而边界是零测集，所以不产生歧义。',
        '',
        '**退化不是病**：常值方块（整个 $[0,1]^{k}$ 映成一点）也允许，它对积分贡献零。允许退化换来的是「任意光滑映射都能当方块用」，不必先证明像集是子流形 —— 这是链这套记账比「子流形」省事的地方。',
        '',
        '**与切空间的关系**：$\\mathrm{d}c_{p} : \\mathbb{R}^{k}\\to T_{c(p)}M$ 是切映射（`def.tangent-space-manifold` 里那个）。满秩时它是浸入，像集局部是 $k$ 维子流形；不满秩时正是「奇异」二字所指。',
        '',
        '**⚠️ 记号**：有的书把方块写成 $c : I^{k}\\to M$ 并默认 $I = [0,1]$，有的用 $[a,b]$。本图一律取 $I = [0,1]$，与 $\\partial c$ 的符号约定配套。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 奇异方块与链',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 几何预备'
      ]
    },

    {
      id: 'def.singular-chain',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '奇异链',
      title: '奇异链',
      tags: ['定义', '微分几何', '链', '形式和', '奇异方块'],
      regions: ['diffgeom'],
      statement: [
        '**在做什么**：把若干张方块按整数系数叠起来，得到一条「链」——「带符号地相加」成了合法对象，边界与积分都能线性地作用上去。',
        '',
        '设 $M$ 是光滑流形。$M$ 上的一条 **$k$-链**是形式和',
        '',
        '$$c = \\sum_{i=1}^{N}n_{i}\\,c_{i},\\qquad n_{i}\\in\\mathbb{Z},\\ c_{i}\\in Q_{k}(M),$$',
        '',
        '其中 $N<\\infty$。全体 $k$-链记 $C_{k}(M)$，加法按系数相加，它与整数标量构成一个自由阿贝尔群，基就是全体 $k$-方块。',
        '',
        '**有限性是定义的一部分**：和只有有限多项，这样每次写 $\\partial c$、$\\int_{c}\\omega$ 都是有限和，不必讨论收敛。',
        '',
        '系数取整数（不取实数）：链是**几何的记账**，权重是为「定向」「重数」「相消」服务的，不是权重测度。积分对链线性，所以整数系数已经够用。'
      ].join('\n'),
      notes: [
        '**为什么要有链**：单个方块的边界是一条链（$2k$ 个面），一条链的边界可能又是一条链的边界 —— 想写「$\\partial^{2} = 0$」就必须先允许「有限和」这种对象存在。链就是把「和」提前造好的最小代价。',
        '',
        '**⚠️ 与序论里那个「链」无关**：这里说的是同调代数里的 chain，不是偏序集的 chain。同一个中文词，两个不相干的概念 —— 本图的节点 id 也因此分开（那个是 `def.chain`）。',
        '',
        '**细分不改积分**（这里只用其精神）：把 $[0,1]^{k}$ 用网格切成小方块，$c$ 限制在每块上给出小方块，它们的和与 $c$ 在积分上等价。这条在「把流形剖分成链」时用到，本图的 Stokes 定理两版对照就靠它。',
        '',
        '**与同调的关系**：$C_{k}(M)$ 配上 $\\partial$ 是链复形，取同调就是奇异同调 $H_{k}(M)$。本图只用「链能积分」这一面，不取同调 —— 闭链与恰当形式配对那条线属于另一支内容。',
        '',
        '**⚠️ 记号**：本图不区分「奇异链」与「链」两种写法，一律写 $k$-链；系数默认在 $\\mathbb{Z}$ 里，需要实数时临时说明。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 奇异链与链上的运算',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 代数预备'
      ]
    },

    {
      id: 'def.boundary-operator',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '边界算子',
      title: '边界算子',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '链', '边界算子', '面映射'],
      statement: [
        '**在做什么**：「把方块的一个面取出来」这件事有统一的写法：固定某个坐标为此端或彼端，再乘一个符号，全部加起来就是边界。',
        '',
        '**插入映射**：对 $1\\le i\\le k$、$\\alpha\\in\\{0,1\\}$ 定义',
        '',
        '$$I^{k}_{(i,\\alpha)} : I^{k-1}\\longrightarrow I^{k},\\qquad (x^{1},\\ldots,x^{k-1})\\longmapsto(x^{1},\\ldots,x^{i-1},\\alpha,x^{i},\\ldots,x^{k-1}).$$',
        '',
        '对 $k$-方块 $c$，记 $c_{(i,\\alpha)} := c\\circ I^{k}_{(i,\\alpha)}$，它是 $(k-1)$-方块，叫 $c$ 的**第 $(i,\\alpha)$ 面**。',
        '',
        '**边界算子** $\\partial$ 先把方块送到「面的带符号和」，再线性延拓到链：',
        '',
        '$$\\partial c := \\sum_{i=1}^{k}\\sum_{\\alpha=0}^{1}(-1)^{i+\\alpha}\\,c_{(i,\\alpha)},\\qquad \\partial\\Bigl(\\sum_{l}n_{l}c_{l}\\Bigr) := \\sum_{l}n_{l}\\,\\partial c_{l}.$$',
        '',
        '约定 $k = 0$ 时 $\\partial c := 0$（点是零维的，没有面）。于是 $\\partial : C_{k}(M)\\to C_{k-1}(M)$ 是群同态。'
      ].join('\n'),
      notes: [
        '**符号 $(-1)^{i+\\alpha}$ 是谁给的**：它不是硬凑的。取外法向为 $+\\partial_{i}$ 的那一端（即 $\\alpha = 1$）与取 $(-1)^{i+1}$，另一端的法向是 $-\\partial_{i}$、符号是 $(-1)^{i}$，两端的差别正好就是「把外法向搬到最前面要跨过 $i-1$ 个坐标」的那个置换符号。完整的验算在 `prop.boundary-sign-convention` 里 —— 结论是这套符号与「外法向在前」的诱导定向**逐面相同**。',
        '',
        '**$2k$ 个面**：$i$ 取 $k$ 个值、$\\alpha$ 取两端，共 $2k$ 个 $(k-1)$-方块。它们不是两两不同的映射，但作为链的项是两两不同的（别处可以重合，作为映射不能）。',
        '',
        '**平方为零**：见 `prop.boundary-squared-zero`。这是整套记账能用的关键 —— 它保证「边界没有边界」，于是 Stokes 定理两边不会多出一层。',
        '',
        '**为什么线性延拓而不是逐项定义**：链已经是形式和，$\\partial$ 若不同态就没法算 $\\partial(c_{1}+c_{2})$，而 Stokes 定理要对链成立就必须要这一条。',
        '',
        '**⚠️ 记号陷阱**：$\\partial$ 同时用来表示半空间的边界（$\\partial\\mathbb{H}^{n}$）、流形的边界（$\\partial M$）与链的边界（$\\partial c$）。三种用法在 `prop.boundary-sign-convention` 之后统一：对保向方块，链的边界与流形边界逐面一致。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 方块的边界与边界算子',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 插入映射与面'
      ]
    },

    {
      id: 'prop.boundary-squared-zero',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '边界算子平方为零',
      title: '边界算子平方为零',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '链', '边界算子', '链复形'],
      statement: [
        '**在做什么**：连续取两次边界，什么也不剩。这一条把链变成链复形，也是 Stokes 定理两边能对上的代数前提。',
        '',
        '对任意 $k$-链 $c$（$k\\ge 0$）有',
        '',
        '$$\\partial(\\partial c) = 0 .$$',
        '',
        '于是 $(C_{k}(M),\\partial)$ 是一个链复形：$\\partial^{2} = 0$ 等价于 $\\operatorname{im}\\partial \\subseteq \\ker\\partial$，「闭链」比「边界」大出来的那一部分才是同调。',
        '',
        '按 $\\partial$ 的定义，这件事对每条链都必须成立，所以只需对单个方块证明；再用线性延拓推广到链。'
      ].join('\n'),
      notes: [
        '**几何上的意思**：一条曲线段的两个端点，各自没有端点；一个方块的四条边，边角的顶点在两条边里各出现一次、符号相反，正好抵消。高维是同一件事的组合版本：每个 $(k-2)$ 维的「棱」被两个不同的面共用，两处的符号相反。',
        '',
        '**与 $\\mathrm{d}^{2} = 0$ 的对称性**：$\\partial$ 把维数降一，$\\mathrm{d}$ 把次数升一，两者都平方为零，而且 $\\int$ 把 $\\partial$ 与 $\\mathrm{d}$ 配成对偶（`thm.stokes-chain`）。这条对称性是整个链上的微积分的骨架。',
        '',
        '**⚠️ 别指望「取一次面再取一次面」总是有定义**：第二步是在 $(k-1)$ 个坐标里取，编号已经变过一次了。证明里的全部内容就是把这个「编号移位」算清 —— 这也是初学者写错符号的固定位置。',
        '',
        '**⚠️ 反例的边界在哪**：若把符号换成不随 $i$ 变的（比如全部取 $+1$），$(k-2)$ 维棱会被两个面各算一次、符号相同，和不为零。所以 $(-1)^{i+\\alpha}$ 这个「交替性」是必需的，不是装饰。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 边界的平方为零',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 链复形'
      ]
    },

    {
      id: 'prop.boundary-sign-convention',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '边界的符号约定',
      title: '代数边界与诱导定向的边界一致',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '链', '边界', '定向', '符号约定'],
      statement: [
        '**在做什么**：把两个「边界」对齐 —— 一个是方块上按坐标编号定出来的代数边界 $\\partial c$，一个是带边流形上按「外法向在前」定出来的几何边界。它们相差的正是那串符号 $(-1)^{i+\\alpha}$。',
        '',
        '设 $M$ 是定向 $n$ 维带边流形，$c : I^{n}\\to M$ 是保向的微分同胚，把 $I^{n}$ 映到自己的像上（像是一个带边的 $n$ 维区域，$I^{n}$ 取标准定向）。则对每个面 $(i,\\alpha)$：把 $c_{(i,\\alpha)}$ 看成 $\\partial M$ 的像上的参数化，**它与 $\\partial M$ 的诱导定向相符，当且仅当 $(-1)^{i+\\alpha} = +1$**。',
        '',
        '换句话说：把所有面按诱导定向重新排一次符号，得到的链就是',
        '',
        '$$\\partial c = \\sum_{i=1}^{n}\\sum_{\\alpha=0}^{1}(-1)^{i+\\alpha}\\,c_{(i,\\alpha)} .$$',
        '',
        '所以「代数边界」与「几何边界」不是两套约定，是同一套：符号已经写在 $\\partial c$ 的系数里了。'
      ].join('\n'),
      notes: [
        '**为什么这条重要**：流形版的 Stokes 定理（`thm.stokes`）用的是几何边界（诱导定向），链版的 Stokes 定理（`thm.stokes-chain`）用的是代数边界（$\\partial c$）。两者能写成同一个公式，全靠这个命题。它也是散度定理里那个「外法向 + 诱导定向」符号的真正出处。',
        '',
        '**$n = 1$ 的验算**：$I^{1} = [0,1]$，$\\partial c = -c_{(1,0)}+c_{(1,1)} = c(1)-c(0)$。而 $0$ 维的诱导定向里，$x = 1$ 那端（外法向 $+e_{1}$）为正、$x = 0$ 那端为负。逐项相符。',
        '',
        '**$n = 2$ 的验算**：$\\partial c = -c_{(1,0)}+c_{(1,1)}+c_{(2,0)}-c_{(2,1)}$。四条边分别是左、右、下、上；右边（$\\alpha = 1$，外法向 $+e_{1}$）取 $+$，左边（外法向 $-e_{1}$）取 $-$，下边（外法向 $-e_{2}$）取 $+$，上边（外法向 $+e_{2}$）取 $-$。按「外法向在前」逐个核对，四条全部相符 —— 而四条边的走向正好构成逆时针一圈。',
        '',
        '**⚠️ 顺序容易抄错的方向**：证明里比较的是「面自身的基在 $\\mathbb{R}^{n}$ 里与 $N$ 拼起来后的行列式」，不是「面的基与 $N$ 的叉积方向」。前者是纯代数、可逐项验算；后者只在三维有直觉。三维以下的直觉可以帮忙记，但不能当证明。',
        '',
        '**⚠️ 保向性不能丢**：若 $c$ 反向，则每个面都多一个负号，命题的结论整体差一个号。所以命题的前提写成「$c$ 保向」，而不是「$c$ 是微分同胚」。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 方块的边界与定向',
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 边界的诱导定向'
      ]
    },

    /* ======================================================================
       §B 链上的积分（diffgeom.manifold）
       ====================================================================== */

    {
      id: 'def.integral-on-chain',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '链上的积分',
      title: '链上的积分',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '链', '积分', '拉回'],
      statement: [
        '**在做什么**：链上的积分不是一种新积分 —— 把形式沿方块拉回坐标里，剩下的就是一个普通的重积分。方块自带的坐标次序就是它的定向，所以不必另外选定向。',
        '',
        '设 $c : I^{k}\\to M$ 是 $k$-方块，$\\omega$ 是定义在 $c$ 的像的某个邻域上的 $k$-形式。在 $I^{k}$ 上 $c^{\\ast}\\omega$ 仍是 $k$-形式，而 $k$ 维区域的 $k$-形式只有一个分量，故存在唯一的 $f\\in C^{\\infty}(I^{k})$ 使',
        '',
        '$$c^{\\ast}\\omega = f\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k}.$$',
        '',
        '定义方块上的积分',
        '',
        '$$\\int_{c}\\omega := \\int_{I^{k}}f = \\int_{0}^{1}\\cdots\\int_{0}^{1}f(x)\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{k},$$',
        '',
        '再对链线性延拓：',
        '',
        '$$\\int_{\\sum_{l}n_{l}c_{l}}\\omega := \\sum_{l}n_{l}\\int_{c_{l}}\\omega .$$',
        '',
        '$k = 0$ 的约定：$0$-方块是点 $p$，$0$-形式是函数，$\\int_{p}F := F(p)$，$\\int_{\\sum n_{l}p_{l}}F := \\sum_{l}n_{l}F(p_{l})$。'
      ].join('\n'),
      notes: [
        '**系数 $f$ 是什么**：$f = c^{\\ast}\\omega(\\partial_{1},\\ldots,\\partial_{k})$，即把方块坐标方向的切向量喂给拉回的形式。它是光滑函数，边界上的值由 $c$ 的光滑延拓决定，零测集不影响积分。',
        '',
        '**为什么不需要定向**：方块的坐标次序已经钉死了定向 —— $\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k}$ 在 $I^{k}$ 上就是标准定向。想让方块「反向走」，就把某个坐标换成 $1-x^{i}$；此时 $c^{\\ast}\\omega$ 自动变号，不需要额外规则。所以「定向」这件事在链这一侧被吃进了参数化里。',
        '',
        '**与 `def.integral-form` 的分工**：那边是「$n$-形式在**开集**上积分」，要单位分解才能拼到流形上；这边是「$k$-形式沿**一张方块**积分」，一次重积分到底。整体的意思交给链（求和），不交给单位分解 —— 这是 Spivak 这套记账最省事的地方。',
        '',
        '**⚠️ 次数必须匹配**：$k$-形式只配得上 $k$-链。$j$-形式沿 $k$-方块拉回（$j<k$）仍有意义，但那是 $k$ 维区域上的 $j$-形式，积不出来；$j>k$ 时拉回直接为零。所以「链与形式的配对」只在次数相等时有定义。',
        '',
        '**⚠️ 退化方块**：若 $c$ 不满秩，$c^{\\ast}\\omega$ 可以是零（比如 $c$ 常值），积分自然为零。定义不需要为退化情形打补丁。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 方块与链上的积分',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 拉回与积分'
      ]
    },

    {
      id: 'prop.integral-chain-linear',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '链上积分的双线性',
      title: '链上积分对形式与对链都线性',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '链', '积分', '双线性'],
      statement: [
        '**在做什么**：把「链上的积分」说成一个配对 —— 左边是链、右边是形式、结果是一个数，两头都线性。这条双线性是后面所有求和与拆分的许可证。',
        '',
        '设 $c$ 是 $M$ 上的 $k$-链，$\\omega,\\eta$ 是 $k$-形式，$a,b\\in\\mathbb{R}$。则',
        '',
        '$$\\int_{c}(a\\,\\omega+b\\,\\eta) = a\\int_{c}\\omega+b\\int_{c}\\eta ,\\qquad \\int_{a\\,c+b\\,c\'}\\omega = a\\int_{c}\\omega+b\\int_{c\'}\\omega .$$',
        '',
        '特别地 $\\int_{-c}\\omega = -\\int_{c}\\omega$（系数为 $-1$ 的链就是「反向走」）。',
        '',
        '于是积分是一个双线性配对',
        '',
        '$$C_{k}(M)\\times\\Omega^{k}(M)\\longrightarrow\\mathbb{R},$$',
        '',
        '左边是几何的（方块与它们的和），右边是对偶的（形式与它们的和）。'
      ].join('\n'),
      notes: [
        '**为什么这条值得单独立一个节点**：它是所有「拆开算」的操作的合法依据 —— 把 $\\omega$ 拆成分量、把链拆成方块、把区域拆成小块，用的都是这两条线性。没有它，Stokes 定理只能对单块陈述，说不出「对链成立」。',
        '',
        '**配对的观点**：$\\Omega^{k}(M)$ 是实数域上的向量空间（维数无穷），$C_{k}(M)$ 是自由阿贝尔群；两者配对到 $\\mathbb{R}$，且各自线性。对偶的方向是「$\\mathrm{d}$ 升次数、$\\partial$ 降次数」，而 $\\int$ 正是把这一对对偶串起来的那个括号（`thm.stokes-chain`）。',
        '',
        '**⚠️ 反对称性不是「反对称」**：$\\int_{-c} = -\\int_{c}$ 说的是链的系数为负，不是「交换两个变元变号」。链与形式之间不存在交换律 —— 它们的类型不同。',
        '',
        '**⚠️ 系数域**：链的系数在 $\\mathbb{Z}$ 里（`def.singular-chain`），形式的系数在 $\\mathbb{R}$ 里。这里两者都按实数看待，取整数值只是链的记账习惯；讨论同调时会回到 $\\mathbb{Z}$。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 链上积分的线性',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 链与形式的配对'
      ]
    },

    /* ======================================================================
       §C 链版 Stokes（diffgeom.manifold）
       ====================================================================== */

    {
      id: 'lem.single-cube-stokes',
      cluster: 'diffgeom.form',
      type: 'lemma',
      label: '方块上的 Stokes 公式',
      title: '单个方块上的 Stokes 公式',
      regions: ['diffgeom'],
      tags: ['引理', '微分几何', 'Stokes 定理', '标准方块', '外微分'],
      statement: [
        '**在做什么**：把 Stokes 定理先在一块标准方块上算穿 —— 左边是一个重积分、右边是 $2k$ 个面上的积分，两边逐项对上。全部符号约定都在这一步被验完。',
        '',
        '设 $\\eta$ 是定义在含 $I^{k} = [0,1]^{k}$ 的开集上的 $(k-1)$-形式（$k\\ge 1$）。则',
        '',
        '$$\\int_{I^{k}}\\mathrm{d}\\eta = \\int_{\\partial I^{k}}\\eta ,$$',
        '',
        '其中 $I^{k}$ 取标准定向，$\\partial I^{k}$ 按 `def.boundary-operator` 的符号约定理解为一条 $(k-1)$-链。',
        '',
        '$k = 1$ 时它就是微积分基本定理：$\\int_{0}^{1}F^{\\prime}(t)\\,\\mathrm{d}t = F(1)-F(0)$。'
      ].join('\n'),
      notes: [
        '**证明的骨架**：把 $\\eta$ 按缺哪个 $\\mathrm{d}x^{j}$ 拆成 $k$ 项，每项是一个一元积分；$\\mathrm{d}\\eta$ 是 $\\sum_{j}\\partial_{j}f_{j}$。对每个 $j$ 用一元基本定理把 $x^{j}$ 那层积完，剩下的正好是第 $j$ 个坐标两端的面积分之差。右边逐面拉回时只有 $j$ 与面号相同的那一项活着 —— 两个符号相乘恰好对上。完整计算见边 `imp.spivak-cube-stokes`。',
        '',
        '**为什么这一块必须先做**：一般方块 $c$ 上的情形全靠拉回（$c^{\\ast}\\mathrm{d} = \\mathrm{d}c^{\\ast}$），拉回之后就是本引理。所以本引理是链版 Stokes 的**唯一**实质内容，其余都是翻译。',
        '',
        '**⚠️ 符号最容易错的地方**：$\\eta$ 写成 $\\sum_{j}(-1)^{j-1}f_{j}\\mathrm{d}x^{1}\\wedge\\cdots\\widehat{\\mathrm{d}x^{j}}\\cdots\\wedge\\mathrm{d}x^{k}$（带帽表示略去该因子）时，$\\mathrm{d}\\eta = \\sum_{j}\\partial_{j}f_{j}\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k}$ 里**没有**额外符号。若这里多写一个 $(-1)^{j-1}$，右边就会整个错位面。',
        '',
        '**⚠️ 边界上的零测集**：$\\eta$ 只要求定义在开集上、连续到边界；逐面拉回时用的是 $\\eta$ 在面上的值，而 $\\partial I^{k}$ 是零测集，所以积分不受延拓方式影响。',
        '',
        '**与经典公式的关系**：$k = 2$ 时它就是 Green 公式；$k = 3$ 时是 Kelvin–Stokes（环量形式）。这两个都是本引理的特例，不是另外的定理。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 方块上的 Stokes 公式',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 微积分基本定理的高维形式'
      ]
    },

    {
      id: 'thm.stokes-chain',
      cluster: 'diffgeom.form',
      type: 'theorem',
      label: '链上的 Stokes 定理',
      title: '链上的 Stokes 定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', 'Stokes 定理', '链', '外微分', '边界'],
      statement: [
        '**在做什么**：一个 $(k-1)$-形式在**边界链**上的积分，等于它的外微分在**链**上的积分。它是微积分基本定理、Green 公式、Gauss 公式、Kelvin–Stokes 的共同祖先。',
        '',
        '设 $c$ 是 $M$ 上的一条 $k$-链（$k\\ge 1$），$\\omega$ 是定义在 $c$ 的像的某个邻域上的 $(k-1)$-形式。则',
        '',
        '$$\\int_{\\partial c}\\omega = \\int_{c}\\mathrm{d}\\omega .$$',
        '',
        '**与流形版的关系**（`thm.stokes`）写清：流形版要求 $M$ 紧致、可定向、带边，$\\omega$ 定义在 $M$ 上；链版不要 $M$ 可定向、不要紧致、不要 $\\omega$ 有紧支，代价是把「流形」换成了「链」。两者互为特例 —— 把 $M$ 剖分成（或细分成）一条覆盖它的 $n$-链，链版逐项相加就是流形版；反过来，把流形版限制在一块保向参数方块上，就是链版的单块情形。',
        '',
        '$k = 1$、$c = \\gamma : [0,1]\\to\\mathbb{R}$ 时：$\\partial\\gamma = \\gamma(1)-\\gamma(0)$，公式变成 $F(\\gamma(1))-F(\\gamma(0)) = \\int_{0}^{1}(F^{\\prime}\\circ\\gamma)\\,\\gamma^{\\prime}\\,\\mathrm{d}t$，正是微积分基本定理。'
      ].join('\n'),
      notes: [
        '**证明只有三行**：$\\int_{c}\\mathrm{d}\\omega = \\int_{I^{k}}c^{\\ast}\\mathrm{d}\\omega = \\int_{I^{k}}\\mathrm{d}(c^{\\ast}\\omega) = \\int_{\\partial I^{k}}c^{\\ast}\\omega = \\int_{\\partial c}\\omega$。四步分别用：链上积分的定义、$c^{\\ast}$ 与 $\\mathrm{d}$ 交换、`lem.single-cube-stokes`、$\\partial$ 的定义与线性。难点全在引理里，这里是翻译。',
        '',
        '**不需要定向的原因**：链这一侧把定向吃进了参数化（`def.integral-on-chain`），所以整条定理里没有出现「可定向」这个词。要把链版换回流形版时才需要定向 —— 那时符号由 `prop.boundary-sign-convention` 提供。',
        '',
        '**四合一**：$k = 1$ 是微积分基本定理；$k = 2$ 是 Green 公式；$k = 3$ 的两种样子分别是 Gauss–Ostrogradsky（通量，也就是散度定理 `thm.divergence-theorem`）与 Kelvin–Stokes（环量）。它们不是四条定理，是同一条在不同 $k$ 上的读法。',
        '',
        '**⚠️ 次数与维数**：$\\omega$ 的次必须比链的维少一。$k = 0$ 时 $\\partial c = 0$、右边为零，公式退化成 $0 = 0$，所以定理从 $k\\ge 1$ 说起。',
        '',
        '**⚠️ 不能直接说「对任意闭链成立」**：本定理不需要 $c$ 是闭链；$\\partial c\\ne 0$ 时两边照样相等。闭链与恰当形式配对为零（$\\int_{c}\\mathrm{d}\\omega = 0$）是它的推论，不是前提。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 链上的 Stokes 定理',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 微积分基本定理'
      ]
    },

    /* ======================================================================
       §D 体积密度与体积形式（diffgeom.manifold）
       ====================================================================== */

    {
      id: 'def.volume-density',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '体积密度与体积形式',
      title: '体积密度与体积形式',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '体积', '密度', '体积形式', '定向'],
      statement: [
        '**在做什么**：把「度量给的体积大小」写成能积分的量：带符号的叫体积形式（要定向），不带符号的叫密度（不要定向），同一串系数的两种读法。',
        '',
        '设 $(M,g)$ 是 $n$ 维黎曼流形，卡 $(U,x)$ 里记 $g_{ij} = g(\\partial_{i},\\partial_{j})$。',
        '',
        '**体积密度**（不需要定向）：',
        '',
        '$$\\mathrm{d}\\mu_{g} := \\sqrt{\\det(g_{ij})}\\;\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n},$$',
        '',
        '右边是 Lebesgue 测度乘一个正的光滑函数，所以它是一个**密度**：换卡不变（绝对值那一半在开方里，见 `prop.volume-density-well-defined`），拼接后给出 $M$ 上唯一的 Radon 测度 $\\mu_{g}$。',
        '',
        '**体积形式**（需要先取定一个定向）：在每张保向卡里令',
        '',
        '$$\\mathrm{d}V := \\sqrt{\\det(g_{ij})}\\;\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}.$$',
        '',
        '等价地，它逐点由「在正向标准正交基上取 $1$」刻画：$\\mathrm{d}V_{p}(e_{1},\\ldots,e_{n}) = 1$，其中 $(e_{1},\\ldots,e_{n})$ 是 $T_{p}M$ 的任意一组正向标准正交基 —— 交错性加上「换一组这样的基只差行列式为 $1$ 的变换」保证这刻画与基的选取无关。翻转定向，$\\mathrm{d}V$ 变号。',
        '',
        '**体积**：$\\operatorname{vol}_{g}(M) := \\mu_{g}(M)$；$M$ 紧且已定向时它等于 $\\int_{M}\\mathrm{d}V$，并且 $\\mathrm{d}\\mu_{g} = |\\mathrm{d}V|$。'
      ].join('\n'),
      notes: [
        '**为什么系数是 $\\sqrt{\\det g}$**：$\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$ 在基 $(\\partial_{1},\\ldots,\\partial_{n})$ 上取 $1$，但 $\\partial_{i}$ 一般不是正交基。设 $\\partial_{i} = \\sum_{j}A_{ij}e_{j}$（$e_{j}$ 为标准正交基），则 $g = A^{\\mathsf T}A$，于是 $\\sqrt{\\det g} = |\\det A|$；保向时 $\\det A>0$，而 $\\mathrm{d}V(\\partial_{1},\\ldots,\\partial_{n}) = \\det A$，与「在正交基上取 $1$」相容。面积（体积）放大率就是行列式，这是 $\\sqrt{\\det(g_{ij})}$ 的全部来历。',
        '',
        '**两个结构各管一头**：度量管「多大」（$\\sqrt{\\det g}$ 这个标量），定向管「正负」（$\\mathrm{d}x^{1}\\wedge\\cdots$ 的次序）。所以 $\\mathrm{d}V$ 属于「度量 $+$ 定向」，缺一个都定义不出来；而 $\\mathrm{d}\\mu_{g}$ 只要度量，这是它俩唯一但关键的差别。',
        '',
        '**存在性**：可定向流形上存在处处非零的 $n$-形式 $\\omega$（可定向即「能被转移映射 Jacobi 行列式处处为正的卡族覆盖」，二维情形见 `def.orientable-surface`）。把 $\\omega$ 除以它在正向标准正交基上的取值，就得到满足 $\\mathrm{d}V(e_{1},\\ldots,e_{n}) = 1$ 的那个形式 —— 所以「可定向 $+$ 度量」恰好给出一个体积形式，且只差一个定向的符号。',
        '',
        '**二维时它就是 `def.area-element`**：那里写 $\\mathrm{d}A = \\sqrt{\\det(g_{ij})}\\,\\mathrm{d}u\\wedge\\mathrm{d}v$，与这里逐字相同；「面积元是密度、不是形式」那句话说的就是 $\\mathrm{d}\\mu_{g}$ 那一面。',
        '',
        '**例子**：$\\mathbb{R}^{n}$ 标准度量与标准定向给出 $\\mathrm{d}V = \\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$；半径 $R$ 的 $S^{2}$ 在球坐标 $(\\theta,\\varphi)$ 下（取 $\\partial_{\\theta},\\partial_{\\varphi}$ 为保向）给出 $\\mathrm{d}V = R^{2}\\sin\\theta\\,\\mathrm{d}\\theta\\wedge\\mathrm{d}\\varphi$。',
        '',
        '**⚠️ 记号分歧**：很多书写 $\\mathrm{d}V$ 指**密度**（不带符号的测度）。本图把两者分开：$\\mathrm{d}V$ 是形式（带定向），$\\mathrm{d}\\mu_{g} = |\\mathrm{d}V|$ 是密度。抄公式前先看清对方用的是哪一种。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 体积元素与体积',
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 定向与体积积分'
      ]
    },

    {
      id: 'prop.volume-density-well-defined',
      cluster: 'diffgeom.form',
      type: 'proposition',
      label: '密度与定向无关',
      title: '体积密度在换卡下不变，体积形式随定向变号',
      regions: ['diffgeom'],
      tags: ['命题', '微分几何', '体积', '密度', '换卡', '测度'],
      statement: [
        '**在做什么**：说明「密度」这个词为什么名副其实 —— 换卡时两个绝对值因子恰好抵消，所以它拼得成整体、也不依赖定向；带符号的那版则会被定向拖着变号。',
        '',
        '设 $(M,g)$ 是 $n$ 维黎曼流形，两张卡 $x$、$y$ 有重叠。则',
        '',
        '$$\\sqrt{\\det(g^{y}_{ij})} = \\sqrt{\\det(g^{x}_{ij})}\\;\\Bigl|\\det\\frac{\\partial x}{\\partial y}\\Bigr|,\\qquad \\mathrm{d}y^{1}\\cdots\\mathrm{d}y^{n} = \\Bigl|\\det\\frac{\\partial y}{\\partial x}\\Bigr|\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n},$$',
        '',
        '两式相乘，$|\\det|$ 因子等于 $1$，故',
        '',
        '$$\\sqrt{\\det(g^{y}_{ij})}\\;\\mathrm{d}y^{1}\\cdots\\mathrm{d}y^{n} = \\sqrt{\\det(g^{x}_{ij})}\\;\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n}.$$',
        '',
        '于是 $\\mathrm{d}\\mu_{g}$ 是一个**整体良定的密度**，拼接后给出 $M$ 上唯一的 Radon 测度 $\\mu_{g}$，且它不依赖定向。',
        '',
        '对照：体积形式 $\\mathrm{d}V$ 的变换因子是 $\\det$（**没有**绝对值），所以 $\\mathrm{d}V$ 只在保向换卡下不变、反向变号。有定向时 $\\mathrm{d}\\mu_{g} = |\\mathrm{d}V|$。'
      ].join('\n'),
      notes: [
        '**绝对值是开方给的**：$\\partial_{y^{i}} = \\sum_{k}(\\partial x^{k}/\\partial y^{i})\\partial_{x^{k}}$，故 $g^{y} = J^{\\mathsf T}g^{x}J$（$J = \\partial x/\\partial y$），取行列式得 $\\det g^{y} = (\\det J)^{2}\\det g^{x}$。开方时 $\\det J$ 的符号被吃掉，$|\\det J|$ 留下 —— 再来一个 $|\\det J|^{-1}$ 就正好抵消。**这一步是整条命题的全部内容**。',
        '',
        '**拼成整体测度**：局部密度在重叠处相等，剩下的只是把它加成测度。用从属于卡族的单位分解 $\\{\\rho_{\\alpha}\\}$（`prop.paracompact-partition-unity`）定义 $\\mu_{g}(f) := \\sum_{\\alpha}\\int_{\\mathbb{R}^{n}}(\\rho_{\\alpha}f)\\circ x_{\\alpha}^{-1}\\,\\sqrt{\\det g}\\ \\mathrm{d}x$；每项非负、和有限，正性与可数可加性逐块相加即得。',
        '',
        '**二维时这条就是 `def.area-element` 的注记**：「面积元是密度、不是形式」—— 换参数化时 $\\sqrt{\\det g}$ 与 $\\mathrm{d}u\\,\\mathrm{d}v$ 一起变，乘积不变且不变号。$n$ 维只是把 $2\\times2$ 的 Gram 行列式换成 $n\\times n$ 的。',
        '',
        '**与 `def.riemannian-metric` 的关系**：那边的定义把 $\\mathrm{d}V$ 记作 $\\sqrt{\\det(g_{ij})}\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n}$。严格说这是密度（配 Lebesgue 测度、不带符号）；带符号的形式版是 `def.volume-density` 里那一个。两处是同一串系数，用法不同。',
        '',
        '**⚠️ 不可定向流形上照样有体积**：面积、体积、质量这类量都不需要定向；丢掉的只是「带符号的积分」。散度定理那类公式则必须先取定定向（否则 $\\mathrm{d}V$ 的符号没有意义）。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 体积元素与黎曼体积',
        'Spivak, Calculus on Manifolds, 第 3 章「Integration」· 测度、零测集与单位分解'
      ]
    },

    /* ======================================================================
       §E 散度与换元（diffgeom.manifold）
       ====================================================================== */

    {
      id: 'def.divergence',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '散度',
      title: '散度',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '散度', '向量场', '体积形式'],
      statement: [
        '**在做什么**：散度回答「一点附近向量场往外冒得多快」。定义成「沿 $X$ 推着走时体积形式的变化率」—— 不用坐标，而且一写下来就得到散度定理。',
        '',
        '设 $(M,g)$ 是定向 $n$ 维黎曼流形，$\\mathrm{d}V$ 是体积形式，$X$ 是 $M$ 上的光滑向量场。**散度** $\\operatorname{div}X\\in C^{\\infty}(M)$ 是使',
        '',
        '$$\\mathcal{L}_{X}\\,\\mathrm{d}V = (\\operatorname{div}X)\\,\\mathrm{d}V$$',
        '',
        '成立的唯一函数，其中 $\\mathcal{L}_{X}$ 是沿 $X$ 的 Lie 导数。由 Cartan 公式 $\\mathcal{L}_{X} = \\mathrm{d}\\iota_{X}+\\iota_{X}\\mathrm{d}$ 与 $\\mathrm{d}(\\mathrm{d}V) = 0$，等价地',
        '',
        '$$\\mathrm{d}(\\iota_{X}\\mathrm{d}V) = (\\operatorname{div}X)\\,\\mathrm{d}V ,$$',
        '',
        '其中 $\\iota_{X}$ 是内乘（把 $X$ 填进形式的第一个槽）。在保向卡里逐项算出来是',
        '',
        '$$\\operatorname{div}X = \\frac{1}{\\sqrt{\\det(g_{ij})}}\\sum_{i=1}^{n}\\partial_{i}\\Bigl(\\sqrt{\\det(g_{ij})}\\,X^{i}\\Bigr),\\qquad X = \\sum_{i=1}^{n}X^{i}\\partial_{i}.$$',
        '',
        '$\\mathbb{R}^{n}$ 的标准度量下它退化成 $\\sum_{i}\\partial_{i}X^{i}$。'
      ].join('\n'),
      notes: [
        '**为什么「唯一」**：$n$-形式在每点是一维的，所以 $\\mathcal{L}_{X}\\mathrm{d}V$ 必然是 $\\mathrm{d}V$ 的某个函数倍，那个函数就被定义为散度。存在性不用证，唯一性也不用 —— 这是「用体积形式定义散度」最省事的地方。',
        '',
        '**只看度量，不看定向**（容易误以为要看）：$\\mathrm{d}V$ 变号时等式两边同时变号，$\\operatorname{div}X$ 不变。所以散度是**度量**的函数，定向只是写 $\\mathrm{d}V$ 时的脚手架。散度定理里出现的符号来自边界，不来自散度本身。',
        '',
        '**坐标公式怎么来的**：$\\iota_{X}\\mathrm{d}V = \\sum_{i}(-1)^{i-1}\\sqrt{\\det g}\\,X^{i}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\widehat{\\mathrm{d}x^{i}}\\cdots\\wedge\\mathrm{d}x^{n}$，取 $\\mathrm{d}$ 之后每一项贡献 $\\partial_{i}(\\sqrt{\\det g}\\,X^{i})$，再提出 $\\mathrm{d}V$ 的系数 $\\sqrt{\\det g}$。',
        '',
        '**迹刻画**：$\\operatorname{div}X = \\operatorname{tr}(v\\mapsto\\nabla_{v}X)$（Levi-Civita 联络）。两个定义等价，靠的是「体积形式平行」：$\\nabla\\mathrm{d}V = 0$，于是体积的变化率就是流的迹。',
        '',
        '**与微分学那边的接口**：$\\operatorname{div}\\circ\\operatorname{grad} = \\Delta$（Laplace–Beltrami 算子），$\\operatorname{grad}$ 见 `def.gradient`。所以「散度」是把二阶算子拆成一阶一阶算的那一半。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 散度',
        'Spivak, Calculus on Manifolds, 第 4 章「Integration on Chains」· 内乘与体积形式'
      ]
    },

    {
      id: 'thm.divergence-theorem',
      cluster: 'diffgeom.form',
      type: 'theorem',
      label: '散度定理',
      title: '散度定理',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '散度', '散度定理', 'Stokes 定理', '边界'],
      statement: [
        '**在做什么**：散度在整块流形上积起来，等于流量从边界漏出去的通量。这是 Gauss 公式在任意维数、任意黎曼流形上的样子，也是「散度 = 源密度」这句口号的正式版本。',
        '',
        '设 $(M,g)$ 是紧致、定向、带边的 $n$ 维黎曼流形；$\\partial M$ 取诱导定向与诱导度量，$\\mathrm{d}V$ 是 $M$ 的体积形式，$\\mathrm{d}A$ 是 $\\partial M$ 的体积形式，$N$ 是沿 $\\partial M$ 指向**外**的单位法向量，$X$ 是 $M$ 上的光滑向量场。则',
        '',
        '$$\\int_{M}(\\operatorname{div}X)\\,\\mathrm{d}V = \\int_{\\partial M}\\langle X,N\\rangle\\,\\mathrm{d}A .$$',
        '',
        '$\\partial M = \\emptyset$ 时右边为零，等式退化成「无边界则总散度为零」。',
        '',
        '$n = 3$、$X = (P,Q,R)$ 在平坦区域上给出经典 Gauss–Ostrogradsky 公式，$n = 2$ 给出 Green 公式的另一种写法。'
      ].join('\n'),
      notes: [
        '**它不是新定理**：证明就是把 `thm.stokes` 用在 $\\omega = \\iota_{X}\\mathrm{d}V$ 上。所以「微积分基本定理 / Stokes / 散度定理 / Green / Kelvin–Stokes」这五条是同一句公式在五种维数与五种形式次数上的读法。',
        '',
        '**符号的两个来源**：$N$ 必须朝**外**，$\\partial M$ 必须取**诱导**定向（外法向在前）。两个约定缺一个，整体就差一个负号 —— 而所有二、三维的特例都仍然「看起来对」，所以这个错误特别难查。约定之间的相容性由 `prop.boundary-sign-convention` 保证。',
        '',
        '**Green 第一公式**：取 $X = \\nabla u$（$\\nabla$ 取 $g$ 的梯度），得 $\\int_{M}\\Delta u\\,\\mathrm{d}V = \\int_{\\partial M}\\partial_{N}u\\,\\mathrm{d}A$；再对 $u\\,\\nabla v$ 用一次并相减，就得到对称的那个版本。',
        '',
        '**⚠️ 紧致性**：不紧时右边必须绝对可积，或对穷竭序列 $M_{1}\\subset M_{2}\\subset\\cdots$ 取极限（此时会多出内部边界项，靠它们两两相消收敛）。本图只陈述紧致情形。',
        '',
        '**⚠️ 边界为空不等于平凡**：闭流形上 $\\int_{M}\\operatorname{div}X\\,\\mathrm{d}V = 0$，这条非平凡 —— 它排除了「处处往外冒」的向量场，是 Hodge 理论与调和形式那一支的起点。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 散度定理',
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 流形上的 Stokes 定理'
      ]
    },

    {
      id: 'thm.change-of-variables-manifold',
      cluster: 'diffgeom.form',
      type: 'theorem',
      label: '流形上的换元公式',
      title: '流形上的换元公式',
      regions: ['diffgeom'],
      tags: ['定理', '微分几何', '换元公式', '拉回', '积分', 'Jacobian'],
      statement: [
        '**在做什么**：换元公式在流形上的样子 —— 沿微分同胚把形式搬过去，积分不变；搬的方向反了就变号。它其实是「$n$-形式是唯一能自然积分的东西」的另一种说法。',
        '',
        '设 $f : M\\to N$ 是定向 $n$ 维光滑流形之间的微分同胚，$\\omega\\in\\Omega^{n}(N)$ 可积（$N$ 紧，或 $\\omega$ 有紧支）。则',
        '',
        '**$f$ 保向时**',
        '',
        '$$\\int_{M}f^{\\ast}\\omega = \\int_{N}\\omega ;$$',
        '',
        '**$f$ 反向时**',
        '',
        '$$\\int_{M}f^{\\ast}\\omega = -\\int_{N}\\omega .$$',
        '',
        '两种情形合写成 $\\int_{M}f^{\\ast}\\omega = \\varepsilon\\int_{N}\\omega$，$\\varepsilon = +1$ 表示保向、$-1$ 表示反向。',
        '',
        '**经典换元是它的坐标版**：取 $M,U\\subseteq\\mathbb{R}^{n}$、$N = g(U)$、$\\omega = F\\,\\mathrm{d}y^{1}\\wedge\\cdots\\wedge\\mathrm{d}y^{n}$，则 $f^{\\ast}\\omega = (F\\circ g)\\det(\\partial g/\\partial x)\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$，公式变成 $\\int_{g(U)}F\\,\\mathrm{d}y = \\int_{U}(F\\circ g)\\det(\\partial g/\\partial x)\\,\\mathrm{d}x$ —— 与微积分课本上的差别只在「有没有绝对值」。'
      ].join('\n'),
      notes: [
        '**绝对值的有无就是定向的有无**：不带定向时能积的只有密度，换元带 $|\\det|$（`prop.volume-density-well-defined`）；带定向时 $n$-形式自带符号，换元带 $\\det$。同一件事的两种记账。',
        '',
        '**为什么只对 $n$-形式成立**：$k<n$ 的形式在微分同胚下按 $k\\times k$ 的子式变换，与 $n$ 维体积元对不上，所以不存在「$k$-形式在流形上的换元公式」。要积分 $k$-形式，得先挑一个 $k$ 维子流形把它拉回去（`def.integral-form` 开头那句）。',
        '',
        '**证明的两块拼图**：一是「保向微分同胚下积分不变」（`def.integral-form` 的良定性，就是 $\\mathbb{R}^{n}$ 上 $\\det$ 与换元公式的匹配），二是单位分解（`prop.paracompact-partition-unity`）把整体拆到卡里。两块都在别处证过，所以这条定理本身是拼装。',
        '',
        '**⚠️ 微分同胚不能放宽成「光滑满射」**：那样要引入度数与积分重数（$\\int_{M}f^{\\ast}\\omega = \\deg(f)\\int_{N}\\omega$），$\\varepsilon$ 就变成整数而不是 $\\pm1$。本图只陈述微分同胚情形。',
        '',
        '**⚠️ 定向的选取**：若 $M$ 与 $N$ 上各取定向，则 $\\varepsilon$ 由 $f$ 相对这两组定向是否保向决定；换掉 $N$ 的定向，$\\varepsilon$ 与右边同时变号，等式仍成立。所以「保向」这个说法必须相对定好的两组定向。'
      ].join('\n'),
      refs: [
        'Spivak, Calculus on Manifolds, 第 3 章「Integration」· 换元公式',
        'Spivak, Calculus on Manifolds, 第 5 章「Integration on Manifolds」· 流形上的积分与换元'
      ]
    }

  ],

  edges: [

    /* ============================================================
       定义引用（蓝线）：先把新节点挂在**已有的**基础上 —— 用户点名要
       接的那 10 个 id 全部用上，每条都给实质说明。
       ============================================================ */

    {
      id: 'dep.spivak-manifold-boundary',
      kind: 'definition',
      definition: 'def.smooth-manifold',
      usedBy: 'def.boundary-manifold',
      note: '带边流形只是把 $\\mathbb{R}^{n}$ 换成半空间 $\\mathbb{H}^{n}$：相容图册、转移映射、光滑函数三件事逐字沿用，多出来的只有「值域落在 $\\{x^{n}\\le 0\\}$ 里」这一条约束。'
    },
    {
      id: 'dep.spivak-manifold-cube',
      kind: 'definition',
      definition: 'def.smooth-manifold',
      usedBy: 'def.singular-cube',
      note: '「$c$ 光滑」这句话要有个意思 —— 它靠 $M$ 的光滑结构说：在某张卡里 $\\varphi\\circ c$ 光滑。没有图册，方块只是连续的。'
    },
    {
      id: 'dep.spivak-tangent-map',
      kind: 'definition',
      definition: 'def.tangent-space-manifold',
      usedBy: 'def.singular-cube',
      note: '「奇异」二字指的是 $\\mathrm{d}c_{p} : \\mathbb{R}^{k}\\to T_{c(p)}M$ 不满秩；「方块的正向 / 反向」也要靠切映射的行列式符号才说得清。切空间是这两件事的共同语言。'
    },
    {
      id: 'dep.spivak-cube-chain',
      kind: 'definition',
      definition: 'def.singular-cube',
      usedBy: 'def.singular-chain',
      note: '链就是方块的形式和，方块是它的基（自由阿贝尔群）。所以链上的一切定义都只需先在单个方块上给出，再线性延拓。'
    },
    {
      id: 'dep.spivak-chain-boundary',
      kind: 'definition',
      definition: 'def.singular-chain',
      usedBy: 'def.boundary-operator',
      note: '$\\partial$ 的最后一步是「线性延拓到链」；没有链这个概念，$\\partial c$ 只是一串面的形式和，说不出「对链成立」。'
    },
    {
      id: 'dep.spivak-cube-faces',
      kind: 'definition',
      definition: 'def.singular-cube',
      usedBy: 'prop.boundary-sign-convention',
      note: '命题的主角就是面 $c_{(i,\\alpha)} = c\\circ I^{k}_{(i,\\alpha)}$，也就是把方块限制在 $x^{i} = \\alpha$ 上得到的 $(n-1)$ 方块。'
    },
    {
      id: 'dep.spivak-boundary-sign',
      kind: 'definition',
      definition: 'def.boundary-manifold',
      usedBy: 'prop.boundary-sign-convention',
      note: '几何边界那一侧的「诱导定向（外法向在前）」是在带边流形上说的；命题做的正是把它与代数边界逐面比较。'
    },
    {
      id: 'dep.spivak-form-chain-integral',
      kind: 'definition',
      definition: 'def.integral-form',
      usedBy: 'def.integral-on-chain',
      note: '链上的积分最后落在 $\\int_{[0,1]^{k}}f$ 上，那正是 $n$-形式在开集上积分的那套定义（取 $U$ 为包含方块的开集）；换元时 $\\det$ 与换元公式的匹配也来自这条。'
    },
    {
      id: 'dep.spivak-chain-integral',
      kind: 'definition',
      definition: 'def.singular-chain',
      usedBy: 'def.integral-on-chain',
      note: '积分对链按系数加权求和，所以被积对象必须有「链」这个概念；单块情形只是 $N = 1$ 的特例。'
    },
    {
      id: 'dep.spivak-form-chain-stokes',
      kind: 'definition',
      definition: 'def.differential-form',
      usedBy: 'thm.stokes-chain',
      note: '定理两边的主语都是形式：左边是 $(k-1)$-形式、右边是它的外微分（$k$-形式）。次数差一这件事本身就来自形式的分次结构。'
    },
    {
      id: 'dep.spivak-d-cube-stokes',
      kind: 'definition',
      definition: 'def.exterior-derivative',
      usedBy: 'lem.single-cube-stokes',
      note: '证明的全部计算就是「把 $\\mathrm{d}$ 按定义展开成 $\\sum_{j}\\partial_{j}f_{j}$」；$\\mathrm{d}^{2} = 0$ 这一步也在这里被隐式用到（$\\mathrm{d}(\\mathrm{d}x^{I}) = 0$）。'
    },
    {
      id: 'dep.spivak-metric-density',
      kind: 'definition',
      definition: 'def.riemannian-metric',
      usedBy: 'def.volume-density',
      note: '「正向标准正交基」这个说法靠度量才有意义；系数 $\\sqrt{\\det(g_{ij})}$ 里的 $g_{ij} = g(\\partial_{i},\\partial_{j})$ 也是度量给的。没有 $g$，$\\mathrm{d}\\mu_{g}$ 与 $\\mathrm{d}V$ 都无从写起。'
    },
    {
      id: 'dep.spivak-det-density',
      kind: 'definition',
      definition: 'def.determinant',
      usedBy: 'def.volume-density',
      note: '从正交基换到坐标基的变换因子是 $\\det A$，而 $g = A^{\\mathsf T}A$ 给出 $\\sqrt{\\det g} = |\\det A|$ —— 面积（体积）放大率就是行列式，这是 $\\sqrt{\\det(g_{ij})}$ 的全部来历。'
    },
    {
      id: 'dep.spivak-surface-boundary',
      kind: 'definition',
      definition: 'def.orientable-surface',
      usedBy: 'prop.boundary-sign-convention',
      note: '二维给了「保向参数化」的现成模型：可定向 $\\iff$ 转移 Jacobi 同号 $\\iff$ 面积形式可整体选取。命题把同一套符号与同一套保向性搬到 $n$ 维带边流形上，$2\\times2$ 的行列式换成 $n\\times n$ 的。'
    },
    {
      id: 'dep.spivak-area-density',
      kind: 'definition',
      definition: 'def.area-element',
      usedBy: 'prop.volume-density-well-defined',
      note: '二维的 $\\mathrm{d}A = \\sqrt{\\det(g_{ij})}\\,\\mathrm{d}u\\,\\mathrm{d}v$ 就是本命题 $n = 2$ 的样子；「面积元是密度、不是形式」这句注记是本命题的二维特例。'
    },
    {
      id: 'dep.spivak-density-div',
      kind: 'definition',
      definition: 'def.volume-density',
      usedBy: 'def.divergence',
      note: '散度定义在 $\\mathcal{L}_{X}\\mathrm{d}V = (\\operatorname{div}X)\\mathrm{d}V$ 上，主语是体积形式；没有 $\\mathrm{d}V$，「体积的变化率」无从谈起。'
    },
    {
      id: 'dep.spivak-stokes-divthm',
      kind: 'definition',
      definition: 'thm.stokes',
      usedBy: 'thm.divergence-theorem',
      note: '散度定理的整条证明就是「对 $\\omega = \\iota_{X}\\mathrm{d}V$ 用流形版 Stokes」。边界定向的约定、$\\omega$ 到边界上的限制，全由那条定理提供。'
    },
    {
      id: 'dep.spivak-det-changevars',
      kind: 'definition',
      definition: 'def.determinant',
      usedBy: 'thm.change-of-variables-manifold',
      note: '换元因子是 Jacobi 矩阵的行列式 $\\det(\\partial g/\\partial x)$。定向版的公式之所以没有绝对值，正是因为 $\\det$ 本身带符号 —— 绝对值是「丢了定向」之后补回来的。'
    },
    {
      id: 'dep.spivak-partition-changevars',
      kind: 'definition',
      definition: 'prop.paracompact-partition-unity',
      usedBy: 'thm.change-of-variables-manifold',
      note: '把流形上的积分拆成逐卡的 $\\mathbb{R}^{n}$ 积分，靠的是从属于保向图册的单位分解；没有它，定理只能逐卡陈述，拼不成整体。'
    },

    /* ============================================================
       推导（黑线，证明写在边上）
       ============================================================ */

    {
      id: 'imp.spivak-boundary-nilpotent',
      kind: 'implication',
      sources: ['def.boundary-operator'],
      target: 'prop.boundary-squared-zero',
      title: '两次取面 + 交替符号 $\\implies$ 边界平方为零',
      proof: [
        '记 $\\varepsilon_{i,\\alpha}$ 为「把第 $i$ 个坐标钉在 $\\alpha$ 上并删掉」这个操作，于是 $\\partial = \\sum_{i,\\alpha}(-1)^{i+\\alpha}\\varepsilon_{i,\\alpha}$，其中 $(-1)^{i+\\alpha}$ 的 $i$ 是**当前这个元组里**的位置下标。对 $k$-方块 $c$ 展开：',
        '',
        '$$\\partial(\\partial c) = \\sum_{i,\\alpha}\\sum_{j,\\beta}(-1)^{i+\\alpha}(-1)^{j+\\beta}\\,\\varepsilon_{j,\\beta}\\varepsilon_{i,\\alpha}\\,c .$$',
        '',
        '**（1）两次取面给出同一个 $(k-2)$-方块。** 内层下标 $j$ 跑遍删掉第 $i$ 个坐标后剩下的 $k-1$ 个位置，所以它对应的**原坐标** $\\ell\\ne i$ 必与 $i$ 不同 —— 不出现「对同一坐标取两次」的项。$\\varepsilon_{j,\\beta}\\varepsilon_{i,\\alpha}c$ 的结果就是把坐标 $i$ 钉在 $\\alpha$、坐标 $\\ell$ 钉在 $\\beta$，与次序无关。',
        '',
        '**（2）两遍的符号相反。** 固定的 $(i,\\alpha)$ 与 $(\\ell,\\beta)$ 在总和里出现两次：先 $i$ 后 $\\ell$，以及先 $\\ell$ 后 $i$。两种次序的符号指数分别是 $i+\\alpha+\\ell\'+\\beta$ 与 $\\ell+\\beta+i\'+\\alpha$，其中 $\\ell\' = \\ell-[\\ell>i]$、$i\' = i-[i>\\ell]$ 是「删掉另一个坐标之后剩下的 $k-1$ 个位置里读到的编号」（记号 $[\\ell>i]$ 在条件成立时取 $1$、否则取 $0$）。',
        '',
        '若 $\\ell<i$：$\\ell\' = \\ell$、$i\' = i-1$，第二个指数比第一个少 $1$。若 $\\ell>i$：$\\ell\' = \\ell-1$、$i\' = i$，第二个指数比第一个多 $1$。两种情形下两个指数都**相差 $1$**，故两项符号相反，在总和里相消。',
        '',
        '**（3）结论。** 每个 $(k-2)$-方块都被数了偶数次、且正负各半，故 $\\partial(\\partial c) = 0$。对链按线性延拓得 $\\partial^{2} = 0$。∎',
        '',
        '⭐ 用 $k=1$ 验一遍：$\\partial c = (-1)^{1}c(0)+(-1)^{2}c(1) = c(1)-c(0)$ 是 $0$-链，$\\partial$ 作用在 $0$-链上为零，故 $\\partial^{2}c = 0$。$k=2$ 时四条边按「左、右、下、上」配上 $-,+,+,-$，四个顶点各出现两次且符号相反。'
      ].join('\n')
    },

    {
      id: 'imp.spivak-boundary-sign',
      kind: 'implication',
      sources: ['def.boundary-operator', 'def.boundary-manifold'],
      target: 'prop.boundary-sign-convention',
      title: '逐面算行列式 $\\implies$ 代数边界就是诱导定向的边界',
      proof: [
        '只需算 $c = \\operatorname{id}$ 的情形：一般保向微分同胚 $c$ 只是把每张面整体重参数化，行列式的符号不变（保向性正是为此而设）。',
        '',
        '取面 $F_{i,\\alpha} = \\{x^{i} = \\alpha\\}\\subseteq I^{n}$。它的切空间由 $e_{1},\\ldots,\\widehat{e_{i}},\\ldots,e_{n}$ 张成；把编号按 $j<i$、$j>i$ 的次序压紧成 $y^{1},\\ldots,y^{n-1}$，则 $c_{(i,\\alpha)}$ 的微分把 $\\partial_{y^{1}},\\ldots,\\partial_{y^{n-1}}$ 送到这组向量，且保持次序。记这组向量为 $v$。',
        '',
        '**（1）外法向。** $F_{i,\\alpha}$ 相对 $I^{n}$ 的外单位法向是 $N = (-1)^{\\alpha+1}e_{i}$：$\\alpha = 0$ 时外法向是 $-e_{i}$，$\\alpha = 1$ 时是 $+e_{i}$。',
        '',
        '**（2）把外法向搬到最前面。** 按诱导定向，$v$ 是 $F_{i,\\alpha}$ 的正向基，当且仅当 $(N,v)$ 是 $\\mathbb{R}^{n}$ 的正向基。计算这个行列式：',
        '',
        '$$\\det(N,v) = (-1)^{\\alpha+1}\\det(e_{i},e_{1},\\ldots,\\widehat{e_{i}},\\ldots,e_{n}) = (-1)^{\\alpha+1}(-1)^{i-1} = (-1)^{i+\\alpha}.$$',
        '',
        '中间那一步：矩阵 $(e_{i},e_{1},\\ldots,\\widehat{e_{i}},\\ldots,e_{n})$ 是单位阵把第 $i$ 列搬到第 $1$ 列，需要 $i-1$ 次对换，故行列式为 $(-1)^{i-1}$。',
        '',
        '**（3）读结论。** $\\det(N,v) = (-1)^{i+\\alpha}$，所以 $v$ 在 $F_{i,\\alpha}$ 上为正，当且仅当 $(-1)^{i+\\alpha} = +1$；而 $\\partial c$ 给这一面的系数正是 $(-1)^{i+\\alpha}$。两者逐面相同，命题成立。∎',
        '',
        '⭐ 于是「按诱导定向重排符号」与「照 $\\partial c$ 的公式写」是同一个链。$n = 2$ 时四条边的符号 $-,\\,+,\\,+,\\,-$ 恰好让它们首尾相接成一圈，可以当作记忆的抓手。'
      ].join('\n')
    },

    {
      id: 'imp.spivak-chain-linear',
      kind: 'implication',
      sources: ['def.integral-on-chain'],
      target: 'prop.integral-chain-linear',
      title: '逐项定义 $\\implies$ 对形式与对链都线性',
      proof: [
        '**对形式线性。** 固定方块 $c$。拉回是线性的：$c^{\\ast}(a\\omega+b\\eta) = a\\,c^{\\ast}\\omega+b\\,c^{\\ast}\\eta$。按定义 $c^{\\ast}\\omega = f\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k}$、$c^{\\ast}\\eta = h\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k}$（$k$ 维区域的顶次形式只有一个分量），故 $c^{\\ast}(a\\omega+b\\eta) = (af+bh)\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k}$。于是',
        '',
        '$$\\int_{c}(a\\omega+b\\eta) = \\int_{I^{k}}(af+bh) = a\\int_{I^{k}}f+b\\int_{I^{k}}h = a\\int_{c}\\omega+b\\int_{c}\\eta ,$$',
        '',
        '中间一步是通常积分的线性。',
        '',
        '**对链线性。** 这正是 $\\int$ 在链上的定义：$\\int_{\\sum n_{l}c_{l}}\\omega = \\sum n_{l}\\int_{c_{l}}\\omega$ 对系数是线性的，把链换成 $ac+bc\'$ 就是两边分别乘 $a,b$ 再相加。$\\int_{-c}\\omega = -\\int_{c}\\omega$ 是 $n = -1$ 的特例。',
        '',
        '**双线性。** 两头的线性各自独立（拉回只碰 $\\omega$、求和只碰链），故合起来是双线性的配对 $C_{k}(M)\\times\\Omega^{k}(M)\\to\\mathbb{R}$。∎'
      ].join('\n')
    },

    {
      id: 'imp.spivak-cube-stokes',
      kind: 'implication',
      sources: ['def.boundary-operator', 'def.exterior-derivative'],
      target: 'lem.single-cube-stokes',
      title: '逐项积完一元导数 $\\implies$ 方块上的 Stokes 公式',
      proof: [
        '**（1）写法。** 把 $\\eta$ 按缺哪个 $\\mathrm{d}x^{j}$ 唯一地写成',
        '',
        '$$\\eta = \\sum_{j=1}^{k}(-1)^{j-1}f_{j}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\widehat{\\mathrm{d}x^{j}}\\wedge\\cdots\\wedge\\mathrm{d}x^{k},$$',
        '',
        '（带帽表示略去该因子）。按外微分的定义逐项求导、并把 $\\mathrm{d}f_{j}$ 与其余因子楔起来，只剩 $\\partial_{j}f_{j}$ 那一项不死，于是',
        '',
        '$$\\mathrm{d}\\eta = \\sum_{j=1}^{k}\\partial_{j}f_{j}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{k}.$$',
        '',
        '**（2）左边。** 用 Fubini 把 $x^{j}$ 那一层单独积完，再用一元微积分基本定理：',
        '',
        '$$\\int_{I^{k}}\\mathrm{d}\\eta = \\sum_{j=1}^{k}\\Bigl[\\int_{I^{k-1}}f_{j}\\big|_{x^{j}=1}-\\int_{I^{k-1}}f_{j}\\big|_{x^{j}=0}\\Bigr],$$',
        '',
        '其中每个 $I^{k-1}$ 用剩下的 $k-1$ 个坐标的原次序。',
        '',
        '**（3）右边。** 按 $\\partial I^{k}$ 的定义逐面拉回。在第 $(i,\\alpha)$ 面上，$\\mathrm{d}x^{i}$ 的拉回为零，所以只有 $j = i$ 的那一项活着；而面少了一个坐标，$\\mathrm{d}x^{1}\\wedge\\cdots\\widehat{\\mathrm{d}x^{i}}\\cdots\\wedge\\mathrm{d}x^{k}$ 拉回后正好是面上的 $\\mathrm{d}y^{1}\\wedge\\cdots\\wedge\\mathrm{d}y^{k-1}$。于是',
        '',
        '$$\\int_{\\partial I^{k}}\\eta = \\sum_{i=1}^{k}\\sum_{\\alpha=0}^{1}(-1)^{i+\\alpha}(-1)^{i-1}\\int_{I^{k-1}}f_{i}\\big|_{x^{i}=\\alpha} = \\sum_{i=1}^{k}\\Bigl[\\int_{I^{k-1}}f_{i}\\big|_{x^{i}=1}-\\int_{I^{k-1}}f_{i}\\big|_{x^{i}=0}\\Bigr],$$',
        '',
        '最后一步用 $(-1)^{i+\\alpha+i-1} = (-1)^{\\alpha+1}$：$\\alpha = 1$ 给 $+1$、$\\alpha = 0$ 给 $-1$。',
        '',
        '**（4）比较。** 两式逐项相同，故 $\\int_{I^{k}}\\mathrm{d}\\eta = \\int_{\\partial I^{k}}\\eta$。∎',
        '',
        '⭐ 全部内容就是「每个 $j$ 的两端之差」被数了两遍，两遍的符号对上。$k = 1$ 时退化成 $\\int_{0}^{1}F^{\\prime} = F(1)-F(0)$，可以当作符号约定是否抄对的检验。'
      ].join('\n')
    },

    {
      id: 'imp.spivak-chain-stokes',
      kind: 'implication',
      sources: ['lem.single-cube-stokes', 'prop.pullback-forms', 'def.integral-on-chain'],
      target: 'thm.stokes-chain',
      title: '拉回到方块 + 方块上的公式 $\\implies$ 链上的 Stokes',
      proof: [
        '**方块情形。** 设 $c$ 是 $k$-方块，$\\omega$ 是 $(k-1)$-形式，都在 $c(I^{k})$ 的某个邻域上有定义。令 $\\eta := c^{\\ast}\\omega$。由拉回与外微分交换（$c^{\\ast}\\mathrm{d} = \\mathrm{d}c^{\\ast}$），',
        '',
        '$$\\int_{c}\\mathrm{d}\\omega = \\int_{I^{k}}c^{\\ast}\\mathrm{d}\\omega = \\int_{I^{k}}\\mathrm{d}(c^{\\ast}\\omega) = \\int_{I^{k}}\\mathrm{d}\\eta .$$',
        '',
        '按 `lem.single-cube-stokes`，它等于 $\\int_{\\partial I^{k}}\\eta$。再把 $\\int_{\\partial I^{k}}\\eta$ 翻译回 $c$ 的语言：由 $\\partial$ 的定义与拉回的复合律 $(c\\circ I^{k}_{(i,\\alpha)})^{\\ast} = (I^{k}_{(i,\\alpha)})^{\\ast}c^{\\ast}$，',
        '',
        '$$\\int_{\\partial I^{k}}c^{\\ast}\\omega = \\sum_{i,\\alpha}(-1)^{i+\\alpha}\\int_{I^{k-1}}(I^{k}_{(i,\\alpha)})^{\\ast}c^{\\ast}\\omega = \\sum_{i,\\alpha}(-1)^{i+\\alpha}\\int_{c_{(i,\\alpha)}}\\omega = \\int_{\\partial c}\\omega .$$',
        '',
        '三处等号依次是：$\\partial I^{k}$ 的定义、链上积分的定义、$\\partial c$ 的定义。拼起来得 $\\int_{c}\\mathrm{d}\\omega = \\int_{\\partial c}\\omega$。',
        '',
        '**链情形。** 设 $c = \\sum_{l}n_{l}c_{l}$。由 $\\partial$ 与 $\\int$ 在链上都线性（`prop.integral-chain-linear`）：',
        '',
        '$$\\int_{\\partial c}\\omega = \\sum_{l}n_{l}\\int_{\\partial c_{l}}\\omega = \\sum_{l}n_{l}\\int_{c_{l}}\\mathrm{d}\\omega = \\int_{c}\\mathrm{d}\\omega .$$',
        '',
        '∎',
        '',
        '⭐ 注意全程没有用到 $M$ 的定向、紧致性，也没有让 $\\omega$ 有紧支：这三件事都被「换成链」吃掉了。'
      ].join('\n')
    },

    {
      id: 'imp.spivak-volume-measure',
      kind: 'implication',
      sources: ['def.volume-density', 'def.riemannian-metric'],
      target: 'prop.volume-density-well-defined',
      title: '行列式的平方 $\\implies$ 密度不依赖定向',
      proof: [
        '**（1）局部变换。** 设 $y$ 是另一张卡，$J := \\partial x/\\partial y$。由 $\\partial_{y^{i}} = \\sum_{k}J_{ki}\\,\\partial_{x^{k}}$ 与度量的双线性得 $g^{y} = J^{\\mathsf T}g^{x}J$，取行列式：$\\det g^{y} = (\\det J)^{2}\\det g^{x}$。两边开方（$\\det g>0$，因为 $g$ 正定），',
        '',
        '$$\\sqrt{\\det g^{y}} = |\\det J|\\,\\sqrt{\\det g^{x}} .$$',
        '',
        '**（2）与体积元配平。** 换元公式给出 $\\mathrm{d}y^{1}\\cdots\\mathrm{d}y^{n} = |\\det(\\partial y/\\partial x)|\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n} = |\\det J|^{-1}\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n}$。两式相乘，$|\\det J|$ 抵消，故',
        '',
        '$$\\sqrt{\\det g^{y}}\\,\\mathrm{d}y^{1}\\cdots\\mathrm{d}y^{n} = \\sqrt{\\det g^{x}}\\,\\mathrm{d}x^{1}\\cdots\\mathrm{d}x^{n} .$$',
        '',
        '**关键**：开方给出 $|\\det J|$ 而不是 $\\det J$ —— 这一步就是「密度不换号」的全部来源。若换成 $n$-形式版，$\\mathrm{d}x^{1}\\wedge\\cdots$ 的变换因子是 $\\det J$（无绝对值），于是乘积只在保向时不变、反向时变号。',
        '',
        '**（3）拼成整体。** 局部密度在重叠处相等，故用从属于卡族的单位分解 $\\{\\rho_{\\alpha}\\}$ 定义 $\\mu_{g}(f) := \\sum_{\\alpha}\\int_{\\mathbb{R}^{n}}(\\rho_{\\alpha}f)\\circ x_{\\alpha}^{-1}\\,\\sqrt{\\det g}\\ \\mathrm{d}x$。每一项非负（$f\\ge 0$ 时）、和有限，且由 (2) 与卡选取无关；于是 $\\mu_{g}$ 是 $M$ 上良定、正、可数可加的 Radon 测度。',
        '',
        '**（4）与 $\\mathrm{d}V$ 对照。** 有定向时 $\\mathrm{d}V = \\sqrt{\\det g}\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n}$ 与 $\\mathrm{d}\\mu_{g}$ 逐卡同系数，只差「楔积（带符号）」与「Lebesgue（不带符号）」，故 $\\mu_{g} = |\\mathrm{d}V|$，且紧流形上 $\\int_{M}\\mathrm{d}V = \\mu_{g}(M) = \\operatorname{vol}_{g}(M)$。∎'
      ].join('\n')
    },

    {
      id: 'imp.spivak-divergence-theorem',
      kind: 'implication',
      sources: ['def.divergence', 'prop.boundary-sign-convention'],
      target: 'thm.divergence-theorem',
      title: '对 $\\iota_{X}\\mathrm{d}V$ 用 Stokes $\\implies$ 散度定理',
      proof: [
        '**（1）造一个 $(n-1)$-形式。** 令 $\\omega := \\iota_{X}\\mathrm{d}V$。按散度的等价定义（Cartan 公式那一版），$\\mathrm{d}\\omega = (\\operatorname{div}X)\\,\\mathrm{d}V$。$\\omega$ 在 $M$ 上光滑，故可限制到 $\\partial M$。',
        '',
        '**（2）用 Stokes。** $M$ 紧致、定向、带边，由 `thm.stokes`',
        '',
        '$$\\int_{M}(\\operatorname{div}X)\\,\\mathrm{d}V = \\int_{M}\\mathrm{d}\\omega = \\int_{\\partial M}\\omega .$$',
        '',
        '**（3）认出边界上的 $\\omega$。** 取 $p\\in\\partial M$ 与 $T_{p}\\partial M$ 的一组正向基 $(v_{1},\\ldots,v_{n-1})$。按诱导定向（外法向在前，见 `prop.boundary-sign-convention`），$(N,v_{1},\\ldots,v_{n-1})$ 是 $T_{p}M$ 的正向标准正交基，故 $\\mathrm{d}V(N,v_{1},\\ldots,v_{n-1}) = 1$。写 $X = \\langle X,N\\rangle N+X^{\\top}$，其中 $X^{\\top}\\in T_{p}\\partial M$。于是',
        '',
        '$$\\omega(v_{1},\\ldots,v_{n-1}) = \\mathrm{d}V(X,v_{1},\\ldots,v_{n-1}) = \\langle X,N\\rangle\\,\\mathrm{d}V(N,v_{1},\\ldots,v_{n-1})+\\mathrm{d}V(X^{\\top},v_{1},\\ldots,v_{n-1}) .$$',
        '',
        '第二项为零：写 $X^{\\top} = \\sum_{j}a_{j}v_{j}$，则它等于 $\\sum_{j}a_{j}\\mathrm{d}V(v_{j},v_{1},\\ldots,v_{n-1})$，每一项都有两个相同的槽（$v_{j}$ 出现两次），交错性给出零。所以 $\\omega(v_{1},\\ldots,v_{n-1}) = \\langle X,N\\rangle$，即 $\\omega|_{\\partial M} = \\langle X,N\\rangle\\,\\mathrm{d}A$。',
        '',
        '**（4）合并。** 代入 (2) 得 $\\int_{M}(\\operatorname{div}X)\\mathrm{d}V = \\int_{\\partial M}\\langle X,N\\rangle\\,\\mathrm{d}A$。∎',
        '',
        '⭐ 两个约定各出一半的力：诱导定向让 $(N,v_{1},\\ldots,v_{n-1})$ 成为正向基（否则第一步就少一个号），外法向让 $N$ 与 $\\mathrm{d}V$ 的配对恰好给出 $\\langle X,N\\rangle$（否则第二项不消失）。'
      ].join('\n')
    },

    {
      id: 'imp.spivak-change-variables',
      kind: 'implication',
      sources: ['def.integral-form', 'prop.paracompact-partition-unity'],
      target: 'thm.change-of-variables-manifold',
      title: '保向不变性 + 单位分解 $\\implies$ 流形上的换元公式',
      proof: [
        '**（1）拆到卡里。** 设 $M,N$ 各有保向图册，取从属于它们的单位分解 $\\{\\rho_{\\alpha}\\}$（在 $M$ 上）与 $\\{\\sigma_{\\beta}\\}$（在 $N$ 上）。把 $\\omega$ 写成 $\\sum_{\\beta}\\sigma_{\\beta}\\omega$，每一项支在一张保向卡 $V_{\\beta}\\subseteq N$ 里；$f^{\\ast}$ 保求和，故只需处理「$\\omega$ 支在一张卡里」的情形。再用 $M$ 侧的 $\\{\\rho_{\\alpha}\\}$ 把 $f^{\\ast}\\omega$ 拆开。有限多项相加，逐项证完即可。',
        '',
        '**（2）化到 $\\mathbb{R}^{n}$。** 于是只需处理开集之间的微分同胚 $g : U\\to V$（$U,V\\subseteq\\mathbb{R}^{n}$）与 $\\omega = \\beta\\,\\mathrm{d}y^{1}\\wedge\\cdots\\wedge\\mathrm{d}y^{n}$。拉回给出',
        '',
        '$$g^{\\ast}\\omega = (\\beta\\circ g)\\,\\det\\Bigl(\\frac{\\partial g}{\\partial x}\\Bigr)\\,\\mathrm{d}x^{1}\\wedge\\cdots\\wedge\\mathrm{d}x^{n} ,$$',
        '',
        '因为 $g^{\\ast}(\\mathrm{d}y^{1}\\wedge\\cdots\\wedge\\mathrm{d}y^{n})$ 是 $U$ 上的顶次形式，其唯一系数正是 Jacobi 行列式（顶次外形式在微分同胚下按 $\\det$ 变换 —— 这正是 `def.integral-form` 的良定性所用的那一条）。',
        '',
        '**（3）用一次换元公式。**',
        '',
        '$$\\int_{U}g^{\\ast}\\omega = \\int_{U}(\\beta\\circ g)\\,\\det\\Bigl(\\frac{\\partial g}{\\partial x}\\Bigr)\\mathrm{d}x = \\pm\\int_{U}(\\beta\\circ g)\\Bigl|\\det\\Bigl(\\frac{\\partial g}{\\partial x}\\Bigr)\\Bigr|\\mathrm{d}x = \\pm\\int_{V}\\beta\\,\\mathrm{d}y ,$$',
        '',
        '中间的 $\\pm$ 只在 $\\det<0$ 时出现；最后一步就是 $\\mathbb{R}^{n}$ 上的换元公式（它自带 $|\\det|$）。$g$ 保向等价于 $\\det>0$ 处处成立（$U$ 连通时），此时取 $+$。',
        '',
        '**（4）拼回去。** 逐项相加，再用单位分解「和为一」把系数约掉，得 $\\int_{M}f^{\\ast}\\omega = \\varepsilon\\int_{N}\\omega$。∎',
        '',
        '⭐ 绝对值的有无就是「有没有定向」：$n$-形式自带符号，故换元带 $\\det$；密度不带符号，故换元带 $|\\det|$。两条公式的差别全在这里。'
      ].join('\n')
    }

  ]

});
