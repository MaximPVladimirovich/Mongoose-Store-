const express = require(`express`);
const productsRouter = express.Router();
const Products = require(`../model/products`)

// Index
productsRouter.get(`/`, (req, res) => {
  Products.find({}, function (error, products) {
    res.render(`index.ejs`, { products })
  })

})
// New
productsRouter.get(`/new`, (req, res) => {
  res.render(`new.ejs`)

})
// Delete
productsRouter.delete(`/:id`, (req, res) => {
  Products.findByIdAndDelete(req.params.id, function (error, deletedBall) {
    res.redirect(`/products`)
  })
})

// update 
productsRouter.put(`/:id`, (req, res) => {
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
productsRouter.post(`/`, (req, res) => {
  Products.create(req.body, function (error, createdBall) {
    res.redirect(`/products`)
  });
});

// -Edit
productsRouter.get(`/:id/edit`, (req, res) => {
  Products.findById(req.params.id, function (error, ball) {
    res.render(`edit.ejs`, {
      ball
    })
  })
})

// Show
productsRouter.get(`/:id`, (req, res) => {
  Products.findById(req.params.id, function (error, ball) {
    res.render(`show.ejs`, { ball })
  })
})

module.exports = productsRouter;