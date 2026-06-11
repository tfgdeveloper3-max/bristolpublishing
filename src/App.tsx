import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import FooterSection from "./components/footerSection";

import Hero from "./components/hero";
import LogoBar from "./components/logobar";
import AboutSection from "./components/aboutSection";
import Services from "./components/serviceSection";
import Portfolio from "./components/portfolioSection";
import CTASection from "./components/ctaSection";
import Testimonials from "./components/testimonialSection";
import ContactForm from "./components/contactSection";

const HomePage: React.FC = () => (
  <>
    <Hero />
    <LogoBar />
    <AboutSection />
    <Services />
    <Portfolio />
    <CTASection />
    <Testimonials />
    <ContactForm />
  </>
);

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <Navbar />
      <HomePage />
      <FooterSection />
    </>
  );
};

export default App;