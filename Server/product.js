var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    productName:{type:String},
    productType:{type:String},
});
var ProductSchema = mongoose.model('Product',ProductSchema);

module.exports = {
    Product : ProductSchema 
};