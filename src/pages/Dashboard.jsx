 import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [glitch, setGlitch] = useState(false);

  /* LOAD CART */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  /* TOTAL */
  const total = cart.reduce((a, b) => a + b.price, 0);

  /* BIG FAKE NOTIFICATIONS */
  useEffect(() => {
    const msgs = [
      "⚠ System Alert: Booking engine unstable",
      "🔥 Flash Sale detected on premium packages",
      "🌀 Sync error in travel API",
      "📡 Your session is being monitored",
      "💀 High traffic on payment gateway",
      "🚨 Limited seats left for Goa trip",
    ];

    const interval = setInterval(() => {
      const id = Date.now();

      const notif = {
        id,
        text: msgs[Math.floor(Math.random() * msgs.length)],
      };

      setNotifs((prev) => [...prev, notif]);

      setTimeout(() => {
        setNotifs((prev) => prev.filter((n) => n.id !== id));
      }, 3500);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  /* GLITCH EFFECT */
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 4000);

    return () => clearInterval(t);
  }, []);

  /* REMOVE ITEM */
  const removeItem = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div
      className={`min-h-screen bg-black text-white p-6 relative overflow-hidden ${
        glitch ? "blur-[1px] opacity-90" : ""
      }`}
    >
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔔 BIG NOTIFICATIONS */}
      <div className="fixed top-5 right-5 space-y-3 z-[9999] w-[320px]">
        <AnimatePresence>
          {notifs.map((n) => (
            <motion.div
              key={n.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-xl shadow-xl text-sm"
            >
              {n.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-400 via-white to-pink-400 text-transparent bg-clip-text">
        Travel Dashboard
      </h1>

      <p className="text-center text-gray-400 mb-8">
        Live booking & cart system
      </p>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* LEFT - PACKAGES AREA (STATIC BOX) */}
        <div className="lg:col-span-2 space-y-4">

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-3">🔥 Quick Info</h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-black/40 p-3 rounded-xl">
                Active Trips: {cart.length}
              </div>
              <div className="bg-black/40 p-3 rounded-xl">
                Total Value: ₹{total}
              </div>
              <div className="bg-black/40 p-3 rounded-xl">
                Status: Live
              </div>
              <div className="bg-black/40 p-3 rounded-xl text-green-400">
                System: Stable ⚡
              </div>
            </div>
          </div>

          {/* FAKE BOX */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl animate-pulse">
            <h2 className="text-lg font-bold mb-2">
              ⚠ System Monitor Panel
            </h2>
            <p className="text-gray-400 text-sm">
              Tracking booking engine performance...
            </p>
          </div>
        </div>

        {/* RIGHT - CART BOX */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-xl h-fit">
          <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-400">No items found</p>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex justify-between items-center py-2 border-b border-white/10"
              >
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400">₹{item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 text-xs hover:text-red-500"
                >
                  Remove
                </button>
              </motion.div>
            ))
          )}

          <div className="mt-5 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-cyan-400">₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold py-2 rounded-xl hover:scale-105 transition"
          >
          Book Travel
          </button>
        </div>
      </div>
    </div>
  );
}