import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Environment, Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingShapes() {
  const group = useRef();
  const torusRef = useRef();
  const sphereRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.05;
      group.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.15;
    }
  });

  // Points cloud
  const points = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  return (
    <group ref={group}>
      {/* Distorted torus - hero */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Torus ref={torusRef} args={[1.6, 0.4, 32, 100]} position={[2.5, 0.2, -1]}>
          <MeshDistortMaterial color="#7C5CFC" emissive="#7C5CFC" emissiveIntensity={0.2} roughness={0.1} metalness={0.8} distort={0.4} speed={2} />
        </Torus>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
        <Sphere ref={sphereRef} args={[0.9, 64, 64]} position={[-2, -0.8, 0.5]}>
          <MeshDistortMaterial color="#00FF94" emissive="#00FF94" emissiveIntensity={0.15} roughness={0.2} metalness={0.5} distort={0.6} speed={1.5} />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
        <Torus args={[0.6, 0.15, 32, 64]} position={[0, 1.8, -2]} rotation={[1, 1, 0]}>
          <meshStandardMaterial color="#FF4D00" emissive="#FF4D00" emissiveIntensity={0.2} roughness={0.3} metalness={0.7} />
        </Torus>
      </Float>

      {/* Particles */}
      <Points positions={points} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.015} sizeAttenuation depthWrite={false} opacity={0.4} />
      </Points>
    </group>
  );
}

export default function Scene3D({ variant = "home" }) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: variant === "home" ? 45 : 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#7C5CFC" />
        <pointLight position={[3, -2, 1]} intensity={0.6} color="#00FF94" />
        <FloatingShapes />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
