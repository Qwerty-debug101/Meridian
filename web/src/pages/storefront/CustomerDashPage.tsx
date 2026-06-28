import { LayoutGrid, Package, Heart, MapPin, Settings } from 'lucide-react';
import type { Screen } from '../../types';

interface Props {
  go: (s: Screen) => void;
}

const ORDERS = [
  { id: '#MRD-2025-04812', date: 'May 8, 2025', items: 3, status: 'In transit', statusBg: 'var(--accent-soft)', statusColor: 'var(--accent)', total: '$247.20' },
  { id: '#MRD-2025-04655', date: 'Apr 22, 2025', items: 1, status: 'Delivered', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', total: '$89.00' },
  { id: '#MRD-2025-04401', date: 'Mar 30, 2025', items: 2, status: 'Delivered', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', total: '$143.00' },
  { id: '#MRD-2025-04188', date: 'Mar 11, 2025', items: 1, status: 'Refunded', statusBg: 'var(--danger-soft)', statusColor: 'var(--danger)', total: '$59.00' },
];

const NAV = [
  { label: 'Overview', icon: LayoutGrid, active: true },
  { label: 'Orders', icon: Package, active: false },
  { label: 'Wishlist', icon: Heart, active: false },
  { label: 'Addresses', icon: MapPin, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

export function CustomerDashPage({ go: _go }: Props) {
  return (
    <div style={{ paddingBottom: 64 }}>
      <div style={{ padding: '28px 0 20px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>My account</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 28, alignItems: 'start' }}>
        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 88, border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface)', padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px 16px' }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              EM
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Elise Moreau</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>elise@example.com</div>
            </div>
          </div>
          {NAV.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, background: active ? 'var(--accent-soft)' : 'transparent', color: active ? 'var(--accent)' : 'var(--text-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 2 }}
            >
              <Icon size={17} />
              {label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 22 }}>
            {[{ label: 'Total orders', value: '14' }, { label: 'In transit', value: '2' }, { label: 'Wishlist', value: '8' }].map(s => (
              <div key={s.label} style={{ border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface)', padding: 18 }}>
                <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-.02em' }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 16, background: 'var(--surface)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Order history</div>
              <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>View all</span>
            </div>
            {ORDERS.map(o => (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>
                  <Package size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 13.5 }}>{o.id}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{o.date} · {o.items} item{o.items !== 1 ? 's' : ''}</div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: o.statusBg, color: o.statusColor, fontSize: 12, fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: o.statusColor }} />
                  {o.status}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, width: 90, textAlign: 'right' }}>{o.total}</span>
                <button style={{ padding: '7px 12px', borderRadius: 9, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Track
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
