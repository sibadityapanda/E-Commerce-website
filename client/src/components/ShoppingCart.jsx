import React from 'react';
import { useCart } from '../context/CartContext';
import CheckoutButton from './CheckoutButton';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();

  return (
    <div className="container" style={{ padding: '3rem 0 6rem' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem', color: 'var(--text-primary)' }}>
        Your Cart
      </h2>
      
      {cartItems.length === 0 ? (
        <div className="ag-card" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--accent-teal)' }}>🛍️</div>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Your cart is empty.</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map((item) => (
              <div key={item._id} className="ag-card cart-item-layout">
                <div style={{ background: 'var(--bg-color)', width: '120px', height: '120px', borderRadius: '15px', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.image?.startsWith('/') ? `${import.meta.env.BASE_URL}${item.image.slice(1)}` : item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.15rem', margin: '0 0 0.5rem', fontWeight: 600 }}>{item.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 1rem' }}>
                    Premium Quality
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-color)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', padding: '0.2rem 1rem' }}>
                      <select
                        value={item.qty}
                        onChange={(e) => addToCart(item, Number(e.target.value))}
                        style={{ padding: '0.4rem 0', border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}
                      >
                        {[...Array(item.countInStock || 10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1} style={{ background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
                            Qty: {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      style={{ background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{ alignSelf: 'start', textAlign: 'right', padding: '0.5rem 0' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="ag-card" style={{ padding: '2.5rem', position: 'sticky', top: '120px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: 700 }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>Free</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', fontSize: '1.35rem', fontWeight: 800 }}>
              <span>Total</span>
              <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
            </div>
            
            <CheckoutButton />
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Secure checkout provided by Stripe
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
