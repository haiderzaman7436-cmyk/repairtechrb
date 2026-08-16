import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Wrench, Phone, MapPin, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function Repairs() {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState('General Repair');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      const decoded = decodeURIComponent(serviceParam);
      setSelectedService(decoded);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  const services = [
    'Laptop Repair', 
    'MacBook Repair', 
    'Screen Replacement', 
    'Phone Repair', 
    'Data Recovery', 
    'SSD & RAM Upgrades',
    'General Repair'
  ];

  return (
    <div className="repairs-page">
      <SEO 
        title="Laptop & Phone Repairs" 
        description="Expert laptop, MacBook, and phone repair services in Rosebank, Johannesburg. Same-day screen replacements and data recovery." 
      />
      {/* Hero Section */}
      <div className="repairs-hero" style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, #1a365d 100%)',
        color: 'var(--white)',
        padding: '5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '30px', marginBottom: '1.5rem' }}>
            <Wrench size={18} color="var(--lime)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px' }}>EXPERT REPAIR SERVICES</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', marginBottom: '1rem', fontFamily: 'var(--font-sans)', lineHeight: '1.1' }}>
            Fast, Reliable & <span style={{ color: 'var(--lime)' }}>Professional</span>
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', color: 'var(--gray-light)', opacity: 0.9 }}>
            From shattered screens to data recovery, our certified technicians in Rosebank are ready to bring your device back to life.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '4rem clamp(1.5rem, 4vw, 4rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Form Column */}
          <div className="repair-booking-card" style={{
            background: 'var(--white)',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--navy)' }}>Book a Repair</h2>
            <p style={{ color: 'var(--gray-dark)', marginBottom: '2rem', fontSize: '0.95rem' }}>Fill out the form below and we'll get back to you with a quote and timeline.</p>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f0fdf4', borderRadius: '16px', border: '1px solid #bbf7d0' }}>
                <CheckCircle2 size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#166534', marginBottom: '0.5rem' }}>Request Received!</h3>
                <p style={{ color: '#15803d', marginBottom: '1.5rem' }}>Thank you for reaching out. Our technicians will contact you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: '#166534', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  Book Another Repair
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy)', textTransform: 'uppercase' }}>Service Required</label>
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'var(--gray-light)', fontSize: '1rem', color: 'var(--navy)', outline: 'none' }}
                  >
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy)', textTransform: 'uppercase' }}>Full Name</label>
                    <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'var(--gray-light)', fontSize: '0.95rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy)', textTransform: 'uppercase' }}>Phone Number</label>
                    <input type="tel" required placeholder="062 117 2653" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'var(--gray-light)', fontSize: '0.95rem', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy)', textTransform: 'uppercase' }}>Device Model</label>
                  <input type="text" required placeholder="e.g. MacBook Pro M1 2020, iPhone 13" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'var(--gray-light)', fontSize: '0.95rem', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--navy)', textTransform: 'uppercase' }}>Describe the Issue</label>
                  <textarea required placeholder="Please describe what's wrong with your device..." rows={4} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'var(--gray-light)', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" style={{
                  background: 'var(--lime)',
                  color: 'var(--white)',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)' }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(14, 165, 233, 0.3)' }}
                >
                  Request a Quote <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Info Column */}
          <div className="repair-info">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--navy)' }}>Why Choose RepairTech?</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '1rem', borderRadius: '16px', color: 'var(--lime)' }}>
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--navy)' }}>6-Month Warranty</h4>
                  <p style={{ color: 'var(--gray-dark)', fontSize: '0.95rem', lineHeight: '1.5' }}>We stand by our work. All replacement parts and repair labor come with a comprehensive 6-month warranty.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '1rem', borderRadius: '16px', color: 'var(--lime)' }}>
                  <Clock size={28} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--navy)' }}>Express Turnaround</h4>
                  <p style={{ color: 'var(--gray-dark)', fontSize: '0.95rem', lineHeight: '1.5' }}>Most common repairs (like screen and battery replacements) are completed within 1-2 hours of drop-off.</p>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '3rem 0' }} />

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--navy)' }}>Contact Info</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <a href="tel:+27621172653" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'var(--navy)', fontWeight: '600' }}>
                <div style={{ background: 'var(--gray-light)', padding: '0.75rem', borderRadius: '12px' }}><Phone size={20} /></div>
                <span>062 117 2653</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--navy)', fontWeight: '600' }}>
                <div style={{ background: 'var(--gray-light)', padding: '0.75rem', borderRadius: '12px' }}><MapPin size={20} /></div>
                <span>Rosebank, Johannesburg</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
