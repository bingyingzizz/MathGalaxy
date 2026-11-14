/* ==========================================================================
   内容包 · 环、理想与模 + Freyd-Mitchell（5 条）
   --------------------------------------------------------------------------
    §5.2 用 $A\\text{-}\\mathbf{Mod}$ 讲了半天阿贝尔范畴的例子，
   但「环」「模」本身一直没有节点 —— 「用到了却没节点」。
   这一包把它补齐，并顺手把 Freyd-Mitchell 定理挂上去：
   那是「在小阿贝尔范畴里可以假装自己在做模论」的许可证。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '环、理想与模',
  nodes: [

    {
      id: 'def.ring',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '环',
      title: '环与交换环',
      regions: ['algebra'],
      tags: ['代数', '环', '交换环'],
      statement: [
        '设 $A$ 是**集合**，$+$ 与 $\\cdot$ 是 $A$ 上的两个**二元运算**。称 $(A, +, \\cdot)$ 是一个**环**，当且仅当：',
        '',
        '- $(A, +)$ 是**阿贝尔群**；',
        '- $(A, \\cdot)$ 满足**结合律**（不要求单位元，也不要求交换）；',
        '- **分配律** $a(b + c) = ab + ac$、$(a + b)c = ac + bc$ 成立。',
        '',
        '乘法还交换的环叫**交换环**；再要求有乘法单位元 $1 \\ne 0$ 的环叫**含幺环**。'
      ].join('\n'),
      notes: [
        '⭐ **又是「集合 + 运算 + 公理」**，而且这一层直接**引用**了下面的阿贝尔群：加法那一组公理不再重写，一句话带过。\n\n**与域对照**：域要求每个非零元可逆（$(F\\setminus\\{0\\}, \\cdot)$ 是阿贝尔群），环**不要求**。\n\n所以域是环中的一个特例，$\\mathbb{Z}$ 是环但不是域 —— 这正是「域」那条定义里 $\\mathbb{Z}$ 反例的来源。',
        ,
        '**各方向用到的假设**（这里是公理定义，交换与单位元是额外要求）：\n' +
        '- 环 $\\iff$ 加法阿贝尔群、乘法结合、左右分配：本节点约定的定义展开，无需选择公理，亦不要求域或 PID。\n' +
        '- 交换环 $\\implies$ 环、含幺环 $\\implies$ 环：只忘掉附加结构；逆向均非免费，$M_2(\\mathbb{R})$ 不交换，$2\\mathbb{Z}$ 按通常乘法无单位元。\n' +
        '- 加上乘法交换 $\\iff$ 交换环，加上单位元及本库的 $1\\ne0$ 要求 $\\iff$ 含幺环：仍是定义；这里的含幺环不自动要求乘法交换。\n' +
        '- 域 $\\implies$ 交换含幺环：展开域公理即可；反向还要每个非零元可逆，$\\mathbb{Z}$ 是反例。零环满足环公理，但不满足本节点含幺环的 $1\\ne0$ 约定。\n'
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. II', 'Dummit & Foote, Abstract Algebra, §7.1']
    },

    {
      id: 'def.ideal',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '理想',
      title: '理想与商环',
      regions: ['algebra'],
      tags: ['代数', '环', '理想', '商环'],
      statement: [
        '设 $A$ 是环。子集 $I \\subseteq A$ 叫**（双边）理想**，如果 $(I, +)$ 是加法子群，并且对一切 $a \\in A$、$x \\in I$ 有',
        '',
        '$$a x \\in I, \\qquad x a \\in I.$$',
        '',
        '（只要求 $a x \\in I$ 的叫**左理想**，只要求 $x a \\in I$ 的叫**右理想**；交换环里三者一致。）',
        '',
        '商环的构造（商集、运算良定义与泛性质）单独成节点，见 `def.quotient-ring`。'
      ].join('\n'),
      notes: [
        '**为什么理想这样定义。** 与正规子群一模一样的问题：想在商集上定义乘法，就要让 $(a + I)(b + I)$ 与代表元无关。算一下 $(a + x)(b + y) = ab + ay + xb + xy$ —— 后面三项都得落在 $I$ 里。$xy \\in I$ 由「$I$ 是子群」保证不了，必须**额外要求**。',
        '⭐ **对照表**：群要商出**群**，商掉的是**正规子群**；环要商出**环**，商掉的是**理想**。（$I$ 作为加法子群当然自动正规 —— 加法群是阿贝尔群 —— 所以那一边不用另加条件。）',
        '**主理想** $(a) := \\{\\, xa : x \\in A \\,\\}$（交换环里就是 $a$ 的倍数全体）。⚠️ 一般环里这个集合只是**左**理想：$A = M_2(\\mathbb{R})$、$a = E_{11}$ 时 $E_{11}E_{12} = E_{12} \\notin Aa$；一般环里 $(a)$ 的正确定义是「含 $a$ 的最小双边理想」。$A/(a)$ 是「把 $a$ 当成 $0$」造出来的环；$\\mathbb{Z}/(n) = \\mathbb{Z}/n\\mathbb{Z}$ 就是模 $n$ 同余。'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    {
      id: "def.ring-hom",
      cluster: "algebra.structures",
      type: "definition",
      label: "环同态",
      title: "环同态、核与像",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "环",
        "同态"
      ],
      statement: "设 $R, S$ 是含幺环。映射 $f : R \\to S$ 称为**环同态**，若\n$f(a+b) = f(a)+f(b), \\qquad f(ab) = f(a)f(b), \\qquad f(1_R) = 1_S$\n对一切 $a, b \\in R$ 成立。\n\n**核** $\\ker f := \\{\\, a \\in R : f(a) = 0 \\,\\}$ 是 $R$ 的**理想**；**像** $\\operatorname{im} f$ 是 $S$ 的子环。$f$ 单当且仅当 $\\ker f = 0$；双射的环同态叫**同构**。",
      notes: "⭐ 例：$\\mathbb{Z} \\to \\mathbb{Z}/n\\mathbb{Z}$、$K[x] \\to K$、$f \\mapsto f(a)$（求值）、$\\mathbb{C} \\to \\mathbb{C}$、$z \\mapsto \\bar z$（共轭，是环同构但不是 $\\mathbb{C}$-代数同态）。\n\n⚠ 有些教材不要求 $f(1_R) = 1_S$；本图采用「含幺环 + 保 $1$」的约定。若不保 $1$，核仍是理想，但「$R/\\ker f \\cong \\operatorname{im} f$」需要把像的 $1$ 对齐。\n\n⭐ 第一同构定理：$R/\\ker f \\cong \\operatorname{im} f$（商环见 `def.quotient-ring`）。",
      refs: [
        "Lang, Algebra, Ch. II",
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1"
      ]
    },
    {
      id: "def.quotient-ring",
      cluster: "algebra.structures",
      type: "definition",
      label: "商环",
      title: "商环：模掉一个理想",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "环",
        "商环",
        "理想"
      ],
      statement: "设 $A$ 是环，$I \\subseteq A$ 是理想。在加法商群 $A/I$ 上定义\n$(a+I)+(b+I) := (a+b)+I, \\qquad (a+I)(b+I) := ab+I .$\n这两个运算良定义，使 $A/I$ 成为环，称为**商环**；商映射 $\\pi : A \\to A/I$、$\\pi(a) = a+I$ 是环同态，且 $\\ker \\pi = I$。\n\n**泛性质**：若 $f : A \\to B$ 是环同态且 $f(I) = 0$，则存在唯一环同态 $\\bar f : A/I \\to B$ 使 $\\bar f \\circ \\pi = f$。",
      notes: "⭐ 为什么必须是理想：要让 $(a+x)(b+y) \\equiv ab \\pmod I$，需要 $ay, xb, xy \\in I$；$x, y \\in I$ 而 $a, b$ 任意，所以 $I$ 必须从两边吸收乘法。\n\n⭐ 例：$\\mathbb{Z}/n\\mathbb{Z}$、$K[x]/(f)$（$f$ 不可约时是域）、$\\mathbb{F}_p[x]/(x^{2}+1)$。\n\n⭐ 若 $A$ 是含幺**交换**环，则 $A/I$ 是整环当且仅当 $I$ 是素理想；$A/I$ 是域当且仅当 $I$ 是极大理想（两个对象见后续节点，本包先给商环的构造）。交换性不能省：$M_2(\\mathbb{R})$ 的零理想 $(0)$ 是极大双边理想，但 $M_2(\\mathbb{R})/(0)\\cong M_2(\\mathbb{R})$ 既不是整环也不是域。",
      refs: [
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1",
        "Lang, Algebra, Ch. II"
      ]
    },
    {
      id: "def.prime-ideal",
      cluster: "algebra.structures",
      type: "definition",
      label: "素理想",
      title: "素理想：商环是整环",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "环",
        "理想",
        "素理想"
      ],
      statement: "设 $A$ 是含幺交换环，$P \\subset A$ 是真理想。称 $P$ 是**素理想**，若\n$a b \\in P \\implies a \\in P \\ \\text{or}\\ b \\in P \\qquad (a, b \\in A).$\n等价地，商环 $A/P$ 是**整环**（见 `def.quotient-ring`）。",
      notes: "⭐ 例：$\\mathbb{Z}$ 中 $(p)$（$p$ 素数）与 $(0)$ 都是素理想；$K[x]$ 中 $(f)$ 素 $\\iff$ $f$ 不可约，$(0)$ 也素。\n\n⚠ 素理想不必极大：$\\mathbb{Z}[x]$ 中 $(x)$ 素（$\\mathbb{Z}[x]/(x) \\cong \\mathbb{Z}$ 是整环）但不极大。\n\n⭐ 素理想是「整除」的抽象：$a \\in (p) \\iff p \\mid a$；$ab \\in (p) \\implies p \\mid ab \\implies p \\mid a$ 或 $p \\mid b$ 正是 Euclid 引理。",
      refs: [
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1",
        "Lang, Algebra, Ch. II"
      ]
    },
    {
      id: "def.maximal-ideal",
      cluster: "algebra.structures",
      type: "definition",
      label: "极大理想",
      title: "极大理想：商环是域",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "环",
        "理想",
        "极大理想"
      ],
      statement: "设 $A$ 是含幺交换环，$M \\subset A$ 是真理想。称 $M$ 是**极大理想**，若不存在理想 $J$ 使\n$M \\subset J \\subset A.$\n等价地，商环 $A/M$ 是**域**（见 `def.quotient-ring`）。每个真理想都含于某个极大理想（用 Zorn 引理）。",
      notes: "⭐ 极大 $\\implies$ 素：域一定是整环，故 $A/M$ 是整环。反之不然：$\\mathbb{Z}[x]$ 中 $(x)$ 素但不极大（$(x) \\subset (2, x)$）。\n\n⭐ 在 PID 中，非零素理想都极大：$K[x]$ 中 $(f)$ 极大 $\\iff$ $f$ 不可约。\n\n⭐ 例：$\\mathbb{Z}$ 中 $(p)$ 极大；$K[x_1,\\ldots,x_n]$ 中 $(x_1,\\ldots,x_n)$ 极大。",
      refs: [
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1",
        "Lang, Algebra, Ch. II"
      ]
    },
    {
      id: "def.principal-ideal",
      cluster: "algebra.structures",
      type: "definition",
      label: "主理想",
      title: "主理想：由一个元素生成",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "环",
        "理想",
        "主理想"
      ],
      statement: "设 $A$ 是含幺交换环，$a \\in A$。集合\n$(a) := aA := \\{\\, a x : x \\in A \\,\\}$\n是 $A$ 的理想，称为由 $a$ 生成的**主理想**。若理想 $I$ 对某个 $a$ 有 $I = (a)$，称 $I$ 是**主理想**。\n\n若环 $A$ 的每个理想都是主理想，称 $A$ 是**主理想整环**（PID，另见 `def.pid`）。",
      notes: "⭐ 例：$\\mathbb{Z}$ 的每个理想都是 $(n)$，故 $\\mathbb{Z}$ 是 PID；域 $K$ 上 $K[x]$ 也是 PID。\n\n⚠ 一般环里「$a$ 的倍数」未必是双边理想：$M_2(\\mathbb{R})$ 中 $E_{11} M_2$ 不是双边理想；非交换环要取「含 $a$ 的最小双边理想」。\n\n⚠ $K[x,y]$ 中 $(x, y)$ 不是主理想：它不能由单个多项式生成。",
      refs: [
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1",
        "Lang, Algebra, Ch. II"
      ]
    },
    {
      id: "def.field-of-fractions",
      cluster: "algebra.structures",
      type: "definition",
      label: "分式域",
      title: "分式域：整环的形式商",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "环",
        "域",
        "分式域"
      ],
      statement: "设 $A$ 是整环。在集合 $A \\times (A \\setminus \\{0\\})$ 上定义\n$(a, s) \\sim (b, t) \\iff a t = b s .$\n这是等价关系；商集记 $\\operatorname{Frac}(A)$，元素写成 $\\frac{a}{s}$，按\n$\\frac{a}{s} + \\frac{b}{t} := \\frac{a t + b s}{s t}, \\qquad \\frac{a}{s} \\cdot \\frac{b}{t} := \\frac{a b}{s t}$\n构成**域**，叫 $A$ 的**分式域**。映射 $a \\mapsto \\frac{a}{1}$ 是单环同态。\n\n**泛性质**：若 $K$ 是域且 $\\varphi : A \\to K$ 是单环同态，则存在唯一域同态 $\\bar\\varphi : \\operatorname{Frac}(A) \\to K$ 使 $\\bar\\varphi(a/1) = \\varphi(a)$。",
      notes: "⭐ 例：$\\operatorname{Frac}(\\mathbb{Z}) = \\mathbb{Q}$；$\\operatorname{Frac}(K[x]) = K(x)$（有理函数域）。\n\n⚠ 必须是**整环**：有零因子时 $\\frac{a}{s}$ 的等价类会退化（$s$ 可能变成零因子），构造失败。\n\n⭐ 分式域是「包含 $A$ 的最小域」，泛性质说的正是这件事。",
      refs: [
        "Lang, Algebra, Ch. II",
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 1"
      ]
    },
    {
      id: 'def.module',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '模',
      title: '模与模同态',
      regions: ['algebra'],
      tags: ['代数', '模', '环', '同态'],
      statement: [
        '设 $A$ 是含幺环、$M$ 是**阿贝尔群**。称 $M$ 是一个 **$A$-模**，如果给定了一个映射',
        '',
        '$$A \\times M \\longrightarrow M, \\qquad (a, m) \\longmapsto a \\cdot m,$$',
        '',
        '满足 $a(bm) = (ab)m$、$(a + b)m = am + bm$、$a(m + n) = am + an$、$1 \\cdot m = m$。',
        '',
        '保持这个作用的加法群同态叫 **$A$-模同态**：$f(am) = a f(m)$。全体 $A$-模与模同态构成范畴 $A\\text{-}\\mathbf{Mod}$。'
      ].join('\n'),
      notes: [
        '⭐ **模 = 阿贝尔群 + 环作用**，所以它同时是「群」和「环」两边的孩子：$\\mathbb{Z}$-模**就是**阿贝尔群（$n \\cdot m$ 只能有一种定义）；域上的模**就是**向量空间。这两句话把「模」放在已知例子的中点。',
        '**$A\\text{-}\\mathbf{Mod}$ 为什么是同调代数的样板间**：它同时是',
        '',
        [
          '- **阿贝尔范畴**（有核、余核，单满态射全部严格）；',
          '- **具有足够多内射对象**（每个模都嵌进内射模）；',
          '- **具有足够多投射对象**（自由模都是投射的）；',
          '- **Grothendieck 范畴**（有生成元 $A$ 自己，滤过余极限正合）。',
        ].join('\n'),
        '',
        '所以「在 $A\\text{-}\\mathbf{Mod}$ 里能做的」，就是同调代数想推广到一般范畴的东西。**其余范畴能做的事情，都以它为标尺。**'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    {
      id: 'thm.freyd-mitchell',
      cluster: 'hom.ab',
      type: 'theorem',
      label: 'Freyd–Mitchell 嵌入定理',
      title: 'Freyd–Mitchell 嵌入定理',
      regions: ['homology'],
      tags: ['同调代数', '阿贝尔范畴', '嵌入', 'Freyd', 'Mitchell'],
      statement: [
        '若 $\\mathcal{C}$ 是**小**阿贝尔范畴，则存在一个环 $A$ 与一个**全忠实**的**正合**函子',
        '',
        '$$\\mathcal{C} \\longrightarrow A\\text{-}\\mathbf{Mod}.$$'
      ].join('\n'),
      notes: [
        '⭐ **它的意义是：追元素这件事为什么是合法的。** 小阿贝尔范畴里的命题，都可以先沿一个全忠实正合函子嵌进 $A\\text{-}\\mathbf{Mod}$，在那边（元素有意义的地方）证完再搬回来。「在一个具体的范畴里追元素」因此是一种合法的推广手段。',
        '⚠️ 但它**不是**证蛇引理、五引理的常规手段 —— 那是大定理，标准证明本身就要在阿贝尔范畴里先搭一套正合性工具，拿它去证那两条是杀鸡用牛刀。那两条有初等的泛性质 / 泛元证明（见各自节点）。',
        '**为什么要求小**：证明要把 $\\mathcal{C}$ 里的对象**做成**模，用的正是「全体 $\\hom$ 集合」的余极限构造；范畴不小的话这些「集合」根本不存在，做不成模。',
        '⚠️ **对偶版本**：同样的论证给一个嵌进 $\\mathbf{Mod}\\text{-}A$（右模）的版本；$A$ 不唯一，构造依赖选定的生成元。',
        '**与 Giraud 定理对照**：Giraud 是把**拓扑斯**说成「预层范畴的正合反射子范畴」，Freyd–Mitchell 是把**小阿贝尔范畴**说成「模范畴的全忠实正合子范畴」—— 两条定理是同一个思路（「找一个具体的大范畴把自己装进去」）在不同结构上的版本。'
      ].join('\n\n'),
      refs: ['Freyd, Abelian Categories (1964)', 'Mitchell, The full imbedding theorem (1964)']
    },

    /* -------------------------------------------------------- 模范畴 */
    {
      id: "def.submodule",
      cluster: "algebra.structures",
      type: "definition",
      label: "子模",
      title: "子模：对环作用封闭的加法子群",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "模",
        "子模"
      ],
      statement: "设 $A$ 是含幺环，$M$ 是 $A$-模。加法子群 $N \\subseteq M$ 若满足\n$a \\cdot n \\in N \\qquad \\text{for all } a \\in A,\\ n \\in N,$\n则称 $N$ 是 $M$ 的 **$A$-子模**。等价地，$N$ 在限制作用下本身是 $A$-模，且包含映射 $N \\hookrightarrow M$ 是模同态。\n\n模同态的核与像都是子模；$A$ 的左理想正是左 $A$-模 $A$ 的子模。",
      notes: "⭐ 三层对照：子群（群）$\\subset$ 子模（模）$\\subset$ 子空间（域上的模）。子模要求对**环作用**封闭，比「加法子群」多一条。\n\n⭐ 例：$A = \\mathbb{Z}$ 时子模就是子群 $n\\mathbb{Z}$；$A = K[x]$ 时子模是 $K[x]$-子空间。\n\n⭐ 子模格：任意交仍是子模，但并一般不是；由 $S$ 生成的子模是含 $S$ 的最小子模。商模按 $M/N$ 构造（见 `def.quotient-module`，后续节点）。",
      refs: [
        "Lang, Algebra, Ch. III",
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 2"
      ]
    },
    {
      id: "def.module-hom",
      cluster: "algebra.structures",
      type: "definition",
      label: "模同态",
      title: "模同态：保持加法与环作用",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "模",
        "同态"
      ],
      statement: "设 $A$ 是含幺环，$M, N$ 是 $A$-模。映射 $f : M \\to N$ 称为 **$A$-模同态**，若\n$f(m + m') = f(m) + f(m'), \\qquad f(a m) = a f(m)$\n对一切 $m, m' \\in M$、$a \\in A$ 成立。\n\n全体 $A$-模同态记 $\\operatorname{Hom}_A(M, N)$，在逐点加法下是阿贝尔群。核 $\\ker f$ 与像 $\\operatorname{im} f$ 都是子模；$f$ 是同构 $\\iff$ 双射。",
      notes: "⭐ 例：$A = \\mathbb{Z}$ 时模同态就是阿贝尔群同态；$A = K$ 时就是线性映射。\n\n⚠ $\\operatorname{Hom}_A(M, N)$ 一般只是阿贝尔群，不是 $A$-模；只有 $A$ 交换时才有自然的 $A$-模结构。\n\n⭐ 第一同构定理：$M/\\ker f \\cong \\operatorname{im} f$（商模见 `def.quotient-module`）。",
      refs: [
        "Lang, Algebra, Ch. III",
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 2"
      ]
    },
    {
      id: "def.quotient-module",
      cluster: "algebra.structures",
      type: "definition",
      label: "商模",
      title: "商模：模掉一个子模",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "模",
        "商模",
        "子模"
      ],
      statement: "设 $A$ 是含幺环，$M$ 是 $A$-模，$N \\subseteq M$ 是子模。在加法商群 $M/N$ 上定义\n$(m + N) + (m' + N) := (m + m') + N, \\qquad a(m + N) := a m + N .$\n这两个运算良定义，使 $M/N$ 成为 $A$-模，叫**商模**；商映射 $\\pi : M \\to M/N$ 是模同态，$\\ker \\pi = N$。\n\n**泛性质**：若 $f : M \\to L$ 是模同态且 $f(N) = 0$，则存在唯一模同态 $\\bar f : M/N \\to L$ 使 $\\bar f \\circ \\pi = f$。",
      notes: "⭐ 为什么必须是子模：要让 $a(m + n) \\equiv a m \\pmod N$，需要 $a n \\in N$ 对一切 $a \\in A$、$n \\in N$。\n\n⭐ 例：$\\mathbb{Z}$-模 $\\mathbb{Z}/n\\mathbb{Z}$；向量空间 $V/W$；$A/I$ 作为 $A$-模就是商模。\n\n⭐ 第一同构：$M/\\ker f \\cong \\operatorname{im} f$，见 `def.module-hom`。",
      refs: [
        "Lang, Algebra, Ch. III",
        "Atiyah–Macdonald, Introduction to Commutative Algebra, Ch. 2"
      ]
    },
    {
      id: 'def.module-category',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '模范畴',
      title: '模范畴 $A\\text{-}\\mathbf{Mod}$',
      regions: ['algebra', 'homology'],
      tags: ['模', '范畴', '阿贝尔范畴', '同调代数'],
      statement: [
        '设 $A$ 是含幺环。**左 $A$-模范畴** $A\\text{-}\\mathbf{Mod}$ 的对象是左 $A$-模，态射是 $A$-线性映射，复合与单位逐点定义。',
        '',
        '右 $A$-模构成 $\\mathbf{Mod}\\text{-}A$；$A$ 交换时两者等价。'
      ].join('\n'),
      notes: [
        '**同调代数的样板间**：$A\\text{-}\\mathbf{Mod}$ 是阿贝尔范畴，有核、余核、单满态射严格；自由模给出足够投射对象，Baer 判据给出足够内射对象，还是 Grothendieck 范畴。',
        '**特例**：$\\mathbb Z\\text{-}\\mathbf{Mod}\\simeq\\mathbf{Ab}$；$k$ 是域时 $k\\text{-}\\mathbf{Mod}$ 就是 $\\mathbf{Vect}_k$。',
        '**Freyd–Mitchell**：小阿贝尔范畴可全忠实、正合地嵌入某个 $A\\text{-}\\mathbf{Mod}$，所以「在模范畴里追元素」是合法的推广。'
      ].join('\n\n'),
      refs: ['Lang, Algebra', 'Weibel, An Introduction to Homological Algebra, Ch. 1']
    }
  ],

  edges: [

    {
      id: 'def-link.category-module-category',
      kind: 'definition',
      definition: 'def.category',
      usedBy: 'def.module-category',
      note: '模范畴是「对象为模、态射为模同态」的范畴，是 def.category 在代数里的标准例子。'
    },
    {
      id: 'def-link.module-module-category',
      kind: 'definition',
      definition: 'def.module',
      usedBy: 'def.module-category',
      note: '模范畴的对象类正是全体左 A-模。'
    },
    {
      id: 'analogy.module-category-abelian',
      kind: 'analogy',
      a: 'def.module-category',
      b: 'def.category-of-abelian-groups',
      note: 'Z-Mod 与 Ab 等价：整系数模就是阿贝尔群，这是模范畴与阿贝尔群范畴的共同特例。'
    },
    {
      id: "dep.ringhom-ring",
      kind: "definition",
      definition: "def.ring",
      usedBy: "def.ring-hom",
      note: "环同态是含幺环之间的映射。"
    },
    {
      id: "dep.ringhom-ideal",
      kind: "implication",
      sources: ["def.ring-hom"],
      target: "def.ideal",
      title: "环同态的核是理想",
      proof: "设 $\\varphi : A \\to B$ 是环同态。$\\varphi(0)=0$ 故 $0\\in \\ker\\varphi$。若 $x, y \\in \\ker\\varphi$，则 $\\varphi(x-y) = \\varphi(x) - \\varphi(y) = 0$；若 $a \\in A$，则 $\\varphi(ax) = \\varphi(a)\\varphi(x) = 0$、$\\varphi(xa) = \\varphi(x)\\varphi(a) = 0$。故 $\\ker\\varphi$ 对减法与双边乘法封闭，即 $A$ 的理想。∎",
      note: "这是判定（核落在理想里），不是定义依赖：环同态的定义不要求先有理想。"
    },
    {
      id: "dep.ringhom-propideal",
      kind: "definition",
      definition: "def.ring-hom",
      usedBy: "prop.ideal-basic",
      note: "该命题用环同态的核与像表述。"
    },
    {
      id: "dep.quotient-ideal",
      kind: "definition",
      definition: "def.ideal",
      usedBy: "def.quotient-ring",
      note: "商环模掉的是理想。"
    },
    {
      id: "dep.quotient-ring",
      kind: "definition",
      definition: "def.ring",
      usedBy: "def.quotient-ring",
      note: "商环的加法与乘法来自原环。"
    },
    {
      id: "dep.quotient-poly",
      kind: "definition",
      definition: "def.polynomial-ring",
      usedBy: "def.quotient-ring",
      note: "$K[x]/(f)$ 是商环的标准例子。"
    },
    {
      id: "dep.quotient-propideal",
      kind: "definition",
      definition: "def.quotient-ring",
      usedBy: "prop.ideal-basic",
      note: "该命题讨论商环中的理想对应。"
    },
    {
      id: "dep.quotient-prime",
      kind: "definition",
      definition: "def.quotient-ring",
      usedBy: "prop.prime-ideal",
      note: "素理想与极大理想通过商环刻画。"
    },
    {
      id: "dep.submodule-module",
      kind: "definition",
      definition: "def.module",
      usedBy: "def.submodule",
      note: "子模是模的加法子群并封闭于环作用。"
    },
    {
      id: "dep.submodule-injective",
      kind: "definition",
      definition: "def.submodule",
      usedBy: "def.injective-module",
      note: "内射模用子模的扩张性质定义。"
    },
    {
      id: "dep.module-hom",
      kind: "definition",
      definition: "def.module",
      usedBy: "def.module-hom",
      note: "模同态保持模的加法与环作用。"
    },
    {
      id: "dep.modulehom-submodule",
      kind: "implication",
      sources: ["def.module-hom"],
      target: "def.submodule",
      title: "模同态的核与像是子模",
      proof: "设 $f : M \\to N$ 是 $R$-模同态。$f(0)=0$ 故 $0\\in \\ker f$；若 $x, y \\in \\ker f$、$r \\in R$，则 $f(x-y)=0$、$f(rx) = r f(x) = 0$，故 $\\ker f \\le M$ 是子模。同理 $x, y$ 在像里时 $f(x-y) = f(x)-f(y)$ 仍在像里、$r f(x) = f(rx)$ 仍在像里，且 $0 = f(0)$ 在像里，故 $\\operatorname{im} f \\le N$ 是子模。∎",
      note: "这是判定（核与像落在子模里），不是定义依赖：模同态的定义不要求先有子模。"
    },
    {
      id: "dep.quotient-module",
      kind: "definition",
      definition: "def.module",
      usedBy: "def.quotient-module",
      note: "商模是模对子模的商。"
    },
    {
      id: "dep.quotient-submodule",
      kind: "definition",
      definition: "def.submodule",
      usedBy: "def.quotient-module",
      note: "商模商掉的必须是子模。"
    },
    {
      id: "dep.quotient-map",
      kind: "definition",
      definition: "def.module-hom",
      usedBy: "def.quotient-module",
      note: "商映射是模同态，商模满足同态的泛性质。"
    },
    {
      id: "dep.prime-ideal",
      kind: "definition",
      definition: "def.ideal",
      usedBy: "def.prime-ideal",
      note: "素理想是环的理想，附加 $ab \\in P \\implies a \\in P$ 或 $b \\in P$。"
    },
    {
      id: "dep.prime-quotient",
      kind: "definition",
      definition: "def.quotient-ring",
      usedBy: "def.prime-ideal",
      note: "素性等价于商环 $A/P$ 是整环。"
    },
    {
      id: "dep.maximal-ideal",
      kind: "definition",
      definition: "def.ideal",
      usedBy: "def.maximal-ideal",
      note: "极大理想是理想，附加极大性。"
    },
    {
      id: "dep.maximal-quotient",
      kind: "definition",
      definition: "def.quotient-ring",
      usedBy: "def.maximal-ideal",
      note: "极大性等价于商环 $A/M$ 是域。"
    },
    {
      id: "dep.prop-prime",
      kind: "definition",
      definition: "def.prime-ideal",
      usedBy: "prop.prime-ideal",
      note: "命题给出素理想的商环刻画。"
    },
    {
      id: "dep.prop-maximal",
      kind: "definition",
      definition: "def.maximal-ideal",
      usedBy: "prop.prime-ideal",
      note: "命题给出极大理想的商环刻画。"
    },
    {
      id: "imp.maximal-prime",
      kind: "implication",
      sources: [
        "def.maximal-ideal"
      ],
      target: "def.prime-ideal",
      title: "极大理想是素理想",
      proof: "设 $M$ 是极大理想，则 $A/M$ 是域（极大性的商环刻画）。域一定是整环，故 $A/M$ 是整环；由素理想的商环刻画，$M$ 是素理想。$\\blacksquare$",
      note: "这是真蕴含；因 $M$ 更特殊、层号不低于素理想，按层向规则标 `layer:false`。"
    },
    {
      id: "dep.principal-ideal",
      kind: "definition",
      definition: "def.ideal",
      usedBy: "def.principal-ideal",
      note: "主理想是理想的特例：由单个元素生成。"
    },
    {
      id: "dep.fractions-ring",
      kind: "definition",
      definition: "def.ring",
      usedBy: "def.field-of-fractions",
      note: "分式域从整环（含幺交换环）构造。"
    },
    {
      id: "dep.fractions-field",
      kind: "definition",
      definition: "def.field",
      usedBy: "def.field-of-fractions",
      note: "分式域的构造以域为目标范畴。"
    },
    {
      id: "dep.submodule-kernelimage",
      kind: 'definition',
      definition: "def.kernel-image-vs",
      usedBy: "def.submodule",
      note: "子模的例子是同态的核与像。"
    },
    {
      id: "dep.fractions-ringhom",
      kind: 'definition',
      definition: "def.ring-hom",
      usedBy: "def.field-of-fractions",
      note: "分式域的泛性质用环同态陈述。"
    },
    {
      id: "dep.modcat-linearmap",
      kind: 'definition',
      definition: "def.linear-map",
      usedBy: "def.module-category",
      note: "模范畴的态射是线性映射。"
    },
    {
      id: "dep.quotient-ringhom",
      kind: 'definition',
      definition: "def.ring-hom",
      usedBy: "def.quotient-ring",
      note: "商环的商映射与泛性质都用环同态陈述。"
    }
  ]
});
