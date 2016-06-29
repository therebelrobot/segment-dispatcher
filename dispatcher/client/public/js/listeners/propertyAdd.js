module.exports = function (opts) {
  var _ = opts.lib.lodash
  var m = opts.lib.mithril
  var model = opts.model
  var ee = opts.ee
  return function (data) {
    var method = data.method
    var type = data.type
    var properties = model.dataToSend[method][type]()
    var newProperty = {
      name: '',
      value: ''
    }
    properties.push(newProperty)
    model.dataToSend[method][type](properties)
    ee.emit('MODEL:update')
  }
}
