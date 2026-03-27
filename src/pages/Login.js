import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)', danger:'#b84c2e' };

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm]     = useState({ email:'', password:'' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));

  const validate = () => {
    if (!form.email.includes('@')) return 'Enter a valid email address';
    if (form.password.length < 6)  return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (result.ok) {
        navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        setError(result.error);
      }
    }, 600);
  };

  const inputStyle = {
    width:'100%', padding:'0.75rem 1rem', border:`1px solid ${C.border}`,
    borderRadius:4, fontSize:'0.9rem', fontFamily:"'DM Sans',sans-serif",
    outline:'none', background:'#fff', boxSizing:'border-box',
  };

  return (
    <div style={{ minHeight:'100vh', background:C.cream, display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div onClick={() => navigate('/')} style={{ fontFamily:"'Playfair Display',serif",
        fontSize:'1.75rem', fontWeight:700, cursor:'pointer', marginBottom:'2.5rem' }}>
        Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
      </div>
      <div style={{ background:'#fff', border:`1px solid ${C.border}`, borderRadius:8,
        padding:'2.5rem', width:'100%', maxWidth:420 }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem',
          fontWeight:700, marginBottom:6 }}>Welcome back</h2>
        <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:'1.75rem' }}>
          Sign in to your RawFrame account
        </p>

        {/* Demo hint */}
        <div style={{ background:'#faf7f0', border:`1px solid rgba(201,168,76,0.3)`,
          borderRadius:4, padding:'0.75rem 1rem', marginBottom:'1.5rem', fontSize:'0.78rem' }}>
          <div style={{ fontWeight:500, color:C.ink, marginBottom:4 }}>Demo accounts</div>
          <div style={{ color:C.muted }}>Creator: jane@rawframe.io / any password</div>
          <div style={{ color:C.muted }}>Admin: admin@rawframe.io / any password</div>
        </div>

        {error && <div style={{ background:'#fce8e8', color:C.danger, padding:'0.7rem 1rem',
          borderRadius:4, fontSize:'0.85rem', marginBottom:'1rem', border:`1px solid rgba(184,76,46,0.2)` }}>
          {error}</div>}

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block',
              marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
              Email</label>
            <input style={inputStyle} type="email" placeholder="you@example.com"
              value={form.email} onChange={e => set('email', e.target.value)}
              onKeyDown={e => e.key==='Enter' && handleSubmit()} />
          </div>
          <div>
            <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block',
              marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
              Password</label>
            <input style={inputStyle} type="password" placeholder="••••••••"
              value={form.password} onChange={e => set('password', e.target.value)}
              onKeyDown={e => e.key==='Enter' && handleSubmit()} />
          </div>
          <button onClick={handleSubmit} disabled={loading}
            style={{ width:'100%', padding:'0.85rem', background: loading ? C.muted : C.ink,
              color:C.cream, border:'none', borderRadius:2, fontSize:'0.9rem',
              fontWeight:500, cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily:"'DM Sans',sans-serif", marginTop:4 }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
        <p style={{ textAlign:'center', fontSize:'0.85rem', color:C.muted, marginTop:'1.5rem' }}>
          No account?{' '}
          <span onClick={() => navigate('/signup')}
            style={{ color:C.gold, cursor:'pointer', fontWeight:500 }}>
            Create one free</span>
        </p>
      </div>
    </div>
  );
}