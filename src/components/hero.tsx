import React from "react";
import SplitText from "./SplitText";

const fontStyle = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap');`;

const BOOK_MOCKUP = "/images/covers/Book-Mockup.png";

const animStyles = `
  /* ════════════════════════════════════
     KEYFRAMES
     ════════════════════════════════════ */
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


  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */
  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .hero-marquee-bg {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }

  .hero-book-card-item {
    width: 110px;
    height: 165px;
    margin: 0 5px;
    border-radius: 8px;
  }

  .hero-main-content {
    position: relative;
    padding: 3.5rem 0.85rem 0;
    z-index: 10;
    flex-shrink: 0;
  }

  .hero-title-main {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.9rem;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: #fff;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2px;
  }

  .hero-title-sub {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: #fff;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 2px;
    margin-top: 0.5rem;
  }

  .hero-book-mockup {
    position: absolute;
    pointer-events: none;
    z-index: 20;
    left: 50%;
    top: 8%;
    width: 200px;
    animation: floatBook 5s ease-in-out infinite;
    filter:
      drop-shadow(0 0 18px rgba(80,120,255,0.60))
      drop-shadow(0 0 40px rgba(60,80,220,0.38))
      drop-shadow(0 0  8px rgba(120,160,255,0.75));
    padding-top: 2rem;
  }

  .hero-book-mockup img {
    height: 220px;
    width: 380px;
    object-fit: cover;
    object-position: top;
  }

  .hero-bottom-card {
    position: relative;
    margin: 1.5rem 0.4rem 0.65rem;
    border-radius: 14px;
    overflow: hidden;
    flex-shrink: 0;
    z-index: 10;
  }

  .hero-bottom-card-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 14px;
    padding: 18px 14px;
    position: relative;
    z-index: 20;
  }

  .hero-bottom-card-text-wrap {
    max-width: 100%;
  }

  .hero-bottom-card-text {
    color: rgba(255,255,255,0.90);
    font-size: 12.5px;
    line-height: 1.55;
    font-family: 'Montserrat', sans-serif;
  }

  .hero-bottom-form {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 14px;
    padding: 16px 14px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .hero-bottom-form-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: #fff;
    margin-bottom: 12px;
    letter-spacing: 0.02em;
  }

  .hero-bottom-form-fields {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .hero-bottom-form-input {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 8px;
    padding: 8px 11px;
    color: #fff;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .hero-bottom-form-input::placeholder {
    color: rgba(255,255,255,0.45);
  }

  .hero-bottom-form-btn {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.06em;
    font-weight: 500;
    font-size: 12px;
    padding: 9px 0;
    border-radius: 8px;
    background: linear-gradient(90deg, #fe5858e8 0%, #FF4545 100%);
    color: #fff;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-top: 2px;
  }


  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .hero-main-content {
      padding-top: 5rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .hero-title-main {
      font-size: 2.5rem;
      gap: 4px;
    }

    .hero-title-sub {
      font-size: 1.35rem;
      gap: 2px;
      margin-top: 0.6rem;
    }

    .hero-book-mockup {
      width: 260px;
      top: 3%;
      padding-top: 2.5rem;
    }

    .hero-book-mockup img {
      height: 280px;
      width: 480px;
    }

    .hero-bottom-card {
      margin: 2rem 0.5rem 0.75rem;
      border-radius: 16px;
    }

    .hero-bottom-card-inner {
      gap: 18px;
      padding: 22px 18px;
    }

    .hero-bottom-card-text {
      font-size: 13.5px;
      line-height: 1.6;
    }

    .hero-bottom-form {
      padding: 20px 18px;
      border-radius: 16px;
    }

    .hero-bottom-form-title {
      font-size: 13.5px;
      margin-bottom: 14px;
    }

    .hero-bottom-form-input {
      font-size: 12.5px;
      padding: 9px 12px;
    }

    .hero-bottom-form-btn {
      font-size: 12.5px;
      padding: 10px 0;
    }

    .hero-book-card-item {
      width: 140px;
      height: 210px;
      margin: 0 6px;
    }

    .hero-marquee-bg {
      gap: 14px;
    }
  }


  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .hero-main-content {
      padding-top: 7rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .hero-title-main {
      font-size: 3.5rem;
      flex-direction: row;
      justify-content: space-between;
      gap: 0;
    }

    .hero-title-sub {
      font-size: 1.75rem;
      flex-direction: row;
      justify-content: space-between;
      gap: 0;
      margin-top: 0.75rem;
    }

    .hero-book-mockup {
      width: 320px;
      top: 4%;
      padding-top: 3rem;
    }

    .hero-book-mockup img {
      height: 360px;
      width: 600px;
    }

    .hero-bottom-card {
      margin: 2.5rem 0.875rem 1rem;
      border-radius: 18px;
    }

    .hero-bottom-card-inner {
      gap: 22px;
      padding: 28px 24px;
    }

    .hero-bottom-card-text {
      font-size: 14.5px;
      line-height: 1.6;
    }

    .hero-bottom-form {
      border-radius: 16px;
      padding: 22px 22px;
    }

    .hero-bottom-form-title {
      font-size: 14px;
      margin-bottom: 15px;
    }

    .hero-bottom-form-input {
      font-size: 13px;
      padding: 10px 13px;
      border-radius: 9px;
    }

    .hero-bottom-form-btn {
      font-size: 13px;
      padding: 10px 0;
      border-radius: 9px;
    }

    .hero-book-card-item {
      width: 170px;
      height: 260px;
      margin: 0 8px;
    }

    .hero-marquee-bg {
      gap: 18px;
    }
  }


  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ★ Heading chota — book original position
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .hero-main-content {
      padding: 7rem 2.25rem 0;
    }

    .hero-title-main {
      font-size: 2.45rem;
      line-height: 0.85;
    }

    .hero-title-sub {
      font-size: 1.35rem;
      line-height: 0.85;
      margin-top: 0.75rem;
    }

    .hero-book-mockup {
      width: clamp(380px, 16vw, 450px);
      top: 7%;
      padding-top: 3.5rem;
    }

    .hero-book-mockup img {
      height: 380px;
      width: 600px;
    }

    .hero-bottom-card {
      margin: 2.5rem 0.875rem 1.375rem;
      border-radius: 22px;
      height: 40vh;
      min-height: 330px;
    }

    .hero-bottom-card-inner {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 0;
      padding: 0 2rem;
      position: absolute;
      inset: 0;
    }

    .hero-bottom-card-text-wrap {
      max-width: 250px;
    }

    .hero-bottom-card-text {
      font-size: 14px;
      line-height: 1.65;
    }

    .hero-bottom-form {
      min-width: 310px;
      max-width: 340px;
      width: auto;
      border-radius: 18px;
      padding: 24px 26px;
    }

    .hero-bottom-form-title {
      font-size: 15px;
      margin-bottom: 16px;
    }

    .hero-bottom-form-input {
      font-size: 13px;
      padding: 9px 13px;
    }

    .hero-bottom-form-btn {
      font-size: 13px;
      padding: 10px 0;
    }

    .hero-book-card-item {
      width: 200px;
      height: 305px;
      margin: 0 10px;
    }

    .hero-marquee-bg {
      gap: 24px;
    }
  }


  /* ════════════════════════════════════
     MONITOR  ≥ 1440px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .hero-main-content {
      padding-top: 12rem;
      padding-left: 3.5rem;
      padding-right: 3.5rem;
    }

    .hero-title-main {
      font-size: 3.5rem;
    }

    .hero-title-sub {
      font-size: 2rem;
      margin-top: 1.2rem;
    }

    .hero-book-mockup {
      width: clamp(560px, 26vw, 750px);
      top: 6%;
      padding-top: 3.875rem;
    }

    .hero-book-mockup img {
      height: 580px;
      width: 1050px;
    }

    .hero-bottom-card {
      height: 38vh;
      min-height: 370px;
      margin: 2.5rem 1.5rem 1.375rem;
    }

    .hero-bottom-card-inner {
      padding: 0 2.5rem;
    }

    .hero-bottom-card-text-wrap {
      max-width: 420px;
    }

    .hero-bottom-card-text {
      font-size: 18px;
      line-height: 1.7;
    }

    .hero-bottom-form {
      min-width: 360px;
      max-width: 400px;
      padding: 28px 30px;
    }

    .hero-bottom-form-title {
      font-size: 17px;
      margin-bottom: 18px;
    }

    .hero-bottom-form-input {
      font-size: 14.5px;
      padding: 11px 15px;
    }

    .hero-bottom-form-btn {
      font-size: 14.5px;
      padding: 12px 0;
    }

    .hero-book-card-item {
      width: 230px;
      height: 360px;
      margin: 0 10px;
    }

    .hero-marquee-bg {
      gap: 28px;
    }
  }


  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .hero-main-content {
      padding-top: 14rem;
      padding-left: 5rem;
      padding-right: 5rem;
    }

    .hero-title-main {
      font-size: 5rem;
    }

    .hero-title-sub {
      font-size: 3rem;
      margin-top: 1.5rem;
    }

    .hero-book-mockup {
      width: clamp(600px, 24vw, 800px);
      top: 10%;
      padding-top: 4.5rem;
    }

    .hero-book-mockup img {
      height: 600px;
      width: 900px;
    }

    .hero-bottom-card {
      height: 26vh;
      min-height: 500px;
      margin: 3rem 2.5rem 1.5rem;
      border-radius: 26px;
    }

    .hero-bottom-card-inner {
      padding: 0 3.5rem;
    }

    .hero-bottom-card-text-wrap {
      text-align: left;
      align-items: start;
      padding-bottom: 5%;
      max-width: 500px;
    }

    .hero-bottom-card-text {
      font-size: 22px;
      line-height: 1.9;
    }

    .hero-bottom-form {
      min-width: 500px;
      max-width: 540px;
      min-height: 450px;
      max-height: 490px;
      padding: 32px 34px;
      border-radius: 20px;
    }

    .hero-bottom-form-title {
      font-size: 26px;
      margin-bottom: 20px;
    }

    .hero-bottom-form-input {
      font-size: 22px;
      padding: 12px 16px;
      border-radius: 10px;
    }

    .hero-bottom-form-btn {
      font-size: 22px;
      padding: 13px 0;
      border-radius: 10px;
    }

    .hero-book-card-item {
      width: 250px;
      height: 390px;
      margin: 0 12px;
    }

    .hero-marquee-bg {
      gap: 10px;
    }
  }

  @media (min-width: 2560px) {
    .hero-main-content {
      padding-top: 14rem;
      padding-left: 5rem;
      padding-right: 5rem;
    }

    .hero-title-main {
      font-size: 7.5rem;
    }

    .hero-title-sub {
      font-size: 3.75rem;
      margin-top: 1.5rem;
    }

    .hero-book-mockup {
      width: clamp(680px, 28vw, 860px);
      top: 10%;
      padding-top: 4.5rem;
    }

    .hero-book-mockup img {
      height: 700px;
      width: 1200px;
    }

    .hero-bottom-card {
      height: 36vh;
      min-height: 500px;
      margin: 3rem 2.5rem 1.5rem;
      border-radius: 26px;
    }

    .hero-bottom-card-inner {
      padding: 0 3.5rem;
    }

    .hero-bottom-card-text-wrap {
      text-align: left;
      align-items: start;
      padding-bottom: 5%;
      max-width: 700px;
    }

    .hero-bottom-card-text {
      font-size: 28px;
      line-height: 1.9;
    }

    .hero-bottom-form {
      min-width: 500px;
      max-width: 540px;
      min-height: 450px;
      max-height: 490px;
      padding: 32px 34px;
      border-radius: 20px;
    }

    .hero-bottom-form-title {
      font-size: 26px;
      margin-bottom: 20px;
    }

    .hero-bottom-form-input {
      font-size: 22px;
      padding: 12px 16px;
      border-radius: 10px;
    }

    .hero-bottom-form-btn {
      font-size: 22px;
      padding: 13px 0;
      border-radius: 10px;
    }

    .hero-book-card-item {
      width: 250px;
      height: 390px;
      margin: 0 12px;
    }

    .hero-marquee-bg {
      gap: 10px;
    }
  }



  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .marquee-track-left,
    .marquee-track-right { animation: none !important; }
    .hero-book-mockup    { animation: none !important; }
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

const HeroBookCard: React.FC<{ src: string; title: string }> = ({ src, title }) => (
    <div className="hero-book-card hero-book-card-item">
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
                className="hero-section"
                style={{
                    background: `
                        radial-gradient(ellipse at 0% 50%,   #1B465F 0%, transparent 38%),
                        radial-gradient(ellipse at 20% 100%, #205270 0%, transparent 36%),
                        radial-gradient(ellipse at 75% 0%,   #14384C 0%, transparent 42%),
                        radial-gradient(ellipse at 100% 65%, #1A4259 0%, transparent 40%),
                        radial-gradient(ellipse at 50% 50%,  #102838 0%, transparent 55%),
                        #0A1A24
                    `,
                }}
            >
                {/* ── BACKGROUND MARQUEE LAYER ── */}
                <div className="hero-marquee-bg">
                    <div style={{ overflow: "hidden" }}>
                        <div className="marquee-track-left">
                            {ROW_TOP.map((b, i) => <HeroBookCard key={i} src={b.src} title={b.title} />)}
                            {ROW_TOP.map((b, i) => <HeroBookCard key={`d${i}`} src={b.src} title={b.title} />)}
                        </div>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        <div className="marquee-track-right">
                            {ROW_BOTTOM.map((b, i) => <HeroBookCard key={i} src={b.src} title={b.title} />)}
                            {ROW_BOTTOM.map((b, i) => <HeroBookCard key={`d${i}`} src={b.src} title={b.title} />)}
                        </div>
                    </div>
                </div>

                {/* Dark overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        zIndex: 1,
                        background: `linear-gradient(to bottom,
                            rgba(10,26,36,0.91) 0%,
                            rgba(10,26,36,0.80) 40%,
                            rgba(10,26,36,0.83) 60%,
                            rgba(10,26,36,0.96) 100%
                        )`,
                    }}
                />

                {/* ── MAIN CONTENT ── */}
                <div className="hero-main-content">
                    <h1 className="hero-title-main">
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

                    <h1 className="hero-title-sub">
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
                <div className="hero-book-mockup">
                    <img src={BOOK_MOCKUP} alt="Book Mockup" />
                </div>

                <div className="flex-grow" />

                {/* ── BOTTOM CARD ── */}
                <div className="hero-bottom-card">

                    {/* Card background */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                                radial-gradient(ellipse at 0% 50%,   #1B465F 0%, transparent 38%),
                                radial-gradient(ellipse at 20% 100%, #205270 0%, transparent 36%),
                                radial-gradient(ellipse at 75% 0%,   #14384C 0%, transparent 42%),
                                radial-gradient(ellipse at 100% 65%, #1A4259 0%, transparent 40%),
                                radial-gradient(ellipse at 50% 50%,  #102838 0%, transparent 55%),
                                #0A1A24
                            `,
                            zIndex: 0,
                            opacity: 0.65,
                        }}
                    />

                    {/* Decorative slabs */}
                    {[
                        { left: "-4%", width: "25%", background: "linear-gradient(170deg,#205270,#102838)", transform: "rotate(-8deg)", opacity: 0.15 },
                        { left: "17%", width: "18%", background: "linear-gradient(170deg,#2A6A89,#14384C)", transform: "rotate(-8deg)", opacity: 0.10 },
                        { right: "2%", width: "35%", background: "linear-gradient(170deg,#1B465F,#0E2432)", transform: "rotate(-10deg)", opacity: 0.12 },
                        { right: "27%", width: "26%", background: "linear-gradient(170deg,#245D78,#112B3C)", transform: "rotate(-8deg)", opacity: 0.08 },
                    ].map((sl, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{ height: "200%", top: "-50%", transformOrigin: "top left", zIndex: 1, ...sl }}
                        />
                    ))}

                    {/* Card inner */}
                    <div className="hero-bottom-card-inner">

                        <div className="hero-bottom-card-text-wrap">
                            <p className="hero-bottom-card-text">
                                Completing your manuscript is only the creative phase of your journey. The real transformation happens next, where Bristol Publishers steps in to shape your work into a polished, globally accessible publication.
                            </p>
                        </div>

                        <div className="hero-bottom-form">
                            <p className="hero-bottom-form-title">Get Started Today</p>
                            <div className="hero-bottom-form-fields">
                                {["Your Name", "Email Address", "Phone Number"].map((ph) => (
                                    <input
                                        key={ph}
                                        type="text"
                                        placeholder={ph}
                                        className="hero-bottom-form-input"
                                    />
                                ))}
                                <button className="hero-bottom-form-btn">
                                    SUBMIT →
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;