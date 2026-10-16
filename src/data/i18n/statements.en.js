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
        status: 'draft', basedOn: 'v0.9.0#88c083ff', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#4e157a1c', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#1f75f342', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#8164331f', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#31649b03', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#a1cebdb4', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#4ba3632c', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#a43dd73a', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#befbd619', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#d1444966', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#70512d43', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#a8da619b', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#174abecd', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#15d8cb14', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#0d2ec83c', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#66941903', reviewed: null,
      },
    },

    /* ------------------------- 8. 拓扑斯上的阿贝尔群是 Grothendieck 范畴 */
    'thm.topos-abelian-grothendieck': {
      statement: {
        en:
        'If $\\mathcal{T}$ is a topos, then the category $\\mathcal{T}(\\mathbf{Ab})$ of abelian ' +
        'sheaves on $\\mathcal{T}$ is a **Grothendieck category**: it has a small set of ' +
        'generators, has all colimits, and filtered colimits are exact.',
        status: 'draft', basedOn: 'v0.9.0#f13b85f8', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#66118814', reviewed: null,
      },
    },

    /* --------------------------- 9. NBV 函数的导数与测度的关系 */
    'prop.nbv-derivative': {
      statement: {
        en:
        'Let $F \\in NBV$. Then $F\' \\in L^1(m)$, and\n\n' +
        '$$\\mu_F \\perp  m \\iff F\' = 0\\quad  \\text{a.e.}$$\n' +
        '$$\\mu_F \\ll  m \\iff F(x) = \\int_{-\\infty}^{x} F\'(t) dt$$',
        status: 'draft', basedOn: 'v0.9.0#2fff7b16', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#e730d43c', reviewed: null,
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
        status: 'draft', basedOn: 'v0.9.0#5d3aa74a', reviewed: null,
      },
      notes: {
        en:
        'Note that the hypothesis "$\\mathfrak{A}$ is a ring" cannot be dropped — a monotone ' +
        'class is in general not closed under finite unions, so being a monotone class by ' +
        'itself does not imply being a $\\sigma$-ring.\n\n' +
        'This theorem is the technical core of the monotone class theorem: it is precisely what ' +
        'lets one reduce "true for all $\\sigma$-algebras" to "first verify it on a ring, then ' +
        'pass to monotone limits".',
        status: 'draft', basedOn: 'v0.9.0#ce1b4b57', reviewed: null,
      },
    },
  },
};
