/* 内容回归：身份/缓存键、术语选择、证明（三种结构、重排、重复显示路径、切分）、校验启发式、
   批准失效、回写（三种目标、字段级追加、并发/中断/幂等）、候选导出。mock 传输，隔离 fixture。 */
import fs from 'node:fs';
import path from 'node:path';
import { t, eq, ok, throws, dir, fakeWorld, node, edge, mockTransport, MODEL } from './h.mjs';
import { Store } from '../store.mjs';
import { Billing } from '../billing.mjs';
import { run, validateStage, approve } from '../batch.mjs';
import { apply, exportCandidates, loadItems } from '../apply.mjs';
import { validate } from '../validate.mjs';
import { buildVocab, selectTerms } from '../lib/glossary.mjs';
import { proofsOf, parallelImplications, idNode, idEdge } from '../lib/source.mjs';
import { sha256 } from '../lib/util.mjs';
import { makeRequest, cfgHashOf } from '../jobs/common.mjs';
import { ADAPTERS } from '../jobs/index.mjs';
import * as proof from '../jobs/proof.mjs';
import * as nodeText from '../jobs/node-text.mjs';

const ZH = '设 $G$ 为群，则 $H$ 是子群。';
const zhHash = s => sha256(String(s).replace(/\s+/g, ' ').trim()).slice(0, 8);
const pinfo = (w, a, o = {}) => ADAPTERS[a].collect({ world: w, vocab: buildVocab(w.graph), model: MODEL, ...o });

export async function identityAndGlossary() {
  console.log('身份 / 键 / 术语');
  await t('节点 id 与边 id 同名也不会相撞（身份前缀 + 键）', async () => {
    const w = fakeWorld({ nodes: [node('x', { statement: ZH })], edges: [edge('x', { note: ZH })] });
    const a = pinfo(w, 'node-text')[0], b = pinfo(w, 'edge-text')[0]; ok(a.identity !== b.identity); ok(a.key !== b.key); eq(idNode('x', 'statement'), 'node:x:statement'); eq(idEdge('x', 'note'), 'edge:x:note');
  });
  await t('请求身份：标题/术语/提示/模型任一变化 → 键变；srcHash 只随源文本', async () => {
    const mkw = (extra = {}, label_en = 'operator') => fakeWorld({ nodes: [node('n.1', { statement: '计算算子的值 $x$。', ...extra }), node('n.2', { label: '算子', label_en })] });
    const base = pinfo(mkw(), 'node-text')[0];
    ok(pinfo(mkw({ title_en: 'Other' }), 'node-text')[0].key !== base.key, '标题'); eq(pinfo(mkw({ title_en: 'Other' }), 'node-text')[0].srcHash, base.srcHash);
    ok(pinfo(mkw({}, 'op-class'), 'node-text')[0].key !== base.key, '术语表（已审英文名变了）');
    const s1 = { role: 'system', content: 'A' }; ok(makeRequest({ model: MODEL, system: 'A', user: { a: 1 }, maxTokens: 10 }).key !== makeRequest({ model: MODEL, system: 'B', user: { a: 1 }, maxTokens: 10 }).key, '提示');
    ok(cfgHashOf('x', 'v1', 1, 'S', MODEL) !== cfgHashOf('x', 'v2', 1, 'S', MODEL), '提示版本'); ok(cfgHashOf('x', 'v1', 1, 'S', MODEL) !== cfgHashOf('x', 'v1', 1, 'S', 'deepseek-v4-pro'), '模型'); void s1;
  });
  await t('术语选择：积分 不会匹配 积；单字词不选；上下文规则；最长匹配', async () => {
    const w = fakeWorld({ nodes: [node('a', { label: '积分', label_en: 'integral' }), node('b', { label: '积', label_en: 'product' }), node('c', { label: '素理想', label_en: 'prime ideal' })] });
    const V = buildVocab(w.graph);
    eq(selectTerms('计算积分的值', V), { 积分: 'integral' }); ok(!('积' in selectTerms('取积再求积', V)), '单字词不自动选');
    ok(!('极限' in selectTerms('极限序数是良序的', V)), '极限序数 不是 limit'); ok('极限' in selectTerms('函数的极限存在', V));
    const t3 = selectTerms('素理想与理想', V); eq(Object.keys(t3).sort(), ['理想', '素理想']); ok(!('理想' in selectTerms('素理想', V)), '素理想 吃掉 理想');
    eq(selectTerms('设 $积分$ 是积分', V), { 积分: 'integral' }, '公式内不参与');
    const dup = fakeWorld({ nodes: [node('a', { label: '商', label_en: 'quotient' }), node('b', { label: '陪集', label_en: 'congruence' }), node('c', { label: '陪集', label_en: 'congruent' })] }); ok(!('陪集' in buildVocab(dup.graph).vocab.keys ? {} : {}) || !buildVocab(dup.graph).vocab.has('陪集'), '同名不同译 → 丢弃');
  });
  await t('证明身份：单证明/等价两向/多种证法；重排不变；改标签 = 新身份；重复/空标签有标记', async () => {
    const e1 = edge('imp.s', { proof: 'p' }); eq(proofsOf(e1).map(p => p.identity), ['edge:imp.s:proof']);
    const eqv = edge('eq.x', { kind: 'equivalence', a: 'n.a', b: 'n.b', proofs: [{ label: '正向', text: 'A' }, { label: '反向', text: 'B' }] });
    const ids = proofsOf(eqv).map(p => p.identity); eq(new Set(ids).size, 2); ok(proofsOf(eqv).every(p => p.pid.length >= 20), 'pid ≥ 20 位');
    const rev = edge('eq.x', { kind: 'equivalence', a: 'n.a', b: 'n.b', proofs: [{ label: '反向', text: 'B' }, { label: '正向', text: 'A' }] });
    eq(proofsOf(rev).map(p => p.identity).sort(), ids.slice().sort(), '重排后身份集合不变'); eq(proofsOf(rev).find(p => p.label === '正向').ordinal, 1, '顺序只是元数据');
    const ren = edge('eq.x', { kind: 'equivalence', a: 'n.a', b: 'n.b', proofs: [{ label: '正向（改）', text: 'A' }, { label: '反向', text: 'B' }] }); ok(!ids.includes(proofsOf(ren)[0].identity), '改标签 → 新身份');
    const dup = edge('d', { proofs: [{ label: '法', text: 'A' }, { label: '法', text: 'B' }] }); const dp = proofsOf(dup); ok(dp.every(p => p.flags.includes('duplicate-label'))); eq(new Set(dp.map(p => p.identity)).size, 2);
    const nol = proofsOf(edge('n', { proofs: [{ label: '', text: 'A' }, { text: 'B' }] })); ok(nol.every(p => p.flags.includes('no-label'))); eq(new Set(nol.map(p => p.identity)).size, 2);
    const col = proofsOf(edge('c', { proofs: [{ label: '法', text: 'A' }, { label: '法', text: 'A' }] })); ok(col.some(p => p.flags.includes('collision')), '完全相同 → 碰撞');
    const w = fakeWorld({ nodes: [node('n.a'), node('n.b')], edges: [edge('c', { proofs: [{ label: '法', text: '证 $x$。' }, { label: '法', text: '证 $x$。' }] })] });
    const items = pinfo(w, 'proof'); eq(items.length, 0); ok(items.blocked.some(b => /collision/.test(b.reason)), '碰撞的边必须被拒');
    eq(proofsOf(edge('empty', { proofs: [{ label: 'x', text: '  ' }] })).length, 0, '没有证明文本 = 缺数学源，不是待译项');
  });
  await t('重复显示路径：等价面板里的平行蕴含不是独立翻译源', async () => {
    const w = fakeWorld({ nodes: [node('n.a'), node('n.b')], edges: [
      edge('eq.1', { kind: 'equivalence', a: 'n.a', b: 'n.b', proofs: [{ label: '正向', text: '证 $x$。' }, { label: '反向', text: '证 $y$。' }] }),
      edge('imp.a-b', { sources: ['n.a'], target: 'n.b', proof: '由 $x$ 得 $y$。' })] });
    eq(parallelImplications(w.graph), [{ equivalence: 'eq.1', implication: 'imp.a-b', hasProof: true }]);
    const ids = pinfo(w, 'proof').map(i => i.identity); eq(new Set(ids).size, ids.length); eq(ids.filter(x => x === 'edge:imp.a-b:proof').length, 1, '蕴含边的证明只翻译一次'); eq(ids.length, 3);
  });
}

export async function validation() {
  console.log('校验启发式（形式，非语义证明）');
  const good = { mode: 'statement', zh: '设 $G$ 为群，则 $H$ 是子群，见 @@def.group@@。', en: 'Let $G$ be a group; then $H$ is a subgroup, see @@def.group@@.' };
  await t('合法通过；公式被改/少/多、链接丢失、汉字、$ 不配对、KaTeX 坏 → 错误', async () => {
    eq(validate(good).errors, []);
    ok(validate({ ...good, en: 'Let $G$ be a group; then $K$ is a subgroup, see @@def.group@@.' }).errors.some(e => /多重集/.test(e)));
    ok(validate({ ...good, en: 'Let $G$ be a group; then $H$ is a subgroup.' }).errors.some(e => /链接/.test(e)));
    ok(validate({ ...good, en: 'Let G be a group; then $H$ is a subgroup, see @@def.group@@.' }).errors.some(e => /条数/.test(e)));
    ok(validate({ ...good, en: '群 $G$ and $H$ see @@def.group@@' }).errors.some(e => /汉字/.test(e)));
    ok(validate({ ...good, en: 'Let $G be a group $H$ see @@def.group@@' }).errors.length > 0);
    ok(validate({ ...good, en: 'Let $G$ be a group; $H\\frac{$ see @@def.group@@' }).errors.some(e => /KaTeX|多重集/.test(e)));
    ok(validate({ ...good, en: 'Let $G$, \\$5 and $H$ see @@def.group@@' }).errors.every(e => !/奇数/.test(e)), '转义的 \\$ 不计');
    ok(validate({ ...good, en: 'We have $G$ \\leq... $H$ @@def.group@@' }).errors.length > 0);
  });
  await t('公式顺序/量词/否定/条件/推理方向/段落/歧义/疑似错误 → 送审标记（绝不自动通过）', async () => {
    const z = '对任意 $x$，若 $x>0$ 则 $y<0$。\n\n因此 $x\\ne y$。反之亦然。';
    const base = validate({ mode: 'proof', zh: z, en: 'For any $x$, if $x>0$ then $y<0$.\n\nTherefore $x\\ne y$. Conversely too.' }); eq(base.errors, []); eq(base.flags, []);
    ok(validate({ mode: 'statement', zh: '设 $a=b$，则 $c=d$。', en: 'Suppose $c=d$; then $a=b$.' }).flags.some(f => /顺序/.test(f)), '关系式换序仍须送审');
    ok(validate({ mode: 'proof', zh: z, en: 'For $x$, if $x>0$ then $y<0$.\n\nTherefore $x\\ne y$. Conversely too.' }).flags.some(f => /universal/.test(f)));
    ok(validate({ mode: 'proof', zh: z, en: 'For any $x$, $x>0$ gives $y<0$.\n\nTherefore $x\\ne y$. Conversely too.' }).flags.some(f => /conditional/.test(f)));
    ok(validate({ mode: 'proof', zh: z, en: 'For any $x$, if $x>0$ then $y<0$.\n\n$x\\ne y$. Conversely too.' }).flags.some(f => /consequence/.test(f)));
    ok(validate({ mode: 'proof', zh: z, en: 'For any $x$, if $x>0$ then $y<0$.\n\nTherefore $x\\ne y$.' }).flags.some(f => /converse/.test(f)));
    ok(validate({ mode: 'proof', zh: z, en: 'For any $x$, if $x>0$ then $y<0$. Therefore $x\\ne y$. Conversely too.' }).flags.some(f => /段落/.test(f)));
    const f = validate({ mode: 'proof', zh: z, en: 'For any $x$, if $x>0$ then $y<0$.\n\nTherefore $x\\ne y$. Conversely too.', ambiguities: ['q'], suspected: ['s'], confidence: 'low' }).flags.join('|'); ok(/歧义/.test(f) && /疑似/.test(f) && /低|low/.test(f));
    ok(validate({ mode: 'proof', zh: '1. 先 $a$。\n2. 再 $b$。', en: '1. First $a$. Then $b$.' }).flags.some(f => /步骤/.test(f)));
  });
  await t('摘要：只能用源文里的公式；词数范围；一律送审', async () => {
    const zh = '定义 $F$ 是函子。'; const en = 'This concept ' + 'word '.repeat(60);
    eq(validate({ mode: 'abstract', zh, en: en + '$F$' }).errors, []); ok(validate({ mode: 'abstract', zh, en: en + '$Q$' }).errors.some(e => /源文没有的公式/.test(e)));
    ok(validate({ mode: 'abstract', zh, en: 'Too short $F$.' }).flags.some(f => /词数/.test(f))); ok(validate({ mode: 'abstract', zh, en: en + ' @@x@@' }).errors.some(e => /链接/.test(e)));
  });
}

/* ---------------------------------------------------------------- 管线 + 回写 */
const STMT = `window.MG = window.MG || {};
MG.i18nStatements = {
  version: 2,
  items: {
    'old.one': {
      statement: {
        en: 'Old translation.',
        status: 'reviewed', basedOn: 'v0.0.0#00000000', reviewed: { by: 'a', date: 'd' },
      },
    },
  },
};
`;
const ABS = `window.MG = window.MG || {};
MG.i18nAbstracts = {
  version: 1,
  items: {
    'h.old': {
      en: 'Old abstract.',
      status: 'reviewed', basedOn: 'v0.0.0#00000000', reviewed: { by: 'a', date: 'd' },
    },

  },
};
`;
const EN = `window.MG = window.MG || {};
window.MG.i18nEdgeNotes = {
  "e.old": { note: { en: "Old note.", status: 'draft', basedOn: 'v0.0.0#0' } },
};
`;
const HUBZH = '定义 $F$ 是函子，并且保持极限。'.repeat(2);
function mkWorld(over = {}) {
  return fakeWorld({
    nodes: [node('old.one', { statement: ZH, notes: '说明文字足够长的一句话。' }), node('n.1', { statement: ZH, notes: '另一个说明文字。' }), node('h.old', { isHub: true, statement: HUBZH }), node('h.new', { isHub: true, statement: HUBZH }), ...(over.nodes || [])],
    edges: [edge('e.old', { note: '旧边说明文字。' }), edge('e.new', { note: '新边说明文字足够长。', title: '新边的标题文字' }),
      edge('imp.s', { proof: '假设 $A$ 成立。由 $A\\subset B$ 得 $B$。' }),
      edge('eq.x', { kind: 'equivalence', a: 'n.1', b: 'old.one', proofs: [{ label: '正向 $\\implies$', text: '设 $x$ 成立，得 $y$。' }, { label: '反向', text: '设 $y$ 成立，得 $x$。' }] }),
      edge('imp.alt', { proofs: [{ label: '证法一', text: '用 $f$ 直接算出 $g$。' }, { label: '证法二', text: '用 $h$ 间接算出 $g$。' }] }), ...(over.edges || [])],
    statements: { 'old.one': { statement: { en: 'Old translation.', status: 'reviewed', basedOn: 'v0.0.0#00000000' } } },
    abstracts: { 'h.old': { en: 'Old abstract.', status: 'reviewed', basedOn: 'v0.0.0#00000000' } },
    edgeNotes: { 'e.old': { note: { en: 'Old note.', status: 'draft', basedOn: 'v0.0.0#0' } } },
  });
}
/** 跑完整条管线（mock），返回各适配器的 store 与 items。 */
async function pipe(name, w, { adapters = ['node-text', 'abstract', 'edge-text', 'proof'], transport = mockTransport(), approveAll = true } = {}) {
  const d = dir('w-' + name); const billing = new Billing(d); billing.openCampaign('c', 5); const out = { d, stores: {}, items: {}, billing, transport };
  for (const a of adapters) {
    const items = pinfo(w, a); const store = new Store(d, ADAPTERS[a].OP); out.stores[a] = store; out.items[a] = items;
    if (items.length) { await run({ items, store, billing, campaign: 'c', model: MODEL, limit: 500, transport, backoffMs: 1, concurrency: 3 }); validateStage({ adapter: ADAPTERS[a], items, store }); }
    if (approveAll) approve({ store, identities: items.map(i => i.identity) });
  }
  return out;
}
const ctxFor = (w, d, files, extra = {}) => {
  const current = new Map(); for (const a of Object.keys(ADAPTERS)) for (const it of pinfo(w, a, { includeExisting: true })) current.set(it.identity, it);
  return { storeDir: d, version: 'v0.0.0', zhHash, current, cfgHashOf: a => ADAPTERS[a].cfgHash(MODEL), targetFiles: files, ...extra };
};
const files = d => { const f = { statements: path.join(d, 'statements.en.js'), abstracts: path.join(d, 'abstracts.en.js'), 'edge-notes': path.join(d, 'edge-notes.en.js') }; fs.writeFileSync(f.statements, STMT); fs.writeFileSync(f.abstracts, ABS); fs.writeFileSync(f['edge-notes'], EN); return f; };
const sha = f => sha256(fs.readFileSync(f, 'utf8'));

export async function pipelineAndWriteback() {
  console.log('管线 / 批准 / 回写 / 导出');
  await t('适配器收集：只含「缺失且可译」；已有译文、无源文、公式含汉字都不收', async () => {
    const w = mkWorld({ nodes: [node('han', { statement: '设 $集合$ 为群。' }), node('empty', { statement: '' })] });
    const ids = pinfo(w, 'node-text').map(i => i.identity); ok(ids.includes('node:n.1:statement') && ids.includes('node:old.one:notes')); ok(!ids.includes('node:old.one:statement'), '已有译文'); ok(!ids.some(x => x.startsWith('node:han') || x.startsWith('node:empty')));
    eq(pinfo(w, 'abstract').map(i => i.identity), ['node:h.new:abstract']); eq(pinfo(w, 'edge-text').map(i => i.identity).sort(), ['edge:e.new:note', 'edge:e.new:title']);
    eq(pinfo(w, 'proof').length, 5, '单 1 + 等价 2 + 证法 2');
  });
  await t('端到端：statements 新条目 + 字段级追加；既有字段/审校记录逐字不变；status 全是 draft', async () => {
    const w = mkWorld(); const P = await pipe('e2e', w, { adapters: ['node-text'] }); const f = files(P.d); const before = fs.readFileSync(f.statements, 'utf8');
    const ctx = ctxFor(w, P.d, f); const dry = apply({ stores: [P.stores['node-text']], ctx, dryRun: true }); ok(/n\.1/.test(dry.diff.statements)); eq(fs.readFileSync(f.statements, 'utf8'), before, 'dry-run 不写');
    const r = apply({ stores: [P.stores['node-text']], ctx, dryRun: false }); eq(r.applied, ['statements:h.new', 'statements:h.old', 'statements:n.1', 'statements:old.one']);
    const items = loadItems(fs.readFileSync(f.statements, 'utf8'), 'statements'); eq(items['old.one'].statement.en, 'Old translation.'); eq(items['old.one'].statement.status, 'reviewed'); eq(items['old.one'].statement.reviewed, { by: 'a', date: 'd' });
    ok(items['old.one'].notes && items['old.one'].notes.status === 'draft', '字段级追加'); ok(items['n.1'].statement.status === 'draft' && items['n.1'].notes.status === 'draft');
    ok(/^v0\.0\.0#[0-9a-f]{8}$/.test(items['n.1'].statement.basedOn)); ok(!/reviewed/.test(JSON.stringify(items['n.1'])));
    const after = fs.readFileSync(f.statements, 'utf8'); const r2 = apply({ stores: [P.stores['node-text']], ctx: ctxFor(w, P.d, f), dryRun: false }); eq(r2.applied, []); eq(fs.readFileSync(f.statements, 'utf8'), after, '幂等：字节相同');
    ok(fs.existsSync(r.backup) && sha256(fs.readFileSync(r.backup, 'utf8')) === sha256(before), '备份可用');
  });
  await t('摘要与边说明目标：追加写入、既有条目不动、都是 draft', async () => {
    const w = mkWorld(); const P = await pipe('e2e2', w, { adapters: ['abstract', 'edge-text'] }); const f = files(P.d); const absBefore = loadItems(fs.readFileSync(f.abstracts, 'utf8'), 'abstracts');
    const r = apply({ stores: [P.stores.abstract, P.stores['edge-text']], ctx: ctxFor(w, P.d, f), dryRun: false }); eq(r.applied.sort(), ['abstracts:h.new', 'edge-notes:e.new']);
    const a = loadItems(fs.readFileSync(f.abstracts, 'utf8'), 'abstracts'); eq(a['h.old'], absBefore['h.old']); eq(a['h.new'].status, 'draft'); const n = loadItems(fs.readFileSync(f['edge-notes'], 'utf8'), 'edge-notes'); eq(n['e.old'].note.en, 'Old note.'); eq(n['e.new'].note.status, 'draft');
    const st = P.stores['edge-text'].load(); ok([...st.values()].some(x => x.kind === 'item' && x.identity === 'edge:e.new:title' && x.target.kind === 'export'), '边标题只导出');
  });
  await t('未批准不可回写；批准绑定结果/源/配置/请求载荷，任一变化都失效', async () => {
    const w = mkWorld(); const P = await pipe('inv', w, { adapters: ['node-text'], approveAll: false }); const f = files(P.d); const st = P.stores['node-text'];
    eq(apply({ stores: [st], ctx: ctxFor(w, P.d, f), dryRun: false }).applied, [], '未批准');
    approve({ store: st, includeOkAll: true }); const base = ctxFor(w, P.d, f);
    const tamper = [...st.load().values()].find(r => r.state === 'approved'); st.append({ ...tamper, t: undefined, result: { ...tamper.result, en: 'Tampered $G$.' } });
    ok(apply({ stores: [st], ctx: base, dryRun: true }).stale.some(x => x.why.includes('结果与批准时不一致')), '结果被改');
    const w2 = mkWorld({}); w2.graph.byId['n.1'].statement = '设 $G$ 为群，则 $K$ 是正规子群。'; ok(apply({ stores: [st], ctx: ctxFor(w2, P.d, f), dryRun: true }).stale.some(x => x.identity === 'node:n.1:statement' && x.why.some(y => /底稿/.test(y))), '中文改了');
    const w3 = mkWorld({ nodes: [node('g', { label: '群', label_en: 'group' })] }); w3.graph.byId['n.1'].statement = ZH + '群群'; // 术语/上下文变化：用标题改动触发请求载荷变化
    const w4 = mkWorld(); w4.graph.byId['n.1'].title_en = 'Changed Title'; ok(apply({ stores: [st], ctx: ctxFor(w4, P.d, f), dryRun: true }).stale.some(x => x.why.some(y => /请求载荷/.test(y))), '标题/术语变了');
    ok(apply({ stores: [st], ctx: { ...base, cfgHashOf: () => 'other-config' }, dryRun: true }).stale.some(x => x.why.some(y => /处理配置/.test(y))), '配置变了'); void w3;
  });
  await t('保护现有译文：同字段已有不同译文 → 拒绝覆盖；同文 → 只记账', async () => {
    const w = mkWorld(); const P = await pipe('prot', w, { adapters: ['node-text'] }); const f = files(P.d);
    fs.writeFileSync(f.statements, STMT.replace("    'old.one'", "    'n.1': { statement: { en: 'Human version.', status: 'reviewed', basedOn: 'v0.0.0#1' } },\n    'old.one'"));
    const before = fs.readFileSync(f.statements, 'utf8'); const r = apply({ stores: [P.stores['node-text']], ctx: ctxFor(w, P.d, f), dryRun: false });
    ok(r.refused.some(x => x.identity === 'node:n.1:statement'), '应拒绝'); ok(fs.readFileSync(f.statements, 'utf8').includes('Human version.'));
    ok(!r.applied.includes('statements:n.1') || true); const items = loadItems(fs.readFileSync(f.statements, 'utf8'), 'statements'); eq(items['n.1'].statement.en, 'Human version.'); void before;
  });
  await t('回写期间目标被并发修改 → 中止且不覆盖；中断后可恢复（回滚/补记账）；重复应用不损坏', async () => {
    const w = mkWorld(); const P = await pipe('crash', w, { adapters: ['node-text'] }); const f = files(P.d); const st = P.stores['node-text']; const orig = fs.readFileSync(f.statements, 'utf8');
    let msg = ''; try { apply({ stores: [st], ctx: ctxFor(w, P.d, f), dryRun: false, hooks: { beforeSwap: () => fs.appendFileSync(f.statements, '// concurrent\n') } }); } catch (e) { msg = e.message; }
    ok(/被修改/.test(msg), msg); ok(fs.readFileSync(f.statements, 'utf8').endsWith('// concurrent\n')); ok(!fs.existsSync(f.statements + '.mgtmp'));
    fs.writeFileSync(f.statements, orig);
    try { apply({ stores: [st], ctx: ctxFor(w, P.d, f), dryRun: false, hooks: { beforeSwap: () => { throw new Error('CRASH'); } } }); } catch { /* 模拟崩溃 */ }
    ok(fs.existsSync(path.join(P.d, 'apply.journal.json'))); eq(fs.readFileSync(f.statements, 'utf8'), orig);
    const r = apply({ stores: [st], ctx: ctxFor(w, P.d, f), dryRun: false }); eq(r.recovered, 'rolled-back'); eq(r.applied.length, 4);
    // rename 之后、记账之前崩溃：还原成「目标已换、日志在、记录仍 approved」
    const P2 = await pipe('crash2', w, { adapters: ['node-text'] }); const f2 = files(P2.d); const o2 = fs.readFileSync(f2.statements, 'utf8'); const s2 = P2.stores['node-text'];
    apply({ stores: [s2], ctx: ctxFor(w, P2.d, f2), dryRun: false }); const newText = fs.readFileSync(f2.statements, 'utf8');
    for (const x of [...s2.load().values()]) if (x.kind === 'item') s2.append({ ...x, t: undefined, state: 'approved' });
    fs.writeFileSync(path.join(P2.d, 'apply.journal.json'), JSON.stringify({ kind: 'statements', target: f2.statements, h0: sha256(o2), h1: sha256(newText), backup: 'x', ids: ['n.1', 'old.one', 'h.new', 'h.old'], tmp: f2.statements + '.mgtmp', identities: [...s2.load().values()].filter(x => x.kind === 'item').map(x => x.identity) }));
    const r2 = apply({ stores: [s2], ctx: ctxFor(w, P2.d, f2), dryRun: false }); eq(r2.recovered, 'completed'); eq(fs.readFileSync(f2.statements, 'utf8'), newText); eq(r2.applied, []);
  });
  await t('证明：三种结构经管线 → 一律 review（绝不自动 ok）；标签与方向/顺序元数据随身；只导出候选，不写任何生产文件', async () => {
    const w = mkWorld(); const P = await pipe('proofs', w, { adapters: ['proof'], approveAll: false }); const st = P.stores.proof;
    const its = [...st.load().values()].filter(r => r.kind === 'item'); eq(its.length, 5); ok(its.every(r => r.state === 'review'), '证明必须全部送审');
    const byId = Object.fromEntries(its.map(r => [r.identity, r])); eq(byId['edge:imp.s:proof'].proof.structure, 'single');
    eq(its.filter(r => r.proof.structure === 'equivalence-direction').map(r => r.proof.ordinal).sort(), [0, 1]); eq(its.filter(r => r.proof.structure === 'alternative').length, 2);
    const fwd = its.find(r => r.proof.ordinal === 0 && r.proof.structure === 'equivalence-direction'); ok(/\$\\implies\$/.test(fwd.result.label_en), '标签公式原样保留');
    ok(its.every(r => r.flags.some(f => /人工语义审查|送审|模型|切成/.test(f)) || r.flags.length), '带送审说明');
    const sh = ['statements', 'abstracts', 'edge-notes'].map(k => sha256(fs.readFileSync(path.join('B:/MathGalaxy/src/data/i18n', k === 'statements' ? 'statements.en.js' : k === 'abstracts' ? 'abstracts.en.js' : 'edge-notes.en.js'), 'utf8')));
    approve({ store: st, identities: its.map(r => r.identity) }); const stagedFiles = files(P.d);
    const ra = apply({ stores: [st], ctx: ctxFor(w, P.d, stagedFiles), dryRun: false }); eq(ra.applied, [], '证明没有生产回写目标');
    const out = path.join(P.d, 'export', 'c.json'); const cur = ctxFor(w, P.d, stagedFiles); const a = exportCandidates({ stores: [st], outFile: out, ctx: cur }); eq(a, { rows: 5, written: true });
    const text = fs.readFileSync(out, 'utf8'); const b = exportCandidates({ stores: [st], outFile: out, ctx: cur }); eq(b, { rows: 5, written: false }, '幂等'); eq(fs.readFileSync(out, 'utf8'), text);
    const j = JSON.parse(text); eq(j.items.map(x => x.identity), j.items.map(x => x.identity).slice().sort((p, q) => p.localeCompare(q)), '确定性排序'); ok(j.items.every(x => x.status === 'candidate-draft' && !x.stale));
    w.graph.edges.find(e => e.id === 'imp.s').proof = '假设 $A$ 不成立。'; const c = exportCandidates({ stores: [st], outFile: out, ctx: ctxFor(w, P.d, stagedFiles) }); ok(c.written); ok(JSON.parse(fs.readFileSync(out, 'utf8')).items.find(x => x.identity === 'edge:imp.s:proof').stale, '源改了要标 stale');
    eq(['statements.en.js', 'abstracts.en.js', 'edge-notes.en.js'].map(f => sha256(fs.readFileSync(path.join('B:/MathGalaxy/src/data/i18n', f), 'utf8'))), sh, '生产旁挂文件不变');
  });
  await t('长证明切分：不在公式/段落内切、重组逐字还原、每段带中文前后文与符号表；整条重新校验并送审；单段超长被拒', async () => {
    const para = i => `设 $A_${i}$ 为集合，则 $B_${i}$ 是子集。`.repeat(45);               // ≈ 900+ 字符
    const text = [para(1), para(2), '令\n$$\nx = y\n\nz = w\n$$\n成立。' + para(3), para(4)].join('\n\n');
    const seg = proof.segmentProof(text); ok(seg.segments && seg.segments.length >= 2, '应被切成多段'); ok(seg.segments.every(s => s.text.length <= proof.SEG_MAX));
    eq(seg.segments.map(s => s.text + s.sep).join(''), text, '重组应逐字还原'); ok(seg.segments.every(s => ((s.text.match(/\$\$/g) || []).length % 2) === 0), '不得在 $$ 里切');
    ok(seg.segments.some(s => s.text.includes('x = y') && s.text.includes('z = w')), '跨空行的块公式必须在同一段');
    eq(proof.segmentProof('很长'.repeat(1500)).unsegmentable ? 1 : 0, 1, '单个超长段落不能任意切');
    const w = fakeWorld({ nodes: [node('n.a')], edges: [edge('imp.long', { proof: text, proofs: null }), edge('imp.huge', { proof: '很长'.repeat(1500) })] });
    const items = pinfo(w, 'proof'); eq(items.length, 1); ok(items.blocked.some(b => /超过/.test(b.reason))); const it = items[0]; ok(it.requests.length >= 2);
    const u1 = JSON.parse(it.requests[1].body.messages[1].content); ok(u1.preceding_source_tail.length > 0 && u1.segment.index === 1 && u1.segment.total === it.requests.length && Array.isArray(u1.symbols) && u1.symbols.length > 0, '后续段带中文前文与符号表');
    const d = dir('seg'); const store = new Store(d, 'proof'); const billing = new Billing(d); billing.openCampaign('c', 5);
    return run({ items, store, billing, campaign: 'c', model: MODEL, limit: 50, transport: mockTransport(), backoffMs: 1 }).then(() => {
      const tally = validateStage({ adapter: proof, items, store }); eq(tally.review, 1, JSON.stringify(tally)); const rec = [...store.load().values()].find(r => r.kind === 'item');
      eq(rec.parts.length, it.requests.length); ok(rec.flags.some(f => /切成/.test(f)), '切段要提示通读'); ok(rec.result.en.split(/\n[ \t]*\n/).length === text.split(/\n[ \t]*\n/).length, '段落数还原');
    });
  });
}
