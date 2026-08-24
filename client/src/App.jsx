import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ShoppingCart from './components/ShoppingCart';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useCart } from './context/CartContext';

const Success = () => (
  <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '8rem 0' }}>
    <div className="ag-card" style={{ padding: '4rem 3rem', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
      <div style={{ width: '80px', height: '80px', background: '#e0f2f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--accent-teal)', fontSize: '2.5rem' }}>
        ✓
      </div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Order Confirmed</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Your transaction was successful. Thank you for shopping with us.</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block', width: '100%' }}>Return to Shop</Link>
    </div>
  </div>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Parse user info safely
  const getUserInfo = () => {
    try {
      const info = localStorage.getItem('userInfo');
      return info ? JSON.parse(info) : null;
    } catch {
      return null;
    }
  };
  const userInfo = getUserInfo();

  return (
    <Router>
      <div style={{ padding: '1.5rem 0 0 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <header className="glass-header" style={{ margin: '0 auto', maxWidth: '1160px', borderRadius: 'var(--radius-pill)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 2rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
              <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px' }}>AeroLogic Dynamics</h1>
            </Link>
            <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', fontWeight: 500, fontSize: '0.95rem' }}>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-secondary)' }}
                title="Toggle Dark Mode"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <Link to="/" style={{ transition: 'color 0.2s', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--accent-teal)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Shop</Link>
              <Link to="/cart" style={{ position: 'relative', transition: 'color 0.2s', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--accent-teal)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>
                Cart
                {cartItemCount > 0 && (
                  <span style={{ position: 'absolute', top: '-10px', right: '-15px', background: 'var(--accent-teal)', color: '#fff', minWidth: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', borderRadius: '50%', fontWeight: 'bold' }}>
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              {userInfo ? (
                <Link to={userInfo.isAdmin ? "/admin" : "/profile"} style={{ transition: 'color 0.2s', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--accent-teal)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Dashboard</Link>
              ) : (
                <Link to="/login" style={{ transition: 'color 0.2s', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--accent-teal)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>Account</Link>
              )}
            </nav>
          </div>
        </header>
      </div>
      <main style={{ minHeight: 'calc(100vh - 150px)' }}>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
      
      <footer style={{ padding: '4rem 0 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="container">
          <p style={{ fontSize: '0.9rem' }}>© 2026 AeroLogic Dynamics. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
