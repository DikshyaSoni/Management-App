const mongoose = require("mongoose");

const  shopSchema = new mongoose.Schema({
    shopName :{
        type:String,
        required:true,
    },
    shopId:{
        type:String,
        unique:true,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


module.exports = mongoose.model("shop", shopSchema);