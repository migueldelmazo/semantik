const

  _ = require('lodash'),
  mixins = require('../libs/mixins');

mixins.add('getObjType', (value) => {
  return _.isArray(value) ? [] : {};
});
