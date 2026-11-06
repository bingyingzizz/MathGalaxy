#!/usr/bin/env bun
/* ============================================================================
   install-hooks.mjs —— 把仓库里的 .githooks/ 挂到 git 上（core.hooksPath）

   为什么不用 .git/hooks：那里不进版本库，换台机器 / 重新克隆就丢了，
   而「提交前自动查过时数字」必须跟着仓库走。

   用法：bun tools/install-hooks.mjs
         bun tools/install-hooks.mjs --check    只看装没装
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const WANT = '.githooks';

/* git 不在 PATH（见 AGENTS.md §环境）→ 按「环境变量 → PATH → 常见位置」找 */
function findGit() {
  const candidates = [process.env.MG_GIT, 'git', 'H:/Git/cmd/git.exe', 'C:/Program Files/Git/cmd/git.exe'];
  for (const c of candidates) {
    if (!c) continue;
    if (spawnSync(c, ['--version'], { stdio: 'ignore' }).status === 0) return c;
  }
  return null;
}

const GIT = findGit();
if (!GIT) {
  console.error('✗ 找不到 git（设 MG_GIT=H:/Git/cmd/git.exe 之类指定）');
  process.exit(1);
}

const hookFile = path.join(ROOT, WANT, 'pre-commit');
if (!fs.existsSync(hookFile)) {
  console.error(`✗ ${WANT}/pre-commit 不存在 —— 这个脚本是给已有钩子装开关的`);
  process.exit(1);
}

const now = spawnSync(GIT, ['config', '--get', 'core.hooksPath'], { cwd: ROOT, encoding: 'utf8' });
const current = (now.stdout || '').trim();

if (process.argv.includes('--check')) {
  if (current === WANT) {
    console.log(`✓ 已安装：core.hooksPath = ${current}`);
    process.exit(0);
  }
  console.log(`✗ 没装：core.hooksPath = ${current || '（未设置，用 .git/hooks）'}`);
  process.exit(1);
}

if (current !== WANT) {
  const set = spawnSync(GIT, ['config', 'core.hooksPath', WANT], { cwd: ROOT, encoding: 'utf8' });
  if (set.status !== 0) {
    console.error(`✗ 设置失败：${(set.stderr || '').trim()}`);
    process.exit(1);
  }
  console.log(`✓ core.hooksPath = ${WANT}`);
} else {
  console.log(`✓ core.hooksPath 已经是 ${WANT}`);
}

const check = spawnSync(GIT, ['config', '--get', 'core.hooksPath'], { cwd: ROOT, encoding: 'utf8' });
console.log(`  验证：${(check.stdout || '').trim() || '(空)'}`);
console.log('  钩子：pre-commit → bun tools/doccheck.mjs（文档硬数字 vs dist/graph.json）');
console.log('  跳过：git commit --no-verify');
