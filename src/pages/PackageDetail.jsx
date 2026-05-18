 import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { packages } from "./Packages";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pkg = packages.find((p) => p.id === Number(id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-lg animate-pulse">
          Loading your travel experience...
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Package not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-pink-500 px-5 py-2 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">

      {/* TOP BAR */}
      <div className="flex items-center justify-between p-5">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
        >
          ← Back
        </button>

        <span className="text-sm text-gray-400">Travel Details</span>
      </div>

      {/* HERO IMAGE */}
      <div className="px-5">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={pkg.img}
            className="w-full h-[420px] object-cover hover:scale-105 transition duration-700"
          />
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="px-5 -mt-10 relative">

        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

          {/* TITLE */}
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <p className="text-gray-400 mt-1">📍 {pkg.location}</p>

          {/* BADGES */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">
              {pkg.type.toUpperCase()}
            </span>

            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              ⏱ {pkg.duration}
            </span>

            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
              ⭐ {pkg.rating}
            </span>
          </div>

          {/* PRICE */}
          <div className="mt-5 text-3xl font-extrabold text-cyan-400">
            ₹{pkg.price}
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Discover the beauty of <b>{pkg.location}</b> with a perfectly curated travel experience.
            Enjoy scenic views, comfort stays, and unforgettable memories crafted for you.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-3 flex-wrap">

            <button className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 py-3 rounded-2xl font-bold hover:scale-[1.02] transition">
              Book Now
            </button>

            <button className="flex-1 bg-white/10 py-3 rounded-2xl hover:bg-white/20 transition">
              Wishlist
            </button>

          </div>

        </div>

      </div>

      {/* SPACING BOTTOM */}
      <div className="h-10"></div>
    </div>
  );
}