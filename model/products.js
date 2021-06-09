const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const BallSchema = new Schema({
  title: String,
  description: String,
  type: String,
  sport: String,
  origin: String,
  size: ({
    low: Number,
    high: Number
  })
}, { timestamps: true })

const Balls = mongoose.model(`Balls`, BallSchema)

module.exports = Balls