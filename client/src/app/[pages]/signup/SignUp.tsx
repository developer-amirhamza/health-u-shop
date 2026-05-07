import React, { FormEvent, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

import AxiosToastError from '../utils/AxiosToastError';
import { SummeryApi } from '../common/SummeryApi';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import image from "../assets/images/login-bg.png"
import { useRouter } from 'next/navigation';

const initialFormData = {
    username: "",
    email: "",
    password: "",
}
const SingUp = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch()
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummeryApi.signup,
                data: formData,
            });
            const responseData = response.data;
            if (responseData.success) {
                toast.success(responseData.message);
                const response = await Axios({
                    ...SummeryApi.login,
                    data: formData,
                })
                if (response.data?.success) {
                    localStorage.setItem("accessToken", response.data?.accessToken);
                    const userDetails = await fetchUserDetails();
                    dispatch(setUserDetails(userDetails?.data))
                    setFormData(initialFormData)
                    router.push("/")
                }
            } else {
                toast.error(responseData.message)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    const validInput = Object.values(formData).every(el => el);
    return (
        <section className=' flex w-full h-full  ' style={{ backgroundImage: `url(${image})` }}>
            <div className="container px-5 mx-auto flex w-full justify-center py-10">
                <div className="bg-blue-200/40 shadow-2xl p-5 flex justify-center items-center w-full max-w-md h-full flex-col
            rounded-md gap-5  ">
                    <h1 className="text-2xl text-slate-900 text-center uppercase font-semibold">Create your account</h1>
                    <form onSubmit={handleSubmit} className="grid gap-5 w-full text-lg">
                        <div className="grid gap-2 place-items-start">
                            <label htmlFor="username" className="font-medium text-slate-800">Username:</label>
                            <input className='w-full font-medium text-neutral-700 p-2 outline-none border-2 border-slate-500 rounded focus-within:border-blue-900'
                                value={formData.username} type="text" onChange={handleOnChange} name="username" id="username" placeholder='Enter your username' />
                        </div>
                        <div className="grid gap-2 place-items-start">
                            <label htmlFor="email" className="font-medium text-slate-800">Email:</label>
                            <input className='w-full font-medium text-neutral-700 p-2 outline-none border-2 border-slate-500 rounded focus-within:border-blue-900'
                                value={formData.email} type="email" onChange={handleOnChange} name="email" id="email" placeholder='Enter your email' />
                        </div>
                        <div className="grid gap-2 place-items-start">
                            <label htmlFor="password" className="font-medium text-slate-800">Password:</label>
                            <div className="relative w-full flex">
                                <input className='w-full font-medium text-neutral-700 p-2 flex outline-none border-2 border-slate-500 rounded focus-within:border-blue-900'
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={handleOnChange}
                                    type={`${showPassword ? "text" : "password"}`}
                                    name="password"
                                    id="password"
                                />
                                <div className="absolute right-3.5 text-xl text-neutral-700 cursor-pointer top-3.5 ">
                                    {showPassword ?
                                        <FaEye onClick={() => setShowPassword(false)} />
                                        : <FaEyeSlash onClick={() => setShowPassword(true)} />}
                                </div>
                            </div>
                        </div>
                        <button disabled={!validInput} type="submit" value="Submit"
                            className={`${validInput ? "bg-amber-400  cursor-pointer hover:bg-amber-500" : "bg-slate-400   cursor-not-allowed"}  p-2 text-neutral-900
                            text-xl font-semibold rounded   `} >Signup</button>
                        <div className="flex justify-between w-full px-1">
                            <h1 className="text-neutral-600 font-medium">Already have an account?</h1>
                            <Link to={'/login'} className='text-xl font-bold text-amber-600'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SingUp