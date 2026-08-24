import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
// Use the secret key from environment variables or a fallback for initial testing
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_for_testing');

// @route   POST /api/payment/create-checkout-session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { cartItems } = req.body;

    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
        },
        quantity: item.qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.origin || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:5173'}/cart`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
