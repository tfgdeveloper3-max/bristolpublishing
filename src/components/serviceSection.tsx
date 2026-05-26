import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const servicesStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(50px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);     }
  }

  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 48px; }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }

  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px);   }
    50%       { transform: translateY(-6px); }
  }

  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  @keyframes orbPulse {
    0%, 100% { transform: scale(1);    opacity: 0.5; }
    50%       { transform: scale(1.1); opacity: 0.8; }
  }

  .srv-card {
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                box-shadow  0.35s cubic-bezier(0.22,1,0.36,1),
                border-color 0.35s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
  }

  .srv-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,69,69,0.18) 0%, rgba(255,69,69,0.08) 100%);
    opacity: 0;
    transition: opacity 0.35s ease;
    border-radius: inherit;
    pointer-events: none;
  }

  .srv-card:hover {
    transform: translateY(-10px) scale(1.015);
    box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(255,69,69,0.18);
    border-color: rgba(255,69,69,0.45) !important;
    background: rgba(255,69,69,0.08) !important;
  }

  .srv-card:hover::before { opacity: 1; }

  .srv-card:hover .srv-icon-wrap {
    animation: iconFloat 2s ease-in-out infinite;
    box-shadow: 0 8px 32px rgba(255,69,69,0.3) !important;
  }

  .srv-card:hover .srv-arrow {
    opacity: 1 !important;
    transform: translate(0, 0) !important;
  }

  .srv-card:hover .srv-num {
    color: rgba(255,69,69,0.15) !important;
  }

  .srv-card:hover .srv-line {
    width: 100% !important;
  }

  .srv-line {
    transition: width 0.4s ease;
  }

  .featured-card {
    background: linear-gradient(135deg, #FF4545 0%, #c42020 100%) !important;
    border-color: transparent !important;
  }

  .featured-card .srv-num   { color: rgba(255,255,255,0.12) !important; }
  .featured-card .srv-title { color: white !important; }
  .featured-card .srv-desc  { color: rgba(255,255,255,0.75) !important; }
  .featured-card .srv-tag   { background: rgba(255,255,255,0.15) !important; color: rgba(255,255,255,0.9) !important; border-color: rgba(255,255,255,0.2) !important; }
  .featured-card .srv-icon-wrap { background: rgba(255,255,255,0.15) !important; box-shadow: none !important; }
  .featured-card .srv-icon  { color: white !important; }
  .featured-card .srv-arrow { color: white !important; }
  .featured-card .srv-line  { background: rgba(255,255,255,0.25) !important; }
  .featured-card:hover { box-shadow: 0 30px 80px rgba(255,69,69,0.4), 0 0 60px rgba(255,69,69,0.25) !important; }
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

const SERVICES = [
    {
        num: "01",
        title: "Book Publishing",
        desc: "We handle the full publishing process, helping you release your book in digital and print formats. If your goal is to publish your book without confusion or delays, our team ensures your work is properly listed, accessible, and ready for readers worldwide.",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        featured: false,
    },
    {
        num: "02",
        title: "Book Cover Design",
        desc: "A strong cover helps your book stand out. We create designs that match your genre, connect with readers, and give your book a professional and appealing first impression.",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
        featured: false,
    },
    {
        num: "03",
        title: "Writing",
        desc: "If you have an idea but need help writing it, our ghostwriters can assist. We work closely with you to shape your story, message, or concept into a complete manuscript so you can confidently say, “I'm ready to publish my book.”",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" />
            </svg>
        ),
        featured: false,
    },
    {
        num: "04",
        title: "Editing and Proofreading",
        desc: "We review your manuscript for clarity, structure, and grammar. Our editing services improve readability while keeping your voice consistent throughout the book.",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
        ),
        featured: false,
    },
    {
        num: "05",
        title: "Book Marketing",
        desc: "We offer strategic book promotion services, including PR writing, articles, and social media content. Our goal is to increase visibility and connect your book with the right audience.",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        featured: false,
    },
    {
        num: "06",
        title: "Audiobook Services",
        desc: "We convert your book into an audiobook and create trailers to support promotion. This helps you reach listeners who prefer audio content.",
        icon: (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
        ),
        featured: false,
    },
];

const Services: React.FC = () => {
    const { ref, visible } = useInView(0.08);

    return (
        <>
            <style>{servicesStyles}</style>

            <section
                ref={ref}
                style={{
                    background: "linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%)", overflow: "hidden",
                    padding: "100px 0 110px",
                    position: "relative",
                }}
            >
                <div style={{
                    position: "absolute", top: "15%", right: "-8%",
                    width: "500px", height: "500px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.06) 0%, transparent 65%)",
                    animation: "orbPulse 6s ease-in-out infinite",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "10%", left: "-6%",
                    width: "400px", height: "400px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(27, 70, 95, 0.55) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "12%", right: "6%",
                    width: "160px", height: "160px",
                    border: "1px dashed rgba(255,69,69,0.12)",
                    borderRadius: "50%",
                    animation: "rotateSlow 18s linear infinite",
                    pointerEvents: "none",
                }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

                    <div style={{ marginBottom: "72px" }}>
                        <div
                            style={{
                                display: "flex", alignItems: "center", gap: "12px",
                                marginBottom: "22px",
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.6s ease forwards" : "none",
                            }}
                        >
                            <div style={{
                                height: "2px",
                                background: "#FF4545",
                                width: visible ? "48px" : "0",
                                transition: "width 0.8s ease 0.2s",
                            }} />
                            <span style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: "0.85rem",
                                letterSpacing: "0.25em",
                                color: "#FF4545",
                            }}>WHAT WE OFFER</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
                            <h2 style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.07,
                                color: "white",
                                margin: 0,
                            }}>
                                {visible && (
                                    <>
                                        <SplitText
                                            text="All-in-One Publishing"
                                            delay={35}
                                            duration={1.1}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 45 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-50px"
                                            textAlign="left"
                                        />
                                        <br />
                                        <SplitText
                                            text="Services"
                                            className="text-[#FF4545]"
                                            delay={40}
                                            duration={1.2}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 45 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-50px"
                                            textAlign="left"
                                        />
                                        {" "}
                                        <SplitText
                                            text="You Can Rely On"
                                            delay={40}
                                            duration={1.2}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 45 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-50px"
                                            textAlign="left"
                                        />
                                    </>
                                )}
                            </h2>

                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "1.1rem",
                                lineHeight: 1.75,
                                color: "rgba(255,255,255,0.45)",
                                maxWidth: "360px",
                                margin: 0,
                                fontWeight: 300,
                                opacity: visible ? 1 : 0,
                                animation: visible ? "fadeUp 0.7s ease 0.3s forwards" : "none",
                            }}>
                                We support authors at every stage of the publishing journey. Our publishing services are designed to help you complete your book, present it professionally, and reach readers across the USA and global markets.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                    }}>
                        {SERVICES.map((s, i) => (
                            <div
                                key={i}
                                className={`srv-card${s.featured ? " featured-card" : ""}`}
                                style={{
                                    background: s.featured
                                        ? undefined
                                        : "rgba(255,255,255,0.025)",
                                    border: `1px solid ${s.featured ? "transparent" : "rgba(255,255,255,0.07)"}`,
                                    borderRadius: "20px",
                                    padding: "32px 28px 28px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0",
                                    opacity: visible ? 1 : 0,
                                    animation: visible
                                        ? `cardReveal 0.65s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.08}s forwards`
                                        : "none",
                                    backdropFilter: s.featured ? "none" : "blur(8px)",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                                    <span
                                        className="srv-num"
                                        style={{
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: "3.5rem",
                                            lineHeight: 1,
                                            color: "rgba(255,255,255,0.06)",
                                            letterSpacing: "-0.02em",
                                            transition: "color 0.35s ease",
                                            userSelect: "none",
                                        }}
                                    >{s.num}</span>

                                    <div
                                        className="srv-icon-wrap"
                                        style={{
                                            width: "52px", height: "52px",
                                            borderRadius: "14px",
                                            background: s.featured ? "rgba(255,255,255,0.15)" : "rgba(255,69,69,0.12)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            boxShadow: s.featured ? "none" : "0 4px 20px rgba(255,69,69,0.15)",
                                            transition: "box-shadow 0.35s ease",
                                        }}
                                    >
                                        <span
                                            className="srv-icon"
                                            style={{ color: s.featured ? "white" : "#FF4545" }}
                                        >
                                            {s.icon}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="srv-line"
                                    style={{
                                        height: "1px",
                                        width: "40px",
                                        background: s.featured ? "rgba(255,255,255,0.25)" : "rgba(255,69,69,0.35)",
                                        marginBottom: "20px",
                                        borderRadius: "999px",
                                    }}
                                />

                                <h3
                                    className="srv-title"
                                    style={{
                                        fontFamily: "'Bebas Neue', sans-serif",
                                        fontSize: "1.55rem",
                                        letterSpacing: "0.03em",
                                        color: "white",
                                        margin: "0 0 12px",
                                        lineHeight: 1.1,
                                    }}
                                >{s.title}</h3>

                                <p
                                    className="srv-desc"
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.88rem",
                                        lineHeight: 1.7,
                                        color: "rgba(255,255,255,0.5)",
                                        margin: "0 0 20px",
                                        fontWeight: 300,
                                        flexGrow: 1,
                                    }}
                                >{s.desc}</p>

                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                    <span
                                        className="srv-arrow"
                                        style={{
                                            color: s.featured ? "white" : "#FF4545",
                                            opacity: 0,
                                            transform: "translate(-6px, 6px)",
                                            transition: "opacity 0.3s ease, transform 0.3s ease",
                                            display: "flex", alignItems: "center", gap: "6px",
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: "0.85rem",
                                            letterSpacing: "0.1em",
                                        }}
                                    >
                                        LEARN MORE
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            marginTop: "64px",
                            padding: "36px 48px",
                            borderRadius: "20px",
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "24px",
                            flexWrap: "wrap",
                            opacity: visible ? 1 : 0,
                            animation: visible ? "fadeUp 0.7s ease 0.75s forwards" : "none",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <div>
                            <p style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: "1.6rem",
                                color: "white",
                                margin: "0 0 4px",
                                letterSpacing: "0.02em",
                            }}>
                                Not sure which service fits your needs?
                            </p>
                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.88rem",
                                color: "rgba(255,255,255,0.4)",
                                margin: 0,
                                fontWeight: 300,
                            }}>
                            </p>
                        </div>
                        <button
                            style={{
                                fontFamily: "'Montserrat', sans-serif",
                                letterSpacing: "0.1em",
                                fontSize: "1rem",
                                padding: "14px 36px",
                                borderRadius: "999px",
                                background: "linear-gradient(90deg, #FF4545, #fe5858)",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                                transition: "opacity 0.2s ease, transform 0.2s ease",
                                boxShadow: "0 8px 32px rgba(255,69,69,0.3)",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                            }}
                        >
                            GET FREE CONSULTATION
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;