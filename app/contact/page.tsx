"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

type FormState = "idle" | "loading" | "success" | "error";

const contactInfo = [
  {
    label: "Email",
    value: "austinsz@umich.edu",
    href: "mailto:austinsz@umich.edu",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "austin-zj-shen",
    href: "https://www.linkedin.com/in/austin-zj-shen",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "A2DR1",
    href: "https://github.com/A2DR1",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Ann Arbor, MI",
    href: null,
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="font-mono text-amber-400 text-sm tracking-widest uppercase mb-3 block">Get In Touch</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Open to research collaborations, internship opportunities, and interesting engineering problems. Reach out any time.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Contact info sidebar */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 group hover:border-amber-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-0.5">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-slate-200 text-sm hover:text-amber-400 transition-colors truncate block"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-slate-200 text-sm truncate">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Availability card */}
              <div className="glass-card rounded-2xl p-5 border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">Available</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Currently open to research collaborations, Summer 2027 internships, and full-time roles starting 2027.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/3 to-transparent pointer-events-none" />

              <AnimatePresence mode="wait">
                {state === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-slate-400 text-sm mb-8">
                      Thanks for reaching out. I&apos;ll get back to you within 1 to 2 business days.
                    </p>
                    <button
                      onClick={() => setState("idle")}
                      className="px-6 py-2.5 rounded-xl bg-[#1a1a1c] border border-[#2e2b24] text-slate-300 hover:text-white hover:border-amber-500/40 text-sm transition-colors"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative z-10 space-y-5"
                  >
                    <h2 className="text-white text-xl font-bold mb-6">Send a Message</h2>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-slate-400 text-sm mb-2 font-mono">
                        Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full bg-[#111214] border border-[#2e2b24] rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-slate-400 text-sm mb-2 font-mono">
                        Email <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full bg-[#111214] border border-[#2e2b24] rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-slate-400 text-sm mb-2 font-mono">
                        Message <span className="text-amber-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        placeholder="What's on your mind?"
                        className="w-full bg-[#111214] border border-[#2e2b24] rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors resize-none"
                      />
                    </div>

                    {/* Error */}
                    {state === "error" && errorMsg && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2} className="shrink-0 mt-0.5">
                          <circle cx="12" cy="12" r="10" />
                          <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
                        </svg>
                        <p className="text-red-400 text-sm">{errorMsg}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="w-full py-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 disabled:bg-amber-700/50 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-amber-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {state === "loading" ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message →"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
