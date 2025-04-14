require('dotenv').config(); // Load environment variables

const cors = require("cors");
const mongoose = require('mongoose');
const express = require('express');
const entriesRoute = require("./routes/entries");
const app = express(); 

app.use(cors()); 
app.use(express.json()); 





// Import routes
const trackerRoutes = require("./routes/trackerRoutes");
const dataRoutes = require("./routes/dataRoutes");
const moodRoutes = require("./routes/moodRoutes");
const authRoutes = require("./routes/auth.routes"); 
const emailRoute = require('./routes/email');
const journalRoutes = require('./routes/journal');
const userRoutes = require('./routes/user.routes');
// Use routes
app.use("/api/entries", entriesRoute);
app.use("/api/tracker", trackerRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/auth", authRoutes); 
app.use('/api/email', emailRoute);
app.use('/api/journal', journalRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Mental Health Tracker API is running 🚀");
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
