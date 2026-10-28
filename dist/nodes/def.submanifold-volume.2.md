# 诱导体积　`def.submanifold-volume`　·　续页（第 2 页）
[在星图里打开](../#n=def.submanifold-volume)　·　第 1 页 [nodes/def.submanifold-volume.md](./def.submanifold-volume.md)

## 陈述（续）
算一个 $k$ 维的体积；这一步就是「$k$ 维薄片上的积分」的全部内容。
设 $i : N^{k} \to (M^{n},g)$ 是浸入子流形（$k \le n$），$g$ 是黎曼度量（`def.riemannian-metric`）。**诱导度量**
是
$$g_{N} := i^{\ast}g,\qquad (g_{N})_{p}(u,v) := g_{i(p)}\bigl(\mathrm{d}i_{p}u,\ \mathrm{d}i_{p}v\bigr),$$
它是 $N$ 上的黎曼度量（$\mathrm{d}i$ 单射保证正定）。给 $N$ 取定定向后，$N$ 的**体积形式**在保向卡 $
(U,x)$ 里是
$$\mathrm{d}V_{N} := \sqrt{\det\bigl(g_{ab}\bigr)}\ \mathrm{d}x^{1}\wedge\cdots\wedge\mathrm{d}x^{k},\qqua
d g_{ab} := g\Bigl(\frac{\partial i}{\partial x^{a}},\ \frac{\partial i}{\partial x^{b}}\Bigr),$$
与 `def.volume-form` 的定义逐字相同，只是把 $M$ 换成 $N$、$g$ 换成 $g_{N}$。不定向时改用**密度**

> 续见 [nodes/def.submanifold-volume.3.md](./def.submanifold-volume.3.md)
