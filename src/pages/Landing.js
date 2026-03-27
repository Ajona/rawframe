import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar   from '../components/Navbar';
import Stats    from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Footer   from '../components/Footer';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', warm:'#e8e0d0', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)' };

const CARDS = [
  { bg:'#1a2030', emoji:'🌆', tag:'#NairobiMarathon2025', price:'$4.99 · RAW', tall:true, badge:'Preview' },
  { bg:'#1e1a14', emoji:'🌿', tag:'Nature · 4K',          price:'$7.50' },
  { bg:'#1a1a2e', emoji:'🎭', tag:'#AfricaFashionWeek',   price:'$12.00' },
  { bg:'#1e1510', emoji:'🍽️', tag:'Food · Collection',    price:'$3.99' },
  { bg:'#0e1a18', emoji:'🏠', tag:'Real Estate',          price:'$9.00' },
];

function PricingTeaser({ navigate }) {
  const plans = [
    { slug:'starter', name:'Starter', price:'Free', color:C.ink, features:['Unlimited uploads','65% revenue share','Event hashtag tagging'] },
    { slug:'pro',     name:'Pro Creator', price:'$12/mo', color:C.gold, featured:true, features:['70% revenue share','Priority listing','Analytics dashboard'] },
    { slug:'studio',  name:'Studio', price:'$49/mo', color:C.ink, features:['75% revenue share','Team accounts','API access'] },
  ];
  return (
    <section style={{ padding:'5rem 3rem', background:C.cream }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:'1.5rem', marginBottom:'3rem' }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'4rem', fontWeight:700, color:C.warm, lineHeight:1 }}>04</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.4rem', fontWeight:700 }}>Simple, creator-first pricing</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
        {plans.map(p => (
          <div key={p.slug} style={{ background: p.featured ? C.ink : '#fff',
            border:`1px solid ${C.border}`, borderRadius:3, padding:'2rem', position:'relative',
            cursor:'pointer', transition:'transform 0.2s' }}
            onClick={() => navigate(`/plan/${p.slug}`)}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
            {p.featured && <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
              background:C.gold, color:C.ink, fontSize:'0.65rem', letterSpacing:'0.1em',
              textTransform:'uppercase', padding:'0.25rem 0.75rem', borderRadius:'0 0 3px 3px', fontWeight:500 }}>
              Most Popular</div>}
            <div style={{ fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em',
              color: p.featured ? C.gold : C.muted, fontWeight:500, marginBottom:'0.75rem',
              marginTop: p.featured ? '1rem' : 0 }}>{p.name}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem', fontWeight:700,
              color: p.featured ? C.cream : C.ink, lineHeight:1, marginBottom:'1rem' }}>{p.price}</div>
            <ul style={{ listStyle:'none', marginBottom:'1.5rem' }}>
              {p.features.map(f => <li key={f} style={{ fontSize:'0.85rem',
                color: p.featured ? 'rgba(245,242,236,0.65)' : C.muted,
                marginBottom:'0.5rem', display:'flex', gap:8 }}>
                <span style={{ color:C.gold }}>✓</span>{f}</li>)}
            </ul>
            <button onClick={e => { e.stopPropagation(); navigate(`/plan/${p.slug}`); }}
              style={{ width:'100%', padding:'0.75rem', borderRadius:2, fontSize:'0.875rem',
                fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                background: p.featured ? C.gold : 'transparent',
                color: p.featured ? C.ink : C.ink,
                border:`1px solid ${p.featured ? C.gold : C.border}` }}>
              {p.featured ? 'Start Pro Trial' : p.slug==='studio' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'88vh', alignItems:'center' }}>
        <div style={{ padding:'5rem 3rem', borderRight:`1px solid ${C.border}` }}>
          <div style={{ fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase',
            color:C.gold, fontWeight:500, marginBottom:'1.5rem' }}>The Creator Marketplace</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'clamp(2.8rem,5vw,4.2rem)',
            lineHeight:1.08, fontWeight:700, marginBottom:'1.5rem' }}>
            Your best shots deserve to <span style={{ color:C.gold, fontStyle:'italic' }}>earn.</span>
          </h1>
          <p style={{ fontSize:'1.05rem', color:C.muted, lineHeight:1.7, maxWidth:440,
            marginBottom:'2.5rem', fontWeight:300 }}>
            Stop deleting your event photos. RawFrame is where photographers and videographers
            monetize every angle — raw or edited — while buyers access authentic content from any occasion.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/signup')}
              style={{ background:C.ink, color:C.cream, padding:'0.875rem 2rem',
                border:'none', borderRadius:2, fontSize:'0.9rem', fontWeight:500, cursor:'pointer' }}>
              Start Selling Free
            </button>
            <button onClick={() => navigate('/browse')}
              style={{ background:'transparent', color:C.ink, padding:'0.875rem 2rem',
                border:`1px solid ${C.border}`, borderRadius:2, fontSize:'0.9rem', cursor:'pointer' }}>
              Browse Content
            </button>
          </div>
        </div>
        <div style={{ padding:'2rem', background:C.warm, display:'grid',
          gridTemplateColumns:'1fr 1fr', gap:'0.75rem', minHeight:'88vh', alignContent:'center' }}>
          {CARDS.map((c,i) => (
            <div key={i} style={{ position:'relative', borderRadius:3, overflow:'hidden',
              background:c.bg, display:'flex', alignItems:'flex-end',
              aspectRatio: c.tall ? 'unset' : '4/3',
              gridRow: c.tall ? 'span 2' : 'auto' }}>
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'3rem', opacity:0.3 }}>{c.emoji}</div>
              <div style={{ position:'relative', zIndex:2, width:'100%', padding:'0.75rem',
                background:'linear-gradient(transparent,rgba(14,13,11,0.85))' }}>
                <span style={{ fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase',
                  color:'#f0dfa0', display:'block', marginBottom:'0.2rem' }}>{c.tag}</span>
                <div style={{ color:'#fff', fontSize:'0.85rem', fontWeight:500,
                  display:'flex', justifyContent:'space-between' }}>
                  <span>{c.price}</span>
                  {c.badge && <span style={{ fontSize:'0.6rem', background:'rgba(201,168,76,0.3)',
                    color:'#f0dfa0', border:'1px solid rgba(201,168,76,0.4)',
                    padding:'0.2rem 0.4rem', borderRadius:2 }}>{c.badge}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Stats />
      <HowItWorks />
      <Features />
      <PricingTeaser navigate={navigate} />
      <Footer />
    </div>
  );
}