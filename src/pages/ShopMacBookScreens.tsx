import { useNavigate } from 'react-router-dom';

const products = [
  {
    "id": 4446057824374,
    "title": "13\" MacBook Air Replacement Display Screen Assembly | A1466 Year MID 2013 - MID 2017  (used)",
    "price": "R3999.00",
    "priceNum": 3999,
    "image": "/images/macbook-parts-screens/1_MID-2017-EMC2925-A1466-Complete-LCD-Screen-For-Apple-Macbook-Air-13-inch-LCD-Display-Assembly.jpg_q50.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7664437494008,
    "title": "16 inch MacBook Pro  Space Grey Replacement Display Screen Assembly | A2141 Late 2019  (Used)",
    "price": "R7999.00",
    "priceNum": 7999,
    "image": "/images/macbook-parts-screens/2_16inchMacBookProSpaceGreyReplacementDisplayScreen2.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4446063853686,
    "title": "13\" MacBook Pro Retina  Replacement Display Screen Assembly | A1425 Year Late 2012 - Early 2013  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/3_A1425macbookproretinascreen.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4445769793654,
    "title": "13\" MacBook Pro Retina Replacement Display Screen Assembly | A1502 Year Late 2013 - Mid 2014  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/4_A1502-late-2013mid-2014.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 9949130162424,
    "title": "Macbook Air 13.3\" A1369 Screen Assembly (Premium)",
    "price": "R4982.00",
    "priceNum": 4982,
    "image": "/images/macbook-parts-screens/5_AS052182.png?v=4",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949129343224,
    "title": "Macbook Air 13.3\" M2 A2681 Screen Assembly (Premium)",
    "price": "R5979.00",
    "priceNum": 5979,
    "image": "/images/macbook-parts-screens/6_AS117046.png?v=4",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949128786168,
    "title": "Macbook Air 15.3\" M2 A2941 Screen Assembly (Premium)",
    "price": "R5979.00",
    "priceNum": 5979,
    "image": "/images/macbook-parts-screens/7_AS135196_13b07984-a273-4cd0-b449-1218e2f1dc2d.png?v=4",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949127475448,
    "title": "Macbook Air 15.3\" M2 A2941 Screen Assembly (OEM)",
    "price": "R5979.00",
    "priceNum": 5979,
    "image": "/images/macbook-parts-screens/8_AS161771.png?v=4",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 9949124788472,
    "title": "Macbook Retina Pro 13.3\" A1502 Screen Assembly (OEM)",
    "price": "R5690.00",
    "priceNum": 5690,
    "image": "/images/macbook-parts-screens/9_AS163854.png?v=4",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 7759664546040,
    "title": "A1502 13 inch MacBook Pro Silver Replacement Display Screen Assembly | Early 2015 Model  (Used)",
    "price": "R3999.00",
    "priceNum": 3999,
    "image": "/images/macbook-parts-screens/10_A150213inchMacBookProSilverReplacementDisplayScreenAssembly.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7759657042168,
    "title": "A2338 13 inch MacBook Pro Space Grey Replacement Display Screen Assembly | 2020 Model  (Used)",
    "price": "R6999.00",
    "priceNum": 6999,
    "image": "/images/macbook-parts-screens/11_A233813inchMacBookProSpaceGreyReplacementDisplayScreenAssembly.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7759654519032,
    "title": "A2337 13 inch MacBook Air Space Grey Replacement Display Screen Assembly | 2020 Model  (Used)",
    "price": "R5999.00",
    "priceNum": 5999,
    "image": "/images/macbook-parts-screens/12_13inchMacBookAirSpaceGreyReplacementDisplayScreenAssemblyA2337.webp?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 7759645802744,
    "title": "15 inch MacBook Pro  Silver Replacement Display Screen Assembly | A1398 Mid 2012  (Used)",
    "price": "R2999.00",
    "priceNum": 2999,
    "image": "/images/macbook-parts-screens/13_A1502-late-2013mid-2014.png?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504729583734,
    "title": "15\" MacBook Pro Retina Touch Replacement Display Screen Assembly | A1990 Late 2018 - 2019  (Resolution = 2880*1800)",
    "price": "R12900.00",
    "priceNum": 12900,
    "image": "/images/macbook-parts-screens/14_MacBookPro15inchRetinaTouchFullReplacementDisplayScreenAssemblyA1707Late2016-2017_0425df2f-06f3-49fb-a269-35c73ed5b65d.png?v=4",
    "category": "MacBook Screens",
    "isUsed": false,
    "inStock": true
  },
  {
    "id": 4504726634614,
    "title": "15\" MacBook Pro Retina Touch Replacement Display Screen Assembly | A1707 Late 2016 - 2017  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/15_MacBookPro15inchRetinaTouchFullReplacementDisplayScreenAssemblyA1707Late2016-2017.png?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504724799606,
    "title": "15\" MacBook Pro Retina  Replacement Display Screen Assembly | A1398 Mid 2012 - Early 2013  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/16_AppleMacBookPro15inchRetinaReplacementFullDisplayScreenAssemblyA1398Late2013-Mid2014_3bb5cbfc-e821-4bc6-aa9c-536c130711d1.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504721784950,
    "title": "15\" MacBook Pro  Retina Replacement Display Screen Assembly | A1398 Late 2013 - Mid 2014  (used)",
    "price": "R5999.00",
    "priceNum": 5999,
    "image": "/images/macbook-parts-screens/17_AppleMacBookPro15inchRetinaReplacementFullDisplayScreenAssemblyA1398Late2013-Mid2014.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4504714150006,
    "title": "13\" MacBook Pro Retina Touch Bar  Replacement Display Screen Assembly | A1706 Late 2016 - 2017  (used)",
    "price": "R4999.00",
    "priceNum": 4999,
    "image": "/images/macbook-parts-screens/18_MacBookPro13inchRetinaTouchBarA1706Late2016.png?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4446065623158,
    "title": "15\" MacBook Pro Retina  Replacement Display Screen Assembly | A1398 Mid 2015  (used)",
    "price": "R6999.00",
    "priceNum": 6999,
    "image": "/images/macbook-parts-screens/19_Mid-2015-EMC2909-EMC2910-A1398-LCD-Display-Assembly-For-Macbook-Pro-Retina-15-inch-Full-LCD.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  },
  {
    "id": 4446060904566,
    "title": "11\" MacBook Air Replacement Display Screen Assembly | A1465 Year Early 2013 - MID 2015  (used)",
    "price": "R3999.00",
    "priceNum": 3999,
    "image": "/images/macbook-parts-screens/20_Early-2015-EMC2924-A1465-Complete-LCD-Display-For-Apple-Macbook-Air-11-inch-LCD-Screen-Display.jpg?v=4",
    "category": "MacBook Screens",
    "isUsed": true,
    "inStock": true
  }
];

export default function ShopMacBookScreens() {
  const navigate = useNavigate();

  return (
    <div className="shop-category-page">
      <div className="container">
        <h1 className="category-title">MacBook Screens</h1>
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
