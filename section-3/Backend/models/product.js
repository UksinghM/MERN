const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  count: Number,
  type: String, // category name
  image: String
});
module.exports = mongoose.model('Product', ProductSchema);