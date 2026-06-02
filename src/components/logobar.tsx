import React from "react";

const logoBarStyle = `
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .logo-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: marquee 35s linear infinite;
  }
  .logo-track:hover {
    animation-play-state: paused;
  }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */
  .lb-wrap {
    background-color: #FF4545;
    width: 100%;
    overflow: hidden;
    height: 80px;
    display: flex;
    align-items: center;
  }

  .lb-logo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 28px;
  }

  .lb-logo-img {
    height: 36px;
    width: auto;
    object-fit: contain;
    opacity: 0.92;
  }

  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .lb-wrap      { height: 88px; }
    .lb-logo-item { margin: 0 34px; }
    .lb-logo-img  { height: 42px; }
  }

  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .lb-wrap      { height: 96px; }
    .lb-logo-item { margin: 0 40px; }
    .lb-logo-img  { height: 50px; }
  }

  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .lb-wrap      { height: 106px; }
    .lb-logo-item { margin: 0 48px; }
    .lb-logo-img  { height: 58px; }
  }

  /* ════════════════════════════════════
     MONITOR  1440px – 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .lb-wrap      { height: 116px; }
    .lb-logo-item { margin: 0 56px; }
    .lb-logo-img  { height: 66px; }
  }

  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .lb-wrap      { height: 100px; }
    .lb-logo-item { margin: 0 68px; }
    .lb-logo-img  { height: 45px; }
  }

  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .logo-track { animation: none !important; }
  }
`;

const logos = [
    { src: "/images/logo/Kobo.png", alt: "Kobo" },
    { src: "/images/logo/Amazon.png", alt: "Amazon" },
    { src: "/images/logo/AppleBooks.png", alt: "Apple Books" },
    { src: "/images/logo/Barnes.png", alt: "Barnes & Noble" },
    { src: "/images/logo/Ingram.png", alt: "IngramSpark" },
];

const allLogos = [...logos, ...logos, ...logos, ...logos, ...logos];

const LogoBar: React.FC = () => {
    return (
        <>
            <style>{logoBarStyle}</style>
            <div className="lb-wrap">
                <div className="logo-track">
                    {allLogos.map((logo, i) => (
                        <div key={i} className="lb-logo-item">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="lb-logo-img"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LogoBar;