#!/usr/bin/env bun
/* ==========================================================================
   MathGalaxy · 英文名回填（T1.1）
   --------------------------------------------------------------------------
   干什么：从**同一份源数据**（`src/data/aliases.js` 的 aka + 节点 title）里，
   把「无歧义英文名」抽出来，生成三份东西：

     ① `src/data/i18n.js`        —— 英文名字段（title_en / label_en）的内容侧旁挂表，
                                    按 id 索引，运行时由 graph.js 挂到节点上。
     ② `i18n/second-tier.md`     —— **二级命中清单**：供快速扫读与整批回滚。
     ③ `i18n-gaps.md`            —— 填不了的清单，按星系分组、带候选集，交作者定夺。

   判定口径（**唯一真源就是这个文件**；build.mjs 直接 import 下面的函数复用，
   不另抄一份 —— 抄一份就会漂）：

     · 英文条目   = aka 里「无汉字 / 中文标点，且拉丁字母 ≥ 2」的那些
     · 书号       = Exercise 2.25 / Theorem 8.3.9 这种**搜索坐标**，不是名字
     · 名字样     = 多个词时至少一个是实词；单个词要「纯字母、有元音、
                    不是全大写、不是驼峰」（chain / field / ring / Tukey 进来，
                    sup / inf / wff / NBV / qcqs / kTop / AB4* / 公式 挡在外面）

   ── 一级（作者 2026-10-16 之前的既定口径）──────────────────────────────
     · 自动可填   = aka 里**恰好一条**名字样的英文条目
     · title_en   = title 括号里的英文**与那条一致**（互相包含）时用 title 的
                    （更正式，如「Axiom of Extensionality」）；
                    否则用 aka 的那条（更短，如「extensionality」）—— 不编。
     · label_en   = aka 的那条；超过 32 字符就不写（让它回落 title_en）

   ── 二级（作者 2026-10-16 拍板，护栏三条）────────────────────────────
     规则：候选 = 该节点 aka 里**名字样**的英文条目（一级那道 nameLike 闸门；
                 ⛔ 书号这类坐标本来就不是候选）—— 二级的用处是**消歧**，
                 只有在「≥2 个候选」时才有意义，所以候选集与一级完全同源；
           匹配 = **大小写不敏感 + 词边界精确匹配**，**只扫 title**；
                 ⛔ 不做子串、不做词形还原、不做其它归一化；
                 ⛔ 匹配范围不许扩大到 label / statement；
           命中候选数 **恰好为 1** 才采用（零命中 / 多命中 ⇒ gaps）；
           值取 **aka 源字符串**（不改大小写、不改写法）。
     ⛔ 二级之外一律 gaps，**不许链式放大**（例如「title 匹配不上再去 statement 里找」）。
     ⭐ 为什么不算猜：命中的那个写法是**作者自己写在 title 里的**，规则只是把它读出来。
     ⚠️ 候选集若按字面取「全部英文条目」（含缩写 / 符号），会多出 4 条 ——
        `kC(X,Y)`（是个记号不是名字）、`NBV`、`AB6`、`qcqs`。既然二级是消歧规则，
        这里取名字样的那套；那 4 条留在 gaps 里，要收进来说一声就行。

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
const TIER2 = path.join(ROOT, 'i18n', 'second-tier.md');

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

/* ⭐⭐ 二级唯一的匹配法：大小写不敏感 + 词边界精确匹配。
   ⚠️ `\b` 只能加在「候选那端本身是词字符」的地方：`MCT a.e.` 尾巴是 `.`，
      硬加 `\b` 会要求后面还有词字符 ⇒ 永远匹配不上（这是唯一容易写错的地方）。 */
export const wordHitRe = (c) => {
  const esc = String(c).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const lead = /^[A-Za-z0-9_]/.test(c) ? '\\b' : '';
  const trail = /[A-Za-z0-9_]$/.test(c) ? '\\b' : '';
  return new RegExp(lead + esc + trail, 'i');
};
/** title 里实际写的那个形式（原样，不改大小写） */
export const titleFormOf = (title, cand) => {
  const m = wordHitRe(cand).exec(String(title || ''));
  return m ? m[0] : '';
};

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
    return {
      id: n.id, label: n.label, title: n.title, type: n.type, cluster: n.cluster || null,
      regions: (n.regions || []).slice(), en, refs, clean, titleEn,
    };
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

/** 一条一级条目：title_en 取更正式的那个（title 的英文本就是作者写的），label_en 取 aka */
export function entryOf(r) {
  const akaEn = r.clean[0];
  const titleOk = r.titleEn && consistent(akaEn, r.titleEn);
  const title_en = titleOk ? r.titleEn : akaEn;
  const label_en = akaEn.length <= 32 ? akaEn : null;
  return { title_en, label_en, from: titleOk ? 'title' : 'aka' };
}

/* --------------------------------------------------------- 二级：title 定名 */
/** ⭐ 二级判定。返回采用的 aka 源字符串；不满足「恰好命中一个候选」⇒ null。
    ⛔ 一级已经拿走的节点不再进二级（避免两条规则打架）。
    ⭐ 候选集 = 名字样的英文条目（`r.clean`）：二级是**消歧**规则，
       「只有一个候选」的场合（缩写桶）本来就没有歧义可消；
       而且放过缩写会让 `kC(X,Y)` 这种记号变成「英文名」。 */
export function tier2Of(r) {
  if (r.clean.length === 1) return null;
  const cands = r.clean;                    // 候选 = aka 里名字样的英文条目
  if (!cands.length) return null;
  const hit = cands.filter((c) => wordHitRe(c).test(String(r.title || '')));
  return hit.length === 1 ? hit[0] : null;
}
/** 二级条目 */
export const tier2Entry = (cand) => ({
  title_en: cand,
  label_en: cand.length <= 32 ? cand : null,
  from: 'aka-title',
});
/** 缺口的原因（给人补数据用） */
export function gapWhy(r) {
  if (!r.en.length) return r.refs.length ? '无候选（aka 里只有书号）' : (r.titleEn ? '无候选（aka 没英文，title 里有）' : '无候选（aka 与 title 都没有英文）');
  const hit = r.en.filter((c) => wordHitRe(c).test(String(r.title || '')));
  if (hit.length >= 2) return '多命中：' + hit.map((h) => '`' + h + '`').join(' / ');
  if (r.clean.length >= 2) return '零命中（aka 有 ' + r.clean.length + ' 条候选，title 里一条都没出现）';
  return '零命中（候选没出现在 title 里）';
}

/** 「备注」列：只写**机械看得出来**的事实，不猜。 */
export function remarkOf(r, cand) {
  const out = [];
  if (/[／/]/.test(String(r.label || ''))) out.push('节点含两个概念，命中的只是一个');
  const letters = String(cand).replace(/[^A-Za-z]/g, '');
  if (letters && new RegExp('\\\\' + letters + '\\b').test(String(r.title || ''))) {
    out.push('title 里是 LaTeX 符号 `\\' + letters + '`');
  }
  return out.join('；');
}

/** 一二级合起来的结果 */
export function decide(rows, b) {
  const t1 = b.auto.map((r) => ({ r, e: entryOf(r) }));
  const t2 = [];
  const gaps = [];
  for (const r of rows) {
    if (r.clean.length === 1) continue;            // 一级
    const cand = tier2Of(r);
    if (cand) t2.push({ r, e: tier2Entry(cand), cand, form: titleFormOf(r.title, cand) });
    else gaps.push(r);
  }
  return { t1, t2, gaps };
}

/** 只记录、不自动改的两类差异 + 跨节点重复检测 */
export function checksOf(all) {
  const dup = new Map();
  all.forEach(({ r, e }) => {
    const k = norm(e.title_en);
    if (!k) return;
    if (!dup.has(k)) dup.set(k, []);
    dup.get(k).push({ id: r.id, label: r.label, en: e.title_en });
  });
  const dups = [...dup.values()].filter((v) => v.length > 1);
  const t2 = all.filter((x) => x.e.from === 'aka-title');
  const caseDiff = t2.filter(({ cand, form }) => form && form !== cand && form.toLowerCase() === cand.toLowerCase());
  const shapeDiff = t2.filter(({ r, cand }) => r.titleEn && consistent(cand, r.titleEn) && norm(r.titleEn) !== norm(cand));
  return { dups, caseDiff, shapeDiff };
}

/* ------------------------------------------------------------ 生成正文 */
export function sidecarText(entries, updated) {
  const L = [];
  L.push('/* ==========================================================================');
  L.push('   数学星图 · 英文名字段（title_en / label_en）');
  L.push('   --------------------------------------------------------------------------');
  L.push('   ⚠️ 这份文件由 `tools/i18n-backfill.mjs` 从**同一份源数据**生成：');
  L.push('      aka 来源 = src/data/aliases.js，正式名来源 = 各节点 title。');
  L.push('      ⛔ 别手抄第二份；要加名字请改 aliases.js / 节点 title，然后重跑：');
  L.push('          bun tools/i18n-backfill.mjs');
  L.push('      口径（两级，见那个脚本的抬头）——');
  L.push('        一级 from: aka / title         = aka 里恰好一条名字样英文；');
  L.push('        二级 from: aka-title           = title 里恰好命中一个 aka 候选');
  L.push('                                        （大小写不敏感 + 词边界，只扫 title）。');
  L.push('      歧义 / 只有缩写 / 只有书号 / 哪儿都没有的，一个都没填 ——');
  L.push('      清单在 i18n-gaps.md，二级命中另有一份 i18n/second-tier.md（可整批回滚）。');
  L.push('');
  L.push('   字段语义（消费方按这个回落）：');
  L.push('      title_en  正式英文名');
  L.push('      label_en  画布短标签；缺省 ⇒ 回落 title_en ⇒ 再回落中文 label');
  L.push('      from      这名字从哪来（aka / title / aka-title）—— 只给人看，消费方不看');
  L.push('   挂载点：src/core/graph.js 建图时把这里的两条字段抄到节点上；');
  L.push('           graph.json / 搜索索引 / 概念页都从那两条字段读。');
  L.push('   ========================================================================== */');
  L.push('window.MG = window.MG || {};');
  L.push('');
  L.push('MG.i18n = {');
  L.push('  version: 2,');
  L.push("  generatedBy: 'tools/i18n-backfill.mjs',");
  L.push(`  updated: '${updated}',`);
  L.push('  nodes: {');
  const q = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  entries.slice().sort((a, b) => (a.id < b.id ? -1 : 1)).forEach((x) => {
    const l = x.label_en == null ? 'null' : "'" + q(x.label_en) + "'";
    L.push(`    '${x.id}': { title_en: '${q(x.title_en)}', label_en: ${l}, from: '${x.from}' },`);
  });
  L.push('  }');
  L.push('};');
  L.push('');
  return L.join('\n');
}

/** 二级命中清单：扫读 + 整批回滚用 */
export function secondTierText(t2, checks, nAll) {
  const g = [];
  g.push('# 二级命中清单（title 定下来的英文名）');
  g.push('');
  g.push(`> 由 \`bun tools/i18n-backfill.mjs\` 现算，共 **${t2.length}** 条（占全部 ${nAll} 个节点）。`);
  g.push('> 规则（作者 2026-10-16 拍板）：候选 = 该节点 aka 里**名字样**的英文条目；');
  g.push('> 匹配 = **大小写不敏感 + 词边界精确匹配**，**只扫 title**；恰好命中一个才采用；');
  g.push('> 值取 **aka 源字符串**。⛔ 不做子串、不做词形还原、不扩大到 label / statement。');
  g.push('> 这不是猜：命中的那个写法是作者自己写在 title 里的。');
  g.push('> ⚠️ 二级是**消歧**规则 —— 候选集与一级同源（同一道 nameLike 闸门），');
  g.push('> 只有缩写当候选那 4 条（`kC(X,Y)` / `NBV` / `AB6` / `qcqs`）没收进来，它们留在 gaps 里。');
  g.push('');
  g.push('**整批回滚**：把下表里的 id 从 `src/data/i18n.js` 删掉再重跑构建即可；');
  g.push('要永久排除就改 `src/data/aliases.js` 的 aka 或节点 title（它们是唯一真源）。');
  g.push('');
  g.push('| # | 节点 id | 中文名 | 采用（aka 源字符串） | title 里的写法 | 备注 | title |');
  g.push('|---|---|---|---|---|---|---|');
  t2.forEach(({ r, cand, form }, i) => {
    const flag = form !== cand ? ' ⚠️' : '';
    g.push(`| ${i + 1} | \`${r.id}\` | ${r.label} | \`${cand}\` | ${form ? '`' + form + '`' + flag : '—'} | ${remarkOf(r, cand) || ''} | ${String(r.title || '').replace(/\|/g, '\\|').slice(0, 70)} |`);
  });
  g.push('');
  g.push('「备注」列只写机械看得出来的事实（节点含两个概念 / title 里是 LaTeX 符号），不猜。');
  g.push('---');
  g.push('');
  g.push(`## ⚠️ 跨节点重复的 title_en（${checks.dups.length} 组，只记录、不自动改）`);
  g.push('');
  if (!checks.dups.length) g.push('（无）');
  else {
    g.push('| 英文名 | 用在哪些节点 |');
    g.push('|---|---|');
    checks.dups.forEach((v) => g.push(`| \`${v[0].en}\` | ${v.map((x) => '`' + x.id + '`（' + x.label + '）').join(' · ')} |`));
  }
  g.push('');
  g.push(`## 大小写差异（${checks.caseDiff.length} 处，只记录）`);
  g.push('');
  g.push('aka 里写作一种大小写、title 里写作另一种 —— 采用的一律是 **aka 源字符串**。');
  g.push('');
  if (!checks.caseDiff.length) g.push('（无）');
  else {
    g.push('| 节点 id | aka 源字符串（采用） | title 里的写法 |');
    g.push('|---|---|---|');
    checks.caseDiff.forEach(({ r, cand, form }) => g.push(`| \`${r.id}\` | \`${cand}\` | \`${form}\` |`));
  }
  g.push('');
  g.push(`## 形差：title 里有更长的英文写法（${checks.shapeDiff.length} 处，只记录）`);
  g.push('');
  g.push('title 括号里的英文与采用的名字「互相包含」（如 aka `limit` / title `Limit of a Sequence`）。');
  g.push('按护栏**值取 aka 源字符串**，所以这里不改 —— 要改成 title 那种更正式的写法请说一声。');
  g.push('');
  if (!checks.shapeDiff.length) g.push('（无）');
  else {
    g.push('| 节点 id | 采用（aka） | title 里更长的写法 |');
    g.push('|---|---|---|');
    checks.shapeDiff.forEach(({ r, cand }) => g.push(`| \`${r.id}\` | \`${cand}\` | ${r.titleEn} |`));
  }
  g.push('');
  return g.join('\n');
}

export function gapsText(rows, b, dec, regionName) {
  const g = [];
  const t1 = dec.t1.length, t2 = dec.t2.length;
  g.push('# 英文名缺口清单（i18n-gaps）');
  g.push('');
  g.push('> 由 `bun tools/i18n-backfill.mjs` 从 `src/data/aliases.js` + 节点 `title` 现算。');
  g.push('> **这里一个名字都没猜过** —— 能机械定的已经写进 `src/data/i18n.js`，剩下的都在下面。');
  g.push('> 补法：把缺的英文名加到 `src/data/aliases.js` 的那条 aka 里，再重跑一次回填脚本。');
  g.push('');
  g.push('| 桶 | 节点数 | 意思 |');
  g.push('|---|---|---|');
  g.push(`| ✅ 一级填入（from: aka / title） | ${t1} | aka 里恰好一条名字样英文 |`);
  g.push(`| ✅ 二级填入（from: aka-title） | ${t2} | title 里恰好命中一个 aka 候选 —— 见 \`i18n/second-tier.md\` |`);
  g.push(`| ⚠️ 歧义 | ${b.ambiguous.length} | aka 里有 ≥2 条英文写法，谁也没在 title 里出现 |`);
  g.push(`| ⚠️ 只有缩写 | ${b.abbrev.length} | aka 里只有 AC / FOL / sup / MCT a.e. 这种缩写 |`);
  g.push(`| ⚠️ 只有书号 | ${b.refOnly.length} | aka 里只有 Exercise 2.25 / Theorem 8.3.9 这种坐标（搜索用，不是名字）|`);
  g.push(`| ⚠️ 只有 title 有 | ${b.titleOnly.length} | aka 没有英文，但 title 括号里是英文 |`);
  g.push(`| ⛔ 完全没有 | ${b.none.length} | aka 与 title 都没有英文名 |`);
  g.push(`| **合计** | **${rows.length}** | 覆盖 ${t1 + t2}（${(100 * (t1 + t2) / rows.length).toFixed(1)}%），缺口 ${dec.gaps.length} |`);
  g.push('');
  g.push('---');
  g.push('');
  g.push(`## 缺口按星系分组（${dec.gaps.length}）`);
  g.push('');
  g.push('每行都带上候选集，方便照着 `aliases.js` 补。同一节点属多个星系时只列在第一个里。');
  g.push('');
  const byRegion = new Map();
  for (const r of dec.gaps) {
    const key = (r.regions && r.regions[0]) || '(未分星系)';
    if (!byRegion.has(key)) byRegion.set(key, []);
    byRegion.get(key).push(r);
  }
  for (const [rid, list] of byRegion) {
    g.push(`### ${regionName(rid)} · \`${rid}\`（${list.length}）`);
    g.push('');
    g.push('| 节点 id | 中文名 | aka 候选（英文） | title | 为什么填不了 |');
    g.push('|---|---|---|---|---|');
    list.forEach((r) => {
      const cand = r.en.length ? r.en.map((x) => '`' + x + '`').join(' / ') : (r.refs.length ? '（只有书号：' + r.refs.slice(0, 2).map((x) => '`' + x + '`').join(' / ') + '）' : '—');
      g.push(`| \`${r.id}\` | ${r.label} | ${cand} | ${String(r.title || '').replace(/\|/g, '\\|').slice(0, 60)} | ${gapWhy(r)} |`);
    });
    g.push('');
  }
  return g.join('\n');
}

/* ------------------------------------------------------------ 主流程 */
function main() {
  const MG = loadMG();
  const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
  const rows = bucketRows(MG, graph);
  const b = splitBuckets(rows);
  const dec = decide(rows, b);
  const all = dec.t1.concat(dec.t2);
  const checks = checksOf(all);
  const entries = all.map(({ r, e }) => ({ id: r.id, title_en: e.title_en, label_en: e.label_en, from: e.from }));
  const regionName = (rid) => {
    const R = (MG.regions || []).find((x) => x.id === rid);
    return R ? R.name : rid;
  };

  /* updated 只在内容真变了时才动 —— 和 build.mjs 的 meta.generated 同一套路 */
  let updated = new Date().toISOString().slice(0, 10);
  const key = (t) => t.split('\n').filter((l) => !/^\s*updated:/.test(l)).join('\n');
  if (fs.existsSync(SIDECAR)) {
    const prev = fs.readFileSync(SIDECAR, 'utf8');
    if (key(prev) === key(sidecarText(entries, 'PLACEHOLDER'))) {
      const m = /updated: '([^']+)'/.exec(prev);
      if (m) updated = m[1];
    }
  }
  const body = sidecarText(entries, updated);
  const gaps = gapsText(rows, b, dec, regionName);
  const t2txt = secondTierText(dec.t2, checks, rows.length);

  const checkOnly = process.argv.includes('--check');
  if (checkOnly) {
    const drift = [];
    const cur = fs.existsSync(SIDECAR) ? fs.readFileSync(SIDECAR, 'utf8') : '';
    const gapsCur = fs.existsSync(GAPS) ? fs.readFileSync(GAPS, 'utf8') : '';
    const t2Cur = fs.existsSync(TIER2) ? fs.readFileSync(TIER2, 'utf8') : '';
    if (!cur) drift.push('src/data/i18n.js 不存在');
    else if (key(cur) !== key(body)) drift.push('src/data/i18n.js 与源不一致');
    if (gapsCur !== gaps) drift.push('i18n-gaps.md 过期');
    if (t2Cur !== t2txt) drift.push('i18n/second-tier.md 过期');
    if (drift.length) {
      console.error('✗ 漂移 ' + drift.length + ' 处：' + drift.slice(0, 5).join('；') + '（跑 bun tools/i18n-backfill.mjs）');
      process.exit(1);
    }
    console.log(`✓ 英文名与源一致：一级 ${dec.t1.length} + 二级 ${dec.t2.length} = ${entries.length}` +
      `（覆盖 ${(100 * entries.length / rows.length).toFixed(1)}%）· 缺口 ${dec.gaps.length}`);
    return;
  }

  let wrote = 0;
  const files = [[SIDECAR, body], [GAPS, gaps], [TIER2, t2txt]];
  for (const [p, txt] of files) {
    const prev = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
    if (prev !== txt) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, txt, 'utf8'); wrote++; }
  }

  const pct = (x) => (100 * x / rows.length).toFixed(1) + '%';
  console.log(`节点 ${rows.length} 个：`);
  console.log(`  ✅ 一级 title_en/label_en：${dec.t1.length}  (${pct(dec.t1.length)})`);
  console.log(`  ✅ 二级（title 定名）    ：${dec.t2.length}  (${pct(dec.t2.length)})` +
    `  —— 其中大小写与 aka 不同的 ${checks.caseDiff.length} 处`);
  console.log(`  ⇒ 英文名覆盖 ${entries.length} / ${rows.length} = ${pct(entries.length)}`);
  console.log(`  ⚠️ 歧义 ${b.ambiguous.length} · 只有缩写 ${b.abbrev.length} · 只有书号 ${b.refOnly.length}` +
    ` · 只有 title ${b.titleOnly.length} · 完全没有 ${b.none.length}  ⇒ 缺口合计 ${dec.gaps.length}`);
  console.log(`  🔎 跨节点重复 title_en：${checks.dups.length} 组 · title 里有更长英文写法：${checks.shapeDiff.length} 处（只记录）`);
  console.log(`  → ${wrote} 个文件被更新（src/data/i18n.js · i18n-gaps.md · i18n/second-tier.md）`);
}

if (import.meta.main) main();
