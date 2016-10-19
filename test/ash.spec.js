/* global describe, it */
const assert = require('assert')
const Ash = require('../src').Ash

describe('Ash base class', function () {
  it('mixin method with direct inheritance', function () {
    class Mixin {
      two () {
        return 'two'
      }
    }

    class Test extends Ash.mixin(Mixin) {
      one () {
        return 'one'
      }
    }

    const instance = new Test()
    assert(typeof instance.one === 'function')
    assert(typeof instance.two === 'function')
  })

  it('mixin method with indirect inheritance', function () {
    class Mixin {
      two () {
        return 'two'
      }
    }

    class SubClass extends Ash {}

    class Test extends SubClass.mixin(Mixin) {
      one () {
        return 'one'
      }
    }

    const instance = new Test()
    assert(typeof instance.one === 'function')
    assert(typeof instance.two === 'function')
  })

  it('mixin method with multiple mixins', function () {
    class MixinOne {
      two () { return 'two' }
    }
    class MixinTwo {
      three () { return 'three' }
    }
    class MixinThree {
      four () { return 'four' }
    }

    class SubClass extends Ash {}
    class Test extends SubClass.mixin(MixinOne, MixinTwo, MixinThree) {
      one () { return 'one' }
    }

    const instance = new Test()
    assert.strictEqual(instance.one(), 'one')
    assert.strictEqual(instance.two(), 'two')
    assert.strictEqual(instance.three(), 'three')
    assert.strictEqual(instance.four(), 'four')
  })
})
