var express = require('express')

var app = express()

app.post('/', function(req,res,next){
  res.send(200)
})

app.listen(8002, function(){
  console.log('Listening on port', 8002)
})
