import { useEffect, useState } from "react";
import API from "../components/api/axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3036";

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await API.put(`/bookings/${id}/cancel`);
      alert("Booking Cancelled 🎉");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-300 py-12 sm:py-16 px-4 sm:px-6">
      <Navbar />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-amber-950 mb-8 sm:mb-12">
        My Bookings
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {bookings.length === 0 ? (
          <p className="text-center text-amber-900 text-base sm:text-lg col-span-full">
            No bookings yet
          </p>
        ) : (
          bookings
            .filter((booking) => booking.outfit)
            .map((booking) => (
              <div
                key={booking._id}
                className="bg-yellow-50 rounded-2xl shadow-lg border border-amber-300 p-4 sm:p-5"
              >
                {/* Image */}
                {booking.outfit.images?.[0] && (
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-xl mb-3">
                    <img
                      src={`${BASE_URL}${booking.outfit.images[0]}`}
                      alt={booking.outfit.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <h3 className="text-lg sm:text-xl font-bold text-amber-950">
                  {booking.outfit.title}
                </h3>

                <p className="text-amber-800 text-sm sm:text-base">
                  ₹ {booking.outfit?.pricePerDay} / day
                </p>

                <p className="mt-2 text-amber-900 text-sm sm:text-base">
                  <strong>From:</strong>{" "}
                  {new Date(booking.startDate).toLocaleDateString()}
                </p>

                <p className="text-amber-900 text-sm sm:text-base">
                  <strong>To:</strong>{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>

                <p className="mt-2 font-semibold text-amber-950 text-sm sm:text-base">
                  Total: ₹ {booking.totalPrice}
                </p>

                <p className="mt-1 text-amber-900 text-sm sm:text-base">
                  Status:{" "}
                  <span className="font-bold text-amber-950">
                    {booking.status}
                  </span>
                </p>

                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-4 w-full bg-amber-600 text-white font-semibold py-2.5 sm:py-2 rounded-xl hover:bg-amber-700 transition duration-300 shadow-md text-sm sm:text-base"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))
        )}
      </div>

      {/* Payments Button */}
      <div className="flex justify-center mt-8 sm:mt-10 px-4">
        <button
          onClick={() => navigate("/payments")}
          className="w-full sm:w-auto bg-green-500 text-white px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-600 transition text-sm sm:text-base"
        >
          Go to Payments
        </button>
      </div>
    </div>
  );
}