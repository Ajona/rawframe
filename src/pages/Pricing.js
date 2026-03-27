import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', warm:'#e8e0d0', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)', success:'#4a6741' };

const PLANS = [
  { slug:'starter', name:'Starter', price:'Free', period:'', note:'Perfect for getting started',
    color:C.ink, features:[
      ['Unlimited uploads for sale','✓'],['Event hashtag tagging','✓'],
      ['3 non-downloadable sample files','✓'],['2 shareable links per upload','✓'],
      ['Creator + buyer dual role','✓'],['Revenue share','65%'],
      ['Analytics dashboard','—'],['Priority listing','—'],['API access','—'],
    ]},
  { slug:'pro', name:'Pro Creator', price:'$12', period:'/mo', note:'For active sellers and studios',
    featured:true, features:[
      ['Unlimited uploads for sale','✓'],['Event hashtag tagging','✓'],
      ['3 non-downloadable sample files','✓'],['2 shareable links per upload','✓'],
      ['Creator + buyer dual role','✓'],['Revenue share','70%'],
      ['Analytics dashboard','✓'],['Priority listing','✓'],['API access','—'],
    ]},
  { slug:'studio', name:'Studio', price:'$49', period:'/mo', note:'For agencies and teams',
    features:[
      ['Unlimited uploads for sale','✓'],['Event hashtag tagging','✓'],
      ['3 non-downloadable sample files','✓'],['2 shareable links per upload','✓'],
      ['Creator + buyer dual role','✓'],['Revenue share','75%'],
      ['Analytics dashboard','✓'],['Priority listing','✓'],['API access','✓'],
    ]},
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />
      <div style={{ padding:'4rem 3rem' }}>
        <div style={{ textAlign:'center', maxWidth:520, margin:'0 auto 3.5rem' }}>
          <div style={{ fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase',
            color:C.gold, marginBottom:'1rem', fontWeight:500 }}>Pricing</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem',
            fontWeight:700, marginBottom:'1rem', lineHeight:1.1 }}>
            Simple, <span style={{ color:C.gold, fontStyle:'italic' }}>creator-first</span> pricing
          </h1>
          <p style={{ color:C.muted, fontSize:'1rem', lineHeight:1.7 }}>
            Start free. Upgrade only when you're earning. No hidden fees, no lock-in.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', maxWidth:960, margin:'0 auto 4rem' }}>
          {PLANS.map(p => (
            <div key={p.slug}
              style={{ background: p.featured ? C.ink : '#fff', border:`1px solid ${C.border}`,
                borderRadius:8, padding:'2rem', position:'relative',
                transform: p.featured ? 'scale(1.03)' : 'scale(1)',
                boxShadow: p.featured ? '0 8px 32px rgba(0,0,0,0.12)' : 'none' }}>
              {p.featured && <div style={{ position:'absolute', top:0, left:'50%',
                transform:'translateX(-50%)', background:C.gold, color:C.ink,
                fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase',
                padding:'0.25rem 0.75rem', borderRadius:'0 0 4px 4px', fontWeight:600 }}>
                Most Popular</div>}
              <div style={{ marginTop: p.featured ? '1rem' : 0 }}>
                <div style={{ fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em',
                  color: p.featured ? C.gold : C.muted, fontWeight:500, marginBottom:8 }}>{p.name}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:2, marginBottom:4 }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.8rem',
                    fontWeight:700, color: p.featured ? C.cream : C.ink }}>{p.price}</span>
                  <span style={{ color: p.featured ? 'rgba(245,242,236,0.5)' : C.muted,
                    fontSize:'0.9rem' }}>{p.period}</span>
                </div>
                <div style={{ fontSize:'0.82rem', color: p.featured ? 'rgba(245,242,236,0.5)' : C.muted,
                  marginBottom:'1.5rem' }}>{p.note}</div>

                <div style={{ borderTop:`1px solid ${p.featured ? 'rgba(255,255,255,0.1)' : C.border}`,
                  paddingTop:'1.25rem', marginBottom:'1.5rem' }}>
                  {p.features.map(([label,val]) => (
                    <div key={label} style={{ display:'flex', justifyContent:'space-between',
                      padding:'0.45rem 0', fontSize:'0.85rem',
                      borderBottom:`1px solid ${p.featured ? 'rgba(255,255,255,0.06)' : C.border}` }}>
                      <span style={{ color: p.featured ? 'rgba(245,242,236,0.6)' : C.muted }}>{label}</span>
                      <span style={{ fontWeight:600,
                        color: val==='✓' ? C.success : val==='—' ? (p.featured ? 'rgba(255,255,255,0.2)' : '#ccc') :
                          p.featured ? C.gold : C.gold }}>{val}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => navigate(`/plan/${p.slug}`)}
                  style={{ width:'100%', padding:'0.85rem', borderRadius:2, fontSize:'0.9rem',
                    fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                    background: p.featured ? C.gold : 'transparent',
                    color: p.featured ? C.ink : C.ink,
                    border:`1px solid ${p.featured ? C.gold : C.border}` }}>
                  {p.featured ? 'Start Pro Trial' : p.slug==='studio' ? 'Contact Sales' : 'Get Started Free'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem',
            fontWeight:700, marginBottom:'2rem', textAlign:'center' }}>Common questions</h2>
          {[
            ['Can I switch plans later?','Yes. Upgrade or downgrade anytime from your dashboard. Changes take effect immediately.'],
            ['What does the revenue share mean?','For every sale, you keep your percentage and RawFrame retains the rest to cover platform costs, payment processing, and AI infrastructure.'],
            ['Is there a free trial for Pro?','Pro includes a 14-day free trial. No card required to start.'],
            ['Can I be both a buyer and a seller?','Yes. Every account has dual creator/buyer functionality built in.'],
          ].map(([q,a]) => (
            <div key={q} style={{ borderBottom:`1px solid ${C.border}`, padding:'1.25rem 0' }}>
              <div style={{ fontWeight:600, marginBottom:6, fontSize:'0.95rem' }}>{q}</div>
              <div style={{ color:C.muted, fontSize:'0.875rem', lineHeight:1.7 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}