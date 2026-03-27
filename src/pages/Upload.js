import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const C = {
  ink: '#0e0d0b', cream: '#f5f2ec', warm: '#e8e0d0',
  gold: '#c9a84c', muted: '#7a7468', white: '#ffffff',
  border: 'rgba(14,13,11,0.12)', success: '#4a6741',
  danger: '#b84c2e', sidebar: '#16140f',
};

const FIELDS = [
  'Nature & Wildlife', 'Travel', 'Food & Drink', 'Fashion',
  'Real Estate', 'Interior Design', 'Sports & Events',
  'Architecture', 'Portrait', 'Street Photography', 'General',
];

const STEPS = ['Files', 'Details', 'Pricing', 'Preview'];

/* ── Step indicator ──────────────────────────────── */
function StepBar({ current }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:'2.5rem' }}>
      {STEPS.map((s, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <React.Fragment key={s}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', display:'flex',
                alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:500,
                background: done ? C.gold : active ? C.ink : 'transparent',
                border: done ? 'none' : active ? 'none' : `1px solid ${C.border}`,
                color: done ? C.ink : active ? C.cream : C.muted }}>
                {done ? '✓' : i + 1}
              </div>
              <span style={{ fontSize:'0.72rem', fontWeight: active ? 500 : 400,
                color: active ? C.ink : C.muted, whiteSpace:'nowrap' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex:1, height:1, background: done ? C.gold : C.border,
                margin:'0 8px', marginBottom:18 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── File type icon ──────────────────────────────── */
function FileIcon({ type }) {
  const isVideo = type && type.startsWith('video');
  return (
    <div style={{ width:40, height:40, borderRadius:4, background: isVideo ? '#1a2030' : '#f0e8d0',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:'1.1rem', flexShrink:0 }}>
      {isVideo ? '▶' : '◼'}
    </div>
  );
}

/* ── STEP 1: File Drop ───────────────────────────── */
function StepFiles({ files, setFiles }) {
  const onDrop = useCallback(accepted => {
    const mapped = accepted.map(f => ({
      file: f,
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2),
      type: f.type,
      preview: f.type.startsWith('image') ? URL.createObjectURL(f) : null,
    }));
    setFiles(prev => [...prev, ...mapped]);
  }, [setFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [], 'video/*': [] }, multiple: true,
  });

  const remove = id => setFiles(prev => prev.filter(f => f.id !== id));

  return (
    <div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem',
        fontWeight:700, marginBottom:8 }}>Upload your files</h3>
      <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:24, lineHeight:1.6 }}>
        Drag and drop photos or videos. Raw files, edited shots, and collections are all welcome.
        Supported: JPG, PNG, WEBP, MP4, MOV.
      </p>

      {/* Drop zone */}
      <div {...getRootProps()} style={{ border:`2px dashed ${isDragActive ? C.gold : C.border}`,
        borderRadius:6, padding:'3rem 2rem', textAlign:'center', cursor:'pointer',
        background: isDragActive ? '#faf7f0' : C.white, transition:'all 0.2s',
        marginBottom:24 }}>
        <input {...getInputProps()} />
        <div style={{ fontSize:'2.5rem', marginBottom:12, opacity:0.4 }}>↑</div>
        <div style={{ fontWeight:500, marginBottom:6 }}>
          {isDragActive ? 'Drop files here' : 'Drag files here, or click to browse'}
        </div>
        <div style={{ fontSize:'0.8rem', color:C.muted }}>
          Photos and videos up to 2GB each
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ fontSize:'0.78rem', textTransform:'uppercase',
            letterSpacing:'0.08em', color:C.muted, fontWeight:500, marginBottom:4 }}>
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </div>
          {files.map(f => (
            <div key={f.id} style={{ display:'flex', alignItems:'center', gap:12,
              background:C.white, border:`1px solid ${C.border}`,
              borderRadius:6, padding:'0.75rem 1rem' }}>
              {f.preview
                ? <img src={f.preview} alt={f.name}
                    style={{ width:40, height:40, objectFit:'cover', borderRadius:4 }} />
                : <FileIcon type={f.type} />}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:500, fontSize:'0.875rem',
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.name}</div>
                <div style={{ fontSize:'0.75rem', color:C.muted, marginTop:2 }}>
                  {f.size} MB · {f.type || 'unknown'}
                </div>
              </div>
              <button onClick={() => remove(f.id)}
                style={{ background:'transparent', border:`1px solid ${C.border}`,
                  borderRadius:2, padding:'0.25rem 0.6rem',
                  fontSize:'0.75rem', color:C.muted, cursor:'pointer' }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── STEP 2: Details ─────────────────────────────── */
function StepDetails({ details, setDetails }) {
  const set = (key, val) => setDetails(prev => ({ ...prev, [key]: val }));
  const toggleField = f => {
    const arr = details.fields || [];
    set('fields', arr.includes(f) ? arr.filter(x => x !== f) : [...arr, f]);
  };

  const inputStyle = {
    width:'100%', padding:'0.65rem 0.85rem', border:`1px solid ${C.border}`,
    borderRadius:4, fontSize:'0.875rem', background:C.white,
    fontFamily:"'DM Sans', sans-serif", outline:'none',
    boxSizing:'border-box',
  };

  return (
    <div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem',
        fontWeight:700, marginBottom:8 }}>Content details</h3>
      <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:24, lineHeight:1.6 }}>
        Help buyers discover your content. The more specific you are, the better.
      </p>

      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

        {/* Title */}
        <div>
          <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
            marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
            Title *
          </label>
          <input style={inputStyle} placeholder="e.g. Nairobi Marathon 2025 — Raw Pack"
            value={details.title || ''} onChange={e => set('title', e.target.value)} />
        </div>

        {/* Description */}
        <div>
          <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
            marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
            Description
          </label>
          <textarea style={{ ...inputStyle, height:90, resize:'vertical', lineHeight:1.6 }}
            placeholder="What's in this upload? Lighting, angles, occasion, camera gear..."
            value={details.description || ''}
            onChange={e => set('description', e.target.value)} />
        </div>

        {/* Event hashtag */}
        <div>
          <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
            marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
            Event Hashtag
          </label>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)',
              color:C.gold, fontWeight:600, fontSize:'1rem' }}>#</span>
            <input style={{ ...inputStyle, paddingLeft:24 }}
              placeholder="NairobiMarathon2025"
              value={details.hashtag || ''}
              onChange={e => set('hashtag', e.target.value.replace(/\s/g,'').replace('#',''))} />
          </div>
          <div style={{ fontSize:'0.72rem', color:C.muted, marginTop:4 }}>
            Buyers search by event hashtag to find all shots from an occasion
          </div>
        </div>

        {/* Upload type */}
        <div>
          <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
            marginBottom:10, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
            Upload Type *
          </label>
          <div style={{ display:'flex', gap:10 }}>
            {['Single file', 'Collection'].map(t => (
              <button key={t} onClick={() => set('uploadType', t)}
                style={{ padding:'0.6rem 1.25rem', borderRadius:2, fontSize:'0.875rem',
                  cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                  background: details.uploadType === t ? C.ink : C.white,
                  color: details.uploadType === t ? C.cream : C.muted,
                  border:`1px solid ${details.uploadType === t ? C.ink : C.border}` }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content fields */}
        <div>
          <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
            marginBottom:10, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
            Content Fields (select all that apply)
          </label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {FIELDS.map(f => {
              const active = (details.fields || []).includes(f);
              return (
                <button key={f} onClick={() => toggleField(f)}
                  style={{ padding:'0.4rem 0.9rem', borderRadius:100, fontSize:'0.8rem',
                    cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all 0.15s',
                    background: active ? C.ink : C.white,
                    color: active ? C.cream : C.muted,
                    border:`1px solid ${active ? C.ink : C.border}` }}>
                  {f}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── STEP 3: Pricing ─────────────────────────────── */
function StepPricing({ pricing, setPricing, uploadType }) {
  const set = (key, val) => setPricing(prev => ({ ...prev, [key]: val }));

  const inputStyle = {
    padding:'0.65rem 0.85rem', border:`1px solid ${C.border}`, borderRadius:4,
    fontSize:'0.875rem', background:C.white, fontFamily:"'DM Sans',sans-serif",
    outline:'none', width:'100%', boxSizing:'border-box',
  };

  const isCollection = uploadType === 'Collection';

  return (
    <div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem',
        fontWeight:700, marginBottom:8 }}>Set your price</h3>
      <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:24, lineHeight:1.6 }}>
        You're in full control. Set a base price and optionally add a promotional discount
        between 10–20%.
      </p>

      <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

        {/* Pricing mode for collections */}
        {isCollection && (
          <div>
            <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
              marginBottom:10, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
              Pricing Mode
            </label>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {['Per file', 'Whole collection', 'Both'].map(m => (
                <button key={m} onClick={() => set('mode', m)}
                  style={{ padding:'0.6rem 1.25rem', borderRadius:2, fontSize:'0.875rem',
                    cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                    background: pricing.mode === m ? C.ink : C.white,
                    color: pricing.mode === m ? C.cream : C.muted,
                    border:`1px solid ${pricing.mode === m ? C.ink : C.border}` }}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Per file price */}
        {(!isCollection || ['Per file','Both'].includes(pricing.mode)) && (
          <div>
            <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
              marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
              {isCollection ? 'Price Per File (USD)' : 'Price (USD)'}
            </label>
            <div style={{ position:'relative', maxWidth:200 }}>
              <span style={{ position:'absolute', left:10, top:'50%',
                transform:'translateY(-50%)', color:C.muted }}>$</span>
              <input type="number" min="0.99" step="0.01" style={{ ...inputStyle, paddingLeft:24 }}
                placeholder="4.99"
                value={pricing.perFile || ''}
                onChange={e => set('perFile', e.target.value)} />
            </div>
          </div>
        )}

        {/* Collection price */}
        {isCollection && ['Whole collection','Both'].includes(pricing.mode) && (
          <div>
            <label style={{ fontSize:'0.8rem', fontWeight:500, display:'block',
              marginBottom:6, textTransform:'uppercase', letterSpacing:'0.07em', color:C.muted }}>
              Collection Bundle Price (USD)
            </label>
            <div style={{ position:'relative', maxWidth:200 }}>
              <span style={{ position:'absolute', left:10, top:'50%',
                transform:'translateY(-50%)', color:C.muted }}>$</span>
              <input type="number" min="0.99" step="0.01" style={{ ...inputStyle, paddingLeft:24 }}
                placeholder="18.00"
                value={pricing.collection || ''}
                onChange={e => set('collection', e.target.value)} />
            </div>
          </div>
        )}

        {/* Discount */}
        <div style={{ background:'#faf7f0', border:`1px solid rgba(201,168,76,0.25)`,
          borderRadius:6, padding:'1.25rem 1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between',
            alignItems:'center', marginBottom:12 }}>
            <div>
              <div style={{ fontWeight:500, fontSize:'0.9rem' }}>Promotional discount</div>
              <div style={{ fontSize:'0.78rem', color:C.muted, marginTop:2 }}>
                Optional. Between 10% and 20% only — platform policy.
              </div>
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
              <div onClick={() => set('discountEnabled', !pricing.discountEnabled)}
                style={{ width:36, height:20, borderRadius:100, background: pricing.discountEnabled ? C.gold : C.border,
                  position:'relative', transition:'background 0.2s', cursor:'pointer' }}>
                <div style={{ position:'absolute', top:2, left: pricing.discountEnabled ? 18 : 2,
                  width:16, height:16, borderRadius:'50%', background:C.white,
                  transition:'left 0.2s' }} />
              </div>
            </label>
          </div>
          {pricing.discountEnabled && (
            <div>
              <input type="range" min={10} max={20} step={1}
                value={pricing.discountPct || 10}
                onChange={e => set('discountPct', Number(e.target.value))}
                style={{ width:'100%', accentColor:C.gold }} />
              <div style={{ display:'flex', justifyContent:'space-between',
                fontSize:'0.78rem', color:C.muted, marginTop:4 }}>
                <span>10%</span>
                <span style={{ fontWeight:500, color:C.gold, fontSize:'0.95rem' }}>
                  {pricing.discountPct || 10}% off
                </span>
                <span>20%</span>
              </div>
            </div>
          )}
        </div>

        {/* Revenue split preview */}
        {pricing.perFile && (
          <div style={{ background:C.white, border:`1px solid ${C.border}`,
            borderRadius:6, padding:'1.25rem 1.5rem' }}>
            <div style={{ fontSize:'0.78rem', textTransform:'uppercase',
              letterSpacing:'0.08em', color:C.muted, fontWeight:500, marginBottom:14 }}>
              Revenue Preview (per file)
            </div>
            {(() => {
              const base     = parseFloat(pricing.perFile) || 0;
              const disc     = pricing.discountEnabled ? (pricing.discountPct || 10) / 100 : 0;
              const final    = base * (1 - disc);
              const platform = final * 0.30;
              const creator  = final * 0.70;
              return (
                <div style={{ display:'flex', gap:16 }}>
                  {[
                    { label:'List price', val:`$${base.toFixed(2)}`, color:C.muted },
                    { label:'After discount', val:`$${final.toFixed(2)}`, color:C.ink },
                    { label:'Platform (30%)', val:`-$${platform.toFixed(2)}`, color:C.danger },
                    { label:'Your earnings', val:`+$${creator.toFixed(2)}`, color:C.success },
                  ].map(row => (
                    <div key={row.label} style={{ flex:1, textAlign:'center',
                      padding:'0.75rem', background:'#faf7f0', borderRadius:4 }}>
                      <div style={{ fontSize:'0.7rem', color:C.muted,
                        marginBottom:4, textTransform:'uppercase', letterSpacing:'0.06em' }}>
                        {row.label}</div>
                      <div style={{ fontSize:'1.1rem', fontWeight:700, color:row.color }}>
                        {row.val}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
}

/* ── STEP 4: Preview ─────────────────────────────── */
function StepPreview({ files, details, pricing }) {
  const base     = parseFloat(pricing.perFile) || 0;
  const disc     = pricing.discountEnabled ? (pricing.discountPct || 10) / 100 : 0;
  const final    = base * (1 - disc);
  const creator  = final * 0.70;

  const firstImage = files.find(f => f.preview);

  return (
    <div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem',
        fontWeight:700, marginBottom:8 }}>Review before publishing</h3>
      <p style={{ color:C.muted, fontSize:'0.875rem', marginBottom:24, lineHeight:1.6 }}>
        This is how your upload will appear to buyers on RawFrame.
      </p>

      {/* Listing card preview */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`,
        borderRadius:6, overflow:'hidden', marginBottom:24 }}>

        {/* Thumbnail area */}
        <div style={{ height:200, background:firstImage ? 'transparent' : '#1a1a14',
          position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
          overflow:'hidden' }}>
          {firstImage
            ? <img src={firstImage.preview} alt="preview"
                style={{ width:'100%', height:'100%', objectFit:'cover', filter:'blur(0px)' }} />
            : <div style={{ fontSize:'3rem', opacity:0.3 }}>◼</div>}

          {/* Watermark overlay simulation */}
          <div style={{ position:'absolute', inset:0,
            background:'rgba(14,13,11,0.35)', display:'flex',
            alignItems:'center', justifyContent:'center' }}>
            <div style={{ color:'rgba(245,242,236,0.25)', fontSize:'1.4rem',
              fontWeight:700, letterSpacing:'0.3em', transform:'rotate(-20deg)',
              userSelect:'none', fontFamily:"'Playfair Display',serif" }}>
              RAWFRAME PREVIEW
            </div>
          </div>

          {/* Quality window badge */}
          <div style={{ position:'absolute', bottom:10, right:10,
            background:'rgba(201,168,76,0.9)', color:C.ink,
            fontSize:'0.65rem', fontWeight:600, padding:'0.3rem 0.6rem',
            borderRadius:2, letterSpacing:'0.08em' }}>
            QUALITY WINDOW ACTIVE
          </div>

          {/* File count badge */}
          {files.length > 1 && (
            <div style={{ position:'absolute', top:10, left:10,
              background:'rgba(14,13,11,0.75)', color:'#f5f2ec',
              fontSize:'0.72rem', padding:'0.25rem 0.6rem', borderRadius:2 }}>
              {files.length} files
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding:'1.25rem 1.5rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between',
            alignItems:'flex-start', gap:16, marginBottom:10 }}>
            <div>
              <div style={{ fontWeight:600, fontSize:'1rem', marginBottom:4 }}>
                {details.title || 'Untitled upload'}
              </div>
              {details.hashtag && (
                <span style={{ fontSize:'0.75rem', color:C.gold,
                  background:'rgba(201,168,76,0.1)', padding:'0.2rem 0.5rem',
                  borderRadius:100, fontWeight:500 }}>#{details.hashtag}</span>
              )}
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              {pricing.discountEnabled && base > 0 && (
                <div style={{ fontSize:'0.78rem', color:C.muted,
                  textDecoration:'line-through' }}>${base.toFixed(2)}</div>
              )}
              <div style={{ fontSize:'1.3rem', fontWeight:700, color:C.ink }}>
                ${final > 0 ? final.toFixed(2) : '—'}
              </div>
              {pricing.discountEnabled && (
                <div style={{ fontSize:'0.7rem', color:C.success, fontWeight:500 }}>
                  {pricing.discountPct || 10}% off
                </div>
              )}
            </div>
          </div>

          {details.description && (
            <p style={{ fontSize:'0.82rem', color:C.muted, lineHeight:1.6, marginBottom:12 }}>
              {details.description}
            </p>
          )}

          {(details.fields || []).length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {details.fields.map(f => (
                <span key={f} style={{ fontSize:'0.7rem', padding:'0.2rem 0.5rem',
                  background:'#f1efe8', color:C.muted, borderRadius:100 }}>{f}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary checklist */}
      <div style={{ background:C.white, border:`1px solid ${C.border}`,
        borderRadius:6, padding:'1.25rem 1.5rem' }}>
        <div style={{ fontSize:'0.78rem', textTransform:'uppercase',
          letterSpacing:'0.08em', color:C.muted, fontWeight:500, marginBottom:14 }}>
          Upload summary
        </div>
        {[
          { label:'Files',       val: `${files.length} file${files.length!==1?'s':''}` },
          { label:'Type',        val: details.uploadType || '—' },
          { label:'Event tag',   val: details.hashtag ? `#${details.hashtag}` : '—' },
          { label:'List price',  val: base > 0 ? `$${base.toFixed(2)}` : '—' },
          { label:'Your cut',    val: creator > 0 ? `$${creator.toFixed(2)} per sale` : '—' },
          { label:'Fields',      val: (details.fields||[]).length > 0 ? details.fields.join(', ') : '—' },
        ].map((row,i,arr) => (
          <div key={row.label} style={{ display:'flex', justifyContent:'space-between',
            padding:'0.6rem 0',
            borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : 'none',
            fontSize:'0.875rem' }}>
            <span style={{ color:C.muted }}>{row.label}</span>
            <span style={{ fontWeight:500, color: row.label==="Your cut" ? C.success : C.ink }}>
              {row.val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Upload page ────────────────────────────── */
export default function Upload() {
  const navigate = useNavigate();
  const [step, setStep]       = useState(0);
  const [files, setFiles]     = useState([]);
  const [details, setDetails] = useState({ uploadType:'Single file', fields:[] });
  const [pricing, setPricing] = useState({ mode:'Per file', discountEnabled:false, discountPct:10 });
  const [published, setPublished] = useState(false);

  const canNext = () => {
    if (step === 0) return files.length > 0;
    if (step === 1) return !!details.title;
    if (step === 2) return !!(pricing.perFile || pricing.collection);
    return true;
  };

  const handlePublish = () => setPublished(true);

  if (published) {
    return (
      <div style={{ minHeight:'100vh', background:C.cream, display:'flex',
        alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center', maxWidth:420 }}>
          <div style={{ fontSize:'3rem', marginBottom:16 }}>✓</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:'2rem',
            fontWeight:700, marginBottom:12 }}>Upload published!</h2>
          <p style={{ color:C.muted, lineHeight:1.7, marginBottom:28 }}>
            Your content is now live on RawFrame. Buyers can discover it by hashtag,
            field, and your creator profile.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => navigate('/dashboard')}
              style={{ background:C.ink, color:C.cream, border:'none',
                borderRadius:2, padding:'0.75rem 1.75rem',
                fontSize:'0.875rem', fontWeight:500, cursor:'pointer' }}>
              Go to Dashboard
            </button>
            <button onClick={() => { setPublished(false); setStep(0);
              setFiles([]); setDetails({ uploadType:'Single file', fields:[] });
              setPricing({ mode:'Per file', discountEnabled:false, discountPct:10 }); }}
              style={{ background:'transparent', color:C.ink,
                border:`1px solid ${C.border}`, borderRadius:2,
                padding:'0.75rem 1.75rem', fontSize:'0.875rem', cursor:'pointer' }}>
              Upload another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      {/* Top bar */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`,
        padding:'1rem 3rem', display:'flex', alignItems:'center',
        justifyContent:'space-between' }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem',
          fontWeight:700, cursor:'pointer' }} onClick={() => navigate('/')}>
          Raw<span style={{ color:C.gold, fontStyle:'italic' }}>Frame</span>
        </div>
        <button onClick={() => navigate('/dashboard')}
          style={{ background:'transparent', border:`1px solid ${C.border}`,
            borderRadius:2, padding:'0.4rem 1rem',
            fontSize:'0.8rem', color:C.muted, cursor:'pointer' }}>
          ✕ Cancel
        </button>
      </div>

      {/* Main */}
      <div style={{ maxWidth:680, margin:'0 auto', padding:'3rem 1.5rem' }}>
        <StepBar current={step} />

        {/* Step content */}
        <div style={{ background:C.white, border:`1px solid ${C.border}`,
          borderRadius:8, padding:'2rem', marginBottom:24 }}>
          {step === 0 && <StepFiles files={files} setFiles={setFiles} />}
          {step === 1 && <StepDetails details={details} setDetails={setDetails} />}
          {step === 2 && <StepPricing pricing={pricing} setPricing={setPricing}
                           uploadType={details.uploadType} />}
          {step === 3 && <StepPreview files={files} details={details} pricing={pricing} />}
        </div>

        {/* Navigation */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <button onClick={() => step > 0 ? setStep(s => s-1) : navigate('/dashboard')}
            style={{ background:'transparent', color:C.muted,
              border:`1px solid ${C.border}`, borderRadius:2,
              padding:'0.7rem 1.5rem', fontSize:'0.875rem', cursor:'pointer' }}>
            {step === 0 ? 'Cancel' : '← Back'}
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:'0.78rem', color:C.muted }}>
              Step {step + 1} of {STEPS.length}
            </span>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s+1)} disabled={!canNext()}
                style={{ background: canNext() ? C.ink : C.border,
                  color: canNext() ? C.cream : C.muted,
                  border:'none', borderRadius:2, padding:'0.7rem 1.75rem',
                  fontSize:'0.875rem', fontWeight:500,
                  cursor: canNext() ? 'pointer' : 'not-allowed', transition:'all 0.2s' }}>
                Next →
              </button>
            ) : (
              <button onClick={handlePublish}
                style={{ background:C.gold, color:C.ink, border:'none',
                  borderRadius:2, padding:'0.7rem 1.75rem',
                  fontSize:'0.875rem', fontWeight:600, cursor:'pointer' }}>
                Publish Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}