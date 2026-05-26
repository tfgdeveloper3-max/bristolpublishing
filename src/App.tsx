import React, { useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import AboutSection from "./components/aboutSection";
import DiscoverSection from "./components/discoverSection";
import TrendingSection from "./components/trendingSection";
import FooterSection from "./components/footerSection";
import CreatorsSection from "./components/creatorSection";
import CTASection from "./components/ctaSection";
import Services from "./components/serviceSection";
import Portfolio from "./components/portfolioSection";
import Testimonials from "./components/testimonialSection";
import ContactForm from "./components/contactSection";
import LogoBar from "./components/logobar";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoBar />
      <AboutSection />
      <Services />
      <Portfolio />
      <CTASection />
      <Testimonials />
      <ContactForm />
      <FooterSection />

    </>
  );
};

export default App;