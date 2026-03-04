const Outfit = require("../models/Outfit");


const createOutfit = async (req, res) => {
  const imagePaths = req.files.map(
    (file) => `/uploads/${file.filename}`
  );

  const outfit = await Outfit.create({
    title: req.body.title,
    description: req.body.description,
    pricePerDay: req.body.pricePerDay,
    size: req.body.size,
    forWhom: req.body.forWhom,
    images: imagePaths,
    vendor: req.user.id,
  });

  res.json(outfit);
};

// GET MY OUTFITS
const getMyOutfits = async (req, res) => {
  const outfits = await Outfit.find({ vendor: req.user.id });
  res.json(outfits);
};

const getOutfits = async (req, res) => {
  const outfits = await Outfit.find().populate("vendor", "name");
  res.json(outfits);
};

const getOutfitById = async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id).populate("vendor", "name");

    if (!outfit) {
      return res.status(404).json({ message: "Outfit not found" });
    }

    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
const updateOutfit = async (req, res) => {
  const outfit = await Outfit.findById(req.params.id);

  if (!outfit) {
    return res.status(404).json({ message: "Outfit not found" });
  }

  if (outfit.vendor.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // If new images uploaded, replace old images
  if (req.files && req.files.length > 0) {
    outfit.images = req.files.map(file => `/uploads/${file.filename}`);
  }

  outfit.pricePerDay = req.body.pricePerDay || outfit.pricePerDay;
  outfit.title = req.body.title || outfit.title;
  outfit.description = req.body.description || outfit.description;

  const updated = await outfit.save();

  res.json(updated);
};

// DELETE
const deleteOutfit = async (req, res) => {
  try {
    const existingBookings = await Booking.find({
      outfit: req.params.id,
      status: { $in: ["pending_payment", "confirmed"] }
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({
        message: "Cannot delete outfit. Active bookings exist."
      });
    }

    await Outfit.findByIdAndDelete(req.params.id);

    res.json({ message: "Outfit deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOutfit,
  getOutfits,
  getMyOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit
};

