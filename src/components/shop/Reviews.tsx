import { Star } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: 'Thabo Mokoena',
      time: '2 weeks ago',
      text: 'Absolutely brilliant service in Rosebank. My MacBook Pro screen was cracked and they replaced it the exact same day. Highly professional, premium experience, and the pricing was very fair compared to the iStore.',
      rating: 5,
      avatar: 'T'
    },
    {
      name: 'Johan van der Merwe',
      time: '1 month ago',
      text: 'Brought my water-damaged business laptop here after a shop in Sandton told me it was dead. The technicians at RepairTech managed to recover all my critical data and fix the motherboard. Absolute lifesavers!',
      rating: 5,
      avatar: 'J'
    },
    {
      name: 'Lerato Kumalo',
      time: '3 months ago',
      text: 'Fast, efficient, and incredibly honest. Replaced my iPhone battery in 30 minutes while I waited in The Zone. My phone feels brand new again. Will definitely be coming back for any future tech repairs.',
      rating: 5,
      avatar: 'L'
    }
  ];

  return (
    <section style={{ padding: 'clamp(3rem, 5vw, 5rem) clamp(1rem, 4vw, 2rem)', background: 'var(--white)' }}>
      <div className="container section-center">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '100px', marginBottom: '1rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span style={{ fontWeight: 'bold', color: 'var(--navy)' }}>4.7 Rating on Google Reviews</span>
          </div>
          <h2 style={{ color: 'var(--navy)', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-serif)', fontWeight: 800 }}>Trusted by Thousands</h2>
          <p style={{ color: 'var(--gray-dark)', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>Don't just take our word for it. See what our customers in Rosebank have to say about our repair services.</p>
        </div>

        <div className="mobile-stack-grid">
          {reviews.map((review, i) => (
            <div key={i} style={{ 
              background: 'var(--white)', 
              padding: 'clamp(1.5rem, 5vw, 2rem)', 
              borderRadius: '16px', 
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div className="review-card-content" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem' }}>
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={20} fill="#FBBC05" color="#FBBC05" />
                  ))}
                </div>
                <p style={{ color: 'var(--navy)', fontSize: '1.05rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2rem' }}>
                  "{review.text}"
                </p>
              </div>
              <div className="review-author" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '50%', 
                  background: 'var(--navy)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  {review.avatar}
                </div>
                <div>
                  <h4 style={{ color: 'var(--navy)', fontSize: '1rem', margin: 0, fontWeight: 700 }}>{review.name}</h4>
                  <span style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>{review.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
