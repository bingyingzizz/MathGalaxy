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
        '**Only one of the three axioms is "hard"** (they are usually listed side by side, but they carry very different weight):\n\n- **Non-degeneracy** $d(x,y)=0 \\iff x=y$: **read it as two halves.** "$x=y \\implies d(x,y)=0$" is nearly free (often built into how $d$ is given); "$d(x,y)=0 \\implies x=y$" is the half with content (weakening it gives a **pseudometric**).\n- **Symmetry**: **can be dropped** — what is left is a **quasi-metric** (e.g. a "one-way shortest path"); the topology is still definable, but balls are asymmetric (the ball for $d$ and the ball for the reversed quasi-metric differ).\n- **Triangle inequality**: **the only indispensable one.** Without it the open balls no longer form a base for a topology — the concrete failure is that an intersection stops containing a ball, which is precisely what the definition of "open" uses.\n\n⚠ **"$d$ takes values in $[0,+\\infty)$ rather than $[0,+\\infty]$"**: allowing $+\\infty$ wrecks the notion of a connected component (the discrete metric $d \\equiv +\\infty$ misbehaves), so the standard definition takes finite values; if a map between metric spaces needs $+\\infty$, say so explicitly.',
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
        'An **abelian category** is a **preabelian category** satisfying one of the following ' +
        '**equivalent** conditions (for preadditive, additive and preabelian categories see ' +
        '`def.pre-additive-category`, `def.additive-category`, `def.pre-abelian-category`):\n\n' +
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
        '**Which of the four is the real axiom, and which are its consequences** (they are usually listed side by side, but condition 4 is the weakest and behaves most like an axiom, while the first three each cost something):\n\n- (1) $\\implies$ (2): **one kernel-plus-cokernel diagram chase.** $i : N \\rightarrowtail M$ identifies $N$ with $\\ker(M \\to \\operatorname{coker} i)$; this uses only the preabelian fact that a monomorphism is its own kernel — **no assumption beyond the additive structure**.\n- (2) $\\implies$ (1): **almost free in reverse** ($N$ being isomorphic to the kernel of a cokernel simply says $i$ is a kernel, i.e. regular).\n- (1) $\\iff$ (3): **this step needs kernels and cokernels** (i.e. preabelian). Factor $f = M \\to N$ as $M \\twoheadrightarrow \\operatorname{im} f \\rightarrowtail N$; "the epimorphism half is regular" is exactly (1). ⚠ Uniqueness holds **up to isomorphism** — the word matters: the factorisation is not strict, since one image can have different representatives.\n- (1) $\\iff$ (4): **the most "algebraic" one** (Abel\'s original form): $\\ker(N \\to \\operatorname{coker} f) \\cong \\operatorname{coker}(\\ker f \\to M)$. It is equivalent to "the first isomorphism theorem holds in the category", and needs **kernels and cokernels to exist** plus **regularity of mono/epi**.\n\n⚠ **Preabelian $\\ne$ abelian — the point**: preabelian asks only that kernels and cokernels exist; any one of (1)–(4) can **fail**. The standard counterexamples are $\\mathbf{PreAb}$ (preabelian groups) or filtered vector spaces, where an epimorphism need not be a cokernel and a monomorphism need not be a kernel. So **abelian = preabelian + (any one of the equivalent conditions)**, and that last clause cannot be dropped.\n\n⚠ **Two more traps**: in the definition of "additive category", "all direct sums" and "all finite products" agree only **given preadditivity** (in a general category finite products and finite coproducts need not coincide); and "all finite limits and colimits" is the phrasing attached to (2), which does **not** imply abelianness ($\\mathbf{Set}$ has finite limits and coproducts yet is far from abelian) — the difference lies in disjointness, universality and effectiveness.',
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
        '**Which hypothesis each direction uses** (all three conditions are purely about set operations, but the ring hypothesis cannot be dropped):\n\n- (1) $\\implies$ (3): a countable disjoint union is a special case of a countable union — free.\n- (1) $\\implies$ (2): increasing unions are immediate from the definition; for decreasing intersections take the first term minus the successive differences as a countable union (the whole set need not belong to the family).\n- (2) $\\implies$ (1): the ring gives finite unions, and the monotone class keeps their increasing limit inside the family.\n- (3) $\\implies$ (1): set $B_n = A_n \\setminus \\bigcup_{j<n} A_j$; the ring guarantees every $B_n$ lies in the family, and closure under disjoint unions finishes.\n- The ring hypothesis cannot be dropped: on a two-point set, the family of the two singletons is a monotone class, yet it does not contain their union.',
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
        "- (c) $X$ is **complete and totally bounded**.",
        status: 'reviewed', basedOn: 'v0.9.3#c4151627', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
      },
      notes: {
        en:
        'The whole logical skeleton is in the arrows (click an arrow to see its proof):\n\n' +
        '- compact $\\implies$ sequentially compact\n' +
        '- sequentially compact $\\implies$ totally bounded　(**one of two** steps in this ' +
        'cluster that genuinely uses a choice principle — DC; the other is (b) implies (a))\n' +
        '- sequentially compact $\\implies$ complete\n' +
        '- sequentially compact $\\implies$ compact　(the "bad balls" argument; it uses ' +
        'total boundedness and completeness, and the bad-ball construction invokes DC)\n' +
        '- compact $\\implies$ complete, compact $\\implies$ totally bounded\n' +
        '- complete + totally bounded $\\implies$ sequentially compact　(the diagonal ' +
        'argument; again no choice)\n\n' +
        'So "sequentially compact $\\implies$ totally bounded $\\implies$ compact" and ' +
        '"compact $\\implies$ sequentially compact" close the circle, and the three notions ' +
        'agree.\n\n' +
        '⚠ **What each of the two conditions does**: completeness keeps the limit **in the space**, total boundedness supplies **a shrinkable subsequence** — neither can be dropped ($\\mathbb{R}$ is complete but not totally bounded; $(0, 1)$ is totally bounded but not complete).\n\n' +
        '⚠ In a general topological space **both implications fail**:\n\n' +
        '(a) $\\implies$ (b) fails: take $I = 2^{\\mathbb{N}}$ and, for $A \\in \\{0, 1\\}^{\\mathbb{N}}$, put $x_{n}(A) = A(n)$, so $x_{n} \\in \\{0, 1\\}^{I}$; Tychonoff makes $\\{0, 1\\}^{I}$ **compact**. Given any subsequence $n_{k}$, choose $A$ with $A(n_{2j}) = 1$ and $A(n_{2j+1}) = 0$; then $x_{n_{k}}(A)$ alternates between $1$ and $0$, so the subsequence does not converge; since $n_k$ was arbitrary, no subsequence of $(x_n)$ converges — **not sequentially compact**.\n\n' +
        '(b) $\\implies$ (a) fails: $[0, \\omega_{1})$ with the order topology is **sequentially compact** (countably many countable ordinals have an upper bound, so the subsequence falls inside some compact $[0, \\alpha]$) but **not compact** ($\\{[0, \\alpha) : \\alpha < \\omega_{1}\\}$ is an open cover with no finite subcover).\n\n' +
        '⚠ The two notions agree only in metric spaces — sequential compactness is a piece of luck peculiar to metric spaces.\n\n' +
        '**What each direction uses, and whether any extra hypothesis is needed** (this list *is* the content of the equivalence):\n\n- (a) $\\implies$ (b): **no choice needed.** If no subsequence converged, every $y$ would have an open neighbourhood $U_{y}$ containing $x_{n}$ for only finitely many $n$ — otherwise the balls of radius $1/k$ around $y$ would give a subsequence converging to $y$, with the indices picked greedily from $\\mathbb{N}$. Compactness makes finitely many $U_{y}$ cover the space, so only finitely many indices occur — contradiction.\n- (a) $\\implies$ (c), "complete": **no choice needed.** A Cauchy sequence with a convergent subsequence converges, and to the same point.\n- (a) $\\implies$ (c), "totally bounded": **no choice needed.** Cover by all balls of radius $\\varepsilon$; a finite subcover is a finite $\\varepsilon$-net.\n- (b) $\\implies$ (a): **uses total boundedness and completeness; the bad-ball construction invokes DC** (the "bad ball" argument: if no finite cover existed, one would build recursively a sequence with pairwise distances $\\ge \\varepsilon$, which has no convergent subsequence).\n- (b) $\\implies$ (c), "complete": **no choice needed** (the limit of the convergent subsequence is the limit of the Cauchy sequence).\n- (b) $\\implies$ (c), "totally bounded": **this step really uses countable choice (DC)** — one of two places in the proof (the other is (b) implies (a)). For each $n$ one picks a $1/n$-ball containing infinitely many terms, and shrinks layer by layer.\n- (c) $\\implies$ (b): **no choice needed** (diagonal argument: using $1/n$-nets, keep at each layer a ball with infinitely many terms, take the diagonal subsequence — it is Cauchy — and converge by completeness).',
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
        '**Which of the three conditions is "hard"** (the three are asymmetric — one is normalisation, one is almost free, one is a real condition):\n\n- $\\mu^{*}(\\emptyset) = 0$: **normalisation**, there only so that $0 \\le \\mu^{*}$ below is meaningful (otherwise the constant $+\\infty$ would satisfy the other two).\n- **Monotonicity**: **almost free**, but deriving it uses countable subadditivity: $B = A \\cup (B \\setminus A)$ $\\implies$ $\\mu^{*}(B) \\le \\mu^{*}(A) + \\mu^{*}(B\\setminus A)$; monotonicity is usually listed as an axiom to save that step, and in a concrete construction (Carathéodory) it is verified directly.\n- **Countable subadditivity**: **this is the real condition**, the only one with content — it ties "the size of one set" to "countable operations". ⚠ Note that it is an **inequality**: an outer measure is **not** additive (additivity on disjoint unions is what makes it a measure, and that is an extra conclusion on Carathéodory-measurable sets).\n\n**Two distinctions that must stay separate**:\n\n- **An outer measure is defined on $\\mathcal{P}(X)$** (all subsets), whereas a measure (`def.measure`) is defined only on a $\\sigma$-algebra — that is the whole point of an outer measure as a **construction device**: first put a crude "size" on all subsets, then single out the subsets on which it is additive.\n- **Monotone plus countably subadditive does not say "the value on a countable union is the limit"**: on increasing unions an outer measure only guarantees $\\mu^{*}(\\bigcup A_{n}) \\le \\lim \\mu^{*}(A_{n})$; equality needs continuity from below, hence measurability — exactly what the Carathéodory condition supplies.\n\n⚠ Notation: the star in $\\mu^{*}$ means "defined on $\\mathcal{P}(X)$", not "dual of something". Some books write $m^{*}$ or $\\nu^{*}$.',
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
        '$\\forall F [ ( \\forall X \\in F, X \\ne \\emptyset ) \\to \\exists f ( \\operatorname{dom} f = F \\wedge  \\forall X \\in F, f(X) \\in X ) ]$\n' +
        'Another common form (pairwise disjoint form): if $F$ is a family of pairwise disjoint ' +
        'non-empty sets, then there is a set $C$ with $\\#(C \\cap X) = 1$ for every $X \\in F$.\n\n' +
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
'Let $A$ and $B$ be sets.\n\n' +
'- **$A$ is a subset of $B$** (written $A \\subseteq B$): ' +
'$\\forall x ( x \\in A \\to x \\in B )$\n' +
'- **$A$ is a proper subset of $B$** (written $A \\subset B$): $A \\subseteq B$ and ' +
'$A \\ne B$.\n\n' +
'Basic properties: $\\subseteq$ is reflexive and transitive; and by the axiom of ' +
'extensionality, two sets are equal exactly when they contain each other:\n\n' +
'$$A = B \\iff A \\subseteq B \\wedge  B \\subseteq A$$\n\n' +
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

    'thm.noself': {
      statement: {
        en: "$$\\forall A ( A \\notin A )$$\n\nMore generally, the Axiom of Foundation rules out every finite $\\in$-cycle:\n\n$$A_0 \\ni  A_1 \\ni  \\cdots \\ni  A_n = A_0$$",
        status: 'draft',
        basedOn: 'v0.9.3#add1d770',
      },
      notes: {
        en: "This theorem shows that the set $R = \\{ x : x \\notin x \\}$ from Russell's paradox cannot exist — otherwise $R \\in R$ and $R \\notin R$ would both hold.",
        status: 'draft',
        basedOn: 'v0.9.3#a5d74868',
      },
    },

    'thm.empty': {
      statement: {
        en: "There exists a set with no elements:\n\n$$\\exists B \\forall x ( x \\notin B )$$\n\nBy the Axiom of Extensionality such a $B$ is unique; it is written $\\emptyset$.",
        status: 'draft',
        basedOn: 'v0.9.3#2debfc32',
      },
      notes: {
        en: "$\\emptyset$ is the least element for $\\in$ and also for $\\subseteq$: $\\emptyset \\subseteq A$ holds for every $A$.\n\nThe point of this theorem is that **$\\emptyset$ need not be taken as a primitive object**: the Axiom Scheme of Separation already produces it (from any set $A$, take $\\{x \\in A : x \\ne x\\}$). So in ZF the empty set is not an extra assumption.",
        status: 'draft',
        basedOn: 'v0.9.3#acd90126',
      },
    },

    'thm.product': {
      statement: {
        en: "Given any two sets, the collection of all ordered pairs is again a set:\n\n$$\\forall A \\forall B \\exists C \\forall z [ z \\in C \\leftrightarrow  \\exists a \\in A, \\exists b \\in B, z = (a, b) ]$$\n\nIt is written $A \\times B = \\{ (a, b) : a \\in A, b \\in B \\}$.",
        status: 'draft',
        basedOn: 'v0.9.3#f405d7a0',
      },
      notes: {
        en: "It is the prerequisite for defining relations and functions as sets: without $A \\times B$ there is no such thing as $R \\subseteq A \\times B$.",
        status: 'draft',
        basedOn: 'v0.9.3#a6658787',
      },
    },

    'def.empty': {
      statement: {
        en: "The **empty set** is the set with no elements, written $\\emptyset$:\n\n$$\\emptyset := \\{ x : x \\ne x \\}$$\n\n\"$x \\ne x$\" fails for every $x$, so this set has no elements at all. It is a **primitive object of the language**, on the same level as the Axiom of Extensionality and first-order logic.\n\nHence for every set $A$: $\\emptyset \\subseteq A$ (vacuously true), and $\\emptyset$ is the least element under $\\subseteq$.",
        status: 'draft',
        basedOn: 'v0.9.3#e1460b5c',
      },
      notes: {
        en: "Conditions such as \"$\\emptyset \\in \\mathcal{A}$\" and \"$\\emptyset \\notin F$\" are everywhere in measure theory (the Axiom of Choice requires the family to contain no empty set; $\\mu(\\emptyset) = 0$ is the first axiom of a measure).\n\nThe Axiom of Extensionality supplies **at most** one such set;\n\nthe half that says one **exists** is a separate result — see \"the empty set exists\".\n\nDistinguish $\\emptyset$ from $\\{\\emptyset\\}$: the latter has one element (namely the empty set), so $\\{\\emptyset\\} \\ne \\emptyset$.\n\n\n$\\emptyset \\subseteq A$ is **vacuously true**: there is no $x \\in \\emptyset$ to check.",
        status: 'draft',
        basedOn: 'v0.9.3#9a3aa702',
      },
    },

    'def.power-set': {
      statement: {
        en: "Let $X$ be a set. The **power set** of $X$ is the set whose elements are all subsets of $X$:\n\n$$\\mathcal{P}(X) := \\{ A : A \\subseteq X \\}$$\n\nThus $A \\in \\mathcal{P}(X) \\iff A \\subseteq X$, and every element of $\\mathcal{P}(X)$ is itself a set.\n\nBy the **Axiom of Power Set**, $\\mathcal{P}(X)$ is indeed a set; by Extensionality it is unique.\n\nIn the finite case the number of elements is given by $\\#X = n \\implies \\#\\mathcal{P}(X) = 2^{n}$ (each element is either taken or not).",
        status: 'draft',
        basedOn: 'v0.9.3#46639831',
      },
      notes: {
        en: "The power set is the step that **turns a property into an object**: to speak about \"all subsets of $X$\" as a thing in itself (rather than one subset at a time) one needs the power set.\n\n$\\mathcal{P}(X)$ is also the stage for several important constructions:\n- Outer measures are defined on **all subsets**: $\\mu^* : \\mathcal{P}(X) \\to [0, +\\infty]$;\n\n\n- Rings, $\\sigma$-algebras and monotone classes are each a family of subsets of $X$, i.e. a subfamily of $\\mathcal{P}(X)$;\n\n\n- The generated $\\sigma$-algebra is the intersection of all $\\sigma$-algebras containing $\\mathcal{E}$, and $\\mathcal{P}(X)$ guarantees that this intersection is non-empty.\n\n$\\emptyset \\in \\mathcal{P}(X)$ and $X \\in \\mathcal{P}(X)$ for every $X$ — a power set is never empty.",
        status: 'draft',
        basedOn: 'v0.9.3#e4c969dd',
      },
    },

    'def.ordinal': {
      statement: {
        en: "A set $\\alpha$ is an **ordinal** (a von Neumann ordinal) iff:\n\n1. **$\\alpha$ is transitive**: $\\forall x \\in \\alpha,\\; x \\subseteq \\alpha$ (an element of an element is again an element);\n2. **$\\in$ well-orders $\\alpha$**: restricted to $\\alpha$, $\\in$ makes $\\alpha$ a **well-ordered set** — that is, for any $x, y \\in \\alpha$ exactly one of $x \\in y$, $x = y$, $y \\in x$ holds, and every non-empty subset of $\\alpha$ has an $\\in$-least element.\n\nBy transitivity, **every element of $\\alpha$ is itself an ordinal**. Conventions: $0 := \\emptyset$, the **successor ordinal** $\\alpha + 1 := \\alpha \\cup \\{ \\alpha \\}$; a non-zero ordinal with no greatest element is a **limit ordinal**, and $\\omega$ is the least limit ordinal. The class of all ordinals is written $\\mathrm{On}$.\n\nThe first few are $\\emptyset,\\ \\{ \\emptyset \\},\\ \\{ \\emptyset, \\{ \\emptyset \\} \\},\\ \\ldots$, that is $0, 1, 2, \\ldots$;\n\nthen come $\\omega,\\ \\omega + 1,\\ \\omega + 2,\\ \\ldots,\\ \\omega + \\omega,\\ \\ldots$",
        status: 'draft',
        basedOn: 'v0.9.3#42c21521',
      },
      notes: {
        en: "**The format is still \"set + relation + axioms\"**: ordinals are not objects out of nowhere — a **transitive set** together with the **ready-made** relation $\\in$ determines an ordinal. To decide whether a set is an ordinal, check these two clauses.\n\n**Why not take order types as the objects** — this is the most important step in this pack: an order type is an isomorphism class, and there are more order types of well-orders than fit into any set, so they cannot be collected (see \"the ordinals do not form a set\"). Ordinals avoid this: each order type is given a **concrete representative**, namely a transitive well-ordered set. Comparing order types then becomes comparing $\\in$, which can be done outright.\n\n**$\\alpha \\in \\beta$ and $\\alpha < \\beta$ are the same thing**: on ordinals, $\\in$ is the order. Writing $\\alpha < \\beta$ really uses $\\in$ underneath.\n\nOrdinals are not just \"a generalization of $\\mathbb{N}$\". The ordinals after $\\omega$ get longer and longer, but their **size** (cardinality) can stay at $\\aleph_0$ — for ordinals, \"longer\" and \"larger\" are two different things.\n\n\n\n**Which assumptions each direction uses** (the definition of an ordinal needs no Choice; the existence of a representative for each order type is a separate construction):\n- being a von Neumann ordinal $\\iff$ transitive and well-ordered by membership: both directions are unfolding the definition, with no compactness, no Choice and no metric; the convention $\\alpha<\\beta\\iff\\alpha\\in\\beta$ is also a notational definition.\n- elements of an ordinal are ordinals: inherit the well-order and use transitivity of membership on the ambient set to show the element is transitive; a general transitive set does not by itself have transitive elements.\n- well-ordered set $\\implies$ existence of a unique ordinal of the same order type: build it by well-founded recursion and collect the image with Replacement; this is not an unfolding of the definition, and it does not need the Choice that well-orders an arbitrary set.\n- transitivity cannot be dropped: the members of $\\{\\{\\emptyset\\}\\}$ are well-ordered by membership as a single point, yet the set is not transitive; the well-order condition cannot be dropped either: $\\{0,1,\\{1\\}\\}$ is transitive, but $0$ and $\\{1\\}$ are incomparable under membership.",
        status: 'draft',
        basedOn: 'v0.9.3#b7e8d4cc',
      },
    },

    'thm.ordinal-trichotomy': {
      statement: {
        en: "For any two ordinals $\\alpha, \\beta$, **exactly one** of the following holds:\n\n$$\\alpha \\in \\beta, \\qquad \\alpha = \\beta, \\qquad \\beta \\in \\alpha$$\n\nIn particular, $\\in$ is a **well-order** on the class of all ordinals: every non-empty family of ordinals has a least element.",
        status: 'draft',
        basedOn: 'v0.9.3#191c1080',
      },
      notes: {
        en: "Trichotomy lets ordinals serve as **coordinates**: the order types of any two **well-ordered sets** are comparable, and **no Choice is needed**.\n\nThis is a completely different statement from \"any two **cardinals** are comparable\", which does need AC (see \"the comparability theorem for cardinals\"). The difference is that an ordinal **carries** a well-order — namely $\\in$ — whereas a general set has no a priori well-order, and finding one for it is exactly the content of the well-ordering theorem ($\\iff$ the Axiom of Choice).",
        status: 'draft',
        basedOn: 'v0.9.3#4396eafd',
      },
    },

    'thm.burali-forti': {
      statement: {
        en: "The class $\\mathrm{On}$ of all ordinals **is not a set**: there is no set whose elements are exactly all the ordinals.",
        status: 'draft',
        basedOn: 'v0.9.3#e28f5e4e',
      },
      notes: {
        en: "The proof is one line: if $\\mathrm{On}$ were a set, it would be **transitive** (elements of ordinals are ordinals) and $\\in$ would **well-order** it (trichotomy gives comparability), so $\\mathrm{On}$ would itself be an ordinal, hence $\\mathrm{On} \\in \\mathrm{On}$ — contradicting the fact that no ordinal is an element of itself ($\\in$ is a well-order on ordinals, which forbids $\\in$-cycles).\n\nThis is exactly the other face of **Hartogs' theorem**: there are too many ordinals to fit into any set. \"There is an ordinal that does not inject into $X$\" and \"the ordinals do not form a set\" say the same thing.\n\nRelation to Russell's paradox: both contradictions come from treating a certain \"totality\" as a set. In ZFC they are resolved the same way — that totality is not a set, so the Axiom Scheme of Separation cannot even be applied to it.",
        status: 'draft',
        basedOn: 'v0.9.3#cf126a32',
      },
    },

    'def.equinumerous': {
      statement: {
        en: "Sets $A$ and $B$ are **equinumerous** (written $\\#A = \\#B$ or $A \\approx B$) iff there is a **bijection**\n\n$$f : A \\to B$$\n\nEquinumerosity is an equivalence relation on sets: reflexive (identity map), symmetric (inverse map), transitive (composition).",
        status: 'draft',
        basedOn: 'v0.9.3#8c01f4ed',
      },
      notes: {
        en: "This is the **right way to compare sizes**: instead of counting (an infinite set cannot be counted out), ask whether the two sets can be paired off one-to-one.\n\nClassical results:\n- $\\mathbb{N}$ is equinumerous with $\\mathbb{Q}$ and with $\\mathbb{N} \\times \\mathbb{N}$ (both are countable);\n\n\n- $(0, 1)$ is equinumerous with $\\mathbb{R}$ (via something like $x \\mapsto \\tan \\pi(x - 1/2)$);\n\n\n- $\\mathbb{N}$ and $\\mathbb{R}$ are **not** equinumerous (Cantor's theorem).\n\n$A \\subseteq B$ has nothing to do with equinumerosity: $\\mathbb{N} \\subset \\mathbb{Q}$ yet the two are equinumerous — this is precisely the dividing line between infinite and finite sets (Dedekind's characterization: equinumerous with a proper subset $\\iff$ infinite).",
        status: 'draft',
        basedOn: 'v0.9.3#e9fe1f5a',
      },
    },

    'thm.cantor': {
      statement: {
        en: "For every set $A$:\n\n$$\\#A < \\#\\mathcal{P}(A)$$\n\nThat is, there is **no** surjection from $A$ onto $\\mathcal{P}(A)$ (and hence no bijection either), while $a \\mapsto \\{a\\}$ is an injection.",
        status: 'draft',
        basedOn: 'v0.9.3#195c290e',
      },
      notes: {
        en: "Corollary: **there is no largest cardinal** — from any set, taking the power set gives a larger one.\n\nHence\n\n$\\aleph_0 < 2^{\\aleph_0} < 2^{2^{\\aleph_0}} < \\cdots$\n\nTaking $A = \\mathbb{N}$ gives \"$\\mathbb{R}$ is uncountable\" ($\\#\\mathbb{R} = 2^{\\aleph_0}$).\n\nThe proof uses the **diagonal method** (see the proof on the edge): the \"diagonal set\" $D = \\{ a \\in A : a \\notin f(a) \\}$ is not in the image of $f$.\n\nThis is the most theorem-producing construction in the history of mathematics; Cantor–Bernstein, Gödel's incompleteness theorem and the halting problem all use it.",
        status: 'draft',
        basedOn: 'v0.9.3#c411105f',
      },
    },

    'thm.schroder-bernstein': {
      statement: {
        en: "If there are injections $f : A \\to B$ and $g : B \\to A$, then there is a **bijection** $A \\to B$; that is,\n\n$$\\#A \\le \\#B \\ \\wedge \\ \\#B \\le \\#A \\implies \\#A = \\#B$$",
        status: 'draft',
        basedOn: 'v0.9.3#c2d4190e',
      },
      notes: {
        en: "Its value is **convenience**: to prove that two sets are equinumerous it suffices to build one injection in each direction; the bijection itself need not be written down. (Compare the other route to Cantor's theorem — an injection but no surjection — which is the dual statement.)\n\nIt **does not need** the Axiom of Choice: the proof is constructive (see the proof on the edge), which is what makes it more usable than \"any two cardinals are comparable\".",
        status: 'draft',
        basedOn: 'v0.9.3#2c2323bf',
      },
    },

    'def.choicefn': {
      statement: {
        en: "Let $F$ be a family of sets with $\\emptyset \\notin F$.\n\nA function $f$ is a **choice function** for $F$ iff **both** of the following hold:\n\n(i) $f$ is a function and $\\operatorname{dom} f = F$;\n(ii) $\\forall X \\in F$, $f(X) \\in X$.\n\nThat is, $f$ picks one element from each member of $F$.\n\nThe Axiom of Choice can therefore be stated concisely as: **every family $F$ with $\\emptyset \\notin F$ has a choice function**.",
        status: 'draft',
        basedOn: 'v0.9.3#f5549253',
      },
      notes: {
        en: "If $F$ is finite, one can pick the elements one by one, and no AC is needed. The difficulty lies only with infinite families, especially uncountable ones.",
        status: 'draft',
        basedOn: 'v0.9.3#6d9a6efe',
      },
    },

    'lem.tukey': {
      statement: {
        en: "Let $\\mathcal{A}$ be a **non-empty family of sets with finite character**. Then $(\\mathcal{A}, \\subseteq )$ has a maximal element.\n\nThat is, there is $A \\in \\mathcal{A}$ such that no $B \\in \\mathcal{A}$ satisfies $A \\subset B$.",
        status: 'draft',
        basedOn: 'v0.9.3#0fcde180',
      },
      notes: {
        en: "The advantage of Tukey's lemma is that it **saves verification**: as soon as the family in question has finite character, the tedious check that \"every chain has an upper bound\" can be skipped.\n\nExample: the family of linearly independent sets has finite character ($X$ is linearly independent $\\iff$ every finite subset of $X$ is linearly independent), so \"every linearly independent set extends to a maximal one\" holds automatically.\n\nHistory: Teichmüller (1939) and Tukey (1940) stated it independently.",
        status: 'draft',
        basedOn: 'v0.9.3#89317279',
      },
    },

    'thm.compactness': {
      statement: {
        en: "Let $\\Gamma$ be a set of first-order formulas. If **every finite subset** of $\\Gamma$ has a model, then $\\Gamma$ itself has a model.\n\nEquivalently: if $\\Gamma \\vDash \\varphi$, then there is a **finite** $\\Gamma_{0} \\subseteq \\Gamma$ with $\\Gamma_{0} \\vDash \\varphi$.",
        status: 'draft',
        basedOn: 'v0.9.3#39f5f6d3',
      },
      notes: {
        en: "It is a **one-sentence corollary**: by the completeness theorem, having a model $\\iff$ being consistent; and inconsistency is witnessed by a **finite** proof, which uses only finitely many formulas of $\\Gamma$. So inconsistency is always finitely visible, and taking the contrapositive gives compactness.\n\n**Second proof** (avoiding completeness): use ultraproducts / Łoś's theorem — take the directed family of finite subsets as the index set, choose a model of each finite subset, and the ultraproduct is a model of the whole theory. Ultraproducts are not developed here, so this is only a remark.\n\nIt is **the reason first-order logic cannot express finiteness**: let $\\Gamma$ consist of infinitely many sentences saying \"field + characteristic 0 + finite\". Every finite subset is satisfiable in some finite field, so the whole of $\\Gamma$ has a model — an **infinite** \"finite field\". Likewise the standard model of the natural numbers cannot be characterised by first-order axioms: non-standard analysis is a direct product of this theorem.\n\n**The resemblance to topological compactness (`def.compact`) is only in the name**: that one says \"every open cover has a finite subcover\", this one says \"finitely satisfiable $\\implies$ satisfiable\". The two are connected only by an **analogy edge**, not by a dependence of theorems.",
        status: 'draft',
        basedOn: 'v0.9.3#86ad03b3',
      },
    },

    'def.topology': {
      statement: {
        en: "Let $X$ be a set and $\\mathcal{T} \\subseteq \\mathcal{P}(X)$ a family of subsets of $X$. Then $(X, \\mathcal{T})$ is a **topological space** and $\\mathcal{T}$ is a **topology** on $X$ iff:\n\n1. **Both ends**: $\\emptyset \\in \\mathcal{T}$ and $X \\in \\mathcal{T}$;\n2. **Closed under arbitrary unions**: $\\{ U_i \\}_{i \\in I} \\subseteq \\mathcal{T} \\implies \\bigcup_{i \\in I} U_i \\in \\mathcal{T}$ ($I$ is arbitrary, possibly uncountable);\n3. **Closed under finite intersections**: $U, V \\in \\mathcal{T} \\implies U \\cap V \\in \\mathcal{T}$.\n\nThe members of $\\mathcal{T}$ are called **open sets**, and their complements **closed sets**.",
        status: 'draft',
        basedOn: 'v0.9.3#b6563e95',
      },
      notes: {
        en: "The three axioms abstract the properties of open intervals on the real line: a union of arbitrarily many open sets is open, but only **finitely** many open sets are guaranteed to have an open intersection ($\\bigcap_n (-1/n, 1/n) = \\{0\\}$ is not open).\n\nThe advantage of this language is that **only the question \"which sets count as open\" remains**, so distances, metrics and coordinates can all be thrown away — continuity, compactness, connectedness and limits can still be expressed.\n\nA set can carry several different topologies;\n\nthey are compared as \"finer / coarser\", not by size.\n\n\n\n**Which assumptions each direction uses** (a topology is defined by axioms and imposes no metric or separation requirement):\n- topology $\\iff$ the three listed axioms: both directions unfold the definition and need no compactness, Choice or metric.\n- closure under arbitrary unions $\\implies\\emptyset$ is open requires allowing the empty index family; closure under binary intersections $\\implies$ closure under non-empty finite intersections follows by induction, while the empty intersection being $X$ still needs the convention that $X$ is open.\n- the open-set axioms $\\iff$ the family of complements satisfies arbitrary intersections and finite unions: use De Morgan's identities; no extra topological assumption is needed.\n- finite intersections cannot be upgraded to arbitrary ones: in the usual topology on the reals $\\bigcap_{n\\ge1}(-1/n,1/n)=\\{0\\}$ is not open; nor is a topology automatically Hausdorff — the indiscrete topology on a set with more than one point is a counterexample.",
        status: 'draft',
        basedOn: 'v0.9.3#677ccbc2',
      },
    },

    'def.closed-set': {
      statement: {
        en: "Let $(X, \\mathcal{T})$ be a topological space.\n\n- $F \\subseteq X$ is **closed**: $X \\setminus F$ is open;\n- the **closure** $\\overline{A}$ of $A \\subseteq X$: the intersection of all closed sets containing $A$ (the smallest such closed set);\n- $A$ is **dense**: $\\overline{A} = X$;\n- a **neighbourhood** of $x$: any open set containing $x$ (or any set containing such an open set).\n\nBy De Morgan's laws, the three axioms for open sets become, for closed sets: $\\emptyset, X$ are closed; **arbitrary** intersections are closed; **finite** unions are closed.",
        status: 'draft',
        basedOn: 'v0.9.3#466a9d0a',
      },
      notes: {
        en: "Open and closed are not opposites: $\\emptyset$ and $X$ are both open and closed; in $\\mathbb{R}$, $[0, 1]$ is closed while $[0, 1)$ is neither open nor closed.\n\nThe closure \"collects all the limit points\": in a metric space, $\\overline{A}$ is exactly the set of limits of sequences in $A$.",
        status: 'draft',
        basedOn: 'v0.9.3#a5e40953',
      },
    },

    'def.compact': {
      statement: {
        en: "Let $X$ be a **topological space**. $X$ is **compact** iff every **open cover** has a finite subcover: if a family $\\{U_{i}\\}_{i \\in I}$ satisfies \"each $U_{i}$ is open\" and $X = \\bigcup_{i \\in I} U_{i}$, then there are finitely many indices with\n\n$$X = \\bigcup_{k=1}^{n} U_{i_{k}}.$$\n\nA subset $K \\subseteq X$ is **compact** if $K$ with the subspace topology is a compact space.",
        status: 'draft',
        basedOn: 'v0.9.3#d861e219',
      },
      notes: {
        en: "**Only open sets are used**: the definition mentions no metric and no $\\mathbb{R}^{n}$ — compactness is a purely topological property, so it is preserved by continuous maps and invariant under homeomorphisms (`def.continuous-map` / `def.homeomorphism`).\n\n**Equivalent form (closed sets)**: every family of closed sets with the finite intersection property has non-empty intersection — that is, \"$\\{F_{i}\\}$ closed and every finite subfamily has non-empty intersection $\\implies$ the whole family has non-empty intersection\". This form is the one most often used in proofs by contradiction.\n\n**In metric spaces**: on a metric space, \"compact $\\iff$ sequentially compact $\\iff$ complete + totally bounded\" (`thm.metric-compact-equiv`) — that is a **theorem** (provable only with the metric), not part of the definition. In a general topological space **compactness and sequential compactness imply neither of the other**: $[0, \\omega_{1})$ with the order topology is sequentially compact but not compact (the cover $\\{[0, \\alpha) : \\alpha < \\omega_{1}\\}$ has no finite subcover); $\\{0,1\\}^{\\mathcal{P}(\\mathbb{N})}$ is compact by Tychonoff but not sequentially compact (take $x_{n}(A) = 1 \\iff n \\in A$; every subsequence fails to converge at the coordinate $A = \\{n_{2k}\\}$).\n\nExamples: $[a, b] \\subseteq \\mathbb{R}$ is compact (Heine–Borel, `cor.heine-borel`); $\\mathbb{R}$ is not compact (the cover $\\{(-n, n)\\}$ has no finite subcover); $(0, 1]$ is not compact. Standard examples in general topology are in `def.chaus` and `thm.tykhonov` (arbitrary products remain compact).",
        status: 'draft',
        basedOn: 'v0.9.3#c4fa4371',
      },
    },

    'def.connected': {
      statement: {
        en: "A topological space $X$ is **disconnected** if it can be written as the union of two disjoint non-empty open sets, $X = U \\sqcup V$; otherwise it is **connected**.\n\nFor a fixed $x \\in X$, the **connected component** $C(x)$ of $x$ is the union of all connected subsets containing $x$ — it is itself connected, and it is maximal.",
        status: 'draft',
        basedOn: 'v0.9.3#176a8df6',
      },
      notes: {
        en: "The connected components form a partition of $X$, and each component is closed. Subsets that are **both open and closed** (called **clopen** sets) are the other face of connectedness: $X$ is connected iff its only clopen subsets are $\\emptyset$ and $X$ itself — so \"is there a non-trivial clopen set?\" is the same question as \"can the space be split?\".\n\n**Four equivalent formulations; the cost lies in \"taking complements\" and \"continuous images\"**:\n\n- connected $\\iff$ **not expressible as the union of two disjoint non-empty open sets**: this is the definition.\n- connected $\\iff$ **no non-trivial clopen subsets**: $(\\implies)$ use $V = X \\setminus U$, which is closed; $(\\Leftarrow)$ one line. **This step uses only the duality of open and closed sets**.\n- connected $\\iff$ **every continuous map $X \\to \\{0,1\\}$ (discrete two points) is constant**: $(\\implies)$ the image is connected and $\\{0,1\\}$ is not; $(\\Leftarrow)$ apply the previous item to a characteristic function. This turns connectedness into \"there is no surjection onto two points\", the standard form in the internal language.\n- **the union of a family of connected subsets with a common point is connected** (pairwise intersecting suffices, then induct to arbitrarily many; to avoid AC take the subfamily containing the fixed point). Conversely, **the union of all connected components is $X$, which of course need not be connected** — in the discrete two-point space the union of the two singleton components is $X$, and it is disconnected.\n\n**Connected $\\ne$ path-connected**: path-connected $\\implies$ connected, but not conversely (the topologist's sine curve). The gap between the two is exactly the gap between \"$\\pi_{0}$ and path $\\pi_{0}$\".",
        status: 'draft',
        basedOn: 'v0.9.3#3e6e9a27',
      },
    },

    'def.clopen': {
      statement: {
        en: "A subset $K$ of $X$ is **clopen** if it is both open and closed. Equivalently, $K$ and its complement $K^{c}$ are both open, i.e. $X = K \\sqcup K^{c}$ is a union of disjoint non-empty open sets (when $K$ is non-trivial).",
        status: 'draft',
        basedOn: 'v0.9.3#48e208de',
      },
      notes: {
        en: "Clopen sets are a **rare species** in a general topological space: in connected spaces such as $\\mathbb{R}$ or $[0,1]$ there are only $\\emptyset$ and the whole space. **The more clopen sets, the more fragmented the space** — totally disconnected means \"every connected component is a single point\"; \"clopen sets separate any two points\" (= zero-dimensional) is equivalent to that only under **compact Hausdorff**; and in a profinite space \"the clopen sets form a base\".",
        status: 'draft',
        basedOn: 'v0.9.3#0b77ac0a',
      },
    },

    'def.hausdorff': {
      statement: {
        en: "A topological space $X$ is a **Hausdorff space** (or a **$T_{2}$ space**) if any two distinct points **can be separated by open sets**:\n\n$$\\forall x \\ne y \\in X,\\ \\exists U \\ni x,\\ V \\ni y\\ \\text{open}:\\quad U \\cap V = \\emptyset$$",
        status: 'draft',
        basedOn: 'v0.9.3#861c3b52',
      },
      notes: {
        en: "In one phrase: **limits are unique**. A sequence that converges can converge to only one point — this is the kind of space analysis tacitly assumes.\n\nA stronger separation property is **normal** ($T_{4}$): any two disjoint closed sets can be separated by open sets. Every compact Hausdorff space is normal (the proof uses compactness twice, building open covers and passing to finite subcovers).\n\n$T_{3}$ and $T_{3.5}$ sit in between: $T_{3}$ says \"a point and a closed set not containing it can be separated by open sets\", and $T_{3.5}$ upgrades this to separation by **continuous functions** (the statement that \"there are enough continuous functions\").\n\nThe injectivity of the Stone–Čech compactification requires exactly $T_{3.5}$.\n\n**Convention.** The $T$-number names the bare property; the adjective adds $T_{1}$: \"regular\" = $T_{3} + T_{1}$ (`def.regular-space`), \"completely regular\" = $T_{3.5} + T_{1}$ (`def.completely-regular-space`).\n\nBare $T_{3}$ does not imply $T_{1}$.",
        status: 'draft',
        basedOn: 'v0.9.3#12672068',
      },
    },

    'def.normal-space': {
      statement: {
        en: "A topological space $X$ is **normal** if it is $T_{1}$ and any two **disjoint closed sets** $A, B$ can be separated by open sets: there are open sets $U \\supseteq A$ and $V \\supseteq B$ with $U \\cap V = \\emptyset$.\n\nReplacing \"disjoint closed sets\" by \"a point and a closed set not containing it\" gives a **regular** space; replacing it by \"two points\" gives a **Hausdorff** space.",
        status: 'draft',
        basedOn: 'v0.9.3#c681d9cf',
      },
      notes: {
        en: "**The hierarchy of separation axioms** (each step strengthens the previous one):\n\n- $T_{1}$: singletons are closed;\n- Hausdorff: two points can be separated by open sets;\n- regular: a point and a closed set not containing it can be separated $\\implies$ Hausdorff;\n- **normal**: two disjoint closed sets can be separated $\\implies$ regular.\n\n**Compact Hausdorff $\\implies$ normal** (the most frequently used consequence of compactness: in a compact space two disjoint closed sets can be separated by finitely many pairs of open sets). Hence spaces such as $[0,1]$ and $\\beta I$ are normal — so Urysohn's lemma always applies there.\n\nThe **proof** runs along two steps, \"compact $\\implies$ paracompact\" plus \"paracompact $+$ Hausdorff $\\implies$ normal\", see `thm.paracompact-hausdorff-normal`; ⚠️ **normality is not hereditary**: a subspace of a normal space need not be normal. This differs from both \"compact\" and \"Hausdorff\".",
        status: 'draft',
        basedOn: 'v0.9.3#d4c0d7ca',
      },
    },

    'def.regular-space': {
      statement: {
        en: "**What this is**: the $T_{3}$ property **together with $T_{1}$**. Only after adding $T_{1}$ does it automatically become $T_{2}$ — this is the real purpose of the name \"regular\".\n\nA topological space $X$ is a **regular space** if\n\n1. $X$ is **$T_{3}$**: a point and a closed set not containing it can be separated by disjoint open sets (`def.t3-space`);\n2. $X$ is **$T_{1}$**: singletons are closed (`def.t1-space`).\n\n**Why $T_{1}$ is indispensable**: the indiscrete topology is $T_{3}$ but not $T_{1}$, and certainly not $T_{2}$. After adding $T_{1}$, the set $\\{y\\}$ is closed, so \"$x$ and $\\{y\\}$ can be separated\" yields two disjoint open sets — exactly $T_{2}$.\n\n**Its place in the chain**: regular space $\\implies T_{2} \\implies T_{1} \\implies T_{0}$ (all reverse implications fail).",
        status: 'draft',
        basedOn: 'v0.9.3#dbbfef74',
      },
      notes: {
        en: "⭐ **Convention**: the **T-number denotes the bare property; only the named notion carries $T_{1}$**.\n\nSo T3 means a point and a closed set can be separated (without $T_{1}$), while a regular space means T3 plus $T_{1}$.\n\n⚠️ Munkres uses the opposite convention (he takes \"regular\" without $T_{1}$ and $T_{3}$ with $T_{1}$) — when reading another book, fix the convention first; otherwise a statement such as \"$T_{3} \\implies T_{2}$\" is sometimes true and sometimes false.\n\n**One-line proof that regular $\\implies$ $T_{2}$**: given $x \\ne y$, $T_{1}$ makes $\\{y\\}$ closed and $x \\notin \\{y\\}$; by $T_{3}$ choose disjoint open sets $U \\ni x$ and $V \\supseteq \\{y\\}$. This is exactly $T_{2}$.\n\n⚠️ **Regular does not imply normal**: the Sorgenfrey plane is regular but not normal. So \"regular\" is not a weaker version of \"normal\" on the same axis — they separate **differently shaped** objects (point/closed set vs closed set/closed set).\n\n⭐ Relation to `thm.paracompact-hausdorff-normal`: \"step 1\" of that theorem proves \"paracompact Hausdorff $\\implies$ regular\", using precisely the form $\\overline{U} \\subseteq W$ of $T_{3}$.",
        status: 'draft',
        basedOn: 'v0.9.3#f36e6eb3',
      },
    },

    'def.subspace-topology': {
      statement: {
        en: "Let $(X, \\mathcal{T})$ be a topological space and $Y \\subseteq X$ a subset. The **subspace topology** on $Y$ is\n\n$$\\mathcal{T}_{Y} := \\{\\, U \\cap Y : U \\in \\mathcal{T} \\,\\}$$\n\nThe resulting topology is the coarsest topology making the inclusion map $Y \\hookrightarrow X$ continuous.",
        status: 'draft',
        basedOn: 'v0.9.3#442c3b78',
      },
      notes: {
        en: "Intuition: **the open sets of the subspace are exactly the open sets of the big space cut down**. So \"closed in $Y$\" and \"compact in $Y$\" must be judged with respect to the cut-down piece, not by looking at the big space — for example $(0, 1) \\subseteq \\mathbb{R}$ is closed in itself but not in $\\mathbb{R}$.\n\n📌 `def.induced-topology` is a different notion sharing the same Chinese name: it denotes the Grothendieck topology on a site induced by a functor, and shares only the name with the subspace topology (the two are not merged).",
        status: 'draft',
        basedOn: 'v0.9.3#4bfb0a14',
      },
    },

    'def.product-topology': {
      statement: {
        en: "Let $(X_{i}, \\mathcal{T}_{i})_{i \\in I}$ be a family of topological spaces. The **product topology** on $\\prod_{i \\in I} X_{i}$ is the topology with basis the sets\n\n$$\\prod_{i \\in I} U_{i} \\qquad (U_{i} \\in \\mathcal{T}_{i},$$\nwhere $U_{i} = X_{i}$ for all but finitely many indices $i$)\n\n— that is, the **coarsest** topology making every projection $\\pi_{j} : \\prod_{i} X_{i} \\to X_{j}$ continuous.",
        status: 'draft',
        basedOn: 'v0.9.3#87113c2e',
      },
      notes: {
        en: "⭐ **\"Coarsest\" is the key word**: for the projections to be continuous it suffices that each $\\pi_{j}^{-1}(U_{j})$ be open; taking finite intersections of these as a basis gives the product topology. Demanding a finer topology would lose limits — and the equivalence \"$x_{n} \\to x$ iff it converges in every coordinate\" is exactly what this coarsest choice buys.\n\n**Categorical meaning**: $\\prod_{i} X_{i}$ together with the projections is the **product** in $\\mathbf{Top}$. So the product topology is not an arbitrary choice: it is the one uniquely determined by the universal property.",
        status: 'draft',
        basedOn: 'v0.9.3#b037fbe1',
      },
    },

    'def.quotient-topology': {
      statement: {
        en: "Let $(X, \\mathcal{T})$ be a topological space and $\\pi : X \\twoheadrightarrow Y$ a surjection. The **quotient topology** on $Y$ is\n\n$$\\mathcal{T}_{Y} := \\{\\, V \\subseteq Y : \\pi^{-1}(V) \\in \\mathcal{T} \\,\\}$$\n\nThis is the finest topology making $\\pi$ continuous; $Y$ with this topology is the **quotient space** of $X$.",
        status: 'draft',
        basedOn: 'v0.9.3#b75bf8af',
      },
      notes: {
        en: "Intuition: **the open sets of the quotient are those whose preimage is open**. So properties of the quotient must be read \"from above\": whether two points in $Y$ can be separated by open sets asks whether their preimages can be separated by open sets of $X$.\n\nThe quotient and subspace topologies are opposite directions: one takes \"the coarsest obtained by cutting\", the other \"the finest obtained by gluing back\".\n\n📌 The \"quotient space\" of topology is this one; the quotient of a **vector space** is `def.quotient-vs`.",
        status: 'draft',
        basedOn: 'v0.9.3#a90d3a9d',
      },
    },

    'def.locally-compact-space': {
      statement: {
        en: "A topological space $X$ is **locally compact** if **every point has a compact neighbourhood**: for every $x \\in X$ there is a compact set $K$ with\n\n$$x \\in \\mathring{K}$$\n\nHere $X$ is **not** required to be Hausdorff.",
        status: 'draft',
        basedOn: 'v0.9.3#76e8ed3c',
      },
      notes: {
        en: "**Difference from the Hausdorff version**: in a Hausdorff space, \"every point has a compact neighbourhood\" is equivalent to \"every point has a **base of compact neighbourhoods**\" (inside every neighbourhood one can find a compact neighbourhood); without Hausdorffness this equivalence fails (compact sets need not be closed, and the relation between neighbourhoods and compact sets degenerates).\n\n**Examples**: every compact space (take $K = X$), $\\mathbb{R}^{n}$, and every discrete space is locally compact; $\\mathbb{Q}$ is not. A compact space is always locally compact, but not necessarily Hausdorff.\n\n**Use**: when Hausdorffness is needed, combine this with `def.hausdorff`; without it the definition still stands, but the stronger property of having a base of compact neighbourhoods may fail.",
        status: 'draft',
        basedOn: 'v0.9.3#6f8a6381',
      },
    },

    'def.sequentially-compact': {
      statement: {
        en: "A metric space $(X, d)$ is **sequentially compact** iff every sequence in $X$ has a subsequence converging in $X$:\n\n$$\\forall\\{x_n\\} \\subseteq X,\\ \\exists\\{x_{n_k}\\},\\ \\exists x \\in X : x_{n_k} \\to x$$",
        status: 'draft',
        basedOn: 'v0.9.3#64f48a59',
      },
      notes: {
        en: "In metric spaces, \"sequentially compact $\\iff$ compact\" (see the arrows below), but in general topological spaces the two are **not equivalent** — sequential compactness is strictly stronger. This is exactly where metric spaces are convenient.\n\nNote that the subsequence converges to a point of $X$: sequential compactness is an intrinsic property and does not refer to any ambient space.",
        status: 'draft',
        basedOn: 'v0.9.3#acc16623',
      },
    },

    'def.sequence-limit': {
      statement: {
        en: "A sequence $\\{x_n\\} \\subseteq \\mathbb{R}$ **converges to** $x$ (written $x_n \\to x$ or $\\lim_{n \\to \\infty} x_n = x$), iff\n\n$$\\forall \\varepsilon > 0, \\exists N, \\forall n \\ge N : |x_n - x| < \\varepsilon$$\n\nThat is: no matter how small $\\varepsilon$ is given, from some index on all terms lie in the $x$-neighbourhood of $\\varepsilon$.\n\nA sequence that does not converge is called **divergent**.",
        status: 'draft',
        basedOn: 'v0.9.3#491ef455',
      },
      notes: {
        en: "⭐ This is the \"$\\varepsilon$-$N$ language\": it turns \"getting closer and closer\" into a condition that can be checked one step at a time.\n\nEvery proof in analysis rests on this format.\n\nBasic properties (all verified directly from the definition):\n- the limit is **unique**;\n\n- a convergent sequence is **bounded**;\n\n- limits commute with the four arithmetic operations (when the limit of the denominator is nonzero).\n\n⚠ \"Bounded\" does not guarantee convergence ($(-1)^n$);\n\nthe order \"$\\varepsilon$ fixed, $N$ pushed later\" cannot be reversed.\n\n📌 The unqualified term \"limit\" means a **limit of a sequence** (defined here); limits and colimits in the categorical sense are `def.limit`.",
        status: 'draft',
        basedOn: 'v0.9.3#ecf468e6',
      },
    },

    'def.continuous': {
      statement: {
        en: "**Theorem (the $\\varepsilon$-$\\delta$ criterion)**: the condition below is not a definition but a criterion for continuity in metric terms; for the definition see `def.metric-continuity`, and for the metric on $\\mathbb{R}$ see `def.real-metric-space`.\n$f : \\mathbb{R} \\to \\mathbb{R}$ is **continuous at** $x_0$ iff\n\n$$\\forall \\varepsilon > 0, \\exists \\delta > 0 : |x - x_0| < \\delta \\implies |f(x) - f(x_0)| < \\varepsilon$$\n\nEquivalent formulation: $\\lim_{x \\to x_0} f(x) = f(x_0)$ (the limit exists and equals the value of the function).\n\n$f$ is **continuous** (continuous on $\\mathbb{R}$) iff it is continuous at every point.\n\n**Uniform continuity** is a stronger requirement: $\\delta$ depends only on $\\varepsilon$, not on $x_0$.",
        status: 'draft',
        basedOn: 'v0.9.3#3a8f6943',
      },
      notes: {
        en: "⭐ Replacing $|x - x_0| < \\delta$ and $|f(x) - f(x_0)| < \\varepsilon$ by a distance $d$ carries this definition over to metric spaces verbatim — which is exactly why the definition of a metric space looks the way it does.\n\n⚠ **Continuous $\\ne$ uniformly continuous**: $f(x) = x^{2}$ is continuous on $\\mathbb{R}$ but not uniformly continuous (the larger $x$ is, the smaller $\\delta$ must be).\n\nThe two notions coincide only on compact intervals.\n\n📌 This node is a criterion, not the definition; the definition is in `def.metric-continuity`, and the metric of $\\mathbb{R}$ is in `def.real-metric-space`. For continuity in the general topological sense see `def.continuous-map`; the present statement is its metric special case.",
        status: 'draft',
        basedOn: 'v0.9.3#706f8a5c',
      },
    },

    'def.cauchy-sequence': {
      statement: {
        en: "A real sequence $\\{x_n\\}$ is a **Cauchy sequence** iff\n\n$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall m, n \\ge N :\\ |x_m - x_n| < \\varepsilon$$\n\nThat is: once the index is far enough out, **any two terms** are close to each other.",
        status: 'draft',
        basedOn: 'v0.9.3#7201d0b3',
      },
      notes: {
        en: "⭐ The difference from convergence is the **direction of information**: to check convergence one needs $x$ first in order to compute $|x_n - x|$, whereas a Cauchy sequence lets the terms **compare among themselves** — someone who does not know the limit can still verify it.\n\n⭐ In $\\mathbb{R}$ the two are **equivalent** (the Cauchy criterion);\n\nin $\\mathbb{Q}$ they are not ($1, 1.4, 1.41, \\ldots$ is Cauchy but has no rational limit).\n\n$\\mathbb{R}$ is constructed precisely to fill this gap.\n\n⚠ Do not confuse this with `def.cauchy-null`: that one is about **rational** Cauchy sequences, a building block in the construction of $\\mathbb{R}$;\n\nthe present notion is the tool for testing convergence once $\\mathbb{R}$ is available.",
        status: 'draft',
        basedOn: 'v0.9.3#3c91c226',
      },
    },

    'def.limit-point': {
      statement: {
        en: "Let $S \\subseteq \\mathbb{R}$ and $x \\in \\mathbb{R}$. A point $x$ is a **limit point** (also called an accumulation point) of $S$ iff every punctured neighbourhood of $x$ meets $S$:\n\n$$\\forall \\varepsilon > 0,\\ \\exists s \\in S :\\ 0 < |s - x| < \\varepsilon$$\n\nEquivalent sequential formulation: there is a sequence $S \\setminus \\{x\\}$ with $s_n \\to x$.\n\nReplacing $S$ by the set of terms of a sequence gives \"$x$ is a limit point of $\\{x_n\\}$\", which means \"$\\{x_n\\}$ has a subsequence converging to $x$\".",
        status: 'draft',
        basedOn: 'v0.9.3#4ff443b4',
      },
      notes: {
        en: "⭐ \"Every bounded sequence has a limit point\" is the Bolzano–Weierstrass theorem — one of the six faces of the completeness of the real numbers.\n\n⚠ A limit point **need not belong** to $S$: the set of all rationals $\\mathbb{Q}$ has limit-point set all of $\\mathbb{R}$ (this is precisely what incompleteness of $\\mathbb{Q}$ looks like).\n\n⚠ Do not confuse it with the supremum: $\\sup S$ is about \"upper bounds of $S$\", while a limit point is about \"which points the elements of $S$ approach arbitrarily closely\";\n\n$\\sup\\{1, 1/2, 1/3, \\ldots\\} = 1$ is also the unique limit point of that set, whereas $\\sup\\{1\\} = 1$ is not a limit point.",
        status: 'draft',
        basedOn: 'v0.9.3#9d9f715b',
      },
    },

    'thm.bolzano-weierstrass': {
      statement: {
        en: "Every bounded sequence of real numbers has a convergent subsequence. Equivalently: every bounded infinite subset of $\\mathbb{R}$ has a limit point.\n\nApplying this coordinatewise in $\\mathbb{R}^{n}$ gives: every bounded sequence in $\\mathbb{R}^{n}$ has a convergent subsequence.",
        status: 'draft',
        basedOn: 'v0.9.3#3cdbcb75',
      },
      notes: {
        en: "⭐ This is the analytic core of \"compact $\\iff$ bounded and closed in $\\mathbb{R}^{n}$\" (Heine–Borel): the reason a continuous function on a bounded closed set attains its extreme values ultimately lies here.\n\n⚠ Completeness is **indispensable** here: in $\\mathbb{Q}$, the sequence $1, 1.4, 1.41, 1.414, \\ldots$ is bounded but has no subsequence converging to a rational number.\n\n⭐ The standard proof is **bisection**: halve the interval each time, keep the half containing infinitely many terms, and apply the nested-interval theorem.",
        status: 'draft',
        basedOn: 'v0.9.3#54071bff',
      },
    },

    'def.sigma-algebra': {
      statement: {
        en: "Let $X$ be a set and $\\mathfrak{A} \\subseteq \\mathcal{P}(X)$. Then $\\mathfrak{A}$ is a **$\\sigma$-algebra** on $X$ if and only if it satisfies all three of the following:\n\n1. **Contains the whole set**: $X \\in \\mathfrak{A}$\n2. **Closed under complements**: $A \\in \\mathfrak{A} \\implies A^c := X \\setminus A \\in \\mathfrak{A}$\n3. **Closed under countable unions**: $A_1, A_2, \\ldots \\in \\mathfrak{A} \\implies \\bigcup_{n=1}^{\\infty} A_n \\in \\mathfrak{A}$\n\nThe pair $(X, \\mathfrak{A})$ is called a **measurable space**, and the elements of $\\mathfrak{A}$ are called **measurable sets**.",
        status: 'draft',
        basedOn: 'v0.9.3#6309313d',
      },
      notes: {
        en: "The three conditions come as a package and none can be dropped: keeping only (2) and (3) gives a **$\\sigma$-ring**; weakening (3) to \"finite unions\" gives an **algebra**.\n\nFrom (2) and (3), De Morgan gives closure under **countable intersections** at once: $\\Big( \\bigcap_n A_n \\Big)^c = \\bigcup_n A_n^c \\in \\mathfrak{A}$. Hence finite unions, finite intersections, differences and symmetric differences are all available — the only thing that genuinely goes beyond an algebra is **countability**.\n\n⚠ The direction cannot be reversed: every $\\sigma$-algebra is an algebra, but an algebra need not be a $\\sigma$-algebra.\n\nCounterexample: on $X = \\mathbb{R}$, the family of all finite and cofinite sets is an algebra, while $\\mathbb{N} = \\{1\\} \\cup \\{2\\} \\cup \\{3\\} \\cup \\cdots$ is a union of countably many of its elements and is itself neither finite nor cofinite, so that algebra is not closed under countable unions.\n\nThe \"$\\sigma$\" in the notation means **countable** (from the initial letter of German Summe / French somme); it has nothing to do with the $\\sigma$ of standard deviation.\n\nWhy it is needed: countable additivity of a measure $\\mu (\\bigcup A_{n}) = \\sum \\mu (A_{n})$ requires a domain closed under **countable** operations, otherwise the two sides of the identity do not even live in the same family of sets. The whole construction of measure starts here.\n\n**Of the three axioms only one is really \"hard\"** (the other two can almost be exchanged for each other):\n\n- **Contains the whole set $\\iff$ contains the empty set**: immediate from closure under complements ($\\emptyset = X^{c}$). So writing \"contains $\\emptyset$\" or \"contains $X$\" is equivalent, **provided closure under complements is also present**.\n- **Closed under countable unions $\\iff$ closed under countable intersections**: **use De Morgan twice**: $\\bigcap_{n} A_{n} = \\bigl(\\bigcup_{n} A_{n}^{c}\\bigr)^{c}$. So of \"countable unions\" and \"countable intersections\" only one needs to be assumed — **but it must be paired with closure under complements**; without that neither follows.\n- **\"Countable unions\" cannot be weakened to \"finite unions\"**: finite unions plus complements give an **algebra** (Boolean algebra), not a $\\sigma$-algebra. The difference is substantial: the rationals can be covered in the finite-union algebra of $2^{\\mathbb{R}}$, but the countable union of the singletons $\\{q\\}$ ($= \\mathbb{Q}$) need not be — and all of measure theory needs countable unions.\n- **\"Countable\" cannot be strengthened to \"arbitrary\"**: a $\\sigma$-algebra is **not** closed under arbitrary unions. Counterexample: on $\\mathbb{R}$ the Borel $\\sigma$-algebra is closed under unions of all open sets (the open sets themselves are closed under arbitrary unions), but taking unions over **arbitrary** subfamilies escapes it (every singleton is Borel, yet an arbitrary union of them can be non-measurable, given $2^{\\aleph_{0}}$ of them — constructing a Vitali set needs the axiom of choice).\n\n⚠️ One-line mnemonic: **a $\\sigma$-algebra = \"contains the whole set + closed under complements + closed under countable unions\", and everything else is a consequence of the last two**; while \"complements + finite unions\" is only an algebra, and the gap is not small.",
        status: 'draft',
        basedOn: 'v0.9.3#6901af65',
      },
    },

    'def.measure': {
      statement: {
        en: "Let $\\mathcal{M}$ be a $\\sigma$-algebra on $X$. A function $\\mu : \\mathcal{M} \\to [0, +\\infty]$ is a **measure** if and only if\n\n- **(i)** $\\mu(\\emptyset) = 0$\n- **(ii) countable additivity**: if $\\{E_{j}\\}$ is a sequence of pairwise disjoint sets in $\\mathcal{M}$, then\n\n$$\\mu( \\bigcup_{j=1}^{\\infty} E_j ) = \\sum_{j=1}^{\\infty} \\mu(E_j)$$\n\n$(X, \\mathcal{M}, \\mu )$ is called a **measure space**.",
        status: 'draft',
        basedOn: 'v0.9.3#0b79b896',
      },
      notes: {
        en: "(i) is **independent of** (ii), and (ii) alone **does not imply** it: the constant function $+\\infty$ is countably additive yet does not vanish on the empty set (taking $E_j \\equiv \\emptyset$ yields $\\mu(\\emptyset) = +\\infty \\cdot \\mu(\\emptyset)$, and both sides are legitimate). The axiom is there to exclude the meaningless solution that assigns $\\infty$ to everything, and at the same time to ensure that the series in (ii) is never $\\infty - \\infty$.\n\n**Countable additivity is the only requirement in this definition with real content**: it upgrades \"size\" from finite additivity to countable additivity, at the price of allowing the value $\\infty$.\n\n⚠ Allowing $\\mu (E) = +\\infty$ is necessary: Lebesgue measure on $\\mathbb{R}$ is $\\infty$.\n\n**Which hypothesis each direction uses** (the two measure axioms are the definition; countable additivity is stronger than finite additivity):\n- measure $\\iff$ non-negative extended real-valued function satisfying (i), (ii): unwinding the definition; no $\\sigma$-finiteness or completeness of the measure is needed; the domain must be a $\\sigma$-algebra.\n- countable additivity $\\implies$ finite additivity: also uses $\\mu(\\emptyset)=0$, padding a finite disjoint sequence with empty sets; conversely, finite additivity plus continuity from below recovers countable additivity by taking limits of partial unions.\n- (ii) alone cannot imply (i): the constant $+\\infty$ is countably additive in the extended non-negative real sense but does not vanish on the empty set; if some set has finite measure, one can deduce (i) from its disjoint union with the empty set.\n- finite additivity is not enough for a measure: on the finite-cofinite algebra of $\\mathbb{N}$, assigning zero to finite sets and one to cofinite sets is finitely additive, but the disjoint union of singletons breaks countable additivity; this also shows that the domain there is not yet a $\\sigma$-algebra.",
        status: 'draft',
        basedOn: 'v0.9.3#68503ad7',
      },
    },

    'def.measurable-function': {
      statement: {
        en: "Let $(X, \\mathcal{M})$ and $(Y, \\mathcal{N})$ be measurable spaces. A function $f : X \\to Y$ is **$(\\mathcal{M}, \\mathcal{N})$-measurable** if and only if the preimage of every measurable set is measurable:\n\n$$f^{-1}(E) \\in \\mathcal{M}\\quad  \\forall E \\in \\mathcal{N}$$",
        status: 'draft',
        basedOn: 'v0.9.3#ea186217',
      },
      notes: {
        en: "Why **preimages** rather than images: preimages preserve intersections, unions and complements ($f^{-1}(\\bigcup E_i) = \\bigcup f^{-1}(E_i)$, etc.), whereas images lack these good properties. Measurability is therefore a condition pulled back.\n\nEquivalent formulation (when $Y$ is a topological space and $\\mathcal{N} = \\mathfrak{B}_Y$): $f$ is measurable $\\iff$ the preimage of every open set is measurable.\n\n⚠ \"Measurable on $E$\" is a relative notion: $f$ is measurable on $E$ $\\iff$ $f|_E$ is measurable with respect to the subspace $\\sigma$-algebra $\\mathcal{M}_E$.\n\n**Four characterizations, the cost being \"which family of sets is tested\"**:\n\n- preimages of **open sets** are measurable $\\iff$ preimages of **Borel sets** are measurable: $(\\Leftarrow)$ is clear; $(\\implies)$ uses the fact that preimages preserve $\\sigma$-algebra operations (Borel sets are generated by open sets).\n- $\\iff$ **all level sets $\\{x : f(x) > a\\}$ are measurable** ($a \\in \\mathbb{R}$): **this is the most-used criterion**, since one only has to test a generating family instead of all open sets. ⚠️ Using $\\{f > a\\}$ or $\\{f \\ge a\\}$ both work, **and mixing them is harmless** ($\\{f > a\\} = \\bigcup_{q \\in \\mathbb{Q}, q > a} H_q$, and each $H_q$ may be taken in either form).\n- $\\iff$ **both $f^{+}, f^{-}$ are measurable**: split a real-valued function into positive and negative parts, then handle the non-negative case with $\\{f > a\\}$.\n\n⚠️ **The necessary hypothesis is \"the target carries the Borel $\\sigma$-algebra\"**: measurability on $\\mathbb{R}$ is always relative to some $\\sigma$-algebra; for $\\overline{\\mathbb{R}}$ (including $\\pm\\infty$) **no extra convention is needed**: $\\{f = +\\infty\\} = \\bigcap_n \\{f > n\\}$ and $\\{f = -\\infty\\} = \\bigcap_n \\{f \\le -n\\}$ are automatically measurable from the level sets.\n⚠️ **A composition of measurable functions need not be measurable**: $f$ measurable and $g$ Borel measurable $\\implies$ $g \\circ f$ measurable; but if $g$ is merely Lebesgue measurable this can fail — this is why \"Borel measurable\" and \"Lebesgue measurable\" must be distinguished.",
        status: 'draft',
        basedOn: 'v0.9.3#2e01c79e',
      },
    },

    'def.simple-function': {
      statement: {
        en: "A measurable function $\\varphi : X \\to \\mathbb{C}$ is a **simple function** if and only if it takes only **finitely many values**. Equivalently, it can be written as\n\n$$\\varphi = \\sum_{j=1}^{n} a_j \\chi_{E_j}$$\n\nwhere $a_j \\in \\mathbb{C}$, and the sets $E_j = \\varphi^{-1}(\\{a_j\\}) \\in \\mathcal{M}$ are pairwise disjoint.",
        status: 'draft',
        basedOn: 'v0.9.3#2b53fc9c',
      },
      notes: {
        en: "A simple function is the measurable version of a **step function** — finitely many \"steps\".\n\nIt is the **starting point** of the whole theory of integration: first define the integral for simple functions (a weighted sum), then extend it to all non-negative measurable functions by \"approximating from below by simple functions\".",
        status: 'draft',
        basedOn: 'v0.9.3#75a8987d',
      },
    },

    'def.integral-simple': {
      statement: {
        en: "Let $\\varphi \\in L^+$ be a simple function, written in standard form — non-negative coefficients, pairwise disjoint base sets, all in $\\mathcal{M}$:\n\n$\\varphi = \\sum_{j=1}^{n} a_j \\chi_{E_j}, \\quad  a_j \\ge 0,\\ E_j \\in \\mathcal{M}$, **pairwise disjoint**\n\nThen define\n\n$$\\int \\varphi d\\mu := \\sum_{j=1}^{n} a_j \\mu(E_j)$$",
        status: 'draft',
        basedOn: 'v0.9.3#2d5cc0e7',
      },
      notes: {
        en: "This is exactly \"area $=$ height of each layer $\\times$ measure of each layer\" — written in the same shape as a Riemann sum, only intervals are replaced by measurable sets.\n\nOne must check **well-definedness**: the same $\\varphi$ can be written in different standard forms (for instance by splitting some $E_{j}$ further), but finite additivity of $\\mu$ gives the same result.\n\nConvention $0 \\cdot \\infty = 0$: this step is crucial — it makes the integral of \"the function equal to 0 on a set of infinite measure\" equal to 0, as intuition demands.",
        status: 'draft',
        basedOn: 'v0.9.3#3a4b2ae6',
      },
    },

    'thm.mct': {
      statement: {
        en: "Let $\\{f_n\\} \\subseteq L^+$ be a **pointwise increasing** sequence:\n\n$$f_1 \\le f_2 \\le \\cdots, \\quad  f_n \\uparrow  f$$\n\nThen the integral and the limit can be exchanged:\n\n$$\\int f = \\lim_{n\\to\\infty} \\int f_n$$",
        status: 'draft',
        basedOn: 'v0.9.3#d3286f22',
      },
      notes: {
        en: "⭐ This is the **engine** of the whole Lebesgue integration theory: term-by-term integration, Fatou, and the DCT are all corollaries.\n\nCompare with the Riemann integral: there \"exchanging integral and limit\" needs a strong condition such as uniform convergence; here **monotonicity** alone suffices — that is the entire advantage of the Lebesgue integral.\n\n⚠ Both sides may be $\\infty$; the identity is understood in the extended sense.",
        status: 'draft',
        basedOn: 'v0.9.3#291c7a0a',
      },
    },

    'thm.dct': {
      statement: {
        en: "Let $\\{f_n\\} \\subseteq L^1$, let $f$ be **measurable**, let $f_n \\to f$ a.e., and suppose there is a **dominating function** $g \\in L^1$ such that\n\n$$|f_n| \\le g\\quad  \\text{a.e.}\\quad  \\forall n$$\n\nThen $f \\in L^1$ and\n\n$$\\int f = \\lim_{n\\to\\infty} \\int f_n$$",
        status: 'draft',
        basedOn: 'v0.9.3#02aed00c',
      },
      notes: {
        en: "⭐ This is the convergence theorem **used most often** in actual computation. None of the three hypotheses can be dropped:\n\n$\\cdot \\text{a.e.}$ convergence — cannot be removed (on a one-point probability space $f_{n} = (-1)^{n}$: dominated by $g \\equiv 1$, yet neither the functions nor the integrals converge);\n\n$\\cdot$ the dominating function $g \\in L^{1}$ — cannot be removed ($n\\chi_{[0,1/n]}$ tends to $0$ **almost everywhere** on $[0,1]$ (it fails to converge at $x = 0$), yet its integral is constantly $1$; another example is $\\chi_{[n,n+1]}$, which converges to $0$ **everywhere** while its integral is constantly $1$ and does not tend to $0$ — the defect is the absence of an integrable dominating function, since any dominating function would have to be $\\ge 1$ on all of $\\mathbb{R}$);\n\n$\\cdot$ $g$ must be **integrable**; mere boundedness is not enough (on a space of infinite measure).\n\nWhy \"dominating\": $g$ keeps all the $f_{n}$ inside one integrable cage, so the mass has nowhere to escape and the limiting process cannot lose area.\n\n📌 \"Exchanging integral and limit\" here means **dominated convergence** (pointwise convergence plus an integrable dominating function); the exchange under uniform convergence is `thm.uniform-limit-integral`.",
        status: 'draft',
        basedOn: 'v0.9.3#76f9f632',
      },
    },

    'def.ae': {
      statement: {
        en: "Let $(X, \\mathcal{M}, \\mu)$ be a measure space. A proposition $P(x)$ about a point $x$ holds **almost everywhere** (written a.e.) if and only if\n\n$$\\exists E \\in \\mathcal{M}:\\ \\mu(E) = 0\\ \\wedge \\ \\forall x \\in X \\setminus E,\\ P(x) .$$\n\nthat is, **the set of failure points is contained in some measurable null set** (it need not itself be measurable — a non-Borel subset of the Cantor set in a non-complete space is a counterexample; only after completion are the two formulations equivalent).\n\nCommon uses: $f = g$ a.e. (the set $\\{f \\ne g\\}$ is null), $f_n \\to f$ a.e. (the points of non-convergence form a null set), $F' = 0$ a.e.",
        status: 'draft',
        basedOn: 'v0.9.3#45167866',
      },
      notes: {
        en: "⭐ a.e. is the **lubricant** of Lebesgue theory: elements of $L^1$, $L^p$ are really **equivalence classes of functions** (equal a.e. counts as the same), and almost every convergence theorem (MCT, Fatou, the a.e. version of DCT, Egorov) requires only a.e. convergence — because values on a null set do not contribute to the integral.\n\n⚠ \"Equal a.e.\" and \"equal everywhere\" are different relations: $\\int |f| = 0 \\implies f = 0$ a.e. (not everywhere 0).\n\n⚠ A **subset** of a null set need not be measurable unless the measure space is complete — this is exactly the problem that completion solves.",
        status: 'draft',
        basedOn: 'v0.9.3#b1b3e26f',
      },
    },

    'def.uniform-continuity': {
      statement: {
        en: "Let $X \\subseteq \\mathbb{R}$, $f : X \\to \\mathbb{R}$. Then $f$ is **uniformly continuous** if and only if\n\n$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0,\\ \\forall x, x' \\in X :\\ |x - x'| < \\delta \\implies |f(x) - f(x')| < \\varepsilon$$\n\nThe only difference from \"continuous\" is the **order** of the quantifiers: here $\\delta$ appears before $\\forall x$, so one and the same $\\delta$ must work simultaneously for all points of $X$.",
        status: 'draft',
        basedOn: 'v0.9.3#026589c4',
      },
      notes: {
        en: "⭐ In one sentence: continuity gives \"a $\\delta$ for each point\", uniform continuity gives \"one $\\delta$ that works for all of $X$\".\n\n⚠ The two are **not equivalent**: $f(x) = x^{2}$ is continuous on $\\mathbb{R}$, but for $x = n$, $x' = n + 1/n$ one has $|f(x) - f(x')| = 2 + 1/n^{2} > 2$, which no $\\delta$, however small, can avoid — so it is not uniformly continuous.\n\n$f(x) = 1/x$ on $(0, 1)$ is the same.\n\n⭐ On compact sets the two **coincide** (Cantor's theorem) — this is why elementary calculus can talk only about continuity and still use uniform-continuity properties freely.\n\n⭐ Uniform continuity is the passport for everything that later \"moves limits into integrals / derivatives\": only uniformly convergent sequences of functions preserve continuity and preserve integrals.",
        status: 'draft',
        basedOn: 'v0.9.3#ece91bf7',
      },
    },

    'def.uniform-convergence': {
      statement: {
        en: "With the notation above, $\\{f_n\\}$ **converges uniformly** to $f$ if and only if\n\n$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n \\ge N,\\ \\forall x \\in X :\\ |f_n(x) - f(x)| < \\varepsilon$$\n\nWrite $f_n \\rightrightarrows f$. An equivalent formulation (in terms of the supremum):\n\n$$\\sup_{x \\in X} |f_n(x) - f(x)| \\xrightarrow{\\;n \\to \\infty\\;} 0$$",
        status: 'draft',
        basedOn: 'v0.9.3#4b3f6c88',
      },
      notes: {
        en: "⭐ The only difference from pointwise convergence is the **order of quantifiers**: here $\\exists N$ comes **before** $\\forall x$ — a single $N$ works for the whole domain.\n\n⭐ The supremum form is the most-used criterion: uniform convergence says \"the supremum of the error function tends to zero\", that is, **convergence in the sup norm**.\n\nThis also explains why it is \"convergence in a function space\" rather than \"convergence on a set of points\".\n\n⚠ Uniform convergence $\\implies$ pointwise convergence, but not conversely ($f_n(x) = x^{n}$ on $[0, 1]$).\n\n⭐ The three exchange theorems in this pack (preserving continuity, integrals, derivatives) all need only uniform convergence — and convergence of the kind $f_n(x) = x^{n}$ that \"misses one point\" is exactly what destroys continuity.",
        status: 'draft',
        basedOn: 'v0.9.3#acc41663',
      },
    },

    'def.category': {
      statement: {
        en: "A **category** is a sextuple\n\n$$( \\mathcal{O}, M, s, t, \\circ, i )$$\n\nwhere $(\\mathcal{O}, M, s, t)$ is a **graph**: $\\mathcal{O}$ are the **objects**, $M$ the **morphisms**, $s, t : M \\to \\mathcal{O}$ assigns to each morphism its **source** and **target**, and one writes $f : X \\to Y$ to mean $s(f) = X$ and $t(f) = Y$.\n\nThere are moreover two maps:\n\n**Composition** $\\circ$ is defined on composable pairs of morphisms. Set\n\n$$M \\times_{s,t} M = \\{ (f, g) \\in M \\times M : s(f) = t(g) \\}$$\n\nthis is the set of all pairs of morphisms \"whose target of $g$ equals the source of $f$\"; $\\circ : M \\times_{s,t} M \\to M$ sends $(f, g)$ to $f \\circ g$, and satisfies the **associativity law**\n\n$$h \\circ (g \\circ f) = (h \\circ g) \\circ f$$\n\n(whenever both sides are defined).\n\n**Identity** $i : \\mathcal{O} \\to M$ assigns to each object $X$ a morphism $1_X = i(X)$, satisfying the **identity law**\n\n$$f \\circ 1_X = f = 1_Y \\circ f \\qquad (f : X \\to Y)$$",
        status: 'draft',
        basedOn: 'v0.9.3#73385d3c',
      },
      notes: {
        en: "The crux is the **fiber product** $M \\times_{s,t} M$: composition is not an operation on $M \\times M$, but is defined only on some pairs of morphisms. Composition in a category is thus a **partial operation**, and \"whether $f \\circ g$ is defined\" is itself something to check.\n\nExamples: $\\mathbf{Set}$ (sets and functions), $\\mathbf{Mon}$ (monoids), $\\mathbf{Grp}$ (groups), $\\mathbf{Ab}$ (abelian groups), $\\mathbf{Rng}$ (rings), $G\\text{-}\\mathbf{Set}$ ($G$-sets).\n\n**The simplex category**: $\\mathcal{O} = \\mathbb{N}$,\n\n$$M = \\{ (m, n, f) : m, n \\in \\mathbb{N},\\ f : [m] \\to [n] \\text{increasing} \\}, \\qquad [m] = \\{ 1, \\ldots, m \\}$$\n\nmorphisms are the increasing maps from $m$ to $n$.\n\n**The category of open sets** $\\operatorname{Open}(X)$: given a topological space $(X, \\tau)$, take $\\mathcal{O} = \\tau$,\n\n$$M = \\{ (u, v) : u \\subseteq v \\} \\subseteq \\tau \\times \\tau$$\n\nthat is, \"from a smaller open set to an open set containing it\".",
        status: 'draft',
        basedOn: 'v0.9.3#392a342e',
      },
    },

    'def.functor': {
      statement: {
        en: "A **functor** $F : \\mathcal{C} \\to \\mathcal{D}$ from a category $\\mathcal{C}$ to a category $\\mathcal{D}$ consists of two parts:\n\n- a map on objects $X \\mapsto F(X)$;\n- a map on morphisms $f \\mapsto F(f)$, sending $f : X \\to Y$ to $F(f) : F(X) \\to F(Y)$.\n\nIt is required to **preserve identities** and **preserve composition**:\n\n$$F(1_X) = 1_{F(X)}, \\qquad F(g \\circ f) = F(g) \\circ F(f)$$\n\n(whenever $g \\circ f$ is defined). A functor in the opposite direction $F : \\mathcal{C}^{\\mathrm{op}} \\to \\mathcal{D}$ is called a **contravariant functor**.",
        status: 'draft',
        basedOn: 'v0.9.3#5e2e1d93',
      },
      notes: {
        en: "The two requirements together say one thing: **a functor transports the entire structure of a category verbatim** — identities remain identities, composites remain composites, and even associativity need not be checked again (it follows automatically).\n\nExamples:\n\n- the **forgetful functor** $\\mathbf{Top} \\to \\mathbf{Set}$: $(X, \\tau) \\mapsto X$, treating continuous maps as ordinary maps.\n\nThe topology is discarded, hence \"forgetful\".\n\nLikewise $\\mathbf{Ab} \\to \\mathbf{Set}$, $\\mathbf{Grp} \\to \\mathbf{Mon}$ (inclusion).\n- $\\mathbf{Set} \\to \\mathbf{Top}$ has two: $X \\mapsto (X, \\mathcal{P}(X))$ (discrete topology) and $X \\mapsto (X, \\{ \\emptyset, X \\})$ (trivial topology). Both work, because maps out of a discrete space and into a trivial space are always continuous.\n- **free constructions** $\\mathbf{Set} \\to \\mathbf{Ab}$: $X \\mapsto \\bigoplus_X \\mathbb{Z}$; $\\mathbf{Set} \\to \\mathbf{Grp}$: $X \\mapsto \\langle x, x^{-1} \\mid x \\in X \\rangle$.\n- **abelianization** $\\mathbf{Grp} \\to \\mathbf{Ab}$: $G \\mapsto G / [G, G]$.\n- **groupification** $\\mathbf{Mon} \\to \\mathbf{Grp}$: $M \\mapsto M^{gr} = \\langle x_g \\ (g \\in M) \\mid x_g x_h = x_{gh} \\rangle$.\n- $\\mathbf{Top}^{\\mathrm{op}} \\to \\mathbf{Cat}$: $(X, \\tau) \\mapsto \\operatorname{Open}(X)$. Contravariant, because fewer open sets means more maps.",
        status: 'draft',
        basedOn: 'v0.9.3#ee0c6560',
      },
    },

    'def.natural-transformation': {
      statement: {
        en: "Let $F, G : \\mathcal{C} \\to \\mathcal{D}$ be two functors. A **natural transformation** $\\alpha : F \\implies G$ from $F$ to $G$ is a family of morphisms\n\n$$\\alpha_X : F(X) \\to G(X) \\qquad (X \\in \\mathcal{C})$$\n\nsuch that for every $f : X \\to Y$ the square commutes:\n\n$$G(f) \\circ \\alpha_X = \\alpha_Y \\circ F(f)$$\n\nWhen every $\\alpha_X$ is an isomorphism, $\\alpha$ is called a **natural isomorphism**, written $F \\cong G$.",
        status: 'draft',
        basedOn: 'v0.9.3#d4719ae7',
      },
      notes: {
        en: "In one sentence: the two components of $\\alpha$ control the two ends, and commutativity says that \"changing functor first and then applying $f$\" agrees with \"applying $f$ first and then changing functor\".\n\nWith natural transformations, **functors themselves become objects**: taking functors $\\mathcal{C} \\to \\mathcal{C}'$ as objects and natural transformations as morphisms gives a category denoted $\\operatorname{Hom}(\\mathcal{C}, \\mathcal{C}')$;\n\nthe set of all natural transformations $F \\implies G$ is denoted $\\operatorname{Nat}(F, G)$.\n\nExample: there are two functors $\\mathbf{CRng} \\to \\mathbf{Grp}$ — $A \\mapsto GL_n(A)$ and $A \\mapsto A^{*}$. The determinant\n\n$$\\det_A : GL_n(A) \\to A^{*}$$\n\nassembles into a **natural transformation**: $\\det$ \"commutes with\" ring homomorphisms. This is exactly what \"natural\" means — not a coincidence verified case by case, but forced by structure.",
        status: 'draft',
        basedOn: 'v0.9.3#f569c80b',
      },
    },

    'def.adjoint': {
      statement: {
        en: "Let $F : \\mathcal{C} \\to \\mathcal{D}$, $G : \\mathcal{D} \\to \\mathcal{C}$ be a pair of functors. $(F, G)$ is called a pair of **adjoint functors** if there is a natural isomorphism\n\n$$\\operatorname{Hom}_{\\mathcal{D}}\\bigl(F(X),\\ Y\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}\\bigl(X,\\ G(Y)\\bigr) \\qquad (X \\in \\mathcal{C},\\ Y \\in \\mathcal{D})$$\n\nIn that case write $F \\dashv G$: $F$ is called the **left adjoint** of $G$, and $G$ the **right adjoint** of $F$.",
        status: 'draft',
        basedOn: 'v0.9.3#8be3f401',
      },
      notes: {
        en: "In one sentence: **translations between the two directions are mutually optimal**. Going around the left (apply $F$, then map out) and going around the right (map out, then apply $G$) give the same amount — and **naturally** so.\n\nExamples:\n\n- the forgetful functor $\\mathbf{Top} \\to \\mathbf{Set}$ has **two** adjoints: the left adjoint is the **discrete topology** ($\\operatorname{Hom}_{\\mathbf{Top}}(S_{d}, X) \\cong \\operatorname{Hom}_{\\mathbf{Set}}(S, F(X))$), the right adjoint is the **trivial topology** ($\\operatorname{Hom}_{\\mathbf{Top}}(X, S_{t}) \\cong \\operatorname{Hom}_{\\mathbf{Set}}(F(X), S)$).\n- the left adjoint of the forgetful functor $\\mathbf{Ab} \\to \\mathbf{Set}$ is the **free abelian group**: $\\operatorname{Hom}_{\\mathbf{Ab}}(\\mathbb{Z}^{(X)}, M) \\cong \\operatorname{Hom}_{\\mathbf{Set}}(X, \\operatorname{forget} M)$.\n\n**Free is left adjoint to forgetful**.\n\nTwo rules of computation:\n\n- **duality**: $F \\dashv G$ $\\iff$ $G^{\\mathrm{op}} \\dashv F^{\\mathrm{op}}$ (on $\\mathcal{C}^{\\mathrm{op}} \\to \\mathcal{D}^{\\mathrm{op}}$).\n- **composition**: $F \\dashv G$ and $F' \\dashv G'$ $\\implies$ $F' \\circ F \\dashv G \\circ G'$, because\n\n$$\\operatorname{Hom}(F'F(X), Y) \\cong \\operatorname{Hom}(F(X), G'(Y)) \\cong \\operatorname{Hom}(X, GG'(Y))$$",
        status: 'draft',
        basedOn: 'v0.9.3#fff1c5e4',
      },
    },

    'def.group': {
      statement: {
        en: "Let $G$ be a **set** and $\\cdot$ a **binary operation** on $G$ (that is, a function $G \\times G \\to G$, $(a, b) \\mapsto a \\cdot b$). Then $(G, \\cdot)$ is a **group** if and only if:\n\n- **associativity**: $(a b) c = a (b c)$ for all $a, b, c \\in G$;\n- **identity**: there exists $e \\in G$ such that $e a = a e = a$ for all $a$;\n- **inverses**: for every $a \\in G$ there exists $a^{-1} \\in G$ such that $a a^{-1} = a^{-1} a = e$.\n\nA group that also satisfies the **commutative law** $a b = b a$ is called an **abelian group**, or **commutative group**.",
        status: 'draft',
        basedOn: 'v0.9.3#dc564295',
      },
      notes: {
        en: "⭐ **The format is again \"set + operation + axioms\"**: a group is not an object out of nowhere — one set, one function and three identities determine it. To decide whether something is a group, check these identities one by one.\n\n**The identity and inverses are unique**: if $e, e'$ are both identities, then $e = e e' = e'$; if $a^{-1}, a'$ are both inverses of $a$, then $a' = a' e = a' a a^{-1} = e a^{-1} = a^{-1}$. Hence the notations \"$e$\" and \"$a^{-1}$\" are legitimate.\n\n**Examples and counterexamples**: $(\\mathbb{Z}, +)$ is an abelian group; $(\\mathbb{Q} \\setminus \\{0\\}, \\cdot)$ is an abelian group; $(\\mathbb{Z}, \\cdot)$ is **not** a group (only $\\pm 1$ have multiplicative inverses);\n\n$n \\times n$ invertible matrices form a group under multiplication but **not** an abelian one ($n \\ge 2$).\n\n📌 There is a weaker layer: requiring only associativity and an identity, but not inverses, gives a **monoid**. ($\\mathbb{N}$ under addition is a monoid but not a group.)\n\n**Which hypothesis each direction uses** (a group is defined by axioms; shorter criteria must keep their ambient hypotheses):\n- group $\\iff$ associativity, two-sided identity and two-sided inverses: unwinding the definition, with no commutativity requirement.\n- group $\\implies$ uniqueness of identity and inverses: cancellation using associativity and the two-sided identity/inverse identities; no axiom of choice is needed to select inverses, since the inverse is already unique.\n- every element invertible in a monoid $\\implies$ group: direct expansion; cancellation alone is not enough, since the non-negative integers under addition satisfy cancellation but positive elements have no inverses.\n- finite non-empty cancellation semigroup $\\implies$ group: left and right multiplication are injective, hence bijective by finiteness, which yields a common identity and inverses; the infinite counterexample above shows finiteness cannot be dropped.",
        status: 'draft',
        basedOn: 'v0.9.3#3dae59fa',
      },
    },

    'def.ring': {
      statement: {
        en: "Let $A$ be a **set** and $+$, $\\cdot$ two **binary operations** on $A$. Then $(A, +, \\cdot)$ is a **ring** if and only if:\n\n- $(A, +)$ is an **abelian group**;\n- $(A, \\cdot)$ satisfies **associativity** (no identity and no commutativity is required);\n- the **distributive laws** $a(b + c) = ab + ac$, $(a + b)c = ac + bc$ hold.\n\nA ring whose multiplication is also commutative is called a **commutative ring**; a ring that moreover has a multiplicative identity $1 \\ne 0$ is called a **ring with identity**.",
        status: 'draft',
        basedOn: 'v0.9.3#ec2b13e2',
      },
      notes: {
        en: "⭐ **Again \"set + operations + axioms\"**, and this layer directly **cites** the abelian group below: the additive axioms are not rewritten, just mentioned in one phrase.\n\n**Contrast with a field**: a field requires every non-zero element to be invertible ($(F\\setminus\\{0\\}, \\cdot)$ is an abelian group), a ring **does not**.\n\nSo a field is a special case of a ring, and $\\mathbb{Z}$ is a ring but not a field — this is exactly where the counterexample $\\mathbb{Z}$ in the definition of a field comes from.\n\n**Which hypothesis each direction uses** (here the definition is axiomatic; commutativity and identity are extra requirements):\n- ring $\\iff$ additive abelian group, associative multiplication, left and right distributivity: unwinding the definition adopted in this node; no axiom of choice is needed, nor is a field or PID required.\n- commutative ring $\\implies$ ring, ring with identity $\\implies$ ring: just forget extra structure; neither converse is free — $M_2(\\mathbb{R})$ is not commutative, and $2\\mathbb{Z}$ has no identity under the usual multiplication.\n- adding commutative multiplication $\\iff$ commutative ring; adding an identity together with the convention $1\\ne0$ of this library $\\iff$ ring with identity: still definitional; a ring with identity here is not required to be commutative.\n- field $\\implies$ commutative ring with identity: expand the field axioms; the converse also needs every non-zero element invertible, with $\\mathbb{Z}$ as a counterexample. The zero ring satisfies the ring axioms but not the convention $1\\ne0$ for rings with identity adopted in this node.",
        status: 'draft',
        basedOn: 'v0.9.3#af31758a',
      },
    },

    'def.field': {
      statement: {
        en: "Let $F$ be a **set** and $+$, $\\cdot$ two **binary operations** on $F$ (that is, two functions $F \\times F \\to F$). Then $(F, +, \\cdot)$ is a **field** if and only if:\n\n- $(F, +)$ is an **abelian group**;\n- $(F \\setminus \\{0\\}, \\cdot)$ is an **abelian group** (here $0$ is the identity of the additive group);\n- the **distributive law** $a (b + c) = ab + ac$ holds for all $a, b, c \\in F$.\n\nIn one sentence: **addition, subtraction, multiplication and division (by non-zero elements) are all closed, and associativity, commutativity and distributivity hold**.",
        status: 'draft',
        basedOn: 'v0.9.3#3f226727',
      },
      notes: {
        en: "⭐ **The format is \"set + operations + axioms\"**: a field is not an object out of nowhere — one set, two functions and a few identities determine it.\n\nTo decide whether something is a field, check these identities one by one.\n\nNote that the three items above **cite** the two axiom groups of a group directly: the definition of a field is **one layer on top of the definition of a group**, not a fresh enumeration of identities.\n\nConstructions already available:\n- $\\mathbb{Q}$ (rationals): the handiest field;\n\n- $\\mathbb{R}$ (reals): after constructing it from Cauchy sequences, verify that it satisfies these identities (see \"$\\mathbb{R}$ is a complete ordered field\");\n\n- $\\mathbb{Z}$ is **not** a field: $2$ has no multiplicative inverse in it;\n\n$\\mathbb{N}$ is not either: $1 - 2$ is meaningless.\n\n⚠ \"field\" here is not the same as the \"ring\" of measure theory: there a ring is a **ring of sets**, meaning a **family of sets** closed under finite unions and differences — same name, different object.\n\n**Which hypothesis each direction uses** (the compressed form of the field axioms relies on the two groups of group axioms):\n- field $\\iff$ additive abelian group, multiplicative abelian group on non-zero elements, and distributivity: unwinding the definition of this node; the non-zero elements forming a group also makes them non-empty, hence $0\\ne1$.\n- field $\\implies$ division by non-zero elements and no zero divisors: multiplicative inverses give cancellation, and absorption of zero follows from distributivity and additive cancellation; no axiom of choice is needed.\n- non-zero commutative ring with identity in which every non-zero element is invertible $\\implies$ field: verify the group conditions directly; \"non-zero\" cannot be dropped, since the zero ring satisfies the conditions vacuously on non-zero elements yet is not a field.\n- integral domain $\\implies$ field fails in general, e.g. the integers; a finite integral domain does work, since multiplication by a non-zero element is injective and hence bijective on a finite set; finiteness is the key.",
        status: 'draft',
        basedOn: 'v0.9.3#0ef25fcc',
      },
    },

    'def.homeomorphism': {
      statement: {
        en: "Let $X$ and $Y$ be topological spaces. $f : X \\to Y$ is a **homeomorphism** if and only if\n\n- $f$ is a bijection;\n- both $f$ and $f^{-1}$ are continuous.\n\nIn that case we write $X \\cong Y$ and call the two spaces **homeomorphic**. Homeomorphism is an equivalence relation between topological spaces (identity, inverse and composition all preserve it).",
        status: 'draft',
        basedOn: 'v0.9.3#e2bfa0cb',
      },
      notes: {
        en: "⭐ A homeomorphism means \"topologically indistinguishable\": every **topological property** (compactness, connectedness, Hausdorff, closure) is preserved.\n\n⚠ The converse also deserves care: **metric properties change under a homeomorphism**.\n\n$\\mathbb{R}$ is homeomorphic to the open interval $(0, 1)$ ($x \\mapsto \\frac{1}{2} + \\frac{1}{\\pi}\\arctan x$), yet the former is complete and the latter is not — the classic example that completeness is not a topological property, and the dividing line between the \"compact / closed\" and the \"complete / totally bounded\" families of properties in metric spaces.\n\n**Three equivalent formulations, differing in which side (open/closed) is used**:\n\n- definition (bijection + $f$, $f^{-1}$ continuous) $\\iff$ **$f$ is a continuous open bijection** $\\iff$ **$f$ is a continuous closed bijection**: $(\\implies)$ continuity of $f^{-1}$ makes $f$ open; $(\\Leftarrow)$ openness of $f$ makes $f^{-1}$ continuous. **Both steps use only the duality between open and closed sets; no extra hypothesis is needed.**\n- **a continuous bijection need not be a homeomorphism**: extra hypotheses are required, the two most common being \"compact $\\to$ Hausdorff\" (arguments of the `prop.compact-subset-closed` type) and the open mapping theorem (`thm.open-mapping-banach`, a continuous **linear** bijection between Banach spaces). ⚠️ So the incorrect slogan \"homeomorphism = continuous bijection\" is true only in the **compact Hausdorff** and **Banach** settings.\n\n⚠️ A homeomorphism is an **isomorphism** in the category of topological spaces: it preserves every topological property (connectedness, compactness, countability, separation), which is exactly its meaning as an \"equivalence relation\".",
        status: 'draft',
        basedOn: 'v0.9.3#0c2e9b57',
      },
    },

    'def.metrizable': {
      statement: {
        en: "A topological space $(X, \\mathcal{T})$ is called **metrizable** if there is a distance $d$ on $X$ such that the topology induced by $d$ is exactly $\\mathcal{T}$:\n\n$$\\mathcal{T}_{d} = \\mathcal{T},\\qquad \\mathcal{T}_{d} := \\{\\, U \\subseteq X : \\forall x \\in U\\ \\exists r > 0,\\ B_{d}(x, r) \\subseteq U \\,\\}.$$\n\nEquivalently, $X$ is **homeomorphic** to some metric space, i.e. there is a metric compatible with $\\mathcal{T}$.",
        status: 'draft',
        basedOn: 'v0.9.3#dc8b1458',
      },
      notes: {
        en: "**\"There exists a metric\", not \"a metric is specified\"**: the same topology can carry many metrics ($d$ and $\\min(d, 1)$ induce the same topology), so metrizability is a purely topological property, invariant under homeomorphism. \"Complete\", \"bounded\" and \"uniformly continuous\" are not topological properties — they change when the metric is replaced.\n\n⭐ **This is a dividing line for theorems**: a metrizable space automatically acquires Hausdorff, first countability, normality and paracompactness (propositions in this cluster), so every tool available on metric spaces applies. Conversely, second countability $+$ regularity suffices (Urysohn's theorem), and a weaker sufficient condition is a $\\sigma$-locally finite base (Nagata–Smirnov).\n\n⚠️ Not every topological space is metrizable: an uncountable discrete space is metrizable (discrete metric) yet not second countable, while the Sorgenfrey line (lower-limit topology) is normal, separable and first countable but not second countable, hence **not** metrizable.",
        status: 'draft',
        basedOn: 'v0.9.3#e0cea3b6',
      },
    },

    'thm.tykhonov': {
      statement: {
        en: "The **product** of any family of compact spaces (with the product topology) is again compact — for any number of factors, including uncountably many.",
        status: 'draft',
        basedOn: 'v0.9.3#c541f98f',
      },
      notes: {
        en: "**Proof (Alexander's subbase lemma + the axiom of choice).** Write $X = \\prod_{i\\in I} X_{i}$, with projections $p_{i} : X\\to X_{i}$. Take the **subbase**\n$$\\mathcal{S} := \\{\\, p_{i}^{-1}(U_{i}) \\;:\\; i\\in I,\\ U_{i}\\subseteq X_{i}\\ \\text{open} \\,\\}.$$\n**Alexander's subbase lemma**: a topological space is compact $\\iff$ every cover by members of a subbase has a finite subcover. So it suffices to verify the latter.\nLet $\\mathcal{S}_{0} \\subseteq \\mathcal{S}$ cover $X$, and suppose it has **no** finite subcover. For each $i$ put\n$$\\mathcal{U}_{i} := \\{\\, U_{i} : p_{i}^{-1}(U_{i}) \\in \\mathcal{S}_{0} \\,\\},\\qquad F_{i} := X_{i}\\setminus \\bigcup \\mathcal{U}_{i}.$$\n- **$F_{i} \\ne \\emptyset$**: otherwise $\\mathcal{U}_{i}$ is an open cover of the compact space $X_{i}$; take a finite subcover $U_{1},\\ldots,U_{n}$, and the corresponding $p_{i}^{-1}(U_{1}),\\ldots,p_{i}^{-1}(U_{n})$ are a finite subcover of $X$ — contradicting the assumption ✓.\n- By the **axiom of choice** choose $x_{i} \\in F_{i}$, and set $x := (x_{i})_{i\\in I} \\in X$.\n- Then for every $p_{i}^{-1}(U_{i})\\in \\mathcal{S}_{0}$ we have $x_{i} \\notin U_{i}$ (because $x_{i}\\in F_{i}$), so $x \\notin p_{i}^{-1}(U_{i})$ holds for **all** members — contradicting that $\\mathcal{S}_{0}$ covers $X$ ✓.\nThus every subbase cover has a finite subcover, and by Alexander's lemma $X$ is compact. ∎\n(Alexander's lemma itself: if a family of covers has no finite subcover, use Zorn's lemma to enlarge it to a maximal such family $\\mathcal{M}$; then choosing the \"non-$\\mathcal{M}$ members\" produces data attached to the subbase, and one deduces step by step that $\\mathcal{M}$ is actually a cover — a contradiction.)\n\n⭐ **Tychonoff's theorem is equivalent to the axiom of choice** (they imply each other in ZF) — a standard gauge of how strong the axiom of choice is.",
        status: 'draft',
        basedOn: 'v0.9.3#f5786987',
      },
    },

    'def.one-point-compactification': {
      statement: {
        en: "**What it does**: the most economical way of adding a single point — add **one** point $\\infty$ so that every sequence running off to infinity converges to it. The passage from $\\mathbb{R}^{n}$ to $S^{n}$, and from $\\mathbb{C}$ to the Riemann sphere, are both instances of this construction.\n\nLet $X$ be a topological space. Take $X^{*} := X \\sqcup \\{\\infty\\}$, with the topology whose open sets are\n\n1. the open sets of $X$;\n2. sets of the form $U \\cup \\{\\infty\\}$, where $U \\subseteq X$ is open and $X \\setminus U$ is **compact** in $X$.\n\n$X^{*}$ is called the **one-point compactification** of $X$ (also the Alexandrov compactification).\n\n**Theorem**:\n\n- $X^{*}$ is **compact** (for arbitrary $X$);\n- $X^{*}$ is **Hausdorff** $\\iff$ $X$ is a locally compact Hausdorff space.",
        status: 'draft',
        basedOn: 'v0.9.3#bb5c0641',
      },
      notes: {
        en: "⭐ **The topological intuition**: $U \\cup \\{\\infty\\}$ is open $\\iff$ its complement is compact. Thus \"the complement of $X$ is compact\" is exactly \"a neighbourhood of $\\infty$\" — the space around the point at infinity is precisely \"what remains after $X$ runs off\". Accordingly, a $\\infty$-neighbourhood of $\\mathbb{R}^{n}$ is \"the outside of the ball\", and $S^{n}$ is the north pole.\n\n⭐ **Standard examples**: $(\\mathbb{R}^{n})^{*} \\cong S^{n}$ (stereographic projection; when $n = 1$, $\\mathbb{R} \\cup \\{\\infty\\} \\cong S^{1}$);\n\n$\\mathbb{C}^{*} \\cong S^{2}$ is the **Riemann sphere**, on which complex analysis treats $\\infty$ as an ordinary point;\n\nthe one-point compactification of $\\mathbb{N}$ is $\\{1/n\\} \\cup \\{0\\}$.\n\n⚠️ **Why local compactness is indispensable**: when $X$ is not locally compact, $X^{*}$ is not Hausdorff — intuitively, \"a neighbourhood of $\\infty$\" is too large and always meets the neighbourhood of some point. So existence and Hausdorffness of the one-point compactification are **two separate matters**: $X^{*}$ is always compact, but making it Hausdorff costs local compactness.\n\n⚠️ **Relation to `imp.lch-cr`**: that implication proves \"locally compact Hausdorff spaces are completely regular\" using exactly \"$X^{*}$ is compact Hausdorff $\\implies$ normal, $\\implies$ a Urysohn function can be built on $X^{*}$ and pulled back\". The one-point compactification is the standard interface for **transferring the good properties of compact spaces to $X$**.\n\n**The two conclusions rest on completely different hypotheses** (which is why they deserve separate statements):\n\n- **$X^{*}$ is compact: no hypothesis is needed**. Take any open cover of $X^{*}$; some member contains $\\infty$ (call it $U\\cup\\{\\infty\\}$), so $X\\setminus U$ is compact; it is covered by the remaining open sets, compactness yields a finite subcover, and adding $U\\cup\\{\\infty\\}$ itself gives a finite subcover. The whole argument uses only \"an open cover of a compact set has a finite subcover\" — **neither Hausdorffness nor local compactness is used**.\n- **$X^{*}$ is Hausdorff $\\iff$ $X$ is locally compact Hausdorff**: both directions cost something.\n  $\\cdot$ ($\\Leftarrow$) uses **local compactness**: given $x \\in X$, separating it from $\\infty$ requires \"a compact neighbourhood $K$ of $x$\", so $X\\setminus K$ is open and $K^{\\circ}$ is an open neighbourhood of $x$, the two disjoint. **Without local compactness this compact neighbourhood cannot be produced**.\n  $\\cdot$ ($\\implies$): deriving Hausdorffness of $X$ from that of $X^{*}$ is free (subspaces inherit it); deriving local compactness uses **closedness of compact sets**: an open neighbourhood $U\\cup\\{\\infty\\}$ of $\\infty$ has $X\\setminus U$ compact, so the closure of $U$ in $X$ … — this direction is exactly the use of \"compact sets are closed in a compact Hausdorff space\".\n\n⚠️ **So \"the one-point compactification always exists\" must be read carefully**: $X^{*}$ always exists as a compact space; but it is **Hausdorff** only when $X$ is locally compact Hausdorff. Many textbooks state only the former, so beginners conclude that \"every space can be compactified\" — **false**: those admitting a Hausdorff compactification are exactly the locally compact Hausdorff spaces.\n\n⚠️ **Why neighbourhoods of $\\infty$ look like that**: \"compact complement\" in the second axiom is not arbitrary — if the neighbourhood is $U\\cup\\{\\infty\\}$, then points \"running to infinity\" must eventually lie in $U$, i.e. eventually leave $X\\setminus U$; requiring $X\\setminus U$ to be compact is exactly what aligns \"leaving it\" with \"compactness\", making $X^{*}$ compact.",
        status: 'draft',
        basedOn: 'v0.9.3#8b664d9f',
      },
    },

    'def.filter': {
      statement: {
        en: "**What it does**: rewrite convergence in the language of **families of sets**. A filter abstracts the phrase \"eventually falls into a given set\", so limits can be discussed without mentioning indices, only families of sets — the handiest tool at the interface of set theory and topology.\n\nLet $X$ be a topological space. A nonempty family $\\mathcal{F} \\subseteq \\mathcal{P}(X)$ is a **filter** if\n\n1. $\\emptyset \\notin \\mathcal{F}$, $X \\in \\mathcal{F}$;\n2. upward closed: $F \\in \\mathcal{F}$ and $F \\subseteq G$ $\\implies$ $G \\in \\mathcal{F}$;\n3. closed under finite intersections: $F, G \\in \\mathcal{F}$ $\\implies$ $F \\cap G \\in \\mathcal{F}$.\n\n**Convergence**: $\\mathcal{F} \\to x$ if every neighbourhood of $x$ belongs to $\\mathcal{F}$ (i.e. $\\mathcal{N}(x) \\subseteq \\mathcal{F}$).\n\nAn **ultrafilter** is a maximal filter. Equivalently, for every $A \\subseteq X$, **exactly one** of $A$ and $X \\setminus A$ belongs to $\\mathcal{U}$.\n\n**Ultrafilter lemma**: every filter is contained in an ultrafilter (using Zorn's lemma, `lem.zorn`).",
        status: 'draft',
        basedOn: 'v0.9.3#9f9ad3dd',
      },
      notes: {
        en: "⭐ **What filters are for: a clean characterization of compactness**: $X$ is compact $\\iff$ every ultrafilter converges (equivalently, every filter has a cluster point). This is shorter than the net version, because the \"subnet\" step is absorbed by maximality of the ultrafilter.\n\n⭐ **The ultrafilter lemma cannot be dispensed with**: it is not a theorem but **a small piece of the axiom of choice** (strictly weaker than AC, but equivalent to the Boolean prime ideal theorem). So every proof that \"takes an ultrafilter\" is secretly using choice — in contrast with the family of arguments in `thm.paracompact-hausdorff-normal` that use **only compactness**.\n\n⚠️ **The neighbourhood system of the filter $\\ne$**: $\\mathcal{N}(x)$ itself is a filter (the neighbourhood filter), whereas a general filter may **fail to converge**. Convergence depends on whether it contains some $\\mathcal{N}(x)$.\n\n⚠️ **Name clash with \"filter\" in category theory**: `prop.covering-sieves-filter` concerns the filteredness of sieves in a Grothendieck topology, and is **unrelated** to the set-theoretic filter here.\n\n**Of the three axioms, \"closed under finite intersections\" is the only one with content** (the other two are almost mere normalization):\n\n- $\\emptyset \\notin \\mathcal{F}$ and $X \\in \\mathcal{F}$: **normalization**. Requiring the family to be nonempty and to omit the empty set, together with upward closure, automatically gives $X$.\n- **Upward closure**: part of the definition; dropping it leaves a \"filter base\", for which one must additionally require that any two members have a smaller member.\n- **Closure under finite intersections**: **this is the real condition**, and the reason filters can be translated into nets (`eq.net-filter`).\n\n**Two ways of writing convergence**: $\\mathcal{F} \\to x$ $\\iff$ $\\mathcal{N}(x) \\subseteq \\mathcal{F}$ $\\iff$ $\\mathcal{F}$, which is **finer** than the neighbourhood filter. ⚠️ The direction is easy to invert: **the larger (finer) the filter, the easier it converges**.\n\n**The ultrafilter lemma (every filter lies in an ultrafilter) needs Zorn's lemma** — the only dependence on AC in this chain. It also makes the characterization \"compact $\\iff$ every ultrafilter converges\" **non-constructive**.\n\n⚠️ Unrelated to \"filteredness\" in category theory (`def.filtered-category`); the two share only the word \"filter\".",
        status: 'draft',
        basedOn: 'v0.9.3#e0cecc2b',
      },
    },

    'def.interval': {
      statement: {
        en: "An **interval** of $\\mathbb{R}$ is a subset $I$ satisfying\n\n$$a, b \\in I,\\ a \\le x \\le b \\implies x \\in I$$\n\ni.e. it has \"no gaps\". The usual bounded intervals are written\n\n$$(a, b), \\quad [a, b], \\quad [a, b), \\quad (a, b]$$\n\ndistinguished by whether the endpoints are included; there are also the unbounded intervals $(-\\infty, b)$, $(a, +\\infty)$, $\\mathbb{R}$, and the singleton $[a, a]$.\n\nIts **length** (the convention of Lebesgue measure $m$) is $b - a$ (requiring $a \\le b$; for $a > b$, $(a, b] = \\emptyset$, which needs a separate convention).",
        status: 'draft',
        basedOn: 'v0.9.3#e01ecf78',
      },
      notes: {
        en: "⭐ **The half-open interval $\\{ (a, b] : a < b \\}$ is the starting point for constructing Lebesgue–Stieltjes measure**: it is only a basic class; finite disjoint unions give a ring, and length is already a premeasure on that ring.\n\nWhy half-open rather than open intervals: lengths of disjoint unions are easy to compute — $[a, b) \\sqcup [b, c) = [a, c)$ fails for open intervals.",
        status: 'draft',
        basedOn: 'v0.9.3#6328540b',
      },
    },

    'def.derivative': {
      statement: {
        en: "$F : (a, b) \\to \\mathbb{C}$ is **differentiable** at $x_0 \\in (a, b)$ if and only if the limit\n\n$$F'(x_0) := \\lim_{h \\to 0} \\frac{F(x_0 + h) - F(x_0)}{h}$$\n\nexists (and is finite). This number is the **derivative** of $F$ at $x_0$.\n\nIf it is differentiable everywhere on $(a, b)$, we obtain a function $F'$; $F$ is then called **differentiable**.\n\nIf the limit is not required to exist and $\\pm\\infty$ is allowed, one obtains the **generalized derivative**, which is needed in the theory of derivatives of monotone functions.",
        status: 'draft',
        basedOn: 'v0.9.3#ac920c3f',
      },
      notes: {
        en: "⭐ Differentiation theory cares about **pointwise** behaviour, so the domain is often shrunk to $L^1_{loc}$ rather than $L^1$.\n\nKey points (the BV / AC chain relies on all of them):\n- differentiability $\\implies$ continuity, but not conversely ($|x|$ at $0$).\n\n- A monotone **increasing** function is **differentiable almost everywhere**, and $F' \\ge 0$ a.e. (for decreasing functions, $F' \\le 0$).\n\n- **Differentiability a.e. does not guarantee** $F(b) - F(a) = \\int_a^b F'$ (the Cantor function is continuous everywhere, differentiable a.e., and $F' = 0$ a.e., yet $F(1) - F(0) = 1 \\ne 0$; note that it is **not differentiable everywhere**: at $1/3$ the one-sided difference quotients $0$ and $(3/2)^{k} \\to \\infty$ differ);\n\nEquality requires absolute continuity.",
        status: 'draft',
        basedOn: 'v0.9.3#b97be3dc',
      },
    },

    'def.function-limit': {
      statement: {
        en: "Let $f$ be defined on a **punctured neighbourhood** of $x_0$, with $L \\in \\mathbb{R}$. We say that $f(x)$ tends to $L$ as $x \\to x_0$ (written $\\lim_{x \\to x_0} f(x) = L$) if and only if\n\n$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0 :\\ 0 < |x - x_0| < \\delta \\implies |f(x) - L| < \\varepsilon$$\n\n**Heine characterization**: $\\lim_{x \\to x_0} f(x) = L$ if and only if for every sequence with $x_n \\ne x_0$ and $x_n \\to x_0$, we have $f(x_n) \\to L$.\n\nReplacing $0 < |x - x_0| < \\delta$ by other ranges ($x > M$, $x \\to x_0^{+}$, $|x| > M$, etc.) yields $x \\to \\pm\\infty$, one-sided limits and various other variants.",
        status: 'draft',
        basedOn: 'v0.9.3#fa811121',
      },
      notes: {
        en: "⭐ The only difference from the limit of a **sequence** is this: here the variable approaches continuously, so an extra quantifier $\\delta$ is needed to control \"how close is close enough\".\n\nThe whole novelty of the $\\varepsilon$-$\\delta$ language lies in this two-level quantifier.\n\n⚠ **Puncturing** is essential: the point $x = x_0$ does not participate in the limit, so whether $f$ is defined at $x_0$, and with what value, does not affect the limit.\n\nFor the same reason, \"the limit exists and equals $f(x_0)$\" can serve as the definition of **continuity**.\n\n⚠ A limit, if it exists, is unique — the proof is the same as in the sequence case (split $\\varepsilon$ between the two points).",
        status: 'draft',
        basedOn: 'v0.9.3#c2c83665',
      },
    },

    'thm.squeeze': {
      statement: {
        en: "**(Sequences)** Suppose there is $N_0$ such that $a_n \\le x_n \\le b_n$ for all $n \\ge N_0$. If $a_n \\to L$ and $b_n \\to L$, then $x_n \\to L$.\n\n**(Functions)** Suppose $g(x) \\le f(x) \\le h(x)$ holds on some punctured neighbourhood of $x_0$. If\n\n$$\\lim_{x \\to x_0} g(x) = \\lim_{x \\to x_0} h(x) = L$$\n\nthen $\\lim_{x \\to x_0} f(x) = L$.",
        status: 'draft',
        basedOn: 'v0.9.3#03a41405',
      },
      notes: {
        en: "⭐ The squeeze theorem is one of the **few tools that can assert the existence of a limit without knowing its value in advance** (the other two are the monotone bounded theorem and the Cauchy criterion).\n\nIts most typical uses are defining $e$, proving $\\lim_{n} q^{n} = 0$ ($|q| < 1$), and $\\lim_{n} \\sqrt[n]{n} = 1$.\n\n⚠ Both hypotheses are indispensable: the function must be squeezed **on both sides**, and the two outer limits must be **equal**.\n\nSqueezing on one side alone yields no conclusion at all.",
        status: 'draft',
        basedOn: 'v0.9.3#fb1ae0ad',
      },
    },

    'def.limsup-liminf': {
      statement: {
        en: "For a sequence of real numbers $\\{x_n\\}$, set\n\n$$\\limsup_{n \\to \\infty} x_n := \\lim_{n \\to \\infty} \\Bigl( \\sup_{k \\ge n} x_k \\Bigr), \\qquad \\liminf_{n \\to \\infty} x_n := \\lim_{n \\to \\infty} \\Bigl( \\inf_{k \\ge n} x_k \\Bigr)$$\n\n($n \\mapsto \\sup_{k \\ge n} x_k$ is monotone decreasing and $n \\mapsto \\inf_{k \\ge n} x_k$ is monotone increasing, so both limits in $\\overline{\\mathbb{R}}$ **always exist**.)\n\nMoreover, the limit of the sequence exists (allowing the value $\\pm\\infty$) if and only if the upper and lower limits agree, i.e.\n\n$$\\liminf_{n \\to \\infty} x_n = \\limsup_{n \\to \\infty} x_n$$",
        status: 'draft',
        basedOn: 'v0.9.3#664d7f81',
      },
      notes: {
        en: "⭐ The upper limit is \"the largest of the limits of all convergent subsequences\" (counting $\\pm \\infty$ as well) — hence **every** sequence of real numbers has upper and lower limits, whereas only convergent sequences have a limit: they are a **relaxed version** of the limit.\n\n⭐ Their appearance in measure theory is crucial: Fatou's lemma is exactly $\\int \\liminf f_n \\le \\liminf \\int f_n$ (**requiring $f_n \\ge 0$**, or $f_n \\ge g \\in L^{1}$; otherwise a counterexample: on $\\mathbb{R}$, for $f_n = -\\mathbf{1}_{[n,n+1)}$, the left-hand side is $0$ and the right-hand side is $-1$) — no \"limit\" is available there, because $f_n$ need not converge.\n\n⚠ $\\limsup$ and $\\sup$ are not the same thing: $\\sup_n x_n$ is the supremum of all terms, whereas $\\limsup_n x_n$ looks only at the **tail**; thus for $x_n = (-1)^{n}$ we have $\\sup x_n = 1$, while $\\limsup x_n = 1$ and $\\liminf x_n = -1$.",
        status: 'draft',
        basedOn: 'v0.9.3#31991fc1',
      },
    },

    'thm.ivt': {
      statement: {
        en: "Let $f$ be continuous on $[a, b]$, and let $c$ be **any** real number between $f(a)$ and $f(b)$. Then there exists $\\xi \\in [a, b]$ with\n\n$$f(\\xi) = c$$",
        status: 'draft',
        basedOn: 'v0.9.3#49326a89',
      },
      notes: {
        en: "⭐ Geometric content: in passing from $f(a)$ to $f(b)$, the graph of a continuous function **cannot skip any intermediate value** — a continuous function maps an interval to an interval.\n\n⭐ This is the most frequently used existence tool in elementary analysis: existence of roots, of inverse functions, of fixed points, and comparison of intermediate values all follow from it.\n\nIt also has **constructive** content: the bisection method used in the proof is itself a root-finding algorithm, and every step is computable.\n\n⚠ It guarantees only **existence**, not uniqueness ($x^{3} - x$ has three zeros on $[-2, 2]$);\n\nuniqueness requires an additional assumption of **strict monotonicity**.\n\n⚠ It uses completeness of $\\mathbb{R}$ (the least-upper-bound principle), not compactness: with $[a, b]$ replaced by a general connected space it still holds, and that is the fixed-point / connectedness branch.",
        status: 'draft',
        basedOn: 'v0.9.3#b19a6984',
      },
    },

    'thm.evt': {
      statement: {
        en: "Let $X$ be a **nonempty** compact metric space and $f : X \\to \\mathbb{R}$ continuous. Then $f$ **attains** its maximum and minimum: there exist $x_{\\min}, x_{\\max} \\in X$ such that for all $x \\in X$,\n\n$$f(x_{\\min}) \\le f(x) \\le f(x_{\\max})$$",
        status: 'draft',
        basedOn: 'v0.9.3#6638507a',
      },
      notes: {
        en: "⭐ \"Being bounded\" and \"attaining an extremum\" are two different things, which is why they are separate nodes here: boundedness says only that $\\sup f(X)$ is **finite**, while attaining an extremum says that this supremum is **actually reached at some point**.\n\nCompactness is responsible for the latter.\n\n⚠ Replacing the space by an open interval makes it fail at once: $f(x) = x$ is bounded on $(0, 1)$, yet attains neither a maximum nor a minimum.\n\n⭐ The commonly used form over $\\mathbb{R}$: **a continuous function on a closed interval $[a, b]$ attains its extrema** — the first step of the proof is that a closed interval is compact (Heine–Borel).\n\nThe whole procedure for finding extrema in elementary calculus (locate critical points and compare endpoints) rests on this.",
        status: 'draft',
        basedOn: 'v0.9.3#77b1f6c0',
      },
    },

    'def.pointwise-convergence': {
      statement: {
        en: "Let $f_n : X \\to \\mathbb{R}$ ($n = 1, 2, \\ldots$) and $f : X \\to \\mathbb{R}$. We say that $\\{f_n\\}$ **converges pointwise** to $f$ if and only if for **every fixed** $x \\in X$,\n\n$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n \\ge N :\\ |f_n(x) - f(x)| < \\varepsilon$$\n\nWe write $f_n \\to f$ (pointwise).",
        status: 'draft',
        basedOn: 'v0.9.3#45ce281a',
      },
      notes: {
        en: "⭐ Note the order of the quantifiers: $\\exists N$ comes **after** $\\forall x$ — so $N$ here may depend on $\\varepsilon$ **and $x$**.\n\nEach point gets its own $N$, independently of the others.\n\n⚠ Pointwise convergence is too weak: the limit function may be **discontinuous**, and limit and integral need **not commute**.\n\nExample: on $[0, 1]$, $f_n(x) = x^{n}$ converges pointwise to the discontinuous function that equals $0$ for $x < 1$ and $1$ for $x = 1$.\n\n⭐ Pointwise convergence is a \"pointwise\" notion, and checking it point by point suffices;\n\nall the difficulty lies in **whether $x$ can be controlled by a single $N$**.",
        status: 'draft',
        basedOn: 'v0.9.3#cd160750',
      },
    },

    'def.borel': {
      statement: {
        en: "Let $X$ be a topological space. The **Borel $\\sigma$-algebra** on $X$ is the $\\sigma$-algebra generated by all open sets:\n\n$\\mathfrak{B}_X := \\mathcal{M}(\\{ U \\subseteq X : U$ is open $\\})$\n\nSets in $\\mathfrak{B}_X$ are called **Borel sets**: open sets, closed sets, countable intersections of open sets ($G_\\delta$), countable unions of closed sets ($F_\\sigma$), and so on all belong to $\\mathfrak{B}_X$.",
        status: 'draft',
        basedOn: 'v0.9.3#fec2c65d',
      },
      notes: {
        en: "The family of open sets is in general only a topology, not a $\\sigma$-algebra — one must take the $\\sigma$-algebra it generates to obtain all Borel sets.\n\nOn $\\mathbb{R}$, $\\mathfrak{B}_\\mathbb{R}$ can also be generated by the half-open intervals $\\{ (a, b] : a < b \\}$ (or { [a, b) }). These forms are more convenient when constructing measures, because disjoint unions of half-open intervals are easy to compute.",
        status: 'draft',
        basedOn: 'v0.9.3#5757819c',
      },
    },

    'def.isomorphism': {
      statement: {
        en: "Let $\\mathcal{C}$ be a category and $f : X \\to Y$ a morphism in it. We say that $f$ is an **isomorphism** if there exists a morphism $g : Y \\to X$ with\n\n$$g \\circ f = \\mathrm{id}_{X}, \\qquad f \\circ g = \\mathrm{id}_{Y}.$$\n\nSuch a $g$ is unique (if $g, g'$ both work, then $g = g' f g = g'$); we write $g = f^{-1}$. In this case $X$ and $Y$ are called **isomorphic**, written $X \\cong Y$.",
        status: 'draft',
        basedOn: 'v0.9.3#7b045f9d',
      },
      notes: {
        en: "⭐ **It is the common name for one concept across the branches** (previously only the three-in-one `def.mono` of category theory existed):\n\n- sets / $\\mathbf{Set}$: isomorphism = **bijection**;\n\n- groups, rings, modules: isomorphism = bijective homomorphism;\n\n- topology / $\\mathbf{Top}$: isomorphism = **homeomorphism** (`def.homeomorphism`);\n\n- vector spaces: isomorphism = **linear isomorphism** (`def.linear-isomorphism`);\n\n- posets: isomorphism = **order isomorphism** (`def.order-iso`);\n\n- whereas \"monomorphism / epimorphism\" is **another pair of concepts** — in a general category mono + epi does **not** imply isomorphism (for example, in $\\mathbf{Top}$ a continuous bijection need not be a homeomorphism), so it cannot serve as the common name for isomorphism.\n\n⚠ **\"Isomorphic\" is not \"equal\"**: isomorphic means \"indistinguishable under a structure-preserving map\". Almost all statements here hold only up to isomorphism (for example \"$V \\cong K^{n}$\" rather than \"$V = K^{n}$\").\n\n📌 Difference from \"equivalence\": an **equivalence** between categories (discussed in the `def.adjoint` family) requires only \"isomorphic up to a natural isomorphism\" and is weaker than isomorphism; isomorphism is the strongest tier.",
        status: 'draft',
        basedOn: 'v0.9.3#b0580091',
      },
    },

    'def.limit': {
      statement: {
        en: "The **limit** of the diagram $D : I \\to \\mathcal{C}$ is the cone over $D$ with the universal property: a cone $(\\lim D,\\ p_i)$ such that for every cone $(Y,\\ g_i)$ there is a **unique** morphism $g : Y \\to \\lim D$ with\n\n$$p_i \\circ g = g_i \\qquad (i \\in I)$$\n\nEquivalently, the cone functor is represented by $\\lim D$:\n\n$$\\operatorname{Hom}_{\\mathcal{C}^{I}}(\\Delta Y, D) \\;\\cong\\; \\operatorname{Hom}_{\\mathcal{C}}(Y, \\lim D)$$\n\nDually, the **colimit** $\\operatorname{colim} D$ of $D$ satisfies $\\operatorname{Hom}_{\\mathcal{C}^{I}}(D, \\Delta Y) \\cong \\operatorname{Hom}_{\\mathcal{C}}(\\operatorname{colim} D, Y)$.\n\nWhen $I$ is finite it is called a **finite limit**.",
        status: 'draft',
        basedOn: 'v0.9.3#8bccceb3',
      },
      notes: {
        en: "The universal property says just one thing: **every other cone factors through it uniquely**. Hence a limit, if it exists, is unique up to isomorphism — there is no need to choose a particular construction; any one will do.\n\nTwo equivalent formulations: \"a universal cone\" and \"$\\operatorname{Hom}_{\\mathcal{C}^{I}}(\\Delta -, D)$ is representable\". The latter turns the limit into a computable isomorphism.\n\n\"Universal\" can be pushed further: a limit is a **terminal object** in the category of cones (see \"element category\"). This sentence recurs repeatedly later.",
        status: 'draft',
        basedOn: 'v0.9.3#5753e66b',
      },
    },

    'def.product': {
      statement: {
        en: "Take $I$ to be a **discrete category** (objects only, no non-identity morphisms); then the diagram $D : I \\to \\mathcal{C}$ is just a family of objects $(X_i)_{i \\in I}$. Its limit is called the **product** $\\prod_{i} X_i$, and its colimit the **coproduct** $\\coprod_{i} X_i$. Written as an isomorphism of hom-sets, the universal property is\n\n$$\\operatorname{Hom}_{\\mathcal{C}}\\Bigl(Y, \\prod_{i} X_i\\Bigr) \\;\\cong\\; \\prod_{i} \\operatorname{Hom}_{\\mathcal{C}}(Y, X_i)$$",
        status: 'draft',
        basedOn: 'v0.9.3#87d0ec57',
      },
      notes: {
        en: "In one sentence: **a product is \"one map = a family of maps\"**. Maps into the product correspond bijectively to families of maps into each factor, and the projection $p_i$ extracts the $i$-th component.\n\nExamples: in $\\mathbf{Set}$ the product is the Cartesian product and the coproduct the disjoint union; in $\\mathbf{Top}$ the product carries the **product topology** (the coarsest topology making it a product) and the coproduct the **disjoint-union topology** (the finest one); in $\\mathbf{Ab}$ the product is the direct product $\\prod_i A_i$ and the coproduct the direct sum $\\bigoplus_i A_i$.",
        status: 'draft',
        basedOn: 'v0.9.3#d340eaa7',
      },
    },

    'def.ideal': {
      statement: {
        en: "Let $A$ be a ring. A subset $I \\subseteq A$ is called a **(two-sided) ideal** if $(I, +)$ is an additive subgroup and, for all $a \\in A$ and $x \\in I$,\n\n$$a x \\in I, \\qquad x a \\in I.$$\n\n(Requiring only $a x \\in I$ gives a **left ideal**, and only $x a \\in I$ a **right ideal**; in a commutative ring the three notions coincide.)\n\nMultiplication $(a + I)(b + I) := ab + I$ on the quotient set $A/I$ (by additive cosets) is well defined, and the resulting ring is called the **quotient ring**.",
        status: 'draft',
        basedOn: 'v0.9.3#731bbcb6',
      },
      notes: {
        en: "**Why ideals are defined this way.** The problem is exactly the same as for normal subgroups: to define multiplication on the quotient set, $(a + I)(b + I)$ must not depend on the representatives. Compute $(a + x)(b + y) = ab + ay + xb + xy$ — the last three terms must all lie in $I$. That $xy \\in I$ is **not** guaranteed by \"$I$ is a subgroup\" and must be **required separately**.\n\n⭐ **Comparison table**: to quotient a **group** and get a group, one quotients by a **normal subgroup**; to quotient a **ring** and get a ring, one quotients by an **ideal**. (As an additive subgroup, $I$ is of course automatically normal — the additive group is abelian — so no extra condition is needed on that side.)\n\nThe **principal ideal** $(a) := \\{\\, xa : x \\in A \\,\\}$ (in a commutative ring, the set of all multiples of $a$). ⚠️ In a general ring this set is only a **left** ideal: for $A = M_2(\\mathbb{R})$ and $a = E_{11}$, $E_{11}E_{12} = E_{12} \\notin Aa$. In a general ring the correct definition of $(a)$ is \"the smallest two-sided ideal containing $a$\". $A/(a)$ is the ring obtained by \"setting $a$ equal to $0$\"; $\\mathbb{Z}/(n) = \\mathbb{Z}/n\\mathbb{Z}$ is congruence modulo $n$.",
        status: 'draft',
        basedOn: 'v0.9.3#a13577ce',
      },
    },

    'def.module': {
      statement: {
        en: "Let $A$ be a unital ring and $M$ an **abelian group**. We say that $M$ is a **$A$-module** if there is a map\n\n$$A \\times M \\longrightarrow M, \\qquad (a, m) \\longmapsto a \\cdot m,$$\n\nsatisfying $a(bm) = (ab)m$, $(a + b)m = am + bm$, $a(m + n) = am + an$, $1 \\cdot m = m$.\n\nAn abelian-group homomorphism preserving this action is called a **$A$-module homomorphism**: $f(am) = a f(m)$. All $A$-modules with module homomorphisms form the category $A\\text{-}\\mathbf{Mod}$.",
        status: 'draft',
        basedOn: 'v0.9.3#0dadc00c',
      },
      notes: {
        en: "⭐ **A module = an abelian group + a ring action**, so it is a child of both \"group\" and \"ring\": a $\\mathbb{Z}$-module **is** an abelian group ($n \\cdot m$ admits only one definition); a module over a field **is** a vector space. These two statements place \"module\" midway between known examples.\n\n**Why $A\\text{-}\\mathbf{Mod}$ is the model example of homological algebra**: it is simultaneously\n\n- an **abelian category** (it has kernels and cokernels, and all monomorphisms and epimorphisms are strict);\n\n- **with enough injective objects** (every module embeds into an injective module);\n\n- **with enough projective objects** (free modules are projective);\n\n- a **Grothendieck category** (it has a generator, $A$ itself, and filtered colimits are exact).\n\nSo \"what can be done in $A\\text{-}\\mathbf{Mod}$\" is exactly what homological algebra wants to generalize to arbitrary categories. **Everything other categories can do is measured against it.**",
        status: 'draft',
        basedOn: 'v0.9.3#09652db5',
      },
    },

    'def.subgroup': {
      statement: {
        en: "Let $(G, \\cdot)$ be a group and $H \\subseteq G$. We say that $H$ is a **subgroup** of $G$ (written $H \\le G$) if $H$ is itself a group under the **restricted operation** — that is:\n\n- $e \\in H$;\n\n- $a, b \\in H \\implies ab \\in H$ (closed under the operation);\n\n- $a \\in H \\implies a^{-1} \\in H$ (closed under inverses).\n\n(Associativity is inherited from $G$ and need not be checked again.)",
        status: 'draft',
        basedOn: 'v0.9.3#09d424e9',
      },
      notes: {
        en: "The two conditions can be combined into one: $H \\ne \\emptyset$ and $a, b \\in H \\implies a b^{-1} \\in H$ (without $H \\ne \\emptyset$ the condition is vacuous: $H = \\emptyset \\subseteq G$ satisfies the universal statement, yet is not a subgroup).\n\nThe intersection of any number of subgroups is again a subgroup, but the **union** in general is not — this is why \"the subgroup generated by $S$, namely $\\langle S \\rangle$\" is defined as \"the intersection of all subgroups containing $S$\".",
        status: 'draft',
        basedOn: 'v0.9.3#c6a59daa',
      },
    },

    'def.topology-base': {
      statement: {
        en: "Let $(X, \\mathcal{T})$ be a topological space and $\\mathcal{B} \\subseteq \\mathcal{T}$. Then $\\mathcal{B}$ is a **base** for the topology $\\mathcal{T}$ if and only if every open set is a union of members of $\\mathcal{B}$. If one further requires $\\mathcal{T}$ to be **exactly** the topology generated by $\\mathcal{B}$ (that is, $\\mathcal{B} \\subseteq \\mathcal{T}$, and $\\mathcal{T}$ is precisely the family of all unions of members of $\\mathcal{B}$), this is equivalent to:\n\n1. $\\bigcup \\mathcal{B} = X$;\n2. for $B_1, B_2 \\in \\mathcal{B}$ and $x \\in B_1 \\cap B_2$, there exists $B_3 \\in \\mathcal{B}$ with $x \\in B_3 \\subseteq B_1 \\cap B_2$.\n\nA family $\\mathcal{S} \\subseteq \\mathcal{P}(X)$ is a **subbase** if and only if all its **finite intersections** form a base.",
        status: 'draft',
        basedOn: 'v0.9.3#02b4b5c4',
      },
      notes: {
        en: "⭐ Why bases are useful: **a condition checked on a base holds automatically for all open sets.**\n\n- In metric spaces: all open balls form a base;\n- On $\\mathbb{R}$: open intervals form a base; the half-open intervals $\\{ (a, b] \\}$ generate a base for **another topology** (the upper limit topology) — they are not the usual open sets, hence **not** a base for the usual topology (although they are handier when constructing the Lebesgue–Stieltjes measure);\n\n- The cylinder sets of the product topology and of the $\\sigma$-algebra follow the same pattern: first fix a convenient family of sets, then take what it generates.\n\n⚠ A base is not unique: the same topology can have many bases.\n\n**Which hypothesis each direction uses** (generating a topology and being a base for a specified topology must be kept distinct):\n- Being a base for the given $\\mathcal T$ $\\iff$ every $\\mathcal T$-open set is a union of basic elements: this is definition unpacking; the covering and local-intersection conditions then follow using $X$ and the fact that the intersection of two basic elements is open.\n- Covering plus local-intersection conditions $\\implies$ the arbitrary unions of basic elements form a topology: finite intersections are handled by local refinement, the remaining axioms are checked directly, no choice is needed, and one may take all basic elements satisfying the conditions.\n- The two conditions listed in the node do not by themselves imply being a base for the given $\\mathcal T$: one also needs $\\mathcal T$ to equal the generated topology. For example, on the discrete two-point space take $\\mathcal B=\\{X\\}$; it satisfies both conditions yet does not generate the singleton open sets.\n- A subbase $\\iff$ the family of all finite intersections is a base: by convention this is definition unpacking, and finite intersections should include the empty intersection $X$; for the usual topology on the reals the basic elements must be usual open sets, while half-open intervals generate another topology.",
        status: 'draft',
        basedOn: 'v0.9.3#7900e5e3',
      },
    },

    'def.metric-continuity': {
      statement: {
        en: "Let $(X, d)$ and $(Y, \\rho)$ be metric spaces, $f : X \\to Y$, and $x_0 \\in X$.\n\nWe say $f$ is **continuous at** $x_0$ if\n\n$$\\forall \\varepsilon > 0\\ \\exists \\delta > 0:\\quad d(x, x_0) < \\delta \\implies \\rho(f(x), f(x_0)) < \\varepsilon .$$\n\nWe say $f$ is continuous if it is continuous at every point. Equivalently: for every open set $V \\subseteq Y$, the preimage $f^{-1}(V)$ is open in $X$.",
        status: 'draft',
        basedOn: 'v0.9.3#0fade8e4',
      },
      notes: {
        en: "**Proof of the equivalence** (global version):\n\n($\\varepsilon$–$\\delta$ $\\implies$ open preimages are open) Let $V \\subseteq Y$ be open and $x_0 \\in f^{-1}(V)$. Choose $\\varepsilon > 0$ with $B_Y(f(x_0), \\varepsilon) \\subseteq V$; $\\varepsilon$–$\\delta$ gives $\\delta > 0$ such that the image of $B_X(x_0, \\delta)$ lies in $B_Y(f(x_0), \\varepsilon)$, hence $B_X(x_0, \\delta) \\subseteq f^{-1}(V)$, i.e. $f^{-1}(V)$ is open.\n\n(open preimages are open $\\implies$ $\\varepsilon$–$\\delta$) Given $x_0$ and $\\varepsilon > 0$, $B_Y(f(x_0), \\varepsilon)$ is open, so $f^{-1}(B_Y(f(x_0), \\varepsilon))$ is open and contains $x_0$; choose $\\delta > 0$ so that $B_X(x_0, \\delta)$ lies in it, which is exactly the $\\varepsilon$–$\\delta$ statement. $\\blacksquare$\n\n📌 This is `def.continuous-map` (the topological version) written out for metric spaces: open sets in a metric space are generated by open balls, so “preimages are open” is equivalent to $\\varepsilon$–$\\delta$.\n\n⭐ The case $\\mathbb{R}$ is treated in `def.continuous` (the $\\varepsilon$–$\\delta$ criterion) and `def.real-metric-space` ($d(x,y) = |x-y|$).",
        status: 'draft',
        basedOn: 'v0.9.3#28ccfd05',
      },
    },

    'def.complete': {
      statement: {
        en: "A sequence $\\{x_{n}\\}$ is a **Cauchy sequence** if and only if\n\n$$\\forall\\varepsilon > 0, \\exists N : m, n \\ge N \\implies d(x_m, x_n) < \\varepsilon$$\n\nA metric space $(X, d)$ is **complete** if and only if every Cauchy sequence in $X$ converges in $X$:\n\n$$\\{x_n\\}\\ \\text{Cauchy} \\implies \\exists x \\in X : x_n \\to x$$",
        status: 'draft',
        basedOn: 'v0.9.3#4665198b',
      },
      notes: {
        en: "“Convergent $\\implies Cauchy$” always holds; **“$Cauchy \\implies$ converges” is the content of completeness**.\n\nExamples: $\\mathbb{R}^{n}$, $\\mathbb{C}^{n}$, and every Banach space are complete; $\\mathbb{Q}$ is not (3, 3.1, 3.14, …, a Cauchy sequence converging to $\\sqrt 2$ that does not converge in $\\mathbb{Q}$).\n\n**Closed subsets inherit completeness**: when $X$ is complete, $A \\subseteq X$ is complete as a subspace $\\iff A$ closed in $X$. This will be used below in the characterisation of compactness of subsets.",
        status: 'draft',
        basedOn: 'v0.9.3#d254b5af',
      },
    },

    'prop.compact-subset-closed': {
      statement: {
        en: "Let $A$ be a subset of a metric space $X$ (with the subspace metric). If $A$ is **compact**, then $A$ is **closed** in $X$.",
        status: 'draft',
        basedOn: 'v0.9.3#f78af910',
      },
      notes: {
        en: "In fact it suffices that $X$ be Hausdorff: compact subsets are then closed, and metric spaces are Hausdorff.\n\nPutting this together with “$X$ is complete” prepares the **subset** characterisation of compactness below: that result uses “$A$ compact $\\implies A$ closed” and “$A$ closed $X$ complete $\\implies A$ complete”.\n\n**Proof.** Let $A$ be compact and take $x \\in X\\setminus A$; we must show it is an interior point.\n- For each $a \\in A$, by Hausdorffness take an open neighbourhood $U_{a}$ of $a$ and an open neighbourhood $V_{a}$ of $x$ with $U_{a}\\cap V_{a} = \\emptyset$ (in a metric space take $U_{a} = B(a, r/2)$ and $V_{a} = B(x, r/2)$, where $r = d(a,x)$);\n- $\\{U_{a}\\}_{a\\in A}$ is an open cover of $A$; by **compactness** take a finite subcover $U_{a_{1}}, \\ldots, U_{a_{n}}$;\n- $V := \\bigcap_{i=1}^{n} V_{a_{i}}$ is an open neighbourhood of $x$, and $V\\cap U_{a_{i}} = \\emptyset$ holds for every $i$, hence $V \\cap A = \\emptyset$, i.e. $V \\subseteq X\\setminus A$ ✓.\nThus $X\\setminus A$ is open and $A$ is closed. ∎",
        status: 'draft',
        basedOn: 'v0.9.3#1bc20fbc',
      },
    },

    'def.net': {
      statement: {
        en: "**What it does**: in general topology **sequences do not suffice** — neither compactness nor continuity can be characterised by sequences (unless the space is first countable). Replacing $\\mathbb{N}$ by an arbitrary **directed set** yields a “net”, and then every theorem about sequences carries over.\n\n**Directed set**: a preordered set $(\\Lambda, \\le)$ such that any $\\lambda, \\mu \\in \\Lambda$ have an upper bound (there exists $\\nu$ with $\\lambda, \\mu \\le \\nu$).\n\n**Net**: a map $x : \\Lambda \\to X$, written $(x_{\\lambda})_{\\lambda \\in \\Lambda}$.\n\n**Convergence**: a net $x_{\\lambda}$ **converges to** $x$ (written $x_{\\lambda} \\to x$) if for every neighbourhood $U$ of $x$ there exists $\\lambda_{0}$ such that\n\n$$\\lambda \\ge \\lambda_{0} \\implies x_{\\lambda} \\in U .$$\n\n**Two characterisation theorems**:\n\n- $f : X \\to Y$ is continuous $\\iff$ $f$ sends every convergent net to a convergent net (`def.continuous-map`);\n- $X$ is compact $\\iff$ every net in $X$ has a convergent **subnet**.",
        status: 'draft',
        basedOn: 'v0.9.3#3a45ea8b',
      },
      notes: {
        en: "⚠️ **Why sequences are not enough**: in an uncountable space a singleton can be closed without being “sequentially closed” (for example $\\omega_{1}$ in $[0,\\omega_{1}]$: no sequence approaches it from below, yet it lies in the closure).\n\nSo “$x \\in \\overline{A}$ $\\iff$ there is a sequence in $A$ converging to $x$” **holds only in first-countable spaces**.\n\nNets fix this at once by replacing $\\mathbb{N}$ with “the reverse order of the neighbourhoods of $x$”.\n\n⭐ **Subnet $\\ne$ subsequence**: a subnet may use a coarser index set and is therefore far more flexible than a subsequence (a subsequence requires an order-preserving embedding $\\mathbb{N} \\to \\mathbb{N}$, which misses many cases). Hence the net characterisation of compactness must use **subnets**; using “subsequences” is wrong.\n\n⭐ **Nets come from Riemann sums**: Moore–Smith (1922) invented nets precisely to give a rigorous meaning to “$\\int f$ is the limit of Riemann sums” — the index set of those sums is the refinement order of partitions, not $\\mathbb{N}$. So “nets” are not abstract fussiness; they solve a real problem in analysis.\n\n⚠ Nets and filters are **equivalent** languages (`eq.net-filter`): each net corresponds to a filter, with matching convergence. Which one to use is a matter of habit — analysis books prefer nets, set theory and topology books prefer filters.\n\n**Which hypothesis each direction uses** (the definition of a net is free; the two characterisations need general-topology arguments):\n- Net convergence $\\iff$ eventually lies in every neighbourhood: definition unpacking; the index directed set is by convention nonempty and need not be antisymmetric.\n- Continuity $\\implies$ preserves net limits: only the preimage-of-neighbourhood definition is used; conversely, at a discontinuity one constructs a net by choosing counterexample points in neighbourhoods, a standard construction that uses choice and needs neither first countability nor Hausdorffness.\n- Compact $\\iff$ every net has a convergent subnet: the duality between cluster points of nets and finite subcovers of open covers; Hausdorffness is not needed, but the subnet must satisfy the standard cofinality condition.\n- Replacing nets by sequences cannot characterise general compactness: the first-countable ordinal space $[0,\\omega_1)$ is sequentially compact but not compact, so the first countability mentioned in the parenthetical is not enough to guarantee the sequential characterisation of compactness.",
        status: 'draft',
        basedOn: 'v0.9.3#e9a396f6',
      },
    },

    'def.riemann-integrable': {
      statement: {
        en: "Let $f$ be bounded on $[a, b]$. We say $f$ is **Riemann integrable** if and only if there exists a real number $I$ such that\n\n$$\\forall \\varepsilon > 0,\\ \\exists \\delta > 0 :\\ \\|P\\| < \\delta \\implies \\bigl| S(f, P, \\xi) - I \\bigr| < \\varepsilon$$\n\nholds for **every** partition $P$ and **every** choice of tags $\\xi$. Then $I$ is unique and is written\n\n$$I = \\int_a^b f = \\int_a^b f(x)\\,dx$$\n\nwith the conventions $\\int_b^a f := -\\int_a^b f$ and $\\int_a^a f := 0$.",
        status: 'draft',
        basedOn: 'v0.9.3#79063b0d',
      },
      notes: {
        en: "⭐ The two words most easily missed in the definition: **every** and **norm**.\n\nIt is not “there is a sequence of partitions whose sums converge”, but “**all** partitions of sufficiently small norm, with **all** tags, land near $I$”.\n\n⭐ Equivalent formulation (Darboux form, see “Darboux criterion”): $\\sup_P L(f, P) = \\inf_P U(f, P)$.\n\nThe equivalence of the two definitions is not free — it needs a proof, and that proof is `thm.riemann-criterion`.\n\n⚠ For functions taking values in $\\mathbb{C}$, integrability is defined by integrability of the real and imaginary parts;\n\nthe vector-valued case is analogous.\n\n⚠ Boundedness is a **prerequisite** for integrability: an unbounded function is not Riemann integrable (it may be Lebesgue integrable, provided $\\int |f| < \\infty$).",
        status: 'draft',
        basedOn: 'v0.9.3#fe562afc',
      },
    },

    'thm.ftc-riemann-part2': {
      statement: {
        en: "Let $F : [a, b] \\to \\mathbb{R}$ be differentiable and $F'$ integrable on $[a, b]$. Then\n\n$$\\int_a^b F'(x)\\,dx = F(b) - F(a)$$\n\n($F$ is called an **antiderivative** of $F'$; another way to write the formula is $\\int_a^b f = F\\bigr|_a^b$.)",
        status: 'draft',
        basedOn: 'v0.9.3#ec8ed7bd',
      },
      notes: {
        en: "⭐ This is the main theorem of elementary calculus: **computing areas becomes finding antiderivatives**.\n\nIt also explains why tables of indefinite integrals are worth memorising — every derivative formula, read backwards, is an integration formula.\n\n⚠ The hypothesis “$F'$ is integrable” cannot be dropped: there are differentiable functions whose derivative is **not** integrable (the $F(x) = x^{2}\\sin(1/x^{2})$ type).\n\n⚠ The converse is not strong enough either: Newton–Leibniz requires $F$ to be an antiderivative;\n\nthe Lebesgue version (`thm.ftc-lebesgue`) relaxes the hypothesis to **absolute continuity** and makes “$F'$ exists” part of the conclusion.\n\nThe relation between the two theorems is “the same statement in two integral settings”.",
        status: 'draft',
        basedOn: 'v0.9.3#39aef9f2',
      },
    },

    'lem.fatou': {
      statement: {
        en: "Let $\\{f_n\\} \\subseteq L^+$. Then\n\n$$\\int \\liminf_{n\\to\\infty} f_n \\le \\liminf_{n\\to\\infty} \\int f_n$$",
        status: 'draft',
        basedOn: 'v0.9.3#759f0e8d',
      },
      notes: {
        en: "⚠ Mind the direction of the inequality: the **lower** limit outside the integral is **at most** the lower limit of the integrals. In other words, passing to the limit can only make the integral **smaller**, never larger.\n\nThis is what remains of MCT once monotonicity is dropped — without monotonicity, equality degenerates into an inequality.\n\nA counterexample in the other direction: $f_n = \\chi_{[n, n+1]}$ (on $\\mathbb{R}$) has $\\int f_{n} = 1$ for every index, but $\\int \\liminf f_{n} = 0$.",
        status: 'draft',
        basedOn: 'v0.9.3#cb8d2809',
      },
    },

    'def.integral-nonneg': {
      statement: {
        en: "Let $f \\in L^+$. Define the integral of $f$ as the supremum of the integrals of simple functions not exceeding it:\n\n$\\int f d\\mu := \\sup \\{ \\int \\varphi d\\mu : 0 \\le \\varphi \\le f,\\ \\varphi$ **is a simple function** $\\}$",
        status: 'draft',
        basedOn: 'v0.9.3#f56ab6ad',
      },
      notes: {
        en: "Intuition: approximate $f$ from **below** by simple functions and take the **supremum** of their integrals. This differs from the Jordan measure recipe of “covering from outside and filling from inside” — here we only fill from inside.\n\nWhy no “outer cover” is required: the measure already sits on the dual side ($\\mu$ itself is defined from outside via an outer measure), so taking an infimum over simple functions would only make the integral too small.\n\n⚠ This definition works only for nonnegative functions. For a general real-valued function, split it into positive and negative parts and subtract (see “integral of a complex function”).",
        status: 'draft',
        basedOn: 'v0.9.3#02c58844',
      },
    },

    'def.lebesgue-measurable': {
      statement: {
        en: "For $f : \\mathbb{R} \\to \\mathbb{C}$:\n\n- if $f$ is $(\\mathcal{L}, \\mathfrak{B}_\\mathbb{C})$-measurable, $f$ is called **Lebesgue measurable** ($\\mathcal{L}$ is the $Lebesgue \\sigma$-algebra);\n- if $f$ is $(\\mathfrak{B}_\\mathbb{R}, \\mathfrak{B}_\\mathbb{C})$-measurable, $f$ is called **Borel measurable**.",
        status: 'draft',
        basedOn: 'v0.9.3#c3599e7a',
      },
      notes: {
        en: "⚠ **There is a trap here: the composition of two Lebesgue measurable functions need not be Lebesgue measurable.**\n\nThe reason: making the composition work requires the intermediate $\\sigma$-algebra to cooperate, and $\\mathcal{L}$ is strictly larger than $\\mathfrak{B}_\\mathbb{R}$.\n\nTake $f : \\mathbb{R} \\to \\mathbb{R} Lebesgue$ and $g : \\mathbb{R} \\to \\mathbb{R} Lebesgue$ measurable; then $g\\circ f$ need not be measurable with respect to $\\mathcal{L}$ — because $g^{-1}$ only guarantees pulling sets in $\\mathfrak{B}_\\mathbb{R}$ back to $\\mathcal{L}$, whereas $f^{-1}$ needs a **non-Borel Lebesgue measurable set** in $\\mathbb{R}$ to produce a failure.\n\nThe standard fix: make the intermediate function Borel measurable. If $g$ is Borel measurable and $f$ is Lebesgue measurable, then $g\\circ f$ is Lebesgue measurable.",
        status: 'draft',
        basedOn: 'v0.9.3#d6e2e80a',
      },
    },

    'cor.continuous-measurable': {
      statement: {
        en: "Let $X, Y$ be topological spaces, each equipped with its **Borel $\\sigma$-algebra** $\\mathfrak{B}_X, \\mathfrak{B}_Y$. Then every **continuous** map is automatically Borel measurable:\n\n$f : X \\to Y$ **continuous** $\\implies f$ is $(\\mathfrak{B}_X, \\mathfrak{B}_Y)$-**measurable**",
        status: 'draft',
        basedOn: 'v0.9.3#a04b74b5',
      },
      notes: {
        en: "Continuity is exactly “preimages of open sets are open”; open sets generate $\\mathfrak{B}_Y$, so the criterion (2) from the previous item gives the result immediately.",
        status: 'draft',
        basedOn: 'v0.9.3#7bee078a',
      },
    },

    'thm.simple-approximation': {
      statement: {
        en: "**(a)** If $f : X \\to [0, +\\infty]$ is measurable, then there exists a sequence of simple functions $\\{\\varphi_n\\}$ that approaches $f$ **increasingly at every point**:\n\n$$0 \\le \\varphi_1 \\le \\varphi_2 \\le \\cdots \\le f, \\quad  \\varphi_n \\to f$$\n\nand **the convergence is uniform on every set on which $f$ is bounded**.\n\n**(b)** More generally ($f : X \\to \\mathbb{C}$ measurable), one can choose a sequence of simple functions whose absolute values increase pointwise and which converges pointwise to $f$:\n\n$$0 \\le |\\varphi_1| \\le |\\varphi_2| \\le \\cdots \\le |f|, \\quad  \\varphi_n \\to f$$",
        status: 'draft',
        basedOn: 'v0.9.3#20ef8cf7',
      },
      notes: {
        en: "**Proof.**\n**(a)** For $n \\ge 1$ and $k = 0, 1, \\ldots, 2^{n}n - 1$, set\n$$E_{n,k} := f^{-1}\\bigl((k2^{-n}, (k+1)2^{-n}]\\bigr), \\qquad F_{n} := f^{-1}\\bigl((n, +\\infty]\\bigr),$$\n$$\\varphi_{n} := \\sum_{k} k\\,2^{-n}\\,\\chi_{E_{n,k}} \\;+\\; n\\,\\chi_{F_{n}} \\;+\\; 0\\cdot\\chi_{f^{-1}(\\{0\\})}.$$\n- **Simplicity**: each $E_{n,k}$ and $F_{n}$ is measurable ($f$ measurable plus intervals are Borel sets), and only finitely many values occur ✓;\n- **$0 \\le \\varphi_{n} \\le f$**: on $E_{n,k}$ we have $k2^{-n} < f \\le (k+1)2^{-n}$ ✓; on $F_{n}$ we have $n < f$ ✓; elsewhere it is zero ✓;\n- **Monotonicity**: when $n \\to n+1$, the intervals are refined by $2^{-(n+1)}$ and the ceiling rises from $n$ to $n+1$; a pointwise check gives $\\varphi_{n} \\le \\varphi_{n+1}$ ✓;\n- **Pointwise convergence**: if $f(x) < \\infty$, choose $n > f(x)$ so that $0 \\le f(x)-\\varphi_{n}(x) \\le 2^{-n} \\to 0$; if $f(x) = +\\infty$, then $\\varphi_{n}(x) = n \\to \\infty$ ✓;\n- **Uniform on bounded sets**: if $f \\le M$, choose $n > M$; the same estimate gives $|f-\\varphi_{n}| \\le 2^{-n}$, independent of $x$ ✓.\n**(b)** For a general measurable $f$: write $f = (f_{1}^{+} - f_{1}^{-}) + i(f_{2}^{+} - f_{2}^{-})$, apply (a) to each of the four nonnegative measurable parts to obtain monotone sequences, then combine them linearly into real and imaginary parts, positive and negative parts; every step satisfies $|\\varphi_{n}| \\le |f|$ and converges pointwise, so the conclusion holds ✓. ∎\n\nThe construction in (a) is “cutting the cake”: slice the range over [0, n) into pieces of size $2^{-n}$ and flatten everything above $n$ to $n$ —\n\n$$\\varphi_n = \\sum_{k=0}^{2^n\\cdot n-1} k\\cdot2^{-n}\\cdot\\chi_{E_n^k} + n\\cdot\\chi_{F_n}, $$\n\n$$E_n^k = f^{-1}((k\\cdot2^{-n}, (k+1)\\cdot2^{-n}]), \\quad  F_n = f^{-1}((n, +\\infty])$$\n\nEach layer is the preimage of a measurable set, so $\\varphi _{n}$ is simple; as $n$ grows the grid becomes finer and the ceiling higher, so the functions climb monotonically to $f$.\n\n(b) splits $f = g + ih$ as $g = g^+ - g^-$, $h = h^+ - h^-$ and applies (a) to the four nonnegative parts:\n\n$$\\varphi_n = \\psi_n^+ - \\psi_n^- + i(\\zeta _n^+ - \\zeta _n^-)$$",
        status: 'draft',
        basedOn: 'v0.9.3#16708e44',
      },
    },

    'def.group-hom': {
      statement: {
        en: "Let $(G, \\cdot)$ and $(G', \\ast)$ be groups. A map $\\varphi : G \\to G'$ is called a **group homomorphism** if\n\n$$\\varphi(a b) = \\varphi(a) \\ast \\varphi(b) \\qquad (a, b \\in G).$$\n\nIts **kernel** and **image** are\n\n$$\\ker\\varphi := \\{\\, g \\in G : \\varphi(g) = e' \\,\\} \\;\\subseteq\\; G, \\qquad \\operatorname{im}\\varphi := \\varphi(G) \\;\\subseteq\\; G'.$$",
        status: 'draft',
        basedOn: 'v0.9.3#2570ab7e',
      },
      notes: {
        en: "**A homomorphism automatically preserves the identity and inverses**: $\\varphi(e) = e'$, $\\varphi(a^{-1}) = \\varphi(a)^{-1}$ (obtained by cancelling in $\\varphi(e) = \\varphi(e e) = \\varphi(e)\\varphi(e)$). So only one equation is needed in the definition.\n\n**Kernel and image are subgroups**: $\\operatorname{im}\\varphi \\le G'$ is obvious; $\\ker\\varphi \\le G$ follows from $\\varphi(ab^{-1}) = \\varphi(a)\\varphi(b)^{-1} = e'$.\n\n⭐ **The kernel is moreover a normal subgroup**: for $k \\in \\ker\\varphi$ and $g \\in G$,\n\n$$\\varphi(g k g^{-1}) = \\varphi(g)\\, e'\\, \\varphi(g)^{-1} = e',$$\n\nso $gkg^{-1} \\in \\ker\\varphi$, i.e. $\\ker\\varphi \\trianglelefteq G$. **The kernel is always normal** — this is the entire reason a quotient group can quotient by the kernel.\n\n**Monomorphism $\\iff$ trivial kernel**: $\\varphi$ is injective $\\iff$ $\\ker\\varphi = \\{e\\}$. Thus injectivity is fully encoded by a **subgroup**.",
        status: 'draft',
        basedOn: 'v0.9.3#e12495d9',
      },
    },

    'def.normal-subgroup': {
      statement: {
        en: "Let $H \\le G$ and $g \\in G$. The **left coset** and **right coset** are\n\n$$gH := \\{\\, gh : h \\in H \\,\\}, \\qquad Hg := \\{\\, hg : h \\in H \\,\\}.$$\n\nWe call $H$ a **normal subgroup** of $G$ (written $H \\trianglelefteq G$) if $gH = Hg$ for all $g \\in G$, equivalently $gHg^{-1} = H$.",
        status: 'draft',
        basedOn: 'v0.9.3#a885cb6f',
      },
      notes: {
        en: "⭐ **Why normality.** A coset $gH$ is a **set**, and to turn the quotient set into a group via “$gH \\cdot g'H := gg'H$” the definition must be **independent of the choice of representatives**. Compute where the difference lies:\n\n$$(g h)(g' h') = g g' \\cdot \\bigl((g')^{-1} h g'\\bigr) h',$$\n\nThe element $(g')^{-1} h g'$ in the rightmost bracket must still lie in $H$ — “$H$ is closed under conjugation” is exactly normality. **Every subgroup of an abelian group is normal** (conjugation does nothing), so this step never causes trouble in an abelian group.\n\n**Cosets are an equivalence relation.** Define $a \\sim b \\iff a^{-1} b \\in H$; then the equivalence classes are precisely the left cosets, and all left cosets partition $G$ — this is the quotient set used for the quotient group below.\n\n**Notation**: $H \\le G$ denotes a subgroup, $H \\trianglelefteq G$ a normal subgroup ($\\trianglelefteq$ is read “is normal in”).",
        status: 'draft',
        basedOn: 'v0.9.3#3669cc0c',
      },
    },

    'def.quotient-group': {
      statement: {
        en: "Let $N \\trianglelefteq G$. The set of all left cosets $\\{\\, gN : g \\in G \\,\\}$ is denoted $G/N$; define on it\n\n$$(g N) \\cdot (g' N) := (g g') N.$$\n\nNormality guarantees that this definition is independent of the choice of representatives, so $G/N$ becomes a group, called the **quotient group**.\n\nThe natural map $\\pi : G \\to G/N$, $g \\mapsto gN$, is a surjective homomorphism.",
        status: 'draft',
        basedOn: 'v0.9.3#d2617371',
      },
      notes: {
        en: "The quotient group is the **set-theoretic quotient** with one more layer: first quotient $G$ by the equivalence relation “differ by an element of $N$”, then check that an operation survives on the quotient set.\n\n**Universal property** (the real use of quotient groups): for any group homomorphism $\\varphi : G \\to G'$, if $N \\subseteq \\ker\\varphi$, then $\\varphi$ factors uniquely through $\\pi$: there exists a unique $\\overline{\\varphi} : G/N \\to G'$ with $\\overline{\\varphi} \\circ \\pi = \\varphi$.\n\n⚠️ A quotient **group** exists only for normal subgroups; the quotient **set** $G/H$ exists for any subgroup (left cosets still partition $G$), but that quotient set usually carries no group structure.",
        status: 'draft',
        basedOn: 'v0.9.3#ea5b0888',
      },
    },

    'def.vs': {
      statement: {
        en: "Let $K$ be a field, $V$ a vector space over $K$, and $S \\subseteq V$.\n\n- **$S$ is linearly independent**: every finite subset of $S$ is linearly independent, i.e. there are no $c_{1}$…$c_{n} \\in K$, not all zero, with $c_{1}v_{1} + \\cdots + c_{n}v_{n} = 0$.\n- **$S$ spans $V$**: every vector in $V$ is a linear combination of finitely many vectors in $S$.\n- **$S$ is a basis of $V$**: $S$ is both linearly independent and spans $V$.\n\nNote that linear independence is defined **finite-subset by finite-subset** — this is exactly why it is “finitary”.",
        status: 'draft',
        basedOn: 'v0.9.3#93d086da',
      },
      notes: {
        en: "Equivalent formulation: $S$ is a basis $\\iff V$ every vector admits a unique expression as a finite linear combination of elements of $S$.",
        status: 'draft',
        basedOn: 'v0.9.3#da8b623d',
      },
    },

    'thm.vsbasis': {
      statement: {
        en: "Let $V$ be a vector space over a field $K$. Then\n\n$V$ has a basis;\n- more precisely: every linearly independent subset of $V$ can be extended to a basis of $V$, and every spanning set contains a basis.",
        status: 'draft',
        basedOn: 'v0.9.3#fca5a22b',
      },
      notes: {
        en: "In ZF this statement is equivalent to AC — without AC one can construct a vector space with no basis.\n\nThis is the standard example of “an order-theoretic result landing in algebra”, and an instance of a cross-area link in this knowledge graph.",
        status: 'draft',
        basedOn: 'v0.9.3#f067b6b0',
      },
    },

    'def.commutative-diagram': {
      statement: {
        en: "Let $I$ be a **small category** (its objects and morphisms form a small set). A **diagram in $\\mathcal{C}$ indexed by $I$** is a functor\n\n$$D : I \\longrightarrow \\mathcal{C}$$\n\nAll such diagrams, with natural transformations as morphisms, form the category\n\n$$\\mathcal{C}^{I} := \\operatorname{Hom}(I, \\mathcal{C})$$\n\nIf between any two objects of $I$ there is **at most one morphism** (such an $I$ is called a **preorder**), then $D$ is called a **commutative diagram** over $I$.",
        status: 'draft',
        basedOn: 'v0.9.3#7d602f84',
      },
      notes: {
        en: "**Commutativity is a property of the indexing category, not something the functor supplies.** “$I$ is a preorder” holds if and only if “every $I$-shaped diagram commutes”: then two paths in $I$ with the same source and target compose to the **unique** morphism of $\\operatorname{Hom}(i, j)$, hence are equal.\n\n**In general only the “shape” is given.** When $I$ is not a preorder, $D$ can only be called a $I$-shaped diagram: a functor is **not required** to send parallel $f \\ne g : i \\rightrightarrows j$ to equal arrows.\n\nThe most typical non-commuting diagram is the **parallel pair** $\\bullet \\rightrightarrows \\bullet$, whose limit and colimit are exactly the **equaliser** and **coequaliser**;\n\nthe classical commuting square corresponds to the preorder $\\{A \\le B \\le D,\\ A \\le C \\le D\\}$.\n\n**Reading it on paper.** A diagram drawn on paper is only a **presentation**: objects are assigned to the vertices of a directed graph $G$ and morphisms to its arrows. Saying that it **commutes** means that any two paths with the same source and target have **equal** composites under the labelling — this is a **condition to be checked**, equivalent to the labelling descending to a functor on the quotient of the free category on $G$.\n\n$I$ is called the **indexing category**: it prescribes only the shape of the diagram, not its content.\n\nPrecomposing with a functor $\\lambda : I \\to J$ gives **reindexing** $\\lambda^{*} : \\mathcal{C}^{J} \\to \\mathcal{C}^{I}$: it cuts a $J$-shaped diagram down to a $I$-shaped one.\n\nIn particular, the unique functor $I \\to \\mathbf{1}$ to the terminal category induces the **constant-diagram functor** $\\Delta : \\mathcal{C} \\longrightarrow \\mathcal{C}^{I}$, which sends an object $X$ to the constant diagram “$X$ at every position and $1_X$ on every arrow”.",
        status: 'draft',
        basedOn: 'v0.9.3#f76d7406',
      },
    },

    'def.fibered-product': {
      statement: {
        en: "The limit of a diagram of shape $X_1 \\xrightarrow{f_1} X_0 \\xleftarrow{f_2} X_2$ is called the **fibred product**, written $X_1 \\times_{X_0} X_2$, also called the **pullback** of $f_1$ along $f_2$. It completes to a commutative square\n\n$$\\begin{array}{ccc} X_1 \\times_{X_0} X_2 & \\longrightarrow & X_2 \\\\ \\downarrow & & \\downarrow f_2 \\\\ X_1 & \\xrightarrow{f_1} & X_0 \\end{array}$$\n\nSuch a square is called **cartesian**. Dually, the colimit of such a diagram is the **fibred coproduct**, also called the **pushout**.",
        status: 'draft',
        basedOn: 'v0.9.3#8b870204',
      },
      notes: {
        en: "Intuition: the pullback is “the product after matching over the base $X_0$” — solving $f_1(x_1) = f_2(x_2)$; the pushout is “gluing $X_1, X_2$ together along their images in $X_0$”.\n\nExample ($\\mathbf{Set}$):\n\n$$X_1 \\times_{X_0} X_2 = \\{(x_1, x_2) \\in X_1 \\times X_2 : f_1(x_1) = f_2(x_2)\\}, \\qquad X_1 \\cup_{X_0} X_2 = (X_1 \\sqcup X_2)/\\!\\sim$$\n\nwhere $\\sim$ is generated by $f_1(x_0) \\sim f_2(x_0)$ ($x_0 \\in X_0$). In $\\mathbf{Top}$, the pullback carries the subspace topology and the pushout the quotient topology.\n\nIn $\\mathbf{Ab}$ both reduce to kernels and cokernels: combine $f: X \\to S$ and $g: Y \\to S$ into $\\varphi : X \\oplus Y \\to S$, $(x,y) \\mapsto f(x) - g(y)$, then the pushout is $= \\operatorname{coker} \\varphi$ and the pullback is $= \\ker \\varphi$ — first take the direct sum, then quotient out the differences of $f, g$.\n\n📌 The “pullback” of category theory is the fibred product (here); the pullback of **differential forms** is `prop.pullback-form-manifold`.",
        status: 'draft',
        basedOn: 'v0.9.3#f9dfa2de',
      },
    },

    'def.equalizer': {
      statement: {
        en: "The limit of the parallel pair $f, g : X \\rightrightarrows Y$ is called the **equaliser**, written $\\operatorname{eq}(f,g) = \\ker(f,g)$; the colimit is the **coequaliser**, written $\\operatorname{coker}(f,g)$. They fit into\n\n$$\\ker(f,g) \\longrightarrow X \\overset{f}{\\underset{g}{\\rightrightarrows}} Y \\longrightarrow \\operatorname{coker}(f,g)$$\n\nand the middle map $\\ker(f,g) \\to X$ is a monomorphism, while the map on the right $Y \\to \\operatorname{coker}(f,g)$ is an epimorphism. This segment is called **left exact**.",
        status: 'draft',
        basedOn: 'v0.9.3#584c5d90',
      },
      notes: {
        en: "Intuition: the equaliser is the part of $X$ “sent to the same place by $f$ and $g$”; the coequaliser is the quotient of $Y$ that “glues $f(x)$ and $g(x)$ together”.\n\nExample: in $\\mathbf{Set}$, $\\ker(f,g) = \\{x \\in X : f(x) = g(x)\\}$, and $\\operatorname{coker}(f,g) = Y/\\!\\sim$ ($\\sim$ generated by $f(x) \\sim g(x)$).\n\nIn $\\mathbf{Top}$ one adds the subspace topology / the quotient topology.\n\nIn $\\mathbf{Ab}$, $\\ker(f,g) = \\ker(f - g)$ — the equaliser of two maps degenerates to the kernel of **one** map, which is exactly where the name “kernel” comes from.",
        status: 'draft',
        basedOn: 'v0.9.3#dee5ea44',
      },
    },

    'def.poset': {
      statement: {
        en: "Let $\\preceq$ be a binary relation on a set $A$. Then $\\preceq$ is a **partial order on $A$** if and only if:\n\n- **Reflexive**: $\\forall x \\in A, x \\preceq x$;\n- **Antisymmetric**: $\\forall x, y \\in A ( x \\preceq y \\wedge y \\preceq x \\to x = y )$;\n- **Transitive**: $\\forall x, y, z \\in A ( x \\preceq y \\wedge y \\preceq z \\to x \\preceq z )$.\n\nIf in addition **comparability** $\\forall x, y \\in A ( x \\preceq y \\vee y \\preceq x )$ holds, then $\\preceq$ is called a **total order** (linear order) on $A$, and $(A, \\preceq )$ is called a totally ordered set.\n\nCall $(A, \\preceq )$ a **partially ordered set** (poset). Define the **strict order** from $\\preceq$ by: $x \\prec y :\\iff x \\preceq y \\wedge  x \\ne y$",
        status: 'draft',
        basedOn: 'v0.9.3#9258d75f',
      },
      notes: {
        en: "Standard examples: $\\langle \\mathcal{P}(S), \\subseteq \\rangle$ is a poset but not totally ordered; $\\langle \\mathbb{R}, \\le \\rangle$ is totally ordered.\n\nAntisymmetry says that the only way two elements can be mutually $\\le$ is by being equal, so a partial order can be seen as an abstraction of $\\le$.\n\n**Assumptions used in each direction** (axiomatic definition and passage to the strict order):\n- A relation is a partial order $\\iff$ it satisfies reflexivity, antisymmetry and transitivity simultaneously, and a relation is a total order $\\iff$ it is a partial order plus comparability; both are unfoldings of the definition and need no axiom of choice.\n- **Partial order** $\\implies$ **strict order**: let $x\\prec y$ mean $x\\preceq y$ and $x\\ne y$; irreflexivity and transitivity follow; conversely, taking the reflexive closure of an irreflexive transitive relation yields a partial order, a finite-step logical deduction.\n- Antisymmetry cannot be dropped: the universal relation on a two-point set is reflexive and transitive but not a partial order; comparability is not automatic either — ordered by inclusion, the power set of a two-element set has two incomparable singletons.\n- Extending a partial order to a total order is a separate theorem, usually proved from the order extension principle; the definition of a total order here does not assert that such an extension exists, and its existence must not be counted as part of the definition.",
        status: 'draft',
        basedOn: 'v0.9.3#b341858a',
      },
    },

    'def.chain': {
      statement: {
        en: "Let $(P, \\preceq )$ be a poset and let $C \\subseteq P$.\n\n**$C$ is a chain** (also called a totally ordered subset) if and only if any two elements of $C$ are comparable:\n\n$$\\forall x, y \\in C ( x \\preceq y \\vee  y \\preceq x )$$\n\n**$C$ is an antichain** if and only if any two distinct elements of $C$ are incomparable.\n\nConvention: $\\emptyset$ and every singleton count as chains.",
        status: 'draft',
        basedOn: 'v0.9.3#0f207eac',
      },
      notes: {
        en: "**Chain** is the central notion in Zorn's lemma and the Hausdorff maximal principle — both ask how large a chain can grow.",
        status: 'draft',
        basedOn: 'v0.9.3#63045b05',
      },
    },

    'def.wellorder': {
      statement: {
        en: "A totally ordered set $(W, \\preceq )$ is **well-ordered** if and only if every nonempty subset of $W$ has a least element:\n\n$$\\forall S \\subseteq W ( S \\ne \\emptyset \\to \\exists m \\in S, \\forall s \\in S, m \\preceq s )$$\n\nEquivalently: there is no infinite strictly decreasing chain $w_{0} \\succ w_{1} \\succ w_{2} \\succ \\cdots$.",
        status: 'draft',
        basedOn: 'v0.9.3#f0928b4f',
      },
      notes: {
        en: "⭐ **Well-ordering has one use: it makes \"the next step\" definable.** The part before each step has a first and a last element, so one can do **transfinite induction** (proof) and **transfinite recursion** (construction) — see \"the recursion theorem on well-ordered sets\".\n\n⭐ Every well-ordered set is **order-isomorphic to a unique ordinal** (see \"the order type of a well-ordered set\"), and that ordinal is its \"length\".\n\nThus \"which of two well-ordered sets is longer\" becomes \"which of two ordinals is larger\", and the order on ordinals is $\\in$.\n\n$\\langle \\mathbb{N}, \\le \\rangle$ is well-ordered;\n\n$\\langle \\mathbb{Z}, \\le \\rangle$ and $\\langle \\mathbb{R}, \\le \\rangle$ are not (some nonempty subsets of $\\mathbb{R}$ have no least element).",
        status: 'draft',
        basedOn: 'v0.9.3#d5b4b662',
      },
    },

    'def.cardinal': {
      statement: {
        en: "Equipotence partitions all sets into classes. The **cardinality** $\\#A$ of a set $A$ is the equipotence class of $A$ — it measures how large $A$ is, without regard to what the elements of $A$ are.\n\nCompare two cardinals:\n\n- $\\#A \\le \\#B$: there is an **injection** $A \\to B$;\n- $\\#A = \\#B$: there is a **bijection** $A \\to B$ (equipotence);\n- $\\#A < \\#B$: $\\#A \\le \\#B$ but $\\#A \\ne \\#B$.\n\nIf $\\#A \\le \\#B$ and $\\#B \\le \\#A$, then $\\#A = \\#B$ (the Schröder–Bernstein theorem).",
        status: 'draft',
        basedOn: 'v0.9.3#cd9eda20',
      },
      notes: {
        en: "⭐ Notation: $\\#\\mathbb{N} = \\aleph_0$ (countably infinite), $\\#\\mathbb{R} = 2^{\\aleph_0}$, and $\\aleph_0 < 2^{\\aleph_0}$.\n\n⚠ Strictly speaking, equipotence classes are not sets; the standard ZFC approach is to take **ordinals** first and then, using the well-ordering theorem ($\\iff$ AC), choose the least ordinal in each equipotence class as its representative. That ordinal is called the cardinal.\n\n> Only two facts are needed — $\\#A \\le \\#B$ via injections and $\\#A = \\#B$ via bijections — and both work without choosing representatives.\n\n⚠ Two arbitrary cardinals are **not necessarily comparable**; this is exactly the content of the **cardinal comparability theorem** (which uses AC).",
        status: 'draft',
        basedOn: 'v0.9.3#79f2c92e',
      },
    },

    'thm.rolle': {
      statement: {
        en: "Let $a < b$, and suppose $f$ is continuous on the closed interval $[a, b]$ and differentiable on the open interval $(a, b)$, with $f(a) = f(b)$. Then there exists $\\xi \\in (a, b)$ such that\n\n$$f'(\\xi) = 0$$",
        status: 'draft',
        basedOn: 'v0.9.3#4055fb64',
      },
      notes: {
        en: "⭐ Geometric content: when the two endpoints have equal height, there is a point in between with a horizontal tangent.\n\nIt is the **only** member of the mean value theorem family that needs compactness (the extreme value theorem locates an interior extremum); the later members are the same statement in different clothing.\n\n⚠ Neither hypothesis can be dropped: continuity on $[a, b]$ guarantees that the extrema exist (compactness), and differentiability on $(a, b)$ guarantees that the extremum is an interior point, where Fermat's lemma applies.\n\nReplacing $f(a) = f(b)$ by $f(a) \\ne f(b)$ gives the Lagrange mean value theorem.",
        status: 'draft',
        basedOn: 'v0.9.3#5490b315',
      },
    },

    'thm.mvt': {
      statement: {
        en: "Let $a < b$, and suppose $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$. Then there exists $\\xi \\in (a, b)$ such that\n\n$$f(b) - f(a) = f'(\\xi)\\,(b - a)$$\n\nEquivalently, $f'(\\xi) = \\dfrac{f(b) - f(a)}{b - a}$: **the average rate of change is attained at some point as an instantaneous rate**.",
        status: 'draft',
        basedOn: 'v0.9.3#a42dc2a7',
      },
      notes: {
        en: "⭐ This is the **master switch** of differential calculus: whenever a theorem deduces global information from pointwise derivative data, the first step is to use the mean value theorem to rewrite a difference as a derivative.\n\nMonotonicity criteria, the constant-function criterion, L'Hôpital's rule, Taylor's formula and convexity criteria are all corollaries.\n\n⚠ **$\\xi$ is uncontrollable**: the theorem asserts existence but not location — which is why the mean value theorem cannot **compute** $f(b) - f(a)$, only prove inequalities and structural properties.\n\n⚠ A counterexample in the general setting shows that continuity cannot be dropped: adding a single jump to $f(x) = x$ on $[0, 1] \\setminus \\{1/2\\}$ makes the average slope unattainable.",
        status: 'draft',
        basedOn: 'v0.9.3#7b9ea076',
      },
    },

    'thm.taylor': {
      statement: {
        en: "Let $f$ have $n$ continuous derivatives on $[a, b]$ and be $n+1$ times differentiable on $(a, b)$, and choose $x_0 \\in [a, b]$. Then for every $x \\in [a, b]$ with $x \\ne x_0$, there exists $\\xi$ between $x_0$ and $x$ such that\n\n$$f(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}\\,(x - x_0)^{k} + \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\,(x - x_0)^{n+1}$$\n\nThe second term on the right is called the **Lagrange remainder**.",
        status: 'draft',
        basedOn: 'v0.9.3#d5ba4658',
      },
      notes: {
        en: "⭐ In one sentence: **a sufficiently differentiable function is locally a polynomial**, and the error is controlled by that one remainder term.\n\nThis is the only theorem in elementary calculus that recovers a function from finite information, and it is the gateway to the whole line of power series and analytic functions.\n\n⭐ The shape of the remainder has the same origin as the mean value theorem: when $n = 0$, Taylor's formula **is** the Lagrange mean value theorem.\n\n⚠ The remainder only asserts the existence of $\\xi$, not its location;\n\nto **estimate** the error one must know a bound on $f^{(n+1)}$ separately (this is the point of writing the remainder in sup form).\n\n⚠ Two hypotheses: enough differentiability on the interval;\n\n$\\xi$ depends on $x$ and $n$.",
        status: 'draft',
        basedOn: 'v0.9.3#5b0f2275',
      },
    },

    'def.absolute-continuity': {
      statement: {
        en: "Let $\\mu$ be a measure on $(X, \\mathcal{M})$ and $\\nu$ a signed measure. Then $\\nu$ is **absolutely continuous with respect to $\\mu$**, written\n\n$$\\nu \\ll  \\mu, $$\n\nif and only if **every $\\mu$-null set is $\\nu$-null**:\n\n$$\\forall E \\in \\mathcal{M}, \\mu(E) = 0 \\implies \\nu(E) = 0$$",
        status: 'draft',
        basedOn: 'v0.9.3#d7edce10',
      },
      notes: {
        en: "In one sentence: **wherever $\\mu$ sees nothing, $\\nu$ must also see nothing**.\n\n⚠ Note that $\\mu (E) = 0$ uses $\\mu$ (a positive measure), whereas $\\nu (E) = 0$ uses the signed measure; an equivalent formulation is $|\\nu|(E) = 0$.\n\nClearly $\\mu \\ll  |\\mu|$ and $|\\mu| \\ll  \\mu$ (for the measure $\\mu$ itself).\n\n📌 Example: $\\nu(E) := \\int_{E} f\\,\\mathrm{d}\\mu$ (with $f \\ge 0$ integrable) satisfies $\\nu \\ll \\mu$ and $\\mathrm{d}\\nu/\\mathrm{d}\\mu = f$; the opposite case is $\\delta_{0} \\perp \\mu$ (all mass concentrated on a null set, see `ex.density-abs-continuous`).",
        status: 'draft',
        basedOn: 'v0.9.3#02ec2d7f',
      },
    },

    'thm.ftc-lebesgue': {
      statement: {
        en: "Let $F : [a, b] \\to \\mathbb{C}$, with a compact interval. Then the following three statements are **equivalent**:\n\n**(a)** $F$ is **absolutely continuous** on $[a, b]$;\n\n**(b)** there exists $f \\in L^1([a, b])$ such that\n\n$$F(x) - F(a) = \\int_a^x f(t) dt\\quad  \\forall x \\in [a, b]$$\n\n**(c)** $F$ is **differentiable a.e.**, $F' \\in L^1([a, b])$, and\n\n$$F(x) - F(a) = \\int_a^x F'(t) dt$$",
        status: 'draft',
        basedOn: 'v0.9.3#d3397d86',
      },
      notes: {
        en: "⭐ This is the **complete form of the Newton–Leibniz formula for the Lebesgue integral**. Compare Riemann integration: there the condition that $F'$ be integrable and the formula hold requires $F'$ to be continuous (or at least Riemann integrable), whereas here only absolute continuity of $F$ is needed.\n\nThe three conditions split the work: (a) is the function-side condition (expressed via partitions of the interval), (b) is the integral side, and (c) is the derivative side. The theorem says they are the same thing.\n\n⚠ Without absolute continuity the formula **fails**: the Cantor function satisfies the a.e. differentiability and integrability in (c), $F' \\in L^{1}$, but $\\int _{0}^{1} F' = 0 \\ne F(1) - F(0) = 1$.\n\nProof chain: $(a) \\implies (b)$ follows from $AC \\subseteq BV$ and $\\mu _F \\ll m$; $(b) \\implies (c)$ is a direct corollary of the fundamental theorem of calculus; $(c) \\implies (a)$ obtains absolute continuity from the representation $F(x) = \\int F'$.",
        status: 'draft',
        basedOn: 'v0.9.3#f58d909c',
      },
    },

    'def.riemann-sum': {
      statement: {
        en: "Let $f : [a, b] \\to \\mathbb{R}$ (**no boundedness is required**), let $P = \\{ x_0 < \\cdots < x_n \\}$ be a partition, and choose a **tag** $\\xi_i \\in I_i$ in each subinterval. The **Riemann sum** is\n\n$$S(f, P, \\xi) := \\sum_{i=1}^{n} f(\\xi_i)\\,\\Delta x_i$$\n\nIt depends on three things: $f$, the partition $P$, and the choice of tags $\\xi_1, \\ldots, \\xi_n$.\n\n⚠️ **Boundedness plays no role here**: each $f(\\xi_i)$ is a real number and a finite sum is always defined. Boundedness enters only when discussing Riemann **integrability** — that is where the Darboux upper and lower sums require $\\sup/\\inf$ to be finite.",
        status: 'draft',
        basedOn: 'v0.9.3#c8e5ccd9',
      },
      notes: {
        en: "⭐ Geometric reading: take the \"height\" on each small subinterval to be $f(\\xi_i)$, obtaining $n$ rectangles; $S$ is their total area. **The choice of tags** is the only freedom in this theory — requiring the integrability condition to hold for every choice is exactly what removes that freedom.\n\n⚠ For an unbounded function the Riemann sum is **still defined** (a sum of finitely many real numbers), but boundedness is a prerequisite for the integrability discussion: the Darboux upper and lower sums need $\\sup/\\inf$ to be finite.",
        status: 'draft',
        basedOn: 'v0.9.3#52447d62',
      },
    },

    'def.series': {
      statement: {
        en: "Given a sequence $\\{a_n\\}$, let $s_N := \\sum_{n=1}^{N} a_n$ be its **partial sums**.\n\nThe series $\\sum_{n=1}^{\\infty} a_n$ is said to **converge** if and only if the sequence of partial sums $\\{s_N\\}$ converges; in that case write\n\n$$\\sum_{n=1}^{\\infty} a_n := \\lim_{N \\to \\infty} s_N$$\n\n**Series with nonnegative terms** ($a_n \\ge 0$) are especially clean: the partial sums increase, so\n\n$$\\sum_{n=1}^{\\infty} a_n = \\sup_N s_N \\in [0, +\\infty]$$\n\nalways makes sense (possibly $+\\infty$).",
        status: 'draft',
        basedOn: 'v0.9.3#a9ea0be5',
      },
      notes: {
        en: "⭐ Countable additivity of measures and term-by-term properties of integrals both rely on this line for nonnegative series: nonnegativity removes any worry about conditional convergence and rearrangement.\n\n⚠ A convergent series **can be rearranged** only when it converges absolutely; rearranging a conditionally convergent series may change its sum (the Riemann rearrangement theorem).",
        status: 'draft',
        basedOn: 'v0.9.3#b3f26486',
      },
    },

    'prop.subset-compact-equiv': {
      statement: {
        en: "Let $(X, d)$ be a **complete** metric space and $A \\subseteq X$. Then\n\n$A$ is **compact** $\\iff$ $A$ is closed **and** $A$ is **totally bounded**.\n\n(Totally boundedness of $A$ is understood with respect to the subspace metric $d|_A$.)",
        status: 'draft',
        basedOn: 'v0.9.3#3ad6d8e2',
      },
      notes: {
        en: "⚠ **The hypothesis that $X$ is complete cannot be dropped.** The reason is the middle step: $A$ is complete as a subspace $\\iff A$ closed in $X$ — this step uses completeness of $X$. Without it, $A$ closed and $A$ totally bounded does not imply $A$ compact.\n\nThis is also a generalization of **Heine–Borel**: $\\mathbb{R}^{n}$ is complete, and in $\\mathbb{R}^{n}$, $A$ bounded $\\iff A$ totally bounded, so \"bounded closed sets are compact\" is exactly the special case.\n\n**Proof.**\n- **$\\implies$**: $A$ compact $\\implies$ $A$ closed in $X$ (the previous item).\n\nTotal boundedness: given $\\varepsilon > 0$, the family $\\{B(a,\\varepsilon)\\cap A\\}_{a\\in A}$ is an open cover of $A$ (with the subspace metric); compactness gives a finite subcover, and those finitely many centers form an $\\varepsilon$-net ✓.\n- **$\\Longleftarrow$**: suppose $A$ is closed and totally bounded.\n\nFirst **completeness**: $X$ is complete and $A$ is closed, so a Cauchy sequence in $A$ converges in $X$ to some point, and the limit lies in the closed set $A$; hence $A$ is complete as a subspace ✓.\n\nNow **compactness**: total boundedness gives a countable dense subset, so any sequence in $A$ has a Cauchy subsequence, obtained layer by layer from $2^{-n}$-nets and the pigeonhole principle;\n\ncompleteness makes that subsequence converge ✓.\n\nHence $A$ is **sequentially compact**;\n\nand in a **metric space** sequential compactness $\\iff$ compactness ✓.\n\n∎\n\n⚠️ The step \"$X$ complete $\\implies$ $A$ complete\" is exactly where the hypothesis in the title is used (see the previous remark).",
        status: 'draft',
        basedOn: 'v0.9.3#a5b00a3e',
      },
    },

    'prop.compact-basic-operations': {
      statement: {
        en: "1. A **closed subspace** of a compact space is compact;\n2. The **continuous image** of a compact space is compact;\n3. A **compact Hausdorff** space is **normal**.",
        status: 'draft',
        basedOn: 'v0.9.3#a2ba9971',
      },
      notes: {
        en: "**Proof.** (1) Given a closed subset $F \\subseteq X$ (with $X$ compact) and an open cover, add $X \\setminus F$ to obtain an open cover of $X$, take a finite subcover and delete that term ✓. (2) Given $f : X \\to Y$ (with $X$ compact) and an open cover in $Y$, pull it back to an open cover of $X$, take a finite subcover and push it forward ✓.\n\n(3) Given disjoint closed sets $A, B$: for each $a \\in A$, use the Hausdorff property to produce an open neighbourhood $U_a$ of $a$ with $\\overline{U_a} \\cap B = \\emptyset$ ✓;\n\n$A$ is compact, so finitely many cover it, $A$; set $U := \\bigcup_{i} U_{a_i}$, then $\\overline{U} \\cap B = \\emptyset$ ✓;\n\nperform the same construction for $B$, then shrink both families of open sets by one step to obtain open sets separating $A, B$ ✓.\n\n∎",
        status: 'draft',
        basedOn: 'v0.9.3#55a98361',
      },
    },

    'def.second-countable': {
      statement: {
        en: "A topological space $X$ is **second countable** if its topology has a **countable base**: there is a countable family $\\mathcal{B} = \\{\\, B_{n} \\,\\}_{n \\ge 1}$ such that every open set is a union of members of $\\mathcal{B}$.",
        status: 'draft',
        basedOn: 'v0.9.3#faf23581',
      },
      notes: {
        en: "**It yields three good properties at once**: second countable $\\implies$ separable (choose one point from each nonempty basic element; the result is a countable dense set); second countable $\\implies$ Lindelöf (every open cover has a countable subcover, by filtering basic elements);\n\nsecond countable $\\implies$ first countable (at each point, filter the countably many basic elements containing it).\n\nWith regularity it also yields normality — this is the first step of the Urysohn metrization theorem.\n\n**For metrizable spaces the three countability properties coincide**: separable $\\iff$ Lindelöf $\\iff$ second countable. Hence the Urysohn theorem can also be read as \"regular $+$ separable\".\n\n**Heredity**: subspaces inherit second countability (intersect basic elements with the subspace; still countable); quotient spaces do not (the quotient map crushes a countable base into a much coarser topology).\n\n⚠️ The converse fails: an uncountable discrete space is first countable and metrizable, but not second countable (it has no countable dense subset).\n\n**The relations with first countability and separability are one-way** (this is the group of implications most often reversed):\n\n- **Second countable $\\implies$ first countable**: a countable base itself gives a countable local base at each point. **No extra hypothesis is needed**.\n- **Second countable $\\implies$ separable**: choose one point from each basic element to obtain a countable dense set. ⚠️ This step **uses countable choice** (skip empty basic elements; usually harmless).\n- **Separable $\\not\\implies$ second countable**: the Sorgenfrey line is a counterexample (separable and first countable, but not second countable).\n- **Separable + metrizable $\\implies$ second countable**: this is what makes second countability equivalent to separability in metric spaces; **the proof uses metrizability** (take a countable dense set and balls of radius $1/n$).\n\n⚠️ In one sentence: **second countability is \"global countability\", first countability is \"local countability\"**; in metric spaces both are equivalent to separability, in general topology they are not.",
        status: 'draft',
        basedOn: 'v0.9.3#d9399ef6',
      },
    },

    'def.subspace': {
      statement: {
        en: "Let $V$ be a vector space over a field $K$. Then $U \\subseteq V$ is called a **(linear) subspace** of $V$ if and only if\n\n- $0 \\in U$;\n- $U$ is closed under addition: $u, v \\in U \\implies u + v \\in U$;\n- $U$ is closed under scalar multiplication: $u \\in U$, $c \\in K \\implies cu \\in U$.\n\nEquivalently, $U$ together with the operations restricted from $V$ is itself a $K$-vector space.\n\n**Inclusion** between subspaces is defined as set inclusion, and the **intersection** of any family of subspaces is again a subspace (verify addition and scalar multiplication term by term).",
        status: 'draft',
        basedOn: 'v0.9.3#8574cab6',
      },
      notes: {
        en: "⭐ The first of the three conditions can be absorbed into the other two: it suffices that $U \\ne \\emptyset$ and that the set is closed under subtraction (take $u - u = 0$).\n\nWriting the three conditions separately is useful for **checking them one by one**.\n\n⚠ **A union is generally not a subspace**: the union of the $x$-axis and the $y$-axis does not even contain $(1,0)+(0,1)$.\n\nThus the lattice of subspaces is \"closed under intersections, generally not under unions\" — to combine subspaces one uses the **sum** $U + W$.\n\n⚠ The empty set is not a subspace;\n\n$\\{0\\}$ and $V$ are the two smallest subspaces (called **trivial subspaces**).\n\n⭐ Do not confuse this with the topological notion of subspace (`def.subspace-topology`, the subspace topology): the two notions share a name but mean completely different things.\n\n**Assumptions used in each direction** (the vector-space criterion after restricting the operations):\n- Subspace $\\implies$ contains zero and is closed under addition and scalar multiplication: this is a free unfolding of the definition, needing neither finite dimension nor the axiom of choice.\n- The three closure conditions $\\implies$ the restricted operations form a vector space: the algebraic identities are inherited from $V$, negatives come from multiplication by $-1$, and no existence theorem for bases is needed.\n- Nonempty plus closure under subtraction and scalar multiplication $\\implies$ the three conditions: take $u-u=0$ and then recover addition; keeping only nonemptiness and closure under subtraction is not enough, and $\\mathbb Z\\subset\\mathbb R$ is a counterexample.\n- Nonemptiness cannot be dropped: closure of the empty set under addition and scalar multiplication holds vacuously, but there is no zero vector; that an arbitrary intersection is a subspace is checked condition by condition, with the empty intersection conventionally $V$.",
        status: 'draft',
        basedOn: 'v0.9.3#1cbde284',
      },
    },

    'def.linear-map': {
      statement: {
        en: "Let $V, W$ be vector spaces over a field $K$. A map $T : V \\to W$ is called **$K$-linear** (or a linear map) if and only if\n\n$$T(u + v) = T(u) + T(v), \\qquad T(cu) = c\\,T(u)$$\n\nfor all $u, v \\in V$ and $c \\in K$. Equivalently, $T(cu + v) = c\\,T(u) + T(v)$.\n\nThe **sum** and **scalar multiple** of two linear maps are again linear, so the set of all linear maps is a $K$-vector space, denoted\n\n$$\\operatorname{Hom}_K(V, W) := \\{\\, T : V \\to W \\ \\text{linear} \\,\\}$$\n\nA composite $S \\circ T$ is again linear.",
        status: 'draft',
        basedOn: 'v0.9.3#84cc6399',
      },
      notes: {
        en: "⭐ Linear means **preserving the two operations** (addition and scalar multiplication).\n\nCompared with a group homomorphism, which preserves one operation, there is one more requirement, but it comes for free: both $T(0) = 0$ and $T(-v) = -T(v)$ follow from the definition.\n\n⭐ That $\\operatorname{Hom}_K(V, W)$ is itself a vector space is special to linear algebra: in a general category the morphism set between two objects has no addition (as in $\\mathbf{Set}$), whereas the category of vector spaces is an **additive category** — the morphism sets carry an addition of their own, an extra structure absent from general categories.\n\n⚠ The point of linearity is that **only the addition and scalar multiplication of $K$ matter**: the translation $v \\mapsto v + v_0$ (with $v_0 \\ne 0$) is not linear ($0$ does not map to $0$), but it \"differs from a linear map by a translation\" — that is an affine map.",
        status: 'draft',
        basedOn: 'v0.9.3#9e0f1cd6',
      },
    },

    'def.matrix': {
      statement: {
        en: "Let $K$ be a field and $m, n \\ge 1$. An $m \\times n$ **matrix** is a rectangular array of elements of $K$,\n\n$$A = (a_{ij}) = \\begin{pmatrix} a_{11} & \\cdots & a_{1n} \\\\ \\vdots & & \\vdots \\\\ a_{m1} & \\cdots & a_{mn} \\end{pmatrix}, \\qquad a_{ij} \\in K$$\n\n($i$ is the row index and $j$ the column index, both starting at $1$.) The set of all $m \\times n$ matrices is denoted $M_{m \\times n}(K)$, and the square case by $M_n(K) := M_{n \\times n}(K)$.\n\nThe $j$-th **column** of $A$ is a column vector in $K^{m}$, and its $i$-th **row** is a row vector in $K^{n}$.",
        status: 'draft',
        basedOn: 'v0.9.3#ce735903',
      },
      notes: {
        en: "⭐ A matrix is just a rectangular array of elements of $K$ — **it carries no mathematical structure by itself**; its meaning comes entirely from how it is read (as the ledger of a linear map, as coefficients of a linear system, as the recipe of a bilinear form).\n\n⚠ The two indexing conventions ($a_{ij}$ is the entry in row $i$, column $j$) must be used consistently, or transposition and multiplication go wrong.\n\nThe convention throughout is row first, then column.\n\n⭐ As a set, $M_{m \\times n}(K)$ is just $K^{mn}$ — hence it is certainly a $K$-vector space (operations componentwise).",
        status: 'draft',
        basedOn: 'v0.9.3#560493c1',
      },
    },

    'def.determinant': {
      statement: {
        en: "For $A = (a_{ij}) \\in M_n(K)$, define the **determinant**\n\n$$\\det A := \\sum_{\\sigma \\in S_n} \\operatorname{sgn}(\\sigma)\\ \\prod_{i=1}^{n} a_{i,\\sigma(i)}$$\n\n($S_n$ is the symmetric group on $n$ letters and $\\operatorname{sgn}$ is the sign of a permutation; there are $n!$ terms.)\n\nViewing the columns of $A$ as vectors in $V = K^{n}$, the map $\\det$ is the unique $D$ from the existence and uniqueness theorem for determinants.\n\nBasic properties: $\\det I_n = 1$; swapping two columns changes the sign; equal columns give $0$; $\\det A^{\\mathsf{T}} = \\det A$.",
        status: 'draft',
        basedOn: 'v0.9.3#2e8e4ef0',
      },
      notes: {
        en: "⭐ Geometric reading ($K = \\mathbb{R}$): $|\\det A|$ is the **volume** of the parallelepiped obtained by applying the linear map $x \\mapsto Ax$ to the unit cube, and the sign is the **orientation**.\n\nHence $\\det = 0 \\iff$ the map flattens space $\\iff$ not invertible.\n\n⭐ This geometric meaning reappears in the change-of-variables formula for integrals: $\\int f\\,dx$ becomes $\\int f\\,|\\det|\\,dy$ — there $|\\det|$ is the volume scaling factor.\n\n⚠ The $n!$ terms in the formula show that this definition **cannot be used for computation** ($n = 20$ already exceeds $10^{18}$ terms);\n\nfor computation use elimination or Laplace expansion.",
        status: 'draft',
        basedOn: 'v0.9.3#bbe2e7c5',
      },
    },

    'def.cone': {
      statement: {
        en: "Let $D : I \\to \\mathcal{C}$ be a diagram. A **cone** over $D$ is an object $X \\in \\mathcal{C}$ together with a family of morphisms\n\n$$p_i : X \\longrightarrow D(i) \\qquad (i \\in I)$$\n\nsuch that for every $\\alpha : i \\to j$ in $I$,\n\n$$D(\\alpha) \\circ p_i = p_j$$\n\nEquivalently, a cone is a natural transformation from the constant diagram $\\Delta X$ to $D$. Reversing all arrows gives a **cocone**.",
        status: 'draft',
        basedOn: 'v0.9.3#cf1e5201',
      },
      notes: {
        en: "Intuition: $X$ stands outside the diagram and casts a beam toward each position of $D$, with the requirement that the projections be compatible (projecting first and then following an arrow in the diagram gives the same result as projecting directly to the target).\n\nWhen $X$ is fixed, the cones over $D$ are exactly the set of natural transformations $\\operatorname{Nat}(\\Delta X, D)$, so a cone is nothing new — just a natural transformation under another name.",
        status: 'draft',
        basedOn: 'v0.9.3#dfa84a20',
      },
    },

    'def.presheaf': {
      statement: {
        en: "A **(set-valued) presheaf** on a category $\\mathcal{C}$ is a functor\n\n$$T : \\mathcal{C}^{\\mathrm{op}} \\longrightarrow \\mathbf{Set}$$\n\nA **morphism** of presheaves is a natural transformation between them. Notation: for a morphism $f : Y \\to X$, write $f^{-1} = T(f) : T(X) \\to T(Y)$; for $s \\in T(X)$, write $s|_Y = f^{-1}(s)$.",
        status: 'draft',
        basedOn: 'v0.9.3#fbb3ca5a',
      },
      notes: {
        en: "Plainly: **each object is assigned a piece of data, and each morphism is assigned a restriction**. Contravariance is what lets a smaller object receive more data — the further one goes into substructures, the more restrictions there are.\n\nExamples:\n\n- On a poset: assign to each $i$ a set $T_i$, and to $i \\le j$ the restriction $T_j \\to T_i$ (dropping antisymmetry, the same works on a preorder).\n- On a topological space: $\\operatorname{Open}(X)$ is the category of open sets (morphisms are inclusions); a presheaf assigns to each open set $u$ a set $T(u)$, and to $u' \\subseteq u$ a restriction $T(u) \\to T(u')$, $s \\mapsto s|_{u'}$.\n\nThe presheaf of continuous functions $C^{0}$, the presheaf of smooth functions $C^{\\infty}$, the constant presheaf $\\underline{E}$ ($\\underline{E}(u) = E$, with restrictions the identity), and the presheaf of constant functions are all examples.\n\n- Fix $X \\in \\mathcal{C}$: $h_{X} : Y \\mapsto \\operatorname{Hom}_{\\mathcal{C}}(Y, X)$ is a presheaf, called a **representable presheaf**.",
        status: 'draft',
        basedOn: 'v0.9.3#9cb00c1e',
      },
    },

    'lem.urysohn': {
      statement: {
        en: "Let $X$ be a topological space. Then $X$ is **normal** $\\iff$ for any two disjoint closed sets $A, B \\subseteq X$, there exists a continuous function\n\n$$f : X \\longrightarrow [0, 1], \\qquad f|_{A} \\equiv 0, \\qquad f|_{B} \\equiv 1.$$",
        status: 'draft',
        basedOn: 'v0.9.3#9323dad3',
      },
      notes: {
        en: "⭐ **What it means: normality = \"there are enough continuous functions\".** Saying only that \"closed sets can be separated by open sets\" is still purely topological; Urysohn's lemma turns it into **a single function** — from then on one can measure topology with real numbers, and analysis can connect.\n\n**How the proof goes (the \"bisection\" construction of $f$).** First build a family of open sets between the two closed sets: for every dyadic rational $q \\in [0,1]$ assign an open set $U_{q}$ such that\n\n$$A \\subseteq U_{q} \\subseteq \\overline{U_{q}} \\subseteq U_{q'} \\quad (q < q'),$$\n\nThis step uses only normality (each step is \"disjoint closed sets are separated by open sets\"). Then set\n\n$$f(x) := \\inf\\{\\, q : x \\in U_{q} \\,\\}$$\n\n(take $1$ if $x \\notin$ any $U_{q}$). The **monotone squeezing** of that family of open sets shows that $f$ is continuous, with $f|_{A} = 0$ and $f|_{B} = 1$. The converse is direct: $f^{-1}[0, 1/2)$ and $f^{-1}(1/2, 1]$ are the open sets separating $A, B$. ∎\n\n**Use**: it is the prerequisite for the **Tietze extension theorem** (extending a continuous real function on a closed subset to the whole space), and Tietze in turn is the engine behind the statement that a real Banach space is acyclic on a compact Hausdorff space — a chain that eventually leads to condensed cohomology.",
        status: 'draft',
        basedOn: 'v0.9.3#8d837d2b',
      },
    },

    'def.paracompact': {
      statement: {
        en: "A topological space $X$ is **paracompact** if **every open cover has a locally finite open refinement**: for every open cover $\\mathcal{U}$ there exists an open cover $\\mathcal{V}$ such that\n\n$$\\mathcal{V}\\ \\text{refines}\\ \\mathcal{U}\\quad\\text{and}\\quad \\mathcal{V}\\ \\text{is locally finite}.$$",
        status: 'draft',
        basedOn: 'v0.9.3#2f7b5f43',
      },
      notes: {
        en: "⚠ **Convention**: Hausdorffness is **not** built into the definition of \"paracompact\" here (some books include it). Whenever separation is needed, \"paracompact Hausdorff\" is written out explicitly.\n\n**Where it sits in the hierarchy**: compact $\\implies$ paracompact (a finite subcover is certainly locally finite); paracompact Hausdorff $\\implies$ normal $\\implies$ regular $\\implies$ Hausdorff (theorems of this pack); metric spaces $\\implies$ paracompact (Stone's theorem).\n\n⭐ **What it buys**: partitions of unity (hence smoothing, integration and Stokes on manifolds, and extension theorems), and the local finiteness that sheaf theory needs so that \"Čech cohomology equals sheaf cohomology\" holds in detail. Manifolds are second countable by definition, hence automatically paracompact — which is why analysis never worries about it.\n\n**Heredity**: **open** and **closed** subspaces both inherit paracompactness (open subspace $Y$: one **cannot** simply add $X\\setminus Y$ to the cover — it need not be open; the correct route is first to take $Y$ open, extend each member openly inside $X$, lift the cover to an open cover of $X$, then take a locally finite open refinement and intersect it with $Y$; closed subspace: intersect the members of the open cover with the closed subspace). A general subspace need not be paracompact.\n\n⚠ The converse fails completely: a normal space need not be paracompact — $[0, \\omega_{1})$ (the set of all ordinals below the first uncountable ordinal) is normal and countably compact but not compact, and \"countably compact $+$ paracompact $\\implies$ compact\", so it is not paracompact.",
        status: 'draft',
        basedOn: 'v0.9.3#0cd0aff7',
      },
    },

    'lem.path-product': {
      statement: {
        en: "Let $\\alpha$ be a path from $x_{0}$ to $x_{1}$, and $\\beta$ a path from $x_{1}$ to $x_{2}$. Their **concatenation** is \"first traverse $\\alpha$, then $\\beta$, each in half the time\":\n\n$$(\\alpha * \\beta)(t) = \\alpha(2t) \\quad (0 \\le t \\le \\tfrac{1}{2}),$$\n$$(\\alpha * \\beta)(t) = \\beta(2t - 1) \\quad (\\tfrac{1}{2} \\le t \\le 1).$$\n\nBy the pasting lemma, $\\alpha * \\beta$ is continuous and is a path from $x_{0}$ to $x_{2}$. Also write $\\bar{\\alpha}(t) := \\alpha(1 - t)$ for the **reverse path**, and let $e_{x}$ denote the constant path $t \\mapsto x$. Then:\n\n1. **Well defined**: $\\alpha \\simeq_{p} \\alpha'$ and $\\beta \\simeq_{p} \\beta'$ $\\implies$ $\\alpha * \\beta \\simeq_{p} \\alpha' * \\beta'$;\n2. **Associativity**: $(\\alpha * \\beta) * \\gamma \\simeq_{p} \\alpha * (\\beta * \\gamma)$;\n3. **Unit**: $e_{x_{0}} * \\alpha \\simeq_{p} \\alpha \\simeq_{p} \\alpha * e_{x_{1}}$;\n4. **Inverse**: $\\alpha * \\bar{\\alpha} \\simeq_{p} e_{x_{0}}$ and $\\bar{\\alpha} * \\alpha \\simeq_{p} e_{x_{1}}$.\n\nThus \"homotopy classes of loops based at $x_{0}$\" with multiplication $[\\alpha][\\beta] := [\\alpha * \\beta]$ form a group.",
        status: 'draft',
        basedOn: 'v0.9.3#924f9a82',
      },
      notes: {
        en: "⚠ **None of these four is an equality at the level of paths.** $(\\alpha * \\beta) * \\gamma$ and $\\alpha * (\\beta * \\gamma)$ have genuinely different values at $t = 1/4, 1/2$; they are only **homotopic**. Hence multiplication must be defined on **homotopy classes**.\n\n**Reparametrization is the whole trick**: if $\\varphi : [0, 1] \\to [0, 1]$ is continuous with $\\varphi(0) = 0$ and $\\varphi(1) = 1$, then $\\alpha \\circ \\varphi \\simeq_{p} \\alpha$, with homotopy $F(t, s) := \\alpha((1 - s)\\,\\varphi(t) + s\\,t)$. Associativity is just taking $\\varphi$ to be the reparametrization \"split at $1/4, 1/2, 1/4$\".\n\n⭐ The homotopy in the unit law **cannot** be something \"stationary\" like $F(t, s) = e_{x_{0}} * \\alpha$: the unit law really requires a deformation, not an equality.\n\n💡 In one sentence: **multiplication at the level of paths is bad (not associative, no unit), at the level of homotopy classes it is good (a group)** — which is why the fundamental group collects \"classes\" rather than \"paths\".",
        status: 'draft',
        basedOn: 'v0.9.3#7e293f99',
      },
    },

    'prop.induced-homomorphism': {
      statement: {
        en: "Let $f : X \\to Y$ be continuous with $f(x_{0}) = y_{0}$. Define\n\n$$f_{*} : \\pi_{1}(X, x_{0}) \\longrightarrow \\pi_{1}(Y, y_{0}),$$\n$$f_{*}([\\alpha]) := [f \\circ \\alpha].$$\n\nThen:\n\n1. **Well defined**: $\\alpha \\simeq_{p} \\beta \\implies f \\circ \\alpha \\simeq_{p} f \\circ \\beta$;\n2. **Homomorphism**: $f_{*}([\\alpha][\\beta]) = f_{*}([\\alpha])\\,f_{*}([\\beta])$;\n3. **Functoriality**: $(1_{X})_{*} = \\operatorname{id}$, and $(g \\circ f)_{*} = g_{*} \\circ f_{*}$;\n4. **Homotopy invariance**: if $f \\simeq g \\; (\\operatorname{rel} \\{x_{0}\\})$, then $f_{*} = g_{*}$.\n\nTherefore $\\pi_{1}$ is a **functor** from \"based topological spaces\" to \"groups\".",
        status: 'draft',
        basedOn: 'v0.9.3#b2c0210d',
      },
      notes: {
        en: "**Immediate consequences of the four items**:\n\n- A homeomorphism $f$ gives an isomorphism $f_{*}$ (the inverse is the inverse homeomorphism), so $\\pi_{1}$ is a **topological invariant**;\n- More strongly, a homotopy equivalence gives an isomorphism — so $\\pi_{1}$ is also a **homotopy invariant**, and a contractible space must have fundamental group $1$;\n- By (3), $\\pi_{1}$ turns \"composition of spaces\" into \"composition of groups\", with the **order not reversed** (unlike $f^{*}$ in cohomology).\n\n⚠ Item (4) requires **relative to the basepoint**: a general homotopy $f \\simeq g$ only guarantees that $g_{*}$ and $f_{*}$ are \"conjugate\", not equal. This is exactly what `prop.pi1-basepoint` handles.\n\n💡 Use: to prove \"if $\\pi_{1}$ differ then the spaces are not homeomorphic\", it suffices to find something continuous maps cannot do (e.g. no isomorphism). For proving \"cannot\", functoriality is the cheapest tool — that is how `thm.no-retraction-disk` in this pack argues.",
        status: 'draft',
        basedOn: 'v0.9.3#fe9ac6a1',
      },
    },

    'thm.euler-characteristic': {
      statement: {
        en: "Let $K$ be a **finite** simplicial complex, $\\alpha_{p}$ the number of its $p$-simplices, and $\\beta_{p} := \\operatorname{rank} H_{p}(K)$ the $p$-th **Betti number** (the rank of the free part). Then\n\n$$\\chi(K) = \\sum_{p} (-1)^{p} \\alpha_{p} = \\sum_{p} (-1)^{p} \\beta_{p}.$$\n\nThat is: **the left side merely counts simplices, while the right side depends only on the homology groups**.",
        status: 'draft',
        basedOn: 'v0.9.3#c9f0047d',
      },
      notes: {
        en: "**Two examples**:\n\n- The tetrahedral subdivision of $S^{2}$: $\\alpha = (4, 6, 4, 0)$, $\\chi = 4 - 6 + 4 - 0 = 2$; $\\beta = (1, 0, 1)$, $\\sum = 1 - 0 + 1 = 2$ ✓\n- The minimal subdivision of the real projective plane $\\mathbb{RP}^{2}$ (6 vertices / 15 edges / 10 faces): $\\chi = 6 - 15 + 10 = 1$; while $H_{1}(\\mathbb{RP}^{2}) = \\mathbb{Z}/2$ **has rank zero**, so $\\sum(-1)^{p}\\beta_{p} = 1 - 0 + 0 = 1$ ✓\n\n⚠ **Note that the right side uses the rank (Betti number), not $\\#H_{p}$**. Torsion (e.g. $\\mathbb{Z}/2$) **does not enter** the alternating sum; the example $\\mathbb{RP}^{2}$ above matches precisely because of this.\n\n⭐ **The real value of the theorem** is not the identity itself but that the right side **depends only on homology** — hence $\\chi$ is independent of the triangulation (together with `thm.simplicial-approximation`) and is a topological invariant. Conversely, to compute $\\chi$ one only counts simplices, without computing homology at all.\n\n**Idea of the proof** (the full computation is on the edge): twice rank–nullity, once on $\\partial_{p}$ and once on $Z_{p}/B_{p} \\cong H_{p}$; the dimensions of the boundary groups cancel in pairs in the alternating sum (telescoping).",
        status: 'draft',
        basedOn: 'v0.9.3#4dc64cab',
      },
    },

    'prop.h0-components': {
      statement: {
        en: "Let $X \\ne \\emptyset$, and let $\\pi_{0}(X)$ be the set of its **path components**. Then\n\n$$H_{0}(X) \\;\\cong\\; \\bigoplus_{C \\in \\pi_{0}(X)} \\mathbb{Z}.$$\n\nMore precisely: choosing a point $C$ from each component $x_{C}$, the classes $[x_{C}]$ form a basis of $H_{0}(X)$. In particular\n\n$$\\tilde{H}_{0}(X) = 0 \\iff X \\text{ is path-connected}.$$",
        status: 'draft',
        basedOn: 'v0.9.3#57d5e98a',
      },
      notes: {
        en: "**So $H_{0}$ is \"how many pieces $X$ has\"**. This also explains why $\\tilde{H}_{0}(S^{0}) = \\mathbb{Z}$ (two points; rank $2$ divided by the diagonal $\\mathbb{Z}$ leaves rank $1$), so the formula for sphere homology is uniform at $p = 0$ as well.\n\n⚠ **Path connected vs connected**: $H_{0}$ sees only **path** components, not connected components. On usual spaces (locally path connected) the two agree, but not in general — for instance the topologist's sine curve is connected but not path connected, and its $H_{0}$ reflects the path components.\n\n**Why the boundary lands on \"differences of points in the same component\"**: $\\partial$ acts only on a singular $1$-simplex (a path), and its image is the difference of the two endpoints; the whole path lies in one path component. So $\\partial$ cannot cross components $\\implies$ points in different components are linearly independent in $H_{0}$.\n\n💡 This is the first conclusion in this pack that **computes an actual number**: $H_{0}$ is the only homology group whose answer you can write down just by looking at the space.",
        status: 'draft',
        basedOn: 'v0.9.3#396c13f2',
      },
    },

    'thm.cauchy-criterion': {
      statement: {
        en: "A real sequence $\\{x_n\\}$ converges (to some real number) if and only if it is a Cauchy sequence.",
        status: 'draft',
        basedOn: 'v0.9.3#37ae9d42',
      },
      notes: {
        en: "⭐ The two directions have completely different content: \"convergent $\\implies$ Cauchy\" uses only the triangle inequality and is **trivial**; \"Cauchy $\\implies$ convergent\" is **completeness itself** — it says that a sequence whose own terms are eventually close to each other must have a limit waiting for it.\n\n⭐ Practical value: to prove convergence one need not guess the limit first.\n\nThe convergence radius of power series, the completeness of function spaces, and the definition of a Banach space (every Cauchy sequence converges) are all direct descendants of this result.",
        status: 'draft',
        basedOn: 'v0.9.3#823bca41',
      },
    },

    'thm.monotone-convergence': {
      statement: {
        en: "Let $\\{x_n\\} \\subseteq \\mathbb{R}$.\n\n- If $x_n$ is increasing ($x_1 \\le x_2 \\le \\cdots$) and bounded above, then $\\{x_n\\}$ converges and\n\n$$\\lim_{n \\to \\infty} x_n = \\sup_{n} x_n$$\n\n- If $x_n$ is decreasing and bounded below, then $\\{x_n\\}$ converges and $\\lim_{n \\to \\infty} x_n = \\inf_{n} x_n$.",
        status: 'draft',
        basedOn: 'v0.9.3#b015eeaa',
      },
      notes: {
        en: "⭐ The value of the theorem: it asserts that the limit exists **without knowing who the limit is** — and the proof identifies it along the way (it is the supremum of the sequence).\n\nAll of real analysis uses this pattern (series with nonnegative terms, monotone functions, continuity of measure, the prototype of the monotone convergence theorem).\n\n⚠ Neither hypothesis can be dropped: monotone without boundedness diverges ($x_n = n$); bounded without monotonicity may fail to converge ($x_n = (-1)^{n}$).",
        status: 'draft',
        basedOn: 'v0.9.3#cba5a5d9',
      },
    },

    'lem.nested-intervals': {
      statement: {
        en: "Let $I_n = [a_n, b_n]$ be a sequence of **closed** intervals satisfying\n\n- $I_1 \\supseteq I_2 \\supseteq \\cdots$ (nested),\n- $b_n - a_n \\to 0$ (the lengths tend to zero).\n\nThen $\\bigcap_{n=1}^{\\infty} I_n$ contains exactly **one** point.",
        status: 'draft',
        basedOn: 'v0.9.3#44dba418',
      },
      notes: {
        en: "⭐ This is the formal form of \"bisection\": applied to a bounded sequence it gives the Bolzano–Weierstrass theorem; every step of a proof that keeps halving an interval is this lemma.\n\n⚠ Neither condition can be relaxed: **closed** — $\\bigcap_{n} (0, 1/n] = \\emptyset$; **lengths tending to zero** — $\\bigcap_{n} [n, +\\infty) = \\emptyset$ while the lengths do not tend to zero.\n\nIf only nesting is required and the lengths need not tend to zero, the conclusion weakens to \"the intersection is nonempty\" (the intersection is then a point or a closed interval).",
        status: 'draft',
        basedOn: 'v0.9.3#80e61a2d',
      },
    },

    'cor.heine-borel': {
      statement: {
        en: "Let $K \\subseteq \\mathbb{R}^{n}$, regarded as a metric space with the Euclidean distance. Then $K$ is compact if and only if $K$ is bounded and closed.\n\n(\"Compact\" means \"every open cover has a finite subcover\", or equivalently \"every sequence has a subsequence converging to a point of $K$\".)",
        status: 'draft',
        basedOn: 'v0.9.3#4fca12bb',
      },
      notes: {
        en: "⭐ This is **a corollary of a corollary**: $\\mathbb{R}^{n}$ complete + bounded sets are totally bounded $\\implies$ bounded closed sets are sequentially compact $\\implies$ compact (see \"three equivalent characterizations of compactness in metric spaces\").\n\nWhat is really used is the coordinatewise version of Bolzano–Weierstrass.\n\n⚠ It is **not** a theorem for general metric spaces: in a general metric space \"compact $\\implies$ bounded closed\" always holds, but not conversely (the discrete space is a sufficient example, as is the unit ball of $\\ell^{2}$).\n\n⭐ An immediately usable consequence: the closed interval $[a, b]$ is compact — hence a continuous function attains its extrema on it, is uniformly continuous, and is integrable.\n\nThe three existence theorems of elementary calculus all rest on this.",
        status: 'draft',
        basedOn: 'v0.9.3#3b50e1f7',
      },
    },

    'lem.archimedean': {
      statement: {
        en: "Let $K$ be a **complete ordered field** (for example $\\mathbb{R}$). Then:\n\n**(i) Archimedean property**: the natural numbers are unbounded in $K$ —\n\n$$\\forall x \\in K,\\ \\exists n \\in \\mathbb{N} : n > x$$\n\n**(ii) $\\mathbb{Q}$ is dense in $K$**: between any two elements there lies a rational —\n\n$$\\forall x, y \\in K,\\ x < y \\implies \\exists q \\in \\mathbb{Q} : x < q < y$$\n\n(Here $\\mathbb{Q}$ denotes the embedded image of $\\mathbb{Q}$ in $K$: $1$ generates $\\mathbb{Z}$ in $K$, and taking fractions gives $\\mathbb{Q}$.)",
        status: 'draft',
        basedOn: 'v0.9.3#317dfd6c',
      },
      notes: {
        en: "⭐ Both items are **consequences of completeness (the supremum principle)**; no further assumption is needed.\n\nTheir uses are extensive:\n\n- Proving the **uniqueness of the complete ordered field** (well-definedness of $\\mathbb{R}$) relies on (ii) — the rationals are dense on both sides, which is what allows approximation of arbitrary elements by \"images of rationals\";\n\n\n- Every \"take $n$ large enough\" and \"take $\\varepsilon = 1/n$\" in analysis is really an application of (i);\n\n\n- (ii) is also the licence for \"approximating reals by rationals\": every real number is a supremum of rationals.\n\n⚠ Completeness $\\implies$ the Archimedean property, but **not conversely**: $\\mathbb{Q}$ is Archimedean yet not complete.\n\n\n⚠ The $q$ squeezed in (ii) must lie **strictly** between the two numbers — this is precisely where \"dense\" is stronger than \"there are rationals arbitrarily close\".",
        status: 'draft',
        basedOn: 'v0.9.3#72990682',
      },
    },

    'prop.limit-arithmetic': {
      statement: {
        en: "Let $x_n \\to x$, $y_n \\to y$ (finite), $c \\in \\mathbb{R}$. Then\n\n- $x_n \\pm y_n \\to x \\pm y$, $c\\,x_n \\to c\\,x$, $x_n y_n \\to xy$;\n- if $y \\ne 0$, then for $n$ sufficiently large $y_n \\ne 0$, and $x_n / y_n \\to x / y$;\n- $|x_n| \\to |x|$;\n- **Order preservation**: if there is $N_0$ such that $x_n \\le y_n$ whenever $n \\ge N_0$, then $x \\le y$.\n\nThe function version is copied verbatim (replace \"there exists $N$\" by \"there exists $\\delta$\").",
        status: 'draft',
        basedOn: 'v0.9.3#2a1a9837',
      },
      notes: {
        en: "⭐ This group is a set of **operational laws**: it says that \"taking limits\" commutes with the four arithmetic operations.\n\nAll computations in analysis rest on it.\n\n⚠ Order preservation yields only $\\le$, never $<$: for example $0 < 1/n$ holds for all $n$, yet the limit is $0 \\le 0$.\n\n**A strict inequality is smoothed away when passing to the limit**.\n\n⚠ \"A limit, if it exists, is unique\" and \"convergent implies **locally** bounded\" also come from the same definition (the function version only guarantees boundedness on some punctured neighbourhood of $x_0$: for $f(x) = x$ with $x_0 = 0$, the limit exists, yet $f$ is unbounded on its whole domain).",
        status: 'draft',
        basedOn: 'v0.9.3#74d7129c',
      },
    },

    'thm.cauchy-mvt': {
      statement: {
        en: "Let $a < b$, and let $f, g$ be continuous on $[a, b]$ and differentiable on $(a, b)$, with $g'(x) \\ne 0$ holding everywhere in $(a, b)$. Then there exists $\\xi \\in (a, b)$ such that\n\n$$\\frac{f(b) - f(a)}{g(b) - g(a)} = \\frac{f'(\\xi)}{g'(\\xi)}$$",
        status: 'draft',
        basedOn: 'v0.9.3#8bea67b0',
      },
      notes: {
        en: "⭐ It is not simply Lagrange's theorem \"with $g(x) = x$\": expressing the increments of two functions **simultaneously** at the same point $\\xi$ is the entire reason l'Hôpital's rule works.\n\n⚠ The condition $g' \\ne 0$ cannot be omitted — it also guarantees $g(b) \\ne g(a)$ (by Rolle's theorem), so that the denominator makes sense.\n\n⚠ Parametric-curve reading: $t \\mapsto (g(t), f(t))$ is a curve, and the conclusion says that the tangent at some interior point is **parallel to** the chord joining the endpoints — geometrically the same statement as Lagrange's \"parallel to the chord\", except that the chord need not be the graph of a function.",
        status: 'draft',
        basedOn: 'v0.9.3#a43823ed',
      },
    },

    'thm.riemann-criterion': {
      statement: {
        en: "Let $f$ be bounded on $[a, b]$. Then $f$ is integrable if and only if for every $\\varepsilon > 0$ there exists a partition $P$ such that\n\n$$U(f, P) - L(f, P) = \\sum_{i} \\omega_i\\,\\Delta x_i < \\varepsilon$$\n\n($\\omega_i$ is the oscillation of $f$ on the $i$-th subinterval.) Moreover the two definitions (limit of tagged sums / Darboux suprema) give the same value of the integral.",
        status: 'draft',
        basedOn: 'v0.9.3#6b3b7434',
      },
      notes: {
        en: "⭐ **Oscillation sums can be made arbitrarily small** is the most useful integrability criterion in the subject: every proof that \"some function is integrable\" reduces to an estimate of oscillation sums.\n\n⭐ Example of use: for continuous functions use **uniform continuity** to control $\\omega_i$;\n\nfor **monotonically increasing** functions use equal partitions to make $\\sum \\omega_i \\Delta x_i \\le (f(b) - f(a))\\|P\\|$ (for decreasing functions take absolute values on the right).\n\n⚠ The criterion requires only that **some** partition makes the oscillation sum small, not all partitions — because the oscillation sum is monotone nonincreasing under refinement.",
        status: 'draft',
        basedOn: 'v0.9.3#007e9dff',
      },
    },

    'prop.integral-order': {
      statement: {
        en: "Let $f, g$ be integrable on $[a, b]$.\n\n- **Order preservation**: if $f(x) \\le g(x)$ holds everywhere, then $\\int_a^b f \\le \\int_a^b g$; in particular $f \\ge 0 \\implies \\int_a^b f \\ge 0$.\n- **Absolute value**: $|f|$ is integrable, and\n\n$$\\Bigl| \\int_a^b f \\Bigr| \\le \\int_a^b |f|$$\n\n- **Basic estimate**: if $|f(x)| \\le M$ holds everywhere, then $\\bigl| \\int_a^b f \\bigr| \\le M\\,(b - a)$.",
        status: 'draft',
        basedOn: 'v0.9.3#389e9e2e',
      },
      notes: {
        en: "⭐ Order preservation sounds trivial, but it is the source of **all integral inequalities**: to prove $\\int f \\le \\int g$, it suffices to prove $f \\le g$ pointwise.\n\n⚠ The **non-strict** inequality obtained from order preservation cannot be upgraded: if $f \\le g$ and $f < g$ only at one point, still $\\int_a^b f = \\int_a^b g$ (changing the value at one point does not change the Riemann integral).\n\n⭐ Integrability of $|f|$ is a phenomenon specific to Riemann integration (on the Lebesgue side, integrability of $f$ immediately implies integrability of $|f|$);\n\nconversely integrability of $|f|$ does not imply integrability of $f$ — take $f$ alternating between $1$ and $-1$ on rationals/irrationals; then $|f| \\equiv 1$ is integrable while $f$ is not.",
        status: 'draft',
        basedOn: 'v0.9.3#e130ee28',
      },
    },

    'thm.root-test': {
      statement: {
        en: "Let $a_n \\ge 0$, and set\n\n$$\\alpha := \\limsup_{n \\to \\infty} \\sqrt[n]{a_n}$$\n\nThen: if $\\alpha < 1$, $\\sum a_n$ converges; if $\\alpha > 1$, $\\sum a_n$ diverges; if $\\alpha = 1$, there is **no conclusion**.",
        status: 'draft',
        basedOn: 'v0.9.3#e7913f13',
      },
      notes: {
        en: "⭐ The mechanism is \"comparison with a geometric series\": when $\\alpha < q < 1$, eventually $\\sqrt[n]{a_n} \\le q$, i.e. $a_n \\le q^{n}$, and the geometric series converges.\n\n⭐ Relation to the ratio test: **the root test is stronger**.\n\nIf $\\lim a_{n+1}/a_n$ exists, then $\\lim \\sqrt[n]{a_n}$ also exists and the two are equal;\n\nthe converse fails (examples such as $a_n = 2^{-n}$ and $a_n = 2^{-n - (-1)^n}$).\n\nSo \"what the ratio test cannot decide, the root test may\".\n\n⚠ What is used is the **$\\limsup$**, not $\\lim$: the sequence $\\sqrt[n]{a_n}$ need not converge, but $\\limsup$ is always defined.\n\n⚠ When $\\alpha = 1$ it fails completely: both $\\sum 1/n$ diverging and $\\sum 1/n^{2}$ converging have $\\alpha = 1$.",
        status: 'draft',
        basedOn: 'v0.9.3#de3a09b9',
      },
    },

    'thm.cauchy-criterion-series': {
      statement: {
        en: "Let $\\{a_n\\} \\subseteq \\mathbb{R}$, $s_N := \\sum_{n=1}^{N} a_n$. Then $\\sum a_n$ converges if and only if\n\n$$\\forall \\varepsilon > 0,\\ \\exists N,\\ \\forall n > m \\ge N :\\ \\Bigl| \\sum_{k=m+1}^{n} a_k \\Bigr| < \\varepsilon$$\n\n**Necessary condition**: $\\sum a_n$ converges $\\implies$ $a_n \\to 0$.",
        status: 'draft',
        basedOn: 'v0.9.3#47636a44',
      },
      notes: {
        en: "⭐ The role of this criterion is **to turn a series problem into a sequence problem**: it is just the Cauchy criterion for $\\mathbb{R}$ applied to the sequence of partial sums $\\{s_N\\}$ (with interval additivity writing $s_n - s_m$ as a tail).\n\n⚠ \"$a_n \\to 0$\" is only a **necessary** condition: the harmonic series $\\sum 1/n$ has terms tending to zero yet diverges.\n\nTo prove divergence it is very useful (if the terms do not tend to zero, the series diverges at once); to prove convergence it says nothing.\n\n⭐ Every criterion in this pack descends from it: the comparison test uses \"a tail dominated by a larger tail\", Abel–Dirichlet uses \"a tail dominated by the boundedness of partial sums\".",
        status: 'draft',
        basedOn: 'v0.9.3#506188ca',
      },
    },

    'thm.comparison-test': {
      statement: {
        en: "Let $0 \\le a_n \\le b_n$ hold for all sufficiently large $n$. Then\n\n- $\\sum b_n$ converges $\\implies$ $\\sum a_n$ converges;\n- $\\sum a_n$ diverges $\\implies$ $\\sum b_n$ diverges.\n\n**Limit form**: if $a_n, b_n > 0$ and $\\dfrac{a_n}{b_n} \\to L$, then for $L \\in (0, +\\infty)$ the two **converge or diverge together**; for $L = 0$, convergence of $\\sum b_n$ implies convergence of $\\sum a_n$.",
        status: 'draft',
        basedOn: 'v0.9.3#990c5f71',
      },
      notes: {
        en: "⭐ This is **the foundation of all criteria for series with positive terms**, and it is itself just a direct translation of \"a monotone bounded partial-sum sequence $\\implies$ converges\": the partial sums of $\\sum a_n$ are dominated by those of $\\sum b_n$.\n\n⚠ The hypothesis is **nonnegativity** (or eventual nonnegativity): with mixed signs the partial sums are no longer monotone, and \"dominated\" means nothing.\n\n⚠ It is **not** a corollary of Kummer's test — the direction is the opposite: the proof of Kummer's test itself uses this \"monotone bounded partial sums\" idea (i.e. comparison).\n\nDeleting this would leave the whole pack of criteria without a foothold.",
        status: 'draft',
        basedOn: 'v0.9.3#0a64f047',
      },
    },

    'thm.omega': {
      statement: {
        en: "There exists a **smallest inductive set** $\\omega$: it contains $\\emptyset$, is closed under $x \\mapsto x \\cup \\{x\\}$, and is contained in every inductive set:\n\n$$\\omega = \\{ \\emptyset, \\{\\emptyset\\}, \\{\\emptyset, \\{\\emptyset\\}\\}, \\{\\emptyset, \\{\\emptyset\\}, \\{\\emptyset, \\{\\emptyset\\}\\}\\}, \\ldots  \\}$$\n\nReading $\\in$ as $<$, $\\langle \\omega , \\in \\rangle$ is the natural number system $\\langle \\mathbb{N}, <\\rangle$.",
        status: 'draft',
        basedOn: 'v0.9.3#ae7341a5',
      },
      notes: {
        en: "$\\omega$ is at the same time the smallest limit ordinal. Its construction needs only the **axiom of infinity + separation schema** (**the power set is not needed**: $\\omega$ is the set of those elements that \"belong to every inductive subset\", which separation extracts directly from an inductive set).",
        status: 'draft',
        basedOn: 'v0.9.3#06459c3e',
      },
    },

    'thm.induction': {
      statement: {
        en: "Let $\\omega$ be the smallest inductive set (that is, $\\mathbb{N}$).\n\n**(i) Induction principle**: if $S \\subseteq \\omega$ satisfies\n\n$$\\emptyset \\in S, \\qquad x \\in S \\implies x \\cup \\{x\\} \\in S$$\n\nthen $S = \\omega$.\n\n**(ii) Recursive definition**: given a set $A$, an element $a_0 \\in A$ and a function $F : A \\to A$, there exists a **unique** function $g : \\omega \\to A$ such that\n\n$$g(\\emptyset) = a_0, \\qquad g(x \\cup \\{x\\}) = F(g(x)) \\quad \\forall x \\in \\omega$$",
        status: 'draft',
        basedOn: 'v0.9.3#3a688b8c',
      },
      notes: {
        en: "⭐ **The induction principle governs proofs, recursive definition governs constructions** — two sides of the same fact, both coming from \"$\\omega$ is the smallest inductive set\".\n\nAddition, multiplication and order on $\\mathbb{N}$, and later the operations on $\\mathbb{Z}$ and $\\mathbb{Q}$, are all defined recursively and their properties verified by induction.\n\n⚠ **The induction principle holds only for $\\omega$**;\n\nfor a general well-ordered set one needs **transfinite induction / transfinite recursion**.\n\n\n⚠ Recursive definition must use \"a function $F$\", not \"a sentence\", otherwise one falls into the trap of defining something in terms of itself.",
        status: 'draft',
        basedOn: 'v0.9.3#f0214205',
      },
    },

    'thm.caratheodory': {
      statement: {
        en: "Let $\\mu^{*}$ be an outer measure on $X$, and $\\mathcal{M}$ the family of all $\\mu^{*}$-measurable sets. Then\n\n1. **$\\mathcal{M}$ is a $\\sigma$-algebra**;\n2. **$\\mu^*|_\\mathcal{M}$ is a measure on $(X, \\mathcal{M})$** (that is, $\\mu^{*}$ is genuinely additive on $\\mathcal{M}$);\n3. this measure is **complete**.",
        status: 'draft',
        basedOn: 'v0.9.3#adc2cf3f',
      },
      notes: {
        en: "This is the hinge of the whole construction of measure theory: **an outer measure need not be additive, but on its \"splittable sets\" it becomes additive**.\n\nThe proof of 1 is a lengthy verification: finite unions, complements and countable disjoint unions, one by one.\n\nCompleteness of 3 comes from the definition itself: if $\\mu^{*}(A) = 0$ and $B \\subseteq A$, then for every $E$ one has $\\mu^{*}(E \\cap B) \\le \\mu^{*}(B) = 0$ and $\\mu^{*}(E \\cap B^{c}) \\le \\mu^{*}$(E); squeezing both sides shows that $B$ satisfies the measurability condition.",
        status: 'draft',
        basedOn: 'v0.9.3#01849809',
      },
    },

    'prop.outer-measure-induced': {
      statement: {
        en: "Let $\\mathcal{E} \\subseteq \\mathcal{P}(X)$, $\\emptyset \\in \\mathcal{E}$, $X \\in \\mathcal{E}$, $\\rho : \\mathcal{E} \\to [0, +\\infty ]$ satisfy $\\rho (\\emptyset ) = 0$.\n\nFor $A \\subseteq X$ define\n\n$$\\mu^*(A) := \\inf \\{ \\sum_{j=1}^{\\infty} \\rho(E_j) : E_j \\in \\mathcal{E}, A \\subseteq \\bigcup_{j=1}^{\\infty} E_j \\}$$\n\n(covering $A$ by countably many sets from $\\mathcal{E}$ and taking the infimum.) Then $\\mu^{*}$ is an **outer measure** on $X$.",
        status: 'draft',
        basedOn: 'v0.9.3#c18a4858',
      },
      notes: {
        en: "This formula is just \"cover $A$ with bricks of known area and take the cheapest covering\" — the Lebesgue outer measure is exactly the special case ($\\mathcal{E}$ open intervals, $\\rho$ length).\n\nWhy require $X \\in \\mathcal{E}$: to guarantee that $A \\subseteq X$ always has a cover, so that the infimum is not taken over the empty set.\n\n⚠ This step uses only $\\rho (\\emptyset ) = 0$, **not additivity** — so in general $\\mu^{*}$ does not recover $\\rho$. Recovering it is precisely Carathéodory's job.",
        status: 'draft',
        basedOn: 'v0.9.3#9d9c5f96',
      },
    },

    'prop.caratheodory-extension': {
      statement: {
        en: "Let $\\mathfrak{A} \\subseteq \\mathcal{P}(X)$ be an **algebra**, $\\mu _{0}$ a **premeasure** on $\\mathfrak{A}$, and $\\mu^{*}$ the outer measure induced by $\\mu _{0}$ (as in the previous proposition, with $\\mathcal{E} = \\mathfrak{A}$, $\\rho = \\mu _{0}$).\n\nThen\n\n1. $\\mu^*|_\\mathfrak{A} = \\mu_0$\n2. **every set in $\\mathfrak{A}$ is $\\mu^{*}$-measurable**, hence\n\n$$\\mathfrak{A} \\subseteq \\mathcal{M}(\\mathfrak{A}) \\subseteq \\mathcal{M}$$\n\n($\\mathcal{M}$ is the family of all $\\mu^{*}$-measurable sets), so $\\mu^{*}|_\\mathcal{M}$ is an extension of $\\mu _{0}$ to the $\\sigma$-algebra $\\mathcal{M}(\\mathfrak{A})$.",
        status: 'draft',
        basedOn: 'v0.9.3#8818cb9c',
      },
      notes: {
        en: "This is the finale of the three-step \"premeasure $\\to$ outer measure $\\to$ measure\": **the premeasure is fully recovered on the extension to the $\\sigma$-algebra**.\n\nThe two directions of 1: $\\mu^*(A) \\le \\mu_0(A)$ is direct ($A$ is covered by $A$ itself); the reverse uses countable additivity of $\\mu _{0}$.\n\n2 is the technical core: verify Carathéodory's splitting condition on $\\mathfrak{A}$.\n\nNot only $\\mathfrak{A}$ itself, but also the sets obtained by countable unions and intersections (and iterating) — $\\mathfrak{A}_\\sigma$, $\\mathfrak{A}_\\delta$, $\\mathfrak{A}_\\sigma \\delta$, $\\mathfrak{A}_\\delta \\sigma$ — are all $\\mu^{*}$-measurable, because $\\mathcal{M}$ is a $\\sigma$-algebra and is closed under these operations.",
        status: 'draft',
        basedOn: 'v0.9.3#052f3851',
      },
    },

    'thm.caratheodory-uniqueness': {
      statement: {
        en: "Let $\\mu _{0}$ be a premeasure on a **ring** $\\mathfrak{A}$ (Carathéodory uniqueness already holds for rings; the case where $\\mathfrak{A}$ is an algebra is a special case), and $\\mu := \\mu^{*}|_\\mathcal{M}$ the extension obtained from it by Carathéodory. If $\\nu$ is a measure on $\\mathcal{M}(\\mathfrak{A})$ that is **another** extension of $\\mu _{0}$, then\n\n$$\\nu(E) \\le \\mu(E)\\quad  \\forall E \\in \\mathcal{M}(\\mathfrak{A})$$\n\nand equality holds when $\\mu(E) < \\infty$; moreover, if $\\mu$ is $\\sigma$-finite, then $\\nu = \\mu$.",
        status: 'draft',
        basedOn: 'v0.9.3#848eca6a',
      },
      notes: {
        en: "Key point: **the Carathéodory extension is the \"largest\" one**.\n\nThe reason is hidden in the definition of $\\mu^{*}$ — it is built by \"taking infima over coverings\", and any extension $\\nu$ must be subadditive, so $\\nu (A) \\le \\sum \\nu (E_{j}) = \\sum \\mu _{0}(E_{j})$; taking the infimum over all coverings gives $\\nu \\le \\mu^{*}$.\n\n⚠ Without $\\sigma$-finiteness uniqueness **fails** (Lebesgue length on $\\mathbb{R}$ is not $\\sigma$-finite, and this cannot be fixed): take $\\mathfrak{A} =$ the half-open intervals with finite disjoint unions, $\\mu _{0}((a,b]) = +\\infty$ ($a < b$); it is not $\\sigma$-finite (each piece is $\\infty$). Two extensions: $\\mu _{1}(E) = +\\infty$ ($E \\ne \\emptyset$), $\\mu _{1}(\\emptyset) = 0$; another $\\mu _{2}(E) = 0$ ($E$ is a Lebesgue null set), and $+\\infty$ otherwise. They agree on $\\mathfrak{A}$ (both take $\\infty$) yet part ways on singletons.\n\n$\\sigma$-finiteness is exactly what plugs this loophole.\n\nThe standard finale of constructing a measure is this: **first build a premeasure (easy), then extend (Carathéodory guarantees existence), and finally use $\\sigma$-finiteness for uniqueness**.",
        status: 'draft',
        basedOn: 'v0.9.3#413ea295',
      },
    },

    'thm.completion': {
      statement: {
        en: "Let $(X, \\mathcal{M}, \\mu )$ be a measure space. Put\n\n$$\\mathcal{N} = \\{ N \\in \\mathcal{M} : \\mu(N) = 0 \\}$$\n\n$$\\bar{\\mathcal{M}} = \\{ E \\cup F : E \\in \\mathcal{M},\\ F \\subseteq N,\\ N \\in \\mathcal{N} \\}$$\n\nThen\n\n1. $\\bar{\\mathcal{M}}$ is a $\\sigma$-algebra, and $\\mathcal{M} \\subseteq \\bar{\\mathcal{M}}$;\n2. let $\\bar{\\mu}(E \\cup F) := \\mu(E)$; it is a well-defined measure on $\\bar{\\mathcal{M}}$;\n3. $(X, \\bar{\\mathcal{M}}, \\bar{\\mu})$ is a **complete** measure space, called the **completion** of $(X, \\mathcal{M}, \\mu )$.",
        status: 'draft',
        basedOn: 'v0.9.3#0e07de8e',
      },
      notes: {
        en: "The intuition for $\\bar{\\mathcal{M}}$: \"sprinkle a little dust of null sets onto the original measurable sets\".\n\n**Well-definedness must be checked**: the representation $E \\cup F$ is not unique; if $E_{1} \\cup F_{1} = E_{2} \\cup F_{2}$, one must prove $\\mu (E_{1}) = \\mu (E_{2})$.\n\nThe method is to use $E_{1} \\subseteq E_{2} \\cup N_{2}$ ($N_{2}$ a null set) to get $\\mu (E_{1}) \\le \\mu (E_{2})$, and symmetrically for the reverse.\n\n⚠ Completion is \"stuffing the subsets of null sets in\"; the price is that the $\\sigma$-algebra grows while the measure stays the same.",
        status: 'draft',
        basedOn: 'v0.9.3#fb06831e',
      },
    },

    'def.premeasure': {
      statement: {
        en: "If $\\mathcal{M}$ is only a **ring** (not necessarily a $\\sigma$-algebra), while $\\mu : \\mathcal{M} \\to [0, +\\infty]$ still satisfies the two axioms of a measure:\n\n$$\\mu(\\emptyset) = 0, \\quad E_j \\cap E_k = \\emptyset\\ (j \\ne k),\\ \\bigcup_j E_j \\in \\mathcal{M} \\implies \\mu\\Bigl(\\bigcup_j E_j\\Bigr) = \\sum_j \\mu(E_j)$$\n\nthen $\\mu$ is called a **premeasure** on $\\mathcal{M}$.",
        status: 'draft',
        basedOn: 'v0.9.3#bf66262f',
      },
      notes: {
        en: "Why this intermediate notion: on $\\mathbb{R}$ the half-open intervals (a, b] form only a basic class; their finite disjoint unions form a ring, not yet a $\\sigma$-algebra — but length can already be defined there, and that is the premeasure.\n\nCarathéodory's extension theorem lifts the premeasure from the ring all the way to the generated $\\sigma$-algebra. So \"**build the premeasure first, then extend**\" is the standard two-step construction of a measure.",
        status: 'draft',
        basedOn: 'v0.9.3#e896cbba',
      },
    },

    'prop.measure-basic': {
      statement: {
        en: "Let $(X, \\mathcal{M}, \\mu )$ be a measure space, with all sets below taken from $\\mathcal{M}$.\n\n- **(a) Monotone**: $E \\subseteq F \\implies \\mu(E) \\le \\mu(F)$\n- **(b) Subadditive**: $\\mu( \\bigcup_j E_j ) \\le \\sum_j \\mu(E_j)$ (disjointness not required)\n- **(c) Continuous from below**: $E_1 \\subseteq E_2 \\subseteq \\cdots \\implies \\mu( \\bigcup_j E_j ) = \\lim_{j\\to\\infty} \\mu(E_j)$\n- **(d) Continuous from above**: $\\mu(E_1) < \\infty, \\quad  E_1 \\supseteq E_2 \\supseteq \\cdots \\implies \\mu( \\bigcap_j E_j ) = \\lim_{j\\to\\infty} \\mu(E_j)$",
        status: 'draft',
        basedOn: 'v0.9.3#ea018c03',
      },
      notes: {
        en: "(a): split $F$ as $F = E \\cup (F \\setminus E)$ and use countable additivity (fill the remaining positions with $\\emptyset$).\n\n(b): rewrite $\\bigcup E_{j}$ as a disjoint union: $F_{j} = E_{j} \\setminus (E_{1} \\cup \\cdots \\cup E_{j-1})$, then $\\mu (\\bigcup E_{j}) = \\sum \\mu (F_{j}) \\le \\sum \\mu (E_{j})$.\n\n(c): put $A_{j} = E_{j} \\setminus E_{j-1}$ ($E_{0} = \\emptyset$); then $\\bigcup E_{j}$ is a disjoint union of the $A_{j}$, and $\\mu (E_{n}) = \\sum _{j\\le n} \\mu (A_{j})$ — take limits on both sides.\n\n(d): **\"$\\mu (E_{1}) < \\infty$\" cannot be omitted.** Counterexample: $X = \\mathbb{N}$, $\\mu =$ counting measure, $E_{j} = \\{j, j+1$ …}; then every $\\mu (E_{j}) = \\infty$ but the intersection is $\\emptyset$ and $\\mu (\\emptyset ) = 0$.\n\n(c) and (d) together say: a measure is continuous under **monotone limits** of sets — which is exactly what the term \"monotone class\" echoes.",
        status: 'draft',
        basedOn: 'v0.9.3#203a3ee5',
      },
    },

    'def.null-set': {
      statement: {
        en: "Let $(X, \\mathcal{M}, \\mu )$ be a measure space, $E \\in \\mathcal{M}$.\n\nIf $\\mu(E) = 0$, then $E$ is called a **$\\mu$-null set** ($\\mu -null set$).\n\nIf **every subset of a null set is measurable**:\n\n$$\\forall E \\in \\mathcal{M}, \\forall F \\subseteq E : \\mu(E) = 0 \\implies F \\in \\mathcal{M}$$\n\nthen $\\mu$ (or the measure space) is called **complete**.",
        status: 'draft',
        basedOn: 'v0.9.3#29bd1708',
      },
      notes: {
        en: "Completeness says \"subsets of null sets are measurable\". This does **not** hold automatically: the $Borel \\sigma$-algebra with Lebesgue measure is not complete — the Cantor set is Borel with measure 0, and some of its subsets are not Borel.\n\nSo the usual procedure is first to **complete** the Borel measure (see the next theorem), obtaining the $Lebesgue \\sigma$-algebra.",
        status: 'draft',
        basedOn: 'v0.9.3#ec0fd133',
      },
    },

    'def.finitely-additive': {
      statement: {
        en: "If $\\mu$ satisfies only (i) and **finite** additivity:\n\n$$A, B \\in \\mathcal{M},\\ A \\cap B = \\emptyset \\implies \\mu(A \\cup B) = \\mu(A) + \\mu(B)$$\n\n(by induction this extends to any finite number of disjoint sets),\n\nthen $\\mu$ is called a **finitely additive measure**.",
        status: 'draft',
        basedOn: 'v0.9.3#8261235d',
      },
      notes: {
        en: "It is even weaker than a premeasure: a premeasure is countably additive (only its domain is a ring), while a finitely additive measure requires only finite additivity.\n\n⚠ Finitely additive $\\ne$ countably additive: on $\\mathbb{N}$ define $\\mu (E) = 0$ ($E$ finite), $\\mu (E) = +\\infty$ ($E$ infinite); it is finitely additive, yet fails countable additivity for $\\bigcup _{n} \\{n\\} = \\mathbb{N}$.\n\nHistorically (the Banach–Tarski era) \"measures\" using only finite additivity were seriously considered; the problem is not constructing length (Lebesgue measure itself is finitely additive, $m((a,b]) = b - a$ being length), but that finite additivity **cannot support countable limit theorems** (MCT, DCT and Fubini all collapse).",
        status: 'draft',
        basedOn: 'v0.9.3#2d8d0cfb',
      },
    },

    'thm.termwise-integration': {
      statement: {
        en: "Let $\\{f_n\\} \\subseteq L^+$. Then\n\n$$\\int \\sum_{n=1}^{\\infty} f_n = \\sum_{n=1}^{\\infty} \\int f_n$$",
        status: 'draft',
        basedOn: 'v0.9.3#dbdb428b',
      },
      notes: {
        en: "(Now $f_n \\ge 0$, so both sides may be $\\infty$; the conclusion is equivalent to: the anomaly \"termwise integrals diverge while the total integral is finite\" is impossible.)\n\nIn use this is **unconditional interchange of $\\int$ and $\\sum$**, with no dominating function needed — the price is nonnegativity. With mixed signs one must switch to DCT.",
        status: 'draft',
        basedOn: 'v0.9.3#f372c6ae',
      },
    },

    'prop.integrals-equal-iff': {
      statement: {
        en: "Let $f, g \\in L^1(\\mu)$. Then the following three are equivalent:\n\n$$\\int_E f d\\mu = \\int_E g d\\mu\\quad  \\forall E \\in \\mathcal{M}; $$\n$$\\int |f - g| d\\mu = 0; $$\n$$f = g\\quad  \\mu-\\text{a.e.}$$",
        status: 'draft',
        basedOn: 'v0.9.3#bf15fa83',
      },
      notes: {
        en: "Purpose: statements of this kind **identify a function** by its integrals over all measurable sets.\n\nThe **uniqueness** part of the Radon–Nikodym theorem below uses exactly this — two densities giving the same measure must be equal a.e.\n\n(That $E$ ranges over $\\mathcal{M}$ rather than only $X$ is the key: equality only on $X$ is not enough.)",
        status: 'draft',
        basedOn: 'v0.9.3#56a8422c',
      },
    },

    'thm.egorov': {
      statement: {
        en: "Let $\\mu(X) < \\infty$, and $f_n \\to f$ a.e. Then $f_n \\to f$ **almost uniformly**:\n\n$$\\forall\\varepsilon > 0,\\ \\exists E \\subseteq X :\\ \\mu(E) < \\varepsilon$$\n\nand $f_n \\rightrightarrows  f$ **converges uniformly** on $X \\setminus E$.",
        status: 'draft',
        basedOn: 'v0.9.3#a9f9daf6',
      },
      notes: {
        en: "⭐ \"Almost everywhere convergence\" sounds weak, but Egorov says: as long as the space has **finite measure**, it is in fact almost **uniform convergence** — the price is only discarding a set of arbitrarily small measure.\n\n⚠ **\"$\\mu(X) < \\infty$\" cannot be omitted.** Counterexample: $f_n = \\chi_{(n, n+1)}$ on $\\mathbb{R}$, converging a.e. to 0, but after discarding any set of finite measure the remainder still has $\\sup = 1$, so there is no uniform convergence.\n\nThis is the template for \"discard a small set in exchange for a good property\" (Lusin's theorem follows the same pattern).",
        status: 'draft',
        basedOn: 'v0.9.3#68d60475',
      },
    },

    'thm.fubini-tonelli': {
      statement: {
        en: "Let $(X, \\mathcal{M}, \\mu )$, $(Y, \\mathcal{N}, \\nu )$ be **$\\sigma$-finite** measure spaces.\n\n**(a) Tonelli (nonnegative case, no extra hypothesis)**: if $f \\in L^+(X \\times Y)$, then\n\n$$\\int f_x d\\nu \\in L^+(X), \\quad  \\int f^y d\\mu \\in L^+(Y)$$\n\nand\n\n$$\\int f d(\\mu \\times \\nu) = \\int_X ( \\int_Y f(x, y) d\\nu(y) ) d\\mu(x) = \\int_Y ( \\int_X f(x, y) d\\mu(x) ) d\\nu(y)$$\n\n**(b) Fubini (integrable case)**: if $f \\in L^1(\\mu \\times \\nu)$, then\n\n- $f_x \\in L^1(\\nu)$ holds for a.e. x, and $f^y \\in L^1(\\mu)$ for a.e. y;\n- $\\int f_x d\\nu \\in L^1(\\mu)$, $\\int f^y d\\mu \\in L^1(\\nu)$ (both defined a.e.);\n- the two triple identities above hold as well.",
        status: 'draft',
        basedOn: 'v0.9.3#54c92704',
      },
      notes: {
        en: "⭐ **Tonelli needs no extra hypothesis** (nonnegativity suffices), so in practice one first uses it to \"test\": if one of the two iterated integrals comes out finite, then $f$ is integrable and the order may safely be swapped.\n\n**Fubini, by contrast, must assume integrability** — otherwise one side is $\\infty$ and the other $-\\infty$, and swapping goes wrong.\n\n⚠ Counterexample (not integrable, iterated integrals unequal): on $[0,1]^{2}$ take $f(x, y) = (x^2 - y^2) / (x^2 + y^2)^2$; the two iterated integrals are $\\pi/4$ and $-\\pi/4$ (for exponent $3$ both sides diverge and give no such value).\n\n⚠ $\\sigma$-finiteness cannot be omitted: in the case \"counting measure $\\times Lebesgue$ measure on $\\mathbb{R}$\", the monotone class argument breaks down and Fubini yields absurd conclusions (the classical counterexample on the diagonal).",
        status: 'draft',
        basedOn: 'v0.9.3#92a85e51',
      },
    },

    'thm.hahn-decomposition': {
      statement: {
        en: "Let $\\nu$ be a signed measure on $(X, \\mathcal{M})$. Then there exist $P, N \\in \\mathcal{M}$ such that\n\n$$P \\cup N = X, \\quad  P \\cap N = \\emptyset, $$\n\nwhere **$P$ is positive and $N$ is negative**.\n\nIf $P', N'$ is another such pair, then $P \\triangle  P' = N \\triangle  N'$ is a $\\nu$-null set.",
        status: 'draft',
        basedOn: 'v0.9.3#4cf0de58',
      },
      notes: {
        en: "This is \"cutting the space in two along the sign\": $\\nu$ is nonnegative on $P$ and nonpositive on $N$.\n\n⚠ \"$P \\triangle P'$ is a null set\" only says the decomposition is **unique up to null sets** — strictly speaking a Hahn decomposition is not unique (one may move null sets freely between $P$ and $N$), but the $\\nu$ values of all measurable sets are exactly the same.\n\n⭐ With it, \"signed measure\" reduces completely to \"two genuine measures\" — which is exactly the content of the Jordan decomposition below.",
        status: 'draft',
        basedOn: 'v0.9.3#b0092838',
      },
    },

    'thm.jordan-decomposition': {
      statement: {
        en: "Let $\\nu$ be a signed measure. Then there exist **measures** $\\mu_1, \\mu_2$ such that\n\n$$\\nu = \\mu_1 - \\mu_2, \\quad  \\mu_1 \\perp  \\mu_2, $$\n\nand **at least one of them is finite**. Such a decomposition is unique.\n\nConcretely, take a Hahn decomposition $X = P \\sqcup  N$ of $\\nu$ and set\n\n$$\\nu^+ := \\nu(\\cdot \\cap P), \\quad  \\nu^- := -\\nu(\\cdot \\cap N)$$\n\nThen $\\nu = \\nu^+ - \\nu^-$ and $\\nu^+ \\perp  \\nu^-$.",
        status: 'draft',
        basedOn: 'v0.9.3#94ecbcdd',
      },
      notes: {
        en: "The **positive variation** $\\nu^+$ and the **negative variation** $\\nu^-$ are both genuine measures; their sum is called the **total variation**:\n\n$$|\\nu| := \\nu^+ + \\nu^-$$\n\n⭐ \"Signed measure\" is thereby fully dissected: every signed measure is the difference of a pair of mutually singular measures.\n\n⚠ \"At least one finite\" corresponds to the clause \"takes at most one of $\\pm \\infty$\" in the definition of a signed measure.",
        status: 'draft',
        basedOn: 'v0.9.3#6f931803',
      },
    },

    'thm.ac-epsilon-delta': {
      statement: {
        en: "Let $\\nu$ be a **finite** signed measure and $\\mu$ a measure. Then\n\n$$\\nu \\ll  \\mu \\iff \\forall\\varepsilon > 0, \\exists\\delta > 0 : \\mu(E) < \\delta \\implies |\\nu(E)| \\le \\varepsilon$$",
        status: 'draft',
        basedOn: 'v0.9.3#4fd42ffd',
      },
      notes: {
        en: "It upgrades \"zero on null sets\" to the quantitative \"small values on sets of small measure\" — this is precisely where the word \"continuous\" in absolute continuity comes from.\n\n⚠ \"$\\nu$ finite\" cannot be omitted: otherwise $\\delta$ cannot be controlled (e.g. the $\\mu = Lebesgue$ measure, or $\\nu(E) = \\int_E 1/x$).\n\n(The $\\Longleftarrow$ direction is straightforward: when $\\mu (E) = 0$, for every $\\varepsilon$ one has $|\\nu (E)| \\le \\varepsilon$, hence $\\nu (E) = 0$.)",
        status: 'draft',
        basedOn: 'v0.9.3#11a407fc',
      },
    },

    'prop.ac-and-variations': {
      statement: {
        en: "Let $\\mu$ be a measure and $\\nu$ a signed measure. Then\n\n$$\\nu \\ll  \\mu \\iff |\\nu| \\ll  \\mu \\iff \\nu^+ \\ll  \\mu\\ \\wedge \\ \\nu^- \\ll  \\mu$$\n\nMoreover: if both $\\nu \\perp  \\mu$ and $\\nu \\ll  \\mu$ hold, then $\\nu = 0$.",
        status: 'draft',
        basedOn: 'v0.9.3#97fb4a54',
      },
      notes: {
        en: "The second half, \"singular and absolutely continuous $\\implies$ equals zero\", is the **starting point** of the structure theorem: what Radon–Nikodym says is precisely that in general $\\nu$ is the sum of these two parts.\n\nProof: if $\\nu \\perp \\mu$, choose $E$ ($\\mu$-null) and $F$ ($\\nu$-null) partitioning the space; from $\\nu \\ll \\mu$ get $\\nu (E) = 0$; and $\\nu (F) = 0$, so $\\nu$ is 0 on all of $X$.",
        status: 'draft',
        basedOn: 'v0.9.3#a588911f',
      },
    },

    'thm.lebesgue-differentiation': {
      statement: {
        en: "Let $f \\in L^1_{loc}$. Then\n\n$$\\lim_{r\\to0} A_r f(x) = f(x)\\quad \\text{for a.e. } x \\in \\mathbb{R}^n$$",
        status: 'draft',
        basedOn: 'v0.9.3#9ca52cc8',
      },
      notes: {
        en: "⭐ In one sentence: **an integrable function equals the limit of its local averages almost everywhere**.\n\nThis is also the most intuitive respect in which the Lebesgue integral beats the Riemann integral: a Riemann integrable function is continuous almost everywhere, while here not even continuity is needed.\n\nThe three steps of the proof (expanded in the next arrow): first approximate $\\to$ by continuous functions, then use the maximal theorem to squeeze the \"bad set\" down to measure zero.",
        status: 'draft',
        basedOn: 'v0.9.3#08bf2446',
      },
    },

    'thm.bv-jordan': {
      statement: {
        en: "**(a)** If the real and imaginary parts of $F$ are both $BV$, then $F \\in BV$; and conversely: $F \\in BV \\iff \\operatorname{Re} F \\in BV$ **and** $\\operatorname{Im} F \\in BV$.\n\n**(b)** Let $F : \\mathbb{R} \\to \\mathbb{R}$. Then $F \\in BV$ if and only if it can be written as the difference of two bounded increasing functions:\n\n$F \\in BV \\iff F = G - H$, where $G, H$ **are both bounded increasing functions**.",
        status: 'draft',
        basedOn: 'v0.9.3#3e2fa36f',
      },
      notes: {
        en: "The concrete choice (the function version of the measure-theoretic Jordan decomposition):\n\n$$F = (1/2)(T_F + F) - (1/2)(T_F - F)$$\n\nThe first term is called the **positive variation** of $F$, the second the **negative variation** — the names correspond exactly to $\\nu ^{+}$ and $\\nu ^{-}$ for signed measures.\n\nBy the lemma, $T_F \\pm  F$ is increasing; boundedness comes from $F \\in BV$.\n\n⭐ Meaning: **a BV function $=$ the difference of two bounded increasing functions**. Hence everything about BV reduces to the tractable case of \"increasing functions\".",
        status: 'draft',
        basedOn: 'v0.9.3#20f78805',
      },
    },

    'thm.holder': {
      statement: {
        en: "Let $1 < p < \\infty$, and let $q$ be the **conjugate exponent** of $p$: $\\dfrac{1}{p} + \\dfrac{1}{q} = 1$. Then for measurable $f, g$:\n\n$$\\|fg\\|_1 \\le \\|f\\|_p \\, \\|g\\|_q$$",
        status: 'draft',
        basedOn: 'v0.9.3#5c2147f8',
      },
      notes: {
        en: "**Equality condition**: equality holds $\\iff$ $|f|^p$ and $|g|^q$ are proportional a.e. (that is, $\\alpha |f|^p = \\beta |g|^q$ a.e.).\n\nProof: first assume $\\|f\\|_p = \\|g\\|_q = 1$. By Young's inequality, substituting $\\lambda = 1/p$, $a = |f|^p$, $b = |g|^q$ gives\n\n$$|fg| \\le \\frac{|f|^p}{p} + \\frac{|g|^q}{q}$$\n\nIntegrating both sides gives $\\|fg\\|_1 \\le \\frac{1}{p} + \\frac{1}{q} = 1$. In the general case, normalize $f, g$ each.\n\n⚠ When $p = q = 2$ this is the **Cauchy–Schwarz inequality**.\n\nWhen $p = 1$ the conjugate exponent is $q = \\infty$, and then $\\|fg\\|_1 \\le \\|f\\|_1 \\|g\\|_\\infty$ (see the section on $L^\\infty$).",
        status: 'draft',
        basedOn: 'v0.9.3#7eba0f85',
      },
    },

    'def.multilinear-form': {
      statement: {
        en: "Let $V$ be a $K$-vector space. A map $f : V^{n} := V \\times \\cdots \\times V \\to K$ is called an **$n$-linear form** iff, after fixing any $n - 1$ arguments, the remaining argument is linear: for each $i$,\n\n$$f(\\ldots, v_i + c\\,w_i, \\ldots) = f(\\ldots, v_i, \\ldots) + c\\, f(\\ldots, w_i, \\ldots)$$\n\nThe set of all $n$-linear forms is denoted $\\operatorname{Mult}_n(V; K)$; with pointwise operations it becomes a $K$-vector space.\n\nWhen $n = 2$ it is called a **bilinear form**; after fixing a basis, $n$-linear forms correspond one-to-one with \"$n$-dimensional arrays $(f(e_{i_1}, \\ldots, e_{i_n}))$\".",
        status: 'draft',
        basedOn: 'v0.9.3#b41158a4',
      },
      notes: {
        en: "⭐ The order of the caveats matters: \"linear in each argument separately\" and \"linear as a whole\" **do not imply each other** — $f(x, y) = xy$ is linear in each argument, yet it is not a linear map $\\mathbb{R}^{2} \\to \\mathbb{R}$ (in general $f(x + x', y + y') \\ne f(x,y) + f(x',y')$).\n\n**Multilinear $\\ne$ linear, and both directions need care**: $f(x,y) = xy$ is multilinear but not a linear map; conversely $g(x,y) = x + y$ is linear as a whole, yet after fixing $y = 1$, $g(x,1) = x + 1$ is not a linear function of $x$.\n\n⭐ It is the source of the \"tensor product\": an $n$-linear form is a linear functional on $V^{\\otimes n}$ (see \"universal property of the tensor product\").\n\n⭐ The determinant is the most special multilinear form in the case $n = \\dim V$ (with the two extra conditions of alternation and normalization).",
        status: 'draft',
        basedOn: 'v0.9.3#daba2bbf',
      },
    },

    'thm.steinitz': {
      statement: {
        en: "Let $V$ be a $K$-vector space, $S = (v_1, \\ldots, v_n)$ linearly independent, $T = (w_1, \\ldots, w_m)$ generating $V$. Then\n\n- $n \\le m$;\n- one can **delete** $n$ vectors from $T$ and insert all vectors of $S$, and the resulting $m$ vectors still generate $V$. In particular, $V$ has a basis whose elements are taken from $T \\cup S$ and which contains $S$.",
        status: 'draft',
        basedOn: 'v0.9.3#f8464df6',
      },
      notes: {
        en: "⭐ In one sentence: **\"independent\" is never larger than \"generating\"**.\n\nIt is the entire content of the well-definedness of dimension — the two statements ($n \\le m$ and exchangeability) are proved together by one induction.\n\n⭐ The proof inducts on $n$: express $v_1$ in terms of $T$ ($T$ generates), and one of the coefficients must be nonzero (otherwise $v_1 = 0$ contradicts independence); replace it by $v_1$ and the set still generates;\n\nthen repeat for the rest.\n\n⚠ Finiteness is a hypothesis: this only covers **finite** independent and generating sets.\n\nThe infinite case needs Zorn's lemma (that is the statement \"every vector space has a basis\").",
        status: 'draft',
        basedOn: 'v0.9.3#53abb05c',
      },
    },

    'thm.dimension': {
      statement: {
        en: "Let $V$ be a $K$-vector space, and $\\mathcal{B}$, $\\mathcal{B}'$ two bases of $V$. Then $\\mathcal{B}$ and $\\mathcal{B}'$ are **equipotent** (there is a bijection).\n\nHence the **dimension** of $V$ is well defined:\n\n$$\\dim_K V := \\#\\mathcal{B}$$\n\n(by convention $\\dim V = 0$ when $V = \\{0\\}$; when there is no finite basis, $V$ is called **infinite-dimensional**.)",
        status: 'draft',
        basedOn: 'v0.9.3#1a91009b',
      },
      notes: {
        en: "⭐ The only content of this theorem is **well-definedness**: there may be many bases, but their cardinality is the same number — that is what makes the word \"dimension\" meaningful.\n\nThe proof is entirely Steinitz: two bases are each independent and generating for the other, so two applications of the exchange lemma give $\\#\\mathcal{B} \\le \\#\\mathcal{B}'$ and the reverse.\n\n⚠ In the finite-dimensional case the exchange lemma suffices;\n\nthe infinite-dimensional case requires proving \"infinite bases are equipotent\" (using the cardinal arithmetic of $\\#(A \\times \\mathbb{N}) = \\#A$), which is much more involved than the finite case.\n\n⭐ Basic properties of dimension: $\\dim(U + W) + \\dim(U \\cap W) = \\dim U + \\dim W$;\n\nwhen $V$ is **finite-dimensional**, $\\dim(V/U) = \\dim V - \\dim U$; in infinite dimension subtraction is meaningless (cardinals do not subtract), and only cardinal addition $\\dim V = \\dim U + \\dim(V/U)$ remains.",
        status: 'draft',
        basedOn: 'v0.9.3#6cb5e0fe',
      },
    },

    'thm.rank-nullity': {
      statement: {
        en: "Let $V$ be a finite-dimensional $K$-vector space, $T : V \\to W$ linear. Then\n\n$$\\dim V = \\operatorname{rank} T + \\operatorname{null} T = \\dim \\operatorname{im} T + \\dim \\ker T$$",
        status: 'draft',
        basedOn: 'v0.9.3#87a72698',
      },
      notes: {
        en: "⭐ This is the **central theorem** of finite-dimensional linear algebra: the input dimension of a linear map is split exactly between what is \"kept\" and what is \"lost\", with nothing left over.\n\n⭐ Corollaries (the three most used):\n- $T$ is injective $\\iff \\operatorname{rank} T = \\dim V$;\n\n$T$ is surjective $\\iff \\operatorname{rank} T = \\dim W$;\n\n- when $\\dim V = \\dim W < \\infty$: $T$ injective $\\iff$ $T$ surjective $\\iff$ $T$ invertible (**finite dimension only**; it fails in infinite dimension: the shift operator $T(x_1, x_2, \\ldots) = (0, x_1, x_2, \\ldots)$ is injective but not surjective);\n\n- the solution space of an $n$-variable homogeneous linear system has dimension $= n - \\operatorname{rank} A$.\n\n⚠ The clean identity holds only when $\\dim V < \\infty$;\n\nin infinite dimension the right-hand side is a sum of cardinals, and one must write $\\dim V = \\dim \\ker T + \\dim \\operatorname{im} T$ (which holds for cardinals).",
        status: 'draft',
        basedOn: 'v0.9.3#e285bdff',
      },
    },

    'thm.first-iso-vs': {
      statement: {
        en: "Let $T : V \\to W$ be a linear map. Then\n\n$$\\overline{T} : V / \\ker T \\longrightarrow \\operatorname{im} T, \\qquad v + \\ker T \\longmapsto T(v)$$\n\nis a well-defined **linear isomorphism**. In particular\n\n$$V / \\ker T \\cong \\operatorname{im} T$$",
        status: 'draft',
        basedOn: 'v0.9.3#1b7e207c',
      },
      notes: {
        en: "⭐ This is the third appearance of the same template on the graph: the set version $A/\\!\\sim$, the group version $G/N \\cong \\operatorname{im}\\varphi$, and the vector-space version $V/\\ker T \\cong \\operatorname{im} T$.\n\nThe proof is verbatim the same in all three — **kill the kernel, and what remains is the image**.\n\n⭐ One particularly useful branch: if $T$ is surjective, then $W \\cong V / \\ker T$;\n\nif $T$ is injective, then $V \\cong \\operatorname{im} T$.\n\n⚠ The well-definedness step cannot be skipped: $v + \\ker T = v' + \\ker T$ says $v - v' \\in \\ker T$, hence $T(v) = T(v')$ — precisely the sentence \"$\\overline{T}$ depends only on the coset\".",
        status: 'draft',
        basedOn: 'v0.9.3#2d363bda',
      },
    },

    'def.quotient-vs': {
      statement: {
        en: "Let $U \\subseteq V$ be a subspace. Define an equivalence relation on $V$:\n\n$$v \\sim v' \\iff v - v' \\in U$$\n\nThe equivalence class $v + U := \\{\\, v + u : u \\in U \\,\\}$ is called a **coset** of $U$. The set of all cosets is denoted $V / U$; define on it\n\n$$(v + U) + (v' + U) := (v + v') + U, \\qquad c\\,(v + U) := (cv) + U$$\n\nThese two operations **do not depend on the choice of representatives** (because $U$ is a subspace), so $V / U$ becomes a $K$-vector space, called the **quotient space**.\n\nThe quotient map $\\pi : V \\to V/U$, $v \\mapsto v + U$ is a surjective linear map, and $\\ker \\pi = U$.",
        status: 'draft',
        basedOn: 'v0.9.3#7429adc2',
      },
      notes: {
        en: "⭐ This is the quotient set `def.quotient-set` **plus structure**: first compress $V$ by $U$ into a set, then check that the operations are well defined.\n\nThe well-definedness step is the whole content — because the operations are written on representatives, and there are infinitely many ways to choose them.\n\n⭐ \"Every subspace is the kernel of some linear map\" follows: take $\\pi$.\n\nThis is completely parallel to the group case (every normal subgroup is the kernel of some homomorphism).\n\n⚠ What is quotiented is a **subspace** (not an arbitrary subset): otherwise the sum of cosets is not closed.\n\nOn the group side the counterpart is \"normal subgroup\"; here every subspace is automatically normal (because $K$-vector spaces are abelian groups).",
        status: 'draft',
        basedOn: 'v0.9.3#e427534f',
      },
    },

    'prop.root-bound': {
      statement: {
        en: "Let $f \\in K[x]$ be a nonzero polynomial, $\\deg f = n$. Then $f$ has at most $n$ roots in $K$ (distinct roots).\n\nMore precisely (using **multiplicity**): there exist $a_1, \\ldots, a_m \\in K$ (distinct) and positive integers $e_1, \\ldots, e_m$ such that\n\n$$f = (x - a_1)^{e_1} \\cdots (x - a_m)^{e_m}\\, h, \\qquad h(a_i) \\ne 0 \\ \\text{for all } i$$\n\nand then $e_1 + \\cdots + e_m \\le n$ ($e_i$ is called the **multiplicity** of the root $a_i$).",
        status: 'draft',
        basedOn: 'v0.9.3#b1feb9d2',
      },
      notes: {
        en: "⭐ The proof is repeated use of the factor theorem: each root lets one divide by $(x - a)$, lowering the degree by 1; the degree cannot go negative, so there are at most $n$ roots.\n\n⭐ The usefulness of this \"small\" proposition is surprisingly large: **testing polynomial identities over finite fields** (two polynomials of degree $< n$ that agree at $n$ points are identical) — interpolation and error-correcting codes (Reed–Solomon) rely on it.\n\n⚠ It holds only over an **integral domain**: over $\\mathbb{Z}/8$, $x^{2} - 1$ has four roots $1, 3, 5, 7$ (because $\\mathbb{Z}/8$ has zero divisors).\n\n$K[x]$ being an integral domain is the key.",
        status: 'draft',
        basedOn: 'v0.9.3#4ed8052b',
      },
    },

    'thm.poly-ufd': {
      statement: {
        en: "Let $K$ be a field. Then every nonzero, non-unit polynomial $f \\in K[x]$ can be written as a product of finitely many irreducible polynomials\n\n$$f = c\\, p_1 p_2 \\cdots p_r, \\qquad c \\in K^{\\times},\\ p_i \\text{ monic irreducible}$$\n\nand the decomposition is **unique** up to order and constant factor: if $f = c' q_1 \\cdots q_s$ is another such decomposition, then $r = s$ and there is a permutation $\\sigma$ such that $p_i = q_{\\sigma(i)}$ (and of course $c = c'$).",
        status: 'draft',
        basedOn: 'v0.9.3#0bdf6918',
      },
      notes: {
        en: "⭐ This is the **end point** of the division algorithm: Euclidean domain $\\implies$ principal ideal domain $\\implies$ unique factorization domain.\n\nAll three \"domain\" definitions along the chain are worth remembering, because each has counterexamples in abstract algebra (a UFD need not be a PID: $\\mathbb{Z}[x]$;\n\na PID need not be a Euclidean domain: certain rings).\n\n⭐ Uniqueness relies on \"irreducible $\\implies$ prime\": if $p$ is irreducible and $p \\mid gh$, then $p \\mid g$ or $p \\mid h$.\n\nThis step uses the **Bézout identity** (a product of the Euclidean algorithm), and is precisely the only place where the division algorithm is really used.\n\n⭐ Uses: factorization of integer-coefficient polynomials in $\\mathbb{Q}[x]$, the field structure of $K[x]/(f)$, and the relation between characteristic and minimal polynomials (next batch) all rest on it.",
        status: 'draft',
        basedOn: 'v0.9.3#be1c6630',
      },
    },

    'def.char-poly': {
      statement: {
        en: "Let $T : V \\to V$ be linear, $\\dim V = n < \\infty$. Choose any basis and write $T$ as a matrix $A$, and define\n\n$$\\chi_T(x) := \\det(x\\,I_n - A) \\in K[x]$$\n\ncalled the **characteristic polynomial** of $T$. It is a monic polynomial of degree $n$, independent of the choice of basis (a change of basis gives a similar $A$, and $\\det(P^{-1}(xI - A)P) = \\det(xI - A)$).\n\nIts roots (in $K$, or in an extension field) are exactly the eigenvalues of $T$, and their multiplicities are called **algebraic multiplicities**. Expanded,\n\n$$\\chi_T(x) = x^{n} - (\\operatorname{tr} T)\\,x^{n-1} + \\cdots + (-1)^{n} \\det T$$",
        status: 'draft',
        basedOn: 'v0.9.3#05fc7be0',
      },
      notes: {
        en: "⭐ The characteristic polynomial turns the **geometric** problem \"eigenvalues\" into the **algebraic** problem \"roots of a polynomial\" — so the fundamental theorem of algebra guarantees $n$ eigenvalues over $\\mathbb{C}$ (counted with multiplicity).\n\n⭐ Relation of coefficients to invariants: the coefficient of $x^{n-1}$ is $-\\operatorname{tr} T$, and the constant term is $(-1)^{n}\\det T$.\n\nThus \"trace = sum of eigenvalues\" and \"determinant = product of eigenvalues\" become readings of Vieta's formulas, **without actually solving for the eigenvalues**.\n\n⚠ Geometric multiplicity $\\le$ algebraic multiplicity;\n\nthe standard example where they differ is $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ ($\\lambda = 1$: algebraic multiplicity 2, geometric multiplicity 1) — which is exactly why it is not diagonalizable.",
        status: 'draft',
        basedOn: 'v0.9.3#63569f9b',
      },
    },

    'def.trace': {
      statement: {
        en: "For a square matrix $A = (a_{ij}) \\in M_n(K)$, define the **trace** as the sum of the diagonal entries:\n\n$$\\operatorname{tr} A := \\sum_{i=1}^{n} a_{ii}$$\n\nBasic properties:\n\n- $\\operatorname{tr}(A + B) = \\operatorname{tr} A + \\operatorname{tr} B$, $\\operatorname{tr}(cA) = c\\operatorname{tr} A$ (linearity);\n- $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$, hence $\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr} A$ (**similarity invariance**);\n- $\\operatorname{tr}(ABC) = \\operatorname{tr}(BCA)$ (**cyclic invariance**).",
        status: 'draft',
        basedOn: 'v0.9.3#6f6283d2',
      },
      notes: {
        en: "⭐ The trace is the **cheapest invariant**: $O(n)$ computes it, yet it already distinguishes many matrices (far cheaper than the determinant).\n\n⭐ Its deeper meaning: $\\operatorname{tr}$ is the **unique (up to a scalar) central linear functional** on the matrix algebra, and also the \"trace form\" from the $K^{n}$-algebra to $K$ — it reappears in Galois theory and characteristic classes.\n\n⚠ \"Similarity invariance\" is weaker than \"cyclic invariance\": $\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr}(A P^{-1} P) = \\operatorname{tr}A$ is only a special case of the latter.\n\nConversely, equal trace does not imply similarity ($\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ and the zero matrix both have trace $0$ but are not similar).",
        status: 'draft',
        basedOn: 'v0.9.3#696bc2f5',
      },
    },

    'thm.cayley-hamilton': {
      statement: {
        en: "Let $T : V \\to V$ be a linear map on a finite-dimensional $K$-vector space, and $\\chi_T$ its characteristic polynomial. Replace $x$ appearing in $\\chi_T$ by $T$ (multiplying the constant term by $I$), obtaining the operator $\\chi_T(T)$. Then\n\n$$\\chi_T(T) = 0$$\n\n(the right-hand side is the **zero operator**; in matrix form, the zero matrix.)\n\nMatrix form: for $A \\in M_n(K)$, one has $\\chi_A(A) = 0$ (the zero matrix).",
        status: 'draft',
        basedOn: 'v0.9.3#77021b88',
      },
      notes: {
        en: "⭐ The theorem says \"**every operator satisfies its own characteristic equation**\" — so $\\chi_T$ is **one** of the polynomials that send $T$ to zero, which immediately gives an entry point for using the structure of the $K[x]$-module ($V$ becomes a $K[x]/(\\chi_T)$-module).\n\n⚠ A common notational error: one cannot substitute $\\chi_T(T) = \\det(T I - T)$ like that (that would be a \"matrix inside a matrix\"); one must **first expand $\\chi_T$ as $\\sum c_k x^{k}$, then replace term by term with $\\sum c_k T^{k}$**.\n\n⭐ Uses: computing powers of a matrix ($A^{n}$ can be expressed linearly in lower powers), proving that the minimal polynomial divides the characteristic polynomial, and finding inverse matrices ($A^{-1}$ is given by the coefficients of $\\chi_A$).",
        status: 'draft',
        basedOn: 'v0.9.3#f8799688',
      },
    },

    'thm.primary-decomposition': {
      statement: {
        en: "Let $K$ be **algebraically closed**, $T : V \\to V$, $\\dim V = n < \\infty$. Let\n\n$$\\chi_T(x) = \\prod_{i=1}^{r} (x - \\lambda_i)^{m_i}$$\n\n($\\lambda_i$ distinct, $m_i \\ge 1$) be the factorization of the characteristic polynomial. Then\n\n- $V = \\bigoplus_{i=1}^{r} V_i$, where $V_i := \\ker (T - \\lambda_i I)^{m_i}$ is the **generalized eigenspace** (also called the **root subspace**);\n- $\\dim V_i = m_i$ (the algebraic multiplicity), each $V_i$ is $T$-invariant, and $T|_{V_i}$ has only one eigenvalue $\\lambda_i$;\n- $E_{\\lambda_i} = \\ker(T - \\lambda_i I) \\subseteq V_i$ is the \"$\\lambda_i$ layer\" inside it.",
        status: 'draft',
        basedOn: 'v0.9.3#cd340387',
      },
      notes: {
        en: "⭐ This step is the **first half** of the Jordan decomposition: first split $V$ into $r$ blocks by eigenvalue, so that only one eigenvalue remains on each block.\n\nThe second half splits, within each block, the \"nilpotency degree of $T - \\lambda_i I$\" into small blocks (those are the Jordan blocks).\n\n⭐ Its algebraic version: $V$ is a $K[x]$-module, and $\\chi_T$ is the \"annihilating polynomial\" on it;\n\nby the unique factorization in $K[x]$, the module splits along the irreducible factors of $\\chi_T$ (**Chinese remainder theorem**) — this is where the name \"primary decomposition\" comes from.\n\n⚠ $K$ is required to be algebraically closed: otherwise $\\chi_T$ does not split into linear factors, and the blocks are not indexed by eigenvalues (one must treat \"irreducible factors\" as the blocks).",
        status: 'draft',
        basedOn: 'v0.9.3#08c4512b',
      },
    },

    'thm.jordan-canonical-form': {
      statement: {
        en: "Let $K$ be algebraically closed, $T : V \\to V$, $\\dim V < \\infty$. Then there is a basis of $V$ in which the matrix of $T$ is **block diagonal**\n\n$$J = \\begin{pmatrix} J_{1} & & \\\\ & \\ddots & \\\\ & & J_{s} \\end{pmatrix}, \\qquad J_{k} = \\begin{pmatrix} \\lambda_{k} & 1 & & \\\\ & \\ddots & \\ddots & \\\\ & & \\ddots & 1 \\\\ & & & \\lambda_{k} \\end{pmatrix}$$\n\neach $J_k$ is a **Jordan block** of the form $\\lambda_k I + N_k$ ($N_k$ being the nilpotent \"up-shift\" matrix).\n\nEquivalent formulation: $T$ is diagonalizable $\\iff$ all Jordan blocks are $1 \\times 1$.",
        status: 'draft',
        basedOn: 'v0.9.3#6b589db8',
      },
      notes: {
        en: "⭐ This is **the only complete classification theorem in finite-dimensional linear algebra**: over an algebraically closed field, \"similarity\" is completely determined by the Jordan type (block sizes and the distribution of eigenvalues).\n\nIt also gives a complete list of \"similarity invariants\".\n\n⭐ The two halves of the proof: primary decomposition (split by eigenvalue) plus, on each root subspace, taking \"the chain $\\ker N^{k}$\" of the nilpotent operator $N = T - \\lambda I$ and extending the basis layer by layer (this step uses `def.quotient-vs` and induction).\n\n⚠ All three hypotheses are needed: **algebraically closed** (otherwise there is no $\\lambda$), **finite-dimensional** (otherwise there may be no eigenvalue), and **$K$ a field**.\n\nOver $\\mathbb{R}$ one can only use the \"real Jordan form\" or switch to the rational canonical form (`thm.rational-canonical-form`).",
        status: 'draft',
        basedOn: 'v0.9.3#415baba4',
      },
    },

    'thm.gram-schmidt': {
      statement: {
        en: "Let $(v_1, \\ldots, v_k)$ be a linearly independent family in an inner product space $V$. Then there is an orthonormal family $(e_1, \\ldots, e_k)$ and an invertible upper-triangular coefficient relation such that\n\n$$\\operatorname{span}(e_1, \\ldots, e_j) = \\operatorname{span}(v_1, \\ldots, v_j), \\qquad j = 1, \\ldots, k$$\n\nIn particular: **every finite-dimensional inner product space has an orthonormal basis** (any basis can be orthogonalized).",
        status: 'draft',
        basedOn: 'v0.9.3#94d3a946',
      },
      notes: {
        en: "⭐ Algorithm (induction): first set $e_1 := v_1 / \\|v_1\\|$; then for $j = 2, \\ldots, k$, successively set\n\n$$w_j := v_j - \\sum_{i < j} \\langle e_i, v_j \\rangle\\, e_i, \\qquad e_j := \\frac{w_j}{\\|w_j\\|}$$\n\n(each step subtracts all components of $v_j$ along the directions already obtained.)\n\n⭐ It is the entry point to \"matrix factorization\": orthogonalizing the columns of $A$ gives the **QR decomposition** $A = QR$ ($Q$ has orthonormal columns, $R$ upper triangular) — numerically far more stable than solving equations directly.\n\n⚠ It depends on the inner product and on the **real/complex field structure**: if the inner product is replaced by a general symmetric bilinear form (e.g. the Minkowski metric), the algorithm runs into $\\|w_j\\| = 0$ and divides by zero.",
        status: 'draft',
        basedOn: 'v0.9.3#2c2b7464',
      },
    },

    'thm.spectral-theorem': {
      statement: {
        en: "Let $V$ be a finite-dimensional **real** inner product space, $T : V \\to V$ **self-adjoint** (that is, real symmetric). Then there is an **orthonormal basis** of $V$ in which $T$ is diagonal:\n\n$$V = E_{\\lambda_1} \\oplus \\cdots \\oplus E_{\\lambda_m}$$\n\n(these eigenspaces are **pairwise orthogonal**.)\n\nMoreover, all eigenvalues $\\lambda_i$ are **real**. Matrix form: for a real symmetric matrix $A$ there is an orthogonal matrix $Q$ such that $Q^{\\mathsf{T}} A Q = \\operatorname{diag}(\\lambda_1, \\ldots, \\lambda_n)$.",
        status: 'draft',
        basedOn: 'v0.9.3#042a3f1c',
      },
      notes: {
        en: "⭐ Difference from Jordan form: Jordan guarantees only \"similarity\", while the spectral theorem guarantees \"**unitary/orthogonal** similarity\", at the price of tightening the hypothesis to self-adjoint (normal).\n\nThese are the answers to two different classification problems in finite dimension.\n\n⭐ The two steps of the proof: (1) there is at least one (real) eigenvalue (by the extreme value theorem: $|Tv|$ or $\\langle Tv, v\\rangle$ attains an extremum on the **compact** unit sphere);\n\n(2) induct on the orthogonal complement of the eigenspace (invariance comes from self-adjointness: $T(U) \\subseteq U \\implies T(U^{\\perp}) \\subseteq U^{\\perp}$).\n\n⭐ The infinite-dimensional generalization is the **spectral theorem on Hilbert spaces** (spectral measures / projection-valued measures for self-adjoint operators) — that belongs to functional analysis, and $L^{2}$ in the `analysis.lp` cluster on the graph is its stage.",
        status: 'draft',
        basedOn: 'v0.9.3#92b0f8b0',
      },
    },

    'thm.tensor-universal-property': {
      statement: {
        en: "For every **bilinear map** $B : V \\times W \\to U$ (a linear map on the product space need not be bilinear, e.g. $B(v,w) = v$), there is a **unique** linear map\n\n$$\\widetilde{B} : V \\otimes W \\to U, \\qquad \\widetilde{B}(v \\otimes w) = B(v, w)$$\n\nConversely, any linear map $\\widetilde B$ composed with $\\otimes$ gives a bilinear map. Hence there is a natural isomorphism\n\n$$\\operatorname{Hom}_K(V \\otimes W,\\ U) \\;\\cong\\; \\operatorname{Bil}(V, W; U)$$\n\n(natural in $U$; this is \"the tensor product is the **representation** of the bilinear functor\").",
        status: 'draft',
        basedOn: 'v0.9.3#332744a8',
      },
      notes: {
        en: "⭐ In one sentence: **the tensor product is the linearization device for \"multivariable linearity\"** — everything bilinear, once written as a map on $V \\otimes W$, automatically becomes linear, and the whole machinery of linear algebra applies.\n\n⭐ \"Uniqueness\" is the core of a universal property: it ensures $V \\otimes W$ is determined **up to unique isomorphism** (existence gives the construction, uniqueness gives \"independence of the construction\").\n\nThis is the third appearance of \"the same trick\" on the graph (tensor product, quotient space, exterior power).\n\n⭐ It also holds over an arbitrary commutative ring (`prop.module-tensor-universal`); a coefficient field is just the simplest case.",
        status: 'draft',
        basedOn: 'v0.9.3#ce828a4e',
      },
    },

    'thm.det-exists-unique': {
      statement: {
        en: "Let $\\dim_K V = n$. Then there is a **unique** function\n\n$$D : V^{n} \\longrightarrow K$$\n\nsatisfying:\n\n**(i) Multilinear**: linear in each argument separately;\n\n**(ii) Alternating**: it takes the value $0$ whenever two arguments are equal;\n\n**(iii) Normalized**: $D(e_1, \\ldots, e_n) = 1$ ($(e_i)$ being any fixed ordered basis).",
        status: 'draft',
        basedOn: 'v0.9.3#9709355b',
      },
      notes: {
        en: "⭐ This theorem is the **correct way in which the determinant is born**: not \"multiply diagonals and subtract\", but \"the unique function satisfying three axioms\".\n\nThe three axioms are **linearity, alternation, normalization**, and none can be dropped.\n\n⭐ \"Uniqueness\" is far more useful than \"existence\": any function satisfying the three axioms equals the determinant, so to verify an identity it suffices to verify the three axioms — e.g. $\\det(A^{\\mathsf{T}}) = \\det A$, $\\det(AB) = \\det A \\det B$.\n\n⭐ Construction for \"existence\": expand $(v_1, \\ldots, v_n)$ in the basis, obtaining the coefficient matrix $(a_{ij})$ of size $n \\times n$, then take the Leibniz formula $\\sum_{\\sigma} \\operatorname{sgn}(\\sigma) \\prod_i a_{i,\\sigma(i)}$ as the definition — then verify the three axioms one by one (see the proof section).\n\n⭐ Relation to \"universal property\": this is not a universal property in the usual sense (there is no loose adjoint), but it is **the same technique** — pinning an object down by a universal condition (the three axioms).\n\nSo the graph treats it as the same family of proof techniques as `prop.module-tensor-universal` (universal property of the tensor product).",
        status: 'draft',
        basedOn: 'v0.9.3#102f7860',
      },
    },

    'prop.det-laplace': {
      statement: {
        en: "Let $A = (a_{ij}) \\in M_n(K)$, and let $A_{ij}$ denote the matrix of order $(n-1)$ obtained by deleting row $i$ and column $j$, $M_{ij} := \\det A_{ij}$ (**minor**), $C_{ij} := (-1)^{i+j} M_{ij}$ (**cofactor**). Then for each fixed $i$:\n\n$$\\det A = \\sum_{j=1}^{n} a_{ij}\\, C_{ij}$$\n\n(**expansion along row $i$**; the column version is analogous.) Moreover \"off-diagonal expansion\" gives zero: $\\sum_j a_{kj} C_{ij} = 0$ ($k \\ne i$).",
        status: 'draft',
        basedOn: 'v0.9.3#9029192f',
      },
      notes: {
        en: "⭐ This is the **recursive algorithm** for the determinant: order $n$ reduces to $n$ matrices of order $n-1$, complexity $O(n!)$.\n\nIn practice one first uses elimination to reduce a row to a single nonzero entry, then expands — the two together are fast.\n\n⭐ The \"off-diagonal expansion equals zero\" statement can be rewritten directly as the matrix identity $A \\cdot \\operatorname{adj} A = (\\det A) I_n$ ($\\operatorname{adj} A$ being the transpose of the cofactor matrix), that is, **when $\\det A \\ne 0$**, $A^{-1} = (\\det A)^{-1} \\operatorname{adj} A$ — Cramer's rule and the inverse matrix formula both come from here (when $A = 0$, $\\operatorname{adj} A = 0$, and neither side is defined).\n\n⭐ Another common corollary (for $K = \\mathbb{R}$, $A \\in \\mathbb{R}^{n \\times n}$, viewing $A$ as $n$ row vectors): **the determinant is linear in each row**, so the behaviour of det under elementary row operations can be listed one by one (swapping rows changes the sign, adding a multiple leaves it unchanged, multiplying by $c$ multiplies it by $c$).\n\nGaussian elimination computes determinants precisely through these three rules.",
        status: 'draft',
        basedOn: 'v0.9.3#2a645083',
      },
    },

    'thm.svd': {
      statement: {
        en: "Let $A \\in M_{m \\times n}(\\mathbb{R})$ (or over $\\mathbb{C}$), of rank $r$. Then there exist orthogonal (unitary) matrices $U \\in M_m$, $V \\in M_n$ and a \"diagonal\" matrix $\\Sigma$ (only the first $r$ diagonal entries nonzero) such that\n\n$$A = U \\Sigma V^{\\dagger}, \\qquad \\Sigma = \\operatorname{diag}(\\sigma_1, \\ldots, \\sigma_r, 0, \\ldots), \\quad \\sigma_1 \\ge \\cdots \\ge \\sigma_r > 0$$\n\nThe $\\sigma_i$ are called the **singular values** of $A$; they are the square roots of the eigenvalues of $A^{\\dagger}A$ (or $AA^{\\dagger}$).",
        status: 'draft',
        basedOn: 'v0.9.3#50729a47',
      },
      notes: {
        en: "⭐ Geometric reading of SVD: **every linear map = rotation/reflection $\\to$ stretch along the coordinate axes $\\to$ another rotation/reflection**.\n\nThus it reduces an arbitrary matrix to diagonal form \"after choosing good bases $U$ and $V$\" — this is the complete answer to the **equivalence** classification ($A \\mapsto PAQ$) (the diagonal entries are the singular values, the number of nonzero ones is the rank).\n\n⭐ Division of labour with the spectral theorem: the spectral theorem handles **square and self-adjoint** (similarity classification);\n\nSVD handles **arbitrary shapes** (equivalence classification).\n\nThe former requires $m = n$ and $A^{\\ast} = A$; the latter requires nothing.\n\n⭐ Uses (the most important theorem in numerical linear algebra): low-rank approximation (Eckart–Young: truncating to the first $k$ singular values gives the best low-rank approximation), principal component analysis, pseudoinverse, condition number.",
        status: 'draft',
        basedOn: 'v0.9.3#ef21df6d',
      },
    },

    'def.dual-space': {
      statement: {
        en: "Let $V$ be a $K$-vector space. The **dual space** of $V$ is defined as the set of all linear maps from $V$ to $K$:\n\n$$V^{\\ast} := \\operatorname{Hom}_K(V, K)$$\n\nits elements are called **linear functionals**. $V^{\\ast}$ becomes a vector space under pointwise addition and scalar multiplication.\n\nIf $T : V \\to W$ is linear, define the **transpose** (or dual) map\n\n$$T^{\\ast} : W^{\\ast} \\to V^{\\ast}, \\qquad \\varphi \\longmapsto \\varphi \\circ T$$\n\nIt is linear, and $(S \\circ T)^{\\ast} = T^{\\ast} \\circ S^{\\ast}$ (**contravariance**).",
        status: 'draft',
        basedOn: 'v0.9.3#561cb824',
      },
      notes: {
        en: "⭐ Mind the direction: the dual $T^{\\ast}$ of $T : V \\to W$ is $W^{\\ast} \\to V^{\\ast}$, **the arrow is reversed**.\n\nThis is the entire meaning of the word \"dual\", and it is consistent with the status of $(-)^{\\ast}$ as a contravariant functor.\n\n⭐ In finite dimension $V \\cong V^{\\ast}$ (equal dimensions), but there is **no natural isomorphism** — to find one, a basis must first be chosen.\n\nWhereas $V \\cong V^{\\ast\\ast}$ has the natural isomorphism $v \\mapsto (\\varphi \\mapsto \\varphi(v))$; this is \"the dual of the dual returns to itself\".\n\n⚠ In infinite dimension $V^{\\ast}$ is strictly larger than $V$: $\\dim V^{\\ast} = \\#(K)^{\\dim V}$ is a cardinality theorem of **Erdős–Kaplansky** (it uses AC; $\\#(V^{\\ast}) = \\#(K)^{\\dim V}$ is elementary, but \"the dimension equals this cardinal\" is not), so the above isomorphism fails.",
        status: 'draft',
        basedOn: 'v0.9.3#5929282e',
      },
    },

    'def.gcd-domain': {
      statement: {
        en: "An integral domain $A$ is called a **gcd domain** if every $a, b \\in A$ has a **greatest common divisor**: there exists $d$ such that\n\n$$d \\mid a,\\quad d \\mid b,$$\n\nand **every $c$ dividing both $a, b$ divides $d$**.\n\nNote that \"greatest\" means the **greatest lower bound in the divisibility order**, not comparison of size — an integral domain has no total order.",
        status: 'draft',
        basedOn: 'v0.9.3#f0ee7240',
      },
      notes: {
        en: "Why it must be defined this way: in $\\mathbb{Z}$ the \"greatest common divisor\" relies on comparing $|d|$, and a general integral domain has no absolute value. The right replacement is \"divisible by every common divisor\": in $\\mathbb{Z}$ it is equivalent to \"largest absolute value\", and in $\\mathbb{Z}[i]$ too this is the only statement that holds.\n\nHierarchy: UFD $\\implies$ gcd domain (`imp.ring-ufd-gcd`), but not conversely ($\\mathbb{Z}[\\sqrt{-5}]$ does not even have $\\gcd(6, 2(1+\\sqrt{-5}))$). Bézout domain $\\implies$ gcd domain, because $\\gcd$ is given directly by a linear combination.\n\n$\\gcd$ may fail to exist — this is exactly why \"uniqueness of factorization in a UFD\" cannot be replaced by gcd.",
        status: 'draft',
        basedOn: 'v0.9.3#3d56a870',
      },
    },

    'prop.prime-ideal': {
      statement: {
        en: "Let $A$ be a commutative ring with unit, $P, M \\subset A$ a **proper ideal** (proper; if $P = A$ were allowed, \"$A/P$ is an integral domain\" would fail; if $M = A$ were allowed, \"maximal\" would fail).\n\n**(i)** $P$ is called **prime** if $ab \\in P \\implies a \\in P$ or $b \\in P$. Equivalently: $A/P$ is an **integral domain**.\n\n**(ii)** $M$ is called **maximal** if there is no ideal $J$ with $M \\subset J \\subset A$. Equivalently: $A/M$ is a **field**.\n\n**(iii)** Maximal $\\implies$ prime ($A/M$ a field $\\implies$ an integral domain).",
        status: 'draft',
        basedOn: 'v0.9.3#3c4dff50',
      },
      notes: {
        en: "⭐ A prime ideal is the abstraction of \"divisibility\": in $\\mathbb{Z}$ ($p \\ge 2$), $(p)$ is prime $\\iff$ $p$ is prime ($(0)$ is also prime, but $0$ is not prime); in $k[x]$ ($k$ a field, $f \\ne 0$), $(f)$ is prime $\\iff$ $f$ is irreducible ($(0)$ is also prime, while $0$ is irreducible).\n\n⭐ A maximal ideal is \"the simplest after quotienting\": $\\mathbb{Z}/p\\mathbb{Z}$ is a field, $\\mathbb{Z}/(6)$ is not (it has zero divisors).\n\n⚠ Maximal $\\implies$ prime, but **not conversely**: in $k[x,y]$, $(x)$ is prime ($k[x,y]/(x) \\cong k[y]$ is an integral domain), yet not maximal ($(x) \\subset (x, y) \\subset k[x,y]$).\n\nIn a one-dimensional integral domain, the **nonzero** prime ideals are all maximal (e.g. $\\mathbb{Z}$, $k[x]$); $(0)$ is prime but not maximal ($\\mathbb{Z}$ in $(0) \\subset (2) \\subset \\mathbb{Z}$).\n\n📌 Existence (every proper ideal lies in a maximal ideal) requires Zorn's lemma; that is an application of `lem.zorn`, not part of this entry.",
        status: 'draft',
        basedOn: 'v0.9.3#671f5f5c',
      },
    },

    'prop.ideal-basic': {
      statement: {
        en: "Let $A$ be a ring and $I, J \\subseteq A$ ideals. Then:\n\n**(i)** $I \\cap J$ and\n\n$$I + J := \\{\\, x + y : x \\in I,\\ y \\in J \\,\\}$$\n\nare ideals; $I + J$ is the **smallest** ideal containing $I \\cup J$;\n\n**(ii)** the set of finite sums\n\n$$IJ := \\left\\{ \\sum_{k=1}^{n} x_k y_k : x_k \\in I,\\ y_k \\in J,\\ n \\ge 0 \\right\\}$$\n\nis an ideal, and $IJ \\subseteq I \\cap J$;\n\n**(iii) universal property of the quotient ring**: if $\\varphi : A \\to B$ is a ring homomorphism with $\\varphi(I) = 0$, then there is a **unique** ring homomorphism $\\bar{\\varphi} : A/I \\to B$ such that $\\bar{\\varphi} \\circ \\pi = \\varphi$, where $\\pi : A \\to A/I$ is the quotient map.",
        status: 'draft',
        basedOn: 'v0.9.3#af38a24c',
      },
      notes: {
        en: "⭐ Compare groups: to quotient a group into a group, one quotients by a **normal subgroup**; to quotient a ring into a ring, one quotients by an **ideal**.\n\nThe reason is exactly the same — the operations on the quotient set must be independent of the representative.\n\n⚠ The **union** of ideals is not generally an ideal: $2\\mathbb{Z} \\cup 3\\mathbb{Z}$ does not contain $2 + 3 = 5$.\n\nSo the substitute for \"union\" is the **sum** $I + J$, which is the smallest ideal containing both.\n\n⭐ The universal property of the quotient ring is the other face of the \"first isomorphism theorem\": when $\\ker \\varphi \\supseteq I$, $\\varphi$ factors through $A/I$, and $A/\\ker\\varphi \\cong \\operatorname{im}\\varphi$.",
        status: 'draft',
        basedOn: 'v0.9.3#e22f77a4',
      },
    },

    'thm.fundamental-arithmetic': {
      statement: {
        en: "Every integer $n > 1$ can be written uniquely as\n\n$$n = p_{1}^{e_{1}} p_{2}^{e_{2}} \\cdots p_{r}^{e_{r}},$$\n\nwhere $p_{1} < p_{2} < \\cdots < p_{r}$ are primes and $e_{i} \\in \\mathbb{Z}_{\\ge 1}$.",
        status: 'draft',
        basedOn: 'v0.9.3#d5a75b8d',
      },
      notes: {
        en: "Existence: induct on $n$ — if $n$ is prime, done; otherwise $n = ab$ with $1 < a, b < n$, apply the induction hypothesis to $a, b$ and multiply.\n\nUniqueness: use Euclid's lemma ($p \\mid ab \\implies p \\mid a$ or $p \\mid b$). This is the standard argument for a unique factorization domain (UFD).\n\nThe abstract algebraic version is \"$\\mathbb{Z}$ is a UFD\": $K[x]$ also is (`thm.poly-ufd`), while $\\mathbb{Z}[\\sqrt{-5}]$ is not ($6 = 2\\cdot 3 = (1+\\sqrt{-5})(1-\\sqrt{-5})$).\n\nHierarchy: Euclidean domain $\\implies$ UFD $\\implies$ gcd domain.",
        status: 'draft',
        basedOn: 'v0.9.3#7369f432',
      },
    },

    'def.power': {
      statement: {
        en: "Let $A$ be a ring with unit (e.g. $\\mathbb{Z}$, $\\mathbb{R}$), $a \\in A$. The **integer powers** are defined recursively ($a^{0} := 1$ is the convention for the **empty product**; when $a = 0$ one also takes $0^{0} := 1$):\n\n$$a^{0} := 1, \\qquad a^{n+1} := a^{n} \\cdot a \\quad (n \\in \\mathbb{N});$$\n\nIf $a$ is invertible (in $\\mathbb{R}$ this means $a \\ne 0$), define for $n \\ge 1$\n\n$$a^{-n} := (a^{-1})^{n} = \\frac{1}{a^{n}}.$$",
        status: 'draft',
        basedOn: 'v0.9.3#d99a76a8',
      },
      notes: {
        en: "⭐ A power is just a compressed notation for \"multiplication written many times\"; it has no new content — but it turns \"$n$ times\" into an **object one can induct on**: `thm.binomial`, `thm.bernoulli`, geometric series and power series all induct on $n$.\n\n⚠ Only **integer** exponents are defined here.\n\n$a^{1/2}$ must wait for `thm.nth-root` (n-th roots), and $a^{\\sqrt{2}}$ for `def.real-power` — the order cannot be reversed, or \"taking roots\" would be an undefined notion.\n\n⚠ $0^{0} = 1$ is an **algebraic convention** (empty product); in **analysis** $0^{0}$ is an indeterminate form with its own limit convention — the two do not conflict, but do not mix them.\n\n⚠ Powers of the **same element** satisfy $a^{n}a = a\\cdot a^{n} = a^{n+1}$ by associativity, with **no** commutativity needed; what needs care is powers of **different elements** (in a noncommutative ring $(ab)^{n} \\ne a^{n}b^{n}$).",
        status: 'draft',
        basedOn: 'v0.9.3#e92f38d1',
      },
    },

    'thm.binomial': {
      statement: {
        en: "Let $A$ be a commutative ring, $a, b \\in A$, $n \\in \\mathbb{N}$. Then\n\n$$(a + b)^{n} = \\sum_{k=0}^{n} \\binom{n}{k} a^{k}\\, b^{n-k}, \\qquad \\binom{n}{k} := \\frac{n!}{k!\\,(n-k)!}.$$\n\nThe coefficients satisfy the **Pascal recurrence**\n\n$$\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k},$$\n\nand are therefore natural numbers ($\\binom{n}{k}$ is the number of ways to \"choose $k$ from $n$\").",
        status: 'draft',
        basedOn: 'v0.9.3#fb046ce1',
      },
      notes: {
        en: "⭐ This theorem is used in two places on the graph: the functional equation $\\exp(z+w) = \\exp z\\,\\exp w$ of `def.exp-function` (expand $(z+w)^{n}$ and rearrange), and the amplification of $(b+h)^{n}$ in `thm.nth-root`.\n\n⭐ The proof inducts only on $n$: expand $(a+b)^{n+1} = (a+b)^{n}(a+b)$, and use Pascal to merge the two groups of coefficients.\n\n⚠ It fails in noncommutative rings ($ab \\ne ba$), hence the hypothesis says commutative ring.",
        status: 'draft',
        basedOn: 'v0.9.3#d5d70268',
      },
    },

    'thm.bernoulli': {
      statement: {
        en: "Let $x \\ge -1$, $n \\in \\mathbb{N}$. Then\n\n$$(1 + x)^{n} \\ge 1 + n x.$$\n\nIf $x \\ne 0$ and $n \\ge 2$, the inequality is **strict**.",
        status: 'draft',
        basedOn: 'v0.9.3#f31f4ac7',
      },
      notes: {
        en: "⭐ This is the smallest estimate that compresses \"multiplying the same $1+x$ repeatedly\" into a **linear** bound, and $x$ can be arbitrarily small.\n\nIn analysis it is used for **lower bounds**: $(1+h)^{n} \\ge 1 + nh$, $(1-h)^{n} \\ge 1 - nh$ — the second direction of `thm.nth-root` is exactly this.\n\n⚠ The hypothesis $x \\ge -1$ is there to make $1+x \\ge 0$: the induction step multiplies both sides by $1+x$, and only if it is nonnegative does the inequality not reverse.\n\nFor $x < -1$ the statement may fail or lose its induction base.",
        status: 'draft',
        basedOn: 'v0.9.3#cfcdc531',
      },
    },

    'prop.order-rules': {
      statement: {
        en: "Let $K$ be an ordered field, $a, b, c, d \\in K$. Then\n\n**(i)** $a < b \\iff a + c < b + c$;\n\n**(ii)** $a < b$ and $c < d$ $\\implies$ $a + c < b + d$;\n\n**(iii)** for $c > 0$, $a < b \\implies ac < bc$; for $c < 0$, $a < b \\implies ac > bc$;\n\n**(iv)** $0 < a < b \\implies 0 < \\dfrac{1}{b} < \\dfrac{1}{a}$;\n\n**(v)** $0 < 1$; and $a \\ne 0 \\implies a^{2} > 0$;\n\n**(vi)** $a < b \\implies a < \\dfrac{a + b}{2} < b$.",
        status: 'draft',
        basedOn: 'v0.9.3#62f12283',
      },
      notes: {
        en: "⭐ This is the rule table for all **inequality estimates**.\n\nPart (iii) is the easiest to get wrong: multiplying by a negative number **reverses** the inequality, so when making an $\\varepsilon$ estimate always first check whether the quantity being multiplied is positive.\n\n⭐ Part (iv) (reciprocal reverses order) is used daily in places like \"$|g(x)| > |B|/2 \\implies 1/|g(x)| < 2/|B|$\" — the reciprocal rule for limits relies on it to amplify $1/|g|$.\n\n⚠ The whole package depends only on the **two compatibility axioms** in the definition: addition preserves order, and multiplication by a positive number preserves order.\n\nEverything else is a corollary.",
        status: 'draft',
        basedOn: 'v0.9.3#f6670076',
      },
    },

    'cor.archimedean-epsilon': {
      statement: {
        en: "Let $K$ be a complete ordered field (e.g. $\\mathbb{R}$).\n\n**(i)** For every $\\varepsilon > 0$ there exists $n \\ge 1$ with $1/n < \\varepsilon$; equivalently, the infimum of those $1/n$ is zero:\n\n$$\\frac{1}{n} < \\varepsilon; \\qquad \\inf\\left\\{ \\frac{1}{n} : n \\ge 1 \\right\\} = 0.$$\n\n**(ii)** For every $x \\in K$ there is a **unique** integer $n$ such that\n\n$$n \\le x < n + 1.$$\n\nWrite $n = \\lfloor x \\rfloor$, called the **integer part** of $x$ (the floor function); $\\{x\\} := x - \\lfloor x \\rfloor \\in [0, 1)$ is called the **fractional part**.",
        status: 'draft',
        basedOn: 'v0.9.3#68159876',
      },
      notes: {
        en: "⭐ (i) is the **standard form** in analysis of \"take $n$ sufficiently large\".\n\nThe Archimedean property originally says \"$\\mathbb{N}$ is unbounded\", but in actual proofs one almost always uses (i): given $\\varepsilon$, take $n > 1/\\varepsilon$.\n\n⭐ (ii) \"sandwiches a real number between two adjacent integers\" — the proof of density of the rationals (part (ii) of `lem.archimedean`) uses it.\n\nIt relies on the **discreteness** of $\\mathbb{Z}$ in $K$ (there is no other integer between adjacent ones), not merely on unboundedness.\n\n⚠ $\\mathbb{Q}$ also satisfies (i) (it is Archimedean), but $\\mathbb{Q}$ does not satisfy the least-upper-bound property — so (i) itself does **not** need completeness, only the Archimedean property;\n\nwriting \"complete ordered field\" here is only to align with `lem.archimedean`.",
        status: 'draft',
        basedOn: 'v0.9.3#20888269',
      },
    },

    'thm.geometric-series': {
      statement: {
        en: "Let $q \\in \\mathbb{R}$. Then the series $\\sum_{n=0}^{\\infty} q^{n}$ converges **if and only if** $|q| < 1$; in that case\n\n$$\\sum_{n=0}^{\\infty} q^{n} = \\frac{1}{1 - q}.$$",
        status: 'draft',
        basedOn: 'v0.9.3#5907d8d7',
      },
      notes: {
        en: "⭐ This is the **yardstick** for all series tests: the comparison test, root test and ratio test all ultimately reduce to \"some geometric series converges\".\n\nThe phrase \"the geometric series converges\" in `imp.root-test` and `imp.banach-fixed-point` refers to this statement.\n\n⭐ For $|q| < 1$, the proof of $q^{n} \\to 0$ uses Bernoulli plus the Archimedean property: write $1/|q| = 1 + h$ ($h > 0$), so $(1+h)^{n} \\ge 1 + nh$, and hence $|q|^{n} \\le \\dfrac{1}{1 + nh} \\le \\dfrac{1}{n h}$ can be made arbitrarily small.\n\n⚠ For $|q| \\ge 1$ the general term does not tend to $0$, so the series must diverge — this half needs no test at all.",
        status: 'draft',
        basedOn: 'v0.9.3#553166cd',
      },
    },

    'thm.p-series': {
      statement: {
        en: "Let $p \\in \\mathbb{R}$. Then the series\n\n$$\\sum_{n=1}^{\\infty} \\frac{1}{n^{p}}$$\n\nconverges **if and only if** $p > 1$.",
        status: 'draft',
        basedOn: 'v0.9.3#e2a0ee4a',
      },
      notes: {
        en: "⭐ $p = 1$ is the harmonic series (divergent), $p = 2$ is $\\sum 1/n^{2} = \\pi^{2}/6$ (convergent) — the two are standard examples where \"tests fail on the boundary\": the root test gives $\\alpha = 1$ for both.\n\n⭐ The proof is the most beautiful application of `thm.cauchy-condensation` (Cauchy's condensation test): when $a_n = n^{-p}$ is monotonically decreasing, the original series converges $\\iff$ $\\sum 2^{k} a_{2^{k}} = \\sum (2^{1-p})^{k}$ converges, and the latter is a geometric series with ratio $2^{1-p}$, which converges $\\iff$ $2^{1-p} < 1 \\iff p > 1$.",
        status: 'draft',
        basedOn: 'v0.9.3#68fb7691',
      },
    },

    'prop.power-rules': {
      statement: {
        en: "Let $A$ be a commutative ring, $a, b \\in A$, $m, n \\in \\mathbb{Z}$ (when negative exponents occur, $a, b$ is required to be invertible). Then\n\n$$a^{m+n} = a^{m}\\,a^{n}, \\qquad (a^{m})^{n} = a^{mn}, \\qquad (ab)^{n} = a^{n}\\,b^{n}.$$\n\nIf $K$ is an ordered field and $a > 1$, then for $m, n \\in \\mathbb{Z}$:\n\n$$m < n \\iff a^{m} < a^{n};$$\n\nwhile for $0 < a < 1$ the inequality reverses; for $a = 1$, $a^{n} = 1$ holds identically.",
        status: 'draft',
        basedOn: 'v0.9.3#f7a70dd9',
      },
      notes: {
        en: "⭐ The three exponent laws are all \"induction on $n$\", with no trick.\n\nWhat is really useful is **monotonicity**: for $a > 1$, $n \\mapsto a^{n}$ is strictly increasing, so in an **Archimedean ordered field** (e.g. $\\mathbb{R}$), $q^{n} \\to 0$ ($0 < q < 1$) can be written as $q^{n} \\le 1/(1+nh)$ and squeezed (it fails in a general ordered field: in $\\mathbb{Q}(t)$, $t$ is infinite, and powers of $q = 1/2$ are never less than $1/t$) — the proof that the geometric series converges rests on this.\n\n⚠ The negative-exponent half requires first writing $a^{-n}$ as $(a^{-1})^{n}$, then using the **positive-exponent** result;\n\ncommutativity is essential here ($(ab)^{-1} = b^{-1}a^{-1} = a^{-1}b^{-1}$ holds only in the commutative case).",
        status: 'draft',
        basedOn: 'v0.9.3#478c0c93',
      },
    },

    'thm.derivative-rules': {
      statement: {
        en: "Let $f$ be differentiable at $x_0$, and $g$ differentiable at $f(x_0)$ (the first four formulas below only need $f, g$ to be differentiable at $x_0$ each), $c \\in \\mathbb{R}$. Then\n\n$$(f \\pm g)'(x_0) = f'(x_0) \\pm g'(x_0), \\qquad (cf)'(x_0) = c\\,f'(x_0),$$\n\n$$(fg)'(x_0) = f'(x_0)\\,g(x_0) + f(x_0)\\,g'(x_0),$$\n\n$$\\left(\\frac{f}{g}\\right)'(x_0) = \\frac{f'(x_0)\\,g(x_0) - f(x_0)\\,g'(x_0)}{g(x_0)^{2}} \\quad (g(x_0) \\ne 0),$$\n\n$$(g \\circ f)'(x_0) = g'(f(x_0))\\,f'(x_0).$$",
        status: 'draft',
        basedOn: 'v0.9.3#8e03fb6f',
      },
      notes: {
        en: "⭐ The key to the product rule is **adding and subtracting a term**: $f(x)g(x) - f(x_0)g(x_0) = [f(x) - f(x_0)]\\,g(x) + f(x_0)[g(x) - g(x_0)]$.\n\nThe $g(x)$ in the first term must be replaced by $g(x_0)$ using \"differentiable $\\implies$ continuous\" — this is why `prop.differentiable-implies-continuous` must precede it.\n\n⚠ The chain rule **cannot** be written directly as $\\dfrac{\\Delta g}{\\Delta f}\\cdot\\dfrac{\\Delta f}{\\Delta x}$: $\\Delta f$ may be $0$ (when $f$ takes the same value near $x_0$), and the denominator vanishes.\n\nThe correct approach writes the increment of $g$ as \"linear main part + remainder\": $g(y) - g(y_0) = [g'(y_0) + \\varepsilon(y)]\\,(y - y_0)$, where $\\varepsilon(y) \\to 0$.\n\n⭐ The quotient rule is obtained from the product rule and $\\left(\\dfrac{1}{g}\\right)' = -\\dfrac{g'}{g^{2}}$;\n\nthe latter divides $\\dfrac{1}{g(x)} - \\dfrac{1}{g(x_0)} = -\\dfrac{g(x) - g(x_0)}{g(x)g(x_0)}$ by $x - x_0$ and takes the limit.",
        status: 'draft',
        basedOn: 'v0.9.3#11eab0af',
      },
    },

    'thm.fundamental-algebra': {
      statement: {
        en: "Every polynomial $p \\in \\mathbb{C}[z]$ of degree $\\ge 1$ with complex coefficients has a complex root. Equivalently:\n\n- $\\mathbb{C}$ is **algebraically closed**: the irreducible polynomials in $\\mathbb{C}[z]$ are exactly the linear ones;\n- every $p \\ne 0$ can be written uniquely as\n\n$$p(z) = c\\,(z - z_1)^{e_1} \\cdots (z - z_m)^{e_m}, \\qquad c \\in \\mathbb{C}^{\\times}$$",
        status: 'draft',
        basedOn: 'v0.9.3#018d56b9',
      },
      notes: {
        en: "⭐ It is called the \"fundamental theorem of algebra\", yet it is **not an algebraic theorem** — every proof uses the **completeness** of $\\mathbb{R}$ (because the algebraic closedness of $\\mathbb{C}$ is essentially a compactness + continuity fact).\n\nThat is why the graph tags its `regions` as `analysis` + `algebra`.\n\n⭐ Proof (the route taken on the graph):\n1. $|p(z)| \\to +\\infty$ as $|z| \\to \\infty$, so on some closed disk the **extreme value theorem** gives a minimum $m \\ge 0$;\n2. if $m > 0$, perturb near the minimizing point $z_0$ by $z_0 + h$, expand $p(z_0 + h) = p(z_0) + a_k h^{k} + \\cdots$ ($a_k h^{k}$ being the first nonzero term), and choose the direction of $h$ so that $|p(z_0) + a_k h^{k}| < |p(z_0)|$, contradicting minimality.\n3. Hence $m = 0$, i.e. $p$ has a root;\nthen divide once by the factor theorem and induct to get the full factorization.\n\n⚠ Step 2 uses **complex $k$-th roots** ($a_k h^{k}$ can point in any direction); this is exactly why it must be done over $\\mathbb{C}$ and not over $\\mathbb{R}$.\n\n**Hypotheses used in each direction** (the equivalences between the forms are algebra; that complex numbers have roots is the core theorem):\n- every nonconstant polynomial has a root $\\iff$ the field is algebraically closed: free by unfolding the usual definition; here only univariate polynomials over a field are treated.\n- a root $\\implies$ factorization into linear factors: use the factor theorem and induction on degree; conversely, a factorization of a nonconstant polynomial immediately gives a root, with no analysis needed.\n- all irreducible polynomials are linear $\\iff$ complete splitting: use irreducible factorization in the polynomial ring over a field; uniqueness uses $\\mathbb C[z]$, roots counted with multiplicity, multiplicities positive integers, order of factors irrelevant, constants by the empty product.\n- complex polynomials really have roots: this page's proof uses compactness of the closed disk, the extreme value theorem for continuous functions, and the polar form of complex numbers to choose a direction; over $\\mathbb R$, $z^2+1$ has no root, so the base-field hypothesis cannot be dropped.",
        status: 'draft',
        basedOn: 'v0.9.3#52b7b443',
      },
    },

    'thm.liouville': {
      statement: {
        en: "**In plain words**: a function holomorphic on the whole complex plane and bounded must be constant — the complex plane is \"too crowded\" to accommodate a nonconstant bounded holomorphic function.\n\nIf $f$ is holomorphic on $\\mathbb{C}$ (such functions are called **entire**), and there is a constant $M$ with\n\n$$|f(z)| \\le M, \\qquad \\forall z \\in \\mathbb{C},$$\n\nthen $f$ is constant.",
        status: 'draft',
        basedOn: 'v0.9.3#88ca4bca',
      },
      notes: {
        en: "⭐ Proof (via the Cauchy estimates): for any $z$ and any $R > 0$, $f$ is holomorphic on $B(z, R)$, hence $|f'(z)| \\le M/R$.\n\nLet $R \\to \\infty$ to get $f'(z) = 0$;\n\nsince $z$ is arbitrary, $f' \\equiv 0$;\n\nthe domain is connected, so $f$ is constant.\n\n⭐ The book also gives a second proof using **only the Cauchy integral formula**: take $R > |z|$,\n\n$$f(z) - f(0) = \\frac{1}{2\\pi i}\\oint_{|\\zeta| = R}\\left( \\frac{1}{\\zeta - z} - \\frac{1}{\\zeta} \\right) f(\\zeta)\\,\\mathrm{d}\\zeta,$$\n\nestimate $|f(z) - f(0)| \\le \\dfrac{M|z|}{R - |z|} \\to 0$ ($R \\to \\infty$), hence $f(z) = f(0)$.\n\n⚠ Boundedness cannot be relaxed carelessly: $e^{z}$ is bounded on the **left** half-plane ($|e^{z}| \\le 1$), but unbounded on the whole plane.\n\nConversely, if one only knows $|f(z)| \\le C(1 + |z|)^k$, the same argument gives only \"$f$ is a polynomial of degree at most $k$\".\n\n⭐ Contrast with real analysis: $\\sin x$ is bounded and infinitely differentiable on $\\mathbb{R}$, yet not constant — because \"entire\" is far stronger than \"$C^\\infty$ function\".",
        status: 'draft',
        basedOn: 'v0.9.3#a14ed1b5',
      },
    },

    'thm.morera': {
      statement: {
        en: "**In plain words**: a continuous function whose integral along every closed triangle (equivalently, every small rectangle) is zero is holomorphic — this is the converse of Cauchy's theorem.\n\nLet $\\Omega \\subset \\mathbb{C}$ be an **open set** (no connectedness needed — holomorphy is checked pointwise, applying Morera on a small disk at each point), and $f: \\Omega \\to \\mathbb{C}$ **continuous**. If for every closed triangle $T \\subset \\Omega$ we have\n\n$$\\oint_{\\partial T} f(\\zeta)\\,\\mathrm{d}\\zeta = 0,$$\n\nthen $f$ is holomorphic on $\\Omega$; moreover $f'$ is also holomorphic, and $f$ has a Taylor expansion at every point.\n\nReplacing \"closed triangle\" by \"closed rectangle with sides parallel to the coordinate axes\" leaves the conclusion unchanged (a rectangle is split into two triangles along a diagonal).",
        status: 'draft',
        basedOn: 'v0.9.3#da7dcd0d',
      },
      notes: {
        en: "⭐ Use: this is the most convenient tool for **testing holomorphy** — no a priori differentiability is needed, only \"continuous\" plus \"some integral vanishes identically\". Holomorphy is traded for an integral equation.\n\n⭐ The most-used corollary: **the limit of a locally uniformly convergent sequence of holomorphic functions is holomorphic**. Because $\\partial T$ is compact, $\\oint_{\\partial T} f_k = 0$ can be taken to the limit to get $\\oint_{\\partial T} f = 0$, which is then fed to Morera. Hurwitz's theorem is the \"zero version\" of this.\n\n⚠ Continuity cannot be dropped. Without it, the same integral condition does not imply differentiability.\n\n⚠ The hypothesis \"all triangles\" **can** be replaced by \"all circles\": under **continuity**, it already **suffices** that the integral over every circle inside a closed disk vanishes to guarantee holomorphy — convolving with a mollifier keeps the circle condition, the expansion in small circles gives $\\partial_{\\bar z} f_\\varepsilon = 0$, and then one takes a locally uniform limit.\n\n📌 Together with Cauchy–Goursat: when $f$ is continuous, \"$f$ holomorphic\" and \"$f$ has zero integral along every closed triangle\" are **equivalent** statements.",
        status: 'draft',
        basedOn: 'v0.9.3#1b4556bd',
      },
    },

    'thm.taylor-complex': {
      statement: {
        en: "**In plain words**: near any point a holomorphic function is a power series — that is, for complex functions \"differentiable\" and \"expressible as a power series\" are the same thing.\n\nLet $f$ be holomorphic on the disk $B(a, R)$. Then for $z \\in B(a, R)$,\n\n$$f(z) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}\\,(z - a)^n,$$\n\nand the right-hand side **converges uniformly** on every compact subset of $B(a, R)$. Hence $f$ is **analytic** on $B(a, R)$ (equal to the sum of some power series).",
        status: 'draft',
        basedOn: 'v0.9.3#39bd0e19',
      },
      notes: {
        en: "⭐ The proof has only two steps: the Cauchy integral formula + a geometric series.\n\nTake $\\rho \\in (|z - a|, R)$, and write\n\n$$\\frac{1}{\\zeta - z} = \\frac{1}{(\\zeta - a) - (z - a)} = \\sum_{n=0}^{\\infty} \\frac{(z - a)^n}{(\\zeta - a)^{n+1}},$$\n\nthe ratio $|z - a|/\\rho < 1$, the series converges uniformly in $\\zeta \\in \\partial B(a, \\rho)$, so term-by-term integration is allowed;\n\nthe coefficients obtained by term-by-term integration are exactly $f^{(n)}(a)/n!$ (the higher-derivative formula).\n\n⭐ This links \"differentiation\" and \"series\": **holomorphic** $\\iff$ **locally a power series** $\\iff$ **analytic**.\n\nIn real analysis the two are **not equivalent** — $e^{-1/x^2}$ is infinitely differentiable at $0$, but its Taylor series is identically $0$, and equals the original function in no neighbourhood of $0$.\n\n⚠ The radius of convergence is at least the distance from $a$ to the nearest singularity — exactly the topic of \"where are the singularities\" (Chapter 12 of the book).\n\n📌 The same section also has \"Cauchy's inequalities in series form\": if $f = \\sum a_n (z - a)^n$ holds on $B(a, R)$, then $|a_n| \\le M(r)/r^n$ ($0 < r < R$).",
        status: 'draft',
        basedOn: 'v0.9.3#fcca3884',
      },
    },

    'def.analytic-continuation': {
      statement: {
        en: "A **function element** is a pair $(f, D)$: $D$ is an open disk and $f$ is holomorphic on $D$.\n\nLet $\\gamma : [0, 1] \\to \\mathbb{C}$ be a curve and $\\gamma(0)$ the centre of some element $(f_{0}, D_{0})$. An **analytic continuation chain** over $\\gamma$ is a family of elements $(f_{t}, D_{t})$ ($t \\in [0,1]$) such that:\n\n1. $\\gamma(t)$ is the centre of $D_{t}$;\n2. for every $t$ there is $\\delta > 0$ such that when $|s - t| < \\delta$ we have $D_{s} \\cap D_{t} \\ne \\emptyset$ and $f_{s} = f_{t}$ on the intersection;\n3. $f_{t}$ depends continuously on $t$ (on overlaps).\n\nAll elements obtained by continuation along all curves starting at $\\gamma(0)$, glued along overlaps, form the **complete analytic function** (generally a multivalued function, lying on the Riemann surface of `def.riemann-surface`).",
        status: 'draft',
        basedOn: 'v0.9.3#30b68c67',
      },
      notes: {
        en: "**Why a \"chain\" rather than \"one function\"**: continuation is done step by step — each step moves the disk a little, and on overlaps the uniqueness theorem guarantees the two elements are restrictions of the same function. The chain is what makes this continuous.\n\n⭐ **The carrier is the power series**: every element can be expanded at its centre into a convergent power series (`thm.taylor-complex`), so continuation can also be seen as \"changing the expansion point along the curve\". The radius of convergence is determined by the distance to the nearest singularity — hitting a singularity breaks the continuation.\n\n⚠️ **The result of continuation depends on the path**. The standard example: $\\log z$ starting from $1$ and going once counterclockwise around the unit circle returns to $1$ with the value $2\\pi i$. When is it path-independent? That is exactly what `thm.monodromy` answers.\n\n📌 Relation to `def.logarithm-branch` and `def.branch`: the \"branch\" there is the **result** of continuation, whereas here we describe the **process**. One object, two ways of speaking.",
        status: 'draft',
        basedOn: 'v0.9.3#28fe020f',
      },
    },

    'lem.yoneda': {
      statement: {
        en: "Let $F : \\mathcal{C} \\to \\mathbf{Set}$ be a functor, $X \\in \\mathcal{C}$, and write\n\n$$h^{X} = \\operatorname{Hom}_{\\mathcal{C}}(X, -) : \\mathcal{C} \\to \\mathbf{Set}$$\n\nThen there is a natural bijection\n\n$$\\operatorname{Hom}(h^{X}, F) \\;\\cong\\; F(X), \\qquad \\alpha \\mapsto \\alpha_{X}(1_{X})$$\n\nthat is, \"all natural transformations\" correspond one-to-one with \"elements of $F(X)$\".",
        status: 'draft',
        basedOn: 'v0.9.3#09358575',
      },
      notes: {
        en: "**Proof.** Define the map\n\n$$\\Phi : \\operatorname{Nat}(h^{X}, F) \\longrightarrow F(X), \\qquad \\Phi(\\alpha) := \\alpha_{X}(1_{X}).$$\n\n- **Inverse map**: given $u \\in F(X)$, for each $Y$ define\n\n$$\\Psi(u)_{Y} : \\operatorname{Hom}_{\\mathcal{C}}(X, Y) \\to F(Y), \\qquad \\Psi(u)_{Y}(f) := F(f)(u).$$\n\nIt is natural: for $g : Y \\to Z$, by functoriality of $F$, $F(g)\\circ F(f) = F(g\\circ f)$, the two sides are exactly $F(g)\\bigl(\\Psi(u)_{Y}(f)\\bigr)$ and $\\Psi(u)_{Z}(g\\circ f)$ ✓.\n\n- **$\\Phi\\Psi = \\mathrm{id}$**: $\\Psi(u)_{X}(1_{X}) = F(1_{X})(u) = u$ ✓.\n\n- **$\\Psi\\Phi = \\mathrm{id}$**: given $\\alpha$ and $f : X\\to Y$, use the naturality of $\\alpha$ (applied to $f$)\n\n$$\\alpha_{Y}\\circ h^{X}(f) = F(f)\\circ \\alpha_{X} \\;\\implies\\; \\alpha_{Y}(f) = F(f)\\bigl(\\alpha_{X}(1_{X})\\bigr) = \\Psi\\bigl(\\Phi(\\alpha)\\bigr)_{Y}(f) ✓$$\n\n- **Naturality**: $\\Phi$ is natural in $F$ (along $\\beta : F\\to G$ both sides become $\\beta_{X}\\circ(-)$) ✓; and natural in $X$ (along $k : X'\\to X$, precomposition with $h^{k}$ corresponds to $F(k)$) ✓.\n\nHence $\\operatorname{Hom}(h^{X}, F) \\cong F(X)$, and the bijection is $\\alpha\\mapsto\\alpha_{X}(1_{X})$ ✓; dually (taking $\\mathcal{C}^{\\mathrm{op}}$) one gets the presheaf version $\\operatorname{Hom}(h_{X}, T) \\cong T(X)$ ✓.\n\n∎\n\nThis bijection is natural in **both** variables: natural in $F$ (natural transformations) and in $X$ (morphisms). Naturality on both sides is what gives the lemma its force.\n\nIt compresses the set \"all natural transformations from $h^{X}$ to $F$\", which is in principle intractable, into **a single element** of $F(X)$. Whenever \"natural transformations are hard to count\", this is the step that saves the day.\n\nDual form: if $T$ is a presheaf ($T : \\mathcal{C}^{\\mathrm{op}} \\to \\mathbf{Set}$) and $h_{X} = \\operatorname{Hom}(-, X)$ is a representable presheaf, then likewise $\\operatorname{Hom}(h_{X}, T) \\cong T(X)$.\n\nThe two formulas differ only by replacing $\\mathcal{C}$ with $\\mathcal{C}^{\\mathrm{op}}$, so both versions are used in what follows.",
        status: 'draft',
        basedOn: 'v0.9.3#22a4b627',
      },
    },

    'thm.sheafification': {
      statement: {
        en: "The category of sheaves is a **reflective subcategory** of the category of presheaves, with reflector\n\n$$\\sharp : \\widehat{\\mathcal{C}} \\longrightarrow \\widehat{\\mathcal{C}}, \\qquad T \\mapsto T^{\\sharp}$$\n\ncalled **sheafification**: for every sheaf $F$,\n\n$$\\operatorname{Hom}_{\\widehat{\\mathcal{C}}}\\bigl(T^{\\sharp},\\ F\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\widehat{\\mathcal{C}}}\\bigl(T,\\ F\\bigr)$$\n\nand it is **idempotent**: $(T^{\\sharp})^{\\sharp} \\cong T^{\\sharp}$. Concretely, $T^{\\sharp}$ is obtained by \"applying the Čech construction to a presheaf twice\".",
        status: 'draft',
        basedOn: 'v0.9.3#6a06d3f4',
      },
      notes: {
        en: "Corollaries:\n\n1. **Limits in the category of sheaves are computed in the category of presheaves** (a reflective subcategory is closed under limits);\n2. $T \\mapsto T^{\\sharp}$ **preserves all colimits and finite limits**.\n\nExamples:\n\n- For the **coarsest** topology ($J(X) = \\{h_{X}\\}$) every presheaf is a sheaf and $\\sharp$ is the identity; for the **finest** topology ($J(X) = $ all sieves) the category of sheaves has only one object, the constant presheaf $\\mathbf{1}$.\n- The sheafification of a constant presheaf (the same set $E$ on every open set) is called the **constant sheaf**.\n- Taking $X$ and $\\mathcal{C} = \\operatorname{Open}(X)$ on a topological space gives the usual category of sheaves, and $\\sharp$ is the usual sheafification functor.",
        status: 'draft',
        basedOn: 'v0.9.3#08cce631',
      },
    },

    'def.holomorphic': {
      statement: {
        en: "**In plain words**: complex differentiability means \"the difference quotient converges in the complex sense\" — $h$ may approach $0$ from **any direction, in any manner**, but the quotient must tend to the same complex number.\n\nLet $\\Omega$ be a plane region (a connected open set), $f: \\Omega \\to \\mathbb{C}$, $z_0 \\in \\Omega$. If the limit\n\n$$f'(z_0) := \\lim_{h \\to 0} \\frac{f(z_0 + h) - f(z_0)}{h} \\qquad (h \\in \\mathbb{C},\\ h \\ne 0,\\ z_0 + h \\in \\Omega)$$\n\nexists, then $f$ is called **complex differentiable** at $z_0$, and $f'(z_0)$ is called the **derivative** of $f$ at $z_0$. If $f$ is complex differentiable at every point of $\\Omega$, then $f$ is called **holomorphic** on $\\Omega$.\n\nComplex differentiability implies continuity: rewrite the definition as\n\n$$f(z_0 + h) - f(z_0) = f'(z_0)\\,h + o(h),$$\n\nletting $h \\to 0$ gives $f(z_0 + h) \\to f(z_0)$.",
        status: 'draft',
        basedOn: 'v0.9.3#b61d4e40',
      },
      notes: {
        en: "⭐ The **only** difference from real differentiability: $h$ is a complex number.\n\nIn the real case it suffices that the left and right directions agree; in the complex case **infinitely many directions** ($h = t e^{i\\theta}$, $\\theta$ arbitrary) must all agree. The requirement is very strong and the reward is very large: one derivative gives infinitely many.\n\n⚠ This requirement is **not automatic**.\n\n$f(z) = \\bar z$ is nowhere complex differentiable: along the real axis, $h = t$ gives difference quotient $1$; along the imaginary axis, $h = it$ gives quotient $-1$.\n\nThe two one-sided limits differ.\n\nSo \"real differentiable\" is far from implying \"complex differentiable\".\n\n⭐ An equivalent formulation of complex differentiability is $\\Delta f = A\\,\\Delta z + o(\\Delta z)$ — the increment is **only** a linear function of $\\Delta z$, and $\\overline{\\Delta z}$ may not appear.\n\nIn partial-derivative language this is $\\partial f/\\partial \\bar z = 0$ (see the Cauchy–Riemann equations).\n\n📌 Sums, products, quotients (with nonzero denominator) and composites of holomorphic functions are holomorphic, with the same derivative formulas as in the real case — because these are only the arithmetic of limits and never use the realness of $h$.",
        status: 'draft',
        basedOn: 'v0.9.3#66d6ae7e',
      },
    },

    'thm.cauchy-riemann': {
      statement: {
        en: "**In plain words**: $f = u + iv$ is complex differentiable if and only if it is real differentiable and its two partial derivatives satisfy a very specific pair of equations — the \"two-dimensional limit condition\" is completely replaced by two one-dimensional equations.\n\nLet $\\Omega$ be a plane region, $f = u + iv: \\Omega \\to \\mathbb{C}$, $z_0 \\in \\Omega$. The following are equivalent:\n\n**(i)** $f$ is complex differentiable at $z_0$;\n\n**(ii)** $f$ is real differentiable at $z_0$, and\n\n$$\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x};$$\n\n**(iii)** $f$ is real differentiable at $z_0$, and $\\dfrac{\\partial f}{\\partial \\bar z}(z_0) = 0$.\n\nWhen they hold, $f'(z_0) = \\dfrac{\\partial f}{\\partial z}(z_0) = \\dfrac{\\partial u}{\\partial x}(z_0) + i\\,\\dfrac{\\partial v}{\\partial x}(z_0)$.",
        status: 'draft',
        basedOn: 'v0.9.3#ac3317e1',
      },
      notes: {
        en: "⭐ The three are really one.\n\n$\\Delta z$ and $\\overline{\\Delta z}$ form a basis of $\\mathbb{C}$ as a real vector space, and the increment can be \"multiplication by a complex number\" only if **only** $\\Delta z$ appears;\n\nthe coefficient of $\\Delta z$ is exactly $u_x + i v_x$.\n\nThe CR equations are simply \"the coefficient of $\\overline{\\Delta z}$ is $0$\", written in components.\n\n⭐ A useful by-product: the Jacobian determinant of $f$ at $z_0$ is $= u_x v_y - u_y v_x = u_x^2 + v_x^2 = |f'(z_0)|^2 \\ge 0$.\n\nHence a holomorphic map is **orientation-preserving** wherever the derivative is nonzero, which is the source of its conformality.\n\n⚠ **Checking the CR equations alone is not enough**; one also needs $f$ to be real differentiable.\n\nCounterexample: $f(x + iy) = \\sqrt{|xy|}$ has all four partial derivatives equal to $0$ at the origin (CR holds), yet the difference quotient along $h = t(1+i)$ tends to $1/(1+i) \\ne 0$, so it is not complex differentiable.\n\nThis also shows that \"partial derivatives exist\" is far weaker than \"real differentiable\".\n\n📌 Holomorphy therefore has two practical routes: the abstract difference quotient (good geometric intuition), or checking CR concretely (convenient for computation).",
        status: 'draft',
        basedOn: 'v0.9.3#485dac38',
      },
    },

    'thm.cauchy-goursat': {
      statement: {
        en: "**In plain words**: on a simply connected region, the integral of a holomorphic function along any closed curve is $0$ — this is the engine of all of complex analysis.\n\nLet $\\Omega$ be a **simply connected** plane region, $f$ holomorphic on $\\Omega$, and $\\gamma$ a piecewise smooth closed curve in $\\Omega$. Then\n\n$$\\oint_\\gamma f(z)\\,\\mathrm{d}z = 0.$$\n\nThe multiply connected case: let $\\gamma_0, \\gamma_1, \\cdots, \\gamma_n$ be piecewise smooth simple closed curves in $\\Omega$, with $\\gamma_1, \\cdots, \\gamma_n$ lying inside $\\gamma_0$ and pairwise disjoint, **all oriented counterclockwise**, and $f$ holomorphic on some open set containing the **closed region** they bound (holomorphy \"on the region\" alone is not enough: the curves themselves must lie in the domain). Then\n\n$$\\oint_{\\gamma_0} f\\,\\mathrm{d}z = \\sum_{k=1}^{n} \\oint_{\\gamma_k} f\\,\\mathrm{d}z.$$",
        status: 'draft',
        basedOn: 'v0.9.3#d9d1a5c5',
      },
      notes: {
        en: "⚠ \"Simply connected\" cannot be dropped.\n\n$f(z) = 1/z$ is holomorphic on $\\mathbb{C} \\setminus \\{0\\}$, yet $\\oint_{|z| = 1} \\mathrm{d}z/z = 2\\pi i \\ne 0$.\n\nThat hole is the obstruction — its presence makes the winding number detectable.\n\n⭐ Equivalent statement: contour integrals of holomorphic functions are **homotopy invariant** (continuous deformation of the path inside the region leaves the integral unchanged);\n\nsimply connected = every closed curve in the region is homotopic to a point.\n\n⭐ Immediate corollary: a holomorphic function on a simply connected region **has a primitive** (take $F(z) = \\int_{z_0}^{z} f\\,\\mathrm{d}z$, which is path-independent by Cauchy's theorem, and then $F' = f$).\n\nThere is no **clean** counterpart in real analysis: $F(x) = \\log|x|$ is indeed a primitive of $1/x$ on $\\mathbb{R} \\setminus \\{0\\}$ — the difference is that $\\mathbb{R} \\setminus \\{0\\}$ is **disconnected**, so \"path independence\" fails there (the integral around $0$ is nonzero).\n\n⚠ The \"Goursat\" in the name: Cauchy's original 1825 proof required $f'$ to be continuous (via Green's formula);\n\nGoursat later removed this hypothesis by subdividing into triangles.\n\nModern textbooks therefore treat it as the **fundamental theorem of holomorphy**: the conclusion is not bought with a stronger hypothesis.",
        status: 'draft',
        basedOn: 'v0.9.3#0c0f846f',
      },
    },

    'thm.cauchy-integral-formula': {
      statement: {
        en: "**In plain words**: the value of a holomorphic function at an interior point is **completely determined** by its values on the boundary — every interior point \"listens\" to the boundary.\n\nLet $\\Omega$ be a bounded region whose boundary $\\partial\\Omega$ is a piecewise smooth simple closed curve, oriented positively, and $f$ holomorphic on an open set containing $\\overline{\\Omega}$. Then for every $z \\in \\Omega$,\n\n$$f(z) = \\frac{1}{2\\pi i}\\oint_{\\partial\\Omega} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta.$$\n\nMore generally, if $\\gamma$ is a **simple** closed curve in the region and $f$ is holomorphic inside $\\gamma$ and on $\\gamma$, then the formula holds for every point $z$ inside $\\gamma$ (for a general closed curve, write $\\operatorname{Ind}(\\gamma, z)f(z) = \\frac{1}{2\\pi i}\\oint_\\gamma \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta$).",
        status: 'draft',
        basedOn: 'v0.9.3#3dc2e720',
      },
      notes: {
        en: "⭐ **The key is punching a hole**: the integrand $g(\\zeta) = f(\\zeta)/(\\zeta - z)$ is undefined at $\\zeta = z$, so Cauchy's theorem cannot be applied directly to all of $\\Omega$. Fix $z \\in \\Omega$, let $d = \\operatorname{dist}(z, \\partial\\Omega) > 0$, choose $0 < r < d$, remove the closed disk $\\overline{B(z,r)}$ to get the doubly connected region $\\Omega_{r} = \\Omega \\setminus \\overline{B(z,r)}$. $g$ is holomorphic on $\\Omega_{r}$ (the denominator never vanishes), so the multiply connected Cauchy–Goursat theorem (`thm.cauchy-goursat`) gives $\\oint_{\\partial\\Omega_{r}} g\\,\\mathrm{d}\\zeta = 0$. The boundary $\\partial\\Omega_{r}$ consists of the outer boundary $\\partial\\Omega$ (positive) and the inner circle $|\\zeta - z| = r$ (negative); rearranging gives $\\oint_{\\partial\\Omega} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta = \\oint_{|\\zeta - z| = r} \\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta.$.\n\n**Split off the main term**: on the right, write the integrand as $\\frac{f(\\zeta)}{\\zeta - z} = \\frac{f(z)}{\\zeta - z} + \\frac{f(\\zeta) - f(z)}{\\zeta - z}.$. The integral of the first term is computed directly with $\\zeta = z + re^{i\\theta}$: $\\oint_{|\\zeta - z| = r} \\frac{\\mathrm{d}\\zeta}{\\zeta - z} = \\int_{0}^{2\\pi} \\frac{ire^{i\\theta}}{re^{i\\theta}}\\,\\mathrm{d}\\theta = 2\\pi i$, hence contributes $2\\pi i\\,f(z)$.\n\n**The second term vanishes as $r \\to 0$**: $f$ is holomorphic at $z$, so $\\lim_{\\zeta \\to z}\\frac{f(\\zeta) - f(z)}{\\zeta - z} = f'(z)$; in particular there are $M$ and $\\rho > 0$ such that for $|\\zeta - z| < \\rho$ the quotient is bounded by $\\le M$. Hence for $0 < r < \\min(\\rho, d)$, the ML inequality gives $\\left|\\oint_{|\\zeta - z| = r} \\frac{f(\\zeta) - f(z)}{\\zeta - z}\\,\\mathrm{d}\\zeta\\right| \\le M\\cdot 2\\pi r \\longrightarrow 0.$.\n\n**Finish**: the outer integral is independent of $r$ (the identity holds for all $0 < r < d$), so letting $r \\to 0$ gives $\\oint_{\\partial\\Omega}\\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta = 2\\pi i\\,f(z)$, as required. ∎\n\n**General closed curves**: if $\\gamma$ does not enclose $z$, Cauchy's theorem on the region inside $\\gamma$ gives $\\oint_{\\gamma} = 0$; if $\\gamma$ encloses $z$, the same argument on the annulus between the outer boundary and the inner circle gives the form with the winding number $\\operatorname{Ind}(\\gamma, z)\\,f(z) = \\frac{1}{2\\pi i}\\oint_{\\gamma}\\frac{f(\\zeta)}{\\zeta - z}\\,\\mathrm{d}\\zeta$.\n\n⭐ **Hub**: from it follow infinite differentiability, Cauchy's inequalities, Liouville, the maximum modulus principle, Taylor/Laurent expansions, and the residue theorem — almost every result in this galaxy grows from here.\n\n⚠ The integrand $f(\\zeta)/(\\zeta - z)$ is **not** holomorphic at $\\zeta = z$, which is exactly why \"punching a hole\" is not a trick but a necessity.",
        status: 'draft',
        basedOn: 'v0.9.3#78d40f05',
      },
    },

    'def.contour-integral': {
      statement: {
        en: "**In plain words**: cut the path into many small pieces, multiply the value of $f$ at each sample point by the corresponding **complex displacement**, sum and take the limit — that is the integral along this path.\n\nLet $\\gamma: [a, b] \\to \\mathbb{C}$ be piecewise smooth (a parametrized curve) and $f$ continuous on $\\gamma$. Define\n\n$$\\int_\\gamma f(z)\\,\\mathrm{d}z := \\lim_{\\lVert\\Delta\\rVert \\to 0} \\sum_{k=1}^{n} f(\\gamma(\\tau_k))\\,(\\gamma(t_k) - \\gamma(t_{k-1})),$$\n\nwhere $[a, b]$ is any refinement of a partition and $\\tau_k \\in [t_{k-1}, t_k]$ is arbitrary; the limit exists and is independent of the choices. It equals\n\n$$\\int_\\gamma f(z)\\,\\mathrm{d}z = \\int_a^b f(\\gamma(t))\\,\\gamma'(t)\\,\\mathrm{d}t,$$\n\nwhose right-hand side is a complex-valued Riemann integral over the real parameter $t$. Splitting into real and imaginary parts ($f = u + iv$, $z = x + iy$) gives two real line integrals:\n\n$$\\int_\\gamma f\\,\\mathrm{d}z = \\int_\\gamma (u\\,\\mathrm{d}x - v\\,\\mathrm{d}y) + i\\int_\\gamma (v\\,\\mathrm{d}x + u\\,\\mathrm{d}y).$$\n\nWhen $\\gamma$ is a closed curve we write $\\oint_\\gamma$; on the reversed curve $\\gamma^{-1}$ the integral changes sign: $\\int_{\\gamma^{-1}} f\\,\\mathrm{d}z = -\\int_\\gamma f\\,\\mathrm{d}z$.",
        status: 'draft',
        basedOn: 'v0.9.3#34ac3895',
      },
      notes: {
        en: "⭐ That real integral on the right is the whole definition: **a complex contour integral is a complex-valued Riemann integral over the real parameter $t$**.\n\nThus every property of the real integral (linearity, additivity over intervals, the triangle inequality, substitution) carries over automatically.\n\n⭐ The real difference from the real integral is **path dependence**: $\\int_\\gamma f\\,\\mathrm{d}z$ is in general not a function of the endpoints alone.\n\nCauchy's theorem is exactly the statement that \"when the function is holomorphic it suddenly depends only on the endpoints, and vanishes on closed curves\" ($0$).\n\n⭐ The real/imaginary splitting above is the interface to Green's formula: applying Green once to $P = u$, $Q = -v$ and once to $P = v$, $Q = u$ yields the Cauchy–Green identity.",
        status: 'draft',
        basedOn: 'v0.9.3#7d980e94',
      },
    },

    'thm.residue': {
      statement: {
        en: "**In plain words**: the integral along a closed curve equals $2\\pi i$ times the sum of the residues at all singularities inside the curve — a two-dimensional integration problem is compressed into finitely many algebraic computations.\n\nLet $\\Omega$ be a bounded region whose boundary $\\partial\\Omega$ consists of finitely many piecewise smooth simple closed curves, oriented positively. Let $f$ be holomorphic on $\\Omega$ except at finitely many points $z_1, \\cdots, z_n$, all **isolated** singularities not lying on $\\partial\\Omega$; and let $f$ be holomorphic on some **neighbourhood** of $\\overline{\\Omega}$ except at these points. (⚠ The last condition cannot be omitted: saying only \"the singularities are not on the boundary\" is not enough — for example $\\Omega = \\mathbb{D}$, $f = 1/(1-z)$, where $z = 1$ lies on $\\partial\\mathbb{D}$ and $f$ is undefined there, so $\\oint_{\\partial\\Omega} f\\,dz$ does not exist at all.) Then\n\n$$\\oint_{\\partial\\Omega} f(z)\\,\\mathrm{d}z = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}(f, z_k).$$",
        status: 'draft',
        basedOn: 'v0.9.3#9356c036',
      },
      notes: {
        en: "⭐ Proof: around each $z_k$ remove a closed disk of radius $\\varepsilon$ (pairwise disjoint, all contained in $\\Omega$), obtaining $\\Omega_\\varepsilon = \\Omega \\setminus \\bigcup_k \\overline{B(z_k, \\varepsilon)}$.\n\n$f$ is holomorphic on $\\Omega_\\varepsilon$, so the **multiply connected** Cauchy–Goursat theorem gives $\\oint_{\\partial\\Omega_\\varepsilon} f = 0$, that is,\n\n$$\\oint_{\\partial\\Omega} f\\,\\mathrm{d}z = \\sum_{k=1}^{n} \\oint_{|\\zeta - z_k| = \\varepsilon} f\\,\\mathrm{d}\\zeta = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}(f, z_k),$$\n\nThe last step is the definition of the residue.\n\n⭐ This is the hardest-working theorem in complex analysis: the whole batch of real integrals in Chapters 23 and 24 ($\\int_0^{2\\pi} Q(\\sin\\theta, \\cos\\theta)\\,\\mathrm{d}\\theta$, $\\int_{-\\infty}^{\\infty} f(x)\\,\\mathrm{d}x$, $\\int_{-\\infty}^{\\infty} e^{iax}f(x)\\,\\mathrm{d}x$, $\\int_0^{\\infty} x^{a-1}f(x)\\,\\mathrm{d}x$, series sums) rests on it and becomes residue computation.\n\n⚠ The closed curves must be **positively** oriented (counterclockwise);\n\nreversing the orientation changes the overall sign.\n\nSingularities **outside** the curve contribute nothing to the integral — alternatively one may compute with the residue at infinity.",
        status: 'draft',
        basedOn: 'v0.9.3#b6977743',
      },
    },

    'def.mobius': {
      statement: {
        en: "**In plain words**: a fractional linear transformation is the most \"rigid\" class of holomorphic bijections of the Riemann sphere — it sends circles (including lines) to circles and preserves the cross-ratio.\n\nA map of the form\n\n$$f(z) = \\frac{az + b}{cz + d}, \\qquad a, b, c, d \\in \\mathbb{C},\\ ad - bc \\ne 0$$\n\nis called a **fractional linear transformation** (Möbius transformation).\n\nIt extends to a bijection of the Riemann sphere $\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}$ onto itself: when $c \\ne 0$, $f(-d/c) = \\infty$ and $f(\\infty) = a/c$;\n\nwhen $c = 0$, $f(\\infty) = \\infty$.\n\nThe inverse is again a fractional linear transformation:\n\n$$f^{-1}(w) = \\frac{dw - b}{-cw + a}.$$",
        status: 'draft',
        basedOn: 'v0.9.3#3cfe9130',
      },
      notes: {
        en: "⭐ $ad - bc \\ne 0$ is the **nondegeneracy** condition: when it equals $0$, $f$ degenerates to a constant.\n\nIt also guarantees $f'(z) = (ad - bc)/(cz + d)^2 \\ne 0$, so $f$ is **conformal everywhere** (angle-preserving; see the entry on conformality).\n\n⭐ Three basic building blocks: translation $z \\mapsto z + b$, dilation-rotation $z \\mapsto az$ ($a \\ne 0$), inversion $z \\mapsto 1/z$.\n\nEvery Möbius transformation is a composite of these, and $ad - bc \\ne 0$ guarantees that the composite does not collapse to a constant.\n\n⭐ Geometric properties (Chapter 13): it sends **circles or lines** to circles or lines (collectively \"generalized circles\", which on the sphere are simply \"circles\");\n\nand it preserves the **cross-ratio**:\n\n$$(z_1, z_2; z_3, z_4) = \\frac{(z_1 - z_3)(z_2 - z_4)}{(z_1 - z_4)(z_2 - z_3)}.$$\n\nThus $f$ is **uniquely** determined by the images of three points — the cross-ratio is a complete invariant of Möbius transformations.\n\n⚠ The point $\\infty$ on the sphere is not \"a very large number\": it is a point adjoined by stereographic projection.\n\nOnly on the sphere is the statement \"$f$ is a bijection\" clean — on $\\mathbb{C}$ it always misses one or two points.",
        status: 'draft',
        basedOn: 'v0.9.3#38bf42a2',
      },
    },

    'lem.schwarz': {
      statement: {
        en: "**In plain words**: a holomorphic map of the unit disk into itself that fixes the origin must be dominated by $z \\mapsto z$: image points lie closer to the centre than their preimages.\n\nLet $\\mathbb{D} = \\{\\, z : |z| < 1 \\,\\}$, with $f: \\mathbb{D} \\to \\mathbb{D}$ holomorphic and $f(0) = 0$. Then\n\n(1) $|f(z)| \\le |z|$ for all $z \\in \\mathbb{D}$;\n\n(2) $|f'(0)| \\le 1$;\n\n(3) if there is $z_0 \\ne 0$ with $|f(z_0)| = |z_0|$, or if $|f'(0)| = 1$, then $f$ is a rotation $f(z) = e^{i\\theta} z$.",
        status: 'draft',
        basedOn: 'v0.9.3#b3167693',
      },
      notes: {
        en: "⭐ The proof route: $f(0) = 0$ makes $f(z)/z$ have a removable singularity at $0$; filling in $f'(0)$ gives a holomorphic function $g$ on the disk. On $|z| = r$ one has $|g| \\le 1/r$, and the maximum modulus principle followed by $r \\to 1$ gives the result.\n\n⭐ The three conclusions are really one chain of inequalities: $|g(z)| \\le 1$ immediately yields (1) and (2); (3) is \"when equality holds in the maximum modulus principle\".\n\n⚠ $f(0) = 0$ cannot be omitted. $f(z) = (z + 1)/2$ maps the disk to the disk, but $|f(0)| = 1/2 > 0$ — as soon as the origin is moved, the lemma's conclusions all fail.\n\n⚠ Equality in $|f(z)| \\le |z|$ at **a single interior point** already suffices; it need not hold everywhere — this is the rigidity of the maximum modulus principle.\n\n📌 The version without the hypothesis $f(0) = 0$ is the Schwarz–Pick theorem. This lemma is also the source of \"the automorphism group of the disk is small\", and a basic tool in conformal mapping.",
        status: 'draft',
        basedOn: 'v0.9.3#343e9102',
      },
    },

    'thm.weierstrass-convergence': {
      statement: {
        en: "Let $f_{k}$ be holomorphic on a region $\\Omega$ and converge uniformly to $K \\subset \\Omega$ on every compact set $f$. Then\n\n1. $f$ is holomorphic on $\\Omega$;\n2. for every $m \\ge 1$, $f_{k}^{(m)} \\to f^{(m)}$ uniformly on every compact set.",
        status: 'draft',
        basedOn: 'v0.9.3#e1dd5014',
      },
      notes: {
        en: "**Proof of (1)**: holomorphy is tested by `thm.morera`. Take any closed triangle $T$ in $\\Omega$ (with its interior); the integral of each $f_{k}$ along $\\partial T$ vanishes (Cauchy–Goursat). Since $\\partial T$ is compact, uniform convergence lets the integral pass to the limit, so $\\oint_{\\partial T} f = \\lim_{k} \\oint_{\\partial T} f_{k} = 0$. By Morera, $f$ is holomorphic.\n\n**Proof of (2)**: let $K \\subset \\Omega$ be compact and choose $r > 0$ so that the $r$-neighbourhood of $K$ still lies in $\\Omega$. For $z \\in K$, integrate the Cauchy formula for higher derivatives over the circle of radius $r$:\n\n$$\\left|f_{k}^{(m)}(z) - f^{(m)}(z)\\right| \\le \\frac{m!}{r^{m}}\\,\\sup_{|\\zeta - z| \\le r}\\left|f_{k}(\\zeta) - f(\\zeta)\\right|.$$\n\nThe right-hand side is independent of $z$ and tends to $0$ as $k \\to \\infty$, hence the convergence is uniform on $K$. ∎\n\n⭐ **Why this is the foundation of the whole chapter**: it says that holomorphy is **closed** under uniform convergence, so one may safely pass to limits — normal families (`thm.montel`), the Riemann mapping theorem, and Hurwitz's theorem all rely on it to justify that \"the limit function is still holomorphic\".\n\n⚠️ The hypothesis must be **uniform on compact subsets** (uniform on every compact set). With pointwise convergence alone the limit need not be holomorphic and the derivatives need not converge. (Note: $f_k(z) = z^{k}$ is **not** a counterexample — it converges uniformly on compact subsets of $|z| < 1$, and its derivatives converge uniformly to $0$. A genuine counterexample needs compact sets that touch the boundary of convergence.)",
        status: 'draft',
        basedOn: 'v0.9.3#820063f1',
      },
    },

    'thm.max-modulus': {
      statement: {
        en: "**In plain words**: the modulus of a holomorphic function cannot attain a maximum in the interior of a region — unless the function is constant. The maximum can only occur on the boundary.\n\nLet $\\Omega$ be a plane region (a connected open set) and $f$ holomorphic on $\\Omega$. Then either $f$ is constant, or\n\n$$|f(z)| < \\|f\\|_{\\Omega} := \\sup_{\\zeta \\in \\Omega} |f(\\zeta)|, \\qquad \\forall z \\in \\Omega.$$",
        status: 'draft',
        basedOn: 'v0.9.3#9c3dcb0d',
      },
      notes: {
        en: "⭐ The proof uses the **mean value formula**: the Cauchy integral formula at the centre $\\zeta = z + re^{i\\theta}$ gives\n\n$$f(z) = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(z + re^{i\\theta})\\,\\mathrm{d}\\theta$$\n\n(as long as $\\overline{B(z, r)} \\subset \\Omega$).\n\nIf $|f|$ attains its maximum $M$ at an **interior** point $z_0$, then $M = |f(z_0)| \\le \\frac{1}{2\\pi}\\int_0^{2\\pi} |f(z_0 + re^{i\\theta})|\\,\\mathrm{d}\\theta \\le M$; equality at both ends forces $|f| \\equiv M$ on the circle.\n\n⭐ By connectedness: the set $\\{ z : |f(z)| = M \\}$ is both open (a whole circle around every point) and closed ($|f|$ is continuous), hence is all of $\\Omega$;\n\nso $|f|$ is constant, and adding the holomorphic $f$ gives that $f$ is constant.\n\n⭐ Corollary for bounded regions: if $\\Omega$ is bounded, $f$ is continuous on $\\overline{\\Omega}$ and holomorphic on $\\Omega$, then $\\|f\\|_{\\overline{\\Omega}} = \\|f\\|_{\\partial\\Omega}$ — the maximum is attained on the boundary.\n\nThis is the strongest form of \"control the interior by boundary values\".\n\n⚠ There is no analogue for the **minimum** of $|f|$: $f(z) = z$ attains its minimum on the unit disk at $0$ (an interior point).\n\nThe correct minimum modulus principle: if $f$ is holomorphic and **nowhere zero**, apply the maximum modulus principle to $1/f$.",
        status: 'draft',
        basedOn: 'v0.9.3#266783db',
      },
    },

    'thm.rouche': {
      statement: {
        en: "**In plain words**: if on the boundary of a closed curve the modulus of a \"perturbation term\" is strictly smaller than the modulus of a \"main term\", then adding the perturbation does not change the number of zeros inside the curve.\n\nLet $\\gamma$ be a **positively oriented, simple** piecewise smooth closed curve (counterclockwise, no self-intersection), let $f, g$ be holomorphic on $\\gamma$ and its interior, and suppose that everywhere on $\\gamma$\n\n$$|g(z)| < |f(z)|.$$\n\nThen $f$ and $f + g$ have the same number of zeros inside $\\gamma$ (both counted with multiplicity).",
        status: 'draft',
        basedOn: 'v0.9.3#b23c23ac',
      },
      notes: {
        en: "⭐ Use: count zeros without solving equations — just compare sizes on the boundary.\n\nExample: $f(z) = -5z^3$, $g(z) = z^7 + z - 2$; on $|z| = 1$ we have $|g| \\le 1 + 1 + 2 = 4 < 5 = |f|$, so $z^7 - 5z^3 + z - 2$ has exactly $3$ zeros in $|z| < 1$ (the same as $-5z^3$).\n\n⭐ Another proof of the fundamental theorem of algebra: $f(z) = a_n z^n$, $g(z) = a_{n-1}z^{n-1} + \\cdots + a_0$; on $|z| = R$ with $R$ large enough one has $|g| < |f|$, so $p$ and $a_n z^n$ have the same number of zeros in $|z| < R$, namely $n$.\n\n⚠ The inequality must be **strict** and must hold on the **whole boundary**. Equality is exactly where things can break: $f = z$, $g = -z$ on $|z| = 1$ satisfy $|g| = |f|$, yet $f$ and $f + g = 0$ have completely different numbers of zeros.\n\n📌 How to choose the \"main term\": take the term with the largest modulus on the boundary. This is the same fact as \"the behaviour of a polynomial at infinity is governed by its leading term\".\n\n⚠ **\"Simple\" cannot be dropped**: the assertion is about the number of zeros inside (unweighted). For a general closed curve the correct statement is weighted by the winding number — by the argument principle $\\dfrac{1}{2\\pi i}\\oint f'/f$ is always a weighted sum, and the two sides agree only when the winding number at every interior point is $= 1$ (see the notes to `thm.argument-principle`).",
        status: 'draft',
        basedOn: 'v0.9.3#a3fac96f',
      },
    },

    'thm.argument-principle': {
      statement: {
        en: "**In plain words**: the number of turns made by a holomorphic function along a closed curve equals the number of zeros minus the number of poles inside the curve (both counted with multiplicity) — counting the change of argument is the same as counting zeros and poles.\n\nLet $\\gamma$ be a **positively oriented, simple** piecewise smooth closed curve (counterclockwise, no self-intersection), let $\\Omega$ contain $\\gamma$ and its interior, let $f$ be holomorphic on $\\Omega$ except at finitely many poles, and suppose $\\gamma$ contains neither zeros nor poles. Then\n\n$$\\frac{1}{2\\pi i}\\oint_{\\gamma} \\frac{f'(z)}{f(z)}\\,\\mathrm{d}z = Z - P = n(f \\circ \\gamma,\\, 0),$$\n\nwhere $Z$ is the number of zeros of $f$ inside $\\gamma$ (counted with multiplicity), $P$ is the number of poles (counted with order), and $n$ is the winding number.",
        status: 'draft',
        basedOn: 'v0.9.3#61c651a4',
      },
      notes: {
        en: "⭐ The most common special case: when $f$ is **holomorphic** inside, $P = 0$ and hence $\\oint_{\\gamma} f'/f = 2\\pi i Z$ — \"the number of zeros\" becomes an integral.\n\n⭐ Geometric reading: $f \\circ \\gamma$ is a closed curve around $0$, and $Z - P$ is the number of times it winds around $0$. Zeros twist the image curve one turn outward, poles one turn inward.\n\n⚠ There must be no zeros or poles on the boundary — otherwise $f'/f$ is undefined on $\\gamma$ and the integral does not exist at all.\n\n⭐ A by-product: $Z - P$ is **invariant** under small deformations of the curve (as long as no zero or pole is swept), because it is an integer and varies continuously.\n\n📌 Every technique for \"counting zeros\" (Rouché, Hurwitz) starts from this identity; it also explains why zeros and poles can cancel each other at the level of integrals.\n\n⚠ **\"Simple\" cannot be dropped**: the assertion is the unweighted $Z - P$, valid only for **positively oriented simple** closed curves. For a general closed curve the correct form is weighted by winding numbers: $\\dfrac{1}{2\\pi i}\\oint_{\\gamma}\\dfrac{f'}{f} = \\sum_k m_k\\,n(\\gamma, a_k) - \\sum_j n_j\\,n(\\gamma, b_j)$ (where $a_k$ are zeros, $b_j$ poles, $n$ the winding number; see `def.winding-number` / `prop.winding-integral`) — the right-hand side $n(f\\circ\\gamma, 0)$ is always a **weighted** quantity, so the two sides agree only when the winding number at every interior point is $=1$, in which case both equal $Z - P$.",
        status: 'draft',
        basedOn: 'v0.9.3#a0120106',
      },
    },

    'thm.convergence-radius': {
      statement: {
        en: "Let $\\sum a_n (x - x_0)^{n}$ be a power series and put (with the conventions $1/0 = +\\infty$, $1/{+\\infty} = 0$)\n\n$$R := \\frac{1}{\\limsup_{n \\to \\infty} \\sqrt[n]{|a_n|}}$$\n\nThen: for $|x - x_0| < R$ the series **converges absolutely**; for $|x - x_0| > R$ it **diverges**; for $|x - x_0| = R$ there is **no conclusion**.",
        status: 'draft',
        basedOn: 'v0.9.3#a0d73c51',
      },
      notes: {
        en: "⭐ $R$ is called the **radius of convergence**, $(x_0 - R, x_0 + R)$ the interval of convergence.\n\nThe proof is just the **root test** applied to the coefficients: $\\limsup \\sqrt[n]{|a_n (x - x_0)^{n}|} = |x - x_0| \\cdot \\limsup \\sqrt[n]{|a_n|}$.\n\n⚠ One must use $\\limsup$ here, not $\\lim$: $\\sqrt[n]{|a_n|}$ need not converge.\n\n⚠ At $|x - x_0| = R$ all three behaviours can occur ($\\sum x^{n}$ diverges at both ends, $\\sum x^{n}/n$ converges at one end and diverges at the other, $\\sum x^{n}/n^{2}$ converges at both ends).",
        status: 'draft',
        basedOn: 'v0.9.3#9870cbe9',
      },
    },

    'thm.real-ordered-field': {
      statement: {
        en: "The $(\\mathbb{R}, +, \\cdot, \\le)$ constructed above satisfies three groups of properties:\n\n**(i) Field axioms**: $(\\mathbb{R}, +, \\cdot)$ is a field — closed under addition, subtraction, multiplication and division (by nonzero elements), with associative, commutative and distributive laws;\n\n**(ii) Order axioms**: $\\le$ is a total order compatible with the operations:\n$$a \\le b \\implies a + c \\le b + c, \\qquad a \\le b,\\ 0 \\le c \\implies ac \\le bc$$\n\n**(iii) Completeness (least upper bound principle)**: **every nonempty subset of $\\mathbb{R}$ that is bounded above has a least upper bound**.\n\nMoreover the embedded image of $\\mathbb{Q}$ is **dense** in $\\mathbb{R}$.",
        status: 'draft',
        basedOn: 'v0.9.3#65eb0f17',
      },
      notes: {
        en: "⚠ **Note where this statement sits**: it is a **theorem**, not a definition — first comes the construction (\"the real number system $\\mathbb{R}$\"), then the proof that what was constructed has these three groups of properties.\n\n⭐ **Item (iii) is the engine of analysis**: without it $\\mathbb{Q}$ also satisfies the first two items, but $\\{ x \\in \\mathbb{Q} : x^2 < 2 \\}$ has no least upper bound in $\\mathbb{Q}$.\n\n($\\mathbb{Q}$ is therefore not a complete ordered field — this is not a defect, but precisely the reason to complete $\\mathbb{Q}$ into $\\mathbb{R}$.)\n\nFrom (iii) follow the two most-used facts in analysis:\n- **monotone bounded sequences converge**;\n\n- **the nested interval theorem**, **Bolzano–Weierstrass**, and **convergence of Cauchy sequences**.\n\n⚠ Completeness says \"**a least upper bound exists**\", not \"a limit necessarily exists\" — the latter is a corollary.\n\n📌 The route to (iii) has two steps (see the proof on the edge): first prove that **every Cauchy sequence in $\\mathbb{R}$ converges** (extract a rational Cauchy sequence from the representatives by a diagonal argument), then derive the least upper bound principle from Cauchy completeness (bisection produces an increasing sequence and a decreasing sequence of upper bounds, squeezed to the same limit).\n\n📌 Properties derived from these three items and used everywhere later: the **Archimedean property** and the **density of $\\mathbb{Q}$ in $\\mathbb{R}$** (see the entry on the Archimedean property);\n\n$\\mathbb{R}$ is also **uncountable** ($\\#\\mathbb{R} = 2^{\\aleph_0}$) — \"dense\" and \"equinumerous\" are two different things.",
        status: 'draft',
        basedOn: 'v0.9.3#3930fe25',
      },
    },

    'thm.baire': {
      statement: {
        en: "Let $X$ be a complete metric space (or a locally compact Hausdorff space). Then the intersection of countably many dense open sets is still **dense**. Equivalently:\n\n1. the union of countably many nowhere dense closed sets has empty interior;\n2. every nonempty open set is of the **second category**.",
        status: 'draft',
        basedOn: 'v0.9.3#e1e853ed',
      },
      notes: {
        en: "Proof (nested balls), four steps:\n\n1. **Start**: write $B_0 := B(x, \\varepsilon)$.\n\n$O_1$ dense open $\\implies$ $B_0 \\cap O_1$ is nonempty open, so choose $x_1$ and $\\varepsilon_1 < \\min(\\varepsilon/2,\\ 1)$ with\n\n$$\\overline{B(x_1, \\varepsilon_1)} \\subseteq B(x, \\varepsilon) \\cap O_1 .$$\n\n2. **Induction**: suppose $x_n, \\varepsilon_n$ have been chosen (with $\\varepsilon_n < 1/n$).\n\nSince $O_{n+1}$ is dense open, $B(x_n, \\varepsilon_n) \\cap O_{n+1}$ is still nonempty open; choose\n\n$$\\overline{B(x_{n+1}, \\varepsilon_{n+1})} \\subseteq B(x_n, \\varepsilon_n) \\cap O_{n+1}, \\qquad \\varepsilon_{n+1} < \\frac{1}{n+1} .$$\n\n3. **Pick a point in the nested closed balls**: radius $\\varepsilon_n \\to 0$, and $X$ is complete, so $\\bigcap_n \\overline{B(x_n, \\varepsilon_n)} \\ne \\emptyset$; take a point $y$ in it.\n\n(Here \"the radii tend to $0$\" cannot be dropped: completeness only guarantees a common point for nested closed balls whose radii tend to $0$.)\n\n4. **Finish**: for every $n$, $y \\in \\overline{B(x_n, \\varepsilon_n)} \\subseteq B_0 \\cap O_n$, so $y \\in B_0$ and $y \\in \\bigcap_n O_n$.\n\n$B_0$ was arbitrary, so $\\bigcap_n O_n$ meets every nonempty open set, hence is dense.\n\n∎\n\n⭐ All three equivalent formulations should be usable; passing between them is just taking complements.\n\n⚠️ Completeness cannot be dropped: in $\\mathbb{Q}$ every singleton is closed and nowhere dense, and $\\mathbb{Q}$ is countable, so $\\mathbb{Q}$ is of the first category — it is not a Baire space.\n\n**Which hypothesis each direction uses** (the translations between the three formulations are free; their validity rests on Baire's theorem):\n- Countable intersection of dense open sets is dense $\\iff$ countable union of nowhere dense closed sets has empty interior: take complements; holds in any topological space, no completeness needed.\n- The closed nowhere dense formulation $\\iff$ every nonempty open set is not of the first category in the whole space: replace each nowhere dense set by its closure and unwind the definition of first category.\n- Complete metric space $\\implies$ the above properties: recursively choose nested closed balls with radii tending to zero and use completeness to get a common point; in the usual foundational setting this recursion uses dependent choice.\n- The locally compact Hausdorff version replaces completeness by nested compact neighbourhoods and compactness. A metric space alone is not enough: $\\mathbb Q$ is a countable union of nowhere dense singletons; but completeness is sufficient, not necessary, for the Baire property.",
        status: 'draft',
        basedOn: 'v0.9.3#067d011c',
      },
    },

    'thm.lagrange': {
      statement: {
        en: "Let $G$ be a finite group and $H \\le G$. For $g \\in G$ write the **left coset** $gH := \\{\\, gh : h \\in H \\,\\}$. Then the left cosets form a partition of $G$, each left coset is equinumerous with $H$, hence\n\n$$|G| = [G : H] \\cdot |H|, \\qquad |H| \\mid |G|$$\n\nwhere $[G : H] := |G|/|H|$ is called the **index** of $H$ in $G$.",
        status: 'draft',
        basedOn: 'v0.9.3#64135c2e',
      },
      notes: {
        en: "⭐ The proof is two sentences: **cosets form a partition** ($g_1 H \\cap g_2 H \\ne \\emptyset \\implies g_1 H = g_2 H$, using that $H$ is closed under multiplication) + **translation is a bijection** ($h \\mapsto gh$ is a bijection $H \\to gH$).\n\nThe full proof is on the edge.\n\n⭐ Three immediate corollaries:\n- the order of every element $g$ divides $|G|$ (take $\\langle g\\rangle$ as $H$);\n\n- a group of prime order is cyclic (take any non-identity element; its order is either $1$ or $p$);\n\n- $g^{|G|} = e$ holds for every $g$ — so Euler's theorem $a^{\\varphi(n)} \\equiv 1 \\pmod n$ is a special case (take $G = (\\mathbb{Z}/n)^{\\times}$).\n\n⚠ **The converse fails**: \"$d \\mid |G|$ $\\implies$ has a subgroup of order $d$\" is **false**.\n\nSmallest counterexample: $|A_4| = 12$, $6 \\mid 12$, yet $A_4$ has no subgroup of order $6$ (a subgroup of order $6$ would have index $2$ and hence be normal, while the only normal subgroups of $A_4$ are $V_4$ and $A_4$).\n\nSo divisibility is only a necessary condition — a partial converse requires Sylow's theorem.",
        status: 'draft',
        basedOn: 'v0.9.3#a3083983',
      },
    },

    'thm.factor-theorem': {
      statement: {
        en: "Let $f \\in K[x]$, $a \\in K$. Then\n\n$$f(a) = 0 \\iff (x - a) \\text{ divides } f \\ \\text{ in } K[x]$$\n\nThat is: there exists $h \\in K[x]$ with $f = (x - a)\\,h$. In this case $a$ is called a **root** (zero) of $f$.",
        status: 'draft',
        basedOn: 'v0.9.3#4918315c',
      },
      notes: {
        en: "⭐ The proof is two lines: divide $f$ by $(x - a)$ ($x - a$ is monic, so division with remainder applies); the remainder $r$ has degree $< 1$, so $r$ is a constant; substituting $x = a$ gives $f(a) = r$.\n\nSo \"the remainder\" is exactly \"the value of the function\".\n\n⭐ This immediately gives **that the number of roots does not exceed the degree** (next entry), and \"a linear polynomial always has a root\".\n\n⚠ $a$ must be an element of $K$: $x^{2} + 1$ has no root in $\\mathbb{R}$, but of course it is not divisible by $(x - a)$ ($a \\in \\mathbb{R}$).\n\nThe **existence** of roots depends on $K$ — that is precisely what the fundamental theorem of algebra addresses.",
        status: 'draft',
        basedOn: 'v0.9.3#b09f507b',
      },
    },

    'thm.inverse-function': {
      statement: {
        en: "Let $U \\subseteq \\mathbb{R}^{n}$ be open, $f : U \\to \\mathbb{R}^{n}$ of class $C^{1}$, $a \\in U$ with $Df(a)$ **invertible**.\n\nThen there exist an open neighbourhood $V \\subseteq U$ of $a$ and an open neighbourhood $W$ of $f(a)$ such that the restriction $f\\bigl|_{V}$ is a **bijection** $V \\to W$,\n\n$$f\\bigl|_{V} : V \\to W \\quad \\text{bijective},$$\n\nand its inverse $g := (f\\bigl|_{V})^{-1} : W \\to V$ is also $C^{1}$, and for every $y \\in W$\n\n$$Dg(y) = \\bigl( Df(g(y)) \\bigr)^{-1}$$",
        status: 'draft',
        basedOn: 'v0.9.3#15a84bd0',
      },
      notes: {
        en: "⭐ The shape of the theorem is worth remembering: **locally invertible $\\iff$ $Df(a)$ invertible**, and \"the derivative of the inverse is the inverse of the derivative\".\n\nThe second half is pure linear algebra — once $f$ is viewed locally as \"a linear map plus higher-order terms\", inversion naturally lands on $Df$.\n\n⚠ \"Locally\" cannot be dropped.\n\nFor $f(x, y) = (e^{x}\\cos y,\\ e^{x}\\sin y)$, $\\det Df = e^{2x} \\ne 0$ holds everywhere, yet $f$ is far from injective globally ($y$ has period $2\\pi$).\n\n⚠ The theorem guarantees only $C^{1}$;\n\nbut from $Dg = (Df \\circ g)^{-1}$ it follows at once: $f$ smooth $\\implies$ $g$ smooth ($Df\\circ g$ smooth, and inversion is a smooth operation).\n\nThis is \"$f$ is a diffeomorphism $\\implies$ $f^{-1}$ is too\".\n\n⭐ The theorem also shows that $f$ is an **open map** (it sends the open set $V$ to the open set $W$) — this is **free** in both finite dimensions and Banach spaces (the inverse function theorem itself gives a local homeomorphism, and a local homeomorphism automatically sends open sets to open sets). ⚠ Do not confuse this with the **open mapping theorem** of functional analysis: that one says a surjective bounded linear operator is open, a different notion sharing the name with \"a nonconstant holomorphic function is open\".\n\n⚠ It belongs to the same family as `thm.regular-value` and `cor.rank-theorem`: the rank theorem says \"a constant-rank map locally has only a standard form\", and the inverse function theorem is the case $r = n = m$.\n\nThe full proof is on the edge (reduce to $Df(a) = I$, build a local inverse of $f$ by the contraction mapping principle, then solve for $Dg$ from $f \\circ g = \\mathrm{id}$).",
        status: 'draft',
        basedOn: 'v0.9.3#37b62d26',
      },
    },

    'thm.implicit-function': {
      statement: {
        en: "Let $U \\subseteq \\mathbb{R}^{n} \\times \\mathbb{R}^{m}$ be open, $F : U \\to \\mathbb{R}^{m}$ of class $C^{1}$, $(a, b) \\in U$ with $F(a, b) = 0$, and $D_y F(a, b)$ **invertible**:\n\n$$F(a, b) = 0, \\qquad D_y F(a, b) \\in M_m(\\mathbb{R})\\ \\text{invertible}$$\n\n($D_y F$ denotes the matrix of partial derivatives with respect to the last $m$ variables.) Then there exist an open neighbourhood $V \\subseteq \\mathbb{R}^{n}$ of $a$, an open neighbourhood $W \\subseteq \\mathbb{R}^{m}$ of $b$, and a **unique** $C^{1}$ map $g : V \\to W$ such that\n\n$$g(a) = b, \\qquad F\\bigl(x,\\ g(x)\\bigr) = 0 \\quad (x \\in V)$$\n\nand\n\n$$Dg(x) = - \\bigl( D_y F(x, g(x)) \\bigr)^{-1} D_x F(x, g(x))$$",
        status: 'draft',
        basedOn: 'v0.9.3#7c56a6d3',
      },
      notes: {
        en: "⭐ In one sentence: **the equation $F(x, y) = 0$ can be solved uniquely for $y = g(x)$ where $D_yF$ is invertible, and the resulting map is automatically $C^{1}$**.\n\nThat is the entire content of the name \"implicit function\" — it turns \"implicitly determined by an equation\" into \"a function really exists\".\n\n⭐ It is the **inverse function theorem in disguise**: assemble $F$ into $\\Phi(x, y) := (x, F(x, y))$; then $D\\Phi$ is block upper triangular, $\\det D\\Phi = \\det D_y F$, so invertibility is equivalent;\n\nand the inverse of $\\Phi$ must have the form $(x, y) \\mapsto (x, h(x, y))$; setting $g(x) := h(x, 0)$ gives the desired implicit function.\n\nThe two theorems are two ways of saying the same thing.\n\n⚠ The invertibility of $D_yF$ is **essential**: for $F(x, y) = x^{2} - y^{2}$ at $(0,0)$, $D_yF = 0$, and the equation $x^{2} = y^{2}$ cannot be solved uniquely for $y = g(x)$ near the origin (there are two branches $y = \\pm x$).\n\n⭐ The formula for $Dg$ need not be memorized: differentiate $F(x, g(x)) = 0$ on both sides and use the chain rule — $D_xF + D_yF \\cdot Dg = 0$, then solve for $Dg$.\n\nThe full proof is on the edge.",
        status: 'draft',
        basedOn: 'v0.9.3#91f87be7',
      },
    },

    'thm.structure-equations': {
      statement: {
        en: "**In plain words**: **these two equations govern how the frame moves**. The first (zero torsion) says \"the change of the coframe is completely determined by the connection forms, with no extra twist\"; the second ($\\mathbb{R}^{3}$ is flat) says \"rotating once in each of two directions gives the same result regardless of order\". Together they express $\\mathrm{d}^{2} = 0$ in a frame.\n\nLet $\\omega^{i}$ be the dual coframe ($\\mathrm{d}r = \\sum_{i}\\omega^{i}e_{i}$) and $\\omega^{i}_{\\ j}$ the connection forms. Then\n\n**First structure equation** (zero torsion)\n\n$$\\mathrm{d}\\omega^{i} = \\sum_{j}\\omega^{j}\\wedge\\omega^{i}_{\\ j} ;$$\n\n**Second structure equation** ($\\mathbb{R}^{3}$ flat)\n\n$$\\mathrm{d}\\omega^{i}_{\\ j}+\\sum_{k}\\omega^{i}_{\\ k}\\wedge\\omega^{k}_{\\ j} = 0 ,\\qquad \\mathrm{d}\\omega^{i}_{\\ j} = \\sum_{k}\\omega^{k}_{\\ j}\\wedge\\omega^{i}_{\\ k}.$$\n\nTogether they express $\\mathrm{d}^{2}=0$ on the frame: applying the exterior derivative to $\\mathrm{d}r$ gives the first equation, and to $\\mathrm{d}e_{i}$ gives the second.",
        status: 'draft',
        basedOn: 'v0.9.3#bfd58c6b',
      },
      notes: {
        en: "**Why \"structure\"**: these two equations determine all constraints on \"how the frame moves\". Given the coframe and the connection, the shape of the surface together with its position in $\\mathbb{R}^{3}$ is determined; conversely the only compatibility to check is $\\mathrm{d}^{2}=0$. The fundamental theorem of surface theory turns this sentence into a theorem.\n\n**Curvature form**: on a general manifold the right-hand side of the second equation is nonzero; that term is called the curvature form $\\Omega^{i}_{\\ j} := \\mathrm{d}\\omega^{i}_{\\ j}+\\sum_{k}\\omega^{i}_{\\ k}\\wedge\\omega^{k}_{\\ j}$;\n\non $\\mathbb{R}^{3}$, $\\Omega \\equiv 0$.\n\nRestricted to a surface it becomes $\\Omega^{i}_{\\ j} = \\omega^{i}_{\\ 3}\\wedge\\omega^{j}_{\\ 3}$ — this is the Gauss equation.\n\nThe same thing can be written as \"the mixed partial derivatives of $r_{ij} = \\Gamma^{k}_{\\ ij}r_{k}+h_{ij}n$ and $n_{i} = -h^{j}_{\\ i}r_{j}$ commute (integrability condition)\". Here one only replaces \"mixed partial derivatives\" by $\\mathrm{d}^{2}=0$ and $\\Gamma$ by $\\omega$: the same compatibility, in shorter notation.\n\n⚠️ **Sign convention**: this pack takes $\\omega^{j}_{\\ i} = \\langle \\mathrm{d}e_{i}, e_{j}\\rangle$, i.e. $\\mathrm{d}e_{i} = \\sum_{j}\\omega^{j}_{\\ i}e_{j}$. Moving an index up or down flips the sign of the whole second equation; align this before quoting.",
        status: 'draft',
        basedOn: 'v0.9.3#bd8918ef',
      },
    },

    'def.norm': {
      statement: {
        en: "Let $E$ be a vector space over $\\mathbb{K}$ ($\\mathbb{K} = \\mathbb{R}$ or $\\mathbb{C}$). A function $\\|\\cdot\\| : E \\to [0, +\\infty)$ is called a **norm** if\n\n1. $\\|x\\| = 0 \\iff x = 0$;\n2. $\\|\\lambda x\\| = |\\lambda|\\,\\|x\\|$;\n3. $\\|x + y\\| \\le \\|x\\| + \\|y\\|$.\n\nA space equipped with a norm is a **normed space**. One satisfying only 2 and 3 (allowing nonzero elements to have zero norm) is a **seminorm**.",
        status: 'draft',
        basedOn: 'v0.9.3#3ac74b39',
      },
      notes: {
        en: "What a norm has beyond a distance is **linearity**: it records only \"how far from the origin\", and distances are obtained by translation (see \"the distance induced by a norm\"). So a normed space is a metric space \"with an origin, a scale, and translation invariance\".\n\n⚠️ A seminorm is not a norm: one must pass to the quotient by the zero-norm subspace to get a norm (in the construction of $L^p$, \"$\\|f\\|_p = 0$ only says $f = 0$ a.e.\" is exactly this; see \"the $L^p$ norm\").\n\n**Which hypothesis each direction uses** (the equivalences among the norm axioms and the facts derived from them must be kept separate):\n- **Norm** $\\iff$ **the three axioms**: both directions are expansions of the definition, and neither completeness nor finite dimension is needed.\n- $x=0\\implies\\|x\\|=0$: follows by taking the scalar to be zero in absolute homogeneity; the converse is the positive-definiteness axiom and cannot be derived from homogeneity and the triangle inequality.\n- Seminorm $\\implies$ norm holds only when the zero space is trivial; the zero function on a nontrivial space is a counterexample. Well-definedness of the norm on the quotient by the zero space uses the triangle inequality, not the axiom of choice.\n\n📌 **Normed space** is defined in `def.normed-space`.",
        status: 'draft',
        basedOn: 'v0.9.3#62e48f61',
      },
    },

    'def.banach-space': {
      statement: {
        en: "A normed space $V$ is **complete** iff it is complete with respect to the metric $d(v, w) = \\|v - w\\|$, i.e. every Cauchy sequence converges. A complete normed space is a **Banach space**.",
        status: 'draft',
        basedOn: 'v0.9.3#ddbf3c4a',
      },
      notes: {
        en: "⭐ Three standard examples: $\\mathbb{R}^{n}$ (completeness is the finite-dimensional version of `thm.real-complete-metric`), $L^{p}$ (`thm.lp-banach`, Riesz–Fischer), and $C(S)$ on a compact Hausdorff space with the sup norm.\n\n⚠ Completeness is not automatic: $C[0, 1]$ with $\\|f\\|_{1} = \\int_0^1 |f|$ is **not** complete (one can approximate a discontinuous function).\n\nThe same set of functions is complete under one norm and incomplete under another — \"complete\" is a property of the norm, not of the set.\n\n⭐ Completeness is the engine of the contraction mapping principle below (`thm.banach-fixed-point`): without it one only gets a Cauchy sequence, not a fixed point.\n\nThe whole constructive proof of the inverse function theorem rests on this.",
        status: 'draft',
        basedOn: 'v0.9.3#e7c5b49d',
      },
    },

    'thm.int-division': {
      statement: {
        en: "Let $a, b \\in \\mathbb{Z}$ with $b \\ne 0$. Then there exist **unique** $q, r \\in \\mathbb{Z}$ such that\n\n$$a = qb + r, \\qquad 0 \\le r < |b| .$$\n\n$q$ is called the **quotient** and $r$ the **remainder**.",
        status: 'draft',
        basedOn: 'v0.9.3#26e6a9ce',
      },
      notes: {
        en: "Uniqueness: if $a = qb + r = q'b + r'$, then $(q - q')b = r' - r$, hence $|b| \\mid |r' - r|$; but $|r' - r| < |b|$, so necessarily $r' = r$, and then $q' = q$.\n\nExistence uses the well-ordering of $\\mathbb{Z}$: fix $b > 0$; the set $\\{\\, a - qb : q \\in \\mathbb{Z},\\ a - qb \\ge 0 \\,\\}$ is nonempty (Archimedean property), and its least element is $r$; if $r \\ge b$ then $r - b$ is smaller, a contradiction.\n\nThe corresponding theorem on $K[x]$ is `thm.division-algorithm`: the same proof structure, only \"degree\" is replaced by \"absolute value\" — both are Euclidean domains.",
        status: 'draft',
        basedOn: 'v0.9.3#c9ab3c4c',
      },
    },

    'thm.division-algorithm': {
      statement: {
        en: "Let $K$ be a field, $f, g \\in K[x]$, $g \\ne 0$. Then there exist **unique** $q, r \\in K[x]$ such that\n\n$$f = q\\,g + r, \\qquad \\deg r < \\deg g$$\n\n($r$ is called the **remainder**, $q$ the **quotient**; $r = 0$ is allowed.)\n\nConsequently $K[x]$ is a **Euclidean domain**: there is a Euclidean function \"degree\" satisfying $\\deg r < \\deg g$.",
        status: 'draft',
        basedOn: 'v0.9.3#443bcab8',
      },
      notes: {
        en: "⭐ \"$K$ is a field\" cannot be dropped: over the ring $\\mathbb{Z}[x]$ there is no division with remainder ($x^{2}$ divided by $2x + 1$ does not produce a polynomial quotient).\n\nIts role is to guarantee that the **leading coefficient is invertible**, so that the highest-degree term can be eliminated.\n\n⭐ The consequences are far-reaching: division with remainder gives the **Euclidean algorithm** (for the gcd), hence **Bézout's identity** ($af + bg = \\gcd$), hence \"irreducible $\\implies$ prime\", hence **unique factorization** (`thm.poly-ufd`).\n\nEuclidean domains are the \"everything works\" class of rings.\n\n⚠ Uniqueness uses comparison of degrees, not \"uniqueness of the division procedure\" — the choices at each step of the division are not unique, but the final quotient and remainder are.",
        status: 'draft',
        basedOn: 'v0.9.3#902b9473',
      },
    },

    'thm.nth-root': {
      statement: {
        en: "Let $K$ be a complete ordered field (e.g. $\\mathbb{R}$), $a > 0$, $n \\ge 1$. Then there exists a **unique** $b > 0$ such that\n\n$$b^{n} = a;$$\n\nWrite $b = \\sqrt[n]{a} = a^{1/n}$. Moreover:\n\n- $a \\mapsto \\sqrt[n]{a}$ is strictly increasing on $(0, +\\infty)$;\n- $\\sqrt[n]{ab} = \\sqrt[n]{a}\\,\\sqrt[n]{b}$, $\\sqrt[n]{a^{m}} = \\left(\\sqrt[n]{a}\\right)^{m}$ ($m \\in \\mathbb{Z}$).",
        status: 'draft',
        basedOn: 'v0.9.3#c9db4cad',
      },
      notes: {
        en: "⭐ $n = 2$, $a = 2$ is exactly the **existence of $\\sqrt{2}$**: $\\{q \\in \\mathbb{Q} : q^{2} < 2\\}$ has no least upper bound in $\\mathbb{Q}$, but does in $\\mathbb{R}$ — that least upper bound is $\\sqrt{2}$.\n\nSo this theorem is the first concrete construction of \"what $\\mathbb{R}$ has beyond $\\mathbb{Q}$\".\n\n⭐ The proof is a **template for the least upper bound principle**: let $S = \\{t \\ge 0 : t^{n} \\le a\\}$, take $b = \\sup S$, then prove $b^{n} = a$ (neither inequality may be strict: if too small, raise a little; if too large, lower a little).\n\n⚠ The two estimates go in opposite directions: raising uses the **binomial theorem** (**one cannot keep only the first-order term**: from the binomial expansion $ (b+h)^{n} - b^{n} = h\\sum_{k\\ge1}\\binom{n}{k} b^{n-k} $, take $0 < h \\le 1$ and then make $h$ small enough), while lowering uses **Bernoulli** ($(1 - h/b)^{n} \\ge 1 - nh/b$).\n\nThis is where `thm.binomial` and `thm.bernoulli` are first genuinely used in the graph.\n\n⚠ Uniqueness rests on **strict monotonicity**: $0 \\le u < v \\implies u^{n} < v^{n}$ (factorization $v^{n} - u^{n} = (v-u)(v^{n-1} + \\cdots + u^{n-1}) > 0$).",
        status: 'draft',
        basedOn: 'v0.9.3#b233302a',
      },
    },

    'thm.mean-value-multi': {
      statement: {
        en: "**Mean value theorem**: let $f : U \\to \\mathbb{R}$ be differentiable on the open set $U \\subseteq \\mathbb{R}^{n}$, with $a, a + h \\in U$ and the segment $[a, a+h] \\subset U$. Then there exists $\\theta \\in (0, 1)$ such that\n\n$$f(a + h) - f(a) = Df(a + \\theta h)(h)$$\n\n**Mean value inequality**: if $f : U \\to \\mathbb{R}^{m}$ is differentiable, then\n\n$$\\|f(a + h) - f(a)\\| \\le \\Bigl( \\sup_{[a, a+h]} \\|Df\\| \\Bigr) \\|h\\|$$",
        status: 'draft',
        basedOn: 'v0.9.3#e94a7fbd',
      },
      notes: {
        en: "⭐ The one-dimensional mean value theorem rests on Rolle, and Rolle on \"a continuous function on a closed interval attains its extrema\" — and **multivariable calculus has no such thing** (the equality version is **false** for $\\mathbb{R}^{m}$-valued functions: $f(t) = (\\cos t, \\sin t)$ goes once around a circle, $f(2\\pi) - f(0) = 0$, yet $Df$ is nowhere zero and $\\|Df\\| = 1$).\n\n⭐ So what is really useful in several variables is the **inequality version**: it needs only \"apply the one-variable mean value theorem along a line segment + estimate the norm\", and no existence of extrema.\n\nThe contraction mapping principle and the inverse function theorem later use nothing but this.\n\n⚠ In the scalar case ($f$ has values in $\\mathbb{R}$) the equality version needs care: the usual proof applies the one-dimensional MVT to $\\varphi(t) = f(a + th)$ and yields \"there exists $\\theta$ with $f(a+h) - f(a) = Df(a + \\theta h)(h)$\" — here $\\theta$ depends on $h$ and cannot be treated as a constant.",
        status: 'draft',
        basedOn: 'v0.9.3#7ef0fb14',
      },
    },

    'thm.taylor-multi': {
      statement: {
        en: "Let $U \\subseteq \\mathbb{R}^{n}$ be open, $f : U \\to \\mathbb{R}$ of class $C^{k+1}$, $a \\in U$. Then for $h$ sufficiently small,\n\n$$f(a + h) = \\sum_{|\\alpha| \\le k} \\frac{D^{\\alpha} f(a)}{\\alpha!}\\, h^{\\alpha} + R_k(h)$$\n\nwhere the remainder can be written (for some $\\theta \\in (0,1)$)\n\n$$R_k(h) = \\sum_{|\\alpha| = k+1} \\frac{D^{\\alpha} f(a + \\theta h)}{\\alpha!}\\, h^{\\alpha} = O\\bigl(\\|h\\|^{k+1}\\bigr)$$\n\nThe two most-used cases:\n\n$$f(a+h) = f(a) + Df(a)(h) + o(\\|h\\|)$$\n\n$$f(a+h) = f(a) + Df(a)(h) + \\frac{1}{2}\\, D^{2}f(a)(h, h) + o\\bigl(\\|h\\|^{2}\\bigr)$$",
        status: 'draft',
        basedOn: 'v0.9.3#20ac58cc',
      },
      notes: {
        en: "⭐ Key observation: **the second derivative $D^{2}f(a)$ is a symmetric bilinear form on $\\mathbb{R}^{n}$**, not \"a bunch of second partials\".\n\nIn the formula for $k = 2$, $D^{2}f(a)(h,h)$ is precisely $\\sum_{i,j} \\partial_i \\partial_j f(a)\\, h_i h_j = h^{\\mathsf{T}} H_f(a)\\, h$.\n\n⭐ Thus multivariable Taylor meets linear algebra directly: $h^{\\mathsf{T}} H h$ is a **quadratic form**, and positive definiteness of quadratic forms has a ready criterion (`thm.sylvester-criterion`) — the second derivative test (`thm.second-derivative-test`) is this formula plus that criterion.\n\n⚠ Pitfall in the proof: applying one-variable Taylor to $t \\mapsto f(a + th)$ gives an expansion **only along one line**, and the $\\theta$ in the remainder depends on $h$.\n\nTo get uniformity in all $h$, one must induct on $k$ and write the remainder as a sum over multi-indices, using the one-variable MVT once per layer (or iterating over the coordinates of $h$).",
        status: 'draft',
        basedOn: 'v0.9.3#52015d28',
      },
    },

    'thm.matrix-linear-map': {
      statement: {
        en: "Let $V$ have ordered basis $\\mathcal{B} = (v_1, \\ldots, v_n)$ and $W$ have ordered basis $\\mathcal{C} = (w_1, \\ldots, w_m)$, both finite-dimensional $K$-vector spaces.\n\nThe $m \\times n$ matrix $[T]_{\\mathcal{B}}^{\\mathcal{C}}$ is called the **matrix** of $T$ with respect to these two bases, where the $j$-th column is the coordinate vector of $T(v_j)$ in $\\mathcal{C}$.\n\nThen the map $T \\mapsto [T]_{\\mathcal{B}}^{\\mathcal{C}}$ is an isomorphism of $K$-vector spaces\n\n$$\\operatorname{Hom}_K(V, W) \\;\\cong\\; M_{m \\times n}(K)$$\n\nand **composition corresponds to multiplication**: if $T : V \\to W$, $S : W \\to U$, then\n\n$$[S \\circ T]_{\\mathcal{B}}^{\\mathcal{E}} = [S]_{\\mathcal{C}}^{\\mathcal{E}}\\; [T]_{\\mathcal{B}}^{\\mathcal{C}}$$",
        status: 'draft',
        basedOn: 'v0.9.3#02b03eda',
      },
      notes: {
        en: "⭐ This is the **birth certificate** of all matrix theory: a matrix is not a defined object but the **coordinates** of a linear map in chosen bases (exactly the same mechanism as the entry on coordinates, only with a basis chosen on each side).\n\n⭐ Thus every matrix operation acquires meaning: addition = sum of maps, multiplication = composition, identity matrix = identity map, invertible = isomorphism.\n\n**Every formula about matrices can be translated into the language of maps**, and conversely — this is why the graph puts the two in separate clusters yet connects them by edges.\n\n⚠ All of this **depends on the choice of bases**: change the basis and the matrix changes. **The same space** $V = W$ with the same basis used on both sides gives **similarity** $P^{-1}AP$; for a general $T : V \\to W$ the two bases change independently and one gets **equivalence** $Q^{-1}AP$ (e.g. $V = W = \\mathbb{R}$, $T = \\mathrm{id}$: changing only the basis of the domain to $(2)$ gives $[2]$, which is not similar to $[1]$).\n\nThe linear map itself, however, does not change.",
        status: 'draft',
        basedOn: 'v0.9.3#f22335a9',
      },
    },

    'thm.arzela-ascoli': {
      statement: {
        en: "Let $X$ be a compact metric space, and let $\\mathcal{F} \\subset C(X)$ (continuous functions with the sup norm) satisfy\n\n1. **Uniformly bounded**: there exists $M$ such that $|f(x)| \\le M$ for all $f \\in \\mathcal{F}$, $x \\in X$;\n2. **Equicontinuous**: for every $\\forall \\varepsilon > 0$ there exists $\\delta > 0$ such that $d(x, y) < \\delta$ implies $|f(x) - f(y)| < \\varepsilon$ for **all** $f \\in \\mathcal{F}$ simultaneously.\n\nThen $\\mathcal{F}$ is **relatively compact** in $C(X)$: every sequence in $\\mathcal{F}$ has a subsequence converging in the sup norm.",
        status: 'draft',
        basedOn: 'v0.9.3#dc9be25c',
      },
      notes: {
        en: "**Proof (diagonal argument)**: since $X$ is compact, $\\implies$ one may take a countable dense set $\\{x_{1}, x_{2}, \\ldots\\}$. By uniform boundedness, $\\{f_{n}(x_{1})\\}$ has a convergent subsequence; from it choose a subsequence for which $\\{f_{n}(x_{2})\\}$ converges; continuing layer by layer and taking the diagonal $g_{k} := f_{n_{k}}$, we get that $g_{k}(x_{j})$ converges for every $j$.\n\n**Upgrading pointwise convergence to uniform convergence**: given $\\varepsilon$, use equicontinuity to choose $\\delta$; cover $x_{1}, \\ldots, x_{N}$ by finitely many $\\delta$-balls $X$.\n\nFirst take $K$ such that $j \\le N$ implies $|g_{k}(x_{j}) - g_{l}(x_{j})| < \\varepsilon$ ($k, l \\ge K$), then for arbitrary $x$ choose the nearest $x_{j}$ and use equicontinuity to bound $|g_{k}(x) - g_{l}(x)|$ by $3\\varepsilon$.\n\n∎\n\n⭐ **Each hypothesis governs one thing**: boundedness guarantees \"at each point there is a convergent subsequence\", while equicontinuity guarantees \"the same subsequence converges at all points simultaneously\". Dropping either one gives a counterexample ($f_{n}(x) = x^{n}$ is bounded but not equicontinuous; $f_{n}(x) = n$ is equicontinuous but not uniformly bounded).\n\n⚠️ The graph attaches this to complex analysis because Montel's theorem is exactly it plus Cauchy's inequality: for holomorphic functions, **uniform boundedness automatically gives equicontinuity** (through bounds on the derivative) — a convenience unique to complex analysis.",
        status: 'draft',
        basedOn: 'v0.9.3#dc242eaa',
      },
    },

    'thm.montel': {
      statement: {
        en: "Let $\\mathcal{F}$ be a family of holomorphic functions on a domain $\\Omega$ that is **locally uniformly bounded**: every point has a neighbourhood on which the family is uniformly bounded (equivalently: uniformly bounded on every compact set $K \\subset \\Omega$). Then $\\mathcal{F}$ is a **normal family**: every sequence $f_{n} \\in \\mathcal{F}$ has a subsequence converging uniformly on compact subsets (with holomorphic limit).",
        status: 'draft',
        basedOn: 'v0.9.3#8b89fef9',
      },
      notes: {
        en: "**Proof**: take a compact exhaustion $K_{1} \\subset K_{2} \\subset \\cdots$, $\\bigcup K_{j} = \\Omega$. On $K_{j}$, by the **Cauchy inequality**: if $|f| \\le M_{j}$ throughout a neighbourhood of $K_{j}$ of radius $r$, then $|f'| \\le M_{j}/r$ on $K_{j}$ — the bound is independent of $f$, so $\\mathcal{F}$ is **equicontinuous** on $K_{j}$.\n\nUniform boundedness is supplied by hypothesis, so `thm.arzela-ascoli` gives a convergent subsequence on $K_{j}$;\n\ntaking diagonals successively over $j = 1, 2, \\ldots$ yields a subsequence converging uniformly on **every** $K_{j}$, i.e. uniformly on compact subsets.\n\n**The limit is holomorphic**: by `thm.weierstrass-convergence`. ∎\n\n⭐ **Relation to compactness**: Montel says \"$\\mathcal{F}$ is relatively compact\", so every **continuous** functional (e.g. $f \\mapsto |f'(z_{0})|$) attains its maximum on a bounded closed family. The whole strength of the Riemann mapping theorem comes from this one sentence: among the family with \"univalent + $f(z_{0}) = 0$ + $f'(z_{0}) > 0$\", take the one maximising $f'(z_{0})$, then prove it must map onto the disc.\n\n⚠️ \"Locally uniformly bounded\" cannot be weakened to \"pointwise bounded\": $f_{n}(z) = n z$ is pointwise bounded on $\\mathbb{C}$ (constant at each point) but not uniformly bounded on any compact set, and has no locally uniformly convergent subsequence.",
        status: 'draft',
        basedOn: 'v0.9.3#399cea64',
      },
    },

    'prop.winding-integral': {
      statement: {
        en: "Let $\\gamma : [0,1] \\to \\mathbb{C}$ be a piecewise $C^{1}$ closed curve and $a \\notin \\gamma([0,1])$. Then\n\n$$n(\\gamma, a) = \\frac{1}{2\\pi i} \\oint_{\\gamma} \\frac{\\mathrm{d}z}{z - a},$$\n\nIn particular the right-hand side is **always an integer**.",
        status: 'draft',
        basedOn: 'v0.9.3#7fddbb28',
      },
      notes: {
        en: "**Proof**: first translate $a$ to $0$ (translation does not change the integral). Set $\\varphi(t) := \\displaystyle\\int_{0}^{t} \\frac{\\gamma'(s)}{\\gamma(s)}\\,\\mathrm{d}s$; then $(\\gamma e^{-\\varphi})' = e^{-\\varphi}(\\gamma' - \\varphi'\\gamma) = 0$, so $\\gamma(t) e^{-\\varphi(t)}$ is constant;\n\nfrom $\\varphi(0) = 0$ we get $e^{\\varphi(t)} = \\gamma(t)/\\gamma(0)$.\n\nTake $t = 1$: since $\\gamma(1) = \\gamma(0)$, we have $e^{\\varphi(1)} = 1$, hence $\\varphi(1) \\in 2\\pi i \\mathbb{Z}$. Now $\\varphi(1) = \\oint_{\\gamma} \\mathrm{d}z/z$, so the integral divided by $2\\pi i$ is an integer; it varies continuously with $a$, hence is exactly the winding number (integer-valued + continuous $\\implies$ locally constant).\n\n⭐ **Meaning of the formula**: the winding number was originally the geometric phrase \"how many times the curve turns around the point\"; here it becomes an **integral**, so a \"geometric quantity\" can enter computations — the argument principle uses it to count zeros.\n\n⚠️ The value of the integral is independent of the parametrisation of $\\gamma$ and depends only on orientation: going around the other way changes the sign of the winding number.",
        status: 'draft',
        basedOn: 'v0.9.3#10496724',
      },
    },

    'prop.integral-linear': {
      statement: {
        en: "Let $f, g$ be integrable on $[a, b]$ and $c \\in \\mathbb{R}$. Then $f + g$ and $cf$ are integrable, and\n\n$$\\int_a^b (f + g) = \\int_a^b f + \\int_a^b g, \\qquad \\int_a^b cf = c\\int_a^b f$$\n\nMoreover, for $a < c < b$: $f$ is integrable on $[a, b]$ if and only if it is integrable on $[a, c]$ and $[c, b]$, in which case\n\n$$\\int_a^b f = \\int_a^c f + \\int_c^b f$$",
        status: 'draft',
        basedOn: 'v0.9.3#f367a82a',
      },
      notes: {
        en: "⭐ \"Additivity over intervals\" is the most practical property of the Riemann integral: it cuts a problem on a large interval into two halves — and it is also the basis for defining improper integrals later.\n\n⚠ The **product** of two integrable functions is integrable (amplitude estimate: $\\omega(fg) \\le M\\omega(g) + N\\omega(f)$ on each subinterval), but the **quotient** need not be: one must first ensure the denominator stays away from zero.\n\n⭐ Integrability of sums and of products both rest on the amplitude criterion: substitute $\\omega(f + g) \\le \\omega(f) + \\omega(g)$.",
        status: 'draft',
        basedOn: 'v0.9.3#4b97a586',
      },
    },

    'thm.projection-subspace': {
      statement: {
        en: "Let $H$ be a Hilbert space and $E \\subseteq H$ a **closed** subspace. Then\n\n1. $y = P_E(x) \\iff y \\in E$ and $x - y \\in E^\\perp$;\n2. $P_E$ is linear, and $\\|P_E\\| \\le 1$ (it is $1$ when $E \\ne 0$);\n3. Orthogonal decomposition $H = E \\oplus E^\\perp$, and $\\|x\\|^2 = \\|x - P_E x\\|^2 + \\|P_E x\\|^2$.",
        status: 'draft',
        basedOn: 'v0.9.3#c978bb78',
      },
      notes: {
        en: "Proof: by the projection onto a closed convex set. For (1), the step \"$\\implies$\" replaces $z$ by $\\pm z$, kills the real part, and gives $\\operatorname{Re}\\langle x - y, z\\rangle \\le 0$ for all $z \\in E$, i.e. $x - y \\perp E$;\n\nthe step \"$\\Longleftarrow$\" uses $\\|x - z\\|^2 = \\|x - y\\|^2 + \\|y - z\\|^2 \\ge \\|x - y\\|^2$.\n\n(2) uses $\\alpha_1 x_1 + \\alpha_2 x_2 - \\alpha_1 P x_1 - \\alpha_2 P x_2 \\perp E$.\n\n(3) is Pythagoras.\n\n⚠️ The word \"closed\" in \"$E$ is closed\" cannot be dropped: for $E = $ the finitely supported sequences are dense in $\\ell^2$ but not closed; the distance is zero but not attained, so **no** nearest point in $E$ exists, and the orthogonal decomposition fails as well.\n\n⭐ This is one of the biggest differences between Hilbert spaces and general Banach spaces: in a general Banach space a closed subspace need not be complemented ($c_0 \\subset \\ell^\\infty$ is not), so the word \"projection\" cannot be used loosely in Banach spaces.\n\n**Which hypothesis each direction uses** (the orthogonal characterisation does not need completeness; the global decomposition needs existence of projections):\n- Nearest point $\\implies$ orthogonality: use variations in arbitrary real multiples of directions in the subspace; in the complex case one must also use purely imaginary multiples, so that vanishing of the real part forces the inner product to vanish.\n- $y\\in E$ and $x-y\\in E^\\perp\\implies y=P_E x$: the Pythagorean identity gives the unique minimiser directly, with no closedness or completeness required; the condition for the orthogonal complement itself is what the definition expands.\n- Every $x$ has an orthogonal decomposition: invoke `thm.projection-convex`, using completeness of the Hilbert space and closedness of $E$; linearity follows from uniqueness of the decomposition, and the norm bound from the Pythagorean identity.\n- Closedness cannot be removed: for $E=c_{00}\\subset\\ell^2$, the distance to $x\\in\\ell^2\\setminus c_{00}$ is zero but not attained, so no nearest point in $E$ exists.\n\n📌 The definition of \"orthogonal projection\" is in `def.orthogonal-projection`; this entry is about the statement that the image of the projection is exactly the closed subspace.",
        status: 'draft',
        basedOn: 'v0.9.3#b7ef8e99',
      },
    },

    'thm.harmonic-mean-value': {
      statement: {
        en: "**In plain words**: the value of a harmonic function at a point equals its average over the circle centred at that point of any radius; it also equals the area average over the disc.\n\nLet $u$ be harmonic on $B(a, R)$, $0 < r < R$. Then\n\n$$u(a) = \\frac{1}{2\\pi}\\int_0^{2\\pi} u(a + r e^{i\\theta})\\,\\mathrm{d}\\theta,$$\n\nand (area average)\n\n$$u(a) = \\frac{1}{\\pi r^2}\\iint_{B(a, r)} u(x, y)\\,\\mathrm{d}x\\,\\mathrm{d}y.$$",
        status: 'draft',
        basedOn: 'v0.9.3#abcb117b',
      },
      notes: {
        en: "⭐ The proof has only two steps: write $u$ as the real part of a holomorphic function $f$ (the disc is simply connected), then take real parts on both sides of the Cauchy integral formula $f(a) = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(a + r e^{i\\theta})\\,\\mathrm{d}\\theta$.\n\n⭐ The converse also holds: if $u$ is continuous and has the circle mean property, then $u$ is harmonic. So the \"mean property\" can serve as another definition of harmonic function — many books do exactly this, to avoid second-order differentiability.\n\n⚠ The mean must be taken over the **whole circle**, not just the few points straight above; nor over an arbitrary closed curve — that is precisely what the Poisson formula answers.\n\n⚠ $u$ need only be harmonic in the **interior** of $B(a, r)$; it is not required to be harmonic on the closed disc.\n\n📌 The mean property immediately yields the maximum principle (see the entry on the maximum principle for harmonic functions), and it is also the starting point for \"holomorphic functions are real-analytic\" (expand the integral into a power series).",
        status: 'draft',
        basedOn: 'v0.9.3#f7ad2833',
      },
    },

    'def.chaus': {
      statement: {
        en: "**Compact Hausdorff spaces** are the topological spaces that are both compact and Hausdorff. Taking them as objects and continuous maps as morphisms gives the category $\\mathbf{CHaus}$. The inclusion functor is denoted $\\mathbf{CHaus} \\hookrightarrow \\mathbf{Top}$.",
        status: 'draft',
        basedOn: 'v0.9.3#c0b291a1',
      },
      notes: {
        en: "Putting compactness and Hausdorffness together is a good bargain: **a compact Hausdorff space is regular and normal**, and a continuous bijection from a compact space to a Hausdorff space is automatically a homeomorphism. Many things that require extra hypotheses in $\\mathbf{Top}$ come for free here.\n\n**Arbitrary limits exist** in $\\mathbf{CHaus}$, and they are exactly the result computed in $\\mathbf{Top}$ (see the entry \"CHaus is a reflective subcategory\").",
        status: 'draft',
        basedOn: 'v0.9.3#a139660f',
      },
    },

    'def.sheaf': {
      statement: {
        en: "Let $\\mathcal{C}$ be a site and $F : \\mathcal{C}^{\\mathrm{op}} \\to \\mathbf{Set}$ a presheaf.\n\n- $F$ is called **separated** if for every $X$ and every $R \\in J(X)$, the restriction map\n\n$$\\operatorname{Hom}(h_{X}, F) \\longrightarrow \\operatorname{Hom}(R, F)$$\n\nis **injective**;\n- $F$ is called a **sheaf** if this map is **bijective**.",
        status: 'draft',
        basedOn: 'v0.9.3#63e93e16',
      },
      notes: {
        en: "By the Yoneda lemma $\\operatorname{Hom}(h_{X}, F) \\cong F(X)$, this definition can be read as two sentences: the left-hand side is $F(X)$ (global sections), while the right-hand side is \"a compatible family of sections along $R$\":\n\n- **Injective = separatedness**: two global sections that agree on $R$ must be equal;\n- **Bijective = gluing**: any compatible family of sections glues **uniquely** into a global section.\n\nIn the old language of topological spaces ($\\mathcal{C} = \\operatorname{Open}(X)^{\\mathrm{op}}$), these two conditions read: if $s|_{U_{i}} = t|_{U_{i}}$ holds everywhere then $s = t$; and local sections $s_{i}$ that agree on overlaps glue into a global section.",
        status: 'draft',
        basedOn: 'v0.9.3#b8449802',
      },
    },

    'thm.long-exact': {
      statement: {
        en: "Let $\\mathcal{A}$ be an abelian category and $0 \\to K \\to L \\to M \\to 0$ a short exact sequence of complexes. Then there is a **long exact sequence**\n\n$$\\cdots \\to H^{n}(K) \\to H^{n}(L) \\to H^{n}(M) \\xrightarrow{\\ \\delta\\ } H^{n+1}(K) \\to \\cdots$$\n\nwhere $\\delta$ is called the **connecting homomorphism**.\n\nCorollary: $H^{n} : \\mathbf{K}(\\mathcal{A}) \\to \\mathcal{A}$ is a **cohomology functor**.",
        status: 'draft',
        basedOn: 'v0.9.3#2c342631',
      },
      notes: {
        en: "**What it says**: a short exact sequence of complexes $0 \\to K \\to L \\to M \\to 0$ yields a **long exact sequence** in cohomology, and the **connecting homomorphism** $\\delta : H^{n}(M) \\to H^{n+1}(K)$ in the middle raises the degree by one.\n\n⭐ How $\\delta$ is built: take a representative of $m \\in H^{n}(M)$, lift it along the surjection $L^{n} \\to M^{n}$, then apply $d_{L}$ and land in $K^{n+1}$ — one must show the result is independent of the choice of lift (two lifts differ by a coboundary), and this step is exactly **diagram chasing**.\n\n⚠ This is **not** the same as the long exact sequence of derived functors (the short exact sequence $\\to$ $R^{n}F$ gives a long exact sequence): that one concerns derived functors, this one concerns the cohomology of the complexes themselves.",
        status: 'draft',
        basedOn: 'v0.9.3#17fcb23f',
      },
    },

    'def.projective-object': {
      statement: {
        en: "An object $P$ of a category $\\mathcal{C}$ is called **projective** if the functor $h_{P} = \\operatorname{Hom}_{\\mathcal{C}}(P, -)$ **preserves epimorphisms**. Dually, $I$ is called **injective** if $h^{I}$ sends monomorphisms to epimorphisms.\n\nExpanded as a lifting condition: for every epimorphism $A \\twoheadrightarrow B$ and every $P \\to B$ there exists a lift $P \\to A$ making the triangle commute:\n\n$$\\begin{array}{ccc} & P & \\\\ \\swarrow & \\downarrow & \\searrow \\\\ A & \\twoheadrightarrow & B \\end{array}$$\n\nDually, injectivity of $I$ says that every $A \\rightarrowtail B$ and every $A \\to I$ extend to $B \\to I$.",
        status: 'draft',
        basedOn: 'v0.9.3#36504573',
      },
      notes: {
        en: "The name \"projective\" comes from module theory: the projective objects of $R\\text{-}\\mathbf{Mod}$ are exactly the projective modules, and the injective objects are exactly the injective modules — the two standard criteria ($P$ is a direct summand, $I$ is a direct summand) are this definition specialised to modules.\n\nTwo immediate corollaries: **if $P$ is projective, every epimorphism $Y \\twoheadrightarrow P$ has a section**; **if $X \\to Y$ has a retraction and $Y$ is projective, then $X$ is projective too** (the injective case is dual).\n\nIn $\\mathbf{Set}$ **every object is projective**, and this is precisely the axiom of choice: given a surjection $A \\twoheadrightarrow B$ and a point of $B$, one can always choose a preimage.",
        status: 'draft',
        basedOn: 'v0.9.3#a2c94ab1',
      },
    },

    'def.principal-curvature': {
      statement: {
        en: "The eigenvalues of $W$ (equivalently, of the symmetric matrix $(h_{ij})$) are called the **principal curvatures**, denoted $k_{1} \\ge k_{2}$; the corresponding unit eigen-directions are called **principal directions**. They are given by the characteristic equation:\n\n$$\\det(h_{ij}-k\\,g_{ij}) = 0,\\qquad \\det(W-k\\,\\mathrm{id}) = 0 .$$\n\nIn an orthonormal frame $g_{ij} = \\delta_{ij}$, the characteristic polynomial is $k^{2}-2Hk+K$, where $H = \\tfrac{1}{2}\\operatorname{tr}W$ and $K = \\det W$.",
        status: 'draft',
        basedOn: 'v0.9.3#48b0488f',
      },
      notes: {
        en: "**Why eigenvalues**: $k_{n}$ is the Rayleigh quotient of $W$; extremal points on the unit circle satisfy $II(v,\\cdot) = k\\,I(v,\\cdot)$, i.e. $W(\\mathrm{d}r(v)) = k\\,\\mathrm{d}r(v)$ (Lagrange multipliers), and the extremal values are the eigenvalues — this is exactly the statement that \"the directions of extremal value are eigen-directions of $W$\".\n\n**Principal directions are orthogonal**: eigenvectors of a real symmetric matrix belonging to distinct eigenvalues are orthogonal (spectral theorem). The same conclusion follows from the Rayleigh quotient together with variations; the treatment here uses the spectral theorem directly.\n\n**Two characteristic equations**: $\\det(W-kI) = 0$ and $\\det(h-kg) = 0$ agree in an orthonormal frame; in a parameter net $\\{r_{u}, r_{v}\\}$ one must carry $g = \\begin{pmatrix} E & F \\\\ F & G \\end{pmatrix}$, so $g$ cannot be omitted.\n\n⚠️ $k_{1}, k_{2}$ depends on the choice of $n$ (all signs change under $n \\mapsto -n$), but \"$k_{1} = k_{2}$\" (umbilic point) and $K = k_{1}k_{2}$ are independent of the choice.",
        status: 'draft',
        basedOn: 'v0.9.3#f6ba02ef',
      },
    },

    'thm.solvable-quotients': {
      statement: {
        en: "Let $G$ be a group.\n\n**(a) Subgroups**: if $G$ is solvable and $H \\le G$, then $H$ is solvable.\n\n**(b) Quotients**: if $G$ is solvable and $N \\trianglelefteq G$, then $G/N$ is solvable.\n\n**(c) Extensions**: if $N \\trianglelefteq G$, $N$ is solvable and $G/N$ is solvable, then $G$ is solvable.\n\n((a) and (b) say that solvability descends; (c) says that solvability ascends along normal extensions.)",
        status: 'draft',
        basedOn: 'v0.9.3#0685f884',
      },
      notes: {
        en: "⭐ (c) is the most useful of the three: to show that $G$ is solvable it suffices to find a **normal subgroup** with $G$ sandwiched in between and both ends solvable — the standard way of breaking a big group into small pieces.\n\n⚠ The converses of (a) and (b) both **fail**, with tiny counterexamples:\n- a solvable subgroup **does not** imply that the group is solvable: $\\mathbb{Z}/2 \\le A_5$ is solvable, $A_5$ is not;\n\n- a solvable quotient **does not** imply that the group is solvable: $S_5 / A_5 \\cong \\mathbb{Z}/2$ is solvable, $S_5$ is not.\n\nSo \"solvable\" is not a local property; it ascends only by squeezing between two solvable ends as in (c).\n\n⭐ In terms of derived series all three are almost a single sentence: $H^{(k)} \\le G^{(k)}$;\n\n$\\pi(G^{(k)}) = (G/N)^{(k)}$.\n\nThe full proof is on the edges.\n\n⭐ This immediately gives a commonly used criterion: $G$ is solvable $\\iff$ there is a normal chain whose quotients are **cyclic** (not merely abelian) — because an abelian group can be refined further into cyclic factors.",
        status: 'draft',
        basedOn: 'v0.9.3#a2db1c65',
      },
    },

    'def.analytic-ring': {
      statement: {
        en: "A pre-analytic ring $\\mathcal{A}$ is called an **analytic ring** if and only if: for every complex\n\n$$C : \\cdots \\to C_i \\to \\cdots \\to C_1 \\to C_0 \\to 0$$\n\n(where each $C_i$ is a direct sum of copies of $\\mathcal{A}[T]$, with $T$ extremally disconnected), and for every extremally disconnected set $S$, the natural map\n\n$$\\operatorname{RHom}_{\\mathcal{A}}\\bigl(\\mathcal{A}[S],\\ C\\bigr) \\longrightarrow \\operatorname{RHom}_{A}\\bigl(A[S],\\ C\\bigr)$$\n\nis an isomorphism. Here \"natural map\" means **one concrete map**, not a figure of speech: it goes from the $\\mathcal{A}$ side to the $A$ side and is induced by composing along $\\iota_S$. Three steps make this precise:\n\n1. **First there is a canonical map** $\\iota_S : A[S] \\to \\mathcal{A}[S]$ — it sends a formal finite sum $\\sum a_s s$ into the free complete module (the data of a pre-analytic ring includes this family of maps; see `def.pre-analytic-ring`).\n2. **Pull back along it**: $\\operatorname{RHom}_A(-, C)$ is a contravariant functor, and $\\iota_S$ induces $\\operatorname{RHom}_A(\\mathcal{A}[S], C) \\to \\operatorname{RHom}_A(A[S], C)$, by the rule $g \\mapsto g \\circ \\iota_S$.\n3. **Rewrite the left-hand side (this step has a hypothesis)**: when $C$ carries an $\\mathcal{A}$-module structure (that is, lies in the image of (ii)), $\\mathcal{A}[S]$ is a free $\\mathcal{A}$-module, so an $\\mathcal{A}$-linear map is determined by its values on generators; hence there is an isomorphism\n\n$$\\operatorname{RHom}_{\\mathcal{A}}(\\mathcal{A}[S], C) \\cong \\operatorname{RHom}_A(\\mathcal{A}[S], C),$$\n\nThis is the isomorphism supplied by the adjunction, not \"the same set\". For a general $A$-module complex $C$, the left-hand side has not even been defined — the \"comparison map\" is exactly the object to be checked in the definition; identifying the two directly at the derived level would first require a derived category of complete modules, which is not proved here (see the gap at the end of the notes).\n\nPutting 2 and 3 together gives the arrow appearing in the formula, $\\operatorname{RHom}_{\\mathcal{A}}(\\mathcal{A}[S], C) \\to \\operatorname{RHom}_A(A[S], C)$.",
        status: 'draft',
        basedOn: 'v0.9.3#ad07bd38',
      },
      notes: {
        en: "⭐ Reading: **\"$\\mathcal{A}[S]$ and the ordinary free module $A[S]$ cannot be distinguished inside $\\operatorname{RHom}$\"**.\n\nThis is the relative version of condition (ii) in the definition of solid groups;\n\ntaking $A = \\mathbb{Z}$ and $\\mathcal{A}[S] = Z[S]^{\\blacksquare}$ returns to the solid case.\n\n⚠ Why require **all** such complexes and not just a single module? Because the conclusion is needed at the level of derived categories (`thm.analytic-modules` (ii)); an isomorphism at a single point is not enough — it must hold for complexes as well.\n\n⭐ Deciding \"is this an analytic ring\" is usually done via concrete theorems such as `prop.analytic-examples` and `thm.za-analytic`, not by checking the definition item by item.\n\n**Which hypothesis each direction uses** (analyticity is a derived test over a whole class of complexes):\n- Analyticity $\\iff$ the comparison map for all the listed complexes and extremally disconnected $S$ is a quasi-isomorphism: this is the definition unwound, with the pre-analytic ring already given.\n- The canonical map $A[S]\\to\\mathcal A[S]$ $\\implies$ the contravariant derived Hom comparison map: this uses functoriality of precomposition and does not presuppose analyticity.\n- Testing only ordinary Hom in degree zero $\\implies$ does not make the derived comparison isomorphism free; ordinary Hom cannot see higher Ext and cannot replace the condition on complexes.\n- The original text's explanation identifying $\\operatorname{RHom}_{\\mathcal A}$ with $\\operatorname{RHom}_A$ directly carries a circularity risk: for a general pre-analytic ring the derived category of complete modules has not been set up, so this step is unverified and recorded as a gap; the test condition is better formulated first in the derived category of condensed $A$-modules.",
        status: 'draft',
        basedOn: 'v0.9.3#705376a3',
      },
    },

    'prop.analytic-base-change': {
      statement: {
        en: "Let $f : \\mathcal{A} \\to \\mathcal{B}$ be a map between analytic rings (that is, a map of condensed rings such that each $\\mathcal{B}[S]$ lies in $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ as an $A$-module). Then:\n\n**(i)** the composite functor $\\operatorname{Mod}^{\\mathrm{cond}}_{A} \\xrightarrow{-\\otimes_{A} B} \\operatorname{Mod}^{\\mathrm{cond}}_{B} \\xrightarrow{-\\otimes_{\\mathcal{B}}\\mathcal{B}} \\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}$ factors through $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$, written\n\n$$M \\longmapsto M \\otimes_{\\mathcal{A}} \\mathcal{B} : \\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}} \\longrightarrow \\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}.$$\n\n**(ii)** the derived version $C \\mapsto C \\otimes^{L}_{\\mathcal{A}} \\mathcal{B}$ is its left derived functor.",
        status: 'draft',
        basedOn: 'v0.9.3#acbea9f7',
      },
      notes: {
        en: "⭐ This makes $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ functorial in $\\mathcal{A}$: changing the analytic ring is base change.\n\n⭐ The proof is short: by the definition of the map, $\\mathcal{B}[S]$ already lies in $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$, and these are compact projective generators, so all of $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}$ lands inside.",
        status: 'draft',
        basedOn: 'v0.9.3#253a9a90',
      },
    },

    'prop.analytic-examples': {
      statement: {
        en: "The following pre-analytic rings are analytic rings:\n\n**(i)** $\\mathbb{Z}_{p,\\blacksquare}$ (the $p$-adic solid ring);\n\n**(ii)** for any discrete ring $A$, $(A, \\mathbb{Z})_\\blacksquare$, whose free module is\n\n$$(A,\\mathbb{Z})_\\blacksquare[S] = Z[S]^{\\blacksquare} \\otimes_{\\mathbb{Z}} A.$$",
        status: 'draft',
        basedOn: 'v0.9.3#4c03b9c1',
      },
      notes: {
        en: "⭐ (i) and (ii) in fact share one proof: in both cases one has\n\n$$\\mathcal{A}[S] = \\mathbb{Z}_\\blacksquare[S] \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} \\mathcal{A},$$\n\nand $C$ is, in $D(\\mathbf{Solid})$, an $\\mathcal{A}$-module, so\n\n$$\\operatorname{RHom}(\\mathbb{Z}_\\blacksquare[S], C) \\cong \\operatorname{RHom}_{\\mathcal{A}}(\\mathbb{Z}_\\blacksquare[S] \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} \\mathcal{A},\\ C),$$\n\nThe left-hand side is $\\operatorname{RHom}(\\mathbb{Z}[S], C)$ ($C$ solid), and the right-hand side is $\\operatorname{RHom}_{\\mathcal{A}}(\\mathcal{A}[S], C)$.\n\n⚠ $A$ must be **discrete**: for a general condensed ring the claim fails, which is also why `thm.za-analytic` needs \"finitely generated $\\mathbb{Z}$-algebra\".",
        status: 'draft',
        basedOn: 'v0.9.3#bfcc3465',
      },
    },

    'thm.coherent-duality': {
      statement: {
        en: "Let $A$ be a finitely generated $\\mathbb{Z}$-algebra and $f : \\operatorname{Spec} A \\to \\operatorname{Spec} \\mathbb{Z}$ the structure map (projecting the spectrum of the coefficient ring down). Define\n\n$$f_! : D(A_\\blacksquare) \\xrightarrow{j_!} D((A,\\mathbb{Z})_\\blacksquare) \\longrightarrow D(\\mathbb{Z}_\\blacksquare).$$\n\nThen $f_!$ preserves all direct sums and preserves compact objects, and satisfies the **projection formula**\n\n$$f_!\\bigl((M \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} A_\\blacksquare) \\otimes^{L}_{A_\\blacksquare} N\\bigr) \\cong M \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} f_! N,$$\n\nwhere $M \\in D(\\mathbb{Z}_\\blacksquare)$ and $N \\in D(A_\\blacksquare)$. The functor $f_!$ has a right adjoint\n\n$$f^! : D(\\mathbb{Z}_\\blacksquare) \\longrightarrow D(A_\\blacksquare), \\qquad f^! M = (M \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} A_\\blacksquare) \\otimes^{L}_{A_\\blacksquare} f^! \\mathbb{Z},$$\n\nwhich preserves direct sums; $f^! \\mathbb{Z} \\in D(A_\\blacksquare)$ is a bounded complex of finitely generated discrete $A$-modules.\n\nIf $f$ is a **complete intersection** (locally $A$ is obtained from $R$ by modding out a regular sequence, i.e. \"the cut is clean and there are no superfluous relations\"), then $f^!\\mathbb{Z}$ is invertible in $D(A)$ (locally it is a line bundle in some degree).",
        status: 'draft',
        basedOn: 'v0.9.3#1d53a34c',
      },
      notes: {
        en: "⭐ This is the \"affine model\" of Grothendieck's coherent duality: $f_!$ is **cohomology with compact support**, $f^!$ is the **dualising complex**, and both the projection formula and Serre duality follow formally from the adjunction.\n\n⭐ Difference from the classical approach: in classical coherent duality, $f_!$ in the affine case can only be manufactured artificially out of \"formal functions\";\n\nhere $f_!$ is a direct consequence of the adjunction pair ($j_! \\dashv j^*$), and it **does not preserve discrete objects** — exactly the gain of the condensed method.\n\n⚠ The identification of $f^!\\mathbb{Z}$ with the classical dualising complex $\\omega_A$ must be proved in the framework of `thm.za-analytic` (Lecture XI of the original).\n\n⚠ This conclusion is conditional on `thm.za-analytic` (still a skeleton); no complete proof is given here.",
        status: 'draft',
        basedOn: 'v0.9.3#8cbbb3c4',
      },
    },

    'thm.za-analytic': {
      statement: {
        en: "Let $A$ be a finitely generated $\\mathbb{Z}$-algebra and $A_\\blacksquare$ the pre-analytic ring whose free module is\n\n$$A_\\blacksquare[S] := \\varprojlim_i A[S_i] \\qquad (S = \\varprojlim_i S_i)$$\n\n(that is, the $A$-valued measure $M(S,A)$). Then $A_\\blacksquare$ is an analytic ring, and the forgetful functor\n\n$$j^* : D(A_\\blacksquare) \\hookrightarrow D((A,\\mathbb{Z})_\\blacksquare)$$\n\nhas a left adjoint $j^* = -\\otimes^{L}_{(A,\\mathbb{Z})_\\blacksquare} A_\\blacksquare$, which in turn has a left adjoint\n\n$$j_! : D(A_\\blacksquare) \\longrightarrow D((A,\\mathbb{Z})_\\blacksquare),$$\n\nsatisfying $j_! j^* M = M \\otimes_{(A,\\mathbb{Z})_\\blacksquare} j_! A$.",
        status: 'draft',
        basedOn: 'v0.9.3#dec0a246',
      },
      notes: {
        en: "⭐ This is Clausen–Scholze, Lectures on Condensed Mathematics, Lecture VIII, Theorem 8.1. It is the first analytic ring in the graph that covers a genuine geometric object: for $A=\\mathbb{Z}[T]$, $A_\\blacksquare$ is the coefficient ring of \"solid modules over $\\mathbb{Z}[T]$\", and the coherent duality that follows (`thm.coherent-duality`) rests entirely on it.\n\n**The real size of the proof.** The full proof is the content of the first few sections of Lecture VIII and cannot fit into a single edge. The core route for $A=\\mathbb{Z}[T]$ is:\n\n① Set $A_\\infty:=\\mathbb{Z}((T^{-1}))$ and view it as \"functions on $\\operatorname{Spec} A$ at infinity\"; there is a short exact sequence\n\n$$0\\to \\mathbb{Z}[[U]]\\otimes_{\\mathbb{Z}} A \\xrightarrow{1-\\mathrm{shift}\\otimes T} \\mathbb{Z}[[U]]\\otimes_{\\mathbb{Z}} A \\to A_\\infty \\to 0 .$$\n\n② By ①, $A_\\infty$ is compact projective (the first two terms are of the form $\\prod_I \\mathbb{Z}\\otimes A$), and idempotent: $A_\\infty\\otimes^{L}_{A}A_\\infty\\cong A_\\infty$.\n\n③ By ②, $\\operatorname{RHom}_A(A_\\infty,C)=0$, where $C$ is built from direct sums of $\\prod_I A$.\n\n④ Analyticity: the category of solid modules over $A_\\blacksquare$ corresponds to the subcategory of complexes satisfying $\\operatorname{RHom}_A(A_\\infty,C)=0$ (this is the working form of the definition of an analytic ring).\n\n⑤ Existence of $j_!$: use $\\operatorname{coker}\\bigl(\\prod_I \\mathbb{Z}\\otimes A\\to\\prod_I A\\bigr)$ to construct $j_!A$, then use presentability / the adjoint functor theorem to extend $j_!$ to the whole derived category.\n\n⑥ General finitely generated $A$: by Noether normalisation find a polynomial ring $R=\\mathbb{Z}[X_1,\\ldots,X_n]$ and a finite injection $R\\to A$, and identify $A_\\blacksquare$ with $(A,R)_\\blacksquare$ at the derived level.\n\n⑦ The projection formula $j_!j^*M\\cong M\\otimes_{A_\\blacksquare}j_!A$ follows formally from $j_!\\dashv j^*$.\n\n**Gaps in the graph (item by item; the node therefore remains skeleton).**\n\n(i) Foundations: the definitions and functoriality of $D((A,\\mathbb{Z})_\\blacksquare)$ and $A_\\blacksquare$ are only cited in the graph (`def.pre-analytic-ring`, `def.analytic-ring`), not proved item by item.\n\n(ii) Compact projectivity in ② needs the sentence \"$\\prod_I\\mathbb{Z}\\cong\\mathbb{Z}[\\beta I]$, with $\\beta I$ extremally disconnected compact, hence $\\mathbb{Z}[\\beta I]$ is compact projective\"; the graph has no node for \"compact projective generator / $\\beta I$\".\n\n(iii) Idempotence in ②: the edge says \"compute directly\", but the required derived completion and the derived Sant lemma are not developed.\n\n(iv) The \"acyclicity\" of the two-term complex in ③ requires the middle map $f$ to be an **isomorphism**, not merely injective; the edge flags this but does not prove it.\n\n(v) Existence of $j_!$ in ⑤ relies on presentable functors / the adjoint functor theorem; the graph has no node for this.\n\n(vi) Noether normalisation in ⑥ only gives the idea: what must be proved is that $A_\\blacksquare$ and $(A,R)_\\blacksquare$ agree at the level of derived categories, not a one-line \"reduction\".\n\n(vii) The projection formula in ⑦ requires ⑤ to be completed first.\n\n⚠ Thus this node is still marked skeleton. The edge `imp.za-analytic` is a **road map plus key computations**, not a verbatim proof; do not cite it as an established fact.\n\n⭐ Relation to geometry: for $A=\\mathbb{Z}[T]$, $A_\\blacksquare$ corresponds to a kind of \"neighbourhood at infinity\" of $\\mathbb{A}^1$, with $A_\\infty$ the functions on its boundary; this theorem is the entry point for \"making the derived completion of an affine scheme into an analytic ring\".",
        status: 'draft',
        basedOn: 'v0.9.3#b39022e6',
      },
    },

    'thm.hahn-banach': {
      statement: {
        en: "Let $X$ be a **real** vector space, $p : X \\to \\mathbb{R}$ **sublinear** ($p(x + y) \\le p(x) + p(y)$, and $p(tx) = t\\,p(x)$ for $t \\ge 0$), $M \\subseteq X$ a subspace, and $f : M \\to \\mathbb{R}$ linear with $f \\le p$ on $M$. Then there exists a linear $F : X \\to \\mathbb{R}$ such that $F|_M = f$ and $F \\le p$.\n\n**Norm-preserving extension (corollary)**: let $X$ be a normed space, $M \\subseteq X$ a subspace, $\\varphi \\in M^{*}$. Then there exists $\\Phi \\in X^{*}$ such that $\\Phi|_M = \\varphi$ and $\\|\\Phi\\| = \\|\\varphi\\|$.",
        status: 'draft',
        basedOn: 'v0.9.3#4205eb81',
      },
      notes: {
        en: "**Step 1: the one-dimensional extension lemma.** Let $x_0 \\notin M$, $N = M \\oplus \\mathbb{R}x_0$. Defining, on $N$, a map $g(m + t x_0) = f(m) + t c$ that preserves $g \\le p$ is equivalent to having, for every $m \\in M$,\n\n$f(m) + c \\le p(m + x_0), \\qquad f(m) - c \\le p(m - x_0).$\n\ni.e. $c$ lies in the interval $[\\sup_m (f(m) - p(m - x_0)),\\ \\inf_m (p(m + x_0) - f(m))]$. This interval is non-empty, because for any $m_1, m_2 \\in M$, sublinearity gives\n\n$f(m_1) + f(m_2) = f(m_1 + m_2) \\le p(m_1 + m_2) \\le p(m_1 - x_0) + p(m_2 + x_0),$\n\ni.e. $f(m_1) - p(m_1 - x_0) \\le p(m_2 + x_0) - f(m_2)$. Choose any $c$ in the interval; the extension then works.\n\n**Step 2: Zorn.** Consider all objects \"$g$ defined on a subspace $N \\supseteq M$, linear, $g|_M = f$, and $g \\le p$ on $N$\", ordered by extension ($g_1 \\preceq g_2$ when $g_2$ has larger domain and agrees on $g_1$ with $g_1$). The union of a totally ordered subfamily is again such an object (domains are unioned; linearity and $\\le p$ are checked pointwise), so `lem.zorn` gives a maximal element $F$. If $\\operatorname{dom} F \\ne X$, take $x_0 \\notin \\operatorname{dom} F$ and extend again by Step 1, contradicting maximality. Hence $F$ is defined on all of $X$. $\\blacksquare$\n\n**Step 3: norm-preserving extension.** Take $p(x) = \\|\\varphi\\| \\cdot \\|x\\|$ (sublinear) and $f = \\varphi$; then $\\varphi \\le p$ on $M$. This gives a linear $\\Phi$ with $\\Phi|_M = \\varphi$ and $\\Phi \\le p$ on $X$. Applying $\\Phi \\le p$ to $x$ and to $-x$ gives $|\\Phi(x)| \\le \\|\\varphi\\|\\,\\|x\\|$, hence $\\|\\Phi\\| \\le \\|\\varphi\\|$; the reverse inequality comes from the extension, so equality holds. $\\blacksquare$\n\n**The complex case**: regard $\\varphi$ as a real-linear functional, extend it, then set $\\Phi_{\\mathbb C}(x) = \\Psi(x) - i\\,\\Psi(ix)$; one checks that it is complex-linear and norm-preserving.\n\n📌 This entry proves only the \"sublinear domination\" form; the geometric form (separation of a point from a closed convex set) is derived from it and used in the notes to `thm.goldstine`.",
        status: 'draft',
        basedOn: 'v0.9.3#621163ee',
      },
    },

    'def.bounded-operator': {
      statement: {
        en: "Let $u : E \\to F$ be linear. Call $u$ **bounded** if there exists $C$ such that $\\|u(x)\\| \\le C\\|x\\|$ for all $x$. The whole collection is denoted $B(E, F)$, and one writes $B(E) := B(E, E)$. Define\n\n$$\\|u\\| := \\sup_{\\|x\\| \\le 1} \\|u(x)\\| = \\sup_{\\|x\\| = 1} \\|u(x)\\| = \\sup_{x \\ne 0} \\frac{\\|u(x)\\|}{\\|x\\|} ,$$\n\nThis makes $B(E, F)$ a normed space (with the convention $\\|u\\| = 0$ when $E = 0$).",
        status: 'draft',
        basedOn: 'v0.9.3#4acdc3ed',
      },
      notes: {
        en: "⚠️ **The name is a historical misunderstanding**: \"bounded\" here does **not** mean \"the function is bounded\": a linear map bounded as a function $\\iff$ it is the zero map (the zero map satisfies this for any $E \\ne 0$). The real meaning is \"sends bounded sets to bounded sets\", which is equivalent to **continuity** (next entry). Do not be misled by the name when reading old books.\n\n⚠️ The three sups are equal only when $E \\ne 0$ (otherwise the sphere is empty and the sup is meaningless).\n\n⭐ When $E$ is infinite-dimensional and $F \\ne \\{0\\}$, one has $L(E, F) \\ne B(E, F)$: discontinuous linear operators really do exist (constructed using the axiom of choice). This is why the graph separates \"linear\" and \"bounded\" into two nodes: $L(E,F)$ is the **algebraic** Hom, and $B(E,F)$ is the continuous part of it.",
        status: 'draft',
        basedOn: 'v0.9.3#dba96e03',
      },
    },

    'lem.countable-closed-cover': {
      statement: {
        en: "Let $X$ be a Baire space, $F_n \\subseteq X$ closed, and $X = \\bigcup_n F_n$. Then $\\bigcup_n \\operatorname{int} F_n$ is **dense** in $X$. In particular, if $X \\ne \\emptyset$, then at least one $F_n$ has non-empty interior (the empty space satisfies the Baire hypothesis, but every $F_n$ has empty interior).",
        status: 'draft',
        basedOn: 'v0.9.3#e132d7bc',
      },
      notes: {
        en: "**This is the \"open-set version\" of the Baire category theorem**: among the members of a closed cover that have interior, the union of those interiors is dense. The full proof (using the Baire property on non-empty open sets) is on the edge `imp.countable-closed-cover-proof`.",
        status: 'draft',
        basedOn: 'v0.9.3#2b376b26',
      },
    },

    'def.equicontinuous': {
      statement: {
        en: "Let $K$ be a topological space, $(E, d)$ a metric space, and $\\mathcal{H} \\subseteq C(K, E)$.\n\n- $\\mathcal{H}$ is **equicontinuous at** $x_0 \\in K$: $\\forall \\varepsilon > 0$ there exists a neighbourhood $U$ of $x_0$ such that $d(f(x), f(x_0)) < \\varepsilon$ holds for **all** $f \\in \\mathcal{H}$ and $x \\in U$ simultaneously.\n- $\\mathcal{H}$ is equicontinuous on $K$: it is equicontinuous at every point $x \\in K$.",
        status: 'draft',
        basedOn: 'v0.9.3#c06cb1cf',
      },
      notes: {
        en: "⚠️ The point is \"**for all $f$ simultaneously**\". Drop this condition and one only has \"each $f$ is continuous on its own\" — that is the definition of $\\mathcal{H} \\subseteq C(K,E)$ and says nothing new.\n\nWhen $\\mathcal{H} = \\{f\\}$, equicontinuity $\\iff$ $f$ being continuous.\n\n⭐ This is the **only non-trivial** hypothesis in compactness (Arzelà–Ascoli): pointwise total boundedness merely says \"does not diverge\", while equicontinuity says \"does not oscillate ever more wildly\".\n\n📌 When $K$ is a metric space there is also a stronger uniform version, see `def.uniformly-equicontinuous`; when $K$ is compact the two are equivalent (`thm.equicontinuous-uniform`).",
        status: 'draft',
        basedOn: 'v0.9.3#f19c49f6',
      },
    },

    'def.subalgebra-separating': {
      statement: {
        en: "Let $K$ be compact Hausdorff and $A \\subseteq C(K, \\mathbb{K})$.\n\n- $A$ is a **subalgebra**: it is a vector space and is closed under multiplication;\n- $A$ **separates points**: $x \\ne y \\implies \\exists f \\in A$, $f(x) \\ne f(y)$;\n- $A$ is a **lattice**: closed under $\\min, \\max$.",
        status: 'draft',
        basedOn: 'v0.9.3#3810c039',
      },
      notes: {
        en: "\"Separates points\" is a necessary condition for Stone–Weierstrass: if two points are not separated, glue them into one, and $A$ cannot generate the functions on the glued space, $C$.\n\n⚠️ The example of self-adjoint matrices (from the lectures): self-adjoint matrices ordered by $A \\ge B \\iff A - B$ being positive semidefinite do not in general form a **lattice** (the pointwise min of two self-adjoint matrices need not be self-adjoint). So \"lattice\" is not automatic; it must be bought by \"closed + contains the unit\".",
        status: 'draft',
        basedOn: 'v0.9.3#bae06c67',
      },
    },

    'lem.closed-subalgebra-lattice': {
      statement: {
        en: "Let $K$ be compact Hausdorff and $A \\subseteq C(K, \\mathbb{R})$ a **closed** subalgebra **containing the unit**. Then $A$ is closed under $\\min, \\max$.",
        status: 'draft',
        basedOn: 'v0.9.3#ed69a1e6',
      },
      notes: {
        en: "**Why it suffices to prove $|f|\\in A$**: $\\max,\\min$ can be assembled from $|\\cdot|$ and the four arithmetic operations; $|f|=\\sqrt{f^{2}}$ is then uniformly approximated by the binomial series. The full proof is on the edge `imp.subalgebra-lattice-proof`.",
        status: 'draft',
        basedOn: 'v0.9.3#3569eb44',
      },
    },

    'thm.bounded-operators-banach': {
      statement: {
        en: "Let $E$ be normed and $F$ Banach. Then $(B(E, F), \\|\\cdot\\|)$ is a Banach space. In particular, the dual space $E^* = B(E, \\mathbb{K})$ is **always** Banach (regardless of whether $E$ is complete).",
        status: 'draft',
        basedOn: 'v0.9.3#467b6f7e',
      },
      notes: {
        en: "**Idea of the proof**: define $u$ as the pointwise limit, then control $\\lVert u_k-u\\rVert$ by uniform boundedness. The full proof is on the edge `imp.bounded-operators-banach-proof`. In particular $E^*=B(E,\\mathbb K)$ is always Banach.",
        status: 'draft',
        basedOn: 'v0.9.3#ba597d57',
      },
    },

    'thm.norm-equiv-finite-dim': {
      statement: {
        en: "Let $\\dim E < \\infty$. Then any two norms on $E$ are equivalent; equivalently, for any basis $e_1, \\ldots, e_n$ there exist $\\alpha, \\beta > 0$ such that\n\n$$\\alpha\\,\\|x\\|_\\infty \\le \\|x\\| \\le \\beta\\,\\|x\\|_\\infty , \\qquad \\|x\\|_\\infty := \\max_{1 \\le k \\le n} |x_k| .$$",
        status: 'draft',
        basedOn: 'v0.9.3#0d22915d',
      },
      notes: {
        en: "**Why finite dimension is special**: the unit sphere is compact, so a norm attains a positive minimum on it, and hence any norm is controlled from both sides by $\\lVert\\cdot\\rVert_\\infty$. The full proof is on the edge `imp.norm-equiv-finite-dim-proof`.",
        status: 'draft',
        basedOn: 'v0.9.3#29b17bc8',
      },
    },

    'thm.polarization': {
      statement: {
        en: "In a real inner product space:\n\n$$\\langle x, y\\rangle = \\tfrac{1}{4}\\bigl( \\|x + y\\|^2 - \\|x - y\\|^2 \\bigr) .$$\n\nIn a complex inner product space:\n\n$$\\langle x, y\\rangle = \\tfrac{1}{4}\\sum_{k=0}^{3} i^k \\,\\| x + i^k y \\|^2 .$$",
        status: 'draft',
        basedOn: 'v0.9.3#35349119',
      },
      notes: {
        en: "**Use**: it recovers the inner product from the norm, so \"preserving the norm\" and \"preserving the inner product\" are equivalent in the real case; the complex case uses a combination of four directions. The full derivation is on the edge `imp.polarization-proof`.",
        status: 'draft',
        basedOn: 'v0.9.3#37b58dbc',
      },
    },

    'thm.riesz-ball-compact': {
      statement: {
        en: "For a normed space $E$, the closed unit ball $B_E = \\{x \\in E : \\|x\\| \\le 1\\}$ is compact $\\iff$ $\\dim E < \\infty$.",
        status: 'draft',
        basedOn: 'v0.9.3#7199b914',
      },
      notes: {
        en: "\"$\\Longleftarrow$\": in finite dimension all norms are equivalent (`thm.norm-equiv-finite-dim`), so compactness can be tested using the coordinate ball of $\\|\\cdot\\|_\\infty$;\n\nthe coordinate ball $\\overline{B}^{\\infty}(0,1)$ is bounded and closed (in the real case it is $[-1,1]^{n}$; in the complex case it is the unit polydisc, regarded as a closed bounded subset of $\\mathbb{R}^{2n}$), and is compact by Heine–Borel (`cor.heine-borel`).\n\n∎\n\n\"$\\implies$\": if $\\dim E = \\infty$, use Riesz's lemma (`lem.almost-orthogonal`) to construct recursively unit vectors with $\\|e_n - e_m\\| \\ge 1/2$ ($n \\ne m$); such a sequence has no convergent subsequence, so the closed unit ball is not sequentially compact and hence not compact.\n\n⭐ This is one half of \"finite-dimensional if and only if locally compact\": finite-dimensional normed spaces are locally compact, while infinite-dimensional ones are **never** locally compact. It is also the precise version of \"bounded closed sets are compact\" holding only in finite dimension — Heine–Borel fails in infinite dimension.",
        status: 'draft',
        basedOn: 'v0.9.3#a2ae191e',
      },
    },

    'def.ck-space': {
      statement: {
        en: "Let $K$ be compact Hausdorff and $(E, d)$ a metric space. On $C(K, E)$ define\n\n$$\\Delta(f, g) := \\sup_{x \\in K} d\\bigl(f(x), g(x)\\bigr) .$$\n\nWhen $E$ is normed this is the sup norm $\\|f\\| = \\sup_x \\|f(x)\\|$.",
        status: 'draft',
        basedOn: 'v0.9.3#4378ff9b',
      },
      notes: {
        en: "The supremum is attained (compactness plus continuity). This metric is the metric of \"uniform convergence\", not of \"pointwise convergence\" (the same convention as `def.uniform-convergence`).\n\n⭐ The notation allows an arbitrary metric space $E$, so the results in this cluster (completeness, Arzelà–Ascoli) are broader than the classical $\\mathbb{R}$-valued versions.",
        status: 'draft',
        basedOn: 'v0.9.3#243acb6f',
      },
    },

    'def.convex-set': {
      statement: {
        en: "Let $V$ be a real vector space and $C \\subseteq V$. Call $C$ a **convex set** if for all $x, y \\in C$ and $t \\in [0,1]$,\n\n$$(1-t)x + ty \\in C.$$\n\nEquivalently: $C$ contains the whole segment between any two of its points.",
        status: 'draft',
        basedOn: 'v0.9.3#67fb4cdd',
      },
      notes: {
        en: "⭐ Convexity uses only the **affine structure**; no norm or inner product is needed. In infinite dimension it is the key hypothesis for \"existence of a minimiser\" (see `thm.projection-convex`).\n\n⚠ The empty set is convex under this definition (the condition \"for any two points\" holds vacuously); when non-emptiness is needed it is assumed separately in the theorem (as in the projection theorem).\n\n💡 Convex combinations, convex hulls and separation theorems all start here.\n\n📌 **A convex set is star-shaped at each of its points** (see `thm.convex-star-shaped-every-point`); for the empty set this universal statement holds vacuously, so there is no conflict with \"the empty set is not star-shaped\".",
        status: 'draft',
        basedOn: 'v0.9.3#0545677c',
      },
    },

    'def.norm-equivalence': {
      statement: {
        en: "Let $p, q$ be two norms on $E$. Call $p$ **stronger than** $q$ (written $q \\preceq p$) if there exists $C > 0$ such that\n\n$$q(x) \\le C\\,p(x) \\qquad \\forall x \\in E .$$\n\nIf each is stronger than the other, call $p$ and $q$ **equivalent**, written $p \\sim q$.",
        status: 'draft',
        basedOn: 'v0.9.3#837a258e',
      },
      notes: {
        en: "- (a) equivalence - (b) the same induced topology - (c) the same Cauchy sequences - (d) the same convergent sequences.\n\n⚠️ The relation is asymmetric, and its direction runs against intuition: a **strong** norm (larger $p$) has smaller balls, **more** open sets, harder convergence, and **fewer** Cauchy sequences. So \"passing to a stronger norm\" **removes** convergent objects — which is exactly why one chooses the weakest norm that suffices (e.g. the weak topology).\n\n⚠️ Equivalence preserves completeness and very little else: two equivalent norms give the same completeness (the same Cauchy sequences), but **extremal problems** can have different answers (the balls differ).",
        status: 'draft',
        basedOn: 'v0.9.3#4ad1c961',
      },
    },

    'def.orthonormal-set': {
      statement: {
        en: "Let $\\{f_i\\}_{i \\in I} \\subseteq H$.\n\n- **Orthogonal**: $f_i \\perp f_j$ ($i \\ne j$);\n- **Orthonormal**: orthogonal + $\\|f_i\\| = 1$;\n- **Complete**: $\\overline{\\operatorname{span}\\{f_i\\}} = H$;\n- **Orthonormal basis**: orthonormal + complete.",
        status: 'draft',
        basedOn: 'v0.9.3#787b63d2',
      },
      notes: {
        en: "⚠️ Completeness is not \"spanning $H$\" but \"the **closure** of the span is the whole space\": the algebraic span of $\\{e_n\\}$ in $\\ell^2$ consists of finitely supported sequences, which is dense but not equal to $\\ell^2$.\n\n⚠️ In infinite dimension **uncountable orthonormal bases really occur**: the Hermite functions in $L^2(\\mathbb{R})$ are countable, but the orthonormal basis of a general $\\ell^2(I)$ is $\\{e_i\\}_{i \\in I}$, and $I$ can be arbitrarily large.\n\n⭐ Once an orthonormal basis is available, a Hilbert space becomes \"$\\ell^2$ without weights\" (see Bessel/Parseval and \"separable Hilbert $\\cong \\ell^2$\").",
        status: 'draft',
        basedOn: 'v0.9.3#a1669ec2',
      },
    },

    'def.reflexive-space': {
      statement: {
        en: "Let $X$ be a Banach space and $J_X : X \\to X^{**}$ the natural embedding $J_X(x)(\\varphi) = \\varphi(x)$. Call $X$ **reflexive** if $J_X$ is surjective (hence an isometric isomorphism).",
        status: 'draft',
        basedOn: 'v0.9.3#41bb29e0',
      },
      notes: {
        en: "The natural embedding is always isometric (Hahn–Banach): $\\|J_X x\\| = \\sup_{\\|\\varphi\\| \\le 1}|\\varphi(x)| = \\|x\\|$. Hence reflexivity $\\iff$ every element of $X^{**}$ comes from $X$.\n\n**Examples**: Hilbert spaces; $L^p$ and $\\ell^p$ ($1 < p < \\infty$, see `cor.lp-reflexive`); finite-dimensional spaces.\n\n**Counterexamples**: $c_0$ ($c_0^{**} = \\ell^\\infty \\ne c_0$), $\\ell^1$ ($\\ell^{1**} = (\\ell^\\infty)^* \\supsetneq \\ell^1$), $C[0,1]$.\n\n⭐ The core use of reflexivity: bounded sequences have weakly convergent subsequences (Eberlein–Šmulian; the graph has no weak-topology node yet), which is the entry point to variational existence and to Milman–Pettis.\n\n📌 Relation to pairing language: $X$ is reflexive $\\iff$ both embeddings of the perfect pairing $(X, X^*)$ are surjective (`def.perfect-pairing`, `thm.riesz-perfect-pairing`).",
        status: 'draft',
        basedOn: 'v0.9.3#f7bd2e47',
      },
    },
  },
};
