/* ==========================================================================
   内容包 · 固态阿贝尔群（Clausen–Scholze, Lectures on Condensed Mathematics,
   Bonn 2019, Lectures V–VI）
   --------------------------------------------------------------------------
   为什么补这一块：前四讲（凝聚态集 / 阿贝尔群 / 上同调 / 局部紧群）图上已经有了，
   但**张量积**一直没有解决 —— 凝聚态张量积 $\mathbb{Z}_p \otimes \mathbb{R}$ 是病态的。
   固态理论就是给这个问题一个「非阿基米德式完备化」：

     测度 $M(S,\mathbb{Z}) = \operatorname{Hom}(C(S,\mathbb{Z}),\mathbb{Z})$
       → 自由固态 $Z[S]^\blacksquare := \varprojlim Z[S_i]$
       → 固态群（唯一延拓性质）
       → $C(S,\mathbb{Z})$ 自由（Specker–Nöbeling）⇒ $Z[S]^\blacksquare \cong \prod_I \mathbb{Z}$
       → 固态阿贝尔群构成阿贝尔子范畴，紧投射生成元 $\prod_I \mathbb{Z}$
       → 固态张量积 $\otimes^\blacksquare$

   ⚠ 出处：每个节点 `refs` 里给出讲义中的**精确编号**（Lecture / Definition / Theorem）。
     证明是我们自己重写的，不是原文逐字搬运。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态：固态阿贝尔群',
  nodes: [

    {
      id: 'def.cond-measure',
      cluster: 'cond.solid',
      type: 'definition',
      label: '整值测度',
      title: '整值测度 $M(S,\\mathbb{Z})$（Integer-Valued Measures）',
      regions: ['condensed'],
      tags: ['定义', '凝聚态', '测度', '固态'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Definition 5.1'],
      statement: [
        '设 $S$ 是 profinite 集（紧 Hausdorff 全不连通空间），$C(S, \\mathbb{Z})$ 是连续函数 $S \\to \\mathbb{Z}$ 的群（离散拓扑）。定义 $S$ 上的**整值测度**群',
        '',
        '$$M(S, \\mathbb{Z}) := \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(C(S, \\mathbb{Z}),\\ \\mathbb{Z}\\bigr).$$',
        '',
        '更一般地，对任意阿贝尔群 $A$ 记',
        '',
        '$$M(S, A) := \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(C(S, \\mathbb{Z}),\\ A\\bigr),$$',
        '',
        '特别地有 $M(S, \\mathbb{R})$ 与 $M(S, \\mathbb{R}/\\mathbb{Z})$（$\\mathbb{R}$ 值、$\\mathbb{R}/\\mathbb{Z}$ 值测度）。'
      ].join('\n'),
      notes: '⭐ 名字的来源：$C(S,\\mathbb{Z})$ 的元素是「$S$ 上的整数函数」，把测度 $\\mu$ 作用上去就得到 $\\int f\\,d\\mu$。当 $S$ 有限时 $M(S,\\mathbb{Z}) = \\mathbb{Z}^{S}$，就是「每个点放一个整数」；当 $S$ 是无限 profinite 时，$M(S,\\mathbb{Z})$ 是**形式无穷和**，一般比 $\\mathbb{Z}[S]$ 大得多。\n\n⭐ 关键的 一步是 `thm.csz-free`：$C(S,\\mathbb{Z})$ 是自由阿贝尔群，所以 $M(S,\\mathbb{Z}) \\cong \\prod_I \\mathbb{Z}$ 是**可数积以外的**大乘积 —— 这正是固态理论要的「完备化」。\n\n⚠ $C(S,\\mathbb{Z})$ 取**离散**拓扑：$S$ 紧、$\\mathbb{Z}$ 离散，连续函数的像是有限集，所以它作为抽象群是自由的（Nöbeling 定理），但一般不是有限生成。'
    },
    {
      id: 'def.solid-group',
      cluster: 'cond.solid',
      type: 'definition',
      label: '固态阿贝尔群',
      title: '固态阿贝尔群（Solid Abelian Groups）',
      regions: ['condensed'],
      tags: ['定义', '凝聚态', '固态'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Definition 5.1'],
      statement: [
        '**(i) 自由固态群。** 对 profinite 集 $S = \\varprojlim_i S_i$（$S_i$ 有限），定义',
        '',
        '$$Z[S]^{\\blacksquare} := \\varprojlim_i \\mathbb{Z}[S_i].$$',
        '',
        '有自然映射 $S = \\varprojlim_i S_i \\to \\varprojlim_i \\mathbb{Z}[S_i]$，从而 $\\mathbb{Z}[S] \\to Z[S]^{\\blacksquare}$。',
        '',
        '**(ii) 固态群。** 凝聚态阿贝尔群 $A$ 叫**固态的**，当且仅当：对每个 profinite 集 $S$ 与每个映射 $f : S \\to A$，存在**唯一**的映射 $\\tilde f : Z[S]^{\\blacksquare} \\to A$ 使',
        '',
        '$$S \\longrightarrow Z[S]^{\\blacksquare} \\xrightarrow{\\ \\tilde f\\ } A$$',
        '',
        '等于 $f$。',
        '',
        '**(iii) 固态复形。** 复形 $C \\in D(\\operatorname{Cond}(\\mathbf{Ab}))$ 叫**固态的**，当且仅当对每个 profinite 集 $S$，自然映射',
        '',
        '$$\\operatorname{RHom}(Z[S]^{\\blacksquare}, C) \\longrightarrow \\operatorname{RHom}(\\mathbb{Z}[S], C) = R\\Gamma(S, C)$$',
        '',
        '是同构。'
      ].join('\n'),
      notes: '⭐ 一句话：**「$S$ 上的函数」可以唯一地积分成 $A$ 里的元素**。这就是「完备化」在凝聚态世界里的正确形态 —— 名字叫 solid 而不是 complete，是因为它不是经典的拓扑完备（$\\mathbb{R}$ 的固态化反而是 $0$，见 `cor.solid-compact-generators`）。\n\n⭐ (ii) 等价于「$\\operatorname{Hom}(Z[S]^{\\blacksquare}, A) \\cong \\operatorname{Hom}(\\mathbb{Z}[S], A) = A(S)$」，即 free solid 群表示函子 $A \\mapsto A(S)$。\n\n⚠ (ii) 与 (iii) 的关系不是免费的：由 (ii) 只推出 $A[0]$ 固态；反过来「固态群的 $H^i$ 仍固态」要到 `thm.solid-derived` 才成立。\n\n⚠ 这里只写了**固态阿贝尔群**。模的情形要等解析环（`def.analytic-ring`）才有干净的语言。'
    },
    {
      id: 'thm.csz-free',
      cluster: 'cond.solid',
      type: 'theorem',
      label: '连续函数群是自由的',
      title: '定理：$C(S,\\mathbb{Z})$ 是自由阿贝尔群（Specker–Nöbeling）',
      regions: ['condensed'],
      tags: ['定理', '固态', '自由群'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Theorem 5.4'],
      statement: [
        '对任意 profinite 集 $S$，连续函数群',
        '',
        '$$C(S, \\mathbb{Z}) = \\{\\, f : S \\to \\mathbb{Z}\\ \\text{连续} \\,\\}$$',
        '',
        '是**自由阿贝尔群**。'
      ].join('\n'),
      notes: '⭐ 这是 Specker（1950，$S$ 为 $\\mathbb{Z}_p$ 型）与 Nöbeling（1968，一般 profinite）的结果。反直觉的地方：$C(S,\\mathbb{Z})$ 看起来像「无穷多个 $\\mathbb{Z}$ 的函数」，却**总是自由**的 —— 而它的对偶 $M(S,\\mathbb{Z}) = \\prod_I \\mathbb{Z}$ 才是大的那一头。\n\n⭐ 它是整个固态理论的支点：没有它，$Z[S]^{\\blacksquare}$ 就说不成 $\\prod_I \\mathbb{Z}$，`thm.solid-abelian` 里的「紧投射生成元」也就无从谈起。\n\n⚠ 注意 $C(S,\\mathbb{Z})$ 的**有界**版本 $C(S,\\mathbb{Z})$ 与 $C(S,\\mathbb{R})$ 行为完全不同：$C(S,\\mathbb{R})$ 一般不是自由 $\\mathbb{R}$-向量空间。'
    },
    {
      id: 'cor.free-solid-product',
      cluster: 'cond.solid',
      type: 'corollary',
      label: '自由固态群是大乘积',
      title: '推论：$Z[S]^{\\blacksquare} \\cong \\prod_I \\mathbb{Z}$',
      regions: ['condensed'],
      tags: ['推论', '固态', '乘积'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Corollary 5.5'],
      statement: [
        '对任意 profinite 集 $S$，存在集合 $I$（$|I| \\le 2^{|S|}$）与凝聚态阿贝尔群的同构',
        '',
        '$$Z[S]^{\\blacksquare} \\cong \\prod_{I} \\mathbb{Z}.$$',
        '',
        '其下垫阿贝尔群就是测度群 $M(S,\\mathbb{Z})$。'
      ].join('\n'),
      notes: '⭐ 这条把「自由固态群」翻译成「大乘积」—— 后面所有计算都靠它。特别地，固态理论里的紧投射对象不是有限生成的自由模，而是**任意乘积** $\\prod_I \\mathbb{Z}$。\n\n⚠ $I$ 一般不可数：例如 $S = \\mathbb{Z}_p$ 时 $C(S,\\mathbb{Z})$ 的自由基数是可数的，但 $M(S,\\mathbb{Z}) = \\prod_{\\mathbb{N}} \\mathbb{Z}$ 不可数。'
    },
    {
      id: 'prop.solid-hypercover',
      cluster: 'cond.solid',
      type: 'proposition',
      label: '固态化把超覆盖变成正合列',
      title: '命题：超覆盖的固态化正合（Hypercover Exactness）',
      regions: ['condensed'],
      tags: ['命题', '固态', '超覆盖'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Proposition 5.6'],
      statement: [
        '设 $S_\\bullet \\to S$ 是 profinite 集的一个 hypercover（即单纯对象 $S_\\bullet$ 配上增广 $S_\\bullet \\to S$，使得每一层的退化都给出同伦等价）。则凝聚态阿贝尔群的复形',
        '',
        '$$\\cdots \\longrightarrow Z[S_1]^{\\blacksquare} \\longrightarrow Z[S_0]^{\\blacksquare} \\longrightarrow Z[S]^{\\blacksquare} \\longrightarrow 0$$',
        '',
        '正合。'
      ].join('\n'),
      notes: '⭐ 这条说明定义里把「profinite 集」换成「extremally disconnected 集」不会改变固态群：两者由 hypercover 互相逼近。\n\n⭐ 证明用两件事：$H^i(S,\\mathbb{Z}) = 0$（$i > 0$，profinite 集上常层上同调），以及 `thm.csz-free` 把每个 $C(S_i,\\mathbb{Z})$ 写成自由群再做对偶。'
    },
    {
      id: 'prop.free-solid-solid',
      cluster: 'cond.solid',
      type: 'proposition',
      label: '自由固态群是固态的',
      title: '命题：$Z[S]^{\\blacksquare}$ 是固态的（作为模与复形）',
      regions: ['condensed'],
      tags: ['命题', '固态', '自由对象'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Proposition 5.7'],
      statement: [
        '对任意 profinite 集 $S$，$Z[S]^{\\blacksquare}$ 是固态阿贝尔群；并且 $Z[S]^{\\blacksquare}[0] \\in D(\\operatorname{Cond}(\\mathbf{Ab}))$ 是固态复形。'
      ].join('\n'),
      notes: '⭐ 这条让「自由固态群」这个叫法合法：它确实是固态范畴里的自由对象。\n\n⭐ 证明归约到 $Z[S]^{\\blacksquare} = \\mathbb{Z}$ 的情形（用 `cor.free-solid-product` 把一般情形写成 $\\prod_J \\mathbb{Z}$，再逐项算），此时两边分别是 $H^i(T,\\mathbb{Z})$ 与 $\\operatorname{RHom}(\\prod_J\\mathbb{Z},\\mathbb{Z})$，用 $0 \\to \\prod_J \\mathbb{Z} \\to \\prod_J \\mathbb{R} \\to \\prod_J \\mathbb{R}/\\mathbb{Z} \\to 0$ 和 $\\mathbb{R}$ 的可缩性算出来。'
    },
    {
      id: 'lem.solid-completion-criterion',
      cluster: 'cond.solid',
      type: 'lemma',
      label: '完备化判据',
      title: '引理：把子范畴做成阿贝尔子范畴的抽象判据（Lemma 5.9）',
      regions: ['condensed'],
      tags: ['引理', '固态', '范畴'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Lemma 5.9'],
      statement: [
        '设 $\\mathcal{A}$ 是有任意余极限的阿贝尔范畴，$\\mathcal{A}_0 \\subset \\mathcal{A}$ 是一族紧投射生成元。设 $F : \\mathcal{A}_0 \\to \\mathcal{A}$ 带自然变换 $X \\to F(X)$，满足：',
        '',
        '对任意 $X \\in \\mathcal{A}_0$、任意由 $F$ 的像的直和构成的映射 $f : Y \\to Z$ 及其核 $K$，',
        '',
        '$$\\operatorname{RHom}(F(X), K) \\longrightarrow \\operatorname{RHom}(X, K)$$',
        '',
        '是同构。令 $\\mathcal{A}_F$ 为所有满足「$\\operatorname{Hom}(F(X), Y) \\to \\operatorname{Hom}(X, Y)$ 对一切 $X \\in \\mathcal{A}_0$ 是同构」的 $Y$ 组成的全子范畴。则：',
        '',
        '**(i)** $\\mathcal{A}_F \\subset \\mathcal{A}$ 是阿贝尔子范畴，对一切极限、余极限与扩张稳定；$F(X)$（$X \\in \\mathcal{A}_0$）是 $\\mathcal{A}_F$ 的一族紧投射生成元；含入有左伴随 $L$，它是 $F$ 的唯一保余极限延拓。',
        '',
        '**(ii)** $D(\\mathcal{A}_F) \\to D(\\mathcal{A})$ 全忠实，像恰为那些满足 $\\operatorname{RHom}(F(X), C) \\cong \\operatorname{RHom}(X, C)$ 的复形；$C \\in D(\\mathcal{A}_F)$ 当且仅当所有 $H^i(C) \\in \\mathcal{A}_F$；含入有左伴随（$L$ 的左导出）。'
      ].join('\n'),
      notes: '⭐ 这是一条**纯范畴论**的引理：它把「证明某个完备化子范畴性质良好」压缩成一条 Ext-消没条件。`thm.solid-abelian` 就是它的实例（$\\mathcal{A} = \\operatorname{Cond}(\\mathbf{Ab})$，$F(\\mathbb{Z}[S]) = Z[S]^{\\blacksquare}$）。\n\n⚠ 条件里只对**核**要求同构，不对余核要求 —— 但对偶地写成余核也一样（见原文 Remark 5.11）。\n\n📌 证明是标准的同调代数：先证 $\\mathcal{A}_F$ 对核与极限封闭，再用「两个直和之间的映射」把余核也拉进来，最后用 Postnikov 截断把复形的情形归约到单点。'
    },
    {
      id: 'thm.solid-abelian',
      cluster: 'cond.solid',
      type: 'theorem',
      label: '固态群构成阿贝尔子范畴',
      title: '定理：$\\mathbf{Solid}$ 是阿贝尔子范畴，$\\prod_I\\mathbb{Z}$ 是紧投射生成元',
      regions: ['condensed'],
      tags: ['定理', '固态', '阿贝尔范畴'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Theorem 5.8 (i)'],
      statement: [
        '设 $\\mathbf{Solid} \\subset \\operatorname{Cond}(\\mathbf{Ab})$ 是固态阿贝尔群的全子范畴。则：',
        '',
        '**(i)** $\\mathbf{Solid}$ 是阿贝尔子范畴，对一切极限、余极限与扩张稳定；对象 $\\prod_I \\mathbb{Z}$（$I$ 任意）构成一族**紧投射生成元**；含入有左伴随',
        '',
        '$$M \\longmapsto M^{\\blacksquare} : \\operatorname{Cond}(\\mathbf{Ab}) \\longrightarrow \\mathbf{Solid},$$',
        '',
        '它是 $\\mathbb{Z}[S] \\mapsto Z[S]^{\\blacksquare}$ 的唯一保余极限延拓（**固态化**）。'
      ].join('\n'),
      notes: [
        '⭐ 这是整套理论的引擎：凝聚态阿贝尔群**不是**局部化的，但固态子范畴是，而且还有足够多紧投射对象 —— 于是可以像模范畴一样做同调代数。\n\n⭐ 证明路线：对 $\\mathcal{A} = \\operatorname{Cond}(\\mathbf{Ab})$、$\\mathcal{A}_0 = \\{\\mathbb{Z}[S] : S\\ \\text{extremally disconnected}\\}$ 验证 `lem.solid-completion-criterion` 的条件。关键计算是：对由 $\\prod_I \\mathbb{Z}$ 的直和构成的复形 $C$，',
        '',
        '$$\\operatorname{RHom}(Z[S]^{\\blacksquare}, C) \\cong R\\Gamma(S, C).$$',
        '',
        '它是 Lecture VI 的主计算（把 $C$ 换成 $C \\to C_{\\mathbb{R}} \\to C_{\\mathbb{R}/\\mathbb{Z}}$，再用紧阿贝尔群的两步消解与 $\\mathbb{R}$-模的可缩性）。\n\n⚠ 细节在原文 Lecture VI（pp. 38–41），我们只在这里给出结构与关键计算。'
      ].join('\n'),
    },
    {
      id: 'thm.solid-derived',
      cluster: 'cond.solid',
      type: 'theorem',
      label: '固态复形与导出范畴',
      title: '定理：$D(\\mathbf{Solid}) \\subset D(\\operatorname{Cond}(\\mathbf{Ab}))$ 全忠实',
      regions: ['condensed'],
      tags: ['定理', '固态', '导出范畴'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture V, Theorem 5.8 (ii)'],
      statement: [
        '**(ii)** 函子 $D(\\mathbf{Solid}) \\to D(\\operatorname{Cond}(\\mathbf{Ab}))$ 全忠实，其本质像恰为 $D(\\operatorname{Cond}(\\mathbf{Ab}))$ 中的固态复形。复形 $C$ 固态当且仅当所有 $H^i(C)$ 都是固态阿贝尔群。含入有左伴随',
        '',
        '$$C \\longmapsto C^{L\\blacksquare} : D(\\operatorname{Cond}(\\mathbf{Ab})) \\longrightarrow D(\\mathbf{Solid}),$$',
        '',
        '它是 $M \\mapsto M^{\\blacksquare}$ 的左导出函子。'
      ].join('\n'),
      notes: '⭐ 这条把「固态」从对象层面抬到复形层面：不必逐项检查，只看上同调。\n\n⚠ 与 (i) 合起来才是完整的 Theorem 5.8；这里拆成两个节点是因为它们的用途不同 —— (i) 用于构造，(ii) 用于计算。\n\n⭐ 推论：$\\mathbf{Solid}$ 的导出范畴可以当成 $D(\\operatorname{Cond}(\\mathbf{Ab}))$ 的一个**反射**全子范畴，反射函子就是 $C \\mapsto C^{L\\blacksquare}$。'
    },
    {
      id: 'cor.solid-compact-generators',
      cluster: 'cond.solid',
      type: 'corollary',
      label: '固态的紧投射对象',
      title: '推论：紧投射对象恰为 $\\prod_I\\mathbb{Z}$；$D(\\mathbf{Solid})^\\omega \\simeq D^b(\\mathbb{Z})^{\\mathrm{op}}$',
      regions: ['condensed'],
      tags: ['推论', '固态', '紧对象'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VI, Corollary 6.1'],
      statement: [
        '**(i)** $\\mathbf{Solid}$ 的紧投射对象恰为形如 $\\prod_I \\mathbb{Z}$ 的群（$I$ 任意）。',
        '',
        '**(ii)** $D(\\mathbf{Solid})$ 由紧对象生成，紧对象是各项为 $\\prod_I \\mathbb{Z}$ 的有界复形；函子',
        '',
        '$$D^b(\\mathbb{Z})^{\\mathrm{op}} \\longrightarrow D(\\mathbf{Solid})^\\omega, \\qquad C \\longmapsto \\operatorname{RHom}(C, \\mathbb{Z})$$',
        '',
        '是范畴等价。',
        '',
        '**(iii)** $\\mathbb{R}$ 的导出固态化消失：$\\mathbb{R}^{L\\blacksquare} = 0$。'
      ].join('\n'),
      notes: '⭐ (iii) 是「非阿基米德完备化」最刺眼的地方：$\\mathbb{R}$ 在固态意义下**完备化成 $0$**。这不是 bug —— 固态理论是为 $p$-进/解析几何设计的，阿基米德方向要另做（Clausen–Scholze 后来的“analytic stacks”里用液态/解析环处理）。\n\n⚠ 对照：$\\mathbb{Z}_p$ 固态化后还是自己（$p$-进完备），$\\mathbb{R}$ 却没了 —— 「solid」不能译成「完备」。'
    },
    {
      id: 'thm.solid-tensor',
      cluster: 'cond.solid',
      type: 'theorem',
      label: '固态张量积',
      title: '定理：$\\mathbf{Solid}$ 上的对称幺半张量积 $\\otimes^{\\blacksquare}$',
      regions: ['condensed'],
      tags: ['定理', '固态', '张量积'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VI, Theorem 6.2'],
      statement: [
        '**(i)** $\\mathbf{Solid}$ 上有唯一的对称幺半张量积 $\\otimes^{\\blacksquare}$，使固态化函子 $M \\mapsto M^{\\blacksquare}$ 对称幺半；具体地',
        '',
        '$$M \\otimes^{\\blacksquare} N := (M \\otimes N)^{\\blacksquare}.$$',
        '',
        '**(ii)** $D(\\mathbf{Solid})$ 上有唯一的对称幺半结构 $\\otimes^{L\\blacksquare}$，使 $C \\mapsto C^{L\\blacksquare}$ 对称幺半；它是 $\\otimes^{\\blacksquare}$ 的左导出。'
      ].join('\n'),
      notes: '⭐ 这是整套理论**要造的那个东西**：一个行为良好的完备张量积。对照：经典的 $\\mathbb{Z}_p \\hat\\otimes \\mathbb{R}$ 没有好定义，而 $\\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{R} = 0$（见 `ex.solid-tensor-computations`）。\n\n⚠ 唯一性来自「保余极限的函子由自由对象上的值决定」；存在性要验证 $(M \\otimes N)^{\\blacksquare} \\to (M^{\\blacksquare} \\otimes N^{\\blacksquare})^{\\blacksquare}$ 是同构，归约到 $M = \\mathbb{Z}[S]$、$N = \\mathbb{Z}[T]$ 后用 `cor.solid-compact-generators` 的 (iv) 型计算。'
    },
    {
      id: 'prop.solid-product-tensor',
      cluster: 'cond.solid',
      type: 'proposition',
      label: '大乘积的固态张量积',
      title: '命题：$\\prod_I\\mathbb{Z} \\otimes^{L\\blacksquare} \\prod_J\\mathbb{Z} \\cong \\prod_{I\\times J}\\mathbb{Z}$',
      regions: ['condensed'],
      tags: ['命题', '固态', '张量积'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VI, Proposition 6.3'],
      statement: [
        '设 $M = \\prod_I \\mathbb{Z}$、$N = \\prod_J \\mathbb{Z}$。则',
        '',
        '$$M \\otimes^{L\\blacksquare} N \\cong \\prod_{I \\times J} \\mathbb{Z},$$',
        '',
        '特别地 $M \\otimes^{L\\blacksquare} N$ 集中在同调次数 $0$。'
      ].join('\n'),
      notes: '⭐ 这条说明固态张量积在**紧投射对象**上就是「指标集相乘」—— 与有限自由模的张量积完全一致，只是允许无穷乘积。\n\n⭐ 证明：把自由阿贝尔群写成 $C(S,\\mathbb{Z})$ 的收缩，归约到 $C(S,\\mathbb{Z}) \\otimes C(T,\\mathbb{Z}) = C(S \\times T, \\mathbb{Z})$，再用 $\\otimes^{L\\blacksquare}$ 的幺半性。'
    },
    {
      id: 'ex.solid-tensor-computations',
      cluster: 'cond.solid',
      type: 'example',
      label: '固态张量积的计算',
      title: '例：$\\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{R} = 0$ 及其它',
      regions: ['condensed'],
      tags: ['例', '固态', '张量积'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VI, Example 6.4'],
      statement: [
        '设 $p \\ne \\ell$ 是两个素数。则',
        '',
        '$$\\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{R} = 0, \\qquad \\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{Z}_\\ell = 0, \\qquad \\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{Z}_p = \\mathbb{Z}_p,$$',
        '',
        '$$\\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{Z}[[T]] = \\mathbb{Z}_p[[T]], \\qquad \\mathbb{Z}[[U]] \\otimes^{L\\blacksquare} \\mathbb{Z}[[T]] = \\mathbb{Z}[[U,T]].$$'
      ].join('\n'),
      notes: '⭐ 读法：固态张量积**同时读取两个因子的 $I$-进拓扑，再把它们合起来**。$\\mathbb{Z}_p$ 自带 $p$-进完备，$\\mathbb{Z}[[T]]$ 自带 $T$-进完备，合起来就是 $\\mathbb{Z}_p[[T]]$。\n\n⚠ 第一条（$\\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{R} = 0$）不是「算错」：它等于说 $\\mathbb{R}$ 的固态化是 $0$（`cor.solid-compact-generators` (iii)）。\n\n📌 推导顺序：最后一条由 `prop.solid-product-tensor` 得到；往上是商掉 $U - p$、$T - \\ell$、$T - p$ 得到的。'
    }
  ],

  edges: [

    {
      id: 'imp.csz-free',
      kind: 'implication',
      sources: ['def.profinite', 'def.cond-measure'],
      target: 'thm.csz-free',
      title: 'profinite 集的结构 $\\implies$ $C(S,\\mathbb{Z})$ 自由',
      proof: [
        '把 $S$ 嵌入某个乘积 $\\prod_{I}\\{0,1\\}$，并给 $I$ 一个良序，写成序数 $\\lambda$。对 $\\lambda$ 作超限归纳。',
        '',
        '**极限序数。** $S$ 是诸 $S_\\mu$（$\\mu < \\lambda$）的滤过极限，$C(S,\\mathbb{Z}) = \\varinjlim_\\mu C(S_\\mu,\\mathbb{Z})$ 是自由群的滤过余极限，仍自由。',
        '',
        '**后继序数 $\\lambda = \\rho + 1$。** 设 $S \\subset S_\\rho \\times \\{0,1\\}$，令 $S_i = S \\cap (S_\\rho \\times \\{i\\})$（$i = 0,1$），$S\' = S_0 \\cap S_1$。有短正合列',
        '',
        '$$0 \\longrightarrow C(S_\\rho, \\mathbb{Z}) \\longrightarrow C(S_\\rho, \\mathbb{Z}) \\longrightarrow C(S\', \\mathbb{Z}) \\longrightarrow 0,$$',
        '',
        '第二个箭头是「在 $S\' \\times \\{1\\}$ 与 $S\' \\times \\{0\\}$ 上取值之差」。由归纳假设 $C(S_\\rho,\\mathbb{Z})$ 与 $C(S\',\\mathbb{Z})$ 都自由，且自由群的满射分裂，故中间项自由。取基时按「从 $e_\\rho$ 出发的单项式」作字典序，可把两边的基拼起来。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.free-solid-product',
      kind: 'implication',
      sources: ['thm.csz-free'],
      target: 'cor.free-solid-product',
      title: '$C(S,\\mathbb{Z})$ 自由 $\\implies$ $Z[S]^{\\blacksquare} \\cong \\prod_I\\mathbb{Z}$',
      proof: [
        '由 `thm.csz-free` 取同构 $C(S,\\mathbb{Z}) \\cong \\bigoplus_I \\mathbb{Z}$，则',
        '',
        '$$Z[S]^{\\blacksquare} = \\varprojlim_i \\mathbb{Z}[S_i] = \\varprojlim_i \\operatorname{Hom}(C(S_i,\\mathbb{Z}), \\mathbb{Z}) = \\operatorname{Hom}\\Bigl(\\varinjlim_i C(S_i,\\mathbb{Z}),\\ \\mathbb{Z}\\Bigr),$$',
        '',
        '而 $\\varinjlim_i C(S_i,\\mathbb{Z}) = C(S,\\mathbb{Z})$（连续函数由有限商决定）。于是',
        '',
        '$$Z[S]^{\\blacksquare} \\cong \\operatorname{Hom}\\Bigl(\\bigoplus_I \\mathbb{Z},\\ \\mathbb{Z}\\Bigr) \\cong \\prod_I \\mathbb{Z}. \\blacksquare$$'
      ].join('\n')
    },
    {
      id: 'imp.solid-hypercover',
      kind: 'implication',
      sources: ['thm.csz-free', 'def.cond-measure'],
      target: 'prop.solid-hypercover',
      title: '常层上同调消没 $\\implies$ 固态化正合',
      proof: [
        '对 hypercover $S_\\bullet \\to S$，有正合列',
        '',
        '$$0 \\to C(S,\\mathbb{Z}) \\to C(S_0,\\mathbb{Z}) \\to C(S_1,\\mathbb{Z}) \\to \\cdots,$$',
        '',
        '因为 $H^i(S,\\mathbb{Z}) = 0$（$i > 0$，profinite 集上常层上同调）。由 `thm.csz-free` 每一项都自由，取 $\\operatorname{RHom}(-,\\mathbb{Z})$ 得',
        '',
        '$$\\cdots \\to \\operatorname{Hom}(C(S_1,\\mathbb{Z}),\\mathbb{Z}) \\to \\operatorname{Hom}(C(S_0,\\mathbb{Z}),\\mathbb{Z}) \\to \\operatorname{Hom}(C(S,\\mathbb{Z}),\\mathbb{Z}) \\to 0,$$',
        '',
        '即 $\\cdots \\to Z[S_1]^{\\blacksquare} \\to Z[S_0]^{\\blacksquare} \\to Z[S]^{\\blacksquare} \\to 0$ 正合。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.free-solid-solid',
      kind: 'implication',
      sources: ['cor.free-solid-product', 'thm.csz-free', 'prop.solid-hypercover'],
      target: 'prop.free-solid-solid',
      title: '大乘积 + $\\mathbb{R}$ 可缩 $\\implies$ 自由固态群固态',
      proof: [
        '要证对一切 profinite $T$，$\\operatorname{RHom}(Z[T]^{\\blacksquare}, Z[S]^{\\blacksquare}) \\cong \\operatorname{RHom}(\\mathbb{Z}[T], Z[S]^{\\blacksquare})$。由 `cor.free-solid-product` 可设 $Z[S]^{\\blacksquare} = \\mathbb{Z}$（一般情形是 $\\prod$ 的直和，逐项算）。此时左边用',
        '',
        '$$0 \\to \\prod_J \\mathbb{Z} \\to \\prod_J \\mathbb{R} \\to \\prod_J \\mathbb{R}/\\mathbb{Z} \\to 0$$',
        '',
        '计算：$\\prod_J \\mathbb{R}$ 是凝聚态 $\\mathbb{R}$-模，故 $\\operatorname{RHom}(\\prod_J \\mathbb{R}, \\mathbb{Z}) = 0$；而 $\\operatorname{RHom}(\\prod_J \\mathbb{R}/\\mathbb{Z}, \\mathbb{Z}) = \\bigoplus_J \\mathbb{Z}[-1]$。合起来',
        '',
        '$$\\operatorname{RHom}(\\prod_J \\mathbb{Z},\\ \\mathbb{Z}) = \\bigoplus_J \\mathbb{Z}.$$',
        '',
        '右边是 $R\\Gamma(T,\\mathbb{Z}) = C(T,\\mathbb{Z})$（$H^{>0} = 0$），由 `thm.csz-free` 也等于 $\\bigoplus_J \\mathbb{Z}$。两边一致。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.solid-abelian',
      kind: 'implication',
      sources: ['lem.solid-completion-criterion', 'prop.free-solid-solid', 'cor.free-solid-product'],
      target: 'thm.solid-abelian',
      title: '完备化判据 + 关键计算 $\\implies$ $\\mathbf{Solid}$ 是阿贝尔子范畴',
      proof: [
        '在 `lem.solid-completion-criterion` 中取 $\\mathcal{A} = \\operatorname{Cond}(\\mathbf{Ab})$、$\\mathcal{A}_0 = \\{\\mathbb{Z}[S]\\}$（$S$ extremally disconnected）、$F(\\mathbb{Z}[S]) = Z[S]^{\\blacksquare}$。',
        '',
        '需要验证：对由 $\\prod_I \\mathbb{Z}$ 的直和构成的复形 $C$，',
        '',
        '$$\\operatorname{RHom}(Z[S]^{\\blacksquare}, C) \\longrightarrow \\operatorname{RHom}(\\mathbb{Z}[S], C) = R\\Gamma(S, C)$$',
        '',
        '是同构。这是 Lecture VI 的主计算：把 $C$ 放进短正合列 $0 \\to C \\to C_{\\mathbb{R}} \\to C_{\\mathbb{R}/\\mathbb{Z}} \\to 0$，两边对 $\\mathbb{R}$-模项都消没（$\\operatorname{RHom}(\\mathbb{R}, -) = 0$），于是只需分别算 $C_{\\mathbb{R}}$ 与 $C_{\\mathbb{R}/\\mathbb{Z}}$；再把它们写成有限复形的滤过极限，逐项用紧阿贝尔群的两步消解归约到 $\\operatorname{RHom}(M(S,\\mathbb{R}/\\mathbb{Z}), \\prod\\mathbb{R}/\\mathbb{Z})$ 的度 $\\le 1$ 估计。',
        '',
        '条件满足后，`lem.solid-completion-criterion` 直接给出：$\\mathbf{Solid}$ 是阿贝尔子范畴、对极限余极限扩张稳定、$\\prod_I \\mathbb{Z} = Z[S]^{\\blacksquare}$ 是紧投射生成元、含入有保余极限左伴随 $M \\mapsto M^{\\blacksquare}$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.solid-derived',
      kind: 'implication',
      sources: ['thm.solid-abelian', 'lem.solid-completion-criterion'],
      target: 'thm.solid-derived',
      title: '阿贝尔子范畴 $\\implies$ 导出范畴全忠实',
      proof: [
        '这是 `lem.solid-completion-criterion` (ii) 的直接翻译：取 $\\mathcal{A}_F = \\mathbf{Solid}$，则 $D(\\mathbf{Solid}) \\to D(\\operatorname{Cond}(\\mathbf{Ab}))$ 全忠实，像为满足 $\\operatorname{RHom}(Z[S]^{\\blacksquare}, C) \\cong \\operatorname{RHom}(\\mathbb{Z}[S], C)$ 的复形 —— 正是`def.solid-group` (iii) 的固态复形。',
        '',
        '「固态当且仅当所有 $H^i$ 固态」与「左伴随是左导出」也都是该引理 (ii) 的结论。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.solid-compact-generators',
      kind: 'implication',
      sources: ['thm.solid-abelian', 'cor.free-solid-product'],
      target: 'cor.solid-compact-generators',
      title: '生成元 + 自由固态群是大乘积 $\\implies$ 紧投射对象',
      proof: [
        '**(i)** `thm.solid-abelian` 给出一族紧投射生成元 $Z[S]^{\\blacksquare}$（$S$ extremally disconnected），由 `cor.free-solid-product` 它们都是 $\\prod_I \\mathbb{Z}$。任意 $\\prod_I \\mathbb{Z}$ 可写成某个更大的 $Z[S]^{\\blacksquare}$ 的收缩，而紧投射对象的收缩仍紧投射。反之，紧投射 $P$ 是某个 $\\prod_I \\mathbb{Z}$ 的收缩；自由阿贝尔群的收缩仍自由，逐项取对偶即知 $P$ 仍是 $\\prod_J \\mathbb{Z}$ 形。',
        '',
        '**(ii)** 第一句由 (i) 形式推出。$D^b(\\mathbb{Z})^{\\mathrm{op}} \\to D(\\mathbf{Solid})^\\omega$ 把有界复形送到紧对象；反向 $C \\mapsto \\operatorname{RHom}(C,\\mathbb{Z})$ 取有界复形（用自由消解）。两者互逆。',
        '',
        '**(iii)** 要证 $\\operatorname{RHom}(\\mathbb{R}, C) = 0$ 对一切固态 $C$。可设 $C$ 右有界且集中在 $\\ge 0$，用投射消解化成「各项是 $\\prod_I \\mathbb{Z}$ 的直和」的复形，再用上一条证明里的 $R\\Gamma$ 计算得 $0$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.solid-tensor',
      kind: 'implication',
      sources: ['cor.solid-compact-generators', 'thm.solid-derived'],
      target: 'thm.solid-tensor',
      title: '紧投射对象上的计算 $\\implies$ 对称幺半张量积',
      proof: [
        '**唯一性。** 保余极限的函子由紧投射生成元上的值决定，所以 $\\otimes^{\\blacksquare}$ 若存在必唯一。',
        '',
        '**存在性（对象层）。** 定义 $M \\otimes^{\\blacksquare} N := (M \\otimes N)^{\\blacksquare}$。要证 $M \\mapsto M^{\\blacksquare}$ 对称幺半，即',
        '',
        '$$(M \\otimes N)^{\\blacksquare} \\longrightarrow (M^{\\blacksquare} \\otimes N^{\\blacksquare})^{\\blacksquare}$$',
        '',
        '是同构。两边都保余极限，归约到 $M = \\mathbb{Z}[S]$、$N = \\mathbb{Z}[T]$；再用 `cor.solid-compact-generators` (iv) 的对偶计算，把两边分别算成 $Z[S \\times T]^{\\blacksquare}$。',
        '',
        '**导出层。** 同样的论证给出 $\\otimes^{L\\blacksquare}$；它是左导出，因为两个紧投射对象的张量仍集中在度 $0$（$Z[S]^{\\blacksquare} \\otimes^{L\\blacksquare} Z[T]^{\\blacksquare} = Z[S \\times T]^{\\blacksquare}$）。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.solid-product-tensor',
      kind: 'implication',
      sources: ['thm.solid-tensor', 'thm.csz-free'],
      target: 'prop.solid-product-tensor',
      title: '幺半性 + $C(S)\\otimes C(T) = C(S\\times T)$ $\\implies$ 乘积公式',
      proof: [
        '写 $M = \\operatorname{Hom}(M\',\\mathbb{Z})$、$N = \\operatorname{Hom}(N\',\\mathbb{Z})$（$M\', N\'$ 自由）。要证',
        '',
        '$$\\operatorname{Hom}(M\',\\mathbb{Z}) \\otimes^{L\\blacksquare} \\operatorname{Hom}(N\',\\mathbb{Z}) \\cong \\operatorname{Hom}(M\' \\otimes N\',\\ \\mathbb{Z}).$$',
        '',
        '把 $M\'$、$N\'$ 分别写成 $C(S,\\mathbb{Z})$、$C(T,\\mathbb{Z})$ 的收缩（`thm.csz-free`），归约到 $M\' = C(S,\\mathbb{Z})$、$N\' = C(T,\\mathbb{Z})$。此时 $M\' \\otimes N\' = C(S \\times T,\\mathbb{Z})$，命题变成',
        '',
        '$$Z[S]^{\\blacksquare} \\otimes^{L\\blacksquare} Z[T]^{\\blacksquare} \\cong Z[S \\times T]^{\\blacksquare},$$',
        '',
        '即 `thm.solid-tensor` 的幺半性。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.solid-tensor-computations',
      kind: 'implication',
      sources: ['prop.solid-product-tensor', 'cor.solid-compact-generators'],
      target: 'ex.solid-tensor-computations',
      title: '乘积公式 + $\\mathbb{R}^{L\\blacksquare}=0$ $\\implies$ 具体计算',
      proof: [
        '第一条：$\\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{R} = \\mathbb{Z}_p \\otimes^{L\\blacksquare} \\mathbb{R}^{L\\blacksquare} = (\\mathbb{Z}_p \\otimes \\mathbb{R})^{L\\blacksquare} = 0$，因为 $\\mathbb{R}^{L\\blacksquare} = 0$（`cor.solid-compact-generators` (iii)）。',
        '',
        '最后一条：$\\mathbb{Z}[[U]] = \\prod_{\\mathbb{N}} \\mathbb{Z}$、$\\mathbb{Z}[[T]] = \\prod_{\\mathbb{N}} \\mathbb{Z}$，由 `prop.solid-product-tensor` 得 $\\prod_{\\mathbb{N}\\times\\mathbb{N}} \\mathbb{Z} = \\mathbb{Z}[[U,T]]$。',
        '',
        '中间几条：对 $U - p$、$T - \\ell$、$T - p$ 取商（固态张量积保余极限），分别得到 $\\mathbb{Z}_p[[T]]$、$\\mathbb{Z}_\\ell$、$\\mathbb{Z}_p$。$\\blacksquare$'
      ].join('\n')
    },

    /* ------------------------------------------------------ 定义接线 */
    {
      id: 'def-link.profinite-measure',
      kind: 'definition',
      definition: 'def.profinite',
      usedBy: 'def.cond-measure',
      note: '测度定义在 **profinite 集**上；$C(S,\\mathbb{Z})$ 的「连续」指的正是 profinite 拓扑。'
    },
    {
      id: 'def-link.condab-solid',
      kind: 'definition',
      definition: 'def.condensed-abelian-group',
      usedBy: 'def.solid-group',
      note: '固态群首先是凝聚态阿贝尔群 —— 固态性是在它上面再加一条「唯一延拓」条件。'
    },
    {
      id: 'def-link.measure-solid',
      kind: 'definition',
      definition: 'def.cond-measure',
      usedBy: 'def.solid-group',
      note: '自由固态群 $Z[S]^{\\blacksquare}$ 的下垫群就是测度群 $M(S,\\mathbb{Z})$，见 `cor.free-solid-product`。'
    }
  ]
});
