const fs = require('fs');
const allProductsFile = 'src/data/allProducts.ts';
const productsFile = 'C:/Users/haide/.gemini/antigravity-ide/brain/3dbb332f-cdee-4300-9b70-e5af362acd2f/scratch/products.json';

const newProducts = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
// Update image paths
newProducts.forEach(p => {
    p.image = p.image.replace('/images/gadget-screens/', '/image/');
});

const newJsonStr = newProducts.map(p => '  ' + JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')).join(',\n');

let allContent = fs.readFileSync(allProductsFile, 'utf8');
// Handle both CRLF and LF
allContent = allContent.replace(/  \}(\r?\n)\];\r?\n?$/, '  },\n' + newJsonStr + '\n];\n');
fs.writeFileSync(allProductsFile, allContent);
console.log('Done');
