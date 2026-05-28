import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const aboutStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes about-fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes about-fadeLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes about-fadeRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes about-rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes about-floatBook {
    0%, 100% { transform: rotate(3deg) translateY(0px); }
    50%       { transform: rotate(3deg) translateY(-16px); }
  }
  @keyframes about-borderPulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }

  .about-check-item {
    opacity: 0;
    transform: translateX(-10px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .about-check-item.vis {
    opacity: 1;
    transform: translateX(0);
  }

  .about-cta-primary {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .about-cta-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 32px rgba(255,69,69,0.45);
  }
  .about-cta-outline {
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
  }
  .about-cta-outline:hover {
    background: #FF4545 !important;
    color: #fff !important;
    transform: translateY(-3px);
  }
  .about-book-float {
    animation: about-floatBook 5s ease-in-out infinite;
  }
  .about-border-pulse {
    animation: about-borderPulse 4s ease-in-out infinite;
  }
`;

function useAboutInView(threshold = 0.12) {
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

const CHECKS = [
  "Unfinished manuscript",
  "No professional to review your work",
  "Mentally stressed about publishing",
  "Tough to focus on writing",
  "Being too much of a perfectionist",
  "Stressful deadlines & schedules",
  "Not getting questions answered",
  "No creative direction or vision",
  "Low motivation to continue",
  "Not happy with your progress",
];

const AboutSection: React.FC = () => {
  const { ref: sectionRef, visible } = useAboutInView(0.08);

  return (
    <>
      <style>{aboutStyles}</style>

      <section
        ref={sectionRef}
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 30%, #FFE8E8 60%, #FFD6D6 85%, #FFFFFF 100%)",
          width: "100%",
          overflow: "hidden",
          padding: "110px 0 100px",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: "8%", left: "-6%",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,69,69,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "-4%",
          width: "480px", height: "480px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,69,69,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "6%", right: "3%",
          width: "190px", height: "190px",
          border: "1px dashed rgba(255,69,69,0.15)",
          borderRadius: "50%",
          animation: "about-rotateSlow 22s linear infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "8%", right: "4.5%",
          width: "135px", height: "135px",
          border: "1px dashed rgba(255,69,69,0.08)",
          borderRadius: "50%",
          animation: "about-rotateSlow 14s linear infinite reverse",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px" }}>

          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            marginBottom: "28px",
            opacity: visible ? 1 : 0,
            animation: visible ? "about-fadeUp 0.6s ease forwards" : "none",
          }}>
            <div style={{
              width: visible ? "36px" : "0", height: "2px",
              background: "#FF4545",
              transition: "width 0.8s ease 0.2s",
            }} />
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.82rem", letterSpacing: "0.28em",
              color: "#FF4545", fontWeight: 600,
            }}>ABOUT US</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "80px",
            alignItems: "center",
          }}>

            <div style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "about-fadeLeft 0.85s ease 0.2s forwards" : "none",
            }}>

              <h2 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#0A0A0A",
                marginBottom: "18px",
              }}>
                {visible && (
                  <>
                    <SplitText
                      text="Not Able To Make"
                      className="text-[#0A0A0A]"
                      delay={30} duration={1.0} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-40px" textAlign="left"
                    />
                    <br />
                    <SplitText
                      text="Ideas Into Words?"
                      className="text-[#FF4545]"
                      delay={38} duration={1.1} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 55 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-40px" textAlign="left"
                    />
                    <br />
                    <SplitText
                      text="We Get It Done."
                      className="text-[#0A0A0A]"
                      delay={46} duration={1.1} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 55 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-40px" textAlign="left"
                    />
                  </>
                )}
              </h2>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.05rem", lineHeight: 1.8,
                color: "#444", fontWeight: 300,
                marginBottom: "28px", maxWidth: "560px",
              }}>
                Many writers face burnout at some point — stressed about transforming ideas into words.
                There are many reasons why this happens. Bristol Publishers is here to solve every one of them.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 28px",
                marginBottom: "36px",
              }}>
                {CHECKS.map((item, i) => (
                  <div
                    key={i}
                    className={`about-check-item${visible ? " vis" : ""}`}
                    style={{ transitionDelay: `${0.4 + i * 0.06}s` }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                      <div style={{
                        flexShrink: 0,
                        width: "19px", height: "19px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #FF4545, #ff7070)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: "2px",
                      }}>
                        <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem", lineHeight: 1.5,
                        color: "#1a1a1a", fontWeight: 400,
                      }}>{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                height: "1px",
                background: "linear-gradient(to right, rgba(255,69,69,0.3), transparent)",
                marginBottom: "32px",
              }} />

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                <button className="about-cta-primary" style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700, fontSize: "0.9rem",
                  letterSpacing: "0.08em",
                  padding: "13px 34px",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #fe5858 0%, #FF4545 100%)",
                  color: "#fff", border: "none", cursor: "pointer",
                }}>
                  Get A Quote
                </button>
                <button className="about-cta-outline" style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700, fontSize: "0.9rem",
                  letterSpacing: "0.08em",
                  padding: "12px 34px",
                  borderRadius: "999px",
                  background: "transparent",
                  color: "#FF4545",
                  border: "2px solid #FF4545",
                  cursor: "pointer",
                }}>
                  Live Chat
                </button>
                <a href="tel:+13025184405" style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600, fontSize: "0.9rem",
                  color: "#0A0A0A", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    background: "rgba(255,69,69,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#FF4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  +1 302-518-4405
                </a>
              </div>
            </div>

            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "500px",
              opacity: visible ? 1 : 0,
              animation: visible ? "about-fadeRight 0.9s ease 0.35s forwards" : "none",
            }}>

              <div style={{
                position: "absolute",
                width: "300px", height: "300px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,69,69,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <div style={{
                position: "absolute", top: "-20px", right: "-10px",
                display: "grid", gridTemplateColumns: "repeat(7, 10px)", gap: "7px",
                opacity: 0.45, zIndex: 0,
              }}>
                {Array.from({ length: 42 }).map((_, i) => (
                  <div key={i} style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#FF4545" }} />
                ))}
              </div>

              <div
                className="about-book-float"
                style={{
                  position: "relative", zIndex: 2,
                  borderRadius: "6px", overflow: "hidden",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,69,69,0.12)",
                }}
              >
                <img
                  src="/images/About1.png"
                  alt="Bristol Publishers — Author Book"
                  style={{
                    display: "block", width: "300px", height: "400px",
                    objectFit: "cover",
                    filter: "brightness(0.93) saturate(1.05)",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                  pointerEvents: "none",
                }} />
              </div>

              <div style={{
                position: "absolute", bottom: "-10px", left: "-10px",
                display: "grid", gridTemplateColumns: "repeat(5, 10px)", gap: "7px",
                opacity: 0.35, zIndex: 0,
              }}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#FF4545" }} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;