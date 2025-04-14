const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  moodLevel: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mood", MoodSchema);
