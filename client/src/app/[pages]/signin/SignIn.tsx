import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';



import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/slices/userSlice';
import image from "../assets/images/login-bg.png"
import { AppDispatch } from '../redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SummeryApi } from '@/app/common/SummeryApi';
import Axios from '@/utils/Axios';


const initialFormData = {
    username: "",
    password: "",
}
const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    // const navigate = useNavigate()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummeryApi.signin,
                data: formData,
                withCredentials: true,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("accessToken", response.data.accessToken)
                dispatch(fetchUser())
                setFormData(initialFormData);
                router.push("/");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false)
        }
    }
    const validInput = Object.values(formData).every(el => el);
    return (
        <section className='  w-full min-h-screen h-full bg-no-repeat bg-center ' style={{ backgroundImage: `url(${image})` }} >
            <div className="container px-5 mx-auto flex w-full justify-center py-6">
                <div className="bg-blue-300/50 text-white shadow-2xl p-10 flex justify-center items-center w-full max-w-md h-full flex-col
                          rounded-md gap-5  ">
                    <h1 className="text-2xl text-blue-900 text-center uppercase font-semibold">Login your account</h1>
                    <form onSubmit={handleSubmit} className="grid gap-5 w-full text-lg">
                        <div className="grid gap-2 place-items-start">
                            <label htmlFor="username" className="font-medium text-blue-950">Username:</label>
                            <input className='w-full font-medium text-blue-900 p-2 outline-none border-2 border-blue-300 rounded focus-within:border-blue-900'
                                value={formData.username} type="text" onChange={handleOnChange} name="username" id="username" placeholder='Enter your username' />
                        </div>
                        <div className="grid gap-2 place-items-start">
                            <label htmlFor="password" className="font-medium text-blue-950">Password:</label>
                            <div className="relative w-full flex">
                                <input className='w-full font-medium text-blue-900 p-2 flex outline-none border-2 border-blue-300 rounded focus-within:border-blue-900'
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={handleOnChange}
                                    type={`${showPassword ? "text" : "password"}`}
                                    name="password"
                                    id="password"
                                />
                                <div className="absolute right-3.5 text-xl text-slate-700 cursor-pointer top-3.5 ">
                                    {showPassword ?
                                        <FaEye onClick={() => setShowPassword(false)} />
                                        : <FaEyeSlash onClick={() => setShowPassword(true)} />}
                                </div>
                            </div>
                        </div>
                        <input disabled={!validInput} type="submit" value={loading ? "Processing.." : "Login"}
                            className={`${validInput ? "bg-blue-400 text-white cursor-pointer hover:bg-blue-500" : "bg-slate-400   cursor-not-allowed"}  p-2 text-neutral-900
                                  text-xl font-semibold rounded   `} />
                        <div className="flex justify-between w-full px-1">
                            <h1 className="text-slate-600 font-medium">Don't have an account?</h1>
                            <Link href={'/signup'} className='text-xl font-bold text-blue-800'>Signup</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage