import React from "react";
import SplitText from "./SplitText";
import LogoBar from "./logobar";

const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`;

const BOOK_MOCKUP = "/images/covers/Book-Mockup.png"

// const AvatarStack: React.FC = () => (
//     <div className="flex items-center">
//         {[
//             { bg: "bg-[#cf7a58]", label: "A" },
//             { bg: "bg-[#3b4060]", label: "B" },
//             { bg: "bg-[#6ea88a]", label: "C" },
//         ].map((av, i) => (
//             <div
//                 key={i}
//                 className={`w-8 h-8 rounded-full border-[2.5px] border-[#f5f0e8] flex items-center justify-center text-white text-[11px] font-bold font-sans ${av.bg}`}
//                 style={{ marginLeft: i === 0 ? 0 : "-8px", position: "relative", zIndex: 3 - i }}
//             >
//                 {av.label}
//             </div>
//         ))}
//         <div
//             className="w-8 h-8 rounded-full border-[2.5px] border-[#f5f0e8] flex items-center justify-center text-white text-[9px] font-bold font-sans"
//             style={{ marginLeft: "-8px", background: "linear-gradient(135deg,#e05500,#ff8800)", position: "relative", zIndex: 0 }}
//         >
//             +10k
//         </div>
//     </div>
// );

const floatAnimationStyle = `
  @keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-50px); }
  }
  @keyframes floatBook {
    0%, 100% { transform: translateX(-50%) translateY(0px); }
    50%       { transform: translateX(-50%) translateY(-22px); }
  }
  @keyframes neonPulse {
    0%, 100% {
      filter:
        drop-shadow(0 0 14px rgba(80, 120, 255, 0.65))
        drop-shadow(0 0 35px rgba(60, 80, 220, 0.40))
        drop-shadow(0 0 6px rgba(140, 170, 255, 0.80));
    }
    50% {
      filter:
        drop-shadow(0 0 22px rgba(100, 140, 255, 0.90))
        drop-shadow(0 0 55px rgba(80, 110, 255, 0.55))
        drop-shadow(0 0 10px rgba(160, 190, 255, 1.00));
    }
  }
`;

const MembersCard: React.FC = () => (
    <>
        <style>{floatAnimationStyle}</style>
    </>
);

const Hero: React.FC = () => {
    return (
        <>
            <style>{fontStyle}</style>
            <section
                className="relative bg-gradient-to-b from-[#040517] to-[#030726] w-full flex flex-col overflow-hidden pt-5"
            >
                <div
                    className="relative px-9 z-10 flex-shrink-0"
                    style={{ paddingTop: "10rem" }}
                >
                    <h1
                        className="text-white uppercase flex justify-between w-full leading-[0.85]"
                        style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(5rem, 10vw, 8rem)",
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
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(2rem, 6vw, 4rem)",
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

                <div
                    className="absolute pointer-events-none pt-15.5"
                    style={{
                        zIndex: 20,
                        bottom: "",
                        top: "",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "clamp(520px, 18vw, 220px)",
                        height: "55vh",
                        animation: "floatBook 5s ease-in-out infinite",
                        filter: `
                            drop-shadow(0 0 18px rgba(80, 120, 255, 0.60))
                            drop-shadow(0 0 40px rgba(60, 80, 220, 0.38))
                            drop-shadow(0 0  8px rgba(120, 160, 255, 0.75))
                        `,
                    }}
                >
                    <img
                        src={BOOK_MOCKUP}
                        alt="Podcast host"
                        className="w-full h-full object-cover object-top"
                        style={
                            {
                                height: "600px",
                                width: "900px",
                            }
                        }
                    />
                </div>

                <div className="flex-grow" />

                <div className="relative mt-10 mx-3.5 mb-5.5 rounded-[22px] overflow-hidden flex-shrink-0" style={{ height: "44vh", minHeight: "330px" }}>

                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                              radial-gradient(ellipse at 0% 50%,  #1a245f 0%, transparent 38%),
                              radial-gradient(ellipse at 20% 100%, #30205f 0%, transparent 36%),
                              radial-gradient(ellipse at 75% 0%,   #17385f 0%, transparent 42%),
                              radial-gradient(ellipse at 100% 65%, #2a1d4f 0%, transparent 40%),
                              radial-gradient(ellipse at 50% 50%,  #0d1a42 0%, transparent 55%),
                              #040517
                            `,
                            zIndex: 0,
                        }}
                    />

                    {[
                        {
                            left: "-4%",
                            width: "25%",
                            background: "linear-gradient(170deg,#243a8a,#101f52)",
                            transform: "rotate(-8deg)",
                            opacity: 0.7
                        },
                        {
                            left: "17%",
                            width: "18%",
                            background: "linear-gradient(170deg,#4a2b8a,#24134d)",
                            transform: "rotate(-8deg)",
                            opacity: 0.5
                        },
                        {
                            right: "2%",
                            width: "35%",
                            background: "linear-gradient(170deg,#13538a,#0b244f)",
                            transform: "rotate(-10deg)",
                            opacity: 0.62
                        },
                        {
                            right: "27%",
                            width: "26%",
                            background: "linear-gradient(170deg,#26386b,#121d42)",
                            transform: "rotate(-8deg)",
                            opacity: 0.48
                        },
                    ].map((sl, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                height: "200%",
                                top: "-50%",
                                transformOrigin: "top left",
                                zIndex: 1,
                                ...sl
                            }}
                        />
                    ))}
                    <div className="absolute bottom-35 flex flex-row gap-3 left-10  max-w-[350px]" style={{ zIndex: 20 }}>
                        <button
                            className="px-10 py-3.5 rounded-full text-white text-sm transition-all duration-200 hover:opacity-90"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                letterSpacing: "0.08em",
                                background: "linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%)",
                            }}
                        >
                            Get Started
                        </button>

                        <button
                            className="px-8 py-3.5 rounded-full text-white text-sm transition-all duration-200 hover:opacity-90"
                            style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                letterSpacing: "0.08em",
                                background: "linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%)",
                            }}
                        >
                            +99 123 456 789
                        </button>
                    </div>
                    <div className="absolute bottom-20 right-10  max-w-[350px]" style={{ zIndex: 20 }}>
                        <p className="text-white/90 text-[16.5px] leading-relaxed font-sans">
                            Writing a book is only one part of the journey. Many authors struggle with editing, design, and getting their work noticed. Bristol Publishers helps you move forward with clear steps, reliable support, and complete book publishing services designed to take your manuscript to market.
                        </p>
                    </div>

                    <MembersCard />
                </div>

                <LogoBar />
            </section>
        </>
    );
};

export default Hero;