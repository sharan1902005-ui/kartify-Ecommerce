import LandingNav from "../components/landing/LandingNav";
import HeroSection from "../components/landing/HeroSection";
import TrustSection from "../components/landing/TrustSection";
import CategoriesSection from "../components/landing/CategoriesSection";
import TrendingProducts from "../components/landing/TrendingProducts";
import FlashDeals from "../components/landing/FlashDeals";
import WhyKartify from "../components/landing/WhyKartify";
import Testimonials from "../components/landing/Testimonials";
import Newsletter from "../components/landing/Newsletter";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <div id="hero"><HeroSection /></div>
      <TrustSection />
      <div id="categories"><CategoriesSection /></div>
      <div id="trending"><TrendingProducts /></div>
      <div id="deals"><FlashDeals /></div>
      <div id="why"><WhyKartify /></div>
      <div id="reviews"><Testimonials /></div>
      <Newsletter />
      <Footer />
    </div>
  );
}
