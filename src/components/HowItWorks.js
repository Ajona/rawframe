import React from 'react';

const steps = [
  { icon:'📤', title:'Upload your content',
    body:'Upload single files or full collections. Tag your content to an event hashtag. Our AI scans every upload to ensure it\'s original.' },
  { icon:'💰', title:'Set your price',
    body:'Price per file, per collection, or both. Add a 10–20% promotional discount when you want to boost sales. Always in control.' },
  { icon:'🔗', title:'Share & earn instantly',
    body:'Share your profile link or a specific collection on social media. Earnings appear in your dashboard immediately after each sale.' },
];

export default function HowItWorks() {
  return (
    <section style={{ padding:'5rem 3rem' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:'1.5rem', marginBottom:'3rem' }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'4rem',
          fontWeight:700, color:'#e8e0d0', lineHeight:1 }}>01</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.4rem',
          fontWeight:700, letterSpacing:'-0.02em' }}>How RawFrame works</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)',
        border:'1px solid rgba(14,13,11,0.12)', borderRadius:'3px',
        overflow:'hidden', background:'#fff' }}>
        {steps.map((s,i) => (
          <div key={i} style={{ padding:'2rem',
            borderRight: i<2 ? '1px solid rgba(14,13,11,0.12)' : 'none' }}>
            <div style={{ fontSize:'1.5rem', marginBottom:'1.25rem' }}>{s.icon}</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.15rem',
              fontWeight:700, marginBottom:'0.5rem' }}>{s.title}</h3>
            <p style={{ fontSize:'0.875rem', color:'#7a7468', lineHeight:1.65,
              fontWeight:300 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}