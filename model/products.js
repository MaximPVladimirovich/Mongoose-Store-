const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const BallSchema = new Schema({
  title: String,
  description: String,
  sport: String,
  origin: String,
  price: Number,
  inStock: Number
})

const Balls = mongoose.model(`Balls`, BallSchema)

module.exports = Balls