import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userInfo));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>My Account</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Sidebar */}
        <div className="ag-card" style={{ padding: '2rem' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--accent-teal)', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            {user.name.charAt(0)}
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{user.name}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Member since 2026</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button style={{ textAlign: 'left', padding: '0.75rem 1rem', background: 'var(--bg-color)', border: 'none', borderRadius: '10px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>Recent Orders</button>
            <button style={{ textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '10px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}>Account Settings</button>
            <button 
              onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }}
              style={{ textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', borderRadius: '10px', fontWeight: 600, color: '#ff4d4f', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="ag-card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Recent Orders</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Order */}
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>#ORD-10492</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Aug 21, 2026</td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>$599.99</td>
                <td style={{ padding: '1rem' }}><span style={{ background: '#e6f4ea', color: '#1e8e3e', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>Delivered</span></td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', fontWeight: 500 }}>#ORD-10384</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Aug 15, 2026</td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>$1,299.99</td>
                <td style={{ padding: '1rem' }}><span style={{ background: '#e6f4ea', color: '#1e8e3e', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>Delivered</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
