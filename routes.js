var express = require('express')
var router = express.Router()
var fs = require('fs')

function readOrder(callback) {
  fs.readFile('./order.json', 'utf8', (err, order) => {
    if (err) throw err
    callback(JSON.parse(order))
  })
}

function readData(callback) {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err
    callback(JSON.parse(data))
  })
}

router.get("/", function(req, res){
  res.redirect('/index')
})

router.get("/index", function (req, res) {
  readData(function(data) {
    res.render("tacos/index", data)
  })
})

router.get("/index/view/yourOrder", function (req, res) {
  readOrder(function(order) {
    res.render("tacos/order", order)
  })
})

router.get('/index/view/:id', function(req, res) {
  var id = req.params.id
  readData(function(data) {
    var orderTaco = data.tacos.find(function(taco) {
      return taco.id == id
    })
    res.render('tacos/view', orderTaco)
  })
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
