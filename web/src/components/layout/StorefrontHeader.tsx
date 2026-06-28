import { Search, Moon, Sun, User, Heart, ShoppingBag, Hexagon } from 'lucide-react';
import type { Screen, Theme } from '../../types';

interface Props {
  theme: Theme;
  toggleTheme: () => void;
  cartCount: number;
  go: (s: Screen) => void;
}

export function StorefrontHeader({ theme, toggleTheme, cartCount, go }: Props) {
  return (
    <>
      <div style={{ background:'var(--text)', color:'var(--bg)', textAlign:'center', fontSize:12.5, padding:'7px', letterSpacing:.01 }}>
        Free worldwide shipping over $150 · 30-day returns · USD / EUR
      </div>
      <header style={{ position:'sticky', top:0, zIndex:50, background:'var(--surface)', borderBottom:'1px solid var(--border)', backdropFilter:'blur(8px)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', gap:24 }}>
          <div onClick={() => go('home')} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', flexShrink:0 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-fg)' }}>
              <Hexagon size={18} />
            </div>
            <span style={{ fontWeight:800, fontSize:20, letterSpacing:'-.03em' }}>MERIDIAN</span>
          </div>

          <nav style={{ display:'flex', gap:4, flexShrink:0 }}>
            {['Shop all','Audio','Home','New'].map(label => (
              <button key={label} onClick={() => go('plp')} style={{ padding:'8px 12px', border:'none', background:'transparent', color:'var(--text-2)', fontFamily:'inherit', fontSize:14, fontWeight:600, cursor:'pointer', borderRadius:8 }}>
                {label}
              </button>
            ))}
          </nav>

          <div style={{ flex:1, maxWidth:380, position:'relative' }}>
            <Search size={16} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-3)' }} />
            <input
              onFocus={() => go('plp')}
              placeholder="Search products…"
              style={{ width:'100%', padding:'9px 12px 9px 36px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--text)', fontFamily:'inherit', fontSize:14 }}
            />
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:6, marginLeft:'auto', flexShrink:0 }}>
            <button onClick={toggleTheme} style={{ width:38, height:38, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button onClick={() => go('dash')} style={{ width:38, height:38, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <User size={17} />
            </button>
            <button onClick={() => go('dash')} style={{ width:38, height:38, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Heart size={17} />
            </button>
            <button onClick={() => go('cart')} style={{ position:'relative', display:'flex', alignItems:'center', gap:7, padding:'0 14px', height:38, borderRadius:10, border:'none', background:'var(--accent)', color:'var(--accent-fg)', fontFamily:'inherit', fontSize:14, fontWeight:600, cursor:'pointer' }}>
              <ShoppingBag size={17} />
              <span>{cartCount}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
