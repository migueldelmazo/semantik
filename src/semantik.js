'use strict';

var _ = require('lodash'),

  // compose methos

  compose = function (obj, attrs) {
    // return the composed attributes with their values
    return _.reduce(attrs, function (memo, value, attr) {
      composeAttr(memo, obj, attr, value);
      return memo;
    }, {});
  },

  composeAttr = function (composedAttrs, obj, attr, value) {
    // compose next array attributes
    var arrayKey = composeGetArrayKey(attr);
    if (arrayKey !== null) {
      composeSubAttr(composedAttrs, obj, attr, value, arrayKey);
    } else {
      composeAddNewAttr(composedAttrs, obj, attr, value);
    }
  },

  composeSubAttr = function (composedAttrs, obj, attr, value, arrayKey) {
    var arrayLength = composeGetArrayKeyLength(obj, arrayKey),
      newAttr,
      i;
    for (i = 0; i < arrayLength; i += 1) {
      // compose attr with array index
      newAttr = attr.replace('[]', '[' + i + ']');
      // add new attr to composed attrs
      composeAddNewAttr(composedAttrs, obj, newAttr, value);
      // recursive call
      composeAttr(composedAttrs, obj, newAttr, value);
    }
  },

  composeAddNewAttr = function (composedAttrs, obj, attr, value) {
    //check if is valid and exists attr
    if (attr.indexOf('[]') < 0 && _.has(obj, attr)) {
      composedAttrs[attr] = value;
    }
  },

  composeGetArrayKey = function (attr) {
    //get first valid array
    var index = attr.indexOf('[]');
    return index >= 0 ? attr.substr(0, index) : null;
  },

  composeGetArrayKeyLength = function (obj, subAttr) {
    var array = subAttr === '' ? obj : _.get(obj, subAttr);
    return _.isArray(array) ? array.length : 0;
  },

  // parse methods

  parse = function (obj, attrs) {
    var clonedObj = _.cloneDeep(obj);
    ensureCallbacks(attrs);
    parseRunCallbacks(clonedObj, compose(clonedObj, attrs));
    return clonedObj;
  },

  parseRunCallbacks = function (obj, composedAttrs) {
    // iterate the composed attributes running its callbacks
    _.each(composedAttrs, function (callbacks, attr) {
      _.set(obj, attr, parseGetCallbacksValue(obj, attr, callbacks));
    });
  },

  parseGetCallbacksValue = function (obj, attr, callbacks) {
    // iterate the callbacks getting its value
    return _.reduce(callbacks, function (memoValue, callback) {
      return callback.cb.apply(callback.ctx, getParams(memoValue, callback.params));
    }, _.get(obj, attr));
  },

  // validate methods

  validate = function (obj, attrs) {
    ensureCallbacks(attrs);
    return validateRunCallbacks(obj, compose(obj, attrs));
  },

  validateRunCallbacks = function (obj, composedAttrs) {
    // iterate the composed attributes checking its callbacks
    return _.find(composedAttrs, function (callbacks, attr) {
      return !validateCheckValue(obj, attr, callbacks);
    }) === undefined;
  },

  validateCheckValue = function (obj, attr, callbacks) {
    // iterate the callbacks checking its value
    var value = _.get(obj, attr);
    return _.find(callbacks, function (callback, idx) {
      return !callback.cb.apply(callback.ctx, getParams(value, callback.params));
    }) === undefined;
  },

  // helpers

  ensureCallbacks = function (attrs) {
    _.each(attrs, function (callbacks, key) {
      attrs[key] = _.reduce(parseArray(callbacks), function (memo, callback) {
        if (_.isString(callback) && _.isFunction(module.exports[callback])) {
          // check if is a function of this library
          memo.push({ cb: module.exports[callback] });
        } else if (_.isPlainObject(callback)) {
          // check if is a plain object
          memo.push({ cb: callback.cb, params: callback.params, ctx: callback.ctx });
        } else if (_.isFunction(callback)) {
          // check if is a function
          memo.push({ cb: callback });
        }
        return memo;
      }, []);
    });
  },

  getParams = function (value, params) {
    if (_.isArray(params)) {
      return [value].concat(params);
    } else if (params !== undefined) {
      return [value, params];
    } else {
      return [value];
    }
  },

  parseArray = function (arr) {
    return _.isArray(arr) ? arr : [arr];
  };

module.exports = {

  compose: compose,

  parse: parse,

  validate: validate,

  // mixins

  mixin: function (mixin) {
    _.each(mixin, function (callback, key) {
      this[key] = callback;
    }, this);
  },

  // parse helpers

  parseString: function (value) {
    return value + '';
  },

  // validate helpers

  isEmail: function (value) {
    return module.exports.regex.isEmail.test(value);
  },

  isNotEmpty: function (value) {
    return !_.isEmpty(value);
  },

  isNumberGreatThan: function (value, min, equal) {
    return equal === false ? min < value : min <= value;
  },

  isNumberLessThan: function (value, max, equal) {
    return equal === false ? value > max : value >= max;
  },

  isNumberBetween: function (value, min, max, equal) {
    var _min = Math.min(min, max),
     _max = Math.max(min, max);
    return equal === false ? _min < value && value < _max : _min <= value && value <= _max;
  },

  isStringNotEmpty: function (value) {
    var REGEX_IS_NOT_EMPTY = /([^\s])/;
    return REGEX_IS_NOT_EMPTY.test(value);
  },

  isStringNumber: function (value) {
    return !isNaN(value + '');
  },

  // lodash methods

  isArray: _.isArray,

  isEmpty: _.isEmpty,

  isNumber: _.isNumber,

  isString: _.isString,

  parseCamelCase: _.camelCase,

  sortBy: _.sortBy,

  // regex

  regex: {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    isEmail: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

};
