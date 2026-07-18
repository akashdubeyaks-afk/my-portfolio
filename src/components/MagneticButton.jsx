import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ children, className = "", strength = 0.35, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { damping: 12, stiffness: 200 });
  const sy = useSpring(y, { damping: 12, stiffness: 200 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (window.innerWidth < 1024) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.4);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
