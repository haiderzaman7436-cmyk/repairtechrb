const fs = require('fs');
const path = require('path');

const codeFilePath = 'src/pages/ShopMacBookKeyboards.tsx';
const imgDir = 'public/images/macbook-parts-keyboards';

let content = fs.readFileSync(codeFilePath, 'utf8');

const match = content.match(/const initialProducts = (\[[\s\S]*?\]);/);
if (!match) {
    console.error("Could not find initialProducts array");
    process.exit(1);
}

let products;
try {
    products = eval(match[1]);
} catch (e) {
    console.error("Error evaluating array", e);
    process.exit(1);
}

let missingImages = [];
let replacedContent = content;
let renameOperations = [];

function getBaseFilename(urlPath) {
    const base = urlPath.split('?')[0];
    return path.basename(base);
}

products.forEach((product, index) => {
    const seq = index + 1;
    const newFilename = `${seq}.webp`;
    const newImagePath = `/images/macbook-parts-keyboards/${newFilename}`;
    
    const originalImagePath = product.image;
    const oldFilename = getBaseFilename(originalImagePath);
    const oldFilePath = path.join(imgDir, oldFilename);
    const newFilePath = path.join(imgDir, newFilename);
    
    if (fs.existsSync(oldFilePath)) {
        if (oldFilename !== newFilename) {
            renameOperations.push({ oldFilePath, newFilePath });
        }
    } else if (!fs.existsSync(newFilePath)) {
        missingImages.push({
            seq,
            title: product.title,
            expectedOldFile: oldFilename
        });
    }
    
    const regex = new RegExp(`['"]${originalImagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
    replacedContent = replacedContent.replace(regex, `"${newImagePath}"`);
});

renameOperations.forEach(op => {
    console.log(`Renaming ${path.basename(op.oldFilePath)} -> ${path.basename(op.newFilePath)}`);
    fs.renameSync(op.oldFilePath, op.newFilePath);
});

fs.writeFileSync(codeFilePath, replacedContent);

console.log("\nMISSING IMAGES:");
missingImages.forEach(m => {
    console.log(`${m.seq}.webp : ${m.title}`);
});
