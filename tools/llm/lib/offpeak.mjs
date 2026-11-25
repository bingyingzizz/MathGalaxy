/* 峰/谷时段（只读，仅供「建议何时手动运行」）。规则取自 pricing.json 的 peakUtc（官方：UTC 周一至周五 01–04、06–10；
   中国法定假日全天算谷，本函数不含假日表——假日只会让更多时段变谷，按峰值价预留永远偏保守）。不创建任何定时任务。 */
import { PRICING } from '../cost.mjs';

export function isPeak(date, spec = PRICING.peakUtc) {
  const d = date.getUTCDay(), h = date.getUTCHours();
  return spec.weekdays.includes(d) && spec.hours.some(([a, b]) => h >= a && h < b);
}
/** 从 from 起 hours 小时内，按本地时区列出连续的峰/谷区间。 */
export function windows({ from = new Date(), hours = 168, tz = Intl.DateTimeFormat().resolvedOptions().timeZone } = {}) {
  const start = new Date(Math.floor(from.getTime() / 3600000) * 3600000); const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const out = []; let cur = null;
  for (let i = 0; i < hours; i++) { const t = new Date(start.getTime() + i * 3600000); const peak = isPeak(t);
    if (!cur || cur.peak !== peak) { cur = { peak, from: fmt.format(t), fromUtc: t.toISOString(), to: null }; out.push(cur); } cur.to = fmt.format(new Date(t.getTime() + 3600000)); cur.toUtc = new Date(t.getTime() + 3600000).toISOString(); }
  return { tz, windows: out.map(w => ({ rate: w.peak ? 'PEAK' : 'off-peak (50%)', from: w.from, to: w.to, fromUtc: w.fromUtc, toUtc: w.toUtc })) };
}
