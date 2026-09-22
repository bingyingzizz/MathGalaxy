/* ==========================================================================
   内容包 · 主干（学习主线）
   --------------------------------------------------------------------------
   这张星图有 182 个节点，初学者打开会不知道从哪儿看起。
   这里挑出一条**主线**：从最底层的 ZFC / 集合，一路到测度、积分、L^p、RN 定理。
   主干上的点必须满足「不看它就接不上后面」——它要么是某个概念的入口，
   要么是整条线绕不过去的那一步。

   用法：图例上方的工具条点「主干」→ 只留这些点，其余全藏起来。

   ⚠️ 加节点/改内容时记得回来看看：新节点要不要进主干、走掉的 id 要删掉。
      结构上它只影响显示，不影响任何数学内容。
   ========================================================================== */
window.MG = window.MG || {};

MG.trunk = [

  /* ------------------------------------------------ 一、集合与序（地基） */
  'def.real',                  // 实数系 ℝ —— 分析学的出发点
  'def.interval',              // 区间
  'def.sup',                   // 上确界与下确界
  'def.sequence-limit',        // 数列极限
  'ax.ext',                    // 外延公理：集合相等靠什么
  'def.subset',                // 子集
  'def.empty',                 // 空集
  'thm.empty',                 // 空集存在
  'def.pair',                  // 有序对
  'def.rel',                   // 关系
  'def.function',              // 函数
  'ax.choice',                 // 选择公理
  'def.poset',                 // 偏序集
  'def.chain',                 // 链
  'def.bound',                 // 上界与极大元
  'lem.zorn',                  // 佐恩引理

  /* -------------------------------------------- 二、测度（分析的地基） */
  'def.set-ring',              // 环与代数
  'def.sigma-algebra',         // σ-代数
  'def.generated-sigma',       // 生成的 σ-代数
  'def.borel',                 // Borel σ-代数
  'def.measure',               // 测度
  'def.null-set',              // 零集与完备
  'def.ae',                    // 几乎处处
  'def.outer-measure',         // 外测度
  'thm.caratheodory',          // Carathéodory 定理

  /* ------------------------------------------------------ 三、积分 */
  'def.measurable-function',   // 可测函数
  'def.simple-function',       // 简单函数
  'def.integral-simple',       // 简单函数的积分
  'def.integral-nonneg',       // 非负函数的积分
  'thm.mct',                   // 单调收敛定理
  'lem.fatou',                 // Fatou 引理
  'thm.dct',                   // 控制收敛定理
  'def.integrable',            // 可积 / L¹
  'thm.fubini-tonelli',        // Fubini–Tonelli

  /* ------------------------------------------ 四、函数空间与微分 */
  'def.lp-norm',               // L^p 范数
  'thm.holder',                // Hölder 不等式
  'thm.lp-banach',             // L^p 是 Banach 空间
  'thm.riesz-representation-lp', // (L^p)* ≅ L^q
  'def.locally-integrable',    // 局部可积
  'def.maximal-function',      // 极大函数
  'thm.lebesgue-differentiation', // Lebesgue 微分定理
  'def.bounded-variation',     // 有界变差 BV
  'def.ac-function',           // 绝对连续函数
  'def.derivative',            // 导数
  'thm.ftc-lebesgue',          // 微积分基本定理（Lebesgue 版）
  'thm.lebesgue-radon-nikodym' // Lebesgue–Radon–Nikodym 定理
];
