#!/usr/bin/env bun
/* ==========================================================================
   MathGalaxy · 英文名回填（T1.1）
   --------------------------------------------------------------------------
   干什么：从**同一份源数据**（`src/data/aliases.js` 的 aka + 节点 title 括号里的
   英文）里，把「无歧义单一英文名」抽出来，生成两份东西：

     ① `src/data/i18n.js`     —— 英文名字段（title_en / label_en）的内容侧旁挂表，
                                  按 id 索引，运行时由 graph.js 挂到节点上。
     ② `i18n-gaps.md`         —— 填不了的清单（歧义 / 缩写 / 书号 / 哪儿都没有），
                                  交作者定夺。⛔ 这里一个名字都不猜。

   判定口径（**唯一真源就是这个文件**；build.mjs 直接 import 下面的函数复用，
   不另抄一份 —— 抄一份就会漂）：

     · 英文条目   = aka 里「无汉字 / 中文标点，且拉丁字母 ≥ 2」的那些
     · 书号       = Exercise 2.25 / Theorem 8.3.9 这种**搜索坐标**，不是名字
     · 名字样     = 多个词时至少一个是实词；单个词要「纯字母、有元音、
                    不是全大写、不是驼峰」（chain / field / ring / Tukey 进来，
                    sup / inf / wff / NBV / qcqs / kTop / AB4* / 公式 挡在外面）
     · 自动可填   = aka 里**恰好一条**名字样的英文条目
     · title_en   = title 括号里的英文**与那条一致**（互相包含）时用 title 的
                    （更正式，如「Axiom of Extensionality」）；
                    否则用 aka 的那条（更短，如「extensionality」）—— 不编。
     · label_en   = aka 的那条；超过 32 字符就不写（让它回落 title_en）

   幂等：同样的输入 ⇒ 逐字节相同的输出（`updated` 只在内容真变了时才动，
        和 build.mjs 的 meta.generated 是同一套路）。
   用法： bun tools/i18n-backfill.mjs
         bun tools/i18n-backfill.mjs --check    只检查有没有漂移，不写文件
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const SIDECAR = path.join(SRC, 'data', 'i18n.js');
const GAPS = path.join(ROOT, 'i18n-gaps.md');

/* ------------------------------------------------------------ 判定口径 */
export const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u3000-\u303f\u2018\u2019\u201c\u201d]/;
export const lat = (s) => (String(s).match(/[A-Za-z]/g) || []).length;
export const isEnglish = (s) => !!s && !CJK.test(s) && lat(s) >= 2;
/** ⛔ 书号 / 编号（Exercise 2.25、Theorem 8.3.9、Definition 5.2.5…）——
    它们是搜索用的坐标，不是名字。aliases.js 里这类条目有 200 多条。 */
export const refCode = (s) => /^\s*(exercise|problem|theorem|thm|definition|def|lemma|proposition|prop|corollary|cor|example|remark|chapter|section|part|table|figure|equation|eq|item)\b[\s.:§\d]*\s*$/i.test(String(s || ''));
/** 一个词是不是「像词」：正常的词（≥5 字母且不全大写），或小写实词；⛔ sup/inf/wff/MCT/a.e. 都不算 */
const wordish = (w) => {
  const letters = String(w).replace(/[^A-Za-z]/g, '');
  if (!letters) return false;
  if (letters.length >= 5 && letters !== letters.toUpperCase()) return true;
  return /[a-z]/.test(w) && letters.length >= 4 && !/\d/.test(w);
};
/** 单个词算不算英文名：只认「纯字母（允许变音符、连字符、撇号）」，
    要有元音、不是全大写、不是驼峰（kTop 这种排除）。 */
export const nameLike = (s) => {
  const t = String(s).trim();
  if (refCode(t)) return false;
  if (/\s/.test(t)) return t.split(/\s+/).some(wordish);
  if (!/^[A-Za-z\u00c0-\u024f'’-]+$/.test(t)) return false;
  const core = t.replace(/[^A-Za-z\u00c0-\u024f]/g, '');
  if (core.length < 4) return false;
  if (/[A-Z\u00c0-\u00dd]/.test(core.slice(1))) return false;      // 驼峰：kTop
  if (!/[a-z\u00e0-\u00ff]/.test(core)) return false;              // 全大写：NBV
  if (!/[aeiouy\u00e0-\u00fc]/.test(core.toLowerCase())) return false; // 没有元音：qcqs / wff
  return true;
};
/** 「干净」的英文标题：不含 LaTeX 残留与数学符号，字母占比够高 */
export const cleanTitle = (s) => {
  const t = String(s || '').trim();
  if (!t || CJK.test(t)) return false;
  if (/[\\{}$^_=<>]/.test(t)) return false;
  if (lat(t) < 2) return false;
  const dense = t.replace(/\s/g, '');
  if (lat(t) / Math.max(1, dense.length) < 0.6) return false;
  return /\s/.test(t) || lat(t) >= 5;
};
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
export const consistent = (a, b) => { const x = norm(a), y = norm(b); return !!(x && y && (x.includes(y) || y.includes(x))); };

/* ------------------------------------------------------------ 载入内容 */
export function loadMG() {
  const win = {
    MG: {}, console,
    document: { createElement: () => ({ getContext: () => ({}), width: 0, height: 0, addEventListener() {}, style: {} }), addEventListener() {}, getElementById: () => null },
    performance: { now: () => Date.now() }, requestAnimationFrame: () => 0, addEventListener() {},
  };
  win.window = win; win.self = win;
  const files = ['core/config.js', 'core/util.js', 'core/camera.js', 'core/graph.js', 'core/layout.js', 'core/layers.js',
    'data/regions.js', 'data/clusters.js', 'data/aliases.js', 'data/notation.js', 'data/xref.js'];
  const packDir = path.join(SRC, 'data', 'packs');
  fs.readdirSync(packDir).sort().forEach((f) => { if (f.endsWith('.js')) files.push('data/packs/' + f); });
  const ctx = vm.createContext(win);
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(SRC, rel), 'utf8'), ctx, { filename: rel });
  return win.MG;
}

/** 把每个节点按「能不能自动填」分桶。build.mjs 也调这个 —— 口径只有这一份。 */
export function bucketRows(MG, graph) {
  const akaById = Object.create(null);
  ((MG.aliases && MG.aliases.nodes) || []).forEach((r) => { if (r && r.id) akaById[r.id] = r.aka || []; });
  return graph.nodes.map((n) => {
    const aka = akaById[n.id] || [];
    const enAll = aka.filter(isEnglish);
    const refs = enAll.filter(refCode);                  // 书号：搜索用，不是名字
    const en = enAll.filter((x) => !refCode(x));
    const clean = en.filter(nameLike);
    const m = /[（(]([^（）()]{2,90})[）)]/.exec(String(n.title || ''));
    const titleEn = m && cleanTitle(m[1]) ? m[1].trim() : '';
    return { id: n.id, label: n.label, title: n.title, type: n.type, cluster: n.cluster || null, en, refs, clean, titleEn };
  });
}

/** 分桶结果 */
export function splitBuckets(rows) {
  const b = { auto: [], ambiguous: [], abbrev: [], refOnly: [], titleOnly: [], none: [] };
  rows.forEach((r) => {
    if (r.clean.length === 1) b.auto.push(r);
    else if (r.clean.length >= 2) b.ambiguous.push(r);
    else if (r.en.length >= 1) b.abbrev.push(r);
    else if (r.refs.length >= 1) b.refOnly.push(r);
    else if (r.titleEn) b.titleOnly.push(r);
    else b.none.push(r);
  });
  return b;
}

/** 一条自动条目：title_en 取更正式的那个（title 的英文本就是作者写的），label_en 取 aka */
export function entryOf(r) {
  const akaEn = r.clean[0];
  const titleOk = r.titleEn && consistent(akaEn, r.titleEn);
  const title_en = titleOk ? r.titleEn : akaEn;
  const label_en = akaEn.length <= 32 ? akaEn : null;
  return { title_en, label_en, from: titleOk ? 'title' : 'aka' };
}

/* ------------------------------------------------------------ 生成正文 */
export function sidecarText(auto, updated) {
  const L = [];
  L.push('/* ==========================================================================');
  L.push('   数学星图 · 英文名字段（title_en / label_en）');
  L.push('   --------------------------------------------------------------------------');
  L.push('   ⚠️ 这份文件由 `tools/i18n-backfill.mjs` 从**同一份源数据**生成：');
  L.push('      aka 来源 = src/data/aliases.js，正式名来源 = 各节点 title 的括号。');
  L.push('      ⛔ 别手抄第二份；要加名字请改 aliases.js / 节点 title，然后重跑：');
  L.push('          bun tools/i18n-backfill.mjs');
  L.push('      工具只采「aka 里恰好一条名字样英文」的节点（口径见那个脚本）。');
  L.push('      歧义 / 只有缩写 / 只有书号 / 哪儿都没有的，一个都没填 —— 清单在 i18n-gaps.md。');
  L.push('');
  L.push('   字段语义（消费方按这个回落）：');
  L.push('      title_en  正式英文名');
  L.push('      label_en  画布短标签；缺省 ⇒ 回落 title_en ⇒ 再回落中文 label');
  L.push('   挂载点：src/core/graph.js 建图时把这里的两条字段抄到节点上；');
  L.push('           graph.json / 搜索索引 / 概念页都从那两条字段读。');
  L.push('   ========================================================================== */');
  L.push('window.MG = window.MG || {};');
  L.push('');
  L.push('MG.i18n = {');
  L.push('  version: 1,');
  L.push("  generatedBy: 'tools/i18n-backfill.mjs',");
  L.push(`  updated: '${updated}',`);
  L.push('  nodes: {');
  auto.slice().sort((a, b) => (a.id < b.id ? -1 : 1)).forEach((r) => {
    const e = entryOf(r);
    const t = e.title_en.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const l = e.label_en == null ? 'null' : "'" + e.label_en.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
    L.push(`    '${r.id}': { title_en: '${t}', label_en: ${l} },`);
  });
  L.push('  }');
  L.push('};');
  L.push('');
  return L.join('\n');
}

export function gapsText(rows, b) {
  const g = [];
  g.push('# 英文名缺口清单（i18n-gaps）');
  g.push('');
  g.push('> 由 `bun tools/i18n-backfill.mjs` 从 `src/data/aliases.js` + 节点 `title` 现算。');
  g.push('> **这里一个名字都没猜过** —— 自动能定的已经写进 `src/data/i18n.js`，剩下的都在下面。');
  g.push('> 补法：把缺的英文名加到 `src/data/aliases.js` 的那条 aka 里，再重跑一次回填脚本。');
  g.push('');
  g.push('| 桶 | 节点数 | 意思 |');
  g.push('|---|---|---|');
  g.push(`| ✅ 已自动填入 | ${b.auto.length} | aka 里恰好一条名字样英文 |`);
  g.push(`| ⚠️ 歧义 | ${b.ambiguous.length} | aka 里有 ≥2 条英文写法，要你挑一个 |`);
  g.push(`| ⚠️ 只有缩写 | ${b.abbrev.length} | aka 里只有 AC / FOL / sup / MCT a.e. 这种缩写 |`);
  g.push(`| ⚠️ 只有书号 | ${b.refOnly.length} | aka 里只有 Exercise 2.25 / Theorem 8.3.9 这种坐标（搜索用，不是名字）|`);
  g.push(`| ⚠️ 只有 title 有 | ${b.titleOnly.length} | aka 没有英文，但 title 括号里是英文 |`);
  g.push(`| ⛔ 完全没有 | ${b.none.length} | aka 与 title 都没有英文名 |`);
  g.push(`| **合计** | **${rows.length}** | 覆盖 ${(100 * b.auto.length / rows.length).toFixed(1)}% |`);
  g.push('');
  g.push('---');
  g.push('');

  const tbl = (title, note, list, showCand, suggest) => {
    g.push(`## ${title}（${list.length}）`);
    g.push('');
    if (note) { g.push(note); g.push(''); }
    g.push('| 节点 id | 中文名 | ' + (showCand ? 'aka 里的英文' : '现状') + ' | ' + (suggest ? '建议（待你点头）' : '') + '|');
    g.push('|---|---|---|' + (suggest ? '---|' : ''));
    list.forEach((r) => {
      const cells = ['`' + r.id + '`', r.label];
      if (showCand) cells.push(r.en.map((x) => '`' + x + '`').join(' / '));
      else cells.push(r.title ? 'title: ' + String(r.title).slice(0, 40) : '—');
      if (suggest) cells.push(suggest(r) || '');
      g.push('| ' + cells.join(' | ') + ' |');
    });
    g.push('');
  };

  tbl('⚠️ 歧义：aka 有多个英文写法', 'aka 里 ≥2 条英文条目（书号已剔除），**一个都没自动采用**。',
    b.ambiguous, true, (r) => {
      if (!r.titleEn) return '';
      const hit = r.en.filter((x) => consistent(x, r.titleEn));
      return hit.length === 1 ? `**${r.titleEn}**（title 里就是它，可一键采用）` : `title 是「${r.titleEn}」—— 也对不上唯一一个`;
    });
  tbl('⚠️ 只有缩写', 'aka 里只有缩写样的一条（字母 < 6 或全大写，如 `AC` `FOL` `sup` `MCT a.e.`）——不足以当正式英文名。「建议」列是 title 里若有更完整的英文。', b.abbrev, true, (r) => (r.titleEn ? `**${r.titleEn}**` : ''));
  tbl('⚠️ 只有书号', 'aka 里只有习题/定理编号（`Exercise 2.25`、`Theorem 8.3.9`）—— 那是**搜索坐标**，不是英文名。「建议」列是它 title 括号里的英文（如果有）。', b.refOnly, false, (r) => (r.titleEn ? `**${r.titleEn}**` : ''));
  tbl('⚠️ 只有 title 有英文', 'aka 里没有英文，但 title 括号里是干净的英文；要我直接从 title 取就说一声。', b.titleOnly, false, (r) => `**${r.titleEn}**`);
  tbl('⛔ 完全没有英文名', 'aka 与 title 都没有 —— 这些要你起名字。', b.none, false, null);
  return g.join('\n');
}

/* ------------------------------------------------------------ 主流程 */
function main() {
  const MG = loadMG();
  const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
  const rows = bucketRows(MG, graph);
  const b = splitBuckets(rows);

  /* updated 只在内容真变了时才动 —— 和 build.mjs 的 meta.generated 同一套路 */
  let updated = new Date().toISOString().slice(0, 10);
  let body = sidecarText(b.auto, 'PLACEHOLDER');
  const key = (t) => t.split('\n').filter((l) => !/^\s*updated:/.test(l)).join('\n');
  if (fs.existsSync(SIDECAR)) {
    const prev = fs.readFileSync(SIDECAR, 'utf8');
    if (key(prev) === key(body)) {
      const m = /updated: '([^']+)'/.exec(prev);
      if (m) updated = m[1];
    }
  }
  body = sidecarText(b.auto, updated);
  const gaps = gapsText(rows, b);

  const checkOnly = process.argv.includes('--check');
  if (checkOnly) {
    const drift = [];
    const cur = fs.existsSync(SIDECAR) ? fs.readFileSync(SIDECAR, 'utf8') : '';
    const gapsCur = fs.existsSync(GAPS) ? fs.readFileSync(GAPS, 'utf8') : '';
    if (!cur) drift.push('src/data/i18n.js 不存在');
    else {
      b.auto.forEach((r) => {
        const e = entryOf(r);
        if (!cur.includes(`'${r.id}': {`)) drift.push('缺 ' + r.id);
        else if (!cur.includes(`title_en: '${e.title_en.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`)) drift.push(r.id + ' 的 title_en 与源不一致');
      });
    }
    if (gapsCur !== gaps) drift.push('i18n-gaps.md 过期');
    if (drift.length) {
      console.error('✗ 漂移 ' + drift.length + ' 处：' + drift.slice(0, 5).join('；') + '（跑 bun tools/i18n-backfill.mjs）');
      process.exit(1);
    }
    console.log(`✓ 英文名与源一致：自动 ${b.auto.length} 条；缺口 ${rows.length - b.auto.length} 条（i18n-gaps.md）`);
    return;
  }

  let wrote = 0;
  const prevSide = fs.existsSync(SIDECAR) ? fs.readFileSync(SIDECAR, 'utf8') : '';
  if (prevSide !== body) { fs.writeFileSync(SIDECAR, body, 'utf8'); wrote++; }
  const prevGaps = fs.existsSync(GAPS) ? fs.readFileSync(GAPS, 'utf8') : '';
  if (prevGaps !== gaps) { fs.writeFileSync(GAPS, gaps, 'utf8'); wrote++; }

  console.log(`节点 ${rows.length} 个：`);
  console.log(`  ✅ 自动填入 title_en/label_en ：${b.auto.length}  (${(100 * b.auto.length / rows.length).toFixed(1)}%)`);
  console.log(`  ⚠️ 歧义（≥2 条英文）        ：${b.ambiguous.length}`);
  console.log(`  ⚠️ 只有缩写                  ：${b.abbrev.length}`);
  console.log(`  ⚠️ 只有书号（不是名字）      ：${b.refOnly.length}` +
    `（其中 ${b.refOnly.filter((r) => r.titleEn).length} 个 title 里有干净英文 —— 可采用）`);
  console.log(`  ⚠️ 只有 title 有英文         ：${b.titleOnly.length}`);
  console.log(`  ⛔ 完全没有英文名            ：${b.none.length}`);
  console.log(`  → ${wrote} 个文件被更新（src/data/i18n.js · i18n-gaps.md）`);
}

if (import.meta.main) main();
