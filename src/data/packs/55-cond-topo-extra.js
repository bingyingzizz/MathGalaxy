/* ==========================================================================
   内容包 · 拓扑阿贝尔群 II：结构定理与对偶字典（3 条）
   --------------------------------------------------------------------------
   §6.2 的收尾。这一批要造出的东西是：**两本把拓扑翻译成代数的字典**。

   一、局部紧阿贝尔群的结构定理（把任意对象拆成「向量空间 ⊕ 紧群 + 离散余核」）
       —— 第 8 章一切 Ext 分三类归约都靠它；
   二、Pontryagin 对偶下的两本字典（离散$\leftrightarrow$紧、挠$\leftrightarrow$Stonean、无挠$\leftrightarrow$连通）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: 'Pontryagin 对偶字典与局部紧结构定理',
  nodes: [

    {
      id: 'thm.lc-structure',
      cluster: 'cond.topo',
      type: 'theorem',
      label: '局部紧阿贝尔群结构定理',
      title: '局部紧 Hausdorff 阿贝尔群的结构：$V \\oplus K$',
      regions: ['condensed', 'topology'],
      tags: ['凝聚态数学', '局部紧阿贝尔群', '结构定理', '紧群'],
      statement: [
        '设 $M$ 是**局部紧 Hausdorff 阿贝尔群**。则 $M$ 含有一个**开**子群，它同构于',
        '',
        '$$V \\oplus K,$$',
        '',
        '其中 $V$ 是**有限维实向量空间**（看作加法群）、$K$ 是**紧 Hausdorff 阿贝尔群**。',
        '',
        '等价地说：存在正合列',
        '',
        '$$0 \\longrightarrow V \\oplus K \\longrightarrow M \\longrightarrow D \\longrightarrow 0,$$',
        '',
        '其中 $D$ 是**离散**阿贝尔群。'
      ].join('\n'),
      notes: [
        '**怎么读这条。** 局部紧 Hausdorff 阿贝尔群看着种类繁多，其实只有三种「基本块」：**离散群**、**有限维实向量空间**、**紧 Hausdorff 群**。这条定理说：任意一个这样的群，都是「$V \\oplus K$」被一个离散群扩张出来的。',
        '**为什么 $V$ 必须有限维**：实向量空间的加法群局部紧 $\\iff$ 有限维。无限维的实 Banach 空间（如 $\\ell^{2}$）**不局部紧**，所以不在结构定理的覆盖范围内。',
        '**「开子群」是什么意思**：$V \\oplus K \\subseteq M$ 是一个开子群，于是余核 $D = M/(V\\oplus K)$ 带商拓扑 —— 由于 $V \\oplus K$ 开，商是**离散**的。开性正是让商离散的原因。',
        '⭐ **它是第 8 章的引擎**。「局部紧阿贝尔群之间的高次 Ext 消失」那一步，用的就是这条定理：既然每个对象都是「离散 / 有限维实 Banach / 紧连通」三类扩张出来的，那么只要对这三类交叉验证 Ext 的消失就够了 —— 也就是把无穷多种群的情形归约成 $3 \\times 3$ 种。'
      ].join('\n\n'),
      refs: ['Le Stum, Theorem 6.2.5']
    },

    {
      id: 'prop.pontryagin-discrete-compact-duality',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '离散 与 紧 Hausdorff',
      title: 'Pontryagin 对偶把离散与紧互换',
      regions: ['condensed', 'topology'],
      tags: ['凝聚态数学', 'Pontryagin 对偶', '离散群', '紧 Hausdorff'],
      statement: [
        '设 $M$ 是局部紧 Hausdorff 阿贝尔群，$\\widehat{M} = C_{\\mathbb{Z}}(M, \\mathbb{T})$ 是它的 Pontryagin 对偶。则',
        '',
        [
          '- $M$ **离散** $\\iff$ $\\widehat{M}$ **紧 Hausdorff**；',
          '- $M$ **紧 Hausdorff** $\\iff$ $\\widehat{M}$ **离散**。'
        ].join('\n'),
        '',
        '于是对偶函子把「离散阿贝尔群」与「紧 Hausdorff 阿贝尔群」这两个范畴**互相换过来**。'
      ].join('\n'),
      notes: [
        '**为什么。** $\\mathbb{T} = \\mathbb{R}/\\mathbb{Z}$ 是紧的：从**离散**的 $M$ 到紧的 $\\mathbb{T}$ 的连续同态全体，配上紧开拓扑，自然是紧的（乘积 $\\mathbb{T}^{M}$ 紧，闭子集仍紧）；反过来，$\\widehat{M}$ 紧的时候 $M = \\widehat{\\widehat{M}}$ 就离散了。',
        '**两个范例**：$\\widehat{\\mathbb{Z}} \\cong \\mathbb{T}$（离散 $\to$ 紧）、$\\widehat{\\mathbb{T}} \\cong \\mathbb{Z}$（紧 $\to$ 离散）。',
        '⭐ **这里可以看到「用紧 Hausdorff 空间测一切」这套思路的源头**：离散群不能直接谈紧性，但它可以「变成」一个紧 Hausdorff 空间；于是「取离散群的商 / 子」这类操作在那边变成「取紧空间的闭子空间 / 商」，全部变成拓扑问题。',
        '📌 这条是 Pontryagin 那一对字典的**一半**（另一条处理挠与连通）。'
      ].join('\n\n'),
      refs: ['Le Stum, §6.2']
    },

    {
      id: 'prop.pontryagin-torsion-stone',
      cluster: 'cond.topo',
      type: 'proposition',
      label: '挠 与 Stonean，无挠 与 连通',
      title: 'Pontryagin 对偶下的挠与连通',
      regions: ['condensed', 'topology'],
      tags: ['凝聚态数学', 'Pontryagin 对偶', '挠群', 'Stonean', '连通'],
      statement: [
        '设 $M$ 是**离散**阿贝尔群，$\\widehat{M} = C_{\\mathbb{Z}}(M, \\mathbb{T})$ 是它的 Pontryagin 对偶（由另一条对偶定理，$\\widehat{M}$ 紧 Hausdorff）。则',
        '',
        [
          '- $M$ **挠**（每个元素都有有限阶）$\\iff$ $\\widehat{M}$ 是 **Stonean** 空间（极不连通的紧 Hausdorff 空间）；',
          '- $M$ **无挠** $\\iff$ $\\widehat{M}$ **连通**。'
        ].join('\n'),
        '',
        '更一般地：$M$ 的挠子群 $M_{\\mathrm{tors}}$ 对应对偶的连通分支，而 $M/M_{\\mathrm{tors}}$ 对应 $\\widehat{M}$ 的 Stonean 部分。'
      ].join('\n'),
      notes: [
        '**为什么「挠」对应「极不连通」。** 阶为 $n$ 的元素 $x$ 对应 $\\widehat{M}$ 上一条满足 $n\\chi(x) = 0$ 的取值 —— 取值落在一个有限子群 $\\mathbb{Z}/n \\subseteq \\mathbb{T}$ 里。有限离散的东西在拓扑上是**极不连通**的：整个对偶空间被「整除不到」的性质切成开闭片。',
        '**为什么「无挠」对应「连通」。** 反过来，若 $M$ 无挠（像 $\\mathbb{Z}$ 那样），对偶 $\\widehat{M}$ 就是连通的 —— 例子：$\\widehat{\\mathbb{Z}} = \\mathbb{T}$ 连通，而 $\\widehat{\\mathbb{Z}/n} = \\mathbb{Z}/n$ 是有限离散、极不连通。',
        '⭐ **为什么凝聚态数学特别在意这条**：Stonean 空间恰好是凝聚态上同调**恒为零**的那一类空间，而极不连通性又恰好对应对偶侧的挠性。于是「Stonean 上的零调性」这条 §8.1 的起点定理，在这里有了一个**纯代数**的描述方式。',
        '⚠️ 注意 $M$ 这里要求**离散** —— 一般局部紧群的对偶分析要先把结构定理用上。'
      ].join('\n\n'),
      refs: ['Le Stum, §6.2']
    }

  ],

  edges: []
});
