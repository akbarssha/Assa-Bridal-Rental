import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../components/api/axios";
import Navbartwo from "./Navbartwo";

export default function Update() {
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();

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
    if (!window.confirm("Are you sure you want to delete this outfit?"))
      return;

    try {
      await API.delete(`/outfits/${id}`);
      alert("Outfit deleted successfully");
      fetchOutfits(); // refresh
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-slate-300 py-16 px-6">
      <Navbartwo />

      <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
        My Outfits 👗
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {outfits.map((outfit) => (
          <div
            key={outfit._id}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Image */}
            <img
              src={`http://localhost:3036${outfit.images[0]}`}
              alt={outfit.title}
              className="h-64 w-full object-cover"
            />

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {outfit.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {outfit.description}
              </p>

              <p className="text-blue-700 font-bold mt-3">
                ₹{outfit.pricePerDay} / day
              </p>

              {/* Buttons */}
              <div className="flex gap-4 mt-5">
                <button
                  onClick={() => navigate(`/e/${outfit._id}`)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-xl font-semibold hover:bg-yellow-600 transition"
                >
                  Edit ✏️
                </button>

                <button
                  onClick={() => handleDelete(outfit._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}