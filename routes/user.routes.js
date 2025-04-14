const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('../middleware/authMiddleware');

// Save next appointment date
router.post('/appointment', authenticateToken, async (req, res) => {
  const { date } = req.body;

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.nextAppointmentDate = date;
    await user.save();

    res.json({ message: "Next appointment date saved!" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
