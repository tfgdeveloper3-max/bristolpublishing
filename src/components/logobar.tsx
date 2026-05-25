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
            <div
                style={{
                    backgroundColor: "#FF4545",
                    height: "120px",
                    width: "100%",
                    overflow: "hidden",
                    paddingTop: "30px",
                    paddingBottom: "14px",
                }}
            >
                <div className="logo-track">
                    {allLogos.map((logo, i) => (
                        <div
                            key={i}
                            style={{
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: "48px",
                                marginRight: "48px",
                            }}
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                style={{
                                    height: "36px",
                                    width: "auto",
                                    objectFit: "contain",
                                    opacity: 0.92,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LogoBar;