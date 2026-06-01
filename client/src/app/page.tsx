"use client"
import { fetchUser } from "@/redux/slices/userSlices";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CategoryWiseProducts from "./components/CategoryWiseProducts";
import { fetchCategories } from "@/redux/slices/categorySlice";

export default function Home() {
const dispatch = useDispatch<AppDispatch>()
const {user} = useSelector((state: any) => state.userSlice);
const {categories, status}= useSelector((state:RootState)=>state.categorySlice);
console.log(categories, "categories")
     useEffect(()=>{
      if(status === "idle"){
        dispatch(fetchCategories())
      }
     },[dispatch,status])



    console.log("test user from home", user)

  return (
    <div className="grid gap-10 mb10 h-full w-full">
      <Hero/>
      
      <div className="grid">
        {categories.map((category,index)=>(
          <CategoryWiseProducts categoryId={category.id} title={category.title} key={index} />
        ))}

      </div>

    </div>
  );
}
