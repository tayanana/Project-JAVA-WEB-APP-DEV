const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
  res.json({ message: "Mood data will be here" });
});

module.exports = router;
