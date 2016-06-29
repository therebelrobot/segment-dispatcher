module.exports = function listenerBootstrap(opts){
  var _ = opts.lib.lodash
  var ee = opts.ee
  var helpers = opts.helpers
  var listeners = {
    'FORM:submit':require('./formSubmit')(opts),
    'LIBRARY:select':require('./librarySelect')(opts),
    'LIBRARY:toggleList':require('./libraryListToggle')(opts),
    'METHOD:select':require('./methodSelect')(opts),
    'MODEL:update': require('./modelUpdate')(opts),
    'PROPERTY:add':require('./propertyAdd')(opts),
    'PROPERTY:input':require('./propertyInput')(opts),
    'PROPERTY:remove':require('./propertyRemove')(opts)
  }
  _.forEach(listeners, function (callback, event) {
    var fnName = helpers.functionName(callback)
    self[fnName] = callback
    ee.removeAllListeners(event)
    ee.addListener(event, self[fnName])
  })
}
