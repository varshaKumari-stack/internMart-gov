import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup";
import { Eye, EyeOff, AlertTriangle, UserPlus } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const [glitch, setGlitch] = useState(false);
  const [btnPos, setBtnPos] = useState({
    x: 0,
    y: 0,
  });

  // RANDOM WARNINGS
  useEffect(() => {
    const msgs = [
      "⚠ Registration server overloaded",
      "🔒 Identity verification unstable",
      "📡 Government tracking enabled",
      "🚫 Suspicious citizen detected",
      "💀 Password emotionally weak",
    ];

    const interval = setInterval(() => {
      const id = Date.now();

      const item = {
        id,
        text: msgs[Math.floor(Math.random() * msgs.length)],
      };

      setWarnings((prev) => [...prev, item]);

      setTimeout(() => {
        setWarnings((prev) => prev.filter((w) => w.id !== id));
      }, 3500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // GLITCH EFFECT
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);

      setTimeout(() => {
        setGlitch(false);
      }, 250);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ESCAPE BUTTON
  const moveButton = () => {
    setBtnPos({
      x: Math.random() * 120 - 60,
      y: Math.random() * 40 - 20,
    });
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.user_name.value.trim();

    const email = e.target.user_email.value.trim();

    const password = e.target.user_password.value.trim();

    if (!name || !email || !password) {
      setError("Citizen credentials required.");

      return;
    }

    if (
      password.length < 8 ||
      !password.includes("@") ||
      !password.includes("#")
    ) {
      setError("Password must contain @, # and emotional stability.");

      return;
    }

    setLoading(true);

    setTimeout(() => {
      navigate("/login");
    }, 3200);
  };

  return (
    <div
      className={`relative flex h-screen w-screen overflow-hidden bg-black text-white transition-all duration-700 animate-[fadeIn_1s_ease] ${
        glitch ? "scale-[1.003] blur-[1px]" : ""
      }`}
    >
      {/* NOISE OVERLAY */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* SCAN LINES */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_6px] opacity-20" />

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,255,255,0.2),transparent_30%)]" />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* FLOATING POPUPS */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute z-0 hidden animate-pulse xl:block"
          style={{
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        >
          <div
            className={`rounded-3xl border p-4 shadow-2xl backdrop-blur-2xl ${
              i % 4 === 0
                ? "border-red-500/20 bg-red-500/10"
                : i % 4 === 1
                  ? "border-cyan-500/20 bg-cyan-500/10"
                  : i % 4 === 2
                    ? "border-purple-500/20 bg-purple-500/10"
                    : "border-pink-500/20 bg-pink-500/10"
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              SYSTEM POPUP
            </p>

            <h3 className="mt-2 text-sm font-black text-white">
              {
                [
                  "Citizen Under Review",
                  "Password Emotion Weak",
                  "Identity Sync Failed",
                  "Captcha Loading...",
                  "Government Watching",
                  "Data Leak Possible",
                  "Server Feeling Unstable",
                  "Registration Delayed",
                ][Math.floor(Math.random() * 8)]
              }
            </h3>

            <div className="mt-3 flex items-center justify-between">
              <button className="rounded-xl bg-white/10 px-3 py-1 text-[10px]">
                Ignore
              </button>

              <button className="h-5 w-5 rounded-full bg-red-500 text-[10px] font-black">
                ×
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* WARNING STACK */}
      <div className="fixed right-5 top-5 z-50 space-y-3">
        {warnings.map((w) => (
          <div
            key={w.id}
            className="rounded-2xl border border-purple-500/20 bg-black/70 px-4 py-3 backdrop-blur-xl"
          >
            <p className="text-sm text-purple-300">{w.text}</p>
          </div>
        ))}
      </div>

      {/* LEFT */}
      <div className="hidden w-[45%] border-r border-white/10 bg-white/[0.03] p-12 xl:flex xl:flex-col xl:justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-purple-500 to-cyan-500 text-2xl font-black shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              G
            </div>

            <div>
              <h1 className="font-['Orbitron'] text-4xl font-black tracking-wide">
                GovMart
              </h1>

              <p className="mt-1 text-xs uppercase tracking-[0.4em] text-zinc-500">
                Citizen Registration Division
              </p>
            </div>
          </div>

          <div className="mt-24">
            <p className="text-sm uppercase tracking-[0.4em] text-purple-400">
              Identity Creation Portal
            </p>

            <h2 className="mt-5 font-['Orbitron'] text-6xl font-black leading-tight tracking-tight">
              Citizen
              <br />
              Registration
            </h2>

            <p className="mt-6 max-w-md text-zinc-400">
              Create your unstable government-approved tourism identity profile.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex flex-1 items-center justify-center px-6">
        {/* GLOW */}
        <div className="absolute h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/20 blur-[140px]" />

        {/* CARD */}
        <div className="relative w-full max-w-[520px] animate-float rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(168,85,247,0.08)] backdrop-blur-3xl transition-all duration-500 hover:scale-[1.01] hover:border-purple-400/30 hover:shadow-[0_0_120px_rgba(168,85,247,0.18)]">
          {/* HEADER */}
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              <UserPlus size={36} />
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-purple-400">
              Citizen Registration Portal
            </p>

            <h1 className="mt-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-5xl font-black text-transparent">
              Create Account
            </h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* NAME */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Full Name
              </label>

              <input
                type="text"
                name="user_name"
                autoComplete="off"
                placeholder="Citizen Name"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-purple-400 focus:bg-black/60 focus:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Citizen Email
              </label>

              <input
                type="text"
                name="user_email"
                autoComplete="off"
                placeholder="citizen@gov.in"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-purple-400 focus:bg-black/60 focus:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Security Password
              </label>

              <div className="relative mt-3">
                <input
                  type={showPassword ? "text" : "password"}
                  name="user_password"
                  autoComplete="new-password"
                  placeholder="Strong unstable password"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 pr-14 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-purple-400 focus:bg-black/60 focus:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* BUTTON */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                onMouseEnter={moveButton}
                style={{
                  transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
                }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 px-14 py-4 text-lg font-black shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_80px_rgba(168,85,247,0.65)] active:scale-95"
              >
                <span className="relative z-10">Register Citizen</span>

                <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[100%]" />
              </button>
            </div>
          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">Already registered?</p>

            <Link
              to="/login"
              className="mt-2 inline-block text-sm font-semibold text-purple-300 transition hover:text-purple-200"
            >
              Authenticate Citizen
            </Link>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
          <div className="h-28 w-28 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>

          <h2 className="mt-8 font-['Orbitron'] text-5xl font-black">
            Creating Identity...
          </h2>

          <p className="mt-4 text-zinc-500">
            Please wait while we confuse the database.
          </p>
        </div>
      )}

      {/* VIRUS WARNING */}
      <div className="fixed bottom-6 left-6 animate-shakeSlow rounded-[28px] border border-red-500/20 bg-black/80 p-5 shadow-[0_0_40px_rgba(255,0,0,0.15)] backdrop-blur-2xl">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-red-500/20 p-3">
            <AlertTriangle className="text-red-400" size={24} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-400">
              Virus Alert
            </p>

            <h3 className="mt-1 text-lg font-black">Registration Unsafe</h3>

            <p className="mt-1 text-xs text-zinc-400">
              Continue at your own confusion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
