"use client"
import { fetchUser } from "@/redux/slices/userSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import Hero from "./components/Hero";
import CategoryWiseProducts from "./components/CategoryWiseProducts";
import { fetchCategories } from "@/redux/slices/categorySlice";
import InfoGraphicCard from "./components/InfoGraphicCard";
import { home_posts, infographic_cards } from "@/config/page";
import PostCard from "./components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import TestimonialsSection from "./components/TestimonialsSection";
import CareGuidesSection from "./components/CareGuidesSection";
import ProductFinderWizard from "./components/ProductFinderWizard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: any) => state.userSlice);
  const { categories, status } = useSelector((state: RootState) => state.categorySlice);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])
  console.log(user?.role, "role user")

  return (
    <div className="grid gap-10 mb-10 h-full bg-background">
      <Hero />
      <ProductFinderWizard />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  container gap-10 w-4/6 ">
        {infographic_cards.hero.map((item, index) => (
          <InfoGraphicCard key={index} label={item.label} icon={item.icon} path={item.path} />
        ))}
      </div>
      <div className="grid">
          <CategoryWiseProducts   />

      </div>

       {/* <div className="grid">
        {categories.map((category, index) => (
          <CategoryWiseProducts categoryId={category.id} title={category.title} key={index} />
        ))}
      </div> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2  container gap-5 w-4/6 ">
        {infographic_cards.policies.map((item, index) => (
          <InfoGraphicCard key={index} label={item.label} icon={item.icon} path={item.path} />
        ))}
      </div>
      <CareGuidesSection/>
      <TestimonialsSection />
      <div className="grid container">
        {home_posts.map((post, index) => (
          <PostCard image={post.image} key={index} title={post.title} subtitle={post.subtitle} paragraph={post.paragraph} buttons={post.buttons} />
        ))}
      </div>
    </div>
  );
}
