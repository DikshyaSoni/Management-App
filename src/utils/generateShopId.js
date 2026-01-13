
function generateShopId(shopName){
    const prefix = shopName.replace(/\s+/g, "").toUpperCase().slice(0,3);
    const random = Math.floor(100 + Math.random()* 1000);
    return `${prefix}${random}`;
}

module.exports = generateShopId;