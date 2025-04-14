const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood"); // Import your Mood model
const verifyToken = require("../middleware/authMiddleware"); // 👈 Import the middleware

// GET Mood Data
router.get("/mood", async (req, res) => {
  try {
    const moodEntries = await Mood.find(); // Fetch all mood entries
    res.json(moodEntries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mood data" });
  }
});

module.exports = router;
