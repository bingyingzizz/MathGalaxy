/* ==========================================================================
   内容包 · 模的张量积、平坦与内射（24 点）
   --------------------------------------------------------------------------
   一次把三个空星团填满（clusters.js 里三者的 hub 恰好就是这里的三个点）：

     hom.module    模的张量积与标量限制
                   $M\\otimes_{R} N$ 的构造与万有性质 → 双函子 / 结合 / 对称 / 保直和
                   → 张量–内 Hom 伴随 → 标量限制与标量扩张（一对伴随）
                   → 纤维余积与基变换

     hom.flat      平坦模
                   张量右正合 → 平坦 $\\iff$ 左正合 → 五条等价说法
                   → 自由/投射平坦、直和项平坦、整环上平坦即无挠
                   → Lambek 判据（只需有限生成理想）→ 反例 $\\mathbb{Q}$

     hom.injective 内射模与可除群
                   提升性质 → 单射可裂 → Baer 判据 → 主理想整环上内射即除
                   → 商可除、$\\mathbb{Q}$ 与 $\\mathbb{Q}/\\mathbb{Z}$ 与 Prüfer 群
                   → 模范畴的两块地基：足够多内射 / 足够多投射

   ⚠️ clusters.js 里 hom.flat 的描述还提到 **Lazard 定理**（平坦 = 有限生成自由模的
   滤过余极限）与 **Watts 定理**（保直和的正合函子都是张量）—— 这一包没写，留给下一批；
   本包其余部分按描述补齐。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '模的张量积、平坦与内射',
  nodes: [

    /* ==================================================================
       星团 hom.module：模的张量积与标量限制
       ================================================================== */

    {
      id: 'def.tensor-module',
      cluster: 'hom.module',
      type: 'definition',
      label: '模的张量积',
      title: '模的张量积 $M \\otimes_{R} N$',
      regions: ['homology'],
      tags: ['定义', '同调代数', '模', '张量积'],
      statement: [
        '设 $R$ 是含幺环，$M$ 是右 $R$-模、$N$ 是左 $R$-模。取以 $M \\times N$ 为基的自由阿贝尔群 $F := \\mathbb{Z}^{(M \\times N)}$，令 $K \\subseteq F$ 是由形如',
        '',
        '$$(m + m_{1},\\ n) - (m,\\ n) - (m_{1},\\ n), \\qquad (m,\\ n + n_{1}) - (m,\\ n) - (m,\\ n_{1}), \\qquad (m r,\\ n) - (m,\\ r n)$$',
        '',
        '的一切元素（$m, m_{1} \\in M$、$n, n_{1} \\in N$、$r \\in R$）张成的子群。定义',
        '',
        '$$M \\otimes_{R} N := F / K, \\qquad m \\otimes n := [\\,(m, n)\\,].$$',
        '',
        '它的元素是纯张量 $m \\otimes n$ 的**有限和** $\\sum_{i} m_{i} \\otimes n_{i}$。像满足两条双加性关系与一条**平衡**关系 $m r \\otimes n = m \\otimes r n$；并且对每个**平衡双加性**映射 $B : M \\times N \\to P$（$P$ 是阿贝尔群），存在**唯一**的群同态',
        '',
        '$$\\widetilde{B} : M \\otimes_{R} N \\longrightarrow P, \\qquad \\widetilde{B}(m \\otimes n) = B(m, n).$$',
        '',
        '若 $R$ 交换，$r \\cdot (m \\otimes n) := (m r) \\otimes n$ 使 $M \\otimes_{R} N$ 成为 $R$-模。'
      ].join('\n'),
      notes: [
        '**读法**：三个关系各管一件事 —— 前两条说 $\\otimes$ 对两个变元分别可加，第三条 $m r \\otimes n = m \\otimes r n$ 说「$R$ 的作用可以从一边搬到另一边」。交换环上第三条写成 $r m \\otimes n = m \\otimes r n$，最眼熟。',
        '**元素不是纯张量**：一般元素是有限和，所以「$\\sum m_{i} \\otimes n_{i}$ 是否为零」不能逐项看。纯张量仍可能等于零：$\\mathbb{Z}/2 \\otimes_{\\mathbb{Z}} \\mathbb{Z}/3 = 0$，因为',
        '$$1 \\otimes 1 = (3 \\cdot 1) \\otimes 1 = 1 \\otimes (3 \\cdot 1) = 1 \\otimes 0 = 0 .$$',
        '⭐ **构造与基无关**：万有性质说任何「把双线性换成线性」的对象都同构于它，所以换一种造法（例如先做自由模再取商）得到同一个东西。',
        '📌 与 `prop.module-tensor-universal` 的关系：那是 $\\mathbb{Z}$ 与域系数下的特例；一般 $R$ 上多出来的只有平衡那条关系。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2「Hom and Tensor」, construction and universal property of the tensor product',
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2「Modules」, tensor products of modules'
      ]
    },

    {
      id: 'prop.tensor-functor-properties',
      cluster: 'hom.module',
      type: 'proposition',
      label: '张量积的函子性质',
      title: '张量积的双函子性、与直和交换、结合、对称与单位',
      regions: ['homology'],
      tags: ['命题', '同调代数', '张量积', '双函子', '直和'],
      statement: [
        '张量积是一个**双函子** $\\otimes_{R} : \\mathbf{Mod}\\text{-}R \\times R\\text{-}\\mathbf{Mod} \\to \\mathbf{Ab}$，并且：',
        '',
        '1. **加法性**：对 $f : M \\to M_{1}$、$g : N \\to N_{1}$，有 $f \\otimes g$；固定一个变元时是加法函子。',
        '2. **与直和交换**：$(\\bigoplus_{i} M_{i}) \\otimes_{R} N \\cong \\bigoplus_{i} (M_{i} \\otimes_{R} N)$，$M \\otimes_{R} (\\bigoplus_{j} N_{j}) \\cong \\bigoplus_{j} (M \\otimes_{R} N_{j})$，且同构自然。',
        '3. **单位**：$R \\otimes_{R} N \\cong N$（$r \\otimes n \\mapsto r n$）；一般地 $R^{(I)} \\otimes_{R} N \\cong N^{(I)}$。',
        '4. **结合**：若 $M$ 是 $(S, R)$-双模、$N$ 是 $(R, T)$-双模、$P$ 是左 $T$-模，则',
        '$$(M \\otimes_{R} N) \\otimes_{T} P \\;\\cong\\; M \\otimes_{R} (N \\otimes_{T} P).$$',
        '5. **对称**（$R$ 交换）：$\\tau : M \\otimes_{R} N \\to N \\otimes_{R} M$、$m \\otimes n \\mapsto n \\otimes m$，且 $\\tau \\circ \\tau = \\mathrm{id}$。'
      ].join('\n'),
      notes: [
        '⭐ 由 2、3 立刻得到：$(-) \\otimes_{R} N$ **保余极限**（直和、余核、滤过余极限）。这一条同时解释了「右正合」（保余核）与「保直和」，是后面 `prop.tensor-right-exact` 与 `prop.free-flat` 的共同根。',
        '⚠️ 一般**不保**极限：$\\otimes$ 不保核。$0 \\to \\mathbb{Z} \\xrightarrow{\\;2\\;} \\mathbb{Z}$ 是正合列，取 $N = \\mathbb{Q}$ 张量后仍正合（乘 $2$ 在 $\\mathbb{Q}$ 上仍然单），但取 $N = \\mathbb{Z}/2$ 张量后乘 $2$ 变成零映射，核冒出来了（见 `prop.tensor-right-exact`）。它也不保无限积。',
        '📌 结合律 4 在交换环上的常见样子：$(M \\otimes_{R} N) \\otimes_{R} P \\cong M \\otimes_{R} N \\otimes_{R} P$，于是可以不加括号地写多重张量积。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2「Hom and Tensor」, elementary properties of the tensor product',
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2「Modules」, tensor products and direct sums'
      ]
    },

    {
      id: 'thm.hom-tensor-adjunction-mod',
      cluster: 'hom.module',
      type: 'theorem',
      label: '张量与内同态的伴随',
      title: '$\\operatorname{Hom}(M \\otimes_{R} N, P) \\cong \\operatorname{Hom}(M, \\operatorname{Hom}(N, P))$',
      regions: ['homology'],
      tags: ['定理', '同调代数', '张量积', '伴随', '内同态'],
      statement: [
        '设 $R$ 是**交换**含幺环，$M, N, P$ 是 $R$-模。则存在**自然同构**',
        '',
        '$$\\operatorname{Hom}_{R}\\bigl(M \\otimes_{R} N,\\ P\\bigr) \\;\\cong\\; \\operatorname{Hom}_{R}\\bigl(M,\\ \\operatorname{Hom}_{R}(N, P)\\bigr), \\qquad f \\longmapsto \\bigl(m \\mapsto (n \\mapsto f(m \\otimes n))\\bigr),$$',
        '',
        '即函子 $(-) \\otimes_{R} N$ 是 $\\operatorname{Hom}_{R}(N, -)$ 的**左伴随**：',
        '',
        '$$(-) \\otimes_{R} N \\;\\dashv\\; \\operatorname{Hom}_{R}(N, -).$$'
      ].join('\n'),
      notes: [
        '**证明（显式写映射）**：记 $\\Phi(f) := \\bigl(m \\mapsto (n \\mapsto f(m \\otimes n))\\bigr)$。反向 $\\Psi(g) := \\bigl(m \\otimes n \\mapsto g(m)(n)\\bigr)$：因为 $(m, n) \\mapsto g(m)(n)$ 是平衡双加性的，由 `def.tensor-module` 的万有性质它唯一地给出 $\\Psi(g)$。$\\Phi \\Psi$ 与 $\\Psi \\Phi$ 在纯张量（或 $M$ 的生成元）上是恒等，而生成元张成整个模，故互逆。自然性：$\\Phi$ 的公式里没有任何选取，只用到 $\\otimes$ 与复合。∎',
        '⭐ 这就是**curry 化**：两个变元的东西，与「取值在函数空间里」的一个变元的东西，是同一件事。',
        '**两条推论立刻可用**：$(-) \\otimes_{R} N$ 是左伴随，故**保余极限**（右正合、保直和、保滤过余极限）；$\\operatorname{Hom}_{R}(N, -)$ 是右伴随，故**保极限**（左正合、保积）。',
        '📌 非交换版本：$M$ 右 $R$-模、$N$ 左 $R$-模、$P$ 为阿贝尔群时，同一条同构改写成',
        '$$\\operatorname{Hom}_{\\mathbb{Z}}(M \\otimes_{R} N,\\ P) \\;\\cong\\; \\operatorname{Hom}_{R}\\bigl(M,\\ \\operatorname{Hom}_{\\mathbb{Z}}(N, P)\\bigr),$$',
        '要点只是：$\\operatorname{Hom}_{\\mathbb{Z}}(N, P)$ 天然是右 $R$-模。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2, Proposition 2.53（adjoint associativity）',
        'Cartan–Eilenberg, Homological Algebra, Chapter II, adjoint associativity of Hom and tensor'
      ]
    },

    {
      id: 'def.scalar-restriction',
      cluster: 'hom.module',
      type: 'definition',
      label: '标量限制',
      title: '标量限制 $f_{\\ast} : S\\text{-}\\mathbf{Mod} \\to R\\text{-}\\mathbf{Mod}$',
      regions: ['homology'],
      tags: ['定义', '同调代数', '模', '换环', '标量限制'],
      statement: [
        '设 $f : R \\to S$ 是含幺环同态（$f(1) = 1$）。给定左 $S$-模 $P$，定义左 $R$-模 $f_{\\ast} P$：**加法群完全不变**，作用改为',
        '',
        '$$r \\cdot p := f(r)\\, p .$$',
        '',
        '这叫 $P$ 沿 $f$ 的**标量限制**（restriction of scalars）。态射上取恒等（$S$-线性映射当然是 $R$-线性的），得到函子',
        '',
        '$$f_{\\ast} : S\\text{-}\\mathbf{Mod} \\longrightarrow R\\text{-}\\mathbf{Mod}.$$'
      ].join('\n'),
      notes: [
        '**读法**：元素一个没动，只是「哪些标量算数」变小了。取 $R = \\mathbb{Z}$、$f$ 为唯一同态时，$f_{\\ast}P$ 就是 $P$ 的加法群 —— 所以「每个模都是阿贝尔群」是标量限制的特例。',
        '**忠实但一般不全**：$S$-线性蕴含 $R$-线性，故 $\\operatorname{Hom}_{S}(P, Q) \\subseteq \\operatorname{Hom}_{R}(f_{\\ast}P, f_{\\ast}Q)$；反向不成立。例：$\\mathbb{Z} \\to \\mathbb{C}$ 时，共轭 $z \\mapsto \\bar{z}$ 是 $\\mathbb{Z}$-线性的却不是 $\\mathbb{C}$-线性的。',
        '⭐ **正合**：核与余核在标量限制下逐点计算（底层加法群不变），所以 $f_{\\ast}$ 保核、保余核，是正合函子。这与它是右伴随（`prop.scalar-extension-adjunction`）给出的结论一致，但这里比那更直接。',
        '📌 反方向的函子是把 $R$-模做成 $S$-模的**标量扩张** `def.scalar-extension`；那一个才是左伴随。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2, restriction and extension of scalars',
        'Cartan–Eilenberg, Homological Algebra, Chapter II, change of rings'
      ]
    },

    {
      id: 'def.scalar-extension',
      cluster: 'hom.module',
      type: 'definition',
      label: '标量扩张',
      title: '标量扩张 $S \\otimes_{R} -$',
      regions: ['homology'],
      tags: ['定义', '同调代数', '模', '换环', '标量扩张'],
      statement: [
        '设 $f : R \\to S$ 是含幺环同态，$M$ 是左 $R$-模。把 $S$ 看成 $(S, R)$-双模：',
        '',
        '$$s \\cdot s_{1} := s s_{1}, \\qquad s_{1} \\cdot r := s_{1} f(r).$$',
        '',
        '则 $S \\otimes_{R} M$ 自然带左 $S$-模结构',
        '',
        '$$s \\cdot (s_{1} \\otimes m) := (s s_{1}) \\otimes m,$$',
        '',
        '得到的函子',
        '',
        '$$f_{!} = S \\otimes_{R} - : R\\text{-}\\mathbf{Mod} \\longrightarrow S\\text{-}\\mathbf{Mod}$$',
        '',
        '叫**标量扩张**（extension of scalars）。'
      ].join('\n'),
      notes: [
        '**为什么正好是张量积**：$M$ 上只有 $R$-作用，想让它吃 $S$ 的标量，最省的做法就是「把 $S$ 当成新的自由坐标贴上去」—— 这正是 $S \\otimes_{R} M$ 在做的事（见 `prop.scalar-extension-adjunction` 的万有性质）。',
        '**三个常见例子**：$\\mathbb{R} \\to \\mathbb{C}$ 给出**复化** $\\mathbb{C} \\otimes_{\\mathbb{R}} V$；$\\mathbb{Z} \\to \\mathbb{Z}[1/n]$ 给出局部化 $M[1/n]$；$R \\to R/I$ 给出 $M / I M$。',
        '⭐ 后两个例子说明：**局部化**与**模掉理想**是同一个函子在两类不同 $S$ 下的样子 —— 这是换环观点最划算的地方。',
        '⚠️ $S \\otimes_{R} -$ 只**右正合**，一般不正合；它左正合当且仅当 $S$ 是平坦 $R$-模（`def.flat-module`）。几何上「平坦基变换」保纤维的维数，说的就是这条。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2, extension of scalars',
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2「Modules」, change of rings'
      ]
    },

    {
      id: 'prop.scalar-extension-adjunction',
      cluster: 'hom.module',
      type: 'proposition',
      label: '标量扩张与限制互为伴随',
      title: '$S \\otimes_{R} - \\dashv f_{\\ast}$',
      regions: ['homology'],
      tags: ['命题', '同调代数', '伴随', '换环', '标量扩张'],
      statement: [
        '对每个含幺环同态 $f : R \\to S$，有伴随对',
        '',
        '$$S \\otimes_{R} - \\;\\dashv\\; f_{\\ast} : R\\text{-}\\mathbf{Mod} \\rightleftarrows S\\text{-}\\mathbf{Mod},$$',
        '',
        '即对每个左 $R$-模 $M$ 与左 $S$-模 $P$ 有自然同构',
        '',
        '$$\\operatorname{Hom}_{S}\\bigl(S \\otimes_{R} M,\\ P\\bigr) \\;\\cong\\; \\operatorname{Hom}_{R}\\bigl(M,\\ f_{\\ast} P\\bigr), \\qquad g \\longmapsto \\bigl(m \\mapsto g(1 \\otimes m)\\bigr).$$',
        '',
        '单位 $\\eta_{M} : M \\to f_{\\ast}(S \\otimes_{R} M)$、$m \\mapsto 1 \\otimes m$；余单位 $\\varepsilon_{P} : S \\otimes_{R} f_{\\ast} P \\to P$、$s \\otimes p \\mapsto s p$。'
      ].join('\n'),
      notes: [
        '**证明**：$S$-线性映射 $g : S \\otimes_{R} M \\to P$ 首先是 $R$-线性映射，于是被 $m \\mapsto g(1 \\otimes m)$ 决定（因为 $s \\otimes m = s(1 \\otimes m)$）；反过来，给定 $R$-线性 $\\varphi : M \\to P$，$S$-平衡式 $(s, m) \\mapsto s \\varphi(m)$ 良定义，由万有性质唯一给出 $S$-线性映射 $S \\otimes_{R} M \\to P$。两个方向互逆，公式里没有选取，故自然 ✓。',
        '三角恒等式：$\\varepsilon_{S \\otimes M} \\circ (S \\otimes \\eta_{M}) = \\mathrm{id}$ 与 $f_{\\ast}\\varepsilon_{P} \\circ \\eta_{f_{\\ast}P} = \\mathrm{id}$ 在纯张量（或 $M$ 的元素）上验证，再线性延拓 ✓。∎',
        '⭐ **「最自由」的精确含义**：任何把 $M$ 送进某个 $S$-模、且与 $R$-作用相容的映射，都唯一地穿过 $1 \\otimes -$。所以 $S \\otimes_{R} M$ 是「$M$ 在 $S$-模范畴里的像」的标准答案。',
        '**立刻可得**：$S \\otimes_{R} -$ 右正合、保余极限（左伴随）；$f_{\\ast}$ 左正合（右伴随），实际上正合。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2, the adjunction between extension and restriction of scalars',
        'Cartan–Eilenberg, Homological Algebra, Chapter II, induction and coinduction for change of rings'
      ]
    },

    {
      id: 'prop.scalar-extension-coproduct',
      cluster: 'hom.module',
      type: 'proposition',
      label: '纤维余积与基变换',
      title: '$S \\otimes_{R} T$ 是代数的推出，且与基变换相容',
      regions: ['homology'],
      tags: ['命题', '同调代数', '张量积', '基变换', '余积'],
      statement: [
        '设 $R$ 是交换环，$f : R \\to S$、$g : R \\to T$ 是交换 $R$-代数。则：',
        '',
        '1. $S \\otimes_{R} T$ 是 $R$-代数范畴中「$S \\leftarrow R \\to T$」的**推出**（纤维余积）：任何一对 $R$-代数同态 $S \\to U$、$T \\to U$ 都唯一地通过 $S \\otimes_{R} T$ 分解；',
        '2. **基变换**：对 $S$-模 $M$，有自然同构',
        '$$T \\otimes_{R} M \\;\\cong\\; (S \\otimes_{R} T) \\otimes_{S} M,$$',
        '即「先沿 $R \\to S$ 扩张、再沿 $R \\to T$ 换环」与「沿 $R \\to S \\otimes_{R} T$ 一步扩张」一致；',
        '3. 对 $S$-模 $M$、$T$-模 $N$，$M \\otimes_{R} N$ 自然带 $S \\otimes_{R} T$-模结构',
        '$$(s \\otimes t) \\cdot (m \\otimes n) := s m \\otimes t n .$$'
      ].join('\n'),
      notes: [
        '**证明（1）**：$s \\mapsto s \\otimes 1$、$t \\mapsto 1 \\otimes t$ 给出余锥。给余锥 $(\\alpha : S \\to U,\\ \\beta : T \\to U)$，映射 $(s, t) \\mapsto \\alpha(s)\\beta(t)$ 是 $R$-平衡的（这一步用**交换性**：$sr \\otimes t$ 与 $s \\otimes rt$ 给出同一个值），故由万有性质唯一给出 $R$-模映射 $S \\otimes_{R} T \\to U$；交换性又保证它保乘法，所以是代数同态。唯一性由纯张量生成全体给出 ✓。（2）（3）都由同一个平衡双线性表示给出，逐条验证公理 ✓。∎',
        '⭐ **几何含义**：$\\operatorname{Spec}(S \\otimes_{R} T) \\cong \\operatorname{Spec} S \\times_{\\operatorname{Spec} R} \\operatorname{Spec} T$。环的**推出**对应概形的**纤维积** —— 概形论里所有「基变换」都在用这一条。',
        '⚠️ 交换性不能省：定义乘法 $(s \\otimes t)(s_{1} \\otimes t_{1}) = s s_{1} \\otimes t t_{1}$ 要先把中间因子搬动，非交换环上搬不动，只能得到别的构造（还得多加关系）。',
        '📌 与 `prop.scalar-extension-adjunction` 合起来看：环的推出 = 模范畴里换环的复合，这是「换环是函子」的范畴化说法。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2, tensor product of algebras',
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2, tensor product of algebras and base change'
      ]
    },

    /* ==================================================================
       星团 hom.flat：平坦模
       ================================================================== */

    {
      id: 'prop.tensor-right-exact',
      cluster: 'hom.flat',
      type: 'proposition',
      label: '张量函子右正合',
      title: '$(-) \\otimes_{R} N$ 右正合，左正合当且仅当 $N$ 平坦',
      regions: ['homology'],
      tags: ['命题', '同调代数', '张量积', '正合', '右正合'],
      statement: [
        '设 $R$ 是含幺环，$N$ 是左 $R$-模。函子 $(-) \\otimes_{R} N : \\mathbf{Mod}\\text{-}R \\to \\mathbf{Ab}$ 是**右正合**的：每个短正合列',
        '',
        '$$0 \\longrightarrow M_{1} \\xrightarrow{\\;f\\;} M \\xrightarrow{\\;g\\;} M_{2} \\longrightarrow 0$$',
        '',
        '给出正合列',
        '',
        '$$M_{1} \\otimes_{R} N \\xrightarrow{\\;f \\otimes 1\\;} M \\otimes_{R} N \\xrightarrow{\\;g \\otimes 1\\;} M_{2} \\otimes_{R} N \\longrightarrow 0 .$$',
        '',
        '进一步，下列等价：(i) $(-) \\otimes_{R} N$ **正合**；(ii) 对每个单射 $M_{1} \\rightarrowtail M$，$M_{1} \\otimes N \\to M \\otimes N$ 仍单射；(iii) $N$ 是**平坦**的。',
        '',
        '（右端那个 $\\to 0$ 永远正合；缺的只有左端的 $0$。）'
      ].join('\n'),
      notes: [
        '**证明（伴随路线，最快）**：由 `thm.hom-tensor-adjunction-mod`，$(-) \\otimes_{R} N \\dashv \\operatorname{Hom}_{R}(N, -)$。左伴随保所有余极限，而余核是两项图的余极限，故 $(-) \\otimes N$ 保余核 —— 对加法函子来说「保余核」正是「把短正合列送成 $M_{1} \\otimes N \\to M \\otimes N \\to M_{2} \\otimes N \\to 0$ 正合」✓。',
        '**直接算也行**：$g$ 满蕴含 $g \\otimes 1$ 满（每个 $m_{2} \\otimes n$ 有原像 $m \\otimes n$）；核：由 $\\ker g = \\operatorname{im} f$，满足 $g(m) = 0$ 的 $m$ 可写 $f(m_{1})$，于是纯张量 $m \\otimes n = (f \\otimes 1)(m_{1} \\otimes n)$，一般元素按双加性拆开即得 $\\ker(g \\otimes 1) \\subseteq \\operatorname{im}(f \\otimes 1)$；反向由 $g f = 0$ ✓。',
        '⚠️ **左端会丢**：$0 \\to \\mathbb{Z} \\xrightarrow{\\;2\\;} \\mathbb{Z} \\to \\mathbb{Z}/2 \\to 0$ 张量 $N = \\mathbb{Z}/2$ 之后，$\\mathbb{Z} \\otimes \\mathbb{Z}/2 \\xrightarrow{\\;2\\;} \\mathbb{Z} \\otimes \\mathbb{Z}/2$ 是零映射，不再单射。',
        '⭐ 于是「右正合」是白送的、**左正合才是性质**，而那个性质的名字就叫平坦。丢掉的左端不是凭空消失：它是 $\\operatorname{Tor}_{1}^{R}(M_{2}, N)$（见 `prop.flat-equivalences`）。'
      ].join('\n\n'),
      refs: [
        'Cartan–Eilenberg, Homological Algebra, Chapter II, right exactness of the tensor product',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Chapter 2, exactness properties of the tensor product'
      ]
    },


    {
      id: 'prop.flat-equivalences',
      cluster: 'hom.flat',
      type: 'proposition',
      label: '平坦的等价说法',
      title: '平坦的五条等价刻画',
      regions: ['homology'],
      tags: ['命题', '同调代数', '平坦', 'Tor', '理想'],
      statement: [
        '设 $R$ 是交换含幺环，$N$ 是 $R$-模。下列等价：',
        '',
        '1. $N$ 平坦，即 $(-) \\otimes_{R} N$ 正合；',
        '2. 对每个单射 $M_{1} \\rightarrowtail M$，$M_{1} \\otimes_{R} N \\to M \\otimes_{R} N$ 单射；',
        '3. 对一切 $R$-模 $M$，$\\operatorname{Tor}_{1}^{R}(M, N) = 0$；',
        '4. 对每个**理想** $I \\subseteq R$，乘法映射 $I \\otimes_{R} N \\to N$、$a \\otimes n \\mapsto a n$，是单射（等价地 $I \\otimes_{R} N \\cong I N$）；',
        '5. 对每个由有限表现模给出的短正合列 $0 \\to K \\to R^{n} \\to M \\to 0$，张量后 $0 \\to K \\otimes N \\to N^{n} \\to M \\otimes N \\to 0$ 仍正合。'
      ].join('\n'),
      notes: [
        '**1 与 2 是同一句话**（右正合白送）。**2 与 3**：取 $M$ 的投射消解，$\\operatorname{Tor}_{1}$ 度量的正是「张量之后丢掉的那块单射性」。',
        '**3 蕴含 4**：由 $0 \\to I \\to R \\to R/I \\to 0$ 与 $\\operatorname{Tor}_{1}^{R}(R, N) = 0$ 得长正合列',
        '$$0 \\longrightarrow \\operatorname{Tor}_{1}^{R}(R/I, N) \\longrightarrow I \\otimes N \\longrightarrow N,$$',
        '故 $\\operatorname{Tor}_{1}^{R}(R/I, N) = 0$ 推出 $I \\otimes N \\to N$ 单 ✓。',
        '**4 蕴含 1**：只需对一切单射检验；先化到 $M$ 有限生成（$(-)\\otimes N$ 保滤过余极限），再对生成元个数归纳，每一步用理想情形 —— 完整论证见 `thm.lambek` ✓。',
        '⭐ **第 4 条是唯一能算的**：理想通常比子模少得多，而乘法映射 $I \\otimes N \\to N$ 又常能显式写出来。PID 上理想只有主理想，判据几乎自动（这就是「无挠即平坦」的来源）。'
      ].join('\n\n'),
      refs: [
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2「Modules」, flatness and Tor',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), flat modules and vanishing of Tor'
      ]
    },

    {
      id: 'prop.free-flat',
      cluster: 'hom.flat',
      type: 'proposition',
      label: '自由模平坦',
      title: '自由模与投射模都是平坦的',
      regions: ['homology'],
      tags: ['命题', '同调代数', '平坦', '自由模', '投射'],
      statement: [
        '自由模 $R^{(I)}$ 是**平坦**的；更一般地，**投射模平坦**。',
        '',
        '具体地，$M \\otimes_{R} R^{(I)} \\cong M^{(I)}$ 自然（$m \\otimes (r_{i})_{i} \\mapsto (m r_{i})_{i}$），而「取 $I$ 重直和」逐分量判定正合性。'
      ].join('\n'),
      notes: [
        '**证明**：由 `prop.tensor-functor-properties` 的「单位」与「与直和交换」两条，',
        '$$(-) \\otimes_{R} R^{(I)} \\;\\cong\\; \\bigoplus_{i \\in I} (-),$$',
        '右边就是「取 $I$ 重直和」，它正合（一族函子的直和正合，因为单射逐分量判定）✓。',
        '**投射模平坦**：投射模是自由模的直和项（`def.projective-object` 之后的注记），而直和项继承平坦性（`prop.flat-summand`）✓。∎',
        '⭐ **用处**：这条保证了「投射消解就是平坦消解」，于是 $\\operatorname{Tor}$ 既可以用投射消解算、也可以用平坦消解算；后者常常短得多（例如局部化给出的平坦消解）。',
        '⚠️ 反向不成立：平坦不投射（`ex.flat-not-projective`）。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), free and projective modules are flat',
        'Cartan–Eilenberg, Homological Algebra, Chapter II, flatness of free modules'
      ]
    },

    {
      id: 'prop.flat-summand',
      cluster: 'hom.flat',
      type: 'proposition',
      label: '平坦的直和项',
      title: '平坦模的直和项平坦，直和平坦当且仅当每个平坦',
      regions: ['homology'],
      tags: ['命题', '同调代数', '平坦', '直和', '直和项'],
      statement: [
        '若 $F$ 平坦且 $M$ 是 $F$ 的**直和项**（$F \\cong M \\oplus M_{2}$），则 $M$ 平坦。特别地：',
        '',
        '- 投射模平坦（投射 = 自由模的直和项，配合 `prop.free-flat`）；',
        '- 一族模的直和 $\\bigoplus_{i} M_{i}$ 平坦，当且仅当每个 $M_{i}$ 平坦。'
      ].join('\n'),
      notes: [
        '**证明**：由「与直和交换」（`prop.tensor-functor-properties`），对每个 $A$ 有自然同构',
        '$$A \\otimes_{R} F \\;\\cong\\; (A \\otimes_{R} M) \\oplus (A \\otimes_{R} M_{2}).$$',
        '若 $M$ 与 $M_{2}$ 平坦，右边正合，故左边正合 ✓。',
        '反向：设 $(-) \\otimes F$ 正合，对 $f : A \\to A_{1}$ 看 $f \\otimes F$ 的对角块形式（两个块分别是 $f \\otimes M$ 与 $f \\otimes M_{2}$）。单射性逐分量判定，故 $f \\otimes M$ 单 ✓，$M$ 平坦。',
        '直和情形同理：$(-) \\otimes \\bigoplus_{i} M_{i} \\cong \\bigoplus_{i} ((-) \\otimes M_{i})$ 正合当且仅当每个分量正合 ✓。∎',
        '📌 注意方向：结论只对**直和**成立。直积没有「逐分量判定」这种便利 —— 张量不保积，所以平坦性对直积并不自动封闭（相干环才保证「平坦模的积仍平坦」）。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), direct summands of flat modules',
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2, flatness and direct sums'
      ]
    },

    {
      id: 'prop.flat-domain-torsionfree',
      cluster: 'hom.flat',
      type: 'proposition',
      label: '平坦模无挠',
      title: '整环上平坦蕴含无挠；主理想整环上二者等价',
      regions: ['homology'],
      tags: ['命题', '同调代数', '平坦', '无挠', '整环'],
      statement: [
        '设 $R$ 是**整环**，$M$ 是平坦 $R$-模。则 $M$ **无挠**：对 $r \\ne 0$ 与 $m \\in M$，$r m = 0$ 蕴含 $m = 0$。等价地，乘 $r$ 的映射 $M \\xrightarrow{\\;\\cdot r\\;} M$ 单射。',
        '',
        '反之，若 $R$ 是**主理想整环**，则无挠 $\\iff$ 平坦。一般整环上「无挠」严格弱于「平坦」。'
      ].join('\n'),
      notes: [
        '**证明（正方向）**：取 $0 \\ne r \\in R$。$R$ 是整环，$r$ 不是零因子，故 $0 \\to R \\xrightarrow{\\;\\cdot r\\;} R$ 正合（核为零）。$M$ 平坦，把这个列张量掉，得正合列 $0 \\to M \\xrightarrow{\\;\\cdot r\\;} M$ —— 即乘 $r$ 单射 ✓。',
        '**主理想整环上的反向**：无挠模的有限生成子模是自由模（PID 上有限生成无挠即自由），而 $M$ 是它的有限生成子模的滤过余极限；自由模平坦、平坦模的滤过余极限平坦（$(-)\\otimes$ 保滤过余极限），故 $M$ 平坦 ✓。',
        '⚠️ **一般整环上反向失败**：取 $R = k[x, y]$、$I = (x, y)$。$I$ 是 $R$ 的理想，作为 $R$-模显然无挠；但它不平坦 —— $x, y$ 是正则序列，Koszul 复形的正合性给出 $x \\otimes y - y \\otimes x \\ne 0$（在 $I \\otimes_{R} I$ 里），而它在 $I \\otimes I \\to I$ 下的像是 $xy - yx = 0$，故乘法映射不单。',
        '📌 一句话：**「无挠」是逐理想的除法性质，「平坦」要求对理想整体成立**。整环上后者强于前者，PID 上两者合成一条。'
      ].join('\n\n'),
      refs: [
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2「Modules」, flatness and torsion-free modules',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), flatness over integral domains'
      ]
    },

    {
      id: 'thm.lambek',
      cluster: 'hom.flat',
      type: 'theorem',
      label: '只需有限生成理想',
      title: 'Lambek 判据（平坦性只需对有限生成理想检验）',
      regions: ['homology'],
      tags: ['定理', '同调代数', '平坦', '理想', '判据'],
      statement: [
        '设 $R$ 是含幺环，$M$ 是**左** $R$-模。则 $M$ 平坦，当且仅当：对每个**有限生成右理想** $I \\subseteq R$，乘法映射',
        '',
        '$$I \\otimes_{R} M \\longrightarrow M, \\qquad a \\otimes m \\longmapsto a m$$',
        '',
        '都是单射；也等价于 $\\operatorname{Tor}_{1}^{R}(R/I,\\ M) = 0$ 对每个有限生成右理想 $I$ 成立。',
        '',
        '（交换环上不必区分左右理想。）'
      ].join('\n'),
      notes: [
        '**为什么这是强化**：平坦的定义要对**一切**单射检验；`prop.flat-equivalences` 第 4 条已经把它压到「理想」；Lambek 再压到「**有限生成**理想」—— 后者常常是可数的一批，能逐个算。',
        '**证明（反方向，三步）**：',
        '**第一步（化到有限生成）**：$M$ 是它的有限生成子模的滤过余极限，$(-)\\otimes N$ 保滤过余极限，而单射在滤过余极限下封闭，故只需对有限生成的 $M$ 验证。',
        '**第二步（化到自由模的子模）**：取满射 $R^{n} \\twoheadrightarrow M$，令 $K$ 是 $M_{1}$ 的原像，得短正合列 $0 \\to K \\to R^{n} \\to M \\to 0$。把两个列各自张量后比较，「$K \\otimes M \\to R^{n} \\otimes M$ 单」蕴含「$M_{1} \\otimes M \\to M \\otimes M$ 单」（蛇引理）。于是只需证：对每个**有限生成**子模 $K \\subseteq R^{n}$，$K \\otimes M \\to R^{n} \\otimes M$ 单。',
        '**第三步（对 $n$ 归纳）**：$n = 1$ 时 $K$ 就是有限生成右理想，正是假设。$n > 1$ 时写 $R^{n} = R^{n-1} \\oplus R$，令 $K_{1} := K \\cap R^{n-1}$、$K_{2}$ 为 $K$ 在第二个分量上的像（有限生成右理想），则有短正合列',
        '$$0 \\to K_{1} \\to K \\to K_{2} \\to 0, \\qquad 0 \\to R^{n-1} \\to R^{n} \\to R \\to 0 .$$',
        '张量后得到 $3 \\times 3$ 图：左右两列的竖直映射按归纳假设与 $n = 1$ 情形是单射，于是由蛇引理中间那一列也单射 ✓。∎',
        '⚠️ 「有限生成」不能换成「主理想」：只检验主理想 $(a)$ 上的单射性，得到的是**无挠**，比平坦弱 —— 反例 $(x, y) \\subseteq k[x, y]$ 见 `prop.flat-domain-torsionfree`。',
        '⭐ **实用价值**：判定某个 $R$-模平坦时，只需在有限生成理想上算一次除法。交换 Noether 环上一切理想都有限生成，于是判据直接变成「对一切理想」。'
      ].join('\n\n'),
      refs: [
        'Lambek, Lectures on Rings and Modules (1966), criterion for flatness via finitely generated ideals',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), flatness tested on finitely generated ideals'
      ]
    },

    {
      id: 'ex.flat-not-projective',
      cluster: 'hom.flat',
      type: 'example',
      label: '平坦但不投射',
      title: '例子：$\\mathbb{Q}$ 是平坦但不投射的 $\\mathbb{Z}$-模',
      regions: ['homology'],
      tags: ['例子', '同调代数', '平坦', '投射', '反例'],
      statement: [
        '$\\mathbb{Q}$ 是**平坦**的 $\\mathbb{Z}$-模，但**不是投射**的。于是「平坦」严格弱于「投射」。',
        '',
        '附带两条事实：$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Q}, \\mathbb{Z}) = 0$；$\\mathbb{Q}$ 的任意两个元素都 $\\mathbb{Z}$-线性相关，所以 $\\mathbb{Q}$ 不是自由 $\\mathbb{Z}$-模。'
      ].join('\n'),
      notes: [
        '**平坦**：$\\mathbb{Z}$ 是主理想整环、$\\mathbb{Q}$ 无挠，由 `prop.flat-domain-torsionfree` 的反向得平坦；也可以直接用 Lambek：理想 $(n)$ 上 $n \\cdot : \\mathbb{Q} \\to \\mathbb{Q}$ 是单射（在 $\\mathbb{Q}$ 里除法随便做）✓。',
        '**不投射**：假设 $\\mathbb{Q}$ 投射，取满射 $F = \\bigoplus_{i \\in I} \\mathbb{Z} \\twoheadrightarrow \\mathbb{Q}$，投射性给出截面，于是 $\\mathbb{Q}$ 是 $F$ 的直和项、特别地是 $F$ 的**子群**。但 $F$ 没有非平凡可除子群：$F$ 的元素只有有限多个非零坐标，$n$ 倍映射逐坐标作用，若 $x$ 能被任意 $n$ 整除则每个坐标都被任意 $n$ 整除，而 $\\mathbb{Z}$ 中只有 $0$ 如此，故 $x = 0$。与 $\\mathbb{Q} \\ne 0$ 矛盾 ✓。',
        '**另一条路**：$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Q}, \\mathbb{Z}) = 0$（任何同态把可除性变成「$\\mathbb{Z}$ 里的数能被任意 $n$ 整除」，只能是 $0$）。若 $\\mathbb{Q}$ 投射，$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Q}, -)$ 会把满射 $F \\twoheadrightarrow \\mathbb{Q}$ 送到满射 $\\operatorname{Hom}(\\mathbb{Q}, F) \\to \\operatorname{Hom}(\\mathbb{Q}, \\mathbb{Q})$，左边为 $0$、右边含 $\\mathrm{id}$，矛盾 ✓。',
        '⭐ **意义**：平坦与投射的差正是「消解能短到多短」的差 —— 平坦维数 $0$ 与投射维数 $0$ 是两件事，两者的差由整体维数衡量。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), a flat module that is not projective',
        'Atiyah–Macdonald, Introduction to Commutative Algebra, Chapter 2「Modules」, examples of flatness'
      ]
    },

    /* ==================================================================
       星团 hom.injective：内射模与可除群
       ================================================================== */

    {
      id: 'def.injective-module',
      cluster: 'hom.injective',
      type: 'definition',
      label: '内射模',
      title: '内射模与延拓性质',
      regions: ['homology'],
      tags: ['定义', '同调代数', '模', '内射对象', '延拓'],
      statement: [
        '设 $R$ 是含幺环。左 $R$-模 $I$ 叫**内射的**（injective），如果对每个单射 $A \\rightarrowtail B$ 与每个 $R$-线性映射 $A \\to I$，都存在（一般**不唯一**）$R$-线性映射 $B \\to I$ 使下图交换：',
        '',
        '$$\\begin{array}{ccc} A & \\subseteq & B \\\\[2pt] {\\scriptstyle f}\\downarrow & & \\downarrow{\\scriptstyle \\exists\\, \\widetilde{f}} \\\\[2pt] I & = & I \\end{array}$$',
        '',
        '等价说法（对偶于投射对象）：函子 $\\operatorname{Hom}_{R}(-, I)$ 把单射送到**满射**，即它正合。'
      ].join('\n'),
      notes: [
        '**读法**：内射就是「延拓总能做到」。注意延拓**不唯一**，所以这不是泛性质（不像张量积），只是一个存在性条件 —— 这使内射性难以逐点刻画，得靠判据（`thm.baer-criterion`）。',
        '**与投射对偶**：把所有箭头反过来就是 `def.projective-object` 里的投射对象。在 $R\\text{-}\\mathbf{Mod}$ 里，投射 = 自由模的直和项，内射 = 不能作真子模嵌进更大的模里（见 `prop.injective-splitting`）。',
        '**例子**：域上一切模都内射（向量空间都是自由模，自由即投射，而域上的投射与内射恰好重合）；$\\mathbb{Z}$ **不**内射：含入 $\\mathbb{Z} \\rightarrowtail \\mathbb{Q}$ 没有收缩，因为 $\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Q}, \\mathbb{Z}) = 0$。',
        '📌 判据的归约路线：只需对「$A$ 是 $B$ 的理想」检验（`thm.baer-criterion`）；对 $\\mathbb{Z}$-模再化成「可除」（`thm.pid-injective-divisible`）。'
      ].join('\n\n'),
      refs: [
        'Cartan–Eilenberg, Homological Algebra, Chapter II, injective modules',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), injective modules and the lifting property'
      ]
    },

    {
      id: 'prop.injective-splitting',
      cluster: 'hom.injective',
      type: 'proposition',
      label: '内射的单射可裂',
      title: '$I$ 内射当且仅当每个单射 $I \\rightarrowtail M$ 可裂',
      regions: ['homology'],
      tags: ['命题', '同调代数', '内射', '分裂', '短正合列'],
      statement: [
        '设 $I$ 是左 $R$-模。则下列等价：',
        '',
        '1. $I$ **内射**；',
        '2. 每个单射 $I \\rightarrowtail M$ 都**可裂**，即存在收缩 $r : M \\to I$、$r \\circ i = \\mathrm{id}_{I}$；',
        '3. 每个短正合列 $0 \\to I \\to M \\to M_{2} \\to 0$ 都**分裂**。'
      ].join('\n'),
      notes: [
        '**1 蕴含 2**：取 $A = I$、$f = \\mathrm{id}_{I}$，内射性给出的延拓 $M \\to I$ 就是收缩 ✓。',
        '**2 蕴含 1**：给定 $A \\rightarrowtail B$ 与 $f : A \\to I$。取**推出**',
        '$$P := (I \\oplus B) / \\{\\, (f(a),\\ -a) : a \\in A \\,\\},$$',
        '它让 $A \\to I$ 与 $A \\to B$ 在 $P$ 中合流。$I \\to P$ 仍是单射（推出沿单射仍单：判别 $(x, 0)$ 是否落在像里只看 $I$ 的分量）。由 2，$I \\rightarrowtail P$ 有收缩 $r$，则 $r \\circ (B \\to P)$ 就是 $f$ 的延拓 ✓。',
        '**2 与 3 等价**：由 `def.split-exact` 的判据，短正合列分裂当且仅当单射端有收缩 ✓。∎',
        '📌 与 `prop.injective-criterion`（阿贝尔范畴里内射对象的四条等价）是同一条：那里第 2、4 条就是本条的两种说法；本条的证明可以逐字搬到任何阿贝尔范畴，因为只用了推出与核。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), splitting of monomorphisms into injectives',
        'Cartan–Eilenberg, Homological Algebra, Chapter II, injective objects and split exact sequences'
      ]
    },

    {
      id: 'thm.baer-criterion',
      cluster: 'hom.injective',
      type: 'theorem',
      label: '内射的理想判据',
      title: 'Baer 判据（只需对理想检验提升）',
      regions: ['homology'],
      tags: ['定理', '同调代数', '内射', 'Baer', '理想'],
      statement: [
        '设 $R$ 是含幺环，$I$ 是左 $R$-模。则 $I$ **内射**当且仅当：对每个**左理想** $J \\subseteq R$ 与每个 $R$-线性映射 $f : J \\to I$，都存在 $x \\in I$ 使',
        '',
        '$$f(a) = a x \\qquad (\\forall a \\in J),$$',
        '',
        '即 $f$ 总能延拓成 $R \\to I$、$1 \\mapsto x$。',
        '',
        '也就是说：检验内射性时，「$A \\rightarrowtail B$」可以只取「理想含入 $J \\rightarrowtail R$」。'
      ].join('\n'),
      notes: [
        '**必要性**：$J \\rightarrowtail R$ 本身就是单射，内射性直接给出延拓 $R \\to I$ ✓。',
        '**充分性**：给定单射 $A \\subseteq B$ 与 $f : A \\to I$。考虑所有延拓对 $(A_{1}, f_{1})$（$A \\subseteq A_{1} \\subseteq B$、$f_{1}$ 在 $A$ 上与 $f$ 一致），按「定义域更大」排序。一条链的并仍是延拓，故由 **Zorn 引理** 存在极大元 $(A_{1}, f_{1})$。',
        '若 $A_{1} \\ne B$，取 $b \\in B \\setminus A_{1}$，令',
        '$$J := \\{\\, r \\in R : r b \\in A_{1} \\,\\}, \\qquad h : J \\to I, \\quad h(r) := f_{1}(r b).$$',
        '$J$ 是左理想、$h$ 是 $R$-线性的。由假设，存在 $x \\in I$ 使 $h(r) = r x$（$\\forall r \\in J$）。定义 $f_{2}(a + r b) := f_{1}(a) + r x$。',
        '**良定义**：若 $a + r b = a_{1} + r_{1} b$，则 $(r - r_{1}) b = a_{1} - a \\in A_{1}$，故 $r - r_{1} \\in J$，于是 $f_{1}((r - r_{1})b) = f_{1}(a_{1} - a)$，即 $f_{1}(a) + r x = f_{1}(a_{1}) + r_{1} x$ ✓。这与极大性矛盾，故 $A_{1} = B$ ✓。∎',
        '⭐ **意义**：把「对一切单射检验」压成「对 $R$ 的理想检验」，而理想是 $R$ 的子集、通常少得多。这一步是把范畴条件翻译成环上条件的关键，后面 `thm.pid-injective-divisible` 全靠它。',
        '⚠️ 判据里的「理想」不能换成「有限生成理想」：平坦有 Lambek 定理可以只查有限生成理想，内射**没有**这样的对偶弱化（除非环是 Noether 的）。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), Baer criterion for injectivity',
        'Cartan–Eilenberg, Homological Algebra, Chapter II, Baer criterion'
      ]
    },

    {
      id: 'def.divisible-group',
      cluster: 'hom.injective',
      type: 'definition',
      label: '可除群',
      title: '可除群（可除 $\\mathbb{Z}$-模）',
      regions: ['homology'],
      tags: ['定义', '同调代数', '可除群', '阿贝尔群', '内射'],
      statement: [
        '阿贝尔群 $D$ 叫**可除的**（divisible），如果对每个 $d \\in D$ 与每个 $0 \\ne n \\in \\mathbb{Z}$，方程',
        '',
        '$$n x = d$$',
        '',
        '在 $D$ 中有解；等价地：乘法映射 $n \\cdot : D \\to D$ 对每个 $n \\ne 0$ 都**满射**。',
        '',
        '$\\mathbb{Z}$-模就是阿贝尔群（`prop.zmod-is-ab`），所以「可除群」正是「可除 $\\mathbb{Z}$-模」，它也可以对任意环上的模照搬定义（把 $\\mathbb{Z}$ 换成 $R$、$n$ 换成非零因子）。'
      ].join('\n'),
      notes: [
        '**读法**：可除就是「随便除以正整数都除得尽」。$\\mathbb{Q}$ 有这条性质；$\\mathbb{Z}$ 没有（$2x = 1$ 无解）；$\\mathbb{Z}/2$ 也不行 —— $2x = 0$ 恒有解，但 $2x = 1$ 无解。要点是「$n$ 倍映射**满射**」（取遍整个群），不只是「方程有解到 $0$」。',
        '**结构定理**：每个可除群同构于 $\\mathbb{Q}^{(I)} \\oplus \\bigoplus_{p}\\bigl(\\mathbb{Z}[1/p]/\\mathbb{Z}\\bigr)^{(J_{p})}$，即可除群完全由这些「秩」决定。',
        '⭐ 在 $\\mathbb{Z}$ 上：「可除」与「内射」是同一件事（`thm.pid-injective-divisible`）。直观上「除以 $n$」正是「沿 $n\\mathbb{Z} \\rightarrowtail \\mathbb{Z}$ 延拓」。',
        '📌 商：可除群的商可除（`prop.divisible-quotient`）；**子群**不一定（$\\mathbb{Z} \\subseteq \\mathbb{Q}$）。'
      ].join('\n\n'),
      refs: [
        'Fuchs, Infinite Abelian Groups, Vol. I, divisible groups',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), divisible groups and injective Z-modules'
      ]
    },

    {
      id: 'thm.pid-injective-divisible',
      cluster: 'hom.injective',
      type: 'theorem',
      label: '内射等价于可除',
      title: '主理想整环上，内射当且仅当可除',
      regions: ['homology'],
      tags: ['定理', '同调代数', '内射', '可除群', '主理想整环'],
      statement: [
        '设 $R$ 是**主理想整环**（例如 $\\mathbb{Z}$ 或 $k[x]$），$M$ 是 $R$-模。则 $M$ 内射，当且仅当 $M$ **可除**，即',
        '',
        '$$\\forall a \\ne 0,\\ \\forall y \\in M,\\ \\exists x \\in M, \\qquad a x = y .$$',
        '',
        '特别地：$\\mathbb{Z}$-模内射当且仅当它是可除群。'
      ].join('\n'),
      notes: [
        '**可除 $\\implies$ 内射**（用 Baer 判据）：设 $J \\subseteq R$ 是理想，$f : J \\to I$。主理想整环里 $J = (a)$。若 $a = 0$ 则 $J = 0$，取 $x = 0$；若 $a \\ne 0$，记 $y := f(a)$，由可除性取 $x \\in I$ 使 $a x = y$。于是对 $r a \\in J$ 有 $f(r a) = r f(a) = r a x = (r a) x$ ✓，即 $f$ 由「乘 $x$」给出。',
        '**内射 $\\implies$ 可除**：设 $a \\ne 0$、$y \\in I$。把 Baer 判据用在理想 $(a)$ 与映射 $a \\mapsto y$ 上，得 $x$ 使 $a x = y$ ✓。',
        '$\\mathbb{Z}$ 的情形就是 $R = \\mathbb{Z}$（主理想整环），此时 $R$-模即阿贝尔群（`prop.zmod-is-ab`）✓。',
        '⭐ 一句话记住：**「除以 $a$」就是「沿 $(a) \\rightarrowtail R$ 延拓」**。主理想整环上理想结构最简单，Baer 判据就退化成一道除法题。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), injective modules over a principal ideal domain',
        'Fuchs, Infinite Abelian Groups, Vol. I, divisible groups are the injective Z-modules'
      ]
    },

    {
      id: 'prop.divisible-quotient',
      cluster: 'hom.injective',
      type: 'proposition',
      label: '可除群的商',
      title: '可除群的商仍可除',
      regions: ['homology'],
      tags: ['命题', '同调代数', '可除群', '商群', '内射'],
      statement: [
        '若 $D$ 是可除群、$H \\subseteq D$ 是子群，则 $D/H$ 可除。',
        '',
        '（同一条论证对任意环上的可除模成立；在 $\\mathbb{Z}$ 上「可除」即「内射」，所以这同时说明 $\\mathbb{Z}$-模里内射对象的商仍内射。）'
      ].join('\n'),
      notes: [
        '**证明**：记 $\\pi : D \\to D/H$。给定 $\\bar{x} \\in D/H$ 与 $n \\ne 0$，取代表 $x$；由 $D$ 可除取 $y$ 使 $n y = x$；则 $n \\bar{y} = \\overline{n y} = \\bar{x}$ ✓。所以 $n \\cdot$ 在 $D/H$ 上满，$D/H$ 可除 ✓。∎',
        '⚠️ 只对**商**成立：可除群的子群不必可除（$\\mathbb{Z} \\subseteq \\mathbb{Q}$：$\\mathbb{Q}$ 可除，$\\mathbb{Z}$ 不可除）。',
        '⭐ 两条对照：在 $\\mathbb{Z}$-模里，内射对象的**商**仍内射（本条），而它的**子模**不必（$\\mathbb{Z} \\subseteq \\mathbb{Q}$）。投射模则两头都不省心：它的商（$\\mathbb{Z}/2$ 之于 $\\mathbb{Z}$）与子模（理想 $(x, y) \\subseteq k[x, y]$）都可以不投射。',
        '📌 一般环上要小心：可除性对商总是封闭的（逐元素论证），但「内射」对商封闭只在 $\\mathbb{Z}$ 这类主理想整环上由「可除即内射」推得，不能当成普遍事实。'
      ].join('\n\n'),
      refs: [
        'Fuchs, Infinite Abelian Groups, Vol. I, quotients of divisible groups',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), divisible groups and quotients'
      ]
    },

    {
      id: 'ex.divisible-groups',
      cluster: 'hom.injective',
      type: 'example',
      label: '可除群的例子',
      title: '例子：$\\mathbb{Q}$、$\\mathbb{Q}/\\mathbb{Z}$ 与 Prüfer 群',
      regions: ['homology'],
      tags: ['例子', '同调代数', '可除群', 'Prüfer 群', '内射'],
      statement: [
        '三个可除群的典型例子：',
        '',
        '1. $\\mathbb{Q}$：给定 $q = a/b$ 与 $n \\ne 0$，取 $x = a/(b n)$；',
        '2. $\\mathbb{Q}/\\mathbb{Z}$：$\\mathbb{Q}$ 可除，商可除（`prop.divisible-quotient`）；',
        '3. **Prüfer $p$-群** $\\mathbb{Z}[1/p]/\\mathbb{Z}$（$p^{k}$ 次单位根全体），它同构于余极限 $\\varinjlim_{k} \\mathbb{Z}/p^{k}$。',
        '',
        '三者作为 $\\mathbb{Z}$-模都是**内射**的（`thm.pid-injective-divisible`）。'
      ].join('\n'),
      notes: [
        '**Prüfer 群的余极限**：沿「乘 $p$」的映射 $\\mathbb{Z}/p^{k} \\to \\mathbb{Z}/p^{k+1}$ 取余极限。所以对每个元素都能无限次除以 $p$ —— 这正是可除性。',
        '**为什么 $\\mathbb{Q}/\\mathbb{Z}$ 重要**：它是同调代数的标准对偶对象。$\\operatorname{Hom}_{\\mathbb{Z}}(-, \\mathbb{Q}/\\mathbb{Z})$ 是**特征标群**（Pontryagin 对偶的代数版），有限群上它就是 $(-)^{\\vee}$；它同时是 `thm.mod-enough-injectives` 里把任意模嵌进内射模的那块砖。',
        '📌 结构上：$\\mathbb{Q}/\\mathbb{Z} \\cong \\bigoplus_{p}\\bigl(\\mathbb{Z}[1/p]/\\mathbb{Z}\\bigr)$。一个元素只被**有限多个**素数整除，所以是直和而不是直积；$\\mathbb{Q}/\\mathbb{Z}$ 是挠群 —— 可见「可除」与「挠」并不冲突（冲突的是「可除」与「无挠且非零自由」）。',
        '⚠️ $\\mathbb{Q}$ 与 $\\mathbb{Q}/\\mathbb{Z}$ 虽然都内射，但一个无挠、一个全是挠，所以「内射」并不控制挠性。'
      ].join('\n\n'),
      refs: [
        'Fuchs, Infinite Abelian Groups, Vol. I, divisible groups and the Prüfer p-group',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), injective Z-modules and the group Q/Z'
      ]
    },

    {
      id: 'thm.mod-enough-injectives',
      cluster: 'hom.injective',
      type: 'theorem',
      label: '足够多内射对象',
      title: '$R\\text{-}\\mathbf{Mod}$ 有足够多的内射对象',
      regions: ['homology'],
      tags: ['定理', '同调代数', '内射', '足够多内射', '内射消解'],
      statement: [
        '$R\\text{-}\\mathbf{Mod}$ **有足够多的内射对象**：每个左 $R$-模都能嵌入某个内射左 $R$-模。构造分三步：',
        '',
        '1. $\\mathbb{Q}/\\mathbb{Z}$ 是内射 $\\mathbb{Z}$-模（可除，`thm.pid-injective-divisible`），且是**余生成元**：求值映射',
        '$$A \\longrightarrow \\operatorname{Hom}_{\\mathbb{Z}}\\bigl(\\operatorname{Hom}_{\\mathbb{Z}}(A, \\mathbb{Q}/\\mathbb{Z}),\\ \\mathbb{Q}/\\mathbb{Z}\\bigr)$$',
        '对每个阿贝尔群 $A$ 都是单射。',
        '2. 对左 $R$-模 $M$，先有单射 $M \\hookrightarrow \\operatorname{Hom}_{\\mathbb{Z}}(R, M)$、$m \\mapsto (r \\mapsto r m)$；取内射 $\\mathbb{Z}$-模 $E$ 与单射 $M \\hookrightarrow E$（第 1 步给出 $E = M^{\\vee\\vee}$），得 $R$-模单射 $M \\hookrightarrow \\operatorname{Hom}_{\\mathbb{Z}}(R, E)$。',
        '3. $\\operatorname{Hom}_{\\mathbb{Z}}(R, E)$ 是**内射** $R$-模。',
        '',
        '于是每个模都有**内射消解** $0 \\to M \\to I^{0} \\to I^{1} \\to \\cdots$。'
      ].join('\n'),
      notes: [
        '**第 1 步的细节**：给定 $0 \\ne a \\in A$，子群 $\\langle a \\rangle$ 是循环群（$\\cong \\mathbb{Z}/m$，$m \\ge 1$；或 $\\cong \\mathbb{Z}$），上面存在非零特征标 $\\langle a \\rangle \\to \\mathbb{Q}/\\mathbb{Z}$，再用 $\\mathbb{Q}/\\mathbb{Z}$ 的内射性把它延拓到 $A$ 上，故求值映射在 $a$ 处不为零 ✓。',
        '**第 3 步的细节**：$\\operatorname{Hom}_{\\mathbb{Z}}(R, -) : \\mathbf{Ab} \\to R\\text{-}\\mathbf{Mod}$ 是遗忘函子 $U$ 的**右伴随**',
        '$$\\operatorname{Hom}_{R}\\bigl(N, \\operatorname{Hom}_{\\mathbb{Z}}(R, E)\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}(UN,\\ E), \\qquad f \\longmapsto \\bigl(n \\mapsto (r \\mapsto f(r n))\\bigr).$$',
        '而「左伴随正合 + 右伴随」给出「右伴随把内射对象送到内射对象」（把 $\\operatorname{Hom}(-, G I)$ 换成 $\\operatorname{Hom}(F -, I)$ 即知）；$U$ 显然正合 ✓。',
        '⭐ **意义**：右导出函子（$R\\operatorname{Hom}$、上同调、导出范畴）全都用内射消解定义；没有内射消解，整套机器无从谈起。这条定理保证 $R\\text{-}\\mathbf{Mod}$ 上永远不缺。',
        '📌 另一条路：$R\\text{-}\\mathbf{Mod}$ 是 Grothendieck 范畴，由 `prop.grothendieck-enough-injectives` 直接得结论 —— 但那条证明要超限迭代，本条只用手边的 $\\mathbb{Q}/\\mathbb{Z}$ 与一个伴随，短得多。'
      ].join('\n\n'),
      refs: [
        'Cartan–Eilenberg, Homological Algebra, Chapter II, enough injectives via the character module',
        'Rotman, An Introduction to Homological Algebra (2nd ed.), R-Mod has enough injectives'
      ]
    },

    {
      id: 'thm.mod-enough-projectives',
      cluster: 'hom.injective',
      type: 'theorem',
      label: '足够多投射对象',
      title: '$R\\text{-}\\mathbf{Mod}$ 有足够多的投射对象',
      regions: ['homology'],
      tags: ['定理', '同调代数', '投射', '足够多投射', '投射消解'],
      statement: [
        '$R\\text{-}\\mathbf{Mod}$ **有足够多的投射对象**：每个左 $R$-模都是某个自由模的商。取一组生成元 $(m_{i})_{i \\in I}$（例如 $I = M$、$m_{i} = i$），则',
        '',
        '$$R^{(I)} \\twoheadrightarrow M, \\qquad (r_{i})_{i} \\longmapsto \\sum_{i} r_{i} m_{i}$$',
        '',
        '是满的 $R$-模同态，而自由模是投射的。于是每个模都有**投射消解**',
        '',
        '$$\\cdots \\longrightarrow P_{2} \\longrightarrow P_{1} \\longrightarrow P_{0} \\longrightarrow M \\longrightarrow 0 .$$'
      ].join('\n'),
      notes: [
        '**证明**：自由模的万有性质保证「基的像任意给定即有唯一模同态」，故上面的映射良定义；$e_{i} \\mapsto m_{i}$ 说明它满 ✓。',
        '**自由模投射**：$R^{(I)} = \\bigoplus_{i} R$，而 $R$ 自己的提升就是把 $R \\to B$ 由 $1$ 的像决定、任取原像 ✓；直和保持投射性 ✓。于是按 `def.enough-projectives` 的定义即得结论，再递归造出投射消解 ✓。∎',
        '⭐ **两边不对称**：投射这一侧由自由模**显式**给出（能写下来、能算），内射那一侧只能靠 $\\mathbb{Q}/\\mathbb{Z}$ 的**存在性**论证。这就是为什么 $\\operatorname{Tor}$ 常常能直接算，而 $\\operatorname{Ext}$ 往往要先换成投射消解或别的工具。',
        '⚠️ 「投射模 = 自由模的直和项」不等于「投射即自由」：$\\mathbb{Z}[\\sqrt{-5}]$ 的理想 $(2, 1 + \\sqrt{-5})$ 是投射而非自由的（理想类群非平凡）。'
      ].join('\n\n'),
      refs: [
        'Rotman, An Introduction to Homological Algebra (2nd ed.), R-Mod has enough projectives',
        'Cartan–Eilenberg, Homological Algebra, Chapter II, free presentations and enough projectives'
      ]
    }
  ],

  edges: [

    /* ------------------------------------------------------- 定义依赖边 */
    {
      id: 'def-link.tensormod-module',
      kind: 'definition',
      definition: 'def.module',
      usedBy: 'def.tensor-module',
      note: '张量积的原料正是模：$M$ 取右模、$N$ 取左模，商掉的第三条关系就是两条模作用的对接。'
    },
    {
      id: 'def-link.tensormod-bilinear',
      kind: 'definition',
      definition: 'def.bilinear-form',
      usedBy: 'def.tensor-module',
      note: '「双线性」在模上变成「平衡双加性」：多出来的那条 $B(m r, n) = B(m, r n)$ 是标量从一边搬到另一边；域上它自动满足，所以向量空间张量积用不到它。'
    },
    {
      id: 'def-link.flat-exactfunctor',
      kind: 'definition',
      definition: 'def.exact-functor',
      usedBy: 'def.flat-module',
      note: '平坦就是把「正合函子」这个要求加在 $(-) \\otimes_{R} N$ 上。因为是右正合函子，「正合」等价于「左正合」，于是定义可以只写成「保单射」。'
    },
    {
      id: 'def-link.tensorrightexact-exactseq',
      kind: 'definition',
      definition: 'def.exact-sequence',
      usedBy: 'prop.tensor-right-exact',
      note: '「右正合」的判据完全用正合列的语言说：短正合列张量之后仍正合，只是左端的 $0$ 丢了。'
    },
    {
      id: 'def-link.injmodule-projectiveobj',
      kind: 'definition',
      definition: 'def.projective-object',
      usedBy: 'def.injective-module',
      note: '内射对象就是投射对象在 $\\mathcal{C}^{\\mathrm{op}}$ 里的样子：把提升图的箭头全部反过来，就是延拓图。'
    },
    {
      id: 'def-link.injectivesplitting-splitexact',
      kind: 'definition',
      definition: 'def.split-exact',
      usedBy: 'prop.injective-splitting',
      note: '「内射的单射都分裂」正是分裂短正合列的语言：$0 \\to I \\to M \\to M_{2} \\to 0$ 分裂当且仅当 $I \\rightarrowtail M$ 有收缩。'
    },
    {
      id: 'def-link.baer-ideal',
      kind: 'definition',
      definition: 'def.ideal',
      usedBy: 'thm.baer-criterion',
      note: 'Baer 判据的全部内容就是「把任意单射 $A \\rightarrowtail B$ 换成理想含入 $J \\rightarrowtail R$」—— 检验对象从子模降成理想。'
    },
    {
      id: 'def-link.scalarres-ring',
      kind: 'definition',
      definition: 'def.ring',
      usedBy: 'def.scalar-restriction',
      note: '标量限制的入口是一个含幺环同态 $f : R \\to S$；$f$ 不是同构时两边的模范畴才真的不同，$f$ 是恒等时它什么也不做。'
    },
    {
      id: 'def-link.scalarext-tensor',
      kind: 'definition',
      definition: 'def.tensor-module',
      usedBy: 'def.scalar-extension',
      note: '标量扩张就是以 $S$ 为左变元的张量积：$S$ 通过 $f$ 成为 $(S, R)$-双模，于是 $S \\otimes_{R} M$ 天然带左 $S$-作用。'
    },
    {
      id: 'def-link.flatsummand-directsum',
      kind: 'definition',
      definition: 'def.direct-sum',
      usedBy: 'prop.flat-summand',
      note: '「直和项」用的是双积：$F \\cong M \\oplus M_{2}$。正合性逐分量判定，这就是整条命题的技术内容。'
    },
    {
      id: 'def-link.divisible-pid',
      kind: 'definition',
      definition: 'def.divisible-group',
      usedBy: 'thm.pid-injective-divisible',
      note: '命题的两边分属两个世界：左边是范畴概念（内射），右边是群论概念（可除）。主理想整环上二者重合，这是同调代数与阿贝尔群论之间最短的一座桥。'
    },
    {
      id: 'def-link.modenough-injmodule',
      kind: 'definition',
      definition: 'def.module',
      usedBy: 'thm.mod-enough-injectives',
      note: '定理说的是 $R\\text{-}\\mathbf{Mod}$ 这个范畴的全局性质（每个对象都嵌得进内射对象），而「模」正是这个范畴的对象。'
    },

    /* --------------------------------------------------------- 推导边 */
    {
      id: 'imp.tensor-functor-properties',
      kind: 'implication',
      sources: ['def.tensor-module'],
      target: 'prop.tensor-functor-properties',
      title: '万有性质 $\\implies$ 双函子性、结合、对称与保直和',
      proof: [
        '五个性质全都由**同一个办法**得到：要造 $M \\otimes N \\to P$，只需给出一个平衡双加性映射 $M \\times N \\to P$；要证两个张量积之间的映射互逆，在一组生成元（纯张量）上验证即可。',
        '',
        '**双函子**：给定 $f : M \\to M_{1}$、$g : N \\to N_{1}$，$(m, n) \\mapsto f(m) \\otimes g(n)$ 平衡双加性，唯一给出 $f \\otimes g$；加法性由 $\\otimes$ 的双加性直接得到 ✓。',
        '',
        '**与直和交换**：投影 $\\bigoplus_{i} M_{i} \\to M_{i_{0}}$ 给出 $\\varphi : (\\bigoplus_{i} M_{i}) \\otimes N \\to \\bigoplus_{i}(M_{i} \\otimes N)$；含入 $M_{i} \\otimes N \\to (\\bigoplus_{i} M_{i}) \\otimes N$ 给出反向的 $\\psi$。两者在纯张量上互逆，故互为逆同构 ✓。',
        '',
        '**单位**：$r \\otimes n \\mapsto r n$ 有反向 $n \\mapsto 1 \\otimes n$，且 $r \\otimes n = (1 \\cdot r) \\otimes n = 1 \\otimes r n$ 由平衡关系成立，故 $R \\otimes_{R} N \\cong N$ ✓。',
        '',
        '**结合**：$(m \\otimes n) \\otimes p \\mapsto m \\otimes (n \\otimes p)$ 与反向都由三重平衡映射给出，互逆 ✓。',
        '',
        '**对称**（$R$ 交换）：$\\tau(m \\otimes n) = n \\otimes m$ 良定义（交换性保证 $\\tau(m r \\otimes n) = \\tau(m \\otimes r n)$），且 $\\tau^{2} = \\mathrm{id}$ ✓。∎'
      ].join('\n'),
      note: '由「与直和交换」+「单位」两条合成，得到后面反复要用的那句：$(-) \\otimes_{R} N$ 保余极限。'
    },
    {
      id: 'imp.hom-tensor-adjunction-mod',
      kind: 'implication',
      sources: ['prop.module-tensor-universal', 'def.tensor-module'],
      target: 'thm.hom-tensor-adjunction-mod',
      title: '平衡双加性的万有性质 $\\implies$ 张量–内 Hom 伴随',
      proof: [
        '**万有性质给出一半**：$\\operatorname{Hom}_{R}(M \\otimes_{R} N, P)$ 与「平衡双加性映射 $M \\times N \\to P$」的全体一一对应。',
        '',
        '**curry 化给出另一半**：平衡双加性映射 $B : M \\times N \\to P$ 与「线性映射 $M \\to \\operatorname{Hom}_{R}(N, P)$」一一对应 —— 给定 $B$，$m \\mapsto B(m, -)$ 线性；给定 $g$，$(m, n) \\mapsto g(m)(n)$ 平衡双加性。两个方向明显互逆 ✓。',
        '',
        '复合两个双射即得同构。**自然性**：同构由显式公式 $f \\mapsto \\bigl(m \\mapsto (n \\mapsto f(m \\otimes n))\\bigr)$ 给出，公式里没有任何选取，故对 $M$ 与 $P$ 都自然 ✓。∎',
        '',
        '**另一条等价的证法**：取 $M$ 的自由表现 $R^{(J)} \\to R^{(I)} \\to M \\to 0$，先用 $M = R$ 的情形（即「单位」$R \\otimes N \\cong N$）验证，再用五引理把同构推到 $M$ 上。'
      ].join('\n'),
      note: '两个来源缺一不可：`prop.module-tensor-universal` 给「双线性 = 线性」这半句（在 $\\mathbb{Z}$ 与域上写的），`def.tensor-module` 给一般 $R$ 上平衡关系的形式。'
    },
    {
      id: 'imp.tensor-right-exact',
      kind: 'implication',
      sources: ['thm.hom-tensor-adjunction-mod'],
      target: 'prop.tensor-right-exact',
      title: '左伴随保余极限 $\\implies$ 张量右正合',
      proof: [
        '由伴随 $(-) \\otimes_{R} N \\dashv \\operatorname{Hom}_{R}(N, -)$，左伴随保**所有**余极限。',
        '',
        '而余核是两项图的余极限：$\\operatorname{coker}(f) = \\mathrm{colim}\\bigl(M_{1} \\xrightarrow{f} M\\bigr)$。故 $(-) \\otimes N$ 保余核 ✓。',
        '',
        '对一个加法函子，「保余核」与「把短正合列送成 $M_{1} \\otimes N \\to M \\otimes N \\to M_{2} \\otimes N \\to 0$ 正合」是同一句话：$g$ 满 $\\iff$ $\\operatorname{coker} g = 0$ $\\iff$ $\\operatorname{coker}(g \\otimes 1) = 0$ $\\iff$ $g \\otimes 1$ 满；$\\operatorname{im}(f \\otimes 1) = \\ker(g \\otimes 1)$ 由保余核直接给出 ✓。',
        '',
        '**左端为什么没有**：$f \\otimes 1$ 的单射性不能由伴随得到（左伴随保的是余极限，不是极限）。$\\mathbb{Z} \\xrightarrow{2} \\mathbb{Z}$ 张量 $\\mathbb{Z}/2$ 就是反例：映射变成零 ✓。∎'
      ].join('\n'),
      note: '这条把「右正合」与「平坦」切成两半：右正合是伴随白送的，左正合才是要研究的性质。'
    },
    {
      id: 'imp.flat-equivalences',
      kind: 'implication',
      sources: ['prop.tensor-right-exact', 'def.flat-module'],
      target: 'prop.flat-equivalences',
      title: '右正合 + 平坦的定义 $\\implies$ 五条等价刻画',
      proof: [
        '**1 与 2**：右正合已由前一条给出，所以「正合」只差左端那一个单射 ✓。',
        '',
        '**2 蕴含 3**：取 $M$ 的投射消解 $P_{\\bullet} \\to M$。$\\operatorname{Tor}_{1}^{R}(M, N) = H_{1}(P_{\\bullet} \\otimes N)$。若 $N$ 平坦，$P_{\\bullet} \\otimes N$ 仍是正合列（每一项都自由、逐项张量后短正合列仍正合），故 $H_{1} = 0$ ✓。',
        '',
        '**3 蕴含 4**：由 $0 \\to I \\to R \\to R/I \\to 0$ 与 $\\operatorname{Tor}_{1}^{R}(R, N) = 0$（$R$ 自由）得长正合列',
        '$$0 \\longrightarrow \\operatorname{Tor}_{1}^{R}(R/I, N) \\longrightarrow I \\otimes N \\longrightarrow N \\longrightarrow \\cdots$$',
        '故 $\\operatorname{Tor}_{1}^{R}(R/I, N) = 0$ 推出 $I \\otimes N \\to N$ 单 ✓。',
        '',
        '**4 蕴含 2**：先化到 $M$ 有限生成（$(-) \\otimes N$ 保滤过余极限，而单射在滤过余极限下封闭），再对生成元个数归纳，每一步把「子模含入」拆成「理想含入 + 短正合列」，用蛇引理拼回去 —— 完整论证见 `thm.lambek` ✓。',
        '',
        '**5** 只是把 1、2 换成有限表现模的说法（$R^{n} \\to M$ 有限生成自由），等价性是显然的 ✓。∎'
      ].join('\n'),
      note: '第 4 条是唯一能真正动手算的判据：理想比子模少，乘法映射 $I \\otimes N \\to N$ 又常能显式写出。'
    },
    {
      id: 'imp.free-flat',
      kind: 'implication',
      sources: ['prop.tensor-functor-properties', 'def.flat-module'],
      target: 'prop.free-flat',
      title: '与直和交换 + 单位 $\\implies$ 自由模平坦',
      proof: [
        '由「单位」$R \\otimes_{R} N \\cong N$ 与「与直和交换」，对每个 $A$ 有自然同构',
        '$$A \\otimes_{R} R^{(I)} \\;\\cong\\; A \\otimes_{R} \\bigoplus_{i \\in I} R \\;\\cong\\; \\bigoplus_{i \\in I} (A \\otimes_{R} R) \\;\\cong\\; A^{(I)} .$$',
        '所以 $(-) \\otimes_{R} R^{(I)} \\cong \\bigoplus_{i \\in I} (-)$ 就是「取 $I$ 重直和」这个函子。',
        '',
        '一族函子的直和正合：$f : A \\to A_{1}$ 单射 $\\iff$ 每个分量 $f$ 单射，而 $(f)^{(I)}$ 就是 $f$ 的 $I$ 重直和、单射性逐分量判定 ✓。故自由模平坦。',
        '',
        '**投射模平坦**：投射模是某自由模的直和项，由 `prop.flat-summand` 继承平坦性 ✓。∎'
      ].join('\n'),
      note: '这条让「投射消解也是平坦消解」成立，于是 $\\operatorname{Tor}$ 可以用更短的平坦消解来算。'
    },
    {
      id: 'imp.flat-summand',
      kind: 'implication',
      sources: ['prop.free-flat', 'def.split-exact'],
      target: 'prop.flat-summand',
      title: '直和的正合性 $\\implies$ 直和项继承平坦',
      proof: [
        '设 $F = M \\oplus M_{2}$ 平坦。由「与直和交换」，对每个 $A$ 有自然同构',
        '$$A \\otimes_{R} F \\;\\cong\\; (A \\otimes_{R} M) \\oplus (A \\otimes_{R} M_{2}).$$',
        '',
        '**（$\\Leftarrow$）** 若 $M$ 与 $M_{2}$ 平坦，右边正合，故 $(-) \\otimes F$ 正合 ✓。',
        '',
        '**（$\\implies$）** 设 $(-) \\otimes F$ 正合。对任意 $f : A \\to A_{1}$，$f \\otimes F$ 在分解下是对角块 $\\mathrm{diag}(f \\otimes M,\\ f \\otimes M_{2})$。若 $x = (x_{1}, x_{2})$ 被送到零，则两块分别把 $x_{1}$、$x_{2}$ 送到零；单射性逐分量判定，故 $f \\otimes M$ 单 ✓，$M$ 平坦。',
        '',
        '**直和情形**：$(-) \\otimes \\bigoplus_{i} M_{i} \\cong \\bigoplus_{i} ((-) \\otimes M_{i})$ 正合当且仅当每个分量正合 ✓。∎',
        '',
        '**投射模平坦**由这条加上 `prop.free-flat` 立刻得到：投射模是自由模的直和项。'
      ].join('\n'),
      note: '⚠️ 只对直和成立。直积没有「逐分量判定」这种便利（张量不保积），所以平坦性对直积并不自动封闭。'
    },
    {
      id: 'imp.flat-torsionfree',
      kind: 'implication',
      sources: ['prop.flat-equivalences', 'def.flat-module'],
      target: 'prop.flat-domain-torsionfree',
      title: '张量保正合 $\\implies$ 整环上平坦即无挠',
      proof: [
        '取 $0 \\ne r \\in R$。$R$ 是整环，$r$ 不是零因子，故 $R \\xrightarrow{\\;\\cdot r\\;} R$ 的核为零，即',
        '$$0 \\longrightarrow R \\xrightarrow{\\;\\cdot r\\;} R$$',
        '正合。$M$ 平坦，把这一列张量掉，得',
        '$$0 \\longrightarrow M \\xrightarrow{\\;\\cdot r\\;} M$$',
        '正合 —— 即乘 $r$ 在 $M$ 上单射，这正是无挠 ✓。',
        '',
        '**主理想整环上的反向**：无挠模的每个有限生成子模是自由模（PID 上有限生成无挠即自由）；$M$ 是这些子模的滤过余极限；自由模平坦，而平坦模的滤过余极限平坦（$(-)\\otimes$ 保滤过余极限，单射性在滤过余极限下封闭），故 $M$ 平坦 ✓。∎'
      ].join('\n'),
      note: '反例（一般整环上）：$R = k[x, y]$ 的理想 $I = (x, y)$ 无挠但不平坦 —— $x \\otimes y - y \\otimes x \\ne 0$ 而它的像是 $xy - yx = 0$。'
    },
    {
      id: 'imp.lambek',
      kind: 'implication',
      sources: ['prop.flat-equivalences'],
      target: 'thm.lambek',
      title: '理想判据 $\\implies$ 只需有限生成理想（Lambek）',
      proof: [
        '**必要性**显然：有限生成右理想也是右理想 ✓。',
        '',
        '**充分性**：要证对一切单射 $M_{1} \\rightarrowtail M$，$M_{1} \\otimes M \\to M \\otimes M$ 单。',
        '',
        '**第一步（化到有限生成）**：$M$ 是它有限生成子模的滤过余极限，$(-) \\otimes M$ 保滤过余极限，故只需对有限生成的 $M$ 验证 ✓。',
        '',
        '**第二步（化到自由模的子模）**：取满射 $R^{n} \\twoheadrightarrow M$，令 $K$ 为 $M_{1}$ 的原像。两个短正合列 $0 \\to K \\to R^{n} \\to M \\to 0$ 与 $0 \\to M_{1} \\to M \\to 0$ 的张量版本摆成 $3 \\times 3$ 图，用蛇引理：若 $K \\otimes M \\to R^{n} \\otimes M$ 单，则 $M_{1} \\otimes M \\to M \\otimes M$ 单 ✓。',
        '',
        '**第三步（对 $n$ 归纳）**：只需证对每个有限生成子模 $K \\subseteq R^{n}$，$K \\otimes M \\to R^{n} \\otimes M$ 单。',
        '- $n = 1$：$K$ 是有限生成右理想，正是假设 ✓。',
        '- $n > 1$：写 $R^{n} = R^{n-1} \\oplus R$，令 $K_{1} = K \\cap R^{n-1}$、$K_{2}$ 为 $K$ 在第二个分量上的像（有限生成右理想），则 $0 \\to K_{1} \\to K \\to K_{2} \\to 0$ 与 $0 \\to R^{n-1} \\to R^{n} \\to R \\to 0$ 正合。张量后两列竖直映射（$K_{1} \\to$ 与 $K_{2} \\to$）按归纳假设与 $n = 1$ 情形是单射，故由蛇引理（两条外层单射夹出中间单射）$K \\otimes M \\to R^{n} \\otimes M$ 单 ✓。∎',
        '',
        '**等价说法的翻译**：由 $0 \\to I \\to R \\to R/I \\to 0$ 与 $\\operatorname{Tor}_{1}^{R}(R, M) = 0$ 得 $\\operatorname{Tor}_{1}^{R}(R/I, M) \\cong \\ker(I \\otimes M \\to M)$，故「$I \\otimes M \\to M$ 单」与「$\\operatorname{Tor}_{1}^{R}(R/I, M) = 0$」是同一句话 ✓。'
      ].join('\n'),
      note: '把「所有理想」压到「有限生成理想」是实质性的：前者常常是巨大的集合，后者在常见环上可数甚至有限。⚠️ 但不能再压到「主理想」—— 那只给无挠。'
    },
    {
      id: 'imp.flat-not-projective',
      kind: 'implication',
      sources: ['prop.flat-domain-torsionfree', 'thm.lambek'],
      target: 'ex.flat-not-projective',
      title: 'PID 上无挠即平坦 $\\implies$ $\\mathbb{Q}$ 平坦但不投射',
      proof: [
        '**平坦**：$\\mathbb{Z}$ 是主理想整环、$\\mathbb{Q}$ 无挠，由 `prop.flat-domain-torsionfree` 的反向得平坦。也可以直接对有限生成理想用 Lambek：$\\mathbb{Z}$ 的理想都是 $(n)$，而 $n \\cdot : \\mathbb{Q} \\to \\mathbb{Q}$ 是单射 ✓。',
        '',
        '**不投射**：设 $\\mathbb{Q}$ 投射。取满射 $F = \\bigoplus_{i \\in I} \\mathbb{Z} \\twoheadrightarrow \\mathbb{Q}$，投射性给出截面 $s$，于是 $\\mathbb{Q}$ 是 $F$ 的直和项、特别地是 $F$ 的子群。',
        '',
        '但 $F$ 没有非平凡可除子群：$F$ 的元素只有有限多个非零坐标，$n$ 倍映射逐坐标作用；若 $x$ 能被所有 $n \\ge 1$ 整除，则每个坐标都被所有 $n$ 整除，而 $\\mathbb{Z}$ 中只有 $0$ 满足这一点，故 $x = 0$。与 $\\mathbb{Q} \\ne 0$ 矛盾 ✓。',
        '',
        '**另一条路**：$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Q}, \\mathbb{Z}) = 0$。若 $\\mathbb{Q}$ 投射，$\\operatorname{Hom}_{\\mathbb{Z}}(\\mathbb{Q}, -)$ 保满射，于是满射 $F \\twoheadrightarrow \\mathbb{Q}$ 被送到满射 $\\operatorname{Hom}(\\mathbb{Q}, F) \\to \\operatorname{Hom}(\\mathbb{Q}, \\mathbb{Q})$，而左边逐个直和项都是 $0$、右边含 $\\mathrm{id}$，矛盾 ✓。∎'
      ].join('\n'),
      note: '这条把「平坦」与「投射」的差距钉在一个具体例子上：$\\mathbb{Q}$ 的平坦性来自「能除」，非投射性来自「不是自由模的直和项」。'
    },
    {
      id: 'imp.scalar-extension-adjunction',
      kind: 'implication',
      sources: ['thm.hom-tensor-adjunction-mod', 'def.scalar-extension'],
      target: 'prop.scalar-extension-adjunction',
      title: '张量–内 Hom 伴随 $\\implies$ 标量扩张 $\\dashv$ 标量限制',
      proof: [
        '把 $S$ 看成 $(S, R)$-双模。对左 $R$-模 $M$、左 $S$-模 $P$：',
        '',
        '**第一步（$S$-线性 = 特定的 $R$-线性）**：$S \\otimes_{R} M$ 由纯张量生成，而 $s \\otimes m = s(1 \\otimes m)$，所以 $S$-线性映射 $g$ 被 $m \\mapsto g(1 \\otimes m)$ 完全决定 ✓。',
        '',
        '**第二步（反向构造）**：给定 $R$-线性 $\\varphi : M \\to P$，$(s, m) \\mapsto s \\varphi(m)$ 是平衡双加性的（$s r$ 与 $r$ 的搬动用 $\\varphi$ 的 $R$-线性），故由 `def.tensor-module` 的万有性质唯一给出 $S$-线性映射 $S \\otimes_{R} M \\to P$ ✓。',
        '',
        '**第三步（互逆与自然）**：两个构造互为逆（在 $1 \\otimes m$ 上显然），公式无选取，故自然。于是',
        '$$\\operatorname{Hom}_{S}(S \\otimes_{R} M, P) \\;\\cong\\; \\operatorname{Hom}_{R}(M, f_{\\ast} P) .$$',
        '',
        '**单位与余单位**：把 $\\mathrm{id}$ 沿同构对来对去得 $\\eta_{M}(m) = 1 \\otimes m$ 与 $\\varepsilon_{P}(s \\otimes p) = s p$；三角恒等式在纯张量与 $M$ 的元素上验证，再线性延拓 ✓。∎'
      ].join('\n'),
      note: '这条与 `thm.hom-tensor-adjunction-mod` 是同一条 curry 化的两种用法：那里把 $N$ 当可变变元，这里把环同态 $f$ 当参数。'
    },
    {
      id: 'imp.scalar-extension-coproduct',
      kind: 'implication',
      sources: ['prop.scalar-extension-adjunction'],
      target: 'prop.scalar-extension-coproduct',
      title: '换环的泛性质 $\\implies$ 推出与基变换',
      proof: [
        '**（1）余积**：$s \\mapsto s \\otimes 1$、$t \\mapsto 1 \\otimes t$ 给出 $R$-代数的余锥。给定余锥 $(\\alpha : S \\to U,\\ \\beta : T \\to U)$，映射 $(s, t) \\mapsto \\alpha(s)\\beta(t)$ 是 $R$-平衡的（用 $\\alpha, \\beta$ 保 $R$-作用与交换性），由万有性质唯一给出 $R$-模映射 $S \\otimes_{R} T \\to U$；交换性保证它保乘法。唯一性由纯张量生成给出 ✓。',
        '',
        '**（2）基变换**：$T \\otimes_{R} M$ 与 $(S \\otimes_{R} T) \\otimes_{S} M$ 表示同一个函子：两者都满足「$S$-模 $M$ 与 $T$-模 $N$ 的双线性配对」这一万有性质，对应 $t \\otimes m \\leftrightarrow (1 \\otimes t) \\otimes m$，故同构且对 $M$ 自然 ✓。',
        '',
        '**（3）**：由交换性，平衡关系允许把 $r$ 从任一因子搬到另一个，故 $(s \\otimes t) \\cdot (m \\otimes n) := s m \\otimes t n$ 良定义；模公理逐条验证 ✓。∎'
      ].join('\n'),
      note: '几何对偶：$\\operatorname{Spec}(S \\otimes_{R} T) \\cong \\operatorname{Spec} S \\times_{\\operatorname{Spec} R} \\operatorname{Spec} T$。环的推出对应概形的纤维积，这就是「基变换」这个名字的来源。'
    },
    {
      id: 'imp.injective-splitting',
      kind: 'implication',
      sources: ['def.injective-module', 'def.split-exact'],
      target: 'prop.injective-splitting',
      title: '延拓性质 $\\implies$ 单射可裂',
      proof: [
        '**（1 蕴含 2）** 取 $A = I$、$f = \\mathrm{id}_{I}$。内射性给出 $r : M \\to I$ 使 $r \\circ i = \\mathrm{id}_{I}$ —— 这就是收缩 ✓。',
        '',
        '**（2 蕴含 1）** 给定 $A \\rightarrowtail B$ 与 $f : A \\to I$，取推出',
        '$$P := (I \\oplus B)/\\{\\, (f(a),\\ -a) : a \\in A \\,\\},$$',
        '它使 $A \\to I$ 与 $A \\to B$ 在 $P$ 中合流。$I \\to P$ 仍单（推出沿单射仍单：判断 $(x, 0)$ 是否落在像里只看 $I$ 分量）。由 2 取收缩 $r : P \\to I$，则 $r \\circ (B \\to P)$ 就是 $f$ 的延拓 ✓。',
        '',
        '**（2 与 3）** 由 `def.split-exact` 的三条等价判据：$i$ 有收缩 $\\iff$ 该短正合列分裂 ✓。∎'
      ].join('\n'),
      note: '推论：内射模不可能作为**真**子模出现在任何模里 —— 「更大的模」这条路对 $I$ 是封死的，这正是「内射」这个词的由来。'
    },
    {
      id: 'imp.baer-criterion',
      kind: 'implication',
      sources: ['def.injective-module', 'prop.injective-splitting'],
      target: 'thm.baer-criterion',
      title: '延拓性质 + Zorn 引理 $\\implies$ Baer 判据',
      proof: [
        '**（$\\implies$）** $J \\rightarrowtail R$ 本身是单射，内射性直接给出延拓 $R \\to I$，记 $1 \\mapsto x$，则 $f(a) = a x$ ✓。',
        '',
        '**（$\\Leftarrow$）** 给定单射 $A \\subseteq B$ 与 $f : A \\to I$。考虑一切延拓对 $(A_{1}, f_{1})$（$A \\subseteq A_{1} \\subseteq B$，$f_{1}|_{A} = f$），按定义域包含排序。链的并仍是延拓，故由 **Zorn 引理**存在极大元 $(A_{1}, f_{1})$ ✓。',
        '',
        '若 $A_{1} \\ne B$，取 $b \\in B \\setminus A_{1}$，令 $J := \\{\\, r \\in R : r b \\in A_{1} \\,\\}$、$h(r) := f_{1}(r b)$。$J$ 是左理想、$h$ 线性；由假设存在 $x \\in I$ 使 $h(r) = r x$（$\\forall r \\in J$）。',
        '',
        '定义 $f_{2}(a + r b) := f_{1}(a) + r x$。**良定义**：若 $a + r b = a_{1} + r_{1} b$，则 $(r - r_{1}) b = a_{1} - a \\in A_{1}$，故 $r - r_{1} \\in J$，于是 $f_{1}((r-r_{1})b) = f_{1}(a_{1}-a)$，两边即 $f_{1}(a) + rx = f_{1}(a_{1}) + r_{1}x$ ✓。这与极大性矛盾，故 $A_{1} = B$ ✓。∎'
      ].join('\n'),
      note: '整条证明只用了「$R$ 是环」与 Zorn 引理，没有任何小性/有限性假设 —— 所以它对**任意**环都成立，这是它比平坦的 Lambek 判据更「硬」的原因。'
    },
    {
      id: 'imp.pid-injective-divisible',
      kind: 'implication',
      sources: ['thm.baer-criterion', 'def.divisible-group'],
      target: 'thm.pid-injective-divisible',
      title: 'Baer 判据 + 主理想 $\\implies$ 内射即除',
      proof: [
        '**（可除 $\\implies$ 内射）** 用 Baer 判据。设 $J \\subseteq R$ 是理想，$f : J \\to I$。主理想整环里 $J = (a)$。',
        '- $a = 0$：$J = 0$，取 $x = 0$ 即可；',
        '- $a \\ne 0$：记 $y := f(a)$，由可除性取 $x \\in I$ 使 $a x = y$。于是对 $r a \\in J$：$f(r a) = r f(a) = r a x = (r a) x$ ✓，即 $f$ 就是「乘 $x$」。',
        '故延拓总存在，$I$ 内射 ✓。',
        '',
        '**（内射 $\\implies$ 可除）** 设 $a \\ne 0$、$y \\in I$。把 Baer 判据用在理想 $(a)$ 与映射 $a \\mapsto y$ 上，得 $x \\in I$ 使 $a x = y$ ✓。',
        '',
        '$\\mathbb{Z}$ 是主理想整环，而 $\\mathbb{Z}$-模即阿贝尔群（`prop.zmod-is-ab`），故「内射『$\\mathbb{Z}$-模』」与「可除群」是同一件事 ✓。∎'
      ].join('\n'),
      note: '这条把范畴条件彻底翻译成群论条件，是 §「内射模」整条链的落点：从此内射性可以用**除法**来检查。'
    },
    {
      id: 'imp.divisible-quotient',
      kind: 'implication',
      sources: ['def.divisible-group'],
      target: 'prop.divisible-quotient',
      title: '可除的定义 $\\implies$ 商仍可除',
      proof: [
        '记 $\\pi : D \\to D/H$。给定 $\\bar{x} \\in D/H$ 与 $n \\ne 0$，取代表 $x \\in D$；由 $D$ 可除，存在 $y \\in D$ 使 $n y = x$。于是',
        '$$n \\bar{y} = \\overline{n y} = \\bar{x},$$',
        '即 $n \\cdot : D/H \\to D/H$ 满 ✓。对一切 $n \\ne 0$ 成立，故 $D/H$ 可除 ✓。∎'
      ].join('\n'),
      note: '对比：可除群的**子群**不必可除（$\\mathbb{Z} \\subseteq \\mathbb{Q}$）。所以「可除」对商封闭、对子不封闭。'
    },
    {
      id: 'imp.divisible-examples',
      kind: 'implication',
      sources: ['def.divisible-group', 'thm.pid-injective-divisible'],
      target: 'ex.divisible-groups',
      title: '可除的定义 $\\implies$ 三个标准例子',
      proof: [
        '**$\\mathbb{Q}$**：给定 $q = a/b$（$b > 0$）与 $n \\ne 0$，取 $x = a/(b n)$，则 $n x = a/b = q$ ✓。',
        '',
        '**$\\mathbb{Q}/\\mathbb{Z}$**：$\\mathbb{Q}$ 可除，由 `prop.divisible-quotient` 其商可除 ✓。',
        '',
        '**Prüfer $p$-群**：$\\mathbb{Z}[1/p]/\\mathbb{Z} = \\varinjlim_{k}\\mathbb{Z}/p^{k}$，余极限沿「乘 $p$」取。给定元素与 $n = p^{s} u$（$p \\nmid u$）：元素来自某一层 $\\mathbb{Z}/p^{k}$，先在该层的第 $k + s$ 层里解 $p^{s} z = x$（这就是无限次除以 $p$ 的意思），再用 $u$ 在模 $p^{k+s}$ 中可逆把 $u$ 除掉 ✓。',
        '',
        '三者由 `thm.pid-injective-divisible` 都是内射 $\\mathbb{Z}$-模 ✓。∎'
      ].join('\n'),
      note: '把这三个例子记住的用处：今后判断一个 $\\mathbb{Z}$-模是否内射，先看它是不是这些家伙的直和项/直和。'
    },
    {
      id: 'imp.enough-injectives',
      kind: 'implication',
      sources: ['thm.pid-injective-divisible', 'thm.baer-criterion'],
      target: 'thm.mod-enough-injectives',
      title: '$\\mathbb{Q}/\\mathbb{Z}$ 内射 + 一个伴随 $\\implies$ 足够多内射',
      proof: [
        '**（一）$\\mathbb{Q}/\\mathbb{Z}$ 是内射 $\\mathbb{Z}$-模且是余生成元。** 内射性由 `thm.pid-injective-divisible`（可除即内射）给出。余生成元：给定 $0 \\ne a \\in A$，$\\langle a \\rangle$ 是循环群（$\\cong \\mathbb{Z}/m$ 或 $\\cong \\mathbb{Z}$），它上面存在非零特征标 $\\langle a \\rangle \\to \\mathbb{Q}/\\mathbb{Z}$，再用内射性延拓到 $A$ ✓。故求值映射 $A \\to A^{\\vee\\vee}$ 单。',
        '',
        '**（二）嵌入内射 $R$-模。** $m \\mapsto (r \\mapsto r m)$ 给出单射 $M \\hookrightarrow \\operatorname{Hom}_{\\mathbb{Z}}(R, M)$（取 $r = 1$ 复原 $m$）。由（一）取内射 $\\mathbb{Z}$-模 $E \\supseteq M$，则 $\\operatorname{Hom}_{\\mathbb{Z}}(R, -)$ 作用后仍单（它保单射：作为右伴随它保极限，而核是极限），得到 $R$-模单射',
        '$$M \\hookrightarrow \\operatorname{Hom}_{\\mathbb{Z}}(R, M) \\hookrightarrow \\operatorname{Hom}_{\\mathbb{Z}}(R, E).$$',
        '',
        '**（三）$\\operatorname{Hom}_{\\mathbb{Z}}(R, E)$ 内射。** 它等于遗忘函子 $U$ 的右伴随作用在内射对象上：',
        '$$\\operatorname{Hom}_{R}\\bigl(N, \\operatorname{Hom}_{\\mathbb{Z}}(R, E)\\bigr) \\;\\cong\\; \\operatorname{Hom}_{\\mathbb{Z}}(UN,\\ E).$$',
        '一般事实：伴随 $F \\dashv G$ 中若 $F$ 正合，则 $G$ 把内射对象送到内射对象（把 $\\operatorname{Hom}(-, GI)$ 换成 $\\operatorname{Hom}(F -, I)$ 即知）；$U$ 显然正合 ✓。',
        '',
        '于是每个模都嵌进内射模，递归造出内射消解 ✓。∎'
      ].join('\n'),
      note: '三步各用一件现成工具：$\\mathbb{Q}/\\mathbb{Z}$ 内射（来自主理想整环那一条）、余生成元性质、遗忘–余自由伴随。比 Grothendieck 范畴的超限迭代短得多，代价是只对模范畴有效。'
    },
    {
      id: 'imp.enough-projectives',
      kind: 'implication',
      sources: ['def.enough-projectives'],
      target: 'thm.mod-enough-projectives',
      title: '自由模覆盖 $\\implies$ 足够多投射',
      proof: [
        '取生成集 $(m_{i})_{i \\in I}$（最省事的取法是 $I = M$、$m_{i} = i$），定义',
        '$$\\varphi : R^{(I)} \\to M, \\qquad \\varphi\\bigl((r_{i})_{i}\\bigr) := \\sum_{i} r_{i} m_{i}$$',
        '（有限和）。由自由模的万有性质，$\\varphi$ 是唯一确定的模同态；$\\varphi(e_{i}) = m_{i}$ 说明它满 ✓。',
        '',
        '**自由模投射**：$R \\to B$ 由 $1$ 的像决定，对满射 $A \\twoheadrightarrow B$ 任取一个原像即可提升 $R \\to A$ ✓；直和保持投射性 ✓，故 $R^{(I)}$ 投射。',
        '',
        '于是每个 $M$ 都有投射对象满射到它 —— 按 `def.enough-projectives` 的定义即「有足够多投射对象」；把核再这样盖住，递归得到投射消解 ✓。∎'
      ].join('\n'),
      note: '与 `thm.mod-enough-injectives` 对照：投射这一侧是**显式**的（自由模写得出），内射那一侧是**存在性**的。'
    }
  ]
});
