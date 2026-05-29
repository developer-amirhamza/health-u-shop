"use client"
import Link from 'next/link';
import React from 'react';
import AddToCartButton from './UI/AddToCartBtn';
import { DisplayPriceInAud } from '@/utils/DisplayPriceInAud';
import { PriceWithDiscount } from '@/utils/PriceWithDiscount';
import { validURLConvert } from '@/utils/validURLConvart';
import { useRouter } from 'next/navigation';


// import { validURLConvert } from '../utils/validURLConvart';
// import { Link } from 'react-router-dom';
// import { priceWithDiscount } from '../utils/priceWithDiscount';


interface Type {
    data:any
}

const ProductCard:React.FC<Type> = ({data}) => {
    const router = useRouter()
    const url = `/product/${validURLConvert(data.title)}_${(data.id)}`

  return (
    <div onClick={()=>{router.push(url);data.id}} className=' border border-blue-200 p-2 grid hover:shadow-lg gap-1 hover:scale-105 duration-300 max-w-56 min-w-42 max-h-88 min-h-80 rounded '>
        <div className="min-h-20 rounded">
        <img src={data.images[0] } alt={data?.title} className='w-full h-full object-scale-down' />
        </div>
        <div className="flex items-center justify-between gap-0.5">
        {/* <div className="bg-orange-200/70  p-0.5 rounded text-orange-900  text-sm">{data?.stock} Left</div> */}
        {data?.discount > 0 && <div className="bg-green-200/70  p-0.5 rounded text-green-900 text-sm"> {data.discount}% Discount</div> }

        </div>
        <div className="text-neutral-800 text-md text-ellipsis line-clamp-2 rounded">{data?.title} </div>
        {/* <div className=" text-neutral-800 text-md text-ellipsis line-clamp-2 rounded  ">Unit: {data?.unit} </div> */}
        <div className="flex items-center justify-between gap-1">
        <div className="p-1 bg-blue-100/80 rounded  ">
         {DisplayPriceInAud(PriceWithDiscount(data?.price, data?.discount ))}
        </div>
        <AddToCartButton data={data}/>
        </div>
    </div>
  )
}

export default ProductCard