import { useState, useEffect } from 'react';

export default function FeaturedProduct() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 3,
    minutes: 9,
    seconds: 57
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          return prev;
        }
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="shop-featured-banner">
      <div className="container shop-featured-inner">
        <div className="shop-featured-img-box">
          <div className="shop-featured-vertical-text">Dell Latitude 5420</div>
          <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80" alt="Dell Latitude 5420" className="shop-featured-img" />
          <div className="shop-featured-specs-grid" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', justifyContent: 'center' }}>
            <div className="spec-icon" style={{ background: 'var(--gray-light)', color: 'var(--navy)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #eaeaea' }}>Intel Core i5</div>
            <div className="spec-icon" style={{ background: 'var(--gray-light)', color: 'var(--navy)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #eaeaea' }}>512GB SSD</div>
            <div className="spec-icon" style={{ background: 'var(--gray-light)', color: 'var(--navy)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #eaeaea' }}>16GB RAM</div>
            <div className="spec-icon" style={{ background: 'var(--gray-light)', color: 'var(--navy)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #eaeaea' }}>Win 11 Pro</div>
            <div className="spec-icon" style={{ background: 'var(--gray-light)', color: 'var(--navy)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #eaeaea' }}>14" FHD</div>
          </div>
        </div>

        <div className="shop-featured-content">
          <div className="shop-featured-tag" style={{ background: 'var(--navy)', color: 'var(--white)', padding: '0.3rem 0.8rem', display: 'inline-block', fontWeight: '900', fontSize: '0.85rem', marginBottom: '1.5rem', borderRadius: '4px', letterSpacing: '1px' }}>LIMITED OFFER</div>
          <h2 className="shop-featured-title" style={{ color: 'var(--navy)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: '1.2', marginBottom: '1.5rem', fontWeight: '900' }}>Dell Latitude 5420 11th Gen Core i5 - 1145G7 512GB SSD 16GB RAM Win 11 Pro Laptop (Used On Special)</h2>
          <p className="shop-featured-desc" style={{ color: 'var(--gray-dark)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            The Dell Latitude 5420 is a powerful, reliable laptop featuring an 11th Gen Core i5, 16GB RAM and a fast 512GB SSD. Built for productivity, seamless multitasking and Thunderbolt 4.
          </p>
          
          <div className="shop-featured-price-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="shop-featured-price" style={{ color: 'var(--navy)', fontSize: '2.5rem', fontWeight: '900' }}>Contact for price</div>
            <div className="shop-featured-save" style={{ background: 'var(--gray-light)', color: 'var(--navy)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '900', border: '1px solid var(--navy)' }}>SAVE 10%</div>
          </div>

          <div className="shop-countdown" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            <div className="countdown-box" style={{ background: 'var(--gray-light)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '70px', color: 'var(--navy)', border: '1px solid #eaeaea' }}><span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{String(timeLeft.days).padStart(2, '0')}</span><div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>DAYS</div></div>
            <div className="countdown-box" style={{ background: 'var(--gray-light)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '70px', color: 'var(--navy)', border: '1px solid #eaeaea' }}><span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{String(timeLeft.hours).padStart(2, '0')}</span><div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>HRS</div></div>
            <div className="countdown-box" style={{ background: 'var(--gray-light)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '70px', color: 'var(--navy)', border: '1px solid #eaeaea' }}><span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{String(timeLeft.minutes).padStart(2, '0')}</span><div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>MINS</div></div>
            <div className="countdown-box" style={{ background: 'var(--gray-light)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '70px', color: 'var(--navy)', border: '1px solid #eaeaea' }}><span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{String(timeLeft.seconds).padStart(2, '0')}</span><div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>SECS</div></div>
          </div>

          <div className="shop-featured-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button style={{ padding: '1rem 2rem', background: 'var(--navy)', color: 'var(--white)', border: 'none', borderRadius: '6px', fontWeight: '900', cursor: 'pointer', flex: '1', minWidth: '200px', fontSize: '1.1rem', letterSpacing: '1px' }}>ADD TO CART</button>
            <button style={{ padding: '1rem 2rem', background: '#25D366', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '900', cursor: 'pointer', flex: '1', minWidth: '200px', fontSize: '1.1rem', letterSpacing: '1px' }}>WHATSAPP US</button>
          </div>
        </div>
      </div>
    </div>
  );
}
