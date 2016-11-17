'use strict'

const Base = require('./base')
const Inject = require('./mixins/inject')

module.exports = class Route extends Base.mixin(Inject) {
  constructor (httpContext) {
    super(httpContext)

    const {request, response} = httpContext
    const {body, params, query, headers, method} = request

    this.body = body
    this.params = params
    this.query = query
    this.headers = headers
    this.method = method

    this.request = request
    this.response = response

    // services
    this.constructor.services(service => {
      this.inject.service.call(this, service)
    })
  }

  static services () {

  }

  accepts (types) {
    return this.request.accepts(types)
  }

  is (type) {
    return this.request.is(type)
  }

  deserialize () {

  }

  beforeModel () {

  }

  model () {
    console.log(`Route '${this.name}' must define a 'model' method`)
  }

  afterModel (model) {

  }

  serialize (model) {

  }

  error (err) {
    return err
  }
}
