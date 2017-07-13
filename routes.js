var express = require('express')
var router = express.Router()
var data = require("./data.json")


router.get("/", function(req, res){
  res.send("hello tacossssss")
})

router.get("/index", function (req, res) {
  res.render("tacos/index", data)
})

module.exports = router
