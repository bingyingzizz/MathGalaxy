# 导出函子就是 Kan 延拓　`prop.derived-functor-kan-extension`
命题：$F$ 左正合 $\implies RF$ 是沿局部化的左 Kan 延拓
layer 14 · 命题 · 复形与导出三角 · 同调代数

设 $F : \mathcal{A} \to \mathcal{A}'$ 是**左正合**加法函子。则 $RF$ 是复合映射

$$\mathbf{K}^{+}(\mathcal{A}) \xrightarrow{\ F\ } \mathbf{K}^{+}(\mathcal{A}') \longrightarrow \mathbf{D}^{+}(\mathcal{A}')$$
> 陈述续见 `nodes/prop.derived-functor-kan-extension.2.md`


## 为什么成立（入边，证明在 proofs/）
- `prop.kan-extension-adjoint` Kan 延拓与伴随的存在性 + `prop.kan-extension-exists` 有余极限时 Kan 延拓总存在：Kan 延拓即伴随 $\implies$ 导出函子就是 Kan 延拓　proofs/imp-link.kanadj-kanrf.md
- `def.right-derived-functor` 右导出函子：用到了定义 右导出函子　proofs/def-link.kanrf-derfun.md

refs: Le Stum, An introduction to condensed mathematics, Exercise 7.22

> 说明见 `notes/prop.derived-functor-kan-extension.md`
