import Image from 'next/image'
import React from 'react'
import { IoCall } from 'react-icons/io5'
import logo from "@/assets/logo-img.png"
import { IoMdCart } from 'react-icons/io'
import { TiShoppingCart } from 'react-icons/ti'
import { FaSearch } from 'react-icons/fa'

const Header = () => {
    return (
        <div className="">
            {/* top bar */}
            <div className=" w-full max-h-10 bg-primary text-foreground flex py-1 justify-center items-center ">
                <div className="container flex items-center justify-end w-full">
                    <div className="flex w-2/6"></div>
                    <div className="flex justify-between w-full text-white font-medium items-center">
                        <p className="text-lg  text-end"> Looking for something specific? Click here! </p>
                        <div className="flex items-center gap-3 font-medium ">
                            <IoCall />
                            <a className='font-medium text-lg ' href="tel:+0481707758">0481 707 758</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* nav bar */}
            <div className="flex w-full bg-neutral-200 h-full items-center">
                {/* logo */}
                <div className="container flex items-center justify-between w-full">
                    <div className="flex py-3 w-full">
                        <Image src={logo} className='object-scale-down h-14 ' alt='Health U Shop' />
                    </div>
                    {/* search bar */}
                    <div className="w-full min-w-2xl  flex items-center justify-between  ">
                        <input type="text" className="outline-none flex border w-full  border-neutral-400 focus-within:border-secondary py-2.5 px-5 rounded-md text-lg " placeholder='' />
                        <span className="text-neutral-500 w-full flex absolute justify-self-center ml-20 font-medium ">Search Products Like: "T-Shirt"</span>
                        <FaSearch  className='absolute ml-4 text-2xl text-neutral-400 '/>
                    </div>
                    {/* left side */}
                    <div className="w-full flex gap-4 items-center justify-end  ">
                        <span className="text-xl font-medium text-neutral-800 cursor-pointer hover:text-secondary transition-colors duration-300 ">Login</span>
                        <div className="flex gap-2 bg-primary items-center justify-between py-2.5 px-4 rounded-md text-white ">
                            <TiShoppingCart size={28} className=' animate-bounce ' />
                            <p className="font-semibold  ">My Cart</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header