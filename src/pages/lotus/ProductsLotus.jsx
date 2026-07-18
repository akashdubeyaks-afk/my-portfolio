import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Package } from "lucide-react";

const products = [
  { id: "epe-foam", title: "EPE Foam", cat: "Eco Friendly • Non-Cross Linked", price: "From ₹2.3/pc", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", desc: "Polyethylene foamed cotton, new eco packaging with closed-cell structure, numerous independent bubbles, moisture protection, thermal insulation, recyclable.", features: ["Shockproof", "Sound Insulation", "Chemical Resistant", "Lightweight"], uses: ["Electronics", "Furniture", "Medical"] },
  { id: "ep-foam", title: "EP Foam", cat: "High Density Protection", price: "Custom Quote", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800", desc: "Expanded Polystyrene foam custom molded as per product shape, ensures safe delivery for fragile items.", features: ["Custom Shapes", "High Strength", "Low Maintenance", "Precision Fit"], uses: ["Engineering", "Artillery Box", "Printers"] },
  { id: "cross-linked", title: "Cross Linked / EVA Foam", cat: "Premium Grade", price: "From ₹150/kg", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800", desc: "Superior quality foam for superior protection, ideal substitute for traditional materials.", features: ["High Resilience", "Durable", "Fine Finish", "Long Life"], uses: ["Handicraft", "Medical Equipment", "Automotive"] },
  { id: "air-bubble", title: "Air Bubble Bags & Rolls", cat: "Lightweight • High Strength", price: "From ₹1.5/mtr", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800", desc: "Air bubble pouches highly demanded due to high strength nature, protects from scratches and impact.", features: ["Transparent", "Lightweight", "Reusable", "Moisture Proof"], uses: ["E-commerce", "Glassware", "Cosmetics"] },
  { id: "custom-fitments", title: "Custom Foam Fitments", cat: "Made To Order", price: "As Per Design", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", desc: "We make customized shapes as per your product dimensions. Send product, we design perfect cavity.", features: ["100% Custom", "CAD Design", "Sample First", "Bulk Production"], uses: ["Any Product", "Any Size", "Any Industry"] },
  { id: "honeycomb", title: "Honeycomb Paper", cat: "Sustainable • Strong", price: "From ₹80/kg", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800", desc: "Hexagonal honeycomb structure - nature's strongest, bears force from all sides, eco alternative.", features: ["Eco Friendly", "Hexagonal Strong", "Biodegradable", "Lightweight"], uses: ["Export Packaging", "Furniture", "Doors"] },
];

export default function ProductsLotus() {
  return (
    <div className="bg-[#FFFEFB] pt-28 md:pt-32 px-6 md:px-10 pb-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <h1 className="text-[12vw] md:text-[6vw] leading-[0.85] font-black tracking-tighter" style={{ fontFamily: 'Syne' }}>PRODUCTS<br /><span className="text-[#7E22CE]">& SOLUTIONS</span></h1>
          <p className="md:max-w-[360px] text-black/60 leading-relaxed">Rich experienced company in Packaging, Foam, Paper, EP Foam & Air Bubble Bag. Superior quality at competitive prices.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="group rounded-[20px] bg-white border border-black/[0.06] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold uppercase">{p.cat}</span>
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold">{p.price}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black tracking-tight">{p.title}</h3>
                <p className="text-xs text-black/50 mt-2 leading-relaxed line-clamp-3">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.features.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-[10px] font-bold uppercase tracking-wide">{f}</span>
                  ))}
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <span className="text-[10px] tracking-widest uppercase opacity-40">Uses: {p.uses.join(" • ")}</span>
                  <Link to={`/products/${p.id}`} className="w-9 h-9 rounded-full bg-[#7E22CE] text-white grid place-items-center group-hover:rotate-45 transition duration-500"><ArrowUpRight size={16} /></Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-[24px] bg-[#1A1A1A] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">Need Custom Shape For Your Product?</h3>
            <p className="text-white/60 mt-2">Send us product dimensions, we will design foam cavity with CAD + sample.</p>
          </div>
          <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-100 transition flex items-center gap-2">Get Custom Quote <Package size={16} /></Link>
        </div>
      </div>
    </div>
  );
}
