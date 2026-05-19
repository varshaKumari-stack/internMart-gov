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
  }, [hp, onWin]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">
      <div className="text-center text-white">
        <h1 className="text-4xl  font-[rocker] mb-6 text-red-500 animate-pulse">
          💀 LOGIN BOSS 💀
        </h1>

        <p className="mb-4 text-xl font-[wal]">
          Boss HP:
          <span className="text-red-400 font-bold ml-2">{hp}</span>
        </p>

        <div className="w-[300px] h-4 bg-white/10 rounded-full overflow-hidden mx-auto mb-6">
          <motion.div
            animate={{
              width: `${hp}%`,
            }}
            className="h-full bg-gradient-to-r from-red-500 to-pink-500"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setHp((p) => Math.max(0, p - 10))}
          className="px-8 py-3 rounded-2xl
          bg-red-500 font-black shadow-lg font-[cyr]"
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
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-10 right-10
          bg-black border border-white
          text-white p-2 text-sm z-[998]
          cursor-pointer font-[road]"
          onClick={() => setPopups(popups + 2)}
        >
          “You hurt our feelings 💀”
        </motion.div>
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
        {
          id: Date.now(),
          text: "🔥 LIMITED SYSTEM ACCESS AVAILABLE",
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {ads.map((ad) => (
        <motion.div
          key={ad.id}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed top-10 right-10
          bg-yellow-400 text-black
          p-2 text-xs z-[998]
          rounded-lg font-[libre]"
        >
          {ad.text}
        </motion.div>
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

  /* 👤 USER SAVE */
  const [savedEmail, setSavedEmail] = useState("");

  /* 🧠 EXTRA EASTER EGGS */
  const [scanner, setScanner] = useState(false);
  const [clippy, setClippy] = useState(false);
  const [brainrot, setBrainrot] = useState(false);

  const [fakeBan, setFakeBan] = useState(false);

  const [satellite, setSatellite] = useState(false);

  /* ⚡ RANDOM CHAOS */
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setShake(true);
      setTimeout(() => setGlitch(false), 120);
      setTimeout(() => setShake(false), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* 🛰 SATELLITE */
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.15) {
        setSatellite(true);
        setTimeout(() => {
          setSatellite(false);
        }, 4000);
      }
    }, 1500);

    return () => clearInterval(t);
  }, []);

  /* 🧠 SECRET MODE */
  useEffect(() => {
    const handle = (e) => {
      if (e.altKey && e.key === "b") {
        setBrainrot(true);

        setTimeout(() => {
          setBrainrot(false);
        }, 6000);
      }
    };

    window.addEventListener("keydown", handle);

    return () => window.removeEventListener("keydown", handle);
  }, []);

  /* 👁 SCANNER */
  useEffect(() => {
    const handleMouse = () => {
      setScanner(true);

      setTimeout(() => {
        setScanner(false);
      }, 800);
    };

    window.addEventListener("mousemove", handleMouse);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  /* 📎 CLIPPY */
  useEffect(() => {
    const t = setTimeout(() => {
      setClippy(true);

      setTimeout(() => {
        setClippy(false);
      }, 7000);
    }, 10000);

    return () => clearTimeout(t);
  }, []);

  /* 🚀 SUBMIT */
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

    /* 🚫 RANDOM BAN */
    if (Math.random() < 0.15) {
      setFakeBan(true);
      setTimeout(() => {
        setFakeBan(false);
      }, 4000);

      return;
    }

    /* 👤 SAVE EMAIL */
    setSavedEmail(email);

    /* 🎮 START BOSS */
    setBoss(true);
  };

  /* 🏆 WIN */
  const winBossFight = () => {
    setBoss(false);

    setLoading(true);

    setTimeout(() => {
      /* 👤 SAVE USER */
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: savedEmail.split("@")[0].toUpperCase(),

          email: savedEmail,
        }),
      );

      login();
    

      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div
      className={`relative flex h-screen w-screen
      items-center justify-center
      bg-black text-white overflow-hidden
      ${glitch ? "translate-x-[2px]" : ""}`}
    >
      {/* GRID */}
      <div
        className="absolute inset-0
      bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)]
      bg-[size:100%_8px] opacity-20"
      />

      {/* GLITCH */}
      {glitch && (
        <div
          className="absolute inset-0
        bg-red-500/10 mix-blend-screen
        animate-pulse pointer-events-none"
        />
      )}

      {/* ADS */}
      <FakeAds />

      {/* COOKIE */}
      <CookieMafia />

      {/* TOP */}
      <div
        className="absolute top-0 w-full
      text-center text-[20px] font-[road]
      tracking-[0.4em] text-red-400
      border-b border-red-500/20
      bg-red-500/10 py-2"
      >
        SECURE NODE ACTIVE
      </div>

      {/* LOGIN BOX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative z-10
        w-[460px]
        border border-white/10
        bg-black/70 p-8
        backdrop-blur-xl rounded-3xl
        transition-transform duration-150
        ${shake ? "translate-x-1" : ""}`}
      >
        {/* HEADER */}
        <div
          className="flex items-center gap-3
        border-b border-white/10 pb-5"
        >
          <Shield className="text-cyan-300" />

          <div>
            <h1 className="tracking-widest font-[wood]">LOGIN NODE</h1>

            <p className="text-xs text-zinc-500 font-[read]">
              system authentication
            </p>
          </div>
        </div>

        {/* WARNING */}
        {warning && (
          <div
            className="mt-3 text-xs
          text-yellow-300 font-[road]
          border border-yellow-500/20
          bg-yellow-500/10 p-2 rounded-lg"
          >
            ⚠ {warning}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            name="user_email" autoComplete="off"
            placeholder="USER ID"
            className="w-full p-3 font-[cyr]
            bg-black border border-white/10
            rounded-xl outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="user_password"
              placeholder="AUTH KEY"
              className="w-full p-3 font-[ cyr]
              bg-black border border-white/10
              pr-10 rounded-xl outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute
              right-2 top-2 text-xs "
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {error && (
            <div className="text-red-400 text-xs  font-[cyr]">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full
            bg-cyan-500/20
            border border-cyan-400
            py-3 rounded-xl
            hover:bg-cyan-500/30
            transition font-[aeo-bold]"
          >
            {loading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
          </motion.button>
        </form>

        {/* FOOTER */}
        <div
          className="mt-4 text-center
        text-xs text-zinc-500  font-[cyr]"
        >
          No access?
          <Link to="/signup" className="ml-2 text-cyan-400">
            Register
          </Link>
        </div>
      </motion.div>

      {/* 🎮 BOSS */}
      {boss && <LoginBoss onWin={winBossFight} />}

      {/* 👁 SCANNER */}
      <AnimatePresence>
        {scanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0
            z-[997]
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

      {/* 📎 CLIPPY */}
      <AnimatePresence>
        {clippy && (
          <motion.div
            initial={{
              x: 300,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6
            z-[999]
            bg-white text-black p-4
            w-[260px] shadow-2xl
            border-4 border-blue-500"
          >
            <p className="font-[cyr] text-sm">
              📎 Need help hacking the login system?
            </p>

            <p className="text-xs mt-2  font-[cyr]">
              suspicious activity detected...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧠 MODE */}
      <AnimatePresence>
        {brainrot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999]
            bg-pink-500/20 backdrop-blur-md"
          >
            <div
              className="absolute inset-0
            flex flex-col items-center
            justify-center"
            >
              <h1
                className="text-7xl
              font-black text-pink-400
              animate-bounce  font-[libre]"
              >
                BRAINROT MODE
              </h1>

              <p
                className="mt-4 text-white
              tracking-[0.5em]  font-[cyr]"
              >
                SKIBIDI AUTH ACTIVE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚫 BAN */}
      <AnimatePresence>
        {fakeBan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999]
            flex items-center justify-center
            bg-red-950"
          >
            <div className="text-center text-white">
              <h1
                className="text-5xl
            font-[cyr] text-red-500"
              >
                ACCOUNT BANNED
              </h1>

              <p className="mt-4 text-red-200  font-[pg]">
                illegal login attempt detected
              </p>
            </div>
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
            font-[cyr] tracking-[0.4em]"
          >
            🛰 SATELLITE TRACKING ENABLED
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
