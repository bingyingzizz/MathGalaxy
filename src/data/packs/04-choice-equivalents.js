/* ==========================================================================
   内容包 · 选择原理的几个经典等价形式
   --------------------------------------------------------------------------
   选择公理 ⟺ 良序定理 ⟺ 佐恩引理 ⟺ Hausdorff 极大原理 ⟺ Tukey 引理
   它们两两之间用「等价」黑线相连，点击黑线可以看到两个方向的证明。

   另外给出两条不经良序定理的**直连箭头**（笔记里的路线 1⟹2、2⟹1）：
     AC + Hartogs 定理 ⟹ 佐恩引理，佐恩引理 ⟹ AC
   —— Hartogs 定理在 ZF 里就能证，所以它能安全地用来证明「超限递归必停」。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '选择原理的等价形式',
  nodes: [

    {
      id: 'thm.wellordering',
      cluster: 'order.maximal',
      type: 'theorem',
      label: '良序定理',
      title: '良序定理 / 良序原理（Well-Ordering Theorem, Zermelo 1904）',
      // 既是集合论的定理，也是序理论的定理 → 落在两块的边界上
      regions: ['set-theory', 'order-theory'],
      tags: ['ZFC', '等价命题', '选择'],
      statement: [
        '每个集合都能被赋予一个良序：',
        '',
        '$$\\forall X \\exists\\preceq ( \\preceq\\text{ 是} X\\text{ 上的良序关系} )$$',
        '',
        '换句话说：任何集合 $X$ 都与某个序数等势。',
        '',
        '特别地，每个集合都有基数；实数集上存在良序（但这个良序无法被显式写出）。'
      ].join('\n'),
      notes: [
        'Zermelo 1904 年为证明「每个集合可良序」而明确提出了选择公理，这也是 AC 第一次登场。',
        '由良序定理可立刻得到**基数可比定理**：任意两个集合的基数都可比较大小。',
        '在 ZF 中不能证明它；但由它和 ZF 可推出 AC，所以两者等价。'
      ].join('\n\n'),
      refs: ['Zermelo (1904)', 'Kunen, Set Theory, I.12']
    },

    {
      id: 'lem.zorn',
      cluster: 'order.maximal',
      type: 'lemma',
      label: '佐恩引理',
      title: '佐恩引理（Zorn\'s Lemma）',
      // 表面是序理论陈述，主要用途却在集合论/代数 → 边界节点
      regions: ['order-theory', 'set-theory'],
      tags: ['ZFC', '等价命题', '极大原理'],
      statement: [
        '设 $(P, \\preceq )$ 是**非空**偏序集。若 $P$ 的每个链在 $P$ 中都有上界，则 $P$ 有**极大元**。',
        '',
        '$$P \\ne \\emptyset \\wedge  ( \\forall C \\subseteq P, C\\text{ 是链} \\to \\exists u \\in P, u\\text{ 是} C\\text{ 的上界} ) \\implies \\exists m \\in P, m\\text{ 是极大元}$$'
      ].join('\n'),
      notes: [
        '两个条件都不可省：空偏序集没有极大元；"每个链有上界"保证不了「最大元」——只能保证极大元。',
        '它是「存在性证明的万能发动机」：向量空间有基、环有极大理想、紧致性定理、Hahn–Banach 定理……全都靠它。',
        '名字有历史偶然性：Zorn 1940 年代把它推广开来，Kuratowski 1922 年已证过等价形式，所以也叫 Kuratowski–Zorn 引理。',
        '⚠ 非构造性：得到的是「存在一个极大元」，通常无法给出具体是哪一个。'
      ].join('\n\n'),
      refs: ['Zorn (1935)', 'Kunen, Set Theory, I.12']
    },

    {
      id: 'thm.hausdorff',
      cluster: 'order.maximal',
      type: 'theorem',
      label: 'Hausdorff 极大原理',
      title: 'Hausdorff 极大原理 / 极大公理（Hausdorff Maximal Principle, 1914）',
      regions: ['order-theory'],
      tags: ['ZFC', '等价命题', '极大原理', '链'],
      statement: [
        '设 $(P, \\preceq )$ 是偏序集，$C_{0} \\subseteq P$ 是链。则存在 $P$ 的**极大链** $M$ 使 $C_{0} \\subseteq M$。',
        '',
        '其中「极大链」指在包含关系 $\\subseteq$ 下极大的链：若 $M \\subseteq M\' \\subseteq P$ 且 $M\'$ 也是链，则 $M\' = M$。',
        '',
        '取 $C_{0} = \\emptyset$ 即得：**每个非空偏序集都有极大链。**'
      ].join('\n'),
      notes: [
        '形式上它比佐恩引理更早（Hausdorff, 1914），并且与佐恩引理等价。',
        '极大链的存在性正是「从下往上一点点加元素直到加不动」这一直觉的严格化。'
      ].join('\n\n'),
      refs: ['Hausdorff (1914)', 'Kunen, Set Theory, I.12']
    },

    {
      id: 'lem.tukey',
      cluster: 'order.maximal',
      type: 'lemma',
      label: 'Tukey 引理',
      title: 'Tukey 引理（Tukey\'s Lemma / Teichmüller–Tukey）',
      regions: ['order-theory'],
      tags: ['ZFC', '等价命题', '有限特征'],
      statement: [
        '设 $\\mathcal{A}$ 是**具有有限特征的非空集合族**，则 $(\\mathcal{A}, \\subseteq )$ 有极大元。',
        '',
        '即：存在 $A \\in \\mathcal{A}$，使得不存在 $B \\in \\mathcal{A}$ 满足 $A \\subsetneq B$。'
      ].join('\n'),
      notes: [
        'Tukey 引理的好处是「免验证」：只要目标族具有有限特征，就可以跳过「每个链都有上界」这一繁琐检查。',
        '例：线性无关集族具有有限特征（$X$ 线性无关 $\\iff X$ 的每个有限子集线性无关），所以「线性无关集可扩充为极大线性无关集」自动成立。',
        '等价形式：Teichmüller (1939) 与 Tukey (1940) 都独立陈述过它。'
      ].join('\n\n'),
      refs: ['Tukey (1940)', 'Jech, The Axiom of Choice, Ch. 2']
    },

    {
      id: 'thm.hartogs',
      cluster: 'set.choice',
      type: 'theorem',
      label: 'Hartogs 定理',
      title: 'Hartogs 定理（Hartogs\' Theorem, 1915）—— ZF 中即可证明',
      regions: ['set-theory'],
      tags: ['ZF', '序数', '基数', '不需要选择公理'],
      statement: [
        '对任意集合 $X$，都存在一个**不能单射进 $X$** 的序数；取其中最小的那个，记作 $\\aleph (X)$，叫做 $X$ 的 **Hartogs 数**（Hartogs 序数）。',
        '',
        '$$\\forall X \\exists\\alpha ( \\alpha \\hookrightarrow  X\\text{ 不成立} ),\\text{ 且} \\alpha = \\aleph(X)\\text{ 时}: \\forall\\beta < \\alpha, \\beta \\hookrightarrow  X\\text{ 成立}$$'
      ].join('\n'),
      notes: [
        '⭐⭐ **它在 ZF 里就能证，不需要选择公理。** 这是它最要紧的性质 —— 正因为不依赖 AC，它才能安全地用在「$AC \\implies$ 良序定理」「$AC \\implies$ 佐恩引理」这类证明里，用来说明超限递归**必定停下来**，而不至于循环论证。',
        '**证明思路**（全在 ZF 内）：设 𝒲 为 $X$ 的各个子集上的良序关系全体 —— 它是集合，因为 $𝒲 \\subseteq \\mathcal{P}(X \\times X)$。任意两个这样的良序，较短者必同构于较长者的一个初始段，故按「序型」它们两两可比；由替换公理，这些序型构成一个集合 $A$。$A$ 在 $\\in$ 下是传递的良序集，于是 **$A$ 本身就是一个序数 $\\alpha$**。若 $\\alpha$ 能单射进 $X$，把这个单射搬过去，就得到 $X$ 某个子集上的一个良序、其序型恰为 $\\alpha$，即 $\\alpha \\in A = \\alpha$ —— 与序数不能自属矛盾。故 $\\alpha$ 不能单射进 $X$。',
        '**它怎样让递归「停」**：超限递归每走一步就吐出 $X$ 的一个新元素。若一直走下去，就会得到 $\\aleph (X) \\to X$ 的单射，与 $\\aleph (X)$ 的定义直接冲突。所以递归必在某个 $\\alpha < \\aleph (X)$ 处停止。',
        '**一个立刻的推论**：序数全体不构成集合（Burali–Forti 悖论）。在 Hartogs 定理里取 $X =$ 全体序数即可 —— 每个序数都通过恒等映射单射进它。'
      ].join('\n\n'),
      refs: ['Hartogs (1915)', 'Kunen, Set Theory, I.11', 'Jech, The Axiom of Choice, Ch. 2']
    }
  ],

  edges: [

    /* ================================================== AC ⟺ 良序定理 */
    {
      id: 'eq.ac-wo',
      kind: 'equivalence',
      a: 'ax.choice',
      b: 'thm.wellordering',
      title: '选择公理 ⟺ 良序定理',
      proofs: [
        {
          label: '选择公理 ⇒ 良序定理（路线 1⟹4）',
          text: [
            '设 $X$ 是集合。$X = \\emptyset$ 时平凡，以下设 $X \\ne \\emptyset$。',
            '',
            '1. 由 AC，非空子集族 $\\mathcal{P}(X) \\setminus \\{\\emptyset \\}$ 上有选择函数 $\\varphi$，即 $\\varphi (A) \\in A$ 对每个非空 $A \\subseteq X$ 成立。',
            '',
            '2. 用超限递归往下取元素：对序数 $\\alpha$，只要余集非空就令',
            '',
            '$$x(\\alpha) = \\varphi( X \\setminus \\{ x(\\beta) : \\beta < \\alpha \\} )$$',
            '',
            '一旦余集为空就停止。',
            '',
            '3. **过程一定会停**：取 $X$ 的 **Hartogs 数** $\\aleph (X)$，即最小的不能单射进 $X$ 的序数（见「Hartogs 定理」——它在 ZF 里就能证，不需要 AC）。若对一切 $\\alpha < \\aleph (X)$ 过程都没停，则 $\\alpha \\mapsto x(\\alpha )$ 就是 $\\aleph (X)$ 到 $X$ 的单射，与 $\\aleph (X)$ 的定义矛盾。故存在序数 $\\gamma$ 使 $x : \\gamma \\to X$ 是双射。',
            '',
            '4. 把 $\\gamma$ 上的序经 $x$ 搬到 $X$ 上：',
            '',
            '$$a \\preceq b :\\iff x^{-1}(a) \\le x^{-1}(b)$$',
            '',
            '因为序数在 $\\in$／$\\le$ 下是良序的，$X$ 上这个序也是良序。∎'
          ].join('\n')
        },
        {
          label: '良序定理 ⇒ 选择公理（路线 4⟹1）',
          text: [
            '设 $F$ 是一族非空集合（即 $\\emptyset \\notin F$）。',
            '',
            '1. 由良序定理，取 $U = \\bigcup F$ 的一个良序 $\\preceq$。',
            '',
            '2. 对每个 $X \\in F$：$X \\ne \\emptyset$ 且 $X \\subseteq U$，所以 $X$ 是 $U$ 的非空子集，有 $\\preceq$最小元 m(X)。',
            '',
            '3. 定义 $f(X) = m(X)$（$X$ 唯一确定 m(X)，故这是一个函数）。则 $\\operatorname{dom} f = F$ 且 $f(X) \\in X$ 对一切 $X \\in F$ 成立，即 $f$ 是 $F$ 的选择函数。',
            '',
            '由 $F$ 的任意性，AC 成立。∎'
          ].join('\n')
        }
      ],
      note: '这是整张星图里最关键的一条等价链的起点：AC 给「挑选」，良序给「最小」，两者互为表里。'
    },

    /* ============================================ 良序定理 ⟺ 佐恩引理 */
    {
      id: 'eq.wo-zorn',
      kind: 'equivalence',
      a: 'thm.wellordering',
      b: 'lem.zorn',
      title: '良序定理 ⟺ 佐恩引理',
      proofs: [
        {
          label: '良序定理 ⇒ 佐恩引理',
          text: [
            '设 $(P, \\preceq )$ 是非空偏序集，且 $P$ 的每个链都有上界。由良序定理，取 $P$ 上的一个良序 $\\le$（与 $\\preceq$ 无关）。',
            '',
            '用超限递归沿 $\\le$ 构造 $P$ 的一个 $\\preceq$链 $C$：',
            '',
            '- 记 $U(C) = \\{ u \\in P : u$ 是 $C$ 的 $\\preceq$上界 }。',
            '- 若 U(C) 中存在元素有 $\\preceq$严格上界，就取其中 $\\le$最小的那个 $v$，令 $C \\leftarrow C \\cup \\{v\\}$；',
            '- 否则停止。',
            '',
            '**为什么必停**：每步都往 $C$ 里加入一个不属于 $C$ 的元素，所以若在任意序数处都不停，就会得到从「全体序数」到 $P$ 的单射。由替换公理模式，全体序数会是一个集合的像，即序数全体构成集合——这与 Burali-Forti 悖论矛盾。故递归在某个序数 $\\beta$ 处停止。',
            '',
            '**停止时 $C$ 有上界**：$C$ 是 $\\preceq$链，由题设 $U(C) \\ne \\emptyset$，取 $u \\in U(C)$。',
            '',
            '**$u$ 是极大元**：若存在 $w \\in P$ 使 $u \\prec w$，则 $w \\succ u \\succeq c$（$\\forall c \\in C$），故 $w \\in U(C)$ 是有严格上界的元素，与「停止条件」矛盾。',
            '',
            '故 $u$ 是 $P$ 的 $\\preceq$极大元。∎'
          ].join('\n')
        },
        {
          label: '佐恩引理 ⇒ 良序定理',
          text: [
            '设 $X$ 是集合。考虑「$X$ 的部分良序」全体：',
            '',
            '$$\\mathcal{W} = \\{ (W, \\preceq_W) : W \\subseteq X, \\preceq_W\\text{ 是} W\\text{ 上的良序} \\}$$',
            '',
            '按**初始段延拓**排序：',
            '',
            '$(W_{1}, \\preceq _{1}) \\le (W_{2}, \\preceq _{2}) \\iff W_{1} \\subseteq W_{2}$，$\\preceq _{1} = \\preceq _{2}|W_{1}$，且 $W_{1}$ 是 $(W_{2}, \\preceq _{2})$ 的一个前段。',
            '',
            '$1. (𝒲, \\le )$ 是偏序集（三条性质直接验证）。',
            '',
            '2. **每个链有上界**：设 $\\mathcal{D} \\subseteq 𝒲$ 是链。令 $W$* $= \\bigcup \\{ W : (W, \\preceq ) \\in \\mathcal{D} \\}$，在 $W$* 上定义',
            '',
            '$$x \\preceq_* y \\iff\\text{ 存在} (W, \\preceq_W) \\in \\mathcal{D}\\text{ 使} x, y \\in W\\text{ 且} x \\preceq_W y$$',
            '',
            '因 $\\mathcal{D}$ 是链，这些良序彼此兼容，$\\preceq _$* 是 $W$* 上的良序，且 (W*$\\preceq _$*$) \\in 𝒲$ 是 $\\mathcal{D}$ 的上界。',
            '',
            '3. 由佐恩引理，取极大元 $(W, \\preceq )$。',
            '',
            '4. 若 $W \\ne X$，取 $x \\in X \\setminus W$，在 $W \\cup \\{x\\}$ 上定义序：保留 $W$ 上的 $\\preceq$，并令所有 $w \\in W$ 都 $\\preceq x$（把 $x$ 放在最顶端）。这仍是良序，而且是 $(W, \\preceq )$ 的严格延拓，与极大性矛盾。故 $W = X$，即 $X$ 被良序化。∎'
          ].join('\n')
        }
      ]
    },

    /* ====================================== 佐恩引理 ⟺ Hausdorff 极大原理 */
    {
      id: 'eq.zorn-hausdorff',
      kind: 'equivalence',
      a: 'lem.zorn',
      b: 'thm.hausdorff',
      title: '佐恩引理 ⟺ Hausdorff 极大原理',
      proofs: [
        {
          label: '佐恩引理 ⇒ Hausdorff 极大原理（路线 2⟹3）',
          text: [
            '设 $(P, \\preceq )$ 是偏序集，$C_{0} \\subseteq P$ 是链。令',
            '',
            '$$\\mathcal{C} = \\{ C \\subseteq P : C\\text{ 是链} \\}$$',
            '',
            '按包含关系 $\\subseteq$ 排序。给定 $C_{0}$ 时改用 $\\mathcal{C}_{0} = \\{ C \\in \\mathcal{C} : C \\supseteq C_{0} \\}$，它非空（$C_{0} \\in \\mathcal{C}_{0}$）。',
            '',
            '1. **$\\mathcal{C}_{0}$ 中每个链有上界**：设 $\\mathcal{D} \\subseteq \\mathcal{C}_{0}$ 是（$\\subseteq$）链，即 $\\mathcal{D}$ 是一族两两可比较的链。令 $U = \\bigcup \\mathcal{D}$。任取 $x, y \\in U$，则有 $D_{1}, D_{2} \\in \\mathcal{D}$ 使 $x \\in D_{1}$、$y \\in D_{2}$；因 $\\mathcal{D}$ 是链，不妨设 $D_{1} \\subseteq D_{2}$，于是 $x, y \\in D_{2}$，而 $D_{2}$ 是链，故 $x$ 与 $y$ 可比。所以 $U$ 是链。又每个 $D \\in \\mathcal{D}$ 都 $\\supseteq C_{0}$，故 $U \\supseteq C_{0}$，即 $U \\in \\mathcal{C}_{0}$，它是 $\\mathcal{D}$ 的上界。',
            '',
            '2. 由佐恩引理，$\\mathcal{C}_{0}$ 有极大元 $M$。$M$ 是包含 $C_{0}$ 的链，且不能再变大，即 $M$ 是包含 $C_{0}$ 的极大链。∎'
          ].join('\n')
        },
        {
          label: 'Hausdorff 极大原理 ⇒ 佐恩引理（路线 3⟹2）',
          text: [
            '设 $(P, \\preceq )$ 是非空偏序集，且 $P$ 的每个链都有上界。',
            '',
            '1. 由 Hausdorff 极大原理（取 $C_{0} = \\emptyset$），$P$ 存在极大链 $M$。',
            '',
            '2. M 是链，故由题设有上界 $u \\in P$。',
            '',
            '3. **断言 $u$ 是极大元**：若不然，存在 $v \\in P$ 使 $u \\prec v$。则 $M \\cup \\{v\\}$ 仍是链——任取 $m \\in M$，由 $m \\preceq u \\prec v$ 及传递性得 $m \\preceq v$，故 $m$ 与 $v$ 可比。于是 $M \\subsetneq M \\cup \\{v\\}$ 是一个更大的链，与 $M$ 的极大性矛盾。',
            '',
            '故 $u$ 是 $P$ 的极大元。∎'
          ].join('\n')
        }
      ]
    },

    /* ======================================= Hausdorff 极大原理 ⟺ Tukey 引理 */
    {
      id: 'eq.hausdorff-tukey',
      kind: 'equivalence',
      a: 'thm.hausdorff',
      b: 'lem.tukey',
      title: 'Hausdorff 极大原理 ⟺ Tukey 引理',
      proofs: [
        {
          label: 'Tukey 引理 ⇒ Hausdorff 极大原理',
          text: [
            '设 $(P, \\preceq )$ 是偏序集，$C_{0} \\subseteq P$ 是链。令 $\\mathcal{C} = \\{ C \\subseteq P : C$ 是链 }。',
            '',
            '1. **$\\mathcal{C}$ 具有有限特征**：对任意 $X \\subseteq P$，',
            '',
            '$X$ 是链 $\\iff X$ 中任两元素可比 $\\iff X$ 的每个有限子集是链 $\\iff X$ 的每个有限子集属于 $\\mathcal{C}$。',
            '',
            '（最后一个 $\\Longleftarrow$ 方向：任取 $x, y \\in X$，则 {x, y} 是 $X$ 的有限子集，属于 $\\mathcal{C}$，故 $x$ 与 $y$ 可比。）',
            '',
            '$2. \\mathcal{C}$ 非空（$\\emptyset$ 是链）。由 Tukey 引理，$\\mathcal{C}$ 有极大元 $M$，即 $P$ 的极大链。',
            '',
            '3. 若要包含给定的 $C_{0}$：注意 $\\mathcal{C}_{0} = \\{ C \\in \\mathcal{C} : C \\supseteq C_{0} \\}$ 同样具有有限特征——「$X$ 含 $C_{0}$ 且 $X$ 的每个有限子集是链」正是有限特征的形状（含 $C_{0}$ 是整体性质，不对有限子集设限）。对 $\\mathcal{C}_{0}$ 用 Tukey 引理即得包含 $C_{0}$ 的极大链。∎'
          ].join('\n')
        },
        {
          label: 'Hausdorff 极大原理 ⇒ Tukey 引理',
          text: [
            '设 $\\mathcal{A}$ 是具有有限特征的非空集合族。把 Hausdorff 极大原理用在偏序集 $(\\mathcal{A}, \\subseteq )$ 上，得到 $\\mathcal{A}$ 的一个**极大链** $\\mathcal{C}$（即 $\\mathcal{A}$ 中一族在 $\\subseteq$ 下两两可比较、且不能再扩大成员的子族）。',
            '',
            '令',
            '',
            '$$U = \\bigcup \\{ A : A \\in \\mathcal{C} \\}$$',
            '',
            '1. **$U \\in \\mathcal{A}$**：由有限特征，只需证 $U$ 的每个有限子集属于 $\\mathcal{A}$。设 $S \\subseteq U$ 有限，则每个 $s \\in S$ 落在某个 $A_s \\in \\mathcal{C}$ 中；$\\mathcal{C}$ 是 $\\subseteq$链而 $S$ 有限，故其中必有最大的 $A_{0}$ 包含 $S$（即 $S \\subseteq A_{0}$）。因为 $A_{0} \\in \\mathcal{A}$ 且 $\\mathcal{A}$ 具有有限特征，$A_{0}$ 的每个有限子集都属于 $\\mathcal{A}$，特别地 $S \\in \\mathcal{A}$。故 $U$ 的每个有限子集属于 $\\mathcal{A}$，从而 $U \\in \\mathcal{A}$。',
            '',
            '2. **$U$ 是极大元**：若存在 $B \\in \\mathcal{A}$ 使 $U \\subsetneq B$，则 $\\mathcal{C} \\cup \\{B\\}$ 仍是 $\\subseteq$链（每个 $A \\in \\mathcal{C}$ 满足 $A \\subseteq U \\subseteq B$），与 $\\mathcal{C}$ 的极大性矛盾。',
            '',
            '故 $U$ 是 $(\\mathcal{A}, \\subseteq )$ 的极大元。∎'
          ].join('\n')
        }
      ],
      note: '这一对证明很典型：先看出「链」这个概念本身具有有限特征，就把 Hausdorff 原理换成了用起来更省事的 Tukey 引理。'
    },

    /* ===================== AC + Hartogs ⟹ 佐恩引理（不经良序定理）===================== */
    {
      id: 'imp.hartogs-zorn',
      kind: 'implication',
      sources: ['ax.choice', 'thm.hartogs'],
      target: 'lem.zorn',
      title: '选择公理 + Hartogs 定理 ⟹ 佐恩引理（路线 1⟹2）',
      proof: [
        '设 $(P, \\preceq )$ 是非空偏序集，且 $P$ 的每个链都有上界。目标是造出一个极大元。',
        '',
        '**① 一个选择函数**：由 AC，$\\mathcal{P}(P) \\setminus \\{\\emptyset \\}$ 上有选择函数 $\\varphi$，即 $\\varphi (A) \\in A$ 对每个非空 $A \\subseteq P$ 成立。整段证明只挑这一次。',
        '',
        '**② 链的严格上界**：对链 $C \\subseteq P$ 记',
        '',
        '$$S(C) = \\{ p \\in P : \\forall c \\in C, p \\succ  c \\}$$',
        '',
        '（约定 $S(\\emptyset ) = P$。）注意「$C$ 有上界」与「$S(C) \\ne \\emptyset$」不是一回事：$S$ 要的是**严格**上界。',
        '',
        '**③ 超限递归**：只要 $S$ 非空就往下走 ——',
        '',
        '$$p(\\alpha) = \\varphi( S(\\{ p(\\beta) : \\beta < \\alpha \\}) )\\quad \\text{ 只要} S(\\{ p(\\beta) : \\beta < \\alpha \\}) \\ne \\emptyset;\\text{ 一旦} S\\text{ 为空就停}$$',
        '',
        '于是得到一列严格递增的 $p(0) \\prec p(1) \\prec p(2) \\prec \\cdots$。第 0 步用 $S(\\emptyset ) = P \\ne \\emptyset$，所以 $p(0) = \\varphi (P)$ 有定义。',
        '',
        '**④ 必停**：由 **Hartogs 定理**，$\\aleph (P)$ 是不能单射进 $P$ 的最小序数。把递归的上限取到 $\\aleph (P)$ 就够 —— 若对一切 $\\alpha < \\aleph (P)$ 都不停，则 $\\alpha \\mapsto p(\\alpha )$ 就是一个单射 $\\aleph (P) \\to P$，与 $\\aleph (P)$ 的定义矛盾。故存在 $\\alpha _{0} < \\aleph (P)$ 使 $S(\\{ p(\\beta ) : \\beta < \\alpha _{0} \\}) = \\emptyset$。（这一步只用到 ZF，不用 AC。）',
        '',
        '**⑤ 停下来就给极大元**：令 $C = \\{ p(\\beta ) : \\beta < \\alpha _{0} \\}$，它是 $P$ 的一个链（而且是严格递增的），由题设存在上界 $u \\in P$。',
        '',
        '**⑥ $u$ 是极大元**：若存在 $v \\in P$ 使 $u \\prec v$，则由 $u \\succeq c$（$\\forall c \\in C$）与传递性得 $v \\succ c$（$\\forall c \\in C$），即 $v \\in S(C)$ —— 与 $S(C) = \\emptyset$ 矛盾。故 $u$ 是 $P$ 的极大元。∎',
        '',
        '$>$ 这一路线的分工很干净：**AC 负责「挑」，Hartogs 负责「停」**。对比之下，经由良序定理的证法（见「良序定理 $\\iff$ 佐恩引理」那条黑线）是把「停」交给 Burali–Forti 悖论。'
      ].join('\n'),
      note: '比走良序定理更直：整段只挑一次元素，终止性由 Hartogs 定理（ZF 可证）兜底。'
    },

    /* ============================ 佐恩引理 ⟹ 选择公理 ============================ */
    {
      id: 'imp.zorn-choice',
      kind: 'implication',
      sources: ['lem.zorn'],
      target: 'ax.choice',
      title: '佐恩引理 ⟹ 选择公理（路线 2⟹1）',
      proof: [
        '设 $\\{A_i\\}_\\{i \\in I\\}$ 是一族非空集合。要对它造出一个选择函数。',
        '',
        '**① 舞台：部分选择函数全体**。令',
        '',
        '$$\\mathcal{F} = \\{ f : f\\text{ 是函数}, dom f \\subseteq I,\\text{ 且} \\forall i \\in dom f, f(i) \\in A_i \\}$$',
        '',
        '按包含关系 $\\subseteq$ 排序。$\\mathcal{F} \\ne \\emptyset$（空函数在 $\\mathcal{F}$ 中），且 $(\\mathcal{F}, \\subseteq )$ 是偏序集。',
        '',
        '**② 每个链有上界**：设 $\\mathcal{D} \\subseteq \\mathcal{F}$ 是 $\\subseteq$链，令 $f = \\bigcup \\mathcal{D}$。',
        '',
        '$f$ 是函数：若 $(i, a), (i, a\') \\in f$，则它们分别属于某个 $f_{1}, f_{2} \\in \\mathcal{D}$；$\\mathcal{D}$ 是链，不妨设 $f_{1} \\subseteq f_{2}$，于是 $(i, a), (i, a\') \\in f_{2}$，而 $f_{2}$ 是函数，故 $a = a\'$。',
        '$f \\in \\mathcal{F}$：$\\operatorname{dom} f = \\bigcup _\\{g \\in \\mathcal{D}\\} \\operatorname{dom} g \\subseteq I$，且对 $i \\in \\operatorname{dom} f$ 有 $f(i) \\in A_i$。',
        '$f$ 是 $\\mathcal{D}$ 的上界：$f \\supseteq g$ 对一切 $g \\in \\mathcal{D}$ 成立。',
        '',
        '**③ 用佐恩引理**，取 $(\\mathcal{F}, \\subseteq )$ 的极大元 $f$。',
        '',
        '**④ 极大元必须「定义在全体 $I$ 上」**：若存在 $i_{0} \\in I \\setminus \\operatorname{dom} f$，由 $A_\\{i_{0}\\} \\ne \\emptyset$ 取 $a \\in A_\\{i_{0}\\}$，则',
        '',
        '$$f\' = f \\cup \\{ (i_0, a) \\}$$',
        '',
        '仍是 $\\mathcal{F}$ 中的元素（$i_{0} \\notin \\operatorname{dom} f$，不破坏函数性），且 $f \\subsetneq f\'$ —— 与 $f$ 的极大性矛盾。故 $\\operatorname{dom} f = I$。',
        '',
        '**⑤** 于是 $f : I \\to \\bigcup _\\{i \\in I\\} A_i$ 且 $f(i) \\in A_i$ 对一切 $i$ 成立，即 $f$ 是这族集合的选择函数。由族的任意性，AC 成立。∎'
      ].join('\n'),
      note: '「按包含序取极大元，再证明它已经没法再大」—— 这是用佐恩引理造存在性对象的典型手法。'
    }
  ]
});
