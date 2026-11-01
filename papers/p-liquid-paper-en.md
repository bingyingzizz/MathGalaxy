# Positive-degree cohomology of compact groups with p-liquid coefficients: A counterexample for general coefficients

## Abstract

For every \(0<p\le1\), we construct a \(p\)-liquid real vector space with trivial \(G=\mathrm{SU}(2)\) action,
\[
V_p=\operatorname{coker}\bigl(\partial_4:M_{<p}(G^4)\longrightarrow M_{<p}(G^3)\bigr),
\]
and prove that \(H^3(G,V_p)\ne0\). Here cohomology means derived group cohomology in the condensed classifying topos. Thus the assertion that compact groups have vanishing positive-degree cohomology with arbitrary trivial \(p\)-liquid real coefficients is false.

The proof has three steps. First, starting from the formal layer coordinates of free liquid objects and the relations defining real specialization, we prove that every bounded set-theoretic function has a well-defined evaluation on liquid chains at the ordinary point. Second, we use the compact real-place representation and the cocompact hyperbolic complex-place representation of the same arithmetic quaternion group. A field automorphism of \(\mathbb C\) pulls back the bounded volume 3-cocycle, and a finite fundamental 3-cycle of a closed hyperbolic 3-manifold gives a positive volume pairing. Finally, we prove that this finite 3-cycle has no liquid 4-chain filling. Its image in the cokernel above then gives a nonzero degree-three class through degreewise derived adjunction and an identification of double complexes.

The counterexample applies to general \(p\)-liquid coefficients, including \(p=1\), but its coefficient \(V_p\) cannot arise from a Hausdorff \(p\)-Banach space. We prove this nonrepresentability and give an exact cost criterion for transferring the same finite 3-cycle to \(p\)-Banach coefficients. For the family of prepending averages, a spectral gap, medians and finite-band quadrature give a uniform positive lower bound for each fixed \(p<1\), and the optimal defect has order \(\Theta(1-p)\). This result for a restricted family does not determine the cost when arbitrary 4-chains are allowed, so it does not settle the universal question for Hausdorff \(p\)-Banach coefficients.

## 1 Introduction

The mathematical formulation of Scholze's Question 0.10.4 is as follows. Let \(G\) be a compact group and let \(V\) be a \(p\)-liquid real vector space with trivial \(G\) action, for example a \(p\)-Banach real space of the type under consideration. Must one always have
\[
H^i(G,V)=0\qquad(i>0)?
\]
We retain the number 0.10.4 throughout this paper; the cited lecture-note PDF labels it Question 10.4.

The known vanishing results have different scopes. For finite groups, finite averaging divided by the group order contracts the real-coefficient complex. Corollary 0.10.2 treats compact abelian groups. For Banach coefficients, including the usual \(L^p\) spaces with \(p\ge1\), Haar averaging has the required linearity and continuity. Theorem A of Austin and Moore gives a comparison of measurable and continuous cohomology and compact-group vanishing within its class of Fréchet, locally convex coefficients. An extension to coefficients that are not locally convex is not a conclusion of that theorem. Likewise, Theorem 6.7 of the lecture notes gives vanishing over profinite spaces for \(p\)-Banach coefficients; this must be distinguished from the case of general compact Hausdorff spaces.

The difficulty is that a general liquid object need not carry a locally convex topology suitable for Haar integration. Even when the target is a \(p\)-Banach space, the argument using Banach-valued integration cannot simply be applied when \(p<1\). In addition, descent for the classifying space involves the full derived cohomology of the space in every simplicial degree. Computing only the ordinary bar complex of continuous functions does not automatically compute the groups \(H^i(G,V)\) in the question.

This paper gives a negative answer for general coefficients. For the single compact nonabelian group \(\mathrm{SU}(2)\) and every \(0<p\le1\), we give an explicit trivial coefficient \(V_p\) with nonzero degree-three cohomology. The proof is independent of low-degree vanishing and does not require free liquid objects to be projective. Section 9 explains why this conclusion does not include the Hausdorff \(p\)-Banach special case.

## 2 Preliminaries and external inputs

Write \(\mathcal A=\operatorname{Cond}(\mathbb R)\) for the category of condensed real vector spaces and \(\operatorname{Liq}_p(\mathbb R)\) for its full subcategory of \(p\)-liquid objects. Compact Hausdorff spaces and topological groups are identified with their associated condensed objects. Let \(*\) denote the ordinary point. The notation \(V(*)\) refers only to the real vector space of sections at that point; we do not equip it with an additional topology. We write \(\mathbb R[S]\) for the free condensed real vector space on \(S\) and \([s]\) for a Dirac element.

For a compact Hausdorff space \(S\), put
\[
M_{<p}(S)=\underset{0<r<p}{\operatorname{colim}}M_r(S).
\]
When discussing an individual expansion below, we use \(q\) for the smaller exponent. Context distinguishes this exponent from the cokernel map \(q:C_3\to V_p\). Unless otherwise indicated, all derived Hom objects are computed in \(\mathcal A\). We use \(H^i(G,V)\) for the degree-\(i\) cohomology of \(R\Gamma(BG,V)\).

We use the following inputs from the lecture notes, retaining their numbering.

1. **Proposition 10.1 and the discussion following it.** For compact Hausdorff \(S\), the formal free object \(M(S,\mathbb Z((T))_r)\) has a presentation by compact Hausdorff bounded disks and admits descent along profinite hypercovers. After real base change, the derived liquidification of the free condensed real object satisfies
\[
L\operatorname{liq}_p(\mathbb R[S])\simeq M_{<p}(S)[0].
\]
This input constructs the chain objects, supplies the formal coordinates and lifts with compact parameters in Section 4 and gives the degreewise derived comparison in Section 8.

2. **Proposition 10.7.** Every element of \(M_{<p}(S)(*)\) has a countable atomic expansion
\[
x=\sum_j a_j[s_j],\qquad \sum_j|a_j|^q<\infty
\quad\text{for some }0<q<p.
\]
This provides a summable representation of each individual element at the ordinary point. The warning following that proposition about colimits remains essential: countable support for each element does not imply that a family with compact parameters has a common countable support.

3. **Theorem 6.5.** The subcategory \(\operatorname{Liq}_p(\mathbb R)\) is closed under kernels, cokernels and extensions in \(\mathcal A\). Its derived embedding has the full faithfulness and derived adjunction stated in the notes. Closure under cokernels ensures that our coefficient is admissible. Together with Proposition 10.1, the derived statements give the derived Hom equivalence in Section 8.4.

4. **Corollary 0.10.2, labeled Corollary 10.2 in the PDF.** Compact abelian groups have vanishing positive-degree cohomology in the stated class of trivial \(p\)-liquid real coefficients. We use this only to describe the known scope of the question, not to prove the counterexample.

Section 4.4 also uses the description by profinite measures in Definition 6.3, Theorem 6.9(2) and the discussion of real specialization in the notes: for \(r=2^{-q}\), the relations for real specialization at \(T=1/2\) are generated by \(2-T^{-1}\). Section 5 uses the arithmetic Kleinian lattice theorem. Section 6 uses the uniform volume bound for straight hyperbolic tetrahedra and Stokes' formula. Section 9.3 uses the Bourgain–Gamburd spectral gap theorem for the Haar representation. The relevant hypotheses and the role of each input are stated where it is used.

Evaluation at the ordinary point is exact on condensed abelian groups. Indeed, a section over \(*\) of the target of an epimorphism lifts locally along a nonempty profinite cover. Pulling such a local lift back along a point of the cover gives a lift over \(*\). More general exactness assertions in descent must be proved with parameters; they cannot be inferred in the reverse direction from calculations at the ordinary point.

## 3 The complex and the detecting 3-cycle

Fix \(G=\mathrm{SU}(2)\) and \(0<p\le1\), and set
\[
C_n=M_{<p}(G^n),\qquad C_0=\mathbb R.
\]
We use the unnormalized inhomogeneous bar boundary for the trivial action:
\[
\begin{aligned}
\partial_n[g_1|\cdots|g_n]
={}&[g_2|\cdots|g_n]\\
&+\sum_{j=1}^{n-1}(-1)^j
[g_1|\cdots|g_jg_{j+1}|\cdots|g_n]
+(-1)^n[g_1|\cdots|g_{n-1}].
\end{aligned}
\]
Each face comes from continuous group operations and therefore induces a liquid linear morphism. The simplicial identities give \(\partial_{n-1}\partial_n=0\). In particular,
\[
\partial_3[g|h|k]=[h|k]-[gh|k]+[g|hk]-[g|h],
\]
\[
\partial_4[g|h|k|\ell]
=[h|k|\ell]-[gh|k|\ell]+[g|hk|\ell]
-[g|h|k\ell]+[g|h|k].
\]
Put \(Z_3=\ker\partial_3\). We call a finite chain \(z\in\mathbb R[G^3]\) a detecting 3-cycle if \(\partial_3z=0\) and there is a bounded real function \(\beta:G^3\to\mathbb R\) such that
\[
\delta\beta=0,\qquad E_\beta(z)\ne0.
\]
Here \(\delta\) is the formula dual to the boundary above, and \(E_\beta\) is evaluation at the ordinary point, constructed in Section 4. The function \(\beta\) is not required to be continuous. Section 7 will prove that such a \(z\) does not belong to \(\partial_4(C_4(*))\).

## 4 Evaluation of bounded functions on liquid chains

### 4.1 Absolute convergence of the expansion

Let \(S\) be compact Hausdorff and let \(x\in M_{<p}(S)(*)\). Proposition 10.7 gives an exponent \(0<q<p\le1\) and an expansion \(x=\sum_j a_j[s_j]\) satisfying \(\sum_j|a_j|^q<\infty\). Scalar \(q\)-subadditivity gives
\[
\sum_j|a_j|\le\left(\sum_j|a_j|^q\right)^{1/q}<\infty.
\]
Consequently, for every bounded function \(f:S\to\mathbb R\), the series \(\sum_j a_jf(s_j)\) converges absolutely. Repeated points may be combined. What remains to be proved is that the sum depends only on the liquid element itself.

### 4.2 Functionals from continuous functions

By the adjunction for free liquid objects, a continuous function \(\varphi:S\to\mathbb R\) induces a morphism
\[
L_\varphi:M_{<p}(S)\longrightarrow\mathbb R,
\qquad L_\varphi([s])=\varphi(s).
\]
This morphism is compatible with summable expansions:
\[
L_\varphi\left(\sum_j a_j[s_j]\right)
=\sum_j a_j\varphi(s_j).
\]
To make the infinite summation in this compatibility explicit, fix \(r=2^{-q}\) and write a formal lift as \(\mu=\sum_n\mu_nT^n\), where \(\mu_n=\sum_s c_{n,s}[s]\) is a finite integral chain and \(\sum_{n,s}|c_{n,s}|r^n\le c\). Its evaluation after real specialization is
\[
\sum_{n,s}c_{n,s}2^{-n}\varphi(s).
\]
The nonzero layers have a common lower bound \(n_0\). Since \(t=1/2<r\),
\[
\sum_{n\ge N,s}|c_{n,s}|t^n|\varphi(s)|
\le\|\varphi\|_\infty c(t/r)^N.
\]
The finite sum in each layer is continuous, and the tails tend uniformly to zero on any fixed bounded disk. This gives a continuous functional on the disk. Shifting indices and rearranging the absolutely convergent sums shows that the functional annihilates \((2-T^{-1})\mu\). Section 4.4 proves that real specialization is exactly this quotient and verifies that summation in layer coordinates agrees with every atomic expansion. Thus this argument does not impose an unproved atomic topology as the condensed structure.

### 4.3 Well-definedness (Lemma + proof)

**Lemma 4.1** (Bounded atomic evaluation). Let \(S\) be compact Hausdorff, let \(0<p\le1\) and let \(f:S\to\mathbb R\) be a bounded set-theoretic function. Then the formula
\[
E_f:M_{<p}(S)(*)\longrightarrow\mathbb R,
\qquad E_f\left(\sum_j a_j[s_j]\right)=\sum_j a_jf(s_j)
\]
defines a real linear map. If \(a:S\to S'\) is continuous, then \(E_fa_*=E_{f\circ a}\).

Proof. Absolute convergence was proved in Section 4.1. Suppose that \(\sum_j a_j[s_j]=0\). The continuous test functionals give \(\sum_j a_j\varphi(s_j)=0\) for every continuous real function \(\varphi\). Thus the atomic Radon measure of finite total variation
\[
\mu=\sum_j a_j\delta_{s_j}
\]
integrates to zero against every continuous real function. Continuous functions on a compact Hausdorff space separate finite Radon measures, so \(\mu=0\). In particular, the coefficient of every combined atom is zero: \(\sum_{j:s_j=s}a_j=0\). Absolute convergence permits grouping the terms, giving \(\sum_j a_jf(s_j)=0\). Applying this to the difference of two expansions proves independence of the expansion. Concatenating expansions proves linearity, and rearranging the sums after pushforward on finite layers proves naturality. The compatibility between expansions and continuous functionals used here is supplied by the real quotient calculation in the next subsection. That calculation also proves uniqueness of atomic coordinates directly. ∎

This conclusion concerns only the ordinary point. For example, let \(S=\mathbb N\cup\{\infty\}\) be the one-point compactification and take \(f(n)=1\) and \(f(\infty)=0\). Along the Dirac family, \([n]\) tends to \([\infty]\), whereas the respective evaluations are 1 and 0. Hence \(E_f\) cannot in general be a condensed morphism. No measurability assumption on \(f\) is needed.

### 4.4 The arithmetic source of well-definedness (explicit division)

Fix \(0<q<p\le1\), and put
\[
r=2^{-q},\qquad A_r=\mathbb Z((T))_r,\qquad
F_r(S)=M(S,A_r),\qquad d=2-T^{-1}.
\]
Thus \(1/2<r<1\). At the ordinary point, the formal object has unique layer coordinates
\[
\mu=\sum_{n\in\mathbb Z}\mu_nT^n,
\quad \mu_n\in\mathbb Z[S],\quad
\sum_n r^n\|\mu_n\|_1<\infty.
\]
A nonzero integral chain has mass at least 1, so the nonzero layers have a common lower bound. The profinite real specialization formula in Theorem 6.9(2) is \(M_q(P)=F_r(P)/dF_r(P)\). We first explain why this also holds for a general compact Hausdorff space \(S\).

Choose a profinite hypercover \(P_\bullet\to S\). Write \(\pi:P_0\to S\) for its augmentation and \(\varepsilon_0,\varepsilon_1:P_1\to P_0\) for its two face maps, and put
\[
D_1=(\varepsilon_0)_*-(\varepsilon_1)_*.
\]
If \(\pi_*\mu=0\), then in each layer the integral coefficients sum to zero in every fiber of \(\pi\). Pair the positive and negative integral coefficients one unit at a time. Lift each pair using the surjection \(P_1\to P_0\times_SP_0\). This produces finite chains \(\eta_n\) satisfying
\[
D_1\eta_n=\mu_n,\qquad
\|\eta_n\|_1\le\tfrac12\|\mu_n\|_1,
\qquad
\sum_n r^n\|\eta_n\|_1
\le\tfrac12\sum_n r^n\|\mu_n\|_1.
\]
It follows that \(\eta\in F_r(P_1)(*)\). Similarly, lifting each support point in each layer gives a lift through \(\pi_*\) that preserves mass and proves surjectivity at the ordinary point.

The pairing argument must also establish exactness as sheaves. Let \(\mu\) be a kernel section over a profinite test space \(U\), with image in a compact disk of radius \(c\). By Proposition 10.1, the space
\[
L=\{(u,\eta)\in U\times F_r(P_1)_{\le c/2}:
D_1\eta=\mu(u)\}
\]
is compact Hausdorff. The pointwise pairing argument shows that \(L\to U\) is surjective. Choose a profinite surjection \(Q\to L\). The cover \(Q\to U\) then supplies a local lift. Surjectivity with mass preserved is handled by the same pullback construction on compact disks. Hence
\[
F_r(P_1)\xrightarrow{D_1}F_r(P_0)
\xrightarrow{\pi_*}F_r(S)\longrightarrow0
\]
is exact in the condensed category. The fact that a section lies in a single disk follows from the filtered presentation by disks and the finite-cover property of the site. We have not used ordinary points to detect exactness.

The map \(D_1\) commutes with the scalar \(d\). Degree-zero descent after real base change therefore gives
\[
\begin{aligned}
M_q(S)
&=\operatorname{coker}\bigl(F_r(P_1)/dF_r(P_1)
\longrightarrow F_r(P_0)/dF_r(P_0)\bigr)\\
&=F_r(P_0)/(\operatorname{im}D_1+dF_r(P_0))
=F_r(S)/dF_r(S).
\end{aligned}
\]
The equivalent kernel identity is \(\pi_*^{-1}(dF_r(S))=\operatorname{im}D_1+dF_r(P_0)\). To see it, locally lift the element before multiplication by \(d\), then subtract \(d\) times that lift. Since evaluation at the ordinary point is exact, this is also the actual quotient of ordinary-point sections.

Now define, using only the unique formal layer coordinates,
\[
\mathcal A_r(\mu)=\sum_{n\in\mathbb Z}2^{-n}\mu_n
=(\alpha_s)_{s\in S},\qquad
\alpha_s=\sum_n2^{-n}c_{n,s}.
\]
The sum converges absolutely in the abstract space \(\ell^1(S)\). Since the coefficients are integers, \(|c_{n,s}|^q\le|c_{n,s}|\), and consequently
\[
\sum_s|\alpha_s|^q
\le\sum_{n,s}|c_{n,s}|^q2^{-nq}
\le\sum_n r^n\|\mu_n\|_1.
\]
An index shift and rearrangement of absolutely convergent sums immediately give \(\mathcal A_r(d\nu)=0\). Conversely, suppose that \(\mathcal A_r(\mu)=0\), and define
\[
\nu_n=-\sum_{k<n}2^{n-1-k}\mu_k.
\]
Because the nonzero layers are bounded below, each sum is finite, each \(\nu_n\) is a finite integral chain and the lower layers vanish. The recurrence
\[
\nu_{n+1}=2\nu_n-\mu_n
\]
shows that \(d\nu=\mu\). To verify that \(\nu\) still belongs to the formal object, use the vanishing total atomic sum to rewrite it as an absolutely convergent tail:
\[
\nu_n=\sum_{k\ge n}2^{n-1-k}\mu_k.
\]
Rearranging nonnegative terms gives
\[
\begin{aligned}
\sum_n r^n\|\nu_n\|_1
&\le\sum_k\|\mu_k\|_1
\sum_{\substack{n\in\mathbb Z\\n\le k}}2^{n-1-k}r^n\\
&=\frac{r}{2r-1}\sum_k r^k\|\mu_k\|_1<\infty.
\end{aligned}
\]
The inner sum starts at negative infinity. Its value follows from
\[
2^{-k-1}\sum_{n=-\infty}^k(2r)^n
=\frac{r^{k+1}}{2r-1}.
\]
Retaining the actual finite lower bound only decreases the upper bound. The positivity of the denominator is precisely the condition \(r>1/2\). We have therefore proved the exact identity
\[
\ker\mathcal A_r=dF_r(S)(*).
\]

We must also show that the coordinate description includes every summable atomic family. Given \((a_s)\in\ell^q(S)\), choose, for each nonzero coefficient, a binary expansion with digits of the same sign:
\[
a_s=\sum_{n\ge m_s}\epsilon_{n,s}2^{-n},\qquad
\epsilon_{n,s}\in\{-1,0,1\},\qquad
2^{-m_s}\le|a_s|<2^{-m_s+1}.
\]
Each layer has only finitely many nonzero digits, since otherwise \(\sum_s|a_s|^q\) would diverge. Boundedness of the coefficients gives a common lower bound on the layers. Set \(\widehat\mu_n=\sum_s\epsilon_{n,s}[s]\). Then
\[
\sum_{n,s}|\epsilon_{n,s}|r^n
\le\frac1{1-r}\sum_s|a_s|^q<\infty.
\]
This defines a lift, and \(\mathcal A_r(\widehat\mu)=a\). The difference between two binary representations lies in the kernel already computed. The absolutely convergent convolution defining formal scalar multiplication satisfies
\[
\mathcal A_r(h\mu)=h(1/2)\mathcal A_r(\mu).
\]
Thus the isomorphism on the real quotient is indeed real linear:
\[
M_q(S)(*)\cong\ell^q(S).
\]

For an expansion with repeated points, first take a binary lift of each coefficient, then combine the terms in the finite free group in each layer. The resulting coordinate at \(s\) is exactly \(\sum_{j:s_j=s}a_j\). This agrees with natural liquid summation. Indeed, extend \(j\mapsto s_j\) to \(\beta\mathbb N\to S\). On every finite clopen partition of \(\beta\mathbb N\), assign to a part \(A\) the coefficient \(\sum_{j\in A\cap\mathbb N}a_j\). These coefficients are compatible and have uniformly bounded \(q\)-mass. Specializing the binary lift gives exactly this family of coefficients. Pushing forward to \(S\) gives the asserted expansion.

If \(q_1<q_2<p\), these isomorphisms identify the transition map with the inclusion that preserves atomic coefficients. Filtered colimits are computed at the ordinary point, so
\[
M_{<p}(S)(*)\cong\bigcup_{0<q<p}\ell^q(S).
\]
Starting from all the relations in the real quotient, this proves uniqueness of the combined atomic coefficients. It supplies the summation compatibility needed in Section 4.2 and independently proves Lemma 4.1. The formula remains a description of vector spaces at the ordinary point. It neither specifies a common support for families with compact parameters nor identifies \(M_q(S)\) with the usual atomic quasi-norm topology.

There is a concrete test for this distinction concerning common support. Let \(I\) be an uncountable discrete set and let \(S=I\cup\{\infty\}\) be its one-point compactification. This space is profinite. The closure \(K\) of any countable subset is still countable and is therefore strictly smaller than \(S\). Each point in the Dirac family \(S\to M_q(S)\) has just one atom, but the whole family cannot factor through any \(M_q(K)\). For \(s\notin K\), injectivity of atomic coordinates shows that \([s]\) cannot be generated by atoms in \(K\). If this condensed object were the filtered colimit of these subobjects with countable closed support, taking sections on the profinite test object \(S\) would force the Dirac family into one subobject, a contradiction. Thus countability for individual elements cannot justify interchanging compact parameters and supports. We retain lifts with compact parameters in descent to avoid exactly this error.

## 5 Arithmetic input

### 5.1 The number field and the quaternion algebra

Let \(\alpha=\sqrt[3]{2}>0\) and \(k=\mathbb Q(\alpha)\subset\mathbb R\). Eisenstein's criterion gives \([k:\mathbb Q]=3\). The three embeddings send \(\alpha\) to \(\alpha,\zeta_3\alpha,\zeta_3^2\alpha\), respectively, so \(k\) has exactly one real place and one pair of complex places. Take
\[
B=(-1,-1)_k
=k\langle I,J\rangle/(I^2=J^2=-1,\ IJ=-JI),\qquad K=IJ,
\]
and the order
\[
\mathcal O=\mathcal O_k\oplus\mathcal O_kI
\oplus\mathcal O_kJ\oplus\mathcal O_kK.
\]
At the unique real place, \(B\) is the Hamilton quaternion algebra, so it ramifies there. A quaternion algebra split over \(k\) would split at every real place. Hence \(B\) is a division algebra. At a complex place, however, \(B\otimes_{k,\tau}\mathbb C\cong M_2(\mathbb C)\).

### 5.2 The lattice and torsion-freeness

We use the arithmetic Kleinian lattice theorem: if a number field has exactly one complex place and a quaternion algebra ramifies at every real place, then the reduced-norm-one group of an order projects at the complex place to a lattice of finite covolume in \(\mathrm{PSL}_2(\mathbb C)\). If the algebra is a division algebra, the lattice is cocompact. See Theorem 6 of Page or the survey by Reid. The field \(k\) and algebra \(B\) above satisfy all these hypotheses.

Set
\[
\Gamma=\mathcal O^1\cap(1+3\mathcal O).
\]
Since \(\mathcal O/3\mathcal O\) is finite, \(\Gamma\) has finite index in \(\mathcal O^1\). For torsion-freeness, express left multiplication on the rank-12 free integral module \(\mathcal O\) as a faithful representation \(\mathcal O^1\to\mathrm{GL}_{12}(\mathbb Z)\). The image of \(\Gamma\) lies in the principal congruence kernel modulo 3.

Suppose that this kernel contains a nonidentity finite-order matrix. By replacing it with a suitable power, we may assume its order is a prime \(\ell\). Write
\[
A=1+3^sD,\qquad s\ge1,\qquad D\not\equiv0\pmod3.
\]
If \(\ell\ne3\), the smallest 3-adic valuation among the matrix entries of the term \(\ell3^sD\) in the binomial expansion is \(s\), whereas every other term has strictly higher valuation. If \(\ell=3\), then
\[
A^3-1=3^{s+1}D+3^{2s+1}D^2+3^{3s}D^3.
\]
The smallest valuation of the first term is \(s+1\), and those of the remaining terms are at least \(s+2\). Neither expansion can vanish. This contradiction proves that \(\Gamma\) is torsion-free. Its projection at the complex place remains a cocompact lattice.

### 5.3 The real-place embedding

The matrix representation at the real place is
\[
\rho_0(a+bI+cJ+dK)
=\begin{pmatrix}
a+bi&c+di\\
-c+di&a-bi
\end{pmatrix}.
\]
The matrices representing \(I,J\) satisfy the quaternion relations, and
\[
\det\rho_0(x)=a^2+b^2+c^2+d^2=\operatorname{Nrd}(x).
\]
At the real place, the norm-one condition also gives unitarity. Restriction therefore gives a faithful group embedding \(\rho_0:\Gamma\hookrightarrow\mathrm{SU}(2)\). All its matrix entries belong to \(k(i)\).

### 5.4 The field automorphism

The polynomial \(X^3-2\) remains irreducible over \(\mathbb Q(i)\). Otherwise a reducible cubic would have a root in \(\mathbb Q(i)\), but every root has degree 3 over \(\mathbb Q\) and cannot belong to a quadratic extension. Thus there is a field embedding
\[
\tau:k(i)\longrightarrow\mathbb C,\qquad
\tau(\alpha)=\zeta_3\alpha,\quad\tau(i)=i.
\]
Here \(\zeta_3\notin k(i)\). Indeed, otherwise \(k(i)\) would contain \(\mathbb Q(i,\zeta_3)\), a biquadratic field of degree 4, contradicting the tower formula because \([k(i):\mathbb Q]=6\). This also shows that \(\tau\) is an embedding into another conjugate subfield; it need not be an automorphism of \(k(i)\).

Extend \(\tau\) to an automorphism of \(\overline{\mathbb Q}\). Choose a transcendence basis for \(\mathbb C/\overline{\mathbb Q}\), extend by the identity on that basis, then extend to the algebraic closure. This gives \(\sigma\in\operatorname{Aut}(\mathbb C)\). No continuity is required of this field automorphism.

### 5.5 Relation between the two representations

Applying \(\sigma\) entrywise to matrices defines an abstract group homomorphism
\[
\rho=\sigma|_{\mathrm{SU}(2)}:
\mathrm{SU}(2)^\delta\longrightarrow\mathrm{SL}_2(\mathbb C)^\delta.
\]
The superscript \(\delta\) means that topology is forgotten. Since \(\sigma\) fixes \(i\), applying it entrywise on \(\rho_0(\Gamma)\) embeds the coefficients through the complex place \(\tau\). Consequently, if \(\rho_2\) denotes the complex-place representation, then strictly
\[
\rho\circ\rho_0=\rho_2.
\]
Let \(\Lambda\) be the projection of \(\rho_2\) to \(\mathrm{PSL}_2(\mathbb C)\). The kernel of this projection is contained in \(\{1,-1\}\), and \(-1\notin\Gamma\). If the projected image had a finite-order element, a suitable power of its preimage would be \(\pm1\), again contradicting torsion-freeness of \(\Gamma\). Thus \(\Gamma\cong\Lambda\), and \(\Lambda\) is a torsion-free cocompact lattice.

It follows that
\[
M=\Lambda\backslash\mathbb H^3
\]
is a closed oriented hyperbolic 3-manifold, with \(\pi_1(M)\cong\Gamma\) and \(\operatorname{Vol}(M)>0\). The compact-place image \(\rho_0(\Gamma)\) is only an abstract subgroup of \(G\). The discrete lattice in hyperbolic geometry is the complex-place image \(\Lambda\). The identity between the two representations is an algebraic identity, not a topological comparison.

## 6 The volume cocycle and the finite 3-cycle

### 6.1 Straight hyperbolic tetrahedra

Fix \(o\in\mathbb H^3\), and define
\[
v(A,B,C)=\operatorname{Vol}_{\mathrm{or}}
[o,Ao,ABo,ABCo],\qquad A,B,C\in\mathrm{SL}_2(\mathbb C).
\]
Write \(F(x_0,x_1,x_2,x_3)\) for the homogeneous form. The uniform volume bound for straight hyperbolic tetrahedra gives \(|v|\le v_3\), where \(v_3\) is the volume of the regular ideal tetrahedron. Straightening commutes with the boundary, and the volume form is closed. Stokes' formula therefore gives the five-point identity
\[
\sum_{j=0}^4(-1)^j
F(x_0,\ldots,\widehat{x_j},\ldots,x_4)=0.
\]
Substitute \((o,Ao,ABo,ABCo,ABCDo)\) and use invariance of volume under isometries. The result is
\[
v(B,C,D)-v(AB,C,D)+v(A,BC,D)
-v(A,B,CD)+v(A,B,C)=0.
\]
Thus \(\delta v=0\). The integration here involves only ordinary finite geometric simplices.

### 6.2 The bounded 3-cocycle

Define
\[
\beta(g,h,k)=v(\rho(g),\rho(h),\rho(k)).
\]
Since \(\rho\) is an abstract group homomorphism, \(\delta\beta=0\), and \(\|\beta\|_\infty\le v_3\). This is a bounded 3-cocycle on the discrete group \(G^\delta\).

The function \(\beta\) is not continuous for the compact topology. Indeed, if it were continuous, ordinary real scalar Haar integration would define
\[
u(g,h)=\int_G\beta(t,g,h)\,d\gamma(t).
\]
Integrating \(\delta\beta(t,g,h,k)=0\) and using right invariance for the second term would give \(\beta=\delta u\). Its pairing with every finite 3-cycle would then vanish, contradicting the positive volume pairing constructed in Section 6.4. This argument uses only scalar integration. It does not regard \(\beta\) as a liquid real-coefficient cocycle; the admissible coefficient cocycle for the counterexample is constructed separately in Section 8.

### 6.3 A finite bar representative of degree one

Choose a finite ordered triangulation of \(M\), and denote its oriented fundamental 3-cycle by \(w\). Lift the triangulation to \(\mathbb H^3\), and choose a representative \(\widetilde v_a\) for each vertex orbit. Define a vertex map by
\[
\widetilde f(\gamma\widetilde v_a)=\rho_2(\gamma)o.
\]
Extend it on each simplex by the same geodesic straightening, compatibly with faces. This gives a continuous \(\Gamma\)-equivariant map \(\widetilde f:\mathbb H^3\to\mathbb H^3\). The ordered vertices on a common face agree, so the straight simplices do glue together.

The unique geodesic between two points gives an explicit homotopy
\[
\widetilde H(x,t)=\text{the point at parameter }t
\text{ on the geodesic from }x\text{ to }\widetilde f(x).
\]
This homotopy is continuous and \(\Gamma\)-equivariant. It descends to a homotopy between \(\operatorname{id}_M\) and \(f:M\to M\). Therefore
\[
f_*[M]=[M],\qquad\deg f=1.
\]

For every oriented tetrahedron in \(w\), choose a lift and write its vertices as \(\gamma_i\widetilde v_{a_i}\). Assign to it the coinvariant of the homogeneous bar simplex \([\gamma_0,\gamma_1,\gamma_2,\gamma_3]\). Changing the lift simultaneously left-multiplies all vertices. The common faces cancel with the orientations of the fundamental chain. In inhomogeneous notation, each term is
\[
[\gamma_0^{-1}\gamma_1\mid
\gamma_1^{-1}\gamma_2\mid\gamma_2^{-1}\gamma_3].
\]
The resulting finite chain \(z_\Gamma\in\mathbb R[\Gamma^3]\) satisfies \(\partial_3z_\Gamma=0\). Its volume evaluation equals the integral over \(f_*w\), so
\[
\langle\rho_2^*v,z_\Gamma\rangle
=\int_{f_*w}\mathrm{vol}_M
=\langle[\mathrm{vol}_M],f_*[M]\rangle
=\operatorname{Vol}(M)>0.
\]
This constructs a finite bar representative compatible with the chosen volume cocycle. Its degree is one by the equivariant homotopy above.

### 6.4 Pushing forward to \(G\)

**Lemma 6.1** (Finite detecting 3-cycle). Let \(z=(\rho_0)_*z_\Gamma\in\mathbb R[G^3]\). Then, for every \(0<p\le1\), it satisfies in \(C_3(*)\)
\[
\partial_3z=0,\qquad E_\beta(z)=\operatorname{Vol}(M)>0.
\]

Proof. A group homomorphism induces a bar chain map, so \(\partial_3z=(\rho_0)_*\partial_3z_\Gamma=0\). Finite Dirac chains map naturally into every \(M_{<p}(G^3)(*)\). The identity \(\rho\rho_0=\rho_2\) gives
\[
E_\beta(z)=\langle\rho_2^*v,z_\Gamma\rangle
=\operatorname{Vol}(M).
\]
This pairing has only finitely many terms, so it requires neither infinite integration nor continuity. ∎

## 7 The detecting 3-cycle is not a boundary

**Lemma 7.1** (Nonexistence of a liquid filling). For every \(0<p\le1\), the cycle \(z\) of Lemma 6.1 does not belong to \(\partial_4(C_4(*))\). Consequently, \(H_3(C_\bullet)(*)\ne0\), and \(\partial_4:C_4\to Z_3\) is not an epimorphism.

Proof. For atomic coordinates \(x=\sum_s a_s[s]\) with a fixed exponent \(0<q<p\), define
\[
m_q(x)=\sum_s|a_s|^q.
\]
The coordinate description in Section 4 is compatible with continuous pushforward. Summing coefficients in each fiber and applying \(q\)-subadditivity gives \(m_q(a_*x)\le m_q(x)\). The boundary \(\partial_4\) has five faces, so
\[
m_q(\partial_4\xi)\le5m_q(\xi),\qquad
|E_\beta(x)|\le\|\beta\|_\infty m_q(x)^{1/q}.
\]
Given \(b\in C_4(*)\), choose an expansion \(b=\sum_j a_j[x_j]\) for some \(q<p\), and put \(b_N=\sum_{j\le N}a_j[x_j]\). The finite cocycle identity gives
\[
E_\beta(\partial_4b_N)=\sum_{j\le N}a_j(\delta\beta)(x_j)=0.
\]
On the other hand,
\[
\begin{aligned}
m_q(\partial_4(b-b_N))&\le5\sum_{j>N}|a_j|^q\longrightarrow0,\\
|E_\beta(\partial_4b)-E_\beta(\partial_4b_N)|
&\le\|\beta\|_\infty
\left(5\sum_{j>N}|a_j|^q\right)^{1/q}\longrightarrow0.
\end{aligned}
\]
Hence \(E_\beta(\partial_4b)=0\). If \(\partial_4b=z\), this contradicts \(E_\beta(z)=\operatorname{Vol}(M)>0\).

Exactness at the ordinary point identifies \(H_3(C_\bullet)(*)\) with the third homology of the ordinary-point chain complex. Thus this point without a filling gives nonzero homology and rules out epimorphy. We use only the implication that an epimorphism must be surjective at the ordinary point. We do not use the converse, nor do we use ordinary points to detect whether all objects vanish. ∎

## 8 The coefficient \(V_p\) and the non-zero class

### 8.1 \(V_p\) is \(p\)-liquid

Define in \(\mathcal A\)
\[
V_p=\operatorname{coker}(\partial_4:C_4\to C_3),
\qquad q:C_3\longrightarrow V_p.
\]
Equip \(V_p\) with the trivial \(G\) action. Proposition 10.1 implies that \(C_3,C_4\) are \(p\)-liquid, and closure under cokernels in Theorem 6.5 implies the same for \(V_p\). This cokernel agrees with the condensed cokernel. By exactness at the ordinary point and Lemma 7.1,
\[
q(z)\ne0\quad\text{in }V_p(*).
\]

### 8.2 The cocycle \(c_p\)

Composing the Dirac family with the cokernel map gives a condensed morphism
\[
c_p:G^3\longrightarrow V_p,\qquad
c_p(g,h,k)=q([g|h|k]).
\]
Since \(q\partial_4=0\), it satisfies the strict cocycle identity \(\delta c_p=0\). In linear form it is the chain map
\[
Q:C_\bullet\longrightarrow V_p[3],\qquad Q_3=q,
\]
whose only nonzero component is in chain degree 3. Here \(V_p[3]\) is placed in chain degree 3, or equivalently cochain degree \(-3\). We use the unnormalized bar complex. Removing degenerate chains is a chain homotopy equivalence, and this particular representative need not vanish on degenerate elements.

### 8.3 The class is non-zero

To avoid mistaking failure to be an ordinary cochain boundary for derived nonvanishing, choose an injective resolution \(V_p\hookrightarrow I^0\to I^1\to\cdots\) in \(\mathcal A\). Denote the initial monomorphism by \(\iota\). Map \(Q\) into the total complex \(\operatorname{Tot}\operatorname{Hom}_{\mathcal A}(C_n,I^m)\), with total cochain degree \(n+m\). Its only nonzero component is \(\iota q:C_3\to I^0\).

If \(Q=dR\), the boundary of a total-degree-two element \(R\) can contribute in bidegree \((3,0)\) only through \(R_{2,0}:C_2\to I^0\). Thus
\[
\iota q=R_{2,0}\partial_3.
\]
Evaluating on the detecting 3-cycle gives
\[
\iota q(z)=R_{2,0}(\partial_3z)=0.
\]
Since \(\iota\) is a monomorphism, this says \(q(z)=0\), contradicting Section 8.1. Hence \(Q\) is nonzero in the third cohomology of the derived Hom object. Equivalently, its action on third homology is the nonzero monomorphism
\[
H_3(C_\bullet)=\ker\partial_3/\operatorname{im}\partial_4
\hookrightarrow C_3/\operatorname{im}\partial_4=V_p.
\]
A zero derived morphism cannot have this action on homology.

### 8.4 Computing the class in \(H^3(G,V_p)\)

Let \(K_n=\mathbb R[G^n]\). The Dirac unit \(u_n:K_n\to C_n\) is compatible with all face and degeneracy maps. The derived adjunction and full faithfulness in Theorem 6.5, together with the derived liquidification concentrated in degree zero from Proposition 10.1, give a natural quasi-isomorphism for every compact Hausdorff \(S\) and liquid \(V\):
\[
\operatorname{RHom}_{\mathcal A}(M_{<p}(S),V)
\xrightarrow{\ \sim\ }
\operatorname{RHom}_{\mathcal A}(\mathbb R[S],V).
\]
Naturality for continuous maps makes this an equivalence of the entire cosimplicial diagram.

Bar descent in the classifying topos therefore gives
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
The final step can be checked directly. Use the injective resolution above and the first-quadrant double complex \(\operatorname{Hom}_{\mathcal A}(C_n,I^m)\). In every total degree there are only finitely many positions with \(n+m\) equal to that degree. The degenerate part in cosimplicial normalization is contractible. Treating \(K_n\) in the same way, the quasi-isomorphisms in each column induce a quasi-isomorphism of total complexes by the first-quadrant comparison theorem. The resolution is an injective resolution in \(\mathcal A\); its terms need not be regarded as injective objects in the liquid category.

Under this equivalence, \(Q\) corresponds to \(Q\circ u\). Its degree-three component is \(q\circ u_3\), the linear extension of \(c_p\). Thus the nonzero class of Section 8.3 really lies in the group \(H^3(G,V_p)\) asked about in the question. We have retained the full derived Hom object in every degree, rather than replacing it by an ordinary space of continuous functions.

### 8.5 Main theorem

**Theorem 8.1** (A degree-three counterexample for general liquid coefficients). Let \(G=\mathrm{SU}(2)\) and \(0<p\le1\). Using the inhomogeneous bar boundary, define
\[
V_p=\operatorname{coker}_{\operatorname{Cond}(\mathbb R)}
\bigl(M_{<p}(G^4)\xrightarrow{\partial_4}M_{<p}(G^3)\bigr),
\]
and equip it with the trivial \(G\) action. Then \(V_p\) is a \(p\)-liquid real vector space, and
\[
[c_p]\ne0\quad\text{in }H^3(G,V_p).
\]
The same finite arithmetic 3-cycle \(z\) satisfies \(q(z)\ne0\) for every \(p\).

Proof. Theorem 6.5 ensures that the cokernel is liquid. Bounded evaluation from Section 4 and the positive volume pairing from Section 6 exclude every liquid 4-chain filling of \(z\), by Lemma 7.1. Hence \(q(z)\ne0\). Section 8.3 gives a nonzero derived chain map, and Section 8.4 identifies it with \([c_p]\). ∎

The proof uses neither a comparison between the ordinary continuous bar complex and derived group cohomology nor projectivity of \(C_n\). It is independent of any low-degree vanishing assertion. For \(p=1\), the coefficient is still only a general liquid cokernel. The next section proves that it cannot arise from a Hausdorff Banach space, so there is no conflict with vanishing results in the locally convex setting.

## 9 The \(p\)-Banach case is outside the scope of this paper

### 9.1 \(V_p\) does not come from a Hausdorff \(p\)-Banach space

**Lemma 9.1** (Nonrepresentability of the coefficient). There is no Hausdorff \(p\)-Banach real space \(B\) such that \(\underline B\cong V_p\) as condensed real vector spaces.

Proof. Choose the increasing cofinal sequence \(q_m=p(1-1/(m+1))\), and put \(r_m=2^{-q_m}\). The compact disks of Proposition 10.1,
\[
K_{m,N}=M(G^3,\mathbb Z((T))_{r_m})_{\le N},
\qquad m,N\ge1,
\]
map to \(V_p\) by real specialization followed by the quotient map. Their images at the ordinary point cover \(V_p(*)\). Indeed, every cokernel element lifts at the ordinary point to \(C_3\), then belongs to some \(M_{q_m}(G^3)\), and finally lifts to a bounded disk by the actual quotient formula in Section 4.4.

If \(V_p\cong\underline B\), these condensed morphisms from compact Hausdorff spaces to \(\underline B\) correspond to continuous maps. Hence \(B\) is a countable union of compact sets. It is complete and metrizable, so the Baire theorem implies that one of these compact sets has nonempty interior. Translating gives a compact neighborhood of zero. Consequently, a closed ball of positive radius is compact.

A locally compact Hausdorff \(p\)-Banach space must be finite-dimensional; local convexity is not needed. Write \(\rho_B\) for its subadditive, \(p\)-homogeneous mass and put \(|x|=\rho_B(x)^{1/p}\). If the space were infinite-dimensional, let \(E_n\) be the span of finitely many previously chosen unit vectors, and choose \(y\notin E_n\). Finite-dimensional subspaces are closed, so \(d=\inf_{e\in E_n}|y-e|>0\). Choose \(e_0\) with \(|y-e_0|<2d\), and normalize \(y-e_0\). This gives a unit vector \(x_{n+1}\) satisfying
\[
\inf_{e\in E_n}|x_{n+1}-e|>\tfrac12.
\]
The unit ball would therefore contain an infinite separated set and could not be compact. Scaling contradicts the compact ball just obtained.

On the other hand, \(V_p(*)\) contains an explicit infinite linearly independent family. Choose the infinite-order element
\[
a=\operatorname{diag}(e^{2\pi i\sqrt2},e^{-2\pi i\sqrt2}),
\qquad x_n=q([a|a|a^n]),\quad n\ge2.
\]
Since \(\partial_3\partial_4=0\), the boundary descends to \(\overline\partial_3:V_p\to C_2\), and
\[
\overline\partial_3(x_n)
=[a|a^n]-[a^2|a^n]+[a|a^{n+1}]-[a|a].
\]
In a finite linear combination, the coefficient of the atom \([a^2|a^n]\) comes only from the \(n\)-th term and is the negative of its coefficient. Injectivity of atomic coordinates forces all coefficients to vanish. Thus \(V_p(*)\) is infinite-dimensional, contradicting finite-dimensionality of \(B\). ∎

The same obstruction excludes a representation by any Hausdorff quasi-Banach space. It concerns the condensed structure of this particular coefficient. It neither proves vanishing for other \(p\)-Banach coefficients nor excludes a counterexample with different coefficients.

Directly completing atomic chains in the \(p\)-norm does not resolve this special case either. On the atomic space with topology forgotten, one can indeed form the Hausdorff quotient
\[
B_p^{\mathrm{at}}=\ell^p(G^3)/
\overline{\partial_4\ell^p(G^4)}.
\]
The bounded function \(\beta\) gives a continuous linear functional that annihilates the closed boundary space, so \(z\) still survives. However, the quotient Dirac family \(y(g,h,k)\) is not continuous. With \(a\) as above, take
\[
g_j=\operatorname{diag}(e^{2\pi i\sqrt2/j},e^{-2\pi i\sqrt2/j})
\longrightarrow1,\qquad j\ge2.
\]
The boundary \(\partial_3\) descends on this quotient to a bounded operator with target \(\ell^p(G^2)\), and
\[
\begin{aligned}
\overline\partial_3\bigl(y(g_j,a,a)-y(1,a,a)\bigr)
={}&[a|a]-[g_ja|a]+[g_j|a^2]-[g_j|a]\\
&-[1|a^2]+[1|a].
\end{aligned}
\]
These six ordered pairs are distinct, so their atomic \(p\)-mass is 6. The operator mass bound for the 3-boundary is 4. Therefore
\[
\|y(g_j,a,a)-y(1,a,a)\|_{\mathrm{quot}}^p\ge6/4.
\]
Retaining the abstract pairing in this way loses continuity of the Dirac family. This quotient therefore does not directly supply the condensed cocycle required by the original question.

### 9.2 Exact reduction

Equip \(G\) with a bi-invariant metric \(d_G\) of diameter 1, and equip \(S=G^3\) with the product maximum metric \(d\). An admissible modulus is a bounded nondecreasing function \(\omega:[0,1]\to[0,\infty)\) such that \(\omega(0)=0\), \(\omega(t)>0\) for \(t>0\) and \(\omega(t)\to0\) as \(t\to0\). We do not initially require concavity.

On finite formal chains, define the seminorm mass
\[
\begin{aligned}
\rho_\omega(x)=\inf\biggl\{&\sum_i|a_i|^p+
\sum_j|b_j|^p\omega(d(u_j,v_j))^p:\\
&x=\sum_i a_i[s_i]+\sum_j b_j([u_j]-[v_j]),
\quad\text{all sums finite}\biggr\}.
\end{aligned}
\]
Concatenating and scaling decompositions give subadditivity and \(p\)-homogeneity, respectively. Quotient by the subspace of zero seminorm, then complete. The result is a Hausdorff \(p\)-Banach space \(F_\omega\). Its Dirac family satisfies
\[
\rho_\omega([s])\le1,\qquad
\rho_\omega([u]-[v])\le\omega(d(u,v))^p,
\]
and is therefore continuous. Put
\[
J_\omega=\overline{\partial_4(\mathbb R[G^4])}^{\,F_\omega},
\qquad B_\omega=F_\omega/J_\omega.
\]
The quotient Dirac family is a continuous 3-cocycle. Since \(B_\omega\) is \(p\)-liquid, the ordinary free-object adjunction extends this family to \(C_3\to B_\omega\). Its composite with \(\partial_4\) vanishes on the Dirac family. Uniqueness in the adjunction then shows that the entire composite is zero. Hence it descends to a condensed linear morphism \(\Phi_\omega:V_p\to B_\omega\).

For the fixed finite detecting 3-cycle, define
\[
\begin{aligned}
\Delta_{p,\omega}(z)=\inf\biggl\{&\sum_i|a_i|^p+
\sum_j|b_j|^p\omega(d(u_j,v_j))^p:\\
&z=\partial_4 b+\sum_i a_i[s_i]
+\sum_j b_j([u_j]-[v_j]),\quad
b\in\mathbb R[G^4],\quad\text{all chains finite}\biggr\}.
\end{aligned}
\]
By definition and invariance of distance under passing to the closure,
\[
\rho_{B_\omega}(\Phi_\omega(q(z)))
=\Delta_{p,\omega}(z)
=\inf_{b\in\mathbb R[G^4]}\rho_\omega(z-\partial_4b).
\]
The closure step can be checked directly. If \(j_n\to j\), then
\[
|\rho_\omega(x-j_n)-\rho_\omega(x-j)|
\le\rho_\omega(j_n-j)\longrightarrow0.
\]

**Lemma 9.2** (A two-way criterion for the finite 3-cycle). Fix \(0<p\le1\). The following conditions are equivalent: there exist a Hausdorff \(p\)-Banach space \(B\) and a condensed linear morphism \(\Phi:V_p\to\underline B\) such that \(\Phi(q(z))\ne0\); there exists an admissible modulus \(\omega\) such that \(\Delta_{p,\omega}(z)>0\).

Proof. The latter condition gives the former directly through the construction of \(B_\omega,\Phi_\omega\). Conversely, let \(c=\Phi c_p\), a continuous \(B\)-valued 3-cocycle on the compact space \(S\). Choose \(C>0\) such that \(\sup_s|c(s)|_B\le C\), and define the uniform modulus
\[
\Omega_c(t)=\sup_{d(u,v)\le t}|c(u)-c(v)|_B,
\qquad \omega(t)=t+\Omega_c(t)/C\quad(t>0),
\]
with \(\omega(0)=0\). Compactness gives \(\Omega_c(t)\to0\). For every admissible finite decomposition, the finite linear extension \(L([s])=c(s)\) satisfies the bound that, after taking the infimum, reads
\[
\rho_B(Lx)\le C^p\rho_\omega(x).
\]
Thus \(L\) extends to \(F_\omega\). The cocycle identity makes it annihilate \(J_\omega\), so it factors through \(B_\omega\). Consequently,
\[
0<\rho_B(\Phi(q(z)))\le C^p\Delta_{p,\omega}(z),
\]
which gives positive cost. ∎

This equivalence describes exactly whether detection by the same finite 3-cycle can be transferred. If positive cost exists, the homology-action argument of Section 8 gives a nonzero derived class with \(p\)-Banach coefficients. If every admissible modulus has zero cost, this rules out only this detection by a finite 3-cycle. It does not imply vanishing of all derived group cohomology.

### 9.3 The prepending-average family is settled

For the remainder of this subsection, fix \(0<p<1\) and the slow modulus
\[
W_0(t)=\frac1{2+\log(1/t)}\quad(0<t\le1),
\qquad W_0(0)=0.
\]
This function is continuous, increasing and concave. Complete the finite chains for the mass above with \(S=G\) and \(\omega=W_0\). Denote the resulting space by \(X_p\) and its mass by \(\rho_p\). Equivalently, adjoin an isolated root \(*\) to \(G\), give every point distance 1 from the root and use \(W_0(d_G)\) as the internal metric. The corresponding free \(p\)-Banach space is \(X_p\). Concavity gives the internal triangle inequality, and \(W_0\le1\) gives the triangle inequalities involving the root.

The total mass map \(\varepsilon_G([s])=1\) satisfies \(|\varepsilon_G(x)|^p\le\rho_p(x)\). Right translations \(R_k[s]=[sk]\) extend to isometries. The continuity estimate on finite chains and density show that this is a strongly continuous right action. This translation action is used to analyze averages; it is separate from the trivial coefficient action in the main theorem.

We first relate the averages precisely to the original 3-cycle. In the triangulation of Section 6, choose a parameter \(t_v\in G\) for each representative of a vertex orbit. Map a lifted vertex to \(\rho_0(\gamma)t_v\), then pass to inhomogeneous bar chains. This produces a finite 3-cycle \(z_t\) homologous to \(z\). Indeed, if \(X_i,Y_i\) are the two vertex maps, take the finite prism on each ordered simplex:
\[
P_n=\sum_{j=0}^n(-1)^j
[X_0,\ldots,X_j,Y_j,\ldots,Y_n].
\]
Deleting vertices term by term gives \(\partial P_n+P_{n-1}\partial=(F_t)_*-(F_1)_*\). Hence \(D=P_3(w)\) satisfies \(\partial_4D=z_t-z\), and therefore \(E_\beta(z_t)=E_\beta(z)>0\).

We can choose algebraic parameters so that distinct triangular faces have distinct tail pairs \(\tau=(h,k)\), while also excluding degeneracies from equal entries or identity elements within a row. For two distinct faces, there is a vertex belonging to only one of them. With all other parameters fixed, equality of the tail pairs has at most one solution in that vertex parameter. The same reasoning applies to the degeneracy equations. The finitely many bad sets are closed Haar-null sets. Their complement is a nonempty open set, and algebraic unit quaternions are dense, so algebraic parameters can be chosen in it. Fix this representative and write
\[
z'=\sum_r a_r[g_r|h_r|k_r],\qquad \partial_4D=z'-z.
\]
Each triangular face in a closed 3-manifold is incident to exactly two tetrahedra. After combining equal tail pairs, the only nonzero rows therefore have the form
\[
A_\tau=\epsilon_f([g_f]-[1])
\quad\text{or}\quad
A_\tau=\epsilon_f([g_f^+]-[g_f^-]),
\qquad\epsilon_f\in\{1,-1\}.
\]
The coefficients in a two-term row are opposite because the orientations cancel on the common face. After right translation, each row gives \(\pm(R_{k_f}\mu-\mu)\). In the second case, take \(k_f=g_f^+(g_f^-)^{-1}\). Let \(F_0\) be the set of distinct nonidentity elements \(k_f\), and put \(m=|F_0|\).

For a finite real chain \(\mu\) satisfying \(\varepsilon_G(\mu)=1\), define the prepending 4-chain
\[
B_\mu(z')=\sum_{s,r}\mu_sa_r[s|g_r|h_r|k_r].
\]
The five-face boundary formula and \(\partial_3z'=0\) give the exact identity
\[
z-\partial_4(B_\mu(z')-D)
=z'-\partial_4B_\mu(z')
=\sum_\tau(\iota_\tau)_*(\mu*A_\tau),
\qquad\iota_\tau(x)=(x,\tau).
\]
All coefficients at equal atoms have already been combined here.

These rows can be extracted from the actual free mass even when arbitrary auxiliary points in the ambient space are allowed. Choose a separation scale \(\eta>0\) so that the \(\eta\)-neighborhoods of distinct tail pairs are disjoint, and set
\[
\theta_\tau(q)=\max(0,1-d(q,\tau)/\eta),\qquad
L([x,q])=(\theta_\tau(q)[x])_\tau.
\]
Concavity gives \(|\theta_\tau(q)-\theta_\tau(q')|\le W_0(d(q,q'))/W_0(\eta)\). Split a two-point difference into a difference in the first coordinate and a difference in coefficients. The former has at most one nonzero component, and the latter has at most two. Taking the infimum over all finite decompositions therefore gives
\[
\sum_\tau\rho_p(L_\tau x)
\le C_{Q,p}\rho_{G^3,W_0}(x),
\qquad C_{Q,p}=1+2W_0(\eta)^{-p}.
\]
Consequently, on defining
\[
e_{p,W_0}(x)=\sum_{k\in F_0}\rho_p(R_kx-x),
\]
we obtain
\[
\rho_{G^3,W_0}\bigl(z-\partial_4(B_\mu(z')-D)\bigr)
\ge C_{Q,p}^{-1}e_{p,W_0}(\mu).
\]
The extraction operator is defined on all of \(G^3\), so this bound includes cancellation between different rows and the use of arbitrary auxiliary points.

The set \(F_0\) generates a dense subgroup. If the generated group were amenable, finite Følner probabilities would make all its \(\ell^1\) translation defects tend to zero simultaneously. The exact residual formula and the finite bounded pairing, however, give
\[
0<E_\beta(z')\le\|\beta\|_\infty
\sum_f\|R_{k_f}\mu-\mu\|_{\ell^1},
\]
a contradiction. Every proper closed subgroup of \(\mathrm{SU}(2)\) is either finite or a finite extension of a circle group, and each is amenable as a discrete group. The closure of this nonamenable subgroup must therefore be all of \(G\). Its matrix entries are algebraic numbers. The Bourgain–Gamburd theorem consequently gives a Haar spectral gap: there is \(\kappa>0\) such that
\[
\sum_{k\in F_0}\|U_ku-u\|_2^2
\ge\kappa\|u-\gamma(u)\|_2^2,
\qquad U_kf(x)=f(xk^{-1}).
\]
This step uses the spectral gap in the Haar regular representation.

To pass from \(L^2\) to \(L^p\), we use medians. For a real function \(f\in L^p\), choose a median \(c\). The functions \(u=(f-c)_+^{p/2}\) and \(v=(c-f)_+^{p/2}\) each have support of measure at most \(1/2\). Their variances are therefore at least half their respective squared norms. Also,
\[
|a_+^{p/2}-b_+^{p/2}|^2\le|a-b|^p.
\]
Apply the spectral gap separately to \(u,v\), then add. This gives
\[
\|f-c\|_p^p\le P\sum_{k\in F_0}\|U_kf-f\|_p^p,
\qquad P=4/\kappa.
\]
Only real scalar functions occur in this argument.

We next construct the finite-band tests. Choose a real, even smooth function \(\eta_0\) that equals 1 on \([-1,1]\) and vanishes for \(|t|\ge2\). For a dyadic integer \(N\), put
\[
\begin{aligned}
K_N(\theta)&=\sum_{j\ge1}j\eta_0(j/N)
\frac{\sin(j\theta)}{\sin\theta},\\
S_Nf(x)&=\int_G K_N(xy^{-1})f(y)\,d\gamma(y),\\
T_N\mu(x)&=\sum_s\mu_sK_N(xs^{-1}).
\end{aligned}
\]
Values at the endpoints are interpreted by continuous limits. Character orthogonality gives
\[
K_1=1,\qquad\int K_N\,d\gamma=1,\qquad
K_N*K_{RN}=K_N\quad(R\ge2),\qquad T_NR_k=U_kT_N.
\]
Here \(R\) is also a dyadic integer. Let \(\Pi_D\) denote the restrictions of polynomials of degree at most \(D\) in the four quaternion coordinates. The image of \(T_N\) lies in \(\Pi_{2N}\).

The scale estimates for the kernels follow directly from finite Fourier sums. Set \(H_N(\theta)=\sum_{j\in\mathbb Z}\eta_0(j/N)e^{ij\theta}\). Then \(K_N=-H_N'/(2\sin\theta)\). Poisson summation expresses \(H_N\) as a sum of periodic translates of a Fourier transform. Repeated integration by parts in that transform gives
\[
|H_N^{(l)}(\theta)|\le C_{A,l}N^{l+1}(1+N\theta)^{-A},
\qquad0\le\theta\le\pi.
\]
The principal periodic translate is controlled by Schwartz decay. The distances of the remaining translates from this interval grow linearly with the translate index, so the differentiated tails are absolutely summable. For \(\theta\le1/N\), use the finite character sum. For \(1/N\le\theta\le\pi/2\), divide directly by \(\sin\theta\). At the other endpoint, use \(H_N'(\pi)=0\) and the identity
\[
\frac{H_N'(\pi-u)}{\sin u}
=-\frac{u}{\sin u}\int_0^1H_N''(\pi-tu)\,dt.
\]
This identity and its derivative remove the endpoint singularity. Thus, for every \(A\),
\[
|K_N(x)|\le C_AN^3(1+Nd_G(x,1))^{-A},\qquad
|\nabla K_N(x)|\le C_AN^4(1+Nd_G(x,1))^{-A}.
\]
Choose \(Ap>3\). Three-dimensional radial integration and the pointwise gradient estimate give
\[
\begin{aligned}
\|K_N\|_p^p&\le C_pN^{-3(1-p)},\\
\|K_N(\cdot s^{-1})-K_N(\cdot t^{-1})\|_p^p
&\le C_pN^{-3(1-p)}\min(1,Nd_G(s,t))^p.
\end{aligned}
\]
For small distances, apply the pointwise mean value estimate for real functions before integrating. For large distances, use two-term \(p\)-subadditivity. Concavity also gives
\[
\min(1,N\delta)\le W_0(\delta)/W_0(1/N).
\]
Apply these bounds term by term to an arbitrary molecular decomposition and take the infimum. We obtain a continuous extension satisfying
\[
\|T_Nx\|_p^p\le C_pa_N\rho_p(x),\qquad
a_N=N^{-3(1-p)}(2+\log N)^p.
\]
Edges to the root are controlled by the mass of the kernel itself. The estimate therefore includes all auxiliary points and all elements of the completion.

We must also prove the required bound for \(S_N\) on finite bands. Use Hopf coordinates
\[
y=(\sqrt u\cos\alpha,\sqrt u\sin\alpha,
\sqrt{1-u}\cos\beta,\sqrt{1-u}\sin\beta),\qquad
 d\gamma=du\,\frac{d\alpha}{2\pi}\,\frac{d\beta}{2\pi}.
\]
In each angular coordinate take \(L=2(R+1)N+1\) equally spaced nodes. In the \(u\) coordinate use positive Gauss–Legendre quadrature with \(J=(R+1)N+1\) nodes. The resulting \(Q\le32R^3N^3\) nodes have positive weights and integrate \(\Pi_{2(R+1)N}\) exactly. Indeed, angular frequencies are strictly less than \(L\), and after angular averaging each nonzero term has degree at most \((R+1)N\) in \(u\). Any left translate of the nodes remains exact.

For \(g\in\Pi_{2RN}\), the function \(y\mapsto K_N(xy^{-1})g(y)\) belongs to this band. For each translation parameter \(a\), express the integral as an exact finite sum and apply \(p\)-subadditivity. Integrate the resulting nonnegative scalar expressions first in \(x\), then in \(a\), and use \(\sum_iw_i^p\le Q^{1-p}\). This gives
\[
\|S_Ng\|_p^p
\le\|K_N\|_p^p Q^{1-p}\|g\|_p^p
\le B_{p,R}\|g\|_p^p,
\qquad B_{p,R}=C_p(32R^3)^{1-p}.
\]
For \(R=2\), we may use \(Q\le196N^3\) and take \(B_p=C_p196^{1-p}\). Using the convolution bound only on these finite bands extends the identity
\[
T_Nx=S_N(T_{RN}x)
\]
to all of \(X_p\). We have used neither a general \(L^p\) convolution bound nor \(X_p\)-valued Haar integration.

**Lemma 9.3** (Uniform positive defect for prepending averages). For every fixed \(0<p<1\), there is \(c_{F_0,p}>0\) such that every \(x\in X_p\) satisfies
\[
e_{p,W_0}(x)\ge c_{F_0,p}|\varepsilon_G(x)|^p.
\]
In particular, the defects of all finite signed mass-one averages have a common positive lower bound.

Proof. Set \(f_n=T_{2^n}x\), choose a real median \(c_n\), and put \(h_n=f_n-c_n\) and \(a_n=2^{-3(1-p)n}(2+n\log2)^p\). The median estimate and covariance give
\[
\|h_n\|_p^p\le PC_pa_ne_{p,W_0}(x).
\]
The identity between adjacent bands gives
\[
c_n-c_{n+1}=S_{2^n}h_{n+1}-h_n.
\]
Since \(h_{n+1}\in\Pi_{4\cdot2^n}\), it follows that
\[
|c_n-c_{n+1}|^p
\le PC_pe_{p,W_0}(x)(a_n+B_pa_{n+1}).
\]
At the coarse endpoint, \(c_0=\varepsilon_G(x)\). At the fine endpoint,
\[
|c_J|^p\le C_pa_J(\rho_p(x)+Pe_{p,W_0}(x))\longrightarrow0.
\]
First estimate the finite telescoping sum, then let \(J\to\infty\) for each fixed \(x\). Since
\[
\Lambda_p=\sum_{n\ge0}2^{-3(1-p)n}(2+n\log2)^p<\infty,
\]
we obtain
\[
|\varepsilon_G(x)|^p
\le PC_p(1+B_p)\Lambda_pe_{p,W_0}(x).
\]
We may take \(c_{F_0,p}=\kappa/[4C_p(1+B_p)\Lambda_p]\). The tail limit is taken only after \(x\) has been fixed. The resulting constant is independent of \(x\), so no common norm budget for a family of averages is required. ∎

Finally, we determine the order as \(p\to1^-\). Put
\[
c_p^*=\inf_{\substack{\mu\in\mathbb R[G]\\\varepsilon_G(\mu)=1}}
e_{p,W_0}(\mu),\qquad \epsilon=1-p.
\]
A fixed dyadic scale does not give the optimal order. Instead, take
\[
R=2^{\lceil1/(3\epsilon\log2)\rceil}.
\]
For \(1/2\le p<1\), the kernel localization estimates can use \(A=10\) uniformly, with a common constant \(C_*\). The same median telescoping argument gives
\[
1\le PC_*(1+B_{p,R})\Lambda_{p,R}e_{p,W_0}(x),
\qquad
\Lambda_{p,R}=\sum_{n\ge0}R^{-3\epsilon n}(2+n\log R)^p.
\]
The chosen scale satisfies
\[
B_{p,R}\le16eC_*,\qquad
\Lambda_{p,R}\le\frac{2\epsilon^{-p}}{(1-e^{-1})^2}.
\]
Thus every mass-one element of the completion satisfies
\[
e_{p,W_0}(x)\ge C_0\epsilon^p\ge C_0\epsilon,
\qquad C_0=\frac{\kappa(1-e^{-1})^2}
{8C_*(1+16eC_*)}>0.
\]

An upper bound of the same order is achieved by finite positive averages. Given an integer \(H\ge8\), use the Hopf angular coordinates \(\phi\in[0,\pi/2]\) and \(\alpha,\beta\in[0,2\pi]\). Take the midpoints of \(H,8H,8H\) equal subintervals in the respective coordinates, giving \(64H^3\) nodes. Moving to the midpoint along the three coordinate directions gives a spherical path and a normalized covering radius of \(1/(2H)\). In a fixed order, greedily retain a node when its distance from the previously retained nodes is at least \(1/H\). This gives a finite list \(y_i\) with separation \(1/H\) and covering radius \(3/(2H)\).

Take the nearest-point Borel partition \(A_i\), assigning ties by index, and define
\[
\nu_H=\sum_i\gamma(A_i)[y_i],\qquad
t_{ij}^k=\gamma(A_i\cap A_jk).
\]
The marginal identities give an exact molecular decomposition for each translation:
\[
R_k\nu_H-\nu_H
=\sum_{i,j}t_{ij}^k([y_jk]-[y_i]),\qquad
\sum_{i,j}t_{ij}^k=1.
\]
The endpoints of every nonzero term have distance at most \(3/H\). In a fixed row, the relevant points \(y_jk\) are \(1/H\)-separated and lie in a ball of radius \(3/H\). Ball volume for the normalized spherical angular metric satisfies
\[
\gamma(B(1,r))=\int_0^r2\sin^2(\pi u)\,du,
\qquad \tfrac83r^3\le\gamma(B(1,r))
\le\tfrac{2\pi^2}{3}r^3\quad(0<r\le1/2).
\]
The lower bound follows from \(\sin(\pi u)\ge2u\), and the upper bound follows from \(\sin(\pi u)\le\pi u\). Compare the disjoint balls of radius \(1/(2H)\) with the ball of radius \(7/(2H)\) containing them. There are at most \(343\pi^2/4<1024\) positive terms in a row. The assumption \(H\ge8\) keeps all these radii in the interval where the volume bounds apply. The total number of nonzero terms is therefore at most \(2^{16}H^3\). The \(p\)-mass bound for finite positive weights gives
\[
e_{p,W_0}(\nu_H)
\le m\,2^{16\epsilon}H^{3\epsilon}
(2+\log(H/3))^{-p}.
\]
Choose \(H=2^{\lceil p/(3\epsilon\log2)\rceil}\). Then \(e_{p,W_0}(\nu_H)=O(\epsilon)\), and the upper limiting coefficient is at most \(3em\). Combining this with the lower bound gives
\[
c_p^*=\Theta_{F_0,W_0}(1-p)\qquad(p\to1^-).
\]

Finite chains are dense. If \(\mu_j\to x\) and \(\varepsilon_G(x)=1\), correct the total mass by setting
\[
\widetilde\mu_j=\mu_j+(1-\varepsilon_G(\mu_j))[1].
\]
Then \(\rho_p(\widetilde\mu_j-x)\le2\rho_p(\mu_j-x)\to0\). Since each translation is an isometry,
\[
|e_{p,W_0}(x)-e_{p,W_0}(y)|\le2m\rho_p(x-y).
\]
This proves that the infimum over finite signed chains equals the infimum over the completion, without choosing atomic measure representations for completed elements. The infimum over positive probabilities also has bounds of the same order. We do not assert that it equals the signed infimum.

By row extraction and the upper bound above, the infimum of the prepending residuals after fixing the prism,
\[
I_p^{\mathrm{front}}(z)=
\inf_{\varepsilon_G(\mu)=1}
\rho_{G^3,W_0}\bigl(z-\partial_4(B_\mu(z')-D)\bigr),
\]
is strictly positive for each fixed \(p<1\) and also has order \(\Theta(1-p)\) as \(p\to1^-\). For the upper bound, prepend the finite molecular decompositions above term by term. More explicitly, each term of the 3-cycle contributes
\[
a_rt_{ij}^{g_r}
([y_jg_r|h_r|k_r]-[y_i|h_r|k_r]),
\]
so the residual mass is at most
\[
\left(\sum_r|a_r|^p\right)2^{16\epsilon}H^{3\epsilon}
(2+\log(H/3))^{-p}.
\]
The coefficient mass of the fixed finite 3-cycle stays bounded as \(p\to1^-\). The tail-pair extraction constant is also uniformly bounded for \(p\in[1/2,1]\). Hence the upper and lower bounds have the same linear order.

The global cost, however, allows every finite 4-chain, so we have only
\[
\Delta_{p,W_0}(z)\le I_p^{\mathrm{front}}(z).
\]
A positive lower bound for the prepending family cannot be transferred in the reverse direction to the global infimum. This paper does not determine whether some admissible modulus satisfies \(\Delta_{p,\omega}(z)>0\), and it does not parametrize general 4-chains by prepending chains. The main theorem for general liquid coefficients and the question for Hausdorff \(p\)-Banach coefficients therefore have explicitly different scopes.

## References

1. Peter Scholze, *Lectures on Analytic Geometry*. Theorems 6.5, 6.7 and 6.9(2); Proposition 10.1, Corollary 10.2, Question 10.4 and Proposition 10.7 in Lecture X. [Lecture notes](https://people.mpim-bonn.mpg.de/scholze/Analytic.pdf).

2. Tim Austin and Calvin C. Moore, *Continuity properties of measurable group cohomology*. Theorem A and Question 42. [Paper](https://arxiv.org/abs/1004.4937).

3. Aurel Page, *Computing arithmetic Kleinian groups*. Theorem 6. [Paper](https://www.normalesup.org/~page/Recherche/Documents/articles/kln_gps.pdf).

4. Alan W. Reid, *The geometry and topology of arithmetic hyperbolic 3-manifolds*. Section 2.3. [Survey](https://web.ma.utexas.edu/users/areid/kyoto2.pdf).

5. James Farre, *Bounded cohomology of finitely generated Kleinian groups*. Section 2.3. [Paper](https://arxiv.org/abs/1706.02001).

6. Jean Bourgain and Alex Gamburd, *A spectral gap theorem in SU(d)*, Journal of the European Mathematical Society 14 (2012), 1455–1511. Theorem 1. [Paper](https://ems.press/content/serial-article-files/31848).

7. Johannes Anschütz, *Solid group cohomology*. Section 2 on group cohomology in a general topos and bar descent. [Lecture notes](https://janschuetz.perso.math.cnrs.fr/skripte/homology_profinite.pdf).
