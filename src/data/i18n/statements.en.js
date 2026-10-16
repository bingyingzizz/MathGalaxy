/* ==========================================================================
   数学星图 · 英文陈述与说明（statement / notes · T3.2）
   --------------------------------------------------------------------------
   这是什么：把**枢纽节点**的陈述（statement）与说明（notes）译成英文。
   现有 11 条 = 试点 3 条（T3.2，2026-10-16）+ **第一批 8 条**（T3.2 批次 1，
   对象是枢纽榜前 10 名里尚未有译文的那 8 个 —— 前两名 lem.zorn / thm.first-iso
   已在试点里）。每个批次的中英对照与存疑清单在 i18n/review-batch-N.md。

   ⛔ 不是第二棵内容树：中文陈述仍是唯一真源（`src/data/packs/*.js`）；
      这里按 id 旁挂译文，graph.js 建图时抄到节点上。
   ⛔ 不含新命题、不含新推导：**逐句对译**，中文说什么就说什么。
   ⛔ 边的证明（`proofs/`）**不在**本批范围 —— 英文页会写明「证明仍以中文页为准」。
   ⭐ **公式一字不改**：`$…$` / `$$…$$` 必须与中文逐字相同，公式里也不许出现汉字
      （汉字要移进散文，或换成中英皆可的记号）。构建有硬断言，见 i18n/deviations.md。

   ⭐⭐ 状态**逐条判定**（作者 2026-10-16 拍板）：每条 = 一个字段，
       statement / notes 各自带
         · status    'draft'（机器起草，待审）| 'reviewed'（作者审过）
         · basedOn   `'<内容版本>#<中文底稿指纹>'` —— 指纹 = MG.zhHash，8 位十六进制
         · reviewed  { by, date }（status = 'reviewed' 时填）
       ⭐ stale **由构建现算**，两个来源任一不符即 stale：
          ① 内容版本变了（tools/ids.snapshot.json 的 vX.Y.Z）；
          ② 这条中文底稿的指纹变了 —— 说明**这句中文本身**被改过。
       ⛔ 别手工「刷新」basedOn 来消掉 stale：那等于悄悄作废审校记录。
          要重新对稿就跑 `bun tools/i18n-status.mjs`（默认只报不写）。
       ⚠️ 判定只有一处实现 = `src/core/i18n.js` 的 MG.enFieldStatus；
          tools/build.mjs 调的是同一个函数，所以网页与产物不会各说各话。
   ⚠️ 这个文件**挂进 index.html**（它是节点字段来源：搜索索引要用），
      加载它的地方在 index.html；挂到节点上的地方在 src/core/graph.js。
   ========================================================================== */
window.MG = window.MG || {};

MG.i18nStatements = {
  version: 2,               // 2 = 逐条状态（每字段 status/basedOn）；1 = 文件级一个 status
  drafted: '2026-10-16',    // 本文件第一次起草的日期（只是历史记录，不参与状态判定）

  items: {
    /* ---------------------------------------------------------- 佐恩引理 */
    'lem.zorn': {
      statement: {
        en:
        'Let $(P, \\preceq )$ be a **non-empty** poset. If every chain in $P$ has an upper bound ' +
        'in $P$, then $P$ has a **maximal element**.',
        status: 'reviewed', basedOn: 'v0.9.1#88c083ff', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Neither hypothesis can be dropped: the empty poset has no maximal element, and ' +
        '"every chain has an upper bound" does not give a *greatest* element — only a maximal one.\n\n' +
        'It is "the universal engine of existence proofs": every vector space has a basis, ' +
        'every ring has a maximal ideal, the compactness theorem, Hahn–Banach — all of them ' +
        'rely on it.\n\n' +
        'The name is a historical accident: Zorn popularised the statement in the 1940s, while ' +
        'Kuratowski had already proved an equivalent form in 1922, so it is also called the ' +
        'Kuratowski–Zorn lemma.\n\n' +
        '⚠ Non-constructive: what one obtains is "there exists a maximal element", and usually ' +
        'one cannot say which.',
        status: 'reviewed', basedOn: 'v0.9.1#4e157a1c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------------ 第一同构定理 */
    'thm.first-iso': {
      statement: {
        en:
        'Let $\\varphi : G \\to G\'$ be a **group homomorphism**. Then $\\varphi$ induces an ' +
        'isomorphism\n\n' +
        '$$G \\big/ \\ker\\varphi \\;\\cong\\; \\operatorname{im}\\varphi, \\qquad ' +
        'g \\ker\\varphi \\;\\longmapsto\\; \\varphi(g).$$\n\n' +
        'In particular: **the image of a surjective homomorphism is the quotient group** ' +
        '($G/\\ker\\varphi \\cong G\'$ when $\\varphi$ is surjective).',
        status: 'reviewed', basedOn: 'v0.9.1#1f75f342', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        '**The three steps of the proof.** Write $K = \\ker\\varphi$.\n\n' +
        '- **Well defined**: if $gK = g\'K$ then $g\' = gk$ for some $k \\in K$, hence ' +
        '$\\varphi(g\') = \\varphi(g)\\varphi(k) = \\varphi(g)e\' = \\varphi(g)$ — elements of ' +
        'the same coset are sent to the same value.\n' +
        '- **Homomorphism**: $\\overline{\\varphi}\\bigl((gK)(g\'K)\\bigr) = ' +
        '\\overline{\\varphi}(gg\'K) = \\varphi(gg\') = \\varphi(g)\\varphi(g\') = ' +
        '\\overline{\\varphi}(gK)\\,\\overline{\\varphi}(g\'K)$.\n' +
        '- **Bijection**: injective, because $\\overline{\\varphi}(gK) = e\'$ means ' +
        '$\\varphi(g) = e\'$, i.e. $g \\in K$, so $gK = K$; surjective, because the image is ' +
        '$\\varphi(G)$ by construction. ∎\n\n' +
        '⭐ **It is really a theorem about the format "set + operations + axioms", not a ' +
        'privilege of groups.** The same proof carries over verbatim, provided one replaces ' +
        '"homomorphism" by the corresponding notion:\n\n' +
        '$$A \\big/ \\ker f \\;\\cong\\; \\operatorname{im} f.$$\n\n' +
        '⭐ **The set-level prototype**: for any map $f : A \\to B$, put ' +
        '$a \\sim a\' \\iff f(a) = f(a\')$ on $A$; then $f$ induces a **bijection** ' +
        '$A/{\\sim} \\;\\to\\; \\operatorname{im} f$ (see "quotient set and equivalence ' +
        'classes"). The group version adds exactly one sentence: **after dividing by the ' +
        'kernel, what remains is a group**. The first two steps (well defined, bijection) are ' +
        'the set-level content; only the third (homomorphism) is new.\n\n' +
        '**What question does it answer?** "Where does a homomorphism send a group?" has a ' +
        'two-part answer: the **kernel** (what is collapsed) and the **image** (what survives), ' +
        'locked together by a single isomorphism. So studying homomorphisms is studying normal ' +
        'subgroups — which is why group theory turns into the study of the lattice of subgroups.',
        status: 'reviewed', basedOn: 'v0.9.1#8164331f', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* -------------------------------------------------------- 距离空间 */
    'def.metric-space': {
      statement: {
        en:
        'A **metric space** is a pair (X, d): $X$ is a set and ' +
        '$d : X \\times X \\to [0, +\\infty )$ is a **metric** on $X$, satisfying\n\n' +
        '- **non-degeneracy**: $d(x, y) = 0 \\iff x = y$\n' +
        '- **symmetry**: $d(x, y) = d(y, x)$\n' +
        '- **triangle inequality**: $d(x, z) \\le d(x, y) + d(y, z)$\n\n' +
        'From $d$ one defines the **open balls** $B(x, r) = \\{ y \\in X : d(x, y) < r \\}$, and ' +
        'declares $U \\subseteq X$ to be open $\\iff U$ is a union of open balls. This puts a ' +
        'topology on $X$.\n\n' +
        'Given $\\varepsilon > 0$, a set $D \\subseteq X$ is called an **$\\varepsilon$-net** if ' +
        '$\\forall x \\in X, \\exists y \\in D : d(x, y) < \\varepsilon$.',
        status: 'reviewed', basedOn: 'v0.9.1#31649b03', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'The open balls form a **base** for this topology. Every metric space is first ' +
        'countable and normal (hence Hausdorff).\n\n' +
        'The properties that follow fall into two classes: **compactness / closedness** depend ' +
        'only on the open sets and are **topological**; **completeness / total boundedness** ' +
        'use $d$ and are **metric**. This dividing line is the point of the whole cluster.\n\n' +
        '⚠ Completeness is **not** a topological property: $\\mathbb{R}$ and the open interval ' +
        '(0, 1) are homeomorphic, yet only the first is complete.',
        status: 'reviewed', basedOn: 'v0.9.1#a1cebdb4', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ======================================================================
       T3.2 批次 1（2026-10-16）：枢纽榜前 10 名里还没有译文的 8 个
       （前两名 lem.zorn / thm.first-iso 在试点里）。中英对照 + 存疑见
        i18n/review-batch-1.md。
       ====================================================================== */

    /* -------------------------------------------- 3. Cauchy 列与零列 */
    'def.cauchy-null': {
      statement: {
        en:
        'Let $(x_n)$ be a **sequence of rational numbers** (that is, a function ' +
        '$\\omega \\to \\mathbb{Q}$), let $|x|$ be the absolute value on $\\mathbb{Q}$, and let ' +
        '$\\varepsilon$ always range over **positive rationals** (no real numbers are needed yet).\n\n' +
        '$(x_n)$ is a **Cauchy sequence**:\n\n' +
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall m, n \\ge N : ' +
        '|x_m - x_n| < \\varepsilon$$\n\n' +
        '$(x_n)$ is a **null sequence**:\n\n' +
        '$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n \\ge N : |x_n| < \\varepsilon$$\n\n' +
        'Two Cauchy sequences are **equivalent**:\n\n' +
        'Two Cauchy sequences are **equivalent** (written $(x_n) \\sim (y_n)$) if and only if ' +
        '$(x_n - y_n)$ is a null sequence.\n\n' +
        '($\\sim$ is an equivalence relation: reflexivity and symmetry are immediate, ' +
        'transitivity follows from the triangle inequality.)',
        status: 'reviewed', basedOn: 'v0.9.1#4ba3632c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        '⭐ **Why divide by the null sequences**: the same real number has many approximating ' +
        'sequences — for instance $(1, 1, 1, \\ldots)$ and $(1.1,\\ 1.01,\\ 1.001,\\ \\ldots)$ ' +
        'should both represent $1$, and their difference is a null sequence. Equivalence classes ' +
        'glue "different approximations of one and the same number" into a single object.\n\n' +
        '⚠ Here we use **only the order and the absolute value of $\\mathbb{Q}$** ($\\varepsilon$ ' +
        'ranges over positive rationals, and the absolute value is the one on $\\mathbb{Q}$), so ' +
        'there is **no circularity**: this step makes perfect sense before $\\mathbb{R}$ is ' +
        'constructed. The language of "distance, Cauchy sequence, completeness" in metric spaces ' +
        'is exactly what was abstracted out of this construction.\n\n' +
        'Three facts needed later:\n' +
        '- a Cauchy sequence is **bounded**;\n' +
        '- **sum, difference and product of Cauchy sequences are again Cauchy**;\n' +
        '- **a Cauchy sequence that is not a null sequence satisfies $|x_n| \\ge \\delta$ from ' +
        'some index on** (for some positive rational $\\delta$) — hence its reciprocal, after ' +
        'discarding finitely many terms, is again Cauchy. The third fact is the entire basis ' +
        'for "multiplication has inverses".',
        status: 'reviewed', basedOn: 'v0.9.1#a43dd73a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------ 4. 表示函子 */
    'def.representable': {
      statement: {
        en:
        'Let $F : \\mathcal{C} \\to \\mathbf{Set}$ be a functor.\n\n' +
        '**(i) Universal element.** An object $X \\in \\mathcal{C}$ together with an element ' +
        '$s \\in F(X)$ is called **universal** for $F$ if\n\n' +
        '$$\\forall Y \\in \\mathcal{C},\\ \\forall t \\in F(Y),\\ \\exists! \\, f : X \\to Y,' +
        '\\qquad F(f)(s) = t$$\n\n' +
        'One then also says that $F$ is **represented** by $(X, s)$.\n\n' +
        '**(ii) Representable.** If $F \\cong \\operatorname{Hom}_{\\mathcal{C}}(X, -)$, one says ' +
        'that $F$ is **represented** by $X$, and $X$ is called a **representing object** of $F$.',
        status: 'reviewed', basedOn: 'v0.9.1#befbd619', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'In one sentence: **all the data of $F$ is generated by one element $s$ of $X$**. Given ' +
        'any other $t$, there is a unique $f$ pushing $s$ across to it — so elements elsewhere ' +
        'do not come from nowhere; they are pushed out of $s$.\n\n' +
        'An equivalent phrasing: $(X, s)$ is universal $\\iff$ $(X, s)$ is an initial object of ' +
        'the category of elements $\\operatorname{el}(F)$ — the word "universal" is used in the ' +
        'same way on this level and on the level below.\n\n' +
        'Examples:\n\n' +
        '- Let $k \\in \\operatorname{Ob}(\\mathbf{CRng})$ and let ' +
        '$F : k\\text{-}\\mathbf{Alg} \\to \\mathbf{Set}$ be the forgetful functor. Then ' +
        '$(k[t],\\ t)$ represents $F$: for $A \\in k\\text{-}\\mathbf{Alg}$ and $a \\in F(A)$, ' +
        'sending $t \\mapsto a$ induces a unique $k$-algebra homomorphism $k[t] \\to A$.\n' +
        '- Let $F : \\mathbf{Ring} \\to \\mathbf{Set}$ be the constant functor at the one-point ' +
        'set. Then $\\mathbb{Z}$ represents $F$: every ring has a unique $\\mathbb{Z} \\to R$.\n' +
        '- Fix a topological space $X$ and a subspace $Y \\subseteq X$, and take the ' +
        'contravariant functor\n\n' +
        '  $$F : \\mathbf{Top}^{\\mathrm{op}} \\to \\mathbf{Set}, \\qquad Z \\mapsto ' +
        '\\{\\, f \\in \\mathcal{C}(Z, X) \\ \\mid\\ f(Z) \\subseteq Y \\,\\}$$\n\n' +
        '  (here $\\mathcal{C}(Z, X)$ denotes the set of continuous maps $Z \\to X$). ' +
        'It is represented by the natural element $i : Y \\rightarrowtail X$ of $F(Y)$.',
        status: 'reviewed', basedOn: 'v0.9.1#d1444966', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------ 5. 加法 / 阿贝尔范畴 */
    'def.abelian-category': {
      statement: {
        en:
        '- A **preadditive category** (an $\\mathbf{Ab}$-category) is a category in which every ' +
        '$\\operatorname{Hom}$ set carries an abelian group structure and composition is ' +
        'bilinear;\n' +
        '- A **zero object** is an object with $\\operatorname{End}(M) = 1$ (that is, ' +
        '$1_{M} = 0_{M}$); an object $M$ is the **direct sum** $M = M_{1} \\oplus M_{2}$ of ' +
        '$M_{1}, M_{2}$ if there are $p_{k} : M \\to M_{k}$, $i_{k} : M_{k} \\to M$ with ' +
        '$p_{1} i_{1} = 1$, $p_{2} i_{2} = 1$, $i_{1} p_{1} + i_{2} p_{2} = 1_{M}$;\n' +
        '- An **additive category** is a preadditive category with a zero object and all direct ' +
        'sums (equivalently: all finite products exist, or all finite coproducts exist — in ' +
        'which case both exist and agree);\n' +
        '- A **preabelian category** is an additive category in which every morphism has a ' +
        'kernel and a cokernel (equivalently: all finite limits and finite colimits exist);\n' +
        '- An **abelian category** is a preabelian category satisfying one of the following ' +
        '**equivalent** conditions:\n\n' +
        '1. every monomorphism is regular (dually, every epimorphism is regular);\n' +
        '2. if $i : N \\rightarrowtail M$ is a monomorphism, then ' +
        '$N \\cong \\ker\\bigl(M \\twoheadrightarrow \\operatorname{coker}(i)\\bigr)$ (and ' +
        'dually);\n' +
        '3. every morphism factors (uniquely up to isomorphism) as an epimorphism followed by a ' +
        'monomorphism;\n' +
        '4. for every $f : M \\to N$, ' +
        '$\\ker\\bigl(N \\to \\operatorname{coker} f\\bigr) \\cong ' +
        '\\operatorname{coker}\\bigl(\\ker f \\to M\\bigr)$.',
        status: 'reviewed', basedOn: 'v0.9.1#70512d43', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'In an abelian category one says **injective / surjective** rather than monomorphism / ' +
        'epimorphism — because condition 1 guarantees that "regular" and "cancellable" are the ' +
        'same thing.\n\n' +
        'Examples: $A\\text{-}\\mathbf{Mod}$ is abelian; so is $\\mathbf{Ab}(\\mathcal{T})$ for a ' +
        'topos; so is $\\mathbf{AbCHaus}$. But $\\mathbf{AbTop}$ is **not** (the ' +
        'identity map $\\mathbb{Z}^{\\mathrm{disc}} \\to \\mathbb{Z}^{\\mathrm{coarse}}$ is not ' +
        'strict), and neither is $\\mathbf{AbHaus}$.\n\n' +
        'An abelian category is the **working environment** of homological algebra as a whole: ' +
        'with kernels and cokernels one can even state "exact sequence"; an additive category ' +
        'only supplies the additive skeleton (zero object and direct sums).',
        status: 'reviewed', basedOn: 'v0.9.1#a8da619b', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------- 6. 乘积测度 */
    'def.product-measure': {
      statement: {
        en:
        'Let $(X, \\mathcal{M}, \\mu )$ and $(Y, \\mathcal{N}, \\nu )$ be measure spaces.\n\n' +
        '**① Rectangles**: sets of the form $A \\times B$ (with $A \\in \\mathcal{M}$, ' +
        '$B \\in \\mathcal{N}$) are called (measurable) rectangles. All rectangles **generate** ' +
        '$\\mathcal{M} \\otimes  \\mathcal{N}$.\n\n' +
        '**② Premeasure on rectangles**: let $\\mathcal{A}$ be the collection of all **finite ' +
        'disjoint unions of rectangles**. For\n\n' +
        '$$E = \\bigsqcup_{j=1}^{n} (A_j \\times B_j)$$\n\n' +
        'define\n\n' +
        '$$\\mu_{0} (E) := \\sum_{j=1}^{n} \\mu(A_j) \\nu(B_j)$$\n\n' +
        'Then $\\mu_{0}$ is a **premeasure** on the algebra $\\mathcal{A}$.\n\n' +
        '**③ Extension**: $\\mu_{0}$ induces an outer measure on $X \\times Y$, and restricting ' +
        'it to $\\mathcal{M} \\otimes  \\mathcal{N}$ gives a measure, written\n\n' +
        '$$\\mu \\times \\nu$$\n\n' +
        'that is, the **product measure**.',
        status: 'reviewed', basedOn: 'v0.9.1#174abecd', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Well-definedness of $\\mu_{0} $ has to be checked (the same $E$ can be split into ' +
        'different disjoint unions of rectangles) — this is exactly why "rectangles" are ' +
        'replaced by "**disjoint** unions of rectangles": under disjoint unions, additivity is ' +
        'easy to verify.\n\n' +
        '**Everything goes through when the measures are $\\sigma$-finite**: if $\\mu$ and $\\nu$ ' +
        'are both $\\sigma$-finite, then $\\mu \\times \\nu$ is $\\sigma$-finite as well, and by ' +
        'Carathéodory uniqueness the measure constructed this way is unique.\n\n' +
        '⚠ The whole machine of this step (premeasure $\\to$ outer measure $\\to$ Carathéodory ' +
        'extension $\\to$ uniqueness) is exactly the off-the-shelf quartet from the ' +
        '"constructing measures" cluster.',
        status: 'reviewed', basedOn: 'v0.9.1#15d8cb14', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------- 7. 紧生成空间是余反射子范畴 */
    'prop.cg-coreflective': {
      statement: {
        en:
        'The category $k\\mathbf{Top}$ of compactly generated spaces is a **coreflective ' +
        'subcategory** of $\\mathbf{Top}$: the inclusion functor ' +
        '$i : k\\mathbf{Top} \\hookrightarrow \\mathbf{Top}$ has a **right** adjoint\n\n' +
        '$$k : \\mathbf{Top} \\longrightarrow k\\mathbf{Top}, \\qquad X \\mapsto kX$$\n\n' +
        'that is, $i \\dashv k$. The space $kX$ has the same underlying set as $X$, with the ' +
        'topology replaced by the $k$-topology.',
        status: 'reviewed', basedOn: 'v0.9.1#0d2ec83c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        '**What has to be shown**: for every compactly generated space $X$ and every topological ' +
        'space $Y$,\n\n' +
        '$$\\operatorname{Hom}_{\\mathbf{Top}}(X,\\ Y) \\;\\cong\\; ' +
        '\\operatorname{Hom}_{k\\mathbf{Top}}\\bigl(X,\\ kY\\bigr).$$\n\n' +
        '**Proof.** The counit is $\\varepsilon_{Y} : kY \\to Y$ (the identity map, topology from ' +
        'finer to coarser, continuous).\n\n' +
        '- First, $kY$ really is compactly generated: compose every continuous map $S \\to Y$ ' +
        '($S$ compact Hausdorff) with $\\varepsilon_{Y}$ to lift it to $S \\to kY$, then use the ' +
        'definition of $kY$ (how $k$-open sets are taken) to verify that "the topology is ' +
        'determined by these maps".\n' +
        '- So whenever $f : X \\to Y$ is continuous (with $X$ compactly generated), ' +
        '$f = \\varepsilon_{Y} \\circ f\': X \\to kY$ yields a continuous map $f\'$ into $kY$: ' +
        'let $U \\subseteq kY$ be open; we must show that $f\'^{-1}(U)$ is open in $X$. Since ' +
        '$X$ is compactly generated, it suffices to check for every compact $L \\subseteq X$ ' +
        'that $f\'^{-1}(U) \\cap L$ is open in $L$. But $f|_{L} : L \\to Y$ is continuous and ' +
        '$L$ is compact, so $f(L)$ is compact; $U \\cap f(L)$ is open in $f(L)$, hence ' +
        '$(f|_{L})^{-1}\\bigl(U \\cap f(L)\\bigr) = f\'^{-1}(U) \\cap L$ is open in $L$. ∎\n' +
        '- The converse direction follows directly from continuity of $\\varepsilon_{Y}$. The ' +
        'two directions are mutually inverse, which is the isomorphism.\n\n' +
        '⭐ Keep this side by side with compact Hausdorff: $\\mathbf{CHaus}$ is a **reflective** ' +
        'subcategory of $\\mathbf{Top}$ (the inclusion has a **left** adjoint $\\beta$), whereas ' +
        '$k\\mathbf{Top}$ is **coreflective** (the inclusion has a **right** adjoint $k$). One ' +
        '"tightens" a space, the other "loosens" it — hence the former is closed under limits ' +
        'and the latter under **colimits**.',
        status: 'reviewed', basedOn: 'v0.9.1#66941903', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------- 8. 拓扑斯上的阿贝尔群是 Grothendieck 范畴 */
    'thm.topos-abelian-grothendieck': {
      statement: {
        en:
        'If $\\mathcal{T}$ is a topos, then the category $\\mathcal{T}(\\mathbf{Ab})$ of abelian ' +
        'sheaves on $\\mathcal{T}$ is a **Grothendieck category**: it has a small set of ' +
        'generators, has all colimits, and filtered colimits are exact.',
        status: 'reviewed', basedOn: 'v0.9.1#f13b85f8', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'The proof has three parts:\n\n' +
        '- **Abelian**: first verify componentwise in the presheaf category ' +
        '$\\widehat{\\mathcal{C}}(\\mathbf{Ab})$ (there one simply has pointwise abelian groups) ' +
        '— concretely, for an arbitrary morphism $u$ verify ' +
        '$\\operatorname{coker}(\\ker u) \\cong \\ker(\\operatorname{coker} u)$; then transport ' +
        'these identities back to the sheaf category along the **exact reflection** ' +
        '(sheafification). The same argument gives exactness of filtered colimits.\n' +
        '- **All limits and colimits exist**: because the sheaf category is a reflective ' +
        'subcategory of the presheaf category.\n' +
        '- **Small set of generators**: if $S$ is a small set of generators of $\\mathcal{T}$, ' +
        'then $\\{\\mathbb{Z}\\cdot X : X \\in S\\}$ generates $\\mathcal{T}(\\mathbf{Ab})$ — ' +
        'their coproduct is a generator.\n\n' +
        'One more fact along the way: $\\mathbb{Z}\\cdot X$ is **projective** in ' +
        '$\\mathcal{T}(\\mathbf{Ab})$ (look at presheaves first: ' +
        '$M \\mapsto \\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Z}\\cdot h_{X}, M) \\cong M(X)$ ' +
        'is exact on presheaves).',
        status: 'reviewed', basedOn: 'v0.9.1#66118814', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* --------------------------- 9. NBV 函数的导数与测度的关系 */
    'prop.nbv-derivative': {
      statement: {
        en:
        'Let $F \\in NBV$. Then $F\' \\in L^1(m)$, and\n\n' +
        '$$\\mu_F \\perp  m \\iff F\' = 0\\quad  \\text{a.e.}$$\n' +
        '$$\\mu_F \\ll  m \\iff F(x) = \\int_{-\\infty}^{x} F\'(t) dt$$',
        status: 'reviewed', basedOn: 'v0.9.1#2fff7b16', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Proof: write $d\\mu_F = d\\lambda + f\\cdot dm$ (Lebesgue decomposition); by the ' +
        'corresponding theorem for measures, $f = F\'$ a.e. Hence\n\n' +
        '$\\cdot$ $\\mu_F \\perp  m$ means the absolutely continuous part vanishes, that is ' +
        '$f = 0 \\implies F\' = 0 \\text{a.e.}$;\n\n' +
        '$\\cdot$ $\\mu_F \\ll  m$ means $\\lambda = 0$, so ' +
        '$F(x) = \\mu_F((-\\infty,x]) = \\int_{-\\infty}^x f\\cdot dm = \\int_{-\\infty}^x F\'\\cdot dt$.\n\n' +
        '⭐ This is the measure-theoretic version of the fundamental theorem of calculus: ' +
        '**whether a function can be integrated back depends on whether $\\mu _F$ is absolutely ' +
        'continuous**.',
        status: 'reviewed', basedOn: 'v0.9.1#e730d43c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* --------------------------------------- 10. 环 → σ-环 的判据 */
    'thm.ring-monotone-sigma': {
      statement: {
        en:
        'Let $\\mathfrak{A}$ be a **ring**. Then the following three conditions are equivalent:\n\n' +
        '1. $\\mathfrak{A}$ is a $\\sigma$-ring;\n' +
        '2. $\\mathfrak{A}$ is a monotone class;\n' +
        '3. $\\mathfrak{A}$ is closed under countable disjoint unions.',
        status: 'reviewed', basedOn: 'v0.9.1#5d3aa74a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Note that the hypothesis "$\\mathfrak{A}$ is a ring" cannot be dropped — a monotone ' +
        'class is in general not closed under finite unions, so being a monotone class by ' +
        'itself does not imply being a $\\sigma$-ring.\n\n' +
        'This theorem is the technical core of the monotone class theorem: it is precisely what ' +
        'lets one reduce "true for all $\\sigma$-algebras" to "first verify it on a ring, then ' +
        'pass to monotone limits".',
        status: 'reviewed', basedOn: 'v0.9.1#ce1b4b57', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ================================================ 批次 2a（枢纽榜第 11–20 名里的短条）
       ⚠️ 这几条**还没审**（status: 'draft'）—— 作者审完再翻，翻法见 tools/i18n-review.mjs。 */

    /* ------------------------------------------------ Hausdorff 极大原理 */
    'thm.hausdorff': {
      statement: {
        en:
        'Let $(P, \\preceq )$ be a poset and $C_{0} \\subseteq P$ a chain. Then there is a ' +
        '**maximal chain** $M$ of $P$ with $C_{0} \\subseteq M$.\n\n' +
        'Here "maximal chain" means a chain that is maximal under inclusion $\\subseteq$: if ' +
        '$M \\subseteq M\' \\subseteq P$ and $M\'$ is again a chain, then $M\' = M$.\n\n' +
        'Taking $C_{0} = \\emptyset$ gives: **every non-empty poset has a maximal chain.**',
        status: 'draft', basedOn: 'v0.9.1#317a7f66', reviewed: null,
      },
      notes: {
        en:
        'In form it predates Zorn\'s lemma (Hausdorff, 1914), and it is equivalent to it.\n\n' +
        'The existence of a maximal chain is exactly the rigorous version of the intuition ' +
        '"keep adding elements from below until you can add no more".',
        status: 'draft', basedOn: 'v0.9.1#53809b5a', reviewed: null,
      },
    },

    /* ------------------------------------------------------------ 截口 */
    'def.section': {
      statement: {
        en:
        'Let $E \\subseteq X \\times Y$. For $x \\in X$ and $y \\in Y$ define\n\n' +
        '$$E_x := \\{y \\in Y : (x, y) \\in E\\}$$\n\n' +
        '$$E^y := \\{x \\in X : (x, y) \\in E\\}$$\n\n' +
        'called respectively the **vertical section** of $E$ at $x$ and the **horizontal ' +
        'section** at $y$.\n\n' +
        'Similarly, for a function $f : X \\times Y \\to \\mathbb{C}$ define\n\n' +
        '$$f_x(y) := f^y(x) := f(x, y)$$',
        status: 'draft', basedOn: 'v0.9.1#ad479275', reviewed: null,
      },
      notes: {
        en:
        'Intuition: cut a plane figure with a vertical (or horizontal) line; the segment you ' +
        'cut out is the section.\n\n' +
        'Sections are the language of Fubini\'s theorem: the double integral ' +
        '$\\iint f d(\\mu \\times \\nu)$ is "integrate along the sections first, then integrate ' +
        'the resulting function of the other variable".',
        status: 'draft', basedOn: 'v0.9.1#8645e773', reviewed: null,
      },
    },

    /* -------------------------------------------------------- 良序定理 */
    'thm.wellordering': {
      statement: {
        en:
        'Every set can be given a well-ordering: for any set $X$ there is a well-ordering ' +
        'relation $\\preceq$ on $X$.\n\n' +
        'In other words: every set $X$ is equinumerous with some ordinal.\n\n' +
        'In particular, every set has a cardinality, and the real line admits a well-ordering ' +
        '(though this well-ordering cannot be written down explicitly).',
        status: 'draft', basedOn: 'v0.9.1#f0e20930', reviewed: null,
      },
      notes: {
        en:
        'Zermelo introduced the axiom of choice explicitly in 1904 in order to prove that ' +
        'every set can be well-ordered; this is where AC first appears.\n\n' +
        'The well-ordering theorem immediately yields the **comparability theorem for ' +
        'cardinals**: any two sets have comparable cardinalities.\n\n' +
        'It cannot be proved in ZF; but ZF together with it proves AC, so the two are ' +
        'equivalent.',
        status: 'draft', basedOn: 'v0.9.1#bf8c5d7a', reviewed: null,
      },
    },

    /* ---------------------------------------------------- 基数可比定理 */
    'thm.cardinal-comparable': {
      statement: {
        en:
        'Under the **axiom of choice**: for any two sets $A$ and $B$ we have ' +
        '$|A| \\le |B|$ or $|B| \\le |A|$.\n\n' +
        'That is, any two cardinals are comparable.',
        status: 'draft', basedOn: 'v0.9.1#65d602d2', reviewed: null,
      },
      notes: {
        en:
        '⭐ This is the licence to *order* cardinals: without it, even the sentence ' +
        '"$A$ is bigger than $B$" can be meaningless.\n\n' +
        'Route of the proof (see the edge): the **well-ordering theorem** well-orders both ' +
        '$A$ and $B$, the corresponding ordinals are comparable, and hence one direction ' +
        'admits an injection. So this theorem, AC and the well-ordering theorem are three ' +
        'ways of saying the same thing.\n\n' +
        '⚠ Without AC there really are incomparable cardinals (Jech, *The Axiom of Choice*).',
        status: 'draft', basedOn: 'v0.9.1#f4afd520', reviewed: null,
      },
    },

    /* ------------------------------------------------------ 全忠实与单位 */
    'prop.adjoint-full-faithful': {
      statement: {
        en:
        'Let $F \\dashv G$ with unit $\\eta$ and counit $\\varepsilon$. Then $F$ is ' +
        '**fully faithful** $\\iff$ $\\eta$ is an isomorphism; $G$ is **fully faithful** ' +
        '$\\iff$ $\\varepsilon$ is an isomorphism.',
        status: 'draft', basedOn: 'v0.9.1#315d7da7', reviewed: null,
      },
      notes: {
        en:
        'So "a left adjoint is fully faithful" reduces to checking that every component of a ' +
        'single natural transformation is invertible — far easier than checking Hom-sets ' +
        'pair by pair.\n\n' +
        'This is also the dividing line between **reflective** and **coreflective**: ' +
        'reflective means "the inclusion functor has a left adjoint", and an inclusion ' +
        'functor is always fully faithful (full subcategory), so for a reflection the counit ' +
        'is always an isomorphism.',
        status: 'draft', basedOn: 'v0.9.1#9b807211', reviewed: null,
      },
    },

    /* ================================================ 批次 2b（枢纽榜第 11–20 名剩下的 5 条） */

    /* -------------------------------------------------------- 单调类定理 */
    'thm.monotone-class': {
      statement: {
        en:
        'Let $\\mathcal{E} \\subseteq \\mathcal{P}(X)$. Then\n\n' +
        '$$\\mathcal{M}(\\mathcal{E}) = \\mathfrak{m}(\\mathcal{E}) \\iff ' +
        '\\forall A \\in \\mathcal{E} : A^c \\in \\mathfrak{m}(\\mathcal{E})\\ \\wedge\\ ' +
        '\\forall A, B \\in \\mathcal{E} : A \\cup B \\in \\mathfrak{m}(\\mathcal{E})$$',
        status: 'draft', basedOn: 'v0.9.1#48f20867', reviewed: null,
      },
      notes: {
        en:
        '**This is the combined "standard + strengthened" version.**\n\n' +
        '**Standard version** (Halmos §6 / Folland 2.37): if $\\mathcal{A}$ is an **algebra** ' +
        'then $\\mathfrak{m}(\\mathcal{A}) = \\mathcal{M}(\\mathcal{A})$.\n\n' +
        'What is stated above is the **strengthened version**: "$\mathcal{E}$ is an algebra" ' +
        'is replaced by two weaker conditions — the **complements** and the **unions** of ' +
        'sets in $\\mathcal{E}$ only have to land in $\\mathfrak{m}(\\mathcal{E})$. The proof ' +
        'is still the usual three steps of the monotone class theorem:\n\n' +
        '**①** Let $\\mathcal{K}_{1} = \\{A \\in \\mathfrak{m} : A^{c} \\in \\mathfrak{m}\\}$. ' +
        'It contains $\\mathcal{E}$ (first condition), and is itself a monotone class ' +
        '($\\mathfrak{m}$ is monotone $\\implies$ limits stay in $\\mathfrak{m}$; complements ' +
        'use one decreasing limit) $\\implies \\mathcal{K}_{1} = \\mathfrak{m}$, i.e. ' +
        '$\\mathfrak{m}$ is closed under **complements**.\n\n' +
        '**②** Fix $A \\in \\mathcal{E}$ and let ' +
        '$\\mathcal{K}_{2} = \\{B \\in \\mathfrak{m} : A \\cup B \\in \\mathfrak{m}\\}$. By the ' +
        'second condition $\\mathcal{K}_{2} \\supseteq \\mathcal{E} \\implies ' +
        '\\mathcal{K}_{2} = \\mathfrak{m}$.\n\n' +
        '**③** Fix $B \\in \\mathfrak{m}$ and let ' +
        '$\\mathcal{K}_{3} = \\{A \\in \\mathfrak{m} : A \\cup B \\in \\mathfrak{m}\\}$. By ②, ' +
        '$\\mathcal{K}_{3} \\supseteq \\mathcal{E} \\implies \\mathcal{K}_{3} = \\mathfrak{m}$, ' +
        'i.e. $\\mathfrak{m}$ is closed under **unions**.\n\n' +
        'Hence $\\mathfrak{m}$ is closed under $\\cup$ and complements, and is a monotone ' +
        'class $\\implies$ $\\mathfrak{m}$ is a $\\sigma$-algebra $\\implies ' +
        '\\mathcal{M}(\\mathcal{E}) \\subseteq \\mathfrak{m}(\\mathcal{E})$; the reverse ' +
        'inclusion always holds, so the two sides are equal. (One needs ' +
        '$\\mathcal{E} \\ne \\emptyset$, otherwise ' +
        '$\\mathfrak{m}(\\mathcal{E}) = \\{\\emptyset \\}$.)\n\n' +
        '⚠ Replacing $\\cup$ by $\\cap$ or $\\setminus$ gives the same conclusion — once ' +
        'complements are available, the various closure properties imply each other, so the ' +
        'symbol used here does not affect whether the theorem is true.\n\n' +
        '**How it is used** (the same for either version): to prove that a property holds ' +
        'for all sets in $\\mathcal{M}(\\mathcal{E})$, it suffices to ($i$) prove it for ' +
        '$\\mathcal{E}$ and (ii) prove that "it holds" is preserved by increasing unions and ' +
        'decreasing intersections — then the sets for which it holds form a monotone class ' +
        'containing $\\mathcal{E}$, hence one containing ' +
        '$\\mathfrak{m}(\\mathcal{E}) = \\mathcal{M}(\\mathcal{E})$. Uniqueness of the measure ' +
        'extension, the section formula for product measures and the approximation of ' +
        'measurable functions all follow this pattern.\n\n' +
        '⚠ It is a sister result of "the criterion for a ring to be a $\\sigma$-ring": that ' +
        'one says ring $+$ monotone $\\implies$ $\\sigma$-ring, this one says algebra ' +
        '$\\implies$ monotone class and $\\sigma$-algebra coincide.',
        status: 'draft', basedOn: 'v0.9.1#15101468', reviewed: null,
      },
    },

    /* ---------------------------------------------------------- 截口可测 */
    'prop.section-measurable': {
      statement: {
        en:
        '**(a)** If $E \\in \\mathcal{M} \\otimes  \\mathcal{N}$, then for every ' +
        '$x \\in X$ we have $E_x \\in \\mathcal{N}$, and for every $y \\in Y$ we have ' +
        '$E^y \\in \\mathcal{M}$.\n\n' +
        '**(b)** If $f$ is $\\mathcal{M} \\otimes  \\mathcal{N}$-measurable, then for every ' +
        '$x$ the function $f_x$ is $\\mathcal{N}$-measurable, and for every $y$ the function ' +
        '$f^y$ is $\\mathcal{M}$-measurable.',
        status: 'draft', basedOn: 'v0.9.1#2db4532b', reviewed: null,
      },
      notes: {
        en:
        'The proof is the standard pattern "rectangles first, then $\\sigma$-algebras". Let\n\n' +
        '$$\\mathcal{R} = \\{E \\subseteq X \\times Y : E_x \\in \\mathcal{N} \\ \\wedge\\ ' +
        'E^y \\in \\mathcal{M}\\quad \\forall(x, y)\\}$$\n\n' +
        'Then $\\mathcal{R}$ contains all rectangles, and **$\\mathcal{R}$ is a ' +
        '$\\sigma$-algebra** (the section operations preserve unions, intersections and ' +
        'complements). Hence $\\mathcal{R} \\supseteq \\mathcal{M} \\otimes \\mathcal{N}$.\n\n' +
        '(b) follows from (a) and two identities:\n\n' +
        '$$f_x^{-1}(B) = (f^{-1}(B))_x, \\quad  f^{y-1}(B) = (f^{-1}(B))^y$$\n\n' +
        '⚠ Note that (b) says "**every** $x$ works", whereas Fubini\'s theorem can only ' +
        'guarantee "almost every" — because Fubini also needs integrability.',
        status: 'draft', basedOn: 'v0.9.1#bd705c8a', reviewed: null,
      },
    },

    /* ------------------------------------------------ 商映射与局部紧空间作积 */
    'thm.quotient-product': {
      statement: {
        en:
        'Let $q : X \\to Y$ be a **quotient map** and $Z$ a **locally compact Hausdorff** ' +
        'space. Then\n\n' +
        '$$q \\times \\mathrm{id}_{Z} : X \\times Z \\longrightarrow Y \\times Z$$\n\n' +
        'is again a quotient map.',
        status: 'draft', basedOn: 'v0.9.1#aca983a4', reviewed: null,
      },
      notes: {
        en:
        '⭐ **This is the engine behind "compactly generated spaces are closed under ' +
        'products"**, and it is where a search for "quotient map" or "locally compact" ' +
        'should land.\n\n' +
        '**How the proof goes (continuity of the inverse).** Write ' +
        '$W := (q \\times \\mathrm{id}_{Z})^{-1}(U)$ and show that $W$ is open. Take a point ' +
        '$(x, z) \\in W$ and put $y = q(x)$. Since $U$ is open in $Y \\times Z$, one can pick ' +
        'a basic open set\n\n' +
        '$$V \\times K \\;\\subseteq\\; U, \\qquad y \\in V,\\;\\; z \\in K,$$\n\n' +
        'where $V$ is open and $K$ is a **compact neighbourhood** of $z$ (a locally compact ' +
        'Hausdorff space has a base of compact neighbourhoods at every point, and $K$ may be ' +
        'required to lie inside any prescribed neighbourhood). Since $q$ is a quotient map, ' +
        '$q^{-1}(V)$ is open in $X$, so\n\n' +
        '$$q^{-1}(V) \\times K \\;\\subseteq\\; W$$\n\n' +
        'is an open neighbourhood of $(x, z)$ — hence $(x, z)$ is an interior point of $W$, ' +
        'so $W$ is open. ∎\n\n' +
        '⚠ **The locally compact hypothesis cannot be dropped.** In general "a quotient map ' +
        'times the identity" is not a quotient map: take $q$ to be some badly behaved ' +
        'quotient and $Z$ a space that is neither locally compact nor compactly generated; ' +
        'the product topology is then strictly finer than the topology the quotient space ' +
        'should have.\n\n' +
        'Terminology: some write this as "$Z$ locally compact Hausdorff $\\implies$ the ' +
        'functor $- \\times Z$ preserves quotient maps".',
        status: 'draft', basedOn: 'v0.9.1#34fccb9f', reviewed: null,
      },
    },

    /* ------------------------------------------------------------ 整数 ℤ */
    'def.int': {
      statement: {
        en:
        'On $\\mathbb{N} \\times \\mathbb{N}$ define\n\n' +
        '$$(a, b) \\sim (c, d) :\\iff a + d = b + c$$\n\n' +
        '(intuition: $(a, b)$ stands for $a - b$; this equivalence relation says precisely ' +
        'that the differences are equal). It really is an equivalence relation. Put\n\n' +
        '$$\\mathbb{Z} := (\\mathbb{N} \\times \\mathbb{N}) / \\sim$$\n\n' +
        'Its elements are written $[a, b]$ (that is, $a - b$). The **operations and order** ' +
        'on $\\mathbb{Z}$ (both must first be checked to be independent of the choice of ' +
        'representatives):\n\n' +
        '$$[a, b] + [c, d] := [a + c,\\ b + d]$$\n\n' +
        '$$[a, b] \\cdot [c, d] := [ac + bd,\\ ad + bc]$$\n\n' +
        '$$[a, b] \\le [c, d] :\\iff a + d \\le b + c$$\n\n' +
        'Here addition and order come from those of $\\mathbb{N}$, and the formula for ' +
        'multiplication is copied from $(a - b)(c - d) = ac + bd - (ad + bc)$.',
        status: 'draft', basedOn: 'v0.9.1#5c26a908', reviewed: null,
      },
      notes: {
        en:
        '⭐ The motivation in one sentence: **subtraction does not work inside ' +
        '$\\mathbb{N}$** ($3 - 5$ does not exist), yet the *pair* "$3 - 5$" always makes ' +
        'sense — so one takes the difference itself as a new object.\n\n' +
        'By-product: $\\mathbb{Z}$ has an additive zero $[0, 0] = 0$ and additive inverses ' +
        '$-[a, b] = [b, a]$ — precisely what $\\mathbb{N}$ lacks.\n\n' +
        '⚠ Inside $\\mathbb{Z}$, the copy of $\\mathbb{N}$ is **embedded** via ' +
        '$a \\mapsto [a, 0]$ (injective, and preserving the operations and the order), so ' +
        'writing $3 \\in \\mathbb{Z}$ uses this embedding — that step cannot be skipped.',
        status: 'draft', basedOn: 'v0.9.1#fe258a30', reviewed: null,
      },
    },

    /* --------------------------------------------- Kan 延拓的两个例子 */
    'ex.kan-extension': {
      statement: {
        en:
        '**(1)** A diagram $D : I \\to \\mathcal{C}$ has a colimit $X$ $\\iff$ the left Kan ' +
        'extension $p_{!}D : \\mathbf{1} \\to \\mathcal{C}$ along the projection ' +
        '$p : I \\to \\mathbf{1}$ exists, and its value is\n\n' +
        '$$(p_{!}D)(\\ast) = \\varinjlim_{i \\in I} D(i) = X$$\n\n' +
        '**(2)** A functor $F : \\mathcal{C} \\to \\mathcal{D}$ has a right adjoint $G$ ' +
        '$\\iff$ the left Kan extension of the identity functor $1_{\\mathcal{C}}$ along ' +
        '$F$ exists, and then\n\n' +
        '$$G = F_{!}1_{\\mathcal{C}}, \\qquad \\operatorname{Hom}(F_{!}1_{\\mathcal{C}},\\ ' +
        'G) \\cong \\operatorname{Hom}(1_{\\mathcal{C}},\\ G \\circ F)$$\n\n' +
        'The map $1_{\\mathcal{C}} \\implies G \\circ F$ corresponding to the right-hand ' +
        'side is exactly the **unit** $\\eta$.',
        status: 'draft', basedOn: 'v0.9.1#15b421bb', reviewed: null,
      },
      notes: {
        en:
        'Read the two together: **colimits and right adjoints are special cases of Kan ' +
        'extensions**. The Kan extension is the unifying exit of this whole cluster — the ' +
        'definitions scattered earlier (limit, adjunction, reflection) each fall into place ' +
        'inside it.',
        status: 'draft', basedOn: 'v0.9.1#77203f35', reviewed: null,
      },
    },

    /* ================================================ 批次 3a（枢纽榜第 21–30 名，前四条） */

    /* -------------------------------------------------- 紧的三个等价刻画 */
    'thm.metric-compact-equiv': {
      statement: {
        en:
        'Let (X, d) be a metric space. Then the following three conditions are ' +
        '**equivalent**: $X$ is compact $\\iff$ $X$ is sequentially compact $\\iff$ $X$ is ' +
        'complete and totally bounded.',
        status: 'draft', basedOn: 'v0.9.1#8c5b3033', reviewed: null,
      },
      notes: {
        en:
        'The whole logical skeleton is in the arrows (click an arrow to see its proof):\n\n' +
        '- compact $\\implies$ sequentially compact\n' +
        '- sequentially compact $\\implies$ totally bounded　(the **only** step in this ' +
        'cluster that genuinely uses a choice principle — DC)\n' +
        '- sequentially compact $\\implies$ complete\n' +
        '- sequentially compact $\\implies$ compact　(the "bad balls" argument; it uses ' +
        'total boundedness only, and no choice)\n' +
        '- compact $\\implies$ complete, compact $\\implies$ totally bounded\n' +
        '- complete + totally bounded $\\implies$ sequentially compact　(the diagonal ' +
        'argument; again no choice)\n\n' +
        'So "sequentially compact $\\implies$ totally bounded $\\implies$ compact" and ' +
        '"compact $\\implies$ sequentially compact" close the circle, and the three notions ' +
        'agree.\n\n' +
        '⚠ In a general topological space only "compact $\\implies$ sequentially compact" ' +
        'holds — **the converse fails**: sequential compactness is a piece of luck peculiar ' +
        'to metric spaces.',
        status: 'draft', basedOn: 'v0.9.1#8e05fc76', reviewed: null,
      },
    },

    /* -------------------------------------------------------- 伴随函子定理 */
    'thm.saft': {
      statement: {
        en:
        'Let $\\mathcal{D}$ be a **small** and **complete** category. Then a functor ' +
        '$G : \\mathcal{D} \\to \\mathcal{C}$ has a left adjoint $\\iff$ $G$ preserves all ' +
        'limits.\n\n' +
        'The left adjoint is given by a limit construction:\n\n' +
        '$$F(X) \\;=\\; \\varprojlim_{(Y,\\, f) \\in (X \\downarrow G)} Y$$',
        status: 'draft', basedOn: 'v0.9.1#f6d84124', reviewed: null,
      },
      notes: {
        en:
        '**Preservation of limits is the only obstruction.** Together with "a right adjoint ' +
        'preserves limits" this gives a complete criterion: preservation of limits is ' +
        'necessary, and on a complete small category it is also sufficient.\n\n' +
        'What the construction means: all the ways of mapping $X$ into the image of $G$ ' +
        'form a category $X \\downarrow G$, and one takes a limit in it — $F(X)$ is the ' +
        'object of $\\mathcal{D}$ "closest" to $X$. Every $X \\to G(Y)$ can be organised as ' +
        '$X \\to G(F(X)) \\to G(Y)$.\n\n' +
        'The proof is the derivation on the edge.',
        status: 'draft', basedOn: 'v0.9.1#bdd6e136', reviewed: null,
      },
    },

    /* ---------------------------------------------------------- 米田嵌入 */
    'prop.yoneda-embedding': {
      statement: {
        en:
        'The correspondence\n\n' +
        '$$\\delta : \\mathcal{C} \\longrightarrow \\widehat{\\mathcal{C}}, \\qquad ' +
        'X \\mapsto h_{X} = \\operatorname{Hom}_{\\mathcal{C}}(-, X)$$\n\n' +
        'is a **fully faithful** functor, and it **preserves all limits**.',
        status: 'draft', basedOn: 'v0.9.1#f759aee2', reviewed: null,
      },
      notes: {
        en:
        'Fully faithful means ' +
        '$\\operatorname{Hom}_{\\widehat{\\mathcal{C}}}(h_{X}, h_{Y}) \\cong ' +
        '\\operatorname{Hom}_{\\mathcal{C}}(X, Y)$ — the arrows among the $h_{X}$ reproduce ' +
        'the arrows among the $X$ exactly, no more and no less.\n\n' +
        'Once $\\mathcal{C}$ is embedded in $\\widehat{\\mathcal{C}}$, questions inside ' +
        '$\\mathcal{C}$ can be solved in a category that **has all limits and colimits** — ' +
        'this is the standard way of "completing" a category.',
        status: 'draft', basedOn: 'v0.9.1#94b15f1c', reviewed: null,
      },
    },

    /* ------------------------------------------------------------ 可缩族 */
    'def.shrinks-nicely': {
      statement: {
        en:
        'A family $\\{E_r\\}_{r > 0}$ of Borel subsets of $\\mathbb{R}^n$ is said to ' +
        '**shrink nicely to $x$** iff\n\n' +
        '$\\cdot$ $E_r \\subseteq B(r, x)$ holds for every $r$;\n' +
        '$\\cdot$ there is $\\alpha > 0$ with ' +
        '$m(E_r) > \\alpha\\cdot m(B(r, x))$ for every $r$.',
        status: 'draft', basedOn: 'v0.9.1#def659f2', reviewed: null,
      },
      notes: {
        en:
        'What the two conditions say: **it fits inside** ($E_r$ lies in the ball) and **it ' +
        'is not too flat** (its volume is at least $\alpha$ times that of the ball).\n\n' +
        'Typical examples: take $E_r = B(r, x)$ itself ($\alpha = 1$); or take $E_r$ to be ' +
        'a fixed shape inside the ball (a cube, say), rescaled proportionally.\n\n' +
        'Counterexample: let $E_r$ be a long thin sliver inside the ball — the volume ratio ' +
        'can tend to 0, and such a family does not shrink nicely to $x$.\n\n' +
        '⭐ The notion was introduced so that differentiation theorems **do not depend on ' +
        'the shape of the ball**: as long as it is not flat, the conclusion stands.',
        status: 'draft', basedOn: 'v0.9.1#cd8d3dd5', reviewed: null,
      },
    },
  },
};
