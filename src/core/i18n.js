/* ==========================================================================
   数学星图 · 界面语言（T2.4）
   --------------------------------------------------------------------------
   这里只管**界面外壳**：按钮、分区标题、悬停提示、占位符、状态文案。
   ⛔ 数学内容不走这里 —— 节点名走 label_en / title_en（src/data/i18n.js），
      星团名走 clusters.js 的 en 字段，星系名走 regions.js 的 en 字段。

   为什么查表用**中文原文当键**：
     · 调用点读起来就是中文，一眼知道那句是什么（t('图例')）；
     · 缺键自动回落中文 —— 永远不会显示出一个 key 或空白；
     · ⛔ 不发明第二套键名（那会变成又一份要同步的东西）。

   语言从哪来（与阅读页 `site/read.html` 同一套约定）：
     ① URL `?lang=en` / `?lang=zh`（会记进 localStorage）
     ② localStorage `mathgalaxy.read.lang`（阅读页记的，两边共用）
     ③ navigator.language 以 en 开头
   默认中文 —— ⭐ **没 JS 时页面是中文**，与英文文档「没有英文版就按中文读」同一条规矩。

   静态文案（index.html 里写死的那几块）用属性标注，加载时一次性填：
     data-t 文本 / data-t-title 悬停 / data-t-aria aria-label / data-t-ph 占位符
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = global.MG = global.MG || {};
  var KEY = 'mathgalaxy.read.lang';

  function detect() {
    var search = (global.location && global.location.search) || '';
    var m = /[?&]lang=(en|zh)\b/.exec(search);
    if (m) { try { global.localStorage.setItem(KEY, m[1]); } catch (e) {} return m[1]; }
    try {
      var v = global.localStorage.getItem(KEY);
      if (v === 'en' || v === 'zh') return v;
    } catch (e) {}
    var nav = (global.navigator && (global.navigator.language || global.navigator.userLanguage)) || '';
    return /^en\b/i.test(nav) ? 'en' : 'zh';
  }

  var lang = detect();

  /** t('中文原文', {占位符: 值}) —— 英文模式查表，缺键回落中文 */
  function t(s, params) {
    var out = s;
    if (lang === 'en') {
      var tbl = (MG.uiEn && MG.uiEn.strings) || null;
      if (tbl && Object.prototype.hasOwnProperty.call(tbl, s)) out = tbl[s];
    }
    if (params) {
      out = String(out).replace(/\{([^{}]+)\}/g, function (all, k) {
        return Object.prototype.hasOwnProperty.call(params, k) ? String(params[k]) : all;
      });
    }
    return out;
  }

  /** 数字按语言格式化：中文 1.2 万 / 英文 12.3k —— 目前只用于计数，先统一千分位 */
  function num(n) {
    if (lang !== 'en') return String(n);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /** 节点显示名：英文模式优先 label_en → title_en → 中文 label */
  function labelOf(n) {
    if (!n) return '';
    if (lang === 'en') return n.label_en || n.title_en || n.label || n.id;
    return n.label || n.id;
  }
  /** 节点正式名（面板大标题用）：英文模式优先 title_en → label_en → 中文 title */
  function titleOf(n) {
    if (!n) return '';
    if (lang === 'en') return n.title_en || n.label_en || n.title || n.label || n.id;
    return n.title || n.label || n.id;
  }
  /** 概念名（正文里的指代）：跟着 labelOf 走 */
  function nameOf(idOrNode, graph) {
    var n = typeof idOrNode === 'string' ? (graph && graph.byId && graph.byId[idOrNode]) : idOrNode;
    if (!n) return typeof idOrNode === 'string' ? idOrNode : '';
    return labelOf(n);
  }
  function clusterName(c) { return !c ? '' : (lang === 'en' ? (c.en || c.name) : c.name); }
  function regionName(r) { return !r ? '' : (lang === 'en' ? (r.en || r.name) : r.name); }

  /** index.html 里写死的静态文案：一次性按属性填 */
  function applyStatic(root) {
    var el = root || (global.document && global.document.body);
    if (!el || !el.querySelectorAll) return 0;
    var n = 0, all = el.querySelectorAll('[data-t],[data-t-title],[data-t-aria],[data-t-ph]');
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (e.hasAttribute('data-t')) { e.textContent = t(e.getAttribute('data-t')); n++; }
      if (e.hasAttribute('data-t-title')) { e.setAttribute('title', t(e.getAttribute('data-t-title'))); n++; }
      if (e.hasAttribute('data-t-aria')) { e.setAttribute('aria-label', t(e.getAttribute('data-t-aria'))); n++; }
      if (e.hasAttribute('data-t-ph')) { e.setAttribute('placeholder', t(e.getAttribute('data-t-ph'))); n++; }
    }
    return n;
  }

  /** ⭐ 画布上的显示名：**启动时算一次**，渲染循环直接读 `labelShow` / `nameShow`。
      ⛔ 别在每帧里调 labelOf —— 那是往每帧 4.2ms（240Hz）的预算里塞一次查表。
      ⚠️ 名字只在**建图之后、开始画之前**定一次；换语言走的是整页重载（见 app.js 的 switchLang），
         所以不存在「画到一半换语言」的情况。 */
  function localizeDisplay(graph) {
    if (!graph) return 0;
    var n = 0;
    (graph.nodes || []).forEach(function (x) { x.labelShow = labelOf(x); n++; });
    (graph.clusters || []).forEach(function (c) { c.nameShow = clusterName(c); });
    (graph.regions || []).forEach(function (r) { r.nameShow = regionName(r); });
    return n;
  }

  /* ---------------------------------------------- 英文旁挂内容的逐条状态 */
  /* 作者 2026-10-16 拍板（决策二.3）：审校状态**逐条**判定，不再整份一个 status。
     每条英文记录自带：
       status   'draft' | 'reviewed'  —— 人写的那个开关（作者审过才改 reviewed）
       basedOn  'v0.9.0#a1b2c3d4'     —— 底稿标识：内容版本 + 中文原文指纹
       reviewed { by, date }           —— 审校记录（status='reviewed' 时才有）
     ⭐ stale 是**算出来**的，两个来源任一不符即 stale：
       ① 内容版本对不上（tools/ids.snapshot.json 的 vX.Y.Z）；
       ② 中文底稿的指纹对不上（说明这句话本身被改过了）。
     ⛔ 判定只有这一处实现（tools/build.mjs 也调这一个函数），
        免得「网页说 draft、构建说 stale」两处漂。 */

  /** 中文指纹：把空白折叠后取 FNV-1a 32 位（8 位十六进制）。
      ⚠️ 只用它判「底稿变没变」——不是签名、不是加密。
      ⚠️ 空白折叠是**故意的**：`$g K$` 与 `$gK$` 这种纯排版微调不该让整段译文作废。 */
  function zhHash(s) {
    var t = String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
    var h = 0x811c9dc5;
    for (var i = 0; i < t.length; i++) {
      h ^= t.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }

  /** 一条英文记录的逐字段状态 → 'reviewed' | 'stale' | 'draft'
      @param rec    英文记录（{status, basedOn}）
      @param zhText 它的中文底稿（算指纹用）；给 null 就只比内容版本 */
  function enFieldStatus(rec, zhText) {
    if (!rec) return null;
    var base = String(rec.basedOn || '');
    var m = /^([^#]*)(?:#(.*))?$/.exec(base) || [];
    var ver = m[1] || '', hash = m[2] || '';
    /* ⚠️ `MG.contentVersion === 'dev'` = 这是**仓库源码里的 index.html**（构建才会把
       真版本号写进 dist/mathgalaxy.html）⇒ 版本这一条判不了，就不判：
       只靠指纹。⛔ 别在这里把 'dev' 当成「版本变了」—— 那会让双击源码页时
       满屏 stale（假的），而真检查（中文底稿有没有改）指纹那条照样在跑。 */
    var cv = MG.contentVersion;
    if (ver && cv && cv !== 'dev' && ver !== cv) return 'stale';
    if (hash && zhText != null && hash !== zhHash(zhText)) return 'stale';
    return rec.status === 'reviewed' ? 'reviewed' : 'draft';
  }

  /** 换语言（目前只有「载入时定」，没有运行时热切换 —— 免得半个界面是英文） */
  function set(next) {
    if (next !== 'en' && next !== 'zh') return;
    lang = next;
    try { global.localStorage.setItem(KEY, next); } catch (e) {}
  }

  MG.lang = lang;
  MG.isEn = lang === 'en';
  MG.t = t;
  MG.num = num;
  MG.labelOf = labelOf;
  MG.titleOf = titleOf;
  MG.nameOf = nameOf;
  MG.clusterName = clusterName;
  MG.regionName = regionName;
  MG.localizeDisplay = localizeDisplay;
  MG.zhHash = zhHash;
  MG.enFieldStatus = enFieldStatus;
  MG.applyStatic = applyStatic;
  MG.setLang = set;
  MG.LANG_KEY = KEY;
})(window);
