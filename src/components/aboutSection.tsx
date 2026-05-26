import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const aboutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0);     }
  }

  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0);    }
  }

  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 72px; }
  }

  @keyframes counterUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes imageShineSweep {
    0%   { left: -100%; }
    100% { left: 200%;  }
  }

  @keyframes borderPulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1;   }
  }

  @keyframes floatBadge {
    0%, 100% { transform: translateY(0px);    }
    50%       { transform: translateY(-8px); }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }

  /* Animated Gradient for CTA Button */
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .about-img-wrap:hover .about-shine {
    animation: imageShineSweep 0.7s ease forwards;
  }

  .stat-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(255,69,69,0.15);
  }
  .service-pill {
    background: #FF4545;
    display: inline-block;
    transition: all 0.25s ease;
  }
  .service-pill:hover {
    background: #ffffff !important;
    color: #FF4545 !important;
    border-color: rgba(255,69,69,0.8) !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255,69,69,0.35);
  }
  .cta-btn {
    background: linear-gradient(270deg, #FF4545, #f19696ff, #FF4545);
    background-size: 300% 300%;
    animation: gradientShift 4s ease infinite;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 30px rgba(255,69,69,0.6);
  }

  /* Team Link Hover */
  .team-link {
    transition: color 0.2s ease, transform 0.2s ease;
  }
  .team-link:hover {
    color: #FF4545 !important;
    transform: translateX(4px);
  }
`;

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

const Counter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({
    target, suffix = "", duration = 1800,
}) => {
    const [count, setCount] = useState(0);
    const { ref, visible } = useInView(0.3);
    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [visible, target, duration]);
    return <span ref={ref}>{count}{suffix}</span>;
};

const STATS = [
    { value: 1200, suffix: "+", label: "Books Published" },
    { value: 98, suffix: "%", label: "Author Satisfaction" },
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 40, suffix: "+", label: "Countries Reached" },
];

const PILLS = ["Publishing", "Ghostwriting", "Cover Design", "Marketing", "Audio Books", "Formatting"];

const AboutSection: React.FC = () => {
    const { ref: sectionRef, visible } = useInView(0.1);

    return (
        <>
            <style>{aboutStyles}</style>

            <section
                ref={sectionRef}
                style={{
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%)",
                    width: "100%",
                    overflow: "hidden",
                    padding: "100px 0 80px",
                    position: "relative",
                }}
            >
                <div style={{
                    position: "absolute", top: "10%", left: "-5%",
                    width: "400px", height: "400px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "5%", right: "-5%",
                    width: "500px", height: "500px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 70%)",
                    opacity: 0.15,
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", top: "8%", right: "4%",
                    width: "180px", height: "180px",
                    border: "1px dashed rgba(255,69,69,0.15)",
                    borderRadius: "50%",
                    animation: "rotateSlow 20s linear infinite",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", top: "10%", right: "5.6%",
                    width: "140px", height: "140px",
                    border: "1px dashed rgba(255,255,255,0.05)",
                    borderRadius: "50%",
                    animation: "rotateSlow 14s linear infinite reverse",
                    pointerEvents: "none",
                }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

                    <div
                        style={{
                            display: "flex", alignItems: "center", gap: "12px",
                            marginBottom: "24px",
                            opacity: visible ? 1 : 0,
                            animation: visible ? "fadeUp 0.6s ease forwards" : "none",
                        }}
                    >
                        <div style={{
                            width: visible ? "32px" : "0",
                            height: "2px",
                            background: "#FF4545",
                            transition: "width 0.8s ease 0.2s",
                        }} />
                        <span style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "0.85rem",
                            letterSpacing: "0.25em",
                            color: "#FF4545",
                        }}>
                            ABOUT US
                        </span>
                    </div>

                    <div style={{ marginBottom: "64px" }}>
                        <h2 style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(3rem, 6vw, 5.5rem)",
                            letterSpacing: "-0.02em",
                            lineHeight: 0.9,
                            color: "white",
                            margin: 0,
                        }}>
                            {visible && (
                                <>
                                    <SplitText
                                        text="Where Authors Get"
                                        className="text-[#0A0A0A]"
                                        delay={35}
                                        duration={1.1}
                                        ease="power3.out"
                                        splitType="chars"
                                        from={{ opacity: 0, y: 50 }}
                                        to={{ opacity: 1, y: 0 }}
                                        threshold={0.1}
                                        rootMargin="-50px"
                                        textAlign="left"
                                    />
                                    <br />
                                    <span style={{ display: "inline-flex", alignItems: "baseline", gap: "0.3em" }}>
                                        <SplitText
                                            text="Stuck"
                                            className="text-[#FF4545]"
                                            delay={45}
                                            duration={1.2}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 60 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-50px"
                                            textAlign="left"
                                        />
                                    </span>
                                </>
                            )}
                        </h2>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "60px",
                        alignItems: "start",
                    }}>

                        <div
                            style={{
                                position: "relative",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeLeft 0.9s ease 0.3s forwards" : "none",
                            }}
                        >
                            <div
                                className="about-img-wrap"
                                style={{
                                    position: "relative",
                                    width: "78%",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,69,69,0.2)",
                                    animation: "borderPulse 4s ease-in-out infinite",
                                }}
                            >
                                <img
                                    src="/images/About1.png"
                                    alt="Bristol Publishers team at work"
                                    style={{
                                        width: "100%",
                                        height: "380px",
                                        objectFit: "cover",
                                        display: "block",
                                        filter: "brightness(0.88)",
                                    }}
                                />
                                <div
                                    className="about-shine"
                                    style={{
                                        position: "absolute", top: 0, left: "-100%",
                                        width: "60%", height: "100%",
                                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                                        pointerEvents: "none",
                                    }}
                                />
                                <div style={{
                                    position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
                                    background: "linear-gradient(to top, rgba(255,69,69,0.7),0.7), transparent)",
                                    opacity: 0.15,
                                }} />
                            </div>

                            <div
                                className="about-img-wrap"
                                style={{
                                    position: "absolute",
                                    bottom: "-40px",
                                    right: "0",
                                    width: "52%",
                                    borderRadius: "14px",
                                    overflow: "hidden",
                                    border: "2px solid rgba(255,69,69,0.35)",
                                    boxShadow: "0 20px 60px rgba(255, 177, 177, 0.7), 0 0 30px rgba(255,69,69,0.1)",
                                }}
                            >
                                <img
                                    src="/images/About2.png"
                                    alt="Author writing process"
                                    style={{
                                        width: "100%",
                                        height: "240px",
                                        objectFit: "cover",
                                        display: "block",
                                        filter: "brightness(0.85)",
                                    }}
                                />
                                <div className="about-shine" style={{
                                    position: "absolute", top: 0, left: "-100%",
                                    width: "60%", height: "100%",
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                                    pointerEvents: "none",
                                }} />
                            </div>

                            <div style={{
                                position: "absolute", bottom: "-60px", left: "-20px",
                                display: "grid",
                                gridTemplateColumns: "repeat(6, 10px)",
                                gap: "8px",
                                opacity: 0.75,
                                zIndex: -1,
                            }}>
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div key={i} style={{
                                        width: "3px", height: "3px",
                                        borderRadius: "50%",
                                        background: "#FF4545",
                                    }} />
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                paddingTop: "8px",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeRight 0.9s ease 0.4s forwards" : "none",
                            }}
                        >
                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.8,
                                color: "#0A0A0A",
                                marginBottom: "20px",
                                fontWeight: 300,
                            }}>
                                Many authors feel lost even after finishing a strong manuscript. Editing feels overwhelming, cover design is confusing, and marketing seems out of reach. Without proper guidance, great ideas often stay unpublished or fail to reach the right readers.
                            </p>
                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.8,
                                color: "#0A0A0A",
                                marginBottom: "36px",
                                fontWeight: 300,
                            }}>
                                If you're thinking, "How do I get my book published?" you're not alone. This is exactly where most writers pause. We guide you through each stage with clear direction. From editing to publishing and marketing, our team helps you move forward with confidence so your book reaches the audience it was written for.
                            </p>

                            {/* Pills in 2 rows of 3 */}
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, auto)",
                                gap: "12px",
                                marginBottom: "44px",
                                justifyContent: "start",
                            }}>
                                {PILLS.map((pill, i) => (
                                    <span
                                        key={i}
                                        className="service-pill"
                                        style={{
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: "1rem",
                                            letterSpacing: "0.1em",
                                            color: "#FFFFFF",
                                            padding: "12px 28px",
                                            borderRadius: "999px",
                                            border: "1px solid rgba(255,69,69,0.3)",
                                            cursor: "default",
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </div>

                            <div style={{ marginTop: "36px", display: "flex", gap: "18px", alignItems: "center" }}>
                                <button className="cta-btn" style={{
                                    fontFamily: "'Bebas Neue', sans-serif",
                                    letterSpacing: "0.12em",
                                    fontSize: "1.15rem",
                                    padding: "16px 42px",
                                    borderRadius: "999px",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}>
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutSection;