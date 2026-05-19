import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { isAuth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuth) {
      const timer = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, isAuth, navigate]);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <motion.div className="text-center">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-400 font-[AEO-REG] ">
            Checking access...
          </p>
        </motion.div>
      </div>
    );
  }

  // ❌ Not Auth
  if (!isAuth) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex items-center justify-center bg-black text-white"
      >
        <div className="text-center">
          <h1 className="text-7xl   text-red-400 font-[road] ">
            Access Denied
          </h1>
          <p className="text-gray-400 mt-2 font-[road] text-6xl ">
            Redirecting to login...
          </p>

          <div className="h-1 bg-red-500 mt-5 animate-pulse w-40 mx-auto rounded" />
        </div>
      </motion.div>
    );
  }

  // ✅ Auth OK
  return <Outlet />;
}
