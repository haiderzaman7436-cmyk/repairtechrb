const fs = require('fs');
const path = require('path');

let allProductsContent = fs.readFileSync('src/data/allProducts.ts', 'utf8');
const shopDir = 'src/pages';
const shopFiles = fs.readdirSync(shopDir).filter(f => f.startsWith('Shop') && f.endsWith('.tsx'));

let imageMapping = {}; // key: title, value: image

shopFiles.forEach(file => {
    const content = fs.readFileSync(path.join(shopDir, file), 'utf8');
    const match = content.match(/const initialProducts\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        try {
            // Using a simple regex to extract title and image is safer than eval
            const items = match[1].match(/{[^}]+}/g);
            if (items) {
                items.forEach(item => {
                    const titleMatch = item.match(/['"]?title['"]?\s*:\s*['"](.*?)['"]/);
                    const imageMatch = item.match(/['"]?image['"]?\s*:\s*['"](.*?)['"]/);
                    if (titleMatch && imageMatch) {
                        imageMapping[titleMatch[1].trim()] = imageMatch[1];
                    }
                });
            }
        } catch(e) {
            console.error(e);
        }
    }
});

let updatedCount = 0;
const lines = allProductsContent.split('\n');
const newLines = lines.map(line => {
    const titleMatch = line.match(/['"]?title['"]?\s*:\s*['"](.*?)['"]/);
    const imageMatch = line.match(/['"]?image['"]?\s*:\s*['"](.*?)['"]/);
    if (titleMatch && imageMatch) {
        const title = titleMatch[1].trim();
        const oldImage = imageMatch[1];
        if (imageMapping[title] && imageMapping[title] !== oldImage) {
            line = line.replace(oldImage, imageMapping[title]);
            updatedCount++;
        }
    }
    return line;
});

fs.writeFileSync('src/data/allProducts.ts', newLines.join('\n'));
console.log('Updated ' + updatedCount + ' images in allProducts.ts');
