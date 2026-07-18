import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const allProjects = [
  { id: "nebula", title: "NEBULA", sub: "Fashion Commerce", cat: "E-commerce / 3D / GSAP", year: "2024", color: "#FF4D00", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200", desc: "Luxury fashion store with 3D try-on, 80% conversion boost." },
  { id: "aura", title: "AURA", sub: "SaaS Platform", cat: "Product Design / Motion", year: "2024", color: "#7C5CFC", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200", desc: "B2B SaaS dashboard that feels like Linear + Stripe." },
  { id: "void", title: "VOID", sub: "Creative Agency", cat: "Awwwards / WebGL", year: "2023", color: "#00FF94", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", desc: "Agency site - SOTD with physics drag & magnetic." },
  { id: "monarch", title: "MONARCH", sub: "Luxury Watch", cat: "Branding / 3D Commerce", year: "2023", color: "#FFD60A", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200", desc: "Watch configurator - real-time WebGL, 60fps." },
  { id: "pulse", title: "PULSE", sub: "Music App", cat: "Mobile / Motion", year: "2023", color: "#FF2D87", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200", desc: "Music streaming with audio-reactive 3D visuals." },
  { id: "orbit", title: "ORBIT", sub: "Space Dashboard", cat: "Data Viz / Three.js", year: "2024", color: "#00D9FF", img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1200", desc: "NASA-inspired dashboard with orbital mechanics." },
];

export default function Work() {
  return (
    <div className="pt-28 md:pt-32 px-6 md:px-10 pb-20 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-[15vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter">WORK<br /><span className="font-light italic text-white/40">(06)</span></h1>
        <p className="hidden md:block text-sm text-white/40 max-w-[300px]">Selected works 2023-2026. Each project is crafted with obsession for motion & detail. Click to explore 3D case studies.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {allProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <Link to={`/work/${p.id}`}>
              <div className="relative overflow-hidden rounded-[20px] md:rounded-[32px] aspect-[4/3] bg-[#111]">
                <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase">{p.cat}</span>
                  <span className="w-10 h-10 rounded-full bg-white text-black grid place-items-center group-hover:rotate-45 transition duration-500"><ArrowUpRight size={18} /></span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-5xl md:text-6xl font-black tracking-tighter">{p.title}</h3>
                  <p className="text-white/60 text-sm mt-2">{p.sub} — {p.desc}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-40 transition" style={{ background: p.color }} />
              </div>
            </Link>
            <div className="mt-4 flex justify-between text-[10px] tracking-widest uppercase opacity-40">
              <span>0{i + 1} — {p.id}</span><span>{p.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
