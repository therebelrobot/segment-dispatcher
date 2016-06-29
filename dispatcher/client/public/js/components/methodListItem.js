module.exports = function (opts) {
  var m = opts.lib.mithril
  var ee = opts.ee
  var helpers = opts.helpers
  var model = opts.model
  return function (data) {
    return m('li', {
      className: data === model.activeMethod() ? 'active' : '',
      config: helpers.elConfig({
        onclick: function (event, el) {
          ee.emit('METHOD:select', data)
        }
      })
    }, data.toUpperCase())
  }
}
