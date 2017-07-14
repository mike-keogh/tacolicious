var test = require('tape')
var cheerio = require('cheerio')
var request = require('supertest')
var fs = require('fs')

var app = require('../server')
var data = require('../data.json')
var order = require('../order.json')

test('tests are passing', function(t) {
  t.pass()
  t.end()
})

test('home route works', function(t) {

  request(app)
  .get('/index')
  .end(function(err, res) {
    t.equal(res.status, 200, 'status code ok')
    t.end()
  })
})

test('View routes working', function(t){
  request(app)
  .get('/index/view/1')
  .end(function(err, res) {
    var $ = cheerio.load(res.text)
    t.equal($("input").length, 4)
    t.end()
  })
})

test('redirect from index/view to index/order is working', function(t) {

  request(app)
    .post('/index/view/1')
    .end(function(err, res) {
      t.equal(res.status, 302, "should be redirected")
      t.end()
    })
})

test.only('yourOrder page contains input from form', function(t) {
  request(app)
    .get('/index/view/yourOrder')
    .end(function(err, res) {
      // var $ = cheerio.load(res.text)

      fs.readFile(__dirname + '/../order.json', 'utf8', function(err, data) {
        var json = JSON.parse(order)
        var tacoOrder = json.tacos.find(function(taco) {
          return taco.name
        })
        t.equal(tacoOrder, '{{name}}', 'Form data tranferred over')
        t.end()


    })
})


//
// t.equal($('p').length, 1 , "one p element on order")
// t.end()



})
