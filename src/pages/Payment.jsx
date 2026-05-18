 import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Payment() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [checked, setChecked] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const total = cart.reduce((a, b) => a + b.price, 0);

  /* 🔥 UNLIMITED LIVE ALERTS */
  useEffect(() => {
    const msgs = [
      "🔐 Secure tunnel active",
      "⚡ Payment gateway synced",
      "📡 Verifying bank API",
      "🧠 AI fraud scan running",
      "💳 Transaction engine ready",
      "🚀 Booking system stable",
    ];

    const interval = setInterval(() => {
      const id = Date.now();
      const msg = msgs[Math.floor(Math.random() * msgs.length)];

      setAlerts((prev) => [...prev, { id, msg }]);

      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, 3500);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    setToast("Item removed");
    setTimeout(() => setToast(""), 1200);
  };

  const handlePay = () => {
    if (!cart.length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCaptcha(true);
    }, 1200);
  };

  const confirmPay = () => {
    setCaptcha(false);
    localStorage.removeItem("cart");

    setToast("Payment Success 🎉");
    setTimeout(() => navigate("/success"), 1200);
  };

  return (
    <div className="min-h-screen relative bg-black text-white px-4 py-10 overflow-hidden">

      {/* 🌈 BACKGROUND FLOAT */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full top-[-120px] left-[-120px]"
      />

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full bottom-[-120px] right-[-120px]"
      />

      {/* 🔔 TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-5 right-5 bg-yellow-400 text-black px-4 py-2 rounded-xl z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 LIVE ALERTS */}
      <div className="fixed left-5 top-5 space-y-2 z-50 w-72">
        <AnimatePresence>
          {alerts.map((a) => (
            <motion.div
              key={a.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-xs"
            >
              {a.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ⏳ LOADING */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-cyan-300 text-xl"
            >
              Processing Payment...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔐 CAPTCHA */}
      <AnimatePresence>
        {captcha && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <div className="w-80 bg-white text-black p-6 rounded-2xl">

              <h2 className="font-bold text-center">Verify Identity</h2>

              <div
                onClick={() => setChecked(!checked)}
                className="mt-5 flex justify-between items-center border p-3 rounded-xl cursor-pointer"
              >
                <span>I am not a robot</span>
                <div className={`w-5 h-5 border ${checked && "bg-green-500"}`} />
              </div>

              <button
                disabled={!checked}
                onClick={confirmPay}
                className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold"
              >
                Pay ₹{total}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 via-white to-pink-400 text-transparent bg-clip-text"
      >
        Secure Payment
      </motion.h1>

      {/* MAIN GRID */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl"
        >
          <h2 className="text-xl font-bold mb-4">Card Details</h2>

          <input className="input" placeholder="Card Name" />
          <input className="input mt-3" placeholder="Card Number" />

          <div className="grid grid-cols-2 gap-3 mt-3">
            <input className="input" placeholder="MM/YY" />
            <input className="input" placeholder="CVV" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePay}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 font-bold"
          >
            Pay ₹{total}
          </motion.button>
        </motion.div>

        {/* RIGHT */}{/* RIGHT SIDE - PREMIUM CART BOX */}
<motion.div
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-lg"
>

  {/* TITLE BOX */}
  <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
    <h2 className="text-xl font-bold">🧾 Your Cart</h2>
    <p className="text-xs text-gray-400">Review your selected packages</p>
  </div>

  {/* CART ITEMS BOX */}
  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">

    {cart.length === 0 ? (
      <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center text-gray-400">
        No items in cart
      </div>
    ) : (
      cart.map((i) => (
        <motion.div
          key={i.id}
          whileHover={{ scale: 1.02 }}
          className="p-3 rounded-xl bg-black/40 border border-white/10 flex justify-between items-center"
        >

          {/* LEFT INFO */}
          <div>
            <h3 className="font-semibold text-sm">{i.title}</h3>
            <p className="text-xs text-gray-400">{i.location}</p>
          </div>

          {/* RIGHT ACTION */}
          <div className="text-right">
            <p className="text-cyan-300 font-bold text-sm">₹{i.price}</p>

            <button
              onClick={() => {
                const updated = cart.filter((x) => x.id !== i.id);
                setCart(updated);
                localStorage.setItem("cart", JSON.stringify(updated));
              }}
              className="text-xs text-red-400 hover:text-red-500"
            >
              remove
            </button>
          </div>

        </motion.div>
      ))
    )}

  </div>

  {/* TOTAL BOX */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-5 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-white/10"
  >
    <div className="flex justify-between font-bold text-lg">
      <span>Total</span>
      <span className="text-cyan-300">₹{total}</span>
    </div>

    <p className="text-xs text-gray-400 mt-1">
      Secure encrypted payment system
    </p>
  </motion.div>

</motion.div>
  
      </div>

      <style>{`
        .input{
          width:100%;
          padding:12px;
          border-radius:12px;
          background:rgba(0,0,0,0.4);
          border:1px solid rgba(255,255,255,0.1);
          outline:none;
        }
      `}</style>
    </div>
  );
}