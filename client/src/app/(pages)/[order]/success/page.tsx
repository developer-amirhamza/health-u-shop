"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrderByNumber } from "@/redux/slices/orderSlice";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const dispatch = useDispatch<AppDispatch>();
  const { currentOrder } = useSelector((state: RootState) => state.orderSlice);

  useEffect(() => {
    // For COD, orderId is passed. For Stripe, you might get session_id – adapt accordingly.
    // Here we assume orderId is passed.
    if (orderId) {
      // If you have an endpoint to fetch by orderId, otherwise just show order placed.
      // Simpler: just show success message.
    }
  }, [orderId, dispatch]);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">Order Placed Successfully!</h1>
      <p className="mt-4">Thank you for your purchase. Your order confirmation has been sent to your email.</p>
      <Link href="/products" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded">Continue Shopping</Link>
    </div>
  );
}