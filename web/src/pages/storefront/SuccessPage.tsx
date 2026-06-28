import type { Screen } from '../../types';
import { CheckCircle2, Package, MapPin, Check } from 'lucide-react';

interface Props {
  go: (s: Screen) => void;
}

export function SuccessPage({ go }: Props) {
  const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
  const ui: React.CSSProperties = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  return (
    <div style={{
      ...ui,
      background: 'var(--bg)', minHeight: '100vh',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '72px 24px',
    }}>
      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>

        {/* Success icon */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--success-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
        }}>
          <Check size={40} color="var(--success)" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 32, fontWeight: 800, color: 'var(--text)',
          margin: '0 0 14px', letterSpacing: '-.03em', lineHeight: 1.15,
        }}>
          Payment successful
        </h1>

        {/* Confirmation text */}
        <p style={{ fontSize: 16, color: 'var(--text-2)', margin: '0 0 8px', lineHeight: 1.6 }}>
          Thank you for your order! We've received your payment and are preparing your items for shipment.
        </p>

        {/* Order number */}
        <p style={{ fontSize: 14, color: 'var(--text-3)', margin: '0 0 32px' }}>
          Order{' '}
          <span style={{ ...mono, color: 'var(--text-3)', fontWeight: 600 }}>
            #MRD-2025-04812
          </span>
        </p>

        {/* Info card */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, padding: '20px', marginBottom: 32,
          boxShadow: 'var(--shadow-sm)', textAlign: 'left',
        }}>
          {/* Row 1: Delivery */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            paddingBottom: 16, borderBottom: '1px solid var(--border)',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: 'var(--accent-soft)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
            }}>
              <Package size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Estimated delivery
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                May 12 – May 15, 2025
              </div>
            </div>
            <div style={{
              background: 'var(--success-soft)', border: '1px solid var(--success)',
              borderRadius: 6, padding: '4px 10px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <CheckCircle2 size={12} color="var(--success)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)' }}>Confirmed</span>
            </div>
          </div>

          {/* Row 2: Shipping to */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: 'var(--accent-soft)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
            }}>
              <MapPin size={18} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Shipping to
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                12 Rue de Rivoli, Paris, France
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button
            onClick={() => go('dash')}
            style={{
              background: 'var(--accent)', color: 'var(--accent-fg)',
              border: 'none', borderRadius: 10, padding: '12px 24px',
              fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
              transition: 'opacity .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Package size={16} /> Track order
          </button>
          <button
            onClick={() => go('home')}
            style={{
              background: 'var(--surface-2)', color: 'var(--text)',
              border: '1px solid var(--border)', borderRadius: 10, padding: '12px 24px',
              fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
              cursor: 'pointer', transition: 'border-color .15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}
