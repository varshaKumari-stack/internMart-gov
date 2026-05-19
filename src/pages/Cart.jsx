import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartPopup from "../pages/CartPopup";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔄 LOAD CART */
  useEffect(() => {
    const loadCart = () => {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(data);
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  /* 🔔 TOAST ENGINE */
  useEffect(() => {
    const msgs = [
      "Cart synced successfully",
      "Government checkout verified",
      "Secure payment tunnel active",
      "Quantum cart encryption enabled",
    ];

    const t = setInterval(() => {
      setToast(msgs[Math.floor(Math.random() * msgs.length)]);

      setTimeout(() => setToast(""), 1800);
    }, 6000);

    return () => clearInterval(t);
  }, []);

  /* ❌ REMOVE ITEM */
  const removeItem = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  /*   CLEAR CART */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  /* 🚀 CHECKOUT */
  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payment");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen overflow-hidden font-[aeo-bold] bg-black text-white"
    >
      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-pink-500/10" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.15),transparent_40%)]" />
      {/*   TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-5 right-5 z-50
            bg-white/10 backdrop-blur-xl
            px-5 py-3 rounded-2xl
            border border-white/10 text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚡ LOADING */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]
            bg-black/90 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />

              <p className="mt-6 text-cyan-300 tracking-[0.3em] text-sm font-[aeo-bold]">
                PROCESSING CHECKOUT...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📦 CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* 🔥 HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20
          bg-gradient-to-br from-cyan-500/10 via-black to-pink-500/10
          p-8 backdrop-blur-2xl shadow-2xl"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/20 blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-[0.3em] font-[ge-rin]">
                Your Cart
              </h1>

              <p className="text-zinc-400 mt-3 text-sm tracking-[0.2em] uppercase font-[cyr]">
                Secure Government Checkout System
              </p>
            </div>

            <div className="flex gap-4">
              <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 min-w-[120px]">
                <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-[aeo-bold]">
                  Items
                </p>

                <h2 className="text-3xl font-[rocker] text-cyan-300 mt-1">
                  {cart.length}
                </h2>
              </div>

              <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 min-w-[140px]">
                <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-[aeo-bold]">
                  Total
                </p>

                <h2 className="text-3xl   text-pink-400 mt-1 font-[rocker]">
                  ₹{total}
                </h2>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 📭 EMPTY CART */}
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 text-center p-16 rounded-[35px]
            border border-white/10 bg-white/5 backdrop-blur-2xl"
          >
            <div className="text-7xl mb-5">🛒</div>

            <h2 className="text-3xl font-[libre]">Cart is Empty</h2>

            <Link
              to="/products"
              className="inline-block mt-5 px-6 py-3 rounded-2xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              font-[super] hover:scale-105 transition"
            >
              Add Packages
            </Link>

            <p className="text-zinc-400 mt-4">
              Add products to continue checkout
            </p>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10 mt-10">
            {/* 🛍 ITEMS */}
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-3xl
                  border border-white/10 bg-white/5
                  backdrop-blur-2xl p-5"
                >
                  <div className="absolute -top-10 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                      {/* IMAGE */}
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-28 h-24 rounded-2xl object-cover border border-white/10"
                      />

                      {/* DETAILS */}
                      <div>
                        <h2 className="text-xl font-[cyr]">{item.title}</h2>

                        <p className="text-zinc-400 text-sm mt-1  ">
                          📍 {item.location}
                        </p>

                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs border border-pink-500/20">
                            {item.type}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs border border-cyan-500/20">
                            ⏱ {item.duration}
                          </span>

                          <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-xs border border-yellow-500/20">
                            ⭐ {(Math.random() * 2 + 3).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="text-right">
                      <h2 className="text-3xl font-black text-cyan-300">
                        ₹{item.price}
                      </h2>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="mt-4 px-5 py-2 rounded-xl
                        bg-red-500/10 border border-red-500/20
                        text-red-400 hover:bg-red-500/20 transition"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 💎 SUMMARY */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-10 overflow-hidden rounded-[30px]
              border border-cyan-500/20 bg-black/40
              backdrop-blur-2xl p-7 h-fit"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />

              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-6 tracking-wide">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-zinc-400">
                    <span className="font-[rocker]">Items</span>
                    <span className="font-[ge] text-emerald-400">
                      {cart.length}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span className="font-[rocker]">Security Fee</span>
                    <span className="font-[ge] text-emerald-400">₹99</span>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="flex justify-between text-2xl font-[wal]">
                    <span>Total</span>

                    <span className="text-cyan-300 font-[ge]">
                      ₹{total + 99}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="w-full mt-8 py-4 rounded-2xl
 bg-gradient-to-r from-zinc-950 via-purple-900 to-cyan-400
                  font-black tracking-[0.2em] font-[road]"
                >
                  PROCEED CHECKOUT →
                </motion.button>

                <button
                  onClick={clearCart}
                  className="w-full mt-4 py-4 rounded-2xl
                  bg-white/5 border border-white/10
                  hover:bg-white/10 transition"
                >
                  Clear Cart
                </button>

                <div className="mt-6 text-center text-[10px] tracking-[0.3em] font-[cyr] text-zinc-500">
                  🔒 GOVERNMENT SECURE PAYMENT
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* 🔥 POPUP */}
      <CartPopup />
    </motion.div>
  );
}
