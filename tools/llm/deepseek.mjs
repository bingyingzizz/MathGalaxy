/* DeepSeek 客户端（直连官方端点，零依赖）。密钥**只**从环境变量 DEEPSEEK_API_KEY 读，任何输出都抹掉。
   · 同一个 buildBody() 的产物同时用于：缓存哈希、成本估算、真正发送 —— 三者不可能漂移。
   · 可选参数白名单（仅 temperature）；model/messages/max_tokens/thinking/stream/response_format 受保护，传入即拒。
   · 不静默换模型；响应必须完整（finish_reason=stop、内容非空、usage 合法）。transport 可注入（测试用 mock）。 */
import { redact, sleep, finite } from './lib/util.mjs';
import { PRICING } from './cost.mjs';
export { PRICING };

const PROTECTED = ['model', 'messages', 'max_tokens', 'thinking', 'stream', 'response_format', 'reasoning_effort', 'tools', 'tool_choice', 'n'];
const ALLOWED_PARAMS = { temperature: v => finite(v, 'temperature', { min: 0, max: 1 }) };

export class ApiError extends Error {
  constructor(msg, { status = 0, retryable = false, maybeBilled = false } = {}) {
    super(redact(msg)); this.status = status; this.retryable = retryable; this.maybeBilled = maybeBilled;
  }
}

/** 唯一的请求体构造器。 */
export function buildBody({ model, messages, maxTokens, params = {}, thinking = false }) {
  if (typeof model !== 'string' || !PRICING.models[model]) throw new Error(`未知模型 ${model}（pricing.json 里没有；不静默回退）`);
  if (!Array.isArray(messages) || !messages.length || messages.some(m => !m || typeof m.content !== 'string' || !['system', 'user', 'assistant'].includes(m.role))) throw new Error('messages 非法');
  finite(maxTokens, 'max_tokens', { min: 1, max: 65536, int: true });
  const extra = {};
  for (const [k, v] of Object.entries(params)) {
    if (PROTECTED.includes(k)) throw new Error(`参数 ${k} 受保护，不可覆盖`);
    if (!ALLOWED_PARAMS[k]) throw new Error(`参数 ${k} 不在白名单（仅允许：${Object.keys(ALLOWED_PARAMS).join(',')}）`);
    extra[k] = ALLOWED_PARAMS[k](v);
  }
  if (thinking !== false && thinking !== true) throw new Error('thinking 必须是布尔值');
  // 思考开：官方文档——思考模式下 temperature 等采样参数无效，故不发；max_tokens 是否含推理 token 文档未明示，预留仍按 max_tokens 满额计，实测 completion_tokens 超过 max_tokens 立即停。
  return thinking
    ? { model, messages, max_tokens: maxTokens, stream: false, response_format: { type: 'json_object' }, thinking: { type: 'enabled' } }
    : { model, messages, max_tokens: maxTokens, stream: false, response_format: { type: 'json_object' }, ...PRICING.nonThinking, temperature: 0, ...extra };
}

/** 真实传输。返回 {status, json}。网络层异常 → ApiError(retryable, maybeBilled)。 */
export function httpTransport({ timeoutMs }) {
  finite(timeoutMs, 'timeoutMs', { min: 1000, max: 600000 });
  return async (body) => {
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) throw new ApiError('DEEPSEEK_API_KEY 未设置', { retryable: false });
    const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeoutMs);
    try {
      const res = await fetch(PRICING.endpoint, { method: 'POST', signal: ac.signal,
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key }, body: JSON.stringify(body) });
      const text = await res.text(); let json = null;
      try { json = JSON.parse(text); } catch { /* 留给上层判无效 */ }
      return { status: res.status, json };
    } catch (e) {   // 超时 / 断连：请求可能已到达并计费
      throw new ApiError('网络/超时：' + (e && e.name), { retryable: true, maybeBilled: true });
    } finally { clearTimeout(t); }
  };
}

/** 一次逻辑调用 = 至多 maxRetries+1 次尝试；每次尝试都经 hooks 与账本交互（先预留后派发）。
    hooks: { beforeAttempt() → handle|null, afterAttempt(handle, kind, data) }，kind ∈ ok | notsent | unknown */
export async function chat({ body, transport, maxRetries = 2, backoffMs = 800, hooks }) {
  let last;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const h = hooks.beforeAttempt();
    if (!h) throw new ApiError('预算不足：停止派发', { retryable: false, status: -1 });
    let r;
    try { r = await transport(body); }
    catch (e) {
      hooks.afterAttempt(h, e.maybeBilled ? 'unknown' : 'notsent', null);
      last = e; if (!e.retryable || attempt === maxRetries) throw e;
      await sleep(backoffMs * 2 ** attempt * (0.5 + Math.random())); continue;
    }
    const { status, json } = r;
    if (status === 200) {
      const c = json && Array.isArray(json.choices) ? json.choices[0] : null;
      const content = c && c.message ? c.message.content : null;
      // 200 但整体畸形：请求已执行，按「用量未知」处理；usage 合法时仍按实际结算（交给 afterAttempt 校验）
      hooks.afterAttempt(h, json && json.usage ? 'ok' : 'unknown', json && json.usage);
      if (!json || !json.usage) { last = new ApiError('200 响应缺少 usage', { status, retryable: false, maybeBilled: true }); throw last; }
      return { content: typeof content === 'string' ? content : null, finish: c ? c.finish_reason : null, usage: json.usage, respModel: json.model || null };
    }
    const retryable = PRICING.retryableStatus.includes(status);
    // 429 / 4xx：服务端没跑推理，一般不计费 → notsent；5xx / 408 / 504：保守按「可能计费」
    hooks.afterAttempt(h, (status === 429 || (status >= 400 && status < 500 && status !== 408)) ? 'notsent' : 'unknown', null);
    last = new ApiError(`HTTP ${status}${json && json.error ? ' ' + (json.error.message || '') : ''}`, { status, retryable });
    if (!retryable || attempt === maxRetries) throw last;
    await sleep(backoffMs * 2 ** attempt * (0.5 + Math.random()));
  }
  throw last;
}
