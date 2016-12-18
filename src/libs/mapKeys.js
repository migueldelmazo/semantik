const

  _ = require('lodash'),
  common = require('./common'),
  compose = require('./compose'),
  mixins = require('./mixins'),

  mapKeys = (obj, transformObj) => {
    return _.transform(compose(obj, transformObj), (result, composedValue, composedKey) => {
      const transformKeyRegex = mapKeysFindRegex(composedKey, transformObj),
        matched = composedKey.match(transformKeyRegex),
        newKey = transformKeyRegex && matched ? mapKeysGetNewKey(matched, composedValue) : composedKey;
      _.set(result, newKey, _.get(obj, composedKey));
    }, mixins.list.getObjType(obj));
  },

  mapKeysFindRegex = (composedKey, transformObj) => {
    let regex;
    return _.findKey(transformObj, (transformValue, transformKey) => {
      regex = mapKeysGetRegex(transformKey);
      return !!composedKey.match(regex);
    }) ? regex : null;
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
