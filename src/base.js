'use strict'

module.exports = class Base {
  constructor (...args) {
    const mixins = []
    this.mixins(mixin => {
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

  mixins () {

  }
}
