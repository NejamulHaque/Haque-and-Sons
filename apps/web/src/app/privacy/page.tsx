import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy explains how we collect, use, and protect your data.",
  alternates: { canonical: "https://haqueandsons.vercel.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-6">Last updated: August 26, 2026</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-300 mb-4">We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or request a quote. This includes your name, email address, and message content.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-300 mb-4">We use the information we collect to respond to your inquiries, improve our services, send you updates, and analyze usage patterns to enhance user experience.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies & Tracking</h2>
        <p className="text-gray-300 mb-4">We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand how visitors interact with our site. You can manage cookie preferences via our cookie consent banner.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p className="text-gray-300 mb-4">We implement industry-standard security measures including SSL encryption, secure API endpoints, and regular security audits to protect your data.</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
        <p className="text-gray-300 mb-4">If you have questions about this Privacy Policy, please contact us at <a href="mailto:nejamulhaque.works@gmail.com" className="text-cyan-400 hover:underline">nejamulhaque.works@gmail.com</a>.</p>
      </div>
    </div>
  );
}
