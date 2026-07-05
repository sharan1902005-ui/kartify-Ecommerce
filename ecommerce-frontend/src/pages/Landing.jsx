import LandingNav from "../components/landing/LandingNav";
import HeroSection from "../components/landing/HeroSection";
import TrustSection from "../components/landing/TrustSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CategoriesSection from "../components/landing/CategoriesSection";
import WhyKartify from "../components/landing/WhyKartify";
import Testimonials from "../components/landing/Testimonials";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <div id="categories">
        <CategoriesSection />
      </div>
      <WhyKartify />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
