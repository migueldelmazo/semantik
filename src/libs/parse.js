const

  _ = require('lodash'),
  common = require('./common'),
  compose = require('./compose'),
  run = require('./run'),

  parse = (obj, attrs) => {
    const clonedObj = _.cloneDeep(obj);
    parseRunCallbacks(clonedObj, compose(clonedObj, common.ensureSemantikAttrs(attrs)));
    return clonedObj;
  },

  parseRunCallbacks = (obj, composedAttrs) => {
    // iterate the composed attributes running its callbacks
    _.each(composedAttrs, (callbacks, attr) => {
      _.set(obj, attr, parseGetCallbacksValue(obj, attr, callbacks));
    });
  },

  parseGetCallbacksValue = (obj, attr, callbacks) => {
    // iterate the callbacks getting its value
    return _.reduce(callbacks, (value, callback) => {
      return run(callback, value);
    }, _.get(obj, attr));
  };

module.exports = parse;
