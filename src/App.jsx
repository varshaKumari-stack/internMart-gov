import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PAGES */
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import Logout from "./pages/auth/logout.jsx";
 

import Dashboard from "./pages/Dashboard";
import Packages from "./pages/Packages";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import PackageDetail from "./pages/PackageDetail";
import Error from "./pages/Error.jsx";

/* ROUTE GUARD */
import ProtectedRoute from "./components/route/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
         

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center bg-black text-white text-xl">
              {<Error />}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
