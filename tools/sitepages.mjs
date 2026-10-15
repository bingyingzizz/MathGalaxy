/* ==========================================================================
   概念页生成器 —— 把 graph.json 里的每一个节点渲染成一个**独立静态 HTML 页**
   --------------------------------------------------------------------------
   为什么要有这个：节点的原生产物是 `nodes/<id>.md`，而 GitHub Pages 用
   `Content-Type: text/markdown` 提供它 —— 搜索引擎抓取后判定「这不是网页」，
   直接不进索引（706 个概念页对搜索引擎等于全部不存在）。这里给每个概念补一份
   真 HTML，让「搜某个数学概念」能搜到它。

   三条不变量：
     ① **不改内容**：正文一律走 `src/core/util.js` 的 `U.md()`，
        公式钩子指向构建期 KaTeX ⇒ 页面上的字和星图面板里的字逐字一致。
     ② **不改 .md**：原文件继续躺着给 AI 用；HTML 只是**另一份出口**。
     ③ **内链来自真实的边**：出入边都渲染成指向别的概念页的链接，
        706 个页面因此连成一张可爬的网。

   平台无关：只用 node 内置模块，路径一律 path.join。
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(import.meta.dirname, '..');

/* ------------------------------------------------------------------ 转义 */
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ESC[c]);
}

/* 英文入口页（T3.1）在不在：构建期为「有英文名/摘要」的节点产出 `nodes/<id>.en.md`。
   ⚠️ 判据是**文件系统**（真有这个文件），不是 graph.json 里的字段（那只是「该有」）——
      两边不一致时以文件为准，否则页面上的链接会 404。
   ⚠️ 必须定义在 nodePage 之前（踩过：写在函数体里 ⇒ TDZ，ImportError 起不来）。 */
const enPageExists = (id) => {
  try { return fs.existsSync(path.join(ROOT, 'dist', 'nodes', id + '.en.md')); }
  catch (e) { return false; }
};

/* -------------------------------------------------- 载入「仓库里那份真引擎」 */
/**
 * 把 src/ui/katex.min.js 与 src/core/util.js 装进一个 VM。
 * 目的：让 U.md() 在 Node 里跑起来，并且**公式当场渲染成静态 HTML**
 * （而不是留 $…$ 给客户端 KaTeX）。
 *
 * ⚠️ 公式钩子必须在这里装好再调用 U.md()：util.js 里那两个钩子是运行时查
 *    `MG.renderInlineMath` / `MG.renderBlockMath` 的，没装就退化成 <code>。
 */
export function loadEngine() {
  const katexSrc = fs.readFileSync(path.join(ROOT, 'src', 'ui', 'katex.min.js'), 'utf8');
  const kMod = { exports: {} };
  new Function('module', 'exports', katexSrc)(kMod, kMod.exports);
  const katex = kMod.exports;
  if (!katex || typeof katex.renderToString !== 'function') {
    throw new Error('载入 src/ui/katex.min.js 失败');
  }

  const win = { MG: {}, console: { log() {}, warn() {}, error() {} } };
  win.window = win;
  win.self = win;
  const ctx = vm.createContext(win);
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, 'src', 'core', 'util.js'), 'utf8'),
    ctx,
    { filename: 'src/core/util.js' }
  );

  /* 别名与问题钩子也装上。为什么必须进页面：
     `label` 是标准叫法，而**人和 AI 搜的是别的词** —— 英文名、老名字、缩写，
     以及「控制收敛要什么条件」这种大白话问法。这两类数据原本只服务站内搜索和
     dist/alias/*.md（给 AI），概念页里一个字都没有 ⇒ 搜索引擎无从命中。
     ⚠️ `aka` 是纯文本（不能含 `$`），当文本转义即可。 */
  vm.runInContext(
    fs.readFileSync(path.join(ROOT, 'src', 'data', 'aliases.js'), 'utf8'),
    ctx,
    { filename: 'src/data/aliases.js' }
  );

  const U = win.MG.util;
  if (!U || typeof U.md !== 'function' || typeof U.titleHtml !== 'function') {
    throw new Error('util.js 没导出 MG.util.md / titleHtml');
  }

  // 渲染失败的公式：收集起来，跑完一次性报（不许静默降级）
  const mathErrors = [];
  const opts = { throwOnError: true, output: 'htmlAndMathml', strict: false };

  win.MG.renderInlineMath = (tex) => {
    try { return katex.renderToString(tex, { ...opts, displayMode: false }); }
    catch (e) { mathErrors.push({ mode: 'inline', tex, msg: String(e.message).slice(0, 160) }); return '<code>' + esc(tex) + '</code>'; }
  };
  win.MG.renderBlockMath = (tex) => {
    try { return katex.renderToString(tex, { ...opts, displayMode: true }); }
    catch (e) { mathErrors.push({ mode: 'block', tex, msg: String(e.message).slice(0, 160) }); return '<div class="math-block">' + esc(tex) + '</div>'; }
  };

  return { U, katex, mathErrors, aliases: win.MG.aliases };
}

/* -------------------------------------------------------------- 文本工具 */

/** 去掉 LaTeX 的标题：`$…$` 整段拿掉，再收拾留下的标点 */
export function plainTitle(s) {
  return String(s == null ? '' : s)
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$]*?\$/g, ' ')
    .replace(/[：:，,、\s]+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* -------------------------------------------------- LaTeX → 可读纯文本 */
/* 只服务 meta description（搜索结果里的摘要）与索引页的注。
   ⛔ 不能直接把 $…$ 删掉 —— 中文句子里嵌着公式，删掉就断句：
      「若 是两两不交的非空集合族，则存在集合 ，使对每个 都有 。」
   所以把常见命令翻成 Unicode 符号，其余退化成朴素写法。 */
const TEX_SYMS = [
  /* 希腊字母：正文里最常见的一类，漏了会变成 "delta : C longrightarrow C" 这种 */
  [/\\alpha/g, 'α'], [/\\beta/g, 'β'], [/\\gamma/g, 'γ'], [/\\delta/g, 'δ'],
  [/\\epsilon/g, 'ε'], [/\\varepsilon/g, 'ε'], [/\\zeta/g, 'ζ'], [/\\eta/g, 'η'],
  [/\\theta/g, 'θ'], [/\\vartheta/g, 'ϑ'], [/\\iota/g, 'ι'], [/\\kappa/g, 'κ'],
  [/\\lambda/g, 'λ'], [/\\mu/g, 'μ'], [/\\nu/g, 'ν'], [/\\xi/g, 'ξ'],
  [/\\pi/g, 'π'], [/\\varpi/g, 'ϖ'], [/\\rho/g, 'ρ'], [/\\varrho/g, 'ϱ'],
  [/\\sigma/g, 'σ'], [/\\varsigma/g, 'ς'], [/\\tau/g, 'τ'], [/\\upsilon/g, 'υ'],
  [/\\phi/g, 'φ'], [/\\varphi/g, 'φ'], [/\\chi/g, 'χ'], [/\\psi/g, 'ψ'], [/\\omega/g, 'ω'],
  [/\\Gamma/g, 'Γ'], [/\\Delta/g, 'Δ'], [/\\Theta/g, 'Θ'], [/\\Lambda/g, 'Λ'],
  [/\\Xi/g, 'Ξ'], [/\\Pi/g, 'Π'], [/\\Sigma/g, 'Σ'], [/\\Upsilon/g, 'Υ'],
  [/\\Phi/g, 'Φ'], [/\\Psi/g, 'Ψ'], [/\\Omega/g, 'Ω'],
  [/\\longmapsto/g, '⟼'], [/\\longrightarrow/g, '⟶'], [/\\longleftarrow/g, '⟵'],
  [/\\longleftrightarrow/g, '⟷'], [/\\Longrightarrow/g, '⟹'], [/\\Longleftarrow/g, '⟸'],
  [/\\Longleftrightarrow/g, '⟺'],
  [/\\subseteq/g, '⊆'], [/\\subsetneq/g, '⊊'], [/\\subset/g, '⊂'],
  [/\\supseteq/g, '⊇'], [/\\supset/g, '⊃'], [/\\in(?![A-Za-z])/g, '∈'], [/\\notin/g, '∉'],
  [/\\neq|\\ne(?![A-Za-z])/g, '≠'], [/\\leq|\\le(?![A-Za-z])/g, '≤'], [/\\geq|\\ge(?![A-Za-z])/g, '≥'],
  [/\\forall/g, '∀'], [/\\exists/g, '∃'], [/\\neg|\\lnot/g, '¬'],
  [/\\implies|\\Rightarrow/g, '⟹'], [/\\impliedby|\\Leftarrow/g, '⟸'],
  [/\\iff|\\Leftrightarrow/g, '⟺'],
  [/\\to(?![A-Za-z])|\\rightarrow/g, '→'], [/\\mapsto/g, '↦'],
  [/\\wedge|\\land/g, '∧'], [/\\vee|\\lor/g, '∨'],
  /* ⚠️ 这一表的顺序是有意义的：`\cdot` 必须带 (?![A-Za-z]) 断言，
     否则长命令会被短前缀先吃掉（\cdots → "·s"、\bigcup → "cup"）。
     凡是「是另一个命令的前缀」的条目都加了断言。 */
  [/\\times/g, '×'], [/\\cdot(?![A-Za-z])/g, '·'], [/\\cup(?![A-Za-z])/g, '∪'], [/\\cap(?![A-Za-z])/g, '∩'],
  [/\\preceq/g, '≼'], [/\\prec(?![A-Za-z])/g, '≺'], [/\\succeq/g, '≽'], [/\\succ(?![A-Za-z])/g, '≻'],
  [/\\sqsubseteq/g, '⊑'], [/\\sqsupseteq/g, '⊒'], [/\\sqcup/g, '⊔'], [/\\sqcap/g, '⊓'],
  [/\\ll(?![A-Za-z])/g, '≪'], [/\\gg(?![A-Za-z])/g, '≫'],
  [/\\sim(?![A-Za-z])/g, '∼'], [/\\propto/g, '∝'], [/\\asymp/g, '≍'], [/\\doteq/g, '≐'],
  [/\\trianglelefteq/g, '⊴'], [/\\trianglerighteq/g, '⊵'], [/\\triangle(?![A-Za-z])/g, '△'],
  [/\\square/g, '□'], [/\\blacksquare/g, '■'], [/\\checkmark/g, '✓'], [/\\dagger/g, '†'], [/\\ddagger/g, '‡'],
  [/\\top(?![A-Za-z])/g, '⊤'], [/\\bot(?![A-Za-z])/g, '⊥'],
  [/\\bigwedge/g, '⋀'], [/\\bigvee/g, '⋁'],
  [/\\overset\{([^{}]*)\}\{([^{}]*)\}/g, '$2'], [/\\underset\{([^{}]*)\}\{([^{}]*)\}/g, '$2'],
  [/\\xrightarrow\{([^{}]*)\}/g, '→'], [/\\xleftarrow\{([^{}]*)\}/g, '←'],
  [/\\setminus/g, '∖'], [/\\oplus/g, '⊕'], [/\\otimes/g, '⊗'], [/\\circ/g, '∘'],
  [/\\infty/g, '∞'], [/\\partial/g, '∂'], [/\\nabla/g, '∇'],
  [/\\aleph/g, 'ℵ'], [/\\wp/g, '℘'], [/\\angle/g, '∠'], [/\\perp/g, '⊥'],
  [/\\cong/g, '≅'], [/\\simeq/g, '≃'], [/\\approx/g, '≈'], [/\\equiv/g, '≡'],
  [/\\hookrightarrow/g, '↪'], [/\\hookleftarrow/g, '↩'], [/\\twoheadrightarrow/g, '↠'],
  [/\\dashv/g, '⊣'], [/\\vdash/g, '⊢'], [/\\models/g, '⊨'], [/\\vDash/g, '⊨'],
  [/\\langle/g, '⟨'], [/\\rangle/g, '⟩'],
  [/\\cdots/g, '⋯'], [/\\ldots|\\dots/g, '…'], [/\\vdots/g, '⋮'], [/\\ddots/g, '⋱'],
  [/\\sum/g, '∑'], [/\\prod/g, '∏'], [/\\int/g, '∫'], [/\\bigcup/g, '⋃'], [/\\bigcap/g, '⋂'],
  [/\\bigoplus/g, '⨁'], [/\\bigotimes/g, '⨂'], [/\\coprod/g, '∐'],
  [/\\limsup/g, 'limsup'], [/\\liminf/g, 'liminf'],
  [/\\lim(?![A-Za-z])/g, 'lim'], [/\\sup(?![A-Za-z])/g, 'sup'], [/\\inf(?![A-Za-z])/g, 'inf'],
  [/\\max(?![A-Za-z])/g, 'max'], [/\\min(?![A-Za-z])/g, 'min'],
  [/\\ker(?![A-Za-z])/g, 'ker'], [/\\dim(?![A-Za-z])/g, 'dim'], [/\\dom(?![A-Za-z])/g, 'dom'],
  [/\\emptyset|\\varnothing/g, '∅'],
  [/\\operatorname\{([^{}]*)\}/g, '$1'],
  [/\\text(?:bf|it|rm|sf|tt)?\{([^{}]*)\}/g, '$1'],
  [/\\mathrm\{([^{}]*)\}/g, '$1'], [/\\mathbf\{([^{}]*)\}/g, '$1'],
  [/\\mathbb\{N\}/g, 'ℕ'], [/\\mathbb\{Z\}/g, 'ℤ'], [/\\mathbb\{Q\}/g, 'ℚ'],
  [/\\mathbb\{R\}/g, 'ℝ'], [/\\mathbb\{C\}/g, 'ℂ'], [/\\mathbb\{H\}/g, 'ℍ'],
  [/\\mathbb\{P\}/g, 'ℙ'], [/\\mathbb\{F\}/g, '𝔽'],
  [/\\mathbb\{([A-Za-z])\}/g, '$1'],
  [/\\mathcal\{([A-Za-z])\}/g, (m, c) => c],
  [/\\mathfrak\{([A-Za-z])\}/g, (m, c) => c],
  [/\\boldsymbol\{([^{}]*)\}/g, '$1'], [/\\vec\{([^{}]*)\}/g, '$1'],
  [/\\bar\{([^{}]*)\}/g, '$1'], [/\\hat\{([^{}]*)\}/g, '$1'], [/\\tilde\{([^{}]*)\}/g, '$1'],
  [/\\overline\{([^{}]*)\}/g, '$1'], [/\\widehat\{([^{}]*)\}/g, '$1'],
  [/\\bigl|\\bigr|\\Bigl|\\Bigr|\\left|\\right|\\big(?![A-Za-z])|\\Big(?![A-Za-z])/g, ''],
  [/\\quad|\\qquad|\\,|\\;|\\:|\\!/g, ' '],
  [/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)'],
  [/\\sqrt\{([^{}]*)\}/g, '√($1)'],
  [/\\prime/g, '′'],
];

export function texToPlain(tex) {
  let s = String(tex);
  // 集合的花括号是**记号本身**（\{a\}），不能跟分组花括号一起删 —— 先换成占位符，
  // 否则 `a \mapsto \{a\}` 会退化成 `a ↦ a`，把「映到单点集」说成「映到自己」。
  s = s.replace(/\\\{/g, '\u0001').replace(/\\\}/g, '\u0002');
  for (const [re, to] of TEX_SYMS) s = s.replace(re, to);
  s = s.replace(/\^\{([^{}]*)\}/g, '^$1').replace(/_\{([^{}]*)\}/g, '_$1');
  s = s.replace(/\\([A-Za-z]+)/g, '$1');   // 剩下的命令去掉反斜杠
  s = s.replace(/[{}]/g, '').replace(/\\/g, '');
  s = s.replace(/\u0001/g, '{').replace(/\u0002/g, '}');
  return s.replace(/\s+/g, ' ').trim();
}

/** markdown → 纯文本（只用于 meta description 这类不进 DOM 的场合） */
export function stripMd(s) {
  return String(s == null ? '' : s)
    .replace(/\$\$([\s\S]*?)\$\$/g, (m, tex) => ' ' + texToPlain(tex) + ' ')
    .replace(/\$([^$\n]*?)\$/g, (m, tex) => ' ' + texToPlain(tex) + ' ')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+[.)]\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/[*_>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function clip(s, n) {
  const t = String(s == null ? '' : s);
  return t.length <= n ? t : t.slice(0, n - 1).replace(/[\s，,、;；:：]+$/, '') + '…';
}

/* ------------------------------------------------- 边的端点（四种 kind 归一） */
/**
 * implication: sources[] → target
 * equivalence: a ⟺ b
 * definition : definition → usedBy（「用到它的结论」）
 * analogy    : a ~ b（弱边）
 */
export function endsOf(e) {
  switch (e.kind) {
    case 'implication': return { from: [...(e.sources || [])], to: e.target ? [e.target] : [] };
    case 'equivalence': return { from: [e.a], to: [e.b] };
    case 'definition': return { from: [e.definition], to: [e.usedBy] };
    case 'analogy': return { from: [e.a], to: [e.b] };
    default: return { from: [], to: [] };
  }
}

const KIND_NAME = {
  implication: '推出',
  equivalence: '等价',
  definition: '定义引用',
  analogy: '类比',
};
const TYPE_NAME = {
  axiom: '公理', definition: '定义', theorem: '定理',
  lemma: '引理', proposition: '命题', corollary: '推论', example: '例',
};

/* ------------------------------------------------------------ 页面片段 */

/** 节点页之间的相对链接（同目录，文件名就是 id + .html） */
const nodeHref = (id) => encodeURIComponent(String(id).replace(/\./g, '.')) + '.html';

/**
 * 一条边在「当前节点」视角下渲染成一行：对方是主角，边是说明。
 * side='in' 表示这条边指向当前节点。
 */
function edgeRow(e, curId, side, byId, U) {
  const { from, to } = endsOf(e);
  const others = (side === 'in' ? from : to).filter((x) => x !== curId);
  const selfLoop = others.length === 0;   // 自指（理论上不该有）

  const links = others.map((id) => {
    const n = byId.get(id);
    const name = n ? n.label : id;
    return '<a href="' + nodeHref(id) + '">' + esc(name) + '</a>';
  }).join('、');

  /* 方向必须写清楚：
       implication —— 箭头就是推出方向；
       definition  —— 边的方向是「定义 → 用到它的结论」，所以要**反过来读**，
                      写成「本页 → 子群」会被误读成「群推出子群」。 */
  let head;
  if (e.kind === 'definition') {
    head = side === 'in'
      ? links + ' <span class="arrow">→</span> 本页'
      : links + ' <span class="arrow">用到</span> 本页';
  } else if (e.kind === 'equivalence') {
    head = '本页 <span class="sym">⟺</span> ' + links;
  } else if (e.kind === 'implication') {
    head = side === 'in'
      ? links + ' <span class="arrow">⟹</span> 本页'
      : '本页 <span class="arrow">⟹</span> ' + links;
  } else {
    head = links;
  }
  if (selfLoop) head = '<em>（自指）</em>';

  const proof = e.proof
    ? '<div class="proof">' + U.md(e.proof) + '</div>'
    : '';
  // equivalence 的 proofs[] 是「双向」的，每条带自己的方向标签
  const multi = Array.isArray(e.proofs) && e.proofs.length
    ? e.proofs.map((p) =>
        '<div class="proof"><div class="proof-label">' + esc(p.label || '证明') + '</div>' + U.md(p.text) + '</div>'
      ).join('')
    : '';

  /* ⚠️ title 与 note 都要显示，**两个是不同的东西**：
       title 是这条边的名字，note 是补充说明（implication / equivalence 常常两个都有）。
       之前写成 `e.title || e.note` ⇒ note 从来没露过面。
     ⚠️ title 走 titleHtml（标题语义，里面的 * 是数学记号，不做粗斜体）；
        note 走 md（正文语义，有 **粗体** 和分段）。用错会把 ** 原样吐在页面上。 */
  const titleHtml = e.title ? '<div class="edge-title">' + U.titleHtml(e.title) + '</div>' : '';
  const noteHtml = e.note ? '<div class="edge-note">' + U.md(e.note) + '</div>' : '';

  return [
    '<li class="edge' + (e.strength === 'weak' ? ' weak' : '') + '">',
    '  <div class="edge-line">' + head + '<span class="kind">' + (KIND_NAME[e.kind] || e.kind) + '</span></div>',
    '  ' + titleHtml,
    '  ' + proof + multi,
    '  ' + noteHtml,
    '</li>',
  ].join('\n');
}

/** 分组：先按方向（入 / 出），组内再按 kind 分小节 */
function relationSection(title, edges, curId, side, byId, U) {
  if (!edges.length) return '';
  const order = ['implication', 'equivalence', 'definition', 'analogy'];
  const groups = new Map();
  for (const k of order) groups.set(k, []);
  for (const e of edges) (groups.get(e.kind) || groups.set(e.kind, []).get(e.kind)).push(e);

  const parts = [];
  for (const k of order) {
    const list = groups.get(k);
    if (!list || !list.length) continue;
    parts.push('<h3 class="kind-h">' + KIND_NAME[k] + ' <span class="n">' + list.length + '</span></h3>');
    parts.push('<ul class="edges">' + list.map((e) => edgeRow(e, curId, side, byId, U)).join('\n') + '</ul>');
  }
  if (!parts.length) return '';
  return '<section class="rel-sec"><h2>' + esc(title) + '</h2>' + parts.join('\n') + '</section>';
}

/* ------------------------------------------------------------ 节点页本体 */

function nodePage(node, rel, ctx) {
  const { U, regions, clusters, origin, version, updated, byId } = ctx;
  const region = regions.get(node.region);
  const cluster = clusters.get(node.cluster);

  /* `title` 字段有时只是「命题」「推论」这种类型词 —— 真正的名字写在被打掉的
     公式里。判据：只有当它**比 label 更有信息量**（更长）时才拿它当页面标题，
     否则用 label。不这么筛会出现 37 个页面 title 全叫「命题 · 数学星图」。 */
  const titlePlain = plainTitle(node.title);
  const pageTitle = (titlePlain.length > node.label.length) ? titlePlain : node.label;
  /* 英文名（T1.1 的字段）：title_en 优先，其次 label_en。
     ⚠️ 中文 title 里**本来就常带英文**（`外延公理（Axiom of Extensionality）`），
        所以只在「中文名里没有它」时才并列出来，避免一句话里出现两次。 */
  const normCmp = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  const enName = String(node.title_en || node.label_en || '').trim();
  const enInTitle = !!enName && normCmp(pageTitle).includes(normCmp(enName));
  const htmlTitle = (enName && !enInTitle ? pageTitle + '（' + enName + '）' : pageTitle) + ' · 数学星图 MathGalaxy';

  // 描述：陈述太短就往「说明」里借，还是太短就拿页面标题兜底 —— Google 会跳过过短的
  let descSource = stripMd(node.statement);
  if (descSource.length < 70 && node.notes) descSource = (descSource + ' ' + stripMd(node.notes)).trim();
  if (descSource.length < 30) descSource = (descSource + ' ' + pageTitle).trim();
  // ⚠️ 它是**转义后**才写进 HTML 的：`<` 会变成 `&lt;`（4 字符）。
  // 只按源码长度截，含 `<` 的描述会明显超出摘要长度（实测最长的到 198）。
  let description = clip(descSource, 158);
  for (let n = 150; n >= 60 && esc(description).length > 165; n -= 12) description = clip(descSource, n);
  /* 英文一句（T1.2）：同一个 URL 承载双语，摘要里直接把英文名带上 ——
     对英文检索的人/爬虫这是唯一能看见名字的地方（画布上的标签仍是中文）。 */
  const descFull = description + (enName ? ' · English: ' + enName : '');

  const url = origin + '/mathgalaxy/nodes/' + encodeURIComponent(node.id) + '.html';
  const hasEnPage = enPageExists(node.id);
  const enPageRel = node.id + '.en.md';
  const crumbRegion = region ? region.name : node.region;
  const crumbCluster = cluster ? cluster.name : node.cluster;

  // 面包屑：星图 → 星系 → 星团 → 本页
  const crumbs = [
    { name: '数学星图', url: origin + '/mathgalaxy/all.html' },
    { name: crumbRegion, url: origin + '/mathgalaxy/all.html#' + encodeURIComponent(node.region) },
    { name: crumbCluster, url: origin + '/mathgalaxy/all.html#' + encodeURIComponent(node.cluster) },
    { name: node.label, url },
  ];
  const crumbHtml = crumbs.map((c, i) =>
    i === crumbs.length - 1
      ? '<span aria-current="page">' + esc(c.name) + '</span>'
      : '<a href="' + c.url + '">' + esc(c.name) + '</a>'
  ).join('<span class="sep">›</span>');

  // 事实行
  const facts = [
    TYPE_NAME[node.type] || node.type,
    '依赖深度 layer ' + node.layer,
    ...(node.regions || []).map((r) => (regions.get(r) ? regions.get(r).name : r)),
  ];
  if (cluster) facts.push(crumbCluster);

  /* 英文摘要（T2.2）：枢纽榜前列的节点带一段英文导读（产物在 graph.json 的 abstract_en）。
     ⚠️ 状态（draft / reviewed / stale）**来自构建** —— node.translations.en 是
        tools/build.mjs 按 status + basedOn 现算写进 graph.json 的；页面不自己判断状态、
        也不手写状态词。⛔ 「中文陈述是权威版本」这句话必须跟摘要一起出现（作者护栏）。
     ⚠️ 这一段必须建在 JSON-LD 之前：下面 ldNode.abstract 要用它。 */
  const absEn = String(node.abstract_en || '').trim();
  const absTr = (node.translations && node.translations.en) || null;
  const absState = absTr ? absTr.status : '';
  const absNote = absState === 'reviewed'
    ? 'Translation of the statement above · reviewed by the author · the Chinese text is authoritative.'
    : absState === 'stale'
      ? 'Translation of the statement above · made for content ' + (absTr.version || '?') +
        ', not updated since · the Chinese text is authoritative.'
      : 'Translation of the statement above · machine-drafted, pending author review · the Chinese text is authoritative.';
  const absHtml = absEn
    ? '<section class="sec abstract-en" lang="en">' +
      '<h2>English abstract <span class="abs-state">' + esc(absState || 'draft') + '</span></h2>' +
      '<p class="abs-note">' + esc(absNote) + '</p>' +
      U.md(absEn) + '</section>'
    : '';

  // 结构化数据
  const ldType = (node.type === 'definition' || node.type === 'axiom') ? 'DefinedTerm' : 'TechArticle';
  const ldNode = {
    '@type': ldType,
    '@id': url + '#concept',
    name: node.label,
    /* 同一个 URL 承载双语 ⇒ 英文名走 alternateName（不是另开一个 URL，
       所以**不需要 hreflang** —— 那是给不同 URL 用的）。 */
    alternateName: enName || (titlePlain !== node.label ? titlePlain : undefined),
    description,
    url,
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'DefinedTermSet',
      '@id': origin + '/mathgalaxy/all.html#graph',
      name: '数学星图 MathGalaxy',
      url: origin + '/mathgalaxy/all.html',
    },
  };
  if (ldType === 'DefinedTerm') ldNode.termCode = node.id;
  if (node.tags && node.tags.length) ldNode.keywords = node.tags.join(', ');
  /* 英文摘要也进结构化数据（schema.org 的 abstract）：机器读者不必去正文里找它。
     ⚠️ 只在有摘要时写 —— 没有的节点不留空字段。 */
  if (absEn) ldNode.abstract = absEn;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      ldNode,
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem', position: i + 1, name: c.name, item: c.url,
        })),
      },
    ],
  };

  const statementHtml = node.statement ? U.md(node.statement) : '';
  const notesHtml = node.notes ? U.md(node.notes) : '';
  const refsHtml = (node.refs && node.refs.length)
    ? '<section class="sec"><h2>参考</h2><ul class="refs">' +
      node.refs.map((r) => '<li>' + esc(r) + '</li>').join('') + '</ul></section>'
    : '';

  const inHtml = relationSection('谁指向它（入边）', rel.in || [], node.id, 'in', byId, U);
  const outHtml = relationSection('它指向谁（出边）', rel.out || [], node.id, 'out', byId, U);

  /* 同星团的其他概念：这一块**不是**装饰 —— 图里 52% 的节点出边为 0，
     只靠边做内链会有大量孤立的「死胡同」页。按星团补齐后每页都有十几个
     到几十个指向同类概念的链接，爬虫有路走，人也更可能接着读下去。 */
  const sibs = (ctx.clusterMembers.get(node.cluster) || []).filter((x) => x.id !== node.id);
  const sibHtml = sibs.length
    ? '<section class="rel-sec sib-sec"><h2>同一星团的其他概念 <span class="n">' +
      (sibs.length + 1) + ' 个</span></h2><ul class="sibs">' +
      sibs.map((x) => '<li><a href="' + nodeHref(x.id) + '">' + esc(x.label) + '</a>' +
        '<span class="lay">layer ' + x.layer + '</span></li>').join('') +
      '</ul></section>'
    : '';

  /* 问题钩子：把**人真正会敲进搜索框的那句话**写进页面。
     一条问法往往指向好几个节点，所以每个被指向的节点都列它，并把同问法下的
     其它节点链出去。这是「搜钩子能搜到」的唯一办法 —— 只放在 aliases.js 里，
     搜索引擎一个字也看不见。 */
  const myHooks = ctx.hooksOf.get(node.id) || [];
  const hooksHtml = myHooks.length
    ? '<section class="rel-sec hook-sec"><h2>常见问法 <span class="n">' + myHooks.length +
      ' 条</span></h2><ul class="hooks">' +
      myHooks.map((h) => {
        const others = (h.to || []).filter((x) => x !== node.id && byId.has(x));
        const links = others.map((x) =>
          '<a href="' + nodeHref(x) + '">' + esc(byId.get(x).label) + '</a>').join('、');
        return '<li><span class="q">' + esc(h.q) + '</span>' +
          (links ? '<span class="also">也看 ' + links + '</span>' : '') + '</li>';
      }).join('') + '</ul></section>'
    : '';

  /* 别名：`label` 是标准叫法，人和 AI 搜的是别的词（英文名 / 老名字 / 缩写）。
     写进页面是**术语表式的正常做法**，不是塞关键词 —— 每个词都真的是它的名字。 */
  const aka = ctx.akaOf.get(node.id) || [];
  const akaHtml = aka.length
    ? '<p class="aka"><span class="aka-k">又称</span>' +
      aka.map((x) => esc(x)).join('<span class="aka-s">·</span>') + '</p>'
    : '';

  /* 图外条目（T2.3）：这条在 Wikipedia / nLab / Mathlib 上的对应页。
     ⭐ 它是「从星图走到图外」的唯一出路 —— 每条 URL 都真核过（见 src/data/xref.js 抬头），
        ⛔ 不核实不写。⛔ 视觉上只加一行小字，不动别的。 */
  const XR = node.xref || null;
  const XR_NAME = { wikipedia: 'Wikipedia', nlab: 'nLab', stacks: 'Stacks Project', mathlib: 'Mathlib' };
  const xrefHtml = XR
    ? '<p class="xref"><span class="xref-k">图外条目</span>' +
      Object.keys(XR_NAME).filter((k) => XR[k]).map((k) =>
        '<a href="' + esc(XR[k]) + '" target="_blank" rel="noopener nofollow">' + XR_NAME[k] + ' ↗</a>'
      ).join('<span class="aka-s">·</span>') + '</p>'
    : '';

  const regionColor = region ? region.color : '#4f7cf5';

  /* ⚠️ 页脚**不留构建日期**：meta.generated 每次构建都会变，写进去就意味着
     706 个页面每次发布全部重写 —— 全量重传几十 MB、git 历史白涨。
     留 version 就够（它只在内容真的变时才变），内容相同的两次构建产物逐字节一致。
     日期只留在 all.html 那一份里。 */
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(htmlTitle)}</title>
<meta name="description" content="${esc(descFull)}">
<link rel="canonical" href="${esc(url)}">
<link rel="alternate" type="text/markdown" href="${esc(node.id)}.md" title="Markdown 原文（给 AI 的按需检索版）">
${hasEnPage ? `<link rel="alternate" type="text/markdown" hreflang="en" href="${esc(enPageRel)}" title="English entry (Markdown)">\n` : ''}<meta property="og:type" content="article">
<meta property="og:site_name" content="数学星图 MathGalaxy">
<meta property="og:title" content="${esc(htmlTitle)}">
<meta property="og:description" content="${esc(descFull)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="zh_CN">
${enName ? '<meta property="og:locale:alternate" content="en">\n' : ''}<meta name="twitter:card" content="summary">
<meta name="theme-color" content="${esc(regionColor)}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="stylesheet" href="../../assets/katex.min.css">
<link rel="stylesheet" href="../../assets/site.css">
<link rel="stylesheet" href="../../assets/node.css">
</head>
<body class="node-page" style="--rc:${esc(regionColor)}">

<nav class="crumb" aria-label="面包屑">${crumbHtml}</nav>

<main class="wrap">

  <header class="np-head">
    <h1>${U.titleHtml(node.label)}${enName && !enInTitle ? '<span class="en" lang="en">' + esc(enName) + '</span>' : ''}</h1>
    ${node.title && node.title !== node.label ? '<p class="full">' + U.titleHtml(node.title) + '</p>' : ''}
    <ul class="facts">${facts.map((f) => '<li>' + esc(f) + '</li>').join('')}</ul>
    <p class="idline"><code>${esc(node.id)}</code>${
      node.tags && node.tags.length ? ' · ' + node.tags.map((t) => esc(t)).join(' · ') : ''
    }</p>
    ${akaHtml}
    ${xrefHtml}
  </header>

  <section class="sec statement">
    <h2>陈述</h2>
    ${statementHtml || '<p class="empty">（本节点没有单独的陈述）</p>'}
  </section>

  ${notesHtml ? '<section class="sec notes"><h2>说明</h2>' + notesHtml + '</section>' : ''}

  ${absHtml}

  ${outHtml}
  ${inHtml}

  ${refsHtml}

  ${hooksHtml}

  ${sibHtml}

  <section class="sec jump">
    <h2>继续</h2>
    <p>
      <a href="../#n=${encodeURIComponent(node.id)}">在星图里打开「${esc(node.label)}」</a>　·　
      <a href="../all.html">全部 ${ctx.nodeCount} 个概念</a>　·　
      <a href="${esc(node.id)}.md">Markdown 原文</a>　·　
      ${hasEnPage ? `<a href="${esc(enPageRel)}" hreflang="en">English entry</a>　·　` : ''}<a href="../read.html">读图指南与记号表</a>
    </p>
  </section>

</main>

<footer class="np-foot">
  <p>数学星图 MathGalaxy · 内容 ${esc(version)}</p>
  <p>引用请标注节点 id <code>${esc(node.id)}</code> 与内容版本 ·
    条款见 <a href="../LICENSE.txt">LICENSE</a> ·
    由 <a href="https://github.com/${esc(ctx.user)}/MathGalaxy">MathGalaxy</a> 生成</p>
</footer>

</body>
</html>
`;
}

/* --------------------------------------------------------------- 总索引页 */

function allPage(ctx) {
  const { U, regions, clusters, graph, origin, version, updated } = ctx;
  // 星团 → 成员（按 layer 再按 id 排，和学习顺序一致）
  const byCluster = ctx.clusterMembers;

  const blocks = [];
  /* 页面上**实际列出**的每星系概念数。图里一个节点可以属于多个星系（落在交界处），
     meta 里的 region.nodeCount 是那个口径 —— 直接显示它，会出现「范畴论 281」
     而下面只列了 200 行的情况，让人以为漏了。这里按 cluster 归口，和列出的行数一致。 */
  const listed = new Map();
  for (const n of graph.nodes) {
    const c = clusters.get(n.cluster);
    if (c) listed.set(c.parent, (listed.get(c.parent) || 0) + 1);
  }
  for (const r of graph.regions) {
    const cls = graph.clusters.filter((c) => c.parent === r.id);
    const inner = cls.map((c) => {
      const members = byCluster.get(c.id) || [];
      return [
        '<div class="cl" id="' + esc(c.id) + '" style="--rc:' + esc(r.color) + '">',
        '  <h3>' + esc(c.name) + ' <span class="n">' + members.length + ' 个概念</span></h3>',
        c.desc ? '  <p class="cd">' + U.titleHtml(c.desc) + '</p>' : '',
        '  <ul class="nl">' + members.map((n) =>
          '<li><a href="nodes/' + encodeURIComponent(n.id) + '.html">' + esc(n.label) + '</a>' +
          (plainTitle(n.title) && plainTitle(n.title) !== n.label
            ? '<span class="en">' + esc(plainTitle(n.title)).slice(0, 80) + '</span>' : '') +
          '</li>').join('') + '</ul>',
        '</div>',
      ].join('\n');
    }).join('\n');

    blocks.push([
      '<section class="rg" id="' + esc(r.id) + '" style="--rc:' + esc(r.color) + '">',
      '  <h2>' + esc(r.name) + ' <span class="en">' + esc(r.en || '') + '</span>',
      '    <span class="n">' + (listed.get(r.id) || 0) + ' 个概念</span></h2>',
      r.desc ? '  <p class="rd">' + U.titleHtml(r.desc) + '</p>' : '',
      inner,
      '</section>',
    ].join('\n'));
  }

  const c = graph.meta.counts;
  const url = origin + '/mathgalaxy/all.html';
  const description = clip(
    '数学星图 MathGalaxy 的全部概念索引：' + c.regions + ' 个星系、' + c.clusters +
    ' 个星团、' + c.nodes + ' 个节点（公理 / 定义 / 定理 / 引理 / 命题 / 推论），' +
    '每个概念一页，边是它们之间的推出、等价与定义引用。', 150);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTermSet',
        '@id': url + '#graph',
        name: '数学星图 MathGalaxy',
        description,
        url,
        inLanguage: 'zh-CN',
        license: origin + '/mathgalaxy/LICENSE.txt',
        version,
        dateModified: updated,
        hasDefinedTerm: graph.nodes.map((n) => ({
          '@type': 'DefinedTerm',
          '@id': origin + '/mathgalaxy/nodes/' + encodeURIComponent(n.id) + '.html',
          name: n.label,
          termCode: n.id,
        })),
      },
      {
        '@type': 'CollectionPage',
        name: '数学星图 · 概念索引',
        url,
        inLanguage: 'zh-CN',
        isPartOf: { '@type': 'WebSite', name: '数学星图 MathGalaxy', url: origin + '/mathgalaxy/' },
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>全部概念索引 · 数学星图 MathGalaxy</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<link rel="stylesheet" href="../assets/katex.min.css">
<link rel="stylesheet" href="../assets/site.css">
<link rel="stylesheet" href="../assets/node.css">
<meta property="og:type" content="website">
<meta property="og:site_name" content="数学星图 MathGalaxy">
<meta property="og:title" content="全部概念索引 · 数学星图 MathGalaxy">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="zh_CN">
<meta property="og:locale:alternate" content="en">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="all-page">

<nav class="crumb" aria-label="面包屑">
  <a href="./">数学星图</a><span class="sep">›</span><span aria-current="page">全部概念索引</span>
</nav>

<main class="wrap wide">

<header class="np-head">
  <h1>数学星图 · 全部概念</h1>
  <p class="full">${c.regions} 个星系 · ${c.clusters} 个星团 · ${c.nodes} 个概念 · ${c.edges} 条连线（强边 ${c.strong}，弱边 ${c.weak}）</p>
  <p class="lead">每个概念一页：陈述、说明、参考，以及它与别的概念之间的推出、等价与定义引用。
  点击任意概念进入它自己的页面；想在图上看它们的位置，就从 <a href="./">星图首页</a> 进。</p>
</header>

<nav class="toc">
${graph.regions.map((r) =>
  '  <a href="#' + esc(r.id) + '" style="--rc:' + esc(r.color) + '">' + esc(r.name) +
  '<span class="n">' + (listed.get(r.id) || 0) + '</span></a>').join('\n')}
</nav>

${blocks.join('\n\n')}

<section class="rg">
  <h2>怎么读</h2>
  <ul class="read-list">
    <li><a href="read.html">读图指南</a>：三层尺度、四种边、层号与字段</li>
    <li><a href="read.html#notation">记号对照表</a>：全图记号的唯一权威</li>
    <li><a href="read.html#hubs">枢纽定理榜</a>：按被引用次数排序</li>
    <li><a href="index.md">Markdown 目录</a>：给 AI 的按需检索入口</li>
  </ul>
</section>

</main>

<footer class="np-foot">
  <p>数学星图 MathGalaxy · 内容 ${esc(version)} · 更新 ${esc(updated)}</p>
  <p>引用请标注节点 id 与内容版本 · 条款见 <a href="LICENSE.txt">LICENSE</a></p>
</footer>

</body>
</html>
`;
}

/* ------------------------------------------------------------- 常见问法页 */

/**
 * 把全部问题钩子集中到一页。
 * `q` 是**人真正会敲进搜索框的那句话**（「控制收敛要什么条件」），不是术语 ——
 * 对搜索引擎来说这是最自然的长尾入口，对人也是一张「不知道该搜什么」时的地图。
 */
function questionsPage(ctx) {
  const { graph, origin, byId } = ctx;
  const all = (ctx.aliases && ctx.aliases.hooks) || [];
  const usable = all.filter((h) => (h.to || []).some((id) => byId.has(id)));

  const items = usable.map((h) => {
    const tos = (h.to || []).filter((id) => byId.has(id));
    const links = tos.map((id) =>
      '<a href="nodes/' + encodeURIComponent(id) + '.html">' + esc(byId.get(id).label) + '</a>').join('、');
    return '  <li><p class="q">' + esc(h.q) + '</p><p class="to">' + links + '</p></li>';
  }).join('\n');

  const url = origin + '/mathgalaxy/questions.html';
  const description = clip(
    `数学星图的 ${usable.length} 条常见问法：每条问法列出该看哪几个概念。` +
    '「什么时候积分和极限能换顺序」「控制收敛要什么条件」「布尔环和 Stone 空间什么关系」。', 150);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        name: '数学星图 · 常见问法',
        url,
        inLanguage: 'zh-CN',
        description,
        mainEntity: usable.slice(0, 200).map((h) => ({
          '@type': 'Question',
          name: h.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: '见：' + (h.to || []).filter((id) => byId.has(id))
              .map((id) => byId.get(id).label + '（' + origin + '/mathgalaxy/nodes/' +
                encodeURIComponent(id) + '.html）').join('；'),
          },
        })),
      },
      {
        '@type': 'CollectionPage',
        name: '数学星图 · 常见问法',
        url,
        inLanguage: 'zh-CN',
        isPartOf: { '@type': 'WebSite', name: '数学星图 MathGalaxy', url: origin + '/mathgalaxy/' },
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>常见问法索引 · 数学星图 MathGalaxy</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="数学星图 MathGalaxy">
<meta property="og:title" content="常见问法索引 · 数学星图 MathGalaxy">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="zh_CN">
<meta property="og:locale:alternate" content="en">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<link rel="stylesheet" href="../assets/katex.min.css">
<link rel="stylesheet" href="../assets/site.css">
<link rel="stylesheet" href="../assets/node.css">
</head>
<body class="all-page">

<nav class="crumb" aria-label="面包屑">
  <a href="./">数学星图</a><span class="sep">›</span>
  <a href="all.html">全部概念</a><span class="sep">›</span>
  <span aria-current="page">常见问法</span>
</nav>

<main class="wrap">

<header class="np-head">
  <h1>常见问法</h1>
  <p class="full">${usable.length} 条真实问法 → 该看哪几个概念</p>
  <p class="lead">这些是<strong>搜的时候真正会敲进去的字</strong>，不是术语。每条列出该看的概念页。</p>
</header>

<ul class="qlist">
${items}
</ul>

<section class="sec jump">
  <h2>继续</h2>
  <p>
    <a href="all.html">全部概念索引</a>　·　
    <a href="./">打开星图</a>　·　
    <a href="read.html">读图指南与记号表</a>
  </p>
</section>

</main>

<footer class="np-foot">
  <p>数学星图 MathGalaxy · 内容 ${esc(ctx.version)} · 更新 ${esc(ctx.updated)}</p>
  <p>引用请标注节点 id 与内容版本 · 条款见 <a href="LICENSE.txt">LICENSE</a></p>
</footer>

</body>
</html>
`;
}

/* ------------------------------------------------------------------ 主入口 */

/**
 * 生成全部概念页。
 * @returns {{ pages: {rel:string, html:string}[], stats: object, mathErrors: object[] }}
 */
export function buildSitePages(graph, { origin, user }) {
  const { U, mathErrors, aliases } = loadEngine();

  const regions = new Map(graph.regions.map((r) => [r.id, r]));
  const clusters = new Map(graph.clusters.map((c) => [c.id, c]));
  const byId = new Map(graph.nodes.map((n) => [n.id, n]));

  // 同星团成员（按 layer 再按 id —— 和学习顺序一致）
  const clusterMembers = new Map();
  for (const n of graph.nodes) {
    if (!clusterMembers.has(n.cluster)) clusterMembers.set(n.cluster, []);
    clusterMembers.get(n.cluster).push(n);
  }
  for (const list of clusterMembers.values()) {
    list.sort((a, b) => (a.layer - b.layer) || a.id.localeCompare(b.id));
  }

  // 别名：id → [别名…]
  const akaOf = new Map();
  for (const a of (aliases && aliases.nodes) || []) {
    if (a && a.id && Array.isArray(a.aka) && a.aka.length) akaOf.set(a.id, a.aka);
  }

  // 问题钩子：id → [该看它的问法…]。一条问法通常同时指向好几个节点，所以每个被指向的
  // 节点页都会列出它，并把同一问法下的**其它**节点链出去（天然的内链 + 真实搜索词）。
  // ⚠️ 引用不存在的 id 直接跳过 —— 宁可少一条，也不要把死链写进 706 个页面里。
  const hooksOf = new Map();
  let hookDangling = 0;
  for (const h of (aliases && aliases.hooks) || []) {
    for (const id of (h.to || [])) {
      if (!byId.has(id)) { hookDangling++; continue; }
      if (!hooksOf.has(id)) hooksOf.set(id, []);
      hooksOf.get(id).push(h);
    }
  }

  const ctx = {
    U, regions, clusters, byId, graph, origin, user, clusterMembers, akaOf, hooksOf, aliases,
    version: graph.meta.version,
    updated: String(graph.meta.generated).slice(0, 10),
    nodeCount: graph.nodes.length,
  };

  // 出入边索引
  const rel = new Map();
  for (const n of graph.nodes) rel.set(n.id, { in: [], out: [] });
  for (const e of graph.edges) {
    const { from, to } = endsOf(e);
    for (const s of from) if (rel.has(s)) rel.get(s).out.push(e);
    for (const t of to) if (rel.has(t)) rel.get(t).in.push(e);
  }

  const pages = [];
  let bytes = 0;
  for (const n of graph.nodes) {
    const html = nodePage(n, rel.get(n.id) || { in: [], out: [] }, ctx);
    pages.push({ rel: 'nodes/' + n.id + '.html', html });
    bytes += Buffer.byteLength(html, 'utf8');
  }

  const all = allPage(ctx);
  pages.push({ rel: 'all.html', html: all });
  bytes += Buffer.byteLength(all, 'utf8');

  const questions = questionsPage(ctx);
  pages.push({ rel: 'questions.html', html: questions });
  bytes += Buffer.byteLength(questions, 'utf8');

  // 孤立点：既没有入边也没有出边的节点（内链网里的死胡同）
  const orphan = graph.nodes.filter((n) => {
    const r = rel.get(n.id);
    return r.in.length === 0 && r.out.length === 0;
  }).map((n) => n.id);

  return {
    pages,
    stats: {
      nodes: graph.nodes.length,
      total: pages.length,
      bytes,
      avgBytes: Math.round(bytes / pages.length),
      orphan: orphan.length,
      orphanSample: orphan.slice(0, 8),
    },
    mathErrors,
  };
}

/* 直接跑时：给一个预览目录，方便截图与肉眼看（bun tools/sitepages.mjs） */
if (import.meta.main) {
  const dist = path.join(ROOT, 'dist');
  const g = JSON.parse(fs.readFileSync(path.join(dist, 'graph.json'), 'utf8'));
  const origin = 'https://bingyingzizz.github.io';
  const { pages, stats, mathErrors } = buildSitePages(g, { origin, user: 'bingyingzizz' });

  const outDir = path.join(dist, '_sitepages');
  fs.rmSync(outDir, { recursive: true, force: true });
  for (const p of pages) {
    const f = path.join(outDir, 'mathgalaxy', p.rel);
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, p.html, 'utf8');
  }
  // 预览也要有样式与 KaTeX 字体，否则截图里是一片裸 HTML
  const assetDst = path.join(outDir, 'assets');
  fs.mkdirSync(assetDst, { recursive: true });
  for (const f of fs.readdirSync(path.join(ROOT, 'site', 'assets'))) {
    fs.copyFileSync(path.join(ROOT, 'site', 'assets', f), path.join(assetDst, f));
  }
  for (const f of ['katex.min.js', 'katex.min.css']) {
    fs.copyFileSync(path.join(ROOT, 'src', 'ui', f), path.join(assetDst, f));
  }
  const fontDst = path.join(assetDst, 'fonts');
  fs.mkdirSync(fontDst, { recursive: true });
  for (const f of fs.readdirSync(path.join(ROOT, 'src', 'ui', 'fonts'))) {
    if (f.endsWith('.woff2')) fs.copyFileSync(path.join(ROOT, 'src', 'ui', 'fonts', f), path.join(fontDst, f));
  }
  console.log(`概念页：${stats.nodes} 个节点 → ${stats.total} 个 HTML`);
  console.log(`体积：${(stats.bytes / 1048576).toFixed(1)} MB，平均 ${(stats.avgBytes / 1024).toFixed(1)} KB/页`);
  console.log(`孤立点（无入边也无出边）：${stats.orphan}  ${stats.orphanSample.join(' ')}`);
  console.log(`公式渲染失败：${mathErrors.length}`);
  for (const e of mathErrors.slice(0, 10)) console.log('   ✗', e.mode, '|', e.msg, '|', e.tex.slice(0, 90));
  console.log(`预览目录：${outDir}`);
}
