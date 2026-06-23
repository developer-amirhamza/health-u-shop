"use client";
import React, { useEffect, useState } from 'react';
import Axios from '@/utils/Axios';
import { SummeryApi } from '@/app/common/SummeryApi';
import AxiosToastError from '@/utils/AxiosToastError';
import ProductCard from './ProductCard';
import CardLoader from './CardLoader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const CategoryWiseProductDisplay: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { categories } = useSelector((state: RootState) => state.categorySlice);

    const fetchProducts = async (categoryId: string | null = null) => {
        try {
            setLoading(true);
            const response = categoryId
                ? await Axios({ ...SummeryApi.getProductByCategory, data: { id: categoryId } })
                : await Axios({ ...SummeryApi.fetchProducts });
            setProducts(response.data?.success ? response.data.data : []);
        } catch (error) {
            AxiosToastError(error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(null); }, []);

    const handleCategoryClick = (categoryId: string | null) => {
        setActiveCategoryId(categoryId);
        fetchProducts(categoryId);
    };

    const visible = products.slice(0, 4);

    return (
        <section className="bg-[#e8ddd4] py-16">
            <div className="container flex flex-col items-center  mx-auto px-6">
                {categories.length > 0 && (
                    <div className="flex justify-center items-center flex-wrap gap-1 rounded-full  bg-background max-w-fit w-full mb-10">
                        <button onClick={() => handleCategoryClick(null)}
                            className={`px-5 py-3 m-1 rounded-full text-sm font-semibold duration-700 transition-all ${activeCategoryId === null ? 'bg-secondary text-background shadow-sm' : 'text-secondary hover:text-secondary-hover  '}`}>
                            All
                        </button>
                        {categories.map((cat) => (
                            <button key={cat.id} onClick={() => handleCategoryClick(cat.id)}
                                className={`px-5 py-3 m-1 rounded-full text-sm font-semibold duration-700 transition-all ${activeCategoryId === cat.id ? 'bg-secondary text-background shadow-sm' : 'text-secondary hover:text-secondary-hover  '}`}>
                                {cat.title}
                            </button>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading
                        ? Array(4).fill(null).map((_, i) => <CardLoader key={i} />)
                        : visible.length === 0
                        ? <p className="col-span-4 text-center text-gray-400 py-10">No products found</p>
                        : visible.map((product) => <ProductCard key={product.id} data={product} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default CategoryWiseProductDisplay;