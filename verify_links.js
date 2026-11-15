const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

const results = [];
lines.forEach((line, idx) => {
  if (line.includes('href=') && /facebook|twitter|instagram|linkedin|youtube/i.test(line)) {
    const isBlank = line.includes('target="_blank"');
    const isRel = line.includes('rel="noopener noreferrer"');
    results.push({ line: idx + 1, text: line.trim(), isBlank, isRel });
  }
});

console.log('Total verified social links:', results.length);
results.forEach(r => {
  console.log(`L${r.line}: blank=${r.isBlank}, rel=${r.isRel} -> ${r.text}`);
});

