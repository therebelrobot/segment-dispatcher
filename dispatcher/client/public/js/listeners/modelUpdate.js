module.exports = function(opts){
  var m = opts.lib.mithril
  return function(data){
    m.redraw(true)
  }
}
