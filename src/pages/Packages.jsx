 import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- DATA ---------------- */
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

export default function Packages() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* THIEF */
  const [thief, setThief] = useState(false);
  const [thiefPos, setThiefPos] = useState(-100);

  const [popupMsg, setPopupMsg] = useState("");

  /* CAPTCHA */
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);

  /* 🔥 BOSS FIGHT (ONLY BOOK NOW) */
  const [fightOpen, setFightOpen] = useState(false);
  const [fightBossHp, setFightBossHp] = useState(100);
  const [fightPlayerHp, setFightPlayerHp] = useState(100);
  const [fightPkg, setFightPkg] = useState(null);

  /* GLITCH SOUND */
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
    } catch {}
  };

  /* FILTER */
  const filtered = packages.filter((p) => {
    const matchType = filter === "all" ? true : p.type === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  /* THIEF EFFECT */
  useEffect(() => {
    const interval = setInterval(() => {
      setThief(true);
      setThiefPos(-100);

      let pos = -100;
      const move = setInterval(() => {
        pos += 12;
        setThiefPos(pos);
        if (pos > window.innerWidth) {
          clearInterval(move);
          setThief(false);
        }
      }, 40);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  /* POPUP */
  useEffect(() => {
    const t = setInterval(() => {
      const msgs = [
        "⚠ PRICE DISTORTION ACTIVE",
        "📡 SYSTEM GLITCH DETECTED",
        "💀 SERVER FAILURE",
        "🧠 MEMORY CORRUPTION",
      ];
      setPopupMsg(msgs[Math.floor(Math.random() * msgs.length)]);
      setTimeout(() => setPopupMsg(""), 2000);
    }, 7000);

    return () => clearInterval(t);
  }, []);

  /* CAPTCHA VIEW */
  const handleView = (pkg) => {
    setSelectedPkg(pkg);
    setCaptchaOpen(true);
    setTimeLeft(20);
    setInput("");
    setCaptcha(Math.random().toString(36).substring(2, 8));
  };

  useEffect(() => {
    if (!captchaOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setCaptchaOpen(false);
          navigate(`/packages/${selectedPkg.id}`);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [captchaOpen, selectedPkg]);

  /* ⚔️ BOOK NOW → BOSS FIGHT (ONLY CHANGE) */
  const addToCart = (pkg) => {
    setFightOpen(true);
    setFightBossHp(100);
    setFightPlayerHp(100);
    setFightPkg(pkg);

    playGlitch();

    const fight = setInterval(() => {
      playGlitch();

      setFightBossHp((b) => {
        const next = b - Math.random() * 20;

        if (next <= 0) {
          clearInterval(fight);
          setFightOpen(false);

          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          if (!cart.find((i) => i.id === pkg.id)) {
            localStorage.setItem("cart", JSON.stringify([...cart, pkg]));
          }

          navigate("/payment");
        }

        return next;
      });

      setFightPlayerHp((p) => {
        const next = p - Math.random() * 12;

        if (next <= 0) {
          clearInterval(fight);
          setFightOpen(false);
          alert("💀 YOU LOST THE BOSS FIGHT");
        }

        return next;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
{/* HERO HEADER */}
<div className="text-center mb-8">
  <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text animate-pulse">
    ✈ Explore Hidden India
  </h1>

  <p className="text-gray-400 mt-2 text-sm md:text-base">
    Choose your destination • Unlock chaos travel experiences
  </p>

  {/* glowing line */}
  <div className="mt-4 flex justify-center">
    <div className="h-[2px] w-40 bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 blur-sm opacity-70"></div>
  </div>
</div>
      {/* SEARCH */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations..."
          className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20"
        />
      </div>

      {/* POPUP */}
      {popupMsg && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-red-500 px-4 py-2 rounded-xl animate-pulse">
          {popupMsg}
        </div>
      )}

      {/* THIEF */}
      {thief && (
        <div
          className="fixed top-1/2 text-3xl"
          style={{ left: thiefPos }}
        >
          🧟‍♂️
        </div>
      )}

      {/* FILTER */}
 <div className="flex justify-center gap-3 mb-8 flex-wrap">
  {["all", "budget", "premium"].map((t) => (
    <button
      key={t}
      onClick={() => setFilter(t)}
      className={`
        px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
        border border-white/10 backdrop-blur-md
        hover:scale-105 hover:bg-white/20 hover:border-white/30
        active:scale-95
        ${
          filter === t
            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-orange-500/30"
            : "bg-white/10 text-white"
        }
      `}
    >
      {t.toUpperCase()}
    </button>
  ))}
</div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white/5 rounded-2xl overflow-hidden">
            <img src={p.img} className="h-40 w-full object-cover" />

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:scale-[1.02] transition-all duration-300 shadow-lg">
  
  <h2 className="text-xl font-bold text-white tracking-wide">
    {p.title}
  </h2>

  <div className="flex justify-between items-center mt-3">
    
    {/* price badge */}
    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold text-sm shadow-md">
      ₹{p.price}
    </span>

    {/* type badge */}
    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs uppercase tracking-wider">
      {p.type}
    </span>

  </div>
</div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleView(p)}
                  className="flex-1 bg-white/10 py-2 rounded-xl"
                >
                  View
                </button>

                {/* ONLY THIS BUTTON UPGRADED */}
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 bg-cyan-500 text-black font-bold py-2 rounded-xl"
                >
                  Book Now
                </button>
              </div>
            </div>
          
        ))}
      </div>

      {/* ⚔️ BOSS FIGHT MODAL */}
      {fightOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white/10 p-6 rounded-2xl w-96 text-center border border-cyan-500">

            <h2 className="text-xl font-bold text-cyan-400 mb-4">
              ⚔️ BOOKING BOSS FIGHT
            </h2>

            <div className="mb-3">
              <p className="text-red-400">Boss HP</p>
              <div className="h-2 bg-black">
                <div className="bg-red-500 h-2" style={{ width: `${fightBossHp}%` }} />
              </div>
            </div>

            <div className="mb-4">
              <p className="text-green-400">Your HP</p>
              <div className="h-2 bg-black">
                <div className="bg-green-500 h-2" style={{ width: `${fightPlayerHp}%` }} />
              </div>
            </div>

            <p className="text-xs text-gray-400 animate-pulse">
              Fighting system...
            </p>

          </div>
        </div>
      )}

      {/* CAPTCHA (UNCHANGED) */}
      {captchaOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
          <div className="bg-white/10 p-6 rounded-2xl w-80">
            <p className="text-center text-yellow-400 mb-2">
              Auto open in {timeLeft}s
            </p>

            <div className="bg-black p-3 text-center text-red-400">
              {captcha}
            </div>

            <input
              className="w-full mt-3 p-2 bg-black border"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              className="w-full mt-3 bg-cyan-500 text-black py-2"
              onClick={() => {
                if (input === captcha) {
                  setCaptchaOpen(false);
                  navigate(`/packages/${selectedPkg.id}`);
                } else {
                  setCaptcha(Math.random().toString(36).substring(2, 8));
                  setInput("");
                }
              }}
            >
              VERIFY
            </button>
          </div>
        </div>
      )}

    </div>
  );
}