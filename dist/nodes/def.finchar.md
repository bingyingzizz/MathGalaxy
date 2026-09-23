# 有限特征　`def.finchar`
有限特征族（Family of Finite Character）
layer 7 · 定义 · 序结构 · 序理论

集合族 $\mathcal{A}$ 具有**有限特征**，当且仅当对任意集合 $X$：

$$X \in \mathcal{A} \iff X\text{ 的每个有限子集都属于} \mathcal{A}$$

也就是说：「局部地看起来像 $\mathcal{A}$ 的成员」$\implies$「整体就是 $\mathcal{A}$ 的成员」。

## 为什么成立（入边，证明在 proofs/）
- `def.subset` 子集：用到了定义 子集　proofs/def-link.finchar-subset.md
- `def.poset` 偏序集：用到了定义 偏序集　proofs/def-link.finchar-poset.md
- `def.chain` 链：用到了定义 链　proofs/def-link.finchar-chain.md
- `def.wellorder` 良序集：两种「用有限/最小的东西控制无穷」的手法　proofs/ana.tame-infinite.md
- `ax.sep` 分离公理模式：「不描述整体，只给一个筛子」　proofs/ana.filter-sieve.md
- `def.vs` 向量空间的基：「有限特征」这个抽象概念，在向量空间里有一个现成的实例　proofs/ana.maximal-apparatus.md
- …另有 1 条入边

refs: Jech, The Axiom of Choice, Ch. 2

> 说明见 `notes/def.finchar.md`
