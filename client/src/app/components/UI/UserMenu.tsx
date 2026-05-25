import { SummeryApi } from "@/app/common/SummeryApi";
import { setLogout } from "@/redux/slices/userSlices";
import { RootState } from "@/redux/store";
import Axios from "@/utils/Axios";
import AxiosToastError from "@/utils/AxiosToastError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Divider from "./Divider";
import { VscSignOut } from "react-icons/vsc";

interface Type {
    close:any
}

const UserMenu:React.FC<Type> = ({ close }) => {
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.userSlice?.user);
    const router = useRouter();

     const handleSignout = async () => {
        try {
            const response = await Axios({
                ...SummeryApi.signout,
            });
            dispatch(setLogout());
            localStorage.clear();
            toast.success(response?.data?.message);
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleCloseMenu = () => {
        if (close) {
            close();
        }
    };

    return (
        <div>
            <div className="flex  flex-col pt-3 gap-1.5 z-50  ">
                <h2 className="font-semibold px-2 text-neutral-800 ">My Account</h2>
                <Link
                    onClick={handleCloseMenu}
                    href={"/my-profile/"}
                    className="text-neutral-700 flex gap-4 hover:text-primary cursor-pointer hover:bg-amber-100 items-center  font-medium px-2"
                >
                    <span className="">{user?.name || user?.mobile} <span>{user?.role === "admin" ? "(Admin)" : ""}</span> </span>
                    <FaExternalLinkAlt size={16} />
                </Link>
                <Divider />
                <div className="grid gap-2">
                    {/* {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/category"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Category
                        </Link>
                    )}

                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/sub-category"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Sub Category
                        </Link>
                    )}

                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/admin-products"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Products
                        </Link>
                    )}
                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/upload-product"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Upload Product
                        </Link>
                    )} */}

                    <Link
                        onClick={handleCloseMenu}
                        href={"/order/my-orders"}
                        className="text-neutral-600 hover:text-primary px-2 font-medium cursor-pointer hover:bg-amber-200"
                    >
                        My Orders
                    </Link>
                    {/* {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/admin-orders"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                        All Orders
                        </Link>
                    )} */}
                    {/* <Link
                        onClick={handleCloseMenu}
                        href={"/dashboard/address"}
                        className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                    >
                        Save Address
                    </Link> */}
                </div>
                <button onClick={handleSignout}
                    className="text-md font-medium hover:bg-amber-100 cursor-pointer px-3 py-2 rounded hover:text-primary  flex items-center gap-2 t text-neutral-800">
                    <VscSignOut size={24} /> <span className="text-xl font-bold  ">Signout</span>
                </button>
            </div>
        </div>
    );
};

export default UserMenu;