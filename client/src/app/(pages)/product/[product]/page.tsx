"use client";   // ← CRITICAL

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Axios from '@/utils/Axios';
import AxiosToastError from '@/utils/AxiosToastError';
import { SummeryApi } from '@/app/common/SummeryApi';

import { DisplayPriceInAud } from '@/utils/DisplayPriceInAud';
import { PriceWithDiscount } from '@/utils/PriceWithDiscount';
import image1 from "@/assets/minute_delivery-Bu9utzxK.png";
import image2 from "@/assets/Best_Prices_Offers-CbMh73zQ.png";
import image3 from "@/assets/Wide_Assortment-CbRiDBkF.png";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import AddToCartButton from '@/app/components/UI/AddToCartBtn';
import Divider from '@/app/components/UI/Divider';

const ProductDetailsPage = () => {
    const params = useParams();
    const productSlug = params.product; // e.g., "organic-apple-123"
    const productId = (Array.isArray(productSlug) ? productSlug[0] : productSlug)?.split("_")?.slice(-1)[0];

    const [data, setData] = useState<any>({
        name: "",
        images: [],
        price: 0,
        discount: 0,
        description: "",
        more_details: {},
        stock: 0,
    });
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.userSlice?.user);
    const reviews = useSelector((state: any) => state.reviewSlice?.reviews);

    // const averageReview = reviews && reviews.length > 0
    //     ? reviews.reduce((sum, item) => sum + item.reviewValue, 0) / reviews.length : 0;

    const fetchProductDetails = async (productId: string) => {

        if (!productId) return;
        try {
            setLoading(true);
            // Assuming fetchProductDetails uses GET with query param
            const response = await Axios({
                ...SummeryApi.fetchProductDetails,
                data: { id: productId }   // ✅ sends ?id=xxx
            });
            if (response.data?.success) {
                setData(response.data?.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };


    // const fetchProductReview = async (id: string) => {
    //     try {
    //         const response = await Axios({
    //             ...SummeryApi.getProductReview,
    //             params: { productId: id },
    //         });
    //         if (response.data?.success) {
    //             dispatch(setReviewSlice(response.data?.data));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleAddReview = async () => {
    //     if (!user) {
    //         toast.error("Please login to write a review");
    //         return;
    //     }
    //     try {
    //         const response = await Axios({
    //             ...SummeryApi.addProductReview,
    //             data: {
    //                 userId: user._id,
    //                 userName: user.name,
    //                 productId: productId,
    //                 reviewMessage: reviewMessage,
    //                 reviewValue: rating,
    //             },
    //         });
    //         if (response.data.success) {
    //             setRating(0);
    //             setReviewMessage("");
    //             dispatch(fetchProductReview(productId));
    //             toast.success(response.data?.message);
    //         }
    //     } catch (error) {
    //         AxiosToastError(error);
    //     }
    // };

    useEffect(() => {
        console.log("it's product details page")
        if (productId) {
            fetchProductDetails(productId);
            // fetchProductReview(productId);
        }
    }, [productId]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const handleScrollLeft = () => setImage(prev => prev > 0 ? prev - 1 : data.images.length - 1);
    const handleScrollRight = () => setImage(prev => prev < data.images.length - 1 ? prev + 1 : 0);

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>; // Add proper skeleton
    }

    return (
        <section className="container mx-auto p-4 grid lg:grid-cols-2 gap-6 bg-slate-100">
            {/* Left Column - Images */}
            <div>
                <div className="w-full h-56 lg:h-[65vh] bg-white rounded flex items-center justify-center">
                    <img className="h-full object-contain" src={data.images?.[image]} alt={data.name} />
                </div>
                <div className="flex justify-center gap-2 my-2">
                    {data.images?.map((_: any, idx: number) => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${idx === image ? "bg-slate-600" : "bg-slate-300"}`} />
                    ))}
                </div>
                <div className="relative flex items-center">
                    <div className="flex overflow-x-auto gap-2 no-scrollbar my-4">
                        {data.images?.map((img: string, idx: number) => (
                            <div key={idx} onClick={() => setImage(idx)} className={`w-20 h-20 rounded-lg cursor-pointer ${idx === image ? "border-2 border-blue-500" : ""}`}>
                                <img src={img} className="w-full h-full object-cover rounded" alt={data.name} />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleScrollLeft} className="absolute left-0 bg-white p-1 rounded-full shadow"><FaAngleLeft /></button>
                    <button onClick={handleScrollRight} className="absolute right-0 bg-white p-1 rounded-full shadow"><FaAngleRight /></button>
                </div>
                {/* Description & details (same as before) */}
            </div>

            {/* Right Column - Details */}
            <div className=' pt-10 px-5'>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                {/* <div className="flex gap-2 items-center mt-2">
                    <StarRating rating={averageReview} />
                    <span className="text-sm text-orange-500">{averageReview?.toFixed(1)}</span>
                </div> */}
                <div className="mt-4 flex items-center justify-star w-full gap-x-12">
                    <p className="text-2xl font-semibold">{DisplayPriceInAud(PriceWithDiscount(data.price, data.discount))}</p>
                    {data.discount > 0 && (
                        <p className="line-through text-neutral-500 text-2xl">{DisplayPriceInAud(data.price)}</p>
                    )}
                </div>
                <div className="mt-4">
                    {data.stock === 0 ? (
                        <p className="text-red-500">Out of Stock</p>
                    ) : (
                        <AddToCartButton data={data} />
                    )}
                </div>
                <Divider />
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p>{data.description}</p>
                </div>
                {/* Reviews section, why shop, etc. */}
            </div>
        </section>
    );
};

export default ProductDetailsPage;