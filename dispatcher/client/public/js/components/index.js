module.exports = function(opts){
  var components = {
    libraryListItem: require('./libraryListItem')(opts),
    methodListItem: require('./methodListItem')(opts),
    methodWrap: require('./methodWrap')(opts),
    notify: require('./notify')(opts)
  }
  return components
}
