const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI; // Make sure name is same in .env

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env");
    process.exit(1);
}

mongoose.connect(MONGO_URI , {
  serverSelectionTimeoutMS: 5000,
})
    .then(() => {
        console.log("🔥 MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

module.exports = mongoose;
