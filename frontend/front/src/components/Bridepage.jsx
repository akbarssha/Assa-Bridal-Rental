import { useEffect, useState } from "react";
import API from "../components/api/axios";
import Navbar from "./Navbar";
import Bridecollection from "./Bridecollection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Bridepage() {
  const navigate = useNavigate();
  const [outfits, setOutfits] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Base URL (important fix)
  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3036";

  useEffect(() => {
    API.get("/outfits").then((res) => {
      const brideOutfits = res.data.filter(
        (o) => o.forWhom === "bride"
      );
      setOutfits(brideOutfits);
    });
  }, []);

  const handleBookNow = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first 😊");
      navigate("/l");
    } else {
      navigate(`/bo/${id}`);
    }
  };

  const handleAddToCart = (outfit) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login first 😊");
      navigate("/l");
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
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 py-16 px-6">
      <Navbar />
      <Bridecollection />

      <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
        Bridal Collection 👑
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {outfits.map((outfit) => (
          <div
            key={outfit._id}
            className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
          >
            {/* ✅ FIXED IMAGE URL */}
            <img
              src={`${BASE_URL}${outfit.images[0]}`}
              alt={outfit.title}
              onClick={() =>
                setSelectedImage(
                  `${BASE_URL}${outfit.images[0]}`
                )
              }
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 cursor-pointer"
            />

            {/* Card */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg p-5 flex flex-col gap-2">
              <h3 className="font-semibold text-gray-800 text-xl">
                {outfit.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {outfit.description}
              </p>

              <p className="text-pink-600 font-bold text-lg">
                ₹{outfit.pricePerDay} / day
              </p>

              <div className="flex gap-3 mt-3">
                <button
                  className="flex-1 px-4 py-2 rounded-xl bg-amber-400 text-white font-semibold hover:bg-amber-500 transition-all duration-300"
                  onClick={() => handleAddToCart(outfit)}
                >
                  Add to Cart
                </button>

                <button
                  className="flex-1 px-4 py-2 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-all duration-300"
                  onClick={() => handleBookNow(outfit._id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-4 text-white text-3xl font-bold"
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
    </div>
  );
}