import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', warm:'#e8e0d0', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)' };

const CATEGORIES = [
  { name:'Nature & Wildlife', emoji:'🌿', count:2840, color:'#0e1a10' },
  { name:'Fashion',           emoji:'👗', count:1920, color:'#1a1428' },
  { name:'Travel',            emoji:'✈️', count:3410, color:'#101828' },
  { name:'Food & Drink',      emoji:'🍽️', count:2100, color:'#1e1510' },
  { name:'Real Estate',       emoji:'🏠', count:890,  color:'#0e1a18' },
  { name:'Sports & Events',   emoji:'🏃', count:4230, color:'#1a2030' },
  { name:'Architecture',      emoji:'🏛️', count:1340, color:'#161620' },
  { name:'Street Photography',emoji:'📷', count:2760, color:'#1a1a14' },
];

export default function Explore() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />
      <div style={{ padding:'4rem 3rem 2rem' }}>
        <div style={{ maxWidth:600, marginBottom:'3rem' }}>
          <div style={{ fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase',
            color:C.gold, marginBottom:'1rem', fontWeight:500 }}>Explore RawFrame</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem',
            fontWeight:700, marginBottom:'1rem', lineHeight:1.1 }}>
            Discover content by <span style={{ color:C.gold, fontStyle:'italic' }}>category</span>
          </h1>
          <p style={{ color:C.muted, fontSize:'1rem', lineHeight:1.7 }}>
            Browse thousands of licensed photos and videos across every creative field.
            Every shot is creator-owned, event-tagged, and ready to license.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1rem' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.name} onClick={() => navigate('/browse')}
              style={{ background:cat.color, borderRadius:6, padding:'2rem',
                cursor:'pointer', transition:'transform 0.2s', minHeight:160,
                display:'flex', flexDirection:'column', justifyContent:'space-between' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{ fontSize:'2.5rem' }}>{cat.emoji}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:'1rem', color:'#f5f2ec', marginBottom:4 }}>{cat.name}</div>
                <div style={{ fontSize:'0.78rem', color:'rgba(245,242,236,0.45)' }}>
                  {cat.count.toLocaleString()} files
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending section */}
      <div style={{ padding:'3rem', borderTop:`1px solid ${C.border}` }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem',
          fontWeight:700, marginBottom:'1.5rem' }}>Trending this week</h2>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          {['#NairobiMarathon','#AfricaFashionWeek','#CapeWinelands','#LagosFilmFest',
            '#KigaliTechSummit','#MombasaBeachFest','#AccraJazzFest'].map(tag => (
            <div key={tag} onClick={() => navigate('/browse')}
              style={{ padding:'0.5rem 1.1rem', background:'#fff',
                border:`1px solid ${C.border}`, borderRadius:100, fontSize:'0.85rem',
                color:C.gold, cursor:'pointer', fontWeight:500, transition:'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background=C.ink; e.currentTarget.style.color=C.gold; }}
              onMouseLeave={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color=C.gold; }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}