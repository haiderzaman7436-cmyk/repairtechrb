const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');
const sharp = require('sharp');

const imageDir = path.join(__dirname, 'public/images/servers');

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

async function downloadAndConvert(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
            }
            
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', async () => {
                const buffer = Buffer.concat(chunks);
                try {
                    await sharp(buffer)
                        .webp({ quality: 80 })
                        .toFile(filepath);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', reject);
    });
}

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set a realistic viewport and user agent
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    
    console.log('Navigating to collection page...');
    await page.goto('https://shop.asetos.co.za/collections/refurbished-servers?sort_by=price-ascending', { waitUntil: 'networkidle2' });

    console.log('Scrolling down to load all lazy images...');
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });

    console.log('Extracting images...');
    const images = await page.evaluate(() => {
        const els = document.querySelectorAll('.card__media img[srcset]');
        let urls = [];
        els.forEach(el => {
            let srcset = el.getAttribute('srcset');
            let parts = srcset.split(',');
            let lastPart = parts[parts.length - 1].trim().split(' ')[0];
            if (lastPart.startsWith('//')) lastPart = 'https:' + lastPart;
            // Remove width param for highest quality
            lastPart = lastPart.replace(/&width=\d+/, '');
            urls.push(lastPart);
        });
        return urls;
    });

    console.log(`Found ${images.length} images!`);

    // Remove duplicates (hover effect prints same image, or secondary image)
    // Actually, each product card has 2 images: main and secondary for hover.
    // We only want the first one for each product.
    // The DOM structure is .card__media > .media > img, etc.
    // Let's filter to get only the unique primary images by tracking them.
    // Usually the primary is the first one encountered per card.
    const uniqueImages = [...new Set(images)];
    console.log(`Found ${uniqueImages.length} unique images.`);

    let counter = 4; // Because 1, 2, 3 are already setup! (or we can just overwrite them if we want all 51 from the site)
    // Wait, the user said "add them", they want to map them correctly. 
    // The parser script generated 48 products assigned to 4.webp through 51.webp.
    // Let's just download all unique images sequentially starting from 4.
    
    for (let url of uniqueImages) {
        const filepath = path.join(imageDir, `${counter}.webp`);
        console.log(`Downloading ${url} to ${counter}.webp...`);
        try {
            await downloadAndConvert(url, filepath);
            console.log(`Successfully saved ${counter}.webp`);
            counter++;
        } catch (err) {
            console.error(`Error saving ${counter}.webp:`, err.message);
        }
    }

    console.log('Finished scraping images!');
    await browser.close();
})();
