/* ==========================================================================
   内容包 · 布尔环与 Stone 表示（3 条）
   --------------------------------------------------------------------------
   造出的东西是：**Stone 空间的代数根源**。

   $\mathbf{BoolRing}^{\mathrm{op}} \simeq \mathbf{Stone}$ —— 一句话把「紧、Hausdorff、
   全不连通」这种拓扑对象，翻译成「每个元素都幂等」这种纯代数对象。

   顺带补一条紧块拼装的技术命题（紧 Hausdorff 块沿闭含入的滤过余极限）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '布尔环与 Stone 表示',
  nodes: [

    {
      id: 'def.boolean-ring',
      cluster: 'topo.stone',
      type: 'definition',
      label: '布尔环',
      title: '布尔环',
      regions: ['topology', 'algebra'],
      tags: ['拓扑', 'Stone 空间', '布尔环', '幂等'],
      statement: [
        '**布尔环**是一个环 $B$，其中每个元素都**幂等**：',
        '',
        '$$\\forall x \\in B,\\qquad x^{2} = x.$$'
      ].join('\n'),
      notes: [
        '**幂等性把环逼得很紧**。由 $(x + y)^{2} = x + y$ 展开得 $xy + yx = 0$；由 $(x+x)^{2} = x+x$ 得 $2x = 0$。合起来：布尔环**自动是交换环**，而且**特征为 $2$**。所以布尔环里没有「真实」的数，只有「是 / 不是」的代数。',
        '**与布尔代数（带补分配格）是一回事**。格运算翻译成环运算：',
        '',
        [
          '- $a \\wedge b = ab$（交 = 乘法）；',
          '- $a \\vee b = a + b + ab$（并 = 加法加回重叠部分）；',
          '- $\\neg a = 1 + a$（补 = 与单位元加和）。'
        ].join('\n'),
        '',
        '反过来，$a \\,\\triangle\\, b = a + b$：环加法就是**对称差**。',
        '**最小的例子**：$\\mathbb{F}_{2} = \\{\\, 0, 1 \\,\\}$。**最一般的例子**：集合 $I$ 的幂集 $\\mathcal{P}(I)$，以对称差为加法、以交为乘法。'
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 2.22']
    },

    {
      id: 'thm.boolean-stone',
      cluster: 'topo.stone',
      type: 'theorem',
      label: 'Boolean 环与 Stone 空间等价',
      title: 'Stone 表示定理：$\\mathbf{BoolRing}^{\\mathrm{op}} \\simeq \\mathbf{Stone}$',
      regions: ['topology', 'algebra'],
      tags: ['拓扑', 'Stone 空间', '布尔环', '表示定理', '对偶等价'],
      statement: [
        '设 $\\mathbf{BoolRing}$ 是**含单位元**的布尔环配上**保单位**的环同态（缺这一条，反等价不成立：$\\mathbb{F}_{2}$ 上允许零映射时，$\\operatorname{Spec}$ 会把两点粘成一点，还原出来是 $4$ 元环）。在这个约定下，布尔环范畴与 Stone 空间范畴**反等价**：',
        '',
        '$$\\mathbf{BoolRing}^{\\mathrm{op}}\\;\\simeq\\;\\mathbf{Stone}.$$',
        '',
        '两个方向是',
        '',
        [
          '- $B \\mapsto \\operatorname{Spec}(B) := \\operatorname{Hom}_{\\mathbf{Rng}}(B,\\ \\mathbb{F}_{2})$，配上 $\\mathbb{F}_{2}$（取离散拓扑）上的**乘积拓扑**；',
          '- $S \\mapsto \\operatorname{Clopen}(S)$ —— $S$ 的**开闭子集**全体，**加法取对称差**、**乘法取交**。'
        ].join('\n')
      ].join('\n'),
      notes: [
        '**为什么 $\\operatorname{Spec}$ 落在 Stone 空间里。** $\\operatorname{Spec}(B) \\subseteq \\mathbb{F}_{2}^{B}$ 是乘积空间的闭子集，而 $\\mathbb{F}_{2}$ 有限离散 —— 于是 $\\operatorname{Spec}(B)$ 紧、Hausdorff、全不连通，正是 Stone 空间。',
        '**为什么只用到 $\\mathbb{F}_{2}$。** 布尔环上，每个素理想都**自动是极大理想**：商 $B/\\mathfrak{p}$ 是整环，而整环里的幂等元只能是 $0$ 或 $1$，于是它就是 $\\mathbb{F}_{2}$。\n\n所以 $\\operatorname{Spec}(B) = \\operatorname{MaxSpec}(B)$ —— Zariski 拓扑退化成 Stone 拓扑，没有「非闭点」这种麻烦。',
        '**两个必记的对应**：$B = \\mathbb{F}_{2}$ 对应单点空间；$B = \\mathcal{P}(I)$ 对应 $\\beta I$（$I$ 的 Stone–Čech 紧化）—— 幂集对应的正是「最自由」的紧化。',
        '⭐ **这是「Stone 空间为什么特殊」的代数根源**。Stone 空间的每一个点、每一个开闭集都能用「幂等元」来读：全不连通性 = 元素幂等、紧性 = 环有单位、闭开集 = 幂等元本身。于是 Stone 空间上的计算可以整个翻译成**模 $2$ 的代数**。',
        '📌 与「挠 $\\leftrightarrow$ Stonean」那条对偶字典连起来看：纯代数侧的「挠」、拓扑侧的「极不连通」、环论侧的「幂等」三个词在同一个地方汇合 —— 这正是凝聚态数学反复用到 Stonean 空间的原因。',
        ['**证明（两个函子互逆）。**',
          '- **$S\\mapsto \\operatorname{Clopen}(S)$ 确实是布尔环**：对称差给加法、交是乘法，$S$ 本身是单位元，每个开闭集自带补，而开闭集都是幂等元 ✓；',
          '- **$B\\mapsto \\operatorname{Spec}(B)$ 是石空间**：$\\operatorname{Spec}(B)\\subseteq \\mathbb{F}_{2}^{B}$ 是乘积空间的**闭**子集（它是「每个 $f$ 是环同态」这组等式的公共解集），$\\mathbb{F}_{2}$ 有限离散故紧 Hausdorff，于是 $\\operatorname{Spec}(B)$ 紧 Hausdorff；\n\n' +
          '而 $\\mathbb{F}_{2}^{B}$ 极不连通、闭子空间仍极不连通 $\\implies$ $\\operatorname{Spec}(B)$ 极不连通，特别地全不连通 ✓；\n\n' +
          '',
          '- **两个复合是恒等**：$S\\mapsto \\operatorname{Clopen}(S)\\mapsto \\operatorname{Spec}(\\operatorname{Clopen}(S))$ —— 每个 $x\\in S$ 给求值 $\\operatorname{Clopen}(S)\\to\\mathbb{F}_{2}$，这是双射（Stone 空间里点由开闭集分离）；\n\n反向 $B\\mapsto \\operatorname{Spec}(B)\\mapsto \\operatorname{Clopen}(\\operatorname{Spec}(B))$ —— 每个 $b\\in B$ 给 $\\{f : f(b) = 1\\}$，它在 $\\operatorname{Spec}(B)$ 里开闭，且这个对应是**环同构**（用「每个素理想都是极大、商为 $\\mathbb{F}_{2}$」）✓；\n\n',
          '- **全忠实**由两个复合是恒等给出 ✓。∎',
          '⭐ 由此**布尔代数的所有定理都能翻译成 Stone 空间的语言**（反之亦然）—— 具体地：$B$ 中的幂等元（＝元素）对应 $\\operatorname{Spec}(B)$ 的开闭子集，$B$ 的理想对应 $\\operatorname{Spec}(B)$ 的闭子集。',
        ,
        '**各方向用到的假设**（对偶需要单位元约定、紧性及布尔素理想原理）：\n' +
        '- Stone 空间 $\\implies$ 开闭集布尔环：对称差和交的恒等式直接核对，全集给乘法单位元，免费。\n' +
        '- 布尔环 $\\implies$ 紧 Stone 谱：此处应取含单位的布尔环和保单位同态；同态方程切出有限离散空间乘积的闭子集，紧性用布尔素理想定理所支持的乘积紧性。\n' +
        '- 元素 $\\implies$ 谱的开闭集是直接的求值构造；证明不同元素可被点分离用布尔素理想定理，通常可由 Zorn 引理推出，但不必用完整选择公理。\n' +
        '- 谱的开闭集 $\\implies$ 来自一个环元素：基本开集覆盖经紧性化为有限覆盖，再用布尔运算；空间到双重谱的满射同样用紧性。\n' +
        '- 不保单位会引入零同态，例如 $\\mathbb F_2$ 到自身多出零映射，谱就不再是所述单点；任意无单位布尔环的对应也须改成局部紧版本。\n'
        ].join('\n')
      ].join('\n\n'),
      refs: ['Le Stum, Exercise 2.22']
    },

    {
      id: 'prop.closed-inclusion-filtered-limit',
      cluster: 'topo.cg',
      type: 'proposition',
      label: '紧块沿闭含入拼出的空间',
      title: '紧 Hausdorff 块沿闭含入的滤过余极限',
      regions: ['topology'],
      tags: ['拓扑', '紧 Hausdorff', '滤过余极限', '紧生成', '弱 Hausdorff'],
      statement: [
        '设 $X = \\varinjlim_{i \\in I} X_{i}$ 是**紧 Hausdorff 空间**沿**闭含入**的滤过余极限。则',
        '',
        [
          '1. $X$ 紧生成且弱 Hausdorff；',
          '2. 每个 $X_{i}$ 在 $X$ 中**闭**；',
          '3. $X$ 的拓扑就是这些紧块的**余极限拓扑**：$U \\subseteq X$ 开 $\\iff$ 每个 $U \\cap X_{i}$ 在 $X_{i}$ 中开。'
        ].join('\n'),
        '',
        '反过来，每个紧生成的弱 Hausdorff 空间都是它自己的紧 Hausdorff 子空间沿闭含入的滤过余极限。'
      ].join('\n'),
      notes: [
        '**第 3 条是这条命题的实质**。拓扑空间取余极限时，拓扑可能比「逐块看」的拓扑更粗或更细；这条说在这种情况下两侧**恰好一致** —— 一个集合是开的，当且仅当它在每一块上的迹是开的。于是「$X$ 上的连续函数」= 「一族在每块上连续的、互相相容的函数」，可以逐块处理。',
        '**为什么块要取紧 Hausdorff。** 紧性是「有限子覆盖」这种有限性条件的几何化身；在凝聚态数学里，紧 Hausdorff 空间正是「探测者」。把一个大对象写成紧块的滤过余极限，就等于把它写成「越来越大的有限信息」的极限 —— 一切计算都可以停机在某个块上。',
        '⭐ **用在哪**：证明「拟分离的凝聚态集的底空间弱 Hausdorff」时，先把拟分离的 $X$ 写成紧 Hausdorff 块沿含入的滤过余极限，再对这一串块取底空间 —— 由这条，余极限仍紧生成弱 Hausdorff。',
        '📌 与「$\\mathrm{CGWH}$ 的封闭性」那条分工：那条说的是「一般的 CGWH 空间沿闭含入拼起来还是 CGWH」，这条把块**换成紧 Hausdorff**，并额外给出拓扑的显式刻画与反向分解。',
        ,
        '**各方向用到的假设**（拓扑刻画是余极限定义，分离结论另需论证）：\n' +
        '- 拓扑空间中的余极限 $\\implies$ 开集逐块检测：这是终拓扑的定义，不需要先证明紧生成或弱 Hausdorff；原注把第 3 条称为额外实质须作此区分。\n' +
        '- 闭含入的滤过系统 $\\implies$ 各块在余极限中闭：共同后继块内两块的交闭，再用终拓扑检测；滤过性及闭含入用于这一步。\n' +
        '- 紧 Hausdorff 块的终拓扑 $\\implies$ 紧生成：块的结构映射就是紧 Hausdorff 探测映射；弱 Hausdorff 结论不能仅由这句定义推出，任意滤过索引下的完整证明该步未核实，记为缺口。\n' +
        '- 紧生成弱 Hausdorff 空间 $\\implies$ 紧 Hausdorff 子空间的滤过分解：弱 Hausdorff 保证紧 Hausdorff 探测映射的像闭且 Hausdorff，有限并给共同上界，紧生成保证终拓扑还原原拓扑。\n' +
        '- 不能删去紧生成：不可数集合的余可数拓扑是弱 Hausdorff，紧 Hausdorff 子空间均有限，其终拓扑为离散拓扑，不能还原原拓扑。\n'
      ].join('\n\n'),
      refs: ['Le Stum, Proposition 2.3.9']
    }

  ]
});
