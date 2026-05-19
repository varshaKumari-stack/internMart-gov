import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [glitch, setGlitch] = useState(false);
  const [systemMsg, setSystemMsg] = useState("");

  /* SYSTEM HANG / GLITCH LOOP */
  useEffect(() => {
    const msgs = [
      "SYSTEM HANG DETECTED...",
      "RENDER THREAD DELAY...",
      "UI BUFFER OVERFLOW...",
      "SIGNAL DESYNC...",
      "COMPONENT FREEZE WARNING...",
    ];

    const t = setInterval(() => {
      setGlitch(true);
      setSystemMsg(msgs[Math.floor(Math.random() * msgs.length)]);

      setTimeout(() => {
        setGlitch(false);
        setSystemMsg("");
      }, 1200);
    }, 4000);

    return () => clearInterval(t);
  }, []);

  return (
    <section
      className={`relative px-6 py-28 text-center overflow-hidden text-white transition-transform duration-100 ${
        glitch ? "scale-[1.01] translate-x-[2px]" : ""
      }`}
    >
      {/* 🌌 BACKGROUND GLOW */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2  h-[300px] w-[300px] bg-pink-500/20 blur-[120px] rounded-full"
      />

      {/* ⚡ GLITCH OVERLAY */}
      {glitch && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm animate-pulse flex items-center justify-center">
          <div className="text-cyan-300 text-sm tracking-widest font-[AEO-REG] ">
            {systemMsg}
          </div>
        </div>
      )}

      {/* 🔴 GLITCH WARNING TEXT */}
      {glitch && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 font-[PG]  text-red-400 text-xs animate-pulse">
          SYSTEM INSTABILITY
        </div>
      )}

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-black leading-tight -tracking-tighter font-[FIRLEST] "
      >
        WELCOME TO <br />
        <span className="bg-gradient-to-r from-cyan-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
          INTERNMART.GOV
        </span>
      </motion.h2>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6  bg-gradient-to-r from-cyan-300 via-pink-300 to-yellow-300  hover:rounded-3xl text-black   inline-block px-8 py-4 font-black font-[AEO-REG]  rotate-1 shadow-lg"
      >
        भारत का सबसे विश्वसनीय shopping portal*
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 italic text-sm text-zinc-300 font-[SUPER] "
      >
        *trust not guaranteed
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex justify-center gap-6 flex-wrap"
      >
        <Link
          to="/login"
          className="bg-red-600 px-8 py-4 rounded-full text-xl font-[AEO-REG]  font-black transition hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]"
        >
          LOGIN
        </Link>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Link
            to="/signup"
            className="bg-lime-400 font-[AEO-REG]  text-black px-8 py-4 rounded-full text-xl font-black transition hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,0,0.4)]"
          >
            SIGNUP
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
