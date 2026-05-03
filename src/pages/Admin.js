import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';

const C = {
  ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468',
  white:'#ffffff', border:'rgba(14,13,11,0.12)', success:'#4a6741',
  danger:'#b84c2e', sidebar:'#0a0908'
};

function AdminSidebar({ active, setActive }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const items = [
    { id:'overview', icon:'◈', label:'Overview' },
    { id:'users', icon:'◉', label:'Users' },
    { id:'content', icon:'↑', label:'Content' },
    { id:'earnings', icon:'⇄', label:'Earnings' },
    { id:'requests', icon:'◎', label:'Access Requests' },
  ];

  return (
    <aside style={{ width:230, background:C.sidebar, minHeight:'100vh', display:'flex', flexDirection:'column', flexShrink:0 }}>
      <div style={{ padding:'1.75rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.06)', cursor:'pointer' }}
        onClick={() => navigate('/')}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:700, color:'#f5f2ec' }}>
          Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
        </div>
        <div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:4 }}>
          Admin Panel
        </div>
      </div>

      <nav style={{ padding:'1rem 0', flex:1 }}>
        {items.map(item => (
          <div key={item.id} onClick={() => setActive(item.id)}
            style={{
              display:'flex', alignItems:'center', gap:12,
              padding:'0.75rem 1.5rem', cursor:'pointer',
              background: active===item.id ? 'rgba(201,168,76,0.1)' : 'transparent',
              borderLeft: active===item.id ? `3px solid ${C.gold}` : '3px solid transparent'
            }}>
            <span style={{ color: active===item.id ? C.gold : 'rgba(255,255,255,0.35)' }}>
              {item.icon}
            </span>
            <span style={{
              fontSize:'0.85rem',
              color: active===item.id ? '#f5f2ec' : 'rgba(255,255,255,0.4)'
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      <div style={{ padding:'1.25rem 1.5rem', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => { logout(); navigate('/'); }}
          style={{
            width:'100%', background:'transparent',
            border:'1px solid rgba(255,255,255,0.1)',
            color:'rgba(255,255,255,0.35)', borderRadius:2,
            padding:'0.4rem', fontSize:'0.75rem', cursor:'pointer'
          }}>
          Sign out
        </button>
      </div>
    </aside>
  );
}

function ACard({ label, value, sub, accent }) {
  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.25rem 1.5rem', flex:1 }}>
      <div style={{ fontSize:'0.72rem', color:C.muted, textTransform:'uppercase' }}>{label}</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:700, color:accent||C.ink }}>
        {value}
      </div>
      {sub && <div style={{ fontSize:'0.78rem', color:C.muted }}>{sub}</div>}
    </div>
  );
}

/* ---------------- OVERVIEW (API) ---------------- */
function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getOverview()
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding:'2rem', color:C.muted }}>Loading…</div>;
  if (!stats) return <div style={{ padding:'2rem', color:C.danger }}>Failed to load overview.</div>;

  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem' }}>
        Platform Overview
      </h2>

      <div style={{ display:'flex', gap:16, margin:'1.5rem 0' }}>
        <ACard label="Total GMV" value={`$${stats.totalGMV}`} sub="All time" accent={C.gold} />
        <ACard label="Platform Revenue" value={`$${stats.platformRevenue}`} sub="30% of GMV" />
        <ACard label="Total Creators" value={stats.totalCreators} />
        <ACard label="Total Buyers" value={stats.totalBuyers} />
      </div>
    </div>
  );
}

/* ---------------- USERS (API) ---------------- */
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    adminAPI.getUsers({ search })
      .then(res => setUsers(res.data.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, [search]);

  if (loading) return <div style={{ padding:'2rem', color:C.muted }}>Loading users…</div>;

  return (
    <div>
      <h2>Users</h2>

      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search users…"
        style={{ margin:'1rem 0', padding:'0.5rem', border:`1px solid ${C.border}` }} />

      {users.map(u => (
        <div key={u.id} style={{ padding:'0.75rem', borderBottom:`1px solid ${C.border}` }}>
          <strong>{u.name}</strong> — {u.email} ({u.role})
        </div>
      ))}
    </div>
  );
}

/* ---------------- REQUESTS (API) ---------------- */
function AdminRequests() {
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getAccessRequests()
      .then(res => setReqs(res.data.requests || []))
      .catch(() => setReqs([]))
      .finally(() => setLoading(false));
  }, []);

  const approve = async (id) => {
    await adminAPI.respondToAccessRequest(id, 'approved');
    setReqs(r => r.map(x => x.id === id ? { ...x, status:'approved' } : x));
  };

  const deny = async (id) => {
    await adminAPI.respondToAccessRequest(id, 'denied');
    setReqs(r => r.map(x => x.id === id ? { ...x, status:'denied' } : x));
  };

  if (loading) return <div style={{ padding:'2rem', color:C.muted }}>Loading requests…</div>;

  return (
    <div>
      <h2>Access Requests</h2>

      {reqs.map(r => (
        <div key={r.id} style={{ padding:'1rem', borderBottom:`1px solid ${C.border}` }}>
          <div>{r.file}</div>
          <small>{r.creator} — {r.reason}</small>

          {r.status === 'pending' ? (
            <div>
              <button onClick={() => approve(r.id)}>Approve</button>
              <button onClick={() => deny(r.id)}>Deny</button>
            </div>
          ) : (
            <span>{r.status}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------- MAIN ---------------- */
export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');

  if (!user) return <div>Please sign in.</div>;
  if (user.role !== 'admin') return <div>Access denied.</div>;

  const panels = {
    overview: <AdminOverview />,
    users: <AdminUsers />,
    content: <div>Content</div>,
    earnings: <div>Earnings</div>,
    requests: <AdminRequests />,
  };

  return (
    <div style={{ display:'flex' }}>
      <AdminSidebar active={active} setActive={setActive} />
      <main style={{ flex:1, padding:'2rem' }}>
        {panels[active]}
      </main>
    </div>
  );
}