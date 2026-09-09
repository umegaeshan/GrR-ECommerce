import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
// Stripe key එක හරහා Stripe සම්බන්ධ කිරීම
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;

        // Cart එකේ ඇති භාණ්ඩ Stripe වලට තේරෙන ආකෘතියට සකස් කිරීම
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: 'lkr',
                product_data: { 
                    name: item.name 
                },
                // Stripe මුදල ගණනය කරන්නේ ශත (cents) වලින් නිසා 100 න් ගුණ කරයි
                unit_amount: item.price * 100, 
            },
            quantity: item.qty,
        }));

        // Stripe Checkout පිටුවක් නිර්මාණය කිරීම
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success', // ගෙවීම සාර්ථක වූ පසු යන පිටුව
            cancel_url: 'http://localhost:5173/cart',     // ගෙවීම අවලංගු කළහොත් එන පිටුව
        });

        // සෑදූ Checkout ලින්ක් එක Frontend එකට යැවීම
        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};