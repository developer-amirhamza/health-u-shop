import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import image from "@/assets/home/sample-order-2b_900x.webp"
import tailored from "@/assets/home/tailored.avif"
import recommendations from "@/assets/home/recommendations.avif"

const page = () => {
  return (
    <div className="grid w-full">
        <div className="flex w-full h-full items-center container justify-start gap-10  not-even:flex-col-reverse sm:flex-row sm:not-even:flex-row-reverse py-12">
                    <div className="flex w-full ">
                        <Image src={image} alt="health u australia" />
                    </div>
                    <div className="grid place-content-start place-items-center gap-5 ">
                        {/* <span className="text-base text-center uppercase tracking-widest">{subtitle}</span> */}
                        <h1 className="text-4xl text-center font-semibold">Use our Product Finder to choose what suits you best </h1>
                        <p className="text-base text-center font-medium">This Product Finder has been designed to identify the most suitable product based on the answers to the questions about your situation.</p>
                        <div className="flex gap-5 items-center justify-center ">
                                    <Link  href='/'
                                        className='uppercase first:bg-primary first:text-white px-3.5 py-1.5 rounded-full  '
                                    >Get stared</Link>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className="">What you’ll get by using this tool</h2>
                    <div className="flex items-center justify-center gap-10">
                        <div className="flex flex-col items-center justify-center max-w-70 my-10 gap-5">
                            <Image src={tailored} alt='tailored' />
                            <span className="text-2xl text-center">
                                Information tailored to your needs
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center max-w-70 my-10 gap-5">
                            <Image src={recommendations} alt='tailored' />
                            <span className="text-2xl text-center">
                                Information tailored to your needs
                            </span>
                        </div>
                    </div>
                </div>
    </div>

  )
}

export default page