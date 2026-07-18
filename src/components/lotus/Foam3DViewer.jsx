import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment, ContactShadows, PerspectiveCamera, useTexture, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function EPBlock({ color = "#F5F1EB", productColor = "#0A0A0A" }) {
  const groupRef = useRef();
  const productRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.25;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }
    if (productRef.current) {
      productRef.current.position.y = Math.sin(t * 0.8) * 0.03 + 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[3.2, 0.35, 2.4]} radius={0.12} smoothness={8} position={[0, -0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.88} metalness={0.02} />
      </RoundedBox>
      <RoundedBox args={[3.2, 1.6, 0.32]} radius={0.08} smoothness={6} position={[0, 0.1, -1.04]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.01} />
      </RoundedBox>
      <RoundedBox args={[0.32, 1.6, 2.4]} radius={0.08} smoothness={6} position={[-1.44, 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.01} />
      </RoundedBox>
      <RoundedBox args={[0.32, 1.6, 2.4]} radius={0.08} smoothness={6} position={[1.44, 0.1, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.01} />
      </RoundedBox>
      <RoundedBox args={[3.2, 0.7, 0.32]} radius={0.06} smoothness={6} position={[0, -0.35, 1.04]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.01} />
      </RoundedBox>

      <RoundedBox args={[2.5, 0.05, 1.75]} radius={0.04} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.1} />
      </RoundedBox>

      <group ref={productRef} position={[0, 0.15, 0]}>
        <RoundedBox args={[1.4, 0.18, 0.9]} radius={0.06} smoothness={4} castShadow>
          <meshStandardMaterial color={productColor} roughness={0.2} metalness={0.6} />
        </RoundedBox>
        <RoundedBox args={[1.25, 0.02, 0.75]} radius={0.03} position={[0, 0.11, 0]}>
          <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.8} emissive={productColor} emissiveIntensity={0.15} />
        </RoundedBox>
        <RoundedBox args={[0.3, 0.06, 0.3]} radius={0.04} position={[0.45, 0.12, 0.2]}>
          <meshStandardMaterial color="#000" roughness={0.2} metalness={0.9} />
        </RoundedBox>
        <pointLight intensity={0.8} color={productColor} distance={2.5} decay={2} />
      </group>
    </group>
  );
}

function EPEStack() {
  const groupRef = useRef();
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.08;
  });
  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <RoundedBox args={[2.8, 0.18, 1.8]} radius={0.05} position={[0, i * 0.35 - 0.35, 0]} castShadow receiveShadow>
            <meshStandardMaterial color={i === 1 ? "#FEFEFE" : "#F5F1EB"} roughness={0.92} metalness={0.01} transparent opacity={0.95} />
          </RoundedBox>
        </Float>
      ))}
    </group>
  );
}

function HoneycombStructure() {
  const hexPositions = useMemo(() => {
    const pos = [];
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        const offsetX = (z % 2) * 0.5;
        pos.push([x + offsetX, 0, z * 0.866]);
      }
    }
    return pos;
  }, []);
  const groupRef = useRef();
  useFrame((s) => { if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.05; });
  return (
    <group ref={groupRef}>
      <RoundedBox args={[2.5, 0.15, 2.2]} radius={0.08} position={[0, -0.5, 0]}><meshStandardMaterial color="#D7CCC8" roughness={0.8} /></RoundedBox>
      <group position={[0, 0.1, 0]}>
        {hexPositions.map(([x, y, z], i) => (
          <group key={i} position={[x, y, z]}>
            <mesh castShadow><cylinderGeometry args={[0.32, 0.32, 0.6, 6]} /><meshStandardMaterial color="#FFF8E1" roughness={0.7} /></mesh>
            <mesh><cylinderGeometry args={[0.28, 0.28, 0.62, 6]} /><meshBasicMaterial color="#000" transparent opacity={0.85} /></mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function BubbleWrap() {
  const bubbles = useMemo(() => {
    const arr = [];
    for (let x = -2; x <= 2; x++) {
      for (let z = -1.5; z <= 1.5; z++) {
        if (Math.random() > 0.15) arr.push([x * 0.45 + (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, z * 0.5]);
      }
    }
    return arr;
  }, []);
  const groupRef = useRef();
  useFrame((s) => { if (groupRef.current) groupRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.05; });
  return (
    <group ref={groupRef}>
      <mesh rotation={[-0.1, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 2.2]} />
        <MeshTransmissionMaterial thickness={0.05} roughness={0.1} transmission={0.95} ior={1.4} chromaticAberration={0.02} distortion={0.1} color="#E3F2FD" />
      </mesh>
      {bubbles.map(([x, y, z], i) => (
        <Float key={i} speed={0.5 + Math.random()} floatIntensity={0.2}>
          <mesh position={[x, y + 0.06, z]} castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <MeshTransmissionMaterial thickness={0.02} roughness={0.05} transmission={0.9} ior={1.33} color="white" />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function LotusFlowerPremium() {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });
  return (
    <group ref={groupRef} scale={1.3}>
      <mesh><sphereGeometry args={[0.18, 24, 24]} /><meshStandardMaterial color="#FFC107" emissive="#FF8F00" emissiveIntensity={0.2} roughness={0.3} metalness={0.2} /></mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <group key={`inner-${i}`} rotation={[0, angle, 0]}>
            <mesh position={[0, 0.1, 0.42]} rotation={[0.4, 0, 0]} castShadow>
              <sphereGeometry args={[0.32, 20, 20, 0, Math.PI]} />
              <meshStandardMaterial color="#CE93D8" roughness={0.4} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2 + 0.26;
        return (
          <group key={`outer-${i}`} rotation={[0, angle, 0]}>
            <mesh position={[0, -0.05, 0.58]} rotation={[0.6, 0, 0]} castShadow>
              <sphereGeometry args={[0.42, 24, 24, 0, Math.PI]} />
              <meshStandardMaterial color="#7E22CE" roughness={0.5} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <group key={`leaf-${i}`} rotation={[0, angle, 0]}>
            <mesh position={[0, -0.25, 0.75]} rotation={[1.1, 0, 0]} castShadow>
              <sphereGeometry args={[0.35, 16, 16, 0, Math.PI]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.7} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}
      <pointLight intensity={0.6} color="#7E22CE" distance={3} decay={2} />
    </group>
  );
}

export default function Foam3DViewer({ variant = "default", height = "420px" }) {
  const [isHover, setIsHover] = useState(false);

  const getComponent = () => {
    switch (variant) {
      case "epe-foam": return <EPEStack />;
      case "ep-foam": return <EPBlock color="#F5F1EB" productColor="#0A0A0A" />;
      case "cross-linked": return <EPBlock color="#1A1A1A" productColor="#FF6F00" />;
      case "air-bubble": return <BubbleWrap />;
      case "custom-fitments": return <EPBlock color="#F3E5F5" productColor="#7E22CE" />;
      case "honeycomb": return <HoneycombStructure />;
      case "lotus": return <LotusFlowerPremium />;
      default: return <EPBlock color="#F5F1EB" productColor="#7E22CE" />;
    }
  };

  const titles = {
    "epe-foam": "EPE Foam • 3 Sheets Stack • 25kg/m³",
    "ep-foam": "EP Foam • Custom Cavity • Shockproof",
    "cross-linked": "Cross Linked • Black • High Resilience",
    "air-bubble": "Air Bubble • 10mm • Transparent",
    "custom-fitments": "Custom Fitment • Zero Movement • 48HR",
    "honeycomb": "Honeycomb • Hexagonal • Eco Strong",
    "lotus": "Lotus Flower • 3D Logo • Purple + Green",
    "default": "Custom Foam • Drag to Rotate"
  };

  return (
    <div className="relative w-full rounded-[16px] overflow-hidden bg-[#F6F4EF] border border-black/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.04)]" style={{ height }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.5, 3.8], fov: 32 }} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
        <color attach="background" args={["#F6F4EF"]} />
        <fog attach="fog" args={["#F6F4EF", 6, 12]} />
        <PerspectiveCamera makeDefault position={[2.8, 1.6, 2.8]} fov={34} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 8, 5]} intensity={1.4} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
        <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#EDE7F6" />
        <spotLight position={[0, 4, 2]} intensity={0.6} angle={0.4} penumbra={0.6} color="#FFFFFF" castShadow />
        <group position={[0, -0.2, 0]}>{getComponent()}</group>
        <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={6} blur={2.8} far={2.5} resolution={512} color="#000000" />
        <Environment preset="studio" background={false} />
      </Canvas>

      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-3 border-b border-black/[0.06] bg-[#F6F4EF]/80 backdrop-blur-md">
        <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C950] animate-pulse" /><span className="mono text-[10px] tracking-[0.15em] uppercase font-medium">3D • {titles[variant] || titles.default}</span></div>
        <div className="flex gap-2"><span className="px-2 py-1 rounded-full bg-black text-white mono text-[9px]">Drag • Rotate</span><span className="hidden md:block px-2 py-1 rounded-full bg-white border border-black/10 mono text-[9px]">Scroll • Zoom</span></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end bg-gradient-to-t from-black/5 to-transparent pointer-events-none">
        <div className="px-3 py-1.5 rounded-full bg-[#0A0A0A] text-white mono text-[10px] flex items-center gap-2 backdrop-blur-md">Real-time WebGL • 60fps</div>
      </div>

      <motion.div initial={false} animate={{ opacity: isHover ? 1 : 0, y: isHover ? 0 : 8 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-black text-white px-4 py-2 rounded-full mono text-[10px] tracking-widest uppercase hidden lg:flex items-center gap-2">
        <span>●</span> Drag to explore • Scroll to zoom
      </motion.div>
    </div>
  );
}
