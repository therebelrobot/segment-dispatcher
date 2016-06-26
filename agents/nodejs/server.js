var express = require('express')
var Analytics = require('analytics-node')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', function(req,res,next){
  var writeKey = req.body.writeKey
  var data = req.body.data

  var analytics = new Analytics(writeKey)

  var dataToSend = {}

  var dataKeys = Object.keys(data)
  for(var i = 0; i < dataKeys.length; i++) {
    var thisKey = dataKeys[i]
    if(thisKey === 'type') continue
    dataToSend[thisKey] = data[thisKey]
  }

  analytics[data.type](dataToSend);
  res.send(200)
})

app.listen(8002, function(){
  console.log('Listening on port', 8002)
})
