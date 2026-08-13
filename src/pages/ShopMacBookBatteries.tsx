import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    "id": 4445623287926,
    "title": "A1398 Apple MacBook Pro Retina 15\" Replacement Battery. Fits A1398, A1417, A1494 (Late 2013 mid 2014, Mid 2015)",
    "price": "R2300.00",
    "priceNum": 2300,
    "image": "/images/macbook-parts-batteries/1_A1494A1398macbookproretina15inch2.jpg?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445635051638,
    "title": "A1406 Apple MacBook Air 11\" Replacement Battery. Fits A1406 A1370 (Mid 2011)",
    "price": "R1518.00",
    "priceNum": 1518,
    "image": "/images/macbook-parts-batteries/2_AppleA1406LaptopbatteryforAppleMacBookair.jpg?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4443679850614,
    "title": "A1502 Apple MacBook Pro 13\" Retina Replacement Battery (Early 2015) MF839LL/A,  A1582",
    "price": "R3450.00",
    "priceNum": 3450,
    "image": "/images/macbook-parts-batteries/3_MacBookretinaA1502battery.jpg?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949132161272,
    "title": "MacBook Retina 12.6\" A1534 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/4_AS130940.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949130096888,
    "title": "Macbook Air 13.3\" A1369 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/5_AS130950.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129998584,
    "title": "Macbook Air 11.6\" A1370 Replacement Battery (OEM)",
    "price": "R1988.00",
    "priceNum": 1988,
    "image": "/images/macbook-parts-batteries/6_AS130953.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129965816,
    "title": "MacBook Air 13.3 A1932 Replacement Battery (OEM)",
    "price": "R2164.00",
    "priceNum": 2164,
    "image": "/images/macbook-parts-batteries/7_AS130943_a9133c7c-bf5a-4e1a-962a-3c09c720c51c.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129834744,
    "title": "MacBook Air 13.3\" A2179 Replacement Battery (Premium)",
    "price": "R2164.00",
    "priceNum": 2164,
    "image": "/images/macbook-parts-batteries/8_AS069362_80e4f0b1-4c4d-4673-8f51-0ce1813a0aab.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129670904,
    "title": "Macbook Air 13.3\" M1 A2337 Replacement Battery (Premium)",
    "price": "R2320.00",
    "priceNum": 2320,
    "image": "/images/macbook-parts-batteries/9_AS069361.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129474296,
    "title": "Macbook Air 13.3\" M1 A2337 Replacement Battery (OEM)",
    "price": "R2262.00",
    "priceNum": 2262,
    "image": "/images/macbook-parts-batteries/10_AS136293_6257520f-bf84-4218-ad78-974c2b435075.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129212152,
    "title": "Macbook Air 13.3\" M2 A2681 Replacement Battery (OEM)",
    "price": "R2458.00",
    "priceNum": 2458,
    "image": "/images/macbook-parts-batteries/11_AS133817_a1d9acbf-ca78-4864-8ee9-536e749b6055.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129146616,
    "title": "Macbook Air 13.3\" M2 A2681 Replacement Battery (OEM)",
    "price": "R2458.00",
    "priceNum": 2458,
    "image": "/images/macbook-parts-batteries/12_AS133818.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949128032504,
    "title": "Macbook Air 15.3\" M2 A2941 Replacement Battery (Premium)",
    "price": "R3732.00",
    "priceNum": 3732,
    "image": "/images/macbook-parts-batteries/13_AS152641.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949126230264,
    "title": "Macbook Retina Pro 13.3\" A1502 Replacement Battery (OEM)",
    "price": "R2556.00",
    "priceNum": 2556,
    "image": "/images/macbook-parts-batteries/14_AS127454.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949125509368,
    "title": "Macbook Retina Pro 13.3\" A1502 Replacement Battery (OEM)",
    "price": "R2556.00",
    "priceNum": 2556,
    "image": "/images/macbook-parts-batteries/15_AS130955.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949123903736,
    "title": "MacBook Retina Pro 15.4\" A1398 Replacement Battery (OEM)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/16_AS129995_3be5fdc6-56cc-4a6e-96ca-cf4a620b22b0.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949123084536,
    "title": "MacBook Retina Pro 15.4\" A1398 Replacement Battery (OEM)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/17_AS130948.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949121478904,
    "title": "MacBook Pro 13.3\" A1706 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/18_AS130944.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949120495864,
    "title": "MacBook Pro 13.3\" A1706 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/19_AS153000_9c7970b0-4a8f-409a-9087-181e3ad7d671.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949119086840,
    "title": "MacBook Pro 15.4\" A1707 Replacement Battery (OEM)",
    "price": "R2652.00",
    "priceNum": 2652,
    "image": "/images/macbook-parts-batteries/20_AS133609_5f18ee77-8bd0-4a94-9ffc-5c773c372d65.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949117382904,
    "title": "MacBook Pro 15.4\" A1707 Replacement Battery (OEM)",
    "price": "R2810.00",
    "priceNum": 2810,
    "image": "/images/macbook-parts-batteries/21_AS153001.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949114663160,
    "title": "MacBook Pro 13.3\" A1708 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/22_AS130939_50b1743b-c7ad-42ca-990c-e3a527e396d0.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949112238328,
    "title": "Macbook Pro Retina 13\" A1989 Replacement Battery (OEM)",
    "price": "R2358.00",
    "priceNum": 2358,
    "image": "/images/macbook-parts-batteries/23_AS135068.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949111550200,
    "title": "Macbook Pro Retina 15\" A1990 Replacement Battery (Premium)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/24_AS069358.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949111025912,
    "title": "Macbook Pro Retina 15\" A1990 Replacement Battery (OEM)",
    "price": "R2852.00",
    "priceNum": 2852,
    "image": "/images/macbook-parts-batteries/25_AS130951_c0823c9c-e4d5-4125-a4b2-f438c2b19a18.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949110403320,
    "title": "Macbook Pro 16\" 2019 A2141 Replacement Battery (Premium)",
    "price": "R2948.00",
    "priceNum": 2948,
    "image": "/images/macbook-parts-batteries/26_AS069360.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949109911800,
    "title": "MacBook Pro 13.3\" A2289 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/27_AS111140.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949109387512,
    "title": "MacBook Pro 13.3\" A2289 Replacement Battery (OEM)",
    "price": "R1956.00",
    "priceNum": 1956,
    "image": "/images/macbook-parts-batteries/28_AS134162.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949108830456,
    "title": "MacBook Pro Retina 13.3\" A2251 Replacement Battery (Premium)",
    "price": "R2516.00",
    "priceNum": 2516,
    "image": "/images/macbook-parts-batteries/29_AS069359.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949106503928,
    "title": "MacBook Pro 16\" 2021 A2485 Replacement Battery (Premium)",
    "price": "R3440.00",
    "priceNum": 3440,
    "image": "/images/macbook-parts-batteries/30_AS120631.png?v=4",
    "category": "MacBook Batteries",
    "isUsed": false,
    "inStock": true
  }
];

export default function ShopMacBookBatteries() {
  const navigate = useNavigate();

  return (
    <div className="shop-category-page">
      <div className="container">
        <h1 className="category-title">MacBook Batteries</h1>
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
