import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LotusLoader({ onDone }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.random() * 14;
      if (cur >= 100) { cur = 100; clearInterval(id); setTimeout(onDone, 600); }
      setP(Math.floor(Math.min(100, cur)));
    }, 50);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#FFFEFB] text-[#1A1A1A] flex flex-col justify-between p-6 md:p-10"
    >
      <div className="flex justify-between text-[10px] tracking-[0.3em] uppercase">
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#7E22CE] animate-pulse" /> Lotus International — Bhiwandi, MH</span>
        <span>EST. 2019 • ISO 9001 Certified</span>
      </div>

      <div className="relative flex flex-col items-center justify-center flex-1">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 relative">
            <div className="absolute inset-0 bg-[#7E22CE]/20 rounded-full blur-[20px] animate-pulse" />
            <img src="/my-portfolio/lotus-logo.png" alt="Lotus" className="relative w-full h-full object-contain" onError={(e)=>e.target.src='/lotus-logo.png'} />
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border border-dashed border-[#7E22CE]/20 rounded-full" />
        </motion.div>

        <div className="mt-12 text-center">
          <h1 className="text-[14vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter" style={{ fontFamily: 'Syne' }}>
            LOTUS
          </h1>
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-60 mt-2">Every Packaging Has A Story</p>
          <div className="mt-8 flex items-baseline justify-center gap-3">
            <span className="text-6xl md:text-7xl font-black tracking-tighter">{p}</span>
            <span className="text-xl">%</span>
          </div>
          <div className="mt-4 w-[200px] md:w-[300px] h-[2px] bg-black/10 mx-auto overflow-hidden rounded-full">
            <motion.div style={{ width: `${p}%` }} className="h-full bg-[#7E22CE]" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-[10px] tracking-widest uppercase opacity-40">
        <span>EP Foam • EPE Foam • Custom Fitments</span>
        <span className="text-center">Protecting Products Since 2019</span>
        <span className="text-right">sales@lotusinternational.co.in</span>
      </div>
    </motion.div>
  );
}
