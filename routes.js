var express = require('express')
var router = express.Router()
var data = require("./data.json")


router.get("/", function(req, res){

  res.redirect('/index')

})

router.get("/index", function (req, res) {
  res.render("tacos/index", data)
})

router.get('/index/view/:id', function(req, res) {
  var id = req.params.id
  var orderTaco = data.tacos.find(function(taco) {
    return taco.id == id
  })
  res.render('tacos/view', orderTaco)
})


module.exports = router
