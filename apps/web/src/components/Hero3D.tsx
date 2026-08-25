"use client";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei";
import { motion } from "framer-motion";

function AnimatedOrb() {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Sphere args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#8b5cf6"
          distort={0.35}
          speed={1.8}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

export function Hero3D() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <AnimatedOrb />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
        >
          Building the{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Future of Software
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Haque & Sons delivers next-generation AI, collaborative, and financial software solutions
          designed for scale, security, and elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#services"
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-full transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-full transition-all backdrop-blur-sm"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
