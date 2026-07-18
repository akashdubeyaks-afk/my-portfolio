import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/work", label: "Work (04)" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 md:py-5 flex justify-between items-center transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-[#050507]/70 border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white text-black grid place-items-center font-black text-xs">A</div>
          <span className="hidden md:block text-xs tracking-[0.2em] font-bold uppercase">Akash — Folio ©2026</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
          {links.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-5 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase transition-all ${
                  active ? "bg-white text-black" : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF94]/10 text-[#00FF94] text-[10px] tracking-widest border border-[#00FF94]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" /> Available
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-white text-black grid place-items-center"
          >
            <div className="space-y-1">
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 3 : 0 }} className="w-4 h-px bg-current" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-4 h-px bg-current" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -3 : 0 }} className="w-4 h-px bg-current" />
            </div>
          </button>
          <Link to="/contact" className="hidden lg:grid w-10 h-10 rounded-full bg-white text-black place-items-center hover:scale-110 transition">↗</Link>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ y: menuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 bg-[#050507] p-6 pt-28 lg:hidden"
      >
        <div className="space-y-2">
          {links.map((l, i) => (
            <motion.div key={l.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }} transition={{ delay: 0.1 + i * 0.07 }}>
              <Link onClick={() => setMenuOpen(false)} to={l.to} className="block text-[14vw] leading-[0.85] font-black tracking-tighter hover:text-white/60 transition">
                {l.label.split(" ")[0]}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs uppercase tracking-widest opacity-40">
          <span>Nashik, IN</span><span>hello@folio.design</span>
        </div>
      </motion.div>
    </>
  );
}
