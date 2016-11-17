const Base = require('./base')
const Inject = require('./mixins/inject')

module.exports = class Request extends Base {
  constructor (...args) {
    super(...args)

    const {request, response} = args[0]
    const {body, params, query, headers, method} = request

    this.body = body
    this.params = params
    this.query = query
    this.headers = headers
    this.method = method

    this.request = request
    this.response = response

    this.constructor.services(service => {
      Inject.service.call(this, service)
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
}
