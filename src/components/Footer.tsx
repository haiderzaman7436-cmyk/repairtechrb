export default function Footer() {
  return (
    <>
      <section style={{ background: 'var(--gray-light)', padding: '5rem 2rem' }}>
        <div className="container section-center">
          <div className="section-overline">Our workspace</div>
          <h2 style={{ color: 'var(--navy)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', marginBottom: '2rem' }}>Professional workshop in Rosebank</h2>
          <div className="workspace-grid">
            <div className="workspace-img">
              <img src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80" alt="Repair Tech shop front at The Median building" loading="lazy" width="1530" height="1172" />
              <div className="label">The Median building, Rosebank, 50 Bath Avenue</div>
            </div>
            <div className="workspace-img">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80" alt="Repair Tech professional repair workshop" loading="lazy" width="1280" height="853" />
              <div className="label">Professional Repair Workshop</div>
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
              <a href="https://www.facebook.com/AsetosComputers" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="https://www.instagram.com/asetoscomputers/" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
              <a href="https://www.linkedin.com/in/AsetosComputers/" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z"/></svg></a>
              <a href="https://www.youtube.com/@AsetosComputers" aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.94 29.94 0 001 12a29.94 29.94 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29.94 29.94 0 0023 12a29.94 29.94 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>
              <a href="https://x.com/asetoscomputers" aria-label="X"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            </div>
          </div>
          <div>
            <h4>Repairs</h4>
            <a href="/phone-repair/">Phone Repair</a>
            <a href="/laptop-repair/">Laptop Repair</a>
            <a href="/data-recovery/">Data Recovery</a>
            <a href="/macbook-repair/">MacBook Repair</a>
            <a href="/screen-replacement/">Screen Replacement</a>
            <a href="/ssd-ram-upgrade/">SSD &amp; RAM Upgrades</a>
          </div>
          <div>
            <h4>Pages</h4>
            <a href="https://shop.asetos.co.za/">Shop</a>
            <a href="/about/">About Us</a>
            <a href="/our-work/">Our Work</a>
            <a href="/book-in/">Book In Device</a>
            <a href="/quotes/">Get Quotes</a>
            <a href="/repair-status/">Repair Status</a>
            <a href="/recycle/">E-Waste Recycling</a>
            <a href="/contact/">Contact &amp; Directions</a>
          </div>
          <div><h4>Legal</h4><a href="/repair-policy/">Repair Policy</a><a href="/returns/">Return Policy</a><a href="/privacy/">Privacy Policy</a><a href="/payments/">Payment Policy</a><a href="/shipping/">Shipping Policy</a><a href="/warranty/">Warranty Policy</a></div>
          <div>
            <h4>Contact</h4>
            <a href="tel:+27685011885">Telephone: +27 68 501 1885</a>
            <a href="https://wa.me/27685011885">WhatsApp: +27 68 501 1885</a>
            <a href="mailto:info@asetos.co.za">Email: info@asetos.co.za</a>
            <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '0.5rem' }}>The Median building<br />50 Bath Avenue<br />Rosebank, Johannesburg, South Africa</span>
          </div>
        </div>
        <div className="footer-bottom">&copy; 2026 Repair Tech. All rights reserved.</div>
      </footer>
    </>
  );
}
