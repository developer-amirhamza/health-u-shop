"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaPhoneAlt } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { BsCheckCircleFill } from 'react-icons/bs'
import banner from '@/assets/banners/image.png'

const Hero = () => {
    return (
        <section className="bg-background w-full overflow-hidden">
            <div className="container mx-auto px-6 py-14 flex flex-col lg:flex-row items-center gap-10">

                {/* ── Left: Text content ── */}
                <div className="flex-1 flex flex-col gap-6 max-w-xl">

                    {/* NDIS badge */}
                    <div className="inline-flex items-center gap-2 bg-primary border border-blue-100 rounded-full px-4 py-1.5 w-fit shadow-sm">
                        <MdVerified className="text-green-500" size={16} />
                        <span className="text-xs font-semibold text-text">Australian NDIS Registered Provider</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-text leading-tight">
                        Dignified continence care,{' '}
                        <span className="text-secondary">delivered with compassion.</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-gray-500 text-base leading-relaxed">
                        Premium incontinence products and home care essentials, sourced for
                        Australian families and NDIS participants. Discreet shipping, clinical-grade
                        quality and human support — every step of the way.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/products"
                            className="flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-background font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                        >
                            Shop products →
                        </Link>
                        <Link
                            href="/contact-us"
                            className="flex items-center gap-2 border border-primary-hover hover:border-secondary hover:text-secondary-hover text-text font-semibold px-6 py-3 rounded-full transition-colors text-sm bg-primary"
                        >
                            <FaPhoneAlt size={13} />
                            Talk to NDIS Support
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-8 pt-2">
                        <div>
                            <p className="text-2xl font-extrabold text-gray-900">12k+</p>
                            <p className="text-xs text-gray-500 mt-0.5">Australian households</p>
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-gray-900 flex items-center gap-1">
                                4.9 <FaStar className="text-amber-400 text-lg" />
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">Avg. customer rating</p>
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-gray-900">100%</p>
                            <p className="text-xs text-gray-500 mt-0.5">Discreet packaging</p>
                        </div>
                    </div>
                </div>

                {/* ── Right: Image + floating cards ── */}
                <div className="flex-1 relative flex items-center justify-center min-h-95 w-full max-w-lg">

                    {/* Hero image */}
                    <div className="relative w-full h-100 rounded-3xl overflow-hidden shadow-xl">
                        <Image
                            src={banner}
                            alt="Carer with patient"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Floating review card — top right */}
                    <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-lg px-4 py-3 flex flex-col gap-1 min-w-45 border border-gray-100">
                        <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => <FaStar key={i} className="text-amber-400 text-xs" />)}
                        </div>
                        <p className="text-xs font-semibold text-gray-800">"Aidble made care easy."</p>
                        <p className="text-[10px] text-gray-400">— Verified carer review</p>
                    </div>

                    {/* Floating NDIS card — bottom left */}
                    <div className="absolute bottom-6 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100 min-w-52.5">
                        <BsCheckCircleFill className="text-green-500 shrink-0" size={22} />
                        <div>
                            <p className="text-xs font-bold text-gray-800">NDIS plan approved</p>
                            <p className="text-[10px] text-gray-400">Invoiced directly to your plan</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero










// import { banner_slides } from '@/config/page'
// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// // import {motion} from "motion"

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   useEffect(() => {
//     if (banner_slides.length === 0) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % banner_slides.length);
//     }, 5000);
//     return () => { clearInterval(timer) }
//   }, [])
//    const handleNextBtn = ()=>{
//     setCurrentSlide((prevSlide)=> (prevSlide +1) % banner_slides?.length);
//   }
//   const handlePrevBtn = ()=>{
//     setCurrentSlide((prevSlide)=> (prevSlide - 1 + banner_slides?.length) % banner_slides?.length)
//   }
//   return (
//     <div className="min-h-[90vh] group relative">
//         {banner_slides?.map((slide: any, index: number) => {

//           return (
//             <div key={index}>
//               <Image src={slide} className={`absolute  transition-opacity duration-1000 top-0 h-full  w-full  left-0  ${index === currentSlide ? "opacity-100" : "opacity-0"}
//                 object-cover`} alt="" />
//               {/* <div
//                 initial={{
//                   opacity: 0,
//                   x: 80,
//                   y: 0,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   x: 0,
//                   y: 0,
//                   transition: {
//                     type: "tween",
//                     delay: 0.5,
//                     duration: 1,
//                     ease: [0.25, 0.25, 0.25, 0.75],
//                   }
//                 }}
//                 viewport={{ once: false, amount: 0.5 }}
//                 className='top-1/3 absolute md:left-60 '
//               >
//                 <div className={`bg-black/40 flex flex-col gap-2 p-8 transition-opacity duration-1000 text-white max-w-2xl ${index === currentSlide ? "opacity-100" : "opacity-0"}
//                     z-30 h-60 rounded   mx-10 w-fit`} >
//                   <h2 className="text-white uppercase text-xl font-light">{slide.heading} </h2>
//                   <p className=" uppercase text-2xl font-semibold">{slide.title} </p>
//                   <p className="">{slide?.description} </p>
//                   <div className="flex justify-between mt-5 ">
//                     <Link href={"https://gonest.com.au/property/19032026-ryde-2112-sil-sta-mta-respite-hospital-transition-homes-flexible-ndis-housing-ryde-2112"}
//                       className='border hover:bg-secondary hover:border-secondary px-3.5 rounded-sm font-semibold py-2'
//                     >{slide.cta.primary} </Link>
//                     <Link href={"https://gonest.com.au/property/19032026-ryde-2112-sil-sta-mta-respite-hospital-transition-homes-flexible-ndis-housing-ryde-2112"}
//                       className='border px-3.5 hover:bg-primary hover:border-primary rounded-sm font-semibold py-2'
//                     >{slide.cta.secondary} </Link>
//                   </div>
//                 </div>
//               </div> */}
//               <button className='bg-black/10 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-500 absolute  top-1/2 left-10 border p-4 z-60 rounded'
//                 onClick={handlePrevBtn}
//               >
//                 <FaChevronLeft />
//               </button>
//               <button onClick={handleNextBtn}
//                 className='bg-black/10 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-500 absolute  top-1/2 right-10 border p-4 z-60 rounded'>
//                 <FaChevronRight />
//               </button>

//             </div>
//           )
//         })}
//       </div>
//   )
// }

// export default Hero