module.exports = function (opts) {
  var _ = opts.lib.lodash
  var m = opts.lib.mithril
  var model = opts.model
  var ee = opts.ee
  return function (data) {
    var property = data.property
    var method = data.method
    var type = data.type
    var properties = model.dataToSend[method][type]()
    var propertyIndex = _.findIndex(properties, property)
    properties.splice(propertyIndex, 1)
    model.dataToSend[method][type](properties)
    ee.emit('MODEL:update')
  }
}
