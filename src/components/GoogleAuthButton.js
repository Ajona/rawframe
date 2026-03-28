import React, { useState } from 'react';

const C = { ink:'#0e0d0b', border:'rgba(14,13,11,0.12)', muted:'#7a7468' };

/* 
  This renders a real-looking Google Sign-In button.
  In production, replace handleClick with:
    import { GoogleLogin } from '@react-oauth/google';
  and wire up your Google Client ID from console.cloud.google.com
*/
export default function GoogleAuthButton({ onSuccess, label = 'Continue with Google' }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // ── PRODUCTION: replace this block with real Google OAuth ──
    // import { useGoogleLogin } from '@react-oauth/google';
    // const login = useGoogleLogin({ onSuccess: tokenResponse => onSuccess(tokenResponse) });
    // ──────────────────────────────────────────────────────────
    setTimeout(() => {
      setLoading(false);
      // Mock Google profile returned after OAuth
      onSuccess({
        name:    'Google User',
        email:   'googleuser@gmail.com',
        picture: null,
        sub:     'google_' + Date.now(),
      });
    }, 1200);
  };

  return (
    <button onClick={handleClick} disabled={loading}
      style={{ width:'100%', padding:'0.75rem 1rem', background:'#fff',
        border:`1px solid ${C.border}`, borderRadius:4, fontSize:'0.9rem',
        fontFamily:"'DM Sans',sans-serif", cursor: loading ? 'not-allowed' : 'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', gap:10,
        transition:'background 0.15s', color: loading ? C.muted : C.ink }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background='#f8f8f8'; }}
      onMouseLeave={e => { e.currentTarget.style.background='#fff'; }}>
      {/* Google G logo SVG */}
      {!loading ? (
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
      ) : (
        <span style={{ fontSize:'0.9rem' }}>⟳</span>
      )}
      {loading ? 'Connecting to Google…' : label}
    </button>
  );
}