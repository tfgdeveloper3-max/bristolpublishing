import React, { useEffect, useRef, useState } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

  @keyframes floatDrift1 {
    0%   { transform: rotate(-3deg) translateY(0px); }
    50%  { transform: rotate(-2deg) translateY(-14px); }
    100% { transform: rotate(-3deg) translateY(0px); }
  }
  @keyframes floatDrift2 {
    0%   { transform: rotate(2deg) translateY(0px); }
    50%  { transform: rotate(3.5deg) translateY(-10px); }
    100% { transform: rotate(2deg) translateY(0px); }
  }
`;

const IMG1 = "/images/podcast-host-1.jpg";
const IMG2 = "/images/podcast-host-2.jpg";

const AboutSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [img1In, setImg1In] = useState(false);
    const [img2In, setImg2In] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    setTimeout(() => setImg1In(true), 300);
                    setTimeout(() => setImg2In(true), 520);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{fontStyle}</style>

            <section
                ref={sectionRef}
                className="relative w-full overflow-hidden bg-[#1c0b05] flex justify-between items-start min-h-[380px] py-14 px-14"
            >
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(10,3,0,0.55)_100%)]" />

                <div className="absolute -top-20 right-[60px] z-0 h-[260px] w-[340px] rounded-full bg-[#b83800] opacity-[0.22] blur-[90px] pointer-events-none" />

                <div className="relative z-10 w-[210px] flex-shrink-0">
                    <p
                        className={`mb-11 font-['Bebas_Neue'] text-base tracking-[0.06em] text-[#d4623a] transition-all duration-500 ease-out delay-[50ms] ${visible ? "translate-y-0 opacity-100" : "translate-y-3.5 opacity-0"
                            }`}
                    >
                        What's Bella?
                    </p>

                    <div
                        className={`transition-all duration-600 ease-out delay-[180ms] ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                            }`}
                    >
                        <p className="m-0 font-['Bebas_Neue'] text-[5.8rem] leading-[0.95] tracking-[-0.01em] text-white">
                            10K+
                        </p>
                        <p className="mt-2.5 font-['Bebas_Neue'] text-xs tracking-[0.18em] text-white/30">
                            HOURS SPENT
                        </p>
                    </div>
                </div>

                <div className="relative z-10 max-w-[1000px]">
                    <div
                        className={`transition-all duration-650 ease-out delay-[200ms] ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            }`}
                    >
                        <p className="m-0 max-w-[1080px] font-['DM_Serif_Display'] text-[clamp(1.55rem,2.5vw,2.1rem)] font-normal leading-[1.42] text-white">
                            At Bella, we believe every voice matters. Our modern
                            podcasting platform empowers creators and thinkers to share
                            their ideas. Whether you're starting out or expanding your
                            audience.{" "}
                            <em className="italic text-white/30">
                                Bella offers intuitive tools, a clean interface and a
                                supportive community. This is where conversations start
                                and resonate.
                            </em>
                        </p>

                        <button
                            className={`group mt-9 inline-flex cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] border-[#d4623a]/55 bg-transparent py-3 pl-6 pr-3.5 font-['Bebas_Neue'] text-sm tracking-[0.12em] text-[#d4623a] transition-all duration-200 hover:border-[#d4623a] hover:bg-[#d4623a]/10`}
                        >
                            Learn More About Us
                            <span className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-[#d4623a]">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div
                        className={`absolute -top-2 left-[30%] z-10 h-[175px] w-[162px] overflow-hidden rounded-2xl transition-opacity duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${img1In ? "opacity-100" : "opacity-0"
                            }`}
                        style={{
                            transform: img1In ? "rotate(-3deg) translateY(0px)" : "rotate(-3deg) translateY(52px)",
                            transition: "transform 1s cubic-bezier(0.22,1,0.36,1)",
                            animation: img1In ? "floatDrift1 5.5s ease-in-out 0.9s infinite" : "none",
                            willChange: "transform, opacity",
                        }}
                    >
                        <img
                            src={IMG1}
                            alt="Podcast creator"
                            className="block h-full w-full object-cover"
                            onError={(e) => {
                                const t = e.currentTarget as HTMLImageElement;
                                t.style.display = "none";
                                const p = t.parentElement;
                                if (p) {
                                    p.style.background = "linear-gradient(155deg,#e8844a 0%,#f0a868 45%,#7ab8d8 100%)";
                                }
                            }}
                        />
                    </div>

                    <div
                        className={`absolute top-2.5 -right-5 z-10 h-[158px] w-[158px] overflow-hidden rounded-2xl transition-opacity duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${img2In ? "opacity-100" : "opacity-0"
                            }`}
                        style={{
                            transform: img2In ? "rotate(2deg) translateY(0px)" : "rotate(2deg) translateY(58px)",
                            transition: "transform 1s cubic-bezier(0.22,1,0.36,1) 0.18s",
                            animation: img2In ? "floatDrift2 6.5s ease-in-out 1.1s infinite" : "none",
                            willChange: "transform, opacity",
                        }}
                    >
                        <img
                            src={IMG2}
                            alt="Podcast creator"
                            className="block h-full w-full object-cover"
                            onError={(e) => {
                                const t = e.currentTarget as HTMLImageElement;
                                t.style.display = "none";
                                const p = t.parentElement;
                                if (p) {
                                    p.style.background = "linear-gradient(155deg,#6068d0 0%,#9058d8 48%,#e06848 100%)";
                                }
                            }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutSection;