import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const products = [
  { id: "epe-foam", num: "01", name: "EPE Foam", type: "Sheet & Fitments", spec: "18–35 kg/m³ • 0.5–100mm • White/Pink/Black", desc: "Non-cross linked closed-cell. Numerous independent bubbles. Moisture, shockproof, sound, thermal, recyclable.", detail: "Polyethylene foamed cotton, eco-friendly packaging. Ideal substitute for thermocol and PU. Low maintenance. Used for printers, computers, engineering, furniture, medical, artillery box.", price: "₹2.3/pc", moq: "100 pcs", img: "/my-portfolio/images/epe-foam.jpg" },
  { id: "ep-foam", num: "02", name: "EP Foam", type: "Custom Moulded", spec: "15–35 kg/m³ • Moulded • ±0.5mm Tolerance", detail: "Expanded polystyrene custom moulded as per product shape. Precision cavity ensures zero movement. Low maintenance.", desc: "High strength, custom shapes, precision fit for fragile electronics and machinery.", price: "Custom Quote", moq: "50 pcs", img: "/my-portfolio/images/ep-foam.jpg" },
  { id: "cross-linked", num: "03", name: "Cross Linked / EVA", type: "Premium Grade", spec: "33–200 kg/m³ • High Resilience • Fine Cell", detail: "Superior quality for premium products where look and feel matters. Fine cell structure, water resistant, long life.", desc: "High-end packaging, medical devices, automotive parts, handicraft. Fine finish.", price: "₹150/kg", moq: "20 kg", img: "/my-portfolio/images/cross-linked-foam.jpg" },
  { id: "air-bubble", num: "04", name: "Air Bubble Bags", type: "Pouches & Rolls", spec: "10–25mm Bubble • LDPE • Transparent", detail: "High strength air barrier gives cushioning and surface protection. Lightweight, reusable, moisture proof.", desc: "E-commerce, glassware, cosmetics, fragile items. Scratch protection.", price: "₹1.5/mtr", moq: "100 mtr", img: "/my-portfolio/images/air-bubble.jpg" },
  { id: "custom-fitments", num: "05", name: "Custom Fitments", type: "Made To Order", spec: "CAD • Sample First • Any Qty • Any Shape", detail: "100% made to order. Send product photo + LxWxH + weight. We design cavity, no movement, drop test 1.2m.", desc: "Any product, any size, any industry. 48hr sample, 3-5 days bulk.", price: "As Per Design", moq: "100 pcs", img: "/my-portfolio/images/custom-fitment.jpg" },
  { id: "honeycomb", num: "06", name: "Honeycomb Paper", type: "Sustainable", spec: "Hexagonal • Eco • Biodegradable", detail: "Bees hexagonal honeycomb - strongest structure, bears force from all sides. More powerful than round/square.", desc: "Eco alternative to thermocol & wood. Export packaging, furniture, doors.", price: "₹80/kg", moq: "50 kg", img: "/my-portfolio/images/honeycomb.jpg" },
];

export default function ProductsLotus() {
  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px]">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-6 flex justify-between mono text-[10px] uppercase tracking-widest">
          <span className="opacity-40">Index — 02 / Products — 06 Solutions • All Custom Generated Images</span><span className="hidden md:block opacity-40">All custom • No standard sizes • Made to order</span>
        </div>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <h1 className="syne text-[13vw] md:text-[7vw] lg:text-[6vw] leading-[0.8] font-bold tracking-tighter">PRODUCTS<br /><span className="serif italic font-light">& SOLUTIONS</span></h1>
          <div className="lg:pt-4">
            <p className="text-[18px] leading-[1.5] max-w-[480px]">Rich experienced company in Packaging, Foam, Paper, EP Foam & Air Bubble Bag. Superior quality at competitive prices. Every product image is custom generated for Lotus.</p>
            <div className="mt-6 flex gap-2 mono text-[10px] uppercase">
              <span className="px-3 py-1.5 rounded-full bg-black text-white">6 Categories</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">Custom Generated</span>
              <span className="px-3 py-1.5 rounded-full border border-black/10">48hr Sample</span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }} className="group rounded-[16px] bg-white border border-black/[0.06] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all">
              <div className="aspect-[4/3] overflow-hidden bg-[#F6F4EF]">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div><div className="mono text-[10px] uppercase opacity-40">({p.num}) {p.type}</div><div className="syne text-xl font-bold mt-1">{p.name}</div></div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black text-white">{p.price}</span>
                </div>
                <p className="text-[12px] leading-[1.5] opacity-60 mt-3 line-clamp-2">{p.detail}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="mono text-[10px] uppercase opacity-40">MOQ: {p.moq}</span>
                  <Link to={`/products/${p.id}`} className="w-8 h-8 rounded-full bg-black text-white grid place-items-center group-hover:rotate-45 transition">↗</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-[16px] overflow-hidden border border-black/10 grid md:grid-cols-2">
          <div className="p-8 md:p-10 bg-[#0A0A0A] text-white">
            <h3 className="syne text-3xl font-bold">Need Custom Shape?</h3>
            <p className="text-white/60 mt-3 text-sm">Send product photo + dimensions. We CAD design cavity and ship sample in 48hr.</p>
            <Link to="/contact" className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-full text-xs font-bold">Get Custom Quote →</Link>
          </div>
          <div className="aspect-[4/3] md:aspect-auto">
            <img src="/my-portfolio/images/packaging-protection.jpg" alt="Custom Packaging" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="h-16" />
      </div>
    </div>
  );
}
