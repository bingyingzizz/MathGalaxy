# 紧群上 p-liquid 系数的正次数上同调：一般系数的反例

Positive-Degree Cohomology of Compact Groups with p-Liquid Coefficients: A Counterexample for General Coefficients

## 摘要

对每个 \(0<p\le1\)，本文构造一个带平凡 \(G=\mathrm{SU}(2)\) 作用的 \(p\)-liquid 实向量空间
\[
V_p=\operatorname{coker}\bigl(\partial_4:M_{<p}(G^4)\longrightarrow M_{<p}(G^3)\bigr),
\]
并证明 \(H^3(G,V_p)\ne0\)。这里的上同调是 condensed 分类 topos 的导出群上同调。因而，紧群对任意平凡 \(p\)-liquid 实系数的正次数上同调全称消隐命题为假。

证明分为三步。首先，从自由 liquid 对象的形式层坐标与实特化关系出发，证明任意集合意义的有界函数都能在通常点的 liquid 链上良定义地取值。其次，利用同一算术四元数群的紧实位表示和余紧双曲复位表示，借 \(\mathbb C\) 的域自同构拉回有界体积三上圈，并用闭双曲三流形的有限基本三圈给出正体积配对。最后，证明这个有限三圈没有 liquid 四链填充，将其送入上述余核，并通过逐层导出伴随与双复形识别得到非零三次类。

反例适用于一般 \(p\)-liquid 系数，包括 \(p=1\)，但其系数 \(V_p\) 不能来自 Hausdorff \(p\)-Banach 空间。本文给出这一不可表示性的证明，以及把同一有限三圈迁移到 \(p\)-Banach 系数的精确代价判据。对其中的前插平均族，谱隙、中位数和有限频带求积给出固定 \(p<1\) 时的一致正下界，并确定最优缺陷的阶为 \(\Theta(1-p)\)。这个子族结果不决定允许任意四链的代价，因此不解决 Hausdorff \(p\)-Banach 系数的全称问题。

## 1 问题

Scholze 所提 Question 0.10.4 的数学表述为：设 \(G\) 为紧群，\(V\) 为带平凡 \(G\) 作用的 \(p\)-liquid 实向量空间，例如所考虑的 \(p\)-Banach 实空间，是否总有
\[
H^i(G,V)=0\qquad(i>0)?
\]
本文沿用题号 0.10.4；所引讲义 PDF 将它编号为 Question 10.4。

已有的消隐结果有不同的适用范围。有限群可以用除以群阶的有限平均收缩实系数复形。紧交换群的情形由 Corollary 0.10.2 处理。对于 Banach 系数，例如通常 \(L^p\) 空间中 \(p\ge1\) 的情形，Haar 平均具有相应的线性连续性；Austin–Moore 的 Theorem A 在其 Fréchet、局部凸系数范围内给出可测与连续上同调的比较及紧群消隐。它的非局部凸推广并不是该定理的结论。讲义 Theorem 6.7 对 \(p\)-Banach 系数给出的 profinite 空间上同调消隐，也须与一般紧 Hausdorff 空间的情形区分。

缺口在于：一般 liquid 对象未必带有可用于 Haar 积分的局部凸拓扑；即使目标是 \(p\)-Banach 空间，\(p<1\) 时也不能直接采用 Banach 值积分的论证。此外，分类空间的下降涉及每层空间的全部导出上同调，只计算连续函数组成的普通 bar 复形，并不自动计算题目中的 \(H^i(G,V)\)。

本文在一般系数范围给出否定回答：对同一个紧非交换群 \(\mathrm{SU}(2)\)，每个 \(0<p\le1\) 都有明确的平凡系数 \(V_p\) 使三次上同调非零。证明独立于低次数消隐，也不要求自由 liquid 对象投射。第 9 节说明为什么这个结论不包含 Hausdorff \(p\)-Banach 特例。

## 2 预备与所用外部结果

记 \(\mathcal A=\operatorname{Cond}(\mathbb R)\) 为 condensed 实向量空间范畴，\(\operatorname{Liq}_p(\mathbb R)\) 为其中的 \(p\)-liquid 子范畴。紧 Hausdorff 空间及拓扑群均取其关联 condensed 对象。记 \(*\) 为通常点；\(V(*)\) 只表示通常点实向量空间，不给它另选拓扑。\(\mathbb R[S]\) 表示自由 condensed 实向量空间，\([s]\) 表示 Dirac 元。

对紧 Hausdorff 空间 \(S\)，记
\[
M_{<p}(S)=\underset{0<r<p}{\operatorname{colim}}M_r(S).
\]
下文在讨论单个展开时将小指数记为 \(q\)，以便与余核映射 \(q:C_3\to V_p\) 按上下文区分。所有 \(\operatorname{RHom}\) 如无另行说明均在 \(\mathcal A\) 中计算。\(H^i(G,V)\) 表示 \(R\Gamma(BG,V)\) 的第 \(i\) 次上同调。

使用的讲义输入如下，编号均保留讲义中的形式。

1. **Proposition 10.1 及其后正文。** 对紧 Hausdorff \(S\)，形式自由对象 \(M(S,\mathbb Z((T))_r)\) 有紧 Hausdorff 有界盘表示，并可沿 profinite 超覆盖下降。实基变换后，自由 condensed 实对象的导出 liquidification 满足
\[
L\operatorname{liq}_p(\mathbb R[S])\simeq M_{<p}(S)[0].
\]
它用于构造链对象、处理第 4 节的形式坐标与紧参数提升，并在第 8 节给出逐层导出比较。

2. **Proposition 10.7。** 每个 \(M_{<p}(S)(*)\) 中的元素都有可数原子展开
\[
x=\sum_j a_j[s_j],\qquad \sum_j|a_j|^q<\infty
\quad\text{对某个 }0<q<p.
\]
它提供单个通常点元素的可求和表示。其后的非余极限警告仍须保留：单个元素有可数支撑，不意味着一个紧参数族有共同的可数支撑。

3. **Theorem 6.5。** \(\operatorname{Liq}_p(\mathbb R)\) 在 \(\mathcal A\) 中对核、余核和扩张封闭；其导出嵌入具有讲义所述的全忠实性及导出伴随。前者保证本文的余核仍是合法系数，后者与 Proposition 10.1 一起给出第 8.4 节的导出 Hom 等价。

4. **Corollary 0.10.2，即 PDF 的 Corollary 10.2。** 紧交换群在所述平凡 \(p\)-liquid 实系数范围内满足正次数消隐。本文只用它定位问题的已知范围，不用它证明反例。

第 4.4 节还使用 Definition 6.3 的 profinite 测度描述，以及 Theorem 6.9(2) 和讲义实特化正文：当 \(r=2^{-q}\) 时，\(T=1/2\) 的实特化关系由 \(2-T^{-1}\) 生成。第 5 节使用算术 Kleinian 格定理，第 6 节使用直双曲四面体的体积界和 Stokes 公式，第 9.3 节使用 Bourgain–Gamburd 的 Haar 谱隙定理。这些结果的具体假设和用途在相应处给出。

通常点评价在 condensed 阿贝尔群上正合。事实上，满射的一个 \(*\)-截面可沿非空 profinite 覆盖局部提升，再沿覆盖中的一个点拉回，得到 \(*\) 上的提升。更一般的下降正合性须带参数证明，不能反过来由通常点的计算推断。

## 3 复形与检测三圈

固定 \(G=\mathrm{SU}(2)\) 及 \(0<p\le1\)，令
\[
C_n=M_{<p}(G^n),\qquad C_0=\mathbb R.
\]
采用平凡作用的未正规化非齐次 bar 边界：
\[
\begin{aligned}
\partial_n[g_1|\cdots|g_n]
={}&[g_2|\cdots|g_n]\\
&+\sum_{j=1}^{n-1}(-1)^j
[g_1|\cdots|g_jg_{j+1}|\cdots|g_n]
+(-1)^n[g_1|\cdots|g_{n-1}].
\end{aligned}
\]
每个面来自连续群运算，故诱导 liquid 线性态射；单纯恒等式给出 \(\partial_{n-1}\partial_n=0\)。特别地，
\[
\partial_3[g|h|k]=[h|k]-[gh|k]+[g|hk]-[g|h],
\]
\[
\partial_4[g|h|k|\ell]
=[h|k|\ell]-[gh|k|\ell]+[g|hk|\ell]
-[g|h|k\ell]+[g|h|k].
\]
令 \(Z_3=\ker\partial_3\)。称有限链 \(z\in\mathbb R[G^3]\) 为一个检测三圈，是指 \(\partial_3z=0\)，并存在有界实函数 \(\beta:G^3\to\mathbb R\)，使
\[
\delta\beta=0,\qquad E_\beta(z)\ne0.
\]
这里 \(\delta\) 为上述边界的对偶公式，\(E_\beta\) 是第 4 节构造的通常点取值；\(\beta\) 不要求连续。第 7 节将证明这样的 \(z\) 不在 \(\partial_4(C_4(*))\) 中。

## 4 有界函数在 liquid 链上的取值

### 4.1 展开的绝对收敛性

设 \(S\) 紧 Hausdorff，\(x\in M_{<p}(S)(*)\)。Proposition 10.7 给出某个 \(0<q<p\le1\) 及展开 \(x=\sum_j a_j[s_j]\)，满足 \(\sum_j|a_j|^q<\infty\)。由标量 \(q\) 次可加性，
\[
\sum_j|a_j|\le\left(\sum_j|a_j|^q\right)^{1/q}<\infty.
\]
因此对任意有界 \(f:S\to\mathbb R\)，级数 \(\sum_j a_jf(s_j)\) 绝对收敛。重复点可以合并；剩下需要证明的是，这个和只依赖 liquid 元素本身。

### 4.2 连续函数给出的泛函

连续函数 \(\varphi:S\to\mathbb R\) 由自由 liquid 对象的伴随性诱导态射
\[
L_\varphi:M_{<p}(S)\longrightarrow\mathbb R,
\qquad L_\varphi([s])=\varphi(s).
\]
它与可求和展开相容：
\[
L_\varphi\left(\sum_j a_j[s_j]\right)
=\sum_j a_j\varphi(s_j).
\]
为明确这个相容性所含的无穷求和，固定 \(r=2^{-q}\)，把形式提升写成 \(\mu=\sum_n\mu_nT^n\)，其中 \(\mu_n=\sum_s c_{n,s}[s]\) 为有限整数链，\(\sum_{n,s}|c_{n,s}|r^n\le c\)。实特化后的取值是
\[
\sum_{n,s}c_{n,s}2^{-n}\varphi(s).
\]
非零层有共同下界 \(n_0\)，而 \(t=1/2<r\) 给出
\[
\sum_{n\ge N,s}|c_{n,s}|t^n|\varphi(s)|
\le\|\varphi\|_\infty c(t/r)^N.
\]
每层的有限和连续，尾项在固定有界盘上一致趋零，因而得到连续的盘上泛函。移位换序说明它杀死 \((2-T^{-1})\mu\)。第 4.4 节证明实特化恰是这个商，并验证任意原子展开与此层坐标求和一致；所以这里没有把未经证明的原子拓扑当作 condensed 结构。

### 4.3 良定义性（Lemma + 证明）

**Lemma 4.1**（有界原子取值）. 设 \(S\) 紧 Hausdorff，\(0<p\le1\)，\(f:S\to\mathbb R\) 是集合意义的有界函数。公式
\[
E_f:M_{<p}(S)(*)\longrightarrow\mathbb R,
\qquad E_f\left(\sum_j a_j[s_j]\right)=\sum_j a_jf(s_j)
\]
定义实线性映射。若 \(a:S\to S'\) 连续，则 \(E_fa_*=E_{f\circ a}\)。

证明. 绝对收敛已在第 4.1 节证明。若 \(\sum_j a_j[s_j]=0\)，连续测试泛函给出 \(\sum_j a_j\varphi(s_j)=0\)。有限变差原子 Radon 测度
\[
\mu=\sum_j a_j\delta_{s_j}
\]
因而对所有连续实函数积分为零。紧 Hausdorff 空间上连续函数分离有限 Radon 测度，故 \(\mu=0\)，特别是每个合并原子的系数 \(\sum_{j:s_j=s}a_j=0\)。绝对收敛允许分组，得到 \(\sum_j a_jf(s_j)=0\)。两个展开取差即得独立性，拼接展开给线性性，有限层推前后换序给自然性。此论证所用的展开与连续泛函的相容性由下一小节的实商计算提供；该计算还直接证明原子坐标唯一性。∎

这里的结论只关于通常点。若 \(S=\mathbb N\cup\{\infty\}\) 为单点紧化，取 \(f(n)=1\)、\(f(\infty)=0\)，则 \([n]\) 随 Dirac 族趋于 \([\infty]\)，而取值分别为 1 和 0。因此 \(E_f\) 一般不可能是 condensed 态射，也无需假设 \(f\) 可测。

### 4.4 良定义性的算术来源（显式除法：\(\nu_n\) 构造、\(d\nu=\mu\)、\(r/(2r-1)\) 的界、\(\ker=dF_r\)）

固定 \(0<q<p\le1\)，令
\[
r=2^{-q},\qquad A_r=\mathbb Z((T))_r,\qquad
F_r(S)=M(S,A_r),\qquad d=2-T^{-1}.
\]
这里 \(1/2<r<1\)。形式对象的通常点具有唯一的层坐标
\[
\mu=\sum_{n\in\mathbb Z}\mu_nT^n,
\quad \mu_n\in\mathbb Z[S],\quad
\sum_n r^n\|\mu_n\|_1<\infty.
\]
因为非零整数链质量至少为 1，非零层必有共同下界。Theorem 6.9(2) 的 profinite 实特化公式是 \(M_q(P)=F_r(P)/dF_r(P)\)。先说明它对一般紧 Hausdorff \(S\) 也成立。

取 profinite 超覆盖 \(P_\bullet\to S\)，增广记为 \(\pi:P_0\to S\)，两个面记为 \(\varepsilon_0,\varepsilon_1:P_1\to P_0\)，并置
\[
D_1=(\varepsilon_0)_*-(\varepsilon_1)_*.
\]
若 \(\pi_*\mu=0\)，每层整数链在每个 \(\pi\)-纤维内系数和为零。逐一配对正负整数系数，并利用 \(P_1\to P_0\times_SP_0\) 满射提升配对，得到有限链 \(\eta_n\) 满足
\[
D_1\eta_n=\mu_n,\qquad
\|\eta_n\|_1\le\tfrac12\|\mu_n\|_1,
\qquad
\sum_n r^n\|\eta_n\|_1
\le\tfrac12\sum_n r^n\|\mu_n\|_1.
\]
因此 \(\eta\in F_r(P_1)(*)\)。同样，逐层提升每个支撑点给出 \(\pi_*\) 的保质量满射提升。

这个配对还须给出 sheaf 的正合性。设 profinite 测试空间 \(U\) 上的核截面 \(\mu\) 落在半径 \(c\) 的紧盘内。由 Proposition 10.1，
\[
L=\{(u,\eta)\in U\times F_r(P_1)_{\le c/2}:
D_1\eta=\mu(u)\}
\]
是紧 Hausdorff 空间，并由逐点配对知 \(L\to U\) 满射。取 profinite 满覆盖 \(Q\to L\)，便沿覆盖 \(Q\to U\) 得到局部提升；保质量满射也以相同的紧盘拉回处理。于是
\[
F_r(P_1)\xrightarrow{D_1}F_r(P_0)
\xrightarrow{\pi_*}F_r(S)\longrightarrow0
\]
在 condensed 范畴正合。这里截面落在一个盘内来自滤过盘表示和 site 的有限覆盖性质；并未用通常点检测正合性。

\(D_1\) 与标量 \(d\) 交换，故实基变换的零次下降给出
\[
\begin{aligned}
M_q(S)
&=\operatorname{coker}\bigl(F_r(P_1)/dF_r(P_1)
\longrightarrow F_r(P_0)/dF_r(P_0)\bigr)\\
&=F_r(P_0)/(\operatorname{im}D_1+dF_r(P_0))
=F_r(S)/dF_r(S).
\end{aligned}
\]
等价的核等式是 \(\pi_*^{-1}(dF_r(S))=\operatorname{im}D_1+dF_r(P_0)\)：局部提升 \(d\) 前的元素，减掉其 \(d\) 倍即可。通常点评价正合，因此这也是真正的通常点商。

现在只在唯一的形式层坐标上定义
\[
\mathcal A_r(\mu)=\sum_{n\in\mathbb Z}2^{-n}\mu_n
=(\alpha_s)_{s\in S},\qquad
\alpha_s=\sum_n2^{-n}c_{n,s}.
\]
它在抽象 \(\ell^1(S)\) 中绝对收敛，而且整数系数满足 \(|c_{n,s}|^q\le|c_{n,s}|\)，故
\[
\sum_s|\alpha_s|^q
\le\sum_{n,s}|c_{n,s}|^q2^{-nq}
\le\sum_n r^n\|\mu_n\|_1.
\]
移位和绝对换序立即给出 \(\mathcal A_r(d\nu)=0\)。反之，若 \(\mathcal A_r(\mu)=0\)，定义
\[
\nu_n=-\sum_{k<n}2^{n-1-k}\mu_k.
\]
由于非零层有下界，每个和有限，\(\nu_n\) 是有限整数链，并且低层为零。递推式
\[
\nu_{n+1}=2\nu_n-\mu_n
\]
说明 \(d\nu=\mu\)。为验证 \(\nu\) 仍属于形式对象，使用零原子总和把它改写为绝对收敛尾和
\[
\nu_n=\sum_{k\ge n}2^{n-1-k}\mu_k.
\]
于是非负项换序给出
\[
\begin{aligned}
\sum_n r^n\|\nu_n\|_1
&\le\sum_k\|\mu_k\|_1
\sum_{\substack{n\in\mathbb Z\\n\le k}}2^{n-1-k}r^n\\
&=\frac{r}{2r-1}\sum_k r^k\|\mu_k\|_1<\infty.
\end{aligned}
\]
内和的下限是负无穷，等号来自
\[
2^{-k-1}\sum_{n=-\infty}^k(2r)^n
=\frac{r^{k+1}}{2r-1}.
\]
保留实际有限下界只会减小上界。分母正性正是 \(r>1/2\)。由此严格得到
\[
\ker\mathcal A_r=dF_r(S)(*).
\]

还需证明坐标描述覆盖所有可求和原子族。给定 \((a_s)\in\ell^q(S)\)，逐点选同号二进展开
\[
a_s=\sum_{n\ge m_s}\epsilon_{n,s}2^{-n},\qquad
\epsilon_{n,s}\in\{-1,0,1\},\qquad
2^{-m_s}\le|a_s|<2^{-m_s+1}.
\]
每层只有有限多个非零位，否则 \(\sum_s|a_s|^q\) 发散；有界性给共同的层下界。令 \(\widehat\mu_n=\sum_s\epsilon_{n,s}[s]\)，则
\[
\sum_{n,s}|\epsilon_{n,s}|r^n
\le\frac1{1-r}\sum_s|a_s|^q<\infty.
\]
因此它给出提升，且 \(\mathcal A_r(\widehat\mu)=a\)。不同二进表示的差属于已经算出的核。形式标量乘法的绝对收敛卷积满足
\[
\mathcal A_r(h\mu)=h(1/2)\mathcal A_r(\mu),
\]
所以实商上的同构确实为实线性：
\[
M_q(S)(*)\cong\ell^q(S).
\]

对带重复点的展开，逐个系数作二进提升后，每层先在有限自由群中合并，得到的 \(s\)-坐标恰为 \(\sum_{j:s_j=s}a_j\)。它与自然 liquid 求和相同：将 \(j\mapsto s_j\) 延拓为 \(\beta\mathbb N\to S\)，在 \(\beta\mathbb N\) 的每个有限 clopen 分割上给一块赋系数 \(\sum_{j\in A\cap\mathbb N}a_j\)。这些系数相容、\(q\)-质量一致有界，二进提升特化后正是这族系数。推前到 \(S\) 即得所述展开。

若 \(q_1<q_2<p\)，上述同构把过渡映射识别为保留原子系数的包含。滤过余极限在通常点计算，因此
\[
M_{<p}(S)(*)\cong\bigcup_{0<q<p}\ell^q(S).
\]
这从实商的全部关系出发证明了合并原子系数的唯一性，补足第 4.2 节的求和相容性，也独立给出 Lemma 4.1。该式始终是通常点向量空间的描述；它没有为紧参数族指定共同支撑，更没有把 \(M_q(S)\) 识别为通常原子准范数拓扑。

共同支撑的区别有一个具体检验。令 \(I\) 为不可数离散集合，\(S=I\cup\{\infty\}\) 为单点紧化；它是 profinite。任意可数子集的闭包 \(K\) 仍可数，因而严格小于 \(S\)。Dirac 参数族 \(S\to M_q(S)\) 的每个点只有一个原子，但整个族不能经任何 \(M_q(K)\) 分解：取 \(s\notin K\)，坐标单射说明 \([s]\) 不可能由 \(K\) 内的原子产生。如果该 condensed 对象是这些可数闭支撑子对象的滤过余极限，那么在 profinite 测试对象 \(S\) 上取截面就会使这个族进入某一个子对象，矛盾。因此，逐元素可数的描述不能用来交换紧参数与支撑；本文在下降中保留紧参数提升，正是为了避免这个错误。

## 5 算术输入

### 5.1 数域与四元数代数

令 \(\alpha=\sqrt[3]{2}>0\)，\(k=\mathbb Q(\alpha)\subset\mathbb R\)。由 Eisenstein 判别，\([k:\mathbb Q]=3\)；其三个嵌入将 \(\alpha\) 分别送到 \(\alpha,\zeta_3\alpha,\zeta_3^2\alpha\)，因此恰有一个实位和一对复位。取
\[
B=(-1,-1)_k
=k\langle I,J\rangle/(I^2=J^2=-1,\ IJ=-JI),\qquad K=IJ,
\]
以及阶
\[
\mathcal O=\mathcal O_k\oplus\mathcal O_kI
\oplus\mathcal O_kJ\oplus\mathcal O_kK.
\]
唯一实位上的 \(B\) 是 Hamilton 四元数代数，因而在该位分歧。四元数代数若在 \(k\) 上分裂，各实位也分裂，故这里的 \(B\) 是除代数。复位上则有 \(B\otimes_{k,\tau}\mathbb C\cong M_2(\mathbb C)\)。

### 5.2 格与无挠性

使用算术 Kleinian 格定理：若数域恰有一个复位，四元数代数在全部实位分歧，则一个阶的约化范数一群在该复位投影到 \(\mathrm{PSL}_2(\mathbb C)\) 后为有限余体积格；若该代数为除代数，格余紧。参见 Page 的 Theorem 6 或 Reid 的相关综述。上述 \(k,B\) 满足全部条件。

取
\[
\Gamma=\mathcal O^1\cap(1+3\mathcal O).
\]
由于 \(\mathcal O/3\mathcal O\) 有限，\(\Gamma\) 在 \(\mathcal O^1\) 中有限指数。为证明无挠性，把秩 12 的自由整数模 \(\mathcal O\) 上的左乘写成忠实表示 \(\mathcal O^1\to\mathrm{GL}_{12}(\mathbb Z)\)。\(\Gamma\) 的像包含在模 3 主同余核内。

若其中有非平凡有限阶矩阵，取其适当幂可设阶为素数 \(\ell\)。写
\[
A=1+3^sD,\qquad s\ge1,\qquad D\not\equiv0\pmod3.
\]
若 \(\ell\ne3\)，二项展开中 \(\ell3^sD\) 的最小矩阵项 3-进价为 \(s\)，其余项价严格更高。若 \(\ell=3\)，则
\[
A^3-1=3^{s+1}D+3^{2s+1}D^2+3^{3s}D^3;
\]
首项最小价为 \(s+1\)，其余项至少为 \(s+2\)。两种情形都不可能为零，矛盾。于是 \(\Gamma\) 无挠，其复位投影仍是余紧格。

### 5.3 实位嵌入 \(\rho_0\)

实位矩阵表示为
\[
\rho_0(a+bI+cJ+dK)
=\begin{pmatrix}
a+bi&c+di\\
-c+di&a-bi
\end{pmatrix}.
\]
矩阵中的 \(I,J\) 满足四元数关系，且
\[
\det\rho_0(x)=a^2+b^2+c^2+d^2=\operatorname{Nrd}(x).
\]
实位范数一条件还给出酉性，因此限制得到忠实群嵌入 \(\rho_0:\Gamma\hookrightarrow\mathrm{SU}(2)\)。它的矩阵条目全在 \(k(i)\) 中。

### 5.4 域自同构 \(\sigma\)

多项式 \(X^3-2\) 在 \(\mathbb Q(i)\) 上仍不可约：若可约，三次多项式必有一个根属于 \(\mathbb Q(i)\)，但每个根在 \(\mathbb Q\) 上次数为 3，不可能属于二次扩张。于是存在域嵌入
\[
\tau:k(i)\longrightarrow\mathbb C,\qquad
\tau(\alpha)=\zeta_3\alpha,\quad\tau(i)=i.
\]
这里 \(\zeta_3\notin k(i)\)。否则 \(k(i)\) 包含 \(\mathbb Q(i,\zeta_3)\)；后者是次数 4 的双二次域，而 \([k(i):\mathbb Q]=6\)，与塔式次数公式矛盾。这也说明 \(\tau\) 是取值于另一个共轭子域的嵌入，无须是 \(k(i)\) 的自同构。

把 \(\tau\) 延拓为 \(\overline{\mathbb Q}\) 的自同构，再选 \(\mathbb C/\overline{\mathbb Q}\) 的超越基，在超越基上选恒等延拓，并延拓到代数闭包，得到 \(\sigma\in\operatorname{Aut}(\mathbb C)\)。不对这个域自同构要求连续性。

### 5.5 两个表示的关系

对矩阵逐项施加 \(\sigma\)，定义抽象群同态
\[
\rho=\sigma|_{\mathrm{SU}(2)}:
\mathrm{SU}(2)^\delta\longrightarrow\mathrm{SL}_2(\mathbb C)^\delta.
\]
上标 \(\delta\) 表示忘记拓扑。由于 \(\sigma\) 固定 \(i\)，在 \(\rho_0(\Gamma)\) 上逐项施加 \(\sigma\)，恰把系数按复位 \(\tau\) 嵌入；故与复位表示 \(\rho_2\) 严格满足
\[
\rho\circ\rho_0=\rho_2.
\]
\(\rho_2\) 的 \(\mathrm{PSL}_2(\mathbb C)\) 投影记为 \(\Lambda\)。投影的核至多为 \(\{1,-1\}\)，而 \(-1\notin\Gamma\)。若投影像有有限阶元，原像的适当幂为 \(\pm1\)，也与 \(\Gamma\) 无挠矛盾。因此 \(\Gamma\cong\Lambda\)，且 \(\Lambda\) 是无挠余紧格。

于是
\[
M=\Lambda\backslash\mathbb H^3
\]
为闭定向双曲三流形，\(\pi_1(M)\cong\Gamma\)，\(\operatorname{Vol}(M)>0\)。紧位像 \(\rho_0(\Gamma)\) 只是 \(G\) 的抽象子群；双曲几何中的离散格是复位像 \(\Lambda\)。两个表示的等式是代数等式，不是拓扑比较。

## 6 体积上圈与有限三圈

### 6.1 直四面体体积

固定 \(o\in\mathbb H^3\)，令
\[
v(A,B,C)=\operatorname{Vol}_{\mathrm{or}}
[o,Ao,ABo,ABCo],\qquad A,B,C\in\mathrm{SL}_2(\mathbb C).
\]
记齐次形式为 \(F(x_0,x_1,x_2,x_3)\)。直双曲四面体的统一体积界给出 \(|v|\le v_3\)，其中 \(v_3\) 是正则理想四面体的体积。直化与边界交换，体积形式闭合，Stokes 公式因此给出五点等式
\[
\sum_{j=0}^4(-1)^j
F(x_0,\ldots,\widehat{x_j},\ldots,x_4)=0.
\]
代入 \((o,Ao,ABo,ABCo,ABCDo)\)，并利用体积的等距不变性，得到
\[
v(B,C,D)-v(AB,C,D)+v(A,BC,D)
-v(A,B,CD)+v(A,B,C)=0.
\]
所以 \(\delta v=0\)。这里的积分只涉及普通有限几何单形。

### 6.2 有界三上圈 \(\beta=v\circ\rho^3\)

定义
\[
\beta(g,h,k)=v(\rho(g),\rho(h),\rho(k)).
\]
由 \(\rho\) 为抽象群同态，\(\beta\) 满足 \(\delta\beta=0\)，且 \(\|\beta\|_\infty\le v_3\)。它是在离散群 \(G^\delta\) 上的有界三上圈。

\(\beta\) 对紧拓扑不连续。事实上，若连续，则可作实标量 Haar 积分
\[
u(g,h)=\int_G\beta(t,g,h)\,d\gamma(t).
\]
把 \(\delta\beta(t,g,h,k)=0\) 积分，并对第二项用右不变性，得到 \(\beta=\delta u\)。这会使它在每个有限三圈上的配对为零，与第 6.4 节构造的正体积配对矛盾。该论证只用标量积分，不把 \(\beta\) 当作 liquid 实系数上圈；反例的合法系数上圈在第 8 节另行构造。

### 6.3 有限 bar 代表与直化次数

取 \(M\) 的有限有序三角剖分，其定向基本三圈记为 \(w\)。把剖分提升到 \(\mathbb H^3\)，对每个顶点轨道选代表 \(\widetilde v_a\)。定义顶点映射
\[
\widetilde f(\gamma\widetilde v_a)=\rho_2(\gamma)o,
\]
并在每个单形上用相同的测地直化作面相容延伸，得到连续 \(\Gamma\)-等变映射 \(\widetilde f:\mathbb H^3\to\mathbb H^3\)。公共面的有序顶点相同，所以各直单形确实拼合。

两点间唯一测地线给出显式同伦
\[
\widetilde H(x,t)=\text{从 }x\text{ 到 }\widetilde f(x)
\text{ 的测地线在参数 }t\text{ 处的点}.
\]
它连续且 \(\Gamma\)-等变，故下降为 \(\operatorname{id}_M\) 与 \(f:M\to M\) 的同伦。因此
\[
f_*[M]=[M],\qquad\deg f=1.
\]

对 \(w\) 中每个定向四面体选一个提升，把顶点写成 \(\gamma_i\widetilde v_{a_i}\)，赋予齐次 bar 单形 \([\gamma_0,\gamma_1,\gamma_2,\gamma_3]\) 的共不变量。换提升只同时左乘所有顶点；公共面依照基本链的定向抵消。转为非齐次记号，每项为
\[
[\gamma_0^{-1}\gamma_1\mid
\gamma_1^{-1}\gamma_2\mid\gamma_2^{-1}\gamma_3].
\]
所得有限链 \(z_\Gamma\in\mathbb R[\Gamma^3]\) 满足 \(\partial_3z_\Gamma=0\)。其体积取值等于 \(f_*w\) 上的积分，于是
\[
\langle\rho_2^*v,z_\Gamma\rangle
=\int_{f_*w}\mathrm{vol}_M
=\langle[\mathrm{vol}_M],f_*[M]\rangle
=\operatorname{Vol}(M)>0.
\]
这给出了与选定体积上圈对齐的有限 bar 代表；次数为 1 来自上述等变同伦。

### 6.4 推前到 \(G\)

**Lemma 6.1**（有限检测三圈）. 令 \(z=(\rho_0)_*z_\Gamma\in\mathbb R[G^3]\)。则对所有 \(0<p\le1\)，它在 \(C_3(*)\) 中满足
\[
\partial_3z=0,\qquad E_\beta(z)=\operatorname{Vol}(M)>0.
\]

证明. 群同态诱导 bar 链映射，所以 \(\partial_3z=(\rho_0)_*\partial_3z_\Gamma=0\)。有限 Dirac 链自然进入每个 \(M_{<p}(G^3)(*)\)，而 \(\rho\rho_0=\rho_2\) 给出
\[
E_\beta(z)=\langle\rho_2^*v,z_\Gamma\rangle
=\operatorname{Vol}(M).
\]
这个配对只含有限项，因此没有任何无穷积分或连续性要求。∎

## 7 检测三圈不可填充

**Lemma 7.1**（liquid 不可填充性）. 对每个 \(0<p\le1\)，Lemma 6.1 的 \(z\) 都不在 \(\partial_4(C_4(*))\) 中。因此 \(H_3(C_\bullet)(*)\ne0\)，且 \(\partial_4:C_4\to Z_3\) 不是满射。

证明. 对固定 \(0<q<p\) 的原子坐标 \(x=\sum_s a_s[s]\)，定义
\[
m_q(x)=\sum_s|a_s|^q.
\]
第 4 节的坐标描述与连续推前相容；同纤维系数求和及 \(q\) 次可加性给出 \(m_q(a_*x)\le m_q(x)\)。\(\partial_4\) 有五个面，所以
\[
m_q(\partial_4\xi)\le5m_q(\xi),\qquad
|E_\beta(x)|\le\|\beta\|_\infty m_q(x)^{1/q}.
\]
若 \(b\in C_4(*)\)，选某个 \(q<p\) 的展开 \(b=\sum_j a_j[x_j]\)，并置 \(b_N=\sum_{j\le N}a_j[x_j]\)。有限上圈等式给出
\[
E_\beta(\partial_4b_N)=\sum_{j\le N}a_j(\delta\beta)(x_j)=0.
\]
另一方面，
\[
\begin{aligned}
m_q(\partial_4(b-b_N))&\le5\sum_{j>N}|a_j|^q\longrightarrow0,\\
|E_\beta(\partial_4b)-E_\beta(\partial_4b_N)|
&\le\|\beta\|_\infty
\left(5\sum_{j>N}|a_j|^q\right)^{1/q}\longrightarrow0.
\end{aligned}
\]
故 \(E_\beta(\partial_4b)=0\)。若 \(\partial_4b=z\)，则与 \(E_\beta(z)=\operatorname{Vol}(M)>0\) 矛盾。

通常点正合使 \(H_3(C_\bullet)(*)\) 等于通常点链复形的第三同调。因此这个无填充的点给出非零同调，并否定满射性。这里用的是“满射必在通常点满射”的方向；并未用“通常点上满射即可推出 condensed 满射”，也未用通常点检测所有对象为零。∎

## 8 系数 \(V_p\) 与非零类

### 8.1 \(V_p\) 是 \(p\)-liquid

在 \(\mathcal A\) 中定义
\[
V_p=\operatorname{coker}(\partial_4:C_4\to C_3),
\qquad q:C_3\longrightarrow V_p.
\]
给 \(V_p\) 平凡 \(G\) 作用。Proposition 10.1 保证 \(C_3,C_4\) 为 \(p\)-liquid，Theorem 6.5 的余核封闭性保证 \(V_p\) 也为 \(p\)-liquid。这里的余核与 condensed 余核相同。由通常点正合及 Lemma 7.1，
\[
q(z)\ne0\quad\text{于 }V_p(*).
\]

### 8.2 上圈 \(c_p\)

Dirac 族和余核映射复合给出 condensed 态射
\[
c_p:G^3\longrightarrow V_p,\qquad
c_p(g,h,k)=q([g|h|k]).
\]
因为 \(q\partial_4=0\)，它满足严格的上圈等式 \(\delta c_p=0\)。其线性形式是只在链次数 3 非零的链映射
\[
Q:C_\bullet\longrightarrow V_p[3],\qquad Q_3=q.
\]
这里 \(V_p[3]\) 放在链次数 3，即上链次数 \(-3\)。我们采用未正规化 bar；除去退化链是链同伦等价，不要求这个具体代表在退化元上为零。

### 8.3 类非零

为避免把普通 cochain 非边界性误当作导出非零性，取 \(\mathcal A\) 中的单射分解 \(V_p\hookrightarrow I^0\to I^1\to\cdots\)，首个单射记为 \(\iota\)。把 \(Q\) 送入总复形 \(\operatorname{Tot}\operatorname{Hom}_{\mathcal A}(C_n,I^m)\)，其中总上链次数为 \(n+m\)。它的唯一非零分量是 \(\iota q:C_3\to I^0\)。

若 \(Q=dR\)，则总次数 2 的 \(R\) 在双次数 \((3,0)\) 的边界只能来自 \(R_{2,0}:C_2\to I^0\)，因而
\[
\iota q=R_{2,0}\partial_3.
\]
代入检测三圈，得到
\[
\iota q(z)=R_{2,0}(\partial_3z)=0.
\]
由 \(\iota\) 单射，这正是 \(q(z)=0\)，与第 8.1 节矛盾。因此 \(Q\) 在导出 Hom 的第三上同调中非零。等价地，它在第三同调上诱导非零单射
\[
H_3(C_\bullet)=\ker\partial_3/\operatorname{im}\partial_4
\hookrightarrow C_3/\operatorname{im}\partial_4=V_p;
\]
零导出态射不可能有这个同调作用。

### 8.4 把类算到 \(H^3(G,V_p)\)

令 \(K_n=\mathbb R[G^n]\)，Dirac 单位 \(u_n:K_n\to C_n\) 与各面和退化映射相容。Theorem 6.5 的导出伴随和全忠实性，结合 Proposition 10.1 的单项导出 liquidification，给出对每个紧 Hausdorff \(S\) 和 liquid \(V\) 自然的拟同构
\[
\operatorname{RHom}_{\mathcal A}(M_{<p}(S),V)
\xrightarrow{\ \sim\ }
\operatorname{RHom}_{\mathcal A}(\mathbb R[S],V).
\]
它对连续映射自然，所以构成整个余单纯图的等价。

分类 topos 的 bar 下降于是给出
\[
\begin{aligned}
R\Gamma(BG,V)
&\simeq\operatorname{Tot}_{[n]\in\Delta}
\operatorname{RHom}_{\mathcal A}(\mathbb R[G^n],V)\\
&\simeq\operatorname{Tot}_{[n]\in\Delta}
\operatorname{RHom}_{\mathcal A}(C_n,V)
\simeq\operatorname{RHom}_{\mathcal A}(C_\bullet,V).
\end{aligned}
\]
最后一步可直接检查：用上述单射分解，取第一象限双复形 \(\operatorname{Hom}_{\mathcal A}(C_n,I^m)\)，每个总次数只有有限多个 \(n+m\) 位置。余单纯正规化的退化部分可缩；同样处理 \(K_n\)，逐列拟同构通过第一象限比较定理诱导总复形拟同构。单射分解是 \(\mathcal A\) 中的分解，无须将其视为 liquid 范畴中的单射对象。

在这个等价下，\(Q\) 对应于 \(Q\circ u\)，其三次分量是 \(q\circ u_3\)，即 \(c_p\) 的线性延伸。因此第 8.3 节的非零类确实属于题目中的 \(H^3(G,V_p)\)。各层的全部导出 Hom 均被保留，没有把它们替换成普通连续函数空间。

### 8.5 主定理

**Theorem 8.1**（一般 liquid 系数的三次反例）. 设 \(G=\mathrm{SU}(2)\)，\(0<p\le1\)。以非齐次 bar 边界定义
\[
V_p=\operatorname{coker}_{\operatorname{Cond}(\mathbb R)}
\bigl(M_{<p}(G^4)\xrightarrow{\partial_4}M_{<p}(G^3)\bigr),
\]
并赋予平凡 \(G\) 作用。则 \(V_p\) 为 \(p\)-liquid 实向量空间，且
\[
[c_p]\ne0\quad\text{于 }H^3(G,V_p).
\]
同一个有限算术三圈 \(z\) 对每个 \(p\) 都满足 \(q(z)\ne0\)。

证明. Theorem 6.5 保证余核为 liquid。第 4 节的有界取值和第 6 节的正体积配对，经 Lemma 7.1 排除 \(z\) 的所有 liquid 四链填充。于是 \(q(z)\ne0\)，第 8.3 节给出非零导出链映射，第 8.4 节将其识别为 \([c_p]\)。∎

证明没有使用普通连续 bar 与导出群上同调的比较，也没有使用 \(C_n\) 的投射性。它不依赖任何低次消隐命题。\(p=1\) 时系数仍只是一般 liquid 余核；下一节证明它不能来自 Hausdorff Banach 空间，因而不与局部凸范围的消隐结果冲突。

## 9 \(p\)-Banach 情形不在本文范围内

### 9.1 \(V_p\) 不来自 Hausdorff \(p\)-Banach

**Lemma 9.1**（系数的不可表示性）. 不存在 Hausdorff \(p\)-Banach 实空间 \(B\)，使 \(\underline B\cong V_p\) 作为 condensed 实向量空间成立。

证明. 取共尾递增序列 \(q_m=p(1-1/(m+1))\)，置 \(r_m=2^{-q_m}\)。Proposition 10.1 的紧盘
\[
K_{m,N}=M(G^3,\mathbb Z((T))_{r_m})_{\le N},
\qquad m,N\ge1,
\]
经实特化和商映射送入 \(V_p\)，其通常点像覆盖 \(V_p(*)\)。确实，每个余核元素可在通常点提升到 \(C_3\)，再进入某个 \(M_{q_m}(G^3)\)，最后由第 4.4 节的真实商公式提升到某个有界盘。

若 \(V_p\cong\underline B\)，这些从紧 Hausdorff 空间到 \(\underline B\) 的 condensed 态射对应连续映射，故 \(B\) 是可数个紧集的并。\(B\) 完备可度量，Baire 定理说明其中一个紧集有内点。平移后得到紧零邻域，因而有一个正半径闭球紧。

局部紧的 Hausdorff \(p\)-Banach 空间必有限维，这里不需局部凸性。把次可加的 \(p\)-齐次质量记为 \(\rho_B\)，令 \(|x|=\rho_B(x)^{1/p}\)。若空间无限维，对已选有限多个单位向量的张成 \(E_n\)，选 \(y\notin E_n\)。有限维子空间闭，所以 \(d=\inf_{e\in E_n}|y-e|>0\)。选 \(e_0\) 使 \(|y-e_0|<2d\)，再归一化，得到单位向量 \(x_{n+1}\) 满足
\[
\inf_{e\in E_n}|x_{n+1}-e|>\tfrac12.
\]
单位球于是含无限分离点集，不能紧；缩放后与上述紧球矛盾。

另一方面，\(V_p(*)\) 有显式无限线性无关族。取无限阶元
\[
a=\operatorname{diag}(e^{2\pi i\sqrt2},e^{-2\pi i\sqrt2}),
\qquad x_n=q([a|a|a^n]),\quad n\ge2.
\]
\(\partial_3\partial_4=0\) 使 \(\partial_3\) 下降为 \(\overline\partial_3:V_p\to C_2\)，且
\[
\overline\partial_3(x_n)
=[a|a^n]-[a^2|a^n]+[a|a^{n+1}]-[a|a].
\]
在有限线性组合中，原子 \([a^2|a^n]\) 的系数只来自第 \(n\) 项，且为其系数的负值。由原子坐标单射，所有系数都必须为零。因此 \(V_p(*)\) 无限维，与有限维的 \(B\) 矛盾。∎

这个障碍还排除任何 Hausdorff quasi-Banach 表示。它判断的是当前系数的 condensed 结构；它既不给其他 \(p\)-Banach 系数的消隐证明，也不排除其他系数提供反例。

直接把原子链作 \(p\)-范数完备化也不能补足这个特例。确实，在忘记拓扑的原子空间上可取 Hausdorff 商
\[
B_p^{\mathrm{at}}=\ell^p(G^3)/
\overline{\partial_4\ell^p(G^4)}.
\]
有界 \(\beta\) 给出连续线性泛函，并杀死闭边界，所以仍保住 \(z\)。但商 Dirac 族 \(y(g,h,k)\) 不连续。取上面的 \(a\)，令
\[
g_j=\operatorname{diag}(e^{2\pi i\sqrt2/j},e^{-2\pi i\sqrt2/j})
\longrightarrow1,\qquad j\ge2.
\]
\(\partial_3\) 在该商上下降为到 \(\ell^p(G^2)\) 的有界算子，且
\[
\begin{aligned}
\overline\partial_3\bigl(y(g_j,a,a)-y(1,a,a)\bigr)
={}&[a|a]-[g_ja|a]+[g_j|a^2]-[g_j|a]\\
&-[1|a^2]+[1|a].
\end{aligned}
\]
六个有序对彼此不同，故原子 \(p\)-质量为 6；而三边界的算子质量界为 4。因此
\[
\|y(g_j,a,a)-y(1,a,a)\|_{\mathrm{quot}}^p\ge6/4.
\]
保住抽象配对的代价是丢失 Dirac 族的连续性，这个商不能直接提供原题所需的 condensed 上圈。

### 9.2 精确归约

给 \(G\) 取直径为 1 的双不变距离 \(d_G\)，在 \(S=G^3\) 上取乘积最大距离 \(d\)。允许模 \(\omega:[0,1]\to[0,\infty)\) 非降有界，满足 \(\omega(0)=0\)、\(\omega(t)>0\) 对 \(t>0\) 成立，且 \(\omega(t)\to0\)。不先要求它凹。

在有限形式链上定义半范数质量
\[
\begin{aligned}
\rho_\omega(x)=\inf\biggl\{&\sum_i|a_i|^p+
\sum_j|b_j|^p\omega(d(u_j,v_j))^p:\\
&x=\sum_i a_i[s_i]+\sum_j b_j([u_j]-[v_j]),
\quad\text{各和有限}\biggr\}.
\end{aligned}
\]
拼接和缩放分解分别给次可加性与 \(p\)-齐次性。先除去零半范数子空间再完备化，得到 Hausdorff \(p\)-Banach 空间 \(F_\omega\)。其 Dirac 族满足
\[
\rho_\omega([s])\le1,\qquad
\rho_\omega([u]-[v])\le\omega(d(u,v))^p,
\]
因而连续。置
\[
J_\omega=\overline{\partial_4(\mathbb R[G^4])}^{\,F_\omega},
\qquad B_\omega=F_\omega/J_\omega.
\]
商 Dirac 族是连续三上圈。\(B_\omega\) 是 \(p\)-liquid，故普通自由对象伴随将其延伸为 \(C_3\to B_\omega\)。这个延伸与 \(\partial_4\) 复合在 Dirac 族上为零，再由伴随唯一性得整个复合为零。因此下降为 condensed 线性态射 \(\Phi_\omega:V_p\to B_\omega\)。

对固定的有限检测三圈定义
\[
\begin{aligned}
\Delta_{p,\omega}(z)=\inf\biggl\{&\sum_i|a_i|^p+
\sum_j|b_j|^p\omega(d(u_j,v_j))^p:\\
&z=\partial_4 b+\sum_i a_i[s_i]
+\sum_j b_j([u_j]-[v_j]),\quad
b\in\mathbb R[G^4],\quad\text{各链有限}\biggr\}.
\end{aligned}
\]
由定义及闭包距离不变，
\[
\rho_{B_\omega}(\Phi_\omega(q(z)))
=\Delta_{p,\omega}(z)
=\inf_{b\in\mathbb R[G^4]}\rho_\omega(z-\partial_4b).
\]
这里闭包步骤可直接验证：若 \(j_n\to j\)，则
\[
|\rho_\omega(x-j_n)-\rho_\omega(x-j)|
\le\rho_\omega(j_n-j)\longrightarrow0.
\]

**Lemma 9.2**（有限三圈的双向判据）. 对固定 \(0<p\le1\)，下列条件等价：存在 Hausdorff \(p\)-Banach 空间 \(B\) 和 condensed 线性态射 \(\Phi:V_p\to\underline B\)，使 \(\Phi(q(z))\ne0\)；存在允许模 \(\omega\)，使 \(\Delta_{p,\omega}(z)>0\)。

证明. 后者通过上述 \(B_\omega,\Phi_\omega\) 直接给出前者。反过来，令 \(c=\Phi c_p\)，它是紧空间 \(S\) 上的连续 \(B\)-值三上圈。选 \(C>0\) 使 \(\sup_s|c(s)|_B\le C\)，并定义统一模
\[
\Omega_c(t)=\sup_{d(u,v)\le t}|c(u)-c(v)|_B,
\qquad \omega(t)=t+\Omega_c(t)/C\quad(t>0),
\]
置 \(\omega(0)=0\)。紧性给出 \(\Omega_c(t)\to0\)。有限线性延伸 \(L([s])=c(s)\) 对每个允许分解满足
\[
\rho_B(Lx)\le C^p\rho_\omega(x).
\]
它延拓到 \(F_\omega\)，上圈等式使它杀死 \(J_\omega\)，故经 \(B_\omega\) 分解。于是
\[
0<\rho_B(\Phi(q(z)))\le C^p\Delta_{p,\omega}(z),
\]
得到正代价。∎

这个等价精确描述了同一有限三圈的检测能否迁移。若正代价存在，第 8 节的同调作用论证给出 \(p\)-Banach 系数非零导出类。若所有允许模的代价都为零，也只排除了这种有限三圈检测，不能推出全部导出上同调消隐。

### 9.3 前插平均族已被解决

以下固定 \(0<p<1\) 和慢模
\[
W_0(t)=\frac1{2+\log(1/t)}\quad(0<t\le1),
\qquad W_0(0)=0.
\]
它连续、递增且凹。以 \(S=G\)、\(\omega=W_0\) 的上述质量完成有限链，记所得空间为 \(X_p\)，质量记为 \(\rho_p\)。等价地，在 \(G\) 外加孤立根 \(*\)，令根到各点距离为 1，内部距离为 \(W_0(d_G)\)，得到相应的自由 \(p\)-Banach 空间。凹性保证内部三角不等式，\(W_0\le1\) 保证含根的三角不等式。

总质量 \(\varepsilon_G([s])=1\) 满足 \(|\varepsilon_G(x)|^p\le\rho_p(x)\)。右平移 \(R_k[s]=[sk]\) 延拓为等距算子；有限链的连续性界及稠密性说明这是强连续右作用。这个平移作用用于分析平均，不是主定理中系数的平凡作用。

先把平均与原三圈准确关联。对第 6 节的三角剖分，给每个顶点轨道的代表选参数 \(t_v\in G\)，将提升顶点映成 \(\rho_0(\gamma)t_v\)，并转成非齐次 bar 链，得到有限三圈 \(z_t\)。它与 \(z\) 同调：若 \(X_i,Y_i\) 是两个顶点映射，对有序单形取有限 prism
\[
P_n=\sum_{j=0}^n(-1)^j
[X_0,\ldots,X_j,Y_j,\ldots,Y_n].
\]
逐项删点给 \(\partial P_n+P_{n-1}\partial=(F_t)_*-(F_1)_*\)，故 \(D=P_3(w)\) 满足 \(\partial_4D=z_t-z\)。因此 \(E_\beta(z_t)=E_\beta(z)>0\)。

可以选代数参数，使不同三角面的尾对 \(\tau=(h,k)\) 各不相同，同时排除行内相等或单位元的退化。理由是：对两个不同面，总有只属于其中一个面的顶点；固定其余参数，尾对相等在这个顶点方向至多有一个解。退化等式同理。有限个坏集合是 Haar 零测闭集，故其补集为非空开集；代数单位四元数稠密，可在其中选代数参数。固定这个代表，记
\[
z'=\sum_r a_r[g_r|h_r|k_r],\qquad \partial_4D=z'-z.
\]
闭三流形的每个三角面恰邻接两个四面体，因此合并相同尾对后，非零行只有
\[
A_\tau=\epsilon_f([g_f]-[1])
\quad\text{或}\quad
A_\tau=\epsilon_f([g_f^+]-[g_f^-]),
\qquad\epsilon_f\in\{1,-1\}.
\]
两项行的系数相反，是公共面定向抵消的结果。各行经右平移变为 \(\pm(R_{k_f}\mu-\mu)\)，其中第二种取 \(k_f=g_f^+(g_f^-)^{-1}\)。令 \(F_0\) 为这些不同的非平凡 \(k_f\)，\(m=|F_0|\)。

对有限实链 \(\mu\) 且 \(\varepsilon_G(\mu)=1\)，定义前插四链
\[
B_\mu(z')=\sum_{s,r}\mu_sa_r[s|g_r|h_r|k_r].
\]
五面边界和 \(\partial_3z'=0\) 给出精确公式
\[
z-\partial_4(B_\mu(z')-D)
=z'-\partial_4B_\mu(z')
=\sum_\tau(\iota_\tau)_*(\mu*A_\tau),
\qquad\iota_\tau(x)=(x,\tau).
\]
这里先合并了所有相同原子的系数。

这些行即使允许全部环境辅助点，仍可从真实自由质量中提取。取分离尺度 \(\eta>0\)，使不同尾对的 \(\eta\)-邻域不交，置
\[
\theta_\tau(q)=\max(0,1-d(q,\tau)/\eta),\qquad
L([x,q])=(\theta_\tau(q)[x])_\tau.
\]
凹性给出 \(|\theta_\tau(q)-\theta_\tau(q')|\le W_0(d(q,q'))/W_0(\eta)\)。把两点差拆成第一坐标差与系数差，前者至多一个非零分量，后者至多两个，故对全部有限分解取下确界得到
\[
\sum_\tau\rho_p(L_\tau x)
\le C_{Q,p}\rho_{G^3,W_0}(x),
\qquad C_{Q,p}=1+2W_0(\eta)^{-p}.
\]
因此，定义
\[
e_{p,W_0}(x)=\sum_{k\in F_0}\rho_p(R_kx-x),
\]
便有
\[
\rho_{G^3,W_0}\bigl(z-\partial_4(B_\mu(z')-D)\bigr)
\ge C_{Q,p}^{-1}e_{p,W_0}(\mu).
\]
提取算子定义在整个 \(G^3\)，所以这里已包含跨行抵消和任意辅助点。

\(F_0\) 生成稠密子群。若其生成群 amenable，有限 Følner 概率的各个 \(\ell^1\) 平移缺陷可同时趋零，但上述精确残差和有限有界配对给出
\[
0<E_\beta(z')\le\|\beta\|_\infty
\sum_f\|R_{k_f}\mu-\mu\|_{\ell^1},
\]
矛盾。\(\mathrm{SU}(2)\) 的真闭子群是有限群或圆群的有限扩张，在离散意义均 amenable，故这个非 amenable 子群的闭包只能是 \(G\)。所有矩阵条目又为代数数，Bourgain–Gamburd 定理于是给出 Haar 谱隙：存在 \(\kappa>0\)，使
\[
\sum_{k\in F_0}\|U_ku-u\|_2^2
\ge\kappa\|u-\gamma(u)\|_2^2,
\qquad U_kf(x)=f(xk^{-1}).
\]
这一步使用 Haar 正则表示的谱隙。

从 \(L^2\) 转移到 \(L^p\) 需要中位数。对实 \(f\in L^p\) 取中位数 \(c\)，则 \(u=(f-c)_+^{p/2}\)、\(v=(c-f)_+^{p/2}\) 的支撑测度各至多 \(1/2\)，其方差至少为各自平方范数的一半。又
\[
|a_+^{p/2}-b_+^{p/2}|^2\le|a-b|^p.
\]
分别应用谱隙并相加，得到
\[
\|f-c\|_p^p\le P\sum_{k\in F_0}\|U_kf-f\|_p^p,
\qquad P=4/\kappa.
\]
这只涉及实标量函数。

接下来构造频带测试。取实偶光滑函数 \(\eta_0\)，在 \([-1,1]\) 上为 1，在 \(|t|\ge2\) 时为零。对二进整数 \(N\) 置
\[
\begin{aligned}
K_N(\theta)&=\sum_{j\ge1}j\eta_0(j/N)
\frac{\sin(j\theta)}{\sin\theta},\\
S_Nf(x)&=\int_G K_N(xy^{-1})f(y)\,d\gamma(y),\\
T_N\mu(x)&=\sum_s\mu_sK_N(xs^{-1}).
\end{aligned}
\]
端点按连续极限解释。字符正交关系给出
\[
K_1=1,\qquad\int K_N\,d\gamma=1,\qquad
K_N*K_{RN}=K_N\quad(R\ge2),\qquad T_NR_k=U_kT_N.
\]
这里 \(R\) 也取二进整数。记 \(\Pi_D\) 为四元数四坐标次数不超过 \(D\) 的多项式限制，则 \(T_N\) 的像包含于 \(\Pi_{2N}\)。

核的尺度界可从有限 Fourier 和直接推出。令 \(H_N(\theta)=\sum_{j\in\mathbb Z}\eta_0(j/N)e^{ij\theta}\)，则 \(K_N=-H_N'/(2\sin\theta)\)。Poisson 求和把它写成 Fourier 变换的周期像之和；对变换反复分部积分，得到
\[
|H_N^{(l)}(\theta)|\le C_{A,l}N^{l+1}(1+N\theta)^{-A},
\qquad0\le\theta\le\pi.
\]
主周期像由 Schwartz 衰减控制，其余周期像到该区间的距离随周期指标线性增长，导数尾项因而可绝对求和。在 \(\theta\le1/N\) 用有限字符和，在 \(1/N\le\theta\le\pi/2\) 直接除以 \(\sin\theta\)；在另一端用 \(H_N'(\pi)=0\) 和
\[
\frac{H_N'(\pi-u)}{\sin u}
=-\frac{u}{\sin u}\int_0^1H_N''(\pi-tu)\,dt.
\]
它及其导数消除了端点奇性。因此对任意 \(A\) 都有
\[
|K_N(x)|\le C_AN^3(1+Nd_G(x,1))^{-A},\qquad
|\nabla K_N(x)|\le C_AN^4(1+Nd_G(x,1))^{-A}.
\]
取 \(Ap>3\)，三维径向积分及逐点梯度估计给出
\[
\begin{aligned}
\|K_N\|_p^p&\le C_pN^{-3(1-p)},\\
\|K_N(\cdot s^{-1})-K_N(\cdot t^{-1})\|_p^p
&\le C_pN^{-3(1-p)}\min(1,Nd_G(s,t))^p.
\end{aligned}
\]
小距离时先作逐点实函数均值估计再积分，大距离时用两项 \(p\) 次可加性。凹性又给
\[
\min(1,N\delta)\le W_0(\delta)/W_0(1/N).
\]
对任意分子分解逐项应用以上估计，再取下确界，得到连续延拓
\[
\|T_Nx\|_p^p\le C_pa_N\rho_p(x),\qquad
a_N=N^{-3(1-p)}(2+\log N)^p.
\]
根边由核本身的质量控制。这个界因此覆盖全部辅助点和完成元素。

还必须证明 \(S_N\) 在所需有限频带上的界。使用 Hopf 坐标
\[
y=(\sqrt u\cos\alpha,\sqrt u\sin\alpha,
\sqrt{1-u}\cos\beta,\sqrt{1-u}\sin\beta),\qquad
 d\gamma=du\,\frac{d\alpha}{2\pi}\,\frac{d\beta}{2\pi}.
\]
两角各取 \(L=2(R+1)N+1\) 个等距节点，\(u\) 方向取 \(J=(R+1)N+1\) 点 Gauss–Legendre 正求积。所得 \(Q\le32R^3N^3\) 个正权节点精确积分 \(\Pi_{2(R+1)N}\)：角频率严格小于 \(L\)，角平均后非零项的 \(u\) 次数至多 \((R+1)N\)。任意左平移后的节点仍精确。

对 \(g\in\Pi_{2RN}\)，\(y\mapsto K_N(xy^{-1})g(y)\) 落在这个频带。对每个平移参数 \(a\)，将积分写成精确有限和，取 \(p\) 次可加上界，先对 \(x\)、再对 \(a\) 作非负标量积分，并用 \(\sum_iw_i^p\le Q^{1-p}\)，得到
\[
\|S_Ng\|_p^p
\le\|K_N\|_p^p Q^{1-p}\|g\|_p^p
\le B_{p,R}\|g\|_p^p,
\qquad B_{p,R}=C_p(32R^3)^{1-p}.
\]
当 \(R=2\) 时可用 \(Q\le196N^3\)，取 \(B_p=C_p196^{1-p}\)。只在这些有限频带上使用卷积界，便可将
\[
T_Nx=S_N(T_{RN}x)
\]
延拓到全部 \(X_p\)。没有使用一般 \(L^p\) 卷积有界性，也没有作 \(X_p\)-值 Haar 积分。

**Lemma 9.3**（前插平均的一致正缺陷）. 对每个固定 \(0<p<1\)，存在 \(c_{F_0,p}>0\)，使所有 \(x\in X_p\) 满足
\[
e_{p,W_0}(x)\ge c_{F_0,p}|\varepsilon_G(x)|^p.
\]
特别是所有有限带符号质量一平均的缺陷都有同一个正下界。

证明. 令 \(f_n=T_{2^n}x\)，取实中位数 \(c_n\)，并置 \(h_n=f_n-c_n\)、\(a_n=2^{-3(1-p)n}(2+n\log2)^p\)。中位数转移和协变性给出
\[
\|h_n\|_p^p\le PC_pa_ne_{p,W_0}(x).
\]
相邻频带恒等式给
\[
c_n-c_{n+1}=S_{2^n}h_{n+1}-h_n,
\]
其中 \(h_{n+1}\in\Pi_{4\cdot2^n}\)，所以
\[
|c_n-c_{n+1}|^p
\le PC_pe_{p,W_0}(x)(a_n+B_pa_{n+1}).
\]
粗端为 \(c_0=\varepsilon_G(x)\)。细端满足
\[
|c_J|^p\le C_pa_J(\rho_p(x)+Pe_{p,W_0}(x))\longrightarrow0.
\]
对有限望远镜和先估计，再对每个固定 \(x\) 令 \(J\to\infty\)。由于
\[
\Lambda_p=\sum_{n\ge0}2^{-3(1-p)n}(2+n\log2)^p<\infty,
\]
得到
\[
|\varepsilon_G(x)|^p
\le PC_p(1+B_p)\Lambda_pe_{p,W_0}(x).
\]
可取 \(c_{F_0,p}=\kappa/[4C_p(1+B_p)\Lambda_p]\)。尾项只在固定 \(x\) 后取极限；所得常数与 \(x\) 无关，因此不要求一族平均有共同范数预算。∎

最后确定 \(p\to1^-\) 时的阶。令
\[
c_p^*=\inf_{\substack{\mu\in\mathbb R[G]\\\varepsilon_G(\mu)=1}}
e_{p,W_0}(\mu),\qquad \epsilon=1-p.
\]
固定二进尺度的估计不足以给出最优阶，改取
\[
R=2^{\lceil1/(3\epsilon\log2)\rceil}.
\]
在 \(1/2\le p<1\) 上，核定位可统一取 \(A=10\)，从而使用共同常数 \(C_*\)。同样的中位数望远镜给出
\[
1\le PC_*(1+B_{p,R})\Lambda_{p,R}e_{p,W_0}(x),
\qquad
\Lambda_{p,R}=\sum_{n\ge0}R^{-3\epsilon n}(2+n\log R)^p.
\]
所选尺度满足
\[
B_{p,R}\le16eC_*,\qquad
\Lambda_{p,R}\le\frac{2\epsilon^{-p}}{(1-e^{-1})^2}.
\]
所以对质量一的全部完成元素，
\[
e_{p,W_0}(x)\ge C_0\epsilon^p\ge C_0\epsilon,
\qquad C_0=\frac{\kappa(1-e^{-1})^2}
{8C_*(1+16eC_*)}>0.
\]

上界由真正有限的正平均达到同阶。给整数 \(H\ge8\)，在 Hopf 角坐标 \(\phi\in[0,\pi/2]\)、\(\alpha,\beta\in[0,2\pi]\) 中，分别取 \(H,8H,8H\) 个等距小区间的中点，共 \(64H^3\) 个节点。沿三个坐标方向走到中点的球面路径给出归一化覆盖半径 \(1/(2H)\)。按固定次序贪心保留与已有节点距离至少 \(1/H\) 的节点，得到分离度 \(1/H\)、覆盖半径 \(3/(2H)\) 的有限表 \(y_i\)。

取最近点 Borel 分割 \(A_i\)，平局按索引分配，定义
\[
\nu_H=\sum_i\gamma(A_i)[y_i],\qquad
t_{ij}^k=\gamma(A_i\cap A_jk).
\]
边际恒等式给出每个平移的精确分子分解
\[
R_k\nu_H-\nu_H
=\sum_{i,j}t_{ij}^k([y_jk]-[y_i]),\qquad
\sum_{i,j}t_{ij}^k=1.
\]
非零项的端点距离至多 \(3/H\)。固定一行，相关的 \(y_jk\) 彼此分离 \(1/H\)，位于半径 \(3/H\) 的球内。归一化球面角距离的球体积满足
\[
\gamma(B(1,r))=\int_0^r2\sin^2(\pi u)\,du,
\qquad \tfrac83r^3\le\gamma(B(1,r))
\le\tfrac{2\pi^2}{3}r^3\quad(0<r\le1/2).
\]
下界来自 \(\sin(\pi u)\ge2u\)，上界来自 \(\sin(\pi u)\le\pi u\)。比较互不相交的半径 \(1/(2H)\) 球与半径 \(7/(2H)\) 球，正项数不超过 \(343\pi^2/4<1024\)；\(H\ge8\) 保证所用半径都在上述区间。因此总非零项数至多 \(2^{16}H^3\)，有限正权的 \(p\)-质量界给出
\[
e_{p,W_0}(\nu_H)
\le m\,2^{16\epsilon}H^{3\epsilon}
(2+\log(H/3))^{-p}.
\]
取 \(H=2^{\lceil p/(3\epsilon\log2)\rceil}\)，得到 \(e_{p,W_0}(\nu_H)=O(\epsilon)\)，并且上极限系数不超过 \(3em\)。结合下界，
\[
c_p^*=\Theta_{F_0,W_0}(1-p)\qquad(p\to1^-).
\]
有限链稠密；若 \(\mu_j\to x\) 且 \(\varepsilon_G(x)=1\)，用
\[
\widetilde\mu_j=\mu_j+(1-\varepsilon_G(\mu_j))[1]
\]
修正总质量，便有 \(\rho_p(\widetilde\mu_j-x)\le2\rho_p(\mu_j-x)\to0\)。每个平移等距，故
\[
|e_{p,W_0}(x)-e_{p,W_0}(y)|\le2m\rho_p(x-y).
\]
这证明有限带符号 inf 与完成空间 inf 相同，而不必为完成元素选择原子测度表示。正概率 inf 也有同阶夹逼，但这里不声称它与带符号 inf 相等。

由行提取和上述上界，固定 prism 后的前插残差 inf
\[
I_p^{\mathrm{front}}(z)=
\inf_{\varepsilon_G(\mu)=1}
\rho_{G^3,W_0}\bigl(z-\partial_4(B_\mu(z')-D)\bigr)
\]
在固定 \(p<1\) 时严格为正，在 \(p\to1^-\) 时同样为 \(\Theta(1-p)\)；上界通过逐项前插上述有限分子分解得到。具体地，每个三圈项贡献
\[
a_rt_{ij}^{g_r}
([y_jg_r|h_r|k_r]-[y_i|h_r|k_r]),
\]
从而残差质量至多为
\[
\left(\sum_r|a_r|^p\right)2^{16\epsilon}H^{3\epsilon}
(2+\log(H/3))^{-p}.
\]
固定有限三圈的系数质量在 \(p\to1^-\) 时有界；尾对提取常数在 \(p\in[1/2,1]\) 上也一致有界，故上下界具有同一个一次阶。

但是，全局代价允许所有有限四链，因此只有
\[
\Delta_{p,W_0}(z)\le I_p^{\mathrm{front}}(z).
\]
前插族的正下界不能反向传给全局下确界。本文没有判定是否存在某个允许模使 \(\Delta_{p,\omega}(z)>0\)，也没有把一般四链参数化为前插链。一般 liquid 系数的主定理与 Hausdorff \(p\)-Banach 系数的问题，因而具有明确不同的结论范围。

## 参考文献

1. Peter Scholze，*Lectures on Analytic Geometry*。Theorem 6.5、Theorem 6.7、Theorem 6.9(2)，Lecture X 的 Proposition 10.1、Corollary 10.2、Question 10.4、Proposition 10.7。[讲义](https://people.mpim-bonn.mpg.de/scholze/Analytic.pdf)。

2. Tim Austin、Calvin C. Moore，*Continuity properties of measurable group cohomology*。Theorem A、Question 42。[论文](https://arxiv.org/abs/1004.4937)。

3. Aurel Page，*Computing arithmetic Kleinian groups*。Theorem 6。[论文](https://www.normalesup.org/~page/Recherche/Documents/articles/kln_gps.pdf)。

4. Alan W. Reid，*The geometry and topology of arithmetic hyperbolic 3-manifolds*。第 2.3 节。[综述](https://web.ma.utexas.edu/users/areid/kyoto2.pdf)。

5. James Farre，*Bounded cohomology of finitely generated Kleinian groups*。第 2.3 节。[论文](https://arxiv.org/abs/1706.02001)。

6. Jean Bourgain、Alex Gamburd，*A spectral gap theorem in SU(d)*，Journal of the European Mathematical Society 14 (2012)，1455–1511。Theorem 1。[论文](https://ems.press/content/serial-article-files/31848)。

7. Johannes Anschütz，*Solid group cohomology*。第 2 节关于一般 topos 的群上同调与 bar 下降。[讲义](https://janschuetz.perso.math.cnrs.fr/skripte/homology_profinite.pdf)。


