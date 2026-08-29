const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'src/pages/ShopKeyboards.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Regex to replace the image path for each object in the initialProducts array
// The format is like: { id: 1, ... image: '/images/laptop-parts-keyboards/something.webp' }
// We can use a replacer function to capture the id and replace the image path
const updatedContent = content.replace(/({[^}]+id:\s*(\d+)[^}]+image:\s*')([^']+)('[^}]*})/g, (match, beforeImageStr, id, oldImagePath, afterImageStr) => {
  return beforeImageStr + `/images/laptop-parts-keyboards/${id}.webp` + afterImageStr;
});

fs.writeFileSync(filePath, updatedContent);
console.log('Successfully updated ShopKeyboards.tsx with new sequential WebP images.');
