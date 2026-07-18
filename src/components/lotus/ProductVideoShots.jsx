import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const shotData = {
  "epe-foam": [
    { id: "material", title: "Material Close-Up", desc: "Closed-cell bubbles, 25kg/m³, EPE texture macro", duration: "0:12", image: "/my-portfolio/images/products/epe-foam/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Density & thickness tested, 0.5mm tolerance, ISO 9001", duration: "0:18", image: "/my-portfolio/images/products/epe-foam/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "18–35 kg/m³ • 0.5–100mm • Moisture proof, shockproof", duration: "0:15", image: "/my-portfolio/images/products/epe-foam/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Custom fitment with product inside, zero movement, safe delivery", duration: "0:20", image: "/my-portfolio/images/products/epe-foam/hero.jpg" },
  ],
  "ep-foam": [
    { id: "material", title: "Material Close-Up", desc: "Expanded polystyrene, high density, custom moulded texture", duration: "0:10", image: "/my-portfolio/images/products/ep-foam/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Caliper measurement, ±0.5mm tolerance, cavity precision", duration: "0:16", image: "/my-portfolio/images/products/ep-foam/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "15–35 kg/m³ • Moulded • Custom cavity, drop test 1.2m", duration: "0:14", image: "/my-portfolio/images/products/ep-foam/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "EP foam with fragile device inside, shockproof 100%", duration: "0:18", image: "/my-portfolio/images/products/ep-foam/hero.jpg" },
  ],
  "cross-linked": [
    { id: "material", title: "Material Close-Up", desc: "Black EVA, fine cell, high resilience, premium texture", duration: "0:11", image: "/my-portfolio/images/products/cross-linked/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Resilience & density tested, premium quality control", duration: "0:17", image: "/my-portfolio/images/products/cross-linked/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "33–200 kg/m³ • Water resistant • Fine finish", duration: "0:13", image: "/my-portfolio/images/products/cross-linked/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Luxury watch in black EVA cavity, premium packaging", duration: "0:19", image: "/my-portfolio/images/products/cross-linked/hero.jpg" },
  ],
  "air-bubble": [
    { id: "material", title: "Material Close-Up", desc: "10–25mm bubbles, LDPE transparent, air barrier", duration: "0:09", image: "/my-portfolio/images/products/air-bubble/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Bubble strength & sealing tested, high strength", duration: "0:14", image: "/my-portfolio/images/products/air-bubble/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "LDPE • Transparent • Reusable • Moisture proof", duration: "0:12", image: "/my-portfolio/images/products/air-bubble/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Bubble pouch protecting glassware, lightweight safety", duration: "0:16", image: "/my-portfolio/images/products/air-bubble/hero.jpg" },
  ],
  "custom-fitments": [
    { id: "material", title: "Material Close-Up", desc: "Custom foam texture, any color, any density", duration: "0:10", image: "/my-portfolio/images/products/custom-fitments/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "CAD design → sample → approval → bulk, 48hr", duration: "0:20", image: "/my-portfolio/images/products/custom-fitments/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "100% made to order • Any shape • Any qty", duration: "0:15", image: "/my-portfolio/images/products/custom-fitments/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Electronic device perfectly fitting in custom cavity", duration: "0:22", image: "/my-portfolio/images/products/custom-fitments/hero.jpg" },
  ],
  "honeycomb": [
    { id: "material", title: "Material Close-Up", desc: "Hexagonal structure, kraft brown, eco strong", duration: "0:11", image: "/my-portfolio/images/products/honeycomb/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Hex strength tested, bears force from all sides", duration: "0:15", image: "/my-portfolio/images/products/honeycomb/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "Eco • Biodegradable • High strength • Lightweight", duration: "0:13", image: "/my-portfolio/images/products/honeycomb/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Honeycomb panels for export packaging, sustainable", duration: "0:18", image: "/my-portfolio/images/products/honeycomb/hero.jpg" },
  ],
};

export default function ProductVideoShots({ productId = "epe-foam" }) {
  const shots = shotData[productId] || shotData["epe-foam"];
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const currentShot = shots[current];

  // Auto-play progress like video
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          // Next shot
          setCurrent((c) => (c + 1) % shots.length);
          return 0;
        }
        return p + 0.8;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, shots.length, current]);

  // Reset progress on shot change
  useEffect(() => {
    setProgress(0);
  }, [current]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setMouse({ x, y });
  };

  return (
    <div className="w-full bg-[#0A0A0A] rounded-[16px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      {/* Main Viewer - 3D Look */}
      <div
        className="relative aspect-[16/10] bg-[#1A1A1A] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      >
        {/* 3D Tilt Container */}
        <motion.div
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: mouse.x, rotateX: mouse.y }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentShot.id}
              initial={{ scale: 1.1, opacity: 0, rotateY: 5 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0, rotateY: -5 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <img
                src={currentShot.image}
                alt={currentShot.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x500/111111/FFFFFF?text=${currentShot.title}`;
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              
              {/* Product Name Overlay - Always visible on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mono text-[10px] tracking-widest uppercase text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" /> {productId.toUpperCase()} • {currentShot.id.toUpperCase()}
                    </div>
                    <h3 className="mt-3 text-2xl md:text-3xl font-black tracking-tighter text-white" style={{ fontFamily: 'Syne' }}>
                      {currentShot.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70 max-w-[400px]">{currentShot.desc}</p>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-white text-black grid place-items-center">
                    <span className="text-xs font-bold">{String(current + 1).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>

              {/* Top - Video UI */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-[#FF3B30] text-white mono text-[10px] font-bold tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> REC • 3D VIEW
                  </div>
                  <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white mono text-[10px]">{currentShot.duration}</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white mono text-[10px]">{productId.toUpperCase()}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Play/Pause centered */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 grid place-items-center hover:bg-white/20 transition group"
        >
          <div className="w-0 h-0 border-l-[12px] md:border-l-[16px] border-l-white border-t-[8px] md:border-t-[10px] border-t-transparent border-b-[8px] md:border-b-[10px] border-b-transparent ml-1 group-hover:scale-110 transition" style={{ display: isPlaying ? 'none' : 'block' }} />
          <div className="hidden group-hover:flex gap-1" style={{ display: isPlaying ? 'flex' : 'none' }}>
            <div className="w-1 h-4 md:w-1.5 md:h-6 bg-white rounded-full" />
            <div className="w-1 h-4 md:w-1.5 md:h-6 bg-white rounded-full" />
          </div>
          {!isPlaying && <span className="absolute -bottom-8 mono text-[10px] tracking-widest uppercase text-white/60">Play</span>}
        </button>

        {/* Progress bar - Video style */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
          <motion.div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Shots Buttons - Video Chapters */}
      <div className="bg-[#111113] p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="mono text-[10px] tracking-[0.2em] uppercase opacity-40">Video Shots — Click to play like video • 3D view simulation</div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#00FF94] animate-pulse" : "bg-white/20"}`} />
            <span className="mono text-[10px] uppercase opacity-60">{isPlaying ? "Auto Play" : "Paused"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shots.map((shot, idx) => (
            <button
              key={shot.id}
              onClick={() => { setCurrent(idx); setIsPlaying(true); }}
              className={`group relative rounded-[12px] overflow-hidden border text-left transition-all duration-300 ${
                current === idx ? "border-white bg-white/[0.08] scale-[1.02]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={shot.image} alt={shot.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition">
                  <div className="w-8 h-8 rounded-full bg-white text-black grid place-items-center text-[10px]">▶</div>
                </div>
                <div className="absolute bottom-1 left-1 right-1 flex justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-black/70 text-white mono text-[8px]">{shot.duration}</span>
                  {current === idx && <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse self-center" />}
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-xs leading-tight text-white">{shot.title}</div>
                  <div className="mono text-[9px] opacity-40">{String(idx + 1).padStart(2, "0")}</div>
                </div>
                <div className="mono text-[9px] opacity-50 mt-1 line-clamp-2 leading-tight">{shot.desc}</div>
              </div>
              {current === idx && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white">
                  <motion.div className="h-full bg-[#00FF94]" style={{ width: `${progress}%` }} />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 mono text-[9px] uppercase">
          <span className="px-2.5 py-1 rounded-full bg-white text-black font-bold">3D Simulated Video • Click Shot to Play</span>
          <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white/60">Material Close-Up</span>
          <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white/60">Quality Check</span>
          <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white/60">Details + Hero</span>
        </div>
      </div>
    </div>
  );
}
