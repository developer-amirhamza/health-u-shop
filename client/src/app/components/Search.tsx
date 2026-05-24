"use client"
import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';


const Search = () => {
    // const navigate = useNavigate();
    // const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false);
    // const isMobile = useMobile();
    const router = useRouter()
    const params = useParams();
    const searchText = params?.search?.slice(7);
    const pathname = usePathname()

    const handleOnChange = (e:any)=>{
        const value = e.target.value;
        const url = `/search?query=${value}`
        router.push(url)
    }
    useEffect(() => {
        const isSearch = pathname === "/search"
        setIsSearchPage(isSearch)
    }, [pathname])
    return (
        <div onClick={() => router.push("/search")} className='flex w-full border gap-2 group lg:min-w-105 bg-slate-100 focus-within:bg-amber-50 h-11 items-center
         min-w-75 rounded-md border-neutral-300  focus-within:border-primary'>

            {/* {isSearchPage && isMobile ?
                (
                    <Link href={'/'}
                    onClick={(e)=> e.stopPropagation()}
                    className=' p-2 rounded-full m-1 shadow-md text-neutral-500 bg-white group-focus-within:text-primary'>
                        <FaArrowLeft size={22} />
                    </Link>
                ) : (
                    <button className=' p-3 text-neutral-500 group-focus-within:text-primary'>
                        <FaSearch size={22} />
                    </button>
                )
            } */}

            <button className=' p-3 text-neutral-500 group-focus-within:text-primary'>
                        <FaSearch size={22} />
            </button>



            {!isSearchPage ? (
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Search "Pad"',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Search "Underwear"',
                        1000,
                        'Search "MoliCare"',
                        1000,
                        'Search "Body Wipes"',
                        1000,
                        'Search "Sleepy Nights"',
                        1000,
                        'Search "PediaSure Powder"',
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: "15px", display: 'inline-block' }}
                    repeat={Infinity}
                    className="text-neutral-500 uppercase "
                />
            ) : (
                <input type="text"
                    defaultValue={searchText}
                    onChange={handleOnChange}
                    className='w-full h-full bg-transparent outline-none placeholder-gray-400 '
                    placeholder="Search like egg, sugar and more.. " />

            )}
        </div>
    )
}

export default Search