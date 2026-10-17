/* ==========================================================================
   内容包 · 群论 ①：群作用与置换、合成列与可解群
   --------------------------------------------------------------------------
   两个新星团（抽象代数星系）：

     `algebra.group-action`（9 点，hub = 群作用）
       群作用 → 轨道–稳定子 → 类方程 → Lagrange → 置换群 S_n → 符号与交错群 A_n
         → Cayley → 循环群 → Sylow

     `algebra.solvable`（6 点，hub = Jordan–Hölder）
       单群 → 合成列 → **Jordan–Hölder** → 可解群 → 可解性对子群/商群封闭
         → **S_n 可解 ⟺ n ≤ 4**（Abel–Ruffini 的群论一半）

   ⭐ 这两团是为批 7 的 Galois 理论铺路：Galois 对应要的是**正规子群 ↔ 正规扩张**，
      而「可解」是「方程可用根式解」的那一半。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '群论：群作用与可解群',
  nodes: [

    {
      id: 'def.group-action',
      cluster: 'algebra.group-action',
      type: 'definition',
      label: '群作用',
      title: '群作用、轨道与稳定子（Group Action）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '群作用'],
      statement: [
        '设 $G$ 是群、$X$ 是集合。$G$ 在 $X$ 上的**（左）作用**是一个映射',
        '',
        '$$\\alpha : G \\times X \\to X, \\qquad (g, x) \\mapsto g \\cdot x$$',
        '',
        '满足两条：',
        '',
        '- $e \\cdot x = x$ 对一切 $x \\in X$；',
        '- $(gh) \\cdot x = g \\cdot (h \\cdot x)$ 对一切 $g, h \\in G$、$x \\in X$。',
        '',
        '两个基本对象：',
        '',
        '$$\\operatorname{Orb}(x) := Gx := \\{\\, g \\cdot x : g \\in G \\,\\}, \\qquad \\operatorname{Stab}(x) := G_x := \\{\\, g \\in G : g \\cdot x = x \\,\\}$$',
        '',
        '分别叫 $x$ 的**轨道**与**稳定子**。$G_x \\le G$ 是子群；作用的**核**是 $\\bigcap_{x \\in X} G_x$。'
      ].join('\n'),
      notes: '⭐ **等价说法（全团的技巧都从这里来）**：一个作用等价于一个群同态 $\\rho : G \\to \\operatorname{Sym}(X)$，$\\rho(g)(x) := g \\cdot x$。理由是两条作用公理恰好就是「$\\rho$ 保单位元、保乘法」。于是「群在集合上作用」= 「$G$ 的一个置换表示」，而 `thm.first-iso` 立刻给出 $G/\\ker\\rho \\hookrightarrow \\operatorname{Sym}(X)$。\n\n⭐ 轨道构成 $X$ 的**划分**：$x \\in Gx$（自反）、$y \\in Gx \\implies Gy = Gx$（对称与传递）。所以 $X = \\bigsqcup_{\\text{轨道}} \\text{轨道}$ —— 数轨道的大小就等于数这个划分。\n\n⭐ 三个必会的例子：\n- **自然作用**：$S_n$ 在 $\\{1, \\ldots, n\\}$ 上，轨道只有一个（传递作用）；\n- **左乘（正则）作用**：$G$ 在自身上的 $g \\cdot h := gh$，轨道只有一个，稳定子全平凡（**自由**作用）—— 这是 Cayley 定理的入口；\n- **共轭作用**：$g \\cdot x := gxg^{-1}$，轨道 = 共轭类，稳定子 = 中心化子 —— 这是类方程的入口。\n\n⚠ 左作用与右作用要分清：$(gh)\\cdot x = g\\cdot(h\\cdot x)$ 是左作用；右作用把顺序反过来写成 $x \\cdot (gh) = (x\\cdot g)\\cdot h$。本图一律**左**作用，遇到右作用时先转成左作用（$g \\cdot x := x \\cdot g^{-1}$）再套结论。\n\n⭐ 作用的核 $\\bigcap_x G_x$ 是正规子群（作为 $\\rho$ 的核），它衡量「这个作用丢掉了多少信息」：核平凡 $\\iff$ 作用是**忠实的**（$G$ 真的被看成了一组置换）。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §4.1']
    },
    {
      id: 'thm.orbit-stabilizer',
      cluster: 'algebra.group-action',
      type: 'theorem',
      label: '轨道–稳定子定理',
      title: '定理（轨道–稳定子）：$|\\operatorname{Orb} x| = [G : \\operatorname{Stab} x]$',
      regions: ['algebra'],
      tags: ['定理', '代数', '群', '群作用'],
      statement: [
        '设有限群 $G$ 作用在集合 $X$ 上，$x \\in X$。则 $\\operatorname{Stab}(x) \\le G$ 且',
        '',
        '$$\\bigl| \\operatorname{Orb}(x) \\bigr| = [G : \\operatorname{Stab}(x)] = \\frac{|G|}{|\\operatorname{Stab}(x)|}$$',
        '',
        '特别地 $|\\operatorname{Orb}(x)|$ 整除 $|G|$，且',
        '',
        '$$|G| = \\bigl| \\operatorname{Orb}(x) \\bigr| \\cdot \\bigl| \\operatorname{Stab}(x) \\bigr|$$'
      ].join('\n'),
      notes: '⭐ 这条定理是全团的枢纽：它把「**数轨道的大小**」这件几何/组合的事，换成「**算指数**」这件群论的事。类方程、Sylow、Burnside 引理全都是它的直接推论。\n\n⭐ 一句话记法：**轨道大小 $\\times$ 稳定子大小 = 群大小**。\n\n⚠ 只用 $[G : \\operatorname{Stab}(x)]$ 这个量，所以定理对**无限群**也成立（那时要读成「轨道与陪集集合 $G/G_x$ 等势」）。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §4.1']
    },
    {
      id: 'thm.class-equation',
      cluster: 'algebra.group-action',
      type: 'theorem',
      label: '类方程',
      title: '定理（类方程）：$|G| = |Z(G)| + \\sum [G : C_G(x_i)]$',
      regions: ['algebra'],
      tags: ['定理', '代数', '群', '共轭'],
      statement: [
        '设 $G$ 是有限群，$Z(G)$ 是它的中心，$x_1, \\ldots, x_r$ 是**非中心共轭类**的一组代表元，$C_G(x) := \\{g : gx = xg\\}$ 是中心化子。则',
        '',
        '$$|G| = |Z(G)| + \\sum_{i=1}^{r} \\bigl[ G : C_G(x_i) \\bigr]$$',
        '',
        '其中每一项 $[G : C_G(x_i)]$ 都整除 $|G|$，且 $\\ge 2$。',
        '',
        '**推论**：若 $|G| = p^{n}$（$p$ 素、$n \\ge 1$），则 $p \\mid |Z(G)|$，特别地 $Z(G) \\ne \\{e\\}$。'
      ].join('\n'),
      notes: '⭐ 类方程就是「**共轭作用下的轨道分解 + 轨道–稳定子**」：共轭作用 $g \\cdot x := gxg^{-1}$ 的轨道是共轭类，稳定子是中心化子 $C_G(x)$，而固定的点恰是中心 $Z(G)$。\n\n⭐ 中心那一项可以看成「长度为 $1$ 的轨道之和」，于是整式可以统一写成 $|G| = \\sum_{\\text{轨道}} |\\text{轨道}|$ —— 只是把长度 $1$ 的那些单独拎出来了。\n\n⚠ 推论里 $p \\mid |Z(G)|$ 的证明只用一句：右边除 $|Z(G)|$ 外每一项都被 $p$ 整除（因为 $[G : C_G(x_i)] > 1$ 且整除 $p^{n}$，故是 $p$ 的正幂），而左边也被 $p$ 整除。∎\n\n⭐ 这条推论是 Sylow 定理归纳证明里的关键分叉。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §4.3']
    },
    {
      id: 'def.permutation-group',
      cluster: 'algebra.group-action',
      type: 'definition',
      label: '置换群与对称群',
      title: '对称群 $S_n$、置换与循环分解',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '置换'],
      statement: [
        '$n$ 元集合（不妨取 $\\{1, 2, \\ldots, n\\}$）的全体双射在**复合**下构成群，记 $S_n$，叫 **$n$ 次对称群**；它的元素叫**置换**，$|S_n| = n!$。$S_n$ 的子群统称**置换群**。',
        '',
        '**循环分解**：每个 $\\sigma \\in S_n$ 可以唯一地（在循环的书写顺序与循环之间的次序不计的意义下）写成**互不相交**的循环之积',
        '',
        '$$\\sigma = (a_1\\ a_2\\ \\cdots\\ a_{k_1})(b_1\\ \\cdots\\ b_{k_2}) \\cdots$$',
        '',
        '各循环长度组成的多重集叫 $\\sigma$ 的**循环型**。',
        '',
        '$$\\operatorname{ord}(\\sigma) = \\text{各循环长度的最小公倍数}$$'
      ].join('\n'),
      notes: '⭐ 「不交」是关键词：两个不交的循环**可以交换**，所以循环分解才能看成「把置换拆成互不干扰的零件」。一旦相交就不能随便换序。\n\n⭐ 循环型是 $S_n$ 的**共轭不变量**，而且完全决定共轭类：$\\sigma, \\tau$ 共轭 $\\iff$ 循环型相同。$S_n$ 的共轭类因此与 $n$ 的**分拆**一一对应 —— 这条把组合学的分拆函数拉进了群论。\n\n⭐ 例子：$n = 4$ 的循环型与类大小：$1^{4}$（单位，$1$ 个）、$2\\,1^{2}$（对换，$6$ 个）、$2^{2}$（双对换，$3$ 个）、$3\\,1$（$3$-循环，$8$ 个）、$4$（$4$-循环，$6$ 个），合计 $24 = 4!$ ✓。\n\n⚠ 记号约定：$(a_1\\ a_2\\ \\cdots\\ a_k)$ 表示 $a_1 \\mapsto a_2 \\mapsto \\cdots \\mapsto a_k \\mapsto a_1$，其余点不动。本图一律**右到左**复合（先作用右边的），与 `def.alternating-group` 的符号公式配套。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.1']
    },
    {
      id: 'def.alternating-group',
      cluster: 'algebra.group-action',
      type: 'definition',
      label: '符号与交错群',
      title: '置换的符号与交错群（Sign and Alternating Group）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '置换'],
      statement: [
        '每个 $\\sigma \\in S_n$ 都能写成**对换**（两个点的交换）之积，且所用对换个数的**奇偶性**与分解方式无关。据此定义**符号**',
        '',
        '$$\\operatorname{sgn}(\\sigma) := (-1)^{k} \\quad (\\sigma = \\text{$k$ 个对换之积})$$',
        '',
        '等价公式（不含分解的任意性）',
        '',
        '$$\\operatorname{sgn}(\\sigma) = \\prod_{1 \\le i < j \\le n} \\frac{\\sigma(j) - \\sigma(i)}{j - i} \\in \\{\\pm 1\\}$$',
        '',
        '$\\operatorname{sgn} : S_n \\to \\{\\pm 1\\}$ 是群同态（$n \\ge 2$ 时满）。其核',
        '',
        '$$A_n := \\ker \\operatorname{sgn} = \\{\\, \\sigma \\in S_n : \\operatorname{sgn}(\\sigma) = 1 \\,\\}$$',
        '',
        '叫 **$n$ 次交错群**：$|A_n| = n!/2$，$A_n \\trianglelefteq S_n$，$[S_n : A_n] = 2$。'
      ].join('\n'),
      notes: '⭐ 符号是 $S_n$ 到 $\\{\\pm 1\\}$ 的**唯一**非平凡同态（$n \\ge 3$），所以 $A_n$ 是 $S_n$ 的**唯一**指数 $2$ 子群 —— 这个唯一性是后面「$S_n$ 不单」以及 Galois 理论里「二次子扩张唯一」的来源。\n\n⭐ 乘积公式为什么干净：每一项 $\\frac{\\sigma(j)-\\sigma(i)}{j-i}$ 的分母固定、分子只是把同一批差重新排列，故乘积的符号只取决于 $\\sigma$ 引起的排列的奇偶性。这也顺手证明了「奇偶性与分解无关」。\n\n⚠ 边界：$n = 1$ 时 $A_1 = S_1$ 是平凡群，$|A_n| = n!/2$ 不适用。$n = 2$ 时 $A_2 = \\{e\\}$。\n\n⭐ **单性的跳变**：$A_4$ 不单（有正规子群 $V_4 = \\{e, (12)(34), (13)(24), (14)(23)\\}$），而 $A_5$ **单**且非阿贝尔。这个跳变正是 $S_n$ 可解性的分界线（`prop.sn-solvable`）。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.5']
    },
    {
      id: 'def.cyclic-group',
      cluster: 'algebra.group-action',
      type: 'definition',
      label: '循环群',
      title: '循环群（Cyclic Group）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '循环群'],
      statement: [
        '设 $G$ 是群、$g \\in G$。集合',
        '',
        '$$\\langle g \\rangle := \\{\\, g^{k} : k \\in \\mathbb{Z} \\,\\} \\quad \\subseteq\\; G$$',
        '（约定 $g^{0} = e$、$g^{-k} = (g^{-1})^{k}$）是 $G$ 的最小子群，叫 $g$ **生成**的循环群。若 $G = \\langle g\\rangle$ 对某个 $g$ 成立，称 $G$ 为**循环群**，$g$ 叫**生成元**。',
        '',
        '同构意义下只有两种：',
        '',
        '- 有限循环群 $\\cong \\mathbb{Z}/n\\mathbb{Z}$（加法），阶 $n$；',
        '- 无限循环群 $\\cong \\mathbb{Z}$。'
      ].join('\n'),
      notes: '⭐ 循环群是**同阶唯一**的群（同阶的循环群必同构）—— 这在群论里是罕见的干净情形。\n\n⭐ 子群全循环、且结构完全清楚：$\\mathbb{Z}/n$ 的每个子群都是 $\\langle g^{d}\\rangle$ 的形状，其中 $d \\mid n$；对应地 $\\mathbb{Z}/n$ 的子群与 $n$ 的正因子一一对应（$d \\leftrightarrow$ 由 $n/d$ 生成的子群）。\n\n⭐ $\\mathbb{Z}/n$ 的生成元个数是 Euler 函数 $\\varphi(n)$（与 $n$ 互素的那些 $k$ 对应的 $g^{k}$）。\n\n⭐ $\\mathbb{Z}/p$（$p$ 素）是**素域** $\\mathbb{F}_p$ 的加法群，也是它唯一的真子群来源 —— 这是 `def.characteristic` 与有限域那条线的起点。\n\n⚠ 「循环」不是「$g$ 的幂总是循环排列」这种字面意思；它的意思是「**一个元素就能生成整个群**」（cyclic = 由单个生成元生成的）。',
      refs: ['Lang, Algebra, Ch. I §4', 'Dummit–Foote, Abstract Algebra, §2.3']
    },

    {
      id: 'thm.lagrange',
      cluster: 'algebra.group-action',
      type: 'theorem',
      label: 'Lagrange 定理',
      title: '定理（Lagrange）：$|H|$ 整除 $|G|$',
      regions: ['algebra'],
      tags: ['定理', '代数', '群', '子群'],
      statement: [
        '设 $G$ 是有限群、$H \\le G$。对 $g \\in G$ 记**左陪集** $gH := \\{\\, gh : h \\in H \\,\\}$。则左陪集构成 $G$ 的一个划分，每个左陪集与 $H$ 等势，于是',
        '',
        '$$|G| = [G : H] \\cdot |H|, \\qquad \\text{即} \\qquad |H| \\mid |G|$$',
        '',
        '其中 $[G : H] := |G|/|H|$ 叫 $H$ 在 $G$ 中的**指数**。'
      ].join('\n'),
      notes: '⭐ 证明只有两句：**陪集构成划分**（$g_1 H \\cap g_2 H \\ne \\emptyset \\implies g_1 H = g_2 H$，靠 $H$ 对乘法的封闭）+ **平移是双射**（$h \\mapsto gh$ 是 $H \\to gH$ 的双射）。证明全文在边上。\n\n⭐ 三个立刻能用的推论：\n- 每个元素 $g$ 的阶整除 $|G|$（把 $\\langle g\\rangle$ 当 $H$）；\n- 素数阶群必循环（任取非单位元，阶只能是 $1$ 或 $p$）；\n- $g^{|G|} = e$ 对一切 $g$ 成立 —— 于是 Euler 定理 $a^{\\varphi(n)} \\equiv 1 \\pmod n$ 是它的特例（取 $G = (\\mathbb{Z}/n)^{\\times}$）。\n\n⚠ **逆命题不成立**：「$d \\mid |G|$ $\\implies$ 有 $d$ 阶子群」是**假**的。最小反例：$|A_4| = 12$，$6 \\mid 12$，但 $A_4$ 没有 $6$ 阶子群（$6$ 阶子群必指数 $2$ 因而正规，而 $A_4$ 的唯一正规子群是 $V_4$ 与 $A_4$）。所以「整除」只是必要条件 —— 要部分逆命题就得请出 Sylow 定理。',
      refs: ['Lang, Algebra, Ch. I §4', 'Dummit–Foote, Abstract Algebra, §3.2']
    },
    {
      id: 'thm.cayley',
      cluster: 'algebra.group-action',
      type: 'theorem',
      label: 'Cayley 定理',
      title: '定理（Cayley）：每个群都是置换群',
      regions: ['algebra'],
      tags: ['定理', '代数', '群', '置换'],
      statement: [
        '设 $G$ 是群。**左乘作用**给出单同态',
        '',
        '$$\\rho : G \\hookrightarrow \\operatorname{Sym}(G), \\qquad \\rho(g)(h) := gh$$',
        '',
        '特别地，$|G| = n$ 时 $G$ 同构于 $S_n$ 的一个子群。'
      ].join('\n'),
      notes: '⭐ 定理的哲学含量大于计算含量：**抽象群总能具体地实现为一组置换**。也就是说「群论」与「置换群论」是同一门学问 —— 抽象并没有真的产生新对象，只是换了个看法。\n\n⚠ 代价很大：$|G| = n$ 时嵌进 $S_n$（阶 $n!$），所以 Cayley 定理几乎从不用于计算。它真正的用处是与「表示论」对照：把「作用在集合上」换成「作用在向量空间上」，就是那条线的开端。\n\n⭐ 左乘作用还是**自由**的（每个稳定子都平凡：$gh = h \\implies g = e$），所以它自动是单射 —— 这是证明的核心一句。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §4.1']
    },
    {
      id: 'thm.sylow',
      cluster: 'algebra.group-action',
      type: 'theorem',
      label: 'Sylow 定理',
      title: '定理（Sylow）：存在性、共轭性、计数',
      regions: ['algebra'],
      tags: ['定理', '代数', '群', 'Sylow'],
      statement: [
        '设 $G$ 是有限群，$|G| = p^{a} m$，其中 $p$ 是素数、$p \\nmid m$。则',
        '',
        '**（1）存在性**：对每个 $0 \\le i \\le a$，$G$ 有 $p^{i}$ 阶子群；特别地有 $p^{a}$ 阶子群，叫 **Sylow $p$-子群**。',
        '',
        '**（2）共轭性**：$G$ 的任两个 Sylow $p$-子群共轭；更一般地，任何 $p$-子群都含在某个 Sylow $p$-子群之中。',
        '',
        '**（3）计数**：Sylow $p$-子群的个数 $n_p$ 满足',
        '',
        '$$n_p \\equiv 1 \\pmod{p}, \\qquad n_p \\mid m, \\qquad n_p = [G : N_G(P)]$$',
        '',
        '（$P$ 是任一 Sylow $p$-子群，$N_G(P)$ 是它的正规化子。）特别地 $n_p = 1 \\iff P \\trianglelefteq G$。'
      ].join('\n'),
      notes: '⭐ Sylow 是 **Lagrange 的部分逆命题**：Lagrange 说「$|H|$ 必整除 $|G|$」，「$d \\mid |G|$ $\\implies$ 有 $d$ 阶子群」是假的；Sylow 说「**$p$-部分的最大那一档一定能取到，而且只差一个共轭**」。\n\n⚠ Galois 理论**不需要** Sylow（Galois 对应只用到正规性，不用计数）。它在计划里标的是「可选」；收进来的理由是：它是群作用这套工具最干净的一个出口，也是「有限群分类」这门学问的第一块砖。\n\n⭐ 标准用法（判断群不同构/不单）：$|G| = 15$。$n_3 \\mid 5$ 且 $n_3 \\equiv 1 \\pmod 3$ $\\implies$ $n_3 = 1$；$n_5 \\mid 3$ 且 $n_5 \\equiv 1 \\pmod 5$ $\\implies$ $n_5 = 1$。于是 $P_3 \\trianglelefteq G$、$P_5 \\trianglelefteq G$，且 $P_3 \\cap P_5 = \\{e\\}$（阶互素），故 $G \\cong P_3 \\times P_5 \\cong \\mathbb{Z}/15$ —— **15 阶群必循环**。\n\n⚠ 计数条件只是必要条件：$n_p \\equiv 1 \\pmod p$ 与 $n_p \\mid m$ 同时不满足才排除，满足了也不能反推存在多少个。',
      refs: ['Lang, Algebra, Ch. I §6', 'Dummit–Foote, Abstract Algebra, §4.5']
    },

    {
      id: 'def.simple-group',
      cluster: 'algebra.solvable',
      type: 'definition',
      label: '单群',
      title: '单群（Simple Group）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '单群'],
      statement: [
        '群 $G \\ne \\{e\\}$ 叫**单群**，当且仅当它只有两个正规子群：$\\{e\\}$ 与 $G$ 自身（即它没有非平凡的**真**正规子群）。'
      ].join('\n'),
      notes: '⭐ 单群是「群论里的素数」：合成列的因子全是单群（`def.composition-series`），Jordan–Hölder 说这些因子唯一 —— 单群扮演的正是素因子在整数分解里的角色。\n\n⭐ 基本的例子与反例：\n- $\\mathbb{Z}/p$（$p$ 素）单：它的每个子群都正规（阿贝尔群），且只有平凡的两个；\n- $A_n$（$n \\ge 5$）单且**非阿贝尔**；\n- $S_n$（$n \\ge 3$）**不**单：$A_n \\trianglelefteq S_n$ 是真正规子群；\n- $A_4$ **不**单：$V_4 = \\{e, (12)(34), (13)(24), (14)(23)\\}$ 正规。\n\n⭐ 「单」与「不可解」的关系是一条清晰的链：单群可解 $\\iff$ 单群阿贝尔 $\\iff$ 素数阶循环群。所以**非阿贝尔单群 = 不可解的砖**，$A_5$ 就是最小的那一块。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.4']
    },
    {
      id: 'def.composition-series',
      cluster: 'algebra.solvable',
      type: 'definition',
      label: '合成列',
      title: '合成列与合成因子（Composition Series）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '合成列'],
      statement: [
        '群 $G$ 的一条**正规链**是一串子群',
        '',
        '$$\\{e\\} = G_0 \\trianglelefteq G_1 \\trianglelefteq \\cdots \\trianglelefteq G_n = G$$',
        '',
        '（每步只要求 $G_{i} \\trianglelefteq G_{i+1}$，**不**要求 $G_i \\trianglelefteq G$）。若每个商 $G_i / G_{i-1}$ 都是**单群**（$i = 1, \\ldots, n$），这条链叫**合成列**。这些单群叫 $G$ 的**合成因子**，$n$ 叫链的**长度**。',
        '',
        '有限群必有合成列：对 $|G|$ 归纳 —— 若 $G$ 不单，取非平凡正规子群 $N$，对 $N$ 与 $G/N$ 各取合成列再拼起来。'
      ].join('\n'),
      notes: '⚠ 「正规」只要求在**相邻两项之间**（$G_i \\trianglelefteq G_{i+1}$）。若要求每个 $G_i$ 都在整个 $G$ 里正规，大多数群根本不会有这种链 —— 这个差别常被读漏。\n\n⭐ 例子（每个都要能自己写出合成因子）：\n- $S_3$：$\\{e\\} \\trianglelefteq A_3 \\trianglelefteq S_3$，因子 $\\mathbb{Z}/3,\\ \\mathbb{Z}/2$；\n- $S_4$：$\\{e\\} \\trianglelefteq \\mathbb{Z}/2 \\trianglelefteq V_4 \\trianglelefteq A_4 \\trianglelefteq S_4$（$V_4 = \\{e,(12)(34),(13)(24),(14)(23)\\}$，它本身不单，还得再插一项），因子 $\\mathbb{Z}/2,\\ \\mathbb{Z}/2,\\ \\mathbb{Z}/3,\\ \\mathbb{Z}/2$；\n- $\\mathbb{Z}/12$：$\\{e\\} \\trianglelefteq \\mathbb{Z}/2 \\trianglelefteq \\mathbb{Z}/6 \\trianglelefteq \\mathbb{Z}/12$，因子 $\\mathbb{Z}/2,\\ \\mathbb{Z}/3,\\ \\mathbb{Z}/2$。\n\n⚠ 不是所有链都是合成列：$\\{e\\} \\trianglelefteq \\mathbb{Z}/2 \\trianglelefteq \\mathbb{Z}/12$ 中间那步的商 $\\mathbb{Z}/6$ **不单**，所以它只是正规链，不是合成列（但可以加细成上面那条）。\n\n⭐ 有限群一定有合成列；**无限群不一定**：$\\mathbb{Z}$ 的任何非平凡子群 $n\\mathbb{Z}$ 都有真子群 $2n\\mathbb{Z}$，子群链无限下降，凑不出「商是单群」的有限链（$\\mathbb{Z}$ 的商里只有 $\\mathbb{Z}/p$ 是单的，而 $\\mathbb{Z}/p \\ne \\mathbb{Z}$）。\n\n⭐ 合成因子必须靠一条定理才能叫「$G$ 的」因子 —— 那就是 `thm.jordan-holder`。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.4']
    },
    {
      id: 'thm.jordan-holder',
      cluster: 'algebra.solvable',
      type: 'theorem',
      label: 'Jordan–Hölder 定理',
      title: '定理（Jordan–Hölder）：合成因子与重数唯一',
      regions: ['algebra'],
      tags: ['定理', '代数', '群', '合成列'],
      statement: [
        '设 $G$ 有两条合成列',
        '',
        '$$\n\\{e\\} = G_0 \\trianglelefteq G_1 \\trianglelefteq \\cdots \\trianglelefteq G_r = G, \\qquad\n\\{e\\} = H_0 \\trianglelefteq H_1 \\trianglelefteq \\cdots \\trianglelefteq H_s = G\n$$',
        '',
        '则 $r = s$，且存在置换 $\\sigma \\in S_r$ 使对每个 $i$',
        '',
        '$$G_i / G_{i-1} \\;\\cong\\; H_{\\sigma(i)} / H_{\\sigma(i)-1}$$',
        '',
        '即：**合成因子的多重集（同构意义下）与合成列的选取无关**。'
      ].join('\n'),
      notes: '⭐ 这条定理让「$G$ 的合成因子」这个说法**合法** —— 否则它只是某条链的属性。它在群论里的位置与算术基本定理在整数里完全相同：把对象拆成不可再分的零件，并保证拆法唯一。\n\n⚠ **逆命题不成立**：合成因子相同**不**蕴含同构。例：$\\mathbb{Z}/12$ 与 $\\mathbb{Z}/2 \\times \\mathbb{Z}/6$ 的合成因子都是 $\\mathbb{Z}/2, \\mathbb{Z}/2, \\mathbb{Z}/3$，但前者有 $12$ 阶元、后者没有，故不同构。也就是说「合成因子」是**不变量而不是完全不变量**。\n\n⭐ 证明的路子是「**加细**」：先证任意两条正规链有等价的加细（Schreier 加细定理），再用 Zassenhaus（蝴蝶）引理证加细可以做到。合成列已经最细（因子是单群，不能再加细），所以两条合成列必须等价。证明全文在边上。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.4']
    },
    {
      id: 'def.solvable-group',
      cluster: 'algebra.solvable',
      type: 'definition',
      label: '可解群',
      title: '可解群（Solvable Group）与导出列',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '可解群'],
      statement: [
        '群 $G$ 叫**可解**的，当且仅当存在正规链',
        '',
        '$$\n\\{e\\} = G_0 \\trianglelefteq G_1 \\trianglelefteq \\cdots \\trianglelefteq G_n = G\n$$',
        '',
        '使每个商 $G_i / G_{i-1}$ 都是**阿贝尔群**。',
        '',
        '**等价刻画**：令 $G^{(0)} := G$、$G^{(k+1)} := [G^{(k)}, G^{(k)}]$（换位子子群），得**导出列**',
        '',
        '$$G = G^{(0)} \\trianglerighteq G^{(1)} \\trianglerighteq G^{(2)} \\trianglerighteq \\cdots$$',
        '',
        '则 $G$ 可解 $\\iff$ 存在 $n$ 使 $G^{(n)} = \\{e\\}$。'
      ].join('\n'),
      notes: '⭐ 三个等价说法，用哪个都行：\n- 存在**阿贝尔商**的正规链（定义）；\n- **导出列**有限步终止（最好算）；\n- 有合成列且**所有合成因子都是素数阶循环群**（最好判）。\n\n⭐ 名字的来源与它真正的价值：Galois 理论的主定理把「多项式方程可用根式解」翻译成「它的 Galois 群可解」—— Abel–Ruffini 定理就从这里出来。这条线的另一半（域扩张）在批 7。\n\n⚠ 「可解」**不是**「阿贝尔」：$S_3$ 与 $S_4$ 都可解但非阿贝尔。「可解」说的是「能被一串**阿贝尔商**逐层拆开」，即「离阿贝尔群有限步远」。\n\n⭐ 单群 + 可解 $\\implies$ 阿贝尔（因为合成列只能是一条 $\\{e\\} \\trianglelefteq G$，因子 $G$ 单且必须阿贝尔）。所以**非阿贝尔单群一律不可解**，$A_5$ 是第一个例子。\n\n⭐ 两类必会：阿贝尔群全部可解（一步链）；$p$-群全部可解（用类方程归纳，中心非平凡 $\\implies$ 可对 $Z(G)$ 与 $G/Z(G)$ 归纳）。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.4']
    },
    {
      id: 'thm.solvable-quotients',
      cluster: 'algebra.solvable',
      type: 'theorem',
      label: '可解性对子群与商群封闭',
      title: '定理：可解性在子群、商群与扩张下的行为',
      regions: ['algebra'],
      tags: ['定理', '代数', '群', '可解群'],
      statement: [
        '设 $G$ 是群。',
        '',
        '**（a）子群**：若 $G$ 可解、$H \\le G$，则 $H$ 可解。',
        '',
        '**（b）商群**：若 $G$ 可解、$N \\trianglelefteq G$，则 $G/N$ 可解。',
        '',
        '**（c）扩张**：若 $N \\trianglelefteq G$，$N$ 可解且 $G/N$ 可解，则 $G$ 可解。',
        '',
        '（(a)(b) 说的是「可解性向下传」，(c) 说的是「可解性沿正规扩张向上传」。）'
      ].join('\n'),
      notes: '⭐ (c) 是这三条里最有用的：判 $G$ 可解时，只要找到一条**正规子群**把 $G$ 夹在中间，两头分别可解即可 —— 这就是把大群拆小的标准手法。\n\n⚠ (a)(b) 的逆都**不**成立，反例很小：\n- 子群可解**推不出**群可解：$\\mathbb{Z}/2 \\le A_5$ 可解，$A_5$ 不可解；\n- 商群可解**推不出**群可解：$S_5 / A_5 \\cong \\mathbb{Z}/2$ 可解，$S_5$ 不可解。\n所以「可解」不是「局部性质」，必须靠 (c) 那样的**两头夹**才往上传。\n\n⭐ 用导出列看这三条几乎是一句话：$H^{(k)} \\le G^{(k)}$；$\\pi(G^{(k)}) = (G/N)^{(k)}$。证明全文在边上。\n\n⭐ 立刻得到一个常用判据：$G$ 可解 $\\iff$ 存在正规链使商**循环**（而不只是阿贝尔）—— 因为阿贝尔群还能再细分成循环因子。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.4']
    },
    {
      id: 'prop.sn-solvable',
      cluster: 'algebra.solvable',
      type: 'proposition',
      label: '对称群的可解性',
      title: '命题：$S_n$ 可解当且仅当 $n \\le 4$',
      regions: ['algebra'],
      tags: ['命题', '代数', '群', '可解群', '置换'],
      statement: [
        '对称群 $S_n$ 可解（`def.solvable-group`），当且仅当 $n \\le 4$。',
        '',
        '等价地：$S_5$ 与它的一切 $S_n$（$n \\ge 5$）都**不**可解，而 $S_1, S_2, S_3, S_4$ 都可解。'
      ].join('\n'),
      notes: '⭐ 这条命题是 **Abel–Ruffini 定理的群论一半**：五次以上方程不能用根式解，根子就在这里 —— 方程的通有 Galois 群是 $S_n$，而 $S_n$（$n \\ge 5$）不可解。\n\n⭐ 分界线落在 $A_4$ 与 $A_5$ 之间，这**不是**渐进现象而是一个硬跳变：$A_4$ 有正规子群 $V_4$（所以 $S_4$ 能被拆开），$A_5$ 没有真正规子群，且 $A_5$ 非阿贝尔，于是不可解。\n\n⭐ $S_4$ 的拆法：$\\{e\\} \\trianglelefteq V_4 \\trianglelefteq A_4 \\trianglelefteq S_4$，商依次为 $\\mathbb{Z}/2 \\times \\mathbb{Z}/2$、$\\mathbb{Z}/3$、$\\mathbb{Z}/2$，全是阿贝尔 ✓。$S_3$ 用 $\\{e\\} \\trianglelefteq A_3 \\trianglelefteq S_3$，商 $\\mathbb{Z}/3, \\mathbb{Z}/2$ ✓。\n\n⭐ $A_5$ 单性的证明可以完全初等地做出来：$A_5$ 的共轭类大小只有 $1, 15, 20, 12, 12$，正规子群是若干类的并、且阶整除 $60$ —— 逐项枚举会发现只有 $1$ 与 $60$ 可行。证明全文在边上。',
      refs: ['Lang, Algebra, Ch. I §5', 'Dummit–Foote, Abstract Algebra, §3.4']
    }
  ],

  edges: [

    /* ------------------------------------------------------------ 定义依赖 */
    {
      id: 'dep.group-groupaction',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.group-action',
      note: '作用是一族由群元素指标化的双射，先要有群。'
    },
    {
      id: 'dep.subgroup-stabilizer',
      kind: 'definition',
      definition: 'def.subgroup',
      usedBy: 'def.group-action',
      note: '稳定子 $G_x$ 是 $G$ 的子群（定义里就要说清它落在哪个概念下）。'
    },
    {
      id: 'dep.grouphom-groupaction',
      kind: 'definition',
      definition: 'def.group-hom',
      usedBy: 'def.group-action',
      note: '⭐ 作用的等价说法是同态 $G \\to \\operatorname{Sym}(X)$ —— 整团的技巧都从这条等价里来。'
    },
    {
      id: 'dep.subgroup-lagrange',
      kind: 'definition',
      definition: 'def.subgroup',
      usedBy: 'thm.lagrange',
      note: 'Lagrange 定理讲的是子群 $H$ 的阶与群的阶的关系。'
    },
    {
      id: 'dep.group-permutation',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.permutation-group',
      note: '$S_n$ 是「双射在复合下成群」这个构造的实例，先要有群的定义。'
    },
    {
      id: 'dep.permutation-alternating',
      kind: 'definition',
      definition: 'def.permutation-group',
      usedBy: 'def.alternating-group',
      note: '符号定义在 $S_n$ 的元素上，交错群是它的核。'
    },
    {
      id: 'dep.groupaction-permutation',
      kind: 'definition',
      definition: 'def.group-action',
      usedBy: 'def.permutation-group',
      note: '$S_n$ 对 $\\{1,\\ldots,n\\}$ 的作用是群作用最重要的例子；反过来 Cayley 定理把每个群塞进某个 $\\operatorname{Sym}(X)$。'
    },
    {
      id: 'dep.group-cyclic',
      kind: 'definition',
      definition: 'def.group',
      usedBy: 'def.cyclic-group',
      note: '循环群是「由一个元素生成的群」，先有群。'
    },
    {
      id: 'dep.normal-simple',
      kind: 'definition',
      definition: 'def.normal-subgroup',
      usedBy: 'def.simple-group',
      note: '"单"就是用正规子群来定义的：只有平凡的两个正规子群。'
    },
    {
      id: 'dep.normal-composition',
      kind: 'definition',
      definition: 'def.normal-subgroup',
      usedBy: 'def.composition-series',
      note: '正规链的每一步都是正规子群关系（只是相邻两项之间）。'
    },
    {
      id: 'dep.quotient-composition',
      kind: 'definition',
      definition: 'def.quotient-group',
      usedBy: 'def.composition-series',
      note: '合成列的每一步要谈商群 $G_i/G_{i-1}$，所以要先有商群。'
    },
    {
      id: 'dep.simple-composition',
      kind: 'definition',
      definition: 'def.simple-group',
      usedBy: 'def.composition-series',
      note: '合成列的因子必须**单**，因此要用单群这个概念。'
    },
    {
      id: 'dep.composition-jordan-holder',
      kind: 'definition',
      definition: 'def.composition-series',
      usedBy: 'thm.jordan-holder',
      note: 'Jordan–Hölder 说的就是两条合成列之间的关系。'
    },
    {
      id: 'dep.subgroup-solvable',
      kind: 'definition',
      definition: 'def.subgroup',
      usedBy: 'def.solvable-group',
      note: '可解性用子群链定义。'
    },
    {
      id: 'dep.quotient-solvable',
      kind: 'definition',
      definition: 'def.quotient-group',
      usedBy: 'def.solvable-group',
      note: '可解链上要谈商 $G_i/G_{i-1}$ 是阿贝尔群。'
    },
    {
      id: 'dep.groupaction-orbit',
      kind: 'definition',
      definition: 'def.group-action',
      usedBy: 'thm.orbit-stabilizer',
      note: '轨道与稳定子都是群作用这一条定义里带出来的对象。'
    },
    {
      id: 'dep.groupaction-class-equation',
      kind: 'definition',
      definition: 'def.group-action',
      usedBy: 'thm.class-equation',
      note: '类方程是共轭作用的轨道分解，所以先用群作用这套语言。'
    },
    {
      id: 'dep.groupaction-cayley',
      kind: 'definition',
      definition: 'def.group-action',
      usedBy: 'thm.cayley',
      note: 'Cayley 定理就是「左乘作用」这个具体作用给出的结论。'
    },
    {
      id: 'dep.groupaction-sylow',
      kind: 'definition',
      definition: 'def.group-action',
      usedBy: 'thm.sylow',
      note: 'Sylow 的三条（尤其共轭性与计数）全靠让 Sylow 子群作用在陪集或 Sylow 集合上。'
    },

    /* ---------------------------------------------------------------- 证明 */
    {
      id: 'imp.lagrange',
      kind: 'implication',
      sources: ['def.subgroup'],
      target: 'thm.lagrange',
      title: '陪集构成划分 + 平移是双射 $\\implies$ Lagrange',
      proof: [
        '**第一步：左陪集是等价类。** 在 $G$ 上定义关系 $g_1 \\sim g_2 :\\iff g_1^{-1} g_2 \\in H$。它自反（$g^{-1}g = e \\in H$）、对称（$g_1^{-1}g_2 \\in H \\implies (g_1^{-1}g_2)^{-1} = g_2^{-1}g_1 \\in H$）、传递（相乘仍属 $H$），故是等价关系。而',
        '',
        '$$g_1 \\sim g_2 \\iff g_1^{-1} g_2 \\in H \\iff g_2 \\in g_1 H,$$',
        '',
        '所以等价类正是左陪集。等价类构成划分，故**左陪集两两不交且覆盖 $G$**。',
        '',
        '**第二步：每个左陪集与 $H$ 等势。** 映射 $\\varphi : H \\to gH$，$h \\mapsto gh$，有逆 $gh \\mapsto h$（良定义：$gh_1 = gh_2 \\implies h_1 = h_2$）。故 $|gH| = |H|$。',
        '',
        '**第三步：数个数。** 设不同左陪集为 $g_1H, \\ldots, g_k H$。由第一步 $G = \\bigsqcup_{i} g_i H$，两边取基数并用第二步：',
        '',
        '$$|G| = \\sum_{i=1}^{k} |g_i H| = k \\, |H|,$$',
        '',
        '故 $|H| \\mid |G|$ 且 $k = |G|/|H| = [G : H]$。∎'
      ].join('\n'),
      note: '⭐ 整个证明没有用到任何关于群结构的东西 —— 只用了「$H$ 对乘法封闭且含逆」这两个子群条件。所以 Lagrange 是一条**纯计数**定理。'
    },
    {
      id: 'imp.orbit-stabilizer',
      kind: 'implication',
      sources: ['def.group-action', 'thm.lagrange'],
      target: 'thm.orbit-stabilizer',
      title: '构造双射 $G/G_x \\to Gx$ $\\implies$ 轨道–稳定子',
      proof: [
        '**第一步：$G_x$ 是子群。** $e \\in G_x$；若 $g, h \\in G_x$，则 $(gh)\\cdot x = g\\cdot(h\\cdot x) = g \\cdot x = x$，故 $gh \\in G_x$；又 $g \\cdot x = x$ 两边作用 $g^{-1}$ 得 $x = g^{-1}\\cdot x$，故 $g^{-1} \\in G_x$。',
        '',
        '**第二步：映射 $\\varphi : G/G_x \\to Gx$，$g G_x \\mapsto g \\cdot x$ 良定义。** 若 $g\' \\in gG_x$，写 $g\' = g h$（$h \\in G_x$），则 $g\'\\cdot x = g\\cdot(h\\cdot x) = g \\cdot x$ —— 与代表元无关。',
        '',
        '**第三步：$\\varphi$ 是双射。** 满：$Gx$ 的元素按定义就是 $g\\cdot x$。单：若 $g\\cdot x = g\'\\cdot x$，则 $(g^{-1}g\')\\cdot x = g^{-1}\\cdot(g\'\\cdot x) = g^{-1}\\cdot(g\\cdot x) = x$，故 $g^{-1}g\' \\in G_x$，即 $g\' \\in gG_x$，两个陪集相同。',
        '',
        '**第四步：取基数。** 由第三步与 Lagrange（`thm.lagrange`），',
        '',
        '$$|\\operatorname{Orb}(x)| = |G/G_x| = [G : G_x] = \\frac{|G|}{|G_x|}$$',
        '',
        '∎'
      ].join('\n'),
      note: '⭐ 这个双射值得单独记住：**「轨道里的点」与「稳定子的陪集」是一回事**。它把几何（点集）翻译成了代数（陪集），后面所有轨道计数都是这一句的算术化。'
    },
    {
      id: 'imp.class-equation',
      kind: 'implication',
      sources: ['def.group-action', 'thm.orbit-stabilizer'],
      target: 'thm.class-equation',
      title: '共轭作用的轨道分解 + 轨道–稳定子 $\\implies$ 类方程',
      proof: [
        '**第一步：共轭是一个作用。** 令 $g \\cdot x := g x g^{-1}$。则 $e\\cdot x = x$，且',
        '',
        '$$(gh)\\cdot x = (gh)\\,x\\,(gh)^{-1} = g\\,(h x h^{-1})\\,g^{-1} = g \\cdot (h \\cdot x).$$',
        '',
        '**第二步：轨道与稳定子各是什么。** 轨道 $G\\cdot x = \\{\\,gxg^{-1}\\,\\}$ 就是**共轭类**；稳定子',
        '',
        '$$G_x = \\{\\, g : gxg^{-1} = x \\,\\} = \\{\\, g : gx = xg \\,\\} = C_G(x)$$',
        '',
        '正是**中心化子**。而 $|\\text{轨道}| = 1 \\iff Gx = \\{x\\} \\iff x \\in Z(G)$（与一切元素交换）。',
        '',
        '**第三步：分解。** 由第一步，$X = G$ 被共轭类划分。把长度 $1$ 的类（即 $Z(G)$ 的元素）单独拎出，其余类按代表元 $x_1, \\ldots, x_r$ 计数，得',
        '',
        '$$|G| = |Z(G)| + \\sum_{i=1}^{r} |\\text{$x_i$ 的共轭类}| = |Z(G)| + \\sum_{i=1}^{r} [G : C_G(x_i)],$$',
        '',
        '最后一步用了轨道–稳定子（`thm.orbit-stabilizer`）。',
        '',
        '**第四步：$p$-群那一档。** 若 $|G| = p^{n}$，则每项 $[G : C_G(x_i)] = p^{k_i}$（$k_i \\ge 1$，因为 $x_i$ 非中心故 $C_G(x_i) \\ne G$）。于是右端除 $|Z(G)|$ 外都被 $p$ 整除，左端也被 $p$ 整除，故 $p \\mid |Z(G)|$；又 $Z(G) \\ne \\emptyset$ 含 $e$，故 $|Z(G)| \\ge p$，特别地 $Z(G) \\ne \\{e\\}$。∎'
      ].join('\n'),
      note: '⭐ 第三步的「把长度 1 的类拎出来」不是技巧，而是**必须**：中心化子等于 $G$ 时 $[G : C_G(x)] = 1$，直接写求和会让中心被重复计入 $|Z(G)|$ 次。'
    },
    {
      id: 'imp.cayley',
      kind: 'implication',
      sources: ['def.group-action', 'def.permutation-group'],
      target: 'thm.cayley',
      title: '左乘作用是自由作用 $\\implies$ Cayley 定理',
      proof: [
        '**第一步：左乘是作用。** $\\rho : G \\times G \\to G$，$\\rho(g)(h) := gh$。则 $e h = h$、$(g_1g_2)h = g_1(g_2 h)$，故它是 $G$ 在自身上的作用。于是（`def.group-action` 的等价说法）它对应同态',
        '',
        '$$\\rho : G \\to \\operatorname{Sym}(G), \\qquad g \\mapsto (h \\mapsto gh).$$',
        '',
        '**第二步：每个 $\\rho(g)$ 是双射。** 逆是 $h \\mapsto g^{-1}h$。',
        '',
        '**第三步：作用自由，故同态单。** 若 $\\rho(g) = \\mathrm{id}$，则对一切 $h$ 有 $gh = h$；取 $h = e$ 得 $g = e$。故 $\\ker\\rho = \\{e\\}$，$\\rho$ 单射。',
        '',
        '**第四步：$|G| = n$ 时认出 $S_n$。** $\\operatorname{Sym}(G) \\cong S_n$（把 $G$ 的元素随意编号），于是 $G \\cong \\rho(G) \\le S_n$。∎'
      ].join('\n'),
      note: '⭐ 第三步「取 $h = e$」这一步是全部内容：**自由性（稳定子平凡）就是单性**。任何自由作用都会给出一个单同态，Cayley 只是取作用为左乘。'
    },
    {
      id: 'imp.sylow',
      kind: 'implication',
      sources: ['thm.class-equation', 'def.group-action', 'thm.orbit-stabilizer'],
      target: 'thm.sylow',
      title: '类方程 + 让 Sylow 子群作用 $\\implies$ Sylow 三条',
      proof: [
        '记 $|G| = p^{a} m$、$p \\nmid m$。',
        '',
        '**（1）存在性：对 $|G|$ 归纳。** $a = 0$ 时取平凡子群。设 $a \\ge 1$。',
        '',
        '- **情形 A：$p \\mid |Z(G)|$。** 取 $z \\in Z(G)$，$\\operatorname{ord}(z) = p$（Cauchy 引理，由类方差的推论加上对阶归纳可得）。令 $\\overline G := G/\\langle z\\rangle$，则 $|\\overline G| = p^{a-1}m$。由归纳假设 $\\overline G$ 有 $p^{a-1}$ 阶子群 $\\overline P$；取 $\\pi^{-1}(\\overline P) \\le G$（$\\pi : G \\to \\overline G$ 是自然满同态），其阶为 $|\\overline P| \\cdot |\\langle z\\rangle| = p^{a}$。',
        '- **情形 B：$p \\nmid |Z(G)|$。** 由类方程（`thm.class-equation`）$|G| = |Z(G)| + \\sum_i [G : C_G(x_i)]$。左端被 $p$ 整除、$|Z(G)|$ 不被 $p$ 整除，故存在某个 $i$ 使 $p \\nmid [G : C_G(x_i)]$。由 $|G| = [G : C_G(x_i)]\\cdot|C_G(x_i)|$ 与 $p^{a} \\mid |G|$ 得 $p^{a} \\mid |C_G(x_i)|$；又 $x_i$ 非中心故 $C_G(x_i) \\ne G$，于是 $|C_G(x_i)| < |G|$。对 $C_G(x_i)$ 用归纳假设得 $p^{a}$ 阶子群，它也是 $G$ 的。',
        '',
        '（$p^{i}$ 阶子群（$i < a$）由对 $p^{a}$ 阶子群再用一次「$p$-群有 $p^{i}$ 阶子群」的归纳得到。）',
        '',
        '**（2）共轭性。** 设 $P, Q$ 是 Sylow $p$-子群，考虑 $P$ 在左陪集集合 $X := G/Q$ 上的作用 $g \\cdot (hQ) := (gh)Q$。',
        '',
        '$$|X| = [G : Q] = m, \\qquad p \\nmid m.$$',
        '',
        '由轨道分解 $|X| = \\sum |\\text{轨道}|$，每个轨道长 $= [P : P_{hQ}]$ 是 $p$ 的幂。若**没有**不动点，则每个轨道长都被 $p$ 整除，于是 $p \\mid |X| = m$，矛盾。故有不动点 $hQ$：对一切 $g \\in P$ 有 $ghQ = hQ$，即 $h^{-1}Ph \\le Q$。两端阶相同（都是 $p^{a}$），故 $h^{-1}Ph = Q$：$P$ 与 $Q$ 共轭。',
        '',
        '把上面论证中的 $P$ 换成任一 $p$-子群 $R$，同样得到 $h^{-1}Rh \\le Q$：**任何 $p$-子群都含在某个 Sylow 子群中**。',
        '',
        '**（3）计数。** 设 $\\mathcal{S}$ 是全体 Sylow $p$-子群的集合。$G$ 共轭作用在 $\\mathcal{S}$ 上（由 (2) 传递）；$P$ 的稳定子是 $N_G(P)$，故',
        '',
        '$$n_p = |\\mathcal{S}| = [G : N_G(P)].$$',
        '',
        '再由 $P \\le N_G(P)$ 得 $n_p \\mid [G : P] = m$。最后让 $P$ 共轭作用在 $\\mathcal{S}$ 上：轨道长是 $p$ 的幂，而 $P$ 的不动点只有 $P$ 自己（若 $P$ 固定 $Q$，则 $P \\le N_G(Q)$，于是 $P$ 与 $Q$ 都是 $N_G(Q)$ 的 Sylow 子群，由 (2) 在 $N_G(Q)$ 中共轭；但 $Q \\trianglelefteq N_G(Q)$ 故只能 $P = Q$）。于是',
        '',
        '$$n_p = 1 + \\sum (\\text{长度 } \\ge 2 \\text{ 的轨道长}) \\equiv 1 \\pmod p$$',
        '',
        '∎'
      ].join('\n'),
      note: '⭐ 第二步的论证是整条定理的模板，值得单独记住：**让 $p$-群作用在一个「基数不被 $p$ 整除」的集合上，必有不共点** —— 因为轨道长都是 $p$ 的幂，若都 $\\ge p$ 就整除不了总和。这个「不动点论证」在表示论与代数拓扑里反复出现。'
    },
    {
      id: 'imp.jordan-holder',
      kind: 'implication',
      sources: ['def.composition-series'],
      target: 'thm.jordan-holder',
      title: 'Zassenhaus（蝴蝶）引理 + Schreier 加细 $\\implies$ Jordan–Hölder',
      proof: [
        '**引理 1（Zassenhaus / 蝴蝶引理）**：设 $A \\trianglelefteq A^{\\ast}$、$B \\trianglelefteq B^{\\ast}$ 都是群 $G$ 的子群。则',
        '',
        '$$A(A^{\\ast}\\cap B^{\\ast}) \\trianglelefteq A(A^{\\ast} \\cap B), \\qquad B(A^{\\ast}\\cap B^{\\ast}) \\trianglelefteq B(A^{\\ast}\\cap B),$$',
        '',
        '且两个商同构：',
        '',
        '$$\\frac{A(A^{\\ast}\\cap B)}{A(A^{\\ast}\\cap B^{\\ast})} \\;\\cong\\; \\frac{B(A^{\\ast}\\cap B)}{B(A^{\\ast}\\cap B^{\\ast})}.$$',
        '',
        '*证明*：考虑映射 $\\varphi : A(A^{\\ast}\\cap B) \\to \\dfrac{B(A^{\\ast}\\cap B)}{B(A^{\\ast}\\cap B^{\\ast})}$。由 $A \\trianglelefteq A^{\\ast}$、$B \\trianglelefteq B^{\\ast}$ 可逐项验证 $\\varphi$ 是同态，其核恰为 $A(A^{\\ast}\\cap B^{\\ast})$、其像恰为整个商（任取 $b \\in B$，$b$ 的像由 $A$ 部分承担）。于是由第一同构定理（`thm.first-iso`）得同构。对称地做另一边即得引理。∎',
        '',
        '**引理 2（Schreier）**：任意两条正规链都有**等价**的加细（两条加细的因子多重集相同）。',
        '',
        '*证明*：只需证一条链与任一链能通过反复插入中间项互相加细到等价。设链为 $\\cdots \\trianglelefteq G_i \\trianglelefteq G_{i+1} \\trianglelefteq \\cdots$，插入 $H_j$ 时在区间 $[G_i, G_{i+1}]$ 上插入',
        '',
        '$$G_i(H_j \\cap G_{i+1}) \\ \\text{与}\\ G_i(H_{j+1}\\cap G_{i+1})$$',
        '',
        '由引理 1，这两步的商在「对 $i$ 加细」与「对 $j$ 加细」两种看法下同构 —— 于是把双边所有小区间用蝴蝶引理配成对，得到两条等价加细。∎',
        '',
        '**回到定理**：设两条**合成**列为 $\\mathcal{C}_1, \\mathcal{C}_2$。由引理 2 存在等价加细 $\\mathcal{C}_1^{\\prime}, \\mathcal{C}_2^{\\prime}$。但合成列已无法再加细：其每步商是单群，而单群没有非平凡正规子群，插不进任何中间项。故 $\\mathcal{C}_1^{\\prime} = \\mathcal{C}_1$、$\\mathcal{C}_2^{\\prime} = \\mathcal{C}_2$，于是两条合成列本身等价：长度相同、因子多重集相同。∎'
      ].join('\n'),
      note: '⚠ 引理 1 的验证（同态性、核、像）是纯机械的逐项检查，这里略去了细节；它的几何形象是「蝴蝶」——四个子群围成的平行四边形两组对边等长。⭐ 结构上这条定理是「**加细 + 最细即唯一**」，与整数分解里「不断除以素因子直到商为 1」是同一个逻辑。'
    },
    {
      id: 'imp.solvable-quotients',
      kind: 'implication',
      sources: ['def.solvable-group', 'thm.first-iso'],
      target: 'thm.solvable-quotients',
      title: '导出列的三条函子性 $\\implies$ 封闭性',
      proof: [
        '先记两个初等事实：若 $\\varphi : G \\to G\'$ 是满同态，则 $\\varphi(G^{(k)}) = (G\')^{(k)}$（换位子被送到换位子，且满射保证反向也成立）。',
        '',
        '**（a）** 设 $G$ 可解，$G^{(n)} = \\{e\\}$。因 $H \\le G$ 蕴含 $H^{(k)} \\le G^{(k)}$（对 $k$ 归纳：$[H,H] \\le [G,G]$，再逐层），故 $H^{(n)} \\le G^{(n)} = \\{e\\}$，即 $H^{(n)} = \\{e\\}$。',
        '',
        '**（b）** 设 $\\pi : G \\to G/N$ 是自然满同态。由上面的事实',
        '',
        '$$(G/N)^{(n)} = \\pi(G^{(n)}) = \\pi(\\{e\\}) = \\{e\\},$$',
        '',
        '故 $G/N$ 可解。',
        '',
        '**（c）** 设 $N$ 可解、$G/N$ 可解。取 $n$ 使 $(G/N)^{(n)} = \\{e\\}$，即 $\\pi(G^{(n)}) = \\{e\\}$，也就是 $G^{(n)} \\le N$。再取 $m$ 使 $N^{(m)} = \\{e\\}$。于是',
        '',
        '$$G^{(n+m)} = \\bigl(G^{(n)}\\bigr)^{(m)} \\le N^{(m)} = \\{e\\},$$',
        '',
        '（第一步用了同样的事实 $[H,H]$ 的迭代：$G^{(n+m)} = (G^{(n)})^{(m)}$，因为导出列就是反复取换位子。）故 $G$ 可解。∎'
      ].join('\n'),
      note: '⭐ 三条的证明都只用了「$H \\le G \\implies H^{(k)} \\le G^{(k)}$」与「满同态把导出列送到导出列」这两句话 —— 导出列是**函子式**的，所以可解性才这么听话。'
    },
    {
      id: 'imp.sn-solvable',
      kind: 'implication',
      sources: ['def.solvable-group', 'def.alternating-group', 'thm.solvable-quotients', 'def.simple-group'],
      target: 'prop.sn-solvable',
      title: '$A_5$ 的单性（按共轭类枚举）$\\implies$ $S_n$ 可解 $\\iff n \\le 4$',
      proof: [
        '**第一步：$A_5$ 的共轭类。** $|A_5| = 60$。按循环型列举，$A_5$ 中的元素与它们在 $A_5$ 中的**共轭类大小**是：',
        '',
        '- 单位元：$1$ 个，单独一类，大小 $1$；',
        '- $3$-循环：共 $\\binom{5}{3} \\cdot 2 = 20$ 个，**一类**，大小 $20$；',
        '- 双对换（型 $2^{2}$）：共 $\\binom{5}{4}\\cdot 3 = 15$ 个，**一类**，大小 $15$（中心化子阶 $4$，$60/4 = 15$）；',
        '- $5$-循环：共 $4! = 24$ 个，在 $A_5$ 中**裂成两类**，各 $12$。',
        '',
        '合计 $1 + 20 + 15 + 12 + 12 = 60$ ✓。（$5$-循环之所以分裂：它的中心化子就是那个 $5$ 阶循环群本身，阶 $5$，故 $A_5$-共轭类大小 $60/5 = 12$；而 $S_5$ 中同样中心化子给出 $120/5 = 24$，所以 $S_5$ 里只有一类、$A_5$ 里是两类。）',
        '',
        '**第二步：$A_5$ 单。** 设 $\\{e\\} \\ne N \\trianglelefteq A_5$。正规子群是共轭类的并，且含 $e$，故',
        '',
        '$$|N| = 1 + (\\text{若干个 } 15, 20, 12, 12 \\text{ 之和}).$$',
        '',
        '又 $|N| \\mid |A_5| = 60$。枚举全部子集和：$1, 16, 21, 13, 36, 28, 33, 25, 48, 40, 45, 60$。其中能整除 $60$ 的只有 $1$ 与 $60$。故 $N = \\{e\\}$ 或 $N = A_5$，即 $A_5$ 单。',
        '',
        '**第三步：$A_5$ 非阿贝尔，故不可解。** $A_5$ 的合成列只能是 $\\{e\\} \\trianglelefteq A_5$（第二步），其唯一因子是 $A_5$ 本身；而 $A_5$ 非阿贝尔（例如 $(123)(124) \\ne (124)(123)$）。故 $A_5$ 没有阿贝尔商的正规链，即 $A_5$ **不可解**。',
        '',
        '**第四步：$n \\ge 5$ 时 $S_n$ 不可解。** 固定后 $n - 5$ 个点，前 $5$ 个点上的偶置换给出 $A_5 \\le A_n \\le S_n$。若 $S_n$ 可解，则由 (a) 其子群 $A_5$ 可解，与第三步矛盾。',
        '',
        '**第五步：$n \\le 4$ 时可解。** 给出具体链：',
        '',
        '- $n \\le 2$：$S_n$ 阿贝尔，一步链即可；',
        '- $n = 3$：$\\{e\\} \\trianglelefteq A_3 \\trianglelefteq S_3$，商 $\\mathbb{Z}/3$、$\\mathbb{Z}/2$，均阿贝尔；',
        '- $n = 4$：$\\{e\\} \\trianglelefteq V_4 \\trianglelefteq A_4 \\trianglelefteq S_4$，其中 $V_4 = \\{e, (12)(34), (13)(24), (14)(23)\\}$；商依次为 $V_4 \\cong \\mathbb{Z}/2\\times\\mathbb{Z}/2$、$A_4/V_4 \\cong \\mathbb{Z}/3$、$S_4/A_4 \\cong \\mathbb{Z}/2$，全是阿贝尔。（$V_4 \\trianglelefteq A_4$ 因为它是「单位 + 全部三个双对换」这个共轭类的并。）',
        '',
        '两个方向合起来即得 $S_n$ 可解 $\\iff n \\le 4$。∎'
      ].join('\n'),
      note: '⭐ 整个证明的关键是**把「$A_5$ 单」变成一个可以逐项核对的有限计算**：共轭类大小只有 $1, 15, 20, 12, 12$，正规子群是若干类的并、且阶整除 $60$ —— 枚举 $2^{4} = 16$ 种组合，只有 $1$ 与 $60$ 可行。这比「抽象地论证单性」可靠得多，也省掉了「证明 $A_n$（$n \\ge 5$）都单」这件更重的事：判 $S_n$ 不可解只需要 $A_5$ 这一个。\n\n⚠ 第四步用了一个小事实：$A_5 \\le A_n$（$n \\ge 5$）—— 固定后 $n-5$ 个点、在前 $5$ 个点上做偶置换即可。它是 $A_n$ 的子群，而子群可解性向下传（`thm.solvable-quotients` (a)）。'
    }
  ]
});
