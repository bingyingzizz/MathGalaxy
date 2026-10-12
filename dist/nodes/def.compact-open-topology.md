# 紧开拓扑　`def.compact-open-topology`
紧开拓扑（Compact-Open Topology）
layer 15 · 定义 · 紧生成空间与弱 Hausdorff · 拓扑学

设 $X, Y \in \mathbf{Top}$。对每个连续映射 $g : S \to X$（$S$ 紧 Hausdorff）与每个开集 $V \subseteq Y$，令

$$W_{S,V} := \{\, f : X \to Y \;\mid\; \operatorname{Im}(f \circ g) \subseteq V \,\}.$$
> 陈述续见 `nodes/def.compact-open-topology.2.md`


## 为什么成立（入边，证明在 proofs/）
- `def.topology` 拓扑空间与开集：用到了定义 拓扑空间与开集　proofs/def-dep.compactopen-topology.md
- `def.compact` 紧：用到了定义 紧　proofs/def-dep.compactopen-compact.md
- `def.continuous` 连续：用到了定义 连续　proofs/def-dep.compactopen-continuous.md

## 它能推出什么 / 谁在用它
- 被 `prop.cg-function-space` 函数空间弱 Hausdorff 用
- 被 `prop.compact-open-discrete` 离散时函数空间是积 用
- 被 `def.topo-ab-group` 拓扑阿贝尔群 用

- …另有出边，续页见 `nodes/def.compact-open-topology.3.md`

refs: Le Stum, An introduction to condensed mathematics, §2.3

> 说明见 `notes/def.compact-open-topology.md`
