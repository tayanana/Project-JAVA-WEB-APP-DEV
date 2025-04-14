const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Login attempt:", { username, password }); // Log input

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ error: "User not found" });
    }

    console.log("✅ User found:", user.username);
    console.log("🔐 Incoming password:", password);
    console.log("🔐 Stored hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "secret123", {
      expiresIn: "1h",
    });

    console.log("✅ Login successful");
    res.json({ token });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


module.exports = router;
