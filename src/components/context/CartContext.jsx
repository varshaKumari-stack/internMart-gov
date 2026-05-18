import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 🔥 ANIMATION STATES
  const [cartPulse, setCartPulse] = useState(false);

  const [lastAction, setLastAction] = useState("");

  // LOAD STORAGE
  useEffect(() => {
    const stored = localStorage.getItem("govmart-cart");

    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // SAVE STORAGE
  useEffect(() => {
    localStorage.setItem("govmart-cart", JSON.stringify(cart));
  }, [cart]);

  // 🔥 TRIGGER ANIMATION
  const triggerAnimation = (action) => {
    setLastAction(action);

    setCartPulse(true);

    setTimeout(() => {
      setCartPulse(false);
    }, 700);
  };

  // ADD
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);

    triggerAnimation("added");
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    triggerAnimation("removed");
  };

  // CLEAR
  const clearCart = () => {
    setCart([]);

    triggerAnimation("cleared");
  };

  // TOTAL
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart,

        removeFromCart,

        clearCart,

        getTotal,

        // 🔥 EXTRA STATES
        cartPulse,

        lastAction,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
