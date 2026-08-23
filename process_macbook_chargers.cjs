const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const dir = 'public/images/macbook-parts-chargers';

if (!fs.existsSync(dir)) {
    console.error(`Directory ${dir} does not exist!`);
    process.exit(1);
}

const files = fs.readdirSync(dir);

async function convertAndDeploy() {
    let convertedCount = 0;
    
    for (const file of files) {
        if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpeg')) {
            const ext = path.extname(file);
            const base = path.basename(file, ext);
            const inPath = path.join(dir, file);
            const outPath = path.join(dir, `${base}.webp`);
            
            console.log(`Converting ${file} to ${base}.webp...`);
            try {
                await sharp(inPath)
                    .webp({ quality: 80 })
                    .toFile(outPath);
                
                // delete original
                fs.unlinkSync(inPath);
                console.log(`Successfully converted and removed ${file}`);
                convertedCount++;
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
    
    if (convertedCount > 0) {
        console.log('\nConversion complete! Committing and pushing to GitHub...');
        try {
            execSync(`git add ${dir}/`, { stdio: 'inherit' });
            execSync(`git commit -m "Add and convert missing macbook charger images to webp"`, { stdio: 'inherit' });
            execSync(`git push`, { stdio: 'inherit' });
            console.log('\nAll done! Deployment triggered successfully.');
        } catch (e) {
            console.error('\nError during git operations:', e.message);
        }
    } else {
        console.log('No .jpg or .png images found to convert.');
    }
}

convertAndDeploy();
