import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

const BASE_URL = 'https://shop.asetos.co.za/collections/iphone-screens-1';
const PAGES = 5;
const OUTPUT_DIR = 'C:/Users/haide/OneDrive/Desktop/RepairTech/public/images/gadget-screens';
const OUT_FILE = 'C:/Users/haide/.gemini/antigravity-ide/brain/3dbb332f-cdee-4300-9b70-e5af362acd2f/scratch/products.json';

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const allProducts = [];
  let idCounter = Date.now(); // fallback ID generator

  for (let i = 1; i <= PAGES; i++) {
    const url = `${BASE_URL}?page=${i}&sort_by=price-ascending`;
    console.log(`Scraping page ${i}: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    const products = await page.evaluate(() => {
      const items = [];
      // This selector might need adjusting. It's a common shopify selector.
      const cards = document.querySelectorAll('.grid-view-item, .product-card, .grid__item');
      
      cards.forEach(card => {
        const titleEl = card.querySelector('.grid-view-item__title, .product-card__title, .product-item__title, .card__heading');
        const priceEl = card.querySelector('.price-item--regular, .product-card__price, .price__regular, .price-item');
        const imgEl = card.querySelector('.grid-view-item__image, .product-card__image, img');
        
        if (titleEl && imgEl) {
          const title = titleEl.innerText.trim();
          let priceText = priceEl ? priceEl.innerText.trim() : 'R0.00';
          // Clean up price
          priceText = priceText.replace(/[^0-9.]/g, '');
          if (!priceText) priceText = '0';
          
          let imgUrl = imgEl.src;
          // Clean up Shopify URLs
          if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
          
          // try to get a higher res image by removing width params
          imgUrl = imgUrl.replace(/_[0-9]+x[0-9]+/, '');
          
          items.push({ title, priceNum: parseFloat(priceText), imgUrl });
        }
      });
      return items;
    });

    console.log(`Found ${products.length} products on page ${i}`);
    
    for (const p of products) {
      if (!p.title) continue;
      
      const priceStr = `R${p.priceNum.toFixed(2)}`;
      
      // Attempt to download image
      let localImageName = `iphone_screen_${idCounter}.jpg`;
      const extensionMatch = p.imgUrl.match(/\.(jpg|jpeg|png|webp)/i);
      if (extensionMatch) {
        localImageName = `iphone_screen_${idCounter}${extensionMatch[0]}`;
      }
      
      const localImagePath = path.join(OUTPUT_DIR, localImageName);
      
      try {
        await downloadImage(p.imgUrl, localImagePath);
        allProducts.push({
          id: idCounter,
          title: p.title,
          price: priceStr,
          priceNum: p.priceNum,
          image: `/images/gadget-screens/${localImageName}`,
          category: "Gadget Screens",
          isUsed: false,
          inStock: true
        });
        idCounter++;
      } catch (err) {
        console.error(`Failed to download image for ${p.title}: ${err.message}`);
      }
    }
  }

  await browser.close();

  fs.writeFileSync(OUT_FILE, JSON.stringify(allProducts, null, 2));
  console.log(`Successfully scraped ${allProducts.length} products and saved to ${OUT_FILE}`);
}

run().catch(console.error);
