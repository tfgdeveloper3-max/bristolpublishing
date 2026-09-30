import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LiveChatWidget } from "@livechat/widget-react";

import Navbar from "./components/navbar";
import FooterSection from "./components/footerSection";
import { QuoteModalProvider } from "./components/QuoteModal";

const Hero = lazy(() => import("./components/hero"));
const LogoBar = lazy(() => import("./components/logobar"));
const AboutSection = lazy(() => import("./components/aboutSection"));
const Services = lazy(() => import("./components/serviceSection"));
const Portfolio = lazy(() => import("./components/portfolioSection"));
const CTASection = lazy(() => import("./components/ctaSection"));
const Testimonials = lazy(() => import("./components/testimonialSection"));
const ContactForm = lazy(() => import("./components/contactSection"));
const ThankYou = lazy(() => import("./components/pages/Thankyou/page"));
const PrivacyPolicy = lazy(() => import("./components/pages/Policies/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./components/pages/Policies/TermsOfService"));
const RefundPolicy = lazy(() => import("./components/pages/Policies/RefundPolicy"));


const Loader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
      }}
    >
      Loading...
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Hero />

      <AboutSection />
      <Services />
      <Portfolio />
      <CTASection />
      <Testimonials />
      <ContactForm />
    </Suspense>
  );
};

const MainLayout: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  /* Coming from another page via a footer link like "/#about":
     wait for the lazy-loaded section to appear, then scroll to it. */
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer: number;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 20) {
        timer = window.setTimeout(tryScroll, 100);
      }
    };
    tryScroll();

    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <Navbar />
      <HomePage />
      <FooterSection />
    </>
  );
};

/* Wraps a policy page with the same Navbar + Footer as the home page */
const PolicyPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <Suspense fallback={<Loader />}>{children}</Suspense>
    <FooterSection />
  </>
);

function App() {
  useEffect(() => {
    const openChat = () => {
      const livechat = (window as any).LiveChatWidget;

      if (livechat) {
        setTimeout(() => {
          livechat.call("maximize");
        }, 1000);
        livechat.on("new_event", (event: any) => {
          if (
            ["message", "rich_message", "file"].includes(event.type) &&
            event.author?.type !== "customer"
          ) {
            livechat.call("maximize");
          }
        });
      }
    };

    if ((window as any).LiveChatWidget) {
      openChat();
    }

    (window as any).__lc = (window as any).__lc || {};
    (window as any).__lc.asyncInit = () => {
      openChat();
    };
  }, []);

  return (
    <>
      <LiveChatWidget
        license="19067595"
      />

      <BrowserRouter>
        {/* Must be inside BrowserRouter: the popup redirects to /thank-you */}
        <QuoteModalProvider>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route
            path="/thank-you"
            element={
              <Suspense fallback={<Loader />}>
                <ThankYou />
              </Suspense>
            }
          />
          <Route path="/privacy-policy"   element={<PolicyPage><PrivacyPolicy /></PolicyPage>} />
          <Route path="/terms-of-service" element={<PolicyPage><TermsOfService /></PolicyPage>} />
          <Route path="/refund-policy"    element={<PolicyPage><RefundPolicy /></PolicyPage>} />
        </Routes>
        </QuoteModalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;