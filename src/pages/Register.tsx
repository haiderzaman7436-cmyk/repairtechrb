import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

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
    } catch (err: any) {
      setError(err.message || 'Failed to create an account.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--gray-light) 0%, var(--white) 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(15, 23, 42, 0.03) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        background: 'var(--white)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <img src="/images/logo (3).png" alt="Repair Tech Logo" style={{ height: '60px' }} />
        </div>
        
        <h2 style={{ 
          textAlign: 'center', 
          color: 'var(--navy)', 
          marginBottom: '0.5rem',
          fontSize: '1.75rem',
          fontWeight: '800',
          fontFamily: 'var(--font-serif)'
        }}>Create Account</h2>
        
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--gray-dark)', 
          marginBottom: '2rem',
          fontSize: '0.95rem'
        }}>Join RepairTech to start shopping for parts</p>

        {error && (
          <div style={{ 
            background: '#fee2e2', 
            border: '1px solid #fecaca',
            color: '#b91c1c', 
            padding: '1rem', 
            borderRadius: '12px', 
            marginBottom: '1.5rem', 
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <User size={18} />
              </div>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  background: 'var(--gray-light)',
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem',
                  color: 'var(--navy)',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--lime)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                  (e.target.previousElementSibling as HTMLElement).style.color = 'var(--lime)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                  (e.target.previousElementSibling as HTMLElement).style.color = 'var(--gray)';
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  background: 'var(--gray-light)',
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem',
                  color: 'var(--navy)',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--lime)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                  (e.target.previousElementSibling as HTMLElement).style.color = 'var(--lime)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                  (e.target.previousElementSibling as HTMLElement).style.color = 'var(--gray)';
                }}
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '1rem 1rem 1rem 3rem', 
                  background: 'var(--gray-light)',
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  fontSize: '0.95rem',
                  color: 'var(--navy)',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--lime)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                  (e.target.previousElementSibling as HTMLElement).style.color = 'var(--lime)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                  (e.target.previousElementSibling as HTMLElement).style.color = 'var(--gray)';
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              background: 'var(--lime)',
              color: 'var(--white)',
              padding: '1rem', 
              fontSize: '1rem', 
              borderRadius: '12px', 
              marginTop: '1rem', 
              border: 'none', 
              cursor: loading ? 'not-allowed' : 'pointer', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
              opacity: loading ? 0.8 : 1,
              boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)'
            }}
            onMouseOver={(e) => { if(!loading) e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)' }}
            onMouseOut={(e) => { if(!loading) e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(14, 165, 233, 0.3)' }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                Creating account...
              </>
            ) : (
              <>
                Register Now
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: 'rgba(14, 165, 233, 0.05)', border: '1px solid rgba(14, 165, 233, 0.1)' }}>
          <ShieldCheck size={18} style={{ color: 'var(--lime)' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>Secure & Encrypted Registration</span>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: 'var(--gray-dark)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--lime)', fontWeight: '600', textDecoration: 'none', marginLeft: '0.25rem' }}>Sign in</Link>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
