import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function LotusLoader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let rafId;
    const start = performance.now();
    const DURATION = 2200; // 2.2 sec max

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / DURATION) * 100 + Math.random() * 5);
      
      setProgress((prev) => {
        // Always move forward
        const next = Math.max(prev, Math.floor(pct));
        if (next >= 100 && !doneRef.current) {
          doneRef.current = true;
          setTimeout(() => onDoneRef.current?.(), 400);
          return 100;
        }
        return next;
      });

      if (elapsed < DURATION + 500 && !doneRef.current) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    // Safety fallback - force close after 3 sec even if stuck
    const safetyTimeout = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setProgress(100);
        onDoneRef.current?.();
      }
    }, 3000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] text-[#FAF9F6] px-6 md:px-10 py-8 flex flex-col justify-between"
    >
      <div className="flex justify-between mono text-[10px] tracking-widest uppercase opacity-40">
        <span>LOTUS INTERNATIONAL — LOADING SYSTEM</span><span>BIWANDI, IN</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-[280px] md:w-[420px]"
        >
          <img
            src="/my-portfolio/lotus-logo.png"
            alt="Lotus International"
            className="w-full h-auto object-contain"
            style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }}
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = document.getElementById('lotus-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div id="lotus-fallback" style={{ display: 'none' }} className="text-center">
            <div className="syne text-4xl font-black">LOTUS INTERNATIONAL</div>
            <div className="mono text-[10px] opacity-60 mt-1">every packaging has a story</div>
          </div>
        </motion.div>

        <div className="mt-12 flex items-baseline gap-4">
          <div className="text-[18vw] md:text-[10vw] leading-none font-black tracking-tighter tabular-nums">
            {progress}
            <span className="text-[5vw] md:text-[3vw] align-super font-light">%</span>
          </div>
          <div className="hidden md:block w-[320px] h-[1px] bg-white/10 relative overflow-hidden ml-8">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>

        <div className="md:hidden mt-6 w-[220px] h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        <div className="mt-4 mono text-[10px] tracking-widest uppercase opacity-30">
          {progress < 30 && "Initializing 3D Engine..."}
          {progress >= 30 && progress < 60 && "Loading Foam Textures..."}
          {progress >= 60 && progress < 90 && "Building Exploding Box..."}
          {progress >= 90 && "Ready — Crafting Packaging Stories..."}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mono text-[10px] leading-relaxed uppercase">
        <div className="opacity-40">Every packaging has a story — and we make sure it ends safely. Custom foam cavities, 48hr sample, zero damage delivery.</div>
        <div className="opacity-20 hidden md:block text-center">Est. 2019 • 1.5 Lakh Sqft • ISO 9001 • 1000+ Clients • No Images • Pure 3D</div>
        <div className="text-right opacity-40">sales@lotusinternational.co.in<br />+91 9322021868</div>
      </div>
    </motion.div>
  );
}
