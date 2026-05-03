import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { uploadsAPI } from '../services/api';

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

/* ── Step Bar ─────────────────────────────── */
function StepBar({ current }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:'2.5rem' }}>
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <React.Fragment key={s}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
              <div style={{
                width:32, height:32, borderRadius:'50%',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.8rem', fontWeight:500,
                background: done ? C.gold : active ? C.ink : 'transparent',
                border: done || active ? 'none' : `1px solid ${C.border}`,
                color: done ? C.ink : active ? C.cream : C.muted
              }}>
                {done ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize:'0.72rem',
                fontWeight: active ? 500 : 400,
                color: active ? C.ink : C.muted,
                whiteSpace:'nowrap'
              }}>{s}</span>
            </div>

            {i < STEPS.length - 1 && (
              <div style={{
                flex:1,
                height:1,
                background: done ? C.gold : C.border,
                margin:'0 8px',
                marginBottom:18
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── File icon ─────────────────────────────── */
function FileIcon({ type }) {
  const isVideo = type?.startsWith('video');
  return (
    <div style={{
      width:40, height:40, borderRadius:4,
      background: isVideo ? '#1a2030' : '#f0e8d0',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:'1.1rem'
    }}>
      {isVideo ? '▶' : '◼'}
    </div>
  );
}

/* ── STEP 1 ─────────────────────────────── */
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
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
    multiple: true,
  });

  const remove = id => setFiles(prev => prev.filter(f => f.id !== id));

  return (
    <div>
      <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.4rem', fontWeight:700 }}>
        Upload your files
      </h3>

      <div {...getRootProps()} style={{
        border:`2px dashed ${isDragActive ? C.gold : C.border}`,
        padding:'3rem',
        textAlign:'center',
        background: isDragActive ? '#faf7f0' : C.white,
        cursor:'pointer'
      }}>
        <input {...getInputProps()} />
        Drag & drop files or click
      </div>

      {files.map(f => (
        <div key={f.id} style={{ display:'flex', gap:10, marginTop:10 }}>
          {f.preview ? (
            <img src={f.preview} width={40} height={40} alt="" />
          ) : (
            <FileIcon type={f.type} />
          )}
          <div style={{ flex:1 }}>{f.name}</div>
          <button onClick={() => remove(f.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}

/* ── MAIN UPLOAD ─────────────────────────────── */
export default function Upload() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [details, setDetails] = useState({ uploadType:'Single file', fields:[] });
  const [pricing, setPricing] = useState({ mode:'Per file', discountEnabled:false, discountPct:10 });

  const [published, setPublished] = useState(false);

  /* NEW STATES */
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const canNext = () => {
    if (step === 0) return files.length > 0;
    if (step === 1) return !!details.title;
    if (step === 2) return !!(pricing.perFile || pricing.collection);
    return true;
  };

  /* ── REAL API HANDLER ── */
  const handlePublish = async () => {
    setPublishing(true);
    setPublishError('');
    setUploadProgress(0);

    try {
      const formData = new FormData();

      files.forEach(f => formData.append('files', f.file));
      formData.append('title', details.title || '');
      formData.append('description', details.description || '');
      formData.append('hashtag', details.hashtag || '');
      formData.append('upload_type', details.uploadType === 'Collection' ? 'collection' : 'single');
      formData.append('price_per_file', pricing.perFile || '');
      formData.append('collection_price', pricing.collection || '');
      formData.append('discount_pct', pricing.discountEnabled ? (pricing.discountPct || 10) : '');
      formData.append('fields', JSON.stringify(details.fields || []));

      await uploadsAPI.upload(formData, (pct) => {
        setUploadProgress(pct);
      });

      setPublished(true);

    } catch (err) {
      setPublishError(
        err?.response?.data?.error || 'Upload failed. Please try again.'
      );
    } finally {
      setPublishing(false);
    }
  };

  if (published) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <h2>Upload successful ✓</h2>
      </div>
    );
  }

  return (
    <div style={{ padding:30 }}>
      <StepBar current={step} />

      <div style={{ marginBottom:20 }}>
        {step === 0 && <StepFiles files={files} setFiles={setFiles} />}
      </div>

      {/* ERROR */}
      {publishError && (
        <div style={{
          color:'#b84c2e',
          fontSize:'0.82rem',
          marginBottom:12,
          textAlign:'center'
        }}>
          {publishError}
        </div>
      )}

      {/* NAVIGATION */}
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:20 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))}>
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}>
            Next
          </button>
        ) : (
          <button
            onClick={handlePublish}
            disabled={publishing}
            style={{
              background: publishing ? '#7a7468' : C.gold,
              color: C.ink,
              border:'none',
              padding:'0.7rem 1.5rem',
              cursor: publishing ? 'not-allowed' : 'pointer'
            }}
          >
            {publishing ? `Uploading ${uploadProgress}%…` : 'Publish Upload'}
          </button>
        )}
      </div>
    </div>
  );
}