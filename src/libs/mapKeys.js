const

  _ = require('lodash'),
  semantik = require('../index'),
  compose = require('./compose'),

  mapKeys = (obj, transformObj) => {
    return _.transform(compose(obj, transformObj), (result, composedValue, composedKey) => {
      const transformKeyRegex = mapKeysFindRegex(composedKey, transformObj),
        matched = composedKey.match(transformKeyRegex),
        newKey = mapKeysGetNewKey(matched, composedValue);
      _.set(result, newKey, _.get(obj, composedKey));
    }, semantik.getObjType(obj));
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
