/* ==========================================================================
   内容包 · 线性代数 ⑦：多重线性与张量
   --------------------------------------------------------------------------
   新星团 `algebra.multilinear`（8 点）。这一包造的是**把「多变量线性」变成
   「单变量线性」的机器**：

     双线性型 → 张量积（万有性质）→ 张量 ⊣ 内 Hom（伴随）
       → 外幂 → 外代数 → 对称代数 → **行列式 = 最高外幂上的作用**

   ⭐ 与图上别处的接口：
     · `prop.module-tensor-universal`（模的张量积）—— 同一件事的一般版本
     · `prop.tensor-hom-adjunction` 就是「张量 ⊣ 内 Hom」这只伴随
     · 外代数让 `def.determinant` 与 `thm.det-exists-unique` 有了统一来源
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '线性代数：多重线性与张量',
  nodes: [

    {
      id: 'def.bilinear-form',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '双线性型',
      title: '双线性型',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '张量'],
      statement: [
        '设 $V, W, U$ 是 $K$-向量空间。映射 $B : V \\times W \\to U$ 叫**双线性**的，当且仅当固定一个变元后，对另一个变元是线性的：',
        '',
        '$$B(v + cv\', w) = B(v, w) + c\\,B(v\', w), \\qquad B(v, w + cw\') = B(v, w) + c\\,B(v, w\')$$',
        '',
        '$V = W$、$U = K$ 时叫 $V$ 上的**双线性型**。记全体为 $\\operatorname{Bil}(V, W; U)$，它按逐点运算构成 $K$-向量空间。',
        '',
        '特例：内积（正定对称）、辛形式（非退化交错）、二次型的极化（对称）都是双线性型。'
      ].join('\n'),
      notes: '⭐ 双线性「比线性弱」：$B$ 不是 $V \\times W \\to U$ 的线性映射（$V \\times W$ 上的线性要求 $B(v + v\', w + w\') = B(v,w) + B(v\',w\')$，一般不对）。这正是张量积要解决的问题 —— **把双线性「翻译」成线性**。\n\n⭐ 固定一组基后，$\\operatorname{Bil}(V, W; K) \\cong M_{m \\times n}(K)$（取 $B(e_i, f_j)$），与「矩阵就是双线性型的系数」一致。\n\n⭐ $\\operatorname{Bil}(V, W; U) \\cong \\operatorname{Hom}(V \\otimes W, U)$ —— 这就是万有性质那一条。',
      refs: ['Lang, Algebra, Ch. XVI', 'Roman, Advanced Linear Algebra, Ch. 14']
    },
    {
      id: 'def.tensor-product-vs',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '张量积',
      title: '向量空间的张量积 $V \\otimes W$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '张量'],
      statement: [
        '设 $V, W$ 是 $K$-向量空间。取它们的一组基 $(e_i)$、$(f_j)$，定义形式符号 $e_i \\otimes f_j$ 的**形式线性组合**全体',
        '',
        '$$V \\otimes_K W := \\Bigl\\{\\, \\sum_{i, j} c_{ij}\\, e_i \\otimes f_j \\,\\Bigr\\}$$',
        '',
        '配上双线性映射 $\\otimes : V \\times W \\to V \\otimes W$、$v \\otimes w$，满足',
        '',
        '$$(v + v\') \\otimes w = v \\otimes w + v\' \\otimes w, \\qquad v \\otimes (w + w\') = v \\otimes w + v \\otimes w\', \\qquad (cv) \\otimes w = v \\otimes (cw)$$',
        '',
        '则 $\\dim(V \\otimes W) = (\\dim V)(\\dim W)$，且这个构造**不依赖基的选取**（见万有性质）。'
      ].join('\n'),
      notes: '⭐ 元素分两类：**可分解张量** $v \\otimes w$ 与它们的**有限和**。后者才填满整个 $V \\otimes W$ —— 「一般张量不是单个 $v \\otimes w$」是初学者最常踩的坑。\n\n⚠ $v \\otimes w = 0$ 可以发生在 $v \\ne 0, w \\ne 0$ 时吗？不可以（张量积是自由构造，基底是 $e_i \\otimes f_j$）。这与「不可分解为纯张量」是两件事。\n\n⭐ 张量积是**对称的**（$V \\otimes W \\cong W \\otimes V$）且**结合的**，单位元是 $K$（$V \\otimes K \\cong V$）—— 于是有限维向量空间配上 $\\otimes$ 构成一个对称幺半范畴。',
      refs: ['Lang, Algebra, Ch. XVI', 'Roman, Advanced Linear Algebra, Ch. 14']
    },
    {
      id: 'thm.tensor-universal-property',
      cluster: 'algebra.multilinear',
      type: 'theorem',
      label: '张量积的万有性质',
      title: '定理：张量积把双线性映射换成线性映射',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '张量'],
      statement: [
        '对每个线性映射（更一般地：双线性映射）$B : V \\times W \\to U$，存在**唯一**的线性映射',
        '',
        '$$\\widetilde{B} : V \\otimes W \\to U, \\qquad \\widetilde{B}(v \\otimes w) = B(v, w)$$',
        '',
        '反之，任何线性映射 $\\widetilde B$ 与 $\\otimes$ 复合都给出双线性映射。于是有自然的同构',
        '',
        '$$\\operatorname{Hom}_K(V \\otimes W,\\ U) \\;\\cong\\; \\operatorname{Bil}(V, W; U)$$',
        '',
        '（对每个 $U$ 自然，这就是「张量积是双线性函子的**表示**」）'
      ].join('\n'),
      notes: '⭐ 一句话：**张量积是「多变量线性」的线性化装置** —— 所有双线性的东西，只要写成 $V \\otimes W$ 上的映射就自动变成线性的，后面整套线性代数都能用。\n\n⭐ 「唯一」是万有性质的核心：它保证 $V \\otimes W$ 在**同构唯一**的意义下被确定（存在性给构造、唯一性给「不依赖构造」）。这也是图上「同一招」第三次出现（张量积、商空间、外幂各一次）。\n\n⭐ 任意交换环上也成立（`prop.module-tensor-universal`），系数域只是最简单的情形。',
      refs: ['Lang, Algebra, Ch. XVI']
    },
    {
      id: 'prop.tensor-hom-adjunction',
      cluster: 'algebra.multilinear',
      type: 'proposition',
      label: '张量 ⊣ 内 Hom',
      title: '命题：$(-) \\otimes V \\dashv \\operatorname{Hom}(V, -)$',
      regions: ['algebra'],
      tags: ['命题', '线性代数', '张量', '伴随'],
      statement: [
        '固定 $V$。则对一切 $K$-向量空间 $W, U$ 有自然同构',
        '',
        '$$\\operatorname{Hom}_K(W \\otimes V,\\ U) \\;\\cong\\; \\operatorname{Hom}_K\\bigl( W,\\ \\operatorname{Hom}_K(V, U) \\bigr)$$',
        '',
        '即函子 $(-) \\otimes V$ 是 $\\operatorname{Hom}(V, -)$ 的**左伴随**：',
        '',
        '$$(-) \\otimes_K V \\;\\dashv\\; \\operatorname{Hom}_K(V, -)$$'
      ].join('\n'),
      notes: '⭐ 这是**张量–内 Hom 伴随**（tensor–hom adjunction），也是「自由–遗忘」之外的第二个伴随范本：它把「两个变量的线性映射」与「取值在函数空间里的线性映射」对应起来（**curry 化**）。\n\n⭐ 它在范畴论里的地位：「$\\otimes$ 是闭的」这一条（对称幺半闭范畴）就是这只伴随的存在性 —— 图上 `def.adjoint` 那一团可以直接接过来。\n\n⚠ 「自然」两个字不能省：同构本身容易写，但要让它对 $W, U$ 自然，才足以称为伴随。这也是伴随与「碰巧同构」的区别。',
      refs: ['Lang, Algebra, Ch. XVI', 'Mac Lane, Categories for the Working Mathematician, Ch. IV']
    },
    {
      id: 'def.exterior-power',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '外幂',
      title: '外幂 $\\bigwedge^{k} V$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '张量'],
      statement: [
        '设 $V$ 是 $K$-向量空间。$V$ 的 **$k$ 次外幂** $\\bigwedge^{k} V$ 是 $V^{\\otimes k}$ 商掉由',
        '',
        '$$v_1 \\otimes \\cdots \\otimes v_k \\quad \\text{with}\\ v_i = v_j\\ (i \\ne j)$$',
        '',
        '张成的子空间所得的商空间；记像为 $v_1 \\wedge \\cdots \\wedge v_k$。于是',
        '',
        '$$v \\wedge v = 0, \\qquad v \\wedge w = -\\, w \\wedge v$$',
        '',
        '并且 $\\dim \\bigwedge^{k} V = \\binom{n}{k}$（$n = \\dim V$）；$k > n$ 时 $\\bigwedge^{k}V = 0$。'
      ].join('\n'),
      notes: '⭐ 几何含义：$\\dim V = n$ 时 $\\bigwedge^{n} V$ 是**一维**的，而 $v_1 \\wedge \\cdots \\wedge v_n$ 正是「这 $n$ 个向量张成的平行体的有向体积」——它的系数就是行列式。\n\n⭐ 交错性是「商掉」实现的：$v \\wedge v = 0$（把 $v \\otimes v$ 送进商），这正是 `def.alternating-form` 那一条里「两个变元相等则为零」。\n\n⚠ 特征 $2$ 的域里 $v \\wedge w = -w \\wedge v$ 与 $v \\wedge w = w \\wedge v$ 是同一句话（$-1 = 1$），交错与对称不再可分。本图默认 $\\operatorname{char} K \\ne 2$。',
      refs: ['Lang, Algebra, Ch. XIX', 'Roman, Advanced Linear Algebra, Ch. 14']
    },
    {
      id: 'def.exterior-algebra',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '外代数',
      title: '外代数 $\\bigwedge^{\\bullet} V$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '张量'],
      statement: [
        '把各次外幂直和起来：',
        '',
        '$$\\bigwedge^{\\bullet} V := \\bigoplus_{k \\ge 0} \\bigwedge^{k} V \\qquad (\\bigwedge^{0} V := K,\\ \\bigwedge^{1} V := V)$$',
        '',
        '它按「先张量再取像」的乘法 $\\wedge$ 构成一个**分次交换代数**：',
        '',
        '$$(u \\wedge v) \\wedge w = u \\wedge (v \\wedge w), \\qquad v \\wedge w = (-1)^{|v| |w|}\\ w \\wedge v$$',
        '',
        '（$|v|$ 是元素的次数。「分次交换」意味着奇次元素之间反交换。）'
      ].join('\n'),
      notes: '⭐ 外代数是「**带符号的多项式代数**」：它与对称代数一起构成两个极端 —— 对称代数允许交换、外代数强制反交换。两者的共同来源是「把 $V^{\\otimes k}$ 按对称群作用取商 / 取不变量」。\n\n⭐ 用途清单：微分形式（$\\bigwedge^{k}(\\mathbb{R}^{n})^{\\ast}$ 就是 $k$-形式空间）、体积与行列式、Clifford 代数（把 $\\wedge$ 换成 $v^{2} = -\\|v\\|^{2}$）、de Rham 复形。\n\n⚠ 它是**非交换**的（奇次部分反交换），但**分次交换**：这一点在写符号时最容易错（换两个奇元素时要带一个负号）。',
      refs: ['Lang, Algebra, Ch. XIX']
    },
    {
      id: 'def.symmetric-algebra',
      cluster: 'algebra.multilinear',
      type: 'definition',
      label: '对称代数',
      title: '对称代数 $\\operatorname{Sym}^{\\bullet} V$',
      regions: ['algebra'],
      tags: ['定义', '线性代数', '张量'],
      statement: [
        '与外幂平行地，对称幂定义为 $V^{\\otimes k}$ 商掉由 $v \\otimes w - w \\otimes v$ 张成的子空间，记像为 $v \\cdot w$（交换）；再把各次直和起来得**对称代数**',
        '',
        '$$\\operatorname{Sym}^{\\bullet} V := \\bigoplus_{k \\ge 0} \\operatorname{Sym}^{k} V$$',
        '',
        '它是一个**交换**分次代数，并且',
        '',
        '$$\\dim \\operatorname{Sym}^{k} V = \\binom{n + k - 1}{k}, \\qquad \\operatorname{Sym}^{\\bullet} V \\cong K[x_1, \\ldots, x_n] \\ (n = \\dim V)$$'
      ].join('\n'),
      notes: '⭐ 三个「$V^{\\otimes \\bullet}$ 的商」构成一张完整的表：\n\n- 全不商 $\\implies$ **张量代数** $T^{\\bullet}V$（非交换、自由）；\n- 商掉 $vw - wv$ $\\implies$ **对称代数** $\\operatorname{Sym}^{\\bullet}V \\cong K[x_1, \\ldots, x_n]$（交换）；\n- 商掉 $vw + wv$ $\\implies$ **外代数** $\\bigwedge^{\\bullet}V$（分次交换）。\n\n⭐ «$\\operatorname{Sym}^{\\bullet}V \\cong K[x_1,\\ldots,x_n]$» 说明多项式环不是凭空造出来的 —— 它就是「$n$ 维空间的对称代数」。这解释了为什么多项式与多重线性型的关系这么紧（也回到 `def.polynomial-ring`）。\n\n⭐ 二重线性型的分类（对称 / 交错）在代数层面的化身就是这两个商。',
      refs: ['Lang, Algebra, Ch. XIX']
    },
    {
      id: 'thm.det-as-exterior',
      cluster: 'algebra.multilinear',
      type: 'theorem',
      label: '行列式 = 最高外幂上的作用',
      title: '定理：行列式就是 $T$ 在 $\\bigwedge^{n}V$ 上的作用',
      regions: ['algebra'],
      tags: ['定理', '线性代数', '张量', '行列式'],
      statement: [
        '设 $\\dim_K V = n < \\infty$，$T : V \\to V$ 线性。因为 $\\dim \\bigwedge^{n} V = 1$，$T$ 诱导出的一维空间上的线性映射',
        '',
        '$$\\bigl( \\textstyle\\bigwedge^{n} T \\bigr) : \\bigwedge^{n} V \\to \\bigwedge^{n} V, \\qquad v_1 \\wedge \\cdots \\wedge v_n \\mapsto T(v_1) \\wedge \\cdots \\wedge T(v_n)$$',
        '',
        '必是「乘一个数」。那个数正是行列式：',
        '',
        '$$\\bigl( \\textstyle\\bigwedge^{n} T \\bigr)(v_1 \\wedge \\cdots \\wedge v_n) = (\\det T)\\,(v_1 \\wedge \\cdots \\wedge v_n)$$',
        '',
        '等价说法：$\\det T$ 是 $T$ 在**最高外幂**这个一维空间上的特征值。'
      ].join('\n'),
      notes: '⭐ 这条定理把行列式的三条公理**一次性地解释掉了**：\n- 多重线性 $\\Longleftarrow$ $\\wedge$ 对每个变元线性；\n- 交错性 $\\Longleftarrow$ $v \\wedge v = 0$（商空间的构造）；\n- 规范性 $\\Longleftarrow$ 取 $v_i = e_i$ 时 $e_1 \\wedge \\cdots \\wedge e_n$ 是基、系数定为 $1$。\n\n⭐ 于是 `thm.det-exists-unique` 的「存在唯一性」变成了「一维空间上的线性映射只能乘一个数」——**同一个定理的第二种证明**，而且是概念上更干净的那种。\n\n⭐ 它同时说明：$\\det$ 是**换基不变的**（因为 $\\bigwedge^{n}T$ 不依赖基）、$\\det(AB) = \\det A \\det B$（函子性：$\\bigwedge^{n}(AB) = \\bigwedge^{n}A \\circ \\bigwedge^{n}B$，而一维空间上映射的复合就是乘法）—— `thm.det-multiplicative` 也是一条推论。',
      refs: ['Lang, Algebra, Ch. XIX', 'Roman, Advanced Linear Algebra, Ch. 14']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.multilinearform-bilinear',
      kind: 'definition',
      definition: 'def.multilinear-form',
      usedBy: 'def.bilinear-form',
      note: '双线性型就是 $n = 2$ 的多重线性型（多了一层「两个空间可以不同、值域可以不是 $K$」的推广）。'
    },
    {
      id: 'dep.bilinear-tensor',
      kind: 'definition',
      definition: 'def.bilinear-form',
      usedBy: 'def.tensor-product-vs',
      note: '张量积的万有性质就是「把双线性映射换成线性映射」——对象是双线性映射。'
    },
    {
      id: 'dep.tensor-exterior',
      kind: 'definition',
      definition: 'def.tensor-product-vs',
      usedBy: 'def.exterior-algebra',
      note: '外代数是张量代数 $V^{\\otimes\\bullet}$ 的商（商掉 $v \\otimes v$ 型的元素）。'
    },
    {
      id: 'dep.tensor-symmetric',
      kind: 'definition',
      definition: 'def.tensor-product-vs',
      usedBy: 'def.symmetric-algebra',
      note: '对称代数同样是张量代数的商（商掉 $v \\otimes w - w \\otimes v$）。'
    },
    {
      id: 'dep.alternating-exteriorpower',
      kind: 'definition',
      definition: 'def.alternating-form',
      usedBy: 'def.exterior-power',
      note: '外幂的「交错」性质（$v \\wedge v = 0$）与交错型是同一个条件的两副面孔：一个是代数里的乘法，一个是多重线性型的取值。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.tensor-universal-property',
      kind: 'implication',
      sources: ['def.tensor-product-vs', 'def.quotient-vs'],
      target: 'thm.tensor-universal-property',
      title: '张量积的构造 $\\implies$ 万有性质',
      proof: [
        '**存在性**：给定双线性 $B : V \\times W \\to U$。先在 $V \\times W$ 生成的自由向量空间（形式上取全部 $(v, w)$ 的形式线性组合）上定义 $\\widehat B\\bigl( \\sum c_{ij}(v_i, w_j) \\bigr) := \\sum c_{ij} B(v_i, w_j)$，这是线性的；再由 $B$ 的双线性，$\\widehat B$ 在「双线性关系」张成的子空间上取零，于是由**商空间的万有性质**（`thm.quotient-universal-vs`）它唯一地下降为 $\\widetilde B : V \\otimes W \\to U$。',
        '',
        '**唯一性**：任何满足 $\\widetilde B(v \\otimes w) = B(v, w)$ 的线性映射在可分解张量上取值已定；而可分解张量张成 $V \\otimes W$，故线性映射被取值唯一确定。',
        '',
        '**反向**：给定线性 $\\widetilde B$，则 $B := \\widetilde B \\circ \\otimes$ 是双线性的（因为 $\\otimes$ 双线性）。',
        '',
        '两个方向互逆且自然，故 $\\operatorname{Hom}(V \\otimes W, U) \\cong \\operatorname{Bil}(V, W; U)$。∎'
      ].join('\n'),
      note: '结尾的「自然」两字是**伴随**的入口：正因为同构对 $U$（以及 $V, W$）自然，张量积才是一个真正的函子层面的构造，而不仅是「某个具体的商空间」。'
    },
    {
      id: 'imp.tensor-hom-adjunction',
      kind: 'implication',
      sources: ['thm.tensor-universal-property'],
      target: 'prop.tensor-hom-adjunction',
      title: '万有性质 $\\implies$ 张量 ⊣ 内 Hom',
      proof: [
        '由万有性质，对一切 $W, U$：',
        '',
        '$$\\operatorname{Hom}(W \\otimes V, U) \\cong \\operatorname{Bil}(W, V; U)$$',
        '另一方面，**双线性映射与「取值在线性映射里的线性映射」一一对应**（curry 化）：给定 $B : W \\times V \\to U$，对每个 $w$ 得到 $B(w, -) \\in \\operatorname{Hom}(V, U)$，且 $w \\mapsto B(w, -)$ 线性 —— 这个对应是双射。于是',
        '',
        '$$\\operatorname{Bil}(W, V; U) \\cong \\operatorname{Hom}\\bigl( W, \\operatorname{Hom}(V, U) \\bigr)$$',
        '',
        '两式复合即得所要的同构，且逐条验证它对 $W, U$ 自然（同构由「$w \\mapsto$ 那个线性映射」显式给出，与别的变元无关）。∎'
      ].join('\n'),
      note: '整条证明没有用到 $V$ 的有限维（这是纯范畴论的事实），只用到张量积的万有性质。'
    },
    {
      id: 'imp.det-as-exterior',
      kind: 'implication',
      sources: ['def.exterior-power', 'thm.det-exists-unique'],
      target: 'thm.det-as-exterior',
      title: '外幂的一维性 + 存在唯一性 $\\implies$ 行列式就是那个系数',
      proof: [
        '设 $\\dim V = n$。',
        '',
        '1. **$\\bigwedge^{n}V$ 是一维的**：取 $V$ 的基 $e_1, \\ldots, e_n$，则 $\\{e_{i_1}\\wedge\\cdots\\wedge e_{i_n}\\}$ 中只有 $i_1, \\ldots, i_n$ 互异的那些非零，即只有 $e_1 \\wedge \\cdots \\wedge e_n$ 一个（差符号），故 $\\dim \\bigwedge^{n}V = 1$。',
        '2. **一维空间上的线性映射就是乘一个数**：设 $\\dim L = 1$、$\\varphi : L \\to L$ 线性，取 $0 \\ne \\ell \\in L$，则 $\\varphi(\\ell) = c\\,\\ell$ 对某个 $c$；对任意 $t\\ell$ 有 $\\varphi(t\\ell) = t\\varphi(\\ell) = tc\\ell$，故 $\\varphi$ 就是「乘 $c$」。',
        '3. **定出那个数**：定义 $D(v_1, \\ldots, v_n) := $ 满足 $T(v_1)\\wedge\\cdots\\wedge T(v_n) = D\\cdot(e_1\\wedge\\cdots\\wedge e_n)$ 的系数（先固定 $v_i = e_i$ 定义，再对一般 $v_i$ 用交错多重线性延拓）。逐条验证 $D$ 满足多重线性、交错、规范化三条公理，由**行列式的存在唯一性**得 $D = \\det T$。',
        '',
        '于是 $(\\bigwedge^{n}T)(v_1 \\wedge \\cdots \\wedge v_n) = (\\det T)(v_1 \\wedge \\cdots \\wedge v_n)$。∎'
      ].join('\n'),
      note: '第 3 步的做法值得记住：**先把「一维空间上的系数」定义出来，再用存在唯一性把它认成行列式** —— 这样就不必真的去算那个系数。'
    }
  ]
});
