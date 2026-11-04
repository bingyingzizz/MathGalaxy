/* ==========================================================================
   内容包 · 凝聚态集（18 条）
   --------------------------------------------------------------------------
   第九团（终点站）：CHaus 是预拓扑斯 → 凝聚态集 → Cond 是拓扑斯
   → 自由紧 Haus 空间作探针 → 底拓扑空间 → 凝聚态阿贝尔群。

   依赖顺序：凝聚态集就是 CHaus 上的层；CHaus 是预拓扑斯，所以「层」可以
   用有限积与商来验；换到自由紧 Hausforff 空间上验更省事；再加上阿贝尔群值。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态集',
  nodes: [

    /* ------------------------------------------------ CHaus 是预拓扑斯 */
    {
      id: 'def.chaus-pretopos',
      cluster: 'cond.set',
      type: 'theorem',
      label: '紧 Hausdorff 空间构成预拓扑斯',
      title: '$\\mathbf{CHaus}$ 是预拓扑斯',
      regions: ['condensed'],
      tags: ['凝聚态', 'CHaus', '预拓扑斯'],
      statement: [
        '在 $\\mathbf{CHaus}$ 中：',
        '',
        '1. 所有极限与余极限存在；',
        '2. 有限余积**不交**且**万有**；',
        '3. 等价关系**有效**且**万有**；',
        '4. 满态射**正则**且**万有**。',
        '',
        '因此 $\\mathbf{CHaus}$ 是**预拓扑斯**。'
      ].join('\n'),
      notes: [
        '第 1 条由「$\\mathbf{CHaus}$ 是 $\\mathbf{Top}$ 的反射子范畴」直接读出：',
        '',
        '$$\\varprojlim{}^{\\mathbf{CHaus}} D \\;\\cong\\; \\varprojlim{}^{\\mathbf{Top}} D, \\qquad \\varinjlim{}^{\\mathbf{CHaus}} D \\;\\cong\\; \\beta\\Bigl(\\varinjlim{}^{\\mathbf{Top}} D\\Bigr)$$',
        '',
        '**极限在 $\\mathbf{Top}$ 里怎么算就怎么算**（反射子范畴对极限封闭），**余极限要先在 $\\mathbf{Top}$ 里算、再用 $\\beta$ 紧化回去**（左伴随保余极限）。',
        ['**证明。** 关键在于「哪些 $\\mathbf{Top}$ 里的余极限**同时也是** $\\mathbf{CHaus}$ 里的余极限」：',
          '- 四条性质在 $\\mathbf{Set}$（拓扑斯）里都成立；而 $\\mathbf{CHaus}$ 的极限在 $\\mathbf{Top}$ 里逐点算（$\\mathbf{CHaus}$ 对极限封闭），所以涉及极限的部分直接从 $\\mathbf{Set}$ 继承；',
          '- 一个**本身还是紧 Hausdorff** 的 $\\mathbf{Top}$ 余极限，就是 $\\mathbf{CHaus}$ 里的余极限 —— **有限余积**、**满射的余等化子**、**闭等价关系的余等化子**都属于这一类；',
          '- 于是：有限余积不交（先在 $\\mathbf{Set}$ 里不交，再注意到那个余积本身紧 Hausdorff）、满射万有（拉回仍是满射，仍在紧 Hausdorff 里）、闭等价关系有效（商对象紧 Hausdorff）；',
          '- 第 4 条：紧 Hausdorff 空间之间的**连续满射是商映射** —— 这正是「满 $\\implies$ 正则」。∎',
        ,
        '**四条公理在 $\\mathbf{CHaus}$ 里各自“靠什么”成立**（这条例子最能说明预拓扑斯公理的分量）：\n' +
        '\n' +
        '- **① 所有极限与余极限存在**：**极限**来自 $\\mathbf{Top}$ 的极限（紧 Hausdorff 对任意积/等化子封闭，用 Tychonoff）；**余极限**要取「商掉等价关系后的紧 Hausdorff 化」，即用 Stone–Čech 型反射把一般商修正成紧 Hausdorff。⚠️ 余极限**不是** $\\mathbf{Top}$ 里直接取商，要过一道反射 —— 这一步是这条命题唯一有技术含量的地方。\n' +
        '- **② 有限余积不交且万有**：**不交**用「紧 Hausdorff 的不交并仍紧 Hausdorff」；**万有**是「拉回稳定」，用紧 Hausdorff 的纤维积仍在 $\\mathbf{CHaus}$ 里（`prop.cgwh-fiber-product` 型的论证）。\n' +
        '- **③ 等价关系有效且万有**：**有效** = 商映射的核对恰好是原等价关系 —— 在紧 Hausdorff 里靠「商映射是闭的」保证（`prop.chaus-quotient-equiv` 那四条）。\n' +
        '- **④ 满态射正则且万有**：**满态射 = 满射**（同样来自紧 Hausdorff 的特殊性），于是正则性自动。\n' +
        '\n' +
        '⚠️ **$\\mathbf{CHaus}$ 不是拓扑斯**：缺**小生成元 + 任意余极限**（任意余极限要反射，且没有可表小生成元/子对象分类器）。所以它只是**预拓扑斯** —— 这个例子正好说明“预拓扑斯”这个概念的用处：它捕捉了“能做商与等价关系”这一层。\n',
        ,
        '**各方向用到的假设**（预拓扑斯结论靠紧性和 Hausdorff 性共同保证）：\n' +
        '- 所列有限极限、有限不交万有余积及有效等价关系 $\\implies$ 预拓扑斯：按相应定义展开；任意小极限、余极限是额外性质。\n' +
        '- 紧 Hausdorff $\\implies$ 任意小积紧 Hausdorff：用 Tychonoff 定理；余极限存在则用到向紧 Hausdorff 范畴的反射，不能仅由右伴随保极限反推存在。\n' +
        '- 满态射 $\\implies$ 满射：非满时像是闭集，用紧 Hausdorff 空间的连续函数分离点与闭集；满射 $\\implies$ 正则满则用紧到 Hausdorff 连续满射为闭商映射。\n' +
        '- 内部等价关系 $\\implies$ 有效且万有：关系在乘积里为闭子空间，闭等价关系的商仍紧 Hausdorff；一般拓扑等价关系没有此保证。\n' +
        '- 有限不交并仍紧，给有限余积性质；无限个非空开闭分支的不交并通常不紧。原注说本范畴缺任意余极限不对，缺少拓扑斯结构不能归因于不存在这些余极限。\n'
        ].join('\n'),
        '第 2、3 条也可以从 $\\mathbf{Set}$ 继承：不交性、万有性、有效性都是「逐点」的性质，而 $\\mathbf{CHaus}$ 里的构造逐点继承集合。'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 4.1.1', 'Le Stum, Corollary 4.1.2']
    },

    /* ---------------------------------------------------- 凝聚态集 */
    {
      id: 'def.condensed-set',
      cluster: 'cond.set',
      type: 'definition',
      label: '凝聚态集',
      title: '凝聚态集',
      regions: ['condensed'],
      tags: ['凝聚态', '层', '定义'],
      statement: [
        '**凝聚态集**是 $\\mathbf{CHaus}$ 上的（集合值）**层**。其范畴记',
        '',
        '$$\\mathrm{Cond} \\;:=\\; \\widehat{\\mathbf{CHaus}}$$',
        '',
        '这里 $\\mathbf{CHaus}$ 配的是它的**预标准拓扑**。'
      ].join('\n'),
      notes: [
        '**例 1. 拓扑空间给凝聚态集。** 任一拓扑空间 $X$ 给出凝聚态集 $\\underline{X}(S) := C(S, X) = \\operatorname{Hom}_{\\mathbf{Top}}(S, X)$ —— 从 $S$ 到 $X$ 的连续映射全体。',
        '**例 2. 收敛序列。** 取 $X$ 是拓扑空间，则 $\\underline{X}(\\bar{\\mathbb{N}})$ 恰好是「**收敛序列 $(x_{n})_{n \\ge 1}$ 连同指定的极限 $x_{\\infty}$**」的集合 —— 这里 $\\bar{\\mathbb{N}}$ 是 $\\mathbb{N}$ 的**一点紧化**，而「收敛序列连同极限」正好就是从 $\\bar{\\mathbb{N}}$ 到 $X$ 的连续映射：$\\mathbb{N}$ 上的像给出序列，新添那个点上的像给出极限。',
        '**例 3. 连续函数模掉局部常值函数。** 存在唯一的凝聚态集 $Q$ 使 $Q(S) = C(S, \\mathbb{R}) / C(S, \\mathbb{R}^{\\mathrm{disc}})$。',
        '这三个例子的共同点：**取值都是「从紧 Hausdorff 空间出发的连续映射的某种商或子集」**。凝聚态集之所以能记住拓扑信息，靠的就是把这些映射全留下来。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §4']
    },

    /* ------------------------------------------------ 凝聚态集的刻画 */
    {
      id: 'prop.condensed-criterion',
      cluster: 'cond.set',
      type: 'proposition',
      label: '凝聚态集的刻画',
      title: '预层是凝聚态集的两条判据',
      regions: ['condensed'],
      tags: ['凝聚态', '层', '判据'],
      statement: [
        '$\\mathbf{CHaus}$ 上的集合预层 $X$ 是凝聚态集 $\\iff$',
        '',
        '1. 对有限族 $(S_{i})_{i \\in I}$：',
        '',
        '$$X\\Bigl(\\coprod_{i \\in I} S_{i}\\Bigr) \\;\\cong\\; \\prod_{i \\in I} X(S_{i})$$',
        '',
        '2. 对任何**闭等价关系** $R \\rightrightarrows S$：',
        '',
        '$$X\\bigl(\\operatorname{coker}(R \\rightrightarrows S)\\bigr) \\;\\cong\\; \\ker\\bigl(X(S) \\rightrightarrows X(R)\\bigr)$$',
        '',
        '特别地 $X(\\emptyset) \\cong \\{\\ast\\}$；等价地，若 $S\' \\to S$ 是满射，则',
        '',
        '$$X(S) \\longrightarrow X(S\') \\rightrightarrows X(S\' \\times_{S} S\')$$',
        '',
        '左正合。'
      ].join('\n'),
      notes: [
        '$\\mathbf{CHaus}$ 是预拓扑斯，所以它上面的预标准拓扑恰好由两类覆盖生成：**有限不交并**与**满射**。上面第 1、2 条就是这两类覆盖下的层条件 —— 「有限余积变有限积」与「商变核」。',
        '换一种写法：$X$ 是凝聚态集 $\\iff$ 它把有限余积变成有限积、把余等化子变成等化子。这句话后面的所有构造都在用。',
        ['**证明。** 只需对预标准拓扑的**生成元**验证层条件 —— 一般覆盖由「有限不交并」与「满射」复合而成，够用的正是两类：',
          '- **有限不交并**：覆盖是 $(S_{i} \\hookrightarrow S)_{i \\in I}$（$I$ 有限、$\\coprod_{i} S_{i} \\to S$ 双射）。\n\n层条件要求 $X(S) \\to \\prod_{i} X(S_{i}) \\rightrightarrows \\prod_{i,j} X(S_{i} \\times_{S} S_{j})$ 正合；\n\n由不交性，$i \\ne j$ 时 $S_{i} \\times_{S} S_{j} = \\emptyset$、$i = j$ 时 $= S_{i}$，而 $X(\\emptyset) = \\{\\ast\\}$，于是那对映射一个是恒等、一个是常值 —— 正合化归为 $X(S) \\cong \\prod_{i} X(S_{i})$，即 (4.1)。\n\n特别地取 $I = \\emptyset$ 得 $X(\\emptyset) = \\{\\ast\\}$。',
          '- **满射**：覆盖是单个满射 $S\' \\twoheadrightarrow S$。层条件就是 $X(S) \\to X(S\') \\rightrightarrows X(S\' \\times_{S} S\')$ 左正合，即 (4.2)。',
          '反过来，两条条件合起来显然蕴含「对所有覆盖是层」（覆盖可以分解成这两类的复合），于是判据成立。∎',
        ,
        '**各方向用到的假设**（有限联合满射拓扑的生成覆盖判据）：\n' +
        '- 层 $\\implies$ 保有限余积为积及满射的核对等化子：展开两类覆盖的层条件；空覆盖同时要求 $X(\\emptyset)$ 为单点。\n' +
        '- 两条判据 $\\implies$ 层：用每个有限联合满射覆盖分解为有限不交并与单个满射，以及覆盖复合的下降；不是对任意拓扑都成立。\n' +
        '- 闭等价关系商的条件 $\\iff$ 满射核对的条件：用紧 Hausdorff 满射为有效商、闭等价关系商仍紧 Hausdorff，代价在 `def.chaus-pretopos`。\n' +
        '- 单独满射下降不够：常值二元集预层满足每个单个满射的核对等化子条件，却不把空余积送到单点，也不保二项余积，故有限余积条件不能省。\n'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §4']
    },

    /* ------------------------------------------------ Cond 是拓扑斯 */
    {
      id: 'thm.cond-topos',
      cluster: 'cond.set',
      type: 'theorem',
      label: 'Cond 是拓扑斯',
      title: '凝聚态集的范畴是拓扑斯',
      regions: ['condensed'],
      tags: ['凝聚态', '拓扑斯'],
      statement: '**凝聚态集的范畴 $\\mathrm{Cond}$ 是拓扑斯。**',
      notes: [
        '**这句话的代价**：一旦 $\\mathrm{Cond}$ 是拓扑斯，就自动拥有三个东西 —— **内部 Hom**（$\\mathrm{Cond}$ 笛卡尔闭）、**层上同调**（拓扑斯上总能对阿贝尔群取上同调）、**取商**（等价关系总能商掉）。凝聚态数学后面的一切都建立在这三件工具上。',
        '⭐ **理由不在这一条里，而在旁边三条**：$\\mathrm{Cond}$ 之所以是拓扑斯，是因为它逐条满足 Giraud 判据 ——',
        '',
        [
          '- **极限与余极限逐点计算**（「Cond 的极限与余极限」）：保证余极限存在、且是万有的；',
          '- **每个满态射都是正则的**（「Cond 的满态射都是正则的」）：保证商映射是良态的；',
          '- **每个等价关系都是有效的**（「Cond 的等价关系有效」）：保证商了再拉回来能还原。'
        ].join('\n'),
        '',
        '三条合起来 $\\implies$ 拓扑斯。所以这一条是**结论**，那三条是**理由**；看这一团时先看结论定方向，再看三条理清它凭什么。'
      ].join('\n\n'),
      refs: ['Le Stum, §4.1']
    },

    /* ---------------------------------------------- FCHaus 上的预拓扑 */
    {
      id: 'prop.fchaus-pretopology',
      cluster: 'cond.set',
      type: 'proposition',
      label: '有限紧 Hausdorff 空间上的预拓扑',
      title: '有限不交并给出自由紧 Hausforff 空间上的预拓扑',
      regions: ['condensed'],
      tags: ['凝聚态', '自由', '预拓扑'],
      statement: [
        '记 $\\mathbf{FCHaus}$ 为**自由紧 Hausdorff 空间**（即 $\\beta I$）构成的满子范畴。\n\n$\\mathbf{FCHaus}$ 中的对象都是 $\\mathrm{Cond}$ 的**投射对象**，满射 $S \\to S\'$ 总有截面 —— 于是**有限不交并给出 $\\mathbf{FCHaus}$ 上的一个预拓扑**。'
      ].join('\n'),
      notes: [
        '为什么层条件「自动成立」：在自由紧 Hausdorff 空间上，满射有截面，所以「局部有原像」总能在整体上补出来（分离性由截面的存在直接给出）。**能取截面**是这里最省事的一点。',
        ['**证明（验证预拓扑的三条公理）。** 覆盖约定为：$(F_{i} \\to F)_{i \\in I}$，$I$ 有限且 $\\coprod_{i} F_{i} \\to F$ 双射。',
          '- **恒等**：$\\{\\mathrm{id}_{F}\\}$ 是覆盖；',
          '- **拉回稳定**：给覆盖与任意 $F\' \\to F$，拉回族 $(F_{i} \\times_{F} F\' \\to F\')_{i}$ 仍然有限，且由「不交并沿任意映射拉回仍是不交并」得 $\\coprod_{i}(F_{i} \\times_{F} F\') \\cong F\'$；\n\n$\\mathbf{FCHaus}$ 对有限不交并与纤维积封闭（自由对象的有限不交并还是自由的：$\\beta I \\coprod \\beta J = \\beta(I \\coprod J)$）；\n\n',
          '- **复合**：覆盖的覆盖拼起来还是覆盖。',
          '另外，$\\mathbf{FCHaus}$ 里的覆盖 $\\coprod_{i} F_{i} \\to F$ 是**双射**，于是每个 $F_{i} \\to F$ 都是含入，而「$F \\to F_{i}$ 的截面」由 $F_{i}$ 的闭性 + 完全性给出 —— 这就是为什么这里的层条件好验。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 4.1']
    },

    /* ------------------------------------------- FCHaus 上层的判据 */
    {
      id: 'prop.fchaus-sheaf',
      cluster: 'cond.set',
      type: 'proposition',
      label: '有限紧 Hausdorff 空间上层的判据',
      title: '自由紧 Hausforff 空间上的层 $\\iff$ 保有限积',
      regions: ['condensed'],
      tags: ['凝聚态', '自由', '层'],
      statement: '设 $X$ 是 $\\mathbf{FCHaus}$ 上的集合预层。则 $X$ 是层 $\\iff$ $X$ **保有限积**。',
      notes: [
        ['**证明。** $\\mathbf{FCHaus}$ 上的覆盖就是「有限不交并」，即 $F = \\coprod_{i \\in I} F_{i}$（$I$ 有限）。对它写层条件：',
          '$$X(F) \\longrightarrow \\prod_{i} X(F_{i}) \\rightrightarrows \\prod_{i,j} X(F_{i} \\times_{F} F_{j}).$$',
          '- 由不交性，$i \\ne j$ 时 $F_{i} \\times_{F} F_{j} = \\emptyset$、$i = j$ 时 $= F_{i}$。\n\n于是右边那对映射一个是恒等、另一个把 $i \\ne j$ 的分量送到 $X(\\emptyset)$ —— 而 $X(\\emptyset)$ 由 $I = \\emptyset$ 的层条件（$X$ 保空余积）给出 $X(\\emptyset) \\cong \\{\\ast\\}$。',
          '- 所以层条件正合化归为 $X\\bigl(\\coprod_{i} F_{i}\\bigr) \\cong \\prod_{i} X(F_{i})$ —— 这正是「保有限积」。',
          '反过来，若 $X$ 保有限积，则上述每一条层条件自动成立。∎',
          '⭐ **用处**：这一条把「$\\mathrm{Cond}$ 里的层」换成了一句纯代数的话 ——「保有限积的函子」。于是验一条性质是不是层，只要验它是否保有限积。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 4.2']
    },

    /* ------------------------------------------------ Cond ≅ FCHaus */
    {
      id: 'thm.cond-equiv-fchaus',
      cluster: 'cond.set',
      type: 'theorem',
      label: '凝聚态集就是有限紧 Hausdorff 空间上的层',
      title: '$\\mathrm{Cond} \\simeq \\widehat{\\mathbf{FCHaus}}$',
      regions: ['condensed'],
      tags: ['凝聚态', '等价', '自由'],
      statement: [
        '$\\mathbf{CHaus}$ 上的层与 $\\mathbf{FCHaus}$ 上的层是**同一个范畴**：',
        '',
        '$$\\mathrm{Cond} \\;\\simeq\\; \\widehat{\\mathbf{FCHaus}}$$'
      ].join('\n'),
      notes: '两个方向：$\\mathbf{CHaus}$ 上的层限制到 $\\mathbf{FCHaus}$ 上仍是层（覆盖变少了，层的条件只会更容易满足）；反过来，$\\mathbf{FCHaus}$ 上的层 $X$ 沿「自由对象到 $S$ 的映射」取滤过余极限延拓回 $\\mathbf{CHaus}$，得到的就是粘合出来的那个值。\n\n证明见边上那条推导。',
      refs: ['Le Stum, An introduction to condensed mathematics, §4']
    },

    /* ------------------------------------------------ 满态射的判据 */
    {
      id: 'prop.cond-epi',
      cluster: 'cond.set',
      type: 'proposition',
      label: '凝聚态集满态射的判据',
      title: '凝聚态集的满态射',
      regions: ['condensed'],
      tags: ['凝聚态', '满态射'],
      notes: [
        '**在说什么**：凝聚态集的态射满不满，只要在**自由**紧 Hausdorff 空间 $F$ 上逐个看 $X(F) \\to Y(F)$ 是不是满的，就判完了。',
        '⭐ 为什么「自由的」那一批就够：自由紧 Hausdorff 空间（$\\beta I$）在 $\\mathrm{Cond}$ 里构成**生成元族**，而拓扑斯里的满态射只需在生成元族上验。',
        '⚠ 这里的「满」是**层论意义**的满（局部能提升），不是「每个测试空间上都逐点满」—— 后者更强。本条的正确性依赖「$\\mathrm{Cond}$ 是拓扑斯 + 自由紧 Hausdorff 是生成元族」，本图没有把「生成元族 $implies$ 只需在它们上验」单独立节点。',
      ].join('\n'),
      status: 'skeleton',
      statement: '凝聚态集的态射 $X \\to Y$ 是满态射 $\\iff$ 对每个**自由**紧 Hausdorff 空间 $F$，$X(F) \\to Y(F)$ 是满射。',
      refs: ['Le Stum, An introduction to condensed mathematics, §4']
    },

    /* ------------------------------------------------ 足够多投射对象 */
    {
      id: 'prop.cond-projectives',
      cluster: 'cond.set',
      type: 'proposition',
      label: 'Cond 有足够多投射对象',
      title: '$\\mathrm{Cond}$ 的投射对象',
      regions: ['condensed'],
      tags: ['凝聚态', '投射对象'],
      statement: [
        '自由紧 Hausdorff 空间（看作凝聚态集）都是**投射对象**；并且 $\\mathrm{Cond}$ 有**足够多的投射对象**。'
      ].join('\n'),
      notes: [
        ['**证明。** 分两步。',
          '- **自由紧 Hausdorff 空间是投射对象。** 记 $F = \\beta I$ 自由。\n\n任给满态射 $X \\twoheadrightarrow Y$ 与 $y \\in Y(F)$。\n\n由**满态射的判据**（在自由对象上逐点满），$y$ 在某个覆盖上局部有原像：存在有限不交并分解 $F = \\coprod_{k=1}^{n} F_{k}$ 与 $x_{k} \\in X(F_{k})$ 使 $p(x_{k}) = y|_{F_{k}}$。\n\n把 $(x_{k})_{k}$ 拼起来，用「保有限积」的层条件得 $x \\in X(F) = \\prod_{k} X(F_{k})$，且 $p(x) = y$ —— 这就是提升。',
          '- **足够多投射对象。** 任给凝聚态集 $X$：由「$\\mathbf{FCHaus}$ 张成 $\\mathbf{CHaus}$」（每个紧 Hausdorff 空间都是自由空间的满像），可取含 $X$ 的满态射 $\\coprod_{i} h_{F_{i}} \\twoheadrightarrow X$（$h_{F_{i}}$ 表示自由空间），而自由对象的**余积**仍是投射对象（「投射对象的余积还是投射的」）。\n\n于是每个 $X$ 都是某个投射对象的商。\n\n∎'
        ].join('\n'),
        '⭐ **为什么这件事对凝聚态数学这么要紧**：$\\mathrm{Cond}$ 有足够多**投射**对象（不像一般拓扑斯只有足够多内射），于是「左导出函子」在 $\\mathrm{Cond}$ 里可以直接用自由紧 Hausdorff 块算 —— 这是 $\\mathrm{CondAb}$ 能做导出代数的那一半依据。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 4.3']
    },

    /* ------------------------------------------------ 底拓扑空间 */
    {
      id: 'def.underlying-topological-space',
      cluster: 'cond.set',
      type: 'definition',
      label: '底拓扑空间',
      title: '凝聚态集的底拓扑空间',
      regions: ['condensed'],
      tags: ['凝聚态', '拓扑空间'],
      statement: [
        '凝聚态集 $X$ 的**底拓扑空间** $X(\\cdot)$ 取集合 $X(\\ast)$（在单点空间处的截面），并赋予使所有映射',
        '',
        '$$f : S \\longrightarrow X(\\cdot), \\qquad f \\in X(S),\\ S \\in \\mathbf{CHaus}$$',
        '',
        '都连续的**最细**拓扑。'
      ].join('\n'),
      notes: '等价刻画：$Y \\subseteq X(\\cdot)$ 是开集 $\\iff$ 对每个 $S \\in \\mathbf{CHaus}$ 与每个 $f \\in X(S)$，$f^{-1}(Y)$ 在 $S$ 中开。\n\n所以「$X$ 的底空间」记下了 $X$ 能看见的全部拓扑信息，但**一般会丢掉 $X$ 自己的精细结构** —— 除非 $X$ 来自一个紧生成空间。',
      refs: ['Le Stum, An introduction to condensed mathematics, §4']
    },

    /* ------------------------------------------------ Top ↔ Cond */
    {
      id: 'thm.top-cond-adjoint',
      cluster: 'cond.set',
      type: 'theorem',
      label: 'Top 与 Cond 的伴随',
      title: '$\\mathbf{Top} \\to \\mathrm{Cond}$ 与它的伴随',
      regions: ['condensed'],
      tags: ['凝聚态', '伴随', '紧生成'],
      statement: [
        '函子',
        '',
        '$$\\mathbf{Top} \\longrightarrow \\mathrm{Cond}, \\qquad X \\mapsto \\underline{X},\\quad \\underline{X}(S) := C(S, X)$$',
        '',
        '是**忠实**的，并且有右伴随 $X \\mapsto X(\\cdot)$。限制到**紧生成空间**的满子范畴上时，它变成**全忠实**的。'
      ].join('\n'),
      notes: '关键一句：**若 $X$ 是拓扑空间，则它的底空间 $X(\\cdot) \\cong kX$**。\n\n所以「拓扑空间 $\\to$ 凝聚态集 $\\to$ 底拓扑空间」这个来回，做的正是**$k$-化**：它把一般拓扑空间换成紧生成的那一个，之后就不再变化。\n\n于是 $k\\mathbf{Top}$ 恰好是 $\\mathrm{Cond}$ 里「完整地记得自己」的那部分，而一般的 $\\mathbf{Top}$ 多出来的那些空间在 $\\mathrm{Cond}$ 里被合并掉了。',
      refs: ['Le Stum, An introduction to condensed mathematics, §4']
    },

    /* ---------------------------------------------- 凝聚态阿贝尔群 */
    {
      id: 'def.condensed-abelian-group',
      cluster: 'cond.ab',
      type: 'definition',
      label: '凝聚态阿贝尔群',
      title: '凝聚态阿贝尔群',
      regions: ['condensed'],
      tags: ['凝聚态', '阿贝尔群', '层'],
      statement: [
        '**凝聚态阿贝尔群**就是 $\\mathrm{Cond}$ 上的**阿贝尔层**。四种说法给出同一个范畴：',
        '',
        '$$\\mathrm{Ab}(\\mathrm{Cond}) \\;\\simeq\\; \\mathrm{Cond}(\\mathrm{Ab}) \\;\\simeq\\; \\widehat{\\mathbf{CHaus}}(\\mathrm{Ab}) \\;\\simeq\\; \\widehat{\\mathbf{FCHaus}}(\\mathrm{Ab})$$',
        '',
        '记作 $\\mathrm{CondAb}$。'
      ].join('\n'),
      notes: [
        '一般定义见「阿贝尔层」—— 凝聚态阿贝尔群就是 $\\mathcal{T} = \\mathrm{Cond}$ 的那个特例。',
        '在紧 Hausdorff 这个场地里层条件可以化简：**$M$ 是凝聚态阿贝尔群 $\\iff$ 它保有限积**（一般拓扑斯上没有这么干净的判据）。',
        '记号：$\\operatorname{Hom}_{\\mathbb{Z}}(M, N) := \\operatorname{Hom}_{\\mathrm{CondAb}}(M, N)$。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §6.1']
    },

    /* ------------------------------------------------ 截面函子 */
    {
      id: 'prop.condab-section',
      cluster: 'cond.ab',
      type: 'proposition',
      label: '截面函子保极限余极限',
      title: '截面函子 $\\Gamma(F, -)$',
      regions: ['condensed'],
      tags: ['凝聚态', '截面', '正合'],
      statement: [
        '设 $F \\in \\mathbf{FCHaus}$。则**截面函子**',
        '',
        '$$\\Gamma(F, -) : \\mathrm{CondAb} \\longrightarrow \\mathbf{Ab}, \\qquad M \\mapsto \\Gamma(F, M) := M(F)$$',
        '',
        '保**所有极限与所有余极限**。'
      ].join('\n'),
      notes: [
        '理由：层在 $F$ 处的截面是「逐点」算出来的，而 $\\mathbf{Ab}$ 里有限积与有限余积一致、滤过余极限正合。',
        '这条是**把 $\\mathrm{CondAb}$ 的性质逐点归到 $\\mathbf{Ab}$** 的通道 —— 下面的 AB 公理那一条就是靠它推出来的。',
        ['**证明。** 把 $\\mathrm{CondAb}$ 等同于 $\\mathbf{FCHaus}$ 上的阿贝尔层范畴（这是「$\\mathrm{Cond} \\simeq \\widehat{\\mathbf{FCHaus}}$」的加法版本）。',
          '- **保余极限**：只需证预层意义的余极限**自动是层**。$F$ 自由时，$\\mathbf{FCHaus}$ 上的覆盖就是有限不交并，于是对 $\\coprod_{j=1}^{r} F_{j}$：',
          '$$\\Bigl(\\varinjlim_{i} M_{i}\\Bigr)\\Bigl(\\coprod_{j} F_{j}\\Bigr) = \\varinjlim_{i} M_{i}\\Bigl(\\coprod_{j} F_{j}\\Bigr) = \\varinjlim_{i} \\bigoplus_{j} M_{i}(F_{j}) = \\bigoplus_{j} \\varinjlim_{i} M_{i}(F_{j}),$$',
          '中间一步用「$\\mathbf{FCHaus}$ 上的层保有限积」（即 $M(\\coprod F_{j}) = \\bigoplus M(F_{j})$），最后一步用 $\\mathbf{Ab}$ 里有限积与有限余积一致、且滤过余极限正合。既然余极限仍满足层条件，它就是层内的余极限，且 $\\Gamma(F, -)$ 与它交换 ✓。',
          '- **保极限**：层范畴里的极限**逐项**计算（预层极限自动是层），故 $\\Gamma(F, \\varprojlim M_{i}) = \\varprojlim \\Gamma(F, M_{i})$ ✓。∎',
          '⭐ 推论：$\\Gamma(F,-)$ 还是**正合**的（既保核又保余核）—— 这正是「自由紧 Hausdorff 空间给投射对象」的根源。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 6.1.3']
    },

    /* ------------------------------------------------ Grothendieck 范畴 */
    {
      id: 'def.ab-axioms',
      cluster: 'hom.ab',
      type: 'definition',
      label: 'Grothendieck 的 AB 公理',
      title: 'Grothendieck 的 AB 公理（AB1–AB6）',
      regions: ['homology'],
      tags: ['同调代数', 'AB 公理', '正合'],
      statement: [
        '范畴 $\\mathcal{C}$ 的**正合性等级**（Grothendieck 的 AB 公理）逐条加强如下：',
        '',
        '1. **AB1**：预阿贝尔范畴；',
        '2. **AB2**：阿贝尔范畴；',
        '3. **AB3**：AB2 且有所有余极限（**AB3\\*** 是对偶）；',
        '4. **AB4**：AB3 且**余积正合**（**AB4\\*** 是对偶）；',
        '5. **AB5**：AB4 且**滤过余极限正合**（**AB5\\*** 是对偶）；',
        '6. **AB6**：AB5 且**滤过余极限与积交换**（**AB5\\*** 是对偶）。'
      ].join('\n'),
      notes: [
        '一个字读法：**头两条补的是「态射有没有核与余核、单满正不正则」；后面几条一路在补「越来越多的余极限操作是正合的、并且和别的操作交换」。**',
        '⭐ **这些公理之间还有蕴含关系**（见「AB5 与 AB3*/AB4* 的关系」）：Grothendieck 范畴自动满足 AB3\\*；AB5 与 AB5\\* 互斥（除零范畴外不能同时成立）；\n\n拓扑斯上的 $\\mathbf{Ab}(\\mathcal{T})$ 停在 AB5 + AB3\\*，而 $\\mathrm{CondAb}$ 能上到 AB6 + AB4\\*。',
        '⭐ **哪些范畴落在哪一级**是另一条独立的事，见「AB 公理的例子表」—— 那张表把 $\\mathbf{Ab}$、$\\mathbf{AbTop}$、$\\mathbf{AbCHaus}$、预层范畴、拓扑斯上的阿贝尔群、$\\mathrm{CondAb}$ 全部排了一遍。',
        '⚠️ 这条只给**定义与名字**：AB 公理是一把尺子，用来量「一个范畴能做多少同调代数」。真正有用的是把它用在具体范畴上得到的结论（即上面两条）。'
      ].join('\n\n'),
      refs: ['Le Stum, Definition 5.2.5']
    },
    {
      id: 'def.grothendieck-category',
      cluster: 'hom.ab',
      type: 'definition',
      label: 'Grothendieck 范畴',
      title: 'Grothendieck 范畴',
      regions: ['homology'],
      tags: ['范畴论', '同调代数', '生成元'],
      statement: [
        '**Grothendieck 范畴**是带**生成元**的 **AB5** 范畴（AB5 即：有所有余极限，且滤过余极限正合）。'
      ].join('\n'),
      notes: [
        '例：$A\\text{-}\\mathbf{Mod}$ 是 Grothendieck 范畴；阿贝尔范畴 $\\mathcal{C}$ 的 $\\operatorname{Ind}(\\mathcal{C})$（按滤过余极限补全）也是；\n\n拓扑斯 $\\mathcal{T}$ 上的 $\\mathbf{Ab}(\\mathcal{T})$ 也是（见「拓扑斯上的阿贝尔群是 Grothendieck 范畴」）。',
        '两条随定义而来的事实：Grothendieck 范畴**自动满足 AB3\\***（有所有极限）；而且它**有足够多的内射对象**。',
        '「滤过余极限正合 + 有生成元」这两条合起来，就足以让一套同调代数跑起来 —— 这是 Grothendieck 那一代人为「在抽象范畴上做同调代数」挑出来的最低要求。'
      ].join('\n\n'),
      refs: ['Le Stum, An introduction to condensed mathematics, §5.1–5.2']
    },

    /* ------------------------------------------------ CondAb 的 AB 公理 */
    {
      id: 'thm.condab-ab',
      cluster: 'cond.ab',
      type: 'theorem',
      label: '凝聚态阿贝尔群满足 AB6 与 AB4*',
      title: '凝聚态阿贝尔群的 AB 公理',
      regions: ['condensed'],
      tags: ['凝聚态', '同调代数', '正合'],
      statement: '$\\mathrm{CondAb}$ 是**Grothendieck 范畴**，并且满足 **AB6** 与 **AB4\\***。',
      notes: [
        '推论：$\\mathrm{CondAb}$ 是**阿贝尔范畴**，并且（1）有生成元；（2）所有极限与余极限存在；（3）所有积与余积都**正合**；（4）**滤过余极限正合，且与积交换**。',
        '「是 Grothendieck 范畴」那一半其实对**任意**拓扑斯都成立（见「拓扑斯上的阿贝尔群是 Grothendieck 范畴」）；这里真正多出来的是 **AB6 与 AB4\\*** —— 一般拓扑斯上的阿贝尔群并不同时具备这两条。',
        '这一整段的好处是：$\\mathrm{CondAb}$ 上能照搬 $\\mathbf{Ab}$ 上那一套同调代数 —— 求导函子、长正合列、导出范畴，一样都不缺。',
        ['**证明（逐条归约到 $\\mathbf{Ab}$）。** 关键工具就是上一条：**每个 $\\Gamma(F,-)$（$F$ 自由）都保所有极限与余极限**，所以任何「用有限极限 + 余极限写出来的性质」都可以逐项检验，而逐项之后就是 $\\mathbf{Ab}$ 里的熟事实。',
          '- **有余极限 / 有极限**：逐项取余极限得到的预层仍是层（上一条）$\\implies$ 存在 ✓；',
          '- **滤过余极限正合（AB5）**：逐项算，$\\mathbf{Ab}$ 里滤过余极限正合 ✓；',
          '- **有生成元**：$\\mathrm{Cond}$ 由 $\\{h_{F}\\}$（$F$ 自由紧 Hausdorff）生成 $\\implies$ $\\mathrm{CondAb}$ 由 $\\{\\mathbb{Z}\\cdot F\\}$ 生成 ✓；',
          '- **AB4\\*（积正合）**：积逐项算，$\\mathbf{Ab}$ 里积正合 ✓；',
          '- **AB6（滤过余极限与积交换）**：逐项化归到 $\\mathbf{Ab}$ 的 AB6 ✓；',
          '- **阿贝尔**：核、余核逐项算都是 $\\mathbf{Ab}$ 里的核余核，单满分解、$\\operatorname{im}\\cong\\operatorname{coim}$ 都逐项成立 ✓。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 6.1.4', 'Le Stum, Corollary 6.1.5']
    },

    /* ------------------------------------------------ Stonean 给投射对象 */
    {
      id: 'lem.stonean-projective',
      cluster: 'cond.ab',
      type: 'lemma',
      label: 'Stonean 给出有限表现投射对象',
      title: 'Stonean 空间给出有限表现的投射对象',
      regions: ['condensed'],
      tags: ['凝聚态', 'Stonean', '投射'],
      statement: [
        '设 $F$ 是**自由紧 Hausdorff 空间**（更一般地，**Stonean 空间**）。则自由凝聚态阿贝尔群 $\\mathbb{Z}\\cdot F$ 是**有限表现**的**投射**凝聚态阿贝尔群。'
      ].join('\n'),
      notes: [
        '要证的等价形式是：函子 $M \\mapsto \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot F, M) \\cong \\Gamma(F, M)$ 保满态射与滤过余极限。\n\n前半由「自由紧 Hausdorff 空间在 $\\mathrm{Cond}$ 里投射」给出，后半由截面函子的构造给出 —— 而截面函子实际上**保所有余极限**。',
        ['**证明。** 由张量—Hom 伴随，$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot F, M) \\cong M(F) = \\Gamma(F, M)$ ✓，所以只需看 $\\Gamma(F,-)$。',
          '- **保满态射**：上一条说 $\\Gamma(F,-)$ 保**所有**余极限，特别地保余核；$v$ 满 $\\iff$ $\\operatorname{coker} v = 0$ $\\implies$ $\\operatorname{coker}\\Gamma(v) = 0$ $\\implies$ $\\Gamma(v)$ 满 ✓；\n\n',
          '- **保滤过余极限**：同样由「保所有余极限」✓。',
          '而标准判据是：$P$ **投射** $\\iff$ $\\operatorname{Hom}(P,-)$ 保满态射；$P$ **有限表现** $\\iff$ $\\operatorname{Hom}(P,-)$ 保滤过余极限。两条合起来，$\\mathbb{Z}\\cdot F$ 就是有限表现的投射对象。∎'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Lemma 6.1.6']
    },

    /* ------------------------------------------------ CondAb 的生成元 */
    {
      id: 'prop.condab-generated',
      cluster: 'cond.ab',
      type: 'proposition',
      label: 'CondAb 由有限表现投射对象生成',
      title: '$\\mathrm{CondAb}$ 的生成元',
      regions: ['condensed'],
      tags: ['凝聚态', '生成元', '投射'],
      statement: '$\\mathrm{CondAb}$ 由**有限表现的投射**凝聚态阿贝尔群生成。特别地，它有足够多的投射对象。',
      notes: [
        ['**证明。**',
          '- **生成**：$\\mathrm{Cond}$ 由 $\\{h_{F}\\}$（$F$ 自由紧 Hausdorff）生成；而一般地「若 $\\{X_{i}\\}$ 生成 $\\mathcal{C}$，则 $\\{\\mathbb{Z}\\cdot X_{i}\\}$ 生成 $\\mathrm{Ab}(\\mathcal{C})$」（用自由阿贝尔群对象的泛性质：两个态射若在所有 $\\mathbb{Z}\\cdot X_{i}$ 上相同则相同）。\n\n' +
          '于是 $\\{\\mathbb{Z}\\cdot F\\}$ 生成 $\\mathrm{CondAb}$ ✓；\n\n' +
          '',
          '- 而每个 $\\mathbb{Z}\\cdot F$ 由**上一条**是有限表现的投射对象 ✓；',
          '- **足够多投射对象**：任给 $M$，由「生成」存在满态射 $\\bigoplus_{i} \\mathbb{Z}\\cdot F_{i} \\twoheadrightarrow M$，而投射对象的**余积**仍是投射对象 ✓ —— 所以每个 $M$ 都是某个投射对象的商。∎',
          '⭐ **这条是「在 $\\mathrm{CondAb}$ 里能做导出代数」的另一半依据**（另一半是「有足够多内射」，由它是 Grothendieck 范畴给出）：有足够多**投射**对象意味着**左**导出函子也能直接算。'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 6.1.7']
    }
  ],

  edges: [

    /* ---------------------------------------------- Cond 是拓扑斯 */
    {
      id: 'imp.cond-topos',
      kind: 'implication',
      sources: ['def.chaus-pretopos', 'def.free-presentation', 'thm.giraud'],
      target: 'thm.cond-topos',
      title: '$\\mathbf{CHaus}$ 是预拓扑斯 $\\implies$ $\\mathrm{Cond}$ 是拓扑斯',
      proof: [
        '用 Giraud 定理的第四条：**造出「预层范畴 + 正合反射」就够了**。',
        '',
        '取预层范畴 $\\widehat{\\mathbf{CHaus}}$，则 $\\mathrm{Cond} = \\widehat{\\mathbf{CHaus}}$ 是它的反射子范畴（反射是层化），并且层化**正合**（保有限极限，前面的层与拓扑那一段已经证过）。所以 $\\mathrm{Cond}$ 是拓扑斯。∎',
        '',
        '也可以直接验拓扑斯的四条公理，用的都是 $\\mathbf{CHaus}$ 是预拓扑斯这一条：',
        '',
        '**小生成元集。** 层范畴由可表示预层生成，所以取全体**自由**紧 Hausdorff 空间 $\\beta I$（在 $\\mathrm{Cond}$ 里）作生成元集即可 —— 每个紧 Hausdorff 空间都有自由表示 $\\beta S^{\\mathrm{disc}} \\twoheadrightarrow S$，于是每个可表示预层都被这些自由对象盖住。',
        '',
        '**有限极限、余积、等价关系。** 层范畴里的这些构造都是**逐点**算的（在 $\\mathbf{CHaus}$ 上取极限/余积/商），所以它们的不交性、万有性、有效性都由 $\\mathbf{CHaus}$ 的对应性质继承过来 —— 层化保有限极限与余极限，正好把结论从预层范畴运到层范畴。∎'
      ].join('\n'),
      note: '这就是整段路的终点：**从「紧 Hausdorff 空间」这一件拓扑材料出发，造出了一个拓扑斯。**'
    },

    /* ----------------------------------------- Cond ≅ FCHaus 上的层 */
    {
      id: 'imp.cond-fchaus',
      kind: 'implication',
      sources: ['prop.fchaus-sheaf', 'prop.fchaus-pretopology', 'def.free-presentation'],
      target: 'thm.cond-equiv-fchaus',
      title: '$\\mathrm{Cond} \\simeq \\widehat{\\mathbf{FCHaus}}$',
      proof: [
        '**（限制）** 设 $X$ 是 $\\mathbf{CHaus}$ 上的层，把它限制到 $\\mathbf{FCHaus}$ 上。$\\mathbf{FCHaus}$ 上的覆盖更少（只有有限不交并），层的条件只会更容易满足，所以限制仍是层。∎',
        '',
        '**（延拓）** 设 $X$ 是 $\\mathbf{FCHaus}$ 上的层。对 $S \\in \\mathbf{CHaus}$ 定义',
        '',
        '$$X(S) := \\varinjlim_{F \\to S} X(F)$$',
        '',
        '指标跑在「自由紧 Hausdorff 空间到 $S$ 的映射」上（按加细取滤过余极限）。',
        '',
        '**这就是层的粘合。** 由 $\\mathbf{CHaus}$ 里每个对象都有自由表示 $\\beta S^{\\mathrm{disc}} \\twoheadrightarrow S$，取 $R := \\beta S^{\\mathrm{disc}} \\times_{S} \\beta S^{\\mathrm{disc}}$ 与满射 $\\beta R \\to R$，则',
        '',
        '$$X(S) \\;=\\; \\varprojlim_{F \\to S} X(F) \\;\\cong\\; \\ker\\bigl(X(\\beta S^{\\mathrm{disc}}) \\rightrightarrows X(\\beta R)\\bigr) \\;=\\; \\{\\, x : X(p_{1})(x) = X(p_{2})(x) \\,\\}$$',
        '',
        '正是「相容的一族截面」。',
        '',
        '**反过来赋值。** 给定右边的一个 $x$ 与一个映射 $f : F\'\' \\to S$（$F\'\'$ 自由），由自由性 $f$ 可以提升为 $\\widetilde{f} : F\'\' \\to F$（$F \\twoheadrightarrow S$ 是那个自由表示），定义',
        '',
        '$$x_{f} := X(\\widetilde{f})(x) \\in X(F\'\')$$',
        '',
        '**提升的选取无关紧要。** 若 $\\widetilde{f}_{1}, \\widetilde{f}_{2}$ 是两个提升，则 $(\\widetilde{f}_{1}, \\widetilde{f}_{2}) : F\'\' \\to F \\times_{S} F$ 分解为 $p \\circ f\'$（因为 $F\' \\twoheadrightarrow F \\times_{S} F$ 满而 $F\'\'$ 自由），于是',
        '',
        '$$X(\\widetilde{f}_{1})(x) = X(f\')\\bigl(X(p_{1})(x)\\bigr) = X(f\')\\bigl(X(p_{2})(x)\\bigr) = X(\\widetilde{f}_{2})(x)$$',
        '',
        '所以 $(x_{f})_{f}$ 良定义，即有一族相容截面，$\\varphi(x) \\in X(S)$。两个方向互逆，于是 $\\mathbf{FCHaus}$ 上的层与 $\\mathbf{CHaus}$ 上的层是同一个范畴。∎',
        '',
        '又由「$\\mathbf{FCHaus}$ 上的层 $\\iff$ 保有限积」，$\\mathrm{Cond}$ 也可以等价地定义为「$\\mathbf{FCHaus}$ 上保有限积的预层」。∎'
      ].join('\n'),
      note: '换到 $\\mathbf{FCHaus}$ 上的好处是：那里的满射**都有截面**，于是「层」退化成最朴素的一条 —— **保有限积**。这是凝聚态数学里最常用的工作定义。'
    },

    /* -------------------------------------------------- 满态射的判据 */
    {
      id: 'imp.cond-epi',
      kind: 'implication',
      sources: ['def.sheaf', 'prop.cond-projectives', 'def.free-presentation'],
      target: 'prop.cond-epi',
      title: '满态射在自由空间上逐点检验',
      proof: [
        '**（$\\Longleftarrow$）** 显然：若每个 $X(F) \\to Y(F)$ 都满，则层之间的这个态射在每个自由对象上满，由「生成元集判定满态射」的一般道理即得它在 $\\mathrm{Cond}$ 里是满态射。∎',
        '',
        '**（$\\Longrightarrow$）** 设 $p : X \\to Y$ 是满态射，先证它「局部满」。取**像**',
        '',
        '$$\\operatorname{Im}(p)(S) := \\{\\, y \\in Y(S) \\ :\\ \\exists \\text{ 覆盖 } (S_{i} \\to S),\\ \\exists x \\in X(S_{i}),\\ p(x) = y|_{S_{i}} \\,\\}$$',
        '',
        '它是 $Y$ 的一个子层。由定义，$p$ 的每个值都落在 $\\operatorname{Im}(p)$ 里，即 $\\operatorname{Im}(p) \\hookrightarrow Y$ 是满态射；而它同时是单态射，故（层里单满即同构）$\\operatorname{Im}(p) = Y$。也就是说：**$p$ 局部满**。',
        '',
        '现在取 $F \\in \\mathbf{FCHaus}$ 与 $y \\in Y(F)$。\n\n由局部满，存在 $F$ 的覆盖，在其每一块 $F_{i}$ 上有 $x_{i} \\in X(F_{i})$ 使 $p(x_{i}) = y|_{F_{i}}$。\n\n$\\mathbf{FCHaus}$ 上的覆盖由**有限不交并**给出，而 $F$ 是自由的、余积在它上面就是无交并，所以可以直接把有限块上的 $x_{i}$ 拼起来（这正是「保有限积」那一条）：',
        '',
        '$$x := (x_{i})_{i} \\in \\prod_{i} X(F_{i}) \\;\\cong\\; X\\Bigl(\\coprod_{i} F_{i}\\Bigr) \\;=\\; X(F)$$',
        '',
        '并且 $p(x) = y$。所以 $X(F) \\to Y(F)$ 是满射。∎'
      ].join('\n'),
      note: '「满 = 局部满 = 局部可提升」是层论里的通用逻辑；而 $\\mathbf{FCHaus}$ 上的覆盖是**有限不交并**，所以局部终于能拼成整体 —— 这就是为什么探针只需要自由对象。'
    },

    /* -------------------------------------------- Top → Cond 的伴随 */
    {
      id: 'imp.top-cond-adjoint',
      kind: 'implication',
      sources: ['def.compactly-generated', 'def.condensed-set', 'prop.cg-coreflective'],
      target: 'thm.top-cond-adjoint',
      title: '$\\mathbf{Top} \\to \\mathrm{Cond}$ 忠实、限制到 $k\\mathbf{Top}$ 全忠实',
      proof: [
        '**$\\underline{X}$ 是凝聚态集。** 对任一点集 $S$，$\\underline{X}(S) = C(S, X)$；$C(-, X)$ 把 $\\mathbf{CHaus}$ 里的**有限不交并**变成有限积、把**商**变成核（连续映射在无交并上与商上都是逐块决定的）。\n\n由凝聚态集的两条判据，$\\underline{X}$ 是凝聚态集。\n\n∎',
        '',
        '**伴随。** 函子 $X \\mapsto \\underline{X}$ 与 $Z \\mapsto Z(\\cdot)$ 之间要给出',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, Z) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}\\bigl(X, Z(\\cdot)\\bigr)$$',
        '',
        '而 $\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, Z) = \\operatorname{Nat}(C(-,X), Z)$，按米田式的计算，它正是「在 $S = \\ast$ 处的取值」加上自然性 —— 也就是 $Z(\\cdot) = Z(\\ast)$ 上的一个元素，并且与所有 $\\underline{X}(S) = C(S,X)$ 相容。\n\n这恰恰是「从 $X$ 出发的连续映射」，两边一一对应。\n\n∎',
        '',
        '**忠实。** 由上面的伴随式取 $Z = \\underline{Y}$：',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, \\underline{Y}) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}\\bigl(X, \\underline{Y}(\\cdot)\\bigr)$$',
        '',
        '而关键的一步是：**$\\underline{Y}(\\cdot) \\cong kY$**（把 $Y$ 换成它的 $k$-化，拓扑可能变细）。于是',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, \\underline{Y}) \\;\\cong\\; \\operatorname{Hom}_{\\mathbf{Top}}(X, kY) \\;\\cong\\; \\operatorname{Hom}_{k\\mathbf{Top}}(kX, kY)$$',
        '',
        '（最后一个同构因为 $k\\mathbf{Top}$ 是余反射子范畴，$k$ 是含入的右伴随：$kX$ 处的映射等同于一切从 $X$ 出发射入紧生成空间的映射。）',
        '',
        '当 $X$ 本身紧生成时 $kX = X$，上式就是 $\\operatorname{Hom}_{\\mathrm{Cond}}(\\underline{X}, \\underline{Y}) \\cong \\operatorname{Hom}_{k\\mathbf{Top}}(X, kY)$，逐对 $X, Y$ 都是双射 —— **限制到 $k\\mathbf{Top}$ 上全忠实**。\n\n对一般 $X$，$X \\to kX$ 是同一集合上的恒等映射，所以函子在态射层仍是单射 —— **在 $\\mathbf{Top}$ 上忠实**。\n\n∎'
      ].join('\n'),
      note: '一句话记住：**「拓扑空间 $\\to$ 凝聚态集」这件事丢掉的东西，正好就是 $k$-化丢掉的东西。** 所以在 $k\\mathbf{Top}$ 上它不丢信息。'
    }
  ]
});
