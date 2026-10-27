/* ==========================================================================
   内容包 · 凝聚态集的拟紧与拟分离（6 条）
   --------------------------------------------------------------------------
   §4.2 的后半段。这一批要造出的东西是：**「紧 Hausdorff 空间」这个范畴
   恰好等于凝聚态集里「拟紧且拟分离」的那部分**（Thm 4.2.8）。

   链条：内部 Hom 的函数空间刻画 $\to$ 拟紧/拟紧拟分离 判定 $\to$ 弱 Hausdorff 与拟分离的
   两条互相反向的技术引理 $\to$ 紧生成情形的合璧。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态集的拟紧与拟分离',
  nodes: [

    {
      id: 'prop.cond-internal-hom',
      cluster: 'cond.set',
      type: 'proposition',
      label: '内部 Hom 的函数空间刻画',
      title: '$C(X(\\bullet), Y) \\cong \\operatorname{Hom}(X, Y)$',
      regions: ['condensed'],
      tags: ['凝聚态数学', '内部 Hom', '紧生成空间', '笛卡尔闭'],
      statement: [
        '设 $X$ 是凝聚态集、$Y$ 是紧生成空间（视为凝聚态集 $\\underline{Y}$）。则凝聚态集之间有自然同构',
        '',
        '$$C\\bigl(X(\\bullet),\\ Y\\bigr) \\cong \\operatorname{Hom}(X,\\ \\underline{Y}),$$',
        '',
        '其中左边是「测试对象 $S \\mapsto C\\bigl(X(S), Y\\bigr)$」（连续映射空间配紧开拓扑）所定的凝聚态集，右边是 $\\mathrm{Cond}$ 的**内部 Hom**。',
        '',
        '特别地，若 $X$ 与 $Y$ **都紧生成**，则 $kC(X, Y) \\cong \\operatorname{Hom}(X, Y)$。'
      ].join('\n'),
      notes: [
        '**为什么需要它。** $\\mathrm{Cond}$ 是拓扑斯，内部 Hom 由拓扑斯结构**自动**给出 —— 但那是抽象的。这一条给出它的**具体实现**：「内部 Hom 就是连续函数空间」。有了它，内部 Hom 才是一个可以算、可以往 $\\mathbf{Top}$ 里搬的东西。',
        '**两边分别在说什么。** $X(\\bullet)$ 是 $X$ 的**底空间**（把 $X$ 喂给紧 Hausdorff 测试对象 $S$ 得到的集合，再装上由测试映射定出的拓扑）；$\\operatorname{Hom}(X, \\underline{Y})$ 是「从 $X$ 到 $Y$ 的映射」这个**对象**。等号说：先取底空间再取函数空间，和先取内部 Hom 再取底空间，是一回事。',
        '⭐ 与「$\\mathrm{Cond}$ 是笛卡尔闭」连起来看：笛卡尔闭给的是**存在性**，这一条给的是**具体形状**。$Y$ 紧生成这个假设不能去掉 —— 紧生成正是让「紧开拓扑」够用的那个条件。',
        ['**证明。** 先设 $X = S$ 是紧 Hausdorff 空间（此时 $X(\\bullet) = S$）。对任意紧 Hausdorff 的 $T$，两边在 $T$ 上取值并逐步用「内部 Hom 的伴随」与「紧生成空间上的指数律」：',
          '$$\\underline{\\operatorname{Hom}}(S, \\underline{Y})(T) = \\operatorname{Hom}\\bigl(T,\\ \\underline{\\operatorname{Hom}}(S,\\underline{Y})\\bigr) \\cong \\operatorname{Hom}(T \\times S,\\ \\underline{Y}) \\cong C(T\\times S,\\ Y) \\cong C\\bigl(T,\\ C(S, Y)\\bigr) = \\underline{C(X(\\bullet), Y)}(T).$$',
          '其中第四步是紧生成空间（$T \\times S$ 与 $Y$）上的**指数律**。取 $T = \\bullet$ 得自然变换；一般 $X$ 再用 Yoneda：对紧 Hausdorff 的 $S$，',
          '$$\\operatorname{Hom}(X, \\underline{Y})(S) \\cong \\operatorname{Hom}(S, \\operatorname{Hom}(X, \\underline{Y})) \\cong \\operatorname{Hom}(X, \\operatorname{Hom}(S, \\underline{Y})) \\cong \\operatorname{Hom}\\bigl(X, C(S, Y)\\bigr) \\cong C\\bigl(X(\\bullet), C(S, Y)\\bigr) \\cong C\\bigl(S, C(X(\\bullet), Y)\\bigr),$$',
          '最后一步又是指数律。于是两边作为 $\\mathbf{CHaus}$ 上的层逐点同构，即自然同构。',
          '**紧生成的情形**：$X$ 也紧生成时，$X(\\bullet) = X$（底空间就是它自己），且两侧都落在 $\\mathrm{CGWH}$ 里，取 $k$-化即得 $kC(X, Y) \\cong \\operatorname{Hom}(X, \\underline{Y})$。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 4.2.6']
    },

    {
      id: 'thm.qcqs-chaus-equiv',
      cluster: 'cond.set',
      type: 'theorem',
      label: '拟紧 与 拟紧拟分离 的判定',
      title: '紧 Hausdorff 空间 $\\cong$ 拟紧拟分离 凝聚态集',
      regions: ['condensed'],
      tags: ['凝聚态数学', '拟紧', '拟分离', '紧 Hausdorff'],
      statement: [
        '1. 凝聚态集 $X$ 是**拟紧**的 $\\iff$ 存在**自由**紧 Hausdorff 空间 $F$ 与满态射',
        '',
        '$$F \\twoheadrightarrow X.$$',
        '',
        '2. 函子 $S \\mapsto \\underline{S}$（把紧 Hausdorff 空间看成它表示的凝聚态集）给出范畴等价',
        '',
        '$$\\mathbf{CHaus}\\ \\simeq\\ \\{\\text{紧 Hausdorff 空间}\\} \\longrightarrow \\{\\text{拟紧且拟分离的凝聚态集}\\}.$$'
      ].join('\n'),
      notes: [
        '**这一条在说什么。** 凝聚态集是「用紧 Hausdorff 空间探测出来的层」。这条定理说：探测得最规整的那批对象（拟紧拟分离 的），**原来就是探测者自己**。于是「紧 Hausdorff 空间」这个范畴可以**原封不动**地坐进 $\\mathrm{Cond}$ 里，作为它的「紧块部分」。',
        '**第 1 条为什么用「自由」的 $F$。** 「拟紧」的一般定义是「任何覆盖都有有限子覆盖」，这是纯逻辑条件。这条把它换成了一个**几何**条件：能从一个（无限可能是很大的）自由紧 Hausdorff 块**满射**过来。于是拟紧变成了「可以被一个紧 Hausdorff 块盖住」。',
        '**「自由」的含义**：$\\mathbb{Z}[S]$ 那类由点集生成、不带额外关系的东西 —— 装得上就是「有足够多的点去盖」。',
        '⭐ 一般拓扑斯上的对应结论是「拟紧拟分离 对象 $\\cong$ 紧 Hausdorff 对象」，这里做的是 $\\mathrm{Cond}$ 这个特例。',
        ['**证明（两条都是一般拓扑斯上的定理在 $\\mathrm{Cond}$ 上的特例）。**',
          '- **第 1 条**：「拟紧」在拓扑斯里的等价刻画是「存在从**投射 / 自由**对象的满射」—— 反向显然（满射 $F \\twoheadrightarrow X$ 给出一个覆盖，用 $F$ 的参数化把有限子覆盖抽出来，因为自由对象 $F = \\beta I$ 是「由点集生成」的，有限性是逐点的）；正向用 $\\mathbf{FCHaus}$ 张成 $\\mathbf{CHaus}$ 再把覆盖的参数压进一个自由对象。',
          '- **第 2 条**：拟紧拟分离 的对象由「它到各紧 Hausdorff 块的值」决定，而 $\\mathrm{Cond}$ 里紧 Hausdorff 空间 $S$ 表示的层 $\\underline{S} = h_{S}$ 正是 拟紧拟分离 的（拟紧 由 $S \\to S$ 本身给出；qs 由「紧 Hausdorff 的两块相交还是紧 Hausdorff」给出）。于是 $S \\mapsto \\underline{S}$ 全忠实；本质满则是上一条与拟分离的刻画拼起来。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 4.2.8']
    },

    {
      id: 'lem.weak-hausdorff-qseparated',
      cluster: 'cond.set',
      type: 'lemma',
      label: '弱 Hausdorff 推出 拟分离',
      title: '弱 Hausdorff 的紧块相交还是紧块',
      regions: ['condensed'],
      tags: ['凝聚态数学', '弱 Hausdorff', '拟分离', '纤维积'],
      statement: [
        '设 $X$ 是弱 Hausdorff 空间（且 $X$ 紧生成），$X_{1}, X_{2} \\hookrightarrow X$ 是**拟紧**子空间。则纤维积',
        '',
        '$$X_{1} \\times_{X} X_{2}$$',
        '',
        '紧 Hausdorff。特别地，任意两个拟紧开子空间的交是拟紧的，即 $X$ 是**拟分离**的。'
      ].join('\n'),
      notes: [
        '**直觉**：拟分离要的是「两个紧块的交还是紧块」。弱 Hausdorff 正好保证了这件事 —— 它说紧块的像都是闭的，于是两个紧块沿 $X$ 的拉回落在紧块里。',
        '⚠️ 这里 $X_{1} \\times_{X} X_{2}$ 的紧性是 $\\mathrm{CGWH}$ 系里那条「紧 Hausdorff 沿弱 Hausdorff 的纤维积」的直接应用。',
        ['**证明。** 不妨设 $X$ 紧生成（弱 Hausdorff 的 $k$-化不改变结论）。对 $i = 1, 2$，由拟紧性取紧 Hausdorff 空间 $S_{i}$ 与满态射 $S_{i} \\twoheadrightarrow X_{i}$（「拟紧 $\\iff$ 有从自由紧 Hausdorff 的满射」）。于是有满态射',
          '$$S_{1} \\times_{X} S_{2} \\twoheadrightarrow X_{1} \\times_{X} X_{2},$$',
          '（纤维积保满射）。而 $X$ 弱 Hausdorff、$S_{1}, S_{2}$ 紧 Hausdorff，于是 $S_{1} \\times_{X} S_{2}$ 是 $S_{1} \\times S_{2}$ 里的**闭**子集（弱 Hausdorff 的定义：紧 Hausdorff 子空间沿连续映射的纤维积仍紧 Hausdorff），故紧 Hausdorff。',
          '紧 Hausdorff 空间的商还是紧 Hausdorff（连续满像是紧的，Hausdorff 商还是 Hausdorff），故 $X_{1} \\times_{X} X_{2}$ 紧 Hausdorff。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 4.2.9']
    },

    {
      id: 'lem.qseparated-ind-inclusions',
      cluster: 'cond.set',
      type: 'lemma',
      label: '拟分离即含入的滤过余极限',
      title: '拟分离 $\\iff$ 紧 Hausdorff 块沿含入拼起来',
      regions: ['condensed'],
      tags: ['凝聚态数学', '拟分离', 'Ind-对象', '滤过余极限'],
      statement: [
        '凝聚态集 $X$ 是**拟分离**的 $\\iff$ 它可以写成',
        '',
        '$$X \\cong \\varinjlim_{i \\in I}\\ S_{i},$$',
        '',
        '其中每个 $S_{i}$ 是紧 Hausdorff 空间、每个过渡映射 $S_{i} \\hookrightarrow S_{j}$ 都是**含入**。',
        '',
        '**推论**：$\\operatorname{Ind}(\\mathbf{CHaus})$ 中那些「过渡映射为单射」的对象，恰好就是 拟紧拟分离 的凝聚态集。'
      ].join('\n'),
      notes: [
        '⚠️ **不要读成 $\\operatorname{Ind}(\\mathbf{CHaus}) \\cong \\mathrm{Cond}$。** 整块 $\\operatorname{Ind}(\\mathbf{CHaus})$ 比凝聚态集**大**：一般凝聚态集的紧块过渡映射只是映射、不是含入，所以只有「含入过渡」那一部分才对得上 拟紧拟分离 的对象。',
        '**为什么这条重要。** 它把「拟分离」这个抽象的有限性条件换成了一个**可操作**的写法：$X$ 是一串越来越大的紧 Hausdorff 块 $S_{1} \\hookrightarrow S_{2} \\hookrightarrow \\cdots$ 的余极限。$\\operatorname{Ind}$-对象这套语言正是为「滤过余极限拼出来的东西」准备的，于是 $\\mathrm{Cond}$ 的很多计算可以逐块做再取余极限。',
        '⭐ 这条也是后面「层上同调用紧块算」那一路技术的起点：先在紧 Hausdorff 块上算，再沿滤过余极限抬上去（滤过余极限正合）。',
        ['**证明。** 只需证正向（反向是定义）。',
          '- 任何凝聚态集 $X$ 都能写成 $X \\cong \\varinjlim_{i} T_{i}$（$T_{i}$ 紧 Hausdorff）—— 这是 $\\mathrm{Cond}$ 里「用紧块拼出来」的一般事实。',
          '- 记 $X_{i}$ 为 $T_{i}$ 在 $X$ 中的**像**，则 $X = \\varinjlim_{i} X_{i}$。每个 $X_{i}$ 作为 $T_{i}$ 的像是**拟紧**的；而 $X$ 拟分离，故每个 $X_{i}$ 也拟分离（拟分离沿子对象遗传）。于是由「拟紧拟分离 $\\cong$ 紧 Hausdorff」得 $X_{i} \\cong S_{i}$，$S_{i}$ 紧 Hausdorff。',
          '- 把族 $(S_{i})$ 换成 $S_{J} := \\bigcup_{i \\in J} S_{i}$（$J$ 有限）—— 因为 $X$ 拟分离，两个紧 Hausdorff 块的交还是紧 Hausdorff（上一条），有限并仍紧 Hausdorff，于是得到一个**有向**的族 $S_{J}$，且 $X = \\varinjlim_{J} S_{J}$，过渡映射都是含入。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 4.2.10']
    },

    {
      id: 'lem.qseparated-underlying-weak-hausdorff',
      cluster: 'cond.set',
      type: 'lemma',
      label: '拟分离 推出 底空间弱 Hausdorff',
      title: '拟分离凝聚态集的底空间弱 Hausdorff',
      regions: ['condensed'],
      tags: ['凝聚态数学', '拟分离', '弱 Hausdorff', '底空间'],
      statement: '若凝聚态集 $X$ 拟分离，则它的底空间 $X(\\bullet)$ 弱 Hausdorff。',
      notes: [
        '**证法**：把 $X$ 写成紧 Hausdorff 块沿含入的滤过余极限（上一条），再对底空间取 $k$-化。滤过余极限在 $\\mathrm{CGWH}$ 里被保留，而每个紧 Hausdorff 块都弱 Hausdorff，于是余极限仍弱 Hausdorff。',
        '**方向别弄反**：这条是「拟分离 $\\implies$ 弱 Hausdorff」，反向要加**紧生成**才成立（见下一条）。',
        ['**证明。** 由拟分离的刻画，把 $X$ 写成紧 Hausdorff 块沿**含入**的滤过余极限 $X = \\varinjlim_{i} S_{i}$（$S_{i} \\hookrightarrow S_{j}$）。底空间沿滤过余极限是正合的：',
          '$$X(\\bullet) = \\varinjlim_{i} S_{i}$$',
          '（在 $\\mathrm{CGWH}$ 里取 $k$-化后这个余极限仍被保留）。而**每个** $S_{i}$ 是紧 Hausdorff，当然弱 Hausdorff；$\\mathrm{CGWH}$ 是**余完备且对滤过余极限封闭**的，于是余极限 $X(\\bullet)$ 仍弱 Hausdorff。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 4.2.11']
    },

    {
      id: 'prop.cg-wh-iff-qseparated',
      cluster: 'cond.set',
      type: 'proposition',
      label: '紧生成：弱 Hausdorff ⟺ 拟分离',
      title: '紧生成空间上两个条件等价',
      regions: ['condensed'],
      tags: ['凝聚态数学', '弱 Hausdorff', '拟分离', '紧生成'],
      statement: '设 $X$ 是**紧生成**空间。则 $X$ 弱 Hausdorff $\\iff$ $X$（视为凝聚态集）拟分离。',
      notes: [
        '**两个方向分别来自哪**：「弱 Hausdorff $\\implies$ 拟分离」是那条纤维积引理；「拟分离 $\\implies$ 弱 Hausdorff」是底空间那条。紧生成是用来让「底空间」这个概念和 $X$ 自己对齐的。',
        '⭐ **合起来的意义**：在紧生成的范围里，「弱 Hausdorff」这个**拓扑**条件与「拟分离」这个**层论**条件说的是同一件事。于是 $\\mathrm{CGWH}$ 这一整套同伦论的栖息地，在凝聚态世界里有了一个纯层论的名字。',
        ['**证明。** 两个方向各用一条引理：',
          '- **$\\implies$**：$X$ 紧生成且弱 Hausdorff，则视为凝聚态集时拟分离 —— 这正是「弱 Hausdorff $\\implies$ 拟分离」那条纤维积引理。',
          '- **$\\Longleftarrow$**：$X$ 紧生成且拟分离，则底空间 $X(\\bullet)$ 弱 Hausdorff；而 $X$ 紧生成意味着 $X(\\bullet) \\cong X$（紧生成空间的 $k$-化就是它自己，且它在凝聚态世界里由 $\\underline{S} \\mapsto \\operatorname{Hom}(S, X)$ 决定），所以 $X$ 本身弱 Hausdorff。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 4.2.12']
    }

  ]
});
