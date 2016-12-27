const

  _ = require('lodash'),
  common = require('./common'),
  compose = require('./compose'),
  semantik = require('../index'),
  run = require('./run'),

  validate = (obj, attrs) => {
    const ensuredAttrs = common.ensureSemantikAttrs(attrs),
      composedAttrs = compose(obj, ensuredAttrs);
    return validateCheckRequires(attrs, composedAttrs)
      ? validateRunCallbacks(obj, composedAttrs)
      : false;
  },

  validateCheckRequires = (attrs, composedAttrs) => {
    const composedKeys = _.keys(composedAttrs),
      requiredAttrs = _.pickBy(attrs, (callbacks) => {
        // get required attributes
        return semantik.parseArray(callbacks).indexOf('isRequired') >= 0;
      });
    return _.every(_.keys(requiredAttrs), (attr) => {
      // check required attributes with composed attributes
      const regex = new RegExp('^' + attr.replace('[]', '\\[\\d+\\]') + '$');
      return _.some(composedKeys, (key) => regex.test(key));
    });
  },

  validateRunCallbacks = (obj, composedAttrs) => {
    // iterate the composed attributes checking its callbacks
    return _.every(composedAttrs, validateCheckValue.bind(null, obj));
  },

  validateCheckValue = (obj, callbacks, attr) => {
    // iterate the callbacks checking its value
    const value = _.get(obj, attr);
    return _.every(callbacks, (callback) => {
      return callback === 'isRequired' ? true : run(callback, value);
    });
  };

module.exports = validate;
