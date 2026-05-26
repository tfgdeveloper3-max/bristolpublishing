import React, { useEffect, useRef, useState, useCallback } from "react";
import SplitText from "./SplitText";

const testimonialsStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes orbPulse {
    0%, 100% { opacity: 0.45; transform: scale(1);    }
    50%       { opacity: 0.75; transform: scale(1.08); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-60px) scale(0.96); }
    to   { opacity: 1; transform: translateX(0)     scale(1);    }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(60px) scale(0.96); }
    to   { opacity: 1; transform: translateX(0)    scale(1);    }
  }

  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  @keyframes progressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }

  @keyframes avatarGlow {
    0%, 100% { box-shadow: 0 0 0 3px rgba(255,69,69,0.3),  0 0 20px rgba(255,69,69,0.15); }
    50%       { box-shadow: 0 0 0 3px rgba(255,69,69,0.65), 0 0 30px rgba(255,69,69,0.30); }
  }

  @keyframes quoteFloat {
    0%, 100% { transform: translateY(0px);  opacity: 0.12; }
    50%       { transform: translateY(-6px); opacity: 0.18; }
  }

  .tcard {
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                box-shadow  0.4s ease,
                border-color 0.35s ease;
  }

  .tcard:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 40px rgba(255,69,69,0.1) !important;
    border-color: rgba(255,69,69,0.3) !important;
  }

  .nav-btn {
    transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }

  .nav-btn:hover {
    transform: scale(1.08);
    background: rgba(255,69,69,0.18) !important;
    box-shadow: 0 0 24px rgba(255,69,69,0.2) !important;
  }

  .dot-btn {
    transition: all 0.3s ease;
    cursor: pointer;
  }
`;

function useInView(threshold = 0.1) {
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

const TESTIMONIALS = [
    {
        name: "Sarah Mitchell",
        role: "Fantasy Author",
        avatar: "/images/testimonials/sarah.jpg",
        initials: "SM",
        color: "#cf7a58",
        rating: 5,
        text: "Working with Bristol Publishers made the book publishing process seamless. I finally saw my book published without feeling lost. Their support was exceptional every step of the way.",
        book: "The Ember Chronicles",
        tag: "Publishing",
    },
    {
        name: "Michael David",
        role: "Business Writer",
        avatar: "/images/testimonials/michael.jpg",
        initials: "MD",
        color: "#3b5fa0",
        rating: 5,
        text: "Their team guided me step by step — from editing and formatting to publishing and marketing. The support helped my book reach more readers than I ever imagined. Highly recommended!",
        book: "The Mindset Blueprint",
        tag: "Ghostwriting",
    },
    {
        name: "Amanda Lewis",
        role: "Memoir Author",
        avatar: "/images/testimonials/amanda.jpg",
        initials: "AL",
        color: "#6ea88a",
        rating: 5,
        text: "I had no idea where to begin after writing my manuscript. Bristol Publishers helped me move forward with absolute clarity and the most professional support I've ever experienced.",
        book: "Between Two Worlds",
        tag: "Formatting",
    },
    {
        name: "James Harrington",
        role: "Sci-Fi Novelist",
        avatar: "/images/testimonials/james.jpg",
        initials: "JH",
        color: "#7b5ea8",
        rating: 5,
        text: "The cover design team completely understood my vision. The result was stunning — exactly what I'd imagined but couldn't articulate. Sales speak for themselves: bestseller in week one.",
        book: "Void Architect",
        tag: "Cover Design",
    },
    {
        name: "Priya Nair",
        role: "Self-Help Author",
        avatar: "/images/testimonials/priya.jpg",
        initials: "PN",
        color: "#a87b3e",
        rating: 5,
        text: "From my very first call, I felt heard and supported. The marketing campaign they built for my book was strategic, targeted, and delivered real results. I couldn't be happier.",
        book: "Rewrite Your Story",
        tag: "Marketing",
    },
    {
        name: "Thomas Brennan",
        role: "Audio Book Creator",
        avatar: "/images/testimonials/thomas.jpg",
        initials: "TB",
        color: "#3e8aa8",
        rating: 5,
        text: "The audio production quality blew me away. Professional narration, perfect mastering, distributed everywhere. Bristol Publishers turned my words into a listening experience people love.",
        book: "Deep Ocean Silence",
        tag: "Audio Book",
    },
];

const StarRating: React.FC<{ count: number }> = ({ count }) => (
    <div style={{ display: "flex", gap: "4px" }}>
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FF4545" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ))}
    </div>
);

const TrustBadge: React.FC = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
                width: "28px", height: "28px", borderRadius: "5px",
                background: "#FF4545",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </div>
        ))}
    </div>
);

const AUTO_DELAY = 4500;
const VISIBLE = 3;

const Testimonials: React.FC = () => {
    const { ref, visible } = useInView(0.08);
    const [active, setActive] = useState(0);
    const [animDir, setAnimDir] = useState<"left" | "right">("right");
    const [animKey, setAnimKey] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const progressKey = useRef(0);

    const goTo = useCallback((idx: number, dir: "left" | "right") => {
        setAnimDir(dir);
        setAnimKey(k => k + 1);
        progressKey.current += 1;
        setActive(idx);
    }, []);

    const next = useCallback(() => {
        goTo((active + 1) % TESTIMONIALS.length, "right");
    }, [active, goTo]);

    const prev = useCallback(() => {
        goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, "left");
    }, [active, goTo]);

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(next, AUTO_DELAY);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [active, next]);

    const indices = [
        (active) % TESTIMONIALS.length,
        (active + 1) % TESTIMONIALS.length,
        (active + 2) % TESTIMONIALS.length,
    ];

    const cardAnim = (pos: number) => {
        if (animDir === "right") {
            if (pos === 0) return "slideInLeft 0.55s cubic-bezier(0.22,1,0.36,1) forwards";
            if (pos === 1) return "slideInUp   0.55s cubic-bezier(0.22,1,0.36,1) 0.07s forwards";
            if (pos === 2) return "slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) 0.14s forwards";
        } else {
            if (pos === 2) return "slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) forwards";
            if (pos === 1) return "slideInUp    0.55s cubic-bezier(0.22,1,0.36,1) 0.07s forwards";
            if (pos === 0) return "slideInLeft  0.55s cubic-bezier(0.22,1,0.36,1) 0.14s forwards";
        }
        return "none";
    };

    return (
        <>
            <style>{testimonialsStyles}</style>

            <section
                ref={ref}
                style={{
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%)",
                    width: "100%",
                    overflow: "hidden",
                    padding: "100px 0 110px",
                    position: "relative",
                }}
            >
                <div style={{
                    position: "absolute", top: "10%", left: "-8%",
                    width: "500px", height: "500px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.06) 0%, transparent 65%)",
                    animation: "orbPulse 7s ease-in-out infinite",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "5%", right: "-6%",
                    width: "420px", height: "420px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 70%)",
                    pointerEvents: "none",
                    opacity: 0.15,
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", top: "6%", right: "5%",
                    width: "160px", height: "160px",
                    border: "1px dashed rgba(255,69,69,0.1)",
                    borderRadius: "50%",
                    animation: "rotateSlow 20s linear infinite",
                    pointerEvents: "none",
                }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

                    <div style={{ marginBottom: "64px" }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: "12px",
                            marginBottom: "20px",
                            opacity: visible ? 1 : 0,
                            animation: visible ? "fadeUp 0.6s ease forwards" : "none",
                        }}>
                            <div style={{
                                height: "2px", background: "#FF4545",
                                width: visible ? "48px" : "0",
                                transition: "width 0.8s ease 0.2s",
                            }} />
                            <span style={{
                                fontFamily: "'Bebas Neue', sans-serif",
                                fontSize: "0.85rem",
                                letterSpacing: "0.25em",
                                color: "#FF4545",
                            }}>AUTHOR STORIES</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
                            <h2 style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
                                letterSpacing: "-0.02em",
                                lineHeight: 0.9,
                                color: "white",
                                margin: 0,
                            }}>
                                {visible && (
                                    <>
                                        <SplitText
                                            text="What Authors"
                                            className="text-[#0A0A0A]"
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
                                            text="Experienced"
                                            className="text-[#FF4545]"
                                            delay={42}
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

                        </div>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                        marginBottom: "44px",
                    }}>
                        {indices.map((tIdx, pos) => {
                            const t = TESTIMONIALS[tIdx];
                            const isCenter = pos === 1;
                            return (
                                <div
                                    key={`${animKey}-${pos}`}
                                    className="tcard"
                                    style={{
                                        borderRadius: "22px",
                                        padding: "32px 30px 28px",
                                        border: `1px solid ${isCenter ? "rgba(255,69,69,0.3)" : "rgba(255,255,255,0.07)"}`,
                                        boxShadow: isCenter
                                            ? "0 20px 60px rgba(247, 131, 131, 0.7), 0 0 40px rgba(255,69,69,0.08)"
                                            : "0 8px 32px rgba(241, 158, 158, 0.7)",
                                        position: "relative",
                                        overflow: "hidden",
                                        opacity: 0.7,
                                        animation: cardAnim(pos),
                                        backdropFilter: "blur(8px)",
                                        transform: isCenter ? "scale(1.03)" : "scale(1)",
                                    }}
                                >
                                    <div style={{
                                        position: "absolute",
                                        top: "12px", right: "20px",
                                        fontFamily: "Georgia, serif",
                                        fontSize: "8rem",
                                        lineHeight: 1,
                                        color: "#FF4545",
                                        animation: "quoteFloat 4s ease-in-out infinite",
                                        userSelect: "none",
                                        pointerEvents: "none",
                                    }}>"</div>

                                    {isCenter && (
                                        <div style={{
                                            position: "absolute", top: 0, left: 0, right: 0,
                                            height: "3px",
                                            background: "linear-gradient(90deg, #FF4545, transparent)",
                                            borderRadius: "22px 22px 0 0",
                                        }} />
                                    )}

                                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", position: "relative", zIndex: 2 }}>
                                        <div style={{ position: "relative", flexShrink: 0 }}>
                                            <div style={{
                                                width: "56px", height: "56px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                                animation: isCenter ? "avatarGlow 3s ease-in-out infinite" : "none",
                                                background: t.color,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}>
                                                <img
                                                    src={t.avatar}
                                                    alt={t.name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    onError={e => { e.currentTarget.style.display = "none"; }}
                                                />
                                                <span style={{
                                                    position: "absolute",
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    fontSize: "1.1rem",
                                                    color: "#FF4545",
                                                    letterSpacing: "0.05em",
                                                }}>{t.initials}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{
                                                fontFamily: "'Bebas Neue', sans-serif",
                                                fontSize: "1.1rem",
                                                letterSpacing: "0.04em",
                                                color: "#FF4545",
                                                margin: "0 0 2px",
                                            }}>{t.name}</p>
                                            <p style={{
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: "0.75rem",
                                                color: "#0A0A0A",
                                                margin: 0,
                                                fontWeight: 300,
                                            }}>{t.role}</p>
                                        </div>
                                        <span style={{
                                            marginLeft: "auto",
                                            fontFamily: "'Bebas Neue', sans-serif",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.1em",
                                            padding: "4px 12px",
                                            borderRadius: "999px",
                                            background: "rgba(255,69,69,0.12)",
                                            border: "1px solid rgba(255,69,69,0.25)",
                                            color: "#FF4545",
                                        }}>{t.tag}</span>
                                    </div>

                                    <div style={{
                                        height: "1px",
                                        background: "linear-gradient(90deg, rgba(255,69,69,0.3), transparent)",
                                        marginBottom: "20px",
                                    }} />

                                    <p style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.75,
                                        color: "#0A0A0A",
                                        margin: "0 0 24px",
                                        fontWeight: 300,
                                        fontStyle: "italic",
                                        position: "relative", zIndex: 2,
                                    }}>"{t.text}"</p>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <StarRating count={t.rating} />
                                        <span style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: "0.72rem",
                                            color: "#0A0A0A",
                                            fontStyle: "italic",
                                        }}>"{t.book}"</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginBottom: "28px", height: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                        <div
                            key={`progress-${active}`}
                            style={{
                                height: "100%",
                                background: "linear-gradient(90deg, #FF4545, #fe5858)",
                                opacity: 0.15,
                                borderRadius: "999px",
                                animation: `progressBar ${AUTO_DELAY}ms linear forwards`,
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>

                        <button
                            className="nav-btn"
                            onClick={prev}
                            style={{
                                width: "48px", height: "48px", borderRadius: "50%",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,69,69,0.7)",
                                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#FF4545",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            {TESTIMONIALS.map((_, i) => (
                                <div
                                    key={i}
                                    className="dot-btn"
                                    onClick={() => goTo(i, i > active ? "right" : "left")}
                                    style={{
                                        width: active === i ? "28px" : "8px",
                                        height: "8px",
                                        borderRadius: "999px",
                                        background: active === i
                                            ? "linear-gradient(90deg,#FF4545,#fe5858)"
                                            : "rgba(231, 29, 29, 0.2)",
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            className="nav-btn"
                            onClick={next}
                            style={{
                                width: "48px", height: "48px", borderRadius: "50%",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,69,69,0.7)",
                                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#FF4545",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Testimonials;