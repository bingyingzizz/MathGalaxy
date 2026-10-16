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
   ⚠️ 105/236 是**作者拍板当时的快照**（那份调查在 i18n/ui-strings.md），不是实时计数；
      2026-10-16 第二轮又动过面板文案（「前置提示」改成「相关依赖的已读情况」、
      新增「独立页面」入口）⇒ 本表的键 138 → 141。要重算口径得按 ui-strings.md 的办法重跑。
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
    '界面语言：中文 / English —— 点一下切成英文':
      'Interface language: Chinese / English — click to switch to English',
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
    /* 画布名字的语言（T2.4b 一键开关）：三选一，改完整页重载 */
    '画布上的名字': 'Names on the canvas',
    '跟随界面语言': 'Follow the interface language',
    '中文名': 'Chinese names',
    '英文名（没有的回落中文）': 'English names (falls back to Chinese)',
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
    '第 {n} 层（依赖深度）· 它依赖 {k} 个 · 被 {m} 个依赖':
      'Layer {n} (dependency depth) · depends on {k} · used by {m}',
    '只留下它依赖的东西 —— 看它是靠什么撑起来的': 'Keep only what it depends on — see what holds it up',
    '只留下用到它的东西': 'Keep only what uses it',
    '两个方向都要': 'Both directions',
    '✓ 标记已读': '✓ Mark as read',
    '✓ 已读 · 点一下取消': '✓ Read · click to undo',
    /* ⚠️ 这两条的说法改过一次（2026-10-16）：原文案是
       '前置都读过了' / '还差 {n} 条前置：{名}' —— 读起来像「学完这些才能读」。
       合起来的关系（推出的前提 + 引用的定义）不构成学习顺序，见 panel.js 的注释。
       ⛔ 英文别再写 prerequisite 那个词：它会被内文跳转从单词内部截出 `site`
       （就是这轮修掉的那个 bug 的现场）。 */
    '已标记全部相关依赖': 'all related dependencies marked as read',
    '相关依赖中还有 {n} 项未标记已读：{名}':
      '{n} related dependencies not marked as read yet: {名}',
    '「相关依赖」= 推出它的前提 + 陈述里引用的定义（等价与类比不算）；这只是已读情况的记录，不代表必须先学它们。':
      '“Related dependencies” = the premisses it is derived from + definitions cited in its statement ' +
      '(equivalences and analogies do not count). This is only a record of what is marked read — ' +
      'it does not mean you must study them first.',
    '独立页面 ↗': 'Standalone page ↗',
    '在新标签页打开这个概念页（普通网页，便于复制地址与浏览器翻译）':
      'Open this concept page in a new tab (a plain web page: easy to copy the address and to translate)',
    '陈述': 'Statement',
    '说明 / 备注': 'Notes',
    '说明': 'Notes',
    '参考': 'References',
    '邻接': 'Neighbours',
    '被推出': 'implied by',
    '推出': 'implies',
    '用于': 'used by',
    '由本节点推出的结论（{n}）': 'Consequences of this node ({n})',
    '推出本节点的结论（{n}）': 'What implies this node ({n})',
    '等价命题（{n}）': 'Equivalent statements ({n})',
    '类比 / 思想相通（{n}）': 'Analogies / shared ideas ({n})',
    '⚠️ 弱边：不是逻辑蕴含，只提供联想线索': '⚠️ Weak edge: not a logical implication, only a hint for inspiration',
    '陈述中用到的定义（{n}）': 'Definitions used in the statement ({n})',
    '本定义被以下结论引用（{n}）': 'Statements that use this definition ({n})',
    '暂无': 'None yet',
    '暂无（可能是原始公理或定义）': 'None yet (it may be an axiom or a primitive definition)',
    '出现在': 'appears in',
    '的陈述中': '’s statement',
    '该结论的陈述中使用了定义「{名}」。': 'The statement uses the definition “{名}”.',
    '定义原文 · {名}': 'Definition · {名}',
    '它依赖：{名}': 'It depends on: {名}',
    '图里也有：{名}': 'Also a node in the graph: {名}',

    /* -------------------------------------------------------- 边面板 */
    '推导过程': 'Proof',
    '箭头': 'arrow',
    '为什么等价': 'Why they are equivalent',
    '引用': 'Reference',
  }
};
