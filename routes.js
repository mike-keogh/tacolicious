var express = require('express')
var router = express.Router()
var data = require("./data.json")
var order = require("./order.json")
var fs = require('fs')

router.get("/", function(req, res){

  res.redirect('/index')

})

router.get("/index", function (req, res) {
  res.render("tacos/index", data)
})

router.get("/index/view/yourOrder", function (req, res) {
  res.render("tacos/order", order)
})

router.get('/index/view/:id', function(req, res) {
  var id = req.params.id
  var orderTaco = data.tacos.find(function(taco) {
    return taco.id == id
  })
  res.render('tacos/view', orderTaco)
})


router.post('/index/view/:id', function(req, res) {
  var id = req.params.id
  var editOrder = req.body

console.log(editOrder);

  fs.writeFile("order.json", JSON.stringify(editOrder), function (err) {
    if (err) throw err
    res.redirect("/index/view/yourOrder")
  })
})

module.exports = router
