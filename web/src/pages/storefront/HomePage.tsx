import type { Screen } from '../../types';
import {
  Headphones, Coffee, Wallet, LampDesk, Truck, ShieldCheck, RefreshCw,
  Star, Heart, Sparkles, ArrowRight, Lamp, Watch, Backpack,
} from 'lucide-react';

const SWATCHES = [
  'linear-gradient(135deg,#6b73ff,#3a2a6b)',
  'linear-gradient(135deg,#1f9d63,#0e5e3a)',
  'linear-gradient(135deg,#e0683a,#a8431f)',
  'linear-gradient(135deg,#3a3a47,#16161d)',
  'linear-gradient(135deg,#c98a1a,#7a520d)',
  'linear-gradient(135deg,#d6453d,#8a221c)',
];

interface Props {
  go: (s: Screen) => void;
}

const FEATURED = [
  { name: 'Aria Wireless Headphones', price: '$129', icon: Headphones, swatch: SWATCHES[0], badge: 'Best seller', category: 'Audio', rating: 4.8, reviews: 214 },
  { name: 'Terra Ceramic Mug', price: '$24', icon: Coffee, swatch: SWATCHES[1], badge: undefined, category: 'Home & Living', rating: 4.6, reviews: 89 },
  { name: 'Nomad Leather Wallet', price: '$59', icon: Wallet, swatch: SWATCHES[2], badge: 'New', category: 'Accessories', rating: 4.7, reviews: 132 },
  { name: 'Lumen Desk Lamp', price: '$89', icon: LampDesk, swatch: SWATCHES[3], badge: undefined, category: 'Home & Living', rating: 4.5, reviews: 67 },
];

const CATEGORIES = [
  { label: 'Audio', count: 24, icon: Headphones },
  { label: 'Home & Living', count: 38, icon: Lamp },
  { label: 'Accessories', count: 52, icon: Watch },
  { label: 'Bags', count: 19, icon: Backpack },
];

const VALUE_PROPS = [
  { icon: Truck, title: 'Worldwide shipping', desc: 'USD & EUR supported, free over $75' },
  { icon: ShieldCheck, title: 'Secure payments', desc: 'SSL encrypted, all major cards accepted' },
  { icon: RefreshCw, title: 'Easy 30-day returns', desc: 'No questions asked, hassle-free policy' },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'flex', gap: 2, color: 'var(--warning)' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} fill={i <= Math.round(rating) ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

function ProductCard({ product, go }: { product: typeof FEATURED[0]; go: (s: Screen) => void }) {
  const Icon = product.icon;
  return (
    <div
      onClick={() => go('pdp')}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow .18s, transform .18s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-md)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-sm)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', height: 180, background: product.swatch, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={52} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />
        {product.badge && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            background: 'var(--accent)', color: 'var(--accent-fg)',
            fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 99,
            letterSpacing: '.02em',
          }}>{product.badge}</span>
        )}
        <button
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', backdropFilter: 'blur(6px)',
          }}
        >
          <Heart size={15} />
        </button>
      </div>

      {/* Card body */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>
          {product.category}
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)', marginBottom: 8, lineHeight: 1.35 }}>
          {product.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 16, color: 'var(--text)' }}>
            {product.price}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <StarRow rating={product.rating} />
            <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePage({ go }: Props) {
  return (
    <div style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1b1b3a 0%, #5b5bf0 100%)',
        minHeight: 340,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: 700, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)',
            borderRadius: 99, padding: '5px 14px', marginBottom: 24,
            color: 'rgba(255,255,255,.9)', fontSize: 13, fontWeight: 600,
            backdropFilter: 'blur(6px)',
          }}>
            <Sparkles size={13} />
            New season · 2025
          </div>
          <h1 style={{
            color: '#fff', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
            margin: '0 0 16px', lineHeight: 1.15, letterSpacing: '-.02em',
          }}>
            Considered goods for<br />everyday life.
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 16, margin: '0 0 32px', lineHeight: 1.6 }}>
            Thoughtfully designed products shipped worldwide in USD &amp; EUR.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => go('plp')}
              style={{
                background: '#fff', color: '#1b1b3a', border: 'none', borderRadius: 99,
                padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'inherit',
              }}
            >
              Shop all <ArrowRight size={16} />
            </button>
            <button
              onClick={() => go('plp')}
              style={{
                background: 'rgba(255,255,255,.12)', color: '#fff',
                border: '1px solid rgba(255,255,255,.25)', borderRadius: 99,
                padding: '12px 28px', fontWeight: 600, fontSize: 15, cursor: 'pointer',
                backdropFilter: 'blur(6px)', fontFamily: 'inherit',
              }}
            >
              New arrivals
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px' }}>

        {/* Category grid */}
        <section style={{ padding: '56px 0 48px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 24px', color: 'var(--text)' }}>Browse categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {CATEGORIES.map(({ label, count, icon: Icon }) => (
              <button
                key={label}
                onClick={() => go('plp')}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '24px 20px', cursor: 'pointer',
                  textAlign: 'left', boxShadow: 'var(--shadow-sm)',
                  fontFamily: 'inherit', transition: 'box-shadow .18s, transform .18s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--shadow-md)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--shadow-sm)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14, color: 'var(--accent)',
                }}>
                  <Icon size={22} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>{count} products</div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section style={{ padding: '0 0 56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>Best sellers this month</h2>
            <button
              onClick={() => go('plp')}
              style={{
                background: 'none', border: '1px solid var(--border)', borderRadius: 99,
                padding: '8px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                color: 'var(--text-2)', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {FEATURED.map((p) => (
              <ProductCard key={p.name} product={p} go={go} />
            ))}
          </div>
        </section>

        {/* Value props */}
        <section style={{
          padding: '40px 0 64px',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
