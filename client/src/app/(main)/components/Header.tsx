"use client"
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'
import { IoCall } from 'react-icons/io5'
import { MdVerified } from 'react-icons/md'
import { FaTruck } from 'react-icons/fa'
import logo from "@/assets/header-logosr.png"
import { BsCart4 } from 'react-icons/bs'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchCart } from '@/redux/slices/cartSlice'
import { fetchUser } from '@/redux/slices/userSlices'
import { DisplayPriceInAud } from '@/utils/DisplayPriceInAud'
import CartMenu from './CartMenu'
import Search from './Search'
import Link from 'next/link'
import UserMenu from './UI/UserMenu'

const NAV_LINKS = [
    { label: 'Shop', href: '/products' },
    { label: 'NDIS Support', href: '/ndis-support' },
    { label: 'Brands', href: '/brands' },
    { label: 'Care Guides', href: '/blog' },
    { label: 'Contact', href: '/contact-us' },
]

const Header = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { cart, status } = useSelector((state: RootState) => state.cartSlice)
    const user = useSelector((state: RootState) => state.userSlice)
    const router = useRouter()

    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [openCartMenu, setOpenCartMenu] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [topbarVisible, setTopbarVisible] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            setTopbarVisible(currentY <= 10 || currentY < lastScrollY.current)
            lastScrollY.current = currentY
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (status === 'idle') dispatch(fetchCart())
    }, [status, dispatch])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        setAccessToken(token)
    }, [])

    useEffect(() => {
        if (accessToken && user.status === 'idle') {
            dispatch(fetchUser())
        }
    }, [accessToken, user.status, dispatch])

    const subtotal = cart?.items?.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    ) ?? 0

    const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0

    return (
        <div className="sticky top-0 z-50 shadow-sm">
            {/* Top bar */}
            <div
                className={`bg-[#0d1b2e] text-white transition-all duration-300 overflow-hidden ${
                    topbarVisible ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="container mx-auto flex items-center justify-between px-4 h-9 text-sm">
                    <div className="flex items-center gap-2">
                        <FaTruck className="text-blue-200 shrink-0" />
                        <span className="font-medium">Free, discreet shipping Australia-wide on orders over $99</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="tel:1300243253" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
                            <IoCall />
                            <span className="font-semibold">1300 243 253</span>
                        </a>
                        <div className="flex items-center gap-1.5">
                            <MdVerified className="text-blue-200" />
                            <span>Registered NDIS provider</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <div className="bg-white border-b border-gray-100">
                <div className=" mx-auto flex items-center gap-4 px-4 h-16">

                    {/* Logo */}
                    <Link href="/" className="shrink-0 -ml-5 flex items-center">
                        <Image
                            src={logo}
                            alt="Health U Shop"
                            className="h-13 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Nav links */}
                    <nav className="hidden lg:flex items-center -ml-5 gap-1 ">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1a56db] hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Search */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-1">
                        <Search />
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2 ml-auto shrink-0">

                        {/* Free Samples */}
                        <Link
                            href="/free-samples"
                            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700  text-white text-sm font-medium rounded-full transition-colors whitespace-nowrap"
                        >
                            Free Samples
                        </Link>

                        {/* Account */}
                        {user.status === 'succeeded' && accessToken ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {/* <span className="hidden sm:inline">Account</span> */}
                                    {showUserMenu ? <GoTriangleUp size={14} /> : <GoTriangleDown size={14} />}
                                </button>
                                {showUserMenu && (
                                    <div className="absolute top-11 right-0 bg-white shadow-lg w-44 rounded-lg border border-gray-100 z-50">
                                        <UserMenu close={() => setShowUserMenu(false)} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => router.push('/signin')}
                                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {/* <span className="hidden sm:inline">Sign in</span> */}
                            </button>
                        )}

                        {/* Cart */}
                        <button
                            onClick={() => setOpenCartMenu(true)}
                            className="relative flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
                        >
                            <BsCart4 size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                            <span className="hidden sm:inline text-sm font-medium">
                                {cart?.items?.[0] ? DisplayPriceInAud(subtotal) : 'My Cart'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile search */}
                <div className="lg:hidden px-4 pb-3">
                    <Search />
                </div>
            </div>

            {openCartMenu && <CartMenu close={() => setOpenCartMenu(false)} />}
        </div>
    )
}

export default Header