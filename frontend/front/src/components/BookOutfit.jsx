import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../components/api/axios";
import Navbar from "./Navbar";

export default function BookOutfit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [outfit, setOutfit] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch outfit safely
  useEffect(() => {
    const fetchOutfit = async () => {
      try {
        const { data } = await API.get(`/outfits/${id}`);
        setOutfit(data);
      } catch (err) {
        setError("Outfit not found");
      }
    };

    fetchOutfit();
  }, [id]);

  // ✅ Auto calculate price
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

  // ✅ Create booking
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      return alert("Please select valid dates");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/bookings", {
        outfitId: outfit._id,
        startDate,
        endDate,
      });

      alert("Booking Created 🎉");

      // 🚀 Redirect to payment dashboard instead
      navigate("/payments");

    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Handle errors
  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!outfit) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full py-20 bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 min-h-screen">
      <Navbar />

      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Book {outfit.title}
        </h2>

        <p className="text-center text-pink-600 font-semibold mb-4">
          ₹ {outfit.pricePerDay} / day
        </p>

        <form onSubmit={handleBooking} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Start Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-xl border"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              End Date
            </label>
            <input
              type="date"
              min={startDate}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 rounded-xl border"
              required
            />
          </div>

          {totalPrice > 0 && (
            <div className="bg-pink-50 p-4 rounded-2xl text-center">
              <p className="text-lg font-semibold text-gray-700">
                Total Price:
              </p>
              <p className="text-2xl font-bold text-pink-600">
                ₹ {totalPrice}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || totalPrice === 0}
            className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}