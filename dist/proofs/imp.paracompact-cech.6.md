# 足够多内射 + 软层无环 $\implies$ 仿紧上 Čech 等于层上同调
`imp.paracompact-cech` · 推出 · strong 边 · 根 `../`

`thm.pushforward-enough-injectives` 足够多内射层 + `prop.skyscraper-injective` 天际线层是内射层 → `thm.paracompact-cech-equals-sheaf` 仿紧空间上的 Čech 就是上同调

**第五步：去掉局部有限。** 一般开覆盖取局部有限细化 $\mathfrak{V} \preceq \mathfrak{U}$；细化映射 $\check{H}^{n}(\mathfrak{U}, \mathcal{M}) \to \check{H}^{n}(\mathfrak{V}, \mathcal{M})$ 与到 $H^{n}(X, \mathcal{M})$ 的规范映射相容，而后者已是同构，故沿覆盖取余极限仍得同构。

⚠️ **这是路线梗概，不是完整证明**：第三步「软层对 $\Gamma$ 无环」与第四步「无环消解算导出函子（Leray 零调性）」本图都还没有节点，这里只以引理形式引用；节点因此保持 skeleton，本边不勾 ∎。

> 续见 proofs/imp.paracompact-cech.7.md
