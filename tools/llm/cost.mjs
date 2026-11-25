/* 价格与用量折算。所有数值严格校验（有限、非负），畸形值直接拒绝，绝不当 0。
   估算 ≠ 实际 ≠ 供应商账单：
     · estimate：整请求 JSON 的 UTF-8 字节数当输入 token 数（字节数 ≥ 实际 token 数，对常见分词器偏保守，
       但**不是保证的上界**——所以实测 prompt_tokens 一旦超过估算，批处理立即停止并记录），
       输出按 max_tokens 满额，价格取峰值价、输入全按未命中；
     · actual：API 报告的 usage 折算（峰值价）。 */
import fs from 'node:fs';
import path from 'node:path';
import { finite } from './lib/util.mjs';

export const PRICING = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'pricing.json'), 'utf8'));
const PROTOCOL_OVERHEAD_TOKENS = 32;     // 每条 message 的角色/分隔等协议开销，再加每请求固定开销

export function priceOf(model, pricing = PRICING) {
  const p = pricing.models[model];
  if (!p) throw new Error(`未知模型 ${model}（pricing.json 没有它；不静默回退）`);
  for (const k of ['hit', 'miss', 'out']) finite(p[k], `pricing.${model}.${k}`, { min: 0 });
  return p;
}
export function estimateInputTokens(body) {
  const bytes = Buffer.byteLength(JSON.stringify(body), 'utf8');
  return bytes + PROTOCOL_OVERHEAD_TOKENS * (1 + (body.messages || []).length);
}
export function estimateUsd(body, pricing = PRICING) {
  const p = priceOf(body.model, pricing); const inTok = estimateInputTokens(body);
  finite(body.max_tokens, 'max_tokens', { min: 1, int: true });
  return { inTok, outTok: body.max_tokens, usd: (inTok * p.miss + body.max_tokens * p.out) / 1e6 };
}
/** 校验并折算 usage。prompt_tokens 必须等于 hit + miss（官方文档口径）；任何一项畸形都抛错。 */
export function actualUsd(model, usage, pricing = PRICING) {
  if (!usage || typeof usage !== 'object') throw new Error('usage 缺失');
  const p = priceOf(model, pricing);
  const pt = finite(usage.prompt_tokens, 'prompt_tokens', { int: true }), out = finite(usage.completion_tokens, 'completion_tokens', { int: true });
  const hit = usage.prompt_cache_hit_tokens == null ? 0 : finite(usage.prompt_cache_hit_tokens, 'prompt_cache_hit_tokens', { int: true });
  const miss = usage.prompt_cache_miss_tokens == null ? pt - hit : finite(usage.prompt_cache_miss_tokens, 'prompt_cache_miss_tokens', { int: true });
  if (hit + miss !== pt) throw new Error(`usage 不自洽：hit ${hit} + miss ${miss} ≠ prompt ${pt}`);
  return { usd: (hit * p.hit + miss * p.miss + out * p.out) / 1e6, tok: { hit, miss, out }, promptTokens: pt };
}

/** 缓存节省（峰值价口径）：命中的 token 若按未命中计价会多花多少。= hit × (miss − hit) / 1e6。 */
export function savingsOf(model, tok, pricing = PRICING) {
  const p = priceOf(model, pricing); const hit = finite(tok.hit, 'hit', { int: true });
  return hit * (p.miss - p.hit) / 1e6;
}
/** 同一用量若完全没有缓存命中的等价输入成本（峰值价）：prompt × miss + out × out。 */
export function uncachedEquivalentUsd(model, tok, pricing = PRICING) {
  const p = priceOf(model, pricing); return ((tok.hit + tok.miss) * p.miss + tok.out * p.out) / 1e6;
}
