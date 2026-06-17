"use client"
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaCaretDown, } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { adminNavItems } from "@/config/page";
import Link from "next/link";


interface Props {
    activeSidebar: boolean;
}

const AdminSidebar: React.FC<Props> = ({ activeSidebar }) => {
    const { user } = useSelector((state: RootState) => state.userSlice);
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className={` flex flex-col w-full h-full ${!activeSidebar ? "flex" : "max-sm:hidden"} `}>
            <div className="flex  w-full bg-[#362917] py-3 justify-center px-6 gap-x-5">
                <img
                    className="w-20 rounded-full object-cover"
                    src={
                        user?.avatar ||
                        `https://themewagon.github.io/pluto/images/layout_img/user_img.jpg`
                    }
                    alt=""
                />
                <div
                    className={`${activeSidebar ? "flex flex-col justify-center" : "hidden"
                        } `}
                >
                    <h1 className="text-white capitalize font-semibold">
                        {user?.name || "N/A"}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 bg-green-500 rounded-full animate-ping" />
                        <span className="text-green-400 text-sm font-bold">Online</span>
                    </div>
                </div>
            </div>
            <div className="grid w-full  relative  gap-5">
                <div className="bg-white w-full h-1 absolute" />
                <ul className="grid  w-full  font-roboto-slab leading-tight px-0 py-5">
                    {adminNavItems.map((item, index) => {
                        const Icon = item?.icon;
                        return (
                            <li key={index} className="grid w-full hover:bg-blue-900 transition-colors rounded duration-200 px-2 py-3 z-10">
                                {item?.path ? <Link href={`${item?.path}`} onClick={() => handleToggle(index)}
                                    className={`flex items-center gap-3 ${activeSidebar ? "flex-row" : "flex-col"} z-10 w-full cursor-pointer`}
                                >
                                    <Icon className="text-slate-400 text-2xl" />
                                    <h1 className="flex items-center text-white font-medium text-lg  uppercase">{item?.label} </h1>
                                </Link>
                                    :
                                    <div onClick={() => handleToggle(index)}
                                        className={`flex items-center gap-3 ${activeSidebar ? "flex-row" : "flex-col"} z-10 w-full`}
                                    >
                                        <Icon className="text-slate-400 text-2xl" />
                                        <div className={`${activeSidebar ? "justify-between" : "justify-center"} text-lg font-medium flex items-center  py-1 cursor-pointer  w-full  text-white   uppercase`}>
                                            <span>{item?.label}</span>
                                            {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                                        </div>
                                    </div>
                                }
                                {/* <AnimatePresence mode="wait">
                                    {activeIndex === index && (
                                        <motion.div
                                            key={`options-${index}`}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="grid place-content-center w-full">
                                            {item?.options &&
                                                item?.options.map((option, oIndex) => {
                                                    return (
                                                        <Link
                                                            key={oIndex + option?.id}
                                                            href={`${option?.path}`}
                                                            className="flex items-center  py-1 border-l-2 border-slate-500 px-4 cursor-pointer justify-between w-full text-sm text-white font-medium  uppercase"
                                                        >
                                                            {option?.label}{" "}
                                                        </Link>
                                                    );
                                                })}
                                        </motion.div>
                                    )}
                                </AnimatePresence> */}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;