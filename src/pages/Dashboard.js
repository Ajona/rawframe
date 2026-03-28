import PaymentModal from '../components/PaymentModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = {
  ink:'#0e0d0b', cream:'#f5f2ec', warm:'#e8e0d0',
  gold:'#c9a84c', muted:'#7a7468', white:'#ffffff',
  border:'rgba(14,13,11,0.12)', success:'#4a6741',
  danger:'#b84c2e', sidebar:'#16140f',
};

function Sidebar({ active, setActive }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const items = [
    { id:'overview',     icon:'◈', label:'Overview'     },
    { id:'uploads',      icon:'↑', label:'My Uploads'   },
    { id:'transactions', icon:'⇄', label:'Transactions' },
    { id:'collections',  icon:'▤', label:'Collections'  },
    { id:'profile',      icon:'◉', label:'Profile'      },
  ];
  return (
    <aside style={{ width:220, background:C.sidebar, minHeight:'100vh',
      display:'flex', flexDirection:'column', flexShrink:0 }}>
      <div style={{ padding:'1.75rem 1.5rem', borderBottom:'1px solid rgba(255,255,255,0.07)', cursor:'pointer' }}
        onClick={() => navigate('/')}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:700, color:'#f5f2ec' }}>
          Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
        </div>
        <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.35)',
          letterSpacing:'0.1em', textTransform:'uppercase', marginTop:4 }}>Creator Studio</div>
      </div>
      <nav style={{ padding:'1rem 0', flex:1 }}>
        {items.map(item => (
          <div key={item.id} onClick={() => setActive(item.id)}
            style={{ display:'flex', alignItems:'center', gap:12, padding:'0.75rem 1.5rem',
              cursor:'pointer', transition:'all 0.15s',
              background: active===item.id ? 'rgba(201,168,76,0.12)' : 'transparent',
              borderLeft: active===item.id ? `3px solid ${C.gold}` : '3px solid transparent' }}>
            <span style={{ fontSize:'0.95rem', color: active===item.id ? C.gold : 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
            <span style={{ fontSize:'0.875rem', fontWeight: active===item.id ? 500 : 400,
              color: active===item.id ? '#f5f2ec' : 'rgba(255,255,255,0.45)' }}>{item.label}</span>
          </div>
        ))}
        <div style={{ padding:'1rem 1.25rem', marginTop:8 }}>
          <button onClick={() => navigate('/upload')}
            style={{ width:'100%', background:C.gold, color:C.ink, border:'none',
              borderRadius:2, padding:'0.65rem', fontSize:'0.82rem',
              fontWeight:600, letterSpacing:'0.04em', cursor:'pointer',
              fontFamily:"'DM Sans',sans-serif" }}>
            + New Upload
          </button>
        </div>
      </nav>
      <div style={{ padding:'1.25rem 1.5rem', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'rgba(201,168,76,0.2)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'0.75rem', fontWeight:600, color:C.gold }}>
            {user?.initials || 'U'}
          </div>
          <div>
            <div style={{ fontSize:'0.8rem', color:'#f5f2ec', fontWeight:500 }}>{user?.name || 'Creator'}</div>
            <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.35)', textTransform:'capitalize' }}>{user?.plan || 'starter'} plan</div>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/'); }}
          style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.1)',
            color:'rgba(255,255,255,0.4)', borderRadius:2, padding:'0.4rem',
            fontSize:'0.75rem', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          Sign out
        </button>
      </div>
    </aside>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6,
      padding:'1.25rem 1.5rem', flex:1 }}>
      <div style={{ fontSize:'0.75rem', color:C.muted, letterSpacing:'0.08em',
        textTransform:'uppercase', marginBottom:8 }}>{label}</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem',
        fontWeight:700, color:accent||C.ink, lineHeight:1, marginBottom:4 }}>{value}</div>
      {sub && <div style={{ fontSize:'0.78rem', color:C.muted }}>{sub}</div>}
    </div>
  );
}

/* ── OVERVIEW ─────────────────────────── */
function Overview() {
  const bars = [120,240,180,390,310,520];
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const max = Math.max(...bars);
  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:'1.5rem' }}>Overview</h2>
      <div style={{ display:'flex', gap:16, marginBottom:32 }}>
        <StatCard label="Total Earnings" value="$1,760" sub="All time" accent={C.gold} />
        <StatCard label="This Month"     value="$520"   sub="+67% vs last month" />
        <StatCard label="Files Sold"     value="143"    sub="Across 28 buyers" />
        <StatCard label="Active Uploads" value="37"     sub="12 in collections" />
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.5rem', marginBottom:24 }}>
        <div style={{ fontSize:'0.78rem', fontWeight:500, marginBottom:16, textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted }}>Monthly Earnings (USD)</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:12, height:140 }}>
          {bars.map((v,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ fontSize:'0.7rem', color:C.muted }}>${v}</div>
              <div style={{ width:'100%', background:C.gold, borderRadius:'2px 2px 0 0',
                height:`${(v/max)*100}px`, opacity: i===bars.length-1 ? 1 : 0.5 }} />
              <div style={{ fontSize:'0.7rem', color:C.muted }}>{months[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.5rem' }}>
        <div style={{ fontSize:'0.78rem', fontWeight:500, marginBottom:16, textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted }}>Recent Sales</div>
        {[
          { file:'NairobiMarathon_raw_047.jpg', buyer:'buyer_***293', amount:'$4.99', time:'2 hours ago' },
          { file:'FashionWeek_collection_12.zip', buyer:'studio_***841', amount:'$18.00', time:'5 hours ago' },
          { file:'Landscape_4K_001.mp4', buyer:'buyer_***107', amount:'$12.00', time:'Yesterday' },
        ].map((r,i,a) => (
          <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'0.75rem 0', borderBottom: i<a.length-1 ? `1px solid ${C.border}` : 'none' }}>
            <div>
              <div style={{ fontSize:'0.875rem', fontWeight:500 }}>{r.file}</div>
              <div style={{ fontSize:'0.75rem', color:C.muted }}>Purchased by {r.buyer} · {r.time}</div>
            </div>
            <div style={{ fontSize:'0.95rem', fontWeight:700, color:C.success }}>+{r.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── UPLOADS ──────────────────────────── */
function Uploads() {
  const navigate = useNavigate();
  const uploads = [
    { name:'NairobiMarathon_raw_047.jpg', type:'Photo', tag:'#NairobiMarathon', price:'$4.99', sales:14, status:'active' },
    { name:'FashionWeek_collection_12.zip', type:'Collection', tag:'#AfricaFashionWeek', price:'$18.00', sales:6, status:'active' },
    { name:'Landscape_4K_001.mp4', type:'Video', tag:'Nature', price:'$12.00', sales:9, status:'active' },
    { name:'FoodShoot_editorial_03.jpg', type:'Photo', tag:'Food', price:'$3.50', sales:21, status:'active' },
    { name:'RealEstate_interior_07.jpg', type:'Photo', tag:'Real Estate', price:'$9.00', sales:3, status:'active' },
    { name:'Concert_raw_backstage.jpg', type:'Photo', tag:'#LagosFilmFest', price:'$6.00', sales:0, status:'pending' },
  ];
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700 }}>My Uploads</h2>
        <button onClick={() => navigate('/upload')}
          style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
            padding:'0.6rem 1.25rem', fontSize:'0.85rem', fontWeight:500,
            cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          + New Upload
        </button>
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:6, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.2fr 0.8fr 0.8fr 0.8fr',
          padding:'0.75rem 1.25rem', background:'#faf7f0', borderBottom:`1px solid ${C.border}`,
          fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontWeight:500 }}>
          {['File','Type','Event Tag','Price','Sales','Status'].map(h => <div key={h}>{h}</div>)}
        </div>
        {uploads.map((u,i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.2fr 0.8fr 0.8fr 0.8fr',
            padding:'1rem 1.25rem', alignItems:'center', fontSize:'0.875rem',
            borderBottom: i<uploads.length-1 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:8 }}>{u.name}</div>
            <div style={{ color:C.muted }}>{u.type}</div>
            <div style={{ color:C.gold, fontSize:'0.8rem' }}>{u.tag}</div>
            <div style={{ fontWeight:500 }}>{u.price}</div>
            <div style={{ color:C.muted }}>{u.sales}</div>
            <div><span style={{ background: u.status==='active'?'#eaf3de':'#faeeda',
              color: u.status==='active'?C.success:'#854F0B',
              fontSize:'0.7rem', padding:'0.2rem 0.5rem', borderRadius:100,
              textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:500 }}>{u.status}</span></div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:20, background:C.white, border:`1px solid ${C.border}`, borderRadius:6, padding:'1.25rem 1.5rem' }}>
        <div style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontWeight:500, marginBottom:12 }}>Shareable Links</div>
        {[{ label:'Profile link', url:'rawframe.io/creator/janedoe' },{ label:'Featured collection', url:'rawframe.io/c/fashionweek-bundle-12' }].map((l,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, marginBottom: i===0?10:0 }}>
            <div style={{ fontSize:'0.78rem', color:C.muted, width:130 }}>{l.label}</div>
            <div style={{ flex:1, background:'#faf7f0', border:`1px solid ${C.border}`, borderRadius:2,
              padding:'0.4rem 0.75rem', fontSize:'0.82rem', color:C.gold, fontFamily:'monospace' }}>{l.url}</div>
            <button style={{ background:'transparent', border:`1px solid ${C.border}`,
              borderRadius:2, padding:'0.4rem 0.75rem', fontSize:'0.78rem', color:C.muted, cursor:'pointer' }}>Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── TRANSACTIONS ─────────────────────── */
function Transactions() {
  const [tab, setTab] = useState('all');
  const [showWithdraw, setShowWithdraw] = useState(false);
  const txns = [
    { id:'TXN-0091', file:'NairobiMarathon_raw_047.jpg', buyer:'buyer_***293', amount:4.99, platform:1.75, creator:3.24, date:'Mar 22, 2025', status:'paid' },
    { id:'TXN-0090', file:'FashionWeek_collection_12.zip', buyer:'studio_***841', amount:18.00, platform:6.30, creator:11.70, date:'Mar 22, 2025', status:'paid' },
    { id:'TXN-0089', file:'Landscape_4K_001.mp4', buyer:'buyer_***107', amount:12.00, platform:4.20, creator:7.80, date:'Mar 21, 2025', status:'paid' },
    { id:'TXN-0088', file:'FoodShoot_editorial_03.jpg', buyer:'buyer_***554', amount:3.50, platform:1.23, creator:2.28, date:'Mar 20, 2025', status:'withdrawn' },
    { id:'TXN-0087', file:'NairobiMarathon_raw_031.jpg', buyer:'buyer_***293', amount:4.99, platform:1.75, creator:3.24, date:'Mar 19, 2025', status:'pending' },
  ];
  const filtered = tab==='all' ? txns : txns.filter(t => t.status===tab);
  const sColor = { paid:C.success, pending:'#854F0B', withdrawn:C.muted };
  const sBg    = { paid:'#eaf3de', pending:'#faeeda', withdrawn:'#f1efe8' };
  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:'1.5rem' }}>Transactions</h2>
      <div style={{ display:'flex', gap:16, marginBottom:24 }}>
        <StatCard label="Available" value="$26.83" sub="Cleared balance" accent={C.gold} />
        <StatCard label="Pending"   value="$3.24"  sub="Processing" />
        <StatCard label="Withdrawn" value="$2.28"  sub="All time" />
      </div>
      <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${C.border}` }}>
        {['all','paid','pending','withdrawn'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding:'0.6rem 1.25rem', border:'none', background:'transparent',
              fontSize:'0.8rem', fontWeight:tab===t?500:400, cursor:'pointer',
              color:tab===t?C.ink:C.muted, textTransform:'capitalize',
              borderBottom:tab===t?`2px solid ${C.gold}`:'2px solid transparent',
              marginBottom:-1, fontFamily:"'DM Sans',sans-serif" }}>{t}</button>
        ))}
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderTop:'none', borderRadius:'0 0 6px 6px', overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr 1.2fr 0.8fr 0.8fr 0.8fr 0.8fr',
          padding:'0.75rem 1.25rem', background:'#faf7f0', borderBottom:`1px solid ${C.border}`,
          fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontWeight:500 }}>
          {['ID','File','Date','Total','Platform','Creator','Status'].map(h=><div key={h}>{h}</div>)}
        </div>
        {filtered.map((t,i) => (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 2fr 1.2fr 0.8fr 0.8fr 0.8fr 0.8fr',
            padding:'0.9rem 1.25rem', alignItems:'center', fontSize:'0.82rem',
            borderBottom: i<filtered.length-1 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ fontFamily:'monospace', fontSize:'0.75rem', color:C.muted }}>{t.id}</div>
            <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', paddingRight:8, fontWeight:500 }}>{t.file}</div>
            <div style={{ color:C.muted }}>{t.date}</div>
            <div style={{ fontWeight:500 }}>${t.amount.toFixed(2)}</div>
            <div style={{ color:C.danger }}>-${t.platform.toFixed(2)}</div>
            <div style={{ color:C.success, fontWeight:500 }}>+${t.creator.toFixed(2)}</div>
            <div><span style={{ background:sBg[t.status], color:sColor[t.status],
              fontSize:'0.68rem', padding:'0.2rem 0.5rem', borderRadius:100,
              textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:500 }}>{t.status}</span></div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:20, display:'flex', justifyContent:'flex-end' }}>
        <button onClick={() => setShowWithdraw(true)}
          style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
            padding:'0.75rem 2rem', fontSize:'0.875rem', fontWeight:500,
            cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          Withdraw $26.83
        </button>
        <PaymentModal
          isOpen={showWithdraw}
          onClose={() => setShowWithdraw(false)}
          onSuccess={() => { setShowWithdraw(false); }}
          amount="26.83"
          currency="USD"
          title="Withdraw Earnings"
          subtitle="Choose where to send your funds"
          mode="withdraw"
        />
      </div>
    </div>
  );
}

/* ── COLLECTIONS ──────────────────────── */
function Collections() {
  const navigate = useNavigate();
  const cols = [
    { name:'Nairobi Marathon Pack', files:12, price:'$18.00', sales:6,  cover:'🏃', bg:'#1a2030' },
    { name:'Fashion Week Backstage', files:8,  price:'$22.00', sales:3,  cover:'🎭', bg:'#1a1428' },
    { name:'Food Editorial Series',  files:6,  price:'$14.00', sales:11, cover:'🍽️', bg:'#1e1510' },
  ];
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700 }}>Collections</h2>
        <button onClick={() => navigate('/upload')}
          style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
            padding:'0.6rem 1.25rem', fontSize:'0.85rem', fontWeight:500,
            cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>+ New Collection</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1rem', marginBottom:24 }}>
        {cols.map((c,i) => (
          <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, overflow:'hidden' }}>
            <div style={{ height:120, background:c.bg, display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:'2.5rem', opacity:0.4 }}>{c.cover}</div>
            <div style={{ padding:'1rem' }}>
              <div style={{ fontWeight:600, marginBottom:4, fontSize:'0.95rem' }}>{c.name}</div>
              <div style={{ fontSize:'0.78rem', color:C.muted, marginBottom:'0.75rem' }}>
                {c.files} files · {c.sales} sales
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontWeight:700, color:C.gold, fontSize:'1rem' }}>{c.price}</span>
                <div style={{ display:'flex', gap:6 }}>
                  <button style={{ background:'transparent', border:`1px solid ${C.border}`,
                    borderRadius:2, padding:'0.3rem 0.65rem', fontSize:'0.75rem',
                    color:C.muted, cursor:'pointer' }}>Edit</button>
                  <button style={{ background:C.ink, color:C.cream, border:'none',
                    borderRadius:2, padding:'0.3rem 0.65rem', fontSize:'0.75rem', cursor:'pointer' }}>Share</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:'#faf7f0', border:`1px solid rgba(201,168,76,0.2)`, borderRadius:6,
        padding:'1.5rem', textAlign:'center' }}>
        <div style={{ fontSize:'0.9rem', fontWeight:500, marginBottom:6 }}>Create a new collection</div>
        <div style={{ fontSize:'0.82rem', color:C.muted, marginBottom:'1rem' }}>
          Bundle multiple files and set a single price or per-file pricing.
        </div>
        <button onClick={() => navigate('/upload')}
          style={{ background:C.gold, color:C.ink, border:'none', borderRadius:2,
            padding:'0.65rem 1.5rem', fontSize:'0.85rem', fontWeight:600,
            cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
          Start a Collection →
        </button>
      </div>
    </div>
  );
}

/* ── PROFILE ──────────────────────────── */
function Profile() {
  const { user, addPaymentMethod, removePaymentMethod, setPrimaryMethod } = useAuth();
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '', bio:'Documentary and street photographer based in Nairobi.',
    website:'https://janedoe.photo', instagram:'@janedoe_photo',
    fields:['Sports & Events','Travel','Street Photography'],
  });
  const [saved, setSaved] = useState(false);
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));
  const FIELDS = ['Nature & Wildlife','Travel','Food & Drink','Fashion','Real Estate','Sports & Events','Architecture','Street Photography','General'];

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const inputStyle = {
    width:'100%', padding:'0.65rem 0.85rem', border:`1px solid ${C.border}`,
    borderRadius:4, fontSize:'0.875rem', fontFamily:"'DM Sans',sans-serif",
    outline:'none', background:C.white, boxSizing:'border-box',
  };

  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.6rem', fontWeight:700, marginBottom:'1.5rem' }}>Profile Settings</h2>

      {/* Avatar */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8,
        padding:'1.5rem', marginBottom:16, display:'flex', alignItems:'center', gap:20 }}>
        <div style={{ width:72, height:72, borderRadius:'50%', background:'rgba(201,168,76,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.5rem', fontWeight:700, color:C.gold, border:`2px solid rgba(201,168,76,0.3)` }}>
          {user?.initials || 'JD'}
        </div>
        <div>
          <div style={{ fontWeight:600, fontSize:'1rem', marginBottom:4 }}>{user?.name}</div>
          <div style={{ fontSize:'0.8rem', color:C.muted, marginBottom:8 }}>{user?.email}</div>
          <span style={{ fontSize:'0.72rem', background:'rgba(201,168,76,0.12)', color:C.gold,
            padding:'0.2rem 0.6rem', borderRadius:100, fontWeight:500,
            textTransform:'uppercase', letterSpacing:'0.06em' }}>
            {user?.plan || 'starter'} plan
          </span>
        </div>
      </div>

      {/* Form fields */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:'1.5rem', marginBottom:16 }}>
        <div style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em',
          color:C.muted, fontWeight:500, marginBottom:'1.25rem' }}>Public Profile</div>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {[
            { key:'name',      label:'Display Name', type:'text' },
            { key:'bio',       label:'Bio',          type:'textarea' },
            { key:'website',   label:'Website',      type:'text' },
            { key:'instagram', label:'Instagram',    type:'text' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize:'0.78rem', fontWeight:500, display:'block',
                marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>{f.label}</label>
              {f.type==='textarea'
                ? <textarea style={{ ...inputStyle, height:80, resize:'vertical', lineHeight:1.6 }}
                    value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
                : <input style={inputStyle} type="text"
                    value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
              }
            </div>
          ))}
        </div>
      </div>

      {/* Content fields */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:'1.5rem', marginBottom:16 }}>
        <div style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em',
          color:C.muted, fontWeight:500, marginBottom:'1rem' }}>Content Fields</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {FIELDS.map(f => {
            const active = form.fields.includes(f);
            return <button key={f} onClick={() => set('fields', active ? form.fields.filter(x=>x!==f) : [...form.fields,f])}
              style={{ padding:'0.35rem 0.85rem', borderRadius:100, fontSize:'0.78rem',
                cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                background:active?C.ink:'#fff', color:active?C.cream:C.muted,
                border:`1px solid ${active?C.ink:C.border}` }}>{f}</button>;
          })}
        </div>
      </div>
      {/* Payment Methods */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:'1.5rem', marginBottom:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
          <div style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontWeight:500 }}>
            Payment & Withdrawal Methods
          </div>
          <button onClick={() => setShowAddPayment(true)}
            style={{ background:'transparent', border:`1px solid ${C.border}`, borderRadius:2,
              padding:'0.35rem 0.85rem', fontSize:'0.78rem', color:C.ink,
              cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            + Add Method
          </button>
        </div>

        {(user?.paymentMethods||[]).length === 0 ? (
          <div style={{ textAlign:'center', padding:'1.5rem 0', color:C.muted, fontSize:'0.875rem' }}>
            No payment methods saved. Add one to enable withdrawals.
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {(user?.paymentMethods||[]).map(pm => (
              <div key={pm.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'0.75rem 1rem',
                border:`1px solid ${pm.primary?C.gold:C.border}`, borderRadius:6,
                background:pm.primary?'#faf7f0':'#fff' }}>
                <span style={{ fontSize:'1.2rem' }}>{pm.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:500, fontSize:'0.875rem' }}>{pm.label}</div>
                  <div style={{ fontSize:'0.75rem', color:C.muted }}>{pm.detail}</div>
                </div>
                {pm.primary && (
                  <span style={{ fontSize:'0.68rem', background:'rgba(201,168,76,0.15)', color:C.gold,
                    padding:'0.15rem 0.5rem', borderRadius:100, fontWeight:500 }}>Primary</span>
                )}
                <button onClick={() => setPrimaryMethod(pm.id)}
                  style={{ background:'transparent', border:`1px solid ${C.border}`, borderRadius:2,
                    padding:'0.25rem 0.5rem', fontSize:'0.72rem', color:C.muted,
                    cursor:'pointer', display:pm.primary?'none':'block' }}>Set Primary</button>
                <button onClick={() => removePaymentMethod(pm.id)}
                  style={{ background:'transparent', border:'none', color:C.danger,
                    fontSize:'0.78rem', cursor:'pointer' }}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={handleSave}
        style={{ background: saved ? C.success : C.ink, color:C.cream, border:'none',
          borderRadius:2, padding:'0.75rem 2rem', fontSize:'0.9rem', fontWeight:500,
          cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'background 0.3s' }}>
        {saved ? '✓ Saved' : 'Save Changes'}
      </button>
      <PaymentModal
        isOpen={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        onSuccess={({ method, fields }) => {
          const icons = { mpesa:'🟢', airtel:'🔴', mtn:'🟡', card:'💳', googlepay:'🔵', applepay:'⚫', paypal:'🔷' };
          const labels = { mpesa:'M-Pesa', airtel:'Airtel Money', mtn:'MTN Mobile Money', card:'Visa/Mastercard', googlepay:'Google Pay', applepay:'Apple Pay', paypal:'PayPal' };
          addPaymentMethod({
            id: 'pm_' + Date.now(),
            type: method,
            label: labels[method],
            detail: fields.phone || fields.email || fields.number?.slice(-4).padStart(fields.number?.length,'*') || method,
            icon: icons[method],
            primary: (user?.paymentMethods||[]).length === 0,
          });
          setShowAddPayment(false);
        }}
        amount={null}
        title="Add Payment Method"
        subtitle="Used for receiving withdrawals from RawFrame"
        mode="save"
      />
    </div>
  );
}

/* ── SHELL ────────────────────────────── */
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');

  if (!user) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:C.cream }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.5rem', fontWeight:700, marginBottom:12 }}>
            Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
          </div>
          <p style={{ color:C.muted, marginBottom:20 }}>Please sign in to access your dashboard.</p>
          <button onClick={() => navigate('/login')}
            style={{ background:C.ink, color:C.cream, border:'none', borderRadius:2,
              padding:'0.75rem 2rem', fontSize:'0.9rem', fontWeight:500,
              cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>Sign In</button>
        </div>
      </div>
    );
  }

  const panels = { overview:<Overview />, uploads:<Uploads />, transactions:<Transactions />, collections:<Collections />, profile:<Profile /> };
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#f5f2ec' }}>
      <Sidebar active={active} setActive={setActive} />
      <main style={{ flex:1, padding:'2.5rem 3rem', overflowY:'auto' }}>{panels[active]}</main>
    </div>
  );
}