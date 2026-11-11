/* ==========================================================================
   数学星图 · 布局预计算（构建期）
   --------------------------------------------------------------------------
   为什么：`MG.computeLayout` 在**没有缓存**的客户端要跑 6~7 秒（1620 点）。
   布局是确定性的（固定 seed、与视口无关），所以可以在构建时算一次、把坐标
   随产物发出去 —— 用户首次打开直接读坐标，不再冷算。

   产物 `dist/layout.json`：
     {
       v: 1,
       sig: "1620:xxxx",            // ← 与 src/core/layoutcache.js 的 signature() 同一口径
       counts: { nodes, regions, clusters },
       nodes: { "<id>": [x, y] },   // 取整，与 localStorage 缓存同口径
       r: [[cx,cy,nameX,nameY,count,radius] | null, ...],   // 星系 stat
       c: [[cx,cy,count,radius] | null, ...]                // 星团 stat
     }

   三条纪律：
     1. **签名只有一份口径** —— 直接调 `MG.layoutCache.signature(graph)`，不在这里重写。
        内容版本 / 节点顺序 / 团归属 / 星系基准中心 / config.layout|cluster|background
        任一变化 ⇒ 客户端签名对不上 ⇒ 自动退回冷算（或构建期报错）。
     2. **产物必须可复现**：不写时间戳、坐标取整、键顺序固定。同一内容重复构建，
        文件字节相同（`dist/` 纳入 git，不能让 build 无缘无故弄脏工作区）。
     3. **构建期硬门**：写完后必须重新读回来校验；缺文件 / 签名不符 ⇒ 抛错，
        绝不静默发布一个没有预计算布局的包。

   ⚠️ 客户端不需要这个文件也能开（localStorage 缓存 + 冷算都在）。它只是让
   「第一次打开」不再等 6~7 秒。
   ========================================================================== */
import fs from 'node:fs';
import path from 'node:path';

export const PRELAYOUT_V = 1;
export const LAYOUT_FILE = 'layout.json';

/** 与 `MG.computeLayout` 的产物**逐位一致**：坐标存原始 double，不取整。
    为什么不像 localStorage 那样取整：预计算布局是「这一次构建算出来的坐标」，
    客户端命中后应当与冷算结果完全相同（取整会引入 ±0.5 世界单位的漂移，
    虽然看不出来，但会让「逐点比对」这个验收判据失去意义）。
    JSON.stringify 的数字是 round-trip 精确的，解析回来就是同一个 double。 */
export function buildPayload(MG, graph) {
  if (!MG || !MG.layoutCache || typeof MG.layoutCache.signature !== 'function') {
    throw new Error('prelayout：MG.layoutCache.signature 不在 —— loadMG 的文件清单里漏了 core/layoutcache.js？');
  }
  const nodes = {};
  for (const n of graph.nodes) {
    if (typeof n.x !== 'number' || typeof n.y !== 'number' ||
        !isFinite(n.x) || !isFinite(n.y)) {
      throw new Error(`prelayout：节点 ${n.id} 没有有限坐标（computeLayout 没跑？）`);
    }
    nodes[n.id] = [n.x, n.y];
  }
  const r = graph.regions.map((reg) => {
    const s = reg.stat;
    return s ? [s.cx, s.cy, s.nameX, s.nameY, s.count, s.radius] : null;
  });
  const c = graph.clusters.map((cl) => {
    const s = cl.stat;
    return s ? [s.cx, s.cy, s.count, s.radius] : null;
  });
  return {
    v: PRELAYOUT_V,
    sig: MG.layoutCache.signature(graph),
    counts: { nodes: graph.nodes.length, regions: graph.regions.length, clusters: graph.clusters.length },
    nodes,
    r,
    c
  };
}

/** 稳定序列化：键顺序由 buildPayload 固定，这里只做紧凑输出。 */
export function serializePayload(payload) {
  return JSON.stringify(payload);
}

const isNum = (v) => typeof v === 'number' && isFinite(v);

function validRows(rows, n, cols) {
  if (!Array.isArray(rows) || rows.length !== n) return false;
  for (let i = 0; i < n; i++) {
    const row = rows[i];
    if (row === null) continue;
    if (!Array.isArray(row) || row.length !== cols) return false;
    for (let j = 0; j < cols; j++) if (!isNum(row[j])) return false;
  }
  return true;
}

/**
 * 校验载荷与「当前这份图」是否一致。
 * 返回 { ok, problems[] }。problems 是给人看的短句（构建期直接打出来）。
 */
export function validatePayload(MG, graph, data) {
  const problems = [];
  if (!data || typeof data !== 'object') return { ok: false, problems: ['不是 JSON 对象'] };
  if (data.v !== PRELAYOUT_V) problems.push(`版本 v=${data.v}，期望 ${PRELAYOUT_V}`);
  if (typeof data.sig !== 'string' || !data.sig) problems.push('缺 sig');

  const sig = MG.layoutCache.signature(graph);
  if (data.sig !== sig) problems.push(`签名不符：文件 ${data.sig || '(空)'} ≠ 当前 ${sig}（内容或 config 变了，需要重建）`);

  if (!data.counts || data.counts.nodes !== graph.nodes.length ||
      data.counts.regions !== graph.regions.length ||
      data.counts.clusters !== graph.clusters.length) {
    problems.push(`counts 不符：文件 ${JSON.stringify(data.counts)} ≠ 当前 ` +
      `${graph.nodes.length}/${graph.regions.length}/${graph.clusters.length}`);
  }

  if (!data.nodes || typeof data.nodes !== 'object') {
    problems.push('缺 nodes 映射');
  } else {
    let bad = 0, missing = 0, mismatch = 0, firstMismatch = [];
    for (const n of graph.nodes) {
      const p = data.nodes[n.id];
      if (!Array.isArray(p)) { missing++; continue; }
      if (p.length !== 2 || !isNum(p[0]) || !isNum(p[1])) { bad++; continue; }
      /* ⭐ 逐点比对：坐标必须与这一轮 computeLayout 的结果**完全相同**（不是四舍五入后相同）。
         这条挡的是「签名没变、但文件里的坐标是上一次的」这类静默陈旧产物。 */
      if (p[0] !== n.x || p[1] !== n.y) {
        mismatch++;
        if (firstMismatch.length < 3) firstMismatch.push(n.id);
      }
    }
    if (mismatch) problems.push(mismatch + ' 个节点坐标与本轮布局不一致（例：' + firstMismatch.join('、') + '）');
    const extra = Object.keys(data.nodes).length - (graph.nodes.length - missing);
    if (missing) problems.push(`${missing} 个节点没有坐标`);
    if (bad) problems.push(`${bad} 个节点坐标不是有限数字`);
    if (extra > 0) problems.push(`多出 ${extra} 个不在图里的节点 id`);
  }

  if (!validRows(data.r, graph.regions.length, 6)) problems.push('r（星系 stat）形状/数值不对');
  if (!validRows(data.c, graph.clusters.length, 4)) problems.push('c（星团 stat）形状/数值不对');

  return { ok: problems.length === 0, problems };
}

/** 写 `dist/layout.json`，返回 { file, bytes, payload }。失败直接抛。 */
export function writeLayoutFile(MG, graph, distDir) {
  const payload = buildPayload(MG, graph);
  const text = serializePayload(payload);
  const file = path.join(distDir, LAYOUT_FILE);
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(file, text + '\n', 'utf8');
  return { file, bytes: Buffer.byteLength(text + '\n', 'utf8'), payload };
}

/**
 * 读回磁盘上的 `dist/layout.json` 并与当前图核对。**构建的最后一道门**。
 * 缺文件 / 坏 JSON / 签名不符 ⇒ 抛错（要求 3：不能静默发布没预计算的包）。
 */
export function assertLayoutFile(MG, graph, distDir) {
  const file = path.join(distDir, LAYOUT_FILE);
  if (!fs.existsSync(file)) {
    throw new Error(`prelayout：${path.relative(process.cwd(), file)} 不在 —— 构建没有写出预计算布局`);
  }
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { throw new Error(`prelayout：${LAYOUT_FILE} 不是合法 JSON：${e.message}`); }
  const { ok, problems } = validatePayload(MG, graph, data);
  if (!ok) {
    throw new Error('prelayout：预计算布局与当前图不符 ——\n  - ' + problems.join('\n  - ') +
      '\n  ⇒ 重跑 `bun tools/build.mjs`（如果刚改过 config/内容，这是预期的失效）');
  }
  return { file, bytes: fs.statSync(file).size, sig: data.sig, counts: data.counts };
}

/**
 * 把载荷内联进单文件 HTML。返回替换后的 html；找不到注入点时抛错
 * （宁可构建红，也不要发布一个「看起来有布局、其实没有」的单文件）。
 *
 * ⚠️ 阶段二（客户端接预计算）才用得上：现在 index.html 还没有
 * `window.MG_PRELAYOUT = null;` 占位符，所以调用它会按设计抛错。
 */
export function embedPreLayout(html, payload) {
  const text = serializePayload(payload).replace(/<\//g, '<\\/');
  const token = 'window.MG_PRELAYOUT = null;';
  if (!html.includes(token)) {
    throw new Error(`prelayout：index.html 里没有注入点 \`${token}\` —— 单文件无法内联布局`);
  }
  return html.replace(token, 'window.MG_PRELAYOUT = ' + text + ';');
}
