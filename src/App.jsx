import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, ArrowRight, Mail, Sparkles, Zap, Palette, Code2 } from "lucide-react";

// --- Cursor ---
function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const y = useSpring(mouseY, { damping: 20, stiffness: 300 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    const onOver = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) { setHover(true); setLabel(el.getAttribute("data-cursor") || "VIEW"); }
      else { setHover(false); setLabel(""); }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); };
  }, []);

  return (
    <>
      <motion.div style={{ x, y }} className="fixed w-2 h-2 bg-white rounded-full z-[99999] pointer-events-none mix-blend-difference hidden lg:block -translate-x-1/2 -translate-y-1/2" />
      <motion.div
        style={{ x, y }}
        animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed z-[99998] pointer-events-none hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-24 h-24 rounded-full bg-white text-black grid place-items-center text-[10px] font-bold tracking-widest">
          {label}
        </div>
      </motion.div>
    </>
  );
}

function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { damping: 12, stiffness: 200 });
  const sy = useSpring(y, { damping: 12, stiffness: 200 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Preloader({ onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.random() * 12;
      if (cur >= 100) { cur = 100; clearInterval(id); setTimeout(onDone, 700); }
      setP(Math.min(100, Math.floor(cur)));
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[10000] bg-[#0a0a0a] text-white flex flex-col justify-between p-6 md:p-10"
    >
      <div className="flex justify-between text-[10px] tracking-[0.3em] uppercase opacity-40">
        <span>Folio ©2026 — Nashik, IN</span>
        <span>Loading...</span>
      </div>
      <div>
        <div className="flex items-baseline gap-4">
          <h1 className="text-[22vw] leading-[0.8] font-black tracking-tighter">{String(p).padStart(2, "0")}</h1>
          <span className="text-[6vw] font-light">%</span>
        </div>
        <div className="mt-6 h-[2px] bg-white/10 overflow-hidden rounded-full">
          <motion.div style={{ width: `${p}%` }} className="h-full bg-white" transition={{ ease: "linear" }} />
        </div>
        <div className="mt-4 flex gap-2 text-[10px] tracking-widest uppercase opacity-50">
          <span>Motion</span><span>•</span><span>Lenis</span><span>•</span><span>Framer</span><span>•</span><span>Tailwind</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 text-sm leading-tight max-w-[600px]">
        <p className="opacity-60">Crafting ultra-premium digital experiences that convert & delight. Awwwards-level motion.</p>
        <p className="opacity-30 text-xs uppercase tracking-widest">Scroll • Explore • Feel</p>
      </div>
    </motion.div>
  );
}

const projects = [
  { id: "01", title: "NEBULA", sub: "Fashion Commerce", cat: "E-commerce / 3D / GSAP", year: "2024", color: "#FF4D00", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200", desc: "High-converting luxury fashion store with 3D try-on." },
  { id: "02", title: "AURA", sub: "SaaS Platform", cat: "Product Design / Motion", year: "2024", color: "#7C5CFC", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200", desc: "B2B SaaS dashboard that feels like Apple." },
  { id: "03", title: "VOID", sub: "Creative Agency", cat: "Awwwards / WebGL / Lenis", year: "2023", color: "#00FF94", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", desc: "Agency site that won SOTD with physics interactions." },
  { id: "04", title: "MONARCH", sub: "Luxury Watch", cat: "Branding / 3D Commerce", year: "2023", color: "#FFD60A", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200", desc: "Luxury watch configurator — 60fps WebGL." },
];

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: ((e.clientX - r.left) / r.width - 0.5) * 20, y: ((e.clientY - r.top) / r.height - 0.5) * -20 });
  };

  return (
    <motion.div ref={ref} style={{ scale }} className="group relative mb-16 md:mb-28">
      <div className="flex justify-between items-center mb-4 text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/40">
        <span className="flex items-center gap-3"><span className="w-5 h-[1px] bg-white/20" /> ({p.id}) {p.cat}</span>
        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color }} /> {p.year}</span>
      </div>

      <div onMouseMove={onMove} onMouseLeave={() => setMouse({ x: 0, y: 0 })} className="relative overflow-hidden rounded-[20px] md:rounded-[32px] aspect-[16/10] bg-[#111] isolate" data-cursor="VIEW CASE">
        <motion.div style={{ y, x: mouse.x, rotateX: mouse.y, rotateY: mouse.x }} className="absolute inset-0 -top-16 -bottom-16 will-change-transform">
          <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover scale-[1.15] group-hover:scale-[1.02] transition-[transform] duration-[1.6s] ease-[0.76,0,0.24,1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-60 transition duration-700" />
        </motion.div>

        {/* Content over image */}
        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase">Case Study • 0{p.id}</div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white text-black grid place-items-center group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight size={20} />
            </motion.div>
          </div>

          <div>
            <div className="flex items-end gap-4">
              <h3 className="text-[14vw] md:text-[9vw] leading-[0.8] font-black tracking-tighter text-white">{p.title}</h3>
              <div className="hidden md:block mb-4">
                <p className="text-white/60 text-sm max-w-[260px] leading-snug">{p.desc}</p>
                <p className="text-white/30 text-xs mt-2 tracking-widest uppercase">{p.sub}</p>
              </div>
            </div>
            {/* mobile desc */}
            <p className="md:hidden text-white/60 text-xs mt-2 max-w-[80%]">{p.desc}</p>
          </div>
        </div>

        {/* edge color */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <AnimatePresence>{loading && <Preloader onDone={() => setLoading(false)} />}</AnimatePresence>

      <main ref={containerRef} className={`${loading ? "h-screen overflow-hidden" : ""} bg-[#070708] text-white antialiased selection:bg-white selection:text-black`}>
        {/* NAV - Improved */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex justify-between items-center backdrop-blur-[12px] bg-[#070708]/60 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-black grid place-items-center font-black text-xs tracking-tighter">A</div>
            <span className="text-xs tracking-[0.2em] font-bold uppercase">Akash ©2026</span>
            <span className="hidden md:inline-flex ml-4 px-3 py-1 rounded-full bg-[#00FF94]/10 text-[#00FF94] text-[10px] tracking-widest border border-[#00FF94]/20">● Available for work</span>
          </div>
          <div className="hidden md:flex items-center gap-2 p-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
            {["Work", "Services", "About", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="px-4 py-1.5 rounded-full text-[11px] tracking-widest uppercase hover:bg-white hover:text-black transition">{l}</a>
            ))}
          </div>
          <Magnetic>
            <a href="#contact" className="w-10 h-10 rounded-full bg-white text-black grid place-items-center hover:scale-110 transition">
              <Mail size={16} />
            </a>
          </Magnetic>
        </nav>

        {/* HERO - Fixed cut issue */}
        <motion.section style={{ scale, y, opacity }} className="relative min-h-[92vh] md:min-h-[100vh] flex flex-col justify-end px-6 md:px-10 pb-10 md:pb-14 pt-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-[15%] left-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-20">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="w-full h-full rounded-full" style={{ background: "conic-gradient(from 0deg, #FF4D00, #7C5CFC, #00FF94, #FFD60A, #FF4D00)" }} />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.15),transparent_70%)]" />
          </div>

          <div className="max-w-[1600px] w-full mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] tracking-[0.2em] uppercase mb-6">
              <Sparkles size={12} /> <span>Creative Developer from Nashik, working worldwide</span>
            </motion.div>

            {/* FIXED HERO TEXT - no more cut */}
            <h1 className="font-black tracking-tighter leading-[0.85] text-[13vw] md:text-[8.8vw] lg:text-[8.2vw] break-words">
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }} className="block">CRAFTING</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.45 }} className="block font-light italic tracking-tight text-white/90">DIGITAL</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.6 }} className="block flex flex-wrap items-center gap-[0.2em]">
                  <span>EXPERIENCES</span>
                  <span className="inline-flex w-[10vw] h-[10vw] md:w-[5vw] md:h-[5vw] rounded-full bg-white text-black place-items-center text-[3vw] md:text-[1.6vw] -rotate-12">↗</span>
                </motion.span>
              </span>
            </h1>

            <div className="mt-10 md:mt-14 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-end border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <Magnetic>
                  <button data-cursor="LET'S TALK" className="group bg-white text-black rounded-full px-7 md:px-9 py-4 md:py-5 text-sm font-bold flex items-center gap-3 hover:bg-zinc-100 transition">
                    START A PROJECT <span className="w-8 h-8 rounded-full bg-black text-white grid place-items-center group-hover:rotate-45 transition duration-500"><ArrowUpRight size={16} /></span>
                  </button>
                </Magnetic>
                <p className="text-sm leading-relaxed text-white/50 max-w-[280px]">I blend design with code using Motion, Lenis, GSAP + modern stack to craft Awwwards-winning sites.</p>
              </div>
              <div className="flex justify-between md:justify-end items-end gap-8">
                <div className="text-left">
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-40">Scroll to explore</div>
                  <div className="w-24 h-[1px] bg-white/20 mt-2 overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-full h-full bg-white" /></div>
                </div>
                <div className="text-right">
                  <div className="text-5xl md:text-6xl font-black tracking-tighter">(04)</div>
                  <div className="text-[10px] tracking-widest uppercase opacity-40">Selected Works</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* WORK META */}
        <div id="work" className="sticky top-[73px] z-30 backdrop-blur-xl bg-[#070708]/80 border-y border-white/[0.06] px-6 md:px-10 py-4 flex justify-between text-[10px] tracking-[0.2em] uppercase text-white/40">
          <span className="hidden md:block">©2026 — Selected Work — 2023↗2026</span>
          <span className="md:hidden">Selected Work (04)</span>
          <span className="flex items-center gap-6"><span className="hidden md:inline">100+ Projects — Awwwards x3</span><span className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" /></span>
        </div>

        {/* PROJECTS - Improved */}
        <section className="px-6 md:px-10 py-12 md:py-20 max-w-[1600px] mx-auto">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
        </section>

        {/* SERVICES BENTO - NEW */}
        <section id="services" className="px-6 md:px-10 py-12 md:py-24 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-[11vw] md:text-[5vw] leading-[0.85] font-black tracking-tighter">SERVICES<br /><span className="font-light italic opacity-40">& CAPABILITIES</span></h2>
            <p className="hidden md:block text-sm text-white/40 max-w-[320px]">From concept to launch, I handle everything — design, motion, code, launch.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Palette, title: "Brand & Identity", desc: "Logos, design systems, art direction that cuts through noise.", tags: ["Figma", "Branding", "Awwwards"] },
              { icon: Code2, title: "Web Development", desc: "Next.js, Framer Motion, Lenis, GSAP — 60fps, SEO, pixel-perfect.", tags: ["Next.js", "Motion", "Tailwind"] },
              { icon: Zap, title: "Motion & 3D", desc: "Scroll-jacking, WebGL, shaders, physics — experiences people remember.", tags: ["GSAP", "Three.js", "Lenis"] },
            ].map((s, i) => (
              <motion.div key={i} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-[24px] bg-white/[0.04] border border-white/[0.08] p-7 md:p-8 hover:bg-white/[0.06] transition">
                <div className="w-10 h-10 rounded-full bg-white text-black grid place-items-center mb-6 group-hover:rotate-12 transition"><s.icon size={18} /></div>
                <h3 className="text-xl font-bold tracking-tight mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/50 mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-[10px] tracking-widest uppercase">{t}</span>)}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MARQUEE - Double */}
        <div className="relative border-y border-white/10 bg-white text-black overflow-hidden">
          <div className="py-3">
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap gap-8 text-[8vw] md:text-[4vw] font-black leading-none tracking-tighter uppercase">
              {Array(6).fill(0).map((_, i) => (
                <span key={i} className="flex items-center gap-8">Motion • Framer • Lenis • GSAP • Tailwind • Shadcn • <span className="font-light italic">Crafted in Nashik</span> •</span>
              ))}
            </motion.div>
          </div>
          <div className="py-3 border-t border-black/10 bg-zinc-100">
            <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap gap-8 text-[8vw] md:text-[4vw] font-black leading-none tracking-tighter uppercase opacity-60">
              {Array(6).fill(0).map((_, i) => (
                <span key={i} className="flex items-center gap-8">100+ Projects • 5+ Years • Awwwards x3 • Available for freelance •</span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="px-6 md:px-10 py-20 md:py-32 max-w-[1600px] mx-auto grid md:grid-cols-[0.35fr_0.65fr] gap-10 md:gap-16">
          <div className="text-[10px] tracking-[0.3em] uppercase opacity-40">(02) — About Me</div>
          <div>
            <h2 className="text-[10vw] md:text-[5.2vw] leading-[0.88] font-black tracking-tighter">I BUILD <span className="font-light italic">PREMIUM</span><br />WEB EXPERIENCES<br /><span className="text-white/20">THAT CONVERT.</span></h2>
            <div className="mt-12 grid md:grid-cols-[1.2fr_0.8fr] gap-12">
              <p className="text-base md:text-lg leading-relaxed text-white/60">I’m a creative developer obsessed with motion, detail and craft. Every easing curve matters. I use Motion, Lenis, GSAP + modern stack to create sites that feel alive.<br /><br />If it doesn’t feel magical, I don’t ship it. Based in Nashik, working worldwide.</p>
              <div className="space-y-0 border border-white/10 rounded-[16px] overflow-hidden divide-y divide-white/10">
                {[
                  ["Experience", "5+ Years"],
                  ["Projects", "100+ Shipped"],
                  ["Awards", "Awwwards x3"],
                  ["Stack", "Next.js / Motion / Tailwind"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between p-5 text-sm"><span className="opacity-40 uppercase text-xs tracking-widest">{k}</span><span className="font-bold">{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Improved */}
        <footer id="contact" className="mx-3 md:mx-6 mb-3 md:mb-6 rounded-[24px] md:rounded-[40px] bg-[#111113] border border-white/[0.08] px-6 md:px-12 py-16 md:py-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[60%] h-[60%] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(124,92,252,0.15),transparent)] pointer-events-none" />
          <div className="max-w-[1600px] mx-auto relative">
            <div className="flex justify-between text-[10px] tracking-[0.3em] uppercase opacity-40 mb-12">
              <span>(03) — Let’s work together</span><span className="hidden md:block">hello@folio.design — 2 spots left for Q1’26</span>
            </div>
            <h2 className="text-[16vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter">
              <span className="block">LET’S TALK</span>
              <span className="block font-light italic flex items-center gap-4 md:gap-8">ABOUT <Magnetic><button data-cursor="SAY HI" className="w-[18vw] h-[18vw] md:w-[8vw] md:h-[8vw] rounded-full bg-white text-black grid place-items-center hover:scale-105 transition duration-500"><ArrowRight className="w-[6vw] md:w-[2.5vw] h-[6vw] md:h-[2.5vw]" /></button></Magnetic></span>
              <span className="block">YOUR NEXT</span>
              <span className="block flex items-center gap-4">PROJECT <span className="text-[4vw] md:text-[1.2vw] font-normal tracking-[0.2em] uppercase opacity-40 ml-4 hidden md:inline">crafted with motion & soul</span></span>
            </h2>

            <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 text-sm">
              <div className="flex flex-wrap gap-6 opacity-60">
                <a href="#" className="hover:opacity-100 transition">↗ Instagram</a>
                <a href="#" className="hover:opacity-100 transition">↗ LinkedIn</a>
                <a href="#" className="hover:opacity-100 transition">↗ Github</a>
                <a href="mailto:hello@folio.design" className="flex items-center gap-2"><Mail size={14} /> hello@folio.design</a>
              </div>
              <div className="text-xs tracking-widest uppercase opacity-30">©2026 Akash — Built with Motion + Lenis + Shadcn — Nashik, IN</div>
            </div>
          </div>
        </footer>

        {/* Bottom progress */}
        <motion.div style={{ scaleX: scrollYProgress }} className="fixed bottom-0 left-0 right-0 h-[2px] bg-white origin-left z-50" />
      </main>
    </>
  );
}
