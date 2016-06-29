module.exports = function(opts){
  var _ = opts.lib.lodash
  var m = opts.lib.mithril
  var model = opts.model
  var ee = opts.ee
  return function(data){
    var property = data.property
    var method = data.method
    var type = data.type
    var el = data.el
    var target = data.target
    var properties = model.dataToSend[method][type]()
    var propertyIndex = _.findIndex(properties, property)
    properties.splice(propertyIndex, 1)
    var newProperty = {}
    if (target === 'name'){
      newProperty.name = el.value
      newProperty.value = property.value
    } else {
      newProperty.name = property.name
      newProperty.value = el.value
    }
    properties.splice(propertyIndex, 0, newProperty);
    model.dataToSend[method][type](properties)
    ee.emit('MODEL:update')
  }
}
