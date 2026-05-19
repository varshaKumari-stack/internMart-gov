import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Payment() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [checked, setChecked] = useState(false);

  const [alerts, setAlerts] = useState([]);

  /* EASTER EGGS */
  const [glitch, setGlitch] = useState(false);
  const [scanner, setScanner] = useState(false);
  const [brainrot, setBrainrot] = useState(false);
  const [satellite, setSatellite] = useState(false);
  const [fakeDecline, setFakeDecline] = useState(false);
  const [systemHack, setSystemHack] = useState(false);

  /* LOAD CART */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(data);
  }, []);

  const total = cart.reduce((a, b) => a + b.price, 0);

  /* 🔥 LIVE ALERTS */
  useEffect(() => {
    const msgs = [
      "🔐 Secure tunnel active",
      "⚡ Payment gateway synced",
      "📡 Verifying bank API",
      "🧠 AI fraud scan running",
      "💳 Transaction engine ready",
      "🚀 Booking system stable",
      "🛰 Satellite banking online",
      "👁 Fraud scanner active",
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

  /* ⚡ GLITCH ENGINE */
  useEffect(() => {
    const t = setInterval(() => {
      setGlitch(true);

      setTimeout(() => {
        setGlitch(false);
      }, 200);
    }, 5000);

    return () => clearInterval(t);
  }, []);

  /*  SCANNER */
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

  /*  SATELLITE MODE */
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.15) {
        setSatellite(true);

        setTimeout(() => {
          setSatellite(false);
        }, 3500);
      }
    }, 6000);

    return () => clearInterval(t);
  }, []);

  /* 🎮 SECRET SHORTCUTS */
  useEffect(() => {
    const handle = (e) => {
      /* ALT + B */
      if (e.altKey && e.key === "b") {
        setBrainrot(true);

        setTimeout(() => {
          setBrainrot(false);
        }, 5000);
      }

      /* ALT + H */
      if (e.altKey && e.key === "h") {
        setSystemHack(true);

        setTimeout(() => {
          setSystemHack(false);
        }, 5000);
      }
    };

    window.addEventListener("keydown", handle);

    return () => window.removeEventListener("keydown", handle);
  }, []);

  /* REMOVE */
  const removeItem = (id) => {
    const updated = cart.filter((i) => i.id !== id);

    setCart(updated);

    localStorage.setItem("cart", JSON.stringify(updated));

    setToast("Item removed");

    setTimeout(() => setToast(""), 1200);
  };

  /* PAY */
  const handlePay = () => {
    if (!cart.length) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      /* 🚫 RANDOM DECLINE */
      if (Math.random() < 0.2) {
        setFakeDecline(true);

        setTimeout(() => {
          setFakeDecline(false);
        }, 3500);

        return;
      }

      setCaptcha(true);
    }, 1200);
  };

  /* CONFIRM */
  const confirmPay = () => {
    setCaptcha(false);

    localStorage.removeItem("cart");

    setToast("Payment Success 🎉");

    setTimeout(() => {
      navigate("/success");
    }, 1200);
  };

  return (
    <div
      className={`min-h-screen relative
      bg-black text-white
      px-4 py-10 overflow-hidden
      ${glitch ? "blur-[1px]" : ""}`}
    >
      {/* 🌈 BACKGROUND */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute w-[500px]
        h-[500px] bg-cyan-500/20
        blur-[150px] rounded-full
        top-[-120px] left-[-120px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute w-[500px]
        h-[500px] bg-pink-500/20
        blur-[150px] rounded-full
        bottom-[-120px] right-[-120px]"
      />

      {/* 🔔 TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              y: -50,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            className="fixed top-5 right-5
            bg-yellow-400 text-black
            px-4 py-2 rounded-xl z-50
            font-bold font-[aeo-reg]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/*  ALERTS */}
      <div
        className="fixed left-5 top-5
      space-y-2 z-50 w-72"
      >
        <AnimatePresence>
          {alerts.map((a) => (
            <motion.div
              key={a.id}
              initial={{
                x: -50,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                x: -50,
              }}
              className="bg-white/10
              backdrop-blur-xl
              border border-white/10
              px-4 py-2 rounded-xl
              text-xs font-[aeo-reg]"
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
            className="fixed inset-0
            bg-black/80 flex
            items-center justify-center
            z-50"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="text-cyan-300
              text-2xl font-bold"
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
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0
            bg-black/70 flex
            items-center justify-center
            z-50"
          >
            <div
              className="w-80
            bg-white text-black
            p-6 rounded-3xl"
            >
              <h2
                className="font-black
              text-center text-xl font-[aeo-reg]"
              >
                Verify Identity
              </h2>

              <div
                onClick={() => setChecked(!checked)}
                className="mt-5 flex
                justify-between items-center
                border p-3 rounded-xl
                cursor-pointer"
              >
                <span className="font-[wood]">I am not a robot</span>

                <div
                  className={`w-5 h-5 border
                  ${checked && "bg-green-500"}`}
                />
              </div>

              <button
                disabled={!checked}
                onClick={confirmPay}
                className="mt-4 w-full
                py-3 rounded-xl
                bg-gradient-to-r
                from-cyan-500 to-blue-500
                font-bold font-[cyr]"
              >
                Pay ₹{total}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚫 DECLINED */}
      <AnimatePresence>
        {fakeDecline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0
            bg-red-950 flex
            items-center justify-center
            z-[999]"
          >
            <div className="text-center">
              <h1
                className="text-6xl
              font-black text-red-500 font-[aeo-reg]"
              >
                PAYMENT FAILED
              </h1>

              <p
                className="mt-4
              text-red-200 font-[aeo-reg]"
              >
                suspicious activity detected
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*  SCANNER */}
      <AnimatePresence>
        {scanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0
            z-[998]
            pointer-events-none"
          >
            <div
              className="absolute top-0
            left-0 w-full h-[2px]
            bg-cyan-400 animate-pulse"
            />

            <div
              className="absolute top-1/2
            left-0 w-full h-[1px]
            bg-cyan-500"
            />
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
            className="fixed top-0 left-0
            w-full z-[999]
            bg-cyan-500 text-black
            text-center py-3
            font-black tracking-[0.3em]"
          >
             BANK SATELLITE ACTIVE
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
            className="fixed inset-0
            z-[999]
            bg-pink-500/20
            backdrop-blur-md"
          >
            <div
              className="absolute inset-0
            flex flex-col items-center
            justify-center"
            >
              <h1
                className="text-7xl
              font-black text-pink-400
              animate-bounce font-[libre]"
              >
                BRAINROT PAYMENT
              </h1>

              <p
                className="mt-5
              tracking-[0.5em] font-[aeo-bold]"
              >
                SKIBIDI BANK ACTIVE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💀 HACK */}
      <AnimatePresence>
        {systemHack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0
            bg-black z-[999]
            flex items-center
            justify-center"
          >
            <div className="text-center">
              <h1
                className="text-green-400
              text-6xl font-black font-[aeo-reg]"
              >
                ACCESS GRANTED
              </h1>

              <p
                className="mt-5
              text-green-300 font-[aeo-reg]"
              >
                banking firewall bypassed
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <motion.h1
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="text-5xl font-black
        text-center mb-10
        bg-gradient-to-r
        from-cyan-400 via-white
        to-pink-400
        text-transparent bg-clip-text font-[aeo-reg]"
      >
        Secure Payment
      </motion.h1>

      {/* GRID */}
      <div
        className="max-w-6xl mx-auto
      grid md:grid-cols-2 gap-6"
      >
        {/* LEFT */}
        <motion.div
          initial={{
            x: -50,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          className="bg-white/5
          border border-white/10
          p-6 rounded-3xl
          backdrop-blur-xl"
        >
          <h2
            className="text-2xl
          font-black mb-5 font-[aeo-reg]"
          >
            💳 Card Details
          </h2>

          <input className="input font-[aeo-reg]" placeholder="Card Name" />

          <input className="input mt-3 font-[aeo-reg]" placeholder="Card Number" />

          <div
            className="grid
          grid-cols-2 gap-3 mt-3"
          >
            <input className="input font-[aeo-reg]" placeholder="MM/YY" />

            <input className="input font-[aeo-reg]" placeholder="CVV" />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handlePay}
            className="mt-6 w-full
            py-3 rounded-2xl
            bg-gradient-to-r
            from-pink-500 to-red-500
            font-black font-[aeo-reg]"
          >
            Pay ₹{total}
          </motion.button>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{
            x: 50,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          className="bg-white/5
          border border-white/10
          p-6 rounded-3xl
          backdrop-blur-xl"
        >
          <div
            className="mb-4 p-3
          rounded-xl bg-white/5
          border border-white/10"
          >
            <h2
              className="text-2xl
            font-black font-[aeo-reg]"
            >
              🧾 Your Cart
            </h2>

            <p
              className="text-xs
            text-gray-400 font-[aeo-bold]"
            >
              Review selected packages
            </p>
          </div>

          <div
            className="space-y-3
  max-h-[300px]
  overflow-y-auto pr-2"
          >
            {cart.length === 0 ? (
              /* EMPTY CART UI */
              <div
                onClick={() => navigate("/cart")}
                className="relative overflow-hidden
      h-[220px]
      rounded-3xl
      bg-gradient-to-br
      from-cyan-500/10 via-black/50 to-pink-500/10
      border border-white/10
      flex flex-col items-center justify-center
      text-center cursor-pointer
      hover:scale-[1.02]
      hover:border-cyan-400/30
      transition-all duration-300"
              >
                {/* glow */}
                <div
                  className="absolute inset-0
        bg-gradient-to-r
        from-cyan-500/5 to-pink-500/5
        blur-3xl"
                />

                {/* icon */}
                <div
                  className="relative z-10
        text-6xl animate-bounce"
                >
                  🛒
                </div>

                {/* title */}
                <h2
                  className="relative z-10
        mt-3 text-2xl
        font-black text-white font-[aeo-reg]"
                >
                  Cart Empty
                </h2>

                {/* subtitle */}
                <p
                  className="relative z-10
        text-xs text-gray-400
        mt-2 tracking-wide font-[aeo-bold]"
                >
                  CLICK TO OPEN CART PAGE
                </p>

                {/* button */}
                <div
                  className="relative z-10
  mt-5 px-5 py-2.5
  rounded-xl
  bg-emerald-700 text-white
  text-sm font-bold
  hover:scale-105
  transition-all duration-300 font-[libre]"
                >
                  Open Cart →
                </div>
              </div>
            ) : (
              /* CART ITEMS */
              cart.map((i) => (
                <motion.div
                  key={i.id}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="relative overflow-hidden
        p-4 rounded-2xl font-[aeo-reg]
        bg-gradient-to-r
        from-white/5 to-white/10
        border border-white/10
        flex justify-between items-center"
                >
                  {/* glow */}
                  <div
                    className="absolute inset-0
          bg-cyan-500/5 blur-2xl"
                  />

                  {/* left */}
                  <div className="relative z-10">
                    <h3 className="font-bold font-[aeo-reg] text-white">{i.title}</h3>

                    <p className="text-xs text-gray-400 mt-1 font-[aeo-reg]">
                      📍 {i.location}
                    </p>
                  </div>

                  {/* right */}
                  <div className="relative z-10 text-right font-[aeo-reg]">
                    <p
                      className="text-cyan-300
            font-black text-lg"
                    >
                      ₹{i.price}
                    </p>

                    <button
                      onClick={() => removeItem(i.id)}
                      className="text-xs
            text-red-400
            hover:text-red-500 mt-1 font-[aeo-reg]"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* TOTAL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 p-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500/10
            to-pink-500/10
            border border-white/10"
          >
            <div
              className="flex
            justify-between
            font-black text-lg"
            >
              <span className="font-[aeo-reg]">Total</span>

              <span className="text-cyan-300 font-[ge]">₹{total}</span>
            </div>

            <p
              className=" font-[aeo-bold] text-xs
            text-gray-400 mt-1"
            >
              Secure encrypted payment
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .input{
          width:100%;
          padding:14px;
          border-radius:16px;
          background:rgba(0,0,0,0.4);
          border:1px solid rgba(255,255,255,0.1);
          outline:none;
          color:white;
        }

        .input:focus{
          border-color:rgba(34,211,238,0.5);
          box-shadow:0 0 20px rgba(34,211,238,0.2);
        }
      `}</style>
    </div>
  );
}
