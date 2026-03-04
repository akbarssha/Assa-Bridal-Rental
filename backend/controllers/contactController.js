const Contact = require("../models/Contact");

// Create Contact Message
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });

  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Get all messages
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};