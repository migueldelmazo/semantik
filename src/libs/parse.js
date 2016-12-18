const

  _ = require('lodash'),
  common = require('./common'),
  compose = require('./compose'),

  parse = (obj, attrs) => {
    const clonedObj = _.cloneDeep(obj);
    parseRunCallbacks(clonedObj, compose(clonedObj, common.ensureAttrs(attrs)));
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
      return common.runCallback(callback, value);
    }, _.get(obj, attr));
  };

module.exports = parse;
