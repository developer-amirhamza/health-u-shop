"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {  createCheckoutSession, clearStripeUrl } from "@/redux/slices/orderSlice";
import { fetchCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { cart, status: cartStatus } = useSelector((state: RootState) => state.cartSlice);
  const { status: orderStatus, error, stripeUrl, currentOrder } = useSelector((state: RootState) => state.orderSlice);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    shippingAddress: "",
    paymentMethod: "Stripe",
  });

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(fetchCart());
    }
  }, [cartStatus, dispatch]);

  // Redirect to Stripe if URL received
  useEffect(() => {
    if (stripeUrl) {
      window.location.href = stripeUrl;
      dispatch(clearStripeUrl());
    }
  }, [stripeUrl, dispatch]);

  // After successful COD order, redirect to success page
  useEffect(() => {
    if (orderStatus === "succeeded" && currentOrder && form.paymentMethod === "COD") {
      router.push(`/order/success?orderId=${currentOrder.id}`);
    }
  }, [orderStatus, currentOrder, form.paymentMethod, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.phone || !form.shippingAddress) {
      alert("Please fill all fields");
      return;
    }
    await dispatch(createCheckoutSession(form));
  };

  if (!cart || cart.items.length === 0) {
    return <div className="text-center py-10">Your cart is empty. <a href="/products" className="text-blue-600">Shop now</a></div>;
  }

  const subtotal = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.product.title} x {item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 font-bold flex justify-between">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          placeholder="Shipping Address"
          required
          rows={3}
          value={form.shippingAddress}
          onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={orderStatus === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {orderStatus === "loading" ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}