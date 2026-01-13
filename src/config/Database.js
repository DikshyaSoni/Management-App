const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dikshyasoni938:dikshyasoni938@managementapp.b4jqfht.mongodb.net/ManagementApp?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    throw err;
  }
};

module.exports = connectdb;
