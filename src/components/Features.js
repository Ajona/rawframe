import React from 'react';

const features = [
  { label:'Security', title:'Watermarked previews with quality windows',
    body:'Previews are watermarked — except one revealed section at full native quality. Buyers zoom in to verify sharpness before purchasing.' },
  { label:'AI Protection', title:'Duplicate detection on every upload',
    body:'Every upload is scanned against the library. No one can re-upload your work and sell it. Originality enforced programmatically.' },
  { label:'Earnings', title:'Instant creator payouts',
    body:'When a sale completes, your share lands in your dashboard immediately. See pending, confirmed, and withdrawn earnings in one view.' },
  { label:'Flexibility', title:'Creator and buyer in one account',
    body:'Sell your own shots and buy from other creators — no need for separate accounts, ever.' },
  { label:'Admin', title:'Privacy-first admin controls',
    body:'Admins view stats but cannot access full-resolution content without explicit creator permission — requested per file.' },
  { label:'Discovery', title:'Fields, categories & creator profiles',
    body:'Choose your speciality at signup — nature, fashion, real estate, food, travel. Buyers filter by field to find exactly what they need.' },
];

export default function Features() {
  return (
    <section style={{ background:'#0e0d0b', padding:'5rem 3rem' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:'1.5rem', marginBottom:'3rem' }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'4rem',
          fontWeight:700, color:'rgba(255,255,255,0.05)', lineHeight:1 }}>03</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.4rem',
          fontWeight:700, color:'#f5f2ec' }}>Built for serious creators</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)',
        gap:'1px', background:'rgba(255,255,255,0.08)',
        border:'1px solid rgba(255,255,255,0.08)', borderRadius:'3px', overflow:'hidden' }}>
        {features.map((f,i) => (
          <div key={i} style={{ padding:'2rem', background:'#0e0d0b' }}>
            <div style={{ fontSize:'0.7rem', letterSpacing:'0.12em', textTransform:'uppercase',
              color:'#c9a84c', marginBottom:'0.75rem', fontWeight:500 }}>{f.label}</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.2rem',
              color:'#f5f2ec', marginBottom:'0.5rem', fontWeight:700 }}>{f.title}</h3>
            <p style={{ fontSize:'0.875rem', color:'rgba(245,242,236,0.5)',
              lineHeight:1.65, fontWeight:300 }}>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}