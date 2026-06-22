"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Axios from '@/utils/Axios';
import { SummeryApi } from '@/app/common/SummeryApi';
import AxiosToastError from '@/utils/AxiosToastError';
import ProductCard from './ProductCard';
import { validURLConvert } from '@/utils/validURLConvart';
import CardLoader from './CardLoader';

interface Subcategory {
    id: string;
    title: string;
    slug: string;
}

interface CategoryWiseProductProps {
    categoryId: string;   // category ID (not slug)
    title: string;        // category name
}

const CategoryWiseProductDisplay: React.FC<CategoryWiseProductProps> = ({ categoryId, title }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingSubs, setLoadingSubs] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    console.log(products, "category products")

    // Build URL for "View All" – direct to category page
    const viewAllUrl = `/category/${validURLConvert(title)}-${categoryId}`;

    // Fetch products by category OR subcategory
    const fetchProducts = async (subcategoryId: string | null = null) => {
        try {
            setLoading(true);
            let response;
            console.log(subcategoryId, "subcategory")
            if (subcategoryId) {
                // Fetch products by subcategory
                response = await Axios({
                    ...SummeryApi.getProductBySubcategory,
                    data: { subcategoryId }
                });
            } else {
                // Fetch products by category
                response = await Axios({
                    ...SummeryApi.getProductByCategory,
                    data: { id: categoryId }
                });
            }
            console.log(response.data, "porduct data")
            if (response.data?.success) {
                setProducts(response.data?.data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            AxiosToastError(error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch subcategories for this category
    const fetchSubcategories = async () => {
        if (!categoryId) return;
        try {
            setLoadingSubs(true);
            const response = await Axios({
                ...SummeryApi.fetchSubcategoriesByCategory,
                data: { categoryId }
            });
            if (response.data?.success) {
                setSubcategories(response.data?.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoadingSubs(false);
        }
    };

    // Initial load: fetch subcategories and products for this category
    useEffect(() => {
        if (categoryId) {
            fetchSubcategories();
            fetchProducts(null);
        }
    }, [categoryId]);

    // Handle subcategory click
    const handleSubcategoryClick = (subId: string | null) => {
        setActiveSubcategoryId(subId);
        fetchProducts(subId);
        // Optional: scroll to top of product list
        if (containerRef.current) containerRef.current.scrollLeft = 0;
    };

    const handleScrollRight = () => {
        if (containerRef.current) containerRef.current.scrollLeft += 200;
    };

    const handleScrollLeft = () => {
        if (containerRef.current) containerRef.current.scrollLeft -= 200;
    };

    const loadingCardNumber = new Array(6).fill(null);

    return (
        <div className="container mx-auto p-4  relative">
            {/* Category Header */}
            <div className="flex items-center justify-between gap-4 mb-2">
                <h1 className="text-xl capitalize text-neutral-800 font-semibold">{title}</h1>
                <Link
                    href={"/search"}
                    className="text-green-700 hover:text-green-800 font-medium bg-neutral-100 px-4 py-2 rounded"
                >
                    View All
                </Link>
            </div>

            {/* Subcategories Tabs (horizontal scroll) */}
            {subcategories.length > 0 && (
                <div className="relative mb-4 ">
                    <div className="flex overflow-x-auto scroll-smooth no-scrollbar gap-2 pb-2">
                        {/* "All" button to show all products in category */}
                        <button
                            onClick={() => handleSubcategoryClick(null)}
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition ${activeSubcategoryId === null
                                    ? 'bg-secondary text-background'
                                    : 'bg-primary text-neutral-700 hover:bg-primary-hover'
                                }`}
                        >
                            All
                        </button>
                        {subcategories.map((sub) => (
                            <button
                                key={sub.id}
                                onClick={() => handleSubcategoryClick(sub.id)}
                                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition ${activeSubcategoryId === sub.id
                                        ? 'bg-secondary text-background'
                                        : 'bg-primary text-neutral-700 hover:bg-primary-hover'
                                    }`}
                            >
                                {sub.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Products Carousel */}
            <div className="relative">
                <div
                    className="flex overflow-x-auto overflow-y-hidden pb-10 scroll-smooth no-scrollbar gap-4"
                    ref={containerRef}
                >
                    {loading ? (
                        loadingCardNumber.map((_, idx) => <CardLoader key={idx} />)
                    ) : products.length === 0 ? (
                        <p className="text-neutral-500 py-8">No products in this {activeSubcategoryId ? 'subcategory' : 'category'}</p>
                    ) : (products.map((product,index) => (
                            <ProductCard key={product.id} data={product} />
                        ))
                    )}
                </div>
                {products.length > 0 && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                        <button
                            onClick={handleScrollLeft}
                            className="pointer-events-auto bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-md transition"
                        >
                            <FaAngleLeft />
                        </button>
                        <button
                            onClick={handleScrollRight}
                            className="pointer-events-auto bg-gray-100 hover:bg-gray-200 p-3 rounded-full shadow-md transition"
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;