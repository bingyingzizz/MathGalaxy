# Contributing to MathGalaxy

<a id="contributing-in-english"></a>

[中文贡献指南](#中文贡献指南) · [Notation](notation.md)

MathGalaxy welcomes mathematical corrections, new results and proofs, translations, and software improvements. Keep each contribution focused and explain its mathematical or technical purpose.

## Reporting a problem

Open an issue with the node or edge identifier (or source file), a description of the problem, and a proposed correction or reference if available. For an incorrect implication, identify all premises, the conclusion, and the gap in the argument. For software issues, include the browser, device, reproduction steps and relevant screenshots or measurements.

## Mathematical contributions

Search existing entries for equivalent statements and related results before adding a node. Follow the [notation guide](notation.md).

- State objects, hypotheses, quantifiers and conclusions precisely. Justify existence when introducing objects whose existence is not already established. Definitions by axioms or universal properties are legitimate.
- Record an equivalent statement once; preserve valuable classical special cases and genuinely different valid proofs.
- Make substantive direct dependencies explicit. A multi-premise inference must be justified from its complete premise set. Do not replace a joint inference by independent implications unless each holds.
- Put inference proofs on the corresponding edges (`proof` / `proofs`), following the existing schema. Distinguish implication, equivalence, definition reference and analogy. A non-layering implication (`layer: false`) must still be mathematically valid. Do not manufacture relations to improve connectivity.
- Use real bibliographic sources. Preserve the original-script names of Chinese and Russian mathematicians in both languages; give romanization in the node body where appropriate. Bibliographic titles and authors should follow the original source.

Edit the authoritative content in `src/data/`. A new node follows the existing schema in `src/data/packs/`, for example:

```js
{ id: 'thm.foo', type: 'theorem', label: 'short name',
  title: 'full name', cluster: 'cluster-id', regions: ['region-id'],
  tags: [], statement: '...', notes: '...', refs: ['source'] }
```

Register new packs in `index.html`. In JavaScript strings, escape LaTeX backslashes correctly (Markdown submissions in `_inbox/` use ordinary LaTeX). See [submission template](_inbox/_模板.md). Preserve stable identifiers; use the existing retirement/migration mechanism when a change is necessary.

## Translations

Chinese is the authoritative mathematical source. Use the existing sidecar files rather than a second content tree:

| Field | Source |
| --- | --- |
| English names and aliases | `src/data/aliases.js`; run `bun tools/i18n-backfill.mjs` |
| Statements and notes | `src/data/i18n/statements.en.js` |
| Hub abstracts | `src/data/i18n/abstracts.en.js` |
| Reading documents and extra glossary terms | `src/data/i18n/docs.en.js` |

Follow the [glossary](i18n/glossary.md). Preserve formulas verbatim; do not silently repair source mathematics through translation. Report source ambiguities separately rather than guessing. Record the translated item IDs, attribution, new terms and open questions in the review batch records under `i18n/`.

Maintain item-level `basedOn` and review status using the existing tooling (`bun tools/i18n-status.mjs --patch` prints fingerprints). Machine-drafted translations remain drafts unless authorized review has taken place. Never promote status or refresh a fingerprint just to clear a stale warning. Re-read the Chinese source first.

## Software contributions

Keep the engine (`src/core/`) separate from mathematical data (`src/data/`). Preserve static offline operation, existing regression checks and visual correctness. Explain the effect of changes to rendering, layout, search, interaction or caching and compare against a relevant baseline.

## Validation and pull requests

Install [Bun](https://bun.sh/). Run the relevant checks from the repository root:

```sh
bun tools/build.mjs
bun tools/_katexcheck-all.mjs
bun tools/idstable.mjs
bun tools/searchcheck.mjs
bun tools/doccheck.mjs
bun tools/xlinkcheck.mjs
bun tools/perfguard.mjs
```

For translations, also run `bun tools/i18n-status.mjs`. Install the existing local hooks with `bun tools/install-hooks.mjs`. Inspect the result in a browser for visible changes. Do not change regression baselines without justification. Software validation is not mathematical verification: explain how the argument was checked and disclose uncertainty.

Submit a focused pull request with scope, reasoning, sources and test results. Stage only your own files, not `git add -A`. Regenerate required distribution files from their authoritative sources; do not hand-edit generated output. External contributors should not run the site publishing command.

### Temporary work

Use the ignored `_tmp/<task-id>-<timestamp>/` directory for temporary scripts, screenshots, builds and logs. Keep a manifest:

```markdown
# Task ID and timestamp
- Owner / session:
- Purpose:
- Disposable outputs:
- Files proposed for promotion and destination:
- Background processes (PID and stop procedure), if any:
```

Only remove verified files belonging to your task; do not use broad deletion patterns or follow symlinks. Reusable tools should have a documented purpose. `bun tools/hygiene.mjs` provides a read-only workspace check.

Code contributions use MIT; mathematical content and translations use CC BY 4.0. Attribution and requested citation formats are described in [LICENSE](LICENSE).

---

## 中文贡献指南

欢迎提交数学订正、新结果及证明、译文修订和软件改进。每次贡献应有明确范围，并说明数学或工程上的理由。

### 报告问题

在 Issue 中给出节点、连线标识符或源码路径，描述问题并尽可能附上订正建议或出处。推导错误应说明全部前提、结论和证明缺口；软件问题应提供浏览器、设备、复现步骤及相关截图或测量结果。

### 数学内容

先检索已有的等价陈述与相关结果，遵守[记号规范](notation.md)。

- 明确数学对象、假设、量词和结论。对于尚未建立存在性的对象，应补足存在性依据；允许通过公理、性质或泛性质定义。
- 同一陈述不重复收录，保留有价值的经典特例及真正不同的有效证明。
- 明确实质用到的直接依赖。多前提推导必须由完整的前提集合证明，不能拆成不成立的独立推出。
- 推导证明写在相应边的 `proof` / `proofs` 中。区分定义引用、推出、等价与类比。不参与分层的推论（`layer: false`）也必须成立，不为提高连通度添加关系。
- 参考文献须真实。中文及俄文数学家的人名在中英文模式均保留原语言写法，必要时在节点正文给出罗马化形式；书目中的作者和书名照原文。

在 `src/data/` 修改权威源，参考上文示例及 `src/data/packs/` 中的既有数据。新增内容包必须在 `index.html` 注册。JS 字符串中的 LaTeX 反斜杠需要正确转义；Markdown 投稿使用普通 LaTeX，见[投稿模板](_inbox/_模板.md)。保持稳定的节点标识符；确需变更时使用已有的退役或迁移机制。

### 翻译

中文是权威数学源。译文维护在现有旁挂文件中，不复制第二份内容树。具体路径见上文 [Translations](#translations)。

遵循[术语表](i18n/glossary.md)，原样保留公式，准确翻译数学含义。源文有疑义时单独报告，不得猜测或通过翻译暗中修正。记录翻译条目 ID、贡献者、术语及存疑事项。

用现有工具生成源文指纹 `basedOn`，逐项维护审核状态。机器起草的译文在获得授权审核前保留 draft；不能只更新元数据来消除 stale 状态。源文变化后必须重新阅读。

### 软件改进

保持图谱引擎与数学内容分离。涉及布局、渲染、搜索、交互及缓存时，说明影响范围并与相关基线比较，保留离线运行能力、已有回归检查和视觉正确性。

### 验证与提交

安装 [Bun](https://bun.sh/)，运行上文 [Validation and pull requests](#validation-and-pull-requests) 中与改动相关的检查。译文另运行 i18n-status，界面改动须在浏览器实际查看。构建通过不代表数学证明正确，应说明论证如何核实及仍存疑点。

提交范围明确的 Pull Request，附理由、出处和测试结果。只暂存自己的文件，禁止 `git add -A`；按构建规则重新生成必要产物，不手改生成文件。外部贡献无需执行网站发布命令。

临时文件放入已忽略的 `_tmp/<任务id>-<时间戳>/`，按上文 [Temporary work](#temporary-work) 的模板记录 MANIFEST.md。只清理本任务已核实的文件；不用广泛删除模式，不跟随符号链接。`bun tools/hygiene.mjs` 仅作只读检查。

代码贡献适用 MIT 许可，数学内容及译文适用 CC BY 4.0。署名与引用指引见 [LICENSE](LICENSE)。
