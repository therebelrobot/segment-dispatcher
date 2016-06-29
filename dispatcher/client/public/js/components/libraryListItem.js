module.exports = function (opts) {
  var m = opts.lib.mithril
  var ee = opts.ee
  var helpers = opts.helpers
  return function (data, currentLibrary) {
    return m('li', {
      className: data.type === currentLibrary.type ? 'active? ' : '',
      'data-type': data.type,
      config: helpers.elConfig({
        onclick: function (event, el) {
          ee.emit('LIBRARY:select', data)
        }
      })
    }, [
      data.name,
      ' ',
      data.status
    ])
  }
}
