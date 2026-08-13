import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Info, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const product = location.state?.product;

  useEffect(() => {
    // If someone visits /product/:id directly without state, we don't have the product data.
    // For a real app we'd fetch it. For now, redirect to shop if no product data.
    if (!product) {
      navigate('/shop');
    }
    window.scrollTo(0, 0);
  }, [product, navigate]);

  if (!product) return null;

  // Helper to guess specs based on title
  const guessSpecs = (title: string, category: string) => {
    const specs: Record<string, string> = {
      'Part Type': category,
    };
    
    // Guess compatibility
    if (title.toLowerCase().includes('macbook pro')) specs['Compatibility'] = 'MacBook Pro';
    else if (title.toLowerCase().includes('macbook air')) specs['Compatibility'] = 'MacBook Air';
    else if (title.toLowerCase().includes('macbook')) specs['Compatibility'] = 'MacBook';
    else specs['Compatibility'] = 'Universal / See Title';

    // Guess size
    const sizeMatch = title.match(/(\d{2}(\.\d)?)\s*(-inch|inch|")/i);
    if (sizeMatch) specs['Size'] = `${sizeMatch[1]}-inch`;

    // Add generic specs based on category
    if (category.includes('SCREEN')) {
      specs['Resolution'] = 'Standard / Retina (Depending on exact model)';
      specs['Colour'] = title.toLowerCase().includes('silver') ? 'Silver' : title.toLowerCase().includes('space gray') ? 'Space Gray' : 'Standard';
    } else if (category.includes('BATTERY')) {
      specs['Capacity'] = 'OEM Standard Capacity';
      specs['Voltage'] = 'Model Specific';
    } else if (category.includes('CHARGER')) {
      specs['Wattage'] = title.match(/(\d{2,3})W/i)?.[0] || 'Standard';
      specs['Connector'] = title.includes('Type C') ? 'USB-C' : title.includes('MagSafe') ? 'MagSafe' : 'Standard';
    }

    return specs;
  };

  const specs = guessSpecs(product.title, product.category);
  const sku = `UAP-${product.id}-${new Date().getFullYear()}-ASSY`;
  const waMessage = encodeURIComponent(`Hi, I'm interested in the ${product.title} (SKU: ${sku}) priced at ${product.price}.`);
  const waLink = `https://wa.me/27685011885?text=${waMessage}`;

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb" style={{ margin: '2rem 0', fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
          Home &gt; {product.category} &gt; {product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title}
        </div>

        <div className="pdp-layout">
          {/* Images Section */}
          <div className="pdp-gallery">
            {product.isUsed && <span className="pdp-tag-used">USED</span>}
            <div className="pdp-main-image-container" style={{ position: 'relative' }}>
              <div className="premium-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                VERIFIED PART
              </div>
              <img src={product.image.split('?')[0] + '?v=2'} alt={product.title} className="pdp-main-image" />
            </div>
            {/* Mock Thumbnails */}
            <div className="pdp-thumbnails">
              <div className="pdp-thumbnail active"><img src={product.image.split('?')[0] + '?v=2'} alt="Thumb 1" /></div>
              <div className="pdp-thumbnail"><img src={product.image.split('?')[0] + '?v=2'} alt="Thumb 2" /></div>
              <div className="pdp-thumbnail"><img src={product.image.split('?')[0] + '?v=2'} alt="Thumb 3" /></div>
              <div className="pdp-thumbnail"><img src={product.image.split('?')[0] + '?v=2'} alt="Thumb 4" /></div>
            </div>
          </div>

          {/* Info Section */}
          <div className="pdp-info">
            <h1 className="pdp-title">{product.title}</h1>
            
            <div className="pdp-meta">
              <span>SKU: <strong>{sku}</strong></span>
              <span>Type: <strong>{product.category}</strong></span>
              <span>Brand: <strong>RepairTech</strong></span>
            </div>

            <div className="pdp-price">{product.price}</div>
            <div className="pdp-delivery-hint">Free collection from Rosebank</div>

            <div className="pdp-stock-box">
              <div className="pdp-stock-title">
                {product.inStock ? <><Check size={16} /> IN STOCK AT LOCAL SUPPLIER</> : <><Info size={16} /> OUT OF STOCK</>}
              </div>
              <p className="pdp-stock-text">
                If ordered before 10AM, delivered in 1-2 business days (main centres) or 4-6 business days (regional areas or large items). Collection from Asetos available in 1-2 business days.
              </p>
            </div>

            <div className="pdp-actions">
              <div className="pdp-qty-group">
                <button className="pdp-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <input type="text" className="pdp-qty-input" value={qty} readOnly />
                <button className="pdp-qty-btn" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button className="btn btn-navy pdp-add-to-cart" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>

            <a href={waLink} target="_blank" rel="noopener noreferrer" className="pdp-whatsapp-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              ENQUIRE ON WHATSAPP
            </a>

            <div className="pdp-payment-promo">
              Or pay from <strong>R{Math.floor(product.priceNum / 12)}.00/month</strong> with <strong>Mobicred</strong>. Select Mobicred at checkout.
            </div>

            <div className="pdp-returns-box">
              <strong>Returns (Online orders only):</strong> 7 days from delivery to inspect and confirm the item matches its description. Must be returned in the condition supplied, with all packaging and accessories, not set up or used as a working device. Refunds processed within 30 days. <a href="#">Read our Ts & Cs for more details.</a>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="pdp-tabs-container">
          <div className="pdp-tabs">
            <button 
              className={`pdp-tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              PRODUCT DESCRIPTION
            </button>
            <button 
              className={`pdp-tab ${activeTab === 'terms' ? 'active' : ''}`}
              onClick={() => setActiveTab('terms')}
            >
              TERMS & CONDITIONS
            </button>
          </div>

          <div className="pdp-tab-content">
            {activeTab === 'description' && (
              <div className="pdp-description-content">
                <p>This is a high quality replacement part for your device. It restores your device to full functionality so it works like new again. Please ensure compatibility with your specific model before purchasing.</p>
                
                <table className="pdp-specs-table">
                  <tbody>
                    {Object.entries(specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="pdp-spec-label">
                          <ShieldCheck size={16} style={{ color: 'var(--lime)', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                          {key}
                        </td>
                        <td className="pdp-spec-value">
                          <strong>{value}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pdp-info-blocks">
                  <div className="pdp-info-block">
                    <strong>Delivery:</strong> In stock at our Rosebank branch (Shop G15, The Zone, Rosebank); collect same day or get nationwide courier delivery in 1 to 2 business days.
                  </div>
                  <div className="pdp-info-block">
                    <strong>Condition:</strong> {product.isUsed ? 'A pre-owned (second hand) part in perfect condition, tested and backed by our warranty.' : 'A brand new replacement part, tested and backed by our warranty.'}
                  </div>
                  <div className="pdp-info-block">
                    <strong>Please note:</strong> The price is for the part only and excludes fitting; professional installation is available at our Rosebank branch. Please confirm compatibility with your device before ordering, or call or WhatsApp us on 068 501 1885 for help.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="pdp-terms-content">
                <h3>Standard Warranty & Returns</h3>
                <p>All our products come with a 6-month warranty against manufacturing defects. If you experience any issues, please contact our support team. Physical damage, liquid damage, or improper installation is not covered under warranty.</p>
                <p>For more detailed information, please review our full Terms & Conditions policy on our website.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
