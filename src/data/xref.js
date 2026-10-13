/* ==========================================================================
   数学星图 · 外部锚点（xref）
   --------------------------------------------------------------------------
   一个节点在这张图里的 id 是**图内**的名字。这里登记它在**图外**的对应条目，
   这样星图就不是孤岛：别人（人、AI、别的工具）能拿这些链接对上去，
   我们也能反过来用它们核对「这条到底是不是那个定理」。

   形态（与 aliases.js 一样：**一份数据，多个出口**）：
     MG.xref[nodeId] = { wikipedia?, nlab?, stacks?, mathlib? }
       · 值一律是**完整 URL**（可点击、可机读）
       · stacks / mathlib 先留着不填 —— 那两个站点的条目名不同名，
         没核实过的编号我不写（宁可空着，也不编）

   ⭐ 只登记「查得到、且确实是这一条」的。当前 32 条全部 HEAD 过（200）。
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
    nlab: 'https://ncatlab.org/nlab/show/Zorn%27s+lemma'
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
    wikipedia: 'https://en.wikipedia.org/wiki/Dominated_convergence_theorem'
  },
  'thm.fubini-tonelli': {
    wikipedia: 'https://en.wikipedia.org/wiki/Fubini%27s_theorem'
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
    nlab: 'https://ncatlab.org/nlab/show/sheaf'
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
  }
};
