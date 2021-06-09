const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
  title: String,
  description: String,
  img: String,
  madeIn: String,
  price: Number,
  inStock: Number
})

const Products = mongoose.model(`Products`, ProductsSchema)

module.exports = Products