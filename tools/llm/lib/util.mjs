import crypto from 'node:crypto';
export const sha256 = s => crypto.createHash('sha256').update(s).digest('hex');
/** 规范化 JSON：键排序，保证同一载荷得同一哈希 */
export function canon(v) {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  return JSON.stringify(v);
}
export const hashOf = v => sha256(canon(v));
/** 把可能出现的密钥从任何字符串里抹掉 */
export function redact(s, key = process.env.DEEPSEEK_API_KEY) {
  s = String(s);
  if (key && key.length >= 6) s = s.split(key).join('[REDACTED]');
  return s.replace(/sk-[A-Za-z0-9_-]{8,}/g, '[REDACTED]').replace(/Bearer\s+[A-Za-z0-9._-]{8,}/gi, 'Bearer [REDACTED]');
}
export const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---- 严格数值校验：拒绝 NaN / Infinity / 负数 / 非数字，绝不「当作 0」 */
export class BadNumber extends Error {}
export function finite(x, name, { min = 0, max = Infinity, int = false } = {}) {
  if (typeof x !== 'number' || !Number.isFinite(x)) throw new BadNumber(`${name} 不是有限数：${String(x)}`);
  if (x < min || x > max) throw new BadNumber(`${name} 超出范围 [${min}, ${max}]：${x}`);
  if (int && !Number.isInteger(x)) throw new BadNumber(`${name} 必须是整数：${x}`);
  return x;
}
