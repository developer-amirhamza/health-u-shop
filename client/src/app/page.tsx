"use client"
import { fetchUser } from "@/redux/slices/userSlices";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";

export default function Home() {

const {user,status} = useSelector((state: any) => state.userSlice);


    console.log("test user from home", user)

  return (
    <div className="grid gap-10 h-full w-full">
      <Hero/>
      <ProductGrid/>
    </div>
  );
}
