/* ==========================================================================
   数学星图 · 别名与问题钩子
   --------------------------------------------------------------------------
   节点 `label` 是「标准叫法」；可是人和 AI 搜的时候用的是**别的词**：
   英文名、老名字、常见缩写、大白话。这个文件补的就是那一段落差。

   两类条目：

   - `nodes[]` —— **别名**：`{ id, aka: [...] }`，同一个东西的其它叫法。
     命中别名时搜索直接加权，所以 `dominated convergence` 也能召回控制收敛定理。
     ⚠️ `aka` 是**纯文本**（和 `label` / `tags` 一样）：不能含 `$`，
        数学记号写成可搜的朴素形式（`L1`、`Lp`、`L-infinity`、`sigma-algebra`）。

   - `hooks[]` —— **问题钩子**：`{ q, to: [...] }`，一个**问法**该看哪几个节点。
     这是「大白话 → 术语」的对照。它同时服务两个出口：
     浏览器搜索会把 `to` 里的节点顶到「相关问题」分组；
     构建期会导成 `dist/alias/*.md` 给 AI，让 AI 不用先猜中文术语、直接拿到节点 id。

   两个出口共用这一份数据：
       src/data/aliases.js ──┬──→ 浏览器搜索（人）
                             └──→ dist/alias.md（AI）

   ⚠️ 只动这一个文件就能加别名 / 加钩子；`tools/build.mjs` 从这里读并做断言
      （id 必须真实存在、`aka` 不能含 `$`、`q` 不能重复）。
   ========================================================================== */
window.MG = window.MG || {};

MG.aliases = {
  version: 1,
  updated: '2026-09-23',

  intro: '同一个东西的别的叫法，以及常见问法该看哪几个节点。英文名同样可搜。',

  /* ------------------------------------------------------------ 别名 */
  nodes: [
    /* 数理逻辑 */
    { id: 'def.first-order-language', aka: ['一阶逻辑', 'first-order logic', 'FOL', '形式语言'] },
    { id: 'def.formula', aka: ['合式公式', 'well-formed formula', 'wff', '命题'] },
    { id: 'def.substitution', aka: ['替换', 'substitution', '变量替换'] },
    { id: 'def.satisfaction', aka: ['满足', 'satisfaction', '模型', 'semantics', '语义'] },

    /* ZFC 公理系统 */
    { id: 'ax.ext', aka: ['外延', 'extensionality', '集合相等'] },
    { id: 'ax.pair', aka: ['配对', 'pairing', '无序对'] },
    { id: 'ax.union', aka: ['并集公理', 'union', '求和集'] },
    { id: 'ax.inf', aka: ['无穷', 'infinity', '归纳集'] },
    { id: 'ax.found', aka: ['正则', '基础公理', 'foundation', 'regularity', '无循环'] },
    { id: 'thm.noself', aka: ['无自属', '循环集合', '罗素悖论'] },
    { id: 'ax.power', aka: ['幂集公理', 'power set'] },
    { id: 'ax.repl', aka: ['替换', 'replacement', '替换公理'] },
    { id: 'ax.sep', aka: ['分离', '子集公理', 'specification', 'comprehension', 'separation'] },

    /* 集合的构造 */
    { id: 'def.empty', aka: ['空集', 'empty set', 'null set 集合论'] },
    { id: 'def.subset', aka: ['子集', '包含', 'subset', 'inclusion'] },
    { id: 'thm.binunion', aka: ['两个集合的并'] },
    { id: 'def.union-inter', aka: ['并集', '交集', 'union', 'intersection'] },
    { id: 'def.diff-complement', aka: ['差集', '补集', 'difference', 'complement'] },
    { id: 'def.pair', aka: ['有序对', 'ordered pair', 'Kuratowski', '库拉托夫斯基'] },
    { id: 'def.power-set', aka: ['幂集', 'power set'] },
    { id: 'thm.empty', aka: ['空集存在', '空集公理'] },
    { id: 'thm.product', aka: ['笛卡尔积', '卡氏积', 'Cartesian product', '直积'] },

    /* 关系与函数 */
    { id: 'def.rel', aka: ['二元关系', 'binary relation', '关系'] },
    { id: 'def.function', aka: ['映射', 'mapping', 'function', '像与原像'] },
    { id: 'def.quotient-set', aka: ['商集', '等价类', 'quotient', 'equivalence class'] },
    { id: 'def.bijection', aka: ['单射', '满射', '双射', 'injective', 'surjective', 'bijective'] },

    /* 基数与等势 */
    { id: 'def.equinumerous', aka: ['等势', '一样大', '基数相同', 'equipotent', 'same cardinality'] },
    { id: 'thm.schroder-bernstein', aka: ['Cantor–Bernstein', '施罗德-伯恩斯坦', 'Cantor-Bernstein-Schroeder'] },
    { id: 'thm.hartogs', aka: ['Hartogs', '哈托格斯'] },
    { id: 'def.countable', aka: ['可数', 'countable', '可数无穷', '可列'] },
    { id: 'def.cardinal', aka: ['基数', 'cardinality', '势', 'cardinal number'] },
    { id: 'thm.cantor', aka: ['对角线论证', 'diagonal argument', '幂集比原集大'] },
    { id: 'thm.cardinal-comparable', aka: ['基数可比', '三分律'] },

    /* 数系的构造 */
    { id: 'thm.omega', aka: ['自然数', 'natural numbers', 'ℕ'] },
    { id: 'thm.induction', aka: ['数学归纳法', 'induction', '递推定义', 'recursion'] },
    { id: 'def.int', aka: ['整数', 'integers', 'ℤ'] },
    { id: 'def.rat', aka: ['有理数', 'rationals', 'ℚ'] },
    { id: 'def.abs', aka: ['绝对值', 'absolute value'] },
    { id: 'thm.triangle', aka: ['三角不等式', 'triangle inequality'] },
    { id: 'def.cauchy-null', aka: ['Cauchy 列', '柯西列', 'Cauchy sequence', '零列', 'null sequence'] },
    { id: 'def.real', aka: ['实数', 'real numbers', 'ℝ', '实数系', '实数构造'] },
    { id: 'def.complex', aka: ['复数', 'complex numbers', 'ℂ'] },
    { id: 'lem.archimedean', aka: ['阿基米德', 'Archimedean', '阿基米德性质'] },
    { id: 'thm.real-uncountable', aka: ['实数不可数', 'ℝ 不可数'] },
    { id: 'thm.real-unique', aka: ['完备有序域唯一', '实数唯一'] },

    /* 序数与超限 */
    { id: 'def.ordinal', aka: ['序数', 'ordinal', '序数定义'] },
    { id: 'thm.recursion-wellorder', aka: ['超限归纳', '超限递归', 'transfinite recursion', 'transfinite induction'] },
    { id: 'thm.ordinal-trichotomy', aka: ['序数可比', '序数三分'] },
    { id: 'thm.wellorder-ordinal', aka: ['序型', 'order type', '序数表示'] },
    { id: 'thm.burali-forti', aka: ['Burali-Forti', '序数全体是真类', '布拉利-福尔蒂'] },

    /* 序结构 */
    { id: 'def.poset', aka: ['偏序', 'partial order', 'poset', '偏序集'] },
    { id: 'def.chain', aka: ['链', 'chain', '全序', '线序'] },
    { id: 'def.bound', aka: ['上界', '下界', '上确界', '下确界', '确界', 'sup', 'inf', 'least upper bound'] },
    { id: 'def.wellorder', aka: ['良序', '良序集', 'well-order', 'well-ordering'] },
    { id: 'def.order-iso', aka: ['序同构', 'order isomorphism', '保序双射'] },
    { id: 'def.finchar', aka: ['有限特征', 'finite character'] },

    /* 选择原理 */
    { id: 'def.choicefn', aka: ['选择函数', 'choice function', '选取函数'] },
    { id: 'ax.choice', aka: ['选择公理', 'AC', 'axiom of choice', 'Zorn'] },
    { id: 'thm.wellordering', aka: ['良序定理', 'well-ordering theorem', 'Zermelo'] },
    { id: 'lem.zorn', aka: ['佐恩引理', "Zorn's lemma", 'Zorn 引理'] },
    { id: 'thm.hausdorff', aka: ['Hausdorff 极大原理', '极大原理'] },
    { id: 'lem.tukey', aka: ['Tukey 引理', 'Tukey'] },

    /* 代数结构 */
    { id: 'def.field', aka: ['域', 'field', '数域'] },
    { id: 'def.ordered-field', aka: ['有序域', 'ordered field'] },
    { id: 'def.vs', aka: ['线性无关', '张成', '基', 'basis', 'span', 'linearly independent', '向量空间'] },
    { id: 'thm.vsbasis', aka: ['每个向量空间有基', 'Hamel 基', '基的存在性'] },

    /* 拓扑空间 */
    { id: 'def.topology', aka: ['拓扑', '开集', 'topology', 'open set', '拓扑空间'] },
    { id: 'def.closed-set', aka: ['闭集', '闭包', 'closed set', 'closure', '聚点'] },
    { id: 'def.topology-base', aka: ['基', '子基', 'base', 'subbase', '拓扑基'] },
    { id: 'def.continuous-map', aka: ['连续映射', 'continuous map', '连续性'] },
    { id: 'def.homeomorphism', aka: ['同胚', 'homeomorphism', '拓扑等价'] },

    /* 度量空间 */
    { id: 'def.metric-space', aka: ['距离空间', '度量空间', 'metric space', '距离'] },
    { id: 'def.complete', aka: ['完备', 'complete', 'Cauchy 列收敛', '完备性'] },
    { id: 'def.totally-bounded', aka: ['全有界', 'totally bounded', '预紧'] },
    { id: 'def.sequentially-compact', aka: ['列紧', 'sequentially compact'] },
    { id: 'def.compact', aka: ['紧', '紧集', 'compact', '开覆盖'] },
    { id: 'thm.metric-compact-equiv', aka: ['紧的等价刻画', '紧 等价', 'Heine-Borel'] },
    { id: 'prop.compact-subset-closed', aka: ['紧子集是闭的'] },
    { id: 'prop.subset-compact-equiv', aka: ['子集的紧性'] },

    /* 实数与极限 */
    { id: 'def.extended-real', aka: ['扩充实数', 'extended real', '广义实数'] },
    { id: 'def.interval', aka: ['区间', 'interval'] },
    { id: 'def.sequence-limit', aka: ['数列极限', '极限', 'limit', '收敛', 'convergence'] },
    { id: 'thm.real-ordered-field', aka: ['确界原理', '实数完备', '完备性', 'least upper bound property', 'completeness of R'] },
    { id: 'def.series', aka: ['级数', 'series', '级数收敛'] },
    { id: 'def.continuous', aka: ['连续', 'continuous', '连续函数'] },
    { id: 'def.derivative', aka: ['导数', 'derivative', '可导'] },

    /* 集合族与 σ-代数 */
    { id: 'def.set-ring', aka: ['环', '代数', 'ring of sets', 'algebra of sets', '集合环'] },
    { id: 'def.monotone-class', aka: ['单调类', 'monotone class'] },
    { id: 'def.sigma-ring', aka: ['σ-环', 'sigma-ring'] },
    { id: 'def.sigma-algebra', aka: ['σ-代数', 'sigma-algebra', 'sigma-field', 'σ域', '可测空间'] },
    { id: 'thm.ring-monotone-sigma', aka: ['环到σ环', '从环到σ代数'] },
    { id: 'def.generated-sigma', aka: ['生成', '生成的σ代数', 'generated sigma-algebra'] },
    { id: 'thm.monotone-class', aka: ['单调类定理', 'monotone class theorem'] },
    { id: 'def.borel', aka: ['Borel', 'Borel 集', 'Borel σ代数'] },
    { id: 'def.fundamental-class', aka: ['基本类', 'fundamental class'] },
    { id: 'prop.set-class-properties', aka: ['集合族的性质'] },

    /* 测度的构造 */
    { id: 'def.measure', aka: ['测度', 'measure', '可数可加'] },
    { id: 'def.outer-measure', aka: ['外测度', 'outer measure'] },
    { id: 'def.premeasure', aka: ['预测度', 'premeasure'] },
    { id: 'def.finitely-additive', aka: ['有限可加', 'finitely additive'] },
    { id: 'def.measure-space', aka: ['σ-有限', 'sigma-finite', '有限测度', '半有限', '测度空间'] },
    { id: 'prop.measure-basic', aka: ['测度的性质', '测度基本性质'] },
    { id: 'def.null-set', aka: ['零集', 'null set', '零测集'] },
    { id: 'def.caratheodory-measurable', aka: ['Carathéodory 可测', '卡拉泰奥多里可测'] },
    { id: 'def.lebesgue-stieltjes', aka: ['Lebesgue–Stieltjes', 'L-S 测度', '勒贝格-斯蒂尔杰斯'] },
    { id: 'thm.completion', aka: ['完备化', 'completion', '测度完备化'] },
    { id: 'def.semifinite-part', aka: ['半有限部分'] },
    { id: 'prop.outer-measure-induced', aka: ['由预测度诱导外测度'] },
    { id: 'thm.caratheodory', aka: ['Carathéodory 定理', 'Carathéodory 扩张', '卡拉泰奥多里扩张'] },
    { id: 'prop.ls-premeasure', aka: ['F 给出的预测度'] },
    { id: 'def.ae', aka: ['几乎处处', 'a.e.', 'almost everywhere', 'a.e. 收敛'] },
    { id: 'prop.caratheodory-extension', aka: ['预测度还原'] },
    { id: 'thm.caratheodory-uniqueness', aka: ['扩张唯一性'] },
    { id: 'thm.ls-exists', aka: ['分布函数与测度'] },

    /* 可测函数与收敛 */
    { id: 'def.measurable-function', aka: ['可测函数', 'measurable function', '可测'] },
    { id: 'prop.measurable-criterion', aka: ['可测的判定'] },
    { id: 'def.lebesgue-measurable', aka: ['Lebesgue 可测', '勒贝格可测'] },
    { id: 'prop.measurable-product-and-realimag', aka: ['实虚部可测', '积空间可测'] },
    { id: 'def.simple-function', aka: ['简单函数', 'simple function', '示性函数', '特征函数'] },
    { id: 'thm.simple-approximation', aka: ['简单函数逼近', 'approximation by simple functions'] },
    { id: 'cor.continuous-measurable', aka: ['连续可测', '连续推出可测'] },
    { id: 'prop.measurable-closure', aka: ['可测函数封闭', '可测的封闭性'] },
    { id: 'def.cauchy-in-measure', aka: ['依测度 Cauchy', '依测度基本列'] },
    { id: 'prop.complete-measurable', aka: ['完备与可测'] },
    { id: 'prop.completion-measurable-function', aka: ['完备化可改零集'] },
    { id: 'thm.cauchy-in-measure', aka: ['依测度收敛', '依测度 Cauchy 收敛'] },
    { id: 'def.convergence-modes', aka: ['收敛方式', '五种收敛', 'modes of convergence', '几乎处处收敛', '一致收敛'] },
    { id: 'prop.convergence-counterexamples', aka: ['反例', '收敛的反例', '标准反例'] },
    { id: 'prop.L1-implies-measure', aka: ['L1 收敛推出依测度'] },
    { id: 'thm.egorov', aka: ['Egorov', '叶果洛夫', '叶戈罗夫'] },
    { id: 'cor.lusin', aka: ['Lusin', '卢津'] },

    /* 积分 */
    { id: 'def.lplus', aka: ['L+', 'L⁺', '非负可测函数', '非负函数空间'] },
    { id: 'def.integral-simple', aka: ['简单函数的积分', '简单积分'] },
    { id: 'prop.finite-integral-consequences', aka: ['积分有限的后果'] },
    { id: 'prop.simple-integral-props', aka: ['简单积分性质'] },
    { id: 'def.integral-nonneg', aka: ['非负函数的积分', '非负积分'] },
    { id: 'prop.integral-zero-iff', aka: ['积分为零', '积分为零推出几乎处处为零'] },
    { id: 'cor.mct-ae', aka: ['MCT a.e.', '单调收敛 a.e.'] },
    { id: 'thm.mct', aka: ['单调收敛', 'MCT', 'monotone convergence theorem', 'Levi 定理'] },
    { id: 'def.integral-complex', aka: ['复函数的积分', '复积分'] },
    { id: 'thm.termwise-integration', aka: ['逐项积分', 'term-by-term integration', '级数逐项积分'] },
    { id: 'lem.fatou', aka: ['Fatou', "Fatou's lemma", '法图引理', '法都引理'] },
    { id: 'def.integrable', aka: ['可积', 'L1', 'L¹', 'integrable', 'Lebesgue 可积', '勒贝格可积'] },
    { id: 'cor.fatou', aka: ['Fatou 推论'] },
    { id: 'prop.L1-vector-space', aka: ['L1 是向量空间'] },
    { id: 'prop.integral-abs-ineq', aka: ['积分绝对值不等式'] },
    { id: 'prop.L1-support-sigma-finite', aka: ['支撑 σ-有限'] },
    { id: 'prop.integrals-equal-iff', aka: ['两个函数积分处处相同'] },
    { id: 'thm.dct', aka: ['控制收敛', 'DCT', 'dominated convergence', 'Lebesgue 控制收敛定理', '积分与极限交换'] },
    { id: 'thm.termwise-L1', aka: ['L1 逐项积分', 'L1 的级数积分'] },
    { id: 'thm.approximation-L1', aka: ['L1 逼近', 'L1 里的逼近'] },
    { id: 'thm.differentiate-under-integral', aka: ['积分号下求导', '交换极限与积分', 'differentiation under the integral sign', '积分和极限换顺序'] },

    /* 乘积测度与 Fubini */
    { id: 'def.product-sigma', aka: ['积 σ-代数', 'product sigma-algebra', '乘积 σ代数'] },
    { id: 'def.section', aka: ['截口', 'section', '切片'] },
    { id: 'prop.product-sigma-base', aka: ['积 σ代数的生成基'] },
    { id: 'prop.product-sigma-generated', aka: ['可数积的生成'] },
    { id: 'prop.section-measurable', aka: ['截口可测'] },
    { id: 'cor.borel-product', aka: ['可数积的 Borel 代数'] },
    { id: 'def.product-measure', aka: ['乘积测度', 'product measure'] },
    { id: 'thm.product-measure-sections', aka: ['乘积测度由截口给出'] },
    { id: 'prop.product-incomplete', aka: ['乘积测度不完备'] },
    { id: 'thm.fubini-tonelli', aka: ['Fubini', 'Tonelli', '富比尼', '富比尼定理', '交换积分次序', '重积分换序'] },
    { id: 'thm.fubini-complete', aka: ['完备情形的 Fubini'] },

    /* 符号测度与分解 */
    { id: 'def.signed-measure', aka: ['符号测度', 'signed measure'] },
    { id: 'def.positive-negative-null', aka: ['正集', '负集', '零集 符号测度'] },
    { id: 'def.mutually-singular', aka: ['相互奇异', 'mutually singular', '奇异'] },
    { id: 'def.absolute-continuity', aka: ['绝对连续', 'absolutely continuous', '测度绝对连续'] },
    { id: 'def.complex-measure', aka: ['复测度', 'complex measure'] },
    { id: 'prop.positive-set-closure', aka: ['正集封闭'] },
    { id: 'thm.ac-epsilon-delta', aka: ['绝对连续的 ε-δ 刻画', '绝对连续等价刻画'] },
    { id: 'lem.singular-or-lower-bound', aka: ['要么奇异要么有下界'] },
    { id: 'def.rn-derivative', aka: ['Radon–Nikodym 导数', 'RN 导数', '密度', 'Radon-Nikodym derivative'] },
    { id: 'prop.total-variation-basics', aka: ['全变差', 'total variation'] },
    { id: 'thm.hahn-decomposition', aka: ['Hahn 分解', 'Hahn decomposition', '哈恩分解'] },
    { id: 'cor.rn-inverse', aka: ['导数互逆'] },
    { id: 'thm.jordan-decomposition', aka: ['Jordan 分解', 'Jordan decomposition', '若尔当分解'] },
    { id: 'prop.ac-and-variations', aka: ['绝对连续与变差'] },
    { id: 'prop.integral-gives-ac', aka: ['积分给出绝对连续'] },
    { id: 'thm.rn-complex', aka: ['复测度的 RN 定理'] },
    { id: 'cor.ac-integral-continuity', aka: ['积分的绝对连续性'] },
    { id: 'thm.lebesgue-radon-nikodym', aka: ['Radon–Nikodym', 'RN 定理', '拉东-尼科迪姆', 'Radon-Nikodym theorem'] },
    { id: 'prop.rn-chain-rule', aka: ['链式法则', 'RN 链式法则'] },

    /* 微分定理 */
    { id: 'lem.covering', aka: ['覆盖引理', 'covering lemma', 'Vitali 覆盖'] },
    { id: 'def.shrinks-nicely', aka: ['可缩族', 'shrinking', '缩族'] },
    { id: 'def.regular-measure', aka: ['正则测度', 'regular measure', '正则 Borel 测度'] },
    { id: 'prop.L1-signed', aka: ['L1 与全变差'] },
    { id: 'def.locally-integrable', aka: ['局部可积', 'locally integrable'] },
    { id: 'def.average-operator', aka: ['平均算子', 'average operator'] },
    { id: 'lem.average-continuous', aka: ['平均算子连续'] },
    { id: 'def.maximal-function', aka: ['极大函数', 'maximal function', 'Hardy–Littlewood 极大函数'] },
    { id: 'def.lebesgue-set', aka: ['Lebesgue 集', 'Lebesgue point', '勒贝格点'] },
    { id: 'thm.maximal-theorem', aka: ['极大定理', 'maximal theorem', 'Hardy–Littlewood 极大不等式'] },
    { id: 'thm.lebesgue-differentiation', aka: ['Lebesgue 微分定理', 'differentiation theorem', '勒贝格微分定理'] },
    { id: 'thm.lebesgue-set-full', aka: ['Lebesgue 集几乎处处'] },
    { id: 'thm.differentiation-general', aka: ['可缩族的微分定理'] },
    { id: 'thm.rn-pointwise', aka: ['RN 导数的点态公式'] },

    /* 有界变差与绝对连续 */
    { id: 'def.ac-function', aka: ['绝对连续函数', 'absolutely continuous function', 'AC 函数'] },
    { id: 'def.bounded-variation', aka: ['有界变差', 'bounded variation', 'BV', '变差'] },
    { id: 'thm.monotone-differentiable', aka: ['单调函数可导', '单调函数几乎处处可导'] },
    { id: 'prop.bv-examples', aka: ['BV 的例子'] },
    { id: 'lem.variation-monotone', aka: ['T_F ± F 递增'] },
    { id: 'def.nbv', aka: ['NBV', '规范有界变差'] },
    { id: 'lem.ac-subset-bv', aka: ['AC 包含于 BV'] },
    { id: 'thm.bv-jordan', aka: ['BV 的 Jordan 分解'] },
    { id: 'lem.nbv-variation', aka: ['全变差的 NBV 性质'] },
    { id: 'prop.monotone-integral-derivative', aka: ['递增函数的导数积分不等式'] },
    { id: 'prop.bv-regularity', aka: ['BV 函数的正则性'] },
    { id: 'thm.borel-measure-nbv', aka: ['测度与 NBV 一一对应'] },
    { id: 'prop.nbv-derivative', aka: ['NBV 的导数与测度'] },
    { id: 'cor.integral-is-ac-nbv', aka: ['积出来的函数是 AC'] },
    { id: 'prop.ac-iff-measure-ac', aka: ['函数绝对连续等价于测度绝对连续'] },
    { id: 'thm.ftc-lebesgue', aka: ['微积分基本定理', 'FTC', 'fundamental theorem of calculus', 'Newton-Leibniz', '牛顿-莱布尼茨'] },

    /* L^p 空间 */
    { id: 'def.conjugate-exponents', aka: ['共轭指数', 'conjugate exponents', '对偶指数'] },
    { id: 'lem.young-inequality', aka: ['Young 不等式', 'Young'] },
    { id: 'def.essential-sup', aka: ['本性上界', 'essential supremum', 'L-infinity', 'L∞ 范数'] },
    { id: 'def.lp-norm', aka: ['Lp 范数', 'Lp norm', 'L^p 空间'] },
    { id: 'thm.holder', aka: ['Hölder', 'Holder 不等式', '赫尔德不等式'] },
    { id: 'prop.dense-simple-compact-support', aka: ['稠密', 'dense', '简单函数稠密'] },
    { id: 'prop.lq-in-lp-plus-lr', aka: ['Lq 落在 Lp 加 Lr'] },
    { id: 'prop.lp-inter-lr-in-lq', aka: ['Lp 交 Lr 包含于 Lq'] },
    { id: 'prop.ell-p-inclusion', aka: ['小 l p 空间', '序列空间包含', 'ℓp'] },
    { id: 'prop.lp-inclusion-finite', aka: ['有限测度时的包含方向'] },
    { id: 'def.duality-map', aka: ['对偶配对', 'dual pairing', '对偶'] },
    { id: 'cor.lp-reflexive', aka: ['自反', 'reflexive', 'Lp 自反'] },
    { id: 'thm.minkowski', aka: ['Minkowski', '闵可夫斯基不等式'] },
    { id: 'thm.linf-properties', aka: ['L∞ 的性质', 'Linfinity 性质'] },
    { id: 'prop.duality-isometry', aka: ['等距', 'isometry', '范数相等'] },
    { id: 'prop.bounded-functional-gives-lq', aka: ['有界泛函给出 Lq'] },
    { id: 'thm.lp-banach', aka: ['Banach', '巴拿赫空间', 'Lp 完备'] },
    { id: 'thm.riesz-representation-lp', aka: ['Riesz 表示', '对偶空间', 'dual space', '(Lp)* = Lq'] },
  ],

  /* --------------------------------------------------------- 问题钩子 */
  /* `q` 是**问法**（写成一句人话或一个说法都行），`to` 是该看的节点。 */
  hooks: [
    /* — 积分与极限 — */
    { q: '什么时候积分和极限能换顺序', to: ['thm.mct', 'lem.fatou', 'thm.dct', 'thm.fubini-tonelli'] },
    { q: '积分和极限交换的条件', to: ['thm.dct', 'thm.mct', 'lem.fatou'] },
    { q: '控制收敛要什么条件', to: ['thm.dct', 'def.integrable', 'def.lplus'] },
    { q: '能不能逐项积分', to: ['thm.termwise-integration', 'thm.termwise-L1', 'thm.mct'] },
    { q: '积分和求和换顺序', to: ['thm.termwise-integration', 'thm.termwise-L1'] },
    { q: '什么时候能在积分号下求导', to: ['thm.differentiate-under-integral', 'thm.dct'] },
    { q: '重积分能不能交换次序', to: ['thm.fubini-tonelli', 'def.product-measure', 'thm.fubini-complete'] },
    { q: 'Fubini 定理需要什么条件', to: ['thm.fubini-tonelli', 'def.product-measure'] },
    { q: '积分为零是什么意思', to: ['prop.integral-zero-iff', 'def.ae', 'def.null-set'] },

    /* — 收敛 — */
    { q: '有哪几种收敛', to: ['def.convergence-modes', 'prop.convergence-counterexamples'] },
    { q: '几乎处处收敛和依测度收敛有什么关系', to: ['def.convergence-modes', 'prop.convergence-counterexamples', 'thm.egorov'] },
    { q: '收敛和一致收敛差在哪', to: ['def.convergence-modes', 'thm.egorov', 'cor.lusin'] },
    { q: 'Egorov 定理说的是什么', to: ['thm.egorov', 'def.convergence-modes'] },

    /* — 测度与构造 — */
    { q: '怎么从一个外测度造出测度', to: ['def.outer-measure', 'thm.caratheodory', 'def.caratheodory-measurable'] },
    { q: 'Lebesgue 测度是怎么造出来的', to: ['def.lebesgue-stieltjes', 'thm.ls-exists', 'thm.caratheodory'] },
    { q: 'σ-代数是怎么生成的', to: ['def.generated-sigma', 'def.borel', 'def.sigma-algebra'] },
    { q: '为什么要完备化', to: ['thm.completion', 'def.null-set', 'prop.complete-measurable'] },
    { q: '零测集是什么', to: ['def.null-set', 'def.ae'] },

    /* — 可测函数 — */
    { q: '怎么判断一个函数可测', to: ['def.measurable-function', 'prop.measurable-criterion'] },
    { q: '可测函数长什么样', to: ['def.measurable-function', 'thm.simple-approximation', 'def.simple-function'] },
    { q: '简单函数是什么', to: ['def.simple-function', 'def.integral-simple'] },
    { q: '连续函数一定可测吗', to: ['cor.continuous-measurable', 'def.measurable-function'] },

    /* — 符号测度与 Radon–Nikodym — */
    { q: '一个测度相对于另一个测度的密度', to: ['def.rn-derivative', 'thm.lebesgue-radon-nikodym'] },
    { q: '什么时候一个测度有密度', to: ['thm.lebesgue-radon-nikodym', 'def.absolute-continuity', 'def.rn-derivative'] },
    { q: '符号测度怎么拆成两个正测度', to: ['thm.hahn-decomposition', 'thm.jordan-decomposition', 'def.signed-measure'] },
    { q: '绝对连续和奇异是什么意思', to: ['def.absolute-continuity', 'def.mutually-singular', 'thm.lebesgue-radon-nikodym'] },

    /* — 微分 — */
    { q: '什么样的函数几乎处处可导', to: ['thm.monotone-differentiable', 'def.bounded-variation', 'thm.lebesgue-differentiation'] },
    { q: '微积分基本定理什么时候成立', to: ['thm.ftc-lebesgue', 'def.ac-function', 'thm.bv-jordan'] },
    { q: '极大函数是什么', to: ['def.maximal-function', 'thm.maximal-theorem'] },
    { q: 'Lebesgue 微分定理说的是什么', to: ['thm.lebesgue-differentiation', 'def.lebesgue-set', 'def.average-operator'] },
    { q: '有界变差函数有什么性质', to: ['def.bounded-variation', 'thm.bv-jordan', 'prop.bv-regularity'] },

    /* — L^p — */
    { q: 'Lp 空间是不是完备的', to: ['thm.lp-banach', 'def.lp-norm'] },
    { q: 'Lp 的对偶空间是什么', to: ['thm.riesz-representation-lp', 'def.conjugate-exponents', 'def.duality-map'] },
    { q: 'Hölder 不等式怎么用', to: ['thm.holder', 'def.conjugate-exponents', 'lem.young-inequality'] },
    { q: 'Lp 之间能不能互相包含', to: ['prop.lp-inclusion-finite', 'prop.lp-inter-lr-in-lq', 'prop.lq-in-lp-plus-lr'] },

    /* — 集合论与基数 — */
    { q: '两个集合什么时候一样大', to: ['def.equinumerous', 'def.cardinal', 'thm.schroder-bernstein'] },
    { q: '怎么比较两个无穷的大小', to: ['def.cardinal', 'def.equinumerous', 'thm.cantor'] },
    { q: '实数为什么比自然数多', to: ['thm.cantor', 'thm.real-uncountable', 'def.countable'] },
    { q: '不用选择公理能不能比较基数', to: ['thm.cardinal-comparable', 'ax.choice'] },
    { q: '实数是怎么造出来的', to: ['def.cauchy-null', 'def.real', 'thm.real-ordered-field'] },
    { q: '为什么实数有确界原理', to: ['thm.real-ordered-field', 'def.cauchy-null', 'def.bound'] },
    { q: '实数系为什么是完备的', to: ['thm.real-ordered-field', 'def.cauchy-null', 'lem.archimedean'] },
    { q: '自然数是怎么造出来的', to: ['thm.omega', 'ax.inf', 'thm.induction'] },
    { q: '整数和有理数怎么来', to: ['def.int', 'def.rat', 'def.quotient-set'] },

    /* — 序与选择 — */
    { q: '选择公理等价于什么', to: ['ax.choice', 'thm.wellordering', 'lem.zorn', 'thm.hausdorff', 'lem.tukey'] },
    { q: '怎么用佐恩引理', to: ['lem.zorn', 'def.chain', 'def.bound', 'def.finchar'] },
    { q: '上确界是什么', to: ['def.bound', 'thm.real-ordered-field'] },
    { q: '什么是序数', to: ['def.ordinal', 'thm.recursion-wellorder', 'thm.ordinal-trichotomy'] },
    { q: '超限归纳怎么做', to: ['thm.recursion-wellorder', 'def.ordinal', 'def.wellorder'] },

    /* — 拓扑 — */
    { q: '紧集是什么', to: ['def.compact', 'thm.metric-compact-equiv', 'def.sequentially-compact'] },
    { q: '紧和列紧等价吗', to: ['thm.metric-compact-equiv', 'def.sequentially-compact', 'def.compact'] },
    { q: '完备是什么意思', to: ['def.complete', 'def.metric-space'] },
    { q: '两个空间什么时候算同一个', to: ['def.homeomorphism', 'def.order-iso', 'def.bijection'] },
    { q: '连续映射怎么定义', to: ['def.continuous-map', 'def.topology', 'def.closed-set'] },

    /* — 结构 — */
    { q: '向量空间为什么一定有基', to: ['thm.vsbasis', 'def.vs', 'lem.zorn'] },
    { q: '域和有序域是什么', to: ['def.field', 'def.ordered-field'] },
  ],
};
