import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../components/api/axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
export default function BookOutfittwo() {
const navigate = useNavigate();
  const { id } = useParams();   // ✅ Get ID from URL

  const [outfit, setOutfit] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  
  // ✅ Fetch outfit using ID
  useEffect(() => {
    API.get(`/outfits/${id}`).then((res) => {
      setOutfit(res.data);
    });
  }, [id]);

  // ✅ Calculate price automatically
  useEffect(() => {
    if (startDate && endDate && outfit?.pricePerDay) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end > start) {
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;

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

    // ✅ Redirect to MyBookings page
    navigate("/mb");

  } catch (err) {
    alert(err.response?.data?.message || "Booking failed");
  } finally {
    setLoading(false);
  }
};

  if (!outfit) return <div className="text-center mt-20">Loading...</div>;
return (
  <div className="w-full py-20 bg-gradient-to-br from-blue-300 via-indigo-300 to-slate-300 min-h-screen">
    <Navbar />

    <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
      
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">
        Book {outfit?.title}
      </h2>

      <p className="text-center text-indigo-600 font-semibold mb-6 text-lg">
        ₹ {outfit?.pricePerDay ?? 0} / day
      </p>

      <form onSubmit={handleBooking} className="space-y-6">
        
        {/* Start Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            required
          />
        </div>

        {/* Live Price Display */}
        {totalPrice > 0 && (
          <div className="bg-indigo-50 p-5 rounded-2xl text-center shadow-inner border border-indigo-100">
            <p className="text-lg font-semibold text-gray-700">
              Total Price
            </p>
            <p className="text-3xl font-bold text-indigo-700 mt-2">
              ₹ {totalPrice}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || totalPrice === 0}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-lg font-semibold"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

      </form>
    </div>
  </div>
);
}