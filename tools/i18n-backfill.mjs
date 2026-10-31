#!/usr/bin/env bun
/* ==========================================================================
   MathGalaxy · 英文名回填（T1.1）
   --------------------------------------------------------------------------
   干什么：从**同一份源数据**（`src/data/aliases.js` 的 aka + 节点 title）里，
   把「无歧义英文名」抽出来，生成三份东西：

     ① `src/data/i18n.js`        —— 英文名字段（title_en / label_en）的内容侧旁挂表，
                                    按 id 索引，运行时由 graph.js 挂到节点上。
     ② `i18n/second-tier.md`     —— **二级命中清单**：供快速扫读与整批回滚。
     ③ `i18n/gaps.md`            —— 填不了的清单，按星系分组、带候选集，交作者定夺。

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
const GAPS = path.join(ROOT, 'i18n', 'gaps.md');
const TIER2 = path.join(ROOT, 'i18n', 'second-tier.md');

/* ------------------------------------------------------------ 判定口径 */
export const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\u3000-\u303f\u2018\u2019\u201c\u201d]/;
export const lat = (s) => (String(s).match(/[A-Za-z]/g) || []).length;
export const isEnglish = (s) => !!s && !CJK.test(s) && lat(s) >= 2;
/** ⛔ 书号 / 编号（Exercise 2.25、Theorem 8.3.9、Definition 5.2.5…）——
    它们是搜索用的坐标，不是名字。aliases.js 里这类条目有 200 多条。
    ⚠️ 2026-10-16 修：**必须带编号**才算书号。原来裸的 `section` 也被当成书号，
    于是 `def.section`（截口，aka 里就写着 `section`）明明有名字却填不上。
    现在 `Section 2.3` 是书号、`section` 是名字。 */
export const refCode = (s) => /^\s*(exercise|problem|theorem|thm|definition|def|lemma|proposition|prop|corollary|cor|example|remark|chapter|section|part|table|figure|equation|eq|item)\b(?=[\s.:§]*[§\d])[\s.:§\d]*\s*$/i.test(String(s || ''));
/** 一个词是不是「像词」：正常的词（≥5 字母且不全大写），或小写实词；⛔ sup/inf/wff/MCT/a.e. 都不算 */
const wordish = (w) => {
  const letters = String(w).replace(/[^A-Za-z]/g, '');
  if (!letters) return false;
  if (letters.length >= 5 && letters !== letters.toUpperCase()) return true;
  return /[a-z]/.test(w) && letters.length >= 4 && !/\d/.test(w);
};
/** 单个词算不算英文名：只认「纯字母（允许变音符、连字符、撇号）」，
    要有元音、不是全大写、不是驼峰（kTop 这种排除）。
    ⚠️ 2026-10-16 两处修正（都是**误杀**，不是放松）：
      ① 驼峰判据按**连字符 / 撇号切开的每一段**分别做 —— 原来把整条去掉标点后一起看，
         `Heine-Borel` 会被读成 `HeineBorel`（看到第二个大写）而误判成驼峰记号；
         `Burali-Forti` / `Cartan-Leray` / `Breen-Deligne` / `Cartan-Eilenberg` /
         `Lebesgue–Stieltjes` 同理。这些都是正常专名，该收。
      ② 每一段**至少两个字母** —— 这样 `L-infinity` / `k-ification` 这种
         「单个字母 + 连字符 + 词」的记号仍然挡在外面（L^∞、k-化 是记号不是名字）。
      ③ 字符集补上 en dash `–` 与弯撇号 `’`（aka 里两种都出现过）。 */
export const nameLike = (s) => {
  const t = String(s).trim();
  if (refCode(t)) return false;
  if (/\s/.test(t)) return t.split(/\s+/).some(wordish);
  if (!/^[A-Za-z\u00c0-\u024f'’\u2010-\u2015-]+$/.test(t)) return false;
  for (const p of t.split(/[-'’\u2010-\u2015]+/)) {
    if (p.length < 2) return false;                                // ②
    if (/[A-Z\u00c0-\u00dd]/.test(p.slice(1))) return false;        // ① 驼峰：kTop
  }
  const core = t.replace(/[^A-Za-z\u00c0-\u024f]/g, '');
  if (core.length < 4) return false;
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
  const enById = Object.create(null);     // ⭐ 显式英文名（aka 记录的 `en` 字段）
  ((MG.aliases && MG.aliases.nodes) || []).forEach((r) => {
    if (r && r.id) {
      akaById[r.id] = r.aka || [];
      if (r.en) enById[r.id] = String(r.en).trim();
    }
  });
  return graph.nodes.map((n) => {
    const aka = akaById[n.id] || [];
    const explicit = enById[n.id] || '';
    const enAll = aka.filter(isEnglish);
    const refs = enAll.filter(refCode);                  // 书号：搜索用，不是名字
    const en = enAll.filter((x) => !refCode(x));
    const clean = en.filter(nameLike);
    const m = /[（(]([^（）()]{2,90})[）)]/.exec(String(n.title || ''));
    const titleEn = m && cleanTitle(m[1]) ? m[1].trim() : '';
    return {
      id: n.id, label: n.label, title: n.title, type: n.type, cluster: n.cluster || null, explicit,
      regions: (n.regions || []).slice(), en, refs, clean, titleEn,
    };
  });
}

/** 分桶结果 */
export function splitBuckets(rows) {
  const b = { explicit: [], auto: [], ambiguous: [], abbrev: [], refOnly: [], titleOnly: [], none: [] };
  rows.forEach((r) => {
    if (r.explicit) b.explicit.push(r);          // ⭐ 作者显式定的名，优先于一切机械规则
    else if (r.clean.length === 1) b.auto.push(r);
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
  /* ⭐ 命中项里若有**短写法是长写法的开头、且在那儿正好断词**（`Yoneda` ⊂ `Yoneda lemma`），
     那是同一个名字的简写，不算「另一条候选」—— 否则 title 写全称时长短两条一起命中，
     规则会判成「多命中」而落空（`lem.yoneda` 就是这么漏掉的：aka 里既有
     `Yoneda lemma` 又有裸 `Yoneda`，title 写的是「米田引理（Yoneda Lemma）」）。
     ⛔ 必须断词才算简写：`unit` ⊂ `counit`、`cone` ⊂ `cocone`、`equalizer` ⊂ `coequalizer`
        是**两个不同的概念**（余单位/余锥/余等化子），绝不能把前者当后者的简写
        —— 实测试过按裸子串判，会把 def.cone 的英文名写成 `cocone`（错的）。 */
  const isShorthand = (c, o) => {
    const lo = o.toLowerCase(), lc = c.toLowerCase();
    if (lo === lc || lo.indexOf(lc) !== 0) return false;
    return !/[a-z0-9]/.test(lo.charAt(lc.length));   // 后面接空格/标点/结尾 = 断词
  };
  const maximal = hit.filter((c) => !hit.some((o) => isShorthand(c, o)));
  return maximal.length === 1 ? maximal[0] : null;
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
  /* ⭐ t0 = **显式命名**（作者在 aliases.js 的 aka 记录里写 `en: '...'`）。
     为什么需要它：机械规则要求 aka 里「恰好一条名字样的英文」，而很多节点的 aka
     本来就有两三条都是**合法的搜索别名**（`ax.choice` → axiom of choice / Zorn）。
     删别名会伤站内搜索，猜又有风险 ⇒ 另给一个字段让作者直接定名。
     ⛔ 这个字段**不会**被机械规则推导 —— 只有人（或经人核过的 agent）能写。 */
  const t0 = b.explicit.map((r) => ({
    r,
    e: { title_en: r.explicit, label_en: r.explicit.length <= 32 ? r.explicit : null, from: 'explicit' },
  }));
  const t1 = b.auto.map((r) => ({ r, e: entryOf(r) }));
  const t2 = [];
  const gaps = [];
  for (const r of rows) {
    if (r.explicit) continue;                      // 零级：显式命名
    if (r.clean.length === 1) continue;            // 一级
    const cand = tier2Of(r);
    if (cand) t2.push({ r, e: tier2Entry(cand), cand, form: titleFormOf(r.title, cand) });
    else gaps.push(r);
  }
  return { t0, t1, t2, gaps };
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
  L.push('      清单在 i18n/gaps.md，二级命中另有一份 i18n/second-tier.md（可整批回滚）。');
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
  const t0 = dec.t0.length, t1 = dec.t1.length, t2 = dec.t2.length;
  const ambLeft = b.ambiguous.length - t2;   // ⚠️ 二级是从「歧义」桶里捞出来的 ⇒ 要减掉，表才互斥
  const covered = t0 + t1 + t2;
  const pct = (x) => (100 * x / rows.length).toFixed(1) + '%';
  g.push('# 英文名缺口清单');
  g.push('');
  g.push('> ⚠️ **自动生成，勿手改** —— 本文件由 `bun tools/i18n-backfill.mjs` 从');
  g.push('> `src/data/aliases.js`（aka）+ 各节点 `title` 现算，每次跑都会整份覆盖。');
  g.push('> 要改内容：改**真源**，然后重跑；直接编辑本文件会在 `--check` 里报「过期」。');
  g.push('');
  g.push('**这个清单是干什么的**：把「机械规则填不出英文名」的节点摊开，按星系分组、');
  g.push('每行带候选集 —— 它是**给作者（或来接活的协作者）补名字用的工作面板**，不是产物。');
  g.push('**这里一个名字都没猜过**：能机械定的已经写进 `src/data/i18n.js`（同样是生成物）。');
  g.push('');
  g.push('## 认领方式（怎么把一条缺口填掉）');
  g.push('');
  g.push('1. 在表里挑一条（或一片），记下节点 id；');
  g.push('2. 打开 `src/data/aliases.js`，在**该节点的 `aka` 数组里加上英文名**（或给它加 `en:` 字段，见下）');
  g.push('   （唯一真源就是这里 —— ⛔ 别去改 `src/data/i18n.js`，那是生成物）；');
  g.push('   · 加完要让 aka 里**恰好只剩一条「名字样」英文条目**，一级规则才认；');
  g.push('   · ⭐ **aka 里本来就有两三条合法英文别名时**（`ax.choice` → axiom of choice / Zorn），');
  g.push('     别删别名（那会伤站内搜索）—— 改成给记录加一个显式字段：');
  g.push('     `{ id: \'ax.choice\', en: \'axiom of choice\', aka: [...] }`。');
  g.push('     `en` 是**零级**规则：有它就直接用，绕过一切歧义判定，也不进内文跳转；');
  g.push('   · 「名字样」= 多个词时至少一个是实词；单个词要纯字母、有元音、不是全大写、不是驼峰；');
  g.push('   · 书号（`Exercise 2.25` / `Theorem 8.3.9`）**不算名字**，加不加都不影响。');
  g.push('3. 跑 `bun tools/i18n-backfill.mjs`（只写生成物，不动内容）；');
  g.push('4. 跑 `bun tools/build.mjs` 看断言过不过，再跑 `bun tools/i18n-backfill.mjs --check` 确认不漂。');
  g.push('');
  g.push('⚠️ **aka 同时喂三处**：① 英文名（本清单）② 搜索 ③ **内文跳转**（正文里出现该词会变链接）。');
  g.push('所以加了通用词（`section` / `ring` 这类）之后，要看一眼跳转噪音 ——');
  g.push('真吵的话把词放进 `aliases.js` 的 `linkStop`，或按「只填字段、不喂跳转」处理。');
  g.push('');
  g.push('## 一、结果（互斥，合计 = 全部节点）');
  g.push('');
  g.push('| 桶 | 节点数 | 占比 | 意思 |');
  g.push('|---|---|---|---|');
  g.push(`| ✅ 一级填入（\`from: aka\` / \`from: title\`） | ${t1} | ${pct(t1)} | aka 里恰好一条名字样英文 |`);
  g.push(`| ✅ 二级填入（\`from: aka-title\`） | ${t2} | ${pct(t2)} | title 里恰好命中一个 aka 候选 —— 清单见 \`i18n/second-tier.md\`（可整批回滚）|`);
  g.push(`| ⛔ 缺口 | ${dec.gaps.length} | ${pct(dec.gaps.length)} | 下面第二节逐条列 |`);
  g.push(`| **合计** | **${rows.length}** | 100% | 覆盖 ${covered}（${pct(covered)}），缺口 ${dec.gaps.length} |`);
  g.push('');
  g.push('## 二、缺口为什么填不了（互斥，合计 = 缺口数）');
  g.push('');
  g.push('| 桶 | 节点数 | 意思 |');
  g.push('|---|---|---|');
  g.push(`| ⚠️ 歧义（二级也没捞着） | ${ambLeft} | aka 里有 ≥2 条英文写法，且 title 里没出现其中一个 |`);
  g.push(`| ⚠️ 只有缩写 | ${b.abbrev.length} | aka 里只有 AC / FOL / sup / MCT a.e. 这种缩写 |`);
  g.push(`| ⚠️ 只有书号 | ${b.refOnly.length} | aka 里只有 Exercise 2.25 / Theorem 8.3.9 这种坐标（搜索用，不是名字）|`);
  g.push(`| ⚠️ 只有 title 有 | ${b.titleOnly.length} | aka 没有英文，但 title 括号里是英文 |`);
  g.push(`| ⛔ 完全没有 | ${b.none.length} | aka 与 title 都没有英文名 |`);
  g.push(`| **合计** | **${dec.gaps.length}** | = 全部节点 ${rows.length} − 已覆盖 ${covered} |`);
  g.push('');
  g.push('⚠️ **口径提醒**：脚本内部的分桶是在**二级之前**做的，所以「歧义」原始数是 ' +
    `${b.ambiguous.length}，其中 **${t2}** 条被二级捞走了 —— 上表用的是减完的 ${ambLeft}。`);
  g.push('两张表各自互斥、各自合计对得上；⛔ 别把两张表的行混着加。');
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
  const all = dec.t0.concat(dec.t1, dec.t2);
  const checks = checksOf(all);
  const entries = all.map(({ r, e }) => ({ id: r.id, title_en: e.title_en, label_en: e.label_en, from: e.from }));
  /* MANUAL-KEEP: 手工条目（from:'manual'）永远保留 —— 这些是人工审过的英文名，
     回填脚本不能把它们冲掉。⛔ 删掉这段 = 下一次回填会丢掉全部 manual。 */
  const manual = new Map();
  if (fs.existsSync(SIDECAR)) {
    const cur = fs.readFileSync(SIDECAR, 'utf8');
    const re = /'([^']+)':\s*\{\s*title_en:\s*'((?:[^'\\]|\\.)*)',\s*label_en:\s*(null|'((?:[^'\\]|\\.)*)'),\s*from:\s*'manual'\s*\}/g;
    let m;
    while ((m = re.exec(cur))) {
      const un = (t) => t.replace(/\\'/g, "'");
      manual.set(m[1], { id: m[1], title_en: un(m[2]), label_en: m[3] === 'null' ? null : un(m[4]), from: 'manual' });
    }
  }
  if (manual.size) {
    const kept = entries.filter((e) => !manual.has(e.id));
    entries.length = 0;
    entries.push(...kept, ...manual.values());
  }
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
    if (gapsCur !== gaps) drift.push('i18n/gaps.md 过期');
    if (t2Cur !== t2txt) drift.push('i18n/second-tier.md 过期');
    if (drift.length) {
      console.error('✗ 漂移 ' + drift.length + ' 处：' + drift.slice(0, 5).join('；') + '（跑 bun tools/i18n-backfill.mjs）');
      process.exit(1);
    }
    console.log(`✓ 英文名与源一致：显式 ${dec.t0.length} + 一级 ${dec.t1.length} + 二级 ${dec.t2.length} = ${entries.length}` +
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
  console.log(`  ✅ 显式命名（aliases 的 en:）  ：${dec.t0.length}  (${pct(dec.t0.length)})`);
  console.log(`  ✅ 一级 title_en/label_en：${dec.t1.length}  (${pct(dec.t1.length)})`);
  console.log(`  ✅ 二级（title 定名）    ：${dec.t2.length}  (${pct(dec.t2.length)})` +
    `  —— 其中大小写与 aka 不同的 ${checks.caseDiff.length} 处`);
  console.log(`  ⇒ 英文名覆盖 ${entries.length} / ${rows.length} = ${pct(entries.length)}`);
  console.log(`  ⚠️ 歧义 ${b.ambiguous.length} · 只有缩写 ${b.abbrev.length} · 只有书号 ${b.refOnly.length}` +
    ` · 只有 title ${b.titleOnly.length} · 完全没有 ${b.none.length}  ⇒ 缺口合计 ${dec.gaps.length}`);
  console.log(`  🔎 跨节点重复 title_en：${checks.dups.length} 组 · title 里有更长英文写法：${checks.shapeDiff.length} 处（只记录）`);
  console.log(`  → ${wrote} 个文件被更新（src/data/i18n.js · i18n/gaps.md · i18n/second-tier.md）`);
}

if (import.meta.main) main();
