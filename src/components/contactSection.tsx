import React, { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const contactStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes orbPulse {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%       { opacity: 0.75; transform: scale(1.1); }
  }

  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  @keyframes successPop {
    0%   { opacity: 0; transform: scale(0.7); }
    70%  { transform: scale(1.08); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes checkDraw {
    from { stroke-dashoffset: 40; }
    to   { stroke-dashoffset: 0; }
  }

  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }

  .field-wrap {
    position: relative;
  }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 18px 20px 18px 56px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
    caret-color: #FF4545;
  }

  .field-input::placeholder {
    color: rgba(255,255,255,0.25);
  }

  .field-input:focus {
    border-color: rgba(255,69,69,0.6);
    background: rgba(255,69,69,0.04);
    box-shadow: 0 0 0 3px rgba(255,69,69,0.1), 0 8px 32px rgba(0,0,0,0.3);
  }

  .field-input:focus + .field-icon {
    color: #FF4545 !important;
  }

  .field-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.25);
    transition: color 0.3s ease;
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .field-icon-textarea {
    top: 20px;
    transform: none;
  }

  .field-label {
    position: absolute;
    left: 56px;
    top: 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    color: rgba(255,255,255,0.25);
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    transform-origin: left;
  }

  .field-input:focus ~ .field-label,
  .field-input:not(:placeholder-shown) ~ .field-label {
    top: -10px;
    left: 14px;
    font-size: 0.72rem;
    color: #FF4545;
    background: #0a0e2a;
    padding: 0 6px;
    border-radius: 4px;
    letter-spacing: 0.06em;
  }

  textarea.field-input {
    resize: none;
    padding-top: 18px;
    line-height: 1.65;
    min-height: 140px;
  }

  .submit-btn {
    width: 100%;
    padding: 18px;
    border-radius: 14px;
    background: linear-gradient(90deg, #FF4545 0%, #fe5858 100%);
    color: white;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 8px 32px rgba(255,69,69,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(255,69,69,0.45);
  }

  .submit-btn:hover::before {
    transform: translateX(100%);
  }

  .submit-btn:active {
    transform: translateY(-1px);
  }

  .info-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
  }

  .info-card:hover {
    transform: translateX(6px);
    border-color: rgba(255,69,69,0.4) !important;
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

const INFO_ITEMS = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
        ),
        label: "Phone",
        value: "+99 123 456 789",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: "Email",
        value: "info@bristolpublishers.com",
    },
];

const ContactForm: React.FC = () => {
    const { ref, visible } = useInView(0.08);
    const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
    };

    return (
        <>
            <style>{contactStyles}</style>

            <section
                ref={ref}
                style={{
                    background: "linear-gradient(180deg, #040517 0%, #070b2e 55%, #040517 100%)",
                    width: "100%",
                    overflow: "hidden",
                    padding: "100px 0 110px",
                    position: "relative",
                }}
            >
                <div style={{
                    position: "absolute", top: "15%", right: "-6%",
                    width: "460px", height: "460px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%)",
                    animation: "orbPulse 6s ease-in-out infinite",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "10%", left: "-5%",
                    width: "400px", height: "400px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(26,36,95,0.55) 0%, transparent 70%)",
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
                    position: "absolute", top: "8%", left: "4%",
                    width: "160px", height: "160px",
                    border: "1px dashed rgba(255,69,69,0.1)",
                    borderRadius: "50%",
                    animation: "rotateSlow 22s linear infinite",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", top: "30%", right: "10%",
                    width: "80px", height: "80px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,69,69,0.18) 0%, transparent 70%)",
                    animation: "floatOrb 5s ease-in-out infinite",
                    pointerEvents: "none",
                    filter: "blur(2px)",
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
                            }}>START YOUR JOURNEY</span>
                        </div>

                        <h2 style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "clamp(2.8rem, 5vw, 4.8rem)",
                            letterSpacing: "-0.02em",
                            lineHeight: 0.9,
                            color: "white",
                            margin: 0,
                        }}>
                            {visible && (
                                <>
                                    <SplitText
                                        text="Get In"
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
                                        text="Touch"
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
                                    <br />
                                    <SplitText
                                        text="And Take the Next Step"
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

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.35fr",
                        gap: "56px",
                        alignItems: "start",
                    }}>

                        <div style={{
                            opacity: visible ? 1 : 0,
                            animation: visible ? "fadeLeft 0.9s ease 0.3s forwards" : "none",
                        }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "48px" }}>
                                {INFO_ITEMS.map((item, i) => (
                                    <div
                                        key={i}
                                        className="info-card"
                                        style={{
                                            display: "flex", alignItems: "center", gap: "16px",
                                            padding: "18px 22px",
                                            borderRadius: "14px",
                                            background: "rgba(255,255,255,0.028)",
                                            border: "1px solid rgba(255,255,255,0.07)",
                                            backdropFilter: "blur(6px)",
                                        }}
                                    >
                                        <div style={{
                                            width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                                            background: "rgba(255,69,69,0.1)",
                                            border: "1px solid rgba(255,69,69,0.2)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#FF4545",
                                        }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p style={{
                                                fontFamily: "'Bebas Neue', sans-serif",
                                                fontSize: "0.75rem",
                                                letterSpacing: "0.15em",
                                                color: "rgba(255,255,255,0.35)",
                                                margin: "0 0 2px",
                                            }}>{item.label}</p>
                                            <p style={{
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: "0.92rem",
                                                color: "rgba(255,255,255,0.75)",
                                                margin: 0,
                                                fontWeight: 400,
                                            }}>{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <div style={{
                                padding: "28px 28px",
                                borderRadius: "18px",
                                background: "linear-gradient(135deg, rgba(255,69,69,0.08), rgba(255,69,69,0.03))",
                                border: "1px solid rgba(255,69,69,0.15)",
                                display: "flex", alignItems: "center", gap: "20px",
                            }}>
                                <div>
                                    <p style={{
                                        fontFamily: "'Bebas Neue', sans-serif",
                                        fontSize: "3rem",
                                        color: "#FF4545",
                                        margin: 0, lineHeight: 1,
                                        letterSpacing: "-0.02em",
                                    }}>24h</p>
                                    <p style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.75rem",
                                        color: "rgba(255,255,255,0.35)",
                                        margin: 0,
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                    }}>Response Time</p>
                                </div>
                                <div style={{ width: "1px", height: "50px", background: "rgba(255,69,69,0.2)" }} />
                                <div>
                                    <p style={{
                                        fontFamily: "'Bebas Neue', sans-serif",
                                        fontSize: "3rem",
                                        color: "#FF4545",
                                        margin: 0, lineHeight: 1,
                                        letterSpacing: "-0.02em",
                                    }}>Free</p>
                                    <p style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "0.75rem",
                                        color: "rgba(255,255,255,0.35)",
                                        margin: 0,
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                    }}>Consultation</p>
                                </div>
                            </div> */}
                        </div>

                        <div style={{
                            opacity: visible ? 1 : 0,
                            animation: visible ? "fadeRight 0.9s ease 0.4s forwards" : "none",
                        }}>

                            <div style={{
                                borderRadius: "24px",
                                padding: "2px",
                                background: "linear-gradient(135deg, rgba(255,69,69,0.35), rgba(26,36,95,0.6), rgba(255,69,69,0.2))",
                            }}>
                                <div style={{
                                    borderRadius: "22px",
                                    background: "linear-gradient(145deg, #0d1230 0%, #0a0e22 100%)",
                                    padding: "44px 40px",
                                    position: "relative",
                                    overflow: "hidden",
                                }}>
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        backgroundImage: `
                                            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
                                        `,
                                        backgroundSize: "40px 40px",
                                        pointerEvents: "none",
                                    }} />

                                    {submitted ? (
                                        <div style={{
                                            display: "flex", flexDirection: "column",
                                            alignItems: "center", justifyContent: "center",
                                            minHeight: "360px", gap: "20px",
                                            animation: "successPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
                                        }}>
                                            <div style={{
                                                width: "80px", height: "80px", borderRadius: "50%",
                                                background: "rgba(255,69,69,0.12)",
                                                border: "2px solid rgba(255,69,69,0.4)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                            }}>
                                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline
                                                        points="20 6 9 17 4 12"
                                                        style={{
                                                            strokeDasharray: 40,
                                                            strokeDashoffset: 0,
                                                            animation: "checkDraw 0.5s ease 0.3s both",
                                                        }}
                                                    />
                                                </svg>
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                                <p style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    fontSize: "2rem",
                                                    color: "white",
                                                    margin: "0 0 8px",
                                                    letterSpacing: "0.03em",
                                                }}>Message Sent!</p>
                                                <p style={{
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontSize: "0.9rem",
                                                    color: "rgba(255,255,255,0.45)",
                                                    margin: 0,
                                                    fontWeight: 300,
                                                }}>We'll get back to you within 24 hours.</p>
                                            </div>
                                            <button
                                                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }}
                                                style={{
                                                    fontFamily: "'Bebas Neue', sans-serif",
                                                    letterSpacing: "0.1em",
                                                    fontSize: "0.9rem",
                                                    padding: "10px 28px",
                                                    borderRadius: "999px",
                                                    background: "transparent",
                                                    color: "rgba(255,255,255,0.5)",
                                                    border: "1px solid rgba(255,255,255,0.15)",
                                                    cursor: "pointer",
                                                    marginTop: "8px",
                                                }}
                                            >SEND ANOTHER</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 2 }}>

                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                <div className="field-wrap">
                                                    <input
                                                        className="field-input"
                                                        type="text"
                                                        name="name"
                                                        placeholder=" "
                                                        value={form.name}
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                    />
                                                    <span className="field-icon">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                    </span>
                                                    <label className="field-label">Full Name</label>
                                                </div>

                                                <div className="field-wrap">
                                                    <input
                                                        className="field-input"
                                                        type="tel"
                                                        name="phone"
                                                        placeholder=" "
                                                        value={form.phone}
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                    />
                                                    <span className="field-icon">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                                        </svg>
                                                    </span>
                                                    <label className="field-label">Phone Number</label>
                                                </div>
                                            </div>

                                            <div className="field-wrap">
                                                <input
                                                    className="field-input"
                                                    type="email"
                                                    name="email"
                                                    placeholder=" "
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                />
                                                <span className="field-icon">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                                    </svg>
                                                </span>
                                                <label className="field-label">Email Address</label>
                                            </div>

                                            <div className="field-wrap">
                                                <textarea
                                                    className="field-input"
                                                    name="message"
                                                    placeholder=" "
                                                    value={form.message}
                                                    onChange={handleChange}
                                                />
                                                <span className="field-icon field-icon-textarea">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                                    </svg>
                                                </span>
                                                <label className="field-label">Your Message</label>
                                            </div>

                                            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                                                {loading ? (
                                                    <>
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
                                                            style={{ animation: "rotateSlow 0.8s linear infinite" }}>
                                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                                        </svg>
                                                        SENDING...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Now
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactForm;