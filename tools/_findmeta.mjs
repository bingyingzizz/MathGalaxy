// 列出**渲染字段里**的过程性说明（笔记/原稿/本人/确认/转写/存疑/字迹/VLM），
// 排除源码注释行（/* … */ 里那些）
import fs from "node:fs";
import path from "node:path";
const DIR = "H:/MathGalaxy/src/data/packs";
const PAT = /笔记|原稿|本人|确认|转写|存疑|字迹|VLM|手写|原书|书上|Le Stum/;
const files = fs.readdirSync(DIR).filter(f => f.endsWith(".js")).sort();
let n = 0;
for (const f of files) {
  const lines = fs.readFileSync(path.join(DIR, f), "utf8").split(/\r?\n/);
  let inComment = false;
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    if (/\/\*/.test(L)) inComment = true;
    if (/\*\//.test(L)) { inComment = false; continue; }
    if (inComment) continue;
    if (/^\s*(\/\/|\*|refs:)/.test(L)) continue;
    if (!PAT.test(L)) continue;
    n++;
    console.log(`${f}:${i + 1}`);
    console.log(`   ${L.trim().slice(0, 230)}`);
  }
}
console.log(`\n渲染字段里的过程性说明合计 ${n} 处`);
