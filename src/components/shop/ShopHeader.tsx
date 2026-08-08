import { Link } from 'react-router-dom';
import { ChevronDown, Search, Phone, User, ShoppingCart } from 'lucide-react';

export default function ShopHeader() {
  return (
    <div className="shop-header-wrapper">

      {/* Main Header */}
      <div className="shop-main-header">
        <div className="container shop-header-inner">
          <Link to="/shop" className="shop-logo" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', textDecoration: 'none' }}>
            <img 
              src="/images/logo%20(3).png" 
              alt="Repair Tech Logo" 
              className="shop-logo-img"
              style={{ 
                height: '130px', 
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.05' }}>
              <span style={{ fontSize: '2.6rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>REPAIR</span>
              <span style={{ fontSize: '2.6rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>TECH</span>
            </div>
          </Link>
          
          <div className="shop-search">
            <div className="shop-search-category" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              All Categories <ChevronDown size={14} />
            </div>
            <input type="text" placeholder="Search for products, brands, categories..." className="shop-search-input" />
            <button className="shop-search-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} />
            </button>
          </div>
          
          <div className="shop-actions">
            <a href="tel:+27685011885" className="shop-action-item">
              <span className="shop-action-icon"><Phone size={20} /></span>
              <div>
                <div className="shop-action-label">Call Us</div>
                <div className="shop-action-val">068 501 1885</div>
              </div>
            </a>
            <Link to="/account" className="shop-action-item">
              <span className="shop-action-icon"><User size={22} /></span>
              <div className="shop-action-val">Account</div>
            </Link>
            <Link to="/cart" className="shop-action-item">
              <span className="shop-action-icon" style={{ color: 'var(--lime)' }}><ShoppingCart size={22} /></span>
              <div>
                <div className="shop-action-val">R 0.00</div>
                <div className="shop-action-label">0 Cart</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
