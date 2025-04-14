const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const MoodEntry = require("../models/MoodEntry");

// POST - Save a new mood entry
router.post("/", authenticateToken, async (req, res) => {
  const { day, feelings, sleep, productivity, health } = req.body;

  const averageScore = (
    (day + feelings + sleep + productivity + health) / 5
  ).toFixed(1);

  try {
    const newEntry = new MoodEntry({
      userId: req.user.id,
      day,
      feelings,
      sleep,
      productivity,
      health,
      averageScore,
    });

    await newEntry.save();
    res.status(201).json({ message: "Entry saved successfully", entry: newEntry });
  } catch (err) {
    console.error("Error saving mood entry:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Fetch all mood entries for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const entries = await MoodEntry.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (err) {
    console.error("Error fetching mood entries:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
