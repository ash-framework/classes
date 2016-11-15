'use strict'

const Base = require('./base')
const Inject = require('./mixins/inject')

module.exports = class Route extends Base.mixin(Inject) {
  constructor (httpContext) {
    super(httpContext)
    const {request} = httpContext

    this.httpContext = httpContext
    this.body = request.body
    this.params = request.params
    this.query = request.query
  }

  deserialize () {

  }

  beforeModel () {

  }

  model () {
    console.log(`Route '${this.name}' must define a 'model' method`)
  }

  afterModel (model) {
    return model
  }

  serialize (model) {
    return model
  }

  error (err) {
    return err
  }
}
