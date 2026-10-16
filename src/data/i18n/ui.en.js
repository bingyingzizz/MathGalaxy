/* ==========================================================================
   数学星图 · 界面文案英文表（T2.4）
   --------------------------------------------------------------------------
   ⭐ **键就是中文原文**（见 src/core/i18n.js 的说明）：
     调用点写 `MG.t('图例')`，英文模式查这张表，查不到就显示中文。
     好处：不用发明第二套键名，缺键只会「没翻到」，不会显示成 key 或空白。

   只收**界面外壳**：按钮 / 分区标题 / 悬停提示 / 占位符 / 状态文案。
   ⛔ 数学内容不在这里 —— 节点名走 label_en / title_en（src/data/i18n.js），
      星团名走 clusters.js 的 `en`，星系名走 regions.js 的 `en`，类型名走 config.js 的 `nameEn`。

   `{名}` = 嵌进来的名字（节点 / 星团 / 星系 / 层号），`{n}` = 数字。
   口径（作者 2026-10-16 定）：折成模板 **105** 条；逐条 236 个实例。
   拼写：**美式英语**（-ize / -ization，见 i18n/glossary.md）。
   ========================================================================== */
window.MG = window.MG || {};

MG.uiEn = {
  version: 1,
  lang: 'en',
  note: '界面外壳文案（T2.4）。键 = 中文原文；缺键回落中文。',
  strings: {

    /* ---------------------------------------------------- 顶部工具栏 */
    '主干': 'Trunk',
    '定义线': 'Def. lines',
    '名称': 'Names',
    '探索': 'Explore',
    '滚轮·缩放': 'Wheel: zoom',
    '滚轮·平移': 'Wheel: pan',
    '放大（+）': 'Zoom in (+)',
    '缩小（−）': 'Zoom out (−)',
    '适配全部节点（0）': 'Fit all nodes (0)',
    '主干模式：只留学习主线上的节点（缩小时它们的名字也先出现）':
      'Trunk mode: keep only the learning trunk (their names appear first when zoomed out)',
    '显示 / 隐藏「定义引用」蓝线': 'Show / hide the blue “definition reference” lines',
    '显示 / 隐藏节点名称': 'Show / hide node names',
    '探索模式：把「类比」这类弱边提亮（平时压得很淡）':
      'Explore mode: brighten weak edges such as analogies (kept very faint otherwise)',
    '滚轮：缩放 ⇄ 平移': 'Wheel: zoom ⇄ pan',
    '回到站点首页（bingyingzizz.github.io）': 'Back to the site home (bingyingzizz.github.io)',
    '设置：显示 / 隐藏界面元素': 'Settings: show / hide interface elements',

    /* ------------------------------------------------------ 设置窗口 */
    '设置': 'Settings',
    '关闭设置': 'Close settings',
    '关闭（Esc）': 'Close (Esc)',
    '界面元素': 'Interface elements',
    '搜索框': 'Search box',
    '图例（左下）': 'Legend (bottom left)',
    '底部说明（标题与操作提示）': 'Page note (title and controls)',
    '已读标记': 'Read marks',
    '图上显示已读标记（绿环）': 'Show read marks on the graph (green rings)',
    '清空已读进度': 'Clear reading progress',
    '去别处': 'Elsewhere',
    '⌂ 站点首页': '⌂ Site home',
    '全部概念索引（{n} 个）': 'All concepts ({n})',
    '常见问法（{n} 条）': 'Common questions ({n})',
    '读图指南与记号表': 'Reading guide & notation',
    '↗ GitHub 源码': '↗ Source on GitHub',

    /* ------------------------------------------------------ 底部说明 */
    '这是什么 · 怎么用': 'What this is · how to use it',
    '把数学概念（公理 / 定义 / 定理 / 引理 / 命题）按「星系 / 星团 / 恒星」三层组织成一张可交互的依赖图 —— 箭头是推出，黑线是等价，蓝线是定义引用，紫色虚线是跨领域类比。':
      'An interactive dependency graph of mathematical concepts (axioms / definitions / theorems / lemmas / propositions), ' +
      'organised on three scales: galaxy → cluster → star. Arrows are implications, black lines are equivalences, ' +
      'blue lines are definition references, purple dashes are cross-field analogies.',
    '拖拽平移 · 滚轮 / 双指缩放 · 点击节点聚焦 · 点击连线看推导 · 聚焦后 ←→ 沿边游走':
      'Drag to pan · wheel / pinch to zoom · click a node to focus · click an edge to see the proof · ' +
      'after focusing, ←→ walks the edges',
    '全部概念索引': 'All concepts',
    '常见问法': 'Common questions',
    '读图指南': 'Reading guide',
    '检索协议': 'Retrieval protocol',

    /* -------------------------------------------------------- 搜索框 */
    '搜索节点': 'Search nodes',
    '搜索结果': 'Search results',
    '搜索节点：定理 / 定义 / 关键词…': 'Search nodes: theorem / definition / keyword…',
    '{n} 条结果，当前第 {k} 条': '{n} results, item {k} selected',
    '没有结果': 'No results',
    '没有找到「{名}」相关的节点': 'No node matches “{名}”',
    '相关问题': 'Related questions',
    '全部结果': 'All results',
    '板块': 'Field',
    '{n} 个节点': '{n} nodes',

    /* ---------------------------------------------------------- 图例 */
    '图例': 'Legend',
    '节点（{n}）': 'Nodes ({n})',
    '连线（{n}）': 'Edges ({n})',
    '·强': '· strong',
    '·弱 {n} 条': '· weak {n}',
    '（点右上角「探索」显示）': ' (press “Explore”, top right)',
    '分层 · 显示到第 {n} 层（{k}/{m}）': 'Layer · up to {n} ({k}/{m})',
    '全部': 'All',
    '（空）': '(empty)',
    '跳过去看': 'Jump to it',
    '数学板块': 'Fields',
    '导出当前视图（{n} 点 / {k} 线）': 'Export current view ({n} nodes / {k} edges)',
    '子图 JSON': 'Subgraph JSON',
    '点色块 = 显示 / 隐藏 · 点名字 = 跳过去看 · 点层号 = 只看那一层以下':
      'Click a swatch to show / hide · click a name to jump there · click a layer to keep only that layer and below',
    '点一下：显示 / 隐藏全部「{名}」（共 {n} 个）': 'Click: show / hide all “{名}” ({n} of them)',
    '点圆点：显示 / 隐藏「{名}」；点名字：跳过去看':
      'Click the dot to show / hide “{名}”; click the name to jump there',
    '点色块：显示 / 隐藏整个「{名}」；点名字：跳过去看':
      'Click the swatch to show / hide all of “{名}”; click the name to jump there',
    '跳过去看「{名}」': 'Jump to “{名}”',
    '第 {n} 层（{k} 个）：{名}': 'Layer {n} ({k}): {名}',
    '拖动：只显示「离地基不超过 k 步」的点。': 'Drag: keep only points within k steps of the foundations. ',
    '不限层数（全部 {n} 个点）': 'No layer limit (all {n} nodes)',
    '显示到第几层': 'Show up to layer',
    '把所有节点都显示出来': 'Show every node again',
    '显示全部 {n}/{m}': 'Show all {n}/{m}',
    '等价': 'Equivalence',
    '推出 →': 'Implies →',
    '定义引用': 'Definition ref.',
    '类比': 'Analogy',
    '只看子图 · {名}（{n} 个点）': 'Subgraph only · {名} ({n} nodes)',
    '沿依赖走 {n} 跳': 'Walk {n} hops along dependencies',
    '跳地基': 'Skip foundations',
    '跳过第 0–2 层的「地基」（ZFC 公理、一阶语言这些）——它们几乎每个闭包里都有':
      'Skip the layer 0–2 “foundations” (ZFC axioms, first-order language …) — they appear in almost every closure',
    '退出子图，恢复全图': 'Leave the subgraph, back to the full map',
    '退出': 'Exit',
    '导出 SVG 矢量图：当前屏幕内的点 + 这些点之间的线（可直接放进文档）':
      'Export an SVG: the points on screen plus the edges between them (ready to drop into a document)',
    '导出 TikZ 代码（给论文用）：每个节点带 \\label{n:节点id}，正文里可以 \\ref 引用':
      'Export TikZ (for papers): every node carries \\label{n:<node-id>} so you can \\ref it in the text',
    '导出子图 JSON（给程序和 AI）：id / 类型 / 陈述 / 坐标 / 边':
      'Export subgraph JSON (for programs and AI): id / type / statement / coordinates / edges',
    '子图模式：「{名}」': 'Subgraph mode: “{名}”',
    '，共 {n} 个点（点数字改跳数，「退出」回全图）':
      ', {n} nodes in total (click a number to change the hops, “Exit” returns to the full map)',
    '主干模式：': 'Trunk mode: ',
    '只显示第 0–{n} 层：': 'Only layers 0–{n}: ',
    '现在共 {n} 个点（点图例标题栏的「显示全部」恢复）':
      '{n} nodes right now (use “show all” in the legend header to restore)',

    /* -------------------------------------------------------- 节点面板 */
    '只看它靠什么': 'What it rests on',
    '只看谁用它': 'What uses it',
    '看它周围': 'Around it',
    '引用此节点': 'Cite this node',
    '复制引文（节点 id + 内容版本 + 概念页链接）':
      'Copy the citation (node id + content version + concept-page link)',
    '已复制 ✓': 'Copied ✓',
    '请手动复制': 'Please copy manually',
    '第 {n} 层（依赖深度）· 它依赖 {n} 个 · 被 {n} 个依赖':
      'Layer {n} (dependency depth) · depends on {n} · used by {n}',
    '✓ 标记已读': '✓ Mark as read',
    '✓ 已读 · 点一下取消': '✓ Read · click to undo',
    '前置都读过了': 'all prerequisites read',
    '还差 {n} 条前置：{名}': '{n} prerequisites missing: {名}',
    '陈述': 'Statement',
    '说明 / 备注': 'Notes',
    '参考': 'References',
    '邻接': 'Neighbours',

    /* -------------------------------------------------------- 边面板 */
    '推导过程': 'Proof',
    '为什么等价': 'Why they are equivalent',
    '引用': 'Reference',
  }
};
