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

      <div>
        <div className="mono text-[10px] tracking-[0.2em] uppercase opacity-30 mb-4">[ EPE FOAM • EP FOAM • CUSTOM FITMENTS ]</div>
        <h1 className="syne text-[18vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter">LOTUS</h1>
        <div className="mt-6 flex items-end gap-6">
          <div className="text-[14vw] md:text-[8vw] leading-none font-black tracking-tighter">{Math.floor(line)}<span className="text-[4vw] align-super">%</span></div>
          <div className="flex-1 h-px bg-white/20 mb-6 md:mb-8 relative overflow-hidden hidden md:block">
            <motion.div style={{ width: `${line}%` }} className="absolute inset-y-0 left-0 bg-white" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mono text-[10px] leading-relaxed uppercase">
        <div className="opacity-40">Every packaging has a story — and we make sure it ends safely. Custom foam cavities, 48hr sample, zero damage delivery.</div>
        <div className="opacity-20 hidden md:block">Est. 2019 • 1.5 Lakh Sqft • ISO 9001 • 1000+ Clients • Bhiwandi Manufacturing Hub</div>
        <div className="text-right opacity-40">sales@lotusinternational.co.in<br/>+91 9322021868</div>
      </div>
    </motion.div>
  );
}
