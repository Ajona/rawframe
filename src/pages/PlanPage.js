import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const C = { ink:'#0e0d0b', cream:'#f5f2ec', gold:'#c9a84c', muted:'#7a7468', border:'rgba(14,13,11,0.12)', success:'#4a6741' };

const PLANS = {
  starter: {
    name:'Starter', price:'Free', period:'', tagline:'Everything you need to start selling your content.',
    color: C.ink, btnLabel:'Create Free Account', btnColor: C.ink, btnText: C.cream,
    features:[
      'Unlimited file uploads for sale',
      'Event hashtag tagging — get discovered by buyers at any event',
      '3 non-downloadable sample files on your public profile',
      '2 shareable links per upload (profile + content-specific)',
      'Dual creator and buyer account — sell and shop in one place',
      '65% revenue share on every sale',
      'Watermark preview with quality window for buyers',
      'AI duplicate detection on all uploads',
      'Creator transaction dashboard — paid, pending, withdrawals',
    ],
  },
  pro: {
    name:'Pro Creator', price:'$12', period:'/mo', tagline:'Unlock the full creator toolkit and earn more per sale.',
    featured:true, color: C.gold, btnLabel:'Start 14-Day Free Trial', btnColor: C.gold, btnText: C.ink,
    features:[
      'Everything in Starter',
      '70% revenue share — 5% more than Starter',
      'Priority listing in search and browse results',
      'Full analytics dashboard — views, conversions, top files',
      'Collection bundle pricing — single price for a whole pack',
      'Advanced transaction filters and CSV export',
      'Profile badge — "Pro Creator" visible to buyers',
      'Early access to new platform features',
      '14-day free trial — no credit card required',
    ],
  },
  studio: {
    name:'Studio', price:'$49', period:'/mo', tagline:'For agencies, studios, and high-volume creative teams.',
    color: C.ink, btnLabel:'Contact Sales', btnColor: C.ink, btnText: C.cream,
    features:[
      'Everything in Pro',
      '75% revenue share — highest on the platform',
      'Team sub-accounts — add up to 10 collaborators',
      'API access for bulk uploads and automation',
      'Dedicated account manager',
      'Custom branded creator profile page',
      'Enterprise licensing portal for bulk content buyers',
      'Priority support with 4-hour response SLA',
      'Volume discount negotiation available',
    ],
  },
};

export default function PlanPage() {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const plan      = PLANS[slug] || PLANS.starter;

  return (
    <div style={{ minHeight:'100vh', background:C.cream }}>
      <Navbar />
      <div style={{ maxWidth:680, margin:'0 auto', padding:'4rem 2rem' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          {plan.featured && (
            <div style={{ display:'inline-block', background:C.gold, color:C.ink,
              fontSize:'0.7rem', letterSpacing:'0.12em', textTransform:'uppercase',
              padding:'0.3rem 1rem', borderRadius:100, fontWeight:600, marginBottom:'1rem' }}>
              Most Popular
            </div>
          )}
          <div style={{ fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em',
            color:C.gold, fontWeight:500, marginBottom:8 }}>{plan.name}</div>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:4, marginBottom:12 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:'4rem',
              fontWeight:700, color:C.ink, lineHeight:1 }}>{plan.price}</span>
            <span style={{ color:C.muted, fontSize:'1.1rem' }}>{plan.period}</span>
          </div>
          <p style={{ color:C.muted, fontSize:'1rem', lineHeight:1.7 }}>{plan.tagline}</p>
        </div>

        {/* Feature list */}
        <div style={{ background:'#fff', border:`1px solid ${C.border}`, borderRadius:8,
          padding:'2rem', marginBottom:'2rem' }}>
          <div style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em',
            color:C.muted, fontWeight:500, marginBottom:'1.25rem' }}>What's included</div>
          {plan.features.map((f,i) => (
            <div key={i} style={{ display:'flex', gap:12, padding:'0.65rem 0',
              borderBottom: i<plan.features.length-1 ? `1px solid ${C.border}` : 'none',
              alignItems:'flex-start' }}>
              <span style={{ color:C.success, fontWeight:700, fontSize:'0.9rem',
                marginTop:2, flexShrink:0 }}>✓</span>
              <span style={{ fontSize:'0.9rem', color:C.ink, lineHeight:1.5 }}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => navigate(slug==='studio' ? '/login' : '/signup')}
          style={{ width:'100%', padding:'1rem', background:plan.btnColor,
            color:plan.btnText, border:'none', borderRadius:4, fontSize:'1rem',
            fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
            marginBottom:16 }}>
          {plan.btnLabel}
        </button>
        {plan.featured && (
          <p style={{ textAlign:'center', fontSize:'0.82rem', color:C.muted }}>
            No credit card required. Cancel anytime.
          </p>
        )}

        <div style={{ textAlign:'center', marginTop:'1.5rem' }}>
          <span onClick={() => navigate('/pricing')}
            style={{ fontSize:'0.85rem', color:C.muted, cursor:'pointer',
              textDecoration:'underline' }}>← Compare all plans</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}