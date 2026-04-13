import { useCallback } from "react";
import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import FeaturedSection from "./sections/FeaturedSection";
import PropertiesSection from "./sections/PropertiesSection";
import ArticlesSection from "./sections/ArticlesSection";
import FAQSection from "./sections/FAQSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CTASection from "./sections/CTASection";
import Footer from "./sections/Footer";

export default function LandingPage() {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-200">
      {/* Update document head */}
      <>
        <title>GuestHouse | Your Home Away From Home</title>
        <meta
          name="description"
          content="Experience warm hospitality and cozy comfort at our guesthouse. Perfect getaway for relaxation and memorable stays."
        />
      </>

      <Navbar onScrollToSection={scrollToSection} />
      <HeroSection />
      <ServicesSection />
      <FeaturedSection />
      {/* <PropertiesSection /> */}
      {/* <ArticlesSection /> */}
      {/* <FAQSection /> */}
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
