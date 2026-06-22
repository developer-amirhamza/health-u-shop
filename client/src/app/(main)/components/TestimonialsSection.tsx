"use client";
import React, { useEffect, useRef, useState } from "react";
import Axios from "@/utils/Axios";
import { SummeryApi } from "@/app/common/SummeryApi";
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

interface Testimonial {
    id: string;
    name: string;
    role?: string;
    location?: string;
    quote: string;
    rating: number;
}

const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((i) =>
            rating >= i
                ? <FaStar key={i} className="text-sm" />
                : <FaRegStar key={i} className="text-sm" />
        )}
    </div>
);

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        Axios({ ...SummeryApi.getTestimonials })
            .then((res) => {
                if (res.data?.success) setTestimonials(res.data.data || []);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (testimonials.length <= 1) return;
        autoRef.current = setInterval(() => {
            setCurrent((c) => (c + 1) % Math.max(testimonials.length - 2, 1));
        }, 5000);
        return () => { if (autoRef.current) clearInterval(autoRef.current); };
    }, [testimonials]);

    const slidesPerView = 3;
    const maxIndex = Math.max(testimonials.length - slidesPerView, 0);

    const prev = () => {
        if (autoRef.current) clearInterval(autoRef.current);
        setCurrent((c) => Math.max(c - 1, 0));
    };
    const next = () => {
        if (autoRef.current) clearInterval(autoRef.current);
        setCurrent((c) => Math.min(c + 1, maxIndex));
    };

    if (loading) return null;
    if (testimonials.length === 0) return null;

    return (
        <section className="bg-[#f0f7ff] py-14 px-4">
            <div className="max-w-6xl mx-auto ">
                <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest text-center mb-1">
                    Loved by Families
                </p>
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-1">
                    Real stories from Australian carers
                </h2>
                <p className="text-gray-500 text-center mb-8">
                    Honest reviews from people who rely on us every day.
                </p>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex gap-5 transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(calc(-${current * (100 / slidesPerView)}% - ${current * (20 / slidesPerView)}px))` }}
                        >
                            {testimonials.map((t) => (
                                <div
                                    key={t.id}
                                    className="min-w-[calc(33.333%-14px)] bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <FaQuoteLeft className="text-blue-200 text-3xl" />
                                    <p className="text-gray-700 text-sm leading-relaxed flex-1">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <RatingStars rating={t.rating} />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                        {(t.role || t.location) && (
                                            <p className="text-xs text-gray-400">
                                                {[t.role, t.location].filter(Boolean).join(", ")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {testimonials.length > slidesPerView && (
                        <>
                            <button
                                onClick={prev}
                                disabled={current === 0}
                                className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-blue-50 disabled:opacity-30 transition"
                            >
                                <FaChevronLeft className="text-sm" />
                            </button>
                            <button
                                onClick={next}
                                disabled={current >= maxIndex}
                                className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-blue-50 disabled:opacity-30 transition"
                            >
                                <FaChevronRight className="text-sm" />
                            </button>
                        </>
                    )}
                </div>

                {testimonials.length > slidesPerView && (
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-blue-600 w-5" : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialsSection;