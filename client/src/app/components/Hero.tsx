import { banner_slides } from '@/config/page'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import {motion} from "motion"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    if (banner_slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banner_slides.length);
    }, 5000);
    return () => { clearInterval(timer) }
  }, [])
   const handleNextBtn = ()=>{
    setCurrentSlide((prevSlide)=> (prevSlide +1) % banner_slides?.length);
  }
  const handlePrevBtn = ()=>{
    setCurrentSlide((prevSlide)=> (prevSlide - 1 + banner_slides?.length) % banner_slides?.length)
  }
  return (
    <div className="min-h-[90vh] group relative">
        {banner_slides?.map((slide: any, index: number) => {

          return (
            <div key={index}>
              <Image src={slide} className={`absolute  transition-opacity duration-1000 top-0 h-full  w-full  left-0  ${index === currentSlide ? "opacity-100" : "opacity-0"}
                object-cover`} alt="" />
              {/* <div
                initial={{
                  opacity: 0,
                  x: 80,
                  y: 0,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    type: "tween",
                    delay: 0.5,
                    duration: 1,
                    ease: [0.25, 0.25, 0.25, 0.75],
                  }
                }}
                viewport={{ once: false, amount: 0.5 }}
                className='top-1/3 absolute md:left-60 '
              >
                <div className={`bg-black/40 flex flex-col gap-2 p-8 transition-opacity duration-1000 text-white max-w-2xl ${index === currentSlide ? "opacity-100" : "opacity-0"}
                    z-30 h-60 rounded   mx-10 w-fit`} >
                  <h2 className="text-white uppercase text-xl font-light">{slide.heading} </h2>
                  <p className=" uppercase text-2xl font-semibold">{slide.title} </p>
                  <p className="">{slide?.description} </p>
                  <div className="flex justify-between mt-5 ">
                    <Link href={"https://gonest.com.au/property/19032026-ryde-2112-sil-sta-mta-respite-hospital-transition-homes-flexible-ndis-housing-ryde-2112"}
                      className='border hover:bg-secondary hover:border-secondary px-3.5 rounded-sm font-semibold py-2'
                    >{slide.cta.primary} </Link>
                    <Link href={"https://gonest.com.au/property/19032026-ryde-2112-sil-sta-mta-respite-hospital-transition-homes-flexible-ndis-housing-ryde-2112"}
                      className='border px-3.5 hover:bg-primary hover:border-primary rounded-sm font-semibold py-2'
                    >{slide.cta.secondary} </Link>
                  </div>
                </div>
              </div> */}
              <button className='bg-black/10 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-500 absolute  top-1/2 left-10 border p-4 z-60 rounded'
                onClick={handlePrevBtn}
              >
                <FaChevronLeft />
              </button>
              <button onClick={handleNextBtn}
                className='bg-black/10 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-500 absolute  top-1/2 right-10 border p-4 z-60 rounded'>
                <FaChevronRight />
              </button>

            </div>
          )
        })}
      </div>
  )
}

export default Hero