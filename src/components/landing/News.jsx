 import { motion } from "framer-motion";

export default function News() {
  const text =
    "⚠ SERVER MAINTENANCE DELAYED DUE TO SERVER MAINTENANCE ⚠ FLASH SALE ENDING SINCE 2022 ⚠ GOV SYSTEM OVERHEATING ⚠ USER CONFUSION LEVEL: HIGH ⚠ ";

  return (
    <div className="relative bg-black py-3 overflow-hidden border-y-4 border-yellow-400 group">

      {/* glow */}
      <div className="absolute inset-0 bg-yellow-500/10 blur-2xl" />

      {/* ticker */}
      <div className="flex whitespace-nowrap">

        {/* first loop */}
        <motion.div
          className="flex gap-10 text-yellow-300 font-[CYR] tracking-wider min-w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
        >
          {text}
        </motion.div>

        {/* second loop (seamless) */}
        <motion.div
          className="flex gap-10 text-yellow-300 font-[AEO-REG] tracking-wider min-w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear",
          }}
        >
          {text}
        </motion.div>

      </div>
    </div>
  );
}