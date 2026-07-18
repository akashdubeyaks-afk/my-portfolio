import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const products = [
  { id: "epe-foam", num: "01", name: "EPE Foam", type: "Sheet & Fitments", spec: "18–35 kg/m³ • 0.5–100mm • White/Pink/Black", desc: "Non-cross linked closed-cell. Numerous independent bubbles. Moisture, shockproof, sound, thermal, recyclable.", detail: "Polyethylene foamed cotton, eco-friendly packaging. Ideal substitute for thermocol and PU. Low maintenance. Used for printers, computers, engineering, furniture, medical, artillery box.", price: "₹2.3/pc", moq: "100 pcs" },
  { id: "ep-foam", num: "02", name: "EP Foam", type: "Custom Moulded", spec: "15–35 kg/m³ • Moulded • ±0.5mm Tolerance", detail: "Expanded polystyrene custom moulded as per product shape. Precision cavity ensures zero movement. Low maintenance.", desc: "High strength, custom shapes, precision fit for fragile electronics and machinery.", price: "Custom Quote", moq: "50 pcs" },
  { id: "cross-linked", num: "03", name: "Cross Linked / EVA", type: "Premium Grade", spec: "33–200 kg/m³ • High Resilience • Fine Cell", detail: "Superior quality for premium products where look and feel matters. Fine cell structure, water resistant, long life.", desc: "High-end packaging, medical devices, automotive parts, handicraft. Fine finish.", price: "₹150/kg", moq: "20 kg" },
  { id: "air-bubble", num: "04", name: "Air Bubble Bags", type: "Pouches & Rolls", spec: "10–25mm Bubble • LDPE • Transparent", detail: "High strength air barrier gives cushioning and surface protection. Lightweight, reusable, moisture proof.", desc: "E-commerce, glassware, cosmetics, fragile items. Scratch protection.", price: "₹1.5/mtr", moq: "100 mtr" },
  { id: "custom-fitments", num: "05", name: "Custom Fitments", type: "Made To Order", spec: "CAD • Sample First • Any Qty • Any Shape", detail: "100% made to order. Send product photo + LxWxH + weight. We design cavity, no movement, drop test 1.2m.", desc: "Any product, any size, any industry. 48hr sample, 3-5 days bulk.", price: "As Per Design", moq: "100 pcs" },
  { id: "honeycomb", num: "06", name: "Honeycomb Paper", type: "Sustainable", spec: "Hexagonal • Eco • Biodegradable", detail: "Bees hexagonal honeycomb - strongest structure, bears force from all sides. More powerful than round/square.", desc: "Eco alternative to thermocol & wood. Export packaging, furniture, doors.", price: "₹80/kg", moq: "50 kg" },
];

export default function ProductsLotus() {
  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px]">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex justify-between mono text-[10px] uppercase tracking-widest">
          <span className="opacity-40">Index — 02 / Products — 06 Solutions</span><span className="hidden md:block opacity-40">All custom • No standard sizes • Made to order</span>
        </div>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <h1 className="syne text-[13vw] md:text-[7vw] lg:text-[6vw] leading-[0.8] font-bold tracking-tighter">PRODUCTS<br /><span className="serif italic font-light">& SOLUTIONS</span></h1>
          <div className="lg:pt-4">
            <p className="text-[18px] leading-[1.5] max-w-[480px]">Rich experienced company in Packaging, Foam, Paper, EP Foam & Air Bubble Bag. Superior quality at competitive prices. Every product is made to order.</p>
            <div className="mt-6 flex gap-2 mono text-[10px] uppercase">
              <span className="px-3 py-1.5 rounded-full bg-black text-white">6 Categories</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">Custom Shapes</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">48hr Sample</span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-y border-black/10 divide-y divide-black/10">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/products/${p.id}`} className="group grid lg:grid-cols-[80px_1.3fr_0.9fr_0.6fr_120px_40px] gap-4 md:gap-6 py-8 md:py-10 items-start hover:bg-black/[0.02] -mx-6 md:-mx-10 px-6 md:px-10 transition">
                <div className="mono text-[11px] opacity-30">({p.num})</div>
                <div>
                  <div className="mono text-[10px] uppercase opacity-40">{p.type}</div>
                  <div className="syne text-[24px] md:text-[32px] font-bold tracking-tight leading-none mt-1 group-hover:tracking-wide transition-all duration-500">{p.name}</div>
                  <div className="mono text-[10px] mt-2 opacity-50">{p.spec}</div>
                </div>
                <div className="text-[13px] leading-[1.5] opacity-70 hidden lg:block">{p.detail}</div>
                <div className="hidden md:block">
                  <div className="mono text-[10px] uppercase opacity-40">From</div>
                  <div className="font-bold mt-1">{p.price}</div>
                  <div className="mono text-[9px] opacity-40 mt-1">MOQ: {p.moq}</div>
                </div>
                <div className="hidden lg:flex flex-col gap-1">
                  <span className="text-[11px] leading-tight">{p.desc}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-black/10 grid place-items-center group-hover:bg-black group-hover:text-white transition">↗</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="py-12 flex justify-between mono text-[10px] uppercase opacity-40">
          <span>Need custom spec? Send product + dimensions — CAD in 4 hours</span><span className="hidden md:block">sales@lotusinternational.co.in • +91 9322021868</span>
        </div>
      </div>
    </div>
  );
}
