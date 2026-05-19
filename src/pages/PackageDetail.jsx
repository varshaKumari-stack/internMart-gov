import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { packages } from "./Packages";

export default function PackageDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === Number(id));

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState("");

  /* LOADER */
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  /*  RANDOM RATING */
  const rating = (Math.random() * 3 + 2).toFixed(1);

  /*  ADD TO CART */
  const addToCart = () => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExist = oldCart.find((i) => i.id === pkg.id);

    /* IF EXISTS */
    if (alreadyExist) {
      setToast("Already Added");

      setTimeout(() => {
        setToast("");
        navigate("/cart");
      }, 1000);

      return;
    }

    /* ADD ITEM */
    const updated = [...oldCart, pkg];

    localStorage.setItem("cart", JSON.stringify(updated));

    /* 🔔 UPDATE NAVBAR */
    window.dispatchEvent(new Event("cartUpdated"));

    /* ✅ TOAST */
    setToast("Added To Cart");

    setTimeout(() => {
      setToast("");
      navigate("/cart");
    }, 1200);
  };

  /* LOADING */
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-2xl animate-pulse font-[cyr]">
          Loading your travel experience...
        </div>
      </div>
    );
  }

  /* NOT FOUND */
  if (!pkg) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 font-[cyr]">Package not found</h1>

          <button
            onClick={() => navigate(-1)}
            className="bg-pink-500 px-5 py-2 rounded-xl font-[cyr]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/*  TOAST */}
      {toast && (
        <div
          className="fixed top-5 right-5 z-50
          px-5 py-3 rounded-2xl
          bg-gradient-to-r from-pink-500 to-red-500
          font-black shadow-2xl font-[aeo-bold]"
        >
          {toast}
        </div>
      )}

      {/* TOP BAR */}
      <div className="flex items-center justify-between p-5">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition font-[aeo-reg]"
        >
          ← Back
        </button>

        <span className="text-sm text-gray-400 font-[aeo-bold]">
          Travel Details
        </span>
      </div>

      {/* HERO IMAGE */}
      <div className="px-5">
        <div
          className="rounded-3xl overflow-hidden
          shadow-2xl border border-white/10 "
        >
          <img
            src={pkg.img}
            alt={pkg.title}
            className="w-full h-[420px]  object-cover hover:scale-105 transition duration-700"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 -mt-10 relative">
        <div
          className="bg-black/60 backdrop-blur-2xl
          border border-white/10
          rounded-3xl p-6 shadow-2xl"
        >
          {/* TITLE */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-black font-[aeo-bold]">
                {pkg.title}
              </h1>

              <p className="text-gray-400 mt-1 font-[aeo-reg]">
                📍 {pkg.location}
              </p>
            </div>

            <div
              className="px-4 py-2 rounded-2xl
              bg-gradient-to-r from-cyan-500/20 to-pink-500/20
              border border-white/10"
            >
              <p className="text-xs text-gray-400 font-[aeo-bold]">
                STARTING FROM
              </p>

              <h2 className="text-2xl font-black text-cyan-400 font-[ge]">
                ₹{pkg.price}
              </h2>
            </div>
          </div>

          {/* BADGES */}
          <div className="flex gap-3 mt-5 flex-wrap">
            <span
              className="px-4 py-2
              bg-pink-500/20
              text-pink-300
              rounded-full text-xs
              border border-pink-500/20"
            >
              ✨ {pkg.type.toUpperCase()}
            </span>

            <span
              className="px-4 py-2
              bg-white/10 rounded-full
              text-xs border border-white/10"
            >
              ⏱ {pkg.duration}
            </span>

            <span
              className="px-4 py-2
              bg-yellow-500/10
              text-yellow-300
              rounded-full text-xs
              border border-yellow-500/20"
            >
              ⭐ {rating}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div
            className="mt-6 p-5 rounded-2xl
            bg-white/5 border border-white/10"
          >
            <h3 className="font-bold text-lg mb-3 font-[aeo-bold]">
              About This Trip
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed font-[aeo-reg]">
              Discover the beauty of{" "}
              <span className="text-cyan-400 font-semibold font-[aeo-reg]">
                {pkg.location}
              </span>{" "}
              with a premium travel experience designed for comfort, adventure,
              and unforgettable memories. Enjoy scenic destinations, luxury
              stays, guided tours, and smooth transportation throughout your
              journey.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div
              className="p-4 rounded-2xl
              bg-white/5 border border-white/10"
            >
              <p className="text-gray-400 text-xs font-[aeo-bold]">HOTEL</p>

              <h3 className="font-bold mt-1 font-[wal]  text-lg tracking-[0.3em]">
                Premium Stay
              </h3>
            </div>

            <div
              className="p-4 rounded-2xl
              bg-white/5 border border-white/10"
            >
              <p className="text-gray-400 text-xs  font-[aeo-bold]">
                TRANSPORT
              </p>

              <h3 className="font-bold mt-1 text-lg tracking-[0.1em]">
                Included
              </h3>
            </div>

            <div
              className="p-4 rounded-2xl
              bg-white/5 border border-white/10"
            >
              <p className="text-gray-400 text-xs font-[aeo-bold]">FOOD</p>

              <h3 className="font-bold mt-1 text-lg tracking-[0.1em]">
                Breakfast Free
              </h3>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              onClick={addToCart}
              className="flex-1
              bg-gradient-to-r
              from-pink-500 to-red-500
              py-4 rounded-2xl
              font-black
              hover:scale-[1.02]
              font-[cyr]
              transition duration-300"
            >
              🛒 Add To Cart
            </button>

            <Link
              to="/cart"
              className="flex-1
              bg-white/10
              border border-white/10
              py-4 rounded-2xl
              text-center font-bold
              hover:bg-white/20
               font-[cyr]
              transition duration-300"
            >
              Open Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="h-10"></div>
    </div>
  );
}
