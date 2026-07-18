import { useParams, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
const ProductImageGallery = lazy(() => import("../../components/lotus/ProductImageGallery"));
const Foam3DViewer = lazy(() => import("../../components/lotus/Foam3DViewer"));
function Loader3D() { return <div className="w-full h-[400px] rounded-[12px] bg-[#F6F4EF] border border-black/5 grid place-items-center"><div className="w-6 h-6 border border-black/20 border-t-black rounded-full animate-spin" /></div>; }

const data = {
  "epe-foam": { name: "EPE Foam", type: "Sheet & Fitments", desc: "Polyethylene foamed cotton, new eco packaging with non-cross linking closed-cell structure.", long: "Consists of numerous independent bubbles produced after physical foaming. Advantages: moisture protection, shockproof, sound insulation, thermal insulation, recycling, eco-friendly, high resistance to collision, chemical resistant. Ideal substitute of traditional materials.", specs: ["Density: 18-35 kg/m³", "Thickness: 0.5-100mm", "Color: White, Pink, Black", "Size: Custom as per order"], uses: ["Printers", "Computers", "Engineering", "Furniture", "Medical", "Artillery Box"] },
  "ep-foam": { name: "EP Foam", type: "Custom Moulded", desc: "Expanded polystyrene custom moulded as per product shape for 100% safety.", long: "We take product dimensions, create CAD cavity, ensure zero movement. Drop test 1.2m certified. Low maintenance.", specs: ["Density: 15-35 kg/m³", "Moulded Tolerance ±0.5mm", "Custom Cavity", "Any Shape"], uses: ["Electronics", "Glassware", "Machinery"] },
  "cross-linked": { name: "Cross Linked / EVA", type: "Premium Grade", desc: "Superior quality with high resilience and fine cell structure.", long: "Premium packaging where look and feel matters. Water resistant, fine finish, long life, high resilience.", specs: ["Density: 33-200 kg/m³", "Water Resistant", "Fine Cell", "Long Life"], uses: ["Medical Devices", "Automotive", "Handicraft"] },
  "air-bubble": { name: "Air Bubble Bags", type: "Pouches & Rolls", desc: "High strength air barrier gives cushioning and scratch protection.", long: "LDPE with air bubbles, gives surface protection plus impact. Lightweight, reusable, moisture proof, transparent.", specs: ["Bubble: 10-25mm", "Form: Roll & Bag", "Transparent", "Reusable"], uses: ["E-commerce", "Cosmetics", "Glass"] },
  "custom-fitments": { name: "Custom Fitments", type: "Made To Order", desc: "100% made to order as per your product shape. No standard sizes.", long: "Process: Send product photo + LxWxH + weight → We CAD design → Sample approval → Bulk production. Zero movement guarantee.", specs: ["CAD Design", "Sample First", "Any Qty", "Fast Turnaround 3-5 days"], uses: ["Any Product", "Any Size", "Any Industry"] },
  "honeycomb": { name: "Honeycomb Paper", type: "Sustainable", desc: "Hexagonal structure like bees honeycomb - strongest natural design.", long: "Bears force from all sides, more powerful than round or square. Eco friendly alternative to thermocol and wood. Biodegradable.", specs: ["Eco Friendly", "Biodegradable", "High Strength", "Lightweight"], uses: ["Export", "Furniture", "Doors"] },
};

export default function ProductDetail() {
  const { id } = useParams();
  const p = data[id] || data["epe-foam"];

  return (
    <div className="bg-[#FAF9F6] pt-[88px] md:pt-[112px]">
      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="border-t border-black/10 pt-4 flex justify-between mono text-[10px] uppercase opacity-40">
          <Link to="/products" className="hover:opacity-100">← Back to Products — Pure 3D No Images</Link><span>Product — {p.name} — Separate 3D Page</span>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
          <div>
            <div className="mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-black text-white inline-block">{p.type} — 3D Viewer</div>
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

            <div className="mt-8 p-4 rounded-[12px] bg-[#0A0A0A] text-white mono text-[10px]">
              <div className="opacity-40 uppercase">Separate Page Info</div>
              <div className="mt-2">Ye product ka alag page hai: <span className="font-bold">/products/{id}</span> — Iska apna 3D viewer hai jo drag karke rotate hota hai, alag color, alag cavity.</div>
            </div>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<Loader3D />}><ProductImageGallery productId={id} /></Suspense>
            <div className="hidden md:block">
              <div className="mono text-[10px] uppercase opacity-40 mb-3">Also — Interactive 3D Viewer (EP Foam Only, No Thermocol)</div>
              <Suspense fallback={<Loader3D />}><Foam3DViewer variant={id} height="320px" /></Suspense>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[12px] bg-white border border-black/10 p-4">
                <div className="mono text-[10px] uppercase opacity-40">Material</div><div className="font-bold mt-1 text-sm">{p.type}</div><div className="mt-2 w-full h-2 rounded-full bg-black/5"><div className="h-full w-[80%] bg-black rounded-full" /></div>
              </div>
              <div className="rounded-[12px] bg-white border border-black/10 p-4">
                <div className="mono text-[10px] uppercase opacity-40">Protection</div><div className="font-bold mt-1 text-sm">Drop Test 1.2m ✓</div><div className="mt-2 mono text-[9px] opacity-40">Zero Damage Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 mt-16 py-8 flex justify-between mono text-[10px] uppercase opacity-40">
          <Link to="/products">← All Products — Box with all together</Link><span>Click box to divide into parts • Pure 3D • No Images</span>
        </div>
      </div>
    </div>
  );
}
