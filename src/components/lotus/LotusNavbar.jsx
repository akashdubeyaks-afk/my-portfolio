import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LotusNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Index", num: "01" },
    { to: "/products", label: "Products", num: "02" },
    { to: "/about", label: "About", num: "03" },
    { to: "/contact", label: "Contact", num: "04" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#FAF9F6]/92 backdrop-blur-[20px] border-b border-black/[0.06]" : "bg-transparent"}`}>
        {/* Top technical bar */}
        <div className="hidden md:flex border-b border-black/[0.06] px-10 py-2 justify-between text-[10px] mono tracking-wide uppercase">
          <span className="opacity-50">Lotus International ©2019—2026 • Bhiwandi, MH • 19°17'N 73°04'E</span>
          <span className="flex gap-6"><span>ISO 9001:2015</span><span>1.5L SQFT PLANT</span><span>sales@lotusinternational.co.in</span></span>
        </div>

        <div className="px-6 md:px-10 h-[64px] md:h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] bg-white border border-black/[0.08] rounded-[8px] p-1 flex items-center justify-center">
              <img src="/my-portfolio/lotus-logo.png" alt="Lotus" className="w-full h-full object-contain" onError={(e)=>{e.target.outerHTML='<div class=\'w-6 h-6 bg-[#6D28D9] rounded-full\'></div>'}} />
            </div>
            <div className="leading-[0.9]">
              <div className="syne font-bold text-[15px] tracking-tight">LOTUS INTERNATIONAL</div>
              <div className="mono text-[8px] tracking-[0.2em] uppercase opacity-50 mt-0.5">EVERY PACKAGING HAS A STORY</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => {
              const active = loc.pathname === l.to || (l.to !== "/" && loc.pathname.startsWith(l.to));
              return (
                <Link key={l.to} to={l.to} className="group flex items-baseline gap-2">
                  <span className="mono text-[10px] opacity-40 group-hover:opacity-100 transition">{l.num}</span>
                  <span className={`text-[13px] tracking-wide font-medium ${active ? "border-b border-black pb-0.5" : "opacity-60 group-hover:opacity-100 hover-underline"}`}>{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+919322021868" className="hidden md:block mono text-[11px] tracking-wide border border-black/10 px-4 py-2 rounded-full hover:bg-black hover:text-white transition">+91 93220 21868</a>
            <Link to="/contact" className="hidden md:flex bg-[#0A0A0A] text-[#FAF9F6] px-5 py-2.5 rounded-full text-[12px] font-bold tracking-wide hover:bg-black transition">Request Sample →</Link>
            <button onClick={() => setMenu(!menu)} className="lg:hidden w-10 h-10 border border-black/10 rounded-full grid place-items-center">
              <div className="space-y-1"><div className={`w-4 h-px bg-black transition ${menu ? "rotate-45 translate-y-1" : ""}`} /><div className={`w-4 h-px bg-black transition ${menu ? "-rotate-45 -translate-y-1" : ""}`} /></div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#FAF9F6] pt-[88px] px-6 lg:hidden">
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 }} className="border-b border-black/10">
                <Link to={l.to} onClick={() => setMenu(false)} className="flex justify-between items-center py-6">
                  <span className="syne text-[14vw] leading-none font-bold tracking-tighter">{l.label}</span>
                  <span className="mono text-xs opacity-40">{l.num}</span>
                </Link>
              </motion.div>
            ))}
            <div className="mt-10 mono text-[10px] uppercase leading-relaxed opacity-50">
              Jai Jalram Complex, Gala No 11/6-1, Pimplas<br/>Bhiwandi — 421305, Thane, MH<br/><br/>sales@lotusinternational.co.in<br/>Mon—Sat, 10AM—7PM
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
