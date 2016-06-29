module.exports = function(opts){
  var _ = opts.lib.lodash
  var m = opts.lib.mithril
  var model = opts.model
  var ee = opts.ee
  return function(data){
    model.activeLibrary(data.type)
    ee.emit('LIBRARY:toggleList', false)
  }
}
