"use client"
import React from 'react';
import logo from "@/assets/header-logo1.png";
import healthu_logo from "@/assets/footer-logo-img.png"
import ndis_logo from "@/assets/ndis-logo-img.png"
import google_review from "@/assets/google-reviews-img.png"
import Image from 'next/image';

import Link from 'next/link';
import { PiMapPinAreaFill } from 'react-icons/pi';
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn } from 'react-icons/fa';
import { footer_nav_items } from '@/config/page';


const Footer = () => {
    return (
        <footer className='w-full h-max flex flex-col items-center justify-center bg-black pt-16 gap-10  '>
            <div className="container w-full flex flex-col md:flex-row items-start justify-center   gap-y-10  ">
                <div className=" flex w-full max-w-1/5 items-center justify-start -ml-10 gap-10 flex-wrap  h-full">
                    <Image src={logo} alt='Health U Australia' className='  max-w-68 max-h-56 h-full  w-full justify-self-start items-center-safe   ' />
                    {/* <Image src={ndis_logo} alt='Health U Australia ' className='  max-w-52 max-h-40 h-full p-0 m-0 w-full  flex  ' /> */}
                    {/* <Image src={google_review} alt='Health U Australia' className='  max-w-52 max-h-40 h-full p-0 m-0 w-full  flex  ' /> */}
                </div>
                <ul className="flex flex-wrap w-full items-start justify-between px-8 max-w-3/5 gap-5 text-white">
                    {footer_nav_items.slice(0,3).map((item:any, index:number) => (
                            <li key={index} className='text-xl grid gap-5  '>
                                <div className='tracking-widest uppercase' > {item?.label} </div>
                                {item.options.map((itm:any,idx:number)=>(
                                    <Link className='hover:text-primary font-medium  transition-colors duration-300 text-lg ' key={idx} href={itm?.path}>{itm?.label} </Link>
                                ))}
                            </li>
                    ))}
                </ul>

                <ul className='flex flex-col gap-10 items-start justify-start text-white ' >
                    <li className="text-xl pt-0.5 tracking-widest uppercase">Get in touch</li>
                    <li className="  flex gap-5 hover:text-[#E1306C] transition-colors duration-300">
                        <Link className='flex gap-3 items-center' href={"https://www.instagram.com/healthu_au/"}>
                        <FaInstagramSquare className=" border-2 p-1.5 rounded-full " size={40} />
                        <span className="text-semibold text-xl">Instagram </span>
                         </Link>
                    </li>
                    <li className="  flex gap-5 hover:text-[#1877F2] transition-colors duration-300">
                        <Link className='flex gap-3 items-center' href={"https://www.facebook.com/healthuau/"}>
                        <FaFacebookF className=" border-2 p-1.5 rounded-full " size={40} />
                        <span className="text-semibold text-xl">Facebook </span>
                         </Link>
                    </li>
                    <li className="  flex gap-5 hover:text-[#0A66C2] transition-colors duration-300">
                        <Link className='flex gap-3 items-center' href={"https://www.linkedin.com/company/health-u-australia/"}>
                        <FaLinkedinIn className=" border-2 p-1.5 rounded-full " size={40} />
                        <span className="text-semibold text-xl">Linkedin </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="container my-20">
                <div className="flex flex-col md:flex-row gap-10 ">
                    <Image src={healthu_logo} alt='Health U Australia' className='object-scale-down' />
                    <p className="text-white text-sm">
                        Aidble Care, a brand of Health U Australia - a global, leading hygiene and health company. Everyday, our products, solutions and services are used by a billion people around the world.
                        Our purpose is to break barriers to well-being for the benefit of consumers, patients, caregivers, customers and society.
                        Sales are conducted in approximately 150 countries under the leading global brands AIDBLE CARE and Tork, and other strong brands such as Actimove,
                        Cutimed, JOBST, Knix, Leukoplast, Libero, Libresse, Lotus, Modibodi, Nosotras, Saba, Tempo, TOM Organic and Zewa. In 2023,
                        Health U Australia had net sales of approximately SEK 147bn (EUR 13bn) and employed 36,000 people.
                        The company's headquarters is located in Stockholm, Sweden and Health U Australia is listed on Nasdaq Stockholm. More information at <a href="https://healthuau.com.au/">healthuau.com.au</a> .
                    </p>
                </div>
            </div>
            {/* copyright section */}
            <div className="flex w-full flex-col items-center py-10 px-0 mx-0 gap-8 justify-center">
                <div className='w-full h-0.5 bg-white' />
                <p className="text-white text-lg font-medium">Copyright &copy; {new Date().getFullYear()} AIDBLE CARE
                    {/* Design by <Link className='font-bold px-2 hover:text-primary' href={"https://amirhamza.onrender.com"}>Amir Hamza</Link> */}
                    </p>
            </div>
        </footer>
    )
}

export default Footer