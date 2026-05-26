import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const portfolioStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes orbPulse {
    0%, 100% { transform: scale(1);    opacity: 0.4; }
    50%       { transform: scale(1.12); opacity: 0.7; }
  }

  .portfolio-img-card {
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    cursor: grab;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
    user-select: none;
    -webkit-user-select: none;
  }

  .portfolio-img-card:hover {
    transform: scale(1.04) translateY(-6px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(255,69,69,0.2);
    z-index: 10;
  }

  .portfolio-img-card img {
    display: block;
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
    filter: brightness(0.82) saturate(0.9);
    pointer-events: none;
  }

  .portfolio-img-card:hover img {
    transform: scale(1.08);
    filter: brightness(1) saturate(1.1);
  }

  .portfolio-img-card .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(4,5,23,0.85) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.35s ease;
    display: flex;
    align-items: flex-end;
    padding: 16px;
  }

  .portfolio-img-card:hover .overlay {
    opacity: 1;
  }

  .portfolio-img-card .overlay-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
    color: white;
    line-height: 1.1;
  }

  .portfolio-img-card .overlay-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: #FF4545;
    margin-top: 2px;
  }

  .edge-fade-left {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 120px;
    background: linear-gradient(to right, #040517, transparent);
    z-index: 10;
    pointer-events: none;
  }

  .edge-fade-right {
    position: absolute;
    right: 0; top: 0; bottom: 0;
    width: 120px;
    background: linear-gradient(to left, #040517, transparent);
    z-index: 10;
    pointer-events: none;
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

const ROW_TOP: { src: string; title: string; genre: string }[] = [
    { src: "/images/Portfolio/01.jpg", title: "Reflections", genre: "Fantasy" },
    { src: "/images/Portfolio/02.jpg", title: "The Man From ST. Claus", genre: "Thriller" },
    { src: "/images/Portfolio/03.jpg", title: "Margo", genre: "Adventure" },
    { src: "/images/Portfolio/04.jpg", title: "Casters", genre: "Horror" },
    { src: "/images/Portfolio/05.jpg", title: "Human Resources Professional", genre: "Sci-Fi" },
    { src: "/images/Portfolio/06.jpg", title: "Lady Justice Aya", genre: "Literary" },
    { src: "/images/Portfolio/07.jpg", title: "Yes to Beyond", genre: "Romance" },
    { src: "/images/Portfolio/08.jpg", title: "My Poetry Inspired By Goat", genre: "Mystery" },
    { src: "/images/Portfolio/09.jpg", title: "Mr. TerriTaff", genre: "Self-Help" },
    { src: "/images/Portfolio/10.jpg", title: "From Broken To Redeemed", genre: "History" },
    { src: "/images/Portfolio/11.jpg", title: "Both Sides of the fence", genre: "Children's" },
    { src: "/images/Portfolio/12.jpg", title: "Adjust Your Crown", genre: "Sci-Fi" },
    { src: "/images/Portfolio/13.jpg", title: "Choose Me", genre: "Poetry" },
    { src: "/images/Portfolio/14.jpg", title: "My Testimony", genre: "Fantasy" },
];

const ROW_BOTTOM: { src: string; title: string; genre: string }[] = [
    { src: "/images/Portfolio/15.jpg", title: "The Mirror Within", genre: "Adventure" },
    { src: "/images/Portfolio/16.jpg", title: "Want Me", genre: "Thriller" },
    { src: "/images/Portfolio/17.jpg", title: "Chasing Or Being Chased", genre: "Romance" },
    { src: "/images/Portfolio/18.jpg", title: "Mucho Que Contar", genre: "Sci-Fi" },
    { src: "/images/Portfolio/19.jpg", title: "Awesome", genre: "History" },
    { src: "/images/Portfolio/20.jpg", title: "Green Pastures", genre: "Crime" },
    { src: "/images/Portfolio/21.jpg", title: "The Manifestos", genre: "Literary" },
    { src: "/images/Portfolio/22.jpg", title: "The Cocoon", genre: "Fantasy" },
    { src: "/images/Portfolio/23.jpg", title: "GreenLand", genre: "Psychology" },
    { src: "/images/Portfolio/24.jpg", title: "The Atrocity", genre: "Mystery" },
    { src: "/images/Portfolio/25.jpg", title: "Agony", genre: "Memoir" },
    { src: "/images/Portfolio/26.jpg", title: "Renaissance Man", genre: "Sci-Fi" },
    { src: "/images/Portfolio/27.jpg", title: "The Untold Truth", genre: "Romance" },
    { src: "/images/Portfolio/28.jpg", title: "Black Holes", genre: "Fantasy" },
];

interface BookCardProps {
    item: { src: string; title: string; genre: string };
    height?: number;
    width?: number;
}

const BookCard: React.FC<BookCardProps> = ({ item, height = 260, width = 180 }) => (
    <div
        className="portfolio-img-card"
        style={{ width: `${width}px`, height: `${height}px`, margin: "0 10px" }}
    >
        <img
            src={item.src}
            alt={item.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => {
                const t = e.currentTarget;
                t.style.display = "none";
                const parent = t.parentElement!;
                parent.style.background = `hsl(${Math.random() * 360}, 25%, 18%)`;
                const fb = document.createElement("div");
                fb.style.cssText = `width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:16px;`;
                fb.innerHTML = `<span style="font-family:'Bebas Neue',sans-serif;font-size:1rem;color:rgba(255,255,255,0.35);text-align:center;letter-spacing:0.05em;">${item.title}</span>`;
                parent.appendChild(fb);
            }}
        />
        <div className="overlay">
            <div>
                <p className="overlay-label">{item.title}</p>
                <p className="overlay-sub">{item.genre}</p>
            </div>
        </div>
        <div style={{
            position: "absolute", top: 0, right: 0,
            width: "3px", height: "40px",
            background: "linear-gradient(to bottom, #FF4545, transparent)",
            borderRadius: "0 14px 0 0",
        }} />
    </div>
);

interface MarqueeRowProps {
    children: React.ReactNode;
    direction: "left" | "right";
    speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ children, direction, speed = 1.2 }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentTranslate = useRef(direction === "left" ? 0 : 0);
    const startTranslate = useRef(0);
    const animationRef = useRef<number | undefined>(undefined);
    const singleSetWidth = useRef(0);

    useEffect(() => {
        const updateWidth = () => {
            if (trackRef.current) {
                singleSetWidth.current = trackRef.current.scrollWidth / 2;
            }
        };
        updateWidth();

        const ro = new ResizeObserver(updateWidth);
        if (trackRef.current) ro.observe(trackRef.current);
        return () => ro.disconnect();
    }, [children]);

    useEffect(() => {
        let animationId: number;

        const animate = () => {
            if (!isDragging.current && singleSetWidth.current > 0) {
                if (direction === "left") {
                    currentTranslate.current -= speed;
                    if (currentTranslate.current <= -singleSetWidth.current) {
                        currentTranslate.current += singleSetWidth.current;
                    }
                } else {
                    currentTranslate.current += speed;
                    if (currentTranslate.current >= 0) {
                        currentTranslate.current -= singleSetWidth.current;
                    }
                }
            }

            if (trackRef.current) {
                trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [direction, speed]);

    const handleDragStart = (clientX: number) => {
        isDragging.current = true;
        startX.current = clientX;
        startTranslate.current = currentTranslate.current;
        if (trackRef.current) trackRef.current.style.cursor = "grabbing";
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging.current) return;
        const dx = clientX - startX.current;

        let newTranslate = startTranslate.current + dx;

        if (singleSetWidth.current > 0) {
            if (newTranslate <= -singleSetWidth.current) {
                newTranslate += singleSetWidth.current;
                startTranslate.current += singleSetWidth.current;
            } else if (newTranslate >= 0) {
                newTranslate -= singleSetWidth.current;
                startTranslate.current -= singleSetWidth.current;
            }
        }

        currentTranslate.current = newTranslate;
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        if (trackRef.current) trackRef.current.style.cursor = "grab";
    };

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleDragStart(e.clientX);

        const onMouseMove = (ev: MouseEvent) => handleDragMove(ev.clientX);
        const onMouseUp = () => {
            handleDragEnd();
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    // Touch Events
    const onTouchStart = (e: React.TouchEvent) => {
        handleDragStart(e.touches[0].clientX);

        const onTouchMove = (ev: TouchEvent) => handleDragMove(ev.touches[0].clientX);
        const onTouchEnd = () => {
            handleDragEnd();
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };

        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
    };

    return (
        <div style={{ overflow: "hidden" }}>
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    width: "max-content",
                    cursor: "grab",
                    touchAction: "pan-y",
                }}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                {children}
                {children}
            </div>
        </div>
    );
};


const Portfolio: React.FC = () => {
    const { ref, visible } = useInView(0.08);

    return (
        <>
            <style>{portfolioStyles}</style>

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
                    position: "absolute", top: "20%", left: "-6%",
                    width: "450px", height: "450px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 65%)",
                    animation: "orbPulse 7s ease-in-out infinite",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "15%", right: "-5%",
                    width: "380px", height: "380px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 70%)",
                    pointerEvents: "none",
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
                    width: "170px", height: "170px",
                    border: "1px dashed rgba(255,69,69,0.12)",
                    borderRadius: "50%",
                    animation: "rotateSlow 22s linear infinite",
                    pointerEvents: "none",
                }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto 60px", padding: "0 40px" }}>

                    <div style={{
                        display: "flex", alignItems: "center", gap: "12px",
                        marginBottom: "22px",
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
                        }}>OUR WORK</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
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
                                        text="Our Work"
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
                                    {" "}
                                    <SplitText
                                        text="Speaks"
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

                        <p style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "1.1rem",
                            lineHeight: 1.75,
                            color: "#0A0A0A",
                            maxWidth: "340px",
                            margin: 0,
                            fontWeight: 300,
                            opacity: visible ? 1 : 0,
                            animation: visible ? "fadeUp 0.7s ease 0.3s forwards" : "none",
                        }}>
                            We have worked with authors across different genres, helping them publish and promote their books successfully. Our portfolio reflects a wide range of projects built with care and attention to each author's vision.
                        </p>
                    </div>
                </div>

                <div style={{ position: "relative", marginBottom: "16px" }}>
                    <div className="edge-fade-left" />
                    <div className="edge-fade-right" />
                    <MarqueeRow direction="left" speed={1.2}>
                        {ROW_TOP.map((item, i) => (
                            <BookCard key={i} item={item} height={400} width={250} />
                        ))}
                    </MarqueeRow>
                </div>

                <div style={{ position: "relative" }}>
                    <div className="edge-fade-left" />
                    <div className="edge-fade-right" />
                    <MarqueeRow direction="right" speed={1.2}>
                        {ROW_BOTTOM.map((item, i) => (
                            <BookCard key={i} item={item} height={400} width={250} />
                        ))}
                    </MarqueeRow>
                </div>

            </section>
        </>
    );
};

export default Portfolio;