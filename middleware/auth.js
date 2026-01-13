const jwt = require("jsonwebtoken");
const Admin = require("../src/models/admin")

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SUPER_SECRET_KEY");
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) throw new Error("Admin not found");

    req.admin = admin; // attach admin info to request
    next(); // continue to the route
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = adminAuth;
