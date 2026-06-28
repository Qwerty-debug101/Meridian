import { useState } from 'react';
import type { Theme } from '../../types';
import {
  LayoutGrid, BarChart3, Package, Box, Percent, ShoppingBag, Users, FileText, Settings,
  Moon, Sun, Bell, Plus, Search, Hexagon, ChevronsUpDown, TrendingUp, TrendingDown,
  DollarSign, Receipt, ChevronLeft, ChevronRight, MoreHorizontal, Building2,
  Filter, Download, Shield, ShieldCheck, User, UserPlus, AlertTriangle,
  Globe, CreditCard, Mail, Webhook, RotateCcw, Edit3,
} from 'lucide-react';

interface Props {
  theme: Theme;
  toggleTheme: () => void;
}

type AdminScreen = 'dash' | 'products' | 'orders' | 'customers' | 'inventory' | 'coupons' | 'reports' | 'settings' | 'logs';

// ─── Shared primitives ──────────────────────────────────────────────────────

function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 9px', borderRadius: 99,
      fontSize: 11.5, fontWeight: 600,
      background: bg, color,
      whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

const MONO: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

interface NavItem {
  id: AdminScreen;
  label: string;
  Icon: React.ElementType;
  badge?: string;
}

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [
      { id: 'dash', label: 'Dashboard', Icon: LayoutGrid },
      { id: 'reports', label: 'Reports', Icon: BarChart3 },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { id: 'products', label: 'Products', Icon: Package },
      { id: 'inventory', label: 'Inventory', Icon: Box },
      { id: 'coupons', label: 'Coupons', Icon: Percent },
    ],
  },
  {
    label: 'Sales',
    items: [
      { id: 'orders', label: 'Orders', Icon: ShoppingBag, badge: '12' },
      { id: 'customers', label: 'Customers', Icon: Users },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'logs', label: 'Activity Logs', Icon: FileText },
      { id: 'settings', label: 'Settings', Icon: Settings },
    ],
  },
];

function Sidebar({ screen, setScreen }: { screen: AdminScreen; setScreen: (s: AdminScreen) => void }) {
  return (
    <aside style={{
      width: 240, minWidth: 240,
      background: 'var(--nav-bg)',
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid rgba(255,255,255,.06)',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '20px 16px 16px',
        borderBottom: '1px solid rgba(255,255,255,.06)',
      }}>
        <div style={{ position: 'relative', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Hexagon size={32} color="var(--accent)" fill="var(--accent)" strokeWidth={1.5} />
          <span style={{ position: 'absolute', fontSize: 11, fontWeight: 800, color: 'var(--accent-fg)' }}>M</span>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '.04em', lineHeight: 1.1 }}>MERIDIAN</div>
          <div style={{ fontSize: 11, color: 'var(--nav-text)', letterSpacing: '.02em' }}>Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, paddingBottom: 8 }}>
        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label}>
            {si > 0 && <div style={{ height: 1, background: 'rgba(255,255,255,.05)', margin: '4px 0' }} />}
            <div style={{
              fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em',
              textTransform: 'uppercase', color: 'var(--nav-text)',
              padding: '16px 16px 6px',
            }}>{section.label}</div>
            {section.items.map(({ id, label, Icon, badge }) => {
              const active = screen === id;
              return (
                <button
                  key={id}
                  onClick={() => setScreen(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    width: 'calc(100% - 8px)', margin: '1px 4px',
                    padding: '8px 12px',
                    background: active ? 'var(--nav-active)' : 'transparent',
                    color: active ? '#fff' : 'var(--nav-text)',
                    border: 'none', borderRadius: 8,
                    cursor: 'pointer', fontSize: 13.5, fontWeight: active ? 600 : 400,
                    textAlign: 'left',
                    transition: 'background .12s, color .12s',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.05)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,.75)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--nav-text)';
                    }
                  }}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {badge && (
                    <span style={{
                      background: 'var(--danger)', color: '#fff',
                      fontSize: 10.5, fontWeight: 700, padding: '1px 6px', borderRadius: 99,
                    }}>{badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User area */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,.06)',
        padding: '12px 12px',
        display: 'flex', alignItems: 'center', gap: 9,
        cursor: 'pointer',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--accent)', color: 'var(--accent-fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>JD</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Jordan Diaz</div>
          <div style={{ fontSize: 11, color: 'var(--nav-text)', lineHeight: 1.3 }}>Super Admin</div>
        </div>
        <ChevronsUpDown size={14} color="var(--nav-text)" />
      </div>
    </aside>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

const PAGE_TITLES: Record<AdminScreen, string> = {
  dash: 'Dashboard',
  products: 'Products',
  orders: 'Orders',
  customers: 'Customers',
  inventory: 'Inventory',
  coupons: 'Coupons',
  reports: 'Reports',
  settings: 'Settings',
  logs: 'Activity Logs',
};

function Header({ screen, theme, toggleTheme }: { screen: AdminScreen; theme: Theme; toggleTheme: () => void }) {
  return (
    <header style={{
      height: 60, minHeight: 60,
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '0 24px',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 10,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--text)', flex: '0 0 auto' }}>
        {PAGE_TITLES[screen]}
      </h1>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '0 12px', maxWidth: 340, width: '100%',
        }}>
          <Search size={14} color="var(--text-3)" />
          <input
            placeholder="Search products, orders, customers…"
            style={{
              border: 'none', background: 'transparent',
              fontSize: 13, color: 'var(--text)', outline: 'none',
              padding: '8px 0', width: '100%',
              fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '0 0 auto' }}>
        <button
          onClick={toggleTheme}
          style={{
            width: 34, height: 34, borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-2)',
          }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button style={{
          position: 'relative', width: 34, height: 34, borderRadius: 8,
          border: '1px solid var(--border)', background: 'var(--surface-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-2)',
        }}>
          <Bell size={15} />
          <span style={{
            position: 'absolute', top: 7, right: 7,
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--danger)',
            border: '1.5px solid var(--surface)',
          }} />
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 14px', height: 34, borderRadius: 8,
          background: 'var(--accent)', color: 'var(--accent-fg)',
          border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 600,
          fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
        }}>
          <Plus size={14} />
          Add product
        </button>
      </div>
    </header>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label, value, delta, deltaLabel, trend, Icon,
}: {
  label: string; value: string; delta: string; deltaLabel: string;
  trend: 'up' | 'down'; Icon: React.ElementType;
}) {
  const isUp = trend === 'up';
  const color = isUp ? 'var(--success)' : 'var(--danger)';
  const bg = isUp ? 'var(--success-soft)' : 'var(--danger-soft)';
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '18px 20px',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{label}</span>
        <span style={{
          width: 34, height: 34, borderRadius: 8,
          background: 'var(--accent-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent)',
        }}>
          <Icon size={16} />
        </span>
      </div>
      <div style={{ ...MONO, fontSize: 26, fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 3,
          background: bg, color, borderRadius: 99,
          fontSize: 11.5, fontWeight: 700, padding: '2px 7px',
        }}>
          <TrendIcon size={11} />
          {delta}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{deltaLabel}</span>
      </div>
    </div>
  );
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────

const BAR_HEIGHTS = [38, 52, 44, 61, 55, 70, 48, 65, 72, 60, 80, 68, 75, 90];
const BAR_LABELS = ['Jun 14', '', '', '', '', '', 'Jun 21', '', '', '', '', '', 'Jun 28', ''];

const RECENT_ORDERS = [
  { id: '#10041', customer: 'Elise Moreau', initials: 'EM', color: '#6b73ff', date: 'Jun 27', status: 'Fulfilled', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', pay: 'Paid', payBg: 'var(--success-soft)', payColor: 'var(--success)', total: '$284.00' },
  { id: '#10040', customer: 'Marcus Chen', initials: 'MC', color: '#1f9d63', date: 'Jun 27', status: 'Unfulfilled', statusBg: 'var(--warning-soft)', statusColor: 'var(--warning)', pay: 'Paid', payBg: 'var(--success-soft)', payColor: 'var(--success)', total: '$129.00' },
  { id: '#10039', customer: 'Sofia Rossi', initials: 'SR', color: '#e0683a', date: 'Jun 26', status: 'Fulfilled', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', pay: 'Paid', payBg: 'var(--success-soft)', payColor: 'var(--success)', total: '$59.00' },
  { id: '#10038', customer: 'James Park', initials: 'JP', color: '#c98a1a', date: 'Jun 26', status: 'Cancelled', statusBg: 'var(--danger-soft)', statusColor: 'var(--danger)', pay: 'Refunded', payBg: 'var(--danger-soft)', payColor: 'var(--danger)', total: '$199.00' },
  { id: '#10037', customer: 'Anna Schmidt', initials: 'AS', color: '#d6453d', date: 'Jun 25', status: 'Fulfilled', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', pay: 'Paid', payBg: 'var(--success-soft)', payColor: 'var(--success)', total: '$207.00' },
];

const LOW_STOCK = [
  { name: 'Aria Headphones', left: 4, color: 'var(--danger)', bg: 'var(--danger-soft)' },
  { name: 'Lumen Desk Lamp', left: 7, color: 'var(--warning)', bg: 'var(--warning-soft)' },
  { name: 'Nomad Wallet', left: 9, color: 'var(--warning)', bg: 'var(--warning-soft)' },
  { name: 'Vertex Sunglasses', left: 3, color: 'var(--danger)', bg: 'var(--danger-soft)' },
];

function DashScreen() {
  const [timePeriod, setTimePeriod] = useState<'30D' | '90D' | '1Y'>('30D');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KpiCard label="Revenue" value="$48,290" delta="+12.4%" deltaLabel="vs last period" trend="up" Icon={DollarSign} />
        <KpiCard label="Orders" value="1,284" delta="+8.1%" deltaLabel="vs last period" trend="up" Icon={ShoppingBag} />
        <KpiCard label="Customers" value="892" delta="+5.7%" deltaLabel="vs last period" trend="up" Icon={Users} />
        <KpiCard label="Avg Order" value="$112.40" delta="−2.3%" deltaLabel="vs last period" trend="down" Icon={Receipt} />
      </div>

      {/* Chart + Inventory */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16 }}>
        {/* Revenue chart */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '20px 24px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Revenue</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Jun 14 – Jun 28</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['30D', '90D', '1Y'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setTimePeriod(p)}
                  style={{
                    padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                    border: 'none', cursor: 'pointer',
                    background: timePeriod === p ? 'var(--accent)' : 'var(--surface-2)',
                    color: timePeriod === p ? 'var(--accent-fg)' : 'var(--text-3)',
                    fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
                  }}
                >{p}</button>
              ))}
            </div>
          </div>
          {/* Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {BAR_HEIGHTS.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%', height: `${h}%`,
                  background: i === BAR_HEIGHTS.length - 1
                    ? 'var(--accent)'
                    : 'var(--accent-soft)',
                  borderRadius: '4px 4px 2px 2px',
                  border: i === BAR_HEIGHTS.length - 1 ? 'none' : '1px solid var(--border)',
                  minHeight: 4,
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            {BAR_LABELS.map((l, i) => (
              <div key={i} style={{ flex: 1, fontSize: 10, color: 'var(--text-3)', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Inventory alerts */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '20px 20px', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Inventory Alerts</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>Items running low</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LOW_STOCK.map(item => (
              <div key={item.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 8,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: 3,
                  background: item.color, flexShrink: 0,
                }} />
                <span style={{ flex: 1, fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{item.name}</span>
                <span style={{
                  ...MONO, fontSize: 12, fontWeight: 700,
                  background: item.bg, color: item.color,
                  padding: '2px 8px', borderRadius: 99,
                }}>{item.left} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Recent Orders</div>
          <span style={{ fontSize: 12, color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}>View all</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Order', 'Customer', 'Date', 'Status', 'Payment', 'Total'].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)',
                    letterSpacing: '.04em', textTransform: 'uppercase',
                    borderBottom: '1px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o, i) => (
                <tr key={o.id} style={{ borderBottom: i < RECENT_ORDERS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{o.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: o.color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10.5, fontWeight: 700, flexShrink: 0,
                      }}>{o.initials}</div>
                      <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{o.customer}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-2)' }}>{o.date}</td>
                  <td style={{ padding: '12px 16px' }}><Badge label={o.status} bg={o.statusBg} color={o.statusColor} /></td>
                  <td style={{ padding: '12px 16px' }}><Badge label={o.pay} bg={o.payBg} color={o.payColor} /></td>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Products Screen ──────────────────────────────────────────────────────────

const PRODUCTS = [
  { name: 'Aria Headphones', cat: 'Audio', sku: 'AH-001', status: 'Active', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', stock: 4, stockColor: 'var(--danger)', price: '$129.00', swatch: 'linear-gradient(135deg,#6b73ff,#3a2a6b)' },
  { name: 'Terra Ceramic Mug', cat: 'Home & Living', sku: 'TC-002', status: 'Active', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', stock: 212, stockColor: 'var(--success)', price: '$24.00', swatch: 'linear-gradient(135deg,#1f9d63,#0e5e3a)' },
  { name: 'Nomad Leather Wallet', cat: 'Accessories', sku: 'NW-003', status: 'Active', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', stock: 9, stockColor: 'var(--warning)', price: '$59.00', swatch: 'linear-gradient(135deg,#e0683a,#a8431f)' },
  { name: 'Lumen Desk Lamp', cat: 'Home & Living', sku: 'LD-004', status: 'Active', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', stock: 7, stockColor: 'var(--warning)', price: '$89.00', swatch: 'linear-gradient(135deg,#3a3a47,#16161d)' },
  { name: 'Pulse Smart Watch', cat: 'Electronics', sku: 'PW-005', status: 'Draft', statusBg: 'var(--surface-3)', statusColor: 'var(--text-3)', stock: null, stockColor: 'var(--text-3)', price: '$199.00', swatch: 'linear-gradient(135deg,#c98a1a,#7a520d)' },
  { name: 'Field Backpack', cat: 'Bags', sku: 'FB-006', status: 'Active', statusBg: 'var(--success-soft)', statusColor: 'var(--success)', stock: 34, stockColor: 'var(--success)', price: '$118.00', swatch: 'linear-gradient(135deg,#5b9bd5,#2d5fa1)' },
  { name: 'Echo Speaker', cat: 'Audio', sku: 'ES-007', status: 'Out of stock', statusBg: 'var(--danger-soft)', statusColor: 'var(--danger)', stock: 0, stockColor: 'var(--danger)', price: '$79.00', swatch: 'linear-gradient(135deg,#d6453d,#8a221c)' },
];

function ProductsScreen() {
  const [tab, setTab] = useState<'All' | 'Active' | 'Draft' | 'Out of stock'>('All');
  const tabs = ['All', 'Active', 'Draft', 'Out of stock'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Tabs + actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 2, background: 'var(--surface-2)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '6px 14px', borderRadius: 7, fontSize: 13, fontWeight: tab === t ? 600 : 400,
                border: 'none', cursor: 'pointer',
                background: tab === t ? 'var(--surface)' : 'transparent',
                color: tab === t ? 'var(--text)' : 'var(--text-3)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
                fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
                transition: 'background .12s, color .12s',
              }}
            >{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', height: 34,
            borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)',
            color: 'var(--text-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          }}><Filter size={13} /> Filter</button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', height: 34,
            borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)',
            color: 'var(--text-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
          }}><Download size={13} /> Export</button>
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                <th style={{ width: 40, padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
                  <input type="checkbox" style={{ cursor: 'pointer' }} />
                </th>
                {['Product', 'SKU', 'Status', 'Inventory', 'Price', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)',
                    letterSpacing: '.04em', textTransform: 'uppercase',
                    borderBottom: '1px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <tr key={p.sku} style={{ borderBottom: i < PRODUCTS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 8,
                        background: p.swatch, flexShrink: 0,
                      }} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{p.cat}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 12.5, color: 'var(--text-3)' }}>{p.sku}</td>
                  <td style={{ padding: '12px 16px' }}><Badge label={p.status} bg={p.statusBg} color={p.statusColor} /></td>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, color: p.stockColor, fontWeight: 600 }}>
                    {p.stock === null ? '—' : p.stock === 0 ? 'Out of stock' : `${p.stock} in stock`}
                  </td>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.price}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button style={{
                      width: 28, height: 28, borderRadius: 6,
                      border: '1px solid var(--border)', background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: 'var(--text-3)',
                    }}>
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px', borderTop: '1px solid var(--border)',
          background: 'var(--surface-2)',
        }}>
          <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Showing 1–7 of 48</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['prev', '1', '2', '3', '...', '7', 'next'] as const).map((item, i) => (
              <button key={i} style={{
                minWidth: 28, height: 28, borderRadius: 6,
                border: '1px solid var(--border)', background: item === '1' ? 'var(--accent)' : 'var(--surface)',
                color: item === '1' ? 'var(--accent-fg)' : 'var(--text-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '0 6px',
                fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
              }}>
                {item === 'prev' ? <ChevronLeft size={14} /> : item === 'next' ? <ChevronRight size={14} /> : item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Orders Screen ────────────────────────────────────────────────────────────

const ALL_ORDERS = [
  { id: '#10041', customer: 'Elise Moreau', initials: 'EM', color: '#6b73ff', date: 'Jun 27, 2026', items: 3, fulfill: 'Fulfilled', fBg: 'var(--success-soft)', fColor: 'var(--success)', pay: 'Paid', pBg: 'var(--success-soft)', pColor: 'var(--success)', total: '$284.00' },
  { id: '#10040', customer: 'Marcus Chen', initials: 'MC', color: '#1f9d63', date: 'Jun 27, 2026', items: 1, fulfill: 'Unfulfilled', fBg: 'var(--warning-soft)', fColor: 'var(--warning)', pay: 'Paid', pBg: 'var(--success-soft)', pColor: 'var(--success)', total: '$129.00' },
  { id: '#10039', customer: 'Sofia Rossi', initials: 'SR', color: '#e0683a', date: 'Jun 26, 2026', items: 2, fulfill: 'Fulfilled', fBg: 'var(--success-soft)', fColor: 'var(--success)', pay: 'Paid', pBg: 'var(--success-soft)', pColor: 'var(--success)', total: '$59.00' },
  { id: '#10038', customer: 'James Park', initials: 'JP', color: '#c98a1a', date: 'Jun 26, 2026', items: 1, fulfill: 'Cancelled', fBg: 'var(--danger-soft)', fColor: 'var(--danger)', pay: 'Refunded', pBg: 'var(--danger-soft)', pColor: 'var(--danger)', total: '$199.00' },
  { id: '#10037', customer: 'Anna Schmidt', initials: 'AS', color: '#d6453d', date: 'Jun 25, 2026', items: 4, fulfill: 'Fulfilled', fBg: 'var(--success-soft)', fColor: 'var(--success)', pay: 'Paid', pBg: 'var(--success-soft)', pColor: 'var(--success)', total: '$207.00' },
  { id: '#10036', customer: "Liam O'Brien", initials: 'LO', color: '#3a3a47', date: 'Jun 25, 2026', items: 2, fulfill: 'Unfulfilled', fBg: 'var(--warning-soft)', fColor: 'var(--warning)', pay: 'Paid', pBg: 'var(--success-soft)', pColor: 'var(--success)', total: '$178.00' },
  { id: '#10035', customer: 'Elise Moreau', initials: 'EM', color: '#6b73ff', date: 'Jun 24, 2026', items: 1, fulfill: 'Fulfilled', fBg: 'var(--success-soft)', fColor: 'var(--success)', pay: 'Paid', pBg: 'var(--success-soft)', pColor: 'var(--success)', total: '$89.00' },
  { id: '#10034', customer: 'Marcus Chen', initials: 'MC', color: '#1f9d63', date: 'Jun 24, 2026', items: 2, fulfill: 'Cancelled', fBg: 'var(--danger-soft)', fColor: 'var(--danger)', pay: 'Refunded', pBg: 'var(--danger-soft)', pColor: 'var(--danger)', total: '$148.00' },
];

function OrdersScreen() {
  const [tab, setTab] = useState('All');
  const tabs = ['All', 'Unfulfilled', 'Paid', 'Refunded', 'Cancelled'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total orders', value: '1,284', color: 'var(--text)', bg: 'var(--accent-soft)', iconColor: 'var(--accent)', Icon: ShoppingBag },
          { label: 'Awaiting fulfillment', value: '42', color: 'var(--warning)', bg: 'var(--warning-soft)', iconColor: 'var(--warning)', Icon: Package },
          { label: 'Refund requests', value: '6', color: 'var(--danger)', bg: 'var(--danger-soft)', iconColor: 'var(--danger)', Icon: RotateCcw },
          { label: 'Revenue (MTD)', value: '$48,290', color: 'var(--text)', bg: 'var(--success-soft)', iconColor: 'var(--success)', Icon: DollarSign },
        ].map(c => (
          <div key={c.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '18px 20px', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{c.label}</span>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.iconColor }}>
                <c.Icon size={15} />
              </span>
            </div>
            <div style={{ ...MONO, fontSize: 24, fontWeight: 700, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '8px 16px 12px', fontSize: 13, fontWeight: tab === t ? 600 : 400,
                  border: 'none', cursor: 'pointer', background: 'transparent',
                  color: tab === t ? 'var(--accent)' : 'var(--text-3)',
                  borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
                  fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
                  transition: 'color .12s',
                }}
              >{t}</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Order', 'Customer', 'Date', 'Items', 'Fulfillment', 'Payment', 'Total'].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)',
                    letterSpacing: '.04em', textTransform: 'uppercase',
                    borderBottom: '1px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_ORDERS.map((o, i) => (
                <tr key={o.id} style={{ borderBottom: i < ALL_ORDERS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{o.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: o.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, flexShrink: 0 }}>{o.initials}</div>
                      <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{o.customer}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-2)' }}>{o.date}</td>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, color: 'var(--text-2)' }}>{o.items}</td>
                  <td style={{ padding: '12px 16px' }}><Badge label={o.fulfill} bg={o.fBg} color={o.fColor} /></td>
                  <td style={{ padding: '12px 16px' }}><Badge label={o.pay} bg={o.pBg} color={o.pColor} /></td>
                  <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Customers Screen ─────────────────────────────────────────────────────────

const CUSTOMERS = [
  { name: 'Elise Moreau', email: 'elise.m@example.com', initials: 'EM', color: '#6b73ff', location: 'Paris, FR', orders: 14, ltv: '$1,840', joined: 'Jan 12, 2025', status: 'VIP', sBg: 'var(--accent-soft)', sColor: 'var(--accent)' },
  { name: 'Marcus Chen', email: 'marcus.c@example.com', initials: 'MC', color: '#1f9d63', location: 'Singapore', orders: 8, ltv: '$960', joined: 'Mar 4, 2025', status: 'Returning', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
  { name: 'Sofia Rossi', email: 'sofia.r@example.com', initials: 'SR', color: '#e0683a', location: 'Milan, IT', orders: 5, ltv: '$612', joined: 'Apr 18, 2025', status: 'Returning', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
  { name: 'James Park', email: 'james.p@example.com', initials: 'JP', color: '#c98a1a', location: 'Seoul, KR', orders: 2, ltv: '$248', joined: 'May 29, 2025', status: 'New', sBg: 'var(--surface-3)', sColor: 'var(--text-2)' },
  { name: 'Anna Schmidt', email: 'anna.s@example.com', initials: 'AS', color: '#d6453d', location: 'Berlin, DE', orders: 11, ltv: '$1,420', joined: 'Feb 7, 2025', status: 'VIP', sBg: 'var(--accent-soft)', sColor: 'var(--accent)' },
  { name: "Liam O'Brien", email: 'liam.ob@example.com', initials: 'LO', color: '#3a3a47', location: 'Dublin, IE', orders: 3, ltv: '$356', joined: 'Jun 1, 2025', status: 'Returning', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
];

function CustomersScreen() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ background: 'var(--surface-2)' }}>
              {['Customer', 'Location', 'Orders', 'Lifetime Value', 'Joined', 'Status'].map(h => (
                <th key={h} style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)',
                  letterSpacing: '.04em', textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c, i) => (
              <tr key={c.email} style={{ borderBottom: i < CUSTOMERS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: c.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{c.initials}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-2)' }}>{c.location}</td>
                <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums' }}>{c.orders}</td>
                <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, fontWeight: 700, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{c.ltv}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-2)' }}>{c.joined}</td>
                <td style={{ padding: '12px 16px' }}><Badge label={c.status} bg={c.sBg} color={c.sColor} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Inventory Screen ─────────────────────────────────────────────────────────

const STOCK_ROWS = [
  { name: 'Aria Headphones', sku: 'AH-001', onHand: 4, reserved: 2, status: 'Low', sBg: 'var(--danger-soft)', sColor: 'var(--danger)' },
  { name: 'Terra Ceramic Mug', sku: 'TC-002', onHand: 212, reserved: 14, status: 'Healthy', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
  { name: 'Nomad Leather Wallet', sku: 'NW-003', onHand: 9, reserved: 3, status: 'Low', sBg: 'var(--warning-soft)', sColor: 'var(--warning)' },
  { name: 'Lumen Desk Lamp', sku: 'LD-004', onHand: 7, reserved: 1, status: 'Low', sBg: 'var(--warning-soft)', sColor: 'var(--warning)' },
  { name: 'Field Backpack', sku: 'FB-006', onHand: 34, reserved: 5, status: 'Healthy', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
  { name: 'Echo Speaker', sku: 'ES-007', onHand: 0, reserved: 0, status: 'Out', sBg: 'var(--danger-soft)', sColor: 'var(--danger)' },
];

const SUPPLIERS = [
  { name: 'AudioCraft Supplies', po: 'PO-2291 · 40 units', poDate: 'Due Jul 5', status: 'In transit', sBg: 'var(--accent-soft)', sColor: 'var(--accent)' },
  { name: 'HomeGoods Direct', po: 'PO-2288 · 200 units', poDate: 'Due Jul 2', status: 'Confirmed', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
  { name: 'Nomadic Goods Co.', po: 'PO-2285 · 50 units', poDate: 'Due Jun 30', status: 'Pending', sBg: 'var(--warning-soft)', sColor: 'var(--warning)' },
  { name: 'TechLight Manufacturing', po: 'PO-2280 · 30 units', poDate: 'Due Jul 8', status: 'Confirmed', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
];

function InventoryScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'SKUs tracked', value: '248', color: 'var(--text)', bg: 'var(--accent-soft)', iconColor: 'var(--accent)', Icon: Box },
          { label: 'Low stock', value: '12', color: 'var(--warning)', bg: 'var(--warning-soft)', iconColor: 'var(--warning)', Icon: AlertTriangle },
          { label: 'Out of stock', value: '3', color: 'var(--danger)', bg: 'var(--danger-soft)', iconColor: 'var(--danger)', Icon: Package },
          { label: 'Inventory value', value: '$82,400', color: 'var(--text)', bg: 'var(--success-soft)', iconColor: 'var(--success)', Icon: DollarSign },
        ].map(c => (
          <div key={c.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '18px 20px', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{c.label}</span>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.iconColor }}>
                <c.Icon size={15} />
              </span>
            </div>
            <div style={{ ...MONO, fontSize: 24, fontWeight: 700, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* 2-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        {/* Stock table */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Stock Levels</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  {['Product / SKU', 'On Hand', 'Reserved', 'Status'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '.04em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STOCK_ROWS.map((r, i) => (
                  <tr key={r.sku} style={{ borderBottom: i < STOCK_ROWS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{r.name}</div>
                      <div style={{ ...MONO, fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{r.sku}</div>
                    </td>
                    <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{r.onHand}</td>
                    <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums' }}>{r.reserved}</td>
                    <td style={{ padding: '12px 16px' }}><Badge label={r.status} bg={r.sBg} color={r.sColor} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suppliers */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Suppliers & POs</div>
          </div>
          <div style={{ padding: '12px' }}>
            {SUPPLIERS.map((s, i) => (
              <div key={s.name}>
                {i > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px', borderRadius: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', flexShrink: 0 }}>
                    <Building2 size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.name}</div>
                    <div style={{ ...MONO, fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{s.po}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{s.poDate}</div>
                  </div>
                  <Badge label={s.status} bg={s.sBg} color={s.sColor} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Coupons Screen ───────────────────────────────────────────────────────────

const COUPONS = [
  { code: 'WELCOME10', type: '% off', value: '10%', used: '412 / ∞', expires: 'Dec 31, 2026', status: 'Active', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
  { code: 'FREESHIP', type: 'Free shipping', value: '$0', used: '1,204 / 2,000', expires: 'Jun 30, 2026', status: 'Active', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
  { code: 'SUMMER25', type: '% off', value: '25%', used: '89 / 500', expires: 'Aug 31, 2026', status: 'Scheduled', sBg: 'var(--accent-soft)', sColor: 'var(--accent)' },
  { code: 'VIP50', type: '$ off', value: '$50', used: '34 / 100', expires: 'Mar 1, 2026', status: 'Expired', sBg: 'var(--danger-soft)', sColor: 'var(--danger)' },
  { code: 'BUNDLE15', type: '% off', value: '15%', used: '201 / ∞', expires: 'No expiry', status: 'Active', sBg: 'var(--success-soft)', sColor: 'var(--success)' },
];

function CouponsScreen() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr style={{ background: 'var(--surface-2)' }}>
              {['Code', 'Type', 'Value', 'Used', 'Expires', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '.04em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COUPONS.map((c, i) => (
              <tr key={c.code} style={{ borderBottom: i < COUPONS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    ...MONO, fontSize: 13, fontWeight: 700,
                    border: '1.5px dashed var(--border-strong)',
                    borderRadius: 6, padding: '3px 10px',
                    color: 'var(--text)', letterSpacing: '.04em',
                  }}>{c.code}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-2)' }}>{c.type}</td>
                <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c.value}</td>
                <td style={{ padding: '12px 16px', ...MONO, fontSize: 13, color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums' }}>{c.used}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-2)' }}>{c.expires}</td>
                <td style={{ padding: '12px 16px' }}><Badge label={c.status} bg={c.sBg} color={c.sColor} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Reports Screen ───────────────────────────────────────────────────────────

const CATEGORIES_DATA = [
  { name: 'Audio', revenue: '$84,200', pct: 78 },
  { name: 'Accessories', revenue: '$52,600', pct: 52 },
  { name: 'Home & Living', revenue: '$38,400', pct: 38 },
  { name: 'Bags', revenue: '$24,100', pct: 24 },
  { name: 'Lighting', revenue: '$15,500', pct: 15 },
];

const TOP_PRODUCTS = [
  { rank: 1, name: 'Aria Headphones', units: 412, revenue: '$53,148', swatch: 'linear-gradient(135deg,#6b73ff,#3a2a6b)' },
  { rank: 2, name: 'Terra Ceramic Mug', units: 889, revenue: '$21,336', swatch: 'linear-gradient(135deg,#1f9d63,#0e5e3a)' },
  { rank: 3, name: 'Field Backpack', units: 178, revenue: '$21,004', swatch: 'linear-gradient(135deg,#5b9bd5,#2d5fa1)' },
  { rank: 4, name: 'Nomad Leather Wallet', units: 334, revenue: '$19,706', swatch: 'linear-gradient(135deg,#e0683a,#a8431f)' },
  { rank: 5, name: 'Lumen Desk Lamp', units: 196, revenue: '$17,444', swatch: 'linear-gradient(135deg,#3a3a47,#16161d)' },
];

function ReportsScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Gross Revenue YTD', value: '$214,800', delta: '+18.2%', sub: 'vs last year', up: true },
          { label: 'Conversion Rate', value: '3.4%', delta: '+0.4 pts', sub: 'vs last year', up: true },
          { label: 'Refund Rate', value: '1.8%', delta: '−0.2 pts', sub: 'vs last year', up: false },
        ].map(c => (
          <div key={c.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500, marginBottom: 8 }}>{c.label}</div>
            <div style={{ ...MONO, fontSize: 26, fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: 10 }}>{c.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{
                display: 'flex', alignItems: 'center', gap: 3,
                background: c.up ? 'var(--success-soft)' : 'var(--danger-soft)',
                color: c.up ? 'var(--success)' : 'var(--danger)',
                borderRadius: 99, fontSize: 11.5, fontWeight: 700, padding: '2px 7px',
              }}>
                {c.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {c.delta}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Sales by category */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 18 }}>Sales by Category</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CATEGORIES_DATA.map(c => (
              <div key={c.name}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{c.name}</span>
                  <span style={{ ...MONO, fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c.revenue}</span>
                </div>
                <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, background: 'var(--accent)', borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{c.pct}% of total</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 18 }}>Top Products</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TOP_PRODUCTS.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ ...MONO, fontSize: 12, color: 'var(--text-3)', width: 14, textAlign: 'right' }}>{p.rank}</span>
                <div style={{ width: 32, height: 32, borderRadius: 7, background: p.swatch, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.name}</div>
                  <div style={{ ...MONO, fontSize: 11.5, color: 'var(--text-3)' }}>{p.units} units</div>
                </div>
                <span style={{ ...MONO, fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{p.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────

function SettingsScreen() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* Roles & Permissions */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Roles & Permissions</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Manage who has access to what</div>
        </div>
        <div style={{ padding: '8px 12px' }}>
          {[
            { label: 'Super Admin', desc: '2 users', Icon: ShieldCheck, iconBg: 'var(--accent-soft)', iconColor: 'var(--accent)' },
            { label: 'Admin', desc: '5 users', Icon: Shield, iconBg: 'var(--success-soft)', iconColor: 'var(--success)' },
            { label: 'Staff', desc: '9 users', Icon: User, iconBg: 'var(--surface-3)', iconColor: 'var(--text-2)' },
          ].map((r, i) => (
            <div key={r.label}>
              {i > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '2px 0' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: r.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.iconColor, flexShrink: 0 }}>
                  <r.Icon size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{r.desc}</div>
                </div>
                <button style={{ fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: "'Schibsted Grotesk', system-ui, sans-serif" }}>Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store & Payments */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Store & Payments</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Payment and store configuration</div>
        </div>
        <div style={{ padding: '8px 12px' }}>
          {[
            { label: 'Store currencies', value: 'USD, EUR', Icon: Globe, status: null },
            { label: 'Stripe connection', value: 'Connected', Icon: CreditCard, status: { text: 'Connected', bg: 'var(--success-soft)', color: 'var(--success)' } },
            { label: 'Webhook endpoint', value: 'api.meridian.io/webhook', Icon: Webhook, status: { text: 'Verified', bg: 'var(--success-soft)', color: 'var(--success)' } },
            { label: 'Tax calculation', value: 'Automatic VAT', Icon: Receipt, status: null },
            { label: 'Email notifications', value: 'Enabled', Icon: Mail, status: { text: 'Enabled', bg: 'var(--success-soft)', color: 'var(--success)' } },
          ].map((row, i) => (
            <div key={row.label}>
              {i > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '2px 0' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 8px' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', flexShrink: 0 }}>
                  <row.Icon size={15} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{row.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{row.value}</div>
                </div>
                {row.status && <Badge label={row.status.text} bg={row.status.bg} color={row.status.color} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Activity Logs Screen ─────────────────────────────────────────────────────

const LOG_ENTRIES = [
  {
    actor: 'Jordan Diaz', action: 'updated price on', target: 'Aria Headphones',
    meta: 'price: $149 → $129', time: '2 min ago',
    Icon: Edit3, iconBg: 'var(--accent-soft)', iconColor: 'var(--accent)',
  },
  {
    actor: 'System', action: 'webhook verified for', target: 'api.meridian.io/webhook',
    meta: 'endpoint: /webhook · status 200', time: '18 min ago',
    Icon: Webhook, iconBg: 'var(--success-soft)', iconColor: 'var(--success)',
  },
  {
    actor: 'Priya Nakamura', action: 'issued refund for', target: 'Order #10038',
    meta: 'amount: $199.00 · reason: customer request', time: '1 hr ago',
    Icon: RotateCcw, iconBg: 'var(--warning-soft)', iconColor: 'var(--warning)',
  },
  {
    actor: 'Jordan Diaz', action: 'invited', target: 'Sam Okafor as Staff',
    meta: 'email: s.okafor@meridian.io', time: '3 hr ago',
    Icon: UserPlus, iconBg: 'var(--accent-soft)', iconColor: 'var(--accent)',
  },
  {
    actor: 'System', action: 'flagged low stock for', target: 'Vertex Sunglasses',
    meta: 'on hand: 3 · threshold: 10', time: '5 hr ago',
    Icon: AlertTriangle, iconBg: 'var(--danger-soft)', iconColor: 'var(--danger)',
  },
  {
    actor: 'Marcus Chen', action: 'created coupon', target: 'SUMMER25',
    meta: '25% off · max: 500 uses · Aug 31', time: 'Yesterday',
    Icon: Percent, iconBg: 'var(--accent-soft)', iconColor: 'var(--accent)',
  },
  {
    actor: 'System', action: 'received PO for', target: 'AudioCraft Supplies',
    meta: 'PO-2291 · 40 units · Aria Headphones', time: 'Yesterday',
    Icon: Box, iconBg: 'var(--success-soft)', iconColor: 'var(--success)',
  },
];

function LogsScreen() {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Audit Log</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>All admin actions across the store</div>
      </div>
      <div style={{ padding: '8px 16px' }}>
        {LOG_ENTRIES.map((entry, i) => (
          <div key={i}>
            {i > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '2px 0' }} />}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 4px' }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                background: entry.iconBg, color: entry.iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <entry.Icon size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 600 }}>{entry.actor}</span>
                  {' '}{entry.action}{' '}
                  <span style={{ fontWeight: 700 }}>{entry.target}</span>
                </div>
                <div style={{ ...MONO, fontSize: 11.5, color: 'var(--text-3)', marginTop: 4 }}>{entry.meta}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap', paddingTop: 2 }}>{entry.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export function AdminDashboard({ theme, toggleTheme }: Props) {
  const [screen, setScreen] = useState<AdminScreen>('dash');

  const renderScreen = () => {
    switch (screen) {
      case 'dash': return <DashScreen />;
      case 'products': return <ProductsScreen />;
      case 'orders': return <OrdersScreen />;
      case 'customers': return <CustomersScreen />;
      case 'inventory': return <InventoryScreen />;
      case 'coupons': return <CouponsScreen />;
      case 'reports': return <ReportsScreen />;
      case 'settings': return <SettingsScreen />;
      case 'logs': return <LogsScreen />;
      default: return <DashScreen />;
    }
  };

  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100%', overflow: 'hidden',
      fontFamily: "'Schibsted Grotesk', system-ui, sans-serif",
      background: 'var(--bg)',
    }}>
      <Sidebar screen={screen} setScreen={setScreen} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header screen={screen} theme={theme} toggleTheme={toggleTheme} />
        <main style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          padding: '24px',
        }}>
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
