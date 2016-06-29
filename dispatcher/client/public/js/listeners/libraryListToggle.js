module.exports = function (opts) {
  var ee = opts.ee
  var model = opts.model
  return function (data) {
    model.libraryListOpen(data)
    ee.emit('MODEL:update')
  }
}
