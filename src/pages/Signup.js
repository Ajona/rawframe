import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)', danger:'#b84c2e', success:'#4a6741' };
const PLANS = [
  { slug:'starter', label:'Starter', price:'Free',    note:'65% revenue share' },
  { slug:'pro',     label:'Pro',     price:'$12/mo',  note:'70% revenue share' },
  { slug:'studio',  label:'Studio',  price:'$49/mo',  note:'75% revenue share' },
];
const FIELDS = ['Nature & Wildlife','Travel','Food & Drink','Fashion','Real Estate','Sports & Events','Architecture','Street Photography','General'];

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState({ name:'', email:'', password:'', confirm:'', plan:'starter', fields:[] });
  const [errors, setErrors] = useState({});

  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const toggleField = f => set('fields', form.fields.includes(f) ? form.fields.filter(x=>x!==f) : [...form.fields, f]);

  const validateStep0 = () => {
    const e = {};
    if (!form.name.trim())            e.name     = 'Name is required';
    if (!form.email.includes('@'))    e.email    = 'Enter a valid email';
    if (form.password.length < 6)     e.password = 'At least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep0()) setStep(1); };
  const handleFinish = () => {
    const result = signup(form.name, form.email, form.password, form.plan);
    if (result.ok) navigate('/dashboard');
  };

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

      <div style={{ background:'#fff', border:`1px solid ${C.border}`, borderRadius:8,
        padding:'2.5rem', width:'100%', maxWidth: step===1 ? 560 : 420 }}>

        {/* Step 0 — Account details */}
        {step === 0 && <>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:6 }}>Create your account</h2>
          <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:'1.75rem' }}>Free to join. Start selling in minutes.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { key:'name',     label:'Full Name',       type:'text',     ph:'Jane Doe' },
              { key:'email',    label:'Email',           type:'email',    ph:'you@example.com' },
              { key:'password', label:'Password',        type:'password', ph:'Min 6 characters' },
              { key:'confirm',  label:'Confirm Password',type:'password', ph:'Repeat password' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block',
                  marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>{f.label}</label>
                <input style={{ ...inputStyle, borderColor: errors[f.key] ? C.danger : C.border }}
                  type={f.type} placeholder={f.ph}
                  value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
                {errors[f.key] && <div style={errStyle}>{errors[f.key]}</div>}
              </div>
            ))}
            <button onClick={handleNext}
              style={{ width:'100%', padding:'0.85rem', background:C.ink, color:C.cream,
                border:'none', borderRadius:2, fontSize:'0.9rem', fontWeight:500,
                cursor:'pointer', fontFamily:"'DM Sans',sans-serif", marginTop:4 }}>
              Continue →
            </button>
          </div>
          <p style={{ textAlign:'center', fontSize:'0.85rem', color:C.muted, marginTop:'1.5rem' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color:C.gold, cursor:'pointer', fontWeight:500 }}>Sign in</span>
          </p>
        </>}

        {/* Step 1 — Plan + Fields */}
        {step === 1 && <>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:6 }}>Choose your plan</h2>
          <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:'1.5rem' }}>You can upgrade anytime from your dashboard.</p>

          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:'1.75rem' }}>
            {PLANS.map(p => (
              <div key={p.slug} onClick={() => set('plan', p.slug)}
                style={{ padding:'1rem 1.25rem', border:`2px solid ${form.plan===p.slug ? C.gold : C.border}`,
                  borderRadius:6, cursor:'pointer', display:'flex', justifyContent:'space-between',
                  alignItems:'center', background: form.plan===p.slug ? '#faf7f0' : '#fff',
                  transition:'all 0.15s' }}>
                <div>
                  <div style={{ fontWeight:500, fontSize:'0.9rem' }}>{p.label}</div>
                  <div style={{ fontSize:'0.78rem', color:C.muted }}>{p.note}</div>
                </div>
                <div style={{ fontWeight:700, color: form.plan===p.slug ? C.gold : C.ink }}>{p.price}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom:'1.75rem' }}>
            <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block', marginBottom:10,
              textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
              Your Content Fields (optional)</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {FIELDS.map(f => {
                const active = form.fields.includes(f);
                return <button key={f} onClick={() => toggleField(f)}
                  style={{ padding:'0.35rem 0.85rem', borderRadius:100, fontSize:'0.78rem',
                    cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                    background: active ? C.ink : '#fff', color: active ? C.cream : C.muted,
                    border:`1px solid ${active ? C.ink : C.border}` }}>{f}</button>;
              })}
            </div>
          </div>

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(0)}
              style={{ flex:1, padding:'0.85rem', background:'transparent', color:C.muted,
                border:`1px solid ${C.border}`, borderRadius:2, fontSize:'0.9rem', cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif" }}>← Back</button>
            <button onClick={handleFinish}
              style={{ flex:2, padding:'0.85rem', background:C.gold, color:C.ink,
                border:'none', borderRadius:2, fontSize:'0.9rem', fontWeight:600,
                cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              Create Account & Start →
            </button>
          </div>
        </>}
      </div>
    </div>
  );
}