import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.random() * 15;
      if (cur >= 100) { cur = 100; clearInterval(id); setTimeout(onDone, 800); }
      setP(Math.floor(Math.min(100, cur)));
    }, 60);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#050507] text-white flex flex-col justify-between p-6 md:p-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{ backgroundImage: `repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)` }} />
      </div>

      <div className="relative flex justify-between text-[10px] tracking-[0.3em] uppercase opacity-40">
        <span>AKASH DUBEY — PORTFOLIO ©2026</span><span>Nashik, IN / 19:21</span>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} className="text-[18vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter">
            LOADING
          </motion.h1>
        </div>
        <div className="flex items-baseline gap-6 mt-4">
          <span className="text-[22vw] md:text-[16vw] leading-[0.8] font-black tracking-tighter">{String(p).padStart(2, "0")}</span>
          <span className="text-2xl font-light">%</span>
          <div className="flex-1 ml-6 h-[1px] bg-white/20 overflow-hidden hidden md:block">
            <motion.div style={{ width: `${p}%` }} className="h-full bg-white" />
          </div>
        </div>
        <div className="md:hidden mt-4 h-[2px] bg-white/10 overflow-hidden rounded-full">
          <motion.div style={{ width: `${p}%` }} className="h-full bg-white" />
        </div>
      </div>

      <div className="relative grid md:grid-cols-3 gap-6 text-xs leading-relaxed">
        <p className="opacity-60 max-w-[320px]">Initializing WebGL • Motion System • Lenis Smooth Scroll • Three.js Shaders • Please wait, crafting ultra-premium experience...</p>
        <div className="hidden md:block text-[10px] tracking-[0.2em] uppercase opacity-30 leading-loose">
          [01] Three.js • WebGL<br/>[02] Framer Motion • GSAP<br/>[03] Lenis • R3F / Drei<br/>[04] Tailwind • Shadcn
        </div>
        <div className="text-right md:text-left">
          <p className="opacity-40 text-[10px] tracking-widest uppercase">Building 3D World</p>
          <div className="mt-2 flex gap-1 justify-end md:justify-start">
            {Array(12).fill(0).map((_, i) => (
              <motion.div key={i} animate={{ opacity: p > i * 8 ? 1 : 0.1 }} className="w-1 h-4 bg-white" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
