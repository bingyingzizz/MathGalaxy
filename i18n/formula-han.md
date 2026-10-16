# 公式含汉字的陈述清单（83 条待还账）

> ⚠️ 这份清单是**待办账本**，不是例外登记（例外只在 `i18n/deviations.md`，当前 0 条）。
>
> **规则**（作者 2026-10-16 拍板，「两语言公式逐字一致」）：
> 陈述的公式里不许出现汉字 —— 汉字要**移进散文**，或换成**中英皆可的记号**。
> 这条已经写成构建硬断言：**给一个节点加 `statement_en` 时，构建会立刻检查它**。
> ⇒ 本清单里的节点**必须先改公式、再加译文**，否则构建失败。
>
> 口径：扫的是每个节点 `statement` 字段里 `$$…$$` / `$…$` 内部的 `[\u4e00-\u9fff]`。
> 现状：**0 个已翻译节点违反**（11 条英文陈述全过），下面 83 个都还没翻译。

| # | 节点 id | 公式含汉字的处数 |
|---|---|---|
| 1 | `ax.choice` | 1 |
| 2 | `def.finchar` | 1 |
| 3 | `thm.wellordering` | 1 |
| 4 | `thm.hartogs` | 1 |
| 5 | `def.complete` | 1 |
| 6 | `def.totally-bounded` | 1 |
| 7 | `def.sequentially-compact` | 1 |
| 8 | `def.compact` | 1 |
| 9 | `thm.metric-compact-equiv` | 1 |
| 10 | `prop.compact-subset-closed` | 1 |
| 11 | `prop.subset-compact-equiv` | 1 |
| 12 | `def.fundamental-class` | 1 |
| 13 | `prop.set-class-properties` | 1 |
| 14 | `def.generated-sigma` | 2 |
| 15 | `thm.monotone-class` | 1 |
| 16 | `def.borel` | 1 |
| 17 | `cor.borel-product` | 1 |
| 18 | `def.premeasure` | 1 |
| 19 | `def.finitely-additive` | 1 |
| 20 | `prop.measurable-criterion` | 1 |
| 21 | `cor.continuous-measurable` | 1 |
| 22 | `prop.measurable-product-and-realimag` | 1 |
| 23 | `thm.simple-approximation` | 1 |
| 24 | `def.lplus` | 1 |
| 25 | `def.integral-simple` | 1 |
| 26 | `def.integral-nonneg` | 1 |
| 27 | `thm.mct` | 1 |
| 28 | `def.integrable` | 1 |
| 29 | `thm.cauchy-in-measure` | 1 |
| 30 | `prop.L1-implies-measure` | 1 |
| 31 | `thm.egorov` | 1 |
| 32 | `cor.lusin` | 1 |
| 33 | `def.signed-measure` | 1 |
| 34 | `prop.ac-and-variations` | 1 |
| 35 | `prop.integral-gives-ac` | 1 |
| 36 | `def.complex-measure` | 1 |
| 37 | `def.locally-integrable` | 1 |
| 38 | `thm.lebesgue-differentiation` | 1 |
| 39 | `def.regular-measure` | 1 |
| 40 | `lem.variation-monotone` | 1 |
| 41 | `thm.bv-jordan` | 1 |
| 42 | `def.nbv` | 1 |
| 43 | `def.ac-function` | 1 |
| 44 | `prop.ac-iff-measure-ac` | 1 |
| 45 | `def.lp-norm` | 1 |
| 46 | `def.essential-sup` | 1 |
| 47 | `def.ae` | 1 |
| 48 | `thm.schroder-bernstein` | 1 |
| 49 | `thm.cardinal-comparable` | 1 |
| 50 | `def.product-topology` | 1 |
| 51 | `def.hausdorff` | 1 |
| 52 | `def.abs` | 1 |
| 53 | `def.adjunction-unit` | 1 |
| 54 | `prop.adjoint-full-faithful` | 1 |
| 55 | `prop.component-clopen` | 1 |
| 56 | `def.profinite` | 1 |
| 57 | `prop.precanonical-sheaf` | 1 |
| 58 | `prop.precanonical-mono-epi` | 1 |
| 59 | `def.homotopy-category` | 1 |
| 60 | `prop.injective-criterion` | 1 |
| 61 | `cor.cg-exponential-adjoint` | 1 |
| 62 | `def.ideal` | 1 |
| 63 | `def.cofinal-functor` | 1 |
| 64 | `def.continuous-functor` | 1 |
| 65 | `prop.poset-limit-join` | 1 |
| 66 | `def.right-derived-functor` | 1 |
| 67 | `thm.qcqs-chaus-equiv` | 1 |
| 68 | `prop.cond-limits-colimits` | 1 |
| 69 | `prop.zero-object-final-criterion` | 1 |
| 70 | `prop.biproduct-is-product` | 1 |
| 71 | `prop.additive-iff-preserves-biproduct` | 1 |
| 72 | `prop.cech-section-vanishing` | 1 |
| 73 | `prop.closed-map-neighborhood-basis` | 1 |
| 74 | `prop.stone-clopen-refinement` | 1 |
| 75 | `prop.left-exact-criterion` | 1 |
| 76 | `prop.left-exact-iff-R0` | 1 |
| 77 | `def.free-abelian-sheaf` | 1 |
| 78 | `prop.hom-presheaf-sheaf` | 1 |
| 79 | `prop.generator-coproduct-epi` | 1 |
| 80 | `prop.projective-universal-epi` | 1 |
| 81 | `prop.functor-preserves-monoid-objects` | 1 |
| 82 | `prop.topology-alternative-axiom` | 1 |
| 83 | `prop.topos-morphism-from-object` | 1 |

复算：`bun _tools/_handebt.mjs`（只读，会同时报「已翻译但还含汉字」的违规者，应为 0）。
