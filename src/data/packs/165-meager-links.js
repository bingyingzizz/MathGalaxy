/* ==========================================================================
   内容包 · 接线 + 补一个等价表述：纲（meager）与开映射定理
   --------------------------------------------------------------------------
   用户原话：「第一纲和第二纲没有链接啊，比如 Baire 纲定理那个就没链接到点里，
   还有比如说开映射定理，我看的版本怎么是 $u(E)$ 第二纲呢？」

   诊断（补前取证）：
     · `thm.baire` 的**入边只有两条**（度量空间、完备），**没有一条**从
       `def.meager-set`（第一纲 / 第二纲）或 `def.nowhere-dense`（无处稠密）来 ——
       可它的陈述正文里明明写着「第二纲」。读者从纲定理点不回纲的定义。
     · `def.meager-set` 当前只有「出边」到 `prop.baire-characterizations`，反向全无。
     · `thm.open-mapping-banach` 的陈述只写了「开映射 / 含球」两种说法，
       没有写教科书里最常见的**纲版**：「$u(E)$ 是第二纲」。而证明恰好是从
       纲出发的（先证像含内点）。

   本包**只加边**（不新增节点、不改别的节点正文），另用一段 note 补上纲版表述。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '接线：纲（第一纲 / 第二纲）与 Baire 纲定理、开映射定理',

  nodes: [],

  edges: [
    /* ---------------------------------------------------------- Baire 纲定理 */
    { id: 'dep-link.meager-baire', kind: 'definition',
      definition: 'def.meager-set', usedBy: 'thm.baire',
      note: '纲定理的结论「可数个稠密开集之交稠密」与「每个非空开集都是第二纲」是同一件事 —— 讲定理前必须先有第一纲 / 第二纲。' },
    { id: 'dep-link.nowhere-baire', kind: 'definition',
      definition: 'def.nowhere-dense', usedBy: 'thm.baire',
      note: '纲定理的等价写法「可数个无处稠密闭集之并的内部为空」直接用无处稠密。' },
    { id: 'dep-link.closedset-meager', kind: 'definition',
      definition: 'def.closed-set', usedBy: 'def.meager-set',
      note: '无处稠密的定义用「内部为空」陈述，而纲用「可数个无处稠密闭集之并」，两头都要闭集与闭包。' },

    /* ------------------------------------------------ 纲，于是 开映射（纲版表述） */
    { id: 'dep-link.meager-openmap', kind: 'definition',
      definition: 'def.meager-set', usedBy: 'thm.open-mapping-banach',
      note: '教科书里的开映射定理常写成「$u(E)$ 是第二纲」，证明的第一步正是纲：$E = \\bigcup_k \\overline{u(kB_E)}$，于是 某个闭包含内点。' },
    { id: 'dep-link.nowhere-openmap', kind: 'definition',
      definition: 'def.nowhere-dense', usedBy: 'thm.open-mapping-banach',
      note: '「像含内点」与「像不是无处稠密」是同一句话的两面 —— 用的是无处稠密的补集刻画。' },
    { id: 'dep-link.meager-closedcover', kind: 'definition',
      definition: 'def.meager-set', usedBy: 'lem.countable-closed-cover',
      note: '「可数个闭集覆盖 $X$，于是 内点之并稠密」就是纲定理的「闭集形态」，等价于「$X$ 不是第一纲」。' },
    { id: 'dep-link.meager-ubp', kind: 'definition',
      definition: 'def.meager-set', usedBy: 'thm.ubp',
      note: '一致有界原理的证明与开映射共用同一个纲论证（闭覆盖有内点）。' },
    { id: 'dep-link.meager-lcb', kind: 'definition',
      definition: 'def.meager-set', usedBy: 'thm.locally-compact-baire',
      note: '「局部紧 Hausdorff 是 Baire 空间」说的是它上面每个非空开集都是第二纲。' },

    /* ------------------------------------------------------ 无量纲的补充：无 */
  ]
});
