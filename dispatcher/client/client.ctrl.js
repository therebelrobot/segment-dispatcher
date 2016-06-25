var client = {
  get: function(req, res){
    res.render('view', {hello:'world'})
  }
}

module.exports = client
