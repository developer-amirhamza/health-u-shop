"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoCall } from 'react-icons/io5'
import logo from "@/assets/header-logosr.png"
import { IoMdCart } from 'react-icons/io'
import { TiShoppingCart } from 'react-icons/ti'
import { FaSearch } from 'react-icons/fa'


import { useRouter } from 'next/navigation'
import { VscSignIn, VscSignOut } from 'react-icons/vsc'
import AxiosToastError from '@/utils/AxiosToastError'
import Axios from '@/utils/Axios'
import { SummeryApi } from '../common/SummeryApi'
import toast from 'react-hot-toast'
import { fetchCart } from '@/redux/slices/cartSlice'

import { DisplayPriceInAud } from '@/utils/DisplayPriceInAud'
import { BsCart4 } from 'react-icons/bs'
import { fetchUser, setLogout } from '@/redux/slices/userSlices'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'

import Link from 'next/link'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import Search from '../(main)/components/Search'
import UserMenu from '../(main)/components/UI/UserMenu'
import CartMenu from '../(main)/components/CartMenu'



const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { cart, status, error } = useSelector((state: RootState) => state.cartSlice);
    const user = useSelector((state: RootState) => state.userSlice);
    const router = useRouter()
    const [accessToken, setAccessToken] = useState(null)
    const [openCartMenu, setOpenCartMenu] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false);
    const handleCloseUserMenu = () => {
        setShowUserMenu(false)
    }

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCart())
        }
    }, [status, dispatch])

    const subtotal = cart?.items?.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) ?? 0;
    // Get token from localStorage after mount (client-side only)
    useEffect(() => {
        const token:any = localStorage.getItem("accessToken");
        setAccessToken(token);
    }, [])
    // Fetch user if token exists and status is idle

    useEffect(() => {
        if (user.status)
            if (accessToken && user.status === "idle") {
                dispatch(fetchUser())
            }
    }, [accessToken, user.status, dispatch]);
    // const handleSignout = async () => {
    //     try {
    //         const response = await Axios({
    //             ...SummeryApi.signout,
    //         });
    //         dispatch(setLogout());
    //         localStorage.clear();
    //         toast.success(response?.data?.message);
    //     } catch (error) {
    //         AxiosToastError(error);
    //     }
    // };
    return (
        <div className="">
            {/* top bar */}
            <div className=" w-full max-h-10 bg-secondary text-foreground flex py-1 justify-center items-center ">
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
                    <Link href={"/"} className="flex  w-full justify-start items-start">
                        <Image src={logo} className='object-scale-down h-20 py-1 mr-32 ' alt='Health U Shop' />
                    </Link>
                    {/* search bar */}
                    <div className=" hidden  lg:flex">
                        <Search />
                    </div>
                    {/* left side */}
                    <div className="w-full flex gap-3 items-center justify-end  ">
                        {/* login */}
                        {user.status == "succeeded" && accessToken ? (
                            <div className="relative z-100">
                               

                                <button onClick={() => setShowUserMenu(!showUserMenu)}
                                className="text-md flex items-center font-medium cursor-pointer hover:bg-neutral-200 px-3 py-2 rounded  text-neutral-800">
                                <p>Account</p>
                                {showUserMenu ? (<GoTriangleUp size={20} />) : (<GoTriangleDown size={20} />)}
                                </button>
                                {showUserMenu &&
                                <div className="absolute top-12 z-100 right-0 bg-white shadow-md w-40 rounded-sm transition-all duration-500">
                                    <UserMenu close={handleCloseUserMenu} />
                                </div>
                                }
                            </div>
                        ) : (
                            <button onClick={() => router.push("/signin")}
                                className="text-md font-medium hover:bg-amber-100 cursor-pointer px-3 py-2 rounded hover:text-secondary bg-amber-50 flex items-center gap-2 t text-neutral-800">
                                <VscSignIn size={24} /> <span className="text-xl font-bold ">Signin</span>
                            </button>


                        )
                        }
                        {/* cart */}
                        <div onClick={() => setOpenCartMenu(true)} className=" flex gap-1.5 bg-secondary items-center cursor-pointer justify-between py-2.5 px-2 rounded-md text-white">
                            <div className=" animate-bounce">
                                <BsCart4 size={28} />
                            </div>
                            <div className=" font-bold text-sm ">
                                {cart?.items[0] ? (
                                    <div >
                                        {/* <p>{totalQty} Items</p> */}
                                        <p>{DisplayPriceInAud(subtotal)}</p>
                                    </div>
                                ) : (<p>My Cart</p>)}
                            </div>
                        </div>
                        {openCartMenu && <CartMenu close={() => setOpenCartMenu(false)} />}

                        {/* <Link href={"/signin"} className="text-xl font-medium text-neutral-800 z-50 cursor-pointer hover:text-secondary transition-colors duration-300 ">Login</Link>
                        <div className="flex gap-1.5 bg-primary items-center justify-between py-2.5 px-2 rounded-md text-white ">
                            <TiShoppingCart size={25} className=' animate-bounce ' />
                            <p className="font-medium  ">My Cart</p>
                        </div> */}
                    </div>
                </div>
            </div >

        </div >
    )
}

export default Header