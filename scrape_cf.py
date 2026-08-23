import cloudscraper
import re
import json

scraper = cloudscraper.create_scraper()
html = scraper.get('https://shop.asetos.co.za/collections/refurbished-servers?sort_by=price-ascending').text

with open('cf_server_page.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Scraped page size:", len(html))

# Try to find images
images = re.findall(r'<div class="card__media">.*?<img[^>]*srcset="([^"]+)"', html, re.DOTALL)
if not images:
    images = re.findall(r'<img[^>]*srcset="([^"]+)"[^>]*class="motion-reduce"', html, re.DOTALL)

print("Found", len(images), "images")

unique_urls = []
for img in images:
    parts = img.split(',')
    last_part = parts[-1].strip().split(' ')[0]
    if last_part.startswith('//'):
        last_part = 'https:' + last_part
    last_part = re.sub(r'&width=\d+', '', last_part)
    if last_part not in unique_urls:
        unique_urls.append(last_part)

print("Found", len(unique_urls), "unique images")

with open('cf_image_urls.json', 'w') as f:
    json.dump(unique_urls, f)
