 import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Cpu,
  RadioTower,
  ShieldAlert,
  Sparkles,
  Terminal,
  Activity,
} from "lucide-react";

export default function Footer() {
  const [alertMsg, setAlertMsg] = useState("");

  const alerts = [
    "⚠ Emotional firewall disabled",
    "📡 National server lag detected",
    "💀 Footer intelligence unstable",
    "🧠 Ministry syncing confusion...",
    "🚨 Policy generator malfunctioning",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertMsg(alerts[Math.floor(Math.random() * alerts.length)]);
   setTimeout(() => {
        setAlertMsg("");
      }, 3500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Privacy.exe",
      desc: "Data protection maybe enabled.",
      icon: ShieldAlert,
      color: "from-pink-500 to-rose-500",
    },

    {
      title: "Refund.sys",
      desc: "Refund department emotionally unavailable.",
      icon: Cpu,
      color: "from-cyan-500 to-blue-500",
    },

    {
      title: "Sitemap404",
      desc: "Navigation system permanently confused.",
      icon: Terminal,
      color: "from-yellow-400 to-orange-500",
    },

    {
      title: "GovTracker",
      desc: "Monitoring citizen frustration live.",
      icon: RadioTower,
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-24 text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,0,120,0.08),transparent_35%)]" />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:55px_55px]" />

      {/* FLOATING ORBS */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute left-[-100px] top-[-100px] h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          y: [0, 40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute bottom-[-120px] right-[-120px] h-[340px] w-[340px] rounded-full bg-pink-500/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* TOP */}
        <motion.div
          initial={{
            opacity: 0,
            y: -60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-flex items-center gap-2 rounded-full border font-[CYR]  border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-xs tracking-[0.35em] text-cyan-300 backdrop-blur-xl"
          >
            <Activity size={14} />
            GOVERNMENT FOOTER CORE
          </motion.div>

          <h2 className="mt-8 bg-gradient-to-r font-[cyr]   from-white via-cyan-300 to-pink-300 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            DIGITAL CHAOS
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400 font-[AEO-REG] ">
            Advanced footer technology powered by unstable infrastructure and
            emotional bureaucracy.
          </p>
        </motion.div>

        {/* CENTER PANEL */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="relative mt-16 overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl"
        >
          {/* LIGHT */}
          <motion.div
            animate={{
              x: ["-100%", "120%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-y-0 left-0 w-[20%] bg-white/10 blur-3xl"
          />

          {/* STATS */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                value: "98Cr+",
                label: "Citizens Confused",
              },

              {
                value: "17L+",
                label: "Pending Requests",
              },

              {
                value: "3",
                label: "Working Servers",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="rounded-3xl border border-white/10 bg-black/30 p-6 text-center backdrop-blur-xl"
              >
                <h3 className="bg-gradient-to-r from-cyan-300 to-pink-300  bg-clip-text text-5xl font-[road] text-transparent">
                  {item.value}
                </h3>

                <p className="mt-3 font-[AEO-REG]  text-zinc-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CARDS */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  rotate: index % 2 === 0 ? 2 : -2,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-3xl"
              >
                {/* hover glow */}
                <div
                  className={`absolute inset-0  bg-gradient-to-br ${card.color} opacity-0 transition duration-500 group-hover:opacity-10`}
                />

                {/* top */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r ${card.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="h-3 w-3 rounded-full bg-green-400"
                  />
                </div>

                {/* content */}
                <h3 className="relative z-10 mt-8 text-2xl font-[wood]">
                  {card.title}
                </h3>

                <p className="relative z-10 mt-3 text-sm leading-relaxed font-[AEO-REG]  text-zinc-400">
                  {card.desc}
                </p>

                {/* line */}
                <motion.div
                  animate={{
                    x: ["-100%", "220%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute bottom-0 left-0 h-[2px] w-[40%] bg-gradient-to-r ${card.color}`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ALERT */}
        <AnimatePresence>
          {alertMsg && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              className="mt-12 flex justify-center"
            >
              <div className="rounded-full border font-[AEO-bold]  border-pink-500/20 bg-pink-500/10 px-6 py-3 text-xs tracking-[0.3em] text-pink-300 backdrop-blur-xl">
                {alertMsg}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center font-[cyr]  rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 font-black shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              G
            </div>

            <div>
              <h4 className="font-black tracking-wide font-[cyr] ">INTERNMART.GOV</h4>

              <p className="text-xs text-zinc-500 font-[AEO-REG] ">
                Emotionally unstable since 2026
              </p>
            </div>
          </motion.div>

          <motion.p
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-xs  font-[libre] tracking-[0.25em] text-zinc-500"
          >
            ⚠ NATIONAL FOOTER STATUS: PARTIALLY OPERATIONAL
          </motion.p>
        </div>
      </div>
    </footer>
  );
}  