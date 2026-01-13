const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const Shop = require("../models/shop");
const adminRouter = express.Router();
const {adminAuth} = require ("../../middleware/auth");
const { validateAdminSignUp } = require("../utils/validation");

adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, shopId } = req.body;
 validateAdminSignUp(req);
    if (!email || !password || !shopId) {
      return res.status(400).json({ message: "All fields required" });
    }
   const shop = await Shop.findOne({ shopId });
    if (!shop) {
      return res.status(400).json({ message: "Shop does not exist. Create the shop first." });
    }
    const existingAdmin = await Admin.findOne({ shopId });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists for this shop" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
      shopId
    });

    res.status(201).json({ message: "Admin registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


adminRouter.post("/login",async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

const token = admin.getJWT(); 
   res.cookie("token",token, {
              expires:new Date( Date.now()+ 8*3600000),
            });
    res.json({
      message: "Login successful"

    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = adminRouter;


