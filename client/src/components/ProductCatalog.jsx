import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setToastMessage(`Added ${product.name} to cart!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  let filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
    
  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        // Store all products
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}><h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Loading inventory...</h2></div>;
  if (error) return <div className="container" style={{ textAlign: 'center', padding: '10rem 0', color: '#ff4d4f' }}><h2>{error}</h2></div>;

  return (
    <div>
      {/* Hero Section */}
      <section className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
            Engineering the Future of Technology.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            AeroLogic Dynamics delivers high-end FPV drones, logic analyzers, and premium tech components directly to professionals and enthusiasts.
          </p>
          <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={() => {
              const shopSection = document.getElementById('shop');
              if(shopSection) shopSection.scrollIntoView({ behavior: 'smooth' });
            }}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured 3x2 Grid */}
      <section className="container" id="shop" style={{ padding: '2rem 2rem 6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{showAll ? 'All Products' : 'Featured Products'}</h3>
          <span onClick={() => setShowAll(!showAll)} style={{ color: 'var(--accent-teal)', fontWeight: 600, cursor: 'pointer' }}>{showAll ? 'View Less ↑' : 'View All →'}</span>
        </div>

        {/* Category Filters and Sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', flexGrow: 1 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-color)',
                  background: selectedCategory === cat ? 'var(--accent-teal)' : 'transparent',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  fontWeight: 600
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-color)',
              background: 'var(--surface-color)',
              color: 'var(--text-primary)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="">Sort By: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
          {(showAll ? filteredProducts : filteredProducts.slice(0, 6)).map((product) => (
            <div key={product._id} className="ag-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {product.countInStock === 0 && (
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#ff4d4f', zIndex: 1, borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-header)' }}>
                  Sold Out
                </div>
              )}
              
              <div style={{ padding: '2.5rem 2.5rem 1rem', background: 'linear-gradient(to bottom, #ffffff, #fafafa)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                   onMouseOver={(e) => { const btn = e.currentTarget.querySelector('.quick-view-btn'); if(btn) btn.style.opacity = '1'; }}
                   onMouseOut={(e) => { const btn = e.currentTarget.querySelector('.quick-view-btn'); if(btn) btn.style.opacity = '0'; }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.1))' }} />
                <button
                  className="quick-view-btn"
                  onClick={() => setQuickViewProduct(product)}
                  style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'rgba(255,255,255,0.9)', color: 'var(--text-primary)', border: 'none',
                    padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-pill)', fontWeight: 600,
                    cursor: 'pointer', opacity: 0, transition: 'opacity 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                >
                  Quick View
                </button>
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--surface-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '0.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(product.rating || 0) ? "#FFD700" : "#e0e0e0"} xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>({product.numReviews || 0})</span>
                </div>
                <h4 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: 'var(--text-primary)', fontWeight: 700 }}>{product.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary"
                    disabled={product.countInStock === 0}
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          background: 'var(--accent-teal)', color: '#fff',
          padding: '1rem 2rem', borderRadius: 'var(--radius-pill)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 1000,
          animation: 'slideUp 0.3s ease-out'
        }}>
          {toastMessage}
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}
      {/* Quick View Modal */}
      {quickViewProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex',
          justifyContent: 'center', alignItems: 'center', padding: '1rem',
          backdropFilter: 'blur(4px)'
        }} onClick={() => setQuickViewProduct(null)}>
          <div style={{
            background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-card)',
            maxWidth: '800px', width: '100%', display: 'flex', gap: '2rem', position: 'relative',
            maxHeight: '90vh', overflowY: 'auto'
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setQuickViewProduct(null)} style={{
              position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
              border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-primary)'
            }}>×</button>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', borderRadius: '1rem', padding: '2rem' }}>
              <img src={quickViewProduct.image} alt={quickViewProduct.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>{quickViewProduct.name}</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-teal)', marginBottom: '1rem' }}>${quickViewProduct.price.toFixed(2)}</p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>{quickViewProduct.description}</p>
              <button
                onClick={() => { handleAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                className="btn-primary"
                disabled={quickViewProduct.countInStock === 0}
                style={{ width: '100%', padding: '1rem' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductCatalog;
