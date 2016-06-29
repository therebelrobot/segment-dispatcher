var m = require('mithril')
var ready = require('domready')
var _ = require('lodash')

var request = require('superagent')

var EventEmitter2 = require('eventemitter2')

var wrapperTag = '.dispatcher-app'
var wrapper = document.querySelector(wrapperTag)

var opts = {
  lib: {
    mithril: m,
    domready: ready,
    lodash: _,
    superagent: request,
    EventEmitter2: EventEmitter2
  }
}

var ee = opts.ee = new opts.lib.EventEmitter2({
  wildcard: true,
  delimiter: ':'
})

var model = opts.model = require('./models')(opts)

var helpers = opts.helpers = require('./helpers')(opts)

var components = opts.components = require('./components')(opts)
console.log(components)

window.__dispatcher = opts // for debugging/inspection

var controller = require('./controller')(opts)
var view = require('./view')(opts)

var listeners = require('./listeners')(opts)

var ctrl = {
  controller:  controller,// needed for mithril mounting. Only run on page load.
  view: view
}

// initialize
console.log(wrapper)
ready(function () {
  m.mount(wrapper, ctrl)
})
