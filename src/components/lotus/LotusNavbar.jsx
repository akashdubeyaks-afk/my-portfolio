import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LotusNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center transition-all ${
          scrolled ? "bg-[#FFFEFB]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.04)]" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-[12px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] p-1.5 grid place-items-center">
            <img src="/my-portfolio/lotus-logo.png" alt="Lotus" className="w-full h-full object-contain" onError={(e)=>{e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
            <div className="hidden w-8 h-8 rounded-full bg-[#7E22CE] text-white grid place-items-center font-black text-xs">L</div>
          </div>
          <div className="leading-none">
            <div className="font-black tracking-tight text-[16px] md:text-[18px]" style={{ fontFamily: 'Syne' }}><span className="text-[#7E22CE]">Lotus</span> <span className="text-[#2E7D32]">International</span></div>
            <div className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase opacity-60 bg-[#7E22CE] text-white px-1.5 py-0.5 rounded mt-0.5 inline-block">every packaging has a story</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.06]">
          {links.map((l) => {
            const active = loc.pathname === l.to || (l.to !== "/" && loc.pathname.startsWith(l.to));
            return (
              <Link key={l.to} to={l.to} className={`px-5 py-2 rounded-full text-[12px] tracking-wide font-medium transition ${active ? "bg-[#7E22CE] text-white shadow" : "hover:bg-black/5"}`}>
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a href="tel:+919322021868" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-bold hover:bg-black transition">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" /> +91 9322021868
          </a>
          <Link to="/contact" className="px-5 py-2.5 rounded-full bg-[#7E22CE] text-white text-xs md:text-sm font-bold hover:bg-[#6A1B9A] transition hidden md:block">Get Quote</Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-full bg-[#1A1A1A] text-white grid place-items-center">
            <div className="space-y-1">
              <motion.div animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="w-4 h-0.5 bg-current" />
              <motion.div animate={{ opacity: open ? 0 : 1 }} className="w-4 h-0.5 bg-current" />
              <motion.div animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="w-4 h-0.5 bg-current" />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: "0%" }} exit={{ opacity: 0, y: "-100%" }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-40 bg-[#FFFEFB] p-6 pt-24 lg:hidden">
            <div className="space-y-1">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block py-4 text-[12vw] leading-[0.85] font-black tracking-tighter border-b border-black/5">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-10 p-6 rounded-[20px] bg-[#1A1A1A] text-white">
              <div className="text-xs uppercase tracking-widest opacity-60">Contact</div>
              <div className="mt-2 font-bold">sales@lotusinternational.co.in</div>
              <div className="font-bold">+91 9322021868</div>
              <div className="mt-4 text-xs opacity-60">Jai Jalram Complex, Gala No 11/6-1, Pimplas, Bhiwandi - 421305</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
