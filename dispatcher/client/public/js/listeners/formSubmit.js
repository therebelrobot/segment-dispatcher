module.exports = function (opts) {
  var _ = opts.lib.lodash
  var m = opts.lib.mithril
  var request = opts.lib.superagent
  var model = opts.model
  var helpers = opts.helpers
  var ee = opts.ee
  return function (data) {
    model.sendingData(true)
    var modelDataToSend
    switch (model.activeMethod()) {
      case 'identify':
        modelDataToSend = {}
        modelDataToSend.type = 'identify'
        modelDataToSend.userId = model.dataToSend.identify.userId()
        modelDataToSend.traits = {}
        _.forEach(model.dataToSend.identify.traits(), function (trait) {
          modelDataToSend.traits[trait.name] = trait.value
        })
        break
      case 'track':
        modelDataToSend = {}
        modelDataToSend.type = 'track'
        modelDataToSend.userId = model.dataToSend.track.userId()
        modelDataToSend.event = model.dataToSend.track.event()
        modelDataToSend.properties = {}
        _.forEach(model.dataToSend.track.properties(), function (property) {
          modelDataToSend.properties[property.name] = property.value
        })
        break
      case 'group':
        modelDataToSend = {}
        modelDataToSend.type = 'group'
        modelDataToSend.userId = model.dataToSend.group.userId()
        modelDataToSend.groupId = model.dataToSend.group.groupId()
        modelDataToSend.traits = {}
        _.forEach(model.dataToSend.group.traits(), function (trait) {
          modelDataToSend.traits[trait.name] = trait.value
        })
        break
      case 'page':
        modelDataToSend = {}
        modelDataToSend.type = 'page'
        modelDataToSend.userId = model.dataToSend.page.userId()
        modelDataToSend.category = model.dataToSend.page.category()
        modelDataToSend.name = model.dataToSend.page.name()
        modelDataToSend.properties = {}
        _.forEach(model.dataToSend.page.properties(), function (property) {
          modelDataToSend.properties[property.name] = property.value
        })
        break
      case 'alias':
        modelDataToSend = {}
        modelDataToSend.type = 'alias'
        modelDataToSend.userId = model.dataToSend.alias.userId()
        modelDataToSend.previousId = model.dataToSend.alias.previousId()
        break
      default:
        modelDataToSend = model.dataToSend[model.activeMethod()]()
    }
    if (typeof modelDataToSend !== 'string') {
      modelDataToSend = JSON.stringify(modelDataToSend)
    }
    var dataToSend = {
      writeKey: model.account.writeKey(),
      library: model.activeLibrary(),
      data: modelDataToSend
    }
    request.post('/')
      .send(dataToSend)
      .end(function (err, results) {
        model.sendingData(false)
        if(err){
          return helpers.notify('error', [
          'An error occurred during submission: ',
          err.toString(),
          ' - ',
          results.body.message
          ], 10000)
        }
        helpers.notify('success', [
          'Successfully sent ',
          model.activeMethod(),
          ' data to ',
          model.activeLibrary(),
          ' agent.'], 5000)
      })
  }
}
