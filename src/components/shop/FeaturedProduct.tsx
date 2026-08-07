export default function FeaturedProduct() {
  return (
    <div className="shop-featured-banner">
      <div className="container shop-featured-inner">
        <div className="shop-featured-img-box">
          <div className="shop-featured-vertical-text">Dell Latitude 5420</div>
          <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" alt="Dell Latitude 5420" className="shop-featured-img" />
          <div className="shop-featured-specs-grid">
            <div className="spec-icon">Intel Core i5</div>
            <div className="spec-icon">512GB SSD</div>
            <div className="spec-icon">16GB RAM</div>
            <div className="spec-icon">Win 11 Pro</div>
            <div className="spec-icon">14" FHD</div>
          </div>
        </div>

        <div className="shop-featured-content">
          <div className="shop-featured-tag">LIMITED OFFER</div>
          <h2 className="shop-featured-title">Dell Latitude 5420 11th Gen Core i5 - 1145G7 512GB SSD 16GB RAM Win 11 Pro Laptop (Used On Special)</h2>
          <p className="shop-featured-desc">
            The Dell Latitude 5420 is a powerful, reliable laptop featuring an 11th Gen Core i5, 16GB RAM and a fast 512GB SSD. Built for productivity, seamless multitasking and Thunderbolt 4.
          </p>
          
          <div className="shop-featured-price-row">
            <div className="shop-featured-price">R 6,374.15</div>
            <div className="shop-featured-price-old">R 6,999.00</div>
            <div className="shop-featured-save">SAVE 10%</div>
          </div>

          <div className="shop-countdown">
            <div className="countdown-box"><span>00</span><div>DAYS</div></div>
            <div className="countdown-box"><span>03</span><div>HRS</div></div>
            <div className="countdown-box"><span>09</span><div>MINS</div></div>
            <div className="countdown-box"><span>57</span><div>SECS</div></div>
          </div>

          <div className="shop-featured-actions">
            <button className="btn btn-lime">ADD TO CART</button>
            <button className="btn btn-navy" style={{ background: 'var(--navy-dark)', border: '1px solid rgba(255,255,255,0.2)' }}>WHATSAPP US</button>
          </div>
        </div>
      </div>
    </div>
  );
}
