import { useNavigate } from 'react-router-dom';

const products = [
  {
    "id": 4446971625590,
    "title": "IPD Trackpad Keyboard Flex Cables - MacBook Retina 12\" A1534 Early 2015 2016 2017",
    "price": "R690.00",
    "priceNum": 690,
    "image": "/images/macbook-parts-keyboards/1_Trackpad-Keyboard-Cable-MacBook-12inch-Retina-A1534-Early-2015.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445734764662,
    "title": "Macbook Pro Retina 13 inch Model A1502 | Year 2013 - 2014 Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1150.00",
    "priceNum": 1150,
    "image": "/images/macbook-parts-keyboards/2_a1502LaptopReplacementkeyboard.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9232793362,
    "title": "Macbook Pro 13.3 inch Model A1278 | Year 2009 2010 2011 2012 Laptop Replacement Keyboard - US/UK Layout",
    "price": "R1805.00",
    "priceNum": 1805,
    "image": "/images/macbook-parts-keyboards/3_KB-APA1278-BNF-3.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949132685560,
    "title": "MacBook Retina 12.6\" A1534 Keyboard (Premium)",
    "price": "R2831.00",
    "priceNum": 2831,
    "image": "/images/macbook-parts-keyboards/4_AS069027.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949131538680,
    "title": "MacBook Retina 12.6\" A1534 Keyboard (Premium)",
    "price": "R3395.00",
    "priceNum": 3395,
    "image": "/images/macbook-parts-keyboards/5_AS150477_c2209621-6bb5-40f1-a38b-e46614b92d52.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949130719480,
    "title": "Macbook Air 13.3\" A1466 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/6_AS066418_0d1fead3-8aba-43e5-876a-eed33c63328e.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949130064120,
    "title": "Macbook Air 11.6\" A1370 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/7_AS007419.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129769208,
    "title": "MacBook Air 13.3\" A2179 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/8_AS075966.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129703672,
    "title": "Macbook Air 13.3\" M1 A2337 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/9_AS068838.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129605368,
    "title": "Macbook Air 13.3\" M1 A2337 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/10_AS102408_f0ab916a-a129-4edb-8428-f23c74f42eb9.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129375992,
    "title": "Macbook Air 13.3\" M1 A2337 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/11_AS139985_8a20aa43-4bfa-41cd-b4d0-d3830f1fc7a3.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129277688,
    "title": "Macbook Air 13.3\" M2 A2681 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/12_AS123551.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949126820088,
    "title": "Macbook Retina Pro 13.3\" A1502 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/13_AS003512.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949122593016,
    "title": "MacBook Pro 13.3\" A1706 Keyboard (Premium)",
    "price": "R2453.00",
    "priceNum": 2453,
    "image": "/images/macbook-parts-keyboards/14_AS031531.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949119840504,
    "title": "MacBook Pro 15.4\" A1707 Keyboard (Premium)",
    "price": "R2266.00",
    "priceNum": 2266,
    "image": "/images/macbook-parts-keyboards/15_AS003517_ecf30d2c-6257-4207-a659-92d184272361.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949118300408,
    "title": "MacBook Pro 15.4\" A1707 Keyboard (Premium)",
    "price": "R4672.00",
    "priceNum": 4672,
    "image": "/images/macbook-parts-keyboards/16_AS138016_f704851b-cc4e-4595-9703-fa616ab1ba0d.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949116596472,
    "title": "MacBook Pro 13.3\" A1708 Keyboard (Premium)",
    "price": "R1607.00",
    "priceNum": 1607,
    "image": "/images/macbook-parts-keyboards/17_AS003518.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949115482360,
    "title": "MacBook Pro 13.3\" A1708 Keyboard (Premium)",
    "price": "R2007.00",
    "priceNum": 2007,
    "image": "/images/macbook-parts-keyboards/18_AS039088.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949108338936,
    "title": "MacBook Pro 13.3\" M1 A2338 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/19_AS069075.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949107814648,
    "title": "MacBook Pro 13.3\" M1 A2338 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/20_AS075963.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949107257592,
    "title": "MacBook Pro 13.3\" M1 A2338 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/21_AS102407_7c6cd5d0-002e-469c-876f-79b5c831c5e0.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949105946872,
    "title": "MacBook Pro 14\" 2021 A2442 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/22_AS093526.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949104832760,
    "title": "MacBook Pro 13\" M2 A2338 Keyboard (Premium)",
    "price": "R7569.00",
    "priceNum": 7569,
    "image": "/images/macbook-parts-keyboards/23_AS166733_55a23ffe-0f0d-4dcb-8dea-5807f0af26b9.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949103292664,
    "title": "MacBook Pro M3 Max 16\" A2991 Keyboard (Premium)",
    "price": "R1330.00",
    "priceNum": 1330,
    "image": "/images/macbook-parts-keyboards/24_AS147317.png?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 8804641177848,
    "title": "A1707 TopCase (Space Grey) for Apple MacBook Pro 15 inch retina Touch Bar A1707 Late 2016 to Mid 2017 (Used)",
    "price": "R2300.00",
    "priceNum": 2300,
    "image": "/images/macbook-parts-keyboards/25_SpacegrayA1707TopcasewithKBandtouchbarMacBookProRetina15Palmrest.webp?v=4",
    "category": "MacBook Keyboards",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7664467345656,
    "title": "Apple MacBook Pro Top Case With Battery A2141 16\" 2019 Space Gray (Used - Second Hand)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-keyboards/26_AppleMacBookProTopCaseWithBatteryA2141162019SpaceGrey.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4445750198390,
    "title": "MacBook  Pro 15 inch Model A1286 |  Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/27_MacbookPro15inchA1286-2.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445740662902,
    "title": "MacBook  Pro Retina 15 inch Model A1398 |  Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/28_MacBookProRetina15InchModelA1398.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445729521782,
    "title": "Macbook Pro Retina 13 inch Model A1425 | Year 2012 2013 Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/29_US-Layout-Laptop-Replacement-Keyboard-for-Apple-MacBook-Pro-Retina-13-inch-A1425-2012-2013-Laptops-shop.asetos.co.za_6c9718f7-e0ed-4b84-83b0-c4b21a6bdfdf.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4445720412278,
    "title": "MacBook  Pro 17 inch Model A1297 |  Laptop Replacement Keyboard - UK/US Layout",
    "price": "R1495.00",
    "priceNum": 1495,
    "image": "/images/macbook-parts-keyboards/30_MacBookPro17inchUnibodyModelA1297-shop.asetos.co.za.jpg?v=4",
    "category": "MacBook Keyboards",
    "isUsed": false,
    "inStock": true
  }
];

export default function ShopMacBookKeyboards() {
  const navigate = useNavigate();

  return (
    <div className="shop-category-page">
      <div className="container">
        <h1 className="category-title">MacBook Keyboards</h1>
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
