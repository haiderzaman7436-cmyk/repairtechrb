const fs = require('fs');

async function scrape() {
  try {
    const response = await fetch('https://shop.asetos.co.za/collections/laptop-memory-ram?sort_by=price-ascending', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });
    
    if (!response.ok) {
      console.log('HTTP error! status: ' + response.status);
    }
    const html = await response.text();
    fs.writeFileSync('scraped2.html', html);
    
    const products = [];
    const cards = html.split('card-wrapper');
    for (let i = 1; i < cards.length; i++) {
      const card = cards[i];
      
      const titleMatch = card.match(/<a[^>]*class="full-unstyled-link"[^>]*>([\s\S]*?)<\/a>/i);
      const title = titleMatch ? titleMatch[1].trim().replace(/<[^>]*>/g, '') : 'Unknown';
      
      const priceMatch = card.match(/<span[^>]*class="[^"]*price-item[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
      const priceStr = priceMatch ? priceMatch[1].trim().replace(/<[^>]*>/g, '').replace(/[\r\n\t]/g, '').trim() : 'Unknown';
      
      let imgMatch = card.match(/<img[^>]*src="([^"]+)"/i);
      if (!imgMatch) {
         imgMatch = card.match(/srcset="([^"]+)"/i);
      }
      
      const image = imgMatch ? 'https:' + imgMatch[1].split(',')[0].trim().split(' ')[0].replace(/&amp;/g, '&') : '';

      if (title !== 'Unknown' && title.trim() !== '') {
        products.push({
          id: i,
          title: title.trim(),
          price: priceStr,
          priceNum: parseFloat(priceStr.replace(/[^0-9.]/g, '') || 0),
          image
        });
      }
    }

    fs.writeFileSync('memory.json', JSON.stringify(products, null, 2));
    console.log('Saved ' + products.length + ' products to memory.json');
    
  } catch (err) {
    console.error(err);
  }
}

scrape();
