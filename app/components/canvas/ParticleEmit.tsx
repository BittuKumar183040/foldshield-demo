/* eslint-disable react-hooks/immutability */
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleEmit
 * ------------
 * Renders a soft, glowing particle stream that emits from the bottom of its
 * container and rises upward, fading in then out before being recycled
 * ("disposed") back to the bottom with fresh randomized properties.
 *
 * Usage:
 *   <ParticleEmit width="100%" height="400px" particleColor="#ff7a3d" />
 */

export interface ParticleEmitProps {
  /** CSS width of the container. Also controls the horizontal spread of
   *  the emission area (wider container = wider spawn area). e.g. "100%", "50%", "400px" */
  width?: string | number;
  /** CSS height of the container. e.g. "100%", "50%", "300px" */
  height?: string | number;
  /** Particle color, accepted by THREE.Color. e.g. "#ff7a3d", 0xff7a3d, "hsl(18, 100%, 64%)" */
  particleColor?: THREE.ColorRepresentation;
  /** Number of particles alive at once. Default 300 */
  count?: number;
  /** How far (in world units) a particle travels up before it's recycled. Default 3 */
  riseDistance?: number;
  /** Speed multiplier for the rise. Lower = slower, gentler drift. Default 0.4 */
  speed?: number;
  /** Optional className passed to the wrapping div */
  className?: string;
}

// ---- Particle field (must live inside <Canvas>) ----------------------------

interface ParticleFieldProps {
  color: THREE.ColorRepresentation;
  count: number;
  riseDistance: number;
  speed: number;
}

function ParticleField({ color, count, riseDistance, speed }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Horizontal spawn spread tracks the visible viewport width so it matches
  // the container's CSS width.
  const spreadX = Math.max(viewport.width * 0.7, 0.5);

  // Particles rise centered on the origin: start at -riseDistance/2 (bottom of
  // frame) and travel to +riseDistance/2 (top of frame), since the camera
  // looks directly at the origin.
  const startY = -riseDistance / 2;

  // Per-particle simulation state, kept in plain arrays (not React state) so
  // we can mutate every frame without re-rendering.
  const { positions, sizes, opacities, life, maxLife, driftX, driftSeed } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);
    const life = new Float32Array(count);
    const maxLife = new Float32Array(count);
    const driftX = new Float32Array(count);
    const driftSeed = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      resetParticle(i, positions, sizes, life, maxLife, driftX, driftSeed, spreadX, startY, true);
      opacities[i] = 0;
    }

    return { positions, sizes, opacities, life, maxLife, driftX, driftSeed };
  }, [count, spreadX, startY]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [positions, sizes, opacities]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute float aOpacity;
        varying float vOpacity;
        void main() {
          vOpacity = aOpacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // -mvPosition.z is the distance from the camera. Keep the camera a
          // few units away (see camera position below) so this never divides
          // by a near-zero number, which is what makes points balloon in size.
          gl_PointSize = aSize * (8.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vOpacity;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = length(uv);
          float falloff = smoothstep(0.5, 0.1, dist);
          float glow = pow(falloff, 2.2);
          gl_FragColor = vec4(uColor, glow * vOpacity);
        }
      `,
    });
  }, [color]);

  useFrame((_, delta) => {
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const sizeAttr = geometry.getAttribute("aSize") as THREE.BufferAttribute;
    const opAttr = geometry.getAttribute("aOpacity") as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      life[i] += delta * speed;
      const t = life[i] / maxLife[i]; // 0 -> 1 over particle lifetime

      if (t >= 1) {
        // "Dispose" and recycle the particle back to the bottom.
        resetParticle(i, positions, sizes, life, maxLife, driftX, driftSeed, spreadX, startY, false);
        opacities[i] = 0;
        continue;
      }

      const ix = i * 3;
      positions[ix + 1] = startY + t * riseDistance; // rise upward
      positions[ix] += Math.sin(life[i] * 1.5 + driftSeed[i]) * driftX[i] * delta; // gentle drift

      // Fade in quickly, fade out slowly, like an ember cooling as it rises.
      opacities[i] = Math.sin(Math.PI * Math.pow(t, 0.6)) * (1 - t * 0.3);
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    opAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function resetParticle(
  i: number,
  positions: Float32Array,
  sizes: Float32Array,
  life: Float32Array,
  maxLife: Float32Array,
  driftX: Float32Array,
  driftSeed: Float32Array,
  spreadX: number,
  startY: number,
  initial: boolean
) {
  const ix = i * 3;
  positions[ix] = (Math.random() - 0.5) * spreadX;
  positions[ix + 1] = startY; // start at the bottom of the frame
  positions[ix + 2] = (Math.random() - 0.5) * 0.5;

  sizes[i] = 2 + Math.random() * 4;
  // Longer lifetimes = slower, gentler ash-like drift instead of a fast shot upward.
  maxLife[i] = 3 + Math.random() * 3;
  life[i] = initial ? Math.random() * maxLife[i] : 0; // stagger initial spawn so the stream looks continuous
  driftX[i] = (Math.random() - 0.5) * 0.4;
  driftSeed[i] = Math.random() * Math.PI * 2;
}

// ---- Public wrapper component ----------------------------------------------

export default function ParticleEmit({
  width = "100%",
  height = "100%",
  particleColor = "#ff7a3d",
  count = 100,
  riseDistance = 3,
  speed = 0.5,
  className,
}: ParticleEmitProps) {
  const cssWidth = typeof width === "number" ? `${width}px` : width;
  const cssHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={className}
      style={{
        width: cssWidth,
        height: cssHeight,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas
        // Camera sits back on the z-axis looking at the origin. Keeping real
        // distance here (not [0,0,0]) is what keeps point sizing stable.
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ParticleField
          color={particleColor}
          count={count}
          riseDistance={riseDistance}
          speed={speed}
        />
      </Canvas>
    </div>
  );
}