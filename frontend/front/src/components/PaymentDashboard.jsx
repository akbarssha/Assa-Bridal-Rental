import { useEffect, useState } from "react";
import API from "../components/api/axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function PaymentDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const { data } = await API.get("/bookings/payments");
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      setLoadingId(bookingId);

      const { data } = await API.post(`/bookings/${bookingId}/create-order`);

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "Outfit Rental",
        description: "Complete your booking payment",
        handler: async function (response) {
          await API.post("/bookings/verify-payment", { ...response, bookingId });
          alert("Payment Successful 🎉");
          fetchPendingPayments();
          navigate("/mb");
        },
        theme: { color: "#ec4899" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);
        alert("Payment Failed ❌");
      });
    } catch (err) {
      alert("Payment Failed ❌");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 py-10 sm:py-16 px-4 sm:px-6">
      <Navbar />

      <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12 drop-shadow-lg">
        Pending Payments 💳
      </h2>

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {bookings.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-8 text-center">
            <p className="text-red-900 text-lg sm:text-xl">
              No pending payments 🎉
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-red-900 mb-2">
                    {booking.outfit.title}
                  </h3>
                  <p className="text-red-800 text-sm sm:text-base">
                    ₹ {booking.totalPrice}
                  </p>
                </div>

                <button
                  onClick={() => handlePayment(booking._id)}
                  disabled={loadingId === booking._id}
                  className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loadingId === booking._id ? "Processing..." : "Pay Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}