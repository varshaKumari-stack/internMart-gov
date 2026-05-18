 import { Link } from "react-router-dom";
import { Menu, ShoppingCart, User, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/products" },
    { name: "Cart", path: "/cart" },
    { name: "Login", path: "/login" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="sticky top-0 z-50 overflow-hidden border-b border-white/10 bg-black/40 backdrop-blur-3xl"
    >
      {/* TOP GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,128,0.18),transparent_25%),radial-gradient(circle_at_top_right,rgba(0,255,255,0.12),transparent_25%)]" />

      {/* GRID NOISE */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative mx-auto flex h-20 items-center justify-between px-4 md:px-6">

        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-4">

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-xl font-black shadow-[0_0_35px_rgba(255,0,80,0.45)]"
          >
            <span className="relative z-10">G</span>
          </motion.div>

          <div>
            <h1 className="bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-2xl font-black text-transparent">
              GovMart India
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Ministry Approved Commerce
            </p>
          </div>

        </Link>

        {/* NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-2xl">

          {navItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={item.path}
                className="relative rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300 transition duration-300 hover:bg-white/5 hover:text-pink-400"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/products"
              className="group relative hidden md:flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-xl"
            >
              <Search size={16} />
              Search Tourism
            </Link>
          </motion.div>

          {/* NOTIFICATION */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="relative hidden md:flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </motion.button>

          {/* CART */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/cart"
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            >
              <ShoppingCart size={20} />
              <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-[10px] font-black flex items-center justify-center">
                9
              </span>
            </Link>
          </motion.div>

          {/* PROFILE */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/login"
              className="hidden md:flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            >
              <User size={20} />
            </Link>
          </motion.div>

          {/* MOBILE */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex lg:hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          >
            <Menu size={22} />
          </motion.button>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden border-t border-white/5 bg-gradient-to-r from-pink-500/10 via-transparent to-cyan-500/10"
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs md:px-6">

          <p className="uppercase tracking-[0.25em] text-pink-300">
            ⚠ Ministry Tourism Portal Experiencing Emotional Traffic
          </p>

          <div className="hidden md:flex items-center gap-4">
            <p className="text-zinc-500">Queue Position: #28,93,221</p>

            <div className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-red-300">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
              LIVE CHAOS
            </div>
          </div>

        </div>
      </motion.div>
    </motion.header>
  );
}