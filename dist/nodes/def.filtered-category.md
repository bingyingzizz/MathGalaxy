# 滤过范畴　`def.filtered-category`
滤过范畴与滤过余极限（Filtered Category）
layer 10 · 定义 · 图与极限 · 范畴论

范畴 $I$ 叫**滤过的**（filtered），如果：

1. **非空**：$I$ 至少有一个对象；
2. **上界**：对任意 $i, j \in I$，存在 $k \in I$ 与态射 $i \to k$、$j \to k$；
3. **余等化**：对任意平行的 $u, v : i \rightrightarrows j$，存在 $w : j \to k$ 使 $w \circ u = w \circ v$。
> 陈述续见 `nodes/def.filtered-category.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.category` 范畴：用到了定义 范畴　proofs/def-dep.filtered-category.md
- `def.commutative-diagram` 图与交换图：用到了定义 图与交换图　proofs/def-dep.filtered-diagram.md

## 它能推出什么 / 谁在用它
- 被 `prop.filtered-directed` 滤过范畴可换成有向集 用
- 被 `def.ind-object` Ind-对象 用
- 被 `def.finitely-presented` 有限表现对象 用
- 被 `prop.ab6` AB6：滤过余极限与积交换 用

- …另有出边，续页见 `nodes/def.filtered-category.3.md`

refs: Le Stum, An introduction to condensed mathematics, §1.3

> 说明见 `notes/def.filtered-category.md`
