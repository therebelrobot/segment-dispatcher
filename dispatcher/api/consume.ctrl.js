var request = require('request')

var types = {
  golang: 8001,
  nodejs: 8002,
  php: 8003,
  python: 8004,
  ruby: 8005
}

var consume = {
  post: function(req, res){
    console.log(req.body)
    try{
      var data = JSON.parse(req.body.data)
      if(!req.body.writeKey || req.body.writeKey === '') throw new Error('No writeKey provided.')
      if(!req.body.library || req.body.library === '') throw new Error('No library provided.')
      if(!data.type || data.type === '') throw new Error('No Method provided.')
    } catch(e){
      console.error(e)
      return res.sendStatus(400).send({message:e.toString()})
    }
    request.post([
      'http://'+req.body.library,
      types[req.body.library]
      ].join(':'), {form: {writeKey:req.body.writeKey,data:data}},function(err, results){
        console.log(results.body)
        res.send(results.body)
      })
  }
}

module.exports = consume
