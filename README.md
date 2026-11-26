# MathGalaxy · 数学星图

**An interactive atlas of mathematical knowledge.**

[**Explore the live map**](https://bingyingzizz.github.io/mathgalaxy/) · [简体中文](README.zh-CN.md) · [Reading guide](reading.en.md) · [Contribute](CONTRIBUTING.md)

MathGalaxy organizes mathematics as a network of definitions, theorems and proofs. Rather than arranging results solely by textbook or course, it makes their logical dependencies visible: what a statement means, what is needed to prove it, and what follows from it.

Explore entire fields, follow the development of a mathematical construction, or inspect an individual result and its proof.

## Reading the map

The map has three scales: **galaxies** (fields of mathematics), **clusters** (collections of results organized around a mathematical construction or tool), and **stars** (individual mathematical statements).

| Connection | Meaning |
| --- | --- |
| Black arrow | Implication: premises jointly imply the conclusion. |
| Black line | Equivalence: inspect proofs in both directions. |
| Blue line | Definition reference: a statement uses a definition. |
| Purple dashed line | Analogy: a connection of ideas, not a logical inference. |
| Pink arrow | Valid derived implication that does not determine dependency layering. |

The implication structure is a directed hypergraph: several premises can be necessary together. A branch of a multi-premise inference does not establish the conclusion by itself.

Try [Zorn's lemma](https://bingyingzizz.github.io/mathgalaxy/#n=lem.zorn) or the [equivalence of the axiom of choice and the well-ordering theorem](https://bingyingzizz.github.io/mathgalaxy/#e=eq.ac-wo).

## Explore

- Pan by dragging, and zoom with the wheel or a two-finger pinch.
- Search names, aliases, identifiers, tags and mathematical text.
- Select nodes to read statements and dependencies; select inference edges to inspect proofs.
- Filter by field, cluster, statement type or dependency layer; track reading progress.
- Enable Explore to discover analogies across fields.
- Share the current view or export a subgraph as SVG, TikZ or JSON.

## Mathematical principles

MathGalaxy aims to make the structure of mathematics explicit. Objects should be constructed from existing objects where possible; definitions by axioms or universal properties are legitimate, but do not establish existence on their own. Substantive definitions and premises must be traceable, and proofs must justify the stated conclusions. Equivalent statements should not be duplicated unnecessarily. Valuable classical special cases and genuinely different proofs may coexist. Clusters are organized around mathematical constructions and tools.

The project is an evolving knowledge base, not a formally verified proof library. A successful software build does not certify mathematical correctness. Corrections and source references are welcome.

Chinese is the authoritative mathematical source. English translations carry item-level review and source-version information. See the [notation guide](notation.md) and [contribution guide](CONTRIBUTING.md).

## Use offline

Download [`dist/mathgalaxy.html`](dist/mathgalaxy.html) via GitHub's download/raw option and open it in a browser. This is a self-contained snapshot. Alternatively, clone the repository and open `index.html`.

The static application requires no backend service or npm installation. To regenerate the distribution, install [Bun](https://bun.sh/) and run:

```sh
bun tools/build.mjs
```

## Data and programmatic access

Stable node identifiers connect the interactive map, individual concept pages and structured exports.

| Resource | Purpose |
| --- | --- |
| [`dist/graph.json`](dist/graph.json) | Full structured graph, relationships and available proofs. |
| [`dist/index.md`](dist/index.md) | Browse fields, clusters and individual entries. |
| [`dist/alias.md`](dist/alias.md) | Resolve mathematical names and aliases to stable identifiers. |
| [`dist/nodes/`](dist/nodes/) · [`dist/proofs/`](dist/proofs/) | Individual entries and proof material. |
| [`llms.txt`](llms.txt) | Retrieval guide for language models and automated readers. |

For targeted retrieval, use the index or alias table before loading the full graph. Analogy edges must not be treated as proof dependencies.

## Repository

| Path | Role |
| --- | --- |
| `src/data/` | Mathematical content, notation and translations. |
| `src/core/` | Graph engine, layout, rendering, search and interaction. |
| `tools/` | Build, generation and validation tools. |
| `dist/` | Generated offline application and knowledge exports. |
| `site/` | Published website templates. |

The engine and mathematical content are maintained separately. Regenerate derived files from their authoritative sources.

## Contributing and citing

Reports of incorrect statements, missing hypotheses, proof gaps, omitted dependencies and translation errors are welcome. Include the node or edge identifier and the relevant mathematical argument or source. See [CONTRIBUTING.md](CONTRIBUTING.md).

When citing an entry, please include the project name, stable identifier and the content version or commit used, with a link to the published entry where available. See [LICENSE](LICENSE) for attribution and citation guidance.

## License

Code: MIT. Mathematical graph content: CC BY 4.0. See [LICENSE](LICENSE) and the [CC BY 4.0 legal text](LICENSE-CC-BY-4.0.txt). Third-party materials remain subject to their applicable terms.
