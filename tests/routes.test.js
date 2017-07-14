var test = require('tape')
var cheerio = require('cheerio')
var request = require('supertest')

var app = require('../server')
var routes = require('../routes')

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
  .get('/view/1')
  .end(function(err, res) {
    var $ = cheerio.load(res.text)
    t.equal($("input").length, 5)
    t.end()
  })
})
