import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth");

    setIsAuth(token === "true"); // cleaner

    setLoading(false);
  }, []);

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
