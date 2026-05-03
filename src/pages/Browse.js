import { contentAPI } from '../services/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = {
  ink:'#0e0d0b',
  cream:'#f5f2ec',
  warm:'#e8e0d0',
  gold:'#c9a84c',
  muted:'#7a7468',
  border:'rgba(14,13,11,0.12)'
};

export default function Browse() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTag, setActiveTag] = useState('All');
  const [activeField, setActiveField] = useState('All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [hashtags, setHashtags] = useState([]);

  /* ── Load hashtags ───────────────────── */
  useEffect(() => {
    contentAPI.getHashtags()
      .then(res => {
        const tags = (res.data.hashtags || []).map(h => `#${h.tag}`);
        setHashtags(['All', ...tags]);
      })
      .catch(() => setHashtags(['All']));
  }, []);

  /* ── Load content on filter change ───── */
  useEffect(() => {
    setLoading(true);

    const params = {
      sort,
      ...(search && { search }),
      ...(activeTag !== 'All' && { hashtag: activeTag }),
      ...(activeField !== 'All' && { field: activeField })
    };

    contentAPI.browse(params)
      .then(res => setFiles(res.data.files || []))
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  }, [activeTag, activeField, sort, search]);

  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />

      <div style={{ padding:'3rem 3rem 1.5rem' }}>
        <h1 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:'2.4rem',
          fontWeight:700,
          marginBottom:8
        }}>
          Browse Content
        </h1>

        <p style={{ color:C.muted, fontSize:'0.95rem', marginBottom:'2rem' }}>
          Licensed photos and videos from creators worldwide.
        </p>

        {/* Search */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, event, or creator…"
          style={{
            width:'100%',
            maxWidth:480,
            padding:'0.7rem 1rem',
            border:`1px solid ${C.border}`,
            borderRadius:4,
            fontSize:'0.9rem',
            background:'#fff',
            marginBottom:'1.5rem',
            boxSizing:'border-box'
          }}
        />

        {/* Hashtags */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:'1rem' }}>
          {hashtags.map(t => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              style={{
                padding:'0.35rem 0.9rem',
                borderRadius:100,
                fontSize:'0.8rem',
                cursor:'pointer',
                background: activeTag === t ? C.ink : '#fff',
                color: activeTag === t ? C.cream : C.muted,
                border:`1px solid ${activeTag === t ? C.ink : C.border}`
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Field filters */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:'2rem' }}>
          {['All','Nature','Travel','Fashion','Food','Real Estate','Sports','Architecture'].map(f => (
            <button
              key={f}
              onClick={() => setActiveField(f)}
              style={{
                padding:'0.3rem 0.8rem',
                borderRadius:100,
                fontSize:'0.78rem',
                cursor:'pointer',
                background: activeField === f ? C.gold : 'transparent',
                color: activeField === f ? C.ink : C.muted,
                border:`1px solid ${activeField === f ? C.gold : C.border}`
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            padding:'0.35rem 0.75rem',
            border:`1px solid ${C.border}`,
            borderRadius:4,
            fontSize:'0.8rem',
            background:'#fff',
            marginBottom:'2rem'
          }}
        >
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>

        <div style={{ fontSize:'0.8rem', color:C.muted, marginBottom:'1.5rem' }}>
          {files.length} result{files.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* GRID */}
      <div style={{
        padding:'0 3rem 4rem',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',
        gap:'1rem'
      }}>
        {loading ? (
          <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'3rem', color:C.muted }}>
            Loading content…
          </div>
        ) : files.length === 0 ? (
          <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'3rem', color:C.muted }}>
            No content found. Try adjusting your filters.
          </div>
        ) : (
          files.map(item => (
            <div
              key={item.id}
              style={{
                background: item.bg_color || '#1a1a14',
                borderRadius:6,
                overflow:'hidden',
                cursor:'pointer',
                transition:'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >
              {/* Preview */}
              <div style={{ height:180, position:'relative' }}>
                {item.preview_url ? (
                  <img
                    src={item.preview_url}
                    alt={item.title}
                    style={{ width:'100%', height:'100%', objectFit:'cover' }}
                  />
                ) : (
                  <div style={{
                    height:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    fontSize:'3.5rem',
                    opacity:0.35
                  }}>
                    📷
                  </div>
                )}

                <div style={{
                  position:'absolute',
                  top:10,
                  right:10,
                  fontSize:'0.65rem',
                  background:'rgba(201,168,76,0.8)',
                  color:C.ink,
                  padding:'0.2rem 0.5rem',
                  borderRadius:2,
                  fontWeight:600
                }}>
                  {item.file_type}
                </div>

                {item.hashtag && (
                  <div style={{
                    position:'absolute',
                    top:10,
                    left:10,
                    fontSize:'0.65rem',
                    background:'rgba(14,13,11,0.7)',
                    color:'#f0dfa0',
                    padding:'0.2rem 0.5rem',
                    borderRadius:2
                  }}>
                    #{item.hashtag}
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding:'1rem' }}>
                <div style={{ fontWeight:500, color:'#f5f2ec', marginBottom:4 }}>
                  {item.title}
                </div>

                <div style={{ fontSize:'0.75rem', color:'rgba(245,242,236,0.45)', marginBottom:'0.75rem' }}>
                  {item.users?.name || 'Creator'}
                </div>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'1.1rem', fontWeight:700, color:C.gold }}>
                    ${item.price?.toFixed(2) || '—'}
                  </span>

                  <button
                    onClick={() => navigate('/checkout', {
                      state: {
                        item: {
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          type: item.file_type,
                          tag: item.hashtag,
                          creator: item.users?.name,
                          preview_url: item.preview_url
                        }
                      }
                    })}
                    style={{
                      background:C.gold,
                      color:C.ink,
                      border:'none',
                      borderRadius:2,
                      padding:'0.35rem 0.85rem',
                      fontSize:'0.78rem',
                      fontWeight:600,
                      cursor:'pointer'
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}