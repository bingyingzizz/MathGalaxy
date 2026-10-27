/* ==========================================================================
   内容包 · 解析几何 ②：相干对偶的全局版本（Clausen–Scholze, Lectures on
   Condensed Mathematics, Bonn 2019, Lecture XI）
   --------------------------------------------------------------------------
   Lecture VIII 给了仿射模型（f_! = j_! 的复合），这一包把它铺到概形上，
   并接上经典的 6-函子形式：

     6-函子形式 → 开浸入的 j_! → f_! := f^{ad/Y}_* ∘ j_!
       → f^! 的扭转与平坦基变换 → 正则闭浸入的对偶复形
       → 光滑 f 的 f^!R = det(Ω)[d] → 光滑情形的 Poincaré/Serre 对偶

   ⭐ 与图上别处的接口：
     · `thm.coherent-duality`（仿射版，cond.analytic）
     · `prop.analytic-base-change`（换解析环）
     · `def.adic-spectrum` / `def.discrete-adic-space`（adic 化的舞台）
     · `thm.breen-deligne` 等凝聚态上同调计算（f_! 的紧性）
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '解析几何：相干对偶',
  nodes: [

    {
      id: 'def.six-functors',
      cluster: 'analytic.dual',
      type: 'definition',
      label: '6-函子形式',
      title: '6-函子形式（Six-Functor Formalism）',
      regions: ['analytic'],
      tags: ['定义', '解析几何', '对偶'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture XI, p. 72'],
      statement: [
        '一个**6-函子形式**由下列数据组成：',
        '',
        '- 每个概形 $X$ 给一个闭对称幺半三角范畴 $D(X)$（张量积 $- \\otimes_X -$ 有右伴随 $\\operatorname{Hom}_X$）；',
        '- 每个映射 $f : X \\to Y$ 给**拉回** $f^* : D(Y) \\to D(X)$，它有右伴随 $f_*$；',
        '- 每个（满足适当条件的）映射 $f : X \\to Y$ 给**紧支撑推前** $f_! : D(X) \\to D(Y)$，它有右伴随 $f^!$。',
        '',
        '合计六个函子：$\\otimes,\\ \\operatorname{Hom},\\ f^*,\\ f_*,\\ f_!,\\ f^!$。它们应当满足：',
        '',
        '**(i)** $f$ 固有 $\\implies f_! = f_*$；**(ii)** $f$ 平展 $\\implies f^! = f^*$；',
        '',
        '**(iii) Verdier 对偶**：$f_* \\operatorname{Hom}_X(A, f^!B) \\cong \\operatorname{Hom}_Y(f_!A, B)$；',
        '',
        '**(iv) 投影公式**：$f_!(A \\otimes_X f^*B) \\cong f_!A \\otimes_Y B$；',
        '',
        '**(v) 固有基变换**：拉回方块中 $g^* f_! \\cong f\'_! g\'^*$；',
        '',
        '**(vi) Poincaré 对偶**：$f$ 光滑时 $f^!\\mathbf{1}_Y \\otimes_X f^*B \\to f^!B$ 是同构，且 $f^!\\mathbf{1}_Y$ 可逆。'
      ].join('\n'),
      notes: '⭐ 前四个函子 $\\otimes, \\operatorname{Hom}, f^*, f_*$ 通常容易造；**全部难度在 $f_!$**。经典例子是 $\\ell$-进层 $D_{\\mathrm{et}}(X, \\mathbb{Z}_\\ell)$ 与凝聚态/固态层。\n\n⭐ 一旦有了 $f_!$，$f^!$ 由伴随给出。反过来，$f_!$ 也由「开浸入 + 固有映射 + Nagata 紧化」决定：$f = \\bar f \\circ j$ 时 $f_! = \\bar f_* j_!$。所以真正要造的只有**开浸入的 $j_!$**（见 `prop.open-immersion-shriek`）。\n\n⚠ 在凝聚态世界里，$f_!$ 不能只用抽象 $A$-模造 —— 开浸入的 $j_!$ 要求 $\\prod_I A \\otimes_A A[1/f] \\cong \\prod_I A[1/f]$，这在抽象模里失效、在**固态模**里成立。'
    },
    {
      id: 'prop.open-immersion-shriek',
      cluster: 'analytic.dual',
      type: 'proposition',
      label: '开浸入的 j_!',
      title: '命题：开浸入 $j$ 的 $j_!$ 存在（Prop 11.2）',
      regions: ['analytic'],
      tags: ['命题', '解析几何', '对偶'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture XI, Proposition 11.2'],
      statement: [
        '设 $j : X_{\\mathrm{ad}} \\to X_{\\mathrm{ad}/Y}$ 是开浸入。则遗忘函子',
        '',
        '$$j^* : D\\bigl((\\mathcal{O}_{X_{\\mathrm{ad}/Y}}, \\mathcal{O}^+_{X_{\\mathrm{ad}/Y}})_\\blacksquare\\bigr) \\longrightarrow D\\bigl((\\mathcal{O}_{X_{\\mathrm{ad}}}, \\mathcal{O}^+_{X_{\\mathrm{ad}}})_\\blacksquare\\bigr)$$',
        '',
        '有**左伴随**',
        '',
        '$$j_! : D\\bigl((\\mathcal{O}_{X_{\\mathrm{ad}}}, \\mathcal{O}^+_{X_{\\mathrm{ad}}})_\\blacksquare\\bigr) \\longrightarrow D\\bigl((\\mathcal{O}_{X_{\\mathrm{ad}/Y}}, \\mathcal{O}^+_{X_{\\mathrm{ad}/Y}})_\\blacksquare\\bigr).$$'
      ].join('\n'),
      notes: [
        '⭐ 这条是整套 6-函子的**唯一硬点**。$j_!$ 存在等价于 $j^*$ 保极限（因为左伴随存在 $\\iff$ 保极限），而 $j^*$ 在开浸入上就是「局部化 $A \\mapsto A[1/f]$」。于是要求',
        '',
        '$$\\prod_I A \\otimes_{A_\\blacksquare} A[1/f]_\\blacksquare \\;\\cong\\; \\prod_I A[1/f].$$',
        '',
        '在抽象 $A$-模里这**不成立**（$\\prod$ 与局部化不交换），在固态 $A$-模里成立 —— 这就是为什么相干对偶需要凝聚态/固态语言。',
        '',
        '📌 仿射、有限型情形由 Lecture VIII 附录给出；一般情形归约到仿射。'
      ].join('\n'),
    },
    {
      id: 'def.f-shriek',
      cluster: 'analytic.dual',
      type: 'definition',
      label: '紧支撑推前 f_!',
      title: '紧支撑推前 $f_!$ 与 $f^!$（Def 11.3）',
      regions: ['analytic'],
      tags: ['定义', '解析几何', '对偶'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture XI, Definition 11.3'],
      statement: [
        '设 $f : X \\to Y$ 是分离、有限型的概形映射，对应 adic 空间图',
        '',
        '$$\\begin{array}{ccc} X_{\\mathrm{ad}} & \\xrightarrow{\\ j\\ } & X_{\\mathrm{ad}/Y} \\\\ & f_{\\mathrm{ad}} \\searrow & \\downarrow f_{\\mathrm{ad}/Y} \\\\ & & Y_{\\mathrm{ad}} \\end{array}$$',
        '',
        '其中 $j$ 是开浸入（$f$ 固有时是同构）。定义',
        '',
        '$$f_! := (f_{\\mathrm{ad}/Y})_* \\circ j_! : D(\\mathcal{O}_{X,\\blacksquare}) \\longrightarrow D(\\mathcal{O}_{Y,\\blacksquare}).$$',
        '',
        '它保一切直和，故有右伴随 $f^!$。六个函子至此齐备。'
      ].join('\n'),
      notes: '⭐ 定义的形式很朴素：**先开浸入地推出去，再（沿相对 adic 化）正常推前**。全部内容在于 $j_!$ 存在（`prop.open-immersion-shriek`）。\n\n⭐ $f$ 固有时 $j$ 是同构，$f_! = (f^{\\mathrm{ad}/Y})_*$，与 $R\\Gamma$ 一致 —— 这正是 `thm.poincare-solid` 里「$f$ 固有时与整体截面一致」的来源。\n\n⚠ 「保直和」是 $f^!$ 存在的关键：$j_!$ 作为左伴随保余极限，$(f^{\\mathrm{ad}/Y})_*$ 在仿射局部上是有限个遗忘函子的极限，也保直和。'
    },
    {
      id: 'prop.f-shriek-base-change',
      cluster: 'analytic.dual',
      type: 'proposition',
      label: '对偶函子的扭转与基变换',
      title: '命题：$f^!$ 是 $f^*$ 的扭转，且平坦基变换（Prop 11.4）',
      regions: ['analytic'],
      tags: ['命题', '解析几何', '对偶'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture XI, Proposition 11.4'],
      statement: [
        '设 $f : R \\to A$ 是有限生成、有限 Tor 维数的环映射（诺特环之间映射的基变换）。则自然映射',
        '',
        '$$f^!R \\otimes^{L}_{A_\\blacksquare} f^* \\longrightarrow f^!$$',
        '',
        '是函子的等价。若 $g : R \\to S$ 平坦、$f\' : S \\to B = A \\otimes_R S$ 是基变换（$g\' : A \\to B$），则',
        '',
        '$$g\'^* f^! \\;\\simeq\\; f\'^! g^* : D(R_\\blacksquare) \\longrightarrow D(B_\\blacksquare).$$'
      ].join('\n'),
      notes: '⭐ 读法：**$f^!$ 就是「$f^*$ 再扭一个 $f^!R$」**。于是要算 $f^!$，只需算 $f^!R$（对偶复形）。\n\n⭐ 证明归约到两种情形：$f$ 满射（此时 $f_! = f_*$ 是遗忘函子，$f^! = \\operatorname{RHom}_R(A,-)$，基变换显然）与 $A = R[T]$（此时 $f_!M = M \\otimes_{(A,R)_\\blacksquare} R((T^{-1}))/R[T][-1]$，$f^!R = R[T][1]$，基变换化成 $R((T^{-1}))/R[T]$ 的基变换）。\n\n⚠ 有限 Tor 维数是必需的：否则 $f^!R$ 不是有限复形，扭转公式失效。'
    },
    {
      id: 'prop.regular-immersion-dualizing',
      cluster: 'analytic.dual',
      type: 'proposition',
      label: '正则闭浸入的对偶复形',
      title: '命题：正则闭浸入 $f^!R \\cong \\det(I/I^2)^*[-c]$（Prop 11.5）',
      regions: ['analytic'],
      tags: ['命题', '解析几何', '对偶'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture XI, Proposition 11.5'],
      statement: [
        '设 $f : R \\to A$ 是**正则闭浸入**：$f$ 满射，核 $I$ 在 $\\operatorname{Spec} R$ 上局部由正则序列生成；并设 $\\operatorname{Spec} A \\subset \\operatorname{Spec} R$ 处处纯余维 $c$。则',
        '',
        '$$f^!R = \\operatorname{RHom}_R(A, R) \\;\\cong\\; \\det\\nolimits_A(I/I^2)^*[-c].$$'
      ].join('\n'),
      notes: '⭐ 局部上 $A = R/(f_1, \\ldots, f_c)$（正则序列），Koszul 复形直接算出 $\\operatorname{RHom}_R(A,R) \\cong A[-c]$；$\\det(I/I^2)$ 由 $f_1 \\wedge \\cdots \\wedge f_c$ 给出基。整体化要验证与生成元选取无关。\n\n⭐ 这条 + 平坦基变换是算光滑情形的两块砖：把 $\\operatorname{Spec} A$ 嵌入仿射空间（正则闭浸入），再用对角把 $\\Omega$ 抠出来。'
    },
    {
      id: 'thm.smooth-duality',
      cluster: 'analytic.dual',
      type: 'theorem',
      label: '光滑映射的对偶复形',
      title: '定理：光滑 $f$ 的 $f^!R \\cong \\det(\\Omega^1_{A/R})[d]$（Thm 11.6）',
      regions: ['analytic'],
      tags: ['定理', '解析几何', '对偶'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture XI, Theorem 11.6'],
      statement: [
        '设 $f : R \\to A$ 是维数 $d$ 的光滑环映射。则存在自然同构',
        '',
        '$$f^!R \\;\\cong\\; \\det\\nolimits_A\\bigl(\\Omega^1_{A/R}\\bigr)[d].$$',
        '',
        '由于同构自然、且一切都局部定义，它整体化到任意光滑映射 $f : X \\to Y$。'
      ].join('\n'),
      notes: [
        '⭐ 这就是**对偶复形**：光滑情形下 $f^!\\mathbf{1}_Y$ 是一条可逆层（线丛）挪到次数 $d$，由 Kähler 微分的行列式给出。\n\n⭐ 证明用对角：$g : A \\otimes_R A \\to A$ 是余维 $d$ 的正则闭浸入（对角 $\\Delta_f$），把 $f^!R$ 用 $g^!$ 与两个投影拆开，再用正则闭浸入的公式，得到',
        '',
        '$$f^!R \\otimes f^!R \\otimes g^!(A \\otimes_R A) \\;\\cong\\; f^!R,$$',
        '',
        '比较两边即得 $\\det(\\Omega)[d]$。\n\n⚠ 这是「相干对偶在光滑情形下就是 Poincaré 对偶」的精确来源：$\\omega_{X/Y} = \\det(\\Omega^1_{X/Y})[d]$。'
      ].join('\n'),
    },
    {
      id: 'thm.poincare-solid',
      cluster: 'analytic.dual',
      type: 'theorem',
      label: '固态 Serre 对偶',
      title: '定理：光滑映射的紧支撑推前与对偶（Thm 11.1）',
      regions: ['analytic'],
      tags: ['定理', '解析几何', '对偶', 'Serre 对偶'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture XI, Theorem 11.1'],
      statement: [
        '设 $f : X \\to \\operatorname{Spec} R$ 是分离、光滑、有限型、维数 $d$ 的映射，$\\omega_{X/R} = \\bigwedge^d \\Omega^1_{X/R}$。则存在典范函子',
        '',
        '$$f_! : D(\\mathcal{O}_{X,\\blacksquare}) \\longrightarrow D(R_\\blacksquare),$$',
        '',
        '它在 $f$ 固有等同于 $R\\Gamma(X,-)$，且**保紧对象**。有**迹映射**',
        '',
        '$$f_!\\,\\omega_{X/R}[d] \\longrightarrow R,$$',
        '',
        '使得对一切 $C \\in D(\\mathcal{O}_{X,\\blacksquare})$，自然映射',
        '',
        '$$\\operatorname{RHom}_{\\mathcal{O}_X}(C, \\omega_{X/R})[d] \\longrightarrow \\operatorname{RHom}_R(f_!C,\\ R)$$',
        '',
        '是同构。'
      ].join('\n'),
      notes: '⭐ 这就是**固态版的 Serre 对偶 / Poincaré 对偶**：$f_!$ 是紧支撑上同调，$\\omega_{X/R}[d]$ 是对偶复形，迹映射把顶次紧支撑上同调送到基环。\n\n⭐ 「保紧对象」是**局部有限性**的版本：$f_!$ 把紧对象送到紧对象，等价于说相干上同调在紧支撑下有限。经典证明要 Chow 引理 + 消解；这里有 6-函子形式后是形式推论。\n\n⚠ 与 `thm.coherent-duality`（仿射版，Lecture VIII）的关系：那是 $f_!$ 的定义与投影公式；这里是**光滑情形**下把 $f^!$ 具体算成 $\\omega[d]$ 并给出迹配对。\n\n📌 原文 Lecture XI（pp. 71–76）。'
    }
  ],

  edges: [
    {
      id: 'imp.open-immersion-shriek',
      kind: 'implication',
      sources: ['def.f-shriek', 'thm.za-analytic'],
      target: 'prop.open-immersion-shriek',
      title: '固态模里 $\\prod$ 与局部化交换 $\\implies$ $j_!$ 存在',
      proof: [
        '$j_!$ 存在 $\\iff$ $j^*$ 保极限。$j$ 是开浸入，$j^*$ 就是「把 $A$-模换成 $A[1/f]$-模」；要它保积就等价于',
        '',
        '$$\\prod_I A \\otimes_{A_\\blacksquare} A[1/f]_\\blacksquare \\;\\cong\\; \\prod_I A[1/f].$$',
        '',
        '在抽象 $A$-模里，左边是 $\\prod_I A[1/f]$ 的**子集**（$\\prod$ 与局部化不交换），一般不相等；在固态 $A$-模里，$\\prod_I A$ 是紧投射对象（`cor.solid-compact-generators`），$\\otimes_{A_\\blacksquare}$ 保它，且 $A[1/f]_\\blacksquare$ 与 $\\prod$ 相容。\n\n仿射、有限型情形由 `thm.za-analytic` 的 $j_!$ 给出；一般情形取仿射开覆盖逐步粘合。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.f-shriek',
      kind: 'implication',
      sources: ['prop.open-immersion-shriek', 'def.six-functors'],
      target: 'def.f-shriek',
      title: '开浸入的 $j_!$ $\\implies$ 一般 $f_!$',
      proof: [
        '对分离有限型 $f : X \\to Y$，有交换图 $X_{\\mathrm{ad}} \\xrightarrow{j} X_{\\mathrm{ad}/Y} \\to Y_{\\mathrm{ad}}$，$j$ 是开浸入（`prop.scheme-embeds-adic` 的类似论证）。定义',
        '',
        '$$f_! := (f_{\\mathrm{ad}/Y})_* \\circ j_!.$$',
        '',
        '$j_!$ 存在由 `prop.open-immersion-shriek`；$(f_{\\mathrm{ad}/Y})_*$ 是正常推前。$f$ 固有时 $j$ 是同构，$f_! = (f^{\\mathrm{ad}/Y})_*$。\n\n**保直和。** $j_!$ 作为左伴随保余极限；$(f^{\\mathrm{ad}/Y})_*$ 在仿射局部上是有限个遗忘函子的极限，保直和。故 $f_!$ 保直和，右伴随 $f^!$ 存在。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.f-shriek-base-change',
      kind: 'implication',
      sources: ['prop.f-shriek-base-change', 'thm.za-analytic'],
      target: 'prop.f-shriek-base-change',
      title: '仿射情形 + 基变换',
      proof: [
        '一切局部化良好，归约到 $f : R \\to A$ 是 $A = R[T]$ 或 $f$ 满射两种情形。',
        '',
        '**$f$ 满射。** $f_! = f_*$ 是遗忘函子，$f^! = \\operatorname{RHom}_R(A,-)$；有限 Tor 维数使 $A$ 是 $R$ 上的 perfect 复形，于是',
        '',
        '$$f^! = \\operatorname{RHom}_R(A, R) \\otimes^{L}_{R_\\blacksquare} f^*,$$',
        '',
        '而 $\\operatorname{RHom}_R(A,R)$ 与平坦基变换交换。',
        '',
        '**$A = R[T]$。** $f_!M = M \\otimes_{(A,R)_\\blacksquare} R((T^{-1}))/R[T][-1]$，$f^!R = R[T][1]$；基变换就是 $R((T^{-1}))/R[T]$ 的基变换。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.regular-immersion-dualizing',
      kind: 'implication',
      sources: ['prop.f-shriek-base-change', 'def.f-shriek'],
      target: 'prop.regular-immersion-dualizing',
      title: 'Koszul 复形 $\\implies$ 正则闭浸入的对偶复形',
      proof: [
        '局部 $A = R/(f_1, \\ldots, f_c)$，$f_1, \\ldots, f_c$ 是正则序列。Koszul 复形 $K(f_\\bullet)$ 是 $A$ 的自由 $R$-消解（长度 $c$），于是',
        '',
        '$$\\operatorname{RHom}_R(A, R) = \\operatorname{Hom}_R(K(f_\\bullet), R) \\cong A[-c].$$',
        '',
        '$\\det(I/I^2)$ 由 $f_1 \\wedge \\cdots \\wedge f_c$ 给出基，故 $\\det(I/I^2) \\cong A$，取对偶不改变（线丛平凡化到 $A$）。整体上验证与生成元选取无关，即得自然同构。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.smooth-duality',
      kind: 'implication',
      sources: ['prop.regular-immersion-dualizing', 'prop.f-shriek-base-change'],
      target: 'thm.smooth-duality',
      title: '对角 + 正则闭浸入 $\\implies$ $f^!R = \\det(\\Omega)[d]$',
      proof: [
        '把 $\\operatorname{Spec} A$ 嵌入仿射空间 $\mathbb{A}^n_R$（正则闭浸入），用 `prop.regular-immersion-dualizing` 算出 $f^!R$ 是次数 $d$ 的线丛。',
        '',
        '再用对角定出是哪条线丛：$g : A \\otimes_R A \\to A$ 是余维 $d$ 的正则闭浸入，$p_1, p_2$ 是两个投影。由基变换与投影公式，',
        '',
        '$$f^!R = g^!p_1^!f^!R = g^!\\bigl(p_1^*f^!R \\otimes p_2^*f^!R\\bigr) = f^!R \\otimes f^!R \\otimes g^!(A \\otimes_R A).$$',
        '',
        '比较次数与行列式（$g^!(A\\otimes_R A) = \\det(I/I^2)^*[-d]$，而对角的 $I/I^2 = \\Omega^1_{A/R}$），得 $f^!R = \\det(\\Omega^1_{A/R})[d]$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.poincare-solid',
      kind: 'implication',
      sources: ['thm.smooth-duality', 'def.six-functors'],
      target: 'thm.poincare-solid',
      title: '6-函子 + $f^!R=\\omega[d]$ $\\implies$ Serre 对偶',
      proof: [
        '由 6-函子形式的 Verdier 对偶',
        '',
        '$$f_*\\operatorname{Hom}_X(C, f^!R) \\cong \\operatorname{Hom}_R(f_!C, R).$$',
        '',
        '光滑时 $f^!R = \\omega_{X/R}[d]$（`thm.smooth-duality`），$f_* = R\\Gamma$，于是',
        '',
        '$$\\operatorname{RHom}_{\\mathcal{O}_X}(C, \\omega_{X/R})[d] \\cong \\operatorname{RHom}_R(f_!C, R).$$',
        '',
        '取 $C = \\mathcal{O}_X$ 得迹映射 $f_!\\omega[d] \\to R$。$f$ 固有时 $f_! = R\\Gamma$，即经典 Serre 对偶。',
        '',
        '**保紧对象。** $f_!$ 保直和，而紧对象 = 与直和交换的对象；由 6-函子的形式性质（$f^!$ 保直和、对偶）即得。$\\blacksquare$'
      ].join('\n')
    },

    /* -------------------------------------------------------- 定义接线 */
    {
      id: 'def-link.adic-dual',
      kind: 'definition',
      definition: 'def.discrete-adic-space',
      usedBy: 'def.f-shriek',
      note: '$f_!$ 的定义用的正是 $X_{\\mathrm{ad}} \\to X_{\\mathrm{ad}/Y}$ 这个 adic 空间的图。'
    },
    {
      id: 'def-link.analyticring-dual',
      kind: 'definition',
      definition: 'def.analytic-ring',
      usedBy: 'def.six-functors',
      note: '6-函子里的 $D(X)$ 就是固态层 $D(\\mathcal{O}_{X,\\blacksquare})$，即解析环上的固态模。'
    },
    {
      id: 'def-link.coherent-affine-global',
      kind: 'definition',
      definition: 'thm.coherent-duality',
      usedBy: 'def.f-shriek',
      note: '仿射版的 $f_!$ 是全局定义的局部模型：在仿射开集上两者一致。'
    }
  ]
});
