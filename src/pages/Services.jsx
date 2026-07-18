import { motion } from "framer-motion";
import { Palette, Code2, Zap, Layers, Globe, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "../components/MagneticButton";

const services = [
  { icon: Palette, title: "Brand Identity", price: "From $3k", desc: "Visual systems that cut through. Logo, typography, color, guidelines.", list: ["Logo & Mark", "Design System", "Art Direction", "Brand Guidelines"] },
  { icon: Code2, title: "Web Development", price: "From $8k", desc: "Next.js, Motion, Lenis, Tailwind — 60fps, SEO, awwwards level.", list: ["Next.js / React", "Framer Motion", "Lenis Smooth", "CMS + SEO"] },
  { icon: Zap, title: "Motion & 3D", price: "From $5k", desc: "WebGL, shaders, physics, scroll-jacking that people remember.", list: ["Three.js / R3F", "GSAP ScrollTrigger", "Shaders / Particles", "3D Commerce"] },
  { icon: Layers, title: "Product Design", price: "From $6k", desc: "SaaS dashboard, mobile app — designed like Linear, Stripe.", list: ["UX/UI Design", "Design to Code", "Prototyping", "User Testing"] },
  { icon: Globe, title: "E-commerce", price: "From $10k", desc: "High-converting stores with 3D try-on, AR, headless.", list: ["Shopify / Headless", "3D Configurator", "Conversion Optimization", "Performance"] },
  { icon: Cpu, title: "Consulting", price: "$250/hr", desc: "Audit your site, make it faster, more engaging, more awwwards.", list: ["Performance Audit", "Motion Strategy", "Tech Stack", "Team Training"] },
];

export default function Services() {
  return (
    <div className="pt-28 md:pt-32 px-6 md:px-10 pb-20 max-w-[1600px] mx-auto">
      <h1 className="text-[14vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter">SERVICES<br /><span className="font-light italic opacity-40">That Shock</span></h1>
      <p className="mt-6 text-white/50 max-w-[500px]">Every service is a 3D-ready, motion-obsessed, ultra-premium execution. No templates, only craft.</p>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="group rounded-[24px] bg-white/[0.04] border border-white/[0.08] p-8 hover:bg-white/[0.06] transition">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-full bg-white text-black grid place-items-center group-hover:rotate-12 transition"><s.icon size={20} /></div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] tracking-widest uppercase">{s.price}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">{s.title}</h3>
            <p className="text-sm text-white/50 mt-3 leading-relaxed">{s.desc}</p>
            <div className="mt-6 space-y-2">
              {s.list.map((it) => (
                <div key={it} className="flex items-center gap-2 text-xs opacity-60"><span className="w-1 h-1 rounded-full bg-white/40" /> {it}</div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 rounded-[32px] bg-white text-black p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <h2 className="text-[8vw] md:text-[4vw] leading-[0.85] font-black tracking-tighter">Need custom<br />3D magic?</h2>
        <MagneticButton><Link to="/contact" className="px-10 py-5 rounded-full bg-black text-white font-bold flex items-center gap-3 hover:bg-zinc-800 transition">Let’s Talk →</Link></MagneticButton>
      </div>
    </div>
  );
}
