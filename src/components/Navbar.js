import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)' };

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label:'Explore',   path:'/explore'  },
    { label:'Creators',  path:'/creators' },
    { label:'Events',    path:'/events'   },
    { label:'Pricing',   path:'/pricing'  },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'1.25rem 3rem', background:C.cream,
      borderBottom:`1px solid ${C.border}`, position:'sticky', top:0, zIndex:100 }}>

      <div onClick={() => navigate('/')}
        style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.5rem',
          fontWeight:700, cursor:'pointer' }}>
        Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
      </div>

      <ul style={{ display:'flex', gap:'2rem', listStyle:'none' }}>
        {links.map(l => (
          <li key={l.label}>
            <span onClick={() => navigate(l.path)}
              style={{ fontSize:'0.875rem', letterSpacing:'0.03em', cursor:'pointer',
                color: location.pathname === l.path ? C.ink : (hovered===l.label ? C.ink : C.muted),
                fontWeight: location.pathname === l.path ? 500 : 400,
                transition:'color 0.2s' }}
              onMouseEnter={() => setHovered(l.label)}
              onMouseLeave={() => setHovered(null)}>{l.label}</span>
          </li>
        ))}
      </ul>

      <div style={{ display:'flex', gap:10, alignItems:'center' }}>
        {user ? (
          <div style={{ position:'relative' }}>
            <div onClick={() => setMenuOpen(o => !o)}
              style={{ width:36, height:36, borderRadius:'50%',
                background:'rgba(201,168,76,0.2)', display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'0.78rem', fontWeight:600,
                color:C.gold, cursor:'pointer', border:`1px solid rgba(201,168,76,0.3)` }}>
              {user.initials}
            </div>
            {menuOpen && (
              <div style={{ position:'absolute', right:0, top:44, background:C.cream,
                border:`1px solid ${C.border}`, borderRadius:6, minWidth:180,
                boxShadow:'0 4px 20px rgba(0,0,0,0.08)', zIndex:200 }}>
                <div style={{ padding:'0.75rem 1rem', borderBottom:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:'0.875rem', fontWeight:500 }}>{user.name}</div>
                  <div style={{ fontSize:'0.75rem', color:C.muted }}>{user.email}</div>
                </div>
                {[
                  { label:'Dashboard', path:'/dashboard' },
                  ...(user.role==='admin' ? [{ label:'Admin Panel', path:'/admin' }] : []),
                ].map(item => (
                  <div key={item.label} onClick={() => { navigate(item.path); setMenuOpen(false); }}
                    style={{ padding:'0.65rem 1rem', fontSize:'0.875rem', cursor:'pointer',
                      color:C.ink, transition:'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background='#f0e8d0'}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    {item.label}
                  </div>
                ))}
                <div onClick={handleLogout}
                  style={{ padding:'0.65rem 1rem', fontSize:'0.875rem', cursor:'pointer',
                    color:'#b84c2e', borderTop:`1px solid ${C.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background='#faf7f0'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  Sign out
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/login')}
              style={{ background:'transparent', color:C.ink, padding:'0.5rem 1rem',
                border:`1px solid ${C.border}`, borderRadius:2, fontSize:'0.875rem', cursor:'pointer' }}>
              Log in
            </button>
            <button onClick={() => navigate('/signup')}
              style={{ background:C.ink, color:C.cream, padding:'0.5rem 1.25rem',
                border:'none', borderRadius:2, fontSize:'0.875rem', fontWeight:500, cursor:'pointer' }}>
              Start Selling Free
            </button>
          </>
        )}
      </div>
    </nav>
  );
}