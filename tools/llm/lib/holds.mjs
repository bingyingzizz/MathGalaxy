/* 源文复核搁置项：从 docs/source-review-register.md 读出「未解决（status 以 open 开头）」的条目身份。
   规则（Task 2.6 / SR-6）：未解决的源文复核搁置项**优先于**译文审核——该身份既不能被批准（approve），
   也不能被回写（apply），即使译文审核判 pass。译文可留在结果库里，但不得成为现行内容。
   身份写法与流水线一致：`node:<id>:<field>`、`edge:<id>:proofs:<pid>`；「同上」沿用上一行的身份。
   强制范围（如实）：这是代码里的硬拒绝（batch.approve、apply、review2 gate 三处）；登记簿本身由人维护。 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './mgload.mjs';

export const REGISTER = path.join(ROOT, 'docs', 'source-review-register.md');

/** 解析登记簿总表 → Map(identity → [{sr, status}])；仅 status 以 open 开头的算未解决。 */
export function parseHolds(text) {
  const holds = new Map(); let prev = null;
  for (const line of String(text).split('\n')) {
    const m = line.match(/^\|\s*(SR-\d+)\s*\|\s*([^|]*?)\s*\|[^|]*\|[^|]*\|\s*([^|]*?)\s*\|\s*$/); if (!m) continue;
    const [, sr, idCell, status] = m; let ident = (idCell.match(/`((?:node|edge):[^`]+)`/) || [])[1] || null;
    if (!ident && /^同上/.test(idCell)) ident = prev; if (ident) prev = ident;
    if (!ident || !/^open/i.test(status)) continue;
    if (!holds.has(ident)) holds.set(ident, []); holds.get(ident).push({ sr, status });
  }
  return holds;
}
export function openHolds(file = REGISTER) { return fs.existsSync(file) ? parseHolds(fs.readFileSync(file, 'utf8')) : new Map(); }
export const holdWhy = (holds, identity) => { const h = holds.get(identity); return h ? `源文复核搁置未解决：${h.map(x => x.sr).join('、')}（docs/source-review-register.md）` : null; };
