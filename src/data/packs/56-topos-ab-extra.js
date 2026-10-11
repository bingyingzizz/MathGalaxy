/* ==========================================================================
   内容包 · 拓扑斯的三条性质 + 阿贝尔范畴的补白（10 条）
   --------------------------------------------------------------------------
   两半：

   一、$\mathrm{Cond}$ 之所以是拓扑斯，靠的是三条逐条可验的性质（极限余极限
       逐点算 / 满态射正则 / 等价关系有效）。这三条正好是 Giraud 定理的输入。
   二、同调代数这一侧的补白：正合列的定义、Grothendieck 范畴的足够多内射、
       AB 公理之间的关系与例子、Cartan–Eilenberg 分解、单纯方法算上同调、
       局部紧上的 Čech 高阶零消。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '拓扑斯的三条性质与阿贝尔范畴补白',
  nodes: [

    /* ------------------------------------------- Cond 是拓扑斯：三条性质 */

    {
      id: 'prop.cond-limits-colimits',
      cluster: 'cond.set',
      type: 'proposition',
      label: 'Cond 的极限与余极限',
      title: '$\\mathrm{Cond}$ 的极限与余极限逐点计算',
      regions: ['condensed'],
      tags: ['凝聚态数学', '拓扑斯', '极限', '余极限'],
      statement: [
        '$\\mathrm{Cond}$ 有所有（小）极限与余极限，而且它们**逐点**计算：对每个紧 Hausdorff 空间 $S$，',
        '',
        '$$\\Bigl(\\varprojlim_{i} X_{i}\\Bigr)(S) = \\varprojlim_{i} X_{i}(S),\\qquad \\Bigl(\\varinjlim_{i} X_{i}\\Bigr)(S) = \\varinjlim_{i} X_{i}(S).$$'
      ].join('\n'),
      notes: [
        '**为什么**。$\\mathrm{Cond}$ 是 $\\mathbf{CHaus}$ 上的**层范畴** —— 而层范畴作为预层范畴的满子范畴是**反射**的，极限与余极限都能从预层那边逐点地拿过来。',
        '**「逐点」是什么意思**：要算一个凝聚态集，就得知道它在每个 $S$ 上取什么值。这一条说：余极限取值的值就是取值的余极限 —— 把抽象的范畴操作降到「集合层面」一件件做。',
        '⭐ **这条是后面所有计算的技术基础**：以后凡是遇到 $\\mathrm{Cond}$ 里的极限 / 余极限，都可以拆到每个 $S$ 上去算，而集合的极限余极限是好算的。',
        '⚠️ 注意取值的**余极限**是在 $\\mathbf{Set}$ 里取的 —— 这在层范畴里是自动的，但要记住凝聚态集的余极限不总是等于底空间的余极限。'
      ].join('\n\n'),
      refs: ['Le Stum, §4.1']
    },

    {
      id: 'prop.cond-epi-regular',
      cluster: 'cond.set',
      type: 'proposition',
      label: 'Cond 的满态射都是正则的',
      title: '$\\mathrm{Cond}$ 中满态射 $=$ 余等化子',
      regions: ['condensed'],
      tags: ['凝聚态数学', '拓扑斯', '满态射', '正则', '等价关系'],
      statement: [
        '在 $\\mathrm{Cond}$ 中，每个满态射 $f : X \\to Y$ 都是**正则**的：它是它自己那对投影的余等化子，',
        '',
        '$$Y \\cong \\operatorname{coeq}\\bigl(X \\times_{Y} X \\rightrightarrows X\\bigr).$$'
      ].join('\n'),
      notes: [
        '**在说什么。** 一般的范畴里，「满态射」（右边可消）和「余等化子」（是某对映射的商）是两个不同的概念。拓扑斯里两者**重合** —— 这就是为什么在拓扑斯里可以放心地「取商」：任何满态射都真的在商掉一个等价关系。',
        '**$X \\times_{Y} X \\rightrightarrows X$ 是什么**：$X \\times_{Y} X = \\{\\, (x, x\') : f(x) = f(x\') \\,\\}$ 是 $f$ 的**核对**；它的两个投影就是那对映射。余等化子就是把「被 $f$ 认同的点」粘起来 —— 粘出来的结果正好是 $Y$。',
        '📌 这条与下一条（等价关系有效）是同一枚硬币的两面：这条说「商是良态的」，下一条说「每个等价关系都能当成某个商来出现」。'
      ].join('\n\n'),
      refs: ['Le Stum, §4.1']
    },

    {
      id: 'prop.cond-equivalence-effective',
      cluster: 'cond.set',
      type: 'proposition',
      label: 'Cond 的等价关系有效',
      title: '$\\mathrm{Cond}$ 中每个等价关系都是有效的',
      regions: ['condensed'],
      tags: ['凝聚态数学', '拓扑斯', '等价关系', '有效', 'Giraud'],
      statement: [
        '在 $\\mathrm{Cond}$ 中，每个等价关系 $R \\rightrightarrows X$（即 $R \\subseteq X \\times X$ 是一个「自反、对称、传递」的子对象）都是**有效的**：',
        '',
        '$$R \\cong X \\times_{Y} X,\\qquad Y := \\operatorname{coeq}\\bigl(R \\rightrightarrows X\\bigr).$$',
        '',
        '也就是说：等价关系的商存在，而且 $R$ 恰好是那个商的核对。'
      ].join('\n'),
      notes: [
        '**「有效」是什么意思。** 给定一个等价关系，先取商 $Y = X/R$（这总能做），再把 $Y$ 沿商映射拉回 $X \\times X$。一般范畴里拉回来的东西可能**比 $R$ 大**（多粘了一些东西）。有效等价关系就是**恰好拉回 $R$ 自己**的那些。',
        '**为什么它重要**：只有有效等价关系才能「商了再拉回来还原」，也就是「取商」这个操作**不丢信息**。聚集到 $\\mathrm{Cond}$ 上，这条保证：把两个紧 Hausdorff 块按一个等价关系粘起来，得到的商对象在层论意义上「就是」那个等价关系本身。',
        '⭐ **这三条合起来正好是 Giraud 定理的输入**：一个有所有余极限、余极限万有且有效等价关系有效的范畴就是拓扑斯。反过来说，$\\mathrm{Cond}$ 是拓扑斯这件事可以从这三条**逐条验证**，不必回到「它是一个 site 上的层范畴」那个定义。',
        '📌 与「Cond 是拓扑斯」那条合起来看：那条给**结论**，这三条给**理由**；有了理由，才知道 $\\mathrm{Cond}$ 的拓扑斯结构具体好在哪里（能做商、能做内部 Hom、能做层上同调）。'
      ].join('\n\n'),
      refs: ['Le Stum, §4.1']
    },

    /* --------------------------------------------- 阿贝尔范畴：正合与内射 */

    {
      id: 'def.exact-sequence',
      cluster: 'hom.ab',
      type: 'definition',
      label: '一般正合列',
      title: '正合列',
      regions: ['homology', 'category'],
      tags: ['同调代数', '正合列', '核', '像'],
      statement: [
        '设',
        '',
        '$$\\cdots \\longrightarrow M^{n-1} \\xrightarrow{\\ d^{n-1}\\ } M^{n} \\xrightarrow{\\ d^{n}\\ } M^{n+1} \\longrightarrow \\cdots$$',
        '',
        '是阿贝尔范畴中的复形（$d^{n} \\circ d^{n-1} = 0$）。称它在 $M^{n}$ 处**正合**，如果',
        '',
        '$$\\operatorname{im}(d^{n-1}) = \\ker(d^{n}).$$',
        '',
        '处处正合的复形叫**正合列**。特别地，**短正合列**',
        '',
        '$$0 \\longrightarrow M\' \\xrightarrow{\\ f\\ } M \\xrightarrow{\\ g\\ } M\'\' \\longrightarrow 0$$',
        '',
        '意思是：$f$ 是单态射、$g$ 是满态射，且 $\\operatorname{im}(f) = \\ker(g)$。'
      ].join('\n'),
      notes: [
        '**一句话**：正合 = 「进来的东西恰好就是出去会被杀掉的核」—— 没有多、没有少。$\\operatorname{im} \\subseteq \\ker$ 是复形条件自动给的（$d \\circ d = 0$），正合要求的只是**反方向**的包含。',
        '**两端的 $0$ 在做什么**：左端的 $0 \\to M\'$ 表示 $\\ker(f) = 0$，即 $f$ 单；右端的 $M\'\' \\to 0$ 表示 $\\operatorname{im}(g) = M\'\'$，即 $g$ 满。于是「短正合列」把单、满、正合三件事打包成一条。',
        '**同构的另一种写法**：短正合列等价于「$M\'$ 是 $M$ 的子对象、且 $M\'\' \\cong M/M\'$」。这就是把「扩张」讲清楚的最短方式。',
        '📌 与「分裂短正合列」相对照：一般正合列**不保证**可以写成直和；能写成 $M \\cong M\' \\oplus M\'\'$ 的那些是特殊情形。'
      ].join('\n\n'),
      refs: ['Le Stum, Definition 5.2.3']
    },

    {
      id: 'prop.grothendieck-enough-injectives',
      cluster: 'hom.ab',
      type: 'proposition',
      label: 'Grothendieck 范畴有足够多内射',
      title: 'Grothendieck 范畴有足够多的内射对象',
      regions: ['homology'],
      tags: ['同调代数', 'Grothendieck 范畴', '内射对象', '导出函子'],
      statement: [
        '任意 **Grothendieck 范畴**（即带生成元的 AB5 范畴）都有**足够多的内射对象**：',
        '',
        '每个对象 $M$ 都能嵌入一个内射对象，等价地，每个对象都有内射消解',
        '',
        '$$0 \\longrightarrow M \\longrightarrow I^{0} \\longrightarrow I^{1} \\longrightarrow \\cdots$$'
      ].join('\n'),
      notes: [
        '⭐ **这是「右导出函子存在」的存在性保障**。右导出函子 $R^{n}F$ 的标准定义是「取内射消解、施 $F$、取上同调」—— 而这个定义只有在**内射消解总是存在**的前提下才有意义。这条定理说：只要范畴是 Grothendieck 的，就不用担心。',
        '**「足够多」是什么意思**：不是「有很多内射对象」，而是「每个对象都能嵌进某个内射对象里」。这个条件是关于**范畴整体**的，不能逐对象验证。',
        '**用在哪**：$A\\text{-}\\mathbf{Mod}$、$\\operatorname{Ind}(\\mathcal{C})$、拓扑斯上的 $\\mathbf{Ab}(\\mathcal{T})$、$\\mathrm{CondAb}$ —— 都是 Grothendieck 范畴，于是右导出函子、导出范畴、谱序列这一整套在它们上面全部可用。这就是 Grothendieck 那一代人挑出「AB5 + 生成元」这两条的全部理由。',
        '📌 随定义而来的另一条（同章）：Grothendieck 范畴**自动满足 AB3\\***（有所有极限）—— 极限的存在性不用额外假设。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 5.2.8（另见 Proposition 5.2.7）']
    },

    {
      id: 'prop.ab5-implications',
      cluster: 'hom.ab',
      type: 'proposition',
      label: 'AB5 与 AB3*/AB4* 的关系',
      title: 'AB 公理之间的蕴含关系',
      regions: ['homology'],
      tags: ['同调代数', 'AB 公理', 'Grothendieck'],
      statement: [
        [
          '1. **Grothendieck 范畴自动满足 AB3\\***（有所有极限）—— 即 AB5 加上生成元，就免费得到 AB3\\*；',
          '2. 除零范畴 $\\{0\\}$ 外，**没有范畴能同时满足 AB5 与 AB5\\***；',
          '3. 拓扑斯上的 $\\mathbf{Ab}(\\mathcal{T})$ 满足 **AB5 与 AB3\\***，但**一般并不满足 AB6 或 AB4\\***。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '**第 1 条为什么值得单说**：AB3 与 AB3* 是**对偶**的两条（一个有所有余极限、一个有所有极限），一般不能互相推出。「有生成元 + 滤过余极限正合」这两条合起来却把对偶那一条也带出来了 —— 这是 Grothendieck 范畴理论里最不平凡的一条「免费午餐」。',
        '**第 2 条的意思**：AB5（滤过余极限正合）与 AB5*（滤过极限正合）是**互相排斥**的，只能一边倒。零范畴是唯一例外（它什么都没有，两边都满足）。',
        '**第 3 条是「为什么凝聚态数学要用 CondAb 而不是随便一个拓扑斯」的答案**：$\\mathbf{Ab}(\\mathcal{T})$ 只有 AB5 与 AB3*，做一般的同调代数够用；但 $\\mathrm{CondAb}$ 额外满足 **AB6 与 AB4\\*** —— 即「滤过余极限与积交换」「积正合」。有了这两条才能像在 $\\mathbf{Ab}$ 里一样自由地交换极限与余极限。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 5.2.7']
    },

    {
      id: 'prop.ab-axioms-examples',
      cluster: 'hom.ab',
      type: 'example',
      label: 'AB 公理的例子表',
      title: '哪些范畴满足哪些 AB 公理',
      regions: ['homology'],
      tags: ['同调代数', 'AB 公理', '例子', '计算表'],
      statement: [
        [
          '- $\\mathbf{Ab}$：**AB6** 与 **AB4\\***；',
          '- $\\mathbf{AbTop}$（拓扑阿贝尔群）：只满足 **AB1**；',
          '- $\\mathbf{AbCHaus}$（紧 Hausdorff 阿贝尔群）：只满足 **AB1**（更精确地 $\\mathbf{AbCHaus} \\simeq \\mathbf{Ab}^{\\mathrm{op}}$，故满足 AB4 与 AB6\\*）；',
          '- $\\mathbf{Ab}^{\\mathcal{C}}$（任意范畴 $\\mathcal{C}$ 上的阿贝尔群预层）：**AB6** 与 **AB4\\***；',
          '- $\\mathbf{Ab}(\\mathcal{T})$（拓扑斯 $\\mathcal{T}$ 上的阿贝尔群）：**AB5** 与 **AB3\\***；',
          '- $\\mathrm{CondAb}$：**AB6** 与 **AB4\\***。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '**怎么读这张表**：从下往上，公理越往上越强（AB1 < AB2 < AB3 < AB4 < AB5 < AB6）。表里最有意思的两个对照：',
        '',
        [
          '- $\\mathbf{AbTop}$ 只到 AB1 —— 连 AB2 都不满足。理由是「态射不必严格」（存在单态射不是核的情形），所以它连阿贝尔范畴都不是，做不了同调代数。这正是要把拓扑群搬进凝聚态那侧的理由。',
          '- $\\mathbf{Ab}(\\mathcal{T})$ 停在 AB5，而 $\\mathrm{CondAb}$ 能上到 AB6 —— 多出来的正是「滤过余极限与积交换」与「积正合」。凝聚态数学在一般拓扑斯之上额外拿到的，就是这两条。'
        ].join(''),
        '⭐ 表里 $\\mathbf{AbCHaus} \\simeq \\mathbf{Ab}^{\\mathrm{op}}$ 那一行是把 Pontryagin 对偶提升成范畴等价的结果：紧 Hausdorff 阿贝尔群的范畴**反等价于**离散阿贝尔群的范畴，于是它的公理等级就是 $\\mathbf{Ab}$ 的**对偶**版本。'
      ].join('\n\n'),
      refs: ['Le Stum, §5.2']
    },

    /* -------------------------------------------------- 层上同调：技术工具 */

    {
      id: 'method.simplicial-cohomology',
      cluster: 'hom.sheafcoh',
      type: 'proposition',
      label: '单纯方法算层上同调',
      title: '用单纯超覆盖计算 $H^{n}(X, M)$',
      regions: ['homology'],
      tags: ['同调代数', '层上同调', '超覆盖', '单纯对象'],
      statement: [
        '设 $M$ 是 site $\\mathcal{C}$ 上的阿贝尔层，$X \\in \\mathcal{C}$。取 $M$ 的一个**超覆盖**（即一个复形 $F_{\\bullet} \\to M$，其中每个 $F_{n}$ 是若干可表层的直和，且增广后处处正合）。则 $M$ 的上同调等于「逐层取截面」得到的**单纯阿贝尔群**的同伦群：',
        '',
        '$$H^{n}(X,\\ M) \\cong \\pi^{n}\\bigl(\\Gamma(X,\\ F_{\\bullet})\\bigr).$$'
      ].join('\n'),
      notes: [
        '**在说什么。** 层上同调的定义是「取内射消解、取截面、取上同调」，而内射消解**无法计算**（内射对象太大）。这条给出一个**能算的替代品**：把内射消解换成「自由 / 可表对象的消解」，逐层取截面之后得到一个单纯阿贝尔群（或链复形），它的同伦群就是 $H^{n}$。',
        '**为什么可行**：$F_{n}$ 由可表对象组成时，截面 $\\Gamma(X, F_{n})$ 是可以直接写下来的（就是 $F_{n}$ 在该对象上的值）。而两个消解之间的映射给出**链同伦**，所以算出来的同伦群与消解的选取无关。',
        '⭐ **这就是 Godement 分解的现代形式，也是 $\infty$-范畴方法的入口**：在 $\infty$-范畴的语言里，「超覆盖」被换成「$X$ 的单纯分解」，而上同调就是那个单纯对象的映射空间的同伦群。整个导出代数几何的层上同调计算都走这条路。',
        '📌 **三个输入**：单纯对象、单纯形范畴的定义（已有），以及 Čech 复形（已有的「便宜算法」）。这条把它们接成一台计算上同调的机器。'
      ].join('\n\n'),
      refs: ['Le Stum, §7.3（配合 Lemma 7.3.2）']
    },

    {
      id: 'lem.cartan-eilenberg',
      cluster: 'hom.sheafcoh',
      type: 'lemma',
      label: 'Cartan–Eilenberg 分解',
      title: 'Cartan–Eilenberg 分解（双复形内射消解）',
      regions: ['homology'],
      tags: ['同调代数', '双复形', '内射消解', '谱序列'],
      statement: [
        '设 $K^{\\bullet}$ 是阿贝尔范畴中的**下有界**复形。则存在下有界**双复形** $I^{\\bullet,\\bullet}$（即 $I^{p,q} = 0$ 对 $q < 0$）与复形态射 $K^{\\bullet} \\to I^{\\bullet,0}$，使得',
        '',
        [
          '- 每个 $K^{p} \\to I^{p,\\bullet}$ 是**内射消解**；',
          '- 每个 $H^{p}(K^{\\bullet}) \\to H^{p}(I^{\\bullet,\\bullet})$ 也是**内射消解**。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '**为什么需要它。** 双复形可以按两种方式过滤（先按列、或先按行），各得一条谱序列。要让这两条谱序列**同时**收敛到同一个总复形的上同调，就必须在构造上保证「行和列都是内射消解」—— 这正是 Cartan–Eilenberg 分解给出的东西。',
        '**「$H^{p}$ 那一层也是内射消解」是关键的额外要求**：只要求每列是内射消解还不够（那样第二条谱序列会退化）；要求上同调层也是内射消解，才能让两条过滤都读到完整信息。',
        '⭐ **用在哪**：推导「两个导出函子的复合 = 谱序列」（Grothendieck 谱序列）、以及导出范畴里「有界下有界复形可以换成分解」的标准论证，都要先有这条。'
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 7.2.19']
    }

  ]
});
