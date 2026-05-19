import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logout from "./auth/logout";
export default function Dashboard() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [notifs, setNotifs] = useState([]);
  const [glitch, setGlitch] = useState(false);

  /* 🧠 EASTER EGGS */
  const [satellite, setSatellite] = useState(false);
  const [bossMode, setBossMode] = useState(false);
  const [brainrot, setBrainrot] = useState(false);
  const [matrixRain, setMatrixRain] = useState(false);
  const [rageCursor, setRageCursor] = useState(false);
  const [scanner, setScanner] = useState(false);

  /* 🔄 LOAD USER + CART */
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || null;
    setUser(userData);
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  /* 🔄 LIVE CART SYNC */
  useEffect(() => {
    const syncCart = () => {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(data);
    };
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const total = cart.reduce((a, b) => a + b.price, 0);
  useEffect(() => {
    const msgs = [
      "⚠ System Alert: Booking engine unstable",
      "🔥 Flash Sale detected on premium packages",
      "🌀 Sync error in travel API",
      "📡 Your session is being monitored",
      "💀 High traffic on payment gateway",
      "🚨 Limited seats left for Goa trip",
      "👁 Government AI detected unusual behavior",
      "🛰 Satellite sync active",
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

  /* ⚡ GLITCH ENGINE */
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);

      setTimeout(() => setGlitch(false), 300);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  /*   SATELLITE MODE */
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.2) {
        setSatellite(true);
        setTimeout(() => {
          setSatellite(false);
        }, 4000);
      }
    }, 12000);

    return () => clearInterval(t);
  }, []);

  /* SCANNER */
  useEffect(() => {
    const handle = () => {
      setScanner(true);
      setTimeout(() => {
        setScanner(false);
      }, 700);
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  /*  SECRET SHORTCUTS */
  useEffect(() => {
    const handle = (e) => {
      /* ALT + B */
      if (e.altKey && e.key === "b") {
        setBrainrot(true);

        setTimeout(() => {
          setBrainrot(false);
        }, 5000);
      }

      /* ALT + M */
      if (e.altKey && e.key === "m") {
        setMatrixRain((p) => !p);
      }

      /* ALT + R */
      if (e.altKey && e.key === "r") {
        setRageCursor((p) => !p);
      }

      /* ALT + X */
      if (e.altKey && e.key === "x") {
        setBossMode(true);

        setTimeout(() => {
          setBossMode(false);
        }, 6000);
      }
    };

    window.addEventListener("keydown", handle);

    return () => window.removeEventListener("keydown", handle);
  }, []);

  /* ❌ REMOVE ITEM */
  const removeItem = (id) => {
    const updated = cart.filter((i) => i.id !== id);

    setCart(updated);

    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div
      className={`min-h-screen bg-black text-white font-[cyr] p-6 relative overflow-hidden
      ${glitch ? "blur-[1px] opacity-90" : ""}
      ${rageCursor ? "cursor-crosshair" : ""}`}
    >
      {/* 🌌 MATRIX MODE */}
      {matrixRain && (
        <div className="absolute inset-0 opacity-20 pointer-events-none text-green-400 text-xs leading-3 whitespace-pre-wrap animate-pulse">
          {Array(300).fill("101010101 SYSTEM ACTIVE ").join("")}
        </div>
      )}

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* 👁 SCANNER */}
      <AnimatePresence>
        {scanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[998]"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 animate-pulse" />

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛰 SATELLITE */}
      <AnimatePresence>
        {satellite && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full z-[999]
            bg-cyan-700 text-white text-center py-3
            font-black tracking-[0.3em] font-[aeo-bold]"
          >
            🛰 SATELLITE TRACKING ACTIVE
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧠 BRAINROT */}
      <AnimatePresence>
        {brainrot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999]
            bg-pink-500/20 backdrop-blur-md"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-7xl font-black text-pink-400 animate-bounce">
                BRAINROT MODE
              </h1>

              <p className="mt-5 tracking-[0.5em]">SKIBIDI DASHBOARD ACTIVE</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💀 BOSS ALERT */}
      <AnimatePresence>
        {bossMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999]
            bg-black/90 flex items-center justify-center"
          >
            <div className="text-center">
              <h1 className="text-8xl font-black text-red-500 animate-pulse">
                WARNING
              </h1>

              <p className="mt-5 text-red-300 tracking-[0.4em]">
                GOVERNMENT BOSS DETECTED
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔔 NOTIFICATIONS */}
      <div className="fixed top-5 right-5 space-y-3 z-[9999] w-[320px]">
        <AnimatePresence>
          {notifs.map((n) => (
            <motion.div
              key={n.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-gradient-to-r from-red-500 to-pink-500
              text-white p-3 rounded-xl shadow-xl text-sm"
            >
              {n.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 🔥 HEADER */}
      <div className="text-center mb-10">
        <motion.h1
          animate={{
            textShadow: [
              "0 0 10px rgba(34,211,238,0.2)",
              "0 0 20px rgba(34,211,238,0.8)",
              "0 0 10px rgba(34,211,238,0.2)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="text-5xl font-black
          bg-gradient-to-r from-cyan-400 via-white to-pink-400
          text-transparent bg-clip-text"
        >
          CHAOS TRAVEL DASHBOARD
        </motion.h1>

        <p className="text-gray-400 mt-3 tracking-[0.2em] font-[super]">
          Welcome back,
          <span className="text-cyan-400 font-bold ml-2 uppercase font-[libre]">
            {user?.name || "AGENT"}
          </span>
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-5"
        >
          <Link
            to="/logout"
            className="
    inline-block
    bg-red-500/20
    border border-red-500/30
    px-6 py-2 rounded-2xl
    text-red-300 font-bold
    hover:bg-red-500/30
    transition-all duration-300
    shadow-lg shadow-red-500/10 font-[cyr]
    "
          >
            ⛔ Logout
          </Link>
        </motion.div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-5">
          {/* QUICK INFO */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/5 border border-white/10
            p-6 rounded-3xl backdrop-blur-2xl"
          >
            <h2 className="text-2xl font-black mb-5">⚡ Quick Info</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-black/40 p-5 rounded-2xl border border-cyan-500/10"
              >
                <p className="text-gray-400 text-xs mb-2 font-[wal]">
                  ACTIVE TRIPS
                </p>

                <h3 className="text-3xl font-black text-cyan-400  font-[ge]">
                  {cart.length}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-black/40 p-5 rounded-2xl border border-pink-500/10"
              >
                <p className="text-gray-400 text-xs mb-2  font-[wal]">
                  TOTAL VALUE
                </p>

                <h3 className="text-3xl font-black text-pink-400  font-[ge]">₹{total}</h3>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-black/40 p-5 rounded-2xl border border-yellow-500/10"
              >
                <p className="text-gray-400 text-xs mb-2  font-[wal]">
                  SERVER STATUS
                </p>

                <h3 className="text-2xl font-[libre] font-black text-yellow-300">LIVE</h3>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-black/40 p-5 rounded-2xl border border-green-500/10"
              >
                <p className="text-gray-400 text-xs mb-2  font-[wal]">
                  SECURITY
                </p>

                <h3 className="text-2xl font-black text-green-400 font-[libre]">
                  STABLE ⚡
                </h3>
              </motion.div>
            </div>
          </motion.div>

          {/* SYSTEM PANEL */}
          <motion.div
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="bg-white/5 border border-white/10
            p-6 rounded-3xl backdrop-blur-2xl"
          >
            <h2 className="text-xl font-black mb-3">⚠ System Monitor Panel</h2>

            <p className="text-gray-400 text-sm font-[libre]">
              Tracking booking engine performance...
            </p>

            <div className="mt-5 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{
                  width: ["10%", "90%", "40%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/5 border border-white/10
          p-6 rounded-3xl backdrop-blur-2xl h-fit"
        >
          <h2 className="text-2xl font-black mb-5">🛒 Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-400">No items found</p>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                className="flex justify-between items-center
                py-3 border-b border-white/10"
              >
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>

                  <p className="text-xs text-cyan-400">₹{item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 text-xl hover:text-red-500 font-[wal]"
                >
                  Remove
                </button>
              </motion.div>
            ))
          )}

          <div className="mt-6 flex justify-between font-black text-lg">
            <span>Total</span>

            <span className="text-cyan-400">₹{total}</span>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(34,211,238,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/products")}
            className="mt-5 w-full
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-white font-black py-3 rounded-2xl "
          >
            Book Travel
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
