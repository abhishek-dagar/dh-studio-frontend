"use client";
import Hero from "@/components/sections/home-page/Hero";
import Features from "@/components/sections/home-page/Features";
import HowItWorks from "@/components/sections/home-page/HowItWorks";
import Benefits from "@/components/sections/home-page/Benefits";
import Integration from "@/components/sections/home-page/Integration";
import FAQ from "@/components/sections/home-page/FAQ";

const HomePage = () => {
  return (
    <main className="relative min-h-screen bg-white dark:bg-[#191B1F]">
      <div className="absolute inset-0 z-0">
        {/* Hexagon Grid Pattern */}
        <div className="bg-hexagon-pattern-light dark:bg-hexagon-pattern-dark absolute inset-0 z-0" />
      </div>
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <Integration />
      <FAQ />
      {/* Other sections will be added here */}
    </main>
  );
};
export default HomePage;
