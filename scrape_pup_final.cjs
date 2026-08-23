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
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating to collection page...');
    await page.goto('https://shop.asetos.co.za/collections/refurbished-servers?sort_by=price-ascending', { waitUntil: 'networkidle2' });

    console.log('Scrolling down to load all images...');
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 300;
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

    // Wait a bit more for lazy loaded images
    await new Promise(r => setTimeout(r, 2000));

    console.log('Extracting image URLs...');
    const images = await page.evaluate(() => {
        const els = document.querySelectorAll('img');
        let urls = [];
        els.forEach(el => {
            let url = el.src || el.srcset;
            if (url) {
                if (url.includes(',')) {
                    // Extract from srcset
                    let parts = url.split(',');
                    url = parts[parts.length - 1].trim().split(' ')[0];
                }
                if (url.startsWith('//')) url = 'https:' + url;
                // Clean params
                url = url.replace(/&width=\d+/, '');
                url = url.replace(/\?v=\d+/, '');
                
                // Keep only product images
                if (url.includes('cdn/shop') && !url.includes('logo') && !url.includes('icon')) {
                    urls.push(url);
                }
            }
        });
        return urls;
    });

    const uniqueImages = [...new Set(images)];
    console.log(`Found ${uniqueImages.length} unique product images.`);

    // There were 48 servers extracted in our previous script and assigned to 4.webp - 51.webp
    // If the site had exactly 48 items, it matches perfectly.
    // We will save them sequentially starting from 4.webp.
    let counter = 4;
    for (let url of uniqueImages) {
        if (counter > 51) break; // We only added up to 51.webp in the code
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

    console.log('Done downloading images!');
    await browser.close();
})();
