import { useCart } from "../components/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartPopup from "../pages/CartPopup";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // toast
  useEffect(() => {
    const msgs = ["Cart synced", "System optimized", "Secure session active"];

    const t = setInterval(() => {
      setToast(msgs[Math.floor(Math.random() * msgs.length)]);
      setTimeout(() => setToast(""), 1800);
    }, 6000);

    return () => clearInterval(t);
  }, []);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/payment");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-pink-500/10" />

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-5 right-5 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl text-sm border border-white/10"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADING */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-cyan-300"
            >
              Processing checkout...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black">Your Cart</h1>
          <p className="text-gray-400 mt-2">Smooth checkout experience</p>
        </motion.div>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 text-center p-16 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold">Cart is empty</h2>
            <p className="text-gray-400 mt-2">Add items to continue</p>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10 mt-10">
            {/* ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-cyan-300">₹{item.price}</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 text-xs hover:text-red-300"
                    >
                      remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SUMMARY */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 h-fit backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold mb-4">Summary</h2>

              <div className="flex justify-between text-gray-300">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-cyan-300 font-bold text-lg mt-2 mb-6">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 py-3 rounded-xl font-bold"
              >
                Checkout
              </motion.button>

              <button
                onClick={clearCart}
                className="w-full mt-3 bg-white/10 py-3 rounded-xl hover:bg-white/20"
              >
                Clear Cart
              </button>
            </motion.div>
          </div>
        )}
      </div>
      <CartPopup />
    </motion.div>
  );
}
