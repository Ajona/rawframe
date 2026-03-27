import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468',
  white:'#ffffff', border:'rgba(14,13,11,0.12)', success:'#4a6741',
  danger:'#b84c2e', sidebar:'#0a0908' };

const USERS = [
  { id:1, name:'Jane Doe',      email:'jane@rawframe.io',    role:'creator', plan:'pro',     files:37, earnings:1760, joined:'Jan 2025', status:'active' },
  { id:2, name:'Kofi Mensah',   email:'kofi@gmail.com',      role:'creator', plan:'studio',  files:210,earnings:8920, joined:'Nov 2024', status:'active' },
  { id:3, name:'Priya Nair',    email:'priya@mail.com',      role:'creator', plan:'starter', files:98, earnings:3200, joined:'Feb 2025', status:'active' },
  { id:4, name:'Zanele D.',     email:'zanele@studio.co.za', role:'creator', plan:'pro',     files:67, earnings:2100, joined:'Dec 2024', status:'active' },
  { id:5, name:'Marcus Webb',   email:'mwebb@agency.com',    role:'buyer',   plan:'starter', files:0,  earnings:0,    joined:'Mar 2025', status:'active' },
  { id:6, name:'Aisha Kamara',  email:'aisha@rawframe.io',   role:'creator', plan:'starter', files:12, earnings:410,  joined:'Mar 2025', status:'flagged' },
];

const REQUESTS = [
  { id:1, admin:'Admin User', creator:'Jane Doe',    file:'NairobiMarathon_raw_047.jpg', reason:'Dispute resolution', status:'pending', date:'Mar 22' },
  { id:2, admin:'Admin User', creator:'Kofi Mensah', file:'FashionWeek_4K_collection.zip', reason:'Quality check',    status:'approved', date:'Mar 20' },
];

function AdminSidebar({ active, setActive }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const items = [
    { id:'overview', icon:'◈', label:'Overview'     },
    { id:'users',    icon:'◉', label:'Users'        },
    { id:'content',  icon:'↑', label:'Content'      },
    { id:'earnings', icon:'⇄', label:'Earnings'     },
    { id:'requests', icon:'◎', label:'Access Requests' },
  ];
  return (
    <aside style={{ width:230, background:C.sidebar, minHeight:'100vh',
      display:'flex', flexDirection:'column', flexShrink:0 }}>
      <div style={{ padding:'1.75rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.06)', cursor:'pointer' }}
        onClick={() => navigate('/')}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:700, color:'#f5f2ec' }}>
          Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
        </div>
        <div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.3)',
          letterSpacing:'0.12em', textTransform:'uppercase', marginTop:4 }}>Admin Panel</div>
      </div>
      <nav style={{ padding:'1rem 0', flex:1 }}>
        {items.map(item => (
          <div key={item.id} onClick={() => setActive(item.id)}
            style={{ display:'flex', alignItems:'center', gap:12, padding:'0.75rem 1.5rem',
              cursor:'pointer', transition:'all 0.15s',
              background: active===item.id ? 'rgba(201,168,76,0.1)' : 'transparent',
              borderLeft: active===item.id ? `3px solid ${C.gold}` : '3px solid transparent' }}>
            <span style={{ fontSize:'0.9rem', color: active===item.id ? C.gold : 'rgba(255,255,255,0.35)' }}>{item.icon}</span>
            <span style={{ fontSize:'0.85rem', fontWeight: active===item.id?500:400,
              color: active===item.id ? '#f5f2ec' : 'rgba(255,255,255,0.4)' }}>{item.label}</span>
            {item.id==='requests' && <span style={{ marginLeft:'auto', background:C.danger,
              color:'#fff', fontSize:'0.65rem', padding:'0.1rem 0.45rem', borderRadius:100, fontWeight:700 }}>1</span>}
          </div>
        ))}
      </nav>
      <div style={{ padding:'1.25rem 1.5rem', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={() => { logout(); navigate('/'); }}
          style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.1)',
            color:'rgba(255,255,255,0.35)', borderRadius:2, padding:'0.4rem',
            fontSize:'0.75rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Sign out</button>
      </div>
    </aside>
  );
}

function ACard({ label, value, sub, accent }) {
  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.25rem 1.5rem', flex:1 }}>
      <div style={{ fontSize:'0.72rem', color:C.muted, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>{label}</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:700,
        color:accent||C.ink, lineHeight:1, marginBottom:4 }}>{value}</div>
      {sub && <div style={{ fontSize:'0.78rem', color:C.muted }}>{sub}</div>}
    </div>
  );
}

function AdminOverview() {
  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:'1.5rem' }}>Platform Overview</h2>
      <div style={{ display:'flex', gap:16, marginBottom:24 }}>
        <ACard label="Total GMV"       value="$48,200" sub="All time"           accent={C.gold} />
        <ACard label="Platform Revenue" value="$14,460" sub="30% of GMV" />
        <ACard label="Total Creators"   value="1,284"   sub="+89 this month" />
        <ACard label="Total Buyers"     value="3,920"   sub="+342 this month" />
      </div>
      <div style={{ display:'flex', gap:16 }}>
        <div style={{ flex:2, background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.5rem' }}>
          <div style={{ fontSize:'0.78rem', fontWeight:500, textTransform:'uppercase',
            letterSpacing:'0.08em', color:C.muted, marginBottom:16 }}>Revenue (last 6 months)</div>
          {[['Jan',4200],['Feb',6800],['Mar',5900],['Apr',9100],['May',8400],['Jun',14460]].map(([m,v],i,a) => (
            <div key={m} style={{ display:'flex', alignItems:'center', gap:12,
              marginBottom: i<a.length-1?8:0 }}>
              <div style={{ width:32, fontSize:'0.72rem', color:C.muted }}>{m}</div>
              <div style={{ flex:1, height:14, background:'#f1efe8', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', background:C.gold, borderRadius:2,
                  width:`${(v/14460)*100}%`, opacity: i===a.length-1?1:0.55 }} />
              </div>
              <div style={{ fontSize:'0.78rem', fontWeight:600, color:C.ink, width:60, textAlign:'right' }}>
                ${v.toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div style={{ flex:1, background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.5rem' }}>
          <div style={{ fontSize:'0.78rem', fontWeight:500, textTransform:'uppercase',
            letterSpacing:'0.08em', color:C.muted, marginBottom:16 }}>Plan Breakdown</div>
          {[['Starter','642','50%'],['Pro','498','39%'],['Studio','144','11%']].map(([p,n,pct]) => (
            <div key={p} style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.82rem', marginBottom:4 }}>
                <span style={{ fontWeight:500 }}>{p}</span>
                <span style={{ color:C.muted }}>{n} creators</span>
              </div>
              <div style={{ height:6, background:'#f1efe8', borderRadius:3 }}>
                <div style={{ height:'100%', background:C.gold, borderRadius:3, width:pct, opacity:0.8 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = USERS.filter(u => !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700 }}>Users</h2>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search users…"
          style={{ padding:'0.5rem 0.85rem', border:`1px solid ${C.border}`, borderRadius:4,
            fontSize:'0.82rem', fontFamily:"'DM Sans',sans-serif", outline:'none', background:C.white }} />
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.7fr',
          padding:'0.75rem 1.25rem', background:'#faf7f0', borderBottom:`1px solid ${C.border}`,
          fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontWeight:500 }}>
          {['Name','Email','Role','Plan','Files','Earnings','Status'].map(h=><div key={h}>{h}</div>)}
        </div>
        {filtered.map((u,i) => (
          <div key={u.id} style={{ display:'grid', gridTemplateColumns:'2fr 2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.7fr',
            padding:'0.9rem 1.25rem', alignItems:'center', fontSize:'0.82rem',
            borderBottom: i<filtered.length-1?`1px solid ${C.border}`:'none' }}>
            <div style={{ fontWeight:500 }}>{u.name}</div>
            <div style={{ color:C.muted, fontSize:'0.78rem' }}>{u.email}</div>
            <div style={{ color:C.muted, textTransform:'capitalize' }}>{u.role}</div>
            <div><span style={{ background:'rgba(201,168,76,0.1)', color:C.gold,
              fontSize:'0.68rem', padding:'0.15rem 0.45rem', borderRadius:100,
              fontWeight:500, textTransform:'capitalize' }}>{u.plan}</span></div>
            <div style={{ color:C.muted }}>{u.files}</div>
            <div style={{ fontWeight:500, color:u.earnings>0?C.success:C.muted }}>
              {u.earnings>0?`$${u.earnings.toLocaleString()}`:'—'}</div>
            <div><span style={{ background:u.status==='active'?'#eaf3de':'#fce8e8',
              color:u.status==='active'?C.success:C.danger,
              fontSize:'0.68rem', padding:'0.15rem 0.45rem', borderRadius:100, fontWeight:500 }}>
              {u.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminContent() {
  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:'1.5rem' }}>Content</h2>
      <div style={{ display:'flex', gap:16, marginBottom:24 }}>
        <ACard label="Total Files"   value="12,840" sub="Across all creators" />
        <ACard label="Pending Review" value="23"    sub="Awaiting moderation" accent={C.gold} />
        <ACard label="Flagged"        value="4"     sub="Requires action"     accent={C.danger} />
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.5rem' }}>
        <div style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em',
          color:C.muted, fontWeight:500, marginBottom:16 }}>Top Event Hashtags</div>
        {[
          ['#AfricaFashionWeek',1204,'#1a1428'],
          ['#NairobiMarathon',482,'#1a2030'],
          ['#LagosFilmFest',891,'#1e1a14'],
          ['#MombasaBeachFest',673,'#0e1818'],
        ].map(([tag,count,color],i,a) => (
          <div key={tag} style={{ display:'flex', alignItems:'center', gap:12,
            padding:'0.65rem 0', borderBottom:i<a.length-1?`1px solid ${C.border}`:'none' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:C.gold, flexShrink:0 }} />
            <div style={{ flex:1, fontSize:'0.875rem', fontWeight:500 }}>{tag}</div>
            <div style={{ fontSize:'0.82rem', color:C.muted }}>{count.toLocaleString()} files</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminEarnings() {
  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:'1.5rem' }}>Platform Earnings</h2>
      <div style={{ display:'flex', gap:16, marginBottom:24 }}>
        <ACard label="Total Platform Revenue" value="$14,460" sub="All time"      accent={C.gold} />
        <ACard label="This Month"              value="$4,338"  sub="+17% vs last month" />
        <ACard label="Pending Payouts"         value="$2,140"  sub="To creators" />
        <ACard label="Avg. Transaction"        value="$8.20"   sub="Per sale" />
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',
          padding:'0.75rem 1.25rem', background:'#faf7f0', borderBottom:`1px solid ${C.border}`,
          fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontWeight:500 }}>
          {['Month','GMV','Platform Take','Creator Payouts','Transactions'].map(h=><div key={h}>{h}</div>)}
        </div>
        {[
          ['Jun 2025','$48,200','$14,460','$33,740','5,878'],
          ['May 2025','$28,000','$8,400', '$19,600','3,415'],
          ['Apr 2025','$20,300','$6,090', '$14,210','2,476'],
          ['Mar 2025','$13,100','$3,930', '$9,170', '1,598'],
        ].map((row,i,a) => (
          <div key={row[0]} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',
            padding:'0.9rem 1.25rem', fontSize:'0.85rem',
            borderBottom:i<a.length-1?`1px solid ${C.border}`:'none' }}>
            {row.map((v,j) => <div key={j} style={{ fontWeight:j===0?400:j===1?700:400,
              color:j===2?C.gold:j===3?C.success:C.ink }}>{v}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminRequests() {
  const [reqs, setReqs] = useState(REQUESTS);
  const approve = id => setReqs(r => r.map(x => x.id===id?{...x,status:'approved'}:x));
  const deny    = id => setReqs(r => r.map(x => x.id===id?{...x,status:'denied'}:x));
  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:8 }}>Access Requests</h2>
      <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:'1.5rem', lineHeight:1.6 }}>
        Admins cannot view full-resolution creator content without permission.
        Requests appear here and must be approved by the creator.
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {reqs.map(r => (
          <div key={r.id} style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:6, padding:'1.25rem 1.5rem', display:'flex',
            justifyContent:'space-between', alignItems:'center', gap:16, flexWrap:'wrap' }}>
            <div>
              <div style={{ fontWeight:500, marginBottom:4 }}>{r.file}</div>
              <div style={{ fontSize:'0.78rem', color:C.muted }}>
                Creator: <strong>{r.creator}</strong> · Reason: {r.reason} · {r.date}
              </div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              {r.status==='pending' ? (
                <>
                  <button onClick={() => approve(r.id)}
                    style={{ background:C.success, color:'#fff', border:'none', borderRadius:2,
                      padding:'0.45rem 1rem', fontSize:'0.8rem', cursor:'pointer',
                      fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>Approve</button>
                  <button onClick={() => deny(r.id)}
                    style={{ background:'transparent', color:C.danger, border:`1px solid ${C.danger}`,
                      borderRadius:2, padding:'0.45rem 1rem', fontSize:'0.8rem',
                      cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Deny</button>
                </>
              ) : (
                <span style={{ fontSize:'0.78rem', fontWeight:600, padding:'0.3rem 0.7rem',
                  borderRadius:100, textTransform:'capitalize',
                  background:r.status==='approved'?'#eaf3de':'#fce8e8',
                  color:r.status==='approved'?C.success:C.danger }}>
                  {r.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');

  if (!user) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:C.cream }}>
        <div style={{ textAlign:'center' }}>
          <p style={{ color:C.muted, marginBottom:16 }}>Please sign in to access the admin panel.</p>
          <button onClick={() => navigate('/login')}
            style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
              padding:'0.75rem 2rem', fontSize:'0.9rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            Sign In</button>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:C.cream }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'2rem', marginBottom:12 }}>⛔</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.5rem', fontWeight:700, marginBottom:8 }}>Access Denied</h2>
          <p style={{ color:C.muted, marginBottom:20 }}>You don't have admin privileges.</p>
          <button onClick={() => navigate('/dashboard')}
            style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
              padding:'0.75rem 2rem', fontSize:'0.9rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            Go to Dashboard</button>
        </div>
      </div>
    );
  }

  const panels = {
    overview: <AdminOverview />,
    users:    <AdminUsers />,
    content:  <AdminContent />,
    earnings: <AdminEarnings />,
    requests: <AdminRequests />,
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f2ec' }}>
      <AdminSidebar active={active} setActive={setActive} />
      <main style={{ flex:1, padding:'2.5rem 3rem', overflowY:'auto' }}>{panels[active]}</main>
    </div>
  );
}