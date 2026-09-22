/* ==========================================================================
   内容包 · 乘积测度与 Fubini 定理
   --------------------------------------------------------------------------
   来自手写笔记「总结：积分」第 6 ~ 8 页。

   三步：
     ① 矩形上的预测度 π  ──Carathéodory──▶  乘积测度 μ×ν
     ② 截口 Eₓ、Eʸ     ──▶  乘积测度由截口的积分给出（靠单调类定理）
     ③ Fubini–Tonelli    ──▶  重积分可以交换次序

   ⚠ 全程 σ-有限是硬条件；μ、ν 完备时 μ×ν 反而**常常不完备**（最后一节）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '乘积测度与 Fubini',
  nodes: [

    {
      id: 'def.product-measure',
      cluster: 'analysis.product',
      type: 'definition',
      label: '乘积测度',
      title: '乘积测度（Product Measure μ × ν）',
      regions: ['analysis'],
      tags: ['定义', '乘积测度', '矩形', 'Carathéodory'],
      statement: [
        '设 $(X, \\mathcal{M}, \\mu )$ 与 $(Y, \\mathcal{N}, \\nu )$ 是测度空间。',
        '',
        '**① 矩形**：形如 $$A \\times B$$（$$A \\in \\mathcal{M}$$，$$B \\in \\mathcal{N}$$）的集合叫（可测）矩形。全体矩形**生成** $$\\mathcal{M} \\otimes  \\mathcal{N}$$。',
        '',
        '**② 矩形上的预测度**：令 $\\mathcal{A}$ 为**矩形的有限不交并**全体。对',
        '',
        '$$E = \\bigsqcup_{j=1}^{n} (A_j \\times B_j)$$',
        '',
        '定义',
        '',
        '$$\\pi (E) := \\sum_{j=1}^{n} \\mu(A_j) \\nu(B_j)$$',
        '',
        '则 $\\pi$ 是代数 $\\mathcal{A}$ 上的**预测度**。',
        '',
        '**③ 扩张**：$\\pi$ 诱导 $X \\times Y$ 上的外测度，限制在 $$\\mathcal{M} \\otimes  \\mathcal{N}$$ 上得到一个测度，记作',
        '',
        '$$\\mu \\times \\nu$$',
        '',
        '即**乘积测度**。'
      ].join('\n'),
      notes: [
        '$\\pi $ 的良定义要检查（同一个 $E$ 可以拆成不同的矩形不交并）—— 这正是要把「矩形」换成「矩形的**不交**并」的原因：不交并之下加法好验。',
        '**$\\sigma$有限的时候一切顺利**：若 $\\mu$、$\\nu$ 都 $\\sigma$有限，则 $\\mu \\times \\nu$ 也 $\\sigma$有限，而且由 Carathéodory 唯一性，这样造出来的测度是唯一的。',
        '⚠ 这一步的整个机器（预测度 $\\to$ 外测度 $\\to$ Carathéodory 扩张 $\\to$ 唯一性）就是「测度的构造」那个星团里现成的四件套。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.5', 'Halmos, Measure Theory, §35']
    },

    {
      id: 'def.section',
      cluster: 'analysis.product',
      type: 'definition',
      label: '截口',
      title: '截口（Section）Eₓ 与 Eʸ',
      regions: ['analysis'],
      tags: ['定义', '截口'],
      statement: [
        '设 $$E \\subseteq X \\times Y$$。对 $$x \\in X$$、$$y \\in Y$$ 定义',
        '',
        '$$E_x := \\{y \\in Y : (x, y) \\in E\\}$$',
        '$$E^y := \\{x \\in X : (x, y) \\in E\\}$$',
        '',
        '分别叫 $E$ 在 $x$ 处的**纵截口**与在 $y$ 处的**横截口**。',
        '',
        '类似地，对函数 $$f : X \\times Y \\to \\mathbb{C}$$ 定义',
        '',
        '$$f_x(y) := f^y(x) := f(x, y)$$'
      ].join('\n'),
      notes: [
        '直观：把平面图形用一根竖线（或横线）切一刀，切出来的那条线段就是截口。',
        '截口是 Fubini 定理的语言：重积分 $$\\iint f d(\\mu \\times \\nu)$$ 就是「先沿截口积一次，再把各条截口的积分对另一变量积一次」。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.5']
    },

    {
      id: 'prop.section-measurable',
      cluster: 'analysis.product',
      type: 'proposition',
      label: '截口可测',
      title: '命题：可测集的截口可测，可测函数的截口可测',
      regions: ['analysis'],
      tags: ['命题', '截口', '可测'],
      statement: [
        '**(a)** 若 $$E \\in \\mathcal{M} \\otimes  \\mathcal{N}$$，则对一切 $$x \\in X$$ 有 $$E_x \\in \\mathcal{N}$$，对一切 $$y \\in Y$$ 有 $$E^y \\in \\mathcal{M}$$。',
        '',
        '**(b)** 若 $$f$$ 是 $$\\mathcal{M} \\otimes  \\mathcal{N}$$-可测的，则对一切 $$x$$ 有 $$f_x$$ 是 $$\\mathcal{N}$$-可测的，对一切 $$y$$ 有 $$f^y$$ 是 $$\\mathcal{M}$$-可测的。'
      ].join('\n'),
      notes: [
        '证明是一个「先看矩形、再看 $\\sigma$代数」的标准套路：令',
        '',
        '$$\\mathcal{R} = \\{E \\subseteq X \\times Y : E_x \\in \\mathcal{N}\\text{ 且} E^y \\in \\mathcal{M}\\quad  \\forall(x, y)\\}$$',
        '',
        '则 $\\mathcal{R}$ 包含所有矩形，而且**$\\mathcal{R}$ 是一个 $\\sigma$代数**（截口运算保持并、交、补）。于是 $\\mathcal{R} \\supseteq \\mathcal{M} ⊗ \\mathcal{N}$。',
        '(b) 由 (a) 与两条恒等式得到：',
        '',
        '$$f_x^{-1}(B) = (f^{-1}(B))_x, \\quad  f^{y-1}(B) = (f^{-1}(B))^y$$',
        '',
        '⚠ 注意 (b) 说的是「**每一个** $x$ 都行」，而 Fubini 定理里只能保证「几乎每一个」—— 那是因为 Fubini 还要它可积。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.34']
    },


    {
      id: 'thm.product-measure-sections',
      cluster: 'analysis.product',
      type: 'theorem',
      label: '乘积测度由截口给出',
      title: '定理：μ × ν(E) = ∫ ν(Eₓ) dμ(x) = ∫ μ(Eʸ) dν(y)',
      regions: ['analysis'],
      tags: ['定理', '乘积测度', '截口'],
      statement: [
        '设 $(X, \\mathcal{M}, \\mu )$、$(Y, \\mathcal{N}, \\nu )$ 都是 **$\\sigma$有限**的，$$E \\in \\mathcal{M} \\otimes  \\mathcal{N}$$。则',
        '',
        '- $$x \\mapsto \\nu(E_x)$$ 在 $X$ 上可测；',
        '- $$y \\mapsto \\mu(E^y)$$ 在 $Y$ 上可测；',
        '',
        '并且',
        '',
        '$$\\mu \\times \\nu(E) = \\int_X \\nu(E_x) d\\mu(x) = \\int_Y \\mu(E^y) d\\nu(y)$$'
      ].join('\n'),
      notes: [
        '这是 Fubini 定理的「集合版本」—— 把函数换成指示函数就是 Fubini。',
        '证明的结构：先设 $\\mu$、$\\nu$ **有限**，令',
        '',
        '$$\\mathcal{C} = \\{E \\in \\mathcal{M} \\otimes  \\mathcal{N} :\\text{ 上面两条都成立}\\}$$',
        '',
        '- 矩形 $$E = A \\times B$$：$$\\nu(E_x) = \\chi_A(x) \\nu(B)$$，立刻成立；',
        '$\\mathcal{C}$ 对**递增并**封闭（用 MCT）；对**递减交**也封闭（用 DCT）；',
        '',
        '于是 $\\mathcal{C}$ 是一个**单调类**，含所有矩形。矩形族生成的代数由矩形构成，再由单调类定理升级到整个 $$\\mathcal{M} \\otimes  \\mathcal{N}$$。',
        '最后把「有限」推广到「$\\sigma$有限」：取 $$X \\times Y = \\bigcup (X_i \\times Y_i)$$，对每个 $$E \\cap (X_i \\times Y_i)$$ 用已经证好的有限情形，再用 MCT 求和。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.36']
    },

    {
      id: 'thm.fubini-tonelli',
      cluster: 'analysis.product',
      type: 'theorem',
      label: 'Fubini–Tonelli',
      title: 'Fubini–Tonelli 定理（重积分可交换次序）',
      regions: ['analysis'],
      tags: ['定理', 'Fubini', 'Tonelli', '重积分'],
      statement: [
        '设 $(X, \\mathcal{M}, \\mu )$、$(Y, \\mathcal{N}, \\nu )$ 是 **$\\sigma$有限**的测度空间。',
        '',
        '**(a) Tonelli（非负情形，无附加条件）**：若 $$f \\in L^+(X \\times Y)$$，则',
        '',
        '$$\\int f_x d\\nu \\in L^+(X), \\quad  \\int f^y d\\mu \\in L^+(Y)$$',
        '',
        '且',
        '',
        '$$\\int f d(\\mu \\times \\nu) = \\int_X ( \\int_Y f(x, y) d\\nu(y) ) d\\mu(x) = \\int_Y ( \\int_X f(x, y) d\\mu(x) ) d\\nu(y)$$',
        '',
        '**(b) Fubini（可积情形）**：若 $$f \\in L^1(\\mu \\times \\nu)$$，则',
        '',
        '- $$f_x \\in L^1(\\nu)$$ 对 a.e. x 成立，$$f^y \\in L^1(\\mu)$$ 对 a.e. y 成立；',
        '- $$\\int f_x d\\nu \\in L^1(\\mu)$$、$$\\int f^y d\\mu \\in L^1(\\nu)$$（都在 a.e. 意义下有定义）；',
        '- 上面那两个三重等式同样成立。'
      ].join('\n'),
      notes: [
        '⭐ **Tonelli 不需要任何附加条件**（非负就够了），所以实际使用时通常先拿它「试算」：如果两个累次积分里有一个算出来是有限数，那就说明 $f$ 可积，于是可以放心换序。',
        '**Fubini 则必须假定可积** —— 否则一边是 $\\infty$、一边是 $-\\infty$，换序会出事。',
        '⚠ 反例（不是可积但累次积分不等）：在 $[0,1]^{2}$ 上取 $$f(x, y) = (x^2 - y^2) / (x^2 + y^2)^3$$ 之类，两个累次积分会互为相反数。',
        '⚠ $\\sigma$有限不能省：在「$\\mathbb{R}$ 上的计数测度 $\\times Lebesgue$ 测度」这种情形下，单调类定理的论证会崩，Fubini 会得出荒谬的结论（对角线上的经典反例）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.37']
    },

    {
      id: 'thm.fubini-complete',
      cluster: 'analysis.product',
      type: 'theorem',
      label: '完备情形的 F–T',
      title: '定理：完备化的乘积测度上，Fubini–Tonelli 仍然成立',
      regions: ['analysis'],
      tags: ['定理', 'Fubini', '完备化'],
      statement: [
        '设 $(X, \\mathcal{M}, \\mu )$、$(Y, \\mathcal{N}, \\nu )$ 都是**完备**的 $\\sigma$有限测度空间，$$(X \\times Y, \\mathcal{L}, \\lambda)$$ 是',
        '',
        '$$(X \\times Y, \\mathcal{M} \\otimes  \\mathcal{N}, \\mu \\times \\nu)$$',
        '',
        '的**完备化**。设 $f$ 是 $\\mathcal{L}$可测的。',
        '',
        '- 若 $$f \\ge 0$$ 或 $$f \\in L^1(\\lambda)$$：$$f_x$$ 对 a.e. x 是 $\\mathcal{N}$可测的，$$f^y$$ 对 a.e. y 是 $\\mathcal{M}$可测的；',
        '- 若 $$f \\in L^1(\\lambda)$$：$$f_x$$、$$f^y$$ 对 a.e. 的 $x$、$y$ 可积；并且 $$x \\mapsto \\int f_x d\\nu$$、$$y \\mapsto \\int f^y d\\mu$$ 可测；',
        '- 此时',
        '',
        '$$\\int f d\\lambda = \\int_X ( \\int_Y f d\\nu ) d\\mu = \\int_Y ( \\int_X f d\\mu ) d\\nu$$'
      ].join('\n'),
      notes: [
        '为什么需要这一条：**$\\mu \\times \\nu$ 通常不完备**（见下一条），所以 Riesz 意义上的「可积函数」往往落在完备化 $\\lambda$ 里，而不是 $\\mathcal{M}⊗\\mathcal{N}$ 里。',
        '代价是所有的断言都退化成「**对几乎处处的 x / y**」—— 因为 $\\mathcal{L}$ 里多出来的那些集合只在零集上有区别。',
        '证明的核心：先证 $f \\ge 0$。若 $f = \\chi _E$，$E = F \\cup G$ 其中 $F \\in \\mathcal{M}⊗\\mathcal{N}$、$G \\subseteq H$ 且 $\\mu \\times \\nu (H) = 0$，设不交并，则 $f = \\chi _F + \\chi _G$。$\\chi _F$ ✓（归 Fubini–Tonelli），$\\chi _G$ ✓（因为每条截口的测度都是 0）。**应该是核心思想，其余都类似**。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.39']
    },

    {
      id: 'prop.product-incomplete',
      cluster: 'analysis.product',
      type: 'proposition',
      label: '乘积测度通常不完备',
      title: '注记：μ、ν 完备时，μ × ν 常常不完备',
      regions: ['analysis'],
      tags: ['注记', '完备', '乘积测度'],
      statement: [
        '即使 $\\mu$ 与 $\\nu$ 都**完备**，$$\\mu \\times \\nu$$ 也**经常是不完备的**：存在 $$E \\in \\mathcal{M} \\otimes  \\mathcal{N}$$ 使 $$\\mu \\times \\nu(E) = 0$$，但 $E$ 有子集不属于 $$\\mathcal{M} \\otimes  \\mathcal{N}$$。'
      ].join('\n'),
      notes: [
        '这就是为什么必须单独有「完备情形的 $F$–$T$」：实际用的时候（比如 $\\mathbb{R}^{2}$ 上的 Lebesgue 测度）我们手里的往往是**完备化之后**的测度，而不是原始的 $\\mu \\times \\nu$。',
        '⚠ 容易踩的坑：$\\mu$、$\\nu$ 都完备时 $\\mu \\times \\nu$ 仍然可能**不完备**。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.5']
    }
  ],

  edges: [

    {
      id: 'imp.product-measure',
      kind: 'implication',
      sources: ['def.premeasure', 'thm.caratheodory'],
      target: 'def.product-measure',
      title: '矩形上的预测度 ⟹ Carathéodory 扩张得到乘积测度',
      proof: [
        '**① $\\pi$ 是良定义的。** 设 $E$ 有两种矩形不交并的写法。把两边的矩形再交叉细分成最小的那些块（$$A_j \\cap A_k\'$$ $\\times$ $$B_j \\cap B_k\'$$），$\\pi$ 的值不变 —— 因为 $\\mu$、$\\nu$ 在各自那一侧都是有限可加的。',
        '',
        '**② $\\pi$ 是 $\\mathcal{A}$ 上的预测度。** $\\mathcal{A} =$ 矩形的有限不交并，是代数（矩形的不交并再取差仍是有限个矩形块）。可数可加性由 $\\mu$、$\\nu$ 各自的可数可加性得到：把可数个不交的矩形块按两个方向分别整理成不交并。',
        '',
        '**③ 用 Carathéodory 扩张。** 由「预测度 $\\to$ 外测度 $\\to$ 可测集 $\\to$ 扩张测度」那一整套：$\\pi$ 诱导出 $X \\times Y$ 上的外测度 $\\mu^{*}$，全体 $\\mu^{*}$-可测集构成 $\\sigma$代数，$\\mu^{*}$ 在其上成为测度；而代数 $\\mathcal{A}$ 中每个集合都是 $\\mu^{*}$-可测的，且 $\\mu^{*}|_\\mathcal{A} = \\pi$。',
        '',
        '**④ 落到 $\\mathcal{M} ⊗ \\mathcal{N}$ 上。** $\\mathcal{A}$ 含所有矩形，故 $\\mathcal{A}$ 生成 $\\mathcal{M} ⊗ \\mathcal{N} \\subseteq (\\mu^{*}$-可测集)；把 $\\mu^{*}$ 限制在 $\\mathcal{M} ⊗ \\mathcal{N}$ 上，就是所要的测度 $\\mu \\times \\nu$，它在矩形上取值 $$\\mu \\times \\nu(A \\times B) = \\mu(A) \\nu(B)$$。∎',
        '',
        '$>$ ⭐ 这一段没有任何新东西 —— 全是把「测度的构造」那个星团的机器搬过来用一次。这也正是那个星团存在的理由：**它是所有具体测度的生产线**。'
      ].join('\n')
    },

    {
      id: 'imp.section-measurable',
      kind: 'implication',
      sources: ['def.section'],
      target: 'prop.section-measurable',
      title: '截口的定义 ⟹ 截口保持可测性',
      proof: [
        '**(a)** 令 $$\\mathcal{R} = \\{E \\subseteq X \\times Y : E_x \\in \\mathcal{N}\\text{ 且} E^y \\in \\mathcal{M}\\quad  \\forall(x, y) \\in X \\times Y\\}$$。',
        '',
        '- **$\\mathcal{R}$ 含所有矩形**：若 $$E = A \\times B$$，则',
        '',
        '$$E_x = B\\quad  (x \\in A), \\quad  E_x = \\emptyset\\quad  (x \\notin A)$$',
        '',
        '两边都在 $\\mathcal{N}$ 里（$\\mathcal{N}$ 含 $\\emptyset$）；横截口同理。',
        '',
        '- **$\\mathcal{R}$ 是 $\\sigma$代数**：截口运算保持并、交、补 —— 例如 $$(\\bigcup_n E^{(n)})_x = \\bigcup_n E^{(n)}_x$$、$$(E^c)_x = (E_x)^c$$（这里用的是 $Y$ 在 $X \\times Y$ 中的「竖条」补集）。故 $\\mathcal{R}$ 对可数并与补封闭。',
        '',
        '于是 $\\mathcal{R} \\supseteq \\mathcal{M}($矩形族$) = \\mathcal{M} ⊗ \\mathcal{N}$，(a) 得证。',
        '',
        '**(b)** 设 $f$ 是 $\\mathcal{M}⊗\\mathcal{N}$可测，$B \\subseteq \\mathbb{C}$ 可测。则',
        '',
        '$$f_x^{-1}(B) = \\{y : f(x, y) \\in B\\} = (f^{-1}(B))_x$$',
        '',
        '而 $$f^{-1}(B) \\in \\mathcal{M} \\otimes  \\mathcal{N}$$，由 (a) 它的纵截口属于 $\\mathcal{N}$，即 $$f_x^{-1}(B) \\in \\mathcal{N}$$。所以 $$f_x$$ 可测。横截口同理。∎'
      ].join('\n')
    },

    {
      id: 'imp.product-sections',
      kind: 'implication',
      sources: ['thm.monotone-class', 'prop.section-measurable'],
      target: 'thm.product-measure-sections',
      title: '单调类定理 ⟹ 乘积测度由截口积分给出',
      proof: [
        '**① 先设 $\\mu$、$\\nu$ 有限。** 令 $$\\mathcal{C} = \\{E \\in \\mathcal{M} \\otimes  \\mathcal{N} : x \\mapsto \\nu(E_x)\\text{ 可测}, y \\mapsto \\mu(E^y)\\text{ 可测},\\text{ 且} \\mu\\times\\nu(E) = \\int\\nu(E_x)d\\mu = \\int\\mu(E^y)d\\nu\\}$$。',
        '',
        '**② 矩形在 $\\mathcal{C}$ 里。** 若 $$E = A \\times B$$，则 $$\\nu(E_x) = \\chi_A(x)\\cdot\\nu(B)$$，它是可测的（指示函数 $\\times$ 常数），且',
        '',
        '$$\\int \\nu(E_x) d\\mu(x) = \\nu(B)\\cdot\\mu(A) = \\mu \\times \\nu(A \\times B)$$',
        '',
        '**③ $\\mathcal{C}$ 对递增并封闭。** 若 $$E_1 \\subseteq E_2 \\subseteq \\cdots$$ 都在 $\\mathcal{C}$ 中、$$E = \\bigcup E_n$$：则 $$\\nu((E_n)_x) \\nearrow  \\nu(E_x)$$（测度的下连续性），由 MCT 得 $$x \\mapsto \\nu(E_x)$$ 可测且 $$\\int\\nu(E_x)d\\mu = \\lim \\int\\nu((E_n)_x)d\\mu = \\lim \\mu\\times\\nu(E_n) = \\mu\\times\\nu(E)$$。',
        '',
        '**④ $\\mathcal{C}$ 对递减交封闭。** 若 $$E_1 \\supseteq E_2 \\supseteq \\cdots$$、$$E = \\bigcap E_n$$：因为测度有限，可以用 DCT（控制函数是常数 $$\\nu(Y) < \\infty$$）得到同样的等式。',
        '',
        '**⑤ 用单调类定理。** 由 ①②③④，$\\mathcal{C}$ 是含所有矩形的一个**单调类**。矩形族生成的**代数**再由矩形构成，所以 $\\mathcal{C}$ 含这个代数；由单调类定理，$$\\mathfrak{m}(\\text{代数}) = \\mathcal{M}(\\text{代数}) = \\mathcal{M} \\otimes  \\mathcal{N}$$，于是 $\\mathcal{C} = \\mathcal{M} ⊗ \\mathcal{N}$。',
        '',
        '**⑥ 推广到 $\\sigma$有限。** 取 $$X = \\bigcup_i X_i$$、$$Y = \\bigcup_i Y_i$$（各自测度有限），则 $$X \\times Y = \\bigcup_i (X_i \\times Y_i)$$。对每个 $i$，把 ⑤ 用在 $$E \\cap (X_i \\times Y_i)$$ 上（这一步只用到**有限**测度）；再把 $i$ 加起来，用 MCT 对 $i$ 求极限即可。∎',
        '',
        '$>$ ⚠ $\\sigma$有限正是在 ⑥ 用掉的：没有它，就没法把无穷测度的空间切成可数块有限块。'
      ].join('\n')
    },

    {
      id: 'imp.tonelli',
      kind: 'implication',
      sources: ['thm.product-measure-sections', 'thm.mct'],
      target: 'thm.fubini-tonelli',
      title: '集合版（截口公式）+ MCT ⟹ Tonelli',
      proof: [
        '**① 指示函数。** 取 $$f = \\chi_E$$（$$E \\in \\mathcal{M} \\otimes  \\mathcal{N}$$）。此时',
        '',
        '$$\\int_Y f(x, y) d\\nu(y) = \\nu(E_x), \\quad  \\int_X f(x, y) d\\mu(x) = \\mu(E^y)$$',
        '',
        '于是三重等式正是上一条定理的内容。',
        '',
        '**② 简单函数。** 由线性推广到 $$f = \\sum_j a_j \\chi_{E_j}$$（$$a_j \\ge 0$$，$E_{j}$ 不交）。',
        '',
        '**③ 非负可测函数。** 取简单函数列 $$\\{f_n\\} \\nearrow  f$$（简单函数逼近定理）。令',
        '',
        '$$g_n(x) = \\int f_n(x, y) d\\nu(y), \\quad  g(x) = \\int f(x, y) d\\nu(y)$$',
        '',
        '由 $$f_n \\uparrow  f$$ 与积分的单调性，$$\\{g_n\\}$$ 递增；由 **MCT**，$$g = \\lim_n g_n$$ 且',
        '',
        '$$\\int g d\\mu = \\lim_n \\int g_n d\\mu$$',
        '',
        '再由 ② 对每个 $n$ 的三重等式，',
        '',
        '$$\\int g_n d\\mu = \\int f_n d(\\mu \\times \\nu)$$',
        '',
        '于是',
        '',
        '$$\\int_X ( \\int_Y f d\\nu ) d\\mu = \\lim_n \\int f_n d(\\mu \\times \\nu) = \\int f d(\\mu \\times \\nu)$$',
        '',
        '（最后一步又用一次 MCT。）另一边对称。**这就是 Tonelli，全程不需要可积性。**',
        '',
        '**④ Fubini。** 设 $$f \\in L^1(\\mu \\times \\nu)$$。把 $f$ 拆成 $$\\operatorname{Re} f^+, \\operatorname{Re} f^-, \\operatorname{Im} f^+, \\operatorname{Im} f^-$$ 四个非负部分，对每一部分用 ③。由',
        '',
        '$$\\int |f| d(\\mu \\times \\nu) < \\infty$$',
        '',
        '和 ③ 的三重等式，得到 $$\\int_X (\\int_Y |f| d\\nu) d\\mu < \\infty$$，故 $$\\int_Y |f(x, \\cdot)| d\\nu < \\infty$$ 对 **a.e.** $x$ 成立 —— 即 $$f_x \\in L^1(\\nu)$$ a.e.；同理 $$f^y \\in L^1(\\mu)$$ a.e.。既然两个累次积分都已经是有限数，就可以直接相减、不再有 $\\infty - \\infty$ 的危险，三重等式对 $f$ 成立。∎',
        '',
        '$>$ ⭐ 分工很干净：**Tonelli 负责非负（无条件），Fubini 用「可积」把四个非负部分的结论拼起来**。'
      ].join('\n')
    },

    {
      id: 'imp.fubini-complete',
      kind: 'implication',
      sources: ['thm.fubini-tonelli', 'thm.completion', 'prop.product-incomplete'],
      target: 'thm.fubini-complete',
      title: '乘积测度通常不完备 ⟹ 必须补一条完备情形的 F–T',
      proof: [
        '**① 先证 $f \\ge 0$ 的情形。** 由于 $\\lambda$ 是 $\\mu \\times \\nu$ 的完备化，$$\\mathcal{L}$$ 中的集合可以写成',
        '',
        '$$E = F \\cup G, \\quad  F \\in \\mathcal{M} \\otimes  \\mathcal{N}, \\quad  G \\subseteq H, \\quad  \\mu \\times \\nu(H) = 0$$',
        '',
        '（取不交化后即 $$E = F \\sqcup  G$$，于是 $$\\chi_E = \\chi_F + \\chi_G$$。）',
        '',
        '**② $$\\chi_F$$ 那一半没问题** —— 直接归 Fubini–Tonelli（$F \\in \\mathcal{M}⊗\\mathcal{N}$）。',
        '',
        '**③ $$\\chi_G$$ 那一半也没问题** —— 因为 $$G \\subseteq H$$ 而 $\\mu \\times \\nu (H) = 0$，所以对**每一个** $x$ 都有 $$\\nu(G_x) \\le \\nu(H_x) = 0$$（$H$ 的截口是 $\\nu$零集，这一步用截口公式对 $H$ 本身成立），于是',
        '',
        '$$\\int \\chi_G d\\lambda = 0 = \\int ( \\int \\chi_G d\\nu ) d\\mu$$',
        '',
        '两边都是 0。（对 a.e. 的 $x$，$$G_x$$ 是 $\\nu$零集。）',
        '',
        '**④ 由线性推广到非负简单函数，再用 MCT 推广到一切 $$f \\ge 0$$。** 关键点：完备化只多出「含在零集里的部分」，而这部分对积分的贡献恒为 0，所以整段论证不会被破坏。',
        '',
        '**⑤ 一般情形**：把 $f$ 拆成 $$\\operatorname{Re} f^\\pm , \\operatorname{Im} f^\\pm $$ 四个非负部分，逐块用 ④ —— 但此时所有断言都退化成「对 a.e. 的 x / y」，因为零集上的截口行为不再逐一可控。∎',
        '',
        '$>$ 要点：**核心就是把 $E$ 拆成 $F \\sqcup G$** —— $F$ 归老定理、$G$ 归「截口都是零集」。'
      ].join('\n')
    },

    {
      id: 'imp.product-incomplete',
      kind: 'implication',
      sources: ['def.product-measure'],
      target: 'prop.product-incomplete',
      title: '乘积测度通常不完备',
      proof: [
        '取 $$X = Y = [0, 1]$$，$\\mu = \\nu = Lebesgue$ 测度（都是完备的）。令',
        '',
        '$$D = \\{(x, x) : x \\in [0, 1]\\}$$',
        '',
        '则 $D$ 是闭集，故属于 $$\\mathfrak{B}_{[0,1]} \\otimes  \\mathfrak{B}_{[0,1]}$$；且 $$\\mu \\times \\nu(D)$$ 可以用截口公式算：对每个 $x$，$$\\nu(D_x) = \\nu(\\{x\\}) = 0$$，故',
        '',
        '$$\\mu \\times \\nu(D) = \\int \\nu(D_x) d\\mu(x) = 0$$',
        '',
        '**关键**：取一个 Lebesgue 测度为 0 但**不可测**（不属 $\\mathfrak{B}_\\{[0,1]\\}$）的子集 $$N \\subseteq [0,1]$$，令',
        '',
        '$$G = \\{(x, x) : x \\in N\\} \\subseteq D$$',
        '',
        '则 $G \\subseteq D$ 而 $\\mu \\times \\nu (D) = 0$，但 $G$ **不属于** $$\\mathfrak{B} \\otimes  \\mathfrak{B}$$（它的截口给出的正是 $N$ —— 若 $$G \\in \\mathfrak{B} \\otimes  \\mathfrak{B}$$，由截口可测性，对每个 $x$ 都有 $$G_x \\in \\mathfrak{B}$$，而 $$G_x$$ 是 {x} 或 $\\emptyset$ …… 需要用「$G$ 的截面沿对角线还原出 $N$」这一论证）。故 $\\mu \\times \\nu$ 不完备。∎',
        '',
        '$>$ ⭐ 一句话总结：**完备性可以被「零集的子集」打破，而乘积里零集特别多**。所以实用时必须先完备化 —— 这就是上一条定理存在的理由。'
      ].join('\n'),
      note: '⚠ 「$G \\notin \\mathfrak{B} ⊗ \\mathfrak{B}$」那一步的细节（如何从截面还原出 $N$）这里只给了骨架；要写严格版，建议改用「对角线论证 + Fubini 定理给矛盾」的路线。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.productmeasure-premeasure',
      kind: 'definition',
      definition: 'def.premeasure',
      usedBy: 'def.product-measure',
      note: '矩形上的 $\\pi$ 就是一个预测度。'
    },
    {
      id: 'def-link.productmeasure-sigma',
      kind: 'definition',
      definition: 'def.product-sigma',
      usedBy: 'def.product-measure',
      note: '乘积测度定义在积 $\\sigma$代数 $\\mathcal{M} ⊗ \\mathcal{N}$ 上。'
    },
    {
      id: 'def-link.section-props',
      kind: 'definition',
      definition: 'def.section',
      usedBy: 'prop.section-measurable',
      note: '直接验证截口的运算性质。'
    },
    {
      id: 'def-link.monotoneclass-lemma',
      kind: 'definition',
      definition: 'def.monotone-class',
      usedBy: 'thm.product-measure-sections',
      note: '截口公式的证明走的正是单调类定理：先验证矩形成立，再说明「满足它的集合」构成一个单调类。'
    },
    {
      id: 'def-link.generated-monotone-lemma',
      kind: 'definition',
      definition: 'def.generated-sigma',
      usedBy: 'thm.monotone-class',
      note: '定理的陈述里用到 $\\mathfrak{m}(\\mathcal{E})$ 与 $\\mathcal{M}(\\mathcal{E})$ 两个生成记号。'
    },
    {
      id: 'def-link.productmeasure-sections-thm',
      kind: 'definition',
      definition: 'def.product-measure',
      usedBy: 'thm.product-measure-sections',
      note: '定理算的就是乘积测度。'
    },
    {
      id: 'def-link.section-fubini',
      kind: 'definition',
      definition: 'def.section',
      usedBy: 'thm.fubini-tonelli',
      note: 'Fubini 的整个陈述都是用截口写的。'
    },
    {
      id: 'def-link.productmeasure-fubini',
      kind: 'definition',
      definition: 'def.product-measure',
      usedBy: 'thm.fubini-tonelli',
      note: '重积分就是对 $\\mu \\times \\nu$ 积分。'
    },
    {
      id: 'def-link.integrable-fubini',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'thm.fubini-tonelli',
      note: 'Fubini 的 (b) 用的是 $L^{1}(\\mu \\times \\nu )$。'
    },
    {
      id: 'def-link.productmeasure-complete',
      kind: 'definition',
      definition: 'def.product-measure',
      usedBy: 'thm.fubini-complete',
      note: '完备情形下先要把 $\\mu \\times \\nu$ 完备化。'
    },
    {
      id: 'def-link.completion-fubini',
      kind: 'definition',
      definition: 'def.null-set',
      usedBy: 'thm.fubini-complete',
      note: '证明的核心是把集合拆成「属于 $\\mathcal{M}⊗\\mathcal{N}$ 的部分」+「含在零集里的部分」。'
    }
  ]
});
