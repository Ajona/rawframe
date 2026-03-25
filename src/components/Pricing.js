import React from 'react';

const plans = [
  { name:'Starter', price:'Free', note:'Always free to join and list', featured:false,
    features:['Unlimited uploads for sale','Event hashtag tagging','2 shareable links per upload','65% revenue share','3 sample files'] },
  { name:'Pro Creator', price:'$12/mo', note:'For active sellers and studios', featured:true,
    features:['Everything in Starter','70% revenue share','Priority listing in search','Analytics dashboard','Collection bundle pricing'] },
  { name:'Studio', price:'$49/mo', note:'For agencies and high-volume teams', featured:false,
    features:['Everything in Pro','75% revenue share','Team sub-accounts','API access for bulk uploads','Dedicated account manager'] },
];

export default function Pricing() {
  return (
    <section style={{ padding:'5rem 3rem', background:'#f5f2ec' }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:'1.5rem', marginBottom:'3rem' }}>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'4rem',
          fontWeight:700, color:'#e8e0d0', lineHeight:1 }}>04</span>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.4rem', fontWeight:700 }}>
          Simple, creator-first pricing</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
        {plans.map((p,i) => (
          <div key={i} style={{ background: p.featured ? '#0e0d0b' : '#fff',
            border: p.featured ? 'none' : '1px solid rgba(14,13,11,0.12)',
            borderRadius:'3px', padding:'2rem', position:'relative' }}>
            {p.featured && (
              <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
                background:'#c9a84c', color:'#0e0d0b', fontSize:'0.65rem', letterSpacing:'0.1em',
                textTransform:'uppercase', padding:'0.25rem 0.75rem',
                borderRadius:'0 0 3px 3px', fontWeight:500 }}>Most Popular</div>
            )}
            <div style={{ fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em',
              color: p.featured ? '#c9a84c' : '#7a7468', fontWeight:500, marginBottom:'0.75rem',
              marginTop: p.featured ? '1rem' : 0 }}>{p.name}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem',
              fontWeight:700, color: p.featured ? '#f5f2ec' : '#0e0d0b',
              lineHeight:1, marginBottom:'0.25rem' }}>{p.price}</div>
            <div style={{ fontSize:'0.8rem', color: p.featured ? 'rgba(245,242,236,0.5)' : '#7a7468',
              marginBottom:'1.5rem', fontWeight:300 }}>{p.note}</div>
            <ul style={{ listStyle:'none', marginBottom:'1.75rem' }}>
              {p.features.map((f,j) => (
                <li key={j} style={{ fontSize:'0.875rem',
                  color: p.featured ? 'rgba(245,242,236,0.7)' : '#7a7468',
                  display:'flex', alignItems:'center', gap:'0.5rem',
                  marginBottom:'0.6rem', fontWeight:300 }}>
                  <span style={{ width:16, height:16, borderRadius:'50%',
                    background: p.featured ? '#c9a84c' : '#f0dfa0',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:9, color:'#0e0d0b', flexShrink:0, fontWeight:700 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button style={{ width:'100%', padding:'0.75rem', borderRadius:'2px',
              fontSize:'0.875rem', fontWeight:500, letterSpacing:'0.02em',
              background: p.featured ? '#c9a84c' : 'transparent',
              color: p.featured ? '#0e0d0b' : '#0e0d0b',
              border: p.featured ? '1px solid #c9a84c' : '1px solid rgba(14,13,11,0.2)' }}>
              {p.featured ? 'Start Pro Trial' : p.name === 'Studio' ? 'Contact Sales' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}