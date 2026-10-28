/* ============================================================================
   内容包 · 复变函数（六）：扩充复平面与球极投影

   补的是全书第一章的东西，也是图上唯一「用到了却没节点」的对象：
   好几处正文写 $\\widehat{\\mathbb{C}}$（共形映射、分式线性变换、交比），
   但「扩充复平面」本身在图里没有家。这一包把它造出来：
     def.riemann-sphere（球极投影）· prop.stereographic-circle（保圆 + 共形）
     · prop.extended-plane-compact（$\\widehat{\\mathbb{C}} \\cong S^{2}$ 是紧的）
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: '复变函数（六）· 扩充复平面与球极投影',

  nodes: [
    {
      id: 'def.riemann-sphere',
      type: 'definition',
      label: '扩充复平面与球极投影',
      title: '扩充复平面：把 $\\infty$ 补进来，并用球极投影给出模型',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '扩充复平面', '球极投影', 'Riemann 球'],
      statement: [
        '**扩充复平面** $\\widehat{\\mathbb{C}} := \\mathbb{C} \\cup \\{\\infty\\}$：在复平面上补一个点 $\\infty$，' +
          '规定它的邻域是 $\\{\\, |z| > R \\,\\} \\cup \\{\\infty\\}$（$R > 0$）。',
        '',
        '**球极投影**把单位球面 $S^{2} \\subset \\mathbb{R}^{3}$ 与 $\\widehat{\\mathbb{C}}$ 一一对应：' +
          '从北极 $N = (0,0,1)$ 出发，把球面上除 $N$ 外的点投到赤道平面 $w = 0$ 上。' +
          '对 $z = u + iv$，',
        '',
        '$$(x, y, w) = \\left(\\frac{2u}{1 + |z|^{2}},\\ \\frac{2v}{1 + |z|^{2}},' +
          '\\ \\frac{|z|^{2} - 1}{1 + |z|^{2}}\\right).$$',
        '',
          '反过来 $z = \\dfrac{x + iy}{1 - w}$。$N$ 对应 $\\infty$。',
      ].join('\n'),
      notes: [
        '**为什么值得单独定义一个点**：很多结论（分式线性变换把圆映成圆、Riemann 映射定理、' +
          '交比）在「只是 $\\mathbb{C}$」的时候都要分情形讨论，补上 $\\infty$ 之后只剩一种情形 —— ' +
          '直线就是过 $\\infty$ 的圆，$1/z$ 就是 $\\mathbb{C}$ 上无处不定义的有理映射。',
        '',
        '**公式怎么来的**：过 $N$ 与球面上点 $(x,y,w)$ 的直线参数化为 ' +
          '$N + t((x,y,w) - N)$，令第三坐标为 $0$ 解出 $t$，即得 $2(x,y)/(1-w)$；再把 $|z|^{2}$ 与 $w$ ' +
          '联立就得到上面的整齐形式（用 $x^{2}+y^{2}+w^{2}=1$ 化简）。',
        '',
        '⚠️ 这里补的 $\\infty$ 是**一个点**，不是 $+\\infty$ 与 $-\\infty$ 两个（那是一维实轴的做法，' +
          '见 `def.extended-real`）。复数没有「符号」，所以只有一个无穷远点。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 复平面与扩充复平面（球极投影）',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 1 · Complex Numbers（the extended plane）',
      ],
    },
    {
      id: 'prop.stereographic-circle',
      type: 'proposition',
      label: '球极投影保圆且共形',
      title: '球极投影：球面上的圆对应扩充平面上的圆，且保角',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '球极投影', '保圆', '共形'],
      statement: [
        '球极投影把 $S^{2}$ 上的圆映成 $\\widehat{\\mathbb{C}}$ 上的圆：',
        '',
        '1. 不过北极 $N$ 的圆 $\\mapsto$ 复平面上真正的圆；',
        '2. 过北极 $N$ 的圆 $\\mapsto$ 复平面上的直线（加上 $\\infty$ 就是过 $\\infty$ 的圆）。',
        '',
        '并且它**保角**：两条曲线在球面上的夹角等于它们在平面上的夹角。',
      ].join('\n'),
      notes: [
        '**保圆性的算法**：球面上的圆是「平面与球面的交线」，即 $ax + by + cw = d$。' +
          '把球极投影的公式代进去，整理成 $u, v, |z|^{2}$ 的一次式：',
        '',
        '$$(d - c)|z|^{2} - 2au - 2bv = (d + c),$$',
        '',
        '当 $c \\ne d$ 时这是一个圆的方程；$c = d$ 时退化成直线 —— 正好对应「圆过不过北极」。∎',
        '',
        '⭐ **保角性的意义**：它说明「在球面上看复分析」与「在平面上看」是同一门学问，' +
          '只是换了度量。这也是为什么 $\\widehat{\\mathbb{C}}$ 上的共形结构可以定义成' +
          '「$z \\mapsto 1/z$ 也全纯」—— $1/z$ 正是「绕北极度旋转 180°」在平面上的样子。',
        '',
        '⚠️ 定向：球面与平面的定向约定不同，不同教材对「保角还是反保角」的说法会差一个符号。' +
          '本图只断言「保角（夹角不变）」，定向的事按各书约定。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 球极投影的性质',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 1 · Complex Numbers',
      ],
    },
    {
      id: 'prop.extended-plane-compact',
      type: 'proposition',
      label: '扩充复平面是紧的',
      title: '$\\widehat{\\mathbb{C}} \\cong S^{2}$：紧、列紧，$z_{n} \\to \\infty$ 就是 $|z_{n}| \\to \\infty$',
      cluster: 'analysis.complex',
      regions: ['complex'],
      tags: ['复变函数', '扩充复平面', '紧性', 'Riemann 球'],
      statement: [
        '球极投影是 $\\widehat{\\mathbb{C}} \\to S^{2}$ 的同胚，因此：',
        '',
        '1. $\\widehat{\\mathbb{C}}$ 是**紧**的（$S^{2}$ 紧，同胚保紧性）；',
        '2. $z_{n} \\to \\infty$ $\\iff$ $|z_{n}| \\to +\\infty$；',
        '3. 每个无穷序列都有收敛子列（在 $\\widehat{\\mathbb{C}}$ 里），极限可能是 $\\infty$。',
      ].join('\n'),
      notes: [
        '**证明**：球极投影是连续双射（公式是有理函数，分母 $1 + |z|^{2} > 0$），' +
          '从紧空间 $S^{2}$ 到 Hausdorff 空间 $\\widehat{\\mathbb{C}}$ 的连续双射自动是同胚。' +
          '$S^{2}$ 紧（$\\mathbb{R}^{3}$ 中的有界闭集），故 $\\widehat{\\mathbb{C}}$ 紧。' +
          '第 2、3 条由同胚与 $S^{2}$ 的列紧性直接得到。∎',
        '',
        '⭐ **它的用处**：把「$\\infty$ 附近的行为」变成「球面上一点附近的行为」，于是' +
          '「整函数在 $\\infty$ 处是什么奇点」这种说法才有意义 —— 这是 `thm.picard-great` 与' +
          '`def.entire-meromorphic` 里「亚纯 = 扩充平面上除极点外全纯」的前提。',
        '',
        '⚠️ 紧性属于 $\\widehat{\\mathbb{C}}$，不属于 $\\mathbb{C}$：$z_{n} = n$ 在 $\\mathbb{C}$ 里没有收敛子列，' +
          '在 $\\widehat{\\mathbb{C}}$ 里收敛到 $\\infty$。',
      ].join('\n'),
      refs: [
        '王晓光《复变函数》· 扩充复平面的拓扑',
        'Ahlfors, Complex Analysis (3rd ed.), Ch. 1 · Complex Numbers',
      ],
    },
  ],

  edges: [
    { kind: 'implication', sources: ['def.complex'], target: 'def.riemann-sphere',
      title: '在 $\\mathbb{C}$ 上补一个点：邻域用 $|z| > R$ 定义',
      proof: [
        '**构造**：取集合 $\\mathbb{C} \\cup \\{\\infty\\}$（要求 $\\infty \\notin \\mathbb{C}$，' +
          '即先取一个不属于 $\\mathbb{C}$ 的对象，再由并集造出新集合 —— 不用「理想点」这种说法）。',
        '',
        '**拓扑**：以 $\\mathbb{C}$ 的开集与 $\\{\\, |z| > R \\,\\} \\cup \\{\\infty\\}$ 为基，' +
          '这样 $\\infty$ 的邻域是「平面上的外部」。验证它满足拓扑公理（有限交、任意并封闭）。',
        '',
        '**与球面的对应**：球极投影给出的双射把上述拓扑送到 $S^{2}$ 的通常拓扑（因为' +
          '$|z| \\to \\infty$ 恰好对应球面上点趋于北极），故它是同胚。∎',
      ].join('\n'),
      note: '补上这一个点之后，「直线」与「圆」、「整函数」与「在 $\\infty$ 处亚纯」都各自合成一类。' },

    { kind: 'implication', sources: ['def.riemann-sphere'], target: 'prop.stereographic-circle',
      title: '把「平面与球面相交」翻译成 $u, v, |z|^{2}$ 的方程',
      proof: [
        '球面上的圆是某个平面与 $S^{2}$ 的交：$ax + by + cw = d$（$a, b, c, d \\in \\mathbb{R}$，' +
          '且与球面确实相交）。',
        '',
        '代入球极投影公式：$x = 2u/(1 + |z|^{2})$、$y = 2v/(1 + |z|^{2})$、' +
          '$w = (|z|^{2} - 1)/(1 + |z|^{2})$，两边乘 $1 + |z|^{2}$ 得',
        '',
        '$$2au + 2bv + c(|z|^{2} - 1) = d(1 + |z|^{2}).$$',
        '',
        '整理得 $(c - d)|z|^{2} + 2au + 2bv + (c + d) = 0$。$c \\ne d$ 时这是圆（配平方即可）；' +
          '$c = d$ 时二次项消失，剩下一次方程 —— 直线。平面过北极 $N$ 恰好等价于 $c = d$' +
          '（把 $N$ 的坐标代进平面方程即得）。',
        '',
        '**保角**：球极投影的 Jacobi 在两个切向量上只差一个正纯量因子（算一下即知），' +
          '故夹角不变。∎',
      ].join('\n'),
      note: '「球面上的圆 $\\to$ 平面上的圆或直线」就是保圆性的来源。' },

    { kind: 'implication', sources: ['def.riemann-sphere'], target: 'prop.extended-plane-compact',
      title: '球极投影是同胚，$S^{2}$ 紧 $\\implies$ $\\widehat{\\mathbb{C}}$ 紧',
      proof: [
        '**同胚**：球极投影 $\\sigma : \\widehat{\\mathbb{C}} \\to S^{2}$ 由有理公式给出，' +
          '在 $\\mathbb{C}$ 上连续；在 $\\infty$ 处，$|z| \\to \\infty$ 时 $\\sigma(z) \\to (0,0,1) = N$，' +
          '故整体连续。它是双射（逆公式 $z = (x + iy)/(1 - w)$ 在 $S^{2} \\setminus \\{N\\}$ 上连续）。' +
          '紧空间到 Hausdorff 空间的连续双射是同胚。',
        '',
        '**紧**：$S^{2} \\subset \\mathbb{R}^{3}$ 有界闭，故紧；紧性被同胚保持。',
        '',
        '**列紧**：紧距离空间列紧因此成立；把序列翻译到球面上，$z_{n} \\to \\infty$ 就是' +
          '$\\sigma(z_{n}) \\to N$，即 $|z_{n}| \\to +\\infty$。∎',
      ].join('\n'),
      note: '这条让「$\\infty$ 处的奇点」有了拓扑意义。' },

    { kind: 'definition', definition: 'def.riemann-sphere', usedBy: 'def.mobius',
      note: '分式线性变换的完整定义域是 $\\widehat{\\mathbb{C}}$：在 $z = -d/c$ 处取 $\\infty$，在 $\\infty$ 处取 $a/c$。' },
  ],
});
