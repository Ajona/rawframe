import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PaymentModal from '../components/PaymentModal';
import Navbar from '../components/Navbar';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)', success:'#4a6741' };

export default function Checkout() {
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const location   = useLocation();
  const [showPay,  setShowPay]  = useState(false);
  const [done,     setDone]     = useState(false);

  // Item passed via navigation state or use a demo item
  const item = location.state?.item || {
    title:'Nairobi Marathon Start Line', price:4.99, type:'RAW',
    tag:'#NairobiMarathon', creator:'Jane Doe', emoji:'🏃', bg:'#1a2030',
  };

  const handleSuccess = () => { setShowPay(false); setDone(true); };

  if (done) {
    return (
      <div style={{ minHeight:'100vh', background:C.cream }}>
        <Navbar />
        <div style={{ maxWidth:480, margin:'6rem auto', textAlign:'center', padding:'2rem' }}>
          <div style={{ fontSize:'3.5rem', marginBottom:16 }}>✓</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:700, marginBottom:12 }}>
            Purchase complete!
          </h2>
          <p style={{ color:C.muted, lineHeight:1.7, marginBottom:28 }}>
            <strong>{item.title}</strong> has been added to your downloads.
            The creator has been paid their share instantly.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/browse')}
              style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
                padding:'0.75rem 1.75rem', fontSize:'0.875rem', fontWeight:500,
                cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Browse More Content
            </button>
            <button onClick={() => navigate('/dashboard')}
              style={{ background:'transparent', color:C.ink, border:`1px solid ${C.border}`,
                borderRadius:2, padding:'0.75rem 1.75rem', fontSize:'0.875rem',
                cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />
      <div style={{ maxWidth:560, margin:'4rem auto', padding:'2rem' }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:700, marginBottom:'2rem' }}>
          Checkout
        </h1>

        {/* Item summary */}
        <div style={{ background:'#fff', border:`1px solid ${C.border}`, borderRadius:8,
          overflow:'hidden', marginBottom:20 }}>
          <div style={{ height:140, background:item.bg, display:'flex',
            alignItems:'center', justifyContent:'center', fontSize:'3rem', opacity:0.4 }}>
            {item.emoji}
          </div>
          <div style={{ padding:'1.25rem 1.5rem' }}>
            <div style={{ fontWeight:600, fontSize:'1rem', marginBottom:4 }}>{item.title}</div>
            <div style={{ fontSize:'0.8rem', color:C.muted, marginBottom:'0.75rem' }}>
              By {item.creator} · {item.type}{item.tag ? ` · ${item.tag}` : ''}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between',
              padding:'0.75rem 0', borderTop:`1px solid ${C.border}` }}>
              <span style={{ color:C.muted, fontSize:'0.875rem' }}>License fee</span>
              <span style={{ fontWeight:700, fontSize:'1.1rem', color:C.gold }}>${item.price.toFixed(2)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'0.5rem 0',
              borderTop:`1px solid ${C.border}`, fontSize:'0.82rem' }}>
              <span style={{ color:C.muted }}>Creator receives</span>
              <span style={{ color:C.success, fontWeight:500 }}>
                ${(item.price * 0.70).toFixed(2)} (70%)
              </span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'0.5rem 0',
              borderTop:`1px solid ${C.border}`, fontSize:'0.82rem' }}>
              <span style={{ color:C.muted }}>Platform fee</span>
              <span style={{ color:C.muted }}>${(item.price * 0.30).toFixed(2)} (30%)</span>
            </div>
          </div>
        </div>

        {/* License note */}
        <div style={{ background:'#faf7f0', border:`1px solid rgba(201,168,76,0.25)`,
          borderRadius:6, padding:'1rem 1.25rem', marginBottom:20, fontSize:'0.82rem', color:C.muted }}>
          <strong style={{ color:C.ink }}>Commercial license included.</strong> You may use this content
          in personal projects, client work, social media, and advertising. Redistribution for resale is not permitted.
        </div>

        {!user ? (
          <div style={{ textAlign:'center', padding:'1.5rem', background:'#fff',
            border:`1px solid ${C.border}`, borderRadius:8 }}>
            <p style={{ color:C.muted, marginBottom:16 }}>Sign in to complete your purchase</p>
            <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
              <button onClick={() => navigate('/login')}
                style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
                  padding:'0.7rem 1.5rem', fontSize:'0.875rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                Sign In
              </button>
              <button onClick={() => navigate('/signup')}
                style={{ background:'transparent', color:C.ink, border:`1px solid ${C.border}`,
                  borderRadius:2, padding:'0.7rem 1.5rem', fontSize:'0.875rem',
                  cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                Create Account
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowPay(true)}
            style={{ width:'100%', padding:'1rem', background:C.gold, color:C.ink,
              border:'none', borderRadius:4, fontSize:'1rem', fontWeight:600,
              cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            Pay ${item.price.toFixed(2)} — Choose Payment Method
          </button>
        )}

        <div style={{ display:'flex', justifyContent:'center', gap:16,
          marginTop:16, fontSize:'0.72rem', color:C.muted }}>
          {['🔒 Secured by Flutterwave','256-bit SSL','Instant delivery'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <PaymentModal
        isOpen={showPay}
        onClose={() => setShowPay(false)}
        onSuccess={handleSuccess}
        amount={item.price.toFixed(2)}
        currency="USD"
        title="Complete your purchase"
        subtitle={item.title}
      />
    </div>
  );
}