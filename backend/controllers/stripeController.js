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
                // Math.round යෙදීම අනිවාර්යයි! (දශම අගයන් ඉවත් කර පූර්ණ සංඛ්‍යා සෑදීමට)
                unit_amount: Math.round(Number(item.price) * 100), 
            },
            quantity: Number(item.qty),
        }));

        // Stripe Checkout පිටුවක් නිර්මාණය කිරීම
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success', 
            cancel_url: 'http://localhost:5173/cart',     
        });

        // සෑදූ Checkout ලින්ක් එක Frontend එකට යැවීම
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Stripe Backend Error:", error); // Terminal එකේ ඇත්ත දෝෂය පෙන්වීමට
        res.status(500).json({ message: error.message });
    }
};