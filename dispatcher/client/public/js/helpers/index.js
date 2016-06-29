module.exports = function (opts) {
  var m = opts.lib.mithril
  var model = opts.model
  var notify = function notify (type, message, timeout) {
    var notifications = model.notifications()
    if (!type) {
      notifications = []
    } else {
      notifications = [
        {
          type: type,
          message: message
        }
      ]
    }
    model.notifications(notifications)
    m.redraw(true)
    if (timeout) {
      setTimeout(function () {
        notify()
      }, timeout)
    }
  }
  var functionName = function functionName (func) {
    var name = func.toString()
    name = name.substr('function '.length)
    name = name.substr(0, name.indexOf('('))
    return name
  }
  var elConfig = function elConfig (opts){
    return function (el, isInit, context) {
      if (!isInit && opts.init) {
        opts.init(el, isInit, context)
      }
      if (opts.redraw) {
        opts.redraw(el, isInit, context)
      }
      _.forEach(opts, function (value, key) {
        if (key === 'init') return
        el[key] = function (event) {
          value(event, el, isInit, context, key, value)
        }
      })
    }
  }
  var capitalize = function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return {
    notify: notify,
    functionName: functionName,
    elConfig: elConfig,
    capitalize:capitalize
  }
}
