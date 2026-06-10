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

  /* ═══════════════════════════════════
     ABOUT SECTION — BASE LAYOUT
     ═══════════════════════════════════ */

  .about-section {
    background: linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 30%, #FFE8E8 60%, #FFD6D6 85%, #FFFFFF 100%);
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: 60px 0 60px;
  }

  .about-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .about-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .about-eyebrow-line {
    height: 2px;
    background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }

  .about-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.28em;
    color: #FF4545;
    font-weight: 600;
  }

  /* Grid: single column on mobile, 2-col on desktop */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: center;
  }

  /* Left col */
  .about-left {
    width: 100%;
  }

  .about-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(1.9rem, 6vw, 3.6rem);
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #0A0A0A;
    margin-bottom: 16px;
  }

  .about-para {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.88rem, 2vw, 1.05rem);
    line-height: 1.8;
    color: #444;
    font-weight: 300;
    margin-bottom: 24px;
    max-width: 560px;
  }

  /* Checklist grid */
  .about-checks {
    display: grid;
    grid-template-columns: 1fr;
    gap: 9px 0;
    margin-bottom: 28px;
  }

  .about-check-inner {
    display: flex;
    align-items: flex-start;
    gap: 9px;
  }

  .about-check-dot {
    flex-shrink: 0;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF4545, #ff7070);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }

  .about-check-label {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.82rem, 1.8vw, 0.9rem);
    line-height: 1.5;
    color: #1a1a1a;
    font-weight: 400;
  }

  .about-divider {
    height: 1px;
    background: linear-gradient(to right, rgba(255,69,69,0.3), transparent);
    margin-bottom: 28px;
  }

  /* CTA row */
  .about-cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }

  .about-cta-primary {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    letter-spacing: 0.1em;
    padding: 11px 28px;
    border-radius: 999px;
    background: linear-gradient(90deg, #fe5858 0%, #FF4545 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: clamp(0.78rem, 1.6vw, 0.9rem);
    white-space: nowrap;
  }

  .about-cta-outline {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    letter-spacing: 0.10em;
    padding: 10px 28px;
    border-radius: 999px;
    background: transparent;
    color: #FF4545;
    border: 2px solid #FF4545;
    cursor: pointer;
    font-size: clamp(0.78rem, 1.6vw, 0.9rem);
    white-space: nowrap;
  }

  .about-phone-link {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: clamp(0.78rem, 1.6vw, 0.9rem);
    color: #0A0A0A;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .about-phone-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,69,69,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Right col — image */
  .about-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 340px;
  }

  .about-img-glow {
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .about-img-wrap {
    position: relative;
    z-index: 2;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,69,69,0.12);
  }

  .about-img {
    display: block;
    width: 240px;
    height: 320px;
    object-fit: cover;
    filter: brightness(0.93) saturate(1.05);
  }

  .about-img-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
    pointer-events: none;
  }

  .about-dots-tl {
    position: absolute;
    top: -16px;
    right: -8px;
    display: grid;
    grid-template-columns: repeat(7, 10px);
    gap: 7px;
    opacity: 0.45;
    z-index: 0;
  }

  .about-dots-br {
    position: absolute;
    bottom: -8px;
    left: -8px;
    display: grid;
    grid-template-columns: repeat(5, 10px);
    gap: 7px;
    opacity: 0.35;
    z-index: 0;
  }

  .about-dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #FF4545;
  }

  /* Decorative rings */
  .about-ring-1 {
    position: absolute;
    top: 6%;
    right: 3%;
    width: 160px;
    height: 160px;
    border: 1px dashed rgba(255,69,69,0.15);
    border-radius: 50%;
    animation: about-rotateSlow 22s linear infinite;
    pointer-events: none;
  }
  .about-ring-2 {
    position: absolute;
    top: 8%;
    right: 4.5%;
    width: 110px;
    height: 110px;
    border: 1px dashed rgba(255,69,69,0.08);
    border-radius: 50%;
    animation: about-rotateSlow 14s linear infinite reverse;
    pointer-events: none;
  }
  .about-glow-tl {
    position: absolute;
    top: 8%;
    left: -6%;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .about-glow-br {
    position: absolute;
    bottom: 5%;
    right: -4%;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.12) 0%, transparent 70%);
    pointer-events: none;
  }


  /* ═══════════════════════════════════
     LARGE MOBILE  480px – 767px
     ═══════════════════════════════════ */
  @media (min-width: 480px) {
    .about-section { padding: 70px 0 70px; }
    .about-container { padding: 0 28px; }
    .about-checks { grid-template-columns: 1fr 1fr; gap: 9px 20px; }
    .about-img { width: 270px; height: 360px; }
    .about-img-glow { width: 280px; height: 280px; }
    .about-right { min-height: 380px; }
  }


  /* ═══════════════════════════════════
     TABLET  768px – 1023px
     ═══════════════════════════════════ */
  @media (min-width: 768px) {
    .about-section { padding: 80px 0 80px; }
    .about-container { padding: 0 36px; }
    .about-eyebrow { margin-bottom: 26px; }

    .about-heading { font-size: clamp(2.2rem, 4.5vw, 3rem); }
    .about-para { font-size: 0.95rem; }

    .about-checks { grid-template-columns: 1fr 1fr; gap: 10px 24px; margin-bottom: 30px; }
    .about-check-label { font-size: 0.88rem; }

    .about-cta-primary,
    .about-cta-outline { padding: 11px 30px; font-size: 0.85rem; }

    .about-img { width: 290px; height: 390px; }
    .about-img-glow { width: 300px; height: 300px; }
    .about-right { min-height: 420px; }

    .about-ring-1 { width: 180px; height: 180px; }
    .about-ring-2 { width: 130px; height: 130px; }
  }


  /* ═══════════════════════════════════
     LAPTOP  1024px – 1439px
     ═══════════════════════════════════ */
  @media (min-width: 1024px) {
    .about-section { padding: 100px 0 100px; }
    .about-container { padding: 0 48px; }
    .about-eyebrow { margin-bottom: 28px; }

    /* Switch to 2-col layout */
    .about-grid {
      grid-template-columns: 1fr 380px;
      gap: 60px;
    }

    .about-heading { font-size: clamp(2.4rem, 3.5vw, 3.2rem); }
    .about-para { font-size: 1rem; margin-bottom: 26px; }

    .about-checks { grid-template-columns: 1fr 1fr; gap: 10px 28px; margin-bottom: 32px; }
    .about-check-label { font-size: 0.9rem; }

    .about-cta-primary,
    .about-cta-outline { padding: 12px 32px; font-size: 0.88rem; }
    .about-cta-row { gap: 13px; }

    .about-img { width: 280px; height: 380px; }
    .about-img-glow { width: 280px; height: 280px; }
    .about-right { min-height: 460px; }

    .about-ring-1 { width: 190px; height: 190px; }
    .about-ring-2 { width: 135px; height: 135px; }
    .about-glow-tl { width: 380px; height: 380px; }
    .about-glow-br { width: 440px; height: 440px; }
  }


  /* ═══════════════════════════════════
     MONITOR  1440px – 1919px
     ═══════════════════════════════════ */
  @media (min-width: 1440px) {
    .about-section { padding: 110px 0 100px; }
    .about-container { padding: 0 64px; max-width: 1380px; }

    .about-grid {
      grid-template-columns: 1fr 420px;
      gap: 80px;
    }

    .about-heading { font-size: 3.6rem; }
    .about-para { font-size: 1.05rem; margin-bottom: 28px; }

    .about-checks { gap: 10px 28px; margin-bottom: 36px; }
    .about-check-label { font-size: 0.92rem; }

    .about-cta-primary,
    .about-cta-outline { padding: 13px 34px; font-size: 0.9rem; }
    .about-cta-row { gap: 14px; }

    .about-img { width: 300px; height: 400px; }
    .about-img-glow { width: 300px; height: 300px; }
    .about-right { min-height: 500px; }

    .about-ring-1 { width: 190px; height: 190px; }
    .about-ring-2 { width: 135px; height: 135px; }
    .about-glow-tl { width: 420px; height: 420px; }
    .about-glow-br { width: 480px; height: 480px; }
  }


  /* ═══════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ═══════════════════════════════════ */
  @media (min-width: 1920px) {
    .about-section { padding: 130px 0 120px; }
    .about-container { padding: 0 80px; max-width: 100%; }

    .about-grid {
      grid-template-columns: 1fr 580px;
      gap: 100px;
    }

    .about-heading { font-size: 4rem;  max-width: 2080px; }
    .about-para { font-size: 24px; margin-bottom: 32px; max-width: 1080px; }

    .about-checks { gap: 12px 32px; margin-bottom: 40px; }
    .about-check-label { font-size: 22px; }
    .about-check-dot { width: 25px; height: 25px; }

    .about-cta-primary,
    .about-cta-outline { padding: 14px 38px; font-size: 1.5rem; }
    .about-cta-row { gap: 16px; }

    .about-img { width: 440px; height: 560px; }
    .about-img-glow { width: 360px; height: 360px; }
    .about-right { min-height: 560px; }

    .about-phone-link {font-size: 1.5rem;}

    .about-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .about-eyebrow-line {
    height: 2px;
    background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }

  .about-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.28em;
    color: #FF4545;
    font-weight: 600;
  }

  }

  @media (min-width: 2560px) {
    .about-section { padding: 130px 0 120px; }
    .about-container { padding: 0 80px; max-width: 80%; }

    .about-grid {
      grid-template-columns: 1fr 580px;
      gap: 100px;
    }

    .about-heading { font-size: 5rem;  max-width: 1580px; }
    .about-para { font-size: 28px; margin-bottom: 32px; max-width: 1080px; }

    .about-checks { gap: 12px 32px; margin-bottom: 40px; }
    .about-check-label { font-size: 26px; }
    .about-check-dot { width: 25px; height: 25px; }

    .about-cta-primary,
    .about-cta-outline { padding: 14px 38px; font-size: 1.5rem; }
    .about-cta-row { gap: 16px; }

    .about-img { width: 440px; height: 560px; }
    .about-img-glow { width: 360px; height: 360px; }
    .about-right { min-height: 560px; }

    .about-phone-link {font-size: 1.5rem;}

    .about-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .about-eyebrow-line {
    height: 2px;
    background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }

  .about-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.28em;
    color: #FF4545;
    font-weight: 600;
  }

  }


  /* ═══════════════════════════════════
     REDUCE MOTION
     ═══════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .about-book-float { animation: none !important; }
    .about-ring-1, .about-ring-2 { animation: none !important; }
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
  "Unfinished manuscripts that lose direction during development",
  "Lack of professional editing and publishing guidance",
  "Creative burnout and inconsistent writing progress",
  "Uncertainty about formatting and publishing standards",
  "No clear roadmap from manuscript to publication",
  "Difficulty transitioning from writing to publishing",
  "Limited feedback and industry insight",
  "Overthinking, perfectionism, and delayed completion",
  "Confusion in preparing books for global publishing platforms",
  "Struggling to turn drafts into market-ready published books",
];

const AboutSection: React.FC = () => {
  const { ref: sectionRef, visible } = useAboutInView(0.08);

  return (
    <>
      <style>{aboutStyles}</style>

      <section ref={sectionRef} className="about-section">

        {/* Background glows */}
        <div className="about-glow-tl" />
        <div className="about-glow-br" />
        <div className="about-ring-1" />
        <div className="about-ring-2" />

        <div className="about-container">

          {/* Eyebrow */}
          <div
            className="about-eyebrow"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "about-fadeUp 0.6s ease forwards" : "none",
            }}
          >
            <div
              className="about-eyebrow-line"
              style={{ width: visible ? "36px" : "0" }}
            />
            <span className="about-eyebrow-text">ABOUT US</span>
          </div>

          {/* Main grid */}
          <div className="about-grid">

            {/* ── LEFT COL ── */}
            <div 
              className="about-left"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? "about-fadeLeft 0.85s ease 0.2s forwards" : "none",
              }}
            >
              <h2 className="about-heading">
                {visible && (
                  <>
                    <SplitText
                      text="A Complete"
                      className="text-[#0A0A0A]"
                      delay={30} duration={1.0} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-40px" textAlign="left"
                    />
                    <br />
                    <SplitText
                      text="Publishing Partner"
                      className="text-[#FF4545]"
                      delay={38} duration={1.1} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 55 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-40px" textAlign="left"
                    />
                    <br />
                    <SplitText
                      text="for Modern Authors."
                      className="text-[#0A0A0A]"
                      delay={46} duration={1.1} ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 55 }} to={{ opacity: 1, y: 0 }}
                      threshold={0.1} rootMargin="-40px" textAlign="left"
                    />
                  </>
                )}
              </h2>

              <p className="about-para">
                Bristol Publishers is a complete publishing partner dedicated to shaping manuscripts into market-ready books. From development to distribution, we provide structured support at every stage of the publishing journey. We focus on quality, clarity, and author success. Whether you're facing these challenges, we're here to support you. 
              </p>

              {/* Checklist */}
              <div className="about-checks">
                {CHECKS.map((item, i) => (
                  <div
                    key={i}
                    className={`about-check-item${visible ? " vis" : ""}`}
                    style={{ transitionDelay: `${0.4 + i * 0.06}s` }}
                  >
                    <div className="about-check-inner">
                      <div className="about-check-dot">
                        <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="about-check-label">{item}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-divider" />

              {/* CTA buttons */}
              <div className="about-cta-row">
                <button className="about-cta-primary">GET A QUOTE</button>
                <button className="about-cta-outline">LIVE CHAT</button>
                <a href="tel:+13025184405" className="about-phone-link">
                  <div className="about-phone-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#FF4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  +1 302-518-4405
                </a>
              </div>
            </div>

            {/* ── RIGHT COL — Image ── */}
            <div
              className="about-right"
              style={{
                opacity: visible ? 1 : 0,
                animation: visible ? "about-fadeRight 0.9s ease 0.35s forwards" : "none",
              }}
            >
              <div className="about-img-glow" />

              {/* Dots top-right */}
              <div className="about-dots-tl">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div key={i} className="about-dot" />
                ))}
              </div>

              {/* Book image */}
              <div className="about-book-float about-img-wrap">
                <img
                  src="/images/About1.webp"
                  alt="Bristol Publishers — Author Book"
                  className="about-img"
                />
                <div className="about-img-shimmer" />
              </div>

              {/* Dots bottom-left */}
              <div className="about-dots-br">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="about-dot" />
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