var m = require('mithril')
var ready = require('domready')
var _ = require('lodash')

var request = require('superagent')

var wrapperTag = '.dispatcher-app'
var wrapper = document.querySelector(wrapperTag)

var model = {
  libraryListOpen: m.prop(false),
  activeLibrary: m.prop('nodejs'),
  allLibraries: m.prop([
    {
      type: 'golang',
      name: 'Go',
      port: 8001,
      useForm: false
    },
    {
      type: 'nodejs',
      name: 'Node.js',
      port: 8002,
      useForm: false
    },
    {
      type: 'php',
      name: 'PHP',
      port: 8003,
      useForm: false
    },
    {
      type: 'python',
      name: 'Python',
      port: 8004,
      useForm: false
    },
    {
      type: 'ruby',
      name: 'Ruby',
      port: 8005,
      useForm: false
    },
    {
      type: 'http',
      name: 'HTTP'
    },
    {
      type: 'clientjs',
      name: 'Client-side Javascript'
    },
    {
      type: 'pixel',
      name: 'Pixel tracking'
    }
  ]),
  activeMethod: m.prop('raw'),
  methods: m.prop([
    'raw',
    'identify',
    'track',
    'group',
    'page',
    'alias'
  ]),
  account: {
    project: m.prop('segment/testing'),
    writeKey: m.prop('0mWwzvSUk0luGkbtc8Unv6bTfla6c5YI')
  },
  sendingData: m.prop(false),
  notifications: m.prop([]),
  dataToSend: {
    raw: m.prop('{\n\t"type": "identify",\n\t"userId": "id",\n\t"context": {\n\t\t"ip": "123.456.7.89"\n\t}\n}'),
    identify: {
      userId: m.prop('019mr8mf4r'),
      traits: m.prop([
        {
          name: 'name',
          value: 'Michael Bolton'
        },
        {
          name: 'email',
          value: 'mbolton@initech.com'
        },
        {
          name: 'plan',
          value: 'Enterprise'
        },
        {
          name: 'friends',
          value: 42
        }
      ])
    },
    track: {
      userId: m.prop('019mr8mf4r'),
      event: m.prop('Purchased an Item'),
      properties: m.prop([
        {
          name: 'revenue',
          value: 39.95
        },
        {
          name: 'shippingMethod',
          value: '2-day'
        }
      ])
    },
    group: {
      userId: m.prop('019mr8mf4r'),
      groupId: m.prop('56'),
      traits: m.prop([
        {
          name: 'name',
          value: 'Initech'
        },
        {
          name: 'description',
          value: 'Accounting Software'
        }
      ])
    },
    page: {
      userId: m.prop('019mr8mf4r'),
      category: m.prop('Docs'),
      name: m.prop('Node.js Library'),
      properties: m.prop([
        {
          name: 'url',
          value: 'https://segment.com/docs/libraries/node'
        },
        {
          name: 'path',
          value: '/docs/libraries/node/'
        },
        {
          name: 'title',
          value: 'Node.js Library - Segment'
        },
        {
          name: 'referrer',
          value: 'https://github.com/segmentio/analytics-node'
        }
      ])
    },
    alias: {
      previousId: m.prop('019mr8mf4r'),
      userId: m.prop('3031396d72386d663472')
    }
  }
}

function notify (type, message, timeout) {
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

var ctrl = {
  controller: function () {return {}}, // needed for mithril mounting. Only run on page load.
  view: function () { // run on every redraw
    var currentLibrary = _.filter(model.allLibraries(), {type: model.activeLibrary()})[0]
    return m('.dispatcher', [
      m('.title', [
        m('h1', 'Analytics Simulator'),
        m('h2', 'Simulate an API call from any Segment Library.')
      ]),
      m('.tool-container', [
        m('.row.library-select', [
          m('label', 'Which Library?'),
          m('.active-library', {
            config: function (el, isInit, context) {
              if (isInit) return
              el.onclick = function (event) {
                model.libraryListOpen(true)
                m.redraw(true)
              }
            }
          }, currentLibrary.name),
          m('.close-list', {
            className: model.libraryListOpen() ? '' : 'hidden',
            config: function (el, isInit, context) {
              if (isInit) return
              el.onclick = function (event) {
                model.libraryListOpen(false)
                m.redraw(true)
              }
            }
          }, m('i.fa.fa-times-circle')),
          m('ul.available-libraries', {
            className: model.libraryListOpen() ? '' : 'hidden'
          }, _.map(model.allLibraries(), function (lib) {
            return m('li', {
              className: lib.type === currentLibrary.type ? 'active? ' : '',
              'data-type': lib.type,
              config: function (el, isInit, context) {
                if (isInit) return
                el.onclick = function (event) {
                  model.activeLibrary(lib.type)
                  model.libraryListOpen(false)
                  m.redraw(true)
                }
              }
            }, [
              lib.name
            ])
          }))
        ]),
        m('.row.method-select', [
          m('ul.method-list', _.map(model.methods(), function (method) {
            return m('li', {
              className: method === model.activeMethod() ? 'active' : '',
              config: function (el, isInit, context) {
                if (isInit) return
                el.onclick = function (event) {
                  model.activeMethod(method)
                  m.redraw(true)
                }
              }
            }, method.toUpperCase())
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
        m('.row.dispatch-content', [
          m('.method-wrap.raw', {
            className: model.activeMethod() === 'raw' ? '' : 'hidden'
          }, [
            m('label', 'Raw JSON'),
            m('textarea', {
              oninput: m.withAttr('value', model.dataToSend.raw)
            }, model.dataToSend.raw())
          ]),
          m('.method-wrap.identify', {
            className: model.activeMethod() === 'identify' ? '' : 'hidden'
          }, [
            m('label', 'User ID'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.identify.userId),
              value: model.dataToSend.identify.userId()
            }),
            m('label', 'Traits'),
            m('.input-groups', _.map(model.dataToSend.identify.traits(), function (trait) {
              return m('.input-group', [
                m('input', {
                  type: 'text',
                  placeholder: 'name',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var traits = model.dataToSend.identify.traits()
                      var traitIndex = _.findIndex(traits, trait)
                      console.log(traits, trait, el.value)
                      traits.splice(traitIndex, 1)
                      var newTrait = {
                        name: el.value,
                        value: trait.value
                      }
                      traits.splice(traitIndex, 0, newTrait);
                      model.dataToSend.identify.traits(traits)
                      m.redraw(true)
                    }
                  },
                  value: trait.name
                }),
                m('span', ':'),
                m('input', {
                  type: 'text',
                  placeholder: 'value',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var traits = model.dataToSend.identify.traits()
                      var traitIndex = _.findIndex(traits, trait)
                      console.log(traitIndex)
                      traits.splice(traitIndex, 1)
                      var newTrait = {
                        name: trait.name,
                        value: el.value
                      }
                      traits.splice(traitIndex, 0, newTrait);
                      model.dataToSend.identify.traits(traits)
                      m.redraw(true)
                    }
                  },
                  value: trait.value
                }),
                m('i.fa.fa-times-circle', {
                  config: function (el, isInit, context) {
                    el.onclick = function (event) {
                      var traits = model.dataToSend.identify.traits()
                      var traitIndex = _.findIndex(traits, trait)
                      console.log(traitIndex)
                      traits.splice(traitIndex, 1)
                      model.dataToSend.identify.traits(traits)
                      m.redraw(true)
                    }
                  }
                })
              ])
            })),
            m('button.add-input-group', {
              config: function (el, isInit, context) {
                if (isInit) return
                el.onclick = function (event) {
                  var traits = model.dataToSend.identify.traits()
                  var newTrait = {
                    name: '',
                    value: ''
                  }
                  traits.push(newTrait)
                  model.dataToSend.identify.traits(traits)
                  m.redraw(true)
                }
              }
            }, 'Add New Trait')

          ]),
          m('.method-wrap.track', {
            className: model.activeMethod() === 'track' ? '' : 'hidden'
          }, [
            m('label', 'User ID'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.track.userId),
              value: model.dataToSend.track.userId()
            }),
            m('label', 'Event'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.track.event),
              value: model.dataToSend.track.event()
            }),
            m('label', 'Properties'),
            m('.input-groups', _.map(model.dataToSend.track.properties(), function (property) {
              return m('.input-group', [
                m('input', {
                  type: 'text',
                  placeholder: 'name',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var properties = model.dataToSend.track.properties()
                      var propertyIndex = _.findIndex(properties, property)
                      console.log(properties, property, el.value)
                      properties.splice(propertyIndex, 1)
                      var newProperty = {
                        name: el.value,
                        value: property.value
                      }
                      properties.splice(propertyIndex, 0, newProperty);
                      model.dataToSend.track.properties(properties)
                      m.redraw(true)
                    }
                  },
                  value: property.name
                }),
                m('span', ':'),
                m('input', {
                  type: 'text',
                  placeholder: 'value',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var properties = model.dataToSend.track.properties()
                      var propertyIndex = _.findIndex(properties, property)
                      console.log(propertyIndex)
                      properties.splice(propertyIndex, 1)
                      var newProperty = {
                        name: property.name,
                        value: el.value
                      }
                      properties.splice(propertyIndex, 0, newProperty);
                      model.dataToSend.track.properties(properties)
                      m.redraw(true)
                    }
                  },
                  value: property.value
                }),
                m('i.fa.fa-times-circle', {
                  config: function (el, isInit, context) {
                    el.onclick = function (event) {
                      var properties = model.dataToSend.track.properties()
                      var propertyIndex = _.findIndex(properties, property)
                      console.log(propertyIndex)
                      properties.splice(propertyIndex, 1)
                      model.dataToSend.track.properties(properties)
                      m.redraw(true)
                    }
                  }
                })
              ])
            })),
            m('button.add-input-group', {
              config: function (el, isInit, context) {
                if (isInit) return
                el.onclick = function (event) {
                  var properties = model.dataToSend.track.properties()
                  var newProperty = {
                    name: '',
                    value: ''
                  }
                  properties.push(newProperty)
                  model.dataToSend.track.properties(properties)
                  m.redraw(true)
                }
              }
            }, 'Add New Property')

          ]),
          m('.method-wrap.group', {
            className: model.activeMethod() === 'group' ? '' : 'hidden'
          }, [
            m('label', 'User ID'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.group.userId),
              value: model.dataToSend.group.userId()
            }),
            m('label', 'Group ID'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.group.groupId),
              value: model.dataToSend.group.groupId()
            }),
            m('label', 'Traits'),
            m('.input-groups', _.map(model.dataToSend.group.traits(), function (trait) {
              return m('.input-group', [
                m('input', {
                  type: 'text',
                  placeholder: 'name',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var traits = model.dataToSend.group.traits()
                      var traitIndex = _.findIndex(traits, trait)
                      console.log(traits, trait, el.value)
                      traits.splice(traitIndex, 1)
                      var newTrait = {
                        name: el.value,
                        value: trait.value
                      }
                      traits.splice(traitIndex, 0, newTrait);
                      model.dataToSend.group.traits(traits)
                      m.redraw(true)
                    }
                  },
                  value: trait.name
                }),
                m('span', ':'),
                m('input', {
                  type: 'text',
                  placeholder: 'value',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var traits = model.dataToSend.group.traits()
                      var traitIndex = _.findIndex(traits, trait)
                      console.log(traitIndex)
                      traits.splice(traitIndex, 1)
                      var newTrait = {
                        name: trait.name,
                        value: el.value
                      }
                      traits.splice(traitIndex, 0, newTrait);
                      model.dataToSend.group.traits(traits)
                      m.redraw(true)
                    }
                  },
                  value: trait.value
                }),
                m('i.fa.fa-times-circle', {
                  config: function (el, isInit, context) {
                    el.onclick = function (event) {
                      var traits = model.dataToSend.group.traits()
                      var traitIndex = _.findIndex(traits, trait)
                      console.log(traitIndex)
                      traits.splice(traitIndex, 1)
                      model.dataToSend.group.traits(traits)
                      m.redraw(true)
                    }
                  }
                })
              ])
            })),
            m('button.add-input-group', {
              config: function (el, isInit, context) {
                if (isInit) return
                el.onclick = function (event) {
                  var traits = model.dataToSend.group.traits()
                  var newTrait = {
                    name: '',
                    value: ''
                  }
                  traits.push(newTrait)
                  model.dataToSend.group.traits(traits)
                  m.redraw(true)
                }
              }
            }, 'Add New Trait')
          ]),
          m('.method-wrap.page', {
            className: model.activeMethod() === 'page' ? '' : 'hidden'
          }, [m('label', 'User ID'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.page.userId),
              value: model.dataToSend.page.userId()
            }),
            m('label', 'Category'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.page.category),
              value: model.dataToSend.page.category()
            }),
            m('label', 'Name'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.page.name),
              value: model.dataToSend.page.name()
            }),
            m('label', 'Properties'),
            m('.input-groups', _.map(model.dataToSend.page.properties(), function (property) {
              return m('.input-group', [
                m('input', {
                  type: 'text',
                  placeholder: 'name',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var properties = model.dataToSend.page.properties()
                      var propertyIndex = _.findIndex(properties, property)
                      console.log(properties, property, el.value)
                      properties.splice(propertyIndex, 1)
                      var newProperty = {
                        name: el.value,
                        value: property.value
                      }
                      properties.splice(propertyIndex, 0, newProperty);
                      model.dataToSend.page.properties(properties)
                      m.redraw(true)
                    }
                  },
                  value: property.name
                }),
                m('span', ':'),
                m('input', {
                  type: 'text',
                  placeholder: 'value',
                  config: function (el, isInit, context) {
                    el.onkeyup = function (event) {
                      var properties = model.dataToSend.page.properties()
                      var propertyIndex = _.findIndex(properties, property)
                      console.log(propertyIndex)
                      properties.splice(propertyIndex, 1)
                      var newProperty = {
                        name: property.name,
                        value: el.value
                      }
                      properties.splice(propertyIndex, 0, newProperty);
                      model.dataToSend.page.properties(properties)
                      m.redraw(true)
                    }
                  },
                  value: property.value
                }),
                m('i.fa.fa-times-circle', {
                  config: function (el, isInit, context) {
                    el.onclick = function (event) {
                      var properties = model.dataToSend.page.properties()
                      var propertyIndex = _.findIndex(properties, property)
                      console.log(propertyIndex)
                      properties.splice(propertyIndex, 1)
                      model.dataToSend.page.properties(properties)
                      m.redraw(true)
                    }
                  }
                })
              ])
            })),
            m('button.add-input-group', {
              config: function (el, isInit, context) {
                if (isInit) return
                el.onclick = function (event) {
                  var properties = model.dataToSend.page.properties()
                  var newProperty = {
                    name: '',
                    value: ''
                  }
                  properties.push(newProperty)
                  model.dataToSend.page.properties(properties)
                  m.redraw(true)
                }
              }
            }, 'Add New Property')

          ]),
          m('.method-wrap.alias', {
            className: model.activeMethod() === 'alias' ? '' : 'hidden'
          }, [
            m('label', 'Previous User ID'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.alias.previousId),
              value: model.dataToSend.alias.previousId()
            }),
            m('label', 'New User ID'),
            m('input', {
              type: 'text',
              onkeyup: m.withAttr('value', model.dataToSend.alias.userId),
              value: model.dataToSend.alias.userId()
            }),
          ]),
          m('button.submit-content', {
            config: function (el, isInit, context) {
              if (isInit) return
              el.onclick = function (event) {
                console.log('test')
                model.sendingData(true)
                var modelDataToSend = model.dataToSend[model.activeMethod()]
                switch(model.activeMethod()){
                  case 'identify':
                    modelDataToSend = {}
                    modelDataToSend.type = 'identify'
                    modelDataToSend.userId = model.dataToSend.identify.userId()
                    modelDataToSend.traits = {}
                    _.forEach(model.dataToSend.identify.traits(), function(trait){
                      modelDataToSend.traits[trait.name] = trait.value
                    })
                    break
                  case 'track':
                    modelDataToSend = {}
                    modelDataToSend.type = 'track'
                    modelDataToSend.userId = model.dataToSend.track.userId()
                    modelDataToSend.event = model.dataToSend.track.event()
                    modelDataToSend.properties = {}
                    _.forEach(model.dataToSend.track.properties(), function(property){
                      modelDataToSend.properties[property.name] = property.value
                    })
                    break
                  case 'group':
                    modelDataToSend = {}
                    modelDataToSend.type = 'group'
                    modelDataToSend.userId = model.dataToSend.group.userId()
                    modelDataToSend.groupId = model.dataToSend.group.groupId()
                    modelDataToSend.traits = {}
                    _.forEach(model.dataToSend.group.traits(), function(trait){
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
                    _.forEach(model.dataToSend.page.properties(), function(property){
                      modelDataToSend.properties[property.name] = property.value
                    })
                    break
                  case 'alias':
                    modelDataToSend = {}
                    modelDataToSend.type = 'alias'
                    modelDataToSend.userId = model.dataToSend.alias.userId()
                    modelDataToSend.previousId = model.dataToSend.alias.previousId()
                    break
                }
                if(typeof modelDataToSend !== 'string'){
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
                    notify('success', [
                      'Successfully sent ',
                      model.activeMethod(),
                      ' data to ',
                      model.activeLibrary(),
                      ' agent.'], 5000)
                  })
              }
            }
          }, model.sendingData() ? m('i.fa.fa-spin.fa-spinner') : 'Simulate')
        ])
      ]),
      m('.note', [
        'Calls made from this simulator will show up in the ',
        m('a', {
          href: '#'
        }, model.account.project()),
        ' project.'
      ])
    ])
  }
}

// initialize
console.log(wrapper)
ready(function () {
  m.mount(wrapper, ctrl)
})
