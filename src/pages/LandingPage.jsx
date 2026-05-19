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

  /* 🔥 EASTER EGGS */
  const [chaosMode, setChaosMode] = useState(false);
  const [bossWarning, setBossWarning] = useState(false);
  const [rageClicks, setRageClicks] = useState(0);
  const [rarePopup, setRarePopup] = useState(false);

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

  /* 🎮 KONAMI CODE EASTER EGG */
  useEffect(() => {
    const code = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    let entered = [];
    const handleKey = (e) => {
      entered.push(e.key);
      entered = entered.slice(-code.length);
      if (JSON.stringify(entered) === JSON.stringify(code)) {
        setChaosMode(true);
        setTimeout(() => {
          setChaosMode(false);
        }, 10000);
      }

      /* 💻 SECRET TERMINAL */
      if (e.ctrlKey && e.key === "h") {
        setBossWarning(true);
        setTimeout(() => {
          setBossWarning(false);
        }, 4000);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* 🐱 RARE EVENT */
  useEffect(() => {
    const random = Math.random();

    if (random < 0.08) {
      setRarePopup(true);

      setTimeout(() => {
        setRarePopup(false);
      }, 5000);
    }
  }, []);

  /* 😡 RAGE CLICK */
  const handleRageClick = () => {
    setRageClicks((p) => p + 1);
    if (rageClicks > 7) {
      setBossWarning(true);
      setTimeout(() => {
        setBossWarning(false);
      }, 3000);
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-black text-white transition-all duration-100  ${
        glitch ? "translate-x-[2px] scale-[1.002]" : ""
      } ${chaosMode ? "animate-pulse saturate-150" : ""}`}
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
            className="fixed top-24 right-6 z-50 font-cyr  bg-red-500/10 border border-red-500/30 px-4 py-3 text-xs text-red-300 backdrop-blur-xl"
          >
            ⚠ SYSTEM INSTABILITY DETECTED (SIMULATION)
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔴 GLITCH TEXT WARNING */}
      {glitch && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 font-pg text-red-400 text-xs tracking-widest animate-pulse">
          SYSTEM GLITCH
        </div>
      )}

      {/* 💀 CHAOS MODE */}
      <AnimatePresence>
        {chaosMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-red-500/10 backdrop-blur-sm pointer-events-none"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-6xl font-black text-red-500 animate-pulse tracking-[10px]">
                CHAOS MODE
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💻 SECRET TERMINAL */}
      <AnimatePresence>
        {bossWarning && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 z-[120]
            bg-black border border-green-500 px-8 py-6
            text-green-400 font-mono shadow-2xl font-[cyr]"
          >
            <p>ACCESSING GOV TERMINAL...</p>
            <p className="text-xs mt-2 animate-pulse font-[cyr]">
              ROOT ACCESS GRANTED
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🐱 ULTRA RARE EVENT */}
      <AnimatePresence>
        {rarePopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-10 left-10 z-[120]
            bg-yellow-400 text-black px-6 py-4 rounded-xl
            font-bold shadow-2xl font-[cyr]"
          >
            🐱 ULTRA RARE ENTITY FOUND
          </motion.div>
        )}
      </AnimatePresence>

      {/* 😡 SECRET RAGE BUTTON */}
      <button
        onClick={handleRageClick}
        className="fixed bottom-6 right-6 z-[120]
        bg-red-600 hover:bg-red-700 px-5 py-3
        rounded-full text-xs font-bold shadow-xl
        animate-pulse font-[rocker]"
      >
        DO NOT CLICK
      </button>

      {/* 👁 HIDDEN ADMIN BUTTON */}
      <button
        onClick={() => setChaosMode(true)}
        className="absolute top-2 left-2 opacity-0 w-10 h-10  font-[read] z-[999]"
      >
        hidden
      </button>

      {/* FOOTER */}
      <div className="relative z-10 mt-32">
        <Footer />
      </div>
    </div>
  );
}
