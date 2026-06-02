import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";

const NAV_ITEMS = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "SERVICES", path: null },
    { label: "PORTFOLIO", path: "/portfolio" },
    { label: "CONTACT", path: "/contact" },
];

const SERVICE_ITEMS = [
    { label: "Publishing", path: "/services/publishing" },
    { label: "Ghostwriting", path: "/services/ghostwriting" },
    { label: "Formatting & Proofreading", path: "/services/formatting" },
    { label: "Book Cover Design", path: "/services/cover-design" },
    { label: "Book Marketing", path: "/services/marketing" },
    { label: "Audio Book", path: "/services/audio-book" },
];

const navStyles = `
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-16px); max-height: 0; }
    to   { opacity: 1; transform: translateY(0);     max-height: 600px; }
  }
  @keyframes ctaFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }
  @keyframes ctaShimmer {
    0%        { left: -120%; }
    55%, 100% { left: 130%; }
  }
  @keyframes ctaPhonePulse {
    0%, 100% { transform: rotate(0deg); }
    20%      { transform: rotate(-14deg); }
    40%      { transform: rotate(14deg); }
    60%      { transform: rotate(-7deg); }
    80%      { transform: rotate(7deg); }
  }
  @keyframes ctaParticleFly {
    0%   { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(var(--p-tx),var(--p-ty)) scale(0); opacity: 0; }
  }

  .services-dropdown { animation: dropIn 0.2s ease forwards; }

  /* ── Hamburger lines ── */
  .hbg-line {
    display: block;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
    transform-origin: center;
  }
  .hbg-open .hbg-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hbg-open .hbg-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hbg-open .hbg-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Mobile drawer ── */
  .mobile-menu {
    animation: slideDown 0.32s cubic-bezier(0.22,1,0.36,1) forwards;
    overflow: hidden;
  }
  .mobile-nav-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.88rem;
    letter-spacing: 0.06em;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 20px;
    transition: color 0.2s, background 0.2s;
    border-radius: 10px;
  }
  .mobile-nav-link:hover,
  .mobile-nav-link.active { color: #FF4545; background: rgba(255,69,69,0.07); }

  .mobile-services-list {
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }
  .mobile-service-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    display: block;
    padding: 10px 20px 10px 36px;
    transition: color 0.2s, background 0.2s;
    border-radius: 8px;
  }
  .mobile-service-link:hover { color: #FF4545; background: rgba(255,69,69,0.06); }

  /* ── CTA button ── */
  .cta-btn-outer {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    margin: -16px;
    animation: ctaFloat 3.2s ease-in-out infinite;
  }
  .cta-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    top: 50%; left: 50%;
    margin-top: -2px; margin-left: -2px;
    animation: ctaParticleFly var(--p-dur) ease-out var(--p-delay) infinite;
  }
  .cta-main-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 20px;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    background: linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.08em;
    color: #fff;
    white-space: nowrap;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 4px 18px rgba(255,69,69,0.48);
  }
  .cta-main-btn:hover { transform: scale(1.05); box-shadow: 0 6px 26px rgba(255,69,69,0.68); }
  .cta-shine {
    position: absolute; top: 0; left: -120%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
    animation: ctaShimmer 3.5s ease-in-out infinite 1.2s;
    pointer-events: none;
  }
  .cta-phone-icon {
    animation: ctaPhonePulse 3s ease-in-out infinite 1.5s;
    display: inline-flex; flex-shrink: 0;
  }

  /* Responsive CTA sizes */
  @media (max-width: 479px) {
    .cta-main-btn { font-size: 10px; padding: 7px 13px; gap: 5px; }
  }
  @media (min-width: 1440px) {
    .cta-main-btn { font-size: 13px; padding: 11px 24px; }
  }
  @media (min-width: 1920px) {
    .cta-main-btn { font-size: 14px; padding: 12px 28px; }
  }

  /* ── Navbar base ── */
  .nb-nav {
    position: absolute;
    top: 0; left: 0; right: 0;
    z-index: 50;
    width: 100%;
  }

  /* Top bar */
  .nb-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
  }

  /* Logo */
  .nb-logo img { height: 44px; width: auto; display: block; }

  /* Desktop nav links — hidden by default, shown md+ */
  .nb-links {
    display: none;
    align-items: center;
    gap: 28px;
    list-style: none;
    margin: 0; padding: 0;
  }

  /* Hamburger button */
  .nb-hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 32px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;
  }
  .nb-hamburger .hbg-line { width: 100%; }
  .nb-hamburger .hbg-line:nth-child(3) { width: 70%; }

  /* Right side row */
  .nb-right {
    display: flex;
    align-items: center;
    gap: 14px;
    overflow: visible;
  }

  /* Mobile drawer */
  .nb-drawer {
    display: none;
    flex-direction: column;
    gap: 4px;
    padding: 8px 12px 16px;
    background: linear-gradient(160deg, rgba(13,18,48,0.97) 0%, rgba(4,5,23,0.98) 100%);
    border-top: 1px solid rgba(255,69,69,0.15);
    border-radius: 0 0 18px 18px;
    backdrop-filter: blur(16px);
  }
  .nb-drawer.open { display: flex; }

  .nb-drawer-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 6px 4px;
  }

  /* Dropdown for desktop */
  .nb-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 12px;
    width: 240px;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    background: linear-gradient(160deg, #0d1230 0%, #040517 100%);
    border: 1px solid rgba(255,69,69,0.25);
    animation: dropIn 0.2s ease forwards;
  }

  /* ════ TABLET 768px ════ */
  @media (min-width: 768px) {
    .nb-bar        { padding: 16px 28px; }
    .nb-logo img   { height: 50px; }
    .nb-hamburger  { display: none; }
    .nb-links      { display: flex; }
    .nb-drawer     { display: none !important; }
  }

  /* ════ LAPTOP 1024px ════ */
  @media (min-width: 1024px) {
    .nb-bar      { padding: 18px 40px; }
    .nb-logo img { height: 54px; }
    .nb-links    { gap: 32px; }
  }

  /* ════ MONITOR 1440px ════ */
  @media (min-width: 1440px) {
    .nb-bar      { padding: 20px 56px; }
    .nb-logo img { height: 58px; }
    .nb-links    { gap: 36px; }
  }

  /* ════ ULTRA-WIDE 1920px ════ */
  @media (min-width: 1920px) {
    .nb-bar      { padding: 22px 80px; }
    .nb-logo img { height: 78px; }
    .nb-links    { gap: 42px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cta-btn-outer { animation: none !important; }
    .cta-phone-icon { animation: none !important; }
    .cta-shine { animation: none !important; }
  }
`;

const Navbar: React.FC = () => {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileServicesOpen, setMobileSvcs] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const btnOuterRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        setMobileSvcs(false);
    }, [location.pathname]);

    // Desktop dropdown hover
    const handleMouseEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setServicesOpen(true); };
    const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setServicesOpen(false), 150); };

    const isActive = (path: string | null) => {
        if (!path) return false;
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };
    const isServicesActive = location.pathname.startsWith("/services");

    // Particles
    useEffect(() => {
        const outer = btnOuterRef.current;
        if (!outer) return;
        const colors = ["#FF4545", "#FF6B6B", "#FFB3B3", "#FF8C8C", "#FFCECE", "#fe5858"];
        const created: HTMLDivElement[] = [];
        for (let i = 0; i < 14; i++) {
            const p = document.createElement("div");
            p.className = "cta-particle";
            const angle = (360 / 14) * i + Math.random() * 20;
            const dist = 36 + Math.random() * 26;
            const rad = angle * Math.PI / 180;
            const tx = (Math.cos(rad) * dist).toFixed(1);
            const ty = (Math.sin(rad) * dist).toFixed(1);
            p.style.cssText = `
        --p-tx:${tx}px;--p-ty:${ty}px;
        --p-dur:${(1.4 + Math.random() * 1.2).toFixed(2)}s;
        --p-delay:${(Math.random() * 1.6).toFixed(2)}s;
        width:${(4 + Math.random() * 4).toFixed(1)}px;
        height:${(4 + Math.random() * 4).toFixed(1)}px;
        background:${colors[i % colors.length]};
      `;
            outer.appendChild(p);
            created.push(p);
        }
        return () => created.forEach(p => p.remove());
    }, []);

    return (
        <>
            <style>{navStyles}</style>

            <nav className="nb-nav">

                {/* ── TOP BAR ── */}
                <div className="nb-bar">

                    {/* Logo */}
                    <Link to="/" className="nb-logo">
                        <img src="/images/logo.png" alt="Bristol Publishers" />
                    </Link>

                    {/* Desktop nav links */}
                    <ul className="nb-links">
                        {NAV_ITEMS.map(item =>
                            item.label === "SERVICES" ? (
                                <li
                                    key="SERVICES"
                                    style={{ position: "relative" }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        style={{
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontSize: "0.78rem",
                                            letterSpacing: "0.05em",
                                            fontWeight: 600,
                                            color: isServicesActive ? "#FF4545" : "white",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                        }}
                                    >
                                        SERVICES
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                            style={{ transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </button>

                                    {servicesOpen && (
                                        <div className="nb-dropdown">
                                            <div style={{ height: "2px", background: "linear-gradient(90deg,#FF4545,transparent)" }} />
                                            <ul style={{ listStyle: "none", padding: "8px 0", margin: 0 }}>
                                                {SERVICE_ITEMS.map((s, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            to={s.path}
                                                            style={{ textDecoration: "none" }}
                                                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,69,69,0.08)"}
                                                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                                                            onClick={() => setServicesOpen(false)}
                                                        >
                                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 18px" }}>
                                                                <span style={{
                                                                    fontFamily: "'Montserrat',sans-serif",
                                                                    fontSize: "0.8rem",
                                                                    letterSpacing: "0.06em",
                                                                    color: location.pathname === s.path ? "#FF4545" : "rgba(255,255,255,0.8)",
                                                                }}>{s.label}</span>
                                                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                                                                    <path d="M9 18l6-6-6-6" />
                                                                </svg>
                                                            </div>
                                                        </Link>
                                                        {i < SERVICE_ITEMS.length - 1 && (
                                                            <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0 14px" }} />
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li key={item.label}>
                                    <Link
                                        to={item.path!}
                                        style={{
                                            fontFamily: "'Montserrat',sans-serif",
                                            fontSize: "0.78rem",
                                            letterSpacing: "0.05em",
                                            fontWeight: 600,
                                            textDecoration: "none",
                                            color: isActive(item.path) ? "#FF4545" : "white",
                                            borderBottom: isActive(item.path) ? "1px solid #FF4545" : "1px solid transparent",
                                            paddingBottom: "2px",
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>

                    {/* Right side — CTA + hamburger */}
                    <div className="nb-right">
                        {/* CTA Button */}
                        <div style={{ overflow: "visible" }}>
                            <div className="cta-btn-outer" ref={btnOuterRef}>
                                <button className="cta-main-btn">
                                    <span className="cta-shine" />
                                    <span className="cta-phone-icon">
                                        <Phone size={14} strokeWidth={2.3} />
                                    </span>
                                    <span>+99 123 456 789</span>
                                </button>
                            </div>
                        </div>

                        {/* Hamburger — only visible on mobile/tablet (<768px) */}
                        <button
                            className={`nb-hamburger${mobileOpen ? " hbg-open" : ""}`}
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        >
                            <span className="hbg-line" />
                            <span className="hbg-line" />
                            <span className="hbg-line" />
                        </button>
                    </div>
                </div>

                {/* ── MOBILE DRAWER ── */}
                <div className={`nb-drawer${mobileOpen ? " open mobile-menu" : ""}`}>

                    {NAV_ITEMS.map(item =>
                        item.label === "SERVICES" ? (
                            <div key="SERVICES">
                                <button
                                    className={`mobile-nav-link${isServicesActive ? " active" : ""}`}
                                    style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                                    onClick={() => setMobileSvcs(o => !o)}
                                >
                                    SERVICES
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                                        style={{ transition: "transform 0.25s", transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                <div
                                    className="mobile-services-list"
                                    style={{ maxHeight: mobileServicesOpen ? "400px" : "0", opacity: mobileServicesOpen ? 1 : 0 }}
                                >
                                    {SERVICE_ITEMS.map((s, i) => (
                                        <Link
                                            key={i}
                                            to={s.path}
                                            className="mobile-service-link"
                                            style={{ color: location.pathname === s.path ? "#FF4545" : undefined }}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {s.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={item.label}
                                to={item.path!}
                                className={`mobile-nav-link${isActive(item.path) ? " active" : ""}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                        )
                    )}

                    <div className="nb-drawer-divider" />

                    {/* Mobile CTA */}
                    <a
                        href="tel:+99123456789"
                        style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "12px 20px",
                            background: "linear-gradient(90deg,#fe5858e8,#FF4545)",
                            borderRadius: "10px",
                            textDecoration: "none",
                            color: "white",
                            fontFamily: "'Montserrat',sans-serif",
                            fontSize: "0.84rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                        }}
                    >
                        <Phone size={15} strokeWidth={2.2} />
                        +99 123 456 789
                    </a>
                </div>

            </nav>
        </>
    );
};

export default Navbar;