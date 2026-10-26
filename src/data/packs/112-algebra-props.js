/* ==========================================================================
   内容包 · 代数与范畴：定义之后该有的性质
   --------------------------------------------------------------------------
     prop.group-basic        群：消去律、逆的公式、整数幂律
     prop.ideal-basic        理想：交 / 和 / 积，商环的泛性质
     prop.prime-ideal        素理想与极大理想（商环是整环 / 域）
     prop.functor-preserves-iso  函子把同构送到同构

   ⭐ 这四条对应 `def.group` / `def.ideal` / `def.functor` 后面「本该有、
     但一直只在注记里提过一句」的性质。`def.group` 的注记只证了单位元与逆元唯一，
     `def.ideal` 只写了商环良定义，`def.functor` 只列了例子。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '代数与范畴：定义之后的性质',
  nodes: [

    {
      id: 'prop.group-basic',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '群的基本性质',
      title: '命题：群的消去律与逆的公式（Elementary Group Theory）',
      regions: ['algebra'],
      tags: ['命题', '群', '运算'],
      refs: ['Lang, Algebra, Ch. I'],
      statement: [
        '设 $G$ 是群，$a, b, c \\in G$。则：',
        '',
        '**(i) 消去律**：$ab = ac \\implies b = c$，$ba = ca \\implies b = c$；',
        '',
        '**(ii) 逆的公式**：$(ab)^{-1} = b^{-1}a^{-1}$，$(a^{-1})^{-1} = a$，$e^{-1} = e$；',
        '',
        '**(iii)** 对 $m, n \\in \\mathbb{Z}$：$a^{m}a^{n} = a^{m+n}$，$(a^{m})^{n} = a^{mn}$，$a^{0} = e$。'
      ].join('\n'),
      notes: '⭐ 消去律是「群」与「幺半群」的分水岭：$(\\mathbb{N}, \\cdot)$ 是幺半群，但 $0 \\cdot 2 = 0 \\cdot 3$ 消不掉 $0$ —— 缺的正是逆元。\n\n⚠ 非交换群里 $(ab)^{-1} = b^{-1}a^{-1}$ 的顺序**必须反过来**：$(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = aa^{-1} = e$。写成 $a^{-1}b^{-1}$ 一般是错的（$S_3$ 里取两个对换就能试出来）。\n\n⭐ (iii) 是 `def.power` 在群里的版本；证明同样是「先对非负整数归纳，再用逆元过渡到负指数」。'
    },
    {
      id: 'prop.ideal-basic',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '理想的运算与商环泛性质',
      title: '命题：理想的交、和、积与商环的泛性质（Operations on Ideals）',
      regions: ['algebra'],
      tags: ['命题', '环', '理想', '商环'],
      refs: ['Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1'],
      statement: [
        '设 $A$ 是环，$I, J \\subseteq A$ 是理想。则：',
        '',
        '**(i)** $I \\cap J$ 与',
        '',
        '$$I + J := \\{\\, x + y : x \\in I,\\ y \\in J \\,\\}$$',
        '',
        '都是理想；$I + J$ 是包含 $I \\cup J$ 的**最小**理想；',
        '',
        '**(ii)** 有限和组成的集合',
        '',
        '$$IJ := \\left\\{ \\sum_{k=1}^{n} x_k y_k : x_k \\in I,\\ y_k \\in J,\\ n \\ge 0 \\right\\}$$',
        '',
        '是理想，且 $IJ \\subseteq I \\cap J$；',
        '',
        '**(iii) 商环的泛性质**：若 $\\varphi : A \\to B$ 是环同态且 $\\varphi(I) = 0$，则存在**唯一**的环同态 $\\bar{\\varphi} : A/I \\to B$ 使 $\\bar{\\varphi} \\circ \\pi = \\varphi$，其中 $\\pi : A \\to A/I$ 是商映射。'
      ].join('\n'),
      notes: '⭐ 对照群：群要商出群，商掉的是**正规子群**；环要商出环，商掉的是**理想**。两者的理由一模一样 —— 要让商集上的运算与代表元无关。\n\n⚠ 理想的**并**一般不是理想：$2\\mathbb{Z} \\cup 3\\mathbb{Z}$ 不含 $2 + 3 = 5$。所以「并」的替代品是**和** $I + J$，它才是包含两者的最小理想。\n\n⭐ 商环泛性质是「第一同构定理」的另一面：$\\ker \\varphi \\supseteq I$ 时 $\\varphi$ 穿过 $A/I$，且 $A/\\ker\\varphi \\cong \\operatorname{im}\\varphi$。'
    },
    {
      id: 'prop.prime-ideal',
      cluster: 'algebra.structures',
      type: 'proposition',
      label: '素理想与极大理想',
      title: '命题：素理想、极大理想与商环（Prime and Maximal Ideals）',
      regions: ['algebra'],
      tags: ['命题', '环', '理想', '商环'],
      refs: ['Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1'],
      statement: [
        '设 $A$ 是含幺交换环，$P, M \\subset A$ 是理想。',
        '',
        '**(i)** $P$ 叫**素理想**，若 $ab \\in P \\implies a \\in P$ 或 $b \\in P$。等价地：$A/P$ 是**整环**。',
        '',
        '**(ii)** $M$ 叫**极大理想**，若不存在理想 $J$ 使 $M \\subset J \\subset A$。等价地：$A/M$ 是**域**。',
        '',
        '**(iii)** 极大 $\\implies$ 素（$A/M$ 是域 $\\implies$ 是整环）。'
      ].join('\n'),
      notes: '⭐ 素理想是「整除」的抽象：在 $\\mathbb{Z}$ 里 $(p)$ 素 $\\iff$ $p$ 是素数；在 $k[x]$ 里 $(f)$ 素 $\\iff$ $f$ 不可约。\n\n⭐ 极大理想是「商掉之后最简单」：$\\mathbb{Z}/p\\mathbb{Z}$ 是域，$\\mathbb{Z}/(6)$ 不是（有零因子）。\n\n⚠ 极大 $\\implies$ 素，但**反之不然**：$k[x,y]$ 里 $(x)$ 是素理想（$k[x,y]/(x) \\cong k[y]$ 是整环），却不极大（$(x) \\subset (x, y) \\subset k[x,y]$）。一维的整环（如 $\\mathbb{Z}$、$k[x]$）里两者才重合。\n\n📌 存在性（每个真理想都含在一个极大理想里）要用佐恩引理；那是 `lem.zorn` 的应用，不在本条里。'
    },
    {
      id: 'prop.functor-preserves-iso',
      cluster: 'cat.functor',
      type: 'proposition',
      label: '函子保同构',
      title: '命题：函子把同构送到同构（Functors Preserve Isomorphisms）',
      regions: ['category'],
      tags: ['命题', '范畴论', '函子'],
      refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I'],
      statement: [
        '设 $F : \\mathcal{C} \\to \\mathcal{D}$ 是函子，$f : X \\to Y$ 是 $\\mathcal{C}$ 中的同构，逆为 $f^{-1} : Y \\to X$。则 $F(f)$ 是同构，且',
        '',
        '$$F(f)^{-1} = F\\left(f^{-1}\\right).$$'
      ].join('\n'),
      notes: '⭐ 一句话：$F(f)\\,F(f^{-1}) = F(f f^{-1}) = F(1_Y) = 1_{F(Y)}$，另一边同理。用的正是函子的两条要求：**保复合、保单位**。\n\n⚠ 反过来**不**成立：$F(f)$ 是同构推不出 $f$ 是同构（遗忘函子把线性同构与可逆线性映射看成同一件事，但把不可逆的方阵也映射成映射）。要反推需要 $F$ **全忠实**，那正是 `prop.adjoint-full-faithful` 那一类命题的内容。\n\n⭐ 这条虽小，却是「同构是范畴论性质」的第一块砖：任何函子都不区分同构对象，所以同构不变量（秩、迹、行列式、同调）才有意义。'
    }
  ],

  edges: [

    {
      id: 'imp.group-basic',
      kind: 'implication',
      sources: ['def.group'],
      target: 'prop.group-basic',
      title: '群公理 $\\implies$ 消去律与逆公式',
      proof: [
        '**(i)** 若 $ab = ac$，两边左乘 $a^{-1}$：$a^{-1}(ab) = a^{-1}(ac)$，由结合律得 $b = c$。右消去对称。',
        '',
        '**(ii)** $(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = aea^{-1} = aa^{-1} = e$，同理 $(b^{-1}a^{-1})(ab) = e$，由逆元唯一得 $(ab)^{-1} = b^{-1}a^{-1}$。$a^{-1}$ 的逆是 $a$ 由 $a^{-1}a = e$ 直接读出；$e^{-1} = e$ 同理。',
        '',
        '**(iii)** 非负指数对 $n$ 归纳（`def.power`）；负指数写成 $(a^{-1})^{k}$，再用 $(a^{-1})^{k} = (a^{k})^{-1}$（对 $k$ 归纳，用 (ii)）。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.ideal-basic',
      kind: 'implication',
      sources: ['def.ideal', 'def.ring'],
      target: 'prop.ideal-basic',
      title: '理想的定义 $\\implies$ 交、和、积与商环泛性质',
      proof: [
        '**(i)** $I \\cap J$：加法子群显然；对 $a \\in A$、$x \\in I\\cap J$ 有 $ax, xa \\in I$ 且 $\\in J$。$I + J$：加法子群（两个子群之和）；对 $x + y \\in I + J$，$a(x+y) = ax + ay \\in I + J$。包含性：$I = I + 0 \\subseteq I + J$，同理 $J$；若理想 $K \\supseteq I \\cup J$，则对 $x + y \\in I + J$ 有 $x, y \\in K$，故 $x + y \\in K$，即 $I + J \\subseteq K$。',
        '',
        '**(ii)** $IJ$ 对加法封闭（两个有限和相加仍是有限和）。对 $a \\in A$，$a\\sum x_k y_k = \\sum (a x_k) y_k$，而 $a x_k \\in I$，故仍在 $IJ$；右乘同理。$IJ \\subseteq I \\cap J$：每个 $x_k y_k \\in I$（$x_k \\in I$，$I$ 是理想）且 $\\in J$（$y_k \\in J$），有限和仍在 $I \\cap J$。',
        '',
        '**(iii)** 定义 $\\bar{\\varphi}(a + I) := \\varphi(a)$。良定义：若 $a - a\' \\in I$，则 $\\varphi(a) - \\varphi(a\') = \\varphi(a - a\') = 0$（因 $\\varphi(I) = 0$）。它是环同态，因为 $\\pi$ 是满同态且 $\\varphi$ 是。唯一性：$\\pi$ 满，故 $\\bar{\\varphi}$ 由 $\\bar{\\varphi}\\circ\\pi = \\varphi$ 唯一确定。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.prime-ideal',
      kind: 'implication',
      sources: ['prop.ideal-basic', 'def.ideal'],
      target: 'prop.prime-ideal',
      title: '商环 + 理想对应 $\\implies$ 素 / 极大理想的刻画',
      proof: [
        '记 $\\pi : A \\to A/P$。交换环的商环仍是含幺交换环（`prop.ideal-basic` 的构造）。',
        '',
        '**(i)** 若 $P$ 素：设 $\\bar a \\bar b = 0$，即 $ab \\in P$，则 $a \\in P$ 或 $b \\in P$，即 $\\bar a = 0$ 或 $\\bar b = 0$ —— $A/P$ 无零因子，是整环。反之若 $A/P$ 是整环且 $ab \\in P$，则 $\\bar a \\bar b = 0$，故 $\\bar a = 0$ 或 $\\bar b = 0$。',
        '',
        '**(ii)** 商环的理想与「包含 $P$ 的理想」一一对应（$J \\mapsto \\pi^{-1}(J)$、$\\bar J \\mapsto \\pi^{-1}(\\bar J)$ 互逆）。于是 $A/P$ 只有 $0$ 与自身两个理想 $\\iff$ 没有理想严格夹在 $P$ 与 $A$ 之间 $\\iff$ $P$ 极大。含幺交换环是域 $\\iff$ 只有平凡理想（若 $a \\ne 0$ 不可逆，则 $(a)$ 是真理想；反之真理想里的非零元不可逆）。',
        '',
        '**(iii)** 域是整环，由 (i)(ii) 得极大 $\\implies$ 素。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.functor-preserves-iso',
      kind: 'implication',
      sources: ['def.functor'],
      target: 'prop.functor-preserves-iso',
      title: '函子保复合与单位 $\\implies$ 保同构',
      proof: [
        '由 $f f^{-1} = 1_Y$ 与函子保复合：',
        '',
        '$$F(f)\\,F(f^{-1}) = F(f f^{-1}) = F(1_Y) = 1_{F(Y)}.$$',
        '',
        '同理由 $f^{-1} f = 1_X$ 得 $F(f^{-1})\\,F(f) = 1_{F(X)}$。故 $F(f)$ 可逆且逆为 $F(f^{-1})$。$\\blacksquare$'
      ].join('\n')
    }
  ]
});
