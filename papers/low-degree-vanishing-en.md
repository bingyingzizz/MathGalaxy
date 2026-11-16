# Low-degree cohomology of compact groups with trivial p-liquid coefficients

## Abstract

Let \(0<p\le1\), and let \(V\) be a \(p\)-liquid real vector space with trivial action by a compact group \(G\). We prove that the internal cohomology object \(\underline H^1(G,V)\) vanishes for every compact group \(G\), and that \(\underline H^2(G,V)\) vanishes when \(G=\mathrm{SU}(2)\). Both statements apply to all \(p\)-liquid coefficients, without a representability assumption by a topological vector space.

The main input is an operator lemma: for a compact Hausdorff space \(S\) and a continuous self-map \(f\), the endomorphism \(2-f^*\) of \(R\Gamma(S,V)\) is a quasi-isomorphism. Its proof uses a two-term induced resolution and a convergent geometric series on a free liquid object, in place of Haar averaging. The same argument allows arbitrary compact Hausdorff parameters. It implies that every central extension of a compact group by \(V\) has a trivial underlying torsor and a unique square-compatible section. Parametrized uniqueness forces this section to respect inversion and conjugation. Its multiplication defect is consequently symmetric, and paired inversion in \(\mathrm{SU}(2)\) forces that defect to vanish.

The group-cohomological conclusions concern degrees one and two. The argument does not prove degree-two vanishing for general compact nonabelian groups or vanishing in degrees three and higher. In particular, it is compatible with the companion paper's degree-three counterexample for \(\mathrm{SU}(2)\), whose coefficient is a \(p\)-liquid object that does not arise from a Hausdorff \(p\)-Banach space. For that coefficient, the first and second internal cohomology objects vanish by the results here, while the third cohomology group is nonzero.

## 1 Introduction

For a compact group acting trivially on a real coefficient object, averaging is a standard route to vanishing of positive-degree cohomology. In the condensed setting, the coefficient may be a general \(p\)-liquid real vector space. Such an object need not be represented by a Hausdorff topological vector space, and its definition does not provide a vector-valued Haar integral. A proof that uses averaging must therefore specify an operation available on the coefficient itself. This paper gives a different argument for the first two degrees, using an invertible endomorphism of derived sections over compact spaces.

Throughout the paper, \(0<p\le1\). A compact group means a compact Hausdorff topological group, regarded as a condensed group. The coefficient \(V\) is a \(p\)-liquid real vector space, and its group action is trivial. We distinguish the internal cohomology object \(\underline H^i(G,V)\) from the ordinary group of global cohomology classes \(H^i(G,V)\). The former is a condensed abelian group and retains families with parameters. Our vanishing statements concern this internal object:
\[
\underline H^1(G,V)=0\quad\text{for every compact group }G,
\qquad
\underline H^2(\mathrm{SU}(2),V)=0. \tag{1.1}
\]
These are Theorems B1 and B2. No local convexity, norm or separation condition on a representing space is included in their hypotheses.

The operator used in the proofs is defined for spaces without a group structure. If \(S\) is compact Hausdorff and \(f:S\to S\) is continuous, Theorem A states that
\[
2-f^*:R\Gamma(S,V)\longrightarrow R\Gamma(S,V) \tag{1.2}
\]
is a quasi-isomorphism. Here \(R\Gamma\) is derived condensed section cohomology, defined in Section 2.2. The result holds on the full complex, so it applies both to sections and to torsor classes. It also holds on \(S\times T\) for \(f\times\mathrm{id}_T\), where \(T\) is any compact Hausdorff space. This parameter statement will be needed to obtain identities of condensed morphisms.

The proof of (1.2) takes place first over the polynomial ring \(A_0=\mathbb Z[U]\). Give \(\mathbb Z[S]\) the action \(U=f_*\), and give \(V\) the action \(U=2\). The module \(\mathbb Z[S]\), with this action, has a two-term resolution by modules induced from condensed abelian groups. Proposition 10.1 of [1] identifies the derived liquidifications of the induced terms. On the resulting free liquid object, the resolution differential becomes invertible, with inverse
\[
\mathsf T+f_*\mathsf T^2+f_*^2\mathsf T^3+\cdots,
\qquad U=\mathsf T^{-1}. \tag{1.3}
\]
The letter \(\mathsf T\) is a formal scalar variable, distinct from a space of parameters. Convergence is checked in the formal bounded disks supplied by the lecture notes. Derived adjunction then proves (1.2). In particular, this proof does not interpret (1.3) as a series converging in a norm on \(V\).

The first-degree argument follows directly from the operator lemma. For trivial action, a degree-one cocycle is a homomorphism to the additive group of \(V\). A family of such homomorphisms \(a:T\times G\to V\) satisfies
\[
a(t,g^2)=2a(t,g). \tag{1.4}
\]
Apply (1.2) to \((t,g)\mapsto(t,g^2)\). Its injectivity on degree-zero sections gives \(a=0\). Applying this to extremally disconnected compact parameter spaces proves internal vanishing, rather than only the vanishing of homomorphisms without parameters.

The second-degree argument uses central extensions. An intermediate result, Theorem C, is valid for every compact group. For a central extension in condensed groups
\[
1\longrightarrow V\longrightarrow E\xrightarrow{\pi}G\longrightarrow1, \tag{1.5}
\]
the underlying \(V\)-torsor is trivial. Moreover, there is a unique section \(s:G\to E\) satisfying
\[
s(g)^2=s(g^2),\qquad s(1)=1. \tag{1.6}
\]
The section in this statement is a morphism of condensed sets; the assertion does not initially say that it is a group homomorphism. Its uniqueness also holds with compact parameters. Comparing square-compatible sections under inversion and under conjugation gives
\[
s(g^{-1})=s(g)^{-1},\qquad
s(k)s(g)s(k)^{-1}=s(kgk^{-1}). \tag{1.7}
\]
The second identity is obtained by a comparison on \(G_k\times G_g\). Uniqueness at each ordinary value of \(k\) would not by itself prove the identity of condensed morphisms required here.

Define the multiplication defect \(c:G^2\to V\) by
\[
s(g)s(h)=\iota(c(g,h))s(gh), \tag{1.8}
\]
where \(\iota:V\to E\) is the central inclusion. The compatibility in (1.7) implies symmetry of \(c\). Inversion gives the complementary identity \(c(g^{-1},h^{-1})=-c(h,g)\). For \(\mathrm{SU}(2)\), each pair \((g,h)\) can be simultaneously conjugated to \((g^{-1},h^{-1})\). The conjugating element need not be chosen continuously: instead, we use the compact relation space of all such choices. Pullback to that space is injective on morphisms to \(V\), by projectivity of extremally disconnected test spaces. Thus the two identities force \(2c=0\), and real scalar multiplication gives \(c=0\). The section is then a splitting of (1.5).

The passage from splitting extensions to internal degree-two vanishing is made in slice topoi over extremally disconnected compact spaces. This keeps the parameter in every step, including the torsor trivialization, the normalization of the section and the injectivity of pullback along the relation space. The low-degree classification theorem of Giraud [2], in the form recorded in Proposition 3.8 and Corollary 3.11 of [3], then identifies the relevant cohomology classes with extensions. No comparison with an underived complex of continuous cochains is required.

For context, Corollary 10.2 and Remark 10.3 of [1] give positive-degree vanishing for compact abelian groups with the stated trivial liquid coefficients. Our degree-one result allows arbitrary compact groups, while the degree-two argument uses a geometric property proved here for \(\mathrm{SU}(2)\). For a general compact nonabelian group, Theorem C still produces a square-compatible section and the corresponding identities for its defect. The final step eliminating that defect is not established in that generality.

The relation to the companion paper [5] is complementary. That paper constructs, for every \(0<p\le1\), a trivial \(p\)-liquid coefficient with nonzero third cohomology for \(\mathrm{SU}(2)\). Its coefficient does not arise from a Hausdorff \(p\)-Banach space. It is nevertheless among the coefficients allowed in (1.1). The two results therefore describe different degrees for the same class of coefficients; neither changes the hypotheses of the other. Section 10 gives the precise comparison.

Section 2 fixes the categorical conventions and the external inputs. Section 3 proves the operator lemma, including its parameter version. Section 4 applies it to first cohomology. Sections 5 and 6 construct the square-compatible section and derive the identities for its multiplication defect. Section 7 establishes paired inversion and the required injectivity of precomposition. Section 8 proves the second-degree theorem in the internal setting. Sections 9 and 10 delimit the scope and compare it with the degree-three counterexample. Appendix A gives the quaternion computation, and Appendix B records the hypotheses of the external results.

## 2 Preliminaries and external inputs

### 2.1 Condensed abelian groups and p-liquid objects

**Definition 2.1** (Condensed objects). A condensed set is a sheaf of sets on the category of profinite spaces with finite jointly surjective families as covers. Condensed groups, condensed abelian groups and condensed rings are the corresponding group, abelian group and ring objects. We write \(\mathrm{Cond}\) for the topos of condensed sets, \(\operatorname{Cond}(\mathbb Z)\) for its category of abelian group objects and \(\operatorname{Cond}(\mathbb R)\) for condensed modules over the usual condensed real field.

We work with a fixed size convention for this site, as in [1, 4]. Compact Hausdorff spaces are identified with their associated condensed sets. Thus a continuous map between compact Hausdorff spaces gives a condensed morphism. The ordinary point is denoted by \(*\). A statement about \(V(*)\) is a statement about one real vector space of sections; it does not specify the condensed object \(V\).

For a condensed set \(X\), let \(\mathbb Z[X]\) be the free condensed abelian group on \(X\). Its defining property is
\[
\operatorname{Hom}_{\operatorname{Cond}(\mathbb Z)}(\mathbb Z[X],A)
\cong\operatorname{Hom}_{\mathrm{Cond}}(X,A). \tag{2.1}
\]
The analogous free condensed real vector space is \(\mathbb R[X]\). For a morphism \(f:X\to Y\), the induced map on free objects is denoted by \(f_*\). Precomposition on maps or on derived Hom is denoted by \(f^*\). A Dirac generator is written \([x]\); statements involving this notation are interpreted through the free-object adjunction and hence also hold with parameters.

We recall the measure objects used to define liquid coefficients. For a finite set \(F\), an exponent \(0<q\le1\) and a positive real number \(b\), put
\[
\mathbb R[F]_{q,\le b}
=\left\{(a_x)_{x\in F}:\sum_{x\in F}|a_x|^q\le b\right\}. \tag{2.2}
\]
Each such set has its compact topology from the finite-dimensional real vector space. Pushforward along a map of finite sets preserves this bound: on each fiber, \(|\sum a_x|^q\le\sum|a_x|^q\). If a profinite space is presented as \(P=\varprojlim_iF_i\) with finite quotients, define
\[
M_q(P)=\underset{b>0}{\operatorname{colim}}\,\varprojlim_i
\mathbb R[F_i]_{q,\le b},
\qquad
M_{<p}(P)=\underset{0<q<p}{\operatorname{colim}}M_q(P). \tag{2.3}
\]
The first colimit is a colimit of condensed objects arising from compact disks. This is the measure construction of Definition 6.3 of [1].

**Definition 2.2** (Liquid real coefficients). A condensed real vector space \(V\) is \(p\)-liquid if, for every profinite space \(P\), restriction along the Dirac map induces a bijection
\[
\operatorname{Hom}_{\mathbb R}(M_{<p}(P),V)
\xrightarrow{\ \sim\ }
\operatorname{Hom}_{\mathbb R}(\mathbb R[P],V). \tag{2.4}
\]
Here both Hom sets consist of condensed linear morphisms. We denote the full subcategory of these objects by \(\operatorname{Liq}_p(\mathbb R)\).

By Theorem 6.5 of [1], this is an abelian subcategory closed under kernels, cokernels and extensions in \(\operatorname{Cond}(\mathbb R)\). The same theorem supplies a derived liquidification left adjoint to the fully faithful derived inclusion. Proposition 10.1 of [1] extends the free measure construction to compact Hausdorff spaces and identifies
\[
L\operatorname{liq}_p(\mathbb R[S])\simeq M_{<p}(S)[0]
\qquad(S\text{ compact Hausdorff}). \tag{2.5}
\]
The degree-zero assertion in (2.5) concerns the liquidification of a free object. It does not assert that \(\mathbb R[S]\) is projective or that all higher section cohomology of \(S\) vanishes.

We will also use the integral formal version of this theory. Given \(0<r<1\), let \(\mathbb Z((\mathsf T))_{>r}\) and \(M(S,\mathbb Z((\mathsf T))_{>r})\) have the meanings in [1]. Section 2.3 records the precise properties needed. All estimates below take place in these formal measure objects. No choice of a norm on \(V\) is involved in Definition 2.2 or in their application.

An extremally disconnected compact Hausdorff space is one in which the closure of every open subset is open. Such spaces are projective with respect to surjections of compact Hausdorff spaces. They form a family of projective test objects for condensed sets; these facts are part of the site description in Lectures I and II of [4]. We will use the following consequence explicitly.

**Lemma 2.3** (Exact evaluation on projective tests). Let \(T\) be an extremally disconnected compact Hausdorff space. Evaluation \(A\mapsto A(T)\) on condensed abelian groups is exact. More generally, global sections on the slice topos \(\mathrm{Cond}/T\) are exact on abelian objects. A condensed abelian group whose sections vanish on every such \(T\) is zero.

Proof. Evaluation preserves kernels. For an epimorphism and a section of its target over \(T\), the definition of a sheaf epimorphism gives local lifts on a cover of \(T\). Refine to a finite jointly surjective family of profinite spaces, and replace that family by its disjoint union \(Q\to T\). Projectivity gives a section \(T\to Q\). Pulling the local lift back along this section gives a lift over \(T\), proving surjectivity on sections. The same argument applies in the slice: the local cover of its terminal object is a cover of \(T\), and its section is a morphism over \(T\). Finally, every profinite space has a surjective cover by an extremally disconnected compact space. A sheaf with zero sections on all these covering objects has zero sections on every profinite test space, so it is the zero sheaf. ∎

### 2.2 Derived sections and internal cohomology

**Definition 2.4** (Derived sections over a condensed space). For a compact Hausdorff space \(S\) and a condensed abelian group \(A\), define
\[
R\Gamma(S,A)
=R\operatorname{Hom}_{\operatorname{Cond}(\mathbb Z)}(\mathbb Z[S],A),
\qquad
H^j(S,A)=H^jR\Gamma(S,A). \tag{2.6}
\]
We abbreviate the derived Hom in this formula as \(R\operatorname{Hom}_{\mathbb Z}\). Unless an underline is displayed, it is an external derived Hom complex of abelian groups. In particular,
\[
H^0(S,A)=\operatorname{Hom}_{\mathrm{Cond}}(S,A). \tag{2.7}
\]
These are sections in the condensed sense. They are continuous maps in the familiar case where the target is represented by an appropriate topological group, but the definition does not require such a representation.

For a morphism \(f:S\to S\), the operator \(f^*\) on (2.6) is precomposition with \(f_*\). Multiplication by 2 on the coefficient commutes with this operator. The endomorphism \(2-f^*\) is therefore defined on the entire derived section complex. Its action on \(H^0\) sends \(a\) to the morphism \(s\mapsto2a(s)-a(f(s))\). On \(H^1\), it is the difference of the coefficient pushforward by multiplication by 2 and the space pullback by \(f\). This distinction will matter for the torsor in Section 5.1.

The derived sections in (2.6) also describe cohomology in the slice over \(S\) with the pulled-back coefficient. Indeed, sections in that slice are maps \(S\to A\), and its direct-image functor on abelian objects is right adjoint to exact pullback. The identity \(\operatorname{Hom}(\mathbb Z[S],A)=\Gamma(\mathrm{Cond}/S,A_S)\), together with preservation of injectives by pullback along this slice morphism, identifies the corresponding derived section functors. In particular, \(H^1(S,A)\) classifies \(A\)-torsors over \(S\), with \(A\) understood as pulled back to that slice. We use torsor classification in the general topos form of [2].

**Definition 2.5** (Internal group cohomology). Let \(G\) be a condensed group, and let \(BG\) be its classifying topos, whose objects are condensed sets with a \(G\)-action. Write \(q:BG\to\mathrm{Cond}\) for the canonical morphism. If \(V\) is a condensed abelian group with \(G\)-action, define
\[
\underline R\Gamma(G,V)=Rq_*V,
\qquad
\underline H^i(G,V)=R^iq_*V,
\qquad
H^i(G,V)=H^iR\Gamma(BG,V). \tag{2.8}
\]
The functor \(q_*\) takes invariant sections and has values in condensed abelian groups. Thus the first two objects in (2.8) are internal to the base topos, whereas the last expression is an ordinary cohomology group.

For a compact Hausdorff parameter space \(T\), put \(G_T=T\times G\) and \(V_T=T\times V\), regarded as objects over \(T\). Here \(G_T\) is a group object in \(\mathrm{Cond}/T\); its multiplication fixes the parameter. The topos \(BG_T\) is the corresponding classifying topos in this slice. The slice form of the derived section formalism gives
\[
R\Gamma(T,\underline R\Gamma(G,V))
\simeq R\Gamma(BG_T,V_T). \tag{2.9}
\]
For extremally disconnected \(T\), Lemma 2.3 makes evaluation exact, and (2.9) consequently gives
\[
\underline H^i(G,V)(T)\cong H^i(BG_T,V_T). \tag{2.10}
\]
Equivalently, the spectral sequence for the composite of global sections and \(q_*\) has only its degree-zero base-cohomology column on such a test object. Formula (2.10), together with the detection statement in Lemma 2.3, is the reason that proofs in all these slices establish internal vanishing.

We will not replace derived sections over a general compact Hausdorff space by their degree-zero part. For example, an extension over \(G_T\) can carry a nontrivial torsor class in \(H^1(T\times G,V)\) before the argument of Section 5.1 is applied. The operator lemma treats this class directly. This avoids imposing a separate acyclicity assertion on the spaces occurring in the classifying construction.

### 2.3 The external inputs used

We cite the analytic lecture notes [1] by lecture and theorem number. Thus Proposition 10.1 means the proposition in Lecture X; in versions that prefix the lecture numbering by zero, it is Proposition 0.10.1. The formal scalar variable called \(T\) there is written \(\mathsf T\) here. This notation keeps it distinct from a compact parameter space \(T\).

The analytic inputs are as follows.

1. **Theorem 6.5 and the reduction in the proof of Theorem 6.6 of [1].** The real liquid category has the derived inclusion and adjunction described above. At the formal level the required integral version is Theorem 6.10 of [1]: for \(A_0=\mathbb Z[\mathsf T^{-1}]\), the category \(\operatorname{Liq}_r(A_0)\) is an abelian subcategory of condensed \(A_0\)-modules with fully faithful derived inclusion and a left derived liquidification \(L\operatorname{liq}_r\). If \(L\) is \(r\)-liquid, derived adjunction gives
\[
R\operatorname{Hom}_{A_0}(K,L)
\simeq R\operatorname{Hom}_{\operatorname{Liq}_r(A_0)}
\bigl(L\operatorname{liq}_r(K),L\bigr). \tag{2.11}
\]
The target category of the Hom on the right is the liquid category. All uses below have \(L\) concentrated in degree zero.

2. **Theorem 6.9(2) of [1] and real specialization.** Set
\[
r=2^{-p},\qquad U=\mathsf T^{-1},\qquad A_0=\mathbb Z[U]. \tag{2.12}
\]
A \(p\)-liquid real vector space, restricted to \(A_0\) by \(U\mapsto2\), is \(r\)-liquid. To check the parameters, take any radius \(\rho\) with \(r<\rho<1\), and define \(q=-\log(\rho)/\log2\). Then \(0<q<p\) and \((1/2)^q=\rho\). The specialization at \(\mathsf T=1/2\) identifies the free formal object modulo \(2-U\) with \(M_q(P)\) for profinite \(P\). The unique extension property for \(V\) at every such \(q\) is exactly the extension property required for its restricted \(A_0\)-module to be \(r\)-liquid. This is the parameter correspondence used in the proof of Theorem 6.6. The strict inequality \(\rho>r\) gives \(q<p\) even at the endpoint \(p=1\).

3. **Proposition 10.1(1) of [1], including its proof.** If \(S\) is compact Hausdorff, then
\[
L\operatorname{liq}_r\bigl(A_0\otimes_{\mathbb Z}\mathbb Z[S]\bigr)
\simeq M(S,\mathbb Z((\mathsf T))_{>r})[0]. \tag{2.13}
\]
This assertion applies to arbitrary compact Hausdorff spaces, with the profinite case extended by the resolution in that proposition. Its proof also treats a continuous self-map of \(S\) as the action of \(U\) on \(\mathbb Z[S]\). We will write out the resulting two-term resolution and its inverse in Section 3, rather than assume the vanishing of that module's derived liquidification.

For the low-degree interpretation, we use Giraud's general topos exact sequence, VIII.7.1.5 of [2], also recorded in Proposition 3.8 of [3]. For a group object \(G\) and an abelian coefficient \(A\) with trivial action in a topos \(\mathcal E\), its relevant terms are
\[
\begin{aligned}
0&\longrightarrow\operatorname{Hom}_{\mathrm{grp},\mathcal E}(G,A)
\longrightarrow H^1(BG,A)\longrightarrow H^1(\mathcal E,A)\\
&\longrightarrow\operatorname{Ext}_{\mathcal E}(G,A)
\longrightarrow H^2(BG,A)\longrightarrow H^2(\mathcal E,A).
\end{aligned} \tag{2.14}
\]
Here \(\operatorname{Ext}_{\mathcal E}(G,A)\) denotes equivalence classes of group extensions inducing the given action, hence central extensions for trivial action. It is not an abelian-category Ext group. Corollary 3.11 of [3] gives the internal first-degree identification with the homomorphism object. We use the underlying general topos theorem, so no scheme representability hypothesis is imposed on \(V\). In the projective slices used below, Lemma 2.3 kills the two base-cohomology groups in (2.14), and extensions classify degree-two classes. [Giraud's exact sequence as recorded in Proposition 3.8](https://www.math.u-bordeaux.fr/~bmorin/classifyingtopos.pdf).

The remaining site input is projectivity of extremally disconnected compact spaces and the resulting projective tests, from Lectures I and II of [4]. Its concrete consequences are Lemma 2.3 and the injectivity of precomposition proved in Section 7.3. This use of projectivity concerns morphisms of condensed objects, without a claim that pullback is injective on positive-degree cohomology. [Lectures on Condensed Mathematics](https://people.mpim-bonn.mpg.de/scholze/Condensed.pdf).

These inputs have separate roles. The analytic results establish an invertible operator on derived sections. Torsor classification interprets a spatial degree-one class, and (2.14) later interprets group degree-two classes. Projective tests retain parameters and detect the internal cohomology objects. None of these steps requires a comparison between condensed group cohomology and an underived complex of continuous cochains.

## 3 The operator lemma on compact spaces

### 3.1 The two-term free induced resolution

Fix a compact Hausdorff space \(S\) and a continuous map \(f:S\to S\). Put
\[
P=\mathbb Z[S],\qquad F=f_*:P\to P,\qquad
A_0=\mathbb Z[U],\qquad U=\mathsf T^{-1}. \tag{3.1}
\]
Let \(N\) be the condensed \(A_0\)-module whose underlying condensed abelian group is \(P\) and on which \(U\) acts as \(F\). This is a module structure because prescribing one endomorphism prescribes an action of the polynomial ring. The construction does not require \(f\) to be invertible.

Write \(I(P)=A_0\otimes_{\mathbb Z}P\) for induction from condensed abelian groups. As a condensed abelian group it is \(\bigoplus_{n\ge0}U^nP\). The endomorphism \(F\) extends \(A_0\)-linearly to \(I(P)\). We use the same notation for the extension when its domain is specified by context.

**Lemma 3.1** (Induced resolution). With the notation above, the sequence
\[
0\longrightarrow I(P)\xrightarrow{\ D=U-F\ }I(P)
\xrightarrow{\ \varepsilon\ }N\longrightarrow0,
\qquad
\varepsilon(U^n\otimes x)=F^nx, \tag{3.2}
\]
is exact in condensed \(A_0\)-modules. The induced terms also compute derived induction from \(P\).

Proof. The formula for \(\varepsilon\) is \(A_0\)-linear because \(U\) acts on \(N\) as \(F\). It is surjective since its restriction to the summand \(U^0P\) is the identity on \(P\). The composition \(\varepsilon D\) is zero by \(F^{n+1}x-F^nFx=0\).

For exactness at the other terms, define a morphism of condensed abelian groups \(\eta:P\to I(P)\) by \(\eta(x)=1\otimes x\). Define another such morphism \(H:I(P)\to I(P)\) on its summands by
\[
H(1\otimes x)=0,\qquad
H(U^n\otimes x)=\sum_{j=0}^{n-1}U^{n-1-j}\otimes F^jx
\quad(n\ge1). \tag{3.3}
\]
Every sum in (3.3) is finite. The universal property of the direct sum therefore defines \(H\) as a condensed morphism. Telescoping on the summand \(U^nP\) gives
\[
DH=\mathrm{id}_{I(P)}-\eta\varepsilon,
\qquad HD=\mathrm{id}_{I(P)}. \tag{3.4}
\]
For example, the first identity is the cancellation of adjacent terms in
\[
\sum_{j=0}^{n-1}
\left(U^{n-j}\otimes F^jx-U^{n-1-j}\otimes F^{j+1}x\right)
=U^n\otimes x-1\otimes F^nx. \tag{3.5}
\]
For the second, subtract the expression for \(H(U^n\otimes Fx)\) from that for \(H(U^{n+1}\otimes x)\); only \(U^n\otimes x\) remains. Thus \(D\) is injective, and any element of the kernel of \(\varepsilon\) is the image under \(D\) of its image under \(H\). These are identities of morphisms, so they prove exactness in the abelian category, with parameters included.

Finally, \(A_0\) is free over \(\mathbb Z\), and induction is the direct-sum functor \(P\mapsto\bigoplus_{n\ge0}P\). Direct sums are exact in condensed abelian groups. Hence induction is exact and agrees with its left derived functor on \(P\). This proves the last assertion. ∎

The word induced in Lemma 3.1 is essential: it makes no projectivity assertion about \(P\). In particular, (3.2) is not being used as a projective resolution for an underived Hom calculation. We will apply derived functors to its exact triangle. The higher cohomology that may be present in \(R\operatorname{Hom}_{\mathbb Z}(P,V)\) is retained throughout.

### 3.2 Vanishing of the derived liquidification

Let \(0<r<1\), and abbreviate
\[
\mathcal F_{>r}(S)=M(S,\mathbb Z((\mathsf T))_{>r}),
\qquad
\mathcal F_\rho(S)=M(S,\mathbb Z((\mathsf T))_\rho)
\quad(r<\rho<1). \tag{3.6}
\]
Thus \(\mathcal F_{>r}(S)=\operatorname{colim}_{r<\rho<1}\mathcal F_\rho(S)\). Proposition 10.1(1) of [1] gives \(\mathcal F_{>r}(S)\) as the derived liquidification of \(I(P)\), concentrated in degree zero.

We recall the bounded-disk description needed for the inverse. A point of \(\mathcal F_\rho(S)\) has formal layers
\[
\mu=\sum_{j\in\mathbb Z}\mu_j\mathsf T^j,
\qquad \mu_j\in\mathbb Z[S],\qquad
\sum_j\rho^j|\mu_j|_1\le b \tag{3.7}
\]
on a disk with bound \(b>0\). Here \(|\mu_j|_1\) is the sum of the absolute integral coefficients after equal Dirac terms have been combined. The disk construction includes families in the compact spaces of integral chains of bounded mass. Its topology is the compact subspace topology in the product of the layer coordinates, as in Proposition 10.1. Formula (3.7) describes the mass bound, not a chosen topology on the coefficient \(V\).

Pushforward satisfies \(|F\mu_j|_1\le|\mu_j|_1\), since combining coefficients cannot increase their absolute sum. Also, the nonzero layers on a fixed disk have a common lower bound. Indeed, \(\mu_j\ne0\) implies \(|\mu_j|_1\ge1\), hence \(\rho^j\le b\); since \(0<\rho<1\), this excludes all sufficiently negative \(j\). This bound is uniform on the disk.

**Lemma 3.2** (The formal inverse). The endomorphism \(U-F\) of \(\mathcal F_{>r}(S)\) is invertible. Its inverse is the condensed \(A_0\)-linear morphism
\[
R_F=\sum_{n\ge0}F^n\mathsf T^{n+1}
=\mathsf T+F\mathsf T^2+F^2\mathsf T^3+\cdots. \tag{3.8}
\]

Proof. First work at a fixed radius \(r<\rho<1\). If \(\mu\) satisfies (3.7), the proposed output has layer coordinates
\[
(R_F\mu)_j=\sum_{n\ge0}F^n\mu_{j-n-1}. \tag{3.9}
\]
The common lower bound on the input layers makes this a finite sum at each \(j\), uniformly on the disk. The bound for pushforward gives
\[
\begin{aligned}
\sum_j\rho^j|(R_F\mu)_j|_1
&\le\sum_j\sum_{n\ge0}\rho^j|\mu_{j-n-1}|_1\\
&=\left(\sum_{n\ge0}\rho^{n+1}\right)
\sum_k\rho^k|\mu_k|_1
\le\frac{\rho}{1-\rho}\,b.
\end{aligned} \tag{3.10}
\]
The rearrangement uses only nonnegative real terms. The factor \(\rho/(1-\rho)\) is finite because \(\rho<1\).

Each output coordinate in (3.9) is a finite combination of continuous pushforward and addition maps on bounded integral-chain spaces. It is therefore continuous on the input disk. Estimate (3.10) puts all these output coordinates in the single compact target disk with bound \(b\rho/(1-\rho)\). By the product-coordinate description of that disk, (3.9) defines a continuous map to it. These maps agree as \(b\) increases, and hence define a condensed morphism on \(\mathcal F_\rho(S)\). The formulas also agree under change of radius. Passing to the defining colimit gives a condensed morphism on \(\mathcal F_{>r}(S)\).

The coordinate formula is additive and commutes with multiplication by \(U=\mathsf T^{-1}\), so the resulting morphism is \(A_0\)-linear. To check it is an inverse on both sides, use the partial sum \(R_{F,N}=\sum_{n=0}^NF^n\mathsf T^{n+1}\). Since \(F\) commutes with formal scalars, finite telescoping gives
\[
(U-F)R_{F,N}=R_{F,N}(U-F)
=1-F^{N+1}\mathsf T^{N+1}. \tag{3.11}
\]
For an input disk with a common lower layer bound, the residual term on the right has zero coordinate in any fixed layer once \(N\) is large enough. Its weighted mass is at most \(b\rho^{N+1}\), which tends to zero. Thus (3.11), or the same cancellation directly in the finite sums (3.9), gives
\[
(U-F)R_F=R_F(U-F)=1. \tag{3.12}
\]
All constructions were made on compact disks with uniform bounds. Consequently, (3.12) holds as an identity of condensed morphisms and not merely on ordinary-point elements. ∎

**Proposition 3.3** (Vanishing after liquidification). Let \(N=\mathbb Z[S]\) with \(U\) acting as \(f_*\), and let \(0<r<1\). Then
\[
L\operatorname{liq}_r(N)\simeq0
\quad\text{in }D(\operatorname{Liq}_r(A_0)). \tag{3.13}
\]

Proof. Regard (3.2) as the exact triangle
\[
I(P)\xrightarrow{\ U-F\ }I(P)\longrightarrow N
\longrightarrow I(P)[1]. \tag{3.14}
\]
Apply the triangulated functor \(L\operatorname{liq}_r\), whose existence is supplied by Theorem 6.10 of [1]. Proposition 10.1(1) of [1] applies because \(S\) is compact Hausdorff. It identifies each induced term with \(\mathcal F_{>r}(S)[0]\), naturally in the continuous map \(f\). Hence the first arrow becomes \(U-F\) on \(\mathcal F_{>r}(S)\). Lemma 3.2 makes this an isomorphism. Its cone, which is \(L\operatorname{liq}_r(N)\), is therefore zero. ∎

This proves the self-map assertion used inside the proof of Proposition 10.1 of [1]. No group structure or measure on \(S\) has entered the argument. The compact Hausdorff hypothesis enters through the identification of the free derived liquidification and the bounded-disk continuity in Lemma 3.2.

### 3.3 The quasi-isomorphism 2 - f*

**Theorem 3.4** (Theorem A: operator lemma). Let \(S\) be a compact Hausdorff space, let \(f:S\to S\) be continuous and let \(V\) be a \(p\)-liquid real vector space, where \(0<p\le1\). Then
\[
2-f^*:R\Gamma(S,V)\longrightarrow R\Gamma(S,V),
\qquad
R\Gamma(S,V)=R\operatorname{Hom}_{\mathbb Z}(\mathbb Z[S],V), \tag{3.15}
\]
is a quasi-isomorphism. The same conclusion holds for \(S\times T\) and \(f\times\mathrm{id}_T\) with \(T\) any compact Hausdorff space.

Proof. Set \(r=2^{-p}\). The assumptions on \(p\) give \(1/2\le r<1\). Regard \(V\) as an \(A_0\)-module by letting \(U\) act as multiplication by 2. By Theorem 6.9(2) of [1] and the specialization correspondence in Section 2.3, it is \(r\)-liquid. In particular, when \(p=1\), every radius used in the formal construction still satisfies \(\rho>1/2\), so the specialization uses exponents strictly below 1 and has the required hypotheses.

Derived adjunction (2.11) and Proposition 3.3 give
\[
R\operatorname{Hom}_{A_0}(N,V)
\simeq R\operatorname{Hom}_{\operatorname{Liq}_r(A_0)}
\bigl(L\operatorname{liq}_r(N),V\bigr)
\simeq0. \tag{3.16}
\]
Apply \(R\operatorname{Hom}_{A_0}(-,V)\) to (3.14). This produces a triangle whose first three terms are
\[
R\operatorname{Hom}_{A_0}(N,V)
\longrightarrow R\operatorname{Hom}_{A_0}(I(P),V)
\xrightarrow{\ D^*\ }R\operatorname{Hom}_{A_0}(I(P),V). \tag{3.17}
\]
Exact induction and the induction-restriction adjunction identify each of the last two terms with \(R\operatorname{Hom}_{\mathbb Z}(P,V)=R\Gamma(S,V)\).

Under this identification, precomposition with multiplication by \(U\) on the induced module is the action of \(U\) on the target, hence multiplication by 2. Precomposition with \(F\) is \(f^*\). For an ordinary morphism represented by \(a:P\to V\), the formula is
\[
a\longmapsto\bigl(x\longmapsto2a(x)-a(Fx)\bigr). \tag{3.18}
\]
The same identification holds in the derived category by naturality of derived induction-restriction adjunction and of the scalar action; it does not require a chosen injective resolution to have scalar action 2 on each individual term. Thus \(D^*\) in (3.17) is precisely \(2-f^*\).

By (3.16), the fiber of this endomorphism is zero. It is therefore an isomorphism in the derived category, proving (3.15). Finally, the product of two compact Hausdorff spaces is compact Hausdorff, and \(f\times\mathrm{id}_T\) is continuous. The same result applied to this product proves the last assertion. ∎

**Corollary 3.5** (Consequences on spatial cohomology). Under the hypotheses of Theorem 3.4, the map \(2-f^*\) is an automorphism of \(H^j(S,V)\) for every \(j\ge0\). In particular, if \(\alpha\in H^j(S,V)\) satisfies \(f^*\alpha=2\alpha\), then \(\alpha=0\). For every morphism \(z:S\to V\), there is a unique condensed morphism \(b:S\to V\) satisfying
\[
2b-b\circ f=z. \tag{3.19}
\]

Proof. A quasi-isomorphism induces an isomorphism on every cohomology group. Apply this to (3.15). Its injectivity proves the assertion about \(\alpha\). In degree zero, (2.7) identifies the resulting bijection with \(b\mapsto2b-b\circ f\) on condensed morphisms, so its surjectivity and injectivity give existence and uniqueness in (3.19). ∎

The assertion for every \(j\) in Corollary 3.5 is an invertibility statement in the cohomology of a compact space. It is not a vanishing statement about group cohomology. The later arguments obtain vanishing by first producing a specific relation \(f^*\alpha=2\alpha\). For first-degree group cocycles this relation comes from squaring; for the underlying extension torsor it comes from equivariance of squaring. No such relation is asserted here for arbitrary group-cohomological classes in higher degrees.

### 3.4 The parametrized version

We spell out the parameter statement because it provides the uniqueness used for conjugation in Section 5.3. Fix \(S,f,V\) as in Theorem 3.4. For a compact Hausdorff space \(T\), write
\[
F_T:T\times S\longrightarrow T\times S,
\qquad F_T(t,x)=(t,f(x)). \tag{3.20}
\]
Interchanging the two factors identifies this self-map with the product self-map in the theorem.

**Proposition 3.6** (Existence and uniqueness with parameters). For every compact Hausdorff \(T\), the endomorphism \(2-F_T^*\) of \(R\Gamma(T\times S,V)\) is a quasi-isomorphism. In particular, for each condensed morphism \(z:T\times S\to V\), there is a unique condensed morphism \(b:T\times S\to V\) such that
\[
2b(t,x)-b(t,f(x))=z(t,x). \tag{3.21}
\]
If \(\varphi:T'\to T\) is continuous between compact Hausdorff spaces, the solution for \(z\circ(\varphi\times\mathrm{id}_S)\) is \(b\circ(\varphi\times\mathrm{id}_S)\).

Proof. The product statement in Theorem 3.4 gives the quasi-isomorphism. Taking degree zero and using (2.7) gives the unique solution of (3.21). For naturality, the identity
\[
F_T\circ(\varphi\times\mathrm{id}_S)
=(\varphi\times\mathrm{id}_S)\circ F_{T'} \tag{3.22}
\]
shows that pullback commutes with \(2-F_T^*\). Pulling back (3.21) therefore gives the corresponding equation for \(T'\). Uniqueness on \(T'\times S\) identifies its solution with the pullback of \(b\). ∎

Two consequences will be used without changing the parameter space. First, if two morphisms \(a_1,a_2:T\times S\to V\) have the same image under \(2-F_T^*\), their difference is in its zero kernel, and hence \(a_1=a_2\) as condensed morphisms. The comparison is made on the whole product, not only after specializing \(t\) to ordinary points. Second, if a class \(\alpha\in H^1(T\times S,V)\) satisfies \(F_T^*\alpha=2\alpha\), the degree-one part of the same quasi-isomorphism gives \(\alpha=0\). These are respectively the uniqueness and torsor-triviality forms of the operator lemma.

All hypotheses needed for these applications are stable under the parameters in the rest of the paper. Products \(T\times G^a\) are compact Hausdorff when \(G\) and \(T\) are compact Hausdorff, and squaring in a chosen group coordinate is continuous. The coefficient on such a product is the pullback of the original \(V\); derived sections are still those of (2.6). We therefore apply Proposition 3.6 to that original coefficient and the total compact space, without assuming a new liquid-structure theorem inside each slice. This is the form of the operator argument needed for internal cohomology.

## 4 Vanishing of the first cohomology

### 4.1 The squaring relation for cocycles

Let \(G\) be a compact group and let \(V\) have trivial \(G\)-action. For a compact Hausdorff space \(T\), a family of homomorphisms from \(G\) to \(V\) means a condensed morphism \(a:T\times G\to V\) satisfying
\[
a(t,gh)=a(t,g)+a(t,h) \tag{4.1}
\]
as an identity on \(T\times G\times G\). Substituting the unit in both group coordinates gives \(a(t,1)=0\). Substituting \(h=g\) gives the relation to which the operator lemma applies:
\[
a(t,g^2)=2a(t,g). \tag{4.2}
\]
All substitutions here are pullbacks along continuous maps of compact Hausdorff spaces. In particular, these equations express identities of families, including their condensed structure.

**Lemma 4.1** (Homomorphism families vanish). Let \(G\) be any compact group, let \(T\) be compact Hausdorff and let \(V\) be a \(p\)-liquid real vector space, where \(0<p\le1\). Every family \(a:T\times G\to V\) satisfying (4.1) is zero.

Proof. Let \(d:G\to G\) be the continuous map \(d(g)=g^2\), and put \(D_T=\mathrm{id}_T\times d\). The product \(T\times G\) is compact Hausdorff. Theorem 3.4, in the form of Proposition 3.6, makes
\[
2-D_T^*:H^0(T\times G,V)\longrightarrow H^0(T\times G,V) \tag{4.3}
\]
an automorphism. Equation (4.2) says precisely that \(a\) belongs to its kernel. This kernel is zero, so \(a=0\). The proof uses only the continuity of squaring, not an assertion that squaring is a group homomorphism. ∎

For completeness, we give the low-degree interpretation needed to apply this lemma to internal cohomology. This also specifies why the cocycle in (4.1) represents all the relevant degree-one classes on projective test spaces.

**Lemma 4.2** (First-degree classes on projective slices). Let \(T\) be an extremally disconnected compact Hausdorff space. For trivial action, there is a natural identification
\[
H^1(BG_T,V_T)
\cong\operatorname{Hom}_{\mathrm{grp},\mathrm{Cond}/T}(G_T,V_T). \tag{4.4}
\]
The right side consists of precisely the morphisms \(a:T\times G\to V\) satisfying (4.1).

Proof. Apply the general topos exact sequence (2.14), from VIII.7.1.5 of [2] and Proposition 3.8 of [3], in the topos \(\mathcal E=\mathrm{Cond}/T\). Its first three terms identify the right side of (4.4) with the kernel of the forgetful map to \(H^1(\mathcal E,V_T)\). This last group is zero by Lemma 2.3. Hence that kernel is all of \(H^1(BG_T,V_T)\).

One can also describe the identification directly using the torsor interpretation of first cohomology in [2]. A \(V_T\)-torsor in \(BG_T\) is a \(V_T\)-torsor over \(T\) with a compatible \(G_T\)-action. Its underlying torsor has a section \(q\), since \(H^1(\mathcal E,V_T)=0\). There is then a unique morphism \(a\) such that
\[
g\cdot q=q+a(t,g). \tag{4.5}
\]
Trivial action on \(V_T\) means that the \(G_T\)-action commutes with its translations. Applying first \(h\), then \(g\), to \(q\) therefore gives (4.1). Replacing \(q\) by \(q+b(t)\) leaves \(a\) unchanged, again by triviality of the coefficient action. Conversely, (4.1) makes translation by \(a(t,g)\) into a \(G_T\)-action on the trivial \(V_T\)-torsor. These constructions identify isomorphism classes and are inverse to one another. They give the same identification as the exact sequence. ∎

The role of projectivity in Lemma 4.2 is to trivialize the underlying torsor over the parameter space. Lemma 4.1 itself allows every compact Hausdorff \(T\), without this extra condition. Thus the analytic step and the cohomological interpretation impose different hypotheses on the parameter, and both are available on the tests used for internal cohomology.

### 4.2 Main statement

**Theorem 4.3** (Theorem B1: first-degree vanishing). Let \(G\) be any compact group and let \(V\) be a \(p\)-liquid real vector space with trivial \(G\)-action, where \(0<p\le1\). Then
\[
\underline H^1(G,V)=0. \tag{4.6}
\]

Proof. Fix an extremally disconnected compact Hausdorff space \(T\). Formula (2.10) and Lemma 4.2 give
\[
\underline H^1(G,V)(T)
\cong H^1(BG_T,V_T)
\cong\operatorname{Hom}_{\mathrm{grp},\mathrm{Cond}/T}(G_T,V_T). \tag{4.7}
\]
The hypotheses of Lemma 4.1 hold for this \(T\), \(G\) and \(V\). It makes the last group zero. Since (4.7) vanishes on every projective test space, Lemma 2.3 implies (4.6). ∎

This argument applies to disconnected compact groups and requires no Lie group structure. The relation used to eliminate a class is the squaring relation (4.2), which follows from the homomorphism identity. Triviality of the action is used in identifying that identity: a crossed homomorphism for a nontrivial action satisfies a different formula, so Theorem 4.3 makes no assertion in that setting. The proof also places no topological representability condition on \(V\); its only coefficient input is Theorem 3.4.

## 5 Central extensions and square-compatible sections

### 5.1 The underlying torsor is trivial

Consider a central extension in condensed groups
\[
1\longrightarrow V\xrightarrow{\iota}E\xrightarrow{\pi}G\longrightarrow1, \tag{5.1}
\]
where \(G\) is compact and \(V\) is a \(p\)-liquid real vector space. Exactness means that \(\iota\) identifies \(V\) with the kernel and that \(\pi\) is an epimorphism of condensed groups. Centrality means that the image of \(\iota\) commutes with every element of \(E\), as an identity of morphisms. We use additive notation in \(V\) and multiplicative notation in \(E\), so \(\iota(v+w)=\iota(v)\iota(w)\).

The map \(\pi\), with the action \((v,e)\mapsto\iota(v)e\), is a \(V\)-torsor over \(G\). Indeed, it is locally inhabited because \(\pi\) is an epimorphism. The map
\[
V\times E\longrightarrow E\times_G E,
\qquad(v,e)\longmapsto(\iota(v)e,e) \tag{5.2}
\]
is an isomorphism: its inverse sends \((e',e)\) to the unique pair \((v,e)\) with \(\iota(v)=e'e^{-1}\). The latter expression belongs to the kernel because the two elements have the same image in \(G\). These constructions are morphisms of condensed objects. In particular, torsor classification applies without assuming that \(E\) is represented by a topological group.

**Proposition 5.1** (Triviality of the extension torsor). Under the hypotheses of (5.1), the underlying \(V\)-torsor over \(G\) is trivial. More generally, let \(T\) be compact Hausdorff and consider a central extension of group objects in \(\mathrm{Cond}/T\),
\[
1\longrightarrow V_T\longrightarrow E_T\longrightarrow G_T\longrightarrow1. \tag{5.3}
\]
The underlying torsor over \(T\times G\) is trivial as well. Here \(E_T\) is allowed to be an extension in the slice, not necessarily the pullback of an extension over \(*\).

Proof. First consider (5.1). Let \(\alpha\in H^1(G,V)\) be the class of its underlying torsor, using the spatial cohomology of Definition 2.4 and the torsor classification of [2]. Put \(d(g)=g^2\). Squaring in \(E\) covers \(d\) and has the equivariance property
\[
\pi(e^2)=\pi(e)^2,
\qquad
(\iota(v)e)^2=\iota(2v)e^2. \tag{5.4}
\]
The second equality follows by commuting the middle occurrence of \(\iota(v)\) past \(e\), using centrality.

Write \([2]_*E\) for the torsor obtained by changing the structure group along \([2]:V\to V\). Locally, its elements have representatives \([e,v]\), with the relation
\[
[\iota(a)e,v]=[e,2a+v]. \tag{5.5}
\]
Equation (5.4) defines a \(V\)-equivariant map
\[
[2]_*E\longrightarrow d^*E,
\qquad [e,v]\longmapsto(\pi(e),\iota(v)e^2). \tag{5.6}
\]
It is well defined by (5.5). Both objects are \(V\)-torsors over \(G\), and an equivariant morphism between torsors is an isomorphism. To check this last assertion, trivialize the source and target locally on their common base. In such trivializations an equivariant map is translation by its value at zero, with inverse translation by its negative. Thus (5.6) is an isomorphism of torsors, giving
\[
d^*\alpha=2\alpha
\quad\text{in }H^1(G,V). \tag{5.7}
\]
The factor 2 is the action on cohomology induced by multiplication by 2 on the abelian coefficient; it is exactly the pushforward operation in (5.6).

Theorem 3.4 applies to the compact Hausdorff space \(G\) and its continuous self-map \(d\). Its degree-one consequence makes \(2-d^*\) an automorphism of \(H^1(G,V)\). Equation (5.7) therefore implies \(\alpha=0\). A zero torsor class has a global section, so there is a condensed morphism \(\sigma:G\to E\) with \(\pi\sigma=\mathrm{id}_G\).

For (5.3), all group operations in this argument are performed in a single fiber over \(t\in T\). The torsor class is in \(H^1(T\times G,V)\), since its coefficient is pulled back from \(V\). Fiberwise squaring covers \(D_T(t,g)=(t,g^2)\), and the same construction gives \(D_T^*\alpha=2\alpha\). The space \(T\times G\) is compact Hausdorff, so Proposition 3.6 kills this class and supplies a section over \(T\times G\). No projectivity assumption on \(T\) is needed. ∎

The cohomology in (5.7) is the cohomology of the underlying space. It is distinct from \(\underline H^1(G,V)\), which was treated in Section 4. Proposition 5.1 does not use that group-cohomological vanishing. It obtains the section by applying the operator lemma directly to the spatial torsor class. Squaring is used only as the equivariant map in (5.4); for a nonabelian group it need not preserve multiplication.

### 5.2 Existence and uniqueness of the square-compatible section

**Definition 5.2** (Square-compatible section). A section \(s:G\to E\) of (5.1) is square-compatible if
\[
s(g)^2=s(g^2). \tag{5.8}
\]
For an extension (5.3) over \(T\), the same term means that the identity \(s(t,g)^2=s(t,g^2)\) holds as an identity of morphisms over \(T\). Group products on the left take place in the fiber of \(E_T\to T\).

**Proposition 5.3** (Unique square-compatible section with parameters). Let \(T\) be compact Hausdorff, let \(G\) be a compact group and let \(V\) be a \(p\)-liquid real vector space, where \(0<p\le1\). Every central extension (5.3) has a unique square-compatible section \(s\). It satisfies \(s(t,1)=1\). Pullback of this section along any continuous map \(T'\to T\) of compact Hausdorff parameter spaces is the square-compatible section of the pulled-back extension.

Proof. Proposition 5.1 gives a section \(\sigma:T\times G\to E_T\). The two elements \(\sigma(t,g)^2\) and \(\sigma(t,g^2)\) have the same image in \(G_T\). Their ratio therefore defines a unique condensed morphism \(z:T\times G\to V\) by
\[
\iota(z(t,g))=\sigma(t,g)^2\sigma(t,g^2)^{-1}. \tag{5.9}
\]
The use of the kernel isomorphism in (5.9) ensures that \(z\) is a morphism with the full parameter, rather than a function defined only on ordinary points.

Apply Proposition 3.6 to \(G\), \(d(g)=g^2\) and the parameter \(T\). It supplies a unique condensed morphism \(b:T\times G\to V\) with
\[
2b(t,g)-b(t,g^2)=z(t,g). \tag{5.10}
\]
Define
\[
s(t,g)=\iota(-b(t,g))\sigma(t,g). \tag{5.11}
\]
This is a section, because its correction factor is in the kernel. Centrality and (5.9) give
\[
\begin{aligned}
s(t,g)^2
&=\iota(-2b(t,g))\sigma(t,g)^2\\
&=\iota(-2b(t,g)+z(t,g))\sigma(t,g^2)\\
&=\iota(-b(t,g^2))\sigma(t,g^2)\\
&=s(t,g^2).
\end{aligned} \tag{5.12}
\]
The third line is precisely (5.10), with its signs arranged as displayed. This proves existence.

For uniqueness, suppose \(s_1\) and \(s_2\) are square-compatible sections of the same extension. Their difference is the unique morphism \(a:T\times G\to V\) satisfying \(s_2(t,g)=\iota(a(t,g))s_1(t,g)\). Squaring this identity and using the square compatibility of both sections gives
\[
\iota(2a(t,g))s_1(t,g^2)
=\iota(a(t,g^2))s_1(t,g^2). \tag{5.13}
\]
Cancel the common factor and use injectivity of \(\iota\) to obtain \(2a(t,g)-a(t,g^2)=0\). The degree-zero injectivity in Proposition 3.6 gives \(a=0\), hence \(s_1=s_2\) as morphisms on the whole product \(T\times G\).

Restriction of (5.8) to the unit section gives \(s(t,1)^2=s(t,1)\). Cancellation in the group object gives \(s(t,1)=1\). Finally, a pulled-back section is square-compatible because (5.8) is preserved under pullback. Applying uniqueness for \(T'\) identifies it with the section constructed there. ∎

The initial section \(\sigma\) used in this proof carries no normalization condition. Equation (5.10) corrects its entire square defect, including its value at the unit. Uniqueness consequently makes the resulting section independent of \(\sigma\). In particular, no integral, norm or infinite sum in \(V\) was used to define the correction. Its existence and uniqueness are consequences of an automorphism of condensed section groups.

The parameter in Proposition 5.3 can itself be a product, such as \(T\times G\). This will allow a group element that performs conjugation to vary as a parameter. It is important that the uniqueness proof took place on \(T\times G\): a collection of separate uniqueness assertions after specializing the parameter to ordinary points would not give the required statement for arbitrary condensed coefficients.

### 5.3 Conjugation and inversion compatibility

We first work over the ordinary base and then specify the parameter version. Let \(s\) be the unique section from Proposition 5.3 with \(T=*\).

**Lemma 5.4** (Compatibility with inversion). The square-compatible section satisfies
\[
s(g^{-1})=s(g)^{-1} \tag{5.14}
\]
as an identity of condensed morphisms on \(G\). For an extension over compact Hausdorff \(T\), the same identity holds with \(t\) retained in every term.

Proof. Define \(r(g)=s(g^{-1})^{-1}\). Projection gives \(\pi(r(g))=(g^{-1})^{-1}=g\), so \(r\) is a section. The group identity \((x^{-1})^2=(x^2)^{-1}\) and square compatibility of \(s\) give
\[
r(g)^2
=\bigl(s(g^{-1})^2\bigr)^{-1}
=s(g^{-2})^{-1}
=r(g^2). \tag{5.15}
\]
Thus \(r\) is square-compatible. Proposition 5.3 makes \(r=s\), which is equivalent to (5.14). The same construction is a morphism over \(T\); its verification and the uniqueness argument apply on \(T\times G\) without specializing \(t\). ∎

**Lemma 5.5** (Compatibility with conjugation). The square-compatible section satisfies
\[
s(k)s(g)s(k)^{-1}=s(kgk^{-1}) \tag{5.16}
\]
as an identity of condensed morphisms on \(G_k\times G_g\). For an extension over compact Hausdorff \(T\), it holds on \(T\times G_k\times G_g\), with every section evaluated at the same parameter \(t\).

Proof. Use \(G_k\) as a compact Hausdorff parameter space, and pull (5.1) back to that base. Define two sections of this extension, over the variable \(g\), by
\[
a(k,g)=s(k)s(k^{-1}gk)s(k)^{-1},
\qquad b(k,g)=s(g). \tag{5.17}
\]
The first covers \(g\), since \(k(k^{-1}gk)k^{-1}=g\). It is square-compatible in the \(g\) coordinate because
\[
\begin{aligned}
a(k,g)^2
&=s(k)s(k^{-1}gk)^2s(k)^{-1}\\
&=s(k)s((k^{-1}gk)^2)s(k)^{-1}\\
&=s(k)s(k^{-1}g^2k)s(k)^{-1}\\
&=a(k,g^2).
\end{aligned} \tag{5.18}
\]
Here the first equality cancels the adjacent factors \(s(k)^{-1}s(k)\), and the second uses only square compatibility. The section \(b\) is square-compatible by construction.

Apply Proposition 5.3 with parameter space \(G_k\). Equivalently, the difference of the sections in (5.17) is a morphism on \(G_k\times G_g\) killed by \(2-(\mathrm{id}_{G_k}\times d)^*\); Proposition 3.6 makes this difference zero. Hence
\[
s(k)s(k^{-1}gk)s(k)^{-1}=s(g). \tag{5.19}
\]
Pull back (5.19) along \((k,g)\mapsto(k,kgk^{-1})\). This gives exactly (5.16). Both the comparison and this substitution are on the entire compact product.

For an extension over \(T\), pull it back to the compact parameter space \(T\times G_k\). Define (5.17) with the parameter \(t\) present. The calculation (5.18) is fiberwise over this parameter space, so Proposition 5.3 again identifies the sections. The same substitution proves (5.16) on \(T\times G_k\times G_g\). ∎

**Theorem 5.6** (Theorem C: square-compatible section). Let \(0<p\le1\), let \(G\) be compact and let
\[
1\longrightarrow V\xrightarrow{\iota}E\xrightarrow{\pi}G\longrightarrow1 \tag{5.20}
\]
be a central extension in condensed groups, where \(V\) is a \(p\)-liquid real vector space. The underlying \(V\)-torsor is trivial. There is a unique square-compatible section \(s:G\to E\), characterized by \(s(g)^2=s(g^2)\) and \(s(1)=1\). It satisfies
\[
s(g^{-1})=s(g)^{-1},
\qquad
s(k)s(g)s(k)^{-1}=s(kgk^{-1}). \tag{5.21}
\]

Proof. Proposition 5.1 gives triviality of the torsor. Proposition 5.3 with \(T=*\) gives existence, uniqueness and normalization of the square-compatible section. Lemmas 5.4 and 5.5 give the two identities in (5.21). ∎

The logical role of (5.21) is worth recording before studying the defect. These identities are consequences of square compatibility and uniqueness; they are not extra conditions imposed on an extension. More precisely, the construction in Section 5.2 and the parameter argument in Lemma 5.5 give the chain
\[
\begin{gathered}
s(g)^2=s(g^2)
\quad\xRightarrow{\text{uniqueness on }G_k\times G_g}
\quad s(k)s(g)s(k)^{-1}=s(kgk^{-1}),\\
s(g)^2=s(g^2)
\quad\xRightarrow{\text{uniqueness on }G}
\quad s(g^{-1})=s(g)^{-1}.
\end{gathered} \tag{5.22}
\]
The relevant uniqueness is supplied by the operator lemma. Theorem 5.6 holds for every compact group, and its proof has not used any special property of \(\mathrm{SU}(2)\).

## 6 The multiplication defect

### 6.1 Symmetry of the defect

Let \(G\) be compact, let (5.1) be a central extension by \(V\) and let \(s\) be the section of Theorem 5.6. Define its multiplication defect \(c:G\times G\to V\) by
\[
s(g)s(h)=\iota(c(g,h))s(gh). \tag{6.1}
\]
This is a condensed morphism: the product \(s(g)s(h)s(gh)^{-1}\) is a morphism into the kernel, and \(\iota\) identifies that kernel with \(V\). No choice of a lift remains in this definition.

For reference, the normalization and associativity identities are
\[
\begin{gathered}
c(1,g)=c(g,1)=0,\qquad c(g,g)=0,\\
c(g,h)+c(gh,k)=c(h,k)+c(g,hk).
\end{gathered} \tag{6.2}
\]
The first two equalities use \(s(1)=1\), and the diagonal equality uses \(s(g)^2=s(g^2)\). For the final equality, expand \((s(g)s(h))s(k)\) using (6.1); its coefficient of \(s(ghk)\) is \(c(g,h)+c(gh,k)\). Expanding \(s(g)(s(h)s(k))\) gives \(c(h,k)+c(g,hk)\), since the kernel factor commutes with \(s(g)\). Associativity, cancellation of \(s(ghk)\) and injectivity of \(\iota\) give the identity. Thus \(c\) is a normalized condensed 2-cocycle with trivial coefficients. We use it as the defect of an already constructed extension section; we do not assume that underived 2-cocycles compute all derived cohomology classes.

**Proposition 6.1** (Symmetry). For every compact \(G\) under the hypotheses above, the defect satisfies
\[
c(g,h)=c(h,g) \tag{6.3}
\]
as an identity of condensed morphisms on \(G^2\).

Proof. Conjugate both sides of (6.1) by \(s(g)^{-1}\). Cancellation on the left and centrality on the right give
\[
\begin{aligned}
s(h)s(g)
&=s(g)^{-1}\bigl(s(g)s(h)\bigr)s(g)\\
&=\iota(c(g,h))s(g)^{-1}s(gh)s(g)\\
&=\iota(c(g,h))s\bigl(g^{-1}(gh)g\bigr)\\
&=\iota(c(g,h))s(hg).
\end{aligned} \tag{6.4}
\]
We explain the third line using both identities in (5.21). Conjugation compatibility, pulled back along \((g,h)\mapsto(g^{-1},gh)\), first gives
\[
s(g^{-1})s(gh)s(g^{-1})^{-1}
=s\bigl(g^{-1}(gh)g\bigr). \tag{6.5}
\]
Inversion compatibility then identifies \(s(g^{-1})\) with \(s(g)^{-1}\), and consequently identifies \(s(g^{-1})^{-1}\) with \(s(g)\). Substituting both identifications in (6.5) gives the third line of (6.4). All occurrences of \(g\) remain variable throughout this pullback; none is treated as a scalar acting on \(V\).

On the other hand, applying (6.1) to the reversed pair gives \(s(h)s(g)=\iota(c(h,g))s(hg)\). Comparing this with (6.4), canceling the common right factor \(s(hg)\) and using injectivity of \(\iota\) proves (6.3). In particular, the calculation never replaces \(gh\) by \(hg\); conjugation changes the endpoint to \(g^{-1}(gh)g=hg\). ∎

This proves the next link in the dependency chain (5.22): square compatibility gives conjugation and inversion compatibility by uniqueness, and those two identities give symmetry by (6.4). In the numbering of the present paper, the implication is
\[
\begin{gathered}
\text{square compatibility (5.8)}\\
\Longrightarrow\ \text{the identities (5.21), by parametrized uniqueness}\\
\Longrightarrow\ \text{the conjugation calculation (6.4)}\\
\Longrightarrow\ \text{symmetry (6.3)}.
\end{gathered} \tag{6.6}
\]
Only the first part of Theorem 5.6 was used to obtain a section. It is the uniqueness proved in Section 5.2 that supplies the additional identities needed in this chain. Symmetry is therefore a conclusion for the canonical section of any extension under consideration, rather than a restriction on the extensions allowed in the argument.

We will also need invariance when both arguments are conjugated by the same element.

**Lemma 6.2** (Simultaneous conjugation invariance). The defect satisfies
\[
c(kgk^{-1},khk^{-1})=c(g,h) \tag{6.7}
\]
as an identity on \(G_k\times G_g\times G_h\).

Proof. Conjugation compatibility gives
\[
\begin{aligned}
s(kgk^{-1})s(khk^{-1})
&=s(k)s(g)s(h)s(k)^{-1}\\
&=\iota(c(g,h))s(k)s(gh)s(k)^{-1}\\
&=\iota(c(g,h))s(kghk^{-1}).
\end{aligned} \tag{6.8}
\]
The first equality cancels the adjacent middle factors \(s(k)^{-1}s(k)\); the second uses centrality. By definition of the defect, the left side of (6.8) is also
\[
\iota\bigl(c(kgk^{-1},khk^{-1})\bigr)
 s\bigl((kgk^{-1})(khk^{-1})\bigr). \tag{6.9}
\]
The final factor is \(s(kghk^{-1})\). Cancel it from (6.8) and (6.9) and use injectivity of \(\iota\). This proves (6.7) on the full product. ∎

The proofs of symmetry and simultaneous conjugation invariance use different substitutions into the compatibility of the section. Invariance alone does not exchange the two entries of a defect. Equation (6.4) exchanges them by conjugating the product of their chosen lifts and computing the resulting endpoint in \(G\). This distinction will be retained when the invariance identity is pulled back to a space of conjugating choices in Section 7.

### 6.2 Antisymmetry of the defect

Let \(J:G^2\to G^2\) and \(\tau:G^2\to G^2\) be the continuous maps
\[
J(g,h)=(g^{-1},h^{-1}),
\qquad \tau(g,h)=(h,g). \tag{6.10}
\]
The term antisymmetry in this subsection refers to the sign introduced by simultaneous inversion, with the order of the two entries also tracked. It does not assert that the symmetric defect in (6.3) has already vanished.

**Proposition 6.3** (The inversion identity). The defect of the square-compatible section satisfies
\[
c(g^{-1},h^{-1})=-c(h,g). \tag{6.11}
\]
Consequently,
\[
c\circ J=-c. \tag{6.12}
\]

Proof. Begin with the defining equation for the reversed pair,
\[
s(h)s(g)=\iota(c(h,g))s(hg). \tag{6.13}
\]
Take inverses. Inversion reverses the order on the left. On the right, it negates the kernel coordinate, which can be commuted past the other factor by centrality. Hence
\[
\begin{aligned}
s(g)^{-1}s(h)^{-1}
&=s(hg)^{-1}\iota(-c(h,g))\\
&=\iota(-c(h,g))s((hg)^{-1})\\
&=\iota(-c(h,g))s(g^{-1}h^{-1}).
\end{aligned} \tag{6.14}
\]
The second line uses inversion compatibility for the section at \(hg\). The same compatibility identifies the left side with \(s(g^{-1})s(h^{-1})\). Apply (6.1) to this pair and cancel \(s(g^{-1}h^{-1})\) to obtain (6.11). Finally, Proposition 6.1 gives \(c(h,g)=c(g,h)\), so (6.11) becomes (6.12). ∎

Every identity in this section remains valid for an extension over compact Hausdorff \(T\). To see this, form its defect \(c:T\times G^2\to V\) using Proposition 5.3. Lemmas 5.4 and 5.5 give the two section identities with the parameter present, and the products, inverses and cancellations in (6.4), (6.8) and (6.14) all preserve \(t\). Thus one obtains, as morphism identities,
\[
\begin{gathered}
c(t,g,h)=c(t,h,g),\\
c(t,kgk^{-1},khk^{-1})=c(t,g,h),\\
c(t,g^{-1},h^{-1})=-c(t,h,g)=-c(t,g,h).
\end{gathered} \tag{6.15}
\]
This observation uses the established parameter version of uniqueness, not a test on the individual fibers at ordinary values of \(t\).

For a general compact group, (6.15) is the conclusion reached at this stage. It imposes symmetry, conjugation invariance and a sign under inversion, but it does not identify simultaneous inversion with simultaneous conjugation. The next section proves the required geometric relation for \(\mathrm{SU}(2)\). After pullback to the compact space recording that relation, the second and third identities in (6.15) will give both \(c(t,g,h)\) and its negative as the same morphism. Injectivity of precomposition will then return the resulting equality to \(T\times G^2\).

## 7 Paired inversion in SU(2)

### 7.1 The relation space W

In this section, set \(G=\mathrm{SU}(2)\). We use its realization as the group \(\mathrm{Sp}(1)\) of unit quaternions. The identification, including the multiplication convention, is given in Appendix A. The property needed below concerns two elements at a time: the conjugating element is allowed to depend on the pair. We retain every possible choice in a single compact space.

**Definition 7.1** (The paired inversion relation). Define
\[
W=\left\{(u,g,h)\in G^3:
ugu^{-1}=g^{-1},\quad uhu^{-1}=h^{-1}\right\},
\qquad
\pi_W:W\longrightarrow G^2,\quad (u,g,h)\longmapsto(g,h). \tag{7.1}
\]
The space \(W\) carries the subspace topology from \(G^3\). Let \(r_u,r_g,r_h:W\to G\) denote its three coordinate maps.

**Lemma 7.2** (Compactness of the relation space). The space \(W\) is compact Hausdorff, and \(\pi_W\) is continuous.

Proof. The maps \((u,g,h)\mapsto ugu^{-1}\) and \((u,g,h)\mapsto g^{-1}\) are continuous, since multiplication and inversion in \(G\) are continuous. Their equalizer is closed: it is the inverse image of the closed diagonal in \(G\times G\). The same argument applies to the two maps involving \(h\). Their closed intersection is \(W\). The space \(G^3\) is compact Hausdorff, so its closed subspace \(W\) is compact Hausdorff. The coordinate projection restricts to the stated continuous map. ∎

The equations defining \(W\) are identities of continuous maps on that space. Consequently, they are also identities of condensed morphisms and can be substituted into the identities of Section 6. For a compact Hausdorff parameter space \(T\), the corresponding relation space is \(T\times W\). Its projection
\[
\pi_{W,T}=\mathrm{id}_T\times\pi_W:
T\times W\longrightarrow T\times G^2 \tag{7.2}
\]
keeps the parameter unchanged. Compactness is retained under this product. This construction does not require a section of \(\pi_W\).

### 7.2 The projection W -> G^2 is surjective

**Lemma 7.3** (Paired inversion). For every \(g,h\in\mathrm{SU}(2)\), there exists \(u\in\mathrm{SU}(2)\) such that
\[
ugu^{-1}=g^{-1},\qquad uhu^{-1}=h^{-1}. \tag{7.3}
\]
In particular, \(\pi_W\) and every map \(\pi_{W,T}\) in (7.2) are surjective.

Proof. Write the corresponding unit quaternions as \(g=a+v\) and \(h=b+w\), where \(a,b\in\mathbb R\) and \(v,w\) belong to the three-dimensional space of pure imaginary quaternions. The span of \(v,w\) has dimension at most two. Its orthogonal complement therefore contains a unit vector \(u\). As a pure imaginary unit quaternion, this vector satisfies \(u^2=-1\), so it belongs to \(\mathrm{Sp}(1)\) and has inverse \(-u\).

For perpendicular pure imaginary quaternions, the multiplication rule gives \(uv=-vu\). It follows that
\[
uvu^{-1}=-uvu=vu^2=-v. \tag{7.4}
\]
The same calculation gives \(uwu^{-1}=-w\). Real scalars commute with \(u\), and inversion of a unit quaternion is quaternion conjugation. Thus
\[
u(a+v)u^{-1}=a-v=(a+v)^{-1},
\qquad
u(b+w)u^{-1}=b-w=(b+w)^{-1}. \tag{7.5}
\]
This proves (7.3). The proof includes the cases of zero or dependent imaginary parts, since their common orthogonal complement still contains a unit vector. Hence every point of \(G^2\) has a preimage in \(W\). Taking its product with the unchanged coordinate in \(T\) proves the last assertion. ∎

This argument establishes surjectivity as a statement about compact Hausdorff spaces. It does not select \(u\) continuously as \((g,h)\) varies. No such selection is used below. It also does not produce a single inner automorphism equal to inversion on all of \(G\). In a nonabelian group inversion cannot be a group automorphism: equality of \((gh)^{-1}\) with both \(g^{-1}h^{-1}\) and \(h^{-1}g^{-1}\) would force commutativity. Appendix A records the corresponding quaternion obstruction for the triple \(i,j,k\).

### 7.3 Precomposition is injective

We now pass from the surjectivity just proved to the precise injectivity statement used for the condensed defect. The target in this statement need not be represented by a topological space.

**Lemma 7.4** (Injectivity along a compact surjection). Let \(q:X\to Y\) be a surjective continuous map of compact Hausdorff spaces, and let \(A\) be a condensed set. Precomposition is injective:
\[
q^*:\operatorname{Hom}_{\mathrm{Cond}}(Y,A)
\longrightarrow\operatorname{Hom}_{\mathrm{Cond}}(X,A). \tag{7.6}
\]

Proof. Let \(P\) be an extremally disconnected compact Hausdorff space, and let \(y:P\to Y\) be a condensed morphism. Since both spaces are compact Hausdorff, this is a continuous map. The pullback \(P\times_Y X\to P\) is a surjection of compact Hausdorff spaces. Projectivity of \(P\), as recalled in Lecture II of [4], gives a section of this pullback. Its composition with the second projection is a continuous lift \(x:P\to X\) with \(qx=y\). Thus
\[
\operatorname{Hom}(P,X)\longrightarrow\operatorname{Hom}(P,Y)
\quad\text{is surjective for every such }P. \tag{7.7}
\]

Suppose \(a,b:Y\to A\) satisfy \(aq=bq\). For any \(y\) as above, choose the lift \(x\); then \(ay=aqx=bqx=by\). Thus \(a\) and \(b\) agree after every morphism from every extremally disconnected test space. These test objects generate the condensed topos, by the site description in [4], so \(a=b\). This proves (7.6). The use of a lift here is confined to each test morphism; no continuous section of \(q\) on all of \(Y\) is required. ∎

Apply Lemma 7.4 to (7.2), using Lemmas 7.2 and 7.3. For every compact Hausdorff \(T\) and every condensed abelian group \(A\), it gives an injection
\[
\operatorname{Hom}_{\mathrm{Cond}}(T\times G^2,A)
\hookrightarrow
\operatorname{Hom}_{\mathrm{Cond}}(T\times W,A). \tag{7.8}
\]
In particular, a morphism \(T\times G^2\to V\) is zero if its precomposition with \(\pi_{W,T}\) is zero. Only injectivity of precomposition is being asserted. There is no construction of a morphism from compatible local data, and no descent data are needed. The proof also makes no claim that the analogous pullback on positive-degree spatial cohomology is injective.

## 8 Vanishing of the second cohomology for SU(2)

### 8.1 The defect vanishes

Let \(G=\mathrm{SU}(2)\), let \(T\) be compact Hausdorff and consider a central extension (5.3) in \(\mathrm{Cond}/T\). Its coefficient is the pullback \(V_T\) of the fixed \(p\)-liquid real vector space \(V\). Proposition 5.3 gives its square-compatible section \(s\), and Section 6 defines its defect \(c:T\times G^2\to V\). All the identities (6.15) hold for arbitrary extensions in this slice, including extensions that vary with the parameter.

**Proposition 8.1** (Splitting with compact parameters). Every such extension has a unique splitting as a group object over \(T\). Its splitting is the square-compatible section.

Proof. Pull back the simultaneous conjugation identity in (6.15) to \(T\times W\), substituting the coordinate \(u\) for the conjugating variable. By the defining equations (7.1), this gives
\[
c(t,g,h)=c(t,ugu^{-1},uhu^{-1})
=c(t,g^{-1},h^{-1})
\quad\text{on }T\times W. \tag{8.1}
\]
The inversion identity and symmetry, both proved in Section 6, identify the final expression as
\[
c(t,g^{-1},h^{-1})=-c(t,h,g)=-c(t,g,h). \tag{8.2}
\]
Consequently, \(2(c\circ\pi_{W,T})=0\). Multiplication by 2 is an automorphism of \(V\), with inverse multiplication by the real scalar \(1/2\). Hence \(c\circ\pi_{W,T}=0\). The map \(\pi_{W,T}\) is a compact Hausdorff surjection, so (7.8) is injective and gives
\[
c=0\quad\text{as a morphism }T\times G^2\longrightarrow V. \tag{8.3}
\]
This inference uses injectivity on morphisms, exactly as proved in Lemma 7.4.

The equation defining the defect now reads \(s(t,g)s(t,h)=s(t,gh)\). Together with \(s(t,1)=1\), it makes \(s\) a homomorphism of group objects over \(T\). Since it was already a section of the projection, it is a splitting. Conversely, any homomorphic section respects squaring and is therefore square-compatible. The uniqueness in Proposition 5.3 proves uniqueness of the splitting. ∎

The complete dependence on square compatibility is visible in the following chain, with each identity referring to the numbering of this paper:
\[
\begin{gathered}
\text{square compatibility (5.8)}\\
\xRightarrow{\text{parametrized uniqueness in Proposition 5.3}}
\text{conjugation and inversion compatibility (5.21)}\\
\Longrightarrow\ \text{the calculation (6.4)}
\Longrightarrow\ \text{symmetry (6.3)}\\
\xRightarrow{\text{inversion (6.11), paired inversion (7.3) and (7.8)}}
c=0\text{ in (8.3)}.
\end{gathered} \tag{8.4}
\]
The conjugation step in this chain uses uniqueness on the entire product \(G_k\times G_g\), or \(T\times G_k\times G_g\) when the parameter is present. The algebra in (6.4) then uses both identities of (5.21), as specified in (6.5). Paired inversion supplies a further geometric input only at the final step. In particular, symmetry was obtained before any special property of \(\mathrm{SU}(2)\) was used.

The splitting also gives an explicit isomorphism of extensions over \(T\). The map
\[
V_T\times_TG_T\longrightarrow E_T,
\qquad(t,v,g)\longmapsto\iota_t(v)s(t,g) \tag{8.5}
\]
is a homomorphism, because the kernel is central and the defect is zero. It is an isomorphism: for an element \(e\) over \((t,g)\), the kernel coordinate of \(e\,s(t,g)^{-1}\) supplies its inverse. This is an inverse of condensed morphisms, constructed using the kernel isomorphism, multiplication and inversion. Thus the extension represents the neutral extension class in the slice.

### 8.2 Internal cohomology via slice topoi

It remains to verify that the splitting result eliminates the internal cohomology object, not just the extensions over the ordinary point. The classification applies in projective slices, where the base-cohomology terms in Giraud's sequence vanish.

**Lemma 8.2** (Extension classification on projective slices). Let \(T\) be extremally disconnected compact Hausdorff. For the trivial action of a condensed group \(G_T\) on \(V_T\), the canonical map identifies
\[
\operatorname{Ext}_{\mathrm{Cond}/T}(G_T,V_T)
\cong H^2(BG_T,V_T). \tag{8.6}
\]
Here the left side denotes equivalence classes of central extensions of group objects over \(T\); its zero class is the product extension.

Proof. Apply VIII.7.1.5 of Giraud [2], in the form of Proposition 3.8 of [3], to the topos \(\mathcal E=\mathrm{Cond}/T\), the group object \(G_T\) and the abelian coefficient \(V_T\). The relevant segment of (2.14) is
\[
H^1(\mathcal E,V_T)\longrightarrow
\operatorname{Ext}_{\mathcal E}(G_T,V_T)
\longrightarrow H^2(BG_T,V_T)
\longrightarrow H^2(\mathcal E,V_T). \tag{8.7}
\]
The hypotheses of this general topos theorem are satisfied: \(G_T\) is a group object, \(V_T\) is an abelian group object and its specified action is trivial. Extensions inducing that action are exactly central extensions. No topological representation of \(V_T\) or \(E_T\) is part of these hypotheses. Since \(T\) is projective, Lemma 2.3 makes global sections on \(\mathcal E\) exact. Its positive derived functors vanish, so both outer groups in (8.7) are zero. Exactness gives (8.6), with the product extension corresponding to zero. ∎

For this application, the extension in (8.6) is arbitrary in the slice. It need not arise by pulling back an extension over the ordinary point. Proposition 5.1 trivializes its underlying torsor over the total compact space \(T\times G\); Proposition 5.3 normalizes a section there. The conjugation comparison then uses the larger compact space \(T\times G_k\times G_g\). Finally, the defect is tested on \(T\times W\), and (7.8) is applied with this same \(T\). Each of these constructions was established for arbitrary compact parameters, so all are available on the extremally disconnected tests required by (8.6).

The two uses of projectivity should be distinguished. In Lemma 8.2, projectivity of \(T\) kills the cohomology of the base topos. In Lemma 7.4, projectivity of a further test space \(P\) provides lifts to a compact surjection. The latter proof remains valid even when \(T\times G^2\) is not projective. Thus the internal argument never assumes projectivity of a product with the connected compact group \(G\).

### 8.3 Main theorem

**Theorem 8.3** (Theorem B2: second-degree vanishing for SU(2)). Let \(0<p\le1\), let \(G=\mathrm{SU}(2)\) and let \(V\) be any \(p\)-liquid real vector space with trivial \(G\)-action. Then
\[
\underline H^2(G,V)=0. \tag{8.8}
\]

Proof. For any extremally disconnected compact Hausdorff space \(T\), formula (2.10) and Lemma 8.2 give
\[
\underline H^2(G,V)(T)
\cong H^2(BG_T,V_T)
\cong\operatorname{Ext}_{\mathrm{Cond}/T}(G_T,V_T). \tag{8.9}
\]
Every extension in the last group satisfies the hypotheses of Proposition 8.1: its quotient is the constant group object with compact group \(G=\mathrm{SU}(2)\), its kernel is \(V_T\) and triviality of the induced action makes it central. That proposition supplies a splitting, and (8.5) identifies the extension with the product extension. Hence the last group of (8.9) is zero for every such \(T\). Lemma 2.3 says that these tests detect zero condensed abelian groups. This proves (8.8). ∎

Together, Theorems 4.3 and 8.3 prove the two low-degree vanishing statements. The operator lemma applies throughout to the original \(p\)-liquid coefficient with \(0<p\le1\); the proof has introduced no stronger coefficient hypothesis at the extension or parameter steps.

## 9 Scope and limits

### 9.1 General compact nonabelian groups

For every compact group \(G\), Theorem 4.3 proves first-degree vanishing, and Theorem 5.6 gives a unique square-compatible section of every central extension under consideration. These conclusions require no connectedness, Lie group structure or geometric description of \(G\). Section 6 consequently gives, for every such extension, a symmetric multiplication defect which is invariant under simultaneous conjugation and changes sign under simultaneous inversion.

The further geometric input in Proposition 8.1 is the following property of the quotient group:
\[
\text{for every }(g,h)\in G^2\text{ there exists }u\in G
\text{ with }ugu^{-1}=g^{-1}\text{ and }uhu^{-1}=h^{-1}. \tag{9.1}
\]
Lemma 7.3 proves this property for \(\mathrm{SU}(2)\). Compactness then organizes the choices into the relation space \(W\), and projectivity of test spaces makes precomposition injective. Without an input identifying inversion with conjugation on pairs, the identities of Section 6 do not yield the equality (8.1). Symmetry by itself gives no equation of the form \(c=-c\).

The property (9.1) is not a consequence of compactness alone. For example, conjugation in the circle group is the identity, while an element of order greater than two is different from its inverse. This example concerns the applicability of paired inversion, rather than nonvanishing: the compact abelian vanishing theorem, Corollary 10.2 and Remark 10.3 of [1], applies by a different argument. For a general compact nonabelian group, degree-two vanishing remains open within this paper's framework. The results proved here for that generality stop at the canonical section and the identities imposed on its defect.

### 9.2 Degrees three and higher

Theorem 3.4 is an invertibility theorem for derived sections over a compact space in every spatial cohomological degree. A group-cohomological vanishing conclusion additionally needs a class-specific relation with the operator. In degree one, the relation is the squaring identity for a homomorphism. In degree two, squaring first kills a spatial torsor class and then normalizes its section; the multiplication defect is removed by the further argument of Sections 6 and 7. No corresponding relation for arbitrary higher group-cohomological classes has been proved here.

There are also two specific limits to extending that argument. First, simultaneous inversion by conjugation fails in general for triples in \(\mathrm{SU}(2)\), as shown for \(i,j,k\) in Appendix A. Second, Lemma 7.4 is a statement about morphisms, or spatial cohomology in degree zero. It supplies no injectivity assertion for
\[
q^*:H^j(Y,V)\longrightarrow H^j(X,V)
\qquad(j>0) \tag{9.2}
\]
when \(q:X\to Y\) is a compact Hausdorff surjection. The proof of that lemma compares maps after lifting projective tests; it does not compare derived classes by the same procedure. Thus vanishing after pullback of a higher class would require an additional argument.

Neither observation is, on its own, a nonvanishing theorem. They specify why the present proof provides no vanishing result for group cohomology in degrees three and higher. The degree-three nonvanishing statement used in the next section comes from the independent construction in [5].

## 10 Relation to the degree-three counterexample

The companion paper [5] concerns the same compact group \(G=\mathrm{SU}(2)\) and the same range \(0<p\le1\). Write
\[
C_n=M_{<p}(G^n),\qquad
V_p=\operatorname{coker}_{\operatorname{Cond}(\mathbb R)}
\bigl(\partial_4:C_4\longrightarrow C_3\bigr). \tag{10.1}
\]
Here \(\partial_4\) is the inhomogeneous bar boundary, specified on Dirac elements by
\[
\begin{aligned}
\partial_4[g|h|k|\ell]
={}&[h|k|\ell]-[gh|k|\ell]+[g|hk|\ell]\\
&-[g|h|k\ell]+[g|h|k].
\end{aligned} \tag{10.2}
\]
Equip \(V_p\) with the trivial \(G\)-action. Theorem 8.1 of [5] proves that this is a \(p\)-liquid real vector space and that the condensed cocycle
\[
c_p(g,h,k)=q([g|h|k]),\qquad q:C_3\longrightarrow V_p, \tag{10.3}
\]
defines a nonzero class in \(H^3(G,V_p)\). That theorem includes the identification with derived cohomology in the classifying topos; its assertion is not limited to an underived cochain complex. We use this companion result as stated, without re-proving its arithmetic construction.

The coefficient in (10.1) satisfies precisely the hypotheses of the present low-degree theorems. Indeed, Proposition 10.1 of [1] supplies the liquid free objects \(C_3,C_4\), and closure under cokernels in Theorem 6.5 of [1] ensures that their condensed cokernel is liquid. The action in (10.3) is the specified trivial action. Theorems 4.3 and 8.3 therefore give, for this same coefficient,
\[
\underline H^1(G,V_p)=0,
\qquad
\underline H^2(G,V_p)=0,
\qquad
H^3(G,V_p)\ne0. \tag{10.4}
\]
The first two equalities concern internal objects. The last statement is the ordinary cohomology group established in Theorem 8.1 of [5]. Evaluation at the ordinary point is exact by Lemma 2.3, applied to \(T=*\), so the two internal vanishings also give ordinary vanishing in their respective degrees.

Lemma 9.1 of [5] proves that no Hausdorff \(p\)-Banach real space has associated condensed real vector space isomorphic to \(V_p\). This is a statement about representation of the particular coefficient, with its condensed structure. It does not exclude \(V_p\) from the class of \(p\)-liquid objects: that larger class includes the cokernel (10.1). Accordingly, the present low-degree theorems apply to it in full. They require no Hausdorff \(p\)-Banach representation.

There is no conflict between (10.4) and either paper's conclusions. The companion construction detects a class in degree three. The arguments here eliminate classes in degrees one and two and make no general vanishing assertion in the third degree. Nonrepresentability of \(V_p\) also supplies no conclusion about positive-degree cohomology for all other Hausdorff \(p\)-Banach coefficients. That narrower higher-degree question is not settled by the results cited here. The common conclusion of the two papers is the coexistence, for trivial liquid coefficients on \(\mathrm{SU}(2)\), of universal vanishing in degrees one and two with nonvanishing for a particular coefficient in degree three.

## References

1. Peter Scholze, *Lectures on Analytic Geometry*. Definition 6.3; Theorems 6.5, 6.6, 6.9(2) and 6.10; Proposition 10.1, Corollary 10.2 and Remark 10.3. [Lecture notes](https://people.mpim-bonn.mpg.de/scholze/Analytic.pdf).

2. Jean Giraud, *Cohomologie non abelienne*. Springer, Grundlehren der mathematischen Wissenschaften 179. Torsor classification and VIII.7.1.5 on the low-degree cohomology of a classifying topos.

3. Philippe Cassou-Nogues, Ted Chinburg, Baptiste Morin and Martin J. Taylor, *The classifying topos of a group scheme and invariants of symmetric bundles*. Proposition 3.8 and Corollary 3.11. [Paper](https://www.math.u-bordeaux.fr/~bmorin/classifyingtopos.pdf).

4. Peter Scholze, *Lectures on Condensed Mathematics*. Lectures I and II, including Theorem 2.2 and the projective test spaces of Lecture II. [Lecture notes](https://people.mpim-bonn.mpg.de/scholze/Condensed.pdf).

5. *Positive-degree cohomology of compact groups with p-liquid coefficients: A counterexample for general coefficients*. Companion paper, Theorem 8.1 and Lemma 9.1. [Published version](https://bingyingzizz.github.io/mathgalaxy/research-p-liquid.html).

## Appendix A The quaternion argument

Let \(\mathbb H\) be the real algebra with basis \(1,i,j,k\), with
\[
i^2=j^2=k^2=-1,\qquad ij=k=-ji,\qquad
jk=i=-kj,\qquad ki=j=-ik. \tag{A.1}
\]
For \(q=a+bi+cj+dk\), put \(\bar q=a-bi-cj-dk\) and \(|q|^2=q\bar q=a^2+b^2+c^2+d^2\). The unit quaternions form \(\mathrm{Sp}(1)\), with \(q^{-1}=\bar q\). The map used to identify this group with \(\mathrm{SU}(2)\) is
\[
a+bi+cj+dk\longmapsto
\begin{pmatrix}
a+bi&c+di\\
-c+di&a-bi
\end{pmatrix}. \tag{A.2}
\]
The \(i\) in the matrix denotes the complex imaginary unit.

**Lemma A.1** (The unit quaternion model). Formula (A.2) is an isomorphism of topological groups \(\mathrm{Sp}(1)\cong\mathrm{SU}(2)\).

Proof. The matrices assigned to \(i,j,k\) satisfy (A.1), as follows by multiplying their two rows and columns. Real linear extension is therefore an algebra homomorphism. The determinant of the matrix in (A.2) is \(a^2+b^2+c^2+d^2\), and the product of that matrix with its conjugate transpose is this same scalar times the identity. Thus a unit quaternion gives a unitary matrix of determinant one.

Conversely, a unitary matrix of determinant one has the form
\[
\begin{pmatrix}\alpha&\beta\\-\bar\beta&\bar\alpha\end{pmatrix},
\qquad |\alpha|^2+|\beta|^2=1. \tag{A.3}
\]
For example, this follows by equating its inverse, computed from the determinant-one formula, with its conjugate transpose. Taking \(\alpha=a+bi\) and \(\beta=c+di\) gives a unique unit quaternion. Both the map and this inverse are continuous in the four real coordinates. The algebra homomorphism property now gives the topological group isomorphism. ∎

Identify the pure imaginary subspace with oriented Euclidean \(\mathbb R^3\) by the ordered basis \(i,j,k\). Expanding (A.1) gives, for two imaginary vectors \(v,w\),
\[
vw=-\langle v,w\rangle+v\times w,
\qquad vw+wv=-2\langle v,w\rangle. \tag{A.4}
\]
Here \(\langle\ ,\ \rangle\) is the Euclidean inner product and \(\times\) is its usual oriented cross product. To verify the formula, its diagonal terms are \(-v_iw_i\), and its off-diagonal terms combine in pairs using \(ij=-ji\), \(jk=-kj\) and \(ki=-ik\). These are precisely the three cross-product coordinates.

Given imaginary parts \(v,w\), consider the linear map
\[
\mathbb R^3\longrightarrow\mathbb R^2,
\qquad u\longmapsto(\langle u,v\rangle,\langle u,w\rangle). \tag{A.5}
\]
Its rank is at most two, so its kernel has positive dimension. Normalize any nonzero vector in that kernel. Formula (A.4) then gives the anticommutation used in (7.4), proving paired inversion even when \(v,w\) are dependent or vanish. This choice is made for a single pair; the relation space in Section 7 retains all choices together.

For comparison, no conjugation inverts \(i,j,k\) simultaneously. If conjugation sent \(i\) to \(-i\) and \(j\) to \(-j\), its multiplicativity would send \(k=ij\) to \((-i)(-j)=k\), whereas \(k^{-1}=-k\). Also, a fixed choice such as \(u=j\) does not invert every quaternion: \(jjj^{-1}=j\ne-j=j^{-1}\). These computations specify the distinction between paired inversion and a global inversion automorphism used in Section 9.

## Appendix B External inputs and their hypotheses

The external results enter at three different levels: liquidification, cohomology in a topos and projective tests. This appendix records the versions used, with their hypotheses. The elementary resolution and quaternion calculations were proved in the body and Appendix A.

| Input | Hypotheses in this paper | Use |
|---|---|---|
| Definition 6.3 and Theorem 6.5 of [1] | A real condensed coefficient, \(0<p\le1\) and the measure extension property (2.4) | Definition of \(p\)-liquidity, the real abelian liquid category and its derived adjunction; closure under cokernels in Section 10 |
| Theorem 6.9(2) and the proof of Theorem 6.6 of [1] | \(\mathsf T=1/2\), \(r=2^{-p}\), \(r<\rho<1\) and \(q=-\log\rho/\log2\) | Recognition of \(V\), with \(U=2\), as an \(r\)-liquid \(\mathbb Z[U]\)-module |
| Theorem 6.10 of [1] | \(0<r<1\) and condensed modules over \(\mathbb Z[\mathsf T^{-1}]\) | Derived liquidification, its fully faithful derived inclusion and the adjunction (2.11) |
| Proposition 10.1(1) of [1] | An arbitrary compact Hausdorff space \(S\) | Identification (2.13) for induced free modules and the compact formal disks in Lemma 3.2 |
| Torsor classification in [2] | An abelian group object in a topos | Interpretation of the spatial class in Proposition 5.1 |
| VIII.7.1.5 of [2], recorded in Proposition 3.8 of [3] | A group object and an abelian coefficient with specified action in a topos | The sequence (2.14) and the extension interpretation on projective slices |
| Corollary 3.11 of [3], using that general topos theorem | Trivial action on the abelian coefficient | The internal homomorphism interpretation of degree one; the projective slice form is proved in Lemma 4.2 |
| Lectures I and II of [4] | Compact Hausdorff spaces, surjective continuous maps and extremally disconnected test spaces | Exact evaluation in Lemma 2.3 and injectivity of precomposition in Lemma 7.4 |

In the specialization row, \(1/2<\rho<1\) follows from \(\rho>2^{-p}\) and \(p\le1\). Consequently \(0<q<p\le1\), so the measure exponent is strictly below one, including when \(p=1\). The passage from the profinite specialization theorem to recognizing the coefficient uses its defining extension property on profinite tests. The subsequent calculation for a nonprofinite compact \(S\) uses Proposition 10.1; it is not an application of the profinite statement outside its hypotheses.

For the formal inverse, the bound \(b\rho/(1-\rho)\) in (3.10) is finite for every permitted radius. The lower bound on nonzero layer indices makes each output coordinate a finite sum on a bounded disk. These are the estimates that turn the series into a condensed morphism. The external input supplies the disks and the derived free-object identification; Lemmas 3.1 and 3.2 supply the resolution and its inverse. No integration operation on \(V\) is included among the inputs.

The low-degree theorem is invoked in \(\mathrm{Cond}/T\), with \(T\) extremally disconnected. Although [3] develops applications to group schemes, Proposition 3.8 explicitly invokes Giraud's general topos result. Only that general statement is used here. The kernel \(V_T\) is an abelian object and the prescribed action is trivial, so its extensions are central. Exact global sections on this projective slice make both base-cohomology terms in (8.7) zero. Thus there is no additional scheme hypothesis to check for the liquid coefficient.

Finally, Corollary 10.2 and Remark 10.3 of [1] are cited only for the known compact abelian scope discussed in Sections 1 and 9. Theorem 8.1 and Lemma 9.1 of the companion paper [5] are cited only in the comparison with degree three. Neither input is used to prove Theorems A, B1, B2 or C. The four proofs depend on the operator construction, the low-degree topos interpretation and, for B2, the paired inversion calculation specific to \(\mathrm{SU}(2)\).