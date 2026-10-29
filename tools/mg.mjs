#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · mg —— 命令行查询入口（给人和 AI 用）
   --------------------------------------------------------------------------
   为什么要有它：星图导出给 AI 的是一棵**按需读取**的目录树
   （dist/llms.txt → index.md → nodes/<id>.md）。让 LLM 自己按路径摸过去
   要 3~4 次读取才命中一个节点，每次都烧 token。一条命令直接给出答案，
   省掉中间的摸索。

   ⚠️ 数据源是 dist/graph.json（构建产物）。内容改了要先 `bun tools/build.mjs`，
      否则这里读到的是旧的。命令 `mg stat` 会显示生成时间。

   用法：
     bun tools/mg.mjs find <词> [词2 ...]     搜节点（名字/别名/标签/正文）
     bun tools/mg.mjs show <id> [id2 ...]     节点详情：陈述、注、出入边
     bun tools/mg.mjs edge <id>               一条边的完整证明
     bun tools/mg.mjs cluster <星团id>        星团内的节点清单
     bun tools/mg.mjs path <A> <B>            两节点之间的最短证明链
     bun tools/mg.mjs ls [星系id]             星系 / 星团概览
     bun tools/mg.mjs stat                    规模与新鲜度

   选项：
     --limit N      find 最多给几条（默认 8）
     --no-body      find 不扫正文（快，但可能漏）
     --proof        配合 show：把每条边的证明正文也倒出来（默认只给边标题）

   ⭐ 这个文件只读 dist/，不碰 src/。改内容请走 _inbox/ + tools/ingest.mjs。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const GRAPH = path.join(ROOT, 'dist', 'graph.json');
const ALIASES = path.join(ROOT, 'src', 'data', 'aliases.js');

/* ------------------------------------------------------------ 载入数据 */
function die(msg) {
  console.error('mg: ' + msg);
  process.exit(1);
}

if (!fs.existsSync(GRAPH)) {
  die(`找不到 ${path.relative(ROOT, GRAPH)} —— 先跑 \`bun tools/build.mjs --json\``);
}

const G = JSON.parse(fs.readFileSync(GRAPH, 'utf8'));
const NODES = G.nodes || [];
const EDGES = G.edges || [];
const CLUSTERS = G.clusters || [];
const REGIONS = G.regions || [];

/** 别名与问法钩子。⚠️ 解析失败不能拖死查询，退化成「只有正名可搜」。 */
function loadAliases() {
  try {
    const win = { MG: {}, console };
    win.window = win;
    vm.runInContext(fs.readFileSync(ALIASES, 'utf8'), vm.createContext(win), { filename: 'aliases.js' });
    return (win.MG && win.MG.aliases) || { nodes: [], hooks: [] };
  } catch (e) {
    return { nodes: [], hooks: [], _err: e.message };
  }
}
const AL = loadAliases();

/* ------------------------------------------------------------ 建索引 */
const byId = new Map(NODES.map((n) => [n.id, n]));
const clusterById = new Map(CLUSTERS.map((c) => [c.id, c]));
const regionById = new Map(REGIONS.map((r) => [r.id, r]));

/** aka 索引：节点 id → 别名数组 */
const akaOf = new Map();
for (const a of AL.nodes || []) if (a && a.id && Array.isArray(a.aka)) akaOf.set(a.id, a.aka);

const outEdges = new Map();
const inEdges = new Map();
const push = (m, k, v) => { if (!m.has(k)) m.set(k, []); m.get(k).push(v); };

for (const e of EDGES) {
  if (e.kind === 'implication') {
    for (const s of e.sources || []) push(outEdges, s, e);
    if (e.target) push(inEdges, e.target, e);
  } else if (e.kind === 'definition') {
    // definition 边的语义：`definition` 这个定义被 `usedBy` 引用
    if (e.definition) push(outEdges, e.definition, e);
    if (e.usedBy) push(inEdges, e.usedBy, e);
  } else {
    // equivalence / analogy 无向：两端都算邻居
    for (const x of [e.a, e.b]) {
      if (!x) continue;
      push(outEdges, x, e);
      push(inEdges, x, e);
    }
  }
}

/** 度数（排序用） */
const deg = new Map();
for (const n of NODES) {
  const k = n.id;
  deg.set(k, (outEdges.get(k) || []).length + (inEdges.get(k) || []).length);
}

/* ------------------------------------------------------------ 小工具 */
const C = process.stdout.isTTY
  ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m`, y: (s) => `\x1b[33m${s}\x1b[0m` }
  : { dim: (s) => s, b: (s) => s, y: (s) => s };

const KIND_ZH = { implication: '推出', equivalence: '等价', definition: '定义引用', analogy: '类比' };
const TYPE_ZH = {
  axiom: '公理', definition: '定义', theorem: '定理', lemma: '引理',
  proposition: '命题', corollary: '推论', example: '例', remark: '注', concept: '概念',
};

function clusterName(id) {
  const c = clusterById.get(id);
  return c ? c.name : id;
}
function regionName(id) {
  const r = regionById.get(id);
  return r ? r.name : id;
}
/** 一句话定位：数学分析 → 初等微积分（analysis.uniform） */
function where(n) {
  const r = n.cluster ? clusterById.get(n.cluster) : null;
  const reg = r && r.parent ? regionById.get(r.parent) : null;
  const parts = [];
  if (reg) parts.push(regionName(reg.id));
  if (r) parts.push(r.name);
  parts.push(`(${n.cluster || '无团'})`);
  return parts.join(' → ');
}

/** 自动折行过的段落（终端友好；AI 读也无所谓） */
function wrap(s, width = 96) {
  const out = [];
  for (const para of String(s || '').split('\n')) {
    if (!para.trim()) { out.push(''); continue; }
    if (para.length <= width) { out.push(para); continue; }
    // 中文按字符数折，公式/英文不额外处理
    let line = '';
    for (const ch of para) {
      line += ch;
      if (line.length >= width) { out.push(line); line = ''; }
    }
    if (line) out.push(line);
  }
  return out.join('\n');
}

function edgeLabel(e) {
  if (e.title) return e.title;
  if (e.note) return e.note.slice(0, 40) + (e.note.length > 40 ? '…' : '');
  return '';
}
/* ⚠️ from / to 一律返回**数组**。以前 implication 的 to 直接给字符串，
   展开时会被拆成单字符（`...p.to` 得到 'l','e','m'…），路径上就永远
   匹配不到边、显示「未找到对应边」。 */
function edgeEnds(e) {
  if (e.kind === 'implication') return { from: e.sources || [], to: e.target ? [e.target] : [] };
  if (e.kind === 'definition') return { from: e.definition ? [e.definition] : [], to: e.usedBy ? [e.usedBy] : [] };
  return { from: e.a ? [e.a] : [], to: e.b ? [e.b] : [] };
}

/* 推导方向（用于 path / deps）：
     implication  前提 → 结论
     definition   定义 → 用到它的结论
     equivalence  双向都算（两边互为前提）
     analogy      ⛔ 不参与 —— 类比不是逻辑蕴含，不能拿来当证明链 */
function directedEdgesOf(id) {
  const res = [];
  for (const e of EDGES) {
    const p = edgeEnds(e);
    if (e.kind === 'equivalence') {
      if (p.from.includes(id) || p.to.includes(id)) {
        const other = p.from.includes(id) ? p.to : p.from;
        for (const o of other) res.push({ e, to: o, dir: 'both' });
      }
      continue;
    }
    if (e.kind === 'analogy') continue;
    if (p.from.includes(id)) for (const o of p.to) res.push({ e, to: o, dir: 'fwd' });
  }
  return res;
}
/** 反方向：谁把 id 当结论（implication 的 target / definition 的 usedBy） */
function premiseEdgesOf(id) {
  const res = [];
  for (const e of EDGES) {
    const p = edgeEnds(e);
    if (e.kind === 'equivalence') {
      if (p.from.includes(id)) for (const o of p.to) res.push({ e, to: o, dir: 'both' });
      else if (p.to.includes(id)) for (const o of p.from) res.push({ e, to: o, dir: 'both' });
      continue;
    }
    if (e.kind === 'analogy') continue;
    if (p.to.includes(id)) for (const o of p.from) res.push({ e, to: o, dir: 'premise' });
  }
  return res;
}
/** 证文字数：让人一眼看出哪条边讲得多 */
function proofSize(e) {
  if (e.proof) return e.proof.length;
  if (Array.isArray(e.proofs)) return e.proofs.reduce((s, p) => s + (p.text || '').length, 0);
  return 0;
}

/* ------------------------------------------------------------ find */
function cmdFind(words, opt) {
  const q = words.join(' ').toLowerCase();
  if (!q) die('find 要给词，例如：mg find 一致收敛');
  const terms = words.filter((w) => w.trim()).map((w) => w.toLowerCase());

  /** 一个节点对某词的命中档（越大越相关；0 = 没中） */
  function score(n, t) {
    const id = n.id.toLowerCase();
    const label = (n.label || '').toLowerCase();
    const title = (n.title || '').toLowerCase();
    const tags = (n.tags || []).map((x) => String(x).toLowerCase());
    const akas = (akaOf.get(n.id) || []).map((x) => String(x).toLowerCase());
    const labelEn = (n.label_en || '').toLowerCase();

    if (id === t) return 1000;
    if (label === t || akas.includes(t) || labelEn === t) return 900;
    if (label.startsWith(t)) return 800;
    if (label.includes(t)) return 700;
    if (title.includes(t)) return 650;
    if (akas.some((a) => a.includes(t))) return 600;
    if (tags.includes(t)) return 550;
    if (labelEn.includes(t)) return 520;
    if (id.includes(t)) return 500;
    if (tags.some((x) => x.includes(t))) return 300;
    if (!opt.noBody) {
      if ((n.statement || '').toLowerCase().includes(t)) return 220;
      if ((n.notes || '').toLowerCase().includes(t)) return 200;
      if ((n.refs || []).join(' ').toLowerCase().includes(t)) return 150;
    }
    return 0;
  }

  const hits = [];
  for (const n of NODES) {
    let total = 0, all = true;
    for (const t of terms) {
      const s = score(n, t);
      if (s === 0) { all = false; break; }
      total += s;
    }
    if (!all) continue;
    // 多词时要求每个词都中（AND），再按总分
    hits.push({ n, s: total });
  }

  hits.sort((x, y) => (y.s - x.s) || ((deg.get(y.n.id) || 0) - (deg.get(x.n.id) || 0)) || x.n.id.localeCompare(y.n.id));
  const lim = opt.limit || 8;
  const shown = hits.slice(0, lim);

  if (!hits.length) {
    console.log(`没有命中「${words.join(' ')}」。`);
    console.log(C.dim('试试：换个说法、用英文术语，或先 `mg ls` 看看有哪些星团。'));
    return;
  }

  console.log(C.b(`「${words.join(' ')}」命中 ${hits.length} 条`) + C.dim(shown.length < hits.length ? `（列前 ${shown.length}）` : ''));
  for (const { n, s } of shown) {
    const tier = s >= 900 ? '精确' : s >= 700 ? '名字' : s >= 500 ? '近名' : '正文';
    console.log(`  ${C.b(n.id)}  ${n.label}  ${C.dim(`[${TYPE_ZH[n.type] || n.type}] ${n.cluster} · 层${n.layer} · ${tier}`)}`);
    if (n.title && n.title !== n.label) console.log(C.dim(`      ${n.title}`));
  }
  console.log(C.dim(`\n下一步：bun tools/mg.mjs show ${shown[0].n.id}`));
}

/* ------------------------------------------------------------ show */
function cmdShow(ids, opt) {
  if (!ids.length) die('show 要给节点 id，例如：mg show thm.uniform-limit-continuous');
  const missing = ids.filter((i) => !byId.has(i));
  for (const m of missing) {
    console.error(C.y(`没有这个节点：${m}`));
    // 给个近似建议，免得人/AI 自己猜
    const near = NODES.filter((n) => n.id.includes(m.split('.').pop() || m)).slice(0, 3);
    if (near.length) console.error(C.dim('  是不是：' + near.map((n) => n.id).join(' , ')));
  }
  const list = ids.filter((i) => byId.has(i));
  if (!list.length) process.exit(1);

  for (const id of list) {
    const n = byId.get(id);
    console.log('\n' + C.b(`# ${n.id} · ${n.label}`));
    console.log(C.dim(`${where(n)} · 层 ${n.layer} · ${TYPE_ZH[n.type] || n.type}`));
    if (n.title && n.title !== n.label) console.log(C.dim(`title: ${n.title}`));
    if (n.tags && n.tags.length) console.log(C.dim('tags: ' + n.tags.join(' / ')));
    const aka = akaOf.get(n.id);
    if (aka && aka.length) console.log(C.dim('也叫: ' + aka.join(' / ')));

    if (n.statement) {
      console.log('\n## 陈述\n');
      console.log(wrap(n.statement));
    }
    if (n.notes) {
      console.log('\n## 注\n');
      console.log(wrap(n.notes));
    }
    if (n.refs && n.refs.length) {
      console.log('\n## 出处');
      for (const r of n.refs) console.log('  · ' + r);
    }

    const outs = outEdges.get(n.id) || [];
    const ins = inEdges.get(n.id) || [];
    if (outs.length) {
      console.log(C.b(`\n## 它能推出什么 / 谁在用它（${outs.length}）`));
      for (const e of outs) {
        const { from, to } = edgeEnds(e);
        const other = e.kind === 'definition' || e.kind === 'implication'
          ? `→ ${to.join(', ')}`
          : `⟺ ${from.includes(n.id) ? to.join(', ') : from.join(', ')}`;
        console.log(`  [${KIND_ZH[e.kind] || e.kind}] ${other}${e.layer === false ? C.dim('（推论）') : ''} ${C.dim(`· ${edgeLabel(e)} · 证明 ${proofSize(e)} 字`)}`);
        if (opt.proof && (e.proof || e.proofs)) console.log(wrap(edgeBody(e), 92).replace(/^/gm, '      '));
      }
    }
    if (ins.length) {
      console.log(C.b(`\n## 谁在用它 / 它靠什么（${ins.length}）`));
      for (const e of ins) {
        const { from, to } = edgeEnds(e);
        const other = e.kind === 'definition'
          ? `← ${from.join(', ')}（定义被引用）`
          : e.kind === 'implication'
            ? `← ${(e.sources || []).join(', ')}`
            : `⟺ ${from.includes(n.id) ? to.join(', ') : from.join(', ')}`;
        console.log(`  [${KIND_ZH[e.kind] || e.kind}] ${other} ${C.dim(`· ${edgeLabel(e)} · 证明 ${proofSize(e)} 字`)}`);
        if (opt.proof && (e.proof || e.proofs)) console.log(wrap(edgeBody(e), 92).replace(/^/gm, '      '));
      }
    }
    console.log(C.dim(`\n(id=${n.id} · 更多边看 dist/nodes/${n.id}.md)`));
  }
}

function edgeBody(e) {
  if (e.proof) return e.proof;
  if (Array.isArray(e.proofs)) {
    return e.proofs.map((p) => `**${p.label || '证明'}**\n\n${p.text || ''}`).join('\n\n');
  }
  return '';
}

/* ------------------------------------------------------------ edge */
function cmdEdge(id) {
  const e = EDGES.find((x) => x.id === id);
  if (!e) {
    console.error(C.y(`没有这条边：${id}`));
    const near = EDGES.filter((x) => (x.id || '').includes(id)).slice(0, 5);
    if (near.length) console.error(C.dim('  近似：' + near.map((x) => x.id).join(' , ')));
    process.exit(1);
  }
  const { from, to } = edgeEnds(e);
  console.log(C.b(`# ${e.id}`) + C.dim(`  [${KIND_ZH[e.kind] || e.kind}]`));
  console.log(withLabel(from) + '  ⟹  ' + withLabel(to));
  if (e.title) console.log(C.dim('title: ' + e.title));
  if (e.note) console.log(C.dim('note: ' + e.note));
  const body = edgeBody(e);
  if (body) { console.log('\n## 证明\n'); console.log(wrap(body)); }
  else console.log(C.dim('\n（这条边没有写证明：定义引用 / 类比边通常不写）'));
}
function withLabel(ids) {
  return (ids || []).filter(Boolean).map((i) => {
    const n = byId.get(i);
    return n ? `${n.id}（${n.label}）` : `${i}（?）`;
  }).join(' + ') || '(空)';
}

/* ------------------------------------------------------------ cluster */
function cmdCluster(id) {
  const c = clusterById.get(id);
  if (!c) {
    console.error(C.y(`没有这个星团：${id}`));
    const near = CLUSTERS.filter((x) => x.id.includes(id) || (x.name || '').includes(id)).slice(0, 8);
    if (near.length) console.error(C.dim('  近似：' + near.map((x) => `${x.id}（${x.name}）`).join(' , ')));
    process.exit(1);
  }
  const nodes = c.nodes ? c.nodes.map((i) => byId.get(i)).filter(Boolean) : NODES.filter((n) => n.cluster === id);
  const reg = c.parent ? regionById.get(c.parent) : null;
  console.log(C.b(`# ${c.id} · ${c.name}`) + C.dim(reg ? `  （${regionName(reg.id)}）` : ''));
  if (c.desc) console.log(C.dim(wrap(c.desc, 92)));
  console.log(C.dim(`${nodes.length} 个节点`));
  const byType = {};
  for (const n of nodes) (byType[n.type] ||= []).push(n);
  for (const t of ['axiom', 'definition', 'theorem', 'lemma', 'proposition', 'corollary', 'example', 'remark', 'concept']) {
    if (!byType[t]) continue;
    console.log(C.b(`\n## ${TYPE_ZH[t] || t}（${byType[t].length}）`));
    for (const n of byType[t].sort((x, y) => (x.layer - y.layer) || x.id.localeCompare(y.id))) {
      console.log(`  ${n.id}  ${n.label}${n.layer ? C.dim(' · 层' + n.layer) : ''}`);
    }
  }
  console.log(C.dim(`\n下一步：bun tools/mg.mjs show <id>`));
}

/* ------------------------------------------------------------ path */
/* 两节点之间的**有向**推导链：只有 前提 → 结论 的方向算数。
   ⚠️ 早期版本是无向 BFS，会给出 `ax.choice ⟸ lem.zorn` 这种反向的假链 ——
      图上连通不等于逻辑成立。方向必须留着。 */
function cmdPath(a, b) {
  if (!byId.has(a)) die(`没有这个节点：${a}`);
  if (!byId.has(b)) die(`没有这个节点：${b}`);
  if (a === b) { console.log('同一个节点。'); return; }

  const prev = new Map([[a, null]]);
  const via = new Map();
  const queue = [a];
  while (queue.length) {
    const cur = queue.shift();
    if (cur === b) break;
    for (const { e, to } of directedEdgesOf(cur)) {
      if (prev.has(to)) continue;
      prev.set(to, cur);
      via.set(to, { e });
      queue.push(to);
    }
  }

  if (!prev.has(b)) {
    console.log(`从 ${a} **推不出** ${b}（沿推导方向没有路径）。`);
    const rev = new Map([[b, null]]);
    const q2 = [b];
    while (q2.length) {
      const cur = q2.shift();
      if (cur === a) break;
      for (const { to } of directedEdgesOf(cur)) {
        if (rev.has(to)) continue;
        rev.set(to, cur); q2.push(to);
      }
    }
    if (rev.has(a)) {
      console.log(C.y(`⚠️ 反过来是通的：${b} ⟹ ${a}。要的可能是这条 ——`));
      cmdPath(b, a);
    } else {
      console.log(C.dim('两边都不通：它们在不同分支上。`path` 只走强边（推出 / 等价 / 定义引用），类比边不算。'));
    }
    return;
  }

  const chain = [];
  for (let cur = b; cur; cur = prev.get(cur)) chain.push(cur);
  chain.reverse();

  console.log(C.b(`# ${a}  ⟹  ${b}`) + C.dim(`  ${chain.length - 1} 跳（每一步都是前提 → 结论）`));
  for (let i = 0; i < chain.length; i++) {
    const n = byId.get(chain[i]);
    console.log(`  ${C.b(chain[i])}  ${n.label}`);
    if (i === chain.length - 1) break;
    const v = via.get(chain[i + 1]);
    if (v) {
      const tag = v.e.kind === 'equivalence' ? '⟺ 等价' : v.e.kind === 'definition' ? '⊂ 定义引用' : '⟹ 推出';
      console.log(`      ${C.dim('│')} ${tag}  ${C.dim(v.e.id || '')}${v.e.title ? C.dim(' · ' + v.e.title) : ''}`);
    }
  }
  console.log(C.dim(`\n每条边的完整证明：bun tools/mg.mjs edge <边id>`));
}

/* ------------------------------------------------------------ deps */
/* 一个节点的**直接前提**：谁推出它、它用了哪些定义。
   与 path 相反方向 —— 回答「这个结论站在什么上面」。 */
function cmdDeps(id, opt) {
  if (!byId.has(id)) die(`没有这个节点：${id}`);
  const depth = opt.depth || 1;
  const seen = new Set([id]);

  function walk(cur, level) {
    const n = byId.get(cur);
    const prem = premiseEdgesOf(cur);
    if (!prem.length) {
      console.log(`${'  '.repeat(level)}${C.b(cur)}  ${n.label} ${C.dim('（没有入边）')}`);
      return;
    }
    console.log(`${'  '.repeat(level)}${C.b(cur)}  ${n.label}`);
    for (const { e, to } of prem) {
      const pn = byId.get(to);
      const tag = e.kind === 'equivalence' ? '⟺' : e.kind === 'definition' ? '⊂定义' : '⟸推出';
      const mark = seen.has(to) ? C.dim(' ↺') : '';
      console.log(`${'  '.repeat(level + 1)}${C.dim(tag)} ${to}  ${pn ? pn.label : '?'}${mark}`);
      if (!seen.has(to) && level + 1 < depth && pn) {
        seen.add(to);
        walk(to, level + 2);
      }
    }
  }
  console.log(C.b(`# ${id} 的前提（深度 ${depth}）`));
  walk(id, 0);
}

/* ------------------------------------------------------------ ls */
function cmdLs(only) {
  if (only) {
    const r = regionById.get(only);
    if (!r) die(`没有这个星系：${only}（可用：${REGIONS.map((x) => x.id).join(' , ')}）`);
    const cl = CLUSTERS.filter((c) => c.parent === only);
    console.log(C.b(`# ${r.name}（${r.id}）`) + C.dim(`  ${cl.length} 个星团`));
    if (r.desc) console.log(C.dim(wrap(r.desc, 92)));
    for (const c of cl) {
      console.log(`  ${c.id}  ${c.name}  ${C.dim(`${c.nodes ? c.nodes.length : c.nodeCount} 点`)}`);
    }
    return;
  }
  console.log(C.b('数学星图') + C.dim(`  ${REGIONS.length} 星系 / ${CLUSTERS.length} 星团 / ${NODES.length} 节点 / ${EDGES.length} 边`));
  for (const r of REGIONS) {
    const cl = CLUSTERS.filter((c) => c.parent === r.id);
    if (!cl.length) continue;
    const cnt = cl.reduce((s, c) => s + (c.nodes ? c.nodes.length : c.nodeCount || 0), 0);
    console.log(`\n${C.b(r.name)}（${r.id}）${C.dim(` ${cl.length} 团 / ${cnt} 点`)}`);
    console.log('  ' + cl.map((c) => c.id).join('  '));
  }
  console.log(C.dim(`\n下一步：bun tools/mg.mjs ls <星系id>  或  bun tools/mg.mjs find <词>`));
}

/* ------------------------------------------------------------ stat */
function cmdStat() {
  console.log(C.b('数学星图 · 数据状态'));
  console.log(`  内容版本 ${G.meta.version}  ·  生成于 ${G.meta.generated}`);
  console.log(`  ${G.meta.counts.regions} 星系 / ${G.meta.counts.clusters} 星团 / ${G.meta.counts.nodes} 节点 / ${G.meta.counts.edges} 边`);
  console.log(C.dim(`  强边 ${G.meta.counts.strong} · 弱边（类比）${G.meta.counts.weak} · 推论 ${G.meta.counts.derived} · 英文页 ${G.meta.counts.en_pages}`));
  if (AL && AL._err) console.log(C.y(`  ⚠ 别名表没读进来（${AL._err}），只能按正名搜`));
  else console.log(C.dim(`  别名 ${(AL.nodes || []).length} 组 · 问法钩子 ${(AL.hooks || []).length} 条`));
}

/* ------------------------------------------------------------ 分发 */
function main() {
  const argv = process.argv.slice(2);
  const opt = { limit: 8, noBody: false, proof: false, depth: 1 };
  const pos = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--limit') { opt.limit = parseInt(argv[++i], 10) || 8; continue; }
    if (a === '--no-body') { opt.noBody = true; continue; }
    if (a === '--proof') { opt.proof = true; continue; }
    if (a === '--depth') { opt.depth = Math.max(1, parseInt(argv[++i], 10) || 1); continue; }
    if (a === '-h' || a === '--help') { usage(); return; }
    pos.push(a);
  }
  const [cmd, ...rest] = pos;

  switch (cmd) {
    case 'find': return cmdFind(rest, opt);
    case 'show': return cmdShow(rest, opt);
    case 'edge': return cmdEdge(rest[0]);
    case 'cluster': return cmdCluster(rest[0]);
    case 'path': return cmdPath(rest[0], rest[1]);
    case 'deps': return cmdDeps(rest[0], opt);
    case 'ls': return cmdLs(rest[0]);
    case 'stat': return cmdStat();
    default: usage();
  }
}

function usage() {
  console.log(`数学星图 · mg —— 查询命令

  bun tools/mg.mjs find <词> [更多词]   搜节点（名字 / 别名 / 标签 / 正文）
  bun tools/mg.mjs show <id>           节点详情（陈述、注、出入边）
  bun tools/mg.mjs show <id> --proof   连边的证明正文一起看
  bun tools/mg.mjs edge <边id>         一条边的完整证明
  bun tools/mg.mjs cluster <星团id>    星团内的节点清单
  bun tools/mg.mjs path <A> <B>        A ⟹ B 的有向推导链（走不通会说）
  bun tools/mg.mjs deps <id> [--depth N]  这个结论站在什么上面
  bun tools/mg.mjs ls [星系id]         星系 / 星团概览
  bun tools/mg.mjs stat                规模与数据新鲜度

  ⚠️ 读的是 dist/graph.json；内容改过要先 bun tools/build.mjs`);
}

main();
