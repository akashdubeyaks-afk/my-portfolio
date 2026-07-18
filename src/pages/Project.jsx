import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const data = {
  nebula: { title: "NEBULA", sub: "Fashion Commerce", year: "2024", role: "Design / 3D / Dev", color: "#FF4D00", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1600", desc: "Nebula is a luxury fashion e-commerce that redefines online shopping with 3D try-on, physics-based drape simulation and ultra-smooth Lenis scroll. Result: +80% conversion.", stack: ["Next.js", "Three.js", "Framer Motion", "Shopify"] },
  aura: { title: "AURA", sub: "SaaS Platform", year: "2024", role: "Product Design", color: "#7C5CFC", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600", desc: "AURA is a B2B SaaS dashboard designed to feel like Linear + Stripe. 3D cards, realtime graphs, command palette.", stack: ["React", "Motion", "Tailwind", "Supabase"] },
  void: { title: "VOID", sub: "Creative Agency", year: "2023", role: "Awwwards SOTD", color: "#00FF94", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600", desc: "VOID agency site won Site of the Day with magnetic drag, WebGL fluid simulation, and insane page transitions.", stack: ["GSAP", "Lenis", "WebGL", "R3F"] },
  monarch: { title: "MONARCH", sub: "Luxury Watch", year: "2023", role: "3D Commerce", color: "#FFD60A", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600", desc: "Luxury watch configurator with real-time material switching, 60fps, built with Three.js and custom shaders.", stack: ["Three.js", "Custom Shaders", "Framer", "GSAP"] },
  pulse: { title: "PULSE", sub: "Music App", year: "2023", role: "Mobile / Motion", color: "#FF2D87", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1600", desc: "Audio-reactive 3D visuals that dance with music, using Web Audio API + Three.js particles.", stack: ["Web Audio", "Three.js", "Motion"] },
  orbit: { title: "ORBIT", sub: "Space Dashboard", year: "2024", role: "Data Viz", color: "#00D9FF", img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1600", desc: "Space dashboard with real Kepler orbits, satellite tracking, built for a science museum.", stack: ["Three.js", "D3", "R3F"] },
};

export default function Project() {
  const { id } = useParams();
  const p = data[id] || data.nebula;

  return (
    <div className="pt-24 md:pt-28">
      <div className="px-6 md:px-10 py-8 flex justify-between items-center text-[10px] tracking-widest uppercase opacity-40">
        <Link to="/work" className="flex items-center gap-2 hover:text-white transition"><ArrowLeft size={14} /> Back to Work</Link>
        <span>Case Study — {p.year}</span>
      </div>

      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <h1 className="text-[18vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter">{p.title}</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.stack.map((s) => (
            <span key={s} className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs tracking-widest uppercase">{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-10 px-3 md:px-6">
        <div className="rounded-[24px] md:rounded-[40px] overflow-hidden aspect-[16/9] bg-[#111]">
          <motion.img initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} src={p.img} alt={p.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="px-6 md:px-10 py-16 md:py-24 max-w-[1600px] mx-auto grid md:grid-cols-[0.4fr_0.6fr] gap-12">
        <div>
          <div className="space-y-6">
            <div><div className="text-[10px] tracking-widest uppercase opacity-40">Role</div><div className="font-bold mt-1">{p.role}</div></div>
            <div><div className="text-[10px] tracking-widest uppercase opacity-40">Year</div><div className="font-bold mt-1">{p.year}</div></div>
            <div><div className="text-[10px] tracking-widest uppercase opacity-40">Client</div><div className="font-bold mt-1">{p.sub}</div></div>
          </div>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition">Start Similar Project <ArrowUpRight size={16} /></Link>
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9]">{p.desc}</h2>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="rounded-[20px] bg-white/[0.04] border border-white/[0.08] p-6">
              <div className="text-4xl font-black">+80%</div><div className="text-xs uppercase tracking-widest opacity-40 mt-2">Conversion Boost</div>
            </div>
            <div className="rounded-[20px] bg-white/[0.04] border border-white/[0.08] p-6">
              <div className="text-4xl font-black">60fps</div><div className="text-xs uppercase tracking-widest opacity-40 mt-2">WebGL Performance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-20 max-w-[1600px] mx-auto flex justify-between border-t border-white/10 pt-10">
        <Link to="/work" className="text-sm opacity-60 hover:opacity-100">← All Projects</Link>
        <Link to="/contact" className="text-sm font-bold flex items-center gap-2">Next: Let’s Talk <ArrowUpRight size={16} /></Link>
      </div>
    </div>
  );
}
