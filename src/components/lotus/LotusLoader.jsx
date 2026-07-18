import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LotusLoader({ onDone }) {
  const [line, setLine] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLine(l => {
      if (l >= 100) { clearInterval(id); setTimeout(onDone, 500); return 100; }
      return l + Math.random() * 8;
    }), 40);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76,0,0.24,1] } }} className="fixed inset-0 z-[100] bg-[#0A0A0A] text-[#FAF9F6] px-6 md:px-10 py-8 flex flex-col justify-between">
      <div className="flex justify-between mono text-[10px] tracking-widest uppercase opacity-40">
        <span>LOTUS INTERNATIONAL — LOADING SYSTEM</span><span>BIWANDI, IN</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        {/* LOGO - TRANSPARENT, NO BORDER/BACKGROUND, JUST LOGO */}
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="/my-portfolio/lotus-logo.png" 
          alt="Lotus International" 
          className="w-[320px] md:w-[480px] h-auto object-contain"
          style={{ background: 'transparent' }}
          onError={(e)=>e.target.src='/lotus-logo.png'} 
        />
        <div className="mt-10 flex items-end gap-6">
          <div className="text-[14vw] md:text-[8vw] leading-none font-black tracking-tighter">{Math.floor(line)}<span className="text-[4vw] align-super">%</span></div>
          <div className="hidden md:block w-[200px] h-px bg-white/20 mb-6 md:mb-8 relative overflow-hidden">
            <motion.div style={{ width: `${line}%` }} className="absolute inset-y-0 left-0 bg-white" />
          </div>
        </div>
        <div className="md:hidden mt-4 w-[200px] h-px bg-white/20 relative overflow-hidden">
          <motion.div style={{ width: `${line}%` }} className="absolute inset-y-0 left-0 bg-white" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mono text-[10px] leading-relaxed uppercase">
        <div className="opacity-40">Every packaging has a story — and we make sure it ends safely. Custom foam cavities, 48hr sample, zero damage delivery.</div>
        <div className="opacity-20 hidden md:block text-center">Est. 2019 • 1.5 Lakh Sqft • ISO 9001 • 1000+ Clients</div>
        <div className="text-right opacity-40">sales@lotusinternational.co.in<br/>+91 9322021868</div>
      </div>
    </motion.div>
  );
}
