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

      // 1️⃣ Create Razorpay order
      const { data } = await API.post(
        `/bookings/${bookingId}/create-order`
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "Outfit Rental",
        description: "Complete your booking payment",

        handler: async function (response) {
          // 2️⃣ Verify payment
          await API.post("/bookings/verify-payment", {
            ...response,
            bookingId,
          });

          alert("Payment Successful 🎉");

          fetchPendingPayments(); // refresh page
          navigate("/mb"); // go to MyBookings
        },

        theme: {
          color: "#ec4899",
        },
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
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-200 to-amber-100 py-20">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Pending Payments
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">
            No pending payments 🎉
          </p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between bg-pink-50 p-6 rounded-2xl shadow"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {booking.outfit.title}
                  </h3>
                  <p className="text-gray-600">
                    ₹ {booking.totalPrice}
                  </p>
                </div>

                <button
                  onClick={() => handlePayment(booking._id)}
                  disabled={loadingId === booking._id}
                  className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 transition disabled:opacity-50"
                >
                  {loadingId === booking._id
                    ? "Processing..."
                    : "Pay Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}