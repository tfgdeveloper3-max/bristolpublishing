import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
            <div className="flex items-center gap-2">
                <span
                    className="text-white text-2xl tracking-widest"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                    Bristol <span className="text-[#FF4545]">Publishing</span>
                </span>
            </div>

            <ul className="hidden md:flex items-center gap-8">
                {["HOME", "ABOUT", "SERVICES", "PORTFOLIO", "CONTACT"].map((item) => (
                    <li key={item}>
                        <a
                            href="#"
                            className="text-white text-[1rem] font-medium hover:text-[#FF4545] transition-colors duration-200"
                            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-3">
                <button
                    className="px-6 py-2 rounded-full text-white text-sm font-semibold transition-all duration-200 hover:opacity-90"
                    style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: "0.08em",
                        background: "linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%)",
                    }}
                >
                    Contact More Info <br />
                    <span className="text-sm text-[#030726]">+99 123 456 789</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;