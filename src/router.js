'use strict'

const Ash = require('./ash')

module.exports = class Router extends Ash {
  static map (routeMapFunction) {
    this.routeMapFunction = routeMapFunction
  }
}
