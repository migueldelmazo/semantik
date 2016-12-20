const

  _ = require('lodash'),
  compose = require('./compose'),
  mixins = require('./mixins'),

  mapKeys = (obj, transformObj) => {

  },

  mapKeysFindRegex = (composedKey, transformObj) => {
    let regex;
    _.findKey(transformObj, (transformValue, transformKey) => {
      regex = mapKeysGetRegex(transformKey);
      return !!composedKey.match(regex);
    });
    return regex;
  },

  mapKeysGetRegex = (src) => {
    return new RegExp(src.replace(/\[\]/g, '\\[(\\d+)\\]').replace(/\./g, '\\.'));
  },

  mapKeysGetNewKey = (matched, composedValue) => {
    return _.reduce(_.tail(matched), (memo, digit) => {
      memo = memo.replace('[]', '[' + digit + ']');
      return memo;
    }, composedValue);
  };

module.exports = mapKeys;
