import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPopup() {
  const messages = [
    "System monitoring cart activity",
    "Checkout behavior analyzed",
    "Are you sure about this purchase?",
    "Background verification running",
    "Warning: emotional spending detected",
  ];

  const [popups, setPopups] = useState([]);

  const positions = [
    { top: "10%", left: "8%" },
    { top: "20%", right: "10%" },
    { top: "50%", left: "5%" },
    { bottom: "10%", right: "8%" },
    { top: "35%", left: "45%" },
    { top: "70%", left: "20%" },
  ];

  const getRandomPosition = () =>
    positions[Math.floor(Math.random() * positions.length)];

  const spawn = () => {
    const p = {
      id: Date.now(),
      text: messages[Math.floor(Math.random() * messages.length)],
      position: getRandomPosition(),
    };

    setPopups((prev) => [...prev, p]);

    setTimeout(() => {
      setPopups((prev) => prev.filter((x) => x.id !== p.id));
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(spawn, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <AnimatePresence>
        {popups.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              position: "absolute",
              ...p.position,
              pointerEvents: "auto",
            }}
            className="w-56 bg-white text-black border-4 border-red-500 shadow-2xl rounded-xl opacity-80"
          >
            <div className="bg-red-500 text-white px-3 py-2 flex justify-between">
              <span className="text-xs font-bold">⚠ SYSTEM ALERT</span>

              <button
                onClick={() =>
                  setPopups((prev) => prev.filter((x) => x.id !== p.id))
                }
                className="text-xs font-bold"
              >
                X
              </button>
            </div>

            <div className="p-3 text-sm">{p.text}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
