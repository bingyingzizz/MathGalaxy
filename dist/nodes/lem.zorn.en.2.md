# Zorn's Lemma　`lem.zorn`
English entry · root `../`
[in graph](../#n=lem.zorn)　·　[Chinese page (authoritative)](./lem.zorn.md)

## Statement
Let $(P, \preceq)$ be a **non-empty** poset. If every chain in $P$ has an upper bound in $P$, then $P$ has a **maximal element**.

$$P \ne \emptyset \wedge ( \forall C \subseteq P, C\text{ is a chain} \to \exists u \in P, u\text{ is an upper bound of } C ) \implies \exists m \in P, m\text{ is maximal}$$

## Notes
Neither hypothesis can be dropped: the empty poset has no maximal element, and "every chain has an upper bound" does not give a *greatest* element — only a maximal one.

It is "the universal engine of existence proofs": every vector space has a basis, every ring has a maximal ideal, the compactness theorem, Hahn–Banach — all of them rely on it.

> 续见 nodes/lem.zorn.en.3.md
