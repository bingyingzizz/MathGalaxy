/* ==========================================================================
   数学星图 · 英文文档（read 文档的英文版：reading / policy / hubs / notation）
   --------------------------------------------------------------------------
   ⚠️ 这是**内容侧**文件（src/data/），不是产物：产物 `dist/*.en.md` 由
      `tools/build.mjs` 用这里的正文 + 现算的数字/清单渲染出来。
      ⛔ 别手抄第二份 —— 要改英文，改这里，再 `bun tools/build.mjs`。

   ⭐ 状态（T1–T3 任务书 §0.4）：
      派生型（题名 / 别名 / 索引 / 元数据）= 全自动；
      **创译型（read 文档、摘要、术语表）= agent 起草 → 作者审校 → 才可标 reviewed。**
      所以 `status: 'draft'` 时每份产物第一行是状态头，⛔ 不许冒充官方版本。
      作者审校后：把 `status` 改成 `'reviewed'`、填 `reviewed: { by, date }`，状态头自动换。

   ⭐⭐ **状态只有一个来源，就是下面这两个字段：`status` 与 `basedOn`。**
      · `status`      = 'draft' | 'reviewed' —— 人写的那个开关；
      · `basedOn`     = 这份英文是从**哪个内容版本**译出来的（tools/ids.snapshot.json 的 vX.Y.Z）。
      · **stale 是算出来的**：内容版本 bump 到 `basedOn` 之外 ⇒ 状态自动变成 stale
        （不需要谁记得去改），状态头会写明「译自 v0.9.0 / 当前 v0.9.1」。
      ⛔ 状态头与页面横幅都由构建生成，一个字都不许手写；
        要翻状态就改这里一处，然后 bun tools/build.mjs。

   ⚠️ 这个文件**不挂进 index.html**：只有构建期用它（浏览器端不需要）。
      加载它的地方在 tools/build.mjs 的 loadMG()。
   ========================================================================== */
window.MG = window.MG || {};

MG.i18nDocs = {
  version: 1,
  /* draft | reviewed —— 见上面 §0.4 的规矩；stale 由构建算出来（basedOn ≠ 当前内容版本） */
  status: 'draft',
  /* 这份英文是从哪个内容版本译出来的（tools/ids.snapshot.json 的 vX.Y.Z）。
     ⚠️ 内容版本变了但英文没跟着更新 ⇒ 构建自动把它标成 stale，不是靠人记得改。 */
  basedOn: 'v0.9.0',
  drafted: '2026-10-16',
  reviewed: null,          // 审校后：{ by: '作者名', date: 'YYYY-MM-DD' }

  /* 术语表里「代码里还没有英文键」的那几条 —— 有键的一律从键生成（build.mjs），
     ⛔ 这里只补没有的，不许覆盖已有的。 */
  glossaryExtra: [
    { zh: '节点', en: 'node', note: '画布上的一颗星；一个概念一个节点' },
    { zh: '恒星', en: 'star', note: '「三层尺度」里对节点的比喻说法' },
    { zh: '依赖深度', en: 'dependency depth', note: 'layer 的中文名' },
    { zh: '强边', en: 'strong edge', note: 'implication / equivalence / definition' },
    { zh: '弱边', en: 'weak edge', note: 'analogy；不参与分层' },
    { zh: '中心天体', en: 'hub', note: 'clusters.js 的 hub 字段' },
    { zh: '定义引用', en: 'definition reference', note: '蓝色半透明线' },
    { zh: '别名', en: 'alias', note: 'aliases.js 的 aka' },
    { zh: '问题钩子', en: 'question hook', note: '别名表里的「问法」条目' },
    { zh: '深链', en: 'deep link', note: '#n=<节点id>' },
    { zh: '内容版本', en: 'content version', note: 'tools/ids.snapshot.json 里的 vX.Y.Z' },
    { zh: '概念页', en: 'concept page', note: 'nodes/<id>.html' },
    /* T2.1 拼写口径（2026-10-16 现算后定）：全库英文一律**美式拼写**，
       ⛔ 不要混英式。理由是现成的英文名里 `-ize` 有 4 处、`-ise` 0 处，
       把已有的说成错的代价更大。人名/地名保留原有变音符（Čech、Hölder、Teichmüller）。 */
    { zh: '拼写口径', en: 'spelling: American English (-ize, -ization)', note: 'T2.1 定；⛔ 不混英式 -ise / -our / centre。人名保留变音符：Čech / Hölder / Teichmüller / Radon–Nikodym' },
    { zh: '连字符人名', en: 'hyphenated names keep their hyphen', note: 'Heine-Borel / Cartan-Leray / Lebesgue–Stieltjes；aka 里 ASCII 连字符与 en dash 两种写法都收' },
  ],

  docs: {
    /* ------------------------------------------------------------- reading */
    reading: {
      title: 'MathGalaxy · How to read this map',
      body: [
        'Data starts at `{{base}}index.md`.',
        '',
        '## Three scales',
        '',
        'Galaxy (a field of mathematics) → cluster (one self-contained apparatus) →',
        'node (a theorem / definition / lemma).',
        '**A cluster is the whole set of results that exists in order to produce one usable',
        'thing.** Clusters are *not* divided by course or by source.',
        "A cluster's `hub` is its **central body** — the thing the apparatus was built to give you.",
        '',
        '## The four edge kinds',
        '',
        '- `implication` (sources → target, carries a proof), `equivalence` (a ⟺ b, proofs in',
        '  both directions), `definition` (definition → a result whose statement uses it):',
        '  these three are **strong** edges — the logical skeleton.',
        '- `analogy` is a **weak** edge: the ideas resonate, but nothing is implied; it is only',
        '  for far-away inspiration. If you use one, say so out loud ("weak analogy, not a',
        '  logical consequence"). ⚠️ Weak edges **do not take part in layering**.',
        '',
        '## layer (dependency depth)',
        '',
        'Counted from the bottom-most ZF axioms and set-theoretic notions along the longest path',
        'of "premise → what depends on it"; equivalent statements share a layer. Read it as a',
        '**study order**. ⚠️ It is dependency depth, not curriculum order.',
        '',
        '## Fields and citation',
        '',
        '`id` `type` `label` `title` `label_en` `title_en` `region` `cluster` `layer`',
        '`statement` `notes` `refs`. Cite a node by its `id`; deep link `#n=<node-id>`.',
        '',
        'Licence: content **CC BY 4.0** (SPDX `CC-BY-4.0`; attribution only — copying,',
        'mirroring and commercial reuse are allowed), code MIT. To cite, please name the node',
        '`id` and the content version: terms and templates in `LICENSE.txt`, legal code in',
        '`LICENSE-CC-BY-4.0.txt`. Notation: `notation.md`.',
      ].join('\n'),
    },

    /* -------------------------------------------------------------- policy */
    policy: {
      title: 'MathGalaxy · Content policy',
      body: [
        '## 1. Every layer is *constructed* from the layer below',
        '',
        'A new object must be built out of things that already exist (subsets, power sets,',
        'Cartesian products, quotient sets, function spaces, …).',
        '',
        '- ⛔ It is **forbidden** to introduce something as "an object satisfying the following',
        '  properties (unique up to isomorphism)" — that is an **axiomatic characterisation**,',
        '  and it quietly assumes existence. The test: does the sentence *define a new object*,',
        '  or does it *state a property of an object that already exists*?',
        '- ⛔ **Properties are theorems, not definitions**: build the object first, then attach',
        '  its properties as theorems with proofs.',
        '- ⭐ **The single exemption**: the first-order language and its formulas',
        '  (`def.first-order-language`, `def.formula`) are **meta-level** objects, more',
        '  primitive than ZFC itself.',
        '- Quick self-check: "used, but has no node / no edge" is a violation.',
        '',
        '## 2. One statement is recorded once',
        '',
        'Duplicates have been merged. Test: **if A can be said in one sentence as B (or as a',
        'special case of B), they are not two nodes.**',
        '',
        '## 3. Only the most general version is kept',
        '',
        'Weakest hypotheses, strongest conclusion; special cases go into `notes`.',
        '',
        '## 4. Clusters are divided by *apparatus*, not by course',
        '',
        'A cluster is the whole set of results that exists to produce one usable thing; keep a',
        'cluster under 40 nodes.',
        '',
        '## 5. Notation',
        '',
        'See `notation.md`; transcribe new content according to it before it enters `packs/`.',
      ].join('\n'),
    },

    /* ---------------------------------------------------------------- hubs */
    hubs: {
      title: 'MathGalaxy · Hub theorems',
      head: [
        'Ranked by **in-degree**: how many strong edges point at it. It answers one question —',
        '**which things are the real foundation and worth learning first.** (Weak edges do not',
        'count.)',
        'Data root `./`: every entry can be followed to `nodes/<id>.md`.',
      ].join('\n'),
      tail: (shown, total, withIn) =>
        `(${withIn} of ${total} nodes have at least one strong in-edge; the top ${shown} are listed; ` +
        'the full ranking is in `graph.json`.)',
    },

    /* ------------------------------------------------------------ notation */
    notation: {
      title: 'MathGalaxy · Notation',
      body: [
        'One symbol, one meaning per cluster; clashes between clusters are listed below.',
        '',
        '## Rulings',
        '',
        '$A^{c}$ complement · $\\subseteq$ inclusion · $\\subset$ strict inclusion',
        '— never `\\subsetneq` (banned).',
        '',
        '## Table',
        '',
        'Each group is one page under `notation/`; entry **names** are Chinese, the symbols',
        'are not. Whole table: `notation-full.md`.',
      ].join('\n'),
      /* 分组名（notation.js 的 groups）—— 这里只放译文，条目数由构建现算 */
      groups: {
        set: 'Logic and sets',
        order: 'Order, cardinals, ordinals',
        num: 'Number systems and real analysis',
        topo: 'Topology and metrics',
        measure: 'Measure and σ-algebras',
        integral: 'Integration and function spaces',
        layout: 'Typesetting and arrows',
        cat: 'Categories and homology',
        letters: 'Letter conventions',
      },
    },
  },
};
