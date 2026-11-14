/* ==========================================================================
   内容包 · 群与第一同构定理（6 条）
   --------------------------------------------------------------------------
   这一批补的是代数的最底层：从「集合 + 运算 + 公理」造出**群**，
   再由正规子群造出**商群**，最后给出第一同构定理
   $G/\\ker\\varphi \\cong \\operatorname{im}\\varphi$。

   它是「商集与等价类」那条在代数里的第一击：
   商集把「同一个值」的点粘起来，群结构让粘完的东西还是群。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '群与第一同构定理',
  nodes: [

    /* ------------------------------------------------------------ 群 */
    {
      id: 'def.group',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '群',
      title: '群与阿贝尔群',
      regions: ['algebra'],
      tags: ['代数', '群', '阿贝尔群', '运算'],
      statement: [
        '设 $G$ 是**集合**，$\\cdot$ 是 $G$ 上的**二元运算**（即函数 $G \\times G \\to G$，$(a, b) \\mapsto a \\cdot b$）。称 $(G, \\cdot)$ 是一个**群**，当且仅当：',
        '',
        [
          '- **结合律**：$(a b) c = a (b c)$ 对一切 $a, b, c \\in G$ 成立；',
          '- **单位元**：存在 $e \\in G$ 使 $e a = a e = a$ 对一切 $a$ 成立；',
          '- **逆元**：对每个 $a \\in G$ 存在 $a^{-1} \\in G$ 使 $a a^{-1} = a^{-1} a = e$。'
        ].join('\n'),
        '',
        '再满足**交换律** $a b = b a$ 的群叫**阿贝尔群**（Abelian group），也叫**交换群**。'
      ].join('\n'),
      notes: [
        '⭐ **格式还是「集合 + 运算 + 公理」**：群不是凭空的对象 —— 一个集合、一个函数、三条等式就定出了一个群。判别一个东西是不是群，就是逐条核对这些等式。',
        '**单位元与逆元是唯一的**：若 $e, e\'$ 都是单位元，则 $e = e e\' = e\'$；若 $a^{-1}, a\'$ 都是 $a$ 的逆，则 $a\' = a\' e = a\' a a^{-1} = e a^{-1} = a^{-1}$。所以「$e$」与「$a^{-1}$」这两个记号合法。',
        '**例子与反例**：$(\\mathbb{Z}, +)$ 是阿贝尔群；$(\\mathbb{Q} \\setminus \\{0\\}, \\cdot)$ 是阿贝尔群；$(\\mathbb{Z}, \\cdot)$ **不是**群（只有 $\\pm 1$ 有乘法逆元）；\n\n$n \\times n$ 可逆矩阵在乘法下是群但**不阿贝尔**（$n \\ge 2$）。',
        '📌 还有一层更弱的：只要求结合律与单位元、不要求逆元，叫**幺半群**。（$\\mathbb{N}$ 在加法下就是幺半群不是群。）',
        ,
        '**各方向用到的假设**（群是公理定义，较短判据须保留环境条件）：\n' +
        '- 群 $\\iff$ 结合律、双侧单位元及双侧逆元：定义展开，不含交换律要求。\n' +
        '- 群 $\\implies$ 单位元与逆元唯一：用结合律和两侧单位、逆元等式作消去，无需选择公理来同时选逆元，因为逆元已经唯一。\n' +
        '- 幺半群中每个元素可逆 $\\implies$ 群：直接展开；只有消去律不够，非负整数加法有消去律但正元素无逆元。\n' +
        '- 有限且非空的消去半群 $\\implies$ 群：左右乘法单射由有限性变成满射，进而构造共同单位及逆元；无限情形的上述反例说明不能省有限性。\n'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    {
      id: 'def.group-power',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '群的整数幂',
      title: '群的整数幂 $x^{n}$（$n \\in \\mathbb{Z}$）',
      regions: ['algebra'],
      tags: ['定义', '群', '幂', '逆元'],
      statement: [
        '设 $G$ 是群，$x \\in G$，$e$ 是单位元。**整数幂** $x^{n}$（$n \\in \\mathbb{Z}$）由',
        '',
        '$$x^{0} := e, \\qquad x^{n+1} := x^{n} x \\ (n \\ge 0), \\qquad x^{-n} := (x^{-1})^{n} \\ (n \\ge 1)$$',
        '',
        '定义；等价地 $x^{-n} = (x^{n})^{-1}$。'
      ].join('\n'),
      notes: [
        '**基本律。** 对 $m, n \\in \\mathbb{Z}$ 有 $x^{m+n} = x^{m} x^{n}$、$(x^{m})^{n} = x^{mn}$、$x^{-n} = (x^{n})^{-1}$。前两条对 $n \\ge 0$ 归纳，负指数用逆元化归；第三条由 $x^{n} x^{-n} = e$ 与逆元唯一性得到。',
        '**与环的整数幂分开。** 含幺环上的整数幂（见实分析一团的「整数幂」）以环的乘法单位元 $1$ 为 $a^{0}$，且 $a^{-n}$ 只在 $a$ 可逆时才有定义；本条只要求群结构，$e$ 是群单位元。两者记号相同、载体不同 —— 引用时按语境取，不要互相代入。',
        '⭐ **元素的阶**：若存在 $n \\ge 1$ 使 $x^{n} = e$，最小的这样的 $n$ 叫 $x$ 的阶；这正是「幂回到单位元」的步长。全体整数幂 $\\{x^{n} : n \\in \\mathbb{Z}\\}$ 构成 $G$ 的循环子群 $\\langle x \\rangle$。',
        '⚠ 非交换群里 $(xy)^{n} \\ne x^{n} y^{n}$（$n \\ge 2$）；只有 $x, y$ 交换时才成立。而 $x^{m} x^{n} = x^{m+n}$ 对**同一个** $x$ 总成立，这由结合律保证。'
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. I §2', 'Hungerford, Algebra, Ch. I §4']
    },

    /* ---------------------------------------------------------- 子群 */
    {
      id: "def.p-group",
      cluster: "algebra.structures",
      type: "definition",
      label: "p-群",
      title: "p-群与 p-子群",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "群",
        "p-群",
        "Sylow"
      ],
      statement: "设 $p$ 是素数，$G$ 是有限群。若 $|G| = p^{n}$（$n \\ge 0$），称 $G$ 是 **$p$-群**。\n等价地，$G$ 的每个元素的阶都是 $p$ 的幂：元素的阶整除 $|G|$，故只能是 $p$ 的幂；反之若每个元素的阶都是 $p$ 的幂，由 Cauchy 定理 $|G|$ 没有其他素因子，故 $|G|$ 是 $p$ 的幂。\n\n子群 $H \\le G$ 若本身是 $p$-群，称 **$p$-子群**；$G$ 的极大 $p$-子群（按包含关系）叫 **Sylow $p$-子群**，见 `def.sylow-subgroup`。",
      notes: "⭐ 例：$\\mathbb{Z}/p^{n}$、$V_4 = \\mathbb{Z}/2 \\times \\mathbb{Z}/2$、$p$-群的中心非平凡（类方程的直接推论）。\n\n⚠ $p$-群不必阿贝尔：$D_8$（$8$ 阶二面体群）是 $2$-群但不交换。\n\n⭐ $p$-群可解，而且是幂零群：它的下中心列每一步都真增长，有限步到 $G$（因为中心非平凡，对 $G/Z$ 归纳）。",
      refs: [
        "Lang, Algebra, Ch. I §6",
        "Dummit–Foote, Abstract Algebra, §4.3"
      ]
    },
    {
      id: 'def.subgroup',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '子群',
      title: '子群',
      regions: ['algebra'],
      tags: ['代数', '群', '子群'],
      statement: [
        '设 $(G, \\cdot)$ 是群，$H \\subseteq G$。称 $H$ 是 $G$ 的**子群**（记 $H \\le G$），如果 $H$ 在**限制过来的运算**下自己构成一个群 —— 也就是：',
        '',
        [
          '- $e \\in H$；',
          '- $a, b \\in H \\implies ab \\in H$（对运算封闭）；',
          '- $a \\in H \\implies a^{-1} \\in H$（对逆封闭）。'
        ].join('\n'),
        '',
        '（结合律是从 $G$ 里继承的，不必重查。）'
      ].join('\n'),
      notes: '两条合起来可写成一条：$H \\ne \\emptyset$ 且 $a, b \\in H \\implies a b^{-1} \\in H$（缺了 $H \\ne \\emptyset$ 会空真：$H = \\emptyset \\subseteq G$ 满足全称条件，却不是子群）。\n\n任意多个子群的交仍是子群；但**并**一般不是 —— 这也是「由 $S$ 生成的子群 $\\langle S \\rangle$」要定义成「含 $S$ 的一切子群的交」的原因。',
      refs: ['Lang, Algebra']
    },

    /* ------------------------------------------------------ 正规子群 */
    {
      id: 'def.normal-subgroup',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '正规子群',
      title: '正规子群与陪集',
      regions: ['algebra'],
      tags: ['代数', '群', '正规子群', '陪集'],
      statement: [
        '设 $H \\le G$，$g \\in G$。**左陪集**与**右陪集**分别是',
        '',
        '$$gH := \\{\\, gh : h \\in H \\,\\}, \\qquad Hg := \\{\\, hg : h \\in H \\,\\}.$$',
        '',
        '称 $H$ 是 $G$ 的**正规子群**（记 $H \\trianglelefteq G$），如果对一切 $g \\in G$ 有 $gH = Hg$，等价地 $gHg^{-1} = H$。'
      ].join('\n'),
      notes: [
        '⭐ **为什么要正规。** 陪集 $gH$ 是**集合**，想用「$gH \\cdot g\'H := gg\'H$」把商集变成群，就必须让这个定义**与代表元的选取无关**。算一下差在哪儿：',
        '',
        '$$(g h)(g\' h\') = g g\' \\cdot \\bigl((g\')^{-1} h g\'\\bigr) h\',$$',
        '',
        '最右边那个括号里的 $(g\')^{-1} h g\'$ 得还在 $H$ 里才行 —— 「$H$ 对共轭封闭」正是正规性。**阿贝尔群里每个子群都正规**（共轭不动），所以在阿贝尔群里这一步永远不碍事。',
        '**陪集是一条等价关系。** 定义 $a \\sim b \\iff a^{-1} b \\in H$，则等价类恰好是左陪集，全体左陪集划分 $G$ —— 这就是下面商群要用的商集。',
        '**记号**：$H \\le G$ 表示子群，$H \\trianglelefteq G$ 表示正规子群（$\\trianglelefteq$ 读作「正规于」）。'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    /* -------------------------------------------------------- 商群 */
    {
      id: 'def.quotient-group',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '商群',
      title: '商群',
      regions: ['algebra'],
      tags: ['代数', '群', '商群', '商集'],
      statement: [
        '设 $N \\trianglelefteq G$。全体左陪集 $\\{\\, gN : g \\in G \\,\\}$ 记作 $G/N$，在上面定义',
        '',
        '$$(g N) \\cdot (g\' N) := (g g\') N.$$',
        '',
        '正规性保证这个定义与代表元的选取无关，于是 $G/N$ 成为一个群，叫**商群**。',
        '',
        '自然映射 $\\pi : G \\to G/N$，$g \\mapsto gN$，是满同态。'
      ].join('\n'),
      notes: [
        '商群就是**集合层面的商集**再往上一层：先在 $G$ 上用等价关系「差一个 $N$ 的元素」商掉，再验证商集上还残留着一个运算。',
        '**泛性质**（商群真正的用处）：对任何群同态 $\\varphi : G \\to G\'$，若 $N \\subseteq \\ker\\varphi$，则 $\\varphi$ 唯一地穿过 $\\pi$：存在唯一的 $\\overline{\\varphi} : G/N \\to G\'$ 使 $\\overline{\\varphi} \\circ \\pi = \\varphi$。',
        '⚠️ 商**群**只对正规子群有；商**集** $G/H$ 对任何子群都有（左陪集照样划分 $G$），但那个商集上一般没有群结构。'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    /* -------------------------------------------------------- 同态 */
    {
      id: "def.commutator-subgroup",
      cluster: "algebra.structures",
      type: "definition",
      label: "换位子群",
      title: "换位子与换位子群（导群）",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "群",
        "换位子",
        "导群"
      ],
      statement: "设 $G$ 是群。对 $x, y \\in G$，元素\n$[x, y] := x y x^{-1} y^{-1}$\n叫 $x$ 与 $y$ 的**交换子**。由全体交换子生成的子群\n$[G, G] := \\langle\\, [x, y] : x, y \\in G \\,\\rangle \\le G$\n叫 $G$ 的**换位子群**（也叫**导群**）。\n\n**[G,G] 正规**，且商 $G/[G,G]$ 阿贝尔。更强地，若 $N \\trianglelefteq G$ 使 $G/N$ 阿贝尔，则 $[G,G] \\subseteq N$；所以 $G/[G,G]$ 是 $G$ 的**极大阿贝尔商**。",
      notes: "⭐ 交换子本身不满足结合律，$[[x,y],z] \\ne [x,[y,z]]$ 一般；生成的子群才是有用的对象。\n\n⭐ 例：$[S_n, S_n] = A_n$；$[G, G] = \\{e\\}$ 当且仅当 $G$ 阿贝尔。\n\n⭐ 与可解性的关系：令 $G^{(0)} = G$、$G^{(i+1)} = [G^{(i)}, G^{(i)}]$（**导列**）。$G$ 可解当且仅当某个 $G^{(i)} = \\{e\\}$。\n\n⚠ 与**下中心列** $\\gamma_{i+1} = [G, \\gamma_i]$ 不同：导列要求每步把自己换位，下中心列只与 $G$ 换位；下中心列终止给出幂零群，比可解强。",
      refs: [
        "Lang, Algebra, Ch. I §5",
        "Dummit–Foote, Abstract Algebra, §5.4"
      ]
    },
    {
      id: "def.nilpotent-group",
      cluster: "algebra.structures",
      type: "definition",
      label: "幂零群",
      title: "幂零群：下中心列终止",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "群",
        "幂零群",
        "下中心列"
      ],
      statement: "设 $G$ 是群。归纳定义**下中心列**\n$\\gamma_0 = G, \\qquad \\gamma_{i+1} = [G, \\gamma_i] = \\langle\\, [g, x] : g \\in G,\\ x \\in \\gamma_i \\,\\rangle .$\n若存在 $c \\ge 0$ 使 $\\gamma_c = \\{e\\}$，称 $G$ 是**幂零群**；最小的这样的 $c$ 叫 $G$ 的**幂零类**。\n\n等价地，**上中心列** $Z_0 = \\{e\\}$、$Z_{i+1}/Z_i := Z(G/Z_i)$ 在有限步到达 $G$。",
      notes: "⭐ 例：非平凡阿贝尔群幂零类 $1$（$\\gamma_1 = \\{e\\}$），平凡群幂零类 $0$；$D_8$ 幂零类 $2$；有限 $p$-群都幂零；$S_3$ 不幂零（$\\gamma_1 = A_3$，$\\gamma_2 = A_3 \\ne \\{e\\}$）。\n\n⭐ 幂零 $\\implies$ 可解：归纳有 $\\gamma_i \\subseteq G^{(i)}$，故导列比下中心列先终止。反之不然（$S_3$ 可解不幂零）。\n\n⚠ 幂零群的子群与商群仍幂零；但扩张不必幂零。",
      refs: [
        "Lang, Algebra, Ch. I §6",
        "Dummit–Foote, Abstract Algebra, §6.1"
      ]
    },
    {
      id: "def.automorphism-group",
      cluster: "algebra.structures",
      type: "definition",
      label: "自同构群",
      title: "自同构群与内自同构群",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "群",
        "自同构",
        "内自同构"
      ],
      statement: "设 $G$ 是群。$G$ 到自身的同构 $\\sigma : G \\to G$ 叫**自同构**；全体自同构在复合下构成群\n$\\operatorname{Aut}(G) \\le \\operatorname{Sym}(G),$\n叫 $G$ 的**自同构群**。\n\n对 $g \\in G$，映射 $c_g(x) := gxg^{-1}$ 是自同构，叫**内自同构**；全体内自同构\n$\\operatorname{Inn}(G) := \\{\\, c_g : g \\in G \\,\\} \\trianglelefteq \\operatorname{Aut}(G)$\n构成正规子群，且 $\\operatorname{Inn}(G) \\cong G/Z(G)$。商 $\\operatorname{Out}(G) := \\operatorname{Aut}(G)/\\operatorname{Inn}(G)$ 叫**外自同构群**。",
      notes: "⭐ 例：$\\operatorname{Aut}(\\mathbb{Z}/n) \\cong (\\mathbb{Z}/n)^{\\times}$；$\\operatorname{Aut}(V_4) \\cong S_3$；$n \\ne 6$ 时 $\\operatorname{Aut}(S_n) = \\operatorname{Inn}(S_n) \\cong S_n$。\n\n⚠ $n = 6$ 是例外：$S_6$ 有外自同构，$\\operatorname{Out}(S_6)$ 阶 $2$。\n\n⭐ 内自同构的核是中心 $Z(G)$：$c_g = \\mathrm{id} \\iff g \\in Z(G)$，这正是 $G/Z(G) \\cong \\operatorname{Inn}(G)$ 的来源。",
      refs: [
        "Lang, Algebra, Ch. I §5",
        "Dummit–Foote, Abstract Algebra, §4.4"
      ]
    },
    {
      id: "def.inner-automorphism",
      cluster: "algebra.structures",
      type: "definition",
      label: "内自同构",
      title: "内自同构：共轭作用给出的自同构",
      regions: [
        "algebra"
      ],
      tags: [
        "定义",
        "代数",
        "群",
        "内自同构",
        "共轭"
      ],
      statement: "设 $G$ 是群，$g \\in G$。映射\n$c_g : G \\to G, \\qquad c_g(x) := g x g^{-1}$\n是 $G$ 的自同构，称为由 $g$ 决定的**内自同构**。全体内自同构\n$\\operatorname{Inn}(G) := \\{\\, c_g : g \\in G \\,\\}$\n在复合下构成群，且 $\\operatorname{Inn}(G) \\cong G/Z(G)$、$\\operatorname{Inn}(G) \\trianglelefteq \\operatorname{Aut}(G)$。",
      notes: "⭐ 内自同构正是**共轭作用** $G$ 在自身上的像：$c_g$ 就是 $x \\mapsto g \\cdot x$（共轭作用）。\n\n⭐ 内自同构群平凡 $\\iff$ $G$ 阿贝尔；此时 $\\operatorname{Inn}(G) = \\{\\mathrm{id}\\}$、$\\operatorname{Out}(G) = \\operatorname{Aut}(G)$。\n\n⭐ 例：$S_n$ 的内自同构就是按循环型保持的共轭；$GL_n(K)$ 的内自同构是 $A \\mapsto P A P^{-1}$。",
      refs: [
        "Lang, Algebra, Ch. I §5",
        "Dummit–Foote, Abstract Algebra, §4.4"
      ]
    },
    {
      id: 'def.group-hom',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '群同态、核与像',
      title: '群同态',
      regions: ['algebra'],
      tags: ['代数', '群', '同态', '核', '像'],
      statement: [
        '设 $(G, \\cdot)$、$(G\', \\ast)$ 是群。映射 $\\varphi : G \\to G\'$ 叫**群同态**，如果',
        '',
        '$$\\varphi(a b) = \\varphi(a) \\ast \\varphi(b) \\qquad (a, b \\in G).$$',
        '',
        '它的**核**与**像**分别是',
        '',
        '$$\\ker\\varphi := \\{\\, g \\in G : \\varphi(g) = e\' \\,\\} \\;\\subseteq\\; G, \\qquad \\operatorname{im}\\varphi := \\varphi(G) \\;\\subseteq\\; G\'.$$'
      ].join('\n'),
      notes: [
        '**同态自动保单位元与逆元**：$\\varphi(e) = e\'$、$\\varphi(a^{-1}) = \\varphi(a)^{-1}$（由 $\\varphi(e) = \\varphi(e e) = \\varphi(e)\\varphi(e)$ 两边消去得到）。所以定义里只需写一条等式。',
        '**核与像都是子群**：$\\operatorname{im}\\varphi \\le G\'$ 显然；$\\ker\\varphi \\le G$ 由 $\\varphi(ab^{-1}) = \\varphi(a)\\varphi(b)^{-1} = e\'$ 得到。',
        '⭐ **核还是正规子群**：对 $k \\in \\ker\\varphi$、$g \\in G$，',
        '',
        '$$\\varphi(g k g^{-1}) = \\varphi(g)\\, e\'\\, \\varphi(g)^{-1} = e\',$$',
        '',
        '所以 $gkg^{-1} \\in \\ker\\varphi$，即 $\\ker\\varphi \\trianglelefteq G$。**核总是正规的** —— 这正是「商群能商掉核」的全部理由。',
        '**单同态 $\\iff$ 核平凡**：$\\varphi$ 是单射 $\\iff$ $\\ker\\varphi = \\{e\\}$。于是「单」这个性质被一个**子群**完全编码了。'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    /* -------------------------------------------------- 第一同构定理 */
    {
      id: 'thm.first-iso',
      cluster: 'algebra.structures',
      type: 'theorem',
      label: '第一同构定理（Noether）',
      title: '第一同构定理',
      regions: ['algebra', 'set-theory'],
      tags: ['代数', '群', '同构定理', 'Noether', '商群', '商映射'],
      statement: [
        '设 $\\varphi : G \\to G\'$ 是**群同态**。则 $\\varphi$ 诱导出同构',
        '',
        '$$G \\big/ \\ker\\varphi \\;\\cong\\; \\operatorname{im}\\varphi, \\qquad g \\ker\\varphi \\;\\longmapsto\\; \\varphi(g).$$',
        '',
        '特别地：**满同态的像就是商群**（$\\varphi$ 满时 $G/\\ker\\varphi \\cong G\'$）。'
      ].join('\n'),
      notes: [
        '**证明的三步。** 记 $K = \\ker\\varphi$。',
        '',
        [
          '- **良定义**：若 $gK = g\'K$，则 $g\' = gk$（某个 $k \\in K$），于是 $\\varphi(g\') = \\varphi(g)\\varphi(k) = \\varphi(g)e\' = \\varphi(g)$ —— 同一陪集里的元素被送到同一个值。',
          '- **同态**：$\\overline{\\varphi}\\bigl((gK)(g\'K)\\bigr) = \\overline{\\varphi}(gg\'K) = \\varphi(gg\') = \\varphi(g)\\varphi(g\') = \\overline{\\varphi}(gK)\\,\\overline{\\varphi}(g\'K)$。',
          '- **双射**：单，因为 $\\overline{\\varphi}(gK) = e\'$ 意味着 $\\varphi(g) = e\'$，即 $g \\in K$，于是 $gK = K$；满，因为像本来就是 $\\varphi(G)$。∎'
        ].join('\n'),
        '⭐ **它其实是「集合 + 运算 + 公理」这套格式的通用定理，不是群的专利。** 同一个证明逐字照搬，只要把「同态」换成对应的东西：',
        '',
        '$$A \\big/ \\ker f \\;\\cong\\; \\operatorname{im} f.$$',
        '',
        '⭐ **集合层面的原型**：对任何映射 $f : A \\to B$，在 $A$ 上令 $a \\sim a\' \\iff f(a) = f(a\')$，则 $f$ 诱导**双射** $A/{\\sim} \\;\\to\\; \\operatorname{im} f$（见「商集与等价类」）。\n\n群版比它多出来的只有一句话：**商掉核之后，剩下的是一个群**。\n\n前两步（良定义、双射）就是集合版的内容，第三步（同态）才是新的。',
        '**它回答了什么问题。** 「同态把群送到哪里去了」这个问题，答案只有两部分：**核**（被压掉的部分）与**像**（留下来的部分），二者由一个同构精确地锁在一起。于是研究同态 = 研究正规子群，这就是把群论变成「子群格」的原因。'
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. I §4', 'Dummit & Foote, Abstract Algebra, §10.2']
    },
    {
      id: 'def.free-group',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '自由群',
      title: '自由群 $F(S)$（约化字）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '自由群', '字'],
      statement: '设 $S$ 是集合。$S$ 上的**自由群** $F(S)$ 由所有**约化字** $s_{1}^{\\varepsilon_{1}}\\cdots s_{n}^{\\varepsilon_{n}}$ 组成，其中 $s_{i}\\in S$、$\\varepsilon_{i}=\\pm1$，且相邻的 $s_{i}=s_{i+1}$、$\\varepsilon_{i}=-\\varepsilon_{i+1}$ 已被相消；空字记 $1$。乘法为字的拼接后再约化。包含映射 $\\iota:S\\to F(S)$ 把 $s$ 送到单字母字。',
      notes: '**正规形**：约化字是每个元素的唯一表示，故两个字相等当且仅当约化后逐字母相同；这使 $F(S)$ 的运算良定义且无其他关系。\n\n**基本例子**：$F(\\emptyset)=1$；$F(\\{s\\})\\cong\\mathbb{Z}$（字 $s^{n}$）；$F(\\{a,b\\})$ 是非阿贝尔群，$\\pi_{1}(S^{1}\\vee S^{1})\\cong F(\\{a,b\\})$。\n\n⚠ **与自由阿贝尔群不同物**：`thm.csz-free` 说的是自由阿贝尔群（交换），本节点是非阿贝尔自由群；$F(S)$ 的交换化才是自由阿贝尔群。\n\n**为什么叫自由**：除群公理外不施加任何关系；泛性质见 `def.free-group-universal`。',
      refs: ['Lang, Algebra, Ch. I §12 · free groups', 'Dummit and Foote, Abstract Algebra, §6.3 · free groups'],
    },
    {
      id: 'def.free-group-universal',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '自由群的泛性质',
      title: '自由群的泛性质（左伴随）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '自由群', '泛性质', '伴随'],
      statement: '设 $S$ 是集合，$F(S)$ 是自由群，$\\iota:S\\to F(S)$ 是包含。对任意群 $G$ 与任意映射 $f:S\\to G$，存在唯一的群同态 $\\tilde f:F(S)\\to G$ 使 $\\tilde f\\circ\\iota=f$。等价地，$\\operatorname{Hom}_{\\mathbf{Grp}}(F(S),G)\\cong\\operatorname{Hom}_{\\mathbf{Set}}(S,U(G))$，其中 $U$ 是遗忘函子。',
      notes: '**含义**：给自由群一个同态，等价于给生成元集合一个到目标群的任意映射；生成元之间没有需要满足的关系。\n\n**唯一性**：由 $\\tilde f(s)=\\iota(s)$ 与同态性，$\\tilde f(s^{\\varepsilon})=f(s)^{\\varepsilon}$，于是 $\\tilde f$ 在生成元上被唯一确定；存在性由字的乘法直接验证。\n\n**伴随**：泛性质正是「$F$ 是遗忘函子 $U:\\mathbf{Grp}\\to\\mathbf{Set}$ 的左伴随」的定义（见 `def.adjoint`）：单位 $\\iota$ 给出 $\\operatorname{Hom}(F(S),G)\\cong\\operatorname{Hom}(S,U(G))$。\n\n⚠ 若只要求「存在」而不要求「唯一」，则任何包含 $S$ 的群都满足，泛性质就不再刻画自由群。',
      refs: ['Lang, Algebra, Ch. I §12 · universal property of free groups', 'Mac Lane, Categories for the Working Mathematician, Ch. IV §1 · free groups as adjoint'],
    },
    {
      id: 'def.dihedral-group',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '二面体群',
      title: '二面体群 $D_{n}$（正 $n$ 边形的对称群）',
      regions: ['algebra'],
      tags: ['定义', '代数', '群', '二面体群', '对称群', '半直积'],
      statement: '设 $n\\ge 3$。**二面体群** $D_{n}$ 是正 $n$ 边形的对称群，阶为 $2n$，由旋转 $r$（转角 $2\\pi/n$）与一个反射 $s$ 生成，满足关系 $r^{n}=1$、$s^{2}=1$、$srs=r^{-1}$。等价地，$D_{n}=\\langle r,s\\mid r^{n}=s^{2}=1,\\ srs=r^{-1}\\rangle$。',
      notes: '**几何**：$D_{n}$ 的元素是 $n$ 个旋转 $1,r,\\ldots,r^{n-1}$ 与 $n$ 个反射 $s,rs,\\ldots,r^{n-1}s$；反射都是 $2$ 阶。\n\n**结构**：$D_{n}\\cong\\mathbb{Z}/n\\rtimes\\mathbb{Z}/2$，其中 $\\mathbb{Z}/2$ 通过 $r\\mapsto r^{-1}$ 作用在 $\\mathbb{Z}/n$ 上（见 `def.semidirect-product`）。旋转子群 $\\langle r\\rangle$ 正规，商为 $\\mathbb{Z}/2$。\n\n**低阶**：$D_{3}\\cong S_{3}$（正三角形对称群，阶 $6$）；$D_{4}$ 是正方形对称群（阶 $8$）；$D_{n}$ 可解，因为 $\\mathbb{Z}/n$ 与 $\\mathbb{Z}/2$ 都交换。\n\n⚠ **记号歧义**：有的书用 $D_{2n}$ 表示阶 $2n$ 的二面体群；本图统一用 $D_{n}$ 表示阶 $2n$。',
      refs: ['Lang, Algebra, Ch. I §6 · dihedral groups', 'Dummit and Foote, Abstract Algebra, §1.2 · dihedral groups'],
    },
  ],

  edges: [
    { id: 'dep.grouppower-group', kind: 'definition', definition: 'def.group', usedBy: 'def.group-power',
      note: '整数幂只用群的乘法、单位元与逆元定义。' },
    { id: 'dep.grouppower-binary', kind: 'definition', definition: 'def.binary-operation', usedBy: 'def.group-power',
      note: '幂的递归步 $x^{n+1}=x^{n}x$ 就是群的二元运算。' },
    { id: 'dep.grouppower-order', kind: 'definition', definition: 'def.group-power', usedBy: 'def.group-order',
      note: '元素的阶是使 $x^{n}=e$ 的最小正整数，直接用整数幂陈述。' },
    { id: 'dep.fg-group', kind: 'definition', definition: 'def.group', usedBy: 'def.free-group',
      note: '自由群的乘法与公理按群的定义验证。' },
    { id: 'dep.fgu-fg', kind: 'definition', definition: 'def.free-group', usedBy: 'def.free-group-universal',
      note: '泛性质讨论的对象是自由群。' },
    { id: 'dep.fgu-adjoint', kind: 'definition', definition: 'def.adjoint', usedBy: 'def.free-group-universal',
      note: '自由函子与遗忘函子构成伴随对。' },
    { id: 'dep.dihedral-group', kind: 'definition', definition: 'def.group', usedBy: 'def.dihedral-group',
      note: '二面体群是群。' },
    { id: 'dep.dihedral-semidirect', kind: 'definition', definition: 'def.semidirect-product', usedBy: 'def.dihedral-group',
      note: 'D_n 是 Z/n 与 Z/2 的半直积。' },
    { id: 'dep.dihedral-action', kind: 'definition', definition: 'def.group-action', usedBy: 'def.dihedral-group',
      note: 'D_n 作用在正 n 边形的顶点集上。' },
    { id: 'dep.dihedral-classeq', kind: 'definition', definition: 'thm.class-equation', usedBy: 'def.dihedral-group',
      note: 'D_n 的共轭类可用类方程分析。' },
    {
      id: "dep.pgroup-group",
      kind: "definition",
      definition: "def.group",
      usedBy: "def.p-group",
      note: "p-群首先是一个群；定义在其上再加阶为素数幂的条件。"
    },
    {
      id: "dep.commutator-group",
      kind: "definition",
      definition: "def.group",
      usedBy: "def.commutator-subgroup",
      note: "交换子用群乘法与逆元定义。"
    },
    {
      id: "dep.commutator-subgroup",
      kind: "definition",
      definition: "def.subgroup",
      usedBy: "def.commutator-subgroup",
      note: "换位子群是由交换子生成的子群。"
    },
    {
      id: "dep.commutator-solvable",
      kind: "definition",
      definition: "def.commutator-subgroup",
      usedBy: "def.solvable-group",
      note: "可解性用导列 $G^{(i+1)}=[G^{(i)},G^{(i)}]$ 定义。"
    },
    {
      id: "dep.nilpotent-group",
      kind: "definition",
      definition: "def.group",
      usedBy: "def.nilpotent-group",
      note: "下中心列用群乘法与换位子定义。"
    },
    {
      id: "dep.nilpotent-commutator",
      kind: "definition",
      definition: "def.commutator-subgroup",
      usedBy: "def.nilpotent-group",
      note: "下中心列是换位子子群的迭代。"
    },
    {
      id: "imp.nilpotent-solvable",
      kind: "implication",
      sources: [
        "def.nilpotent-group"
      ],
      target: "def.solvable-group",
      title: "幂零群可解",
      proof: "设 $\\gamma_0 = G$、$\\gamma_{i+1} = [G, \\gamma_i]$，并设 $G^{(i)}$ 是导列。对 $i$ 归纳证明 $\\gamma_i \\subseteq G^{(i)}$。\n\n$i = 0$：$\\gamma_0 = G = G^{(0)}$。若 $\\gamma_i \\subseteq G^{(i)}$，则\n$$\\gamma_{i+1} = [G, \\gamma_i] \\subseteq [G, G^{(i)}] = G^{(i+1)} .$$\n若 $G$ 幂零，取 $c$ 使 $\\gamma_c = \\{e\\}$，则 $G^{(c)} \\supseteq \\gamma_c = \\{e\\}$，故 $G^{(c)} = \\{e\\}$，即 $G$ 可解。$\\blacksquare$",
      note: "$\\gamma_i \\subseteq G^{(i)}$ 是关键：下中心列夹在导列与 $G$ 之间。"
    },
    {
      id: "dep.automorphism-group",
      kind: "definition",
      definition: "def.group",
      usedBy: "def.automorphism-group",
      note: "自同构是群到自身的同构，先有群结构。"
    },
    {
      id: "dep.automorphism-hom",
      kind: "definition",
      definition: "def.group-hom",
      usedBy: "def.automorphism-group",
      note: "自同构是同态的特殊情形（双射同态）。"
    },
    {
      id: "dep.inner-automorphism",
      kind: "definition",
      definition: "def.automorphism-group",
      usedBy: "def.inner-automorphism",
      note: "内自同构是自同构群的正规子群。"
    },
    {
      id: "dep.inner-conjugation",
      kind: "definition",
      definition: "def.group-action",
      usedBy: "def.inner-automorphism",
      note: "共轭作用是群在自身上的作用，其像即内自同构。"
    }
  ]
});
