import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Shield, Package, Factory, Award } from "lucide-react";

const data = {
  "epe-foam": { title: "EPE Foam", sub: "Environment Friendly Packaging", desc: "Polyethylene foamed cotton, also called EPE foam, is new eco packaging material with non-cross linking closed-cell structure. Consists of numerous independent bubbles produced after physical foaming of low density polyethylene.", longDesc: "Has advantages of moisture protection, shockproof, sound insulation, thermal insulation, recycling usage, environmentally friendly, high resistance to collision, chemical resistant. Ideal substitute of traditional packaging materials. Can replace both polystyrene foam and rigid/flexible polyurethane. Uses include cushioning and impact absorption for printers, computers, engineering, handicraft furniture, medical equipment.", specs: ["Density: 18-35 kg/m3", "Thickness: 0.5mm to 100mm", "Size: Custom", "Color: White/Pink/Black"], img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" },
  "ep-foam": { title: "EP Foam", sub: "High Density Custom Moulded", desc: "Expanded Polystyrene foam made in custom shapes as per product to ensure 100% safety during transport and storage.", longDesc: "We take your product, measure dimensions, create CAD design, make sample foam fitment, then bulk production. Protects electronics, glass, machinery. Lightweight yet very strong.", specs: ["Density: 15-35 kg/m3", "Custom Moulding", "Precision Cutting", "Any Shape Possible"], img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200" },
  "cross-linked": { title: "Cross Linked / EVA Foam", sub: "Premium Grade", desc: "Superior quality foam with high resilience and fine finish, for premium products.", longDesc: "Used for high-end packaging where look and feel matters plus protection. Common in medical devices, automotive parts, handicraft.", specs: ["High Resilience", "Water Resistant", "Fine Cell Structure", "Long Life"], img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200" },
  "air-bubble": { title: "Air Bubble Bags", sub: "Lightweight Protection", desc: "High strength air bubble pouches for scratch and impact protection.", longDesc: "Made from LDPE with air bubbles, gives cushioning and surface protection. Ideal for e-commerce, exports.", specs: ["Bubble Size: 10mm-25mm", "Roll & Bag Form", "Transparent", "Reusable"], img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200" },
  "custom-fitments": { title: "Custom Foam Fitments", sub: "100% Made To Order", desc: "We create foam fitments exactly as per your product shape. No standard sizes - everything custom.", longDesc: "Process: 1) Send product or dimensions 2) We design 2D CAD 3) Sample approval 4) Bulk production. Ensures product doesn't move inside box, 100% safe delivery.", specs: ["CAD Design", "Sample First", "Any Quantity", "Fast Turnaround"], img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200" },
  "honeycomb": { title: "Honeycomb Paper", sub: "Eco Strong", desc: "Hexagonal structure inspired by bees - strongest natural design.", longDesc: "Bears force from all sides, more powerful than round/square. Eco-friendly alternative to thermocol and wood.", specs: ["Eco Friendly", "Biodegradable", "High Strength", "Lightweight"], img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200" },
};

export default function ProductDetail() {
  const { id } = useParams();
  const p = data[id] || data["epe-foam"];

  return (
    <div className="bg-[#FFFEFB] pt-24">
      <div className="px-6 md:px-10 py-6 flex justify-between text-[10px] tracking-widest uppercase opacity-50">
        <Link to="/products" className="flex items-center gap-2 hover:text-black"><ArrowLeft size={12} /> All Products</Link>
        <span>Product / {p.title}</span>
      </div>

      <div className="px-6 md:px-10 max-w-[1600px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div>
          <div className="inline-flex px-3 py-1 rounded-full bg-[#7E22CE]/10 text-[#7E22CE] text-[10px] tracking-widest uppercase font-bold">{p.sub}</div>
          <h1 className="mt-4 text-[14vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter" style={{ fontFamily: 'Syne' }}>{p.title}</h1>
          <p className="mt-6 text-lg leading-relaxed">{p.desc}</p>
          <p className="mt-4 text-black/60 leading-relaxed">{p.longDesc}</p>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {p.specs.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm"><span className="w-5 h-5 rounded-full bg-[#7E22CE]/10 text-[#7E22CE] grid place-items-center"><Check size={10} /></span> {s}</div>
            ))}
          </div>

          <div className="mt-10 flex gap-3">
            <Link to="/contact" className="px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-bold hover:bg-black transition">Get Quote for {p.title}</Link>
            <a href="tel:+919322021868" className="px-8 py-4 rounded-full border border-black/10 font-bold hover:bg-black/5 transition">Call: +91 9322021868</a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] overflow-hidden aspect-[4/3] bg-[#F5F3FF]">
            <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              [Shield, "Shockproof", "100%"],
              [Package, "Custom", "Any Shape"],
              [Award, "ISO", "9001"],
            ].map(([Icon, t, v]) => (
              <div key={t} className="rounded-[16px] bg-white border border-black/5 p-4 text-center">
                <Icon size={18} className="mx-auto text-[#7E22CE]" />
                <div className="mt-2 font-black">{v}</div><div className="text-[10px] uppercase tracking-widest opacity-50">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-16 max-w-[1600px] mx-auto border-t border-black/5 mt-16 flex justify-between">
        <Link to="/products" className="text-sm opacity-60 hover:opacity-100">← All Products</Link>
        <Link to="/contact" className="text-sm font-bold">Order Custom Shape →</Link>
      </div>
    </div>
  );
}
