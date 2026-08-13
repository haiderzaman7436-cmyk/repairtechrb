import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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
    
    // Simulate API call to save order to Firebase/Admin DB
    await new Promise(r => setTimeout(r, 1500));
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      customer: formData,
      items: items,
      total: totalPrice,
      status: 'Pending'
    };
    
    // Save to local storage for Admin Dashboard to read
    const existingOrders = JSON.parse(localStorage.getItem('repairtech_orders') || '[]');
    localStorage.setItem('repairtech_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    clearCart();
    
    // Redirect to WhatsApp for payment/confirmation
    const text = `Hi, I just placed an order (ID: ${newOrder.id}) for R${totalPrice.toFixed(2)}. Please advise on payment details.`;
    window.location.href = `https://wa.me/27685011885?text=${encodeURIComponent(text)}`;
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Full Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Phone Number</label>
              <input required name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Delivery Address</label>
              <input required name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>City</label>
              <input required name="city" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1.2rem', color: 'var(--navy)' }}>
                Total to pay: <span style={{ fontWeight: 'bold' }}>R {totalPrice.toFixed(2)}</span>
              </div>
              <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: '4px', border: 'none', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? 'Processing...' : 'Place Order & Pay via WhatsApp'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
