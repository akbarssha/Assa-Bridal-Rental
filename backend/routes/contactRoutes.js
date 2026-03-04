const express = require("express");
const { createContact, getAllContacts } = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);       // Public
router.get("/", getAllContacts);       // Admin (you can protect later)

module.exports = router;