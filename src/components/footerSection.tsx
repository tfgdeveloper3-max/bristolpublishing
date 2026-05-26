import React from "react";

const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes orbPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.7; transform: scale(1.1); }
  }

  .footer-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    color: #0A0A0A;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .footer-link:hover { color: #FF4545; }

  .social-link {
    width: 40px; height: 40px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    display: flex; align-items: center; justify-content: center;
    color: #0A0A0A;
    text-decoration: none;
    transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease, transform 0.25s ease;
  }
  .social-link:hover {
    border-color: rgba(255,69,69,0.5);
    color: #FF4545;
    background: rgba(255,69,69,0.08);
    transform: translateY(-3px);
  }
`;

const NAV_COLS = [
    {
        title: "Quick Nav",
        links: ["Home", "About Us", "Services", "Portfolio", "Contact"],
    },
    {
        title: "Services",
        links: ["Publishing", "Ghostwriting", "Cover Design", "Book Marketing", "Audio Book"],
    },
    {
        title: "Support",
        links: ["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"],
    },
];

const FooterSection: React.FC = () => {
    return (
        <>
            <style>{footerStyles}</style>
            <footer
                style={{
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%)",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                <div style={{
                    position: "absolute", top: "10%", left: "-6%",
                    width: "420px", height: "420px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%)",
                    animation: "orbPulse 7s ease-in-out infinite",
                    pointerEvents: "none",
                }} />
                <div
                    style={{
                        position: "absolute",
                        bottom: "20%",
                        right: "-5%",
                        width: "360px",
                        height: "360px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(255,69,69,0.7) 0%, transparent 70%)",
                        opacity: 0.15,
                        pointerEvents: "none",
                    }}
                />
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
                    position: "absolute", top: "8%", right: "5%",
                    width: "150px", height: "150px",
                    border: "1px dashed rgba(255,69,69,0.1)",
                    borderRadius: "50%",
                    animation: "rotateSlow 20s linear infinite",
                    pointerEvents: "none",
                }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 40px 0" }}>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                        gap: "48px",
                        paddingBottom: "60px",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}>

                        <div>
                            <div style={{ marginBottom: "20px" }}>
                                <img
                                    src="/images/footerlogo.png"
                                    alt="Bristol Publishing"
                                    className="h-15 w-auto"
                                />
                            </div>

                            <p style={{
                                fontSize: "1rem",
                                lineHeight: 1.8,
                                color: "#0A0A0A",
                                fontWeight: 300,
                                margin: "0 0 28px",
                                maxWidth: "280px",
                            }}>
                                Bristol Publishers supports authors who want to move from a finished draft to a published book without confusion. We handle editing, design, publishing, and marketing so your work reaches readers clearly and professionally.
                            </p>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <svg width="16" height="16" viewBox="0 0 24 24" stroke="#FF4545" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="LinkedIn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {NAV_COLS.map((col) => (
                            <div key={col.title}>
                                <p style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: "0.9rem",
                                    letterSpacing: "0.18em",
                                    color: "#FF4545",
                                    margin: "0 0 20px",
                                }}>{col.title}</p>
                                <ul style={{ listStyle: "none", color: "black", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                    {col.links.map(link => (
                                        <li key={link}>
                                            <a href="#" className="footer-link">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "24px",
                        padding: "40px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}>
                        <div>
                            <p style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "1.35rem",
                                color: "#FF4545",
                                margin: "0 0 4px",
                                letterSpacing: "0.03em",
                            }}>Stay in the loop</p>
                            <p style={{
                                fontSize: "1rem",
                                color: "#0A0A0A",
                                margin: 0,
                                fontWeight: 300,
                            }}>Get publishing tips, author stories & exclusive offers.</p>
                        </div>
                        <div style={{ display: "flex", gap: "0", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                style={{
                                    background: "#FF4545",
                                    border: "none",
                                    outline: "none",
                                    padding: "13px 20px",
                                    color: "#ffffff",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "0.88rem",
                                    fontWeight: 300,
                                    width: "260px",
                                }}
                            />
                            <button style={{
                                background: "linear-gradient(90deg, #FF4545, #fe5858)",
                                border: "none",
                                padding: "13px 24px",
                                color: "white",
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: "0.9rem",
                                letterSpacing: "0.1em",
                                cursor: "pointer",
                                transition: "opacity 0.2s ease",
                            }}
                                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"}
                                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
                            >
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "24px 0",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}>
                        <p style={{
                            fontSize: "0.78rem",
                            color: "rgba(255,255,255,0.3)",
                            margin: 0,
                            fontWeight: 300,
                        }}>©2026 Bristol Publishers. All Rights Reserved.</p>
                        <div style={{ display: "flex", gap: "24px" }}>
                            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                                <a key={l} href="#" className="footer-link" style={{ fontSize: "0.78rem" }}>{l}</a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <div style={{ width: "100%", overflow: "hidden", marginTop: "0", lineHeight: 0 }}>
                    <p style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        textAlign: "center",
                        fontSize: "clamp(15rem, 22vw, 20rem)",
                        color: "#fe5858",
                        letterSpacing: "0.15em",
                        lineHeight: 0.85,
                        margin: 0,
                        padding: 0,
                        userSelect: "none",
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, rgba(255,69,69,0.12) 50%, rgba(255,69,69,0.05) 100%)",
                        display: "block",
                    }}>
                        BRISTOL
                        <span style={{ color: "#0A0A0A", fontSize: "clamp(3rem, 4vw, 5rem)", letterSpacing: "0.1em", }}>PUBLISHERS</span>
                    </p>
                </div> */}

            </footer>
        </>
    );
};

export default FooterSection;