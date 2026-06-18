"use client"
import React from 'react';
import logo from "@/assets/header-logo1.png";
import healthu_logo from "@/assets/footer-logo-img.png"
import ndis_logo from "@/assets/ndis-logo-img.png"
import google_review from "@/assets/google-reviews-img.png"
import Image from 'next/image';

import Link from 'next/link';
import { PiEnvelopeBold, PiMapPinAreaFill } from 'react-icons/pi';
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn } from 'react-icons/fa';
import { footer_nav_items } from '@/config/page';
import { BiPhone } from 'react-icons/bi';
import { BsShieldCheck } from 'react-icons/bs';


const Footer = () => {
      const cols = [
    { title: "Shop", links: ["Incontinence Pads", "Pull-Up Pants", "Bed & Chair Pads", "Skincare", "Daily Living"] },
    { title: "NDIS", links: ["For Participants", "For Plan Managers", "Support Coordinators", "Bulk Orders", "Compliance"] },
    { title: "Support", links: ["Contact Care Team", "Continence Nurse", "Shipping & Returns", "FAQ", "Track Order"] },
  ];
    return (
        <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr_1.2fr]">
        <div>
           <Image src={logo} alt='Health U Australia' className='  max-w-48 max-h-36 h-full  w-full justify-self-start items-center-safe   ' />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Aidble Care Pty Ltd is a proudly Australian, NDIS-registered supplier of premium incontinence products and continence care services. ABN 12 345 678 901.
          </p>
          <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2.5"><BiPhone className="h-4 w-4 text-primary" /> 1800 243 253</p>
            <p className="flex items-center gap-2.5"><PiEnvelopeBold className="h-4 w-4 text-primary" /> care@aidble.com.au</p>
            <p className="flex items-center gap-2.5"><PiMapPinAreaFill className="h-4 w-4 text-primary" /> Melbourne, VIC · Australia-wide delivery</p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            {[FaFacebookF, FaInstagramSquare, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-ink">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-primary">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <span className="chip"><BsShieldCheck className="h-3.5 w-3.5" /> Trusted & accredited</span>
          <p className="mt-4 text-sm font-semibold text-ink">NDIS Registered Provider #4-A82BC3</p>
          <p className="mt-1 text-xs text-muted-foreground">TGA-compliant products · Continence Foundation of Australia member</p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="rounded-xl border border-border bg-surface px-2 py-3">NDIS</div>
            <div className="rounded-xl border border-border bg-surface px-2 py-3">TGA</div>
            <div className="rounded-xl border border-border bg-surface px-2 py-3">CFA</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Aidble Care Pty Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Accessibility</a>
            <a href="#" className="hover:text-primary">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
        // <footer className='w-full h-max flex flex-col items-center justify-center bg-black pt-16 gap-10  '>
        //     <div className="container w-full flex flex-col md:flex-row items-start justify-center   gap-y-10  ">
        //         <div className=" flex w-full max-w-1/5 items-center justify-start -ml-10 gap-10 flex-wrap  h-full">
        //             <Image src={logo} alt='Health U Australia' className='  max-w-68 max-h-56 h-full  w-full justify-self-start items-center-safe   ' />
        //             {/* <Image src={ndis_logo} alt='Health U Australia ' className='  max-w-52 max-h-40 h-full p-0 m-0 w-full  flex  ' /> */}
        //             {/* <Image src={google_review} alt='Health U Australia' className='  max-w-52 max-h-40 h-full p-0 m-0 w-full  flex  ' /> */}
        //         </div>
        //         <ul className="flex flex-wrap w-full items-start justify-between px-8 max-w-3/5 gap-5 text-white">
        //             {footer_nav_items.slice(0,3).map((item:any, index:number) => (
        //                     <li key={index} className='text-xl grid gap-5  '>
        //                         <div className='tracking-widest uppercase' > {item?.label} </div>
        //                         {item.options.map((itm:any,idx:number)=>(
        //                             <Link className='hover:text-primary font-medium  transition-colors duration-300 text-lg ' key={idx} href={itm?.path}>{itm?.label} </Link>
        //                         ))}
        //                     </li>
        //             ))}
        //         </ul>

        //         <ul className='flex flex-col gap-10 items-start justify-start text-white ' >
        //             <li className="text-xl pt-0.5 tracking-widest uppercase">Get in touch</li>
        //             <li className="  flex gap-5 hover:text-[#E1306C] transition-colors duration-300">
        //                 <Link className='flex gap-3 items-center' href={"https://www.instagram.com/healthu_au/"}>
        //                 <FaInstagramSquare className=" border-2 p-1.5 rounded-full " size={40} />
        //                 <span className="text-semibold text-xl">Instagram </span>
        //                  </Link>
        //             </li>
        //             <li className="  flex gap-5 hover:text-[#1877F2] transition-colors duration-300">
        //                 <Link className='flex gap-3 items-center' href={"https://www.facebook.com/healthuau/"}>
        //                 <FaFacebookF className=" border-2 p-1.5 rounded-full " size={40} />
        //                 <span className="text-semibold text-xl">Facebook </span>
        //                  </Link>
        //             </li>
        //             <li className="  flex gap-5 hover:text-[#0A66C2] transition-colors duration-300">
        //                 <Link className='flex gap-3 items-center' href={"https://www.linkedin.com/company/health-u-australia/"}>
        //                 <FaLinkedinIn className=" border-2 p-1.5 rounded-full " size={40} />
        //                 <span className="text-semibold text-xl">Linkedin </span>
        //                 </Link>
        //             </li>
        //         </ul>
        //     </div>
        //     <div className="container my-20">
        //         <div className="flex flex-col md:flex-row gap-10 ">
        //             <Image src={healthu_logo} alt='Health U Australia' className='object-scale-down' />
        //             <p className="text-white text-sm">
        //                 Aidble Care, a brand of Health U Australia - a global, leading hygiene and health company. Everyday, our products, solutions and services are used by a billion people around the world.
        //                 Our purpose is to break barriers to well-being for the benefit of consumers, patients, caregivers, customers and society.
        //                 Sales are conducted in approximately 150 countries under the leading global brands AIDBLE CARE and Tork, and other strong brands such as Actimove,
        //                 Cutimed, JOBST, Knix, Leukoplast, Libero, Libresse, Lotus, Modibodi, Nosotras, Saba, Tempo, TOM Organic and Zewa. In 2023,
        //                 Health U Australia had net sales of approximately SEK 147bn (EUR 13bn) and employed 36,000 people.
        //                 The company's headquarters is located in Stockholm, Sweden and Health U Australia is listed on Nasdaq Stockholm. More information at <a href="https://healthuau.com.au/">healthuau.com.au</a> .
        //             </p>
        //         </div>
        //     </div>
        //     {/* copyright section */}
        //     <div className="flex w-full flex-col items-center py-10 px-0 mx-0 gap-8 justify-center">
        //         <div className='w-full h-0.5 bg-white' />
        //         <p className="text-white text-lg font-medium">Copyright &copy; {new Date().getFullYear()} AIDBLE CARE
        //             {/* Design by <Link className='font-bold px-2 hover:text-primary' href={"https://amirhamza.onrender.com"}>Amir Hamza</Link> */}
        //             </p>
        //     </div>
        // </footer>
    )
}

export default Footer