/* =====================================================================
 * 195-category-atlas.js
 * 代数结构的范畴：Mon / Grp / Rng / G-Set / R-Mod / R-Alg / Field
 * 与 Set / Top / Ab / Vect 的极限—余极限—公理对照表。
 * 内容包：只放内容，不改引擎。
 * ===================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({
    nodes: [

      /* ---------------------------------------------------- 基础定义 */
      {
        id: 'def.monoid',
        cluster: 'algebra.structures',
        type: 'definition',
        label: '幺半群',
        title: '幺半群',
        regions: ['algebra'],
        tags: ['代数', '幺半群', '结合律', '单位元'],
        statement: '设 $M$ 是集合，$\\cdot$ 是 $M$ 上的二元运算，$e\\in M$。若结合律 $(ab)c=a(bc)$ 与单位元 $ea=ae=a$ 对一切 $a,b,c$ 成立，称 $(M,\\cdot,e)$ 为**幺半群**（monoid）；再满足交换律的称为**交换幺半群**。同态是保运算与单位的映射。',
        notes: [
          '**例**：$(\\mathbb N,+ ,0)$ 与 $(\\mathbb N,\\cdot,1)$ 都是交换幺半群；字符串在连接下是幺半群；$n\\times n$ 矩阵在乘法下是幺半群（$n\\ge 2$ 时不交换）。',
          '**与群的关系**：群恰是每个元素都可逆的幺半群；本图把群公理单列在 `def.group`，把交换群单列在 `def.abelian-group`。',
          '**与范畴中的幺半群对象分开**：`def.monoid-object` 是「对象 + 乘法 + 单位」在一般范畴里的内化，本条只是集合层面。'
        ].join('\n\n'),
        refs: ['Lang, Algebra, Ch. I', 'Mac Lane, Categories for the Working Mathematician, Ch. I']
      },

      {
        id: 'def.abelian-group',
        cluster: 'algebra.structures',
        type: 'definition',
        label: '阿贝尔群',
        title: '阿贝尔群（交换群）',
        regions: ['algebra'],
        tags: ['代数', '群', '交换群', '阿贝尔群'],
        statement: '设 $(G,\\cdot,e,{}^{-1})$ 是群。若对一切 $a,b\\in G$ 有 $ab=ba$，称 $G$ 为**阿贝尔群**（Abelian group）或**交换群**。等价地，$G$ 是 $\\mathbb Z$-模（把 $n$ 倍运算视为作用）。',
        notes: [
          '**例**：$(\\mathbb Z,+)$、$(\\mathbb Q,+)$、$(\\mathbb R,+)$、$(\\mathbb Z/n\\mathbb Z,+)$ 都是阿贝尔群；$(\\mathbb Q\\setminus\\{0\\},\\cdot)$ 也是。$n\\times n$ 可逆矩阵在乘法下（$n\\ge 2$）不是。',
          '**为什么单列**：`def.group` 只保留群公理；交换群在模论、同调代数与 $\\mathbf{Ab}$ 的定义里反复出现，单列后可直接被 `def.module`、`def.category-of-abelian-groups` 引用。',
          '**同态群**：对任意群 $G$，$\\hom(G,A)$（$A$ 阿贝尔）按逐点运算仍是阿贝尔群，这是「阿贝尔群是 $\\mathbf{Grp}$ 的充实基底」的最简形式。'
        ].join('\n\n'),
        refs: ['Lang, Algebra, Ch. I', 'Weibel, An Introduction to Homological Algebra, Ch. 1']
      },

      {
        id: 'def.cartesian-closed-category',
        cluster: 'cat.limit',
        type: 'definition',
        label: '笛卡尔闭范畴',
        title: '笛卡尔闭范畴',
        regions: ['category'],
        tags: ['范畴论', '笛卡尔闭', '指数对象'],
        statement: '范畴 $\\mathcal C$ 称为**笛卡尔闭**，若它有有限积（终对象与二元积），且对每个 $X$，函子 $(-)\\times X:\\mathcal C\\to\\mathcal C$ 有右伴随 $(-)^X$。等价地，存在求值态射 $\\mathrm{ev}:Y^X\\times X\\to Y$ 与自然双射 $\\hom_{\\mathcal C}(Z\\times X,Y)\\cong\\hom_{\\mathcal C}(Z,Y^X)$，称为 curry 化。',
        notes: [
          '**例**：$\\mathbf{Set}$ 中 $Y^X=\\hom(X,Y)$；$G\\text{-}\\mathbf{Set}$ 中 $Y^X$ 取共轭作用 $(g\\cdot f)(x)=g f(g^{-1}x)$。',
          '**反例**：$\\mathbf{Top}$ 一般不是笛卡尔闭（指数拓扑使求值连续的条件太强）；紧生成弱 Hausdorff 空间 $\\mathbf{CGWH}$ 才是，见 `prop.cg-cartesian-closed`。',
          '**与充实范畴的 internal hom 分开**：`def.internal-hom` 是充实范畴里的 hom 对象；本条的 $Y^X$ 是普通范畴中的指数对象。'
        ].join('\n\n'),
        refs: ['Mac Lane, Categories for the Working Mathematician, Ch. IV']
      },

      /* ---------------------------------------------------- 范畴节点 */
      {
        id: 'def.category-of-monoids',
        cluster: 'cat.basic',
        type: 'definition',
        label: '幺半群范畴',
        title: '幺半群范畴 $\\mathbf{Mon}$',
        regions: ['category', 'algebra'],
        tags: ['范畴论', '幺半群', 'Mon'],
        statement: [
          '**幺半群范畴** $\\mathbf{Mon}$：对象是幺半群，态射是幺半群同态。终对象是平凡幺半群 $\\{e\\}$；积逐点构造；等化子是子幺半群；拉回是纤维积。',
          '',
          '余积是**自由积**（把字并置后取商使单位与运算相容）；始对象仍是平凡幺半群（与终对象同构）；余等化子是商幺半群（生成同余的闭包）；推出是 amalgamated free product。'
        ].join('\n'),
        notes: [
          '**完备且余完备**：上述构造逐项给出小极限与小余极限；遗忘函子 $\\mathbf{Mon}\\to\\mathbf{Set}$ 保极限。',
          '**与 $\\mathbf{Grp}$**：群是全子范畴（每个元素可逆的幺半群），包含函子有左伴随「群化」。',
          '**非加性**：$\\hom(M,N)$ 一般没有幺半群结构；自由幺半群就是字幺半群。笛卡尔闭性本图不展开。'
        ].join('\n\n'),
        refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I, II']
      },

      {
        id: 'def.category-of-rings',
        cluster: 'cat.basic',
        type: 'definition',
        label: '环范畴',
        title: '环范畴 $\\mathbf{Rng}$（不一定含幺）',
        regions: ['category', 'algebra'],
        tags: ['范畴论', '环', 'Rng'],
        statement: [
          '**环范畴** $\\mathbf{Rng}$：对象是环（按 `def.ring` 的约定：不要求幺元、不要求交换），态射是环同态。**零环是零对象**（既是始对象又是终对象）；积逐点构造；等化子是子环；拉回是纤维积。',
          '',
          '余积是环的**自由积**；余等化子是商环（取生成的双边理想的闭包）；推出是 amalgamated free product。'
        ].join('\n'),
        notes: [
          '**完备且余完备**；**非加性**（$\\hom(R,S)$ 一般没有加法群结构）。',
          '**为什么不含幺**：本图 `def.ring` 明确不要求幺元；含幺环范畴的始对象是 $\\mathbb Z$，与零环作为终对象不冲突，但会与 `def.ring` 的约定分叉，故本图不单列含幺环范畴。',
          '**$\\mathbb Z$ 不是始对象**：非含幺同态不必保 $1$，$\\hom(\\mathbb Z,R)$ 对应 $R$ 的幂等元，不唯一。'
        ].join('\n\n'),
        refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I, II', 'Lang, Algebra, Ch. II']
      },

      {
        id: 'def.category-of-g-sets',
        cluster: 'cat.basic',
        type: 'definition',
        label: 'G-集范畴',
        title: '$G$-集范畴 $G\\text{-}\\mathbf{Set}$',
        regions: ['category', 'algebra'],
        tags: ['范畴论', '群作用', 'G-集', '拓扑斯'],
        statement: [
          '**$G$-集范畴** $G\\text{-}\\mathbf{Set}$：对象是左 $G$-集，态射是等变映射。终对象是单点集（平凡作用）；积取对角作用；等化子是不动点子集；拉回是纤维积。',
          '',
          '始对象是空集；余积是不交并；余等化子是商 $G$-集（生成等价关系的闭包）；推出是粘合。'
        ].join('\n'),
        notes: [
          '**完备且余完备**，且是**笛卡尔闭**的：$Y^X$ 取共轭作用 $(g\\cdot f)(x)=g f(g^{-1}x)$，求值与 curry 逐点验证。',
          '**是拓扑斯**：等价于单对象群胚上的预层范畴，见 `def.topos`。',
          '**非加性**；自由 $G$-集是 $G\\times X$（左乘作用）。'
        ].join('\n\n'),
        refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I, II', 'Le Stum, An introduction to condensed mathematics, §1']
      },

      {
        id: 'def.category-of-algebras',
        cluster: 'cat.basic',
        type: 'definition',
        label: 'R-代数范畴',
        title: '$R$-代数范畴 $R\\text{-}\\mathbf{Alg}$',
        regions: ['category', 'algebra'],
        tags: ['范畴论', '代数', 'R-代数'],
        statement: [
          '固定交换含幺环 $R$。**$R$-代数范畴** $R\\text{-}\\mathbf{Alg}$：对象是含幺结合 $R$-代数（乘法不必交换），态射是保 $1$ 的 $R$-代数同态。',
          '',
          '$R$ 是始对象（$r\\mapsto r1$）；本图允许**零代数**（$1=0$），它是终对象。积逐点构造；等化子是子代数；拉回是纤维积。余积是自由积；余等化子是商代数（生成的双边理想）；推出是 amalgamated free product。'
        ].join('\n'),
        notes: [
          '**完备且余完备**；**非加性**；一般**不是笛卡尔闭**。',
          '**交换情形**：交换 $R$-代数的余积是 $\\otimes_R$；本图不单列交换代数范畴，故只在注里说明。',
          '**零代数的约定**：若不允许零代数，则本范畴没有终对象；本图按「允许零代数」处理，使终对象存在，并在此注明。'
        ].join('\n\n'),
        refs: ['Lang, Algebra, Ch. II', 'Mac Lane, Categories for the Working Mathematician, Ch. I, II']
      },

      {
        id: 'def.category-of-fields',
        cluster: 'cat.basic',
        type: 'definition',
        label: '域范畴',
        title: '域范畴 $\\mathbf{Field}$',
        regions: ['category', 'algebra'],
        tags: ['范畴论', '域', '反例'],
        statement: '**域范畴** $\\mathbf{Field}$：对象是域，态射是域同态（自动单射）。它**没有终对象**（零环不是域），**没有始对象**（$\\mathbb Q$ 与 $\\mathbb F_p$ 不能同时接收同一个域的同态），也**没有二元积**（$\\mathbb Q$ 与 $\\mathbb F_p$ 的积不存在）。因此 $\\mathbf{Field}$ 既不完备也不余完备。',
        notes: [
          '**等化子存在**：两个域同态的等化子是固定子域；但这不足以补出终对象或积。',
          '**用途**：它是「看起来像代数范畴、实际连有限积都没有」的标准反例，提醒不要默认「代数结构 + 同态」一定完备。',
          '**与 `def.field` 的关系**：域的定义在 `def.field`，本条只加范畴层面的极限/余极限信息。'
        ].join('\n\n'),
        refs: ['Mac Lane, Categories for the Working Mathematician, Ch. I, II']
      },

      /* ---------------------------------------------------- 余极限命题 */
      {
        id: 'prop.algebra-categories-colimits',
        cluster: 'cat.algebra',
        type: 'proposition',
        label: '代数范畴的余极限',
        title: '代数结构范畴的余极限逐项构造',
        regions: ['category', 'algebra'],
        tags: ['范畴论', '余极限', '余积', '余等化子'],
        statement: '设 $\\mathcal C\\in\\{\\mathbf{Mon},\\mathbf{Grp},\\mathbf{Rng},G\\text{-}\\mathbf{Set},R\\text{-}\\mathbf{Mod},R\\text{-}\\mathbf{Alg}\\}$（各范畴按对应节点的约定）。则 $\\mathcal C$ 余完备：余积分别是自由积（$\\mathbf{Mon},\\mathbf{Grp},\\mathbf{Rng},R\\text{-}\\mathbf{Alg}$）、不交并（$G\\text{-}\\mathbf{Set}$）、直和（$R\\text{-}\\mathbf{Mod}$）；余等化子分别是商幺半群、商群、商环、商 $G$-集、商模、商代数（取生成的同余或双边理想）。',
        notes: [
          '**证明见边** `imp.algebra-categories-colimits`：写出自由构造的泛性质，再验证商对象满足余等化子的泛性质。',
          '**$\\mathbf{Set}$ 与 $\\mathbf{Top}$** 的余极限同理（不交并、商拓扑）；本条只列代数结构，避免与 `prop.algebra-categories-limits` 重复。',
          '**交换 $R$-代数**的余积是 $\\otimes_R$；零代数情形按 `def.category-of-algebras` 的约定处理。'
        ].join('\n\n'),
        refs: ['Mac Lane, Categories for the Working Mathematician, Ch. V', 'Lang, Algebra, Ch. II']
      }

    ],

    edges: [

      /* ---------------------------------------------- 定义依赖 */
      { id: 'atlas.dep.binop-monoid', kind: 'definition', definition: 'def.binary-operation', usedBy: 'def.monoid', note: '幺半群的运算就是二元运算。' },
      { id: 'atlas.dep.group-abelian', kind: 'definition', definition: 'def.group', usedBy: 'def.abelian-group', note: '阿贝尔群先要是群，再加交换律。' },
      { id: 'atlas.dep.category-mon', kind: 'definition', definition: 'def.category', usedBy: 'def.category-of-monoids', note: '范畴的定义用于陈述 $\\mathbf{Mon}$。' },
      { id: 'atlas.dep.category-rng', kind: 'definition', definition: 'def.category', usedBy: 'def.category-of-rings', note: '范畴的定义用于陈述 $\\mathbf{Rng}$。' },
      { id: 'atlas.dep.category-gset', kind: 'definition', definition: 'def.category', usedBy: 'def.category-of-g-sets', note: '范畴的定义用于陈述 $G\\text{-}\\mathbf{Set}$。' },
      { id: 'atlas.dep.category-alg', kind: 'definition', definition: 'def.category', usedBy: 'def.category-of-algebras', note: '范畴的定义用于陈述 $R\\text{-}\\mathbf{Alg}$。' },
      { id: 'atlas.dep.category-field', kind: 'definition', definition: 'def.category', usedBy: 'def.category-of-fields', note: '范畴的定义用于陈述 $\\mathbf{Field}$。' },
      { id: 'atlas.dep.monoid-mon', kind: 'definition', definition: 'def.monoid', usedBy: 'def.category-of-monoids', note: '$\\mathbf{Mon}$ 的对象就是幺半群。' },
      { id: 'atlas.dep.ring-rng', kind: 'definition', definition: 'def.ring', usedBy: 'def.category-of-rings', note: '$\\mathbf{Rng}$ 的对象按 `def.ring` 的约定。' },
      { id: 'atlas.dep.ringhom-rng', kind: 'definition', definition: 'def.ring-hom', usedBy: 'def.category-of-rings', note: '$\\mathbf{Rng}$ 的态射是环同态。' },
      { id: 'atlas.dep.group-gset', kind: 'definition', definition: 'def.group', usedBy: 'def.category-of-g-sets', note: '$G$-集要先有群 $G$。' },
      { id: 'atlas.dep.action-gset', kind: 'definition', definition: 'def.group-action', usedBy: 'def.category-of-g-sets', note: '$G$-集就是带群作用集合。' },
      { id: 'atlas.dep.sets-gset', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'def.category-of-g-sets', note: '等变映射的底层是集合映射。' },
      { id: 'atlas.dep.algebra-ring-alg', kind: 'definition', definition: 'def.algebra-over-ring', usedBy: 'def.category-of-algebras', note: '$R$-代数的定义用于陈述 $R\\text{-}\\mathbf{Alg}$。' },
      { id: 'atlas.dep.ring-alg', kind: 'definition', definition: 'def.ring', usedBy: 'def.category-of-algebras', note: '$R$ 是环，代数对象带环结构。' },
      { id: 'atlas.dep.ringhom-alg', kind: 'definition', definition: 'def.ring-hom', usedBy: 'def.category-of-algebras', note: '代数同态的底层是环同态。' },
      { id: 'atlas.dep.field-fieldcat', kind: 'definition', definition: 'def.field', usedBy: 'def.category-of-fields', note: '$\\mathbf{Field}$ 的对象就是域。' },
      { id: 'atlas.dep.ring-mod', kind: 'definition', definition: 'def.ring', usedBy: 'def.module-category', note: '$R\\text{-}\\mathbf{Mod}$ 的对象是 $R$-模，$R$ 是环。' },
      { id: 'atlas.dep.abelian-mod', kind: 'definition', definition: 'def.abelian-group', usedBy: 'def.module-category', note: '$R$-模的加法群是阿贝尔群。' },
      { id: 'atlas.dep.abcat-mod', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'def.module-category', note: '$R=\\mathbb Z$ 时退化为 $\\mathbf{Ab}$。' },
      { id: 'atlas.dep.modhom-mod', kind: 'definition', definition: 'def.module-hom', usedBy: 'def.module-category', note: '$R\\text{-}\\mathbf{Mod}$ 的态射是模同态。' },
      { id: 'atlas.dep.product-cc', kind: 'definition', definition: 'def.product', usedBy: 'def.cartesian-closed-category', note: '笛卡尔闭要求有限积，特别是二元积。' },
      { id: 'atlas.dep.category-cc', kind: 'definition', definition: 'def.category', usedBy: 'def.cartesian-closed-category', note: '笛卡尔闭性是范畴的性质。' },

      /* ---------------------------------------------- 范畴→极限命题 */
      { id: 'atlas.applies.set-lim', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Set}$ 的极限表由该命题统一给出（逐点构造）。' },
      { id: 'atlas.applies.top-lim', kind: 'definition', definition: 'def.category-of-topological-spaces', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Top}$ 的极限按子空间/积拓扑逐项给出。' },
      { id: 'atlas.applies.grp-lim', kind: 'definition', definition: 'def.category-of-groups', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Grp}$ 的极限逐项构造。' },
      { id: 'atlas.applies.mon-lim', kind: 'definition', definition: 'def.category-of-monoids', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Mon}$ 的极限逐项构造。' },
      { id: 'atlas.applies.ab-lim', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Ab}$ 的极限逐项构造。' },
      { id: 'atlas.applies.rng-lim', kind: 'definition', definition: 'def.category-of-rings', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Rng}$ 的极限逐项构造。' },
      { id: 'atlas.applies.gset-lim', kind: 'definition', definition: 'def.category-of-g-sets', usedBy: 'prop.algebra-categories-limits', note: '$G\\text{-}\\mathbf{Set}$ 的极限取不动点/对角作用。' },
      { id: 'atlas.applies.mod-lim', kind: 'definition', definition: 'def.module-category', usedBy: 'prop.algebra-categories-limits', note: '$R\\text{-}\\mathbf{Mod}$ 的极限逐项构造。' },
      { id: 'atlas.applies.alg-lim', kind: 'definition', definition: 'def.category-of-algebras', usedBy: 'prop.algebra-categories-limits', note: '$R\\text{-}\\mathbf{Alg}$ 的极限逐项构造。' },
      { id: 'atlas.applies.vect-lim', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Vect}_K$ 的极限逐项构造。' },

      /* ---------------------------------------------- 范畴→余极限命题 */
      { id: 'atlas.applies.set-colim', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Set}$ 的余极限表由该命题统一给出。' },
      { id: 'atlas.applies.top-colim', kind: 'definition', definition: 'def.category-of-topological-spaces', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Top}$ 的余极限取商拓扑/不交并。' },
      { id: 'atlas.applies.grp-colim', kind: 'definition', definition: 'def.category-of-groups', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Grp}$ 的余极限：自由积/商群。' },
      { id: 'atlas.applies.mon-colim', kind: 'definition', definition: 'def.category-of-monoids', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Mon}$ 的余极限：自由积/商幺半群。' },
      { id: 'atlas.applies.ab-colim', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Ab}$ 的余极限：直和/商群。' },
      { id: 'atlas.applies.rng-colim', kind: 'definition', definition: 'def.category-of-rings', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Rng}$ 的余极限：自由积/商环。' },
      { id: 'atlas.applies.gset-colim', kind: 'definition', definition: 'def.category-of-g-sets', usedBy: 'prop.algebra-categories-colimits', note: '$G\\text{-}\\mathbf{Set}$ 的余极限：不交并/商 $G$-集。' },
      { id: 'atlas.applies.mod-colim', kind: 'definition', definition: 'def.module-category', usedBy: 'prop.algebra-categories-colimits', note: '$R\\text{-}\\mathbf{Mod}$ 的余极限：直和/商模。' },
      { id: 'atlas.applies.alg-colim', kind: 'definition', definition: 'def.category-of-algebras', usedBy: 'prop.algebra-categories-colimits', note: '$R\\text{-}\\mathbf{Alg}$ 的余极限：自由积/商代数。' },
      { id: 'atlas.applies.vect-colim', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Vect}_K$ 的余极限：直和/商空间。' },

      /* ---------------------------------------------- 自由对象 / 遗忘函子 */
      { id: 'atlas.free.mon', kind: 'definition', definition: 'def.category-of-monoids', usedBy: 'prop.free-objects-examples', note: '自由幺半群是字幺半群。' },
      { id: 'atlas.free.grp', kind: 'definition', definition: 'def.category-of-groups', usedBy: 'prop.free-objects-examples', note: '自由群。' },
      { id: 'atlas.free.rng', kind: 'definition', definition: 'def.category-of-rings', usedBy: 'prop.free-objects-examples', note: '自由环（非交换多项式环）。' },
      { id: 'atlas.free.gset', kind: 'definition', definition: 'def.category-of-g-sets', usedBy: 'prop.free-objects-examples', note: '自由 $G$-集是 $G\\times X$。' },
      { id: 'atlas.free.mod', kind: 'definition', definition: 'def.module-category', usedBy: 'prop.free-objects-examples', note: '自由模 $R^{(X)}$。' },
      { id: 'atlas.free.alg', kind: 'definition', definition: 'def.category-of-algebras', usedBy: 'prop.free-objects-examples', note: '自由结合代数（张量代数）。' },
      { id: 'atlas.free.vect', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'prop.free-objects-examples', note: '自由向量空间以基给出。' },
      { id: 'atlas.free.ab', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.free-objects-examples', note: '自由阿贝尔群 $\\mathbb Z^{(X)}$。' },

      { id: 'atlas.forget.mon', kind: 'definition', definition: 'def.category-of-monoids', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },
      { id: 'atlas.forget.grp', kind: 'definition', definition: 'def.category-of-groups', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },
      { id: 'atlas.forget.rng', kind: 'definition', definition: 'def.category-of-rings', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },
      { id: 'atlas.forget.gset', kind: 'definition', definition: 'def.category-of-g-sets', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },
      { id: 'atlas.forget.mod', kind: 'definition', definition: 'def.module-category', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },
      { id: 'atlas.forget.alg', kind: 'definition', definition: 'def.category-of-algebras', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },
      { id: 'atlas.forget.vect', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },
      { id: 'atlas.forget.ab', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.forgetful-preserves-limits', note: '遗忘函子到 $\\mathbf{Set}$ 保极限。' },

      /* ---------------------------------------------- 性质：笛卡尔闭 / 拓扑斯 */
      { id: 'atlas.props.set-cc', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'def.cartesian-closed-category', note: '$\\mathbf{Set}$ 是笛卡尔闭的，$Y^X=\\hom(X,Y)$。' },
      { id: 'atlas.props.gset-cc', kind: 'definition', definition: 'def.category-of-g-sets', usedBy: 'def.cartesian-closed-category', note: '$G\\text{-}\\mathbf{Set}$ 是笛卡尔闭的，指数取共轭作用。' },
      { id: 'atlas.props.set-topos', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'def.topos', note: '$\\mathbf{Set}$ 是拓扑斯。' },
      { id: 'atlas.props.gset-topos', kind: 'definition', definition: 'def.category-of-g-sets', usedBy: 'def.topos', note: '$G\\text{-}\\mathbf{Set}$ 是拓扑斯（群胚上的预层）。' },
      { id: 'atlas.props.top-cgcc', kind: 'definition', definition: 'def.category-of-topological-spaces', usedBy: 'prop.cg-cartesian-closed', note: '$\\mathbf{Top}$ 本身不是笛卡尔闭；其紧生成弱 Hausdorff 全子范畴才是。' },

      /* ---------------------------------------------- 性质：Ab / R-Mod / Vect */
      { id: 'atlas.props.ab-add', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'def.additive-category', note: '$\\mathbf{Ab}$ 是加法范畴。' },
      { id: 'atlas.props.ab-abelian', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'def.abelian-category', note: '$\\mathbf{Ab}$ 是阿贝尔范畴。' },
      { id: 'atlas.props.ab-ax', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'def.ab-axioms', note: '$\\mathbf{Ab}$ 满足 AB3–AB6。' },
      { id: 'atlas.props.ab-ab6', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.ab6', note: '$\\mathbf{Ab}$ 满足 AB6（滤过余极限与积交换）。' },
      { id: 'atlas.props.ab-examples', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.ab-axioms-examples', note: '$\\mathbf{Ab}$ 是 AB 公理的标准例子。' },
      { id: 'atlas.props.ab-ab5', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'prop.ab5-implications', note: '$\\mathbf{Ab}$ 满足 AB5。' },
      { id: 'atlas.props.ab-enough-proj', kind: 'definition', definition: 'def.category-of-abelian-groups', usedBy: 'def.enough-projectives', note: '自由阿贝尔群投射，故 $\\mathbf{Ab}$ 有足够多投射对象。' },

      { id: 'atlas.props.mod-add', kind: 'definition', definition: 'def.module-category', usedBy: 'def.additive-category', note: '$R\\text{-}\\mathbf{Mod}$ 是加法范畴。' },
      { id: 'atlas.props.mod-abelian', kind: 'definition', definition: 'def.module-category', usedBy: 'def.abelian-category', note: '$R\\text{-}\\mathbf{Mod}$ 是阿贝尔范畴。' },
      { id: 'atlas.props.mod-ax', kind: 'definition', definition: 'def.module-category', usedBy: 'def.ab-axioms', note: '$R\\text{-}\\mathbf{Mod}$ 满足 AB3/AB4/AB4*/AB5；**不写 AB6、不写 AB3***。' },
      { id: 'atlas.props.mod-examples', kind: 'definition', definition: 'def.module-category', usedBy: 'prop.ab-axioms-examples', note: '$R\\text{-}\\mathbf{Mod}$ 是 AB 公理的模范例。' },
      { id: 'atlas.props.mod-ab5', kind: 'definition', definition: 'def.module-category', usedBy: 'prop.ab5-implications', note: '$R\\text{-}\\mathbf{Mod}$ 满足 AB5。' },
      { id: 'atlas.props.mod-enough-proj', kind: 'definition', definition: 'def.module-category', usedBy: 'def.enough-projectives', note: '自由模投射，故有足够多投射对象。' },
      { id: 'atlas.props.mod-enough-proj-thm', kind: 'definition', definition: 'def.module-category', usedBy: 'thm.mod-enough-projectives', note: '$R\\text{-}\\mathbf{Mod}$ 有足够多投射对象。' },
      { id: 'atlas.props.mod-enough-inj-thm', kind: 'definition', definition: 'def.module-category', usedBy: 'thm.mod-enough-injectives', note: '$R\\text{-}\\mathbf{Mod}$ 有足够多内射对象（Baer 判别法）。' },

      { id: 'atlas.props.vect-add', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'def.additive-category', note: '$\\mathbf{Vect}_K$ 是加法范畴。' },
      { id: 'atlas.props.vect-abelian', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'def.abelian-category', note: '$\\mathbf{Vect}_K$ 是阿贝尔范畴。' },
      { id: 'atlas.props.vect-enough-proj', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'def.enough-projectives', note: '每个向量空间有基，故自由空间投射。' },
      { id: 'atlas.props.vect-ax', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'def.ab-axioms', note: '$\\mathbf{Vect}_K$ 满足 AB3/AB4/AB4*/AB5；不写 AB6、不写 AB3*。' },
      { id: 'atlas.props.vect-ab5', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'prop.ab5-implications', note: '$\\mathbf{Vect}_K$ 满足 AB5。' },
      { id: 'atlas.props.vect-ucolim', kind: 'definition', definition: 'def.category-of-vector-spaces', usedBy: 'def.universal-colimit', note: '$\\mathbf{Vect}_K$ 的余极限是直和/商空间。' },

      /* ---------------------------------------------- 类比 */
      { id: 'atlas.analogy.grp-mon', kind: 'analogy', a: 'def.category-of-groups', b: 'def.category-of-monoids', note: '群范畴是幺半群范畴的全子范畴；极限逐项构造相同，余积都叫自由积。' },
      { id: 'atlas.analogy.vect-mod', kind: 'analogy', a: 'def.category-of-vector-spaces', b: 'def.module-category', note: '$\\mathbf{Vect}_K$ 就是 $K\\text{-}\\mathbf{Mod}$ 在 $K$ 为域时的特例。' },
      { id: 'atlas.analogy.rng-alg', kind: 'analogy', a: 'def.category-of-rings', b: 'def.category-of-algebras', note: '环是 $\\mathbb Z$-代数的非含幺版本；余积都是自由积。' },


      /* ---------------------------------------------- 命题的入边：极限 */
      { id: 'atlas.lim.in.limit', kind: 'definition', definition: 'def.limit', usedBy: 'prop.algebra-categories-limits', note: '命题的极限表就是逐项验证 $\\mathbf{Set}$ 中的极限。' },
      { id: 'atlas.lim.in.product', kind: 'definition', definition: 'def.product', usedBy: 'prop.algebra-categories-limits', note: '积逐点构造。' },
      { id: 'atlas.lim.in.equalizer', kind: 'definition', definition: 'def.equalizer', usedBy: 'prop.algebra-categories-limits', note: '等化子取子对象。' },
      { id: 'atlas.lim.in.final', kind: 'definition', definition: 'def.final-initial', usedBy: 'prop.algebra-categories-limits', note: '终对象逐项给出。' },
      { id: 'atlas.lim.in.fibered', kind: 'definition', definition: 'def.fibered-product', usedBy: 'prop.algebra-categories-limits', note: '拉回是纤维积。' },
      { id: 'atlas.lim.in.monoid', kind: 'definition', definition: 'def.monoid', usedBy: 'prop.algebra-categories-limits', note: '幺半群范畴的极限按底层集合逐项取。' },
      { id: 'atlas.lim.in.group', kind: 'definition', definition: 'def.group', usedBy: 'prop.algebra-categories-limits', note: '群范畴的极限按底层集合逐项取。' },
      { id: 'atlas.lim.in.ring', kind: 'definition', definition: 'def.ring', usedBy: 'prop.algebra-categories-limits', note: '环范畴的极限按底层集合逐项取。' },
      { id: 'atlas.lim.in.sets', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Set}$ 是极限的基底。' },
      { id: 'atlas.lim.in.action', kind: 'definition', definition: 'def.group-action', usedBy: 'prop.algebra-categories-limits', note: '$G$-集的极限取不动点/对角作用。' },
      { id: 'atlas.lim.in.module', kind: 'definition', definition: 'def.module', usedBy: 'prop.algebra-categories-limits', note: '模的极限按底层阿贝尔群逐项取。' },
      { id: 'atlas.lim.in.algebra', kind: 'definition', definition: 'def.algebra-over-ring', usedBy: 'prop.algebra-categories-limits', note: '代数的极限按底层模逐项取。' },
      { id: 'atlas.lim.in.top', kind: 'definition', definition: 'def.category-of-topological-spaces', usedBy: 'prop.algebra-categories-limits', note: '$\\mathbf{Top}$ 的极限取子空间/积拓扑。' },

      /* ---------------------------------------------- 命题的入边：余极限 */
      { id: 'atlas.col.in.ucolim', kind: 'definition', definition: 'def.universal-colimit', usedBy: 'prop.algebra-categories-colimits', note: '余极限的泛性质用于验证余等化子。' },
      { id: 'atlas.col.in.product', kind: 'definition', definition: 'def.product', usedBy: 'prop.algebra-categories-colimits', note: '余积是不交并/自由积/直和。' },
      { id: 'atlas.col.in.equalizer', kind: 'definition', definition: 'def.equalizer', usedBy: 'prop.algebra-categories-colimits', note: '余等化子是商对象。' },
      { id: 'atlas.col.in.final', kind: 'definition', definition: 'def.final-initial', usedBy: 'prop.algebra-categories-colimits', note: '始对象给出空余积。' },
      { id: 'atlas.col.in.monoid', kind: 'definition', definition: 'def.monoid', usedBy: 'prop.algebra-categories-colimits', note: '幺半群范畴的余极限：自由积/商幺半群。' },
      { id: 'atlas.col.in.group', kind: 'definition', definition: 'def.group', usedBy: 'prop.algebra-categories-colimits', note: '群范畴的余极限：自由积/商群。' },
      { id: 'atlas.col.in.ring', kind: 'definition', definition: 'def.ring', usedBy: 'prop.algebra-categories-colimits', note: '环范畴的余极限：自由积/商环。' },
      { id: 'atlas.col.in.gset', kind: 'definition', definition: 'def.category-of-g-sets', usedBy: 'prop.algebra-categories-colimits', note: '$G$-集的余极限：不交并/商。' },
      { id: 'atlas.col.in.mod', kind: 'definition', definition: 'def.module-category', usedBy: 'prop.algebra-categories-colimits', note: '模范畴的余极限：直和/商模。' },
      { id: 'atlas.col.in.alg', kind: 'definition', definition: 'def.category-of-algebras', usedBy: 'prop.algebra-categories-colimits', note: '代数范畴的余极限：自由积/商代数。' },
      { id: 'atlas.col.in.sets', kind: 'definition', definition: 'def.category-of-sets', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Set}$ 的余极限是不交并/商。' },
      { id: 'atlas.col.in.top', kind: 'definition', definition: 'def.category-of-topological-spaces', usedBy: 'prop.algebra-categories-colimits', note: '$\\mathbf{Top}$ 的余极限取商拓扑/不交并。' },

      /* ---------------------------------------------- 证明边 */
      {
        id: 'imp.algebra-categories-limits',
        kind: 'implication',
        strength: 'strong',
        sources: ['def.limit', 'def.product', 'def.equalizer', 'def.final-initial', 'def.fibered-product', 'def.monoid', 'def.group', 'def.ring', 'def.category-of-sets', 'def.group-action', 'def.module', 'def.algebra-over-ring'],
        target: 'prop.algebra-categories-limits',
        proof: '**构造。** 设 $F:J\\to\\mathcal C$ 是小图。把每个 $F(j)$ 忘成底层集合，在 $\\mathbf{Set}$ 中取极限 $L=\\varprojlim F$，即 $L=\\{(x_j)\\in\\prod_j F(j): F(u)(x_j)=x_k\\ \\text{对每条 }u:j\\to k\\}$。逐项验证：\n\n- **终对象**：单点集带唯一结构（平凡群/零环/零模/单点空间），从任何对象有唯一态射。\n- **积**：$\\prod_i A_i$ 按逐点运算/逐点拓扑，投影为态射，满足泛性质。\n- **等化子**：$\\{a\\in A: f(a)=g(a)\\}$ 带上子结构，包含映射等化 $f,g$。\n- **拉回**：$\\{(a,b)\\in A\\times B: f(a)=g(b)\\}$，两条投影与交换方块给出泛性质。\n\n**遗忘函子保极限**：上述构造的底层集合恰是 $\\mathbf{Set}$ 中的极限，故 $U$ 把 $\\mathcal C$ 的极限送到 $\\mathbf{Set}$ 的极限；$\\mathbf{Top}$ 的情形把拓扑取为子空间/积拓扑即可。**完备性**：小积 + 等化子生成所有小极限（标准极限定理）。∎',
        note: '逐项构造 + 遗忘函子保极限；证明中对每个具体范畴只需核对结构在极限上封闭。'
      },
      {
        id: 'imp.algebra-categories-colimits',
        kind: 'implication',
        strength: 'strong',
        sources: ['def.universal-colimit', 'def.product', 'def.equalizer', 'def.final-initial', 'def.monoid', 'def.group', 'def.ring', 'def.category-of-g-sets', 'def.module-category', 'def.category-of-algebras', 'def.category-of-sets'],
        target: 'prop.algebra-categories-colimits',
        proof: '**构造。** 先看余积：$\\mathbf{Mon}$ 的自由积取字并置后对「单位与运算相容」生成同余取商；$\\mathbf{Grp}$ 的自由积同理（取正规闭包）；$\\mathbf{Rng}$ 的自由积取非交换多项式环；$\\mathbf{Alg}_R$ 的自由积取张量代数再商关系；$G\\text{-}\\mathbf{Set}$ 取不交并；$R\\text{-}\\mathbf{Mod}$ 取直和。每种的包含映射都满足余积泛性质。\n\n**余等化子**：对 $f,g:A\\to B$，在 $\\mathbf{Set}$ 中取商 $B/\\sim$（$f(a)\\sim g(a)$ 生成），再取使商映射成为该范畴态射的最细结构：幺半群取同余闭包、群取正规闭包、环取代数理想、$G$-集取生成等价关系、模取子模、代数取双边理想。商对象满足余等化子的泛性质。\n\n**余完备性**：小余积 + 余等化子生成所有小余极限；把上述构造组合即得。∎',
        note: '自由构造 + 商闭包；每一步只核对泛性质，不依赖具体元素计算。'
      }

    ]
});
