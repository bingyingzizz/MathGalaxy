/* ============================================================================
   内容包 · D2 跨领域桥 + E5 经典缺席（2026-11-04，v2 清单 §2 ④⑥）
   ----------------------------------------------------------------------------
   审计最刺眼的一条：**凝聚态 $\\leftrightarrow$ 分析 / 测度 / 泛函 = 0 / 0 / 0**（600 个节点之间零边）。
   这里不去硬连概念对，而是造**真正成立的桥节点**，让两边各自接上来：

     `prop.banach-as-condensed`  Banach 空间（含 Hilbert）经 $S \\mapsto C(S,E)$ 成为凝聚态阿贝尔群
     `thm.riesz-markov`          $C_{c}(X)^{*} \\cong$ Radon 测度 —— 顺便把「整值测度」接上经典测度

   以及 E5 的两点：

     `def.power-object`          幂对象（笛卡尔闭的「指数对象」那一半）
     `def.hodge-star`            Hodge 星号 $*$：从度量 + 体积形式**构造**出来（不是「满足性质」引入）

   ⚠ 每条桥的注里都写清「哪一步本图没有自己的节点」，不假装完整。
   ========================================================================== */
(window.MG = window.MG || {}).packs = window.MG.packs || [];
window.MG.packs.push({
  name: '跨领域桥：Banach → 凝聚态 / Riesz–Markov / 幂对象 / Hodge 星号',

  nodes: [
    {
      id: 'prop.banach-as-condensed',
      cluster: 'cond.ab',
      type: 'proposition',
      label: 'Banach 空间都是凝聚态阿贝尔群',
      title: 'Banach（与 Hilbert）空间经 $S \\mapsto C(S,E)$ 嵌入凝聚态阿贝尔群',
      regions: ['condensed', 'analysis'],
      tags: ['命题', '凝聚态', 'Banach', '桥'],
      statement: [
        '设 $E$ 是实（或复）Banach 空间。对紧 Hausdorff 空间 $S$ 令',
        '',
        '$$\\underline{E}(S) := C(S, E) \\qquad\\text{（$S \\to E$ 的连续映射全体，按逐点运算成群）},$$',
        '',
        '则 $\\underline{E}$ 是一个**凝聚态阿贝尔群**。而且 $E \\mapsto \\underline{E}$ 把**有界**线性映射一一对应到凝聚态的态射：',
        '',
        '$$\\operatorname{Hom}_{\\mathrm{CondAb}}(\\underline{E}, \\underline{F}) \\;\\cong\\; \\operatorname{Hom}_{\\text{bdd}}(E, F).$$',
      ].join('\n'),
      notes: [
        '**约定**：$\\mathrm{CondAb}$ 是紧 Hausdorff 空间上（覆盖 = 有限联合满射族）的阿贝尔群层；限制映射把 $f\\in C(S,E)$ 送到 $f\\circ u$。$E$ 是 Banach 空间，范数记 $\\|\\cdot\\|$；$C(S,E)$ 取上确界范数，因 $E$ 完备它是 Banach 空间，特别地按逐点加法是阿贝尔群。',
        '**第一步：$\\underline{E}$ 满足层条件。** 取有限联合满射 $\\{q_i:S_i\\to S\\}$，验证 $\\underline{E}(S)\\longrightarrow \\prod_i \\underline{E}(S_i)\\rightrightarrows \\prod_{i,j}\\underline{E}(S_i\\times_S S_j)$ 是等化子。**单性**：若 $f,g$ 在每个 $S_i$ 上相同，则对 $s\\in S$ 取 $i$ 与 $x\\in S_i$ 使 $q_i(x)=s$，得 $f(s)=f(q_i(x))=g(q_i(x))=g(s)$。**粘接**：给相容的 $f_i\\in C(S_i,E)$，令 $f(s):=f_i(x)$（$q_i(x)=s$）；若 $x\\in S_i$、$y\\in S_j$ 是同一 $s$ 的两个抬升，则 $(x,y)\\in S_i\\times_S S_j$，相容性给 $f_i(x)=f_j(y)$，故 $f$ 良定义。**连续性**：$q:=\\coprod_i q_i:\\coprod_i S_i\\to S$ 是紧空间到 Hausdorff 空间的连续满射，故闭、从而是商映射；$f\\circ q$ 在每一块 $S_i$ 上等于 $f_i$，连续，由商性质 $f$ 连续。最后，逐点加法与限制相容（限制是群同态），故 $\\underline{E}$ 是 CHaus 上的阿贝尔群层，即 $\\underline{E}\\in\\mathrm{CondAb}$。',
        '**第二步：有界 $T$ 给出凝聚态态射。** 设 $T:E\\to F$ 有界。对每个 $S$ 令 $T_S(f):=T\\circ f$；则 $\\|T_S f\\|\\le \\|T\\|\\,\\|f\\|$，故 $T_S$ 连续，且它是群同态。对 $u:S_1\\to S_2$ 有 $T_{S_1}(f\\circ u)=T_{S_2}(f)\\circ u$，故 $(T_S)_S$ 与限制映射相容，给出 $\\mathrm{CondAb}$ 的态射 $\\underline{T}:\\underline{E}\\to\\underline{F}$；恒等与复合逐点保持，故 $T\\mapsto \\underline{T}$ 是函子性的。',
        '**第三步：任何凝聚态态射都有界。** 设 $\\varphi:\\underline{E}\\to\\underline{F}$。令 $T:=\\varphi_{\\mathrm{pt}}:E\\to F$（用 $\\underline{E}(\\mathrm{pt})=C(\\mathrm{pt},E)\\cong E$）。先证 $T$ 是 $\\mathbb{R}$-线性的：$\\varphi$ 是阿贝尔群同态，给 $T(x+y)=T(x)+T(y)$；对 $r\\in\\mathbb{R}$，数乘映射 $m_r:E\\to E$ 是 $\\underline{E}$ 的自同态，自然性 $\\varphi\\circ \\underline{m_r}=\\underline{m_r}\\circ\\varphi$ 给 $T(rx)=r\\,T(x)$。复的情形同理：对 $i\\in\\mathbb{C}$，数乘映射 $m_i:E\\to E$ 连续，故 $\\underline{m_i}$ 是 $\\underline{E}$ 的自同态，自然性给 $T(ix)=\\varphi_{\\mathrm{pt}}(m_i(x))=m_i(\\varphi_{\\mathrm{pt}}(x))=i\\,T(x)$，于是 $T$ 是 $\\mathbb{C}$-线性的（实情形已由上一句给出，不需要另加）。再反设 $T$ 无界：取 $u_n\\in E$ 使 $\\|u_n\\|\\le 1$、$\\|T u_n\\|\\ge n^{2}$。令 $S:=\\{0\\}\\cup\\{u_n/n:n\\ge 1\\}\\subset E$；因 $\\|u_n/n\\|\\le 1/n\\to 0$，$S$ 是 $E$ 的紧子集（收敛到 $0$ 的序列加极限点）。包含映射 $f:S\\hookrightarrow E$ 连续，故 $\\varphi_S(f)\\in C(S,F)$。但由自然性（用常值映射 $s:\\mathrm{pt}\\to S$）与 $\\mathbb{R}$-线性，$\\varphi_S(f)(u_n/n)=\\varphi_{\\mathrm{pt}}\\bigl(f(u_n/n)\\bigr)=T(u_n/n)=T(u_n)/n,$ 其范数 $\\ge n$，而 $u_n/n\\to 0$，与 $\\varphi_S(f)$ 在 $0$ 连续矛盾。故 $T$ 有界。',
        '**第四步：两个构造互逆。** 给定有界 $T$，$\\underline{T}_{\\mathrm{pt}}(x)=T(x)$，故 $T\\mapsto\\underline{T}\\mapsto T$ 是恒等。给定 $\\varphi$，第三步给有界 $T=\\varphi_{\\mathrm{pt}}$；对任意 $S$、$f\\in C(S,E)$、$s\\in S$，用常值映射 $s:\\mathrm{pt}\\to S$ 的自然性得 $\\varphi_S(f)(s)=\\varphi_{\\mathrm{pt}}\\bigl(f(s)\\bigr)=T\\bigl(f(s)\\bigr)=\\underline{T}_S(f)(s),$ 故 $\\varphi=\\underline{T}$。于是 $T\\mapsto\\underline{T}$ 是双射 $\\operatorname{Hom}_{\\mathrm{bdd}}(E,F)\\xrightarrow{\\ \\sim\\ }\\operatorname{Hom}_{\\mathrm{CondAb}}(\\underline{E},\\underline{F})$。∎',
        '**备注**：证明真正用到 Banach 完备性的只有「$C(S,E)$ 是 Banach 空间」这一句（层条件本身对任意 Hausdorff 拓扑向量空间 $E$ 都成立：粘接出的 $f$ 只要连续即可）；第三步用的是 $E,F$ 的范数。逐点群结构使层条件与群运算自动相容，这正是「凝聚态阿贝尔群 = CHaus 上阿贝尔群层」这一定义要检查的全部内容。',
        '⭐ **这就是凝聚态理论的起点动机**：拓扑阿贝尔群范畴太坏（极限/余极限不好、Ext 不好算），但把「测试空间」从点换成一族紧 Hausdorff 空间之后，Banach 空间、Fréchet 空间这些都原封不动地住进了一个阿贝尔范畴。',
        '📌 **Hilbert 是特例**：$H$ 是 Banach 空间，所以 $\\underline{H}$ 也是凝聚态阿贝尔群 —— 但别把「$H$ 是固态群」当结论：固态性是关于 $\\prod_{I}\\mathbb{Z}$ 的紧投射性，与「内积完备」不是一回事。',
      ].join('\n\n'),
      refs: ['Clausen–Scholze, Lectures on Condensed Mathematics, Lecture I（拓扑阿贝尔群 → 凝聚态）'],
    },

    {
      id: 'thm.riesz-markov',
      cluster: 'analysis.measure',
      type: 'theorem',
      label: 'Riesz–Markov 表示',
      title: 'Riesz–Markov：$C_{c}(X)^{*} \\cong$ Radon 测度',
      regions: ['analysis'],
      tags: ['定理', '测度', '泛函分析', '桥'],
      statement: [
        '设 $X$ 是局部紧 Hausdorff 空间，$C_{c}(X)$ 配 sup 范数（连续、紧支的实值函数）。则每个**正**线性泛函 $\\Lambda : C_{c}(X) \\to \\mathbb{R}$ 都唯一地写成',
        '',
        '$$\\Lambda(f) = \\int_{X} f \\,\\mathrm{d}\\mu,$$',
        '',
        '其中 $\\mu$ 是 $X$ 上的一个**Radon 测度**（定义见 def.radon-measure），且 $\\lVert\\Lambda\\rVert = \\mu(X)$（$X$ 紧时就是 $\\mu(X)$；$X$ 不紧时两端都可以是 $+\\infty$）。一般（不必正）的泛函要**先假设有界**（对 $\\sup$ 范数连续）才对应对符号测度之差；无界泛函（如在 $[0,1]$ 上取 $\\Lambda(x^{n}) = n$ 再作基延拓）不能由有限符号测度表示。',
      ].join('\n'),
      notes: [
        '**术语**：本条的 $\\mu$ 是 **Radon 测度** —— Borel 测度、紧集上有限、外正则、开集上内正则（见 def.radon-measure）。图内 def.regular-measure 是 $\\mathbb{R}^n$ 上的特例（紧集有限 + 外正则）；本条不再把两者混用。',
        '**第一步：在开集上定义 $\\mu$**。对开集 $U \\subseteq X$ 令',
        '$$\\mu(U) := \\sup\\Big\\{\\, \\Lambda(f) : f \\in C_{c}(X),\\ 0 \\le f \\le 1,\\ \\operatorname{supp} f \\subseteq U \\,\\Big\\},$$',
        '并约定 $\\mu(\\emptyset) = 0$。这里 $\\operatorname{supp} f \\subseteq U$ 是包含关系（$f$ 的支集紧，故 $\\mu(U)$ 是「用紧支函数逼近 $U$」的上确界）。',
        '**引理 1（单调）**：$U \\subseteq V$ $\\Longrightarrow$ $\\mu(U) \\le \\mu(V)$。显然（可行集变大）。∎',
        '**引理 2（有限次可加）**：对任意开集 $U, V$，',
        '$$\\mu(U \\cup V) \\le \\mu(U) + \\mu(V).$$',
        '证明：取 $f \\in C_{c}$，$0 \\le f \\le 1$，$K := \\operatorname{supp} f \\subseteq U \\cup V$。$K \\setminus V$ 是紧集且含于开集 $U$。由局部紧 Hausdorff 的正则性，取**相对紧**开集 $W$ 使 $K \\setminus V \\subseteq W \\subseteq \\overline{W} \\subseteq U$（$\\overline{W}$ 紧），再取开集 $N$ 使 $K \\setminus V \\subseteq N \\subseteq \\overline{N} \\subseteq W$。取**单点紧化** $X^{+} = X \\cup \\{\\infty\\}$：$X$ 局部紧 Hausdorff $\\Longrightarrow$ $X^{+}$ 紧 Hausdorff $\\Longrightarrow$ $X^{+}$ 正规，故可在 $X^{+}$ 内对**闭集** $\\overline{N}$ 与闭集 $X^{+} \\setminus W$ 用 Urysohn 引理（`lem.urysohn`，要的是**正规**而非局部紧），得 $\\varphi^{+} : X^{+} \\to [0,1]$ 使 $\\varphi^{+} = 1$ 于 $\\overline{N}$、$\\varphi^{+} = 0$ 于 $X^{+} \\setminus W$。限制回 $X$ 得 $\\varphi := \\varphi^{+}|_{X} \\in C_{c}(X)$，$\\operatorname{supp} \\varphi \\subseteq \\overline{W} \\subseteq U$、且 $\\varphi = 1$ 于 $N \\supseteq K \\setminus V$。于是',
        '$$f = f\\varphi + f(1 - \\varphi),\\qquad \\operatorname{supp}(f\\varphi) \\subseteq U,\\qquad \\operatorname{supp}\\big(f(1 - \\varphi)\\big) \\subseteq V$$',
        '（第一式：$\\varphi$ 在 $X \\setminus W$ 上为 $0$，故 $\\operatorname{supp}(f\\varphi) \\subseteq K \\cap \\overline{W} \\subseteq U$。第二式：$1 - \\varphi$ 在开集 $N \\supseteq K \\setminus V$ 上为 $0$、在 $K$ 外 $f = 0$，故 $f(1 - \\varphi)$ 在 $N \\cup (X \\setminus K)$ 上恒为 $0$，而剩下的 $K \\setminus N$ 是**闭集**且含于 $V$，故 $\\operatorname{supp}\\big(f(1 - \\varphi)\\big) \\subseteq V$）。两个函数都满足 $0 \\le \\cdot \\le 1$，故',
        '$$\\Lambda(f) = \\Lambda(f\\varphi) + \\Lambda\\big(f(1 - \\varphi)\\big) \\le \\mu(U) + \\mu(V).$$',
        '对 $f$ 取上确界即得。∎',
        '**引理 3（不交可加）**：若 $U \\cap V = \\emptyset$，则 $\\mu(U \\cup V) = \\mu(U) + \\mu(V)$。',
        '证明：取 $f \\prec U$、$g \\prec V$（即 $0 \\le f,g \\le 1$，支集分别在 $U$、$V$ 里）。因支集不交，$f + g$ 满足 $0 \\le f + g \\le 1$ 且 $\\operatorname{supp}(f+g) \\subseteq U \\cup V$，故 $\\Lambda(f) + \\Lambda(g) = \\Lambda(f + g) \\le \\mu(U \\cup V)$。对 $f, g$ 分别取上确界得 $\\mu(U) + \\mu(V) \\le \\mu(U \\cup V)$；反向不等式由引理 2。∎',
        '**第二步：外测度**。对任意 $E \\subseteq X$ 令',
        '$$\\mu^{*}(E) := \\inf\\big\\{\\, \\mu(U) : E \\subseteq U,\\ U\\ \\text{开} \\,\\big\\}.$$',
        '它是外测度：单调与 $\\mu^{*}(\\emptyset) = 0$ 显然。**可数次可加**：取 $E_{n} \\subseteq U_{n}$（$U_{n}$ 开）。对紧支 $f$ 令 $K = \\operatorname{supp} f \\Subset \\bigcup_{n} U_{n}$，由引理 2 的有限次可加性（对并归纳），$K$ 有有限子覆盖 $U_{n_{1}},\\ldots,U_{n_{k}}$，得 $\\Lambda(f) \\le \\mu(\\bigcup_{i} U_{n_{i}}) \\le \\sum_{i} \\mu(U_{n_{i}}) \\le \\sum_{n} \\mu(U_{n})$；对可行 $f$ 取上确界得 $\\mu(\\bigcup_{n}U_{n}) \\le \\sum_{n}\\mu(U_{n})$，再对 $E \\subseteq \\bigcup_{n}U_{n}$ 取下确界即得 $\\mu^{*}$ 的可数次可加性。',
        '**引理 4（开集 Carathéodory 可测；证明如下）**：对任意 $A \\subseteq X$ 与开集 $U$，有',
        '$$\\mu^{*}(A \\cap U) + \\mu^{*}(A \\setminus U) \\le \\mu^{*}(A).$$',
        '记 $\\nu(E) := \\sup\\{\\, \\Lambda(f) : f \\in C_{c}(X),\\ 0 \\le f \\le 1,\\ \\operatorname{supp} f \\subseteq E \\,\\}$（对任意 $E$ 定义；$E$ 开时 $\\nu(E) = \\mu(E)$）。先证两条辅助事实。',
        '**（甲）开集上内正则**：$\\mu(U) = \\sup\\{\\, \\nu(K) : K \\subseteq U,\\ K\\ \\text{紧} \\,\\}$。证明：对 $f \\prec U$，$K = \\operatorname{supp} f$ 紧且 $\\Lambda(f) \\le \\nu(K)$，故 $\\mu(U) \\le \\sup_{K} \\nu(K)$；反向不等式由 $\\nu(K) \\le \\mu(U)$。∎',
        '**（乙）分裂估计**：若 $V$ 开、$K \\subseteq V$ 紧，则 $\\nu(K) + \\mu(V \\setminus K) \\le \\mu(V)$。证明：取 $f \\prec V \\setminus K$ 与 $g$（$0 \\le g \\le 1$、$\\operatorname{supp} g \\subseteq K$）。两支集不交且都含于 $V$，故 $f + g \\prec V$，于是 $\\Lambda(f) + \\Lambda(g) \\le \\mu(V)$；先对 $f$ 取上确界得 $\\mu(V \\setminus K) + \\Lambda(g) \\le \\mu(V)$，再对 $g$ 取上确界即得。∎',
        '**（丙）可测性**：可设 $\\mu^{*}(A) < \\infty$（否则右边为 $+\\infty$，不等式显然）。任给 $\\varepsilon > 0$，取开 $V \\supseteq A$ 使 $\\mu(V) < \\mu^{*}(A) + \\varepsilon$。由（甲）取紧 $K \\subseteq V \\cap U$ 使 $\\nu(K) > \\mu(V \\cap U) - \\varepsilon$。由 $K \\subseteq U$ 得 $A \\setminus U \\subseteq V \\setminus K$，而 $V \\setminus K$ 开；又 $A \\cap U \\subseteq V \\cap U$。于是',
        '$$\\mu^{*}(A \\cap U) + \\mu^{*}(A \\setminus U) \\le \\mu(V \\cap U) + \\mu(V \\setminus K) \\le (\\nu(K) + \\varepsilon) + \\mu(V \\setminus K) \\le \\mu(V) + \\varepsilon < \\mu^{*}(A) + 2\\varepsilon.$$',
        '令 $\\varepsilon \\to 0$ 即得。∎',
        '**第三步：Carathéodory 延拓**。由引理 4，每个开集都是 $\\mu^{*}$-可测的；由 `thm.caratheodory`，$\\mu^{*}$-可测集构成 $\\sigma$-代数且 $\\mu^{*}$ 在其上可加。开集生成 Borel $\\sigma$-代数，故每个 Borel 集可测；把 $\\mu^{*}$ 限制到 Borel 集上得 Borel 测度 $\\mu$。对开 $U$ 有 $\\mu(U) = \\mu^{*}(U)$（$U$ 自身就是覆盖，单调性给等号）；由构造 $\\mu$ 在 Borel 集上外正则，而（甲）与 $\\nu(K) \\le \\mu(K)$ 给出开集上内正则。',
        '**紧集上有限**：对紧 $K$，取紧邻域 $L \\supseteq K$（局部紧 Hausdorff 中每点有紧邻域，有限覆盖即得），令 $W = \\operatorname{int} L$。由单点紧化 + `lem.urysohn` 取 $\\varphi \\in C_{c}(X)$，$0 \\le \\varphi \\le 1$、$\\varphi = 1$ 于 $L$。任何 $f \\prec W$ 满足 $f \\le \\varphi$，故 $\\mu(W) \\le \\Lambda(\\varphi) < \\infty$；于是 $\\mu(K) \\le \\mu(W) < \\infty$。',
        '**第四步：表示引理**。设 $f \\in C_{c}(X)$。先设 $f \\ge 0$，记 $M = \\lVert f \\rVert_{\\infty}$、$K = \\operatorname{supp} f$；取上面的紧邻域构造中的 $W = \\operatorname{int} L \\supseteq K$，则 $\\mu(W) < \\infty$。',
        '**下界 $\\Lambda(f) \\ge \\int f\\,\\mathrm{d}\\mu$**：对 $n \\ge 1$ 令 $t_i = iM/n$（$i = 0, \\ldots, n$）、$A_i = \\{\\, f > t_i \\,\\}$（开；$A_n = \\emptyset$），并令',
        '$$s := \\sum_{i=1}^{n} (t_i - t_{i-1})\\,\\chi_{A_i}.$$',
        '则 $s \\le f \\le s + M/n$。对每个 $i$ 取 $g_i \\in C_{c}(X)$，$0 \\le g_i \\le 1$、$\\operatorname{supp} g_i \\subseteq A_i$、$\\Lambda(g_i) \\ge \\mu(A_i) - \\delta$（$A_i = \\emptyset$ 时取 $g_i = 0$），令 $g := \\sum_{i} (t_i - t_{i-1})\\,g_i$。因 $g_i \\le \\chi_{A_i}$，有 $g \\le s \\le f$，故',
        '$$\\Lambda(f) \\ge \\Lambda(g) = \\sum_{i} (t_i - t_{i-1})\\Lambda(g_i) \\ge \\int s\\,\\mathrm{d}\\mu - M\\delta.$$',
        '又 $0 \\le f - s \\le M/n$ 且 $f - s$ 支在 $W$ 内，故 $\\int f \\le \\int s + (M/n)\\mu(W)$，即 $\\int s \\ge \\int f - (M/n)\\mu(W)$。代入得 $\\Lambda(f) \\ge \\int f - (M/n)\\mu(W) - M\\delta$；先令 $\\delta \\to 0$，再令 $n \\to \\infty$，即得 $\\Lambda(f) \\ge \\int f$。',
        '**上界 $\\Lambda(f) \\le \\int f\\,\\mathrm{d}\\mu$**：由下界，对任意连续 $h \\ge 0$ 有 $\\Lambda(h) \\ge \\int h$。取开 $W \\supseteq K$ 使 $\\mu(W) < \\mu(K) + \\varepsilon$（外正则），再取**相对紧**开集 $W\'$ 使 $K \\subseteq W\' \\subseteq \\overline{W\'} \\subseteq W$，并取 $\\varphi \\in C_{c}(X)$，$0 \\le \\varphi \\le 1$、$\\varphi = 1$ 于 $K$、$\\operatorname{supp} \\varphi \\subseteq \\overline{W\'} \\subseteq W$（单点紧化 + `lem.urysohn`；最后这步包含关系靠的是**相对紧**，光有 $\\varphi = 0$ 于 $X \\setminus W$ 只能得支集落在 $\\overline{W}$）。令 $k := M\\varphi - f$：在 $K$ 上 $\\varphi = 1$ 故 $k = M - f \\ge 0$；在 $K$ 外 $f = 0$ 故 $k = M\\varphi \\ge 0$。于是 $k \\ge 0$ 连续紧支，对 $k$ 用下界：',
        '$$\\Lambda(k) \\ge \\int k \\;\\Longrightarrow\\; M\\Lambda(\\varphi) - \\Lambda(f) \\ge M\\int \\varphi - \\int f.$$',
        '故 $\\Lambda(f) \\le M(\\Lambda(\\varphi) - \\int \\varphi) + \\int f$。由 $\\Lambda(\\varphi) \\le \\mu(W) < \\mu(K) + \\varepsilon$ 与 $\\varphi = 1$ 于 $K$（故 $\\int \\varphi \\ge \\mu(K)$）得 $\\Lambda(\\varphi) - \\int \\varphi < \\varepsilon$，从而 $\\Lambda(f) \\le \\int f + M\\varepsilon$。令 $\\varepsilon \\to 0$ 得 $\\Lambda(f) \\le \\int f$。∎',
        '对一般 $f \\in C_{c}(X)$，写 $f = f^{+} - f^{-}$ 并用线性性与上述两半，即得 $\\Lambda(f) = \\int f\\,\\mathrm{d}\\mu$。∎',
        '**唯一性**：若两个 Radon 测度给出同一个 $\\Lambda$，对开 $U$、$f \\prec U$ 有 $\\int f\\,\\mathrm{d}\\mu_1 = \\Lambda(f) = \\int f\\,\\mathrm{d}\\mu_2$；对紧 $K \\subseteq U$，取 $f \\prec U$、$f = 1$ 于 $K$（单点紧化 + `lem.urysohn`），得 $\\mu_1(K) \\le \\Lambda(f) \\le \\mu_2(U)$。先对 $K$ 取上确界（开集内正则）、再对 $U$ 取下确界（外正则），得 $\\mu_1(U) = \\mu_2(U)$，从而两测度在 Borel 集上相等。',
        '**范数**：$\\mu(X) = \\sup\\{\\Lambda(f) : 0 \\le f \\le 1\\} = \\lVert\\Lambda\\rVert$（正泛函在 $\\lVert f\\rVert \\le 1$ 上的上确界就是它在 $0 \\le f \\le 1$ 上的上确界）；$X$ 紧时 $\\mu(X) = \\Lambda(1) = \\lVert\\Lambda\\rVert$，$X$ 不紧时两端也可能同为 $+\\infty$。',
        '⭐ **与凝聚态的关系**：profinite 集上的「整值测度」$M(S,\\mathbb{Z}) = \\operatorname{Hom}_{\\mathbb{Z}}(C(S,\\mathbb{Z}),\\mathbb{Z})$ 就是这条定理的**整值、紧全不连通**版本 —— 见 `def.cond-measure`。两者的差别只在「系数环」与「测试空间」，做法同为「对连续函数做赋值」。',
      ].join('\n\n'),
      refs: [
        'Rudin, Real and Complex Analysis (3rd ed.), Ch. 2 · Riesz Representation Theorem（定理 2.14）',
        'Folland, Real Analysis, Ch. 7 · Riesz Representation Theorem',
        'Bauer, Measure and Integration Theory, Ch. 7 · Riesz–Markov–Kakutani',
      ]
    },

    {
      id: 'def.power-object',
      cluster: 'cat.structure',
      type: 'definition',
      label: '幂对象',
      title: '幂对象 $Y^{X}$：积的左伴随，即「函数空间」的对象化',
      regions: ['category'],
      tags: ['定义', '范畴论', '笛卡尔闭'],
      statement: [
        '设 $\\mathcal{C}$ 有有限积，$X, Y \\in \\mathcal{C}$。若存在对象 $Y^{X}$ 与态射 $\\operatorname{ev} : Y^{X} \\times X \\to Y$，使得对任意 $Z$ 与任意 $f : Z \\times X \\to Y$，存在**唯一**的 $\\tilde f : Z \\to Y^{X}$ 使',
        '',
        '$$\\operatorname{ev} \\circ (\\tilde f \\times \\operatorname{id}_{X}) = f,$$',
        '',
        '就说 $Y^{X}$ 是 $Y$ 对 $X$ 的**幂对象**（exponential object），$\\operatorname{ev}$ 叫**求值映射**。',
      ].join('\n'),
      notes: [
        '**等价说法（更好用）**：$Y^{X}$ 就是函子 $-\\times X : \\mathcal{C} \\to \\mathcal{C}$ 的**右伴随**，即',
        '',
        '$$\\operatorname{Hom}(Z \\times X,\\, Y) \\;\\cong\\; \\operatorname{Hom}(Z,\\, Y^{X}).$$',
        '所以「有幂对象」= 「积有右伴随」。',
        '⭐ **为什么它是「笛卡尔闭」的第二半**：笛卡尔闭 = 有限积 + 幂对象。' +
          '本图 `prop.cg-cartesian-closed` 说的正是「紧生成空间这一侧有幂对象，只是要把紧开拓扑再 $k$-化一次」。',
        '⚠ **别与「内部 Hom」混**：$\\mathcal{C}$ 是一般范畴时，$Y^{X}$ 是 $\\mathcal{C}$ 里**真的存在**的那个对象；' +
          '而内部 Hom（`def.internal-hom`，拓扑斯里那个）是先取 Hom 集再用余极限/层化造出来的。在笛卡尔闭范畴里两者一致，在一般的拓扑斯里只有内部 Hom。',
        '📌 **$\\mathbf{Set}$ 里的样子**：$Y^{X}$ 就是函数集 $\\operatorname{Hom}_{\\mathbf{Set}}(X,Y)$，' +
          '$\\operatorname{ev}(f, x) = f(x)$ —— 幂对象就是「把函数收集成一个集合」这件事的对象化。',
      ].join('\n\n'),
      refs: ['Mac Lane, Categories for the Working Mathematician, §IV.6'],
    },

    {
      id: 'def.hodge-star',
      cluster: 'diffgeom.form',
      type: 'definition',
      label: 'Hodge 星号',
      title: 'Hodge 星号 $*$：$\\Omega^{k} \\to \\Omega^{n-k}$，由度量与体积形式构造',
      regions: ['geometry'],
      tags: ['定义', '微分几何', '微分形式', 'Hodge'],
      statement: [
        '设 $(M, g)$ 是可定向 $n$ 维 Riemann 流形，$\\mathrm{vol}$ 是 $g$ 决定的体积形式，$\\langle \\cdot, \\cdot \\rangle$ 是 $k$-形式上由 $g$ 诱导的内积。对 $\\alpha \\in \\Omega^{k}(M)$ 定义 $*\\alpha \\in \\Omega^{n-k}(M)$ 为**唯一**满足',
        '',
        '$$\\beta \\wedge *\\alpha \\;=\\; \\langle \\beta, \\alpha \\rangle\\, \\mathrm{vol} \\qquad \\text{对一切 } \\beta \\in \\Omega^{k}(M)$$',
        '',
        '的那个 $(n-k)$-形式。',
      ].join('\n'),
      notes: [
        '**为什么存在唯一**：$\\beta \\mapsto \\langle \\beta,\\alpha\\rangle$ 是 $\\Lambda^{k}T_{p}^{\\ast}M$ 上的线性泛函，' +
          '而 $\\beta \\wedge (-) : \\Lambda^{k} \\to \\Lambda^{n}$ 与 $\\mathrm{vol}$ 一起给出「$\\Lambda^{n-k} \\to \\mathbb{R}$」与「$\\Lambda^{k} \\to \\mathbb{R}$」的**配对**（非退化），' +
          '于是那个线性泛函唯一地对应一个 $(n-k)$-形式。逐点做、再验证光滑。',
        '📌 **坐标里的一行公式**：取定向标准正交余标架 $e^{1}, \\ldots, e^{n}$（此时 $\\mathrm{vol} = e^{1}\\wedge\\cdots\\wedge e^{n}$），则',
        '',
        '$$*(e^{i_{1}}\\wedge\\cdots\\wedge e^{i_{k}}) \\;=\\; \\operatorname{sgn}(\\sigma)\\, e^{j_{1}}\\wedge\\cdots\\wedge e^{j_{n-k}},$$',
        '其中 $\\{j\\}$ 是补集、按递增排列，$\\sigma$ 是排列 $(i_1,\\ldots,i_k, j_1,\\ldots,j_{n-k})$ 的符号。',
        '⭐ **它的用途在下一层**：$\\delta := (-1)^{nk+n+1} *\\mathrm{d}*$（余微分）要用 $*$ 写出来；有了 $\\delta$ 才有 $\\Delta = \\mathrm{d}\\delta + \\delta\\mathrm{d}$ 与**调和形式**，' +
          '然后才有 Hodge 定理（每个 de Rham 类有唯一调和代表元）。',
        '⚠ **本图的空白**：余微分 $\\delta$、Laplace–de Rham 算子 $\\Delta$、调和形式、Hodge 定理**都还没有节点** —— ' +
          '这一条只把其中**可构造的第一块**（$*$）落地；⛔ 不要在这里声称 Hodge 分解已经可用。',
        '⚠ **依赖定向**：$*$ 依赖 $\\mathrm{vol}$ 的符号，所以 $M$ 不可定向时要在扭曲形式（密度）上工作，那一步本图没有。',
      ].join('\n\n'),
      refs: ['Warner, Foundations of Differentiable Manifolds, Ch. 6'],
    },
  ],

  edges: [
    /* ④ 桥：凝聚态 $\\leftrightarrow$ 分析 / 泛函 */
    { id: 'dep.bcd-banach', kind: 'definition', definition: 'def.banach-space', usedBy: 'prop.banach-as-condensed',
      note: '命题的输入就是 Banach 空间 $E$（要它的完备性来保证 $C(S,E)$ 是 Banach 空间）。' },
    { id: 'dep.bcd-hilbert', kind: 'definition', definition: 'def.hilbert-space', usedBy: 'prop.banach-as-condensed',
      note: 'Hilbert 空间是 Banach 空间的特例，所以也走这条桥（注里有说明）。' },
    { id: 'dep.bcd-condab', kind: 'definition', definition: 'def.condensed-abelian-group', usedBy: 'prop.banach-as-condensed',
      note: '结论说 $\\underline{E}$ 是**凝聚态阿贝尔群** —— 要用它的定义（紧 Hausdorff 上的层）。' },

    /* ④ 桥：凝聚态 $\\leftrightarrow$ 测度（经 Riesz–Markov 的整值版本） */
    { id: 'dep.rm-measure', kind: 'definition', definition: 'def.measure', usedBy: 'thm.riesz-markov',
      note: '结论说「存在一个 Radon **测度** $\\mu$」，用到测度的定义。' },
    { id: 'dep.rm-lc', kind: 'definition', definition: 'def.locally-compact-space', usedBy: 'thm.riesz-markov',
      note: '假设是局部紧 Hausdorff —— 局部紧是 Urysohn 夹逼函数存在的前提。' },
    { id: 'dep.rm-hausdorff', kind: 'definition', definition: 'def.hausdorff', usedBy: 'thm.riesz-markov',
      note: '假设里的 Hausdorff 一半：它保证紧集闭、单点紧化正规，因而 Urysohn 可用。' },
    { id: 'dep.rm-outer', kind: 'definition', definition: 'def.outer-measure', usedBy: 'thm.riesz-markov',
      note: '证明第 ②③ 步：先造外测度、再用 Carathéodory 延拓 —— 这两步连同第 ④ 步的表示引理（含上下界）都已在节点注里写全；这条边只记「外测度」这个定义被用到。' },
    { id: 'ana.rm-cond-measure', kind: 'analogy', a: 'def.cond-measure', b: 'thm.riesz-markov',
      title: '整值测度 $\\leftrightarrow$ Riesz–Markov：同一台机器，换系数环与测试空间',
      note: '两处都在做「对连续函数做赋值，得到『集合的大小』」这一件事：\n' +
        '- 经典：$\\Lambda \\in C_{c}(X)^{\\ast}$ $\\rightsquigarrow$ Radon 测度；\n' +
        '- 凝聚态：$\\operatorname{Hom}_{\\mathbb{Z}}(C(S,\\mathbb{Z}),\\mathbb{Z})$，$S$ profinite —— **整值**系数、**紧全不连通**的测试空间。\n\n' +
        '⚠ 方向不同、范畴不同，所以只记**类比**，不当依赖：经典定理给出「测度」，凝聚态那个对象是**按定义取对偶**得到的。' },

    { id: 'dep.rm-radon', kind: 'definition', definition: 'def.radon-measure', usedBy: 'thm.riesz-markov',
      note: '结论里的测度是 Radon 测度（Borel、紧集有限、外正则、开集内正则）；def.regular-measure 只是 R^n 特例。' },
    { id: 'dep.radon-measure', kind: 'definition', definition: 'def.measure', usedBy: 'def.radon-measure',
      note: 'Radon 测度首先是一个 Borel 测度，用到测度定义。' },

    /* ④ 桥：凝聚态 $\\leftrightarrow$ 范畴论（阿贝尔范畴那一条） */
    { id: 'ana.condab-abeliancat', kind: 'analogy', a: 'thm.condab-ab', b: 'def.abelian-category',
      title: '凝聚态阿贝尔群 $\\leftrightarrow$ 阿贝尔范畴：都是「好到能算同调」的地方',
      note: '两处在回答同一个问题：**什么样的范畴里可以放心地做同调代数？**\n' +
        '- 阿贝尔范畴：核余核都存在、单满都正则 $\\implies$ 蛇引理、长正合列都成立；\n' +
        '- $\\mathrm{CondAb}$：先是预阿贝尔且满足 AB3–AB6，再靠「有足够多紧投射对象」把 Ext 算得出来（`thm.condab-ab`）。\n\n' +
        '⚠ 不是蕴含：$\\mathrm{CondAb}$ **是**阿贝尔范畴（`thm.condab-ab` 证明的那部分），所以这是「实例 $\\leftrightarrow$ 一般框架」的类比，不是两个平行理论。' },

    /* ⑥ 幂对象 */
    { id: 'dep.power-adjoint', kind: 'definition', definition: 'def.adjoint', usedBy: 'def.power-object',
      note: '幂对象就是 $-\\times X$ 的右伴随 —— 用到伴随的定义（三角恒等式）。' },
    { id: 'dep.cgcc-power', kind: 'definition', definition: 'def.power-object', usedBy: 'prop.cg-cartesian-closed',
      note: '「紧生成空间是笛卡尔闭的」= 它有幂对象（且要把紧开拓扑再 $k$-化），用到幂对象的定义。' },

    /* ⑥ Hodge 星号 */
    { id: 'dep.hodge-g', kind: 'definition', definition: 'def.riemannian-metric', usedBy: 'def.hodge-star',
      note: '内积 $\\langle\\cdot,\\cdot\\rangle$ 与体积形式都由 $g$ 给出。' },
    { id: 'dep.hodge-vol', kind: 'definition', definition: 'def.volume-form', usedBy: 'def.hodge-star',
      note: '定义等式右边就是 $\\mathrm{vol}$：没有体积形式就写不出 $\\beta\\wedge *\\alpha$。' },
    { id: 'dep.hodge-form', kind: 'definition', definition: 'def.form-on-manifold', usedBy: 'def.hodge-star',
      note: '$*$ 是 $\\Omega^{k} \\to \\Omega^{n-k}$ 的映射，输入输出都是流形上的微分形式。' },

    /* ⑦ Riesz 表示引理依赖（有限覆盖上的）紧支单位分解 */
    { id: 'dep.rm-pou', kind: 'definition', definition: 'def.partition-of-unity', usedBy: 'thm.riesz-markov',
      note: '表示引理用一族紧支函数 $g_{i} \\prec A_{i}$（本质上是单位分解式的局部化）把 $f$ 上下夹住；表示引理的上下界已在节点注第 ④ 步写全，这条边只记对单位分解概念的依赖。' },

    {
      id: 'imp.riesz-markov-inputs',
      kind: 'implication',
      sources: ['thm.caratheodory', 'lem.urysohn', 'def.one-point-compactification'],
      target: 'thm.riesz-markov',
      title: 'Carathéodory 延拓 + Urysohn 夹逼 + 单点紧化 $\\Longrightarrow$ Riesz 表示（依赖登记）',
      proof: [
        '**这条边只登记依赖，不证结论。** 三者合起来才够，任何一条单独都推不出 $\\Lambda(f) = \\int f \\,d\\mu$：',
        '',
        '1. `def.one-point-compactification`（单点紧化）：`X` 局部紧 Hausdorff $\\implies$ `X^{+}` 紧 Hausdorff $\\implies$ 正规，于是可以在 `X^{+}` 里对闭集用 Urysohn 造夹逼函数 `\\varphi`；',
        '2. `lem.urysohn`（Urysohn 引理）：引理 2 的次可加性、紧集上有限性、上下界与唯一性，每一步都靠它造 `\\varphi \\in C_{c}(X)`（`\\varphi = 1` 于 `K`、支集落在指定的相对紧开集里）；',
        '3. `thm.caratheodory`（Carathéodory 延拓）：第 ③ 步把造好的外测度 `\\mu^{*}` 限制到 Borel 集上得到 Radon 测度。',
      ].join('\n'),
      note: '⚠ 依赖登记边：这三条只是证明链的三块输入，单独都不构成蕴含；表示引理本身的上下界与唯一性在节点注第 ④ 步。',
    },
  ],
});
