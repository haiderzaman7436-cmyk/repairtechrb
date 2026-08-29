import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <section style={{ background: 'var(--gray-light)', padding: '5rem 2rem' }}>
        <div className="container section-center">
          <div className="section-overline">Our workspace</div>
          <h2 style={{ color: 'var(--navy)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', marginBottom: '2rem' }}>Professional workshop in Rosebank</h2>
          <div className="workspace-grid">
            <div className="workspace-img">
              <img src="/images/banner_casing.webp" alt="Repair Tech shop front at The Median building" loading="lazy" className="workspace-gallery-img" />
              <div className="label" style={{ marginTop: '0.75rem', fontWeight: 'bold', color: 'var(--navy)' }}>The Median building, Rosebank, 50 Bath Avenue</div>
            </div>
            <div className="workspace-img">
              <img src="/images/banner_macbook.webp" alt="Repair Tech professional repair workshop" loading="lazy" className="workspace-gallery-img" />
              <div className="label" style={{ marginTop: '0.75rem', fontWeight: 'bold', color: 'var(--navy)' }}>Professional Repair Workshop</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ background: 'var(--navy)', color: 'var(--white)' }}>
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.6rem', color: 'var(--white)', marginBottom: '0.75rem' }}>
              Repair <span style={{ color: 'var(--white)', fontWeight: 900 }}>Tech</span>
            </h3>
            <p>Rosebank's most trusted computer repair shop since 2008. Expert service, thousands of devices repaired, 4.7★ on Google.</p>
            <p style={{ fontStyle: 'italic', fontSize: '0.82rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.35)' }}>Replacement parts & refurbished devices: 6-month warranty. Repair jobs: 3-month warranty.</p>
            <div className="footer-socials">
              <a href="#" title="Coming Soon" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="#" title="Coming Soon" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
              <a href="https://www.tiktok.com/@repair.tech5?_r=1&_t=ZS-98vyRpbdGQG" aria-label="TikTok"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg></a>
              <a href="#" title="Coming Soon" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z"/></svg></a>
              <a href="#" title="Coming Soon" aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.94 29.94 0 001 12a29.94 29.94 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29.94 29.94 0 0023 12a29.94 29.94 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>
              <a href="#" title="Coming Soon" aria-label="X"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            </div>
          </div>
          <div>
            <h4>Repairs</h4>
            <Link to="/shop/repairs?service=Phone%20Repair">Phone Repair</Link>
            <Link to="/shop/repairs?service=Laptop%20Repair">Laptop Repair</Link>
            <Link to="/shop/repairs?service=Data%20Recovery">Data Recovery</Link>
            <Link to="/shop/repairs?service=MacBook%20Repair">MacBook Repair</Link>
            <Link to="/shop/repairs?service=Screen%20Replacement">Screen Replacement</Link>
            <Link to="/shop/repairs?service=SSD%20%26%20RAM%20Upgrades">SSD &amp; RAM Upgrades</Link>
          </div>
          <div>
            <h4>Pages</h4>
            <Link to="/shop">Shop</Link>
            <Link to="/">About Us</Link>
            <Link to="/">Our Work</Link>
            <Link to="/shop/repairs">Book In Device</Link>
            <Link to="/shop/repairs">Get Quotes</Link>
            <Link to="/shop/repairs">Repair Status</Link>
            <Link to="/">E-Waste Recycling</Link>
            <Link to="/">Contact &amp; Directions</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <Link to="/">Repair Policy</Link>
            <Link to="/">Return Policy</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Payment Policy</Link>
            <Link to="/">Shipping Policy</Link>
            <Link to="/">Warranty Policy</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="tel:+27621172653">Telephone: +27 62 117 2653</a>
            <a href="https://wa.me/27621172653">WhatsApp: +27 62 117 2653</a>
            <a href="mailto:info@repairtechrb.co.za">Email: info@repairtechrb.co.za</a>
            <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '0.5rem' }}>The Median building<br />50 Bath Avenue<br />Rosebank, Johannesburg, South Africa</span>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Repair Tech. All Rights Reserved - Developed By <a href="https://fixgosolutions.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime)', textDecoration: 'none', fontWeight: 'bold' }}>FixGoSolutions</a>
        </div>
      </footer>
    </>
  );
}
