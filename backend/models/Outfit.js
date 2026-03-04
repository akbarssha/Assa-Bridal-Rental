const mongoose = require("mongoose");

const outfitSchema = new mongoose.Schema({
  title: String,
  description: String,
  pricePerDay: Number,
  size: String,
  images: [String],
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
    forWhom: {
    type: String,
    enum: ["bride", "groom"],
    required: true
  },
});

module.exports = mongoose.model("Outfit", outfitSchema);
