const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
console.log("Connecting to:", uri);

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch(err => console.error("❌ Connection Error:", err));
