/* ==========================================================================
   内容包 · 补洞：闭形式 / 恰当形式 · 有理标准形 · 域的特征
   --------------------------------------------------------------------------
   用户原话：「补，再查查还有没有别的」—— 承接上一轮的「闭链/上闭链没有定义」。

   取证方式（可复用的排查脚本 `_tools/_deadref2.mjs`）：
     扫全库正文里所有「反引号里的节点 id」，逐个对 `dist/graph.json` 解析；
     排除**边 id**（`imp.*` / `dep.*` 这类本来就不是节点）与块注释行，得到真正缺节点的引用。

   结果：10 处，去掉两处元说明（`thm.jordan` 是「不能叫这个名字」的反例、
   `def.cocycle` / `def.coboundary` 是我上一包自己的排查记录），真正要处理 7 处：
     · `def.closed-form` / `def.exact-form` —— 用户点名要补（de Rham 版的闭链/边缘）
     · `thm.rational-canonical-form` —— 真缺：Jordan 形有、有理标准形没有
     · `def.characteristic` —— 真缺：域的特征（`def.finchar` 是「有限特征族」，两回事）
     · `def.injective-object` —— **过时**：已并入 `def.projective-object`（投射/内射对象）
     · `cor.jacobian-volume` —— **过时**：现在在 `thm.change-of-variables-manifold` 里
     · `prop.inverse-continuous` —— **过时**：现在在 `thm.inverse-function` / `thm.open-mapping` 里
     · `def.minimal-poly-element` —— **过时**：域论里没有这个节点，改成文字描述

   本包只写前四个（新节点）＋ 四条定义边；过时引用在各自包里改指向（见提交说明）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '闭形式与恰当形式 · 有理标准形 · 域的特征',

  nodes: [

    {
      id: 'def.closed-form',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '闭形式',
      title: '闭形式：外微分为零的微分形式',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '闭形式', 'de Rham', '外微分'],
      statement: [
        '**在做什么**：de Rham 复形里的**闭链**。它是「局部上没有旋度 / 没有源」的微分形式 —— 整门 de Rham 理论都在问「闭的里面有多少是真恰当的」。',
        '',
        '设 $M$ 是光滑流形，$\\omega \\in \\Omega^{k}(M)$。称 $\\omega$ 是**闭形式**（closed form），若',
        '',
        '$$d\\omega = 0 .$$',
        '',
        '记全体 $k$ 次闭形式为 $Z^{k}(M) := \\ker\\bigl(d : \\Omega^{k}(M) \\to \\Omega^{k+1}(M)\\bigr)$。',
        '',
        '**局部坐标中的样子**：$\\omega = \\sum_{I} \\omega_{I}\\, dx^{I}$ 时，$d\\omega = 0$ 等价于对每个 $I$ 有一组偏微分方程（例如 1 次时 $\\partial_{i}\\omega_{j} = \\partial_{j}\\omega_{i}$，即 $\\nabla \\times \\omega = 0$）。'
      ].join('\n'),
      notes: [
        '⭐ **它就是同调代数里的「闭链」**：de Rham 复形 $\\Omega^{0} \\xrightarrow{d} \\Omega^{1} \\xrightarrow{d} \\cdots$ 中的闭链群 $Z^{k}$ 就是这里的闭形式。所以「闭形式 / 闭链」是同一句话在分析与代数两侧的说法。',
        '**闭 vs 退化的判据**：$d^{2} = 0$ 保证了一切恰当形式都闭（$d(d\\eta) = 0$），所以 $B^{k} \\subseteq Z^{k}$（`def.exact-form`）。而反过来「闭 $\\implies$ 恰当」**不是**普遍成立的 —— 它成立的范围由一个上同调群 $H^{k}$ 量出来。',
        '⚠️ **不是「闭集」那个「闭」**：这里的闭是 $d\\omega = 0$，与拓扑的闭集无关。中文两个「闭」撞车，读文献时靠上下文（有没有 $d$）。',
        '⭐ **常见例子**：$\\mathbb{R}^{n}$ 上一切 $n$ 次形式都闭（$d$ 打到 $\\Omega^{n+1} = 0$）；$S^{1}$ 上的角形式 $d\\theta$ 闭但不恰当 —— 这是 $H^{1}(S^{1}) \\ne 0$ 的最简单证据。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds（⚠️ 章节未核实，只记书名）· 闭形式与恰当形式',
        'Bott–Tu, Differential Forms in Algebraic Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'def.exact-form',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: '恰当形式',
      title: '恰当形式：某个形式的微分',
      regions: ['diffgeom'],
      tags: ['定义', '微分几何', '恰当形式', 'de Rham', '外微分'],
      statement: [
        '**在做什么**：de Rham 复形里的**边缘**。它是「能写成别人的微分」的形式，也就是同调上平凡的那一类。',
        '',
        '设 $M$ 是光滑流形，$\\omega \\in \\Omega^{k}(M)$（$k \\ge 1$）。称 $\\omega$ 是**恰当形式**（exact form），若存在 $(k-1)$ 次形式 $\\eta$ 使',
        '',
        '$$\\omega = d\\eta .$$',
        '',
        '记全体 $k$ 次恰当形式为 $B^{k}(M) := \\operatorname{im}\\bigl(d : \\Omega^{k-1}(M) \\to \\Omega^{k}(M)\\bigr)$。$\\eta$ 叫 $\\omega$ 的**原形式**（primitive）。',
        '',
        '**每个恰当形式都闭**：$d\\omega = d(d\\eta) = 0$（因为 $d^{2} = 0$）。所以 $B^{k}(M) \\subseteq Z^{k}(M)$，可以取商',
        '',
        '$$H^{k}_{dR}(M) := Z^{k}(M) \\big/ B^{k}(M) ,$$',
        '',
        '这就是 **de Rham 上同调**。'
      ].join('\n'),
      notes: [
        '⭐ **它就是同调代数里的「边缘」**：$B^{k} = \\operatorname{im} d$ 正是 `def.boundary` 里的边缘群。所以「恰当形式 / 边缘」也是一句话两种说法。',
        '⭐ **「闭而恰当」是 Poincaré 引理的内容**：星形区域（更一般地，可缩空间）上每个闭形式都恰当 —— 这就是 `lem.poincare-lemma`。所以 $H^{k}$ 量的是「空间有多少洞」，不是「形式有多复杂」。',
        '⚠️ **原形式一般不唯一**：$\\eta$ 可以换成 $\\eta + d\\alpha$（$\\alpha$ 是 $(k-2)$ 次，$k \\ge 2$）或 $\\eta + c$（$k = 1$），$\\omega$ 不变。所以「求原形式」是求解 $d\\eta = \\omega$ 的一个特解问题，只在同调类层面有唯一性。',
        '⚠️ **$k = 0$**：恰当 $0$ 形式按定义是 $d\\eta$ 形的 $0$ 形式，而 $d$ 打在 $\\Omega^{-1}$ 上（约定为 $0$）$\\implies$ 只有 $0$。这与「$B^{0} = 0$」一致，也正是「$H^{0}_{dR}(M)$ 就是 $M$ 上的局部常值函数」这条结论的来源。'
      ].join('\n\n'),
      refs: [
        'Tu, An Introduction to Manifolds（⚠️ 章节未核实，只记书名）· 闭形式与恰当形式',
        'Bott–Tu, Differential Forms in Algebraic Topology（⚠️ 章节未核实，只记书名）'
      ]
    },

    {
      id: 'thm.rational-canonical-form',
      cluster: 'algebra.spectral',
      type: 'theorem',
      label: '有理标准形',
      title: '有理标准形：任意域上都成立的标准形',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '有理标准形', '不变因子', '标准形'],
      statement: [
        '**在做什么**：Jordan 标准形要求「特征多项式在域里分裂」（特征值都在域里）。有理标准形**不需要这个条件** —— 只要 $K$ 是域，任何矩阵都能化成它。',
        '',
        '设 $K$ 是域，$A \\in M_{n}(K)$。则 $A$ 在 $M_{n}(K)$ 中相似于**唯一**的分块对角矩阵',
        '',
        '$$\\operatorname{diag}\\bigl(C_{d_{1}}, C_{d_{2}}, \\ldots, C_{d_{s}}\\bigr) ,$$',
        '',
        '其中每个 $C_{d}$ 是**友矩阵**（companion matrix）：$d(x) = x^{m} + a_{m-1}x^{m-1} + \\cdots + a_{0}$ 是首一多项式，',
        '',
        '$$C_{d} := \\begin{pmatrix} 0 & & & & -a_{0} \\\\ 1 & 0 & & & -a_{1} \\\\ & \\ddots & \\ddots & & \\vdots \\\\ & & 1 & 0 & -a_{m-2} \\\\ & & & 1 & -a_{m-1} \\end{pmatrix} ,$$',
        '',
        '且 $d_{1} \\mid d_{2} \\mid \\cdots \\mid d_{s}$（依次整除）。这些 $d_{i}$ 叫**不变因子**。',
        '',
        '**与 Jordan 形的分工**：$K$ 上特征多项式分裂时，有理标准形与 Jordan 形都是完整不变量；不分裂时**只有**有理标准形（在 $K$ 上）可用 —— Jordan 形要到扩域上才存在。'
      ].join('\n'),
      notes: [
        '⭐ **为什么叫「有理」**：历史上指 $K = \\mathbb{Q}$ 的情形 —— 正是「特征多项式在 $\\mathbb{Q}$ 上不分裂」的典型场合。名字沿用下来，现在指「对任意域都成立」。',
        '**第一步：把矩阵变成模**。把 $V = K^{n}$ 看成 $K[x]$-模，规定 $x \\cdot v := Av$。于是 $K[x]$-子模就是 $A$-不变子空间，$K[x]$-模同构就是相似：$A \\sim B$ 当且仅当 $V_{A} \\cong V_{B}$。由 Cayley–Hamilton 定理 $\\chi_{A}(A) = 0$，故 $\\chi_{A} \\in \\operatorname{Ann}(V)$，$V$ 是**挠模**；又 $\\dim_{K} V = n$ 给出有限生成。',
        '**引理 1（Smith 标准形，$K[x]$ 版）**：设 $R = K[x]$。任意 $m \\times n$ 矩阵 $M$ 经初等行/列变换可化成 $\\operatorname{diag}(d_{1}, \\ldots, d_{r}, 0, \\ldots, 0)$，其中 $d_{1} \\mid d_{2} \\mid \\cdots \\mid d_{r}$ 非零，$r = \\operatorname{rank} M$。**证明**：在所有与 $M$ 等价的矩阵中，取「非零元素的最小次数」$\\delta$ 最小的一个；把达到 $\\delta$ 的元素挪到 $(1,1)$，记作 $a$。若第一列某元素 $b$ 不被 $a$ 整除，作带余除法 $b = qa + r$（$\\deg r < \\delta$），把第 1 行乘 $-q$ 加到该行，得到含次数更小非零元的等价矩阵，与 $\\delta$ 的最小性矛盾；故 $a$ 整除第一列全部元素，用行变换清空第一列。同理用列变换清空第一行。若余下子块有元素不被 $a$ 整除，把该行加到第 1 行、再用列变换减去 $a$ 的倍数，又得到次数更小的非零元，矛盾；故 $a$ 整除整个余下子块。对余下子块归纳，得 $\\operatorname{diag}(a, e_{1}, \\ldots)$；初等变换不改变「全部元素生成的理想」，故 $a \\mid e_{1}$，整除链成立。$\\square$',
        '**引理 2（结构定理）**：设 $M$ 是有限生成 $R$-模。取生成元 $x_{1}, \\ldots, x_{n}$，得满射 $R^{n} \\to M$，其核由有限多个列向量 $a_{1}, \\ldots, a_{m} \\in R^{n}$ 生成（$K[x]$ 是 PID 故为 Noether 环，PID 上自由模的子模有限生成 —— 标准事实，本图未单列节点），即 $M \\cong \\operatorname{coker}(A)$，$A = (a_{1} \\cdots a_{m})$。对 $A$ 取 Smith 标准形：存在可逆矩阵 $P, Q$ 使 $PAQ = \\operatorname{diag}(d_{1}, \\ldots, d_{r}, 0)$。可逆矩阵只是换基，故 $\\operatorname{coker}(A) \\cong \\operatorname{coker}(PAQ) \\cong R^{n-r} \\oplus R/(d_{1}) \\oplus \\cdots \\oplus R/(d_{r})$：第 $i$ 个坐标方向被 $d_{i} e_{i}$ 生成，$i > r$ 的方向不被任何关系碰到。$\\square$',
        '**存在性**：对 $V_{A}$ 用引理 2。因 $V$ 挠，自由部分必须为零：若 $R^{n-r} \\ne 0$，取 $e_{1}$，则 $\\chi_{A} e_{1} \\ne 0$，与 $\\chi_{A} \\in \\operatorname{Ann}(V)$ 矛盾。再删去单位 $d_{i}$（此时 $R/(d_{i}) = 0$），得 $V \\cong \\bigoplus_{i=1}^{s} R/(d_{i})$，其中 $d_{1} \\mid \\cdots \\mid d_{s}$ 非单位首一多项式。',
        '**从循环模到友矩阵**：在 $R/(d)$（$d = x^{m} + a_{m-1}x^{m-1} + \\cdots + a_{0}$）中取 $K$-基 $1, x, \\ldots, x^{m-1}$。乘 $x$ 把前 $m-1$ 个基向量送到下一个，把 $x^{m-1}$ 送到 $x^{m} \\equiv -(a_{0} + a_{1}x + \\cdots + a_{m-1}x^{m-1})$。该算子在这组基下的矩阵正是 $C_{d}$（次对角线全 $1$，最后一列 $(-a_{0}, \\ldots, -a_{m-1})^{T}$）。把各循环块的基拼起来，$A$ 相似于 $\\operatorname{diag}(C_{d_{1}}, \\ldots, C_{d_{s}})$。',
        '**唯一性**：设 $\\bigoplus_{i} R/(d_{i}) \\cong \\bigoplus_{j} R/(e_{j})$，两条链都整除。对不可约 $p \\in K[x]$ 与 $k \\ge 1$，令 $M[p^{k}] := \\{m : p^{k}m = 0\\}$ —— 这是由 $M$ 本身决定的子模，不依赖分解。对 $R/(d)$，写 $d = p^{v}u$、$p \\nmid u$，由中国剩余定理 $R/(d) \\cong R/(p^{v}) \\oplus R/(u)$，故 $R/(d)[p^{k}] \\cong R/(p^{\\min(k,v)})$。于是 $M[p^{k}] \\cong \\bigoplus_{i} R/(p^{\\min(k, v_{p}(d_{i}))})$；把 $p^{k-1}M[p^{k}]/p^{k}M[p^{k}]$ 看成 $R/(p)$-向量空间，其维数恰为「$v_{p}(d_{i}) \\ge k$ 的 $i$ 的个数」$c_{k}(p)$。这个维数由 $M$ 决定，故所有 $c_{k}(p)$ 由 $M$ 决定。注意整除链是**递增**的 $d_{1}\\mid d_{2}\\mid\\cdots\\mid d_{s}$，故 $v_{p}(d_{1})\\le\\cdots\\le v_{p}(d_{s})$；把 $c_{k}(p)$ 从大端读：$\\#\\{k : c_{k}(p)\\ge i\\}$ 数的是「满足 $v_{p}(d_{j})\\ge k$ 的 $j$ 至少有 $i$ 个」的那些 $k$，而 $j$ 单调递增，所以它等于 $v_{p}(d_{s-i+1})$。于是 $v_{p}(d_{s-i+1}) = \\#\\{k : c_{k}(p) \\ge i\\}$ 由 $M$ 决定（$i=1$ 对应链上最大的 $d_{s}$）；对每个 $p$ 都如此，全部 $d_{i}$ 就由 $M$ 决定。',
        '**收尾：极小多项式与特征多项式**：每个 $C_{d}$ 的特征多项式与极小多项式都是 $d$（对 $R/(d)$ 上乘 $x$ 的算子，$d$ 是零化多项式且次数最小：$1, x, \\ldots, x^{m-1}$ 线性无关，而 $x^{m}$ 已落入它们的张成）。分块对角矩阵的特征多项式是各块之积 $d_{1}\\cdots d_{s}$；极小多项式是各块极小多项式的最小公倍，整除链下即 $d_{s}$。这正是「$d_{s}$ 是极小多项式、$d_{1}\\cdots d_{s}$ 是特征多项式」的来历。∎',
        '⚠️ **本图缺的节点/边**：证明用到 Cayley–Hamilton（有节点，但没有连到本条）与「$K[x]$ 上有限生成模的结构定理」（本图没有这个节点），所以两条引理连同证明一起写在这里，而不是引用一条并不存在的边。'
      ].join('\n\n'),
      refs: [
        'Hoffman–Kunze, Linear Algebra, Ch. 7（The Rational and Jordan Forms）· 有理标准形',
        'Dummit–Foote, Abstract Algebra, Ch. 12（Modules over Principal Ideal Domains）· 主理想整环上的模',
        '北大《高等代数》· 有理标准形'
      ]
    },

    {
      id: 'def.characteristic',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '域的特征',
      title: '域的特征：$1$ 加多少次回到 $0$',
      regions: ['algebra'],
      tags: ['定义', '代数', '域', '特征', '素域'],
      statement: [
        '**在做什么**：给域配一个数，记「$1$ 要加多少次才回到 $0$」。它决定了域里能不能做除法以外的「模 $p$ 运算」，也决定素域是哪个。',
        '',
        '设 $K$ 是域。考虑唯一环同态',
        '',
        '$$\\varphi : \\mathbb{Z} \\to K, \\qquad \\varphi(n) = \\underbrace{1 + 1 + \\cdots + 1}_{n} .$$',
        '',
        '它的核是 $\\mathbb{Z}$ 的理想，故为 $(0)$ 或 $(p)$（$p$ 素数）。称',
        '',
        '- $\\ker\\varphi = (p)$ 的情形为**特征 $p$**，记 $\\operatorname{char} K = p$；',
        '- $\\ker\\varphi = (0)$ 的情形为**特征 $0$**，记 $\\operatorname{char} K = 0$（此时 $\\varphi$ 单射，$K$ 含一份 $\\mathbb{Q}$）。',
        '',
        '**素域**：$K$ 的最小子域（叫**素域**）同构于 $\\mathbb{F}_{p} = \\mathbb{Z}/p\\mathbb{Z}$（特征 $p$）或 $\\mathbb{Q}$（特征 $0$）。所以「特征」决定了域的**最小地基**。',
        '',
        '**关键性质**：$\\operatorname{char} K = p$ 时，对一切 $a \\in K$ 有 $pa = 0$，且 $(a + b)^{p} = a^{p} + b^{p}$（**Frobenius**：二项式系数 $\\binom{p}{k}$ 都被 $p$ 整除）。'
      ].join('\n'),
      notes: [
        '⭐ **为什么必须是素数**：若 $1$ 加 $n$ 次回到 $0$ 而 $n = ab$ 可分解，则 $0 = n\\cdot 1 = (a\\cdot 1)(b\\cdot 1)$，域无零因子 $\\implies$ $a \\cdot 1 = 0$ 或 $b\\cdot 1 = 0$ $\\implies$ $n$ 不是最小的。\n\n所以核只能是 $(0)$ 或 $(p)$，**不存在特征 $4$ 的域**。',
        '⚠️ **$\\operatorname{char}$ 不是「元素个数」**：$\\mathbb{F}_{p^{n}}$ 的特征是 $p$，不是 $p^{n}$。\n\n特征只记「$\\mathbb{Z}$ 怎么映进来」，元数记 $\\lvert K\\rvert$。\n\n两者对有限域由 $\\lvert K\\rvert = p^{n}$ 联系（$p$ 是特征），但特征本身是那个 $p$。',
        '⚠️ **与 `def.finchar`（有限特征族）无关**：那是序论 / Tukey 引理里的概念（「有限特征族」），只是中文撞了「特征」两个字。名字里带「特征」的东西在图上还有特征值、特征子空间、特征多项式、特征类 —— 各自独立。',
        '⭐ **Frobenius 是特征 $p$ 的标志性现象**：$x \\mapsto x^{p}$ 是域同态（在有限域上还是自同构），而特征 $0$ 里完全没有对应物。$\\mathbb{F}_{p^{n}}$ 的 Galois 群就是 Frobenius 生成的循环群。'
      ].join('\n\n'),
      refs: [
        'Dummit–Foote, Abstract Algebra（⚠️ 章节未核实，只记书名）· 域的特征',
        '北大《高等代数》· 域的特征与素域'
      ]
    }
  ],

  edges: [
    { id: 'dep.closed-derham', kind: 'definition',
      definition: 'def.de-rham-complex', usedBy: 'def.closed-form',
      note: '闭形式是 de Rham 复形里 $d$ 的核。' },
    { id: 'dep.closed-cycle', kind: 'definition',
      definition: 'def.cycle', usedBy: 'def.closed-form',
      note: '闭形式就是 de Rham 复形的**闭链**（$Z^{k} = \\ker d$）。' },
    { id: 'dep.closed-extd', kind: 'definition',
      definition: 'prop.exterior-derivative-manifold', usedBy: 'def.closed-form',
      note: '定义 $d\\omega = 0$ 用的是流形上的外微分。' },

    { id: 'dep.exact-derham', kind: 'definition',
      definition: 'def.de-rham-complex', usedBy: 'def.exact-form',
      note: '恰当形式是 de Rham 复形里 $d$ 的像。' },
    { id: 'dep.exact-boundary', kind: 'definition',
      definition: 'def.boundary', usedBy: 'def.exact-form',
      note: '恰当形式就是 de Rham 复形的**边缘**（$B^{k} = \\operatorname{im} d$）。' },
    { id: 'dep.exact-extd', kind: 'definition',
      definition: 'prop.exterior-derivative-manifold', usedBy: 'def.exact-form',
      note: '定义 $\\omega = d\\eta$ 用的是外微分。' },

    { id: 'dep.rcf-minpoly', kind: 'definition',
      definition: 'def.minimal-poly', usedBy: 'thm.rational-canonical-form',
      note: '不变因子里最大的那个 $d_{s}$ 就是极小多项式。' },
    { id: 'dep.rcf-similarity', kind: 'definition',
      definition: 'def.similarity', usedBy: 'thm.rational-canonical-form',
      note: '结论是「相似于」某个分块对角阵 —— 分类的是相似类。' },
    { id: 'dep.rcf-poly', kind: 'definition',
      definition: 'def.char-poly', usedBy: 'thm.rational-canonical-form',
      note: '不变因子之积是特征多项式，两条多项式链在这里对齐。' },

    { id: 'dep.char-field', kind: 'definition',
      definition: 'def.field', usedBy: 'def.characteristic',
      note: '特征是对**域**说的（更一般地对整环也能定义）。' },
    { id: 'dep.char-primering', kind: 'definition',
      definition: 'def.ring', usedBy: 'def.characteristic',
      note: '定义走 $\\mathbb{Z} \\to K$ 这个环同态，要先有环与理想。' }
  ]
});
