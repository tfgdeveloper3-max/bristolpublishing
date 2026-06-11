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

  /* ── Form field styles (screen-size independent) ── */
  .field-wrap { position: relative; }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 16px 18px 16px 52px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
    caret-color: #FF4545;
  }
  .field-input::placeholder { color: rgba(255,255,255,0.25); }
  .field-input:focus {
    border-color: rgba(255,69,69,0.6);
    background: rgba(255,69,69,0.04);
    box-shadow: 0 0 0 3px rgba(255,69,69,0.1), 0 8px 32px rgba(0,0,0,0.3);
  }
  .field-input:focus + .field-icon { color: #FF4545 !important; }

  .field-icon {
    position: absolute; left: 16px; top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.25);
    transition: color 0.3s ease;
    pointer-events: none;
    display: flex; align-items: center;
  }
  .field-icon-textarea { top: 18px; transform: none; }

  .field-label {
    position: absolute; left: 52px; top: 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    color: rgba(255,255,255,0.25);
    pointer-events: none;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    transform-origin: left;
  }
  .field-input:focus ~ .field-label,
  .field-input:not(:placeholder-shown) ~ .field-label {
    top: -10px; left: 12px;
    font-size: 0.7rem; color: #FF4545;
    background: #0e2432;
    padding: 0 6px; border-radius: 4px;
    letter-spacing: 0.06em;
  }
  textarea.field-input {
    resize: none; padding-top: 16px;
    line-height: 1.65; min-height: 120px;
  }

  .submit-btn {
    width: 100%; padding: 16px;
    border-radius: 12px;
    background: linear-gradient(90deg, #FF4545 0%, #fe5858 100%);
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem; letter-spacing: 0.15em;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 8px 32px rgba(255,69,69,0.3);
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .submit-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(255,69,69,0.45); }
  .submit-btn:hover::before { transform: translateX(100%); }
  .submit-btn:active { transform: translateY(-1px); }

  .info-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  .info-card:hover {
    transform: translateX(6px);
    border-color: rgba(255,69,69,0.4) !important;
  }

  /* ════════════════════════════════════
     BASE — Small Mobile (≤ 479px)
     ════════════════════════════════════ */

  .ct-section {
    background: linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%);
    width: 100%;
    overflow: hidden;
    padding: 60px 0 70px;
    position: relative;
  }

  .ct-orb-tr {
    position: absolute; top: 15%; right: -6%;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.07) 0%, transparent 65%);
    animation: orbPulse 6s ease-in-out infinite;
    pointer-events: none;
  }
  .ct-orb-bl {
    position: absolute; bottom: 10%; left: -5%;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(27,70,95,0.55) 0%, transparent 70%);
    pointer-events: none;
  }
  .ct-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }
  .ct-ring {
    position: absolute; top: 8%; left: 4%;
    width: 100px; height: 100px;
    border: 1px dashed rgba(255,69,69,0.1);
    border-radius: 50%;
    animation: rotateSlow 22s linear infinite;
    pointer-events: none;
  }
  .ct-float-orb {
    position: absolute; top: 30%; right: 10%;
    width: 50px; height: 50px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,69,0.18) 0%, transparent 70%);
    animation: floatOrb 5s ease-in-out infinite;
    pointer-events: none;
    filter: blur(2px);
  }

  .ct-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  /* Header */
  .ct-header { margin-bottom: 36px; }

  .ct-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .ct-eyebrow-line {
    height: 2px; background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .ct-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem; letter-spacing: 0.25em; color: #FF4545;
  }

  .ct-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 7vw, 4.5rem);
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: white;
    margin: 0;
  }

  /* Main grid — single column on mobile */
  .ct-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: start;
  }

  /* Info cards column */
  .ct-info-col {}

  .ct-info-cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 0;
  }

  .ct-info-card {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 18px;
    border-radius: 12px;
    background: rgba(255,255,255,0.028);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(6px);
  }

  .ct-info-icon {
    width: 40px; height: 40px; border-radius: 10px;
    flex-shrink: 0;
    background: rgba(255,69,69,0.1);
    border: 1px solid rgba(255,69,69,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #FF4545;
  }

  .ct-info-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem; letter-spacing: 0.15em;
    color: rgba(255,255,255,0.35);
    margin: 0 0 2px;
  }
  .ct-info-value {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.8rem, 2vw, 0.92rem);
    color: rgba(255,255,255,0.75);
    margin: 0; font-weight: 400;
    word-break: break-all;
  }

  /* Form card */
  .ct-form-border {
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,69,69,0.35), rgba(26,36,95,0.6), rgba(255,69,69,0.2));
  }

  .ct-form-card {
    border-radius: 18px;
    background: linear-gradient(180deg, #1B465F 0%, #14384C 50%, #0E2432 100%);
    padding: 28px 20px;
    position: relative;
    overflow: hidden;
  }

  .ct-form-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .ct-form-fields {
    display: flex; flex-direction: column;
    gap: 16px; position: relative; z-index: 2;
  }

  /* Name + Phone: stack on mobile, side by side on larger */
  .ct-name-phone {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Success state */
  .ct-success {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 300px; gap: 18px;
    animation: successPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
    position: relative; z-index: 2;
  }
  .ct-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(255,69,69,0.12);
    border: 2px solid rgba(255,69,69,0.4);
    display: flex; align-items: center; justify-content: center;
  }
  .ct-success-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1.4rem, 4vw, 2rem);
    color: white; margin: 0 0 6px;
    letter-spacing: 0.03em; text-align: center;
  }
  .ct-success-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; color: rgba(255,255,255,0.7);
    margin: 0; font-weight: 300; text-align: center;
  }
  .ct-success-btn {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.1em; font-size: 0.85rem;
    padding: 10px 26px; border-radius: 999px;
    background: transparent; color: white;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer; margin-top: 6px;
  }


  /* ════════════════════════════════════
     LARGE MOBILE  480px – 767px
     ════════════════════════════════════ */
  @media (min-width: 480px) {
    .ct-section    { padding: 70px 0 80px; }
    .ct-container  { padding: 0 22px; }
    .ct-header     { margin-bottom: 40px; }
    .ct-form-card  { padding: 32px 26px; }
    .ct-name-phone { grid-template-columns: 1fr 1fr; }
    .ct-info-card  { padding: 18px 20px; }
    .ct-orb-tr     { width: 300px; height: 300px; }
    .ct-orb-bl     { width: 260px; height: 260px; }
    .ct-ring       { width: 120px; height: 120px; }
  }


  /* ════════════════════════════════════
     TABLET  768px – 1023px
     ════════════════════════════════════ */
  @media (min-width: 768px) {
    .ct-section    { padding: 80px 0 90px; }
    .ct-container  { padding: 0 28px; }
    .ct-header     { margin-bottom: 52px; }
    .ct-eyebrow-text { font-size: 0.75rem; }

    /* 2-col grid: info left, form right */
    .ct-grid {
      grid-template-columns: 1fr 1.2fr;
      gap: 36px;
    }

    .ct-info-cards { margin-bottom: 0; gap: 13px; }
    .ct-info-card  { padding: 18px 20px; border-radius: 13px; }
    .ct-info-icon  { width: 42px; height: 42px; border-radius: 11px; }

    .ct-form-border { border-radius: 22px; }
    .ct-form-card   { padding: 36px 30px; border-radius: 20px; }
    .ct-name-phone  { grid-template-columns: 1fr 1fr; }

    .ct-orb-tr { width: 360px; height: 360px; }
    .ct-orb-bl { width: 320px; height: 320px; }
    .ct-ring   { width: 140px; height: 140px; }
    .ct-float-orb { width: 64px; height: 64px; }
  }


  /* ════════════════════════════════════
     LAPTOP  1024px – 1439px
     ════════════════════════════════════ */
  @media (min-width: 1024px) {
    .ct-section    { padding: 100px 0 110px; }
    .ct-container  { padding: 0 40px; }
    .ct-header     { margin-bottom: 60px; }

    .ct-grid {
      grid-template-columns: 1fr 1.35fr;
      gap: 48px;
    }

    .ct-info-cards { gap: 14px; margin-bottom: 0; }
    .ct-info-card  { padding: 18px 22px; border-radius: 14px; }
    .ct-info-icon  { width: 44px; height: 44px; border-radius: 12px; }
    .ct-info-value { font-size: 0.9rem; word-break: normal; }

    .ct-form-border { border-radius: 24px; }
    .ct-form-card   { padding: 40px 36px; border-radius: 22px; }

    .field-input    { padding: 17px 19px 17px 54px; font-size: 0.92rem; border-radius: 13px; }
    .field-label    { font-size: 0.9rem; top: 17px; }
    textarea.field-input { min-height: 130px; }
    .submit-btn     { padding: 17px; font-size: 0.95rem; border-radius: 13px; }

    .ct-orb-tr { width: 420px; height: 420px; }
    .ct-orb-bl { width: 380px; height: 380px; }
    .ct-ring   { width: 155px; height: 155px; }
    .ct-float-orb { width: 76px; height: 76px; }
  }


  /* ════════════════════════════════════
     MONITOR  1440px - 1919px
     ════════════════════════════════════ */
  @media (min-width: 1440px) {
    .ct-section    { padding: 110px 0 120px; }
    .ct-container  { padding: 0 56px; max-width: 1380px; }
    .ct-header     { margin-bottom: 68px; }
    .ct-eyebrow-text { font-size: 0.85rem; }

    .ct-grid {
      grid-template-columns: 1fr 1.35fr;
      gap: 56px;
    }

    .ct-info-cards { gap: 14px; }
    .ct-info-card  { padding: 18px 22px; }
    .ct-info-value { font-size: 0.92rem; }

    .ct-form-border { border-radius: 26px; }
    .ct-form-card   { padding: 44px 40px; border-radius: 24px; }

    .field-input    { padding: 18px 20px 18px 56px; font-size: 0.95rem; border-radius: 14px; }
    .field-label    { font-size: 0.92rem; top: 18px; }
    textarea.field-input { min-height: 140px; }
    .submit-btn     { padding: 18px; font-size: 1rem; border-radius: 14px; }

    .ct-orb-tr { width: 460px; height: 460px; }
    .ct-orb-bl { width: 400px; height: 400px; }
    .ct-ring   { width: 160px; height: 160px; }
    .ct-float-orb { width: 80px; height: 80px; }
  }


  /* ════════════════════════════════════
     ULTRA-WIDE  ≥ 1920px
     ════════════════════════════════════ */
  @media (min-width: 1920px) {
    .ct-section    { padding: 130px 0 140px; }
    .ct-container  { padding: 0 80px; max-width: 100%; }
    .ct-header     { margin-bottom: 80px; }

    .ct-grid { gap: 72px; }

    .ct-info-cards { gap: 16px; }
    .ct-info-card  { padding: 20px 26px; border-radius: 16px; }
    .ct-info-icon  { width: 58px; height: 58px; border-radius: 13px; }
    .ct-info-label { font-size: 1rem; }
    .ct-info-value { font-size: 1.2rem; }

    .ct-form-border { border-radius: 28px; }
    .ct-form-card   { padding: 52px 48px; border-radius: 26px; }

    .field-input    { padding: 20px 22px 20px 60px; font-size: 1.2rem; border-radius: 15px; }
    .field-label    { font-size: 1.1rem; top: 20px; left: 60px; }
    .field-icon     { left: 20px; }
    textarea.field-input { min-height: 155px; }
    .submit-btn     {padding: 20px; font-size: 1.5rem;  fontWeight: 600;  border-radius: 15px; letter-spacing: 0.18em; }

    .ct-orb-tr { width: 560px; height: 560px; }
    .ct-orb-bl { width: 480px; height: 480px; }
    .ct-ring   { width: 180px; height: 180px; }
    .ct-float-orb { width: 90px; height: 90px; }

  .SendNow{
   fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "1.5rem"
  }
  
    .ct-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .ct-eyebrow-line {
    height: 2px; background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .ct-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem; letter-spacing: 0.25em; color: #FF4545;
    font-weight: 600;
  }

  .ct-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 4rem;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: white;
    margin: 0;
  }


  }

    @media (min-width: 2560px) {
    .ct-section    { padding: 130px 0 140px; }
    .ct-container  { padding: 0 80px; max-width: 80%; }
    .ct-header     { margin-bottom: 80px; }

    .ct-grid { gap: 72px; }

    .ct-info-cards { gap: 16px; }
    .ct-info-card  { padding: 20px 26px; border-radius: 16px; }
    .ct-info-icon  { width: 58px; height: 58px; border-radius: 13px; }
    .ct-info-label { font-size: 1.2rem; }
    .ct-info-value { font-size: 1.8rem; }

    .ct-form-border { border-radius: 28px; }
    .ct-form-card   { padding: 52px 48px; border-radius: 26px; }

    .field-input    { padding: 20px 22px 20px 60px; font-size: 1.5rem; border-radius: 15px; }
    .field-label    { font-size: 1.3rem; top: 20px; left: 60px; }
    .field-icon     { left: 20px; }
    textarea.field-input { min-height: 155px; }
    .submit-btn     {padding: 40px 30px; font-size: 1.5rem;  fontWeight: 600;  border-radius: 15px; letter-spacing: 0.18em; }

    .ct-orb-tr { width: 560px; height: 560px; }
    .ct-orb-bl { width: 480px; height: 480px; }
    .ct-ring   { width: 180px; height: 180px; }
    .ct-float-orb { width: 90px; height: 90px; }

  .SendNow{
   fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "1.5rem"
  }
  
    .ct-eyebrow {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .ct-eyebrow-line {
    height: 2px; background: #FF4545;
    transition: width 0.8s ease 0.2s;
  }
  .ct-eyebrow-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem; letter-spacing: 0.25em; color: #FF4545;
    font-weight: 600;
  }

  .ct-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 5rem;
    letter-spacing: -0.02em;
    line-height: 0.92;
    color: white;
    margin: 0;
  }


  }


  /* ════════════════════════════════════
     REDUCE MOTION
     ════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .ct-orb-tr    { animation: none !important; }
    .ct-ring      { animation: none !important; }
    .ct-float-orb { animation: none !important; }
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
        ),
        label: "Phone",
        value: "+99 123 456 789",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

            <section ref={ref} id="contact" className="ct-section">

                {/* Decorative BG */}
                <div className="ct-orb-tr" />
                <div className="ct-orb-bl" />
                <div className="ct-grid-bg" />
                <div className="ct-ring" />
                <div className="ct-float-orb" />

                <div className="ct-container">

                    {/* ── HEADER ── */}
                    <div className="ct-header">
                        <div
                            className="ct-eyebrow"
                            style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.6s ease forwards" : "none" }}
                        >
                            <div className="ct-eyebrow-line" style={{ width: visible ? "48px" : "0" }} />
                            <span className="ct-eyebrow-text">START YOUR JOURNEY</span>
                        </div>

                        <h2
                            className="ct-heading"
                            style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.65s ease 0.1s forwards" : "none" }}
                        >
                            {visible && (
                                <>
                                    <SplitText
                                        text="Let’s prepare your" delay={35} duration={1.1} ease="power3.out"
                                        splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                                        threshold={0.1} rootMargin="-50px" textAlign="left"
                                    />
                                    {" "}
                                    <br />
                                    <SplitText
                                        text="book" className="text-[#FF4545]"
                                        delay={42} duration={1.2} ease="power3.out"
                                        splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                                        threshold={0.1} rootMargin="-50px" textAlign="left"
                                    />
                                    <br />
                                    <SplitText
                                        text="for readers beyond the draft stage"
                                        delay={42} duration={1.2} ease="power3.out"
                                        splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }}
                                        threshold={0.1} rootMargin="-50px" textAlign="left"
                                    />
                                </>
                            )}
                        </h2>
                    </div>

                    {/* ── MAIN GRID ── */}
                    <div className="ct-grid">

                        {/* LEFT — Info cards */}
                        <div
                            className="ct-info-col"
                            style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeLeft 0.9s ease 0.3s forwards" : "none" }}
                        >
                            <div className="ct-info-cards">
                                {INFO_ITEMS.map((item, i) => (
                                    <div key={i} className="info-card ct-info-card">
                                        <div className="ct-info-icon">{item.icon}</div>
                                        <div>
                                            <p className="ct-info-label">{item.label}</p>
                                            <p className="ct-info-value">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — Form */}
                        <div
                            style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeRight 0.9s ease 0.4s forwards" : "none" }}
                        >
                            <div className="ct-form-border">
                                <div className="ct-form-card">
                                    <div className="ct-form-grid-bg" />

                                    {submitted ? (
                                        <div className="ct-success">
                                            <div className="ct-success-icon">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: "checkDraw 0.5s ease 0.3s both" }} />
                                                </svg>
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                                <p className="ct-success-title">Message Sent!</p>
                                                <p className="ct-success-sub">We'll get back to you within 24 hours.</p>
                                            </div>
                                            <button
                                                className="ct-success-btn"
                                                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }}
                                            >
                                                SEND ANOTHER
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="ct-form-fields">

                                            {/* Name + Phone row */}
                                            <div className="ct-name-phone">
                                                <div className="field-wrap">
                                                    <input className="field-input" type="text" name="name" placeholder=" " value={form.name} onChange={handleChange} autoComplete="off" />
                                                    <span className="field-icon">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                    </span>
                                                    <label className="field-label">Full Name</label>
                                                </div>

                                                <div className="field-wrap">
                                                    <input className="field-input" type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} autoComplete="off" />
                                                    <span className="field-icon">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                                        </svg>
                                                    </span>
                                                    <label className="field-label">Phone Number</label>
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div className="field-wrap">
                                                <input className="field-input" type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} autoComplete="off" />
                                                <span className="field-icon">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                                    </svg>
                                                </span>
                                                <label className="field-label">Email Address</label>
                                            </div>

                                            {/* Message */}
                                            <div className="field-wrap">
                                                <textarea className="field-input" name="message" placeholder=" " value={form.message} onChange={handleChange} />
                                                <span className="field-icon field-icon-textarea">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                                    </svg>
                                                </span>
                                                <label className="field-label">Your Message</label>
                                            </div>

                                            {/* Submit */}
                                            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                                                {loading ? (
                                                    <>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "rotateSlow 0.8s linear infinite" }}>
                                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                                        </svg>
                                                        SENDING...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="SendNow" style={{}}>SEND NOW</span>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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