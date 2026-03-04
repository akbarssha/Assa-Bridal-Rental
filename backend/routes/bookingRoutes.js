const express = require("express");
const { createBooking, getMyBookings, getVendorBookings, getAllBookings, cancelBooking, getPaymentDashboard, confirmBooking, createPaymentOrder, verifyPayment } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddlewear");
const { authorizeRoles } = require("../middleware/roleMiddlewear");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/vendor", protect, getVendorBookings);
router.get("/all",protect,authorizeRoles("vendor"),getAllBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/payments", protect, getPaymentDashboard);

router.post("/:id/create-order", protect, createPaymentOrder);
router.post("/verify-payment", protect, verifyPayment);

module.exports = router;
