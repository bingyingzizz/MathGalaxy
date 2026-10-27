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
        '**例子与反例**：$(\\mathbb{Z}, +)$ 是阿贝尔群；$(\\mathbb{Q} \\setminus \\{0\\}, \\cdot)$ 是阿贝尔群；$(\\mathbb{Z}, \\cdot)$ **不是**群（只有 $\\pm 1$ 有乘法逆元）；$n \\times n$ 可逆矩阵在乘法下是群但**不阿贝尔**（$n \\ge 2$）。',
        '📌 还有一层更弱的：只要求结合律与单位元、不要求逆元，叫**幺半群**。（$\\mathbb{N}$ 在加法下就是幺半群不是群。）'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    /* ---------------------------------------------------------- 子群 */
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
      notes: '两条合起来可写成一条：$a, b \\in H \\implies a b^{-1} \\in H$。\n\n任意多个子群的交仍是子群；但**并**一般不是 —— 这也是「由 $S$ 生成的子群 $\\langle S \\rangle$」要定义成「含 $S$ 的一切子群的交」的原因。',
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
        '⭐ **集合层面的原型**：对任何映射 $f : A \\to B$，在 $A$ 上令 $a \\sim a\' \\iff f(a) = f(a\')$，则 $f$ 诱导**双射** $A/{\\sim} \\;\\to\\; \\operatorname{im} f$（见「商集与等价类」）。群版比它多出来的只有一句话：**商掉核之后，剩下的是一个群**。前两步（良定义、双射）就是集合版的内容，第三步（同态）才是新的。',
        '**它回答了什么问题。** 「同态把群送到哪里去了」这个问题，答案只有两部分：**核**（被压掉的部分）与**像**（留下来的部分），二者由一个同构精确地锁在一起。于是研究同态 = 研究正规子群，这就是把群论变成「子群格」的原因。'
      ].join('\n\n'),
      refs: ['Lang, Algebra, Ch. I §4', 'Dummit & Foote, Abstract Algebra, §10.2']
    }
  ],

  edges: []
});
