 import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../components/context/AuthContext";

/* 🎮 BOSS FIGHT */
function LoginBoss({ onWin }) {
  const [hp, setHp] = useState(100);

  useEffect(() => {
    if (hp === 0) onWin();
  }, [hp]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">
      <div className="text-center text-white">
        <h1 className="text-2xl mb-4">💀 LOGIN BOSS 💀</h1>

        <p className="mb-2">Boss HP: {hp}</p>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setHp((p) => Math.max(0, p - 10))}
          className="px-5 py-2 bg-red-500"
        >
          ATTACK
        </motion.button>
      </div>
    </div>
  );
}

/* 🍪 COOKIE MAFIA */
function CookieMafia() {
  const [popups, setPopups] = useState(1);

  return (
    <>
      {[...Array(popups)].map((_, i) => (
        <div
          key={i}
          className="fixed bottom-10 right-10 bg-black border border-white text-white p-2 text-xs z-[998]"
          onClick={() => setPopups(popups + 2)}
        >
          “You hurt our feelings 💀”
        </div>
      ))}
    </>
  );
}

/* 📢 FAKE ADS */
function FakeAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAds((p) => [
        ...p,
        { id: Date.now(), text: "🔥 LIMITED SYSTEM ACCESS AVAILABLE" },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="fixed top-10 right-10 bg-yellow-400 text-black p-2 text-xs z-[998]"
        >
          {ad.text}
        </div>
      ))}
    </>
  );
}

/* 💀 MAIN LOGIN */
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [glitch, setGlitch] = useState(false);
  const [shake, setShake] = useState(false);
  const [warning, setWarning] = useState("");

  const [boss, setBoss] = useState(false);

  /* ⚡ RANDOM SYSTEM CHAOS */
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setShake(true);
      setTimeout(() => setGlitch(false), 120);
      setTimeout(() => setShake(false), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.user_email.value.trim();
    const password = e.target.user_password.value.trim();

    if (!email || !password) {
      setError("ACCESS DENIED");
      setWarning("MISSING CREDENTIALS");
      setShake(true);
      return;
    }

    if (password.length < 6) {
      setError("WEAK KEY");
      setWarning("FIREWALL ALERT");
      setGlitch(true);
      return;
    }

    /* 🎮 TRIGGER BOSS FIGHT */
    setBoss(true);
  };

  const winBossFight = () => {
    setBoss(false);
    setLoading(true);

    setTimeout(() => {
      login();
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-black text-white overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_8px] opacity-20" />

      {/* GLITCH */}
      {glitch && (
        <div className="absolute inset-0 bg-red-500/10 mix-blend-screen animate-pulse pointer-events-none" />
      )}

      {/* ADS + COOKIE MAFIA */}
      <FakeAds />
      <CookieMafia />

      {/* TOP BAR */}
      <div className="absolute top-0 w-full text-center text-[10px] tracking-[0.4em] text-red-400 border-b border-red-500/20 bg-red-500/10 py-2">
        SECURE NODE ACTIVE
      </div>

      {/* LOGIN BOX */}
      <motion.div
        className={`relative z-10 w-[460px] border border-white/10 bg-black/70 p-8 backdrop-blur-xl
        transition-transform duration-150 ${shake ? "translate-x-1" : ""}`}
      >

        {/* HEADER */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <Shield className="text-cyan-300" />
          <div>
            <h1 className="tracking-widest font-bold">LOGIN NODE</h1>
            <p className="text-xs text-zinc-500">system authentication</p>
          </div>
        </div>

        {/* WARNING */}
        {warning && (
          <div className="mt-3 text-xs text-yellow-300 border border-yellow-500/20 bg-yellow-500/10 p-2">
            ⚠ {warning}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            name="user_email"
            placeholder="USER ID"
            className="w-full p-3 bg-black border border-white/10"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="user_password"
              placeholder="AUTH KEY"
              className="w-full p-3 bg-black border border-white/10 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-xs"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {error && (
            <div className="text-red-400 text-xs">{error}</div>
          )}

          <button className="w-full bg-cyan-500/20 border border-cyan-400 py-2">
            ACCESS SYSTEM
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-4 text-center text-xs text-zinc-500">
          No access? <Link to="/signup">Register</Link>
        </div>
      </motion.div>

      {/* 🎮 BOSS FIGHT OVERLAY */}
      {boss && <LoginBoss onWin={winBossFight} />}
    </div>
  );
}