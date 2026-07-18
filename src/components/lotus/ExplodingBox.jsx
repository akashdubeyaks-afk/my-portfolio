import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, ContactShadows, PerspectiveCamera, Text } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

// Single Product Box with label
function ProductBox({ color, title, collapsedPos, explodedPos, exploded, index }) {
  const ref = useRef();
  const pos = useRef(new THREE.Vector3(...collapsedPos));
  const target = useMemo(() => new THREE.Vector3(...(exploded ? explodedPos : collapsedPos)), [exploded, explodedPos, collapsedPos]);
  const rotTarget = useRef(new THREE.Euler(0, 0, 0));

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Lerp position
    pos.current.lerp(target, delta * 2.5);
    ref.current.position.copy(pos.current);
    
    // Slight floating when exploded
    if (exploded) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002;
      ref.current.rotation.y += delta * 0.3;
    } else {
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0, delta * 3);
    }
  });

  return (
    <group ref={ref} position={collapsedPos}>
      <RoundedBox args={[0.7, 0.22, 0.5]} radius={0.04} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </RoundedBox>
      {/* Top label strip */}
      <RoundedBox args={[0.5, 0.02, 0.3]} radius={0.01} position={[0, 0.13, 0]}>
        <meshStandardMaterial color="#0A0A0A" />
      </RoundedBox>
      {/* Product name - 3D text */}
      <Text
        position={[0, 0.14, 0]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
        font="/my-portfolio/fonts/Syne-Bold.woff"
        fallback
      >
        {title}
      </Text>
    </group>
  );
}

// Outer Box that opens
function OuterBox({ exploded }) {
  const topRef = useRef();
  const bottomRef = useRef();
  
  useFrame((state, delta) => {
    if (topRef.current) {
      const targetY = exploded ? 2.2 : 0.55;
      topRef.current.position.y = THREE.MathUtils.lerp(topRef.current.position.y, targetY, delta * 2.5);
      topRef.current.rotation.x = THREE.MathUtils.lerp(topRef.current.rotation.x, exploded ? 0.6 : 0, delta * 2);
    }
    if (bottomRef.current) {
      const targetY = exploded ? -0.3 : 0;
      bottomRef.current.position.y = THREE.MathUtils.lerp(bottomRef.current.position.y, targetY, delta * 2.5);
    }
  });

  return (
    <group>
      {/* Bottom */}
      <group ref={bottomRef}>
        <RoundedBox args={[3.2, 0.2, 2.4]} radius={0.08} position={[0, -0.7, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#EDE9E3" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[3.2, 1.2, 0.15]} radius={0.04} position={[0, 0, -1.125]} castShadow>
          <meshStandardMaterial color="#EDE9E3" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.15, 1.2, 2.4]} radius={0.04} position={[-1.525, 0, 0]} castShadow>
          <meshStandardMaterial color="#EDE9E3" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.15, 1.2, 2.4]} radius={0.04} position={[1.525, 0, 0]} castShadow>
          <meshStandardMaterial color="#EDE9E3" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[3.2, 0.8, 0.15]} radius={0.04} position={[0, -0.2, 1.125]} castShadow>
          <meshStandardMaterial color="#EDE9E3" roughness={0.9} />
        </RoundedBox>
      </group>
      
      {/* Top Lid */}
      <group ref={topRef} position={[0, 0.55, 0]}>
        <RoundedBox args={[3.3, 0.18, 2.5]} radius={0.1} castShadow>
          <meshStandardMaterial color="#7E22CE" roughness={0.4} metalness={0.1} />
        </RoundedBox>
        <Text position={[0, 0.11, 0]} rotation={[-Math.PI/2,0,0]} fontSize={0.18} color="white" anchorX="center" fontWeight="bold">
          LOTUS
        </Text>
      </group>
    </group>
  );
}

export default function ExplodingBox({ onExplode }) {
  const [exploded, setExploded] = useState(false);

  const products = [
    { id: "epe-foam", title: "EPE", color: "#FEFEFE", collapsed: [0, 0.1, 0.2], exploded: [-1.4, 0.8, 0.8] },
    { id: "ep-foam", title: "EP FOAM", color: "#EDE9E3", collapsed: [0, 0.35, 0], exploded: [1.4, 0.9, 0.6] },
    { id: "cross-linked", title: "EVA", color: "#1A1A1A", collapsed: [0, 0.6, -0.1], exploded: [-1.2, 0.7, -0.9] },
    { id: "air-bubble", title: "BUBBLE", color: "#E3F2FD", collapsed: [0, -0.1, -0.2], exploded: [1.2, 0.2, -1.1] },
    { id: "custom", title: "CUSTOM", color: "#F3E5F5", collapsed: [0, 0.2, 0.1], exploded: [0, 1.3, 0] },
    { id: "honeycomb", title: "H-COMB", color: "#FFF8E1", collapsed: [0, -0.25, 0], exploded: [-0.2, -0.8, 0.5] },
  ];

  const handleClick = () => {
    const newState = !exploded;
    setExploded(newState);
    if (onExplode) onExplode(newState);
  };

  return (
    <div className="relative w-full h-[560px] md:h-[640px] rounded-[20px] overflow-hidden bg-[#F6F4EF] border border-black/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2.2, 4.5], fov: 32 }} gl={{ antialias: true }}>
        <color attach="background" args={["#F6F4EF"]} />
        <PerspectiveCamera makeDefault position={[0, 1.8, 4]} fov={38} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 4]} intensity={1.3} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#EDE7F6" />
        <spotLight position={[0, 5, 2]} intensity={0.7} angle={0.5} penumbra={0.5} castShadow />

        <group position={[0, -0.3, 0]}>
          <OuterBox exploded={exploded} />
          {products.map((p, i) => (
            <ProductBox
              key={p.id}
              title={p.title}
              color={p.color}
              collapsedPos={p.collapsed}
              explodedPos={p.exploded}
              exploded={exploded}
              index={i}
            />
          ))}
        </group>

        <ContactShadows position={[0, -1, 0]} opacity={0.3} scale={8} blur={2.5} far={3} resolution={512} />
        <Environment preset="studio" />
      </Canvas>

      {/* UI */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 border-b border-black/[0.06] bg-[#F6F4EF]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${exploded ? "bg-[#00C950] animate-pulse" : "bg-[#7E22CE]"}`} />
          <span className="mono text-[10px] tracking-widest uppercase font-bold">
            {exploded ? "Exploded View • All Parts Separated" : "Box Closed • All Products Inside Together"}
          </span>
        </div>
        <div className="hidden md:flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-black text-white mono text-[9px]">6 Products</span>
          <span className="px-2.5 py-1 rounded-full bg-white border border-black/10 mono text-[9px]">Click Box to Explode</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
        <div className="flex gap-2">
          {products.map((p) => (
            <div key={p.id} className="w-2 h-2 rounded-full" style={{ background: p.color, border: p.color === "#FEFEFE" ? "1px solid rgba(0,0,0,0.1)" : "none" }} />
          ))}
          <span className="mono text-[10px] ml-2 opacity-60">{exploded ? "Click again to assemble back" : "Click box to divide into separate parts"}</span>
        </div>
        <button
          onClick={handleClick}
          className="px-6 py-3 rounded-full bg-[#0A0A0A] text-white mono text-[11px] font-bold tracking-wide hover:bg-black transition flex items-center gap-2 shadow-lg"
        >
          {exploded ? "Assemble Back →" : "Explode Box →"}
          <span className={`w-5 h-5 rounded-full bg-white text-black grid place-items-center text-[10px] transition-transform ${exploded ? "rotate-180" : "rotate-45"}`}>↗</span>
        </button>
      </div>

      {/* Click overlay */}
      <div className="absolute inset-0 top-[56px] bottom-[64px] cursor-pointer" onClick={handleClick} title="Click to explode / assemble" />
    </div>
  );
}
