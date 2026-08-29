import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';
import { ShieldCheck, Lock, Mail, User, ArrowRight, Loader2, AlertCircle, Phone, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, loading: authLoading, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user && !user.isAnonymous) {
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(email, password, name, phone);
      // Navigation is handled by the useEffect above
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err));
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      // Navigation is handled by the useEffect above
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err));
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <img src="/logos/logo.png" alt="Repair Tech Logo" style={{ height: '80px', width: '80px', marginBottom: '1rem' }} />
          <h1 style={{ color: 'var(--navy)', fontSize: '2.5rem', fontWeight: '900' }}>Repair Tech</h1>
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
            <label htmlFor="register-name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <User size={18} />
              </div>
              <input 
                id="register-name"
                name="name"
                autoComplete="name"
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
            <label htmlFor="register-email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <Mail size={18} />
              </div>
              <input 
                id="register-email"
                name="email"
                autoComplete="email"
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
            <label htmlFor="register-phone" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <Phone size={18} />
              </div>
              <input 
                id="register-phone"
                name="phone"
                autoComplete="tel"
                type="tel" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="062 117 2653"
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
            <label htmlFor="register-password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <Lock size={18} />
              </div>
              <input 
                id="register-password"
                name="password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '1rem 3rem 1rem 3rem', 
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
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--gray)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--lime)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--gray)'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="register-confirm-password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)' }}>
                <Lock size={18} />
              </div>
              <input 
                id="register-confirm-password"
                name="confirmPassword"
                autoComplete="new-password"
                type={showConfirmPassword ? "text" : "password"} 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '1rem 3rem 1rem 3rem', 
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
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--gray)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--lime)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--gray)'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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

        <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0 1rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          <span style={{ padding: '0 1rem', color: 'var(--gray)', fontSize: '0.85rem', fontWeight: '600' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            background: 'white',
            color: 'var(--navy)',
            padding: '1rem',
            fontSize: '0.95rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s ease',
            opacity: loading ? 0.8 : 1
          }}
          onMouseOver={(e) => { if(!loading) e.currentTarget.style.background = '#f8fafc' }}
          onMouseOut={(e) => { if(!loading) e.currentTarget.style.background = 'white' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
        
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
