import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Phone, User, ShoppingCart, Menu, X, MapPin, Clock } from 'lucide-react';
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
      {/* Top Bar - Location & Hours */}
      <div className="top-bar hide-on-mobile" style={{ background: 'var(--navy-dark)', color: '#ffffff', padding: '8px 2rem', fontSize: '0.85rem', fontWeight: '500' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="#ffffff" />
            <span>The Median building, 50 Bath Avenue, Rosebank, Johannesburg, 2196, South Africa</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid rgba(255,255,255,0.4)', paddingLeft: '24px' }}>
            <Clock size={16} color="#ffffff" />
            <span>Mon-Fri 09:00 AM - 09:00 PM | Sat-Sun 09:00 AM - 08:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="shop-main-header" style={{ background: '#ffffff' }}>
        <div className="container shop-header-inner">
          <Link to="/" className="shop-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '12px' }}>
            <img src="/logos/logo.png" alt="Repair Tech Logo" width="54" height="54" style={{ height: '54px', width: '54px', objectFit: 'contain', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--navy-dark)', lineHeight: 1, letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
                Repair Tech
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--gray-dark)', fontWeight: 700, letterSpacing: '1px', marginTop: '4px', textTransform: 'uppercase', display: 'none' }}>
                Cell Phone & Computer Repairs
              </span>
            </div>
          </Link>
          
          <form onSubmit={handleSearch} className="shop-search">
            <select id="search-category" name="category" aria-label="Search Category" className="shop-search-category" style={{ padding: '0 1rem', border: 'none', borderRight: '1px solid #e2e8f0', background: '#f8f9fa', outline: 'none', color: '#0f172a', fontWeight: '600', cursor: 'pointer' }}>
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

            <Link to="/cart" className="shop-action-item" aria-label="View Cart">
              <span className="shop-action-icon" style={{ color: 'var(--lime)', position: 'relative' }}>
                <ShoppingCart size={22} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </span>
              <div className="hide-on-mobile">
                <div className="shop-action-val">Request Quote</div>
                <div className="shop-action-label">{totalItems} Items</div>
              </div>
            </Link>

            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Mobile Menu">
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
