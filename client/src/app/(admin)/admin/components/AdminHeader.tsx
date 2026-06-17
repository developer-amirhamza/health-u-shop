"use client"

import React, { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import Logo from "@/assets/header-logosr.png";
import { TbLogout } from "react-icons/tb";
import { FaRegBell, FaRegEnvelope } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import Axios from "@/utils/Axios";
import AxiosToastError from "@/utils/AxiosToastError";
import { setLogout } from "@/redux/slices/userSlices";
import AdminPermission from "./AdminPermission";
import { SummeryApi } from "@/app/common/SummeryApi";
interface Props {
    sidebar: any;
}
const AdminHeader: React.FC<Props> = ({ sidebar }) => {
    const [isActive, setIsActive] = useState(false);
    const { user } = useSelector((state: RootState) => state.userSlice);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummeryApi.signout,
            });
            if (response.data?.success) {
                toast.success(response.data?.message);
                dispatch(setLogout());
                localStorage.clear();
                router.push("/");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex w-full h-full max-h-16 bg-blue-950 items-center z-100  ">
            <button
                onClick={sidebar}
                className="bg-sky-900 cursor-pointer  min-h-full p-4 flex "
            >
                <IoMenuSharp className="text-white text-3xl " />
            </button>
            <div className="flex w-full h-full items-center justify-between px-2">
                <Image className="max-h-12 object-scale-down max-w-fit" src={Logo} alt="" />
                <ul className="flex items-center gap-4 px-2 ">
                    <li className="relative cursor-pointer  h-full text-white">
                        <FaRegBell size={20} />
                        <span className="absolute bg-emerald-600 text-xs  h-5 w-5 items-center justify-center flex -right-2.5 -top-4 rounded-full p-1">
                            4
                        </span>
                    </li>
                    <li className="relative cursor-pointer  h-full text-white">
                        <BsQuestionCircleFill size={20} />
                    </li>
                    <li className="relative cursor-pointer  h-full text-white">
                        <FaRegEnvelope size={20} />
                        <span className="absolute bg-emerald-600 text-xs  h-5 w-5 items-center justify-center flex -right-2.5 -top-4 rounded-full p-1">
                            4
                        </span>
                    </li>
                </ul>
            </div>
            <div className="bg-sky-900  relative z-100  min-w-fit px-4 py-2 items-center flex ">
                <div className="flex w-full  gap-3 items-center z-100  ">
                    <img
                        className=" w-12  object-cover rounded-full"
                        src={
                            user?.avatar ||
                            `https://themewagon.github.io/pluto/images/layout_img/user_img.jpg`
                        }
                        alt=""
                    />
                    <button
                        onClick={() => setIsActive(!isActive)}
                        className="flex w-full text-white font-semibold cursor-pointer items-center"
                    >
                        <h1 className="text-sm capitalize ">{user?.name}</h1>
                        <IoIosArrowDown size={18} />
                    </button>
                </div>
                <ul
                    className={`  ${isActive
                        ? "translate-y-0 max-h-auto opacity-100 z-10 "
                        : " opacity-0 max-h-0 -translate-y-36  "
                        } -z-10 absolute top-16 w-full transition-all duration-500   bg-slate-100 grid shadow-md  left-0`}
                >
                    <li
                        onClick={() => {
                            router.push(`/admin-profile`), setIsActive(false);
                        }}
                        className=" cursor-pointer hover:bg-slate-700 text-slate-700 px-4 py-1.5 font-semibold  hover:text-white transition-colors duration-200"
                    >
                        My Profile
                    </li>
                    <li
                        onClick={() => {
                            router.push(`/profile-setting`), setIsActive(false);
                        }}
                        className=" cursor-pointer hover:bg-slate-700 text-slate-700 px-4 py-1.5 font-semibold  hover:text-white transition-colors duration-200"
                    >
                        Sittings
                    </li>
                    <AdminPermission>
                        <li
                            onClick={() => {
                                router.push(`/all-users`), setIsActive(false);
                            }}
                            className=" cursor-pointer hover:bg-slate-700 text-slate-700 px-4 py-1.5 font-semibold  hover:text-white transition-colors duration-200"
                        >
                            All Users
                        </li>
                    </AdminPermission>

                    <div
                        onClick={handleLogout}
                        className=" hover:bg-slate-700 text-slate-700 cursor-pointer px-4 py-1.5 font-semibold  hover:text-white transition-colors duration-200 flex items-center gap-3"
                    >
                        <span>{loading ? "Loading.." : "Logout"}</span>
                        <TbLogout size={20} />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default AdminHeader;