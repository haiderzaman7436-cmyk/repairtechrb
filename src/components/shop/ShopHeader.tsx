import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Phone, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function ShopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems, totalPrice } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

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
                height: '80px', 
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }} 
            />
            <div className="logo-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.05' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>REPAIR</span>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>TECH</span>
            </div>
          </Link>
          
          <form onSubmit={handleSearch} className="shop-search">
            <div className="shop-search-category" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              All Categories <ChevronDown size={14} />
            </div>
            <input 
              type="text" 
              placeholder="Search for products, brands, categories..." 
              className="shop-search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="shop-search-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} />
            </button>
          </form>
          
          <div className="shop-actions">
            <a href="tel:+27685011885" className="shop-action-item hide-on-mobile">
              <span className="shop-action-icon"><Phone size={20} /></span>
              <div>
                <div className="shop-action-label">Call Us</div>
                <div className="shop-action-val">068 501 1885</div>
              </div>
            </a>
            
            {user ? (
              <div className="shop-action-item user-menu-container">
                <span className="shop-action-icon"><User size={22} /></span>
                <div>
                  <div className="shop-action-val">Hi, {user.displayName}</div>
                  <div className="shop-action-label" style={{ display: 'flex', gap: '10px' }}>
                    {user.isAdmin && <Link to="/admin" style={{ color: 'var(--lime)' }}>Admin</Link>}
                    <button onClick={logout} style={{ color: 'var(--gray-dark)', fontSize: '0.75rem', padding: 0 }}>Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="shop-action-item hide-on-mobile">
                <span className="shop-action-icon"><User size={22} /></span>
                <div className="shop-action-val">Account</div>
              </Link>
            )}

            <Link to="/cart" className="shop-action-item">
              <span className="shop-action-icon" style={{ color: 'var(--lime)', position: 'relative' }}>
                <ShoppingCart size={22} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </span>
              <div className="hide-on-mobile">
                <div className="shop-action-val">R {totalPrice.toFixed(2)}</div>
                <div className="shop-action-label">{totalItems} Cart</div>
              </div>
            </Link>

            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} color="var(--navy)" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
          </div>
          
          <div className="mobile-menu-search">
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit"><Search size={18} /></button>
            </form>
          </div>

          <div className="mobile-menu-links">
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop/laptop-parts/screens" onClick={() => setIsMobileMenuOpen(false)}>Laptop Screens</Link>
            <Link to="/shop/laptop-parts/batteries" onClick={() => setIsMobileMenuOpen(false)}>Laptop Batteries</Link>
            <Link to="/shop/laptop-parts/chargers" onClick={() => setIsMobileMenuOpen(false)}>Laptop Chargers</Link>
            <Link to="/shop/used-laptops" onClick={() => setIsMobileMenuOpen(false)}>Refurbished Laptops</Link>
            <Link to="/shop/gaming-computers" onClick={() => setIsMobileMenuOpen(false)}>Gaming Computers</Link>
          </div>

          <div className="mobile-menu-footer">
            {user ? (
              <>
                <div style={{ padding: '1rem', fontWeight: 'bold' }}>Hi, {user.displayName}</div>
                {user.isAdmin && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '1rem', display: 'block', color: 'var(--lime)' }}>Admin Dashboard</Link>}
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} style={{ width: '100%', padding: '1rem', textAlign: 'left', color: 'red' }}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '1rem', fontWeight: 'bold' }}>Login / Register</Link>
            )}
            <a href="tel:+27685011885" style={{ display: 'block', padding: '1rem', fontWeight: 'bold', borderTop: '1px solid #eee' }}>Call Us: 068 501 1885</a>
          </div>
        </div>
      </div>

    </div>
  );
}
