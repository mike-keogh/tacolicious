var test = require('tape')
var cheerio = require('cheerio')
var request = require('supertest')
var fs = require('fs')
var bodyParser = require('body-parser')

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

test('post to order works', (t) => {
  var order = {
    name: "Fred",
    number: "42",
    sauce: "Cheerio Sauce"
  }
  request(app)
    .post('/index/view/1')
    .send(order)
    .expect(302)
    .end((err, res) => {
      t.error(err)
      fs.readFile(__dirname + '/../order.json', 'utf8', (err, data) => {
        t.error(err)
        data = JSON.parse(data)
        console.log({data});
        for (key in data) {
          t.equal(data[key], order[key], 'data.' + key + ' is the same as the order')
        }
        t.end()
      })
    })
})

test('yourOrder page contains input from form', function(t) {
  request(app)
    .get('/index/view/yourOrder')
    .end(function(err, res) {
      t.error(err)
      var $ = cheerio.load(res.text)

      fs.readFile(__dirname + '/../order.json', 'utf8', function(err, data) {
        t.error(err)
        data = JSON.parse(data)
        var list = $('li')
        console.log(list[2].children);
        t.equal(list.length, 3, 'Form data tranferred over')
        if (list[0].children.length !== 0) {
          t.equal(list[0].children[0].data, data.name, 'Form data tranferred over')
          t.equal(list[1].children[0].data, data.number, 'Form data tranferred over')
          t.equal(list[2].children[0].data, data.sauce, 'Form data tranferred over')
        }
        t.end()

      })
    })
})



//
// t.equal($('p').length, 1 , "one p element on order")
// t.end()
