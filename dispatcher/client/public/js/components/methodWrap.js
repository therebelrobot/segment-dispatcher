module.exports = function (opts) {
  var m = opts.lib.mithril
  var _ = opts.lib.lodash
  var ee = opts.ee
  var helpers = opts.helpers
  var model = opts.model
  return function (data) {
    var children = []
    var method = data.method // identify
    if (method === 'raw') {
      children = children.concat([
        m('label', data.rawLabel),
        m('textarea', {
          oninput: m.withAttr('value', model.dataToSend[method])
        }, model.dataToSend[method]())
      ])
    } else {
      var type = data.type // traits
      var singleType = data.singleType // trait
      var children = []
      _.forEach(data.inputs, function (input) {
        children = children.concat([
          m('label', input.label), // 'User ID'
          m('input', {
            type: 'text',
            onkeyup: m.withAttr('value', model.dataToSend[method][input.attribute]), // userId
            value: model.dataToSend[method][input.attribute]()
          })
        ])
      })
      if (!data.omitProperties) {
        children = children.concat([
          m('label', helpers.capitalize(type)),
          m('.input-groups', _.map(model.dataToSend[method][type](), function (property) {
            return m('.input-group', [
              m('input', {
                type: 'text',
                placeholder: 'name',
                config: helpers.elConfig({
                  onkeyup: function (event, el) {
                    ee.emit('PROPERTY:input', {
                      property: property,
                      method: method,
                      type: type,
                      target: 'name',
                      el: el
                    })
                  }
                }),
                value: property.name
              }),
              m('span', ':'),
              m('input', {
                type: 'text',
                placeholder: 'value',
                config: helpers.elConfig({
                  onkeyup: function (event, el) {
                    ee.emit('PROPERTY:input', {
                      property: property,
                      method: method,
                      type: type,
                      target: 'value',
                      el: el
                    })
                  }
                }),
                value: property.value
              }),
              m('i.fa.fa-times-circle', {
                config: helpers.elConfig({
                  onclick: function (event, el) {
                    ee.emit('PROPERTY:remove', {
                      property: property,
                      method: method,
                      type: type
                    })
                  }
                })
              })
            ])
          })),
          m('button.add-input-group', {
            config: helpers.elConfig({
              onclick: function (event, el) {
                ee.emit('PROPERTY:add', {
                  method: method,
                  type: type
                })
              }
            })
          }, 'Add New ' + helpers.capitalize(singleType))
        ])
      }
    }

    return m('.method-wrap.' + method, {
      className: model.activeMethod() === method ? '' : 'hidden'
    }, children)
  }
}
