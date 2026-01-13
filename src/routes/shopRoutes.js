const express = require("express");
const Shop = require("../models/shop");
const shopRouter = express.Router();
const generateShopId = require("../utils/generateShopId");


// create shop
shopRouter.post("/create",async(req,res) =>{

     try{
        const shopName = req.body.shopName;
        if(!shopName){
            res.status(404).send("Please,enter your shop name.")
        }
        const shopId = generateShopId(shopName);
        const newShop = await Shop.create({
            shopName,
            shopId
        });
res.status(201).json({
    message:"Shop created Successfully",
    shopId : newShop.shopId

});
     }
     catch(err){
            res.status(404).send("ERROR : " + err.message);

     }

});

// check shopId
shopRouter.post("/Enter",async (req,res) => {
try{
    const shopId = req.body.shopId;
    
    if(!shopId){
        res.status(404).send("Enter a valid Shop Id");
    }
    const shop = await Shop.findOne({shopId});
     if (!shop) {
            return res.status(404).send("Shop Id not found"); 
        }
    res.status(201).json({
    message:`Welcome To ${shop.shopName}`,
   

});
}
catch(err){
            res.status(404).send("ERROR : " + err.message);
}
});


module.exports = shopRouter;