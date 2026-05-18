 import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FakeAds from "../components/landing/FakeAds";
import FakeStars from "../components/landing/FakeStats";
import Notification from "../components/landing/Notification";
import HeroSection from "../components/landing/HeroSection";
import TopBar from "../components/landing/Topbar";
import News from "../components/landing/News";
import VirusWarning from "../components/landing/VirusWarning";
import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";

export default function LandingPage() {
  const [corruption, setCorruption] = useState(0);
  const [glitch, setGlitch] = useState(false);

  /* SYSTEM LOOP */
  useEffect(() => {
    const t = setInterval(() => {
      setCorruption((p) => (p > 100 ? 20 : p + Math.random() * 3));
    }, 2000);

    return () => clearInterval(t);
  }, []);

  /* LIGHT GLITCH ENGINE */
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000);

    return () => clearInterval(t);
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-black text-white transition-transform duration-100 ${
        glitch ? "translate-x-[2px] scale-[1.002]" : ""
      }`}
    >
      {/* 🌌 BACKGROUND LAYERS */}
      <TopBar />
      <Navbar />
      <HeroSection />
      <FakeStars />
      <FakeAds />
      <News />
      <Notification />
      <VirusWarning />

      {/* 🌫 GLITCH FLASH LAYER */}
      {glitch && (
        <div className="fixed inset-0 z-40 pointer-events-none bg-white/5 mix-blend-overlay animate-pulse" />
      )}

      {/* ⚠ SYSTEM WARNING */}
      <AnimatePresence>
        {corruption > 75 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 right-6 z-50 bg-red-500/10 border border-red-500/30 px-4 py-3 text-xs text-red-300 backdrop-blur-xl"
          >
            ⚠ SYSTEM INSTABILITY DETECTED (SIMULATION)
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔴 GLITCH TEXT WARNING */}
      {glitch && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 text-red-400 text-xs tracking-widest animate-pulse">
          SYSTEM GLITCH
        </div>
      )}

      {/* FOOTER */}
      <div className="relative z-10 mt-32">
        <Footer />
      </div>
    </div>
  );
}