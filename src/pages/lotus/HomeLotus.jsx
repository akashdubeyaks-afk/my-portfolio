import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Shield, Package, Recycle, Zap, ArrowUpRight, Check, Truck, Award, Factory } from "lucide-react";
import FoamScene from "../../components/lotus/FoamScene";
import MagneticButton from "../../components/MagneticButton";

const products = [
  { id: "epe-foam", title: "EPE Foam", sub: "Environment Friendly", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600", color: "#7E22CE", desc: "Non-cross linked closed-cell, moisture proof, shockproof." },
  { id: "ep-foam", title: "EP Foam", sub: "High Impact Protection", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600", color: "#2E7D32", desc: "Custom molded shapes for product safety during transport." },
  { id: "cross-linked", title: "Cross Linked / EVA", sub: "Premium Grade", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600", color: "#FF6F00", desc: "Superior quality for engineering, furniture, medical." },
  { id: "air-bubble", title: "Air Bubble Bags", sub: "Lightweight Safety", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600", color: "#0277BD", desc: "High strength pouches for fragile items." },
];

const industries = ["Electronics", "Furniture", "Medical Equipment", "Engineering", "Handicraft", "Artillery Box", "Printers & Computers", "Automotive"];

export default function HomeLotus() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="bg-[#FFFEFB]">
      {/* HERO */}
      <motion.section style={{ y, opacity }} className="relative min-h-[92vh] md:min-h-[100vh] flex items-center px-6 md:px-10 pt-28 pb-12 overflow-hidden">
        <FoamScene />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(126,34,206,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(46,125,50,0.06),transparent_50%)] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7E22CE]/10 border border-[#7E22CE]/20 text-[10px] tracking-[0.2em] uppercase font-bold text-[#7E22CE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7E22CE] animate-pulse" /> ISO 9001 Certified • 1.5 Lakh Sqft Plant • Since 2019
            </motion.div>

            <h1 className="mt-6 text-[13vw] md:text-[6.5vw] lg:text-[6vw] leading-[0.85] font-black tracking-tighter" style={{ fontFamily: 'Syne' }}>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }} className="block">EVERY</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.45 }} className="block text-[#7E22CE]">PACKAGING</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }} className="block font-light italic">HAS A STORY</motion.span></span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 text-[16px] md:text-[18px] leading-relaxed text-black/60 max-w-[560px]">
              We are <span className="font-bold text-black">Lotus International</span> — one of the largest fabricator of <span className="bg-[#EDE7F6] px-1.5 py-0.5 rounded font-bold">EPE Foam, EP Foam, Custom Fitments</span> that protects your products like a lotus protects its petals. Custom shapes as per your order.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton>
                <Link to="/contact" className="bg-[#1A1A1A] text-white rounded-full px-8 py-4 text-sm font-bold flex items-center gap-3 hover:bg-black transition">
                  Get Custom Quote <span className="w-7 h-7 rounded-full bg-white text-black grid place-items-center"><ArrowUpRight size={14} /></span>
                </Link>
              </MagneticButton>
              <Link to="/products" className="px-8 py-4 rounded-full border border-black/10 text-sm font-bold hover:bg-black/5 transition flex items-center gap-2">View Products →</Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-[500px] border-t border-black/5 pt-6">
              {[
                ["1.5 Lakh+", "Sqft Plant"],
                ["1000+", "Happy Clients"],
                ["100%", "Custom Shapes"],
              ].map(([n, l]) => (
                <div key={l}><div className="text-2xl md:text-3xl font-black tracking-tighter">{n}</div><div className="text-[10px] tracking-widest uppercase opacity-50">{l}</div></div>
              ))}
            </div>
          </div>

          <div className="relative lg:h-[600px]">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="relative rounded-[24px] md:rounded-[32px] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-black/[0.06] p-4 md:p-6 overflow-hidden">
              <div className="rounded-[16px] overflow-hidden aspect-[4/3] bg-[#F5F3FF] relative">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" alt="EP Foam" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[12px] bg-white/90 backdrop-blur-md flex justify-between items-center">
                  <div><div className="text-xs font-bold">Custom EP Foam Fitment</div><div className="text-[10px] opacity-60">For Electronics • Shockproof 100%</div></div>
                  <div className="w-8 h-8 rounded-full bg-[#7E22CE] text-white grid place-items-center">✓</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[12px] bg-[#F9F6F0] p-3 flex items-center gap-2"><Shield size={16} className="text-[#2E7D32]" /><span className="text-xs font-bold">Shockproof</span></div>
                <div className="rounded-[12px] bg-[#F9F6F0] p-3 flex items-center gap-2"><Recycle size={16} className="text-[#7E22CE]" /><span className="text-xs font-bold">Recyclable</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }} className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-[#1A1A1A] text-white rounded-[16px] p-4 shadow-xl hidden md:block">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center"><Factory size={18} /></div><div><div className="text-xs opacity-60">Factory</div><div className="text-sm font-bold">Bhiwandi, Maharashtra</div></div></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* TRUST BAR */}
      <div className="border-y border-black/[0.06] bg-white py-4 px-6 md:px-10 flex flex-wrap justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase opacity-60">
        <span>Trusted by Industries:</span>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {industries.slice(0, 6).map((ind) => (
            <span key={ind} className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06]">{ind}</span>
          ))}
        </div>
      </div>

      {/* WHAT WE OFFER */}
      <section className="px-6 md:px-10 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <h2 className="text-[10vw] md:text-[4.5vw] leading-[0.85] font-black tracking-tighter">WHAT WE<br /><span className="text-[#7E22CE]">OFFER</span></h2>
          <p className="md:max-w-[400px] text-black/60 leading-relaxed">Product delivery is crucial. Packaging provides first impression. Good & safe presentation boosts sales, repeat customers, and builds your brand. Foams are our core expertise.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="group rounded-[20px] bg-white border border-black/[0.06] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold tracking-widest uppercase">{p.sub}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="p-5">
                <h3 className="font-black tracking-tight text-lg">{p.title}</h3>
                <p className="text-xs text-black/50 mt-1 leading-relaxed">{p.desc}</p>
                <Link to={`/products/${p.id}`} className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all">Explore <ArrowUpRight size={12} /></Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY LOTUS */}
      <section className="mx-3 md:mx-6 rounded-[24px] md:rounded-[32px] bg-[#1A1A1A] text-white px-6 md:px-12 py-16 md:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(126,34,206,0.2),transparent)] blur-[80px] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 relative">
          <div>
            <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] tracking-widest uppercase">Why Lotus International</div>
            <h2 className="mt-6 text-[10vw] md:text-[5vw] leading-[0.85] font-black tracking-tighter">WE THINK<br />FUTURE<br /><span className="text-[#00FF94]">PACKAGING</span></h2>
            <p className="mt-6 text-white/60 max-w-[400px]">Through commitment to quality, innovation and environment, we provide one of the most dynamic and advanced technology bases within industry.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              [Shield, "Quality First", "ISO 9001 certified manufacturing, world-class cushion output, high-end machines."],
              [Zap, "Innovation", "Custom shapes as per order, for any product, any industry."],
              [Recycle, "Sustainable", "EPE foam is recyclable, eco-friendly substitute for thermocol."],
              [Truck, "Safe Delivery", "Moisture, shockproof, thermal insulation, chemical resistant."],
            ].map(([Icon, title, desc], i) => (
              <motion.div key={title} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-[16px] bg-white/[0.06] border border-white/[0.08] p-6 hover:bg-white/[0.08] transition">
                <Icon size={20} className="text-[#00FF94]" />
                <h4 className="mt-4 font-bold">{title}</h4>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-12 md:py-20 max-w-[1600px] mx-auto">
        <div className="rounded-[24px] bg-[#7E22CE] text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-[40px]" />
          <div className="relative">
            <h3 className="text-[8vw] md:text-[3.5vw] leading-[0.85] font-black tracking-tighter">Get Your Custom<br />Foam Fitment Today</h3>
            <p className="mt-3 text-white/70">Tell us your product size, we’ll make perfect protective shape.</p>
          </div>
          <MagneticButton>
            <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-[#7E22CE] font-bold flex items-center gap-2 hover:bg-zinc-100 transition">Request Quote <ArrowUpRight size={18} /></Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
