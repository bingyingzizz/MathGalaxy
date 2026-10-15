/* ==========================================================================
   数学星图 · 英文陈述与说明（statement_en / notes_en · T3.2 试点）
   --------------------------------------------------------------------------
   这是什么：把**少数枢纽节点**的陈述（statement）与说明（notes）译成英文。
   首批只有 3 条 —— 试点：证明「一条完整的英文节点」这条管道从头到尾通了。

   ⛔ 不是第二棵内容树：中文陈述仍是唯一真源（`src/data/packs/*.js`）；
      这里按 id 旁挂译文，graph.js 建图时抄到节点上。
   ⛔ 不含新命题、不含新推导：**逐句对译**，中文说什么就说什么。
   ⛔ 边的证明（`proofs/`）**不在**本批范围 —— 英文页会写明「证明仍以中文页为准」。

   ⚠️ 这是**创译型**内容：agent 起草 → 作者审校 → 才可标 reviewed。
      状态与 stale 的口径与 read 文档、摘要完全一致（单一来源 = status + basedOn）：
      内容版本一变，构建自动把它标成 stale。
   ⚠️ 这个文件**挂进 index.html**（它是节点字段来源：搜索索引要用），
      加载它的地方在 index.html；挂到节点上的地方在 src/core/graph.js。
   ========================================================================== */
window.MG = window.MG || {};

MG.i18nStatements = {
  version: 1,
  /* draft | reviewed —— stale 由构建算出来（basedOn ≠ 当前内容版本） */
  status: 'draft',
  basedOn: 'v0.9.0',
  drafted: '2026-10-16',
  reviewed: null,          // 审校后：{ by: '作者名', date: 'YYYY-MM-DD' }

  items: {
    /* ---------------------------------------------------------- 佐恩引理 */
    'lem.zorn': {
      statement_en:
        'Let $(P, \\preceq)$ be a **non-empty** poset. If every chain in $P$ has an upper bound ' +
        'in $P$, then $P$ has a **maximal element**.\n\n' +
        '$$P \\ne \\emptyset \\wedge ( \\forall C \\subseteq P, C\\text{ is a chain} \\to ' +
        '\\exists u \\in P, u\\text{ is an upper bound of } C ) \\implies \\exists m \\in P, ' +
        'm\\text{ is maximal}$$',
      notes_en:
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
    },

    /* ------------------------------------------------------ 第一同构定理 */
    'thm.first-iso': {
      statement_en:
        'Let $\\varphi : G \\to G\'$ be a **group homomorphism**. Then $\\varphi$ induces an ' +
        'isomorphism\n\n' +
        '$$G \\big/ \\ker\\varphi \\;\\cong\\; \\operatorname{im}\\varphi, \\qquad ' +
        'g \\ker\\varphi \\;\\longmapsto\\; \\varphi(g).$$\n\n' +
        'In particular: **the image of a surjective homomorphism is the quotient group** ' +
        '($G/\\ker\\varphi \\cong G\'$ when $\\varphi$ is surjective).',
      notes_en:
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
    },

    /* -------------------------------------------------------- 距离空间 */
    'def.metric-space': {
      statement_en:
        'A **metric space** is a pair $(X, d)$: $X$ is a set and ' +
        '$d : X \\times X \\to [0, +\\infty)$ is a **metric** on $X$, satisfying\n\n' +
        '- **non-degeneracy**: $d(x, y) = 0 \\iff x = y$\n' +
        '- **symmetry**: $d(x, y) = d(y, x)$\n' +
        '- **triangle inequality**: $d(x, z) \\le d(x, y) + d(y, z)$\n\n' +
        'From $d$ one defines the **open balls** $B(x, r) = \\{ y \\in X : d(x, y) < r \\}$, and ' +
        'declares $U \\subseteq X$ to be open $\\iff U$ is a union of open balls. This puts a ' +
        'topology on $X$.\n\n' +
        'Given $\\varepsilon > 0$, a set $D \\subseteq X$ is called an **$\\varepsilon$-net** if ' +
        '$\\forall x \\in X, \\exists y \\in D : d(x, y) < \\varepsilon$.',
      notes_en:
        'The open balls form a **base** for this topology. Every metric space is first ' +
        'countable and normal (hence Hausdorff).\n\n' +
        'The properties that follow fall into two classes: **compactness / closedness** depend ' +
        'only on the open sets and are **topological**; **completeness / total boundedness** ' +
        'use $d$ and are **metric**. This dividing line is the point of the whole cluster.\n\n' +
        '⚠ Completeness is **not** a topological property: $\\mathbb{R}$ and the open interval ' +
        '$(0, 1)$ are homeomorphic, yet only the first is complete.',
    },
  },
};
