'use strict'

const Base = require('./base')
const Inject = require('./mixins/inject')

module.exports = class Route extends Base {
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
      Inject.service.call(this, service)
    })

    // mixins
    const mixins = []
    this.constructor.mixins(mixin => {
      mixins.push(mixin)
    })

    mixins.forEach(Mixin => {
      const methodNames = Object.getOwnPropertyNames(Mixin.prototype)
        .filter(name => name !== 'constructor')

      class Mixed extends this.constructor {}
      for (let name of methodNames) {
        const descriptor = Reflect.getOwnPropertyDescriptor(Mixin.prototype, name)
        Reflect.defineProperty(Mixed.prototype, name, descriptor)
      }
      Object.setPrototypeOf(this, Mixed.prototype)
      this.constructor = Mixed
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
