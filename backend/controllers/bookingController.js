const Booking = require("../models/Bookings");
const Outfit = require("../models/Outfit");
const calculatePrice = require("../utils/priceCalculater");
const { isDateAvailable } = require("../utils/dateHelpers");

const createBooking = async (req, res) => {
  try {
    const { outfitId, startDate, endDate } = req.body;

    const outfit = await Outfit.findById(outfitId);

    const existing = await Booking.find({ outfit: outfitId });

    if (!isDateAvailable(startDate, endDate, existing)) {
      return res.status(400).json({ message: "Dates unavailable" });
    }

    const totalPrice = calculatePrice(
      startDate,
      endDate,
      outfit.pricePerDay
    );

    const booking = await Booking.create({
      user: req.user.id,
      outfit: outfitId,
      startDate,
      endDate,
      totalPrice,
      status: "pending_payment"
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//show bookings as a user
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("outfit", "title pricePerDay images")
      .populate("user", "name email");

    // remove bookings with deleted outfits
    const filtered = bookings.filter(b => b.outfit !== null);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//vendor side-shows all bookings for oufits
const getAllBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find()
      .populate({
        path: "outfit",
        populate: { path: "vendor", select: "name" }, // populate vendor inside outfit
      })
      .populate("user", "name email");

    res.json(allBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Vendor: get bookings for their outfits
const getVendorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "outfit",
        match: { vendor: req.user.id },
        select: "title pricePerDay"
      })
      .populate("user", "name email");

    const filtered = bookings.filter(b => b.outfit !== null);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// cancel booking (user only)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ownership check
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your booking" });
    }

    // prevent double cancel
    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//PAYMENT
const getPaymentDashboard = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
      status: "pending_payment"
    }).populate("outfit", "title pricePerDay images");

    // remove bookings with deleted outfits
    const filtered = bookings.filter(b => b.outfit !== null);

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//CONFIRM BOOKING(after payment)
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Not found" });

    if (booking.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not yours" });

    booking.status = "confirmed";
    await booking.save();

    res.json({ message: "Payment successful", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//Razorpay
const razorpay = require("../utils/razorpay");

const createPaymentOrder = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.status !== "pending_payment")
      return res.status(400).json({ message: "Already paid or cancelled" });

    const options = {
      amount: booking.totalPrice * 100,
      currency: "INR",
      receipt: `receipt_${booking._id}`,
    };

    const order = await razorpay.orders.create(options);

    // ✅ SAVE ORDER ID
    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const crypto = require("crypto");

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId
    } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    // ✅ Verify order ID matches
    if (booking.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    booking.status = "confirmed";
    booking.razorpayPaymentId = razorpay_payment_id;
    await booking.save();

    res.json({ message: "Payment successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getVendorBookings,
  getAllBookings,
  cancelBooking,
  getPaymentDashboard,
  confirmBooking,
  createPaymentOrder,
  verifyPayment
};

