# Development tools · 开发工具指南

[Project overview](../README.md) · [中文首页](../README.zh-CN.md) · [Contributing](../CONTRIBUTING.md)

MathGalaxy separates mathematical data from its rendering engine. The tools below work from the repository root and use [Bun](https://bun.sh/). The browser application itself does not require Bun.

## 7. Tool reference · 工具清单

### 7.1 Query the atlas · 查询

The command-line reader uses the generated `dist/graph.json`. Rebuild after changing source data to avoid querying an outdated snapshot.

```sh
bun tools/mg.mjs find zorn
bun tools/mg.mjs show lem.zorn --proof
bun tools/mg.mjs edge eq.ac-wo
bun tools/mg.mjs deps lem.zorn --depth 2
bun tools/mg.mjs impact lem.zorn --depth 2
bun tools/mg.mjs ls
bun tools/mg.mjs stat
```

Use `path <a> <b>` to investigate directed relationships and `cluster <id>` to list a cluster. A path through a multi-premise inference does not on its own prove the conclusion; inspect the full premise set and proof.

### 7.2 Build and validate · 构建与检查

| Tool (under `tools/`) | Purpose |
| --- | --- |
| `build.mjs` | Generate the offline application and structured knowledge exports; execute build assertions. |
| `prelayout.mjs` | Deterministic layout precomputation used by the build. |
| `_katexcheck-all.mjs` | Render and check mathematical formulas with KaTeX. |
| `idstable.mjs` | Protect stable mathematical identifiers and retirement records. |
| `searchcheck.mjs` | Search regression checks. |
| `xlinkcheck.mjs` | Internal text-link matching regression checks. |
| `doccheck.mjs` | Check documented statistics against generated data. |
| `perfguard.mjs` | Check mechanical rendering and performance invariants. |
| `_slashcheck.mjs`, `dupkeys.mjs` | Detect escaping errors and duplicate keys. |
| `clustercheck.mjs` | Investigate missing references and graph structure. |
| `_proofaudit.mjs` | Identify candidate proof-coverage issues for manual review. |
| `i18n-status.mjs` | Inspect item-level translation status. |
| `hygiene.mjs` | Read-only workspace hygiene report. |

Run the applicable checks listed in the [CI workflow](../.github/workflows/check.yml) and [contribution guide](../CONTRIBUTING.md). Diagnostic flags are not proof of mathematical defects: inspect the statement, hypotheses, full argument and genuine dependencies before making a correction. A passing software check does not certify a proof.

### 7.3 Content submissions and translation · 内容投稿与翻译

Use the [Markdown submission template](../_inbox/_模板.md) for proposed mathematical content. A maintainer reviews the mathematics before running `bun tools/ingest.mjs`; `--dry` performs validation without writing. Do not self-approve a submission or manually change its generated pack.

For translation, edit the existing sidecar files and follow the [glossary](../i18n/glossary.md). Use `bun tools/i18n-status.mjs` to inspect review state and source fingerprints. Do not change review metadata merely to clear a warning.

## 8. Rendering and publication · 渲染与发布

The [performance runbook](performance-runbook.md) and [performance record](../PERFORMANCE.md) document rendering invariants, benchmark procedures and historical measurements. Use the retained instruments under [`_tools/`](../_tools/) for reproducible interaction tests, adapting machine-specific paths to the current environment. The presence of those scripts is protected by performance checks; do not delete them as scratch files.

The site generation and publishing tools are maintainer-operated. Normal contributions do not publish or deploy the site.

## 9. Evidence and review · 审核方法

- Check mathematical statements against their hypotheses and sources, especially converse implications, boundary cases and variance of categorical constructions.
- Distinguish genuine logical dependencies from incidental mentions and analogies. Do not add edges merely to increase connectivity.
- Preserve valuable special cases and genuinely different proofs.
- Check source coverage separately from graph structure; a completed cluster does not prove every item of an imported source has been represented.
- For software changes, record a reproducible baseline, change one relevant variable at a time, and compare behavior under the same conditions. Separate JavaScript submission time, frame intervals, visual correctness and actual GPU behavior.

For further mathematical and engineering requirements, consult [CONTRIBUTING.md](../CONTRIBUTING.md).

本页面向公开贡献者：工具的使用方法以当前源码为准。自动检查只负责可机械判定的约束；数学陈述、证明及直接依赖仍需单独核实。性能测试须区分实际显示效果、帧间隔和 JS 提交耗时，不能只凭一次读数判断优化成功。
