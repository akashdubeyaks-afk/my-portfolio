import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LotusLoader({ onDone }) {
  const [sec, setSec] = useState(3);
  const [dec, setDec] = useState(0.0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // Main timer - simple, no RAF, just setTimeout chain
    const start = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, 3 - elapsed);
      setSec(Math.ceil(remaining));
      setDec(remaining);
      
      if (remaining <= 0 && !doneRef.current) {
        doneRef.current = true;
        clearInterval(interval);
        setTimeout(() => onDoneRef.current?.(), 200);
      }
    }, 50);

    // Absolute safety - force done after 3.2s no matter what
    const safety = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        clearInterval(interval);
        onDoneRef.current?.();
      }
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] text-[#FAF9F6] px-6 md:px-10 py-8 flex flex-col justify-between"
    >
      <div className="flex justify-between mono text-[10px] tracking-widest uppercase opacity-40">
        <span>LOTUS INTERNATIONAL — LOADING — FAST 3S</span>
        <span>BIWANDI, IN • EST. 2019 • ISO 9001</span>
        <span className="hidden md:block">NO IMAGES • PURE 3D • FAST</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-[300px] md:w-[440px]"
        >
          <img
            src="/my-portfolio/lotus-logo.png"
            alt="Lotus"
            className="w-full h-auto object-contain"
            style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>

        <div className="mt-14 flex items-center gap-8">
          <div className="relative w-[140px] md:w-[180px] h-[90px] md:h-[110px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={sec}
                initial={{ y: 60, opacity: 0, rotateX: -40 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -60, opacity: 0, rotateX: 40 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 flex items-baseline justify-center gap-1"
              >
                <span className="syne text-[72px] md:text-[96px] leading-none font-black tracking-tighter">0{sec}</span>
                <span className="mono text-[12px] opacity-40 -mb-6">SEC</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 border-t-white"
            />
            <span className="mono text-[9px] opacity-40 tracking-widest uppercase">Fast Load</span>
          </div>
        </div>

        <div className="mt-8 w-[260px] md:w-[380px] h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>

        <div className="mt-4 flex gap-4 mono text-[10px] tracking-[0.2em] uppercase">
          <span className="tabular-nums opacity-60">{dec.toFixed(1)}s / 3.0s</span>
          <span className="opacity-20">•</span>
          <span className="opacity-40">
            {dec > 2 && "Loading 3D Engine..."}
            {dec <= 2 && dec > 1 && "Building Exploding Box..."}
            {dec <= 1 && dec > 0.3 && "Almost Ready..."}
            {dec <= 0.3 && "Welcome →"}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mono text-[10px] uppercase leading-relaxed">
        <div className="opacity-30">Every packaging has a story — 48hr sample, zero damage. Pure 3D, exploding box, no images.</div>
        <div className="opacity-15 hidden md:block text-center">Forced Fast Load 3.2s Safety • Lazy 3D • No Block • Fixed</div>
        <div className="text-right opacity-30 hidden md:block">sales@lotusinternational.co.in<br />+91 9322021868</div>
      </div>
    </motion.div>
  );
}
