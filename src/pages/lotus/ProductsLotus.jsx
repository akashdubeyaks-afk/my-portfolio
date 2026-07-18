import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Foam3DViewer from "../../components/lotus/Foam3DViewer";

const products = [
  { id: "epe-foam", num: "01", name: "EPE Foam", type: "Sheet & Fitments", spec: "18–35 kg/m³ • 0.5–100mm", desc: "Non-cross linked closed-cell. Numerous independent bubbles. Moisture, shockproof.", price: "₹2.3/pc", moq: "100 pcs", color: "#FEFEFE" },
  { id: "ep-foam", num: "02", name: "EP Foam", type: "Custom Moulded", spec: "15–35 kg/m³ • Moulded • ±0.5mm", desc: "Expanded polystyrene custom moulded as per product shape. Precision cavity.", price: "Custom Quote", moq: "50 pcs", color: "#EDE9E3" },
  { id: "cross-linked", num: "03", name: "Cross Linked / EVA", type: "Premium Grade", spec: "33–200 kg/m³ • High Resilience", desc: "Superior quality for premium products where look and feel matters.", price: "₹150/kg", moq: "20 kg", color: "#1A1A1A" },
  { id: "air-bubble", num: "04", name: "Air Bubble Bags", type: "Pouches & Rolls", spec: "10–25mm Bubble • LDPE", desc: "High strength air barrier gives cushioning and surface protection.", price: "₹1.5/mtr", moq: "100 mtr", color: "#E3F2FD" },
  { id: "custom-fitments", num: "05", name: "Custom Fitments", type: "Made To Order", spec: "CAD • Sample First • Any Qty", desc: "100% made to order. Send product photo + LxWxH + weight.", price: "As Per Design", moq: "100 pcs", color: "#F3E5F5" },
  { id: "honeycomb", num: "06", name: "Honeycomb Paper", type: "Sustainable", spec: "Hexagonal • Eco • Biodegradable", desc: "Bees hexagonal honeycomb - strongest structure, bears force from all sides.", price: "₹80/kg", moq: "50 kg", color: "#FFF8E1" },
];

export default function ProductsLotus() {
  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px]">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex justify-between mono text-[10px] uppercase tracking-widest">
          <span className="opacity-40">Index — 02 / Products — 06 Solutions • Pure 3D • No Images</span><span className="hidden md:block opacity-40">Each product has separate 3D page • Click to view</span>
        </div>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <h1 className="syne text-[13vw] md:text-[7vw] lg:text-[6vw] leading-[0.8] font-bold tracking-tighter">PRODUCTS<br /><span className="serif italic font-light">& SOLUTIONS</span></h1>
          <div className="lg:pt-4">
            <p className="text-[18px] leading-[1.5] max-w-[480px]">Rich experienced company in Packaging, Foam, Paper, EP Foam & Air Bubble Bag. Every product visual is 100% 3D generated, no images used. Box with all products together, click to explode into separate parts.</p>
            <div className="mt-6 flex gap-2 mono text-[10px] uppercase">
              <span className="px-3 py-1.5 rounded-full bg-black text-white">6 Categories</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">Pure 3D</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">Separate Pages</span>
            </div>
          </div>
        </div>

        {/* Exploding Box Demo */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-4">
            <h3 className="syne text-xl font-bold">Interactive Box Demo — All Products Together</h3>
            <span className="mono text-[10px] uppercase opacity-40">Click box to divide into parts →</span>
          </div>
          <div className="rounded-[16px] overflow-hidden border border-black/10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
              <div className="h-[560px]">
                <Foam3DViewer variant="ep-foam" height="560px" />
              </div>
              <div className="p-6 bg-white border-l border-black/10">
                <div className="mono text-[10px] uppercase opacity-40 mb-4">Box Contains — 6 Products Together</div>
                <div className="space-y-3">
                  {products.map((p) => (
                    <Link key={p.id} to={`/products/${p.id}`} className="flex items-center gap-3 p-3 rounded-[10px] border border-black/5 hover:bg-black/[0.02] hover:border-black/10 transition group">
                      <div className="w-10 h-10 rounded-[6px] border border-black/10" style={{ background: p.color }} />
                      <div className="flex-1"><div className="font-bold text-sm">{p.name}</div><div className="mono text-[10px] opacity-50">{p.type}</div></div>
                      <span className="w-6 h-6 rounded-full border border-black/10 grid place-items-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition">↗</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-[12px] bg-[#0A0A0A] text-white">
                  <div className="mono text-[10px] uppercase opacity-40">How it works</div>
                  <div className="mt-2 text-sm leading-relaxed">Box me 6 products ek sath band hai. Click → Top lid upar, 6 foam blocks alag directions me explode → Har ek ka apna 3D page hai alag se.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separate Pages List */}
        <div className="mt-16 border-y border-black/10 divide-y divide-black/10">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link to={`/products/${p.id}`} className="group grid lg:grid-cols-[80px_80px_1.3fr_0.9fr_120px_40px] gap-4 md:gap-6 py-6 items-center hover:bg-black/[0.02] -mx-6 md:-mx-10 px-6 md:px-10 transition">
                <div className="mono text-[11px] opacity-30">({p.num})</div>
                <div className="w-14 h-14 rounded-[8px] border border-black/10 flex items-center justify-center" style={{ background: p.color }}>
                  <div className="w-6 h-6 rounded-[2px] bg-black/10" />
                </div>
                <div><div className="mono text-[10px] uppercase opacity-40">{p.type}</div><div className="syne text-[20px] md:text-[24px] font-bold tracking-tight leading-none mt-1">{p.name}</div><div className="mono text-[10px] mt-1 opacity-50">{p.spec}</div></div>
                <div className="text-[12px] leading-[1.4] opacity-60 hidden lg:block">{p.desc}</div>
                <div className="hidden md:block"><div className="mono text-[10px] uppercase opacity-40">From</div><div className="font-bold text-sm mt-1">{p.price}</div><div className="mono text-[9px] opacity-40 mt-1">MOQ: {p.moq}</div></div>
                <div className="w-8 h-8 rounded-full border border-black/10 grid place-items-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition">↗</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
