"use client"
import { SummeryApi } from '@/app/common/SummeryApi';
import { fetchUser, setLogout } from '@/redux/slices/userSlices';
import { AppDispatch } from '@/redux/store';
import Axios from '@/utils/Axios';
import AxiosToastError from '@/utils/AxiosToastError';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { VscSignIn, VscSignOut } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux';

interface Type {
    accessToken:string
}

const UserMenu:React.FC<Type> = ({accessToken}) => {
    const { user, status } = useSelector((state: any) => state.userSlice);
        const router = useRouter()
        const dispatch = useDispatch<AppDispatch>()
        useEffect(() => {
            if(accessToken && status === "idle"){
                dispatch(fetchUser())
            }
        }, [accessToken])
        console.log("test user from header", user)
        const handleSignout = async()=>{
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
  return (
    <div>
        {status === "succeeded" && accessToken ? (
                            <div className="relative z-100">
                                <button onClick={handleSignout}
                                    className="text-md font-medium hover:bg-amber-100 cursor-pointer px-3 py-2 rounded hover:text-secondary bg-amber-50 flex items-center gap-2 t text-neutral-800">
                                    <VscSignOut size={24} /> <span className="text-xl font-bold  ">Signout</span>
                                </button>
                                {/* <button onClick={() => setShowUserMenu(!showUserMenu)}
                                className="text-md flex items-center font-medium cursor-pointer hover:bg-neutral-200 px-3 py-2 rounded  text-neutral-800">
                                <p>Account</p>
                                {showUserMenu ? (<GoTriangleUp size={20} />) : (<GoTriangleDown size={20} />)}
                                </button>
                                {showUserMenu &&
                                <div className="absolute top-12 z-100 right-0 bg-white shadow-md w-40 rounded-sm transition-all duration-500">
                                    <UserMenu close={handleCloseUserMenu} />
                                </div>
                                } */}
                            </div>
                        ) : (
                            <button onClick={() => router.push("/signin")}
                                className="text-md font-medium hover:bg-amber-100 cursor-pointer px-3 py-2 rounded hover:text-secondary bg-amber-50 flex items-center gap-2 t text-neutral-800">
                                <VscSignIn size={24} /> <span className="text-xl font-bold ">Signin</span>
                            </button>
                        )
                        }
    </div>
  )
}

export default UserMenu