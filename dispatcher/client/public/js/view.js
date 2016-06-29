module.exports = function (opts) {
  var _ = opts.lib.lodash
  var m = opts.lib.mithril
  var ee = opts.ee
  var model = opts.model
  var helpers = opts.helpers
  var components = opts.components
  var view = function () { // run on every redraw
    var currentLibrary = _.filter(model.allLibraries(), {type: model.activeLibrary()})[0]
    var dispatchContent = _.map(model.methodDisplay(), function (method) {
      return components.methodWrap(method)
    })
    dispatchContent.push(m('button.submit-content', {
      config: helpers.elConfig({
        onclick: function (event, el) {
          ee.emit('FORM:submit')
        }
      })
    }, model.sendingData() ? m('i.fa.fa-spin.fa-spinner') : 'Simulate'))
    return m('.dispatcher', [
      m('.title', [
        m('h1', 'Analytics Simulator'),
        m('h2', 'Simulate an API call from any Segment Library.')
      ]),
      m('.tool-container', [
        m('.row.library-select', [
          m('label', 'Which Library?'),
          m('.active-library', {
            config: helpers.elConfig({
              onclick: function (event, el) {
                ee.emit('LIBRARY:toggleList', true)
              }
            })
          }, currentLibrary.name),
          m('.close-list', {
            className: model.libraryListOpen() ? '' : 'hidden',
            config: helpers.elConfig({
              onclick: function (event, el) {
                ee.emit('LIBRARY:toggleList', false)
              }
            })
          }, m('i.fa.fa-times-circle')),
          m('ul.available-libraries', {
            className: model.libraryListOpen() ? '' : 'hidden'
          }, _.map(model.allLibraries(), function (lib) {
            return components.libraryListItem(lib, currentLibrary)
          }))
        ]),
        m('.row.method-select', [
          m('ul.method-list', _.map(model.methods(), function (method) {
            return components.methodListItem(method)
          }))
        ]),
        m('.row.account', [
          m('label', 'Write Key'),
          m('input', {
            type: 'text',
            onkeyup: m.withAttr('value', model.account.writeKey),
            value: model.account.writeKey()
          })
        ]),
        m('.row.dispatch-content', dispatchContent),
        m('.row.notifications', {
          className:model.notifications().length?'':'hidden'
        }, _.map(model.notifications(), function(notification){
          return components.notify(notification)
        }))
      ]),
      m('.note', [
        '[Beta] indicates the agent sends data, but not custom. [Unfinished] indicates server running, but not connected to Segment.'
      ])
    ])
  }
  return view
}
