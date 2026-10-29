#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · ingest —— 把 _inbox/ 里的 Markdown 编译成内容包
   --------------------------------------------------------------------------
   为什么要有它：让「另一个 AI（Codex / Claude / 任何 agent）」能给星图投稿，
   而不必写这个仓库的 JS 内容包。

     _inbox/<slug>.md          ← 投稿（Markdown，LaTeX 零转义）
             ↓  bun tools/ingest.mjs        ← 校验 + 编译（本文件）
     src/data/packs/150-codex-<slug>.js   ← 自动生成，⛔ 别手改
             ↓  bun tools/build.mjs
     dist/*

   ⚠️⚠️ **这个工具是人用的，不是投稿方用的。**
      投稿的 agent 只写 _inbox/*.md，跑 ingest 是「核验」这一步 ——
      由人（或负责维护星图的 agent）看完内容确认无误后手动执行。
      让投稿方自己跑 ingest，等于让它自审自签，A 档防线就没了。

   ⭐ 为什么是 Markdown 而不是 JSON：Markdown 正文里 `\forall` 就是 `\forall`；
      JSON 里必须写 `\\forall`，写成单反斜杠会变成换页符 —— **静默损坏**。
      星图的内容包全是 JS 字符串，反斜杠要双写，这是最早踩过的坑之一。

   用法：
     bun tools/ingest.mjs                 处理 _inbox/ 下所有 .md
     bun tools/ingest.mjs --dry           只校验，一个字节都不写
     bun tools/ingest.mjs --file a.md     只处理一个文件
     bun tools/ingest.mjs --build         编译完顺手跑 build.mjs
     bun tools/ingest.mjs --force         覆盖已有 pack（默认就覆盖，保留编号）

   ⛔ 失败时**一个文件都不写**（全有或全无）—— 免得留下一半的包。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const PACKDIR = path.join(SRC, 'data', 'packs');
const INBOX = path.join(ROOT, '_inbox');
const GRAPH = path.join(ROOT, 'dist', 'graph.json');
const INDEX = path.join(ROOT, 'index.html');

const C = process.stdout.isTTY
  ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m`, ok: (s) => `\x1b[32m${s}\x1b[0m`, bad: (s) => `\x1b[31m${s}\x1b[0m`, y: (s) => `\x1b[33m${s}\x1b[0m` }
  : { dim: (s) => s, b: (s) => s, ok: (s) => s, bad: (s) => s, y: (s) => s };

/* ---------------------------------------------------------------- 常量 */
/* id 前缀 ↔ 节点类型。投稿时 `type:` 可以省略，由前缀推。 */
const PREFIX_TYPE = {
  ax: 'axiom', def: 'definition', thm: 'theorem', lem: 'lemma',
  prop: 'proposition', cor: 'corollary', ex: 'example',
};
const VALID_TYPES = new Set(['axiom', 'definition', 'theorem', 'lemma', 'proposition', 'corollary', 'example', 'remark', 'concept']);
const VALID_KINDS = new Set(['implication', 'equivalence', 'definition', 'analogy']);
const EDGE_PREFIX = { implication: 'imp', equivalence: 'eq', definition: 'def-link', analogy: 'ana' };

/* ⚠️ 前缀后必须是 [a-z0-9] 开头，只允许小写字母数字连字符。
   这条卡住「Codex 随手写成 thm.UniformLimit」这类事故。 */
const ID_RE = /^([a-z]+)\.([a-z0-9][a-z0-9-]*)$/;
/* 中文标点/汉字 —— 用来抓「汉字进了 $…$」 */
const CJK = /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef\u4e00-\u9fff]/;

/* ---------------------------------------------------------------- 载入现有数据 */
function loadMGData() {
  const win = { MG: {}, console: { log() {}, warn() {}, error() {} } };
  win.window = win; win.self = win;
  const ctx = vm.createContext(win);
  for (const f of ['regions.js', 'clusters.js', 'notation.js']) {
    const p = path.join(SRC, 'data', f);
    try { vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f }); }
    catch (e) { fail(`载入 ${f} 失败：${e.message}`); }
  }
  return win.MG;
}

function loadGraph() {
  if (!fs.existsSync(GRAPH)) {
    console.log(C.y('⚠ 没有 dist/graph.json —— 无法查重已有的节点 id。'));
    console.log(C.dim('  先跑一次 bun tools/build.mjs --json，或者接受「只在本批内查重」。'));
    return { nodes: [], edges: [] };
  }
  return JSON.parse(fs.readFileSync(GRAPH, 'utf8'));
}

function fail(msg) {
  console.error(C.bad('ingest: ' + msg));
  process.exit(1);
}

const MG = loadMGData();
const CLUSTER_BY_ID = new Map((MG.clusters || []).map((c) => [c.id, c]));
const REGION_IDS = new Set((MG.regions || []).map((r) => r.id));

/* ---------------------------------------------------------------- 解析器 */
/* Markdown 语法（故意做到最小，让投稿方一次就能写对）：

     # thm.example                 ← 一个 `#` = 一个节点，后面是它的 id
     cluster: analysis.uniform     ← 头部 key: value
     type: theorem                     type / regions 都可省（按前缀 / 星团推）
     label: 某某定理                   必填
     title: 定理：……                   可省，默认同 label
     tags: 定理, 一致收敛               可省
     refs: Rudin, Ch.7                 可省，可写多行（每行一条）

     ## 陈述                        ← 必填
     正文……

     ## 注                          ← 可省
     正文……

     # 边                            ← 边区块，必须放在后面
     ## implication | def.a, def.b | thm.c
     > 这条边的一句话标题（可省）
     证明正文（可省）
*/

/** 把整份 md 切成以 `# ` 为单位的大块 */
function splitChunks(text) {
  const lines = text.split(/\r?\n/);
  const chunks = [];
  let cur = null;
  for (const line of lines) {
    const m = /^#[ \t]+(.+?)[ \t]*$/.exec(line);
    if (m) {
      if (cur) chunks.push(cur);
      cur = { title: m[1], lines: [] };
      continue;
    }
    if (cur) cur.lines.push(line);
  }
  if (cur) chunks.push(cur);
  return chunks;
}

/** 大块内切 `## ` 小节；首个 section 之前的行是头部 */
function splitSections(lines) {
  const head = [];
  const sections = [];
  let cur = null;
  for (const line of lines) {
    const m = /^##[ \t]+(.+?)[ \t]*$/.exec(line);
    if (m) { cur = { name: m[1], lines: [] }; sections.push(cur); continue; }
    if (cur) cur.lines.push(line);
    else head.push(line);
  }
  return { head, sections };
}

/** 头部 `key: value`；同 key 出现多次则累加 */
function parseHead(lines, file, warns) {
  const out = {};
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*)[ \t]*[:：][ \t]*(.*)$/.exec(line);
    if (!m) {
      warns.push(`${file}: 头部有一行读不懂，已忽略 → 「${line.slice(0, 60)}」`);
      continue;
    }
    const k = m[1].toLowerCase();
    const v = m[2].trim();
    if (k in out) out[k] = [].concat(out[k], v);
    else out[k] = v;
  }
  return out;
}

function listOf(v) {
  if (v == null) return [];
  return [].concat(v)
    .flatMap((x) => String(x).split(/[,，]/))
    .map((x) => x.trim())
    .filter(Boolean);
}

const SEC_STATEMENT = new Set(['陈述', 'statement', '命题', '定理陈述']);
const SEC_NOTES = new Set(['注', 'notes', 'note', '说明', '备注', '理解']);

function trimBlock(lines) {
  let a = 0, b = lines.length;
  while (a < b && !lines[a].trim()) a++;
  while (b > a && !lines[b - 1].trim()) b--;
  return lines.slice(a, b).join('\n');
}

function parseFile(rawText, file) {
  /* ⚠️ 去掉 UTF-8 BOM。Windows PowerShell 的 `Set-Content -Encoding UTF8` 会写 BOM
     （U+FEFF），而 BOM 就在第一个 `#` 前面 ⇒ 行首 `^#` 匹配不上 ⇒
     **整份文件一个节点都解析不出来**。2026-10-29 让 Codex 实测投稿时踩到。 */
  const text = String(rawText).replace(/^\uFEFF/, '');
  const warns = [];
  const nodes = [];
  const edges = [];

  for (const chunk of splitChunks(text)) {
    const isEdgeBlock = /^(边|edges?|relations?|连线)$/i.test(chunk.title.trim());

    if (isEdgeBlock) {
      const { sections } = splitSections(chunk.lines);
      for (const sec of sections) {
        const parts = sec.name.split(/[|｜]/).map((s) => s.trim());
        if (parts.length !== 3) {
          warns.push(`${file}: 边的小节标题要写成 \`kind | 来源 | 目标\`，跳过 → 「${sec.name}」`);
          continue;
        }
        const [kindRaw, fromRaw, toRaw] = parts;
        const kind = kindRaw.toLowerCase();
        const sources = fromRaw.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
        const targets = toRaw.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
        if (!VALID_KINDS.has(kind)) {
          warns.push(`${file}: 不认识的边类型 \`${kind}\`（只认 ${[...VALID_KINDS].join(' / ')}）`);
          continue;
        }
        if (!sources.length || !targets.length) {
          warns.push(`${file}: 边 \`${sec.name}\` 少了一端，跳过`);
          continue;
        }

        // 第一行非空且以 `>` 开头 → 这一行的**语义随 kind 变**（在 validate 里分派）：
        //   implication / equivalence → 边的 title
        //   definition / analogy      → 边的 note
        // ⚠️ 为什么不是统一成 title：build.mjs 的 edgeBody() 对 definition/analogy
        //    取的是 note。写成 title 的话正文是空的 ⇒ 不生成 proofs 页，可节点页里
        //    仍然会链过去 ⇒ **死链**（2026-10-29 实测踩到）。
        let body = sec.lines.slice();
        const ti = body.findIndex((l) => l.trim());
        let lead = null;
        if (ti >= 0 && /^>/.test(body[ti].trim())) {
          lead = body[ti].trim().replace(/^>\s?/, '').trim();
          body = body.slice(ti + 1);
        }
        edges.push({ kind, sources, target: targets[0], lead, prose: trimBlock(body) || null });
      }
      continue;
    }

    /* ---- 节点块 ---- */
    const id = chunk.title.trim();
    const { head, sections } = splitSections(chunk.lines);
    const H = parseHead(head, file, warns);
    const secMap = new Map();
    for (const s of sections) secMap.set(s.name.trim(), trimBlock(s.lines));

    let statement = null, notes = null;
    for (const [name, body] of secMap) {
      if (SEC_STATEMENT.has(name)) statement = body;
      else if (SEC_NOTES.has(name)) notes = body;
      else warns.push(`${file}: 节点 ${id} 里有个不认识的段落 \`## ${name}\`（只认 陈述 / 注），已忽略`);
    }

    nodes.push({
      id,
      cluster: H.cluster || null,
      type: H.type || null,
      label: H.label || null,
      title: H.title || null,
      regions: listOf(H.regions || H.region),
      tags: listOf(H.tags),
      refs: listOf(H.refs),
      statement,
      notes,
      packName: H.pack || null,
    });
  }

  return { nodes, edges, warns };
}

/* ---------------------------------------------------------------- 校验 */
function validate(batch, existingIds, existingEdgeIds) {
  const errs = [];
  const warns = [];
  const seen = new Set();
  const newIds = new Set();

  for (const n of batch.nodes) {
    const where = `节点 ${n.id}`;

    const m = ID_RE.exec(n.id);
    if (!m) {
      errs.push(`${where}：id 必须形如 \`前缀.小写-连字符\`（例：thm.uniform-limit-continuous）。前缀 ${Object.keys(PREFIX_TYPE).join(' / ')}`);
      continue;
    }
    const prefix = m[1];
    if (!PREFIX_TYPE[prefix]) {
      errs.push(`${where}：不认识的 id 前缀 \`${prefix}\`。可用：${Object.keys(PREFIX_TYPE).join(' / ')}`);
    }
    if (existingIds.has(n.id)) errs.push(`${where}：**全库已有同名 id**（查重请用 bun tools/mg.mjs find <词>）`);
    if (newIds.has(n.id)) errs.push(`${where}：本批里重复出现`);
    newIds.add(n.id);
    seen.add(n.id);

    // type：可省，按前缀推
    if (n.type) {
      if (!VALID_TYPES.has(n.type)) errs.push(`${where}：type \`${n.type}\` 不认识，可用：${[...VALID_TYPES].join(' / ')}`);
    } else {
      n.type = PREFIX_TYPE[prefix] || 'theorem';
    }

    if (!n.label) errs.push(`${where}：缺 label（搜索和画布上都显示它，必填）`);
    else if (n.label.includes('$')) errs.push(`${where}：label 里不能出现 \`$\` —— 它是纯文本字段，不过 KaTeX 渲染`);
    if (!n.title) n.title = n.label;
    if (n.title && n.title.includes('$')) errs.push(`${where}：title 里不能出现 \`$\``);

    if (!n.cluster) errs.push(`${where}：缺 cluster —— 它决定这颗星落在哪个团里`);
    else if (!CLUSTER_BY_ID.has(n.cluster)) {
      const near = [...CLUSTER_BY_ID.keys()].filter((c) => c.includes(n.cluster.split('.').pop())).slice(0, 4);
      errs.push(`${where}：星团 \`${n.cluster}\` 不存在${near.length ? `（是不是：${near.join(' , ')}）` : ''}`);
    }

    // regions 可省：从星团的父星系推
    if (!n.regions.length && n.cluster && CLUSTER_BY_ID.has(n.cluster)) {
      const c = CLUSTER_BY_ID.get(n.cluster);
      if (c.parent) n.regions = [c.parent];
    }
    if (!n.regions.length) errs.push(`${where}：推不出 regions（星团没有 parent），请显式写 \`regions:\``);
    for (const r of n.regions) {
      if (!REGION_IDS.has(r)) errs.push(`${where}：星系 \`${r}\` 不存在。可用：${[...REGION_IDS].join(' , ')}`);
    }

    if (!n.statement) errs.push(`${where}：缺 \`## 陈述\` —— 一个没有陈述的节点不成其为知识点`);

    for (const [k, v] of [['tags', n.tags || []], ['refs', n.refs || []]]) {
      if ([].concat(v).some((x) => String(x).includes('$'))) {
        errs.push(`${where}：${k} 里不能出现 \`$\`（纯文本字段）`);
      }
    }

    // 公式闸门：汉字不能进 $…$（KaTeX 会把汉字当字符硬排，看起来没报错但很难看）
    for (const [field, text] of [['陈述', n.statement], ['注', n.notes]]) {
      if (!text) continue;
      for (const mm of text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g)) {
        const tex = mm[1] != null ? mm[1] : mm[2];
        if (tex && CJK.test(tex)) {
          errs.push(`${where}：${field} 的公式里夹了中文 → \`${tex.trim().slice(0, 50)}\`（中文要挪到 \`\\text{}\` 里，或者写到公式外面）`);
        }
      }
    }
  }

  for (const e of batch.edges) {
    const where = `边 ${e.sources.join('+')} → ${e.target}`;
    const ends = [...e.sources, e.target];
    for (const x of ends) {
      if (!existingIds.has(x) && !newIds.has(x)) {
        errs.push(`${where}：端点 \`${x}\` 不存在。⛔ 这是**静默丢边**的头号原因 —— 写错一个 id，整条推导就断了，构建只会警告不会报错。`);
      }
    }
    if (new Set(e.sources).size !== e.sources.length) errs.push(`${where}：来源里重复了同一个 id`);
    if (e.sources.includes(e.target)) errs.push(`${where}：来源和目标相同（自环）`);

    /* 把 `>` 行和正文落到**正确的字段**上 —— 口径必须跟 build.mjs 的 edgeBody() 对齐：
         implication              → proof
         equivalence              → proofs[..].text
         definition / analogy     → note
       否则会「有边没正文」：不生成 proofs/ 页，但节点页照样链过去 ⇒ 死链。 */
    if (e.kind === 'definition' || e.kind === 'analogy') {
      e.note = [e.lead, e.prose].filter(Boolean).join('\n\n') || null;
    } else {
      e.title = e.lead || null;
      e.proof = e.prose || null;
    }
    if (!e.note && !e.proof) {
      errs.push(`${where}：没有正文。${e.kind === 'definition' || e.kind === 'analogy'
        ? '写一行 `> 一句话说明为什么有这条边`'
        : '写一段证明（哪怕只写「由 X 直接得」）'}`);
    }
  }

  /* ⭐ 孤立检查：本批的新节点如果一条「连到旧图」的边都没有，layer 会掉到 0、
     在「分层」视图里跟 ZFC 混在一起。这是踩过的坑，必须拦。 */
  const linkedOut = new Set();
  for (const e of batch.edges) {
    for (const x of [...e.sources, e.target]) linkedOut.add(x);
  }
  const noAnchor = batch.nodes.filter((n) => {
    if (!newIds.has(n.id)) return false;
    const touching = (batch.edges || []).filter((e) => e.sources.includes(n.id) || e.target === n.id);
    // 有一条边连着**旧节点**才算有锚
    return !touching.some((e) => [...e.sources, e.target].some((x) => existingIds.has(x)));
  });
  if (noAnchor.length) {
    warns.push(`这 ${noAnchor.length} 个新节点没有连到旧图的边：${noAnchor.map((n) => n.id).join(' , ')}`);
    warns.push('    ↑ 星图的层号靠「最长依赖路径」算，孤立的点会掉到 layer 0，和 ZFC 混在一起。建议至少写一条 definition 边指向它用到的已有概念。');
  }

  // 边 id 预生成查重
  const usedEdgeIds = new Set(existingEdgeIds);
  for (const e of batch.edges) {
    let base = `${EDGE_PREFIX[e.kind]}.${shortId(e.kind === 'implication' ? e.target : e.sources[0])}`;
    if (e.kind !== 'implication') base += '-' + shortId(e.target);
    base = base.slice(0, 70).replace(/-+$/, '');
    let id = base, n = 1;
    while (usedEdgeIds.has(id)) { id = `${base}-${++n}`; }
    usedEdgeIds.add(id);
    e.id = id;
  }

  return { errs, warns };
}

function shortId(id) {
  const i = String(id).indexOf('.');
  return (i >= 0 ? String(id).slice(i + 1) : String(id)).replace(/[^a-z0-9-]/gi, '-').toLowerCase();
}

/* ---------------------------------------------------------------- 记号闸门 */
/* 复用 src/data/notation.js 的 checks —— ⛔ 不在这里另写一份规则表，
   两处必然漂（项目的硬教训）。build.mjs 也是读同一份。 */
function stripMath(s) {
  return String(s).replace(/\$\$[\s\S]*?\$\$/g, ' ').replace(/\$[^$\n]*?\$/g, ' ');
}

function checkNotation(batch) {
  const N = (MG.notation && MG.notation.checks) || {};
  if (!N.bareUnicode) return [];
  const errs = [];
  const fields = N.bareUnicode;
  const bad = new Set([...(fields.chars || '')]);
  const exceptRx = fields.except ? new RegExp(fields.except, 'g') : null;
  const banned = (N.banned || []).map((b) => ({ ...b, rx: new RegExp(b.re, 'g') }));

  const items = [];
  for (const n of batch.nodes) {
    if (n.statement) items.push([`${n.id} 的陈述`, n.statement]);
    if (n.notes) items.push([`${n.id} 的注`, n.notes]);
    if (n.title) items.push([`${n.id} 的 title`, n.title]);
  }
  for (const e of batch.edges) {
    if (e.proof) items.push([`边 ${e.id} 的证明`, e.proof]);
    if (e.note) items.push([`边 ${e.id} 的说明`, e.note]);
    if (e.title) items.push([`边 ${e.id} 的标题`, e.title]);
  }

  for (const [where, text] of items) {
    let plain = stripMath(text);
    if (exceptRx) plain = plain.replace(exceptRx, ' ');
    const hit = [...new Set(plain)].filter((ch) => bad.has(ch));
    if (hit.length) {
      errs.push(`${where} 里有裸 Unicode 数学符号 ${hit.map((c) => `「${c}」`).join(' ')}`
        + ' —— 正文里的数学记号要写进 $…$（例：「→」写成 `$\\to$`，「⟹」写成 `$\\implies$`）');
    }
    for (const b of banned) {
      b.rx.lastIndex = 0;
      if (b.rx.test(text)) {
        errs.push(`${where} 用了禁用写法，改成 \`${b.fix}\`（${b.why}）`);
      }
    }
  }
  return errs;
}

/* ---------------------------------------------------------------- KaTeX 闸门 */
let katex = null;
function getKaTeX() {
  if (katex !== null) return katex;
  try {
    katex = require(path.join(SRC, 'ui', 'katex.min.js'));
  } catch (e) {
    console.log(C.y(`⚠ 载入 src/ui/katex.min.js 失败（${e.message}）—— 跳过公式渲染检查`));
    katex = false;
  }
  return katex;
}

function checkTeX(batch) {
  const k = getKaTeX();
  if (!k) return [];
  const errs = [];
  const texts = [];
  for (const n of batch.nodes) {
    if (n.statement) texts.push([`${n.id} 的陈述`, n.statement]);
    if (n.notes) texts.push([`${n.id} 的注`, n.notes]);
  }
  for (const e of batch.edges) {
    if (e.proof) texts.push([`边 ${e.id} 的证明`, e.proof]);
    if (e.title) texts.push([`边 ${e.id} 的标题`, e.title]);
  }
  for (const [where, text] of texts) {
    for (const m of text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g)) {
      const display = m[1] != null;
      const tex = display ? m[1] : m[2];
      if (!tex || !tex.trim()) continue;
      try {
        k.renderToString(tex, { displayMode: display, throwOnError: true, strict: false });
      } catch (err) {
        errs.push(`${where} 的公式渲染失败：\`${tex.trim().replace(/\s+/g, ' ').slice(0, 80)}\`\n      → ${String(err.message).slice(0, 110)}`);
      }
    }
  }
  return errs;
}

/* ---------------------------------------------------------------- 生成 JS */
function jsStr(s) {
  // ⚠️ 用 JSON.stringify 而不是手写引号：它会把反斜杠和引号一次性处理对。
  return JSON.stringify(String(s));
}
function jsMultiline(s, indent) {
  const lines = String(s).split('\n');
  const pad = ' '.repeat(indent);
  return '[\n' + lines.map((l) => pad + '  ' + jsStr(l) + ',').join('\n') + '\n' + pad + "].join('\\n')";
}

function emitPack(batch, slug, meta) {
  const name = batch.nodes.find((n) => n.packName)?.packName || meta.packName || `投稿：${slug}`;
  const out = [];
  out.push('/* ==========================================================================');
  out.push(`   内容包 · ${name}`);
  out.push('   --------------------------------------------------------------------------');
  out.push(`   ⚙️ 由 tools/ingest.mjs 从 _inbox/${meta.srcFile} 自动生成 —— ⛔ 不要手改这个文件。`);
  out.push('   要改内容：改那份 .md，然后重跑 `bun tools/ingest.mjs`。');
  out.push(`   来源：${meta.source || '（未注明）'}`);
  out.push(`   生成：${meta.stamp}`);
  out.push('   ========================================================================== */');
  out.push('window.MG = window.MG || {};');
  out.push('(window.MG.packs = window.MG.packs || []).push({');
  out.push('');
  out.push(`  name: ${jsStr(name)},`);
  out.push('');
  out.push('  nodes: [');
  for (const n of batch.nodes) {
    out.push('    {');
    out.push(`      id: ${jsStr(n.id)},`);
    out.push(`      cluster: ${jsStr(n.cluster)},`);
    out.push(`      type: ${jsStr(n.type)},`);
    out.push(`      label: ${jsStr(n.label)},`);
    out.push(`      title: ${jsStr(n.title)},`);
    out.push(`      regions: [${n.regions.map(jsStr).join(', ')}],`);
    if (n.tags && n.tags.length) out.push(`      tags: [${n.tags.map(jsStr).join(', ')}],`);
    out.push(`      statement: ${jsMultiline(n.statement, 6)},`);
    if (n.notes) out.push(`      notes: ${jsMultiline(n.notes, 6)},`);
    if (n.refs && n.refs.length) {
      out.push('      refs: [');
      for (const r of n.refs) out.push(`        ${jsStr(r)},`);
      out.push('      ],');
    }
    out.push('    },');
  }
  out.push('  ],');

  if (batch.edges.length) {
    out.push('');
    out.push('  edges: [');
    for (const e of batch.edges) {
      out.push('    {');
      out.push(`      id: ${jsStr(e.id)},`);
      out.push(`      kind: ${jsStr(e.kind)},`);
      if (e.kind === 'implication') {
        out.push(`      sources: [${e.sources.map(jsStr).join(', ')}],`);
        out.push(`      target: ${jsStr(e.target)},`);
      } else if (e.kind === 'definition') {
        out.push(`      definition: ${jsStr(e.sources[0])},`);
        out.push(`      usedBy: ${jsStr(e.target)},`);
      } else {
        out.push(`      a: ${jsStr(e.sources[0])},`);
        out.push(`      b: ${jsStr(e.target)},`);
      }
      if (e.title) out.push(`      title: ${jsStr(e.title)},`);
      // ⚠️ 字段名必须跟 build.mjs 的 edgeBody() 一致，否则「有边没正文」→ 死链
      if (e.kind === 'implication') {
        out.push(`      proof: ${jsMultiline(e.proof, 6)},`);
      } else if (e.kind === 'equivalence') {
        out.push('      proofs: [');
        out.push(`        { label: ${jsStr('证明')}, text: ${jsMultiline(e.proof, 10)} },`);
        out.push('      ],');
      } else {
        out.push(`      note: ${jsMultiline(e.note, 6)},`);
      }
      out.push('    },');
    }
    out.push('  ],');
  }

  out.push('});');
  out.push('');
  return out.join('\n');
}

/* ---------------------------------------------------------------- index.html 挂载 */
function mountIntoIndex(relPath) {
  const html = fs.readFileSync(INDEX, 'utf8');
  const tag = `<script src="${relPath}"></script>`;
  if (html.includes(tag)) return { changed: false, html };

  // 找最后一个内容包 script（src/data/packs/...），插在它后面
  const re = /^[ \t]*<script src="src\/data\/packs\/[^"]+\.js"><\/script>[ \t]*$/gm;
  let last = null, m;
  while ((m = re.exec(html))) last = m;
  if (!last) fail('index.html 里找不到任何 <script src="src/data/packs/...">，不敢乱插');

  const at = last.index + last[0].length;
  const next = html.slice(0, at) + '\n' + tag + html.slice(at);
  return { changed: true, html: next };
}

/* ---------------------------------------------------------------- 主流程 */
function main() {
  const argv = process.argv.slice(2);
  const opt = { dry: false, build: false, force: false, file: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry') { opt.dry = true; continue; }
    if (a === '--build') { opt.build = true; continue; }
    if (a === '--force') { opt.force = true; continue; }
    if (a === '--file') { opt.file = argv[++i]; continue; }
    if (a === '-h' || a === '--help') { usage(); return; }
    fail(`不认识的参数：${a}（--help 看用法）`);
  }

  if (!fs.existsSync(INBOX)) {
    console.log(`_inbox/ 还不存在。`);
    console.log(C.dim('投稿的 agent 直接新建这个目录、把 .md 丢进去就行；模板见 _inbox/_模板.md'));
    return;
  }

  let files = fs.readdirSync(INBOX)
    .filter((f) => f.toLowerCase().endsWith('.md') && !f.startsWith('_'))
    .sort();
  if (opt.file) {
    const want = path.basename(opt.file);
    files = files.filter((f) => f === want);
    if (!files.length) fail(`_inbox/ 里没有 ${want}`);
  }
  if (!files.length) {
    console.log(C.dim('_inbox/ 里没有待处理的 .md（下划线开头的文件会被跳过）。'));
    return;
  }

  const G = loadGraph();
  const existingIds = new Set((G.nodes || []).map((n) => n.id));
  const existingEdgeIds = new Set((G.edges || []).map((e) => e.id).filter(Boolean));

  // 已有投稿包的编号，保证重跑不会让编号漂
  const numberBySlug = new Map();
  let maxNo = 149;
  for (const f of fs.readdirSync(PACKDIR)) {
    const m = /^(\d+)-codex-(.+)\.js$/.exec(f);
    if (!m) continue;
    numberBySlug.set(m[2], parseInt(m[1], 10));
    maxNo = Math.max(maxNo, parseInt(m[1], 10));
  }

  console.log(C.b(`ingest：${files.length} 个文件`));
  const results = [];
  const allErrs = [];
  const allWarns = [];
  let totalNodes = 0, totalEdges = 0;

  for (const f of files) {
    const text = fs.readFileSync(path.join(INBOX, f), 'utf8');
    const slug = f.replace(/\.md$/i, '').replace(/[\\/:*?"<>|\s]+/g, '-');
    const parsed = parseFile(text, f);
    allWarns.push(...parsed.warns);

    if (!parsed.nodes.length) {
      allErrs.push(`${f}：里面一个节点都没解析出来（是不是忘了以 \`# thm.xxx\` 开头？）`);
      continue;
    }

    const v = validate(parsed, existingIds, existingEdgeIds);
    // 本批新 id 也要挡住后续文件的重复
    for (const n of parsed.nodes) if (ID_RE.test(n.id) && !existingIds.has(n.id)) existingIds.add(n.id);
    for (const e of parsed.edges) if (e.id) existingEdgeIds.add(e.id);

    const texErrs = checkTeX(parsed);
    const noteErrs = checkNotation(parsed);
    allErrs.push(...v.errs, ...texErrs, ...noteErrs);
    allWarns.push(...v.warns);

    totalNodes += parsed.nodes.length;
    totalEdges += parsed.edges.length;
    results.push({ f, slug, parsed });
  }

  /* 报告 */
  console.log('');
  for (const r of results) {
    const bad = allErrs.length > 0;
    console.log(`${bad ? C.y('·') : C.ok('·')} ${r.f}  →  ${r.parsed.nodes.length} 节点 / ${r.parsed.edges.length} 边  ${C.dim('（' + r.slug + '）')}`);
    for (const n of r.parsed.nodes) console.log(C.dim(`    ${n.id}  ${n.label || '(无 label)'}  [${n.cluster || '?'}]`));
  }

  if (allWarns.length) {
    console.log('');
    console.log(C.y(`⚠ ${allWarns.length} 条提醒`));
    for (const w of allWarns) console.log('  ' + w);
  }

  if (allErrs.length) {
    console.log('');
    console.log(C.bad(`✗ ${allErrs.length} 条错误 —— 一个文件都没写`));
    for (const e of allErrs) console.log('  ' + e);
    process.exit(1);
  }

  console.log('');
  console.log(C.ok(`✓ 校验全过：${totalNodes} 节点 / ${totalEdges} 边`));

  if (opt.dry) {
    console.log(C.dim('--dry：没有写任何文件。去掉 --dry 才真正编译。'));
    return;
  }

  /* 写盘：先全部生成好，再一次性落盘 */
  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16);
  const writes = [];
  let nextNo = maxNo + 1;
  for (const r of results) {
    let no = numberBySlug.get(r.slug);
    if (no == null) no = nextNo++;
    else no = Math.max(no, 0);
    const fname = `${no}-codex-${r.slug}.js`;
    const rel = `src/data/packs/${fname}`;
    const code = emitPack(r.parsed, r.slug, {
      srcFile: r.f,
      source: r.parsed.nodes.find((n) => n.packName)?.packName || '',
      stamp,
    });
    writes.push({ rel, fname, code, slug: r.slug });
  }

  for (const w of writes) {
    fs.writeFileSync(path.join(ROOT, w.rel), w.code, 'utf8');
    console.log(C.ok(`  写了 ${w.rel}`) + C.dim(`  (${w.code.length} B)`));
  }

  for (const w of writes) {
    const { changed, html } = mountIntoIndex(w.rel);
    if (changed) {
      fs.writeFileSync(INDEX, html, 'utf8');
      console.log(C.ok(`  挂到 index.html：${w.fname}`));
    }
  }

  console.log('');
  console.log(C.dim('下一步：'));
  console.log(C.dim('  bun tools/build.mjs          ← 生成 dist/（会跑全部硬门）'));
  console.log(C.dim('  bun tools/_katexcheck.mjs    ← 公式逐条真渲染（build 里没有这一步）'));
  console.log(C.dim('  然后 headless 截图看一眼，再 git add 自己改的路径提交'));

  if (opt.build) {
    console.log('');
    console.log(C.b('→ 跑 build.mjs …'));
    const { spawnSync } = require('node:child_process');
    const r = spawnSync(process.execPath, [path.join(ROOT, 'tools', 'build.mjs')], { stdio: 'inherit', cwd: ROOT });
    process.exit(r.status || 0);
  }
}

function usage() {
  console.log(`数学星图 · ingest —— 把 _inbox/*.md 编译成内容包

  bun tools/ingest.mjs              处理全部
  bun tools/ingest.mjs --dry        只校验，不写文件
  bun tools/ingest.mjs --file a.md  只处理一个
  bun tools/ingest.mjs --build      编译完顺手跑 build.mjs

  ⚠️ 这是**核验之后**的一步，由人执行。投稿的 agent 只该往 _inbox/ 写 md。`);
}

main();
