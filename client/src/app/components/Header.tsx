"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoCall } from 'react-icons/io5'
import logo from "@/assets/logo-img.png"
import { IoMdCart } from 'react-icons/io'
import { TiShoppingCart } from 'react-icons/ti'
import { FaSearch } from 'react-icons/fa'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, setLogout } from '@/redux/slices/userSlices'
import { AppDispatch } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { VscSignIn, VscSignOut } from 'react-icons/vsc'
import AxiosToastError from '@/utils/AxiosToastError'
import Axios from '@/utils/Axios'
import { SummeryApi } from '../common/SummeryApi'
import toast from 'react-hot-toast'


const Header = () => {
    const { status } = useSelector((state: any) => state.userSlice);
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [accessToken,setAccessToken] =  useState<string | null>(null)
// Get token from localStorage after mount (client-side only)
    useEffect(()=>{
        if(typeof window !== 'undefined'){
            setAccessToken(localStorage.getItem("accessToken"));
        }
    },[])
    // Fetch user if token exists and status is idle
    useEffect(() => {
        if(accessToken && status === "idle"){
            dispatch(fetchUser())
        }
    }, [accessToken, status, dispatch]);

    const handleSignout = async()=>{
        try {
            const response = await Axios({
                ...SummeryApi.signout,
            });
            dispatch(setLogout());
            localStorage.clear();
            setAccessToken(null);
            toast.success(response?.data?.message);
        } catch (error) {
            AxiosToastError(error);
        }
    };
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
            <div className="flex w-full bg-neutral-200 h-full items-center ">
                {/* logo */}
                <div className="container flex items-center justify-between gap-4 w-full">
                    <div className="flex py-3 w-full">
                        <Image src={logo} className='object-scale-down h-14 ' alt='Health U Shop' />
                    </div>
                    {/* search bar */}
                    <div className="w-full min-w-2xl  flex items-center justify-between group  ">
                        <input type="text" className="outline-none flex border w-full  border-neutral-400 focus-within:border-secondary py-2 px-5 rounded-md text-lg " placeholder='' />
                        {/* <span className="text-neutral-500 w-full flex absolute justify-self-center ml-20 font-medium ">Search Products Like: "T-Shirt"</span> */}
                        <FaSearch className='absolute ml-4 flex group-focus-within:hidden text-2xl text-neutral-400 ' />
                    </div>
                    {/* left side */}
                    <div className="w-full flex gap-3 items-center justify-end  ">
                        {/* login */}
                        {status === "succeeded" && accessToken ? (
                            <div className="relative z-100">
                                <button onClick={handleSignout}
                                    className="text-md font-medium hover:bg-amber-100 cursor-pointer px-3 py-2 rounded hover:text-secondary bg-amber-50 flex items-center gap-2 t text-neutral-800">
                                    <VscSignOut size={24} /> <span className="text-xl font-bold  ">Signout</span>
                                </button>
                                {/* <button onClick={() => setShowUserMenu(!showUserMenu)}
                                className="text-md flex items-center font-medium cursor-pointer hover:bg-neutral-200 px-3 py-2 rounded  text-neutral-800">
                                <p>Account</p>
                                {showUserMenu ? (<GoTriangleUp size={20} />) : (<GoTriangleDown size={20} />)}
                                </button>
                                {showUserMenu &&
                                <div className="absolute top-12 z-100 right-0 bg-white shadow-md w-40 rounded-sm transition-all duration-500">
                                    <UserMenu close={handleCloseUserMenu} />
                                </div>
                                } */}
                            </div>
                        ) : (
                            <button onClick={() => router.push("/signin")}
                                className="text-md font-medium hover:bg-amber-100 cursor-pointer px-3 py-2 rounded hover:text-secondary bg-amber-50 flex items-center gap-2 t text-neutral-800">
                                <VscSignIn size={24} /> <span className="text-xl font-bold ">Signin</span>
                            </button>
                        )
                        }

                        {/* <Link href={"/signin"} className="text-xl font-medium text-neutral-800 z-50 cursor-pointer hover:text-secondary transition-colors duration-300 ">Login</Link> */}
                        <div className="flex gap-1.5 bg-primary items-center justify-between py-2.5 px-2 rounded-md text-white ">
                            <TiShoppingCart size={25} className=' animate-bounce ' />
                            <p className="font-medium  ">My Cart</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header