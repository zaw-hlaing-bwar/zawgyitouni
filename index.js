const throng = require('throng')

const PORT = process.env.PORT || 5000
var WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start)

function start(id) {
  const cool = require('cool-ascii-faces')
  const express = require('express')
  var bodyParser = require("body-parser");
  const path = require('path')
  const { zgyi2uni } = require('./zgyi-uni')


  express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .post('/zg2uni', (req, res) => zgyi2uni(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT } ${ id }`))

}