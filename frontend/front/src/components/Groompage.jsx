import { useEffect, useState } from "react";
import API from "../components/api/axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Groomcollection from "./Groomcollection";
import { toast } from "react-toastify";

export default function Groompage() {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3036";

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const res = await API.get("/outfits");

        // ✅ SAFE DATA FIX
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        const groomOutfits = data.filter(
          (o) => o.forWhom === "groom"
        );

        setOutfits(groomOutfits);
      } catch (err) {
        console.error(err);
        setOutfits([]);
      }
    };

    fetchOutfits();
  }, []);

  const handleBookNow = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first 😊");

      setTimeout(() => {
        navigate("/l");
      }, 1200);
    } else {
      navigate(`/bo/${id}`);
    }
  };

  const handleAddToCart = (outfit) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first 😊");

      setTimeout(() => {
        navigate("/l");
      }, 1200);

      return;
    }

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExists = existingCart.find(
      (item) => item._id === outfit._id
    );

    if (alreadyExists) {
      toast.warning("Item already in cart 🛒");
      return;
    }

    existingCart.push(outfit);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success("Added to cart successfully 🛍️");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-slate-300 py-16 px-4 sm:px-6">
      <Navbar />

      {/* Collection Slider */}
      <Groomcollection />

      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-10 sm:mb-12 drop-shadow-lg">
        Groom Collection 🤵
      </h2>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {outfits.map((outfit) => (
          <div
            key={outfit._id}
            className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-blue-500/40 transition-all duration-500"
          >
            {/* ✅ IMAGE FIX */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={`${BASE_URL}${outfit?.images?.[0] || ""}`}
                alt={outfit.title}
                onClick={() =>
                  setSelectedImage(
                    `${BASE_URL}${outfit?.images?.[0] || ""}`
                  )
                }
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 cursor-pointer"
              />
            </div>

            {/* ✅ CARD FIX */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg p-4 sm:p-5 flex flex-col gap-2">
              
              <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
                {outfit.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                {outfit.description}
              </p>

              <p className="text-blue-700 font-bold text-base sm:text-lg">
                ₹{outfit.pricePerDay} / day
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
                <button
                  className="flex-1 px-4 py-2 rounded-xl bg-amber-400 text-white text-sm sm:text-base hover:bg-amber-500 transition"
                  onClick={() => handleAddToCart(outfit)}
                >
                  Add to Cart
                </button>

                <button
                  className="flex-1 px-4 py-2 rounded-xl bg-pink-500 text-white text-sm sm:text-base hover:bg-pink-600 transition"
                  onClick={() => handleBookNow(outfit._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ MODAL FIX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-white text-3xl"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt="Full View"
              className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}