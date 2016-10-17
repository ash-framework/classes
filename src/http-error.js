'use strict'

const assert = require('assert')
const { STATUS_CODES } = require('http')

const _status = new WeakMap()

function validateInput (status, message) {
  assert(typeof status === 'number',
    'Argument 1 to HttpError must be an http status code number')
  assert(!message || typeof message === 'string',
    'Argument 2 to HttpError is optional but when provided, must be a string')
  assert(STATUS_CODES[status],
    'Argument 1 to HttpError is an invalid http status code')
}

module.exports = class HttpError extends Error {
  constructor (status, message) {
    validateInput(status, message)
    super(message || STATUS_CODES[status])

    this.name = this.constructor.name
    this.stack = this.stack.replace(`${this.name}: `, `${this.name}: ${status} `)

    _status.set(this, status)
  }

  get status () {
    return _status.get(this)
  }

  set status (code) {
    _status.set(this, code)
  }
}
