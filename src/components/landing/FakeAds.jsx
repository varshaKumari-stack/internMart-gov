 import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FakeAds() {
  const ads = [
    "🎯 Buy Premium Queue Pass — Skip Reality Faster",
    "📡 Government Approved VPN for Emotional Safety",
    "💀 50% OFF: Stability Upgrade Package",
    "🧠 Increase IQ by 2 points (temporary)",
    "⚠ Upgrade your citizenship tier today",
  ];

  const [currentAds, setCurrentAds] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();

      const newAd = {
        id,
        text: ads[Math.floor(Math.random() * ads.length)],
        x: Math.random() * 70,
        y: Math.random() * 70,
      };

      setCurrentAds((prev) => [...prev.slice(-4), newAd]);

      setTimeout(() => {
        setCurrentAds((prev) => prev.filter((a) => a.id !== id));
      }, 4000);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {currentAds.map((ad) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute w-[220px] rounded-2xl border border-pink-500/20 bg-black/60 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(255,0,120,0.15)]"
            style={{
              top: `${ad.y}%`,
              left: `${ad.x}%`,
            }}
          >
            <p className="text-[10px] tracking-[0.3em] text-pink-400">
              SPONSORED GOV AD
            </p>

            <p className="mt-2 text-xs text-white">{ad.text}</p>

            <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-pink-500 to-cyan-500 opacity-40" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}