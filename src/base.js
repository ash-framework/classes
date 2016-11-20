'use strict'

function mixins (context, ...args) {
  const mixins = []
  context.mixins(mixin => {
    mixins.push(mixin)
  })

  const className = context.constructor.name
  const tempClass = { [className]: class extends context.constructor {} }
  mixins.forEach(Mixin => {
    const methodNames = Object.getOwnPropertyNames(Mixin.prototype)
      .filter(name => name !== 'constructor')

    for (let name of methodNames) {
      const descriptor = Reflect.getOwnPropertyDescriptor(Mixin.prototype, name)
      Reflect.defineProperty(tempClass[className].prototype, name, descriptor)
    }
    Object.setPrototypeOf(context, tempClass[className].prototype)
    context.constructor = tempClass[className]
  })
}

module.exports = class Base {
  constructor (...args) {
    mixins(this, ...args)
  }

  mixins () {

  }
}
