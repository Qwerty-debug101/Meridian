import { useState } from 'react';
import type { Screen, CartItem } from '../../types';
import { ArrowLeft, ShoppingBag, Trash2, Lock } from 'lucide-react';

interface Props {
  go: (s: Screen) => void;
  cart: CartItem[];
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

const STATIC_ITEMS = [
  {
    id: '1',
    name: 'Aria Wireless Headphones',
    variant: 'Color: Midnight',
    sku: 'ARIA-BLK-01',
    qty: 1,
    unitPrice: 129.00,
    gradient: 'linear-gradient(135deg, #6b73ff, #3a2a6b)',
  },
  {
    id: '2',
    name: 'Terra Ceramic Mug',
    variant: 'Color: Sand',
    sku: 'TERRA-SND-02',
    qty: 2,
    unitPrice: 24.00,
    gradient: 'linear-gradient(135deg, #1f9d63, #0e5e3a)',
  },
  {
    id: '3',
    name: 'Nomad Leather Wallet',
    variant: 'Color: Tan',
    sku: 'NOMAD-TAN-01',
    qty: 1,
    unitPrice: 59.00,
    gradient: 'linear-gradient(135deg, #e0683a, #a8431f)',
  },
];

export function CartPage({ go }: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    '1': 1,
    '2': 2,
    '3': 1,
  });
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(true);

  const handleQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  const subtotal = 236.00;
  const discount = 24.80;
  const shipping = 12.00;
  const tax = 24.00;
  const total = subtotal - discount + shipping + tax;

  const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
  const ui: React.CSSProperties = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  return (
    <div style={{ ...ui, background: 'var(--bg)', minHeight: '100vh', padding: '32px 24px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={() => go('plp')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              color: 'var(--text-3)', fontSize: 14, fontWeight: 500,
              fontFamily: 'inherit', padding: 0, marginBottom: 16,
            }}
          >
            <ArrowLeft size={15} /> Back to shop
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)',
            }}>
              <ShoppingBag size={20} />
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.02em' }}>
              Shopping cart
            </h1>
            <span style={{
              background: 'var(--accent)', color: 'var(--accent-fg)',
              borderRadius: 99, fontSize: 12, fontWeight: 700,
              padding: '2px 9px', marginLeft: 4,
            }}>3</span>
          </div>
        </div>

        {/* 2-col layout */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* LEFT: Items + coupon */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Items card */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {STATIC_ITEMS.map((item, idx) => {
                const qty = quantities[item.id] ?? item.qty;
                const lineTotal = (item.unitPrice * qty).toFixed(2);
                const isLast = idx === STATIC_ITEMS.length - 1;

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 20,
                      padding: '22px 24px',
                      borderBottom: isLast ? 'none' : '1px solid var(--border)',
                    }}
                  >
                    {/* Swatch */}
                    <div style={{
                      width: 84, height: 84, borderRadius: 12,
                      background: item.gradient, flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(0,0,0,.15)',
                    }} />

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 6 }}>
                        {item.variant}
                      </div>
                      <div style={{
                        ...mono,
                        fontSize: 11, color: 'var(--text-3)', fontWeight: 500,
                        background: 'var(--surface-2)', border: '1px solid var(--border)',
                        borderRadius: 5, display: 'inline-block', padding: '2px 7px',
                      }}>
                        {item.sku}
                      </div>
                    </div>

                    {/* Qty stepper */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 0,
                      border: '1px solid var(--border)', borderRadius: 8,
                      overflow: 'hidden', flexShrink: 0,
                    }}>
                      <button
                        onClick={() => handleQty(item.id, -1)}
                        style={{
                          width: 34, height: 34, background: 'var(--surface-2)',
                          border: 'none', cursor: 'pointer', fontSize: 18,
                          color: 'var(--text-2)', fontFamily: 'inherit',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          lineHeight: 1,
                        }}
                      >−</button>
                      <span style={{
                        ...mono,
                        minWidth: 36, textAlign: 'center', fontSize: 14,
                        fontWeight: 600, color: 'var(--text)', lineHeight: '34px',
                        borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)',
                      }}>
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQty(item.id, 1)}
                        style={{
                          width: 34, height: 34, background: 'var(--surface-2)',
                          border: 'none', cursor: 'pointer', fontSize: 18,
                          color: 'var(--text-2)', fontFamily: 'inherit',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          lineHeight: 1,
                        }}
                      >+</button>
                    </div>

                    {/* Line total */}
                    <div style={{
                      ...mono,
                      fontSize: 15, fontWeight: 700, color: 'var(--text)',
                      minWidth: 72, textAlign: 'right', flexShrink: 0,
                    }}>
                      ${lineTotal}
                    </div>

                    {/* Trash */}
                    <button
                      style={{
                        background: 'none', border: '1px solid var(--border)',
                        borderRadius: 8, width: 34, height: 34,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--danger)', flexShrink: 0,
                        transition: 'background .15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--danger-soft)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}

              {/* Footer: Continue shopping */}
              <div style={{
                padding: '16px 24px', borderTop: '1px solid var(--border)',
                background: 'var(--surface-2)',
              }}>
                <button
                  onClick={() => go('plp')}
                  style={{
                    background: 'none', border: '1px solid var(--border)',
                    borderRadius: 8, padding: '9px 18px', cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                    color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'border-color .15s, color .15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-2)';
                  }}
                >
                  <ArrowLeft size={14} /> Continue shopping
                </button>
              </div>
            </div>

            {/* Coupon card */}
            <div style={{
              marginTop: 20, background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '22px 24px', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 14 }}>
                Have a coupon?
              </div>

              {couponApplied ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'var(--success-soft)', border: '1px solid var(--success)',
                  borderRadius: 8, padding: '10px 14px',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--success)', flex: 1 }}>
                    <span style={{ ...mono }}>WELCOME10</span> applied · −$24.80
                  </span>
                  <button
                    onClick={() => setCouponApplied(false)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--success)', fontFamily: 'inherit', fontSize: 12,
                      fontWeight: 600, opacity: 0.7, padding: 0,
                    }}
                  >Remove</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    style={{
                      flex: 1, padding: '10px 14px', borderRadius: 8,
                      border: '1px solid var(--border)', background: 'var(--surface-2)',
                      color: 'var(--text)', fontSize: 14, fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => {
                      if (couponInput.trim()) setCouponApplied(true);
                    }}
                    style={{
                      background: 'var(--accent)', color: 'var(--accent-fg)',
                      border: 'none', borderRadius: 8, padding: '10px 18px',
                      fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >Apply</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Order summary */}
          <div style={{
            width: 360, flexShrink: 0,
            position: 'sticky', top: 24,
          }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 20 }}>
                Order summary
              </div>

              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Subtotal</span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Discount <span style={{ ...mono, fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>WELCOME10</span></span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--success)' }}>−${discount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Shipping</span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>${shipping.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Tax (VAT)</span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--border)', margin: '18px 0' }} />

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>Total</span>
                <span style={{ ...mono, fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Checkout button */}
              <button
                onClick={() => go('checkout')}
                style={{
                  width: '100%', background: 'var(--accent)', color: 'var(--accent-fg)',
                  border: 'none', borderRadius: 10, padding: '13px 0',
                  fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '.01em',
                  transition: 'opacity .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Checkout →
              </button>

              {/* Secure note */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 5, marginTop: 12, fontSize: 12, color: 'var(--text-3)',
              }}>
                <Lock size={12} />
                Secure checkout via Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
