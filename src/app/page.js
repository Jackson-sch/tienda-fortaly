import { BrandShowcase } from "@/components/home/brand-showcase";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { PromoSection } from "@/components/home/promo-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <PromoSection />
      <BrandShowcase />
    </div>
  );
}
