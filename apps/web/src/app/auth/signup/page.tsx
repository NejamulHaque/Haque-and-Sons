"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client"; // Ensure this import works
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("nejamulhaque.works@gmail.com");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("Nejamul Haque");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // better-auth usually uses signUp.email for email/password
      await signUp.email({ 
        email, 
        password, 
        name,
        callbackURL: "/admin" 
      });
      router.push("/admin");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form onSubmit={handleSignUp} className="bg-gray-900/50 border border-white/10 p-8 rounded-2xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-white mb-4">Create Admin Account</h1>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          className="w-full p-3 bg-black/50 border border-white/10 rounded-lg text-white" 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="w-full p-3 bg-black/50 border border-white/10 rounded-lg text-white" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password (min 8 chars)" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="w-full p-3 bg-black/50 border border-white/10 rounded-lg text-white" 
          required 
          minLength={8} 
        />
        <button 
          type="submit" 
          className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-all"
        >
          Create Account & Login
        </button>
      </form>
    </div>
  );
}