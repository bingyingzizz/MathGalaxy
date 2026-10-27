/* ==========================================================================
   内容包 · 局部化与分式演算（2 条）
   --------------------------------------------------------------------------
    §1.4。这一团补的是「把一族态射当成同构之后会得到什么范畴」。

   用途不止一处：同伦范畴 $\mathbf{K}(\mathcal{C})$ 就是把链同伦当成同构的局部化，
   导出范畴 $D(\mathcal{A})$ 是再把拟同构当成同构的局部化 ——
   所以这一条是同调代数那一整条线的入口。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '局部化与分式演算',
  nodes: [

    {
      id: 'def.localization',
      cluster: 'cat.basic',
      type: 'definition',
      label: '局部化',
      title: '范畴的局部化',
      regions: ['category'],
      tags: ['范畴论', '局部化', '分式', '同伦范畴'],
      statement: [
        '设 $\\mathcal{C}$ 是范畴，$W$ 是 $\\mathcal{C}$ 中一族态射（想「当成同构」的那些）。$\\mathcal{C}$ 关于 $W$ 的**局部化** $\\mathrm{ho}(\\mathcal{C})$ 是这样一个范畴，连同函子 $\\gamma : \\mathcal{C} \\to \\mathrm{ho}(\\mathcal{C})$：',
        '',
        '1. 对每个 $w \\in W$，$\\gamma(w)$ 是同构；',
        '2. **泛性质**：对任何函子 $F : \\mathcal{C} \\to \\mathcal{D}$ 使每个 $w \\in W$ 的像都是同构，存在唯一的 $\\overline{F} : \\mathrm{ho}(\\mathcal{C}) \\to \\mathcal{D}$ 使 $\\overline{F} \\circ \\gamma = F$。'
      ].join('\n'),
      notes: [
        '**怎么把态射造出来。** 局部化里的态射是 $W$ 中态射的**形式逆**与 $\\mathcal{C}$ 中原有态射拼成的**有限长链**（这叫**分式**，因为长得像 $c \\cdot w^{-1} \\cdot d$）。两个这样的链只要能用原范畴里的交换图连通，就视作同一个态射。',
        '⭐ **两个标准例子**（都在同调代数那一支）：把链同伦 $\\simeq$ 全体当成同构，得到**同伦范畴** $\\mathbf{K}(\\mathcal{C})$；再把**拟同构**全体当成同构，得到**导出范畴** $D(\\mathcal{A})$。所以这一条是那一整条线的地基层。',
        '⚠️ **局部化一定存在，但可能很贵**：一般情形下 $\\mathrm{ho}(\\mathcal{C})$ 的态射**不再是集合**（每两个对象之间的分式链可能真类多），Hom 也可能爆掉。下面那条命题说的就是「什么时候它老老实实是个局部小范畴」。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1']
    },

    {
      id: 'prop.calculus-of-fractions',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '分式演算下的局部化',
      title: '右分式演算 $\\implies$ 局部化好算',
      regions: ['category'],
      tags: ['范畴论', '局部化', '分式演算', 'Ore 条件'],
      statement: [
        '设 $\\mathcal{C}$ 是小范畴、$W$ 是其中一族态射。称 $W$ **容许右分式演算**，如果：',
        '',
        '1. $W$ 对复合封闭，且包含所有恒等态射；',
        '2. **（Ore 条件）** 对任何 $w : X\' \\to X$ 与任何 $f : Y \\to X$，存在 $g$ 与 $v \\in W$ 使方块交换：',
        '',
        '$$\\begin{array}{ccc} Z & \\xrightarrow{\\;g\\;} & Y \\\\[2pt] {\\scriptstyle v}\\big\\downarrow & & \\big\\downarrow{\\scriptstyle f} \\\\[2pt] X\' & \\xrightarrow[\\;w\\;]{} & X \\end{array} \\qquad v \\in W;$$',
        '',
        '3. **（消去条件）** 若 $w \\in W$ 且 $f \\circ w = g \\circ w$，则存在 $v \\in W$ 使 $v \\circ f = v \\circ g$。',
        '',
        '则 $\\mathrm{ho}(\\mathcal{C})$ 可以这样具体算出来：对象不变，$\\operatorname{Hom}_{\\mathrm{ho}}(X, Y)$ 是形如 $X \\xleftarrow{\\;w\\;} X\' \\xrightarrow{\\;f\\;} Y$（$w \\in W$）的**分式**在等价关系下的商集。'
      ].join('\n'),
      notes: [
        ['**证明（Gabriel–Zisman 的构造，逐条用掉三个条件）。** 设 $W$ 容许右分式演算。','- **分式与等价**：一个分式是  $X \\xleftarrow{\\ w\\ } X\' \\xrightarrow{\\ f\\ } Y$（$w \\in W$）；两个分式等价，如果存在 $X\'\'\\xrightarrow{v}X\'$、$X\'\'\\xrightarrow{v\'}X\'$ 使 $w v = w\' v\'$（$\\in W$）且 $f v = f\' v\'$ ✓。','- **等价关系**：自反、对称显然；传递性用 **Ore 条件 2** 把两次比较拉到同一个 $X\'\'$ 上，再用 **消去条件 3** 处理剩下的差异 ✓。','- **复合**：两个分式的复合要「通分」——把 $f_{1}$ 与 $w_{2}$ 按 **条件 2** 摆成一个方块，得到一个公共的 $Z$，于是复合仍是单分式；换代表元不改变复合类（同样靠 2、3）✓。','- **范畴**：恒等取 $1_{X}$（$X \\xleftarrow{1}X\\xrightarrow{1}X$，条件 1 给出 $1 \\in W$）；结合律由构造直接验（三条条件保证「通分」的结果与顺序无关）✓。','- **泛性质**：记得到的范畴为 $\\operatorname{Frac}_{W}(\\mathcal{C})$，函子 $\\mathcal{C}\\to\\operatorname{Frac}_{W}(\\mathcal{C})$ 把每个 $w\\in W$ 变成同构（$w$ 的逆就是分式 $X \\xleftarrow{w}X\'\\xrightarrow{1}X\'$）✓；任何把 $W$ 变成同构的函子 $H$ 都用 $H(f)H(w)^{-1}$ 唯一分解 ✓。','于是 $\\operatorname{Frac}_{W}(\\mathcal{C}) \\simeq \\mathcal{C}[W^{-1}] = \\mathrm{ho}(\\mathcal{C})$，且 $\\operatorname{Hom}$ 就是分式的商集 ✓。∎','⚠️ 少了 Ore 或消去条件，局部化仍然存在，但它的 Hom **一般不是**分式的商集 —— 这正是「分式演算」存在的意义。'].join('\n'),
        '⭐ **直觉**：Ore 条件说的是「分式能做通分」—— 一个 $W$ 里的态射跟在前面，总能换成一个 $W$ 里的态射跟在后面，于是分式可以统一写成「先逆一个、再走一个」的**单分式** $f \\circ w^{-1}$，复合起来才封得住。消去条件保证「等价」这件事本身是好的。',
        '**与环论对照**：这正是交换环里**局部化** $S^{-1}A$（$S$ 是乘性子集）的那个条件；那里的「分式」$a/s$ 就是这里的分式，Ore 条件在交换的情形自动成立。',
        '⚠️ 局部化**总是存在**（上一条），但**不总是**能这样具体算 —— 分式演算是一条足够好用的**充分**条件。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1']
    }
  ],

  edges: []
});
