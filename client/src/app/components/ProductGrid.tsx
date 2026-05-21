import { fetchProducts } from '@/redux/slices/productSlice';
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard';

const ProductGrid = () => {
    const {status, products} = useSelector((state:RootState)=>state.productSlice);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{
        if(status === "idle"){
            dispatch(fetchProducts())
        }
    },[status,dispatch])
    console.log("Products", products)
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 container py-10 lg:grid-cols-5 place-items-center">
        {products?.map((product,index)=>(
            <ProductCard data={product} key={index}/>
        ))}
    </div>
  )
}

export default ProductGrid