 // src/components/landing/Topbar.jsx
import { motion } from "framer-motion";

export default function TopBar() {
  const items = [
    "⚠ BEST VIEWED IN INTERNET EXPLORER 6",
    "⚠ SERVER MAY OR MAY NOT WORK",
    "⚠ 98,43,77,221 CITIZENS ONLINE",
    "⚠ FLASH SALE ENDING SINCE 2022",
    "⚠ PAYMENT GATEWAY EMOTIONALLY UNAVAILABLE",
    "⚠ CAPTCHA VERIFICATION REQUIRED TO SCROLL",
  ];

  const looped = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-b border-red-500/30 bg-black/70 backdrop-blur-xl">
      
      {/* GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-red-500/10 to-cyan-500/10" />

      {/* MARQUEE */}
      <div className="flex overflow-hidden py-3">
        <motion.div
          className="flex items-center gap-16 whitespace-nowrap text-sm font-[UNDER] uppercase tracking-widest text-red-300"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {looped.map((text, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1 }}
              className="shrink-0"
            >
              {text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}