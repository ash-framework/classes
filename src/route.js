'use strict'

const Request = require('./request')

module.exports = class Route extends Request {
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
