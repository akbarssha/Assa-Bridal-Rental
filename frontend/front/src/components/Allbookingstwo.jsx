import { useEffect, useState } from "react";
import API from "../components/api/axios";
import Navbartwo from "./Navbartwo";

export default function Allbookingstwo() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/bookings/all");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="w-full py-10 sm:py-20 bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 min-h-screen">
      <Navbartwo />

      <div className="max-w-7xl mx-auto py-10 sm:py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center">
          All Outfit Bookings
        </h2>

        {loading ? (
          <p className="text-center text-gray-700 text-lg">
            Loading bookings...
          </p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">
            No bookings found.
          </p>
        ) : (
          <>
            {/* ✅ MOBILE VIEW */}
            <div className="grid grid-cols-1 gap-6 md:hidden">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-lg p-5"
                >
                  <p className="font-bold text-gray-800">
                    {booking.outfit?.title || "Deleted Outfit"}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Vendor: {booking.outfit?.vendor?.name || "Deleted"}
                  </p>

                  <p className="text-sm text-gray-600">
                    User: {booking.user?.name || "Deleted"}
                  </p>

                  <p className="text-sm mt-2">
                    📅{" "}
                    {booking.startDate && booking.endDate
                      ? `${new Date(
                          booking.startDate
                        ).toLocaleDateString()} - ${new Date(
                          booking.endDate
                        ).toLocaleDateString()}`
                      : "-"}
                  </p>

                  <p className="font-bold mt-2 text-gray-800">
                    ₹{booking.totalPrice || "-"}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
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
                </div>
              ))}
            </div>

            {/* ✅ DESKTOP VIEW */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">Outfit</th>
                    <th className="px-6 py-4 text-left">Vendor</th>
                    <th className="px-6 py-4 text-left">Booked By</th>
                    <th className="px-6 py-4 text-left">Dates</th>
                    <th className="px-6 py-4 text-left">Total</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        {booking.outfit?.title || "Deleted"}
                      </td>
                      <td className="px-6 py-4">
                        {booking.outfit?.vendor?.name || "Deleted"}
                      </td>
                      <td className="px-6 py-4">
                        {booking.user?.name || "Deleted"}
                      </td>
                      <td className="px-6 py-4">
                        {booking.startDate && booking.endDate
                          ? `${new Date(
                              booking.startDate
                            ).toLocaleDateString()} - ${new Date(
                              booking.endDate
                            ).toLocaleDateString()}`
                          : "-"}
                      </td>
                      <td className="px-6 py-4 font-bold">
                        ₹{booking.totalPrice || "-"}
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
          </>
        )}
      </div>
    </div>
  );
}