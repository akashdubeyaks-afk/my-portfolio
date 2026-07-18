import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const products = [
  { id: "epe-foam", num: "01", name: "EPE Foam", type: "Sheet & Fitments", spec: "18–35 kg/m³ • 0.5–100mm", desc: "Non-cross linked closed-cell. Numerous independent bubbles. Moisture, shockproof.", price: "₹2.3/pc", moq: "100 pcs", color: "#FEFEFE", accent: "#7E22CE" },
  { id: "ep-foam", num: "02", name: "EP Foam", type: "Custom Moulded", spec: "15–35 kg/m³ • Moulded • ±0.5mm", desc: "Expanded polystyrene custom moulded as per product shape. Precision cavity.", price: "Custom Quote", moq: "50 pcs", color: "#EDE9E3", accent: "#0A0A0A" },
  { id: "cross-linked", num: "03", name: "Cross Linked / EVA", type: "Premium Grade", spec: "33–200 kg/m³ • High Resilience", desc: "Superior quality for premium products where look and feel matters.", price: "₹150/kg", moq: "20 kg", color: "#1A1A1A", accent: "#FF6F00" },
  { id: "air-bubble", num: "04", name: "Air Bubble Bags", type: "Pouches & Rolls", spec: "10–25mm Bubble • LDPE", desc: "High strength air barrier gives cushioning and surface protection.", price: "₹1.5/mtr", moq: "100 mtr", color: "#E3F2FD", accent: "#0277BD" },
  { id: "custom-fitments", num: "05", name: "Custom Fitments", type: "Made To Order", spec: "CAD • Sample First • Any Qty", desc: "100% made to order. Send product photo + LxWxH + weight.", price: "As Per Design", moq: "100 pcs", color: "#F3E5F5", accent: "#7E22CE" },
  { id: "honeycomb", num: "06", name: "Honeycomb Paper", type: "Sustainable", spec: "Hexagonal • Eco • Biodegradable", desc: "Bees hexagonal honeycomb - strongest structure, bears force from all sides.", price: "₹80/kg", moq: "50 kg", color: "#FFF8E1", accent: "#795548" },
];

function ProductCard({ p, i }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: i * 0.06, duration: 0.5 }}
      className="group"
    >
      <Link to={`/products/${p.id}`} className="block rounded-[16px] bg-white border border-black/[0.06] overflow-hidden hover:border-black/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 h-full flex flex-col">
        {/* Visual - Pure CSS, No Image, No 3D - Fast */}
        <div className="aspect-[4/3] relative overflow-hidden" style={{ background: p.color }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[68%] h-[56%] relative">
              <div className="absolute inset-0 bg-white/80 border border-black/10 rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-[44%] bg-[#0A0A0A] rounded-[4px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]" />
              <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-black/10 rounded-full" />
            </div>
          </div>
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur mono text-[9px] font-bold tracking-widest uppercase border border-black/5">{p.type}</div>
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: p.accent, boxShadow: `0 0 8px ${p.accent}60` }} />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <span className="px-2.5 py-1 rounded-full bg-black text-white mono text-[9px]">{p.price}</span>
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-black/5 mono text-[9px]">MOQ {p.moq}</span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <div><div className="mono text-[10px] opacity-40">({p.num})</div><div className="syne text-[18px] font-bold leading-none mt-1 group-hover:tracking-wide transition-all">{p.name}</div></div>
            <div className="w-8 h-8 rounded-full border border-black/10 grid place-items-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition-all duration-300">↗</div>
          </div>
          <div className="mono text-[10px] opacity-50 mt-2">{p.spec}</div>
          <p className="text-[12px] leading-[1.5] opacity-60 mt-3 line-clamp-2 flex-1">{p.desc}</p>
          <div className="mt-4 h-px bg-black/5 group-hover:bg-black/10 transition" />
          <div className="mt-3 flex justify-between items-center mono text-[10px] uppercase">
            <span className="opacity-40">Click → Separate 3D Page</span><span className="opacity-60 group-hover:opacity-100 transition">View →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsLotus() {
  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px]">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex justify-between mono text-[10px] uppercase tracking-widest">
          <span className="opacity-40">Index — 02 / Products — 06 Solutions • Fast Load • No 3D Block • Pure CSS</span>
          <span className="hidden md:block opacity-40">Each product → Separate fast page</span>
        </div>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <h1 className="syne text-[13vw] md:text-[7vw] lg:text-[6vw] leading-[0.8] font-bold tracking-tighter">PRODUCTS<br /><span className="serif italic font-light">& SOLUTIONS</span></h1>
          <div className="lg:pt-4">
            <p className="text-[18px] leading-[1.5] max-w-[480px]">Rich experienced company in Packaging, Foam, Paper, EP Foam & Air Bubble Bag. Every product card is pure CSS — no images, no 3D, instant load. Click → separate fast page with 3D viewer.</p>
            <div className="mt-6 flex gap-2 mono text-[10px] uppercase">
              <span className="px-3 py-1.5 rounded-full bg-black text-white">6 Categories • Fast</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">Pure CSS Cards</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">Separate Pages</span>
            </div>
          </div>
        </div>

        {/* Interactive Info - No 3D, Pure CSS */}
        <div className="mt-16 rounded-[16px] border border-black/10 overflow-hidden bg-white">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
            <div className="p-8 md:p-10">
              <div className="mono text-[10px] uppercase tracking-widest opacity-40 mb-4">Interactive Demo — How It Works</div>
              <h3 className="syne text-3xl md:text-4xl font-bold leading-[0.9] tracking-tighter">BOX ME SAB<br />EK SATH.<br /><span className="serif italic font-light">CLICK PE ALAG.</span></h3>
              <div className="mt-8 space-y-4">
                {[
                  ["01", "Together", "Sabhi 6 products ek hi outer box me band — Lotus purple lid ke sath."],
                  ["02", "Click → Divide", "Har product ka card click karo → uska alag 3D page open, foam cavity + product inside."],
                  ["03", "No Images", "Cards pure CSS — foam block + cavity + product — no Unsplash, instant load."],
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-4 border-t border-black/5 pt-4">
                    <span className="mono text-[11px] opacity-30">({n})</span>
                    <div><div className="font-bold text-sm">{t}</div><div className="text-xs opacity-60 mt-1 leading-relaxed">{d}</div></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-[12px] bg-black text-white mono text-[10px]">
                <span className="opacity-40">FAST LOAD TIP:</span> Cards pure CSS — 0KB images, 0KB 3D. 3D only on separate product pages, lazy loaded.
              </div>
            </div>
            <div className="bg-[#F6F4EF] p-6 md:p-8 border-l border-black/10">
              <div className="mono text-[10px] uppercase opacity-40 mb-4">Box Contains — 6 Products Together — Pure CSS Visual</div>
              <div className="relative aspect-[4/3] bg-white rounded-[12px] border border-black/10 overflow-hidden p-6 flex items-center justify-center">
                <div className="relative w-[72%] h-[64%]">
                  <div className="absolute inset-0 bg-[#EDE9E3] border border-black/10 rounded-[10px] shadow-[0_16px_40px_rgba(0,0,0,0.1)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-3 gap-2 w-[80%]">
                    {products.map((p) => (
                      <div key={p.id} className="aspect-square rounded-[4px] border border-black/10" style={{ background: p.color }} title={p.name} />
                    ))}
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7E22CE] text-white px-3 py-1 rounded-full mono text-[9px] font-bold">LOTUS BOX • 6-in-1</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {products.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 text-[10px] mono"><div className="w-2 h-2 rounded-full" style={{ background: p.color, border: p.color === "#FEFEFE" ? "1px solid #ddd" : "none" }} />{p.name.split(" ")[0]}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid - Fast, Pure CSS, Separate Pages */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} i={i} />
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 pt-8 flex justify-between mono text-[10px] uppercase opacity-40">
          <span>6 Products • Each has separate fast page — Click any card → /products/:id</span><span className="hidden md:block">Fast Load • Pure CSS Cards • 3D Only on Detail Pages</span>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
