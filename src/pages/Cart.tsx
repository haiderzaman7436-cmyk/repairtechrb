import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page" style={{ padding: '4rem 0', background: 'var(--gray-light)', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ color: 'var(--navy)', marginBottom: '2rem' }}>Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--white)', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--navy)' }}>Your cart is empty</h3>
            <p style={{ color: 'var(--gray-dark)', marginBottom: '2rem' }}>Looks like you haven't added any items yet.</p>
            <Link to="/shop" className="btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', textDecoration: 'none' }}>Continue Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', background: 'var(--white)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                      <div style={{ color: 'var(--lime)', fontWeight: 'bold', fontSize: '1.1rem' }}>Contact for price</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--gray-light)', borderRadius: '4px', padding: '0.25rem' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}><Minus size={16} /></button>
                        <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}><Plus size={16} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ color: 'var(--navy)', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--gray-dark)' }}>
                <span>Subtotal</span>
                <span>Contact for price</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--gray-dark)' }}>
                <span>Shipping</span>
                <span>Calculated on quote</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--navy)' }}>
                <span>Total</span>
                <span>Contact for price</span>
              </div>
              <button onClick={() => navigate('/checkout')} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>
                Request Quote <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
