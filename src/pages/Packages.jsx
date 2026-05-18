 import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- DATA (10 PACKAGES) ---------------- */
export const packages = [
  {
    id: 1,
    title: "Ayodhya Tour",
    price: 2999,
    type: "budget",
    location: "Ayodhya",
    img: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16",
  },
  {
    id: 2,
    title: "Varanasi Ganga Aarti",
    price: 1999,
    type: "budget",
    location: "Varanasi",
    img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc",
  },
  {
    id: 3,
    title: "Taj Mahal Sunrise",
    price: 2499,
    type: "budget",
    location: "Agra",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada",
  },
  {
    id: 4,
    title: "Jaipur Heritage Tour",
    price: 3499,
    type: "budget",
    location: "Jaipur",
    img: "https://staybook.in/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fimages.staybook.in%2Fthings-to-do%2Fjaipur-image%2F16.jpg&w=1920&q=100",
  },
  {
    id: 5,
    title: "Prayagraj River Tour",
    price: 1499,
    type: "budget",
    location: "Prayagraj",
    img: "https://upstdc.co.in/Content/assets/img/about/samgam2.jpg",
  },
  {
    id: 6,
    title: "Goa Luxury Beach Trip",
    price: 7999,
    type: "premium",
    location: "Goa",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  },
  {
    id: 7,
    title: "Manali Himalayan Escape",
    price: 6999,
    type: "premium",
    location: "Manali",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 8,
    title: "Kashmir Valley Dream",
    price: 9999,
    type: "premium",
    location: "Srinagar",
    img: "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
  },
  {
    id: 9,
    title: "Kedarnath Spiritual Trek",
    price: 8999,
    type: "premium",
    location: "Uttarakhand",
    img: "https://www.trekkersofindia.com/product/1805717324013161.webp",
  },
  {
    id: 10,
    title: "Andaman Island Cruise",
    price: 12999,
    type: "premium",
    location: "Andaman",
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  },
];

/* ---------------- COMPONENT ---------------- */
export default function Packages() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* CHAOS STATES (UNCHANGED) */
  const [bossFight, setBossFight] = useState(false);
  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);

  const [thief, setThief] = useState(false);
  const [thiefPos, setThiefPos] = useState(-100);

  const [popupMsg, setPopupMsg] = useState("");

  /* ---------------- VIEW CAPTCHA STATES (NEW) ---------------- */
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);

  /* ---------------- GLITCH SOUND ---------------- */
  const playGlitch = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.value = 120;

      gain.gain.value = 0.05;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  };

  /* ---------------- CAPTCHA ---------------- */
  const generateCaptcha = () => {
    setCaptcha(Math.random().toString(36).substring(2, 8));
  };

  /* ---------------- VIEW HANDLER ---------------- */
  const handleView = (p) => {
    setSelectedPkg(p);
    setCaptchaOpen(true);
    setTimeLeft(20);
    generateCaptcha();
    setInput("");
  };

  /* ---------------- AUTO TIMER ---------------- */
  useEffect(() => {
    if (!captchaOpen || !selectedPkg) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCaptchaOpen(false);
          navigate(`/packages/${selectedPkg.id}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [captchaOpen, selectedPkg]);

  /* ---------------- FILTER ---------------- */
  const filtered = packages.filter((p) => {
    const matchType = filter === "all" ? true : p.type === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* POPUP */}
      {popupMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-xl z-50 animate-pulse">
          {popupMsg}
        </div>
      )}

      {/* THIEF */}
      {thief && (
        <div
          className="fixed top-1/2 z-50 text-3xl animate-bounce"
          style={{ left: `${thiefPos}px` }}
        >
          🧟‍♂️
        </div>
      )}

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-400 via-white to-pink-400 text-transparent bg-clip-text">
        Explore Travel Packages
      </h1>

      {/* SEARCH */}
      <input
        className="w-full mb-6 p-3 rounded-xl bg-white/10 border border-white/10"
        placeholder="Search destinations..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="flex gap-3 mb-10 justify-center flex-wrap">
        {["all", "budget", "premium"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`
              px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest border transition-all duration-300
              ${
                filter === t
                  ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.4)] scale-105"
                  : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:scale-105"
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

            <img src={p.img} className="h-44 w-full object-cover" />

            <div className="p-4">
              <h2 className="text-xl font-bold">{p.title}</h2>

              <div className="flex justify-between items-center mt-2">
                <span className="text-cyan-300 font-bold">₹{p.price}</span>

                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border
                    ${
                      p.type === "premium"
                        ? "bg-pink-500/20 text-pink-300 border-pink-500/40"
                        : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    }
                  `}
                >
                  {p.type}
                </span>
              </div>

              <div className="flex gap-2 mt-4">

                {/* VIEW BUTTON (WORKING) */}
                <button
                  onClick={() => handleView(p)}
                  className="flex-1 bg-white/10 py-2 rounded-xl hover:bg-white/20"
                >
                  View
                </button>

                {/* BOOK NOW (UNCHANGED CHAOS HOOKS) */}
                <button
                  onClick={() => {
                    setBossFight(true);
                    setBossHp(100);
                    setPlayerHp(100);
                    playGlitch();
                  }}
                  className="flex-1 bg-cyan-500 text-black font-bold py-2 rounded-xl"
                >
                  Book Now
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CAPTCHA MODAL */}
      {captchaOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <div className="bg-white/10 p-6 rounded-2xl w-[360px] border border-white/20">

            <h2 className="text-center text-cyan-300 mb-2">
              SECURITY CHECK
            </h2>

            <p className="text-center text-yellow-400 mb-3 animate-pulse">
              Auto opening in {timeLeft}s
            </p>

            <div className="bg-black p-3 text-center text-red-400 tracking-widest rounded-xl">
              {captcha}
            </div>

            <input
              className="w-full mt-4 p-2 bg-black border border-white/10 rounded-xl"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter code..."
            />

            <button
              onClick={() => {
                if (input === captcha) {
                  setCaptchaOpen(false);
                  navigate(`/packages/${selectedPkg.id}`);
                } else {
                  generateCaptcha();
                  setInput("");
                }
              }}
              className="w-full mt-4 bg-cyan-500 text-black py-2 rounded-xl font-bold"
            >
              VERIFY
            </button>

          </div>
        </div>
      )}

    </div>
  );
}