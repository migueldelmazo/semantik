const

  _ = require('lodash'),
  semantik = require('../index');

semantik.addMixin('getObjType', (value) => {
  return _.isArray(value) ? [] : {};
});

semantik.addMixin('sanitize', (obj) => {
  return _.reduce(obj, (memo, value, key) => {
    if (_.isBoolean(value) || _.isNumber(value) || _.isString(value)) {
      memo[key] = value;
    } else if (!_.isFunction(value)) {
      memo[key] = semantik.sanitize(value);
    }
    return memo;
  }, semantik.getObjType(obj));
});
