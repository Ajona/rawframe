import React, { useState } from 'react';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468',
  white:'#ffffff', border:'rgba(14,13,11,0.12)', danger:'#b84c2e', success:'#4a6741' };

const METHODS = [
  { id:'mpesa',      label:'M-Pesa',           icon:'🟢', region:'Kenya',         fields:[{ key:'phone', label:'M-Pesa Phone Number', ph:'+254 7XX XXX XXX', type:'tel' }] },
  { id:'airtel',     label:'Airtel Money',      icon:'🔴', region:'Africa',        fields:[{ key:'phone', label:'Airtel Phone Number',  ph:'+254 7XX XXX XXX', type:'tel' }] },
  { id:'mtn',        label:'MTN Mobile Money',  icon:'🟡', region:'Africa',        fields:[{ key:'phone', label:'MTN Phone Number',     ph:'+233 XX XXX XXXX', type:'tel' }] },
  { id:'card',       label:'Visa / Mastercard', icon:'💳', region:'Global',        fields:[
      { key:'number', label:'Card Number',     ph:'1234 5678 9012 3456', type:'text' },
      { key:'expiry', label:'Expiry',          ph:'MM / YY',             type:'text' },
      { key:'cvv',    label:'CVV',             ph:'123',                 type:'text' },
      { key:'name',   label:'Name on Card',    ph:'Jane Doe',            type:'text' },
  ]},
  { id:'googlepay',  label:'Google Pay',        icon:'🔵', region:'Global',        fields:[] },
  { id:'applepay',   label:'Apple Pay',         icon:'⚫', region:'Global',        fields:[] },
  { id:'paypal',     label:'PayPal',            icon:'🔷', region:'Global',        fields:[{ key:'email', label:'PayPal Email', ph:'you@paypal.com', type:'email' }] },
];

/* ── Reusable payment modal ───────────────────────────────── */
export default function PaymentModal({ isOpen, onClose, onSuccess, amount, currency='USD', title, subtitle, mode='pay' }) {
  const [selected, setSelected]   = useState(null);
  const [fields,   setFields]     = useState({});
  const [step,     setStep]       = useState('method'); // method | form | processing | success
  const [error,    setError]      = useState('');

  if (!isOpen) return null;

  const method = METHODS.find(m => m.id === selected);

  const reset = () => { setSelected(null); setFields({}); setStep('method'); setError(''); };
  const handleClose = () => { reset(); onClose(); };

  const handleContinue = () => {
    if (!selected) { setError('Please select a payment method'); return; }
    if (method.fields.length === 0) { processPayment(); return; }
    setStep('form');
    setError('');
  };

  const handlePay = () => {
    const missing = method.fields.filter(f => !fields[f.key]?.trim());
    if (missing.length) { setError(`Please fill in: ${missing.map(f=>f.label).join(', ')}`); return; }
    processPayment();
  };

  const processPayment = () => {
    setStep('processing');
    setError('');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => { handleClose(); onSuccess && onSuccess({ method:selected, fields }); }, 1800);
    }, 2000);
  };

  const inputStyle = {
    width:'100%', padding:'0.65rem 0.85rem', border:`1px solid ${C.border}`,
    borderRadius:4, fontSize:'0.875rem', fontFamily:"'DM Sans',sans-serif",
    outline:'none', background:C.white, boxSizing:'border-box',
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(14,13,11,0.55)',
      display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'1rem' }}>
      <div style={{ background:C.cream, borderRadius:10, width:'100%', maxWidth:460,
        maxHeight:'90vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>

        {/* Header */}
        <div style={{ padding:'1.5rem 1.5rem 1rem', borderBottom:`1px solid ${C.border}`,
          display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.25rem',
              fontWeight:700, marginBottom:4 }}>{title || 'Complete Payment'}</div>
            {subtitle && <div style={{ fontSize:'0.82rem', color:C.muted }}>{subtitle}</div>}
            {amount && (
              <div style={{ marginTop:8, display:'inline-flex', alignItems:'baseline', gap:4 }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem',
                  fontWeight:700, color:C.gold }}>{currency === 'KES' ? 'KES' : '$'}{amount}</span>
                <span style={{ fontSize:'0.82rem', color:C.muted }}>{currency !== 'USD' ? '' : 'USD'}</span>
              </div>
            )}
          </div>
          <button onClick={handleClose}
            style={{ background:'transparent', border:'none', fontSize:'1.25rem',
              color:C.muted, cursor:'pointer', padding:'0.25rem', lineHeight:1 }}>✕</button>
        </div>

        {/* Processing */}
        {step === 'processing' && (
          <div style={{ padding:'3rem 1.5rem', textAlign:'center' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:16, animation:'spin 1s linear infinite' }}>⟳</div>
            <div style={{ fontWeight:500, marginBottom:8 }}>Processing payment…</div>
            <div style={{ fontSize:'0.82rem', color:C.muted }}>
              {selected==='mpesa' || selected==='airtel' || selected==='mtn'
                ? 'Check your phone for the payment prompt' : 'Please wait'}
            </div>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div style={{ padding:'3rem 1.5rem', textAlign:'center' }}>
            <div style={{ fontSize:'3rem', marginBottom:16 }}>✓</div>
            <div style={{ fontWeight:600, fontSize:'1.1rem', marginBottom:8, color:C.success }}>Payment successful!</div>
            <div style={{ fontSize:'0.82rem', color:C.muted }}>You're all set.</div>
          </div>
        )}

        {/* Method selection */}
        {step === 'method' && (
          <div style={{ padding:'1.25rem 1.5rem' }}>
            {/* Mobile Money */}
            <div style={{ fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.1em',
              color:C.muted, fontWeight:500, marginBottom:8 }}>Mobile Money</div>
            {METHODS.filter(m => ['mpesa','airtel','mtn'].includes(m.id)).map(m => (
              <MethodRow key={m.id} m={m} selected={selected} setSelected={setSelected} />
            ))}

            <div style={{ fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.1em',
              color:C.muted, fontWeight:500, margin:'16px 0 8px' }}>Cards & Digital Wallets</div>
            {METHODS.filter(m => ['card','googlepay','applepay','paypal'].includes(m.id)).map(m => (
              <MethodRow key={m.id} m={m} selected={selected} setSelected={setSelected} />
            ))}

            {error && <div style={{ color:C.danger, fontSize:'0.8rem', marginTop:12 }}>{error}</div>}

            <button onClick={handleContinue}
              style={{ width:'100%', marginTop:20, padding:'0.85rem',
                background: selected ? C.ink : C.border, color: selected ? C.cream : C.muted,
                border:'none', borderRadius:4, fontSize:'0.9rem', fontWeight:500,
                cursor: selected ? 'pointer' : 'not-allowed', fontFamily:"'DM Sans',sans-serif" }}>
              Continue →
            </button>
          </div>
        )}

        {/* Form */}
        {step === 'form' && method && (
          <div style={{ padding:'1.25rem 1.5rem' }}>
            <button onClick={() => setStep('method')}
              style={{ background:'transparent', border:'none', color:C.muted,
                fontSize:'0.82rem', cursor:'pointer', marginBottom:'1rem', padding:0 }}>
              ← Back
            </button>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1.25rem' }}>
              <span style={{ fontSize:'1.5rem' }}>{method.icon}</span>
              <div>
                <div style={{ fontWeight:600 }}>{method.label}</div>
                <div style={{ fontSize:'0.75rem', color:C.muted }}>{method.region}</div>
              </div>
            </div>

            {/* M-Pesa STK push notice */}
            {(selected==='mpesa'||selected==='airtel'||selected==='mtn') && (
              <div style={{ background:'#faf7f0', border:`1px solid rgba(201,168,76,0.3)`,
                borderRadius:6, padding:'0.85rem 1rem', marginBottom:'1rem',
                fontSize:'0.8rem', color:C.ink }}>
                <strong>How it works:</strong> Enter your number and click Pay.
                You'll receive a push notification on your phone to confirm the payment with your PIN.
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:20 }}>
              {method.fields.map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block',
                    marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
                    {f.label}
                  </label>
                  <input style={inputStyle} type={f.type} placeholder={f.ph}
                    value={fields[f.key]||''} onChange={e => setFields(p=>({...p,[f.key]:e.target.value}))} />
                </div>
              ))}
            </div>

            {error && <div style={{ color:C.danger, fontSize:'0.8rem', marginBottom:12 }}>{error}</div>}

            <button onClick={handlePay}
              style={{ width:'100%', padding:'0.85rem', background:C.gold, color:C.ink,
                border:'none', borderRadius:4, fontSize:'0.9rem', fontWeight:600,
                cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              {mode==='withdraw' ? `Withdraw ${currency==='KES'?'KES':'$'}${amount}` : `Pay ${currency==='KES'?'KES':'$'}${amount}`}
            </button>

            <div style={{ display:'flex', justifyContent:'center', gap:12,
              marginTop:16, fontSize:'0.72rem', color:C.muted }}>
              <span>🔒 Secured by Flutterwave</span>
              <span>·</span>
              <span>256-bit SSL</span>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function MethodRow({ m, selected, setSelected }) {
  const active = selected === m.id;
  return (
    <div onClick={() => setSelected(m.id)}
      style={{ display:'flex', alignItems:'center', gap:12, padding:'0.75rem 1rem',
        border:`1.5px solid ${active ? '#c9a84c' : 'rgba(14,13,11,0.12)'}`,
        borderRadius:6, marginBottom:8, cursor:'pointer',
        background: active ? '#faf7f0' : '#fff', transition:'all 0.15s' }}>
      <span style={{ fontSize:'1.3rem', width:28, textAlign:'center' }}>{m.icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:500, fontSize:'0.9rem' }}>{m.label}</div>
        <div style={{ fontSize:'0.72rem', color:'#7a7468' }}>{m.region}</div>
      </div>
      <div style={{ width:18, height:18, borderRadius:'50%',
        border:`2px solid ${active ? '#c9a84c' : 'rgba(14,13,11,0.2)'}`,
        background: active ? '#c9a84c' : 'transparent',
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        {active && <div style={{ width:6, height:6, borderRadius:'50%', background:'#fff' }} />}
      </div>
    </div>
  );
}