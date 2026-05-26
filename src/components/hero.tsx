import React, { useEffect, useRef } from "react";
import SplitText from "./SplitText";

const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap');`;

const BOOK_MOCKUP = "/images/covers/Book-Mockup.png";

const animStyles = `
  @keyframes floatBook {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50%       { transform: translateX(-50%) translateY(-22px); }
  }

  @keyframes marqueeLeft {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes marqueeRight {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  .marquee-track-left {
    display: flex;
    width: max-content;
    animation: marqueeLeft 55s linear infinite;
  }

  .marquee-track-right {
    display: flex;
    width: max-content;
    animation: marqueeRight 60s linear infinite;
  }

  .marquee-track-left:hover,
  .marquee-track-right:hover {
    animation-play-state: paused;
  }

  .hero-book-card {
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    margin: 0 10px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .hero-book-card img {
    display: block;
    object-fit: cover;
    pointer-events: none;
    filter: saturate(0.75) brightness(0.7);
  }
`;

const ROW_TOP = [
    { src: "/images/Portfolio/01.jpg", title: "Reflections" },
    { src: "/images/Portfolio/02.jpg", title: "The Man From ST. Claus" },
    { src: "/images/Portfolio/03.jpg", title: "Margo" },
    { src: "/images/Portfolio/04.jpg", title: "Casters" },
    { src: "/images/Portfolio/05.jpg", title: "Human Resources Professional" },
    { src: "/images/Portfolio/06.jpg", title: "Lady Justice Aya" },
    { src: "/images/Portfolio/07.jpg", title: "Yes to Beyond" },
    { src: "/images/Portfolio/08.jpg", title: "My Poetry Inspired By Goat" },
    { src: "/images/Portfolio/09.jpg", title: "Mr. TerriTaff" },
    { src: "/images/Portfolio/10.jpg", title: "From Broken To Redeemed" },
    { src: "/images/Portfolio/11.jpg", title: "Both Sides of the fence" },
    { src: "/images/Portfolio/12.jpg", title: "Adjust Your Crown" },
];

const ROW_BOTTOM = [
    { src: "/images/Portfolio/15.jpg", title: "The Mirror Within" },
    { src: "/images/Portfolio/16.jpg", title: "Want Me" },
    { src: "/images/Portfolio/17.jpg", title: "Chasing Or Being Chased" },
    { src: "/images/Portfolio/18.jpg", title: "Mucho Que Contar" },
    { src: "/images/Portfolio/19.jpg", title: "Awesome" },
    { src: "/images/Portfolio/20.jpg", title: "Green Pastures" },
    { src: "/images/Portfolio/21.jpg", title: "The Manifestos" },
    { src: "/images/Portfolio/22.jpg", title: "The Cocoon" },
    { src: "/images/Portfolio/23.jpg", title: "GreenLand" },
    { src: "/images/Portfolio/24.jpg", title: "The Atrocity" },
    { src: "/images/Portfolio/25.jpg", title: "Agony" },
    { src: "/images/Portfolio/26.jpg", title: "Renaissance Man" },
];

const HeroBookCard: React.FC<{ src: string; title: string; h?: number; w?: number }> = ({
    src, title, h = 320, w = 210,
}) => (
    <div className="hero-book-card" style={{ width: `${w}px`, height: `${h}px` }}>
        <img
            src={src}
            alt={title}
            style={{ width: "100%", height: "100%" }}
            onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const p = t.parentElement!;
                p.style.background = `hsl(${Math.random() * 360},20%,15%)`;
            }}
        />
    </div>
);

const Hero: React.FC = () => {
    return (
        <>
            <style>{fontStyle}</style>
            <style>{animStyles}</style>

            <section
                className="relative w-full flex flex-col overflow-hidden pt-5"
                style={{ background: `radial-gradient(ellipse at 0% 50%, #1B465F 0%, transparent 38%), radial-gradient(ellipse at 20% 100%, #205270 0%, transparent 36%), radial-gradient(ellipse at 75% 0%, #14384C 0%, transparent 42%), radial-gradient(ellipse at 100% 65%, #1A4259 0%, transparent 40%), radial-gradient(ellipse at 50% 50%, #102838 0%, transparent 55%), #0A1A24` }}
            >
                {/* ── BACKGROUND MARQUEE LAYER ── */}
                <div
                    className="absolute inset-0 flex flex-col justify-center gap-6 overflow-hidden"
                    style={{ zIndex: 0, pointerEvents: "none" }}
                >
                    {/* Top row — scrolls left */}
                    <div style={{ overflow: "hidden" }}>
                        <div className="marquee-track-left">
                            {ROW_TOP.map((b, i) => <HeroBookCard key={i} src={b.src} title={b.title} />)}
                            {ROW_TOP.map((b, i) => <HeroBookCard key={`d${i}`} src={b.src} title={b.title} />)}
                        </div>
                    </div>

                    {/* Bottom row — scrolls right */}
                    <div style={{ overflow: "hidden" }}>
                        <div className="marquee-track-right">
                            {ROW_BOTTOM.map((b, i) => <HeroBookCard key={i} src={b.src} title={b.title} />)}
                            {ROW_BOTTOM.map((b, i) => <HeroBookCard key={`d${i}`} src={b.src} title={b.title} />)}
                        </div>
                    </div>
                </div>

                {/* ── DARK OVERLAY over marquee ── */}
                <div
                    className="absolute inset-0"
                    style={{
                        zIndex: 1,
                        background: `
              linear-gradient(to bottom,
                rgba(10, 26, 36, 0.91) 0%,
                rgba(10, 26, 36, 0.80) 40%,
                rgba(10, 26, 36, 0.83) 60%,
                rgba(10, 26, 36, 0.96) 100%
              )
            `,
                    }}
                />

                {/* ── MAIN CONTENT ── */}
                <div
                    className="relative px-9 z-10 flex-shrink-0"
                    style={{ paddingTop: "10rem" }}
                >
                    <h1
                        className="text-white uppercase flex justify-between w-full leading-[0.85]"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            fontSize: "clamp(4rem, 8vw, 4rem)",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        <SplitText
                            text="Bristol"
                            delay={100}
                            duration={2.25}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                        <SplitText
                            text="Publishers"
                            className="text-[#FF4545]"
                            delay={100}
                            duration={2.25}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                    </h1>

                    <h1
                        className="text-white uppercase flex justify-between w-full leading-[0.85] mt-4"
                        style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 600,
                            fontSize: "clamp(2rem, 6vw, 2rem)",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        <SplitText
                            text="The Trusted Name"
                            delay={100}
                            duration={2.25}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                        <SplitText
                            text="For Authors"
                            className="text-[#FF4545]"
                            delay={100}
                            duration={2.25}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                    </h1>
                </div>

                {/* ── FLOATING BOOK MOCKUP ── */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 20,
                        left: "50%",
                        top: "0",
                        width: "clamp(520px, 18vw, 220px)",
                        height: "55vh",
                        animation: "floatBook 5s ease-in-out infinite",
                        filter: `
              drop-shadow(0 0 18px rgba(80, 120, 255, 0.60))
              drop-shadow(0 0 40px rgba(60, 80, 220, 0.38))
              drop-shadow(0 0  8px rgba(120, 160, 255, 0.75))
            `,
                        paddingTop: "3.875rem",
                    }}
                >
                    <img
                        src={BOOK_MOCKUP}
                        alt="Book Mockup"
                        className="w-full h-full object-cover object-top"
                        style={{ height: "600px", width: "900px" }}
                    />
                </div>

                <div className="flex-grow" />

                {/* ── BOTTOM CARD ── */}
                <div
                    className="relative mt-10 mx-3.5 mb-5.5 rounded-[22px] overflow-hidden flex-shrink-0"
                    style={{ height: "44vh", minHeight: "330px", zIndex: 10 }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                radial-gradient(ellipse at 0% 50%,  #1B465F 0%, transparent 38%),
                radial-gradient(ellipse at 20% 100%, #205270 0%, transparent 36%),
                radial-gradient(ellipse at 75% 0%,   #14384C 0%, transparent 42%),
                radial-gradient(ellipse at 100% 65%, #1A4259 0%, transparent 40%),
                radial-gradient(ellipse at 50% 50%,  #102838 0%, transparent 55%),
                #0A1A24
              `,
                            zIndex: 0,
                        }}
                    />

                    {[
                        { left: "-4%", width: "25%", background: "linear-gradient(170deg,#205270,#102838)", transform: "rotate(-8deg)", opacity: 0.7 },
                        { left: "17%", width: "18%", background: "linear-gradient(170deg,#2A6A89,#14384C)", transform: "rotate(-8deg)", opacity: 0.5 },
                        { right: "2%", width: "35%", background: "linear-gradient(170deg,#1B465F,#0E2432)", transform: "rotate(-10deg)", opacity: 0.62 },
                        { right: "27%", width: "26%", background: "linear-gradient(170deg,#245D78,#112B3C)", transform: "rotate(-8deg)", opacity: 0.48 },
                    ].map((sl, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{ height: "200%", top: "-50%", transformOrigin: "top left", zIndex: 1, ...sl }}
                        />
                    ))}

                    <div className="absolute bottom-20 left-7 max-w-[350px]" style={{ zIndex: 20 }}>
                        <p className="text-white/90 text-[16.5px] leading-relaxed font-sans">
                            Writing a book is only one part of the journey. Many authors struggle with editing, design, and getting their work noticed. Bristol Publishers helps you move forward with clear steps, reliable support, and complete book publishing services designed to take your manuscript to market.
                        </p>
                    </div>

                    <div className="absolute bottom-35 flex flex-row gap-3 right-10 max-w-[350px]" style={{ zIndex: 20 }}>
                        <button
                            className="px-8 py-3.5 rounded-full text-white text-sm transition-all duration-200 hover:opacity-90"
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                letterSpacing: "0.04em",
                                fontWeight: 600,
                                background: "linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%)",
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Hero;