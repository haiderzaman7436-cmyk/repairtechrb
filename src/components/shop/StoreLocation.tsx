import { MapPin, Phone, Clock, Mail } from 'lucide-react';

export default function StoreLocation() {
  return (
    <section style={{ padding: 'clamp(3rem, 5vw, 5rem) clamp(1rem, 4vw, 2rem)', background: 'var(--gray-light)' }}>
      <div className="container section-center">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--navy)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-serif)', fontWeight: 800 }}>Visit Our Repair Center</h2>
          <p style={{ color: 'var(--gray-dark)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>Located in the heart of Rosebank, Johannesburg. Drop in for a quick diagnostic or same-day repair.</p>
        </div>

        <div className="mobile-stack-grid" style={{ background: 'var(--white)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
          
          <div className="store-info-col" style={{ padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1.25rem, 5vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 700 }}>RepairTech Rosebank</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="contact-item" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: 'var(--lime)', marginTop: '2px' }}><MapPin size={24} /></div>
                <div>
                  <h4 style={{ color: 'var(--navy)', fontSize: '1rem', margin: '0 0 0.25rem' }}>Address</h4>
                  <p style={{ color: 'var(--gray-dark)', margin: 0, lineHeight: 1.5 }}>The Median building<br/>50 Bath Avenue<br/>Rosebank, Johannesburg, 2196</p>
                </div>
              </div>
              
              <div className="contact-item" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: 'var(--lime)', marginTop: '2px' }}><Phone size={24} /></div>
                <div>
                  <h4 style={{ color: 'var(--navy)', fontSize: '1rem', margin: '0 0 0.25rem' }}>Contact</h4>
                  <p style={{ color: 'var(--gray-dark)', margin: 0 }}>+27 62 117 2653</p>
                </div>
              </div>

              <div className="contact-item" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: 'var(--lime)', marginTop: '2px' }}><Mail size={24} /></div>
                <div>
                  <h4 style={{ color: 'var(--navy)', fontSize: '1rem', margin: '0 0 0.25rem' }}>Email</h4>
                  <p style={{ color: 'var(--gray-dark)', margin: 0 }}>info@repairtechrb.co.za</p>
                </div>
              </div>
              
              <div className="contact-item" style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ color: 'var(--lime)', marginTop: '2px' }}><Clock size={24} /></div>
                <div>
                  <h4 style={{ color: 'var(--navy)', fontSize: '1rem', margin: '0 0 0.25rem' }}>Business Hours</h4>
                  <p style={{ color: 'var(--gray-dark)', margin: 0, lineHeight: 1.5 }}>Monday - Friday: 9:00 AM - 9:00 PM<br/>Saturday - Sunday: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=The+Median+building,+50+Bath+Avenue,+Rosebank,+Johannesburg" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--navy)',
                  color: 'var(--white)',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'background 0.2s',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--lime)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--navy)'}
              >
                <MapPin size={18} />
                Get Directions
              </a>
            </div>
          </div>
          
          <div style={{ minHeight: 'clamp(350px, 80vw, 500px)', width: '100%', position: 'relative' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.821915668615!2d28.0416972!3d-26.1457811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c9535e5d381%3A0xc484b39707248e3d!2sThe%20Median%20Rosebank!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza" 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="RepairTech Rosebank Map Location"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
