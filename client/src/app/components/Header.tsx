import Image from 'next/image'
import React from 'react'
import { IoCall } from 'react-icons/io5'
import logo from "@/assets/logo-img.png"

const Header = () => {
  return (
    <div className="">
        {/* top bar */}
        <div className=" w-full max-h-10 bg-primary text-foreground flex justify-center items-center ">
            <div className="container flex items-center justify-end w-full">
                <div className="flex w-2/6"></div>
                <div className="flex justify-between w-full text-white font-medium items-center">
                    <p className="text-lg  text-end"> Looking for something specific? Click here! </p>
                    <div className="flex items-center gap-3 font-medium ">
                        <IoCall  />
                        <a className='font-medium text-lg ' href="tel:+0481707758">0481 707 758</a>
                    </div>
                </div>
            </div>
        </div>
        {/* nav bar */}
        <div className="flex w-full bg-neutral-200 h-full items-center">
            {/* logo */}
            <div className="container flex items-center justify-between ">
                <div className="flex py-3">
                <Image src={logo} className='object-scale-down h-14 ' alt='Health U Shop' />
            </div>
            <div className="">
                <input type="text" className="outline-none border border-secondary py-2.5 px-5 rounded-md text-lg " placeholder='search products' />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Header