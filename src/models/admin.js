const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  shopId: {
    type: String,
    required: true
  }
}, { timestamps: true });
adminSchema.methods.getJWT = function() {
  const token = jwt.sign(
    { adminId: this._id, shopId: this.shopId },
       process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};

    
module.exports = mongoose.model("Admin", adminSchema);
