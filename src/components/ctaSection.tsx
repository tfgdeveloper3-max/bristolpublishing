import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const ctaStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes floatMockup {
    0%, 100% { transform: translateY(0px);    }
    50%       { transform: translateY(-14px); }
  }

  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%;   }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%;   }
  }

  @keyframes pulseDot {
    0%, 100% { transform: scale(1);   opacity: 0.6; }
    50%       { transform: scale(1.4); opacity: 1;   }
  }

  .cta-btn-primary {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.12em;
    font-size: 1rem;
    padding: 14px 38px;
    border-radius: 999px;
    background: white;
    color: #FF4545;
    border: none;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    box-shadow: 0 6px 28px rgba(255,255,255,0.15);
    white-space: nowrap;
  }

  .cta-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(255,255,255,0.25);
    background: #fff0f0;
  }

  .cta-btn-secondary {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.08em;
    font-size: 1rem;
    padding: 12px 38px;
    border-radius: 999px;
    background: transparent;
    color: rgba(255,255,255,0.75);
    border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer;
    transition: transform 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    white-space: nowrap;
  }

  .cta-btn-secondary:hover {
    transform: translateY(-3px);
    border-color: rgba(255,255,255,0.6);
    color: white;
  }
`;

function useInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

const CTABanner: React.FC = () => {
    const { ref, visible } = useInView(0.12);

    return (
        <>
            <style>{ctaStyles}</style>

            <section
                style={{
                    background: "linear-gradient(180deg, #1B465F 0%, #14384C 100%)",
                    width: "100%",
                    padding: "80px 40px 90px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "700px", height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(255,69,69,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div
                    ref={ref}
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        borderRadius: "28px",
                        position: "relative",
                        overflow: "hidden",
                        padding: "2px",
                        background: "linear-gradient(135deg, rgba(255,69,69,0.5), rgba(26,36,95,0.8), rgba(255,69,69,0.3))",
                        backgroundSize: "300% 300%",
                        animation: "shimmerBorder 5s ease infinite",
                    }}
                >
                    <div style={{
                        borderRadius: "26px",
                        background: "linear-gradient(125deg, #1B465F 0%, #16394D 40%, #102A3A 100%)", display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "52px 60px 52px 64px",
                        overflow: "hidden",
                        position: "relative",
                        minHeight: "260px",
                    }}>

                        <div style={{
                            position: "absolute", top: "-40%", left: "-5%",
                            width: "350px", height: "350px", borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(255,69,69,0.09) 0%, transparent 65%)",
                            pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute", bottom: "-30%", right: "25%",
                            width: "300px", height: "300px", borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(26,36,95,0.6) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }} />

                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
                            `,
                            backgroundSize: "50px 50px",
                            pointerEvents: "none",
                        }} />

                        <div style={{ position: "relative", zIndex: 5, maxWidth: "540px", flex: "1" }}>

                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                marginBottom: "22px",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.5s ease forwards" : "none",
                            }}>
                                <span style={{
                                    width: "7px", height: "7px", borderRadius: "50%",
                                    background: "#FF4545",
                                    display: "inline-block",
                                    animation: "pulseDot 2s ease-in-out infinite",
                                }} />
                                <span style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: "0.78rem",
                                    letterSpacing: "0.2em",
                                    color: "rgba(255,255,255,0.5)",
                                }}>NOW ACCEPTING MANUSCRIPTS</span>
                            </div>

                            <h2 style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                                letterSpacing: "-0.01em",
                                lineHeight: 1.03,
                                color: "white",
                                margin: "0 0 18px",
                            }}>
                                {visible && (
                                    <>
                                        <SplitText
                                            text="Your Book Is Not"
                                            delay={30}
                                            duration={1.0}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 35 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-30px"
                                            textAlign="left"
                                        />
                                        <br />
                                        <SplitText
                                            text="Meant To Stay"
                                            delay={35}
                                            duration={1.05}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 35 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-30px"
                                            textAlign="left"
                                        />
                                        <br />
                                        <SplitText
                                            text="Unpublished"
                                            className="text-[#FF4545]"
                                            delay={40}
                                            duration={1.1}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 35 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-30px"
                                            textAlign="left"
                                        />
                                    </>
                                )}
                            </h2>

                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.75,
                                color: "rgba(255,255,255,0.5)",
                                margin: "0 0 34px",
                                fontWeight: 300,
                                maxWidth: "420px",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.7s ease 0.35s forwards" : "none",
                            }}>
                                Take the next step with confidence. Let us help you complete your book,
                                publish it, and reach the readers who are waiting for your story.
                            </p>

                            <div style={{
                                display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.7s ease 0.45s forwards" : "none",
                            }}>
                                <button
                                    className="px-10 py-3.5 rounded-full text-white text-sm transition-all duration-200 hover:opacity-90"
                                    style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        letterSpacing: "0.25em",
                                        background: "linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%)",
                                    }}
                                >
                                    Get Started
                                </button>
                                <button className="cta-btn-secondary">LEARN MORE</button>
                            </div>
                        </div>

                        <div style={{
                            position: "absolute",
                            right: "40px",
                            bottom: "20px",
                            height: "400px",
                            zIndex: 4,
                            animation: "floatMockup 5s ease-in-out infinite",
                            filter: `
                                drop-shadow(-20px 10px 50px rgba(0,0,0,0.7))
                                drop-shadow(0 0 30px rgba(255,69,69,0.12))
                            `,
                            pointerEvents: "none",
                        }}>
                            <img
                                src="/images/Portfolio/MOCKUP.png"
                                alt="Book and tablet mockup"
                                style={{
                                    height: "400px",
                                    width: "auto",
                                    objectFit: "contain",
                                    objectPosition: "top right",
                                }}
                            />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default CTABanner;