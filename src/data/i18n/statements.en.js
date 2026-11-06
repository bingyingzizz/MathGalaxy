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
        status: 'reviewed', basedOn: 'v0.9.3#88c083ff', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#4e157a1c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#1f75f342', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#3edf241b', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#31649b03', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'The open balls form a **base** for this topology. Every metric space is first ' +
        'countable and normal (hence Hausdorff).\n\n' +
        'The properties that follow fall into two classes: **compactness / closedness** depend ' +
        'only on the open sets and are **topological**; **completeness / total boundedness** ' +
        'use $d$ and are **metric**. This dividing line is the point of the whole cluster.\n\n' +
        '⚠ Completeness is **not** a topological property: $\\mathbb{R}$ and the open interval ' +
        '(0, 1) are homeomorphic, yet only the first is complete.' +
        '**Only one of the three axioms is "hard"** (they are usually listed side by side, but they carry very different weight):\n\n- **Non-degeneracy** $d(x,y)=0 \\iff x=y$: **read it as two halves.** "$x=y \\implies d(x,y)=0$" is nearly free (often built into how $d$ is given); "$d(x,y)=0 \\implies x=y$" is the half with content (weakening it gives a **pseudometric**).\n- **Symmetry**: **can be dropped** \\u2014 what is left is a **quasi-metric** (e.g. a "one-way shortest path"); the topology is still definable, but balls are asymmetric (the ball for $d$ and the ball for the reversed quasi-metric differ).\n- **Triangle inequality**: **the only indispensable one.** Without it the open balls no longer form a base for a topology \\u2014 the concrete failure is that an intersection stops containing a ball, which is precisely what the definition of "open" uses.\n\n\\u26A0 **"$d$ takes values in $[0,+\\infty)$ rather than $[0,+\\infty]$"**: allowing $+\\infty$ wrecks the notion of a connected component (the discrete metric $d \\equiv +\\infty$ misbehaves), so the standard definition takes finite values; if a map between metric spaces needs $+\\infty$, say so explicitly.',
        status: 'reviewed', basedOn: 'v0.9.3#8cd35552', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#4ba3632c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#bf2a2534', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#befbd619', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#c93883dc', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#70512d43', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        'only supplies the additive skeleton (zero object and direct sums).' +
        '**Which of the four is the real axiom, and which are its consequences** (they are usually listed side by side, but condition 4 is the weakest and behaves most like an axiom, while the first three each cost something):\n\n- (1) $\\implies$ (2): **one kernel-plus-cokernel diagram chase.** $i : N \\rightarrowtail M$ identifies $N$ with $\\ker(M \\to \\operatorname{coker} i)$; this uses only the preabelian fact that a monomorphism is its own kernel \\u2014 **no assumption beyond the additive structure**.\n- (2) $\\implies$ (1): **almost free in reverse** ($N$ being isomorphic to the kernel of a cokernel simply says $i$ is a kernel, i.e. regular).\n- (1) $\\iff$ (3): **this step needs kernels and cokernels** (i.e. preabelian). Factor $f = M \\to N$ as $M \\twoheadrightarrow \\operatorname{im} f \\rightarrowtail N$; "the epimorphism half is regular" is exactly (1). \\u26A0 Uniqueness holds **up to isomorphism** \\u2014 the word matters: the factorisation is not strict, since one image can have different representatives.\n- (1) $\\iff$ (4): **the most "algebraic" one** (Abel\'s original form): $\\ker(N \\to \\operatorname{coker} f) \\cong \\operatorname{coker}(\\ker f \\to M)$. It is equivalent to "the first isomorphism theorem holds in the category", and needs **kernels and cokernels to exist** plus **regularity of mono/epi**.\n\n\\u26A0 **Preabelian $\\ne$ abelian \\u2014 the point**: preabelian asks only that kernels and cokernels exist; any one of (1)\\u2013(4) can **fail**. The standard counterexamples are $\\mathbf{PreAb}$ (preabelian groups) or filtered vector spaces, where an epimorphism need not be a cokernel and a monomorphism need not be a kernel. So **abelian = preabelian + (any one of the equivalent conditions)**, and that last clause cannot be dropped.\n\n\\u26A0 **Two more traps**: in the definition of "additive category", "all direct sums" and "all finite products" agree only **given preadditivity** (in a general category finite products and finite coproducts need not coincide); and "all finite limits and colimits" is the phrasing attached to (2), which does **not** imply abelianness ($\\mathbf{Set}$ has finite limits and coproducts yet is far from abelian) \\u2014 the difference lies in disjointness, universality and effectiveness.',
        status: 'reviewed', basedOn: 'v0.9.3#e667995c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#174abecd', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#15d8cb14', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#0d2ec83c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#b6c3c8a9', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------- 8. 拓扑斯上的阿贝尔群是 Grothendieck 范畴 */
    'thm.topos-abelian-grothendieck': {
      statement: {
        en:
        'If $\\mathcal{T}$ is a topos, then the category $\\mathcal{T}(\\mathbf{Ab})$ of abelian ' +
        'sheaves on $\\mathcal{T}$ is a **Grothendieck category**: it has a small set of ' +
        'generators, has all colimits, and filtered colimits are exact.',
        status: 'reviewed', basedOn: 'v0.9.3#f13b85f8', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#07b048c8', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* --------------------------- 9. NBV 函数的导数与测度的关系 */
    'prop.nbv-derivative': {
      statement: {
        en:
        'Let $F \\in NBV$. Then $F\' \\in L^1(m)$, and\n\n' +
        '$$\\mu_F \\perp  m \\iff F\' = 0\\quad  \\text{a.e.}$$\n' +
        '$$\\mu_F \\ll  m \\iff F(x) = \\int_{-\\infty}^{x} F\'(t) dt$$',
        status: 'reviewed', basedOn: 'v0.9.3#2fff7b16', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#e730d43c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#5d3aa74a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Note that the hypothesis "$\\mathfrak{A}$ is a ring" cannot be dropped — a monotone ' +
        'class is in general not closed under finite unions, so being a monotone class by ' +
        'itself does not imply being a $\\sigma$-ring.\n\n' +
        'This theorem is the technical core of the monotone class theorem: it is precisely what ' +
        'lets one reduce "true for all $\\sigma$-algebras" to "first verify it on a ring, then ' +
        'pass to monotone limits".' +
        '**Which hypothesis each direction uses** (all three conditions are purely about set operations, but the ring hypothesis cannot be dropped):\n\n- (1) $\\implies$ (3): a countable disjoint union is a special case of a countable union \\u2014 free.\n- (1) $\\implies$ (2): increasing unions are immediate from the definition; for decreasing intersections take the first term minus the successive differences as a countable union (the whole set need not belong to the family).\n- (2) $\\implies$ (1): the ring gives finite unions, and the monotone class keeps their increasing limit inside the family.\n- (3) $\\implies$ (1): set $B_n = A_n \\setminus \\bigcup_{j<n} A_j$; the ring guarantees every $B_n$ lies in the family, and closure under disjoint unions finishes.\n- The ring hypothesis cannot be dropped: on a two-point set, the family of the two singletons is a monotone class, yet it does not contain their union.',
        status: 'reviewed', basedOn: 'v0.9.3#a3966daf', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#317a7f66', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'In form it predates Zorn\'s lemma (Hausdorff, 1914), and it is equivalent to it.\n\n' +
        'The existence of a maximal chain is exactly the rigorous version of the intuition ' +
        '"keep adding elements from below until you can add no more".',
        status: 'reviewed', basedOn: 'v0.9.3#53809b5a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#ad479275', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Intuition: cut a plane figure with a vertical (or horizontal) line; the segment you ' +
        'cut out is the section.\n\n' +
        'Sections are the language of Fubini\'s theorem: the double integral ' +
        '$\\iint f d(\\mu \\times \\nu)$ is "integrate along the sections first, then integrate ' +
        'the resulting function of the other variable".',
        status: 'reviewed', basedOn: 'v0.9.3#8645e773', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#f0e20930', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Zermelo introduced the axiom of choice explicitly in 1904 in order to prove that ' +
        'every set can be well-ordered; this is where AC first appears.\n\n' +
        'The well-ordering theorem immediately yields the **comparability theorem for ' +
        'cardinals**: any two sets have comparable cardinalities.\n\n' +
        'It cannot be proved in ZF; but ZF together with it proves AC, so the two are ' +
        'equivalent.',
        status: 'reviewed', basedOn: 'v0.9.3#bf8c5d7a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ---------------------------------------------------- 基数可比定理 */
    'thm.cardinal-comparable': {
      statement: {
        en:
        'Under the **axiom of choice**: for any two sets $A$ and $B$ we have ' +
        '$\\#A \\le \\#B$ or $\\#B \\le \\#A$.\n\n' +
        'That is, any two cardinals are comparable.',
        status: 'reviewed', basedOn: 'v0.9.3#ffeadee2', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#90e06db8', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------------ 全忠实与单位 */
    'prop.adjoint-full-faithful': {
      statement: {
        en:
        'Let $F \\dashv G$ with unit $\\eta$ and counit $\\varepsilon$. Then $F$ is ' +
        '**fully faithful** $\\iff$ $\\eta$ is an isomorphism; $G$ is **fully faithful** ' +
        '$\\iff$ $\\varepsilon$ is an isomorphism.',
        status: 'reviewed', basedOn: 'v0.9.3#315d7da7', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#9b807211', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ================================================ 批次 2b（枢纽榜第 11–20 名剩下的 5 条） */

    /* -------------------------------------------------------- 单调类定理 */
    'thm.monotone-class': {
      statement: {
        en:
        'Let $\\mathcal{E} \\subseteq \\mathcal{P}(X)$ with $\\mathcal{E} \\ne \\emptyset$. Then\n\n' +
        '$$\\mathcal{M}(\\mathcal{E}) = \\mathfrak{m}(\\mathcal{E}) \\iff ' +
        '\\forall A \\in \\mathcal{E} : A^c \\in \\mathfrak{m}(\\mathcal{E})\\ \\wedge\\ ' +
        '\\forall A, B \\in \\mathcal{E} : A \\cup B \\in \\mathfrak{m}(\\mathcal{E})$$',
        status: 'reviewed', basedOn: 'v0.9.3#48f20867', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        '**This is the combined "standard + strengthened" version.**\n\n' +
        '**Standard version** (Halmos §6 / Folland 2.37): if $\\mathcal{A}$ is an **algebra** ' +
        'then $\\mathfrak{m}(\\mathcal{A}) = \\mathcal{M}(\\mathcal{A})$.\n\n' +
        'What is stated above is the **strengthened version**: "$\\mathcal{E}$ is an algebra" ' +
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
        status: 'reviewed', basedOn: 'v0.9.3#42f670ae', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#2db4532b', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#bd705c8a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#aca983a4', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#34fccb9f', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#5c26a908', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#fe258a30', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#15b421bb', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Read the two together: **colimits and right adjoints are special cases of Kan ' +
        'extensions**. The Kan extension is the unifying exit of this whole cluster — the ' +
        'definitions scattered earlier (limit, adjunction, reflection) each fall into place ' +
        'inside it.',
        status: 'reviewed', basedOn: 'v0.9.3#77203f35', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ================================================ 批次 3a（枢纽榜第 21–30 名，前四条） */

    /* -------------------------------------------------- 紧的三个等价刻画 */
    'thm.metric-compact-equiv': {
      statement: {
        en:
        "Let $X$ be a metric space with metric $d$. Then the following three conditions are **equivalent**:\n\n" +
        "- (a) $X$ is **compact**: every open cover has a finite subcover;\n" +
        "- (b) $X$ is **sequentially compact**: every sequence has a subsequence converging in $X$;\n" +
        "- (c) $X$ is **complete and totally bounded**.\n\n" +
        "That is, $X$ compact $\\iff$ $X$ sequentially compact $\\iff$ $X$ complete $+$ totally bounded." +
        'That is, compactness, sequential compactness, and completeness together with total boundedness are all equivalent.',
        status: 'reviewed', basedOn: 'v0.9.3#b828d710', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        'to metric spaces.' +
        '**What each direction uses, and whether any extra hypothesis is needed** (this list *is* the content of the equivalence):\n\n- (a) $\\implies$ (b): **no hypothesis needed.** Pass to a finite subcover and pick, by pigeonhole, a subsequence lying inside one member of the cover (Lebesgue number, or a direct induction), then take a convergent subsequence inside that member.\n- (a) $\\implies$ (c), "complete": **no extra hypothesis.** A Cauchy sequence with a convergent subsequence converges, and to the same point.\n- (a) $\\implies$ (c), "totally bounded": **no extra hypothesis.** Cover by all balls of radius $\\varepsilon$; a finite subcover is a finite $\\varepsilon$-net.\n- (b) $\\implies$ (a): **uses only total boundedness, not the axiom of choice** (the "bad ball" argument: if no finite cover existed, one would build recursively a sequence with pairwise distances $\\ge \\varepsilon$, which has no convergent subsequence).\n- (b) $\\implies$ (c), "complete": **no extra hypothesis** (the limit of the convergent subsequence is the limit of the Cauchy sequence).\n- (b) $\\implies$ (c), "totally bounded": **this step really uses countable choice (DC)** \\u2014 the only place in the whole proof. For each $n$ one picks a $1/n$-ball containing infinitely many terms, and shrinks layer by layer.\n- (c) $\\implies$ (b): **no choice needed** (diagonal argument: using $1/n$-nets, keep at each layer a ball with infinitely many terms, take the diagonal subsequence \\u2014 it is Cauchy \\u2014 and converge by completeness).',
        status: 'reviewed', basedOn: 'v0.9.3#0c5aa523', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#f6d84124', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#bdd6e136', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#f759aee2', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        status: 'reviewed', basedOn: 'v0.9.3#94b15f1c', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------------------ 可缩族 */
    'def.shrinks-nicely': {
      statement: {
        en:
        'A family $\\{E_r\\}_{r > 0}$ of Borel subsets of $\\mathbb{R}^n$ is said to ' +
        '**shrink nicely to $x$** iff\n\n' +
        '$\\cdot$ $E_r \\subseteq B(x, r)$ holds for every $r$;\n' +
        '$\\cdot$ there is $\\alpha > 0$ with ' +
        '$m(E_r) > \\alpha\\cdot m(B(x, r))$ for every $r$.',
        status: 'reviewed', basedOn: 'v0.9.3#def659f2', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'What the two conditions say: **it fits inside** ($E_r$ lies in the ball) and **it ' +
        'is not too flat** (its volume is at least $\\alpha$ times that of the ball).\n\n' +
        'Typical examples: take $E_r = B(x, r)$ itself ($\\alpha = 1$); or take $E_r$ to be ' +
        'a fixed shape inside the ball (a cube, say), rescaled proportionally.\n\n' +
        'Counterexample: let $E_r$ be a long thin sliver inside the ball — the volume ratio ' +
        'can tend to 0, and such a family does not shrink nicely to $x$.\n\n' +
        '⭐ The notion was introduced so that differentiation theorems **do not depend on ' +
        'the shape of the ball**: as long as it is not flat, the conclusion stands.',
        status: 'reviewed', basedOn: 'v0.9.3#cd8d3dd5', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ================================================ 批次 3b（枢纽榜第 21–30 名，最后五条） */

    /* ------------------------------------------------------------ 外测度 */
    'def.outer-measure': {
      statement: {
        en:
        'Let $X$ be a non-empty set. A function ' +
        '$\\mu^* : \\mathcal{P}(X) \\to [0, +\\infty]$ is an **outer measure** iff\n\n' +
        '- $\\mu^*(\\emptyset) = 0$\n' +
        '- **Monotone**: $A \\subseteq B \\implies \\mu^*(A) \\le \\mu^*(B)$\n' +
        '- **Countably subadditive**: ' +
        '$\\mu^*( \\bigcup_{j=1}^{\\infty} A_j ) \\le \\sum_{j=1}^{\\infty} \\mu^*(A_j)$',
        status: 'reviewed', basedOn: 'v0.9.3#24d3359e', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'An outer measure is defined on **all** subsets ($\\mathcal{P}(X)$, not on some ' +
        '$\\sigma$-algebra); the price is that it only has **sub**additivity.\n\n' +
        'So an outer measure is not a measure — it is too large even to be additive on ' +
        '$\\mathcal{P}(X)$. Carathéodory\'s idea is to single out the sets that "behave ' +
        'well" (the next definition); on those the outer measure does become a genuine ' +
        'measure.\n\n' +
        'What Lebesgue first constructed was an outer measure: ' +
        '$\\mu^{*}(A) = \\inf\\{ \\sum (b_{n} - a_{n}) : A \\subseteq \\bigcup (a_{n}, b_{n}) \\}$.' +
        '**Which of the three conditions is "hard"** (the three are asymmetric \\u2014 one is normalisation, one is almost free, one is a real condition):\n\n- $\\mu^{*}(\\emptyset) = 0$: **normalisation**, there only so that $0 \\le \\mu^{*}$ below is meaningful (otherwise the constant $+\\infty$ would satisfy the other two).\n- **Monotonicity**: **almost free**, but deriving it uses countable subadditivity: $B = A \\cup (B \\setminus A)$ $\\implies$ $\\mu^{*}(B) \\le \\mu^{*}(A) + \\mu^{*}(B\\setminus A)$; monotonicity is usually listed as an axiom to save that step, and in a concrete construction (Carath\\u00E9odory) it is verified directly.\n- **Countable subadditivity**: **this is the real condition**, the only one with content \\u2014 it ties "the size of one set" to "countable operations". \\u26A0 Note that it is an **inequality**: an outer measure is **not** additive (additivity on disjoint unions is what makes it a measure, and that is an extra conclusion on Carath\\u00E9odory-measurable sets).\n\n**Two distinctions that must stay separate**:\n\n- **An outer measure is defined on $\\mathcal{P}(X)$** (all subsets), whereas a measure (`def.measure`) is defined only on a $\\sigma$-algebra \\u2014 that is the whole point of an outer measure as a **construction device**: first put a crude "size" on all subsets, then single out the subsets on which it is additive.\n- **Monotone plus countably subadditive does not say "the value on a countable union is the limit"**: on increasing unions an outer measure only guarantees $\\mu^{*}(\\bigcup A_{n}) \\le \\lim \\mu^{*}(A_{n})$; equality needs continuity from below, hence measurability \\u2014 exactly what the Carath\\u00E9odory condition supplies.\n\n\\u26A0 Notation: the star in $\\mu^{*}$ means "defined on $\\mathcal{P}(X)$", not "dual of something". Some books write $m^{*}$ or $\\nu^{*}$.',
        status: 'reviewed', basedOn: 'v0.9.3#63a085ee', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------------- ℝ 不可数 */
    'thm.real-uncountable': {
      statement: {
        en:
        '**The real line $\\mathbb{R}$ is uncountable**: there is no surjection from ' +
        '$\\mathbb{N}$ onto $\\mathbb{R}$, that is, $\\mathbb{R}$ cannot be arranged as a ' +
        'sequence.\n\n' +
        'A stronger conclusion:\n\n' +
        '$$\\#\\mathbb{R} = \\#\\mathcal{P}(\\mathbb{N}) = 2^{\\aleph_0} > \\aleph_0$$',
        status: 'reviewed', basedOn: 'v0.9.3#75028b5a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        '⭐ The proof goes by **nested closed intervals + diagonalisation** (see the edge): ' +
        'assume $\\mathbb{R}$ can be arranged as $x_1, x_2, \\ldots$, then bisect to build a ' +
        'nested sequence of closed intervals, ruling out the $x_n$ one by one, and use ' +
        '**completeness** to extract their unique common point — which differs from every ' +
        '$x_n$.\n\n' +
        '⚠ The whole proof uses **only the completeness of $\\mathbb{R}$** (the ' +
        'least-upper-bound principle); cardinal theory is not needed. The half saying ' +
        '$\\#\\mathbb{R} = 2^{\\aleph_0}$ matches binary expansions against ' +
        '$\\mathcal{P}(\\mathbb{N})$ and then quotes Cantor\'s theorem.\n\n' +
        '**The most counter-intuitive point of this theorem**: $\\mathbb{Q}$ and ' +
        '$\\mathbb{R}$ are both dense and each can be approximated by the other, yet ' +
        '$\\mathbb{Q}$ is countable (it can be arranged as a sequence) while ' +
        '$\\mathbb{R}$ is not. **"Dense" and "equally many" are two different things** — ' +
        'and this is precisely why analysis has to be done over the reals rather than over ' +
        'the rationals.',
        status: 'reviewed', basedOn: 'v0.9.3#f1e86a60', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ---------------------------------------------------- 紧 Haus 是反射子范畴 */
    'prop.chaus-reflective': {
      statement: {
        en:
        '$\\mathbf{CHaus}$ is a **reflective subcategory** of $\\mathbf{Top}$; the ' +
        'reflection is called the **Stone–Čech compactification**:\n\n' +
        '$$\\beta : \\mathbf{Top} \\longrightarrow \\mathbf{CHaus}, \\qquad ' +
        'X \\mapsto \\beta X$$\n\n' +
        'that is, for every $X \\in \\mathbf{Top}$ and every compact Hausdorff space $K$,\n\n' +
        '$$\\operatorname{Hom}_{\\mathbf{CHaus}}\\bigl(\\beta X,\\ K\\bigr) \\;\\cong\\; ' +
        '\\operatorname{Hom}_{\\mathbf{Top}}\\bigl(X,\\ K\\bigr)$$\n\n' +
        'and the inclusion $X \\to \\beta X$ is an isomorphism whenever $X$ itself is ' +
        'compact Hausdorff.',
        status: 'reviewed', basedOn: 'v0.9.3#2b01d3a4', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'Construction: send $X$ into the Tychonoff cube\n\n' +
        '$$e_{X} : X \\longrightarrow [0,1]^{C(X,[0,1])}, \\qquad x \\mapsto (f(x))_{f}$$\n\n' +
        'and then take the closure $\\beta X := \\overline{e_{X}(X)}$. The cube is compact ' +
        'Hausdorff, hence so is every closed subset of it.\n\n' +
        '⭐ **$e_{X}$ is injective $\\iff$ $X$ is a Tychonoff ($T_{3.5}$) space** — that ' +
        'is, there are enough continuous functions to separate distinct points. So for a ' +
        'general topological space, $\\beta X$ is the compactification obtained after ' +
        'collecting all the information that continuous functions can see.\n\n' +
        'Corollary: **any limit of compact Hausdorff spaces is again compact Hausdorff**. ' +
        'This is what the general statement "a reflective subcategory is closed under ' +
        'limits" looks like here — from now on, taking limits in $\\mathbf{CHaus}$ no ' +
        'longer requires re-checking compactness and Hausdorffness.',
        status: 'reviewed', basedOn: 'v0.9.3#5e7e6161', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------------------ 复测度 */
    'def.complex-measure': {
      statement: {
        en:
        'A **complex measure** on a measurable space $(X, \\mathcal{M})$ is a map\n\n' +
        '$$\\nu : \\mathcal{M} \\to \\mathbb{C}$$\n\n' +
        'such that\n\n' +
        '$$\\nu(\\emptyset) = 0, $$\n\n' +
        'and for pairwise disjoint $\\{E_j\\} \\subseteq \\mathcal{M}$:\n\n' +
        '$$\\nu( \\bigsqcup_j E_j ) = \\sum_j \\nu(E_j)$$\n\n' +
        '(the series on the right converges absolutely).',
        status: 'reviewed', basedOn: 'v0.9.3#bde1a964', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        '⚠ Compared with a signed measure, a complex measure is **automatically finite** ' +
        '(its values lie in $\\mathbb{C}$, no $\\pm \\infty$ is involved), and the series in ' +
        'countable additivity **converges absolutely automatically**.\n\n' +
        'So in the world of complex measures the headaches of "finiteness" and ' +
        '"rearrangement" disappear entirely — at the cost of no longer having examples ' +
        'with "infinite mass".',
        status: 'reviewed', basedOn: 'v0.9.3#e5f47458', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ------------------------------------------------------ 本性上界与 L^∞ */
    'def.essential-sup': {
      statement: {
        en:
        'Definition\n\n' +
        '$$\\|f\\|_\\infty := \\inf \\{\\, a \\ge 0 : \\mu(\\{\\, |f| > a \\,\\}) = 0 \\,\\}$$\n\n' +
        '(After ignoring completely the values of $f$ on null sets, this is its "true" ' +
        'upper bound.) This infimum **is attained**: for $a = \\|f\\|_\\infty$ itself we ' +
        'have $\\mu(\\{|f| > a\\}) = 0$.\n\n' +
        'For a **measurable** function $f : X \\to \\mathbb{C}$ (measurability is defined ' +
        'at "measurable function") put\n\n' +
        '$$\nL^\\infty(X, \\mathcal{M}, \\mu) := \\{\\, f : X \\to \\mathbb{C} : ' +
        '\\|f\\|_\\infty < \\infty \\,\\}\n$$',
        status: 'reviewed', basedOn: 'v0.9.3#fd63d442', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'An equivalent form: $\\|f\\|_\\infty \\le M \\iff |f(x)| \\le M$ holds for a.e. ' +
        '$x$.\n\n' +
        'What the word "essential" means: **bad values on null sets simply do not count**. ' +
        'For instance, if $f = 0$ a.e. but $f$ takes the value $+\\infty$ on some null set, ' +
        'we still have $\\|f\\|_\\infty = 0$.\n\n' +
        '⚠ $\\|f\\|_\\infty$ differs from "$\\sup |f|$": the latter can become large ' +
        'because of a single point on a null set.',
        status: 'reviewed', basedOn: 'v0.9.3#667e877a', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
    },

    /* ================================================ 2026-11-01 · 微分几何补洞那 7 个新节点
       ⭐ 逐句对译中文（`src/data/packs/150-diffgeom-fiber.js`），**公式一字不改**：
          中文里是块级 $$…$$ 的，这里也必须块级，且 tex 逐字相同（构建有公式不变量硬断言）。
       ⚠️ status 一律 'draft'（我没有审校权）；basedOn 的指纹见 tools/i18n-status.mjs。
       📌 只译了 statement；notes 留待下一批。 */

    'def.local-trivialization': {
      statement: {
        en:
        '**What it does**: this is the whole reason a bundle is called a bundle — locally it can ' +
        'always be flattened into a product. The clause "every point has a neighbourhood such ' +
        'that…" in the definitions of fiber bundles, vector bundles, principal bundles and ' +
        'covering spaces is exactly this statement.\n\n' +
        'Let $\\pi : E\\to B$ be a continuous surjection, $F$ a topological space and ' +
        '$U\\subseteq B$ an open set. A continuous map\n\n' +
        '$$\\Phi : \\pi^{-1}(U)\\longrightarrow U\\times F$$\n\n' +
        'is called a **local trivialization** of $\\pi$ over $U$ if $\\Phi$ is a homeomorphism ' +
        'and commutes with the projection:\n\n' +
        '$$\\operatorname{pr}_{1}\\circ\\Phi = \\pi .$$\n\n' +
        'Thus $\\Phi$ flattens the piece of the bundle over $U$ into the **trivial product** ' +
        '$U\\times F$: each fiber $E_{b} := \\pi^{-1}(b)$ is sent to $\\{b\\}\\times F$, and is ' +
        'therefore homeomorphic to $F$. If every point of $B$ has such an open neighbourhood ' +
        'with a local trivialization, $\\pi$ is called **locally trivial**.\n\n' +
        '**Smooth case**: when $E, B, F$ are smooth manifolds and $\\pi$ is smooth, one replaces ' +
        '"homeomorphism" by "**diffeomorphism**" in the definition; that is the local ' +
        'trivialization of a smooth bundle — without it even the tangent bundle would not be a ' +
        'smooth bundle.',
        status: 'reviewed', basedOn: 'v0.9.3#0cf9dc1d', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.cotangent-bundle': {
      statement: {
        en:
        '**What it does**: the tangent space carries "where can I go", the cotangent space carries ' +
        '"how do I measure". Stacking the dual spaces over all points gives the home of ' +
        '1-forms — a differential form is not a formula out of nowhere, it is a section of this ' +
        'bundle.\n\n' +
        'Let $M$ be a smooth $n$-manifold. The **cotangent space** at $p$ is the dual space\n\n' +
        '$$T_{p}^{\\ast}M := (T_{p}M)^{\\ast} = \\operatorname{Hom}_{\\mathbb{R}}\\bigl(T_{p}M,\\mathbb{R}\\bigr),$$\n\n' +
        'whose elements are called **covectors**, or **1-forms at $p$** (also Pfaffian forms). ' +
        'The **cotangent bundle** stacks them over the base points:\n\n' +
        '$$T^{\\ast}M := \\bigsqcup_{p\\in M}T_{p}^{\\ast}M,$$\n\n' +
        'with projection $\\pi : T^{\\ast}M\\to M$ sending $\\alpha\\in T_{p}^{\\ast}M$ to ' +
        '$\\pi(\\alpha) := p$.\n\n' +
        '**Smooth structure**: on a chart $(U,\\varphi)$ the differentials ' +
        '$\\mathrm{d}x^{i}\\big|_{p}$ of the coordinate functions $x^{1},\\ldots,x^{n}$ form a ' +
        'basis of $T_{p}^{\\ast}M$ (dual to $\\partial/\\partial x^{i}\\big|_{p}$), so\n\n' +
        '$$\\Phi : \\pi^{-1}(U)\\longrightarrow\\varphi(U)\\times\\mathbb{R}^{n}$$\n\n' +
        '$$\\sum_{i=1}^{n}a_{i}\\,\\mathrm{d}x^{i}\\big|_{p}\\longmapsto\\bigl(\\varphi(p),\\,a_{1},\\ldots,a_{n}\\bigr),$$\n\n' +
        'is a bijection. Taking it as a chart makes $T^{\\ast}M$ a smooth $2n$-manifold, and ' +
        '$\\pi$ a **smooth vector bundle of rank $n$** over $M$: the local trivializations are ' +
        'the maps $\\Phi$ above, and the vector-space structure on the fibers comes from the dual ' +
        'space.',
        status: 'reviewed', basedOn: 'v0.9.3#2b81febc', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.fiber-bundle': {
      statement: {
        en:
        '**What it says**: a vector bundle only requires the fiber to be a vector space. Replacing ' +
        'the vector space by an **arbitrary manifold $F$** gives a fiber bundle — covering ' +
        'spaces, principal bundles and vector bundles all fall under this one definition.\n\n' +
        'Let $E, B, F$ be smooth manifolds and $\\pi : E\\to B$ a smooth surjection. One calls ' +
        '$\\pi$ (together with $E$) a **fiber bundle with fiber $F$ and base $B$** if every point ' +
        '$b\\in B$ has an open neighbourhood $U$ and a diffeomorphism\n\n' +
        '$$\\Phi : \\pi^{-1}(U)\\longrightarrow U\\times F,\\qquad \\operatorname{pr}_{1}\\circ\\Phi = \\pi ,$$\n\n' +
        'that is, $\\Phi$ commutes with the projection. Such a $\\Phi$ is called a **local ' +
        'trivialization**, $E_{b} := \\pi^{-1}(b)$ the **fiber** over $b$, and $E$ the **total ' +
        'space**.\n\n' +
        '**Transition functions**: two trivializations over the same open cover necessarily ' +
        'differ over their overlap by a fiberwise self-homeomorphism\n\n' +
        '$$\\Phi_{\\alpha}\\circ\\Phi_{\\beta}^{-1}\\,(b, y) = \\bigl(b,\\ g_{\\alpha\\beta}(b)\\,y\\bigr),$$\n\n' +
        'where $g_{\\alpha\\beta} : U_{\\alpha}\\cap U_{\\beta}\\to\\operatorname{Diff}(F)$ is the ' +
        '**transition function**. They satisfy the cocycle conditions ' +
        '$g_{\\alpha\\alpha} = \\operatorname{id}$ and ' +
        '$g_{\\alpha\\beta}\\,g_{\\beta\\gamma}\\,g_{\\gamma\\alpha} = \\operatorname{id}$ (on ' +
        'overlaps), and they measure how twisted the bundle is.\n\n' +
        'If a Lie group $G$ acts on $F$ and the trivializations can always be chosen so that all ' +
        '$g_{\\alpha\\beta}$ take values in $G$, one says the bundle has **structure group** $G$.',
        status: 'reviewed', basedOn: 'v0.9.3#32b532b4', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.principal-bundle': {
      statement: {
        en:
        '**What it says**: the most self-referential class of fiber bundles — the fiber is not an ' +
        'arbitrary manifold but the structure group $G$ itself, and $G$ acts freely on the bundle ' +
        'from the right. Every vector bundle can be built from a principal bundle (by taking an ' +
        'associated bundle).\n\n' +
        'Let $G$ be a Lie group, $P, B$ smooth manifolds and $\\pi : P\\to B$ smooth. A ' +
        '**principal $G$-bundle** over $P$ is the fiber bundle $\\pi$ together with a **right ' +
        'action** of $G$ on $P$\n\n' +
        '$$P\\times G\\longrightarrow P,\\qquad (u,g)\\longmapsto u\\cdot g ,$$\n\n' +
        'such that\n\n' +
        '1. **fibers are preserved**: $\\pi(u\\cdot g) = \\pi(u)$;\n' +
        '2. **the action is free and transitive on each fiber**: $u\\cdot g = u \\iff g = e$, and ' +
        'any two points of the same fiber $P_{b}$ differ by a right multiplication (so $P_{b}$ ' +
        'is homeomorphic to $G$);\n' +
        '3. **it is locally trivial and $G$-equivariant**: every point has a neighbourhood $U$ ' +
        'and a diffeomorphism $\\Phi : \\pi^{-1}(U)\\to U\\times G$, written ' +
        '$\\Phi(u) = \\bigl(\\pi(u),\\varphi(u)\\bigr)$, satisfying\n\n' +
        '$$\\Phi(u\\cdot g) = \\bigl(\\pi(u),\\ \\varphi(u)\\,g\\bigr).$$\n\n' +
        'The fiber is then $G$ (right multiplication $g\\mapsto hg$ carries it into itself), and ' +
        'so is the structure group $G$. The **frame bundle** gives the most used examples: for a ' +
        'vector bundle $E\\to B$ of rank $k$, the bundle of frames is a principal ' +
        '$\\operatorname{GL}(k,\\mathbb{R})$-bundle — this is the bridge between vector bundles ' +
        'and principal bundles.',
        status: 'reviewed', basedOn: 'v0.9.3#2fbdf8a3', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.form-on-manifold': {
      statement: {
        en:
        '**What it does**: it replaces "the $k$-form written in coordinates" by a **chart-free** ' +
        'description. Once that is done, a form really is an object on the manifold, and not ' +
        '"an expression inside some chart".\n\n' +
        'Let $M$ be a smooth $n$-manifold. A **differential $k$-form** $\\omega$ on $M$ assigns ' +
        'to each point $p\\in M$ an **alternating $k$-linear form**\n\n' +
        '$$\\omega_{p} : T_{p}M\\times\\cdots\\times T_{p}M\\longrightarrow\\mathbb{R},$$\n\n' +
        'and it **depends smoothly**: for every chart $(U,x)$ the function ' +
        '$p\\mapsto\\omega_{p}\\bigl(\\partial_{i_{1}}\\big|_{p},\\ldots,\\partial_{i_{k}}\\big|_{p}\\bigr)$ ' +
        'is smooth on $U$. The set of all $k$-forms on $M$ is denoted $\\Omega^{k}(M)$.\n\n' +
        '**Smoothness is equivalent to smooth coefficients**: on $(U,x)$ the form $\\omega$ is ' +
        'uniquely written as\n\n' +
        '$$\\omega\\big|_{U} = \\sum_{I}a_{I}\\,\\mathrm{d}x^{I},\\qquad \\mathrm{d}x^{I} := \\mathrm{d}x^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{i_{k}},$$\n\n' +
        'where $I$ runs over all $i_{1}<\\cdots<i_{k}$ and the coefficients are given by ' +
        '$a_{I} := \\omega\\bigl(\\partial_{i_{1}},\\ldots,\\partial_{i_{k}}\\bigr)$. On the overlap ' +
        'of two charts the two sets of coefficients are converted into one another by the ' +
        '$k$-minors of the Jacobian matrix — and minors are smooth, so "the coefficients are ' +
        'smooth" does not depend on the chart chosen. This step is what makes the definition ' +
        'work at all: **it welds a local expression into a global object**.\n\n' +
        '**Conventions**: $\\Omega^{0}(M) := C^{\\infty}(M)$; $\\Omega^{1}(M)$ consists of the ' +
        '1-forms; and $\\Omega^{k}(M) = 0$ for $k > n$ (there is no nonzero alternating ' +
        '$k$-linear form on an $n$-dimensional space). The direct sum ' +
        '$\\Omega^{\\bullet}(M) = \\bigoplus_{k\\ge 0}\\Omega^{k}(M)$, with the wedge product, is ' +
        'a graded algebra.',
        status: 'reviewed', basedOn: 'v0.9.3#5038a87a', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'prop.exterior-derivative-manifold': {
      statement: {
        en:
        '**What it does**: the operator $\\mathrm{d}$ on $\\mathbb{R}^{n}$ is written by a ' +
        'coordinate formula; carried to a manifold it must answer one question — is ' +
        '$\\mathrm{d}\\omega$ computed in one chart the same object as in another? This ' +
        'proposition settles it, and then $\\mathrm{d}$ can be written globally on a manifold.\n\n' +
        'Let $M$ be a smooth manifold. There is a **unique** family of operators ' +
        '$\\mathrm{d} : \\Omega^{k}(M)\\to\\Omega^{k+1}(M)$ for $k\\ge 0$ such that\n\n' +
        '1. on functions $\\mathrm{d}f$ is the differential of $f$: ' +
        '$\\mathrm{d}f_{p}(v) = v(f)$ for $v\\in T_{p}M$;\n' +
        '2. $\\mathrm{d}$ is $\\mathbb{R}$-linear;\n' +
        '3. **anti-derivation**: for a $k$-form $\\omega$, ' +
        '$\\mathrm{d}(\\omega\\wedge\\tau) = \\mathrm{d}\\omega\\wedge\\tau + (-1)^{k}\\omega\\wedge\\mathrm{d}\\tau$;\n' +
        '4. $\\mathrm{d}^{2} = 0$.\n\n' +
        'Moreover, in any chart $(U,x)$ it equals the coordinate formula\n\n' +
        '$$\\mathrm{d}\\Bigl(\\sum_{I}a_{I}\\,\\mathrm{d}x^{I}\\Bigr) = \\sum_{I}\\mathrm{d}a_{I}\\wedge\\mathrm{d}x^{I},$$\n\n' +
        'where $\\mathrm{d}x^{I} := \\mathrm{d}x^{i_{1}}\\wedge\\cdots\\wedge\\mathrm{d}x^{i_{k}}$ ' +
        'and $\\mathrm{d}a_{I}$ is the differential of the function $a_{I}$. Hence ' +
        '"$\\mathrm{d}$ does not depend on the chart" is not an extra assumption, but the ' +
        'conclusion of this proposition.',
        status: 'reviewed', basedOn: 'v0.9.3#3a0efaf9', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'prop.pullback-form-manifold': {
      statement: {
        en:
        '**What it does**: it carries a $k$-form back along a smooth map **between manifolds**. ' +
        'The version for open subsets of $\\mathbb{R}^{n}$ is only its local appearance.\n\n' +
        'Let $F : M\\to N$ be a smooth map and $\\omega\\in\\Omega^{k}(N)$. The **pullback** ' +
        '$F^{\\ast}\\omega\\in\\Omega^{k}(M)$ is defined pointwise by\n\n' +
        '$$(F^{\\ast}\\omega)_{p}(v_{1},\\ldots,v_{k}) := \\omega_{F(p)}\\bigl(\\mathrm{d}F_{p}v_{1},\\ldots,\\mathrm{d}F_{p}v_{k}\\bigr)$$\n\n' +
        'for $v_{i}\\in T_{p}M$. Then $F^{\\ast}\\omega$ is smooth, and\n\n' +
        '1. $F^{\\ast}$ is $\\mathbb{R}$-linear; on functions $F^{\\ast}f = f\\circ F$;\n' +
        '2. **it preserves the wedge product**: ' +
        '$F^{\\ast}(\\omega\\wedge\\eta) = F^{\\ast}\\omega\\wedge F^{\\ast}\\eta$;\n' +
        '3. **it commutes with $\\mathrm{d}$**: ' +
        '$\\mathrm{d}(F^{\\ast}\\omega) = F^{\\ast}(\\mathrm{d}\\omega)$;\n' +
        '4. **it preserves composition**: $(G\\circ F)^{\\ast} = F^{\\ast}\\circ G^{\\ast}$ and ' +
        '$(\\operatorname{id})^{\\ast} = \\operatorname{id}$.\n\n' +
        'Thus $F^{\\ast} : \\Omega^{\\bullet}(N)\\to\\Omega^{\\bullet}(M)$ is a homomorphism of ' +
        '**differential graded algebras**.',
        status: 'reviewed', basedOn: 'v0.9.3#c76f8521', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    /* ================================================ 2026-11-01 · ZFC 九条公理（图的入口层）
       ⭐ 逐句对译中文，公式**一字不改**；status 直接 'reviewed'
          （作者 2026-11-01 授权：「draft 都通过，以后不用给我审校，直接提交就好」）。
       📌 只译 statement；notes 留待下一批。 */

    'ax.ext': {
      statement: {
        en:
        'A set is determined uniquely by its elements:\n\n' +
        '$$\\forall A \\forall B [ \\forall x ( x \\in A \\leftrightarrow  x \\in B ) \\to A = B ]$$\n\n' +
        'The converse direction ($A = B \\to$ the elements are exactly the same) holds automatically ' +
        'in first-order logic with equality, which is why the axiom is often written with ' +
        '$\\leftrightarrow$. It guarantees that describing a set by a condition determines it ' +
        'uniquely, so a notation such as $\\{ x \\in A : \\varphi (x) \\}$ is never ambiguous.',
        status: 'reviewed', basedOn: 'v0.9.3#db41f727', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.sep': {
      statement: {
        en:
        'For every formula $\\varphi (x, p)$ (in which $B$ does not occur), the following is an ' +
        'axiom:\n\n' +
        '$$\\forall p \\forall A \\exists B \\forall x [ x \\in B \\leftrightarrow  ( x \\in A \\wedge  \\varphi(x, p) ) ]$$\n\n' +
        'By extensionality such a $B$ is unique, and one writes ' +
        '$B = \\{ x \\in A : \\varphi (x, p) \\}$. It is commonly called the "subset axiom".',
        status: 'reviewed', basedOn: 'v0.9.3#e310c0cf', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.pair': {
      statement: {
        en:
        'Given any two sets, one may pack them into "the set whose only elements are these two":\n\n' +
        '$$\\forall a \\forall b \\exists A \\forall x [ x \\in A \\leftrightarrow  ( x = a \\vee  x = b ) ]$$\n\n' +
        'By extensionality $A$ is unique; it is written { a, b } (the unordered pair). Taking ' +
        '$a = b$ gives the singleton { a }.',
        status: 'reviewed', basedOn: 'v0.9.3#9aad67c7', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.union': {
      statement: {
        en:
        'The elements of all members of a family of sets again form a set:\n\n' +
        '$$\\forall F \\exists A \\forall x [ x \\in A \\leftrightarrow  \\exists Y ( Y \\in F \\wedge  x \\in Y ) ]$$\n\n' +
        'It is written $\\bigcup F$. Together with the pairing axiom it yields the binary union ' +
        '$a \\cup b = \\bigcup \\{ a, b \\}$.',
        status: 'reviewed', basedOn: 'v0.9.3#ae9c0db1', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.power': {
      statement: {
        en:
        'The subsets of a set form a set:\n\n' +
        '$$\\forall A \\exists P \\forall x [ x \\in P \\leftrightarrow  x \\subseteq A ]$$\n\n' +
        'It is written $\\mathcal{P}(A)$ (or P(A)). It turns "all subsets of $A$" itself into a set ' +
        '— the power set is the basic device for building larger sets.',
        status: 'reviewed', basedOn: 'v0.9.3#9417a12a', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.inf': {
      statement: {
        en:
        'There exists an "inductive set" — a set containing $\\emptyset$ and closed under the ' +
        'successor operation:\n\n' +
        '$$\\exists I [ \\emptyset \\in I \\wedge  \\forall x ( x \\in I \\to x \\cup \\{ x \\} \\in I ) ]$$\n\n' +
        'The clause $\\emptyset \\in I$ **cannot be dropped**: $I = \\omega \\setminus \\{0\\}$ is non-empty ' +
        'and closed under successor ($x \\ne 0 \\implies S(x) \\ne 0$), yet it does not contain ' +
        '$\\emptyset$ — "non-empty + closed under successor" does not force $\\emptyset \\in I$. ' +
        '($\\emptyset$ is a primitive object, see "the empty set"). This axiom asserts ' +
        'the existence of an infinite set, and is the only source ' +
        'from which the set of natural numbers $\\omega$ is built.',
        status: 'reviewed', basedOn: 'v0.9.3#ccdf2115', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.repl': {
      statement: {
        en:
        'If a formula defines a "functional relation", the image of any set is again a set. For ' +
        'every formula $\\varphi (x, y, p)$ (in which $B$ does not occur):\n\n' +
        '$$\\forall p [ \\forall x\\forall y\\forall z ( \\varphi(x,y,p) \\wedge  \\varphi(x,z,p) \\to y = z ) \\to \\forall A \\exists B \\forall y ( y \\in B \\leftrightarrow  \\exists x \\in A, \\varphi(x,y,p) ) ]$$\n\n' +
        'It guarantees that "replacement" never leaves the set-theoretic universe: the image $B$ ' +
        'is a set too.',
        status: 'reviewed', basedOn: 'v0.9.3#0835fe0f', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.found': {
      statement: {
        en:
        'Every non-empty set has an "$\\in$-minimal" element:\n\n' +
        '$$\\forall A [ A \\ne \\emptyset \\to \\exists x ( x \\in A \\wedge  x \\cap A = \\emptyset ) ]$$\n\n' +
        'An equivalent form: $\\in$ is a well-founded relation, so there is no infinite descending ' +
        'chain\n\n' +
        '$$x_0 \\ni  x_1 \\ni  x_2 \\ni  \\cdots$$',
        status: 'reviewed', basedOn: 'v0.9.3#ccfc3b6b', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'ax.choice': {
      statement: {
        en:
        'From any family of non-empty sets one can pick one element from each, "all at once". ' +
        'Written in terms of a choice function:\n\n' +
        '$\\operatorname{dom}$ is defined only for functions, so the assertion says: "there is a function $f$ with $\\operatorname{dom} f = F$, and $f(X) \\in X$ for every $X \\in F$\":\n\n' +
        '$\\forall F [ ( \\forall X \\in F, X \\ne \\emptyset ) \\to \\exists f ( \\operatorname{dom} f = F \\wedge  \\forall X \\in F, f(X) \\in X ) ]$\\\n\n' +
        'Another common form (pairwise disjoint form): if $F$ is a family of pairwise disjoint ' +
        'non-empty sets, then there is a set $C$ with $|C \\cap X| = 1$ for every $X \\in F$.\n\n' +
        'The choice function $f$ is the device for "picking all at once"; AC asserts that such a ' +
        'simultaneous choice is always possible.',
        status: 'reviewed', basedOn: 'v0.9.3#96318197', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },


    /* ================================================ 2026-11-01 · 入口层：子集 / 有序对 / 关系 / 映射 / 函数
       ⭐ 逐句对译；公式一字不改。status 直接 'reviewed'（作者 2026-11-01 授权）。 */

    'def.subset': {
      statement: {
        en:
'Let $A$ and $B$ be sets.\\n\\n' +
'- **$A$ is a subset of $B$** (written $A \\subseteq B$): ' +
'$\\forall x ( x \\in A \\to x \\in B )$\\n' +
'- **$A$ is a proper subset of $B$** (written $A \\subset B$): $A \\subseteq B$ and ' +
'$A \\ne B$.\\n\\n' +
'Basic properties: $\\subseteq$ is reflexive and transitive; and by the axiom of ' +
'extensionality, two sets are equal exactly when they contain each other:\\n\\n' +
'$$A = B \\iff A \\subseteq B \\wedge  B \\subseteq A$$\\n\\n' +
'This is the most common way to prove two sets equal: **containment both ways**.',
        status: 'reviewed', basedOn: 'v0.9.3#6fb94ac5', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.pair': {
      statement: {
        en:
        'Kuratowski\'s definition:\n\n' +
        '$$(a, b) := \\{ \\{a\\}, \\{a, b\\} \\}$$\n\n' +
        'The pairing and power-set axioms guarantee that this is a set.\n\n' +
        '**Characteristic property** (this is all that "ordered" means):\n\n' +
        '$$(a, b) = (c, d) \\iff a = c \\wedge  b = d$$\n\n' +
        'An $n$-tuple is defined recursively: ' +
        '$(a_{1}$ …$a_{n}) = ( (a_{1}$ …$a_{n-1}), a_{n} )$.',
        status: 'reviewed', basedOn: 'v0.9.3#a830b9b2', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.rel': {
      statement: {
        en:
        'Let $A$ and $B$ be sets.\n\n' +
        'A **relation** $R$ consists of ordered pairs; $R \\subseteq A \\times B$ means that $R$ ' +
        'is a relation from $A$ to $B$.\n\n' +
        '- **domain** $\\operatorname{dom} R = \\{ a : \\exists b (a, b) \\in R \\}$;\n' +
        '- **range** $\\operatorname{ran} R = \\{ b : \\exists a (a, b) \\in R \\}$;\n' +
        '- **inverse** $R^{-1} = \\{ (b, a) : (a, b) \\in R \\}$.',
        status: 'reviewed', basedOn: 'v0.9.3#ebf411a5', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.function': {
      statement: {
        en:
        'Let $f$ be a relation from $A$ to $B$. Then $f$ is a **map** (written $f : A \\to B$) ' +
        'if and only if every input has exactly one output:\n\n' +
        '$$\\forall a \\in A, \\exists! b \\in B, (a, b) \\in f$$\n\n' +
        'Uniqueness is what makes the notation $f(a) = b$ unambiguous; in that case ' +
        '$\\operatorname{dom} f = A$, and the **image** of $f$ is ' +
        '$f(A) = \\{ f(a) : a \\in A \\}$.\n\n' +
        'Injective / surjective / bijective are separate nodes; a map whose values lie in a set ' +
        'of numbers has its own name, a **function**.',
        status: 'reviewed', basedOn: 'v0.9.3#2c875827', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },

    'def.number-function': {
      statement: {
        en:
        'Let $X$ be a set and $f : X \\to Y$ a **map**. If its values lie in a **set of numbers** — that is, ' +
        '$Y \\subseteq \\mathbb{R}$ or $Y \\subseteq \\mathbb{C}$ — then $f$ is called a ' +
        '**function**.',
        status: 'reviewed', basedOn: 'v0.9.3#0f3927eb', reviewed: { by: 'bingyingzizz', date: '2026-11-01' },
      },
    },


  },
};
