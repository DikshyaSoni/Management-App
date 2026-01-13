const express = require("express");
const mongoose = require("mongoose");
const connectdb = require("./config/Database");
const cookieParser = require("cookie-parser");
const index = express();
index.use(express.json());
const shopRouter = require("./routes/shopRoutes");
const adminRouter = require("./routes/adminRoutes");
require('dotenv').config();


index.use("/", shopRouter);
index.use("/", adminRouter);
index.use(cookieParser());





connectdb()
  .then(() => {
    console.log("database connected succesfully");
const PORT = process.env.PORT || 4000;
    index.listen(4000, () => {
      console.log("succesfuly created a server on port 4000");
    });
  })
  .catch(err => {
    console.error("database cannot be connected");

  });