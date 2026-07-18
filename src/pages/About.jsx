import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="pt-28 md:pt-32 px-6 md:px-10 pb-20 max-w-[1600px] mx-auto">
      <div className="grid md:grid-cols-[0.4fr_0.6fr] gap-12">
        <div>
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10">
            <img src="https://i.pravatar.cc/300" alt="Akash" className="w-full h-full object-cover" />
          </div>
          <h1 className="mt-8 text-5xl font-black tracking-tighter leading-[0.85]">AKASH<br />DUBEY</h1>
          <p className="mt-4 text-sm opacity-50 leading-relaxed">Creative Developer • 5+ years • Nashik, IN → Working Worldwide<br />Obsessed with motion, perfection, and that one extra easing that makes everything feel alive.</p>
          <div className="mt-8 flex gap-3">
            <Link to="/contact" className="px-6 py-3 rounded-full bg-white text-black text-sm font-bold">Hire Me</Link>
            <a href="#" className="px-6 py-3 rounded-full border border-white/20 text-sm">CV →</a>
          </div>
        </div>

        <div>
          <h2 className="text-[8vw] md:text-[5vw] leading-[0.85] font-black tracking-tighter">I BUILD WEB EXPERIENCES<br /><span className="font-light italic opacity-40">THAT FEEL ALIVE.</span></h2>
          
          <div className="mt-12 space-y-8 text-base leading-relaxed text-white/60">
            <p>Every project starts with a feeling. I chase that feeling through code — Motion, Lenis, GSAP, Three.js, shaders — until the site breathes.</p>
            <p>I blend design with engineering. No handoff. I design in Figma, then code it in Next.js so there’s zero loss. Every pixel, every millisecond matters.</p>
            <p>If it doesn’t make you go “whoa”, I don’t ship it.</p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["5+", "Years"],
              ["100+", "Projects"],
              ["03", "Awwwards"],
              ["∞", "Passion"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-[20px] bg-white/[0.04] border border-white/[0.08] p-6">
                <div className="text-4xl font-black">{n}</div><div className="text-[10px] tracking-widest uppercase opacity-40 mt-1">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-xs tracking-[0.3em] uppercase opacity-40 mb-6">Tools I Use Daily</h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js","React","Framer Motion","Lenis","GSAP","Three.js","R3F","Tailwind","Shadcn","Figma","WebGL","Shader"].map((t)=>(
                <span key={t} className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs tracking-widest">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
