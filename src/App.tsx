import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import AboutPage from "./components/pages/About/page";
// import ServicesPage from "./components/pages/services/page";
import PublishingPage from "./components/pages/services/publishing/page";
import GhostwritingPage from "./components/pages/services/ghostwriting/page";
import FormattingPage from "./components/pages/services/formatting/page";
import CoverDesignPage from "./components/pages/services/cover-design/page";
import MarketingPage from "./components/pages/services/marketing/page";
import AudioBookPage from "./components/pages/services/audio-book/page";
import PortfolioPage from "./components/pages/portfolio/page";
import ContactPage from "./components/pages/contact/page";
// import GhostwritingPage from "./components/pages/services/ghostwriting/page";
// import FormattingPage from "./components/pages/services/formatting/page";
// import CoverDesignPage from "./components/pages/services/cover-design/page";
// import MarketingPage from "./components/pages/services/marketing/page";
// import AudioBookPage from "./components/pages/services/audio-book/page";

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
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/services" element={<ServicesPage />} /> */}
        <Route path="/services/publishing" element={<PublishingPage />} />
        <Route path="/services/ghostwriting" element={<GhostwritingPage />} />
        <Route path="/services/formatting" element={<FormattingPage />} />
        <Route path="/services/cover-design" element={<CoverDesignPage />} />
        <Route path="/services/marketing" element={<MarketingPage />} />
        <Route path="/services/audio-book" element={<AudioBookPage />} />

        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
};

export default App;