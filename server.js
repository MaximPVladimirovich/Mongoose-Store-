// Dependencies
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require(`mongoose`);
const express = require(`express`);
const methodOverride = require(`method-override`);
const app = express();
const Products = require(`./model/products.js`)
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
app.get(`/products`, (req, res) => {
  Products.find({}, function (error, products) {
    res.render(`index.ejs`, { products })
  })

})
// New
app.get(`/products/new`, (req, res) => {
  res.render(`new.ejs`)

})
// Delete
app.delete(`/products/:id`, (req, res) => {
  Products.findByIdAndDelete(req.params.id, function (error, deletedBall) {
    res.redirect(`/products`)
  })
})

// update 
app.put(`/products/:id`, (req, res) => {
  const updatedBall = new Products({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    madeIn: req.body.madeIn,
    price: req.body.price,
    inStock: req.body.inStock
  })
  Products.updateOne({ _id: req.params.id }, updatedBall).then
    (res.redirect(`/products/${updatedBall._id}`))
})

// Create
app.post(`/products`, (req, res) => {
  Products.create(req.body, function (error, createdBall) {
    res.redirect(`/products`)
  });
});

// -Edit
app.get(`/products/:id/edit`, (req, res) => {
  Products.findById(req.params.id, function (error, ball) {
    res.render(`edit.ejs`, {
      ball
    })
  })
})

// Show
app.get(`/products/:id`, (req, res) => {
  Products.findById(req.params.id, function (error, ball) {
    res.render(`show.ejs`, { ball })
  })
})

// Listen
app.listen(port, function () {
  console.log(`listening: ${port}`)
})

