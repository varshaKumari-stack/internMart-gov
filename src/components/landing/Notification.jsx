 import React from "react";
import { motion } from "framer-motion";

const Notification = () => {
  const reviews = [
    "Captcha changed my personality.",
    "Took only 14 attempts to login.",
    "Website destroyed my confidence.",
    "Payment failed successfully.",
    "Customer support sent me motivation quotes.",
    "Government portal unlocked my anger issues.",
    "OTP arrived after emotional recovery.",
    "Loading screen taught me patience.",
  ];

  // duplicate for seamless loop
  const loopedReviews = [...reviews, ...reviews];

  return (
    <div className="relative py-16 bg-black text-white overflow-hidden">
      
      {/* HEADER */}
      <div className="mb-16 text-center">
        <p className="mb-3 font-semibold tracking-widest text-pink-400 uppercase">
          VERIFIED CITIZEN REVIEWS
        </p>

        <h2 className="text-5xl font-black md:text-6xl">
          Emotional Testimonials
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
          Real experiences from emotionally damaged citizens.
        </p>
      </div>

      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

      {/* MARQUEE */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ scale: 1.02 }}
        >
          {loopedReviews.map((review, i) => (
            <motion.div
              key={i}
              className="min-w-[380px] rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:border-pink-500/40"
              whileHover={{ y: -10 }}
            >
              {/* STARS */}
              <div className="mb-5 flex gap-1 text-yellow-400">
                ★★★★★
              </div>

              {/* REVIEW */}
              <p className="text-lg leading-relaxed text-zinc-300">
                "{review}"
              </p>

              {/* USER */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 font-black">
                  {String.fromCharCode(65 + (i % 26))}
                </div>

                <div>
                  <h4 className="font-bold">Citizen #{1023 + i}</h4>
                  <p className="text-sm text-zinc-500">Verified Victim</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Notification;