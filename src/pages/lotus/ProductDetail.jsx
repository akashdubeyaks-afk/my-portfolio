import { useParams, Link } from "react-router-dom";

const data = {
  "epe-foam": { name: "EPE Foam", type: "Sheet & Fitments", desc: "Polyethylene foamed cotton, new eco packaging with non-cross linking closed-cell structure.", long: "Consists of numerous independent bubbles produced after physical foaming. Advantages: moisture protection, shockproof, sound insulation, thermal insulation, recycling, eco-friendly, high resistance to collision, chemical resistant. Ideal substitute of traditional materials. Can replace polystyrene and rigid/flexible polyurethane.", specs: ["Density: 18-35 kg/m³", "Thickness: 0.5-100mm", "Color: White, Pink, Black", "Size: Custom as per order"], uses: ["Printers", "Computers", "Engineering", "Furniture", "Medical", "Artillery Box"], img: "/my-portfolio/images/epe-foam.jpg" },
  "ep-foam": { name: "EP Foam", type: "Custom Moulded", desc: "Expanded polystyrene custom moulded as per product shape for 100% safety.", long: "We take product dimensions, create CAD cavity, ensure zero movement. Drop test 1.2m certified. Low maintenance, used as fitments for fragile items.", specs: ["Density: 15-35 kg/m³", "Moulded Tolerance ±0.5mm", "Custom Cavity", "Any Shape"], uses: ["Electronics", "Glassware", "Machinery"], img: "/my-portfolio/images/ep-foam.jpg" },
  "cross-linked": { name: "Cross Linked / EVA", type: "Premium Grade", desc: "Superior quality with high resilience and fine cell structure.", long: "Premium packaging where look and feel matters. Water resistant, fine finish, long life, high resilience.", specs: ["Density: 33-200 kg/m³", "Water Resistant", "Fine Cell", "Long Life"], uses: ["Medical Devices", "Automotive", "Handicraft"], img: "/my-portfolio/images/cross-linked-foam.jpg" },
  "air-bubble": { name: "Air Bubble Bags", type: "Pouches & Rolls", desc: "High strength air barrier gives cushioning and scratch protection.", long: "LDPE with air bubbles, gives surface protection plus impact. Lightweight, reusable, moisture proof, transparent.", specs: ["Bubble: 10-25mm", "Form: Roll & Bag", "Transparent", "Reusable"], uses: ["E-commerce", "Cosmetics", "Glass"], img: "/my-portfolio/images/air-bubble.jpg" },
  "custom-fitments": { name: "Custom Fitments", type: "Made To Order", desc: "100% made to order as per your product shape. No standard sizes.", long: "Process: Send product photo + LxWxH + weight → We CAD design → Sample approval → Bulk production. Zero movement guarantee.", specs: ["CAD Design", "Sample First", "Any Qty", "Fast Turnaround 3-5 days"], uses: ["Any Product", "Any Size", "Any Industry"], img: "/my-portfolio/images/custom-fitment.jpg" },
  "honeycomb": { name: "Honeycomb Paper", type: "Sustainable", desc: "Hexagonal structure like bees honeycomb - strongest natural design.", long: "Bears force from all sides, more powerful than round or square. Eco friendly alternative to thermocol and wood. Biodegradable.", specs: ["Eco Friendly", "Biodegradable", "High Strength", "Lightweight"], uses: ["Export", "Furniture", "Doors"], img: "/my-portfolio/images/honeycomb.jpg" },
};

export default function ProductDetail() {
  const { id } = useParams();
  const p = data[id] || data["epe-foam"];

  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px]">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-4 flex justify-between mono text-[10px] uppercase opacity-40">
          <Link to="/products" className="hover:opacity-100">← Back to Products — Custom Generated Images</Link><span>Product — {p.name}</span>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <div>
            <div className="mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-black text-white inline-block">{p.type} — Custom Image</div>
            <h1 className="mt-6 syne text-[12vw] md:text-[6vw] leading-[0.8] font-bold tracking-tighter">{p.name}</h1>
            <p className="mt-6 text-[20px] leading-[1.3]">{p.desc}</p>
            <p className="mt-4 text-[14px] leading-[1.6] opacity-60">{p.long}</p>

            <div className="mt-10 border border-black/10 rounded-[12px] divide-y divide-black/10">
              <div className="p-5 grid grid-cols-2 gap-4 mono text-[11px]">
                <div className="opacity-40 uppercase">Specifications</div><div className="opacity-40 uppercase text-right">Details</div>
              </div>
              {p.specs.map((s) => (
                <div key={s} className="p-5 flex justify-between text-[13px]"><span className="opacity-60">{s.split(":")[0]}</span><span className="font-bold">{s.split(":")[1] || s}</span></div>
              ))}
            </div>

            <div className="mt-8 flex gap-2 flex-wrap">
              {p.uses.map((u) => (
                <span key={u} className="px-3 py-1.5 rounded-full border border-black/10 mono text-[10px] uppercase">{u}</span>
              ))}
            </div>

            <div className="mt-10 flex gap-3">
              <Link to="/contact" className="bg-black text-white px-8 py-3 rounded-full text-[13px] font-bold">Get Quote →</Link>
              <a href="tel:+919322021868" className="border border-black/10 px-8 py-3 rounded-full text-[13px] font-bold">Call: +91 93220 21868</a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="aspect-[4/3] rounded-[16px] bg-[#EDE9E3] border border-black/5 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[12px] overflow-hidden border border-black/10">
                <img src="/my-portfolio/images/foam-texture.jpg" alt="Foam Texture" className="w-full h-24 object-cover" />
                <div className="p-2 mono text-[9px] uppercase">Closed-cell • Premium</div>
              </div>
              <div className="rounded-[12px] overflow-hidden border border-black/10">
                <img src="/my-portfolio/images/packaging-protection.jpg" alt="Protection" className="w-full h-24 object-cover" />
                <div className="p-2 mono text-[9px] uppercase">Zero Damage • Custom</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 mt-16 py-8 flex justify-between mono text-[10px] uppercase opacity-40">
          <Link to="/products">← All Products</Link><span>Custom Generated Images • No Unsplash • Made for Lotus</span>
        </div>
      </div>
    </div>
  );
}
