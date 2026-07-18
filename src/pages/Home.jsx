import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import MagneticButton from "../components/MagneticButton";
import Scene3D from "../components/Scene3D";

const projectsPreview = [
  { id: "nebula", title: "NEBULA", cat: "Fashion / 3D", color: "#FF4D00" },
  { id: "aura", title: "AURA", cat: "SaaS / Motion", color: "#7C5CFC" },
  { id: "void", title: "VOID", cat: "Agency / WebGL", color: "#00FF94" },
];

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <div ref={ref} className="relative">
      <Scene3D variant="home" />

      {/* HERO */}
      <motion.section style={{ y, opacity, scale }} className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-10 pb-12 md:pb-16 pt-32">
        <div className="max-w-[1600px] w-full mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] tracking-[0.2em] uppercase mb-6 md:mb-10">
            <Sparkles size={12} className="text-[#00FF94]" /> 3D Portfolio • Available for freelance • Based in Nashik
          </motion.div>

          <h1 className="font-black tracking-tighter leading-[0.85] text-[14vw] md:text-[9vw] lg:text-[8.5vw]">
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }} className="block">CRAFTING</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.45 }} className="block font-light italic text-white/80">DIGITAL</motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.6 }} className="block flex items-center gap-4">
                EXPERIENCES
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} className="w-[12vw] h-[12vw] md:w-[6vw] md:h-[6vw] rounded-full bg-white text-black grid place-items-center text-[4vw] md:text-[2vw] -rotate-12">↗</motion.span>
              </motion.span>
            </span>
          </h1>

          <div className="mt-12 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-end border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <MagneticButton>
                <Link to="/work" data-cursor="EXPLORE" className="group bg-white text-black rounded-full px-8 py-4 md:py-5 text-sm font-bold flex items-center gap-3 hover:bg-zinc-100 transition">
                  EXPLORE WORK <span className="w-8 h-8 rounded-full bg-black text-white grid place-items-center group-hover:rotate-45 transition duration-500"><ArrowUpRight size={16} /></span>
                </Link>
              </MagneticButton>
              <p className="text-sm text-white/50 max-w-[300px] leading-relaxed">Transforming ideas into immersive 3D web experiences. Each project is a universe.</p>
            </div>
            <div className="flex justify-between md:justify-end gap-10 text-right">
              <div>
                <div className="text-5xl font-black tracking-tighter">(04)</div>
                <div className="text-[10px] tracking-widest uppercase opacity-40">Featured</div>
              </div>
              <div className="hidden md:block text-left max-w-[160px] text-xs opacity-40 uppercase tracking-widest leading-relaxed">Scroll to dive into the 3D world — built with R3F, Motion, Lenis</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* QUICK WORK PREVIEW - 3D Cards */}
      <section className="relative z-10 px-6 md:px-10 py-12 md:py-20 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-8 text-[10px] tracking-[0.3em] uppercase opacity-40">
          <span>Featured — 3D Showcase</span><Link to="/work" className="hover:text-white transition">View All →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projectsPreview.map((p, i) => (
            <motion.div key={p.id} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }} whileHover={{ y: -10, rotateX: 5, rotateY: -5 }} className="group relative rounded-[24px] bg-white/[0.04] border border-white/[0.08] p-6 h-[340px] flex flex-col justify-between overflow-hidden hover:bg-white/[0.06] transition backdrop-blur-sm">
              <div className="flex justify-between">
                <span className="w-2 h-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 12px ${p.color}` }} />
                <span className="text-[10px] tracking-widest uppercase opacity-40">{p.cat}</span>
              </div>
              <div>
                <h3 className="text-5xl font-black tracking-tighter group-hover:tracking-wide transition-all duration-500">{p.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-xs opacity-60 group-hover:opacity-100 transition">View Case <ArrowUpRight size={14} /></div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[40px] opacity-30 group-hover:opacity-60 transition" style={{ background: p.color }} />
              <Link to={`/work/${p.id}`} className="absolute inset-0" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative z-10 mx-3 md:mx-6 mb-6 rounded-[24px] md:rounded-[40px] bg-white text-black px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-[8vw] md:text-[4vw] leading-[0.85] font-black tracking-tighter">Let’s build something<br /><span className="font-light italic">that shocks the web?</span></h2>
        <MagneticButton>
          <Link to="/contact" className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-black text-white grid place-items-center text-2xl hover:scale-110 transition">↗</Link>
        </MagneticButton>
      </section>
    </div>
  );
}
