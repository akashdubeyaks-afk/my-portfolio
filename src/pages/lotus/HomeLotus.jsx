import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function HomeLotus() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div ref={ref} className="bg-[#FAF9F6] text-[#0A0A0A]">
      <section className="relative min-h-[92vh] md:min-h-[100vh] pt-[96px] md:pt-[112px] px-6 md:px-10 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="border-t border-black/10 pt-4 flex justify-between mono text-[10px] tracking-[0.2em] uppercase">
            <span className="opacity-50">Index — 01 / Home</span>
            <span className="hidden md:flex gap-8"><span>● Available for custom orders</span><span>48hr sample turnaround</span></span>
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
                  Lotus International is one of India’s largest fabricator & exporter of <span className="bg-black text-white px-1.5 py-0.5 text-[13px]">EPE foam, EP foam & custom fitments</span>. We make shapes as per your order — so your products deliver safely, zero damage.
                </p>
                <div className="space-y-4">
                  <p className="mono text-[10px] leading-[1.6] uppercase tracking-wide opacity-60">
                    ISO 9001 certified manufacturing with 1.5 lakh sqft plant, high-end machines for world-class cushion packaging materials.
                  </p>
                  <div className="flex gap-3">
                    <Link to="/contact" className="bg-black text-white px-6 py-3 rounded-full text-[12px] font-bold tracking-wide flex items-center gap-2 hover:bg-zinc-900 transition">Request Custom Sample <ArrowUpRight size={14} /></Link>
                    <Link to="/products" className="border border-black/15 px-6 py-3 rounded-full text-[12px] font-bold tracking-wide hover:bg-black/5 transition">View Specs</Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-3 border border-black/[0.08] rounded-[12px] overflow-hidden">
                {[
                  ["1.5L+", "Sqft Plant\nBhiwandi, MH"],
                  ["1000+", "Products\nDelivered Safely"],
                  ["48HR", "Sample\nTurnaround"],
                ].map(([n, l]) => (
                  <div key={n} className="p-4 md:p-5 border-r last:border-r-0 border-black/[0.08]">
                    <div className="syne text-2xl md:text-3xl font-bold tracking-tighter">{n}</div>
                    <div className="mono text-[9px] uppercase leading-[1.3] whitespace-pre mt-1 opacity-60">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div style={{ y: heroY }} className="relative lg:sticky lg:top-[112px]">
              <div className="relative bg-white border border-black/[0.08] rounded-[16px] overflow-hidden">
                <div className="flex justify-between items-center px-5 py-3 border-b border-black/[0.06] mono text-[10px] uppercase tracking-widest">
                  <span>DWG — EP-FOAM-CUSTOM-01</span><span>Scale 1:5 • ±0.5mm</span>
                </div>
                <div className="relative aspect-[4/3] bg-[#F6F4EF] overflow-hidden">
                  <img src="/my-portfolio/images/hero-foam.jpg" alt="Custom EP Foam" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-end">
                    <div className="bg-[#0A0A0A] text-white rounded-full px-3 py-1.5 mono text-[10px] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" /> Shockproof 100% • EPE 25kg/m³
                    </div>
                    <div className="hidden md:flex bg-white border border-black/10 rounded-full px-3 py-1.5 mono text-[10px]">Zero Movement</div>
                  </div>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 border-t border-black/[0.06] mono text-[10px]">
                  <div><div className="opacity-40 uppercase">Material</div><div className="font-bold mt-1">EPE Foam 30mm</div></div>
                  <div><div className="opacity-40 uppercase">Protection</div><div className="font-bold mt-1">Drop Test 1.2m ✓</div></div>
                  <div><div className="opacity-40 uppercase">MOQ</div><div className="font-bold mt-1">100 pcs</div></div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[12px] overflow-hidden aspect-[4/3] border border-black/10">
                  <img src="/my-portfolio/images/epe-foam.jpg" alt="EPE Foam" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-[12px] overflow-hidden aspect-[4/3] border border-black/10">
                  <img src="/my-portfolio/images/custom-fitment.jpg" alt="Custom Fitment" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/[0.08] bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <div className="mono text-[10px] tracking-[0.3em] uppercase opacity-40 mb-6">01 / Why Custom Foam?</div>
            <h2 className="syne text-[8vw] md:text-[4vw] leading-[0.85] tracking-tighter font-bold">GENERIC PACKAGING<br />BREAKS PRODUCTS.<br /><span className="serif italic font-light">WE FIX THAT.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 pt-4">
            {[
              ["32%", "Products damaged due to poor packaging in transit — industry average. Custom foam reduces it to <0.5%."],
              ["₹18,400", "Average cost of return & replacement per damaged unit. Foam fitment costs ₹18 — 1000x ROI."],
              ["48HR", "From drawing to sample. Send product photo + dimensions, we CAD design cavity and ship sample."],
            ].map(([n, d], i) => (
              <div key={i} className="border-t border-black/10 pt-6">
                <div className="syne text-4xl font-bold tracking-tighter">{n}</div>
                <p className="mt-3 text-[13px] leading-[1.5] opacity-70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end border-b border-black/[0.08] pb-6 mb-10">
          <h2 className="syne text-[9vw] md:text-[5vw] leading-[0.85] font-bold tracking-tighter">PRODUCTS &<br />SOLUTIONS</h2>
          <div className="hidden md:block mono text-[10px] uppercase max-w-[240px] opacity-50">Polyethylene foamed cotton, also called EPE foam, is new eco packaging with closed-cell structure.</div>
        </div>

        <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {[
            { id: "epe-foam", num: "01", name: "EPE Foam Sheet & Fitments", spec: "18–35 kg/m³ • 0.5–100mm • Custom", desc: "Non-cross linked closed-cell, moisture proof, shockproof, sound insulation, thermal, recyclable.", uses: "Electronics, Furniture, Medical", img: "/my-portfolio/images/epe-foam.jpg" },
            { id: "ep-foam", num: "02", name: "EP Foam — Custom Moulded", spec: "15–35 kg/m³ • Moulded • ±0.5mm Tolerance", desc: "Expanded polystyrene custom moulded as per product shape, ensures safe delivery for fragile items.", uses: "Engineering, Artillery Box, Printers", img: "/my-portfolio/images/ep-foam.jpg" },
            { id: "cross-linked", num: "03", name: "Cross Linked / EVA Foam", spec: "33–200 kg/m³ • High Resilience • Fine Cell", desc: "Premium grade for superior protection, ideal for high-end products where look matters.", uses: "Handicraft, Medical, Automotive", img: "/my-portfolio/images/cross-linked-foam.jpg" },
            { id: "air-bubble", num: "04", name: "Air Bubble Pouches & Rolls", spec: "10–25mm Bubble • LDPE • Transparent", desc: "High strength nature due to air barrier, lightweight, reusable, scratch protection.", uses: "E-commerce, Glassware, Cosmetics", img: "/my-portfolio/images/air-bubble.jpg" },
            { id: "custom-fitments", num: "05", name: "Custom Foam Fitments", spec: "CAD • Sample First • Any Qty", desc: "100% made to order. Send product photo + LxWxH, we design cavity with zero movement.", uses: "Any Product, Any Size", img: "/my-portfolio/images/custom-fitment.jpg" },
          ].map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="group grid lg:grid-cols-[80px_80px_1.2fr_0.8fr_0.7fr_40px] gap-6 py-6 items-center hover:bg-black/[0.02] -mx-6 md:-mx-10 px-6 md:px-10 transition">
              <div className="mono text-[11px] opacity-30 group-hover:opacity-100 transition">({p.num})</div>
              <div className="w-16 h-16 rounded-[8px] overflow-hidden border border-black/10 hidden md:block">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="syne text-[18px] md:text-[24px] font-bold tracking-tight leading-none group-hover:tracking-wide transition-all duration-500">{p.name}</div>
              <div className="mono text-[11px] opacity-60 hidden lg:block">{p.spec}</div>
              <div className="text-[12px] leading-[1.4] opacity-60 hidden lg:block">{p.desc} <span className="opacity-40">— {p.uses}</span></div>
              <div className="w-8 h-8 rounded-full border border-black/10 grid place-items-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition-all duration-500">↗</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#0A0A0A] text-[#FAF9F6] px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-start mb-16">
            <h2 className="syne text-[10vw] md:text-[5vw] leading-[0.85] font-bold tracking-tighter">HOW IT<br />WORKS</h2>
            <div className="hidden md:block mono text-[10px] uppercase opacity-40 max-w-[260px]">No catalogs. No standard sizes. Everything made to order. 4 steps, 48hr sample.</div>
          </div>
          <div className="grid md:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 rounded-[12px] overflow-hidden">
            {[
              ["01", "Send Product Details", "Photo + LxWxH + weight + fragile level. WhatsApp or email.", "2 min"],
              ["02", "We CAD Design Cavity", "We create 2D drawing with foam thickness, no movement, drop test calculation.", "4 hours"],
              ["03", "Sample Approval", "We cut sample on CNC, ship to you. You test with actual product.", "24-48 hours"],
              ["04", "Bulk Production", "After approval, mass production with same machine, 100% consistency.", "3-5 days"],
            ].map(([num, title, desc, time]) => (
              <div key={num} className="bg-[#0A0A0A] p-8">
                <div className="flex justify-between"><span className="mono text-[11px] opacity-40">({num})</span><span className="mono text-[10px] px-2 py-1 rounded-full bg-white/10">{time}</span></div>
                <h4 className="mt-8 syne text-[18px] font-bold leading-tight">{title}</h4>
                <p className="mt-3 text-[12px] leading-[1.5] opacity-60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 max-w-[1600px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div>
          <div className="mono text-[10px] tracking-[0.3em] uppercase opacity-40 mb-6">Factory & Trust</div>
          <h2 className="syne text-[8vw] md:text-[4vw] leading-[0.85] font-bold tracking-tighter">1.5 LAKH SQFT.<br />ISO 9001.<br />HIGH-END<br />MACHINES.</h2>
          <div className="mt-8 space-y-6 text-[14px] leading-[1.6] opacity-70">
            <p>We tie up with renowned ISO 9001 certified manufacturing company. Factory premises comprising more than 1.5 lakhs sqft built-up area as per international standards.</p>
            <p>Installed high-end quality machines that gives world-class output of cushion packaging materials.</p>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-[16px] overflow-hidden bg-[#F0EDE8] border border-black/5">
            <img src="/my-portfolio/images/factory.jpg" alt="Lotus Factory" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-[#0A0A0A] text-white px-4 py-2 rounded-full mono text-[10px] flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" /> Live Production • Bhiwandi Plant</div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-20 max-w-[1600px] mx-auto">
        <div className="border border-black/10 rounded-[16px] p-[1px]">
          <div className="bg-[#0A0A0A] text-[#FAF9F6] rounded-[15px] px-8 md:px-12 py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="syne text-[9vw] md:text-[4vw] leading-[0.85] font-bold tracking-tighter">GET YOUR<br />CUSTOM FOAM<br />IN 48 HOURS</h3>
              <p className="mt-4 mono text-[11px] uppercase opacity-50 max-w-[360px]">Send product photo + dimensions on WhatsApp. We CAD design cavity and ship sample. No charge for sample if bulk order confirmed.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="bg-white text-black px-10 py-4 rounded-full text-[13px] font-bold tracking-wide hover:bg-zinc-100 transition text-center">Request Sample →</Link>
              <a href="https://wa.me/919322021868" className="border border-white/20 px-10 py-4 rounded-full text-[13px] font-bold tracking-wide hover:bg-white/10 transition text-center">WhatsApp: +91 93220 21868</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
