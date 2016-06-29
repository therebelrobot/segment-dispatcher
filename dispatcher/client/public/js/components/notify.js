module.exports = function (opts) {
  var m = opts.lib.mithril
  var ee = opts.ee
  var helpers = opts.helpers
  return function (data) {
    return m('.notification-alert', {
      'data-type': data.type
    }, [
      data.message
    ])
  }
}
