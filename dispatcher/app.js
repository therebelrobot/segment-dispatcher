var path = require('path')

// external dependencies
var express = require('express')
require('colors')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var sass = require('node-sass-middleware')
var browserify = require('browserify-middleware')

// local dependencies
var clientCtrl = require('./client/client.ctrl')
var apiCtrl = require('./api/consume.ctrl')

// instantiate server
var app = express()

// App definitions
app.set('port', process.env.PORT || 5465)
app.set('views', path.join(__dirname, 'client'))
app.set('view engine', 'pug')

// Middleware Instantiation
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

// Actual routes
app.get('/', clientCtrl.get)
app.post('/', apiCtrl.post)

// preprocess/serve public assets
app.get('/js/bundle.js', browserify('./client/public/js/main.js'))
app.use(sass({
  src: path.join(__dirname, 'client/public'),
  dest: path.join(__dirname, 'client/public'),
  debug: true,
  sourceMap: true,
  outputStyle: 'expanded'
}))
app.use(express.static(path.join(__dirname, 'client/public'), { maxAge: 31557600000 }))

// start server
app.listen(app.get('port'), function () {
  console.log('[Segment Dispatcher]'.yellow + ' Server listening on port', app.get('port'))
})
