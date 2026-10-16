# 参与数学星图（Contributing）

> 这份文件是给**要往星图里加东西 / 改引擎 / 补英文**的人的。
> 数学内容怎么写、结构为什么是这样：见 `README.md`（细则更全）与 `policy.md`（内容准则）。
> [Jump to the English section ↓](#contributing-in-english)

---

## 一、先分清你在改哪一半

| 你在改什么 | 动哪里 | ⛔ 不许碰 |
|---|---|---|
| 加/改**数学内容**（节点、边、证明、别名、记号） | `src/data/` | `src/core/` |
| 改**引擎**（布局、渲染、交互、LOD） | `src/core/` | `src/data/` |
| 加**英文**（名字、摘要、陈述译文） | `src/data/i18n*` | 别手抄第二份中文 |

引擎只管「怎么画」，不知道有什么内容；内容只管「有什么」，不知道引擎怎么画。
**加内容只动 `src/data/`；改观感只动 `src/core/`。** 越界就是设计事故。

## 二、最常做的两件事

**加一个节点**（`src/data/packs/*.js`）：

```js
{ id: 'thm.foo', type: 'theorem', label: '短名', title: '正式名（英文名）',
  cluster: '团id', regions: ['星系id'], tags: ['标签'],
  statement: '……', notes: '……', refs: ['出处'] }
```

- **一个概念一个节点**；同一结论只收一份；只保留最通用的版本（特例写进 `notes`）。
- 定义必须**构造出来**（子集 / 幂集 / 笛卡尔积 / 商集 / 函数空间……），
  ⛔ 不许用「满足某组性质、在同构意义下唯一」引入 —— 那是公理刻画。
- **证明写在边上**（`edges[]` 的 `proof` / `proofs`），不塞进节点正文。
- 四类边：`implication`（推出）· `equivalence`（等价）· `definition`（定义引用）· `analogy`（类比，弱边，不参与分层）。
- 新加 `src/data/packs/*.js` 文件必须同时在 `index.html` 里挂 `<script>`，否则会出现
  「构建说 N 条、网页说 N−4 条」。

**加一个英文名**：在 `src/data/aliases.js` 那条 aka 里加英文写法，然后：

```bash
bun tools/i18n-backfill.mjs     # 重算 src/data/i18n.js（英文名旁挂表）
```

## 三、改完必须做的三步

```bash
bun tools/build.mjs             # 构建 + 全部硬断言
bun tools/_katexcheck-all.mjs   # 公式逐条喂真 KaTeX（必须 0 失败）
```

第三步是**亲眼看**：用 headless Edge 截图，或双击 `index.html`。⛔ 不许只凭「语法正确」就说完成。

发布（会把站点推到另一个仓库，**同时只能有一个人在跑**）：

```bash
bun tools/publish.mjs
```

## 四、提交习惯

- ⛔ **不要 `git add -A`** —— 只 add 自己改的路径。
- 中文提交信息：写进文件再 `git commit -F <文件>`（避免 BOM/编码问题）。
- 仓库保持干净：`_*`、`dist-site/`、`_pdf/`、`_tools/` 都不进版本库。

---

## Contributing in English

**What this repository is.** MathGalaxy is a zero-dependency, build-free static knowledge
graph of mathematics: open `index.html` in a browser and it runs. There is no framework, no
bundler and no npm dependency, and that is a deliberate choice, not a gap.

**Two halves that must not mix.** `src/core/` is the *engine* (layout, rendering, interaction);
`src/data/` is the *content* (nodes, edges, proofs, aliases, notation). The engine knows how to
draw but nothing about mathematics; the content knows the mathematics but nothing about drawing.
Add content only under `src/data/`; change the look only under `src/core/`.

**Adding a node** lives in `src/data/packs/*.js`:

```js
{ id: 'thm.foo', type: 'theorem', label: 'short name', title: 'full name (English name)',
  cluster: 'cluster-id', regions: ['region-id'], tags: ['tag'],
  statement: '…', notes: '…', refs: ['source'] }
```

House rules:

- **One concept per node.** A statement is recorded once; keep the most general version and
  put special cases in `notes`.
- **Every layer is constructed from the layer below** (subsets, power sets, products, quotient
  sets, function spaces, …). ⛔ Never introduce an object as "the thing satisfying these
  properties, unique up to isomorphism" — that is an axiomatic characterisation and silently
  assumes existence. Properties are theorems with proofs, not definitions.
- **Proofs live on the edges** (`edges[].proof` / `edges[].proofs`), not in the node body.
- Four edge kinds: `implication`, `equivalence`, `definition` (all strong, they form the logical
  skeleton and drive layering) and `analogy` (weak: ideas resonate, nothing is implied;
  it does not take part in layering).
- A new file under `src/data/packs/` must also be added as a `<script>` tag in `index.html`.

**The English layer.** English is generated from a single content tree — never a second copy:

| What | Where to edit | Then run |
|---|---|---|
| English name (`label_en` / `title_en`) | the `aka` list in `src/data/aliases.js` | `bun tools/i18n-backfill.mjs` |
| English abstract (hubs only, `abstract_en`) | `src/data/i18n/abstracts.en.js` | `bun tools/build.mjs` |
| English statement / notes (`statement`, `notes`) | `src/data/i18n/statements.en.js` | `bun tools/build.mjs` |
| English read docs (`*.en.md`) | `src/data/i18n/docs.en.js` | `bun tools/build.mjs` |

English text is *never* the sole source of anything: Chinese is authoritative, and every
unreviewed translation carries a status header — `draft` (machine-drafted, pending author
review), `reviewed` (checked by the author) or `stale` (the Chinese wording, or the content
version, moved on since the translation).
⭐ **Status is per item, not per file**: an abstract carries its own `status` / `basedOn`, and a
statement carries one for `statement` and one for `notes` — reviewing one field does not bless
the others (read docs carry one status each). Status is computed at build time by
`MG.enFieldStatus` from `status` + `basedOn`; you never write the banner by hand.
Node `id`s are the citation contract and are stable across versions.

**Contributing a translation.** Translations are welcome for any language — English is just
the first one. The path is deliberately narrow, because the Chinese text is the single source
of truth and a second copy would rot within a week.

1. **Pick a scope.** One node's `statement` + `notes` is a good unit; a whole cluster is a
   good batch. Start from the hubs: the top-30 by in-degree are ranked in `dist/hubs.md`.
2. **Say what you will take, before you start.** Name the node ids in an issue (or to the
   author) so that two people do not translate the same node. The author keeps a per-batch
   review list under `i18n/review-batch-N.md` — see `i18n/review-batch-1.md` for the format.
3. **Translate into the existing sidecar files** — never a second tree:
   `src/data/i18n/statements.en.js` (statements / notes), `src/data/i18n/abstracts.en.js`
   (hub abstracts), `src/data/i18n/docs.en.js` (read docs).
   ⛔ Do not create `en/` copies of packs, and do not edit `src/data/i18n.js` (generated).
4. **Follow the glossary.** `i18n/glossary.md` is generated from the code; any term already
   in it must be used as written. New terms go in through `docs.en.js` → `glossaryExtra`
   (one entry, once) rather than being invented per node.
5. **Formulas are copied verbatim.** `$…$` and `$$…$$` are not translated, not re-wrapped and
   not re-spaced — the build asserts that both languages carry the *same* formulas (same count,
   same text, and **no Han characters inside any formula**; if the Chinese has `\text{汉字}` in a
   formula, move that Han out into prose first — see `i18n/deviations.md`). Prose is translated
   literally. If the Chinese is genuinely ambiguous, leave a `⚠️ TODO(author): …` marker —
   ⛔ never guess a meaning.
6. **Write down what you were unsure about.** Every batch carries its own list:
   node id / Chinese source / English draft / new terms / open questions.
7. **Run the checks and open a PR.**
   ```bash
   bun tools/build.mjs          # build + all hard assertions (incl. the translation ones)
   bun tools/i18n-status.mjs    # per-item status: draft / reviewed / stale, and why
   bun tools/_stcheck.mjs       # every English statement fed to the real KaTeX
   ```
   New items must carry a `basedOn`; `bun tools/i18n-status.mjs --patch` prints the exact value
   (it is the fingerprint of the Chinese source you translated, so it has to be taken now).

**Review rules.** A translation lands as `status: 'draft'` with a `basedOn` marker of the form
`'<content version>#<fingerprint of the Chinese source>'`.
**Only the author flips it to `reviewed`** — that is what removes the "unreviewed draft"
banner for that item. Two things mark an item `stale` automatically: the content version moving
past `basedOn`, or **that item's Chinese source being edited** (fingerprint mismatch). The fix is
to re-read the Chinese and re-set `basedOn` to the newly printed value —
⛔ never to bump `basedOn` without re-reading, and never to delete the header.

**Attribution.** A translated node is credited as **node id + translator**. Your name (or
handle) is recorded in the batch file `i18n/review-batch-N.md` next to the ids you translated.
Content is CC BY 4.0, so you keep the copyright on your translation and grant it under the
same licence; code contributions are MIT.

**When does a full translation make sense?** Not yet. The graph is still growing, so a 100%
translation would be `stale` within a week. The trigger we agreed on is all three of:
(a) the hub set (top-30) is translated **and** reviewed; (b) the content version has not moved
for a month; (c) someone other than the author is willing to maintain the translation. Until
then translations stay per-batch, each carrying its own status header.

**Before you commit**, run:

```bash
bun tools/build.mjs             # build + all hard assertions
bun tools/_katexcheck-all.mjs   # every formula fed to the real KaTeX (must be 0 failures)
```

…and then actually look at the result (screenshot or open `index.html`). Publishing is
`bun tools/publish.mjs`; it force-pushes the site repository, so run it serially.

**Licence and citation.** Code is MIT; graph content is **CC BY 4.0** (SPDX `CC-BY-4.0`) —
attribution only, so copying, mirroring, renaming and commercial reuse are all allowed.
Citing is a **request**, not a condition: please cite a node by its `id` and the content
version. See `LICENSE` (which contains the English citation guide, templates and the
mirror-impact table); the full legal code is in `LICENSE-CC-BY-4.0.txt`.
