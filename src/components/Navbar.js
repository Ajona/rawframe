import React, { useState } from 'react';

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'1.25rem 3rem', background:'#f5f2ec', borderBottom:'1px solid rgba(14,13,11,0.12)',
    position:'sticky', top:0, zIndex:100 },
  logo: { fontFamily:"'Playfair Display', serif", fontSize:'1.5rem', fontWeight:700 },
  logoSpan: { color:'#c9a84c', fontStyle:'italic' },
  links: { display:'flex', gap:'2rem', listStyle:'none' },
  link: { color:'#7a7468', fontSize:'0.875rem', letterSpacing:'0.03em', transition:'color 0.2s' },
  cta: { background:'#0e0d0b', color:'#f5f2ec', padding:'0.5rem 1.25rem',
    border:'none', borderRadius:'2px', fontSize:'0.875rem', fontWeight:500 }
};

export default function Navbar() {
  const [hovered, setHovered] = useState(null);
  const links = ['Explore','Creators','Events','Pricing'];
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Raw<span style={styles.logoSpan}>Frame</span></div>
      <ul style={styles.links}>
        {links.map(l => (
          <li key={l}>
            <a href="#" style={{...styles.link, color: hovered===l ? '#0e0d0b' : '#7a7468'}}
              onMouseEnter={()=>setHovered(l)} onMouseLeave={()=>setHovered(null)}>{l}</a>
          </li>
        ))}
      </ul>
      <button style={styles.cta}>Start Selling</button>
    </nav>
  );
}