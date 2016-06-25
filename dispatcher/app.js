var express = require('express')

var app = express()

app.get('/', function(req,res,next){
  res.send('Hello World')
})

app.listen(8000, function(){
  console.log('Listening on port', 8000)
})
