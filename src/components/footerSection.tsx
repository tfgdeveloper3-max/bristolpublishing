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
    font-weight: 300;
    color: #0A0A0A;
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: clamp(0.82rem, 1.8vw, 1rem);
  }
  .footer-link:hover { color: #FF4545; }

  .ft-social-link {
    width: 38px; height: 38px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0,0,0,0.03);
    display: flex; align-items: center; justify-content: center;
    color: #0A0A0A;
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s;
    flex-shrink: 0;
  }
  .ft-social-link:hover {
    border-color: rgba(255,69,69,0.5);
    color: #FF4545;
    background: rgba(255,69,69,0.08);
    transform: translateY(-3px);
  }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */

  .ft-footer {
    background: linear-gradient(180deg, #FFFFFF 0%, #FFF9F9 25%, #FFE8E8 55%, #FFD6D6 80%, #FFFFFF 100%);
    width: 100%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  .ft-orb-tl {
    position: absolute; top: 10%; left: -6%;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%);
    animation: orbPulse 7s ease-in-out infinite;
    pointer-events: none;
  }
  .ft-orb-br {
    position: absolute; bottom: 20%; right: -5%;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 70%);
    opacity: 0.15; pointer-events: none;
  }
  .ft-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .ft-ring {
    position: absolute; top: 8%; right: 5%;
    width: 90px; height: 90px;
    border: 1px dashed rgba(255,69,69,0.1);
    border-radius: 50%;
    animation: rotateSlow 20s linear infinite;
    pointer-events: none;
  }

  .ft-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 56px 16px 0;
  }

  /* ── TOP GRID (logo col + nav cols) ── */
  .ft-top-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 36px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }

  /* Logo column */
  .ft-logo-col {}

  .ft-logo-wrap { margin-bottom: 16px; }
  .ft-logo-wrap img { height: 48px; width: auto; }

  .ft-tagline {
    font-size: clamp(0.82rem, 2vw, 1rem);
    line-height: 1.8;
    color: #0A0A0A;
    font-weight: 300;
    margin: 0 0 22px;
    max-width: 100%;
  }

  .ft-socials {
    display: flex; gap: 9px; flex-wrap: wrap;
  }

  /* Nav columns — stack on mobile, row on larger */
  .ft-nav-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px 20px;
  }

  .ft-nav-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    color: #FF4545;
    margin: 0 0 14px;
  }

  .ft-nav-list {
    list-style: none;
    padding: 0; margin: 0;
    display: flex; flex-direction: column;
    gap: 10px;
  }

  /* ── NEWSLETTER STRIP ── */
  .ft-newsletter {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px 0;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }

  .ft-newsletter-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1rem, 3vw, 1.35rem);
    color: #FF4545;
    margin: 0 0 4px;
    letter-spacing: 0.03em;
  }
  .ft-newsletter-sub {
    font-size: clamp(0.82rem, 2vw, 1rem);
    color: #0A0A0A;
    margin: 0;
    font-weight: 300;
  }

  /* Email form */
  .ft-email-form {
    display: flex;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.1);
    width: 100%;
  }
  .ft-email-input {
    background: rgba(255,69,69,0.06);
    border: none;
    outline: none;
    padding: 12px 14px;
    color: #0A0A0A;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.84rem;
    font-weight: 300;
    flex: 1;
    min-width: 0;
  }
  .ft-email-input::placeholder { color: rgba(0,0,0,0.35); }
  .ft-subscribe-btn {
    background: linear-gradient(90deg, #FF4545, #fe5858);
    border: none;
    padding: 12px 18px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: opacity 0.2s ease;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .ft-subscribe-btn:hover { opacity: 0.85; }

  /* ── BOTTOM BAR ── */
  .ft-bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0 28px;
  }

  .ft-copyright {
    font-size: 0.74rem;
    color: rgba(0,0,0,0.35);
    margin: 0;
    font-weight: 300;
  }

  .ft-legal-links {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }


  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .ft-container    { padding: 64px 22px 0; }
    .ft-top-grid     { gap: 40px; padding-bottom: 44px; }
    .ft-logo-wrap img { height: 52px; }
    .ft-tagline      { max-width: 340px; }
    .ft-nav-cols     { grid-template-columns: repeat(3, 1fr); gap: 24px 16px; }
    .ft-newsletter   { padding: 34px 0; }
    .ft-email-form   { max-width: 420px; }
    .ft-orb-tl       { width: 280px; height: 280px; }
    .ft-orb-br       { width: 260px; height: 260px; }
    .ft-ring         { width: 110px; height: 110px; }
  }


  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .ft-container    { padding: 72px 28px 0; }

    /* Logo + nav side by side */
    .ft-top-grid {
      grid-template-columns: 1.3fr 2fr;
      gap: 48px;
      padding-bottom: 52px;
      align-items: start;
    }

    .ft-logo-wrap img { height: 54px; }
    .ft-tagline       { max-width: 280px; }
    .ft-nav-cols      { grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .ft-nav-title     { font-size: 0.82rem; }

    /* Newsletter row */
    .ft-newsletter {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 36px 0;
      gap: 24px;
    }
    .ft-email-form   { max-width: 360px; width: auto; flex-shrink: 0; }

    /* Bottom row */
    .ft-bottom {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 22px 0 32px;
    }

    .ft-orb-tl { width: 340px; height: 340px; }
    .ft-orb-br { width: 300px; height: 300px; }
    .ft-ring   { width: 130px; height: 130px; }
  }


  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .ft-container    { padding: 80px 40px 0; }

    .ft-top-grid {
      grid-template-columns: 1.4fr 1fr 1fr 1fr;
      gap: 48px;
      padding-bottom: 60px;
    }

    /* Nav cols sit directly in top grid (not nested) */
    .ft-nav-cols {
      display: contents;
    }

    .ft-logo-wrap img { height: 56px; }
    .ft-tagline       { max-width: 280px; }
    .ft-nav-title     { font-size: 0.85rem; margin-bottom: 18px; }
    .ft-nav-list      { gap: 11px; }

    .ft-newsletter    { padding: 38px 0; gap: 28px; }
    .ft-email-form    { max-width: 400px; border-radius: 12px; }
    .ft-email-input   { padding: 13px 18px; font-size: 0.88rem; }
    .ft-subscribe-btn { padding: 13px 22px; font-size: 0.88rem; }

    .ft-bottom { padding: 24px 0 36px; }

    .ft-orb-tl { width: 400px; height: 400px; }
    .ft-orb-br { width: 360px; height: 360px; }
    .ft-ring   { width: 150px; height: 150px; }
  }


  /* ════════════════════════════════════
     MONITOR  1440px – 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .ft-container    { padding: 88px 56px 0; max-width: 1380px; }

    .ft-top-grid     { gap: 56px; padding-bottom: 64px; }
    .ft-logo-wrap img { height: 60px; }
    .ft-tagline       { max-width: 300px; font-size: 1rem; }
    .ft-ft-social-link { width: 40px; height: 40px; }

    .ft-nav-title    { font-size: 0.9rem; margin-bottom: 20px; }
    .ft-nav-list     { gap: 12px; }

    .ft-newsletter   { padding: 40px 0; }
    .ft-email-form   { max-width: 440px; }
    .ft-email-input  { padding: 13px 20px; font-size: 0.88rem; }
    .ft-subscribe-btn { padding: 13px 24px; font-size: 0.9rem; }

    .ft-bottom       { padding: 24px 0 40px; }
    .ft-copyright    { font-size: 0.78rem; }

    .ft-orb-tl { width: 420px; height: 420px; }
    .ft-orb-br { width: 360px; height: 360px; }
    .ft-ring   { width: 150px; height: 150px; }
  }


  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .ft-container    { padding: 100px 80px 0; max-width: 100%; }

    .ft-top-grid     { gap: 72px; padding-bottom: 72px; }
    .ft-logo-wrap img { height: 68px; }
    .ft-tagline       { max-width: 340px; font-size: 1.05rem; }

    .ft-nav-title    { font-size: 1.2rem; margin-bottom: 22px; }
    .ft-nav-list     { gap: 14px; }

    .ft-newsletter   { padding: 48px 0; }
    .ft-email-form   { max-width: 500px; border-radius: 14px; }
    .ft-email-input  { padding: 15px 22px; font-size: 1.5rem; }
    .ft-subscribe-btn { padding: 15px 28px; font-size: 1.5rem; }

    .ft-bottom       { padding: 28px 0 48px; }
    .ft-copyright    { font-size: 1rem; }

    .ft-orb-tl { width: 500px; height: 500px; }
    .ft-orb-br { width: 440px; height: 440px; }
    .ft-ring   { width: 170px; height: 170px; }

    .ft-newsletter-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    color: #FF4545;
    margin: 0 0 4px;
    letter-spacing: 0.03em;
   }
   .ft-newsletter-sub {
    font-size: 24px;
    color: #0A0A0A;
    margin: 0;
    font-weight: 300;
   }

   .ft-tagline {
    font-size: 24px;
    line-height: 1.8;
    color: #0A0A0A;
    font-weight: 300;
    margin: 0 0 22px;
    max-width: 100%;
   }

   .footer-link {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    color: #0A0A0A;
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: 1.3rem;
   }

  
   .ft-logo-wrap { margin-bottom: 16px; }
   .ft-logo-wrap img { height: 78px; width: auto; }

   .ft-legal-links {
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
   }

   }

     @media (min-width: 2560px) {
    .ft-container    { padding: 100px 80px 0; max-width: 80%; }

    .ft-top-grid     { gap: 72px; padding-bottom: 72px; }
    .ft-logo-wrap img { height: 68px; }
    .ft-tagline       { max-width: 340px; font-size: 1.05rem; }

    .ft-nav-title    { font-size: 1.2rem; margin-bottom: 22px; }
    .ft-nav-list     { gap: 14px; }

    .ft-newsletter   { padding: 48px 0; }
    .ft-email-form   { max-width: 500px; border-radius: 14px; }
    .ft-email-input  { padding: 15px 22px; font-size: 1.5rem; }
    .ft-subscribe-btn { padding: 15px 28px; font-size: 1.5rem; }

    .ft-bottom       { padding: 28px 0 48px; }
    .ft-copyright    { font-size: 1rem; }

    .ft-orb-tl { width: 500px; height: 500px; }
    .ft-orb-br { width: 440px; height: 440px; }
    .ft-ring   { width: 170px; height: 170px; }

    .ft-newsletter-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    color: #FF4545;
    margin: 0 0 4px;
    letter-spacing: 0.03em;
   }
   .ft-newsletter-sub {
    font-size: 24px;
    color: #0A0A0A;
    margin: 0;
    font-weight: 300;
   }

   .ft-tagline {
    font-size: 24px;
    line-height: 1.8;
    color: #0A0A0A;
    font-weight: 300;
    margin: 0 0 22px;
    max-width: 100%;
   }

   .footer-link {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    color: #0A0A0A;
    text-decoration: none;
    transition: color 0.2s ease;
    font-size: 1.3rem;
   }

  
   .ft-logo-wrap { margin-bottom: 16px; }
   .ft-logo-wrap img { height: 78px; width: auto; }

   .ft-legal-links {
    font-size: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
   }

   }


  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .ft-orb-tl { animation: none !important; }
    .ft-ring   { animation: none !important; }
  }
`;

const NAV_COLS = [
  { title: "Quick Nav", links: ["Home", "About Us", "Services", "Portfolio", "Contact"] },
  { title: "Services", links: ["Publishing", "Ghostwriting", "Cover Design", "Book Marketing", "Audio Book"] },
  { title: "Support", links: ["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"] },
];

const SOCIAL_ICONS = [
  { label: "Instagram", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { label: "Twitter", icon: <svg width="15" height="15" viewBox="0 0 24 24" stroke="#FF4545" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { label: "Facebook", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
  { label: "LinkedIn", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg> },
];

const FooterSection: React.FC = () => {
  return (
    <>
      <style>{footerStyles}</style>

      <footer className="ft-footer">

        {/* Decorative BG */}
        <div className="ft-orb-tl" />
        <div className="ft-orb-br" />
        <div className="ft-grid-bg" />
        <div className="ft-ring" />

        <div className="ft-container">

          {/* ── TOP GRID ── */}
          <div className="ft-top-grid">

            {/* Logo column */}
            <div className="ft-logo-col">
              <div className="ft-logo-wrap">
                <img src="/images/footerlogo.png" alt="Bristol Publishers" />
              </div>
              <p className="ft-tagline">
                Bristol Publishers handle the complexity of publishing so your focus remains on creativity while we manage execution. Because finishing a book is not the end, it’s the transition from creation to recognition.
              </p>
              <div className="ft-socials">
                {SOCIAL_ICONS.map(s => (
                  <a key={s.label} href="#" className="ft-social-link" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns — on laptop+ display:contents puts these directly in the 4-col grid */}
            <div className="ft-nav-cols">
              {NAV_COLS.map(col => (
                <div key={col.title}>
                  <p className="ft-nav-title">{col.title}</p>
                  <ul className="ft-nav-list">
                    {col.links.map(link => (
                      <li key={link}>
                        <a href="#" className="footer-link">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

          {/* ── NEWSLETTER STRIP ── */}
          <div className="ft-newsletter">
            <div>
              <p className="ft-newsletter-title">Stay in the loop</p>
              <p className="ft-newsletter-sub">Get publishing tips, author stories & exclusive offers.</p>
            </div>
            <div className="ft-email-form">
              <input
                type="email"
                placeholder="Your email address"
                className="ft-email-input"
              />
              <button
                className="ft-subscribe-btn"
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = "1"}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="ft-bottom">
            <p className="ft-copyright">©2026 Bristol Publishers. All Rights Reserved.</p>
            <div className="ft-legal-links">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <a key={l} href="#" className="footer-link" style={{}}>{l}</a>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default FooterSection;