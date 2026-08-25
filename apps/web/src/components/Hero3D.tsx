"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Environment,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import * as THREE from "three";

function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.8, 128, 128]}>
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.4}
          speed={2}
          roughness={0.15}
          metalness={0.95}
          emissive="#4c1d95"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 15;
    return pos;
  }, []);
  const pointsRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });
  const bufferAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={bufferAttr} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#06b6d4" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function Hero3D() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#e0e7ff" />
          <pointLight position={[-5, -3, 2]} intensity={0.8} color="#7c3aed" />
          <AnimatedOrb />
          <ParticleField />
          <Stars radius={50} depth={60} count={1500} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={80} scale={8} size={2} speed={0.3} opacity={0.4} color="#06b6d4" />
          <Environment preset="city" />
          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.2} radius={0.8} />
            <ChromaticAberration
              offset={[0.002, 0.002] as any}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-500/5 backdrop-blur-sm"
        >
          Next-Gen Software Studio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: "#ffffff" }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1]"
        >
          Building the{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Future of Software
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ color: "#9ca3af" }}
          className="mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Haque & Sons delivers enterprise-grade AI, collaborative platforms, and financial software
          — engineered for scale, security, and elegance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <button
            onClick={() =>
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">Explore Ecosystem</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
          </button>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 border border-white/15 hover:border-white/30 text-white font-semibold rounded-full transition-all backdrop-blur-sm hover:bg-white/5 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator — fixed at very bottom, no overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-7 h-11 border-2 border-white/25 rounded-full flex items-start justify-center pt-2 cursor-pointer hover:border-cyan-400/50 transition-colors bg-transparent"
          aria-label="Scroll down"
        >
          <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full" />
        </motion.button>
      </motion.div>
    </section>
  );
}
