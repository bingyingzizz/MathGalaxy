#!/usr/bin/env bun
/* ==========================================================================
   数学星图 · 构建 / 导出
   --------------------------------------------------------------------------
   一条命令产出五样东西（都在 dist/ 下）：

     dist/mathgalaxy.html   自包含单文件 —— 所有 CSS/JS/数据/布局全内联，
                            拷到手机、U 盘、网盘，双击就能看，不需要服务器
     dist/layout.json       预计算布局（节点坐标 + 星系/星团 stat + 签名）——
                            首次打开直接读坐标，不再在客户端冷算 6~7s
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
/* ⭐ 英文名的判定口径**只有一份**：tools/i18n-backfill.mjs。
   这里 import 它的函数来核「旁挂表有没有漂」，不另抄一遍规则。 */
import { bucketRows, splitBuckets, decide } from './i18n-backfill.mjs';
/* 布局预计算（2026-11-11）：把 computeLayout 的结果写进 dist/layout.json 并内联进单文件，
   让首次打开不再冷算 6~7s。签名口径仍然只有 src/core/layoutcache.js 一份。 */
import { buildPayload, writeLayoutFile, assertLayoutFile, embedPreLayout, LAYOUT_FILE } from './prelayout.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

/* ------------------------------------------------------------ 内容版本 */
/* 由 tools/idstable.mjs 维护。星图公开之后**节点 id 是对外契约**，所以要有一个
   对外可引用的版本号：别人按 id + 版本号引用，我们重构 id 时才有对齐的依据。
   快照文件是 tools/ids.snapshot.json（json 里的 version）。 */
function contentVersion() {
  try {
    const s = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/ids.snapshot.json'), 'utf8'));
    return s && s.version ? s.version : '';
  } catch (e) { return ''; }
}
/* ⛔ 2026-10-19 硬门：**src/core 的每个文件都必须能被解析**。
   为什么加：build 以前只把 src/data/* 塞进 vm 跑，core/*.js 是原样内联进产物的，
   从来没被解析过 —— 于是「删除两个逗号」这种语法错可以一路过构建、推上线、白屏。
   这里只解析不执行（new vm.Script 只编译），零副作用。 */
(function syntaxGateCore() {
  const dir = path.join(SRC, 'core');
  const bad = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.js')) continue;
    const code = fs.readFileSync(path.join(dir, f), 'utf8');
    try { new Function(code); }   // ⚠️ 必须用 new Function：bun 的 node:vm 不解析（实测 new vm.Script 对坏语法不报错）
    catch (e) { bad.push(f + '：' + e.message); }
  }
  if (bad.length) {
    console.error('✗ src/core 语法检查失败：');
    bad.forEach(m => console.error('   ' + m));
    process.exit(1);
  }
})();
const CONTENT_VERSION = contentVersion();

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
    /* ⚠️ contentVersion 要事先塞进去：MG.enFieldStatus（core/i18n.js）靠它判
       「这条英文是译自哪个内容版本」；浏览器里那个值来自 index.html 的 MG.contentVersion。 */
    MG: { contentVersion: CONTENT_VERSION }, console,
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
    'core/config.js', 'core/util.js', 'core/i18n.js', 'core/camera.js', 'core/graph.js',
    /* ⚠️ layoutcache 必须在 layout 之前：layout.computeLayout 里会调
       MG.layoutCache.restore(graph)，也就是「有没有预计算布局」的判定点。 */
    'core/layoutcache.js', 'core/layout.js',
    'core/layers.js',
    'data/regions.js', 'data/clusters.js', 'data/aliases.js', 'data/i18n.js', 'data/notation.js', 'data/xref.js',
    /* ⚠️ 只给构建用：浏览器端不需要英文文档正文（read.html 的英文版由 publish.mjs 组装），
       所以这个文件**不挂进 index.html**。 */
    'data/i18n/docs.en.js',
    /* 英文摘要（T2.2）与英文陈述/说明（T3.2）：同样只给构建用 —— 浏览器端从
       graph.js 挂好的字段读，不直接加载这两个文件。 */
    'data/i18n/abstracts.en.js',
    'data/i18n/statements.en.js',
    /* 缺口候选词表（I2）：只给 build 用——浏览器端不需要，所以也不挂进 index.html */
    'data/gaps.js',
    /* 假设受控词表（I6/T14）：同样只给构建用 */
    'data/hypotheses.js',
  ];
  const packDir = path.join(SRC, 'data', 'packs');
  /* ⭐ 包顺序必须与 index.html 的 <script> 完全一致（2026-11-11）。
     为什么：节点顺序既进 `layoutcache.signature()`，也影响布局求解的浮点累加顺序 ——
     预计算布局（dist/layout.json）的签名必须和浏览器算出来的**逐位相同**。
     按目录名排序会把 `100-x.js` 排到 `11-y.js` 前面，与页面顺序不同：实测两边的
     签名因此变成 1620:eod6d9 vs 1620:1dlkc1p，预计算整包失效。
     ⚠️ 同时校验「目录里的包」与「页面挂的包」集合一致 —— 少挂/多挂都是线上事故。 */
  const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const pagePacks = Array.from(
    shell.matchAll(/<script[^>]+src="src\/data\/packs\/([^"]+\.js)"/g), (m) => m[1]
  );
  const dirPacks = fs.readdirSync(packDir).filter((f) => f.endsWith('.js')).sort();
  if (!pagePacks.length) throw new Error('loadMG：index.html 里一个 packs <script> 都没找到');
  {
    const inPage = new Set(pagePacks), onDisk = new Set(dirPacks);
    const missing = dirPacks.filter((f) => !inPage.has(f));
    const ghost = pagePacks.filter((f) => !onDisk.has(f));
    if (missing.length || ghost.length) {
      throw new Error('loadMG：数据包与 index.html 不一致 —— ' +
        (missing.length ? '目录有但页面没挂：' + missing.join(', ') + '；' : '') +
        (ghost.length ? '页面挂了但目录没有：' + ghost.join(', ') + '；' : '') +
        '（两边不一致会让构建和网页的节点数不同）');
    }
  }
  pagePacks.forEach((f) => files.push('data/packs/' + f));

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

/* -------------------------------------------- 英文译文的状态汇总（T3.2） */
/* 一个节点可能同时有：摘要（T2.2，创译）、陈述/说明（T3.2，创译）、英文名（T1.1，派生）。
   作者 2026-10-16 拍板：状态**逐条**判定 ⇒ 这里逐字段报，再给一个最保守的汇总，
   好让消费方「一眼看到汇总结论、再下钻到具体字段」。
   ⚠️ 每个字段的状态由 MG.enFieldStatus 现算（src/core/i18n.js）——
      ⛔ 构建不自己判断，免得网页与产物各说各话（第二处实现就是漂移的源头）。
   ⚠️ 摘要的底稿 = 该节点的 statement + notes；陈述/说明的底稿就是它自己那个字段。 */
function enTranslationOf(n, MG) {
  const rec = {};                       // 字段 → { status, basedOn }
  const abs = MG.i18nAbstracts && MG.i18nAbstracts.items && MG.i18nAbstracts.items[n.id];
  if (abs) {
    rec.abstract = { status: MG.enFieldStatus(abs, absZhOf(n)), basedOn: abs.basedOn };
  }
  const st = MG.i18nStatements && MG.i18nStatements.items && MG.i18nStatements.items[n.id];
  if (st && st.statement && st.statement.en) {
    rec.statement = { status: MG.enFieldStatus(st.statement, n.statement), basedOn: st.statement.basedOn };
  }
  if (st && st.notes && st.notes.en) {
    rec.notes = { status: MG.enFieldStatus(st.notes, n.notes), basedOn: st.notes.basedOn };
  }
  const fields = Object.keys(rec);
  /* 英文名（T1.1）是**派生型**：全自动生成，没有「待审」这回事。 */
  if (n.title_en || n.label_en) { rec.name = { status: 'derived', basedOn: null }; fields.push('name'); }
  if (!fields.length) return undefined;
  const versionOf = (b) => String(b || '').split('#')[0] || null;
  const firstBase = fields.map(f => rec[f].basedOn).find(Boolean) || null;
  /* ⭐ 汇总只算**创译型**的那几个字段（摘要/陈述/说明）——
     name 是派生的，把它算进去会让「只有一个英文名」的节点从
     「name only」变成看着像「有译文待审」（几百个节点会集体说谎）。 */
  const creative = fields.filter(f => f !== 'name');
  return { en: {
    /* 汇总只算创译型字段；**只有英文名**的节点报 'derived'（派生型，没人审也不需要审）——
       ⛔ 别让它报 'reviewed'：那会让消费方以为「这条英文有人看过」。 */
    status: creative.length ? worstStatus(creative.map(f => rec[f].status)) : 'derived',
    version: versionOf(firstBase),                  // 这条英文当初是对着哪个内容版本写的
    fields,                                         // 有哪些英文内容（字段名，含 name）
    creative,                                       // 其中真正需要人审的那几个
    fieldStatus: fields.reduce((o, f) => (o[f] = rec[f].status, o), {}),   // ⭐ 逐字段状态
    staleFields: fields.filter(f => rec[f].status === 'stale'),            // ⭐ 哪几个字段过期了
    basedOn: fields.reduce((o, f) => (rec[f].basedOn ? (o[f] = rec[f].basedOn) : o, o), {}),
  } };
}
/** 状态合并：取**最保守**的那个（stale > draft/derived > reviewed）；空集 = reviewed */
const STATUS_RANK = { reviewed: 0, derived: 1, draft: 1, stale: 2 };
function worstStatus(list) {
  let worst = 'reviewed';
  for (const s of list) if (STATUS_RANK[s] > STATUS_RANK[worst]) worst = s;
  return worst;
}
/** 摘要的中文底稿 = 该节点的 statement + notes（改其一即 stale） */
const absZhOf = n => String(n.statement || '') + '\n' + String(n.notes || '');

/* ---------------------------------------------------------------- JSON 导出 */
function exportJSON(MG, graph) {
  const T = MG.theme;
  const XREF = MG.xref || {};          // 外部锚点（src/data/xref.js）
  const strengthOf = e => e.strength || (T.edgeStrength && T.edgeStrength[e.kind]) || 'strong';

  return {
    meta: {
      name: '数学星图 MathGalaxy',
      schema: 'mathgalaxy/v1',
      version: CONTENT_VERSION || undefined,
      /* 许可（T1.4）：内容 CC BY 4.0、代码 MIT。机器可读的标识符放这里，
         声明正文在仓库根 LICENSE，法律文本在 LICENSE-CC-BY-4.0.txt。
         ⚠️ 这是**声明**，不是真源 —— 要改许可先改 LICENSE 再改这一行。 */
      license: 'CC-BY-4.0',
      licenseCode: 'MIT',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      generated: new Date().toISOString(),
      counts: {
        regions: graph.regions.length,
        clusters: graph.clusters.filter(c => c.nodes.length).length,
        nodes: graph.nodes.length,
        edges: graph.edges.length,
        strong: graph.edges.filter(e => strengthOf(e) === 'strong').length,
        weak: graph.edges.filter(e => strengthOf(e) === 'weak').length,
        /* 其中**不参与分层**的推出（`layer:false`，见 graph.json 的边字段 layer）。
           单独计数，好让读导出的人知道「层号方向」这条规则有例外、例外有几条。 */
        derived: graph.edges.filter(e => e.kind === 'implication' && e.layer === false).length,
        /* 有英文入口页的节点数（T3.1）：llms.txt 的协议里要写这个数 */
        en_pages: graph.nodes.filter(n => n.title_en || n.label_en || n.abstract_en).length,
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
          implication: '推出（有向，sources → target）。⚠️ 带 layer:false 的是「推论」：' +
            '真推出，但**不是前提**（用高级工具回头证低级定理），不参与分层、不抬高目标层号',
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
      /* T2.4：星团也带英文名（clusters.js 的 en 字段）—— 界面英文模式、概念页面包屑、
         AI 读 graph.json 时都用它。⛔ 缺了就是 null，让消费方自己回落中文。 */
      id: c.id, name: c.name, en: c.en || null, parent: c.parent, desc: c.desc,
      nodeCount: c.nodes.length,
      nodes: c.nodes.map(n => n.id),
    })),

    nodes: graph.nodes.map(n => ({
      id: n.id,
      type: n.type,
      label: n.label,
      title: n.title,
      /* 证明完成度（T13/I5）：complete（缺省）| skeleton | external-input。
         ⛔ 只标「不完全」的 —— 缺省就是 complete，别把 1400 多个节点全写上。 */
      status: n.status || undefined,
      hypotheses: Array.isArray(n.hypotheses) && n.hypotheses.length ? n.hypotheses : undefined,
      distinctFrom: Array.isArray(n.distinctFrom) && n.distinctFrom.length ? n.distinctFrom : undefined,
      /* refs 的可信度（I4）：字符串里自认「⚠ 存疑 / 未核实」的，现算成一个字段，供检索/渲染区分。 */
      refsStatus: (n.refs || []).some((r) => /⚠|存疑|未核实|待核|不见章号/.test(String(r))) ? 'unverified' : undefined,
      /* 英文名（T1.1）：由 src/data/i18n.js 提供、graph.js 挂到节点上。
         缺省 = 没有 ⇒ 消费方按 label_en → title_en → 中文 label 回落。 */
      label_en: n.label_en || undefined,
      title_en: n.title_en || undefined,
      /* 英文摘要（T2.2）：只有枢纽榜前列的节点有。状态与版本一起给出来，
         消费方不必猜这段英文是审过的还是机翻的。 */
      abstract_en: n.abstract_en || undefined,
      /* 英文陈述 / 说明（T3.2 试点）：只有少数节点有；⛔ 证明（proofs）不在其中，
         所以消费方看到 statement_en 时别以为整条都译完了 —— `translations.en.fields` 里写着有什么。 */
      statement_en: n.statement_en || undefined,
      notes_en: n.notes_en || undefined,
      translations: enTranslationOf(n, MG),
      /* 英文入口页（T3.1）：有英文名或摘要的节点另出一份 `nodes/<id>.en.md`。
         这里只登记**有没有**，路径按约定拼 —— 消费方不必猜。 */
      en_page: (n.title_en || n.label_en || n.abstract_en) ? `nodes/${n.id}.en.md` : undefined,
      region: n.regions[0] || null,
      regions: n.regions,
      cluster: n.cluster || null,
      layer: n.layer,
      tags: n.tags,
      statement: n.statement,
      notes: n.notes || '',
      refs: n.refs,
      xref: XREF[n.id] || undefined,
    })),

    /* 边（A8）：kind ∈ definition | implication | analogy | equivalence。
       status: 只有「这条边连着的节点是 skeleton」时才出现，值恒为 'skeleton'，
       缺省 = 正常边（⛔ 别把 3000 多条正常边全写上）。消费方可据此把骨架边灰显/标注。 */
    edges: graph.edges.map(e => {
      const strength = strengthOf(e);
      if (e.kind === 'equivalence') {
        return {
          id: e.id, kind: e.kind, strength, a: e.a, b: e.b,
          status: e.status || undefined,
          title: e.title || '', note: e.note || '',
          proofs: (e.proofs || []).map(p => ({ label: p.label, text: p.text })),
        };
      }
      if (e.kind === 'definition') {
        return {
          id: e.id, kind: e.kind, strength,
          status: e.status || undefined,
          definition: e.definition, usedBy: e.usedBy,
          note: e.note || '',
        };
      }
      if (e.kind === 'analogy') {
        return {
          id: e.id, kind: e.kind, strength, a: e.a, b: e.b,
          status: e.status || undefined,
          title: e.title || '', note: e.note || e.proof || '',
        };
      }
      return {
        id: e.id, kind: e.kind, strength,
        status: e.status || undefined,
        sources: e.sources, target: e.target,
        /* ⭐ `layer:false` = 「推论」边：真推出，但**不参与分层**（见 core/graph.js
           的 isDerived）。只在为 false 时才出现 —— 普通边不加这个键，免得
           把「没有这个字段」也逼成一个要解释的状态。 */
        layer: e.layer === false ? false : undefined,
        title: e.title || '', proof: e.proof || '', note: e.note || '',
        /* 多证法（T15）：等价边与 implication 都可能带 proofs[]；
           ⚠️ 以前这里只导 `proof`，于是写成 `proofs[]` 的证法在 graph.json 里**静默消失**
           （体现就是面板和 mg 都看不到、只有 .md 产物里能看到）。 */
        proofs: Array.isArray(e.proofs) && e.proofs.length
          ? e.proofs.map((p) => ({ label: p.label || '', text: p.text || '' }))
          : undefined,
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
    `（强边 ${data.meta.counts.strong}，弱边 ${data.meta.counts.weak}` +
    (data.meta.counts.derived
      ? `；其中**不分层**的「推论」${data.meta.counts.derived} 条（layer:false）`
      : '') + '）');
  p('');
  p('> ⛔ **这是全量 bulk 导出（约 %%SIZE_KB%%），不要单次抓取** —— 抓取工具单次通常只返回');
  p('> 约 1000 词元（中文约 3 KB；各工具上限不同，这里说的是常见量级），你会只看到开头一小段，');
  p('> 而且同一地址反复抓也只会拿到同样的开头。**要检索请走 `llms.txt` 里的检索协议**：');
  p('> `index.md` → `index/<星团id>.md` → `nodes/<节点id>.md`。');
  p('> 这份文件只在「一次性下载 / 离线打包 / 本地处理」时才用。');
  p('');
  p('许可：内容 **CC BY 4.0**（署名即可，可转载 / 镜像 / 商用）、代码 MIT。');
  p('引用请写明节点 id 与内容版本，例如 `thm.cantor`（内容 ' + (CONTENT_VERSION || 'dev') + '）。');
  p('条款与引用格式见 `LICENSE.txt`，CC BY 4.0 法律文本见 `LICENSE-CC-BY-4.0.txt`。');
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

/* ⭐ 文档里报了「这是全量导出（约 N KB）」，而 N 只能**量自己** ——
   以前写死的 390 KB 早就涨到 3.3 MB 了（2026-11-02 实测）。
   ⚠️ 迭代几轮就收敛：位数变化会微调总量，但 KB 级别不会振荡。 */
function withSelfSize(text, token) {
  const fmt = kb => kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB';
  let kb = 0, out = '';
  for (let i = 0; i < 4; i++) {
    out = text.split(token).join(fmt(kb));
    const next = Math.round(Buffer.byteLength(out, 'utf8') / 1024);
    if (next === kb) break;
    kb = next;
  }
  return text.split(token).join(fmt(kb));
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

/* markdown 链接。⚠️ 只**包**住原文（连反引号一起），不改字面 —— 别的体检脚本还在
   按 `nodes/<id>.md` 这种反引号路径做匹配，改了字面就把它们弄哑了。
   顺手转义文本里的方括号：标签一含 [ ] 就会把链接语法弄坏。 */
const mdLink = (txt, href) => `[${String(txt).replace(/[[\]]/g, '\\$&')}](${href})`;

/* 续页的小节标题行。⚠️ 它也占位，预算里必须算上（以前只在写出时加，估算漏掉 ⇒ 续页超限）。 */
const contSecLine = (sec) => `## ${secName(sec)}${sec === SEC_STMT ? '' : '（续）'}\n`;

/* 续页页首。⚠️ 预算与实际写出去的那份**必须同一处生成** —— 以前两边各写一遍，
   改了链接写法之后估算就和实际对不上了（估算偏小 ⇒ 顶破上限）。 */
const contHead = (node, k) =>
  `# ${node.label}　\`${node.id}\`　·　续页（第 ${k} 页）\n` +
  `${mdLink('在星图里打开', `../#n=${node.id}`)}　·　第 1 页 ${mdLink('nodes/' + node.id + '.md', './' + node.id + '.md')}` +
  (k > 2 ? `　·　上一页 ${mdLink('nodes/' + node.id + '.' + (k - 1) + '.md', './' + node.id + '.' + (k - 1) + '.md')}` : '') +
  '\n\n';

/** 把塞不进节点第 1 页的内容按小节打包成续页。
    规则：换小节一定另起一页（页首标题才诚实）；同一小节超预算也另起。
    ⚠️ 预算**两条上限都要查**（字节 ≤1300 **且** 转义后 ≤1050）—— 以前只看字节，
    LaTeX 密集的续页会卡在转义字符那条上（2026-10-13 被页脚与链接暴露出来）。
    ⚠️ 单条内容自己就顶破一页时（长证明 + 密集 LaTeX），先按段/按字切开 ——
    否则「另起一页」也救不了它。 */
function packPages(node, items, maxB, maxC) {
  const pages = [];
  let cur = null;
  /* ⚠️ 续页末尾还有一行「续见 <下一页>」（最后一页没有），它占位也要从预算里扣 ——
     不扣的话每页实测都比估算大 90 字符左右，正好顶破上限。 */
  const contJumpB = aiBytes(`\n> 续见 ${mdLink('nodes/' + node.id + '.99.md', './' + node.id + '.99.md')}\n`);
  const contJumpC = aiCost(`\n> 续见 ${mdLink('nodes/' + node.id + '.99.md', './' + node.id + '.99.md')}\n`);
  maxB -= contJumpB;
  maxC -= contJumpC;
  const fitsOn = (k, sec, lines, extra) => {
    const d = contHead(node, k) + contSecLine(sec) + lines.map(l => l + '\n').join('') + extra + '\n';
    return aiBytes(d) <= maxB && aiCost(d) <= maxC;
  };
  const push = () => { if (cur) { pages.push(cur); cur = null; } };

  // 先保证「每一条自己都能放进一页」；切出来的续块照旧待在同一小节里。
  // ⚠️ 用**最长的那种页首**（k 取两位，带「上一页」链接）估，别用第 2 页的短页首 ——
  //    靠后的续页页首更长，按短页首切出来的块会顶破。
  // ⚠️ aiChunk 内部按**全局**上限（AI_MAXB / AI_ESC）判，而续页的预算更紧；
  //    差额必须当 reserve 传进去，否则切出来「刚好合格」的块在续页上照样顶破。
  const flat = [];
  const worstHead = contHead(node, 99);
  for (const it of items) {
    for (const p of aiChunk(it.text, worstHead + contSecLine(it.sec), '', AI_MAXB - maxB, AI_ESC - maxC)) {
      flat.push({ sec: it.sec, text: p });
    }
  }

  for (const it of flat) {
    if (cur && it.sec !== cur.sec) push();
    if (!cur) cur = { sec: it.sec, lines: [] };
    if (cur.lines.length && !fitsOn(pages.length + 2, it.sec, cur.lines, it.text)) push();
    if (!cur) cur = { sec: it.sec, lines: [] };
    cur.lines.push(it.text);
  }
  push();
  return pages;
}

/** 一条边的正文：证明（implication / equivalence）或说明（definition / analogy） */
function edgeBody(e) {
  /* ⭐ 2026-11-03（T15）：implication 也允许写 proofs[]（一种结论、多种证法）。
     多个证法时按 label 分段排；否则走旧的单个 proof。
     ⚠️ 产物页体积有硬门（1300 B）—— 多证法很容易顶破，会自己续页。 */
  if (e.kind === 'implication') {
    if (Array.isArray(e.proofs) && e.proofs.length) {
      return e.proofs
        .map((p, i) => `**${p && p.label ? p.label : '证法 ' + (i + 1)}**\n\n${((p && p.text) || '').trim()}`)
        .join('\n\n');
    }
    return (e.proof || '').trim();
  }
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

/** 把一个格式串切成若干块，使 head + 块 + tail 能一次读完。
    ⚠️ 两个 reserve 分开传：字节数与转义字符数不是一回事（中文页字节远大于字符数，
    LaTeX 密集页反过来），只用一个数会在另一条上限上松掉 ⇒ 要么顶破、要么
    被压到「一个字都放不下」而退化成逐字切分（2026-10-13 踩过）。 */
function aiChunk(body, head, tail, resB = 150, resC = resB) {
  const fits = s => aiBytes(s) + resB <= AI_MAXB && aiCost(s) + resC <= AI_ESC;
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
function emitChunks(files, dir, base, head, body, tail, resB, contLabel = '续见') {
  const chunks = aiChunk(body, head, tail, resB);
  chunks.forEach((c, i) => {
    const name = `${base}${i ? '.' + (i + 1) : ''}`;
    let t = head + c + '\n';
    if (i < chunks.length - 1) t += `\n> ${contLabel} ${dir}/${base}.${i + 2}.md\n`;
    else if (tail) t += '\n' + tail + '\n';
    files.push({ path: `${dir}/${name}.md`, text: t });
  });
  return chunks.length;
}

function exportAIProducts(MG, graph, data) {
  const files = [];
  const ABS = MG.i18nAbstracts || { items: {}, status: 'draft', basedOn: null };
  /* ⚠️ 摘要的小节标题是**逐条**的（决策二.3）⇒ 每个节点现算一次，
     见下面循环里的 `const ABSEC = absHeading(ABS, n)`。 */
  const XREF = MG.xref || {};      // 外部锚点（T2.3）：节点 .md 里也要给出来
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
      `${(n.regions || []).map(rname).join('+')}\n` +
      `${mdLink('在星图里打开', `../#n=${n.id}`)}　·　${mdLink('节点索引', '../index.md')}\n\n`;
    const refs = (n.refs || []).length ? `\nrefs: ${n.refs.join('；')}\n` : '';
    /* 图外条目（T2.3）：这条在 Wikipedia / nLab / Mathlib 上的对应页 ——
       让人和 AI 都能从星图走到图外去核对。⚠️ 每条 URL 都真核过（见 src/data/xref.js 抬头），
       ⛔ 不核实不写。它占第 1 页的预算，所以和 refs 一起进预留。 */
    const xr = XREF[n.id] || null;
    const xrNames = { wikipedia: 'Wikipedia', nlab: 'nLab', stacks: 'Stacks', mathlib: 'Mathlib' };
    const xrefLine = xr
      ? `\n外部：${Object.keys(xrNames).filter(k => xr[k]).map(k => `${xrNames[k]} ${xr[k]}`).join(' · ')}\n`
      : '';
    const notes = (n.notes || '').trim();
    const notesPtr = notes ? `\n> 说明见 \`notes/${n.id}.md\`\n` : '';

    /* ⚠️ 预算一律**拼接后实测**，不要预测 —— 2026-09-23 连着踩了两轮：
       ① 「说明塞得下就内联」是在跳转行之前判的，跳转行一加就顶破；
       ② 先扣 refs 再扣说明再扣邻接，一路减法下来和实际拼出来的长度对不上。
       现在改成：每次要加东西就先拼一遍、量一遍。 */
    /* 最多三条「续页跳转」的位子。⚠️ 别写死常数、也别只按最短的那条估：
       三条里两条是更长的「另有…续页见」措辞，且行里都带节点 id 与链接 ——
       长 id（thm.induced-topos-morphism）一行就 90+ 字符。
       字节与转义字符**分别**算（中文页的字节远大于字符数），各自再留 80 的零头余量
       （空行、id 长短不一、行尾换行）。真顶破了还有构建断言兜底。 */
    const nodePageRef = (k) => mdLink('nodes/' + n.id + '.' + k + '.md', './' + n.id + '.' + k + '.md');
    /* 英文摘要的小节标题（含逐条状态）—— 它同时是 packPages 的「小节名」：
       换小节一定另起一页，所以摘要要么在第 1 页，要么整段进续页（不会被切两半）。 */
    const ABSEC = absHeading(ABS, n);
    const jumpLines = [
      `> 陈述续见 ${nodePageRef(99)}`,
      `- …另有入边，续页见 ${nodePageRef(99)}`,
      `- …另有出边，续页见 ${nodePageRef(99)}`,
    ];
    /* 带英文摘要的节点还可能多出：小节标题本身 + 「摘要续见」跳转行 ——
       摘要进了续页时，第 1 页就只剩这两行（≈155 字符），同样吃第 1 页的预算，
       所以**两条都要**进预留（只影响这 30 个枢纽节点）。
       ⚠️ 只留跳转行是不够的：标题那 95 字符没算 ⇒ 刚好顶破上限（踩过）。 */
    if (n.abstract_en) {
      jumpLines.push(ABSEC);
      jumpLines.push(`> English abstract 续见 ${nodePageRef(99)}`);
    }
    const JUMP_RESERVE_B = Math.max(190, jumpLines.reduce((s, l) => s + aiBytes(l) + 2, 0)) + 40;
    const JUMP_RESERVE_C = Math.max(190, jumpLines.reduce((s, l) => s + aiCost(l) + 2, 0)) + 40;

    // 说明：只有确实短小的才内联（这一步不看陈述，避免循环依赖）
    const notesInline = !!notes && aiBytes(notes) <= 300 &&
      aiBytes(head + refs) + aiBytes(notes) + 760 <= AI_MAXB;
    const notesTail = !notes ? '' : (notesInline ? '\n## 说明\n' + notes + '\n' : notesPtr);
    /* 引用方式写在每页尾部 —— 公开之后「怎么引用」的落地形态：
       节点 id 是别人唯一能追回这一页的线索。⚠️ 写短：这一行占的是 AI 单次抓取的
       预算（1050 字符），每个节点都有，写长了分页会翻倍 ——
       T1.4 改措辞时**一个字节都没加**（只把「条款见」换成许可标识符）。
       T1.4 起内容以 CC BY 4.0 授权，「标 id + 版本」是**请求**而非许可条件。 */
    const citeTail = `\n引用：\`${n.id}\`（内容 ${CONTENT_VERSION || 'dev'}）· CC BY 4.0 ${mdLink('LICENSE.txt', '../LICENSE.txt')}\n`;
    const mandatoryTail = refs + xrefLine + notesTail + citeTail;

    const stmtChunks = aiChunk((n.statement || '').trim(), head, refs,
      aiBytes(mandatoryTail) + JUMP_RESERVE_B, aiCost(mandatoryTail) + JUMP_RESERVE_C);

    let text = head + stmtChunks[0] + '\n';
    // ⚠️ 两条上限都要查（字节 + 转义后字符），别只看字节
    const canAdd = extra => {
      const draft = text + extra + mandatoryTail;
      return aiBytes(draft) + JUMP_RESERVE_B <= AI_MAXB && aiCost(draft) + JUMP_RESERVE_C <= AI_ESC;
    };
    const over = [];               // 塞不下的内容 → 续页

    /* 英文摘要（T2.2）：枢纽节点的英文导读，紧跟陈述。
       ⚠️ 它占 AI 单次抓取的预算 ⇒ 照老规矩「拼一遍、量一遍」，塞不下就进续页。
       ⚠️ 小节标题里带状态（draft/reviewed/stale）—— 由 absHeading() 现算，
          ⛔ 不许手写；中文陈述是权威版本这一句也写在标题里。 */
    if (n.abstract_en) {
      const blk = `\n${ABSEC}\n${n.abstract_en}\n`;
      if (canAdd(blk)) text += blk; else over.push({ sec: ABSEC, text: n.abstract_en });
    }

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
        const from = ids.map(s => mdLink('`' + s + '`', `../nodes/${s}.md`) + ' ' + label(s)).join(' + ');
        const ttl = e.kind === 'definition' ? `用到了定义 ${label(e.definition)}` : (e.title || e.id);
        return `- ${from}：${ttl}　${mdLink('proofs/' + e.id + '.md', `../proofs/${e.id}.md`)}`;
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
      const other = e.kind === 'implication' ? e.target
        : e.kind === 'definition' ? e.usedBy
        : (e.a === n.id ? e.b : e.a);
      const linked = mdLink('`' + other + '`', `../nodes/${other}.md`);
      if (e.kind === 'implication') return `- ⇒ ${linked} ${label(e.target)}`;
      if (e.kind === 'definition') return `- 被 ${linked} ${label(e.usedBy)} 用`;
      if (e.kind === 'analogy') return `- ～弱边 ${linked} ${label(other)}`;
      return `- ⟺ ${linked} ${label(other)}`;
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
    const pages = packPages(n, items.concat(over), AI_MAXB - 90, AI_ESC - 70);
    const firstOf = {};
    pages.forEach((p, i) => { if (firstOf[p.sec] == null) firstOf[p.sec] = i + 2; });

    text += mandatoryTail;

    // 第 1 页的跳转行：路径一定指向真实存在的那一页
    const jump = [];
    const nodePageLink = (k) => mdLink('nodes/' + n.id + '.' + k + '.md', './' + n.id + '.' + k + '.md');
    if (firstOf[SEC_STMT] != null) {
      jump.push([SEC_STMT, `> 陈述续见 ${nodePageLink(firstOf[SEC_STMT])}`]);
    }
    if (firstOf[SEC_IN] != null) {
      jump.push([SEC_IN, `- …另有入边，续页见 ${nodePageLink(firstOf[SEC_IN])}`]);
    }
    if (firstOf[SEC_OUT] != null) {
      jump.push([SEC_OUT, `- …另有出边，续页见 ${nodePageLink(firstOf[SEC_OUT])}`]);
    }
    if (firstOf[ABSEC] != null) {
      jump.push([ABSEC, `> English abstract 续见 ${nodePageLink(firstOf[ABSEC])}`]);
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
    /* 英文页（T3.1）：凡是有英文名或英文摘要的节点，都另出一份**英文入口页**。
       ⛔ 不是中文页的翻译 —— 中文陈述/证明没有英文版，这里只给「英文读者 / 英文 AI
       落在这一页时能拿到的东西」：英文名、层级、类型、星团、摘要（若有）、图外条目，
       以及指回**权威中文页**的路。缺什么就明说缺，不假装是全文。 */
    if (n.title_en || n.label_en || n.abstract_en) {
      const en = enNodeText(n, MG);
      emitChunks(files, 'nodes', n.id + '.en', en.head, en.body.trimEnd(), en.tail, en.tailRes, 'continued in');
    }
    const texts = [text];
    pages.forEach((p, i) => {
      const k = i + 2;
      let t = contHead(n, k) +
        contSecLine(p.sec) + p.lines.join('\n') + '\n';
      if (i < pages.length - 1) t += `\n> 续见 ${mdLink('nodes/' + n.id + '.' + (k + 1) + '.md', './' + n.id + '.' + (k + 1) + '.md')}\n`;
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

  /* ⚠️ 入口页只有 1300 B 的预算（硬断言）：只写「星系 → 星团 id」，
     星团的名字（中文 + 英文）在 `index/<星系id>.md` 那一页 —— 别往这里加名字。
     ⭐ 2026-10-16：星团数涨到 52 之后这一页顶破了 1300 B，于是**按星系分页**
     （`index.md` + `index.2.md` + …，与其他产物同一套分页约定）。 */
  {
    const head = `# 数学星图 · 目录\n\n` +
      `数据根 = 本目录。下一步：读 \`index/<星团id>.md\` 拿节点清单。\n` +
      `星团的名字见 \`index/<星系id>.md\`（那页还有中心天体与点数）。\n` +
      `规模：${data.meta.counts.regions} 星系 / ${data.meta.counts.clusters} 星团 / ` +
      `${data.meta.counts.nodes} 节点 / ${data.meta.counts.edges} 连线。\n\n`;
    const blocks = regions.map(({ r, cs }) =>
      `## ${r.name}（${r.id}）\n` + cs.map(c => c.id).join('　'));
    const parts = [];
    let cur = '';
    for (const b of blocks) {
      if (cur && aiBytes(head + cur + b + '\n') > AI_MAXB - 150) { parts.push(cur); cur = ''; }
      cur += b + '\n\n';
    }
    if (cur) parts.push(cur);
    const N = parts.length;
    parts.forEach((t, i) => {
      const k = i + 1;
      const h = k === 1
        ? head
        : `# 数学星图 · 目录（第 ${k}/${N} 页）\n\n根 \`../\`　·　第 1 页 \`index.md\`\n\n`;
      let text = h + t.trim() + '\n';
      if (k < N) text += `\n> 续见 \`index.${k + 1}.md\`\n`;
      files.push({ path: k === 1 ? 'index.md' : `index.${k}.md`, text });
    });
  }

  for (const { r, cs } of regions) {
    /* ⭐ 星团英文名（clusters.js 的 en，T2.4）也排进目录：英文读者/AI 顺着 id 走进来时，
       先看到的就是这两页，中文名之外给一个英文名，比让他去猜 id 强。
       ⛔ 缺英文名的就只写中文（回落规矩与全站一致，不编）。 */
    const lines = cs.map(c => `- ${c.id}　${c.name}${c.en ? ' / ' + c.en : ''}　中心天体 ${c.hub}　${c.nodes.length} 点`);
    const head1 = `# ${r.name}${r.en ? ' / ' + r.en : ''}（${r.id}）· 星团目录\n\n${r.desc}\n\n`;
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
    const head1 = `# ${c.name}${c.en ? ' / ' + c.en : ''}（${c.id}）· 节点清单\n\n${c.desc}\n` +
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
        ? `# ${c.name}${c.en ? ' / ' + c.en : ''}（${c.id}）· 节点清单（第 1/${N} 页）\n\n${c.desc}\n` +
          `中心天体 ${c.hub}　·　${c.nodes.length} 个节点　·　根 \`../\`` +
          (N > 1 ? `　·　续页 \`index/${c.id}.2.md\`` : '') + '\n\n'
        : `# ${c.name}${c.en ? ' / ' + c.en : ''}（${c.id}）· 节点清单（第 ${k}/${N} 页）\n` +
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
  const paths = new Set(files.map(f => f.path));  for (const f of files) {
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

  /* ④ 站内链接必须指向真实存在的文件 —— 节点页现在互相链（出边 / 入边 / 证明路径 /
       续页 / 许可），链错就是线上 404。⚠️ 这一条是加了链接之后必须补的活儿：
       「路径唯一」「续页跳转存在」只查了跳转行，查不到正文里的链接。 */
  const alwaysThere = new Set(['LICENSE.txt']);   // 直接写盘，不在 files 清单里
  for (const f of files) {
    const fromDir = path.posix.dirname(f.path);
    for (const m of f.text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const href = m[1];
      /* ⛔ 数学里的 `](…)` 不是链接：例如 $[\omega\wedge\omega](X,Y)$。
         只认「带扩展名的文件」或「以 ./ ../ / 开头的路径」；其余一律当公式放过。 */
      if (!/(^|\/)[\w.-]+\.(html|md|txt|png|svg|json|xml)$/.test(href) && !/^(\.{1,2}\/|\/)/.test(href)) continue;
      if (/^(https?:|#|\.\.\/#)/.test(href)) continue;      // 外链 / 页内锚点 / 星图深链
      const target = path.posix.normalize(path.posix.join(fromDir, href.replace(/^\.\//, '')));
      if (!paths.has(target) && !alwaysThere.has(target)) {
        errs.push(`链接指向不存在的文件：${f.path} → ${href}（解析为 ${target}）`);
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
    /* ⭐ 推论边（`layer:false` 的 implication）：**是推出，但不是前提**。
       它不参与分层（core/layers.js 里整条跳过），所以「层号必须往前走」对它
       不成立 —— 这正是它的语义，不是缺陷。
       ⛔ 只跳过这一类；equivalence / definition / 普通 implication 的断言一条没动。 */
    if (e.kind === 'implication' && e.layer === false) continue;
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
   那一行，AI 根本没读到走边规则。所以协议在前，细节全部挪去 reading.md / policy.md。
   ⚠️ 也正因为这条，**整份文件常年贴着 1300 B 的天花板**（现在 ~1280 B）：
   2026-10-16 加英文段（T1.3）时没有余量，只能从中文里等量让位 ——
   让掉的都是**与英文段重复**或**紧一紧就有**的字，信息一项没少：
     · 删「给 AI 用：按协议取数据，不要单次抓 graph.json」—— 下面的 ⚠ 段说的是同一件事
     · 删中文那句「可检索的数学知识图谱…」—— 英文段第一句就是它
     · ⚠ 段与「其它」段压缩措辞（分页规则、转义字符、四个文档的指针一个没丢）
   拉丁字母在「转义后字符数」那一档也更省 —— 两个上限都要看，见 aiCost()。 */
function exportLlmsTxt(data, base = '') {
  const c = data.meta.counts;
  const live = base === '' ? '线上：https://bingyingzizz.github.io/mathgalaxy/\n' : '';
  const nEn = data.meta.counts.en_pages || 0;
  return `# 数学星图 MathGalaxy

MathGalaxy: a searchable knowledge graph of mathematics.
${c.nodes} nodes / ${c.edges} edges · ${c.regions} galaxies / ${c.clusters} clusters${data.meta.version ? ' · content ' + data.meta.version : ''}.
Chinese is the source; ${nEn} nodes have English pages.
${c.regions} 星系 / ${c.clusters} 星团 / ${c.nodes} 节点 / ${c.edges} 连线。数据根 = 本文件所在目录。${live}
## 检索协议

0. \`${base}alias.md\` 大白话 / 英文名 → 节点 id。
1. \`${base}index.md\` 星系 → \`index/<星系id>.md\` 星团 → \`index/<星团id>.md\` 节点清单。
2. \`${base}nodes/<节点id>.md\` 陈述 + 出入边（每条带证明路径）；
   说明在 \`notes/<节点id>.md\`，边的正文在 \`proofs/<边id>.md\`。
3. **英文**：有英文名/摘要的节点另有 \`${base}nodes/<节点id>.en.md\`
   （英文名 + 摘要；陈述与证明仍以中文页为准）。文档英文版是 \`${base}*.en.md\`。
   ⛔ 没有英文版的就按中文页读，别猜。
顺着 id 继续读就是沿图走。

⚠ 抓取上限约 1000 词元（还会转义 \`# * [ ] \\\` _ ~\`）；放不下的分页成 \`<路径>.2.md\`，
首页永远是 \`<路径>.md\`。\`${base}graph.json\` / \`graph.md\` 只下载，别用来检索。

## 其它

\`${base}reading.md\` 结构 · \`policy.md\` 准则 · \`hubs.md\` 枢纽 · \
\`notation.md\` 记号表。LaTeX 走 KaTeX；\`label\` 等字段是纯文本。
`;
}

/* ------------------------------------------------------------- reading.md */
function exportReading(data, base = '') {
  return `# 数学星图 · 怎么读这张图

数据见 \`${base}index.md\`。

## 三层尺度

星系（领域）→ 星团（一套自足的装置）→ 节点（定理 / 定义 / 引理）。
**星团 = 为造出某个「能用的东西」的一整套结果**；\`hub\` 是**中心天体**。

## 边：四种 kind ＋ 推论标记

- \`implication\`（带证明）、\`equivalence\`（双向）、\`definition\`（定义 → 用到它的结论）：
  **strong**，逻辑骨架。
- \`analogy\` 是 **weak** 边：思想相通、无蕴含，用时须明说「弱边联想，非逻辑结论」。不参与分层。
- ⭐ **推论**（**粉红箭头**）= \`implication\` + \`layer: false\`：真推得通，但不是「由前面得来」
  （常是高级工具回头证），故**不参与分层**。黑 = 建造顺序，粉 = 也能推。

## layer（依赖深度）

层号从 ZF 沿最长前置链数出（等价命题同层），可作**阅读次序参考**，非课程顺序。
⚠️ 记的是**构造依赖**，不代表要从公理学起。

## 字段与引用

\`id\` \`type\` \`label\` \`title\` \`region\` \`cluster\` \`layer\` \`statement\` \`notes\` \`refs\`；
深链 \`#n=节点\` \`#c=星团\` \`#q=搜索\`。

内容 CC BY 4.0；引用请写 \`id\` + 内容版本，见 \`${base}LICENSE.txt\`。记号见 \`${base}notation.md\`。
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
/* ⭐⭐⭐ 枢纽榜：**入和出说的是两件相反的事**（2026-11-02 外部评审指出，核对后确认它对）

   边的方向一律是「前置 → 依赖它的结论」。所以对同一个节点：
     · 入（上游客多）  ＝ 由很多前置一起推出   ⇒ **综合结论**（学它之前得先懂一片）
     · 出（下游客多）  ＝ 被很多结论当作前置   ⇒ **基础工具**（值得优先学熟）
     · 下游横跨星团多  ⇒ **跨领域连接**（位置枢纽，但**不是**入门顺序）

   ⚠️ 旧版只有「入边数」一条，却写成「哪些东西是真正的地基，值得优先学熟」—— 方向恰好反了。
      实例：`lem.zorn` 入边 7，是因为有多条推导**以它作结论**；它真正的分量在出边。
   ⚠️ 另一个旧 bug：`definition` 边存的是 `{definition, usedBy}`，旧代码 `bump(usedBy)` 把
      「用到了几个定义」算进了「被引用次数」—— 口径其实混了两件事。现在两栏分开、方向各自算。
   每榜同时给「不同节点数 / 边数」，**排名按不同节点数**（边数会被同一对节点多条边灌水）。 */
function hubBoards(graph) {
  const use = new Map(), pre = new Map(), useE = new Map(), preE = new Map();
  const add = (m, k, v) => { if (!m.has(k)) m.set(k, new Set()); m.get(k).add(v); };
  const cnt = (m, k) => m.set(k, (m.get(k) || 0) + 1);
  for (const e of graph.edges) {
    if (e.kind === 'analogy') continue;               // 弱边不进逻辑骨架
    if (e.kind === 'implication') {
      for (const s of (e.sources || [])) { add(use, s, e.target); cnt(useE, s); }
      /* ⚠️ 入边数按**边**数（一条 entails 多个前提也只能算一条边）——
         否则会和节点面板里「它依赖 N 个」（panel.js 数的是边）对不上 */
      for (const s of (e.sources || [])) add(pre, e.target, s);
      cnt(preE, e.target);
    } else if (e.kind === 'definition') {
      /* 概念方向是 definition → usedBy（定义是前置） */
      add(use, e.definition, e.usedBy); cnt(useE, e.definition);
      add(pre, e.usedBy, e.definition); cnt(preE, e.usedBy);
    } else if (e.kind === 'equivalence') {
      /* ⭐ 等价边**不进这两榜**：它两边互推，说「谁是谁的前提」没意义，
         且节点面板的「它依赖 N 个 / 被 M 个依赖」也只数推出与定义两种边
         —— 口径一致，读者拿两个数对看不会当场打架。 */
      continue;
    }
  }
  const nodeById = new Map(graph.nodes.map(n => [n.id, n]));
  const clName = id => {
    const n = nodeById.get(id);
    return (n && n.cluster && graph.clusterById[n.cluster]) ? graph.clusterById[n.cluster].name : '—';
  };
  /* 第三榜的「横跨几个团」= 下游节点落在多少个不同星团里 */
  const spread = new Map();
  for (const [k, set] of use) {
    const cs = new Set();
    for (const id of set) { const n = nodeById.get(id); if (n && n.cluster) cs.add(n.cluster); }
    spread.set(k, cs.size);
  }
  /* ⭐ `by` 决定主排序键：基础/综合按「不同节点数」，跨领域按「横跨星团数」
     （否则第三榜会与第一榜长得一模一样 —— 下游多的大多横跨得多，但没有区分度） */
  const rank = (m, e, extra, by) => graph.nodes
    .map(n => ({ n, nodes: (m.get(n.id) || new Set()).size, edges: e.get(n.id) || 0,
      more: extra ? extra(n.id) : 0 }))
    .filter(x => x.nodes > 0 && (!by || x.more > 0))
    .sort((a, b) => by === 'more'
      ? (b.more - a.more || b.nodes - a.nodes || a.n.layer - b.n.layer)
      : (b.nodes - a.nodes || b.edges - a.edges || a.n.layer - b.n.layer));
  return [
    { key: 'base', zh: '基础工具榜', en: 'Foundations (most depended on)',
      zhWhy: '被最多结论当作前置（出边多）—— 值得优先学熟。',
      enWhy: 'The most results take it as a prerequisite (out-edges) — learn these first.',
      rows: rank(use, useE) },
    { key: 'big', zh: '综合结论榜', en: 'Comprehensive results',
      zhWhy: '由最多前置一起推出（入边多）—— 学它之前得先懂一片，**不是**入门首选。',
      enWhy: 'Derived from the most prerequisites (in-edges) — you need a lot first; not a first read.',
      rows: rank(pre, preE) },
    { key: 'cross', zh: '跨领域连接榜', en: 'Cross-domain hubs',
      zhWhy: '下游节点横跨的星团最多 —— 位置枢纽，但**不**代表该先学。',
      enWhy: 'Their dependents span the most clusters — central, but not a study order.',
      rows: rank(use, useE, id => spread.get(id) || 0, 'more') },
  ];
}

/** 枢纽定理榜（中文产物）：三榜并排，各给「不同节点数 / 边数」。 */
function exportHubs(MG, graph, data) {
  void data;
  const L = ['# 数学星图 · 枢纽定理榜', '',
    '边是「前置 → 依赖它的结论」，**出和入说两件相反的事**：',
    '出边多 = **基础工具**（很多结论靠它）；入边多 = **综合结论**（得先懂一片）；',
    '下游横跨星团多 = **连接枢纽**（不是入门顺序）。',
    '每行两数按前者排；只数推出与定义，弱边、等价边不计。',
    `每榜前 3 条；完整清单在 \`hubs/<榜>.md\`（各 ${HUB_ROWS} 条）。`, ''];
  const boards = hubBoards(graph);
  const fit = s => aiBytes(s) <= AI_MAXB - 150 && aiCost(s) <= AI_ESC - 150;
  for (const b of boards) {
    const head = `## ${b.zh}`;
    if (!fit(L.join('\n') + '\n' + head + '\n')) continue;
    L.push(head);
    let k = 0;
    for (const x of b.rows) {
      /* ⭐ 索引只放前 3：整个产物卡在 1300 B，一个榜吃到饱就把另两个挤掉了。
         完整清单走 `hubs/<榜>.md`（分页产物）—— ⛔ 不许写「见 graph.json」：那是 550 KB
         的 bulk 文件，单次抓取只拿到开头，等于把读者推进坑里（见 build.mjs 第 794 行的规矩）。 */
      if (k++ >= 3) break;
      const line = hubRow(graph, b, x, false);
      if (!fit(L.join('\n') + '\n' + line + '\n')) break;
      L.push(line);
    }
    L.push(`- 全部：\`hubs/${b.key}.md\``, '');
  }
  return L.join('\n') + '\n';
}

/* 每榜列多少条。30 条 × ~52 B 已经顶破 1300 B，所以单页只放 20（实测 ~1160 B）。
   再多的部分就进续页 —— `emitChunks` 会自动切（`hubs/<榜>.2.md`）。 */
const HUB_ROWS = 20;

/** 榜上一行。索引页不带 layer / 星团（省字节），单榜页带上（读的时候要定位）。 */
function hubRow(graph, b, x, withCtx) {
  const deg = b.key === 'cross'
    ? `**${x.more} 团 / ${x.nodes} 节点**` : `**${x.nodes} / ${x.edges}**`;
  const ctx = withCtx ? ` · layer ${x.n.layer}` : '';
  return `- ${deg} \`${x.n.id}\` ${x.n.label}${ctx} · ${clNameOf(graph, x.n)}`;
}

/** 三榜的完整清单 → `hubs/<榜>.md`（放不下自动续页）。和 `notation/*.md` 同一套规矩。
    ⚠️ **不能直接用 `emitChunks`**：那里面是 `aiChunk`，按字节切文本，会把一行榜切在
    `· layer ` 中间（实测：base.md 最后一行就断在那里）。排行清单必须**按行**切。 */
function exportHubProducts(graph) {
  const files = [];
  for (const b of hubBoards(graph)) {
    const head = `# 枢纽定理榜 · ${b.zh}\n索引 \`hubs.md\`\n\n${b.zhWhy}\n`;
    const rows = b.rows.slice(0, HUB_ROWS).map(x => hubRow(graph, b, x, true));
    rows.push(`\n（共 ${b.rows.length} 个节点在这一榜上有非零计数；这里列前 ${Math.min(HUB_ROWS, b.rows.length)} 条。）`);
    emitRows(files, 'hubs', b.key, head, rows, '索引 `hubs.md`。');
  }
  return files;
}

/** 按**行**分页落盘（不切行）。`rows` 里的行自己带换行时要照旧（尾注那种）。
    续页命名与 proofs / notation 同一套：第 1 页 \`<base>.md\`、第 k 页 \`<base>.<k>.md\`。 */
function emitRows(files, dir, base, head, rows, tail) {
  const fits = s => aiBytes(s) <= AI_MAXB && aiCost(s) <= AI_ESC;
  const render = (rs, last) => head + rs.join('\n') + '\n' + (last ? '\n' + tail + '\n' : '');
  const contOf = k => `\n> 续见 ${dir}/${base}.${k}.md\n`;
  const pages = [];
  let cur = [];
  for (const r of rows) {
    if (!cur.length) { cur = [r]; continue; }
    const next = cur.concat([r]);
    /* 两种结尾都试：这一页可能是最后一页（带尾注），也可能还有下一页（带「续见」） */
    const k = pages.length + 2;
    if (!fits(render(next, true)) && !fits(render(next, false) + contOf(k))) {
      pages.push(cur); cur = [r];
    } else cur = next;
  }
  if (cur.length) pages.push(cur);
  pages.forEach((rs, i) => {
    const last = i === pages.length - 1;
    files.push({
      path: `${dir}/${base}${i ? '.' + (i + 1) : ''}.md`,
      text: render(rs, last) + (last ? '' : contOf(i + 2)),
    });
  });
  return pages.length;
}

/** 人读的一整篇（站点阅读页用）。⚠️ 与 AI 产物形状**故意不同** —— 理由同 `notation-full.md`。 */
function exportHubsFull(graph) {
  const L = ['# 数学星图 · 枢纽定理榜', '',
    '边的方向是「前置 → 依赖它的结论」，所以同一个节点的**入和出说的是两件相反的事**：',
    '- **基础工具榜**：被最多结论当前置（出边多）—— 值得优先学熟。',
    '- **综合结论榜**：由最多前置推出（入边多）—— 学之前得先懂一片，**不是**入门首选。',
    '- **跨领域连接榜**：下游横跨的星团最多 —— 位置枢纽，**不是**入门顺序。',
    '每项给「不同节点数 / 边数」（连接榜是「星团数 / 节点数」）；弱边（类比）与等价边不计。', ''];
  for (const b of hubBoards(graph)) {
    L.push(`## ${b.zh}`, '', b.zhWhy, '');
    for (const x of b.rows.slice(0, HUB_ROWS)) L.push(hubRow(graph, b, x, true));
    L.push('', `（共 ${b.rows.length} 个节点有非零计数；这里列前 ${Math.min(HUB_ROWS, b.rows.length)} 条。）`, '');
  }
  return L.join('\n') + '\n';
}

/** 星团名的取法只有这一处（两个榜函数共用） */
function clNameOf(graph, n) {
  return (n.cluster && graph.clusterById[n.cluster]) ? graph.clusterById[n.cluster].name : '—';
}


/* ============================================================ 内容体检（警告级） */
/* ⭐ 2026-11-03（审计 §9 H1/H2）：A–G 那一堆问题之所以「每加一批内容就复发」，
   是因为构建只有四个硬门（边端点 / 纯文本字段 / 体积 / 层向）。
   这里补三个**内容级**检查，全部**警告级**（只报告，不返回错误）：
     ① 正文里 `反引号` 引用的 id 不存在（改名遗留、拼错；审计 G1）
     ② 归一化后近同名、却**没有任何边**的两颗星（同一件事造了两个节点；审计 C1）
     ③ 黑边子图上的环（审计 H2）：等价边在环里 = 合法；白名单 = 多前提假环；其余 = 可疑
   ⛔ 为什么不做成红灯：②③ 都会误报（「顺嘴提一句」「多前提互推」都是合法情形），
      先观察一批再收紧。②的细口径与 `_tools/_nov15.mjs` 一致（审计的数字就是它算的）。
      缺口清单里已有的「陈述用到更深的定义却没边」= 审计的 ②（H1 第二项），不重复实现。
   ⚠️ 审计 H1 的第四项「implication 是否该是粉边」不单独实现：它能自动抓的那一半
      （A⟹B 且 B⟹A）正好就是③报出来的 2-环，分类时一并判断。 */

/** 归一化 label：去掉括注、空格、连字符，统一小写（和 _nov15 同一口径） */
function normLabel(s) {
  return String(s || '').replace(/（.*?）|\(.*?\)/g, '').replace(/[·・\s\-–—]/g, '').toLowerCase();
}
/** 两颗星的 label 是否「近同名」（前者是后者的前缀且长度差 ≤2，或完全相同） */
function nearLabel(a, b) {
  if (a === b) return true;
  const [x, y] = a.length < b.length ? [a, b] : [b, a];
  if (x.length < 4) return x === y;
  let i = 0;
  while (i < x.length && x[i] === y[i]) i++;
  if (i < Math.min(x.length, y.length) - 1) return false;
  return y.length - x.length <= 2;
}

function auditContent(MG, graph) {
  const nodeIds = new Set(graph.nodes.map((n) => n.id));
  const edgeIds = new Set(graph.edges.map((e) => e.id).filter(Boolean));
  const clusterIds = new Set(graph.clusters.map((c) => c.id));

  /* ---------- ① 正文引用的 id 是否存在 ---------- */
  /* 例外：源码文件名（`notation.js`）、工具名 —— 它们不是节点/边/团 */
  const FILE_OK = /\.(js|mjs|json|md|txt|html|css)$/;
  const dangling = new Map();
  const scan = (text, where) => {
    if (typeof text !== 'string' || !text) return;
    for (const m of text.matchAll(/`([a-z][a-z0-9]*(?:\.[a-z0-9][a-z0-9-]*)+)`/g)) {
      const id = m[1];
      if (nodeIds.has(id) || edgeIds.has(id) || clusterIds.has(id)) continue;
      if (FILE_OK.test(id)) continue;
      if (!dangling.has(id)) dangling.set(id, []);
      const arr = dangling.get(id);
      if (arr.length < 6) arr.push(where);
    }
  };
  for (const n of graph.nodes) {
    for (const f of ['statement', 'notes', 'title']) scan(n[f], n.id + '.' + f);
  }
  for (const e of graph.edges) {
    if (e.kind === 'definition' || e.kind === 'analogy') scan(e.note, e.id + '.note');
    else scan(e.proof, e.id + '.proof');
    for (const p of (e.proofs || [])) scan(p && p.text, e.id + '.proofs');
  }

  /* ---------- ② 近同名却无边 ---------- */
  const adj = new Map(graph.nodes.map((n) => [n.id, new Set()]));
  const link = (a, b) => { if (adj.has(a) && adj.has(b) && a !== b) { adj.get(a).add(b); adj.get(b).add(a); } };
  for (const e of graph.edges) {
    const f = e.kind === 'implication' ? (e.sources || []) : e.kind === 'definition' ? [e.definition] : [e.a];
    const t = e.kind === 'implication' ? [e.target] : e.kind === 'definition' ? [e.usedBy] : [e.b];
    for (const x of f) for (const y of t) link(x, y);
  }
  const labs = graph.nodes.map((n) => [normLabel(n.label), n]).filter((x) => x[0] && x[0].length >= 3);
  const nearPairs = [];
  for (let i = 0; i < labs.length; i++) {
    for (let j = i + 1; j < labs.length; j++) {
      const [la, a] = labs[i], [lb, b] = labs[j];
      if (a.id === b.id || !nearLabel(la, lb)) continue;
      if (adj.get(a.id).has(b.id)) continue;
      /* 已用 distinctFrom 明确「同词不同物」⇒ 不再是噪音（I3）。 */
      if ((a.distinctFrom || []).includes(b.id) || (b.distinctFrom || []).includes(a.id)) continue;
      nearPairs.push([a, b]);
    }
  }
  nearPairs.sort((p, q) => Math.abs(q[0].layer - q[1].layer) - Math.abs(p[0].layer - p[1].layer));

  /* ---------- ③ 黑边子图上的环 ---------- */
  /* 参与分层的边 = definition + 黑 implication + equivalence（粉边与类比不进）。 */
  const N = graph.nodes.length;
  const idx = new Map(graph.nodes.map((n, i) => [n.id, i]));
  const out = Array.from({ length: N }, () => []);
  const layerEdge = [];          // { from, to, e }
  for (const e of graph.edges) {
    if (e.kind === 'analogy') continue;
    if (e.kind === 'implication' && e.layer === false) continue;
    const f = e.kind === 'implication' ? (e.sources || []) : e.kind === 'definition' ? [e.definition] : [e.a];
    const t = e.kind === 'implication' ? [e.target] : e.kind === 'definition' ? [e.usedBy] : [e.b];
    for (const x of f) for (const y of t) {
      const i = idx.get(x), j = idx.get(y);
      if (i == null || j == null || i === j) continue;
      out[i].push(j);
      layerEdge.push({ i, j, e });
    }
  }
  /* Tarjan（迭代版） */
  const index = new Int32Array(N).fill(-1), low = new Int32Array(N), on = new Uint8Array(N);
  const comp = new Int32Array(N).fill(-1), stk = [];
  let counter = 0, cc = 0;
  for (let root = 0; root < N; root++) {
    if (index[root] !== -1) continue;
    const work = [[root, 0]];
    while (work.length) {
      const top = work[work.length - 1], v = top[0], pi = top[1];
      if (pi === 0) { index[v] = low[v] = counter++; stk.push(v); on[v] = 1; }
      let recursed = false;
      for (let k = pi; k < out[v].length; k++) {
        const w = out[v][k];
        if (index[w] === -1) { top[1] = k + 1; work.push([w, 0]); recursed = true; break; }
        if (on[w]) low[v] = Math.min(low[v], index[w]);
      }
      if (recursed) continue;
      if (low[v] === index[v]) {
        for (;;) { const w = stk.pop(); on[w] = 0; comp[w] = cc; if (w === v) break; }
        cc++;
      }
      work.pop();
      if (work.length) {
        const parent = work[work.length - 1][0];
        low[parent] = Math.min(low[parent], low[v]);
      }
    }
  }
  const okIds = new Set(((MG.gaps && MG.gaps.cycleOk) || []).map((x) => x.id));
  const okWhy = new Map(((MG.gaps && MG.gaps.cycleOk) || []).map((x) => [x.id, x.why]));
  const cycles = [];
  const byComp = new Map();
  for (const le of layerEdge) {
    /* ⚠️ 只有**两端在同一个 SCC** 的边才在环上；跨 SCC 的边不是环（踩过：
       先按起点分组、再把两端都算进成员 ⇒ 每条普通边都被当成一个「环」）。 */
    if (comp[le.i] !== comp[le.j]) continue;
    const c = comp[le.i];
    if (!byComp.has(c)) byComp.set(c, []);
    byComp.get(c).push(le);
  }
  for (const [c, list] of byComp) {
    const members = new Set();
    for (const le of list) { members.add(le.i); members.add(le.j); }
    if (members.size < 2) continue;                    // 单点 SCC = 没有环
    const hasEquiv = list.some((le) => le.e.kind === 'equivalence');
    const okEdge = list.find((le) => okIds.has(le.e.id));
    const verdict = hasEquiv ? 'ok-equiv' : okEdge ? 'ok-whitelist' : 'suspicious';
    cycles.push({
      verdict,
      nodes: [...members].map((i) => graph.nodes[i].id),
      edges: [...new Set(list.map((le) => le.e.id))],
      why: okEdge ? okWhy.get(okEdge.e.id) : '',
    });
  }

  /* ---------- ④ 证明完成度（T13 / I5） ---------- */
  /* 值只许三选一；正文自己说「骨架 / 未展开 / 外部输入」的**必须**显式标注 ——
     研究者引用前要能一眼看出「这条敢不敢引」。缺省 = complete（不写）。 */
  const OK_STATUS = new Set(['complete', 'skeleton', 'external-input']);
  const statusBad = [];
  const statusMissing = [];
  for (const n of graph.nodes) {
    if (n.status && !OK_STATUS.has(n.status)) statusBad.push(n.id + ' → ' + n.status);
    const txt = String(n.statement || '') + ' ' + String(n.notes || '');
    if (!n.status && /骨架|未展开|只给陈述|外部输入/.test(txt)) statusMissing.push(n.id);
  }

  /* ---------- 五、假设标注（T14 / I6） ---------- */
  /* 值必须来自 `src/data/hypotheses.js` 的受控词表。陈述里命中某条 hint 却没标 ⇒ 列清单。
     ⛔ **只提醒，不自动打标**：「注里提到」与「陈述里的假设」是两件事，自动标会大面误标
     （比如「这里不需要选择公理」会被当成「需要」）。 */
  const HY = (MG.hypotheses && MG.hypotheses.list) || [];
  const VOCAB = new Set(HY.map((x) => x.zh));
  const HINTS = HY.map((x) => ({ zh: x.zh, rx: new RegExp(x.hint, 'g') }));
  const hypBad = [];
  const hypMissing = [];
  for (const n of graph.nodes) {
    for (const h of (n.hypotheses || [])) if (!VOCAB.has(h)) hypBad.push(n.id + ' → ' + h);
    if (n.hypotheses && n.hypotheses.length) continue;
    const st = String(n.statement || '');
    if (!st) continue;
    for (const v of HINTS) { v.rx.lastIndex = 0; if (v.rx.test(st)) { hypMissing.push(n.id + '  ‹' + v.zh + '›'); break; } }
  }

  return { dangling, nearPairs, cycles, statusBad, statusMissing, hypBad, hypMissing };
}

/** 把体检结果写成 `dist/audit.md`（警告级产物） */
function exportAudit(audit, graph) {
  const L = ['# 数学星图 · 内容体检（警告级）', ''];
  L.push('由 `tools/build.mjs` 生成。**不是硬门**：这三类都会误报，先看，别急着改数据。');
  L.push('');
  L.push(`## 一、正文引用了不存在的 id（${audit.dangling.size} 个）`, '');
  if (!audit.dangling.size) L.push('（没有）');
  for (const [id, wheres] of audit.dangling) {
    L.push(`- \`${id}\` ← ${wheres.join(' · ')}`);
  }
  L.push('', `## 二、近同名却没有任何边（${audit.nearPairs.length} 对）`, '');
  L.push('判据：label 去掉括注/空格后相同或前缀相近（与 `_tools/_nov15.mjs` 同口径），且两颗星之间一条边都没有。');
  L.push('');
  if (!audit.nearPairs.length) L.push('（没有）');
  for (const [a, b] of audit.nearPairs) {
    L.push(`- ${a.label}（\`${a.id}\` L${a.layer}）⇸ ${b.label}（\`${b.id}\` L${b.layer}）`);
  }
  L.push('', `## 三、黑边子图上的环（${audit.cycles.length} 个）`, '');
  L.push('判据见审计 §9-H2：**环里有 equivalence 边 = 合法**（等价类本来就会缩成一个 SCC）；' +
    '**白名单 = 多前提假环**（`src/data/gaps.js` 的 `cycleOk`，每条都写了理由）；' +
    '**其余 = 可疑**（要么改 `equivalence`，要么标 `layer:false`，要么这条边就是错的）。');
  L.push('');
  if (!audit.cycles.length) L.push('（没有）');
  for (const c of audit.cycles) {
    const tag = c.verdict === 'ok-equiv' ? '✅ 等价类（合法）'
      : c.verdict === 'ok-whitelist' ? '⚪ 白名单（多前提假环）' : '⚠️ 可疑 —— 需要人看';
    L.push(`- ${tag}：${c.nodes.map((x) => '`' + x + '`').join(' ↔ ')}`);
    L.push(`  - 环上的边：${c.edges.map((x) => '`' + x + '`').join(' · ')}`);
    if (c.why) L.push(`  - 为什么不算循环：${c.why}`);
    if (c.verdict === 'suspicious') {
      L.push('  - 三种处理：无条件互推 ⇒ 改 `equivalence`（双向 proofs）；用更强工具回头证 ⇒ 标 `layer: false`；都不是 ⇒ 数据错。');
    }
  }
  L.push('', `## 四、证明完成度标注（status）`, '');
  L.push('值只许 `complete`（缺省）/ `skeleton` / `external-input`。正文自己说「骨架 / 未展开 / 外部输入」却没标注的，列在下面。');
  L.push('');
  if (!audit.statusBad.length && !audit.statusMissing.length) L.push('（没有）');
  for (const x of audit.statusBad) L.push(`- ⚠️ 非法取值：${x}`);
  for (const x of audit.statusMissing) L.push(`- 该标未标：\`${x}\``);
  L.push('');
  /* ---------- 五、假设标注（T14/I6） ---------- */
  L.push('', `## 五、假设标注（hypotheses）`, '');
  L.push('值必须来自 `src/data/hypotheses.js` 的受控词表。第二条**只是提醒**：陈述里命中「假设关键词」却没标注 —— ⛔ 不自动打标（「注里提到」不等于「陈述里的假设」）。');
  L.push('');
  if (!audit.hypBad.length) L.push('- 词表外取值：（没有）');
  for (const x of audit.hypBad) L.push(`- ⚠️ 不在词表里：${x}`);
  L.push(`- 陈述里出现假设关键词、但没标注：**${audit.hypMissing.length}** 处`);
  if (audit.hypMissing.length) {
    L.push('');
    L.push(audit.hypMissing.slice(0, 40).map((x) => '  - ' + x).join('\n'));
    if (audit.hypMissing.length > 40) L.push(`  - …还有 ${audit.hypMissing.length - 40} 处`);
  }
  L.push('');
  return L.join('\n') + '\n';
}

/* ------------------------------------------------------------- 缺口清单 */
/* ⭐ 2026-11-03（审计 I2）：图只记录**存在的东西**，于是「我还缺哪一块」查不到。
   这份产物把两类洞写出来（都是**警告级**，不是硬门）：
     ① 候选词表里的词：正文提到了，却没有任何节点的 label / aka 对得上；
     ② 陈述里出现了某个**定义**的 label，却没有指向它的定义边（且那个定义并不比它浅）。
   ⛔ ② 会误报（「顺嘴提一句」也算），所以只进报告，不进断言。
   ⚠️ 词表在 `src/data/gaps.js`：加词的门槛是「一个读者会顺着这个词去找定义」。 */
function exportGaps(MG, graph) {
  const TERMS = ((MG.gaps && MG.gaps.terms) || []).slice();
  const akaOf = new Map(((MG.aliases && MG.aliases.nodes) || []).map((r) => [r.id, r.aka || []]));
  const body = (n) => (n.statement || '') + '\n' +
    (Array.isArray(n.notes) ? n.notes.join('\n') : (n.notes || ''));
  const count = (s, t) => { let c = 0, i = 0; while ((i = s.indexOf(t, i)) >= 0) { c++; i += t.length; } return c; };

  const rows = TERMS.map((t) => {
    const holders = graph.nodes.filter((n) =>
      String(n.label).includes(t) || (akaOf.get(n.id) || []).some((a) => String(a).includes(t)));
    const mentions = [];
    let total = 0;
    for (const n of graph.nodes) {
      const c = count(body(n), t);
      if (c) { mentions.push({ id: n.id, c }); total += c; }
    }
    mentions.sort((a, b) => b.c - a.c);
    return { term: t, holders: holders.map((n) => n.id), total, mentions };
  });

  const missing = rows.filter((r) => !r.holders.length && r.total > 0)
    .sort((a, b) => b.total - a.total);
  const never = rows.filter((r) => !r.total).map((r) => r.term);

  /* ② 陈述用到更深的定义却没边（同一条边任一方向都算「接上了」） */
  /* 口径与审计脚本 _nov16.mjs 一致：只看**陈述**，label 去掉括注后至少 3 字，
     且只算「定义不比它浅」的情形 —— 否则「顺嘴提一句」会把这份报告冲到上千条。 */
  const bare = (x) => String(x || '').replace(/（.*?）|(.*?)/g, '').trim();
  const defs = graph.nodes.filter((n) => n.type === 'definition' && bare(n.label).length >= 3);
  const EDGE_PAIRS = new Set();
  for (const e of graph.edges) {
    const p = e.kind === 'implication'
      ? { from: e.sources || [], to: [e.target] }
      : e.kind === 'definition' ? { from: [e.definition], to: [e.usedBy] }
        : { from: [e.a], to: [e.b] };
    for (const a of p.from) for (const b of p.to) { EDGE_PAIRS.add(a + '>' + b); EDGE_PAIRS.add(b + '>' + a); }
  }
  const noEdge = [];
  /* C3 白名单（`src/data/gaps.js` 的 `noEdgeOk`）：判过「这不是缺边」的（node, def）对。
     ⭐ 白名单不是删报告 —— `noEdgeAll` 保留全量，报告里单列一节写清「白了几条、为什么」，
     否则它就是刷绿。 */
  const OKED = new Map();
  for (const r of (MG.gaps && MG.gaps.noEdgeOk) || []) {
    if (r && r.node && r.def) OKED.set(r.node + '>' + r.def, r.why || '');
  }
  const noEdgeAll = [];
  for (const n of graph.nodes) {
    const st = n.statement || '';
    if (!st) continue;
    for (const d of defs) {
      if (d.id === n.id) continue;
      const base = bare(d.label);
      if (base.length < 3 || !st.includes(base)) continue;
      if (EDGE_PAIRS.has(n.id + '>' + d.id)) continue;
      const gap = (d.layer || 0) - (n.layer || 0);
      if (gap < 0) continue;            // 定义比它浅 ⇒ 不算「往下掉」（同审计口径）
      const rec = { node: n.id, nodeLabel: n.label, nodeLayer: n.layer, def: d.id, defLabel: d.label, defLayer: d.layer, gap };
      noEdgeAll.push(rec);
      if (OKED.has(n.id + '>' + d.id)) continue;
      noEdge.push(rec);
    }
  }
  /* 白名单条目必须真能对上一条缺口 —— 对不上就是过期账（改了陈述/加了边），要清。 */
  const allKeys = new Set(noEdgeAll.map((x) => x.node + '>' + x.def));
  const staleOk = [...OKED.keys()].filter((k) => !allKeys.has(k));
  noEdge.sort((a, b) => b.gap - a.gap);

  const cnt = graph.metaCounts || { nodes: graph.nodes.length, edges: graph.edges.length };
  const L = [
    '# 数学星图 · 缺口清单（提到了，但没节点 / 没边）',
    '',
    `规模：${cnt.nodes} 节点 / ${cnt.edges} 连线。本文件由 \`tools/build.mjs\` 生成，**警告级**，不是硬门。`,
    '',
    '怎么读：',
    '- **第一节**：`src/data/gaps.js` 里的候选词，正文提到了 N 次，却没有任何节点的名字/别名对得上 ⇒ 这是个洞。',
    '- **第二节**：某节点陈述里出现了定义 `X` 的名字，却没有通向 `X` 的边 —— 读者顺着这个词会掉下去。',
    '- **第三节**：候选词表里**一次都没提到**的词（真空白：连「提过」都没有）。',
    '',
    '⚠️ 第二节会误报（「顺嘴提一句」也算），所以只列出来给人看，不做断言。',
    '',
    `## 一、提到了但没有节点（${missing.length} 个）`,
    '',
  ];
  if (!missing.length) L.push('（没有）');
  for (const r of missing) {
    L.push(`### ${r.term}　出现 ${r.total} 次`);
    L.push(r.mentions.slice(0, 6).map((m) => `\`${m.id}\``).join(' · ') +
      (r.mentions.length > 6 ? ` 等 ${r.mentions.length} 个节点` : ''));
    L.push('');
  }
  L.push(`## 二、陈述用到更深的定义却没有边（${noEdge.length} 处）`, '');
  if (!noEdge.length) L.push('（没有）');
  for (const x of noEdge.slice(0, 200)) {
    L.push(`- \`${x.node}\`（${x.nodeLabel} · L${x.nodeLayer}）用到 \`${x.def}\`（${x.defLabel} · L${x.defLayer}）` +
      (x.gap > 0 ? `　落差 ${x.gap}` : ''));
  }
  if (noEdge.length > 200) L.push(`\n（只列落差最大的 200 处；完整清单见 \`gaps.json\`）`);
  L.push('', `## 二·补　白名单里的（${OKED.size} 条，已判「不是缺边」）`, '');
  L.push('每条都写了为什么。⛔ 为了让这一节变短而加条目 = 刷绿，审阅时逐条看理由。');
  L.push('');
  for (const [k, why] of OKED) {
    const [nd, df] = k.split('>');
    L.push(`- \`${nd}\` 提到 \`${df}\` —— ${why}`);
  }
  if (!OKED.size) L.push('（没有）');
  if (staleOk.length) {
    L.push('', `⚠️ **过期白名单 ${staleOk.length} 条**（对应的缺口已经不存在了：改了陈述或加了边）—— 该清：` +
      staleOk.map((k) => `\`${k}\``).join(' · '));
  }
  L.push('', `## 三、候选词表里从没被提到的（${never.length} 个）`, '', never.join(' · ') || '（没有）');

  return {
    md: L.join('\n') + '\n',
    json: {
      generated: null,
      terms: TERMS.length,
      missing: missing.map((r) => ({ term: r.term, total: r.total, nodes: r.mentions.slice(0, 12) })),
      noEdge: noEdge.map((x) => x),
      noEdgeAll: noEdgeAll.length,
      noEdgeOk: OKED.size,
      noEdgeOkStale: staleOk,
      never,
    },
  };
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

/* ============================================================ 英文文档 */
/* T2.1：read 文档的英文版。正文真源是 `src/data/i18n/docs.en.js`（内容侧），
   这里只做三件事：加**状态头**、把 `{{base}}` 换成相对路径、把现算的数字/清单排进去。
   ⛔ 别手写第二份英文 —— 要改就改那个数据文件，再 `bun tools/build.mjs`。

   ⚠️ 状态头（任务书 §0.4）必须排在 `# 标题` **之后**：md.mjs 的 renderDoc() 取
   第一个 `# ` 行当页面标题，标题上面还有东西的话 publish.mjs 会判「第一行不是 # 标题」。

   ⚠️ 路径：英文版与中文版**同目录同 URL 规则**（第 0 节：同一 URL 承载双语，
   中英并存不冲突）—— 所以 `reading.en.md` 里的相对路径和 `reading.md` 一样，
   `{{base}}` 的替换规则也照抄中文版。 */
/* ⭐⭐ 状态逐条判定（作者 2026-10-16 拍板），判定的**唯一算法**在
   `src/core/i18n.js` 的 MG.enFieldStatus —— 网页端与构建端调的是同一个函数。
   这里只负责「把记录合成到文档/摘要的形状」再渲染文案。
   ⚠️ 措辞三件必须同时出现（作者 2026-10-16 护栏）：Chinese source is authoritative ·
      machine-drafted · pending author review；页面横幅读的就是这一行的文本本身
      （publish.mjs 从 .en.md 里抠出来渲染），所以两处永远不会漂。 */
/** **一份文档**的状态：它自己的 status/basedOn/reviewed，缺省回落文件级默认（见 docs.en.js 文件头）。
    ⚠️ 文档的 stale 只看内容版本 —— 它没有「一句中文原文」可指纹（数字/清单都是现算的）。 */
function docRec(D, name) {
  const d = (D && D.docs && D.docs[name]) || {};
  return {
    status: d.status || (D && D.status) || 'draft',
    basedOn: d.basedOn || (D && D.basedOn) || null,
    reviewed: d.reviewed !== undefined ? d.reviewed : ((D && D.reviewed) || null),
  };
}
function i18nState(D, name) {
  const rec = name ? docRec(D, name) : D;
  const cv = contentVersion();
  const state = MG.enFieldStatus(rec, null) || 'draft';
  return { cv, stale: state === 'stale', state, rec };
}

function enStatus(D, name) {
  const st = i18nState(D, name);
  const r = st.rec.reviewed || {};
  const cv = st.cv;
  /* ⚠️ 这三行也是**体积预算的一部分**（单次抓取 ≤1050 转义字符）：
     `notation.en.md` 贴着上限，所以措辞能省就省 —— 加字之前先看 _tools/_docsize.mjs。 */
  const tail = 'Chinese source is authoritative · machine-drafted, pending author review.';
  if (st.stale) {
    return {
      state: 'stale',
      line: `> English version: **stale** (from ${st.rec.basedOn}; content is ${cv}). ${tail}`,
    };
  }
  if (st.state === 'reviewed') {
    return {
      state: 'reviewed',
      line: `> English version: **reviewed**${r.by ? ' · ' + r.by : ''}${r.date ? ' · ' + r.date : ''} · ` +
        'Chinese source is authoritative.',
    };
  }
  return { state: 'draft', line: `> English version: **draft** · ${tail}` };
}

/** 英文小节的标题（含**逐条**状态）—— 摘要、陈述、说明共用这一套措辞，⛔ 不许手写。
    作者 2026-10-16 拍板：同一份文件里的两条内容各自可以 draft / reviewed / stale，
    所以标题必须**按条目**算，不能整份文件算一次（那是老的「文件级一个状态」）。
    ⚠️ 三件措辞（machine-drafted · pending author review · Chinese is authoritative）是护栏，
       publish.mjs 会把这一行当状态横幅渲染，所以别在这里省字。 */
function enSectionHeading(rec, zh, title, long) {
  const state = MG.enFieldStatus(rec, zh) || 'draft';
  const r = (rec && rec.reviewed) || {};
  const base = rec && rec.basedOn ? String(rec.basedOn).split('#')[0] : null;
  /* ⚠️ long=false 用在**英文入口页**：那里页首横幅已经把「machine-drafted, pending
     author review; Chinese is authoritative」整句说过了，小节标题只报自己那一个词
     —— 标题写长了会把正文挤到第 2 页（实测 lem.zorn 的摘要就被挤下去过）。
     long=true 用在**中文节点页**：那一页只有这一行英文声明，护栏必须写在标题里。 */
  if (!long) return `## ${title} · **${state}**`;
  if (state === 'stale') {
    /* ⚠️ stale 有两个来源，说清楚是哪一个：版本变了 / 这句中文本身被改过 */
    const why = base && base !== CONTENT_VERSION
      ? `from ${base}; content is ${CONTENT_VERSION}`
      : 'the Chinese wording changed since this translation';
    return `## ${title} · **stale** (${why}) · ` +
      'machine-drafted, pending author review; Chinese is authoritative';
  }
  if (state === 'reviewed') {
    return `## ${title}${r.by ? ' · reviewed by ' + r.by : ' · reviewed'}` +
      `${r.date ? ' (' + r.date + ')' : ''} · Chinese is authoritative`;
  }
  return `## ${title} · **draft** · machine-drafted, pending author review; ` +
    'Chinese is authoritative';
}
/** 摘要小节标题（中文节点页里插的那一节）—— long=true：那一页只有这一行英文声明 */
const absHeading = (A, n) =>
  enSectionHeading((A && A.items && A.items[n.id]) || null, absZhOf(n), 'English abstract', true);
/** 陈述/说明小节标题（英文入口页里插的那两节）；field 取 'statement' | 'notes'
    —— long=false：页首横幅已说全，小节只报自己那一个词 */
const enSecHeading = (S, n, field, title) => enSectionHeading(
  (S && S.items && S.items[n.id] && S.items[n.id][field]) || null,
  field === 'notes' ? n.notes : n.statement, title, false);
/** 英文入口页顶部那行「fields: …」用的字段顺序与名字 */
const fieldsOf = (rl) => (rl && rl.fields || []);
/** 把文档体里的 `{{base}}` 展开成中文版同样的相对前缀（'' 或 'dist/'） */
const fillBase = (s, base) => String(s).replace(/\{\{base\}\}/g, base);
/** 英文名回落链：label_en → title_en → 中文 label（与 graph.js 抄下来的口径一致） */
const enNameOf = n => (n && (n.label_en || n.title_en || n.label)) || '';

/* ==================================================== 英文节点页（T3.1） */
/* 干什么：给「有英文名或英文摘要」的节点出一份 `nodes/<id>.en.md`。
   ⛔ 它不是中文页的翻译：中文的陈述 / 说明 / 证明没有英文版，这一页给的是
      英文读者 / 英文 AI 落到这里时能拿到的东西 + 指回**权威中文页**的路。
   ⚠️ 缺什么就写着缺 —— 这一页的最高优先级是「别让人以为读到了全文」。
   ⚠️ 状态同样只有一个来源：有摘要的走 i18nState(摘要)，只有名字的走「自动派生」
      （派生型内容由构建生成，本来就不需要人审 —— 见任务书 §0.4）。 */
const EN_TYPE = {
  axiom: 'axiom', definition: 'definition', theorem: 'theorem', lemma: 'lemma',
  proposition: 'proposition', corollary: 'corollary', example: 'example',
};
function enNodeText(n, MG) {
  const ABS = (MG && MG.i18nAbstracts) || null;
  const hasAbs = !!(ABS && ABS.items && ABS.items[n.id]);
  const name = n.title_en || n.label_en || '';
  const regEn = (rid) => {
    const r = ((MG && MG.regions) || []).find((x) => x.id === rid);
    return (r && r.en) || rid;
  };
  const clusterName = (cid) => {
    const c = ((MG && MG.clusters) || []).find((x) => x.id === cid);
    /* ⭐ 英文入口页用**星团的英文名**（clusters.js 的 en 字段，T2.4）；
       ⛔ 缺了就回落中文 —— 这是「没有英文就按中文读」那条规矩。 */
    return c ? `${c.en || c.name} (\`${cid}\`)` : cid;
  };
  const head = `# ${name || n.label}　\`${n.id}\`\n` +
    `English entry · root \`../\`\n` +
    `${mdLink('in graph', `../#n=${n.id}`)}　·　` +
    `${mdLink('Chinese page (authoritative)', './' + n.id + '.md')}\n\n`;
  const L = [];
  /* ⭐ 逐条状态（决策二.3）：先给一行**汇总**（最保守），再在每个小节标题上标出
     该字段自己的状态 —— 这样「摘要审过了、陈述还没」这种半成品不会被抹平成一句话。 */
  const tr = enTranslationOf(n, MG);
  const rl = (tr && tr.en) || null;
  const creative = (rl && rl.creative) || [];
  if (creative.length) {
    const st = worstStatus(creative.map((f) => rl.fieldStatus[f]));
    const why = st === 'stale'
      ? `stale fields: ${rl.staleFields.join(', ')}` +
        (rl.version && rl.version !== CONTENT_VERSION
          ? ` (from ${rl.version}; content is ${CONTENT_VERSION})`
          : ' (the Chinese wording changed since this translation)') +
        '; the Chinese page is authoritative.'
      : st === 'reviewed'
        ? 'reviewed by the author; the Chinese page is authoritative.'
        : 'machine-drafted, pending author review; the Chinese page is authoritative.';
    L.push(`> English: **${st}** · ${why}`);
    /* ⚠️ 逐字段那行**只在状态不一致时**才写（例如陈述审过了、说明还没有）——
       全部同状态时它一个字都不多给，而它占的是 AI 单次抓取的预算
       （写了会把摘要挤到第 2 页 ⇒ 白白多一页）。 */
    const sts = creative.map((f) => rl.fieldStatus[f]);
    if (sts.some((s) => s !== sts[0])) {
      L.push(`> fields: ${fieldsOf(rl).map((f) => `${f} ${rl.fieldStatus[f]}`).join(' · ')}`);
    }
  } else {
    /* ⚠️ 只有英文名（派生型）的节点**必须**说「name only」—— 那几百个节点的英文
       没有任何人审过、也没有任何一句正文，⛔ 不能让人以为读到了译文。 */
    L.push('> English: **name only** · auto-derived from the source data; ' +
      'the Chinese page is authoritative.');
  }
  L.push('');
  L.push(`layer ${n.layer} · ${EN_TYPE[n.type] || n.type}` +
    (n.cluster ? ` · cluster ${clusterName(n.cluster)}` : '') +
    ((n.regions || []).length ? ` · ${(n.regions || []).map(regEn).join(' / ')}` : ''));
  if (!hasAbs && n.label_en && n.title_en && n.label_en !== n.title_en) {
    L.push(`names: \`${n.label_en}\` (short) · \`${n.title_en}\` (full)`);
  }
  if (n.abstract_en) L.push('', enSectionHeading(ABS && ABS.items && ABS.items[n.id], absZhOf(n), 'Abstract'), n.abstract_en);
  /* 英文陈述 / 说明（T3.2）：有就直接给 —— 这可是英文页上最要紧的东西。
     ⚠️ 没有的时候必须**明说没有**，不能让人以为中文页只是多余的。 */
  const STM = (MG && MG.i18nStatements) || null;
  const hasStm = !!(STM && STM.items && (STM.items[n.id] || {}).statement && (STM.items[n.id].statement || {}).en);
  if (n.statement_en) L.push('', enSecHeading(STM, n, 'statement', 'Statement'), n.statement_en);
  if (n.notes_en) L.push('', enSecHeading(STM, n, 'notes', 'Notes'), n.notes_en);
  if (!hasStm) {
    L.push('', '## Statement and proof');
    L.push('Chinese only — see the Chinese page ' + `\`nodes/${n.id}.md\` and \`proofs/\`.`);
  } else {
    L.push('', `> Proofs of the edges are still Chinese only: \`proofs/\`; ` +
      'the Chinese page remains authoritative.');
  }
  const xr = ((MG && MG.xref) || {})[n.id];
  const XR_NAME = { wikipedia: 'Wikipedia', nlab: 'nLab', stacks: 'Stacks Project', mathlib: 'Mathlib' };
  if (xr) {
    L.push('', '## Elsewhere');
    L.push(Object.keys(XR_NAME).filter((k) => xr[k]).map((k) => `${XR_NAME[k]}: ${xr[k]}`).join(' · '));
  }
  /* T1.4：内容以 CC BY 4.0 授权，「标 id + 版本」是请求 ⇒ 英文尾巴同步改措辞。
     ⚠️ 英文入口页的余量比中文页宽（目前最大 890 B），但长度仍然只增不减地写清楚。 */
  const tail = `\nCite: \`${n.id}\` (content ${CONTENT_VERSION || 'dev'}) · CC BY 4.0: ` +
    mdLink('LICENSE.txt', '../LICENSE.txt') + '\n';
  /* ⚠️ 预留要给**真实尾巴**的大小：传大了 page 1 会把正文挤到续页
     （踩过：lem.zorn.en.md 只剩 464 B，摘要整段跑到第 2 页）。 */
  const tailRes = Math.max(aiBytes(tail), aiCost(tail)) + 24;
  return { head, body: L.join('\n') + '\n', tail, tailRes };
}

/** 枢纽榜英文版的「块」：页首说明 + 每 15 条一组 + 结尾那行。
    ⛔ 入边口径必须与 exportHubs() 完全一致（改一处必须改两处）。
    ⭐ 为什么这里自己切块而不是交给正文解析：行是列表，正文切块会把列表从中间切开
       （aiChunk 对「一整段没空行」的东西只能逐字切）。切在**行与行之间**才诚实。 */
function hubBlocksEn(MG, graph) {
  const D = MG.i18nDocs, d = D.docs.hubs;
  const blocks = [d.head];
  let rows = [], shown = 0;
  /* ⚠️ 三榜的算法**只有一处实现**（hubBoards）—— 英文版只是换标题与说明文字，
     绝不能再抄一遍口径（旧代码抄了一遍，方向错误也就跟着抄了一遍）。 */
  for (const b of hubBoards(graph)) {
    rows = [];
    blocks.push(`## ${b.en}`);
    for (const { n, nodes, edges, more } of b.rows) {
      if (shown >= 15) break;
      const deg = b.key === 'cross' ? `**${more} clusters / ${nodes} nodes**` : `**${nodes} / ${edges}**`;
      rows.push(`- ${deg} \`${n.id}\` ${enNameOf(n)} · ${clNameOf(graph, n)}`);
      shown++;
      /* ⚠️ 每块别贪多：块是**不可再切**的单位，给大了会整块挤到下一页（页数翻倍）。
         4 行一块，让打包器自己把页填满。 */
      if (rows.length === 4) { blocks.push(rows.join('\n')); rows = []; }
    }
    if (rows.length) blocks.push(rows.join('\n'));
    rows = [];
  }
  blocks.push(d.tail(shown, graph.nodes.length));
  return blocks;
}

/** 记号表索引英文版。条目名（notation/*.md 里的）仍是中文 —— 见正文说明。 */
function exportNotationEn(MG, base = '') {
  const D = MG.i18nDocs, d = D.docs.notation;
  const N = MG.notation || { groups: [], entries: [] };
  const nb = g => (N.entries || []).filter(e => e.g === g.id).length;
  const L = [`# ${d.title}`, '', enStatus(D, 'notation').line, '', fillBase(d.body, base), ''];
  for (const g of (N.groups || [])) {
    L.push(`- \`${base}notation/${g.id}.md\` ${d.groups[g.id] || g.name} ${nb(g)}`);
  }
  L.push('');
  return L.join('\n') + '\n';
}

/* ------------------------------------------------------ 英文文档分页 */
/* ⚠️⚠️ 为什么英文必须切页、中文不用：
     AI_ESC = 1050 是**转义后字符数**，AI_MAXB = 1300 是**字节数**。
     中文一个字 ≈ 3 B / 1 字符 ⇒ 卡在字节那条（reading.md 1269 B 才 722 字符）；
     英文一个字符 ≈ 1 B     ⇒ 卡在字符那条（同样的内容 1623 B / 1685 字符）。
     ⇒ 同一份文档的英文版天生比中文版「长」两倍多，**装不进一次抓取**。
     所以英文文档照中文节点页的老办法切页：正文照写，一次抓不完就 `X.en.2.md`。
     ⛔ 不许为了塞进一页把英文砍短 —— 那是静默降质（§5）。

   切页点**只切在小节边界**（`## ` 行）：英文段落切一半比多一页更糟。
   每页都带标题 + 状态头，续页第一行给回第 1 页的路径。 */
function paginateEnDoc(name, doc, statusLine, body, blocks) {
  /* 按 `## ` 切成块：块 0 = 第一个 `## ` 之前的引子（可能没有）
     ⭐ 也可以由调用方直接给块（列表型文档：只在行与行之间切，见 hubBlocksEn）。 */
  blocks = blocks || [];
  if (!blocks.length) {
    for (const line of String(body).trim().split('\n')) {
      if (!blocks.length || /^##\s/.test(line)) blocks.push([]);
      blocks[blocks.length - 1].push(line);
    }
    blocks = blocks.map(b => b.join('\n').trim()).filter(Boolean);
  }
  const head1 = `# ${doc.title}\n\n${statusLine}\n\n`;
  const headK = k => `# ${doc.title} · continuation (page ${k})\n\n` +
    `> page 1 \`${name}.en.md\`\n\n`;
    /* ⚠️ head1/headK 两处生成必须和下面写出时同一份 —— 估算与实际不一致就会顶破上限。 */
  const jumpRes = `\n> continued in \`${name}.en.99.md\`\n`;   // 最坏情况预留
  const fits = (k, txt) =>
    aiBytes((k === 1 ? head1 : headK(k)) + txt + jumpRes) <= AI_MAXB &&
    aiCost((k === 1 ? head1 : headK(k)) + txt + jumpRes) <= AI_ESC;

  const pages = [];
  let cur = null;
  for (const b of blocks) {
    /* 两种来源：正文解析出来的是**行数组**，调用方直接给的是**字符串** */
    const txt = (Array.isArray(b) ? b.join('\n') : String(b)).trim();
    if (!txt) continue;
    const k = pages.length + 1;
    if (cur && !fits(k, cur + '\n\n' + txt)) { pages.push(cur); cur = null; }
    const k2 = pages.length + 1;
    if (!fits(k2, txt)) {                    // 单块自己就顶破一页 ⇒ 交给 aiChunk 硬切
      for (const p of aiChunk(txt, headK(k2), jumpRes, 0, 0)) pages.push(p);
      continue;
    }
    cur = cur ? cur + '\n\n' + txt : txt;
  }
  if (cur) pages.push(cur);

  return pages.map((txt, i) => {
    const k = i + 1;
    let t = (k === 1 ? head1 : headK(k)) + txt + '\n';
    if (k < pages.length) t += `\n> continued in \`${name}.en.${k + 1}.md\`\n`;
    return { suffix: k === 1 ? '' : '.' + k, text: t };
  });
}

/* ------------------------------------------------------------ 术语表 */
/* T2.1 的副产品：中英对照。⭐ 规则是**复用已有英文键，不新造词**：
   节点类型（config.js 的键就是英文）、边的四种 kind（键即英文）、记号表分组名
   （docs.en.js 的 groups 就是那些键的译文）、九个星系（regions.js 的 `en` 字段）
   全部现算；只有代码里根本没有英文键的词才由 docs.en.js 的 glossaryExtra 补，
   并在表里标 `+`，让作者一眼看得出哪些是新造的。 */
function exportGlossary(MG) {
  const D = MG.i18nDocs;
  const T = MG.theme || {};
  const N = MG.notation || { groups: [], entries: [] };
  const L = [];
  L.push('# 数学星图 · 术语表（中 → 英）');
  L.push('');
  L.push(enStatus(D).line);
  L.push('');
  L.push('给译者 / 英文页用的对照表。**有英文键的一律从代码里的键现算**（改键即改表）；');
  L.push('带 `+` 的行是代码里没有对应英文键、由 `docs.en.js` 补的。');
  L.push('');

  L.push('## 节点类型（`src/core/config.js` 的 `nodeTypes` 键）');
  L.push('');
  for (const k of (T.typeOrder || Object.keys(T.nodeTypes || {}))) {
    const t = (T.nodeTypes || {})[k];
    if (t) L.push(`- \`${k}\`　${t.name}`);
  }
  L.push('');

  L.push('## 边：四种 kind ＋ 一种推论标记（`edgeNames` / `edgeStyles` 键）');
  L.push('');
  for (const k of Object.keys(T.edgeNames || {})) {
    const w = (k === 'analogy') ? 'weak' : 'strong';
    L.push(`- \`${k}\`　${T.edgeNames[k]}　（${w} edge）`);
  }
  L.push('');
  L.push('⚠️ `implication` 里另有一类 **`layer:false` 的「推论」**：真推出，但不是前提' +
    '（用高级工具回头证低级定理），**不参与分层**、不抬高目标层号。');
  L.push('它不是第五种 kind —— 数据里只多一个 `layer:false`；画成**粉红实线带箭头**' +
    '（⛔ 不是虚线，虚线是「类比」的语义），不与 `edgeNames` / `edgeStyles` 的键并列。');
  L.push('');

  L.push('## 记号表分组（`notation.js` 的 `groups`）');
  L.push('');
  for (const g of (N.groups || [])) {
    const n = (N.entries || []).filter(e => e.g === g.id).length;
    L.push(`- \`${g.id}\`　${g.name}　→　${D.docs.notation.groups[g.id] || '（缺）'}　${n} 条`);
  }
  L.push('');

  L.push('## 星系（`regions.js` 的 `en` 字段）');
  L.push('');
  for (const r of (MG.regions || [])) L.push(`- \`${r.id}\`　${r.name}　→　${r.en || '（缺）'}`);
  L.push('');

  L.push('## 其它（`+` = 手工新造）');
  L.push('');
  for (const g of (D.glossaryExtra || [])) {
    L.push(`- ${g.zh}　→　${g.en}　\`+\`${g.note ? '　— ' + g.note : ''}`);
  }
  L.push('');
  return L.join('\n');
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
  L.push('`alias/<星系>.md` 问法 · `alias/aka/<星系>.md` 别名；行尾 `a+b` 是条数。');
  L.push('');
  for (const r of graph.regions) {
    const f = aliasFilter(A, graph, r.id);
    if (!f.nodes.length && !f.hooks.length) continue;
    /* ⚠️ 只链**真会生成**的那份：某一类 0 条时 exportAliasProducts 不写这个文件。
       踩过：复变函数 / 解析空间 / 数理逻辑 只有别名没有问法，索引却照链
       `alias/<id>.md` ⇒ 26 条复变别名（含「Riemann映照定理」）在已发布文档里无人可达。 */
    const links = [];
    if (f.hooks.length) links.push(`\`${base}alias/${r.id}.md\``);
    if (f.nodes.length) links.push(`\`${base}alias/aka/${r.id}.md\``);
    L.push(`- ${r.name}　${links.join(' / ')} ${f.hooks.length}+${f.nodes.length}`);
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
    /* 姐妹页的指路也要看它**存不存在**（只有别名没有问法的星系很常见）。 */
    const akaRef = f.nodes.length ? `　·　别名在 \`aka/${r.id}.md\`` : '';
    const hookRef = f.hooks.length ? `　·　问法在 \`../${r.id}.md\`` : '';
    if (f.hooks.length) {
      const head = `# 问法 → 节点 · ${r.name}\n` +
        `根 \`../\`　·　索引 \`../alias.md\`${akaRef}\n\n`;
      emitChunks(files, 'alias', r.id, head, aliasHookBody(A, graph, r.id), '见 `../alias.md`。');
    }
    if (f.nodes.length) {
      const head = `# 别名 → 节点 · ${r.name}\n` +
        `根 \`../../\`　·　索引 \`../../alias.md\`${hookRef}\n\n`;
      emitChunks(files, 'alias/aka', r.id, head, aliasAkaBody(A, graph, r.id), '见 `../../alias.md`。');
    }
  }
  return files;
}

/* ⚠️ 硬门：`alias.md` 索引里链到的页必须真被产出。
   这一族产物「不生成的页」不会报错 —— 只是少一个文件、索引照链，读者/AI 走到 404。
   踩过：复变 26 条别名只能进 `alias/aka/complex.md`，索引链的却是 `alias/complex.md`。 */
/* ------------------------------------------------- 类型色 vs 白字对比度 */
/* 节点类型色同时充当 `.pn-kind` 徽章的底色（白字 11.5px），要 ≥ 4.5:1（WCAG AA 小字）。
   2026-11-03 之前有 6/7 不达标（2.58–4.22），是**没人量**而不是没人知道该量 ——
   所以把它做成硬门：改色值前先保证自己算过。 */
function assertContrast(MG) {
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const lum = (hex) => {
    const n = parseInt(String(hex).slice(1), 16);
    return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  };
  const errs = [];
  const types = (MG.theme && MG.theme.nodeTypes) || {};
  for (const [k, t] of Object.entries(types)) {
    if (!t || !/^#[0-9a-f]{6}$/i.test(String(t.color))) { errs.push(`类型色：nodeTypes.${k} 不是 #rrggbb（白字对比度算不出来）`); continue; }
    const cr = 1.05 / (lum(t.color) + 0.05);
    if (cr < 4.5) errs.push(`类型色：nodeTypes.${k} = ${t.color} 上白字只有 ${cr.toFixed(2)}:1（小字要 ≥ 4.5:1）`);
  }
  return errs;
}

function assertAliasLinks(indexText, aliasFiles) {
  const made = new Set(aliasFiles.map(f => f.path.replace(/\\/g, '/')));
  const errs = [];
  const re = /`((?:alias|alias\/aka)\/[\w.\-]+\.md)`/g;
  let m;
  while ((m = re.exec(indexText))) {
    if (!made.has(m[1])) errs.push(`别名索引链接到不存在的页：\`${m[1]}\`（该星系这一类是 0 条？）`);
  }
  return errs;
}

/* -------------------------------------------------------- 别名表断言 */
/* 外部锚点（xref）。真源在 `src/data/xref.js`。硬断言：键要在白名单里、
   值必须是完整 http(s) URL、id 必须真实存在 —— 对外锚点错了比没有更糟。 */
function assertXref(MG, graph) {
  const X = MG.xref;
  if (!X) return ['外部锚点：`src/data/xref.js` 没有挂上（index.html / loadMG 少了 script？）'];
  const KEYS = ['wikipedia', 'nlab', 'stacks', 'mathlib'];
  const errs = [];
  for (const id of Object.keys(X)) {
    if (id.startsWith('_')) continue;                 // 注释键（_说明 之类）
    const rec = X[id];
    if (!graph.byId[id]) { errs.push(`xref 指向不存在的节点：${id}`); continue; }
    if (!rec || typeof rec !== 'object') { errs.push(`xref[${id}] 不是对象`); continue; }
    const ks = Object.keys(rec);
    if (!ks.length) errs.push(`xref[${id}] 是空的（要么填，要么删掉这条）`);
    for (const k of ks) {
      if (KEYS.indexOf(k) < 0) errs.push(`xref[${id}].${k} 不在白名单（${KEYS.join(' / ')}）里`);
      if (!/^https?:\/\/\S+$/.test(String(rec[k]))) {
        errs.push(`xref[${id}].${k} 必须是完整 http(s) URL：${rec[k]}`);
      }
    }
  }
  return errs;
}

/* ------------------------------------------------------ 英文名字段断言 */
/* 真源 = `src/data/i18n.js`（由 tools/i18n-backfill.mjs 从 aka / title 现算）。
   硬断言三件：① 每条 id 真实存在；② title_en 非空且不含汉字；
   ③ **没漂**：凡是「按口径该填」的节点（一级 + 二级），旁挂表里必须都有 ——
      否则说明 aliases.js / title 改了但忘了重跑回填脚本。
   ⚠️ 口径（bucketRows / decide）是 import 进来的，不在这里另抄一份。 */
function assertI18n(MG, graph) {
  const I = MG.i18n;
  if (!I || !I.nodes) return ['英文名字段：`src/data/i18n.js` 没有挂上（index.html / loadMG 少了 script？跑 bun tools/i18n-backfill.mjs 生成）'];
  const errs = [];
  const keys = Object.keys(I.nodes);
  const rows = bucketRows(MG, graph);
  const dec = decide(rows, splitBuckets(rows));
  dec.t0.concat(dec.t1, dec.t2).forEach(({ r, e }) => {
    if (!I.nodes[r.id]) {
      errs.push(`英文名漂移：\`${r.id}\` 按口径该填（${e.from}），但 i18n.js 里没有（跑 bun tools/i18n-backfill.mjs）`);
    }
  });
  for (const id of keys) {
    if (!graph.byId[id]) { errs.push(`英文名字段：i18n.js 里的节点不存在 \`${id}\``); continue; }
    const e = I.nodes[id] || {};
    if (!e.title_en) errs.push(`英文名字段：\`${id}\` 缺 title_en`);
    /* ⭐ 例外：**人名用本人语言的写法**（用户 2026-11-03 拍板，见 CONTRIBUTING.md）。
       俄罗斯人写西里尔（`Чебышёв 估计`）、中国人写汉字（`陈类`）—— 中英两种语言都这么写，
       罗马化只放进节点正文。这样的条目在 i18n 表里标 `native: true`，本门放行汉字。
       ⛔ 不标 native 的条目仍然不许含汉字（防止英文名退化成中文）。 */
    const isNative = e.native === true;
    if (!isNative && /[\u4e00-\u9fff]/.test(String(e.title_en || ''))) errs.push(`英文名字段：\`${id}\` 的 title_en 含汉字 —— 那不是英文名`);
    if (!isNative && e.label_en && /[\u4e00-\u9fff]/.test(e.label_en)) errs.push(`英文名字段：\`${id}\` 的 label_en 含汉字`);
  }
  const on = graph.nodes.filter((n) => n.title_en).length;
  if (on !== keys.length) errs.push(`英文名字段：挂上 title_en 的节点 ${on} 个 ≠ 旁挂表 ${keys.length} 条`);
  console.log(`  i18n：title_en 覆盖 ${on} / ${graph.nodes.length} 个节点（${(100 * on / graph.nodes.length).toFixed(1)}%）`);
  return errs;
}

/* ------------------------------------------------- 英文摘要的硬断言（T2.2） */
/* 真源 = `src/data/i18n/abstracts.en.js`（创译型内容，agent 起草、作者审校）。
   断言：① id 真实存在；② 有 status / basedOn（状态与 stale 全靠这两个字段）；
        ③ 正文非空、不含汉字、不含禁用 LaTeX 命令（摘要走 md 渲染，同一条纪律）。
   ⚠️ 「前 30 名有没有都覆盖」只报告、不当硬断言 —— 榜会随内容变，不该卡构建。 */
function assertAbstracts(MG, graph) {
  const A = MG.i18nAbstracts;
  if (!A) return ['英文摘要：`src/data/i18n/abstracts.en.js` 没有挂上（loadMG 少了它？）'];
  const errs = [];
  const items = A.items || {};
  /* ⭐ 状态**逐条**（作者 2026-10-16 拍板）：文件级不再有 status/basedOn，
     每条自带 { en, status, basedOn, reviewed }。缺一个字段就是漏写状态。 */
  const BAN = ['\\dots', '\\Rightarrow', '\\leq', '\\geq', '\\neq', '\\impliedby'];
  for (const [id, rec] of Object.entries(items)) {
    if (!graph.byId[id]) { errs.push(`英文摘要：节点不存在 \`${id}\``); continue; }
    if (!rec || typeof rec !== 'object') { errs.push(`英文摘要：\`${id}\` 不是逐条记录（要 { en, status, basedOn }）`); continue; }
    if (typeof rec.en !== 'string' || !rec.en.trim()) { errs.push(`英文摘要：\`${id}\` 的 en 是空的`); continue; }
    if (!rec.status) errs.push(`英文摘要：\`${id}\` 缺 status（逐条状态的唯一来源）`);
    if (!rec.basedOn) errs.push(`英文摘要：\`${id}\` 缺 basedOn（译自哪个内容版本 + 中文底稿指纹）`);
    if (/[\u4e00-\u9fff]/.test(rec.en)) errs.push(`英文摘要：\`${id}\` 含汉字 —— 摘要必须是英文`);
    for (const b of BAN) {
      if (rec.en.includes(b)) errs.push(`英文摘要：\`${id}\` 用了禁用命令 ${b}`);
    }
  }
  /* 报告：当前枢纽榜前 30 里覆盖了几个（只报告） */
  const indeg = new Map();
  const bump = k => indeg.set(k, (indeg.get(k) || 0) + 1);
  for (const e of graph.edges) {
    if (e.kind === 'implication') bump(e.target);
    else if (e.kind === 'definition') bump(e.usedBy);
    else if (e.kind === 'equivalence') { bump(e.a); bump(e.b); }
  }
  const top = graph.nodes.map(n => ({ id: n.id, d: indeg.get(n.id) || 0 }))
    .filter(x => x.d > 0)
    .sort((a, b) => b.d - a.d || (graph.byId[a.id].layer - graph.byId[b.id].layer))
    .slice(0, 30).map(x => x.id);
  const have = top.filter(id => items[id]).length;
  /* ⭐ 逐条状态报告（决策二.3）：条数 + 三种状态各多少 —— 只报告，不拦构建。 */
  const tally = { draft: 0, reviewed: 0, stale: 0 };
  for (const [id, rec] of Object.entries(items)) {
    const n = graph.byId[id];
    if (!n || !rec) continue;
    tally[MG.enFieldStatus(rec, absZhOf(n))]++;
  }
  console.log(`  i18n：abstract_en ${Object.keys(items).length} 条（枢纽榜前 30 覆盖 ${have}/30）—— ` +
    `draft ${tally.draft} · reviewed ${tally.reviewed} · stale ${tally.stale}`);
  if (have < top.length) {
    const miss = top.filter(id => !items[id]);
    console.log(`        ⚠️ 前 30 里还没有摘要的：${miss.join(' ')}`);
  }
  return errs;
}

/* ------------------------------------------- 英文陈述/说明的硬断言（T3.2） */
/* 真源 = `src/data/i18n/statements.en.js`（创译型，agent 起草、作者审校）。
   断言：① id 真实存在；② **每个字段**（statement / notes）自带 status + basedOn；
        ③ 字段非空、不含汉字、不含禁用命令；④ 每条至少有一个字段（空条目等于没写）。 */
/* ---------------------------------------------- 公式抽取（公式不变量用） */
/** 把一段正文里的公式抠出来（块级优先，避免 `$$` 被当成两个 `$`） */
function formulasOf(s) {
  const out = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m;
  while ((m = re.exec(String(s || '')))) out.push({ block: m[1] != null, tex: m[1] != null ? m[1] : m[2] });
  return out;
}
/** a 里有、b 里没有的元素（多重集差，⛔ 不折叠空白 —— 要的就是逐字） */
function multisetDiff(a, b) {
  const rest = b.slice();
  const only = [];
  for (const x of a) {
    const i = rest.indexOf(x);
    if (i >= 0) rest.splice(i, 1); else only.push(x);
  }
  return only;
}

function assertStatements(MG, graph) {
  const S = MG.i18nStatements;
  if (!S) return ['英文陈述：`src/data/i18n/statements.en.js` 没有挂上（loadMG 少了它？）'];
  const errs = [];
  const items = S.items || {};
  const BAN = ['\\dots', '\\Rightarrow', '\\leq', '\\geq', '\\neq', '\\impliedby'];
  for (const [id, rec] of Object.entries(items)) {
    const n = graph.byId[id];
    if (!n) { errs.push(`英文陈述：节点不存在 \`${id}\``); continue; }
    const fields = ['statement', 'notes'].filter((f) => rec && rec[f]);
    if (!fields.length) { errs.push(`英文陈述：\`${id}\` 是空条目（要么写，要么删）`); continue; }
    for (const f of fields) {
      const r = rec[f];
      if (typeof r !== 'object' || typeof r.en !== 'string' || !r.en.trim()) {
        errs.push(`英文陈述：\`${id}.${f}\` 要写成 { en, status, basedOn, reviewed }`);
        continue;
      }
      if (!r.status) errs.push(`英文陈述：\`${id}.${f}\` 缺 status（逐条状态的唯一来源）`);
      if (!r.basedOn) errs.push(`英文陈述：\`${id}.${f}\` 缺 basedOn（译自哪个内容版本 + 中文底稿指纹）`);
      if (/[\u4e00-\u9fff]/.test(r.en)) errs.push(`英文陈述：\`${id}.${f}\` 含汉字`);
      for (const b of BAN) if (r.en.includes(b)) errs.push(`英文陈述：\`${id}.${f}\` 用了禁用命令 ${b}`);
    }
    /* ⭐⭐ 公式不变量（作者 2026-10-16 拍板：两语言公式**逐字一致**）
       ① 公式里不得出现汉字（中文页也不行 —— 汉字要移进散文或换成中英皆可的记号）；
       ② 行内 / 块级公式**条数相等**；
       ③ 公式的**多重集**完全相同（顺序可以随译文语序变，内容不许变）。
       ⛔ 只查 statement（散文里英文把词粘在一起的方式跟中文不同，
          notes 的公式条数天然可以对不上 —— 那部分只查「公式无汉字」）。 */
    for (const zf of ['statement', 'notes']) {
      const sec = rec[zf];
      if (!sec || !sec.en) continue;
      const z = formulasOf(n[zf]), e = formulasOf(sec.en);
      const zc = [z.filter((x) => !x.block).length, z.filter((x) => x.block).length];
      const ec = [e.filter((x) => !x.block).length, e.filter((x) => x.block).length];
      const han2 = z.concat(e).filter((x) => /[\u4e00-\u9fff]/.test(x.tex));
      if (han2.length) {
        errs.push(`公式不变量：\`${id}.${zf}\` 的公式里有汉字 ` +
          `（要移进散文，或换成中英皆可的记号）：${han2[0].tex.slice(0, 50)}`);
      }
      if (zf === 'statement' && (zc[0] !== ec[0] || zc[1] !== ec[1])) {
        errs.push(`公式不变量：\`${id}\` 中英公式条数不等 —— 中（行内 ${zc[0]} / 块级 ${zc[1]}）` +
          ` vs 英（行内 ${ec[0]} / 块级 ${ec[1]}）`);
      }
      if (zf === 'statement') {
        const key = (x) => (x.block ? 'B:' : 'I:') + x.tex;
        const diffZ = multisetDiff(z.map(key), e.map(key));
        if (diffZ.length) {
          errs.push(`公式不变量：\`${id}\` 中英公式多重集不同 —— ` +
            `只在中文里 ${JSON.stringify(diffZ[0])}${diffZ.length > 1 ? ` 等 ${diffZ.length} 条` : ''}`);
        }
      }
    }
  }
  /* ⭐ 顺带报一次「公式含汉字」的待办账（不失败：那些节点还没翻译，见 i18n/formula-han.md） */
  if (MG.i18nStatements) {
    let debt = 0;
    for (const n of graph.nodes) {
      if (Object.prototype.hasOwnProperty.call(items, n.id)) continue;   // 已翻译的上面已经逐个查过
      if (formulasOf(n.statement).some((x) => /[\u4e00-\u9fff]/.test(x.tex))) debt++;
    }
    if (debt) {
      console.log(`  i18n：另有 ${debt} 个未翻译节点的陈述里公式含汉字（翻译它们前要先改公式，账本 i18n/formula-han.md）`);
    }
  }
  /* ⭐ 逐字段状态的体检报告（决策二.3）：多少字段 draft / reviewed / stale —— 只报告不拦。 */
  const tally = { draft: 0, reviewed: 0, stale: 0 };
  let nFields = 0;
  for (const [id, rec] of Object.entries(items)) {
    const n = graph.byId[id];
    if (!n) continue;
    for (const f of ['statement', 'notes']) {
      if (!rec || !rec[f] || !rec[f].en) continue;
      nFields++;
      tally[MG.enFieldStatus(rec[f], f === 'notes' ? n.notes : n.statement)]++;
    }
  }
  console.log(`  i18n：英文陈述/说明 ${Object.keys(items).length} 个节点 · ${nFields} 个字段 —— ` +
    `draft ${tally.draft} · reviewed ${tally.reviewed} · stale ${tally.stale}`);
  return errs;
}

/* ------------------------------------------- 英文文档的逐份状态（决策二.3） */
/* 真源 = `src/data/i18n/docs.en.js`。断言：四份文档每份都能算出一个状态，
   且「文件级默认值」没被某一份的字段漏掉（缺 basedOn 就没法判 stale）。
   ⭐ 这是**逐份**判定：一份审过了不必等其余的（改那一份的 status/basedOn 即可）。 */
function assertDocsEn(MG) {
  const D = MG.i18nDocs;
  if (!D) return ['英文文档：`src/data/i18n/docs.en.js` 没有挂上（loadMG 少了它？）'];
  const errs = [];
  const names = Object.keys(D.docs || {});
  if (!names.length) errs.push('英文文档：`docs` 是空的');
  if (!D.status) errs.push('英文文档：文件级缺 status（逐份都没写时要用它兜底）');
  if (!D.basedOn) errs.push('英文文档：文件级缺 basedOn');
  const tally = { draft: 0, reviewed: 0, stale: 0 };
  for (const name of names) {
    const r = docRec(D, name);
    if (!r.basedOn) { errs.push(`英文文档：\`${name}\` 既没写 basedOn，文件级也没有 —— 判不了 stale`); continue; }
    if (!/^v\d+\.\d+\.\d+$/.test(String(r.basedOn))) {
      errs.push(`英文文档：\`${name}\` 的 basedOn 应当是 vX.Y.Z（文档没有中文底稿指纹）：${r.basedOn}`);
    }
    tally[i18nState(D, name).state]++;
  }
  console.log(`  i18n：英文文档 ${names.length} 份（${names.join(' / ')}）—— ` +
    `draft ${tally.draft} · reviewed ${tally.reviewed} · stale ${tally.stale}`);
  return errs;
}

function assertAliases(MG, graph) {  const A = MG.aliases;
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
    /* ⭐ 显式英文名（零级规则，见 tools/i18n-backfill.mjs）：它是**纯文本英文字段**，
       和 label/tags 一样不能含 $ ；也不许含汉字 —— 那就不叫英文名了。 */
    if (r.en !== undefined) {
      const BT = String.fromCharCode(96);
      const say = (msg) => errs.push('别名表：' + BT + r.id + BT + ' ' + msg);
      const en = String(r.en).trim();
      if (!en) say('的 en 是空的');
      else {
        if (en.indexOf(String.fromCharCode(36)) >= 0) say('的 en 含 $ ：' + en);
        if (/[\u4e00-\u9fff\u3400-\u4dbf]/.test(en)) say('的 en 含汉字：' + en);
        if (en.length > 80) say('的 en 太长（' + en.length + ' > 80）：' + en);
      }
    }
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

/* ---------------------------------------------- 边的端点必须真实存在（硬门） */
/* ⚠️ 2026-10-22 加：`graph.js` 遇到不存在的端点只 push 一条 **warning**，
   于是写错 id（例如把 `def.mobius` 写成 `prop.mobius`）时那条边会**静默消失**：
   构建照样通过，画布上却少了东西。这正是最难查的一类事故，所以在这里升成硬失败。 */
function assertEdgeEndpoints(MG, graph) {
  const errs = [];
  const ids = new Set((graph.nodes || []).map((n) => n.id));
  /* ⚠️ 必须连**原始 packs** 一起扫：端点写错的边会被 graph.js 直接过滤掉，
     根本不会出现在 graph.edges 里 —— 只扫后者等于什么都没查（踩过）。 */
  for (const p of (MG.packs || [])) for (const n of (p.nodes || [])) ids.add(n.id);
  const check = (where, eid, id, role) => {
    if (id == null) return;
    if (!ids.has(id)) errs.push(`边端点：${where} 的 \`${eid}\` 里 ${role} 指向不存在的节点 \`${id}\``);
  };
  const scan = (edges, where) => {
    for (const e of (edges || [])) {
      const eid = e.id || `${(e.sources || [e.a || e.definition || '?']).join('+')} -> ${e.target || e.b || e.usedBy || '?'}`;
      for (const s of (e.sources || [])) check(where, eid, s, 'sources');
      check(where, eid, e.target, 'target');
      check(where, eid, e.a, 'a');
      check(where, eid, e.b, 'b');
      check(where, eid, e.definition, 'definition');
      check(where, eid, e.usedBy, 'usedBy');
    }
  };
  scan(graph.edges, '构建后的图');
  for (const p of (MG.packs || [])) scan(p.edges, `pack「${p.name || '未命名'}」`);
  return errs;
}

/* A8：骨架边状态的最小校验 —— 只允许 'skeleton'，并统计条数。分层与渲染都不看它。 */
function assertEdgeStatus(MG, graph) {
  const errs = [];
  const scan = (edges, where) => {
    let n = 0;
    for (const e of (edges || [])) {
      if (e.status == null) continue;
      if (e.status !== 'skeleton') {
        errs.push('边状态：' + where + ' 的边 `' + (e.id || '?') + '` 的 status 只能是 skeleton，实际是 `' + e.status + '`');
      } else n++;
    }
    return n;
  };
  const nGraph = scan(graph.edges, '构建后的图');
  let nRaw = 0;
  for (const p of (MG.packs || [])) nRaw += scan(p.edges, `pack「${p.name || '未命名'}」`);
  console.log(`  → 骨架边：图中 ${nGraph} 条带 status:'skeleton'（原始 packs ${nRaw} 条）`);
  return errs;
}

function assertNotation(MG, graph) {
  const N = (MG.notation && MG.notation.checks) || {};
  const errs = [];

  /* ⓪ `label` / `tags` / `refs` 是**纯文本**字段：⛔ 不许出现 `$`。
     它们不过 markdown/KaTeX，写了 `$…$` 只会把美元符号原样画出来。
     ⚠️ 2026-10-22 加这一条：两个节点的 refs 里漏进了 `$\\pi_1(S^1)$` 之类的公式，
     构建当时没拦，靠人肉才发现。 */
  for (const n of (graph.nodes || [])) {
    if (String(n.label || '').includes('$')) errs.push(`纯文本字段：\`${n.id}\` 的 label 含 $`);
    for (const t of (n.tags || [])) if (String(t).includes('$')) errs.push(`纯文本字段：\`${n.id}\` 的 tag「${t}」含 $`);
    for (const r of (n.refs || [])) if (String(r).includes('$')) errs.push(`纯文本字段：\`${n.id}\` 的 refs 含 $ —— ${String(r).slice(0, 60)}`);
  }

  /* ⭐ 2026-11-05：星团 / 领域 / 板块的 name / en 也是纯文本字段。
     fa.ck 的 name 曾写成 $C(K)$ 与 Stone–Weierstrass，渲染层只能原样画 $ —— 构建必须拦。
     渲染层另有 i18n.plainName() 的剥除 + warn 防御，这里是硬门。 */
  for (const [kind, arr] of [['星团', MG.clusters], ['领域', MG.regions], ['板块', MG.sectors]]) {
    for (const x of (arr || [])) {
      for (const f of ['name', 'en']) {
        if (x[f] != null && String(x[f]).includes('$'))
          errs.push(`纯文本字段：${kind}「${x.id}」的 ${f} 含 $ —— ${String(x[f]).slice(0, 60)}`);
      }
    }
  }

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

  /* ①bis **裸 LaTeX 命令**（在 $…$ 外面）—— 2026-11-03 踩到的：一个批量替换脚本把
     `$$…$$` 的定界符删掉了，公式于是变成裸文本 ``\mu_{n} := …``；
     KaTeX 一道错都不报（因为它根本没拿到公式），`_katexcheck` 也看不见（没有块）。
     ⇒ 这里直接查「正文里出现 \\命令 但不在 $…$ 里」。
     ⚠️ 只认**明确的数学命令**白名单 —— Windows 路径（`C:\Users`）不能误伤。 */
  /* 白名单：只用**明确的数学命令**，避免把 Windows 路径（`C:\Users`）误伤。 */
  const BARE_CMDS = ['frac', 'dfrac', 'tfrac', 'sqrt', 'sum', 'prod', 'int', 'oint', 'partial', 'nabla', 'infty', 'emptyset', 'mathbb', 'mathcal', 'mathfrak', 'operatorname', 'mathrm', 'text', 'quad', 'qquad', 'left', 'right', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon', 'zeta', 'eta', 'theta', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'phi', 'varphi', 'chi', 'psi', 'omega', 'Gamma', 'Delta', 'Theta', 'Lambda', 'Sigma', 'Phi', 'Psi', 'Omega', 'le', 'ge', 'ne', 'approx', 'cong', 'simeq', 'equiv', 'subset', 'subseteq', 'supset', 'supseteq', 'in', 'notin', 'to', 'mapsto', 'implies', 'iff', 'Leftarrow', 'Rightarrow', 'leftrightarrow', 'cdots', 'ldots', 'dots', 'times', 'otimes', 'oplus', 'circ', 'pm', 'mid', 'ker', 'dim', 'det', 'lim', 'sup', 'inf', 'max', 'min', 'sin', 'cos', 'tan', 'log', 'exp'];
  /* ⚠️ 反斜杠要加在**每个命令前**（'\frac' 而不是 '\(frac'）：
     写成 String.fromCharCode(92) + '(?:…' 会把分组括号转义掉，正则直接报 unmatched parentheses。 */
  /* ⚠️ 两个坑都在这一行：① 反斜杠要加在**每个命令前**；② 正则里要写 '\\命令'（两个反斜杠），
     写成单个 '\l' 会被当成「转义字母 l」= 字面 l，于是 'measurable' 里的 'le' 也会命中（实测报了 362 处假警）。 */
  const BARE_RX = new RegExp('(?:' + BARE_CMDS.map((c) => String.fromCharCode(92, 92) + c).join('|') + ')(?![a-zA-Z])', 'g');
  /* 先把 $…$ 与 $$…$$ 挖掉，剩下还能匹配到命令 ⇒ 定界符丢了。 */
  /* 先把 $…$、$$…$$、以及**反引号里的代码**挖掉 —— 反引号里写的是「命令本身」
     （例：小写 phi 一律写 `\varphi`），不是数学，不该报。 */
  const stripMathForBare = (s) => String(s || '')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]*?\$/g, ' ')
    .replace(/`[^`]*`/g, ' ');
  const bare = [];
  for (const it of items) {
    const t = stripMathForBare(it.text);
    BARE_RX.lastIndex = 0;
    const m = BARE_RX.exec(t);
    if (m) bare.push(`${it.id}.${it.field}（…${t.slice(Math.max(0, m.index), m.index + 30).replace(/\n/g, ' ')}…）`);
  }
  for (const b of bare.slice(0, 6)) {
    errs.push(`公式：${b} 里出现了**不在 $…$ 内的 LaTeX 命令** —— 多半是定界符被删了（或忘了包裹）`);
  }
  if (bare.length > 6) errs.push(`公式：另有 ${bare.length - 6} 处同类问题（共 ${bare.length} 处）`);

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

  /* ④ display 公式（`$$…$$`）里的花括号必须配对（v2 §11-E 的 _sweep_dispbrace）——
     零误报，做成硬门。踩过的例子：`\frac{1}{2` 少一个右括号，KaTeX 会宽容到行末不报错，排版却歪。
     ⚠ 只查 display：行内公式常有合法的「跨段写」（`A$ 标准正交$\}`），那会误报。 */
  {
    const bad = [];
    const BS = String.fromCharCode(92);
    for (const it of items) {
      const t = String(it.text || '');
      for (const m of t.matchAll(/\$\$([\s\S]*?)\$\$/g)) {
        let d = 0, ok = true;
        for (let k = 0; k < m[1].length; k++) {
          const c = m[1][k];
          if (c === BS) { k++; continue; }        // 跳过 `{` `}` `\` 等命令
          if (c === '{') d++;
          else if (c === '}') { d--; if (d < 0) { ok = false; break; } }
        }
        if (!ok || d !== 0) { bad.push(it.id + '.' + it.field + '（' + (d > 0 ? '少 ' + d + ' 个 }' : '多一个 }') + '）'); break; }
      }
    }
    if (bad.length) {
      errs.push('公式：' + bad.slice(0, 4).join('、') + (bad.length > 4 ? ' 等 ' + bad.length + ' 处' : '') +
        ' 的 `$$…$$` 里花括号不配对 —— 常见的是一位一位删字符时把右括号删掉了');
    }
  }
  return errs;
}

/* ------------------------------------------------ 壳页里的数量（构建期填空） */
/* 为什么 `index.html` 里放占位符、而不是直接在构建时改写源文件（旧做法）：
   ① 源文件被构建默默改动 = 每次 build 都可能把工作区弄脏，diff 里全是噪音；
   ② 数字还是得**静态**（爬虫不跑 JS），又不能手写；
   ⇒ 源文件写 `%%NODES%%` 这类 token，**只填进产物**（dist/mathgalaxy.html）。
   ⚠️ token 只认这一组；填完还有残留 ⇒ 直接抛错（漏填比填错更难查）。
   ⛔ 页面上的数量一律走这里或运行时现算（app.js 的设置窗就是从图算的）。 */
const SHELL_TOKENS = ['NODES', 'EDGES', 'REGIONS', 'CLUSTERS'];
function fillShellCounts(html, C) {
  const val = { NODES: C.nodes, EDGES: C.edges, REGIONS: C.regions, CLUSTERS: C.clusters };
  let out = html;
  for (const k of SHELL_TOKENS) {
    if (!out.includes('%%' + k + '%%')) continue;
    out = out.split('%%' + k + '%%').join(String(val[k]));
  }
  const left = out.match(/%%[A-Z_]+%%/g);
  if (left) throw new Error(`index.html 里有没填的占位符：${[...new Set(left)].join('、')}`);
  return out;
}

/* ---------------------------------------------------------------- 单文件 HTML */
function buildSingleFile(C, preLayout) {
  /* 壳页里的数量（meta description 那种，必须是静态文本）：源文件写 `%%NODES%%` 之类的
     占位符，**只在这里填一次**，填的都是 `meta.counts` 里的真数字。 */
  let html = fillShellCounts(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), C);
  /* 内容版本注入（tools/idstable.mjs 维护；index.html 里写的是 'dev'） */
  html = html.replace("MG.contentVersion = 'dev'", "MG.contentVersion = '" + (CONTENT_VERSION || 'dev') + "'");
  /* ⭐ 布局预计算（ENG-015 阶段二）：把 dist/layout.json 的同一份载荷内联进单文件。
     index.html 里必须有 `<script>window.MG_PRELAYOUT = null;</script>` 占位符，
     没有就让构建红（宁可不发，也不能发一个「看起来有布局、其实每次都冷算」的包）。 */
  html = embedPreLayout(html, preLayout);
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
/* ⭐ 布局预计算（2026-11-11）：buildGraph 里已经跑过一次 computeLayout，这里只做
   序列化 + 落盘。**必须无条件写**（包括 --html / --json 单分支），否则发布包里
   的 dist/layout.json 会和 dist/mathgalaxy.html 内联的那份不是同一次构建。 */
const preLayout = buildPayload(MG, graph);
const layoutOut = writeLayoutFile(MG, graph, DIST);
console.log(`  → dist/${LAYOUT_FILE}（${preLayout.counts.nodes} 点 · sig ${preLayout.sig} · ` +
  `${(layoutOut.bytes / 1024).toFixed(1)} KB）`);
console.log(`  星系 ${graph.regions.length} / 星团 ${graph.clusters.filter(c => c.nodes.length).length} / ` +
  `节点 ${graph.nodes.length} / 连线 ${graph.edges.length}`);
if (graph.warnings.length) {
  console.log('  ⚠ 数据提示：');
  graph.warnings.forEach(w => console.log('    - ' + w));
}

/* ⚠️ `data` 必须在**两个分支外面**算：JSON 产物要用它，壳页（index.html）的数量占位符也要用它。 */
const data = exportJSON(MG, graph);

if (doJSON) {
  // 内容没变就沿用旧时间戳 —— 否则每次构建都会把 git 工作区弄脏
  data.meta.generated = stableStamp(path.join(DIST, 'graph.json'), data);
  fs.writeFileSync(path.join(DIST, 'graph.json'), JSON.stringify(data, null, 1), 'utf8');
  console.log('  → dist/graph.json');

  /* graph.md 里那句「约 N KB」是量自己量出来的（见 withSelfSize） */
  fs.writeFileSync(path.join(DIST, 'graph.md'),
    withSelfSize(exportMarkdown(MG, graph, data), '%%SIZE_KB%%'), 'utf8');
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
  /* ⚠️ 单榜产物和 AI 产物共用一套落盘/体积断言 ⇒ 先算好，等 `files` 建好再 push 进去
     （以前直接在这里 push，报 `Cannot access 'files' before initialization`）。 */
  const hubFiles = exportHubProducts(graph);
  /* 人读的一整篇（站点阅读页用）—— 不进 AI 体积断言，理由见 exportHubsFull 的注释 */
  fs.writeFileSync(path.join(DIST, 'hubs-full.md'), exportHubsFull(graph), 'utf8');
  console.log(`  → dist/hubs.md + hubs/*.md（${hubFiles.length} 页）+ hubs-full.md`);

  /* 缺口清单（I2）：警告级产物，不进断言 */
  const gaps = exportGaps(MG, graph);
  fs.writeFileSync(path.join(DIST, 'gaps.md'), gaps.md, 'utf8');
  fs.writeFileSync(path.join(DIST, 'gaps.json'),
    JSON.stringify({ ...gaps.json, generated: data.meta.generated }, null, 1), 'utf8');
  console.log(`  → dist/gaps.md + gaps.json（无节点 ${gaps.json.missing.length} 个 · 缺边 ${gaps.json.noEdge.length} 处）`);


  /* 内容体检（审计 H1 ①②③ + H2）：警告级产物，不进断言 */
  const audit = auditContent(MG, graph);
  fs.writeFileSync(path.join(DIST, 'audit.md'), exportAudit(audit, graph), 'utf8');
  const suspicious = audit.cycles.filter((c) => c.verdict === 'suspicious').length;
  console.log(`  → dist/audit.md（悬空 id ${audit.dangling.size} · 近同名无边 ${audit.nearPairs.length} 对 · 黑边环 ${audit.cycles.length} 个，可疑 ${suspicious}）`);
  /* ------------------------------------------------------- 英文文档（T2.1） */
  /* 正文真源 src/data/i18n/docs.en.js；这里只渲染 + 状态头 + 分页。
     ⭐ reading / policy 天生装不进一次抓取（英文卡在「转义后字符数」那条上限上），
        照项目老规矩切成 `X.en.2.md`；hubs / notation 是索引型，本来就只有一页。
     ⚠️ 根目录那份也要（和中文版一致，给直接翻仓库的人 / AI）；`{{base}}` 展开成 dist/。 */
  const EN_DOCS = MG.i18nDocs;
  /* ⭐ 逐份状态（决策二.3）：四份文档各自带 status/basedOn，所以状态头**每份现算**。
     缺自己那份的字段就回落文件级默认（见 docs.en.js 文件头）。 */
  const staleDocs = Object.keys(EN_DOCS.docs || {}).filter((k) => enStatus(EN_DOCS, k).state === 'stale');
  if (staleDocs.length) {
    console.log(`  ⚠️ 英文文档标记为 **stale**：${staleDocs.join(' / ')} —— 译自 ` +
      `${EN_DOCS.basedOn}，当前内容版本 ${contentVersion()}` +
      ' —— 把 src/data/i18n/docs.en.js 里那份的 basedOn 更新/重译后才会变回 draft');
  }
  const enOut = [];
  /* 每份英文文档：正文页（dist/）与仓库根页各一套，`{{base}}` 分别展开
     ⚠️ 根目录那份是**照抄中文版的规矩**：中文 llms/policy/reading/notation/alias 都有根副本，
        只有 hubs.md 没有 —— 英文这边也照做，别自己发明。 */
  const put = (name, docKey, blocksOf, withRoot = true) => {
    for (const base of (withRoot ? ['', 'dist/'] : [''])) {
      const dir = base ? ROOT : DIST;
      const d = EN_DOCS.docs[docKey];
      const body = blocksOf ? '' : fillBase(d.body, base);
      const blocks = blocksOf ? blocksOf(base) : null;
      for (const p of paginateEnDoc(name, d, enStatus(EN_DOCS, docKey).line, body, blocks)) {
        enOut.push({ file: path.join(dir, `${name}.en${p.suffix}.md`), text: p.text });
      }
    }
  };
  put('reading', 'reading');
  put('policy', 'policy');
  put('hubs', 'hubs', () => hubBlocksEn(MG, graph), false);   // 列表型：自己切块 ✓（base 无关）
  enOut.push({ file: path.join(DIST, 'notation.en.md'), text: exportNotationEn(MG) });
  enOut.push({ file: path.join(ROOT, 'notation.en.md'), text: exportNotationEn(MG, 'dist/') });
  /* 术语表：只进仓库 i18n/（译者 / 手工维护用），⛔ 不发布成站点产物 —— 它是索引型参考，
     不是给抓取工具读的产物，没必要挤站点体积。 */
  fs.mkdirSync(path.join(ROOT, 'i18n'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'i18n', 'glossary.md'), exportGlossary(MG), 'utf8');

  /* ⚠️ 先清掉上一轮的英文文档（页数会随正文变化）—— 不然 dist/ 和根目录会攒下
     孤儿 `X.en.5.md` 这种续页，发布时被一起带走。 */
  const enRe = /^(reading|policy|hubs|notation)\.en(\.[0-9]+)?\.md$/;
  for (const dir of [DIST, ROOT]) {
    for (const f of fs.readdirSync(dir)) {
      if (enRe.test(f)) fs.rmSync(path.join(dir, f));
    }
  }

  const enErrs = [];
  for (const f of enOut) {
    const b = aiBytes(f.text), c = aiCost(f.text);
    if (b > AI_MAXB || c > AI_ESC) {
      enErrs.push(`产物过大：${path.relative(ROOT, f.file).replace(/\\/g, '/')}` +
        ` = ${b} B / 转义后 ${c} 字符（上限 ${AI_MAXB} B 且 ${AI_ESC} 字符）`);
    }
    fs.writeFileSync(f.file, f.text, 'utf8');
  }
  console.log(`  → 英文文档（逐份状态：` +
    Object.keys(EN_DOCS.docs).map((k) => `${k} ${enStatus(EN_DOCS, k).state}`).join(' · ') + '）：' +
    enOut.map(f => path.relative(ROOT, f.file).replace(/\\/g, '/')).join(' · ') +
    ' + i18n/glossary.md');

  /* ---------------------------------------------- AI 按需检索产物 */
  for (const d of ['nodes', 'proofs', 'notes', 'index', 'notation', 'alias', 'hubs']) {
    fs.rmSync(path.join(DIST, d), { recursive: true, force: true });
  }
  // 早期版本产出过 JSON 版索引；抓取工具对 JSON 不友好，已改成纯文本 .md。
  // 这里主动清掉，免得旧的留在 dist/ 里被当成产物发布。
  fs.rmSync(path.join(DIST, 'index.json'), { force: true });
  const { files, notesOut, pagesOf } = exportAIProducts(MG, graph, data);
  /* 枢纽榜的单榜页（上面算好的）：和 nodes/ proofs/ 一样过体积断言、一样按 files 落盘 */
  for (const f of hubFiles) files.push(f);

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
  const aliasIndex = exportAlias(MG, graph);
  let aliasErrs = [];
  fs.writeFileSync(path.join(DIST, 'alias.md'), aliasIndex, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'alias.md'), exportAlias(MG, graph, 'dist/'), 'utf8');
  const aliasFiles = exportAliasProducts(MG, graph);
  aliasErrs = assertAliasLinks(aliasIndex, aliasFiles);
  for (const f of aliasFiles) files.push(f);
  console.log(`  → dist/alias.md + alias/*.md（${aliasFiles.length} 页）+ alias.md`);

  /* ---------------------------------------------------------- 许可 */
  /* 单一真源是仓库根目录的 LICENSE（给人读的正式文本，不进体积断言，也不被改写）。
     dist 版只加一行 markdown 标题 —— 站点阅读页 renderDoc() 要求第一行是 `# 标题`。
     T1.4：CC BY 4.0 的**法律文本**（仓库根 LICENSE-CC-BY-4.0.txt，逐字节来自
     creativecommons.org）也复制一份到 dist —— 站点要能直接链到它。
     ⚠️ 新增产物必须同时加进 publish.mjs 的拷贝清单，否则线上 404（踩过）。 */
  fs.writeFileSync(path.join(DIST, 'LICENSE.txt'),
    `# 许可与引用\n\n${fs.readFileSync(path.join(ROOT, 'LICENSE'), 'utf8')}`, 'utf8');
  fs.copyFileSync(path.join(ROOT, 'LICENSE-CC-BY-4.0.txt'), path.join(DIST, 'LICENSE-CC-BY-4.0.txt'));
  console.log('  → dist/LICENSE.txt + dist/LICENSE-CC-BY-4.0.txt（复制自仓库根 LICENSE / LICENSE-CC-BY-4.0.txt）');

  const errs = assertAI(MG, graph, files, pagesOf);
  /* ⭐ 2026-11-03（审计 v1 §9-H2）：**黑边环现在是硬门**。
     旧状态：环检测只在 `dist/audit.md` 里报警告，构建照样绿 —— 审计原话「黑边环无门」。
     三分类（与 audit.md 同一口径，不另写一套）：
       · 环里有 equivalence 边 ⇒ 合法（等价类本来就会缩成一个 SCC）；
       · `src/data/gaps.js` 的 `cycleOk` 白名单 ⇒ 合法（多前提假环，每条都写了理由）；
       · 其余 ⇒ **可疑 → 构建失败**（无条件互推该改 equivalence / 回头证该标 layer:false / 否则就是数据错）。
     ⚠️ 用上面已经算好的 `audit`，不重算（`auditContent` 有近同名两两比对，重跑很贵）。 */
  for (const c of audit.cycles) {
    if (c.verdict !== 'suspicious') continue;
    errs.push(`图结构：黑边环可疑 —— ${c.nodes.join(' ↔ ')}（边 ${c.edges.join(', ')}）—— ` +
      '无条件互推 ⇒ 改 equivalence；用更强工具回头证 ⇒ 标 layer:false；都不是 ⇒ 这条边错了');
  }
  errs.push(...aliasErrs);
  errs.push(...enErrs);
  errs.push(...assertEdgeEndpoints(MG, graph));
  errs.push(...assertEdgeStatus(MG, graph));
  errs.push(...assertContrast(MG));
  errs.push(...assertNotation(MG, graph));
  errs.push(...assertAliases(MG, graph));
  errs.push(...assertXref(MG, graph));
  errs.push(...assertI18n(MG, graph));
  errs.push(...assertAbstracts(MG, graph));
  errs.push(...assertStatements(MG, graph));
  errs.push(...assertDocsEn(MG));
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
  const { html } = buildSingleFile(data.meta.counts, preLayout);
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

/* ⭐ 预计算布局硬门（2026-11-11）：dist/layout.json 必须存在、且签名/节点数/坐标
   与这一次构建完全一致。缺文件 / 坏 JSON / 签名不符 ⇒ 构建失败。
   ⛔ 不能只依赖「刚才写过」—— 读回磁盘再校验，才挡得住「被旧产物顶替/半截写入」。
   见 tools/prelayout.mjs 与 src/core/layoutcache.js 的注释。 */
{
  const chk = assertLayoutFile(MG, graph, DIST);
  console.log(`  ✓ 预计算布局校验通过（sig ${chk.sig} · ${chk.counts.nodes} 点逐点一致 · ` +
    `${(chk.bytes / 1024).toFixed(1)} KB）`);
}

/* ⭐⭐ 性能不变量硬门（2026-11-09）—— **放在最后，但一定要跑**。
   为什么放在构建里而不是只放 CI：本地改 UI 的人跑的就是这条命令，
   不挂在这里就没人会看到它红。拿掉它的唯一理由是「你要同时改体检和它守的东西」。
   见 `AGENTS.md` 第四节。 */
await import('./perfguard.mjs');

console.log('完成。');
