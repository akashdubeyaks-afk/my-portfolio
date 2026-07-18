import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ExplodingBox = lazy(() => import("../../components/lotus/ExplodingBox"));
const Foam3DViewer = lazy(() => import("../../components/lotus/Foam3DViewer"));

function Loader3D() {
  return <div className="w-full h-[200px] rounded-[12px] bg-[#F6F4EF] border border-black/5 grid place-items-center"><div className="w-6 h-6 border border-black/20 border-t-black rounded-full animate-spin" /></div>;
}

export default function HomeLotus() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [exploded, setExploded] = useState(false);

  return (
    <div ref={ref} className="bg-[#FAF9F6] text-[#0A0A0A]">
      <section className="relative min-h-[92vh] md:min-h-[100vh] pt-[96px] md:pt-[112px] px-6 md:px-10 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="border-t border-black/10 pt-4 flex justify-between mono text-[10px] tracking-[0.2em] uppercase">
            <span className="opacity-50">Index — 01 / Home • Custom Generated 3D — No Images</span>
            <span className="hidden md:flex gap-8"><span>● Box with all products together</span><span>Click to divide into parts</span></span>
          </div>

          <div className="mt-8 md:mt-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-start">
            <div>
              <h1 className="syne text-[13.5vw] md:text-[7.2vw] lg:text-[6.2vw] leading-[0.85] tracking-tighter font-bold">
                <span className="block">FOAM THAT</span>
                <span className="block font-light italic serif text-[13vw] md:text-[6.8vw] tracking-normal -mt-2 md:-mt-3">PROTECTS.</span>
                <span className="block -mt-1 md:-mt-2">PACKAGING</span>
                <span className="block -mt-1 md:-mt-2">THAT PERFORMS.</span>
              </h1>

              <div className="mt-8 md:mt-10 grid md:grid-cols-[1.2fr_0.8fr] gap-8 border-t border-black/10 pt-6">
                <p className="text-[16px] md:text-[18px] leading-[1.5] tracking-tight">
                  Lotus International — <span className="bg-black text-white px-1.5 py-0.5 text-[13px]">All products in one box together</span>. Click karte hi alag-alag parts me divide ho jayega — 3D exploded view.
                </p>
                <div className="space-y-4">
                  <p className="mono text-[10px] leading-[1.6] uppercase tracking-wide opacity-60">
                    No images used. Pure 3D with custom foam blocks. Box me 6 products ek sath, click pe alag.
                  </p>
                  <div className="flex gap-3">
                    <Link to="/contact" className="bg-black text-white px-6 py-3 rounded-full text-[12px] font-bold tracking-wide flex items-center gap-2 hover:bg-zinc-900 transition">Request Custom Sample <ArrowUpRight size={14} /></Link>
                    <Link to="/products" className="border border-black/15 px-6 py-3 rounded-full text-[12px] font-bold tracking-wide hover:bg-black/5 transition">View All 6</Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-3 border border-black/[0.08] rounded-[12px] overflow-hidden">
                {[
                  ["6-in-1", "Products In\nOne Box"],
                  ["Click →", "Explode Into\nSeparate Parts"],
                  ["100%", "Custom 3D\nNo Images"],
                ].map(([n, l]) => (
                  <div key={n} className="p-4 md:p-5 border-r last:border-r-0 border-black/[0.08]">
                    <div className="syne text-2xl md:text-3xl font-bold tracking-tighter">{n}</div>
                    <div className="mono text-[9px] uppercase leading-[1.3] whitespace-pre mt-1 opacity-60">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div style={{ y: heroY }} className="relative lg:sticky lg:top-[112px] space-y-4">
              <Suspense fallback={<Loader3D />}>
                <ExplodingBox onExplode={setExploded} />
              </Suspense>
              
              <div className="grid grid-cols-2 gap-3">
                <Suspense fallback={<Loader3D />}><Foam3DViewer variant="epe-foam" height="200px" /></Suspense>
                <Suspense fallback={<Loader3D />}><Foam3DViewer variant="lotus" height="200px" /></Suspense>
              </div>

              <div className="bg-white border border-black/10 rounded-[12px] p-4 mono text-[10px]">
                <div className="flex justify-between"><span className="opacity-40">STATUS</span><span className={`font-bold ${exploded ? "text-[#00C950]" : "text-black"}`}>{exploded ? "EXPLODED • 6 Parts Separated" : "ASSEMBLED • All Together in Box"}</span></div>
                <div className="mt-2 h-1 bg-black/5 rounded-full overflow-hidden"><div className={`h-full bg-black transition-all duration-700 ${exploded ? "w-full" : "w-1/6"}`} /></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.08] bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <div className="mono text-[10px] tracking-[0.3em] uppercase opacity-40 mb-6">01 / Interactive Demo</div>
            <h2 className="syne text-[8vw] md:text-[4vw] leading-[0.85] tracking-tighter font-bold">BOX ME<br />SAB EK SATH.<br /><span className="serif italic font-light">CLICK PE ALAG.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 pt-4">
            {[
              ["01", "Together", "Sabhi 6 products ek hi outer box me band — Lotus purple lid ke sath."],
              ["02", "Click → Divide", "Box pe click karte hi top lid upar, 6 foam blocks alag directions me explode."],
              ["03", "No Images", "Koi generated image nahi — 100% Three.js 3D, realistic shadows, bevel, glow."],
            ].map(([n, t, d]) => (
              <div key={n} className="border-t border-black/10 pt-6">
                <div className="mono text-[11px] opacity-40">({n})</div>
                <div className="syne text-xl font-bold mt-2">{t}</div>
                <p className="mt-3 text-[13px] leading-[1.5] opacity-70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end border-b border-black/[0.08] pb-6 mb-10">
          <h2 className="syne text-[9vw] md:text-[5vw] leading-[0.85] font-bold tracking-tighter">PRODUCTS &<br />SOLUTIONS</h2>
          <div className="hidden md:block mono text-[10px] uppercase max-w-[240px] opacity-50">6 products — each has separate 3D page. Click to view individual 3D viewer with realistic cavity.</div>
        </div>

        <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {[
            { id: "epe-foam", num: "01", name: "EPE Foam Sheet & Fitments", spec: "18–35 kg/m³ • 0.5–100mm", color: "#FEFEFE" },
            { id: "ep-foam", num: "02", name: "EP Foam — Custom Moulded", spec: "15–35 kg/m³ • ±0.5mm Tolerance", color: "#EDE9E3" },
            { id: "cross-linked", num: "03", name: "Cross Linked / EVA Foam", spec: "33–200 kg/m³ • High Resilience", color: "#1A1A1A" },
            { id: "air-bubble", num: "04", name: "Air Bubble Pouches & Rolls", spec: "10–25mm Bubble • LDPE", color: "#E3F2FD" },
            { id: "custom-fitments", num: "05", name: "Custom Foam Fitments", spec: "CAD • Sample First • Any Qty", color: "#F3E5F5" },
            { id: "honeycomb", num: "06", name: "Honeycomb Paper", spec: "Hexagonal • Eco • Biodegradable", color: "#FFF8E1" },
          ].map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="group grid lg:grid-cols-[80px_80px_1.2fr_0.8fr_40px] gap-6 py-6 items-center hover:bg-black/[0.02] -mx-6 md:-mx-10 px-6 md:px-10 transition">
              <div className="mono text-[11px] opacity-30">({p.num})</div>
              <div className="w-14 h-14 rounded-[8px] border border-black/10 flex items-center justify-center" style={{ background: p.color }}>
                <div className="w-8 h-2 rounded-full bg-black/20" />
              </div>
              <div className="syne text-[18px] md:text-[24px] font-bold tracking-tight leading-none group-hover:tracking-wide transition-all duration-500">{p.name}</div>
              <div className="mono text-[11px] opacity-60 hidden lg:block">{p.spec}</div>
              <div className="w-8 h-8 rounded-full border border-black/10 grid place-items-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition-all duration-500">↗</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#0A0A0A] text-[#FAF9F6] px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="syne text-[10vw] md:text-[5vw] leading-[0.85] font-bold tracking-tighter">EVERY PRODUCT<br />HAS SEPARATE<br /><span className="text-[#00FF94]">3D PAGE</span></h2>
          <p className="mt-6 mono text-[11px] uppercase opacity-50 max-w-[400px]">Each product has its own dedicated page with interactive 3D viewer — drag, zoom, explore cavity, see product inside.</p>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "epe-foam", name: "EPE Foam", desc: "Stack of 3 sheets floating" },
              { id: "ep-foam", name: "EP Foam", desc: "White block with black device" },
              { id: "cross-linked", name: "Cross Linked", desc: "Black premium foam" },
              { id: "air-bubble", name: "Air Bubble", desc: "Transparent bubbles with transmission" },
              { id: "custom-fitments", name: "Custom Fitments", desc: "Pink foam + purple product glow" },
              { id: "honeycomb", name: "Honeycomb", desc: "Hexagonal eco structure" },
            ].map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="rounded-[12px] bg-white/[0.06] border border-white/10 p-5 hover:bg-white/[0.08] transition group">
                <div className="flex justify-between"><span className="mono text-[10px] opacity-40">{p.id}</span><span className="w-6 h-6 rounded-full bg-white text-black grid place-items-center group-hover:rotate-45 transition">↗</span></div>
                <div className="mt-4 syne font-bold">{p.name}</div>
                <div className="text-xs opacity-60 mt-1">{p.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
