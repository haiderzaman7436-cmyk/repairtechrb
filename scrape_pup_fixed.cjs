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
    console.log('Launching visible browser...');
    // headless: false often fixes the "WS endpoint" timeout on Windows
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating to collection page...');
    await page.goto('https://shop.asetos.co.za/collections/refurbished-servers?sort_by=price-ascending', { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('Waiting for images to load...');
    try {
        await page.waitForSelector('img', { timeout: 10000 });
    } catch(e) { console.log('Timeout waiting for img'); }

    console.log('Scrolling down...');
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
            }, 300);
        });
    });

    console.log('Extracting image URLs...');
    const images = await page.evaluate(() => {
        const els = document.querySelectorAll('.card__media img');
        let urls = [];
        els.forEach(el => {
            let url = el.getAttribute('src');
            if (!url) {
                const srcset = el.getAttribute('srcset');
                if (srcset) {
                    let parts = srcset.split(',');
                    url = parts[parts.length - 1].trim().split(' ')[0];
                }
            }
            if (url) {
                if (url.startsWith('//')) url = 'https:' + url;
                url = url.replace(/&width=\d+/, '');
                url = url.replace(/\?v=\d+/, ''); // remove ?v= param
                if(url.includes('cdn/shop')) {
                    urls.push(url);
                }
            }
        });
        return urls;
    });

    const uniqueImages = [...new Set(images)];
    console.log(`Found ${uniqueImages.length} unique images.`);

    let counter = 4; // Start from 4.webp
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

    console.log('Done!');
    await browser.close();
})();
