"use client"
import Link from 'next/link';
import React from 'react';
import AddToCartButton from './UI/AddToCartBtn';
import { DisplayPriceInAud } from '@/utils/DisplayPriceInAud';
import { PriceWithDiscount } from '@/utils/PriceWithDiscount';
import { validURLConvert } from '@/utils/validURLConvart';
import { useRouter } from 'next/navigation';
import Image from 'next/image';





interface Type {
    data:any
}

const ProductCard:React.FC<Type> = ({data}) => {
    const router = useRouter()
    const url = `/product/${validURLConvert(data.title)}_${(data.id)}`

  return (
    <div onClick={()=>{router.push(url);data.id}} className='   shadow-xl grid bg-primary  gap-1 hover:scale-105 duration-300 w-full min-w-56 max-h-88 min-h-80 rounded '>
        <div className="min-h-20  rounded">
        <img src={data.images[0] }  alt={data?.title} className='w-full rounded-t h-full flex object-cover ' />
        </div>
        <div className="p-2 flex flex-col justify-between">
        <div className="text-text text-md text-ellipsis line-clamp-2 rounded">{data?.title} </div>
        <div className="flex items-center justify-between gap-1">
        <div className="p-1 bg-background rounded  ">
         {DisplayPriceInAud(PriceWithDiscount(data?.price, data?.discount ))}
        </div>
        <AddToCartButton data={data}/>
        </div>
        </div>
    </div>
  )
}

export default ProductCard