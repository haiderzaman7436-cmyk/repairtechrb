import { useState, useEffect } from 'react';

export default function ShopHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      imgSrc: '/images/banner_casing.webp',
      tag: 'PREMIUM REPLACEMENT PARTS',
      title: 'LAPTOP CASINGS',
      desc: 'Replacement hinges, palm rests, bezels and bottom covers for all major laptop brands. If your laptop hinges broke, let us fix them for you.',
      btnText: 'SHOP LAPTOP COVERS',
      imgLabel: 'Laptop replacement covers',
    },
    {
      id: 2,
      imgSrc: '/images/banner_macbook.webp',
      tag: 'EXPERT APPLE REPAIR',
      title: 'MACBOOK PARTS',
      desc: 'Get your MacBook running like new with our high-quality replacement parts. From retina screens to batteries, we have it all.',
      btnText: 'SHOP MAC PARTS',
      imgLabel: 'MacBook repairs',
    },
    {
      id: 3,
      imgSrc: '/images/banner_upgrades.webp',
      tag: 'UPGRADE YOUR SPEED',
      title: 'High-Performance SSDs & RAM',
      desc: 'Dramatically increase your computer\'s performance with our top-tier solid state drives and memory modules.',
      btnText: 'SHOP UPGRADES',
      imgLabel: 'Performance Upgrades',
    },
    {
      tag: 'REFURBISHED LAPTOPS',
      title: 'A-Grade Used Laptops',
      desc: 'Quality tested, fully refurbished laptops with a warranty. Save money without compromising on reliability and performance.',
      btnText: 'SHOP REFURBISHED',
      imgLabel: 'Refurbished Laptops',
      imgSrc: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=80',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div
      className="shop-hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--navy)'
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          <img 
            src={slide.imgSrc} 
            alt={slide.imgLabel} 
            fetchPriority={index === 0 ? "high" : "auto"} 
            decoding={index === 0 ? "sync" : "async"}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
          />
          {/* Dark gradient overlay for text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.4) 100%)',
          }}></div>
        </div>
      ))}

      <div className="container shop-hero-inner" style={{ position: 'relative', zIndex: 2, display: 'flex', width: '100%' }}>
        <div className="shop-hero-content" key={currentSlide} style={{ animation: 'fadeIn 0.8s ease-out', maxWidth: '650px', padding: 'clamp(2rem, 8vw, 4rem) 0' }}>
          <div className="shop-hero-tag" style={{ background: 'var(--lime)', color: 'var(--navy)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem', display: 'inline-block', padding: '6px 12px', borderRadius: '4px', fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>{slides[currentSlide].tag}</div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: '1.2' }}>{slides[currentSlide].title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1rem, 4vw, 1.25rem)', marginBottom: '2.5rem', lineHeight: '1.6' }}>{slides[currentSlide].desc}</p>
          <button className="btn btn-lime shop-hero-btn" style={{ padding: '1rem 2rem', fontSize: '1rem', color: 'white', border: 'none' }}>{slides[currentSlide].btnText}</button>
        </div>
      </div>

      <div className="shop-hero-dots" style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', zIndex: 3 }}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            style={{
              cursor: 'pointer',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              margin: '0 6px',
              background: 'white',
              opacity: index === currentSlide ? 1 : 0.3,
              transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
