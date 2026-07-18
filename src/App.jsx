import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Work from "./pages/Work";
import Project from "./pages/Project";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Lenis smooth scroll - re-init on route change
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="grain" />
      <AnimatePresence mode="wait">{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>

      <div className={`${loading ? "h-screen overflow-hidden" : ""} bg-[#050507] text-white min-h-screen`}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
            <Route path="/work/:id" element={<PageWrapper><Project /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
          </Routes>
        </AnimatePresence>

        {/* Progress bar */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-[2px] bg-white origin-left z-[60]"
          style={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0 }}
        />
      </div>
    </>
  );
}
