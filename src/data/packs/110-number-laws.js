/* ==========================================================================
   内容包 · 数系的运算律（把 ℕ → ℤ → ℚ 的「验证」补上）
   --------------------------------------------------------------------------
   原来 `def.nat-arith` 的注记写「性质靠归纳原理验证 —— 同理」，
   `def.int` 写「都要先验证与代表元无关」，`def.rat` 写「于是 ℚ 是一个有序域」——
   三句都没有下文。这一包把三处补成定理：

     thm.nat-arith-laws   ℕ：交换、结合、分配、消去
     thm.int-ring         ℤ：含幺交换整环，序与运算相容
     thm.rat-ordered-field ℚ：有序域

   ⭐ 这就是那条内容准则「每层由上一层**构造**」的执行：造完不算完，还要验证
     上一层缺的那些公理在这一层真的成立了。ℝ 那一层已有 `thm.real-ordered-field`。
   ========================================================================== */
window.MG = window.MG || {};
(window.MG.packs = window.MG.packs || []).push({

  name: '数系的运算律',
  nodes: [

    {
      id: 'thm.nat-arith-laws',
      cluster: 'set.numbers',
      type: 'theorem',
      label: '自然数的运算律',
      title: '定理：$\\mathbb{N}$ 上加法与乘法的运算律（Laws of Arithmetic on $\\mathbb{N}$）',
      regions: ['set-theory'],
      tags: ['定理', '自然数', '归纳', '运算'],
      refs: ['Kunen, Set Theory, Ch. I', 'Enderton, Elements of Set Theory, Ch. 4'],
      statement: [
        '在 $\\mathbb{N} = \\omega$ 上取 `def.nat-arith` 定义的加法与乘法。则对一切 $m, n, k \\in \\mathbb{N}$：',
        '',
        '$$0 + n = n, \\qquad S(m) + n = S(m + n),$$',
        '',
        '$$m + n = n + m, \\qquad (m + n) + k = m + (n + k),$$',
        '',
        '$$m \\cdot 0 = 0, \\qquad m \\cdot n = n \\cdot m, \\qquad (m n) k = m (n k), \\qquad m(n + k) = m n + m k,$$',
        '',
        '以及**消去律**',
        '',
        '$$m + k = n + k \\implies m = n.$$'
      ].join('\n'),
      notes: '⭐ 这些**不是**定义的一部分：`def.nat-arith` 只递归地规定了 $m+0$ 与 $m+S(n)$，交换律、结合律、分配律全都要另外证。\n\n⭐ 顺序有讲究，不能乱：先证两条辅助等式 $0+n=n$ 与 $S(m)+n=S(m+n)$（都对 $n$ 归纳），再做加法交换律（对 $n$ 归纳，归纳步正好用这两条），然后结合律、乘法交换、分配律。后面的每一步都踩在前一步上。\n\n⭐ 有了这些，$\\mathbb{N}$ 才是一个「半环」（没有加法逆元）；$\\mathbb{Z}$ 的构造（`def.int`）正是为了补上那个逆元。'
    },
    {
      id: 'thm.int-ring',
      cluster: 'set.numbers',
      type: 'theorem',
      label: 'ℤ 是交换整环',
      title: '定理：$\\mathbb{Z}$ 是含幺交换整环，且序与运算相容',
      regions: ['set-theory'],
      tags: ['定理', '整数', '环'],
      refs: ['Kunen, Set Theory, Ch. I', 'Enderton, Elements of Set Theory, Ch. 4'],
      statement: [
        '在 $\\mathbb{Z} = (\\mathbb{N} \\times \\mathbb{N})/{\\sim}$ 上取 `def.int` 定义的运算与序。则：',
        '',
        '**(i)** 两个运算**良定义**（与代表元的选取无关）；',
        '',
        '**(ii)** $(\\mathbb{Z}, +, \\cdot)$ 是**含幺交换环**；',
        '',
        '**(iii)** $\\mathbb{Z}$ **无零因子**（是整环）：$xy = 0 \\implies x = 0$ 或 $y = 0$；',
        '',
        '**(iv)** $\\le$ 是全序，且与运算相容：$x \\le y \\implies x + z \\le y + z$，$x \\le y,\\ 0 \\le z \\implies xz \\le yz$；',
        '',
        '**(v)** $n \\mapsto [n, 0]$ 是 $\\mathbb{N}$ 到 $\\mathbb{Z}$ 的**单射**，保持加法、乘法与序。'
      ].join('\n'),
      notes: [
        '⭐ 每一项都是「搬到代表元上，用 $\\mathbb{N}$ 的运算律」。$\\mathbb{N}$ 里没有减法，所以 $\\mathbb{Z}$ 的加法写成 $[a,b] + [c,d] = [a+c, b+d]$ —— 代表元里的 $+$ 就是 `thm.nat-arith-laws` 的那个 $+$。',
        '',
        '⭐ **无零因子**是最有意思的一条：设 $x = [a,b]$、$y = [c,d]$ 都为正，即 $a > b$、$c > d$，写 $a = b + p$、$c = d + q$（$p, q \\ge 1$）。则 $xy = [ac + bd,\\ ad + bc]$，而',
        '',
        '$$(ac + bd) - (ad + bc) = pq > 0,$$',
        '',
        '故 $xy > 0$，不可能为 $0$。符号相反时乘积为负，同理。',
        '',
        '⚠ 这一步做完，`def.rat` 里「于是 $\\mathbb{Q}$ 是一个有序域」才有依据 —— 有理数的分母取自 $\\mathbb{Z} \\setminus \\{0\\}$，而「$0$ 不能作分母」的前提正是「整环里 $bd = 0$ 只有平凡解」。'
      ].join('\n')
    },
    {
      id: 'thm.rat-ordered-field',
      cluster: 'set.numbers',
      type: 'theorem',
      label: 'ℚ 是有序域',
      title: '定理：$\\mathbb{Q}$ 是有序域（$\\mathbb{Q}$ is an Ordered Field）',
      regions: ['set-theory'],
      tags: ['定理', '有理数', '域', '序'],
      refs: ['Kunen, Set Theory, Ch. I', 'Enderton, Elements of Set Theory, Ch. 4'],
      statement: [
        '在 $\\mathbb{Q} = (\\mathbb{Z} \\times (\\mathbb{Z}\\setminus\\{0\\}))/{\\sim}$ 上取 `def.rat` 定义的运算与序。则 $(\\mathbb{Q}, +, \\cdot, \\le)$ 是**有序域**：',
        '',
        '- $(\\mathbb{Q}, +, \\cdot)$ 是域（每个非零元有乘法逆元）；',
        '',
        '- $\\le$ 是全序，且 $a \\le b \\implies a + c \\le b + c$、$a \\le b,\\ 0 \\le c \\implies ac \\le bc$；',
        '',
        '- $n \\mapsto n/1$ 把 $\\mathbb{Z}$ 嵌入 $\\mathbb{Q}$，保持运算与序。'
      ].join('\n'),
      notes: '⭐ 证明的骨架：**良定义**（$a/b = a\'/b\'$ 时两种算法结果相同）用 $\\mathbb{Z}$ 的整环消去律；**域公理**逐条搬到代表元上（$\\mathbb{Z}$ 是交换环，`thm.int-ring`）；**逆元**是 $(a/b)^{-1} = b/a$（$a \\ne 0$，交换性使 $a b = b a \\ne 0$ 自动成立，这里用到无零因子）；**序**在 $b, d > 0$ 的表示下就是 $ad \\le bc$，换代表元时两边同乘正元 $b\'d\'$ 不改变不等号。\n\n⭐ 到这一步「四则运算齐全 + 有序」全部落实，但**不完备**：$\\{q \\in \\mathbb{Q} : q^{2} < 2\\}$ 有上界却没有上确界。这不是缺陷，正是 `def.real` 要把它补成 $\\mathbb{R}$ 的理由。'
    }
  ],

  edges: [

    {
      id: 'imp.nat-arith-laws',
      kind: 'implication',
      sources: ['def.nat-arith', 'thm.induction'],
      target: 'thm.nat-arith-laws',
      title: '递推定义 + 归纳原理 $\\implies$ 运算律',
      proof: [
        '全部对某个变量归纳，用 `def.nat-arith` 的两条递推式。',
        '',
        '**① $0 + n = n$**（对 $n$ 归纳）：$n = 0$ 时 $0 + 0 = 0$；设 $0 + n = n$，则 $0 + S(n) = S(0 + n) = S(n)$。',
        '',
        '**② $S(m) + n = S(m + n)$**（对 $n$ 归纳）：$n = 0$ 时两边都是 $S(m)$；归纳步 $S(m) + S(n) = S(S(m) + n) = S(S(m+n)) = S(m + S(n))$。',
        '',
        '**③ 交换律 $m + n = n + m$**（对 $n$ 归纳）：$n = 0$ 时是 ①。归纳步：',
        '',
        '$$m + S(n) = S(m + n) = S(n + m) = n + S(m) = S(n) + m,$$',
        '',
        '最后一个等号用 ②（把 $m$ 与 $n$ 换位后再用一次）。',
        '',
        '**④ 结合律**：对 $k$ 归纳，归纳步直接由 $S$ 的定义。**⑤ 乘法**：先证 $0 \\cdot n = 0$ 与 $S(m)\\cdot n = m\\cdot n + n$（都对 $n$ 归纳，用 ③④），再对 $n$ 归纳得乘法交换律；结合律与分配律同样对 $k$ 归纳（分配律的归纳步是 $m(n + S(k)) = m S(n+k) = m(n+k) + m$）。',
        '',
        '**⑥ 消去律**（对 $k$ 归纳）：$k = 0$ 平凡；若 $m + S(k) = n + S(k)$，则 $S(m+k) = S(n+k)$，由 $S$ 的单射得 $m + k = n + k$，再用归纳假设。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.int-ring',
      kind: 'implication',
      sources: ['def.int', 'thm.nat-arith-laws'],
      target: 'thm.int-ring',
      title: '商构造 + $\\mathbb{N}$ 的运算律 $\\implies$ $\\mathbb{Z}$ 是整环',
      proof: [
        '**良定义。** 若 $[a,b] = [a\',b\']$、$[c,d] = [c\',d\']$（即 $a + b\' = a\' + b$、$c + d\' = c\' + d$），则把两式相加并重排得 $(a+c) + (b\'+d\') = (a\'+c\') + (b+d)$，即加法良定义。乘法要长一点：由 $a + b\' = a\' + b$ 两边乘 $c + d\'$、$c + d\' = c\' + d$ 两边乘 $a\' + b$，再比较两个展开式，用 $\\mathbb{N}$ 的分配律与消去律得 $ac + bd + a\'d\' + b\'c\' = a\'c\' + b\'d\' + ad + bc$，即 $[ac+bd,\\ ad+bc] = [a\'c\'+b\'d\',\\ a\'d\'+b\'c\']$。',
        '',
        '**环公理。** 逐条搬到代表元：结合、交换、分配都变成 $\\mathbb{N}$ 的对应等式（`thm.nat-arith-laws`）。零元是 $[0,0]$，幺元是 $[1,0]$，加法逆元是 $-[a,b] = [b,a]$（因 $[a,b] + [b,a] = [a+b,\\ a+b] = 0$）。',
        '',
        '**序。** $[a,b] \\le [c,d] :\\iff a + d \\le b + c$ 与代表元无关（同上，两边加同一个量）；全序由 $\\mathbb{N}$ 的全序（三分）得到；相容性逐项验证。',
        '',
        '**无零因子。** 见节点说明里的 $p q > 0$ 论证：两个正元的积为正，故 $xy = 0$ 迫使某个因子为 $0$。',
        '',
        '**嵌入。** $n \\mapsto [n,0]$ 显然单射，且 $[m,0] + [n,0] = [m+n,0]$、$[m,0][n,0] = [mn,0]$、$[m,0] \\le [n,0] \\iff m \\le n$。$\\blacksquare$'
      ].join('\n')
    },
    {
      id: 'imp.rat-ordered-field',
      kind: 'implication',
      sources: ['def.rat', 'thm.int-ring'],
      target: 'thm.rat-ordered-field',
      title: '商构造 + $\\mathbb{Z}$ 是整环 $\\implies$ $\\mathbb{Q}$ 是有序域',
      proof: [
        '**良定义。** 设 $a/b = a\'/b\'$、$c/d = c\'/d\'$（即 $ab\' = a\'b$、$cd\' = c\'d$，且分母非零）。加法：要证 $(ad + bc)(b\'d\') = (a\'d\' + b\'c\')(bd)$，把 $ab\' = a\'b$ 乘 $dd\'$、$cd\' = c\'d$ 乘 $bb\'$，相加即得。乘法同理（用 $ac b\'d\' = a\'c\' bd$）。',
        '',
        '**域公理。** 全部搬到代表元上，就是 $\\mathbb{Z}$ 的环公理（`thm.int-ring`）；加法逆元 $-a/b = (-a)/b$。',
        '',
        '**乘法逆元。** $a/b \\ne 0$ 即 $a \\ne 0$，此时 $(a/b)(b/a) = ab/ba = 1$（交换性用上了；$b a \\ne 0$ 用到 $\\mathbb{Z}$ 无零因子）。',
        '',
        '**序。** 把每个元素写成 $b > 0$ 的 $a/b$（分母取相反数即可）。定义 $a/b \\le c/d :\\iff ad \\le bc$。良定义：换代表元时两边同乘正元 $b\'d\' > 0$，由 `thm.int-ring` 的序相容性不等号不变。全序与两条相容性逐项验证（加法直接；乘法用 $bd > 0$ 时同乘正数保序）。',
        '',
        '**嵌入。** $n \\mapsto n/1$，保持运算与序。$\\blacksquare$'
      ].join('\n')
    }
  ]
});
