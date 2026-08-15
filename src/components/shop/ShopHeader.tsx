import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Phone, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function ShopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

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
                height: '75px',
                minHeight: '75px',
                width: 'auto',
                flexShrink: 0,
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }} 
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div className="logo-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.05' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>REPAIR</span>
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--navy)', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>TECH</span>
            </div>
          </Link>
          
          <form onSubmit={handleSearch} className="shop-search">
            <select id="search-category" name="category" aria-label="Search Category" className="shop-search-category" style={{ padding: '0 1rem', border: 'none', background: '#fff', outline: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer', appearance: 'none' }}>
              <option value="all">All Categories</option>
              <option value="laptops">Laptops</option>
              <option value="parts">Parts & Upgrades</option>
              <option value="mac">Apple Mac</option>
            </select>
            <input 
              id="search-input"
              name="q"
              aria-label="Search products"
              type="text" 
              placeholder="Search for products, brands, categories..." 
              className="shop-search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Submit search" className="shop-search-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} />
            </button>
          </form>
          
          <div className="shop-actions">
            <a href="tel:+27621172653" className="shop-action-item hide-on-mobile">
              <span className="shop-action-icon"><Phone size={20} /></span>
              <div>
                <div className="shop-action-label">Call Us</div>
                <div className="shop-action-val">062 117 2653</div>
              </div>
            </a>
            
            {user && !user.isAnonymous ? (
              <div className="shop-action-item user-menu-container hide-on-mobile">
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
                <div className="shop-action-val">Request Quote</div>
                <div className="shop-action-label">{totalItems} Items</div>
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
                id="mobile-search-input"
                name="mobile-q"
                aria-label="Search products mobile"
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" aria-label="Submit search"><Search size={18} /></button>
            </form>
          </div>

          <div className="mobile-menu-links" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
            <div>
              <h4 style={{ color: 'var(--gray)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>Laptop Parts</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <Link to="/shop/laptop-parts/screens" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Screens</Link>
                <Link to="/shop/laptop-parts/batteries" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Batteries</Link>
                <Link to="/shop/laptop-parts/chargers" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Chargers</Link>
                <Link to="/shop/laptop-parts/memory" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Memory (RAM)</Link>
                <Link to="/shop/laptop-parts/keyboards" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Keyboards</Link>
                <Link to="/shop/laptop-parts/storage" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Storage</Link>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--gray)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>MacBook Parts</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <Link to="/shop/macbook-parts/screens" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Screens</Link>
                <Link to="/shop/macbook-parts/batteries" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Batteries</Link>
                <Link to="/shop/macbook-parts/chargers" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Chargers</Link>
                <Link to="/shop/macbook-parts/keyboards" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Keyboards</Link>
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--gray)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>Computers</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <Link to="/shop/used-laptops" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Refurb Laptops</Link>
                <Link to="/shop/desktops" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Desktops</Link>
                <Link to="/shop/gaming-computers" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Gaming PCs</Link>
                <Link to="/shop/monitors" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>Monitors</Link>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--gray)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <Link to="/shop/repairs" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--navy)' }}>Book a Repair</Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.95rem' }}>View Quote</Link>
              </div>
            </div>
          </div>

          <div className="mobile-menu-footer">
            {user && !user.isAnonymous ? (
              <>
                <div style={{ padding: '1rem', fontWeight: 'bold' }}>Hi, {user.displayName}</div>
                {user.isAdmin && <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ padding: '1rem', display: 'block', color: 'var(--lime)' }}>Admin Dashboard</Link>}
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} style={{ width: '100%', padding: '1rem', textAlign: 'left', color: 'red' }}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '1rem', fontWeight: 'bold' }}>Login / Register</Link>
            )}
            <a href="tel:+27621172653" style={{ display: 'block', padding: '1rem', fontWeight: 'bold', borderTop: '1px solid #eee' }}>Call Us: 062 117 2653</a>
          </div>
        </div>
      </div>

    </div>
  );
}
