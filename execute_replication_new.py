import os
import json
import urllib.request
import re
from PIL import Image
from rembg import remove

base_dir = r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images"
pages_dir = r"c:\Users\haide\OneDrive\Desktop\RepairTech\src\pages"

collections_map = {
    "replacement-laptop-screen": ("ShopScreens", "laptop-parts/screens", "Screens"),
    "macbook-replacement-screen": ("ShopMacBookScreens", "macbook-parts/screens", "MacBook Screens"),
    "macbook-replacement-batteries": ("ShopMacBookBatteries", "macbook-parts/batteries", "MacBook Batteries"),
    "macbook-replacement-keyboards": ("ShopMacBookKeyboards", "macbook-parts/keyboards", "MacBook Keyboards"),
    "gaming-computers": ("ShopGaming", "gaming-computers", "Gaming Computers"),
    "quality-used-laptops": ("ShopUsedLaptops", "used-laptops", "Used Laptops")
}

tsx_template = """import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = {PRODUCTS_JSON};

export default function {COMPONENT_NAME}() {
  const navigate = useNavigate();

  return (
    <div className="shop-category-page">
      <div className="container">
        <h1 className="category-title">{CATEGORY_TITLE}</h1>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="cat-product-card" onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
              {product.isUsed && <span className="cat-product-tag-used">USED</span>}
              <div className="cat-product-img-box">
                <div className="premium-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                  VERIFIED PART
                </div>
                <img src={product.image} alt={product.title} />
              </div>
              <div className="cat-product-info">
                <h3 className="cat-product-title">{product.title}</h3>
                <div className="cat-product-meta">
                  <span>Type: <strong>{product.category}</strong></span>
                  <span className="stock-status in-stock">● In Stock</span>
                </div>
                <div className="cat-product-price">{product.price}</div>
                <button className="btn btn-navy" style={{width: '100%', marginTop: '1rem'}}>VIEW DETAILS</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"""

def clean_price(price_str):
    try:
        return int(float(price_str))
    except:
        return 0

def process():
    for coll_handle, (comp_name, img_folder, title) in collections_map.items():
        print(f"Fetching {coll_handle}...")
        url = f"https://shop.asetos.co.za/collections/{coll_handle}/products.json?limit=30"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            resp = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
            data = json.loads(resp)
        except Exception as e:
            print(f"Failed to fetch JSON for {coll_handle}: {e}")
            continue
            
        products = data.get('products', [])
        if not products:
            print(f"No products found for {coll_handle}")
            continue
            
        out_img_dir = os.path.join(base_dir, img_folder.replace('/', '-'))
        os.makedirs(out_img_dir, exist_ok=True)
        
        extracted_products = []
        for idx, prod in enumerate(products, 1):
            if not prod.get('images'):
                continue
            
            p_title = prod.get('title', '')
            p_id = prod.get('id', idx)
            variants = prod.get('variants', [])
            p_price_val = clean_price(variants[0].get('price', 0)) if variants else 0
            p_price = f"R{p_price_val}.00"
            
            img_url = prod['images'][0]['src']
            img_filename = f"{idx}_{img_url.split('/')[-1].split('?')[0]}"
            img_filepath = os.path.join(out_img_dir, img_filename)
            
            # Download Image
            try:
                print(f"  Downloading {img_filename}...")
                req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as img_resp:
                    with open(img_filepath, 'wb') as f:
                        f.write(img_resp.read())
                        
                # AI Background Removal
                print(f"  Removing background for {img_filename}...")
                with Image.open(img_filepath) as input_img:
                    output_img = remove(input_img)
                    white_bg = Image.new("RGBA", output_img.size, (255, 255, 255, 255))
                    white_bg.paste(output_img, (0, 0), output_img)
                    final_img = white_bg.convert('RGB')
                    final_img.save(img_filepath)
                    
                local_img_path = f"/images/{os.path.basename(out_img_dir)}/{img_filename}?v=4"
                
                extracted_products.append({
                    "id": p_id,
                    "title": p_title,
                    "price": p_price,
                    "priceNum": p_price_val,
                    "image": local_img_path,
                    "category": title,
                    "isUsed": "used" in p_title.lower() or coll_handle == "quality-used-laptops",
                    "inStock": True
                })
                
            except Exception as e:
                print(f"Failed processing image for {p_title}: {e}")
                
        # Generate TSX
        print(f"Generating {comp_name}.tsx...")
        tsx_content = tsx_template.replace('{PRODUCTS_JSON}', json.dumps(extracted_products, indent=2))
        tsx_content = tsx_content.replace('{COMPONENT_NAME}', comp_name)
        tsx_content = tsx_content.replace('{CATEGORY_TITLE}', title)
        
        with open(os.path.join(pages_dir, f"{comp_name}.tsx"), 'w', encoding='utf-8') as f:
            f.write(tsx_content)

if __name__ == '__main__':
    process()
    print("Done replication!")
