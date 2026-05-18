import { useEffect, useState } from "react";
import { useCart } from "../components/context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const [toast, setToast] = useState("");
  const [count, setCount] = useState(5);
  const [scan, setScan] = useState(false);

  // clear cart
  useEffect(() => {
    clearCart();
  }, []);

  // toast system
  useEffect(() => {
    const msgs = [
      "🎫 Ticket generated successfully",
      "🔐 Payment secured",
      "📡 Syncing booking data...",
    ];

    const t = setInterval(() => {
      setToast(msgs[Math.floor(Math.random() * msgs.length)]);
      setTimeout(() => setToast(""), 2000);
    }, 4000);

    return () => clearInterval(t);
  }, []);

  // fake scan animation
  useEffect(() => {
    setScan(true);
    const t = setTimeout(() => setScan(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // auto redirect (useful feature)
  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (count <= 0) {
      navigate("/packages");
    }
  }, [count]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-yellow-400 text-black px-3 py-2 rounded z-50">
          {toast}
        </div>
      )}

      {/* FAKE SCAN OVERLAY */}
      {scan && (
        <div className="absolute inset-0 bg-cyan-500/10 animate-pulse flex items-center justify-center text-cyan-300 text-sm">
          Verifying booking data...
        </div>
      )}

      {/* MAIN CARD */}
      <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="text-5xl animate-bounce">🎉</div>

        <h1 className="text-4xl font-bold text-green-400 mt-3">
          Booking Confirmed
        </h1>

        <p className="text-zinc-400 mt-2">
          Your payment is successful & ticket generated
        </p>

        {/* COUNTDOWN */}
        <p className="mt-4 text-sm text-cyan-300">Redirecting in {count}s...</p>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={() => navigate("/products")}
            className="bg-white/10 px-4 py-2 rounded hover:bg-white/20"
          >
            Explore More
          </button>

          <button className="bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 rounded font-bold">
            Download Ticket
          </button>
        </div>

        {/* SMALL NOTE */}
        <p className="text-[10px] text-gray-500 mt-4">
          Secure Travel System • Auto-verification enabled
        </p>
      </div>
    </div>
  );
}
