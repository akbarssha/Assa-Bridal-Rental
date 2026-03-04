const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  outfit: { type: mongoose.Schema.Types.ObjectId, ref: "Outfit", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending_payment", "confirmed", "cancelled", "completed"],
    default: "pending_payment",
  },
  razorpayOrderId: String,
razorpayPaymentId: String,
});

module.exports = mongoose.model("Booking", bookingSchema);