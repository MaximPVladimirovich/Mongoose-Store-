// Dependencies
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require(`mongoose`);
const express = require(`express`);
const app = express();
const Balls = require(`./model/products.js`)
const port = process.env.PORT || 3000;



// Middleware 
app.use(express.urlencoded({ extended: true }));

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

// Index
// New
// Delete
// Update
// Create
// Edit
// Show

app.get(`/index/:id`, (req, res) => {
  Book.findById(req.params.id, function (error, ball) {
    res.render(`show.ejs`, { ball })
  })
})



app.listen(port, function () {
  console.log(`listening: ${port}`)
})

