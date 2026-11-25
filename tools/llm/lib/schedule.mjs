/* 缓存感知调度（确定性、纯函数）。DeepSeek 上下文缓存只认逐 token 相同的前缀，所以把共享前缀的请求放在一起、
   并让「第一个」先把前缀建好再并发。不合并条目、不改请求体、不改缓存键：每个请求仍可独立识别/续跑/审阅/重试。
   顺序键：适配器（= system 内容类型）→ kind → 数学分区（sector）→ 星团（cluster）→ 前缀组 → 身份 → 段号。 */
import { endpoints } from './source.mjs';

/** 数学位置：节点取自身 cluster；边取第一个能解析到节点的端点。查不到记 'unknown'（仍然确定）。 */
export function locate(world, it) {
  const { MG, graph } = world; const U = { sector: 'unknown', cluster: 'unknown' };
  let n = null;
  if (it.scope === 'node') n = graph.byId[it.id];
  else { const e = graph.edges.find(x => x.id === it.id); if (e) for (const nid of endpoints(e)) if ((n = graph.byId[nid])) break; }
  if (!n || !n.cluster) return U;
  const c = (MG.clusters || []).find(x => x.id === n.cluster);          // cluster.parent = 所属 region；sector 按 sectors[].regions 取第一个包含它的（顺序确定）
  const sec = c && (MG.sectors || []).find(x => (x.regions || []).includes(c.parent));
  return { sector: (sec && sec.id) || 'unknown', cluster: n.cluster };
}

const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
export function sortKey({ it, rq }) {
  const loc = it.loc || {};
  return [it.adapter || '', rq.kind || '', loc.sector || '', loc.cluster || '', rq.prefixGroup || '', it.identity || '', rq.seg || 0];
}
/** 稳定、与输入顺序无关的全序。 */
export function orderTodo(todo) {
  return todo.map(x => ({ x, k: sortKey(x) })).sort((a, b) => { for (let i = 0; i < a.k.length; i++) { const c = cmp(a.k[i], b.k[i]); if (c) return c; } return 0; }).map(o => o.x);
}
/** 分阶段：① 暖机（前 warmup 个，逐个串行：先把公共前缀建进缓存）② 其余前缀组各自的第一个（播种，可并发）③ 余下（可并发）。
    每阶段内保持 orderTodo 的顺序。 */
export function phasesOf(ordered, warmup = 1) {
  const w = ordered.slice(0, warmup), rest = ordered.slice(warmup), seen = new Set(w.map(x => x.rq.prefixGroup)), seeds = [], tail = [];
  for (const x of rest) { const g = x.rq.prefixGroup; if (g && !seen.has(g)) { seen.add(g); seeds.push(x); } else tail.push(x); }
  return { warmup: w, seeds, tail };
}
