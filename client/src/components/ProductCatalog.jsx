import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
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
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
          {(showAll ? filteredProducts : filteredProducts.slice(0, 6)).map((product) => (
            <div key={product._id} className="ag-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {product.countInStock === 0 && (
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#ff4d4f', zIndex: 1, borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-header)' }}>
                  Sold Out
                </div>
              )}
              
              <div style={{ padding: '2.5rem 2.5rem 1rem', background: 'linear-gradient(to bottom, #ffffff, #fafafa)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'contain', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.1))' }} />
              </div>
              
              <div style={{ padding: '1.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--surface-color)' }}>
                <h4 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: 'var(--text-primary)', fontWeight: 700 }}>{product.name}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.description}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => addToCart(product, 1)}
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
    </div>
  );
};

export default ProductCatalog;
