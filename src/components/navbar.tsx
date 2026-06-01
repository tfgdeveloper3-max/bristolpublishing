import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "SERVICES", path: null }, // dropdown
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

const dropdownStyle = `
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .services-dropdown {
    animation: dropIn 0.2s ease forwards;
  }
`;

const Navbar: React.FC = () => {
    const [servicesOpen, setServicesOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setServicesOpen(true);
    };
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
    };

    const isActive = (path: string | null) => {
        if (!path) return false;
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    const isServicesActive = location.pathname.startsWith("/services");

    return (
        <>
            <style>{dropdownStyle}</style>
            <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="Bristol Publishing" className="h-15 w-auto" />
                </Link>

                {/* Nav links */}
                <ul className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) =>
                        item.label === "SERVICES" ? (
                            <li
                                key={item.label}
                                className="relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className="flex items-center gap-1 text-[0.78rem] font-semibold transition-colors duration-200"
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        letterSpacing: "0.05em",
                                        color: isServicesActive ? "#FF4545" : "white",
                                    }}
                                >
                                    SERVICES
                                    <svg
                                        width="12" height="12" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2.5"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        style={{
                                            transition: "transform 0.2s ease",
                                            transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            marginTop: "1px",
                                        }}
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                {servicesOpen && (
                                    <div
                                        className="services-dropdown absolute top-full left-1/2 mt-3 w-64 rounded-xl overflow-hidden shadow-2xl"
                                        style={{
                                            transform: "translateX(-50%)",
                                            background: "linear-gradient(160deg, #0d1230 0%, #040517 100%)",
                                            border: "1px solid rgba(255,69,69,0.25)",
                                        }}
                                    >
                                        <div style={{ height: "2px", background: "linear-gradient(90deg, #FF4545, transparent)" }} />
                                        <ul className="py-2">
                                            {SERVICE_ITEMS.map((service, i) => (
                                                <li key={i}>
                                                    <Link
                                                        to={service.path}
                                                        className="flex items-center gap-3 px-5 py-3 transition-all duration-150 group"
                                                        style={{ textDecoration: "none" }}
                                                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,69,69,0.08)")}
                                                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                                        onClick={() => setServicesOpen(false)}
                                                    >
                                                        <span
                                                            className="text-white/80 text-sm group-hover:text-[#FF4545] transition-colors duration-150"
                                                            style={{
                                                                fontFamily: "'Montserrat', sans-serif",
                                                                letterSpacing: "0.06em",
                                                                fontSize: "0.82rem",
                                                                color: location.pathname === service.path ? "#FF4545" : undefined,
                                                            }}
                                                        >
                                                            {service.label}
                                                        </span>
                                                        <svg
                                                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                                            width="12" height="12" viewBox="0 0 24 24"
                                                            fill="none" stroke="#FF4545" strokeWidth="2.5"
                                                            strokeLinecap="round" strokeLinejoin="round"
                                                        >
                                                            <path d="M9 18l6-6-6-6" />
                                                        </svg>
                                                    </Link>
                                                    {i < SERVICE_ITEMS.length - 1 && (
                                                        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "0 16px" }} />
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
                                    className="text-[0.78rem] font-semibold transition-colors duration-200"
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        letterSpacing: "0.05em",
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

                {/* CTA button */}
                <div className="flex items-center gap-3">
                    <button
                        className="px-6 py-2 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:opacity-90"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            letterSpacing: "0.08em",
                            background: "linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%)",
                        }}
                    >
                        Contact More Info <br />
                        <span className="text-sm text-[#1B465F]">+99 123 456 789</span>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;