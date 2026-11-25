/* 常设预算策略（budget-policy.json）。每日累计由 Billing 用全战役账本强制；单任务上限在开战役时检查。
   超出策略必须先请示用户：--above-policy 仅表示「用户已明确批准这次超出」，不是默认开关。 */
import fs from 'node:fs';
import path from 'node:path';
export const POLICY = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'budget-policy.json'), 'utf8'));
export function checkTaskCap(capUsd, aboveOk = false) {
  if (capUsd > POLICY.perTaskCapUsd + 1e-12 && !aboveOk) throw new Error(`--max-usd ${capUsd} 超过常设单任务上限 ${POLICY.perTaskCapUsd}：须先请示用户，获批后才可加 --above-policy`);
}
