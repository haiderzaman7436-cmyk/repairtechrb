import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Truck, Star, MessageCircle, ShieldCheck } from 'lucide-react';

export default function ShopNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const links = [
    { label: 'LAPTOP PARTS', to: '/shop', dropdown: ['Memory', 'Screens', 'Chargers', 'Batteries', 'Keyboards', 'Storage'] },
    { label: 'MACBOOK PARTS', to: '/shop', dropdown: ['Screens', 'Batteries', 'Chargers', 'Keyboards', 'Mac RAM/SSD'] },
    { label: 'USED/REFURBS', to: '/shop', dropdown: ['Gaming', 'Laptops', 'Desktops', 'Monitors', 'Servers', 'Components'] },
    { label: 'GADGETS', to: '/shop', dropdown: ['Screen', 'Batteries', 'Back Covers', 'Charging Port', 'Accessories'] },
    { label: 'NETWORK', to: '/shop', dropdown: ['Routers', 'Switches', 'Access Points', 'Server Parts', 'Transceivers (SFP)'] },
    { label: 'REPAIRS', to: '/shop', dropdown: ['Book a Repair', 'Laptop Repair', 'MacBook Repair', 'Screen Replacement', 'Phone Repair', 'Data Recovery', 'SSD & RAM Upgrades'] },
    { label: 'ABOUT US', to: '/about' },
    { label: 'CONTACT', to: '/contact' },
    { label: 'ACCOUNT', to: '/account' },
    { label: 'CHECKOUT', to: '/checkout' }
  ];

  const handleLinkClick = (e: React.MouseEvent, idx: number, hasDropdown: boolean) => {
    if (hasDropdown && window.innerWidth <= 1024) {
      e.preventDefault();
      setHoveredIndex(hoveredIndex === idx ? null : idx);
      return;
    }
    setHoveredIndex(null);
  };

  return (
    <>
      <nav className="shop-nav">
        <div className="container shop-nav-inner">
          {links.map((link, idx) => (
            <div 
              key={idx} 
              className={`shop-nav-item ${link.dropdown ? 'has-dropdown' : ''}`}
              onMouseEnter={() => { if (window.innerWidth > 1024) setHoveredIndex(idx); }}
              onMouseLeave={() => { if (window.innerWidth > 1024) setHoveredIndex(null); }}
            >
              <Link 
                onClick={(e) => handleLinkClick(e, idx, !!link.dropdown)} 
                to={link.to} 
                className="shop-nav-link" 
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {link.label} {link.dropdown && <ChevronDown size={14} className="dropdown-arrow" />}
              </Link>
              {link.dropdown && (
                <div className={`shop-dropdown-menu ${hoveredIndex === idx ? 'is-open' : ''}`}>
                  <div className="shop-dropdown-border"></div>
                  {link.dropdown.map((sub, subIdx) => (
                    <Link 
                      key={subIdx} 
                      to={
                        link.label === 'MACBOOK PARTS' && sub === 'Screens' ? '/shop/macbook-parts/screens' :
                        link.label === 'MACBOOK PARTS' && sub === 'Batteries' ? '/shop/macbook-parts/batteries' :
                        link.label === 'MACBOOK PARTS' && sub === 'Chargers' ? '/shop/macbook-parts/chargers' :
                        link.label === 'MACBOOK PARTS' && sub === 'Keyboards' ? '/shop/macbook-parts/keyboards' :
                        link.label === 'LAPTOP PARTS' && sub === 'Screens' ? '/shop/laptop-parts/screens' :
                        link.label === 'LAPTOP PARTS' && sub === 'Batteries' ? '/shop/laptop-parts/batteries' :
                        link.label === 'LAPTOP PARTS' && sub === 'Chargers' ? '/shop/laptop-parts/chargers' :
                        link.label === 'LAPTOP PARTS' && sub === 'Keyboards' ? '/shop/laptop-parts/keyboards' :
                        sub === 'Memory' ? '/shop/laptop-parts/memory' : 
                        sub === 'Storage (HDD/SSD)' ? '/shop/laptop-parts/storage' : 
                        '/shop'
                      } 
                      className="shop-dropdown-item"
                      onClick={() => setHoveredIndex(null)}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      <div className="shop-trust-bar">
        <div className="container shop-trust-inner">
          <div className="trust-item">
            <span className="trust-icon"><Truck size={24} /></span>
            <div>
              <strong>DELIVERY OR COLLECTION</strong>
              <span>Nationwide delivery / Collect in store</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><Star size={24} fill="currentColor" /></span>
            <div>
              <strong>RATINGS AND REVIEWS</strong>
              <span>Nothing proves our claim like our reviews</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><MessageCircle size={24} /></span>
            <div>
              <strong>INDUSTRY SUPPORT</strong>
              <span>Speak to someone who actually understands</span>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon"><ShieldCheck size={24} /></span>
            <div>
              <strong>6-MONTH WARRANTY</strong>
              <span>On all replaced or refurbished parts</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
