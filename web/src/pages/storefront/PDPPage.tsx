import type { Screen } from '../../types';
import {
  Headphones, Coffee, Wallet, LampDesk, Backpack,
  Star, Heart, Truck, ShieldCheck, ShoppingBag, ArrowRight,
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
  qty: number;
  incQty: () => void;
  decQty: () => void;
  addToCart: () => void;
}

const RELATED = [
  { name: 'Echo Bluetooth Speaker', price: '$79', icon: LampDesk, swatch: SWATCHES[0], category: 'Audio', rating: 4.6 },
  { name: 'Terra Ceramic Mug', price: '$24', icon: Coffee, swatch: SWATCHES[1], category: 'Home & Living', rating: 4.6 },
  { name: 'Nomad Leather Wallet', price: '$59', icon: Wallet, swatch: SWATCHES[2], category: 'Accessories', rating: 4.7 },
  { name: 'Field Canvas Backpack', price: '$118', icon: Backpack, swatch: SWATCHES[4], category: 'Bags', rating: 4.9 },
];

const THUMB_SWATCHES = [SWATCHES[3], SWATCHES[0], SWATCHES[2], SWATCHES[1]];
const COLOR_OPTIONS = [
  { color: '#16161d', label: 'Black', selected: true },
  { color: '#6b73ff', label: 'Violet', selected: false },
  { color: '#e0683a', label: 'Rust', selected: false },
];

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: 'flex', gap: 2, color: 'var(--warning)' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

function RelatedCard({ product, go }: { product: typeof RELATED[0]; go: (s: Screen) => void }) {
  const Icon = product.icon;
  return (
    <div
      onClick={() => go('pdp')}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .18s, transform .18s',
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
      <div style={{ height: 130, background: product.swatch, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={38} color="rgba(255,255,255,.85)" strokeWidth={1.5} />
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 3 }}>
          {product.category}
        </div>
        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>
          {product.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>
            {product.price}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <StarRow rating={product.rating} size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PDPPage({ go, qty, incQty, decQty, addToCart }: Props) {
  return (
    <div style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px' }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span
            onClick={() => go('home')}
            style={{ cursor: 'pointer', color: 'var(--text-2)', fontWeight: 500 }}
            onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-2)'}
          >Home</span>
          <span>/</span>
          <span
            onClick={() => go('plp')}
            style={{ cursor: 'pointer', color: 'var(--text-2)', fontWeight: 500 }}
            onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-2)'}
          >Audio</span>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>Aria Wireless Headphones</span>
        </nav>

        {/* 2-column product layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', marginBottom: 72 }}>

          {/* Image column */}
          <div>
            {/* Main image */}
            <div style={{
              height: 440, background: SWATCHES[0], borderRadius: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16, boxShadow: 'var(--shadow-md)',
            }}>
              <Headphones size={90} color="rgba(255,255,255,.88)" strokeWidth={1.3} />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {THUMB_SWATCHES.map((swatch, i) => (
                <div
                  key={i}
                  style={{
                    height: 72, background: swatch, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    border: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                    boxShadow: i === 0 ? '0 0 0 2px var(--accent-soft)' : 'none',
                    transition: 'border .15s',
                  }}
                >
                  <Headphones size={26} color="rgba(255,255,255,.75)" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </div>

          {/* Details column */}
          <div style={{ position: 'sticky', top: 88 }}>

            {/* Category */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>
              Audio
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 14px', color: 'var(--text)', lineHeight: 1.15, letterSpacing: '-.02em' }}>
              Aria Wireless Headphones
            </h1>

            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <StarRow rating={4.8} />
              <span style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 500 }}>
                <strong style={{ color: 'var(--text)' }}>4.8</strong> · 214 reviews
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 30, color: 'var(--text)',
              }}>
                $129.00
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: 16,
                color: 'var(--text-3)', textDecoration: 'line-through',
              }}>
                $159.00
              </span>
              <span style={{
                background: 'var(--success-soft)', color: 'var(--success)',
                fontSize: 12, fontWeight: 700, padding: '3px 9px', borderRadius: 99, letterSpacing: '.02em',
              }}>
                Save 18%
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65, margin: '0 0 24px' }}>
              Studio-grade wireless headphones with adaptive noise cancellation, 40-hour battery and plush memory-foam earcups.
            </p>

            <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

            {/* Color picker */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
                Color — <span style={{ fontWeight: 400, color: 'var(--text-2)' }}>Midnight Black</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {COLOR_OPTIONS.map(({ color, label, selected }) => (
                  <button
                    key={label}
                    title={label}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: color, border: 'none', cursor: 'pointer',
                      outline: selected ? `3px solid var(--accent)` : `3px solid transparent`,
                      outlineOffset: 2,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Qty stepper + Add to cart */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'stretch' }}>
              {/* Stepper */}
              <div style={{
                display: 'flex', alignItems: 'center',
                border: '1px solid var(--border)', borderRadius: 12,
                overflow: 'hidden', background: 'var(--surface)',
              }}>
                <button
                  onClick={decQty}
                  style={{
                    width: 40, height: 48, border: 'none', background: 'none', cursor: 'pointer',
                    fontSize: 18, color: 'var(--text)', fontWeight: 500, fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  −
                </button>
                <span style={{
                  minWidth: 36, textAlign: 'center', fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600, fontSize: 15, color: 'var(--text)',
                  borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)',
                  padding: '0 4px', lineHeight: '48px',
                }}>
                  {qty}
                </span>
                <button
                  onClick={incQty}
                  style={{
                    width: 40, height: 48, border: 'none', background: 'none', cursor: 'pointer',
                    fontSize: 18, color: 'var(--text)', fontWeight: 500, fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={addToCart}
                style={{
                  flex: 1, height: 48, background: 'var(--accent)', color: 'var(--accent-fg)',
                  border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 15,
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'opacity .15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '.88'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
              >
                <ShoppingBag size={18} />
                Add to cart
              </button>

              {/* Heart */}
              <button
                style={{
                  width: 48, height: 48, border: '1px solid var(--border)', borderRadius: 12,
                  background: 'var(--surface)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-3)',
                }}
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Shipping info box */}
            <div style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '16px 18px', marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Truck size={16} color="var(--text-2)" />
                <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>
                  <strong style={{ color: 'var(--text)', fontWeight: 700 }}>Free shipping</strong>, 3–5 business days
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={16} color="var(--text-2)" />
                <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>
                  <strong style={{ color: 'var(--text)', fontWeight: 700 }}>2-year warranty</strong> &amp; 30-day returns
                </span>
              </div>
            </div>

            {/* SKU + stock */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                SKU: ARIA-BLK-01
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                In stock
              </span>
            </div>

          </div>
        </div>

        {/* You might also like */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text)' }}>You might also like</h2>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {RELATED.map((p) => (
              <RelatedCard key={p.name} product={p} go={go} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
