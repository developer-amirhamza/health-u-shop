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
import TestimonialsSection from "./components/TestimonialsSection";
import CareGuidesSection from "./components/CareGuidesSection";
import ProductFinderWizard from "./components/ProductFinderWizard";
import { useDispatch, useSelector } from "react-redux";
import FeatureSection from "./components/FeatureSection";
import EntryPoints from "./components/EntryPoints";
import TrustedStrip from "./components/TrustedStrip";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, status } = useSelector((state: RootState) => state.categorySlice);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  return (
    <div className="grid gap-0 mb-10 h-full bg-pr">
      <Hero />
       <EntryPoints />
      <ProductFinderWizard />

      {/* Hero infographic strip */}
      <div className="bg-[#f5f0eb] border-y border-[#e5ddd5]">
        <div className="container mx-auto flex divide-x divide-[#e5ddd5]">
          {infographic_cards.hero.map((item, index) => (
            <div key={index} className="flex-1">
              <InfoGraphicCard label={item.label} subtitle={(item as any).subtitle} icon={item.icon} path={item.path} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid">
        <CategoryWiseProducts />
      </div>

      {/* Policies infographic strip */}
      <div className="bg-[#f5f0eb] border-y border-[#e5ddd5]">
        <div className="container mx-auto flex flex-wrap divide-x divide-[#e5ddd5]">
          {infographic_cards.policies.map((item, index) => (
            <div key={index} className="flex-1 min-w-37.5">
              <InfoGraphicCard label={item.label} subtitle={(item as any).subtitle} icon={item.icon} path={item.path} />
            </div>
          ))}
        </div>
      </div>
      <FeatureSection />
      <CareGuidesSection />
      <TestimonialsSection />
      {/* <TrustedStrip /> */}
      {/* <div className="grid container bg-primary  gap-10">
        {home_posts.map((post, index) => (
          <PostCard image={post.image} key={index} title={post.title} subtitle={post.subtitle} paragraph={post.paragraph} buttons={post.buttons} />
        ))}
      </div> */}
    </div>
  );
}