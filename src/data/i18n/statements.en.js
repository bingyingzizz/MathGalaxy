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
        "- (c) $X$ is **complete and totally bounded**.\n\n" +
        "That is, $X$ compact $\\iff$ $X$ sequentially compact $\\iff$ $X$ complete $+$ totally bounded.",
        status: 'reviewed', basedOn: 'v0.9.3#b828d710', reviewed: { by: 'bingyingzizz', date: '2026-10-16' },
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
        '$\\forall F [ ( \\forall X \\in F, X \\ne \\emptyset ) \\to \\exists f ( \\operatorname{dom} f = F \\wedge  \\forall X \\in F, f(X) \\in X ) ]$\\\n\n' +
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
        en: "**The hierarchy of separation axioms** (each step strengthens the previous one):\n\n- $T_{1}$: singletons are closed;\n- Hausdorff: two points can be separated by open sets;\n- regular: a point and a closed set not containing it can be separated $\\implies$ Hausdorff;\n- **normal**: two disjoint closed sets can be separated $\\implies$ regular.\n\n**Compact Hausdorff $\\implies$ normal** (the most frequently used consequence of compactness: in a compact space two disjoint closed sets can be separated by finitely many pairs of open sets). Hence spaces such as $[0,1]$ and $\\beta I$ are normal — so Urysohn's lemma always applies there.\n\nThe **full proof** runs along two steps, \"compact $\\implies$ paracompact\" plus \"paracompact $+$ Hausdorff $\\implies$ normal\", see `thm.paracompact-hausdorff-normal`; ⚠️ **normality is not hereditary**: a subspace of a normal space need not be normal. This differs from both \"compact\" and \"Hausdorff\".",
        status: 'draft',
        basedOn: 'v0.9.3#e97ba26a',
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
        en: "The three conditions come as a package and none can be dropped: keeping only (2) and (3) gives a **$\\sigma$-ring**; weakening (3) to \"finite unions\" gives an **algebra**.\n\nFrom (2) and (3), De Morgan gives closure under **countable intersections** at once: $\\Big( \\bigcap_n A_n \\Big)^c = \\bigcup_n A_n^c \\in \\mathfrak{A}$. Hence finite unions, finite intersections, differences and symmetric differences are all available — the only thing that genuinely goes beyond an algebra is **countability**.\n\n⚠ The direction cannot be reversed: every $\\sigma$-algebra is an algebra, but an algebra need not be a $\\sigma$-algebra.\n\nCounterexample: on $X = \\mathbb{R}$, the family of all finite and cofinite sets is an algebra, while $\\mathbb{N} = \\{1\\} \\cup \\{2\\} \\cup \\{3\\} \\cup \\cdots$ is a union of countably many of its elements and is itself neither finite nor cofinite, so that algebra is not closed under countable unions.\n\nThe \"$\\sigma$\" in the notation means **countable** (from the initial letter of German Summe / French somme); it has nothing to do with the $\\sigma$ of standard deviation.\n\nWhy it is needed: countable additivity of a measure $\\mu (\\bigcup A_{n}) = \\sum \\mu (A_{n})$ requires a domain closed under **countable** operations, otherwise the two sides of the identity do not even live in the same family of sets. The whole construction of measure starts here.\n\n**Of the three axioms only one is really \"hard\"** (the other two can almost be exchanged for each other):\n\n- **Contains the whole set $\\iff$ contains the empty set**: immediate from closure under complements ($\\emptyset = X^{c}$). So writing \"contains $\\emptyset$\" or \"contains $X$\" is equivalent, **provided closure under complements is also present**.\n- **Closed under countable unions $\\iff$ closed under countable intersections**: **use De Morgan twice**: $\\bigcap_{n} A_{n} = \\bigl(\\bigcup_{n} A_{n}^{c}\\bigr)^{c}$. So of \"countable unions\" and \"countable intersections\" only one needs to be assumed — **but it must be paired with closure under complements**; without that neither follows.\n- **\"Countable unions\" cannot be weakened to \"finite unions\"**: finite unions plus complements give an **algebra** (Boolean algebra), not a $\\sigma$-algebra. The difference is substantial: the rationals can be covered in the finite-union algebra of $2^{\\mathbb{R}}$, but the countable union of the singletons $\\{q\\}$ ($= \\mathbb{Q}$) need not be — and all of measure theory needs countable unions.\n- **\"Countable\" cannot be strengthened to \"arbitrary\"**: a $\\sigma$-algebra is **not** closed under arbitrary unions. Counterexample: the Borel $\\sigma$-algebra on $\\mathbb{R}$ is closed under unions of all open sets (the open sets themselves are closed under arbitrary unions), but taking unions over **arbitrary** subfamilies escapes it (every singleton is Borel, yet an arbitrary union of them can be non-measurable, given $2^{\\aleph_{0}}$ of them — constructing a Vitali set needs the axiom of choice).\n\n⚠️ One-line mnemonic: **a $\\sigma$-algebra = \"contains the whole set + closed under complements + closed under countable unions\", and everything else is a consequence of the last two**; while \"complements + finite unions\" is only an algebra, and the gap is not small.",
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
        en: "Why **preimages** rather than images: preimages preserve intersections, unions and complements ($f^{-1}(\\bigcup E_i) = \\bigcup f^{-1}(E_i)$, etc.), whereas images lack these good properties. Measurability is therefore a condition pulled back along $f$.\n\nEquivalent formulation (when $Y$ is a topological space and $\\mathcal{N} = \\mathfrak{B}_Y$): $f$ is measurable $\\iff$ the preimage of every open set is measurable.\n\n⚠ \"Measurable on $E$\" is a relative notion: $f$ is measurable on $E$ $\\iff$ $f|_E$ is measurable with respect to the subspace $\\sigma$-algebra $\\mathcal{M}_E$.\n\n**Four characterizations, the cost being \"which family of sets is tested\"**:\n\n- preimages of **open sets** are measurable $\\iff$ preimages of **Borel sets** are measurable: $(\\Leftarrow)$ is clear; $(\\implies)$ uses the fact that preimages preserve $\\sigma$-algebra operations (Borel sets are generated by open sets).\n- $\\iff$ **all level sets $\\{x : f(x) > a\\}$ are measurable** ($a \\in \\mathbb{R}$): **this is the most-used criterion**, since one only has to test a generating family instead of all open sets. ⚠️ Using $\\{f > a\\}$ or $\\{f \\ge a\\}$ both work, **and mixing them is harmless** ($\\{f > a\\} = \\bigcup_{q \\in \\mathbb{Q}, q > a} H_q$, and each $H_q$ may be taken in either form).\n- $\\iff$ **both $f^{+}, f^{-}$ are measurable**: split a real-valued function into positive and negative parts, then handle the non-negative case with $\\{f > a\\}$.\n\n⚠️ **The necessary hypothesis is \"the target carries the Borel $\\sigma$-algebra\"**: measurability on $\\mathbb{R}$ is always relative to some $\\sigma$-algebra; for $\\overline{\\mathbb{R}}$ (including $\\pm\\infty$) **no extra convention is needed**: $\\{f = +\\infty\\} = \\bigcap_n \\{f > n\\}$ and $\\{f = -\\infty\\} = \\bigcap_n \\{f \\le -n\\}$ are automatically measurable from the level sets.\n⚠️ **A composition of measurable functions need not be measurable**: if $f$ is measurable and $g$ is Borel measurable, then $g \\circ f$ is measurable; but if $g$ is merely Lebesgue measurable this can fail — this is why \"Borel measurable\" and \"Lebesgue measurable\" must be distinguished.",
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
  },
};
