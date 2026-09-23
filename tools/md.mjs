/* ==========================================================================
   极简 Markdown → HTML —— **构建期**用，只服务个人站点的「阅读页」
   --------------------------------------------------------------------------
   为什么另写一个，不复用 src/core/util.js 的 MG.util.md()：
     那个是**节点面板**用的（`##` 一律渲染成 <h5>、段落硬折行），
     这个是**整篇文档**用的（`#` 是页面大标题、`##` 是章节标题、要分栏要目录）。
     两边需求不同，各自演化；别为了「统一」把其中一个掰弯。

   支持（刻意只支持文档里真用到的）：
     # 一级标题（第一行 → 页面标题，不出现在正文里）
     ## / ### 章节标题
     - 无序列表 / 1. 有序列表（带缩进续行）
     > 引用 / ``` 围栏代码块
     **粗** *斜* `行内代码`
     裸 URL 自动成链
     `- **6** \`id\` 名字 · layer 9 · 团名` 这样的行会被识别成**榜单条目**
     （hubs.md 用的格式），渲染成带名次徽章与相对长度条的列表。

   ⚠️ 与 src/data/ 的内容无关：这里只吃 dist/ 里已经生成好的 .md/.txt。
   ========================================================================== */

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const CJK = /[\u3000-\u303f\u3400-\u9fff\uff00-\uffef]/;

export function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ESC[c]);
}

/* ------------------------------------------------------------------ 行内 */
/**
 * 行内语法 → HTML。
 *
 * 顺序不能乱：代码片 → 链接 → 转义 → 粗斜体 → 把占位符换回来。
 * 先摘占位符是为了让「转义」和「粗斜体」不去动已经生成的标签/URL；
 * \u0000 是它们碰不到的字符，占位符里只放数字，粗体正则也吃不掉。
 */
function inline(src) {
  const slots = [];
  const keep = (html) => '\u0000' + (slots.push(html) - 1) + '\u0000';

  // 文档里用 \` 转义了一个反引号（想显示真的反引号），先换走再摘代码片
  let t = String(src).replace(/\\`/g, '\u0001');

  t = t.replace(/`([^`]+)`/g, (m, code) =>
    keep('<code>' + esc(code.replace(/\u0001/g, '`')) + '</code>'));

  // 裸 URL：末尾的中英文标点不算进链接里
  t = t.replace(/https?:\/\/[^\s<>"'）】]+/g, (u) => {
    const tail = u.match(/[.,;:!?)\]}，。；：！？）】]+$/);
    const clean = tail ? u.slice(0, -tail[0].length) : u;
    return keep('<a href="' + esc(clean) + '" target="_blank" rel="noopener">' + esc(clean) + '</a>')
      + (tail ? tail[0] : '');
  });

  t = esc(t);

  // 粗体：内容里允许单个 *（μ*、(L^p)* 这类记号），只把 ** 当定界符
  t = t.replace(/\*\*((?:[^*]|\*(?!\*))+?)\*\*/g, '<strong>$1</strong>');
  // 斜体：保守 —— 两侧要是空白或句读，免得把 u* 这类记号吃成斜体
  t = t.replace(/(^|[\s(（])\*([^*\s][^*]*?)\*(?=$|[\s)）.,，。；;:：])/g, '$1<em>$2</em>');

  return t.replace(/\u0000(\d+)\u0000/g, (m, i) => slots[+i]);
}

/** 段内软换行：中文接中文不加空格，其它情况补一个空格（CommonMark 的行为） */
function joinLines(lines) {
  let out = '';
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) continue;
    if (!out) { out = l; continue; }
    const a = out.slice(-1);
    const b = l[0];
    out += (CJK.test(a) && CJK.test(b)) ? l : ' ' + l;
  }
  return out;
}

/* ------------------------------------------------------------------ 块级 */

/** 收一个列表。返回 [条目原文数组, 下一条要读的行号] */
function takeList(lines, start, itemRe) {
  const items = [];
  let cur = null;
  let i = start;
  while (i < lines.length) {
    const line = lines[i];
    if (itemRe.test(line)) { if (cur !== null) items.push(cur); cur = line.replace(itemRe, ''); i++; continue; }
    if (!line.trim()) {
      // 列表内的空行：只有当下一行是「缩进的续行」时，才算这个列表还没完
      const nx = lines[i + 1];
      if (cur !== null && nx !== undefined && /^\s+\S/.test(nx)) { cur += '\n'; i++; continue; }
      break;
    }
    if (cur !== null && /^\s+\S/.test(line)) { cur += '\n' + line; i++; continue; }
    break;
  }
  if (cur !== null) items.push(cur);
  return [items, i];
}

/** 榜单条目（hubs.md）：`**6** \`id\` 名字 · layer 9 · 团名` */
const RANK_RE = /^\s*\*\*(\d+)\*\*\s+([\s\S]+)$/;

function renderList(items, ordered) {
  const ranks = items.map((it) => it.trim().match(RANK_RE));
  if (ranks.every(Boolean) && ranks.length > 1) {
    const max = Math.max(...ranks.map((r) => +r[1]));
    const lis = ranks.map((r) => {
      const parts = r[2].split(' · ');
      const head = inline(parts.shift());
      const meta = parts.map((p) => '<span class="meta">' + inline(p) + '</span>').join('');
      const w = (Number(r[1]) / max).toFixed(3);
      return '<li class="rank" style="--w:' + w + '">' +
        '<span class="rank-n">' + r[1] + '</span>' +
        '<span class="rank-b">' + head + meta + '</span></li>';
    });
    return '<ol class="ranks">' + lis.join('') + '</ol>';
  }
  const lis = items.map((it) => '<li>' + inline(joinLines(it.split('\n'))) + '</li>');
  return '<' + (ordered ? 'ol' : 'ul') + '>' + lis.join('') + '</' + (ordered ? 'ol' : 'ul') + '>';
}

/**
 * 整篇文档 → { title, html }
 * `title` 取第一行 `# ...`；正文里不再重复它（页面上由 <h1> 单独承担）。
 * 其余每个顶层块都带 class="stag"，供阅读页做**逐条错峰进场**。
 */
export function renderDoc(text) {
  const lines = String(text == null ? '' : text).replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let title = '';
  let para = [];
  let i = 0;

  const flush = () => {
    if (!para.length) return;
    out.push('<p class="stag">' + inline(joinLines(para)) + '</p>');
    para = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { flush(); i++; continue; }

    // 围栏代码块
    if (/^\s*```/.test(line)) {
      flush();
      const buf = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push('<pre class="stag"><code>' + esc(buf.join('\n')) + '</code></pre>');
      continue;
    }

    // 标题
    const h = line.match(/^(#{1,6})\s+(.*\S)\s*$/);
    if (h) {
      flush();
      const lvl = h[1].length;
      if (lvl === 1 && !title) { title = h[2]; i++; continue; }
      const tag = lvl <= 2 ? 2 : lvl === 3 ? 3 : 4;
      out.push('<h' + tag + ' class="stag">' + inline(h[2]) + '</h' + tag + '>');
      i++;
      continue;
    }

    // 引用
    if (/^\s*>\s?/.test(line)) {
      flush();
      const quote = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^\s*>\s?/, ''));
      out.push('<blockquote class="stag">' + inline(joinLines(quote)) + '</blockquote>');
      continue;
    }

    // 列表
    if (/^\s*[-*+]\s+/.test(line)) {
      flush();
      const [items, next] = takeList(lines, i, /^\s*[-*+]\s+/);
      out.push('<div class="stag">' + renderList(items, false) + '</div>');
      i = next;
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      flush();
      const [items, next] = takeList(lines, i, /^\s*\d+[.)]\s+/);
      out.push('<div class="stag">' + renderList(items, true) + '</div>');
      i = next;
      continue;
    }

    para.push(line);
    i++;
  }
  flush();

  return { title, html: out.join('\n') };
}
