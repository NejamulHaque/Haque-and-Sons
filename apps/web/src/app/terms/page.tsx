import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Our terms of service outline the rules and guidelines for using our website and services.",
  alternates: { canonical: "https://haqueandsons.vercel.app/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-6">Last updated: August 26, 2026</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-300 mb-4">By accessing and using Haque & Sons website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Services</h2>
        <p className="text-gray-300 mb-4">We provide web development, AI solutions, and digital consulting services. All services are provided &ldquo;as is&rdquo; unless otherwise specified in a separate service agreement.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
        <p className="text-gray-300 mb-4">All content on this website, including text, graphics, logos, and software, is the property of Haque & Sons and protected by intellectual property laws.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="text-gray-300 mb-4">Haque & Sons shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Governing Law</h2>
        <p className="text-gray-300 mb-4">These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
      </div>
    </div>
  );
}
