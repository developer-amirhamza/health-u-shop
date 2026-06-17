"use client"
import React, { useEffect, useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminHeader from './components/AdminHeader'
import { Toaster } from 'react-hot-toast'
import { fetchUser } from '@/redux/slices/userSlices'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useParams } from 'next/navigation'

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const [showSidebar, setShowSidebar] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useParams();
    const { user, status } = useSelector((state: RootState) => state.userSlice);



    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && status == "idle") {
            dispatch(fetchUser())
        }
    }, [pathname]);
    return (
        <>
            <div className="flex w-full h-screen items-start bg-slate-100 overflow-x-hidden transition-all duration-700">
                <div
                    // style={{ backgroundImage: `url(${sidebarBg})` }}
                    className={`w-full max-w-fit sticky h-screen overflow-y-auto no-scrollbar bg-blue-950 z-50 flex`}
                >
                    <AdminSidebar activeSidebar={showSidebar} />
                </div>
                <div className="w-full h-screen flex  flex-col">
                    <AdminHeader sidebar={() => setShowSidebar(!showSidebar)} />
                    <div className=" no-scrollbar overflow-y-auto">
                        {children}
                    </div>
                </div>
                <Toaster />
            </div>
        </>
    )
}

export default AdminLayout