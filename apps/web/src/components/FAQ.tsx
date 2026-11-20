"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Haque & Sons offer?",
    answer: "We offer web development, AI solutions, data science training, DSA interview preparation, business analytics, and virtual assistant services. Our expertise spans from frontend frameworks like Next.js to backend systems and machine learning."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. A simple landing page takes 1-2 weeks, while full-stack applications with AI integration typically take 4-8 weeks. We provide detailed timelines during our discovery phase."
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes! We offer maintenance packages that include bug fixes, performance optimization, security updates, and feature additions. Our support plans are flexible and tailored to your needs."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including Next.js 16, React 19, TypeScript, Tailwind CSS, PostgreSQL, Drizzle ORM, and various AI/ML frameworks. We choose tools based on project requirements."
  },
  {
    question: "How much do your services cost?",
    answer: "Pricing depends on project scope and complexity. We offer transparent pricing with detailed quotes after understanding your requirements. Contact us for a free consultation and estimate."
  },
  {
    question: "Can you work with existing codebases?",
    answer: "Absolutely! We regularly work with existing codebases, performing code reviews, refactoring, and adding new features. We're experienced in migrating legacy systems to modern architectures."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 bg-black px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-neutral-300 text-xs font-medium uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Everything you need to know about our services and process.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="border border-white/[0.08] rounded-2xl overflow-hidden bg-[#0c0c0e]/80 transition-all hover:border-white/[0.16]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer transition-colors"
              >
                <span className="text-base font-medium text-white pr-4 tracking-tight">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-neutral-400 leading-relaxed font-normal border-t border-white/[0.04] pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
