import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment } from "@react-three/drei";
import { useRef } from "react";

function FoamBlock({ position, color, scale = 1, rotation = [0,0,0] }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <RoundedBox ref={ref} args={[1, 0.6, 0.8]} radius={0.08} smoothness={4} position={position} rotation={rotation} scale={scale}>
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
      </RoundedBox>
    </Float>
  );
}

function CustomFoamShape() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.15;
  });
  return (
    <group ref={ref}>
      <Float>
        <RoundedBox args={[1.2, 0.3, 1]} radius={0.05} position={[0, 0, 0]}>
          <meshStandardMaterial color="#EDE7F6" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.08} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#7E22CE" emissive="#7E22CE" emissiveIntensity={0.2} />
        </RoundedBox>
      </Float>
    </group>
  );
}

export default function FoamScene() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-2, 2, 2]} intensity={0.6} color="#7E22CE" />
        <FoamBlock position={[2.8, 0.5, -1]} color="#EDE7F6" scale={1.2} />
        <FoamBlock position={[-2.5, -0.5, 0]} color="#E8F5E9" scale={1} rotation={[0.2, 0.5, 0]} />
        <FoamBlock position={[0, -1.8, -0.5]} color="#FFF3E0" scale={0.9} />
        <CustomFoamShape />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
