 import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VirusWarning() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: 200, y: -100 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.3, x: 200 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="fixed top-10 right-5 z-50 w-72 border-[6px] border-red-600 bg-white text-black shadow-2xl"
        >
          {/* HEADER */}
          <motion.div
            animate={{
              backgroundColor: ["#dc2626", "#ef4444", "#dc2626"],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="flex items-center justify-between px-3 py-2 text-white"
          >
            <h2 className="font-bold">⚠ VIRUS ALERT</h2>

            <button
              onClick={() => setOpen(false)}
              className="font-bold hover:scale-110 transition"
            >
              X
            </button>
          </motion.div>

          {/* BODY */}
          <div className="p-4">
            <motion.p
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="mb-4 font-bold"
            >
              Your device may contain nationalism issues.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(239,68,68,0)",
                  "0px 0px 20px rgba(239,68,68,0.8)",
                  "0px 0px 0px rgba(239,68,68,0)",
                ],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="w-full bg-red-500 px-4 py-2 text-white font-bold"
            >
              FIX NOW
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}