import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Captcha() {
  const navigate = useNavigate();

  // show for 2 minutes, then wait 1 more minute, then redirect to dashboard
  const SHOW_FOR_MS = 120000; // 2 min
  const READY_DELAY_MS = 60000; // 1 min delay

  useEffect(() => {
    let t;
    let t2;

    t = setTimeout(() => {
      setMessage("Redirecting to dashboard in 1 min...");

      t2 = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, READY_DELAY_MS);
    }, SHOW_FOR_MS);

    return () => {
      if (t) clearTimeout(t);
      if (t2) clearTimeout(t2);
    };
  }, [navigate]);

  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [timer, setTimer] = useState(20);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let str = "";
    for (let i = 0; i < 6; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  };

  // 🔄 CAPTCHA + 20s refresh system
  useEffect(() => {
    setCaptcha(generateCaptcha());
    setTimer(20);

    const refreshInterval = setInterval(() => {
      setCaptcha(generateCaptcha());
      setInput("");
      setMessage("System auto-refreshed verification 🔄");
      setTimer(20);

      setShake(true);
      setTimeout(() => setShake(false), 400);
    }, 20000);

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 20));
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdown);
    };
  }, []);

  // ✅ VERIFY LOGIC
  const handleVerify = () => {
    setShake(true);

    setTimeout(() => {
      const isCorrect = input.toUpperCase() === captcha;
      const systemNoise = Math.random() < 0.25;

      if (isCorrect && !systemNoise) {
        setMessage("Verification Successful ✔ Redirecting...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 900);
      } else {
        setMessage("Verification failed. Please try again.");
        setCaptcha(generateCaptcha());
        setInput("");
      }

      setShake(false);
    }, 500);
  };

  // 🔤 typing animation
  useEffect(() => {
    const text = "SECURITY VERIFICATION";
    let i = 0;

    const interval = setInterval(() => {
      setTitleText(text.slice(0, i + 1));
      i++;
      if (i === text.length) i = 0;
    }, 140);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">
      {/* glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full bottom-[-120px] right-[-120px]" />

      {/* CARD */}
      <div className="w-[440px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7">
        {/* TITLE */}
        <h1 className="text-center text-2xl tracking-[3px] text-cyan-300">
          {titleText}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-center text-xs text-zinc-400 mt-2">
          Automated identity verification system
        </p>

        {/* TIMER */}
        <p className="text-center text-xs text-yellow-400 mt-3">
          Auto refresh in {timer}s
        </p>

        {/* CAPTCHA */}
        <div
          className={`mt-6 flex justify-center items-center h-24 rounded-2xl border border-cyan-500/20 bg-black/40 text-3xl tracking-[10px] transition ${
            shake ? "scale-105" : ""
          }`}
        >
          <span className="text-cyan-300 animate-pulse">{captcha}</span>
        </div>

        {/* INPUT */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter security code"
          className="mt-5 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
        />

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-sm mt-3 text-zinc-300 animate-pulse">
            {message}
          </p>
        )}

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleVerify}
            className="w-full rounded-xl py-3 font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 hover:scale-[1.03] transition"
          >
            VERIFY ACCESS
          </button>

          <button
            onClick={() => {
              setCaptcha(generateCaptcha());
              setInput("");
              setMessage("Manual refresh executed 🔄");
              setTimer(20);
            }}
            className="w-full rounded-xl bg-white/10 py-2 text-sm hover:bg-white/20 transition"
          >
            Refresh Code
          </button>
        </div>
      </div>
    </div>
  );
}
