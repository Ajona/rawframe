import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', warm:'#e8e0d0', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)' };

const CREATORS = [
  { name:'Amara Osei',    initials:'AO', field:'Fashion · Street',    files:142, sales:891,  rating:4.9, location:'Accra, Ghana' },
  { name:'Priya Nair',    initials:'PN', field:'Nature · Travel',     files:98,  sales:643,  rating:4.8, location:'Nairobi, Kenya' },
  { name:'Kofi Mensah',   initials:'KM', field:'Sports · Events',     files:210, sales:1204, rating:5.0, location:'Lagos, Nigeria' },
  { name:'Zanele Dlamini',initials:'ZD', field:'Real Estate · Interiors',files:67,sales:312, rating:4.7, location:'Johannesburg, SA' },
  { name:'Mwangi Kamau',  initials:'MK', field:'Food · Editorial',    files:88,  sales:520,  rating:4.9, location:'Nairobi, Kenya' },
  { name:'Fatima Al-Rashid',initials:'FA',field:'Architecture',       files:54,  sales:287,  rating:4.8, location:'Kigali, Rwanda' },
];

export default function Creators() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />
      <div style={{ padding:'4rem 3rem 2rem' }}>
        <div style={{ maxWidth:580, marginBottom:'3rem' }}>
          <div style={{ fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase',
            color:C.gold, marginBottom:'1rem', fontWeight:500 }}>Creator Community</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'3rem',
            fontWeight:700, marginBottom:'1rem', lineHeight:1.1 }}>
            Meet the <span style={{ color:C.gold, fontStyle:'italic' }}>creators</span>
          </h1>
          <p style={{ color:C.muted, fontSize:'1rem', lineHeight:1.7 }}>
            Thousands of photographers and videographers across Africa and beyond — selling
            authentic, event-indexed content on RawFrame.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'1rem' }}>
          {CREATORS.map(cr => (
            <div key={cr.name}
              style={{ background:'#fff', border:`1px solid ${C.border}`, borderRadius:8,
                padding:'1.5rem', transition:'transform 0.2s, box-shadow 0.2s', cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:'1rem' }}>
                <div style={{ width:52, height:52, borderRadius:'50%',
                  background:'rgba(201,168,76,0.15)', display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'1rem', fontWeight:600,
                  color:C.gold, border:`1px solid rgba(201,168,76,0.25)`, flexShrink:0 }}>
                  {cr.initials}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:'1rem' }}>{cr.name}</div>
                  <div style={{ fontSize:'0.78rem', color:C.muted }}>{cr.location}</div>
                </div>
              </div>
              <div style={{ fontSize:'0.8rem', color:C.gold, marginBottom:'1rem',
                padding:'0.3rem 0.7rem', background:'rgba(201,168,76,0.08)',
                borderRadius:100, display:'inline-block' }}>{cr.field}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)',
                gap:8, marginBottom:'1.25rem' }}>
                {[['Files',cr.files],['Sales',cr.sales],['Rating',`${cr.rating}★`]].map(([l,v]) => (
                  <div key={l} style={{ textAlign:'center', padding:'0.5rem',
                    background:'#faf7f0', borderRadius:4 }}>
                    <div style={{ fontSize:'1rem', fontWeight:700, color:C.ink }}>{v}</div>
                    <div style={{ fontSize:'0.68rem', color:C.muted, textTransform:'uppercase',
                      letterSpacing:'0.06em' }}>{l}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/browse')}
                style={{ width:'100%', padding:'0.6rem', background:'transparent',
                  border:`1px solid ${C.border}`, borderRadius:2, fontSize:'0.82rem',
                  cursor:'pointer', fontFamily:"'DM Sans',sans-serif", color:C.ink }}>
                View Portfolio →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ margin:'2rem 3rem 4rem', background:C.ink, borderRadius:8,
        padding:'3rem', display:'flex', justifyContent:'space-between', alignItems:'center',
        flexWrap:'wrap', gap:'1.5rem' }}>
        <div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.8rem',
            fontWeight:700, color:'#f5f2ec', marginBottom:8 }}>
            Ready to start <span style={{ color:C.gold, fontStyle:'italic' }}>earning?</span>
          </h2>
          <p style={{ color:'rgba(245,242,236,0.55)', fontSize:'0.9rem' }}>
            Join thousands of creators selling their content on RawFrame.
          </p>
        </div>
        <button onClick={() => navigate('/signup')}
          style={{ background:C.gold, color:C.ink, border:'none', borderRadius:2,
            padding:'0.875rem 2rem', fontSize:'0.9rem', fontWeight:600,
            cursor:'pointer', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap' }}>
          Create Free Account
        </button>
      </div>
      <Footer />
    </div>
  );
}