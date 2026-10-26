# 整值测度　`def.cond-measure`　·　说明
根 `../`

⭐ 名字的来源：$C(S,\mathbb{Z})$ 的元素是「$S$ 上的整数函数」，把测度 $\mu$ 作用上去就得到 $\int f\,d\mu$。当 $S$ 有限时 $M(S,\mathbb{Z}) = \mathbb{Z}^{S}$，就是「每个点放一个整数」；当 $S$ 是无限 profinite 时，$M(S,\mathbb{Z})$ 是**形式无穷和**，一般比 $\mathbb{Z}[S]$ 大得多。

⭐ 关键的 一步是 `thm.csz-free`：$C(S,\mathbb{Z})$ 是自由阿贝尔群，所以 $M(S,\mathbb{Z}) \cong \prod_I \mathbb{Z}$ 是**可数积以外的**大乘积 —— 这正是固态理论要的「完备化」。

⚠ $C(S,\mathbb{Z})$ 取**离散**拓扑：$S$ 紧、$\mathbb{Z}$ 离散，连续函数的像是有限集，所以它作为抽象群是自由的（Nöbeling 定理），但一般不是有限生成。
