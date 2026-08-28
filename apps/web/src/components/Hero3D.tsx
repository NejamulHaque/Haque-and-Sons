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
import { ArrowRight, Sparkles as SparklesIcon, Terminal, Shield, Zap } from "lucide-react";

function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <Sphere ref={meshRef} args={[1.8, 128, 128]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          distort={0.45}
          speed={2.2}
          roughness={0.12}
          metalness={0.9}
          emissive="#4c1d95"
          emissiveIntensity={0.6}
        />
      </Sphere>
    </Float>
  );
}

function OrbitingRing({ radius, color, speed, rotOffset = 0 }: { radius: number; color: string; speed: number; rotOffset?: number }) {
  const ringRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed + rotOffset) * 0.5 + 1.2;
      ringRef.current.rotation.y = state.clock.elapsedTime * speed * 0.8;
    }
  });

  return (
    <Torus ref={ringRef} args={[radius, 0.02, 16, 100]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.7}
      />
    </Torus>
  );
}

const PARTICLE_COUNT = 350;
const INITIAL_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
  INITIAL_POSITIONS[i] = ((Math.sin(i * 99.123 + 45.67) * 10000) % 1) * 18;
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.08;
    }
  });

  const bufferAttr = useMemo(() => new THREE.BufferAttribute(INITIAL_POSITIONS, 3), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={bufferAttr} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#22d3ee" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function Hero3D() {
  const chromaOffset = useMemo(() => new THREE.Vector2(0.0015, 0.0015), []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* 3D Canvas Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[6, 6, 5]} intensity={1.5} color="#93c5fd" />
          <pointLight position={[-6, -4, 2]} intensity={1.2} color="#a855f7" />
          <pointLight position={[0, 4, 3]} intensity={1} color="#06b6d4" />
          <AnimatedOrb />
          <OrbitingRing radius={2.6} color="#06b6d4" speed={0.4} />
          <OrbitingRing radius={3.1} color="#ec4899" speed={-0.3} rotOffset={Math.PI / 3} />
          <ParticleField />
          <Stars radius={50} depth={60} count={2000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={10} size={2.5} speed={0.4} opacity={0.5} color="#06b6d4" />
          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.7} mipmapBlur intensity={1.1} radius={0.8} />
            <ChromaticAberration
              offset={chromaOffset}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Atmospheric Gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-16">
        {/* Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase text-cyan-300 border border-cyan-500/30 rounded-full bg-cyan-950/40 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.25)]"
        >
          <SparklesIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Next-Gen Engineering Studio</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] text-white"
        >
          Building the{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]">
            Future of Software
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Haque & Sons crafts high-performance AI command centers, interactive 3D platforms,
          and zero-trust software architectures — engineered by{" "}
          <span className="text-white font-semibold underline decoration-cyan-500/50 decoration-2 underline-offset-4">
            Nejamul Haque
          </span>
          .
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-gray-400"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-yellow-400" /> Next.js 16 + React 19
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> DevSecOps Hardened
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" /> 60+ Language Execution
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() =>
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore Ecosystem</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() =>
              document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-cyan-400/50 text-white font-semibold rounded-full transition-all backdrop-blur-sm hover:bg-white/5 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Estimate Project Scope
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-7 h-11 border-2 border-white/25 rounded-full flex items-start justify-center pt-2 cursor-pointer hover:border-cyan-400 transition-colors bg-black/40 backdrop-blur-sm"
          aria-label="Scroll down"
        >
          <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full" />
        </motion.button>
      </motion.div>
    </section>
  );
}
