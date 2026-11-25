/* 适配器注册表。每个适配器导出：id/OP/PROMPT_VERSION/SYSTEM/review/target/cfgHash/modeOf/collect/parse/assemble（+ validateExtra）。
   UI 文案与英文文档（docs.en.js）刻意没有适配器：它们走现有的本地化机制，不进 LLM 流水线。 */
import * as nodeText from './node-text.mjs';
import * as abstract from './abstract.mjs';
import * as edgeText from './edge-text.mjs';
import * as proof from './proof.mjs';

export const ADAPTERS = { 'node-text': nodeText, abstract, 'edge-text': edgeText, proof };
export const ADAPTER_IDS = Object.keys(ADAPTERS);
