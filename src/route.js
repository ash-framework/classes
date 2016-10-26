'use strict'

const Base = require('./base')
const Log = require('@ash-framework/log')

module.exports = class Route extends Base {
  deserialize (params, query, body, httpContext) {

  }

  beforeModel (params, query, body, httpContext) {

  }

  model (params, query, body, httpContext) {
    console.log(`Route '${this.name}' must define a 'model' method`)
  }

  afterModel (model, params, query, body, httpContext) {
    return model
  }

  serialize (model, params, query, body, httpContext) {
    return model
  }

  error (err) {
    new Log().error(err)
  }
}
