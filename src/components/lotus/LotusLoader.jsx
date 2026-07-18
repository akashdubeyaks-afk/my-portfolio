import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LotusLoader({ onDone }) {
  const [seconds, setSeconds] = useState(3.0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const start = performance.now();
    const DURATION = 3000; // Exactly 3 seconds

    let rafId;
    const tick = (now) => {
      const elapsed = now - start;
      const remaining = Math.max(0, 3 - (elapsed / 1000));
      
      setSeconds(remaining);

      if (elapsed < DURATION) {
        rafId = requestAnimationFrame(tick);
      } else {
        if (!doneRef.current) {
          doneRef.current = true;
          setSeconds(0);
          setTimeout(() => onDoneRef.current?.(), 300);
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const wholeSec = Math.ceil(seconds);
  const isLast = seconds <= 0.6;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] text-[#FAF9F6] px-6 md:px-10 py-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Top bar */}
      <div className="flex justify-between mono text-[10px] tracking-widest uppercase opacity-40">
        <span>LOTUS INTERNATIONAL — LOADING</span>
        <span className="hidden md:block">BIWANDI, IN • EST. 2019 • ISO 9001</span>
        <span>FAST LOAD • 3.0S</span>
      </div>

      {/* Center - Logo + Seconds */}
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Logo - Transparent, pure */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="w-[300px] md:w-[460px]"
        >
          <img
            src="/my-portfolio/lotus-logo.png"
            alt="Lotus International"
            className="w-full h-auto object-contain"
            style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }}
            onError={(e) => {
              e.target.style.display = 'none';
              const fb = document.getElementById('lotus-fb');
              if (fb) fb.style.display = 'block';
            }}
          />
          <div id="lotus-fb" style={{ display: 'none' }} className="text-center">
            <div className="syne text-4xl font-black tracking-tighter">LOTUS INTERNATIONAL</div>
            <div className="mono text-[10px] opacity-60 mt-2 tracking-[0.2em] uppercase">every packaging has a story</div>
          </div>
        </motion.div>

        {/* Seconds Animation - Instead of Percentage */}
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <div className="flex items-baseline gap-3">
            <div className="relative w-[180px] md:w-[240px] h-[100px] md:h-[140px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={wholeSec}
                  initial={{ y: 80, opacity: 0, rotateX: -30 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -80, opacity: 0, rotateX: 30 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="absolute inset-0 flex items-baseline justify-center gap-2"
                >
                  <span className="syne text-[80px] md:text-[110px] leading-none font-black tracking-tighter tabular-nums">
                    0{wholeSec}
                  </span>
                  <span className="mono text-[14px] md:text-[18px] opacity-40 tracking-[0.2em] -mb-8">SEC</span>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.div
              animate={{ scale: isLast ? 1.2 : 1, opacity: isLast ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 grid place-items-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 md:w-8 md:h-8 border border-white/40 border-t-white rounded-full"
              />
            </motion.div>
          </div>

          {/* Progress line - 3 sec */}
          <div className="mt-8 w-[240px] md:w-[400px] h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </div>

          {/* Seconds decimal + status */}
          <div className="mt-4 flex items-center gap-6 mono text-[10px] tracking-[0.2em] uppercase">
            <motion.span
              className="tabular-nums"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {seconds.toFixed(1)}s / 3.0s
            </motion.span>
            <span className="opacity-20">•</span>
            <span className="opacity-60">
              {seconds > 2 && "Initializing 3D Foam..."}
              {seconds <= 2 && seconds > 1 && "Building Custom Cavities..."}
              {seconds <= 1 && seconds > 0.2 && "Almost Ready..."}
              {seconds <= 0.2 && "Welcome to Lotus →"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="grid md:grid-cols-3 gap-6 mono text-[10px] leading-relaxed uppercase">
        <div className="opacity-30">Every packaging has a story — custom foam cavities, 48hr sample, zero damage delivery. Pure 3D, no images.</div>
        <div className="opacity-15 hidden md:block text-center">Fast Load • 3 Seconds • No Percentage • Seconds Animation • Premium</div>
        <div className="text-right opacity-30 hidden md:block">sales@lotusinternational.co.in<br />+91 9322021868 • Bhiwandi, MH</div>
        <div className="opacity-30 md:hidden text-right">sales@lotusinternational.co.in</div>
      </div>
    </motion.div>
  );
}
