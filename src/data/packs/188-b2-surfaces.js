/* ============================================================================
   内容包 · B2「三种曲面互认」（2026-11-04）
   ----------------------------------------------------------------------------
   审计 B2：`def.topological-manifold` / `def.smooth-manifold` / `def.regular-surface`
   三者之间**一条边都没有** —— 读者从「曲面」这个词点进去，走到哪一颗星全靠运气。

   这里补三条，方向都按真实数学写（不是随便连）：
     · 拓扑流形 → 光滑流形：光滑流形的定义**从拓扑流形开始**（Hausdorff + 第二可数 + 图卡同胚），
       再加「换卡光滑」这一层。
     · 光滑流形 → 正则参数曲面：正则参数曲面的像就是 2 维光滑流形（$C^{2}$ 参数化给出光滑图卡），
       所以它用到光滑流形的定义。
     · 拓扑流形 $\\leftrightarrow$ 正则参数曲面：**同名不同物**（内蕴 vs 外在），只记类比 ——
       与已有的 `e174.analogy`（闭曲面 $\\leftrightarrow$ 正则曲面）是同一件事的另一头。
   ========================================================================== */
(window.MG = window.MG || {}).packs = window.MG.packs || [];
window.MG.packs.push({
  name: 'B2：三种曲面的互认（拓扑流形 / 光滑流形 / 正则参数曲面）',

  nodes: [],

  edges: [
    { id: 'dep.smooth-topo', kind: 'definition', definition: 'def.topological-manifold', usedBy: 'def.smooth-manifold',
      note: '光滑流形的定义**从拓扑流形开始**：先要求 Hausdorff、第二可数、每点有同胚于 $\\mathbb{R}^{n}$ 开集的图卡，' +
        '再额外要求换卡是 $C^{\\infty}$。所以「拓扑流形」是它的底，少了它连「图卡」都无从谈起。' },
    { id: 'dep.regsurf-smooth', kind: 'definition', definition: 'def.smooth-manifold', usedBy: 'def.regular-surface',
      note: '正则参数曲面的像 $S = r(U)$ 是 **2 维光滑流形**：$(u, v) \\mapsto r(u, v)$ 本身就是一张（整体）图卡，' +
        '换卡时用参数变换的 $C^{2}$ 性。所以它用到光滑流形的定义。' },
    { id: 'ana.topo-regsurf', kind: 'analogy', a: 'def.topological-manifold', b: 'def.regular-surface',
      title: '「曲面」的两个意思：内蕴的流形 $\\leftrightarrow$ $\\mathbb{R}^{3}$ 里的参数曲面',
      note: '**同名不同物**：\n' +
        '- `def.topological-manifold`：内蕴的，只说「局部同胚于 $\\mathbb{R}^{n}$」，不假设有外部空间；\n' +
        '- `def.regular-surface`：外在地放在 $\\mathbb{R}^{3}$ 里，由参数化给出，自带法向、第二基本形式、主曲率。\n\n' +
        '两件事的桥是「正则参数曲面的像**是**光滑流形」（上一条 definition 边），但**不能反过来说**：' +
        '不是每个 2 维流形都能塞进 $\\mathbb{R}^{3}$（可定向闭曲面能、Klein 瓶不能）。\n\n' +
        '⚠ 所以这里只记类比而非依赖：一边有外部空间，一边没有。' },
  ],
});
