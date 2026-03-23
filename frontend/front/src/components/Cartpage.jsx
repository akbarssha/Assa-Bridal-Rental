import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Base URL from ENV
  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3036";

  // Load cart from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    }
  }, []);

  // Remove item
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 md:px-10 pb-10 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      <Navbar />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-8 sm:mb-10">
        My Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-emerald-700 text-base sm:text-lg">
          Your cart is empty 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow-lg hover:shadow-emerald-300/40 transition-all duration-300 border border-emerald-200"
            >
              {/* ✅ Responsive Image */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl shadow-md">
                <img
                  src={
                    item.images?.[0]
                      ? `${BASE_URL}${item.images[0]}`
                      : "/no-image.png"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details */}
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-900 mt-4 text-center">
                {item.title}
              </h3>

              <p className="text-emerald-700 font-bold text-base sm:text-lg text-center mt-1">
                ₹{item.pricePerDay} / day
              </p>

              <button
                className="mt-4 w-full py-2 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}