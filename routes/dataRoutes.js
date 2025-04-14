const express = require("express");
const mongoose = require("mongoose");
const MoodEntry = require("../models/Mood");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// Route 1: Get mood trends over the last 7 days
router.get("/mood-trends", async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const moodData = await MoodEntry.find({ date: { $gte: last7Days } }).sort("date");
    res.json(moodData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching mood trends" });
  }
});

// Route 2: Get Activity vs. Mood correlation
router.get("/activity-mood", async (req, res) => {
  try {
    const activityMoodData = await MoodEntry.find({}, "date mood activityLevel");
    res.json(activityMoodData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching activity-mood correlation" });
  }
});

// Route 3: Get stress levels per week
router.get("/stress-levels", async (req, res) => {
  try {
    const stressData = await MoodEntry.find({}, "date stressLevel");
    res.json(stressData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stress levels" });
  }
});

module.exports = router;
