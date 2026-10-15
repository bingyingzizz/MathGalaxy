/* ==========================================================================
   数学星图 · 外部锚点（xref）
   --------------------------------------------------------------------------
   一个节点在这张图里的 id 是**图内**的名字。这里登记它在**图外**的对应条目，
   这样星图就不是孤岛：别人（人、AI、别的工具）能拿这些链接对上去，
   我们也能反过来用它们核对「这条到底是不是那个定理」。

   形态（与 aliases.js 一样：**一份数据，多个出口**）：
     MG.xref[nodeId] = { wikipedia?, nlab?, stacks?, mathlib? }
       · 值一律是**完整 URL**（可点击、可机读）
       · stacks / mathlib 只填**核实过**的条目；没核实过的编号不写（宁可空着，也不编）

   ⭐ 只登记「查得到、且确实是这一条」的。核对办法见 `_tools/_xrefverify.mjs`：
      · 候选一律来自站点**自己的搜索接口**（Wikipedia 的 action=opensearch、
        nLab 的 /nlab/search），⛔ 不靠记忆拼 URL；
      · 每条真发一次请求，要求 **HTTP 200 且 <title> 对得上这个概念**；
      · 网络两条路都试（直连 / 代理由 127.0.0.1:7890）。
   ⭐ 当前 **45 条锚点**（旧 21 条 + 2026-10-16 新核 49 条里的去重结果）全部
      按上面的办法逐条核过；404 的一律**不写**（product+measure、complex+measure、
      monotone+class+theorem、Mathlib 的 Topos/Basic 都是 404，跳过）。
   ⭐ 出口：build.mjs 把 xref 并进 dist/graph.json 的每个节点，并做硬断言
      （键必须在白名单里、值必须是 http(s)、id 必须真实存在）。
   ========================================================================== */
window.MG = window.MG || {};

MG.xref = {

  /* ------------------------------------------------ 集合论 / 选择原理 */
  'ax.choice': {
    wikipedia: 'https://en.wikipedia.org/wiki/Axiom_of_choice',
    nlab: 'https://ncatlab.org/nlab/show/axiom+of+choice'
  },
  'lem.zorn': {
    wikipedia: 'https://en.wikipedia.org/wiki/Zorn%27s_lemma',
    nlab: 'https://ncatlab.org/nlab/show/Zorn%27s+lemma',
    mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/Order/Zorn.html'
  },
  'thm.cantor': {
    wikipedia: 'https://en.wikipedia.org/wiki/Cantor%27s_theorem',
    nlab: 'https://ncatlab.org/nlab/show/Cantor%27s+theorem'
  },
  'thm.wellordering': {
    wikipedia: 'https://en.wikipedia.org/wiki/Well-ordering_theorem'
  },

  /* ------------------------------------------------------------ 测度论 */
  'def.measure': {
    wikipedia: 'https://en.wikipedia.org/wiki/Measure_(mathematics)'
  },
  'thm.caratheodory': {
    wikipedia: 'https://en.wikipedia.org/wiki/Carath%C3%A9odory%27s_extension_theorem'
  },

  /* -------------------------------------------------------------- 积分 */
  'thm.mct': {
    wikipedia: 'https://en.wikipedia.org/wiki/Monotone_convergence_theorem'
  },
  'lem.fatou': {
    wikipedia: 'https://en.wikipedia.org/wiki/Fatou%27s_lemma'
  },
  'thm.dct': {
    wikipedia: 'https://en.wikipedia.org/wiki/Dominated_convergence_theorem',
    mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/MeasureTheory/Integral/DominatedConvergence.html'
  },
  'thm.fubini-tonelli': {
    wikipedia: 'https://en.wikipedia.org/wiki/Fubini%27s_theorem',
    mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/MeasureTheory/Integral/Prod.html'
  },
  'thm.lebesgue-radon-nikodym': {
    wikipedia: 'https://en.wikipedia.org/wiki/Radon%E2%80%93Nikodym_theorem'
  },
  'thm.riesz-representation-lp': {
    wikipedia: 'https://en.wikipedia.org/wiki/Riesz_representation_theorem'
  },
  'thm.holder': {
    wikipedia: 'https://en.wikipedia.org/wiki/H%C3%B6lder%27s_inequality'
  },

  /* ------------------------------------------------------------ 范畴论 */
  'def.adjoint': {
    wikipedia: 'https://en.wikipedia.org/wiki/Adjoint_functors',
    nlab: 'https://ncatlab.org/nlab/show/adjoint+functor'
  },
  'lem.yoneda': {
    wikipedia: 'https://en.wikipedia.org/wiki/Yoneda_lemma',
    nlab: 'https://ncatlab.org/nlab/show/Yoneda+lemma'
  },
  'def.grothendieck-topology': {
    wikipedia: 'https://en.wikipedia.org/wiki/Grothendieck_topology',
    nlab: 'https://ncatlab.org/nlab/show/Grothendieck+topology'
  },
  'def.sheaf': {
    wikipedia: 'https://en.wikipedia.org/wiki/Sheaf_(mathematics)',
    nlab: 'https://ncatlab.org/nlab/show/sheaf',
    mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/CategoryTheory/Sites/Sheaf.html'
  },
  'def.topos': {
    wikipedia: 'https://en.wikipedia.org/wiki/Topos',
    nlab: 'https://ncatlab.org/nlab/show/topos'
  },
  'def.abelian-category': {
    wikipedia: 'https://en.wikipedia.org/wiki/Abelian_category',
    nlab: 'https://ncatlab.org/nlab/show/abelian+category'
  },
  'def.ext': {
    wikipedia: 'https://en.wikipedia.org/wiki/Ext_functor',
    nlab: 'https://ncatlab.org/nlab/show/Ext'
  },

  /* ------------------------------------------------------------ 凝聚态 */
  'def.condensed-set': {
    wikipedia: 'https://en.wikipedia.org/wiki/Condensed_mathematics',
    nlab: 'https://ncatlab.org/nlab/show/condensed+mathematics'
  },

  /* ==========================================================================
     以下 2026-10-16 新核（T2.3）：枢纽榜前 30 里原来没有外链的那些。
     每条都：站点自己的搜索接口给候选 → 真请求一次 → 200 且 <title> 对得上。
     ========================================================================== */

  /* -------------------------------------------------- 集合论 / 序 / 基数 */
  'def.int': {
    wikipedia: 'https://en.wikipedia.org/wiki/Integer',
    nlab: 'https://ncatlab.org/nlab/show/integer'
  },
  'thm.hausdorff': {
    wikipedia: 'https://en.wikipedia.org/wiki/Hausdorff_maximal_principle',
    nlab: 'https://ncatlab.org/nlab/show/Hausdorff+maximal+principle'
  },
  'thm.cardinal-comparable': {
    wikipedia: 'https://en.wikipedia.org/wiki/Cardinal_number',
    nlab: 'https://ncatlab.org/nlab/show/cardinal+number'
  },
  'thm.real-uncountable': {
    wikipedia: 'https://en.wikipedia.org/wiki/Uncountable_set',
    nlab: 'https://ncatlab.org/nlab/show/Cantor%27s+theorem'
  },

  /* ------------------------------------------------------------ 拓扑 */
  'def.metric-space': {
    wikipedia: 'https://en.wikipedia.org/wiki/Metric_space',
    nlab: 'https://ncatlab.org/nlab/show/metric+space',
    mathlib: 'https://leanprover-community.github.io/mathlib4_docs/Mathlib/Topology/MetricSpace/Basic.html'
  },
  'thm.metric-compact-equiv': {
    wikipedia: 'https://en.wikipedia.org/wiki/Sequentially_compact_space',
    nlab: 'https://ncatlab.org/nlab/show/compact+space'
  },
  'prop.cg-coreflective': {
    wikipedia: 'https://en.wikipedia.org/wiki/Compactly_generated_space',
    nlab: 'https://ncatlab.org/nlab/show/compactly+generated+space'
  },
  'thm.quotient-product': {
    wikipedia: 'https://en.wikipedia.org/wiki/Quotient_space_(topology)',
    nlab: 'https://ncatlab.org/nlab/show/quotient+space'
  },
  'prop.chaus-reflective': {
    wikipedia: 'https://en.wikipedia.org/wiki/Stone%E2%80%93%C4%8Cech_compactification',
    nlab: 'https://ncatlab.org/nlab/show/Stone-Cech+compactification'
  },

  /* ------------------------------------------------------------ 测度 */
  'thm.monotone-class': {
    wikipedia: 'https://en.wikipedia.org/wiki/Monotone_class_theorem'
  },
  'thm.ring-monotone-sigma': {
    wikipedia: 'https://en.wikipedia.org/wiki/Sigma-ring'
  },
  'def.outer-measure': {
    wikipedia: 'https://en.wikipedia.org/wiki/Outer_measure',
    nlab: 'https://ncatlab.org/nlab/show/outer+measure'
  },
  'def.product-measure': {
    wikipedia: 'https://en.wikipedia.org/wiki/Product_measure'
  },
  'def.essential-sup': {
    wikipedia: 'https://en.wikipedia.org/wiki/Essential_supremum',
    nlab: 'https://ncatlab.org/nlab/show/essential+supremum'
  },
  'def.complex-measure': {
    wikipedia: 'https://en.wikipedia.org/wiki/Complex_measure'
  },
  'prop.nbv-derivative': {
    wikipedia: 'https://en.wikipedia.org/wiki/Bounded_variation',
    nlab: 'https://ncatlab.org/nlab/show/absolutely+continuous+function'
  },

  /* ------------------------------------------------------------ 代数 */
  'thm.first-iso': {
    wikipedia: 'https://en.wikipedia.org/wiki/First_isomorphism_theorem'
  },

  /* ------------------------------------------------------------ 范畴 */
  'def.representable': {
    wikipedia: 'https://en.wikipedia.org/wiki/Representable_functor',
    nlab: 'https://ncatlab.org/nlab/show/representable+functor'
  },
  'prop.yoneda-embedding': {
    wikipedia: 'https://en.wikipedia.org/wiki/Yoneda_embedding',
    nlab: 'https://ncatlab.org/nlab/show/Yoneda+embedding'
  },
  'prop.adjoint-full-faithful': {
    wikipedia: 'https://en.wikipedia.org/wiki/Full_and_faithful_functors',
    nlab: 'https://ncatlab.org/nlab/show/full+and+faithful+functor'
  },
  'ex.kan-extension': {
    wikipedia: 'https://en.wikipedia.org/wiki/Kan_extension',
    nlab: 'https://ncatlab.org/nlab/show/Kan+extension'
  },
  'thm.saft': {
    wikipedia: 'https://en.wikipedia.org/wiki/Adjoint_functor_theorem',
    nlab: 'https://ncatlab.org/nlab/show/adjoint+functor+theorem'
  },
  'thm.topos-abelian-grothendieck': {
    wikipedia: 'https://en.wikipedia.org/wiki/Grothendieck_category',
    nlab: 'https://ncatlab.org/nlab/show/Grothendieck+category'
  },

  /* ------------------------------------------------------------ 分析 */
  'def.cauchy-null': {
    wikipedia: 'https://en.wikipedia.org/wiki/Cauchy_sequence',
    nlab: 'https://ncatlab.org/nlab/show/Cauchy+sequence'
  }
};
