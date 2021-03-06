'use strict'
const eqeqeq = require('deep-equal')

const object = {
  isSet: function (value) {
    return value !== null && value !== undefined
  },
  isObject: function (value) {
    return value && typeof value === 'object'
  },
  isArray: function (value) {
    return value instanceof Array
  },
  isEnum: function (value, _enum) {
    try {
      for (let key in _enum) {
        if (_enum[key] === value) {
          return true
        }
      }
    } catch (e) {}
    return false
  },
  /**
   * implicitly check isObject
   */
  hasProperties: function (value, properties) {
    if (!properties) {
      console.warn('checkv', 'object.hasProperties, missing properties')
    }
    if (!properties || !object.isObject(value)) {
      return false
    }
    for (let i = 0; i < properties.length; i++) {
      if (!value.hasOwnProperty(properties[i])) {
        return false
      }
    }
    return true
  },
  /**
   * @todo use deep-strict-equal?
   */
  isExactly: function (value, to) {
    if (typeof to !== typeof value) {
      return false
    }

    if (value === null && to === null) {
      return true
    }

    if (typeof to === 'object') {
      if (to.constructor.name !== value.constructor.name) {
        return false
      }

      try {
        if (value instanceof Error && to instanceof Error) {
          return value.code === to.code || value.code === to.message || value.message === to.code
        }
      } catch (e) {
        return false
      }

      return eqeqeq(value, to, {strict: true})
    }

    // primitives
    return value === to
  }
}

module.exports = object
