import { Suspense, lazy } from 'react';
import { useAppState } from './store/useStore';
import { StorefrontHeader } from './components/layout/StorefrontHeader';
import { StorefrontFooter } from './components/layout/StorefrontFooter';
import { HomePage } from './pages/storefront/HomePage';
import { PLPPage } from './pages/storefront/PLPPage';
import { PDPPage } from './pages/storefront/PDPPage';
import { CartPage } from './pages/storefront/CartPage';
import { CheckoutPage } from './pages/storefront/CheckoutPage';
import { SuccessPage } from './pages/storefront/SuccessPage';
import { CustomerDashPage } from './pages/storefront/CustomerDashPage';

const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard }))
);

export default function App() {
  const state = useAppState();
  const { theme, toggleTheme, screen, go, qty, incQty, decQty, cartCount, addToCart, cart, updateQty, removeItem } = state;

  // Admin route: /admin in the URL hash
  const isAdmin = window.location.hash === '#admin';

  if (isAdmin) {
    return (
      <div data-theme={theme}>
        <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-2)' }}>Loading…</div>}>
          <AdminDashboard theme={theme} toggleTheme={toggleTheme} />
        </Suspense>
      </div>
    );
  }

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <StorefrontHeader theme={theme} toggleTheme={toggleTheme} cartCount={cartCount} go={go} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {screen === 'home' && <HomePage go={go} />}
        {screen === 'plp' && <PLPPage go={go} />}
        {screen === 'pdp' && <PDPPage go={go} qty={qty} incQty={incQty} decQty={decQty} addToCart={addToCart} />}
        {screen === 'cart' && <CartPage go={go} cart={cart} updateQty={updateQty} removeItem={removeItem} />}
        {screen === 'checkout' && <CheckoutPage go={go} cart={cart} />}
        {screen === 'success' && <SuccessPage go={go} />}
        {screen === 'dash' && <CustomerDashPage go={go} />}
      </main>
      {screen !== 'success' && <StorefrontFooter />}
    </div>
  );
}
