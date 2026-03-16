const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const outfitRoutes = require("./routes/outfitRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://assa-bridal-rental.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;