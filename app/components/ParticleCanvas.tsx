"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const particles = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 10;
      positions[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 10;
      positions[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color={isDark ? "#60a5fa" : "#00ffff"}
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={isDark ? 0.2 : 0.6}
      />
    </Points>
  );
}

export default function ParticleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 10, near: 1, far: 20 }}
      dpr={[1, 2]}
    >
      <Particles />
    </Canvas>
  );
}