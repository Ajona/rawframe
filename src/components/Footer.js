import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background:'#0e0d0b', color:'rgba(245,242,236,0.55)',
      padding:'3rem', display:'flex', justifyContent:'space-between',
      alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.25rem',
        color:'#f5f2ec', fontWeight:700 }}>
        Raw<span style={{ color:'#c9a84c', fontStyle:'italic' }}>Frame</span>
      </div>
      <p style={{ fontSize:'0.8rem', fontWeight:300 }}>© 2025 RawFrame · Built for the creator economy</p>
      <p style={{ fontSize:'0.75rem' }}>Terms · Privacy · Creators · API</p>
    </footer>
  );
}