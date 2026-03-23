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

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3036";

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const res = await API.get("/outfits");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.outfits || [];

        const brideOutfits = data.filter(
          (o) => o.forWhom === "bride"
        );

        setOutfits(brideOutfits);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOutfits();
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

    toast.success("Added to cart 🛍️");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 py-10 sm:py-16 px-4 sm:px-6">
      
      <Navbar />
      <Bridecollection />

      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12 drop-shadow-lg">
        Bridal Collection 👑
      </h2>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
        
        {outfits.map((outfit) => (
          <div
            key={outfit._id}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl transition-all duration-500"
          >
            {/* Image */}
            <div className="h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden">
              <img
                src={`${BASE_URL}${outfit.images?.[0]}`}
                alt={outfit.title}
                onClick={() =>
                  setSelectedImage(
                    `${BASE_URL}${outfit.images?.[0]}`
                  )
                }
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 cursor-pointer"
              />
            </div>

            {/* Card */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-md p-3 sm:p-5 flex flex-col gap-1 sm:gap-2">
              
              <h3 className="font-semibold text-gray-800 text-base sm:text-xl">
                {outfit.title}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                {outfit.description}
              </p>

              <p className="text-pink-600 font-bold text-sm sm:text-lg">
                ₹{outfit.pricePerDay} / day
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:mt-3">
                
                <button
                  className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-amber-400 text-white text-sm sm:text-base font-semibold hover:bg-amber-500 transition"
                  onClick={() => handleAddToCart(outfit)}
                >
                  Add to Cart
                </button>

                <button
                  className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-pink-500 text-white text-sm sm:text-base font-semibold hover:bg-pink-600 transition"
                  onClick={() => handleBookNow(outfit._id)}
                >
                  Book Now
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
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
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}