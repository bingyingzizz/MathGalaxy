/* ==========================================================================
   内容包 · 代数结构：域与有序域
   --------------------------------------------------------------------------
   这是内容准则第 ① 条（每一层都从上一层造出来）逼出来的两个节点：
   全图到处在说「$\mathbb{Q}$ 是有序域」「$\mathbb{R}$ 是完备有序域」「设 $K$ 是域，
   $V$ 是 $K$ 上的向量空间」—— 可是「域」和「有序域」本身一直没有节点，
   等于用了上一层之外的东西。

   这两个结构只踩在更下面两层的东西上：

       集合 + 函数（两个运算）     → 域
       域 + 全序（偏序 + 可比）    → 有序域

   再往上是它们的实例：$\mathbb{Q}$（层 8）、$\mathbb{R}$（层 11）、
   以及 $K$ 上的向量空间。

   ⚠️ 代数学的笔记进来以后这一块要扩容（群 / 环 / 模 / 同态 / 同构），到时候合并。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '代数结构：域与有序域',
  nodes: [

    /* ------------------------------------------------------------ 域 */
    {
      id: 'def.field',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '域',
      title: '域 $F$（Field）',
      regions: ['algebra'],
      tags: ['定义', '代数', '域'],
      statement: [
        '设 $F$ 是一个**集合**，$+$ 与 $\\cdot$ 是 $F$ 上的两个**二元运算**（即两个函数 $F \\times F \\to F$）。称 $(F, +, \\cdot)$ 是一个**域**，当且仅当：',
        '',
        '- $(F, +)$ 是**阿贝尔群**；',
        '- $(F \\setminus \\{0\\}, \\cdot)$ 是**阿贝尔群**（这里 $0$ 是加法群的单位元）；',
        '- **分配律** $a (b + c) = ab + ac$ 对一切 $a, b, c \\in F$ 成立。',
        '',
        '一句话：**加减乘除（除以非零元）都封闭，且满足结合、交换、分配律**。'
      ].join('\n'),
      notes: '⭐ **格式是「集合 + 运算 + 公理」**：域不是凭空的对象 —— 一个集合、两个函数、几条等式就定出了一个域。判别一个东西是不是域，就是逐条核对这些等式。注意上面三条把「群」的两条公理组直接**引用**过来了：域的定义是**在群的定义之上再加一层**，不是重新数一遍等式。\n\n已经造好的例子：\n- $\\mathbb{Q}$（有理数）：最顺手的域；\n- $\\mathbb{R}$（实数）：由 Cauchy 列造出来之后，再验证它满足这些等式（见「$\\mathbb{R}$ 是完备有序域」）；\n- $\\mathbb{Z}$ **不是**域：$2$ 在里面没有乘法逆元；$\\mathbb{N}$ 也不是：$1 - 2$ 没有意义。\n\n⚠ 「域」（field）与测度论里的「环」不是一回事：那里的环是**集合环**，指对有限并与差封闭的**集族**，同名不同物。',
      refs: ['Lang, Algebra, Ch. I', 'Dummit & Foote, Abstract Algebra, §13.1']
    },

    /* -------------------------------------------------------- 有序域 */
    {
      id: 'def.ordered-field',
      cluster: 'algebra.structures',
      type: 'definition',
      label: '有序域',
      title: '有序域（Ordered Field）',
      regions: ['algebra', 'order-theory'],
      tags: ['定义', '代数', '序', '有序域'],
      statement: [
        '设 $(F, +, \\cdot)$ 是**域**，$\\le$ 是 $F$ 上的**全序**（偏序，且任意两元可比）。若 $\\le$ 与两个运算**相容**：',
        '',
        '$$a \\le b \\implies a + c \\le b + c, \\qquad a \\le b,\\ 0 \\le c \\implies ac \\le bc$$',
        '',
        '则称 $(F, +, \\cdot, \\le)$ 是一个**有序域**。照搬 $\\mathbb{Q}$ 上的说法：$a > 0$ 叫**正元**，$a < 0$ 叫**负元**；两者拼起来就是绝对值',
        '',
        '$$|a| := \\begin{cases} a, & a \\ge 0 \\\\ -a, & a < 0 \\end{cases}$$'
      ].join('\n'),
      notes: '⭐ 第二条相容性只在 $0 \\le c$ 时允许「两边同乘」—— 乘**负数**要**反向**（$a \\le b,\\ c \\le 0 \\implies ac \\ge bc$，由前两条推出）。有理数、实数上关于不等式的全部运算规则，归根到底就是这一条。\n\n由两条相容性立刻得到：**平方元非负**（$a \\ge 0 \\implies a^2 \\ge 0$；$a \\le 0 \\implies -a \\ge 0$ 且 $a^2 = (-a)^2 \\ge 0$），特别地 $1 = 1^2 > 0$，故 $-1 < 0$。\n\n📌 **「完备」不是这条定义的一部分**，它是在有序域上再加一条：**每个非空有上界的子集都有上确界**。$\\mathbb{Q}$ 就是「有序但完备不了」的例子 —— $\\{q \\in \\mathbb{Q} : q^2 < 2\\}$ 有上界却没有上确界。',
      refs: ['Lang, Algebra, Ch. VI', 'Rudin, Principles of Mathematical Analysis, Ch. 1']
    }
  ],

  edges: [
    {
      id: 'dep.function-field',
      kind: 'definition',
      definition: 'def.function',
      usedBy: 'def.field',
      note: '两个运算就是两个**函数** $F \\times F \\to F$（定义域那一步先要用「笛卡尔积」把 $F \\times F$ 造出来）。'
    },
    {
      id: 'dep.field-ordered',
      kind: 'definition',
      definition: 'def.field',
      usedBy: 'def.ordered-field',
      note: '有序域 = **域** + 一条与运算相容的全序：先有域，再加上序。'
    },
    {
      id: 'dep.poset-ordered',
      kind: 'definition',
      definition: 'def.poset',
      usedBy: 'def.ordered-field',
      note: '定义里的 $\\le$ 是**全序** —— 偏序再加上可比性。'
    },
    {
      id: 'dep.field-vs',
      kind: 'definition',
      definition: 'def.field',
      usedBy: 'def.vs',
      note: '「设 $K$ 是域，$V$ 是 $K$ 上的向量空间」—— 向量空间的**系数**取自一个域。（取 $K = \\mathbb{R}$ 就是最常用的实向量空间。）'
    }
  ]
});
