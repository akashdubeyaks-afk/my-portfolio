import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import LotusNavbar from "./components/lotus/LotusNavbar";
import LotusLoader from "./components/lotus/LotusLoader";

import HomeLotus from "./pages/lotus/HomeLotus";
import ProductsLotus from "./pages/lotus/ProductsLotus";
import ProductDetail from "./pages/lotus/ProductDetail";
import AboutLotus from "./pages/lotus/AboutLotus";
import ContactLotus from "./pages/lotus/ContactLotus";

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const safety = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(safety);
  }, []);

  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    const rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading, location.pathname]);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <div className="grain" style={{ opacity: 0.03 }} />
      <AnimatePresence mode="wait">
        {loading && <LotusLoader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A]">
          <LotusNavbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrap><HomeLotus /></PageWrap>} />
              <Route path="/products" element={<PageWrap><ProductsLotus /></PageWrap>} />
              <Route path="/products/:id" element={<PageWrap><ProductDetail /></PageWrap>} />
              <Route path="/about" element={<PageWrap><AboutLotus /></PageWrap>} />
              <Route path="/contact" element={<PageWrap><ContactLotus /></PageWrap>} />
              <Route path="*" element={<PageWrap><HomeLotus /></PageWrap>} />
            </Routes>
          </AnimatePresence>

          <footer className="bg-[#1A1A1A] text-white px-6 md:px-10 py-12">
            <div className="max-w-[1600px] mx-auto grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
              <div>
                <div className="flex items-center gap-3">
                  <img src="/my-portfolio/lotus-logo.png" alt="Lotus International" className="h-[44px] w-auto object-contain" style={{ background: 'transparent', filter: 'brightness(0) invert(1)' }} />
                </div>
                <p className="mt-4 text-sm text-white/60 max-w-[320px]">One of the largest fabricator and exporters of EPE foam. Custom shapes as per order for safe delivery. 1.5 Lakh sqft plant, ISO 9001 certified.</p>
                <div className="mt-6 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase">ISO 9001</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase">Since 2019</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase">Bhiwandi</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-4">Products</div>
                <div className="space-y-2 text-sm text-white/70"><div>EPE Foam</div><div>EP Foam</div><div>Cross Linked Foam</div><div>Air Bubble Bags</div><div>Custom Fitments</div><div>Honeycomb Paper</div></div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-4">Company</div>
                <div className="space-y-2 text-sm text-white/70"><div>About Us</div><div>Culture & Values</div><div>Our Factory</div><div>Careers</div><div>Contact</div></div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-4">Contact</div>
                <div className="space-y-1 text-sm"><div className="font-bold">sales@lotusinternational.co.in</div><div>+91 9322021868</div><div className="text-white/50 text-xs mt-3">Jai Jalram Complex, Gala No 11/6-1, Pimplas, Bhiwandi - 421305</div><div className="text-white/50 text-xs">Mon - Sat, 10am - 7pm</div></div>
              </div>
            </div>
            <div className="max-w-[1600px] mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[10px] tracking-widest uppercase opacity-40">
              <span>©2026 Lotus International • All Rights Reserved</span>
              <span>Fast Load • 3 Sec • Pure 3D • Exploding Box</span>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
