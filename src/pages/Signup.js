import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/GoogleAuthButton';
import PaymentModal from '../components/PaymentModal';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468',
  border:'rgba(14,13,11,0.12)', danger:'#b84c2e', success:'#4a6741' };

const PLANS = [
  { slug:'starter', label:'Starter',     price:'Free',   note:'65% revenue share — best to start' },
  { slug:'pro',     label:'Pro Creator', price:'$12/mo', note:'70% revenue share + analytics' },
  { slug:'studio',  label:'Studio',      price:'$49/mo', note:'75% revenue share + team accounts' },
];

const FIELDS = ['Nature & Wildlife','Travel','Food & Drink','Fashion','Real Estate',
  'Sports & Events','Architecture','Street Photography','General'];

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle, updatePlan } = useAuth();

  const [step,      setStep]      = useState(0); // 0=account | 1=plan | 2=payment (if paid plan)
  const [form,      setForm]      = useState({ name:'', email:'', password:'', confirm:'', plan:'starter', fields:[] });
  const [errors,    setErrors]    = useState({});
  const [showPay,   setShowPay]   = useState(false);
  const [googleUser,setGoogleUser]= useState(null); // set when coming from Google

  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const toggleField = f => set('fields', form.fields.includes(f) ? form.fields.filter(x=>x!==f) : [...form.fields,f]);

  const validateStep0 = () => {
    const e = {};
    if (!googleUser) {
      if (!form.name.trim())              e.name     = 'Name is required';
      if (!form.email.includes('@'))      e.email    = 'Enter a valid email';
      if (form.password.length < 6)       e.password = 'At least 6 characters';
      if (form.password !== form.confirm) e.confirm  = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGoogle = (profile) => {
    setGoogleUser(profile);
    setForm(p => ({ ...p, name:profile.name, email:profile.email }));
    setStep(1); // skip account form, go straight to plan
  };

  const handleNext = () => { if (validateStep0()) setStep(1); };

  const handleFinish = () => {
    if (form.plan !== 'starter') {
      setShowPay(true); // show payment modal for paid plans
    } else {
      createAccount();
    }
  };

  const createAccount = () => {
    if (googleUser) {
      loginWithGoogle({ ...googleUser, plan: form.plan });
    } else {
      signup(form.name, form.email, form.password, form.plan);
    }
    navigate('/dashboard');
  };

  const handlePaymentSuccess = () => {
    setShowPay(false);
    createAccount();
  };

  const planAmount = form.plan === 'pro' ? '12.00' : form.plan === 'studio' ? '49.00' : null;

  const inputStyle = {
    width:'100%', padding:'0.75rem 1rem', border:`1px solid ${C.border}`, borderRadius:4,
    fontSize:'0.9rem', fontFamily:"'DM Sans',sans-serif", outline:'none',
    background:'#fff', boxSizing:'border-box',
  };
  const errStyle = { fontSize:'0.75rem', color:C.danger, marginTop:4 };

  return (
    <div style={{ minHeight:'100vh', background:C.cream, display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem' }}>

      <div onClick={() => navigate('/')} style={{ fontFamily:"'Playfair Display',serif",
        fontSize:'1.75rem', fontWeight:700, cursor:'pointer', marginBottom:'2.5rem' }}>
        Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
      </div>

      {/* Step indicator */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'2rem' }}>
        {(googleUser ? ['Plan','Fields'] : ['Account','Plan','Fields']).map((s,i) => {
          const idx = googleUser ? i+1 : i;
          const cur = googleUser ? step-1 : step;
          return (
            <React.Fragment key={s}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:24, height:24, borderRadius:'50%', fontSize:'0.72rem',
                  fontWeight:500, display:'flex', alignItems:'center', justifyContent:'center',
                  background: cur>=i ? (cur===i ? C.ink : C.gold) : 'transparent',
                  color: cur>=i ? C.cream : C.muted,
                  border: cur>=i ? 'none' : `1px solid ${C.border}` }}>
                  {cur>i ? '✓' : i+1}
                </div>
                <span style={{ fontSize:'0.78rem', color: cur===i ? C.ink : C.muted,
                  fontWeight: cur===i ? 500 : 400 }}>{s}</span>
              </div>
              {i < (googleUser?1:2) && <div style={{ width:24, height:1, background:C.border }} />}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ background:'#fff', border:`1px solid ${C.border}`, borderRadius:8,
        padding:'2.5rem', width:'100%', maxWidth: step===1 ? 540 : 420 }}>

        {/* ── STEP 0: Account details ── */}
        {step === 0 && (
          <>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:6 }}>Create your account</h2>
            <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:'1.5rem' }}>Free to join. Start selling in minutes.</p>

            <GoogleAuthButton onSuccess={handleGoogle} label="Sign up with Google" />

            <div style={{ display:'flex', alignItems:'center', gap:12, margin:'1.25rem 0' }}>
              <div style={{ flex:1, height:1, background:C.border }} />
              <span style={{ fontSize:'0.78rem', color:C.muted }}>or sign up with email</span>
              <div style={{ flex:1, height:1, background:C.border }} />
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[{ key:'name', label:'Full Name', type:'text', ph:'Jane Doe' },
                { key:'email', label:'Email', type:'email', ph:'you@example.com' },
                { key:'password', label:'Password', type:'password', ph:'Min 6 characters' },
                { key:'confirm', label:'Confirm Password', type:'password', ph:'Repeat password' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block', marginBottom:6,
                    textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>{f.label}</label>
                  <input style={{ ...inputStyle, borderColor:errors[f.key]?C.danger:C.border }}
                    type={f.type} placeholder={f.ph}
                    value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
                  {errors[f.key] && <div style={errStyle}>{errors[f.key]}</div>}
                </div>
              ))}
              <button onClick={handleNext}
                style={{ width:'100%', padding:'0.85rem', background:C.ink, color:C.cream,
                  border:'none', borderRadius:4, fontSize:'0.9rem', fontWeight:500,
                  cursor:'pointer', fontFamily:"'DM Sans',sans-serif", marginTop:4 }}>
                Continue →
              </button>
            </div>
            <p style={{ textAlign:'center', fontSize:'0.85rem', color:C.muted, marginTop:'1.5rem' }}>
              Already have an account?{' '}
              <span onClick={() => navigate('/login')}
                style={{ color:C.gold, cursor:'pointer', fontWeight:500 }}>Sign in</span>
            </p>
          </>
        )}

        {/* ── STEP 1: Plan ── */}
        {step === 1 && (
          <>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:6 }}>Choose your plan</h2>
            <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:'1.5rem' }}>Upgrade anytime from your dashboard.</p>

            {googleUser && (
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'0.75rem 1rem',
                background:'#faf7f0', border:`1px solid rgba(201,168,76,0.25)`,
                borderRadius:6, marginBottom:'1.25rem' }}>
                <span style={{ fontSize:'1.1rem' }}>🔵</span>
                <div>
                  <div style={{ fontWeight:500, fontSize:'0.875rem' }}>Signed in with Google</div>
                  <div style={{ fontSize:'0.75rem', color:C.muted }}>{googleUser.email}</div>
                </div>
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:'1.5rem' }}>
              {PLANS.map(p => (
                <div key={p.slug} onClick={() => set('plan', p.slug)}
                  style={{ padding:'1rem 1.25rem', border:`2px solid ${form.plan===p.slug?C.gold:C.border}`,
                    borderRadius:6, cursor:'pointer', display:'flex',
                    justifyContent:'space-between', alignItems:'center',
                    background:form.plan===p.slug?'#faf7f0':'#fff', transition:'all 0.15s' }}>
                  <div>
                    <div style={{ fontWeight:500, fontSize:'0.9rem', marginBottom:2 }}>{p.label}</div>
                    <div style={{ fontSize:'0.78rem', color:C.muted }}>{p.note}</div>
                  </div>
                  <div style={{ fontWeight:700, color:form.plan===p.slug?C.gold:C.ink,
                    fontSize:'1rem', flexShrink:0 }}>{p.price}</div>
                </div>
              ))}
            </div>

            {/* Content fields */}
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block', marginBottom:10,
                textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
                Your Content Fields <span style={{ fontWeight:400, textTransform:'none', letterSpacing:0 }}>(optional)</span>
              </label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {FIELDS.map(f => {
                  const active = form.fields.includes(f);
                  return (
                    <button key={f} onClick={() => toggleField(f)}
                      style={{ padding:'0.35rem 0.85rem', borderRadius:100, fontSize:'0.78rem',
                        cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                        background:active?C.ink:'#fff', color:active?C.cream:C.muted,
                        border:`1px solid ${active?C.ink:C.border}` }}>{f}</button>
                  );
                })}
              </div>
            </div>

            <div style={{ display:'flex', gap:10 }}>
              {!googleUser && (
                <button onClick={() => setStep(0)}
                  style={{ flex:1, padding:'0.85rem', background:'transparent', color:C.muted,
                    border:`1px solid ${C.border}`, borderRadius:4, fontSize:'0.9rem',
                    cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>← Back</button>
              )}
              <button onClick={handleFinish}
                style={{ flex:2, padding:'0.85rem',
                  background: form.plan==='starter' ? C.ink : C.gold,
                  color: form.plan==='starter' ? C.cream : C.ink,
                  border:'none', borderRadius:4, fontSize:'0.9rem', fontWeight:600,
                  cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                {form.plan==='starter' ? 'Create Account →' : `Continue to Payment →`}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Payment modal for paid plans */}
      <PaymentModal
        isOpen={showPay}
        onClose={() => setShowPay(false)}
        onSuccess={handlePaymentSuccess}
        amount={planAmount}
        currency="USD"
        title={`Activate ${PLANS.find(p=>p.slug===form.plan)?.label} Plan`}
        subtitle="Your first charge. Cancel anytime from your dashboard."
      />
    </div>
  );
}