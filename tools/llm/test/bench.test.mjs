/* 基准 / 星团词表 / 第二遍评审 / 词表规则 的离线回归（mock 传输，零计费）。 */
import path from 'node:path';
import { t, eq, ok, dir, fakeWorld, node, edge, mockTransport, okResponse, userOf, MODEL } from './h.mjs';
import { Store } from '../store.mjs';
import { Billing } from '../billing.mjs';
import { run } from '../batch.mjs';
import { buildVocab, selectTerms, normalizeLabelTerm, GLOSSARY_CFG } from '../lib/glossary.mjs';
import { glossFields, buildClusterGlossaries } from '../lib/gloss.mjs';
import { locate } from '../lib/schedule.mjs';
import { selectBench } from '../bench.mjs';
import { ADAPTERS } from '../jobs/index.mjs';
import * as SR from '../jobs/semreview.mjs';
import { aggregateUsage } from '../usagereport.mjs';

const mkW = () => {
  const labels = [['群', 'group'], ['子群', 'subgroup'], ['同态', 'homomorphism']];
  const nodes = [...labels.map(([l, e], i) => node('t' + i, { label: l, label_en: e, cluster: 'c.a' })), node('n1', { statement: '设 $G$ 为群，$H$ 为子群。', cluster: 'c.a' }), node('n2', { statement: '设 $f$ 为群同态。', cluster: 'c.a' }), node('m1', { statement: '设 $X$ 为空间。', cluster: 'c.b' })];
  const edges = []; for (let i = 0; i < 10; i++) edges.push(edge('e.a' + i, { note: `第${i}条：群与子群的同态 ${'说明'.repeat(i % 3 + 1)}。`, sources: ['n1'], target: 'n2' }));
  for (let i = 0; i < 4; i++) edges.push(edge('e.b' + i, { note: `另一星团的说明 ${i}。`, sources: ['m1'], target: 'm1' }));
  const w = fakeWorld({ nodes, edges }); w.MG.clusters = [{ id: 'c.a', parent: 'r.a' }, { id: 'c.b', parent: 'r.b' }]; w.MG.sectors = [{ id: 's.1', regions: ['r.a', 'r.b'] }]; return w;
};
const eitems = (w, vocab) => ADAPTERS['edge-text'].collect({ world: w, vocab, model: MODEL }).map(it => ({ ...it, loc: locate(w, it) }));

export async function benchAndReview() {
  console.log('星团词表 / 基准 / 第二遍评审 / 词表规则');
  await t('词表规则：节点标签派生词条——Title Case 降小写（专名保留）、并列/缩写标题弃用、人工覆盖优先', async () => {
    eq(normalizeLabelTerm('拉回', 'Pullback'), 'pullback'); eq(normalizeLabelTerm('挠积', 'Tor Functor'), 'Tor functor'); eq(normalizeLabelTerm('米田引理', 'Yoneda lemma'), 'Yoneda lemma'); eq(normalizeLabelTerm('类函数', 'Class function'), 'class function');
    eq(normalizeLabelTerm('范数', 'norm and normed space'), null); eq(normalizeLabelTerm('正则表示', 'Regular rep'), null); eq(normalizeLabelTerm('右伴随保极限', 'RAPL'), null); eq(normalizeLabelTerm('CW 复形', 'CW complex'), 'CW complex');
    eq(GLOSSARY_CFG.terms['同调'], 'homology'); eq(GLOSSARY_CFG.terms['上同调'], 'cohomology'); ok(GLOSSARY_CFG.ambiguous.includes('相似'));
    const w = fakeWorld({ nodes: [node('a', { label: '同调', label_en: 'cohomology' }), node('b', { label: '范数', label_en: 'norm and normed space' })] }); const V = buildVocab(w.graph);
    eq(V.vocab.get('同调'), 'homology', '人工覆盖优先于节点标签'); eq(V.vocab.get('范数'), 'norm');
    eq(selectTerms('微分同胚与同胚', V)['微分同胚'], 'diffeomorphism'); ok(!('同胚' in selectTerms('微分同胚', V)), '微分同胚 不得被「同胚」子串误配');
    eq(selectTerms('上同调与同调', V), { 上同调: 'cohomology', 同调: 'homology' }, '最长匹配');
  });
  await t('星团词表：确定性、与输入顺序无关；minDocs/cap 生效；同星团同 kind 的请求前缀组相同（逐条选词则不同）', async () => {
    const w = mkW(), V = buildVocab(w.graph); const it = eitems(w, V); const g1 = buildClusterGlossaries(it, V, { minDocs: 3 }), g2 = buildClusterGlossaries(it.slice().reverse(), V, { minDocs: 3 });
    eq([...g1], [...g2]); ok(g1.get('c.a') && Object.keys(g1.get('c.a')).every(k => k in V.vocab || V.vocab.has(k))); ok(!g1.has('c.b'), '星团 b 没有够频的词');
    eq(Object.keys(buildClusterGlossaries(it, V, { minDocs: 1, cap: 1 }).get('c.a')).length, 1);
    const Vc = { ...V, clusterGlossary: g1 }; const a = ADAPTERS['edge-text'].collect({ world: w, vocab: V, model: MODEL }), b = ADAPTERS['edge-text'].collect({ world: w, vocab: Vc, model: MODEL });
    const ea = a.filter(i => i.id.startsWith('e.a')), eb = b.filter(i => i.id.startsWith('e.a'));
    eq(new Set(eb.map(i => i.requests[0].prefixGroup)).size, 1, '星团模式：同 kind 共享一个前缀组'); ok(new Set(ea.map(i => i.requests[0].prefixGroup)).size >= 1);
  });
  await t('星团模式不丢术语：glossary = 星团词表；条目需要而星团词表没有/译法不同的词进 glossary_extra（紧跟稳定前缀）；条目模式请求体与改动前逐字节一致', async () => {
    const w = mkW(), V = buildVocab(w.graph); const base = { c: { 群: 'group', 子群: 'subgroup' } }; const Vc = { ...V, clusterGlossary: new Map([['c.a', base.c]]) };
    const f = glossFields('群的同态', Vc, w, 'node', 'n1'); eq(f.glossary, base.c); eq(f.glossary_extra, { 同态: 'homomorphism' });
    eq(glossFields('群与子群', Vc, w, 'node', 'n1'), { glossary: base.c }, '无额外术语则无 glossary_extra');
    eq(glossFields('群的同态', V, w, 'node', 'n1'), { glossary: selectTerms('群的同态', V) }, '无星团词表 = 原行为');
    eq(glossFields('同态', Vc, w, 'node', 'm1'), { glossary: selectTerms('同态', V) }, '星团没有词表 → 回落条目选词');
    const it = ADAPTERS['edge-text'].collect({ world: w, vocab: Vc, model: MODEL }).find(i => i.id === 'e.a0'); const keys = Object.keys(userOf(it.requests[0].body));
    eq(keys.slice(0, 2), ['kind', 'glossary']); eq(keys.at(-1), 'source_text_zh'); if (keys.includes('glossary_extra')) eq(keys[2], 'glossary_extra');
    const i1 = ADAPTERS['edge-text'].collect({ world: w, vocab: V, model: MODEL }).find(i => i.id === 'e.a0'), i2 = ADAPTERS['edge-text'].collect({ world: w, vocab: { ...V }, model: MODEL }).find(i => i.id === 'e.a0'); eq(i1.requests[0].key, i2.requests[0].key, '条目模式键稳定');
  });
  await t('基准选样：确定性；每类型两臂交替平衡（|A−B|≤1）；不重复；只含当前待译；数量不足即报错；星团词表原文随清单冻结', async () => {
    const w = mkW(), V = buildVocab(w.graph); const m1 = selectBench({ world: w, vocab: V, cluster: 'c.a', take: { 'edge-note': 8, 'node-statement': 2 } }), m2 = selectBench({ world: w, vocab: V, cluster: 'c.a', take: { 'edge-note': 8, 'node-statement': 2 } });
    eq(m1, m2); eq(m1.items.length, 10); eq(new Set(m1.items.map(x => x.identity)).size, 10); ok(m1.items.every(x => x.cluster === 'c.a' && x.sector === 's.1'));
    for (const kind of ['edge-note', 'node-statement']) { const A = m1.items.filter(x => x.kind === kind && x.arm === 'item').length, B = m1.items.filter(x => x.kind === kind && x.arm === 'cluster').length; ok(Math.abs(A - B) <= 1, kind); }
    ok(!m1.items.some(x => x.cluster === 'c.b')); let msg = ''; try { selectBench({ world: w, vocab: V, cluster: 'c.a', take: { 'edge-note': 99 } }); } catch (e) { msg = e.message; } ok(/只有/.test(msg)); ok(/^[0-9a-f]{12}$/.test(m1.clusterGlossaryHash));
    const w2 = mkW(); w2.MG.i18nEdgeNotes['e.a0'] = { note: { en: 'done', status: 'draft', basedOn: 'x' } }; const m3 = selectBench({ world: w2, vocab: buildVocab(w2.graph), cluster: 'c.a', take: { 'edge-note': 9 } }); ok(!m3.items.some(x => x.id === 'e.a0'), '已译的不入选');
  });
  await t('第二遍评审：每条一个独立请求；不含翻译方自评；身份/键与译文区分且随译文变；引文核对；不能给「通过」；提示禁止改写', async () => {
    const w = mkW(), V = buildVocab(w.graph); const tr = [{ identity: 'edge:e.a0:note', id: 'e.a0', kind: 'edge-note', zh: '若 $A$ 成立，则 $B$ 成立。', en: 'If $A$ holds then $B$ holds.' }];
    const [it] = SR.collect({ translations: tr, vocab: V, model: MODEL }); const u = userOf(it.requests[0].body);
    eq(it.identity, 'review:edge:e.a0:note'); ok(u.translation_en && u.source_text_zh && !('ambiguities' in u) && !('confidence' in u) && !('equivalence_confidence' in u)); eq(Object.keys(u).at(-1), 'source_text_zh');
    const [it2] = SR.collect({ translations: [{ ...tr[0], en: 'If $A$ holds then $B$ fails.' }], vocab: V, model: MODEL }); ok(it2.key !== it.key && it2.requests[0].key !== it.requests[0].key);
    ok(/must NOT rewrite/.test(SR.SYSTEM) && /NOT approve/.test(SR.SYSTEM) && /silent_source_repair/.test(SR.SYSTEM));
    const raw = o => JSON.stringify({ id: 'e.a0', findings: [], source_concerns: [], overall: 'no_substantive_issue_found', ...o });
    const f = { type: 'reversed_implication', severity: 'high', zh_quote: '若 $A$ 成立', en_quote: 'If $A$ holds', explanation: 'x' };
    const p = SR.parseAndVerify(raw({ findings: [f, { ...f, zh_quote: '并不存在的引文' }], overall: 'issues_found' }), it); eq(p.ok.findings.map(x => x.verified), [true, false]);
    ok(SR.parseAndVerify(raw({ overall: 'approved' }), it).err, '不能批准'); ok(SR.parseAndVerify(raw({ extra: 1 }), it).err); ok(SR.parseAndVerify(raw({ findings: [{ ...f, type: 'nonsense' }] }), it).err); ok(SR.parseAndVerify('not json', it).err);
  });
  await t('第二遍评审：端到端（mock，独立战役与结果库）；二次运行全部本地命中；用量可聚合；对照标注打分', async () => {
    const w = mkW(), V = buildVocab(w.graph); const tr = [0, 1, 2].map(i => ({ identity: 'edge:e.a' + i + ':note', id: 'e.a' + i, kind: 'edge-note', zh: `若 $A_${i}$ 成立，则 $B$。`, en: `If $A_${i}$ holds then $B$.` }));
    const items = SR.collect({ translations: tr, vocab: V, model: MODEL }); const d = dir('rev'); const billing = new Billing(d); billing.openCampaign('rv', 1, { model: MODEL }); const store = new Store(d, SR.OP);
    const content = u => ({ id: u.id, findings: u.id === 'e.a1' ? [{ type: 'silent_source_repair', severity: 'high', zh_quote: '若 $A_1$ 成立', en_quote: 'If $A_1$ holds', explanation: 'x' }] : [], source_concerns: u.id === 'e.a2' ? [{ zh_quote: '则 $B$', explanation: 'y' }] : [], overall: u.id === 'e.a1' ? 'issues_found' : 'no_substantive_issue_found' });
    const tp = mockTransport(b => okResponse(userOf(b), { content: JSON.stringify(content(userOf(b))), usage: { prompt_tokens: 900, completion_tokens: 60, prompt_cache_hit_tokens: 640, prompt_cache_miss_tokens: 260 } }));
    const r = await run({ items, store, billing, campaign: 'rv', model: MODEL, limit: 10, transport: tp, backoffMs: 1 }); eq(r.stats.fetched, 3);
    const r2 = await run({ items, store, billing, campaign: 'rv', model: MODEL, limit: 10, transport: mockTransport(), backoffMs: 1 }); eq(r2.stats.sent, 0); eq(r2.stats.localCacheHits, 3);
    const u = aggregateUsage({ billingFile: path.join(d, 'billing.jsonl'), campaign: 'rv' }).total; eq(u.settled, 3); eq(u.hitTokens, 640 * 3);
    const rows = items.map(it => { const rec = store.load().get(it.requests[0].key); const p = SR.parseAndVerify(rec.raw, it); return { of: it.of, status: 'ok', ...p.ok }; });
    const truth = { 'edge:e.a1:note': { clean: false, issues: [{ type: 'silent_source_repair', zh_contains: '若 $A_1$' }] }, 'edge:e.a0:note': { clean: true }, 'edge:e.a2:note': { clean: true, issues: [{ source_side: true, zh_contains: '则 $B$' }] } };
    const sc = SR.scoreAgainstTruth(rows, truth).summary; eq(sc.seededIssues, 2); eq(sc.caught, 2); eq(sc.recall, 1); eq(sc.cleanItemsWithSubstantiveFinding, 0); eq(sc.unverifiableQuotes, 0);
    const miss = SR.scoreAgainstTruth(rows.map(x => ({ ...x, findings: [], source_concerns: [] })), truth).summary; eq(miss.caught, 0);
    const fp = SR.scoreAgainstTruth([{ ...rows[0], findings: [{ type: 'other_semantic', severity: 'high', zh_quote: '若', en_quote: '', explanation: 'z', verified: true }] }], truth).summary; eq(fp.cleanItemsWithSubstantiveFinding, 1);
  });
}

import { termCompliance, benchItems } from '../bench.mjs';
export async function benchCompliance() {
  await t('术语遵从率：只统计中文里出现的术语；忽略大小写/连字符/复数；按臂分开；基准条目载入与清单一致（源文变了即拒绝）', async () => {
    const rows = [{ arm: 'item', terms: { 子群: 'subgroup', 群: 'group' }, zh: '子群与群', en: 'Subgroups and the Group' }, { arm: 'item', terms: { 同态: 'homomorphism' }, zh: '无关', en: 'x' }, { arm: 'cluster', terms: { 极限: 'limit' }, zh: '极限', en: 'the colimit is missing' }, { arm: 'cluster', terms: { 范畴: 'category' }, zh: '范畴', en: 'a Category' }];
    const c = termCompliance(rows); eq(c.item, { items: 2, termOccurrences: 2, followed: 2, rate: 1 }); eq(c.cluster.termOccurrences, 2); eq(c.cluster.followed, 2, '"colimit" 含 "limit" 子串——代理指标粗糙，已在文档注明');
    const w = mkW(), V = buildVocab(w.graph); const m = selectBench({ world: w, vocab: V, cluster: 'c.a', take: { 'edge-note': 4 } });
    const its = benchItems('edge-text', m, { world: w, vocab: V, model: MODEL }); eq(its.length, 4); ok(its.every(i => i.arm && i.loc.cluster === 'c.a'));
    const w2 = mkW(); w2.graph.byId['n1'].statement = '变了'; w2.graph.edges.find(e => e.id === m.items[0].id).note = '源文变了。'; let msg = ''; try { benchItems('edge-text', m, { world: w2, vocab: buildVocab(w2.graph), model: MODEL }); } catch (e) { msg = e.message; } ok(/源文不符/.test(msg), msg);
  });
}

import { buildBody } from '../deepseek.mjs';
import { gateDecision } from '../jobs/semreview.mjs';
import { makeRequest } from '../jobs/common.mjs';
import { approve } from '../batch.mjs';
import { sha256 } from '../lib/util.mjs';
import { parseHolds, openHolds } from '../lib/holds.mjs';
export async function holdPrecedence() {
  console.log('源文复核搁置优先（SR-6 回归）');
  await t('登记簿解析：open 条目成为搁置（含「同上」继承）；resolved/无身份的不算；真实登记簿含 SR-6', async () => {
    const tbl = ['| SR-1 | `node:a:statement` | x | 中 | open |', '| SR-2 | `edge:e:proofs:p1` | x | 中 | open |', '| SR-3 | 同上 | x | 低 | open |', '| SR-4 | `node:b:notes` | x | 低 | resolved |', '| SR-5 | 全站 10 个字段 | x | 待查 | open |'].join(String.fromCharCode(10));
    const h = parseHolds(tbl); eq([...h.keys()].sort(), ['edge:e:proofs:p1', 'node:a:statement']); eq(h.get('edge:e:proofs:p1').map(x => x.sr), ['SR-2', 'SR-3']);
    ok(openHolds().has('node:thm.lax-milgram:statement'), '真实登记簿：SR-6 的陈述必须是搁置');
  });
  await t('gate：登记簿搁置压过「译文审核通过」→ hold（不是 pass）；无搁置时同一行仍是 pass', async () => {
    const row = { status: 'ok', findings: [], source_concerns: [], overall: 'no_substantive_issue_found' };
    eq(gateDecision(row).decision, 'pass'); eq(gateDecision(row, { heldWhy: 'SR-6' }).decision, 'hold'); eq(gateDecision({ status: 'invalid' }, { heldWhy: 'SR-6' }).decision, 'hold');
  });
  await t('approve：搁置身份不被批准（即使 state=ok、点名或 all-ok），其它身份照常；结果仍留在库里', async () => {
    const d = dir('hold-apr'); const st = new Store(d, 'node-text'); const rec = (id, en) => ({ key: 'k-' + id, kind: 'item', identity: 'node:' + id + ':statement', id, state: 'ok', srcHash: 's', cfgHash: 'c', result: { en }, t: '2026-01-01T00:00:00Z' });
    st.open(); st.append([rec('held', 'H'), rec('free', 'F')]); const holds = new Map([['node:held:statement', [{ sr: 'SR-6', status: 'open' }]]]); const seen = [];
    eq(approve({ store: st, identities: ['node:held:statement', 'node:free:statement'], holds, onHeld: (i, w) => seen.push([i, w]) }), 1); eq(seen.length, 1); ok(/SR-6/.test(seen[0][1]));
    const st2 = new Store(dir('hold-apr2'), 'node-text'); st2.open(); st2.append([rec('held', 'H'), rec('free', 'F')]); eq(approve({ store: st2, includeOkAll: true, holds }), 1, 'all-ok 也绕不过');
    const all = [...st.load().values()]; ok(all.some(r => r.identity === 'node:held:statement' && r.state === 'ok' && r.result.en === 'H'), '结果保留在候选库'); ok(!all.some(r => r.identity === 'node:held:statement' && r.state === 'approved'));
  });
}
export async function closeoutPieces() {
  console.log('收尾：思考模式 / 门 / 返工 / 最新条目批准');
  await t('思考模式：默认关（与试点逐字节一致）；开 = thinking.enabled、不发 temperature；非布尔拒绝；思考请求键与非思考不同', async () => {
    const msgs = [{ role: 'system', content: 's' }, { role: 'user', content: '{}' }];
    const off = buildBody({ model: MODEL, messages: msgs, maxTokens: 100 }), on = buildBody({ model: MODEL, messages: msgs, maxTokens: 100, thinking: true });
    eq(off.thinking, { type: 'disabled' }); eq(off.temperature, 0); eq(on.thinking, { type: 'enabled' }); ok(!('temperature' in on)); eq(on.max_tokens, 100); eq(on.response_format, { type: 'json_object' });
    let bad = false; try { buildBody({ model: MODEL, messages: msgs, maxTokens: 1, thinking: 'yes' }); } catch { bad = true; } ok(bad);
    const sys = 'S', u = { kind: 'k', id: 'x', source_text_zh: 'z' }; ok(makeRequest({ model: MODEL, system: sys, user: u, maxTokens: 9 }).key !== makeRequest({ model: MODEL, system: sys, user: u, maxTokens: 9, thinking: true }).key);
    eq(SR.collect({ translations: [{ identity: 'a', id: 'x', kind: 'edge-note', zh: '中', en: 'zh' }], vocab: buildVocab(fakeWorld().graph), model: MODEL })[0].requests[0].body.thinking, { type: 'enabled' }, '评审默认思考开');
  });
  await t('门：只认引文核对通过的发现；返工至多一轮；silent_source_repair 直接升级；源文疑点 hold；无效/缺失 retry', async () => {
    const f = (o = {}) => ({ type: 'missing_assumption', severity: 'high', zh_quote: 'a', en_quote: 'b', explanation: 'x', verified: true, ...o });
    const row = (o = {}) => ({ status: 'ok', findings: [], source_concerns: [], overall: 'no_substantive_issue_found', ...o });
    eq(gateDecision(row()).decision, 'pass'); eq(gateDecision(row({ findings: [f({ verified: false })] })).decision, 'pass', '无法核对的引文不算'); eq(gateDecision(row({ findings: [f({ severity: 'low' })] })).decision, 'pass');
    eq(gateDecision(row({ findings: [f()] })).decision, 'correct'); eq(gateDecision(row({ findings: [f()] }), { alreadyCorrected: true }).decision, 'escalate', '至多一轮');
    eq(gateDecision(row({ findings: [f({ type: 'silent_source_repair' })] })).decision, 'escalate'); eq(gateDecision(row({ source_concerns: [{ zh_quote: 'q', explanation: 'e', verified: true }] })).decision, 'hold');
    eq(gateDecision({ status: 'invalid' }).decision, 'retry'); eq(gateDecision(null).decision, 'retry');
  });
  await t('返工：feedback 进请求体（reviewer_findings，位于源文之前）→ 新键；无 feedback 时请求体不变；提示词说明了该字段', async () => {
    const w = mkW(), V = buildVocab(w.graph); const base = ADAPTERS['edge-text'].collect({ world: w, vocab: V, model: MODEL }).find(i => i.id === 'e.a0');
    const fbV = { ...V, feedback: new Map([[sha256(base.zh), [{ type: 'wrong_terminology', zh_quote: '同态', en_quote: 'x', explanation: 'y' }]]]) };
    const re = ADAPTERS['edge-text'].collect({ world: w, vocab: fbV, model: MODEL }).find(i => i.id === 'e.a0'); const keys = Object.keys(userOf(re.requests[0].body));
    ok(re.requests[0].key !== base.requests[0].key && keys.includes('reviewer_findings') && keys.at(-1) === 'source_text_zh'); ok(!Object.keys(userOf(base.requests[0].body)).includes('reviewer_findings'));
    ok(/reviewer_findings/.test(re.requests[0].body.messages[0].content));
  });
  await t('批准只取每个身份的最新条目（返工后旧条目不会被一并批准）', async () => {
    const d = dir('apr'); const st = new Store(d, 'edge-text'); const rec = (key, t, en) => ({ key, kind: 'item', identity: 'edge:e:note', id: 'e', state: 'review', srcHash: 's', cfgHash: 'c', result: { en }, t });
    st.open(); st.append([rec('k1', '2026-01-01T00:00:00Z', 'old'), rec('k2', '2026-01-02T00:00:00Z', 'new')]); eq(approve({ store: st, identities: ['edge:e:note'] }), 1);
    const ap = [...st.load().values()].filter(r => r.state === 'approved'); eq(ap.length, 1); eq(ap[0].result.en, 'new');
  });
  await t('用量守卫：completion_tokens 超过 max_tokens → 视为估算被推翻并停止（思考 token 未必含在 max_tokens 里）', async () => {
    const w = mkW(), V = buildVocab(w.graph); const items = ADAPTERS['edge-text'].collect({ world: w, vocab: V, model: MODEL }).slice(0, 3); const d = dir('guard'); const billing = new Billing(d); billing.openCampaign('c', 5, { model: MODEL }); const st = new Store(d, 'edge-text');
    const tr = mockTransport(b => okResponse(userOf(b), { usage: { prompt_tokens: 10, completion_tokens: b.max_tokens + 5, prompt_cache_hit_tokens: 0, prompt_cache_miss_tokens: 10 } }));
    const r = await run({ items, store: st, billing, campaign: 'c', model: MODEL, limit: 10, transport: tr, backoffMs: 1, concurrency: 1, warmup: 1 }); ok(r.stats.estimateBreach >= 1 && r.stats.budgetStopped >= 1, JSON.stringify(r.stats));
  });
}

import { checkTaskCap, POLICY } from '../lib/policy.mjs';
export async function budgetPolicy() {
  await t('常设预算：单任务上限在开战役时检查（超出须 --above-policy）；每日累计跨战役由账本强制；超限即拒、不拆分绕过', async () => {
    eq(POLICY.perTaskCapUsd, 0.5); eq(POLICY.dailyCapUsd, 2); checkTaskCap(0.5); let bad = false; try { checkTaskCap(0.51); } catch { bad = true; } ok(bad); checkTaskCap(5, true);
    const d = dir('daily'); const b = new Billing(d, { dailyCapUsd: 0.01 }); b.openCampaign('c1', 1); b.openCampaign('c2', 1);
    const h = b.reserve('c1', 0.004); ok(h); b.settle(h, 0.004, { hit: 0, miss: 1, out: 1 });             // 今日已花 0.004
    const h2 = b.reserve('c2', 0.004); ok(h2, '另一战役：0.004+0.004 ≤ 0.01');                          // 在途 0.004
    eq(b.reserve('c1', 0.004), null, '0.004 已花 + 0.004 在途 + 0.004 > 0.01：拒绝（跨战役）'); ok(b.report('c1').daily.spentUsd >= 0.004);
    const b2 = new Billing(d, { dailyCapUsd: 0.01 }); b2.openCampaign('c1', 1); eq(b2.reserve('c1', 0.007), null, '重新加载账本后今日累计仍在'); ok(new Billing(d).reserve('c1', 0.007), '无每日上限时不拦（单战役上限仍有效）');
  });
}
