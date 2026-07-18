import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, Mail, ArrowRight } from "lucide-react";

// --- Custom Cursor ---
function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const [hovering, setHovering] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleHover = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setHovering(true);
        setText(target.getAttribute("data-cursor") || "View");
      } else {
        setHovering(false);
        setText("");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference hidden md:block"
      />
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: hovering ? 1.5 : 1, opacity: hovering ? 1 : 0.5 }}
        className="fixed top-0 left-0 w-10 h-10 -ml-3 -mt-3 border border-white/50 rounded-full pointer-events-none z-[99998] mix-blend-difference hidden md:flex items-center justify-center"
      >
        <motion.span animate={{ opacity: hovering ? 1 : 0 }} className="text-[10px] text-white tracking-widest font-bold">
          {text}
        </motion.span>
      </motion.div>
    </>
  );
}

// --- Magnetic Button ---
function MagneticButton({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Preloader ---
function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return c + Math.floor(Math.random() * 7) + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex flex-col justify-between p-6 md:p-10"
    >
      <div className="flex justify-between text-white/40 text-xs tracking-[0.3em] uppercase">
        <span>Loading Experience</span>
        <span>©2026</span>
      </div>
      <div className="relative">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-[18vw] leading-[0.8] font-black tracking-tighter text-white"
        >
          {String(count).padStart(3, "0")}
          <span className="text-[5vw] align-super">%</span>
        </motion.h1>
        <div className="w-full h-[1px] bg-white/10 mt-6 overflow-hidden">
          <motion.div style={{ width: `${count}%` }} className="h-full bg-white" />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-white text-sm max-w-[240px] leading-tight">
          Crafting ultra-premium digital experiences with motion & soul.
        </div>
        <div className="text-white/40 text-xs uppercase tracking-widest">Nashik, IN — SYNE × GS</div>
      </div>
    </motion.div>
  );
}

// --- Projects Data ---
const projects = [
  {
    id: "01",
    title: "NEBULA — Fashion Commerce",
    cat: "E-commerce / GSAP / 3D",
    year: "2024",
    color: "#FF3C00",
    img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200",
  },
  {
    id: "02",
    title: "AURA — SaaS Platform",
    cat: "Product Design / Motion",
    year: "2024",
    color: "#6C5CFF",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200",
  },
  {
    id: "03",
    title: "VOID — Creative Agency",
    cat: "Awwwards / Lenis / WebGL",
    year: "2023",
    color: "#00FF88",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
  },
  {
    id: "04",
    title: "MONARCH — Luxury Watch",
    cat: "Branding / 3D Commerce",
    year: "2023",
    color: "#FFE600",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.div ref={ref} style={{ scale, rotate }} className="group relative mb-24 md:mb-40">
      <div className="flex justify-between items-end mb-6 text-white/50 text-xs md:text-sm tracking-widest uppercase">
        <span>({project.id}) — {project.cat}</span>
        <span>{project.year}</span>
      </div>
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[40px] aspect-[16/10] bg-white/5" data-cursor="View">
        <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition duration-[1.5s] ease-[0.76,0,0.24,1]" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-700" />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex justify-between items-end z-10">
          <h3 className="text-[8vw] md:text-[6vw] leading-[0.85] font-black text-white mix-blend-overlay opacity-90 tracking-tighter">
            {project.title.split(" — ")[0]}
          </h3>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition duration-500"
          >
            <ArrowUpRight size={28} />
          </motion.div>
        </div>
        <div className="absolute top-6 right-6 w-2 h-2 rounded-full" style={{ background: project.color, boxShadow: `0 0 20px ${project.color}` }} />
      </div>
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="mt-6 text-2xl md:text-4xl font-bold tracking-tight"
      >
        {project.title}
      </motion.h2>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textRevealProgress = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div className="grain" />
      <CustomCursor />
      <AnimatePresence>{loading && <Preloader onComplete={() => setLoading(false)} />}</AnimatePresence>

      <main ref={containerRef} className={`${loading ? "h-screen overflow-hidden" : ""} bg-[#0a0a0a] text-white relative`}>
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:p-8 mix-blend-difference">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white text-black grid place-items-center font-black text-[10px]">©</div>
            <span className="text-xs tracking-[0.2em] uppercase font-medium">Folio — 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.2em] uppercase">
            <a href="#work" className="hover:opacity-50 transition">Work, (04)</a>
            <a href="#about" className="hover:opacity-50 transition">About</a>
            <a href="#contact" className="hover:opacity-50 transition">Contact</a>
          </div>
          <MagneticButton>
            <button className="w-10 h-10 rounded-full border border-white/20 grid place-items-center hover:bg-white hover:text-black transition">
              <div className="space-y-1">
                <div className="w-4 h-px bg-current" />
                <div className="w-4 h-px bg-current" />
              </div>
            </button>
          </MagneticButton>
        </nav>

        {/* HERO */}
        <motion.section ref={heroRef} style={{ scale: heroScale, y: heroY, opacity: heroOpacity }} className="min-h-[100vh] flex flex-col justify-end p-6 md:p-10 pb-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full blur-[120px] opacity-30 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #FF3C00, #6C5CFF, #00FF88, #FFE600, #FF3C00)",
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-2 text-[11px] tracking-[0.3em] uppercase text-white/50 mb-8">
              <span>(01)</span>
              <span className="w-10 h-px bg-white/20 self-center" />
              <span>Creative Developer & Digital Designer</span>
            </motion.div>

            <h1 className="display text-[13vw] md:text-[11vw] leading-[0.8] tracking-tighter">
              <span className="block overflow-hidden">
                <motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }} className="block">
                  CRAFTING
                </motion.span>
              </span>
              <span className="block overflow-hidden -mt-2 md:-mt-4">
                <motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.45 }} className="block font-light italic tracking-normal">
                  DIGITAL
                </motion.span>
              </span>
              <span className="block overflow-hidden -mt-2 md:-mt-4">
                <motion.span initial={{ y: "100%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.6 }} className="flex items-center gap-4 md:gap-8">
                  EXPERIENCES <ArrowUpRight className="w-[6vw] h-[6vw] md:w-[5vw] md:h-[5vw] text-white/30" />
                </motion.span>
              </span>
            </h1>

            <div className="mt-16 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
              <div className="flex gap-6">
                <MagneticButton>
                  <button data-cursor="Let's Talk" className="group bg-white text-black rounded-full px-8 py-5 text-sm font-bold tracking-wide flex items-center gap-3 hover:bg-zinc-200 transition">
                    START A PROJECT <span className="w-7 h-7 rounded-full bg-black text-white grid place-items-center group-hover:rotate-45 transition duration-300"><ArrowUpRight size={14} /></span>
                  </button>
                </MagneticButton>
                <div className="hidden md:block text-[12px] leading-[1.5] text-white/50 max-w-[220px]">
                  Based in Nashik, working worldwide. Available for freelance & full-time positions.
                </div>
              </div>
              <div className="text-right md:text-left flex md:block justify-between items-end">
                <div className="text-[11px] tracking-widest uppercase text-white/40">Scroll to explore —</div>
                <div className="text-5xl md:text-7xl font-black tracking-tighter mt-2">(04)</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* WORK HEADER */}
        <section id="work" className="px-6 md:px-10 py-10 border-y border-white/10 flex justify-between items-center text-[11px] tracking-[0.3em] uppercase text-white/40">
          <span>Selected Work — 2023 / 2026</span>
          <span className="hidden md:block">04 Projects • Infinite Passion</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" /> Available for work</span>
        </section>

        {/* PROJECTS */}
        <section className="px-6 md:px-10 py-20 md:py-32 max-w-[1600px] mx-auto">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </section>

        {/* MARQUEE */}
        <div className="relative py-6 border-y border-white/10 bg-white text-black overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap text-[8vw] md:text-[6vw] leading-none font-black tracking-tighter uppercase gap-10"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-10 items-center">
                <span>Motion</span><span className="w-4 h-4 rounded-full bg-black" />
                <span className="font-light italic">Framer</span><span className="w-4 h-4 rounded-full bg-black" />
                <span>Lenis</span><span className="w-4 h-4 rounded-full bg-black" />
                <span className="font-light italic">GSAP</span><span className="w-4 h-4 rounded-full bg-black" />
                <span>Tailwind</span><span className="w-4 h-4 rounded-full bg-black" />
                <span>Shadcn</span><span className="w-4 h-4 rounded-full bg-black" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ABOUT */}
        <section id="about" className="px-6 md:px-10 py-24 md:py-40 grid md:grid-cols-[0.3fr_0.7fr] gap-10 max-w-[1600px] mx-auto">
          <div className="text-[11px] tracking-[0.3em] uppercase text-white/40">(02) — About Me</div>
          <div>
            <h2 className="text-[8vw] md:text-[6vw] leading-[0.9] tracking-tighter font-bold">
              I BUILD <span className="font-light italic">PREMIUM</span> WEB EXPERIENCES THAT <span className="text-white/20">CONVERT & DELIGHT.</span>
            </h2>
            <div className="mt-16 grid md:grid-cols-2 gap-10">
              <p className="text-lg md:text-xl leading-[1.6] text-white/70">
                I'm a creative developer obsessed with motion, detail and perfection. I blend design with code using Framer Motion, Lenis, GSAP and modern stack to create Awwwards-level sites.
                <br /><br />
                Every pixel, every easing curve matters. If it doesn't feel magical, I don't ship it.
              </p>
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-8 flex justify-between">
                  <span className="text-white/40 text-sm uppercase">Experience</span>
                  <span className="text-sm">5+ Years</span>
                </div>
                <div className="border-b border-white/10 pb-8 flex justify-between">
                  <span className="text-white/40 text-sm uppercase">Projects</span>
                  <span className="text-sm">100+ Shipped</span>
                </div>
                <div className="border-b border-white/10 pb-8 flex justify-between">
                  <span className="text-white/40 text-sm uppercase">Awards</span>
                  <span className="text-sm">Awwwards x3</span>
                </div>
                <div className="flex gap-4 mt-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
                    <img src="https://i.pravatar.cc/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Based in Nashik, MH</div>
                    <div className="text-xs text-white/50">Open to remote worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <footer id="contact" className="px-6 md:px-10 py-16 md:py-24 bg-[#111] rounded-t-[30px] md:rounded-t-[60px] mt-10">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex justify-between text-[11px] tracking-[0.3em] uppercase text-white/40 mb-20">
              <span>(03) — Let's work together</span>
              <span>hello@folio.design</span>
            </div>
            <h2 className="text-[14vw] leading-[0.8] tracking-tighter font-black">
              LET'S TALK<br />
              <span className="font-light italic flex items-center gap-4">ABOUT <MagneticButton><button data-cursor="Email Me" className="w-[15vw] h-[15vw] md:w-[9vw] md:h-[9vw] mt-2 rounded-full bg-white text-black grid place-items-center hover:scale-110 transition duration-500"><ArrowRight className="w-[5vw] h-[5vw]" /></button></MagneticButton></span>
              YOUR NEXT<br /> PROJECT
            </h2>

            <div className="mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between gap-10">
              <div className="flex gap-8 text-sm">
                <a href="#" className="flex items-center gap-2 hover:opacity-50 transition">↗ Instagram</a>
                <a href="#" className="flex items-center gap-2 hover:opacity-50 transition">↗ Twitter</a>
                <a href="#" className="flex items-center gap-2 hover:opacity-50 transition">↗ Github</a>
                <a href="#" className="flex items-center gap-2 hover:opacity-50 transition"><Mail size={16} /> Email</a>
              </div>
              <div className="text-white/40 text-xs tracking-widest uppercase">
                ©2026 Portfolio — Built with Motion + Lenis + Shadcn/ui — Crafted in Nashik
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
