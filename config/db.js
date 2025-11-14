const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ShopDB")

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("Connected to MongoDB database successfully");
})

db.on('error', (err)=>{
    console.error("MongoDB connection error:", err);
});

module.exports = db;