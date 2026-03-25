import React from 'react';

const stats = [
  { num:'$4.7B', label:'Stock photo market (2024)' },
  { num:'70%',  label:'Revenue share to creators' },
  { num:'AI ✓', label:'Duplicate detection' },
  { num:'∞',    label:'Events & hashtags' },
];

export default function Stats() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)',
      borderTop:'1px solid rgba(14,13,11,0.12)', borderBottom:'1px solid rgba(14,13,11,0.12)',
      background:'#fff' }}>
      {stats.map((s,i) => (
        <div key={i} style={{ padding:'2rem 2.5rem', textAlign:'center',
          borderRight: i<3 ? '1px solid rgba(14,13,11,0.12)' : 'none' }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:'2.5rem',
            fontWeight:700, color:'#c9a84c', lineHeight:1 }}>{s.num}</div>
          <div style={{ fontSize:'0.8rem', color:'#7a7468', marginTop:'0.4rem',
            textTransform:'uppercase', letterSpacing:'0.05em' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}