import type { Screen } from '../../types';
import {
  Headphones, Coffee, Wallet, LampDesk, Backpack, Watch, Speaker, Square, Glasses,
  Star, Heart, ChevronDown, Check, Filter,
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

const ALL_PRODUCTS = [
  { name: 'Aria Wireless Headphones', price: '$129', icon: Headphones, swatch: SWATCHES[0], badge: 'Best seller', category: 'Audio', rating: 4.8 },
  { name: 'Terra Ceramic Mug', price: '$24', icon: Coffee, swatch: SWATCHES[1], badge: undefined, category: 'Home & Living', rating: 4.6 },
  { name: 'Nomad Leather Wallet', price: '$59', icon: Wallet, swatch: SWATCHES[2], badge: 'New', category: 'Accessories', rating: 4.7 },
  { name: 'Lumen Desk Lamp', price: '$89', icon: LampDesk, swatch: SWATCHES[3], badge: undefined, category: 'Home & Living', rating: 4.5 },
  { name: 'Field Canvas Backpack', price: '$118', icon: Backpack, swatch: SWATCHES[4], badge: undefined, category: 'Bags', rating: 4.9 },
  { name: 'Pulse Smart Watch', price: '$199', icon: Watch, swatch: SWATCHES[5], badge: undefined, category: 'Accessories', rating: 4.4 },
  { name: 'Echo Bluetooth Speaker', price: '$79', icon: Speaker, swatch: SWATCHES[0], badge: undefined, category: 'Audio', rating: 4.6 },
  { name: 'Grove Wooden Tray', price: '$34', icon: Square, swatch: SWATCHES[1], badge: undefined, category: 'Home & Living', rating: 4.3 },
  { name: 'Vertex Sunglasses', price: '$95', icon: Glasses, swatch: SWATCHES[2], badge: 'New', category: 'Accessories', rating: 4.7 },
];

const CATEGORIES_FILTER = [
  { label: 'Audio', checked: true },
  { label: 'Home & Living', checked: false },
  { label: 'Accessories', checked: false },
  { label: 'Bags', checked: false },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'flex', gap: 2, color: 'var(--warning)' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} fill={i <= Math.round(rating) ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

function ProductCard({ product, go }: { product: typeof ALL_PRODUCTS[0]; go: (s: Screen) => void }) {
  const Icon = product.icon;
  return (
    <div
      onClick={() => go('pdp')}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
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
      <div style={{ position: 'relative', height: 160, background: product.swatch, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={44} color="rgba(255,255,255,0.85)" strokeWidth={1.5} />
        {product.badge && (
          <span style={{
            position: 'absolute', top: 10, left: 10,
            background: 'var(--accent)', color: 'var(--accent-fg)',
            fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, letterSpacing: '.03em',
          }}>{product.badge}</span>
        )}
        <button
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: '50%',
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', backdropFilter: 'blur(6px)',
          }}
        >
          <Heart size={13} />
        </button>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '.07em' }}>
          {product.category}
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 8, lineHeight: 1.35 }}>
          {product.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>
            {product.price}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <StarRow rating={product.rating} />
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckboxRow({ label, checked }: { label: string; checked: boolean }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      padding: '5px 0', fontSize: 14, color: checked ? 'var(--text)' : 'var(--text-2)', fontWeight: checked ? 600 : 400,
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
        border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`,
        background: checked ? 'var(--accent)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent-fg)',
      }}>
        {checked && <Check size={11} strokeWidth={3} />}
      </span>
      {label}
    </label>
  );
}

export function PLPPage({ go }: Props) {
  return (
    <div style={{ fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px' }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            onClick={() => go('home')}
            style={{ cursor: 'pointer', color: 'var(--text-2)', fontWeight: 500 }}
            onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'var(--accent)'}
            onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-2)'}
          >Home</span>
          <span>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>All products</span>
        </nav>

        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 32px', color: 'var(--text)', letterSpacing: '-.02em' }}>
          All products
        </h1>

        {/* 2-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32, alignItems: 'start' }}>

          {/* Sidebar */}
          <aside style={{
            position: 'sticky', top: 88,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '24px 20px', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, color: 'var(--text)', fontWeight: 700, fontSize: 15 }}>
              <Filter size={16} color="var(--accent)" />
              Filters
            </div>

            {/* Category */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>
                Category
              </div>
              {CATEGORIES_FILTER.map(({ label, checked }) => (
                <CheckboxRow key={label} label={label} checked={checked} />
              ))}
            </div>

            <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

            {/* Availability */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>
                Availability
              </div>
              <CheckboxRow label="In stock" checked={true} />
              <CheckboxRow label="Pre-order" checked={false} />
            </div>

            <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

            {/* Rating */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>
                Rating
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 0' }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '50%', border: '1.5px solid var(--accent)',
                  background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-fg)' }} />
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: 'var(--text)', fontWeight: 600 }}>
                  {[1,2,3,4].map(i => <Star key={i} size={12} fill="currentColor" color="var(--warning)" />)}
                  <Star size={12} fill="none" color="var(--warning)" />
                  <span style={{ color: 'var(--text-2)', fontWeight: 400 }}>&amp; up</span>
                </span>
              </label>
            </div>

            <div style={{ height: 1, background: 'var(--border)', marginBottom: 24 }} />

            {/* Price range */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>
                Price range
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-2)', marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                <span>$0</span>
                <span>$250</span>
              </div>
              {/* Track */}
              <div style={{ position: 'relative', height: 6, background: 'var(--surface-3)', borderRadius: 99, marginBottom: 8 }}>
                <div style={{
                  position: 'absolute', left: 0, right: '25%', height: '100%',
                  background: 'var(--accent)', borderRadius: 99,
                }} />
                <div style={{
                  position: 'absolute', left: '75%', transform: 'translateX(-50%) translateY(-4px)',
                  width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)',
                  border: '2px solid var(--surface)', boxShadow: 'var(--shadow-sm)',
                }} />
                <div style={{
                  position: 'absolute', left: 0, transform: 'translateX(-50%) translateY(-4px)',
                  width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)',
                  border: '2px solid var(--surface)', boxShadow: 'var(--shadow-sm)',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>
                <span>$0 – $190</span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 500 }}>
                <strong style={{ color: 'var(--text)', fontWeight: 700 }}>48</strong> products
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Sort:</span>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 99, padding: '7px 14px', fontSize: 13, fontWeight: 600,
                  color: 'var(--text)', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Best selling <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Product grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
              {ALL_PRODUCTS.map((p) => (
                <ProductCard key={p.name} product={p} go={go} />
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
