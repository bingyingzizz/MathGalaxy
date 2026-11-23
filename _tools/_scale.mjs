import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('dist/graph.json', 'utf8'));
console.log('顶层键:', Object.keys(d).join(', '));
console.log('meta:', JSON.stringify(d.meta && d.meta.counts || d.meta || {}).slice(0, 200));
console.log('nodes:', (d.nodes || []).length, ' edges:', (d.edges || []).length);
