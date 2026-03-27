import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', warm:'#e8e0d0', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)' };

const EVENTS = [
  { tag:'NairobiMarathon2025',  name:'Nairobi Marathon 2025',         files:482, creators:34, location:'Nairobi, Kenya',    bg:'#1a2030', emoji:'🏃' },
  { tag:'AfricaFashionWeek',    name:'Africa Fashion Week',           files:1204,creators:89, location:'Lagos, Nigeria',    bg:'#1a1428', emoji:'🎭' },
  { tag:'CapeWinelands2025',    name:'Cape Winelands Festival',       files:310, creators:22, location:'Cape Town, SA',     bg:'#14181a', emoji:'🍷' },
  { tag:'LagosFilmFest',        name:'Lagos Film Festival',           files:891, creators:67, location:'Lagos, Nigeria',    bg:'#1e1a14', emoji:'🎬' },
  { tag:'KigaliTechSummit',     name:'Kigali Tech Summit',           files:245, creators:18, location:'Kigali, Rwanda',    bg:'#161620', emoji:'💻' },
  { tag:'MombasaBeachFest',     name:'Mombasa Beach Festival',        files:673, creators:51, location:'Mombasa, Kenya',   bg:'#0e1818', emoji:'🎶' },
  { tag:'AccraJazzFest',        name:'Accra Jazz Festival',           files:389, creators:29, location:'Accra, Ghana',     bg:'#1a1810', emoji:'🎷' },
  { tag:'JohannesburgArtWeek',  name:'Johannesburg Art Week',         files:512, creators:43, location:'Johannesburg, SA', bg:'#1a1414', emoji:'🎨' },
];

export default function Events() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const filtered = EVENTS.filter(e =>
    !search || e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />
      <div style={{ padding:'4rem 3rem 2rem' }}>
        <div style={{ maxWidth:580, marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase',
            color:C.gold, marginBottom:'1rem', fontWeight:500 }}>Event Index</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem',
            fontWeight:700, marginBottom:'1rem', lineHeight:1.1 }}>
            Find content from any <span style={{ color:C.gold, fontStyle:'italic' }}>event</span>
          </h1>
          <p style={{ color:C.muted, fontSize:'1rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
            Every event has its own hashtag. Browse hundreds of creators' shots —
            raw and edited — from one place.
          </p>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search events or locations…"
            style={{ width:'100%', maxWidth:420, padding:'0.7rem 1rem',
              border:`1px solid ${C.border}`, borderRadius:4, fontSize:'0.9rem',
              fontFamily:"'DM Sans',sans-serif", outline:'none', background:'#fff', boxSizing:'border-box' }} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1rem' }}>
          {filtered.map(ev => (
            <div key={ev.tag} onClick={() => navigate('/browse')}
              style={{ background:ev.bg, borderRadius:8, overflow:'hidden',
                cursor:'pointer', transition:'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
              <div style={{ height:120, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'3rem', opacity:0.35 }}>{ev.emoji}</div>
              <div style={{ padding:'1.25rem' }}>
                <div style={{ fontSize:'0.72rem', color:C.gold, marginBottom:6,
                  letterSpacing:'0.08em' }}>#{ev.tag}</div>
                <div style={{ fontWeight:600, fontSize:'1rem', color:'#f5f2ec',
                  marginBottom:4 }}>{ev.name}</div>
                <div style={{ fontSize:'0.78rem', color:'rgba(245,242,236,0.45)',
                  marginBottom:'1rem' }}>{ev.location}</div>
                <div style={{ display:'flex', gap:16 }}>
                  <div>
                    <div style={{ fontSize:'1.1rem', fontWeight:700, color:C.gold }}>{ev.files.toLocaleString()}</div>
                    <div style={{ fontSize:'0.68rem', color:'rgba(245,242,236,0.35)',
                      textTransform:'uppercase', letterSpacing:'0.06em' }}>Files</div>
                  </div>
                  <div>
                    <div style={{ fontSize:'1.1rem', fontWeight:700, color:'#f5f2ec' }}>{ev.creators}</div>
                    <div style={{ fontSize:'0.68rem', color:'rgba(245,242,236,0.35)',
                      textTransform:'uppercase', letterSpacing:'0.06em' }}>Creators</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}