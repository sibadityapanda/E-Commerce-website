import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_placeholder_key_for_testing');

const CheckoutButton = () => {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) console.error('Stripe error:', error);
    } catch (err) {
      console.error('Error during checkout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn-primary"
      onClick={handleCheckout}
      disabled={cartItems.length === 0 || loading}
      style={{
        width: '100%',
        padding: '1rem',
        fontSize: '1.1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      {loading ? (
        <>
          <span style={{ display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
          Processing...
        </>
      ) : (
        'Proceed to Checkout'
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default CheckoutButton;
