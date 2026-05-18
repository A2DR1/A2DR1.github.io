"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function IcosahedronWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.22;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial
        color="#d4a853"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function InnerIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = -state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.1, 0]} />
      <meshBasicMaterial
        color="#c8834a"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1500;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#d4a853"
        size={0.025}
        sizeAttenuation
        opacity={0.6}
      />
    </Points>
  );
}

function GlowSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const s = 1 + 0.05 * Math.sin(state.clock.elapsedTime * 1.5);
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#1d4ed8" transparent opacity={0.04} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#d4a853" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#c8834a" />
        <GlowSphere />
        <IcosahedronWireframe />
        <InnerIcosahedron />
        <ParticleField />
      </Canvas>
    </div>
  );
}
