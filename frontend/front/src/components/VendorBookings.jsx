import { useEffect, useState } from "react";
import API from "../components/api/axios"; // your Axios instance
import Navbar from "./Navbar";

export default function VendorBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/vendor");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 py-10 sm:py-16 px-4 sm:px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto py-16">
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
          My Outfit Bookings 📖
        </h2>

        {loading ? (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
            <p className="text-red-900 text-lg sm:text-xl">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
            <p className="text-red-900 text-lg sm:text-xl">
              No bookings for your outfits yet 🎉
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
              <thead className="bg-red-100">
                <tr>
                  <th className="px-6 py-4 text-left text-red-900 font-semibold">
                    Outfit
                  </th>
                  <th className="px-6 py-4 text-left text-red-900 font-semibold">
                    Booked By
                  </th>
                  <th className="px-6 py-4 text-left text-red-900 font-semibold">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-red-900 font-semibold">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-left text-red-900 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-red-200 hover:bg-white/50 transition-all duration-300"
                  >
                    <td className="px-6 py-4 text-red-900 font-medium">
                      {booking.outfit ? booking.outfit.title : "Deleted Outfit"}
                    </td>
                    <td className="px-6 py-4 text-red-900">
                      {booking.user ? booking.user.name : "Deleted User"}
                    </td>
                    <td className="px-6 py-4 text-red-800">
                      {new Date(booking.startDate).toLocaleDateString()} -{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-red-900">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending_payment"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}