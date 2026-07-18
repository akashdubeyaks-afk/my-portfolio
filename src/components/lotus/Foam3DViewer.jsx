import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function FoamBlock({ color = "#EDE9E3", cavityColor = "#0A0A0A", productColor = "#7E22CE", showProduct = true }) {
  const groupRef = useRef();
  const productRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    }
    if (productRef.current && showProduct) {
      productRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Foam Block - Bottom part */}
      <RoundedBox args={[3, 0.8, 2]} radius={0.08} smoothness={4} position={[0, -0.6, 0]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* Left wall */}
      <RoundedBox args={[0.4, 1.4, 2]} radius={0.05} position={[-1.3, 0.3, 0]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* Right wall */}
      <RoundedBox args={[0.4, 1.4, 2]} radius={0.05} position={[1.3, 0.3, 0]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* Back wall */}
      <RoundedBox args={[2.2, 1.4, 0.4]} radius={0.05} position={[0, 0.3, -0.8]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* Front wall - lower to see inside */}
      <RoundedBox args={[2.2, 0.6, 0.4]} radius={0.05} position={[0, -0.1, 0.8]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </RoundedBox>

      {/* Product inside cavity */}
      {showProduct && (
        <group ref={productRef} position={[0, 0.1, 0]}>
          <RoundedBox args={[1.2, 0.8, 0.9]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color={productColor} roughness={0.3} metalness={0.2} emissive={productColor} emissiveIntensity={0.1} />
          </RoundedBox>
          {/* Highlight */}
          <pointLight intensity={0.5} color={productColor} distance={2} />
        </group>
      )}

      {/* Shadow catcher fake */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
        <planeGeometry args={[5, 5]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function LotusPetal({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={[0.3, 16, 16, 0, Math.PI]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

function LotusFlower3D() {
  const groupRef = useRef();
  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = s.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Center */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFC107" emissive="#FFC107" emissiveIntensity={0.3} />
      </mesh>
      {/* Petals - purple */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <LotusPetal
            key={i}
            position={[Math.cos(angle) * 0.35, Math.sin(angle) * 0.15, Math.sin(angle) * 0.35]}
            rotation={[0, -angle, 0.5]}
            color="#7E22CE"
          />
        );
      })}
      {/* Green leaves */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2 + 0.5;
        return (
          <mesh key={`leaf-${i}`} position={[Math.cos(angle) * 0.6, -0.2, Math.sin(angle) * 0.6]} rotation={[1, angle, 0]}>
            <sphereGeometry args={[0.25, 12, 12, 0, Math.PI]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Foam3DViewer({ variant = "default", color, productColor, showProduct = true, autoRotate = true, enableZoom = true, height = "400px" }) {
  const [isInteracting, setIsInteracting] = useState(false);

  const getColors = () => {
    switch (variant) {
      case "epe-foam": return { foam: "#FAFAFA", product: "#7E22CE" };
      case "ep-foam": return { foam: "#EDE9E3", product: "#0A0A0A" };
      case "cross-linked": return { foam: "#1A1A1A", product: "#FF6F00" };
      case "air-bubble": return { foam: "#E3F2FD", product: "#0277BD" };
      case "custom-fitments": return { foam: "#F3E5F5", product: "#7E22CE" };
      case "honeycomb": return { foam: "#FFF8E1", product: "#795548" };
      case "lotus": return { foam: "#F3E5F5", product: "#7E22CE" };
      default: return { foam: color || "#EDE9E3", product: productColor || "#7E22CE" };
    }
  };

  const colors = getColors();

  return (
    <div className="relative w-full rounded-[16px] overflow-hidden bg-[#F6F4EF] border border-black/5" style={{ height }}>
      <Canvas
        shadows
        camera={{ position: [3, 2, 3], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerDown={() => setIsInteracting(true)}
        onPointerUp={() => setIsInteracting(false)}
      >
        <PerspectiveCamera makeDefault position={[3.5, 1.8, 3.5]} fov={38} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} />
        <pointLight position={[0, 3, 0]} intensity={0.5} color={colors.product} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4} floatingRange={[-0.1, 0.1]}>
          {variant === "lotus" ? <LotusFlower3D /> : <FoamBlock color={colors.foam} productColor={colors.product} showProduct={showProduct} />}
        </Float>

        <Environment preset="studio" />
        <OrbitControls
          enablePan={false}
          enableZoom={enableZoom}
          minDistance={2}
          maxDistance={8}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={!isInteracting && autoRotate}
          autoRotateSpeed={0.8}
          dampingFactor={0.05}
          enableDamping
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.12} />
        </mesh>
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="px-2.5 py-1 rounded-full bg-black text-white mono text-[9px] uppercase tracking-widest">3D • Drag to Rotate</span>
        <span className="hidden md:flex px-2.5 py-1 rounded-full bg-white/80 backdrop-blur border border-black/10 mono text-[9px] uppercase">Scroll to Zoom</span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
        <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-black/5 mono text-[10px] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] animate-pulse" /> {variant.toUpperCase()} • Custom Generated
        </div>
        <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[10px]">3D</div>
      </div>
    </div>
  );
}
