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

// Index
app.get(`/balls`, (req, res) => {
  Balls.find({}, function (error, balls) {
    res.render(`index.ejs`, { balls })
  })

})
// New
app.get(`/balls/new`, (req, res) => {
  res.render(`new.ejs`)

})
// Delete
app.delete(`/balls/:id`, (req, res) => {
  Balls.findByIdAndDelete(req.params.id, function (error, deletedBall) {
    res.redirect(`/balls`)
  })
})

// update 
app.put(`/balls/:id`, (req, res) => {
  const updatedBall = new Balls({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    origin: req.body.origin,
    price: req.body.price,
    inStock: req.body.inStock
  })
  Balls.updateOne({ _id: req.params.id }, updatedBall).then
    (res.redirect(`/balls`))
})


// Create
app.post(`/balls`, (req, res) => {
  Balls.create(req.body, function (error, createdBall) {
    res.redirect(`/balls`)
  });
});

// -Edit
app.get(`/balls/:id/edit`, (req, res) => {
  Balls.findById(req.params.id, function (error, ball) {
    console.log(ball)
    res.render(`edit.ejs`, {
      ball: ball
    })
  })
})
// Show
app.get(`/balls/:id`, (req, res) => {
  Balls.findById(req.params.id, function (error, ball) {
    res.render(`show.ejs`, {
      ball
    })
  })
})


app.get(`/index/:id`, (req, res) => {
  Book.findById(req.params.id, function (error, ball) {
    res.render(`show.ejs`, { ball })
  })
})

// Listen
app.listen(port, function () {
  console.log(`listening: ${port}`)
})

