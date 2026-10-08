# 切片范畴　`def.slice-category`
预层的切片范畴（Category of Elements）
layer 12 · 定义 · 预层与米田 · 范畴论

设 $T \in \widehat{\mathcal{C}}$。$T$ 的**切片范畴** $\mathcal{C}_{T}$ 以

$$\bigl\{(X, s) : X \in \mathcal{C},\ s \in T(X)\bigr\}$$
> 陈述续见 `nodes/def.slice-category.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.elements-category` 元素范畴：用到了定义 元素范畴　proofs/def-dep.el-slice.md
- `def.presheaf` 预层：用到了定义 预层　proofs/def-dep.presheaf-slice.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.density` 稠密性定理
- 被 `thm.density` 稠密性定理 用
- 被 `thm.density` 稠密性定理 用

## 说明
这正是把「元素范畴」搬到预层上：$T(X)$ 的元素当元素看，遗忘函子 $\mathcal{C}_{T} \to \mathcal{C}$ 把 $(X, s)$ 送回 $X$。

它的用处是给预层配一个**指标范畴**：谈「这个预层由哪些点拼起来」时，指标就跑在 $\mathcal{C}_{T}$ 上。
