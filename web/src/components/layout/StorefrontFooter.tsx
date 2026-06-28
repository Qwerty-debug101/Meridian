import { Hexagon, Lock } from 'lucide-react';

const COLS = [
  { title: 'Shop', links: ['All products', 'New arrivals', 'Best sellers', 'Gift cards'] },
  { title: 'Support', links: ['Contact us', 'Shipping', 'Returns', 'Track order'] },
  { title: 'Company', links: ['About', 'Sustainability', 'Privacy', 'Terms'] },
];

export function StorefrontFooter() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', background:'var(--surface)', marginTop:24 }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px', display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:32 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ width:30, height:30, borderRadius:8, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-fg)' }}>
              <Hexagon size={16} />
            </div>
            <span style={{ fontWeight:800, fontSize:18, letterSpacing:'-.03em' }}>MERIDIAN</span>
          </div>
          <p style={{ fontSize:13.5, color:'var(--text-3)', lineHeight:1.6, maxWidth:260, margin:0 }}>
            Considered consumer goods, shipped worldwide. Prices in USD &amp; EUR.
          </p>
        </div>
        {COLS.map(col => (
          <div key={col.title}>
            <div style={{ fontSize:12, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--text-3)', fontWeight:700, marginBottom:12 }}>{col.title}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {col.links.map(l => (
                <span key={l} style={{ fontSize:13.5, color:'var(--text-2)', cursor:'pointer' }}>{l}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop:'1px solid var(--border)', padding:'18px 24px', maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12.5, color:'var(--text-3)' }}>
        <span>© 2025 Meridian. All rights reserved.</span>
        <span style={{ display:'flex', alignItems:'center', gap:6 }}><Lock size={13} /> Secured by Stripe</span>
      </div>
    </footer>
  );
}
