const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const outfitRoutes = require("./routes/outfitRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");

const cors = require("cors");
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
module.exports =app;
