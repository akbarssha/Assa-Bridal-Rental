import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/api/axios";
import Navbartwo from "./Navbartwo";

export default function Update() {
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3036";

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    try {
      const res = await API.get("/outfits/my");
      setOutfits(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this outfit?")) return;
    try {
      await API.delete(`/outfits/${id}`);
      alert("Outfit deleted successfully");
      fetchOutfits();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 py-10 sm:py-16 px-4 sm:px-6">
      <Navbartwo />

      <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
        My Outfits 👗
      </h2>

      {outfits.length === 0 ? (
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
          <p className="text-red-900 text-lg sm:text-xl">
            You haven’t added any outfits yet 🎉
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {outfits.map((outfit) => (
            <div
              key={outfit._id}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition hover:scale-105"
            >
              {/* Outfit Image */}
              <img
                src={`${BASE_URL}${outfit.images[0]}`}
                alt={outfit.title}
                className="h-64 w-full object-cover rounded-t-3xl"
              />

              {/* Outfit Content */}
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-red-900">
                  {outfit.title}
                </h3>

                <p className="text-red-800 text-sm sm:text-base mt-2">
                  {outfit.description}
                </p>

                <p className="text-red-900 font-bold mt-3">
                  ₹{outfit.pricePerDay} / day
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-5">
                  <button
                    onClick={() => navigate(`/e/${outfit._id}`)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-2xl font-semibold hover:bg-yellow-600 transition"
                  >
                    Edit ✏️
                  </button>

                  <button
                    onClick={() => handleDelete(outfit._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-2xl font-semibold hover:bg-red-700 transition"
                  >
                    Delete 🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}