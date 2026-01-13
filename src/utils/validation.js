const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const validateAdminSignUp = (req) => {
    const {email, password, shopId} = req.body;
    if(!email || !password || !shopId){
        throw new Error("All fields are required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }
};
module.exports = {
    validateAdminSignUp
}