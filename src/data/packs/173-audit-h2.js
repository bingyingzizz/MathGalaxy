/* ============================================================================
   内容包 · H2 门抓到的东西（2026-11-03）：给 `prop.open-immersion-shriek` 补前提
   ----------------------------------------------------------------------------
   背景：审计 H2 判据说「用更强工具回头证 ⇒ 标 layer:false」。`imp.open-immersion-shriek`
   （$f_!$ 存在 + Za 定理 ⟹ $j_!$ 存在）正是这种回头证，改粉之后环消了 —— 但那个节点
   原来**只有这一条入边**，于是层号掉到 **L0**（和公理一层），这显然不对：
   「开浸入的 $j_!$ 存在」明明要用固态理论那块东西。

   补两条 definition 边（都是陈述里真用到的）：
     · `def.submersion-immersion` —— 开浸入首先是浸入；
     · `def.six-functors` —— 这条命题的舞台就是六函子形式（$j_!$ 是其中一个）。
   ⛔ 不改任何正文，只补前提。
   ========================================================================== */
(window.MG.packs = window.MG.packs || []).push({
  name: 'H2 补前提：开浸入的 j_! 站在什么上面',

  nodes: [],

  edges: [
    {
      id: 'dep.immersion-openshriek',
      kind: 'definition',
      definition: 'def.submersion-immersion',
      usedBy: 'prop.open-immersion-shriek',
      note: '开浸入是**浸入**的特例（$U \\subseteq V$ 开，包含映射），所以「开浸入」这个概念先要有。',
    },
    {
      id: 'dep.sixfunctors-openshriek',
      kind: 'definition',
      definition: 'def.six-functors',
      usedBy: 'prop.open-immersion-shriek',
      note: '这条命题要证的就是六函子里的反常推前 $j_{!}$ 存在 —— 没有「六函子」这层框架，' +
        '它连「要造什么」都说不出来。',
    },
  ],
});
