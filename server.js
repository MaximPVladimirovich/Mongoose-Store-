// Dependencies
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require(`mongoose`);
const express = require(`express`);
const methodOverride = require(`method-override`);
const app = express();
const Balls = require(`./model/products.js`)
const port = process.env.PORT || 3000;



// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(`_method`))
app.use(express.static(__dirname + `/public`));
app.use(express.json());

const db = mongoose.connection;
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
// Connect to db
db.on(`error`, console.error.bind(console, `connection error`));
db.once(`open`, function () {
  console.log(`connected to Database`)
})


// Listen
app.listen(port, function () {
  console.log(`listening: ${port}`)
})

