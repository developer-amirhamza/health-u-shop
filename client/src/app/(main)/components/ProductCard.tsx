"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import AddToCartButton from './UI/AddToCartBtn';
import { DisplayPriceInAud } from '@/utils/DisplayPriceInAud';
import { PriceWithDiscount } from '@/utils/PriceWithDiscount';
import { validURLConvert } from '@/utils/validURLConvart';

interface Type {
    data: any
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((i) => {
                if (rating >= i) return <FaStar key={i} className="text-sm" />;
                if (rating >= i - 0.5) return <FaStarHalfAlt key={i} className="text-sm" />;
                return <FaRegStar key={i} className="text-sm" />;
            })}
        </div>
    );
};

const ProductCard: React.FC<Type> = ({ data }) => {
    const router = useRouter();
    const url = `/product/${validURLConvert(data.title)}_${data.id}`;

    const discount = Number(data?.discount ?? 0);
    const finalPrice = PriceWithDiscount(data?.price, discount);
    const hasDiscount = discount > 0;

    const brand: string = data?.brand || data?.category?.title || "";

    const reviews: any[] = Array.isArray(data?.reviews) ? data.reviews : [];
    const reviewCount = data?.reviewCount ?? reviews.length;
    const avgRating =
        data?.averageRating ??
        (reviews.length
            ? reviews.reduce((sum, r) => sum + (Number(r?.rating) || 0), 0) / reviews.length
            : 0);

    const sizes: string[] = Array.isArray(data?.sizes) ? data.sizes : [];

    const highlight: string | null = data?.isFeatured
        ? "Best Seller"
        : data?.badge || null;

    return (
        <div
            onClick={() => router.push(url)}
            className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full"
        >
            {/* Image + badges */}
            <div className="relative bg-gray-100 aspect-square overflow-hidden">
                <img
                    src={data?.images?.[0]}
                    alt={data?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
                    {highlight && (
                        <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow">
                            {highlight}
                        </span>
                    )}
                    {hasDiscount && (
                        <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow">
                            {discount}% OFF
                        </span>
                    )}
                </div>

                <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-semibold shadow">
                        NDIS <span className="text-blue-600">✓</span>
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                {brand && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {brand}
                    </span>
                )}

                <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1">
                    {data?.title}
                </h3>

                {data?.description && (
                    <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                        {data.description}
                    </p>
                )}

                <div className="flex items-center gap-1.5">
                    <RatingStars rating={Number(avgRating) || 0} />
                    {reviewCount > 0 && (
                        <span className="text-xs text-gray-500">({reviewCount})</span>
                    )}
                </div>

                {/* {sizes.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                        {sizes.map((size) => (
                            <span
                                key={size}
                                className="min-w-7 px-2 py-0.5 text-center text-xs font-medium text-gray-600 border border-gray-300 rounded-full"
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                )} */}

                <div className="mt-auto pt-3 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900 leading-none">
                            {DisplayPriceInAud(finalPrice)}
                        </span>
                        {hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">
                                {DisplayPriceInAud(Number(data?.price ?? 0))}
                            </span>
                        )}
                    </div>
                    <AddToCartButton data={data} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;