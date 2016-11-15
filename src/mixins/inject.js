const services = new Map()
const path = require('path')

module.exports = class Inject {
  inject () {
    const request = this.httpContext.request
    console.log(this.req)
    return {
      service: serviceName => {
        if (!services.has(serviceName)) {
          services.set(serviceName, new WeakMap())
        }
        const service = services.get(serviceName)
        if (!service.has(request)) {
          const Service = require(path.join(process.cwd(), 'app', 'services') + '/' + serviceName)
          service.set(request, new Service())
        }
        return service.get(request)
      }
    }
  }
}
