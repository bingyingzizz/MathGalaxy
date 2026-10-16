# 公式含汉字的陈述清单（76 条待还账）

> ⚠️ 这份清单是**待办账本**，不是例外登记（例外只在 `i18n/deviations.md`，当前 0 条）。
>
> **规则**（作者 2026-10-16 拍板，「两语言公式逐字一致」）：
> 陈述的公式里不许出现汉字 —— 汉字要**移进散文**，或换成**中英皆可的记号**。
> 这条已经写成构建硬断言：**给一个节点加 `statement_en` 时，构建会立刻检查它**。
> ⇒ 本清单里的节点**必须先改公式、再加译文**，否则构建失败。
>
> 口径：扫的是每个节点 `statement` 字段里 `$$…$$` / `$…$` 内部的 `[\u4e00-\u9fff]`。
> 现状：**0 个已翻译节点违反**（16 条英文陈述全过），下面 79 个都还没翻译。| # | 节点 | 条数 | 第一条（截断） |
|---|---|---|---|
| 1 | `ax.choice` | 1 | `\forall F [ ( \forall X \in F, X \ne \emptyset ) \to \exists` |
| 2 | `def.finchar` | 1 | `X \in \mathcal{A} \iff X\text{ 的每个有限子集都属于} \mathcal{A}` |
| 3 | `thm.hartogs` | 1 | `\forall X \exists\alpha ( \alpha \hookrightarrow  X\text{ 不成` |
| 4 | `def.complete` | 1 | `\{x_n\}\text{ 是} Cauchy\text{ 列} \implies \exists x \in X : ` |
| 5 | `def.totally-bounded` | 1 | `\forall\varepsilon > 0, \exists n\text{ 与} x_1, \ldots , x_n` |
| 6 | `def.sequentially-compact` | 1 | `\forall\{x_n\} \subseteq X, \exists\{x_{n_k}\}\text{ 与} \exi` |
| 7 | `def.compact` | 1 | `\forall\{U_i\}_{i \in I} (\text{ 每个} U_i\text{ 开且} X = \bigc` |
| 8 | `prop.compact-subset-closed` | 1 | `A\text{ 紧} \implies A\text{ 是} X\text{ 中的闭集}` |
| 9 | `prop.subset-compact-equiv` | 1 | `A\text{ 紧} \iff A\text{ 闭}\text{ 且} A\text{ 全有界}` |
| 10 | `def.fundamental-class` | 1 | `A, B \in \mathfrak{A} \implies A \setminus B\text{ 是} \mathf` |
| 11 | `prop.set-class-properties` | 1 | `\mathfrak{A} = \{ \mathcal{E}\text{ 中有限多个两两不交集合之并} \}` |
| 12 | `def.generated-sigma` | 2 | `\mathcal{M}(\mathcal{E}) := \bigcap \{ \mathfrak{A} : \mathf` |
| 13 | `def.borel` | 1 | `\mathfrak{B}_X := \mathcal{M}(\{ U \subseteq X : U\text{ 是开集` |
| 14 | `cor.borel-product` | 1 | `X_j\text{ 都可分} \implies \otimes _{j=1}^{\infty} \mathfrak{B}` |
| 15 | `def.premeasure` | 1 | `\mu(\emptyset) = 0, \quad  \{E_j\}\text{ 两两不交} \implies \mu(` |
| 16 | `def.finitely-additive` | 1 | `A, B \in \mathcal{M}\text{ 两两不交} \implies \mu(A \cup B) = \m` |
| 17 | `prop.measurable-criterion` | 1 | `f : X \to Y\text{ 可测} \iff f^{-1}(E) \in \mathcal{M}\quad  \` |
| 18 | `cor.continuous-measurable` | 1 | `f : X \to Y\text{ 连续} \implies f\text{ 是} (\mathfrak{B}_X, \` |
| 19 | `prop.measurable-product-and-realimag` | 1 | `f : X \to Y\text{ 可测} \iff f_\alpha = \pi _\alpha \circ  f\t` |
| 20 | `thm.simple-approximation` | 2 | `0 \le \varphi_1 \le \varphi_2 \le \cdots \le f, \quad  \varp` |
| 21 | `def.lplus` | 1 | `L^+ := \{ f : X \to [0, +\infty] : f\text{ 可测} \}` |
| 22 | `def.integral-simple` | 1 | `\varphi = \sum_{j=1}^{n} a_j \chi_{E_j}, \quad  a_j \ge 0, E` |
| 23 | `def.integral-nonneg` | 1 | `\int f d\mu := \sup \{ \int \varphi d\mu : 0 \le \varphi \le` |
| 24 | `thm.mct` | 1 | `f_1 \le f_2 \le \cdots, \quad  f_n \uparrow  f\text{ 逐点}, ` |
| 25 | `def.integrable` | 1 | `f\text{ 可积} \iff \int \|f\| d\mu < \infty` |
| 26 | `thm.cauchy-in-measure` | 1 | `f_n \to f\text{ 依测度}, ` |
| 27 | `prop.L1-implies-measure` | 1 | `\int \|f_n - f\| \to 0 \implies f_n \to f\text{ 依测度}` |
| 28 | `thm.egorov` | 1 | `\forall\varepsilon > 0, \exists E \subseteq X : \mu(E) < \va` |
| 29 | `cor.lusin` | 1 | `\mu(E^c) < \varepsilon,\text{ 且} f\|_E\text{ 连续}` |
| 30 | `def.signed-measure` | 1 | `\nu( \bigsqcup_j E_j ) = \sum_j \nu(E_j),\text{ 且右边的级数绝对收敛}(` |
| 31 | `prop.ac-and-variations` | 1 | `\nu \ll  \mu \iff \|\nu\| \ll  \mu \iff \nu^+ \ll  \mu\text{ 且` |
| 32 | `prop.integral-gives-ac` | 1 | `\nu\text{ 有限} \iff f \in L^1(\mu)` |
| 33 | `def.locally-integrable` | 1 | `\int_K \|f(x)\| dx < \infty\quad \text{ 对每个有界可测集} K \subseteq ` |
| 34 | `thm.lebesgue-differentiation` | 1 | `\lim_{r\to0} A_r f(x) = f(x)\quad \text{ 对} \text{a.e.} x \i` |
| 35 | `def.regular-measure` | 1 | `\nu(E) = \inf\{ \nu(U) : U\text{ 开}, E \subseteq U \}` |
| 36 | `lem.variation-monotone` | 1 | `T_F + F\quad \text{ 与}\quad  T_F - F` |
| 37 | `thm.bv-jordan` | 2 | `F \in BV \iff \operatorname{Re} F \in BV\text{ 且} \operatorn` |
| 38 | `def.nbv` | 1 | `NBV := \{ F \in BV : F\text{ 右连续},\text{ 且} F(-\infty) = 0 \` |
| 39 | `def.ac-function` | 1 | `\forall\varepsilon > 0, \exists\delta > 0 :\text{ 任意有限个两两不交的` |
| 40 | `prop.ac-iff-measure-ac` | 1 | `F\text{ 绝对连续} \iff \mu_F \ll  m` |
| 41 | `def.lp-norm` | 1 | `L^p(X, \mathcal{M}, \mu) := \{\, f : X \to \mathbb{C} : f \t` |
| 42 | `def.ae` | 1 | `\exists E \in \mathcal{M}:\ \mu(E) = 0 \quad \text{且} \quad ` |
| 43 | `thm.schroder-bernstein` | 1 | `\|A\| \le \|B\| \ \text{且}\ \|B\| \le \|A\| \implies \|A\| = \|B\|` |
| 44 | `def.product-topology` | 1 | `\prod_{i \in I} U_{i} \qquad (U_{i} \in \mathcal{T}_{i},\ \t` |
| 45 | `def.hausdorff` | 1 | `\forall x \ne y \in X,\ \exists U \ni x,\ V \ni y \ \text{开}` |
| 46 | `def.abs` | 1 | `\|x\| := \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}` |
| 47 | `def.adjunction-unit` | 2 | `\eta_{X} := \Phi_{X, F(X)}(1_{F(X)}) : X \to G F(X) \qquad (` |
| 48 | `prop.component-clopen` | 1 | `C(x) \;=\; \bigcap \{\, K \subseteq S : K \text{ 闭开},\ x \in` |
| 49 | `def.profinite` | 1 | `X \;=\; \varprojlim_{i \in I} X_{i}, \qquad X_{i} \text{ 有限离` |
| 50 | `prop.precanonical-sheaf` | 1 | `F\Bigl(\coprod_{i \in I} X_{i}\Bigr) \;\cong\; \prod_{i \in ` |
| 51 | `prop.precanonical-mono-epi` | 1 | `f \text{ 是单态射（满态射）} \iff X^{\sharp} \to Y^{\sharp} \text{ 是单` |
| 52 | `def.homotopy-category` | 1 | `\operatorname{Hom}_{\mathbf{K}(\mathcal{C})}(K, L) \;:=\; \o` |
| 53 | `prop.injective-criterion` | 1 | `M \text{ 内射} \iff M'' \text{ 内射}` |
| 54 | `cor.cg-exponential-adjoint` | 1 | `X \longmapsto k(X \times Y) \qquad \text{左伴随于} \qquad Z \lon` |
| 55 | `def.ideal` | 1 | `a x \in I \quad \text{与} \quad x a \in I.` |
| 56 | `def.cofinal-functor` | 1 | `i \downarrow F \quad \text{非空，且连通。}` |
| 57 | `def.continuous-functor` | 1 | `g^{*} : \widetilde{\mathcal{C}'} \longrightarrow \widetilde{` |
| 58 | `prop.poset-limit-join` | 1 | `\lim D = \inf D \;(\text{下确界}), \qquad \varinjlim D = \sup D` |
| 59 | `def.right-derived-functor` | 1 | `\begin{array}{ccc} K^{+}(\mathcal{A}) & \xrightarrow{\;F\;} ` |
| 60 | `thm.qcqs-chaus-equiv` | 1 | `\mathbf{CHaus}\ \simeq\ \{\text{紧 Hausdorff 空间}\} \longright` |
| 61 | `prop.cond-limits-colimits` | 1 | `\Bigl(\varinjlim_{i} X_{i}\Bigr)(S) = \Bigl(\text{层化}\bigl(S` |
| 62 | `prop.zero-object-final-criterion` | 1 | `M \text{ 是零对象} \iff M \text{ 是终对象} \iff M \text{ 是始对象}.` |
| 63 | `prop.biproduct-is-product` | 1 | `M \text{ 是} M_{1}, M_{2} \text{ 的直和} \iff (M, p_{1}, p_{2}) ` |
| 64 | `prop.additive-iff-preserves-biproduct` | 1 | `F \text{ 加法} \iff F \text{ 保零对象与所有直和} \iff F \text{ 保所有有限积} ` |
| 65 | `prop.cech-section-vanishing` | 1 | `X_{n} := X_{0} \times_{X} \cdots \times_{X} X_{0} \quad (n+1` |
| 66 | `prop.closed-map-neighborhood-basis` | 1 | `\bigl\{\, \pi^{-1}(U) \;:\; U \text{ 是 } A \text{ 在 } X \tex` |
| 67 | `prop.stone-clopen-refinement` | 1 | `C_{r} \text{ 闭开}, \qquad C_{r} \cap C_{s} = \emptyset \ (r \` |
| 68 | `prop.left-exact-criterion` | 1 | `F \text{ 左正合} \iff F \text{ 加法，且把左正合列送到左正合列}.` |
| 69 | `prop.left-exact-iff-R0` | 1 | `F \text{ 左正合} \iff \forall M \in \mathcal{A}:\ R^{0}F(M) \co` |
| 70 | `def.free-abelian-sheaf` | 1 | `\mathbb{Z}\cdot(-) : \mathcal{T} \longrightarrow \mathcal{T}` |
| 71 | `prop.hom-presheaf-sheaf` | 1 | `U \;\longmapsto\; Y(U) := \operatorname{Hom}_{/X}\bigl(\unde` |
| 72 | `prop.generator-coproduct-epi` | 1 | `G \text{ 是生成元} \iff \text{对每个 } M \in \mathcal{C},\ \exists ` |
| 73 | `prop.projective-universal-epi` | 1 | `X \text{ 是投射对象} \iff \text{每个满态射 } Y \twoheadrightarrow X \t` |
| 74 | `prop.functor-preserves-monoid-objects` | 1 | `\text{幺半群对象} \longmapsto \text{幺半群对象}, \qquad \text{群对象} \lo` |
| 75 | `prop.topology-alternative-axiom` | 1 | `R \in J(X) \implies R' \in J(X), \qquad \bigl(R' \in J(X) \t` |
| 76 | `prop.topos-morphism-from-object` | 1 | `\widehat{X}^{-1}(T) = T(X), \qquad \bigl(\widehat{X}_{!}(E)\` |
