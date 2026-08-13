import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(email, password, name);
      navigate('/shop');
    } catch (err) {
      setError('Failed to create an account.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-light)', padding: '2rem' }}>
      <div className="auth-card" style={{ background: 'var(--white)', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--navy)', marginBottom: '0.5rem' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: 'var(--gray-dark)', marginBottom: '2rem' }}>Join Repair Tech today</p>

        {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--navy)' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', borderRadius: '4px', marginTop: '1rem', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: 'var(--gray-dark)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--lime)', fontWeight: 'bold' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
