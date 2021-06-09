// Require and set up dependencies
const express = require(`express`);
const Balls = require("../model/products");
const ballsRouter = express.Router();

// Export functionality
module.exports = ballsRouter;

//Routes

// Index
BallsRouter.get(`/balls`, (req, res) => {
  Balls.find({}, function (error, balls) {
    res.render(`index.ejs`, { balls })
  })

})
// New
BallsRouter.get(`/balls/new`, (req, res) => {
  res.render(`new.ejs`)

})
// Delete
BallsRouter.delete(`/balls/:id`, (req, res) => {
  Balls.findByIdAndDelete(req.params.id, function (error, deletedBall) {
    res.redirect(`/balls`)
  })
})

// update 
BallsRouter.put(`/balls/:id`, (req, res) => {
  const updatedBall = new Balls({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    origin: req.body.origin,
    price: req.body.price,
    inStock: req.body.inStock
  })
  Balls.updateOne({ _id: req.params.id }, updatedBall).then
    (res.redirect(`/balls/${updatedBall._id}`))
})

// Create
BallsRouter.post(`/balls`, (req, res) => {
  Balls.create(req.body, function (error, createdBall) {
    res.redirect(`/balls`)
  });
});

// -Edit
BallsRouter.get(`/balls/:id/edit`, (req, res) => {
  Balls.findById(req.params.id, function (error, ball) {
    res.render(`edit.ejs`, {
      ball
    })
  })
})

// Show
BallsRouter.get(`/balls/:id`, (req, res) => {
  Balls.findById(req.params.id, function (error, ball) {
    res.render(`show.ejs`, { ball })
  })
})