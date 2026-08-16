import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    address: '',
    phone: '',
    city: ''
  });

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Save order to Firebase Firestore
    try {
      const orderData = {
        date: new Date().toISOString(),
        customer: formData,
        userId: user?.uid || null,
        items: items,
        total: totalPrice,
        status: 'Pending'
      };
      
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      const orderId = docRef.id;
      
      clearCart();
      
      // Redirect to WhatsApp for quote/confirmation
      const text = `Hi, I just placed a quote request (ID: ${orderId}). Can you provide a final price?`;
      window.location.href = `https://wa.me/27621172653?text=${encodeURIComponent(text)}`;
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to process order. Please try again or contact support.");
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page" style={{ padding: '4rem 0', background: 'var(--gray-light)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ color: 'var(--navy)', marginBottom: '2rem' }}>Checkout</h1>
        
        <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--navy)', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Shipping Details</h3>
          
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label htmlFor="checkout-name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Full Name</label>
                <input id="checkout-name" required name="name" autoComplete="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
              <div>
                <label htmlFor="checkout-email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Email</label>
                <input id="checkout-email" required type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
            </div>
            
            <div>
              <label htmlFor="checkout-phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Phone Number</label>
              <input id="checkout-phone" type="tel" required name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div>
              <label htmlFor="checkout-address" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Delivery Address</label>
              <input id="checkout-address" required name="address" autoComplete="street-address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div>
              <label htmlFor="checkout-city" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>City</label>
              <input id="checkout-city" required name="city" autoComplete="address-level2" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.2rem', color: 'var(--navy)' }}>
                Total to pay: <span style={{ fontWeight: 'bold' }}>Contact for price</span>
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: '4px', border: 'none', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? 'Processing...' : 'Request Quote via WhatsApp'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
