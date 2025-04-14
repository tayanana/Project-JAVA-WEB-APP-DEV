const mongoose = require("mongoose");

const moodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: Number,
  feelings: Number,
  sleep: Number,
  productivity: Number,
  health: Number,
  averageScore: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MoodEntry", moodEntrySchema);
