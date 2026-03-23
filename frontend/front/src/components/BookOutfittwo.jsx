import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../components/api/axios";
import Navbar from "./Navbar";

export default function BookOutfittwo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [outfit, setOutfit] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch outfit
  useEffect(() => {
    const fetchOutfit = async () => {
      try {
        const res = await API.get(`/outfits/${id}`);
        setOutfit(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOutfit();
  }, [id]);

  // Calculate price
  useEffect(() => {
    if (startDate && endDate && outfit?.pricePerDay) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end >= start) {
        const diffTime = end - start;
        const diffDays =
          Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        setTotalPrice(diffDays * outfit.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, outfit]);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/bookings", {
        outfitId: outfit._id,
        startDate,
        endDate,
      });

      alert("Booking Created 🎉");
      navigate("/mb");

    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!outfit) {
    return (
      <div className="text-center mt-20 text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full py-10 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-300 via-indigo-300 to-slate-300 min-h-screen">
      <Navbar />

      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-white/40">
        
        {/* Title */}
        <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-800">
          Book {outfit?.title}
        </h2>

        {/* Price */}
        <p className="text-center text-indigo-600 font-semibold mb-4 sm:mb-6 text-sm sm:text-lg">
          ₹ {outfit?.pricePerDay ?? 0} / day
        </p>

        <form onSubmit={handleBooking} className="space-y-4 sm:space-y-6">
          
          {/* Start Date */}
          <div>
            <label className="block mb-1 sm:mb-2 font-medium text-gray-700 text-sm sm:text-base">
              Start Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 sm:mb-2 font-medium text-gray-700 text-sm sm:text-base">
              End Date
            </label>
            <input
              type="date"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base"
              required
            />
          </div>

          {/* Total Price */}
          {totalPrice > 0 && (
            <div className="bg-indigo-50 p-3 sm:p-5 rounded-2xl text-center shadow-inner border border-indigo-100">
              <p className="text-sm sm:text-lg font-semibold text-gray-700">
                Total Price
              </p>
              <p className="text-xl sm:text-3xl font-bold text-indigo-700 mt-1 sm:mt-2">
                ₹ {totalPrice}
              </p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading || totalPrice === 0}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 sm:py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-lg"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}