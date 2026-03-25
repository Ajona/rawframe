import React from 'react';

const s = {
  section: { display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'88vh', alignItems:'center' },
  left: { padding:'5rem 3rem', borderRight:'1px solid rgba(14,13,11,0.12)' },
  eyebrow: { fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase',
    color:'#c9a84c', fontWeight:500, marginBottom:'1.5rem' },
  h1: { fontFamily:"'Playfair Display', serif", fontSize:'clamp(2.8rem,5vw,4.2rem)',
    lineHeight:1.08, fontWeight:700, marginBottom:'1.5rem' },
  em: { color:'#c9a84c', fontStyle:'italic' },
  sub: { fontSize:'1.05rem', color:'#7a7468', lineHeight:1.7, maxWidth:'440px',
    marginBottom:'2.5rem', fontWeight:300 },
  actions: { display:'flex', gap:'1rem', flexWrap:'wrap' },
  btnPrimary: { background:'#0e0d0b', color:'#f5f2ec', padding:'0.875rem 2rem',
    border:'none', borderRadius:'2px', fontSize:'0.9rem', fontWeight:500 },
  btnOutline: { background:'transparent', color:'#0e0d0b', padding:'0.875rem 2rem',
    border:'1px solid rgba(14,13,11,0.2)', borderRadius:'2px', fontSize:'0.9rem' },
  right: { padding:'2rem', background:'#e8e0d0', display:'grid',
    gridTemplateColumns:'1fr 1fr', gap:'0.75rem', minHeight:'88vh', alignContent:'center' },
  card: { position:'relative', borderRadius:'3px', overflow:'hidden',
    background:'#1a1a14', display:'flex', alignItems:'flex-end', aspectRatio:'4/3' },
  cardTall: { gridRow:'span 2', aspectRatio:'unset' },
  emoji: { position:'absolute', inset:0, display:'flex', alignItems:'center',
    justifyContent:'center', fontSize:'3rem', opacity:0.3 },
  meta: { position:'relative', zIndex:2, width:'100%', padding:'0.75rem',
    background:'linear-gradient(transparent, rgba(14,13,11,0.85))' },
  tag: { fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase',
    color:'#f0dfa0', display:'block', marginBottom:'0.2rem' },
  price: { color:'#fff', fontSize:'0.85rem', fontWeight:500,
    display:'flex', justifyContent:'space-between', alignItems:'center' },
  badge: { fontSize:'0.6rem', background:'rgba(201,168,76,0.3)', color:'#f0dfa0',
    border:'1px solid rgba(201,168,76,0.4)', padding:'0.2rem 0.4rem', borderRadius:'2px' }
};

const cards = [
  { bg:'#1a2030', emoji:'🌆', tag:'#NairobiMarathon2025', price:'$4.99 · RAW', tall:true, badge:'Preview' },
  { bg:'#1e1a14', emoji:'🌿', tag:'Nature · 4K', price:'$7.50' },
  { bg:'#1a1a2e', emoji:'🎭', tag:'#AfricaFashionWeek', price:'$12.00' },
  { bg:'#1e1510', emoji:'🍽️', tag:'Food · Collection', price:'$3.99' },
  { bg:'#0e1a18', emoji:'🏠', tag:'Real Estate', price:'$9.00' },
];

export default function Hero() {
  return (
    <section style={s.section}>
      <div style={s.left}>
        <div style={s.eyebrow}>The Creator Marketplace</div>
        <h1 style={s.h1}>Your best shots deserve to <span style={s.em}>earn.</span></h1>
        <p style={s.sub}>Stop deleting your event photos. RawFrame is where photographers and videographers monetize every angle — raw or edited — while buyers access authentic content from any occasion.</p>
        <div style={s.actions}>
          <button style={s.btnPrimary}>Start Selling Free</button>
          <button style={s.btnOutline}>Browse Content</button>
        </div>
      </div>
      <div style={s.right}>
        {cards.map((c,i) => (
          <div key={i} style={{...s.card, ...(c.tall?s.cardTall:{}), background:c.bg}}>
            <div style={s.emoji}>{c.emoji}</div>
            <div style={s.meta}>
              <span style={s.tag}>{c.tag}</span>
              <div style={s.price}>
                <span>{c.price}</span>
                {c.badge && <span style={s.badge}>{c.badge}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}