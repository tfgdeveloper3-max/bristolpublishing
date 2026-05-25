import React from "react";

const MIC_IMG = "/images/Mic2.png";

const FooterSection: React.FC = () => {
    return (
        <footer
            className="relative w-full flex flex-col overflow-hidden min-h-screen"
            style={{ fontFamily: "'Inter', sans-serif", background: "#1a0804" }}
        >
            <div className="relative w-full" style={{ zIndex: 2, minHeight: "" }}>

                {/* content row */}
                <div className="relative z-10 flex items-start justify-between px-12 pt-12">

                    {/* Left */}
                    <div className="max-w-screen">
                        <div className="flex items-center gap-4">
                            <h2
                                className="text-white font-black uppercase leading-[0.95]"
                                style={{ fontSize: "clamp(4.8rem,6vw,6.2rem)", letterSpacing: "-0.025em" }}
                            >
                                HAVING FUN
                            </h2>
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a0804" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                    <line x1="12" y1="19" x2="12" y2="23" />
                                </svg>
                            </div>
                        </div>

                        <h2
                            className="font-black uppercase leading-[0.95]"
                            style={{ fontSize: "clamp(4.8rem,5vw,6.2rem)", letterSpacing: "-0.025em", color: "#e85d00" }}
                        >
                            WITH LISTENING
                        </h2>

                        <p className="text-white/45 text-[1.2rem] leading-relaxed mt-6 max-w-[360px]">
                            Join our community for exclusive updates,
                            exclusive talks, and special offers.
                        </p>
                    </div>

                    {/* Right — nav */}
                    <div className="flex gap-16 pt-1">
                        <div>
                            <p className="text-white font-extrabold text-[1rem] tracking-[0.15em] uppercase mb-5">Quick Nav</p>
                            <ul className="space-y-3">
                                {["Our Categories", "Provide", "Top Creators", "Let's Join Us"].map(i => (
                                    <li key={i}><a href="#" className="text-white/50 text-[0.82rem] hover:text-white transition-colors">{i}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-white font-extrabold text-[1rem] tracking-[0.15em] uppercase mb-5">Support</p>
                            <ul className="space-y-3">
                                {["Contact Us", "FAQ", "Community"].map(i => (
                                    <li key={i}><a href="#" className="text-white/50 text-[0.82rem] hover:text-white transition-colors">{i}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-white font-extrabold text-[1rem] tracking-[0.15em] uppercase mb-5">Others</p>
                            <ul className="space-y-3">
                                {["Privacy Policy", "Terms of Service"].map(i => (
                                    <li key={i}><a href="#" className="text-white/50 text-[0.82rem] hover:text-white transition-colors">{i}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute left-1/2 bottom-0 top-[-80%] pointer-events-none"
                    style={{
                        transform: "translateX(-55%)",
                        zIndex: 20,
                        width: "100%",
                    }}
                >
                    <img
                        src={MIC_IMG}
                        alt="Podcast microphone"
                        style={{
                            width: "clamp(500px,70vw,900px)",
                            height: "auto",
                            display: "block",
                            margin: "0 auto",
                        }}
                    />
                </div>
            </div>

            <div
                className="relative w-full flex flex-col overflow-hidden"
                style={{ background: "#1a0804", paddingTop: "10vh", zIndex: 1 }}
            >

                <div className="relative z-10 flex flex-col items-end gap-3 px-12 mb-6">
                    <div className="flex gap-7">
                        {["Spotify", "Apple Music", "Youtube", "Instagram"].map(s => (
                            <a key={s} href="#" className="text-white/55 text-[0.82rem] hover:text-white transition-colors">{s}</a>
                        ))}
                    </div>
                    <p
                        className="text-white font-black text-right leading-tight"
                        style={{ fontSize: "clamp(1rem,2vw,1rem)", letterSpacing: "-0.01em" }}
                    >
                        ©2026 Bella and the Best Sellers<br />All Rights Reserved.
                    </p>
                </div>

                <div className="relative z-10 w-full top-18 overflow-hidden select-none" style={{ marginBottom: "" }}>
                    <p
                        className="text-center font-black uppercase w-full leading-none"
                        style={{
                            fontSize: "clamp(15rem,26vw,24rem)",
                            letterSpacing: "0.15em",
                            background: "linear-gradient(to bottom, #f0ece0 0%, #e8c890 35%, #d06020 70%, #a03800 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                       BELLA
                    </p>
                </div>
            </div>

        </footer>
    );
};

export default FooterSection;