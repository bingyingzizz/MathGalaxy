#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 构建 / 导出
   --------------------------------------------------------------------------
   一条命令产出四样东西（都在 dist/ 下）：

     dist/mathgalaxy.html   自包含单文件 —— 所有 CSS/JS/数据全内联，
                            拷到手机、U 盘、网盘，双击就能看，不需要服务器
     dist/graph.json        整张图的机器可读导出（AI 当数据库用）
     dist/graph.md          整张图的 Markdown 导出（直接粘给任何 AI）
     dist/llms.txt          给 AI 看的入口说明（llms.txt 约定）

   用法：
     bun tools/build.mjs            全部产出
     bun tools/build.mjs --json     只出 JSON/MD/llms.txt
     bun tools/build.mjs --html     只出单文件 HTML

   注：meta.generated 只在**内容真的变了**时才更新 —— 所以「没改内容、只是
       重跑了一次 build」不会让纳入 git 的 dist/ 变脏。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

/* ------------------------------------------------------------ 时间戳策略 */
/** 去掉时间戳后再序列化 —— 用来判断「除时间戳以外，内容有没有变」 */
function withoutStamp(d) {
  const copy = JSON.parse(JSON.stringify(d));
  if (copy.meta) delete copy.meta.generated;
  return JSON.stringify(copy);
}

/**
 * meta.generated 取什么值：内容没变就**沿用上一次的值**。
 *
 * 为什么：dist/ 是纳入 git 的产物，而构建时刻每次都不同。若每次都盖新时间戳，
 * 那么「什么都没改、只是重跑了一次 build」也会让工作区变脏 —— 那是噪声，
 * 而且会掩盖真正的改动。沿用之后，这个字段的含义变成「这份内容最后变化的时刻」：
 * 只有真的改了 src/data/，dist/ 才会变脏（那时本来就应该提交它）。
 */
function stableStamp(file, data) {
  try {
    const prev = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (withoutStamp(prev) === withoutStamp(data)) return prev.meta.generated;
  } catch { /* 文件不存在或读坏了 → 就当是新内容 */ }
  return new Date().toISOString();
}

/* ---------------------------------------------------------------- 载入内容 */
/** 造一个最小的 window，把引擎和内容脚本按顺序跑起来（不碰 DOM 的那部分） */
function loadMG() {
  const win = {
    MG: {}, console,
    document: {
      createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }),
      addEventListener() {}, getElementById: () => null
    },
    performance: { now: () => Date.now() },
    requestAnimationFrame: () => 0,
    addEventListener() {},
  };
  win.window = win;
  win.self = win;

  const files = [
    'core/config.js', 'core/util.js', 'core/camera.js', 'core/graph.js', 'core/layout.js',
    'core/layers.js',
    'data/regions.js', 'data/clusters.js', 'data/aliases.js', 'data/notation.js',
  ];
  const packDir = path.join(SRC, 'data', 'packs');
  fs.readdirSync(packDir).sort().forEach(f => { if (f.endsWith('.js')) files.push('data/packs/' + f); });

  const ctx = vm.createContext(win);
  for (const rel of files) {
    const code = fs.readFileSync(path.join(SRC, rel), 'utf8');
    try { vm.runInContext(code, ctx, { filename: rel }); }
    catch (e) { throw new Error(`载入 ${rel} 失败：${e.message}`); }
  }
  return win.MG;
}

/* ---------------------------------------------------------------- 组装图 */
function buildGraph(MG) {
  const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
  MG.computeLayout(graph);
  // 层号在浏览器里是现算的；构建时也算一遍，只为**导出给 AI**（graph.json 的
  // 节点带 layer，好让「每个节点都有依赖深度」这句话在数据里为真）。
  // ⚠️ 层号仍然不写进 src/data/ —— 内容里永远没有层号。
  MG.computeLayers(graph);
  return graph;
}

/* ---------------------------------------------------------------- JSON 导出 */
function exportJSON(MG, graph) {
  const T = MG.theme;
  const strengthOf = e => e.strength || (T.edgeStrength && T.edgeStrength[e.kind]) || 'strong';

  return {
    meta: {
      name: '数学星图 MathGalaxy',
      schema: 'mathgalaxy/v1',
      generated: new Date().toISOString(),
      counts: {
        regions: graph.regions.length,
        clusters: graph.clusters.filter(c => c.nodes.length).length,
        nodes: graph.nodes.length,
        edges: graph.edges.length,
        strong: graph.edges.filter(e => strengthOf(e) === 'strong').length,
        weak: graph.edges.filter(e => strengthOf(e) === 'weak').length,
      },
      readingGuide: {
        layers: '星系(region) → 星团(cluster) → 恒星(node)',
        clusterMeaning: '星团 = 为了造出某个「能用的东西」而存在的一整套结果，内部关系密、对外整块连接',
        contentPolicy: {
          constructive: '每一层都由上一层**构造**出来（子集/幂集/笛卡尔积/商集/函数空间……），用到的概念都要在更低的层里有节点；' +
            '禁止用「满足某组性质的对象（在同构意义下唯一）」引入新东西 —— 那是公理刻画，性质必须作为**定理**从构造里推出来。' +
            '（例：ℝ 是「有理 Cauchy 列模去零列」造出来的，域/序/确界原理是定理，不是定义。）',
          dedupe: '同一结论只录一次 —— 内容来自多门课程的笔记，重复的定理已合并成一个节点',
          mostGeneral: '只保留最通用的版本（条件最弱、结论最强）；特例写在 notes 里，除非它有独立用途',
          preferGeneral: '同一个结论有多种证法时，保留推广程度最高的那条路径',
        },
        edgeKind: {
          implication: '推出（有向，sources → target）',
          equivalence: '等价（无向，proofs 是两个方向的证明）',
          definition: '定义引用（无向，某结论的陈述里用到了某定义）',
          analogy: '类比（无向，思想相通但不是逻辑蕴含）',
        },
        edgeStrength: {
          strong: '标准逻辑关系 —— 查证明、做推理时只走这些',
          weak: '类比/思想相通 —— 只在「卡住了、想找远房关系」时探索用',
        },
      },
    },

    regions: graph.regions.map(r => ({
      id: r.id, name: r.name, en: r.en, desc: r.desc,
      color: r.color, nodeCount: r.stat ? r.stat.count : 0,
    })),

    clusters: graph.clusters.filter(c => c.nodes.length).map(c => ({
      id: c.id, name: c.name, parent: c.parent, desc: c.desc,
      nodeCount: c.nodes.length,
      nodes: c.nodes.map(n => n.id),
    })),

    nodes: graph.nodes.map(n => ({
      id: n.id,
      type: n.type,
      label: n.label,
      title: n.title,
      region: n.regions[0] || null,
      regions: n.regions,
      cluster: n.cluster || null,
      layer: n.layer,
      tags: n.tags,
      statement: n.statement,
      notes: n.notes || '',
      refs: n.refs,
    })),

    edges: graph.edges.map(e => {
      const strength = strengthOf(e);
      if (e.kind === 'equivalence') {
        return {
          id: e.id, kind: e.kind, strength, a: e.a, b: e.b,
          title: e.title || '', note: e.note || '',
          proofs: (e.proofs || []).map(p => ({ label: p.label, text: p.text })),
        };
      }
      if (e.kind === 'definition') {
        return {
          id: e.id, kind: e.kind, strength,
          definition: e.definition, usedBy: e.usedBy,
          note: e.note || '',
        };
      }
      if (e.kind === 'analogy') {
        return {
          id: e.id, kind: e.kind, strength, a: e.a, b: e.b,
          title: e.title || '', note: e.note || e.proof || '',
        };
      }
      return {
        id: e.id, kind: e.kind, strength,
        sources: e.sources, target: e.target,
        title: e.title || '', proof: e.proof || '', note: e.note || '',
      };
    }),

    clusterLinks: graph.clusterLinks
      .filter(l => l.count >= (MG.config.clusterLink?.minEdges ?? 2))
      .map(l => ({ a: l.a, b: l.b, count: l.count, label: l.label || '', explicit: !!l.explicit })),
  };
}

/* ---------------------------------------------------------------- Markdown */
function exportMarkdown(MG, graph, data) {
  const L = [];
  const p = s => L.push(s);
  const nodeById = graph.byId;

  p('# 数学星图 · 全量导出');
  p('');
  p(`> 由 \`tools/build.mjs\` 自动生成于 ${data.meta.generated}`);
  p(`> ${data.meta.counts.regions} 星系 / ${data.meta.counts.clusters} 星团 / ` +
    `${data.meta.counts.nodes} 节点 / ${data.meta.counts.edges} 连线` +
    `（强边 ${data.meta.counts.strong}，弱边 ${data.meta.counts.weak}）`);
  p('');
  p('> ⛔ **这是全量 bulk 导出（约 390 KB），不要单次抓取** —— 抓取工具单次只能返回');
  p('> 约 1000 词元（中文约 3 KB），你会只看到开头一小段，而且同一地址反复抓也只');
  p('> 会拿到同样的开头。**要检索请走 `llms.txt` 里的检索协议**：');
  p('> `index.md` → `index/<星团id>.md` → `nodes/<节点id>.md`。');
  p('> 这份文件只在「一次性下载 / 离线打包 / 本地处理」时才用。');
  p('');
  p('两个检索模式（见文末「强弱边」）：');
  p('- **常规模式**：只走 `implication` / `equivalence` / `definition` —— 做题、查证明用');
  p('- **探索模式**：再加上 `analogy` —— 卡住了想找远房关系时用');
  p('');
  p('---');
  p('');

  /* 按星系 → 星团 组织节点 */
  for (const r of data.regions) {
    const rs = graph.regions.find(x => x.id === r.id);
    if (!rs || !rs.stat) continue;
    p(`## 星系：${r.name}${r.en ? `（${r.en}）` : ''}`);
    if (r.desc) p(`> ${r.desc}`);
    p('');

    const clusters = data.clusters.filter(c => c.parent === r.id);
    const loose = rs ? graph.nodes.filter(n =>
      n.regions.includes(r.id) && !n.clusterObj) : [];

    const emit = (title, nodes, desc) => {
      if (!nodes.length) return;
      p(`### ${title}`);
      if (desc) p(`> ${desc}`);
      p('');
      for (const n of nodes) {
        const t = MG.typeStyle(n.type).name;
        p(`#### ${n.label}　\`${n.id}\``);
        p(`*${t}*　${n.title}`);
        p('');
        if (n.statement) { p(n.statement.trim()); p(''); }
        if (n.notes) { p(n.notes.trim()); p(''); }
        if (n.refs && n.refs.length) { p(`参考：${n.refs.join('；')}`); p(''); }
      }
    };

    for (const c of clusters) {
      const nodes = graph.nodes.filter(n => n.cluster === c.id);
      emit(`星团：${c.name}`, nodes, c.desc);
    }
    emit('（未归入星团）', loose, '');
  }

  /* 连线总表 */
  p('---');
  p('');
  p('## 全部连线（含推导过程）');
  p('');
  const strong = data.edges.filter(e => e.strength === 'strong');
  const weak = data.edges.filter(e => e.strength === 'weak');

  const nm = id => (nodeById[id] ? nodeById[id].label : id);

  p('### 强边（标准逻辑关系）');
  p('');
  for (const e of strong) {
    if (e.kind === 'implication') {
      p(`#### ${e.sources.map(nm).join(' + ')} ⟹ ${nm(e.target)}　\`${e.id}\``);
      if (e.title) p(`*${e.title}*`);
      p('');
      if (e.proof) { p(e.proof.trim()); p(''); }
      if (e.note) { p(`> ${e.note}`); p(''); }
    } else if (e.kind === 'equivalence') {
      p(`#### ${nm(e.a)} ⟺ ${nm(e.b)}　\`${e.id}\``);
      if (e.title) p(`*${e.title}*`);
      p('');
      for (const pr of (e.proofs || [])) {
        p(`**${pr.label}**`);
        p('');
        p(pr.text.trim());
        p('');
      }
      if (e.note) { p(`> ${e.note}`); p(''); }
    } else {
      p(`#### 定义引用：「${nm(e.definition)}」→ ${nm(e.usedBy)}　\`${e.id}\``);
      p('');
      if (e.note) { p(e.note.trim()); p(''); }
    }
  }

  if (weak.length) {
    p('### 弱边（类比 / 思想相通）');
    p('');
    p('> ⚠️ 这些**不是**逻辑蕴含，只在「卡住了、想找远房关系」时用。');
    p('');
    for (const e of weak) {
      p(`#### ${nm(e.a)} ～ ${nm(e.b)}　\`${e.id}\``);
      if (e.title) p(`*${e.title}*`);
      p('');
      if (e.note) { p(e.note.trim()); p(''); }
    }
  }

  /* 星团级连线 */
  if (data.clusterLinks.length) {
    p('---');
    p('');
    p('## 星团级连接（整块对整块）');
    p('');
    const cname = id => {
      const c = data.clusters.find(x => x.id === id);
      return c ? c.name : id;
    };
    for (const l of data.clusterLinks) {
      p(`- **${cname(l.a)} ↔ ${cname(l.b)}**　${l.count} 条节点级连线` +
        (l.label ? `　（${l.label}）` : ''));
    }
    p('');
  }

  return L.join('\n');
}

/* ==========================================================================
/* ==========================================================================
   AI 检索产物（按需寻址）—— 生成器
   --------------------------------------------------------------------------
   定标（全部是本地服务 + 真抓取实测）：

     ✓ 完整读回：1247 B（转义后 853）、1292 B（llms.txt）、1091 B
     ✗ 被截断　：1444 B、1457 B、1483 B、1495 B
     ✗ 被截断　：854 B 的**单行 JSON** —— JSON 标点密集，词元/字符比高得多

   所以两条判据都要满足：
     ① 字节 ≤ 1300（主判据，实测边界在 1292–1444 之间）
     ② 转义后的字符数 ≤ 1050（防 markdown/LaTeX 密集的极端情况）
   另外：**索引一律用纯文本 .md，不用 JSON**（JSON 在这个上限下活不下来）。

   原则：宁可多一个 `.2.md` 续段，也不要让 AI 拿到半截。
   ========================================================================== */

/* ---------------------------------------------------------------- 预算 */
const AI_MAXB = 1300;        // 硬上限（字节）—— 实测 1292 B 能读回、1444 B 被切
const AI_ESC = 1050;         // 硬上限（转义后的字符数），防 markdown/LaTeX 密集的极端

/** 抓取工具会把这些字符转义（每个前面加一个同样的字符） */
const AI_ESCAPABLE = /[\\`*_#\[\]<>~]/g;
/** 代价 = 转义后的字符数 */
const aiCost = s => s.length + (s.match(AI_ESCAPABLE) || []).length;
const aiBytes = s => Buffer.byteLength(s, 'utf8');
const aiFits = s => aiBytes(s) <= AI_MAXB && aiCost(s) <= AI_ESC;

/* 节点文件里两个小节的名字 —— 续页要沿用同一套标题，跳转行也按它定位 */
const SEC_IN = '## 为什么成立（入边，证明在 proofs/）';
const SEC_OUT = '## 它能推出什么 / 谁在用它';
const SEC_STMT = '陈述（续）';
/** 小节名去掉 `## ` 前缀 —— 续页的标题自己会加一个，不去就变成「## ## …」 */
const secName = s => String(s).replace(/^##\s*/, '');

/** 把塞不进节点第 1 页的内容按小节打包成续页。
    规则：换小节一定另起一页（页首标题才诚实）；同一小节超预算也另起。 */
function packPages(node, items, budget) {
  const pages = [];
  let cur = null;
  const headOf = (k, sec) => `# ${node.label}　\`${node.id}\`　·　续页（第 ${k} 页）\n` +
    `根 \`../\`　·　第 1 页 \`nodes/${node.id}.md\`\n\n## ${secName(sec)}${sec === SEC_STMT ? '' : '（续）'}\n`;
  for (const it of items) {
    if (cur && it.sec !== cur.sec) { pages.push(cur); cur = null; }
    const k = pages.length + 2;
    if (!cur) cur = { sec: it.sec, lines: [] };
    const size = aiBytes(headOf(k, it.sec) + cur.lines.map(l => l + '\n').join('') + it.text + '\n');
    if (cur.lines.length && size > budget) {
      pages.push(cur);
      cur = { sec: it.sec, lines: [] };
    }
    cur.lines.push(it.text);
  }
  if (cur) pages.push(cur);
  return pages;
}

/** 一条边的正文：证明（implication / equivalence）或说明（definition / analogy） */
function edgeBody(e) {
  if (e.kind === 'implication') return (e.proof || '').trim();
  if (e.kind === 'equivalence') {
    return (e.proofs || []).map(p => `**${p.label || ''}**\n\n${(p.text || '').trim()}`).join('\n\n');
  }
  return (e.note || '').trim();
}
/** 边的补充说明（definition / analogy 的 note 已经当正文用过了，不再重复） */
function edgeTail(e) {
  if (e.kind === 'definition' || e.kind === 'analogy') return '';
  return (e.note || '').trim();
}

/** 把一个格式串切成若干块，使 head + 块 + tail 能一次读完 */
function aiChunk(body, head, tail, resB = 150) {
  const fits = s => aiBytes(s) + resB <= AI_MAXB && aiCost(s) + resB <= AI_ESC;
  if (fits(head + body + tail)) return [body];
  const chunks = [];
  let cur = '';
  for (const p of body.split(/\n\s*\n/)) {
    if (cur && !fits(head + cur + '\n\n' + p + tail)) { chunks.push(cur); cur = ''; }
    if (!fits(head + p + tail)) {
      if (cur) { chunks.push(cur); cur = ''; }
      let s = '';
      for (const ch of p) {
        if (s && !fits(head + s + ch + tail)) { chunks.push(s); s = ''; }
        s += ch;
      }
      if (s) chunks.push(s);
      continue;
    }
    cur += (cur ? '\n\n' : '') + p;
  }
  if (cur) chunks.push(cur);
  return chunks.length ? chunks : [''];
}

/** 按「一块一个文件」输出分段结果；续段带指路行 */
function emitChunks(files, dir, base, head, body, tail, resB) {
  const chunks = aiChunk(body, head, tail, resB);
  chunks.forEach((c, i) => {
    const name = `${base}${i ? '.' + (i + 1) : ''}`;
    let t = head + c + '\n';
    if (i < chunks.length - 1) t += `\n> 续见 ${dir}/${base}.${i + 2}.md\n`;
    else if (tail) t += '\n' + tail + '\n';
    files.push({ path: `${dir}/${name}.md`, text: t });
  });
  return chunks.length;
}

function exportAIProducts(MG, graph, data) {
  const files = [];
  const byId = graph.byId;
  const label = id => (byId[id] ? byId[id].label : id);
  const cname = id => (graph.clusterById[id] ? graph.clusterById[id].name : id);
  const rname = id => (graph.regionById[id] ? graph.regionById[id].name : id);
  const typeName = t => MG.typeStyle(t).name;
  const strengthOf = e => e.strength || (MG.theme.edgeStrength && MG.theme.edgeStrength[e.kind]) || 'strong';

  /* ------------------------------------------------------------ 邻接表 */
  const inc = new Map(), out = new Map();
  const push = (m, k, v) => { if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
  for (const e of graph.edges) {
    if (e.kind === 'implication') {
      (e.sources || []).forEach(s => push(out, s, e));
      push(inc, e.target, e);
    } else if (e.kind === 'definition') {
      push(out, e.definition, e);
      push(inc, e.usedBy, e);
    } else {                                   // equivalence / analogy：无向
      push(out, e.a, e); push(inc, e.b, e);
      push(out, e.b, e); push(inc, e.a, e);
    }
  }

  /* --------------------------------------------- 一条边一个 proofs/ 文件 */
  /* 证明**一律**外置 —— 这样「证明在哪」永远只有一条规矩，不用猜。 */
  for (const e of graph.edges) {
    const text = edgeBody(e);
    if (!text) continue;
    const from = e.kind === 'implication' ? (e.sources || []).map(s => `\`${s}\` ${label(s)}`).join(' + ')
      : e.kind === 'definition' ? `\`${e.definition}\` ${label(e.definition)}`
      : `\`${e.a}\` ${label(e.a)}`;
    const to = e.kind === 'implication' ? e.target : e.kind === 'definition' ? e.usedBy : e.b;
    const kindName = { implication: '推出', equivalence: '等价', definition: '定义引用', analogy: '类比（弱边）' }[e.kind];
    const head = `# ${e.title || e.id}\n\`${e.id}\` · ${kindName} · ${strengthOf(e)} 边 · 根 \`../\`\n\n` +
      `${from} → \`${to}\` ${label(to)}\n\n`;
    const tail = edgeTail(e) ? `> ${edgeTail(e)}` : '';
    emitChunks(files, 'proofs', e.id, head, text, tail, 200);
  }

  /* ------------------------------------------------------- 节点文件 */
  const notesOut = [];
  const pagesOf = new Map();       // 节点 id → 它的每一页正文（用来做「邻居是否都可达」的断言）
  for (const n of graph.nodes) {
    const head = `# ${n.label}　\`${n.id}\`\n${n.title}\n` +
      `layer ${n.layer} · ${typeName(n.type)} · ${n.cluster ? cname(n.cluster) : '—'} · ` +
      `${(n.regions || []).map(rname).join('+')}\n\n`;
    const refs = (n.refs || []).length ? `\nrefs: ${n.refs.join('；')}\n` : '';
    const notes = (n.notes || '').trim();
    const notesPtr = notes ? `\n> 说明见 \`notes/${n.id}.md\`\n` : '';

    /* ⚠️ 预算一律**拼接后实测**，不要预测 —— 2026-09-23 连着踩了两轮：
       ① 「说明塞得下就内联」是在跳转行之前判的，跳转行一加就顶破；
       ② 先扣 refs 再扣说明再扣邻接，一路减法下来和实际拼出来的长度对不上。
       现在改成：每次要加东西就先拼一遍、量一遍。 */
    const JUMP_RESERVE = 190;      // 最多三条「续页跳转」的位子

    // 说明：只有确实短小的才内联（这一步不看陈述，避免循环依赖）
    const notesInline = !!notes && aiBytes(notes) <= 300 &&
      aiBytes(head + refs) + aiBytes(notes) + 760 <= AI_MAXB;
    const notesTail = !notes ? '' : (notesInline ? '\n## 说明\n' + notes + '\n' : notesPtr);
    const mandatoryTail = refs + notesTail;

    const stmtChunks = aiChunk((n.statement || '').trim(), head, refs,
      aiBytes(mandatoryTail) + JUMP_RESERVE + 320);

    let text = head + stmtChunks[0] + '\n';
    const canAdd = extra => aiBytes(text + extra + mandatoryTail) + JUMP_RESERVE <= AI_MAXB;
    const over = [];               // 塞不下的内容 → 续页

    /* 入边：它为什么成立 —— 一行一条，正文都在 proofs/ */
    const ins = (inc.get(n.id) || []).slice().sort((a, b) => {
      const rank = e => (e.kind === 'implication' ? 0 : e.kind === 'equivalence' ? 1 : 2);
      return rank(a) - rank(b);
    });
    if (ins.length) {
      const lines = ins.map(e => {
        const ids = e.kind === 'implication' ? (e.sources || [])
          : e.kind === 'definition' ? [e.definition]
          : [e.a === n.id ? e.b : e.a];
        // 每个 id 都单独包反引号 —— 多来源的边也要能逐个 id 复制
        const from = ids.map(s => '`' + s + '` ' + label(s)).join(' + ');
        const ttl = e.kind === 'definition' ? `用到了定义 ${label(e.definition)}` : (e.title || e.id);
        return `- ${from}：${ttl}　proofs/${e.id}.md`;
      });
      let sec = SEC_IN + '\n';
      let shown = 0;
      for (const l of lines) {
        if (!canAdd('\n' + sec + l + '\n')) break;
        sec += l + '\n'; shown++;
      }
      if (shown) text += '\n' + sec;
      for (let i = shown; i < lines.length; i++) over.push({ sec: SEC_IN, text: lines[i] });
    }

    /* 出边：它能推出什么 / 谁在用它 */
    const ous = (out.get(n.id) || []).map(e => {
      if (e.kind === 'implication') return `- ⇒ \`${e.target}\` ${label(e.target)}`;
      if (e.kind === 'definition') return `- 被 \`${e.usedBy}\` ${label(e.usedBy)} 用`;
      if (e.kind === 'analogy') return `- ～弱边 \`${e.a === n.id ? e.b : e.a}\` ${label(e.a === n.id ? e.b : e.a)}`;
      return `- ⟺ \`${e.a === n.id ? e.b : e.a}\` ${label(e.a === n.id ? e.b : e.a)}`;
    });
    if (ous.length) {
      let sec = SEC_OUT + '\n';
      let shown = 0;
      for (const l of ous) {
        if (!canAdd('\n' + sec + l + '\n')) break;
        sec += l + '\n'; shown++;
      }
      if (shown) text += '\n' + sec;
      for (let i = shown; i < ous.length; i++) over.push({ sec: SEC_OUT, text: ous[i] });
    }

    /* ------------------------------------------------ 续页 */
    /* ⚠️ 绝不写「见 graph.json」—— 那是 550 KB 的 bulk 文件，AI 单次抓取
       只会拿到开头，等于把读者推进坑里。塞不下的一律**续页**承载，
       命名与 proofs/ 同一套：第 1 页 <base>.md、第 k 页 <base>.<k>.md。 */
    const items = [];
    stmtChunks.slice(1).forEach(c => items.push({ sec: SEC_STMT, text: c }));
    const pages = packPages(n, items.concat(over), AI_MAXB - 90);
    const firstOf = {};
    pages.forEach((p, i) => { if (firstOf[p.sec] == null) firstOf[p.sec] = i + 2; });

    text += mandatoryTail;

    // 第 1 页的跳转行：路径一定指向真实存在的那一页
    const jump = [];
    if (firstOf[SEC_STMT] != null) {
      jump.push([SEC_STMT, `> 陈述续见 \`nodes/${n.id}.${firstOf[SEC_STMT]}.md\``]);
    }
    if (firstOf[SEC_IN] != null) {
      jump.push([SEC_IN, `- …另有入边，续页见 \`nodes/${n.id}.${firstOf[SEC_IN]}.md\``]);
    }
    if (firstOf[SEC_OUT] != null) {
      jump.push([SEC_OUT, `- …另有出边，续页见 \`nodes/${n.id}.${firstOf[SEC_OUT]}.md\``]);
    }
    for (const [sec, line] of jump) {
      if (sec === SEC_STMT) {
        const anchor = head + stmtChunks[0];
        if (text.startsWith(anchor)) {
          text = anchor + '\n' + line + '\n' + text.slice(anchor.length);
        }
      } else if (text.includes(sec + '\n')) {
        const i = text.indexOf(sec + '\n');
        let at = text.indexOf('\n## ', i + sec.length + 1);
        if (at < 0) at = text.indexOf('\nrefs:', i);
        if (at < 0) at = text.length;
        text = text.slice(0, at) + '\n' + line + '\n' + text.slice(at);
      } else {
        // 本节一行都没内联：把标题和跳转一起补在 refs 前（或末尾）
        const at = text.indexOf('\nrefs:') < 0 ? text.length : text.indexOf('\nrefs:');
        text = text.slice(0, at) + `\n${sec}\n${line}\n` + text.slice(at);
      }
    }
    if (!notesInline && notes) {
      notesOut.push(n.id);
      emitChunks(files, 'notes', n.id, `# ${n.label}　\`${n.id}\`　·　说明\n根 \`../\`\n\n`, notes, '', 120);
    }

    files.push({ path: `nodes/${n.id}.md`, text });
    const texts = [text];
    pages.forEach((p, i) => {
      const k = i + 2;
      let t = `# ${n.label}　\`${n.id}\`　·　续页（第 ${k} 页）\n` +
        `根 \`../\`　·　第 1 页 \`nodes/${n.id}.md\`` +
        (k > 2 ? `　·　上一页 \`nodes/${n.id}.${k - 1}.md\`` : '') + '\n\n' +
        `## ${secName(p.sec)}${p.sec === SEC_STMT ? '' : '（续）'}\n` + p.lines.join('\n') + '\n';
      if (i < pages.length - 1) t += `\n> 续见 \`nodes/${n.id}.${k + 1}.md\`\n`;
      texts.push(t);
      files.push({ path: `nodes/${n.id}.${k}.md`, text: t });
    });
    pagesOf.set(n.id, texts);
  }


  /* ------------------------------------------------------------ 目录 */
  /* ⚠️ 目录用**纯文本 .md**，不用 JSON —— 实测 JSON 标点密集，854 B 就被截断。 */
  const regions = graph.regions.map(r => {
    const cs = graph.clusters.filter(c => c.parent === r.id && c.nodes.length);
    return { r, cs };
  }).filter(x => x.cs.length);

  files.push({
    path: 'index.md',
    text: `# 数学星图 · 目录\n\n` +
      `数据根 = 本文件所在目录。下一步：读 \`index/<星团id>.md\` 拿节点清单。\n` +
      `规模：${data.meta.counts.regions} 星系 / ${data.meta.counts.clusters} 星团 / ` +
      `${data.meta.counts.nodes} 节点 / ${data.meta.counts.edges} 连线。\n\n` +
      regions.map(({ r, cs }) =>
        `## ${r.name}（${r.id}）\n` + cs.map(c => `- ${c.id}　${c.name}`).join('\n')).join('\n\n') + '\n',
  });

  for (const { r, cs } of regions) {
    const lines = cs.map(c => `- ${c.id}　${c.name}　中心天体 ${c.hub}　${c.nodes.length} 点`);
    const head1 = `# ${r.name}（${r.id}）· 星团目录\n\n${r.desc}\n\n`;
    const parts = [];
    let cur = '';
    for (const l of lines) {
      if (cur && aiBytes(head1 + cur + l + '\n') > AI_MAXB - 150) { parts.push(cur); cur = ''; }
      cur += l + '\n';
    }
    if (cur) parts.push(cur);
    const N = parts.length;
    parts.forEach((t, i) => {
      const k = i + 1;
      const head = k === 1
        ? head1.replace('\n\n', `\n第 1/${N} 页　·　根 \`../\`\n\n`)
        : `# ${r.name}（${r.id}）· 星团目录（第 ${k}/${N} 页）\n` +
          `根 \`../\`　·　第 1 页 \`index/${r.id}.md\`` +
          (k > 2 ? `　·　上一页 \`index/${r.id}.${k - 1}.md\`` : '') + '\n\n';
      let text = head + t;
      if (r.desc && k === 1) { /* desc 已在 head1 里 */ }
      if (k < N) text += `\n> 续见 \`index/${r.id}.${k + 1}.md\`\n`;
      files.push({ path: `index/${r.id}${k > 1 ? '.' + k : ''}.md`, text });
    });
  }

  /* 团清单 · 节点多就分页
     ⚠️ 分页**必须**给每一页不同的文件名（第 1 页 <c>.md、第 k 页 <c>.<k>.md，
     与 proofs/ 同一套）。2026-09-23 踩过：写在 forEach 里时路径没带页码，
     后一页把前一页**覆盖**掉 —— analysis.measure 的 18 个节点只剩最后 2 个，
     而且第 1 页（入口）根本不存在，AI 顺着协议读到这里就断了。 */
  for (const c of graph.clusters) {
    if (!c.nodes.length) continue;
    const lines = c.nodes.slice().sort((a, b) => a.layer - b.layer)
      .map(n => `- ${n.id}　${n.label}　layer ${n.layer}`);
    const head1 = `# ${c.name}（${c.id}）· 节点清单\n\n${c.desc}\n` +
      `中心天体 ${c.hub}　·　${c.nodes.length} 个节点　·　根 \`../\`\n\n`;
    const chunks = [];
    let cur = '';
    for (const l of lines) {
      if (cur && aiBytes(head1 + cur + l + '\n') > AI_MAXB - 150) { chunks.push(cur); cur = ''; }
      cur += l + '\n';
    }
    if (cur) chunks.push(cur);
    const N = chunks.length;
    chunks.forEach((t, i) => {
      const k = i + 1;
      const head = k === 1
        ? `# ${c.name}（${c.id}）· 节点清单（第 1/${N} 页）\n\n${c.desc}\n` +
          `中心天体 ${c.hub}　·　${c.nodes.length} 个节点　·　根 \`../\`` +
          (N > 1 ? `　·　续页 \`index/${c.id}.2.md\`` : '') + '\n\n'
        : `# ${c.name}（${c.id}）· 节点清单（第 ${k}/${N} 页）\n` +
          `根 \`../\`　·　第 1 页 \`index/${c.id}.md\`` +
          (k > 2 ? `　·　上一页 \`index/${c.id}.${k - 1}.md\`` : '') + '\n\n';
      let text = head + t;
      if (k < N) text += `\n> 续见 \`index/${c.id}.${k + 1}.md\`\n`;
      files.push({ path: `index/${c.id}${k > 1 ? '.' + k : ''}.md`, text });
    });
  }

  return { files, notesOut, pagesOf };
}

/* ==========================================================================
   断言：产物体积、路径唯一、跳转有效、邻居可达
   ========================================================================== */
function assertAI(MG, graph, files, pagesOf) {
  const errs = [];

  /* ① 路径必须唯一 —— 分页写错路径时后一页会**覆盖**前一页，
        这是最隐蔽的一类 bug（2026-09-23 踩过：团清单只剩最后一页）。 */
  const seen = new Set();
  for (const f of files) {
    if (seen.has(f.path)) errs.push(`产物路径重复（后写的会盖掉前面的）：${f.path}`);
    seen.add(f.path);
  }

  /* ② 不许把 AI 指回 bulk 文件，也不许出现「…另有 N 条」却不给去路 */
  for (const f of files) {
    if (/见\s*`?graph\.(json|md)/.test(f.text)) {
      errs.push(`产物指向 bulk 文件（AI 单次抓不到）：${f.path}`);
    }
    if (/另有 \d+ 条/.test(f.text) && !/见\s*`?(nodes|index|notes|proofs)\//.test(f.text)) {
      errs.push(`「…另有 N 条」没给出去路：${f.path}`);
    }
  }

  /* ③ 分页里的跳转必须真的存在（写错页码 / 漏生成都要报） */
  const paths = new Set(files.map(f => f.path));
  for (const f of files) {
    for (const m of f.text.matchAll(/`((?:nodes|index|notes|proofs)\/[^`]+\.md)`/g)) {
      if (/[<>]/.test(m[1])) continue;                 // `index/<星团id>.md` 这种是占位写法，不是真路径
      if (!paths.has(m[1])) errs.push(`${f.path} 指向不存在的文件：${m[1]}`);
    }
  }

  /* ④ 每个节点页面上必须能看到它的**全部**邻居 id ——
        出边/入边被截断却没人管，就等于「顺着图走」走不下去。 */
  if (pagesOf) {
    const ids = new Set(graph.nodes.map(n => n.id));
    const neigh = new Map();
    const add = (a, b) => {
      if (!neigh.has(a)) neigh.set(a, new Set());
      neigh.get(a).add(b);
    };
    for (const e of graph.edges) {
      if (e.kind === 'implication') {
        (e.sources || []).forEach(s => { add(s, e.target); add(e.target, s); });
      } else if (e.kind === 'definition') { add(e.definition, e.usedBy); add(e.usedBy, e.definition); }
      else { add(e.a, e.b); add(e.b, e.a); }
    }
    for (const n of graph.nodes) {
      const pages = pagesOf.get(n.id) || [];
      const all = pages.join('\n');
      for (const nb of (neigh.get(n.id) || [])) {
        if (!ids.has(nb)) continue;
        if (!all.includes('`' + nb + '`')) {
          errs.push(`节点 ${n.id} 的页面上找不到邻居 ${nb}（走到这里就断了）`);
        }
      }
    }
  }

  for (const f of files) {
    const c = aiCost(f.text), b = aiBytes(f.text);
    if (b > AI_MAXB || c > AI_ESC) {
      errs.push(`产物过大：${f.path} = ${b} B / 转义后 ${c} 字符` +
        `（上限 ${AI_MAXB} B 且 ${AI_ESC} 字符）`);
    }
    if (!/\n/.test(f.text)) errs.push(`产物是单行、抓取工具不友好：${f.path}`);
  }
  const layerOf = id => (graph.layerOf ? graph.layerOf(id) : null);
  const compOf = id => (graph.componentOf ? graph.componentOf(id) : null);
  for (const e of graph.edges) {
    if (e.kind === 'equivalence') {
      const la = layerOf(e.a), lb = layerOf(e.b);
      if (la !== lb) errs.push(`等价边两端不同层：${e.id}（${e.a}=${la}，${e.b}=${lb}）`);
      continue;
    }
    if (e.kind === 'analogy') continue;                     // 弱边不参与分层
    const pairs = e.kind === 'implication'
      ? (e.sources || []).map(s => [s, e.target])
      : [[e.definition, e.usedBy]];
    for (const [from, to] of pairs) {
      if (compOf(from) === compOf(to)) continue;            // 同一等价类，不强求
      const a = layerOf(from), b = layerOf(to);
      if (!(b > a)) errs.push(`层号与边方向矛盾：${e.id} 的 ${from}(${a}) → ${to}(${b})`);
    }
  }
  return errs;
}


/* ---------------------------------------------------------------- llms.txt */
/* ⚠️ 它本身也必须能一次抓完：实测曾 3.6 KB（估 1004 词元）被截断在「两种检索模式」
   那一行，AI 根本没读到走边规则。所以协议在前，细节全部挪去 reading.md / policy.md。 */
function exportLlmsTxt(data, base = '') {
  const c = data.meta.counts;
  const live = base === '' ? '线上：https://bingyingzizz.github.io/mathgalaxy/\n' : '';
  return `# 数学星图 MathGalaxy

可检索的数学知识图谱：节点是定理/定义/引理，边是逻辑关系。
**给 AI 用：按协议取数据，不要单次抓 graph.json。**
${c.regions} 星系 / ${c.clusters} 星团 / ${c.nodes} 节点 / ${c.edges} 连线。
数据根 = 本文件所在目录。${live}

## 检索协议

0. \`${base}alias.md\` —— 大白话 / 英文名 → 节点 id。
1. \`${base}index.md\` —— 星系 → 星团 id。
2. \`${base}index/<星系id>.md\` —— 该星系的星团（名字、中心天体、点数）。
3. \`${base}index/<星团id>.md\` —— 该团节点清单（id / 名称 / 层号）。
4. \`${base}nodes/<节点id>.md\` —— 陈述 + 出入边（每条带证明路径）。
   说明在 \`notes/<节点id>.md\`，边的正文在 \`proofs/<边id>.md\`。
顺着 id 继续读就是沿图走。

⚠ **单次抓取约 1000 词元**，抓取工具还会转义
\`# * [ ] \\\` _ ~\`。产物都按这个尺度切过：**放不下的分页成
\`<路径>.2.md\`**，首页永远是 \`<路径>.md\`。
\`${base}graph.json\` / \`${base}graph.md\` 是几百 KB 的全量导出：
**只用来下载，不要用来检索**。

## 其它

\`${base}reading.md\` 结构/边 · \`${base}policy.md\` 准则 · \`${base}hubs.md\` 枢纽 · \
\`${base}notation.md\` 记号表。
LaTeX 由 KaTeX 渲染；\`label\` 等字段是纯文本。
`;
}

/* ------------------------------------------------------------- reading.md */
function exportReading(data, base = '') {
  return `# 数学星图 · 怎么读这张图

数据见 \`${base}index.md\`。

## 三层尺度

星系（数学领域）→ 星团（一套自足的装置）→ 节点（定理 / 定义 / 引理）。
**星团 = 为了造出某个「能用的东西」而存在的一整套结果**，不按课程分。
星团的 \`hub\` 是**中心天体**：装置被造出来就是为了得到它。

## 边的四种 kind

- \`implication\`（sources → target，带证明）、\`equivalence\`（a ⟺ b，双向证明）、
  \`definition\`（定义 → 用到它的结论）—— 这三类是 **strong** 边，逻辑骨架。
- \`analogy\` 是 **weak** 边：思想相通，没有逻辑蕴含，只用来找远房灵感。
  用了必须对用户明说「以下是弱边联想，不是逻辑结论」。⚠️ 弱边**不参与分层**。

## layer（依赖深度）

从最底层的 ZF 公理与集合概念算起，沿「前置 → 依赖它的」最长路径数出来的层号，
可以当**学习顺序**用；等价的命题算同一层。
⚠️ 它是依赖深度，不是课程顺序。

## 字段与引用

\`id\` \`type\` \`label\` \`title\` \`region\` \`cluster\` \`layer\`
\`statement\` \`notes\` \`refs\`；节点用 \`id\` 引用，深链 \`#n=<节点id>\`。

记号见 \`${base}notation.md\`。
`;
}

/* ------------------------------------------------------------- policy.md */
function exportPolicy(data, base = '') {
  return `# 数学星图 · 内容准则

## 一、每一层都由上一层**构造**出来

新对象必须由**已经有的东西**造出来（子集、幂集、笛卡尔积、商集、函数空间……）。

- ⛔ **禁止**用「满足某组性质的对象（同构意义下唯一）」引入新东西 —— 那是
  **公理刻画**，悄悄假设了存在性。判据：这句话在**定义新对象**，
  还是在**陈述已有对象的性质**？
- ⛔ **性质是定理，不是定义**：造出来之后，再把性质作为带证明的定理挂上去。
- ⭐ **唯一豁免**：一阶语言与公式（\`def.first-order-language\`、\`def.formula\`）
  是**元层**对象，比 ZFC 更原始。
- **自查抓手**：「用到了却没节点 / 没连边」都违规。

## 二、同一结论只收一份

重复的定理**已合并**。判据：**A 能一句话说成 B（或特例）就不是两个节点。**

## 三、只保留最通用的版本

条件最弱、结论最强的那个；特例写在 \`notes\` 里。

## 四、星团按「装置」分，不按课程分

星团 = 为了造出某个「能用的东西」而存在的一整套结果；一个团别超 40 点。

## 五、记号

见 \`notation.md\`；新内容先按它转写再进 packs/。
`;
}

/* --------------------------------------------------------------- hubs.md */
/** 枢纽定理榜：按「被引用次数」排（只数强边，弱边不算）。 */
function exportHubs(MG, graph, data) {
  const indeg = new Map();
  const bump = k => indeg.set(k, (indeg.get(k) || 0) + 1);
  for (const e of graph.edges) {
    if (e.kind === 'implication') bump(e.target);
    else if (e.kind === 'definition') bump(e.usedBy);
    else if (e.kind === 'equivalence') { bump(e.a); bump(e.b); }
    /* analogy（弱边）不计入 —— 枢纽榜只反映逻辑骨架 */
  }
  void data;
  const ranked = graph.nodes
    .map(n => ({ n, d: indeg.get(n.id) || 0 }))
    .filter(x => x.d > 0)
    .sort((a, b) => b.d - a.d || a.n.layer - b.n.layer);

  const L = ['# 数学星图 · 枢纽定理榜', '',
    '按**入边数**排序：有多少条强边指向它。回答一个问题 ——',
    '**哪些东西是真正的地基，值得优先学熟。**（弱边不计入。）',
    '数据根 `./`：每项都能顺着读 `nodes/<id>.md`。', ''];
  let used = aiCost(L.join('\n'));
  let shown = 0;
  for (const { n, d } of ranked) {
    const line = `- **${d}** \`${n.id}\` ${n.label} · layer ${n.layer} · ` +
      `${n.cluster && graph.clusterById[n.cluster] ? graph.clusterById[n.cluster].name : '—'}`;
    if (aiBytes(L.join('\n') + '\n' + line) > AI_MAXB - 150 || shown >= 30) break;
    L.push(line); shown++;
  }
  L.push('');
  L.push(`（${graph.nodes.length} 个节点里 ${ranked.length} 个带强边入边，列了前 ${shown} 个；` +
    `完整清单见 \`graph.json\`。）`);
  return L.join('\n') + '\n';
}


/* ---------------------------------------------------------- notation.md */
/* 记号对照表产物。真源在 `src/data/notation.js` —— 这里只是把它排版出来。
   为什么必须分页：整张表 100 多条，远超单次抓取上限（1300 B），
   所以索引只放「规则标题 + 分组目录」，条目按组切开。 */
function exportNotation(MG, base = '') {
  const N = MG.notation || { groups: [], entries: [] };
  const nb = g => (N.entries || []).filter(e => e.g === g.id).length;
  const L = [];
  L.push('# 数学星图 · 记号对照表');
  L.push('');
  L.push(N.intro || '');
  L.push('');
  for (const g of (N.groups || [])) L.push(`- \`${base}notation/${g.id}.md\` ${g.name} ${nb(g)}`);
  L.push('');
  return L.join('\n') + '\n';
}

/** 人读的一整篇记号表（站点阅读页用）。
    ⚠️ 与 AI 产物 `notation.md` + `notation/*.md` **故意是两种形状**：
    抓取工具一次只给 ~1300 B，所以给 AI 的必须切页；给人读的要连成一整篇。
    两种需求不同，各自演化 —— 和 `tools/md.mjs` 不复用 `util.md()` 是同一个道理。
    它不参与 AI 体积断言（不进 files 清单）。 */
function exportNotationFull(MG) {
  const N = MG.notation || {};
  const L = [];
  L.push('# 数学星图 · 记号对照表');
  L.push('');
  L.push(N.intro || '');
  L.push('');
  for (const g of (N.groups || [])) {
    L.push(`### ${g.name}`);
    L.push('');
    for (const e of (N.entries || []).filter(x => x.g === g.id)) {
      L.push(`- \`${e.tex}\`${e.uni ? ' ' + e.uni : ''}　**${nameOf(e)}**${e.note ? ' — ' + e.note : ''}`);
    }
    L.push('');
  }
  return L.join('\n');
}

/** 通用规则全文（会超 1300 B，交给 emitChunks 分页） */
function notationRulesBody(N) {
  const L = [];
  for (const r of (N.rules || [])) {
    L.push(`## ${r.id}　${r.title}`);
    L.push('');
    L.push(r.text);
    L.push('');
  }
  return L;
}

/** 条目名字里可能自带 **强调** —— 外层还要再包一层粗体，不剥掉就会渲染成
    `*<strong>*包含</strong>...**` 这种破相。剥掉后统一整名加粗。 */
const nameOf = e => String(e.name || '').replace(/\*\*/g, '');

/** 一个分组的条目正文 */
function notationGroupBody(N, g) {
  const L = [];
  for (const e of (N.entries || []).filter(x => x.g === g.id)) {
    const uni = e.uni ? ` ${e.uni}` : '';
    const note = e.note ? ` — ${e.note}` : '';
    L.push(`- \`${e.tex}\`${uni}　**${nameOf(e)}**${note}`);
  }
  return L;
}

/** 把记号表写成 dist/notation.md + dist/notation/*.md，返回产物清单 */
function exportNotationProducts(MG, base = '') {
  const N = MG.notation || {};
  const files = [];
  const dir = 'notation';
  const mkHead = (title, page, from) => `# ${title}\n` +
    `根 \`${from}\`　·　索引 \`notation.md\`${page ? `　·　第 ${page} 页` : ''}\n\n`;

  /* 各分组 */
  for (const g of (N.groups || [])) {
    const head = mkHead(`记号表 · ${g.name}`, 0, '../');
    const tail = '索引 `notation.md`。';
    emitChunks(files, dir, g.id, head, notationGroupBody(N, g).join('\n'), tail);
  }
  return files;
}

/* -------------------------------------------------------- alias.md */
/* 别名与问法索引。真源在 `src/data/aliases.js` —— 这里只把它排版出来。
   给 AI 的用处：把「大白话 / 英文名 / 老名字」换成节点 id，
   它不用先猜中文术语再去 `index/` 里碰运气。
   为什么按星系切页：整表远超单次抓取上限，而 AI 通常只关心一个星系。 */
function aliasFilter(A, graph, regionId) {
  const inRegion = id => {
    const n = graph.byId[id];
    return !!(n && (n.regions || []).indexOf(regionId) >= 0);
  };
  return {
    hooks: (A.hooks || []).filter(h => (h.to || []).some(inRegion)),
    nodes: (A.nodes || []).filter(r => inRegion(r.id)),
  };
}

function exportAlias(MG, graph, base = '') {
  const A = MG.aliases || { nodes: [], hooks: [] };
  const L = [];
  L.push('# 数学星图 · 别名与问法索引');
  L.push('');
  L.push(A.intro || '');
  L.push('');
  L.push('用别的叫法（英文名 / 老名字 / 大白话）查不到东西时，先来这里换节点 id。');
  L.push('');
  L.push('`alias/<星系id>.md` 是**问法**（一句人话 → 节点 id）；');
  L.push('`alias/aka/<星系id>.md` 是**别名**（别的叫法 → 节点 id）。');
  L.push('');
  for (const r of graph.regions) {
    const f = aliasFilter(A, graph, r.id);
    if (!f.nodes.length && !f.hooks.length) continue;
    L.push(`- ${r.name}　\`${base}alias/${r.id}.md\` ${f.hooks.length} 问法　·　` +
      `\`${base}alias/aka/${r.id}.md\` ${f.nodes.length} 别名`);
  }
  L.push('');
  return L.join('\n') + '\n';
}

/* ⚠️ 问法与别名**分两个文件**：问法是个短表（一个星系一两页就完），
   别名是所有节点的别的叫法，能摊到十几页。挤在一页里，AI 为了找一句问法
   得把十几页别名一起翻完。 */
function aliasHookBody(A, graph, regionId) {
  return aliasFilter(A, graph, regionId).hooks
    .map(h => `- ${h.q} → ${(h.to || []).join(' ')}`).join('\n\n');
}

function aliasAkaBody(A, graph, regionId) {
  return aliasFilter(A, graph, regionId).nodes
    .map(r => `- ${(r.aka || []).join(' | ')} → ${r.id}`).join('\n\n');
}

function exportAliasProducts(MG, graph) {
  const A = MG.aliases || {};
  const files = [];
  for (const r of graph.regions) {
    const f = aliasFilter(A, graph, r.id);
    if (f.hooks.length) {
      const head = `# 问法 → 节点 · ${r.name}\n` +
        `根 \`../\`　·　索引 \`../alias.md\`　·　别名在 \`aka/${r.id}.md\`\n\n`;
      emitChunks(files, 'alias', r.id, head, aliasHookBody(A, graph, r.id), '见 `../alias.md`。');
    }
    if (f.nodes.length) {
      const head = `# 别名 → 节点 · ${r.name}\n` +
        `根 \`../../\`　·　索引 \`../../alias.md\`　·　问法在 \`../${r.id}.md\`\n\n`;
      emitChunks(files, 'alias/aka', r.id, head, aliasAkaBody(A, graph, r.id), '见 `../../alias.md`。');
    }
  }
  return files;
}

/* -------------------------------------------------------- 别名表断言 */
function assertAliases(MG, graph) {
  const A = MG.aliases;
  if (!A) return ['别名表：`src/data/aliases.js` 没有挂上（index.html 少了 <script>？）'];
  const errs = [];
  const ids = graph.byId;
  const seenNode = new Set();
  for (const r of (A.nodes || [])) {
    if (!r.id) { errs.push('别名表：有条目没写 id'); continue; }
    if (!ids[r.id]) errs.push(`别名表：条目指向不存在的节点 \`${r.id}\``);
    if (seenNode.has(r.id)) errs.push(`别名表：节点 \`${r.id}\` 重复登记`);
    seenNode.add(r.id);
    if (!(r.aka || []).length) errs.push(`别名表：\`${r.id}\` 的 aka 是空的`);
    for (const a of (r.aka || [])) {
      if (!String(a).trim()) errs.push(`别名表：\`${r.id}\` 有空别名`);
      if (String(a).includes('$')) {
        errs.push(`别名表：\`${r.id}\` 的别名含 \`$\` —— aka 与 label 一样是纯文本：${a}`);
      }
    }
  }
  const seenQ = new Set();
  for (const h of (A.hooks || [])) {
    if (!h.q) { errs.push('别名表：有问题钩子没写 q'); continue; }
    if (seenQ.has(h.q)) errs.push(`别名表：问法重复 —— ${h.q}`);
    seenQ.add(h.q);
    if (String(h.q).includes('$')) errs.push(`别名表：问法含 \`$\`：${h.q}`);
    if (!(h.to || []).length) errs.push(`别名表：问法「${h.q}」没有 to`);
    for (const t of (h.to || [])) {
      if (!ids[t]) errs.push(`别名表：问法「${h.q}」指向不存在的节点 \`${t}\``);
    }
  }
  return errs;
}

/* ------------------------------------------------- 记号表的硬断言 */
/** 剥掉公式与代码，只留「普通文字」—— 裸 Unicode 检查要在公式之外做 */
function stripMath(s) {
  return String(s)
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*?\$/g, ' ')
    .replace(/`[^`\n]*?`/g, ' ');
}

function assertNotation(MG, graph) {
  const N = (MG.notation && MG.notation.checks) || {};
  const errs = [];
  if (!MG.notation) return errs;

  const fields = N.bareUnicode || {};
  const bodyFields = fields.body || [];
  const bad = new Set([...(fields.chars || '')]);
  /* ⭐ 「术语前缀」豁免：`σ-代数`、`σ-有限`、`μ-零集` 这类「希腊字母 + - + 词」
     是中文术语的一部分，保留 Unicode（用户拍板）。扫描前先把它们挖掉。 */
  const exceptRx = fields.except ? new RegExp(fields.except, 'g') : null;
  const banned = (N.banned || []).map(b => ({ ...b, rx: new RegExp(b.re, 'g') }));

  const items = [];   // { id, field, text }
  for (const n of graph.nodes) {
    for (const f of bodyFields) if (n[f]) items.push({ id: n.id, field: f, text: n[f] });
  }
  for (const e of graph.edges) {
    if (e.proof) items.push({ id: e.id, field: 'proof', text: e.proof });
    if (e.note) items.push({ id: e.id, field: 'note', text: e.note });
    if (Array.isArray(e.proofs)) {
      for (const p of e.proofs) {
        const t = typeof p === 'string' ? p : (p && p.text);
        if (t) items.push({ id: e.id, field: 'proofs', text: t });
      }
    }
    if (e.title) items.push({ id: e.id, field: 'title', text: e.title });
  }

  /* ① 公式之外的裸 Unicode 数学符号 → 硬失败 */
  const bodyHits = new Map();      // '字符' → { count, where }
  for (const it of items) {
    let plain = stripMath(it.text);
    if (exceptRx) plain = plain.replace(exceptRx, ' ');
    for (const ch of new Set(plain)) {
      if (!bad.has(ch)) continue;
      const cur = bodyHits.get(ch) || { count: 0, where: it.id + '.' + it.field };
      cur.count += 1;
      bodyHits.set(ch, cur);
    }
  }
  for (const [ch, h] of bodyHits) {
    errs.push(`记号：${h.where} 等 ${h.count} 处出现裸 Unicode 数学符号「${ch}」` +
      `—— 要写成 $…$ 里的 LaTeX（详见 dist/notation.md）`);
  }

  /* ② 行内 `$$…$$`（R2）—— 渲染上和 `$…$` 没差别，但产物喂给标准 Markdown
        渲染器时 `$$` 是「独立公式块」的信号，会把句子切断。 */
  const inlineFields = (N.inlineDollars && N.inlineDollars.fields) || [];
  if (inlineFields.length) {
    const hits = [];
    for (const it of items) {
      if (!inlineFields.includes(it.field)) continue;
      for (const ln of String(it.text).split('\n')) {
        const parts = ln.split('$$');
        if (parts.length === 1 || parts.length % 2 === 0) continue;   // 奇数个 = 跨行公式
        for (let k = 0; k < (parts.length - 1) / 2; k++) {
          if (parts[2 * k].trim() !== '' || parts[2 * k + 2].trim() !== '') {
            hits.push(`${it.id}.${it.field}`);
            break;
          }
        }
      }
    }
    if (hits.length) {
      errs.push(`记号：${hits.slice(0, 4).join('、')}${hits.length > 4 ? ` 等 ${hits.length} 处` : ''}` +
        ` 把 \`$$…$$\` 当行内公式用 —— 行内的写成 \`$…$\`，\`$$…$$\` 只留给独立成行的公式（R2）`);
    }
  }

  /* ③ 禁用写法 */
  for (const b of banned) {
    const found = [];
    for (const it of items) {
      b.rx.lastIndex = 0;
      if (b.rx.test(it.text)) found.push(`${it.id}.${it.field}`);
    }
    if (found.length) {
      const want = b.fix.replace(/\\\\\\\\/g, '\\');
      errs.push(`记号：${found.slice(0, 4).join('、')}${found.length > 4 ? ` 等 ${found.length} 处` : ''}` +
        ` 用了禁用写法${b.why ? `（${b.why}）` : ''} —— 应为 \`${want}\``);
    }
  }
  return errs;
}

/* ---------------------------------------------------------------- 单文件 HTML */
function buildSingleFile() {
  let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  // 内联 CSS
  html = html.replace(/<link[^>]+href="([^"]+\.css)"[^>]*>/g, (m, href) => {
    const css = fs.readFileSync(path.join(ROOT, href), 'utf8');
    return '<style>\n' + css + '\n</style>';
  });

  // 内联 JS（按出现顺序）
  const missing = [];
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => {
    const f = path.join(ROOT, src);
    if (!fs.existsSync(f)) { missing.push(src); return m; }
    const js = fs.readFileSync(f, 'utf8');
    return '<script>\n' + js + '\n</script>';
  });

  // 外部内容包在单文件里读不到（file:// 禁止 fetch），提示一下即可，不影响使用
  return { html, missing };
}

/* ---------------------------------------------------------------- main */
const args = process.argv.slice(2);
const onlyJSON = args.includes('--json');
const onlyHTML = args.includes('--html');
const doJSON = !onlyHTML;
const doHTML = !onlyJSON;

fs.mkdirSync(DIST, { recursive: true });

console.log('载入内容…');
const MG = loadMG();
const graph = buildGraph(MG);
console.log(`  星系 ${graph.regions.length} / 星团 ${graph.clusters.filter(c => c.nodes.length).length} / ` +
  `节点 ${graph.nodes.length} / 连线 ${graph.edges.length}`);
if (graph.warnings.length) {
  console.log('  ⚠ 数据提示：');
  graph.warnings.forEach(w => console.log('    - ' + w));
}

if (doJSON) {
  const data = exportJSON(MG, graph);
  // 内容没变就沿用旧时间戳 —— 否则每次构建都会把 git 工作区弄脏
  data.meta.generated = stableStamp(path.join(DIST, 'graph.json'), data);
  fs.writeFileSync(path.join(DIST, 'graph.json'), JSON.stringify(data, null, 1), 'utf8');
  console.log('  → dist/graph.json');

  fs.writeFileSync(path.join(DIST, 'graph.md'), exportMarkdown(MG, graph, data), 'utf8');
  console.log('  → dist/graph.md');

  fs.writeFileSync(path.join(DIST, 'llms.txt'), exportLlmsTxt(data), 'utf8');
  console.log('  → dist/llms.txt');
  // 仓库根目录也放一份（llms.txt 约定就是放在根上）
  fs.writeFileSync(path.join(ROOT, 'llms.txt'), exportLlmsTxt(data, 'dist/'), 'utf8');
  console.log('  → llms.txt');

  fs.writeFileSync(path.join(DIST, 'policy.md'), exportPolicy(data), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'policy.md'), exportPolicy(data, 'dist/'), 'utf8');
  fs.writeFileSync(path.join(DIST, 'reading.md'), exportReading(data), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'reading.md'), exportReading(data, 'dist/'), 'utf8');
  console.log('  → dist/policy.md + policy.md · dist/reading.md + reading.md');

  fs.writeFileSync(path.join(DIST, 'hubs.md'), exportHubs(MG, graph, data), 'utf8');
  console.log('  → dist/hubs.md');

  /* ---------------------------------------------- AI 按需检索产物 */
  for (const d of ['nodes', 'proofs', 'notes', 'index', 'notation', 'alias']) {
    fs.rmSync(path.join(DIST, d), { recursive: true, force: true });
  }
  // 早期版本产出过 JSON 版索引；抓取工具对 JSON 不友好，已改成纯文本 .md。
  // 这里主动清掉，免得旧的留在 dist/ 里被当成产物发布。
  fs.rmSync(path.join(DIST, 'index.json'), { force: true });
  const { files, notesOut, pagesOf } = exportAIProducts(MG, graph, data);

  /* ------------------------------------------------- 记号对照表产物 */
  /* 真源是 src/data/notation.js —— 这里只把它排版成「一次抓得完」的分页产物。 */
  fs.writeFileSync(path.join(DIST, 'notation.md'), exportNotation(MG), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'notation.md'), exportNotation(MG, 'dist/'), 'utf8');
  fs.writeFileSync(path.join(DIST, 'notation-full.md'), exportNotationFull(MG), 'utf8');
  const notationFiles = exportNotationProducts(MG);
  for (const f of notationFiles) files.push(f);   // 一起过体积断言，一起落盘
  console.log(`  → dist/notation.md + notation/*.md（${notationFiles.length} 页）+ notation.md`);

  /* ------------------------------------------------------ 别名表产物 */
  /* 真源是 src/data/aliases.js —— 别名与问法两边共用同一份数据。 */
  fs.writeFileSync(path.join(DIST, 'alias.md'), exportAlias(MG, graph), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'alias.md'), exportAlias(MG, graph, 'dist/'), 'utf8');
  const aliasFiles = exportAliasProducts(MG, graph);
  for (const f of aliasFiles) files.push(f);
  console.log(`  → dist/alias.md + alias/*.md（${aliasFiles.length} 页）+ alias.md`);

  const errs = assertAI(MG, graph, files, pagesOf);
  errs.push(...assertNotation(MG, graph));
  errs.push(...assertAliases(MG, graph));
  // 给 AI 看的说明文档也必须在一次抓取之内
  for (const extra of ['llms.txt', 'policy.md', 'reading.md', 'hubs.md', 'notation.md', 'alias.md']) {
    const p = path.join(DIST, extra);
    if (!fs.existsSync(p)) continue;
    const t = fs.readFileSync(p, 'utf8');
    const c = aiCost(t), b = aiBytes(t);
    if (b > AI_MAXB || c > AI_ESC) {
      errs.push(`产物过大：${extra} = ${b} B / 转义后 ${c} 字符（上限 ${AI_MAXB} B 且 ${AI_ESC} 字符）`);
    }
  }
  for (const f of files) {
    const full = path.join(DIST, f.path);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, f.text, 'utf8');
  }
  const total = files.reduce((a, f) => a + aiBytes(f.text), 0);
  const biggest = files.slice().sort((a, b) => aiBytes(b.text) - aiBytes(a.text))[0];
  console.log(`  → dist/ 按需检索产物：${files.length} 个文件（合计 ${(total / 1024).toFixed(0)} KB）`);
  console.log(`       index.md + index/*.md（${files.filter(f => f.path.startsWith('index')).length}）` +
    ` · nodes/*.md（${files.filter(f => f.path.startsWith('nodes/')).length}）` +
    ` · notes/*.md（${files.filter(f => f.path.startsWith('notes/')).length}）` +
    ` · proofs/*.md（${files.filter(f => f.path.startsWith('proofs/')).length}）`);
  console.log(`       最大 ${biggest.path}（${aiBytes(biggest.text)} B / 转义后 ${aiCost(biggest.text)} 字符）` +
    `，硬上限 ${AI_MAXB} B；说明外置 ${notesOut.length} 个节点`);
  if (errs.length) {
    console.log('  ✗ 断言失败：');
    errs.forEach(e => console.log('    - ' + e));
    process.exit(1);
  }
  console.log(`  ✓ 断言通过：每个产物 ≤ ${AI_MAXB} B / 转义后 ${AI_ESC} 字符、非单行、` +
    `等价边两端同层、层号与边方向一致、正文记号合规`);
}

if (doHTML) {
  const { html } = buildSingleFile();
  fs.writeFileSync(path.join(DIST, 'mathgalaxy.html'), html, 'utf8');
  const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
  console.log(`  → dist/mathgalaxy.html  (${kb} KB，自包含，手机双击即可打开)`);

  // KaTeX 字体：CSS 里写的是 url(fonts/…)，相对「加载这个 CSS 的页面」解析。
  // 单文件里的 CSS 是内联的，所以要把它旁边的 fonts/ 也一起带上，
  // 否则拷到手机 / 发到线上都拿不到数学字体。
  const fontSrc = path.join(SRC, 'ui', 'fonts');
  if (fs.existsSync(fontSrc)) {
    const fontDst = path.join(DIST, 'fonts');
    fs.rmSync(fontDst, { recursive: true, force: true });
    fs.mkdirSync(fontDst, { recursive: true });
    let n = 0;
    for (const f of fs.readdirSync(fontSrc)) {
      if (f.endsWith('.woff2')) { fs.copyFileSync(path.join(fontSrc, f), path.join(fontDst, f)); n++; }
    }
    console.log(`  → dist/fonts/  (${n} 个 woff2 —— 自包含单文件与线上站点共用)`);
  }
}

console.log('完成。');
