const handleCheckout = async (req, res, stripe) => {
    const { cartItems } = req.body;
    console.log(cartItems);

    try {
        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(parseFloat(item.price.replace('$', '')) * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ['card', 'paypal'],
            mode: 'payment',
            success_url: 'http://localhost:3001/pages/Success',
            cancel_url: 'http://localhost:3001/pages/cancel',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
};



module.exports = {
    handleCheckout: handleCheckout,
};
