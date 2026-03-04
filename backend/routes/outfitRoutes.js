const express = require("express");
const { createOutfit, getOutfits, updateOutfit, deleteOutfit, getOutfitById, getMyOutfits } = require("../controllers/outfitController");
const { protect } = require("../middleware/authMiddlewear");
const { authorizeRoles } = require("../middleware/roleMiddlewear");
const upload = require("../middleware/upload");
const router = express.Router();


// CREATE
router.post("/", protect, upload.array("images", 5), createOutfit);

//get my outfits
router.get("/my", protect, getMyOutfits);
// ✅ GET ALL OUTFITS
router.get("/", getOutfits);

// ✅ GET SINGLE OUTFIT
router.get("/:id", getOutfitById);

// UPDATE
router.put("/update/:id",protect,upload.array("images", 5),updateOutfit);

// DELETE
router.delete("/:id", protect, deleteOutfit);
module.exports = router;
