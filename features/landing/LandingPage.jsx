import React from "react";
import Navbar from "@/features/landing/components/Navbar";
import Hero from "@/features/landing/components/Hero";
// import Extra from "@/features/landing/components/Extra";
import Features from "@/features/landing/components/Features";
import HowItWork from "@/features/landing/components/HowItWork";
// import Pricing from "@/features/landing/components/Pricing";
import Faqs from "@/features/landing/components/Faqs";
import CtaSection from "@/features/landing/components/CtaSection";
import Footer from "@/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary animate-page-transition">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        {/* <Extra /> */}
        <Features />
        <HowItWork />
        {/* <Pricing /> */}
        <Faqs />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
