import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { getCartToken, getOrCreateCart } from './cart.controllers';
import { prisma } from '../lib/prisma';
import { errorHandler } from '../utils/errorHandler';

dotenv.config();


// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia', // Use the latest stable API version
});

interface AuthRequest extends Request {
    userId?: string;
}


export const createCheckoutSession = async (req: AuthRequest, res: Response) => {
    try {
        const { name,successUrl, cancelUrl, email, phone, shippingAddress } = req.body;
        const token: any = getCartToken(req, res);
        const userId = req.userId;

        // Log cart retrieval
        const cart = await getOrCreateCart(token, userId);


        if (!cart || cart.items.length === 0) {
            return errorHandler(res, 400, 'Your cart is empty.');
        }

        const lineItems = cart.items.map((item) => {
            // Get the first image and validate it's a proper URL
            const imageUrl = item.product.images?.[0];
            const isValidImageUrl = imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'));

            return {
                price_data: {
                    currency: 'aud',
                    product_data: {
                        name: item.product.title,
                        ...(isValidImageUrl && { images: [imageUrl] }),
                    },
                    unit_amount: Math.round(item.product.price * 100),
                },
                quantity: item.quantity,
            };
        });
        // Calculate subtotal
        const subtotal = cart.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);


        // Create pending order
        const order = await prisma.order.create({
            data: {
                orderNumber: `ORD-${Date.now()}`,
                userId: userId || undefined,
                email: email || 'pending@example.com',
                phone: phone || '',
                name: name ?? null,
                shippingAddress: shippingAddress || '',
                subtotal: subtotal,
                total: subtotal,
                paymentMethod: 'STRIPE',
                paymentStatus: 'Pending',
                orderStatus: 'Pending',
                items: {
                    create: cart.items.map(item => ({
                        productId: item.product.id,
                        productName: item.product.title,
                        productImage: item.product.images[0] || null,
                        price: item.product.price,
                        quantity: item.quantity,
                        total: item.product.price * item.quantity,
                    })),
                },
            },
        });
        console.log('Order created:', order.id);

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl || `${process.env.CLIENT_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${process.env.CLIENT_URL}/cart`,
            metadata: {
                orderId: order.id,
            },
        });

        // Update order with stripe session id
        await prisma.order.update({
            where: { id: order.id },
            data: { stripeSessionId: session.id },
        });
        await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        console.log('Stripe session created:', session.url);
        res.json({ success: true, url: session.url });
    } catch (error: any) {
        console.error('Full error:', error);
        errorHandler(res, 500, error.message || 'Failed to create checkout session.');
    }
};