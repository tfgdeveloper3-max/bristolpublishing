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

  /* Smooth transitions for Pop-up & Hover */
  .tcard {
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1),
                box-shadow  0.55s ease,
                border-color 0.55s ease,
                opacity 0.55s ease;
    transform-origin: center bottom;
  }

  .tcard:hover {
    transform: translateY(-22px) scale(1.08) !important;
    box-shadow: 0 40px 80px rgba(255,69,69,0.35), 0 0 0 1px rgba(255,69,69,0.6) !important;
    border-color: rgba(255,69,69,0.5) !important;
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
        name: "Sarah Mitchell", role: "Fantasy Author", avatar: "/images/testimonials/sarah.jpg",
        initials: "SM", color: "#cf7a58", rating: 5, book: "The Ember Chronicles", tag: "Publishing",
        text: "Working with Bristol Publishers made the book publishing process seamless. I finally saw my book published without feeling lost. Their support was exceptional every step of the way.",
    },
    {
        name: "Michael David", role: "Business Writer", avatar: "/images/testimonials/michael.jpg",
        initials: "MD", color: "#3b5fa0", rating: 5, book: "The Mindset Blueprint", tag: "Ghostwriting",
        text: "Their team guided me step by step — from editing and formatting to publishing and marketing. The support helped my book reach more readers than I ever imagined. Highly recommended!",
    },
    {
        name: "Amanda Lewis", role: "Memoir Author", avatar: "/images/testimonials/amanda.jpg",
        initials: "AL", color: "#6ea88a", rating: 5, book: "Between Two Worlds", tag: "Formatting",
        text: "I had no idea where to begin after writing my manuscript. Bristol Publishers helped me move forward with absolute clarity and the most professional support I've ever experienced.",
    },
    {
        name: "James Harrington", role: "Sci-Fi Novelist", avatar: "/images/testimonials/james.jpg",
        initials: "JH", color: "#7b5ea8", rating: 5, book: "Void Architect", tag: "Cover Design",
        text: "The cover design team completely understood my vision. The result was stunning — exactly what I'd imagined but couldn't articulate. Sales speak for themselves: bestseller in week one.",
    },
    {
        name: "Priya Nair", role: "Self-Help Author", avatar: "/images/testimonials/priya.jpg",
        initials: "PN", color: "#a87b3e", rating: 5, book: "Rewrite Your Story", tag: "Marketing",
        text: "From my very first call, I felt heard and supported. The marketing campaign they built for my book was strategic, targeted, and delivered real results. I couldn't be happier.",
    },
    {
        name: "Thomas Brennan", role: "Audio Book Creator", avatar: "/images/testimonials/thomas.jpg",
        initials: "TB", color: "#3e8aa8", rating: 5, book: "Deep Ocean Silence", tag: "Audio Book",
        text: "The audio production quality blew me away. Professional narration, perfect mastering, distributed everywhere. Bristol Publishers turned my words into a listening experience people love.",
    },
];

// Infinite loop ke liye 3 clones
const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const StarRating: React.FC<{ count: number }> = ({ count }) => (
    <div style={{ display: "flex", gap: "4px" }}>
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FF4545" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ))}
    </div>
);

const AUTO_DELAY = 4500;

const Testimonials: React.FC = () => {
    const { ref, visible } = useInView(0.08);
    const trackRef = useRef<HTMLDivElement>(null);

    // Dimensions state for pixel-perfect sliding
    const [dims, setDims] = useState({ itemWidth: 0, stepSize: 0 });

    const [active, setActive] = useState(TESTIMONIALS.length);
    const [enableTransition, setEnableTransition] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Calculate exact widths on mount & resize
    useEffect(() => {
        function calculateDims() {
            if (trackRef.current) {
                const containerWidth = trackRef.current.parentElement?.offsetWidth || 1200;
                const gap = 20;
                const itemW = (containerWidth - 2 * gap) / 3;
                setDims({ itemWidth: itemW, stepSize: itemW + gap });
            }
        }
        calculateDims();
        window.addEventListener('resize', calculateDims);

        setEnableTransition(false);
        setTimeout(() => setEnableTransition(true), 50);

        return () => window.removeEventListener('resize', calculateDims);
    }, []);

    const next = useCallback(() => {
        setEnableTransition(true);
        setActive(prev => prev + 1);
    }, []);

    const prev = useCallback(() => {
        setEnableTransition(true);
        setActive(prev => prev - 1);
    }, []);

    const goTo = useCallback((index: number) => {
        setEnableTransition(true);
        setActive(TESTIMONIALS.length + index);
    }, []);

    // Auto-play logic
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(next, AUTO_DELAY);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [active, next]);

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.propertyName !== 'transform') return;

        let jumpTo = null;
        if (active >= TESTIMONIALS.length * 2) {
            jumpTo = active - TESTIMONIALS.length;
        } else if (active < TESTIMONIALS.length) {
            jumpTo = active + TESTIMONIALS.length;
        }

        if (jumpTo !== null) {
            setEnableTransition(false);
            setActive(jumpTo);
        }
    };

    const translateX = -(active - 1) * dims.stepSize;

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
                <div style={{ position: "absolute", top: "10%", left: "-8%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,69,69,0.06) 0%, transparent 65%)", animation: "orbPulse 7s ease-in-out infinite", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "5%", right: "-6%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 70%)", pointerEvents: "none", opacity: 0.15 }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

                    <div style={{ marginBottom: "64px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.6s ease forwards" : "none" }}>
                            <div style={{ height: "2px", background: "#FF4545", width: visible ? "48px" : "0", transition: "width 0.8s ease 0.2s" }} />
                            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.25em", color: "#FF4545" }}>AUTHOR STORIES</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
                            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)", letterSpacing: "-0.02em", lineHeight: 0.9, color: "white", margin: 0 }}>
                                {visible && (
                                    <>
                                        <SplitText text="What Authors" className="text-[#0A0A0A]" delay={35} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" />
                                        <br />
                                        <SplitText text="Experienced" className="text-[#FF4545]" delay={42} duration={1.2} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" />
                                    </>
                                )}
                            </h2>
                        </div>
                    </div>

                    {/* SLIDER CONTAINER - Added paddingTop: "40px" so card doesn't cut off at the top */}
                    <div style={{ marginBottom: "44px", overflow: "hidden", paddingTop: "40px" }}>
                        <div
                            ref={trackRef}
                            onTransitionEnd={handleTransitionEnd}
                            style={{
                                display: "flex",
                                gap: "20px",
                                transform: `translateX(${translateX}px)`,
                                transition: enableTransition ? "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
                                willChange: "transform"
                            }}
                        >
                            {ITEMS.map((t, index) => {
                                const isCenter = index === active;
                                return (
                                    <div
                                        key={`item-${index}`}
                                        className="tcard"
                                        style={{
                                            flex: `0 0 ${dims.itemWidth}px`,
                                            borderRadius: "22px",
                                            padding: "32px 30px 28px",
                                            border: `1px solid ${isCenter ? "rgba(255,69,69,0.4)" : "rgba(255,255,255,0.07)"}`,
                                            background: isCenter ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
                                            boxShadow: isCenter
                                                ? "0 25px 60px rgba(255,69,69,0.3), 0 0 0 1px rgba(255,69,69,0.5)"
                                                : "0 8px 32px rgba(0,0,0,0.08)",
                                            overflow: "hidden",
                                            backdropFilter: "blur(12px)",
                                            transform: isCenter ? "translateY(-16px) scale(1.06)" : "translateY(0px) scale(0.95)",
                                            opacity: isCenter ? 1 : 0.85,
                                        }}
                                    >
                                        <div style={{ position: "absolute", top: "12px", right: "20px", fontFamily: "Montserrat, serif", fontSize: "8rem", lineHeight: 1, color: "#FF4545", animation: "quoteFloat 4s ease-in-out infinite", userSelect: "none", pointerEvents: "none" }}>"</div>

                                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", position: "relative", zIndex: 2 }}>
                                            <div style={{ position: "relative", flexShrink: 0 }}>
                                                <div style={{ width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden", animation: isCenter ? "avatarGlow 3s ease-in-out infinite" : "none", background: t.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
                                                    <span style={{ position: "absolute", fontFamily: "'Montserrat Neue', sans-serif", fontSize: "1.1rem", color: "#FF4545", letterSpacing: "0.05em" }}>{t.initials}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p style={{ fontFamily: "'Montserrat Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.04em", color: "#FF4545", margin: "0 0 2px" }}>{t.name}</p>
                                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#0A0A0A", margin: 0, fontWeight: 300 }}>{t.role}</p>
                                            </div>
                                            <span style={{ marginLeft: "auto", fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,69,69,0.12)", border: "1px solid rgba(255,69,69,0.25)", color: "#FF4545" }}>{t.tag}</span>
                                        </div>

                                        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(255,69,69,0.3), transparent)", marginBottom: "20px" }} />

                                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", lineHeight: 1.75, color: "#0A0A0A", margin: "0 0 24px", fontWeight: 300, fontStyle: "italic", position: "relative", zIndex: 2 }}>"{t.text}"</p>

                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <StarRating count={t.rating} />
                                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#0A0A0A", fontStyle: "italic" }}>"{t.book}"</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ marginBottom: "28px", height: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                        <div key={`progress-${active}`} style={{ height: "100%", background: "linear-gradient(90deg, #FF4545, #fe5858)", opacity: 0.15, borderRadius: "999px", animation: `progressBar ${AUTO_DELAY}ms linear forwards` }} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                        <button className="nav-btn" onClick={prev} style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,69,69,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>

                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            {TESTIMONIALS.map((_, i) => (
                                <div
                                    key={i}
                                    className="dot-btn"
                                    onClick={() => goTo(i)}
                                    style={{
                                        width: (active % TESTIMONIALS.length) === i ? "28px" : "8px",
                                        height: "8px",
                                        borderRadius: "999px",
                                        background: (active % TESTIMONIALS.length) === i ? "linear-gradient(90deg,#FF4545,#fe5858)" : "rgba(231, 29, 29, 0.2)",
                                    }}
                                />
                            ))}
                        </div>

                        <button className="nav-btn" onClick={next} style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,69,69,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Testimonials;