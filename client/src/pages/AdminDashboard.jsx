import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      const parsed = JSON.parse(userInfo);
      if (!parsed.isAdmin) {
        navigate('/'); // Redirect non-admins
      } else {
        setUser(parsed);
        fetchProducts();
      }
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products for admin', err);
    }
  };

  if (!user) return null;

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Admin Dashboard</h2>
        <button 
          onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }}
          className="btn-primary" style={{ background: '#ff4d4f' }}
        >
          Sign Out
        </button>
      </div>
      
      <div className="ag-card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem' }}>Inventory Management ({products.length} Products)</h3>
          <button className="btn-primary">Add New Product</button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Stock</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{p._id.substring(0,8)}...</td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${p.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ background: p.countInStock > 0 ? '#e6f4ea' : '#fce8e8', color: p.countInStock > 0 ? '#1e8e3e' : '#ff4d4f', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      {p.countInStock}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-teal)', fontWeight: 600, cursor: 'pointer', marginRight: '1rem' }}>Edit</button>
                    <button style={{ background: 'transparent', border: 'none', color: '#ff4d4f', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
