const fs = require('fs');

const macContent = fs.readFileSync('src/pages/ShopMacBookKeyboards.tsx', 'utf8');
const match = macContent.match(/const initialProducts = (\[[\s\S]*?\]);/);
let macProducts = eval(match[1]);

let allContent = fs.readFileSync('src/data/allProducts.ts', 'utf8');
const allMatch = allContent.match(/const allProducts = (\[[\s\S]*?\]);/);
let allProducts = eval(allMatch[1]);

let updated = 0;
macProducts.forEach(mp => {
    let p = allProducts.find(x => x.id === mp.id);
    if (p && p.image !== mp.image) {
        p.image = mp.image;
        updated++;
    }
});

const newArrString = JSON.stringify(allProducts, null, 2);
const newAllContent = allContent.replace(/const allProducts = \[[\s\S]*?\];/, 'const allProducts = ' + newArrString + ';');
fs.writeFileSync('src/data/allProducts.ts', newAllContent);
console.log('Updated ' + updated + ' by ID in allProducts.ts');
