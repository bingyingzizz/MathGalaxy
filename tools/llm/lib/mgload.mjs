/* 最小 loadMG：在 vm 里按 **index.html 的 <script> 顺序** 执行 src/data 脚本（生产的加载顺序），
   core 只取建图所需的最小集合。只读。
   与 tools/i18n-status.mjs / build.mjs 的 loadMG 同一思路；差异（它们手写文件表）由 inventory 的交叉核对报告。 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export const ROOT = path.resolve(import.meta.dirname, '..', '..', '..');
export const SRC = path.join(ROOT, 'src');
export const STATEMENTS_FILE = path.join(SRC, 'data', 'i18n', 'statements.en.js');
export const EDGE_NOTES_FILE = path.join(SRC, 'data', 'i18n', 'edge-notes.en.js');
export const ABSTRACTS_FILE = path.join(SRC, 'data', 'i18n', 'abstracts.en.js');

const CORE = ['core/config.js', 'core/util.js', 'core/i18n.js', 'core/graph.js', 'core/layout.js'];

/** index.html 里按出现顺序的 src/ 脚本（相对 src/） */
export function indexScripts(root = ROOT) {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const out = []; const re = /<script[^>]*\ssrc="(src\/[^"]+\.js)"/g; let m;
  while ((m = re.exec(html))) out.push(m[1].slice(4));
  return out;
}

export function loadMG(root = ROOT) {
  const src = path.join(root, 'src');
  const win = {
    MG: { contentVersion: null }, console,
    document: { createElement: () => ({ getContext: () => ({}), width: 0, height: 0 }),
      addEventListener() {}, getElementById: () => null },
    performance: { now: () => Date.now() }, requestAnimationFrame: () => 0, addEventListener() {},
  };
  win.window = win; win.self = win;
  const order = indexScripts(root);
  const data = order.filter(f => f.startsWith('data/') && fs.existsSync(path.join(src, f)));
  /* build.mjs 额外载入、但 index.html 不挂的数据文件（词表 / 缺口 / 英文文档）：只供盘点与构建口径一致 */
  const BUILD_ONLY = ['data/hypotheses.js', 'data/gaps.js', 'data/i18n/docs.en.js'].filter(f => !data.includes(f) && fs.existsSync(path.join(src, f)));
  const files = [...CORE, ...data, ...BUILD_ONLY];
  const ctx = vm.createContext(win);
  for (const rel of files) vm.runInContext(fs.readFileSync(path.join(src, rel), 'utf8'), ctx, { filename: rel });
  const MG = win.MG;
  MG.contentVersion = JSON.parse(fs.readFileSync(path.join(root, 'tools/ids.snapshot.json'), 'utf8')).version;
  const graph = MG.buildGraph(MG.packs || [], MG.regions || [], MG.clusters || []);
  return { MG, graph, version: MG.contentVersion, loaded: files, indexOrder: order, buildOnly: BUILD_ONLY };
}

export const HAN = /[一-鿿㐀-䶿]/;
/** 公式抽取：与 tools/build.mjs formulasOf 同一口径（块级优先）。 */
export function formulasOf(s) {
  const out = []; const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g; let m;
  while ((m = re.exec(String(s || '')))) out.push({ block: m[1] != null, tex: m[1] != null ? m[1] : m[2] });
  return out;
}
