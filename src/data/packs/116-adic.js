/* ==========================================================================
   内容包 · 解析几何 ①：adic 空间（Clausen–Scholze, Lectures on Condensed
   Mathematics, Bonn 2019, Lectures IX–X）
   --------------------------------------------------------------------------
   为什么单开星系 `analytic`：这一层已经不是在「凝聚态集上做代数」了，
   而是**解析几何** —— 它同时引用
     · 代数（Huber pair、赋值环、整闭、局部化）
     · 拓扑（spectral space、紧 Hausdorff）
     · 范畴/同调（$\\infty$-范畴、导出范畴、层化）
     · 分析（后面复解析几何要用 Banach / 幂级数）
   只和凝聚态交互的只有 `cond.solid` 那一层，所以那个留在凝聚态，这一层单开。

   这一包造的是「adic 空间」这套装置：
     离散 Huber pair → Spa(A,A+) → 有理开集上的局部化 → 结构层是层
       → 离散 adic 空间 → 概形的全忠实嵌入 → 导出范畴按 $\\infty$-范畴粘起来
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '解析几何：adic 空间',
  nodes: [

    {
      id: 'def.discrete-huber-pair',
      cluster: 'analytic.adic',
      type: 'definition',
      label: '离散 Huber pair',
      title: '离散 Huber pair',
      regions: ['analytic'],
      tags: ['定义', '解析几何', 'adic'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Definition 9.1'],
      statement: [
        '白话：**Huber pair = 一个环 $A$，加上「哪些元素算有界」这个额外指定 $A^+$**。经典理论里 $A$ 带拓扑、$A^+$ 是它的「单位球」；本图只做**离散**版本 —— $A$ 不带拓扑，「有界」完全由 $A^+$ 这个子环说了算。它要造的对象是「$A$ 的 adic 谱」，即下一节点那个 $\\operatorname{Spa}$。',
        '',
        '一个**离散 Huber pair** 是一对 $(A, A^+)$：',
        '',
        '- $A$ 是离散环（不带拓扑，见 `def.ring`）；',
        '- $A^+ \\subseteq A$ 是**整闭**子环（$A$ 中在 $A^+$ 上整的元素仍属于 $A^+$；「整」= 满足一个首一多项式方程，像 $\\sqrt{2}$ 在 $\\mathbb{Z}$ 上整）。',
        '',
        '它给出一个解析环（解析环是 `def.analytic-ring` 里的东西；这里只需知道它是「$A$ 的完备模版本」）：',
        '',
        '$$(A, A^+)_\\blacksquare := \\varinjlim_{(B,B^+) \\to (A,A^+)} (B, B^+)_\\blacksquare,$$',
        '',
        '余极限跑遍所有「$B$ 与 $B^+$ 都有限生成 $\\mathbb{Z}$-代数」的子对 $(B,B^+) \\subseteq (A,A^+)$。'
      ].join('\n'),
      notes: '⭐ 为什么需要 $A^+$：解析几何里「有界」不是 $A$ 自带的，要**额外指定**哪些元素算「$\\le 1$」。$A^+$ 就是「单位球的整数模型」。\n\n⭐ 两个极端：$(A, A)$（「一切都有界」）与 $(A, \\widetilde{\\mathbb{Z}})$（「代数整数才有界」，$\\widetilde{\\mathbb{Z}}$ 是 $\\mathbb{Z}$ 在 $A$ 中的整闭包）。前者给出概形 $\\operatorname{Spec} A$ 的 adic 化，后者给出「去掉阿基米德部分」的版本。\n\n⚠ 定义里 $A$ 不要求拓扑 —— 这是「离散」二字的含义。经典 Huber 对允许一般拓扑环，本图只做离散情形（足够覆盖 $\\mathbb{Z}$ 上有限型的算术场景）。'
    },
    {
      id: 'def.adic-spectrum',
      cluster: 'analytic.adic',
      type: 'definition',
      label: 'adic 谱 Spa',
      title: 'adic 谱 $\\operatorname{Spa}(A,A^+)$',
      regions: ['analytic'],
      tags: ['定义', '解析几何', 'adic', '谱'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Definition 9.1'],
      statement: [
        '白话：**把环 $A$ 的元素「量大小」的所有方式收集起来，就得到 adic 谱**。每个点是一个「绝对值」（valuation，赋值），$A^+$ 的作用是筛掉「把某个有界元量成 $>1$」的那些点。这是 $\\operatorname{Spec}$ 的「带大小」版本 —— $\\operatorname{Spec}$ 只记「哪些理想的元素为零」，$\\operatorname{Spa}$ 还记「多小」。',
        '',
        '先约定术语。**赋值**是「量大小」的函数 $|\\cdot| : A \\to \\Gamma \\cup \\{0\\}$（$\\Gamma$ 是乘法写法的全序阿贝尔群，想成 $\\mathbb{R}_{>0}$ 即可），满足',
        '',
        '$$|0| = 0, \\quad |1| = 1, \\quad |xy| = |x|\\,|y|, \\quad |x + y| \\le \\max(|x|, |y|).$$',
        '',
        '两个赋值 $|\\cdot|, |\\cdot|_1$ **等价**，如果存在保序的群同构使 $|x|_1 = \\sigma(|x|)$ 对一切 $x$ —— 也就是「它们给 $A$ 排出的大小顺序完全一样」，只是「标尺」换了。$\\operatorname{Spa}$ 取的是赋值的**等价类**（所以同一个点不会因为标尺不同重复计数）。直觉：$|x|$ 是「$x$ 到 $0$ 的距离」，$|x| \\le 1$ 是「$x$ 有界」；$p$-进绝对值 $|p^{n}u| = p^{-n}$（$u$ 与 $p$ 互素）就是标准例子。',
        '',
        '设 $(A, A^+)$ 是离散 Huber pair。**adic 谱**',
        '',
        '$$\\operatorname{Spa}(A, A^+) := \\bigl\\{\\, |\\cdot| : A \\to \\Gamma \\cup \\{0\\} \\ \\big|\\ |A^+| \\le 1 \\,\\bigr\\} \\big/ \\sim$$',
        '',
        '是 $A$ 上「在 $A^+$ 上 $\\le 1$」的那些赋值（即 $A^+$ 里每个元素都算有界）的等价类全体。拓扑由**有理开集**给出：对 $f, g_1, \\ldots, g_n \\in A$，',
        '',
        '$$U\\!\\left(\\tfrac{g_1, \\ldots, g_n}{f}\\right) := \\bigl\\{\\, x : |g_i(x)| \\le |f(x)| \\ne 0 \\ \\text{对一切 } i \\,\\bigr\\}.$$',
        '',
        '这些有理开集构成一组基，$\\operatorname{Spa}(A,A^+)$ 是 **spectral space**（谱空间：同胚于某个环的素谱的拓扑空间；等价刻画是「紧、$T_0$、有紧开集作基」）。'
      ].join('\n'),
      notes: '⭐ 赋值满足**强三角不等式** $|x+y| \\le \\max(|x|,|y|)$，这是非阿基米德的标志；换成 $\\le |x| + |y|$ 就是阿基米德的（复几何那一边），那是另一套理论。\n\n⭐ 有理开集是「$|g_i| \\le |f|$」定义的区域 —— 直觉上就是「$g_i/f$ 有界」的 locus。它们既开又紧（quasicompact），这正是 adic 空间比概形好用的地方：仿射开集自带紧性。\n\n⚠ $\\operatorname{Spa}(A,A^+)$ 一般**不是** Hausdorff 的，它是 spectral（紧、$T_0$、有开集基）。所以不能拿度量空间的直觉套它。'
    },
    {
      id: 'prop.huber-subring-recovery',
      cluster: 'analytic.adic',
      type: 'proposition',
      label: 'A⁺ 由谱决定',
      title: '命题：整闭子环与谱的开闭子集一一对应（Prop 9.2）',
      regions: ['analytic'],
      tags: ['命题', '解析几何', 'adic'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Proposition 9.2'],
      statement: [
        '白话：**$A^+$ 看着像「额外数据」，其实由谱自己决定** —— 「整闭子环 $A^+$」与「谱里形如 $\\bigcap U_{1,f}$ 的那块子集 $U$」一一对应。所以 $(A,A^+)$ 与「环 $A$ 加上谱里的一块区域」是同一件事，这就是把环论翻译成几何的那一步。',
        '',
        '记 $\\operatorname{Spv}(A) := \\operatorname{Spa}(A, \\widetilde{\\mathbb{Z}})$ 为 $A$ 上全部赋值等价类（取「最大的」$A^+$，即 $\\mathbb{Z}$ 在 $A$ 中的整闭包，所以什么赋值都不被筛掉）。则',
        '',
        '$$A^+ \\longmapsto U = \\operatorname{Spa}(A, A^+) = \\bigcap_{f \\in A^+} U_{1,f} \\subseteq \\operatorname{Spv}(A),$$',
        '',
        '给出了「整闭子环 $A^+ \\subseteq A$」与「形如 $\\bigcap_{f \\in I} U_{1,f}$ 的子集 $U$」之间的**双射**，逆映射是',
        '',
        '$$U \\longmapsto A^+ = \\{\\, f \\in A : \\forall x \\in U,\\ |f(x)| \\le 1 \\,\\}.$$',
        '',
        '特别地 $A^+ = \\{f \\in A : \\forall x \\in \\operatorname{Spa}(A,A^+),\\ |f(x)| \\le 1\\}$。'
      ].join('\n'),
      notes: '⭐ 这条说明：**$A^+$ 不是额外数据，而是谱上的「单位球截面」**。换句话说，$(A,A^+)$ 与「$A$ 加上一个谱的开闭子集」是同一件事 —— 这正是把环论翻译成几何的地方。\n\n⚠ 一般 $A^+$ 不可能是任意子环：必须整闭。反例：$A = \\mathbb{Z}[T]$、$A^+ = \\mathbb{Z}[T^2]$ 不整闭（$T$ 在 $\\mathbb{Z}[T^2]$ 上整），对应的子集并不是某个 $\\operatorname{Spa}$。\n\n📌 证明用赋值环的存在性（扎里斯基引理）：若 $f \\notin A^+$，在 $A^+[1/f]$ 里取素理想，再取支配它的赋值环，得到 $|f| > 1$ 的点。'
    },
    {
      id: 'prop.rational-localization',
      cluster: 'analytic.adic',
      type: 'proposition',
      label: '有理开集上的局部化',
      title: '命题：有理开集对应局部化（Prop 9.3）',
      regions: ['analytic'],
      tags: ['命题', '解析几何', 'adic', '局部化'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Proposition 9.3'],
      statement: [
        '设 $(A,A^+) \\to (B,B^+)$ 是离散 Huber pair 的映射，且 $\\operatorname{Spa}(B,B^+) \\to \\operatorname{Spa}(A,A^+)$ 穿过有理开集 $U = U\\!\\left(\\frac{g_1,\\ldots,g_n}{f}\\right)$。则映射唯一地穿过',
        '',
        '$$\\Bigl(A\\bigl[\\tfrac{1}{f}\\bigr],\\ \\widetilde{A^+\\bigl[\\tfrac{g_1}{f}, \\ldots, \\tfrac{g_n}{f}\\bigr]}\\Bigr),$$',
        '',
        '其中波浪号表示在 $A[1/f]$ 中的整闭包。并且',
        '',
        '$$\\operatorname{Spa}\\Bigl(A\\bigl[\\tfrac{1}{f}\\bigr],\\ \\widetilde{A^+\\bigl[\\tfrac{g_i}{f}\\bigr]}\\Bigr) \\longrightarrow \\operatorname{Spa}(A,A^+)$$',
        '',
        '是到 $U$ 上的同胚。'
      ].join('\n'),
      notes: '⭐ 这是「有理开集 = 仿射开集」的精确含义：每个有理开集本身又是一个 $\\operatorname{Spa}$，只是把 $f$ 取逆、把 $g_i/f$ 加进 $A^+$。于是 adic 空间有一套**仿射开集基**，可以像概形一样做层论。\n\n⚠ 唯一性来自「$f$ 在 $\\operatorname{Spa}(B,B^+)$ 上处处非零 $\\implies$ $f$ 在 $B$ 中可逆」（否则 $\\operatorname{Spec}(B/fB)$ 会给一个 $|f| = 0$ 的点）。'
    },
    {
      id: 'thm.adic-structure-sheaf',
      cluster: 'analytic.adic',
      type: 'theorem',
      label: 'adic 结构层是层',
      title: '定理：$\\mathcal{O}_X$ 与 $\\mathcal{O}_X^+$ 是层（Prop 9.4）',
      regions: ['analytic'],
      tags: ['定理', '解析几何', 'adic', '层'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Proposition 9.4'],
      statement: [
        '设 $X = \\operatorname{Spa}(A,A^+)$。在有理开集上定义',
        '',
        '$$\\mathcal{O}_X(U) := A\\bigl[\\tfrac{1}{f}\\bigr], \\qquad \\mathcal{O}_X^+(U) := \\widetilde{A^+\\bigl[\\tfrac{g_1}{f}, \\ldots, \\tfrac{g_n}{f}\\bigr]}$$',
        '',
        '（$U = U\\!\\left(\\frac{g_1,\\ldots,g_n}{f}\\right)$）。则：',
        '',
        '**(i)** $\\mathcal{O}_X$ 与 $\\mathcal{O}_X^+$ 都是**层**；',
        '',
        '**(ii)** 每个点 $x \\in X$ 的赋值 $f \\mapsto |f(x)|$ 唯一地延拓到茎 $\\mathcal{O}_{X,x}$；',
        '',
        '**(iii)** $\\mathcal{O}_X^+(U) = \\{f \\in \\mathcal{O}_X(U) : \\forall x \\in U,\\ |f(x)| \\le 1\\}$。'
      ].join('\n'),
      notes: '⭐ 证明的关键是一个「借道概形」的技巧：有映射 $\\psi : \\operatorname{Spec} A \\to \\operatorname{Spa}(A,A^+)$，把素理想 $\\mathfrak{p}$ 送到 $A \\to \\operatorname{Frac}(A/\\mathfrak{p}) \\to \\{0,1\\}$。有理开集在 $\\psi$ 下的原像正是 $D(f)$，于是 $\\mathcal{O}_{\\operatorname{Spa}(A,A^+)}$ 是 $\\mathcal{O}_{\\operatorname{Spec} A}$ 在 $\\psi$ 下的**推前**；推前保层。\n\n⭐ (iii) 说明 $\\mathcal{O}^+$ 不是额外结构，而是 $\\mathcal{O}$ 里「逐点 $\\le 1$」的那部分 —— 与 `prop.huber-subring-recovery` 是同一句话的局部版本。'
    },
    {
      id: 'def.discrete-adic-space',
      cluster: 'analytic.adic',
      type: 'definition',
      label: '离散 adic 空间',
      title: '离散 adic 空间',
      regions: ['analytic'],
      tags: ['定义', '解析几何', 'adic'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Definition 9.5'],
      statement: [
        '白话：**把仿射的 $\\operatorname{Spa}(A,A^+)$ 像橡皮泥一样一块块粘起来，就得到 adic 空间** —— 它是「环层 + 每点一个赋值」的三元组，局部看起来就是上面的仿射谱。它扮演的是概形里 $\\operatorname{Spec}$ 的角色，只是多了「每点能量大小」。',
        '',
        '一个**离散 adic 空间**是一个三元组 $(X, \\mathcal{O}_X, (|\\cdot(x)|)_{x \\in X})$：',
        '',
        '- 拓扑空间 $X$；',
        '- 环层 $\\mathcal{O}_X$；',
        '- 每个点 $x$ 处 $\\mathcal{O}_{X,x}$ 上一个赋值等价类 $|\\cdot(x)|$，',
        '',
        '使得 $(X, \\mathcal{O}_X, (|\\cdot(x)|))$ **局部**同构于',
        '',
        '$$\\bigl(\\operatorname{Spa}(A,A^+),\\ \\mathcal{O}_{\\operatorname{Spa}(A,A^+)},\\ (|\\cdot(x)|)_{x}\\bigr),$$',
        '',
        '其中 $(A,A^+)$ 是离散 Huber pair。'
      ].join('\n'),
      notes: [
        '⭐ 概形的两个全忠实嵌入：$X = \\operatorname{Spec} A \\mapsto X_{\\mathrm{ad}} = \\operatorname{Spa}(A,A)$（「一切有界」），以及 $X \\mapsto X_{\\mathrm{ad}/R} = \\operatorname{Spa}(A, \\widetilde{R})$（相对 $\\operatorname{Spec} R$）。两者都保粘合，且有比较映射 $X_{\\mathrm{ad}} \\to X_{\\mathrm{ad}/R}$。\n\n⭐ 点的另一种描述（后面证固有性要用）：$X_{\\mathrm{ad}}$ 的点 = 映射 $\\operatorname{Spec} V \\to X$（$V$ 是赋值环），模掉「忠实平坦的赋值环扩张」；$X_{\\mathrm{ad}/R}$ 的点 = 带交换图的',
        '',
        '$$\\begin{array}{ccc} \\operatorname{Spec} K & \\to & X \\\\ \\downarrow & & \\downarrow \\\\ \\operatorname{Spec} V & \\to & \\operatorname{Spec} R \\end{array}$$',
        '',
        '⚠ 这不是「拓扑空间加环层」那么简单：赋值是**逐点**的额外数据，它决定了「哪些函数有界」。'
      ].join('\n'),
    },
    {
      id: 'prop.scheme-embeds-adic',
      cluster: 'analytic.adic',
      type: 'proposition',
      label: '概形嵌入 adic 空间',
      title: '命题：分离/固有性对应开浸入/同构（Prop 9.6）',
      regions: ['analytic'],
      tags: ['命题', '解析几何', 'adic', '概形'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Proposition 9.6'],
      statement: [
        '白话：**概形塞进 adic 空间这一步是忠实的** —— 概形 $X$ 有两个 adic 化版本（「一切有界」的 $X_{\\mathrm{ad}}$ 与「相对 $R$」的 $X_{\\mathrm{ad}/R}$），两者之间的比较映射在 $X$ 分离（separation：点能被开集分开）时是开浸入、在 $X$ 固有（proper：紧致性的相对版本）时是同构。于是概形的几何完全落在 adic 几何里。',
        '',
        '设 $X$ 是 $\\operatorname{Spec} R$ 上有限型的概形。则比较映射',
        '',
        '$$X_{\\mathrm{ad}} \\longrightarrow X_{\\mathrm{ad}/R}$$',
        '',
        '在 $X$ 分离时是**开浸入**；在 $X$ **固有**时是同构。'
      ].join('\n'),
      notes: '⭐ 这条把「分离 / 固有」翻译成 adic 语言：固有概形的 adic 化与「相对 $R$ 的 adic 化」完全一致，于是后面可以用 $X_{\\mathrm{ad}/R}$ 上的层来计算 $X$ 上的东西。\n\n⭐ 证明就是赋值判据：有限型时局部是开浸入；点集上的单射 / 双射正是分离 / 固有的赋值判据。\n\n⚠ 反过来不成立：adic 空间比概形多得多（$\\operatorname{Spa}(\\mathbb{Z}_p, \\mathbb{Z}_p)$ 就不是某个概形的 adic 化）。'
    },
    {
      id: 'thm.adic-gluing',
      cluster: 'analytic.adic',
      type: 'theorem',
      label: '导出范畴按无穷范畴粘合',
      title: '定理：$U \\mapsto D((\\mathcal{O}_X(U),\\mathcal{O}_X^+(U))_\\blacksquare)$ 是 $\\infty$-范畴层（Thm 9.8）',
      regions: ['analytic'],
      tags: ['定理', '解析几何', 'adic', '导出范畴'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture IX, Theorem 9.8'],
      statement: [
        '白话：**在 adic 空间上，「层」这件事要按无穷范畴来做，不能按普通层（阿贝尔范畴）做**。原因很具体：把「在每个仿射开集上给出的导出范畴」沿开集粘起来时，阿贝尔层面的基变换不保持正合，粘不上；只有把同伦也留住（$\\infty$-范畴层）才能粘。',
        '',
        '设 $X$ 是离散 adic 空间。把仿射开集 $U = \\operatorname{Spa}(A,A^+) \\subseteq X$ 送到',
        '',
        '$$D\\bigl((A,A^+)_\\blacksquare\\bigr) \\subset D(\\operatorname{Cond}(A)),$$',
        '',
        '这个对应定义了一个 $X$ 上的 **$\\infty$-范畴层**（严格说：从仿射开集范畴到 $\\infty$-范畴的函子，所有函子有左伴随）。取整体截面得',
        '',
        '$$D\\bigl((\\mathcal{O}_X, \\mathcal{O}_X^+)_\\blacksquare\\bigr),$$',
        '',
        '取同伦范畴得到三角范畴，记作 $D(\\mathcal{O}_{X,\\blacksquare})$。'
      ].join('\n'),
      notes: '⚠ **为什么必须上 $\\infty$-范畴**：在阿贝尔层面粘不起来 —— 有理开集上的基变换 $-\\otimes_{(A,A^+)_\\blacksquare} (\\mathcal{O}_X(U),\\mathcal{O}_X^+(U))_\\blacksquare$ 不正合。具体例子：$(A,A^+) = (\\mathbb{F}_p[T], \\mathbb{F}_p)$，取有理开集「$|T| \\le 1$」，此时 $(\\mathcal{O}_X(U),\\mathcal{O}_X^+(U)) = (\\mathbb{F}_p[T], \\mathbb{F}_p[T])$，而单射 $\\mathbb{F}_p[T] \\hookrightarrow \\mathbb{F}_p((T^{-1}))$ 在基变换后变成 $\\mathbb{F}_p[T] \\to 0$。\\n\\n⭐ 证明思路与概形的 Zariski 下降平行：局部化可交换、局部为零则整体为零；在导出范畴上把这两条做成粘合数据，再升到 $\\infty$-范畴（同伦之间的同伦要留住）。\\n\\n📌 原文 Lectures IX–X（pp. 62–70）。'
    }
  ],

  edges: [
    {
      id: 'imp.huber-subring-recovery',
      kind: 'implication',
      sources: ['def.adic-spectrum', 'def.discrete-huber-pair'],
      target: 'prop.huber-subring-recovery',
      title: '赋值的定义 $\\implies$ $A^+$ 由谱决定',
      proof: [
        '**$A^+$ 整闭。** 若 $f \\in A$ 在 $A^+$ 上整，则 $f$ 满足 $f^n + a_{n-1}f^{n-1} + \\cdots + a_0 = 0$（$a_i \\in A^+$）。对任意 $x \\in \\operatorname{Spa}(A,A^+)$，$|a_i(x)| \\le 1$，于是',
        '',
        '$$|f(x)|^n = |a_{n-1}f^{n-1} + \\cdots + a_0| \\le \\max_{i} |a_i(x)|\\,|f(x)|^{i} \\le \\max(1, |f(x)|^{n-1}),$$',
        '',
        '这迫使 $|f(x)| \\le 1$。\n\n**反向。** 设 $f \\notin A^+$。在 $A^+[1/f]$ 中取素理想 $\\mathfrak{p}$ 含 $1/f$，取 $\\mathfrak{p}$ 下的极小素理想 $\\mathfrak{q}$，再取赋值环 $V$ 支配 $A^+[1/f]$ 在 $\\mathfrak{p}$ 处的局部化。由于 $\\operatorname{Spec} A[1/f] \\to \\operatorname{Spec} A^+[1/f]$ 的像含 $\\mathfrak{q}$，可把赋值提升到 $A[1/f]$。得到的赋值在 $A^+$ 上 $\\le 1$、在 $f$ 上 $> 1$，故 $f$ 不在右边。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.rational-localization',
      kind: 'implication',
      sources: ['def.adic-spectrum', 'prop.huber-subring-recovery'],
      target: 'prop.rational-localization',
      title: '有理开集 $\\implies$ 局部化',
      proof: [
        '设 $(A,A^+) \\to (B,B^+)$ 的谱映射落在 $U = \\{|g_i| \\le |f| \\ne 0\\}$ 内。\n\n**$f$ 在 $B$ 中可逆。** 否则 $B/fB \\ne 0$，取素理想 $\\mathfrak{p} \\supset fB$，它给出 $y \\in \\operatorname{Spa}(B,B^+)$ 且 $|f(y)| = 0$，与落在 $U$ 内矛盾。于是得到 $A[1/f] \\to B$。\n\n**$g_i/f \\in B^+$。** 对一切 $y$，$|g_i(y)| \\le |f(y)|$ 且 $|f(y)| \\ne 0$，故 $|g_i/f(y)| \\le 1$；由 `prop.huber-subring-recovery` 得 $g_i/f \\in B^+$。于是有 $A^+[g_i/f] \\to B^+$，再延拓到整闭包。\n\n**同胚。** 两条映射互逆，展开定义即得。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.adic-structure-sheaf',
      kind: 'implication',
      sources: ['prop.rational-localization', 'prop.huber-subring-recovery'],
      target: 'thm.adic-structure-sheaf',
      title: '有理开集上的局部化 $\\implies$ 结构层是层',
      proof: [
        '由 `prop.rational-localization`，$\\mathcal{O}_X(U) = A[1/f]$ 只依赖 $U$，且粘合映射唯一，所以它预层化。\n\n**$\\mathcal{O}_X$ 是层。** 考虑 $\\psi : \\operatorname{Spec} A \\to \\operatorname{Spa}(A,A^+)$，$\\mathfrak{p} \\mapsto (A \\to \\operatorname{Frac}(A/\\mathfrak{p}) \\to \\{0,1\\})$。有理开集的原像是 $D(f)$，故 $\\mathcal{O}_{\\operatorname{Spa}}$ 是 $\\mathcal{O}_{\\operatorname{Spec} A}$ 沿 $\\psi$ 的推前；推前保层。\n\n**赋值延拓到茎。** 每个 $x$ 在包含它的有理开集上都有定义，且与局部化相容；取余极限得 $\\mathcal{O}_{X,x}$ 上的赋值。\n\n**(iii)** 在每个仿射开集上就是 `prop.huber-subring-recovery`。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.scheme-embeds-adic',
      kind: 'implication',
      sources: ['def.discrete-adic-space', 'prop.rational-localization'],
      target: 'prop.scheme-embeds-adic',
      title: '赋值判据 $\\implies$ 分离/固有',
      proof: [
        '有限型时，仿射局部上 $X_{\\mathrm{ad}} \\to X_{\\mathrm{ad}/R}$ 就是 $\\operatorname{Spa}(A,A) \\to \\operatorname{Spa}(A,\\widetilde{R})$，由 `prop.rational-localization` 知是开浸入。\n\n整体上，开浸入 $\\iff$ 点集上单射（局部已是开浸入）；而点集上的单射 / 双射正是分离 / 固有的**赋值判据**（用 `def.discrete-adic-space` 里「点 = 赋值环映射」的描述）。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.adic-gluing',
      kind: 'implication',
      sources: ['thm.adic-structure-sheaf', 'prop.analytic-base-change'],
      target: 'thm.adic-gluing',
      title: '结构层 + 局部化的全忠实 $\\implies$ $\\infty$-范畴粘合',
      proof: [
        '**记号。** $\\mathcal{C}$ = 离散 Huber 对构成的景，覆盖取「标准覆盖」；$\\operatorname{Spec}(A,A^+)$ 表示对应的 adic 谱。函子 $\\Phi : X \\mapsto (|X|, \\mathcal{O}_X)$ 从离散 adic 空间到 $\\mathcal{C}$ 上的「空间」（局部模型层 + 环层）之范畴。',
        '',
        '**第一步：$\\operatorname{Spec}$ 是层。** 对标准覆盖 $\\{(A,A^+) \\to (A_i,A_i^+)\\}$，$\\operatorname{Spec}$ 的粘合条件逐点验证：覆盖在拓扑空间层面是开覆盖，结构层由 $A \\to \\varprojlim A_i$ 的完全性给出（Prop 10.1(a)）。',
        '',
        '**第二步：全忠实。** 对 adic 空间 $X, Y$，',
        '$$\\operatorname{Hom}(X,Y) \\longrightarrow \\operatorname{Hom}\\big((|X|,\\mathcal{O}_X), (|Y|,\\mathcal{O}_Y)\\big)$$',
        '是双射（Prop 10.1(b)）。化到 $Y = \\operatorname{Spec}(A,A^+)$ 仿射：一个「空间」映射 $X \\to \\operatorname{Spec}(A,A^+)$ 等价于 Huber 对映射 $(A,A^+) \\to (\\mathcal{O}_X(X), \\mathcal{O}_X(X)^\\circ)$ —— 由第一步的层性，$\\mathcal{O}_X(X)$ 上带自然的拓扑与整环，逐点取局部化即得 adic 空间映射。反方向显然。于是 $\\Phi$ 全忠实。',
        '',
        '**第三步：仿射的纤维积。** 对 Huber 对映射 $A \\to B$、$A \\to C$（$A^+$ 的情形同），',
        '$$\\begin{aligned}',
        '&\\operatorname{Spec}(B,B^+) \\times_{\\operatorname{Spec}(A,A^+)} \\operatorname{Spec}(C,C^+) \\\\',
        '&\\qquad \\cong \\operatorname{Spec}\\big((B,B^+) \\hat\\otimes_{(A,A^+)} (C,C^+)\\big),',
        '\\end{aligned}$$',
        '即基变换方块是笛卡尔方块（Prop 10.2）；其中 $\\hat\\otimes$ 是 Huber 对的完备张量积。',
        '',
        '**第四步：覆盖可细化。** 任一 $\\mathcal{C}$ 的覆盖都能被标准覆盖细化（Lemma 10.4，Huber 的逼近论证）：把每个 $A \\to A_i$ 换成有理局部化 $A \\to A\\langle T_1,\\ldots,T_n\\rangle/(\\ldots)$ 的复合，用强 Noether 性与「开浸入的复合仍是开浸入」逐项对齐。',
        '',
        '**第五步：范畴判据。** 设 $F$ 是 $\\mathcal{C}$ 上的层。$F$ 落在 $\\Phi$ 的本质像中，当且仅当',
        '1. $F$ 有覆盖 $\\{F_i \\to F\\}$，每个 $F_i \\cong \\operatorname{Spec}(A_i,A_i^+)$；',
        '2. 对每个 $i$，$F_i \\times_F F_i$ 也是仿射的（$\\cong \\operatorname{Spec}$ 的某个有理局部化），且两个投影是开浸入。',
        '',
        '（Prop 10.5 的一般判据；这里用在 $\\mathcal{C}$ 上。）条件 1 给出一族仿射；条件 2 保证胶合数据一致：由第三步，纤维积存在且仍是仿射；由第四步，可用标准覆盖细化；由第一步，胶合出的层与 $\\Phi$ 的像一致。',
        '',
        '**第六步：构造逆函子。** 给定满足 1、2 的 $F$，取所有 $F_i \\to F$，按第四步把覆盖细化为标准覆盖，用第三步的笛卡尔方块作转移映射。第五步的 2 保证 cocycle 条件；第一步的层性保证粘合唯一。所得 adic 空间 $X$ 满足 $\\Phi(X) \\cong F$，且由第二步全忠实，$X$ 在等价意义下唯一。于是 $\\Phi$ 本质满，因而是范畴等价。$\\blacksquare$',
      ].join('\n')
    },

    /* -------------------------------------------------------- 定义接线 */
    {
      id: 'def-link.ring-huber',
      kind: 'definition',
      definition: 'def.ring',
      usedBy: 'def.discrete-huber-pair',
      note: 'Huber pair 的第一步是一个**环** $A$；整闭子环 $A^+$ 是在它里面挑「有界元」。'
    },
    {
      id: 'def-link.huber-spectrum',
      kind: 'definition',
      definition: 'def.discrete-huber-pair',
      usedBy: 'def.adic-spectrum',
      note: '谱 $\\operatorname{Spa}(A,A^+)$ 的输入正是这个 pair —— 没有 $A^+$ 就不知道「在哪些点上取 $\\le 1$」。'
    },
    {
      id: 'def-link.spectrum-space',
      kind: 'definition',
      definition: 'def.adic-spectrum',
      usedBy: 'def.discrete-adic-space',
      note: 'adic 空间是「局部同构于 $\\operatorname{Spa}$」的空间，所以 $\\operatorname{Spa}$ 是它的模型。'
    },
    {
      id: 'def-link.condab-adic',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'thm.adic-gluing',
      note: '每个 $D((A,A^+)_\\blacksquare)$ 都嵌在凝聚态 $A$-模的导出范畴里，粘合是**凝聚态层**意义下的粘合。'
    }
  ]
});
