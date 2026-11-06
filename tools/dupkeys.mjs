// 扫描 src/data/packs/*.js 中同一对象字面量里重复的键。
// 重复键在 JS 里静默覆盖前值，构建 / katex / 斜杠检查都抓不到。
// 用法：node tools/dupkeys.mjs  （有重复键时 exit 1）
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/data/packs');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
const problems = [];

for (const file of files) {
  const src = fs.readFileSync(path.join(dir, file), 'utf8');
  const n = src.length;
  const stack = [];
  let i = 0;
  let lastSig = '';
  let line = 1;
  const lineOf = (idx) => src.slice(0, idx).split('\n').length;

  while (i < n) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') {
      i += 2;
      while (i < n && src[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i + 1 < n && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] === '\n') line++;
        i++;
      }
      i = Math.min(n, i + 2);
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      const q = c;
      i++;
      while (i < n) {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === q) { i++; break; }
        if (src[i] === '\n') line++;
        i++;
      }
      lastSig = 'str';
      continue;
    }
    if (c === '\n') { line++; i++; continue; }
    if (/\s/.test(c)) { i++; continue; }
    if (c === '{') {
      stack.push({ type: 'obj', keys: new Map(), line });
      lastSig = '{'; i++; continue;
    }
    if (c === '[') {
      stack.push({ type: 'arr' });
      lastSig = '['; i++; continue;
    }
    if (c === '}' || c === ']') {
      stack.pop();
      lastSig = c; i++; continue;
    }
    const prev = lastSig;
    if (/[A-Za-z_$]/.test(c)) {
      const start = i;
      i++;
      while (i < n && /[A-Za-z0-9_$]/.test(src[i])) i++;
      const word = src.slice(start, i);
      let j = i;
      while (j < n && /[ \t\r\n]/.test(src[j])) j++;
      if (src[j] === ':' && (prev === '{' || prev === ',')) {
        const top = stack[stack.length - 1];
        if (top && top.type === 'obj') {
          if (top.keys.has(word)) {
            problems.push({ file, key: word, line: lineOf(start), first: top.keys.get(word) });
          } else {
            top.keys.set(word, lineOf(start));
          }
        }
        i = j + 1;
        lastSig = ':';
        continue;
      }
      lastSig = 'id';
      continue;
    }
    lastSig = c;
    i++;
  }
}

if (!problems.length) {
  console.log('未发现同一对象内的重复键');
  process.exit(0);
}
console.error(`发现 ${problems.length} 处重复键：`);
for (const p of problems) console.error(`${p.file}:${p.line} 重复键 ${p.key}（首次 ${p.first} 行）`);
process.exit(1);
