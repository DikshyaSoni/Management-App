
const mongoose = require("mongoose");
require('dotenv').config();


const connectdb = async () => {
  try {
         await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    throw err;
  }
};

module.exports = connectdb;
