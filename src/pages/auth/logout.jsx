 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [stage, setStage] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [fakeCancel, setFakeCancel] = useState(false);

  /* ⚡ GLITCH ENGINE */
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);

      setTimeout(() => {
        setGlitch(false);
      }, 120);
    }, 700);

    return () => clearInterval(t);
  }, []);

  /* 🎭 LOGOUT SEQUENCE */
  useEffect(() => {
    const messages = [
      "TERMINATING SESSION...",
      "REMOVING USER ACCESS...",
      "CLEARING GOVERNMENT CACHE...",
      "DESTROYING DIGITAL FOOTPRINT...",
      "GOODBYE AGENT 👁",
    ];

    let i = 0;

    const interval = setInterval(() => {
      setStage(i);

      i++;

      if (i >= messages.length) {
        clearInterval(interval);

        setTimeout(() => {
          logout();
          navigate("/login", { replace: true });
        }, 1500);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [logout, navigate]);

  /* 🎮 SECRET ESCAPE EASTER EGG */
  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape") {
        setFakeCancel(true);

        setTimeout(() => {
          setFakeCancel(false);
        }, 3000);
      }
    };

    window.addEventListener("keydown", handle);

    return () => window.removeEventListener("keydown", handle);
  }, []);

  const messages = [
    "TERMINATING SESSION...",
    "REMOVING USER ACCESS...",
    "CLEARING GOVERNMENT CACHE...",
    "DESTROYING DIGITAL FOOTPRINT...",
    "GOODBYE AGENT 👁",
  ];

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden bg-black flex items-center justify-center text-white
      ${glitch ? "translate-x-[2px]" : ""}`}
    >

      {/* 🌌 GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_8px] opacity-20" />

      {/* ⚡ GLITCH FLASH */}
      {glitch && (
        <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
      )}

      {/* 💀 MAIN LOGOUT CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-[500px] border border-red-500/20 bg-black/70 backdrop-blur-xl p-10 text-center"
      >
        <motion.h1
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-3xl font-black tracking-[0.4em] text-red-500"
        >
          LOGOUT NODE
        </motion.h1>

        <div className="mt-10 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={msg}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: stage >= i ? 1 : 0.2,
                x: stage >= i ? 0 : -20,
              }}
              className={`text-sm tracking-[0.2em] ${
                stage === i
                  ? "text-cyan-300"
                  : "text-zinc-600"
              }`}
            >
              {stage >= i ? "✔" : "•"} {msg}
            </motion.div>
          ))}
        </div>

        {/* 🔄 LOADING BAR */}
        <div className="mt-10 h-2 bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((stage + 1) / messages.length) * 100}%`,
            }}
            transition={{ duration: 1 }}
            className="h-full bg-cyan-400"
          />
        </div>

        <p className="mt-6 text-xs text-zinc-500 tracking-[0.3em]">
          SECURE DISCONNECT ACTIVE
        </p>
      </motion.div>

      {/* 👁 ESCAPE EASTER EGG */}
      <AnimatePresence>
        {fakeCancel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999]
            bg-black/90 flex items-center justify-center"
          >
            <div className="text-center">
              <h1 className="text-5xl font-black text-red-500 animate-pulse">
                ESCAPE DENIED
              </h1>

              <p className="mt-4 text-red-300 tracking-[0.3em]">
                YOU CANNOT LEAVE THE SYSTEM
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 
