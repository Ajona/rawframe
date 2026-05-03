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

export default function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  /* ── Fetch events from API ───────────── */
  useEffect(() => {
    setLoading(true);

    contentAPI.getEvents(search)
      .then(res => setEvents(res.data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />

      <div style={{ padding:'4rem 3rem 2rem' }}>
        <div style={{ maxWidth:580, marginBottom:'2.5rem' }}>
          <div style={{
            fontSize:'0.75rem',
            letterSpacing:'0.15em',
            textTransform:'uppercase',
            color:C.gold,
            marginBottom:'1rem',
            fontWeight:500
          }}>
            Event Index
          </div>

          <h1 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'3rem',
            fontWeight:700,
            marginBottom:'1rem',
            lineHeight:1.1
          }}>
            Find content from any <span style={{ color:C.gold, fontStyle:'italic' }}>event</span>
          </h1>

          <p style={{
            color:C.muted,
            fontSize:'1rem',
            lineHeight:1.7,
            marginBottom:'1.5rem'
          }}>
            Every event has its own hashtag. Browse creator content from across Africa.
          </p>

          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events or locations…"
            style={{
              width:'100%',
              maxWidth:420,
              padding:'0.7rem 1rem',
              border:`1px solid ${C.border}`,
              borderRadius:4,
              fontSize:'0.9rem',
              fontFamily:"'DM Sans',sans-serif",
              outline:'none',
              background:'#fff',
              boxSizing:'border-box'
            }}
          />
        </div>

        {/* GRID */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',
          gap:'1rem'
        }}>
          {loading ? (
            <div style={{
              gridColumn:'1/-1',
              textAlign:'center',
              padding:'3rem',
              color:C.muted
            }}>
              Loading events…
            </div>
          ) : events.length === 0 ? (
            <div style={{
              gridColumn:'1/-1',
              textAlign:'center',
              padding:'3rem',
              color:C.muted
            }}>
              No events found.
            </div>
          ) : (
            events.map(ev => (
              <div
                key={ev.tag}
                onClick={() => navigate('/browse')}
                style={{
                  background: ev.bg_color || '#1a1a14',
                  borderRadius:8,
                  overflow:'hidden',
                  cursor:'pointer',
                  transition:'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                {/* Emoji / header */}
                <div style={{
                  height:120,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  fontSize:'3rem',
                  opacity:0.35
                }}>
                  {ev.emoji || '🎬'}
                </div>

                <div style={{ padding:'1.25rem' }}>
                  <div style={{
                    fontSize:'0.72rem',
                    color:C.gold,
                    marginBottom:6,
                    letterSpacing:'0.08em'
                  }}>
                    #{ev.tag}
                  </div>

                  <div style={{
                    fontWeight:600,
                    fontSize:'1rem',
                    color:'#f5f2ec',
                    marginBottom:4
                  }}>
                    {ev.name}
                  </div>

                  <div style={{
                    fontSize:'0.78rem',
                    color:'rgba(245,242,236,0.45)',
                    marginBottom:'1rem'
                  }}>
                    {ev.location}
                  </div>

                  <div style={{ display:'flex', gap:16 }}>
                    <div>
                      <div style={{ fontSize:'1.1rem', fontWeight:700, color:C.gold }}>
                        {ev.files?.toLocaleString?.() || 0}
                      </div>
                      <div style={{
                        fontSize:'0.68rem',
                        color:'rgba(245,242,236,0.35)',
                        textTransform:'uppercase',
                        letterSpacing:'0.06em'
                      }}>
                        Files
                      </div>
                    </div>

                    <div>
                      <div style={{
                        fontSize:'1.1rem',
                        fontWeight:700,
                        color:'#f5f2ec'
                      }}>
                        {ev.creators || 0}
                      </div>
                      <div style={{
                        fontSize:'0.68rem',
                        color:'rgba(245,242,236,0.35)',
                        textTransform:'uppercase',
                        letterSpacing:'0.06em'
                      }}>
                        Creators
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}