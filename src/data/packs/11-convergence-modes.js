/* ==========================================================================
   内容包 · 收敛的类型（依测度 / a.e. / L¹ / 一致）
   --------------------------------------------------------------------------
   来自手写笔记「总结：积分」第 4 ~ 5 页。

   同一个函数列可以有五六种不同的「收敛」。这一包把它们排在一起，
   给出彼此的强弱关系、标准反例，以及两个经典定理（Egorov、Lusin）。

   关系图（箭头 = 推出）：
       一致 ⟹ 近一致 ⟹ a.e.
       一致 ⟹ 近一致 ⟹ 依测度
       L¹   ⟹ 依测度
   反方向全部不成立（反例都收在同一个节点里）。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '收敛的类型',
  nodes: [

    {
      id: 'def.convergence-modes',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '五种收敛',
      title: '收敛的类型：一致 / 近一致 / a.e. / 依测度 / L¹',
      regions: ['analysis'],
      tags: ['定义', '收敛', '依测度'],
      statement: [
        '设 $$f_n, f : X \\to \\mathbb{C}$$ 可测，X 带测度 μ。',
        '',
        '- **一致收敛** $$f_n ⇉ f$$：$$\\forall\\varepsilon > 0, \\exists N > 0, \\forall x \\in X, n > N \\implies |f_n(x) − f(x)| < \\varepsilon$$',
        '- **几乎处处收敛** $$f_n \\to f$$ a.e.：存在零集 E 使 $$f_n(x) \\to f(x)$$ 对一切 $$x \\in X \\setminus E$$ 成立',
        '- **依测度收敛** $$f_n \\to f$$ 依测度：$$\\forall\\varepsilon > 0, \\forall\\delta > 0, \\exists N, \\forall n > N : \\mu(\\{x : |f_n(x) − f(x)| > \\delta\\}) < \\varepsilon$$',
        '- **L¹ 收敛**：$$\\int |f_n − f| d\\mu \\to 0$$',
        '- **近一致收敛**：$$\\forall\\varepsilon > 0$$，存在 E 使 $$\\mu(E) < \\varepsilon$$ 且 $$f_n ⇉ f$$ 在 $$E^c$$ 上一致'
      ].join('\n'),
      notes: [
        '强弱关系（都能画成箭头）：',
        '',
        '$$一致 \\implies 近一致 \\implies a.e.$$',
        '$$一致 \\implies 近一致 \\implies 依测度$$',
        '$$L^1 \\implies 依测度$$',
        '',
        '⚠ 「依测度收敛」是最温和的一个：它不要求任何一处真的收敛，只要求「收敛失败的区域」越来越小。',
        '⚠ **a.e. 收敛与依测度收敛互不包含**：a.e. ⟹ 依测度在**有限测度**空间上成立（Egorov 的推论），反过来依测度 ⇏ a.e.（见反例 iv）。',
        '⚠ L¹ 收敛 ⇏ a.e. 收敛，a.e. 收敛 + 控制函数 ⟹ L¹ 收敛（这就是 DCT）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.4']
    },

    {
      id: 'prop.convergence-counterexamples',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: '四个标准反例',
      title: '命题：四个标准反例（把各种收敛区分开）',
      regions: ['analysis'],
      tags: ['反例', '收敛', '依测度'],
      statement: [
        '在 ℝ（或 [0, 1]）上取 Lebesgue 测度。',
        '',
        '- **(i)** $$f_n = n^{-1} \\chi_{(0, n)}$$：$$f_n ⇉ 0$$ **一致**收敛。',
        '- **(ii)** $$f_n = \\chi_{(n, n+1)}$$：$$f_n \\to 0$$ **逐点**（因而 a.e.），但**不一致**（$$sup_x |f_n| = 1$$），也不 L¹ 收敛（$$\\int f_n = 1 ↛ 0$$）。',
        '- **(iii)** $$f_n = n \\chi_{[0, 1/n]}$$：$$f_n \\to 0$$ a.e.（也依测度收敛，因为 $$\\mu(\\{|f_n| > \\delta\\}) = 1/n \\to 0$$），但**不 L¹ 收敛**（$$\\int f_n = 1$$ 对一切 n）。',
        '- **(iv) 二进制填充**：把右下角越来越小的区间排成一列 ——',
        '',
        '$$f_1 = \\chi_{[0,1]}，f_2 = \\chi_{[0,1/2]}，f_3 = \\chi_{[1/2,1]}，f_4 = \\chi_{[0,1/4]}，\\cdots$$',
        '即 $$f_n = \\chi_{[j/2^k, (j+1)/2^k]}$$（$$n = 2^k + j$$）：它**依测度**收敛到 0，但对**任何** $$x \\in [0,1]$$ 都**不**收敛。'
      ].join('\n'),
      notes: [
        '(iii) 是「a.e. 收敛 ⇏ L¹ 收敛」的标准反例 —— 也是 DCT 里「控制函数不能省」的根据。',
        '(iv) 是「依测度收敛 ⇏ a.e. 收敛」的标准反例。它的机制很值得记住：**每次取一个越来越窄的区间，但位置不停地搬家** —— 质量在每一处都只停留一瞬间，所以每点都不收敛，但「出错集合」的测度趋于 0。',
        '⭐ 这四个例子基本覆盖了所有反方向的护栏：一致最强、依测度最弱、a.e. 与 L¹ 各自独立。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.4']
    },

    {
      id: 'def.cauchy-in-measure',
      cluster: 'analysis.integral',
      type: 'definition',
      label: '依测度 Cauchy',
      title: '依测度 Cauchy 序列',
      regions: ['analysis'],
      tags: ['定义', 'Cauchy', '依测度'],
      statement: [
        '可测函数列 $$\\{f_n\\}$$ 是**依测度 Cauchy 的**，当且仅当',
        '',
        '$$\\forall\\varepsilon > 0, \\mu(\\{x : |f_n(x) − f_m(x)| \\ge \\varepsilon\\}) \\to 0　(m, n \\to \\infty)$$',
        '',
        '即：在测度意义下，下标够大之后各项彼此越来越近。'
      ].join('\n'),
      notes: [
        '**依测度 Cauchy ⟺ 依测度收敛**：两个方向都能证（收敛 ⟹ Cauchy 由三角不等式；Cauchy ⟹ 收敛就是下一条定理）。',
        '这是「依测度」这个拓扑的一个好处：它**完备**。相比之下 a.e. 收敛既不强也不完备，L¹ 收敛则完备（Riesz–Fischer）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, §2.4']
    },

    {
      id: 'thm.cauchy-in-measure',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: '依测度 Cauchy ⟹ 收敛',
      title: '定理：依测度 Cauchy 列必有依测度极限，且有一子列 a.e. 收敛',
      regions: ['analysis'],
      tags: ['定理', '依测度', '子列', 'Borel–Cantelli'],
      statement: [
        '若 $$\\{f_n\\}$$ 依测度 Cauchy，则存在可测函数 $$f$$ 使',
        '',
        '$$f_n \\to f 依测度，$$',
        '',
        '并且存在**子列** $$\\{f_{n_j}\\}$$ 使',
        '',
        '$$f_{n_j} \\to f　a.e.$$'
      ].join('\n'),
      notes: [
        '⭐ 这是「依测度收敛」最有用的性质：**收敛本身不保证任何一处真的收敛，但总能抽出一列几乎处处收敛的子列**。',
        '证明的工具是 Borel–Cantelli 型的推理：造出 $$\\sum_k \\mu(E_k) < \\infty$$ 的一族「坏集合」，则几乎每个点只落进有限多个坏集合。',
        '这也是 Riesz 定理（a.e. 收敛 ⟺ 依测度收敛 + 子列）的那一半。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.30']
    },

    {
      id: 'prop.L1-implies-measure',
      cluster: 'analysis.integral',
      type: 'proposition',
      label: 'L¹ 收敛 ⟹ 依测度收敛',
      title: '命题：L¹ 收敛蕴含依测度收敛（Markov 不等式）',
      regions: ['analysis'],
      tags: ['命题', 'L¹', '依测度', 'Markov'],
      statement: [
        '若 $$f_n \\to f$$ 于 $$L^1$$，则 $$f_n \\to f$$ 依测度：',
        '',
        '$$\\int |f_n − f| \\to 0 \\implies f_n \\to f 依测度$$'
      ].join('\n'),
      notes: [
        '工具是 **Markov（Chebyshev）不等式**：$$\n\\mu(\\{|g| \\ge \\varepsilon\\}) \\le (1/\\varepsilon)\\cdot\\int |g| d\\mu$$',
        '（因为 $$\\varepsilon \\chi_{\\{|g| \\ge \\varepsilon\\}} \\le |g|$$，两边积分即可。）取 $$g = f_n − f$$ 就得到结论。',
        '⚠ 反方向不成立：反例 (iii) 就是依测度收敛但不 L¹ 收敛。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Prop. 2.29']
    },

    {
      id: 'thm.egorov',
      cluster: 'analysis.integral',
      type: 'theorem',
      label: 'Egorov 定理',
      title: 'Egorov 定理：a.e. 收敛 ⟹ 近一致',
      regions: ['analysis'],
      tags: ['定理', 'Egorov', '近一致', '有限测度'],
      statement: [
        '设 $$\\mu(X) < \\infty$$，且 $$f_n \\to f$$ a.e.。则 $$f_n \\to f$$ **近一致**：',
        '',
        '$$\\forall\\varepsilon > 0, \\exists E \\subseteq X : \\mu(E) < \\varepsilon，且 f_n ⇉ f 在 X \\setminus E 上一致$$'
      ].join('\n'),
      notes: [
        '⭐ 「几乎处处收敛」听起来很弱，但 Egorov 说：只要空间**有限测度**，它其实差一点就是**一致收敛** —— 代价只是丢掉一个任意小的集合。',
        '⚠ **「$$\\mu(X) < \\infty$$」不能省。** 反例：$$f_n = \\chi_{(n, n+1)}$$ 在 ℝ 上，a.e. 收敛到 0，但丢掉任何有限测度的集合后，剩下的部分仍有 sup = 1，无法一致收敛。',
        '这是「丢掉小集合换取好性质」这一类结论的模板（Lusin 定理也是这个模式）。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.33']
    },

    {
      id: 'cor.lusin',
      cluster: 'analysis.integral',
      type: 'corollary',
      label: 'Lusin 定理',
      title: 'Lusin 定理：可测函数几乎处处连续',
      regions: ['analysis'],
      tags: ['推论', 'Lusin', '连续', '紧集'],
      statement: [
        '设 $$f : [a, b] \\to \\mathbb{C}$$ 是 Lebesgue 可测的。则对任意 ε > 0，存在**紧集** $$E \\subseteq [a, b]$$ 使',
        '',
        '$$\\mu(E^c) < \\varepsilon，且 f|_E 连续$$'
      ].join('\n'),
      notes: [
        '⭐ 「可测」这个条件看起来很弱，但 Lusin 说：可测函数差一点就是**连续**函数 —— 只要允许把定义域挖掉一小块。',
        '与 Egorov 的分工：Egorov 说「一列函数」几乎一致收敛，Lusin 说「一个函数」几乎连续。两者都是「丢掉小集合换取正则性」。',
        '⚠ 挖掉的那块必须容许是开集，剩下的必须是**紧**集（在 [a,b] 上紧 ⟺ 有界闭），不能只是可测集。'
      ].join('\n\n'),
      refs: ['Folland, Real Analysis, Theorem 2.34']
    }
  ],

  edges: [

    {
      id: 'imp.cauchy-in-measure',
      kind: 'implication',
      sources: ['def.cauchy-in-measure'],
      target: 'thm.cauchy-in-measure',
      title: '依测度 Cauchy ⟹ 依测度收敛且有一子列 a.e. 收敛',
      proof: [
        '**① 先抽子列，使「坏集合」的总测度有限。** 由 Cauchy 性，对每个 k 存在 $$N_k$$ 使',
        '',
        '$$\\mu(E_k) \\le 2^{-k}，　其中 E_k = \\{x : |f_n(x) − f_{N_k}(x)| \\ge 2^{-k}\\}　(n \\ge N_k)$$',
        '',
        '不妨取 $$N_1 < N_2 < \\cdots$$。记 $$g_j = f_{N_j}$$。',
        '',
        '**② 让坏集合的尾并收敛。** 令',
        '',
        '$$F_k = \\bigcup_{j \\ge k} E_j，　则 \\mu(F_k) \\le \\sum_{j\\ge k} 2^{-j} = 2^{1−k} \\to 0$$',
        '',
        '**③ 在 $$F_k^c$$ 上一致 Cauchy。** 若 $$x \\notin F_k$$，则对一切 $$i \\ge j \\ge k$$ 有 $$x \\notin E_j$$，于是',
        '',
        '$$|g_i(x) − g_j(x)| \\le 2^{1−j}$$',
        '',
        '所以 $$\\{g_j\\}$$ 在 $$F_k^c$$ 上**一致收敛**（Cauchy 且界趋于 0）。',
        '',
        '**④ 造极限 f。** 令 $$F = \\bigcap_k F_k^c$$，则',
        '',
        '$$\\mu(F) = \\mu(X \\setminus \\bigcup_k F_k) \\ge \\mu(X) − \\mu(F_k)　\\forall k　\\implies　\\mu(F^c) = 0$$',
        '',
        '在 F 上令 $$f(x) = lim_j g_j(x)$$，在 $$F^c$$ 上任取 0。f 是可测函数（可测函数的极限）。于是 $$g_j \\to f$$ **a.e.**',
        '',
        '**⑤ 换成依测度。** 取定 k，对 $$j \\ge k$$、$$x \\in F_k^c$$ 有 $$|g_j(x) − f(x)| \\le 2^{1−j}$$。于是对任意 δ > 0，',
        '',
        '$$\\mu(\\{|g_j − f| > \\delta\\}) \\le \\mu(F_k) \\le 2^{1−k}　(j 充分大)$$',
        '',
        '令 k → ∞ 得 $$g_j \\to f$$ 依测度。',
        '',
        '**⑥ 把 fₙ 也拉进来。** 对任意 ε > 0，',
        '',
        '$$\\{|f_n − f| \\ge \\varepsilon\\} \\subseteq \\{|f_n − g_j| \\ge \\varepsilon/2\\} \\cup \\{|g_j − f| \\ge \\varepsilon/2\\}$$',
        '',
        '右边第一项由 Cauchy 性（取 $$g_j = f_{N_j}$$ 足够靠后）任意小，第二项由 ⑤ 任意小。故 $$f_n \\to f$$ 依测度。∎'
      ].join('\n'),
      note: '② 里 $$\\sum 2^{-k} < \\infty$$ 是关键 —— 正是这一条让「坏集合的尾并」趋于零，也就是 Borel–Cantelli 的精神。'
    },

    {
      id: 'imp.L1-measure',
      kind: 'implication',
      sources: ['def.integrable'],
      target: 'prop.L1-implies-measure',
      title: 'Markov 不等式 ⟹ L¹ 收敛蕴含依测度收敛',
      proof: [
        '**Markov 不等式**：设 $$g$$ 可测非负，则对任意 ε > 0，',
        '',
        '$$\\mu(\\{g \\ge \\varepsilon\\}) \\le (1/\\varepsilon)\\cdot\\int g d\\mu$$',
        '',
        '证明：在 $$\\{g \\ge \\varepsilon\\}$$ 上有 $$\\varepsilon \\le g$$，即 $$\\varepsilon \\chi_{\\{g \\ge \\varepsilon\\}} \\le g$$；两边积分得 $$\\varepsilon\\cdot\\mu(\\{g \\ge \\varepsilon\\}) \\le \\int g$$。',
        '',
        '取 $$g = |f_n − f|$$。给定 δ > 0，',
        '',
        '$$\\mu(\\{|f_n − f| > \\delta\\}) \\le (1/\\delta)\\cdot\\int |f_n − f| d\\mu \\to 0$$',
        '',
        '（最后一步正是 L¹ 收敛的定义。）再对任意 ε > 0 取 n 足够大即可。∎'
      ].join('\n')
    },

    {
      id: 'imp.egorov',
      kind: 'implication',
      sources: ['def.convergence-modes'],
      target: 'thm.egorov',
      title: 'a.e. 收敛 + 有限测度 ⟹ 近一致',
      proof: [
        '设 $$f_n \\to f$$ a.e.，$$\\mu(X) < \\infty$$。',
        '',
        '**① 收敛点集与坏集合。** 令 $$F = \\{x : f_n(x) \\to f(x)\\}$$，则 $$\\mu(F^c) = 0$$。对每个固定的 k ∈ ℕ 令',
        '',
        '$$E_n(k) = \\bigcup_{m \\ge n} \\{x : |f_m(x) − f(x)| \\ge k^{-1}\\}$$',
        '',
        '（「从第 n 项起还有偏差 ≥ 1/k 的点」）。',
        '',
        '**② 对固定 k，$$E_n(k)$$ 随 n 递减，且 $$\\bigcap_n E_n(k) = F^c$$。**（若 x 最终偏差都 < 1/k，就不在任何足够靠后的 $$E_n(k)$$ 里。）',
        '',
        '**③ 用有限测度取极限。** 由 $$\\mu(X) < \\infty$$ 与测度的上连续性（递减列），',
        '',
        '$$\\mu(E_n(k)) \\to \\mu(F^c) = 0　(n \\to \\infty)$$',
        '',
        '**④ 挑出「足够快趋于 0」的那些 n。** 给定 ε > 0，对每个 k 选 $$n_k$$ 使',
        '',
        '$$\\mu(E_{n_k}(k)) < \\varepsilon \\cdot 2^{-k}$$',
        '',
        '**⑤ 并起来。** 令 $$E = \\bigcup_k E_{n_k}(k)$$。则',
        '',
        '$$\\mu(E) \\le \\sum_k \\mu(E_{n_k}(k)) < \\varepsilon \\cdot \\sum_k 2^{-k} = \\varepsilon$$',
        '',
        '**⑥ 在 $$E^c$$ 上一致收敛。** 取 $$x \\notin E$$。对任意 k，$$x \\notin E_{n_k}(k)$$，即对一切 $$n \\ge n_k$$ 有',
        '',
        '$$|f_n(x) − f(x)| < k^{-1}$$',
        '',
        '这正是「$$f_n ⇉ f$$ 在 $$E^c$$ 上」的定义（给定精度 $$k^{-1}$$ ≤ ε 后，取 $$N = n_k$$）。∎',
        '',
        '> ⚠ ③ 是唯一用到 $$\\mu(X) < \\infty$$ 的地方（递减列的上连续性需要首项有限）。少了它这一步就不成立，反例见节点正文。'
      ].join('\n')
    },

    {
      id: 'imp.lusin',
      kind: 'implication',
      sources: ['thm.approximation-L1', 'thm.egorov'],
      target: 'cor.lusin',
      title: '简单函数逼近 + Egorov ⟹ Lusin',
      proof: [
        '**① 先用简单函数逼近。** 由「L¹ 里的逼近」，取简单函数列 $$\\{\\varphi_n\\}$$ 使 $$\\int|f − \\varphi_n| \\to 0$$；取子列还可保证 $$\\varphi_n \\to f$$ a.e.（由 L¹ 收敛 ⟹ 依测度收敛 + 抽 a.e. 子列）。而简单函数是有限个可测集的特征函数之和。',
        '',
        '**② 先对「指示函数」办到。** 对可测集 A ⊆ [a, b] 与任意 ε > 0，由测度的正则性可找到紧集 E ⊆ A 使 $$\\mu(A \\setminus E) < \\varepsilon$$，于是 $$\\chi_A|_{E}$$ 连续（在 E 上恒为 1）。有限多个这样的紧集取交，就能让一整个简单函数在某个紧集上连续。',
        '',
        '**③ 用 Egorov 把「几乎处处」升级成「一致」。** 把 ①② 得到的「在紧集上连续」逐步加细：取一列越来越好的紧集，用 Egorov 保证 $$\\varphi_n \\to f$$ 在某块丢掉任意小测度的集合后**一致**收敛。一致收敛保持连续性，故 f 限制在剩下的那个紧集上连续。',
        '',
        '**④ 收尾。** 每一步丢掉的测度都可以预先取得任意小，全部并起来仍小于 ε（把 ε 预先换成 ε/3、ε/9、… 再求和）。于是得到一个紧集 E ⊆ [a, b]，$$\\mu(E^c) < \\varepsilon$$ 且 $$f|_E$$ 连续。∎',
        '',
        '> ⭐ 核心思想与 Egorov 一样是「**丢掉一小块，换取好性质**」：这次换到的是连续性。'
      ].join('\n'),
      note: '笔记里 Lusin 是紧接在 Egorov 之后作为 Cor. 写的，路线也确实是「Egorov + 简单函数逼近」。'
    },

    /* ------------------------- 定义引用（蓝线） ------------------------- */
    {
      id: 'def-link.modes-counterexamples',
      kind: 'definition',
      definition: 'def.convergence-modes',
      usedBy: 'prop.convergence-counterexamples',
      note: '四个反例各自击破一种收敛的逆命题。'
    },
    {
      id: 'def-link.modes-egorov',
      kind: 'definition',
      definition: 'def.convergence-modes',
      usedBy: 'thm.egorov',
      note: 'Egorov 定理说的是其中两种收敛（a.e. 与近一致）的关系。'
    },
    {
      id: 'def-link.cauchy-thm',
      kind: 'definition',
      definition: 'def.cauchy-in-measure',
      usedBy: 'thm.cauchy-in-measure',
      note: '定理把「依测度 Cauchy」升级成「依测度收敛 + a.e. 子列」。'
    },
    {
      id: 'def-link.integrable-measure',
      kind: 'definition',
      definition: 'def.integrable',
      usedBy: 'prop.L1-implies-measure',
      note: 'L¹ 收敛的定义里用到 ∫|fₙ − f|。'
    },
    {
      id: 'def-link.modes-L1',
      kind: 'definition',
      definition: 'def.convergence-modes',
      usedBy: 'prop.L1-implies-measure',
      note: '两种收敛的定义直接对照。'
    },
    {
      id: 'def-link.measure-egorov',
      kind: 'definition',
      definition: 'def.measure',
      usedBy: 'thm.egorov',
      note: '证明的 ③ 靠测度的上连续性，而那是可数可加性的推论。'
    }
  ]
});
