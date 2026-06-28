import { useState } from 'react';
import type { Screen, CartItem } from '../../types';
import { MapPin, Lock, CreditCard, Truck, Mail } from 'lucide-react';

interface Props {
  go: (s: Screen) => void;
  cart: CartItem[];
}

const MINI_ITEMS = [
  { name: 'Aria Wireless Headphones', variant: 'Midnight', gradient: 'linear-gradient(135deg, #6b73ff, #3a2a6b)', qty: 1, price: '$129.00' },
  { name: 'Terra Ceramic Mug', variant: 'Sand', gradient: 'linear-gradient(135deg, #1f9d63, #0e5e3a)', qty: 2, price: '$48.00' },
  { name: 'Nomad Leather Wallet', variant: 'Tan', gradient: 'linear-gradient(135deg, #e0683a, #a8431f)', qty: 1, price: '$59.00' },
];

const STEPS = [
  { label: 'Information', num: 1 },
  { label: 'Shipping', num: 2 },
  { label: 'Payment', num: 3 },
];

export function CheckoutPage({ go }: Props) {
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postal: '',
    country: '',
  });

  const mono: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };
  const ui: React.CSSProperties = { fontFamily: "'Schibsted Grotesk', sans-serif" };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '1px solid var(--border)', background: 'var(--surface-2)',
    color: 'var(--text)', fontSize: 14, fontFamily: "'Schibsted Grotesk', sans-serif",
    outline: 'none', boxSizing: 'border-box',
  };

  const sectionStyle: React.CSSProperties = {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '16px 20px', borderBottom: '1px solid var(--border)',
    background: 'var(--surface-2)',
  };

  const iconCircle: React.CSSProperties = {
    width: 32, height: 32, borderRadius: 8,
    background: 'var(--accent-soft)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
    flexShrink: 0,
  };

  return (
    <div style={{ ...ui, background: 'var(--bg)', minHeight: '100vh', padding: '32px 24px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={() => go('cart')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              color: 'var(--text-3)', fontSize: 14, fontWeight: 500,
              fontFamily: 'inherit', padding: 0, marginBottom: 16,
            }}
          >
            ← Back to cart
          </button>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.02em' }}>
            Checkout
          </h1>
        </div>

        {/* Step indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          marginBottom: 36, maxWidth: 480,
        }}>
          {STEPS.map((step, idx) => {
            const active = idx < 2;
            return (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: idx < STEPS.length - 1 ? 1 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: active ? 'var(--accent)' : 'var(--surface-3)',
                    color: active ? 'var(--accent-fg)' : 'var(--text-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, flexShrink: 0,
                    border: active ? 'none' : '1.5px solid var(--border)',
                  }}>{step.num}</div>
                  <span style={{
                    fontSize: 13, fontWeight: 600,
                    color: active ? 'var(--text)' : 'var(--text-3)',
                    whiteSpace: 'nowrap',
                  }}>{step.label}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: 1,
                    background: idx < 1 ? 'var(--accent)' : 'var(--border)',
                    margin: '0 12px',
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* 2-col layout */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* LEFT: Form sections */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* 1. Contact */}
            <div style={sectionStyle}>
              <div style={sectionHeaderStyle}>
                <div style={iconCircle}><Mail size={16} /></div>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Contact</span>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div style={sectionStyle}>
              <div style={sectionHeaderStyle}>
                <div style={iconCircle}><MapPin size={16} /></div>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Shipping Address</span>
              </div>
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="Elise"
                      value={form.firstName}
                      onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Moreau"
                      value={form.lastName}
                      onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="12 Rue de Rivoli"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Paris"
                      value={form.city}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                      Postal code
                    </label>
                    <input
                      type="text"
                      placeholder="75001"
                      value={form.postal}
                      onChange={e => setForm(f => ({ ...f, postal: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    style={{ ...inputStyle, appearance: 'none' }}
                  >
                    <option value="">Select country…</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Shipping Method */}
            <div style={sectionStyle}>
              <div style={sectionHeaderStyle}>
                <div style={iconCircle}><Truck size={16} /></div>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Shipping Method</span>
              </div>
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { id: 'standard', label: 'Standard', desc: '3–5 business days', price: '$12.00' },
                  { id: 'express', label: 'Express', desc: '1–2 business days', price: '$28.00' },
                ].map(opt => {
                  const isSelected = shippingMethod === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setShippingMethod(opt.id as 'standard' | 'express')}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
                        border: isSelected ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                        background: isSelected ? 'var(--accent-soft)' : 'var(--surface-2)',
                        transition: 'border-color .15s, background .15s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                          border: isSelected ? '5px solid var(--accent)' : '2px solid var(--border)',
                          background: isSelected ? 'var(--accent-fg)' : 'var(--surface)',
                          transition: 'border .15s',
                        }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{opt.label}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{opt.desc}</div>
                        </div>
                      </div>
                      <span style={{ ...mono, fontSize: 14, fontWeight: 700, color: isSelected ? 'var(--accent)' : 'var(--text)' }}>
                        {opt.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Payment */}
            <div style={sectionStyle}>
              <div style={sectionHeaderStyle}>
                <div style={iconCircle}><CreditCard size={16} /></div>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Payment</span>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 16px', lineHeight: 1.6 }}>
                  You'll be securely redirected to Stripe to complete your payment. Your card details are never stored on our servers.
                </p>
                {/* Stripe block */}
                <div style={{
                  border: '1.5px dashed #635bff', borderRadius: 12, padding: '20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: 'rgba(99,91,255,.04)',
                }}>
                  <div style={{
                    width: 48, height: 32, borderRadius: 6,
                    background: '#635bff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '.02em' }}>stripe</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                      Secure payment processing
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                      PCI-DSS compliant · SSL encrypted
                    </div>
                  </div>
                  <Lock size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order summary */}
          <div style={{ width: 380, flexShrink: 0, position: 'sticky', top: 24 }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 18 }}>
                Order summary
              </div>

              {/* Mini items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
                {MINI_ITEMS.map(item => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 8, flexShrink: 0,
                      background: item.gradient, boxShadow: '0 2px 8px rgba(0,0,0,.15)',
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>
                        {item.variant} · Qty {item.qty}
                      </div>
                    </div>
                    <span style={{ ...mono, fontSize: 13, fontWeight: 600, color: 'var(--text)', flexShrink: 0 }}>
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', margin: '16px 0' }} />

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Subtotal</span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>$236.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Discount</span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--success)' }}>−$24.80</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Shipping</span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>$12.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-2)' }}>Tax (VAT)</span>
                  <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>$24.00</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', margin: '16px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Total</span>
                <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>$247.20</span>
              </div>

              {/* Pay button */}
              <button
                onClick={() => go('success')}
                style={{
                  width: '100%', background: '#635bff', color: '#fff',
                  border: 'none', borderRadius: 10, padding: '13px 0',
                  fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, boxSizing: 'border-box',
                  transition: 'opacity .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <Lock size={14} /> Pay with Stripe →
              </button>

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 5, marginTop: 12, fontSize: 12, color: 'var(--text-3)',
              }}>
                <Lock size={11} />
                256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
