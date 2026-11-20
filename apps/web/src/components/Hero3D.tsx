"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Torus,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowRight, Sparkles as SparklesIcon, Terminal, Shield, Zap, GraduationCap } from "lucide-react";
import Link from "next/link";

function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.16;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.8, 128, 128]}>
        <MeshDistortMaterial
          color="#1e1e24"
          distort={0.35}
          speed={1.8}
          roughness={0.15}
          metalness={0.92}
          emissive="#0a0a12"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  );
}

function OrbitingRing({ radius, color, speed, rotOffset = 0 }: { radius: number; color: string; speed: number; rotOffset?: number }) {
  const ringRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed + rotOffset) * 0.4 + 1.2;
      ringRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    }
  });

  return (
    <Torus ref={ringRef} args={[radius, 0.015, 16, 120]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.0}
        transparent
        opacity={0.5}
      />
    </Torus>
  );
}

const PARTICLE_COUNT = 300;
const INITIAL_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
  INITIAL_POSITIONS[i] = ((Math.sin(i * 99.123 + 45.67) * 10000) % 1) * 18;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.06;
    }
  });

  const bufferAttr = useMemo(() => new THREE.BufferAttribute(INITIAL_POSITIONS, 3), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={bufferAttr} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export function Hero3D() {
  const chromaOffset = useMemo(() => new THREE.Vector2(0.0008, 0.0008), []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* 3D Canvas Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[6, 6, 5]} intensity={1.8} color="#ffffff" />
          <pointLight position={[-6, -4, 2]} intensity={0.8} color="#38bdf8" />
          <pointLight position={[0, 4, 3]} intensity={0.8} color="#e0f2fe" />
          <AnimatedOrb />
          <OrbitingRing radius={2.6} color="#71717a" speed={0.3} />
          <OrbitingRing radius={3.1} color="#06b6d4" speed={-0.25} rotOffset={Math.PI / 3} />
          <ParticleField />
          <Stars radius={50} depth={60} count={1200} factor={3} saturation={0} fade speed={0.8} />
          <Sparkles count={60} scale={10} size={2} speed={0.3} opacity={0.3} color="#ffffff" />
          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.6} radius={0.7} />
            <ChromaticAberration
              offset={chromaOffset}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.05} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Atmospheric Gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-20">
        {/* Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-8 text-xs font-medium tracking-wide text-neutral-300 border border-white/[0.12] rounded-full bg-white/[0.04] backdrop-blur-xl"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Gen Engineering Studio</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.06] text-white"
        >
          Building the{" "}
          <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Future of Software
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Haque & Sons crafts high-performance AI command centers, interactive 3D platforms,
          and zero-trust software architectures — engineered by{" "}
          <span className="text-white font-medium">
            Nejamul Haque
          </span>
          .
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-wrap justify-center gap-2.5 text-xs text-neutral-300"
        >
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> Next.js 16 + React 19
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-cyan-400" /> DevSecOps Hardened
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> 60+ Language Execution
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row gap-3.5 justify-center items-center"
        >
          <Link
            href="/internships"
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-black hover:bg-neutral-200 font-medium text-sm rounded-full transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-black" />
            <span>Internship Program</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            onClick={() =>
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-7 py-3.5 bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.12] font-medium text-sm rounded-full transition-all active:scale-[0.98] backdrop-blur-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore Ecosystem</span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </button>
          
          <button
            onClick={() =>
              document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-6 py-3.5 text-neutral-400 hover:text-white font-medium text-sm rounded-full transition-colors cursor-pointer"
          >
            Estimate Project Scope
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center pt-2 cursor-pointer hover:border-white/40 transition-colors bg-black/40 backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <div className="w-1 h-2 bg-neutral-300 rounded-full" />
        </motion.button>
      </motion.div>
    </section>
  );
}
