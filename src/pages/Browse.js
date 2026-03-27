import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', warm:'#e8e0d0', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)' };

const TAGS = ['All','#NairobiMarathon','#AfricaFashionWeek','#LagosFilmFest','#CapeWinelands','#KigaliTechSummit','#MombasaBeachFest'];
const FIELDS = ['All','Nature','Travel','Fashion','Food','Real Estate','Sports','Architecture'];

const ITEMS = [
  { id:1, title:'Nairobi Marathon Start Line',  tag:'#NairobiMarathon',   field:'Sports',      price:4.99,  type:'RAW',      emoji:'🏃', bg:'#1a2030' },
  { id:2, title:'Fashion Week Backstage',        tag:'#AfricaFashionWeek', field:'Fashion',     price:12.00, type:'Edited',   emoji:'🎭', bg:'#1a1a2e' },
  { id:3, title:'Savanna Sunset Wide',           tag:'',                   field:'Nature',      price:8.50,  type:'RAW',      emoji:'🌅', bg:'#1e1510' },
  { id:4, title:'Lagos Street Food Market',      tag:'#LagosFilmFest',     field:'Food',        price:3.50,  type:'RAW',      emoji:'🍽️', bg:'#1e1a14' },
  { id:5, title:'Cape Vineyard Aerial',          tag:'#CapeWinelands',     field:'Travel',      price:15.00, type:'Edited',   emoji:'🍷', bg:'#14181a' },
  { id:6, title:'Luxury Apartment Interior',     tag:'',                   field:'Real Estate', price:9.00,  type:'Edited',   emoji:'🏠', bg:'#0e1a18' },
  { id:7, title:'Marathon Finish — Bundle x12', tag:'#NairobiMarathon',   field:'Sports',      price:18.00, type:'Bundle',   emoji:'🏅', bg:'#201a10' },
  { id:8, title:'Kigali Skyline at Dusk',        tag:'#KigaliTechSummit',  field:'Architecture',price:11.00, type:'RAW',      emoji:'🌆', bg:'#161620' },
  { id:9, title:'Beach Festival Crowd',          tag:'#MombasaBeachFest',  field:'Travel',      price:5.50,  type:'RAW',      emoji:'🎶', bg:'#0e1818' },
  { id:10,title:'Editorial Food Flats x6',       tag:'',                   field:'Food',        price:22.00, type:'Bundle',   emoji:'🥗', bg:'#1a1810' },
  { id:11,title:'Street Style — Accra',          tag:'#AfricaFashionWeek', field:'Fashion',     price:7.00,  type:'Edited',   emoji:'👗', bg:'#1a1428' },
  { id:12,title:'Waterfall — 4K Video',          tag:'',                   field:'Nature',      price:14.00, type:'Video',    emoji:'🌊', bg:'#101a1a' },
];

export default function Browse() {
  const navigate = useNavigate();
  const [activeTag,   setActiveTag]   = useState('All');
  const [activeField, setActiveField] = useState('All');
  const [sort,        setSort]        = useState('newest');
  const [search,      setSearch]      = useState('');

  const filtered = ITEMS
    .filter(i => activeTag   === 'All' || i.tag   === activeTag)
    .filter(i => activeField === 'All' || i.field === activeField)
    .filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort==='price-asc' ? a.price-b.price : sort==='price-desc' ? b.price-a.price : b.id-a.id);

  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />
      <div style={{ padding:'3rem 3rem 1.5rem' }}>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.4rem', fontWeight:700, marginBottom:8 }}>Browse Content</h1>
        <p style={{ color:C.muted, fontSize:'0.95rem', marginBottom:'2rem' }}>
          Licensed photos and videos from creators worldwide. Search by event, field, or keyword.
        </p>

        {/* Search */}
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, event, or creator…"
          style={{ width:'100%', maxWidth:480, padding:'0.7rem 1rem',
            border:`1px solid ${C.border}`, borderRadius:4, fontSize:'0.9rem',
            fontFamily:"'DM Sans',sans-serif", outline:'none',
            background:'#fff', marginBottom:'1.5rem', boxSizing:'border-box' }} />

        {/* Hashtag filter */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:'1rem' }}>
          {TAGS.map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              style={{ padding:'0.35rem 0.9rem', borderRadius:100, fontSize:'0.8rem',
                cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                background: activeTag===t ? C.ink : '#fff',
                color: activeTag===t ? C.cream : C.muted,
                border:`1px solid ${activeTag===t ? C.ink : C.border}` }}>{t}</button>
          ))}
        </div>

        {/* Field + sort row */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:12, marginBottom:'2rem' }}>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {FIELDS.map(f => (
              <button key={f} onClick={() => setActiveField(f)}
                style={{ padding:'0.3rem 0.8rem', borderRadius:100, fontSize:'0.78rem',
                  cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                  background: activeField===f ? C.gold : 'transparent',
                  color: activeField===f ? C.ink : C.muted,
                  border:`1px solid ${activeField===f ? C.gold : C.border}` }}>{f}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ padding:'0.35rem 0.75rem', border:`1px solid ${C.border}`, borderRadius:4,
              fontSize:'0.8rem', fontFamily:"'DM Sans',sans-serif",
              background:'#fff', color:C.muted, outline:'none', cursor:'pointer' }}>
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        <div style={{ fontSize:'0.8rem', color:C.muted, marginBottom:'1.5rem' }}>
          {filtered.length} result{filtered.length!==1?'s':''} found
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding:'0 3rem 4rem',
        display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1rem' }}>
        {filtered.map(item => (
          <div key={item.id}
            style={{ background:item.bg, borderRadius:6, overflow:'hidden',
              cursor:'pointer', transition:'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
            <div style={{ height:180, display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:'3.5rem', opacity:0.35,
              position:'relative' }}>
              {item.emoji}
              <div style={{ position:'absolute', top:10, right:10, fontSize:'0.65rem',
                background:'rgba(201,168,76,0.8)', color:C.ink, padding:'0.2rem 0.5rem',
                borderRadius:2, fontWeight:600, letterSpacing:'0.06em' }}>{item.type}</div>
              {item.tag && <div style={{ position:'absolute', top:10, left:10, fontSize:'0.65rem',
                background:'rgba(14,13,11,0.7)', color:'#f0dfa0', padding:'0.2rem 0.5rem',
                borderRadius:2 }}>{item.tag}</div>}
            </div>
            <div style={{ padding:'1rem' }}>
              <div style={{ fontWeight:500, fontSize:'0.9rem', color:'#f5f2ec',
                marginBottom:4, lineHeight:1.4 }}>{item.title}</div>
              <div style={{ fontSize:'0.75rem', color:'rgba(245,242,236,0.45)',
                marginBottom:'0.75rem' }}>{item.field}</div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:'1.1rem', fontWeight:700, color:C.gold }}>
                  ${item.price.toFixed(2)}
                </span>
                <button onClick={() => navigate('/login')}
                  style={{ background:C.gold, color:C.ink, border:'none',
                    borderRadius:2, padding:'0.35rem 0.85rem', fontSize:'0.78rem',
                    fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}