#!/usr/bin/env bun
/* 离线自测入口（mock 传输，不需要密钥，零计费）：bun tools/llm/selftest.mjs
   覆盖：预算（持久/并发/恢复/未知用量）、API 参数与响应、锁与结果库、身份与术语、证明、校验启发式、批准与回写、导出。
   结束时核对「生产资产没被改」（packs / i18n 旁挂 / dist / 渲染代码的哈希前后一致），并按显式路径删除临时目录。 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib/mgload.mjs';
import { sha256 } from './lib/util.mjs';
import { setupTmp, cleanupTmp, R, t, eq } from './test/h.mjs';
import { budgetAndApi, lockAndStore } from './test/core.test.mjs';
import { identityAndGlossary, validation, pipelineAndWriteback } from './test/content.test.mjs';
import { cacheAware } from './test/cache.test.mjs';
import { validatorRefinement, backtickConvention } from './test/refine.test.mjs';
import { benchAndReview, benchCompliance, closeoutPieces, budgetPolicy, holdPrecedence } from './test/bench.test.mjs';

const walk = p => !fs.existsSync(p) ? [] : fs.statSync(p).isDirectory() ? fs.readdirSync(p).flatMap(n => walk(path.join(p, n))) : [p];
const guard = () => { const h = {}; for (const d of ['src', 'dist', 'tools/perfguard.mjs', 'tools/searchcheck.mjs', 'tools/build.mjs']) for (const f of walk(path.join(ROOT, d))) h[f] = sha256(fs.readFileSync(f)); return h; };

setupTmp(); const before = guard();
try {
  await budgetAndApi(); await lockAndStore(); await identityAndGlossary(); await validation(); await pipelineAndWriteback(); await cacheAware(); await validatorRefinement(); await backtickConvention(); await benchAndReview(); await benchCompliance(); await closeoutPieces(); await budgetPolicy(); await holdPrecedence();
  console.log('生产资产');
  await t('测试前后：src/ dist/（含 packs、渲染、旁挂）与搜索/性能/构建门的文件哈希完全不变', async () => { const after = guard(); eq(Object.keys(after).length, Object.keys(before).length); for (const [f, h] of Object.entries(before)) if (after[f] !== h) throw new Error('被改动：' + f); });
} finally { cleanupTmp(); }
console.log(`\n${R.fail ? '✗' : '✓'} ${R.pass} 通过 / ${R.fail} 失败${R.fail ? '：' + R.failed.join('；') : ''}`);
process.exit(R.fail ? 1 : 0);
