"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'

const AdminDashboard = () => {
    const { user } = useSelector((state: RootState) => state.userSlice)
    const router = useRouter()

    useEffect(() => {
        // Check if user is admin
        if (user && user.role !== "USER") {
            router.push("/")
        }
    }, [user, router])

    return (
        <div className="w-full h-full p-6 bg-slate-100">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Welcome, {user?.name}
                </h1>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Total Orders</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">1,234</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Total Products</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">567</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">$45,890</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">890</p>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                    </div>
                    <div className="p-6">
                        {/* Add table or list here */}
                        <p className="text-gray-500">No orders yet</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard