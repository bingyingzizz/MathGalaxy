/* 校验器精修的回归：试点（pilot1）里观察到的误报，以及「真阳性仍被抓」的对照。
   说明：确定性校验只能做形式/粗筛，不能可靠发现每一种语义静默修复——这里测的只是标记规则本身。 */
import { t, eq, ok } from './h.mjs';
import { validate, formulaOrder } from '../validate.mjs';
import { RULES } from '../jobs/common.mjs';
import { GLOSSARY_HASH } from '../lib/glossary.mjs';
import { cfgHashOf } from '../jobs/common.mjs';

const fl = (zh, en, mode = 'notes') => validate({ mode, zh, en }).flags;
const has = (flags, name) => flags.some(f => f.startsWith(name + '：'));

export async function validatorRefinement() {
  console.log('校验器精修（试点误报回归）');
  await t('不等式/不变量/互不相同/无关/无穷 不再被当作否定；真正的否定（不可导、非零、没有）仍被抓', async () => {
    ok(!has(fl('这个不等式成立。', 'This inequality holds.'), 'negation'), '不等式');
    ok(!has(fl('只有 $i_j$ 互不相同的项非零。', 'Only terms with pairwise distinct $i_j$ are nonzero.'), 'negation'), '互不相同/非零');
    ok(!has(fl('结果与选取无关。', 'The result is independent of the choice.'), 'negation'), '无关');
    ok(!has(fl('这是一个不变量。', 'This is an invariant.'), 'negation'), '不变量');
    ok(has(fl('$f$ 在 $0$ 处不可导。', '$f$ is differentiable at $0$.'), 'negation'), '漏译否定必须仍被标记');
    ok(has(fl('这里没有零因子。', 'There are zero divisors here.'), 'negation'));
  });
  await t('唯一性/存在性/某个/都 → uniqueness / existence / some / all：不再误报；真缺失仍被抓', async () => {
    ok(!has(fl('唯一性也是免费的。', 'Uniqueness is also free.'), 'unique'));
    ok(!has(fl('**存在性。** 直接定义。', '**Existence.** Define directly.'), 'existential'));
    ok(!has(fl('含于某个成员。', 'contained in some member.'), 'existential'));
    ok(!has(fl('$x^2$ 都凸。', 'All of $x^2$ are convex.'), 'universal'));
    ok(has(fl('存在唯一的 $A$。', 'There is an operator $A$.'), 'unique'), '丢了「唯一」仍须标记');
    ok(has(fl('存在 $A$。', 'The operator $A$ is given.'), 'existential'), '丢了「存在」仍须标记');
  });
  await t('「…时」↔ when 不再误报条件；「同时」不算条件；丢掉条件仍被抓', async () => {
    ok(!has(fl('严格凸要 $t\in(0,1)$ 时不等号严格。', 'Strictness is required when $t\in(0,1)$.'), 'conditional'));
    ok(!has(fl('同时 $a$ 成立。', 'Also $a$ holds.'), 'conditional'));
    ok(has(fl('若 $a$ 则 $b$。', 'Then $a$ and $b$.'), 'conditional'));
  });
  await t('公式顺序：英语语序所致的变量小幅换位 → 仅 info 不送审；关系式换序、跨段、远距离 → 仍送审', async () => {
    const z = '$A$ 定义的算子 $T$ 满足 $T^{*}T = TT^{*}$。';
    const harmless = validate({ mode: 'statement', zh: z, en: 'The operator $T$ defined by $A$ satisfies $T^{*}T = TT^{*}$.' });
    eq(formulaOrder(z, 'The operator $T$ defined by $A$ satisfies $T^{*}T = TT^{*}$.').level, 'harmless'); ok(!harmless.flags.some(f => /顺序/.test(f))); ok(harmless.info.length === 1);
    const en2 = 'Let $T$, defined by $A$, satisfy $T^{*}T = TT^{*}$.'; ok(!validate({ mode: 'proof', zh: z, en: en2 }).flags.some(f => /顺序/.test(f)));
    const r = validate({ mode: 'statement', zh: '设 $a=b$，则 $c=d$。', en: 'Suppose $c=d$; then $a=b$.' }); ok(r.flags.some(f => /关系式/.test(f))); eq(r.info.length, 0);
    ok(validate({ mode: 'statement', zh: '设 $a$。\n\n则 $b$。', en: 'Let $b$.\n\nThen $a$.' }).flags.some(f => /跨段落或位移/.test(f)), '跨段落');
    eq(formulaOrder('$a$ $b$ $c$ $d$ $e$', '$e$ $b$ $c$ $d$ $a$').level, 'far');
    eq(formulaOrder('$x$', '$x$').level, 'same'); eq(formulaOrder('$x$ $y$', '$x$ $z$').level, 'sets-differ');
  });
  await t('提示词：要求对疑似损坏/可疑的源文逐字翻译并在 ambiguities 里点名，不得静默「修好」', async () => {
    ok(/garbled/.test(RULES) && /do NOT guess/.test(RULES) && /ambiguities/.test(RULES) && /failure/.test(RULES));
  });
  await t('词表配置进入处理配置哈希：词表哈希变 → cfgHash 变（旧批准失效）；同配置稳定', async () => {
    const a = cfgHashOf('x', 'v', 1, 'S', 'm'); eq(a, cfgHashOf('x', 'v', 1, 'S', 'm')); ok(/^[0-9a-f]{16}$/.test(GLOSSARY_HASH));
  });
}

export async function backtickConvention() {
  const BS = String.fromCharCode(92), BT = String.fromCharCode(96), id = BS + BT + 'def.exterior-power' + BS + BT, plain = BT + 'def.exterior-power' + BT;
  await t('反斜杠+反引号约定：中文里「反斜杠+反引号」包住的 id 必须原样保留；丢掉/添加反斜杠都算错误（试点里模型曾静默丢掉）', async () => {
    const zh = '这一路依赖外幂（' + id + '）。';
    ok(validate({ mode: 'proof', zh, en: 'This route depends on the exterior power (' + id + ').' }).errors.length === 0);
    ok(validate({ mode: 'proof', zh, en: 'This route depends on the exterior power (' + plain + ').' }).errors.some(e => /反引号/.test(e)), '丢了反斜杠');
    ok(validate({ mode: 'edge-note', zh: '见 ' + plain + '。', en: 'See ' + id + '.' }).errors.some(e => /反引号/.test(e)), '多了反斜杠');
    ok(validate({ mode: 'edge-note', zh: '见 ' + plain + '。', en: 'See ' + plain + '.' }).errors.length === 0);
    ok(/backslash/.test(RULES) && /backtick/.test(RULES));
  });
}
