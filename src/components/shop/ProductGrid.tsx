import { useState } from 'react';

interface Product {
  tag: string;
  isUsed: boolean;
  image: string;
  category: string;
  title: string;
  price: string;
}

interface ProductGridProps {
  title: string;
  subtitle: string;
  tabs: string[];
  products: Product[];
}

export default function ProductGrid({ title, subtitle, tabs, products }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="shop-product-section">
      <div className="container">
        <h2 className="shop-section-title">{title}</h2>
        <div className="shop-section-subtitle">{subtitle}</div>

        <div className="shop-tabs">
          {tabs.map((tab, idx) => (
            <button 
              key={idx} 
              className={`shop-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="shop-product-grid">
          {products.map((product, idx) => (
            <div className="shop-product-card" key={idx}>
              <div className="shop-product-tags">
                <span className="shop-tag-local">{product.tag}</span>
                {product.isUsed && <span className="shop-tag-used">USED</span>}
              </div>
              <div className="shop-product-img-box" style={{ height: '220px', overflow: 'hidden', marginBottom: '1rem', borderRadius: '8px' }}>
                <img src={product.image} alt={product.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="shop-product-category">{product.category}</div>
              <h3 className="shop-product-title">{product.title}</h3>
              <div className="shop-product-price">{product.price}</div>
              
              <div className="shop-product-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button style={{ flex: 1, background: 'var(--navy)', color: 'var(--white)', border: 'none', padding: '0.75rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>ADD TO CART</button>
                <button style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>💬</button>
              </div>
            </div>
          ))}
        </div>

        <div className="shop-view-all-box">
          <button className="btn btn-navy shop-view-all">VIEW ALL FULL {activeTab}</button>
        </div>
      </div>
    </div>
  );
}
