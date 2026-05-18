 import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ServerCrash, Activity, ShieldAlert, WifiOff } from "lucide-react";

export default function FakeStats() {
  const [activeCard, setActiveCard] = useState(null);
  const [corruption, setCorruption] = useState(0);

  const stats = [
    {
      number: "98Cr+",
      text: "Citizens Confused",
      icon: ShieldAlert,
      color: "from-pink-500 via-rose-500 to-red-500",
      glow: "shadow-[0_0_80px_rgba(255,0,120,0.35)]",
      progress: "93%",
      warning: "MENTAL OVERLOAD",
    },
    {
      number: "17L+",
      text: "Pending Orders",
      icon: Activity,
      color: "from-cyan-400 via-blue-500 to-indigo-500",
      glow: "shadow-[0_0_80px_rgba(0,200,255,0.35)]",
      progress: "78%",
      warning: "QUEUE COLLAPSE",
    },
    {
      number: "3",
      text: "Working Servers",
      icon: ServerCrash,
      color: "from-yellow-400 via-orange-400 to-red-500",
      glow: "shadow-[0_0_80px_rgba(255,180,0,0.35)]",
      progress: "12%",
      warning: "CRITICAL DAMAGE",
    },
  ];

  /* 🌐 SYSTEM CORRUPTION LOOP */
  useEffect(() => {
    const t = setInterval(() => {
      setCorruption((p) => {
        const next = p + Math.random() * 2;

        return next > 100 ? 20 : next;
      });
    }, 2000);

    return () => clearInterval(t);
  }, []);

  return (
    <section
      className={`relative overflow-hidden px-6 py-28 transition-all duration-700 ${
        corruption > 70
          ? "bg-red-950/10"
          : "bg-transparent"
      }`}
    >
      {/* FLOATING BACKGROUND */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[160px]"
      />

      <motion.div
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]"
      />

      {/* HEADER */}
      <div className="text-center relative z-10">
        <motion.div
          animate={{
            opacity: corruption > 70 ? [1, 0.4, 1] : 1,
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-xs font-bold tracking-[0.35em] text-cyan-300"
        >
          <WifiOff size={14} />
          LIVE GOVERNMENT METRICS
        </motion.div>

        <h2 className="mt-6 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-pink-300">
          NATIONAL STATUS
        </h2>

        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Real-time system behaving like it has emotions and personal problems.
        </p>

        {/* CORRUPTION BAR */}
        <div className="mt-8 mx-auto w-[300px] h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all"
            style={{ width: `${corruption}%` }}
          />
        </div>
      </div>

      {/* CARDS */}
      <div className="relative z-10 mt-20 grid gap-10 lg:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeCard === index;
          const isBlurred = activeCard !== null && activeCard !== index;

          return (
            <motion.div
              key={index}
              onClick={() => {
                setActiveCard(activeCard === index ? null : index);
                setCorruption((p) => p + 5); // 🔥 interaction increases instability
              }}
              whileHover={{ scale: 1.05, rotate: index % 2 ? -2 : 2 }}
              className={`
                relative cursor-pointer overflow-hidden rounded-[40px]
                border border-white/10 p-8 backdrop-blur-3xl transition-all duration-500
                ${item.glow}
                ${isActive ? "bg-black/80" : "bg-white/5"}
                ${isBlurred ? "blur-sm opacity-30 scale-95" : ""}
              `}
            >
              {/* BACKGROUND GRADIENT */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}
              />

              {/* ICON */}
              <div className="relative z-10 flex justify-between">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r ${item.color}`}
                >
                  <Icon size={28} />
                </motion.div>

                <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              </div>

              {/* NUMBER */}
              <h2 className="relative z-10 mt-8 text-6xl font-black">
                {item.number}
              </h2>

              <p className="relative z-10 mt-2 text-zinc-300">
                {item.text}
              </p>

              {/* WARNING */}
              <div className="relative z-10 mt-6 flex justify-between">
                <span className="text-xs font-bold text-red-300 border border-red-500/20 px-3 py-1 rounded-full">
                  {item.warning}
                </span>
                <span className="text-sm text-zinc-400">
                  {item.progress}
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="relative z-10 mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: item.progress }}
                  className={`h-full bg-gradient-to-r ${item.color}`}
                />
              </div>

              {/* GLITCH LINE */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-0 h-[2px] w-[40%] bg-white/60 blur-sm"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}