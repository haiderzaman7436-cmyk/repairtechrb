import os
import json
import urllib.request
from PIL import Image, ImageDraw

base_dir = r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images"
collections = [
    "laptop-parts-chargers",
    "latop-parts-batteries",
    "laptop-parts-keyboards",
    "laptop-parts-memory",
    "laptop-parts-storage"
]

def process_images():
    for coll in collections:
        url = f"https://shop.asetos.co.za/collections/{coll}/products.json?limit=250"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
        except Exception as e:
            print(f"Failed to fetch {coll}: {e}")
            continue
        
        out_dir = os.path.join(base_dir, coll)
        os.makedirs(out_dir, exist_ok=True)
        
        products = data.get('products', [])
        print(f"Processing {coll} ({len(products)} products)...")
        
        for idx, prod in enumerate(products, 1):
            if not prod.get('images'):
                continue
            
            img_url = prod['images'][0]['src']
            filename = f"{idx}_{img_url.split('/')[-1].split('?')[0]}"
            filepath = os.path.join(out_dir, filename)
            
            try:
                # Download original image directly into memory
                req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as img_resp:
                    with open(filepath, 'wb') as f:
                        f.write(img_resp.read())
                
                # Save pristine image
                with Image.open(filepath) as img:
                    img = img.convert('RGB')
                    img.save(filepath, quality=95)
                    
            except Exception as e:
                print(f"Failed on {filename}: {e}")
                
        print(f"Finished {coll}")

if __name__ == '__main__':
    process_images()
    print("All done!")
