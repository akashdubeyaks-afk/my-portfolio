import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const productImages = {
  "epe-foam": [
    { id: "material", title: "Material Close-Up", desc: "Closed-cell bubbles, EPE texture, 25kg/m³, no thermocol", image: "/my-portfolio/images/products/epe-foam/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Density & thickness tested, 0.5mm tolerance, ISO 9001", image: "/my-portfolio/images/products/epe-foam/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "18–35 kg/m³ • 0.5–100mm • Moisture proof, shockproof", image: "/my-portfolio/images/products/epe-foam/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Custom fitment with product inside, zero movement", image: "/my-portfolio/images/products/epe-foam/hero.jpg" },
  ],
  "ep-foam": [
    { id: "material", title: "Material Close-Up", desc: "EP foam custom molded, white EP, not thermocol", image: "/my-portfolio/images/products/ep-foam/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Caliper measurement, ±0.5mm tolerance, cavity precision", image: "/my-portfolio/images/products/ep-foam/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "15–35 kg/m³ • Moulded • Custom cavity, drop test 1.2m", image: "/my-portfolio/images/products/ep-foam/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "EP foam with fragile device inside, shockproof 100%", image: "/my-portfolio/images/products/ep-foam/hero.jpg" },
  ],
  "cross-linked": [
    { id: "material", title: "Material Close-Up", desc: "Black EVA, fine cell, high resilience, premium", image: "/my-portfolio/images/products/cross-linked/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Resilience & density tested, premium quality control", image: "/my-portfolio/images/products/cross-linked/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "33–200 kg/m³ • Water resistant • Fine finish", image: "/my-portfolio/images/products/cross-linked/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Luxury watch in black EVA cavity, premium packaging", image: "/my-portfolio/images/products/cross-linked/hero.jpg" },
  ],
  "air-bubble": [
    { id: "material", title: "Material Close-Up", desc: "10–25mm bubbles, LDPE transparent, air barrier", image: "/my-portfolio/images/products/air-bubble/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Bubble strength & sealing tested, high strength", image: "/my-portfolio/images/products/air-bubble/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "LDPE • Transparent • Reusable • Moisture proof", image: "/my-portfolio/images/products/air-bubble/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Bubble pouch protecting glassware, lightweight safety", image: "/my-portfolio/images/products/air-bubble/hero.jpg" },
  ],
  "custom-fitments": [
    { id: "material", title: "Material Close-Up", desc: "Custom foam texture, any color, any density, EP only", image: "/my-portfolio/images/products/custom-fitments/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "CAD design → sample → approval → bulk, 48hr", image: "/my-portfolio/images/products/custom-fitments/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "100% made to order • Any shape • Any qty", image: "/my-portfolio/images/products/custom-fitments/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Electronic device perfectly fitting in custom cavity", image: "/my-portfolio/images/products/custom-fitments/hero.jpg" },
  ],
  "honeycomb": [
    { id: "material", title: "Material Close-Up", desc: "Hexagonal structure, kraft brown, eco strong", image: "/my-portfolio/images/products/honeycomb/material.jpg" },
    { id: "quality", title: "Quality Check", desc: "Hex strength tested, bears force from all sides", image: "/my-portfolio/images/products/honeycomb/quality.jpg" },
    { id: "details", title: "Technical Details", desc: "Eco • Biodegradable • High strength • Lightweight", image: "/my-portfolio/images/products/honeycomb/details.jpg" },
    { id: "hero", title: "Hero Shot", desc: "Honeycomb panels for export packaging, sustainable", image: "/my-portfolio/images/products/honeycomb/hero.jpg" },
  ],
};

export default function ProductImageGallery({ productId = "epe-foam" }) {
  const images = productImages[productId] || productImages["epe-foam"];
  const [current, setCurrent] = useState(0);
  const currentImage = images[current];

  return (
    <div className="w-full bg-white rounded-[16px] overflow-hidden border border-black/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
      {/* Main Image - Premium with Name Overlay */}
      <div className="relative aspect-[4/3] bg-[#F6F4EF] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentImage.image}
              alt={currentImage.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/800x600/FAF9F6/0A0A0A?text=${currentImage.title}`;
              }}
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            
            {/* Product Name Overlay - Always on Image (as requested) */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/5 mono text-[10px] tracking-[0.15em] uppercase font-bold text-black">
                {productId.toUpperCase()} • {currentImage.id.toUpperCase()} • EP FOAM ONLY • NO THERMOCOL
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-black tracking-tighter text-white" style={{ fontFamily: 'Syne' }}>
                {currentImage.title}
              </h3>
              <p className="mt-1 text-sm text-white/70 max-w-[420px] leading-relaxed">{currentImage.desc}</p>
              <div className="mt-3 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-[#7E22CE] text-white mono text-[10px] font-bold">EP Foam Only</span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white mono text-[10px]">Custom Shape</span>
              </div>
            </div>

            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white mono text-[10px]">Premium Image • {current + 1}/4</span>
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur border border-black/5 mono text-[10px] font-bold">{productId.toUpperCase()}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-black/5 grid place-items-center hover:bg-white transition opacity-0 group-hover:opacity-100"
        >
          ←
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-black/5 grid place-items-center hover:bg-white transition opacity-0 group-hover:opacity-100"
        >
          →
        </button>
      </div>

      {/* Thumbnails - 3-4 Images per Product */}
      <div className="bg-[#FAF9F6] p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="mono text-[10px] tracking-[0.2em] uppercase opacity-50">Product Gallery — 4 Premium Shots • Click to View • Name on Image</span>
          <span className="mono text-[10px] uppercase opacity-30 hidden md:block">EP Foam Only • No Thermocol • Custom Generated</span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrent(idx)}
              className={`group relative rounded-[10px] overflow-hidden border-2 text-left transition-all ${
                current === idx ? "border-black scale-[1.02] shadow-[0_8px_20px_rgba(0,0,0,0.12)]" : "border-black/5 hover:border-black/20 hover:scale-[1.01]"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#F6F4EF]">
                <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <div className="text-[10px] font-bold leading-tight text-white mono uppercase">{img.title}</div>
                <div className="text-[8px] opacity-70 text-white mono mt-0.5">{img.id}</div>
              </div>
              <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black text-white grid place-items-center mono text-[9px] font-bold">{idx + 1}</div>
              {current === idx && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 mono text-[9px] uppercase">
          <span className="px-3 py-1 rounded-full bg-black text-white font-bold">EP Foam Only • No Thermocol</span>
          <span className="px-3 py-1 rounded-full bg-white border border-black/10">Material Close-Up</span>
          <span className="px-3 py-1 rounded-full bg-white border border-black/10">Quality Check</span>
          <span className="px-3 py-1 rounded-full bg-white border border-black/10">Technical Details</span>
          <span className="px-3 py-1 rounded-full bg-white border border-black/10">Hero Shot</span>
        </div>
      </div>
    </div>
  );
}
