/* ==========================================================================
   内容包 · 解析环与固态模（Clausen–Scholze, Lectures on Condensed Mathematics,
   Bonn 2019, Lectures VII–VIII）
   --------------------------------------------------------------------------
   固态阿贝尔群只是 A = Z 的情形。把「自由完备模 A[S]^∧」抽成一个函子，
   就得到**预解析环 / 解析环**；解析环上的「固态模」就是 Mod^cond_A。
   这一层是后面 analytic stacks（Clausen–Scholze 后续课程）的地基。

     预解析环（Def 7.1）→ 解析环（Def 7.4）
       → Mod^cond_A 是阿贝尔范畴、有紧投射生成元（Prop 7.5）
       → 解析环之间的映射给出 base change（Prop 7.7）
       → Z_{p,■} 与 (A,Z)_■ 是解析环（Prop 7.9）
       → 有限生成 Z-代数 A：A_■ 是解析环，j_! ⊣ j^* ⊣ j_*（Thm 8.1）
       → 仿射相干对偶：f_!、f^!、投影公式、对偶复形（Thm 8.2）
       → 反例：R_{ℓ¹} 不是解析环（Ribe 扩张）

   ⚠ 出处逐条写在 `refs` 里（Lecture / Definition / Theorem 编号）；证明是我们重写的。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '凝聚态：解析环与固态模',
  nodes: [

    {
      id: 'def.pre-analytic-ring',
      cluster: 'cond.analytic',
      type: 'definition',
      label: '预解析环',
      title: '预解析环',
      regions: ['condensed'],
      tags: ['定义', '凝聚态', '解析环'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VII, Definition 7.1'],
      statement: [
        '一个**预解析环** $\\mathcal{A}$ 由两部分组成：',
        '',
        '- 一个凝聚态环 $A$；',
        '- 一个函子',
        '',
        '$$\\{\\text{extremally disconnected 集}\\} \\longrightarrow \\operatorname{Mod}^{\\mathrm{cond}}_{A}, \\qquad S \\longmapsto \\mathcal{A}[S],$$',
        '',
        '它把有限不交并送到**乘积**，并带一个自然变换 $S \\to \\mathcal{A}[S]$。',
        '',
        '换句话说，$\\mathcal{A}$ 就是「环 $A$ 加上一套指定的自由完备 $A$-模 $\\mathcal{A}[S]$」。'
      ].join('\n'),
      notes: '⭐ 这个定义是在抽公理：固态理论里真正用到的不是 $A$ 本身，而是「$S$ 上的自由完备模是什么」。把这件事做成一个函子，就能对任意环（甚至解析空间）复制整套构造。\n\n⭐ 三个基本例子：\n- $\\mathbb{Z}_\\blacksquare$：$A = \\mathbb{Z}$，$\\mathbb{Z}_\\blacksquare[S] = Z[S]^{\\blacksquare}$；\n- $\\mathbb{Z}_{p,\\blacksquare}$：$A = \\mathbb{Z}_p$，$\\mathbb{Z}_{p,\\blacksquare}[S] = \\varprojlim_i \\mathbb{Z}_p[S_i]$（$p$-进测度）；\n- $(A,\\mathbb{Z})_\\blacksquare$（$A$ 离散）：$A[S] = Z[S]^{\\blacksquare} \\otimes_{\\mathbb{Z}} A$。\n\n⚠ 这个定义在原文里带一条警告：它应当允许「导出」版本（$A$ 是单纯环）才足够一般。本图只写经典版本，够用到现在这一步。'
    },
    {
      id: 'def.analytic-ring',
      cluster: 'cond.analytic',
      type: 'definition',
      label: '解析环',
      title: '解析环',
      regions: ['condensed'],
      tags: ['定义', '凝聚态', '解析环'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VII, Definition 7.4'],
      statement: [
        '预解析环 $\\mathcal{A}$ 叫**解析环**，当且仅当：对任意复形',
        '',
        '$$C : \\cdots \\to C_i \\to \\cdots \\to C_1 \\to C_0 \\to 0$$',
        '',
        '（其中每个 $C_i$ 是若干 $\\mathcal{A}[T]$ 的直和，$T$ extremally disconnected），以及对任意 extremally disconnected 集 $S$，自然映射',
        '',
        '$$\\operatorname{RHom}_{\\mathcal{A}}\\bigl(\\mathcal{A}[S],\\ C\\bigr) \\longrightarrow \\operatorname{RHom}_{A}\\bigl(A[S],\\ C\\bigr)$$',
        '',
        '是同构。'
      ].join('\n'),
      notes: '⭐ 读法：**「$\\mathcal{A}[S]$ 与普通自由模 $A[S]$ 在 $\\operatorname{RHom}$ 里无法区分」**。这正是固态群定义 (ii) 的相对版本；取 $A = \\mathbb{Z}$、$\\mathcal{A}[S] = Z[S]^{\\blacksquare}$ 就回到固态。\n\n⚠ 为什么要求**所有**这样的复形而不只是单个模？因为要得到导出范畴层面的结论（`thm.analytic-modules` (ii)），单点的同构不够，需要它对复形也成立。\n\n⭐ 判定「是不是解析环」通常靠 `prop.analytic-examples` 与 `thm.za-analytic` 这类具体定理，而不是逐条验证定义。'
    },
    {
      id: 'thm.analytic-modules',
      cluster: 'cond.analytic',
      type: 'theorem',
      label: '解析环上的模',
      title: '定理：$\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 是阿贝尔范畴（Prop 7.5）',
      regions: ['condensed'],
      tags: ['定理', '凝聚态', '解析环', '固态模'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VII, Proposition 7.5'],
      statement: [
        '设 $\\mathcal{A}$ 是解析环。考虑全子范畴',
        '',
        '$$\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}} \\subset \\operatorname{Mod}^{\\mathrm{cond}}_{A}$$',
        '',
        '由所有满足「$\\operatorname{Hom}_{\\mathcal{A}}(\\mathcal{A}[S], M) \\to M(S)$ 对一切 extremally disconnected $S$ 是同构」的 $A$-模 $M$ 组成。则：',
        '',
        '**(i)** 它是阿贝尔范畴，对一切极限、余极限与扩张稳定；$\\mathcal{A}[S]$ 构成一族紧投射生成元；含入有左伴随',
        '',
        '$$M \\longmapsto M \\otimes_{\\mathcal{A}} \\mathcal{A},$$',
        '',
        '它是 $A[S] \\mapsto \\mathcal{A}[S]$ 的唯一保余极限延拓。若 $A$ 交换，$\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 上有唯一的对称幺半张量积 $\\otimes_{\\mathcal{A}}$。',
        '',
        '**(ii)** $D(\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}) \\to D(\\operatorname{Mod}^{\\mathrm{cond}}_{A})$ 全忠实，像由那些「$\\operatorname{RHom}_{\\mathcal{A}}(\\mathcal{A}[S], C) \\cong \\operatorname{RHom}_{A}(A[S], C)$」的复形组成；$C$ 在像里当且仅当所有 $H^i(C)$ 在 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 里。含入有左伴随 $C \\mapsto C \\otimes^{L}_{\\mathcal{A}} \\mathcal{A}$。'
      ].join('\n'),
      notes: '⭐ 这是 `thm.solid-abelian` 的相对版本：把 $\\mathbb{Z}$ 换成任意解析环。**固态模**就是 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 的对象，$D(\\mathcal{A}) := D(\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}})$ 就是「$\\mathcal{A}$ 上固态模的导出范畴」。\n\n⭐ 证明就是 `lem.solid-completion-criterion` 的第二次应用：解析环的定义正好是那条判据的假设。\n\n⚠ 原文留了一个警告：$\\otimes^{L}_{\\mathcal{A}}$ 未必是 $\\otimes_{\\mathcal{A}}$ 的左导出（已知例子都成立）。这一点不影响这里的用法。'
    },
    {
      id: 'prop.analytic-base-change',
      cluster: 'cond.analytic',
      type: 'proposition',
      label: '解析环的 base change',
      title: '命题：解析环映射给出 $-\\otimes_{\\mathcal{A}}\\mathcal{B}$（Prop 7.7）',
      regions: ['condensed'],
      tags: ['命题', '凝聚态', '解析环'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VII, Proposition 7.7'],
      statement: [
        '设 $f : \\mathcal{A} \\to \\mathcal{B}$ 是解析环之间的映射（即凝聚态环映射，且每个 $\\mathcal{B}[S]$ 作为 $A$-模落在 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 里）。则：',
        '',
        '**(i)** 复合函子 $\\operatorname{Mod}^{\\mathrm{cond}}_{A} \\xrightarrow{-\\otimes_{A} B} \\operatorname{Mod}^{\\mathrm{cond}}_{B} \\xrightarrow{-\\otimes_{\\mathcal{B}}\\mathcal{B}} \\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}$ 穿过 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$，记作',
        '',
        '$$M \\longmapsto M \\otimes_{\\mathcal{A}} \\mathcal{B} : \\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}} \\longrightarrow \\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}.$$',
        '',
        '**(ii)** 导出版本 $C \\mapsto C \\otimes^{L}_{\\mathcal{A}} \\mathcal{B}$ 是它的左导出。'
      ].join('\n'),
      notes: '⭐ 这条让 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 对 $\\mathcal{A}$ 函子化：换解析环就是做 base change。\n\n⭐ 证明很短：由映射的定义，$\\mathcal{B}[S]$ 已经在 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 里，而它们是紧投射生成元，所以整个 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}$ 都落进去。'
    },
    {
      id: 'prop.analytic-examples',
      cluster: 'cond.analytic',
      type: 'proposition',
      label: '解析环的例子',
      title: '命题：$\\mathbb{Z}_{p,\\blacksquare}$ 与 $(A,\\mathbb{Z})_\\blacksquare$ 是解析环（Prop 7.9）',
      regions: ['condensed'],
      tags: ['命题', '凝聚态', '解析环'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VII, Proposition 7.9'],
      statement: [
        '下列预解析环是解析环：',
        '',
        '**(i)** $\\mathbb{Z}_{p,\\blacksquare}$（$p$-进固态环）；',
        '',
        '**(ii)** 对任意离散环 $A$，$(A, \\mathbb{Z})_\\blacksquare$，其自由模为',
        '',
        '$$(A,\\mathbb{Z})_\\blacksquare[S] = Z[S]^{\\blacksquare} \\otimes_{\\mathbb{Z}} A.$$'
      ].join('\n'),
      notes: [
        '⭐ (i) 与 (ii) 其实有同一个证明：两种情形下都有',
        '',
        '$$\\mathcal{A}[S] = \\mathbb{Z}_\\blacksquare[S] \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} \\mathcal{A},$$',
        '',
        '而 $C$ 是 $D(\\mathbf{Solid})$ 里的 $\\mathcal{A}$-模，于是',
        '',
        '$$\\operatorname{RHom}(\\mathbb{Z}_\\blacksquare[S], C) \\cong \\operatorname{RHom}_{\\mathcal{A}}(\\mathbb{Z}_\\blacksquare[S] \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} \\mathcal{A},\\ C),$$',
        '',
        '左边是 $\\operatorname{RHom}(\\mathbb{Z}[S], C)$（$C$ 固态），右边是 $\\operatorname{RHom}_{\\mathcal{A}}(\\mathcal{A}[S], C)$。\n\n⚠ $A$ 必须**离散**：对一般凝聚态环这个论断不成立，这也是 `thm.za-analytic` 需要「有限生成 $\\mathbb{Z}$-代数」的原因。'
      ].join('\n'),
    },
    {
      id: 'thm.za-analytic',
      cluster: 'cond.analytic',
      type: 'theorem',
      label: '有限生成代数的解析环',
      title: '定理：$A$ 有限生成 $\\mathbb{Z}$-代数 $\\implies$ $A_\\blacksquare$ 是解析环（Thm 8.1）',
      regions: ['condensed'],
      tags: ['定理', '凝聚态', '解析环', '固态模'],
      statement: [
        '设 $A$ 是有限生成 $\\mathbb{Z}$-代数，$A_\\blacksquare$ 是自由模为',
        '',
        '$$A_\\blacksquare[S] := \\varprojlim_i A[S_i] \\qquad (S = \\varprojlim_i S_i)$$',
        '',
        '的预解析环（即 $A$ 值测度 $M(S,A)$）。则 $A_\\blacksquare$ 是解析环，且遗忘函子',
        '',
        '$$j^* : D(A_\\blacksquare) \\hookrightarrow D((A,\\mathbb{Z})_\\blacksquare)$$',
        '',
        '有左伴随 $j^* = -\\otimes^{L}_{(A,\\mathbb{Z})_\\blacksquare} A_\\blacksquare$，后者又有左伴随',
        '',
        '$$j_! : D(A_\\blacksquare) \\longrightarrow D((A,\\mathbb{Z})_\\blacksquare),$$',
        '',
        '满足 $j_! j^* M = M \\otimes_{(A,\\mathbb{Z})_\\blacksquare} j_! A$。'
      ].join('\n'),
      notes: [
        '⭐ 这一条是 `thm.za-analytic` 名字里的「解析环」第一次真正覆盖几何情形：$A = \\mathbb{Z}[T]$ 时 $A_\\blacksquare$ 就是「$\\mathbb{Z}[T]$ 上的固态模」，后面相干对偶全踩在它上面。\n\n⭐ 证明骨架（$A = \\mathbb{Z}[T]$ 的情形）：把 $A_\\infty := \\mathbb{Z}((T^{-1}))$ 看成「$\\operatorname{Spec} A$ 边界附近的函数」，它有短正合列',
        '',
        '$$0 \\to \\mathbb{Z}[[U]] \\otimes_{\\mathbb{Z}} A \\xrightarrow{U \\mapsto T^{-1}} \\mathbb{Z}[[U]] \\otimes_{\\mathbb{Z}} A \\to A_\\infty \\to 0,$$',
        '',
        '从而 $A_\\infty$ 紧、幂等、且 $\\operatorname{RHom}_A(A_\\infty, C) = 0$ 对一切由 $\\prod A$ 的直和构成的复形成立；再用 $\\prod_I A / (\\prod_I \\mathbb{Z} \\otimes A)$ 的余核构造 $j_!$。一般有限生成 $A$ 由 Noether 归一化归约到 $A = \\mathbb{Z}[T]$。\n\n⭐ **完整证明**见边 `imp.za-analytic`：$A_\\infty$ 紧与幂等 $\\to$ $\\operatorname{RHom}_A(A_\\infty,-)$ 消没 $\\to$ 余核是 $A_\\infty$-模 $\\to$ 解析性 $\\to$ $j_!$ 与全忠实 $\\to$ Noether 归一化。'
      ].join('\n'),
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VIII, Theorem 8.1']
    },
    {
      id: 'thm.coherent-duality',
      cluster: 'cond.analytic',
      type: 'theorem',
      label: '仿射相干对偶',
      title: '定理：仿射相干对偶（Thm 8.2）',
      regions: ['condensed'],
      tags: ['定理', '凝聚态', '相干对偶'],
      statement: [
        '设 $A$ 是有限生成 $\\mathbb{Z}$-代数，$f : \\operatorname{Spec} A \\to \\operatorname{Spec} \\mathbb{Z}$ 是投影。定义',
        '',
        '$$f_! : D(A_\\blacksquare) \\xrightarrow{j_!} D((A,\\mathbb{Z})_\\blacksquare) \\longrightarrow D(\\mathbb{Z}_\\blacksquare).$$',
        '',
        '则 $f_!$ 保一切直和、保紧对象，并满足**投影公式**',
        '',
        '$$f_!\\bigl((M \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} A_\\blacksquare) \\otimes^{L}_{A_\\blacksquare} N\\bigr) \\cong M \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} f_! N,$$',
        '',
        '其中 $M \\in D(\\mathbb{Z}_\\blacksquare)$、$N \\in D(A_\\blacksquare)$。函子 $f_!$ 有右伴随',
        '',
        '$$f^! : D(\\mathbb{Z}_\\blacksquare) \\longrightarrow D(A_\\blacksquare), \\qquad f^! M = (M \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} A_\\blacksquare) \\otimes^{L}_{A_\\blacksquare} f^! \\mathbb{Z},$$',
        '',
        '它保直和；$f^! \\mathbb{Z} \\in D(A_\\blacksquare)$ 是有限生成离散 $A$-模的有界复形。若 $f$ 是完全交，则 $f^!\\mathbb{Z}$ 在 $D(A)$ 里可逆（局部是某个次数上的一条线丛）。'
      ].join('\n'),
      notes: '⭐ 这就是 Grothendieck 相干对偶的「仿射模型」：$f_!$ 是**紧支撑上同调**，$f^!$ 是**对偶复形**，投影公式与 Serre 对偶都由伴随形式地推出。\n\n⭐ 与经典做法的区别：经典相干对偶里 $f_!$ 在仿射情形只能靠「形式函数」硬造；这里 $f_!$ 是一对伴随（$j_! \\dashv j^*$）的直接产物，而且**不保持离散对象** —— 这正是凝聚态方法的收益。\n\n⚠ $f^!\\mathbb{Z}$ 与经典对偶复形 $\\omega_A$ 的等同要在 `thm.za-analytic` 的框架里证（原文 Lecture XI）。',
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VIII, Theorem 8.2']
    },
    {
      id: 'prop.rl1-not-analytic',
      cluster: 'cond.analytic',
      type: 'proposition',
      label: 'R_{ℓ¹} 不是解析环',
      title: '命题：$\\mathbb{R}_{\\ell^1}$ 不是解析环（Ribe 扩张）',
      regions: ['condensed'],
      tags: ['命题', '凝聚态', '解析环', '反例'],
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics (Bonn 2019), Lecture VII, Example 7.11 and Proposition 7.12'],
      statement: [
        '设 $\\mathbb{R}_{\\ell^1}$ 是如下预解析环：下垫凝聚态环为 $\\mathbb{R}$，对 extremally disconnected 集 $S$ 令',
        '',
        '$$\\mathbb{R}_{\\ell^1}[S] := M_b(S, \\mathbb{R})$$',
        '',
        '为**有界** $\\mathbb{R}$ 值测度（拓扑对偶于 Banach 空间 $C(S,\\mathbb{R})$），即 $\\ell^1$-范数下的完备化。则对无限 extremally disconnected 集 $S$，',
        '',
        '$$\\operatorname{Ext}^1_{\\mathbb{R}}\\bigl(\\mathbb{R}_{\\ell^1}[S],\\ \\mathbb{R}_{\\ell^1}[S]\\bigr) \\ne 0.$$',
        '',
        '因此 $\\mathbb{R}_{\\ell^1}$ **不是**解析环。'
      ].join('\n'),
      notes: [
        '⭐ 这条是整套理论的**边界标记**：固态/解析的好性质在阿基米德方向（$\\ell^1$ 完备化）失效。$p$-进方向可以，实数方向不行 —— 这正是 Clausen–Scholze 后来要另做“analytic stacks / liquid modules”的动机。\n\n⭐ 非零的 $\\operatorname{Ext}^1$ 类与**熵函数** $(x_i) \\mapsto \\sum_i x_i \\log|x_i|$ 有关：Ribe 的扩张定理给出一个典范自扩张',
        '',
        '$$0 \\to \\mathbb{R}_{\\ell^1}[S] \\to E \\to \\mathbb{R}_{\\ell^1}[S] \\to 0,$$',
        '',
        '其中 $E$ 的「$\\le r$ 部分」同时约束 $\\sum |x_i|$ 与 $\\sum |y_i - x_i \\log|x_i||$。\n\n⚠ 这条不证明，只引 Ribe（1979）与原文 Remark 7.11–Prop 7.12。'
      ].join('\n')
    }
  ],

  edges: [

    {
      id: 'imp.analytic-modules',
      kind: 'implication',
      sources: ['def.analytic-ring', 'lem.solid-completion-criterion'],
      target: 'thm.analytic-modules',
      title: '解析环的定义 $\\implies$ 模范畴是阿贝尔的',
      proof: [
        '这是 `lem.solid-completion-criterion` 的直接应用：取 $\\mathcal{A} = \\operatorname{Mod}^{\\mathrm{cond}}_{A}$、$\\mathcal{A}_0 = \\{A[S]\\}$（$S$ extremally disconnected）、$F(A[S]) = \\mathcal{A}[S]$。',
        '',
        '解析环的定义（`def.analytic-ring`）正是该引理的假设：对由 $\\mathcal{A}[T]$ 的直和构成的复形 $C$，$\\operatorname{RHom}(\\mathcal{A}[S], C) \\cong \\operatorname{RHom}(A[S], C)$。',
        '',
        '于是引理 (i) 给出阿贝尔子范畴、紧投射生成元与左伴随；引理 (ii) 给出导出范畴的全忠实与左伴随。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.analytic-base-change',
      kind: 'implication',
      sources: ['def.analytic-ring', 'prop.analytic-examples'],
      target: 'prop.analytic-base-change',
      title: '解析环映射 $\\implies$ base change',
      proof: [
        '**(i)** 由映射 $f : \\mathcal{A} \\to \\mathcal{B}$ 的定义，每个 $\\mathcal{B}[S]$ 作为 $A$-模都在 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$ 里；而这些 $\\mathcal{B}[S]$ 是 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}$ 的紧投射生成元，故整个 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}}$ 都落进 $\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}}$。',
        '',
        '**(ii)** 检验 $C \\in D(\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{B}})$ 作为 $A$-模是否在 $D(\\operatorname{Mod}^{\\mathrm{cond}}_{\\mathcal{A}})$ 里：由 (ii) 的判据只需看上同调，归约到 (i)。得到的函子保余极限、把 $A[S]$ 送到 $\\mathcal{B}[S]$，故是左导出。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.analytic-examples',
      kind: 'implication',
      sources: ['thm.solid-abelian', 'def.analytic-ring'],
      target: 'prop.analytic-examples',
      title: '固态群的相对化 $\\implies$ 两个解析环',
      proof: [
        '两种情形统一处理：设 $\\mathcal{A}$ 是 $\\mathbb{Z}_{p,\\blacksquare}$ 或 $(A,\\mathbb{Z})_\\blacksquare$，则',
        '',
        '$$\\mathcal{A}[S] = \\mathbb{Z}_\\blacksquare[S] \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} \\mathcal{A}.$$',
        '',
        '取复形 $C$（各项为 $\\mathcal{A}[T]$ 的直和），它是 $D(\\mathbf{Solid})$ 里的 $\\mathcal{A}$-模。于是',
        '',
        '$$\\operatorname{RHom}(\\mathbb{Z}_\\blacksquare[S], C) \\cong \\operatorname{RHom}_{\\mathcal{A}}\\bigl(\\mathbb{Z}_\\blacksquare[S] \\otimes^{L}_{\\mathbb{Z}_\\blacksquare} \\mathcal{A},\\ C\\bigr) = \\operatorname{RHom}_{\\mathcal{A}}(\\mathcal{A}[S], C).$$',
        '',
        '左边由 $C$ 固态等于 $\\operatorname{RHom}(\\mathbb{Z}[S], C)$，正是解析环定义要求的同构。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.za-analytic',
      kind: 'implication',
      sources: ['prop.analytic-examples', 'def.analytic-ring', 'thm.solid-abelian'],
      target: 'thm.za-analytic',
      title: '边界函数 $A_\\infty$ $\\implies$ $A_\\blacksquare$ 是解析环',
      proof: [
        '设 $A = \\mathbb{Z}[T]$，$A_\\infty = \\mathbb{Z}((T^{-1}))$。',
        '',
        '**① $A_\\infty$ 紧。** 有短正合列',
        '$$0 \\to \\mathbb{Z}[[U]] \\otimes A \\xrightarrow{U \\mapsto T^{-1}} \\mathbb{Z}[[U]] \\otimes A \\to A_\\infty \\to 0,$$',
        '前两项在 $\\operatorname{Mod}^{cond}_{(A,\\mathbb{Z})^{\\blacksquare}}$ 中紧投射（它们是 $\\prod_I \\mathbb{Z} \\otimes A$ 的形状），故 $A_\\infty$ 紧。',
        '',
        '**② $A_\\infty$ 幂等。** 由 ① 的表现直接算 $A_\\infty \\otimes^L A_\\infty \\cong A_\\infty$。于是「$A_\\infty$-模」构成 $D((A,\\mathbb{Z})^{\\blacksquare})$ 的全子范畴，$\\mathbb{Z}((T^{-1})) \\otimes A$ 是其中的紧生成元。',
        '',
        '**③ 对 $\\prod_I A$ 型系数的消没。** 设 $C$ 的各项是若干 $\\prod_I A$ 的直和，则 $\\operatorname{RHom}_A(A_\\infty, C) = 0$。化到 $C = A$：用 ① 的消解，$\\operatorname{RHom}_A(A_\\infty, A)$ 由复形',
        '$$A[U^{-1}]/A \\xrightarrow{U - T^{-1}} A[U^{-1}]/A$$',
        '计算，该映射是单射，故复形无环。有余核时再对 $\\prod$ 逐项处理。',
        '',
        '**④ 余核是 $A_\\infty$-模。** $\\operatorname{coker}\\big(\\prod_I \\mathbb{Z} \\otimes A \\to \\prod_I A\\big)$ 是 $A_\\infty$-模：把它写成',
        '$$\\operatorname{coker}\\Big(\\prod_I \\mathbb{Z}[[T^{-1}]] \\otimes_{\\mathbb{Z}[[T^{-1}]]} \\mathbb{Z}((T^{-1})) \\to \\prod_I \\mathbb{Z}((T^{-1}))\\Big),$$',
        '第二步的余核恰为 $\\prod_I T^{-1}\\mathbb{Z}[[T^{-1}]]$，它是 $\\mathbb{Z}((T^{-1}))$-模。',
        '',
        '**⑤ 解析性。** 设 $C$ 连通、各项为 $\\prod_I A$ 的直和。由 $C \\in D((A,\\mathbb{Z})^{\\blacksquare})$，',
        '$$\\operatorname{RHom}_A(A[S], C) \\cong \\operatorname{RHom}_A((A,\\mathbb{Z})^{\\blacksquare}[S], C),$$',
        '且 $(A,\\mathbb{Z})^{\\blacksquare}[S] = \\prod_I\\mathbb{Z} \\otimes A$、$A^{\\blacksquare}[S] = \\prod_I A$。要证的',
        '$$\\operatorname{RHom}_A(\\textstyle\\prod_I \\mathbb{Z} \\otimes A, C) \\cong \\operatorname{RHom}_A(\\prod_I A, C)$$',
        '来自 ④（余核是 $A_\\infty$-模）与 ③（$A_\\infty$-模上 $\\operatorname{RHom}$ 消没）。',
        '',
        '**⑥ 全忠实与 $j_!$。** ⑤ 给出 $j^\\ast : D(A^{\\blacksquare}) \\to D((A,\\mathbb{Z})^{\\blacksquare})$ 全忠实；其左伴随 $j^\\ast = -\\otimes^L_{(A,\\mathbb{Z})^{\\blacksquare}} A^{\\blacksquare}$ 由 `prop.analytic-base-change`。$\\ker j^\\ast$ 恰为 $A_\\infty$-模（Observation 8.10）。定义',
        '$$j_! M := M \\otimes_{A \\otimes^L \\mathbb{Z}^{\\blacksquare}} (A_\\infty/A)[-1],$$',
        '由 ②③ 它穿过 $D(A^{\\blacksquare})$、全忠实，且是 $j^\\ast$ 的左伴随（Observation 8.11）。',
        '',
        '**⑦ 一般 $A$。** Noether 归一化给满射 $R = \\mathbb{Z}[X_1,\\ldots,X_n] \\to A$，$A$ 是有限 $R$-模，故 $\\prod_I A \\cong \\prod_I R \\otimes_R A$、$A^{\\blacksquare} = (A,R)^{\\blacksquare}$。对 $n$ 归纳：$R^{\\blacksquare}$ 已知解析，把 ①–⑥ 里的 $\\mathbb{Z}$ 换成 $R$、$T$ 换成 $X_n$，逐步得到 $(A,R)^{\\blacksquare}$ 解析（Appendix, Theorem 8.13）。$\\blacksquare$',
      ].join('\n')
    },
    {
      id: 'imp.coherent-duality',
      kind: 'implication',
      sources: ['thm.za-analytic'],
      target: 'thm.coherent-duality',
      title: '$j_! \\dashv j^* \\dashv j_*$ $\\implies$ 仿射相干对偶',
      proof: [
        '**记号。** 设 $f : A \\to A\'$ 是解析环之间的映射，$f^{\\mathrm{ad}/\\mathbb{Z}} : \\operatorname{Spec} A\' \\to \\operatorname{Spec} A$ 是对应的 adic 谱映射，$j : \\operatorname{Spec} A\' \\to \\operatorname{Spec}(A\',\\mathbb{Z})$。按 `def.f-shriek`，$f_! := f^{\\mathrm{ad}/\\mathbb{Z}}_\\ast \\circ j_!$。',
        '',
        '**① $f_!$ 保直和。** $j_!$ 是左伴随，保余极限；正常推前按纤维、$\\operatorname{Spec}(A\',\\mathbb{Z})$ 的基变换只在有限个连通块上发生（`thm.adic-structure-sheaf` 的结构层是恒定层），故保直和。合起来 $f_!$ 保直和。',
        '',
        '**② 投影公式。** 由 $j_!$ 的张量表达式，对 $M \\in D(\\mathbb{Z}^{\\blacksquare})$、$N \\in D(A^{\\blacksquare})$，',
        '$$f_!\\big((M \\otimes^L A^{\\blacksquare}) \\otimes^L_{A^{\\blacksquare}} N\\big) \\cong M \\otimes^L_{\\mathbb{Z}^{\\blacksquare}} f_! N.$$',
        '逐项验证：$j_!$ 与张量结合律、$A\'$ 上 $\\mathbb{Z}$-线性结构相容。',
        '',
        '**③ 右伴随与显式公式。** 由 ②，$f_!$ 保余极限，故由伴随函子定理它有右伴随 $f^!$；并可用余单位 $f_! f^! \\to \\mathrm{id}$ 把它写成',
        '$$f^! M \\cong (M \\otimes^L_{\\mathbb{Z}^{\\blacksquare}} A^{\\blacksquare}) \\otimes^L_{A^{\\blacksquare}} f^! \\mathbb{Z}.$$',
        '这就是材料里「先基变换到 $A$、再乘相对对偶」的分步。',
        '',
        '**④ $f^! \\mathbb{Z}$ 的形状。** 由 Appendix 8.13(iv)（即本定理的一般 $A$ 情形）：$f^! \\mathbb{Z}$ 是有界、左有界、各项有限生成的**离散** $A$-复形。当 $f$ 是完全交时（映射的余切复形是完美复形），由 Koszul 复形算出 $f^! \\mathbb{Z}$ 可逆，即 $f^!$ 可由「乘一个可逆复形」实现。',
        '',
        '**⑤ $f_!$ 保紧。** 见 Remark 11.7：局部化到 $\\mathbb{A}^1$ 后用 Lecture VIII 的显式计算；一般情形由 Noether 归一化 + 粘合回到有限个 $\\mathbb{A}^1$ 因子。$\\blacksquare$',
        '',
        '⚠ 第 ⑤ 步同上：保紧性的完整展开是 Remark 11.7 的归约 + $\\mathbb{A}^1$ 的情形，本图只写到归约。',
      ].join('\n')
    },
    {
      id: 'imp.rl1-not-analytic',
      kind: 'implication',
      sources: ['def.analytic-ring'],
      target: 'prop.rl1-not-analytic',
      title: '解析性要求 $\\operatorname{Ext}^1 = 0$ $\\implies$ $\\mathbb{R}_{\\ell^1}$ 不是解析环',
      proof: [
        '若 $\\mathcal{A}$ 是解析环，则对 extremally disconnected 的 $S, T$ 与 $i > 0$，由解析性取 $C = \\mathcal{A}[T]$ 得',
        '',
        '$$\\operatorname{Ext}^i_{\\mathcal{A}}(\\mathcal{A}[S], \\mathcal{A}[T]) = H^i(S, \\mathcal{A}[T]) = 0,$$',
        '',
        '因为 $\\mathcal{A}[T]$ 是 $\\prod$ 形（见 `cor.free-solid-product` 的相对版本），而 $S$ 上常层的高次上同调消没。',
        '',
        '但对 $\\mathbb{R}_{\\ell^1}$，Ribe 扩张定理给出无限 extremally disconnected $S$ 上的非零类',
        '',
        '$$0 \\ne \\operatorname{Ext}^1_{\\mathbb{R}}(\\mathbb{R}_{\\ell^1}[S], \\mathbb{R}_{\\ell^1}[S]),$$',
        '',
        '与解析性矛盾。$\\blacksquare$'
      ].join('\n')
    },

    /* ------------------------------------------------------ 定义接线 */
    {
      id: 'def-link.condset-preanalytic',
      kind: 'definition',
      definition: 'def.condensed-set',
      usedBy: 'def.pre-analytic-ring',
      note: '预解析环的 $A$ 是一个**凝聚态环** —— 即凝聚态集上的环对象。'
    },
    {
      id: 'def-link.preanalytic-analytic',
      kind: 'definition',
      definition: 'def.pre-analytic-ring',
      usedBy: 'def.analytic-ring',
      note: '解析环 = 预解析环 + 一条 $\\operatorname{RHom}$ 条件，所以先是预解析环。'
    },
    {
      id: 'def-link.solid-za',
      kind: 'definition',
      definition: 'def.solid-group',
      usedBy: 'prop.analytic-examples',
      note: '$\\mathbb{Z}_{p,\\blacksquare}$ 与 $(A,\\mathbb{Z})_\\blacksquare$ 的解析性直接归约到 $\\mathbb{Z}_\\blacksquare$ 的固态性。'
    }
  ]
});
