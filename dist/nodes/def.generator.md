# 生成元集　`def.generator`
生成元集与生成元（Generators）
layer 10 · 定义 · 拓扑斯 · 范畴论

范畴 $\mathcal{C}$ 的一个集合 $S \subseteq \mathcal{C}$ 叫**生成元集**，如果函子

$$\prod_{a \in S} h_{a} : \mathcal{C} \longrightarrow \mathbf{Set}^{S}, \qquad X \mapsto \bigl(\operatorname{Hom}_{\mathcal{C}}(a, X)\bigr)_{a \in S}$$
> 陈述续见 `nodes/def.generator.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.ff-faithful` 忠实 / 满 / 全忠实：用到了定义 忠实 / 满 / 全忠实　proofs/def-dep.ff-generator.md

## 它能推出什么 / 谁在用它
- ⇒ `thm.giraud` Giraud 定理
- 被 `prop.generator-coproduct-epi` 生成元的余积刻画 用
- 被 `prop.generators-abelian-sheaves` 生成元给出阿贝尔层的生成元 用
- 被 `prop.condab-generated` CondAb 由有限表现投射对象生成 用
- 被 `thm.topos-abelian-grothendieck` 拓扑斯上的阿贝尔群是 Grothendieck 范畴 用
- 被 `def.topos` 拓扑斯 用

- …另有出边，续页见 `nodes/def.generator.3.md`

refs: Le Stum, An introduction to condensed mathematics, §3.3

> 说明见 `notes/def.generator.md`
