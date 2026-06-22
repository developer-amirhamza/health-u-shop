

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { RiShoppingBasketLine } from 'react-icons/ri'


interface Type{
    label:string,
    icon:any,
    path:any,
}
const InfoGraphicCard:React.FC<Type> = ({label,icon, path}) => {
    const Icon= icon;
  return (
    <Link href={path} className='flex flex-col items-center scale-100 hover:scale-95 transition-all duration-300 justify-center shadow-2xl rounded text-text  bg-primary gap-2 px-3 py-2'>
        <Image src={Icon} alt={label} className='h-20 w-20 object-scale-down' />
        <span className="text-xl font-semibold text-text ">{label} </span>
    </Link >
  )
}

export default InfoGraphicCard


