/* ==========================================================================
   数学星图 · 外部内容包加载器（为「GitHub 多端同步 / PDF 笔记导入」预留）
   --------------------------------------------------------------------------
   页面里写死的 packs（src/data/packs/*.js）是「本地内容」；
   这里负责把「外部内容」也并进来，二者的数据结构完全一样：

     外部目录结构（默认 src/data/external/）：
       external/
         index.json          ← 内容包清单 { "packs": ["my-notes.json", ...] }
         my-notes.json       ← { "name": "…", "nodes": [...], "edges": [...] }

   用 file:// 直接打开网页时浏览器会禁止 fetch，此时静默跳过（不影响使用）；
   想要多端同步 / 导入 PDF 笔记，用本地服务器打开即可：
       python -m http.server 8000      →  http://localhost:8000
   ========================================================================== */
(function (global) {
  'use strict';
  var MG = (global.MG = global.MG || {});

  var DEFAULT_BASE = 'src/data/external/';

  function fetchJSON(url) {
    if (typeof fetch !== 'function') return Promise.resolve(null);
    return fetch(url, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) return null;
      return r.json();
    }).catch(function () { return null; });
  }

  /**
   * 尝试加载外部内容包。
   * @returns {Promise<{packs: Array, base: string, loaded: number}>}
   */
  function loadExternal(base) {
    base = base || DEFAULT_BASE;
    return fetchJSON(base + 'index.json').then(function (manifest) {
      if (!manifest || !manifest.packs || !manifest.packs.length) {
        return { packs: [], base: base, loaded: 0 };
      }
      return Promise.all(manifest.packs.map(function (f) {
        return fetchJSON(base + f).then(function (p) {
          if (!p) return null;
          p.name = p.name || f;
          return p;
        });
      })).then(function (list) {
        var packs = list.filter(Boolean);
        return { packs: packs, base: base, loaded: packs.length };
      });
    }).catch(function () {
      return { packs: [], base: base, loaded: 0 };
    });
  }

  /** 把任意 JSON 对象当作一个内容包校验（供将来的导入功能使用） */
  function validatePack(p) {
    var errs = [];
    if (!p || typeof p !== 'object') return { ok: false, errs: ['不是对象'] };
    if (!Array.isArray(p.nodes)) errs.push('缺少 nodes 数组');
    if (p.edges && !Array.isArray(p.edges)) errs.push('edges 必须是数组');
    (p.nodes || []).forEach(function (n, i) {
      if (!n.id) errs.push('第 ' + i + ' 个节点缺少 id');
      if (!n.label && !n.title) errs.push('节点 ' + n.id + ' 缺少 label/title');
    });
    return { ok: errs.length === 0, errs: errs };
  }

  MG.loader = {
    loadExternal: loadExternal,
    validatePack: validatePack,
    DEFAULT_BASE: DEFAULT_BASE
  };
})(typeof window !== 'undefined' ? window : globalThis);
