/* ==========================================================================
   数学星图 · 假设（hypotheses）受控词表（只给构建用）
   --------------------------------------------------------------------------
   干什么：数学工作者是按**假设**找定理的 ——「有 Hausdorff 版本吗？」「要不要选择公理？」
   「用没用到可分性？」。这些词原来全散在自由文本里，无法按假设检索。

   用法：节点的 `hypotheses: ['选择公理', …]`，值必须来自下面这张表（构建会断言）。
   ⛔ 只标「**陈述里真的作为假设出现**」的，不标「注里提到」或「这里不需要它」——
      后者是**否定信息**，写成 true 会把整个检索面弄反。

   ⚠️ 覆盖是**分批**的（审计 I6 建议先标 layer ≥ 20 的核心定理）：
      现在只标了一批「假设决定结论形态」的定理。没标的 ≠ 不需要假设，只是还没过一遍。

   `hint` 是给构建用的正则（源码态）：**陈述里命中 hint 却没标** ⇒ 进 `dist/audit.md`
   的清单（警告级，不是错）。它只是提醒人「这里可能有假设没标」，不是自动打标。
   ========================================================================== */
window.MG = window.MG || {};

MG.hypotheses = {
  version: 1,
  updated: '2026-11-03',
  list: [
    { zh: '选择公理', en: 'Axiom of Choice', hint: '选择公理|AC\\b' },
    { zh: '依赖选择', en: 'Dependent Choice', hint: '依赖选择|可数选择' },
    { zh: 'Hausdorff', en: 'Hausdorff', hint: 'Hausdorff|T_?2' },
    { zh: '第二可数', en: 'second countable', hint: '第二可数' },
    { zh: '紧', en: 'compact', hint: '紧度量|紧致|紧空间' },
    { zh: '局部紧', en: 'locally compact', hint: '局部紧' },
    { zh: '完备', en: 'complete', hint: '完备' },
    { zh: '可分', en: 'separable', hint: '可分' },
    { zh: '有限维', en: 'finite-dimensional', hint: '有限维|dim .*< ?\\infty' },
    { zh: '连通', en: 'connected', hint: '连通' },
    { zh: '可定向', en: 'orientable', hint: '可定向' },
    { zh: '局部凸', en: 'locally convex', hint: '局部凸' },
    { zh: 'σ-有限', en: 'σ-finite', hint: 'σ-有限|sigma-有限' },
    { zh: '代数闭', en: 'algebraically closed', hint: '代数闭' },
    { zh: '特征 0', en: 'characteristic 0', hint: '特征 0|特征为零|char 0' },
  ],
  /* 词 → 展示用的英文（构建与界面共用一处） */
  byZh: null,
};
