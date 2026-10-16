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
  MG.applyStatic = applyStatic;
  MG.setLang = set;
  MG.LANG_KEY = KEY;
})(window);
