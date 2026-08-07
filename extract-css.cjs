const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\haide\\.gemini\\antigravity-ide\\brain\\0780560d-923a-4f61-b7d4-3ccbf0d26074\\.system_generated\\steps\\46\\content.md', 'utf-8');
const lines = content.split('\n');
const startIndex = lines.findIndex(l => l.trim() === '---') + 1;
// Strip line numbers e.g. "9: /* ..." -> "/* ..."
const cssLines = lines.slice(startIndex).map(l => l.replace(/^\d+:\s?/, ''));
fs.writeFileSync('src/index.css', cssLines.join('\n'));
console.log('CSS extracted');
