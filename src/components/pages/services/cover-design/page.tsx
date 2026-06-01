import React, { useEffect, useRef, useState } from "react";
import SplitText from "@/components/SplitText";
import {
    Pen, Layers, Monitor, Printer, RefreshCw, Eye,
    ChevronDown, Phone, Mail, Send, User,
    MessageCircle, Zap, Award, ShieldCheck
} from "lucide-react";

// ── STYLES ────────────────────────────────────────────────────────────────────
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  @keyframes cd-fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cd-fadeLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes cd-fadeRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes cd-rotate   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cd-pulse    { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.75;transform:scale(1.08)} }
  @keyframes cd-pulseDot { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.4);opacity:1} }
  @keyframes cd-marqueeLeft  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes cd-marqueeRight { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
  @keyframes cd-float0 { 0%{transform:rotate(-10deg) translateY(0)} 100%{transform:rotate(-8deg) translateY(-18px)} }
  @keyframes cd-float1 { 0%{transform:rotate(5deg) translateY(0)} 100%{transform:rotate(7deg) translateY(-14px)} }
  @keyframes cd-float2 { 0%{transform:rotate(9deg) translateY(0)} 100%{transform:rotate(11deg) translateY(-20px)} }
  @keyframes cd-float3 { 0%{transform:rotate(-6deg) translateY(0)} 100%{transform:rotate(-4deg) translateY(-16px)} }
  @keyframes cd-shimmerBorder { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes cd-floatMockup   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes cd-orbPulse      { 0%,100%{opacity:.45;transform:scale(1)} 50%{opacity:.75;transform:scale(1.1)} }
  @keyframes cd-rotateSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cd-successPop    { 0%{opacity:0;transform:scale(.7)} 70%{transform:scale(1.08)} 100%{opacity:1;transform:scale(1)} }
  @keyframes cd-checkDraw     { from{stroke-dashoffset:40} to{stroke-dashoffset:0} }
  @keyframes cd-marqueeWords  { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes cd-slideIn       { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .cd-ap-marquee-left  { display:flex; width:max-content; animation:cd-marqueeLeft  50s linear infinite; }
  .cd-ap-marquee-right { display:flex; width:max-content; animation:cd-marqueeRight 55s linear infinite; }
  .cd-words-marquee    { display:flex; width:max-content; animation:cd-marqueeWords 38s linear infinite; }

  .cd-btn-primary { transition:transform .22s ease, box-shadow .22s ease; }
  .cd-btn-primary:hover { transform:translateY(-3px); box-shadow:0 10px 32px rgba(255,69,69,.45); }
  .cd-btn-outline { transition:transform .22s ease, background .22s ease, color .22s ease; }
  .cd-btn-outline:hover { background:#FF4545 !important; color:#fff !important; transform:translateY(-3px); }

  .cd-service-card { transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
  .cd-service-card:hover { transform:translateY(-7px); border-color:rgba(255,69,69,.45) !important; box-shadow:0 24px 60px rgba(255,69,69,.1) !important; }
  .cd-service-card:hover .cd-service-icon { animation:cd-float1 2s ease-in-out infinite; }

  .cd-portfolio-card {
    flex-shrink:0; position:relative; overflow:hidden; border-radius:14px;
    cursor:grab; transition:transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease;
    user-select:none; -webkit-user-select:none;
  }
  .cd-portfolio-card:hover { transform:scale(1.04) translateY(-6px); box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 30px rgba(255,69,69,.2); z-index:10; }
  .cd-portfolio-card img { display:block; transition:transform .5s cubic-bezier(.22,1,.36,1), filter .4s ease; filter:brightness(.82) saturate(.9); pointer-events:none; }
  .cd-portfolio-card:hover img { transform:scale(1.08); filter:brightness(1) saturate(1.1); }
  .cd-portfolio-card .cd-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(4,5,23,.85) 0%,transparent 55%); opacity:0; transition:opacity .35s ease; display:flex; align-items:flex-end; padding:16px; }
  .cd-portfolio-card:hover .cd-overlay { opacity:1; }

  .cd-edge-left  { position:absolute; left:0; top:0; bottom:0; width:120px; background:linear-gradient(to right,#040517,transparent); z-index:10; pointer-events:none; }
  .cd-edge-right { position:absolute; right:0; top:0; bottom:0; width:120px; background:linear-gradient(to left,#040517,transparent); z-index:10; pointer-events:none; }

  .cd-cover-card {
    transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease, filter .3s ease;
    cursor: pointer;
  }
  .cd-cover-card:hover {
    transform: translateY(-12px) scale(1.04) rotate(0deg) !important;
    box-shadow: 0 32px 70px rgba(0,0,0,.35), 0 0 40px rgba(255,69,69,.2) !important;
    filter: brightness(1) saturate(1.1) !important;
    z-index: 10;
  }

  .cd-step-card { transition:transform .3s ease, border-color .3s ease; }
  .cd-step-card:hover { transform:translateY(-5px); border-color:rgba(255,69,69,.4) !important; }

  .cd-field-wrap { position:relative; }
  .cd-field-input { width:100%; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); border-radius:14px; padding:18px 20px 18px 56px; color:white; font-family:'DM Sans',sans-serif; font-size:.95rem; font-weight:300; outline:none; transition:border-color .3s ease,background .3s ease,box-shadow .3s ease; box-sizing:border-box; caret-color:#FF4545; }
  .cd-field-input::placeholder { color:rgba(255,255,255,.25); }
  .cd-field-input:focus { border-color:rgba(255,69,69,.6); background:rgba(255,69,69,.04); box-shadow:0 0 0 3px rgba(255,69,69,.1),0 8px 32px rgba(0,0,0,.3); }
  .cd-field-input:focus + .cd-field-icon { color:#FF4545 !important; }
  .cd-field-icon { position:absolute; left:18px; top:50%; transform:translateY(-50%); color:rgba(255,255,255,.25); transition:color .3s ease; pointer-events:none; display:flex; align-items:center; }
  .cd-field-icon-ta { top:20px; transform:none; }
  .cd-field-label { position:absolute; left:56px; top:18px; font-family:'DM Sans',sans-serif; font-size:.92rem; color:rgba(255,255,255,.25); pointer-events:none; transition:all .25s cubic-bezier(.22,1,.36,1); transform-origin:left; }
  .cd-field-input:focus ~ .cd-field-label,
  .cd-field-input:not(:placeholder-shown) ~ .cd-field-label { top:-10px; left:14px; font-size:.72rem; color:#FF4545; background:#0a0e2a; padding:0 6px; border-radius:4px; letter-spacing:.06em; }
  textarea.cd-field-input { resize:none; padding-top:18px; line-height:1.65; min-height:140px; }
  .cd-submit-btn { width:100%; padding:18px; border-radius:14px; background:linear-gradient(90deg,#FF4545 0%,#fe5858 100%); color:white; font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.15em; border:none; cursor:pointer; position:relative; overflow:hidden; transition:transform .25s ease,box-shadow .25s ease; box-shadow:0 8px 32px rgba(255,69,69,.3); display:flex; align-items:center; justify-content:center; gap:10px; }
  .cd-submit-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.12) 50%,transparent 100%); transform:translateX(-100%); transition:transform .5s ease; }
  .cd-submit-btn:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(255,69,69,.45); }
  .cd-submit-btn:hover::before { transform:translateX(100%); }
  .cd-info-card { transition:transform .3s ease,border-color .3s ease; }
  .cd-info-card:hover { transform:translateX(6px); border-color:rgba(255,69,69,.4) !important; }
`;

const PORTFOLIO_ROW1 = [
    { src: "/images/Portfolio/01.jpg" }, { src: "/images/Portfolio/02.jpg" }, { src: "/images/Portfolio/03.jpg" },
    { src: "/images/Portfolio/04.jpg" }, { src: "/images/Portfolio/05.jpg" }, { src: "/images/Portfolio/06.jpg" },
    { src: "/images/Portfolio/07.jpg" }, { src: "/images/Portfolio/08.jpg" }, { src: "/images/Portfolio/09.jpg" },
    { src: "/images/Portfolio/10.jpg" }, { src: "/images/Portfolio/11.jpg" }, { src: "/images/Portfolio/12.jpg" },
];
const PORTFOLIO_ROW2 = [
    { src: "/images/Portfolio/15.jpg" }, { src: "/images/Portfolio/16.jpg" }, { src: "/images/Portfolio/17.jpg" },
    { src: "/images/Portfolio/18.jpg" }, { src: "/images/Portfolio/19.jpg" }, { src: "/images/Portfolio/20.jpg" },
    { src: "/images/Portfolio/21.jpg" }, { src: "/images/Portfolio/22.jpg" }, { src: "/images/Portfolio/23.jpg" },
    { src: "/images/Portfolio/24.jpg" }, { src: "/images/Portfolio/25.jpg" }, { src: "/images/Portfolio/26.jpg" },
];
const ROW_TOP = [
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
const ROW_BOTTOM = [
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

const SCATTERED_BOOKS = [
    { src: "/images/Portfolio/01.jpg", top: "110px", left: "5%", right: undefined as string | undefined, w: 170, h: 235, rot: -10, delay: .1 },
    { src: "/images/Portfolio/09.jpg", top: "380px", left: "3%", right: undefined as string | undefined, w: 185, h: 250, rot: 5, delay: .25 },
    { src: "/images/Portfolio/05.jpg", top: "130px", left: undefined as string | undefined, right: "5%", w: 170, h: 235, rot: 9, delay: .15 },
    { src: "/images/Portfolio/13.jpg", top: "400px", left: undefined as string | undefined, right: "3%", w: 155, h: 215, rot: -6, delay: .3 },
];

const WORDS = [
    "Genre-Matched Design", "Print & eBook Covers", "Unlimited Revisions",
    "Full Wrap Available", "Spine & Back Cover", "High-Resolution Files",
    "Amazon KDP Ready", "IngramSpark Specs", "Stand Out On Shelves",
];

const SERVICES = [
    {
        icon: <Pen size={26} />,
        title: "Custom Cover Design",
        desc: "Fully bespoke covers designed from scratch around your genre, title, and audience. Every element — typography, imagery, color palette — is crafted specifically for your book.",
        tags: ["From Scratch", "Genre-Matched", "Bespoke"],
    },
    {
        icon: <Layers size={26} />,
        title: "Full Wrap Design",
        desc: "Complete front, spine, and back cover design formatted to your book's exact trim size and page count. Ready to submit to any print-on-demand platform.",
        tags: ["Front", "Spine", "Back Cover"],
    },
    {
        icon: <Monitor size={26} />,
        title: "eBook Cover Design",
        desc: "Digital covers optimized for Amazon Kindle, Apple Books, Kobo, and all major eBook platforms. Designed to look sharp as thumbnails and at full resolution.",
        tags: ["Kindle", "Apple Books", "Kobo"],
    },
    {
        icon: <Printer size={26} />,
        title: "Print-Ready Files",
        desc: "We deliver print-ready PDF files at 300 DPI with proper bleed, margins, and color profiles — meeting exact specifications for Amazon KDP, IngramSpark, and other printers.",
        tags: ["300 DPI", "KDP Ready", "IngramSpark"],
    },
    {
        icon: <RefreshCw size={26} />,
        title: "Cover Redesign",
        desc: "Have an existing cover that isn't working? We redesign it with fresh eyes, keeping what works and elevating the overall impact to boost reader appeal.",
        tags: ["Refresh", "Rebrand", "Elevate"],
    },
    {
        icon: <Eye size={26} />,
        title: "Concept & Mockups",
        desc: "Before final production, we present multiple design concepts and realistic 3D book mockups so you can visualize exactly how your cover will look in the real world.",
        tags: ["Concepts", "3D Mockups", "Preview"],
    },
];

const PROCESS_STEPS = [
    { num: "01", icon: <MessageCircle size={24} />, title: "Creative Brief", desc: "We gather your vision — genre, mood, audience, comparable titles, and any specific ideas you have. The brief guides every creative decision." },
    { num: "02", icon: <Pen size={24} />, title: "Concept Development", desc: "Our designers develop 2–3 distinct cover concepts. Each takes a different creative direction so you can choose or blend your favorite elements." },
    { num: "03", icon: <Eye size={24} />, title: "Review & Feedback", desc: "You review the concepts and provide feedback. We refine the chosen direction based on your input through multiple revision rounds." },
    { num: "04", icon: <RefreshCw size={24} />, title: "Revisions & Polish", desc: "We fine-tune every detail — typography weight, color saturation, image positioning — until the cover feels exactly right." },
    { num: "05", icon: <Award size={24} />, title: "Final Delivery", desc: "You receive high-resolution print-ready files, eBook versions, and 3D mockups in all required formats — ready for publishing." },
];

const COVER_SHOWCASE = [
    { src: "/images/Portfolio/01.jpg", rot: -8, z: 1, x: "-140px", y: "40px" },
    { src: "/images/Portfolio/03.jpg", rot: -3, z: 2, x: "-70px", y: "10px" },
    { src: "/images/Portfolio/07.jpg", rot: 2, z: 3, x: "0px", y: "30px" },
    { src: "/images/Portfolio/04.jpg", rot: 7, z: 2, x: "70px", y: "5px" },
    { src: "/images/Portfolio/22.jpg", rot: 12, z: 1, x: "140px", y: "45px" },
];

const FAQS = [
    { q: "How many revision rounds are included?", a: "Every package includes unlimited revisions until you're fully satisfied. We don't stop until the cover is exactly what you envisioned — no extra charge for additional rounds." },
    { q: "Do you provide both print and eBook versions?", a: "Yes. Every cover design includes both a print-ready PDF (with bleed and crop marks) and an eBook version optimized for digital platforms like Amazon Kindle and Apple Books." },
    { q: "Can you match my genre's visual style?", a: "Absolutely. Our designers have worked across every genre — thriller, romance, fantasy, self-help, children's, and more. We study the visual language of your genre before starting." },
    { q: "What files do I receive at the end?", a: "You receive: high-resolution print PDF (300 DPI with bleed), eBook JPEG/PNG, full-wrap PDF (if applicable), 3D mockup images, and all source files in your agreed format." },
    { q: "Do I own the rights to my cover design?", a: "Yes, completely. Once the final payment is made, you own 100% of the design. We do not reuse, resell, or repurpose your cover for any other client." },
    { q: "How long does a cover design take?", a: "A standard cover design takes 5–10 business days from brief to final delivery. Rush options are available for tight timelines at an additional fee." },
];

const FAQ_BOOKS = [
    { src: "/images/Portfolio/01.jpg", w: 180, h: 260, rot: -6, z: 1, x: "0px", y: "20px" },
    { src: "/images/Portfolio/07.jpg", w: 190, h: 270, rot: 4, z: 2, x: "60px", y: "0px" },
    { src: "/images/Portfolio/22.jpg", w: 185, h: 265, rot: -3, z: 3, x: "120px", y: "30px" },
];

const STATS = [
    { value: 850, suffix: "+", label: "Covers Designed" },
    { value: 100, suffix: "%", label: "Ownership Transfer" },
    { value: 48, suffix: "h", label: "First Concept" },
    { value: 40, suffix: "+", label: "Genres Covered" },
];

interface MarqueeRowProps { children: React.ReactNode; direction: "left" | "right"; speed?: number; }

const MarqueeRow: React.FC<MarqueeRowProps> = ({ children, direction, speed = 1.2 }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const currentTranslate = useRef(0);
    const startTranslate = useRef(0);
    const singleSetWidth = useRef(0);

    useEffect(() => {
        const upd = () => { if (trackRef.current) singleSetWidth.current = trackRef.current.scrollWidth / 2; };
        upd(); const ro = new ResizeObserver(upd); if (trackRef.current) ro.observe(trackRef.current); return () => ro.disconnect();
    }, [children]);

    useEffect(() => {
        let id: number;
        const animate = () => {
            if (!isDragging.current && singleSetWidth.current > 0) {
                if (direction === "left") { currentTranslate.current -= speed; if (currentTranslate.current <= -singleSetWidth.current) currentTranslate.current += singleSetWidth.current; }
                else { currentTranslate.current += speed; if (currentTranslate.current >= 0) currentTranslate.current -= singleSetWidth.current; }
            }
            if (trackRef.current) trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
            id = requestAnimationFrame(animate);
        };
        id = requestAnimationFrame(animate); return () => cancelAnimationFrame(id);
    }, [direction, speed]);

    const onMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); isDragging.current = true; startX.current = e.clientX; startTranslate.current = currentTranslate.current;
        if (trackRef.current) trackRef.current.style.cursor = "grabbing";
        const onMove = (ev: MouseEvent) => { if (!isDragging.current) return; let n = startTranslate.current + (ev.clientX - startX.current); if (singleSetWidth.current > 0) { if (n <= -singleSetWidth.current) { n += singleSetWidth.current; startTranslate.current += singleSetWidth.current; } else if (n >= 0) { n -= singleSetWidth.current; startTranslate.current -= singleSetWidth.current; } } currentTranslate.current = n; };
        const onUp = () => { isDragging.current = false; if (trackRef.current) trackRef.current.style.cursor = "grab"; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
        window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
    };
    const onTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true; startX.current = e.touches[0].clientX; startTranslate.current = currentTranslate.current;
        const onMove = (ev: TouchEvent) => { if (!isDragging.current) return; let n = startTranslate.current + (ev.touches[0].clientX - startX.current); if (singleSetWidth.current > 0) { if (n <= -singleSetWidth.current) { n += singleSetWidth.current; startTranslate.current += singleSetWidth.current; } else if (n >= 0) { n -= singleSetWidth.current; startTranslate.current -= singleSetWidth.current; } } currentTranslate.current = n; };
        const onEnd = () => { isDragging.current = false; window.removeEventListener("touchmove", onMove); window.removeEventListener("touchend", onEnd); };
        window.addEventListener("touchmove", onMove); window.addEventListener("touchend", onEnd);
    };

    return (
        <div style={{ overflow: "hidden" }}>
            <div ref={trackRef} style={{ display: "flex", width: "max-content", cursor: "grab", touchAction: "pan-y" }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
                {children}{children}
            </div>
        </div>
    );
};

function useCdInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

const CdCounter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const { ref, visible } = useCdInView(0.3);
    useEffect(() => {
        if (!visible) return;
        let s = 0; const step = Math.ceil(target / (1800 / 16));
        const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(s); }, 16);
        return () => clearInterval(t);
    }, [visible, target]);
    return <span ref={ref}>{count}{suffix}</span>;
};

const CdHero: React.FC = () => {
    const { ref, visible } = useCdInView(0.05);
    return (
        <section ref={ref} style={{
            background: `radial-gradient(ellipse at 0% 50%,#1B465F 0%,transparent 38%),radial-gradient(ellipse at 80% 0%,#205270 0%,transparent 36%),radial-gradient(ellipse at 100% 65%,#1A4259 0%,transparent 40%),radial-gradient(ellipse at 50% 50%,#102838 0%,transparent 55%),#0A1A24`,
            width: "100%", minHeight: "100vh", paddingTop: "0", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden",
        }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />

            <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", display: "grid", gridTemplateRows: "1fr 1fr 1fr", overflow: "hidden" }}>
                {[{ cls: "cd-ap-marquee-left", rows: PORTFOLIO_ROW1 }, { cls: "cd-ap-marquee-right", rows: PORTFOLIO_ROW2 }, { cls: "cd-ap-marquee-left", rows: [...PORTFOLIO_ROW1].reverse() }].map((row, ri) => (
                    <div key={ri} style={{ overflow: "hidden", display: "flex", alignItems: "center" }}>
                        <div className={row.cls} style={{ opacity: .38 }}>
                            {[...row.rows, ...row.rows].map((b, i) => (
                                <div key={i} style={{ flexShrink: 0, width: "160px", height: "90%", margin: "0 8px", borderRadius: "8px", overflow: "hidden" }}>
                                    <img src={b.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.6) brightness(.55)", pointerEvents: "none" }}
                                        onError={e => { e.currentTarget.style.display = "none"; (e.currentTarget.parentElement as HTMLElement).style.background = `hsl(${i * 25},18%,14%)`; }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: `linear-gradient(to bottom,rgba(10,26,36,.70) 0%,rgba(10,26,36,.45) 30%,rgba(10,26,36,.45) 70%,rgba(10,26,36,.80) 100%)` }} />

            {SCATTERED_BOOKS.map((b, i) => {
                const isLeft = b.left !== undefined;
                return (
                    <div key={i} style={{ position: "absolute", zIndex: 3, pointerEvents: "none", top: b.top, ...(b.left !== undefined ? { left: b.left } : {}), ...(b.right !== undefined ? { right: b.right } : {}), width: `${b.w}px`, opacity: visible ? 1 : 0, transition: `opacity 1s ease ${b.delay}s`, filter: `drop-shadow(0 0 12px rgba(255,69,69,0.65)) drop-shadow(0 0 30px rgba(255,45,80,0.40)) drop-shadow(0 0 6px rgba(255,150,150,0.80))` }}>
                        <div style={{ transform: visible ? `rotate(${b.rot}deg) translateY(0)` : `rotate(${b.rot + (isLeft ? -25 : 25)}deg) translateY(40px) translateX(${isLeft ? -80 : 80}px)`, transition: `transform 1s cubic-bezier(.22,1,.36,1) ${b.delay}s`, animation: visible ? `cd-float${i} 4s ease-in-out ${1 + b.delay}s infinite alternate` : "none" }}>
                            <img src={b.src} alt="" style={{ width: "100%", height: `${b.h}px`, objectFit: "cover", display: "block", borderRadius: "10px", filter: "brightness(.85) saturate(1.1) contrast(1.05)", boxShadow: "0 24px 60px rgba(0,0,0,.7),inset 0 0 30px rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}
                                onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; const abs = p.parentElement as HTMLElement; abs.style.height = `${b.h}px`; abs.style.borderRadius = "10px"; abs.style.background = `linear-gradient(135deg,hsl(${i * 40 + 200},30%,15%),hsl(${i * 40 + 210},40%,22%))`; abs.style.border = "1px solid rgba(255,255,255,.1)"; }} />
                        </div>
                    </div>
                );
            })}

            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2, pointerEvents: "none", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(80,130,255,.06) 0%,transparent 65%)" }} />

            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 4, padding: "120px 360px 100px", paddingTop: "140px", textAlign: "center" }}>
                <div style={{ maxWidth: "820px", width: "100%" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .5s ease .1s forwards" : "none" }}>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".75rem", letterSpacing: ".3em", color: "#FF4545", fontWeight: 600 }}>BOOK COVER DESIGN</span>
                        <div style={{ width: visible ? "32px" : "0", height: "2px", background: "#FF4545", transition: "width .8s ease .3s" }} />
                    </div>
                    <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.8vw,3.4rem)", letterSpacing: "-.025em", lineHeight: 1.1, color: "white", margin: "0 0 28px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .2s forwards" : "none" }}>
                        Covers That Make<br />Readers Stop,{" "}<span style={{ color: "#FF4545" }}>Look,</span><br />and Buy.
                    </h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,.52)", fontWeight: 300, margin: "0 auto 38px", maxWidth: "560px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .38s forwards" : "none" }}>
                        Your cover is the first thing readers see — and the first reason they decide to keep scrolling or stop. Our designers create genre-matching, professionally crafted covers that capture your story and command attention in any marketplace.
                    </p>
                    <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .5s forwards" : "none" }}>
                        <button className="cd-btn-primary" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".92rem", letterSpacing: ".08em", padding: "14px 42px", borderRadius: "999px", background: "linear-gradient(90deg,#fe5858 0%,#FF4545 100%)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(255,69,69,.4)" }}>Design My Cover</button>
                        <button className="cd-btn-outline" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".92rem", letterSpacing: ".06em", padding: "13px 42px", borderRadius: "999px", background: "transparent", color: "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.22)", cursor: "pointer" }}>See Portfolio</button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "28px", marginTop: "36px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .65s forwards" : "none" }}>
                        {[{ icon: <RefreshCw size={15} />, label: "Unlimited Revisions" }, { icon: <ShieldCheck size={15} />, label: "100% Your Rights" }, { icon: <Zap size={15} />, label: "48h First Concept" }].map((b, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", color: "rgba(255,255,255,.4)" }}>
                                <span style={{ color: "#FF4545" }}>{b.icon}</span>
                                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", fontWeight: 400 }}>{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CdStrip: React.FC = () => (
    <div style={{ background: "#FF4545", padding: "14px 0", overflow: "hidden", width: "100%" }}>
        <div className="cd-words-marquee">
            {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
                <span key={i} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: ".15em", color: "white", whiteSpace: "nowrap", padding: "0 32px", display: "flex", alignItems: "center", gap: "32px" }}>
                    {w}<span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,.5)", display: "inline-block", flexShrink: 0 }} />
                </span>
            ))}
        </div>
    </div>
);

const CdServices: React.FC = () => {
    const { ref, visible } = useCdInView(0.08);
    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", top: "8%", left: "-6%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "6%", right: "3%", width: "180px", height: "180px", border: "1px dashed rgba(255,69,69,.14)", borderRadius: "50%", animation: "cd-rotate 22s linear infinite", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "5%", right: "-4%", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.07) 0%,transparent 70%)", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ marginBottom: "64px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .6s ease forwards" : "none" }}>
                        <div style={{ height: "2px", background: "#FF4545", width: visible ? "36px" : "0", transition: "width .8s ease .2s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".78rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>WHAT WE DESIGN</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", alignItems: "flex-end" }}>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.4rem)", letterSpacing: "-.025em", lineHeight: 1.05, color: "#0A0A0A", margin: 0 }}>
                            {visible && (<><SplitText text="Cover Design" className="text-[#0A0A0A]" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /><br /><SplitText text="Services" className="text-[#FF4545]" delay={36} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /></>)}
                        </h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#555", maxWidth: "360px", margin: 0, fontWeight: 300, opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .3s forwards" : "none" }}>
                            From concept to print-ready files — every cover service you need to compete in today's market.
                        </p>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
                    {SERVICES.map((s, i) => (
                        <div key={i} className="cd-service-card" style={{ borderRadius: "20px", padding: "32px 28px", background: "#fff", border: "1px solid rgba(255,69,69,.1)", boxShadow: "0 4px 24px rgba(255,177,177,.12)", opacity: visible ? 1 : 0, animation: visible ? `cd-fadeUp .65s ease ${.1 + i * .08}s forwards` : "none" }}>
                            <div className="cd-service-icon" style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(255,69,69,.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545", marginBottom: "20px", boxShadow: "0 4px 16px rgba(255,69,69,.12)" }}>
                                {s.icon}
                            </div>
                            <div style={{ height: "1px", width: "32px", background: "linear-gradient(90deg,#FF4545,transparent)", marginBottom: "16px", borderRadius: "999px" }} />
                            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#0A0A0A", margin: "0 0 10px", letterSpacing: "-.01em" }}>{s.title}</h3>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", lineHeight: 1.75, color: "#555", margin: "0 0 18px", fontWeight: 300 }}>{s.desc}</p>
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                {s.tags.map((tag, ti) => (
                                    <span key={ti} style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".68rem", letterSpacing: ".06em", padding: "4px 10px", borderRadius: "999px", background: "rgba(27,70,95,.08)", border: "1px solid #1B465F", color: "#0A0A0A" }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginTop: "48px" }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{ borderRadius: "16px", padding: "24px 20px", background: "rgba(255,69,69,.04)", border: "1px solid rgba(255,69,69,.12)", textAlign: "center", opacity: visible ? 1 : 0, animation: visible ? `cd-fadeUp .65s ease ${.5 + i * .08}s forwards` : "none" }}>
                            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "2.4rem", color: "#FF4545", margin: "0 0 4px", lineHeight: 1, letterSpacing: "-.02em" }}>
                                <CdCounter target={s.value} suffix={s.suffix} />
                            </p>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "#555", margin: 0, fontWeight: 400 }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CdShowcase: React.FC = () => {
    const { ref, visible } = useCdInView(0.08);
    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#1B465F 0%,#14384C 50%,#0E2432 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "15%", right: "-8%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.06) 0%,transparent 65%)", animation: "cd-pulse 6s ease-in-out infinite", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "cd-fadeLeft .85s ease forwards" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                            <div style={{ height: "2px", background: "#FF4545", width: visible ? "36px" : "0", transition: "width .8s ease .2s" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".78rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>COVER SHOWCASE</span>
                        </div>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,3.5vw,3.2rem)", letterSpacing: "-.025em", lineHeight: 1.05, color: "white", margin: "0 0 20px" }}>
                            {visible && (<><SplitText text="Covers Designed" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /><br /><SplitText text="To Sell" className="text-[#FF4545]" delay={36} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /></>)}
                        </h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", lineHeight: 1.85, color: "rgba(255,255,255,.45)", fontWeight: 300, margin: "0 0 28px" }}>
                            Every cover we design is built around one goal: making readers stop scrolling and pick up your book. Genre-accurate, visually compelling, and professionally executed from concept to print.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                            {[{ icon: <Pen size={18} />, text: "Custom typography matched to your genre" }, { icon: <Eye size={18} />, text: "Imagery that evokes the right emotion" }, { icon: <Layers size={18} />, text: "Full wrap: front, spine, and back cover" }, { icon: <Printer size={18} />, text: "Print-ready at 300 DPI with bleed" }].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", opacity: visible ? 1 : 0, transition: `opacity .4s ease ${.3 + i * .08}s, transform .4s ease ${.3 + i * .08}s`, transform: visible ? "translateX(0)" : "translateX(-20px)" }}>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,69,69,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545", flexShrink: 0 }}>{item.icon}</div>
                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "rgba(255,255,255,.6)", fontWeight: 300 }}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <button className="cd-btn-primary" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".88rem", letterSpacing: ".08em", padding: "13px 32px", borderRadius: "999px", background: "linear-gradient(90deg,#fe5858 0%,#FF4545 100%)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 6px 24px rgba(255,69,69,.35)" }}>
                            Start Your Design
                        </button>
                    </div>

                    <div style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "center", justifyContent: "center", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeRight .9s ease .2s forwards" : "none" }}>
                        <div style={{ position: "absolute", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.12) 0%,transparent 70%)", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", top: "-20px", right: "-10px", display: "grid", gridTemplateColumns: "repeat(7,10px)", gap: "7px", opacity: .35, zIndex: 0 }}>
                            {Array.from({ length: 42 }).map((_, i) => (
                                <div key={i} style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#FF4545" }} />
                            ))}
                        </div>
                        {COVER_SHOWCASE.map((b, i) => (
                            <div key={i} className="cd-cover-card" style={{
                                position: "absolute",
                                left: `calc(50% - 95px + ${parseInt(b.x)}px)`,
                                top: `calc(50% - 160px + ${parseInt(b.y)}px)`,
                                zIndex: b.z,
                                transform: `rotate(${b.rot}deg)`,
                                filter: "brightness(.88) saturate(.95)",
                                opacity: visible ? 1 : 0,
                                transition: `opacity .6s ease ${.1 + i * .1}s, transform .6s ease ${.1 + i * .1}s`,
                            }}>
                                <img src={b.src} alt="" style={{ width: "190px", height: "260px", objectFit: "cover", borderRadius: "8px", display: "block", boxShadow: "0 20px 50px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.08)" }}
                                    onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; p.style.width = "190px"; p.style.height = "260px"; p.style.borderRadius = "8px"; p.style.background = `linear-gradient(135deg,hsl(${i * 55 + 200},30%,18%),hsl(${i * 55 + 210},40%,25%))`; }} />
                            </div>
                        ))}
                        <div style={{ position: "absolute", bottom: "-10px", left: "-10px", display: "grid", gridTemplateColumns: "repeat(5,10px)", gap: "7px", opacity: .25, zIndex: 0 }}>
                            {Array.from({ length: 25 }).map((_, i) => (
                                <div key={i} style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#FF4545" }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CdProcess: React.FC = () => {
    const { ref, visible } = useCdInView(0.08);
    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", top: "8%", left: "-6%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "5%", right: "-4%", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "6%", right: "3%", width: "180px", height: "180px", border: "1px dashed rgba(255,69,69,.14)", borderRadius: "50%", animation: "cd-rotate 22s linear infinite", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ marginBottom: "64px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .6s ease forwards" : "none" }}>
                        <div style={{ height: "2px", background: "#FF4545", width: visible ? "36px" : "0", transition: "width .8s ease .2s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".78rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>HOW IT WORKS</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", alignItems: "flex-end" }}>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.4rem)", letterSpacing: "-.025em", lineHeight: 1.05, color: "#0A0A0A", margin: 0 }}>
                            {visible && (<><SplitText text="From Brief" className="text-[#0A0A0A]" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /><br /><SplitText text="To Final Cover" className="text-[#FF4545]" delay={36} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-40px" textAlign="left" /></>)}
                        </h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#555", maxWidth: "340px", margin: 0, fontWeight: 300, opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .3s forwards" : "none" }}>
                            A collaborative design process that keeps you involved at every stage — from first concept to final files.
                        </p>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }}>
                    {PROCESS_STEPS.map((step, i) => (
                        <div key={i} className="cd-step-card" style={{ borderRadius: "18px", padding: "28px 22px", background: "#fff", border: "1px solid rgba(255,69,69,.1)", position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(255,177,177,.1)", opacity: visible ? 1 : 0, animation: visible ? `cd-fadeUp .65s ease ${.1 + i * .09}s forwards` : "none" }}>
                            {i < PROCESS_STEPS.length - 1 && <div style={{ position: "absolute", right: "-8px", top: "50%", width: "16px", height: "1px", background: "rgba(255,69,69,.2)", zIndex: 10 }} />}
                            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", lineHeight: 1, color: "rgba(255,69,69,.1)", letterSpacing: "-.02em", display: "block", marginBottom: "16px" }}>{step.num}</span>
                            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,69,69,.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545", marginBottom: "16px", boxShadow: "0 4px 16px rgba(255,69,69,.1)" }}>{step.icon}</div>
                            <div style={{ height: "1px", width: "28px", background: "linear-gradient(90deg,#FF4545,transparent)", marginBottom: "14px", borderRadius: "999px" }} />
                            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: ".95rem", color: "#0A0A0A", margin: "0 0 10px", letterSpacing: "-.01em", lineHeight: 1.2 }}>{step.title}</h3>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", lineHeight: 1.7, color: "#555", margin: 0, fontWeight: 300 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CdPortfolio: React.FC = () => {
    const { ref, visible } = useCdInView(0.05);
    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", bottom: "5%", right: "-4%", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "6%", left: "3%", width: "180px", height: "180px", border: "1px dashed rgba(255,69,69,.12)", borderRadius: "50%", animation: "cd-rotate 20s linear infinite reverse", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1200px", margin: "0 auto 60px", padding: "0 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .6s ease forwards" : "none" }}>
                    <div style={{ height: "2px", background: "#FF4545", width: visible ? "48px" : "0", transition: "width .8s ease .2s" }} />
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: ".85rem", letterSpacing: ".25em", color: "#FF4545" }}>COVER PORTFOLIO</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                    <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem,4.5vw,4.5rem)", letterSpacing: "-.02em", lineHeight: .9, color: "white", margin: 0 }}>
                        {visible && (<><SplitText text="Covers We" className="text-[#0A0A0A]" delay={35} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" />{" "}<SplitText text="Designed" className="text-[#FF4545]" delay={42} duration={1.2} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" /></>)}
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.1rem", lineHeight: 1.75, color: "#0A0A0A", maxWidth: "340px", margin: 0, fontWeight: 300, opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .3s forwards" : "none" }}>
                        Every cover in our portfolio was designed to match its genre, connect with its audience, and stand out in the marketplace.
                    </p>
                </div>
            </div>

            <div style={{ position: "relative", marginBottom: "16px" }}>
                <div className="cd-edge-left" /><div className="cd-edge-right" />
                <MarqueeRow direction="left" speed={1.2}>
                    {ROW_TOP.map((item, i) => (
                        <div key={i} className="cd-portfolio-card" style={{ width: "250px", height: "400px", margin: "0 10px" }}>
                            <img src={item.src} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={e => { const t = e.currentTarget; t.style.display = "none"; const p = t.parentElement!; p.style.background = `hsl(${Math.random() * 360},25%,18%)`; }} />
                            <div className="cd-overlay"><div><p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: ".95rem", letterSpacing: ".08em", color: "white", lineHeight: 1.1, margin: 0 }}>{item.title}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", color: "#FF4545", marginTop: "2px", marginBottom: 0 }}>{item.genre}</p></div></div>
                            <div style={{ position: "absolute", top: 0, right: 0, width: "3px", height: "40px", background: "linear-gradient(to bottom,#FF4545,transparent)", borderRadius: "0 14px 0 0" }} />
                        </div>
                    ))}
                </MarqueeRow>
            </div>
            <div style={{ position: "relative" }}>
                <div className="cd-edge-left" /><div className="cd-edge-right" />
                <MarqueeRow direction="right" speed={1.2}>
                    {ROW_BOTTOM.map((item, i) => (
                        <div key={i} className="cd-portfolio-card" style={{ width: "250px", height: "400px", margin: "0 10px" }}>
                            <img src={item.src} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={e => { const t = e.currentTarget; t.style.display = "none"; const p = t.parentElement!; p.style.background = `hsl(${Math.random() * 360},25%,18%)`; }} />
                            <div className="cd-overlay"><div><p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: ".95rem", letterSpacing: ".08em", color: "white", lineHeight: 1.1, margin: 0 }}>{item.title}</p><p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", color: "#FF4545", marginTop: "2px", marginBottom: 0 }}>{item.genre}</p></div></div>
                            <div style={{ position: "absolute", top: 0, right: 0, width: "3px", height: "40px", background: "linear-gradient(to bottom,#FF4545,transparent)", borderRadius: "0 14px 0 0" }} />
                        </div>
                    ))}
                </MarqueeRow>
            </div>
        </section>
    );
};

const CdCTABanner: React.FC = () => {
    const { ref, visible } = useCdInView(0.1);
    return (
        <section style={{ background: "linear-gradient(180deg,#1B465F 0%,#14384C 100%)", width: "100%", padding: "80px 40px 90px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,69,69,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto", borderRadius: "28px", position: "relative", overflow: "hidden", padding: "2px", background: "linear-gradient(135deg,rgba(255,69,69,.5),rgba(26,36,95,.8),rgba(255,69,69,.3))", backgroundSize: "300% 300%", animation: "cd-shimmerBorder 5s ease infinite" }}>
                <div style={{ borderRadius: "26px", background: "linear-gradient(125deg,#1B465F 0%,#16394D 40%,#102A3A 100%)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 60px 52px 64px", overflow: "hidden", position: "relative", minHeight: "260px" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`, backgroundSize: "50px 50px", pointerEvents: "none" }} />
                    <div style={{ position: "relative", zIndex: 5, maxWidth: "540px", flex: 1 }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "22px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .5s ease forwards" : "none" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#FF4545", display: "inline-block", animation: "cd-pulseDot 2s ease-in-out infinite" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".78rem", letterSpacing: ".2em", color: "rgba(255,255,255,.5)" }}>NOW ACCEPTING DESIGN PROJECTS</span>
                        </div>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,3rem)", letterSpacing: "-.01em", lineHeight: 1.03, color: "white", margin: "0 0 18px" }}>
                            {visible && (<><SplitText text="Your Book Deserves" delay={30} duration={1.0} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 35 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-30px" textAlign="left" /><br /><SplitText text="A Cover That" delay={35} duration={1.05} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 35 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-30px" textAlign="left" /><br /><SplitText text="Sells It" className="text-[#FF4545]" delay={40} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 35 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-30px" textAlign="left" /></>)}
                        </h2>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.1rem", lineHeight: 1.75, color: "rgba(255,255,255,.5)", margin: "0 0 34px", fontWeight: 300, maxWidth: "420px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .35s forwards" : "none" }}>
                            Let our designers create a cover that captures your story and commands attention on every shelf and screen. First concept delivered in 48 hours.
                        </p>
                        <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .7s ease .45s forwards" : "none" }}>
                            <button className="cd-btn-primary" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: ".25em", padding: "14px 38px", borderRadius: "999px", background: "linear-gradient(90deg,#fe5858e8 0%,#FF4545 100%)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(255,69,69,.35)" }}>Get Started</button>
                            <button style={{ fontFamily: "'Montserrat',sans-serif", letterSpacing: ".08em", fontSize: "1rem", padding: "12px 38px", borderRadius: "999px", background: "transparent", color: "rgba(255,255,255,.75)", border: "1px solid rgba(255,255,255,.25)", cursor: "pointer" }}>VIEW PORTFOLIO</button>
                        </div>
                    </div>
                    <div style={{ position: "absolute", right: "40px", bottom: "20px", height: "400px", zIndex: 4, animation: "cd-floatMockup 5s ease-in-out infinite", filter: `drop-shadow(-20px 10px 50px rgba(0,0,0,.7)) drop-shadow(0 0 30px rgba(255,69,69,.12))`, pointerEvents: "none" }}>
                        <img src="/images/Portfolio/MOCKUP.png" alt="Book Cover Mockup" style={{ height: "400px", width: "auto", objectFit: "contain", objectPosition: "top right" }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const CdFaq: React.FC = () => {
    const { ref, visible } = useCdInView(0.08);
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#FFF9F9 30%,#FFE8E8 60%,#FFD6D6 85%,#FFFFFF 100%)", width: "100%", overflow: "hidden", padding: "110px 0 100px", position: "relative" }}>
            <div style={{ position: "absolute", bottom: "5%", right: "-4%", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.07) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "6%", left: "3%", width: "180px", height: "180px", border: "1px dashed rgba(255,69,69,.12)", borderRadius: "50%", animation: "cd-rotate 20s linear infinite reverse", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "80px", alignItems: "center" }}>
                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "cd-fadeLeft .85s ease .2s forwards" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
                            <div style={{ height: "2px", background: "#FF4545", width: visible ? "36px" : "0", transition: "width .8s ease .2s" }} />
                            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".8rem", letterSpacing: ".28em", color: "#FF4545", fontWeight: 600 }}>DESIGN FAQS</span>
                        </div>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-.025em", lineHeight: 1.1, color: "#0A0A0A", marginBottom: "42px" }}>
                            Cover Design <span style={{ color: "#FF4545" }}>FAQs</span>
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {FAQS.map((faq, i) => {
                                const isOpen = open === i;
                                return (
                                    <div key={i} onClick={() => setOpen(isOpen ? null : i)} style={{ background: isOpen ? "rgba(255,255,255,.8)" : "rgba(255,255,255,.5)", border: `1px solid ${isOpen ? "rgba(255,69,69,.3)" : "rgba(0,0,0,.08)"}`, borderRadius: "14px", padding: "22px 24px", cursor: "pointer", transition: "background .3s ease,border-color .3s ease,box-shadow .3s ease", boxShadow: isOpen ? "0 8px 30px rgba(255,69,69,.08)" : "0 4px 15px rgba(0,0,0,.03)", backdropFilter: "blur(8px)" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
                                            <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: "1.05rem", color: isOpen ? "#0A0A0A" : "#333", margin: 0, lineHeight: 1.4, transition: "color .3s ease" }}>{faq.q}</h3>
                                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0, background: isOpen ? "rgba(255,69,69,.1)" : "rgba(0,0,0,.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s ease,transform .4s cubic-bezier(.22,1,.36,1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                                                <ChevronDown size={16} color={isOpen ? "#FF4545" : "rgba(0,0,0,.3)"} />
                                            </div>
                                        </div>
                                        <div style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.22,1,.36,1),opacity .35s ease,margin .35s ease", marginTop: isOpen ? "16px" : "0px" }}>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", lineHeight: 1.75, color: "#555", margin: 0, fontWeight: 300, paddingLeft: "2px" }}>{faq.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ position: "relative", minHeight: "480px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeRight .9s ease .35s forwards" : "none" }}>
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.08) 0%,transparent 70%)", pointerEvents: "none" }} />
                        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {FAQ_BOOKS.map((b, i) => (
                                <div key={i} style={{ position: "absolute", left: `calc(50% - 140px + ${parseInt(b.x)}px)`, top: b.y, zIndex: b.z, transform: `rotate(${b.rot}deg)`, transition: "transform .45s cubic-bezier(.22,1,.36,1),filter .3s ease", cursor: "pointer" }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = `rotate(0deg) translateY(-15px) scale(1.06)`; e.currentTarget.style.filter = `drop-shadow(0 0 18px rgba(255,69,69,.3))`; e.currentTarget.style.zIndex = "10"; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${b.rot}deg) translateY(0) scale(1)`; e.currentTarget.style.filter = `drop-shadow(0 0 0 rgba(0,0,0,0))`; e.currentTarget.style.zIndex = b.z.toString(); }}>
                                    <img src={b.src} alt="" style={{ width: `${b.w}px`, height: `${b.h}px`, objectFit: "cover", borderRadius: "8px", display: "block", filter: "brightness(.95) saturate(1.05)", boxShadow: "12px 18px 45px rgba(0,0,0,.15),inset 0 0 0 1px rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.4)" }}
                                        onError={e => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement as HTMLElement; p.style.width = `${b.w}px`; p.style.height = `${b.h}px`; p.style.borderRadius = "8px"; p.style.background = `linear-gradient(135deg,hsl(${i * 45 + 340},20%,85%),hsl(${i * 45 + 350},25%,75%))`; }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CdContact: React.FC = () => {
    const { ref, visible } = useCdInView(0.08);
    const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleSubmit = (e: React.MouseEvent) => { e.preventDefault(); if (!form.name || !form.email || !form.message) return; setLoading(true); setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600); };

    return (
        <section ref={ref} style={{ background: "linear-gradient(180deg,#1B465F 0%,#14384C 50%,#0E2432 100%)", width: "100%", overflow: "hidden", padding: "100px 0 110px", position: "relative" }}>
            <div style={{ position: "absolute", top: "15%", right: "-6%", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,69,69,.07) 0%,transparent 65%)", animation: "cd-orbPulse 6s ease-in-out infinite", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(27,70,95,.55) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "8%", left: "4%", width: "160px", height: "160px", border: "1px dashed rgba(255,69,69,.1)", borderRadius: "50%", animation: "cd-rotateSlow 22s linear infinite", pointerEvents: "none" }} />

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
                <div style={{ marginBottom: "64px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", opacity: visible ? 1 : 0, animation: visible ? "cd-fadeUp .6s ease forwards" : "none" }}>
                        <div style={{ height: "2px", background: "#FF4545", width: visible ? "48px" : "0", transition: "width .8s ease .2s" }} />
                        <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".85rem", letterSpacing: ".25em", color: "#FF4545" }}>START YOUR COVER DESIGN</span>
                    </div>
                    <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem,4.5vw,4.5rem)", letterSpacing: "-.02em", lineHeight: .9, color: "white", margin: 0 }}>
                        {visible && (<><SplitText text="Get In" delay={35} duration={1.1} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" />{" "}<SplitText text="Touch" className="text-[#FF4545]" delay={42} duration={1.2} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" /><br /><SplitText text="And Design Your Cover" delay={42} duration={1.2} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 45 }} to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-50px" textAlign="left" /></>)}
                    </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: "56px", alignItems: "start" }}>
                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "cd-fadeLeft .9s ease .3s forwards" : "none" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "48px" }}>
                            {[{ icon: <Phone size={20} />, label: "Phone", value: "+99 123 456 789" }, { icon: <Mail size={20} />, label: "Email", value: "info@bristolpublishers.com" }].map((item, i) => (
                                <div key={i} className="cd-info-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px", borderRadius: "14px", background: "rgba(255,255,255,.028)", border: "1px solid rgba(255,255,255,.07)", backdropFilter: "blur(6px)" }}>
                                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0, background: "rgba(255,69,69,.1)", border: "1px solid rgba(255,69,69,.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4545" }}>{item.icon}</div>
                                    <div>
                                        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: ".75rem", letterSpacing: ".15em", color: "rgba(255,255,255,.35)", margin: "0 0 2px" }}>{item.label}</p>
                                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".92rem", color: "rgba(255,255,255,.75)", margin: 0, fontWeight: 400 }}>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ opacity: visible ? 1 : 0, animation: visible ? "cd-fadeRight .9s ease .4s forwards" : "none" }}>
                        <div style={{ borderRadius: "24px", padding: "2px", background: "linear-gradient(135deg,rgba(255,69,69,.35),rgba(26,36,95,.6),rgba(255,69,69,.2))" }}>
                            <div style={{ borderRadius: "22px", background: "linear-gradient(180deg,#1B465F 0%,#14384C 50%,#0E2432 100%)", padding: "44px 40px", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
                                {submitted ? (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "360px", gap: "20px", animation: "cd-successPop .5s cubic-bezier(.22,1,.36,1) forwards" }}>
                                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,69,69,.12)", border: "2px solid rgba(255,69,69,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF4545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: "cd-checkDraw .5s ease .3s both" }} /></svg>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "white", margin: "0 0 8px", letterSpacing: ".03em" }}>Message Sent!</p>
                                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", color: "#ffffff", margin: 0, fontWeight: 300 }}>We'll get back to you within 24 hours.</p>
                                        </div>
                                        <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }} style={{ fontFamily: "'Montserrat',sans-serif", letterSpacing: ".1em", fontSize: ".9rem", padding: "10px 28px", borderRadius: "999px", background: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", marginTop: "8px" }}>SEND ANOTHER</button>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 2 }}>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                            <div className="cd-field-wrap"><input className="cd-field-input" type="text" name="name" placeholder=" " value={form.name} onChange={handleChange} autoComplete="off" /><span className="cd-field-icon"><User size={18} /></span><label className="cd-field-label">Full Name</label></div>
                                            <div className="cd-field-wrap"><input className="cd-field-input" type="tel" name="phone" placeholder=" " value={form.phone} onChange={handleChange} autoComplete="off" /><span className="cd-field-icon"><Phone size={18} /></span><label className="cd-field-label">Phone Number</label></div>
                                        </div>
                                        <div className="cd-field-wrap"><input className="cd-field-input" type="email" name="email" placeholder=" " value={form.email} onChange={handleChange} autoComplete="off" /><span className="cd-field-icon"><Mail size={18} /></span><label className="cd-field-label">Email Address</label></div>
                                        <div className="cd-field-wrap"><textarea className="cd-field-input" name="message" placeholder=" " value={form.message} onChange={handleChange} /><span className="cd-field-icon cd-field-icon-ta"><MessageCircle size={18} /></span><label className="cd-field-label">Tell Us About Your Book</label></div>
                                        <button className="cd-submit-btn" onClick={handleSubmit} disabled={loading}>
                                            {loading ? (<><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "cd-rotateSlow .8s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>SENDING...</>) : (<><span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: ".8rem" }}>Send Now</span><Send size={18} /></>)}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const CoverDesignPage: React.FC = () => (
    <>
        <style>{pageStyles}</style>
        <CdHero />
        <CdStrip />
        <CdServices />
        <CdShowcase />
        <CdProcess />
        <CdPortfolio />
        <CdCTABanner />
        <CdFaq />
        <CdContact />
    </>
);

export default CoverDesignPage;