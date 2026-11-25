/* 自测公共件：测试框架、临时目录、假世界（fixture）、mock 传输。
   临时物放 _tmp/llm-selftest-<pid>/（带 MANIFEST.md），selftest.mjs 结束时按显式路径删除。 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../lib/mgload.mjs';

export const TMP = path.join(ROOT, '_tmp', `llm-selftest-${process.pid}`);
export const MODEL = 'deepseek-flash';
export function setupTmp() {
  fs.mkdirSync(TMP, { recursive: true });
  fs.writeFileSync(path.join(TMP, 'MANIFEST.md'), '# llm-selftest\n谁：tools/llm/selftest.mjs；为什么：离线验证流水线；产出：无（结束时删除本目录）\n');
}
export const cleanupTmp = () => fs.rmSync(TMP, { recursive: true, force: true });
export const dir = name => { const d = path.join(TMP, name); fs.mkdirSync(d, { recursive: true }); return d; };

export const R = { pass: 0, fail: 0, failed: [] };
export async function t(name, fn) {
  try { await fn(); R.pass++; console.log('  ✓', name); }
  catch (e) { R.fail++; R.failed.push(name); console.log('  ✗', name, '→', String(e.message).slice(0, 300)); }
}
export const eq = (a, b, m) => { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${m || ''} 期望 ${JSON.stringify(b)} 实得 ${JSON.stringify(a)}`); };
export const ok = (c, m) => { if (!c) throw new Error(m || '断言失败'); };
export const throws = (fn, re, m) => { let e = null; try { fn(); } catch (x) { e = x; } if (!e) throw new Error((m || '应当抛错') + '：未抛错'); if (re && !re.test(String(e.message))) throw new Error(`${m || ''} 抛错信息不符：${e.message}`); return e; };
export const rejects = async (p, re, m) => { let e = null; try { await p; } catch (x) { e = x; } if (!e) throw new Error((m || '应当拒绝') + '：未拒绝'); if (re && !re.test(String(e.message))) throw new Error(`${m || ''} 信息不符：${e.message}`); return e; };

/* ---------------------------------------------------------------- 假世界 */
export function fakeWorld({ nodes = [], edges = [], statements = {}, abstracts = {}, edgeNotes = {} } = {}) {
  const byId = {}; nodes.forEach(n => { byId[n.id] = n; });
  return { MG: { i18nStatements: { items: statements }, i18nAbstracts: { items: abstracts }, i18nEdgeNotes: edgeNotes }, graph: { nodes, edges, byId }, version: 'v0.0.0' };
}
export const node = (id, extra = {}) => ({ id, type: 'theorem', label: id, title: id, title_en: id, label_en: id, statement: '', notes: '', ...extra });
export const edge = (id, extra = {}) => ({ id, kind: 'implication', title: '', proof: '', proofs: null, note: '', sources: [], target: null, ...extra });

/* ---------------------------------------------------------------- mock 传输 */
/** 朴素「翻译」：非公式/非链接部分，每两个汉字 → 一个英文词；公式与 @@链接@@ 原样保留。 */
export const mockEn = zh => String(zh).replace(/(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|@@[^@\s]+@@)|([一-鿿]+)/g, (m, keep, han) => keep ? keep : han.replace(/../g, 'ab ').replace(/[一-鿿]$/, 'a'));
export const USAGE = { prompt_tokens: 100, completion_tokens: 50, prompt_cache_hit_tokens: 0, prompt_cache_miss_tokens: 100 };
export const userOf = body => JSON.parse(body.messages[1].content);
export function contentFor(user, over = {}) {
  const k = user.kind;
  if (k === 'edge-proof') return { id: user.id, label_en: mockEn(user.label_zh), en: mockEn(user.source_text_zh), ambiguities: [], suspected_errors: [], equivalence_confidence: 'high', ...over };
  if (k === 'node-abstract') return { id: user.id, en: 'This concept ' + 'word '.repeat(60), ambiguities: [], equivalence_confidence: 'high', ...over };
  return { id: user.id, en: mockEn(user.source_text_zh), ambiguities: [], equivalence_confidence: 'high', ...over };
}
export function okResponse(user, { over = {}, usage = USAGE, finish = 'stop', model = MODEL, content } = {}) {
  return { status: 200, json: { model, choices: [{ message: { content: content !== undefined ? content : JSON.stringify(contentFor(user, over)) }, finish_reason: finish }], usage } };
}
/** 默认成功的 mock；calls 计数；可按次改写（fn(body, n) → response | undefined）。 */
export function mockTransport(fn = null) {
  const m = async body => { m.calls++; m.bodies.push(body); const r = fn ? await fn(body, m.calls) : undefined; return r !== undefined ? r : okResponse(userOf(body)); };
  m.calls = 0; m.bodies = []; return m;
}
