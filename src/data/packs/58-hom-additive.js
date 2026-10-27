/* ==========================================================================
   内容包 · 加法范畴的收尾（定义 5.1.5 + 练习 5.1~5.1.7）
   --------------------------------------------------------------------------
   第 5 章开头的「加法 / 阿贝尔范畴」那一节还差两件事：
     ① 核与余核在**对象层面**的定义（核 = 与零态射的等化子）——
        图上到处在用「核」，却没有一条节点把它定义下来；
     ② 那一节的练习题：零对象与终对象、双积与积、加性结构的唯一性、
        加法函子的刻画、伴随函子的加性、正合列构成的子范畴。

   两条主线：
     零对象 / 双积 ──▶ 加法函子的刻画 ──▶ 伴随自动加法
     核 / 余核     ──▶ 左正合 / 右正合 ──▶ 正合列构成的子范畴
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '加法范畴的基本性质',
  nodes: [

    /* ------------------------------------------------- 核与余核 */
    {
      id: 'def.kernel-cokernel',
      cluster: 'hom.ab',
      type: 'definition',
      label: '核与余核',
      title: '核 / 余核与左正合、右正合列',
      regions: ['category'],
      tags: ['定义', '范畴论', '核', '余核', '正合列'],
      statement: [
        '设 $\\mathcal{C}$ 是（预）加法范畴，$f : M \\to N$。',
        '',
        '- $f$ 的**核** $\\ker f := \\ker(f, 0)$ 是 $f$ 与**零态射** $0_{M,N}$ 的**等化子**（若存在）；',
        '- $f$ 的**余核** $\\operatorname{coker} f$ 是 $f$ 在 $\\mathcal{C}^{\\mathrm{op}}$ 中的核（若存在），也就是 $f$ 与零态射的**余等化子**；',
        '- 列 $0 \\to M\' \\xrightarrow{f} M \\xrightarrow{g} M\'\'$ 叫**左正合的**，如果 $f$ 实现 $\\ker g$（即 $M\' \\cong \\ker g$）；对偶地 $M \\xrightarrow{g} M\'\' \\to 0$ 叫**右正合的**，如果 $g$ 实现 $\\operatorname{coker} g$；',
        '- 既左正合又右正合的列 $0 \\to M\' \\xrightarrow{\\varphi} M \\xrightarrow{\\psi} M\'\' \\to 0$ 叫**短正合列**，此时称 $M$ 是 $M\'$ 被 $M\'\'$ 的**扩张**。'
      ].join('\n'),
      notes: [
        '**为什么核取「等化子」而不是「原像」**：$f$ 与 $0_{M,N}$ 的等化子是「一切被 $f$ 杀掉的态射」的**泛对象** —— 它比「$f^{-1}(0)$」基本得多，因为一般范畴里根本没有元素可取原像。（在 $\\mathbf{Ab}$ 里两者一致：$\\ker f = f^{-1}(0)$。）',
        '**加法范畴里核与余核的行为是规则的**：$\\ker f \\to M$ 一定是**单态射**、$M \\to \\operatorname{coker} f$ 一定是**满态射**（等化子必单、余等化子必满，这不需要阿贝尔范畴的假设）。',
        '⚠️ 「每个态射都有核与余核」还**不够**：预阿贝尔范畴里 $\\operatorname{coim} f \\to \\operatorname{im} f$ 一般不是同构，阿贝尔范畴正是把这个缺口补上的那一条条件。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ------------------------------------------- 零对象 ⟺ 终对象 */
    {
      id: 'prop.zero-object-final-criterion',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '零对象与终对象',
      title: '命题：预加性范畴里零对象 $\\iff$ 终对象 $\\iff$ 始对象',
      regions: ['category'],
      tags: ['命题', '范畴论', '零对象', '预加性'],
      statement: [
        '设 $\\mathcal{C}$ 是**预加性范畴**，$M \\in \\mathcal{C}$。则',
        '',
        '$$M \\text{ 是零对象} \\iff M \\text{ 是终对象} \\iff M \\text{ 是始对象}.$$'
      ].join('\n'),
      notes: [
        ['**证明。** 预加性给每个 $\\operatorname{Hom}(X,Y)$ 一个阿贝尔群结构，且复合**双线性** —— 于是**零态射**永远存在（它就是群的单位元），并且由双线性把 $0 + h = h$ 展开得','$$0_{Y,Z}\\circ h = 0_{X,Z}, \\qquad f\\circ 0_{X,Y} = 0_{X,Z} ✓$$','**终对象 $\\implies$ 零对象**：$M$ 终对象时 $\\operatorname{End}(M) = \\{1_{M}\\}$ 只有一个元素；而它是阿贝尔群，群里的唯一元素必是单位元，故 $1_{M} = 0_{M}$ ✓。','**零对象 $\\implies$ 终对象**：设 $1_{M} = 0_{M}$。任给 $X$ 与 $f, g : X \\to M$，由双线性','$$f = 1_{M}\\circ f = 0_{M}\\circ f = 0_{X,M}, \\qquad g = 0_{X,M},$$','故 $f = g$：$\\operatorname{Hom}(X,M)$ 至多一个元素，而它非空（有零态射），所以 $M$ 是终对象 ✓。','**始对象**：把整个论证搬到 $\\mathcal{C}^{\\mathrm{op}}$ 即可 ✓。∎'].join('\n'),
        '⭐ 于是「零对象」有两条等价说法：$\\operatorname{End}(M) = 1$（$1_{M} = 0_{M}$），以及「既是终对象又是始对象」—— 在预加性范畴里它们完全等价，可以随意挑方便的那条用。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* --------------------------------------------- 双积 = 积 = 余积 */
    {
      id: 'prop.biproduct-is-product',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '直和就是积',
      title: '命题：预加性范畴里直和 $\\iff$ 积 $\\iff$ 余积',
      regions: ['category'],
      tags: ['命题', '范畴论', '双积', '直和', '积'],
      statement: [
        '设 $\\mathcal{C}$ 是预加性范畴，$M, M_{1}, M_{2} \\in \\mathcal{C}$。',
        '',
        '$$M \\text{ 是} M_{1}, M_{2} \\text{ 的直和} \\iff (M, p_{1}, p_{2}) \\text{ 是} M_{1}, M_{2} \\text{ 的积} \\iff (M, i_{1}, i_{2}) \\text{ 是余积},$$',
        '',
        '其中「直和」指存在 $p_{k} : M \\to M_{k}$、$i_{k} : M_{k} \\to M$ 使',
        '',
        '$$p_{1}i_{1} = 1_{M_{1}}, \\qquad p_{2}i_{2} = 1_{M_{2}}, \\qquad i_{1}p_{1} + i_{2}p_{2} = 1_{M}.$$'
      ].join('\n'),
      notes: [
        ['**证明。** **① 先推出正交性。** 把 $i_{1}p_{1} + i_{2}p_{2} = 1_{M}$ 夹在 $p_{1}$ 与 $i_{2}$ 之间：','$$p_{1}i_{2} = p_{1}(i_{1}p_{1} + i_{2}p_{2})i_{2} = (p_{1}i_{1})(p_{1}i_{2}) + (p_{1}i_{2})(p_{2}i_{2}) = p_{1}i_{2} + p_{1}i_{2},$$','两边在阿贝尔群 $\\operatorname{Hom}(M_{2},M_{1})$ 里减去 $p_{1}i_{2}$，得 $p_{1}i_{2} = 0$ ✓；对称地 $p_{2}i_{1} = 0$。合起来就是 $p_{k}i_{l} = \\delta_{kl}$ ✓。','**② 直和 $\\implies$ 是积。** 给 $f_{k} : X \\to M_{k}$，令 $f := i_{1}f_{1} + i_{2}f_{2}$。由 ① 得 $p_{k}f = f_{k}$ ✓。唯一性：若 $h$ 也满足 $p_{k}h = f_{k}$，则','$$h = 1_{M}\\,h = (i_{1}p_{1} + i_{2}p_{2})h = i_{1}f_{1} + i_{2}f_{2} = f ✓$$','故 $(M,p_{1},p_{2})$ 是积 ✓。','**③ 是积 $\\implies$ 直和。** 设 $(M,p_{1},p_{2})$ 是积。由积的泛性取**唯一**的 $i_{k} : M_{k} \\to M$ 使 $p_{l}i_{k} = \\delta_{lk}$，于是 $p_{k}i_{k} = 1_{M_{k}}$ ✓；又 $i_{1}p_{1} + i_{2}p_{2}$ 与 $1_{M}$ 的两个投影都是 $p_{l}$，由积的唯一性两者相等 ✓。','**④ 余积。** 把 ② ③ 搬到 $\\mathcal{C}^{\\mathrm{op}}$（积与余积互换、$i$ 与 $p$ 互换）即得 ✓。∎','⭐ 这就是**双积**（biproduct）这个名字的来历：积与余积在预加性范畴里重合，所以直和只需要谈一个对象。'].join('\n'),
        '**为什么加法范畴一定要有双积**：正因为两者重合，才可以把「加」（$f + g$）与「余积的含入」写在同一套符号里 —— 这是整个同调代数记号的地基。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ------------------------------------- 预加性结构唯一 */
    {
      id: 'prop.hom-enrichment-unique',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '预加性结构唯一',
      title: '命题：加法范畴里 $\\operatorname{Hom}$ 的阿贝尔群结构唯一',
      regions: ['category'],
      tags: ['命题', '范畴论', '加法范畴', '双积'],
      statement: [
        '设 $\\mathcal{C}$ 是**加法范畴**。则使复合双线性、并与直和结构相容的 $\\operatorname{Hom}_{\\mathcal{C}}(M,N)$ 的阿贝尔群结构是**唯一**的。'
      ].join('\n'),
      notes: [
        ['**证明。** 记 $\\Delta_{M} : M \\to M \\oplus M$ 是由**积**的泛性给出的「对角线」（$p_{k}\\Delta_{M} = 1_{M}$）、$\\nabla_{N} : N \\oplus N \\to N$ 是由**余积**的泛性给出的「余对角线」（$\\nabla_{N}i_{k} = 1_{N}$）、$f \\oplus g : M \\oplus M \\to N \\oplus N$ 是由四个角 $p_{k}(f\\oplus g)i_{l} = \\delta_{kl}\\,(f \\text{ 或 } g)$ 刻画的映射。这三个映射**只用到直和的对象、投影与含入**，与任何群结构无关 ✓。','**关键公式**：','$$f + g = \\nabla_{N}\\circ (f \\oplus g)\\circ \\Delta_{M}.$$','验证：由 $p_{k}(f\\oplus g) = (\\text{第} k \\text{分量})p_{k}$ 得 $(f\\oplus g)\\Delta_{M}$ 的两个分量恰是 $f$ 与 $g$，即 $(f\\oplus g)\\Delta_{M} = i_{1}f + i_{2}g$；再作用 $\\nabla_{N}$，用 $\\nabla_{N}i_{k} = 1_{N}$ 得 $f + g$ ✓。（这一步的**计算**用到了群结构，但公式右边本身不依赖它。）','**唯一性**：既然「$f$ 与 $g$ 的和」等于一个只由范畴结构与直和写出的表达式，任何使复合双线性的群结构都必须满足同一公式，故与它逐对一致 ✓。∎'].join('\n'),
        '⭐ 一句话：**加法范畴里的「加」不是额外数据，而是双积结构逼出来的。** 这也是为什么「加法函子」可以只要求「保双积」——见「加法函子的刻画」。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ----------------------------------- 加法函子的刻画 */
    {
      id: 'prop.additive-iff-preserves-biproduct',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '加法函子的刻画',
      title: '命题：$F$ 加法 $\\iff$ 保零对象与直和 $\\iff$ 保有限积',
      regions: ['category'],
      tags: ['命题', '范畴论', '加法函子', '双积'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{D}$ 是加法范畴，$F : \\mathcal{C} \\to \\mathcal{D}$ 是函子。则三者等价：',
        '',
        '$$F \\text{ 加法} \\iff F \\text{ 保零对象与所有直和} \\iff F \\text{ 保所有有限积} \\iff F \\text{ 保所有有限余积}.$$'
      ].join('\n'),
      notes: [
        ['**证明。** **① 加法 $\\implies$ 保双积。** $F$ 加法意味着每个 $\\operatorname{Hom}(M,N) \\to \\operatorname{Hom}(FM,FN)$ 是群同态。若 $M$ 是 $M_{1},M_{2}$ 的双积，$F$ 把三条等式送到','$$F(p_{k})F(i_{k}) = 1, \\qquad F(i_{1})F(p_{1}) + F(i_{2})F(p_{2}) = 1_{F(M)},$$','这正是「$F(M)$ 是 $F(M_{1}), F(M_{2})$ 的双积」的定义 ✓；有限多支同理。零对象：$1_{F(0)} = F(1_{0}) = F(0_{0}) = 0_{F(0)}$（群同态把零元送到零元），故 $F(0)$ 是零对象 ✓。','**② 保双积与零对象 $\\implies$ 加法。** 用上面的关键公式 $f + g = \\nabla_{N}(f\\oplus g)\\Delta_{M}$。$F$ 保积、保余积，故 $F(\\Delta_{M}) = \\Delta_{FM}$、$F(\\nabla_{N}) = \\nabla_{FN}$（这三个映射都由「与投影 / 含入复合是什么」唯一刻画，而 $F$ 保投影与含入），且 $F(f \\oplus g) = Ff \\oplus Fg$（由四角刻画同样唯一）。于是','$$F(f+g) = F(\\nabla_{N})F(f\\oplus g)F(\\Delta_{M}) = \\nabla_{FN}(Ff\\oplus Fg)\\Delta_{FM} = Ff + Fg ✓$$','故 $\\operatorname{Hom}(M,N) \\to \\operatorname{Hom}(FM,FN)$ 保加法；它当然保零，所以是群同态，即 $F$ 加法 ✓。','**③ 有限积 / 有限余积**：加法范畴里有限积、有限余积、直和三者重合（见「直和就是积」），所以三个条件说的是同一件事；空积是终对象、空余积是始对象，都是零对象 ✓。∎'].join('\n'),
        '⭐ 实用价值：验一个函子加法，只需验它**保双积**，不必去碰 $\\operatorname{Hom}$ 上的群结构。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ------------------------------------ 伴随函子自动加法 */
    {
      id: 'prop.adjoint-additive',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '伴随函子都加法',
      title: '命题：加法范畴之间的伴随函子都是加法函子',
      regions: ['category'],
      tags: ['命题', '范畴论', '伴随', '加法函子'],
      statement: [
        '设 $\\mathcal{C}, \\mathcal{D}$ 是加法范畴，$F : \\mathcal{C} \\to \\mathcal{D}$ 左伴随 $G : \\mathcal{D} \\to \\mathcal{C}$（记 $F \\dashv G$）。则 $F$ 与 $G$ **都加法**，并且伴随的双射',
        '',
        '$$\\operatorname{Hom}_{\\mathcal{D}}(FM, N) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}(M, GN)$$',
        '',
        '是**阿贝尔群**的同构（对 $M$、$N$ 都自然）。'
      ].join('\n'),
      notes: [
        ['**证明。** 记单位 $\\eta$、余单位 $\\varepsilon$，则双射由 $\\varphi(f) := G(f)\\circ\\eta_{M}$ 给出。','**① 右伴随保积**：$G$ 保极限，特别保积。于是 $G(f\\oplus g) = Gf \\oplus Gg$（由四角刻画），而 $G(\\Delta_{M}) = \\Delta_{GM}$、$G(\\nabla_{N}) = \\nabla_{GN}$：后一条要点一下 —— $G(N\\oplus N) \\cong GN \\times GN$ 作为**积**，而 $G(i_{k})$ 的两个分量是 $G(p_{l})G(i_{k}) = G(\\delta_{lk}) = \\delta_{lk}$，故 $G(i_{k})$ 就是双积的含入，$G(\\nabla_{N})$ 满足 $G(\\nabla_{N})G(i_{k}) = 1$，即余对角线 ✓。','**② $G$ 在 $\\operatorname{Hom}$ 上保加法**：把关键公式 $f + g = \\nabla(f\\oplus g)\\Delta$ 作用 $G$，用 ①：','$$G(f+g) = G(\\nabla_{N})G(f\\oplus g)G(\\Delta_{M}) = \\nabla_{GN}(Gf\\oplus Gg)\\Delta_{GM} = Gf + Gg ✓$$','**③ 双射是群同态**：由 $\\varphi(f) = G(f)\\eta_{M}$ 与复合的双线性，','$$\\varphi(f+g) = G(f+g)\\,\\eta_{M} = (Gf + Gg)\\,\\eta_{M} = Gf\\,\\eta_{M} + Gg\\,\\eta_{M} = \\varphi(f) + \\varphi(g) ✓$$','故 $\\varphi$ 是群同态，从而是群同构 ✓。','**④ $F$ 也加法**：把整个论证搬到 $\\mathcal{C}^{\\mathrm{op}}, \\mathcal{D}^{\\mathrm{op}}$（此时伴随反向：$G^{\\mathrm{op}} \\dashv F^{\\mathrm{op}}$，且两个范畴仍是加法范畴 —— 加法范畴的定义对 $\\mathrm{op}$ 对称），得 $F^{\\mathrm{op}}$ 在 $\\operatorname{Hom}$ 上保加法，即 $F$ 也保加法 ✓。∎'].join('\n'),
        '⭐ 一句话：**一旦有伴随，加法是白送的。** 所以「加法范畴之间的伴随」永远可以当作加性伴随来用，$\\operatorname{Hom}(FM,N) \\cong \\operatorname{Hom}(M,GN)$ 也就自动升级成群同构。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* ---------------------------------- 正合列构成的子范畴 */
    {
      id: 'prop.exact-sequence-subcategory',
      cluster: 'hom.ab',
      type: 'proposition',
      label: '正合列构成子范畴',
      title: '命题：左 / 右 / 短正合列构成加法子范畴',
      regions: ['category'],
      tags: ['命题', '范畴论', '正合列', '加法子范畴'],
      statement: [
        '设 $\\mathcal{C}$ 是阿贝尔范畴，$\\mathcal{C}^{3}$ 是**可复合的态射对**构成的范畴（对象是 $M\' \\to M \\to M\'\'$，态射是三个分量相容的比较映射）。则左正合列、右正合列、短正合列各自构成 $\\mathcal{C}^{3}$ 的一个**加法子范畴**。'
      ].join('\n'),
      notes: [
        ['**证明。**','**① 是（全）子范畴。** 正合性是列**本身**的性质，与比较映射无关，所以「对象是左正合列」在恒等与复合下当然封闭 —— 它其实是 $\\mathcal{C}^{3}$ 的全子范畴 ✓。','**② 对有限双积封闭。** 阿贝尔范畴里核与像都与有限双积交换：','$$\\ker(f_{1}\\oplus f_{2}) = \\ker f_{1}\\oplus\\ker f_{2}, \\qquad \\operatorname{im}(f_{1}\\oplus f_{2}) = \\operatorname{im}f_{1}\\oplus\\operatorname{im}f_{2} ✓$$','（两者分别是有限极限与有限余极限，逐分量计算即可。）于是两条左正合列的双积仍左正合：','$$\\operatorname{im}(d^{n-1}_{1}\\oplus d^{n-1}_{2}) = \\operatorname{im}d^{n-1}_{1}\\oplus\\operatorname{im}d^{n-1}_{2} = \\ker d^{n}_{1}\\oplus\\ker d^{n}_{2} = \\ker(d^{n}_{1}\\oplus d^{n}_{2}) ✓$$','右正合对偶。短正合列再补一句：$0 \\to M\' \\to M \\to M\'\' \\to 0$ 正合 $\\iff$ 左端映射单、右端映射满、且 $\\operatorname{im} = \\ker$ —— 这三条都被逐分量保持 ✓。零对象（三条零列）显然正合，充当双积的单位元 ✓。','于是这三族对象各自是 $\\mathcal{C}^{3}$ 的加法子范畴 ✓。∎'].join('\n'),
        '⭐ 这条的意义是把「取正合列」当成一个**可以运算的对象**：两个正合列能直和、能取核余核，得到的还在里面 —— 谱序列那一套（过滤复形、双复形）正是靠这种封闭性才写得出来。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    },

    /* --------------------------------- AbHaus 的严格正合 */
    {
      id: 'prop.abhaus-strict-exact',
      cluster: 'cond.topo',
      type: 'proposition',
      label: 'Hausdorff 拓扑阿贝尔群的核与余核',
      title: '命题：$\\mathbf{AbHaus}$ 中的核、余核与严格正合列',
      regions: ['condensed'],
      tags: ['命题', '拓扑阿贝尔群', '核', '余核', '严格正合'],
      statement: [
        '设 $\\mathbf{AbHaus}$ 是 **Hausdorff 拓扑阿贝尔群**（态射取连续同态）的范畴。则',
        '',
        '1. 对连续同态 $f : M \\to N$：$\\ker f = f^{-1}(0)$（带子空间拓扑），$\\operatorname{coker} f = N/\\operatorname{cl}\\bigl(f(M)\\bigr)$（带商拓扑）；',
        '2. 连续同态是核 $\\iff$ 它是**到闭子群上的同胚嵌入**；是余核 $\\iff$ 它是**开满射**；',
        '3. 列 $0 \\to M\' \\xrightarrow{\\varphi} M \\xrightarrow{\\psi} M\'\' \\to 0$ **严格正合** $\\iff$ 它作为抽象阿贝尔群正合、且 $\\varphi$ 是闭嵌入、$\\psi$ 是开满射。'
      ].join('\n'),
      notes: [
        ['**证明。**','**1.** 核是 $f$ 与 $0$ 的等化子；在拓扑阿贝尔群里等化子就是 $\\{x : f(x) = 0\\}$ 配**子空间拓扑**（$f$ 连续而 $N$ 是 Hausdorff，所以这个集合闭）✓。余核是余等化子：$\\mathbf{AbHaus}$ 里的商必须仍然 Hausdorff，而 $N/f(M)$ 只有在 $f(M)$ **闭**时才 Hausdorff，故余等化子只能是 $N/\\operatorname{cl}(f(M))$（带商拓扑）✓ —— 一般连续同态的像**不必闭**（$\\mathbb{Z}^{\\mathrm{disc}} \\to \\mathbb{Z}^{\\mathrm{coarse}}$ 的像稠密而不闭），所以闭包不能省；像已经闭时就退化成 $N/f(M)$ ✓。','**2.** 「核」是带子空间拓扑的那个等化子，所以它作为映射必然是到闭子群上的同胚嵌入 ✓；反过来，闭嵌入 $\\varphi : M\' \\to M$ 恰好是 $\\varphi$ 与 $0$ 的等化子（等化子带的就是子空间拓扑，像闭保证商/余核那边也对）✓。余核那条同理：商映射是开满射 ✓，反之开满射正是它自己核的余等化子 ✓ —— 「开」不能省：$\\mathbb{Z}^{\\mathrm{disc}} \\to \\mathbb{Z}^{\\mathrm{coarse}}$ 满，但不是余核。','**3.** 若列严格正合，则 $\\varphi$ 实现 $\\ker\\psi$、$\\psi$ 实现 $\\operatorname{coker}\\varphi$，由 2 得 $\\varphi$ 闭嵌入、$\\psi$ 开满射 ✓。反过来，若作为抽象群正合、且 $\\varphi$ 闭嵌入、$\\psi$ 开满射，则 $\\varphi$ 与「$\\psi^{-1}(0)$ 带子空间拓扑」一致、$\\psi$ 与「商去 $\\operatorname{cl}\\varphi(M)$」一致，而 $\\varphi(M)$ 闭、故就是商去像 ✓。于是这条列是核-余核列，即严格正合 ✓。∎'].join('\n'),
        '⭐ **「严格」不是装饰**：在拓扑阿贝尔群里，「正合」与「严格正合」是实打实的差别 —— 拓扑阿贝尔群**不是**阿贝尔范畴，缺的正是「每个态射都由它的核与余核刻画」这一条。凝聚态数学把这一层补回来的方式，是把拓扑群嵌进 $\\mathrm{CondAb}$。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1']
    }

  ],

  edges: [

    /* ------------------------------- 定义引用（蓝线） ------------------------------- */
    {
      id: 'def-link.kernel-eq',
      kind: 'definition',
      definition: 'def.equalizer',
      usedBy: 'def.kernel-cokernel',
      note: '$\\ker f$ 就是 $f$ 与零态射的等化子，用的是「等化子」这个概念。'
    },
    {
      id: 'def-link.kernel-zero',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'def.kernel-cokernel',
      note: '核与余核的定义里出现**零态射**，它来自零对象。'
    },
    {
      id: 'def-link.zeroobj-additive',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.zero-object-final-criterion',
      note: '命题的前提「预加性范畴」是这条定义里的第一条。'
    },
    {
      id: 'def-link.zeroobj-zero',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'prop.zero-object-final-criterion',
      note: '要比较的两条定义都来自「零对象」。'
    },
    {
      id: 'def-link.biprod-additive',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.biproduct-is-product',
      note: '直和的定义（$p_{k}i_{k} = 1$、$i_{1}p_{1}+i_{2}p_{2} = 1$）与预加性都在这条定义里。'
    },
    {
      id: 'def-link.biprod-product',
      kind: 'definition',
      definition: 'def.product',
      usedBy: 'prop.biproduct-is-product',
      note: '命题的另一半说的是「积」，用的是积的泛性。'
    },
    {
      id: 'def-link.enrich-additive',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.hom-enrichment-unique',
      note: '唯一性说的就是这条定义里「每个 $\\operatorname{Hom}$ 带阿贝尔群结构且复合双线性」那部分。'
    },
    {
      id: 'def-link.enrich-biprod',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'prop.hom-enrichment-unique',
      note: '证明用的对角线、余对角线与 $f \\oplus g$ 全由双积刻画。'
    },
    {
      id: 'def-link.addfun-criterion',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'prop.additive-iff-preserves-biproduct',
      note: '命题要刻画的就是「加法函子」这条定义。'
    },
    {
      id: 'def-link.addfun-zeroobj',
      kind: 'definition',
      definition: 'def.zero-object',
      usedBy: 'prop.additive-iff-preserves-biproduct',
      note: '「保零对象」这一半用的是零对象与双积的关系。'
    },
    {
      id: 'def-link.adjadd-adjoint',
      kind: 'definition',
      definition: 'def.adjoint',
      usedBy: 'prop.adjoint-additive',
      note: '命题的前提就是一对伴随函子 $F \\dashv G$。'
    },
    {
      id: 'def-link.adjadd-addfun',
      kind: 'definition',
      definition: 'def.additive-functor',
      usedBy: 'prop.adjoint-additive',
      note: '结论是「两个函子都加法」。'
    },
    {
      id: 'def-link.exsub-exact',
      kind: 'definition',
      definition: 'def.exact-sequence',
      usedBy: 'prop.exact-sequence-subcategory',
      note: '命题里的对象就是正合列与短正合列。'
    },
    {
      id: 'def-link.exsub-abelian',
      kind: 'definition',
      definition: 'def.abelian-category',
      usedBy: 'prop.exact-sequence-subcategory',
      note: '核与像的良好行为、以及与有限双积交换都来自阿贝尔范畴。'
    },
    {
      id: 'def-link.abhaus-topab',
      kind: 'definition',
      definition: 'def.topo-ab-group',
      usedBy: 'prop.abhaus-strict-exact',
      note: '命题讨论的范畴就是拓扑阿贝尔群。'
    },
    {
      id: 'def-link.abhaus-kernel',
      kind: 'definition',
      definition: 'def.kernel-cokernel',
      usedBy: 'prop.abhaus-strict-exact',
      note: '核与余核在这里被具体算成 $f^{-1}(0)$ 与 $N/\\operatorname{cl}f(M)$。'
    },
    {
      id: 'def-link.abhaus-exact',
      kind: 'definition',
      definition: 'def.exact-sequence',
      usedBy: 'prop.abhaus-strict-exact',
      note: '「严格正合」是在正合列之上再加「嵌入闭、满射开」两条。'
    }

  ]
});
