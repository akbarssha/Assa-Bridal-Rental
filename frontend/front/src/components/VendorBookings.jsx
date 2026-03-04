import { useEffect, useState } from "react";
import API from "../components/api/axios"; // your Axios instance
import Navbar from "./Navbar";

export default function VendorBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")); // logged-in vendor

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/vendor"); // backend route for vendor bookings
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
    <div className="w-full py-20 bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 min-h-screen overflow-x-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          My Outfit Bookings
        </h2>

        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">
            No bookings for your outfits yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Outfit
                  </th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Booked By
                  </th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-left text-gray-700 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="px-6 py-4">
                      {booking.outfit ? booking.outfit.title : "Deleted Outfit"}
                    </td>
                    <td className="px-6 py-4">
                      {booking.user ? booking.user.name : "Deleted User"}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(booking.startDate).toLocaleDateString()} -{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold">
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