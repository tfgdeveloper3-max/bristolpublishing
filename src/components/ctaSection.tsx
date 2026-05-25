import React, { useState } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
`;

const CTASection: React.FC = () => {
    const [email, setEmail] = useState("");

    return (
        <>
            <style>{fontStyle}</style>
            <section
                className="relative w-full overflow-hidden flex flex-col items-center justify-center"
                style={{ minHeight: "100vh", padding: "80px 24px", background: "#120704" }}
            >
                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: "50vw",
                        height: "50vw",
                        maxWidth: "700px",
                        maxHeight: "700px",
                        background: "#e07848",
                        top: "-15%",
                        left: "-10%",
                        filter: "blur(120px)",
                        opacity: 0.45,
                        zIndex: 0,
                    }}
                />

                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: "45vw",
                        height: "45vw",
                        maxWidth: "650px",
                        maxHeight: "650px",
                        background: "#4888d0",
                        top: "-10%",
                        right: "-10%",
                        filter: "blur(130px)",
                        opacity: 0.40,
                        zIndex: 0,
                    }}
                />

                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: "55vw",
                        height: "55vw",
                        maxWidth: "750px",
                        maxHeight: "750px",
                        background: "#b860a0",
                        bottom: "-20%",
                        left: "30%",
                        filter: "blur(140px)",
                        opacity: 0.35,
                        zIndex: 0,
                    }}
                />

                <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: "30vw",
                        height: "30vw",
                        maxWidth: "400px",
                        maxHeight: "400px",
                        background: "#40a898",
                        bottom: "10%",
                        left: "-5%",
                        filter: "blur(100px)",
                        opacity: 0.25,
                        zIndex: 0,
                    }}
                />

                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

                    <p
                        className="text-white/60 uppercase tracking-[0.25em] mb-8"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem" }}
                    >
                        Bella
                    </p>

                    <h1
                        className="text-white leading-[1.02] mb-7"
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(3rem, 5vw, 6rem)",
                            letterSpacing: "0.01em",
                        }}
                    >
                        It's More Than Podcasting.{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(90deg, #ff8c00, #e85d00, #d04800)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            It's Connection.
                        </span>
                    </h1>

                    <p
                        className="text-white/55 leading-relaxed mb-12 max-w-xl"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                        }}
                    >
                        Subscribe to our newsletter, follow us on social media,
                        or join our community forum to stay connected with fellow
                        listeners and creators.
                    </p>

                    <div
                        className="flex items-center w-full max-w-lg rounded-full overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "1.5px solid rgba(255,255,255,0.15)",
                            backdropFilter: "blur(16px)",
                        }}
                    >
                        <div className="flex items-center pl-6 pr-2 flex-1">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="rgba(255,255,255,0.4)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="flex-shrink-0 mr-3"
                            >
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M22 7l-10 7L2 7" />
                            </svg>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email Here"
                                className="w-full bg-transparent outline-none text-white placeholder-white/35 py-4"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.92rem",
                                }}
                            />
                        </div>

                        <button
                            className="flex-shrink-0 px-7 py-3.5 rounded-full text-white font-bold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg mr-1.5"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                background:
                                    "linear-gradient(90deg, #e85d00 0%, #ff8c00 100%)",
                                letterSpacing: "0.02em",
                            }}
                        >
                            Subscribe Now
                        </button>
                    </div>

                    <p
                        className="text-white/25 mt-5"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.75rem",
                        }}
                    >
                        No spam, ever. Unsubscribe anytime.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] z-[2] px-4 pb-4 pointer-events-none">
                    {Array.from({ length: 60 }).map((_, i) => {
                        const h = 10 + Math.sin(i * 0.5) * 18 + Math.random() * 14;
                        return (
                            <div
                                key={i}
                                className="flex-1 rounded-t-full"
                                style={{
                                    height: `${h}px`,
                                    background:
                                        "linear-gradient(to top, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                                    maxWidth: "8px",
                                }}
                            />
                        );
                    })}
                </div>
            </section>
        </>
    );
};

export default CTASection;