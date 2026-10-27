/* ==========================================================================
   内容包 · 局部化的补充 + 覆盖筛的四条等价（3 条）
   --------------------------------------------------------------------------
   两条接在「局部化」后面：环的局部化 $W^{-1}R$（集合层面最熟悉的那个例子）、
   以及分式演算把 Hom 写成**滤过余极限**的公式。

   第三条是 Proposition 3.2.12：一个筛是覆盖筛，等价于它的层化
   同构于 $X$ 的层化 —— 也就是「覆盖」这件事可以脱离 $J$ 用层来刻画。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '局部化补充与覆盖筛等价',
  nodes: [

    /* ------------------------------------------------- 环的局部化 */
    {
      id: 'prop.ring-localization',
      cluster: 'algebra.structures',
      type: 'example',
      label: '环的局部化 W⁻¹R',
      title: '环的局部化',
      regions: ['algebra', 'category'],
      tags: ['代数', '环', '局部化', '分式', '乘性子集'],
      statement: [
        '设 $R$ 是**交换环**，$W \\subseteq R$ 是**乘性子集**（$1 \\in W$，且 $f, g \\in W \\implies fg \\in W$）。',
        '',
        '把 $R$ 看作**单对象范畴**：唯一对象 $\\ast$，$\\operatorname{Hom}(\\ast, \\ast) = R$，复合就是乘法。它关于 $W$ 的局部化记作',
        '',
        '$$W^{-1}R,$$',
        '',
        '元素写成**分式** $r/w$（$r \\in R$、$w \\in W$）。'
      ].join('\n'),
      notes: [
        '⭐ **这就是范畴局部化最熟悉的一个例子。** 「把 $W$ 里的元素变成可逆元」这句话，在单对象范畴里就是「把 $W$ 里的态射变成同构」—— 和第「局部化」那条定义是同一件事。',
        '**等价关系**：分式之间按',
        '',
        '$$r/w = r\'/w\' \\iff \\exists s \\in W,\\quad s\\,(rw\' - r\'w) = 0$$',
        '',
        '相等（那个 $s$ 是必要的：$W$ 里可能有零因子，不加 $s$ 会出错）。运算是通常的分数运算 $r/w + r\'/w\' = (rw\' + r\'w)/(ww\')$、$(r/w)(r\'/w\') = rr\'/(ww\')$ —— 分母乘起来还在 $W$ 里，这正是**乘性子集**这个条件的用处。',
        '**两个标准例子**：$R = \\mathbb{Z}$、$W = \\mathbb{Z} \\setminus \\{0\\}$ 给出 $\\mathbb{Q}$；$R$ 一般、$W = \\{f^{n} : n \\ge 0\\}$ 给出「在 $f$ 处局部化」，把 $f$ 变成可逆元。',
        '⭐ **为什么要求 $W$ 乘性封闭**：不封闭的话分式之间没法相乘（分母不落在 $W$ 里），局部化的泛性质（它是「使 $W$ 中元素可逆」的最一般的环）就构造不出来。'
      ].join('\n\n'),
      refs: ['Lang, Algebra']
    },

    /* --------------------------------- 分式演算下的 Hom 是余极限 */
    {
      id: 'prop.localization-hom-colim',
      cluster: 'cat.basic',
      type: 'proposition',
      label: '局部化的 Hom 是滤过余极限',
      title: '$\\operatorname{Hom}_{\\mathrm{ho}}(X,Y) = \\varinjlim_{X\' \\to X \\in W} \\operatorname{Hom}(X\', Y)$',
      regions: ['category'],
      tags: ['范畴论', '局部化', '分式演算', '余极限', 'Ore 条件'],
      statement: [
        '设小范畴 $\\mathcal{C}$ 关于 $W$ 容许**右分式演算**。则',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{ho}(\\mathcal{C})}(X, Y) \\;=\\; \\varinjlim_{X\' \\to X \\in W} \\operatorname{Hom}_{\\mathcal{C}}(X\', Y),$$',
        '',
        '下标遍历所有 $w : X\' \\to X$（$w \\in W$），沿这些 $w$ 取**滤过**余极限。'
      ].join('\n'),
      notes: [
        ['**证明。** 沿用分式的写法：$\\operatorname{Hom}_{\\mathrm{ho}}(X, Y)$ 的元素是分式 $X \\xleftarrow{w} X\' \\xrightarrow{f} Y$（$w \\in W$）在等价关系下的类。','- **做成余极限**：记 $J$ 是以 $(w : X\'-\\!\\!\\to X) \\in W$ 为对象、以「$v : X\'\'-\\!\\!\\to X\'$ 且 $wv \\in W$」为态射的范畴，则','$$\\varinjlim_{(X\'\\to X)\\in J}\\operatorname{Hom}_{\\mathcal{C}}(X\', Y)$$','的元素正是「在某个 $X\'$ 上取一个 $f$，两个代表元在更小的 $X\'\'$ 上相同就算同一个」—— 与分式的等价关系逐条对齐 ✓。','- **$J$ 是滤过的**：给两个对象 $w_{1} : X_{1}\\to X$、$w_{2} : X_{2}\\to X$，由 **Ore 条件 2**（把 $w_{2}$ 提到 $w_{1}$ 前面）得到 $X\'\'$ 同时映到 $X_{1}$ 与 $X_{2}$，且两条复合都在 $W$ 里 —— 这就是余锥 ✓；两个平行态射的等化同样由 Ore 条件给出 ✓。','- 于是该余极限是**滤过**余极限，且它就是 $\\operatorname{Hom}_{\\mathrm{ho}}(X,Y)$ ✓。','于是局部化的 Hom「原则上无从下手」，在分式演算成立时变成一个可以计算的滤过余极限 ✓。∎'].join('\n'),
        '⭐ **把「形式添加的逆」变成具体的余极限。** 局部化的态射本来是「向右走一步、向左倒一步」的锯齿链，一般没法直接算；右分式演算保证了可以**通分**：找一个大一点的 $X\'$ 把几条链对齐，于是所有态射都可以看成「先在 $X\'$ 上走一步、再倒回 $X$」，也就是 $\\operatorname{Hom}_{\\mathcal{C}}(X\', Y)$ 里的一个元素。',
        '**为什么是余极限**：不同的 $X\' \\to X$ 给的是同一族态射的不同「表示」，取余极限正是「把这些表示粘起来」；而 Ore 条件保证这些 $X\' \\to X$ 组成的指标范畴是**滤过**的（任意两个都能被第三个同时压住），所以这个余极限是滤过余极限 —— 行为良好。',
        '⭐ **实用价值**：这一条把局部化的 Hom 集合**算成**原范畴里已知东西的滤过余极限。导出范畴 $D(\\mathcal{A})$ 里算 $\\operatorname{Hom}$ 就是从这一步开始的。',
        '⚠️ 没有分式演算时余极限**一般不对** —— 那时 $\\mathrm{ho}(\\mathcal{C})$ 的 Hom 可能连集合都不是。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §1.1']
    },

    /* -------------------------------------- 覆盖筛的四条等价 */
    {
      id: 'prop.sieve-covering-equivalent',
      cluster: 'cat.sheaf',
      type: 'proposition',
      label: '覆盖筛的四条等价',
      title: '覆盖筛的等价刻画（$\\widetilde{R} \\simeq \\underline{X}$）',
      regions: ['category'],
      tags: ['范畴论', '层', '筛', '覆盖', '层化'],
      statement: [
        '设 $\\mathcal{C}$ 是景，$X \\in \\mathcal{C}$，$R$ 是 $X$ 上的一个**筛**。则下列四条等价：',
        '',
        [
          '1. $R \\in J(X)$（即 $R$ 是 $X$ 上的**覆盖筛**）；',
          '2. $\\widetilde{R} \\simeq \\underline{X}$；',
          '3. $\\underline{X} \\simeq \\varinjlim_{Y \\in \\mathcal{C}/R} \\underline{Y}$；',
          '4. $\\coprod_{Y \\in \\mathcal{C}/R} \\underline{Y} \\longrightarrow \\underline{X}$ 是**满态射**。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '记号：$\\underline{X} := \\widetilde{h_{X}}$ 是 $X$ 对应的**层**；$\\mathcal{C}/R$ 是由「筛 $R$ 里的那些态射」组成的范畴（对象是 $f \\in R(Y)$，态射是使 $\\ast$ 交换的那些 $g$）。',
        '⭐ **读法**：第 1 条是「$R$ 被拓扑 $J$ 承认」，第 2、3、4 条都**只提到层**。所以这一条说的是：**「是不是覆盖」这件事可以由层来刻画，不必回头看 $J$。** 这正是「拓扑 $\\leftrightarrow$ 层范畴」那条对应能够一一对上的原因。',
        '**证明走法。** 合成 $R \\hookrightarrow h_{X} \\to \\widetilde{h_{X}} = \\underline{X}$ 唯一地延拓出 $u : \\widetilde{R} \\to \\underline{X}$（层化是左伴随，层是余完备的）。',
        '',
        [
          '- **$1 \\implies 2$**：$R \\in J(X)$ 时 $R \\to \\widetilde{R}$ 又由**层化的粘合公理**唯一延拓出 $v : \\underline{X} = \\widetilde{h_{X}} \\to \\widetilde{R}$；把 $v \\circ u$ 与 $u \\circ v$ 分别与 $R \\to \\widetilde{R}$、$h_{X} \\to \\underline{X}$ 比较，由延拓的**唯一性**它们分别是 $\\mathrm{id}_{\\widetilde{R}}$ 与 $\\mathrm{id}_{\\underline{X}}$，故 $u$ 是同构。',
          '- **$2 \\implies 1$**：设 $u$ 是同构。由**传递性公理**，只要造出一个 $R\' \\in J(X)$ 使每个 $f \\in R\'(Y)$ 都有 $f^{-1}(R) \\in J(Y)$ 就够了。由 2 有 $h_{X} \\to \\underline{X} \\cong \\widetilde{R} = \\mathcal{H}(\\mathcal{H}(R))$，于是可造出 $R\' \\in J(X)$ 与 $\\varphi : R\' \\to \\mathcal{H}(R)$。对 $f \\in R\'(Y)$，它在 $\\mathcal{H}(R)(Y)$ 里的像来自某个 $S \\to R$（$S \\in J(Y)$）—— 沿 $h_{Y} \\to R\' \\to \\mathcal{H}(R)$ 走一圈可知 $S \\subseteq f^{-1}(R)$，于是 $f^{-1}(R) \\in J(Y)$。再用一次传递性，得 $R \\in J(X)$。',
          '- **$2 \\iff 3$**：由「层化是左 Kan 延拓」（$\\sharp T = \\varinjlim_{X \\in \\mathcal{C}/T} \\underline{X}$）取 $T = R$，得 $\\widetilde{R} = \\sharp R = \\varinjlim_{Y \\in \\mathcal{C}/R} \\underline{Y}$。于是「$\\widetilde{R} = \\underline{X}$」与「$\\underline{X} = \\varinjlim_{Y \\in \\mathcal{C}/R} \\underline{Y}$」是同一句话。',
          '- **$3 \\implies 4$**：余极限是余积的**商** —— 自然映射 $\\coprod_{Y \\in \\mathcal{C}/R} \\underline{Y} \\to \\varinjlim_{Y} \\underline{Y}$ 总是满态射；3 成立时右端就是 $\\underline{X}$。',
          '- **$4 \\iff 2$**：靠一个恒等式。先看**预层**层面：$\\coprod_{Y \\in \\mathcal{C}/R} h_{Y} \\to h_{X}$ 的**像恰好是 $R$** —— 它在 $Z$ 处的像是「能穿过某个 $Y \\to X \\in R$ 的那些 $Z \\to X$」，而这正是筛的定义。再对两边作用 $\\sharp$：**层化是正合的**（保有限极限），正合函子保像，于是',
          '',
          '$$\\widetilde{R} \\;=\\; \\sharp\\Bigl(\\operatorname{im}\\bigl(\\coprod_{Y \\in \\mathcal{C}/R} h_{Y} \\to h_{X}\\bigr)\\Bigr) \\;=\\; \\operatorname{im}\\Bigl(\\coprod_{Y \\in \\mathcal{C}/R} \\underline{Y} \\to \\underline{X}\\Bigr).$$',
          '',
          '于是 4（那个映射是满态射）$\\iff$ 那个像是整个 $\\underline{X}$ $\\iff$ $\\widetilde{R} = \\underline{X}$ $\\iff$ 2。∎',
        ].join('\n'),
        '**一族态射的版本**（紧跟着的推论）：族 $(X_{i} \\to X)_{i \\in I}$ 生成覆盖筛 $\\iff \\coprod_{i \\in I} X_{i} \\to X$ 是满态射。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 3.2.12', 'Le Stum, Exercise 3.26']
    }
  ],

  edges: []
});
