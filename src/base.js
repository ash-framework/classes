'use strict'

module.exports = class Base {
  static mixin (...args) {
    class Mixed extends this {}

    args.forEach(Mixin => {
      const methodNames = Object.getOwnPropertyNames(Mixin.prototype)
        .filter(name => name !== 'constructor')

      for (let name of methodNames) {
        Mixed.prototype[name] = Mixin.prototype[name]
      }
    })

    return Mixed
  }
}
