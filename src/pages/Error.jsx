import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function Error() {
  const navigate = useNavigate();
  const [stability, setStability] = useState(100);
  const [thiefActive, setThiefActive] = useState(true);
  const [stolenItems, setStolenItems] = useState([]);

  const items = ["BUTTON", "LINK", "CARD", "NAVBAR"];

  // thief slowly destroys UI
  useEffect(() => {
    if (!thiefActive) return;

    const interval = setInterval(() => {
      setStability((prev) => {
        const next = Math.max(prev - 5, 0);
        return next;
      });

      setStolenItems((prev) => {
        if (prev.length >= items.length) return prev;
        return [...prev, items[prev.length]];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [thiefActive]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* glitch background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_60%)] animate-pulse" />

      {/* HEADER BOSS UI */}
      <div className="p-4 border-b border-red-500 flex justify-between items-center">
        <div>
          <h1 className="text-red-500 font-bold tracking-widest">
            PAGE BOSS: NOT FOUND ENTITY
          </h1>
          <p className="text-xs text-gray-400">Fight to restore your UI</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">STABILITY</p>
          <div className="w-40 h-2 bg-gray-800 rounded overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all"
              style={{ width: `${stability}%` }}
            />
          </div>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col items-center justify-center h-[80vh] relative">
        {/* 404 boss */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[120px] font-extrabold text-red-600 drop-shadow-[0_0_25px_red]"
        >
          404
        </motion.div>

        <p className="text-gray-400 mt-2 tracking-widest">
          THE PAGE HAS BEEN STOLEN BY THE THIEF
        </p>

        {/* stolen items floating */}
        <div className="absolute bottom-10 flex gap-3 flex-wrap justify-center">
          <AnimatePresence>
            {stolenItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -200, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="px-3 py-1 bg-red-600/20 border border-red-500 text-red-400 text-xs rounded"
              >
                {item} STOLEN
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* THIEF CHARACTER */}
        <motion.div
          animate={{ x: [0, 200, -200, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-1/2 text-4xl"
        >
          🥷
        </motion.div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="absolute bottom-6 w-full flex justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800"
        >
          <ArrowLeft size={16} /> Retreat
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-500 rounded-xl"
        >
          <Home size={16} /> Restore Home
        </button>
      </div>
    </div>
  );
}
