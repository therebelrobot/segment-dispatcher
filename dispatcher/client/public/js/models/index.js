module.exports = function (opts) {
  var m = opts.lib.mithril
  var model = {
    libraryListOpen: m.prop(false),
    activeLibrary: m.prop('nodejs'),
    allLibraries: m.prop([
      {
        type: 'golang',
        name: 'Go',
        port: 8001,
        status: '[BETA]',

      },
      {
        type: 'nodejs',
        name: 'Node.js',
        port: 8002,
        status: ''
      },
      {
        type: 'php',
        name: 'PHP',
        port: 8003,
        status: '[Unfinished]'
      },
      {
        type: 'python',
        name: 'Python',
        port: 8004,
        status: '[Unfinished]'
      },
      {
        type: 'ruby',
        name: 'Ruby',
        port: 8005,
        status: '[Unfinished]'
      },
      {
        type: 'http',
        name: 'HTTP',
        status: '[Unfinished]'
      },
      {
        type: 'clientjs',
        name: 'Client-side Javascript',
        status: '[Unfinished]'
      },
      {
        type: 'pixel',
        name: 'Pixel tracking',
        status: '[Unfinished]'
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
    methodDisplay: m.prop([
      {
        method: 'raw',
        rawLabel: 'Raw JSON'
      },
      {
        method: 'identify',
        type: 'traits',
        singleType: 'trait',
        inputs: [
          {
            label: 'User ID',
            attribute: 'userId'
          }
        ]
      },
      {
        method: 'track',
        type: 'properties',
        singleType: 'property',
        inputs: [
          {
            label: 'User ID',
            attribute: 'userId'
          },
          {
            label: 'Event',
            attribute: 'event'
          }
        ]
      },
      {
        method: 'group',
        type: 'traits',
        singleType: 'trait',
        inputs: [
          {
            label: 'User ID',
            attribute: 'userId'
          },
          {
            label: 'Group ID',
            attribute: 'groupId'
          }
        ]
      },
      {
        method: 'page',
        type: 'properties',
        singleType: 'property',
        inputs: [
          {
            label: 'User ID',
            attribute: 'userId'
          },
          {
            label: 'Category',
            attribute: 'category'
          },
          {
            label: 'Name',
            attribute: 'name'
          }
        ]
      },
      {
        method: 'alias',
        omitProperties: true,
        inputs: [
          {
            label: 'Previous User ID',
            attribute: 'previousId'
          },
          {
            label: 'New User ID',
            attribute: 'userId'
          }
        ]
      }
    ]),
    account: {
      project: m.prop('segment/testing'),
      writeKey: m.prop('')
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
  return model
}
